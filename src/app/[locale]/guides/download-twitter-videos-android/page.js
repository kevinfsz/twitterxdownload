import { getTranslation, isChinese } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/seo/StructuredData';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'download-twitter-videos-android',
    locale: locale,
    pathname: `/${locale}/guides/download-twitter-videos-android/`
  });
}

export default function DownloadTwitterVideosAndroid({ params: { locale } }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": isChinese(locale) ? "Android下载Twitter视频完整教程" : "Complete Guide to Download Twitter Videos on Android",
    "description": isChinese(locale) 
      ? "针对Android用户的Twitter视频下载详细教程，支持所有安卓手机品牌。"
      : "Detailed Twitter video download tutorial specifically for Android users, supporting all Android phone brands.",
    "image": "/images/android-twitter-video-download.jpg",
    "totalTime": "PT3M",
    "supply": [{
      "@type": "HowToSupply",
      "name": "Android Phone"
    }, {
      "@type": "HowToSupply", 
      "name": "Chrome or Firefox Browser"
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
        "name": isChinese(locale) ? "在Android上打开Twitter" : "Open Twitter on Android",
        "text": isChinese(locale) ? "使用Twitter App或Chrome浏览器找到要下载的视频。" : "Use Twitter App or Chrome browser to find the video you want to download.",
        "image": "/images/android-step1-open-twitter.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "复制视频链接" : "Copy Video Link",
        "text": isChinese(locale) ? "点击分享按钮，选择'复制链接'或'分享链接'。" : "Tap the share button, select 'Copy link' or 'Share link'.",
        "image": "/images/android-step2-copy-link.jpg"
      },
      {
        "@type": "HowToStep",
        "name": isChinese(locale) ? "使用TwitterXDownload下载" : "Download with TwitterXDownload",
        "text": isChinese(locale) ? "在浏览器中打开TwitterXDownload，粘贴链接并下载到设备。" : "Open TwitterXDownload in browser, paste the link and download to device.",
        "image": "/images/android-step3-download.jpg"
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
              {isChinese(locale) ? 'Android下载Twitter视频：安卓用户完整指南' : 'Download Twitter Videos on Android: Complete Android Guide'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {isChinese(locale) 
                ? '专为Android用户设计的Twitter视频下载教程。支持所有安卓手机品牌，无需Root权限，使用浏览器即可轻松下载高清视频。'
                : 'Twitter video download tutorial designed specifically for Android users. Support all Android phone brands, no root required, easily download HD videos using browser.'
              }
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
              <span>{isChinese(locale) ? '🤖 Android专用' : '🤖 Android Specific'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '📱 全品牌支持' : '📱 All Brands Support'}</span>
              <span>•</span>
              <span>{isChinese(locale) ? '⚡ 3分钟教程' : '⚡ 3-Min Tutorial'}</span>
            </div>
          </header>

          <div className="mb-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
              🤖 {isChinese(locale) ? 'Android系统独特优势' : 'Android System Unique Advantages'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">{isChinese(locale) ? '开放性特点' : 'Openness Features'}</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>{isChinese(locale) ? '多浏览器支持（Chrome、Firefox等）' : 'Multiple browser support (Chrome, Firefox, etc.)'}</li>
                  <li>{isChinese(locale) ? '灵活的文件管理系统' : 'Flexible file management system'}</li>
                  <li>{isChinese(locale) ? '可自定义下载位置' : 'Customizable download location'}</li>
                  <li>{isChinese(locale) ? '支持第三方下载管理器' : 'Support third-party download managers'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">{isChinese(locale) ? '兼容性优势' : 'Compatibility Advantages'}</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>{isChinese(locale) ? '支持所有Android版本（4.0+）' : 'Support all Android versions (4.0+)'}</li>
                  <li>{isChinese(locale) ? '适配三星、华为、小米等品牌' : 'Compatible with Samsung, Huawei, Xiaomi and more'}</li>
                  <li>{isChinese(locale) ? '无需特殊权限或Root' : 'No special permissions or root required'}</li>
                  <li>{isChinese(locale) ? '跨设备云同步支持' : 'Cross-device cloud sync support'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'Android品牌适配情况' : 'Android Brand Compatibility'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🏆 {isChinese(locale) ? '主流品牌' : 'Major Brands'}
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? '三星 Galaxy系列' : 'Samsung Galaxy Series'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? '华为 Mate/P系列' : 'Huawei Mate/P Series'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? '小米 Redmi系列' : 'Xiaomi Redmi Series'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? 'OPPO Find系列' : 'OPPO Find Series'}
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <h3 className="font-bold mb-3 text-purple-800 dark:text-purple-200">
                  🌟 {isChinese(locale) ? '国际品牌' : 'International Brands'}
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Google Pixel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    OnePlus
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Sony Xperia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    LG/Motorola
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                <h3 className="font-bold mb-3 text-orange-800 dark:text-orange-200">
                  🔧 {isChinese(locale) ? '定制系统' : 'Custom Systems'}
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? 'MIUI (小米)' : 'MIUI (Xiaomi)'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? 'ColorOS (OPPO)' : 'ColorOS (OPPO)'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? 'FunTouch (vivo)' : 'FunTouch (vivo)'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {isChinese(locale) ? '原生Android' : 'Stock Android'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'Android下载Twitter视频详细步骤' : 'Detailed Steps to Download Twitter Videos on Android'}
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                      {isChinese(locale) ? '在Android设备上找到Twitter视频' : 'Find Twitter Video on Android Device'}
                    </h3>
                    <p className="mb-4">
                      {isChinese(locale) 
                        ? '您可以使用Twitter官方App、Chrome浏览器或任何您喜欢的浏览器。Android系统的开放性让您有更多选择。'
                        : 'You can use the official Twitter app, Chrome browser, or any browser you prefer. Android system openness gives you more choices.'
                      }
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {isChinese(locale) ? '📱 Twitter App方式' : '📱 Twitter App Method'}
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• {isChinese(locale) ? '直接在应用内浏览视频' : 'Browse videos directly in the app'}</li>
                          <li>• {isChinese(locale) ? '更好的用户体验' : 'Better user experience'}</li>
                          <li>• {isChinese(locale) ? '推送通知支持' : 'Push notification support'}</li>
                        </ul>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {isChinese(locale) ? '🌐 浏览器方式' : '🌐 Browser Method'}
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• {isChinese(locale) ? '支持多标签页操作' : 'Support multi-tab operation'}</li>
                          <li>• {isChinese(locale) ? '可使用扩展程序' : 'Can use extensions'}</li>
                          <li>• {isChinese(locale) ? '更好的下载管理' : 'Better download management'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                      {isChinese(locale) ? '复制推文链接（多种方式）' : 'Copy Tweet Link (Multiple Methods)'}
                    </h3>
                    <p className="mb-4">
                      {isChinese(locale) 
                        ? 'Android系统提供了多种复制链接的方法，根据您使用的应用选择最方便的方式。'
                        : 'Android system provides multiple methods to copy links, choose the most convenient method based on the app you use.'
                      }
                    </p>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{isChinese(locale) ? 'Twitter App方法' : 'Twitter App Method'}</h4>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>{isChinese(locale) ? '点击推文右上角的三个点图标' : 'Tap three dots icon in top right of tweet'}</li>
                          <li>{isChinese(locale) ? '从菜单中选择"分享推文"' : 'Select "Share Tweet" from menu'}</li>
                          <li>{isChinese(locale) ? '选择"复制链接"或"复制链接到推文"' : 'Choose "Copy link" or "Copy link to Tweet"'}</li>
                        </ol>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{isChinese(locale) ? '浏览器方法' : 'Browser Method'}</h4>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>{isChinese(locale) ? '长按地址栏中的URL' : 'Long press URL in address bar'}</li>
                          <li>{isChinese(locale) ? '选择"复制"或"全选并复制"' : 'Select "Copy" or "Select all and copy"'}</li>
                          <li>{isChinese(locale) ? '或使用分享按钮复制链接' : 'Or use share button to copy link'}</li>
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
                        ? '在您的Android浏览器中打开TwitterXDownload网站，粘贴链接并选择下载质量。Android系统会自动管理下载文件。'
                        : 'Open TwitterXDownload website in your Android browser, paste the link and select download quality. Android system will automatically manage download files.'
                      }
                    </p>
                    <div className="text-center my-6">
                      <Link href={`/${locale}/`} 
                            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                        {isChinese(locale) ? '🚀 立即使用TwitterXDownload' : '🚀 Use TwitterXDownload Now'}
                      </Link>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        {isChinese(locale) ? '⚠️ Android下载提示：' : '⚠️ Android Download Tips:'}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• {isChinese(locale) ? '视频默认下载到"Download"文件夹' : 'Videos download to "Download" folder by default'}</li>
                        <li>• {isChinese(locale) ? '可以在浏览器设置中修改下载位置' : 'Can modify download location in browser settings'}</li>
                        <li>• {isChinese(locale) ? '支持断点续传，网络中断后可继续' : 'Support resume download after network interruption'}</li>
                        <li>• {isChinese(locale) ? '下载完成后会收到通知提醒' : 'Receive notification reminder when download completes'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'Android浏览器推荐和设置' : 'Android Browser Recommendations and Settings'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-blue-800 dark:text-blue-200">
                  🌐 {isChinese(locale) ? '推荐浏览器' : 'Recommended Browsers'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">Google Chrome</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '最佳兼容性' : 'Best compatibility'}
                      </div>
                    </div>
                    <span className="text-green-600 text-sm">⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">Mozilla Firefox</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '隐私保护好' : 'Great privacy protection'}
                      </div>
                    </div>
                    <span className="text-blue-600 text-sm">⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">Samsung Internet</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '三星设备优化' : 'Samsung device optimized'}
                      </div>
                    </div>
                    <span className="text-purple-600 text-sm">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-green-800 dark:text-green-200">
                  ⚙️ {isChinese(locale) ? '优化设置建议' : 'Optimization Settings'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '启用下载管理器' : 'Enable Download Manager'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '更好地管理下载文件' : 'Better management of download files'}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '允许弹出窗口' : 'Allow Pop-ups'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '确保下载窗口正常打开' : 'Ensure download windows open properly'}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="font-medium">{isChinese(locale) ? '设置下载位置' : 'Set Download Location'}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isChinese(locale) ? '选择合适的存储位置' : 'Choose appropriate storage location'}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {isChinese(locale) ? 'Android用户常见问题解答' : 'Android User FAQ'}
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-blue-800 dark:text-blue-200">
                  {isChinese(locale) ? 'Q: 下载的视频保存在Android的哪个位置？' : 'Q: Where are downloaded videos saved on Android?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 视频通常保存在内部存储的"Download"文件夹中，路径为：/storage/emulated/0/Download/。您也可以通过文件管理器或相册应用查看。部分浏览器允许自定义下载位置。'
                    : 'A: Videos are usually saved in the "Download" folder of internal storage, path: /storage/emulated/0/Download/. You can also view them through file manager or gallery app. Some browsers allow custom download locations.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-green-800 dark:text-green-200">
                  {isChinese(locale) ? 'Q: 为什么有些Android设备下载速度较慢？' : 'Q: Why do some Android devices have slow download speeds?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 下载速度主要受以下因素影响：1)网络连接质量 2)设备存储读写速度 3)浏览器性能 4)后台应用占用。建议使用WiFi网络，关闭不必要的后台应用，选择性能较好的浏览器如Chrome。'
                    : 'A: Download speed is mainly affected by: 1) Network connection quality 2) Device storage read/write speed 3) Browser performance 4) Background app usage. Recommend using WiFi network, closing unnecessary background apps, and choosing high-performance browsers like Chrome.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-purple-800 dark:text-purple-200">
                  {isChinese(locale) ? 'Q: Android系统版本要求是什么？' : 'Q: What are the Android system version requirements?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: TwitterXDownload支持Android 4.0及以上版本。对于较老的设备，建议使用轻量级浏览器。Android 6.0以上版本体验最佳，支持更好的下载管理和文件权限控制。'
                    : 'A: TwitterXDownload supports Android 4.0 and above. For older devices, recommend using lightweight browsers. Android 6.0+ versions provide the best experience with better download management and file permission control.'
                  }
                </p>
              </details>
              
              <details className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <summary className="font-bold cursor-pointer mb-3 text-red-800 dark:text-red-200">
                  {isChinese(locale) ? 'Q: 如何解决Android下载权限问题？' : 'Q: How to solve Android download permission issues?'}
                </summary>
                <p>
                  {isChinese(locale) 
                    ? 'A: 如果遇到下载权限问题：1)进入设置→应用管理→浏览器→权限，开启存储权限 2)检查是否有足够的存储空间 3)尝试更改下载位置到SD卡 4)重启浏览器或清除浏览器缓存。'
                    : 'A: If you encounter download permission issues: 1) Go to Settings → App Management → Browser → Permissions, enable storage permission 2) Check if there is sufficient storage space 3) Try changing download location to SD card 4) Restart browser or clear browser cache.'
                  }
                </p>
              </details>
            </div>
          </div>

          <div className="mb-12 bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '开始您的Android Twitter视频下载之旅' : 'Start Your Android Twitter Video Download Journey'}
            </h2>
            <p className="mb-6">
              {isChinese(locale) 
                ? '专为Android用户优化的Twitter视频下载体验。支持所有品牌和系统版本，开放灵活，操作简单。'
                : 'Twitter video download experience optimized specifically for Android users. Support all brands and system versions, open and flexible, easy to operate.'
              }
            </p>
            <Link href={`/${locale}/`} 
                  className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {isChinese(locale) ? '立即开始下载' : 'Start Downloading Now'}
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isChinese(locale) ? '相关教程推荐' : 'Related Tutorial Recommendations'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href={`/${locale}/guides/download-twitter-videos-iphone`} 
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold mb-2">
                  {isChinese(locale) ? 'iPhone下载教程' : 'iPhone Download Guide'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? 'iOS用户专用的Twitter视频下载指南' : 'Twitter video download guide for iOS users'}
                </p>
              </Link>
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 