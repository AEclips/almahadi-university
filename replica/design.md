# Design System Specification: DIU Replica
Generated: 2026-11-07
Status: Designed

## 1. Brand Tokens & Color Palette
* **Primary Brand Green:**
  * Base: `#1b7340` (DIU deep institutional green)
  * Dark / Hover: `#145a32`
  * Light / Tint: `#e8f5e9`
* **Secondary Brand Navy / Accent:**
  * Base: `#0f2b48` (DIU formal navy)
  * Hover: `#081a2e`
* **Accent Gold / Highlight:**
  * Base: `#f4a100` (Notice badges, highlight banners, CTAs)
  * Hover: `#d98e00`
* **Neutrals & Surfaces:**
  * Background: `#f8fafc` (Slate 50)
  * Card Surface: `#ffffff`
  * Text Primary: `#0f172a` (Slate 900)
  * Text Secondary: `#475569` (Slate 600)
  * Border / Divider: `#e2e8f0` (Slate 200)

## 2. Typography
* **Primary Font Family:** Inter, system-ui, -apple-system, sans-serif
* **Heading Font Family:** Outfit or Plus Jakarta Sans (Clean, modern academic aesthetic)
* **Scale:**
  * Display (Hero): `2.75rem` / `3.25rem` (44px/52px), weight: 800
  * Heading 1 (Section titles): `2rem` / `2.5rem` (32px/40px), weight: 700
  * Heading 2 (Card titles): `1.375rem` / `1.75rem` (22px/28px), weight: 600
  * Body Standard: `1rem` / `1.5rem` (16px/24px), weight: 400
  * Small / Badges: `0.8125rem` / `1.125rem` (13px/18px), weight: 500

## 3. Elevation & Radii
* **Border Radii:**
  * Badges & Buttons: `rounded-lg` (8px) or `rounded-full`
  * Cards & Containers: `rounded-xl` (12px)
  * Modals & Dialogs: `rounded-2xl` (16px)
* **Shadows:**
  * Card Standard: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`
  * Card Hover / Floating: `0 10px 25px -5px rgba(27,115,64,0.1), 0 8px 10px -6px rgba(0,0,0,0.04)`

## 4. Component Specs
* **Top Utility Bar:** Slim dark bar (`#0f2b48`) with hotline, student ERP link, and quick social links.
* **Main Header:** Sticky white surface with logo, mega-menu dropdowns, and high-visibility "Apply Now" button (`#1b7340` with hover transition).
* **Stat Cards:** Clean white card with green accent left-border, bold numerical counter, and micro-label.
* **Notice Item:** Compact card displaying day/month calendar badge on left, bold title, category tag, and download action icon.
