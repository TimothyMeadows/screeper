// worker,high = population control, repair, collection, roads, expand, upgrade
// worker,low = population control, repair, collection
// warrior,high = population control, defend, scout, attack
// warrior,low = population control, defend, scout
// religious,high = population control, heal, distribution, capture
// religious,low = population control, distribution, heal

module.exports = {
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
    },
    tick: function(room, disposed) {
        if (!room.controller) {
            room.log("Room has no controller, nothing to do!");
            return;
        }

        switch(room.controller.level) {
            case 0:
            case 1:
                // level 1 priorities loaded?
                break; // 7+
        }
    }
};