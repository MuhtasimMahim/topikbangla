import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import MobileNav from "@/components/MobileNav"
import Script from "next/script"
import { Suspense } from "react"
import type React from "react"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "TOPIKBangla | Learn Korean for Bengali Speakers",
  description:
    "Master Korean with AI-powered lessons tailored for Bengali speakers. Prepare for TOPIK exams and learn everyday Korean efficiently.",
  keywords: "Korean language, Bengali speakers, AI learning, TOPIK exam, language study",
  manifest: "/manifest.json",
  themeColor: "#00FFFF",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "TOPIKBangla | Learn Korean for Bengali Speakers",
    description:
      "Master Korean with AI-powered lessons tailored for Bengali speakers. Prepare for TOPIK exams and learn everyday Korean efficiently.",
    type: "website",
    url: "https://koreanailearner.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Korean AI Learner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOPIKBangla | Learn Korean for Bengali Speakers",
    description:
      "Master Korean with AI-powered lessons tailored for Bengali speakers. Prepare for TOPIK exams and learn everyday Korean efficiently.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={`${poppins.className} bg-[#121212] text-[#EAEAEA] min-h-screen flex flex-col`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <MobileNav />
        </Suspense>
        <SpeedInsights />
        <Analytics />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
