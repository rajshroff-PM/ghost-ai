"use client";

import type { LucideIcon } from "lucide-react";
import { FolderOpen, Pencil, Plus, Trash2, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  /** Projects the user owns — rendered with rename and delete actions. */
  ownedProjects: Project[];
  /** Projects shared with the user — rendered without actions. */
  sharedProjects: Project[];
  onNewProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  className?: string;
}

interface SidebarEmptyStateProps {
  icon: LucideIcon;
  heading: string;
  description: string;
}

/**
 * Renders an empty-state message with an icon, heading, and description.
 *
 * @param icon - The icon component displayed above the message
 * @param heading - The primary empty-state message
 * @param description - Additional context for the empty state
 */
function SidebarEmptyState({
  icon: Icon,
  heading,
  description,
}: SidebarEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft">
        <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
      </span>
      <p className="text-sm text-copy-primary">{heading}</p>
      <p className="text-xs text-copy-muted">{description}</p>
    </div>
  );
}

interface ProjectListProps {
  projects: Project[];
  /** Omitted for shared projects, which expose no item actions. */
  onRename?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

/**
 * Renders a list of projects, with rename/delete actions only when handlers
 * are supplied — collaborator projects pass none.
 *
 * @param projects - The projects to list
 * @param onRename - Called with the project whose rename action was pressed
 * @param onDelete - Called with the project whose delete action was pressed
 */
function ProjectList({ projects, onRename, onDelete }: ProjectListProps) {
  const hasActions = Boolean(onRename && onDelete);

  return (
    <ul className="flex flex-col gap-1 px-2 py-3">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center gap-1 rounded-xl px-2 py-1.5 transition-colors duration-150 ease-out hover:bg-elevated motion-reduce:transition-none"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm text-copy-primary">
              {project.name}
            </span>
            <span className="truncate font-mono text-xs text-copy-muted">
              {project.slug}
            </span>
          </div>

          {hasActions ? (
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Rename ${project.name}`}
                onClick={() => onRename?.(project)}
                className="rounded-xl text-copy-subtle hover:bg-surface hover:text-copy-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Pencil className="h-4 w-4" strokeWidth={1.5} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${project.name}`}
                onClick={() => onDelete?.(project)}
                className="rounded-xl text-copy-subtle hover:bg-surface hover:text-state-error focus-visible:ring-2 focus-visible:ring-state-error focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Displays a projects sidebar overlay that slides in from the left without reflowing editor content.
 *
 * On small viewports a backdrop scrim sits behind the panel; tapping it closes
 * the sidebar.
 *
 * @param isOpen - Whether the sidebar is visible
 * @param onClose - Called when the sidebar is closed
 * @param ownedProjects - Projects listed under My Projects
 * @param sharedProjects - Projects listed under Shared
 * @param onNewProject - Called when the New Project action is pressed
 * @param onRenameProject - Called when an owned project's rename action is pressed
 * @param onDeleteProject - Called when an owned project's delete action is pressed
 * @param className - Optional additional CSS classes
 */
export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onNewProject,
  onRenameProject,
  onDeleteProject,
  className,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close projects sidebar"
          onClick={onClose}
          className="absolute inset-0 z-30 bg-base/70 backdrop-blur-sm md:hidden"
        />
      ) : null}

      <aside
        aria-label="Projects"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "absolute inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-surface-border bg-surface shadow-[var(--shadow-float)] transition-transform duration-200 ease-out motion-reduce:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
          <h2 className="text-lg font-medium tracking-tight text-copy-primary">
            Projects
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close projects sidebar"
            onClick={onClose}
            className="rounded-xl text-copy-muted hover:bg-elevated hover:text-copy-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>

        <Tabs defaultValue="mine" className="min-h-0 flex-1 gap-0">
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="mine">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <TabsContent value="mine">
              {ownedProjects.length > 0 ? (
                <ProjectList
                  projects={ownedProjects}
                  onRename={onRenameProject}
                  onDelete={onDeleteProject}
                />
              ) : (
                <SidebarEmptyState
                  icon={FolderOpen}
                  heading="No projects yet"
                  description="Create a project to start designing."
                />
              )}
            </TabsContent>
            <TabsContent value="shared">
              {sharedProjects.length > 0 ? (
                <ProjectList projects={sharedProjects} />
              ) : (
                <SidebarEmptyState
                  icon={Users}
                  heading="Nothing shared with you"
                  description="Projects you collaborate on appear here."
                />
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="shrink-0 border-t border-surface-border p-4">
          <Button
            type="button"
            size="lg"
            onClick={onNewProject}
            className="w-full rounded-xl bg-brand text-copy-invert hover:bg-brand hover:shadow-[var(--glow-brand)] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
