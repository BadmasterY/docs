function drawDash(ctx) {
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -Math.floor(Math.random() * 16);
    alert(`lineDashOffset: ${ctx.lineDashOffset}`);
    ctx.strokeRect(10, 10, 100, 100);
}