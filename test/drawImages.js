function drawImages(ctx) {
    const img_1 = new Image();
    img_1.onload = ev => {
        ctx.drawImage(img_1, 0, 0, 100, 100);
    };
    img_1.src = './images/canvas/drawimage_1.jpeg';
    const img_2 = new Image();
    img_2.onload = ev => {
        ctx.drawImage(img_2, 120, 0, 128, 72);
    };
    img_2.src = './images/canvas/drawimage_2.jpeg';
    const img_3 = new Image();
    img_3.onload = ev => {
        ctx.drawImage(img_3, 0, 120, 100, 89);
    };
    img_3.src = './images/canvas/drawimage_3.jpeg';
    const img_4 = new Image();
    img_4.onload = ev => {
        ctx.drawImage(img_4, 120, 120, 192, 120);
    };
    img_4.src = './images/canvas/drawimage_4.jpeg';
}