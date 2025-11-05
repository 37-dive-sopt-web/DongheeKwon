import Button from "@components/button/Button";
import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
}: ModalProps) {
  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl bg-white p-8 text-center shadow-lg px-[6rem] py-[4rem]"
      >
        <h2 className="heading-sb-20 mb-[1.6rem] text-center">{title}</h2>
        <p className="font-size-base text-center">{description}</p>
        <Button
          variant="primary"
          size="default"
          onClick={onClose}
          className="w-full text-white"
        >
          확인
        </Button>
      </div>
    </div>,
    document.body
  );
}
