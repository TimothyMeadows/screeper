var RoleEnergyDistributer = {
    name: "energy-distributer",
    /**
     * Tick a creep of energy-distrib
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        var target;

        if (creep.memory.work) {
            switch (creep.memory.work.type) {
                case "distribute":
                    target = Game.getObjectById(creep.memory.work.target);
                    if (!target) {
                        delete creep.memory.work;
                        creep.changeRole("idle");
                        return;
                    }

                    switch (creep.transfer(target, RESOURCE_ENERGY)) {
                        case ERR_NOT_IN_RANGE:
                            creep.traverse(target);
                            break;
                        case ERR_FULL:
                            delete creep.memory.work;
                            creep.changeRole("idle");
                            break;
                        case ERR_NOT_ENOUGH_ENERGY:
                        case OK:
                            if (creep.carry.energy === 0) {
                                delete creep.memory.work;
                                creep.changeRole("idle");
                            }
                            break;
                        default:
                            creep.room.log(creep.transfer(target, RESOURCE_ENERGY));
                            break;
                    }
                    break;
            }
            return;
        }

        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.energy !== structure.energyCapacity && creep.hive.workCount(structure.id) < 2;
            }
        });

        if (!target) {
            creep.changeRole("idle");
            return;
        }

        creep.memory.work = { type: "distribute", target: target.id };
        creep.room.log(`${creep.name} has been assgined distribute., target: ${target.id}`);
        switch (creep.transfer(target, RESOURCE_ENERGY)) {
            case ERR_NOT_IN_RANGE:
                creep.traverse(target);
                break;
            case ERR_FULL:
                delete creep.memory.work;
                break;
            case ERR_NOT_ENOUGH_ENERGY:
            case OK:
                if (creep.carry.energy === 0) 
                    creep.changeRole("idle");
                break;
            default:
                console.log(creep.transfer(target, RESOURCE_ENERGY));
                break;
        }
    }
}

module.exports = RoleEnergyDistributer;