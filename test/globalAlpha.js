function useGlobalAlpha(ctx) {
    // draw rect
    ctx.fillRect(25, 25, 100, 100);

    ctx.globalAlpha = .5;
    ctx.fillStyle = '#f40';

    ctx.fillRect(50, 50, 30, 30);
};