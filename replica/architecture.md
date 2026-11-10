# Architecture & System Design: DIU Replica
Generated: 2026-11-07
Status: Architected

## 1. Selected Tech Stack
* **Frontend:** Next.js 15 (App Router), React 19, TypeScript
* **Styling:** Tailwind CSS v4, Lucide Icons, Framer Motion (for smooth micro-interactions)
* **Backend / API:** Next.js Server Actions & Route Handlers (`/api/*`)
* **Database & ORM:** PostgreSQL (Neon / Supabase compatible) with Prisma ORM or Drizzle
* **Validation:** Zod schemas for application submissions

## 2. Relational Database Schema (SQL)

```sql
-- Programs & Departments
CREATE TABLE departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    faculty_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE programs (
    id VARCHAR(36) PRIMARY KEY,
    department_id VARCHAR(36) REFERENCES departments(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL, -- 'Undergraduate', 'Graduate'
    duration_semesters INT NOT NULL DEFAULT 8,
    total_credits INT NOT NULL DEFAULT 140,
    estimated_tuition NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notices & Announcements
CREATE TABLE notices (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Academic', 'Exam', 'Financial', 'General'
    body TEXT,
    pdf_attachment_url VARCHAR(500),
    is_pinned BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Inquiries & Applications
CREATE TABLE applications (
    id VARCHAR(36) PRIMARY KEY,
    program_id VARCHAR(36) REFERENCES programs(id),
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    ssc_gpa NUMERIC(3, 2) NOT NULL,
    hsc_gpa NUMERIC(3, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'submitted', -- 'submitted', 'reviewing', 'accepted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. Core API Endpoints
* `GET /api/programs?level=undergraduate` - Fetch program list with tuition details
* `GET /api/notices?category=Academic&page=1` - Paginated notice board feed
* `POST /api/admission/apply` - Submit new admission application form
* `POST /api/admission/calculate-waiver` - Calculate scholarship waiver based on SSC & HSC GPA

## 4. Build Sequence & Thin Vertical Slice
1. **Slice 1 (The Shell):** Global responsive navbar (with top utility bar & mega-menu) and comprehensive footer.
2. **Slice 2 (The Core Flow):** Interactive Landing Page (Hero banner, dynamic stats ticker, notice board preview, and admission CTA).
3. **Slice 3 (Academic & Admission Slice):** Programs explorer page + interactive GPA waiver calculator with online application modal.
