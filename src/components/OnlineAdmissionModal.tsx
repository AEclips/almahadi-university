"use client";

import React, { useState } from "react";
import { User, Mail, Phone, BookOpen, Send, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { NativeDialog } from "./NativeDialog";

export function OnlineAdmissionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "B.Sc. in CSE",
    sscGpa: "5.0",
    hscGpa: "5.0",
  });

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

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
    } catch {
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeDialog
      isOpen={isOpen}
      onClose={handleClose}
      titleId="fast-admission-title"
      title="Spring 2026 Fast-Track Application"
      maxWidthClass="max-w-lg"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Application Submitted!</h3>
          <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your admission record has been officially saved to the university admissions database.
          </p>
          {applicationId && (
            <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold py-2.5 px-4 rounded-xl inline-block">
              Application Tracking ID: {applicationId}
            </div>
          )}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider px-8 py-3 rounded-xl transition shadow-lg"
            >
              Close Window
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-5">
            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              AMIU Admissions Intake
            </span>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Submit this quick inquiry form to reserve your Spring 2026 priority interview slot and merit waiver evaluation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  Phone / Mobile
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Select Target Program
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option>B.Sc. in CSE</option>
                  <option>B.Sc. in Software Engineering</option>
                  <option>Bachelor of Business Administration (BBA)</option>
                  <option>B.Sc. in EEE</option>
                  <option>Bachelor of Pharmacy</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  SSC GPA
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
                  className="w-full px-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  HSC GPA
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
                  className="w-full px-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Encrypted application submission connected to AMIU Admissions API.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </NativeDialog>
  );
}
