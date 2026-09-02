"use client";

import React, { useState } from "react";
import { SKILLS_DATA, SkillCategory, SkillItem } from "@/data/skillsData";
import { sound } from "@/lib/audio";
import {
  Cpu,
  Code2,
  Layout,
  Server,
  Terminal,
  Users,
  Sparkles,
  Zap,
  Filter,
  CheckCircle2,
} from "lucide-react";

export const TechArmory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return Code2;
      case "Layout":
        return Layout;
      case "Server":
        return Server;
      case "Terminal":
        return Terminal;
      case "Users":
        return Users;
      default:
        return Cpu;
    }
  };

  const filteredCategories =
    selectedCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((c) => c.id === selectedCategory);

  const totalSkillsCount = SKILLS_DATA.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <section id="armory" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080c16] border-b border-cyan-500/20">
      {/* Background Matrix */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-mono text-emerald-300 mb-4">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>THE ARMORY // TECH & SKILLS MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-green">
            WEAPONS & SYSTEMS ARSENAL
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
            Field-tested tools spanning compiled backends, reactive web clients, automated GitOps pipelines, and engineering leadership.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
                : "bg-[#0c1322] text-slate-300 border border-slate-700 hover:border-cyan-500/50"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>ALL MATRICES ({totalSkillsCount})</span>
          </button>

          {SKILLS_DATA.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? "text-slate-950 shadow-lg"
                    : "bg-[#0c1322] text-slate-300 border border-slate-700 hover:border-cyan-500/50"
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : undefined,
                  boxShadow: isSelected ? `0 0 15px ${cat.color}50` : undefined,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {filteredCategories.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);

            return (
              <div
                key={cat.id}
                className="bg-[#0b1020]/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Category Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2.5 rounded-lg border"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}40`,
                        color: cat.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-mono">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.skills.length} MODULES</span>
                  </div>
                </div>

                {/* Skill Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill, sIdx) => {
                    const isHovered = hoveredSkill?.name === skill.name;

                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={() => {
                          setHoveredSkill(skill);
                          sound.playHover();
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`bg-[#070a12]/90 border rounded-lg p-4 transition-all duration-200 relative group cursor-pointer ${
                          isHovered
                            ? "border-cyan-400 shadow-lg shadow-cyan-500/20 -translate-y-1"
                            : "border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        {/* Top Skill Row */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-slate-100 font-mono group-hover:text-cyan-300 transition-colors">
                              {skill.name}
                            </span>
                            {skill.featured && (
                              <span className="px-1.5 py-0.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded text-[9px] font-mono">
                                CORE
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">
                            {skill.experienceYears}
                          </span>
                        </div>

                        {/* Power Progress Bar */}
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mb-2.5">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: cat.color,
                              boxShadow: `0 0 8px ${cat.color}`,
                            }}
                          />
                        </div>

                        {/* Highlight / Context */}
                        <p className="text-[11px] text-slate-400 font-mono line-clamp-2 leading-relaxed">
                          {skill.highlight}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
