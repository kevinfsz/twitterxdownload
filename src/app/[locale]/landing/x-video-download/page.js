import { getTranslation, isChinese } from '@/lib/i18n';
import Hero from '@/app/components/ui/Hero';
import FAQ from '@/app/components/ui/FAQ';
import StructuredData from '@/app/components/StructuredData';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'x-video-download',
    locale: locale,
    pathname: `/${locale}/landing/x-video-download/`
  });
}

export default async function XVideoDownloadLanding({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  };
  
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  const baseUrl = `${protocol}://${host}`;
  const remainApiResp = await fetch(`${baseUrl}/api/remains`, {
    cache: 'no-store'
  });
  const remainApiCountData = await remainApiResp.json();
  const remainApiCount = remainApiCountData.data;

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isChinese(locale) ? "X视频下载器 - TwitterXDownload" : "X Video Downloader - TwitterXDownload",
    "description": isChinese(locale) 
      ? "专业的X视频下载工具，支持免费下载X平台视频、GIF和图片，高质量输出。"
      : "Professional X video downloader tool for free downloading X platform videos, GIFs, and images with high quality output.",
    "url": `${baseUrl}/${locale}/landing/x-video-download/`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      isChinese(locale) ? "免费下载X视频" : "Free X video download",
      isChinese(locale) ? "支持1080p高清下载" : "Support 1080p HD download", 
      isChinese(locale) ? "兼容新版X平台" : "Compatible with new X platform",
      isChinese(locale) ? "支持批量下载" : "Support batch downloads",
      isChinese(locale) ? "无需登录账号" : "No login required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "15672"
    }
  };

  return (
    <>
      <StructuredData data={structuredData} />
      
      <div className="page-container">
        {/* Hero Section */}
        <div className="section">
          <div className="text-center pt-16 pb-2">
            <h1 className="text-5xl font-bold text-primary mb-2">
              {isChinese(locale) ? '下载 X 平台视频' : 'Download X Platform Videos'}
            </h1>
            <p className="text-4xl text-subtext mb-4">
              {isChinese(locale) ? '支持新版X.com，高清下载' : 'Support New X.com, HD Downloads'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {isChinese(locale) ? '完美兼容Twitter改名后的X平台，继续享受高质量视频下载服务' : 'Perfect compatibility with X platform after Twitter rebrand, continue enjoying high-quality video download service'}
            </p>
          </div>
          <Hero 
            locale={locale} 
            remainApiCount={remainApiCount} 
            onDownload={async (url) => {
              'use server';
              redirect(`/${locale}/downloader?url=${url}`);
            }} 
          />
        </div>

        {/* X平台特色说明 */}
        <div className="section bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '专为X平台优化' : 'Optimized for X Platform'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? 'Twitter改名为X后，我们的服务完全兼容新平台' : 'After Twitter rebranded to X, our service is fully compatible with the new platform'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white dark:text-black font-bold" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '完美兼容X.com' : 'Perfect X.com Compatibility'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '全面支持X.com域名和新版界面，无缝下载体验' : 'Full support for X.com domain and new interface, seamless download experience'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '双域名支持' : 'Dual Domain Support'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '同时支持twitter.com和x.com链接下载' : 'Support both twitter.com and x.com link downloads'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '实时更新' : 'Real-time Updates'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '紧跟X平台更新，确保下载功能稳定可用' : 'Keep up with X platform updates, ensure stable download functionality'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 支持的内容类型 */}
        <div className="section">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '支持的内容类型' : 'Supported Content Types'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '全面支持X平台上的各种媒体内容' : 'Comprehensive support for various media content on X platform'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? 'X视频' : 'X Videos'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '高清MP4视频，支持1080p下载' : 'HD MP4 videos, support 1080p downloads'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-.5 14a2 2 0 002 2h7a2 2 0 002-2L17 4m-4.5 7v5m-3-5v5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? 'GIF动图' : 'GIF Animations'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '保持原始质量的GIF下载' : 'Original quality GIF downloads'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '图片' : 'Images'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '高分辨率图片，支持批量下载' : 'High resolution images, support batch downloads'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '音频' : 'Audio'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '提取视频音频，MP3格式输出' : 'Extract video audio, MP3 format output'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 下载流程 */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '如何下载X平台视频？' : 'How to Download X Platform Videos?'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '简单三步，快速下载X平台内容' : 'Simple 3 steps to quickly download X platform content'}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    {isChinese(locale) ? '复制X平台链接' : 'Copy X Platform Link'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {isChinese(locale) ? '在X平台（x.com）上找到您想要下载的视频、GIF或图片内容，点击分享按钮，复制链接地址。' : 'Find the video, GIF, or image content you want to download on X platform (x.com), click the share button, and copy the link.'}
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>{isChinese(locale) ? '支持格式：' : 'Supported formats:'}</strong> 
                      {isChinese(locale) ? 'https://x.com/username/status/123... 或 https://twitter.com/username/status/123...' : 'https://x.com/username/status/123... or https://twitter.com/username/status/123...'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    {isChinese(locale) ? '粘贴链接解析' : 'Paste Link for Analysis'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {isChinese(locale) ? '将复制的X平台链接粘贴到上方的输入框中，点击"粘贴"按钮或手动输入，系统会自动识别内容类型。' : 'Paste the copied X platform link into the input box above, click the "Paste" button or enter manually, the system will automatically identify the content type.'}
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>{isChinese(locale) ? '智能识别：' : 'Smart Recognition:'}</strong> 
                      {isChinese(locale) ? '自动检测视频、GIF、图片等不同媒体类型' : 'Automatically detect different media types like videos, GIFs, images'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    {isChinese(locale) ? '选择质量下载' : 'Select Quality & Download'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {isChinese(locale) ? '点击"下载"按钮，系统解析完成后会显示可用的下载选项，选择合适的质量和格式，点击下载到本地设备。' : 'Click the "Download" button, after system analysis is complete, available download options will be displayed, select the appropriate quality and format, click to download to local device.'}
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      <strong>{isChinese(locale) ? '质量选项：' : 'Quality Options:'}</strong> 
                      {isChinese(locale) ? '1080p、720p、480p等多种分辨率可选' : '1080p, 720p, 480p and other resolutions available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 为什么选择我们 */}
        <div className="section">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '为什么选择我们的X视频下载器？' : 'Why Choose Our X Video Downloader?'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '完全免费使用' : '100% Free to Use'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '永久免费，无需付费订阅或注册账户' : 'Forever free, no paid subscription or account registration required'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '高速下载服务' : 'High-Speed Download Service'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '全球CDN加速，确保最快的下载速度' : 'Global CDN acceleration ensures fastest download speeds'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '安全可靠' : 'Safe & Reliable'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? 'HTTPS加密传输，保护用户隐私安全' : 'HTTPS encrypted transmission, protect user privacy and security'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '多设备支持' : 'Multi-Device Support'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '支持手机、平板、电脑等各种设备' : 'Support mobile phones, tablets, computers and other devices'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '多格式输出' : 'Multiple Format Output'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '支持MP4、GIF、JPG、MP3等多种格式' : 'Support MP4, GIF, JPG, MP3 and other formats'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '无软件安装' : 'No Software Installation'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '基于网页操作，无需下载安装任何软件' : 'Web-based operation, no need to download and install any software'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '批量下载' : 'Batch Downloads'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '支持同时下载多个视频和图片' : 'Support simultaneous download of multiple videos and images'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isChinese(locale) ? '实时更新维护' : 'Real-time Updates & Maintenance'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {isChinese(locale) ? '跟随X平台更新，确保服务始终可用' : 'Follow X platform updates to ensure service is always available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相关推荐 */}
        <div className="section bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '相关工具推荐' : 'Related Tools Recommendation'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/landing/twitter-video-downloader/`} className="text-blue-600 hover:text-blue-800">
                    {isChinese(locale) ? 'Twitter视频下载器' : 'Twitter Video Downloader'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isChinese(locale) ? '原始的Twitter视频下载工具，支持twitter.com域名，功能全面，下载稳定。' : 'Original Twitter video download tool, supports twitter.com domain, comprehensive features, stable downloads.'}
                </p>
                <div className="flex gap-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                    {isChinese(locale) ? '经典版本' : 'Classic Version'}
                  </span>
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                    {isChinese(locale) ? '稳定可靠' : 'Stable & Reliable'}
                  </span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/landing/twitter-gif-download/`} className="text-blue-600 hover:text-blue-800">
                    {isChinese(locale) ? 'Twitter GIF下载器' : 'Twitter GIF Downloader'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isChinese(locale) ? '专门针对GIF动图优化的下载工具，保持原始质量，支持格式转换。' : 'Download tool specifically optimized for GIF animations, maintain original quality, support format conversion.'}
                </p>
                <div className="flex gap-2">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full">
                    {isChinese(locale) ? 'GIF专用' : 'GIF Specific'}
                  </span>
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-full">
                    {isChinese(locale) ? '高画质' : 'High Quality'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {isChinese(locale) ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <FAQ locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
} 