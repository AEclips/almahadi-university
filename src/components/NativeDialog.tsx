"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface NativeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

/**
 * Accessible native modal <dialog> wrapper with closedby="any" light-dismiss
 * and bounding-rect fallback for browsers lacking HTMLDialogElement.prototype.closedBy.
 */
export function NativeDialog({
  isOpen,
  onClose,
  titleId,
  title,
  children,
  maxWidthClass = "max-w-lg",
}: NativeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    let cleanupFallback = () => {};
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };

      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) {
          dialog.close();
        }
      };

      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupFallback = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupFallback();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className={`w-[calc(100%-2rem)] ${maxWidthClass} rounded-3xl border border-white/15 bg-slate-900 text-slate-100 p-0 shadow-2xl overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#071927]">
        <h2 id={titleId} className="text-lg font-black text-white pr-4">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close modal"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
