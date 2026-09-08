"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import { SYSTEM_PROFILE } from "@/data/systemProfileData";
import {
  Radio,
  Send,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

export const CommsTransmission: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setIsTransmitting(true);

    // Simulate cyber packet transmission
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSent(true);
      sound.playSuccess();

      // Launch cyberpunk confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#00f0ff", "#f000ff", "#00ff66", "#ffb800"],
        });
      } catch {
        // Fallback gracefully
      }
    }, 1500);
  };

  return (
    <div className="bg-[#0b1020]/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>ENCRYPTED COMMS TRANSMISSION</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">TLS 1.3 // 256-BIT</span>
      </div>

      {isSent ? (
        <div className="py-12 text-center space-y-4 font-mono">
          <div className="inline-flex p-4 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            TRANSMISSION BROADCAST SUCCESSFUL
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Packet received at node <span className="text-cyan-400">{SYSTEM_PROFILE.email}</span>. Operator Patrick Wong will acknowledge receipt shortly.
          </p>
          <button
            onClick={() => {
              sound.playClick();
              setIsSent(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            SEND ANOTHER TRANSMISSION
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">
                OPERATOR NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Commander Shepard"
                className="w-full bg-[#070a12] border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">
                COMMUNICATION FREQUENCY (EMAIL) *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. operator@domain.com"
                className="w-full bg-[#070a12] border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">
              TRANSMISSION SUBJECT
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Senior Software Engineer / Manager Role Discussion"
              className="w-full bg-[#070a12] border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">
              ENCRYPTED PAYLOAD (MESSAGE) *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter message text..."
              className="w-full bg-[#070a12] border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIRECT ROUTE TO WP.PATRICKWONG@GMAIL.COM</span>
            </div>

            <button
              type="submit"
              disabled={isTransmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-950 font-bold rounded-lg tracking-wider flex items-center space-x-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>{isTransmitting ? "TRANSMITTING PACKETS..." : "SEND TRANSMISSION"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Direct Coordinates Strip */}
      <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={`mailto:${SYSTEM_PROFILE.email}`}
          onClick={() => sound.playClick()}
          className="p-3 bg-[#070a12] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-center transition-all group"
        >
          <Mail className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="text-[10px] font-mono text-slate-400">EMAIL</div>
          <div className="text-xs font-mono font-bold text-slate-200 truncate">wp.patrickwong@gmail.com</div>
        </a>

        <a
          href={SYSTEM_PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="p-3 bg-[#070a12] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-center transition-all group"
        >
          <Linkedin className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="text-[10px] font-mono text-slate-400">LINKEDIN</div>
          <div className="text-xs font-mono font-bold text-slate-200">in/pwong-softeng</div>
        </a>

        <a
          href={SYSTEM_PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="p-3 bg-[#070a12] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-center transition-all group"
        >
          <Github className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="text-[10px] font-mono text-slate-400">GITHUB</div>
          <div className="text-xs font-mono font-bold text-slate-200">@wongpatrick</div>
        </a>
      </div>
    </div>
  );
};
