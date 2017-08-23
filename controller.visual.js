var VisualController;
module.exports = VisualController = {
    tick: function (room) {
        // display creep moveTo paths.
        for (var creep of _.values(Game.creeps)) {
            var visual = creep.room.visual;
            if (creep.memory._move) {
                var path = Room.deserializePath(creep.memory._move.path);
                visual.drawPath(path, 'red');
            }
        }
    }
};