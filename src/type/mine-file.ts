// src/types/mime.ts
export const MimeTypes = {
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
} as const;

export type MimeKey = keyof typeof MimeTypes;       // "jpeg" | "png" | ...
export type MimeValue = typeof MimeTypes[MimeKey];  // "image/jpeg" | ...

// Map ngược MIME -> ext (mặc định)
// chú ý: image/jpeg -> "jpg"
export const ExtFromMime: Record<MimeValue, string> = {
  [MimeTypes.jpeg]: "jpg",
  [MimeTypes.png]: "png",
  [MimeTypes.gif]: "gif",
  [MimeTypes.webp]: "webp",
};
