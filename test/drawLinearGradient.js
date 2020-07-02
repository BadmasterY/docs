function drawLinearGradient(ctx) {
    const lingrad = ctx.createLinearGradient(0, 0, 0, 150);
    lingrad.addColorStop(0, '#00ABEB');
    // lingrad.addColorStop(.5, '#26C000');
    lingrad.addColorStop(.8, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = lingrad;
    ctx.strokeStyle = lingrad;

    // draw shapes
    ctx.fillRect(10, 10, 50, 50);
    ctx.strokeRect(40, 40, 50, 50);
}