var aquire = function (pointer, creep) {
    var i, resources = creep.room.find(FIND_DROPPED_RESOURCES);
    if (resources.length && resources.length > 0) {
        for (i in resources) {
            var resource = resources[i];

            pointer.task.target = resource.id;
            creep.room.log(`${creep.name} has been assgined collect resource, target: ${pointer.task.target}`);
            break;
        }
    }
};

var pickup = function (pointer, creep, resource) {
    switch (creep.pickup(resource, resource.amount - 1)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(resource);
            break;
        case OK:
            if (creep.carry.energy === creep.carryCapacity) {
                creep.change("idle", true);
                return;
            }

            if (resource.amount === 0) {
                creep.change("idle", true);
                return;
            }
            break;
    }
};

var TaskEnergyCollector;
module.exports = TaskEnergyCollector = {
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

                if (target.amount === 0) {
                    pointer.task.target = null;
                    return;
                }

                pickup(pointer, creep, target);
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