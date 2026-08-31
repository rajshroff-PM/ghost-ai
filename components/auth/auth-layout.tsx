import { FileText, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-base">
      <div
        className="hidden flex-col px-16 py-16 lg:flex lg:w-1/2"
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--bg-elevated) 88%, var(--accent-primary) 12%)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 rounded-xl bg-brand" aria-hidden />
          <span className="text-lg font-semibold tracking-tight text-copy-primary">
            Ghost AI
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-10 py-12">
          <div className="flex max-w-lg flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-copy-primary">
              Design systems at the speed of thought.
            </h1>
            <p className="max-w-prose text-sm text-copy-muted">
              Describe your architecture in plain English. Ghost AI maps it to
              a shared canvas your whole team can refine in real time.
            </p>
          </div>

          <ul className="flex max-w-lg flex-col gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-copy-primary">
                    {title}
                  </p>
                  <p className="text-sm text-copy-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-copy-subtle">
          © {new Date().getFullYear()} Ghost AI. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}
