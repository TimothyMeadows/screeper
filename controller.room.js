var MapInsight = require("insight.map");
var SpawnController = require("controller.spawn");

var RoomController, levels = {};
module.exports = RoomController = {
    gain: function (room) {
        room.memory.map = new MapInsight(room);
        levels[room.name] = 1;
    },
    loss: function (name) {
        if (levels[name]) delete levels[name];
    },
    tick: function (room) {
        var change = levels[room.name] !== room.controller.level;
        if (change) room.log(`room level changed, level: ${room.controller.level}`);
        levels[room.name] = room.controller.level;

        switch (room.controller.level) {
            case 0:
            case 1:
                room.memory.map.population = 6;
                room.memory.map.growth = { caste: [5, 1, 0], specialization: [[3, 1, 1], [1, 0, 0], [0, 0, 0]] };
                break;
            case 2:
            case 3:
                room.memory.map.population = 12;
                room.memory.map.growth = { caste: [8, 4, 0], specialization: [[4, 2, 2], [3, 1, 0], [0, 0, 0]] };
                break;
            case 4:
            case 5:
                room.memory.map.population = 15;
                room.memory.map.growth = { caste: [9, 6, 0], specialization: [[4, 2, 3], [3, 3, 0], [0, 0, 0]] };
                break;
            default:
                room.memory.map.population = 27;
                room.memory.map.growth = { caste: [9, 9, 9], specialization: [[4, 2, 3], [3, 3, 3], [3, 3, 3]] };
                break;
        }

        SpawnController.tick(room, _.size(room.memory.creeps), room.memory.map.population);
    }
};