var aquire = function (pointer, creep) {
    if (creep.room.priorityRepairs() !== 0) {
        creep.change("idle", true);
        return;
    }

    var structure = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
        filter: function (s) {
            return s.structureType === STRUCTURE_EXTENSION
                && creep.network().working(s.id) < 1
        }
    });

    if (!structure)
        return;

    pointer.task.target = structure.id;
    creep.room.log(`${creep.name} has been assgined priority build, target: ${pointer.task.target}, workers: ${creep.network().working(pointer.task.target)}/1`);
};

var build = function (pointer, creep, structure) {
    switch (creep.build(structure)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(structure);
            break;
        case ERR_INVALID_TARGET:
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (creep.carry.energy === 0)
                creep.change("idle", true);
            if (structure.progress === structure.progressTotal)
                creep.change("idle", true);
            break;
    }
};

var TaskPriorityBuilder;
module.exports = TaskPriorityBuilder = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            build(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null)
                creep.change("idle", true);
        }
    }
};