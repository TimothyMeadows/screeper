var Status = require("model.status");
var Icons = require("model.icons");
var TaskIdle;

module.exports = TaskIdle = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        pointer.status = Status.idle;
        pointer.task.idle = true;
        if (creep && creep.room && creep.room.visual)
            creep.room.visual.drawStatus(creep.pos, Icons.idle, "white");
    }
};