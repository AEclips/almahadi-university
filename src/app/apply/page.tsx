"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { 
  ArrowLeft, Send, CheckCircle2, ShieldCheck, User, Mail, Phone, BookOpen, 
  Award, GraduationCap, MapPin, Calendar, Clock, Sparkles, Loader2 
} from "lucide-react";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "B.Sc. in Computer Science & Engineering (CSE)",
    sscGpa: "5.0",
    hscGpa: "5.0",
    address: "Dhaka, Bangladesh",
    gender: "Male",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setApplicationId(data.applicationId);
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit application.");
      }
    } catch (err) {
      alert("Error connecting to admissions server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <TopUtilityBar />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#061422]/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to University Main</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-serif font-black text-lg text-white block leading-none">AL MAHADI</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-0.5">Admissions Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-16 px-4 max-w-5xl mx-auto w-full">
        {submitted ? (
          <div className="bg-slate-800/80 border border-emerald-500/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                Admission Application Confirmed
              </span>
              <h2 className="text-3xl font-black text-white pt-2">Congratulations, {formData.name}!</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your admission record for Spring 2026 has been successfully registered in the central university database.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-400/30 rounded-2xl p-6 text-center space-y-2">
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Your Official Tracking ID</div>
              <div className="text-3xl font-mono font-black text-amber-400 tracking-wider">{applicationId}</div>
              <div className="text-xs text-slate-400">Selected: <strong className="text-white">{formData.program}</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/portal"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg"
              >
                Go to Student Portal
              </Link>
              <Link
                href="/"
                className="bg-slate-700/60 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition border border-white/10"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Spring 2026 Admissions
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Apply for Undergraduate & Graduate Degrees
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                Take your first step toward an internationally accredited degree with world-class faculty, smart campus labs, and merit scholarship waivers up to 100%.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Merit Scholarship Guarantee</h4>
                    <p className="text-slate-400">Golden GPA 5.0 unlocks up to 75% - 100% tuition waiver.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Direct Counselor Verification</h4>
                    <p className="text-slate-400">Admissions counselor will verify transcripts and guide enrollment within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Fast-Track Decision</h4>
                    <p className="text-slate-400">Instant tracking ID provided immediately upon submission.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-7 bg-slate-800/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              <h2 className="text-xl font-black text-white mb-6 pb-4 border-b border-white/10">
                Official Admission Application Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Full Name (as per SSC certificate)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al Mahadi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Target Academic Program
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                    >
                      <option>B.Sc. in Computer Science & Engineering (CSE)</option>
                      <option>B.Sc. in Software Engineering (SWE)</option>
                      <option>B.Sc. in Artificial Intelligence & Data Science</option>
                      <option>B.Sc. in Robotics & Mechatronics Engineering</option>
                      <option>B.Sc. in Electrical & Electronic Engineering (EEE)</option>
                      <option>Bachelor of Business Administration (BBA)</option>
                      <option>B.Sc. in Tech Entrepreneurship & E-Commerce</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      SSC / O-Level GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="2.5"
                      max="5.0"
                      required
                      placeholder="5.00"
                      value={formData.sscGpa}
                      onChange={(e) => setFormData({ ...formData, sscGpa: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      HSC / A-Level GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="2.5"
                      max="5.0"
                      required
                      placeholder="5.00"
                      value={formData.hscGpa}
                      onChange={(e) => setFormData({ ...formData, hscGpa: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner font-mono font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering Application...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Final Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
