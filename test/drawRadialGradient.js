function drawRadialGradient(ctx) {
    const radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    radgrad.addColorStop(0, '#00C9FF');
    radgrad.addColorStop(.8, '#00ABEB');
    radgrad.addColorStop(1, 'rgba(0, 201, 255, 0)');

    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, 150, 150);

    // ctx.strokeStyle = radgrad;
    // ctx.strokeRect(75, 75, 150, 150);
}