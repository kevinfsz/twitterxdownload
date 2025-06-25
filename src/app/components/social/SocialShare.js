'use client';

import { useState } from 'react';
import { TouchButton } from '@/app/components/mobile/TouchOptimized';
import { isChinese } from '@/lib/i18n';

export default function SocialShare({ 
  url, 
  title, 
  description, 
  locale,
  className = '' 
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: 'hover:bg-blue-50 hover:text-blue-600',
      action: 'tweet'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-800',
      action: 'share'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-700',
      action: 'share'
    },
    {
      name: 'Reddit',
      icon: '🔗',
      url: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
      color: 'hover:bg-orange-50 hover:text-orange-600',
      action: 'submit'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      color: 'hover:bg-green-50 hover:text-green-600',
      action: 'send'
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
      color: 'hover:bg-blue-50 hover:text-blue-500',
      action: 'forward'
    }
  ];

  const handleShare = async (platform) => {
    // Web Share API for mobile devices
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
        return;
      } catch (err) {
        console.log('Web Share API failed, falling back to URL');
      }
    }

    // Fallback to opening share URL
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`social-share ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">
          {isChinese(locale) ? '📤 分享这个页面' : '📤 Share This Page'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isChinese(locale) 
            ? '帮助更多人发现这个实用的Twitter视频下载工具'
            : 'Help more people discover this useful Twitter video download tool'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {socialPlatforms.map((platform) => (
          <TouchButton
            key={platform.name}
            variant="outline"
            size="small"
            onClick={() => handleShare(platform)}
            className={`flex flex-col items-center p-3 transition-colors ${platform.color}`}
          >
            <span className="text-2xl mb-1">{platform.icon}</span>
            <span className="text-xs font-medium">{platform.name}</span>
          </TouchButton>
        ))}
      </div>

      {/* Copy Link Button */}
      <div className="flex items-center gap-2">
        <TouchButton
          variant="secondary"
          size="small"
          onClick={handleCopyLink}
          className="flex-1"
        >
          <span className="mr-2">📋</span>
          {copySuccess 
            ? (isChinese(locale) ? '已复制！' : 'Copied!') 
            : (isChinese(locale) ? '复制链接' : 'Copy Link')
          }
        </TouchButton>
      </div>

      {/* Structured Data for Social Sharing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SocialMediaPosting",
            "headline": title,
            "description": description,
            "url": url,
            "datePublished": new Date().toISOString(),
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
            }
          })
        }}
      />
    </div>
  );
}

// 快速分享按钮组件
export function QuickShareButtons({ url, title, locale, className = '' }) {
  const quickPlatforms = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
        {isChinese(locale) ? '分享:' : 'Share:'}
      </span>
      {quickPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-8 h-8 rounded-full ${platform.color} text-white flex items-center justify-center text-sm transition-colors`}
          title={`Share on ${platform.name}`}
        >
          {platform.icon}
        </a>
      ))}
    </div>
  );
}

// 浮动分享侧边栏
export function FloatingSocialShare({ 
  url, 
  title, 
  locale, 
  className = '',
  position = 'left' 
}) {
  const [isVisible, setIsVisible] = useState(false);

  const platforms = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const positionClasses = {
    left: 'left-4',
    right: 'right-4'
  };

  return (
    <div 
      className={`fixed top-1/2 transform -translate-y-1/2 ${positionClasses[position]} z-40 hidden lg:block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {isChinese(locale) ? '分享' : 'Share'}
          </span>
        </div>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${platform.color} text-white flex items-center justify-center transition-all hover:scale-110`}
              title={`Share on ${platform.name}`}
            >
              <span className="text-sm">{platform.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 