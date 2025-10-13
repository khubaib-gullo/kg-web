"use client";
import React from "react";
import "./globals.css";

// Next.js convention: import global styles here, or define them in the body/html tags.
// For this single-file demonstration, we inject the custom styles as before.

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const globalStyles = `
    /* Custom CSS and keyframes */
    .blink-cursor {
      animation: blink 1s step-start infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }
  `;

	return (
		<html lang="en">
			{/* We assume 'Inter' font is loaded via global CSS or Tailwind config in a real Next.js project */}
			<head>
				<title>Khubaib Gullo</title>
				<style>{globalStyles}</style>
			</head>
			{/* Apply base styles to body: dark background, inter font, light text */}
			<body className="font-sans bg-gray-950 text-gray-300">
				{/* The child components (PageContent from page.tsx) go here */}
				{children}
			</body>
		</html>
	);
}
