require.config({
    baseUrl: './',
    paths: {
        "jquery": "vendor/jquery.min",
        "domReady": "https://raw.github.com/requirejs/domReady/latest/domReady"
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

    // authenticate player with the server

    // load a snapshop of the state to the client

    // render the state in the canvas

    // prepare all click handlers to recieve game input

    var context = document.getElementById("game").getContext("2d");
    var request = $.getJSON("state.json");
    var renderer = new Renderer(context);

    request.done(function (data) {
        renderer.draw(data.state);
    });
});
