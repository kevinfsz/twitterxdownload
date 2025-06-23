import { getTranslation } from '@/lib/i18n';
import { Link,Chip } from '@heroui/react';

export default function MyFooter({ locale = 'en' }) {
    const t = function(key){
        return getTranslation(locale, key);
    }
    return (
        <div className="page-container p-10 flex justify-between">
            <div className="flex flex-col gap-2 w-full md:w-1/3">
                <div className="flex items-center gap-1">
                    <p className="text-xl font-bold mb-2 w-fit">{t('TwitterXDownload')}</p>
                    <Link href="#" target="_blank"><Chip color="danger" size="sm" variant="flat" className="ml-2 -mt-1.5">v{process.env.APP_VERSION}</Chip></Link>
                </div>
                <p className="text-sm text-gray-500 mb-7">{t('The fastest and most reliable Twitter video downloader. Free to use, no registration required.')}</p>
                <p className="text-sm text-gray-500">© 2024 <a href="https://ai-xdownload.xyz" target="_blank">TwitterXDownload</a> {t('All rights reserved.')}</p>
            </div>
            <div className="hidden md:flex flex-col gap-4">
                <div>
                    <p className="font-bold mb-2">{t('Download Tools')}</p>
                    <ul className="flex flex-col gap-1">
                        <li><Link href={`/${locale}/landing/twitter-video-downloader`} className="text-sm hover:text-primary">{locale === 'zh' ? 'Twitter视频下载器' : 'Twitter Video Downloader'}</Link></li>
                        <li><Link href={`/${locale}/landing/twitter-gif-download`} className="text-sm hover:text-primary">{locale === 'zh' ? 'Twitter GIF下载' : 'Twitter GIF Download'}</Link></li>
                        <li><Link href={`/${locale}/landing/x-video-download`} className="text-sm hover:text-primary">{locale === 'zh' ? 'X视频下载器' : 'X Video Downloader'}</Link></li>
                        <li><Link href={`/${locale}/landing/mobile-video-download`} className="text-sm hover:text-primary">{locale === 'zh' ? '移动端下载' : 'Mobile Downloader'}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
                <div>
                    <p className="font-bold mb-2">{t('Other Links')}</p>
                    <ul className="flex flex-col gap-1">
                        <li><Link href="/about-us" className="text-sm hover:text-primary">{t('About Us')}</Link></li>
                        <li><Link href="/privacy-policy" className="text-sm hover:text-primary">{t('Privacy Policy')}</Link></li>
                        <li><Link href="/terms-of-service" className="text-sm hover:text-primary">{t('Terms of Service')}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
                <div>
                    <p className="font-bold mb-2">{t('Contact Us')}</p>    
                    <Link href="mailto:support@twitterxdownload.com" className="text-sm hover:text-primary">support@twitterxdownload.com</Link>
                </div>
            </div>
        </div>
    )
}