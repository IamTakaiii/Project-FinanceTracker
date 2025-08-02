import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/global/components/ui/dialog";
import { Button } from "@/global/components/ui/button";
import { useState } from "react";

type ConfirmationDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
};

/**
 * A reusable confirmation dialog component built using the standard Dialog.
 * It provides a consistent confirmation prompt for critical actions.
 */
export const ConfirmationDialog = ({
  children,
  title,
  description,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  confirmButtonClass = "",
}: ConfirmationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} className={confirmButtonClass}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
