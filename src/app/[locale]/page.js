import { getTranslation } from '@/lib/i18n';
import HotTweets from '@/app/components/ui/HotTweets';
import FAQ from '@/app/components/ui/FAQ';
import HotCreators from '@/app/components/ui/HotCreators';
import Hero from '@/app/components/ui/Hero';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'

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
            <h3 className="text-2xl font-bold px-2 py-4">{t('Hot Creators')}</h3>
            <HotCreators locale={locale} />
          </div>
          <div className="section">
            <HotTweets locale={locale} />
          </div>
        </>
        )}
        <div className="section">
          <h3 className="text-2xl font-bold px-2 py-4">{t('Download Twitter video and all content')}</h3>
          <div className="px-2">
            <p>
              {t('TwitterXDownload is an online web app to download twitter videos and all content to your computer directly. Twitter videos and Twitter GIFs are embedded in the tweet, so to download twitter videos online, you need to copy the tweet URL/link and paste it in the above text box. Our Twitter X download service will extract the twitter to mp4 link from the tweet and you can save twitter videos to your computer.')}
            </p>
          </div>
        </div>

        {/* 专业工具推荐区域 */}
        <div className="section bg-gray-50 dark:bg-gray-900">
          <div className="px-4 py-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              {locale === 'zh' ? '专业下载工具' : 'Professional Download Tools'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">
                  <a href={`/${locale}/landing/twitter-video-downloader`} className="text-blue-600 hover:text-blue-800">
                    {locale === 'zh' ? 'Twitter视频下载器' : 'Twitter Video Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '专业的Twitter视频下载工具' : 'Professional Twitter video download tool'}
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
                    {locale === 'zh' ? 'Twitter GIF下载' : 'Twitter GIF Download'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '专门下载Twitter GIF动图' : 'Specialized Twitter GIF downloader'}
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
                    {locale === 'zh' ? 'X视频下载器' : 'X Video Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '支持新版X平台视频下载' : 'Support new X platform videos'}
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
                    {locale === 'zh' ? '移动端下载器' : 'Mobile Downloader'}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {locale === 'zh' ? '专为手机用户优化' : 'Optimized for mobile users'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h3 className="text-2xl font-bold px-2 py-4">{t('Frequently Asked Questions')}</h3>
          <FAQ locale={locale} />
        </div>
      </div>
    </>
  );
}