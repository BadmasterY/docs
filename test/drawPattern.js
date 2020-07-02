function drawPattern(ctx) {
    const img = new Image();
    img.src = './images/canvas/Canvas_createpattern.png';
    img.onload = function () {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 400, 400);
    };
}