"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Send, Sparkles, X, Bot, User, ArrowUpRight, Minimize2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  linkHref?: string;
  linkLabel?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How much scholarship for GPA 5.0?",
  "Spring 2026 admission deadline?",
  "Campus shuttle bus routes?",
  "Tell me about AI & CSE tuition fee",
];

function generateReply(query: string): {
  text: string;
  linkHref?: string;
  linkLabel?: string;
} {
  const q = query.toLowerCase();

  if (q.includes("scholarship") || q.includes("waiver") || q.includes("gpa") || q.includes("5.0")) {
    return {
      text: "Students with Golden GPA 5.0 in both SSC & HSC receive a guaranteed 75% to 100% Merit Scholarship Waiver! Combined GPA 9.5+ gets 50% off, and 9.0+ receives 30% off.",
      linkHref: "/#calculator",
      linkLabel: "Open Scholarship Calculator",
    };
  }
  if (q.includes("deadline") || q.includes("apply") || q.includes("admission") || q.includes("spring")) {
    return {
      text: "Spring 2026 Admissions are actively open! Online applications take under 2 minutes and instantly issue an official Tracking ID (AMIU-XXXXX). Spot admission scholarships are available until November 30.",
      linkHref: "/apply",
      linkLabel: "Start Online Application",
    };
  }
  if (q.includes("shuttle") || q.includes("bus") || q.includes("transport") || q.includes("campus") || q.includes("route")) {
    return {
      text: "AMIU operates 28 GPS-tracked AC Smart Shuttles across Dhaka (Dhanmondi, Mirpur, Uttara, Gulshan, Motijheel, Narayanganj) directly to our 150-acre Ashulia campus.",
      linkHref: "/campus#shuttle",
      linkLabel: "Track Live Shuttle Routes",
    };
  }
  if (q.includes("tuition") || q.includes("fee") || q.includes("cse") || q.includes("ai") || q.includes("cost") || q.includes("bba")) {
    return {
      text: "Regular 4-year total tuition ranges from ৳620,000 (BBA) to ৳850,000 (CSE / AI & Data Science). With our Golden Merit Scholarship, net tuition drops to just ৳212,500!",
      linkHref: "/#calculator",
      linkLabel: "Calculate Your Exact Fee",
    };
  }
  if (q.includes("faculty") || q.includes("research") || q.includes("paper") || q.includes("mentor")) {
    return {
      text: "Our faculty includes PhD scholars from MIT, Stanford, Cambridge & Tokyo Univ. You can browse published IEEE/NeurIPS papers and book 1-on-1 office hours online.",
      linkHref: "/faculty",
      linkLabel: "Browse Faculty & Research",
    };
  }
  if (q.includes("alumni") || q.includes("job") || q.includes("career") || q.includes("placement")) {
    return {
      text: "96.4% of AMIU graduates are placed within 6 months at organizations including Google DeepMind, NVIDIA, Microsoft, Meta, Grab, and bKash.",
      linkHref: "/alumni",
      linkLabel: "Explore Alumni Network",
    };
  }
  if (q.includes("portal") || q.includes("erp") || q.includes("course") || q.includes("pay")) {
    return {
      text: "Logged-in students can access course add/drop registration, semester transcripts, and bKash/Card tuition checkout directly inside the Smart ERP Portal.",
      linkHref: "/portal",
      linkLabel: "Open Smart ERP Portal",
    };
  }

  return {
    text: "Thanks for asking! I can help you with Spring 2026 admissions, GPA scholarships (up to 100% off), live Dhaka shuttle routes, CSE/AI programs, faculty mentorship, or ERP portal access. What would you like to explore?",
    linkHref: "/apply",
    linkLabel: "Apply for Spring 2026",
  };
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Assalamu Alaikum! I am the AMIU Smart Admissions & Campus AI Guide. Ask me anything about scholarships, programs, shuttle buses, or admissions!",
      timestamp: "Online 24/7",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const clean = (textToSend ?? input).trim();
    if (!clean || isTyping) return;

    const nowLabel = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: clean,
      timestamp: nowLabel,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(clean);
      const botMsg: ChatMessage = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: reply.text,
        linkHref: reply.linkHref,
        linkLabel: reply.linkLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="AMIU AI Admissions Assistant"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[390px] rounded-3xl border border-amber-400/30 bg-[#071927]/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "min(76dvh, 560px)" }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#0b2438] via-[#0d2d45] to-[#0a2a36] px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  AMIU AI Advisor
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Instant Enrollment & Campus Help
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Advisor"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-950/40"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-amber-400 text-slate-950 font-semibold rounded-tr-sm"
                      : "bg-slate-800/90 border border-white/10 text-slate-200 rounded-tl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.linkHref && msg.linkLabel && (
                    <Link
                      href={msg.linkHref}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-amber-400 hover:text-amber-300 underline underline-offset-2"
                    >
                      {msg.linkLabel}
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === "user" ? "text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pl-9">
                <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                <span>AMIU AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompt Chips */}
          <div className="px-3 py-2 border-t border-white/10 bg-slate-900/90 flex gap-1.5 overflow-x-auto">
            {QUICK_PROMPTS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSend(chip)}
                className="flex-shrink-0 text-[10px] font-bold bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-white/10 px-2.5 py-1.5 rounded-full transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#061422] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about fees, waivers, shuttle..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 hover:brightness-110 transition font-black flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close AMIU AI Chat" : "Open AMIU AI Admissions Chat"}
        className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close AI Guide</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4" />
            <span>Ask AI Advisor</span>
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
          </>
        )}
      </button>
    </div>
  );
}
