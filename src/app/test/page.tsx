"use client";

import { useHotKey } from "@/hook/use-hot-key";
import { shortcut } from "@/type/hot_key";
import { useState } from "react";

function ShortcutExampleHook() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  // Lấy hot key từ type
  const hot_key = shortcut.testing;

  // Sử dụng hook: Cmd+K trên Mac hoặc Ctrl+K trên Windows
  useHotKey({ key: hot_key.key, ctr: hot_key.ctr, callback: increment });

  return (
    <div>
      <h1>Shortcut Example with Hook</h1>
      <p>Press Cmd+K (Mac) or Ctrl+K (Windows) to increase count: {count}</p>
    </div>
  );
}

export default ShortcutExampleHook;
