module.exports = {
    tick: function (room, pointer) {
        if (pointer.task.idle === true) {
            switch (pointer.caste.name) {
                case "worker":
                    switch (pointer.caste.specialization) {
                        case "miner":
                            // go mine!!
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