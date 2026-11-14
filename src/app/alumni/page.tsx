"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { NativeDialog } from "@/components/NativeDialog";
import {
  ArrowLeft,
  Briefcase,
  Globe2,
  Search,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Award,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface AlumniProfile {
  id: string;
  name: string;
  batch: string;
  degree: string;
  role: string;
  company: string;
  location: string;
  domain: "Big Tech & AI" | "Hardware & Chips" | "FinTech & Startups";
  expertise: string[];
}

const ALUMNI: AlumniProfile[] = [
  {
    id: "alm-1",
    name: "Zarif Rahman",
    batch: "Batch '21",
    degree: "B.Sc. in CSE",
    role: "Senior Research Engineer",
    company: "Google DeepMind",
    location: "London, UK",
    domain: "Big Tech & AI",
    expertise: ["Large Language Models", "RLHF", "PhD Admissions"],
  },
  {
    id: "alm-2",
    name: "Tasnim Tabassum Chowdhury",
    batch: "Batch '20",
    degree: "B.Sc. in SWE",
    role: "Principal Cloud Architect",
    company: "Microsoft Azure",
    location: "Seattle, USA",
    domain: "Big Tech & AI",
    expertise: ["Distributed Kubernetes", "Mock Interviews", "US H1B Career"],
  },
  {
    id: "alm-3",
    name: "Mahmudul Hasan Sakib",
    batch: "Batch '22",
    degree: "B.Sc. in Robotics",
    role: "Autonomous Systems Lead",
    company: "NVIDIA Research",
    location: "Santa Clara, USA",
    domain: "Hardware & Chips",
    expertise: ["CUDA Kernels", "Robotics Sim-to-Real", "ASIC Acceleration"],
  },
  {
    id: "alm-4",
    name: "Farzana Yasmin",
    batch: "Batch '19",
    degree: "BBA & FinTech",
    role: "VP of Payment Infrastructure",
    company: "bKash FinTech",
    location: "Dhaka, Bangladesh",
    domain: "FinTech & Startups",
    expertise: ["Mobile Financial Rails", "Venture Scaling", "Product Strategy"],
  },
  {
    id: "alm-5",
    name: "Rafiqul Islam",
    batch: "Batch '23",
    degree: "B.Sc. in AI & DS",
    role: "Staff Machine Learning Engineer",
    company: "Grab Superapp",
    location: "Singapore",
    domain: "Big Tech & AI",
    expertise: ["Geo-Spatial Pricing", "Real-Time Recommender Systems"],
  },
  {
    id: "alm-6",
    name: "Nafisa Anjum",
    batch: "Batch '21",
    degree: "B.Sc. in EEE",
    role: "Silicon Verification Lead",
    company: "Apple Silicon",
    location: "Munich, Germany",
    domain: "Hardware & Chips",
    expertise: ["VLSI Timing Closure", "Low-Power SoC", "European Blue Card"],
  },
];

export default function AlumniNetworkPage() {
  const [domain, setDomain] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [note, setNote] = useState("");
  const [referrals, setReferrals] = useState<Record<string, string>>({});

  const filtered = ALUMNI.filter((a) => {
    const matchesDomain = domain === "All" || a.domain === domain;
    const matchesQuery =
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.company.toLowerCase().includes(query.toLowerCase()) ||
      a.expertise.some((ex) => ex.toLowerCase().includes(query.toLowerCase()));
    return matchesDomain && matchesQuery;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumni) return;
    const refId = "REF-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    setReferrals((prev) => ({ ...prev, [selectedAlumni.id]: refId }));
    setNote("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <TopUtilityBar />

      <header className="sticky top-0 z-40 bg-[#061422]/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to University Main</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-10 h-10 object-contain" />
            <span className="font-serif font-black text-lg text-white">AMIU Global Alumni & Careers</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-16 px-4 max-w-7xl mx-auto w-full">
        {/* Editorial Alumni Showcase Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 rounded-3xl border border-white/10 bg-slate-800/40 p-6 sm:p-10 shadow-2xl">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5" />
              Global Career Placement Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              AMIU Distinguished Alumni Network
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Connect directly with AMIU graduates leading engineering, robotics, and venture teams worldwide for 1-on-1 career guidance and interview referrals.
            </p>
          </div>
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/9] shadow-xl">
            <img
              src="/images/convocation-scholars.webp"
              alt="Graduating Al Mahadi International University scholars celebrating at convocation"
              width={1200}
              height={670}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[11px] font-bold text-white bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              12,400+ Alumni Across 38 Countries
            </span>
          </div>
        </div>

        {/* Career Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { label: "Graduate Placement Within 6 Months", value: "96.4%", icon: Briefcase },
            { label: "Global Hiring Partners Worldwide", value: "450+", icon: Building2 },
            { label: "Top Graduate Starting Stipend", value: "৳ 145K+", icon: Award },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-800/70 border border-white/10 rounded-3xl p-6 flex items-center gap-5 shadow-xl"
              >
                <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex flex-wrap gap-2">
            {["All", "Big Tech & AI", "Hardware & Chips", "FinTech & Startups"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDomain(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  domain === d
                    ? "bg-amber-400 text-slate-950 shadow-lg"
                    : "bg-slate-800/80 text-slate-300 border border-white/10 hover:bg-slate-800"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search name, company, skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((alum) => {
            const refCode = referrals[alum.id];
            return (
              <article
                key={alum.id}
                className="bg-slate-800/65 border border-white/10 hover:border-amber-400/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-0.5">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-300 text-sm">
                        {alum.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      {alum.batch} • {alum.degree}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">{alum.name}</h3>
                  <p className="text-xs font-bold text-amber-400 mt-0.5">{alum.role}</p>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">
                    {alum.company} • <span className="text-slate-400">{alum.location}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 my-5">
                    {alum.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-white/5 text-slate-300 px-2.5 py-1 rounded-md border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {refCode ? (
                  <div className="w-full py-2.5 px-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Mentorship Requested ({refCode})
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedAlumni(alum)}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Request Mentorship / Referral
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </main>

      <NativeDialog
        isOpen={Boolean(selectedAlumni)}
        onClose={() => setSelectedAlumni(null)}
        titleId="alumni-connect-title"
        title={
          selectedAlumni
            ? `Connect with ${selectedAlumni.name} (${selectedAlumni.company})`
            : "Request Referral"
        }
      >
        {selectedAlumni && referrals[selectedAlumni.id] ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-white">Alumni Request Sent!</h3>
            <p className="text-xs text-slate-300">
              {selectedAlumni.name} at {selectedAlumni.company} will respond to your AMIU student email within 48 hours.
            </p>
            <div className="py-2 px-5 bg-slate-950 border border-amber-400/40 rounded-xl inline-block font-mono text-lg font-black text-amber-400">
              {referrals[selectedAlumni.id]}
            </div>
          </div>
        ) : (
          selectedAlumni && (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
                Request CV feedback, mock interview prep, or an internship referral.
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Brief Introduction & Goal
                </label>
                <textarea
                  required
                  autoFocus
                  rows={3}
                  placeholder="Share your semester, CGPA, and target role or PhD area..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest"
              >
                Send Mentorship Request
              </button>
            </form>
          )
        )}
      </NativeDialog>

      <Footer />
    </div>
  );
}
