var aquire = function (pointer, creep) {
    var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: function (c) {
            return c.owner.username !== "Source Keeper";
        }
    });

    if (!hostile)
        return;

    pointer.task.target = hostile.id;
    creep.room.log(`${creep.name} has been assgined ranged kiting, target: ${pointer.task.target}, owner: ${c.owner.username}`);
};

var rangedAttack = function (pointer, creep, target) {
    if (creep.pos.inRangeTo(target, 3)) {
        var direction = creep.pos.getDirectionTo(target);
        direction = (direction + 3) % 8 + 1;

        var i;
        for (i = 0; i < 8; i++) {
            var dir = (direction + i) % 8 + 1;
            var pos = creep.pos.getAdjacentTo(dir);
            var terrain = pos.look();

            if ((terrain.type === "terrain" && terrain.terrian !== "wall") && (terrain.type !== "creep")) {
                direction = direction + i;
                break;
            }
        }

        creep.rangedAttack(target);
        creep.move(direction);
    } else {
        creep.traverse(target);
    }

};

var TaskRangedKiting;
module.exports = TaskRangedKiting = {
    tick: function (room, pointer) {
        var creep = Game.getObjectById(pointer.id);

        if (pointer.task.target) {
            var target = Game.getObjectById(pointer.task.target);
            if (!target) {
                pointer.task.target = null;
                return;
            }

            rangedAttack(pointer, creep, target);
        } else {
            aquire(pointer, creep);
            if (pointer.task.target === null)
                creep.change("idle", true);
            else
                rangedAttack(pointer, creep, target);
        }
    }
};