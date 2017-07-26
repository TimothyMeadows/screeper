var aquire = function (pointer, creep) {
    var i, creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: function (c) {
            return c.carry.energy > 0 && (c.room.memory.creeps[c.name].caste.specialization === "miner"
                || (c.room.memory.creeps[c.name].caste.name === "religious"
                    && pointer.caste.name !== "religious"
                    && c.room.memory.creeps[c.name].id !== creep.id
                ));
        }
    });

    if (creeps.length === 0)
        return;

    creeps = _.sortBy(creeps, function (c) {
        return c.carry.energy;
    }).reverse();

    for (i in creeps) {
        var current = creeps[i];

        pointer.task.target = current.id;
        creep.room.log(`${creep.name} has been assgined collect resource, target: ${pointer.task.target}`);
        break;
    }
};

var transfer = function (pointer, creep, target) {
    switch (target.transfer(creep, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE:
            creep.traverse(target);
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

var TaskEnergyCollector;
module.exports = TaskEnergyCollector = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);
        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            if (target.carry.energy === 0) {
                pointer.task.target = null;
                return;
            }

            transfer(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null) {
                if (pointer.caste.name === "worker")
                    creep.change("energy-miner", true);
                else
                    creep.change("resource-collector", true);
            }
        }
    }
};