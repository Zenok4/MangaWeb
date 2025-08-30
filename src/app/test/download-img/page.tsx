// src/app/test/download-img/page.tsx
"use client";

import { downloadDriveFolderAction } from "@/services/(action)/download";

const DownloadImgTestPage = () => {
  const downloadImage = async () => {
    const folderId = "1vkdT46lcOQ3XaicLUjQvgVf__plT6__F";

    const res = await downloadDriveFolderAction({folderId: folderId});

    const blob = new Blob([res.buffer], { type: "application/zip" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = res.filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Test Download Image</h1>
      <button
        onClick={downloadImage}
        style={{
          padding: "8px 16px",
          fontSize: 16,
          cursor: "pointer",
          marginTop: 16,
        }}
      >
        Download Image
      </button>
    </div>
  );
}

export default DownloadImgTestPage;
