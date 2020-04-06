/*
* An Entity is just a bag of Components with an ID
* https://medium.com/@savas/nomad-game-engine-part-2-ecs-9132829188e5
* http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript
* https://github.com/sosolimited/Entity-Component-Samples
*/
class Entity {
    constructor() {
        this.id = Random.UUID();
        this.components = {};
        this.parentId = null;
    }

    // Returns a component of Entity by Name.
    static GetComponent(entity, name) {
        return entity.components[name];
    }

    // Retruns true if Entity has all components in Names.
    static HasComponents(entity, names) {
        var hasAll = true;
        for (var i = 0; i < names.length; i++) {
            hasAll &= entity.components[names[i]] != null;
        }
        return hasAll;
    }

    // Adds Component to Entity.
    static AddComponent(entity, component) {
        entity.components[component.name] = component;
    }

    // Removes component from Entity by Name.
    static RemoveComponent(entity, name) {
        entity.components[name] = null;
    }
}

/*
* Manages the collection of entities, ordered by layer
*/
class EntityManager {
    constructor() {
        // Layers in back-to-front order
        this.layers = [Layers.BACKGROUND, Layers.BACKGROUND_PARTICLES, Layers.DEFAULT, Layers.FOREGROUND_PARTICLES, Layers.UI];

        // Associative array of entities by layer
        this.entities = {};
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            this.entities[layer] = [];
        }

        // Lookup table of entities by id
        this.lookup = {};

        // Local Storage key
        this.entitiesStorageKey = "entities";
    }

    // Adds an Entity to Layer
    add(entity, layer = Layers.DEFAULT) {
        this.entities[layer].push(entity);
        this.lookup[entity.id] = entity;
    }

    // Adds all Entities to Layer
    addAll(entities, layer = Layers.DEFAULT) {
        this.entities[layer] = this.entities[layer].concat(entities);
        for (var i = 0; i < entities.length; i++) {
            this.lookup[entities[i].id] = entities[i];
        }
    }

    // Removes entity in Index of Layer
    remove(layer, index) {
        var spliced = this.entities[layer].splice(index, 1);
        delete this.lookup[spliced[0].id];
    }

    // Clears a layer
    clearLayer(layer) {
        for (var i = 0; i < this.entities[layer].length; i++) {
            delete this.lookup[this.entities[layer][i].id];
        }
        this.entities[layer].length = 0;
    }

    // Clears all entities
    clear() {
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            this.clearLayer(layer);
        }
    }

    // Counts number of entities
    count() {
        var total = 0;
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            total += this.entities[layer].length;
        }
        return total;
    }

    // Iterates all Entities with given Components, invoking Action.
    iterate(components, action, includingLayers = null, excludingLayers = null) {
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            if ((includingLayers == null || includingLayers.includes(layer)) && (excludingLayers == null || !excludingLayers.includes(layer))) {
                var layerEntities = this.entities[layer];
                for (var j = 0; j < layerEntities.length; j++) {
                    var entity = layerEntities[j];
                    if (Entity.HasComponents(entity, components)) {
                        action(entity, layer, j);
                    }
                }
            }
        }
    }

    // Iterates all Entities with given Components backwards, invoking Action.
    iterateBackwards(components, action) {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            var layer = this.layers[i];
            var layerEntities = this.entities[layer];
            for (var j = layerEntities.length - 1; j >= 0; j--) {
                var entity = layerEntities[j];
                if (Entity.HasComponents(entity, components)) {
                    action(entity, layer, j);
                }
            }
        }
    }

    // Saves entities array to local storage
    save() {
        var json = JSON.stringify(this.entities);
        window.localStorage.setItem(this.entitiesStorageKey, json);
    }

    // Loads entities array from local storage
    load() {
        var json = window.localStorage.getItem(this.entitiesStorageKey);
        if (json)
            this.entities = JSON.parse(json);
    }

    // @TODO: don´t know yet where to put this
    // Returns entity transform recursively from hierarchy.
    hierarchyTransform(entity) {
        if (entity.parentId == null) {
            return Entity.GetComponent(entity, Components.TRANSFORM);
        } else {
            var parent = this.hierarchyTransform(this.lookup[entity.parentId])
            var transform = Entity.GetComponent(entity, Components.TRANSFORM);
            var position = Vector.Add(Vector.Copy(parent.position), transform.position);
            var scale = Vector.Multiply(Vector.Copy(parent.scale), transform.scale);
            var angle = parent.angle + transform.angle;
            return new TransformComponent(position, scale, angle);
        }
    }

}