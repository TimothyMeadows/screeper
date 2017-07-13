var BrainTemplate = {
    name: "example",
    // Triggers on each game "cycle" defined by speed of server / overload
    tick: function () {
        // ...
    },
    // Triggers on cpu limit being reached, other triggers will be skipped until the next tick to allow time to catch up
    overload: function() {

    },
    // Triggers on creep death, creep will be removed from memory after this method returns
    death: function(creep) {
        // ...
    }
};
module.exports = BrainTemplate;