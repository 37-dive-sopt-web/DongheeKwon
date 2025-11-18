import { useState } from "react";

export interface ModalState {
  isOpen: boolean;
  title: string;
  description?: string;
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    description: "",
  });

  const openModal = (title: string, description?: string) => {
    setModal({
      isOpen: true,
      title,
      description,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    modal,
    openModal,
    closeModal,
  };
};
