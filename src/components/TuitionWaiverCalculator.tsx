"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "./KineticEffects";

const PROGRAMS = [
  { id: "cse", name: "B.Sc. in Computer Science & Engineering (CSE)", baseTuition: 850000 },
  { id: "swe", name: "B.Sc. in Software Engineering (SWE)", baseTuition: 780000 },
  { id: "bba", name: "Bachelor of Business Administration (BBA)", baseTuition: 620000 },
  { id: "eee", name: "B.Sc. in Electrical & Electronic Engineering (EEE)", baseTuition: 720000 },
  { id: "eng", name: "B.A. (Hons) in English", baseTuition: 450000 },
  { id: "pharm", name: "Bachelor of Pharmacy (B.Pharm)", baseTuition: 920000 },
];

const MERIT_PRESETS = [
  { label: "Golden GPA 5.0 (75%)", ssc: "5.00", hsc: "5.00" },
  { label: "High Achiever 9.5+ (50%)", ssc: "4.80", hsc: "4.75" },
  { label: "Distinction 9.0+ (30%)", ssc: "4.50", hsc: "4.55" },
  { label: "Merit 8.0+ (15%)", ssc: "4.10", hsc: "4.15" },
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

  if (ssc >= 4.99 && hsc >= 4.99) {
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
  const [sscGpa, setSscGpa] = useState<string>("5.00");
  const [hscGpa, setHscGpa] = useState<string>("5.00");
  const [selectedProgram, setSelectedProgram] = useState<string>("cse");
  const [result, setResult] = useState<WaiverResult>(() => computeWaiver("cse", "5.00", "5.00"));

  const applyGpaValues = (nextProgram: string, nextSsc: string, nextHsc: string) => {
    setSelectedProgram(nextProgram);
    setSscGpa(nextSsc);
    setHscGpa(nextHsc);
    setResult(computeWaiver(nextProgram, nextSsc, nextHsc));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(computeWaiver(selectedProgram, sscGpa, hscGpa));
  };

  const savings = result.estimatedTuition - result.finalTuition;
  const barWidthPercent = Math.min(100, Math.round((result.waiverPercent / 75) * 100));

  return (
    <section id="calculator" className="py-24 bg-[#061523] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3 kinetic-reveal">
          <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5" />
            Instant Fee Assessment
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Calculate Your Tuition Waiver &amp; Scholarship
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag the GPA sliders or choose a merit scenario to see live scholarship coverage and net program tuition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch kinetic-reveal">
          {/* Form Side */}
          <SpotlightCard className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-center">
            <form onSubmit={handleCalculate} className="space-y-6 relative z-10">
              {/* Quick Merit Scenario Presets */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Quick Merit Scenarios
                </span>
                <div className="flex flex-wrap gap-2">
                  {MERIT_PRESETS.map((preset) => {
                    const isActive =
                      parseFloat(sscGpa).toFixed(2) === preset.ssc &&
                      parseFloat(hscGpa).toFixed(2) === preset.hsc;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyGpaValues(selectedProgram, preset.ssc, preset.hsc)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition ${
                          isActive
                            ? "bg-amber-400 text-slate-950 shadow-md"
                            : "bg-slate-950/80 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/40"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="calc-program" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Select Desired Academic Program
                </label>
                <select
                  id="calc-program"
                  value={selectedProgram}
                  onChange={(e) => applyGpaValues(e.target.value, sscGpa, hscGpa)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SSC & HSC Tactile Sliders + Number Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="calc-ssc" className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      SSC / O-Level GPA
                    </label>
                    <input
                      id="calc-ssc"
                      type="number"
                      step="0.05"
                      min="2.5"
                      max="5.0"
                      value={sscGpa}
                      onChange={(e) => applyGpaValues(selectedProgram, e.target.value, hscGpa)}
                      className="w-20 bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-right text-sm font-mono font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      required
                    />
                  </div>
                  <input
                    aria-label="Adjust SSC GPA slider"
                    type="range"
                    min="2.5"
                    max="5.0"
                    step="0.05"
                    value={Math.min(5, Math.max(2.5, parseFloat(sscGpa) || 2.5))}
                    onChange={(e) => applyGpaValues(selectedProgram, parseFloat(e.target.value).toFixed(2), hscGpa)}
                    className="amiu-slider w-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>2.50</span>
                    <span>4.00</span>
                    <span>5.00</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="calc-hsc" className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      HSC / A-Level GPA
                    </label>
                    <input
                      id="calc-hsc"
                      type="number"
                      step="0.05"
                      min="2.5"
                      max="5.0"
                      value={hscGpa}
                      onChange={(e) => applyGpaValues(selectedProgram, sscGpa, e.target.value)}
                      className="w-20 bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-right text-sm font-mono font-bold text-emerald-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      required
                    />
                  </div>
                  <input
                    aria-label="Adjust HSC GPA slider"
                    type="range"
                    min="2.5"
                    max="5.0"
                    step="0.05"
                    value={Math.min(5, Math.max(2.5, parseFloat(hscGpa) || 2.5))}
                    onChange={(e) => applyGpaValues(selectedProgram, sscGpa, parseFloat(e.target.value).toFixed(2))}
                    className="amiu-slider w-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>2.50</span>
                    <span>4.00</span>
                    <span>5.00</span>
                  </div>
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
          </SpotlightCard>

          {/* Result Side */}
          <SpotlightCard className="lg:col-span-6 bg-gradient-to-br from-[#0d2238] via-slate-900 to-[#071523] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-emerald-500/30 flex flex-col justify-between space-y-6">
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

            {/* Waiver Coverage Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Scholarship Waiver Coverage</span>
                <span className="text-emerald-300 font-mono">
                  You Save: ৳ {savings.toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-950/90 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>
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

            <div className="space-y-3 relative z-10">
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
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
