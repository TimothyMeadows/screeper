var VisualController = require("controller.visual");

Creep.prototype.change = function (name, keepMemory, keepTarget) {
    var creep = this;
    var pointer = creep.room.memory.creeps[creep.name];
    if (!pointer) 
        return;

    if (!keepMemory)
        keepMemory = false;

    if (!keepTarget)
        keepTarget = false;

    if (keepMemory === false)
        delete creep.room.memory.creeps[creep.name].task.memory;

    pointer.task.start = Game.time;
    if (name !== "idle" && !keepTarget)
        pointer.task.target = null;

    pointer.task.idle = false;
    pointer.task.name = name;
};

Creep.prototype.traverse = function (target) {
    // TODO: This should be deciding if it should use pathing or moveTo based on distance to move
    var creep = this;
    var pointer = creep.room.memory.creeps[creep.name];

    pointer.status = 5; // moving
    creep.moveTo(target);
    VisualController.tock(creep);
};

Creep.prototype.network = function () {
    var creep = this, networking = {
        working: function (id) {
            var name, count = 0;
            for (name in creep.room.memory.creeps) {
                var pointer = creep.room.memory.creeps[name];
                if (pointer.task.target) {
                    if (pointer.task.target === id)
                        count++;
                }
            }

            return count;
        },
        at: function(x, y) {
            var name, count = 0, creeps = [];
            for (name in creep.room.memory.creeps) {
                var pointer = creep.room.memory.creeps[name];
                var target = Game.getObjectById(pointer.id);
                if (target.pos.x === x && target.pos.y === y) {
                    count++;
                    creeps.push(pointer);
                }
            }

            return { count: count, creeps: creeps };
        },
        bump: function(id) {
            var target = Game.getObjectById(id);
            var direction = target.pos.getDirectionTo(creep);
            direction = (direction + 3) % 8 + 1;
    
            var i;
            for (i = 0; i < 8; i++) {
                var dir = (direction + i) % 8 + 1;
                var pos = target.pos.getAdjacentTo(dir);
                var terrain = pos.look();
    
                if ((terrain.type === "terrain" && terrain.terrian !== "wall") && (terrain.type !== "creep")) {
                    direction = direction + i;
                    break;
                }
            }

            target.move(direction);
        }
    };

    return networking;
};