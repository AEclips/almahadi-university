"use client";

import React, { useEffect, useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Interactive dark-luxury card surface that renders a GPU-composited radial
 * spotlight glow tracking pointer movement via CSS custom properties.
 */
export function SpotlightCard({ children, className = "", ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    props.onPointerMove?.(e);
  };

  return (
    <div
      ref={cardRef}
      {...props}
      onPointerMove={handlePointerMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

/**
 * Animates numeric university impact counters once scrolled into view while
 * honoring prefers-reduced-motion immediately.
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  durationMs = 1300,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(target);
  const elRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(target * eased));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setDisplayValue(target);
          }
        };
        setDisplayValue(0);
        requestAnimationFrame(step);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={elRef}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Renders top scroll progress indicator and provides IntersectionObserver / scroll
 * fallbacks for browsers lacking CSS Scroll-Driven Animations.
 */
export function KineticFallbackBridge() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersNoReduced = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const supportsViewTimeline =
      typeof CSS !== "undefined" &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (!prefersNoReduced || supportsViewTimeline) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".kinetic-reveal"));
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        el.classList.add("kinetic-fallback-pending");
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("kinetic-fallback-pending");
            entry.target.classList.add("kinetic-fallback-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    targets.forEach((el) => {
      if (el.classList.contains("kinetic-fallback-pending")) {
        revealObserver.observe(el);
      }
    });

    const heroWrapper = document.querySelector<HTMLElement>(".hero-parallax-wrapper");
    const heroImg = document.querySelector<HTMLElement>(".hero-parallax-img");
    let ticking = false;

    const updateParallax = () => {
      ticking = false;
      if (!heroWrapper || !heroImg) return;
      const rect = heroWrapper.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolled = Math.max(0, -rect.top);
      const ratio = Math.min(scrolled / Math.max(rect.height, 1), 1);
      const translateY = ratio * 12 - 4;
      const scale = 1.08 + ratio * 0.06;
      heroImg.style.transform = `translateY(${translateY.toFixed(2)}%) scale(${scale.toFixed(3)})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    if (heroWrapper && heroImg) {
      window.addEventListener("scroll", onScroll, { passive: true });
      updateParallax();
    }

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="scroll-progress-bar" aria-hidden="true" />;
}
