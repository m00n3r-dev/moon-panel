---
name: Celestial Control
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c1c7d3'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8b919d'
  outline-variant: '#414751'
  surface-tint: '#a4c9ff'
  primary: '#a4c9ff'
  on-primary: '#00315d'
  primary-container: '#60a5fa'
  on-primary-container: '#003a6b'
  inverse-primary: '#0060ac'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#2fd9f4'
  on-tertiary: '#00363e'
  tertiary-container: '#00b2ca'
  on-tertiary-container: '#003f48'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#a2eeff'
  tertiary-fixed-dim: '#2fd9f4'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e5a'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
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
The design system embodies a premium, futuristic server management experience. It is built for developers and infrastructure engineers who value precision and aesthetic excellence. The personality is "Astro-Modern"—a blend of deep-space serenity and high-performance technology.

The aesthetic leans heavily into **Glassmorphism** and **2026 SaaS trends**, utilizing multi-layered translucency, ultra-fine borders, and rhythmic micro-interactions. The goal is to make server orchestration feel like navigating a high-end cockpit: calm, authoritative, and sophisticated. Every interface element is designed to minimize cognitive load while maximizing the sense of high-end quality and uptime reliability.

## Colors
The palette is rooted in the "Deep Space" spectrum. 
- **Primary (Moonlight Blue):** Used for primary actions, active states, and high-visibility status indicators.
- **Secondary (Cosmic Purple):** Used for specialized features, AI-driven insights, and secondary brand accents.
- **Tertiary (Soft Cyan):** Reserved for technical metrics, "safe" status updates, and interactive hints.
- **Surface Strategy:** Backgrounds utilize a hierarchy of navy shades to create depth without relying on pure black. The primary background is `#050816`, while cards and panels use `#0B1020` with a subtle 1px border.
- **Semantic Colors:** Success (Cyan), Warning (Amber), and Error (Crimson) are desaturated and glow-enhanced to fit the dark aesthetic.

## Typography
The typography system prioritizes technical clarity and modern "Geist" aesthetics. 
- **Display and Headlines:** Use **Geist** for its tight tracking and technical, developer-centric feel. Large titles should use negative letter spacing to achieve a "Linear-style" high-end appearance.
- **Body Text:** **Inter** is the workhorse for all prose and configuration descriptions, ensuring high legibility against dark backgrounds.
- **Code:** **JetBrains Mono** is utilized for server logs, terminal outputs, and IP addresses to maintain the technical utility of the platform.
- **Hierarchy:** Use variable font weights to distinguish between labels and values rather than relying solely on size or color.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a heavy emphasis on "Safe Zones" and negative space to prevent the technical density from feeling overwhelming.

- **Grid:** A 12-column grid system is used for the main dashboard. Sidebar navigation is fixed at 240px, while the content area expands.
- **Rhythm:** Spacing follows a 4px base unit. Component internal padding should default to 16px (4 units) or 24px (6 units) for a spacious, premium feel.
- **Mobile Adaptivity:** On mobile, columns collapse to a single stack. Horizontal scrolling is permitted only for wide data tables. Padding is reduced to 16px to maximize screen real estate for charts.

## Elevation & Depth
This design system rejects traditional heavy shadows in favor of **Tonal Layering** and **Luminescence**.

- **Glassmorphism:** Primary containers use a 12px backdrop-blur with a semi-transparent surface (`rgba(11, 16, 32, 0.6)`).
- **Borders:** Depth is defined by 1px solid borders. Use a subtle gradient border (Top-Left to Bottom-Right) transitioning from `#ffffff1a` to `#ffffff05` to simulate a light source from above.
- **Glows:** High-priority elements (Active Servers, Critical Alerts) use a "Soft Ambient Glow"—a drop shadow with a large blur (20-40px) and very low opacity (15%) using the primary or tertiary color hex.

## Shapes
The shape language is "Squircle-Adjacent"—rounded enough to feel modern and friendly, but sharp enough to feel like a professional tool. 

- **Standard Elements:** Buttons and input fields use a `0.5rem` radius. 
- **Large Containers:** Dashboard cards and modals use `1rem` (rounded-lg) to soften the layout.
- **Status Indicators:** Use fully pill-shaped (rounded-full) geometry for tags and status chips to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons feature a subtle "Moonlight" gradient. Secondary buttons are "Ghost" style with a 1px border that brightens on hover.
- **Input Fields:** Backgrounds are slightly darker than the surface they sit on. The focus state is a Soft Cyan border with a 2px outer glow.
- **Cards:** Must feature the standard backdrop-blur. Headers within cards should have a subtle separator line with 10% opacity.
- **Server Chips:** Use a pulsing 8px dot to indicate live status. The color of the dot corresponds to the health of the node (Cyan = Good, Amber = Loaded, Crimson = Down).
- **Data Visualizations:** Charts should use primary and tertiary colors with area gradients that fade to transparent. Grid lines in charts should be kept to a minimum (maximum 3-4 horizontal lines) to maintain cleanliness.
- **Progress Bars:** Thin (4px) with a glowing leading edge to signify "active energy" or data transfer.

## Libraries 
- **UI LIB** always use shadcn components
- **ICONS** lucide icons
- **TABLE/LIST** tanstack table