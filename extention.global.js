var MersenneTwister = require("module.mersenne-twister");

global.random = function() {
    var hex = new MersenneTwister().genrand_res53().toString(16);
    return hex.replace(".", "x");
}