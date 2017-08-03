module.exports = function(id, type, pos, memory) {
    this.id = id || "";
    this.type = type || "";
    this.pos = pos || null;
    this.memory = memory || {};
};