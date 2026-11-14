"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, Trophy, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Ticket } from "lucide-react";
import { NativeDialog } from "./NativeDialog";

interface UniversityEvent {
  id: string;
  title: string;
  category: "Tech & Hackathon" | "Academic Seminar" | "Campus Life";
  date: string;
  time: string;
  venue: string;
  seatsLeft: number;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
}

const EVENTS: UniversityEvent[] = [
  {
    id: "EVT-AI-2026",
    title: "AMIU National AI & Quantum Hackathon 2026",
    category: "Tech & Hackathon",
    date: "Dec 04 – Dec 05, 2026",
    time: "09:00 AM • 36 Hours",
    venue: "NVIDIA Supercomputing Hall, Ashulia",
    seatsLeft: 42,
    highlight: "৳500,000 Prize Pool",
    image: "/images/hackathon-stage.webp",
    imageAlt: "Student engineering team pitching robotics architecture on stage at AMIU Hackathon",
    description:
      "36-hour flagship coding marathon building multi-agent AI, quantum optimization, and sustainable smart-city solutions judged by engineers from Google & NVIDIA.",
  },
  {
    id: "EVT-ROBO-26",
    title: "International Symposium on Autonomous Robotics",
    category: "Academic Seminar",
    date: "Dec 12, 2026",
    time: "10:30 AM – 04:00 PM",
    venue: "Main Auditorium, Smart Campus",
    seatsLeft: 115,
    highlight: "Keynote: Tokyo Univ",
    image: "/images/ai-quantum-lab.webp",
    imageAlt: "Autonomous robotics and deep learning supercomputing cluster",
    description:
      "Global academic forum showcasing bipedal humanoid locomotion, precision agriculture drones, and ROS2 industrial automation workflows.",
  },
  {
    id: "EVT-FRESH-26",
    title: "Spring 2026 Freshers' Orientation & Gala",
    category: "Campus Life",
    date: "Jan 10, 2026",
    time: "03:00 PM – 08:30 PM",
    venue: "10,000-Seat Eco-Lake Amphitheater",
    seatsLeft: 320,
    highlight: "Live Symphony & Clubs",
    image: "/images/eco-amphitheater.webp",
    imageAlt: "Open-air timber solar amphitheater by the botanical campus lake",
    description:
      "Grand welcome festival featuring Chancellor's keynote, merit scholarship awards, tech club exhibitions, and laser projection concert.",
  },
  {
    id: "EVT-PITCH-26",
    title: "Silicon Valley & FinTech Alumni Venture Pitch",
    category: "Academic Seminar",
    date: "Dec 19, 2026",
    time: "02:00 PM – 06:00 PM",
    venue: "AMIU Startup Incubator, Level 4",
    seatsLeft: 28,
    highlight: "$250K Seed Grants",
    image: "/images/global-quad-library.webp",
    imageAlt: "Multi-level research commons hosting student entrepreneurship founders",
    description:
      "Student startups pitch live to Bangladeshi-American VCs and AMIU alumni founders for equity-free seed grants and cloud credits.",
  },
  {
    id: "EVT-CONV-11",
    title: "11th Grand Convocation Ceremony",
    category: "Campus Life",
    date: "Jan 25, 2026",
    time: "08:30 AM – 02:00 PM",
    venue: "Central Green Plaza, Smart City",
    seatsLeft: 180,
    highlight: "Chancellor's Gold Medal",
    image: "/images/convocation-scholars.webp",
    imageAlt: "Graduating AMIU scholars celebrating in academic regalia on campus plaza",
    description:
      "Celebrating graduating scholars across Science, Engineering, and Business with international delegates and proud families.",
  },
];

export function EventsCarouselSection() {
  const [filter, setFilter] = useState<string>("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");
  const [rsvpEvent, setRsvpEvent] = useState<UniversityEvent | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [reservedPassIds, setReservedPassIds] = useState<Record<string, string>>({});

  const trackRef = useRef<HTMLDivElement>(null);
  const lastSettledRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);

  const visibleEvents =
    filter === "All" ? EVENTS : EVENTS.filter((ev) => ev.category === filter);

  const scrollToSlide = (targetIdx: number) => {
    const track = trackRef.current;
    if (!track || visibleEvents.length === 0) return;

    const clamped =
      (targetIdx + visibleEvents.length) % visibleEvents.length;
    pendingTargetRef.current = clamped;
    setActiveSlide(clamped);

    const targetCard = track.children[clamped] as HTMLElement | undefined;
    if (targetCard) {
      const offset = targetCard.offsetLeft - track.offsetLeft;
      track.scrollTo({ left: offset });
    }
  };

  useEffect(() => {
    setActiveSlide(0);
    lastSettledRef.current = 0;
    pendingTargetRef.current = null;
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [filter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const findNearestSlide = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return 0;
      const scrollLeft = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, idx) => {
        const dist = Math.abs(child.offsetLeft - track.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      return closest;
    };

    const handleSettled = () => {
      pendingTargetRef.current = null;
      const settled = findNearestSlide();
      setActiveSlide(settled);
      if (settled !== lastSettledRef.current) {
        lastSettledRef.current = settled;
        setStatusAnnouncement(`Slide ${settled + 1} of ${visibleEvents.length}`);
      }
    };

    const onScroll = () => {
      if (pendingTargetRef.current === null) {
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            rafId = 0;
            const nearest = findNearestSlide();
            setActiveSlide((prev) => (prev !== nearest ? nearest : prev));
          });
        }
      }

      if (!("onscrollend" in window)) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSettled, 150);
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    if ("onscrollend" in window) {
      track.addEventListener("scrollend", handleSettled);
    }

    return () => {
      track.removeEventListener("scroll", onScroll);
      if ("onscrollend" in window) {
        track.removeEventListener("scrollend", handleSettled);
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [visibleEvents.length]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpEvent) return;
    const passCode = "PASS-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    setReservedPassIds((prev) => ({ ...prev, [rsvpEvent.id]: passCode }));
    setRsvpName("");
    setRsvpEmail("");
  };

  return (
    <section
      id="events"
      aria-roledescription="carousel"
      aria-label="Upcoming University Events, Seminars and Hackathons"
      className="py-24 px-4 bg-[#061523] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <span className="text-amber-400 font-black text-xs uppercase tracking-[0.25em] bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              News, Seminars & Hackathons
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Upcoming Events &amp; Global Forums
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Reserve your digital seat pass for upcoming hackathons, robotics symposiums, startup venture pitches, and convocation celebrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All", "Tech & Hackathon", "Academic Seminar", "Campus Life"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  filter === cat
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Previous / Next Controls (DOM order before carousel track) */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-bold text-slate-400">
            Showing {visibleEvents.length} Upcoming Event{visibleEvents.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlide - 1)}
              aria-label="Previous event slide"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 transition touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlide + 1)}
              aria-label="Next event slide"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 transition touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Snap Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Event Slides"
          className="events-carousel-track pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          {visibleEvents.map((ev, idx) => {
            const bookedPass = reservedPassIds[ev.id];
            return (
              <article
                key={ev.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${visibleEvents.length}`}
                data-marker-name={`Go to slide ${idx + 1}`}
                className="events-carousel-slide flex-none w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-3xl border border-white/10 bg-slate-800/75 hover:border-amber-400/60 overflow-hidden shadow-2xl flex flex-col justify-between transition group"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={ev.image}
                      alt={ev.imageAlt}
                      width={1200}
                      height={670}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-full">
                        {ev.category}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-slate-950/80 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {ev.highlight}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 pb-0">
                    <h3 className="text-xl font-serif font-bold text-white leading-snug mb-3">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-5">
                      {ev.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-400 bg-slate-900/80 rounded-2xl p-4 border border-white/5 mb-6">
                      <div className="flex items-center gap-2 text-slate-200 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>
                          {ev.date} • {ev.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{ev.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{ev.seatsLeft} Public &amp; Student Seats Open</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-7 pb-7">
                  {bookedPass ? (
                    <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Seat Reserved ({bookedPass})
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRsvpEvent(ev)}
                      className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-4 h-4" />
                      Reserve Free Event Seat
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Live Status Announcement */}
        <p className="visually-hidden" role="status" aria-live="polite">
          {statusAnnouncement}
        </p>

        {/* Marker Dots */}
        <nav aria-label="Choose an event slide" className="flex items-center justify-center gap-2 mt-4">
          {visibleEvents.map((ev, idx) => (
            <button
              key={ev.id}
              type="button"
              aria-label={`Go to event ${idx + 1}: ${ev.title}`}
              aria-current={activeSlide === idx ? "true" : undefined}
              onClick={() => scrollToSlide(idx)}
              className={`h-2.5 rounded-full transition-all touch-manipulation cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 ${
                activeSlide === idx ? "w-8 bg-amber-400" : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* Native Light-Dismiss Event RSVP Modal */}
      <NativeDialog
        isOpen={Boolean(rsvpEvent)}
        onClose={() => setRsvpEvent(null)}
        titleId="event-rsvp-title"
        title={rsvpEvent ? `Reserve Seat: ${rsvpEvent.title}` : "Reserve Event Seat"}
      >
        {rsvpEvent && reservedPassIds[rsvpEvent.id] ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-white">Event Pass Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Present this pass code at <strong className="text-white">{rsvpEvent.venue}</strong> on{" "}
              <strong className="text-amber-300">{rsvpEvent.date}</strong>.
            </p>
            <div className="py-3 px-6 bg-slate-950 border border-amber-400/40 rounded-2xl inline-block font-mono text-xl font-black text-amber-400 tracking-widest">
              {reservedPassIds[rsvpEvent.id]}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setRsvpEvent(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          rsvpEvent && (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs space-y-1">
                <div className="font-bold text-amber-400">{rsvpEvent.date} • {rsvpEvent.time}</div>
                <div className="text-slate-300">{rsvpEvent.venue}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Full Name / Student Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Mukto (HP)"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Email or Student ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="261-15-9988 or email@domain.com"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition"
              >
                Confirm Seat Reservation
              </button>
            </form>
          )
        )}
      </NativeDialog>
    </section>
  );
}
