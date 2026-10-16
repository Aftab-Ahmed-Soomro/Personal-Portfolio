import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SoundThemeProvider } from "@/components/ui/SoundThemeContext";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { ScrollProgressBar, BackToTop } from "@/components/ui/ScrollUI";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aftab Ahmed | Software Engineer & Full Stack Developer",
  description:
    "Official portfolio of Aftab Ahmed, a Software Engineer, Full Stack Developer, and UBIT student. Expert in React, Next.js, Node.js, and modern full-stack web applications.",
  keywords: [
    "Aftab Ahmed",
    "Aftab Ahmed Portfolio",
    "Software Engineer Karachi",
    "Aftab Ahmed UBIT",
    "Full Stack Developer",
    "Python",
    "Django",
    "FastAPI",
    "React",
    "Next.js",
    "Full Stack Developer Portfolio",
  ],
  authors: [{ name: "Aftab Ahmed" }],
  creator: "Aftab Ahmed",
  metadataBase: new URL("https://aftab-ahmed-soomro.vercel.app"),
  openGraph: {
    title: "Aftab Ahmed | Portfolio",
    description: "High-performance digital experiences crafted by Aftab Ahmed.",
    url: "https://aftab-ahmed-soomro.vercel.app/",
    siteName: "Aftab Ahmed Portfolio",
    images: [
      {
        url: "/profilePic.jpeg",
        width: 800,
        height: 800,
        alt: "Aftab Ahmed - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "Eya2oKxzxMS1Tr_vUWIH_hUIVeTIDWDKl9LuK0mnccU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aftab Ahmed",
    url: "https://aftab-ahmed-soomro.vercel.app/",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Aftab-Ahmed-Soomro",
      "https://www.linkedin.com/in/aftab-ahmed-12b9aa265",
    ],
  };

  return (
    <html
      lang="en"
      className={plusJakartaSans.variable}
      suppressHydrationWarning
    >
      <body
        className="font-sans min-h-screen relative antialiased selection:bg-amber-500 selection:text-black"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SoundThemeProvider>
          <MotionProvider>
            <ScrollProgressBar />
            <CustomCursor />
            {children}
            <BackToTop />
          </MotionProvider>
        </SoundThemeProvider>
      </body>
    </html>
  );
}
