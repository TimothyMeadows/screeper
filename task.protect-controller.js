var Status = require("model.status");
var TaskProtectController;

var aquire = function (pointer, creep) {
    pointer.status = Status.aquiring;
    pointer.task.target = creep.room.controller.id;
    creep.room.log(`${creep.name} has been assgined protect controller, target: ${pointer.task.target}`);
};

var protect = function(pointer, creep, target) {
    pointer.status = Status.moving;
    creep.traverse(target);
};

module.exports = TaskProtectController = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            protect(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null)
                creep.change("idle", true);
            else {
                var target = Game.getObjectById(pointer.task.target);
                protect(pointer, creep, target);
            }
        }
    }
};