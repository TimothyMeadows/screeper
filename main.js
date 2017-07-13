require("extention.room");
require("extention.source");
require("extention.creep");

var brain = require("brain");
module.exports.loop = function () {
    var name, creep;
    for (name in Memory.creeps) {
        if (!Game.creeps[name]) {
            if (brain.death) brain.death(Memory.creeps[name]);
            delete Memory.creeps[name];
        }
    }

    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (brain.overload) brain.overload();
        return;
    }

    if (brain.tick) brain.tick();
}