require("extention.global");
require("extention.room");
require("extention.source");
require("extention.creep");

var brain = require("brain");
module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (brain.overload) brain.overload();
        return;
    }

    for (name in Game.rooms) {
        var room = Game.rooms[name], name, diff;
        if (!room.memory.room) room.memory.room = room.name;
        if (!room.memory.structures) room.memory.structures = {};
        if (!room.memory.creeps) room.memory.creeps = {};

        // Synchronize memory with game state
        for (name in Game.structures) {
            var structure = Game.structures[name];
            if (!structure.room || structure.room.name != room.name)
                continue;

            if (!room.memory.structures[structure.id]) {
                room.memory.structures[structure.id] = structure;
                if (brain.structure) brain.structure(structure, false);
            }
        }

        if (brain.tick) brain.tick(room);
    }
}