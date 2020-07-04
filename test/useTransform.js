function useTransform(ctx) {
    ctx.transform(1, 1, 0, 1, 10, 0);
    // ctx.setTransform(1, 1, 0, 1, 10, 0);
    ctx.fillRect(0, 0, 100, 100);
}