require.config({
    baseUrl: './src',
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

    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var $canvas = $("#game");
    var context = $canvas[0].getContext("2d");
    var renderer = new Renderer(context);
    var request = $.getJSON("http://localhost:5000");
    request.done(function (data) {

        // Keyboard stuff
        var depressed = [];
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

        var panRate = 10;
        var zoomRate = 100;

        var commands = {
            // Panning
            87: function (c) {c.pan(0, -panRate);}, // W
            65: function (c) {c.pan(-panRate, 0);}, // A
            83: function (c) {c.pan(0, panRate);}, // S
            68: function (c) {c.pan(panRate, 0);}, // D
            // Zooming
            81: function (c) {c.zoom(zoomRate);}, // Q
            69: function (c) {c.zoom(-zoomRate);}, // E
            32: function (c) {c.move(0, 0); c.scale = 50;}
        };

        // Deserialize JSON into usable game state object
        var warbanners = Game.unmarshal(data);

        // Start render loop
        (function loop() {
            requestAnimFrame(loop);
            if (!renderer.paused) {
                // Fire commands
                _.each(depressed, function (key) {
                    if (_.isFunction(commands[key])) {
                        commands[key].call(this, renderer);
                    }
                });
                // Draw state
                renderer.draw(warbanners);
            }
        }());
    });
});
