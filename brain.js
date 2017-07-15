var BrainTemplate = {
    name: "example",
    // Triggers on creation / destruction based on disposed
    spawn: function (spawn, disposed) {
        // ...
    },
    // Triggers on creation / destruction based on disposed
    creep: function (creep, disposed) {
        // ...
    },
    // Triggers on creation / destruction based on disposed
    structure: function(structure, disposed) {
        // ...
    },
    // Triggers on cpu limit being reached, other triggers will be skipped until the next tick to allow time to catch up
    overload: function() {
        // ...
    }
};

module.exports = BrainTemplate;