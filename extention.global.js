var MersenneTwister = require("module.mersenne-twister");

global.log = function(message) {
    console.log(`${message}, time: ${Game.time}`);
}

global.random = function() {
    var hex = new MersenneTwister().genrand_res53().toString(16);
    return hex.replace("0.", "");
}