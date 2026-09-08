"use client";

import React, { useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CRTEffectOverlay } from "@/components/CRTEffectOverlay";
import { CyberNav } from "@/components/CyberNav";
import { Scene3DHub } from "@/components/Scene3DHub";
import { CircuitTimeline } from "@/components/CircuitTimeline";
import { TechArmory } from "@/components/TechArmory";
import { HoloArcade } from "@/components/HoloArcade";
import { SystemProfile } from "@/components/SystemProfile";
import { TerminalCLI } from "@/components/TerminalCLI";
import { CommsTransmission } from "@/components/CommsTransmission";
import { CyberFooter } from "@/components/CyberFooter";
import { sound } from "@/lib/audio";
import { Terminal, Radio, Sparkles } from "lucide-react";

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleToggleSound = () => {
    const nextState = sound.toggleMute();
    setSoundEnabled(!nextState);
  };

  const handleToggleCRT = () => {
    setCrtEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] relative">
      {/* 1. Boot Sequence Overlay */}
      {!bootCompleted && (
        <BootSequence
          onComplete={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "instant" });
            }
            setBootCompleted(true);
          }}
        />
      )}

      {/* 2. CRT Scanline & Phosphor Overlay */}
      <CRTEffectOverlay enabled={crtEnabled} />

      {/* 3. Main Navigation Header */}
      <CyberNav
        crtEnabled={crtEnabled}
        onToggleCRT={handleToggleCRT}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 4. Interactive 3D Isometric Hub */}
      <Scene3DHub />

      {/* 5. Circuit Board Career Timeline */}
      <CircuitTimeline />

      {/* 6. The Armory: Tech & Skills Matrix */}
      <TechArmory />

      {/* 7. Holo Arcade: Projects & Game Systems */}
      <HoloArcade />

      {/* 8. Operator Profile: Bio & Attribute Matrix */}
      <SystemProfile />

      {/* 9. Comms Command Section: CLI Emulator & Transmission Form */}
      <section id="comms" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-b border-cyan-500/20">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full text-xs font-mono text-cyan-300 mb-4">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>COMMS RELAY // CLI TERMINAL & DIRECT TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-cyan">
              COMMAND CONSOLE & TRANSMISSION
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
              Execute live terminal commands or send an encrypted communication packet directly to Patrick Wong.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive CLI */}
            <div className="lg:col-span-6">
              <TerminalCLI
                onToggleSound={handleToggleSound}
                soundEnabled={soundEnabled}
              />
            </div>

            {/* Right: Encrypted Comms Form */}
            <div className="lg:col-span-6">
              <CommsTransmission />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cyber Footer */}
      <CyberFooter />
    </div>
  );
}
