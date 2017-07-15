require("extention.global");
require("extention.room");
require("extention.source");
require("extention.creep");

var Brain = require("brain");
var StructureModel = require("model.structure");
var CreepModel = require("model.creep");

module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (Brain.overload) Brain.overload();
        return;
    }

    for (name in Game.rooms) {
        var room = Game.rooms[name], name, diff;
        if (!room.memory.room) room.memory.room = room.name;
        if (!room.memory.structures) room.memory.structures = {};
        if (!room.memory.creeps) room.memory.creeps = {};

        // Synchronize memory with game state
        for (name in room.memory.structures) {
            var structure = room.memory.structures[name];
            if (!Game.structures[structure.id]) {
                if (Brain.structure) Brain.structure(room.memory.structures[structure.id], true);
                delete room.memory.structures[structure.id];
            }
        }

        for (name in Game.structures) {
            var structure = Game.structures[name];
            if (!structure.room || structure.room.name != room.name)
                continue;

            if (!room.memory.structures[structure.id]) {
                room.memory.structures[structure.id] = new StructureModel(structure.id, structure.structureType, structure.pos);
                if (Brain.structure) Brain.structure(room.memory.structures[structure.id], false);
            }
        }

        for (name in room.memory.creeps) {
            var creep = room.memory.creep[name];
            if (!Game.creeps[creep.name]) {
                if (Brain.creep) Brain.creep(room.memory.creep[creep.name], true);
                delete room.memory.creeps[creep.name];
            }
        }

        for (name in Game.creeps) {
            var creep = Game.creep[name];
            if (!creep.room || creep.room.name != room.name || creep.spawning || !creep.my)
                continue;

            if (!room.memory.creeps[creep.name]) {
                room.memory.creeps[creep.name] = new CreepModel(creep.id, creep.name);
                if (Brain.creep) Brain.creep(room.memory.creeps[creep.name], false);
            }
        }

        // Tick room
        if (Brain.tick) Brain.tick(room);
    }

    console.log(global.random());
}