"use server";

import { downloadDriveFolderAsZip } from "@/services/(Drive)/download-img-in-folder";

interface DownloadDriveFolderActionProps {
  folderId: string;
  zipname?: string;
}

/**
 * Tải một thư mục từ Google Drive và nén thành file zip.
 * Trả về ArrayBuffer (dùng cho web) và tên file zip.
 *
 * @param folderId - ID của thư mục trên Google Drive cần tải về.
 * @param zipname - Tên file zip xuất ra (mặc định là "download.zip").
 *
 * @example
 * const res = await downloadDriveFolderAction({
 *   folderId: "your-folder-id",
 *   zipname: "myfolder.zip"
 * });
 */

export const downloadDriveFolderAction = async ({
  folderId, 
  zipname = "download.zip"
}: DownloadDriveFolderActionProps) => {
  const buffer = await downloadDriveFolderAsZip({ folderId });

  // Convert Buffer (Node) -> ArrayBuffer (Web)
  const arrayBuffer = buffer.buffer.slice(
  buffer.byteOffset,
  buffer.byteOffset + buffer.byteLength
) as ArrayBuffer;

  return {
    buffer: arrayBuffer,
    filename: zipname,
  };
};
