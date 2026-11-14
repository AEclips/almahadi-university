"use client";

import React, { useState } from "react";
import { TopUtilityBar, Footer } from "@/components/DiuComponents";
import { NativeDialog } from "@/components/NativeDialog";
import {
  ArrowLeft,
  Trees,
  MapPin,
  Bus,
  Clock,
  Navigation,
  CheckCircle2,
  Ticket,
  Wifi,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ShuttleRoute {
  id: string;
  zone: string;
  coachCode: string;
  status: string;
  etaMinutes: number;
  seatsAvailable: number;
  totalSeats: number;
  nextDeparture: string;
  stops: string[];
}

const SHUTTLE_ROUTES: ShuttleRoute[] = [
  {
    id: "route-dhanmondi",
    zone: "Dhanmondi & Mirpur Express",
    coachCode: "AMIU-EXP-01 (EV Coach)",
    status: "En Route • Passing Mirpur-10 Circle",
    etaMinutes: 18,
    seatsAvailable: 9,
    totalSeats: 42,
    nextDeparture: "Every 20 mins (06:45 AM – 08:30 PM)",
    stops: [
      "Dhanmondi 27 (Sobhanbag)",
      "Asad Gate",
      "Technical More",
      "Mirpur-10 Metro Station",
      "Beribadh Highway",
      "AMIU Ashulia Smart Campus",
    ],
  },
  {
    id: "route-uttara",
    zone: "Uttara & Airport Express",
    coachCode: "AMIU-EXP-04 (AC Sleeper)",
    status: "Boarding at House Building Gate",
    etaMinutes: 6,
    seatsAvailable: 14,
    totalSeats: 42,
    nextDeparture: "Every 15 mins (07:00 AM – 09:00 PM)",
    stops: [
      "Rajlaxmi Complex",
      "Uttara Sector 7",
      "House Building",
      "Abdullahpur Bridge",
      "Dhour Zero Point",
      "AMIU Ashulia Smart Campus",
    ],
  },
  {
    id: "route-gulshan",
    zone: "Gulshan, Banani & Kuril Flyover",
    coachCode: "AMIU-EXP-07 (EV Coach)",
    status: "En Route • Entering Kuril 300ft Loop",
    etaMinutes: 24,
    seatsAvailable: 6,
    totalSeats: 40,
    nextDeparture: "Every 30 mins (07:15 AM – 07:45 PM)",
    stops: [
      "Gulshan-2 Circle",
      "Banani Chairman Bari",
      "Kuril Bishwa Road",
      "Khilkhet Flyover",
      "Abdullahpur Bypass",
      "AMIU Ashulia Smart Campus",
    ],
  },
  {
    id: "route-motijheel",
    zone: "Motijheel, Shahbagh & Farmgate",
    coachCode: "AMIU-EXP-09 (AC Coach)",
    status: "Departing Farmgate in 5 mins",
    etaMinutes: 35,
    seatsAvailable: 19,
    totalSeats: 44,
    nextDeparture: "Hourly Express (06:30 AM – 06:30 PM)",
    stops: [
      "Motijheel Shapla Chattar",
      "Shahbagh Square",
      "Farmgate Overbridge",
      "Bijoy Sarani",
      "Gabtoli Terminal",
      "AMIU Ashulia Smart Campus",
    ],
  },
  {
    id: "route-narayanganj",
    zone: "Narayanganj & Jatrabari Link",
    coachCode: "AMIU-EXP-12 (AC Coach)",
    status: "En Route • Signboard Flyover",
    etaMinutes: 41,
    seatsAvailable: 12,
    totalSeats: 42,
    nextDeparture: "Morning & Afternoon Shuttles (06:40 AM / 01:30 PM)",
    stops: [
      "Chashara Central",
      "Signboard Junction",
      "Jatrabari Flyover",
      "Kuril Express Link",
      "Ashulia Canal Road",
      "AMIU Ashulia Smart Campus",
    ],
  },
];

export default function CampusLifePage() {
  const [selectedRouteId, setSelectedRouteId] = useState(SHUTTLE_ROUTES[0].id);
  const [bookedPasses, setBookedPasses] = useState<Record<string, string>>({});
  const [tourModalItem, setTourModalItem] = useState<(typeof highlights)[0] | null>(null);

  const highlights = [
    {
      title: "NVIDIA Supercomputing & Deep AI Laboratory",
      category: "Innovation & Research",
      tag: "Center of Excellence",
      desc: "Houses 128 high-density GPU computing clusters with direct gigabit optic pipelines for machine learning, autonomous drone software, and quantum simulations.",
      stat: "128 GPUs",
      tourSpecs: ["NVIDIA H100 & A100 Research Clusters", "10 Gbps Dedicated Dark Fiber", "24/7 Biometric Student Lab Access", "Liquid-Cooled Rack Architecture"],
    },
    {
      title: "10,000-Seat Grand Amphitheater & Eco-Lake",
      category: "Architecture & Eco-Biosphere",
      tag: "Green Campus",
      desc: "Designed around a natural rainwater-harvesting freshwater lake, offering students an open-air cultural arena, botanical gardens, and solar promenade.",
      stat: "150 Acres",
      tourSpecs: ["Zero-Carbon Solar Shade Canopy", "Botanical Wetland Filtration System", "Dolby Atmos Open-Air Acoustics", "Lakeside Study Gazebos with Wi-Fi 7"],
    },
    {
      title: "Olympic-Standard Indoor Sports & Aquatic Pavilion",
      category: "Athletics & Student Life",
      tag: "Sports Complex",
      desc: "Features a temperature-regulated 50m Olympic swimming pool, FIFA-grade turf ground, basketball arena, and professional fitness gymnasium.",
      stat: "24/7 Access",
      tourSpecs: ["50-Meter Heated Competition Pool", "FIFA Quality Pro Artificial Turf", "Badminton, Squash & Indoor Basketball", "Sports Science & Recovery Clinic"],
    },
    {
      title: "International Scholars Tower & Residence Suites",
      category: "Student Housing",
      tag: "Smart Living",
      desc: "High-speed Wi-Fi 7 enabled student dormitories, individual study suites, laundry care, 24/7 armed biometric security, and dedicated dining halls.",
      stat: "4,500 Capacity",
      tourSpecs: ["Single & Twin Private Air-Conditioned Suites", "Multi-Cuisine Hygienic Dining Halls", "RFID Smart Keycard & CCTV Mesh", "Direct Shuttle Terminal at Residence Gate"],
    },
  ];

  const activeRoute =
    SHUTTLE_ROUTES.find((r) => r.id === selectedRouteId) || SHUTTLE_ROUTES[0];

  const handleReserveShuttle = (routeId: string) => {
    const passId = "SHU-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    setBookedPasses((prev) => ({ ...prev, [routeId]: passId }));
  };

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
            Discover a transformative 150-acre green campus located in Dhaka, built to nurture academic rigor, creative collaboration, and seamless smart transit.
          </p>
        </div>

        {/* Facilities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
                <button
                  type="button"
                  onClick={() => setTourModalItem(h)}
                  className="text-emerald-400 font-bold hover:text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
                >
                  Inspect 3D Facilities &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= LIVE CAMPUS SHUTTLE TRACKER & ROUTE FINDER ================= */}
        <section
          id="shuttle"
          className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#071d2f] via-slate-900 to-[#061523] p-6 sm:p-10 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <span className="text-amber-400 font-black text-xs uppercase tracking-[0.2em] bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full inline-flex items-center gap-2">
                <Bus className="w-3.5 h-3.5" />
                Zero-Hassle Dhaka-Ashulia Commute
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Live Campus Shuttle Tracker & Route Finder
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Track real-time GPS fleet positions, AC coach seat availability, and reserve your digital boarding pass across 28 Wi-Fi 7 equipped university shuttles.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-2 rounded-2xl">
              <Wifi className="w-4 h-4 text-emerald-400" />
              28 Electric & AC Shuttles Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Route Selector */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                Select Pickup Zone
              </h3>
              {SHUTTLE_ROUTES.map((route) => {
                const isSelected = route.id === activeRoute.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-amber-400/15 border-amber-400 shadow-lg shadow-amber-400/10"
                        : "bg-slate-800/60 border-white/10 hover:bg-slate-800"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black text-white flex items-center gap-2">
                        {route.zone}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <Navigation className="w-3 h-3 text-emerald-400" />
                        {route.status}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono font-black text-amber-300 block">
                        ETA {route.etaMinutes}m
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {route.seatsAvailable} seats
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Telemetry & Route Timeline Card */}
            <div className="lg:col-span-7 bg-slate-800/75 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    {activeRoute.coachCode}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{activeRoute.zone}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {activeRoute.nextDeparture}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-white/10 px-4 py-3 rounded-2xl text-center">
                  <div className="text-2xl font-mono font-black text-amber-400">
                    {activeRoute.etaMinutes} MIN
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Next Arrival
                  </div>
                </div>
              </div>

              {/* Stop Timeline */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                  Live Corridor Stops
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeRoute.stops.map((stop, idx) => (
                    <div
                      key={stop}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/75 border border-white/5 text-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-black flex items-center justify-center flex-shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-200">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  Seat Capacity:{" "}
                  <strong className="text-emerald-400">
                    {activeRoute.seatsAvailable} / {activeRoute.totalSeats} Open
                  </strong>
                </div>

                {bookedPasses[activeRoute.id] ? (
                  <div className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Digital Bus Pass Active: {bookedPasses[activeRoute.id]}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleReserveShuttle(activeRoute.id)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Ticket className="w-4 h-4" />
                    Reserve Shuttle Seat Pass
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Native Modal for Campus Facility Virtual Spec */}
      <NativeDialog
        isOpen={Boolean(tourModalItem)}
        onClose={() => setTourModalItem(null)}
        titleId="campus-tour-dialog-title"
        title={tourModalItem?.title ?? "Facility Tour"}
      >
        {tourModalItem && (
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              {tourModalItem.category} • {tourModalItem.stat}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{tourModalItem.desc}</p>
            <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                Architectural & Technical Highlights
              </h4>
              {tourModalItem.tourSpecs.map((spec) => (
                <div key={spec} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Link
                href="/apply"
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                Schedule Physical Visit / Apply
              </Link>
            </div>
          </div>
        )}
      </NativeDialog>

      <Footer />
    </div>
  );
}
