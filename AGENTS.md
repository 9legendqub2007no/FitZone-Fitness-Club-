<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes for each content page and keep the shared header, footer, and in-memory demo cart in the root SiteProvider so navigation preserves the current bag.
- Store illustrative product/program data in the shared browser-safe fitness data module so pages and cart use a consistent catalog.
- Keep visual tokens and reusable layout styles in src/styles.css and use the existing UI Button/Dialog controls for accessible interactions.
- This is an explicitly frontend-only demo: do not simulate successful payments, message delivery, or bookings; state missing integrations at the action point.
