import { getTranslation, isChinese } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/seo/StructuredData';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'how-to-download-twitter-videos-hd',
    locale: locale,
    pathname: `/${locale}/guides/how-to-download-twitter-videos-hd/`
  });
}

export default function HowToDownloadTwitterVideosHD({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  };

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": isChinese(locale) ? "如何下载高清Twitter视频" : "How to Download Twitter Videos in HD",
    "description": isChinese(locale) 
      ? "完整的Twitter高清视频下载教程，包括详细步骤和工具推荐。"
      : "Complete guide for downloading Twitter videos in HD quality with detailed steps and tool recommendations.",
    "image": "/images/how-to-download-twitter-videos-hd.jpg",
    "totalTime": "PT3M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "找到要下载的Twitter视频" : "Find the Twitter Video to Download",
        "text": isChinese(locale) ? "在Twitter上找到您想要下载的视频推文。" : "Locate the Twitter post containing the video you want to download.",
        "image": "/images/step1-find-twitter-video.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "复制推文链接" : "Copy the Tweet URL",
        "text": isChinese(locale) ? "点击推文右上角的分享按钮，选择\"复制链接\"。" : "Click the share button on the tweet and select 'Copy link'.",
        "image": "/images/step2-copy-tweet-url.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "使用TwitterXDownload工具" : "Use TwitterXDownload Tool",
        "text": isChinese(locale) ? "打开TwitterXDownload，粘贴链接并选择高清质量下载。" : "Open TwitterXDownload, paste the link and select HD quality for download.",
        "image": "/images/step3-download-hd-video.jpg"
      }
    ],
    "author": {
      "@type": "Organization",
      "name": "TwitterXDownload"
    }
  };

  return (
    <>
      <StructuredData locale={locale} pageType="article" data={structuredData} />
      <Breadcrumb locale={locale} />
      
      <div className="page-container max-w-4xl mx-auto">
        <article className="prose prose-lg mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {isChinese(locale) ? '如何下载高清Twitter视频：完整教程指南' : 'How to Download Twitter Videos in HD: Complete Tutorial Guide'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {isChinese(locale) 
                ? '详细教程教您如何下载1080p/4K高清Twitter视频，支持所有设备，无水印，完全免费。'
                : 'Learn how to download 1080p/4K HD Twitter videos on any device, watermark-free and completely free.'
              }
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
              <span>{isChinese(locale) ? '发布时间：2024年12月' : 'Published: December 2024'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '阅读时间：5分钟' : 'Read time: 5 minutes'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '难度：⭐⭐' : 'Difficulty: ⭐⭐'}</span>
            </div>
          </header>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? '为什么需要下载高清Twitter视频？' : 'Why Download Twitter Videos in HD Quality?'}
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <p className="mb-4">
                {isChinese(locale) 
                  ? 'Twitter上的视频内容质量越来越高，许多创作者分享4K和高清视频。默认的Twitter视频下载通常会压缩质量，而我们的方法可以帮助您获得原始高清质量的视频文件。'
                  : 'Twitter video content quality is getting better, with many creators sharing 4K and HD videos. Default Twitter video downloads often compress quality, but our method helps you get original HD quality video files.'
                }
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>{isChinese(locale) ? '保持原始视频质量（最高4K）' : 'Maintain original video quality (up to 4K)'}</li>
                <li>{isChinese(locale) ? '无水印和压缩损失' : 'No watermarks or compression loss'}</li>
                <li>{isChinese(locale) ? '适合专业用途和收藏' : 'Perfect for professional use and collection'}</li>
                <li>{isChinese(locale) ? '支持所有主流设备' : 'Compatible with all major devices'}</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? '高清Twitter视频下载步骤' : 'Steps to Download HD Twitter Videos'}
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    {isChinese(locale) ? '找到目标Twitter视频' : 'Locate Target Twitter Video'}
                  </h3>
                  <p className="mb-4">
                    {isChinese(locale) 
                      ? '在Twitter或X平台上浏览，找到您想要下载的高清视频。通常，高质量的视频在全屏播放时会显示更好的清晰度。'
                      : 'Browse Twitter or X platform to find the HD video you want to download. High-quality videos typically show better clarity when played in full screen.'
                    }
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">
                      {isChinese(locale) ? '💡 专业提示：' : '💡 Pro Tip:'}
                    </p>
                    <p className="text-sm">
                      {isChinese(locale) 
                        ? '优质创作者通常会上传高分辨率视频。查找有"HD"或"4K"标识的内容，或者关注知名媒体账号。'
                        : 'Quality creators usually upload high-resolution videos. Look for content marked with "HD" or "4K", or follow verified media accounts.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    {isChinese(locale) ? '获取视频链接' : 'Get Video Link'}
                  </h3>
                  <p className="mb-4">
                    {isChinese(locale) 
                      ? '点击推文右上角的分享图标（三个点或分享按钮），选择"复制链接"选项。这将复制完整的推文URL到您的剪贴板。'
                      : 'Click the share icon (three dots or share button) in the top right of the tweet, then select "Copy link". This copies the complete tweet URL to your clipboard.'
                    }
                  </p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="text-sm">
                      {isChinese(locale) 
                        ? '⚠️ 注意：确保复制的是完整的推文链接，格式应该类似：https://twitter.com/username/status/1234567890'
                        : '⚠️ Note: Make sure to copy the complete tweet link, which should look like: https://twitter.com/username/status/1234567890'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    {isChinese(locale) ? '使用TwitterXDownload工具' : 'Use TwitterXDownload Tool'}
                  </h3>
                  <p className="mb-4">
                    {isChinese(locale) 
                      ? '打开TwitterXDownload网站，将复制的链接粘贴到输入框中。我们的工具会自动检测视频质量选项，选择最高质量进行下载。'
                      : 'Open the TwitterXDownload website and paste the copied link into the input box. Our tool will automatically detect video quality options - select the highest quality for download.'
                    }
                  </p>
                  <div className="text-center my-6">
                    <Link href={`/${locale}/`} 
                          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      {isChinese(locale) ? '🚀 立即使用TwitterXDownload' : '🚀 Use TwitterXDownload Now'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? '支持的视频质量格式' : 'Supported Video Quality Formats'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-3">
                  {isChinese(locale) ? '🎥 视频质量选项' : '🎥 Video Quality Options'}
                </h3>
                <ul className="space-y-2">
                  <li>• 4K (3840×2160) - {isChinese(locale) ? '超高清' : 'Ultra HD'}</li>
                  <li>• 1080p (1920×1080) - {isChinese(locale) ? '全高清' : 'Full HD'}</li>
                  <li>• 720p (1280×720) - {isChinese(locale) ? '高清' : 'HD'}</li>
                  <li>• 480p (854×480) - {isChinese(locale) ? '标清' : 'SD'}</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-3">
                  {isChinese(locale) ? '📱 支持格式' : '📱 Supported Formats'}
                </h3>
                <ul className="space-y-2">
                  <li>• MP4 - {isChinese(locale) ? '最通用格式' : 'Most universal format'}</li>
                  <li>• MOV - {isChinese(locale) ? 'Apple设备优化' : 'Apple device optimized'}</li>
                  <li>• AVI - {isChinese(locale) ? 'PC兼容性好' : 'Great PC compatibility'}</li>
                  <li>• GIF - {isChinese(locale) ? '动图格式' : 'Animated format'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? '常见问题解答' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">
                  {isChinese(locale) ? 'Q: 所有Twitter视频都支持高清下载吗？' : 'Q: Do all Twitter videos support HD download?'}
                </h3>
                <p>
                  {isChinese(locale) 
                    ? 'A: 视频质量取决于原始上传的质量。如果创作者上传了高清视频，我们可以下载原始质量。如果原始视频是标清，我们无法提升其质量。'
                    : 'A: Video quality depends on the original upload quality. If creators uploaded HD videos, we can download the original quality. If the original video is SD, we cannot enhance its quality.'
                  }
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">
                  {isChinese(locale) ? 'Q: 下载的视频会有水印吗？' : 'Q: Will downloaded videos have watermarks?'}
                </h3>
                <p>
                  {isChinese(locale) 
                    ? 'A: 我们的工具不会添加任何水印。下载的视频是原始内容，没有额外的标识或品牌标记。'
                    : 'A: Our tool does not add any watermarks. Downloaded videos are original content without additional logos or brand marks.'
                  }
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">
                  {isChinese(locale) ? 'Q: 可以批量下载多个视频吗？' : 'Q: Can I batch download multiple videos?'}
                </h3>
                <p>
                  {isChinese(locale) 
                    ? 'A: 目前我们的工具支持单个视频下载，以确保最佳质量和速度。对于多个视频，需要逐个处理。'
                    : 'A: Currently our tool supports single video downloads to ensure best quality and speed. For multiple videos, process them one by one.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '立即下载您的高清Twitter视频！' : 'Download Your HD Twitter Videos Now!'}
            </h2>
            <p className="mb-6">
              {isChinese(locale) 
                ? '使用我们的免费工具，几秒钟内即可获得高质量的Twitter视频。无需注册，无需付费。'
                : 'Use our free tool to get high-quality Twitter videos in seconds. No registration required, no payment needed.'
              }
            </p>
            <Link href={`/${locale}/`} 
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {isChinese(locale) ? '开始下载' : 'Start Downloading'}
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '相关工具推荐' : 'Related Tools'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${locale}/landing/twitter-gif-download`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? 'Twitter GIF下载器' : 'Twitter GIF Downloader'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '专门下载Twitter GIF动图，保持原始质量' : 'Specialized for downloading Twitter GIFs in original quality'}
                </p>
              </Link>
              <Link href={`/${locale}/landing/mobile-video-download`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? '手机视频下载器' : 'Mobile Video Downloader'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '专为手机用户优化的Twitter视频下载工具' : 'Twitter video downloader optimized for mobile users'}
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 