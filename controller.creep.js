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
                                creep.change("energy-collector", true);
                            } else {
                                if (room.population("religious") === 0) {
                                    console.log("should be in distributor mode now!");
                                    // change to distributor task
                                }
                            }
                            break;
                        case "builder":
                            break;
                        case "contractor":
                            break;
                    }
                    break;
                case "religious":
                    switch (pointer.caste.specialization) {
                        case "prior":
                            break;
                        case "healer":
                            break;
                        case "ranger":
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