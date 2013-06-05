define(["underscore", "vec2"], function (_, Vec2) {
    "use strict";

    var tileColors = {
        "Desert": "#FFEE00",
        "Plains": "#5DB854",
        "Forest": "#014511",
        "Tundra": "#E8E8E8",
        "Arctic": "#E8E8E8",
        "Rivers": "#0062FF",
        "Mountain": "#2B2620"
    };

    function y(x, y, w, h) {
        return x % 2 ? h * y + (h / 2) : h * y;
    }

    function x(x, y, w, h) {
        return w * (x * (3 / 4));
    }

    function Render(context) {
        this.context = context;
        this.canvas = context.canvas;
        this.position = new Vec2(0, 0);
        this.scale = 50;
    };

    Render.prototype.paused = false;

    Render.prototype.scaled = function (i) {
        return i / this.scale;
    };

    Render.prototype.unscaled = function (i) {
        return i * this.scale;
    };

    Render.prototype.pan = function (x, y) {
        this.position.x += this.scaled(x);
        this.position.y += this.scaled(y);
    };

    Render.prototype.zoom = function (i) {
        this.scale += this.scaled(i);
    };

    Render.prototype.move = function (x, y) {
        this.position.x = this.scaled(x);
        this.position.y = this.scaled(x);
    };

    Render.prototype.draw = function (state) {
        var self    = this,
            context = this.context,
            board   = state.board,
            tiles   = state.board.tiles,
            cities  = _.flatten(_.pluck(state.players, "cities")),
            armies  = _.flatten(_.pluck(cities, "armies")),
            w       = 1,
            h       = Math.sqrt(3) / 2 * w;

        context.save();
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.scale(this.scale, this.scale);
        context.translate(-this.position.x, -this.position.y);

        // Draw and tesselate them hexagons
        _.each(tiles, function (column, yp) {
            _.each(column, function (t, xp) {
                context.save();
                context.translate(x(xp, yp, w, h), y(xp, yp, w, h));
                context.lineWidth = 1 / self.scale;
                context.strokeStyle = "#111";
                context.fillStyle = tileColors[board.terrains[t]];

                context.beginPath();
                context.moveTo(w * 0.25, h * 0.00);
                context.lineTo(w * 0.75, h * 0.00);
                context.lineTo(w * 1.00, h * 0.50);
                context.lineTo(w * 0.75, h * 1);
                context.lineTo(w * 0.25, h * 1);
                context.lineTo(w * 0, h * 0.50);
                context.closePath();

                context.fill();
                context.stroke();
                context.restore();
            });
        });

        // Cities
        _.each(cities, function (city) {
            context.save();
            context.translate(
                x(city.x + 1, city.y, w, h) - 0.25,
                y(city.x, city.y, w, h) + 0.43);
            context.arc(0, 0, 0.25, 0, 360, true);
            context.fillStyle = "royalBlue";
            context.fill();
            context.restore();
        });

        // Armies
        _.each(armies, function (army) {
            context.save();
            context.translate(
                x(army.x + 1, army.y, w, h) - 0.40,
                y(army.x, army.y, w, h) + 0.25);
            context.fillStyle = "#F22E18";
            context.fillRect(0, 0, 0.35, 0.35);
            context.restore();
        });

        context.restore();
    };

    return Render;
});
