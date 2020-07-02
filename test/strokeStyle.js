function useStrokeStyle(ctx) {
    // set line width
    ctx.lineWidth = 25;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            ctx.strokeStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                Math.floor(255 - 42.5 * j) + ',0)';
            const x = j * 25 + 12.5;
            const y = i * 25;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 25);
            ctx.closePath();
            ctx.stroke();
        }
    }
};