import { getTranslation, isChinese } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/seo/StructuredData';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'download-twitter-videos-iphone',
    locale: locale,
    pathname: `/${locale}/guides/download-twitter-videos-iphone/`
  });
}

export default function DownloadTwitterVideosIPhone({ params: { locale } }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": isChinese(locale) ? "iPhone下载Twitter视频完整教程" : "Complete Guide to Download Twitter Videos on iPhone",
    "description": isChinese(locale) 
      ? "针对iPhone用户的Twitter视频下载详细教程，包括iOS Safari浏览器使用方法。"
      : "Detailed Twitter video download tutorial specifically for iPhone users, including iOS Safari browser usage methods.",
    "image": "/images/iphone-twitter-video-download.jpg",
    "totalTime": "PT2M",
    "supply": [{
      "@type": "HowToSupply",
      "name": "iPhone"
    }, {
      "@type": "HowToSupply", 
      "name": "Safari Browser"
    }, {
      "@type": "HowToSupply",
      "name": "Internet Connection"
    }],
    "tool": [{
      "@type": "HowToTool",
      "name": "TwitterXDownload Website"
    }],
    "step": [
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "在iPhone上打开Twitter" : "Open Twitter on iPhone",
        "text": isChinese(locale) ? "使用Twitter App或Safari浏览器找到要下载的视频。" : "Use Twitter App or Safari browser to find the video you want to download.",
        "image": "/images/iphone-step1-open-twitter.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "复制视频链接" : "Copy Video Link",
        "text": isChinese(locale) ? "点击分享按钮，选择'复制链接'，链接将保存到剪贴板。" : "Tap the share button, select 'Copy link', and the link will be saved to clipboard.",
        "image": "/images/iphone-step2-copy-link.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "使用TwitterXDownload下载" : "Download with TwitterXDownload",
        "text": isChinese(locale) ? "在Safari中打开TwitterXDownload，粘贴链接并下载到相册。" : "Open TwitterXDownload in Safari, paste the link and download to photo gallery.",
        "image": "/images/iphone-step3-download.jpg"
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
      
      <div className="page-container max-w-4xl mx-auto">
        <article className="prose prose-lg mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {isChinese(locale) ? 'iPhone下载Twitter视频：iOS用户专用教程' : 'Download Twitter Videos on iPhone: iOS User Guide'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {isChinese(locale) 
                ? '专为iPhone用户设计的Twitter视频下载教程。无需安装额外App，直接使用Safari浏览器即可下载高清视频到相册。'
                : 'Twitter video download tutorial designed specifically for iPhone users. No additional app installation required, download HD videos directly to gallery using Safari browser.'
              }
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
              <span>{isChinese(locale) ? '📱 iPhone专用' : '📱 iPhone Specific'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '🎥 支持高清' : '🎥 HD Support'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '⚡ 2分钟教程' : '⚡ 2-Min Tutorial'}</span>
            </div>
          </header>

          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">
              📱 {isChinese(locale) ? 'iPhone用户独特优势' : 'iPhone User Unique Advantages'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">{isChinese(locale) ? 'iOS系统优化' : 'iOS System Optimization'}</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>{isChinese(locale) ? 'Safari浏览器原生支持' : 'Safari browser native support'}</li>
                  <li>{isChinese(locale) ? '直接保存到相册' : 'Direct save to photo gallery'}</li>
                  <li>{isChinese(locale) ? '自动视频格式优化' : 'Automatic video format optimization'}</li>
                  <li>{isChinese(locale) ? '流畅的下载体验' : 'Smooth download experience'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">{isChinese(locale) ? '便捷性特点' : 'Convenience Features'}</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>{isChinese(locale) ? '无需安装第三方App' : 'No third-party app installation required'}</li>
                  <li>{isChinese(locale) ? '一键分享到其他应用' : 'One-click sharing to other apps'}</li>
                  <li>{isChinese(locale) ? '支持AirDrop快速传输' : 'Support AirDrop quick transfer'}</li>
                  <li>{isChinese(locale) ? '与iCloud无缝同步' : 'Seamless iCloud sync'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'iPhone下载Twitter视频详细步骤' : 'Detailed Steps to Download Twitter Videos on iPhone'}
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                      {isChinese(locale) ? '在iPhone上找到Twitter视频' : 'Find Twitter Video on iPhone'}
                    </h3>
                    <p className="mb-4">
                      {isChinese(locale) 
                        ? '您可以使用Twitter官方App或Safari浏览器打开Twitter网站。找到您想要下载的视频后，确保视频可以正常播放。'
                        : 'You can use the official Twitter app or Safari browser to open the Twitter website. After finding the video you want to download, make sure the video plays normally.'
                      }
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        {isChinese(locale) ? '💡 专业提示：' : '💡 Pro Tips:'}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• {isChinese(locale) ? '优先选择原始推文，避免转发内容' : 'Prefer original tweets, avoid retweeted content'}</li>
                        <li>• {isChinese(locale) ? '确保网络连接稳定，避免下载中断' : 'Ensure stable internet connection to avoid download interruption'}</li>
                        <li>• {isChinese(locale) ? '检查视频是否为高质量原始内容' : 'Check if video is high-quality original content'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                      {isChinese(locale) ? '复制推文链接到剪贴板' : 'Copy Tweet Link to Clipboard'}
                    </h3>
                    <p className="mb-4">
                      {isChinese(locale) 
                        ? '点击推文右上角的分享按钮（三个点图标），从弹出菜单中选择"复制链接"选项。链接会自动保存到iPhone的剪贴板中。'
                        : 'Tap the share button (three dots icon) in the top right of the tweet, select "Copy link" from the popup menu. The link will be automatically saved to iPhone clipboard.'
                      }
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{isChinese(locale) ? 'Twitter App方式' : 'Twitter App Method'}</h4>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>{isChinese(locale) ? '点击推文右上角的分享图标' : 'Tap share icon in top right of tweet'}</li>
                          <li>{isChinese(locale) ? '选择"复制链接"选项' : 'Select "Copy link" option'}</li>
                          <li>{isChinese(locale) ? '看到"已复制"提示' : 'See "Copied" confirmation'}</li>
                        </ol>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{isChinese(locale) ? 'Safari方式' : 'Safari Method'}</h4>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>{isChinese(locale) ? '长按地址栏URL' : 'Long press address bar URL'}</li>
                          <li>{isChinese(locale) ? '选择"拷贝"' : 'Select "Copy"'}</li>
                          <li>{isChinese(locale) ? '或点击分享按钮复制链接' : 'Or tap share button to copy link'}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                      {isChinese(locale) ? '使用TwitterXDownload下载视频' : 'Download Video with TwitterXDownload'}
                    </h3>
                    <p className="mb-4">
                      {isChinese(locale) 
                        ? '在Safari浏览器中打开TwitterXDownload网站，将复制的链接粘贴到输入框，选择视频质量后点击下载。视频将自动保存到iPhone相册。'
                        : 'Open TwitterXDownload website in Safari browser, paste the copied link into the input box, select video quality and tap download. Video will be automatically saved to iPhone gallery.'
                      }
                    </p>
                    <div className="text-center my-6">
                      <Link href={`/${locale}/`} 
                            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                        {isChinese(locale) ? '🚀 立即使用TwitterXDownload' : '🚀 Use TwitterXDownload Now'}
                      </Link>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        {isChinese(locale) ? '⚠️ iPhone下载注意事项：' : '⚠️ iPhone Download Notes:'}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• {isChinese(locale) ? '首次下载时Safari可能询问下载权限，选择"允许"' : 'Safari may ask for download permission on first use, select "Allow"'}</li>
                        <li>• {isChinese(locale) ? '视频将保存在"下载"文件夹，可移动到相册' : 'Videos save to "Downloads" folder, can be moved to gallery'}</li>
                        <li>• {isChinese(locale) ? '大文件下载建议在WiFi环境下进行' : 'Large file downloads recommended under WiFi'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'iPhone视频质量和格式选择' : 'iPhone Video Quality and Format Selection'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-indigo-800 dark:text-indigo-200">
                  🎬 {isChinese(locale) ? '推荐视频质量' : 'Recommended Video Quality'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">4K (2160p)</span>
                    <span className="text-green-600 text-sm">{isChinese(locale) ? '最佳质量' : 'Best Quality'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">1080p HD</span>
                    <span className="text-blue-600 text-sm">{isChinese(locale) ? '推荐' : 'Recommended'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">720p</span>
                    <span className="text-yellow-600 text-sm">{isChinese(locale) ? '标准' : 'Standard'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">480p</span>
                    <span className="text-gray-600 text-sm">{isChinese(locale) ? '省流量' : 'Data Saving'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-green-800 dark:text-green-200">
                  📱 {isChinese(locale) ? 'iPhone优化建议' : 'iPhone Optimization Tips'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '存储空间' : 'Storage Space'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '确保iPhone有足够存储空间' : 'Ensure iPhone has sufficient storage space'}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '网络环境' : 'Network Environment'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '优先使用WiFi，避免流量超额' : 'Use WiFi preferably, avoid data overage'}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '电量管理' : 'Battery Management'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '下载大文件时保持充足电量' : 'Maintain sufficient battery for large downloads'}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'iPhone用户常见问题解答' : 'iPhone User FAQ'}
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-blue-800 dark:text-blue-200">
                  {isChinese(locale) ? 'Q: 下载的视频保存在iPhone的哪里？' : 'Q: Where are downloaded videos saved on iPhone?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 视频通常保存在Safari的"下载"文件夹中。您可以通过"文件"App查看，或者直接保存到"相册"App中。部分视频会自动出现在相册的"视频"分类里。'
                    : 'A: Videos are usually saved in Safari\'s "Downloads" folder. You can view them through the "Files" app, or save directly to the "Photos" app. Some videos automatically appear in the "Videos" category of the photo gallery.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-green-800 dark:text-green-200">
                  {isChinese(locale) ? 'Q: 为什么有时候下载失败？' : 'Q: Why do downloads sometimes fail?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 下载失败通常由以下原因造成：1)网络连接不稳定 2)iPhone存储空间不足 3)视频链接已过期 4)Safari浏览器缓存问题。建议清除Safari缓存后重试。'
                    : 'A: Download failures are usually caused by: 1) Unstable internet connection 2) Insufficient iPhone storage space 3) Expired video link 4) Safari browser cache issues. Recommend clearing Safari cache and retry.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-purple-800 dark:text-purple-200">
                  {isChinese(locale) ? 'Q: 可以批量下载多个视频吗？' : 'Q: Can I batch download multiple videos?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 由于iOS系统的限制，目前不支持真正的批量下载。但您可以打开多个Safari标签页，同时处理多个下载任务。建议一次不要超过3-4个下载，以确保稳定性。'
                    : 'A: Due to iOS system limitations, true batch downloading is not currently supported. However, you can open multiple Safari tabs to handle multiple download tasks simultaneously. Recommend no more than 3-4 downloads at once to ensure stability.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-red-800 dark:text-red-200">
                  {isChinese(locale) ? 'Q: 下载会消耗很多流量吗？' : 'Q: Will downloading consume a lot of data?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 流量消耗取决于视频质量和时长。高清1080p的1分钟视频大约10-20MB，4K视频可能达到50-100MB。建议在WiFi环境下下载，或选择较低质量以节省流量。'
                    : 'A: Data consumption depends on video quality and duration. HD 1080p 1-minute video is about 10-20MB, 4K videos can reach 50-100MB. Recommend downloading under WiFi, or select lower quality to save data.'
                  }
                </p>
              </details>
            </div>
          </div>

          <div className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '开始您的iPhone Twitter视频下载之旅' : 'Start Your iPhone Twitter Video Download Journey'}
            </h2>
            <p className="mb-6">
              {isChinese(locale) 
                ? '专为iPhone用户优化的Twitter视频下载体验。无需安装App，直接使用Safari浏览器，安全便捷。'
                : 'Twitter video download experience optimized specifically for iPhone users. No app installation required, use Safari browser directly, safe and convenient.'
              }
            </p>
            <Link href={`/${locale}/`} 
                  className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {isChinese(locale) ? '立即开始下载' : 'Start Downloading Now'}
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '相关教程推荐' : 'Related Tutorial Recommendations'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href={`/${locale}/guides/how-to-download-twitter-videos-hd`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? '高清视频下载' : 'HD Video Download'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '学习如何下载最高质量的Twitter视频' : 'Learn how to download highest quality Twitter videos'}
                </p>
              </Link>
              <Link href={`/${locale}/guides/twitter-video-downloader-no-watermark`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? '无水印下载' : 'No Watermark Download'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '获得完全无品牌标识的视频文件' : 'Get completely brand-free video files'}
                </p>
              </Link>
              <Link href={`/${locale}/landing/mobile-video-download`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? '移动端专用' : 'Mobile Optimized'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '手机用户专用的下载工具' : 'Download tool specifically for mobile users'}
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 