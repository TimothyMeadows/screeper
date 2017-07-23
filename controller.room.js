var MapInsight = require("insight.map");
var SpawnController = require("controller.spawn");

module.exports = {
    gain: function (room) {
        room.memory.map = new MapInsight(room);

        if (!room.controller) {
            // TODO: Room has no controller build one if we can?
        }
    },
    loss: function(name) {
        // TODO: Lost a room :(
    },
    tick: function(room) {
        switch (room.controller.level) {
            case 0:
            case 1:
                room.memory.map.population = 6;
                room.memory.map.specialized = 1;
            case 2:
            case 3:
                room.memory.map.population = 9;
                room.memory.map.specialized = 1;
                break;
            case 4:
            case 5:
                room.memory.map.population = 12;
                room.memory.map.specialized = 2;
                break;
            default:
                room.memory.map.population = 15;
                room.memory.map.specialized = 2;
                break;
        }
        
        SpawnController.tick(room, _.size(room.memory.creeps), room.memory.map.population);
    }
};