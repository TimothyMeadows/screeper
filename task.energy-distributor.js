var aquire = function (pointer, creep) {
    var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
            return (s.energy !== s.energyCapacity) && creep.network().working(s.id) < 2;
        }
    });

    if (!structure) {
        pointer.task.target = null;
        return;
    }

    pointer.task.target = structure.id;
    creep.room.log(`${creep.name} has been assgined distribute energy, target: ${pointer.task.target}, workers: ${creep.network().working(pointer.task.target)}/2`);
};

var transfer = function (pointer, creep, structure) {
    switch (creep.transfer(structure, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE:
            if (structure.energy === structure.energyCapacity) {
                pointer.task.target = null;
                return;
            }

            creep.traverse(structure);
            break;
        case ERR_FULL:
            if (creep.carry.energy === 0) {
                creep.change("idle", true);
            } else {
                pointer.task.target = null;
            }
            break;
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (creep.carry.energy === 0) {
                creep.change("idle", true);
            } else {
                pointer.task.target = null;
            }
            break;
    }
};

var TaskEnergyDistributor;
module.exports = TaskEnergyDistributor = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            transfer(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null)
                creep.change("idle", true);
            else {
                var target = Game.getObjectById(pointer.task.target);
                transfer(pointer, creep, target);
            }
        }
    }
};