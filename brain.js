var BrainTemplate = {
    name: "example",
    spawn: function (spawn, disposed) {
        // ...
    },
    // Triggers on each game "cycle" defined by speed of server / overload for each creep
    creep: function (creep, disposed) {
        // ...
    },
    // Triggers on each game "cycle" defined by speed of server / overload for each tower structure
    tower: function(tower, disposed) {
        // ...
    },
    // Triggers on cpu limit being reached, other triggers will be skipped until the next tick to allow time to catch up
    overload: function() {

    }
};

module.exports = BrainTemplate;