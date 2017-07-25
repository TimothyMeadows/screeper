var aquire = function (type, pointer, creep) {
    switch (type) {
        case "resource":
            var i, resources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (resources.length && resources.length > 0) {
                for (i in resources) {
                    resource = resources[i];
                    
                    pointer.task.target = resource.id;
                    creep.room.log(`${creep.name} has been assgined collect resource, target: ${pointer.task.target}`);
                    break;
                }
            }
            break;
        case "source":
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (source == null) {
                return;
            }

            pointer.task.target = source.id;
            creep.room.log(`${creep.name} has been assgined mine source, target: ${pointer.task.target}`);
            break;
    }
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

                if (target instanceof Resource) {
                    if (target.amount === 0) {
                        pointer.task.target = null;
                        return;
                    }

                    pickup(pointer, creep, target);
                    return;
                }

                if (target instanceof Source) {
                    if (target.energy === 0) {
                        pointer.task.target = null;
                        return;
                    }

                    harvest(pointer, creep, target);
                    return;
                }
            } else {
                aquire("resource", pointer, creep);
                if (pointer.task.target === null)
                    aquire("source", pointer, creep);

                if (pointer.task.target === null)
                    creep.change("idle", true);
            }
        } else {
            creep.change("idle", true);
        }
    }
};