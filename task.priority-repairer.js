var aquire = function (pointer, creep) {
    var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (s) {
            return (s.structureType === "rampart" && s.hits < 6000)
                || (s.structureType === "road" && s.hits < 2000)
                && (creep.network().working(s.id) < 1)
        }
    });

    if (!structure)
        return;

    pointer.task.target = structure.id;
    creep.room.log(`${creep.name} has been assgined priority repair, target: ${pointer.task.target}, type: ${structure.structureType}, workers: ${creep.network().working(pointer.task.target)}/1`);
};

var repair = function (pointer, creep, target) {
    if (target.structureType === "rampart" && target.hits > 14999) {
        creep.change("idle", true);
        return;
    }

    if (target.structureType === "road" && target.hits > 3899) {
        creep.change("idle", true);
        return;
    }

    switch (creep.repair(target)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(target);
            break;
        case ERR_INVALID_TARGET:
            pointer.task.target = null;
            break;
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (creep.carry.energy === 0) {
                creep.change("idle", true);
            }
            break;
    }
};

var TaskPriorityRepairer;
module.exports = TaskPriorityRepairer = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            repair(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null) {
                creep.change("idle", true);
            } else {
                var target = Game.getObjectById(pointer.task.target);
                repair(pointer, creep, target);
            }
        }
    }
};