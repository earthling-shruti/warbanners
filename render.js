define(["underscore"], function (_) {
    "use strict";

    var scale = 100;

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
    }

    Render.prototype.draw = function (state) {
        var ctx    = this.context,
            board  = state.board,
            tiles  = state.board.tiles,
            cities = _.flatten(_.pluck(state.players, "cities")),
            armies = _.flatten(_.pluck(cities, "armies")),
            w = 1, h = Math.sqrt(3) / 2 * w,
            yt, xt;

        // Global scale
        ctx.scale(scale, scale);
        ctx.translate(-0.5, -0.5);

        // Draw and tesselate them hexagons
        _.each(tiles, function (column, yp) {
            _.each(column, function (t, xp) {
                ctx.save();
                ctx.translate(x(xp, yp, w, h), y(xp, yp, w, h));
                ctx.lineWidth = 1 / scale;
                ctx.strokeStyle = "#111";
                ctx.fillStyle = tileColors[board.terrains[t]];

                ctx.beginPath();
                ctx.moveTo(w * 0.25, h * 0.00);
                ctx.lineTo(w * 0.75, h * 0.00);
                ctx.lineTo(w * 1.00, h * 0.50);
                ctx.lineTo(w * 0.75, h * 1);
                ctx.lineTo(w * 0.25, h * 1);
                ctx.lineTo(w * 0, h * 0.50);
                ctx.closePath();

                ctx.fill();
                ctx.stroke();
                ctx.restore();
            });
        });

        // Cities
        _.each(cities, function (city) {
            ctx.save();
            ctx.translate(
                x(city.x + 1, city.y, w, h) - 0.25,
                y(city.x, city.y, w, h) + 0.43);
            ctx.arc(0, 0, 0.25, 0, 360, true);
            ctx.fillStyle = "royalBlue";
            ctx.fill();
            ctx.restore();
        });

        // Armies
        _.each(armies, function (army) {
            ctx.save();
            ctx.translate(
                x(army.x + 1, army.y, w, h) - 0.40,
                y(army.x, army.y, w, h) + 0.25);
            ctx.fillStyle = "#F22E18";
            ctx.fillRect(0, 0, 0.35, 0.35);
            ctx.restore();
        });
    };

    return Render;
});
