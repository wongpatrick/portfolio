"use client";

import React from "react";

interface CRTEffectOverlayProps {
  enabled: boolean;
}

export const CRTEffectOverlay: React.FC<CRTEffectOverlayProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Scanline pattern */}
      <div className="crt-scanlines absolute inset-0 opacity-40" />

      {/* Radial vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 60%, rgba(5, 8, 15, 0.8) 100%)"
        }}
      />

      {/* Subtle corner phosphor glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-fuchsia-500/5 blur-3xl" />
    </div>
  );
};
