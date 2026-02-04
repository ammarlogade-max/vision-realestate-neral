import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const base =
    "fixed top-4 right-4 z-50 px-4 py-3 rounded shadow text-sm text-white";
  const colors = type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <div className={`${base} ${colors}`} role="status">
      {message}
    </div>
  );
}
