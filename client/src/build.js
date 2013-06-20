({
    baseUrl: './',
    name: 'main',
    out: '../main-built.js',
    paths: {
        "jquery": "vendor/jquery.min",
        "underscore": "vendor/underscore-min",
        "domReady": "vendor/domReady",
        "requireLib": 'vendor/require'
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    },
    include: 'requireLib'
})
