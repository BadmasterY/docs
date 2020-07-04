function useScale(ctx) {
    ctx.save();
    ctx.scale(10, 3);
    ctx.fillRect(1, 10, 10, 10);
    ctx.restore();

    // mirror horizontally
    ctx.scale(-1, 1);
    ctx.font = '20px serif';
    ctx.fillText('Hello world!', -135, 120);
}