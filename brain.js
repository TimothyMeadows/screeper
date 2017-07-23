// worker,high = population control, repair, collection, roads, expand, upgrade
// worker,low = population control, repair, collection
// warrior,high = population control, defend, scout, attack, watch
// warrior,low = population control, defend, watch
// religious,high = population control, heal, distribution, pathfinding, capture
// religious,low = population control, distribution, heal

var RoomController = require("controller.room");
var CreepController = require("controller.creep");

module.exports = {
    // Triggers on creation / destruction based on disposed
    creep: function (room, creep, disposed) {
        if (disposed)
            room.log(`creep ${creep.id}:${creep.name} has died!`);
        else
            room.log(`creep ${creep.id}:${creep.type} was born!`);
    },
    // Triggers on creation / destruction based on disposed
    structure: function(room, structure, disposed) {
        if (disposed)
            room.log(`structure ${structure.id}:${structure.type} was destroyed!`);
        else
            room.log(`structure ${structure.id}:${structure.type} was created!`);
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
        CreepController.tick(room);
    }
};