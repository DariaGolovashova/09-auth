"use client";
import css from "./Modal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
