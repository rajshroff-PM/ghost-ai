"use client";

import type { LucideIcon } from "lucide-react";
import { FolderOpen, Plus, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject?: () => void;
  className?: string;
}

interface SidebarEmptyStateProps {
  icon: LucideIcon;
  heading: string;
  description: string;
}

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

/**
 * Projects panel. Floats above the editor canvas as an overlay — opening it
 * slides the panel in from the left without reflowing the page content.
 */
export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  className,
}: ProjectSidebarProps) {
  return (
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
            <SidebarEmptyState
              icon={FolderOpen}
              heading="No projects yet"
              description="Create a project to start designing."
            />
          </TabsContent>
          <TabsContent value="shared">
            <SidebarEmptyState
              icon={Users}
              heading="Nothing shared with you"
              description="Projects you collaborate on appear here."
            />
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
  );
}
