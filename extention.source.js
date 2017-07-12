Source.prototype.getCapacity = function () {
    var source = this;
    var sides = [
        { x: source.pos.x - 1, y: source.pos.y + 1 },
        { x: source.pos.x - 1, y: source.pos.y },
        { x: source.pos.x - 1, y: source.pos.y - 1 },
        { x: source.pos.x, y: source.pos.y + 1 },
        { x: source.pos.x, y: source.pos.y - 1 },
        { x: source.pos.x + 1, y: source.pos.y + 1 },
        { x: source.pos.x + 1, y: source.pos.y },
        { x: source.pos.x + 1, y: source.pos.y - 1 }
    ];

    var count = 0;
    for (var i in sides) {
        if (sides.hasOwnProperty(i)) {
            var side = sides[i];
            if (Game.map.getTerrainAt(side.x, side.y, source.room.name) !== "wall")
                count++;
        }
    }

    return count;
}