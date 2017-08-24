var Icons = require("model.icons");
var VisualController;
module.exports = VisualController = {
    tick: function (room) {
        // display creep moveTo paths.
        for (var creep of _.values(Game.creeps)) {
            if (creep.spawning)
                continue;

            var visual = creep.room.visual;
            if (creep.memory._move) {
                var path = Room.deserializePath(creep.memory._move.path);
                visual.drawPath(path, 'grey');
            }

            VisualController.tock(creep);
        }
    },
    tock: function (creep) {
        if (!creep.memory._move) {
            return;
        }
        
        var visual = creep.room.visual;
        var pointer = creep.room.memory.creeps[creep.name];
        var path = Room.deserializePath(creep.memory._move.path);

        switch (pointer.caste.name) {
            case "worker":
                if (path[0])
                    visual.drawStatuses(path[0], [Icons.status_mine, Icons.status_build], 'orange');
                break;
        }
    }
};