RoomVisual.prototype.drawStatus = function (pos, status) {
    this.text(status, pos.x, pos.y - 0.5, {
        font: 0.4
    });
};

RoomVisual.prototype.drawText = function (pos, text, color) {
    this.text(text, pos.x, pos.y + 0.2, {
        color: color,
        font: 0.7
    });
};

RoomVisual.prototype.drawPath = function (path, color) {
    if (path.length) {
        this.poly(path.map(p => [p.x, p.y]), {
            stroke: color,
            strokeWidth: 0.1,
            opacity: 0.5,
            lineStyle: 'dashed'
        });
    }
};