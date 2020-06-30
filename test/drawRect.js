function drawRect() {
    const canvas = document.getElementById('my-canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw rect
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(55, 55, 40, 40);
    } else {
        // fallback codes
    }
};