require("extension.random");

var Screeper = require("screeper");
module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (Screeper.busy) Screeper.busy();
        return;
    }
};