var TaskIdle;
module.exports = TaskIdle = {
    tick: function (room, pointer) {
        pointer.task.idle = true;
    }
};