"use client";
import { loadRawToCanvas } from "@/helper/load-binary-img";
import { useEffect, useRef } from "react";

// Props cho component BinImage
interface BinImageProps {
  url: string;
  width?: number;
}

/**
 * BinImage component renders a binary image onto a canvas element.
 * 
 * @param {BinImageProps} props - The properties for the component.
 * @param {string} props.url - The URL or source of the binary image to load and render.
 * @param {number} [props.width] - Optional width (in pixels) to display the canvas.
 * 
 * This component uses a canvas to display binary image data loaded from the provided URL.
 * The image is reloaded whenever the `url` or `width` props change.
 * The right-click context menu is disabled on the canvas to prevent saving the image.
 */

const BinImage = ({ url, width }: BinImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load ảnh khi url thay đổi
  useEffect(() => {
    if (!canvasRef.current) return;
    loadRawToCanvas(url, canvasRef.current).catch((err) =>
      console.error("Failed to load bin image:", err)
    );
  }, [url, width]);

  return (
    <canvas
      ref={canvasRef}
      className="object-contain"
      style={{ width: width ? `${width}px` : "auto" }}
      onContextMenu={(e) => e.preventDefault()} // chặn context menu (right click)
    ></canvas>
  );
};

export default BinImage;
