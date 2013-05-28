define(function () {
    "use strict";

    function Board(tiles) {
        this.tiles = tiles;
    }

    Board.random = function (rows, columns) {
        var xs = [], ys = [];
        var i, j;
        for (j = 0; j < columns; j += 1) {
            xs = [];
            for (i = 0; i < rows; i += 1) {
                xs.push(Math.floor(Math.random() * 8));
            }
            ys.push(xs);
        }
        return ys;
    };

    return Board;
})
