// SEO优化：结构化数据组件
export default function StructuredData({ type, data }) {
  let structuredData = {};

  if (type === 'tutorial') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.title,
      "description": data.description,
      "image": data.image || "https://twitterxdownload.com/images/twitter-video-download-tutorial.jpg",
      "totalTime": data.duration || "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "iPhone或电脑"
        },
        {
          "@type": "HowToSupply", 
          "name": "网络连接"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "TwitterXDownload在线工具"
        },
        {
          "@type": "HowToTool",
          "name": "Safari浏览器"
        }
      ],
      "step": data.steps || [],
      "author": {
        "@type": "Organization",
        "name": "TwitterXDownload",
        "url": "https://twitterxdownload.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TwitterXDownload",
        "logo": {
          "@type": "ImageObject",
          "url": "https://twitterxdownload.com/favicon.ico"
        }
      },
      "datePublished": data.datePublished || "2024-12-19",
      "dateModified": data.dateModified || "2024-12-19"
    };
  } else if (type === 'article') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": data.image || "https://twitterxdownload.com/images/twitter-video-download.jpg",
      "author": {
        "@type": "Organization",
        "name": "TwitterXDownload"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TwitterXDownload",
        "logo": {
          "@type": "ImageObject",
          "url": "https://twitterxdownload.com/favicon.ico"
        }
      },
      "datePublished": data.datePublished || "2024-12-19",
      "dateModified": data.dateModified || "2024-12-19",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url
      }
    };
  } else if (type === 'faq') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.questions || []
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 