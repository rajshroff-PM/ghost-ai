"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorHomeProps {
  onNewProject: () => void;
  className?: string;
}

/**
 * Editor home screen shown when no project is open.
 *
 * @param onNewProject - Called when the New Project action is pressed
 * @returns The centered editor home state
 */
export function EditorHome({ onNewProject, className }: EditorHomeProps) {
  return (
    <div
      className={cn(
        "relative flex h-full items-center justify-center bg-[var(--canvas-bg)] px-6",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-aurora)]"
      />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="max-w-prose text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={onNewProject}
          className="mt-2 h-10 rounded-xl bg-brand px-4 text-copy-invert hover:bg-brand hover:shadow-[var(--glow-brand)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          New Project
        </Button>
      </div>
    </div>
  );
}
