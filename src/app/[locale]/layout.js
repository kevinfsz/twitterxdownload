import "../globals.css";

import GoogleAnalytics from '../components/google/GoogleAnalytics';
import GoogleAdsense from '../components/google/GoogleAdsense';
import UmamiAnalytics from '../components/common/UmamiAnalytics';

import {Providers} from "../providers";

import MyNavbar from '../components/ui/MyNavbar';
import MyFooter from '../components/ui/MyFooter';
import PWAInstaller from '../components/ui/PWAInstaller';
import StructuredData from '../components/seo/StructuredData';


export const metadata = {
  title: {
    default: 'TwitterXDownload - Free Twitter Video Downloader',
    template: '%s | TwitterXDownload'
  },
  description: 'Download Twitter videos and media content for free. No registration required. Fast and easy Twitter video downloader. Twitter Media Saver. Twitter X Download.',
  keywords: 'twitter downloader, x video downloader, twitter video download, x.com downloader',
  authors: [{ name: 'TwitterXDownload' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://ai-xdownload.xyz/',
  },
  openGraph: {
    title: 'TwitterXDownload - Free Twitter Video Downloader',
    description: 'Download Twitter videos and media content for free. No registration required.',
    type: 'website',
    url: 'https://ai-xdownload.xyz',
    siteName: 'TwitterXDownload',
    images: [{
      url: 'https://ai-xdownload.xyz/images/og.png'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@twitterxdownload',
    title: 'TwitterXDownload - Free Twitter Video Downloader',
    description: 'Download Twitter videos and media content for free. No registration required.',
    images: ['https://ai-xdownload.xyz/images/og.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180' }
    ]
  },
  manifest: '/manifest.json',
  themeColor: '#1DA1F2',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  }
};

export default function RootLayout({ children, params }) {
    const locale = params?.locale || 'en';

    return (
      <html lang={locale} suppressHydrationWarning>
        <head>
            <GoogleAdsense />
            <GoogleAnalytics />
            <UmamiAnalytics />
            <StructuredData locale={locale} pageType="website" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(registration) {
                          console.log('SW registered: ', registration);
                        })
                        .catch(function(registrationError) {
                          console.log('SW registration failed: ', registrationError);
                        });
                    });
                  }
                `
              }}
            />
        </head>
        <body className="bg-background text-foreground">
            <Providers>
                <MyNavbar locale={locale} />
                {children}
                <MyFooter locale={locale} />
                <PWAInstaller locale={locale} />
            </Providers>
        </body>
      </html>
    );
  }