var RoleUpgradeController = {
    name: "upgrade-controller",
    /**
     * Tick a upgrader creep
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {    
        if (creep.carry.energy === 0) {
            creep.changeRole("idle");
            return;
        }

        switch (creep.upgradeController(creep.room.controller)) {
            case ERR_NOT_IN_RANGE:
                creep.traverse(creep.room.controller);
                break;
            case OK:
                if (creep.carry.energy === 0) {
                    creep.changeRole("idle");
                    return;
                }
                break;
        }
    }
}

module.exports = RoleUpgradeController;