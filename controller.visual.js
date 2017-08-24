var Icons = require("model.icons");
var VisualController;
module.exports = VisualController = {
    tick: function (room) {
        // display creep moveTo paths.
        for (var creep of _.values(Game.creeps)) {
            VisualController.tock(creep);
        }
    },
    tock: function (creep) {
        var visual = creep.room.visual;
        var pointer = creep.room.memory.creeps[creep.name];

        if (creep.memory._move) {
            var path = Room.deserializePath(creep.memory._move.path);
            visual.drawPath(path, 'grey');
        }

        switch (pointer.caste.name) {
            case "worker":
                visual.drawStatus(path[0], Icons.status_mine);
                break;
        }
    }
};