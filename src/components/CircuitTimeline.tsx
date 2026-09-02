"use client";

import React, { useState } from "react";
import { EXPERIENCE_DATA, ExperienceItem } from "@/data/experienceData";
import { sound } from "@/lib/audio";
import {
  Layers,
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const CircuitTimeline: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>(EXPERIENCE_DATA[0].id);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    [EXPERIENCE_DATA[0].id]: true,
  });

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-b border-cyan-500/20">
      {/* Circuit background traces */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full text-xs font-mono text-cyan-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>CIRCUIT PATH // CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-cyan">
            DISTRIBUTED CAREER MATRIX
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
            A decade of engineering high-throughput microservices, leading zero-to-one product squads, and cutting latency across AdTech, InsurTech, and payment systems.
          </p>
        </div>

        {/* Speed & High Impact Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#0b1020]/90 border border-cyan-500/40 p-4 rounded-lg shadow-lg box-glow-cyan">
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>PAGE LOAD SPEEDUP</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">14s → 0.5s</div>
            <div className="text-[11px] text-slate-400 mt-1">96% latency drop in Golang at Index Exchange</div>
          </div>

          <div className="bg-[#0b1020]/90 border border-fuchsia-500/40 p-4 rounded-lg shadow-lg box-glow-magenta">
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>MARKETPLACE REVENUE</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-fuchsia-300 font-mono">+20% GAIN</div>
            <div className="text-[11px] text-slate-400 mt-1">Audience deal targeting system at IX</div>
          </div>

          <div className="bg-[#0b1020]/90 border border-emerald-500/40 p-4 rounded-lg shadow-lg box-glow-green">
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5 mb-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>CONCURRENCY SOFT LOCK</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">/v1/lock</div>
            <div className="text-[11px] text-slate-400 mt-1">Zero edit collisions on enterprise accounts</div>
          </div>

          <div className="bg-[#0b1020]/90 border border-amber-500/40 p-4 rounded-lg shadow-lg">
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MASS DEPLOY TOOL</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">-90% TIME</div>
            <div className="text-[11px] text-slate-400 mt-1">Automated Node.js deployment engine</div>
          </div>
        </div>

        {/* Timeline Circuit Nodes */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-fuchsia-500 before:to-emerald-500">
          {EXPERIENCE_DATA.map((exp, idx) => {
            const isExpanded = expandedItems[exp.id] ?? false;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                } gap-6 group`}
              >
                {/* Node Center Pulsing Point */}
                <div
                  className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#07090e] border-2 flex items-center justify-center z-20 shadow-xl transition-transform group-hover:scale-125"
                  style={{ borderColor: exp.nodeColor }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: exp.nodeColor }}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${
                    isEven ? "sm:pr-4" : "sm:pl-4"
                  }`}
                >
                  <div
                    className="bg-[#0b1020]/95 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/50 relative overflow-hidden"
                    style={{
                      borderLeftColor: exp.nodeColor,
                      borderLeftWidth: "4px",
                    }}
                  >
                    {/* Top Tag & Period */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
                        style={{
                          backgroundColor: `${exp.nodeColor}15`,
                          color: exp.nodeColor,
                          border: `1px solid ${exp.nodeColor}40`,
                        }}
                      >
                        {exp.statusTag}
                      </span>
                      <div className="flex items-center space-x-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-mono tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 font-mono flex items-center space-x-2 mt-0.5">
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1 font-normal">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                      {exp.summary}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-800/80">
                      {exp.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="bg-[#07090e]/80 p-2 rounded border border-slate-800 text-center">
                          <div className="text-xs sm:text-sm font-bold font-mono text-cyan-300">{m.value}</div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-slate-900/90 text-slate-300 border border-slate-700/60 rounded text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expand / Collapse Button */}
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="w-full mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "HIDE DETAILED SYSTEM LOGS" : "EXPAND DETAILED SYSTEM LOGS"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Expanded Detailed Highlights */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2 text-xs text-slate-300 font-mono animate-fadeIn">
                        <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1">
                          KEY ARCHITECTURAL ACCOMPLISHMENTS:
                        </div>
                        {exp.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
