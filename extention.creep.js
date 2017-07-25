Creep.prototype.change = function (name, keepMemory) {
    var creep = this;
    if (!keepMemory) keepMemory = false;

    if (keepMemory === false)
        delete Memory.rooms[creep.room.name].creeps[creep.name].task.memory;

    Memory.rooms[creep.room.name].creeps[creep.name].task.start = Game.time;
    Memory.rooms[creep.room.name].creeps[creep.name].task.idle = false;
    Memory.rooms[creep.room.name].creeps[creep.name].task.name = name;
};

Creep.prototype.next = function (name) {
    var creep = this;
    Memory.rooms[creep.room.name].creeps[creep.name].task.next = name;
};

Creep.prototype.traverse = function (target) {
    var creep = this;
    creep.moveTo(target);
};