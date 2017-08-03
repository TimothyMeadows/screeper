var RoomController = require("controller.room");
var CreepController = require("controller.creep");
var StructureTower = require("structure.tower");

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
    structure: function(room, structure, disposed) {
        if (disposed)
            room.log(`structure ${structure.id}:${structure.type} was destroyed!`);
        else {
            room.log(`structure ${structure.id}:${structure.type} was created!`);

            switch (structure.type) {
                case STRUCTURE_TOWER:
                    StructureTower.tick(room, structure);
                    break;
            }
        }
    },
    // Triggers on creation / destruction based on disposed
    room: function(name, disposed) 
    {
        if (disposed) {
            global.log(`room ${name} was lost!`);
            RoomController.loss(name);
        } else {
            global.log(`room ${name} was gained!`);
            RoomController.gain(Game.rooms[name]);
        }
    },
    // Triggers on cpu limit being reached, other triggers will be skipped until the next tick to allow time to catch up
    overload: function() {
        global.log("cpu is overloaded waiting until next tick.");
    },
    // Triggers each game ticks for each room if there cpu.
    tick: function(room, disposed) {
        if (!room.controller) {
            return;
        }

        RoomController.tick(room);

        for (var name in room.memory.creeps)
            CreepController.tick(room, room.memory.creeps[name]);
        
    }
};