"use client";

import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

interface DeleteProjectDialogProps {
  open: boolean;
  /** The project being deleted, or `null` when the dialog is closed. */
  project: Project | null;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/**
 * Confirms permanent deletion of a project. Confirmation only — no input.
 *
 * @param project - The project named in the confirmation copy
 * @param onConfirm - Called when the destructive action is confirmed
 * @returns The delete project dialog
 */
export function DeleteProjectDialog({
  open,
  project,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete project"
      description={
        project
          ? `"${project.name}" and its canvas will be permanently deleted. This cannot be undone.`
          : "This project will be permanently deleted. This cannot be undone."
      }
      footer={
        <>
          <Button
            type="button"
            size="lg"
            variant="ghost"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-copy-muted hover:bg-elevated hover:text-copy-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="rounded-xl border border-state-error/30 bg-[var(--state-error-soft)] text-state-error hover:bg-[var(--state-error-soft)] hover:border-state-error/50 focus-visible:ring-2 focus-visible:ring-state-error focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Delete project
          </Button>
        </>
      }
    />
  );
}
