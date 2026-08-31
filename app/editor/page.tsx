"use client";

import { useState } from "react";

import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { EditorHome } from "@/components/editor/editor-home";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { MOCK_OWNED_PROJECTS, MOCK_SHARED_PROJECTS } from "@/lib/projects";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
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
  } = useProjectDialogs();

  function handleOpenChange(open: boolean) {
    if (!open) closeDialog();
  }

  return (
    <div className="flex h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          ownedProjects={MOCK_OWNED_PROJECTS}
          sharedProjects={MOCK_SHARED_PROJECTS}
          onNewProject={openCreateDialog}
          onRenameProject={openRenameDialog}
          onDeleteProject={openDeleteDialog}
        />
        <EditorHome onNewProject={openCreateDialog} />
      </div>

      <CreateProjectDialog
        open={openDialog === "create"}
        name={name}
        isSubmitting={isSubmitting}
        onNameChange={setName}
        onOpenChange={handleOpenChange}
        onSubmit={submit}
      />
      <RenameProjectDialog
        open={openDialog === "rename"}
        project={activeProject}
        name={name}
        isSubmitting={isSubmitting}
        onNameChange={setName}
        onOpenChange={handleOpenChange}
        onSubmit={submit}
      />
      <DeleteProjectDialog
        open={openDialog === "delete"}
        project={activeProject}
        isSubmitting={isSubmitting}
        onOpenChange={handleOpenChange}
        onConfirm={submit}
      />
    </div>
  );
}
