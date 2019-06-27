var Debug;
module.exports = Debug = {
    log: function(value) {
        // TODO: Log into memory until reaches N number, then send notice through screeps API.
        console.log(`${value}, time: ${Game.time}`);
    }
};