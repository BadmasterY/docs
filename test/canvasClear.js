function canvasClear(ctx, canvas) {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // init
    ctx.lineWidth = 1.0;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 10;
    ctx.lineDashOffset = 0.0;
    ctx.setLineDash([]);
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
    ctx.direction = 'inherit';
}