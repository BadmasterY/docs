function useState(ctx) {
    // default state
    ctx.save();

    ctx.fillStyle = 'rgba(255, 0, 0, .3)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.restore();
    ctx.fillRect(40, 40, 50, 50);
}