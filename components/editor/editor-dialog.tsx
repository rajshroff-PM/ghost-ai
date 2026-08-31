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
 * Renders a consistently styled dialog for editor content.
 *
 * @param title - The dialog title.
 * @param description - Optional supporting text displayed below the title.
 * @param footer - Optional footer actions.
 * @param children - The dialog body content.
 * @returns The editor dialog layout.
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
