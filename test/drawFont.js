function drawFont(ctx) {
    ctx.font = '30px serif';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'middle';
    ctx.direction = 'ltr';

    ctx.strokeText("Hello world!", 0, 100);
}