import { useEffect } from "react";

type ShortcutOptions = {
  key: string;
  ctr?: boolean;
  callback: () => void;
};

export const useHotKey = ({ key, ctr = false, callback }: ShortcutOptions) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isKeyMatch = e.key.toLowerCase() === key.toLowerCase();
      const hasCtrlMeta = e.ctrlKey || e.metaKey;

      if (ctr ? isKeyMatch && hasCtrlMeta : isKeyMatch && !hasCtrlMeta) {
        e.preventDefault();
        e.stopPropagation();
        callback();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, callback, ctr]);
};
