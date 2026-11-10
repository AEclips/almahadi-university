"use client";

import React, { useState } from "react";
import { User, Mail, Phone, BookOpen, Send, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

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

  if (!isOpen) return null;

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
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-diu-green rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-diu-navy">Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Your admission record has been officially saved to the admissions database.
            </p>
            {applicationId && (
              <div className="bg-emerald-50 border border-emerald-200 text-diu-green font-mono text-xs font-bold py-2 px-4 rounded-xl inline-block">
                Application Tracking ID: {applicationId}
              </div>
            )}
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-diu-green hover:bg-diu-green-dark text-white font-bold px-8 py-3 rounded-xl transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-diu-green uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                Spring 2026 Admissions
              </span>
              <h3 className="text-2xl font-black text-diu-navy mt-2">
                Fast-Track Online Application
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out this quick form to reserve your admission seat and scholarship discount.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Phone / Mobile
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Select Target Program
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green bg-white"
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
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
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
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
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
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted application submission connected to Next.js API.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-diu-green hover:bg-diu-green-dark text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-75"
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
      </div>
    </div>
  );
}
