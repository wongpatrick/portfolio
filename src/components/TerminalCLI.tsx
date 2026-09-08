"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal, Send, Trash2, HelpCircle, Sparkles, Check } from "lucide-react";
import { EXPERIENCE_DATA } from "@/data/experienceData";
import { PROJECTS_DATA } from "@/data/projectsData";
import { SKILLS_DATA } from "@/data/skillsData";
import { SYSTEM_PROFILE } from "@/data/systemProfileData";

interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "success" | "accent";
  text: string | React.ReactNode;
}

interface TerminalCLIProps {
  onToggleSound?: () => void;
  soundEnabled?: boolean;
}

export const TerminalCLI: React.FC<TerminalCLIProps> = ({ onToggleSound, soundEnabled }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: "welcome-1",
      type: "accent",
      text: "WONG_OS v8.0 INTERACTIVE COMMAND LINE INTERFACE [READY]",
    },
    {
      id: "welcome-2",
      type: "output",
      text: "Type 'help' to view available system commands, or 'cat resume' for full text output.",
    },
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    sound.playKeyChirp();

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: OutputLine[] = [
      ...lines,
      { id: Math.random().toString(), type: "input", text: `$ ${trimmed}` },
    ];

    const lower = trimmed.toLowerCase();
    const args = lower.split(" ");
    const mainCmd = args[0];

    switch (mainCmd) {
      case "help":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: (
            <div className="space-y-1 text-slate-300 text-xs">
              <div className="text-cyan-400 font-bold mb-1">AVAILABLE MAINFRAME COMMANDS:</div>
              <div><span className="text-cyan-300 font-semibold">help</span> : Display this command registry</div>
              <div><span className="text-cyan-300 font-semibold">cat resume</span> : Dump full resume & achievements to console</div>
              <div><span className="text-cyan-300 font-semibold">skills</span> : List skill categories and proficiency matrix</div>
              <div><span className="text-cyan-300 font-semibold">experience</span> : Print career timeline & speed metrics</div>
              <div><span className="text-cyan-300 font-semibold">projects</span> : Show active projects (Godot C#, ONNX ML, Slack Bot)</div>
              <div><span className="text-cyan-300 font-semibold">contact</span> : Display direct comms and social coordinates</div>
              <div><span className="text-cyan-300 font-semibold">sfx</span> : Toggle procedural Web Audio sound effects</div>
              <div><span className="text-cyan-300 font-semibold">whoami</span> : Print current operator identity</div>
              <div><span className="text-cyan-300 font-semibold">sudo</span> : Request elevated administrative privileges</div>
              <div><span className="text-cyan-300 font-semibold">clear</span> : Clear console buffer</div>
            </div>
          ),
        });
        break;

      case "clear":
      case "cls":
        sound.playClick();
        setLines([]);
        setInput("");
        return;

      case "whoami":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "success",
          text: "GUEST_OPERATOR // AUTHENTICATED VIA WONG_OS GATEWAY",
        });
        break;

      case "sudo":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "accent",
          text: "PERMISSION GRANTED: Operator Patrick Wong elevates session to ROOT level. Enjoy exploring!",
        });
        break;

      case "cat":
        if (args[1] === "resume" || args[1] === "resume.md") {
          sound.playSuccess();
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="space-y-3 text-xs text-slate-300 bg-[#060810] p-4 rounded border border-cyan-500/30">
                <div className="text-cyan-400 font-bold text-sm">PATRICK WONG — SENIOR SOFTWARE ENGINEER & TECH LEAD</div>
                <div className="text-slate-400">Toronto, ON | wp.patrickwong@gmail.com | in/pwong-softeng</div>
                <div className="border-t border-slate-800 pt-2 font-semibold text-slate-200">CORE FOCUS:</div>
                <p>Distributed backend systems (Golang, gRPC, microservices), frontend modernization (React 18/19, TanStack Query), zero-to-one engineering team building, and game architecture in Godot 4.</p>
                <div className="border-t border-slate-800 pt-2 font-semibold text-slate-200">RECENT IMPACT:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Applied Systems: Spearheaded zero-to-one Benefits product, Soft Locking API, 3-Phase React 18 modernization.</li>
                  <li>Index Exchange: Engineered Golang server-side pagination (14s → 0.5s speedup), +20% ad targeting revenue.</li>
                  <li>Precise Parklink: Deployed Moneris EMV payment integrations & license plate detection tools.</li>
                </ul>
              </div>
            ),
          });
        } else {
          sound.playGlitch();
          newLines.push({
            id: Math.random().toString(),
            type: "error",
            text: `File not found: ${args[1] || ""}. Try 'cat resume'`,
          });
        }
        break;

      case "skills":
      case "armory":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: (
            <div className="space-y-2 text-xs">
              {SKILLS_DATA.map((cat) => (
                <div key={cat.id} className="text-slate-300">
                  <span className="text-cyan-400 font-bold">[{cat.name}]:</span>{" "}
                  {cat.skills.map((s) => s.name).join(", ")}
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "experience":
      case "career":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: (
            <div className="space-y-2 text-xs">
              {EXPERIENCE_DATA.map((e) => (
                <div key={e.id} className="text-slate-300">
                  <span className="text-fuchsia-400 font-bold">{e.period}</span> —{" "}
                  <span className="text-slate-100 font-semibold">{e.role}</span> @ {e.company}
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "projects":
      case "arcade":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: (
            <div className="space-y-2 text-xs">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt; {p.title}</span> ({p.category}) : {p.subtitle}
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "contact":
        sound.playSuccess();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: (
            <div className="space-y-1 text-xs text-slate-300">
              <div><span className="text-cyan-400 font-bold">EMAIL:</span> {SYSTEM_PROFILE.email}</div>
              <div><span className="text-cyan-400 font-bold">LINKEDIN:</span> {SYSTEM_PROFILE.linkedin}</div>
              <div><span className="text-cyan-400 font-bold">GITHUB:</span> {SYSTEM_PROFILE.github}</div>
              <div><span className="text-cyan-400 font-bold">LOCATION:</span> {SYSTEM_PROFILE.location}</div>
            </div>
          ),
        });
        break;

      case "sfx":
      case "audio":
        if (onToggleSound) {
          onToggleSound();
          newLines.push({
            id: Math.random().toString(),
            type: "success",
            text: `Procedural audio sound effects toggled.`,
          });
        }
        break;

      default:
        sound.playGlitch();
        newLines.push({
          id: Math.random().toString(),
          type: "error",
          text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`,
        });
    }

    setLines(newLines);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="bg-[#090d18] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* CLI Header */}
      <div className="bg-[#0c1220] border-b border-cyan-500/30 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span className="font-bold text-xs">WONG_OS // CLI EMULATOR</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              setLines([]);
            }}
            className="hover:text-cyan-300 transition-colors flex items-center space-x-1 cursor-pointer"
            title="Clear buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">CLEAR</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div ref={terminalContainerRef} className="p-4 sm:p-6 max-h-80 overflow-y-auto space-y-2 select-text">
        {lines.map((line) => (
          <div
            key={line.id}
            className={
              line.type === "input"
                ? "text-cyan-400 font-bold"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-emerald-400"
                : line.type === "accent"
                ? "text-fuchsia-400 font-semibold"
                : "text-slate-300"
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* CLI Prompt Line */}
      <div className="bg-[#060912] border-t border-slate-800 px-4 py-3 flex items-center space-x-2">
        <span className="text-cyan-400 select-none font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'cat resume', 'skills'..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm"
        />
        <button
          onClick={() => handleCommand(input)}
          className="p-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded cursor-pointer transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
