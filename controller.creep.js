var CreepController;
module.exports = CreepController = {
    tick: function (room, pointer) {
        if (pointer.task.idle === true) {
            var creep = Game.getObjectById(pointer.id);
            if (!creep)
                return; // not ready

            switch (pointer.caste.name) {
                case "worker":
                    switch (pointer.caste.specialization) {
                        case "miner":
                            if (creep.carry.energy < creep.carryCapacity) {
                                creep.change("energy-miner", true);
                            } else {
                                if (room.population("religious") === 0) {
                                    creep.change("energy-distributor", true);
                                }
                            }
                            break;
                        case "builder":
                            if (room.sites() === 0) {
                                if (creep.carry.energy < creep.carryCapacity) {
                                    if (room.population("religious") === 0) {
                                        creep.change("energy-miner", true);
                                    } else {
                                        creep.change("energy-collector", true);
                                    }
                                } else {
                                    if (room.population("religious") === 0) {
                                        creep.change("energy-distributor", true);
                                    } else {
                                        creep.change("upgrade-controller", true);
                                    }
                                }
                            } else {
                                if (creep.carry.energy < creep.carryCapacity) {
                                    if (room.population("religious") === 0) {
                                        creep.change("energy-miner", true);
                                    } else {
                                        creep.change("energy-collector", true);
                                    }
                                } else {
                                    creep.change("builder", true);
                                }
                            }
                            break;
                        case "contractor":
                            if (creep.carry.energy < creep.carryCapacity) {
                                if (room.population("religious") === 0) {
                                    creep.change("energy-miner", true);
                                } else {
                                    creep.change("energy-collector", true);
                                }
                            } else {
                                if (room.population("religious") === 0) {
                                    creep.change("energy-distributor", true);
                                } else {
                                    creep.change("upgrade-controller", true);
                                }
                            }
                            break;
                    }
                    break;
                case "religious":
                    switch (pointer.caste.specialization) {
                        case "prior":
                            if (creep.carry.energy < creep.carryCapacity) {
                                creep.change("energy-collector", true);
                            } else {
                                creep.change("energy-distributor", true);
                            }
                            break;
                        case "healer":
                            if (creep.carry.energy < creep.carryCapacity) {
                                creep.change("energy-collector", true);
                            } else {
                                creep.change("energy-distributor", true);
                            }
                            break;
                        case "ranger":
                            if (creep.carry.energy < creep.carryCapacity) {
                                creep.change("energy-collector", true);
                            } else {
                                creep.change("energy-distributor", true);
                            }
                            break;
                    }
                    break;
                case "warrior":
                    switch (pointer.caste.specialization) {
                        case "purifier":
                            break;
                        case "guardian":
                            break;
                        case "vanguard":
                            break;
                    }
                    break;
            }
        }

        var task = require(`task.${pointer.task.name}`);
        task.tick(room, pointer);
    }
};