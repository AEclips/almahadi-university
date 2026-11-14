"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  GraduationCap,
  Cpu,
  Building2,
  Award,
  Users,
  Bus,
  BookOpen,
} from "lucide-react";
import { NativeDialog } from "./NativeDialog";

type SearchCategory =
  | "All"
  | "Programs"
  | "Faculty & Research"
  | "Campus & Shuttles"
  | "Admissions & Waivers";

interface SearchEntry {
  id: string;
  title: string;
  category: Exclude<SearchCategory, "All">;
  subtitle: string;
  badge: string;
  href: string;
  keywords: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  {
    id: "prog-cse",
    title: "B.Sc. in Computer Science & Engineering (CSE)",
    category: "Programs",
    subtitle: "4 Years • 148 Credits • AI & Distributed Systems Track",
    badge: "FSIT Degree",
    href: "/#academics",
    keywords: "cse computer science engineering ai neural networks algorithms software",
  },
  {
    id: "prog-swe",
    title: "B.Sc. in Software Engineering (SWE)",
    category: "Programs",
    subtitle: "4 Years • 140 Credits • Cloud Architecture & DevOps",
    badge: "FSIT Degree",
    href: "/#academics",
    keywords: "swe software engineering cloud microservices devops",
  },
  {
    id: "prog-aids",
    title: "B.Sc. in Artificial Intelligence & Data Science",
    category: "Programs",
    subtitle: "4 Years • 142 Credits • Deep Learning & Generative AI",
    badge: "Priority Cohort",
    href: "/#academics",
    keywords: "ai data science machine learning llm generative deep learning",
  },
  {
    id: "prog-robo",
    title: "B.Sc. in Robotics & Mechatronics Engineering",
    category: "Programs",
    subtitle: "4 Years • 146 Credits • Autonomous Drones & Humanoids",
    badge: "SER Degree",
    href: "/#academics",
    keywords: "robotics mechatronics autonomous drone embedded ros2",
  },
  {
    id: "prog-eee",
    title: "B.Sc. in Electrical & Electronic Engineering (EEE)",
    category: "Programs",
    subtitle: "4 Years • 144 Credits • VLSI, IoT & Renewable Energy",
    badge: "SER Degree",
    href: "/#academics",
    keywords: "eee electrical electronic vlsi iot circuit semiconductor",
  },
  {
    id: "prog-civil",
    title: "B.Sc. in Civil & Smart Infrastructure",
    category: "Programs",
    subtitle: "4 Years • 150 Credits • Sustainable Earthquake Design",
    badge: "SER Degree",
    href: "/#academics",
    keywords: "civil structural architecture smart city construction",
  },
  {
    id: "prog-bba",
    title: "Bachelor of Business Administration (BBA)",
    category: "Programs",
    subtitle: "4 Years • 126 Credits • FinTech, Global Trade & Supply",
    badge: "FBE Degree",
    href: "/#academics",
    keywords: "bba business finance fintech economics management",
  },
  {
    id: "prog-venture",
    title: "B.Sc. in Tech Entrepreneurship & E-Commerce",
    category: "Programs",
    subtitle: "4 Years • 130 Credits • Venture Incubation & Seed Grants",
    badge: "100% Seed Grant",
    href: "/#academics",
    keywords: "entrepreneurship startup e-commerce venture capital founder",
  },
  {
    id: "fac-archive",
    title: "Faculty Directory, 1-on-1 Office Hours & IEEE/NeurIPS Archive",
    category: "Faculty & Research",
    subtitle: "Book direct mentorship slots or browse peer-reviewed research papers",
    badge: "Research Hub",
    href: "/faculty",
    keywords: "professor faculty mentorship office hours research paper bibtex ieee neurips dr mahadi",
  },
  {
    id: "alumni-dir",
    title: "Distinguished Alumni Network & Hiring Referrals",
    category: "Faculty & Research",
    subtitle: "Connect with AMIU graduates at Google DeepMind, NVIDIA & Microsoft",
    badge: "Alumni Portal",
    href: "/alumni",
    keywords: "alumni placement deepmind nvidia microsoft referral career mentoring",
  },
  {
    id: "campus-labs",
    title: "NVIDIA Supercomputing Lab & 150-Acre Smart Green Campus",
    category: "Campus & Shuttles",
    subtitle: "128 H100/A100 GPU clusters, Eco-Lake Amphitheater & Olympic Pool",
    badge: "Facilities",
    href: "/campus",
    keywords: "campus nvidia gpu supercomputing lab amphitheater library aquatic sports hostel",
  },
  {
    id: "campus-shuttle",
    title: "Live Dhaka–Ashulia Campus Shuttle Tracker & Seat Pass",
    category: "Campus & Shuttles",
    subtitle: "Real-time EV & AC coach arrivals for Dhanmondi, Uttara, Mirpur & Narayanganj",
    badge: "Live Transit",
    href: "/campus#shuttle",
    keywords: "shuttle bus route dhaka ashulia uttara dhanmondi mirpur transport eta",
  },
  {
    id: "adm-apply",
    title: "Spring 2026 Online Admission Application Portal",
    category: "Admissions & Waivers",
    subtitle: "Apply directly with SSC & HSC GPA and get an instant Tracking ID",
    badge: "Admissions Open",
    href: "/apply",
    keywords: "apply admission spring 2026 form undergraduate graduate eligibility",
  },
  {
    id: "adm-waiver",
    title: "Tuition Fee Waiver & Merit Scholarship Calculator",
    category: "Admissions & Waivers",
    subtitle: "Calculate instant 15%–75% merit waivers based on SSC & HSC GPA",
    badge: "Up to 100% Waiver",
    href: "/#calculator",
    keywords: "tuition fee waiver scholarship calculator gpa golden 5 cost financial aid",
  },
  {
    id: "adm-erp",
    title: "AMIU Student Smart ERP Portal (Courses, Grades & Fee Payment)",
    category: "Admissions & Waivers",
    subtitle: "Manage Spring 2026 Add/Drop, CGPA transcript & bKash/Card payments",
    badge: "Student ERP",
    href: "/portal",
    keywords: "student portal erp login cgpa admit card grade sheet course add drop bkash",
  },
  {
    id: "adm-notices",
    title: "Official University Notice Board & Exam Circulars",
    category: "Admissions & Waivers",
    subtitle: "Exam schedules, registration dates, convocation & PDF circulars",
    badge: "Notices",
    href: "/#notice",
    keywords: "notice circular exam schedule convocation registration pdf registrar",
  },
];

const CATEGORIES: SearchCategory[] = [
  "All",
  "Programs",
  "Faculty & Research",
  "Campus & Shuttles",
  "Admissions & Waivers",
];

function getCategoryIcon(cat: Exclude<SearchCategory, "All">) {
  switch (cat) {
    case "Programs":
      return GraduationCap;
    case "Faculty & Research":
      return BookOpen;
    case "Campus & Shuttles":
      return Bus;
    case "Admissions & Waivers":
      return Award;
  }
}

export function GlobalSearch({ variant = "header" }: { variant?: "header" | "utility" }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_INDEX.filter((item) => {
      const catOk = category === "All" || item.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {variant === "header" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open global university search"
          className="hidden md:flex items-center justify-between gap-3 w-56 lg:w-72 px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/60 text-left text-xs text-slate-300 transition shadow-inner group"
        >
          <span className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="truncate text-slate-300 group-hover:text-white transition">
              Search programs, faculty, notices...
            </span>
          </span>
          <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900/90 border border-white/15 text-slate-300 flex-shrink-0">
            Ctrl K
          </kbd>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Search AMIU portal"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-[11px] font-semibold text-slate-200 hover:text-amber-300 transition"
        >
          <Search className="w-3 h-3 text-amber-400" />
          <span>Search AMIU</span>
          <kbd className="hidden sm:inline text-[9px] font-mono text-slate-400 bg-slate-950/70 px-1.5 py-0.5 rounded border border-white/10">
            Ctrl K
          </kbd>
        </button>
      )}

      <NativeDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titleId="global-search-title"
        title="Search Al Mahadi International University"
        maxWidthClass="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-3.5" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search degree programs, faculty, research, shuttles, scholarships, notices..."
              aria-label="Search university degrees, faculty, research, shuttles, and notices"
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-white/15 rounded-2xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition ${
                  category === cat
                    ? "bg-amber-400 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 border border-white/10 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {results.length > 0 ? (
              results.map((item) => {
                const Icon = getCategoryIcon(item.category);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-white/10 hover:border-amber-400/60 transition flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white group-hover:text-amber-300 transition truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-300 truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="hidden sm:inline text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-10 text-center text-slate-400 space-y-2">
                <Cpu className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm font-semibold text-white">No university records matched &ldquo;{query}&rdquo;</p>
                <p className="text-xs">Try searching CSE, Robotics, Shuttle, Scholarship, Faculty, or ERP.</p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              {results.length} matching institutional resources
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Press <kbd className="font-mono text-slate-200">Esc</kbd> to close
            </span>
          </div>
        </div>
      </NativeDialog>
    </>
  );
}
