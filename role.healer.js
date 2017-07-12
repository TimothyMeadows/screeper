var RoleHealer = {
    name: "healer",
    /**
     * Tick a creep of healer
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        var healable = creep.room.find(FIND_MY_CREEPS, {
            filter: (unit) => {
                if (unit.hits < unit.hitsMax) {
                    return true;
                }

                return false;
            }
        });

        // TODO: Tag units being "healed" so that multiple units do not heal the same unit.
        if (healable.length && healable.length > 0) {
            creep.moveTo(healable[0]);
            var range = creep.pos.getRangeTo(healable[0]);
            if (range <= 1) {
                creep.heal(healable[0]);
            } else {
                creep.rangedHeal(healable[0]);
            }
        } else {
            creep.changeRole("idle");
        }
    }
}

module.exports = RoleHealer;