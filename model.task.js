module.exports = function (name, memory, start, next, idle, target) {
    this.name = name || "idle";
    this.memory = memory || {};
    this.start = start || Game.time;
    this.idle = idle || false;
    this.target = target || null;
};