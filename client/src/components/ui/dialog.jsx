import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <AnimatePresence>
        <DialogPrimitive.Overlay asChild>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
        </DialogPrimitive.Overlay>
      </AnimatePresence>
      <DialogPrimitive.Content asChild {...props}>
        <Motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl",
            className
          )}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
            <X className="size-4" />
          </DialogPrimitive.Close>
        </Motion.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("mb-3", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />;
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("mt-1 text-sm text-slate-600", className)} {...props} />;
}
