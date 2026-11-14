"use client";

import React, { useState } from "react";
import { Bell, Search, Calendar, FileText, Download, ArrowRight } from "lucide-react";
import { NativeDialog } from "./NativeDialog";

interface Notice {
  id: string;
  title: string;
  category: "Academic" | "Exam" | "Financial" | "General";
  date: string;
  memoRef: string;
  summary: string;
  issuedBy: string;
  isImportant?: boolean;
}

const NOTICES: Notice[] = [
  {
    id: "N-101",
    title: "Schedule of Final Examination for Fall Semester 2025 (All Departments)",
    category: "Exam",
    date: "Nov 08, 2025",
    memoRef: "AMIU/COE/FALL-25/412",
    issuedBy: "Office of the Controller of Examinations",
    summary:
      "All undergraduate and graduate final written examinations for Fall Semester 2025 will commence from November 24 across Engineering, Science, and Business blocks. Students must download their digital Admit Card from the Student ERP Portal prior to exam week.",
    isImportant: true,
  },
  {
    id: "N-102",
    title: "Special 75% Tuition Fee Waiver Announcement for Spring 2026 Admissions",
    category: "Financial",
    date: "Nov 06, 2025",
    memoRef: "AMIU/ADM/WAIVER-26/109",
    issuedBy: "Office of Admissions & Financial Aid",
    summary:
      "Applicants securing Golden GPA 5.0 in both SSC and HSC (or equivalent O/A-Level distinction) qualify automatically for a 75% tuition waiver across 12 semesters. Additional full-tuition fellowships are awarded via faculty board interview.",
    isImportant: true,
  },
  {
    id: "N-103",
    title: "Course Registration for Spring 2026 Semester Begins on November 15",
    category: "Academic",
    date: "Nov 04, 2025",
    memoRef: "AMIU/REG/SPR-26/204",
    issuedBy: "Office of the Registrar",
    summary:
      "Online course advising and add/drop windows open inside the AMIU Smart ERP Portal from November 15. Honors seniors in their final year may consult departmental advisors for Capstone Thesis pairing.",
  },
  {
    id: "N-104",
    title: "Submission of Internship / Project Reports for Final Year Students",
    category: "Academic",
    date: "Nov 02, 2025",
    memoRef: "AMIU/ACAD/THESIS-25/88",
    issuedBy: "Dean's Academic Committee",
    summary:
      "Graduating seniors submitting capstone engineering prototypes or industry internship defense dossiers must upload final LaTeX PDF manuscripts along with faculty supervisor endorsement before December 01.",
  },
  {
    id: "N-105",
    title: "Notice regarding 11th Convocation Registration Deadline Extension",
    category: "General",
    date: "Oct 30, 2025",
    memoRef: "AMIU/CONV/11-26/051",
    issuedBy: "Convocation Organizing Secretariat",
    summary:
      "Eligible graduates for the 11th Grand Convocation at Central Green Plaza may finalize gown sizing and guest pass reservations through January 10 via the Alumni & Registrar desk.",
  },
  {
    id: "N-106",
    title: "Mid-Term Grade Improvement / Retake Exam Application Form Available",
    category: "Exam",
    date: "Oct 25, 2025",
    memoRef: "AMIU/COE/IMP-25/318",
    issuedBy: "Office of the Controller of Examinations",
    summary:
      "Students wishing to sit for approved mid-term improvement assessments should submit online clearance forms via their Student ERP dashboard before Friday 5:00 PM.",
  },
];

export function NoticeBoardSection() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadNotice, setDownloadNotice] = useState<string>("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleNoticeDownload = (id: string, title: string) => {
    setDownloadNotice(`Downloading official circular ${id}: "${title.slice(0, 42)}..."`);
    setTimeout(() => {
      setDownloadNotice("");
    }, 3500);
  };

  const categories = ["All", "Academic", "Exam", "Financial", "General"];

  const filteredNotices = NOTICES.filter((notice) => {
    const matchesCategory = activeTab === "All" || notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="notice" className="py-24 bg-slate-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2.5">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" />
              Official Circulars
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Notice Board &amp; Circulars
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Academic calendars, exam schedules, merit waiver circulars, and university registrar announcements.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search notices..."
              aria-label="Search university notices"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            />
          </div>
        </div>

        {downloadNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-sm">
            <span>{downloadNotice}</span>
            <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-mono">PDF Ready</span>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === cat
                  ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="bg-slate-800/50 rounded-3xl border border-white/10 shadow-2xl divide-y divide-white/10 overflow-hidden">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-5 sm:p-6 hover:bg-slate-800/90 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 group-hover:border-amber-400/40 text-emerald-300 group-hover:text-amber-300 flex flex-col items-center justify-center flex-shrink-0 transition">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-bold mt-0.5">
                      {notice.date.split(",")[0].split(" ")[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {notice.category}
                      </span>
                      {notice.isImportant && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-slate-400">• {notice.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(notice)}
                      className="text-left text-base font-bold text-white group-hover:text-amber-300 transition cursor-pointer"
                    >
                      {notice.title}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(notice)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-amber-300 border border-white/15 hover:border-amber-400/50 rounded-xl px-3.5 py-2 bg-slate-900/80 transition"
                  >
                    <span>Read Circular</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNoticeDownload(notice.id, notice.title)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl px-3.5 py-2 shadow-sm transition active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400">
              <FileText className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="font-semibold text-sm text-white">No notices found matching your query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Circular Reader Native Dialog */}
      <NativeDialog
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        titleId="notice-reader-title"
        title={selectedNotice ? `${selectedNotice.id} — Official Circular` : "Official Circular"}
        maxWidthClass="max-w-xl"
      >
        {selectedNotice && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                {selectedNotice.category}
              </span>
              <span className="font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-white/10">
                Ref: {selectedNotice.memoRef}
              </span>
              <span className="text-slate-400 ml-auto">{selectedNotice.date}</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-white leading-snug">
              {selectedNotice.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-5 rounded-2xl border border-white/10">
              {selectedNotice.summary}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs">
              <div>
                <div className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                  Issued By
                </div>
                <div className="text-white font-semibold mt-0.5">{selectedNotice.issuedBy}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleNoticeDownload(selectedNotice.id, selectedNotice.title);
                  setSelectedNotice(null);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                Download Official PDF
              </button>
            </div>
          </div>
        )}
      </NativeDialog>
    </section>
  );
}
