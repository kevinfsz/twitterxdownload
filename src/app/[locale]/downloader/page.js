 // 下载器页面 - 服务端组件
import DownloaderClient from '@/app/components/ui/DownloaderClient';
import { generateSEOMetadata } from '@/lib/seo';

// 动态生成SEO元数据
export async function generateMetadata({ params }) {
  const locale = params?.locale || 'en';
  
  return generateSEOMetadata({
    page: 'downloader',
    locale: locale,
    pathname: `/${locale}/downloader`
  });
}

export default function Downloader({ params: { locale } }) {
  return <DownloaderClient locale={locale} />;
}