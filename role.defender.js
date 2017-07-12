var RoleDefender = {
    name: "defender",
    /**
     * Tick a creep of defender
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        var attackable = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    }
}

module.exports = RoleDefender;