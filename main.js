require("extention.global");
require("extention.room");
require("extention.source");
require("extention.creep");

var brain = require("brain");
Memory.structures = {};

module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (brain.overload) brain.overload();
        return;
    }

    var name, diff;
    diff = global.sync(Memory.spawns, Game.spawns);
    if (diff.left.length > 0) {
        for (name in diff.left)
            if (brain.spawn) brain.spawn(Memory.spawns[name], true);
    }

    if (diff.right.length > 0) {
        for (name in diff.left)
            if (brain.spawn) brain.spawn(Game.spawns[name], false);
    }

    diff = global.sync(Memory.structures, Game.structures);
    if (diff.left.length > 0) {
        for (name in diff.left)
            if (brain.structure) brain.structure(Memory.structures[name], true);
    }

    if (diff.right.length > 0) {
        for (name in diff.left)
            if (brain.structure) brain.structure(Game.structures[name], false);
    }

    diff = global.sync(Memory.creeps, Game.creeps);
    if (diff.left.length > 0) {
        for (name in diff.left)
            if (brain.creep) brain.creep(Memory.creeps[name], true);
    }

    if (diff.right.length > 0) {
        for (name in diff.left)
            if (brain.creep) brain.creep(Game.creeps[name], true);
    }
}