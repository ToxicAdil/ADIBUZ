# Adibuz Website Performance Audit

Date: 2026-06-07

## Scope

Audited the React/Vite website for low-configuration device performance, smooth scrolling, route load behavior, animation cost, canvas/video behavior, and production bundle output. The goal was to improve real-world and Lighthouse-oriented performance without changing the UI design or removing animations.

## Key Findings

### Home Page

- The home page already used route-level code splitting and lazy imports for several heavy components.
- Several lazy components were still rendered immediately during the first home render, which means their chunks could be requested before the user reached them.
- The `GlobalGrowthSection` was imported directly into the main home bundle even though it appears far below the fold.
- Service showcase videos already used intersection-based loading, which is good for mobile and low-end devices.
- The hero Three.js globe is deferred and disabled on mobile, which protects mobile Lighthouse performance.
- The previous CSS globe fallback flash was already removed, preventing the short-lived blurry circle on reload.

### About Page

- The route is lazy-loaded, but lower sections mounted immediately after the hero.
- Team/process sections include multiple animated cards and images, so delaying their mount reduces initial route work.
- The About hero image is local and eagerly loaded, which is appropriate because it is above the fold.

### Canvas And Animation

- `InteractiveGlobe` used IntersectionObserver visibility checks, but it still scheduled animation frames while off-screen.
- Motion animations generally use viewport triggers and respect reduced-motion in shared animation helpers.
- Infinite decorative animations remain present as requested, but the heaviest lower-page sections are now delayed until near viewport.

### Assets And Bundle

- Production build succeeds.
- Main app chunk after optimization: `assets/index-CfoAoZLZ.js` at about `159.72 kB`.
- `GlobalGrowthSection` is now split into its own chunk: about `10.45 kB`.
- Three.js remains isolated in a vendor chunk and is not used on mobile hero render.

## Optimizations Implemented

### 1. Viewport-Gated Rendering

Added `src/components/DeferredRender.tsx`.

This component reserves layout height and only mounts children when the section is close to the viewport. It reduces first-render DOM work, prevents early chunk loading, and keeps normal animations intact once sections mount.

Applied to:

- Home logo cloud
- Home interactive services block
- Home testimonial carousel
- Home global growth section
- Home about/work showcase
- Home insights preview
- Home about preview card
- Home FAQ section
- Home footer
- About impact statement
- About team
- About process
- About who-we-work-with

### 2. Deferred Global Growth Chunk

Changed `GlobalGrowthSection` from a direct import to a lazy chunk. This keeps its canvas globe and modal-related work out of the initial home bundle.

### 3. Off-Screen Canvas Pause

Updated `InteractiveGlobe` so it cancels its `requestAnimationFrame` loop when off-screen and restarts cleanly when visible again. This reduces idle CPU usage on low-end devices without changing its visual behavior.

### 4. Preserved Existing UI And Animations

No animation, section design, routing behavior, card layout, or visual content was removed. Changes are focused on when work starts, not what appears.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- Browser check confirmed:
  - Home hero renders normally.
  - Below-the-fold sections are absent from the initial DOM.
  - Deferred sections mount after scrolling.
  - About hero renders immediately.
  - About lower sections are deferred.
  - No console errors were reported during checks.

## Lighthouse Note

The local `lighthouse` CLI was not installed, so a numeric Lighthouse report was not generated in this pass. The changes target the same areas Lighthouse penalizes most on mobile:

- Less initial JavaScript execution.
- Less initial DOM work.
- Less off-screen animation work.
- Better chunk splitting for below-the-fold sections.
- Reduced startup CSS from the removed globe fallback.

## Remaining Safe Follow-Ups

- Add Lighthouse CI or a local Lighthouse npm script for repeatable mobile/desktop score tracking.
- Convert large PNG screenshots to WebP or AVIF if image tooling is added.
- Consider self-hosting critical remote Unsplash images for Work/About route stability.
- Add route-specific prefetch only on link hover or idle time, not on initial load.
