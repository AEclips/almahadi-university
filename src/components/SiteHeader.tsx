"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  Award,
  Bell,
  Home,
} from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";

const PRIMARY_LINKS = [
  { label: "Campus & Shuttles", href: "/campus", matchPath: "/campus", icon: Building2 },
  { label: "Faculty & Research", href: "/faculty", matchPath: "/faculty", icon: Users },
  { label: "Alumni", href: "/alumni", matchPath: "/alumni", icon: Briefcase },
  { label: "Scholarships", href: "/#calculator", matchPath: "", icon: Award },
  { label: "Circulars", href: "/#notice", matchPath: "", icon: Bell },
];

export function SiteHeader({ rightExtra }: { rightExtra?: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const openDrawer = useCallback(async () => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    if (!drawer || !scroller) return;

    if (!drawer.open) {
      drawer.showModal();
    }

    if (typeof CSS === "undefined" || !CSS.supports("scroll-initial-target", "nearest")) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: "instant" as ScrollBehavior });
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );
    }

    scroller.scrollTo({ left: 0, behavior: "auto" });
  }, []);

  const closeDrawer = useCallback(() => {
    const scroller = scrollerRef.current;
    const drawer = drawerRef.current;
    if (!drawer?.open || !scroller) return;
    scroller.scrollTo({ left: scroller.offsetWidth, behavior: "auto" });
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!drawer || !scroller || !sheet) return;

    const visibleThreshold = 1 / Math.max(window.innerWidth, 320);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.intersectionRatio < visibleThreshold && drawer.open) {
          drawer.close();
          setDrawerOpen(false);
        }
        if (entry.intersectionRatio >= 0.99 && drawer.open) {
          setDrawerOpen(true);
        }
      },
      { root: drawer, threshold: [visibleThreshold, 1] }
    );
    observer.observe(sheet);

    const handleCancel = (e: Event) => {
      if (e.cancelable) {
        e.preventDefault();
        closeDrawer();
      }
    };

    const handleDialogClick = (e: MouseEvent) => {
      if (!sheet.contains(e.target as Node)) {
        closeDrawer();
      }
    };

    const handleDialogClose = () => {
      setDrawerOpen(false);
    };

    let removeBackdropFallback = () => {};
    if (typeof CSS === "undefined" || !CSS.supports("animation-timeline: scroll()")) {
      const syncBackdrop = () => {
        const width = sheet.offsetWidth || 1;
        const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / width));
        drawer.style.setProperty("--drawer-backdrop", String(ratio));
      };
      scroller.addEventListener("scroll", syncBackdrop, { passive: true });
      removeBackdropFallback = () => scroller.removeEventListener("scroll", syncBackdrop);
    }

    drawer.addEventListener("cancel", handleCancel);
    drawer.addEventListener("click", handleDialogClick);
    drawer.addEventListener("close", handleDialogClose);

    return () => {
      observer.disconnect();
      removeBackdropFallback();
      drawer.removeEventListener("cancel", handleCancel);
      drawer.removeEventListener("click", handleDialogClick);
      drawer.removeEventListener("close", handleDialogClose);
    };
  }, [closeDrawer]);

  return (
    <>
      {/* Slim Top Architectural Utility Strip */}
      <div className="bg-[#040e18] text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-white/10 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="uppercase tracking-wider text-slate-400 hidden sm:inline">Admissions 24/7:</span>
              <strong className="text-white">+880 9612-777999</strong>
            </span>
            <span className="hidden md:flex items-center gap-1.5 border-l border-white/10 pl-4">
              <Mail className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="text-amber-300 font-semibold">admission@almahadi.edu.bd</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {rightExtra}
            <Link
              href="/portal"
              aria-current={pathname === "/portal" ? "page" : undefined}
              className={`px-3 py-1 rounded-full font-black text-[11px] transition flex items-center gap-1.5 ${
                pathname === "/portal"
                  ? "bg-amber-300 text-slate-950 ring-2 ring-white/40"
                  : "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-sm"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student ERP Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Unified Sticky Translucent Glass Navbar */}
      <header className="sticky top-0 z-40 bg-[#061422]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Crest & Institutional Identity */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/amiu-logo.svg"
              alt="Al Mahadi International University Official Crest"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)] group-hover:scale-105 transition"
            />
            <div>
              <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-white block leading-none">
                AL MAHADI
              </span>
              <span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] uppercase block mt-0.5">
                International University
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1">
            {PRIMARY_LINKS.map((item) => {
              const isCurrent = item.matchPath !== "" && pathname === item.matchPath;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`relative px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition ${
                    isCurrent
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-amber-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Global Search + Apply CTA + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <GlobalSearch variant="header" />

            <Link
              href="/apply"
              aria-current={pathname === "/apply" ? "page" : undefined}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-400/20"
            >
              <span>Apply 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              ref={openBtnRef}
              type="button"
              onClick={openDrawer}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="amiu-mobile-drawer"
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white transition"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Native <dialog> Swipeable Mobile Navigation Drawer */}
      <dialog
        ref={drawerRef}
        id="amiu-mobile-drawer"
        aria-label="University Navigation Drawer"
        className="nav-drawer text-white"
      >
        <div ref={scrollerRef} className="nav-drawer-scroller">
          <nav
            ref={sheetRef}
            aria-label="Mobile Navigation"
            className="nav-drawer-sheet bg-[#061523] border-r border-white/15 shadow-2xl p-6"
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/amiu-logo.svg" alt="AMIU Crest" className="w-9 h-9 object-contain" />
                <div>
                  <span className="font-serif font-bold text-base text-white block leading-none">
                    AL MAHADI
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                    University Portal
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                autoFocus
                aria-label="Close navigation menu"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 hover:text-white transition"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <ul className="py-5 space-y-1.5">
              <li>
                <Link
                  href="/"
                  onClick={closeDrawer}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                    pathname === "/"
                      ? "bg-amber-400/15 text-amber-300 border-l-2 border-amber-400"
                      : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Home className="w-4 h-4 text-amber-400 flex-shrink-0" aria-hidden="true" />
                  <span>University Home</span>
                </Link>
              </li>

              {PRIMARY_LINKS.map((item) => {
                const Icon = item.icon;
                const isCurrent = item.matchPath !== "" && pathname === item.matchPath;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeDrawer}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                        isCurrent
                          ? "bg-amber-400/15 text-amber-300 border-l-2 border-amber-400"
                          : "text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}

              <li>
                <Link
                  href="/portal"
                  onClick={closeDrawer}
                  aria-current={pathname === "/portal" ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                    pathname === "/portal"
                      ? "bg-amber-400/15 text-amber-300 border-l-2 border-amber-400"
                      : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-amber-400 flex-shrink-0" aria-hidden="true" />
                  <span>Student ERP Portal</span>
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-center">
                <GlobalSearch variant="utility" />
              </div>
              <Link
                href="/apply"
                onClick={closeDrawer}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
              >
                <span>Apply for Spring 2026</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
