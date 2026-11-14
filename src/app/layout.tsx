import type { Metadata } from "next";
import "./globals.css";
import { AIChatbot } from "@/components/AIChatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://almahadi-university-gshs.vercel.app"),
  title: "Al Mahadi International University (AMIU) — Official Portal",
  description:
    "Pioneering higher education for the AI & Quantum Era. Explore ABET-aligned faculties, 150-acre green smart campus, research archive, tuition scholarships, and online admissions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Al Mahadi International University (AMIU) — Official Portal",
    description:
      "Pioneering higher education for the AI & Quantum Era. Explore ABET-aligned faculties, 150-acre green smart campus, research archive, tuition scholarships, and online admissions.",
    url: "https://almahadi-university-gshs.vercel.app",
    siteName: "Al Mahadi International University",
    type: "website",
    images: [
      {
        url: "/images/hero-campus.webp",
        width: 1600,
        height: 893,
        alt: "Al Mahadi International University Smart Campus at Twilight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Mahadi International University (AMIU) — Official Portal",
    description:
      "Explore ABET-aligned faculties, 150-acre green smart campus, research archive, tuition scholarships, and online admissions.",
    images: ["/images/hero-campus.webp"],
  },
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&display=swap"
        />
        {/* Direct static link ensures CSS loads instantly without waiting on bundler compilation */}
        <link rel="stylesheet" href="/compiled-tailwind.css" />
      </head>
      <body className="antialiased font-sans">
        <a href="#main-content" className="skip-to-main">
          Skip to Main Content
        </a>
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
