var CreepModel = require("model.creep");
var TaskModel = require("model.task");

Spawn.prototype.spawnCaste = function (model, level) {
    var spawn = this;
    var creep = new CreepModel(-1, `${model.name}-${global.random()}`, model, new TaskModel("idle"), level || 1);
    spawn.room.memory.creeps[creep.name] = creep;

    switch (spawn.createCreep(model.training, creep.name, creep)) {
        case OK:
            spawn.room.log(`spawning ${model.name}`);
            break;
        default:
            spawn.room.log(`error creating ${model.name}, training: ${JSON.stringify(model.training)}, reason: ${spawn.room.errorCodeToString(spawn.canCreateCreep(model.training, creep.name, creep))}`);
            break;
    }    
}