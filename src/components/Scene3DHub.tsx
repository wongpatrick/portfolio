"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { sound } from "@/lib/audio";
import {
  Sparkles,
  ChevronDown,
  Layers,
  Terminal,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  sectionId: string;
  color: string;
  iconText: string;
  tagline: string;
  position: [number, number, number];
}

const INTERACTIVE_NODES: NodeData[] = [
  {
    id: "terminal",
    name: "CORE_MAINFRAME",
    sectionId: "profile",
    color: "#00f0ff",
    iconText: "🖥️",
    tagline: "Operator Profile, Medical Physics origin, and Leadership Core",
    position: [0, 1.2, 0],
  },
  {
    id: "career",
    name: "DATA_ARCHIVES",
    sectionId: "experience",
    color: "#f000ff",
    iconText: "📁",
    tagline: "Career Circuit Timeline (Applied Systems, Index Exchange, Precise)",
    position: [-2.4, 0.8, 1.2],
  },
  {
    id: "tech-core",
    name: "PLASMA_ARMORY",
    sectionId: "armory",
    color: "#00ff66",
    iconText: "⚡",
    tagline: "Tech Stack Matrix (Golang, React 19, Distributed Systems, K8s)",
    position: [2.4, 1.0, 1.0],
  },
  {
    id: "arcade",
    name: "HOLO_ARCADE",
    sectionId: "arcade",
    color: "#ffb800",
    iconText: "🕹️",
    tagline: "Projects Hub (wallpaper-vault, Project Anaconda, Godot 4)",
    position: [-2.0, 1.1, -2.0],
  },
  {
    id: "comms",
    name: "COMMS_RELAY",
    sectionId: "comms",
    color: "#38bdf8",
    iconText: "📡",
    tagline: "Encrypted Comms Transmission & Interactive CLI Console",
    position: [2.2, 1.3, -1.8],
  },
];

// Pre-allocated static vectors to prevent Garbage Collection pauses
const HOVER_SCALE = new THREE.Vector3(1.18, 1.18, 1.18);
const DEFAULT_SCALE = new THREE.Vector3(1, 1, 1);
const LOOK_AT_TARGET = new THREE.Vector3(0, 0.5, 0);

export const Scene3DHub: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Group>>(new Map());

  // Refs for zero-lag 60fps tracking without triggering React re-mounts
  const hoveredNodeIdRef = useRef<string | null>(null);
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#070a12");
    scene.fog = new THREE.FogExp2("#070a12", 0.07);
    sceneRef.current = scene;

    // 2. CAMERA (Isometric Perspective Angle)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 6, 7);
    camera.lookAt(LOOK_AT_TARGET);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight("#00f0ff", 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("#ffffff", 1.2);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Point lights for cyberpunk glow
    const cyanLight = new THREE.PointLight("#00f0ff", 3, 10);
    cyanLight.position.set(0, 2, 0);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight("#f000ff", 2.5, 8);
    magentaLight.position.set(-2, 1, 1);
    scene.add(magentaLight);

    const greenLight = new THREE.PointLight("#00ff66", 2.5, 8);
    greenLight.position.set(2, 1, 1);
    scene.add(greenLight);

    // 5. GLOWING CYBER CIRCUIT BOARD FLOOR
    const gridHelper = new THREE.GridHelper(24, 48, "#00f0ff", "rgba(0, 240, 255, 0.12)");
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    const circuitGroup = new THREE.Group();
    circuitGroup.position.y = 0.01;

    // A. Concentric Holographic Rings
    const ringConfigs = [
      { inner: 0.85, outer: 0.89, color: "#00f0ff", opacity: 0.8 },
      { inner: 1.6, outer: 1.63, color: "rgba(0, 240, 255, 0.3)", opacity: 0.4 },
      { inner: 2.7, outer: 2.73, color: "#f000ff", opacity: 0.5 },
      { inner: 4.4, outer: 4.45, color: "#00f0ff", opacity: 0.9 },
      { inner: 4.6, outer: 4.63, color: "#f000ff", opacity: 0.7 },
    ];

    ringConfigs.forEach((rc) => {
      const ringGeo = new THREE.RingGeometry(rc.inner, rc.outer, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: rc.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: rc.opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      circuitGroup.add(ringMesh);
    });

    // B. Orthogonal Glowing Circuit Traces
    const tracePaths = [
      // To Career Archives
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1.2, 0, 0), new THREE.Vector3(-1.2, 0, 1.2), new THREE.Vector3(-2.4, 0, 1.2)],
      // To Plasma Armory
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.2, 0, 0), new THREE.Vector3(1.2, 0, 1.0), new THREE.Vector3(2.4, 0, 1.0)],
      // To Holo Arcade
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1.0), new THREE.Vector3(-2.0, 0, -1.0), new THREE.Vector3(-2.0, 0, -2.0)],
      // To Comms Relay
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -0.9), new THREE.Vector3(2.2, 0, -0.9), new THREE.Vector3(2.2, 0, -1.8)],
    ];

    const traceColors = ["#f000ff", "#00ff66", "#ffb800", "#38bdf8"];
    const packetBeads: { mesh: THREE.Mesh; curve: THREE.CurvePath<THREE.Vector3>; offset: number }[] = [];

    tracePaths.forEach((pts, pIdx) => {
      const curve = new THREE.CurvePath<THREE.Vector3>();
      for (let i = 0; i < pts.length - 1; i++) {
        curve.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
      }

      // Tube trace
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.02, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: traceColors[pIdx],
        transparent: true,
        opacity: 0.85,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      circuitGroup.add(tubeMesh);

      // Junction solder pads at every corner
      pts.forEach((pt) => {
        const padGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 12);
        const padMat = new THREE.MeshBasicMaterial({ color: traceColors[pIdx] });
        const padMesh = new THREE.Mesh(padGeo, padMat);
        padMesh.position.copy(pt);
        circuitGroup.add(padMesh);
      });

      // Animated traveling data packet bead
      const beadGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const beadMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
      const beadMesh = new THREE.Mesh(beadGeo, beadMat);
      circuitGroup.add(beadMesh);
      packetBeads.push({ mesh: beadMesh, curve, offset: pIdx * 0.25 });
    });

    scene.add(circuitGroup);

    // 6. BUILD INTERACTIVE NODES
    INTERACTIVE_NODES.forEach((node) => {
      const group = new THREE.Group();
      group.position.set(...node.position);
      group.name = node.id;

      // Base pedestal for node
      const pedGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.15, 6);
      const pedMat = new THREE.MeshStandardMaterial({
        color: "#111827",
        metalness: 0.9,
        roughness: 0.3,
      });
      const pedMesh = new THREE.Mesh(pedGeo, pedMat);
      pedMesh.position.y = -0.4;
      group.add(pedMesh);

      let coreMesh: THREE.Group = new THREE.Group();

      if (node.id === "terminal") {
        // --- 1. ULTRAWIDE CYBER WORKSTATION (PROFILE) ---
        const wsGroup = new THREE.Group();

        // A. Desk Platform
        const deskGeo = new THREE.BoxGeometry(1.1, 0.04, 0.65);
        const deskMat = new THREE.MeshStandardMaterial({ color: "#0f172a", metalness: 0.8, roughness: 0.3 });
        const deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.position.y = -0.15;
        wsGroup.add(deskMesh);

        // B. Articulated Monitor Stand
        const standArmGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.32, 8);
        const standMat = new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.9 });
        const standArm = new THREE.Mesh(standArmGeo, standMat);
        standArm.position.set(0, 0.05, -0.15);
        wsGroup.add(standArm);

        // C. Curved Ultrawide Display
        const monHousingMat = new THREE.MeshStandardMaterial({ color: "#020617", metalness: 0.9, roughness: 0.2 });
        const screenMat = new THREE.MeshBasicMaterial({ color: "#00f0ff" });

        // Center panel
        const centerPanel = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.03), monHousingMat);
        centerPanel.position.set(0, 0.18, -0.12);
        const centerScr = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.28), screenMat);
        centerScr.position.z = 0.018;
        centerPanel.add(centerScr);
        wsGroup.add(centerPanel);

        // Left curved wing
        const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.03), monHousingMat);
        leftWing.position.set(-0.35, 0.18, -0.09);
        leftWing.rotation.y = Math.PI * 0.12;
        const leftScr = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.28), screenMat);
        leftScr.position.z = 0.018;
        leftWing.add(leftScr);
        wsGroup.add(leftWing);

        // Right curved wing
        const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.03), monHousingMat);
        rightWing.position.set(0.35, 0.18, -0.09);
        rightWing.rotation.y = -Math.PI * 0.12;
        const rightScr = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.28), screenMat);
        rightScr.position.z = 0.018;
        rightWing.add(rightScr);
        wsGroup.add(rightWing);

        // D. RGB Mechanical Keyboard
        const kbGeo = new THREE.BoxGeometry(0.42, 0.025, 0.16);
        const kbMat = new THREE.MeshStandardMaterial({ color: "#1e293b", emissive: "#00f0ff", emissiveIntensity: 0.3 });
        const kbMesh = new THREE.Mesh(kbGeo, kbMat);
        kbMesh.position.set(0, -0.12, 0.12);
        wsGroup.add(kbMesh);

        // E. Mouse & Pad
        const padMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(0.16, 0.18),
          new THREE.MeshBasicMaterial({ color: "#0284c7", side: THREE.DoubleSide })
        );
        padMesh.rotation.x = -Math.PI / 2;
        padMesh.position.set(0.32, -0.128, 0.12);
        wsGroup.add(padMesh);

        const mouseMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.02, 0.08),
          new THREE.MeshBasicMaterial({ color: "#e2e8f0" })
        );
        mouseMesh.position.set(0.32, -0.115, 0.12);
        wsGroup.add(mouseMesh);

        // F. Floating Hologram Code Window
        const codePaneGeo = new THREE.PlaneGeometry(0.46, 0.24);
        const codePaneMat = new THREE.MeshBasicMaterial({
          color: "#00f0ff",
          wireframe: true,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide,
        });
        const codePane = new THREE.Mesh(codePaneGeo, codePaneMat);
        codePane.position.set(0, 0.44, -0.05);
        wsGroup.add(codePane);

        coreMesh = wsGroup;
      } else if (node.id === "tech-core") {
        // --- 2. PLASMA GYROSCOPE REACTOR (ARMORY) ---
        const reactorGroup = new THREE.Group();

        // 3 concentric gimbal rings rotating on multiple axes
        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(0.54, 0.02, 16, 48),
          new THREE.MeshBasicMaterial({ color: "#00ff66" })
        );
        ring1.name = "gyro_ring_1";
        reactorGroup.add(ring1);

        const ring2 = new THREE.Mesh(
          new THREE.TorusGeometry(0.42, 0.018, 16, 48),
          new THREE.MeshBasicMaterial({ color: "#00f0ff" })
        );
        ring2.name = "gyro_ring_2";
        reactorGroup.add(ring2);

        const ring3 = new THREE.Mesh(
          new THREE.TorusGeometry(0.30, 0.016, 16, 48),
          new THREE.MeshBasicMaterial({ color: "#f000ff" })
        );
        ring3.name = "gyro_ring_3";
        reactorGroup.add(ring3);

        // Central pulsing plasma core
        const coreSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 24, 24),
          new THREE.MeshBasicMaterial({ color: "#ffffff" })
        );
        reactorGroup.add(coreSphere);

        const cage = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.22, 0),
          new THREE.MeshStandardMaterial({ color: "#00ff66", emissive: "#00ff66", emissiveIntensity: 0.8, wireframe: true })
        );
        cage.name = "gyro_cage";
        reactorGroup.add(cage);

        coreMesh = reactorGroup;
      } else if (node.id === "career") {
        // --- 3. SERVER BLADE RACK (CAREER DATA ARCHIVES) ---
        const rackGroup = new THREE.Group();

        // Outer chassis cage
        const chassis = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 1.15, 0.52),
          new THREE.MeshStandardMaterial({ color: "#090d16", metalness: 0.9, roughness: 0.2 })
        );
        rackGroup.add(chassis);

        // 4 Stacked Server Blade Units
        const bladeYOffsets = [-0.36, -0.12, 0.12, 0.36];
        bladeYOffsets.forEach((yOff) => {
          // Blade faceplate
          const bladeFace = new THREE.Mesh(
            new THREE.BoxGeometry(0.60, 0.18, 0.04),
            new THREE.MeshStandardMaterial({ color: "#1e1b4b", emissive: "#f000ff", emissiveIntensity: 0.35 })
          );
          bladeFace.position.set(0, yOff, 0.25);
          rackGroup.add(bladeFace);

          // Dual pull handles
          const handleMat = new THREE.MeshStandardMaterial({ color: "#64748b", metalness: 0.9 });
          const leftHandle = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.09, 0.04), handleMat);
          leftHandle.position.set(-0.25, yOff, 0.27);
          rackGroup.add(leftHandle);

          const rightHandle = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.09, 0.04), handleMat);
          rightHandle.position.set(0.25, yOff, 0.27);
          rackGroup.add(rightHandle);

          // LED status strip
          [-0.12, -0.06, 0, 0.06, 0.12].forEach((xOff, lIdx) => {
            const ledColor = lIdx % 2 === 0 ? "#00ff66" : "#00f0ff";
            const led = new THREE.Mesh(
              new THREE.BoxGeometry(0.025, 0.025, 0.02),
              new THREE.MeshBasicMaterial({ color: ledColor })
            );
            led.position.set(xOff, yOff + 0.04, 0.275);
            rackGroup.add(led);
          });
        });

        // Top dual exhaust cooling vents
        [-0.15, 0.15].forEach((xOff) => {
          const vent = new THREE.Mesh(
            new THREE.CylinderGeometry(0.11, 0.11, 0.02, 16),
            new THREE.MeshBasicMaterial({ color: "#f000ff", wireframe: true })
          );
          vent.position.set(xOff, 0.58, 0);
          rackGroup.add(vent);
        });

        coreMesh = rackGroup;
      } else if (node.id === "arcade") {
        // --- 4. RETRO ARCADE CABINET (HOLO ARCADE) ---
        const arcadeGroup = new THREE.Group();

        // A. Lower base cabinet & coin door
        const baseCab = new THREE.Mesh(
          new THREE.BoxGeometry(0.58, 0.65, 0.52),
          new THREE.MeshStandardMaterial({ color: "#1e1b4b", metalness: 0.7, roughness: 0.3 })
        );
        baseCab.position.y = -0.22;
        arcadeGroup.add(baseCab);

        // Coin return slots
        const coinMat = new THREE.MeshBasicMaterial({ color: "#ffb800" });
        [-0.1, 0.1].forEach((xOff) => {
          const coinSlot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.09, 0.02), coinMat);
          coinSlot.position.set(xOff, -0.15, 0.27);
          arcadeGroup.add(coinSlot);
        });

        // B. Angled Control Deck
        const deck = new THREE.Mesh(
          new THREE.BoxGeometry(0.58, 0.05, 0.28),
          new THREE.MeshStandardMaterial({ color: "#0f172a", metalness: 0.9 })
        );
        deck.position.set(0, 0.14, 0.15);
        deck.rotation.x = Math.PI * 0.08;
        arcadeGroup.add(deck);

        // Joysticks (Ball tops)
        [-0.14, 0.14].forEach((xOff) => {
          const stick = new THREE.Mesh(
            new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8),
            new THREE.MeshStandardMaterial({ color: "#e2e8f0" })
          );
          stick.position.set(xOff, 0.18, 0.14);
          arcadeGroup.add(stick);

          const ball = new THREE.Mesh(
            new THREE.SphereGeometry(0.032, 12, 12),
            new THREE.MeshBasicMaterial({ color: "#ef4444" })
          );
          ball.position.set(xOff, 0.22, 0.14);
          arcadeGroup.add(ball);
        });

        // Action buttons
        const buttonColors = ["#00f0ff", "#ffb800", "#00ff66", "#f000ff"];
        [-0.05, 0, 0.05, 0.22].forEach((xOff, bIdx) => {
          const btn = new THREE.Mesh(
            new THREE.CylinderGeometry(0.016, 0.016, 0.015, 8),
            new THREE.MeshBasicMaterial({ color: buttonColors[bIdx % buttonColors.length] })
          );
          btn.position.set(xOff, 0.165, 0.18);
          arcadeGroup.add(btn);
        });

        // C. Recessed Angled CRT Game Screen
        const crtHousing = new THREE.Mesh(
          new THREE.BoxGeometry(0.52, 0.38, 0.1),
          new THREE.MeshStandardMaterial({ color: "#020617" })
        );
        crtHousing.position.set(0, 0.35, -0.05);
        crtHousing.rotation.x = -Math.PI * 0.12;
        arcadeGroup.add(crtHousing);

        const crtScreen = new THREE.Mesh(
          new THREE.PlaneGeometry(0.46, 0.32),
          new THREE.MeshBasicMaterial({ color: "#ffb800" })
        );
        crtScreen.position.set(0, 0.35, 0.01);
        crtScreen.rotation.x = -Math.PI * 0.12;
        arcadeGroup.add(crtScreen);

        // D. Top Backlit Marquee
        const marquee = new THREE.Mesh(
          new THREE.BoxGeometry(0.58, 0.14, 0.24),
          new THREE.MeshStandardMaterial({ color: "#090d16", emissive: "#ffb800", emissiveIntensity: 0.5 })
        );
        marquee.position.set(0, 0.58, 0.02);
        arcadeGroup.add(marquee);

        const marqueeFace = new THREE.Mesh(
          new THREE.PlaneGeometry(0.52, 0.10),
          new THREE.MeshBasicMaterial({ color: "#fbbf24" })
        );
        marqueeFace.position.set(0, 0.58, 0.142);
        arcadeGroup.add(marqueeFace);

        coreMesh = arcadeGroup;
      } else {
        // --- 5. SATELLITE COMMS TOWER (COMMS RELAY) ---
        const commsGroup = new THREE.Group();

        // Triangular lattice truss legs
        const legMat = new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.9, roughness: 0.3 });
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.22, 0.5, 3), legMat);
        mast.position.y = -0.15;
        commsGroup.add(mast);

        // Dual-axis motorized gimbal mount
        const gimbal = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 12, 12),
          new THREE.MeshStandardMaterial({ color: "#0284c7", metalness: 0.9, roughness: 0.2 })
        );
        gimbal.position.y = 0.12;
        commsGroup.add(gimbal);

        // Parabolic Dish (angled upward toward sky)
        const dishGeo = new THREE.SphereGeometry(0.42, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.2);
        const dishMat = new THREE.MeshStandardMaterial({
          color: "#0369a1",
          emissive: "#38bdf8",
          emissiveIntensity: 0.5,
          side: THREE.DoubleSide,
          metalness: 0.7,
          roughness: 0.2,
        });
        const dish = new THREE.Mesh(dishGeo, dishMat);
        dish.position.set(0, 0.18, 0);
        dish.rotation.x = Math.PI * 0.75;
        dish.rotation.y = Math.PI * 0.15;
        commsGroup.add(dish);

        // 3 Support struts converging to feed horn
        const strutMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0" });
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 6), strutMat);
        strut.position.set(0, 0.30, 0.14);
        strut.rotation.x = Math.PI * 0.75;
        commsGroup.add(strut);

        // Glowing emitter horn tip
        const emitter = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 12),
          new THREE.MeshBasicMaterial({ color: "#38bdf8" })
        );
        emitter.position.set(0, 0.42, 0.26);
        commsGroup.add(emitter);

        // Expanding radio wave signal rings
        const wave1 = new THREE.Mesh(
          new THREE.RingGeometry(0.12, 0.14, 24),
          new THREE.MeshBasicMaterial({ color: "#38bdf8", side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
        );
        wave1.position.set(0, 0.44, 0.28);
        wave1.rotation.x = Math.PI * 0.75;
        commsGroup.add(wave1);

        coreMesh = commsGroup;
      }

      coreMesh.castShadow = true;
      group.add(coreMesh);

      // Outer holographic halo ring
      const haloGeo = new THREE.RingGeometry(0.55, 0.62, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      haloMesh.position.y = -0.1;
      group.add(haloMesh);

      scene.add(group);
      nodeMeshesRef.current.set(node.id, group);
    });

    // 7. PARTICLES
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = Math.random() * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: "#00f0ff",
      size: 0.05,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. HIGH-PERFORMANCE RAYCASTER
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let lastRaycastTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouse.x = normX;
      mouse.y = normY;
      mouseTargetRef.current.x = normX;
      mouseTargetRef.current.y = normY;

      // Throttle raycasting to max 60Hz (~16ms) to avoid CPU spikes during fast cursor movement
      const now = performance.now();
      if (now - lastRaycastTime < 16) return;
      lastRaycastTime = now;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      let foundNode: NodeData | null = null;
      if (intersects.length > 0) {
        for (const hit of intersects) {
          let curr: THREE.Object3D | null = hit.object;
          while (curr && curr !== scene) {
            const match = INTERACTIVE_NODES.find((n) => n.id === curr?.name);
            if (match) {
              foundNode = match;
              break;
            }
            curr = curr.parent;
          }
          if (foundNode) break;
        }
      }

      const newId = foundNode ? foundNode.id : null;
      if (newId !== hoveredNodeIdRef.current) {
        hoveredNodeIdRef.current = newId;
        setHoveredNode(foundNode);
        if (foundNode) {
          sound.playHover();
        }
      }
    };

    const handleClick = () => {
      const activeId = hoveredNodeIdRef.current;
      if (activeId) {
        sound.playClick();
        const node = INTERACTIVE_NODES.find((n) => n.id === activeId);
        if (node) {
          const element = document.getElementById(node.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("click", handleClick);

    // 9. ANIMATION LOOP (Butter-smooth 60fps locked, Zero allocations per frame)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Parallax Lerp
      const targetCamX = 7 + mouseTargetRef.current.x * 0.7;
      const targetCamY = 6 + mouseTargetRef.current.y * 0.4;
      const targetCamZ = 7 - mouseTargetRef.current.x * 0.4;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(LOOK_AT_TARGET);

      // Rotate nodes & animate idle floating
      const currentHoveredId = hoveredNodeIdRef.current;
      nodeMeshesRef.current.forEach((mesh, id) => {
        mesh.rotation.y = elapsedTime * 0.4;
        mesh.position.y += Math.sin(elapsedTime * 2 + id.length) * 0.0012;

        // Smooth scale lerp using static vector references
        if (currentHoveredId === id) {
          mesh.scale.lerp(HOVER_SCALE, 0.15);
        } else {
          mesh.scale.lerp(DEFAULT_SCALE, 0.15);
        }

        // Sub-animations for tech-core gyroscope
        if (id === "tech-core") {
          const r1 = mesh.getObjectByName("gyro_ring_1");
          const r2 = mesh.getObjectByName("gyro_ring_2");
          const r3 = mesh.getObjectByName("gyro_ring_3");
          const cage = mesh.getObjectByName("gyro_cage");
          if (r1) r1.rotation.x = elapsedTime * 0.8;
          if (r2) r2.rotation.y = elapsedTime * -0.7;
          if (r3) r3.rotation.z = elapsedTime * 0.9;
          if (cage) {
            cage.rotation.x = elapsedTime * 0.5;
            cage.rotation.y = elapsedTime * 0.6;
          }
        }
      });

      // Animate traveling circuit data beads
      packetBeads.forEach((pb) => {
        const t = ((elapsedTime * 0.25 + pb.offset) % 1 + 1) % 1;
        const pt = pb.curve.getPointAt(t);
        if (pt) {
          pb.mesh.position.set(pt.x, pt.y + 0.02, pt.z);
        }
      });

      // Slowly rotate particles
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 10. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run ONCE on mount for continuous high-performance WebGL rendering



  const jumpToNode = useCallback((node: NodeData) => {
    sound.playClick();
    const element = document.getElementById(node.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTimeline = useCallback(() => {
    sound.playClick();
    const element = document.getElementById("experience");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToCLI = useCallback(() => {
    sound.playClick();
    const element = document.getElementById("comms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hub"
      className="relative w-full h-screen min-h-[100dvh] bg-[#070a12] overflow-hidden border-b border-cyan-500/20 flex flex-col justify-between"
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-default" />

      {/* Top Cyber HUD Title Overlay */}
      <div className="relative z-10 pt-24 px-6 sm:px-12 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="bg-[#090e1c]/80 backdrop-blur-md border border-cyan-500/30 p-4 sm:p-5 rounded-xl shadow-2xl max-w-lg pointer-events-auto">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-spin" />
              <span>WONG_OS v8.0 // 3D COMMAND WORKSTATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight text-glow-cyan">
              PATRICK WONG
            </h1>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono mt-0.5">
              SENIOR SOFTWARE ENGINEER & TECH LEAD
            </div>
            <p className="text-xs text-slate-300 font-mono mt-2 leading-relaxed">
              Specializing in Go microservices, React 18/19 frontend modernization, zero-to-one team leadership, and Godot C# game engines.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={scrollToTimeline}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-950 font-bold text-xs font-mono rounded tracking-wider shadow-md flex items-center space-x-1.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>EXPLORE CAREER MATRIX</span>
              </button>

              <button
                onClick={scrollToCLI}
                className="px-3.5 py-1.5 bg-[#0e162a] hover:bg-[#16223f] border border-cyan-500/40 text-cyan-300 font-mono text-xs rounded tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>OPEN CLI CONSOLE</span>
              </button>
            </div>
          </div>

          {/* Right Top Status */}
          <div className="flex flex-col space-y-2 pointer-events-auto">
            <div className="bg-[#090e1c]/80 backdrop-blur border border-slate-800 px-3.5 py-2 rounded-lg text-xs font-mono text-slate-300 flex items-center space-x-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SYS_ONLINE // REMOTE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Node Interactive Tooltip / Target HUD */}
      {hoveredNode && (
        <div className="relative z-10 mx-auto pointer-events-none animate-flicker px-4 mb-2">
          <div
            className="bg-[#090e1c]/95 border-2 rounded-xl p-4 shadow-2xl flex items-center space-x-4 max-w-lg min-w-[300px] sm:min-w-[360px]"
            style={{ borderColor: hoveredNode.color }}
          >
            <div className="text-3xl select-none">{hoveredNode.iconText}</div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold tracking-widest text-slate-400">
                  TARGET ACQUIRED:
                </span>
                <span
                  className="text-sm font-extrabold tracking-wider"
                  style={{ color: hoveredNode.color }}
                >
                  {hoveredNode.name}
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5 font-mono">{hoveredNode.tagline}</p>
              <div className="text-[10px] text-cyan-400 mt-1 font-mono">
                CLICK TO ENGAGE JUMP LINK ➔
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Node Quick Jump Strip & Animated Scroll Indicator */}
      <div className="relative z-10 pb-6 px-6 max-w-7xl mx-auto w-full flex flex-col items-center gap-4">
        {/* Node Buttons Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
          {INTERACTIVE_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => jumpToNode(node)}
              onMouseEnter={() => {
                hoveredNodeIdRef.current = node.id;
                setHoveredNode(node);
                sound.playHover();
              }}
              onMouseLeave={() => {
                hoveredNodeIdRef.current = null;
                setHoveredNode(null);
              }}
              className="px-3 py-1.5 bg-[#0b1020]/90 hover:bg-[#131d36] border border-cyan-500/30 rounded-lg text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>{node.iconText}</span>
              <span className="font-semibold text-slate-200">{node.name}</span>
            </button>
          ))}
        </div>

        {/* Pulsing Down-Arrow Scroll Indicator */}
        <button
          onClick={scrollToTimeline}
          className="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-colors pointer-events-auto cursor-pointer group mt-1"
        >
          <span className="text-[10px] font-mono tracking-widest text-slate-400 group-hover:text-cyan-300 transition-colors">
            SCROLL TO ENGAGE NEURAL MATRIX
          </span>
          <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
};
