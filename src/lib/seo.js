 // SEO元数据生成器
import { getTranslation } from './i18n';

const baseUrl = 'https://ai-xdownload.xyz';

// 默认SEO配置 - 按用户建议优化
const defaultSEO = {
  title: 'Twitter Video Downloader | Free HD X Video Download Tool',
  description: 'Download Twitter/X videos, GIFs & images FREE. HD quality, no watermark. Works on iPhone, Android, PC. Fast, secure Twitter video downloader. Try now!',
  keywords: 'twitter video downloader, download twitter video, x video downloader, twitter video to mp4 hd, twitter video downloader no watermark, free twitter video downloader',
  author: 'TwitterXDownload Team',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogImage: '/images/og-image.png',
  twitterCard: 'summary_large_image'
};

// 页面特定的SEO配置
const pageSEOConfig = {
  homepage: {
    title: 'Twitter Video Downloader | Free HD X Video Download Tool',
    description: 'Download Twitter/X videos, GIFs & images FREE. HD quality, no watermark. Works on iPhone, Android, PC. Fast, secure Twitter video downloader. Try now!',
    keywords: 'twitter video downloader, download twitter video, x video downloader, download twitter videos iphone, twitter video to mp4 hd, twitter video downloader no watermark, free twitter video downloader, twitter gif downloader, x video download online'
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
    title: 'Twitter Video Downloader | Save X Videos & GIFs HD',
    description: 'Best Twitter video downloader 2024. Download Twitter videos FREE in HD quality, no watermark. Works on iPhone, Android, PC. Fast & secure. Try now!',
    keywords: 'twitter video downloader, best twitter video downloader, twitter video downloader 2024, hd twitter video download, twitter video downloader no watermark, free twitter video downloader'
  },
  
  'x-video-download': {
    title: 'X Video Download | Free X.com Video Downloader HD',
    description: 'Download X.com videos FREE in HD quality, no watermark. Works on iPhone, Android, PC. Fast X video downloader, no registration required. Try now!',
    keywords: 'x video download, x video downloader, x.com video downloader, download x videos, x video saver, x media downloader, free x video download'
  },
  
  'twitter-gif-download': {
    title: 'Twitter GIF Downloader | Save X GIFs Free HD',
    description: 'Download Twitter GIFs FREE in HD quality, no watermark. Works on iPhone, Android, PC. Fast Twitter GIF downloader, save animated images. Try now!',
    keywords: 'twitter gif downloader, download twitter gifs, twitter gif download, twitter gif saver, animated twitter images, twitter gif download free'
  },
  
  'mobile-video-download': {
    title: 'Mobile Twitter Downloader | iPhone Android Video Save',
    description: 'Download Twitter videos FREE on iPhone & Android. Mobile-optimized downloader, HD quality, no watermark. Fast mobile downloads, no app needed. Try now!',
    keywords: 'mobile twitter video downloader, download twitter videos iphone, download twitter videos android, mobile video downloader, twitter downloader app, ios android twitter downloader'
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
  },

  // Guides页面配置
  'how-to-download-twitter-videos-hd': {
    title: 'How to Download Twitter Videos HD | Free High Quality Guide',
    description: 'Complete guide to download Twitter videos in HD quality FREE. Support 4K, 1080p, 720p formats. Works on iPhone, Android, PC. No watermark. Try now!',
    keywords: 'how to download twitter videos hd, twitter video download hd, high quality twitter video, 4k twitter video download, 1080p twitter download, hd twitter video downloader'
  },

  'twitter-video-downloader-no-watermark': {
    title: 'Twitter Video Downloader No Watermark | Free Brand-Free',
    description: 'Best no-watermark Twitter video downloader. Download Twitter/X videos completely brand-free. Support HD quality, works on all devices, safe and reliable.',
    keywords: 'no watermark twitter video download, twitter video downloader no watermark, remove watermark twitter video, brand free download, free twitter download'
  },

  'download-twitter-videos-iphone': {
    title: 'Download Twitter Videos iPhone | iOS Video Save Guide',
    description: 'Complete guide to download Twitter videos on iPhone FREE. iOS-optimized downloader, HD quality, no app needed. Works with Safari. Try now!',
    keywords: 'download twitter videos iphone, iphone twitter video download, ios twitter downloader, twitter video save iphone, iphone x video download'
  },

  'download-twitter-videos-android': {
    title: 'Download Twitter Videos Android | Mobile Video Guide',
    description: 'Download Twitter videos on Android FREE. Mobile-optimized guide for all Android devices. HD quality, no watermark, no app required. Try now!',
    keywords: 'download twitter videos android, android twitter video download, mobile twitter downloader, android x video download, twitter video save android'
  },

  'best-twitter-video-downloader-2024': {
    title: 'Best Twitter Video Downloader 2024 | Free HD No Watermark',
    description: 'Top-rated Twitter video downloader for 2024. Download 4K/HD videos, no watermarks, completely free. Compatible with iPhone, Android, PC.',
    keywords: 'best twitter video downloader 2024, top twitter downloader, free twitter video download, HD no watermark, best X video downloader'
  },

  'resources': {
    title: 'Twitter Video Download Resources | Tools & Tutorials Hub',
    description: 'Complete Twitter video download resource library: free tools, detailed tutorials, pro tips, FAQ. Everything you need for Twitter video downloads.',
    keywords: 'twitter video download resources, twitter downloader tools, video download tutorials, twitter tips, social media downloader guide'
  }
};

// 语言特定的SEO配置
const languageSEOConfig = {
  zh: {
    title: 'Twitter视频下载器 | 免费高清X视频下载工具',
    description: '免费下载Twitter/X视频、GIF和图片。高清画质，无水印，支持iPhone、Android、PC全平台。快速安全，立即体验！',
    keywords: '推特视频下载器, twitter视频下载, x视频下载, 推特下载工具, 社交媒体下载器, 免费视频下载'
  },
  
  'zh-CN': {
    title: 'Twitter视频下载器 | 免费高清X视频下载工具',
    description: '专业Twitter视频下载工具，支持高清视频下载。粘贴链接即可下载，支持MP4、GIF等格式。100%免费安全，无需注册。',
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