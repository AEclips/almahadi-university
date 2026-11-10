"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export function TuitionWaiverCalculator() {
  const [sscGpa, setSscGpa] = useState<string>("5.0");
  const [hscGpa, setHscGpa] = useState<string>("5.0");
  const [selectedProgram, setSelectedProgram] = useState<string>("cse");
  const [result, setResult] = useState<{
    waiverPercent: number;
    title: string;
    description: string;
    estimatedTuition: number;
    finalTuition: number;
  } | null>(null);

  const programs = [
    { id: "cse", name: "B.Sc. in Computer Science & Engineering (CSE)", baseTuition: 850000 },
    { id: "swe", name: "B.Sc. in Software Engineering (SWE)", baseTuition: 780000 },
    { id: "bba", name: "Bachelor of Business Administration (BBA)", baseTuition: 620000 },
    { id: "eee", name: "B.Sc. in Electrical & Electronic Engineering (EEE)", baseTuition: 720000 },
    { id: "eng", name: "B.A. (Hons) in English", baseTuition: 450000 },
    { id: "pharm", name: "Bachelor of Pharmacy (B.Pharm)", baseTuition: 920000 },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const ssc = parseFloat(sscGpa) || 0;
    const hsc = parseFloat(hscGpa) || 0;
    const totalGpa = ssc + hsc;

    const prog = programs.find((p) => p.id === selectedProgram) || programs[0];

    let waiver = 0;
    let title = "Regular Tuition";
    let desc = "Standard university tuition rates apply.";

    if (ssc === 5.0 && hsc === 5.0) {
      waiver = 75;
      title = "Merit Scholarship (Golden GPA 5.0)";
      desc = "Outstanding academic achievement! 75% tuition fee waiver granted for entire program duration.";
    } else if (totalGpa >= 9.5) {
      waiver = 50;
      title = "High Achiever Scholarship";
      desc = "Excellent results! 50% waiver applied on all credit fees.";
    } else if (totalGpa >= 9.0) {
      waiver = 30;
      title = "Academic Distinction Waiver";
      desc = "30% tuition waiver for securing combined GPA 9.0+ in SSC and HSC.";
    } else if (totalGpa >= 8.0) {
      waiver = 15;
      title = "General Merit Waiver";
      desc = "15% waiver applicable on standard tuition fees.";
    }

    const waiverAmount = (prog.baseTuition * waiver) / 100;
    const finalFee = prog.baseTuition - waiverAmount;

    setResult({
      waiverPercent: waiver,
      title,
      description: desc,
      estimatedTuition: prog.baseTuition,
      finalTuition: finalFee,
    });
  };

  return (
    <section id="calculator" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-diu-green font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Instant Fee Assessment
          </span>
          <h2 className="text-3xl font-extrabold text-diu-navy">
            Calculate Your Tuition Waiver & Scholarship
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Enter your SSC & HSC GPAs to instantly calculate your eligible scholarship percentage and final tuition fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Select Desired Academic Program
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-diu-green"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    SSC / O-Level GPA (Max 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.5"
                    max="5.0"
                    value={sscGpa}
                    onChange={(e) => setSscGpa(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-diu-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    HSC / A-Level GPA (Max 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.5"
                    max="5.0"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-diu-green"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-diu-green hover:bg-diu-green-dark text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculate Scholarship
              </button>
            </form>
          </div>

          {/* Result Side */}
          <div className="lg:col-span-6">
            {result ? (
              <div className="bg-gradient-to-br from-diu-navy to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-diu-gold" />
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      Eligible Waiver Result
                    </span>
                  </div>
                  <span className="bg-diu-gold text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    {result.waiverPercent}% Off
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">{result.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">{result.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div>
                    <div className="text-xs text-slate-400">Regular Program Fee</div>
                    <div className="text-lg font-bold line-through text-slate-400">
                      ৳ {result.estimatedTuition.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-emerald-400 font-semibold">Your Final Fee</div>
                    <div className="text-2xl font-black text-diu-gold">
                      ৳ {result.finalTuition.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#apply"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    Claim Scholarship & Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center text-slate-500">
                <Calculator className="w-12 h-12 text-slate-300 mb-3" />
                <h4 className="font-bold text-slate-700">No Assessment Calculated Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Fill in your GPA information on the left and click calculate to view your personalized tuition waiver.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
