Creep.prototype.change = function (name, keepMemory) {
    var creep = this;
    if (!keepMemory) keepMemory = false;

    if (keepMemory === false)
        delete Memory.room[creep.room.name].creeps[creep.name].task.memory;

    Memory.room[creep.room.name].creeps[creep.name].task.start = Game.time;
    Memory.room[creep.room.name].creeps[creep.name].task.idle = false;
    Memory.room[creep.room.name].creeps[creep.name].task.name = name;
};