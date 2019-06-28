Room.prototype.build = function (type, x, y) {
    var position = new RoomPosition(x, y, this.name);
    var tile = Game.map.getTerrainAt(position);

    switch (tile) {
        case "swamp":
        case "plain":
            position.createConstructionSite(type);
            break;
        default:
            this.log(`Can't create construction site, tile: ${tile}, x: ${x}, y: ${y}`);
            break;
    };
};

Room.prototype.log = function (value) {
    Debug.log(`${value}, room: ${this.name}`);
};