const operation = [
    'source-over', 'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop',
    'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay',
    'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
    'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
];
const operationLength = operation.length;

function useGlobalCompositeOperation(ctx) {
    const type = operation[Math.floor(Math.random() * operationLength)];
    console.log(type);

    ctx.font = '30px serif';
    ctx.fillText(type, 0, 100);

    ctx.fillStyle = "blue";
    ctx.fillRect(30, 10, 50, 50);

    ctx.fillStyle = "red";
    ctx.fillRect(60, 30, 50, 50);


    ctx.globalCompositeOperation = type;

    ctx.fillStyle = "blue";
    ctx.fillRect(130, 10, 50, 50);

    ctx.fillStyle = "red";
    ctx.fillRect(160, 30, 50, 50);

}