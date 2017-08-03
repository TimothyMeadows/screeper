var TowerStructure;
module.exports = TowerStructure = {
    tick: function (room, pointer) {
        if (room.hostiles() === 0) {
            return;
        }

        var tower = Game.getObjectById(pointer.id);
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile) {
            if (pointer.memory.target && pointer.memory.target === hostile.id) {
                tower.attack(hostile);
                return;
            }

            pointer.memory.target = hostile.id;
            tower.room.log(`tower is attacking, owner: ${hostile.owner.username}, target: ${hostile.id}, tower: ${tower.id}`);
            tower.attack(hostile);
            return;
        }

        var name;
        var repairables = tower.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === "constructedWall"
                || s.structureType === "rampart"
                || s.structureType === "road"
        });

        if (repairables) {
            for (name in repairables) {
                var repairable = repairables[name];
                switch (repairable.structureType) {
                    case "constructedWall":
                        if (repairable.hits > 5000)
                            continue;
                        break;
                    case "rampart":
                        if (repairable.hits > 1000)
                            continue;
                        break;
                    case "road":
                        if (repairable.hits > 1000)
                            continue;
                        break;
                }

                tower.room.log(`tower is repairing structure, target: ${repairable.id} Type: ${repairable.structureType}, tower: ${tower.id}`);
                tower.repair(repairable);
                break;
            }

            return;
        }

        var creeps = tower.room.find(FIND_MY_CREEPS, {
            filter: (u) => u.hits < u.hitsMax
        });

        if (creeps) {
            for (name in creeps) {
                var creep = creeps[name];

                tower.room.log(`tower is healing ${creep.name}, target: ${creep.id}, tower: ${tower.id}`);
                tower.heal(creep);
                break;
            }
        }
    }
};