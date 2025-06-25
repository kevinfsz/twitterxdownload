 // SEO结构化数据组件
"use client";

import { usePathname } from 'next/navigation';

export default function StructuredData({ locale = 'en', pageType = 'website', data = null }) {
  const pathname = usePathname();
  
  // 基础网站数据
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TwitterXDownload",
    "alternateName": ["Twitter Video Downloader", "X Video Download", "推特视频下载器"],
    "url": "https://ai-xdownload.xyz",
    "description": "Free Twitter video downloader. Download Twitter videos, GIFs and images quickly and easily. No registration required.",
    "inLanguage": ["en", "zh-CN", "zh-HK", "ja", "ko", "es", "fr", "de", "pt", "ru", "ar"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ai-xdownload.xyz/downloader?url={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/twitterxdownload",
      "https://github.com/twitterxdownload"
    ]
  };

  // 软件应用数据
  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TwitterXDownload",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://ai-xdownload.xyz",
    "description": "Professional Twitter video downloader tool. Download videos, GIFs and images from Twitter/X platform for free.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "TwitterXDownload Team"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-12-20"
  };

  // 组织数据
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TwitterXDownload",
    "url": "https://ai-xdownload.xyz",
    "logo": "https://ai-xdownload.xyz/images/logo.png",
    "description": "Leading Twitter video download service provider.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese", "Japanese", "Korean", "Spanish", "French", "German"]
    }
  };

  // 服务数据
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Twitter Video Download Service",
    "description": "Free online service to download videos, GIFs and images from Twitter/X platform.",
    "provider": {
      "@type": "Organization",
      "name": "TwitterXDownload"
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://ai-xdownload.xyz/downloader",
      "serviceName": "Online Video Downloader"
    }
  };

  // FAQ数据
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to download Twitter videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply paste the Twitter video URL into our downloader tool and click download. The video will be processed and ready for download within seconds."
        }
      },
      {
        "@type": "Question", 
        "name": "Is TwitterXDownload free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TwitterXDownload is completely free to use. No registration or payment required."
        }
      },
      {
        "@type": "Question",
        "name": "What video formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all video formats available on Twitter, including MP4, GIF, and various image formats."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download Twitter videos on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our service works perfectly on mobile devices. You can download Twitter videos on any smartphone or tablet."
        }
      }
    ]
  };

  // 面包屑导航数据
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": getBreadcrumbItems(pathname, locale)
  };

  // 生成视频结构化数据
  const getVideoData = (videoInfo) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoInfo.title || "Twitter Video",
    "description": videoInfo.description || "Downloaded from Twitter/X platform",
    "thumbnailUrl": videoInfo.thumbnail,
    "uploadDate": videoInfo.uploadDate || new Date().toISOString(),
    "duration": videoInfo.duration,
    "contentUrl": videoInfo.url,
    "embedUrl": videoInfo.embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "TwitterXDownload"
    }
  });

  // 生成文章结构化数据
  const getArticleData = (articleInfo) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleInfo.title,
    "description": articleInfo.description,
    "image": articleInfo.image,
    "datePublished": articleInfo.datePublished || new Date().toISOString(),
    "dateModified": articleInfo.dateModified || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "TwitterXDownload"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TwitterXDownload",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ai-xdownload.xyz/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ai-xdownload.xyz${pathname}`
    }
  });

  // 生成HowTo结构化数据
  const getHowToData = (howToInfo) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howToInfo.name,
    "description": howToInfo.description,
    "image": howToInfo.image,
    "totalTime": howToInfo.totalTime || "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": howToInfo.supply || [
      {
        "@type": "HowToSupply",
        "name": "Internet Connection"
      },
      {
        "@type": "HowToSupply", 
        "name": "Web Browser"
      }
    ],
    "tool": howToInfo.tool || [
      {
        "@type": "HowToTool",
        "name": "TwitterXDownload"
      }
    ],
    "step": howToInfo.steps || []
  });

  // 根据页面类型返回相应的结构化数据
  const getStructuredData = () => {
    const baseData = [websiteData, organizationData];
    
    // 如果传入了自定义数据，优先使用
    if (data) {
      if (data.video) baseData.push(getVideoData(data.video));
      if (data.article) baseData.push(getArticleData(data.article));
      if (data.howTo) baseData.push(getHowToData(data.howTo));
      if (data.custom) baseData.push(...data.custom);
    }
    
    switch (pageType) {
      case 'homepage':
        return [...baseData, softwareData, serviceData, faqData, breadcrumbData];
      case 'downloader':
        return [...baseData, softwareData, serviceData, breadcrumbData];
      case 'landing':
        return [...baseData, serviceData, faqData, breadcrumbData];
      case 'article':
        return [...baseData, serviceData, breadcrumbData];
      case 'guide':
        return [...baseData, serviceData, breadcrumbData];
      case 'about':
        return [...baseData, breadcrumbData];
      default:
        return [...baseData, breadcrumbData];
    }
  };

  const structuredData = getStructuredData();

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

// 生成面包屑导航项
function getBreadcrumbItems(pathname, locale) {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `https://ai-xdownload.xyz/${locale}`
    }
  ];

  const pathSegments = pathname.split('/').filter(segment => segment && segment !== locale);
  
  pathSegments.forEach((segment, index) => {
    const position = index + 2;
    const name = formatBreadcrumbName(segment);
    const url = `https://ai-xdownload.xyz/${locale}/${pathSegments.slice(0, index + 1).join('/')}`;
    
    items.push({
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": url
    });
  });

  return items;
}

// 格式化面包屑名称
function formatBreadcrumbName(segment) {
  const nameMap = {
    'downloader': 'Downloader',
    'tweets': 'Search Tweets',
    'landing': 'Landing',
    'twitter-video-downloader': 'Twitter Video Downloader',
    'x-video-download': 'X Video Download',
    'twitter-gif-download': 'Twitter GIF Download',
    'mobile-video-download': 'Mobile Video Download',
    'about-us': 'About Us',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service'
  };

  return nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}