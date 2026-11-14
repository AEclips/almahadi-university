import React from "react";
import Link from "next/link";
import { 
  Phone, Mail, GraduationCap, ChevronDown, Search, ArrowRight, Bell, Calendar, 
  BookOpen, Award, Users, Globe, Sparkles, Shield, Compass, CheckCircle2, ChevronRight 
} from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="bg-[#0b1c2d] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Side: Hotline */}
        <div className="flex items-center space-x-6 text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 hover:text-amber-400 transition cursor-pointer">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Admissions 24/7:</span>
            <strong className="text-white">+880 9612-777999</strong>
          </span>
        </div>

        {/* Right Side: Email address aligned to the far right, with quick links */}
        <div className="flex items-center space-x-6 text-xs font-semibold ml-auto">
          <span className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition cursor-pointer border-r border-white/10 pr-6">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Official Desk:</span>
            <span className="text-amber-300 font-bold">admission@almahadi.edu.bd</span>
          </span>
          <Link href="/portal" className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-3.5 py-1 rounded-full text-[11px] shadow-sm hover:brightness-110 transition flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            AMIU Student ERP Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeroBanner({ onOpenModal }: { onOpenModal?: () => void }) {
  return (
    <section className="relative min-h-[680px] flex flex-col justify-center bg-[#061523] text-white pt-24 pb-16 px-4 overflow-hidden border-b border-emerald-950/40">
      {/* Editorial Hero Campus Photograph (LCP Priority) */}
      <img
        src="/images/hero-campus.webp"
        alt="Al Mahadi International University lakeside sandstone and glass campus at twilight"
        width={1600}
        height={893}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60 pointer-events-none select-none"
      />
      {/* Architectural Navy Atmospheric Scrims for High-Contrast Typography */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061523]/95 via-[#071927]/80 to-[#061523]/45 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#061523] via-transparent to-[#061523]/45 pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-[600px] h-64 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg shadow-emerald-950/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Pioneering Higher Education for the AI & Quantum Era
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-serif font-bold tracking-tight leading-[1.06]">
            Architecting the <br />
            <span className="text-amber-300 italic font-semibold">
              Leaders of Tomorrow
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            Welcome to <strong className="text-white font-semibold">Al Mahadi International University (AMIU)</strong>. Where permanent smart green architecture converges with AI supercomputing labs, international dual-degree pathways, and translational research.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/apply"
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Spring 2026 Admissions Open
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#calculator"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-7 py-4 rounded-2xl transition backdrop-blur-md hover:-translate-y-0.5 text-sm flex items-center gap-2"
            >
              Calculate Scholarship Waiver
            </a>
          </div>

          {/* Quick Credibility Trust Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 text-slate-300 text-xs">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">96.4%</div>
              <div className="text-slate-400 mt-0.5">Graduate Placement</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">120+</div>
              <div className="text-slate-400 mt-0.5">Global Partner Varsities</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
              <div className="text-slate-400 mt-0.5">Merit Scholarships</div>
            </div>
          </div>
        </div>

        {/* Right Glassmorphic Highlights Box */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur-xl opacity-25"></div>
          
          <div className="relative bg-[#0d2235]/85 border border-white/15 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-extrabold flex items-center gap-2 text-emerald-300">
                <Bell className="w-4 h-4 text-amber-400" />
                Live Circulars & Updates
              </h3>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>

            <div className="space-y-3.5">
              {[
                { tag: "Scholarship", title: "100% Full-Ride Merit Waivers Open for Golden GPA 5.0", date: "Nov 09" },
                { tag: "Admissions", title: "Spring 2026 Direct Entrance Exam & Spot Admission", date: "Nov 07" },
                { tag: "Robotics", title: "AMIU Robotics Lab Unveils Autonomous Drone Platform", date: "Nov 03" },
                { tag: "Convocation", title: "Registration for Annual Grand Convocation Opened", date: "Oct 29" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {item.tag}
                    </span>
                    <span className="text-slate-400 text-[11px]">{item.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-amber-300 transition leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a href="#notice" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1">
                View All Circulars <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* World-Class University Audience Wayfinding Bar (MIT / Harvard Pattern) */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mt-10 pt-6 border-t border-white/15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-300">
            Pathways For
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-grow lg:max-w-4xl">
            {[
              { label: "Prospective Students", sub: "Spring 2026 Admissions", href: "/apply" },
              { label: "Current Students", sub: "Student ERP & Fees", href: "/portal" },
              { label: "Faculty & Research", sub: "Office Hours & Papers", href: "/faculty" },
              { label: "Global Alumni", sub: "Referrals & Placement", href: "/alumni" },
            ].map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group rounded-2xl bg-[#071523]/75 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-amber-400/60 px-4 py-3 transition flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                    {path.label}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">{path.sub}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsTicker() {
  const stats = [
    { count: "28,000+", label: "Enrolled Visionary Students", icon: Users },
    { count: "120+", label: "Global Academic Alliances", icon: Globe },
    { count: "35+", label: "Accredited Degree Programs", icon: BookOpen },
    { count: "#1", label: "Smart Green Campus in Dhaka", icon: Award },
  ];

  return (
    <section className="bg-white border-b border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex items-center space-x-4 md:border-r md:last:border-r-0 border-slate-200/80 md:pr-6 group">
              <div className="p-3 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 rounded-2xl transition-all shadow-sm">
                <Icon className="w-7 h-7 flex-shrink-0" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                  {s.count}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#071927] text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
        <div className="space-y-5">
          <div className="flex items-center gap-3.5">
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-black text-white text-lg tracking-tight block leading-none">
                AL MAHADI
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mt-1">
                International University
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Al Mahadi Smart City, Dhaka, Bangladesh. An autonomous institution dedicated to academic distinction, high-impact scientific research, and technological leadership.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs font-black mb-5 uppercase tracking-widest text-amber-400">
            Faculties & Schools
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/faculty" className="hover:text-amber-300 transition">Faculty of Science & IT</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-300 transition">School of Engineering & Robotics</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-300 transition">Faculty of Business & Entrepreneurship</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-300 transition">School of Health & Allied Sciences</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-300 transition">Faculty of Humanities & Social Sciences</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-black mb-5 uppercase tracking-widest text-amber-400">
            Portals & Resources
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/portal" className="hover:text-amber-300 transition">AMIU Smart ERP Student Portal</Link></li>
            <li><Link href="/campus" className="hover:text-amber-300 transition">Campus Tour &amp; Facilities</Link></li>
            <li><Link href="/campus#shuttle" className="hover:text-amber-300 transition">Live Campus Shuttle Tracker</Link></li>
            <li><Link href="/alumni" className="hover:text-amber-300 transition">Global Alumni &amp; Careers</Link></li>
            <li><Link href="/apply" className="hover:text-amber-300 transition">Online Admissions Form</Link></li>
            <li><Link href="/#notice" className="hover:text-amber-300 transition">Official Circulars &amp; Notices</Link></li>
            <li><Link href="/#calculator" className="hover:text-amber-300 transition">Scholarship Calculator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-black mb-5 uppercase tracking-widest text-amber-400">
            Campus Headquarters
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Al Mahadi Smart City, Birulia Road, Dhaka.<br /><br />
            <strong className="text-slate-200">Admissions Desk:</strong> +880 9612-777999<br />
            <strong className="text-slate-200">Email:</strong> registrar@almahadi.edu.bd<br />
            <strong className="text-slate-200">Helpline:</strong> 01999888777
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          © 2026 Al Mahadi International University (AMIU). Built with clean-room architecture.
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/faculty" className="hover:text-slate-300 transition">Academic Charter</Link>
          <Link href="/campus#shuttle" className="hover:text-slate-300 transition">Campus Safety &amp; Transit</Link>
          <Link href="/portal" className="hover:text-slate-300 transition">Student ERP Security</Link>
        </div>
      </div>
    </footer>
  );
}
