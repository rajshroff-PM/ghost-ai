"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Action buttons rendered in the dialog footer. */
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Shared dialog shell for the editor. Every dialog in the app composes this so
 * title, description, and footer actions stay visually consistent — feature
 * dialogs are built on top of it, not by restyling the shadcn primitive.
 */
export function EditorDialog({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
  className,
}: EditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-5 rounded-3xl border border-surface-border bg-elevated p-6 text-copy-primary shadow-[var(--shadow-float)] ring-0 sm:max-w-lg",
          className,
        )}
      >
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-lg font-medium tracking-tight text-copy-primary">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="text-sm text-copy-muted">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {children}

        {footer ? (
          <DialogFooter className="-mx-6 -mb-6 gap-2 rounded-b-3xl border-t border-surface-border bg-surface p-4">
            {footer}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
