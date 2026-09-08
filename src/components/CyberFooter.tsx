"use client";

import React from "react";
import { sound } from "@/lib/audio";
import { ArrowUp, Terminal, Shield, Cpu, Sparkles } from "lucide-react";

export const CyberFooter: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05080e] border-t border-cyan-500/20 py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-cyan-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>PATRICK WONG // WONG_OS v8.0</span>
          </div>
          <div className="text-[11px] text-slate-500">
            ENGINEERED WITH NEXT.JS 15 • THREE.JS WEBGL • TAILWIND CSS • WEB AUDIO SYNTH
          </div>
        </div>

        {/* Middle register flags */}
        <div className="flex items-center space-x-4 text-[10px] text-slate-500 border border-slate-800/80 px-3 py-1.5 rounded-lg bg-[#070b14]">
          <span className="text-cyan-400">REG: 0x00FF89</span>
          <span>•</span>
          <span className="text-emerald-400">STACK: GOLANG / REACT 19</span>
          <span>•</span>
          <span className="text-fuchsia-400">FPS: 60 FIXED</span>
        </div>

        {/* Right back to top */}
        <div className="flex items-center space-x-4">
          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Patrick Wong. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
            title="Return to Hub"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[10px] font-bold">TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
