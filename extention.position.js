RoomPosition.prototype.getAdjacentTo = function (direction) {
    const adjacent = [
        [0, 0],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1]
    ];
    if (direction > 8) {
        direction = (direction - 1) % 8 + 1;
    }
    return new RoomPosition(this.x + adjacent[direction][0], this.y + adjacent[direction][1], this.roomName);
};