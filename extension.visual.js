RoomVisual.prototype.drawPath = function (path, color) {
    if (path.length)
        this.poly(path.map(p => [p.x, p.y]), {
            stroke: color,
            strokeWidth: 0.1,
            opacity: 0.5,
            lineStyle: 'dashed'
        });
};