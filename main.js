require("extention.global");
require("extention.room");
require("extention.spawn");
require("extention.source");
require("extention.creep");

var Screeper = require("screeper");
var StructureModel = require("model.structure");
var CreepModel = require("model.creep");

module.exports.loop = function () {
    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        if (Screeper.overload) Screeper.overload();
        return;
    }

    var name;
    if (!Memory.rooms) Memory.rooms = {};
    for (name in Memory.rooms) {
        if (!Game.rooms[name]) {
            if (Screeper.room) Screeper.room(name, true);
            delete Memory.rooms[name];
        }
    }

    for (name in Game.rooms) {
        var room = Game.rooms[name], diff;
        if (!Memory.rooms[name]) {
            Memory.rooms[name] = { room: name, structures: {}, creeps: {} };
            if (Screeper.room) Screeper.room(name, false);
        }

        for (name in room.memory.structures) {
            var structure = room.memory.structures[name];
            if (!Game.structures[structure.id]) {
                if (Screeper.structure) Screeper.structure(room, room.memory.structures[structure.id], true);
                delete room.memory.structures[structure.id];
            }
        }

        for (name in Game.structures) {
            var structure = Game.structures[name];
            if (!structure.room || structure.room.name != room.name)
                continue;

            if (!room.memory.structures[structure.id]) {
                room.memory.structures[structure.id] = new StructureModel(structure.id, structure.structureType, structure.pos);
                if (Screeper.structure) Screeper.structure(room, room.memory.structures[structure.id], false);
            }
        }

        for (name in room.memory.creeps) {
            var creep = room.memory.creeps[name];
            if (!Game.creeps[creep.name]) {
                if (Screeper.creep) Screeper.creep(room, room.memory.creeps[creep.name], true);
                delete room.memory.creeps[creep.name];
            }
        }

        for (name in Memory.creeps) {
            if (!Game.creeps[name] || !Memory.creeps[name]._move) {
                delete Memory.creeps[name];
            }
        }

        for (name in Game.creeps) {
            var creep = Game.creeps[name];
            if (!creep.room || creep.room.name != room.name || creep.spawning || !creep.my)
                continue;

            if (room.memory.creeps[creep.name] && room.memory.creeps[creep.name].id == -1) {
                room.memory.creeps[creep.name].id = creep.id;
                if (Screeper.creep) Screeper.creep(room, room.memory.creeps[creep.name], false);
            }
        }

        if (Memory._tick) {
            for (name in global._tick) {
                var tickout = global._tick[name];
                if ((Game.time - tickout.start) >= tickout.timeout) {
                    tickout.callback();
                    delete global._tick[name];
                }
            }
        }

        // Tick room
        if (Screeper.tick) Screeper.tick(room);
    }
}