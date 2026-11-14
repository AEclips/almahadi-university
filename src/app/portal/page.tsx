"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NativeDialog } from "@/components/NativeDialog";
import {
  CheckCircle2,
  ArrowLeft,
  Download,
  ShieldCheck,
  Award,
  PlusCircle,
  Trash2,
  CreditCard,
  AlertTriangle,
  Receipt,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CourseItem {
  code: string;
  title: string;
  credits: number;
  section: string;
  grade: string;
  faculty: string;
  schedule: string;
}

interface TransactionItem {
  id: string;
  title: string;
  method: string;
  amount: string;
  date: string;
  status: string;
}

const INITIAL_COURSES: CourseItem[] = [
  {
    code: "CSE-411",
    title: "Advanced Artificial Intelligence & Neural Nets",
    credits: 3.0,
    section: "60_A",
    grade: "A+",
    faculty: "Dr. Al Mahadi",
    schedule: "Sun / Tue 09:30 AM",
  },
  {
    code: "SWE-423",
    title: "Microservices & Cloud Native Systems",
    credits: 3.0,
    section: "60_B",
    grade: "A",
    faculty: "Prof. Sarah Jenkins",
    schedule: "Mon / Wed 11:00 AM",
  },
  {
    code: "CSE-412",
    title: "Deep Learning & Computer Vision Lab",
    credits: 1.5,
    section: "60_A1",
    grade: "A+",
    faculty: "Dr. Nusrat Jahan",
    schedule: "Thu 09:00 AM",
  },
  {
    code: "FER-302",
    title: "Robotics Kinematics & Embedded Firmware",
    credits: 3.0,
    section: "60_R",
    grade: "A-",
    faculty: "Dr. Tariqul Islam",
    schedule: "Sun / Tue 02:00 PM",
  },
];

const ELECTIVE_CATALOG: CourseItem[] = [
  {
    code: "CSE-435",
    title: "Quantum Computing & Qiskit Algorithms",
    credits: 3.0,
    section: "60_Q",
    grade: "Enrolled",
    faculty: "Dr. Al Mahadi",
    schedule: "Mon 02:30 PM",
  },
  {
    code: "CSE-442",
    title: "Agentic AI Systems & Tool Orchestration",
    credits: 3.0,
    section: "60_AI",
    grade: "Enrolled",
    faculty: "Dr. Nusrat Jahan",
    schedule: "Wed 02:00 PM",
  },
  {
    code: "MGT-310",
    title: "Venture Capital & FinTech Scaling",
    credits: 3.0,
    section: "60_F",
    grade: "Enrolled",
    faculty: "Prof. David Vance",
    schedule: "Wed 02:00 PM",
  },
];

export default function StudentPortalDemo() {
  const [studentId] = useState("261-15-9988");
  const [activeTab, setActiveTab] = useState("courses");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [downloadMsg, setDownloadMsg] = useState("");
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [courseConflictMsg, setCourseConflictMsg] = useState("");

  // Payment Gateway State
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [payFeeItem, setPayFeeItem] = useState("NVIDIA Supercomputing Lab & Graduation Gown Fee (৳ 3,500)");
  const [payMethod, setPayMethod] = useState<"bKash" | "Nagad" | "Visa / Mastercard">("bKash");
  const [payAccount, setPayAccount] = useState("");
  const [payPin, setPayPin] = useState("");
  const [paidReceipt, setPaidReceipt] = useState<TransactionItem | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: "TXN-AMIU-89412",
      title: "Spring 2026 Semester Registration & Library Fee",
      method: "100% Merit Scholarship + Digital Clearance",
      amount: "৳ 0.00 (Waived)",
      date: "Jan 15, 2026",
      status: "Verified",
    },
  ]);

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const isLight = resolvedTheme === "light";

  const gradeHistory = [
    { semester: "Spring 2026 (Ongoing)", gpa: "3.98 (Projected)", credits: totalCredits, status: "Registered" },
    { semester: "Fall 2025", gpa: "4.00", credits: 15.0, status: "Dean's Honors List" },
    { semester: "Summer 2025", gpa: "3.96", credits: 12.0, status: "Chancellor's Honor" },
    { semester: "Spring 2025", gpa: "3.98", credits: 15.0, status: "Dean's Honors List" },
  ];

  const handleDownload = () => {
    setDownloadMsg("Generating encrypted official PDF admit card...");
    setTimeout(() => {
      setDownloadMsg("Official Admit Card (Spring 2026 Final) downloaded successfully!");
      setTimeout(() => setDownloadMsg(""), 4000);
    }, 800);
  };

  const handleAddCourse = (elective: CourseItem) => {
    setCourseConflictMsg("");
    if (courses.some((c) => c.code === elective.code)) return;

    const conflicting = courses.find((c) => c.schedule === elective.schedule);
    if (conflicting) {
      setCourseConflictMsg(
        `Schedule clash detected: ${elective.code} conflicts with ${conflicting.code} (${conflicting.schedule}). Drop ${conflicting.code} first to enroll.`
      );
      return;
    }

    setCourses((prev) => [...prev, elective]);
  };

  const handleDropCourse = (code: string) => {
    setCourseConflictMsg("");
    setCourses((prev) => prev.filter((c) => c.code !== code));
  };

  const handleOpenPayment = () => {
    setPaidReceipt(null);
    setPayAccount("");
    setPayPin("");
    setIsPayOpen(true);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const amountMatch = payFeeItem.match(/৳\s*[\d,]+/);
    const amountLabel = amountMatch ? amountMatch[0] : "৳ 3,500";
    const newTxn: TransactionItem = {
      id: "TXN-AMIU-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      title: payFeeItem.replace(/\s*\(.*?\)/, ""),
      method: payMethod,
      amount: amountLabel,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Paid & Cleared",
    };
    setTransactions((prev) => [newTxn, ...prev]);
    setPaidReceipt(newTxn);
  };

  return (
    <div className="min-h-screen flex flex-col erp-surface font-sans transition-colors duration-200">
      <TopUtilityBar />

      <header className="sticky top-0 z-40 bg-[#061422]/95 backdrop-blur-2xl border-b border-white/10 py-4 px-4 sm:px-6 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to University Main</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle onResolvedThemeChange={setResolvedTheme} />
            <div className="hidden md:flex items-center gap-2.5">
              <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-9 h-9 object-contain" />
              <span className="font-serif font-black text-base text-white">AMIU Smart ERP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Student Profile Card */}
        <div className="erp-card border rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-400/20">
              HP
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className={`text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
                  Mukto (HP)
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  Verified Scholar
                </span>
              </div>
              <p className="text-xs erp-muted mt-1">
                Student ID: <strong className="text-amber-500 font-mono">{studentId}</strong> | B.Sc. in Computer Science & Engineering (Honors)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 erp-subcard border p-4 rounded-2xl text-center">
            <div>
              <div className="text-xl font-black text-emerald-500">3.98</div>
              <div className="text-[10px] erp-muted uppercase font-bold">CGPA</div>
            </div>
            <div>
              <div className={`text-xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>132.0</div>
              <div className="text-[10px] erp-muted uppercase font-bold">Credits Passed</div>
            </div>
            <div>
              <div className="text-xl font-black text-amber-500">0.00 ৳</div>
              <div className="text-[10px] erp-muted uppercase font-bold">Dues Status</div>
            </div>
          </div>
        </div>

        {downloadMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {downloadMsg}
          </div>
        )}

        {/* Portal Nav Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-500/20 pb-4 mb-8">
          {[
            { id: "courses", label: "Registered Courses & Add/Drop" },
            { id: "grades", label: "Semester Grade Sheet" },
            { id: "accounts", label: "Fee Payment & Financial Aid" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                  : isLight
                  ? "bg-white text-slate-700 hover:bg-slate-200 border border-slate-300"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses & Automated Add/Drop Tab */}
        {activeTab === "courses" && (
          <div className="space-y-8">
            <div className="erp-card border rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                    Spring 2026 Academic Course Registration
                  </h3>
                  <p className="text-xs erp-muted">
                    Total Enrolled Credits: <strong className="text-amber-500">{totalCredits.toFixed(1)}</strong> | Semester: 12th (Graduation Candidate)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Admit Card
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="erp-subcard erp-muted uppercase tracking-wider text-[10px] border-b border-slate-500/20">
                    <tr>
                      <th className="py-4 px-6">Course Code</th>
                      <th className="py-4 px-6">Course Title</th>
                      <th className="py-4 px-6">Schedule</th>
                      <th className="py-4 px-6">Credits</th>
                      <th className="py-4 px-6">Instructor</th>
                      <th className="py-4 px-6">Action / Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-500/15">
                    {courses.map((c) => {
                      const isElective = ELECTIVE_CATALOG.some((e) => e.code === c.code);
                      return (
                        <tr key={c.code} className="hover:bg-amber-400/5 transition">
                          <td className="py-4 px-6 font-mono font-bold text-amber-500">{c.code}</td>
                          <td className={`py-4 px-6 font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                            {c.title}
                          </td>
                          <td className="py-4 px-6 erp-muted">{c.schedule}</td>
                          <td className="py-4 px-6 font-bold">{c.credits.toFixed(1)}</td>
                          <td className="py-4 px-6 erp-muted">{c.faculty}</td>
                          <td className="py-4 px-6">
                            {isElective ? (
                              <button
                                type="button"
                                onClick={() => handleDropCourse(c.code)}
                                className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-rose-500/15 text-rose-500 border border-rose-500/30 hover:bg-rose-500 hover:text-white px-2.5 py-1 rounded-lg transition"
                              >
                                <Trash2 className="w-3 h-3" />
                                Drop Elective
                              </button>
                            ) : (
                              <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded">
                                Mid-Term: {c.grade}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automated Self-Service Elective Registration */}
            <div className="erp-card border rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Automated Course Add / Drop Engine
                </span>
                <h3 className={`text-lg font-black mt-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                  Available Spring 2026 Electives (Auto Clash-Check Enabled)
                </h3>
              </div>

              {courseConflictMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{courseConflictMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ELECTIVE_CATALOG.map((el) => {
                  const isEnrolled = courses.some((c) => c.code === el.code);
                  return (
                    <div
                      key={el.code}
                      className="erp-subcard border rounded-2xl p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono font-black text-amber-500 mb-1.5">
                          <span>{el.code}</span>
                          <span>{el.credits.toFixed(1)} Credits</span>
                        </div>
                        <h4 className={`text-sm font-black ${isLight ? "text-slate-900" : "text-white"}`}>
                          {el.title}
                        </h4>
                        <p className="text-[11px] erp-muted mt-1">{el.faculty} • {el.schedule}</p>
                      </div>

                      {isEnrolled ? (
                        <div className="py-2 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-xs font-black text-center">
                          Enrolled in Timetable
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddCourse(el)}
                          className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Enroll Elective
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <div className="erp-card border rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <h3 className={`text-lg font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>
              Official Academic Transcript & Semester Grade History
            </h3>
            <p className="text-xs erp-muted mb-6">
              Cumulative Grade Point Average (CGPA): 3.98 / 4.00 | Standing: Top 1% of Graduating Class
            </p>
            <div className="space-y-4">
              {gradeHistory.map((g, idx) => (
                <div
                  key={idx}
                  className="erp-subcard border flex items-center justify-between p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                        {g.semester}
                      </h4>
                      <p className="text-xs erp-muted">{g.credits.toFixed(1)} Credits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-500 font-mono">GPA {g.gpa}</span>
                    <p className="text-[10px] text-amber-500 font-semibold">{g.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accounts & Online Fee Payment Gateway Tab */}
        {activeTab === "accounts" && (
          <div className="erp-card border rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                  Financial Accounts & Online Fee Checkout
                </h3>
                <p className="text-xs erp-muted mt-1">
                  All base semester tuition dues are covered by your 100% Chairman&apos;s Merit Scholarship.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenPayment}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pay Campus / Lab Fee Online
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="erp-subcard border p-6 rounded-2xl">
                <span className="text-xs font-bold erp-muted uppercase tracking-widest">Scholarship Status</span>
                <h4 className="text-xl font-black text-amber-500 mt-2">100% Tuition Waiver</h4>
                <p className="text-xs erp-muted mt-1">
                  Conferred under AMIU Chancellor&apos;s Global Excellence Quota.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Valid through final graduation semester
                </div>
              </div>
              <div className="erp-subcard border p-6 rounded-2xl">
                <span className="text-xs font-bold erp-muted uppercase tracking-widest">Current Balance</span>
                <h4 className="text-xl font-black text-emerald-500 mt-2">৳ 0.00 Outstanding</h4>
                <p className="text-xs erp-muted mt-1">
                  Supported Methods: bKash Merchant, Nagad, Visa / Mastercard
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs erp-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> SSLCommerz Verified Gateway
                </div>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider erp-muted mb-3 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-500" />
                Verified Digital Payment Ledger
              </h4>
              <div className="space-y-3">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="erp-subcard border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-amber-500">{txn.id}</span>
                      <div className={`font-bold mt-0.5 ${isLight ? "text-slate-900" : "text-white"}`}>
                        {txn.title}
                      </div>
                      <span className="erp-muted text-[11px]">
                        {txn.date} • {txn.method}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-emerald-500 text-sm">{txn.amount}</div>
                      <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/15 px-2 py-0.5 rounded">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Native Online Fee Payment Gateway Dialog */}
      <NativeDialog
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        titleId="payment-gateway-title"
        title="AMIU Instant Fee Payment Gateway"
      >
        {paidReceipt ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-white">Payment Successful!</h3>
            <p className="text-xs text-slate-300">
              Paid <strong className="text-amber-300">{paidReceipt.amount}</strong> via{" "}
              <strong className="text-white">{paidReceipt.method}</strong> for {paidReceipt.title}.
            </p>
            <div className="py-2.5 px-5 bg-slate-950 border border-amber-400/40 rounded-xl inline-block font-mono text-base font-black text-amber-400">
              Receipt ID: {paidReceipt.id}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsPayOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                View in Ledger
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Select Fee Purpose
              </label>
              <select
                autoFocus
                value={payFeeItem}
                onChange={(e) => setPayFeeItem(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option>NVIDIA Supercomputing Lab &amp; Graduation Gown Fee (৳ 3,500)</option>
                <option>Official Sealed Transcript &amp; Verification Fee (৳ 1,200)</option>
                <option>Annual Shuttle Bus Smart Pass Top-Up (৳ 2,000)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["bKash", "Nagad", "Visa / Mastercard"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayMethod(m)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-black border transition ${
                      payMethod === m
                        ? "bg-amber-400 text-slate-950 border-amber-400"
                        : "bg-slate-950 text-slate-300 border-white/15 hover:bg-slate-800"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  {payMethod === "Visa / Mastercard" ? "Card Last 4 / Number" : "Mobile Wallet Number"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={payMethod === "Visa / Mastercard" ? "4532 XXXX XXXX 8810" : "017XXXXXXXX"}
                  value={payAccount}
                  onChange={(e) => setPayAccount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  OTP / PIN Verification
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••"
                  value={payPin}
                  onChange={(e) => setPayPin(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition"
            >
              Authorize Secure Payment
            </button>
          </form>
        )}
      </NativeDialog>

      <Footer />
    </div>
  );
}
