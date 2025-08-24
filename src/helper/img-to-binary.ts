// lib/fileToRaw.ts
/**
 * Convert ảnh upload thành file nhị phân (.bin)
 * để lưu lên Supabase/Drive mà không lộ preview
 */
export async function fileToRaw(file: File): Promise<Blob> {
  // Đọc file thành ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // Trả về Blob với kiểu application/octet-stream
  return new Blob([arrayBuffer], { type: "application/octet-stream" });
}
