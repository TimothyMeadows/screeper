RoomVisual.prototype.drawStatus = function (pos, status, color, offset) {
    if (!offset)
        offset = 0;

    this.text(status, (pos.x - 0.3) + offset, pos.y - 0.5, {
        font: 0.3,
        color: color
    });
};

RoomVisual.prototype.drawStatuses = function (pos, statuses, color) {
    var step = 0;
    for (var i in statuses) {
        var status = statuses[i]

        this.drawStatus(pos, status, color, step);
        step += 0.5;
    } 
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