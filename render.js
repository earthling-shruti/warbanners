define(function () {
    "use strict";

    var tileMap = [
        "desert",
        "plains",
        "forest",
        "tundra",
        "arctic",
        "rivers",
        "mountain",
        "something"
    ];

    var tileColors = {
        "desert": "#FFEE00",
        "plains": "#5DB854",
        "forest": "#014511",
        "tundra": "#E8E8E8",
        "arctic": "#E8E8E8",
        "rivers": "#0062FF",
        "mountain": "#2B2620",
        "something": "#2B2620"
    };

    function Render(context) {
        this.context = context;
        this.canvas = context.canvas;
        context.scale(50, 50);
    }

    Render.prototype.draw = function (state) {
        this.tiles(state.tiles);
    };

    Render.prototype.tile = function (x, y, t) {
        var w = 1;
        var h = Math.sqrt(3) / 2 * w;
        var yt = x % 2 ? h * y + (h / 2) : h * y;
        var context = this.context;

        context.save();
        context.translate(w * (x * (3 / 4)), yt);
        context.lineWidth = 1 / 25;
        context.strokeStyle = "#fff"
        context.fillStyle = tileColors[tileMap[t]];

        context.beginPath();
        context.moveTo(w * 0.25, h * 0.00);
        context.lineTo(w * 0.75, h * 0.00);
        context.lineTo(w * 1.00, h * 0.50);
        context.lineTo(w * 0.75, h * 1);
        context.lineTo(w * 0.25, h * 1);
        context.lineTo(w * 0, h * 0.50);
        context.closePath();

        context.fill();
        context.restore();

        return this;
    };

    Render.prototype.tiles = function (tiles) {
        var x, y;
        for (y = 0; y < tiles.length; y += 1) {
            for (x = 0; x < tiles[y].length; x += 1) {
                this.tile(x, y, tiles[y][x]);
            }
        }

        return this;
    };

    Render.prototype.city = function () {
        return this;
    };

    Render.prototype.cities = function (cities) {
        var i;
        for (i = 0; i < cities.length; i += 1) {
            this.city(cities[i].position.x, cities[i].position.y);
        }
        return this;
    };

    return Render;
});
