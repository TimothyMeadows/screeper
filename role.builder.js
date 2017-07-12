var RoleBuilder = {
    name: "builder",
    /**
     * Tick a creep
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function(creep) {
        var target;

        if (creep.memory.work) {
            switch (creep.memory.work.type) {
            case "build":
                target = Game.getObjectById(creep.memory.work.target);
                if (!target) {
                    delete creep.memory.work;
                    creep.changeRole("builder");
                    return;
                }

                switch (creep.build(target)) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(target);
                    break;
                case ERR_INVALID_TARGET:
                case ERR_NOT_ENOUGH_ENERGY:
                case OK:
                    if (creep.carry.energy === 0) {
                        creep.changeRole("idle");
                        delete creep.memory.work;
                    }
                    break;
                default:
                    console.log(creep.build(target));
                    break;
                }
                return;
            }
        }

        target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
            if (creep.hive.workCount(structure.id) > 2)
                return false;
            else 
                return true;
        }
        });

        if (!target) {
            creep.changeRole("idle");
            return;
        }

        if (target.structureType === "rampart")
            creep.memory.nextRole = "reparier";

        creep.memory.work = { type: "build", target: target.id };
        creep.room.log(`${creep.name} has been assgined build., target: ${target.id}`);
        switch (creep.build(target)) {
        case ERR_NOT_IN_RANGE:
            creep.moveTo(target);
            break;
        case ERR_INVALID_TARGET:
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (creep.carry.energy === 0) {
                creep.changeRole("idle");
                delete creep.memory.work;
            }
            break;
        default:
            console.log(creep.build(target));
            break;
        }
    }
}

module.exports = RoleBuilder;