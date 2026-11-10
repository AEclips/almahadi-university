"use client";

import React from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { ArrowLeft, Sparkles, Building, Trees, Trophy, Users, ShieldCheck, MapPin, Camera } from "lucide-react";
import Link from "next/link";

export default function CampusLifePage() {
  const highlights = [
    {
      title: "NVIDIA Supercomputing & Deep AI Laboratory",
      category: "Innovation & Research",
      tag: "Center of Excellence",
      desc: "Houses 128 high-density GPU computing clusters with direct gigabit optic pipelines for machine learning, autonomous drone software, and quantum simulations.",
      stat: "128 GPUs",
    },
    {
      title: "10,000-Seat Grand Amphitheater & Eco-Lake",
      category: "Architecture & Eco-Biosphere",
      tag: "Green Campus",
      desc: "Designed around a natural rainwater-harvesting freshwater lake, offering students an open-air cultural arena, botanical gardens, and solar promenade.",
      stat: "150 Acres",
    },
    {
      title: "Olympic-Standard Indoor Sports & Aquatic Pavilion",
      category: "Athletics & Student Life",
      tag: "Sports Complex",
      desc: "Features a temperature-regulated 50m Olympic swimming pool, FIFA-grade turf ground, basketball arena, and professional fitness gymnasium.",
      stat: "24/7 Access",
    },
    {
      title: "International Scholars Tower & Residence Suites",
      category: "Student Housing",
      tag: "Smart Living",
      desc: "High-speed Wi-Fi 7 enabled student dormitories, individual study suites, laundry care, 24/7 armed biometric security, and dedicated dining halls.",
      stat: "4,500 Capacity",
    },
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
            <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-10 h-10 object-contain" />
            <span className="font-serif font-black text-lg text-white">AMIU Smart Campus Biosphere</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.25em] bg-emerald-950/80 border border-emerald-500/40 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Carbon Smart Sanctuary
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Campus Life & World-Class Facilities</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Discover a transformative 150-acre green campus located in Dhaka, built to nurture academic rigor, creative collaboration, and student well-being.
          </p>
        </div>

        {/* Facilities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 hover:border-amber-400/60 transition-all hover:-translate-y-1 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    {h.tag}
                  </span>
                  <span className="text-2xl font-black text-emerald-400">{h.stat}</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition mb-3">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6">
                  {h.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Al Mahadi Smart City, Dhaka
                </span>
                <span className="text-emerald-400 font-bold group-hover:underline cursor-pointer flex items-center gap-1">
                  View 3D Tour &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
