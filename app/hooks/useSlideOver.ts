import { useState } from "react";

export const useSliderOver = () => {
  const [open, setOpen] = useState(false);

  const openSlideOver = () => setOpen(true);
  const closeSlideOver = () => setOpen(false);

  return {
    open,
    openSlideOver,
    closeSlideOver,
  };
};
