RoomVisual.prototype.drawPosition = function (pos, text, color) {
    var visual = this;

    visual.text(text, pos.x, pos.y + 0.2, {
        color: color,
        font: 0.7,
        opacity: 0.5
    });
};

RoomVisual.prototype.drawPath = function (path, color) {
    var visual = this;

    if (path.length) {
        visual.poly(path.map(p => [p.x, p.y]), {
            stroke: color,
            strokeWidth: 0.1,
            opacity: 0.5
        });
    }
};