define(["underscore"], function (_) {
    "use strict";

    function Player(id, name, cities, house) {
        this.id = id;
        this.name = name;
        this.cities = cities || [];
        this.house = house;
    }

    function Board(tiles) {
        this.tiles = tiles;
    }

    Board.prototype.terrains = {
        0: "Desert",
        1: "Plains",
        2: "Forest",
        3: "Tundra",
        4: "Arctic",
        5: "Rivers",
        6: "Mountain"
    };

    Board.prototype.costs = {
        "Desert": 1,
        "Plains": 1,
        "Forest": 1,
        "Tundra": 1,
        "Arctic": 2,
        "Rivers": Infinity
    };

    function House(id, name, allies) {
        this.id = id;
        this.name = name;
        this.allies = allies || [];
    }

    function City(id, x, y, armies) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.armies = armies || [];
    }

    function Army(id, x, y, city) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.city = city;
    }

    function Game() {
        this.players = [];
        this.houses = [];
        this.board = new Board([]);
    }

    // Unmarshal a raw JSON object into the various game types
    Game.unmarshal = function (data) {
        var state = new Game(),
            house,
            player,
            city,
            army;

        // Timestamp
        state.timestamp = new Date(Date.parse(data.timestamp));

        // Board
        state.board = new Board(data.board);

        // House
        _.each(data.houses, function (h) {
            house = new House(h.id, h.name, h.allies);
            state.houses[house.id] = house;
        });

        // Player, cities, and armies
        _.each(data.players, function (p) {
            player = new Player(p.id, p.name, p.cities, p.house);
            _.each(p.cities, function (c) {
                city = new City(c.id, c.x, c.y, c.armies);
                _.each(c.armies, function (d) {
                    army = new Army(d.id, d.x, d.y, c.id);
                    city.armies[army.id] = army;
                });
                player.cities[city.id] = city;
            });
            state.players[player.id] = player;
        });

        return state;
    };

    return Game;
});
