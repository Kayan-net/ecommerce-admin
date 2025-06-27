"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

export function AutoOpenStoreModal() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}