---
name: Nebula / Lumina
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#282a2e'
  surface-container-highest: '#323539'
  on-surface: '#e1e2e7'
  on-surface-variant: '#c4c7ca'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#8e9194'
  outline-variant: '#44474a'
  surface-tint: '#c1c7ce'
  primary: '#ffffff'
  on-primary: '#2b3136'
  primary-container: '#dde3ea'
  on-primary-container: '#5f656b'
  inverse-primary: '#595f65'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  secondary-fixed-dim: '#adc6ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  background: '#05070a'
  on-background: '#e1e2e7'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  mono-code:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max-width: 1440px
---

## Brand & Style
The design system embodies a premium, futuristic infrastructure management experience. The personality is "Nebula/Lumina"—a blend of deep-space atmosphere with high-tech, luminous glass elements.

The aesthetic is defined by **Glassmorphism** with `backdrop-filter: blur(20px)`, ultra-thin white borders (`rgba(255,255,255,0.1)`), and atmospheric background orbs. The goal is to make server orchestration feel like navigating a high-end starship cockpit: calm, authoritative, and sophisticated.

## Colors
The palette uses a deep charcoal (`#111417`) with a pure white primary and a striking blue accent (`#0566d9`). 
- **Primary:** Pure white (`#ffffff`) for headings and key text.
- **Secondary Container (Blue):** `#0566d9` — used for active nav items, buttons, and accent glows.
- **Secondary Fixed Dim:** `#adc6ff` — used for subtle highlights and status text.
- **Surface Strategy:** Background is near-black (`#05070a`). Surface hierarchy ranges from `#0c0e12` (lowest) to `#323539` (highest).
- **Semantic Colors:** Success (Emerald `#10b981`), Warning (Amber `#f59e0b`), Error (Red `#ef4444`) with glow effects (`box-shadow: 0 0 10px`).
- **Glass:** Cards use `rgba(255,255,255,0.03)` with `backdrop-filter: blur(20px)` and `border: 1px solid rgba(255,255,255,0.1)`.

## Typography
- **Display:** Geist, 64px, bold, tight letter spacing for large page titles.
- **Headlines:** Inter, 40px/32px/24px, semi-bold with negative letter spacing.
- **Body:** Inter, 16px, regular weight.
- **Labels:** Geist, 14px/12px, medium weight, uppercase tracking for metadata.
- **Code:** JetBrains Mono for technical output.

## Layout & Spacing
- **Sidebar:** Fixed 256px glass sidebar with rounded corners (`rounded-xl`), detached from the main viewport with `m-3` margin.
- **Top Nav:** Fixed glass header with `padding-left: calc(16rem + 2rem)` to clear the sidebar.
- **Content:** Pushed right by `ml-72` (sidebar width + margin), using `px-8` horizontal padding.
- **Grid:** Main dashboard uses a 3-column bento grid for health gauges, with a 3-column bottom row for services, network, and nodes.
- **Spacing:** Section spacing uses `gap-6` / `space-y-8`. Card padding is `p-6`.

## Elevation & Depth
This design system uses **Glassmorphism** with atmospheric glow orbs behind the viewport.

- **Glass Cards:** `background: rgba(255,255,255,0.03)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.1)`. Cards lift on hover to `border-color: rgba(255,255,255,0.2)`.
- **Glass Sidebar:** `background: rgba(17,20,23,0.4)` + `backdrop-filter: blur(40px)`. Floating sidebar with `box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3)`.
- **Glass Header:** `background: rgba(17,20,23,0.6)` + `backdrop-filter: blur(20px)`.
- **Background Orbs:** Two large blur-radial gradients positioned in the background (`bg-orb-primary` at top-left, `bg-orb-tertiary` at right-center).
- **Glows:** Active nav items get `box-shadow: 0 0 15px rgba(5,102,217,0.3)`. Status dots use `box-shadow: 0 0 10px` in their semantic color.

## Shapes
- **Cards:** `rounded-2xl` (16px) for dashboard health gauges and bento grid items.
- **Sidebar:** `rounded-xl` (12px) with floating detached appearance.
- **Buttons:** `rounded-lg` (8px) for standard buttons, `rounded-full` for icon buttons.
- **Input:** `rounded-full` for the search bar.
- **Status indicators:** Small dots (`w-2 h-2 rounded-full`) with glow shadows.

## Components
- **Sidebar:** Glass floating sidebar (`glass-sidebar` class). Rocket icon in a `bg-secondary-container` box with blue glow. Active nav item uses `bg-secondary-container` with `text-on-secondary-container`. Inactive items use `text-on-surface-variant` with `hover:bg-white/10`.
- **Header:** Glass top navbar with search input (rounded-full, `bg-white/5`), notification/settings icon buttons, and avatar with dropdown.
- **Cards:** `glass-card` class with hover lift and blue glow orb in the bottom-right corner.
- **Health Gauges:** Large bold value (text-3xl) with label + thin progress bar (`h-1.5`) with `shadow-[0_0_8px_rgba(5,102,217,0.5)]` on the filled portion.
- **Progress Bars:** Color-coded: `bg-secondary-container` (<60%), `bg-yellow-400` (<85%), `bg-error` (>=85%).
- **Status Dots:** `glow-dot-success` (emerald), `glow-dot-error` (red), `glow-dot-warning` (amber), `glow-dot-blue` (blue accent).

## Libraries
- **ICONS** lucide-react
- **ANIMATION** framer-motion
- **TABLE/LIST** tanstack table

## Architecture Decisions

### Component Structure
- **Every page must be composed of small, focused components** — never put everything in a single large file.
- Each component lives in its own file under `components/<domain>/`.
- Shared layout pieces (sidebar, header, etc.) go in `components/layout/`.
- Domain-specific UI (stat cards, activity items, etc.) go in `components/<domain>/`.
- Page files in `app/` should only orchestrate components and data — rendering logic stays in components.

### UI Library
- **Do NOT use shadcn/ui.** We use plain Tailwind CSS v4 with custom design tokens defined in `globals.css`.
- The design tokens follow the "Celestial Control" palette defined above in this file.
- All custom colors are available as Tailwind classes (e.g. `bg-surface`, `text-primary`, `border-outline-variant`).

### Animations
- **All components must use framer-motion** for animations — no CSS transitions for layout changes or entrance effects.
- The sidebar uses framer-motion `motion.aside` with `variants` for expand/collapse width animation and a custom easing curve for a smooth feel.
- Page content uses staggered entrance animations: items fade + slide up with increasing `delay` values (e.g. `0.08 * index`) so elements enter one after another.
- Interactive elements (buttons, links, cards) use `whileHover` and `whileTap` for micro-interactions like scale or lift.
- The header title animates on route change via a `key` prop to trigger re-render.
- The `AuthGuard` fades in the content once authentication is verified.