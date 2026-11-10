"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { Search, Mail, BookOpen, Award, ArrowLeft, ExternalLink, GraduationCap, Building2 } from "lucide-react";
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
}

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");

  const faculties: FacultyMember[] = [
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
    },
  ];

  const departments = ["All", "Computer Science & Engineering", "Software Engineering", "Robotics & Mechatronics", "Business Administration (BBA)", "Artificial Intelligence & Data Science"];

  const filteredFaculties = faculties.filter((f) => {
    const matchesDept = selectedDept === "All" || f.department === selectedDept;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.researchInterests.some(r => r.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

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
            <span className="font-serif font-black text-lg text-white">Al Mahadi University Faculty</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-block">
            Distinguished Global Academicians
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Faculty & Research Fellows</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Meet the international researchers, authors, and industry pioneers driving breakthrough discoveries at Al Mahadi International University.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
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
          {filteredFaculties.map((f) => (
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

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">{f.name}</h3>
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
                    <span>Citations: <strong className="text-white">{f.citations}</strong></span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Specializations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {f.researchInterests.map((r, i) => (
                      <span key={i} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${f.email}`}
                className="w-full py-2.5 bg-slate-700/50 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 border border-white/10 group-hover:border-transparent"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Faculty
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
