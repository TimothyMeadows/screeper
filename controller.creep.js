var CreepControllerBase = require("controller.creep.base");

var CreepController;
module.exports = CreepController = {
    tick: function (room, pointer) {
        if (room.memory.map.type === "base")
            CreepControllerBase.tick(room, pointer);

        if (pointer.task) {
            var task = require(`task.${pointer.task.name}`);
            task.tick(room, pointer);
        }
    }
};