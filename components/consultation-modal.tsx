"use client";

import { createContext, useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ConsultationModalContent = dynamic(
  () =>
    import("./consultation-modal-content").then((m) => m.ConsultationModalContent),
  { ssr: false }
);

type ConsultationModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const ConsultationModalContext =
  createContext<ConsultationModalContextValue | null>(null);

export function useConsultationModal() {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) {
    throw new Error(
      "useConsultationModal must be used within ConsultationModalProvider",
    );
  }
  return ctx;
}

export function ConsultationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const openModal = useCallback(() => {
    setHasOpened(true);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <ConsultationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {hasOpened && (
        <ConsultationModalContent open={open} onOpenChange={setOpen} />
      )}
    </ConsultationModalContext.Provider>
  );
}
