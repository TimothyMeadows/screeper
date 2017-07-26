Creep.prototype.change = function (name, keepMemory) {
    var creep = this;
    if (!keepMemory) keepMemory = false;

    if (keepMemory === false)
        delete creep.room.memory.creeps[creep.name].task.memory;

    creep.room.memory.creeps[creep.name].task.start = Game.time;
    creep.room.memory.creeps[creep.name].task.target = null;
    creep.room.memory.creeps[creep.name].task.idle = false;
    creep.room.memory.creeps[creep.name].task.name = name;
};

Creep.prototype.next = function (name) {
    var creep = this;
    creep.room.memory.creeps[creep.name].task.next = name;
};

Creep.prototype.traverse = function (target) {
    // TODO: This should be deciding if it should use pathing or moveTo based on distance to move
    var creep = this;
    creep.moveTo(target);
};

Creep.prototype.network = function () {
    var creep = this, networking = {
        working: function (id) {
            var name, count = 0;
            for (name in creep.room.memory.creeps) {
                var pointer = creep.room.memory.creeps[name];
                if (pointer.task.target) {
                    if (pointer.task.target === id) {
                        count++;
                    }
                }
            }

            return count;
        }
    };

    return networking;
};