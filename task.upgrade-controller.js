var aquire = function (pointer, creep) {
    pointer.task.target = creep.room.controller.id;
    creep.room.log(`${creep.name} has been assgined upgrade controller, target: ${pointer.task.target}`);
};

var upgrade = function (pointer, creep, target) {
    switch (creep.upgradeController(target)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(target);
            break;
        case OK:
            if (creep.carry.energy === 0) {
                creep.change("idle", true);
                return;
            }
            break;
    }
};

var TaskUpgradeController;
module.exports = TaskUpgradeController = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);
        if (creep.carry.energy === 0) {
            creep.change("idle", true);
            return;
        }

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            upgrade(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null)
                creep.change("idle", true);
            else {
                var target = Game.getObjectById(pointer.task.target);
                upgrade(pointer, creep, target);
            }
        }
    }
};