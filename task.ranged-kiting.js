var aquire = function (pointer, creep) {
    var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (!hostile)
        return;

    pointer.task.target = hostile.id;
    creep.room.log(`${creep.name} has been assgined ranged kiting, target: ${pointer.task.target}, owner: ${hostile.owner}`);
};

var TaskRangedKiting;
module.exports = TaskRangedKiting = {
    tick: function (room, pointer) {
        // ...
    }
};