function drawArc() {
  const canvas = document.getElementById('my-canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // create 4 x 3 arc
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        // center point position
        const x = 25 + j * 50;
        const y = 25 + i * 50;
        // radius
        const radius = 20;
        const startAngle = 0;
        const endAngle = Math.PI + (Math.PI * j) / 2;
        // event or odd
        const anticlockwise = i % 2 == 0 ? false : true;

        // create arc
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  } else {
    // fallback codes
  }
};