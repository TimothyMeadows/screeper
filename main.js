require("extention.global");
require("extention.room");
require("extention.spawn");
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

    if (Memory.creeps) delete Memory.creeps;
    if (Memory.flags) delete Memory.flags;
    if (Memory.spawns) delete Memory.spawns;

    var name;
    if (!Memory.rooms) Memory.rooms = {};
    for (name in Memory.rooms) {
        if (!Game.rooms[name]) {
            if (Brain.room) Brain.room(name, true);
            delete Memory.rooms[name];
        }
    }

    for (name in Game.rooms) {
        var room = Game.rooms[name], diff;
        if (!Memory.rooms[name]) {
            Memory.rooms[name] = { room: name, structures: {}, creeps: {} };
            if (Brain.room) Brain.room(name, false);
        }

        for (name in room.memory.structures) {
            var structure = room.memory.structures[name];
            if (!Game.structures[structure.id]) {
                if (Brain.structure) Brain.structure(room, room.memory.structures[structure.id], true);
                delete room.memory.structures[structure.id];
            }
        }

        for (name in Game.structures) {
            var structure = Game.structures[name];
            if (!structure.room || structure.room.name != room.name)
                continue;

            if (!room.memory.structures[structure.id]) {
                room.memory.structures[structure.id] = new StructureModel(structure.id, structure.structureType, structure.pos);
                if (Brain.structure) Brain.structure(room, room.memory.structures[structure.id], false);
            }
        }

        for (name in room.memory.creeps) {
            var creep = room.memory.creeps[name];
            if (!Game.creeps[creep.name]) {
                if (Brain.creep) Brain.creep(room, room.memory.creeps[creep.name], true);
                delete room.memory.creeps[creep.name];
            }
        }

        for (name in Game.creeps) {
            var creep = Game.creeps[name];
            if (!creep.room || creep.room.name != room.name || creep.spawning || !creep.my)
                continue;

            if (room.memory.creeps[creep.name].id == -1) {
                room.memory.creeps[creep.name].id = creep.id;
                if (Brain.creep) Brain.creep(room, room.memory.creeps[creep.name], false);
            }
        }

        // Tick room
        if (Brain.tick) Brain.tick(room);
    }
}