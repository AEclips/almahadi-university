import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al Mahadi International University (AMIU) - Official Portal",
  description: "Official portal of Al Mahadi International University. Explore academic faculties, tuition fee scholarships, and online admissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Direct static link ensures CSS loads instantly without waiting on bundler compilation */}
        <link rel="stylesheet" href="/compiled-tailwind.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
