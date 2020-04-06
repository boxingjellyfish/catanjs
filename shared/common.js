/*
* Public Game state data
*/
class PublicGameState {

    constructor() {
        // Catan tiles are always 19
        this.tiles = [];
    }
}

if (typeof global !== "undefined")
    global.PublicGameState = PublicGameState;

/*
* Catan Tile
*/
class Tile {

    constructor() {
        this.terrain = Terrains.DESERT;
        this.resource = Resources.NONE;
        this.token = 0;
    }
}

if (typeof global !== "undefined")
    global.Tile = Tile;

/*
* Tile resources
*/
const Resources = {
    WOOL: "Wool",
    GRAIN: "Grain",
    LUMBER: "Lumber",
    BRICK: "Brick",
    ORE: "Ore"
};

if (typeof global !== "undefined")
    global.Resources = Resources;

/*
/ Tile Terrains
*/
const Terrains = {
    FIELDS: "Fields",
    FOREST: "Forest",
    PASTURE: "Pasture",
    MOUNTAINS: "Mountains",
    HILLS: "Hills",
    DESERT: "Desert"
};

if (typeof global !== "undefined")
    global.Terrains = Terrains;

/*
* Development cards
*/
const Developments = {
    KNIGHT: "Knight",
    MONOPOLY: "Monopoly",
    ROAD_BUILDING: "Road Building",
    YEAR_OF_PLENTY: "Year of Plenty",
    VICTORY_POINT: "Victory Point"
};

if (typeof global !== "undefined")
    global.Developments = Developments;

/*
* Tokens
*/
const Tokens = {
    A: 5,
    B: 2,
    C: 6,
    D: 3,
    E: 8,
    F: 10,
    G: 9,
    H: 12,
    I: 11,
    J: 4,
    K: 8,
    L: 10,
    M: 9,
    N: 4,
    O: 5,
    P: 6,
    Q: 3,
    R: 11
};

if (typeof global !== "undefined")
    global.Tokens = Tokens;