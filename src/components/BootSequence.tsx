"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal, Shield, Cpu, Zap, Radio, ChevronRight, Play } from "lucide-react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: "BIOS_SYS_INIT :: WONG_KERNEL_8.0.26_RELEASE", type: "system", delay: 80 },
  { text: "CPU :: 64-CORE DISTRIBUTED NEURAL GOROUTINE POOL ... [OK]", type: "info", delay: 100 },
  { text: "MEMORY :: 1024GB DISTRIBUTED CACHE AT 0x00FF89 ... [VERIFIED]", type: "info", delay: 120 },
  { text: "CHECKING SYSTEM INTEGRITY: MEDICAL_PHYSICS_CORE ... [CALIBRATED]", type: "success", delay: 150 },
  { text: "MOUNTING /DEV/EXPERIENCE :: APPLIED_SYSTEMS & INDEX_EXCHANGE ... [MOUNTED]", type: "success", delay: 180 },
  { text: "CONCURRENCY ENGINE :: OPTIMISTIC_SOFT_LOCK (/v1/lock) ... [ACTIVE]", type: "accent", delay: 200 },
  { text: "FRONTEND HYDRATION :: REACT 18/19 + TANSTACK QUERY LAYER ... [LOADED]", type: "info", delay: 220 },
  { text: "OBSERVABILITY ENGINE :: DATADOG_14DAY_APM_TELEMETRY ... [STREAMING]", type: "info", delay: 240 },
  { text: "GAME ENGINE :: GODOT_4_CSHARP & ONNX_LOCAL_INFERENCE ... [SYNCED]", type: "success", delay: 260 },
  { text: "WEBGL PIPELINE :: THREE.JS 3D ISOMETRIC WORKSPACE ... [ACCELERATED]", type: "accent", delay: 280 },
  { text: "ALL SUB-SYSTEMS NOMINAL. READY FOR OPERATOR LOGIN.", type: "highlight", delay: 300 },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<typeof BOOT_LOGS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    sound.playBootSweep();

    let timeoutId: NodeJS.Timeout;
    if (currentIndex < BOOT_LOGS.length) {
      const item = BOOT_LOGS[currentIndex];
      timeoutId = setTimeout(() => {
        setLines((prev) => [...prev, item]);
        sound.playKeyChirp();
        setCurrentIndex((prev) => prev + 1);
      }, item.delay);
    } else {
      setIsReady(true);
      sound.playSuccess();
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  const handleEnter = () => {
    sound.playClick();
    sound.playSuccess();
    setIsExiting(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleSkip = () => {
    sound.playClick();
    setIsExiting(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#05080e] p-6 sm:p-12 font-mono transition-opacity duration-500 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div className="flex items-center space-x-3 text-cyan-400">
          <Terminal className="w-5 h-5 animate-pulse" />
          <span className="text-xs sm:text-sm tracking-widest font-bold">WONG_OS v8.0 // BOOT_SEQUENCE</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>NODE_REMOTE</span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded hover:bg-cyan-900/60 transition-colors flex items-center space-x-1"
          >
            <span>BYPASS BOOT</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Center Console Logs & ASCII Banner */}
      <div className="relative z-10 my-auto max-w-4xl w-full mx-auto space-y-6">
        {/* ASCII Header */}
        <pre className="text-[9px] sm:text-xs leading-none text-cyan-400 font-mono select-none overflow-x-auto opacity-90 text-glow-cyan">
{`
 ██████╗  █████╗ ████████╗██████╗ ██╗ ██████╗██╗  ██╗    ██╗    ██╗ ██████╗ ███╗   ██╗ ██████╗ 
 ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██║██╔════╝██║ ██╔╝    ██║    ██║██╔═══██╗████╗  ██║██╔════╝ 
 ██████╔╝███████║   ██║   ██████╔╝██║██║     █████╔╝     ██║ █╗ ██║██║   ██║██╔██╗ ██║██║  ███╗
 ██╔═══╝ ██╔══██║   ██║   ██╔══██╗██║██║     ██╔═██╗     ██║███╗██║██║   ██║██║╚██╗██║██║   ██║
 ██║     ██║  ██║   ██║   ██║  ██║██║╚██████╗██║  ██╗    ╚███╔███╔╝╚██████╔╝██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝     ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
`}
        </pre>

        <div className="text-xs text-slate-400 tracking-wider">
          SENIOR SOFTWARE ENGINEER // TECH LEAD // SYSTEMS & GAME ARCHITECT
        </div>

        {/* Boot Terminal Output */}
        <div className="bg-[#090d18]/90 border border-cyan-500/30 rounded-lg p-4 sm:p-6 shadow-2xl max-h-72 overflow-y-auto space-y-1.5 text-xs sm:text-sm">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-cyan-600 select-none">&gt;</span>
              <span
                className={
                  line.type === "success"
                    ? "text-emerald-400"
                    : line.type === "accent"
                    ? "text-fuchsia-400 font-semibold"
                    : line.type === "highlight"
                    ? "text-cyan-300 font-bold"
                    : "text-slate-300"
                }
              >
                {line.text}
              </span>
            </div>
          ))}
          {!isReady && (
            <div className="flex items-center space-x-2 text-cyan-400">
              <span className="text-cyan-600">&gt;</span>
              <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Interactive Area */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-cyan-500/20 pt-4 gap-4">
        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>GOLANG / REACT 19</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>DISTRIBUTED ARCHITECTURE</span>
          </div>
          <div className="flex items-center space-x-1">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>THREE.JS 3D ENGINE</span>
          </div>
        </div>

        <div>
          {isReady ? (
            <button
              onClick={handleEnter}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-950 font-bold text-xs sm:text-sm rounded tracking-wider shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all transform hover:scale-105 active:scale-95 animate-bounce cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>[ INITIALIZE SYSTEM MAINFRAME ]</span>
            </button>
          ) : (
            <div className="text-xs text-cyan-400 animate-pulse flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5" />
              <span>COMPUTING SYSTEM MATRICES...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
