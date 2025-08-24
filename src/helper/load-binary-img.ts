// lib/loadRawToCanvas.ts
/**
 * Load file nhị phân (.bin) vào canvas để hiển thị
 */

/**
 * Loads a binary image from the specified URL and draws it onto the provided HTMLCanvasElement.
 *
 * This helper fetches the image as a binary buffer, creates a Blob, and uses an Object URL
 * to load the image into an HTMLImageElement. Once loaded, it draws the image onto the canvas,
 * resizing the canvas to match the image dimensions.
 *
 * @param url - The URL of the binary image to load (e.g., JPEG, PNG, GIF).
 * @param canvas - The HTMLCanvasElement where the image will be drawn.
 * @returns A Promise that resolves when the image has been successfully drawn onto the canvas,
 * or rejects if an error occurs during loading or drawing.
 */

export async function loadRawToCanvas(url: string, canvas: HTMLCanvasElement) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  // Blob giả định là ảnh jpeg/png/gif → canvas
  const blob = new Blob([buffer]);
  const objectUrl = URL.createObjectURL(blob);

  // Vẽ ảnh lên canvas
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      resolve();
    };
    img.onerror = (err) => reject(err);
    img.src = objectUrl;
  });
}
