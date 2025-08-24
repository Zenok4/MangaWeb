// app/upload/page.tsx
"use client";

import { fileToRaw } from "@/helper/img-to-binary";
import { useState } from "react";

export default function UploadPage() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert sang raw bin
    const binBlob = await fileToRaw(file);

    // Tạo link download
    const url = URL.createObjectURL(binBlob);
    setDownloadUrl(url);
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">Upload → Download .bin</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="image.bin"
          className="mt-4 block text-blue-600 underline"
        >
          Tải file nhị phân (.bin)
        </a>
      )}
    </div>
  );
}
