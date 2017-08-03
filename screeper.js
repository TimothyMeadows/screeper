var RoomController = require("controller.room");
var CreepController = require("controller.creep");
var TowerStructure = require("structure.tower");

var Screeper;
module.exports = Screeper = {
    // Triggers on creation / destruction based on disposed
    creep: function (room, creep, disposed) {
        if (disposed)
            room.log(`creep ${creep.id}:${creep.name} has died!`);
        else
            room.log(`creep ${creep.id}:${creep.name} was born!`);
    },
    // Triggers on creation / destruction based on disposed
    structure: function (room, structure, disposed) {
        if (disposed)
            room.log(`structure ${structure.id}:${structure.type} was destroyed!`);
        else {
            room.log(`structure ${structure.id}:${structure.type} was created!`);
        }
    },
    // Triggers on creation / destruction based on disposed
    room: function (name, disposed) {
        if (disposed) {
            global.log(`room ${name} was lost!`);
            RoomController.loss(name);
        } else {
            global.log(`room ${name} was gained!`);
            RoomController.gain(Game.rooms[name]);
        }
    },
    // Triggers on cpu limit being reached, other triggers will be skipped until the next tick to allow time to catch up
    overload: function () {
        global.log("cpu is overloaded waiting until next tick.");
    },
    // Triggers each game ticks for each room if there cpu.
    tick: function (room, disposed) {
        if (!room.controller) {
            return;
        }

        RoomController.tick(room);

        for (var name in room.memory.creeps)
            CreepController.tick(room, room.memory.creeps[name]);

        for (var name in room.memory.structures) {
            var structure = room.memory.structures[name];

            switch (structure.type) {
                case STRUCTURE_TOWER:
                    TowerStructure.tick(room, structure);
                    break;
            }
        }

    }
};