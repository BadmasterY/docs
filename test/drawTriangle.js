function drawTriangle(ctx) {
    // 1. craete path
    ctx.beginPath();
    // 2. move to start point
    ctx.moveTo(75, 50);
    // 3. crate lines
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    // 4. close path
    ctx.closePath();
    // 5. fill or stroke
    ctx.fill();
    // ctx.stroke();
}