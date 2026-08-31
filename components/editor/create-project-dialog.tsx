"use client";

import type { FormEvent } from "react";

import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toSlug } from "@/lib/slug";

const FORM_ID = "create-project-form";

interface CreateProjectDialogProps {
  open: boolean;
  /** Current value of the project name field. */
  name: string;
  isSubmitting: boolean;
  onNameChange: (name: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

/**
 * Collects a name for a new project and previews the slug derived from it.
 *
 * @param name - The project name being typed
 * @param isSubmitting - Disables the form while a submit is in flight
 * @param onNameChange - Called on every keystroke so the slug preview updates
 * @param onSubmit - Called when the form is submitted with a non-empty name
 * @returns The create project dialog
 */
export function CreateProjectDialog({
  open,
  name,
  isSubmitting,
  onNameChange,
  onOpenChange,
  onSubmit,
}: CreateProjectDialogProps) {
  const slug = toSlug(name);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slug || isSubmitting) return;
    onSubmit();
  }

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create project"
      description="Name the workspace you want to design in."
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
            disabled={!slug || isSubmitting}
            className="rounded-xl bg-brand text-copy-invert hover:bg-brand hover:shadow-[var(--glow-brand)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Create project
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="create-project-name"
            className="text-xs text-copy-muted"
          >
            Project name
          </label>
          <Input
            id="create-project-name"
            value={name}
            autoFocus
            autoComplete="off"
            disabled={isSubmitting}
            placeholder="Checkout Platform"
            onChange={(event) => onNameChange(event.target.value)}
            className="h-9 rounded-xl border-surface-border bg-sunken text-sm text-copy-primary placeholder:text-copy-subtle focus-visible:border-surface-strong focus-visible:ring-2 focus-visible:ring-focus"
          />
        </div>

        <div className="flex flex-col gap-1 rounded-xl bg-sunken px-3 py-2">
          <span className="text-[11px] uppercase tracking-[0.14em] text-copy-subtle">
            Slug
          </span>
          <span
            aria-live="polite"
            className={
              slug
                ? "font-mono text-xs text-copy-primary"
                : "font-mono text-xs text-copy-subtle"
            }
          >
            {slug || "project-slug"}
          </span>
        </div>
      </form>
    </EditorDialog>
  );
}
