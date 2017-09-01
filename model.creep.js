var TaskModel = require("model.task");

module.exports = function (id, name, caste, task, level) {
    this.id = id || -1;
    this.name = name || "unknown";
    this.caste = caste || null;
    this.task = task || new TaskModel();
    this.level = level || 0;
};