"use client";

import React, { useState } from "react";
import { PROJECTS_DATA, ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/audio";
import {
  Gamepad2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Zap,
  X,
  CheckCircle2,
  Terminal,
  Cpu,
} from "lucide-react";

export const HoloArcade: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const openProjectModal = (proj: ProjectItem) => {
    sound.playClick();
    setSelectedProject(proj);
  };

  const closeModal = () => {
    sound.playClick();
    setSelectedProject(null);
  };

  return (
    <section id="arcade" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-b border-cyan-500/20">
      {/* Background Matrix */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-fuchsia-950/60 border border-fuchsia-500/40 rounded-full text-xs font-mono text-fuchsia-300 mb-4">
            <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-400 animate-bounce" />
            <span>HOLO ARCADE // SYSTEM CREATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-magenta">
            PROJECT MATRIX {/* & GAME ENGINES */}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
            {/* Cyberpunk stealth game systems in Godot 4,*/} Local ONNX vision machine learning pipelines, and internal company hackathon platforms.
          </p>
        </div>

        {/* Project Cartridge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openProjectModal(proj)}
              onMouseEnter={() => sound.playHover()}
              className="bg-[#0c1222]/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-fuchsia-500/60 hover:-translate-y-1.5 cursor-pointer relative group overflow-hidden"
              style={{
                borderTopColor: proj.accentColor,
                borderTopWidth: "4px",
              }}
            >
              {/* Corner cartridge notch */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-slate-900 border-l border-b border-slate-800 cyber-clip-tr pointer-events-none" />

              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider"
                  style={{
                    backgroundColor: `${proj.accentColor}15`,
                    color: proj.accentColor,
                    border: `1px solid ${proj.accentColor}40`,
                  }}
                >
                  {proj.category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">{proj.year}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>
              <div className="text-xs text-slate-400 font-mono mt-1">
                {proj.subtitle}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 my-5 pt-3 border-t border-slate-800">
                {proj.stats.map((s, idx) => (
                  <div key={idx} className="bg-[#070a12]/80 p-2 rounded border border-slate-800 text-center">
                    <div className="text-xs font-bold font-mono text-cyan-300">{s.value}</div>
                    <div className="text-[9px] text-slate-400 font-mono truncate">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded text-[10px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>INSPECT SYSTEM ARCHITECTURE</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="bg-[#0c1222] border-2 border-fuchsia-500/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            style={{
              boxShadow: `0 0 40px ${selectedProject.accentColor}30`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Status */}
            <div className="flex items-center space-x-3 mb-3">
              <span
                className="px-2.5 py-0.5 rounded text-xs font-mono font-bold"
                style={{
                  backgroundColor: `${selectedProject.accentColor}20`,
                  color: selectedProject.accentColor,
                  border: `1px solid ${selectedProject.accentColor}50`,
                }}
              >
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                STATUS: {selectedProject.status}
              </span>
            </div>

            {/* Modal Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              {selectedProject.title}
            </h2>
            <p className="text-sm font-semibold text-cyan-400 font-mono mt-1">
              {selectedProject.subtitle}
            </p>

            {/* Long Description */}
            <p className="mt-4 text-sm text-slate-300 font-mono leading-relaxed">
              {selectedProject.longDescription}
            </p>

            {/* Architectural Highlights */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider mb-3">
                SYSTEM ARCHITECTURE & TECHNICAL SPECIFICATIONS:
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
                {selectedProject.architectureDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Badges */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider mb-2">
                TECHNOLOGY STACK:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
              >
                CLOSE INSPECTOR
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
