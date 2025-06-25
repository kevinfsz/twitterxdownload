import { getTranslation } from '@/lib/i18n';
import Hero from '@/app/components/ui/Hero';
import FAQ from '@/app/components/ui/FAQ';
import StructuredData from '@/app/components/StructuredData';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }) {
  return generateSEOMetadata({
    page: 'mobile-video-download',
    locale: locale,
    pathname: `/${locale}/landing/mobile-video-download/`
  });
}

export default async function MobileVideoDownloadLanding({ params: { locale } }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  const baseUrl = `${protocol}://${host}`;
  const remainApiResp = await fetch(`${baseUrl}/api/remains`, { cache: 'no-store' });
  const remainApiCountData = await remainApiResp.json();
  const remainApiCount = remainApiCountData.data;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": locale === 'zh' ? "手机Twitter视频下载器" : "Mobile Twitter Video Downloader",
    "description": locale === 'zh' 
      ? "专为手机用户优化的Twitter视频下载工具，支持iOS和Android设备。"
      : "Twitter video download tool optimized for mobile users, supports iOS and Android devices.",
    "url": `${baseUrl}/${locale}/landing/mobile-video-download/`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": ["iOS", "Android"],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <StructuredData data={structuredData} />
      
      <div className="page-container">
        {/* Hero Section */}
        <div className="section">
          <div className="text-center pt-16 pb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {locale === 'zh' ? '手机下载 Twitter 视频' : 'Mobile Twitter Video Download'}
            </h1>
            <p className="text-2xl md:text-3xl text-subtext mb-8">
              {locale === 'zh' ? '专为移动设备优化' : 'Optimized for Mobile Devices'}
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

        {/* 移动端特色 */}
        <div className="section bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '移动端专属优势' : 'Mobile-Exclusive Advantages'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh' ? '触摸友好界面' : 'Touch-Friendly Interface'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '专为手机触摸操作设计，大按钮，易点击' : 'Designed for mobile touch operations, large buttons, easy to tap'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh' ? '快速加载' : 'Fast Loading'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '针对移动网络优化，快速加载和下载' : 'Optimized for mobile networks, fast loading and downloads'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 支持设备 */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '支持所有移动设备' : 'Support All Mobile Devices'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <h3 className="font-semibold">iPhone/iPad</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">iOS 12+</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.18 9.08c0 .77-.18 1.5-.53 2.16l-5.5 10.5c-.35.66-.86 1.01-1.53 1.01-.67 0-1.18-.35-1.53-1.01L8.37 11.24c-.35-.66-.53-1.39-.53-2.16 0-1.63.8-3.05 2.16-3.77l5.5-2.9c.4-.21.85-.21 1.26 0l5.5 2.9c1.36.72 2.16 2.14 2.16 3.77z"/>
                  </svg>
                </div>
                <h3 className="font-semibold">Android</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Android 8+</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold">{locale === 'zh' ? '平板设备' : 'Tablets'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{locale === 'zh' ? '全尺寸支持' : 'All sizes'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 相关教程 */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '移动端教程' : 'Mobile Tutorials'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/tutorials/iphone-twitter-video-download/`} className="text-blue-600 hover:text-blue-800">
                    {locale === 'zh' ? 'iPhone下载教程' : 'iPhone Download Tutorial'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '详细的iPhone下载Twitter视频步骤指导' : 'Detailed iPhone Twitter video download guide'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  <a href={`/${locale}/landing/twitter-gif-download/`} className="text-blue-600 hover:text-blue-800">
                    {locale === 'zh' ? 'GIF下载工具' : 'GIF Download Tool'}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '专门的GIF下载和保存工具' : 'Specialized GIF download and save tool'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {locale === 'zh' ? '常见问题' : 'FAQ'}
            </h2>
            <FAQ locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
} 