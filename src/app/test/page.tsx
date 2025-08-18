"use client";

import { useHotKey } from "@/hook/use-hot-key";
import { useErrorDialog } from "@/hook/useErrorDialog";
import ErrorDialog from "@/components/ErrorDialog";
import { ErrorMessages, ErrorType } from "@/type/error";
import { shortcut } from "@/type/hot_key";
import { useState } from "react";

export default function ShortcutExampleHook() {
  const [count, setCount] = useState(0);

  // Sử dụng hook useErrorDialog để quản lý dialog lỗi
  // Trả về các state và method để hiển thị dialog lỗi
  const { open, type, message, details, showError, hideError } = useErrorDialog();

  const increment = () => setCount((prev) => prev + 1);

  // Ví dụ method xử lý lỗi
  const handleError = async () => {
    // Ví dụ sử dụng showError để hiển thị lỗi
    // Truyền vào type, message và details vào showError(message, type,details?)
    await showError(ErrorType.AccessForbidden, ErrorMessages[ErrorType.AccessForbidden], "Chi tiết lỗi: Bạn không có quyền truy cập vào tài nguyên này.");
    // chỉ chạy sau khi đóng dialog
    increment();
  };

  // Ví dụ thiết lập phím tắt, ví dụ Cmd+K (Mac) hoặc Ctrl+K (Windows)
  const hot_key = shortcut.testing;
  useHotKey({ key: hot_key.key, ctr: hot_key.ctr, callback: handleError });

  return (
    <div className="p-6">
      <h1>Shortcut Example with Hook</h1>
      <p>Press Cmd+K (Mac) hoặc Ctrl+K (Windows) → count: {count}</p>

      {/* Hiển thị Dialog lỗi */}
      <ErrorDialog
        open={open}
        type={type}
        message={message}
        onClose={hideError}
        detail={details}
      />
    </div>
  );
}
