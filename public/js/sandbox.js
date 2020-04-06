/*
* Holds all data for a scene. Implements game loop functions.
*/
class GameScene extends Scene {
    constructor() {
        super();
    }

    keyPressed(key) {
        super.keyPressed(key);

        switch (key) {
            case KeyCodes.DIGIT_1:
                this.demo1();
                break;
            case KeyCodes.DIGIT_2:
                this.demo2();
                break;
            case KeyCodes.DIGIT_3:
                this.demo3();
                break;
            case KeyCodes.DIGIT_4:
                this.demo4();
                break;
            case KeyCodes.DIGIT_5:
                this.demo5();
                break;
            case KeyCodes.KEY_R:
                var event = new GenerateRoomEvent();
                this.eventManager.register(event);
                break;
        }
    }

    // Demo 1 data
    demo1() {
        this.worldSize = new Vector(5000, 2400);
        this.entityManager.clear();
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 1;

        // Random entities
        for (var i = 0; i < 50; i++) {
            var entity = new Entity();
            var scale = new Vector(Random.Int(5, 50), Random.Int(5, 50));
            var position = new Vector(Random.Float(-100, 100), Random.Float(-100, 100));
            Entity.AddComponent(entity, new TransformComponent(position, scale));
            var velocity = new Vector(Random.Float(-0.1, 0.1), Random.Float(-0.1, 0.1));
            var maxVelocity = Random.Float(0.05, 1.5);
            var acceleration = new Vector(Random.Float(-0.0001, 0.0001), Random.Float(-0.0001, 0.0001));
            Entity.AddComponent(entity, new MotionComponent(velocity, maxVelocity, acceleration));
            var color = new Color(Random.Int(0, 360), 75, 60, 1);
            Entity.AddComponent(entity, new ShapeComponent(color, Random.Value([ShapeTypes.RECTANGLE, ShapeTypes.ELLIPSE, ShapeTypes.TRIANGLE])));
            Entity.AddComponent(entity, new TraceComponent(2, color));
            Entity.AddComponent(entity, new SelectableComponent());

            var animation = new AnimationComponent();
            var colorAnimation = new AnimationSequence();
            colorAnimation.keyframes = [0, Random.Int(1000, 2000), Random.Int(3000, 4000)];
            colorAnimation.values = [Color.Copy(color), new Color(Random.Int(0, 360), 75, 60, 1), Color.Copy(color)];
            colorAnimation.component = Components.SHAPE;
            colorAnimation.property = "color";
            colorAnimation.type = AnimationSequenceTypes.COLOR;
            colorAnimation.easing = "EaseInOutQuad";
            animation.sequences.push(colorAnimation);
            var scaleAnimation = new AnimationSequence();
            scaleAnimation.keyframes = [0, Random.Int(200, 500), Random.Int(800, 1000), Random.Int(1200, 1500)];
            scaleAnimation.values = [Vector.Copy(scale), Vector.Multiply(Vector.Copy(scale), new Vector(2, 2)), Vector.Zero, Vector.Copy(scale)];
            scaleAnimation.component = Components.TRANSFORM;
            scaleAnimation.property = "scale";
            scaleAnimation.type = AnimationSequenceTypes.VECTOR
            scaleAnimation.easing = "EaseInOutQuad";
            animation.sequences.push(scaleAnimation);
            Entity.AddComponent(entity, animation);

            this.entityManager.add(entity);
        }

        // Emitter 
        var emitterEntity = new Entity();
        var emitterPosition = new Vector(Random.Float(-100, 100), Random.Float(-100, 100));
        Entity.AddComponent(emitterEntity, new TransformComponent(emitterPosition));
        var emitterComponent = new ParticleEmitterComponent();
        emitterComponent.particleVelocity = new Vector(0.05, 0.05);
        emitterComponent.velocityRandomness = 1.5;
        emitterComponent.spread = Math.PI * 2;
        emitterComponent.size = 1;
        emitterComponent.color = new Color(100, 100, 90, 1);
        emitterComponent.colorEnd = new Color(100, 100, 0, 0);
        emitterComponent.particleSize = 2;
        emitterComponent.particleSizeRandomness = 2;
        emitterComponent.emissionRate = 0.05;
        emitterComponent.particleLifespan = 3000;
        emitterComponent.particleLifespanRandomness = 1.5;
        emitterComponent.foreground = true;
        Entity.AddComponent(emitterEntity, emitterComponent);
        var emitterVelocity = new Vector(Random.Float(-0.1, 0.1), Random.Float(-0.1, 0.1));
        var emitterMaxVelocity = Random.Float(0.05, 0.5);
        var emitterAcceleration = new Vector(Random.Float(-0.0001, 0.0001), Random.Float(-0.0001, 0.0001));
        Entity.AddComponent(emitterEntity, new MotionComponent(emitterVelocity, emitterMaxVelocity, emitterAcceleration));
        Entity.AddComponent(emitterEntity, new SelectableComponent());
        this.entityManager.add(emitterEntity);

        var fieldEntity = new Entity();
        Entity.AddComponent(fieldEntity, new TransformComponent(new Vector(emitterPosition.x, emitterPosition.y - 100)));
        var fieldComponent = new ForceFieldComponent();
        fieldComponent.mass = 3;
        fieldComponent.destructive = true;
        fieldComponent.radius = 50;
        fieldComponent.enabled = true;
        Entity.AddComponent(fieldEntity, fieldComponent);
        Entity.AddComponent(fieldEntity, new MotionComponent(Vector.Copy(emitterVelocity), emitterMaxVelocity, Vector.Copy(emitterAcceleration)));
        Entity.AddComponent(fieldEntity, new SelectableComponent());
        this.entityManager.add(fieldEntity);

        emitterComponent.fieldIds.push(fieldEntity.id);
    }

    // Demo 2 data
    demo2() {
        this.worldSize = new Vector(600, 600);
        this.entityManager.clear();
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 1;
        this.entityManager.addAll(Data.Intro);
        //this.camera.fogCenter = new Vector(200,200);
    }

    // Demo 3 data
    demo3() {
        this.worldSize = new Vector(5000, 5000);
        this.entityManager.clear();
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 1;
        this.entityManager.addAll([
            {
                "id": "263995ff-7bab-4cd0-8bcb-9d63c00458a5",
                "components": {
                    "Transform": {
                        "name": "Transform",
                        "position": { "x": -200, "y": -200 },
                        "scale": { "x": 50, "y": 50 },
                        "angle": 0
                    },
                    "Shape": {
                        "name": "Shape",
                        "color": { "h": 0, "s": 100, "l": 50, "a": 1 },
                        "outlineColor": { "h": 0, "s": 0, "l": 0, "a": 1 },
                        "outlineWidth": 5,
                        "type": "Rectangle"
                    },
                    "Motion": {
                        "name": "Motion",
                        "velocity": { "x": 0, "y": 0 },
                        "maxVelocity": 0.5,
                        "acceleration": { "x": 0, "y": 0 },
                        "angularVelocity": 0,
                        "angularAcceleration": 0,
                        "wraparound": true,
                        "dampingFactor": 0.95
                    },
                    "Navigation": {
                        "name": "Navigation",
                        "location": { "x": 500, "y": 100 },
                        "slowFactor": 0.01,
                        "threshold": 5
                    },
                    "Selectable": {
                        "name": "Selectable",
                        "highlight": false,
                        "highlightColor": { "h": 0, "s": 100, "l": 100, "a": 1 }
                    },
                    "NavigationRecipient": {
                        "name": "NavigationRecipient"
                    }
                }
            },
            {
                "id": "d65eef71-042d-494a-a4af-95d68120c384",
                "parentId": "263995ff-7bab-4cd0-8bcb-9d63c00458a5",
                "components": {
                    "Transform": {
                        "name": "Transform",
                        "position": { "x": 100, "y": 100 },
                        "scale": { "x": 1, "y": 1 },
                        "angle": 0
                    },
                    "Text": {
                        "name": "Text",
                        "text": "CHILD",
                        "font": "monospace",
                        "size": 40,
                        "style": "",
                        "color": { "h": 0, "s": 100, "l": 50, "a": 1 }
                    }
                }
            },
            {
                "id": "b29181b7-5b63-41c3-afbe-4b8d32eac610",
                "components": {
                    "Transform": {
                        "name": "Transform",
                        "position": { "x": -200, "y": 200 },
                        "scale": { "x": 50, "y": 50 },
                        "angle": 0
                    },
                    "Shape": {
                        "name": "Shape",
                        "color": { "h": 50, "s": 100, "l": 50, "a": 1 },
                        "outlineColor": { "h": 0, "s": 0, "l": 0, "a": 1 },
                        "outlineWidth": 5,
                        "type": "Rectangle"
                    },
                    "Selectable": {
                        "name": "Selectable",
                        "highlight": false,
                        "highlightColor": { "h": 0, "s": 100, "l": 100, "a": 1 }
                    },
                    "NavigationRecipient": {
                        "name": "NavigationRecipient"
                    }
                }
            },
            {
                "id": "34b8b555-9ec2-4f46-a7ef-0a13ae77a422",
                "components": {
                    "Transform": {
                        "name": "Transform",
                        "position": { "x": 200, "y": -200 },
                        "scale": { "x": 50, "y": 50 },
                        "angle": 0
                    },
                    "Shape": {
                        "name": "Shape",
                        "color": { "h": 160, "s": 100, "l": 50, "a": 1 },
                        "outlineColor": { "h": 0, "s": 0, "l": 0, "a": 1 },
                        "outlineWidth": 5,
                        "type": "Rectangle"
                    },
                    "Selectable": {
                        "name": "Selectable",
                        "highlight": false,
                        "highlightColor": { "h": 0, "s": 100, "l": 100, "a": 1 }
                    }
                }
            },
            {
                "id": "de2a2872-7052-4d53-a3cd-9831e5209ec8",
                "components": {
                    "Transform": {
                        "name": "Transform",
                        "position": { "x": 200, "y": 200 },
                        "scale": { "x": 50, "y": 50 },
                        "angle": 0
                    },
                    "Shape": {
                        "name": "Shape",
                        "color": { "h": 270, "s": 100, "l": 50, "a": 1 },
                        "outlineColor": { "h": 0, "s": 0, "l": 0, "a": 1 },
                        "outlineWidth": 5,
                        "type": "Rectangle"
                    }
                }
            }
        ]);
    }

    // Demo 4 data
    demo4() {
        this.worldSize = new Vector(1600, 1600);
        this.entityManager.clear();
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 0.5;
        var event = new GenerateRoomEvent();
        this.eventManager.register(event);
    }

    // Demo 5 data
    demo5() {
        this.worldSize = new Vector(1200, 800);
        this.entityManager.clear();
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 1;

        var button1 = new Entity();
        Entity.AddComponent(button1, new TransformComponent(new Vector(250, 130), new Vector(200, 80)));
        Entity.AddComponent(button1, new ShapeComponent(new Color(0, 0, 20, 1), ShapeTypes.RECTANGLE, Color.White, 2, 10));
        Entity.AddComponent(button1, new TextComponent("Button 1", "20", Color.White));
        Entity.AddComponent(button1, new HoverComponent());
        Entity.AddComponent(button1, new ClickComponent("Button 1"));
        this.entityManager.add(button1);

        var horizontal = [HorizontalAlignments.LEFT, HorizontalAlignments.CENTER, HorizontalAlignments.RIGHT];
        var vertical = [VerticalAlignments.TOP, VerticalAlignments.MIDDLE, VerticalAlignments.BOTTOM];
        for (var i = 0; i < vertical.length; i++) {
            for (var j = 0; j < horizontal.length; j++) {
                var margin = new Vector(100, 50);
                if (i == 2)
                    Vector.Multiply(margin, new Vector(1, -1));
                if (j == 2)
                    Vector.Multiply(margin, new Vector(-1, 1));

                var button = new Entity();
                Entity.AddComponent(button, new TransformComponent(Vector.Zero, new Vector(100, 30)));
                Entity.AddComponent(button, new ShapeComponent(new Color(0, 0, 20, 1), ShapeTypes.RECTANGLE, Color.White, 2));
                Entity.AddComponent(button, new TextComponent("Button!", "15", Color.White));
                Entity.AddComponent(button, new ViewportAnchorComponent(horizontal[j], vertical[i], margin));
                Entity.AddComponent(button, new HoverComponent());
                Entity.AddComponent(button, new ClickComponent("Button!"));
                this.entityManager.add(button, Layers.UI);
            }
        }

    }
}

var scene = new GameScene();
scene.demo5();
scene.toggleLoop();