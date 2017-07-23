// name = worker, religious, warrior
// training = body parts needed to spawn *at this time
// specialization = affects how parts are upgraded beyond the base

// *** WORKER ***
// base = [WORK, CARRY, CARRY, CARRY, MOVE]
// miner = focus on WORK
// builder = focus on MOVE, WORK
// contractor = focus on TOUGH, WORK

// *** RELIGIOUS ***
// base = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
// prior = focus on MOVE, CARRY
// healer = focus on HEAL, MOVE
// ranger = focus on CAPTURE, TOUGH

// *** WARRIOR ***
// base = [ATTACK, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]
// purifier = focus on RANGED_ATTACK, MOVE
// guardian = focus on TOUGH, MOVE
// vanguard = focus on ATTACK, MOVE

module.exports = function(name, training, specialization) {
    this.name = name || "worker";
    this.training = training || [WORK, WORK, MOVE, MOVE];
    this.specialization = specialization || null;
};