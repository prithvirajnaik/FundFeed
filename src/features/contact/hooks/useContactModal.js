import { useState } from "react";

export default function useContactModal() {
  const [open, setOpen] = useState(false);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  };
}
