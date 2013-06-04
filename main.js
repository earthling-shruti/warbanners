require.config({
    baseUrl: './',
    paths: {
        "jquery": "vendor/jquery.min",
        "domReady": "vendor/domReady",
        "underscore": "vendor/underscore-min"
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    },
    waitSeconds: 15
});

require(["jquery", "domReady", "underscore", "game", "render"],
function ($, doc, _, Game, Renderer) {
    "use strict";

    var $canvas = $("#game");
    var context = $canvas[0].getContext("2d");
    var renderer = new Renderer(context);
    var request = $.getJSON("example.json");
    request.done(function (data) {

        // Deserialize JSON into usable game state object
        var warbanners = Game.unmarshal(data);

        // Keyboard stuff
        var depressed = [];

        var commands = {
            // Panning
            87: function () {renderer.position.y += renderer.toScale(-10);}, // W
            65: function () {renderer.position.x += renderer.toScale(-10);}, // A
            83: function () {renderer.position.y += renderer.toScale(10);}, // S
            68: function () {renderer.position.x += renderer.toScale(10);}, // D

            // Zooming
            81: function () {renderer.scale += 2;}, // Q
            69: function () {renderer.scale += -2;}, // E

            // Reset
            32: function () {
                renderer.position.x = 0;
                renderer.position.y = 0;
                renderer.scale = 50;
            }
        };

        // Start render loop
        (function loop() {
            window.requestAnimationFrame(loop);
            if (!renderer.paused) {
                // Fire commands
                _.each(depressed, function (key) {
                    if (_.isFunction(commands[key])) {
                        commands[key].call();
                    }
                });
                renderer.draw(warbanners);
            }
        }());

        // Keyboard events
        window.onkeydown = function (e) {
            if (depressed.indexOf(e.which) < 0) {
                depressed.push(e.which);
            }
        };

        window.onkeyup = function (e) {
            var index = depressed.indexOf(e.which);
            if (index >= 0) {
                depressed.splice(index, 1);
            }
        };
    });
});
