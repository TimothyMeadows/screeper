var RoleEnergyCollector = {
    name: "energy-collector",
    /**
     * Tick a creep of energy collector
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        var resource, source;
        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.memory.work) {
                switch (creep.memory.work.type) {
                case "resource":
                    resource = Game.getObjectById(creep.memory.work.target);
                    if (!resource || !resource.amount) {
                        delete creep.memory.work;
                        creep.changeRole("idle");
                        return;
                    }

                    switch (creep.pickup(resource, resource.amount - 1)) {
                    case ERR_NOT_IN_RANGE:
                        creep.traverse(resource);
                        break;
                    case OK:
                        if (creep.carry.energy === creep.carryCapacity) {
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        }

                        if (resource.amount === 0) {
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        }
                        break;
                    }
                    return;
                case "source":
                    source = Game.getObjectById(creep.memory.work.target);
                    switch (creep.harvest(source)) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(source);
                        break;
                    case ERR_NOT_ENOUGH_RESOURCES:
                        delete creep.memory.work;
                        creep.changeRole("idle");
                        break;
                    case OK:
                        if (source.energy === 0) {
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        }
                        if (creep.carry.energy === creep.carryCapacity) {
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        }
                        break;
                    }
                    break;
                }

                return;
            }

            var i;
            var resources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (resources.length && resources.length > 0) {
                for (i in resources) {
                    if (resources.hasOwnProperty(i)) {
                        resource = resources[i];
                        if (creep.hive.workCount(resource.id) > 0)
                            continue;

                        creep.memory.work = { type: "resource", target: resource.id };
                        creep.room.log(`${creep.name} has been assgined collect ${creep.memory.work.type}., target: ${creep.memory.work.target}`);
                        switch (creep.pickup(resource, resource.amount - 1)) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(resource);
                            break;
                        case OK:
                            if (creep.carry.energy === creep.carryCapacity) {
                                delete creep.memory.work;
                                creep.changeRole("idle");
                            }

                            if (resource.amount === 0) {
                                delete creep.memory.work;
                                creep.changeRole("idle");
                            }
                            break;
                        }

                        break;
                    }
                }

                if (creep.memory.work) {
                    return;
                }
            }

            var closestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (closestSource == null) {
                delete creep.memory.work;
                creep.changeRole("idle");
                return;
            }
            var closestSourceWorkCount = creep.hive.workCount(closestSource.id);
            var closestSourceCapacity = closestSource.getCapacity();

            if (closestSourceWorkCount + 1 < closestSourceCapacity) {
                creep.memory.work = { type: "source", target: closestSource.id };
                creep.room.log(`${creep.name} has been assgined collect ${creep.memory.work.type}., target: ${creep.memory.work.target}, workers: ${closestSourceWorkCount + 1}/${closestSourceCapacity}`);
                switch (creep.harvest(closestSource)) {
                    case ERR_NOT_IN_RANGE:
                        creep.traverse(closestSource);
                        break;
                    case ERR_NOT_ENOUGH_RESOURCES:
                        delete creep.memory.work;
                        creep.changeRole("idle");
                        break;
                    case OK:
                        if (creep.carry.energy === creep.carryCapacity) {
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        }
                        break;
                }

                if (creep.memory.work) {
                    return;
                }
            }

            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (sources.length && sources.length > 0) {
                for (i in sources) {
                    if (sources.hasOwnProperty(i)) {
                        source = sources[i];
                        var sourceWorkCount = creep.hive.workCount(source.id);
                        var sourceCapacity = source.getCapacity();

                        if (creep.memory.work &&
                            creep.memory.work.target !== source.id &&
                            sourceWorkCount + 1 > sourceCapacity) {
                            continue;
                        }

                        if (sourceWorkCount + 1 > sourceCapacity)
                            continue;

                        creep.memory.work = { type: "source", target: source.id };
                        creep.room.log(`${creep.name} has been assgined collect ${creep.memory.work.type}., target: ${creep.memory.work.target}, workers: ${sourceWorkCount + 1}/${sourceCapacity}`);
                        switch (creep.harvest(source)) {
                        case ERR_NOT_IN_RANGE:
                            creep.traverse(source);
                            break;
                        case ERR_NOT_ENOUGH_RESOURCES:
                            delete creep.memory.work;
                            creep.changeRole("idle");
                        case OK:
                            if (creep.carry.energy === creep.carryCapacity) {
                                delete creep.memory.work;
                                creep.changeRole("idle");
                            }
                            break;
                        }

                        break;
                    }
                }

                if (!creep.memory.work) {
                    creep.changeRole("idle");
                }
            } else {
                delete creep.memory.work;
                creep.changeRole("idle");
            }

        } else {
            delete creep.memory.work;
            creep.changeRole("idle");
        }
    }
};
module.exports = RoleEnergyCollector;