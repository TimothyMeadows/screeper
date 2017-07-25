var aquire = function (pointer, creep) {
    var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
            return s.energy !== s.energyCapacity;
        }
    });

    if (!structure)
        return;

    pointer.task.target = structure.id;
    creep.room.log(`${creep.name} has been assgined distribute energy, target: ${pointer.task.target}`);
};

var transfer = function (pointer, creep, structure) {
    switch (creep.transfer(structure, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(structure);
            break;
        case ERR_FULL:
            creep.change("idle", true);
            break;
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (creep.carry.energy === 0) {
                creep.change("idle", true);
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
        }
    }
};