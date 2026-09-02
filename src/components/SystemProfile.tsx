"use client";

import React from "react";
import { SYSTEM_PROFILE } from "@/data/systemProfileData";
import { sound } from "@/lib/audio";
import {
  User,
  GraduationCap,
  Sparkles,
  Cpu,
  Shield,
  Zap,
  CheckCircle2,
  Atom,
  Terminal,
} from "lucide-react";

export const SystemProfile: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return Cpu;
      case "Shield":
        return Shield;
      case "Zap":
        return Zap;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="profile" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080c16] border-b border-cyan-500/20">
      {/* Background Matrix */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full text-xs font-mono text-cyan-300 mb-4">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATOR PROFILE // ATTRIBUTE MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-cyan">
            BIOGRAPHY & PHILOSOPHY
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
            Bridging scientific analytical rigor with distributed systems engineering and people leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Origin Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0b1020]/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">
                    OPERATOR IDENTITY: PATRICK WONG
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400">LOC: REMOTE</span>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                {SYSTEM_PROFILE.bio.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Medical Physics Academic Origin Callout */}
              <div className="mt-6 p-4 bg-[#070a12]/90 border border-cyan-500/40 rounded-lg relative">
                <div className="flex items-center space-x-2 text-cyan-300 font-mono text-xs font-bold mb-2">
                  <Atom className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>ACADEMIC FOUNDATION: MEDICAL PHYSICS (B.Sc.)</span>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  <span className="font-semibold text-slate-100">
                    {SYSTEM_PROFILE.education.institution}
                  </span>{" "}
                  • {SYSTEM_PROFILE.education.location} ({SYSTEM_PROFILE.education.year})
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-2 leading-relaxed italic">
                  "{SYSTEM_PROFILE.education.crossoverNote}"
                </p>
              </div>
            </div>

            {/* Core Values / Leadership Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SYSTEM_PROFILE.coreValues.map((val, idx) => {
                const Icon = getIcon(val.icon);
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => sound.playHover()}
                    className="bg-[#0b1020]/90 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl transition-all shadow-md"
                  >
                    <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold mb-1">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed mt-1">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cyber Attribute Radar / Trait Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b1020]/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>NEURAL ATTRIBUTE MATRIX</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">CALIBRATED // 2026</span>
              </div>

              {/* Trait Bars */}
              <div className="space-y-4">
                {SYSTEM_PROFILE.traits.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{t.name}</span>
                      <span className="text-cyan-400 font-bold">{t.score}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 transition-all duration-700"
                        style={{ width: `${t.score}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono">
                      {t.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
