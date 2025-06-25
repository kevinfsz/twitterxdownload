export default async function sitemap() {
    const baseUrl = 'https://ai-xdownload.xyz';

    // 获取最新推文用于 sitemap
    const tweets = await fetch(`${baseUrl}/api/requestdb?action=all`, {
        cache: 'no-store'
    }).then(res => res.json()).then(data => data.data || []).catch(() => []);

    const staticPages = [
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/zh-CN`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/ja`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/ko`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/fr`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/zh-HK`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/downloader`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/tweets`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        // SEO优化：添加教程页面到sitemap
        {
            url: `${baseUrl}/tutorials/iphone-twitter-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tutorials/mac-twitter-gif-save`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tutorials/chrome-extension-guide`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tutorials/x-video-api-docs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // 多语言版本的教程页面
        {
            url: `${baseUrl}/en/tutorials/iphone-twitter-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/tutorials/mac-twitter-gif-save`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/tutorials/chrome-extension-guide`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/tutorials/x-video-api-docs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/tutorials/iphone-twitter-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/tutorials/mac-twitter-gif-save`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/tutorials/chrome-extension-guide`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/tutorials/x-video-api-docs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // SEO优化：添加着陆页到sitemap
        {
            url: `${baseUrl}/landing/twitter-video-downloader`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/landing/twitter-gif-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/landing/x-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/landing/mobile-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // 多语言版本的着陆页
        {
            url: `${baseUrl}/en/landing/twitter-video-downloader`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/landing/twitter-gif-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/landing/x-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/landing/mobile-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/landing/twitter-video-downloader`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/landing/twitter-gif-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/landing/x-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/zh-CN/landing/mobile-video-download`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // SEO优化：添加新的指南页面到sitemap
        {
            url: `${baseUrl}/en/guides/how-to-download-twitter-videos-hd`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/zh-CN/guides/how-to-download-twitter-videos-hd`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/en/guides/twitter-video-downloader-no-watermark`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/zh-CN/guides/twitter-video-downloader-no-watermark`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/en/guides/download-twitter-videos-iphone`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/zh-CN/guides/download-twitter-videos-iphone`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/en/guides/download-twitter-videos-android`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/zh-CN/guides/download-twitter-videos-android`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        // SEO优化：第四阶段新增高转化页面
        {
            url: `${baseUrl}/en/best-twitter-video-downloader-2024`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.98,
        },
        {
            url: `${baseUrl}/zh-CN/best-twitter-video-downloader-2024`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.98,
        },
        {
            url: `${baseUrl}/en/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/zh-CN/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
    ];

    const tweetPages = tweets.map(tweet => ({
        url: `${baseUrl}/tweets/${tweet.tweet_id}`,
        lastModified: new Date(tweet.post_at || Date.now()),
        changeFrequency: 'never',
        priority: 1.0,
    }));

    return [...staticPages, ...tweetPages];
}

// 导出 sitemap 生成器配置
export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 每天重新生成一次