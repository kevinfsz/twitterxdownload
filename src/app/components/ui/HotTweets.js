import { Chip } from "@heroui/react";
import { getTranslation } from "@/lib/i18n";
import { TweetListSkeleton, EmptyState } from './LoadingStates';
import { RiFileTextLine } from '@remixicon/react';
import TweetCard from './TweetCard';
import { headers } from 'next/headers'

export default async function HotTweets({ locale = 'en' }) {
    const t = function (key) {
        return getTranslation(locale, key);
    }

    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const baseUrl = `${protocol}://${host}`
    let totalCount = 0;
    let tweets = [[], [], []];
    
    try {
        const tweetsResp = await fetch(`${baseUrl}/api/requestdb?action=recent`,{
            cache: 'no-store'
        });
        const tweetsData = await tweetsResp.json();
        
        console.log('HotTweets Component Debug:');
        console.log('API Response:', tweetsData);
        console.log('Success:', tweetsData?.success);
        console.log('Count:', tweetsData?.count);
        console.log('Data length:', tweetsData?.data?.length);
        
        if (tweetsData?.success) {
            totalCount = tweetsData?.count || 0;
            const tweetsArray = tweetsData?.data || [];

            tweetsArray.forEach((tweet, index) => {
                tweets[index % 3].push({
                    ...tweet,
                    tweet_media: tweet.tweet_media ? tweet.tweet_media.split(',') : []
                });
            });
        } else {
            console.error('API returned error:', tweetsData?.error);
            totalCount = 0;
            tweets = [[], [], []];
        }
    } catch (error) {
        console.error('Failed to fetch tweets:', error);
        totalCount = 0;
        tweets = [[], [], []];
    }

    return (
        <>
            <div className="text-2xl font-bold px-2 py-4 flex">
                <div>{t('Hot Tweets')}</div>
                <Chip color="primary" size="sm" variant="flat" className="ml-2 mt-1">{totalCount}</Chip>
            </div>
            <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
                {tweets.map((row, index) => (
                    <div key={index} className="md:w-1/3 w-full flex flex-col gap-5">
                        {row.map((tweet) => (
                            <TweetCard locale={locale} key={tweet.tweet_id} tweet={tweet} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}