var screeper;
module.exports = screeper = {
    busy: function() {
        Debug.log("CPU is still busy... Waiting until next tick.")
    },
    tick: function() {
        Debug.log("Tick!");
    }
};