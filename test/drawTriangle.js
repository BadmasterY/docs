function drawTriangle() {
    const canvas = document.getElementById('my-canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;

        // 1. craete path
        ctx.beginPath();
        // 2. move to start point
        ctx.moveTo(75, 50);
        // 3. crate lines
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        // 4. close path
        ctx.closePath();
        // 5. fill or stroke
        ctx.fill();
        // ctx.stroke();
    } else {
        // fallback codes
    }
}