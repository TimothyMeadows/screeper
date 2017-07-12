// ReSharper disable UseOfImplicitGlobalInFunctionScope
// ReSharper disable VariableCanBeMadeConst
var BrainTemplate = {
    name: "minbari",
    /**
     * 
     * @param {Creep} creep 
     * @returns {} 
     */
    tick: function (creep) {
        switch (creep.memory.caste.name) {
            case "worker":
            if (creep.carry.energy === creep.carryCapacity) {
                if (Memory.controllers && Memory.controllers[creep.room.controller.id]) {
                    var offset = Game.time - Memory.controllers[creep.room.controller.id].lastUpdate;
                    if (offset >= 500) {
                        Memory.controllers[creep.room.controller.id].lastUpdate = Game.time;
                        creep.changeRole("upgrade-controller");
                        return;
                    }
                } else {
                    Memory.controllers = {};
                    Memory.controllers[creep.room.controller.id] = { lastUpdate: Game.time };
                    creep.changeRole("upgrade-controller");
                }

                if (creep.memory.lastRole === "energy-distributer") {
                    creep.changeRole("builder");
                    return;
                }

                if (creep.memory.lastRole === "builder") {
                    creep.changeRole("reparier");
                    delete creep.memory.lastRole;
                    return;
                }

                if (creep.memory.lastRole === "reparier") {
                    creep.changeRole("upgrade-controller");
                    delete creep.memory.lastRole;
                    return;
                }

                creep.changeRole("energy-distributer");
                return;
            } else {
                creep.changeRole("energy-collector");
            }
            break;
        case "religious":
            creep.changeRole("healer");
            break;
        }
    },
    upgrade: function (spawn, caste) {
        var base, focus;
        switch (caste.name) {
            case "warrior":
                base = [ATTACK, TOUGH, TOUGH, CARRY, MOVE, MOVE, MOVE];
                focus = [ATTACK, TOUGH, TOUGH];
                break;
            case "religious":
                base = [HEAL, MOVE];
                focus = [HEAL];
                break;
            default:
            case "worker":
                base = [WORK, CARRY, CARRY, MOVE, MOVE];
                focus = [WORK, CARRY, MOVE];
                break;
        }

        var parts = [];
        var i, cost = 300;

        for (i in base) {
            if (base.hasOwnProperty(i)) {
                parts.push(base[i]);
            }
        }

        var level = 0, upgradeCost = 0;
        while (cost < spawn.room.energyAvailable) {
            if (spawn.room.energyAvailable > 300) {
                for (i in focus) {
                    if (focus.hasOwnProperty(i)) {
                        upgradeCost += BODYPART_COST[focus[i]];
                    }
                }

                if (cost + upgradeCost <= spawn.room.energyAvailable) {
                    cost += upgradeCost;
                    for (i in focus) {
                        if (focus.hasOwnProperty(i)) {
                            parts.push(focus[i]);
                        }
                    }

                    level++;
                } else {
                    break;
                }
            }
        }

        return { parts: parts, cost: cost, level: level }
    },
    /**
     * 
     * @param {Spawn} spawn 
     * @returns {} 
     */
    spawn: function (spawn) {
        if (spawn.room.energyAvailable !== spawn.room.energyCapacityAvailable) {
            if (Game.creeps !== undefined && Object.keys(Game.creeps).length===0) {
                spawn.room.log("Room has no spawns or energy, failing back to basic build!");
                spawn.spawnCaste("worker");
            }

            return;
        }         

        var workerCaste = _.filter(Game.creeps, (creep) => creep.memory.caste.name === "worker");
        if (workerCaste.length < 5) {
            spawn.spawnCaste("worker");
            return;
        }

        var religiousCast = _.filter(Game.creeps, (creep) => creep.memory.caste.name === "religious");
        if (religiousCast.length < 1) {
            spawn.spawnCaste("religious");
            return;
        }
    },
    /**
     * 
     * @param {StructureTower} tower 
     * @returns {} 
     */
    tower: function (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.room.log(`tower is attacking creep owned by ${closestHostile.owner}., target: ${closestHostile.id}, tower: ${tower.id}`);
            tower.attack(closestHostile);
            return;
        }

        var name;
        var repairables = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === "constructedWall" || structure.structureType === "rampart" || structure.structureType === "road" || structure.structureType === "container"
        });

        if (repairables) {
            for (name in repairables) {
                if (repairables.hasOwnProperty(name)) {
                    var repairable = repairables[name];
                    switch (repairable.structureType) {
                        case "constructedWall":
                            if (repairable.hits > 14999)
                                continue;
                            break;
                        case "rampart":
                            if (repairable.hits > 14999)
                                continue;
                            break;
                        case "road":
                            if (repairable.hits > 3999)
                                continue;
                            break;
                        case "container":
                            if (repairable.hits > 239000)
                                continue;
                            break;
                    }

                    tower.room.log(`tower is repairing structure., target: ${repairable.id} Type: ${repairable.structureType}, tower: ${tower.id}`);
                    tower.repair(repairable);
                    break;
                }
            }


            return;
        }

        var creeps = tower.room.find(FIND_MY_CREEPS, {
            filter: (unit) => {
                if (unit.hits < unit.hitsMax) {
                    return true;
                }

                return false;
            }
        });

        if (creeps) {
            for (name in creeps) {
                if (creeps.hasOwnProperty(name)) {
                    var creep = creeps[name];

                    tower.room.log(`tower is healing ${creep.name}., target: ${creep.id}, tower: ${tower.id}`);
                    tower.heal(creep);
                    break;
                }
            }
        }
    }
};
module.exports = BrainTemplate;