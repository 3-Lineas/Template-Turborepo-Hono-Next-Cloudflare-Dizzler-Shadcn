"use client";

import { useState } from "react";
import { logoutAction } from "@/actions/auth/logout.action";

export function useLogout() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logoutAction();
    } finally {
      setIsPending(false);
    }
  };

  return {
    open,
    setOpen,
    isPending,
    handleLogout,
  };
}
