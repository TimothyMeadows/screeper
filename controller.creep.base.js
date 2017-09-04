var Status = require("model.status");

var CreepControllerBase;
module.exports = CreepControllerBase = {
    tick: function (room, pointer) {
        if (pointer.task.idle === true) {
            var creep = Game.getObjectById(pointer.id);
            if (!creep)
                return;

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
                            if (room.priorityRepairs() === 0) {
                                if (room.prioritySites() === 0) {
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
                                                if (room.repairs() === 0) {
                                                    creep.change("upgrade-controller", true);
                                                } else {
                                                    creep.change("repairer", true);
                                                }
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
                                } else {
                                    if (creep.carry.energy < creep.carryCapacity) {
                                        if (room.population("religious") === 0) {
                                            creep.change("energy-miner", true);
                                        } else {
                                            creep.change("energy-collector", true);
                                        }
                                    } else {
                                        creep.change("priority-builder", true);
                                    }
                                }
                            } else {
                                if (creep.carry.energy === 0) {
                                    if (room.population("religious") === 0) {
                                        creep.change("energy-miner", true);
                                    } else {
                                        creep.change("energy-collector", true);
                                    }
                                } else {
                                    creep.change("priority-repairer", true);
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
                            if (creep.status === Status.moving) {
                                return;
                            }

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
                            if (room.hostiles() === 0) {
                                creep.change("protect-controller", true);
                            } else {
                                creep.change("ranged-kiting", true);
                            }
                            break;
                        case "guardian":
                            break;
                        case "vanguard":
                            break;
                    }
                    break;
            }
        }
    }
};