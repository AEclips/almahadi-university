"use client";

import React, { useState } from "react";
import { Bell, Search, Calendar, FileText, Download, Tag, ChevronRight } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  category: "Academic" | "Exam" | "Financial" | "General";
  date: string;
  pdfUrl?: string;
  isImportant?: boolean;
}

export function NoticeBoardSection() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const notices: Notice[] = [
    {
      id: "N-101",
      title: "Schedule of Final Examination for Fall Semester 2025 (All Departments)",
      category: "Exam",
      date: "Nov 08, 2025",
      isImportant: true,
    },
    {
      id: "N-102",
      title: "Special 75% Tuition Fee Waiver Announcement for Spring 2026 Admissions",
      category: "Financial",
      date: "Nov 06, 2025",
      isImportant: true,
    },
    {
      id: "N-103",
      title: "Course Registration for Spring 2026 Semester Begins on November 15",
      category: "Academic",
      date: "Nov 04, 2025",
    },
    {
      id: "N-104",
      title: "Submission of Internship / Project Reports for Final Year Students",
      category: "Academic",
      date: "Nov 02, 2025",
    },
    {
      id: "N-105",
      title: "Notice regarding 11th Convocation Registration Deadline Extension",
      category: "General",
      date: "Oct 30, 2025",
    },
    {
      id: "N-106",
      title: "Mid-Term Grade Improvement / Retake Exam Application Form Available",
      category: "Exam",
      date: "Oct 25, 2025",
    },
  ];

  const categories = ["All", "Academic", "Exam", "Financial", "General"];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = activeTab === "All" || notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="notice" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-diu-green font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
              <Bell className="w-3.5 h-3.5" />
              Official Circulars
            </span>
            <h2 className="text-3xl font-extrabold text-diu-navy">Notice Board & Circulars</h2>
            <p className="text-slate-600 text-sm mt-1">
              Stay updated with academic schedules, exam dates, scholarship notices, and administrative announcements.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-diu-green shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === cat
                  ? "bg-diu-green text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-5 sm:p-6 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-500 group-hover:text-diu-green flex flex-col items-center justify-center flex-shrink-0 transition">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-bold mt-0.5">
                      {notice.date.split(",")[0].split(" ")[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-diu-green bg-emerald-50 px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      {notice.isImportant && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-slate-400">• {notice.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-diu-green transition cursor-pointer">
                      {notice.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-diu-green border border-slate-200 rounded-lg px-3 py-2 bg-white shadow-2xl transition">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-500">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-sm">No notices found matching your query.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
