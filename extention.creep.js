Creep.prototype.changeRole = function(role) {
    this.memory.lastRole = this.memory.role;
    this.memory.role = role;
}

Creep.prototype.hive = {
    workCount: function(id) {
        var name, count = 0;
        for (name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                var creep = Game.creeps[name];
                if (creep.memory.work) {
                    if (creep.memory.work.target === id) {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}

Creep.prototype.traverse = function(destintation, origin) {
    var creep = this, i;

    if (!creep.memory.lastMove)
        creep.memory.lastMove = creep.pos;
    else if (creep.memory.lastMove.x === creep.pos.x && creep.memory.lastMove.y === creep.pos.y && creep.fatigue === 0) {
        if (typeof creep.memory.lastMoveCount === "undefined")
            creep.memory.lastMoveCount = 0;
        else
            creep.memory.lastMoveCount++;

        if (creep.memory.lastMoveCount > 1) {
            creep.memory.stuck = true;
            delete creep.memory._move;
            delete creep.memory.lastMove;
            delete creep.memory.lastMoveCount;
        }
    } else {
        if (creep.fatigue > 0)
            if (creep.memory.lastMoveCount)
                creep.memory.lastMoveCount = 0;

        creep.memory.lastMove = creep.pos;
    }

    if (creep.memory.stuck && creep.memory.stuck === true) {
        creep.moveTo(destintation);
        return;
    }

    if (!origin) {
        var closestStructure = creep.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_CONTROLLER ||
                    structure.structureType === STRUCTURE_TOWER && structure.id !== destintation.id;
            }
        });

        if (closestStructure) {
            origin = closestStructure[0];
        } else {
            var closestSource = creep.pos.findInRange(FIND_SOURCES, 3,
            {
                filter: (structure) => {
                    return structure.id !== destintation.id;
                }
            });

            if (closestSource)
                origin = closestSource[0];
        }
    }

    if (!origin) {
        creep.moveTo(destintation);
        //creep.room.log(`${creep.name} no origin found, no path used.`);
        return;
    }

    var pathable = false;
    if (destintation.structureType && destintation.structureType === STRUCTURE_SPAWN ||
        destintation.structureType === STRUCTURE_CONTROLLER ||
        destintation.structureType === STRUCTURE_TOWER)
        pathable = true;
    else if (destintation.ticksToRegeneration) {
        pathable = true;
    }

    if (!pathable) {
        creep.moveTo(destintation);
        //creep.room.log(`${creep.name} no destination path able, no path used.`);
        return;
    }


    if (!Memory.paths)
        Memory.paths = {};

    if (!Memory.paths[creep.room.name])
        Memory.paths[creep.room.name] = {};

    if (!Memory.paths[creep.room.name][origin.id])
        Memory.paths[creep.room.name][origin.id] = {};

    if (!Memory.paths[creep.room.name][origin.id][destintation.id]) {
        Memory.paths[creep.room.name][origin.id][destintation.id] = creep.room.findPath(origin.pos, destintation.pos, { maxRooms: 1 });
        for (i = 0; i <= Memory.paths[creep.room.name][origin.id][destintation.id].length - 1; i++) {
            var path = Memory.paths[creep.room.name][origin.id][destintation.id][i];
            var tile = Game.map.getTerrainAt(path.x, path.y, creep.room.name);
            if (tile === "plain" || tile === "swamp") {
                new RoomPosition(path.x, path.y, creep.room.name).createConstructionSite(STRUCTURE_ROAD);
            }
        }

        //creep.room.log(`${creep.name} creating new path with road.`);
        creep.moveByPath(Memory.paths[creep.room.name][origin.id][destintation.id]);
    } else {
        //creep.room.log(`${creep.name} using existing path with road.`);
        creep.moveByPath(Memory.paths[creep.room.name][origin.id][destintation.id]);
    }
}