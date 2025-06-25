import { getTranslation, isChinese } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/seo/StructuredData';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { TouchButton, TouchCard } from '@/app/components/mobile/TouchOptimized';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'resources',
    locale: locale,
    pathname: `/${locale}/resources/`
  });
}

export default function TwitterResourcesHub({ params: { locale } }) {
  // 结构化数据
  const structuredData = {
    article: {
      title: isChinese(locale) 
        ? 'Twitter视频下载资源大全'
        : 'Twitter Video Download Resources Hub',
      description: isChinese(locale)
        ? '收集整理最全面的Twitter视频下载相关资源，包括工具、教程、技巧等。'
        : 'Comprehensive collection of Twitter video download resources including tools, tutorials, and tips.',
      image: 'https://ai-xdownload.xyz/images/twitter-resources-hub.jpg',
      datePublished: '2024-12-20',
      dateModified: '2024-12-20'
    }
  };

  return (
    <>
      <StructuredData locale={locale} pageType="article" data={structuredData} />
      <Breadcrumb locale={locale} />
      
      <div className="page-container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isChinese(locale) 
              ? '📚 Twitter视频下载资源大全' 
              : '📚 Twitter Video Download Resources Hub'
            }
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isChinese(locale) 
              ? '汇集最全面的Twitter/X视频下载资源：免费工具、详细教程、专业技巧、常见问题解答，一站式满足所有需求。'
              : 'Comprehensive collection of Twitter/X video download resources: free tools, detailed tutorials, pro tips, FAQ - your one-stop solution for all needs.'
            }
          </p>
        </header>

        {/* Quick Access Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '🚀 快速访问工具' : '🚀 Quick Access Tools'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TouchCard hoverable className="p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">
                {isChinese(locale) ? '在线下载器' : 'Online Downloader'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isChinese(locale) 
                  ? '无需安装，在线直接下载Twitter视频'
                  : 'No installation required, download Twitter videos online directly'
                }
              </p>
              <Link href={`/${locale}/`}>
                <TouchButton className="w-full">
                  {isChinese(locale) ? '立即使用' : 'Use Now'}
                </TouchButton>
              </Link>
            </TouchCard>

            <TouchCard hoverable className="p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">
                {isChinese(locale) ? '移动端工具' : 'Mobile Tools'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isChinese(locale) 
                  ? '专为手机优化的下载体验'
                  : 'Download experience optimized for mobile devices'
                }
              </p>
              <Link href={`/${locale}/guides/download-twitter-videos-iphone`}>
                <TouchButton className="w-full">
                  {isChinese(locale) ? '查看教程' : 'View Tutorial'}
                </TouchButton>
              </Link>
            </TouchCard>

            <TouchCard hoverable className="p-6 text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-3">
                {isChinese(locale) ? 'HD质量下载' : 'HD Quality Download'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isChinese(locale) 
                  ? '下载最高4K画质的Twitter视频'
                  : 'Download Twitter videos up to 4K quality'
                }
              </p>
              <Link href={`/${locale}/guides/how-to-download-twitter-videos-hd`}>
                <TouchButton className="w-full">
                  {isChinese(locale) ? '学习方法' : 'Learn How'}
                </TouchButton>
              </Link>
            </TouchCard>
          </div>
        </section>

        {/* Comprehensive Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '📖 完整教程指南' : '📖 Comprehensive Tutorial Guides'}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">
                {isChinese(locale) ? '基础教程' : 'Basic Tutorials'}
              </h3>
              
              <TouchCard hoverable className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🎯</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">
                      {isChinese(locale) ? '如何下载高清Twitter视频' : 'How to Download HD Twitter Videos'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {isChinese(locale) 
                        ? '详细教程教您下载1080p/4K高清Twitter视频，支持所有设备。'
                        : 'Detailed tutorial on downloading 1080p/4K HD Twitter videos, supporting all devices.'
                      }
                    </p>
                    <Link href={`/${locale}/guides/how-to-download-twitter-videos-hd`}>
                      <TouchButton size="small">
                        {isChinese(locale) ? '阅读教程' : 'Read Tutorial'}
                      </TouchButton>
                    </Link>
                  </div>
                </div>
              </TouchCard>

              <TouchCard hoverable className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✨</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">
                      {isChinese(locale) ? '无水印视频下载方法' : 'No Watermark Video Download Method'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {isChinese(locale) 
                        ? '专业用户必备：如何下载无水印的Twitter视频，适合商业用途。'
                        : 'Essential for professionals: how to download watermark-free Twitter videos for commercial use.'
                      }
                    </p>
                    <Link href={`/${locale}/guides/twitter-video-downloader-no-watermark`}>
                      <TouchButton size="small">
                        {isChinese(locale) ? '了解详情' : 'Learn More'}
                      </TouchButton>
                    </Link>
                  </div>
                </div>
              </TouchCard>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">
                {isChinese(locale) ? '设备专用教程' : 'Device-Specific Tutorials'}
              </h3>
              
              <TouchCard hoverable className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📱</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">
                      {isChinese(locale) ? 'iPhone用户下载指南' : 'iPhone User Download Guide'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {isChinese(locale) 
                        ? 'iOS系统优化的下载方法，包括Safari使用技巧和存储管理。'
                        : 'iOS-optimized download methods including Safari tips and storage management.'
                      }
                    </p>
                    <Link href={`/${locale}/guides/download-twitter-videos-iphone`}>
                      <TouchButton size="small">
                        {isChinese(locale) ? 'iPhone教程' : 'iPhone Tutorial'}
                      </TouchButton>
                    </Link>
                  </div>
                </div>
              </TouchCard>

              <TouchCard hoverable className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🤖</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">
                      {isChinese(locale) ? 'Android设备下载教程' : 'Android Device Download Tutorial'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {isChinese(locale) 
                        ? 'Android系统下载Twitter视频的最佳方法，支持所有主流品牌。'
                        : 'Best methods for downloading Twitter videos on Android, supporting all major brands.'
                      }
                    </p>
                    <Link href={`/${locale}/guides/download-twitter-videos-android`}>
                      <TouchButton size="small">
                        {isChinese(locale) ? 'Android教程' : 'Android Tutorial'}
                      </TouchButton>
                    </Link>
                  </div>
                </div>
              </TouchCard>
            </div>
          </div>
        </section>

        {/* Pro Tips & Tricks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '💡 专业技巧与窍门' : '💡 Pro Tips & Tricks'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TouchCard className="p-6">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '快速获取视频链接' : 'Quick Video Link Extraction'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '学会使用键盘快捷键和浏览器插件，快速复制Twitter视频链接。'
                  : 'Learn to use keyboard shortcuts and browser extensions to quickly copy Twitter video links.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '批量下载技巧' : 'Batch Download Tips'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '如何高效地批量下载多个Twitter视频，节省时间提高效率。'
                  : 'How to efficiently batch download multiple Twitter videos to save time and improve efficiency.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '视频格式优化' : 'Video Format Optimization'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '根据不同用途选择最适合的视频格式和分辨率设置。'
                  : 'Choose the most suitable video format and resolution settings for different purposes.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '安全下载须知' : 'Safe Download Guidelines'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '避免恶意软件和病毒，选择安全可靠的下载工具和网站。'
                  : 'Avoid malware and viruses by choosing safe and reliable download tools and websites.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '版权使用指南' : 'Copyright Usage Guide'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '了解Twitter视频的版权规定，合法合规地使用下载的内容。'
                  : 'Understand Twitter video copyright regulations and use downloaded content legally and compliantly.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? '质量评估方法' : 'Quality Assessment Methods'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? '如何判断Twitter视频的原始质量，选择最佳下载选项。'
                  : 'How to assess original Twitter video quality and select the best download options.'
                }
              </p>
            </TouchCard>
          </div>
        </section>

        {/* Featured Tools Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '🔧 热门工具对比' : '🔧 Featured Tools Comparison'}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">
                      {isChinese(locale) ? '工具特性' : 'Tool Features'}
                    </th>
                    <th className="p-4 text-center">
                      {isChinese(locale) ? 'TwitterXDownload' : 'TwitterXDownload'}
                    </th>
                    <th className="p-4 text-center">
                      {isChinese(locale) ? '其他在线工具' : 'Other Online Tools'}
                    </th>
                    <th className="p-4 text-center">
                      {isChinese(locale) ? '浏览器插件' : 'Browser Extensions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-4 font-medium">
                      {isChinese(locale) ? '易用性' : 'Ease of Use'}
                    </td>
                    <td className="p-4 text-center text-green-600">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center text-yellow-600">⭐⭐⭐</td>
                    <td className="p-4 text-center text-yellow-600">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <td className="p-4 font-medium">
                      {isChinese(locale) ? '下载速度' : 'Download Speed'}
                    </td>
                    <td className="p-4 text-center text-green-600">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center text-yellow-600">⭐⭐⭐</td>
                    <td className="p-4 text-center text-red-600">⭐⭐</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-4 font-medium">
                      {isChinese(locale) ? '安全性' : 'Security'}
                    </td>
                    <td className="p-4 text-center text-green-600">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center text-yellow-600">⭐⭐⭐</td>
                    <td className="p-4 text-center text-red-600">⭐⭐</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="p-4 font-medium">
                      {isChinese(locale) ? '支持质量' : 'Quality Support'}
                    </td>
                    <td className="p-4 text-center text-green-600">4K/HD</td>
                    <td className="p-4 text-center text-yellow-600">720p</td>
                    <td className="p-4 text-center text-yellow-600">480p</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isChinese(locale) ? '❓ 常见问题解答' : '❓ Frequently Asked Questions'}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <TouchCard className="p-6">
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? 'Q: 哪个是最好的Twitter视频下载工具？' : 'Q: Which is the best Twitter video download tool?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? 'A: TwitterXDownload被广泛认为是2024年最佳的Twitter视频下载工具，支持4K画质、无水印、完全免费，且下载速度最快。'
                  : 'A: TwitterXDownload is widely recognized as the best Twitter video download tool for 2024, supporting 4K quality, no watermarks, completely free, and fastest download speed.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? 'Q: 如何在手机上下载Twitter视频？' : 'Q: How to download Twitter videos on mobile?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? 'A: 使用手机浏览器访问TwitterXDownload网站，粘贴Twitter视频链接即可下载。我们的网站完全适配移动端，操作简单快捷。'
                  : 'A: Use your mobile browser to access TwitterXDownload website, paste the Twitter video link to download. Our website is fully mobile-optimized for easy and quick operation.'
                }
              </p>
            </TouchCard>

            <TouchCard className="p-6">
              <h3 className="text-lg font-bold mb-3">
                {isChinese(locale) ? 'Q: 下载Twitter视频是否合法？' : 'Q: Is it legal to download Twitter videos?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isChinese(locale) 
                  ? 'A: 下载Twitter视频本身是合法的，但请注意尊重版权。建议仅用于个人学习和欣赏，商业使用需获得原作者授权。'
                  : 'A: Downloading Twitter videos is legal, but please respect copyright. It\'s recommended for personal learning and appreciation only. Commercial use requires authorization from original creators.'
                }
              </p>
            </TouchCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isChinese(locale) ? '🚀 开始使用最佳Twitter视频下载工具' : '🚀 Start Using the Best Twitter Video Download Tool'}
          </h2>
          <p className="text-xl mb-6">
            {isChinese(locale) 
              ? '体验2024年最受欢迎的Twitter视频下载解决方案'
              : 'Experience the most popular Twitter video download solution of 2024'
            }
          </p>
          <Link href={`/${locale}/`}>
            <TouchButton 
              size="large" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4"
            >
              {isChinese(locale) ? '立即开始下载' : 'Start Downloading Now'}
            </TouchButton>
          </Link>
        </section>
      </div>
    </>
  );
} 