"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

/**
 * Fixed-height top bar shared by every editor screen. Left holds the sidebar
 * toggle, center and right are reserved for chapters that follow.
 */
export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  className,
}: EditorNavbarProps) {
  const ToggleIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-surface-border bg-surface px-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          aria-label={isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"}
          aria-expanded={isSidebarOpen}
          onClick={onToggleSidebar}
          className="rounded-xl text-copy-muted hover:bg-elevated hover:text-copy-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          <ToggleIcon className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center" />

      <div className="flex items-center justify-end gap-2" />
    </header>
  );
}
