# Replica Recon Map: Daffodil International University (DIU)
Target: https://daffodilvarsity.edu.bd
Analyzed Date: 2026-11-07
Framework: Next.js App Router (React)

## 1. Executive Summary & Tech Stack Inferred
* **Tech Stack:** Next.js (App Router), React, Tailwind CSS / Styled Utility Components, Webpack/Turbopack chunking.
* **Core Function:** University portal providing admission workflows, academic department portals, faculty profiles, notices/news, campus life, and student portal navigation (ERP / Student Portal redirects).

## 2. Screen Inventory (Key Screens)
* **S01: Landing / Homepage** (`/`)
  * Hero slider with campus banner and admission notice CTA
  * Fast stats counter (Faculties, Students, Campus Area, International rankings)
  * Faculty & Academic Program Directory (`/faculties`)
  * News, Events & Notice Board widget
  * Research, Accreditation & International Partners ticker
  * Footer with campus contact, hotline & social feeds
* **S02: Faculty & Programs Explorer** (`/faculties`, `/department/*`)
  * Department listings filterable by Undergraduate / Graduate
  * Faculty profile cards with bio, research citations, and email
* **S03: Online Admission Portal** (`/admission`)
  * Admission eligibility calculator
  * Online application submission flow (multi-step form)
  * Tuition fee breakdown table
* **S04: Notice & News Feed** (`/notice`, `/news`)
  * Category tabs (Academic, Examination, Financial, General)
  * Search & PDF attachment viewer

## 3. Core User Flows
1. **Prospective Student Flow:** Home -> View Program Details -> Check Tuition/Eligibility -> Start Online Admission Application.
2. **Current Student Flow:** Home -> Check Latest Exam/Semester Notices -> Quick Jump to Student Portal / ERP.
3. **Faculty / Visitor Flow:** Home -> Browse Department -> Find Faculty Member Contact & Research.

## 4. Key UI Components
* **Navbar:** Multi-tier top bar (Quick links, Hotline, Student Portal button) + Main Navigation with Mega Menu.
* **Hero Banner:** Responsive carousel with headline overlays.
* **Program Filter Grid:** Dynamic tabs (Undergraduate, Graduate, Short Courses).
* **Notice Board Accordion/List:** Chronological items with date badge and download/view action.
* **Global Footer:** Accreditation badges, contact info, interactive campus map link.
