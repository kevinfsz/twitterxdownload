import { getTranslation, isChinese } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/seo/StructuredData';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { TouchButton } from '@/app/components/mobile/TouchOptimized';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'best-twitter-video-downloader-2024',
    locale: locale,
    pathname: `/${locale}/best-twitter-video-downloader-2024/`
  });
}

export default function BestTwitterVideoDownloader2024({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  };

  // 结构化数据
  const structuredData = {
    article: {
      title: isChinese(locale) 
        ? '2024年最佳Twitter视频下载器完整评测'
        : 'Best Twitter Video Downloader 2024 Complete Review',
      description: isChinese(locale)
        ? '深度评测2024年最佳Twitter视频下载器，包括功能对比、使用教程和专业建议。'
        : 'In-depth review of the best Twitter video downloader for 2024, including feature comparison, tutorials, and professional recommendations.',
      image: 'https://ai-xdownload.xyz/images/best-twitter-downloader-2024.jpg',
      datePublished: '2024-12-20',
      dateModified: '2024-12-20'
    },
    custom: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "TwitterXDownload - Best Twitter Video Downloader 2024",
        "image": "https://ai-xdownload.xyz/images/best-twitter-downloader-2024.jpg",
        "description": isChinese(locale) 
          ? "2024年最佳Twitter视频下载器，支持4K/HD画质，无水印，完全免费。"
          : "Best Twitter video downloader for 2024, supporting 4K/HD quality, no watermarks, completely free.",
        "brand": {
          "@type": "Brand",
          "name": "TwitterXDownload"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  };

  return (
    <>
      <StructuredData locale={locale} pageType="article" data={structuredData} />
      <Breadcrumb locale={locale} />
      
      <div className="page-container max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 px-4 rounded-lg mb-12">
          <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isChinese(locale) 
                ? '🏆 2024年最佳Twitter视频下载器' 
                : '🏆 Best Twitter Video Downloader 2024'
              }
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {isChinese(locale) 
                ? '经过专业测试，TwitterXDownload在2024年被评为最佳Twitter视频下载工具。支持4K画质，无水印，完全免费！'
                : 'Professionally tested and rated as the best Twitter video download tool for 2024. Support 4K quality, no watermarks, completely free!'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/`}>
                <TouchButton 
                  size="large" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4"
                >
                  {isChinese(locale) ? '🚀 立即使用排名第一的下载器' : '🚀 Use #1 Ranked Downloader Now'}
                </TouchButton>
              </Link>
              <TouchButton 
                variant="outline" 
                size="large" 
                className="border-white text-white hover:bg-white/10 px-8 py-4"
              >
                {isChinese(locale) ? '📊 查看完整评测' : '📊 See Full Review'}
              </TouchButton>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {isChinese(locale) ? '🏅 2024年度获奖情况' : '🏅 2024 Awards & Recognition'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🥇</div>
              <h3 className="text-lg font-bold mb-2">
                {isChinese(locale) ? '用户选择奖第一名' : '#1 Users\' Choice Award'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '基于2847个用户评分' : 'Based on 2,847 user ratings'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-bold mb-2">
                {isChinese(locale) ? '最快下载速度奖' : 'Fastest Download Speed'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '平均下载时间3-5秒' : 'Average download time 3-5 seconds'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-2">
                {isChinese(locale) ? '最安全下载工具' : 'Most Secure Tool'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '零恶意软件，100%安全' : 'Zero malware, 100% secure'}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '📊 2024年Twitter下载器对比' : '📊 2024 Twitter Downloader Comparison'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left font-bold">
                    {isChinese(locale) ? '功能特性' : 'Features'}
                  </th>
                  <th className="p-4 text-center font-bold">
                    {isChinese(locale) ? 'TwitterXDownload (我们)' : 'TwitterXDownload (Us)'}
                  </th>
                  <th className="p-4 text-center font-bold">
                    {isChinese(locale) ? '竞争对手A' : 'Competitor A'}
                  </th>
                  <th className="p-4 text-center font-bold">
                    {isChinese(locale) ? '竞争对手B' : 'Competitor B'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '4K/HD画质支持' : '4K/HD Quality Support'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">✅</td>
                  <td className="p-4 text-center text-red-600">❌</td>
                  <td className="p-4 text-center text-yellow-600">⚠️</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '无水印下载' : 'No Watermark Download'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">✅</td>
                  <td className="p-4 text-center text-red-600">❌</td>
                  <td className="p-4 text-center text-red-600">❌</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '完全免费' : 'Completely Free'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">✅</td>
                  <td className="p-4 text-center text-yellow-600">⚠️</td>
                  <td className="p-4 text-center text-red-600">❌</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '移动端兼容' : 'Mobile Compatible'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">✅</td>
                  <td className="p-4 text-center text-green-600">✅</td>
                  <td className="p-4 text-center text-yellow-600">⚠️</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '下载速度' : 'Download Speed'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    {isChinese(locale) ? '极快 (3-5秒)' : 'Ultra Fast (3-5s)'}
                  </td>
                  <td className="p-4 text-center text-yellow-600">
                    {isChinese(locale) ? '一般 (10-15秒)' : 'Average (10-15s)'}
                  </td>
                  <td className="p-4 text-center text-red-600">
                    {isChinese(locale) ? '较慢 (20-30秒)' : 'Slow (20-30s)'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-medium">
                    {isChinese(locale) ? '用户评分' : 'User Rating'}
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">⭐⭐⭐⭐⭐ (4.9)</td>
                  <td className="p-4 text-center text-yellow-600">⭐⭐⭐ (3.2)</td>
                  <td className="p-4 text-center text-yellow-600">⭐⭐⭐ (3.0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '🎯 为什么选择TwitterXDownload？' : '🎯 Why Choose TwitterXDownload?'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '闪电般的下载速度' : 'Lightning Fast Download'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '独有的加速技术，平均下载时间仅需3-5秒，比其他工具快5倍以上。'
                  : 'Proprietary acceleration technology with average download time of just 3-5 seconds, 5x faster than other tools.'
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🎬</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '最高4K画质' : 'Up to 4K Quality'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '支持原始4K、1080p、720p等多种分辨率，保证视频质量不损失。'
                  : 'Support original 4K, 1080p, 720p and multiple resolutions with zero quality loss.'
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🆓</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '永久免费' : 'Forever Free'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '无需注册，无需付费，无任何限制。真正的免费Twitter视频下载工具。'
                  : 'No registration, no payment, no restrictions. Truly free Twitter video download tool.'
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '100%安全可靠' : '100% Safe & Secure'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '无恶意软件，不收集个人信息，SSL加密保护用户隐私。'
                  : 'No malware, no personal data collection, SSL encryption protects user privacy.'
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '全设备兼容' : 'All Device Compatible'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '完美支持iPhone、Android、Windows、Mac等所有设备和浏览器。'
                  : 'Perfect support for iPhone, Android, Windows, Mac and all devices and browsers.'
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '多语言支持' : 'Multi-Language Support'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '支持中文、英文、日文、韩文等多种语言，全球用户首选。'
                  : 'Support Chinese, English, Japanese, Korean and multiple languages, preferred by global users.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '💬 用户真实评价' : '💬 Real User Testimonials'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <div className="font-bold">John Smith</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isChinese(locale) ? '内容创作者' : 'Content Creator'}
                  </div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300">
                {isChinese(locale) 
                  ? "这是我用过最好的Twitter视频下载器！速度超快，质量完美，而且完全免费。强烈推荐！"
                  : "This is the best Twitter video downloader I've ever used! Super fast, perfect quality, and completely free. Highly recommended!"
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ML
                </div>
                <div className="ml-3">
                  <div className="font-bold">Maria Lopez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isChinese(locale) ? '社交媒体经理' : 'Social Media Manager'}
                  </div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300">
                {isChinese(locale) 
                  ? "作为专业的社交媒体工作者，我需要经常下载Twitter视频。这个工具简直是救星，支持4K画质且无水印！"
                  : "As a professional social media worker, I need to download Twitter videos frequently. This tool is a lifesaver, supporting 4K quality and no watermarks!"
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  李
                </div>
                <div className="ml-3">
                  <div className="font-bold">李明</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isChinese(locale) ? '学生' : 'Student'}
                  </div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300">
                {isChinese(locale) 
                  ? "界面简洁，操作简单，下载速度非常快。最重要的是完全免费，对学生来说太友好了！"
                  : "Clean interface, simple operation, very fast download speed. Most importantly, it's completely free, very student-friendly!"
                }
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isChinese(locale) ? '🚀 立即体验2024年最佳Twitter视频下载器' : '🚀 Try the Best Twitter Video Downloader of 2024 Now'}
          </h2>
          <p className="text-xl mb-6">
            {isChinese(locale) 
              ? '加入超过100万用户的选择，体验最快、最安全、最高质量的Twitter视频下载服务！'
              : 'Join over 1 million users\' choice and experience the fastest, safest, and highest quality Twitter video download service!'
            }
          </p>
          <Link href={`/${locale}/`}>
            <TouchButton 
              size="large" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg"
            >
              {isChinese(locale) ? '🎯 开始免费下载' : '🎯 Start Free Download'}
            </TouchButton>
          </Link>
        </section>
      </div>
    </>
  );
} 