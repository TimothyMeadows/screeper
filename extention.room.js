Room.prototype.towers = function () {
    var room = this;
    var size = _.size(room.find(FIND_STRUCTURES, {
        filter: function (s) {
            return s.structureType === STRUCTURE_TOWER
        }
    }));

    return size;
};

Room.prototype.hostiles = function () {
    var room = this;
    return _.size(room.find(FIND_HOSTILE_CREEPS));
};

Room.prototype.priorityRepairs = function () {
    var room = this;
    var size = _.size(room.find(FIND_STRUCTURES, {
        filter: function (s) {
            return (s.structureType === "rampart" && s.hits < 6000 )
                || (s.structureType === "road" && s.hits < 2000)
        }
    }));

    return size;
};

Room.prototype.repairs = function () {
    var room = this;
    var size = _.size(room.find(FIND_STRUCTURES, {
        filter: function (s) {
            return ((s.structureType === "constructedWall" || s.structureType === "rampart") && s.hits < 6000 )
                || (s.structureType === "road" && s.hits < 2000)
        }
    }));

    return size;
};

Room.prototype.sources = function () {
    var room = this;
    return _.size(room.find(FIND_SOURCES));
};

Room.prototype.prioritySites = function () {
    var room = this;
    var size = _.size(room.find(FIND_CONSTRUCTION_SITES, {
        filter: function (s) {
            return s.structureType === STRUCTURE_EXTENSION
        }
    }));

    return size;
};

Room.prototype.sites = function () {
    var room = this;
    return _.size(room.find(FIND_CONSTRUCTION_SITES));
};

Room.prototype.population = function (name) {
    var room = this, count = 0, i;

    if (!name)
        return _.size(room.memory.creeps);

    for (i in room.memory.creeps) {
        var creep = room.memory.creeps[i];
        if (creep.caste.name === name)
            count++;
    }

    return count;
};

Room.prototype.spawns = function (activeOnly) {
    var room = this;
    var spawns = [];
    if (!activeOnly) activeOnly = false;

    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (room.name == spawn.room.name && (activeOnly && !spawn.spawning))
            spawns.push(spawn);
    }

    return spawns;
};

Room.prototype.log = function (message) {
    var room = this;
    console.log(`${message}, time: ${Game.time}, room: ${room.name}`);
};

Room.prototype.errorCodeToString = function (code) {
    switch (code) {
        case ERR_NOT_OWNER:
            return "ERR_NOT_OWNER";
        case ERR_NO_PATH:
            return "ERR_NO_PATH";
        case ERR_NAME_EXISTS:
            return "ERR_NAME_EXISTS";
        case ERR_BUSY:
            return "ERR_BUSY";
        case ERR_NOT_FOUND:
            return "ERR_NOT_FOUND";
        case ERR_NOT_ENOUGH_ENERGY:
            return "ERR_NOT_ENOUGH_ENERGY";
        case ERR_NOT_ENOUGH_RESOURCES:
            return "ERR_NOT_ENOUGH_RESOURCES";
        case ERR_NOT_ENOUGH_EXTENSIONS:
            return "ERR_NOT_ENOUGH_EXTENSIONS";
        case ERR_INVALID_TARGET:
            return "ERR_INVALID_TARGET";
        case ERR_FULL:
            return "ERR_FULL";
        case ERR_NOT_IN_RANGE:
            return "ERR_NOT_IN_RANGE";
        case ERR_INVALID_ARGS:
            return "ERR_INVALID_ARGS";
        case ERR_TIRED:
            return "ERR_TIRED";
        case ERR_NO_BODYPART:
            return "ERR_NO_BODYPART";
        case ERR_RCL_NOT_ENOUGH:
            return "ERR_RCL_NOT_ENOUGH";
        case ERR_GCL_NOT_ENOUGH:
            return "ERR_GCL_NOT_ENOUGH";
        default:
            return `UNKNOWN: ${code}`;

    }
};

Room.prototype.build = function (structureType, x, y) {
    var room = this;
    var pos = new RoomPosition(x, y, room.name);
    var tile = Game.map.getTerrainAt(pos);

    switch (tile) {
        case "swamp":
        case "plain":
            pos.createConstructionSite(structureType);
            break;
    };
}

Room.prototype.exits = function(to) {
    var room = this;
    return Game.map.findExit(room.name, to);
}

Room.prototype.exit = function() {
    var room = this;
    return Game.map.describeExits(room.name);
}