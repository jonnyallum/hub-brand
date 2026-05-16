/** @type {import('tailwindcss').Config} */
// HubSuite shared Tailwind preset.
// Each consuming app should: presets: [require('./brand/tailwind.preset.cjs')]
// Per-app tailwind.config can extend further (additional content paths, legacy palettes, plugins).

const rgb = (v) => `rgb(${v} / <alpha-value>)`;

module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        // canvas
        bg:        rgb("var(--bg)"),
        fg:        rgb("var(--fg)"),
        muted:     rgb("var(--muted)"),
        card:      rgb("var(--card)"),

        // brand primaries (always-on, do not vary per hub)
        "brand-navy":      rgb("var(--brand-navy)"),
        "brand-navy-elev": rgb("var(--brand-navy-elev)"),
        "brand-ink":       rgb("var(--brand-ink)"),
        "brand-ink-muted": rgb("var(--brand-ink-muted)"),
        "brand-cyan":      rgb("var(--brand-cyan)"),
        "brand-blue":      rgb("var(--brand-blue)"),
        "brand-violet":    rgb("var(--brand-violet)"),

        // per-hub accent (overridden by /brand/css/<hub>.css)
        accent:    rgb("var(--accent)"),
        "accent-2": rgb("var(--accent-2)"),

        // status — identical across all hubs
        success:   rgb("var(--status-success)"),
        warning:   rgb("var(--status-warning)"),
        danger:    rgb("var(--status-danger)"),
        info:      rgb("var(--status-info)"),
      },
      backgroundImage: {
        "brand-gradient": "var(--brand-gradient)",
      },
      borderRadius: {
        sm: "6px", DEFAULT: "10px", lg: "16px", xl: "24px", pill: "999px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--accent) / 0.3), 0 8px 32px rgb(var(--accent) / 0.18)",
        elev: "0 12px 28px -8px rgb(var(--brand-navy) / 0.55)",
      },
    },
  },
};
