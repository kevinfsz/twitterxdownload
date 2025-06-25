import { getTranslation, isChinese } from '@/lib/i18n';
import Hero from '@/app/components/ui/Hero';
import FAQ from '@/app/components/ui/FAQ';
import StructuredData from '@/app/components/StructuredData';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'twitter-video-downloader',
    locale: locale,
    pathname: `/${locale}/landing/twitter-video-downloader/`
  });
}

export default async function TwitterVideoDownloaderLanding({ params: { locale } }) {
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
    "name": isChinese(locale) ? "推特视频下载器 - TwitterXDownload" : "Twitter Video Downloader - TwitterXDownload",
    "description": isChinese(locale) 
      ? "免费的推特视频下载工具，支持下载Twitter视频、GIF和图片，无需注册，高清质量。"
      : "Free Twitter video downloader tool for downloading Twitter videos, GIFs, and images. No registration required, HD quality.",
    "url": `${baseUrl}/${locale}/landing/twitter-video-downloader/`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      isChinese(locale) ? "免费下载Twitter视频" : "Free Twitter video download",
      isChinese(locale) ? "支持GIF和图片下载" : "GIF and image download support", 
      isChinese(locale) ? "高清质量输出" : "HD quality output",
      isChinese(locale) ? "无需注册" : "No registration required",
      isChinese(locale) ? "跨平台支持" : "Cross-platform support"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12847"
    }
  };

  return (
    <>
      <StructuredData type="software" data={structuredData} />
      
      <div className="page-container">
        {/* Hero Section */}
        <div className="section">
          <Hero 
            locale={locale} 
            remainApiCount={remainApiCount} 
            onDownload={async (url) => {
              'use server';
              redirect(`/${locale}/downloader?url=${url}`);
            }} 
          />
        </div>

        {/* Features Section */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '为什么选择我们的推特视频下载器？' : 'Why Choose Our Twitter Video Downloader?'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '最专业、最可靠的Twitter视频下载解决方案' : 'The most professional and reliable Twitter video download solution'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '快速下载' : 'Fast Download'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '只需复制Twitter链接，几秒钟即可下载视频' : 'Just copy the Twitter link and download videos in seconds'}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '高清质量' : 'HD Quality'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '支持最高1080p高清视频下载' : 'Support up to 1080p HD video downloads'}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isChinese(locale) ? '安全可靠' : 'Safe & Secure'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '无需安装软件，浏览器直接使用' : 'No software installation required, use directly in browser'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '如何下载Twitter视频？' : 'How to Download Twitter Videos?'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {isChinese(locale) ? '简单三步，轻松下载Twitter视频' : 'Simple 3 steps to download Twitter videos easily'}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isChinese(locale) ? '复制Twitter视频链接' : 'Copy Twitter Video Link'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isChinese(locale) ? '在Twitter或X平台上找到您想下载的视频，复制该推文的链接地址。' : 'Find the video you want to download on Twitter or X platform, and copy the tweet link.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isChinese(locale) ? '粘贴到输入框' : 'Paste to Input Box'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isChinese(locale) ? '将复制的链接粘贴到上方的输入框中，点击"粘贴"按钮或手动输入。' : 'Paste the copied link into the input box above, click the "Paste" button or enter manually.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isChinese(locale) ? '点击下载按钮' : 'Click Download Button'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isChinese(locale) ? '点击"下载"按钮，系统会自动解析视频并提供下载选项，选择合适的质量下载即可。' : 'Click the "Download" button, the system will automatically parse the video and provide download options, select the appropriate quality to download.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="section bg-blue-50 dark:bg-blue-900/20">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? 'TwitterXDownload的优势' : 'TwitterXDownload Advantages'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '完全免费' : '100% Free'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '永久免费使用，无隐藏费用' : 'Forever free to use, no hidden costs'}
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '无需注册' : 'No Registration'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '无需创建账户即可使用' : 'Use without creating an account'}
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '支持多格式' : 'Multiple Formats'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '支持MP4、GIF、图片下载' : 'Support MP4, GIF, image downloads'}
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {isChinese(locale) ? '跨平台兼容' : 'Cross-Platform'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '支持手机、平板、电脑使用' : 'Works on mobile, tablet, desktop'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Links Section */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isChinese(locale) ? '相关教程' : 'Related Tutorials'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/tutorials/iphone-twitter-video-download/`} className="text-blue-600 hover:text-blue-800">
                    {isChinese(locale) ? 'iPhone推特视频下载教程' : 'How to Download Twitter Videos on iPhone'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '详细介绍如何在iPhone上下载Twitter视频的完整步骤和技巧。' : 'Complete guide on how to download Twitter videos on iPhone with detailed steps and tips.'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/tutorials/mac-twitter-gif-save/`} className="text-blue-600 hover:text-blue-800">
                    {isChinese(locale) ? 'Mac保存Twitter GIF教程' : 'How to Save Twitter GIFs on Mac'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '学习如何在Mac电脑上轻松保存和下载Twitter GIF动图。' : 'Learn how to easily save and download Twitter GIF animations on Mac computer.'}
                </p>
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