"use client";

import type { FormEvent } from "react";

import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/lib/projects";

const FORM_ID = "rename-project-form";

interface RenameProjectDialogProps {
  open: boolean;
  /** The project being renamed, or `null` when the dialog is closed. */
  project: Project | null;
  /** Current value of the project name field, prefilled with the old name. */
  name: string;
  isSubmitting: boolean;
  onNameChange: (name: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

/**
 * Renames an existing project from a prefilled, auto-focused name field.
 *
 * @param project - The project whose current name is shown in the description
 * @param name - The edited project name
 * @param onSubmit - Called on Enter or when the confirm action is pressed
 * @returns The rename project dialog
 */
export function RenameProjectDialog({
  open,
  project,
  name,
  isSubmitting,
  onNameChange,
  onOpenChange,
  onSubmit,
}: RenameProjectDialogProps) {
  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0 && !isSubmitting;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  }

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename project"
      description={
        project ? `Currently named "${project.name}".` : "Choose a new name."
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
            type="submit"
            form={FORM_ID}
            size="lg"
            disabled={!canSubmit}
            className="rounded-xl bg-brand text-copy-invert hover:bg-brand hover:shadow-[var(--glow-brand)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Save name
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="rename-project-name" className="text-xs text-copy-muted">
          Project name
        </label>
        <Input
          id="rename-project-name"
          value={name}
          autoFocus
          autoComplete="off"
          disabled={isSubmitting}
          onChange={(event) => onNameChange(event.target.value)}
          className="h-9 rounded-xl border-surface-border bg-sunken text-sm text-copy-primary placeholder:text-copy-subtle focus-visible:border-surface-strong focus-visible:ring-2 focus-visible:ring-focus"
        />
      </form>
    </EditorDialog>
  );
}
