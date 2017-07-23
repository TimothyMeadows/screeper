module.exports = function(name, start, stop) {
    this.name = name || "idle";
    this.start = start || Game.time;
    this.stop = stop || -1;
};