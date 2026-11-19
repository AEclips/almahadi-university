import React from "react";
import Link from "next/link";
import { 
  Phone, Mail, GraduationCap, ArrowRight, 
  BookOpen, Award, Users, Globe, Sparkles, Shield, Compass 
} from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { SpotlightCard, AnimatedCounter } from "./KineticEffects";

export function TopUtilityBar() {
  return (
    <div className="bg-[#0b1c2d] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Side: Hotline */}
        <div className="flex items-center space-x-4 text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 hover:text-amber-400 transition cursor-pointer">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Admissions 24/7:</span>
            <strong className="text-white">+880 9612-777999</strong>
          </span>
        </div>

        {/* Right Side: Email, Global Search & Student ERP Portal */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs font-semibold ml-auto">
          <span className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition cursor-pointer border-r border-white/10 pr-4">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Official Desk:</span>
            <span className="text-amber-300 font-bold">admission@almahadi.edu.bd</span>
          </span>
          <GlobalSearch variant="utility" />
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
    <section className="hero-parallax-wrapper relative min-h-[760px] flex flex-col justify-between bg-[#040d17] text-white pt-16 sm:pt-20 pb-10 px-4 border-b border-white/10">
      {/* Full-Bleed Parallax Campus Photograph (LCP Priority) */}
      <img
        src="/images/hero-campus.webp"
        alt="Al Mahadi International University lakeside sandstone and glass campus at twilight"
        width={1600}
        height={893}
        fetchPriority="high"
        className="hero-parallax-img absolute inset-0 w-full h-full object-cover object-center opacity-75 pointer-events-none select-none"
      />
      {/* Sculpted Editorial Dark Vignette Scrims (Keeps Right-Side Architecture Visible) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040d17]/95 via-[#061523]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040d17] via-transparent to-[#040d17]/40 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Left Editorial Focus */}
      <div className="max-w-7xl mx-auto relative z-10 w-full my-auto py-8">
        <div className="max-w-2xl space-y-7">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Spring 2026 Admissions Open &bull; Ashulia Smart City
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[74px] font-serif font-bold tracking-tight leading-[1.03] drop-shadow-xl">
            Architecting the <br />
            <span className="text-amber-300 italic font-semibold">
              Leaders of Tomorrow
            </span>
          </h1>

          <p className="text-slate-100 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            Welcome to <strong className="text-white font-semibold">Al Mahadi International University (AMIU)</strong>. Permanent green smart architecture meets AI supercomputing labs, international dual-degree pathways, and translational research.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-1">
            <Link
              href="/apply"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-7 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
            >
              Apply for Spring 2026
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#campus-tour"
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-6 py-4 rounded-2xl transition backdrop-blur-md hover:-translate-y-0.5 text-xs sm:text-sm flex items-center gap-2"
            >
              Tour the 150-Acre Campus
            </a>
            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold px-5 py-4 rounded-2xl transition backdrop-blur-md hover:-translate-y-0.5 text-xs sm:text-sm"
              >
                Fast Track Inquiry
              </button>
            )}
          </div>

          {/* Subtle Architectural Trust Metrics */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 text-slate-200 text-xs max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white">96.4%</div>
              <div className="text-slate-300 mt-0.5">Graduate Placement</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white">120+</div>
              <div className="text-slate-300 mt-0.5">Global Alliances</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">Up to 100%</div>
              <div className="text-slate-300 mt-0.5">Merit Waivers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Bottom Audience Wayfinding Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mt-8 pt-6 border-t border-white/15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-300 flex-shrink-0">
            Pathways For
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-grow lg:max-w-4xl">
            {[
              { label: "Prospective Students", sub: "Spring 2026 Admissions", href: "/apply" },
              { label: "Current Students", sub: "Student ERP & Fees", href: "/portal" },
              { label: "Faculty & Research", sub: "Office Hours & Papers", href: "/faculty" },
              { label: "Global Alumni", sub: "Referrals & Placement", href: "/alumni" },
            ].map((path) => (
              <SpotlightCard
                key={path.href}
                className="rounded-2xl bg-[#071523]/80 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-amber-400/60 transition"
              >
                <Link
                  href={path.href}
                  className="group px-4 py-3 flex items-center justify-between gap-2 relative z-10"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {path.label}
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">{path.sub}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsTicker() {
  const stats = [
    { target: 28000, suffix: "+", label: "Enrolled Visionary Students", icon: Users },
    { target: 120, suffix: "+", label: "Global Academic Alliances", icon: Globe },
    { target: 35, suffix: "+", label: "Accredited Degree Programs", icon: BookOpen },
    { staticText: "#1", label: "Smart Green Campus in Dhaka", icon: Award },
  ];

  return (
    <section aria-label="University Key Highlights" className="bg-[#081b2c] border-b border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <SpotlightCard
              key={idx}
              className="rounded-2xl bg-slate-900/65 border border-white/10 hover:border-amber-400/40 p-5 flex items-center gap-4 group transition"
            >
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-slate-950 text-emerald-300 rounded-2xl transition-all shadow-sm flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                  {"staticText" in s && s.staticText ? (
                    s.staticText
                  ) : (
                    <AnimatedCounter target={s.target!} suffix={s.suffix} />
                  )}
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">{s.label}</div>
              </div>
            </SpotlightCard>
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
