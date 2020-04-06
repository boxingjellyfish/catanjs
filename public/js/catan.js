/*
* Holds all data for a scene. Implements game loop functions.
*/
class GameScene extends Scene {
    constructor() {
        super();
    }

    // Main menu
    mainMenu() {
        this.entityManager.clear();
        this.worldSize = new Vector(1200, 800);
        this.camera.targetPosition = Vector.Zero;
        this.camera.targetZoom = 1;

        /*
        "Animation": {
                    "name": "Animation",
                    "sequences": [
                      {
                        "keyframes": [0, 1000, 2000, 3000],
                        "values": [0, 1, 1, 0],
                        "component": "Shape",
                        "path": "color",
                        "property": "a",
                        "keyframe": 0,
                        "elapsed": 0,
                        "easing": "EaseInOutQuad",
                        "type": "Number",
                        "loop": false,
                        "playing": true
                      },
                      {
                        "keyframes": [0, 1000, 2000, 3000],
                        "values": [0, 1, 1, 0],
                        "component": "Shape",
                        "path": "outlineColor",
                        "property": "a",
                        "keyframe": 0,
                        "elapsed": 0,
                        "easing": "EaseInOutQuad",
                        "type": "Number",
                        "loop": false,
                        "playing": true
                      }
                    ]
                  }
        */

        // Catan Menu Title
        var title = new Entity();

        var titleTransform = new TransformComponent(Vector.Zero, Vector.One);
        Entity.AddComponent(title, titleTransform);

        var titleText = new TextComponent("CATAN JS", "30", Color.White)
        Entity.AddComponent(title, titleText);

        var titleAnchor = new ViewportAnchorComponent(HorizontalAlignments.CENTER, VerticalAlignments.MIDDLE, new Vector(0, -100));
        Entity.AddComponent(title, titleAnchor);

        var titleAnimation = new AnimationComponent();
        var titleAnimationFadeIn = new AnimationSequence();
        titleAnimationFadeIn.type = AnimationSequenceTypes.NUMBER;
        titleAnimationFadeIn.component = Components.TEXT;
        titleAnimationFadeIn.path = "color";
        titleAnimationFadeIn.property = "a";
        titleAnimationFadeIn.keyframes = [0, 1000];
        titleAnimationFadeIn.values = [0, 1];
        titleAnimationFadeIn.easing = "EaseInOutQuad";
        titleAnimationFadeIn.loop = false;
        titleAnimation.sequences.push(titleAnimationFadeIn);
        Entity.AddComponent(title, titleAnimation);

        this.entityManager.add(title, Layers.UI);

        // New Game Button
        var newGame = new Entity();

        var newGameTransform = new TransformComponent(Vector.Zero, new Vector(100, 30));
        Entity.AddComponent(newGame, newGameTransform);

        var newGameShape = new ShapeComponent(new Color(0, 0, 20, 1), ShapeTypes.RECTANGLE, Color.White, 2, 10);
        Entity.AddComponent(newGame, newGameShape);

        var newGameText = new TextComponent("New", "15", Color.White);
        Entity.AddComponent(newGame, newGameText);

        var newGameAnchor = new ViewportAnchorComponent(HorizontalAlignments.CENTER, VerticalAlignments.MIDDLE, Vector.Zero);
        Entity.AddComponent(newGame, newGameAnchor);

        var newGameHover = new HoverComponent()
        Entity.AddComponent(newGame, newGameHover);

        var newGameClick = new ClickComponent("New Game");
        Entity.AddComponent(newGame, newGameClick);

        var newGameAnimation = new AnimationComponent();
        
        var newGameAnimationFadeInText = new AnimationSequence();
        newGameAnimationFadeInText.type = AnimationSequenceTypes.NUMBER;
        newGameAnimationFadeInText.component = Components.TEXT;
        newGameAnimationFadeInText.path = "color";
        newGameAnimationFadeInText.property = "a";
        newGameAnimationFadeInText.keyframes = [0, 500, 1500];
        newGameAnimationFadeInText.values = [0, 0, 1];
        newGameAnimationFadeInText.easing = "EaseInOutQuad";
        newGameAnimationFadeInText.loop = false;
        newGameAnimation.sequences.push(newGameAnimationFadeInText);

        var newGameAnimationFadeInColor = new AnimationSequence();
        newGameAnimationFadeInColor.type = AnimationSequenceTypes.NUMBER;
        newGameAnimationFadeInColor.component = Components.SHAPE;
        newGameAnimationFadeInColor.path = "color";
        newGameAnimationFadeInColor.property = "a";
        newGameAnimationFadeInColor.keyframes = [0, 500, 1500];
        newGameAnimationFadeInColor.values = [0, 0, 1];
        newGameAnimationFadeInColor.easing = "EaseInOutQuad";
        newGameAnimationFadeInColor.loop = false;
        newGameAnimation.sequences.push(newGameAnimationFadeInColor); 

        var newGameAnimationFadeInOutlineColor = new AnimationSequence();
        newGameAnimationFadeInOutlineColor.type = AnimationSequenceTypes.NUMBER;
        newGameAnimationFadeInOutlineColor.component = Components.SHAPE;
        newGameAnimationFadeInOutlineColor.path = "outlineColor";
        newGameAnimationFadeInOutlineColor.property = "a";
        newGameAnimationFadeInOutlineColor.keyframes = [0, 500, 1500];
        newGameAnimationFadeInOutlineColor.values = [0, 0, 1];
        newGameAnimationFadeInOutlineColor.easing = "EaseInOutQuad";
        newGameAnimationFadeInOutlineColor.loop = false;
        newGameAnimation.sequences.push(newGameAnimationFadeInOutlineColor);

        Entity.AddComponent(newGame, newGameAnimation);

        this.entityManager.add(newGame, Layers.UI);

        // Join Game Button
        var joinGame = new Entity();

        var joinGameTransform = new TransformComponent(Vector.Zero, new Vector(100, 30));
        Entity.AddComponent(joinGame, joinGameTransform);

        var joinGameShape = new ShapeComponent(new Color(0, 0, 20, 1), ShapeTypes.RECTANGLE, Color.White, 2, 10);
        Entity.AddComponent(joinGame, joinGameShape);

        var joinGameText = new TextComponent("Join", "15", Color.White);
        Entity.AddComponent(joinGame, joinGameText);

        var joinGameAnchor = new ViewportAnchorComponent(HorizontalAlignments.CENTER, VerticalAlignments.MIDDLE, new Vector(0, 50));
        Entity.AddComponent(joinGame, joinGameAnchor);

        var joinGameHover = new HoverComponent()
        Entity.AddComponent(joinGame, joinGameHover);

        var joinGameClick = new ClickComponent("Join Game");
        Entity.AddComponent(joinGame, joinGameClick);

        var joinGameAnimation = new AnimationComponent();

        var joinGameAnimationFadeInText = new AnimationSequence();
        joinGameAnimationFadeInText.type = AnimationSequenceTypes.NUMBER;
        joinGameAnimationFadeInText.component = Components.TEXT;
        joinGameAnimationFadeInText.path = "color";
        joinGameAnimationFadeInText.property = "a";
        joinGameAnimationFadeInText.keyframes = [0, 1000, 2000];
        joinGameAnimationFadeInText.values = [0, 0, 1];
        joinGameAnimationFadeInText.easing = "EaseInOutQuad";
        joinGameAnimationFadeInText.loop = false;
        joinGameAnimation.sequences.push(joinGameAnimationFadeInText);

        var joinGameAnimationFadeInColor = new AnimationSequence();
        joinGameAnimationFadeInColor.type = AnimationSequenceTypes.NUMBER;
        joinGameAnimationFadeInColor.component = Components.SHAPE;
        joinGameAnimationFadeInColor.path = "color";
        joinGameAnimationFadeInColor.property = "a";
        joinGameAnimationFadeInColor.keyframes = [0, 1000, 2000];
        joinGameAnimationFadeInColor.values = [0, 0, 1];
        joinGameAnimationFadeInColor.easing = "EaseInOutQuad";
        joinGameAnimationFadeInColor.loop = false;
        joinGameAnimation.sequences.push(joinGameAnimationFadeInColor); 

        var joinGameAnimationFadeInOutlineColor = new AnimationSequence();
        joinGameAnimationFadeInOutlineColor.type = AnimationSequenceTypes.NUMBER;
        joinGameAnimationFadeInOutlineColor.component = Components.SHAPE;
        joinGameAnimationFadeInOutlineColor.path = "outlineColor";
        joinGameAnimationFadeInOutlineColor.property = "a";
        joinGameAnimationFadeInOutlineColor.keyframes = [0, 1000, 2000];
        joinGameAnimationFadeInOutlineColor.values = [0, 0, 1];
        joinGameAnimationFadeInOutlineColor.easing = "EaseInOutQuad";
        joinGameAnimationFadeInOutlineColor.loop = false;
        joinGameAnimation.sequences.push(joinGameAnimationFadeInOutlineColor);

        Entity.AddComponent(joinGame, joinGameAnimation);

        this.entityManager.add(joinGame, Layers.UI);
    }

    // Game Scene
    gameScene() {
        this.worldSize = new Vector(1200, 800);
        this.entityManager.clear();

        var l = this.viewportSize.x / 25;
        var s = new Vector(l, l);
        var w = Math.sqrt(3) * s.x / 2;
        var h = 2 * s.y / 4;
        var m = 5;
        var points = [];
        points.push(new Vector(w * 2, h * -6));
        points.push(new Vector(0, h * -6));
        points.push(new Vector(w * -2, h * -6));
        points.push(new Vector(w * 3, h * -3));
        points.push(new Vector(w * 1, h * -3));
        points.push(new Vector(w * -1, h * -3));
        points.push(new Vector(w * -3, h * -3));
        points.push(new Vector(w * -4, 0));
        points.push(new Vector(w * -2, 0));
        points.push(new Vector(0, 0));
        points.push(new Vector(w * 2, 0));
        points.push(new Vector(w * 4, 0));
        points.push(new Vector(w * -3, h * 3));
        points.push(new Vector(w * -1, h * 3));
        points.push(new Vector(w * 1, h * 3));
        points.push(new Vector(w * 3, h * 3));
        points.push(new Vector(w * -2, h * 6));
        points.push(new Vector(0, h * 6));
        points.push(new Vector(w * 2, h * 6));

        for (var i = 0; i < points.length; i++) {
            var entity = new Entity();
            var scale = Vector.Copy(s);
            var position = points[i];
            Entity.AddComponent(entity, new TransformComponent(position, scale));
            var color = new Color(Random.Int(0, 360), 75, 60, 1);
            Entity.AddComponent(entity, new ShapeComponent(color, ShapeTypes.HEXAGON, Color.Black, 5));
            this.entityManager.add(entity);
        }
    }
}

var socket = io();
var scene = new GameScene();
scene.mainMenu();
scene.toggleLoop();
