// Pure canvas helpers for the hero sequence: DPR-aware sizing and
// cover-style (object-fit: cover) drawing of a source image/frame.

export function sizeCanvasForDpr(
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number
): CanvasRenderingContext2D | null {
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const targetWidth = Math.round(cssWidth * dpr);
  const targetHeight = Math.round(cssHeight * dpr);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

/** Draws `source` into the canvas using cover-fit scaling (crops to fill, never letterboxes). */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource & { width: number; height: number },
  cssWidth: number,
  cssHeight: number
): void {
  const sourceRatio = source.width / source.height;
  const targetRatio = cssWidth / cssHeight;

  let drawWidth = cssWidth;
  let drawHeight = cssHeight;

  if (sourceRatio > targetRatio) {
    drawHeight = cssHeight;
    drawWidth = cssHeight * sourceRatio;
  } else {
    drawWidth = cssWidth;
    drawHeight = cssWidth / sourceRatio;
  }

  const offsetX = (cssWidth - drawWidth) / 2;
  const offsetY = (cssHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
}
