import React from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";

const ConfirmDialog = ({ open, onOpenChange, onConfirm, title, description, confirmText = "Confirm" }) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
