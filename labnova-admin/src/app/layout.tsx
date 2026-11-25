import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Manrope variable font (weights 200-800), served from this app itself.
const manrope = localFont({
  src: './fonts/Manrope-VariableFont_wght.ttf',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

// Every page sits behind a login and carries a per-request CSP nonce, so
// nothing may be prerendered as static HTML.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { default: 'LabNova Admin', template: '%s · LabNova Admin' },
  description: 'LabNova administration',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
