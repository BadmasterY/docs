function drawSmilingFace(ctx) {
    // 1. start path
    ctx.beginPath();
    // 2. face
    ctx.arc(75, 75, 50, 0, Math.PI * 2);
    // 3. move
    ctx.moveTo(110, 75);
    // 4. mouse
    ctx.arc(75, 75, 35, 0, Math.PI);
    // 5. move
    ctx.moveTo(65, 65);
    // 6. left eye
    ctx.arc(60, 65, 5, 0, Math.PI * 2);
    ctx.moveTo(95, 65);
    // 7. right eye
    ctx.arc(90, 65, 5, 0, Math.PI * 2);
    // 8. close path
    ctx.closePath();
    // 9. stroke
    ctx.stroke();
}