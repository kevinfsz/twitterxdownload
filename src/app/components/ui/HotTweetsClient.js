 // HotTweetsClient.js (客户端组件)
"use client";

import { useState, useEffect } from 'react';
import { Chip } from "@heroui/react";
import { getTranslation } from "@/lib/i18n";
import { TweetListSkeleton, EmptyState } from './LoadingStates';
import { useErrorHandler, ErrorDisplay, ERROR_TYPES } from './ErrorHandler';
import { RiFileTextLine, RiRefreshLine } from '@remixicon/react';
import TweetCard from './TweetCard';

export default function HotTweetsClient({ locale = 'en' }) {
    const [tweets, setTweets] = useState([[], [], []]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler(locale);

    const t = function (key) {
        return getTranslation(locale, key);
    }

    const fetchTweets = async () => {
        try {
            setIsLoading(true);
            clearError();
            
            const response = await fetch('/api/requestdb?action=recent', {
                cache: 'no-store'
            });
            
            if (!response.ok) {
                if (response.status === 500) {
                    handleError(ERROR_TYPES.SERVER_ERROR);
                } else {
                    handleError(ERROR_TYPES.NETWORK);
                }
                return;
            }
            
            const data = await response.json();
            
            console.log('HotTweetsClient Debug:', data);
            
            if (data?.success) {
                setTotalCount(data?.count || 0);
                const tweetsArray = data?.data || [];
                
                const newTweets = [[], [], []];
                tweetsArray.forEach((tweet, index) => {
                    newTweets[index % 3].push({
                        ...tweet,
                        tweet_media: tweet.tweet_media ? tweet.tweet_media.split(',') : []
                    });
                });
                setTweets(newTweets);
            } else {
                handleError(ERROR_TYPES.SERVER_ERROR);
                setTweets([[], [], []]);
                setTotalCount(0);
            }
        } catch (err) {
            console.error('Failed to fetch tweets:', err);
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                handleError(ERROR_TYPES.NETWORK);
            } else {
                handleError(ERROR_TYPES.UNKNOWN, err);
            }
            setTweets([[], [], []]);
            setTotalCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const handleRetry = () => {
        fetchTweets();
    };

    // 如果正在加载，显示骨架屏
    if (isLoading) {
        return (
            <div className="pb-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {t('Hot Tweets')}
                        <div className="animate-pulse">
                            <div className="h-6 w-12 bg-gray-300 rounded"></div>
                        </div>
                    </h2>
                </div>
                <TweetListSkeleton count={6} />
            </div>
        );
    }

    // 如果有错误，显示错误信息
    if (error) {
        return (
            <div className="pb-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {t('Hot Tweets')}
                        <Chip color="danger" size="sm">0</Chip>
                    </h2>
                </div>
                <ErrorDisplay 
                    error={error}
                    onRetry={handleRetry}
                    onDismiss={clearError}
                    locale={locale}
                />
            </div>
        );
    }

    // 如果没有数据，显示空状态
    if (totalCount === 0) {
        return (
            <div className="pb-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {t('Hot Tweets')}
                        <Chip color="default" size="sm">0</Chip>
                    </h2>
                </div>
                <EmptyState
                    icon={RiFileTextLine}
                    title={t('No tweets found')}
                    description={t('There are no recent downloads to display. Try downloading some tweets first!')}
                    action={
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <RiRefreshLine size={16} />
                            {t('Refresh')}
                        </button>
                    }
                    locale={locale}
                />
            </div>
        );
    }

    // 正常显示推文
    return (
        <div className="pb-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {t('Hot Tweets')}
                    <Chip color="primary" size="sm">{totalCount}</Chip>
                </h2>
                <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                    title={t('Refresh')}
                >
                    <RiRefreshLine size={16} />
                    {t('Refresh')}
                </button>
            </div>
            
            <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
                {tweets.map((column, index) => (
                    <div key={index} className="md:w-1/3 w-full flex flex-col gap-5">
                        {column.map((tweet, tweetIndex) => (
                            <TweetCard
                                key={`${tweet.tweet_id}-${tweetIndex}`}
                                tweet={tweet}
                                locale={locale}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}