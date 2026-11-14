import type { Metadata } from "next";
import "./globals.css";
import { AIChatbot } from "@/components/AIChatbot";

export const metadata: Metadata = {
  title: "Al Mahadi International University (AMIU) - Official Portal",
  description:
    "Official portal of Al Mahadi International University. Explore academic faculties, live campus shuttle routes, research archive, tuition scholarships, and online admissions.",
};

const COLOR_SCHEME_INIT_SCRIPT = `
try {
  var savedScheme = localStorage.getItem("color-scheme");
  var metaEl = document.querySelector('meta[name="color-scheme"]');
  if (metaEl && (savedScheme === "light" || savedScheme === "dark")) {
    metaEl.setAttribute("content", savedScheme);
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: COLOR_SCHEME_INIT_SCRIPT }} />
        {/* Direct static link ensures CSS loads instantly without waiting on bundler compilation */}
        <link rel="stylesheet" href="/compiled-tailwind.css" />
      </head>
      <body className="antialiased">
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
