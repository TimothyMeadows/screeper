// ReSharper disable UseOfImplicitGlobalInFunctionScope
// ReSharper disable PossiblyUnassignedProperty
require("extention.room");
require("extention.spawn");
require("extention.source");
require("extention.creep");

var brain = require("brain");
var roles = [
    require("role.idle"),
    require("role.energy-collector"),
    require("role.energy-distributer"),
    require("role.upgrade-controller"),
    require("role.builder"),
    require("role.reparier"),
    require("role.healer")
];

module.exports.loop = function () {
    var name, creep;
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log(`${name} recycling due to death.`);
            delete Memory.creeps[name];
        }
    }

    if (Game.cpu.bucket < Game.cpu.tickLimit * 2) {
        console.log("skipping tick due to cpu flooding.");
        return; // skip tick because cpu is already flooded.
    }

    var r, role;
    for (name in Game.creeps) {
        if (Game.creeps.hasOwnProperty(name)) {
            creep = Game.creeps[name];
            if (creep.memory.dead === true) {
                return; // await death
            }

            if (creep.ticksToLive <= 8 && creep.memory.dead !== true) {
                if (creep.carry.energy !== 0) {
                    creep.room.log(`${name} about to die. dropping ${creep.carry.energy} energy.`);
                    creep.drop(RESOURCE_ENERGY);
                }

                creep.memory.dead = true;
                return;
            }

            for (r in roles) {
                if (roles.hasOwnProperty(r)) {
                    var c = roles[r];
                    if (c.name === creep.memory.role)
                        role = c;
                }
            }

            if (role) {
                role.tick(creep);
            }
        }
    }

    for (name in Game.spawns) {
        if (Game.spawns.hasOwnProperty(name))
            brain.spawn(Game.spawns[name]);
    }

    for (name in Game.structures) {
        if (Game.structures.hasOwnProperty(name)) {
            if (Game.structures[name].structureType === "tower")
                brain.tower(Game.structures[name]);
        }
    }
}