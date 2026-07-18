## Goal

Add a small recognition banner, a permanent feedback invitation at the bottom of the results page, a plain external link to the Google Form (new tab), and a short "About the creator" section on Credits. No modal, no iframe, no auto-popup, no game/audio/data changes.

## Copy constants (used in multiple places)

- **Form URL:** `https://docs.google.com/forms/d/e/1FAIpQLScBqDxhrzRnuyhLa3U2I1k7W3IOHQ5MyA0tu-WTgHURT_ZAyA/viewform`
- **LinkedIn URL:** `https://www.linkedin.com/in/eunice-rigo`
- **Substack URL:** not rendered until the user provides a real one (placeholder is omitted, not shipped).
- **Recognition line:** "Blue Paradigm won the Pacific category of the 2025 Pacific Data Visualisation Challenge."

Every "Share your experience" action is a plain `<a href={FORM_URL} target="_blank" rel="noopener noreferrer">` — no modal, no iframe, no JS handler.

## Files to add

1. **`src/components/RecognitionBanner.tsx`** — new
   - In-flow, compact strip (never fixed/absolute), uses existing tokens (`bg-card`, `text-foreground`, `border-border`).
   - Content: recognition line + short "I would love to hear what you experienced." + "Share your experience" link (opens form in new tab) + small `X` dismiss button.
   - Dismissal persisted in `sessionStorage` under `blueParadigmBannerDismissed`.
   - Renders `null` when dismissed. Layout stacks on mobile (flex-col at `sm:`).

## Files to edit (additive only)

2. **`src/pages/LandingPage.tsx`** — render `<RecognitionBanner />` at the very top of the returned tree, above existing landing content. No other changes.

3. **`src/pages/CreditsPage.tsx`**
   - Render `<RecognitionBanner />` at the top of the page container (above the existing header block).
   - Append a new "About the creator" section immediately before the "RESTART THE JOURNEY" button, containing: creator intro paragraph, the recognition line, and three actions rendered as plain links —
     - "Share your experience" → form URL (new tab)
     - "Connect on LinkedIn" → LinkedIn URL (new tab)
     - Substack link is intentionally omitted until a real URL is supplied.
   - No existing credits, sources, or acknowledgements are altered.

4. **`src/components/ResultScreen.tsx`**
   - Append a permanent invitation block at the bottom (after the existing "Play Again" / "See A Future Scenario" section) with:
     - Short heading ("Share your experience"),
     - One-sentence invitation,
     - Prominent "Share your experience" link → form URL (new tab).
   - No `IntersectionObserver`, no timers, no modal, no auto-open.
   - Nothing above this block is changed.

5. **Active game pages (`src/pages/Index.tsx`, `Scenario1.tsx`, `Scenario2.tsx`, `Scenario3.tsx`)** — **no changes**. The banner is intentionally not added there to avoid altering viewport height, moving controls, or affecting the game layout.

## Behavior guarantees

- No new dependencies, no context/provider, no `App.tsx` changes.
- All "Share your experience" affordances are `<a target="_blank" rel="noopener noreferrer">` — nothing intercepts the click.
- Banner is in-flow and dismissible per session; returns next session.
- No changes to routing, game state, scoring, audio, sessionStorage game keys, charts, or scenario visuals.

## Out of scope

Game logic, scoring, `answers.json`, audio components/context, routes, existing Credits content, charts, scenario visuals, any form embedding, any auto-open behavior.

## Verification

Build check plus click-through: banner appears on `/` and `/credits` and dismisses per session; "Share your experience" opens the Google Form in a new tab from banner, results footer, and Credits section; results page shows the permanent invitation at the bottom with no popup; scenarios 1/2/3 and `/game` render unchanged.
