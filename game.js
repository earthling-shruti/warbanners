define(function () {
    function Game() {
        this.cities = [];
        this.tiles = [];
        this.players = [];
        this.houses = [];
        this.armies = [];
    }

    Game.parse = function (data) {
        var game = new Game();
        data.armies = data.state.armies;
        game.cities = data.state.cities;
        game.houses = data.state.houses;
        game.players = data.state.players;
        game.tiles = data.state.tiles;
        return game;
    };

    return Game;
});
