var RoomController = require("controller.room");
var CreepController = require("controller.creep");
var VisualController = require("controller.visual");
var TowerStructure = require("structure.tower");

var Screeper;
module.exports = Screeper = {
    // Triggers on creation / destruction based on disposed
    creep: function (room, creep, disposed) {
        if (disposed) {
            room.log(`creep ${creep.id}:${creep.name} has died!`);
            if (room.controller.safeModeAvailable > 0 && creep.caste.name === "warrior" && room.hostiles() > 0)
                room.controller.activateSafeMode();
        }
        else
            room.log(`creep ${creep.id}:${creep.name} was born!`);
    },
    // Triggers on creation / destruction based on disposed
    structure: function (room, structure, disposed) {
        if (disposed) {
            room.log(`structure ${structure.id}:${structure.type} was destroyed!`);
            if (room.controller.safeModeAvailable > 0 && room.hostiles() > 0)
                room.controller.activateSafeMode();
        }
        else {
            room.log(`structure ${structure.id}:${structure.type} was created!`);
        }
    },
    // Triggers on creation / destruction based on disposed
    room: function (name, disposed) {
        if (disposed) {
            RoomController.loss(name);
            global.log(`room ${name} was lost!`);
        } else {
            var pointer = Memory.rooms[name];
            RoomController.gain(Game.rooms[name]);
            global.log(`room ${name} was gained!, type: ${pointer.map.type}`);
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

        VisualController.tick(room);
    }
};