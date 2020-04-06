var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var path = require("path");
require(path.resolve("shared/common.js"));
require(path.resolve("public/js/engine/basic.js"));

app.use(express.static("public"));
app.use(express.static("shared"));

app.get("/", function (req, res) {
    res.sendFile(path.resolve("public/index.html"));
});

app.get("/sandbox", function (req, res) {
    res.sendFile(path.resolve("public/sandbox.html"));
});

io.on("connection", function (socket) {
    console.log("a user connected");
    privateGameState = new PrivateGameState();
    publicGameState = new PublicGameState();
    initializeGameData(privateGameState, publicGameState);
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});


function initializeGameData(privateGameState, publicGameState) {
    var terrainDeck = Random.Shuffle(privateGameState.terrainDeck);
    var tokenDeck = Random.Shift(privateGameState.tokenDeck);

    publicGameState.tiles = [];
    for (var i = 0; i < terrainDeck.length; i++) {
        var tile = new Tile();
        tile.terrain = terrainDeck.shift();
        if(tile.terrain != Terrains.DESERT) {
            tile.token = tokenDeck.shift();
        }
        publicGameState.tiles.push(tile);
    }
}

/*
* Private Game state data
*/
class PrivateGameState {

    constructor() {
        this.terrainDeck = [
            Terrains.FIELDS,
            Terrains.FIELDS,
            Terrains.FIELDS,
            Terrains.FIELDS,
            Terrains.FOREST,
            Terrains.FOREST,
            Terrains.FOREST,
            Terrains.FOREST,
            Terrains.PASTURE,
            Terrains.PASTURE,
            Terrains.PASTURE,
            Terrains.PASTURE,
            Terrains.MOUNTAINS,
            Terrains.MOUNTAINS,
            Terrains.MOUNTAINS,
            Terrains.HILLS,
            Terrains.HILLS,
            Terrains.HILLS,
            Terrains.DESERT,
        ];

        this.tokenDeck = [
            Tokens.A,
            Tokens.B,
            Tokens.C,
            Tokens.D,
            Tokens.E,
            Tokens.F,
            Tokens.G,
            Tokens.H,
            Tokens.I,
            Tokens.J,
            Tokens.K,
            Tokens.L,
            Tokens.M,
            Tokens.N,
            Tokens.O,
            Tokens.P,
            Tokens.Q,
            Tokens.R
        ];

        this.developmentDeck = [
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.KNIGHT,
            Developments.MONOPOLY,
            Developments.MONOPOLY,
            Developments.ROAD_BUILDING,
            Developments.ROAD_BUILDING,
            Developments.YEAR_OF_PLENTY,
            Developments.YEAR_OF_PLENTY,
            Developments.VICTORY_POINT,
            Developments.VICTORY_POINT,
            Developments.VICTORY_POINT,
            Developments.VICTORY_POINT,
            Developments.VICTORY_POINT
        ];
    }
}