 // SEO元数据生成器
import { getTranslation } from './i18n';

const baseUrl = 'https://ai-xdownload.xyz';

// 默认SEO配置
const defaultSEO = {
  title: 'TwitterXDownload - Free Twitter Video Downloader',
  description: 'Download Twitter videos and media content for free. No registration required. Fast and easy Twitter video downloader. Twitter Media Saver. Twitter X Download.',
  keywords: 'twitter downloader, x video downloader, twitter video download, x.com downloader, twitter gif download, social media downloader',
  author: 'TwitterXDownload Team',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogImage: '/images/og-image.png',
  twitterCard: 'summary_large_image'
};

// 页面特定的SEO配置
const pageSEOConfig = {
  homepage: {
    title: 'TwitterXDownload - Free Twitter Video Downloader Online',
    description: 'Download Twitter videos, GIFs and images for free. Fast, reliable and secure Twitter video downloader. No registration required. Works on all devices.',
    keywords: 'twitter video downloader, download twitter videos, x video download, twitter gif downloader, social media downloader, free video downloader'
  },
  
  downloader: {
    title: 'Twitter Video Downloader - Download Twitter Videos Free',
    description: 'Professional Twitter video downloader tool. Paste Twitter URL and download videos in HD quality. Supports MP4, GIF and images. 100% free and safe.',
    keywords: 'twitter video downloader, download twitter videos, twitter mp4 downloader, x video downloader, twitter media downloader'
  },
  
  tweets: {
    title: 'Search and Download Twitter Videos - Hot Tweets',
    description: 'Discover and download popular Twitter videos. Browse trending tweets with videos and download them instantly. Updated daily with fresh content.',
    keywords: 'twitter videos, hot tweets, trending twitter videos, popular twitter content, viral twitter videos'
  },
  
  'twitter-video-downloader': {
    title: 'Twitter Video Downloader - Best Free Tool 2024',
    description: 'The best Twitter video downloader in 2024. Download Twitter videos in HD quality, fast processing, and 100% secure. Try our premium Twitter downloader now.',
    keywords: 'best twitter video downloader, twitter video downloader 2024, hd twitter video download, premium twitter downloader'
  },
  
  'x-video-download': {
    title: 'X Video Download - Download X.com Videos Free',
    description: 'Download videos from X.com (formerly Twitter) quickly and easily. Our X video downloader supports all video formats and qualities. Free and secure.',
    keywords: 'x video download, x.com video downloader, download x videos, x video saver, x media downloader'
  },
  
  'twitter-gif-download': {
    title: 'Twitter GIF Downloader - Download Twitter GIFs Free',
    description: 'Download Twitter GIFs and animated images for free. High-quality GIF downloader for Twitter. Save your favorite Twitter GIFs instantly.',
    keywords: 'twitter gif downloader, download twitter gifs, twitter gif saver, animated twitter images, twitter gif download free'
  },
  
  'mobile-video-download': {
    title: 'Mobile Twitter Video Downloader - Download on Phone',
    description: 'Download Twitter videos on your mobile phone. Mobile-optimized Twitter video downloader for iOS and Android. Fast and easy mobile downloads.',
    keywords: 'mobile twitter video downloader, download twitter videos on phone, mobile video downloader, twitter downloader app, ios android twitter downloader'
  },
  
  'about-us': {
    title: 'About TwitterXDownload - Free Twitter Video Downloader Service',
    description: 'Learn about TwitterXDownload, the leading free Twitter video downloader service. Our mission, team, and commitment to providing the best download experience.',
    keywords: 'about twitterxdownload, twitter downloader service, free video downloader, social media tools'
  },
  
  'privacy-policy': {
    title: 'Privacy Policy - TwitterXDownload',
    description: 'TwitterXDownload privacy policy. Learn how we protect your data and privacy while using our Twitter video downloader service.',
    keywords: 'privacy policy, data protection, user privacy, twitter downloader privacy'
  },
  
  'terms-of-service': {
    title: 'Terms of Service - TwitterXDownload',
    description: 'TwitterXDownload terms of service and usage guidelines. Read our terms and conditions for using our free Twitter video downloader.',
    keywords: 'terms of service, usage terms, twitter downloader terms, service agreement'
  }
};

// 语言特定的SEO配置
const languageSEOConfig = {
  zh: {
    title: 'TwitterXDownload - 免费Twitter视频下载器',
    description: '免费下载Twitter视频和媒体内容。无需注册，快速简单的Twitter视频下载器。支持所有设备，安全可靠。',
    keywords: '推特视频下载器, twitter视频下载, x视频下载, 推特下载工具, 社交媒体下载器, 免费视频下载'
  },
  
  'zh-CN': {
    title: 'TwitterXDownload - 免费Twitter视频下载器',
    description: '专业的Twitter视频下载工具，支持高清视频下载。粘贴链接即可下载，支持MP4、GIF等格式。100%免费安全。',
    keywords: '推特视频下载器, twitter视频下载, x视频下载, 推特下载工具, 高清视频下载, 免费下载器'
  },
  
  'zh-HK': {
    title: 'TwitterXDownload - 免費Twitter影片下載器',
    description: '免費下載Twitter影片和媒體內容。無需註冊，快速簡單的Twitter影片下載器。支援所有裝置，安全可靠。',
    keywords: '推特影片下載器, twitter影片下載, x影片下載, 推特下載工具, 社交媒體下載器, 免費影片下載'
  },
  
  ja: {
    title: 'TwitterXDownload - 無料Twitterビデオダウンローダー',
    description: 'Twitterの動画とメディアコンテンツを無料でダウンロード。登録不要、高速で簡単なTwitterビデオダウンローダー。',
    keywords: 'twitter動画ダウンロード, twitterビデオダウンローダー, x動画ダウンロード, ソーシャルメディアダウンローダー'
  },
  
  ko: {
    title: 'TwitterXDownload - 무료 트위터 비디오 다운로더',
    description: '트위터 비디오와 미디어 콘텐츠를 무료로 다운로드하세요. 가입 불필요, 빠르고 쉬운 트위터 비디오 다운로더.',
    keywords: '트위터 비디오 다운로더, 트위터 동영상 다운로드, x 비디오 다운로드, 소셜미디어 다운로더'
  }
};

// 生成页面SEO元数据
export function generateSEOMetadata({
  page = 'homepage',
  locale = 'en',
  customTitle = '',
  customDescription = '',
  customKeywords = '',
  pathname = '/'
}) {
  // 获取基础配置
  const baseConfig = pageSEOConfig[page] || pageSEOConfig.homepage;
  const langConfig = languageSEOConfig[locale] || {};
  
  // 生成最终配置
  const title = customTitle || langConfig.title || baseConfig.title || defaultSEO.title;
  const description = customDescription || langConfig.description || baseConfig.description || defaultSEO.description;
  const keywords = customKeywords || langConfig.keywords || baseConfig.keywords || defaultSEO.keywords;
  
  // 生成canonical URL
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  // 生成多语言链接
  const alternateLinks = generateAlternateLinks(pathname);
  
  return {
    title: {
      default: title,
      template: `%s | TwitterXDownload`
    },
    description,
    keywords,
    authors: [{ name: defaultSEO.author }],
    robots: defaultSEO.robots,
    
    // Open Graph
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'TwitterXDownload',
      images: [
        {
          url: `${baseUrl}${defaultSEO.ogImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: getOpenGraphLocale(locale)
    },
    
    // Twitter Card
    twitter: {
      card: defaultSEO.twitterCard,
      site: '@twitterxdownload',
      title,
      description,
      images: [`${baseUrl}${defaultSEO.ogImage}`]
    },
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLinks
    },
    
    // Additional meta tags
    other: {
      'application-name': 'TwitterXDownload',
      'apple-mobile-web-app-title': 'TwitterXDownload',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default'
    }
  };
}

// 生成多语言链接
function generateAlternateLinks(pathname) {
  const languages = ['en', 'zh', 'zh-CN', 'zh-HK', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar'];
  const links = {};
  
  languages.forEach(lang => {
    links[lang] = `${baseUrl}/${lang}${pathname}`;
  });
  
  // 添加默认语言
  links['x-default'] = `${baseUrl}${pathname}`;
  
  return links;
}

// 获取Open Graph语言代码
function getOpenGraphLocale(locale) {
  const localeMap = {
    'en': 'en_US',
    'zh': 'zh_CN',
    'zh-CN': 'zh_CN',
    'zh-HK': 'zh_HK',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'pt': 'pt_PT',
    'ru': 'ru_RU',
    'ar': 'ar_AR'
  };
  
  return localeMap[locale] || 'en_US';
}

// 生成JSON-LD结构化数据
export function generateJSONLD(type, data) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return JSON.stringify(baseData);
}