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

require(["jquery", "domReady", "game", "render"],
function ($, doc, Game, Renderer) {
    "use strict";

    var context = document.getElementById("game").getContext("2d");
    var request = $.getJSON("example.json");
    var renderer = new Renderer(context);
    request.done(function (data) {
        var game = Game.unmarshal(data);
        renderer.draw(game);
    });
});
