import { getTranslation } from '@/lib/i18n';
import Hero from '@/app/components/ui/Hero';
import FAQ from '@/app/components/ui/FAQ';
import StructuredData from '@/app/components/StructuredData';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'twitter-gif-download',
    locale: locale,
    pathname: `/${locale}/landing/twitter-gif-download/`
  });
}

export default async function TwitterGifDownloadLanding({ params: { locale } }) {
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
    "name": locale === 'zh' ? "Twitter GIF下载器 - TwitterXDownload" : "Twitter GIF Downloader - TwitterXDownload",
    "description": locale === 'zh' 
      ? "专业的Twitter GIF下载工具，支持免费下载推特GIF动图，高质量输出，无需注册。"
      : "Professional Twitter GIF downloader tool for free downloading Twitter GIF animations with high quality output, no registration required.",
    "url": `${baseUrl}/${locale}/landing/twitter-gif-download/`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      locale === 'zh' ? "免费下载Twitter GIF" : "Free Twitter GIF download",
      locale === 'zh' ? "保持原始GIF画质" : "Maintain original GIF quality", 
      locale === 'zh' ? "支持批量下载" : "Support batch downloads",
      locale === 'zh' ? "兼容所有设备" : "Compatible with all devices",
      locale === 'zh' ? "无需安装软件" : "No software installation required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "8436"
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
              {locale === 'zh' ? '下载 Twitter GIF 动图' : 'Download Twitter GIFs'}
            </h1>
            <p className="text-4xl text-subtext mb-8">
              {locale === 'zh' ? '快速保存推特GIF，高质量输出' : 'Save Twitter GIFs Fast, High Quality Output'}
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

        {/* GIF特色功能区 */}
        <div className="section bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '专业的Twitter GIF下载器' : 'Professional Twitter GIF Downloader'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {locale === 'zh' ? '保持原始质量，完美保存Twitter GIF动图' : 'Maintain original quality, perfectly save Twitter GIF animations'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-.5 14a2 2 0 002 2h7a2 2 0 002-2L17 4m-4.5 7v5m-3-5v5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh' ? '保持原画质' : 'Original Quality'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '下载的GIF保持Twitter原始画质' : 'Downloaded GIFs maintain Twitter original quality'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh' ? '秒速下载' : 'Instant Download'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '几秒钟内完成GIF下载' : 'Complete GIF download in seconds'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh' ? '格式支持' : 'Format Support'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '支持GIF、MP4格式输出' : 'Support GIF and MP4 format output'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GIF下载教程 */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '如何下载Twitter GIF？' : 'How to Download Twitter GIFs?'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {locale === 'zh' ? '简单三步，轻松保存Twitter GIF动图' : 'Simple 3 steps to save Twitter GIF animations easily'}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'zh' ? '找到Twitter GIF推文' : 'Find Twitter GIF Tweet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '在Twitter上找到包含GIF动图的推文，复制该推文的链接地址。支持所有Twitter GIF内容。' : 'Find the tweet containing GIF animation on Twitter, copy the tweet link. Support all Twitter GIF content.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'zh' ? '粘贴链接解析' : 'Paste Link for Parsing'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '将Twitter链接粘贴到上方输入框，系统会自动识别和解析GIF内容。' : 'Paste the Twitter link into the input box above, the system will automatically identify and parse the GIF content.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'zh' ? '选择格式下载' : 'Choose Format & Download'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '选择GIF或MP4格式，点击下载按钮即可保存到设备。支持高清质量输出。' : 'Choose GIF or MP4 format, click download button to save to device. Support HD quality output.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GIF使用场景 */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? 'Twitter GIF的使用场景' : 'Twitter GIF Use Cases'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'zh' ? '社交分享' : 'Social Sharing'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '保存有趣的GIF用于其他社交平台分享' : 'Save interesting GIFs for sharing on other social platforms'}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'zh' ? '创作素材' : 'Creative Material'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '收集GIF作为设计和创作的素材' : 'Collect GIFs as materials for design and creation'}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-.5 14a2 2 0 002 2h7a2 2 0 002-2L17 4m-4.5 7v5m-3-5v5" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'zh' ? '内容收藏' : 'Content Collection'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '保存喜欢的GIF动图到本地收藏' : 'Save favorite GIF animations to local collection'}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'zh' ? '表情包制作' : 'Meme Creation'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '下载GIF制作个性化表情包' : 'Download GIFs to create personalized memes'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 技术优势 */}
        <div className="section">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '技术优势' : 'Technical Advantages'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'zh' ? '智能解析技术' : 'Smart Parsing Technology'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '先进的URL解析技术，准确识别Twitter GIF内容，支持各种GIF格式。' : 'Advanced URL parsing technology, accurately identify Twitter GIF content, support various GIF formats.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'zh' ? '安全保障' : 'Security Guarantee'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '采用HTTPS加密传输，保护用户隐私安全，不存储任何用户数据。' : 'Use HTTPS encrypted transmission, protect user privacy and security, do not store any user data.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'zh' ? '高速服务器' : 'High-Speed Servers'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '全球CDN加速，确保快速下载速度，优化用户体验。' : 'Global CDN acceleration, ensure fast download speed, optimize user experience.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'zh' ? '移动端优化' : 'Mobile Optimized'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'zh' ? '完美支持手机和平板设备，响应式设计，随时随地下载GIF。' : 'Perfect support for mobile and tablet devices, responsive design, download GIFs anytime, anywhere.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相关链接 */}
        <div className="section bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '相关教程推荐' : 'Related Tutorial Recommendations'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/tutorials/mac-twitter-gif-save/`} className="text-blue-600 hover:text-blue-800">
                    {locale === 'zh' ? 'Mac保存Twitter GIF完整教程' : 'Complete Guide: Save Twitter GIFs on Mac'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {locale === 'zh' ? '学习如何在Mac电脑上高效保存和管理Twitter GIF动图，包括快捷键和自动化工具使用。' : 'Learn how to efficiently save and manage Twitter GIF animations on Mac, including shortcuts and automation tools.'}
                </p>
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                  {locale === 'zh' ? 'Mac专用' : 'Mac Specific'}
                </span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/landing/twitter-video-downloader/`} className="text-blue-600 hover:text-blue-800">
                    {locale === 'zh' ? 'Twitter视频下载器' : 'Twitter Video Downloader'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {locale === 'zh' ? '不仅支持GIF下载，还可以下载Twitter视频、图片等各种媒体内容，功能更全面。' : 'Not only supports GIF downloads, but also downloads Twitter videos, images and other media content with more comprehensive features.'}
                </p>
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                  {locale === 'zh' ? '全功能' : 'Full Featured'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {locale === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <FAQ locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
} 