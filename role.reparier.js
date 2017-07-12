var RoleReparier = {
    name: "reparier",
    /**
     * Tick a repaier roled creep
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        var target;

        if (creep.memory.work) {
            switch (creep.memory.work.type) {
                case "repair":
                    target = Game.getObjectById(creep.memory.work.target);
                    if (!target || (target.hits > 2999 &&
                            (target.structureType === "constructedWall" || target.structureType === "rampart")) ||
                            (target.hits > 3999 && target.structureType === "road") ||
                            (target.hits > 239000 && target.structureType === "container")
                        )
                    {
                        delete creep.memory.work;
                        return;
                    }

                    switch (creep.repair(target)) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(target);
                            break;
                        case ERR_INVALID_TARGET:
                            delete creep.memory.work;
                            break;
                        case ERR_NOT_ENOUGH_ENERGY:
                        case OK:
                            if (creep.carry.energy === 0) {
                                creep.changeRole("idle");
                                delete creep.memory.work;
                            }
                            break;
                        default:
                            console.log(creep.repair(target));
                            break;
                    }
                    return;
            }
        }

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === "constructedWall" || structure.structureType === "rampart" || structure.structureType === "road" || structure.structureType === "container";
            }
        });

        if (targets.length && targets.length > 0) {
            for (var t in targets) {
                if (targets.hasOwnProperty(t)) {
                    target = targets[t];
                    if (target.hits > 2999 && (target.structureType === "constructedWall" || target.structureType === "rampart"))
                        continue;
                    if (target.hits > 3999 && target.structureType === "road")
                        continue;
                    if (target.hits > 239000 && target.structureType === "container")
                        continue;

                    if (creep.hive.workCount(target.id) > 0)
                        continue;

                    creep.room.log(`${creep.name} has been assgined repair., target: ${target.id}`);
                    creep.memory.work = { type: "repair", target: target.id };
                    switch (creep.repair(target)) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(target);
                            break;
                        case ERR_INVALID_TARGET:
                            delete creep.memory.work;
                            break;
                        case ERR_NOT_ENOUGH_ENERGY:
                        case OK:
                            if (creep.carry.energy === 0) {
                                creep.changeRole("idle");
                                delete creep.memory.work;
                            }
                            break;
                        default:
                            console.log(creep.repair(target));
                            break;
                    }
                }

                if (creep.memory.work)
                    break;
            }

            if (!creep.memory.work)
                creep.changeRole("idle");
        } else {
            creep.changeRole("idle");
        }
    }
}

module.exports = RoleReparier;