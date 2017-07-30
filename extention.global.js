var MersenneTwister = require("module.mersenne-twister");

global.log = function(message) {
    console.log(`${message}, time: ${Game.time}`);
}

global.random = function() {
    var hex = new MersenneTwister().genrand_res53().toString(16);
    return hex.replace(".", "x");
}

global.setTickout = function(callback, timeout) {
    var uid = global.random();
    if (!global._tick) global._tick = {};

    global._tick[uid] = { start: Game.time, timeout: timeout, callback: callback };
    return uid;
}

global.clearTickout = function(id) {
    if (global._tick && global._tick[id]) delete global._tick[id];
}

if (!global._tick) global._tick = {};