"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopUtilityBar, HeroBanner, StatsTicker, Footer } from "@/components/DiuComponents";
import { TuitionWaiverCalculator } from "@/components/TuitionWaiverCalculator";
import { OnlineAdmissionModal } from "@/components/OnlineAdmissionModal";
import { NoticeBoardSection } from "@/components/NoticeBoardSection";
import { EventsCarouselSection } from "@/components/EventsCarouselSection";
import { 
  ArrowRight, BookOpen, Clock, Building2, Award, Sparkles, 
  Compass, Cpu, Laptop, Briefcase, Play,
  Globe2, Building, Bell, Users, Bus, Calendar
} from "lucide-react";

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const programs = [
    {
      faculty: "Faculty of Science & Information Technology (FSIT)",
      badge: "Flagship AI & Computing Hub",
      icon: Cpu,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentBorder: "border-emerald-500/40 hover:border-emerald-500",
      accentColor: "text-emerald-400",
      items: [
        { name: "B.Sc. in Computer Science & Engineering (CSE)", duration: "4 Years (12 Semesters)", credits: "148 Credits", highlight: "AI & Distributed Systems", intake: "Spring 2026 Open" },
        { name: "B.Sc. in Software Engineering (SWE)", duration: "4 Years (12 Semesters)", credits: "140 Credits", highlight: "Cloud Architecture & DevOps", intake: "Spring 2026 Open" },
        { name: "B.Sc. in Artificial Intelligence & Data Science", duration: "4 Years (12 Semesters)", credits: "142 Credits", highlight: "Deep Learning & Generative AI", intake: "Priority Cohort" },
      ]
    },
    {
      faculty: "School of Engineering & Robotics (SER)",
      badge: "Industry 4.0 Advanced Labs",
      icon: Laptop,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentBorder: "border-amber-500/40 hover:border-amber-500",
      accentColor: "text-amber-400",
      items: [
        { name: "B.Sc. in Robotics & Mechatronics Engineering", duration: "4 Years (12 Semesters)", credits: "146 Credits", highlight: "Autonomous Drone & Humanoids", intake: "Spring 2026 Open" },
        { name: "B.Sc. in Electrical & Electronic Engineering (EEE)", duration: "4 Years (12 Semesters)", credits: "144 Credits", highlight: "VLSI, IoT & Renewable Energy", intake: "Spring 2026 Open" },
        { name: "B.Sc. in Civil & Smart Infrastructure", duration: "4 Years (12 Semesters)", credits: "150 Credits", highlight: "Sustainable Earthquake Design", intake: "Spring 2026 Open" },
      ]
    },
    {
      faculty: "Faculty of Business & Entrepreneurship (FBE)",
      badge: "Venture Capital & Startups Hub",
      icon: Briefcase,
      gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
      accentBorder: "border-sky-500/40 hover:border-sky-500",
      accentColor: "text-sky-400",
      items: [
        { name: "Bachelor of Business Administration (BBA)", duration: "4 Years (12 Semesters)", credits: "126 Credits", highlight: "Fintech, Global Trade & Supply", intake: "Spring 2026 Open" },
        { name: "B.Sc. in Tech Entrepreneurship & E-Commerce", duration: "4 Years (12 Semesters)", credits: "130 Credits", highlight: "Venture Incubation & Angel Funding", intake: "100% Seed Grant" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans antialiased text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      <TopUtilityBar />
      
      {/* ================= PRESTIGIOUS TWO-TIER UNIVERSITY HEADER ================= */}
      <header className="sticky top-0 z-40 bg-[#061422]/95 backdrop-blur-2xl shadow-2xl border-b border-white/10 transition-all">
        {/* FIRST LINE: Full University Identity & Apply CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center border-b border-white/10">
          <Link href="/" className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-300 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition duration-500"></div>
              <img 
                src="/amiu-logo.svg" 
                alt="Al Mahadi International University Official Crest" 
                className="w-16 h-16 object-contain relative drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] transform group-hover:scale-105 transition duration-300"
              />
            </div>

            <div>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white block leading-none font-serif">
                AL MAHADI
              </span>
              <span className="text-xs font-black text-emerald-400 tracking-[0.25em] uppercase block mt-1.5">
                International University
              </span>
            </div>
          </Link>

          {/* Action CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/apply"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-black uppercase tracking-widest text-slate-950 rounded-2xl group bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/45 transition-all hover:-translate-y-0.5"
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-100 bg-amber-400 rounded-[14px] group-hover:bg-opacity-0 group-hover:text-white flex items-center gap-2">
                Apply for Spring 2026
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:text-white transition" />
              </span>
            </Link>
          </div>
        </div>

        {/* SECOND LINE: Full-Width Clean Navigation Bar (No scrollbar, perfectly distributed) */}
        <div className="bg-[#040e18]/80 border-t border-white/5 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <nav aria-label="Main Navigation" className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300 w-full">
              <Link 
                href="/campus" 
                className="hover:text-emerald-400 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Campus &amp; Shuttles</span>
              </Link>

              <Link 
                href="/faculty" 
                className="hover:text-sky-400 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Users className="w-4 h-4 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Faculty &amp; Research</span>
              </Link>

              <a 
                href="#events" 
                className="hover:text-amber-300 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Events &amp; Forums</span>
              </a>

              <Link 
                href="/alumni" 
                className="hover:text-teal-300 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Briefcase className="w-4 h-4 text-teal-300 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Alumni Network</span>
              </Link>

              <a 
                href="#calculator" 
                className="hover:text-amber-400 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Scholarships</span>
              </a>

              <a 
                href="#notice" 
                className="hover:text-rose-400 transition flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 group"
              >
                <Bell className="w-4 h-4 text-rose-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Circulars</span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroBanner onOpenModal={() => setIsApplyModalOpen(true)} />

        {/* Global Statistics Counter */}
        <StatsTicker />

        {/* ================= 2. INTERACTIVE CINEMATIC CAMPUS VISUAL SHOWCASE ================= */}
        <section id="campus-tour" className="py-24 px-4 bg-gradient-to-b from-[#071927] to-[#0b2438] relative overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3">
                <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Experience The Distinction
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  World-Class 150-Acre Smart Green Sanctuary
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                  Take an interactive walkthrough of South Asia&apos;s most advanced sustainable academic biosphere with IoT-monitored smart labs, high-speed transit, and 24/7 sports complexes.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href="/campus"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Explore Campus Facilities
                </Link>
                <Link 
                  href="/campus#shuttle"
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <Bus className="w-4 h-4 text-emerald-400" />
                  Live Dhaka Shuttle Tracker
                </Link>
              </div>
            </div>

            {/* Visual Bento Grid of the Campus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: AI Supercomputing Center */}
              <Link href="/campus" className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-800/80 group h-80 shadow-2xl flex flex-col justify-end p-8 block">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
                <div className="relative z-20 space-y-2">
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-2xl w-fit">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition">
                    NVIDIA AI & Quantum Computing Hub
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Equipped with GPU clusters dedicated to autonomous robotics, Large Language Models, and deep genomic sequencing.
                  </p>
                </div>
              </Link>

              {/* Feature 2: Sustainable Eco Architecture */}
              <Link href="/campus" className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-800/80 group h-80 shadow-2xl flex flex-col justify-end p-8 block">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
                <div className="relative z-20 space-y-2">
                  <div className="p-3 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-2xl w-fit">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition">
                    Zero-Emission Architectural Marvel
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    100% solar-energized smart auditoriums, rain-harvested lake systems, and international standard residential suites.
                  </p>
                </div>
              </Link>

              {/* Feature 3: Global Dual Degree Pavilion */}
              <Link href="/campus" className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-800/80 group h-80 shadow-2xl flex flex-col justify-end p-8 block">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
                <div className="relative z-20 space-y-2">
                  <div className="p-3 bg-sky-500/20 border border-sky-400/40 text-sky-300 rounded-2xl w-fit">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition">
                    120+ International Dual-Degree Transfer
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Seamless 2+2 and 3+1 credit pathways to top research universities in the USA, UK, Canada, Australia, and Germany.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Interactive Tuition Waiver Calculator */}
        <TuitionWaiverCalculator />

        {/* ================= 3. ACADEMIC PROGRAMS DIRECTORY ================= */}
        <section id="academics" className="py-28 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              World-Class Pedagogy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Faculties & Academic Programs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Outcome-Based Education (OBE) curricula aligned with ABET accreditation benchmarks, taught by world-class PhD faculties.
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((fac, idx) => {
              const FacIcon = fac.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-slate-800/60 backdrop-blur-xl rounded-3xl border ${fac.accentBorder} p-8 sm:p-10 shadow-2xl transition-all duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-slate-900 border border-white/10 text-amber-400 rounded-2xl shadow-xl">
                        <FacIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">{fac.faculty}</h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">Accredited by Board of Accreditation (BAETE) & UGC Approved</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full">
                      {fac.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {fac.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-7 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-400/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
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

                          <h4 className="font-black text-white text-lg group-hover:text-amber-400 transition mb-4 leading-snug">
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

                        <button
                          onClick={() => setIsApplyModalOpen(true)}
                          className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                        >
                          Enroll / Fast Application <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Events, Seminars & Hackathons Carousel */}
        <EventsCarouselSection />

        {/* Dedicated Category-Filtered Notice Board Section */}
        <NoticeBoardSection />

        {/* Global Alumni & Research Portal Discovery Strip */}
        <section className="py-16 px-4 bg-[#081d2f] border-t border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 flex flex-col justify-between gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Global Placement Network
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Alumni Leading Google DeepMind, NVIDIA &amp; Microsoft
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
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

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 flex flex-col justify-between gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  Faculty Research &amp; Mentorship
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Digital Paper Archive &amp; 1-on-1 Office Hours
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
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
          </div>
        </section>
      </main>

      <Footer />

      {/* Fast-Track Online Admission Application Modal */}
      <OnlineAdmissionModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
