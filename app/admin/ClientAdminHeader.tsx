"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { AutoOpenStoreModal } from "@/components/auto-open-store-modal";

export function ClientAdminHeader() {
  return (
    <>
      <AutoOpenStoreModal />
      <StoreModal />
    </>
  );
} 