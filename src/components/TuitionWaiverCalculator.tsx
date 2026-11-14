"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const PROGRAMS = [
  { id: "cse", name: "B.Sc. in Computer Science & Engineering (CSE)", baseTuition: 850000 },
  { id: "swe", name: "B.Sc. in Software Engineering (SWE)", baseTuition: 780000 },
  { id: "bba", name: "Bachelor of Business Administration (BBA)", baseTuition: 620000 },
  { id: "eee", name: "B.Sc. in Electrical & Electronic Engineering (EEE)", baseTuition: 720000 },
  { id: "eng", name: "B.A. (Hons) in English", baseTuition: 450000 },
  { id: "pharm", name: "Bachelor of Pharmacy (B.Pharm)", baseTuition: 920000 },
];

interface WaiverResult {
  waiverPercent: number;
  title: string;
  description: string;
  estimatedTuition: number;
  finalTuition: number;
}

function computeWaiver(programId: string, sscGpaStr: string, hscGpaStr: string): WaiverResult {
  const ssc = parseFloat(sscGpaStr) || 0;
  const hsc = parseFloat(hscGpaStr) || 0;
  const totalGpa = ssc + hsc;
  const prog = PROGRAMS.find((p) => p.id === programId) || PROGRAMS[0];

  let waiver = 0;
  let title = "Regular Tuition";
  let description = "Standard university tuition rates apply with installment flexibility.";

  if (ssc === 5.0 && hsc === 5.0) {
    waiver = 75;
    title = "Merit Scholarship (Golden GPA 5.0)";
    description = "Outstanding academic achievement! 75% tuition fee waiver granted for the entire program duration.";
  } else if (totalGpa >= 9.5) {
    waiver = 50;
    title = "High Achiever Scholarship";
    description = "Excellent results! 50% waiver applied across all undergraduate credit fees.";
  } else if (totalGpa >= 9.0) {
    waiver = 30;
    title = "Academic Distinction Waiver";
    description = "30% tuition waiver for securing combined GPA 9.0+ in SSC and HSC.";
  } else if (totalGpa >= 8.0) {
    waiver = 15;
    title = "General Merit Waiver";
    description = "15% waiver applicable on standard semester tuition fees.";
  }

  const waiverAmount = (prog.baseTuition * waiver) / 100;
  return {
    waiverPercent: waiver,
    title,
    description,
    estimatedTuition: prog.baseTuition,
    finalTuition: prog.baseTuition - waiverAmount,
  };
}

export function TuitionWaiverCalculator() {
  const [sscGpa, setSscGpa] = useState<string>("5.0");
  const [hscGpa, setHscGpa] = useState<string>("5.0");
  const [selectedProgram, setSelectedProgram] = useState<string>("cse");
  const [result, setResult] = useState<WaiverResult>(() => computeWaiver("cse", "5.0", "5.0"));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(computeWaiver(selectedProgram, sscGpa, hscGpa));
  };

  return (
    <section id="calculator" className="py-24 bg-[#061523] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5" />
            Instant Fee Assessment
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Calculate Your Tuition Waiver &amp; Scholarship
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Enter your SSC &amp; HSC GPAs to calculate your eligible merit scholarship percentage and transparent net program tuition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Side */}
          <div className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-center">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label htmlFor="calc-program" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Select Desired Academic Program
                </label>
                <select
                  id="calc-program"
                  value={selectedProgram}
                  onChange={(e) => {
                    const nextProg = e.target.value;
                    setSelectedProgram(nextProg);
                    setResult(computeWaiver(nextProg, sscGpa, hscGpa));
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="calc-ssc" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    SSC / O-Level GPA (Max 5.0)
                  </label>
                  <input
                    id="calc-ssc"
                    type="number"
                    step="0.01"
                    min="2.5"
                    max="5.0"
                    value={sscGpa}
                    onChange={(e) => setSscGpa(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="calc-hsc" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    HSC / A-Level GPA (Max 5.0)
                  </label>
                  <input
                    id="calc-hsc"
                    type="number"
                    step="0.01"
                    min="2.5"
                    max="5.0"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Recalculate Scholarship Estimate
              </button>
            </form>
          </div>

          {/* Result Side */}
          <div className="lg:col-span-6">
            <div className="h-full bg-gradient-to-br from-[#0d2238] via-slate-900 to-[#071523] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-emerald-500/30 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-xs uppercase font-black tracking-wider text-emerald-300">
                      Eligible Waiver Result
                    </span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase">
                    {result.waiverPercent}% Off
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white">{result.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">{result.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/70 p-5 rounded-2xl border border-white/10">
                <div>
                  <div className="text-xs text-slate-400">Regular Program Fee</div>
                  <div className="text-lg font-bold line-through text-slate-400 mt-1">
                    ৳ {result.estimatedTuition.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-300 font-semibold">Your Net Tuition Fee</div>
                  <div className="text-2xl font-serif font-bold text-amber-400 mt-0.5">
                    ৳ {result.finalTuition.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Up to 100% additional financial aid for Freedom Fighter &amp; need-based scholars.</span>
                </div>
                <Link
                  href="/apply"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                >
                  Claim Scholarship &amp; Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
