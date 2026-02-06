import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const withBase = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;

export const metadata: Metadata = {
  title: 'QUIT',
  description: 'Stop lying to yourself. Quit porn.',
  generator: 'v0.app',
  applicationName: 'QUIT',
  appleWebApp: {
    capable: true,
    title: 'QUIT',
    statusBarStyle: 'black-translucent',
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const killV0 = () => {
                  document
                    .querySelectorAll('[id*="v0"], [class*="v0"]')
                    .forEach(el => el.remove());
                };

                // Run immediately
                killV0();

                // Run after load
                window.addEventListener('load', killV0);

                // Watch for reinjection (mobile refresh)
                const observer = new MutationObserver(killV0);
                observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                });
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
