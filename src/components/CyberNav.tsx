"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import {
  Volume2,
  VolumeX,
  Tv,
  Terminal,
  Layers,
  FileDown,
  Menu,
  X,
  Compass,
  Cpu,
  Gamepad2,
  Send,
  User,
} from "lucide-react";

interface CyberNavProps {
  crtEnabled: boolean;
  onToggleCRT: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CyberNav: React.FC<CyberNavProps> = ({
  crtEnabled,
  onToggleCRT,
  soundEnabled,
  onToggleSound,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const formatUptime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const navLinks = [
    { label: "// HUB_3D", href: "#hub", icon: Compass },
    { label: "// CAREER", href: "#experience", icon: Layers },
    { label: "// ARMORY", href: "#armory", icon: Cpu },
    { label: "// ARCADE", href: "#arcade", icon: Gamepad2 },
    { label: "// PROFILE", href: "#profile", icon: User },
    { label: "// CLI_COMMS", href: "#comms", icon: Terminal },
  ];

  const handleLinkClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070a12]/90 backdrop-blur-md border-b border-cyan-500/30 shadow-2xl py-2.5"
          : "bg-gradient-to-b from-[#070a12] via-[#070a12]/80 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Callsign Brand */}
        <a
          href="#hub"
          onClick={() => sound.playClick()}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-9 h-9 bg-cyan-950/80 border border-cyan-400/60 rounded-md cyber-clip group-hover:border-cyan-300 transition-colors shadow-md shadow-cyan-500/20">
            <span className="font-mono text-cyan-300 font-extrabold text-sm tracking-tighter group-hover:text-cyan-200">
              PW
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-100 tracking-wider group-hover:text-cyan-400 transition-colors">
                PATRICK WONG
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 rounded">
                v8.0
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYS_ACTIVE</span>
              <span className="text-slate-600">|</span>
              <span>UPTIME: {formatUptime(uptimeSeconds)}</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40 rounded border border-transparent hover:border-cyan-500/30 transition-all flex items-center space-x-1.5"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Control Switches (Audio, CRT, Resume) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`p-2 rounded border text-xs flex items-center space-x-1 transition-all cursor-pointer ${
              soundEnabled
                ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-400/30"
                : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
            title={soundEnabled ? "Mute Cyber Audio" : "Enable Cyber Audio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[10px] hidden md:inline font-mono">
              {soundEnabled ? "SFX: ON" : "SFX: OFF"}
            </span>
          </button>

          {/* CRT Overlay Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleCRT();
            }}
            className={`p-2 rounded border text-xs flex items-center space-x-1 transition-all cursor-pointer ${
              crtEnabled
                ? "bg-fuchsia-950/80 border-fuchsia-400 text-fuchsia-300 shadow-sm shadow-fuchsia-400/30"
                : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
            title={crtEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
          >
            <Tv className="w-4 h-4" />
            <span className="text-[10px] hidden md:inline font-mono">
              {crtEnabled ? "CRT: ON" : "CRT: OFF"}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 bg-slate-900 border border-slate-700 text-slate-300 rounded hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a12]/95 border-b border-cyan-500/30 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block px-3 py-2 text-sm font-mono text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/50 rounded flex items-center space-x-2"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
