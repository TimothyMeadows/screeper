var TaskIdle;
module.exports = TaskIdle = {
    tick: function (room, pointer) {
        if (pointer.task.next) {
            var creep = Game.getObjectById(pointer.id);
            var next = pointer.task.next;

            pointer.task.next = null;
            creep.change(next, true);
            return;
        }

        pointer.task.idle = true;
    }
};