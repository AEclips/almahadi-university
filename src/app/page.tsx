"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeroBanner, StatsTicker, Footer } from "@/components/DiuComponents";
import { SiteHeader } from "@/components/SiteHeader";
import { CampusLightboxGallery } from "@/components/CampusLightboxGallery";
import { SpotlightCard } from "@/components/KineticEffects";
import { TuitionWaiverCalculator } from "@/components/TuitionWaiverCalculator";
import { OnlineAdmissionModal } from "@/components/OnlineAdmissionModal";
import { NoticeBoardSection } from "@/components/NoticeBoardSection";
import { EventsCarouselSection } from "@/components/EventsCarouselSection";
import { NativeDialog } from "@/components/NativeDialog";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  Cpu,
  Laptop,
  Briefcase,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface ProgramItem {
  name: string;
  duration: string;
  credits: string;
  highlight: string;
  intake: string;
  tuition: string;
  lab: string;
  coreModules: string[];
  careers: string[];
}

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<ProgramItem | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("All");

  const programs: {
    code: "FSIT" | "SER" | "FBE";
    faculty: string;
    badge: string;
    icon: typeof Cpu;
    gradient: string;
    accentBorder: string;
    accentColor: string;
    items: ProgramItem[];
  }[] = [
    {
      code: "FSIT",
      faculty: "Faculty of Science & Information Technology (FSIT)",
      badge: "Flagship AI & Computing Hub",
      icon: Cpu,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentBorder: "border-emerald-500/40 hover:border-emerald-500",
      accentColor: "text-emerald-400",
      items: [
        {
          name: "B.Sc. in Computer Science & Engineering (CSE)",
          duration: "4 Years (12 Semesters)",
          credits: "148 Credits",
          highlight: "AI & Distributed Systems",
          intake: "Spring 2026 Open",
          tuition: "৳ 850,000 Base (Up to 75% Merit Waiver)",
          lab: "NVIDIA Supercomputing & Quantum GPU Cluster",
          coreModules: ["Algorithms & Complexity", "Operating Systems & Kernels", "Distributed Cloud Systems", "Machine Learning & LLMs", "Compiler Construction", "Capstone Honours Thesis"],
          careers: ["AI Research Engineer", "Distributed Systems Architect", "Principal Software Engineer"],
        },
        {
          name: "B.Sc. in Software Engineering (SWE)",
          duration: "4 Years (12 Semesters)",
          credits: "140 Credits",
          highlight: "Cloud Architecture & DevOps",
          intake: "Spring 2026 Open",
          tuition: "৳ 780,000 Base (Up to 75% Merit Waiver)",
          lab: "Cloud Native Microservices & Security Studio",
          coreModules: ["Software Architecture & Patterns", "Microservices & Kubernetes", "Automated Testing & CI/CD", "Secure Web Engineering", "Human-Centered UX", "Industry Residency Sprint"],
          careers: ["Cloud Platform Engineer", "Site Reliability Engineer", "Product Engineering Lead"],
        },
        {
          name: "B.Sc. in Artificial Intelligence & Data Science",
          duration: "4 Years (12 Semesters)",
          credits: "142 Credits",
          highlight: "Deep Learning & Generative AI",
          intake: "Priority Cohort",
          tuition: "৳ 820,000 Base (Up to 75% Merit Waiver)",
          lab: "Deep Learning Vision & NLP Foundation Lab",
          coreModules: ["Statistical Inference & Math", "Deep Neural Architectures", "Transformer Models & RL", "Big Data Spark Pipelines", "Ethics & Alignment in AI", "Applied AI Research Lab"],
          careers: ["Applied ML Scientist", "Computer Vision Engineer", "LLM Evaluation Specialist"],
        },
      ]
    },
    {
      code: "SER",
      faculty: "School of Engineering & Robotics (SER)",
      badge: "Industry 4.0 Advanced Labs",
      icon: Laptop,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentBorder: "border-amber-500/40 hover:border-amber-500",
      accentColor: "text-amber-400",
      items: [
        {
          name: "B.Sc. in Robotics & Mechatronics Engineering",
          duration: "4 Years (12 Semesters)",
          credits: "146 Credits",
          highlight: "Autonomous Drone & Humanoids",
          intake: "Spring 2026 Open",
          tuition: "৳ 840,000 Base (Up to 75% Merit Waiver)",
          lab: "Autonomous Locomotion & ROS2 Flight Arena",
          coreModules: ["Kinematics & Control Theory", "Embedded RTOS Firmware", "ROS2 Navigation Stacks", "Actuator & Sensor Fusion", "SLAM & Autonomous Perception", "Industrial Manipulator Capstone"],
          careers: ["Autonomous Robotics Engineer", "Flight Control Developer", "Automation Architect"],
        },
        {
          name: "B.Sc. in Electrical & Electronic Engineering (EEE)",
          duration: "4 Years (12 Semesters)",
          credits: "144 Credits",
          highlight: "VLSI, IoT & Renewable Energy",
          intake: "Spring 2026 Open",
          tuition: "৳ 720,000 Base (Up to 75% Merit Waiver)",
          lab: "Cleanroom VLSI Silicon Design & Smart Grid Lab",
          coreModules: ["Semiconductor Device Physics", "Analog & Digital VLSI", "Power Systems & Smart Grids", "Digital Signal Processing", "IoT Wireless Telemetry", "Renewable Energy Design"],
          careers: ["VLSI Chip Design Engineer", "Power Grid Automation Lead", "IoT Systems Architect"],
        },
        {
          name: "B.Sc. in Civil & Smart Infrastructure",
          duration: "4 Years (12 Semesters)",
          credits: "150 Credits",
          highlight: "Sustainable Earthquake Design",
          intake: "Spring 2026 Open",
          tuition: "৳ 690,000 Base (Up to 75% Merit Waiver)",
          lab: "Structural Seismology & Smart Green Materials Lab",
          coreModules: ["Seismic Structural Dynamics", "Geotechnical Foundation Design", "BIM & Digital Twin Modeling", "Water Resources & Eco-Lakes", "Low-Carbon Concrete Tech", "Urban Metro Transportation"],
          careers: ["Structural Bridge Engineer", "Smart Infrastructure Planner", "Geotechnical Specialist"],
        },
      ]
    },
    {
      code: "FBE",
      faculty: "Faculty of Business & Entrepreneurship (FBE)",
      badge: "Venture Capital & Startups Hub",
      icon: Briefcase,
      gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
      accentBorder: "border-sky-500/40 hover:border-sky-500",
      accentColor: "text-sky-400",
      items: [
        {
          name: "Bachelor of Business Administration (BBA)",
          duration: "4 Years (12 Semesters)",
          credits: "126 Credits",
          highlight: "Fintech, Global Trade & Supply",
          intake: "Spring 2026 Open",
          tuition: "৳ 620,000 Base (Up to 75% Merit Waiver)",
          lab: "Bloomberg Financial Trading & Case Analytics Studio",
          coreModules: ["Quantitative Corporate Finance", "Digital FinTech & Blockchain", "Global Supply Chain Analytics", "Econometric Forecasting", "Strategic Marketing Lab", "Executive Consultancy Project"],
          careers: ["Investment Banking Analyst", "FinTech Product Manager", "Global Supply Strategist"],
        },
        {
          name: "B.Sc. in Tech Entrepreneurship & E-Commerce",
          duration: "4 Years (12 Semesters)",
          credits: "130 Credits",
          highlight: "Venture Incubation & Angel Funding",
          intake: "100% Seed Grant",
          tuition: "৳ 640,000 Base (Seed Incubator Access)",
          lab: "AMIU Startup Incubator & Venture Demo Arena",
          coreModules: ["Zero-to-One Product Discovery", "Venture Capital & Term Sheets", "SaaS Growth & Unit Economics", "No-Code & AI Prototyping", "Cross-Border Digital Trade", "Demo Day Pitch Defense"],
          careers: ["Startup Founder & CEO", "Venture Capital Associate", "Head of Digital Growth"],
        },
      ]
    }
  ];

  const visibleFaculties =
    selectedFaculty === "All"
      ? programs
      : programs.filter((fac) => fac.code === selectedFaculty);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans antialiased text-white selection:bg-amber-400 selection:text-slate-950">
      <SiteHeader />

      <main id="main-content" className="flex-grow">
        {/* Cinematic Full-Bleed Parallax Hero */}
        <HeroBanner onOpenModal={() => setIsApplyModalOpen(true)} />

        {/* Animated Key Metrics */}
        <StatsTicker />

        {/* Asymmetric Campus Showcase Bento Grid & Fullscreen Lightbox */}
        <CampusLightboxGallery />

        {/* Dynamic Interactive Tuition Waiver Calculator */}
        <TuitionWaiverCalculator />

        {/* ================= 3. ACADEMIC PROGRAMS DIRECTORY ================= */}
        <section id="academics" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 kinetic-reveal">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              World-Class Pedagogy
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Faculties &amp; Academic Programs
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Outcome-Based Education (OBE) curricula aligned with ABET accreditation benchmarks, taught by world-class PhD faculties.
            </p>
          </div>

          {/* Interactive Faculty Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-14 kinetic-reveal">
            {[
              { id: "All", label: "All Faculties (8 Degrees)" },
              { id: "FSIT", label: "FSIT — AI & Computing" },
              { id: "SER", label: "SER — Robotics & Engineering" },
              { id: "FBE", label: "FBE — Business & Ventures" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFaculty(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition ${
                  selectedFaculty === tab.id
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {visibleFaculties.map((fac) => {
              const FacIcon = fac.icon;
              return (
                <div
                  key={fac.code}
                  className={`kinetic-reveal bg-slate-800/60 backdrop-blur-xl rounded-3xl border ${fac.accentBorder} p-8 sm:p-10 shadow-2xl transition-all duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-slate-900 border border-white/10 text-amber-400 rounded-2xl shadow-xl">
                        <FacIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{fac.faculty}</h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">Accredited by Board of Accreditation (BAETE) &amp; UGC Approved</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full">
                      {fac.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {fac.items.map((item, itemIdx) => (
                      <SpotlightCard
                        key={itemIdx}
                        className="p-7 rounded-2xl border border-white/10 bg-slate-900/65 hover:bg-slate-900 hover:border-amber-400/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
                              {item.highlight}
                            </span>
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                              {item.intake}
                            </span>
                          </div>

                          <h4 className="font-bold text-white text-lg group-hover:text-amber-400 transition mb-4 leading-snug">
                            {item.name}
                          </h4>

                          <div className="space-y-2 text-xs font-medium text-slate-400 mb-6 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{item.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{item.credits}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2.5 relative z-10">
                          <button
                            type="button"
                            onClick={() => setActiveProgram(item)}
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-emerald-400/50 transition flex items-center justify-center gap-2"
                          >
                            <Layers className="w-3.5 h-3.5 text-emerald-400" />
                            View Curriculum &amp; Syllabus
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsApplyModalOpen(true)}
                            className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                          >
                            Enroll / Fast Application <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Events, Seminars & Hackathons Carousel */}
        <div className="kinetic-reveal">
          <EventsCarouselSection />
        </div>

        {/* Dedicated Category-Filtered Notice Board Section */}
        <div className="kinetic-reveal">
          <NoticeBoardSection />
        </div>

        {/* Global Alumni & Research Portal Discovery Strip */}
        <section className="py-16 px-4 bg-[#081d2f] border-t border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 kinetic-reveal">
            <SpotlightCard className="rounded-3xl border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col justify-between shadow-2xl group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src="/images/convocation-scholars.webp"
                  alt="AMIU graduating scholars celebrating at convocation on campus plaza"
                  width={1200}
                  height={670}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-6 text-[10px] font-black uppercase tracking-widest text-amber-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30">
                  Global Placement Network
                </span>
              </div>
              <div className="p-8 pt-5 flex-grow flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                    Alumni Leading Google DeepMind, NVIDIA &amp; Microsoft
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-lg">
                    Connect directly with AMIU alumni engineers and founders worldwide for mock interviews, PhD admissions guidance, and internship referrals.
                  </p>
                </div>
                <Link
                  href="/alumni"
                  className="w-fit px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  Explore Alumni Directory <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col justify-between shadow-2xl group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src="/images/faculty-mentorship.webp"
                  alt="Professor discussing quantum circuits on a glass whiteboard with honors students"
                  width={1200}
                  height={670}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-6 text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                  Faculty Research &amp; Mentorship
                </span>
              </div>
              <div className="p-8 pt-5 flex-grow flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                    Digital Paper Archive &amp; 1-on-1 Office Hours
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-lg">
                    Explore IEEE &amp; NeurIPS publications authored by AMIU professors or reserve direct mentorship time slots online.
                  </p>
                </div>
                <Link
                  href="/faculty"
                  className="w-fit px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  Open Faculty &amp; Archive <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </section>
      </main>

      <Footer />

      {/* Fast-Track Online Admission Application Modal */}
      <OnlineAdmissionModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Detailed Program Curriculum & Syllabus Dialog */}
      <NativeDialog
        isOpen={!!activeProgram}
        onClose={() => setActiveProgram(null)}
        titleId="program-syllabus-title"
        title={activeProgram ? activeProgram.name : "Program Curriculum"}
        maxWidthClass="max-w-2xl"
      >
        {activeProgram && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Duration</div>
                <div className="text-white font-bold mt-0.5">{activeProgram.duration}</div>
              </div>
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Credits</div>
                <div className="text-white font-bold mt-0.5">{activeProgram.credits}</div>
              </div>
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3 col-span-2">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Tuition &amp; Waiver</div>
                <div className="text-amber-300 font-bold mt-0.5">{activeProgram.tuition}</div>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                  Dedicated Laboratory Facility
                </div>
                <div className="text-sm font-bold text-white mt-0.5">{activeProgram.lab}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                Core OBE Curriculum Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProgram.coreModules.map((mod) => (
                  <div
                    key={mod}
                    className="flex items-center gap-2 bg-slate-800/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-2.5">
                Graduate Career Pathways
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeProgram.careers.map((career) => (
                  <span
                    key={career}
                    className="text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/25 px-3 py-1.5 rounded-full"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveProgram(null);
                  setIsApplyModalOpen(true);
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                Apply for This Program <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/#calculator"
                onClick={() => setActiveProgram(null)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/15 text-center transition"
              >
                Calculate Merit Waiver
              </Link>
            </div>
          </div>
        )}
      </NativeDialog>
    </div>
  );
}
