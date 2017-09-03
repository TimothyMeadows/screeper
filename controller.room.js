var MapInsight = require("insight.map");
var SpawnController = require("controller.spawn");
var RoomBaseController = require("controller.room.base");
var SquareMap = require("model.map.square");

var RoomController, levels = {};
module.exports = RoomController = {
    gain: function (room) {
        room.memory.map = new MapInsight(room);
        if (room.memory.map.type === "base")
            RoomBaseController.gain(room);
    },
    loss: function (name) {
        var room = Memory.rooms[name];
        if (room.map.type === "base")
            RoomBaseController.loss(room);
    },
    tick: function (room) {
        if (!room.memory.map)
            return;

        if (room.memory.map.type === "base")
            RoomBaseController.tick(room);

        SpawnController.tick(room, _.size(room.memory.creeps), room.memory.map.population);
    }
};