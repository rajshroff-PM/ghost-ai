import { dark } from "@clerk/ui/themes";

export const clerkAppearance = {
  theme: dark,
  variables: {
    colorPrimary: "var(--accent-primary)",
    colorPrimaryForeground: "var(--text-invert)",
    colorBackground: "var(--bg-surface)",
    colorForeground: "var(--text-primary)",
    colorNeutral: "var(--text-muted)",
    colorMuted: "var(--bg-elevated)",
    colorMutedForeground: "var(--text-muted)",
    colorInput: "var(--bg-sunken)",
    colorInputForeground: "var(--text-primary)",
    colorBorder: "var(--border-default)",
    colorRing: "var(--accent-primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    fontFamily: "var(--font-sans)",
    fontFamilyMono: "var(--font-mono)",
    borderRadius: "0.75rem",
  },
};
