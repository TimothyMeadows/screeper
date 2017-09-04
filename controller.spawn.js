var SpawnControllerBase = require("controller.spawn.base");

var SpawnController;
module.exports = SpawnController = {
    tick: function (room, count, size) {
        if (room.memory.map.type === "base")
            SpawnControllerBase.tick(room, count, size);
    }
};