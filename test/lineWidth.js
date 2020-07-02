function useLineWidh(ctx) {
    // draw lines
    for (var i = 0; i < 10; i++) {
        ctx.lineWidth = 1 + i;
        ctx.beginPath();
        const x = 5 + i * 14;
        // const x = ctx.lineWidth % 2 > 0 ? 5 + i * 14 + .5 : 5 + i * 14;
        ctx.moveTo(x, 5);
        ctx.lineTo(x, 140);
        ctx.stroke();
    }
};