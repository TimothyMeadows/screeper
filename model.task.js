module.exports = function (name, memory, start, next, idle) {
    this.name = name || "idle";
    this.memory = memory || {};
    this.start = start || Game.time;
    this.next = next || null;
    this.idle = idle || false;
};