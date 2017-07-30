var MersenneTwister = require("module.mersenne-twister");

global.log = function(message) {
    console.log(`${message}, time: ${Game.time}`);
}

global.random = function() {
    var hex = new MersenneTwister().genrand_res53().toString(16);
    return hex.replace(".", "x");
}

global.wait = function(callback, timeout) {
    var uid = global.random();
    global._timer[uid] = { start: Game.time, timeout: timeout, callback: callback, clear: true };
    return uid;
}

global.timer = function(callback, timeout) {
    var uid = global.random();
    global._timer[uid] = { start: Game.time, timeout: timeout, callback: callback, clear: false };
    return uid;
}

global.clear = function(id) {
    if (global._timer && global._timer[id]) delete global._timer[id];
}

if (!global._timer) global._timer = {};