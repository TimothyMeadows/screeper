var Brain = require("brain");
var RoleIdle = {
    name: "idle",
    /**
     * Tick a creep in role idle
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        if (creep.memory.stuck && creep.memory.stuck === true) {
            console.log(creep.name + " was stuck, and, had to be freed from it's pathing.");
            delete creep.memory.stuck;
        }

        if (creep.memory.nextRole) {
            creep.memory.role = creep.memory.nextRole;
            delete creep.memory.nextRole;
            return;
        }

        Brain.tick(creep);
    }
}

module.exports = RoleIdle;