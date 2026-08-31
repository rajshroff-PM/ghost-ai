"use client";

import { useCallback, useState } from "react";

import type { Project } from "@/lib/projects";

/** The project dialog currently on screen, or `null` when none is open. */
export type ProjectDialog = "create" | "rename" | "delete";

export interface UseProjectDialogs {
  /** Which dialog is open, if any. */
  openDialog: ProjectDialog | null;
  /** The project the rename/delete dialogs act on. */
  activeProject: Project | null;
  /** Name field value shared by the create and rename dialogs. */
  name: string;
  /** True while a submit is in flight. */
  isSubmitting: boolean;
  setName: (name: string) => void;
  openCreateDialog: () => void;
  openRenameDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
  closeDialog: () => void;
  /** Runs the open dialog's action and closes it. */
  submit: () => void;
}

/**
 * Owns the dialog, form, and loading state for project create/rename/delete.
 *
 * Submitting performs no persistence yet — this unit is UI only, and the API
 * call belongs where `submit` flips `isSubmitting`.
 *
 * @returns The dialog state and the actions that drive it
 */
export function useProjectDialogs(): UseProjectDialogs {
  const [openDialog, setOpenDialog] = useState<ProjectDialog | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeDialog = useCallback(() => {
    setOpenDialog(null);
    setActiveProject(null);
    setName("");
    setIsSubmitting(false);
  }, []);

  const openCreateDialog = useCallback(() => {
    setActiveProject(null);
    setName("");
    setOpenDialog("create");
  }, []);

  const openRenameDialog = useCallback((project: Project) => {
    setActiveProject(project);
    setName(project.name);
    setOpenDialog("rename");
  }, []);

  const openDeleteDialog = useCallback((project: Project) => {
    setActiveProject(project);
    setName("");
    setOpenDialog("delete");
  }, []);

  const submit = useCallback(() => {
    setIsSubmitting(true);
    try {
      // No persistence in this unit: project create/rename/delete requests are
      // wired here once the project API exists.
    } finally {
      closeDialog();
    }
  }, [closeDialog]);

  return {
    openDialog,
    activeProject,
    name,
    isSubmitting,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    submit,
  };
}
