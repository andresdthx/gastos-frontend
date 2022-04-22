import React, { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function RoutineCreateScreen(props) {
  const { open, setOpen } = props;
  const [openLocal, setOpenLocal] = useState(false);

  const onDismiss = useCallback(() => {
    setOpenLocal(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  }, [setOpen]);

  useEffect(() => {
    if (open) setOpenLocal(open);
  }, [open]);

  return (
    <BottomSheet
      open={openLocal}
      onDismiss={onDismiss}
      className="bottomSheet"
      snapPoints={({ minHeight }) => minHeight}
    >
      Routine create screen
    </BottomSheet>
  );
}
