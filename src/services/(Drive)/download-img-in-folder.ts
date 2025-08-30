// src/services/(Drive)/download-img-from-drive.ts
import JSZip from "jszip";
import { authorize } from "../(auth)/auth-google-drive";
import { DetectedMime, DriveFile } from "@/type/file-drive";
import { ExtFromMime, MimeTypes } from "@/type/mine-file";

// Detect mime từ buffer
const detectMime = (buffer: ArrayBuffer): DetectedMime => {
  const bytes = new Uint8Array(buffer.slice(0, 16));

  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return { ext: ExtFromMime[MimeTypes.jpeg], mime: MimeTypes.jpeg };
  }

  // PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: ExtFromMime[MimeTypes.png], mime: MimeTypes.png };
  }

  // GIF
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return { ext: ExtFromMime[MimeTypes.gif], mime: MimeTypes.gif };
  }

  // WebP (RIFF....WEBP)
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return { ext: ExtFromMime[MimeTypes.webp], mime: MimeTypes.webp };
  }

  // default: jpg
  return { ext: ExtFromMime[MimeTypes.jpeg], mime: MimeTypes.jpeg };
};

interface DownloadFolderAsZipProps {
  folderId: string;
}

/**
 * Tải toàn bộ nội dung của một thư mục trên Google Drive, bao gồm cả các thư mục con,
 * sau đó nén lại thành một file zip và trả về dưới dạng Buffer (Node.js).
 * Sử dụng cho các action cần tải về nhiều file cùng lúc.
 * @param folderId - ID của thư mục Google Drive cần tải
 * @returns Buffer chứa dữ liệu file zip
 * @example
 * const zipBuffer = await downloadDriveFolderAsZip({ folderId: "your-folder-id" });
 */

export const downloadDriveFolderAsZip = async ({
  folderId,
}: DownloadFolderAsZipProps): Promise<Buffer> => {
  const drive = await authorize();
  const zip = new JSZip();

  // Đệ quy tải folder
  const processFolder = async (folderId: string, zipFolder: JSZip) => {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType)",
    });

    const files = res.data.files ?? [];

    for (const file of files) {
      console.log("📂 Checking file:", file);

      if (!file.id || !file.name) continue;

      // Nếu là folder → đệ quy
      if (file.mimeType === "application/vnd.google-apps.folder") {
        const subFolder = zipFolder.folder(file.name);
        if (subFolder) {
          await processFolder(file.id, subFolder);
        }
        continue;
      }

      try {
        // Tải binary
        const fileRes = await drive.files.get(
          { fileId: file.id, alt: "media" },
          { responseType: "arraybuffer" }
        );

        const buffer = fileRes.data as ArrayBuffer;

        // Detect mime/extension
        const { ext } = detectMime(buffer);

        // Nếu tên có .bin → đổi thành đúng ext
        const outName = file.name.endsWith(".bin")
          ? file.name.replace(/\.bin$/i, "") + "." + ext
          : file.name;

        zipFolder.file(outName, buffer);
        console.log(`✅ Added to zip: ${outName}, size: ${(buffer.byteLength / 1024).toFixed(1)} KB`);
      } catch (err: any) {
        console.error("⨯ Failed to download file:", file.name, err.message);
        throw err;
      }
    }
  };

  // Bắt đầu từ folder gốc
  await processFolder(folderId, zip);

  // Trả về buffer zip
  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  return buffer;
};
