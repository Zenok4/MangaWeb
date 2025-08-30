// src/types/drive.ts

// Kiểu dữ liệu cho file lấy từ Google Drive
export interface DriveFile {
  id: string;        // luôn là string (nếu null thì xử lý trước khi gán)
  name: string;      // luôn có tên (nếu null thì đặt mặc định)
  mimeType: string;  // loại file (folder, bin, image, ...)
}

// Kiểu config khi tải folder/zip
export interface DownloadFileConfig {
  url: string;       // link fetch (nếu dùng API thì có thể là fileId)
  name: string;      // tên file để lưu
  mime?: string;     // mime có thể undefined (vì mình tự detect lại)
}

// Kiểu kết quả detect mime từ binary
export interface DetectedMime {
  mime: string;
  ext: string;
}
