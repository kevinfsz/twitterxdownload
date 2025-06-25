import { getTranslation, isChinese } from '@/lib/i18n';
import HotTweets from '@/app/components/ui/HotTweets';
import FAQ from '@/app/components/ui/FAQ';
import HotCreators from '@/app/components/ui/HotCreators';
import StructuredData from '@/app/components/seo/StructuredData';
import Hero from '@/app/components/ui/Hero';
import { redirect } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo';
import { headers } from 'next/headers'

// 动态生成SEO元数据
export async function generateMetadata({ params }) {
  const locale = params?.locale || 'en';
  
  return generateSEOMetadata({
    page: 'homepage',
    locale: locale,
    pathname: `/${locale}`
  });
}

export default async function Home({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  }
  
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  
  const baseUrl = `${protocol}://${host}`
  const remainApiResp = await fetch(`${baseUrl}/api/remains`,{
    cache: 'no-store'
  });
  const remainApiCountData = await remainApiResp.json();
  const remainApiCount = remainApiCountData.data;

  return (
    <>
      <StructuredData locale={locale} pageType="homepage" />
      <div className="page-container">
        <div className="section">
          <Hero locale={locale} remainApiCount={remainApiCount} onDownload={async (url) => {
            'use server';
            redirect(`/downloader?url=${url}`);
          }} />
        </div>
        {process.env.NEXT_PUBLIC_HOME_LISTING != 0 && (
        <>
          <div className="section">
            <h2 className="text-3xl font-bold px-2 py-4">{t('Featured Content Creators')}</h2>
            <HotCreators locale={locale} />
          </div>
          <div className="section">
            <HotTweets locale={locale} />
          </div>
        </>
        )}
        <div className="section">
          <h2 className="text-3xl font-bold px-2 py-6">{t('How to Download Twitter Videos - 3 Easy Steps')}</h2>
          <div className="px-2 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">{t('Copy Twitter URL')}</h3>
                <p className="text-sm text-gray-600">{t('Copy the Twitter post URL containing the video you want to download')}</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">{t('Paste & Click Download')}</h3>
                <p className="text-sm text-gray-600">{t('Paste the URL in our tool and click the download button')}</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">{t('Save Video')}</h3>
                <p className="text-sm text-gray-600">{t('Choose quality and save the Twitter video to your device')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="text-3xl font-bold px-2 py-4">{t('Key Features & Benefits')}</h2>
          <div className="px-2 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('Free & No Registration')}</h3>
                    <p className="text-sm text-gray-600">{t('Download Twitter videos completely free without creating an account')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('HD Quality Downloads')}</h3>
                    <p className="text-sm text-gray-600">{t('Download Twitter videos in original HD quality without watermarks')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('All Devices Supported')}</h3>
                    <p className="text-sm text-gray-600">{t('Works perfectly on iPhone, Android, PC, Mac and all browsers')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('Fast & Secure')}</h3>
                    <p className="text-sm text-gray-600">{t('Lightning-fast downloads with secure HTTPS encryption')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('Multiple Formats')}</h3>
                    <p className="text-sm text-gray-600">{t('Support MP4, GIF and image formats from Twitter posts')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('No Software Installation')}</h3>
                    <p className="text-sm text-gray-600">{t('Browser-based tool - no apps or software installation required')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 专业工具推荐区域 */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isChinese(locale) ? '专业下载工具' : 'Professional Download Tools'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">
                  <a href={`/${locale}/landing/twitter-video-downloader`} className="text-blue-600 hover:text-blue-800">
                    {isChinese(locale) ? 'Twitter视频下载器' : 'Twitter Video Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '专业的Twitter视频下载工具' : 'Professional Twitter video download tool'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-.5 14a2 2 0 002 2h7a2 2 0 002-2L17 4m-4.5 7v5m-3-5v5" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">
                  <a href={`/${locale}/landing/twitter-gif-download`} className="text-purple-600 hover:text-purple-800">
                    {isChinese(locale) ? 'Twitter GIF下载' : 'Twitter GIF Download'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '专门下载Twitter GIF动图' : 'Specialized Twitter GIF downloader'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white dark:text-black font-bold" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">
                  <a href={`/${locale}/landing/x-video-download`} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                    {isChinese(locale) ? 'X视频下载器' : 'X Video Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '支持新版X平台视频下载' : 'Support new X platform videos'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">
                  <a href={`/${locale}/landing/mobile-video-download`} className="text-green-600 hover:text-green-800">
                    {isChinese(locale) ? '移动端下载器' : 'Mobile Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isChinese(locale) ? '专为手机用户优化' : 'Optimized for mobile users'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h2 className="text-3xl font-bold px-2 py-4">{t('Frequently Asked Questions')}</h2>
          <FAQ locale={locale} />
        </div>
      </div>
    </>
  );
}