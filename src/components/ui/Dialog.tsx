import { useRef, useEffect } from "react";
import type { DialogProps } from "../../utils/types";

export default function Dialog({
  children,
  title,
  isOpen,
  onClose,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent p-0 shadow-lg backdrop:bg-black/50"
    >
      <div className="w-96 rounded-lg bg-white p-4">
        <header className="border-accent mb-6 flex items-center justify-center border-b pb-2">
          <h2 className="text-lg font-bold">{title}</h2>
        </header>
        {children}
      </div>
    </dialog>
  );
}
