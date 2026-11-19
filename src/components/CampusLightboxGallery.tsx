"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Play,
  Bus,
  Cpu,
  Building,
  Globe2,
  Waves,
  Images,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { NativeDialog } from "./NativeDialog";
import { SpotlightCard } from "./KineticEffects";

export interface CampusPhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  caption: string;
}

export const CAMPUS_GALLERY_PHOTOS: CampusPhotoItem[] = [
  {
    id: "ai-lab",
    src: "/images/ai-quantum-lab.webp",
    alt: "Researchers inside the AMIU AI supercomputing and robotics laboratory",
    title: "NVIDIA AI & Quantum Computing Hub",
    category: "Research Laboratory",
    caption: "128 liquid-cooled H100/A100 GPU clusters dedicated to LLM alignment, autonomous robotics, and genomic modeling.",
  },
  {
    id: "eco-amphi",
    src: "/images/eco-amphitheater.webp",
    alt: "AMIU timber and solar eco-amphitheater beside the botanical lake",
    title: "Zero-Emission Eco Amphitheater",
    category: "Sustainable Architecture",
    caption: "10,000-seat solar-shaded lakeside auditorium integrating rainwater wetland filtration and Dolby Atmos acoustics.",
  },
  {
    id: "quad-library",
    src: "/images/global-quad-library.webp",
    alt: "Multi-tier oak and glass research library atrium at Al Mahadi University",
    title: "Central Research Library & Global Transfer",
    category: "Academic Commons",
    caption: "24/7 digital IEEE & NeurIPS archive housing seamless 2+2 & 3+1 dual-degree pathways to 120+ partner universities.",
  },
  {
    id: "sports-pavilion",
    src: "/images/sports-pavilion.webp",
    alt: "Sunlit timber-arch indoor aquatic pavilion with Olympic competition swimming lanes",
    title: "Olympic Indoor Aquatic & Athletics Pavilion",
    category: "Student Life & Sports",
    caption: "50-meter temperature-regulated Olympic lap pool, FIFA Pro artificial turf, and sports recovery science suite.",
  },
  {
    id: "shuttle-hub",
    src: "/images/smart-shuttle-campus.webp",
    alt: "Al Mahadi University electric transit shuttles docked at the glass campus hub",
    title: "Zero-Emission EV Shuttle Terminal",
    category: "Smart Campus Transit",
    caption: "28 Wi-Fi 7 equipped AC shuttles linking Dhanmondi, Uttara, Mirpur, Gulshan, and Motijheel to Ashulia Smart City.",
  },
  {
    id: "hero-twilight",
    src: "/images/hero-campus.webp",
    alt: "Al Mahadi International University lakeside sandstone and glass campus at twilight",
    title: "Lakeside Academic Precinct at Twilight",
    category: "150-Acre Smart City",
    caption: "Architectural synthesis of warm sandstone colonnades and glass research wings overlooking the central botanical lake.",
  },
  {
    id: "hackathon-stage",
    src: "/images/hackathon-stage.webp",
    alt: "Student engineering team pitching robotics architecture on stage at AMIU Hackathon",
    title: "National AI & Robotics Hackathon Stage",
    category: "Student Innovation",
    caption: "36-hour engineering marathons judged by principal engineers from Google DeepMind, NVIDIA, and regional startups.",
  },
  {
    id: "scholars-courtyard",
    src: "/images/scholars-courtyard.webp",
    alt: "Al Mahadi honors students collaborating in the sunlit courtyard",
    title: "Honors Scholars Botanical Courtyard",
    category: "Campus Community",
    caption: "Collaborative outdoor Wi-Fi 7 study cloisters supporting interdisciplinary undergraduate and honors fellows.",
  },
  {
    id: "convocation-plaza",
    src: "/images/convocation-scholars.webp",
    alt: "Graduating AMIU scholars celebrating at convocation on campus plaza",
    title: "Grand Convocation on Central Green Plaza",
    category: "Annual Traditions",
    caption: "Annual Chancellor's Gold Medal convocation uniting graduating engineers, entrepreneurs, and international delegates.",
  },
  {
    id: "faculty-mentorship",
    src: "/images/faculty-mentorship.webp",
    alt: "Professor discussing quantum circuits on a glass whiteboard with honors students",
    title: "Direct 1-on-1 Faculty Research Mentorship",
    category: "Pedagogy",
    caption: "Small-cohort faculty office hours mentoring undergraduate thesis students for top international conferences.",
  },
];

export function CampusLightboxGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev + 1) % CAMPUS_GALLERY_PHOTOS.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIdx((prev) =>
          prev === null
            ? null
            : (prev - 1 + CAMPUS_GALLERY_PHOTOS.length) % CAMPUS_GALLERY_PHOTOS.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  const activePhoto = lightboxIdx !== null ? CAMPUS_GALLERY_PHOTOS[lightboxIdx] : null;

  return (
    <section
      id="campus-tour"
      className="py-24 px-4 bg-gradient-to-b from-[#061523] to-[#0a2134] relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 kinetic-reveal">
          <div className="space-y-3">
            <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.25em] bg-emerald-950/80 border border-emerald-500/40 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <SparklesDot /> Architectural Distinction
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              World-Class 150-Acre Smart Green Sanctuary
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore South Asia&apos;s premier sustainable university biosphere with GPU research facilities, solar amphitheaters, Olympic athletics, and zero-emission campus shuttles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setLightboxIdx(0)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <Images className="w-4 h-4" />
              Open Full 10-Photo Campus Gallery
            </button>
            <Link
              href="/campus"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              Explore Campus Facilities
            </Link>
            <Link
              href="/campus#shuttle"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2"
            >
              <Bus className="w-4 h-4 text-emerald-400" />
              Live Dhaka Shuttle Tracker
            </Link>
          </div>
        </div>

        {/* Asymmetric Visual Bento Grid (Row 1: 2+1 Panoramic Split, Row 2: 3 Balanced Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 kinetic-reveal">
          {/* Card 0: Wide Feature (2 Columns) */}
          <SpotlightCard className="md:col-span-2 rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group h-[380px] sm:h-[420px] shadow-2xl">
            <button
              type="button"
              onClick={() => setLightboxIdx(0)}
              className="relative w-full h-full flex flex-col justify-end p-8 text-left cursor-pointer"
            >
              <img
                src={CAMPUS_GALLERY_PHOTOS[0].src}
                alt={CAMPUS_GALLERY_PHOTOS[0].alt}
                width={1200}
                height={670}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10 z-10" />
              <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-500/25 backdrop-blur-md border border-emerald-400/40 text-emerald-300 rounded-xl">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                      Flagship Research Cluster • 128 GPUs
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                    {CAMPUS_GALLERY_PHOTOS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {CAMPUS_GALLERY_PHOTOS[0].caption}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 border border-white/20 px-3.5 py-2 rounded-xl backdrop-blur-md transition flex-shrink-0">
                  <Maximize2 className="w-3.5 h-3.5" /> Inspect Photo
                </span>
              </div>
            </button>
          </SpotlightCard>

          {/* Card 1: Tall 1-Column Feature */}
          <SpotlightCard className="rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group h-[380px] sm:h-[420px] shadow-2xl">
            <button
              type="button"
              onClick={() => setLightboxIdx(1)}
              className="relative w-full h-full flex flex-col justify-end p-8 text-left cursor-pointer"
            >
              <img
                src={CAMPUS_GALLERY_PHOTOS[1].src}
                alt={CAMPUS_GALLERY_PHOTOS[1].alt}
                width={1200}
                height={670}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/15 z-10" />
              <div className="relative z-20 space-y-2.5">
                <div className="p-2.5 bg-amber-500/25 backdrop-blur-md border border-amber-400/40 text-amber-300 rounded-xl w-fit">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                  {CAMPUS_GALLERY_PHOTOS[1].title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Solar-energized lakeside amphitheater and rainwater biosphere suites.
                </p>
              </div>
            </button>
          </SpotlightCard>

          {/* Row 2: Three Balanced Spotlight Tiles */}
          {[
            { photoIndex: 2, icon: Globe2, badgeClass: "bg-sky-500/25 border-sky-400/40 text-sky-300" },
            { photoIndex: 3, icon: Waves, badgeClass: "bg-emerald-500/25 border-emerald-400/40 text-emerald-300" },
            { photoIndex: 4, icon: Bus, badgeClass: "bg-amber-500/25 border-amber-400/40 text-amber-300" },
          ].map(({ photoIndex, icon: Icon, badgeClass }) => {
            const item = CAMPUS_GALLERY_PHOTOS[photoIndex];
            return (
              <SpotlightCard
                key={item.id}
                className="rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group h-72 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(photoIndex)}
                  className="relative w-full h-full flex flex-col justify-end p-7 text-left cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={670}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/15 z-10" />
                  <div className="relative z-20 space-y-2">
                    <div className={`p-2 backdrop-blur-md border rounded-xl w-fit ${badgeClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Interactive Fullscreen 10-Photo Campus Lightbox Dialog */}
      <NativeDialog
        isOpen={lightboxIdx !== null}
        onClose={() => setLightboxIdx(null)}
        titleId="campus-lightbox-title"
        title={activePhoto ? `${activePhoto.category} — ${activePhoto.title}` : "Campus Gallery"}
        maxWidthClass="max-w-5xl"
      >
        {activePhoto && lightboxIdx !== null && (
          <div className="space-y-4">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={1200}
                height={670}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIdx(
                    (lightboxIdx - 1 + CAMPUS_GALLERY_PHOTOS.length) %
                      CAMPUS_GALLERY_PHOTOS.length
                  )
                }
                aria-label="Previous campus photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/20 transition backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((lightboxIdx + 1) % CAMPUS_GALLERY_PHOTOS.length)
                }
                aria-label="Next campus photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/20 transition backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 bg-slate-950/85 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-300 px-3 py-1 rounded-full">
                {lightboxIdx + 1} / {CAMPUS_GALLERY_PHOTOS.length}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                {activePhoto.caption}
              </p>
              <Link
                href="/campus"
                onClick={() => setLightboxIdx(null)}
                className="text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 flex-shrink-0"
              >
                Open Full Campus Page &rarr;
              </Link>
            </div>

            {/* 10-Photo Thumbnail Strip */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 border-t border-white/10">
              {CAMPUS_GALLERY_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`View photo ${idx + 1}: ${photo.title}`}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition ${
                    idx === lightboxIdx
                      ? "border-amber-400 ring-2 ring-amber-400/50 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={160}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </NativeDialog>
    </section>
  );
}

function SparklesDot() {
  return (
    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
  );
}
