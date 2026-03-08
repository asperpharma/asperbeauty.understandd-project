

## Diagnosis

The screenshot confirms **all Tailwind CSS styles are missing** — the site renders as raw, unstyled HTML. The root cause:

1. The `postcss.config.js` file was recently created but the Vite dev server did not restart to pick it up. PostCSS config changes require a server restart, which Lovable's preview doesn't always trigger automatically for new config files.

2. Everything else is correctly wired: `@tailwind base/components/utilities` in `index.css`, `tailwindcss` + `postcss` in devDependencies, `tailwind.config.ts` exists, and `main.tsx` imports `index.css`.

## Plan

**Force a rebuild** by making a trivial, harmless edit to `src/index.css` (add a comment at the end). This will trigger Vite to re-process the CSS pipeline with the now-present `postcss.config.js`, restoring all Tailwind styles.

### Steps

1. **Add a trailing comment to `src/index.css`** — e.g. `/* rebuild trigger */` at line 895. This forces Vite's CSS pipeline to re-run.

2. **Verify** — Take a screenshot after the rebuild to confirm styles are restored (header with ivory background, maroon text, proper grid layouts, brand logos, etc.).

3. **If styles are still missing** — The `postcss.config.js` may need to be re-saved (delete and recreate) or the `tailwind.config.ts` may need a minor touch to force a full config reload.

This is a zero-risk, single-line change that should immediately restore the entire site appearance.

