import JSZip from "jszip";

interface FileMeta {
  url: string;        // link tải file .bin từ Drive
  mime: string;       // image/jpeg, image/png...
  name: string;       // tên gốc (photo1.jpg)
}

interface DownloadOptions {
    files: FileMeta[]; // danh sách file cần tải
    zipName?: string;   // tên file zip khi tải về
}

/**
 * Danh sách các tệp tin hình ảnh cần tải về.
 *
 * @remarks
 * Đây là một mảng các đối tượng, mỗi đối tượng đại diện cho một tệp hình ảnh với các thông tin:
 * - `url`: Đường dẫn tải về hình ảnh (có thể là link Google Drive hoặc các nguồn khác).
 * - `mime`: Loại MIME của hình ảnh (ví dụ: "image/jpeg", "image/png").
 * - `name`: Tên tệp sẽ được lưu khi tải về.
 *
 * @example
 *   const files = [
 *       { url: "https://drive.google.com/uc?id=xxx", mime: "image/jpeg", name: "photo1.jpg" },
 *       { url: "https://drive.google.com/uc?id=yyy", mime: "image/png", name: "photo2.png" }
 *   ];
 *
 *   await downloadFolderAsZip({ files: files, zipName: "my_album.zip" });
 *
 * @see downloadFolderAsZip - Hàm helper dùng để tải về hình ảnh từ url.
 */

export const downloadFolderAsZip = async ({files, zipName = "images.zip"}: DownloadOptions) => {
  const zip = new JSZip();

  for (const file of files) {
    const res = await fetch(file.url);
    const buffer = await res.arrayBuffer();

    // Lưu vào zip với tên gốc và MIME ảnh
    zip.file(file.name, buffer); // không cần Blob, JSZip nhận ArrayBuffer
  }

  // Tạo zip
  const content = await zip.generateAsync({ type: "blob" });

  // Tải zip
  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
