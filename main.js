require("extension.random");
require("extension.visual");
require("extension.room");
Debug = require("extension.debug");

var Screeper = require("screeper");
module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (Screeper.busy) Screeper.busy();
        return;
    }

    if (Screeper.tick) Screeper.tick();
};