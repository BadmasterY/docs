function useClip(ctx) {
    // Create clipping region
    ctx.arc(100, 100, 75, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.fillRect(0, 0, 100, 100);
}