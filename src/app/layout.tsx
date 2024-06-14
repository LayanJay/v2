import { ThemeProvider } from '@/providers/next-theme-provider';
import { inter } from '@/utils/font-utils';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Layan Jayasinghe',
  description:
    'Layan Jayasinghe is a full-stack developer who specializes in building exceptional digital experiences.',
  referrer: 'origin-when-cross-origin',
  icons: {
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon-32x32.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Layan Jayasinghe',
    description:
      'Layan Jayasinghe is a full-stack developer who specializes in building exceptional digital experiences.',
    url: 'https://layanjayasinghe.com',

    siteName: 'Layan Jayasinghe',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
