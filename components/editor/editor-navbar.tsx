"use client";

import { UserButton } from "@clerk/nextjs";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

/**
 * Renders the editor navigation bar with a sidebar toggle and account menu.
 *
 * @param isSidebarOpen - Whether the projects sidebar is currently open
 * @param onToggleSidebar - Callback invoked when the sidebar toggle is clicked
 * @returns The editor navigation bar
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

      <div className="flex items-center justify-end gap-2">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8 rounded-full",
            },
          }}
        />
      </div>
    </header>
  );
}
