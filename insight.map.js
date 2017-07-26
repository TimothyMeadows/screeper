var SquareMap = require("model.map.square");
var map = new SquareMap();

var MapInsights;
module.exports = MapInsights = function (room) {
    var population = this.population = 0;
    var growth = this.growth = null;
    var region1 = this.region1 = { score: 0 };
    var region2 = this.region2 = { score: 0 };
    var center = this.center = { score: 0 };
    var quarter1 = this.quarter1 = { score: 0 };
    var quarter2 = this.quarter2 = { score: 0 };
    var quarter3 = this.quarter3 = { score: 0 };
    var quarter4 = this.quarter4 = { score: 0 };
    var zone1 = this.zone1 = { score: 0 };
    var zone2 = this.zone2 = { score: 0 };
    var zone3 = this.zone3 = { score: 0 };
    var zone4 = this.zone4 = { score: 0 };

    // 1250
    const SOURCES_SCORE = 590;
    const MINERALS_SCORE = 440;
    const STRUCTURES_SCORE = 0;
    const TERRAIN_WALL_SCORE = 0;
    const TERRAIN_SWAMP_SCORE = 1;
    const TERRAIN_PLAIN_SCORE = 10;

    var score = function (room, area, insight) {
        var things = room.lookAtArea(area.top, area.left, area.bottom, area.right, true);

        insight.score = 0;
        for (var i in things) {
            var thing = things[i];

            switch (thing.type) {
                case LOOK_SOURCES:
                    insight.score += SOURCES_SCORE;
                    break;
                case LOOK_MINERALS:
                    insight.score += MINERALS_SCORE;
                    break;
                case LOOK_STRUCTURES:
                    insight.score += STRUCTURES_SCORE;
                    break;
                case LOOK_TERRAIN:
                    switch (thing.terrain) {
                        case "wall":
                            insight.score += TERRAIN_WALL_SCORE;
                            break;
                        case "swamp":
                            insight.score += TERRAIN_SWAMP_SCORE;
                            break;
                        case "plain":
                            insight.score += TERRAIN_PLAIN_SCORE;
                            break;
                    }
                    break;
            }
        }
    };

    score(room, map.region1, region1);
    score(room, map.region2, region2);
    score(room, map.center, center);
    score(room, map.quarter1, quarter1);
    score(room, map.quarter2, quarter2);
    score(room, map.quarter3, quarter3);
    score(room, map.quarter4, quarter4);
    score(room, map.zone1, zone1);
    score(room, map.zone2, zone2);
    score(room, map.zone3, zone3);
    score(room, map.zone4, zone4);
};