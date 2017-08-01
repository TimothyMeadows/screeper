var CasteModel = require("model.caste");

var calculateTraining = function (name, spec) {
    var base, focus;
    switch (name) {
        case "warrior":
            base = [RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH];
            switch (spec) {
                case "purifier":
                    focus = [RANGED_ATTACK, MOVE];
                    break;
                case "guardian":
                    focus = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE];
                    break;
                case "vanguard":
                    focus = [ATTACK, MOVE];
                    break;
            }
            break;
        case "religious":
            base = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            switch (spec) {
                case "prior":
                    focus = [MOVE, CARRY];
                    break;
                case "healer":
                    focus = [HEAL, MOVE];
                    break;
                case "ranger":
                    focus = [CLAIM, TOUGH];
                    break;
            }
            break;
        default:
        case "worker":
            base = [WORK, CARRY, CARRY, CARRY, MOVE];
            switch (spec) {
                case "miner":
                    focus = [WORK];
                    break;
                case "builder":
                    focus = [MOVE, WORK];
                    break;
                case "contractor":
                    focus = [MOVE, CARRY];
                    break;
            }
            break;
    }

    return { base: base, focus: focus };
};

var calculateExperiance = function (room, name, spec) {
    var training = calculateTraining(name, spec);
    var i, cost = 300, parts = [];

    for (i in training.base)
        parts.push(training.base[i]);

    var level = 0, upgradeCost = 0;
    //while (cost < room.energyAvailable) {
        if (room.energyAvailable > 300) {
            for (i in training.focus)
                upgradeCost += BODYPART_COST[training.focus[i]];

            console.log("left = " + upgradeCost)
            console.log("avail = " + room.energyAvailable)
            if (cost + upgradeCost <= room.energyAvailable) {
                cost += upgradeCost;

                for (i in training.focus)
                    parts.push(training.focus[i]);

                level++;
                //break;
            } else {
                // ???
            }
        //}
    }

    return { parts: parts, level: level }
};

var SpawnController;
module.exports = SpawnController = {
    tick: function (room, count, size) {
        if (count == size || room.energyAvailable < room.energyCapacityAvailable)
            return;

        if (count < size) {
            var creeps = [0, 0, 0], casteName = function (i) {
                switch (i) {
                    default:
                    case 0:
                        return "worker";
                    case 1:
                        return "religious";
                    case 2:
                        return "warrior";
                }
            };

            var specs = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], specName = function (i, s) {
                switch (i) {
                    default:
                    case 0:
                        switch (s) {
                            case 0:
                                return "miner";
                            case 1:
                                return "contractor";
                            case 2:
                                return "builder";
                        }
                    case 1:
                        switch (s) {
                            case 0:
                                return "prior";
                            case 1:
                                return "healer";
                            case 2:
                                return "ranger";
                        }
                    case 2:
                        switch (s) {
                            case 0:
                                return "purifier";
                            case 1:
                                return "guardian";
                            case 2:
                                return "vanguard";
                        }
                }
            };

            for (var name in room.memory.creeps) {
                var creep = room.memory.creeps[name];
                if (!creep.caste)
                    continue;

                switch (creep.caste.name) {
                    case "worker":
                        creeps[0]++;
                        switch (creep.caste.specialization) {
                            case "miner":
                                specs[0][0]++;
                                break;
                            case "contractor":
                                specs[0][1]++;
                                break;
                            case "builder":
                                specs[0][2]++;
                                break;
                        }
                        break;
                    case "religious":
                        creeps[1]++;
                        switch (creep.caste.specialization) {
                            case "prior":
                                specs[1][0]++;
                                break;
                            case "healer":
                                specs[1][1]++;
                                break;
                            case "ranger":
                                specs[1][2]++;
                                break;
                        }
                        break;
                    case "warrior":
                        creeps[2]++;
                        switch (creep.caste.specialization) {
                            case "purifier":
                                specs[2][0]++;
                                break;
                            case "guardian":
                                specs[2][1]++;
                                break;
                            case "vanguard":
                                specs[2][2]++;
                                break;
                        }
                        break;
                }
            }

            var spawns = room.spawns(true), spawn;
            if (spawns.length == 0) {
                return;
            }

            if (spawns.length == 1)
                spawn = spawns[0];
            else
                spawn = spawns[Math.floor((Math.random() * spawns.length) + 1)];

            for (var i = 0; i <= creeps.length - 1; i++) {
                if (creeps[i] < room.memory.map.growth.caste[i]) {
                    var specialization = null;
                    for (var s = 0; s <= specs[i].length - 1; s++) {
                        if (specs[i][s] < room.memory.map.growth.specialization[i][s]) {
                            specialization = specName(i, s);
                            break;
                        }
                    }


                    var experiance = calculateExperiance(room, casteName(i), specialization);
                    spawn.spawnCaste(new CasteModel(casteName(i), experiance.parts, specialization), experiance.level);
                    break;
                }
            }
        }
    }
};