var Status = require("model.status");

var aquire = function (pointer, creep) {
    pointer.status = Status.aquiring;
    var i, creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: function (c) {
            return c.carry.energy > 0
                && creep.network().working(c.id) < 1
                && (c.room.memory.creeps[c.name].caste.specialization === "miner"
                    || (c.room.memory.creeps[c.name].caste.name === "religious"
                        && (c.room.memory.creeps[c.name].status !== Status.moving
                            || c.room.memory.creeps[c.name].status !== Status.aquiring
                        )
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
        var currentPointer = current.room.memory.creeps[current.name];

        if ((currentPointer.status === Status.moving
            || currentPointer.status === Status.aquiring
        ))
            continue;

        pointer.task.target = current.id;
        currentPointer.status = Status.moving;
        creep.room.log(`${creep.name} has been assgined collect resource, target: ${pointer.task.target}, workers: ${creep.network().working(pointer.task.target)}/1`);
        break;
    }
};

var transfer = function (pointer, creep, target) {
    var targetPointer = creep.room.memory.creeps[target.name];
    
    switch (target.transfer(creep, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE:
            if (target instanceof Creep) {
                if (targetPointer.caste.specialization === "miner") {
                    creep.traverse(target);
                } else {
                    targetPointer.task.target = creep.id;
                    target.traverse(creep);
                }

            } else {
                creep.traverse(target);
            }
            break;
        case ERR_FULL:
            creep.change("idle", true);
            target.change("idle", true);
            break;
        case ERR_NOT_ENOUGH_ENERGY:
        case OK:
            if (target.carry.energy === 0) {
                creep.change("idle", true);
                target.change("idle", true);
            }

            pointer.status = Status.working;
            targetPointer.status = Status.working;
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

                return;
            } else {
                var target = Game.getObjectById(pointer.task.target);
                transfer(pointer, creep, target);
            }
        }
    }
};