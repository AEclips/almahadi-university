"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { NativeDialog } from "@/components/NativeDialog";
import {
  Search,
  Mail,
  BookOpen,
  Award,
  ArrowLeft,
  GraduationCap,
  Building2,
  CalendarClock,
  FileText,
  Quote,
  CheckCircle2,
  Copy,
} from "lucide-react";
import Link from "next/link";

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  faculty: string;
  education: string;
  researchInterests: string[];
  email: string;
  citations: number;
  officeHours: string[];
}

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  domain: "AI & LLMs" | "Quantum Systems" | "Robotics & IoT" | "FinTech";
  doi: string;
  citations: number;
  abstract: string;
  bibtex: string;
}

const FACULTIES: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Al Mahadi, PhD",
    designation: "Distinguished Professor & Chancellor",
    department: "Computer Science & Engineering",
    faculty: "FSIT",
    education: "PhD in AI & Quantum Computing, MIT",
    researchInterests: ["Generative AI", "Quantum Neural Networks", "Autonomous Systems"],
    email: "chancellor@almahadi.edu.bd",
    citations: 1840,
    officeHours: ["Sunday 11:00 AM – 12:30 PM", "Tuesday 03:00 PM – 04:30 PM", "Thursday 10:30 AM – 12:00 PM"],
  },
  {
    id: "fac-2",
    name: "Prof. Dr. Sarah Jenkins",
    designation: "Professor & Dean",
    department: "Software Engineering",
    faculty: "FSIT",
    education: "PhD in Distributed Cloud Architecture, Stanford",
    researchInterests: ["Microservices", "DevOps Resilience", "Cybersecurity"],
    email: "s.jenkins@almahadi.edu.bd",
    citations: 920,
    officeHours: ["Monday 01:30 PM – 03:00 PM", "Wednesday 11:00 AM – 12:30 PM"],
  },
  {
    id: "fac-3",
    name: "Dr. Tariqul Islam",
    designation: "Associate Professor & Head of Robotics",
    department: "Robotics & Mechatronics",
    faculty: "SER",
    education: "PhD in Bipedal Robotics, Tokyo University",
    researchInterests: ["Humanoid Kinematics", "IoT Sensing", "Embedded Firmware"],
    email: "tariqul.robotics@almahadi.edu.bd",
    citations: 640,
    officeHours: ["Sunday 02:00 PM – 04:00 PM", "Wednesday 02:00 PM – 04:00 PM"],
  },
  {
    id: "fac-4",
    name: "Prof. David Vance, MBA, PhD",
    designation: "Dean of Business Studies",
    department: "Business Administration (BBA)",
    faculty: "FBE",
    education: "PhD in Financial Technology, London School of Economics",
    researchInterests: ["Venture Capital", "Fintech Disruption", "Algorithmic Trading"],
    email: "d.vance@almahadi.edu.bd",
    citations: 1120,
    officeHours: ["Monday 10:00 AM – 11:30 AM", "Thursday 02:00 PM – 03:30 PM"],
  },
  {
    id: "fac-5",
    name: "Dr. Nusrat Jahan",
    designation: "Assistant Professor",
    department: "Artificial Intelligence & Data Science",
    faculty: "FSIT",
    education: "PhD in NLP & LLMs, University of Cambridge",
    researchInterests: ["LLM Alignment", "Bengali Language Modeling", "Cognitive AI"],
    email: "nusrat.ai@almahadi.edu.bd",
    citations: 430,
    officeHours: ["Sunday 03:00 PM – 05:00 PM", "Tuesday 11:00 AM – 01:00 PM"],
  },
  {
    id: "fac-6",
    name: "Engr. Farhan Kabir",
    designation: "Assistant Professor",
    department: "Electrical & Electronic Engineering",
    faculty: "SER",
    education: "M.Sc. in VLSI Circuit Design, NUS",
    researchInterests: ["Nanotechnology", "Solar Cell Fabrication", "Semiconductors"],
    email: "farhan.eee@almahadi.edu.bd",
    citations: 280,
    officeHours: ["Monday 03:00 PM – 04:30 PM", "Thursday 11:30 AM – 01:00 PM"],
  },
];

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "paper-1",
    title: "Hybrid Quantum-Variational Attention for Multilingual Bengali-English Transformers",
    authors: "Al Mahadi, Nusrat Jahan",
    venue: "NeurIPS 2026 Proceedings",
    year: 2026,
    domain: "Quantum Systems",
    doi: "10.1109/AMIU.2026.90124",
    citations: 142,
    abstract:
      "We introduce a parameterized quantum attention layer integrated inside sparse mixture-of-experts transformer blocks, reducing training energy by 34% while lifting low-resource Bengali reasoning benchmarks by +9.2 F1.",
    bibtex: `@inproceedings{mahadi2026hybrid,\n  title={Hybrid Quantum-Variational Attention for Multilingual Transformers},\n  author={Mahadi, Al and Jahan, Nusrat},\n  booktitle={NeurIPS},\n  year={2026}\n}`,
  },
  {
    id: "paper-2",
    title: "Zero-Downtime Serverless Mesh Orchestration Under Extreme Burst Loads",
    authors: "Sarah Jenkins, Farhan Kabir",
    venue: "IEEE Transactions on Cloud Computing",
    year: 2026,
    domain: "AI & LLMs",
    doi: "10.1109/TCC.2026.331209",
    citations: 98,
    abstract:
      "Presents predictive cold-start warming and adaptive circuit breakers for distributed microservices at university-scale ERP portals supporting 100k+ concurrent student logins.",
    bibtex: `@article{jenkins2026zero,\n  title={Zero-Downtime Serverless Mesh Orchestration},\n  author={Jenkins, Sarah and Kabir, Farhan},\n  journal={IEEE Trans. Cloud Computing},\n  year={2026}\n}`,
  },
  {
    id: "paper-3",
    title: "Reinforcement-Learned Bipedal Stabilization on Uneven Delta Terrain",
    authors: "Tariqul Islam, Al Mahadi",
    venue: "IEEE/RSJ International Conference on Intelligent Robots (IROS)",
    year: 2025,
    domain: "Robotics & IoT",
    doi: "10.1109/IROS.2025.884210",
    citations: 76,
    abstract:
      "Develops a low-latency IMU-fusion proprioceptive controller trained in sim-to-real environments, enabling autonomous campus assistance quadrupeds to traverse flooded or sloped surfaces.",
    bibtex: `@inproceedings{islam2025bipedal,\n  title={Reinforcement-Learned Bipedal Stabilization},\n  author={Islam, Tariqul and Mahadi, Al},\n  booktitle={IROS},\n  year={2025}\n}`,
  },
  {
    id: "paper-4",
    title: "Decentralized Micro-Scholarship Escrow Using Programmable Liquidity Rails",
    authors: "David Vance, Nusrat Jahan",
    venue: "Journal of Financial Innovation",
    year: 2025,
    domain: "FinTech",
    doi: "10.1186/s40854-025-00412",
    citations: 64,
    abstract:
      "Examines automated merit-triggered tuition disbursement smart ledgers across South Asian higher education institutions, eliminating administrative delays by 92%.",
    bibtex: `@article{vance2025decentralized,\n  title={Decentralized Micro-Scholarship Escrow},\n  author={Vance, David and Jahan, Nusrat},\n  journal={Financial Innovation},\n  year={2025}\n}`,
  },
];

export default function FacultyPage() {
  const [activeSection, setActiveSection] = useState<"directory" | "archive">("directory");
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [archiveSearch, setArchiveSearch] = useState("");

  // Booking Dialog State
  const [bookingFaculty, setBookingFaculty] = useState<FacultyMember | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookedMeetings, setBookedMeetings] = useState<Record<string, { code: string; slot: string }>>({});

  // Research Paper Abstract Dialog State
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const departments = [
    "All",
    "Computer Science & Engineering",
    "Software Engineering",
    "Robotics & Mechatronics",
    "Business Administration (BBA)",
    "Artificial Intelligence & Data Science",
  ];

  const filteredFaculties = FACULTIES.filter((f) => {
    const matchesDept = selectedDept === "All" || f.department === selectedDept;
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.researchInterests.some((r) => r.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const filteredPapers = RESEARCH_PAPERS.filter((p) => {
    const matchesDomain = domainFilter === "All" || p.domain === domainFilter;
    const matchesQuery =
      p.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      p.authors.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      p.venue.toLowerCase().includes(archiveSearch.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  const openBooking = (f: FacultyMember) => {
    setBookingFaculty(f);
    setSelectedSlot(f.officeHours[0] || "");
    setBookingTopic("");
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFaculty) return;
    const code = "MNT-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    setBookedMeetings((prev) => ({
      ...prev,
      [bookingFaculty.id]: { code, slot: selectedSlot },
    }));
  };

  const handleCopyBibtex = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard fallback ignored if unsupported
    }
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <TopUtilityBar />

      <header className="sticky top-0 z-40 bg-[#061422]/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to University Portal</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-10 h-10 object-contain" />
            <span className="font-serif font-black text-lg text-white">Al Mahadi Faculty & Research</span>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 rounded-3xl border border-white/10 bg-slate-800/40 p-6 sm:p-10 shadow-2xl">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-block">
              Distinguished Global Academicians
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Faculty Mentorship &amp; Research Archive
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Book 1-on-1 faculty office hours directly or explore peer-reviewed IEEE, NeurIPS, and Springer publications authored by Al Mahadi International University researchers.
            </p>
          </div>
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/9] shadow-xl">
            <img
              src="/images/faculty-mentorship.webp"
              alt="AMIU computer science professor mentoring honors students at a glass whiteboard"
              width={1200}
              height={670}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[11px] font-bold text-white bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              Direct PhD &amp; Honors Research Mentorship
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveSection("directory")}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
              activeSection === "directory"
                ? "bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20"
                : "bg-slate-800/80 text-slate-300 border border-white/10 hover:bg-slate-800"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Faculty & 1-on-1 Office Hours
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("archive")}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
              activeSection === "archive"
                ? "bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20"
                : "bg-slate-800/80 text-slate-300 border border-white/10 hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Digital Research Paper Archive
          </button>
        </div>

        {activeSection === "directory" ? (
          <>
            {/* Faculty Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      selectedDept === dept
                        ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search faculty or research..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Faculty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculties.map((f) => {
                const booked = bookedMeetings[f.id];
                return (
                  <div
                    key={f.id}
                    className="bg-slate-800/60 border border-white/10 hover:border-amber-400/60 rounded-3xl p-6 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5 shadow-md">
                          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-bold text-lg text-amber-300">
                            {f.name.split(" ")[1]?.[0] || "D"}
                          </div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                          {f.faculty}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                        {f.name}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium mb-1">{f.designation}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-4">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {f.department}
                      </p>

                      <div className="bg-slate-900/80 rounded-xl p-3 border border-white/5 space-y-2 mb-4 text-xs">
                        <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{f.education}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>
                            Citations: <strong className="text-white">{f.citations}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-6">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                          Specializations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {f.researchInterests.map((r, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {booked ? (
                        <div className="w-full py-2.5 px-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-black rounded-xl flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          1-on-1 Reserved ({booked.code})
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openBooking(f)}
                          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                        >
                          <CalendarClock className="w-3.5 h-3.5" />
                          Book 1-on-1 Office Hours
                        </button>
                      )}

                      <a
                        href={`mailto:${f.email}`}
                        className="w-full py-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 border border-white/10"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email Faculty
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* ================= DIGITAL RESEARCH PAPER ARCHIVE ================= */
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {["All", "AI & LLMs", "Quantum Systems", "Robotics & IoT", "FinTech"].map((dom) => (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => setDomainFilter(dom)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      domainFilter === dom
                        ? "bg-emerald-500 text-slate-950 shadow-lg"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search paper title, author, journal..."
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper) => (
                <article
                  key={paper.id}
                  className="bg-slate-800/65 border border-white/10 hover:border-emerald-400/50 rounded-3xl p-7 shadow-xl flex flex-col justify-between transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                        {paper.domain}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {paper.year} • {paper.citations} Citations
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug mb-2">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mb-1">{paper.authors}</p>
                    <p className="text-[11px] text-slate-400 mb-4">{paper.venue} • DOI: {paper.doi}</p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6">
                      {paper.abstract}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePaper(paper)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-emerald-500/30 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Read Abstract & Cite (BibTeX)
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 1-on-1 Office Hours Booking Native Modal */}
      <NativeDialog
        isOpen={Boolean(bookingFaculty)}
        onClose={() => setBookingFaculty(null)}
        titleId="office-hours-dialog-title"
        title={bookingFaculty ? `1-on-1 Office Hours: ${bookingFaculty.name}` : "Book Office Hours"}
      >
        {bookingFaculty && bookedMeetings[bookingFaculty.id] ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-white">Mentorship Slot Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Scheduled with <strong className="text-white">{bookingFaculty.name}</strong> for{" "}
              <strong className="text-amber-300">{bookedMeetings[bookingFaculty.id].slot}</strong>.
            </p>
            <div className="py-2.5 px-5 bg-slate-950 border border-amber-400/40 rounded-xl inline-block font-mono text-lg font-black text-amber-400">
              {bookedMeetings[bookingFaculty.id].code}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setBookingFaculty(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          bookingFaculty && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Select Available Time Slot
                </label>
                <select
                  autoFocus
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {bookingFaculty.officeHours.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Discussion / Research Thesis Topic
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Capstone AI agent guidance or research paper collaboration..."
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition"
              >
                Confirm 1-on-1 Session
              </button>
            </form>
          )
        )}
      </NativeDialog>

      {/* Research Paper Abstract & BibTeX Modal */}
      <NativeDialog
        isOpen={Boolean(activePaper)}
        onClose={() => setActivePaper(null)}
        titleId="paper-abstract-title"
        title={activePaper?.title ?? "Research Paper"}
        maxWidthClass="max-w-2xl"
      >
        {activePaper && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-amber-400">{activePaper.authors}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">{activePaper.venue}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-mono">DOI: {activePaper.doi}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 text-xs text-slate-200 leading-relaxed space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-amber-400" />
                Abstract
              </div>
              <p>{activePaper.abstract}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  BibTeX Citation
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyBibtex(activePaper.bibtex)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedBibtex ? "Copied!" : "Copy BibTeX"}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                {activePaper.bibtex}
              </pre>
            </div>
          </div>
        )}
      </NativeDialog>

      <Footer />
    </div>
  );
}
