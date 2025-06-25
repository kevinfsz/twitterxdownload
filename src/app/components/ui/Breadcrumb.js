'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTranslation, isChinese } from '@/lib/i18n';

export default function Breadcrumb({ locale, customItems = null }) {
  const pathname = usePathname();
  
  const t = function (key) {
    return getTranslation(locale, key);
  };

  // 如果提供了自定义面包屑项，使用它们
  if (customItems) {
    return (
      <nav className="breadcrumb-nav py-4 px-4 bg-gray-50 dark:bg-gray-800/50" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {customItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {item.href ? (
                <Link 
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // 自动生成面包屑
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // 移除语言代码
  const cleanSegments = pathSegments.filter(segment => 
    !['en', 'zh-CN', 'ja', 'ko', 'fr', 'zh-HK'].includes(segment)
  );

  const breadcrumbItems = [
    {
      name: isChinese(locale) ? '首页' : 'Home',
      href: `/${locale}`,
    }
  ];

  let currentPath = `/${locale}`;
  
  cleanSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const isLast = index === cleanSegments.length - 1;
    const name = formatBreadcrumbName(segment, locale);
    
    breadcrumbItems.push({
      name,
      href: isLast ? null : currentPath,
    });
  });

  // 如果只有首页，不显示面包屑
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb-nav py-4 px-4 bg-gray-50 dark:bg-gray-800/50" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {item.href ? (
                <Link 
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function formatBreadcrumbName(segment, locale) {
  const nameMap = {
    'landing': isChinese(locale) ? '产品页面' : 'Landing Pages',
    'guides': isChinese(locale) ? '使用指南' : 'Guides',
    'tutorials': isChinese(locale) ? '教程' : 'Tutorials',
    'twitter-video-downloader': isChinese(locale) ? 'Twitter视频下载器' : 'Twitter Video Downloader',
    'twitter-gif-download': isChinese(locale) ? 'Twitter GIF下载' : 'Twitter GIF Download',
    'x-video-download': isChinese(locale) ? 'X视频下载' : 'X Video Download',
    'mobile-video-download': isChinese(locale) ? '手机视频下载' : 'Mobile Video Download',
    'how-to-download-twitter-videos-hd': isChinese(locale) ? '高清视频下载教程' : 'HD Video Download Guide',
    'twitter-video-downloader-no-watermark': isChinese(locale) ? '无水印下载器' : 'No Watermark Downloader',
    'download-twitter-videos-iphone': isChinese(locale) ? 'iPhone下载教程' : 'iPhone Download Guide',
    'download-twitter-videos-android': isChinese(locale) ? 'Android下载教程' : 'Android Download Guide',
    'about-us': isChinese(locale) ? '关于我们' : 'About Us',
    'privacy-policy': isChinese(locale) ? '隐私政策' : 'Privacy Policy',
    'terms-of-service': isChinese(locale) ? '服务条款' : 'Terms of Service',
    'tweets': isChinese(locale) ? '推文' : 'Tweets',
    'downloader': isChinese(locale) ? '下载器' : 'Downloader',
  };

  return nameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
} 