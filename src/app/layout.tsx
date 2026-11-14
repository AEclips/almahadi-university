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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        {/* Direct static link ensures CSS loads instantly without waiting on bundler compilation */}
        <link rel="stylesheet" href="/compiled-tailwind.css" />
      </head>
      <body className="antialiased font-sans">
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
