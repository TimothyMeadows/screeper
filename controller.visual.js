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
                var pointer = creep.room.memory.creeps[creep.name];
                var path = Room.deserializePath(creep.memory._move.path);
                var color = "grey";

                switch (pointer.caste.name) {
                    case "worker":
                        color = "orange";
                        break;
                    case "religious":
                        color = "green";
                        break;
                    case "warrior":
                        color = "red";
                        break;
                }

                visual.drawPath(path, color);
            }

            VisualController.tock(creep);
        }
    },
    tock: function (creep) {
        return;
        var pos = creep.pos;
        if (creep.memory._move) {
            var path = Room.deserializePath(creep.memory._move.path);
            pos = path[0];
        }

        var visual = creep.room.visual;
        var pointer = creep.room.memory.creeps[creep.name];
        var statuses = [];

        switch (pointer.caste.name) {
            case "worker":
                statuses.push({ icon: Icons.worker, color: 'orange' });
                break;
            case "religious":
                statuses.push({ icon: Icons.religious, color: 'green' });
                break;
            case "warrior":
                statuses.push({ icon: Icons.warrior, color: 'red' });
                break;
        }

        if (pos)
            visual.drawStatuses(pos, statuses);
    }
};