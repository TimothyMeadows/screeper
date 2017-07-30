var MapInsight = require("insight.map");
var SpawnController = require("controller.spawn");
var SquareMap = require("model.map.square");

var wall = function (room, top, left, bottom, right, gate) {
    var tiles = room.lookAtArea(top, left, bottom, right, true);

    var i, n, door = false;
    for (i = 0; i <= tiles.length - 1; i++) {
        var tile = tiles[i];
        if (tile.type === "terrain") {
            door = false;
            if (gate) {
                for (n in gate) {
                    if (tile.x === gate[n][0] && tile.y === gate[n][1])
                        door = true;
                }
            }

            if (door === false)
                room.build(STRUCTURE_WALL, tile.x, tile.y);
            else
                room.build(STRUCTURE_RAMPART, tile.x, tile.y);
        }
    }
};

var road = function (room, top, left, bottom, right) {
    var tiles = room.lookAtArea(top, left, bottom, right, true);

    var i;
    for (i = 0; i <= tiles.length - 1; i++) {
        var tile = tiles[i];
        if (tile.type === "terrain") {
            room.build(STRUCTURE_ROAD, tile.x, tile.y);
        }
    }
};

var crossRoad = function (room) {
    var map = new SquareMap();

    road(room, map.zone1.bottom, map.zone1.left - 1, map.zone2.bottom, map.zone2.right - 1);
    road(room, map.zone1.top - 1, map.zone1.right, map.zone3.bottom - 1, map.zone3.right);
};

var wallOffZones = function (room) {
    var map = new SquareMap();

    wall(room, map.zone1.top, map.zone1.left, map.zone2.top, map.zone2.right, [[23, 12], [24, 12], [25, 12]]);
    wall(room, map.zone1.top, map.zone1.left, map.zone3.bottom, map.zone3.left, [[12, 23], [12, 24], [12, 25]]);
    wall(room, map.zone3.bottom, map.zone3.left, map.zone4.bottom, map.zone4.right, [[23, 36], [24, 36], [25, 36]]);
    wall(room, map.zone2.top, map.zone2.right, map.zone4.bottom, map.zone4.right, [[36, 23], [36, 24], [36, 25]]);
};


var RoomController, levels = {};
module.exports = RoomController = {
    gain: function (room) {
        room.memory.map = new MapInsight(room);
    },
    loss: function (name) {
        // :(
    },
    tick: function (room) {
        if (!room.memory.map)
            return;

        if (room.memory.map.level !== room.controller.level) {
            room.log(`room level changed, level: ${room.controller.level}`);
            room.memory.map.level = room.controller.level;

            var miners = room.memory.map.work[0], builders;
            switch (room.memory.map.level) {
                case 0:
                case 1:
                    if (miners > 3) {
                        miners = 3;
                    }

                    room.memory.map.population = 6;
                    builders = (room.memory.map.population - 1) - miners;
                    room.memory.map.growth = { caste: [5, 1, 0], specialization: [[miners, 1, builders], [1, 0, 0], [0, 0, 0]] };

                    global.setTickout(function () {
                        crossRoad(room);
                    }, 1);
                    break;
                case 2:
                case 3:
                    if (miners > 4) {
                        miners = 4;
                    }

                    room.memory.map.population = 9;
                    builders = (room.memory.map.population - 3) - miners;
                    room.memory.map.growth = { caste: [7, 2, 0], specialization: [[miners, 1, builders], [2, 0, 0], [0, 0, 0]] };

                    // update roads
                    wallOffZones(room);
                    break;
                case 4:
                case 5:
                    if (miners > 5) {
                        miners = 5;
                    }

                    room.memory.map.population = 12;
                    builders = (room.memory.map.population - 5) - miners;
                    room.memory.map.growth = { caste: [9, 3, 0], specialization: [[miners, 2, builders], [3, 0, 0], [0, 0, 0]] };
                    break;
                default:
                    room.memory.map.population = 15;
                    builders = (room.memory.map.population - 5) - miners;
                    room.memory.map.growth = { caste: [9, 3, 3], specialization: [[miners, 2, builders], [3, 0, 0], [1, 1, 1]] };
                    break;
            }
        }

        SpawnController.tick(room, _.size(room.memory.creeps), room.memory.map.population);
    }
};