"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { 
  GraduationCap, BookOpen, Clock, Calendar, CheckCircle2, AlertCircle, 
  ArrowLeft, FileText, User, Bell, Download, ShieldCheck, DollarSign
} from "lucide-react";
import Link from "next/link";

export default function StudentPortalDemo() {
  const [studentId, setStudentId] = useState("261-15-9988");
  const [activeTab, setActiveTab] = useState("courses");

  const enrolledCourses = [
    { code: "CSE-411", title: "Advanced Artificial Intelligence & Neural Nets", credits: 3.0, section: "60_A", grade: "A+", faculty: "Dr. Al Mahadi" },
    { code: "SWE-423", title: "Microservices & Cloud Native Systems", credits: 3.0, section: "60_B", grade: "A", faculty: "Prof. Sarah Jenkins" },
    { code: "CSE-412", title: "Deep Learning & Computer Vision Lab", credits: 1.5, section: "60_A1", grade: "A+", faculty: "Dr. Nusrat Jahan" },
    { code: "FER-302", title: "Robotics Kinematics & Embedded Firmware", credits: 3.0, section: "60_R", grade: "A-", faculty: "Dr. Tariqul Islam" },
  ];

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
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-9 h-9 object-contain" />
            <span className="font-serif font-black text-lg text-white">AMIU Smart ERP Student Portal</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-400/20">
              HP
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-white">Mukto (HP)</h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  Verified Scholar
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Student ID: <strong className="text-amber-400 font-mono">{studentId}</strong> | B.Sc. in Computer Science & Engineering (Honors)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 bg-slate-950/60 p-4 rounded-2xl border border-white/5 text-center">
            <div>
              <div className="text-xl font-black text-emerald-400">3.98</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">CGPA</div>
            </div>
            <div>
              <div className="text-xl font-black text-white">132.0</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Credits Passed</div>
            </div>
            <div>
              <div className="text-xl font-black text-amber-400">0.00 ৳</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Dues Status</div>
            </div>
          </div>
        </div>

        {/* Portal Nav Tabs */}
        <div className="flex space-x-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: "courses", label: "Registered Courses & Routine" },
            { id: "grades", label: "Semester Grade Sheet" },
            { id: "accounts", label: "Fee Payment & Financial Aid" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Table */}
        <div className="bg-slate-800/70 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">Spring 2026 Academic Course Registration</h3>
              <p className="text-xs text-slate-400">Total Enrolled Credits: 10.5 | Semester: 12th (Graduation Candidate)</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition shadow-lg">
              <Download className="w-3.5 h-3.5" />
              Download Admit Card
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Course Code</th>
                  <th className="py-4 px-6">Course Title</th>
                  <th className="py-4 px-6">Section</th>
                  <th className="py-4 px-6">Credits</th>
                  <th className="py-4 px-6">Instructor</th>
                  <th className="py-4 px-6">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {enrolledCourses.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-700/30 transition">
                    <td className="py-4 px-6 font-mono font-bold text-amber-400">{c.code}</td>
                    <td className="py-4 px-6 font-semibold text-white">{c.title}</td>
                    <td className="py-4 px-6">{c.section}</td>
                    <td className="py-4 px-6 font-bold">{c.credits}</td>
                    <td className="py-4 px-6 text-slate-400">{c.faculty}</td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                        Mid-Term: {c.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
