define(["underscore", "house", "player", "city", "army", "vec2"],
function (_, House, Player, City, Army, Vec2) {
    function Game() {
        this.cities = [];
        this.tiles = [];
        this.players = [];
        this.houses = [];
        this.armies = [];
    }

    Game.unmarshal = function (data) {
        var game = new Game();

        // houses
        game.houses = data.state.houses;
        _.each(game.houses, function (house, houseID, houses) {
            houses[houseID] = new House(house.name, house.allegiances);
        });

        _.each(game.houses, function (house, houseID, houses) {
            _.each(house.allegiances, function (houseID, i, allegiances) {
                allegiances[i] = houses[houseID];
            });
        });

        // players
        game.players = data.state.players;
        _.each(game.players, function (player, id, players) {
            players[id] = new Player(id, game.houses[player.house]);
        });

        // cities
        game.cities = data.state.cities;
        _.each(game.cities, function (city, id, cities) {
            cities[id] = new City(game.players[city.player], city.location.x, city.location.y);
        });

        // armies
        game.armies = data.state.armies;
        _.each(game.armies, function (army, i, armies) {
            armies[i] = new Army(game.cities[army.city], army.health, army.location)
        });

        game.tiles = data.state.tiles;
        return game;
    };

    return Game;
});
