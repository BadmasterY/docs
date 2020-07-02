function drawShadow(ctx) {
    ctx.shadowColor = "rgba(0, 0, 0, .5)";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 10;

    ctx.fillStyle = "rgba(0, 171, 235, .8)";
    ctx.fillRect(10, 10, 100, 100);
}