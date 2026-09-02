import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patrick Wong | Senior Software Engineer & Tech Lead // WONG_OS",
  description:
    "Cyberpunk 3D command center and interactive portfolio of Patrick Wong. Senior Software Engineer specializing in Golang, Distributed Systems, React 18/19 Frontend Architecture, and Game Engineering.",
  keywords: [
    "Patrick Wong",
    "Senior Software Engineer",
    "Engineering Manager",
    "Tech Lead",
    "Golang",
    "Distributed Systems",
    "React",
    "TypeScript",
    "Toronto Software Engineer",
    "Godot C#",
  ],
  authors: [{ name: "Patrick Wong" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,600;0,800;1,400&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-[#e2e8f0] antialiased selection:bg-[#00f0ff] selection:text-[#07090e]">
        {children}
      </body>
    </html>
  );
}
