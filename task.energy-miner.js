var aquire = function (pointer, creep) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (source == null) {
        return;
    }

    pointer.task.target = source.id;
    creep.room.log(`${creep.name} has been assgined mine source, target: ${pointer.task.target}`);
};

var harvest = function (pointer, creep, source) {
    switch (creep.harvest(source)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(source);
            break;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.change("idle", true);
            break;
        case OK:
            if (source.energy === 0) {
                creep.change("idle", true);;
            }

            if (creep.carry.energy === creep.carryCapacity) {
                creep.change("idle", true);
            }
            break;
    }
};

var TaskEnergyMiner;
module.exports = TaskEnergyMiner = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        var resource, source;
        if (creep.carry.energy < creep.carryCapacity) {
            if (pointer.task.target) {
                var target = Game.getObjectById(pointer.task.target);
                if (!target) {
                    pointer.task.target = null;
                    return;
                }

                if (target.energy === 0) {
                    pointer.task.target = null;
                    return;
                }

                harvest(pointer, creep, target);
            } else {
                aquire(pointer, creep);
                if (pointer.task.target === null)
                    creep.change("idle", true);
            }
        } else {
            creep.change("idle", true);
        }
    }
};