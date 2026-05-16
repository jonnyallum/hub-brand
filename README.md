# @jonnyai/hub-brand

Shared brand system for the **HubSuite** family:

- Compliance Hub
- Care Hub
- FM Control Hub
- HubSuite landing site

One source of truth for tokens, logos, gradients, the theme switcher, and the per-product accent palette. Consumed as a git submodule mounted at `/brand`.

---

## Contents

```
tokens/tokens.json        # source-of-truth design tokens
css/base.css              # shared :root + [data-theme="dark"|"light"]
css/<product>.css         # per-product --accent overrides (compliance/care/fm/suite)
tailwind.preset.cjs       # Tailwind preset consumers extend
logos/*.svg               # static SVG logos (favicons, og:image, marketing pages)
logos/hero/*.svg          # HubSuite landing hero art
react/HubLogo.tsx         # <HubLogo product="..." variant="mark|wordmark|lockup" />
react/HubBadge.tsx        # Hex-card showcase used on the HubSuite landing
react/ThemeToggle.tsx     # localStorage + data-theme + prefers-color-scheme
react/bootScript.ts       # inline boot string for layout.tsx (prevents FOUC)
```

---

## Integration (Next.js / Tailwind 3)

1. **Add submodule:**

   ```bash
   git submodule add https://github.com/jonnyallum/hub-brand.git brand
   ```

2. **Wire Tailwind** — `tailwind.config.ts`:

   ```ts
   const preset = require("./brand/tailwind.preset.cjs");
   export default { presets: [preset], content: ["./src/**/*.{ts,tsx}"] };
   ```

3. **Import tokens** — `src/app/globals.css`:

   ```css
   @import "../../brand/css/base.css";
   @import "../../brand/css/fm.css";   /* or compliance.css / care.css / suite.css */

   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Drop the boot script** — `src/app/layout.tsx`:

   ```tsx
   import { themeBootScript } from "@/brand/react";
   // inside <head>:
   <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
   ```

5. **Use the components:**

   ```tsx
   import { HubLogo, ThemeToggle } from "@/brand/react";
   <HubLogo product="fm" variant="lockup" size={40} />
   <ThemeToggle />
   ```

---

## Theming model

- **Dark default**, light toggle, system-aware (`prefers-color-scheme`).
- `[data-theme="dark"]` or `[data-theme="light"]` on `<html>`.
- Tailwind: `dark:` works (via `darkMode: ["class", "[data-theme='dark']"]` in the preset).
- All color tokens are RGB triplets (no `#`), so `bg-accent/40` opacity utilities work.

---

## Per-product accents

| Product   | Dark         | Light       | Motif         |
|-----------|--------------|-------------|---------------|
| compliance| `91 141 239` | `28 96 168` | shield + lock |
| care      | `49 198 169` | `15 145 130`| hands + heart |
| fm        | `94 200 110` | `48 142 70` | building + gear (+ violet secondary) |
| suite     | full gradient| full gradient | the H |

Everything else (base canvas, status, gradient, typography, radii) is shared.

---

## Updating

This is a submodule. To pull updates in a consumer:

```bash
git submodule update --remote brand
git add brand
git commit -m "brand: bump hub-brand to <tag>"
```

Tag versions in this repo follow semver (`v0.1.0` is the initial cut).
