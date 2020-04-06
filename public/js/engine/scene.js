/*
* Holds all data for a scene. Implements game loop functions.
*/
class Scene {
    constructor() {
        // Scene data
        this.runUpdate = true;
        this.showDebug = false;
        this.worldSize = Vector.One;
        this.viewportSize = Vector.Zero;

        // Main loop
        this.loop = new Loop(this);

        // Canvas
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        // Entity manager
        this.entityManager = new EntityManager();

        // Camera        
        this.camera = new Camera(this);

        // Input
        this.input = new Input();
        this.keyHandler = new KeyHandler();

        // Sound
        this.soundManager = new SoundManager();

        // Events
        this.eventManager = new EventManager();

        // Systems
        this.movementSystem = new MovementSystem(this);
        this.shapeRendererSystem = new ShapeRendererSystem(this);
        this.traceRendererSystem = new TraceRendererSystem(this);
        this.selectionSystem = new SelectionSystem(this);
        this.selectedHighlightSystem = new SelectedHighlightSystem(this);
        this.expirationSystem = new ExpirationSystem(this);
        this.particleEmissionSystem = new ParticleEmissionSystem(this);
        this.forceFieldSystem = new ForceFieldSystem(this);
        this.animationSystem = new AnimationSystem(this);
        this.navigationSystem = new NavigationSystem(this);
        this.navigationRecipientSystem = new NavigationRecipientSystem(this);
        this.roomGeneratorSystem = new RoomGeneratorSystem(this);
        this.textRendererSystem = new TextRendererSystem(this);
        this.viewportAnchorSystem = new ViewportAnchorSystem(this);
        this.hoverSystem = new HoverSystem(this);
        this.clickSystem = new ClickSystem(this);

        // Pause when focus lost
        window.addEventListener("visibilitychange", () => {
            this.toggleLoop();
        });

        // Resize
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.viewportSize = new Vector(window.innerWidth, window.innerHeight);
    }

    toggleLoop() {
        if (this.loop.isRunning()) {
            this.loop.stop();
            this.soundManager.sequencer.stop();
        }
        else {
            this.loop.start();
            this.soundManager.sequencer.start();
        }
    }

    // Loop update function.
    update(delta) {

        // Send key pressed events
        for (var k in KeyCodes) {
            var key = KeyCodes[k];
            this.keyHandler.keyStarted(key);
            if (this.keyHandler.keyEnded(key)) {
                this.keyPressed(key);
                this.eventManager.register(new KeyPressedEvent(key));
            }
        }       

        // Allow selection even on paused game
        this.navigationRecipientSystem.update(delta);
        this.selectionSystem.update(delta);
        this.hoverSystem.update(delta);
        this.clickSystem.update(delta);

        // Allow camera movement even on paused game
        this.camera.update(delta);

        // Systems to update when game is running
        if (this.runUpdate) {
            this.eventManager.dispatch(); // should run outside?
            this.expirationSystem.update(delta);
            this.navigationSystem.update(delta);
            this.movementSystem.update(delta);
            this.viewportAnchorSystem.update(delta);
            this.forceFieldSystem.update(delta);
            this.traceRendererSystem.update(delta);
            this.particleEmissionSystem.update(delta);
            this.animationSystem.update(delta);
        }

    }

    // Loop render function.
    draw(interp) {

        // Clear canvas and save 
        this.ctx.clearRect(0, 0, this.viewportSize.x, this.viewportSize.y);
        this.ctx.save();

        // Zoom camera according to scale
        this.ctx.scale(this.camera.zoom, this.camera.zoom);

        // Center world in canvas
        this.ctx.translate(this.viewportSize.x / (2 * this.camera.zoom), this.viewportSize.y / (2 * this.camera.zoom));

        // Scroll camera center
        this.ctx.translate(-1 * this.camera.position.x, -1 * this.camera.position.y);

        // Debug
        this.drawDebugBackground();

        // Systems with render logic affected by camera
        this.traceRendererSystem.draw(interp, this.ctx, true);
        this.shapeRendererSystem.draw(interp, this.ctx, true);
        this.textRendererSystem.draw(interp, this.ctx, true);
        this.selectedHighlightSystem.draw(interp, this.ctx, true);

        // Restore to draw relative to window edges
        this.ctx.restore();

        // Draw Fog        
        this.camera.draw(interp, this.ctx);

        // Systems with render logic relative to viewport
        this.traceRendererSystem.draw(interp, this.ctx, false);
        this.shapeRendererSystem.draw(interp, this.ctx, false);
        this.textRendererSystem.draw(interp, this.ctx, false);
        this.selectedHighlightSystem.draw(interp, this.ctx, false);

        // Debug
        this.drawDebugForeground();

        // Draw cursor
        Input.Instance.draw(interp, this.ctx);

    }

    // Loop begin function.
    begin(timestamp, delta) {

    }

    // Loop end function.
    end(fps, panic) {

    }

    // Draws debug grid in backgorund
    drawDebugBackground() {
        if (this.showDebug) {
            // Reference grid
            var axisStyle = Color.Style(new Color(0, 100, 50, 0.5));
            var guideStyle = Color.Style(new Color(0, 0, 100, 0.2));
            for (var i = this.worldSize.x / -2; i < this.worldSize.x / 2; i += 100) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = i == 0 ? axisStyle : guideStyle;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(i, this.worldSize.y / -2);
                this.ctx.lineTo(i, this.worldSize.y / 2);
                this.ctx.stroke();
            }
            for (var i = this.worldSize.y / -2; i < this.worldSize.y / 2; i += 100) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = i == 0 ? axisStyle : guideStyle;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(this.worldSize.x / -2, i);
                this.ctx.lineTo(this.worldSize.x / 2, i);
                this.ctx.stroke();
            }

            // World edges
            this.ctx.beginPath();
            this.ctx.strokeStyle = Color.Style(Color.White);
            this.ctx.lineWidth = 4;
            this.ctx.rect(0 - Math.round(this.worldSize.x / 2), 0 - Math.round(this.worldSize.y / 2), this.worldSize.x, this.worldSize.y);
            this.ctx.stroke();
        }
    }

    // Draws debug data in foreground
    drawDebugForeground() {
        if (this.showDebug) {
            var x = 15;
            var y = 15;
            this.ctx.fillStyle = Color.Style(Color.White50);
            this.ctx.font = "12px monospace";
            this.ctx.textBaseline = "top";
            this.ctx.textAlign = "right";
            this.ctx.fillText(Math.round(this.loop.getFPS()) + " FPS", this.viewportSize.x - 15, 15);

            var text = this.camera.toString();
            text += "\n" + "Entities count:   " + this.entityManager.count();
            this.ctx.fillStyle = Color.Style(Color.White50);
            this.ctx.font = "12px monospace";
            this.ctx.textBaseline = "top";
            this.ctx.textAlign = "left";
            var lines = text.split("\n");
            for (var i = 0; i < lines.length; i++) {
                this.ctx.fillText(lines[i], x, y);
                y += 15;
            }
        }
    }

    keyPressed(key) {

        switch (key) {
            case KeyCodes.KEY_C:
                this.entityManager.save();
                break;
            case KeyCodes.KEY_V:
                this.entityManager.load();
                break;
            case KeyCodes.SPACE:
                this.runUpdate = !this.runUpdate;
                if (this.runUpdate)
                    this.soundManager.sequencer.start();
                else
                    this.soundManager.sequencer.stop();
                break;
            case KeyCodes.KEY_Q:
                this.showDebug = !this.showDebug;
                break;
        }
    }
}