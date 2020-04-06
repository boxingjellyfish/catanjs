/*
* Handles event queue.
*/
class EventManager {
    constructor() {
        // shift - push
        this.queue = [];
        this.listeners = [];
    }

    register(event) {
        this.queue.push(event);
    }

    dispatch() {
        while (this.queue.length > 0) {
            var event = this.queue.shift();
            for (var i = 0; i < this.listeners.length; i++) {
                this.listeners[i].handle(event);
            }
        }
    }
}

/*
* Base Event
*/
class BaseEvent {
    constructor(name) {
        this.id = Random.UUID();
        this.name = name;
    }
}

/*
* Generate Room Event
*/
class GenerateRoomEvent extends BaseEvent {
    constructor() {
        super(Events.GENERATE_ROOM);        
        this.color = new Color(0, 0, 20, 1);
        this.centerPosition = Vector.Zero;
        this.centerBounds = 200;
        this.minSize = 50;
        this.maxSize = 600;
        this.minRectangles = 6;
        this.maxRectangles = 16;
        this.minRatio = 0.3;
        this.maxRatio = 0.8;
    }
}

/*
* Click Event
*/
class ClickEvent extends BaseEvent {
    constructor(action) {
        super(Events.CLICK);
        this.action = action;
    }
}

/*
* KeyPressed Event
*/
class KeyPressedEvent extends BaseEvent {
    constructor(key) {
        super(Events.KEY_PRESSED);
        this.key = key;
    }
}