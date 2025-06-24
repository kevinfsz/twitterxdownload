// DownloaderClient.js - 客户端下载器组件
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDisclosure } from "@heroui/react";
import { getTranslation } from '@/lib/i18n';
import { translate } from '@/lib/translator';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import { useErrorHandler, ErrorDisplay, RetryStatus, ERROR_TYPES } from '@/app/components/ui/ErrorHandler';
import { DownloadProgress, PageLoading } from '@/app/components/ui/LoadingStates';
import Hero from '@/app/components/ui/Hero';
import TweetCard from '@/app/components/ui/TweetCard';

export default function DownloaderClient({ locale }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const [isLoading, setIsLoading] = useState(false);
    const [remainApiCount, setRemainApiCount] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    // 错误处理
    const { error, isRetrying, retryCount, handleError, clearError, retry } = useErrorHandler(locale);
    
    // 下载进度
    const [downloadProgress, setDownloadProgress] = useState(null);

    const [tweetData, setTweetData] = useState(null);
    const [originTweets, setOriginTweets] = useState([]);
    const [tweets, setTweets] = useState([]);
    
    // 其他状态变量...
    const [selectedTweetIndex, setSelectedTweetIndex] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [translatedTweets, setTranslatedTweets] = useState([]);

    const t = function (key) {
        return getTranslation(locale, key);
    }

    const fetchRemainApiCount = async () => {
        try {
            const response = await fetch('/api/remains');
            const data = await response.json();
            setRemainApiCount(data.data || 0);
        } catch (error) {
            console.error('Failed to fetch API count:', error);
        }
    };

    const parseLocalTweetData = (data) => {
        const tweets = [];
        
        if (data.legacy) {
            const legacy = data.legacy;
            const medias = [];
            
            if (legacy.entities && legacy.entities.media) {
                legacy.entities.media.forEach((media) => {
                    if (media.type === 'photo') {
                        medias.push({
                            type: 'photo',
                            url: media.media_url_https,
                            preview_url: media.media_url_https
                        });
                    } else if (media.type === 'video' || media.type === 'animated_gif') {
                        const variants = media.video_info?.variants || [];
                        const mp4Variant = variants
                            .filter(v => v.content_type === 'video/mp4')
                            .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
                        
                        if (mp4Variant) {
                            medias.push({
                                type: media.type,
                                url: mp4Variant.url,
                                preview_url: media.media_url_https
                            });
                        }
                    }
                });
            }
            
            tweets.push({
                text: legacy.full_text || legacy.text || '',
                medias: medias
            });
        }
        
        return tweets;
    };

    const fetchTweet = async (url) => {
        try {
            clearError();
            setIsLoading(true);
            setDownloadProgress({ progress: 10, status: 'fetching', fileName: 'Tweet data' });
            
            // 验证URL格式
            const twitterUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;
            if (!twitterUrlPattern.test(url)) {
                handleError(ERROR_TYPES.INVALID_URL);
                return;
            }
            
            const tweet_id = url.match(/status\/(\d{19})/)?.[1] || url.split('/').pop();
            if (!tweet_id) {
                handleError(ERROR_TYPES.INVALID_URL);
                return;
            }
            
            setDownloadProgress({ progress: 30, status: 'fetching', fileName: 'Tweet data' });
            
            const response = await fetch(`/api/requestx?tweet_id=${tweet_id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    handleError(ERROR_TYPES.NOT_FOUND);
                } else if (response.status === 429) {
                    handleError(ERROR_TYPES.RATE_LIMIT);
                } else if (response.status >= 500) {
                    handleError(ERROR_TYPES.SERVER_ERROR);
                } else {
                    handleError(ERROR_TYPES.NETWORK);
                }
                return;
            }
            
            const data = await response.json();
            setDownloadProgress({ progress: 60, status: 'processing', fileName: 'Tweet data' });
            
            if (!data.success) {
                // 根据错误消息确定错误类型
                if (data.message?.includes('not found')) {
                    handleError(ERROR_TYPES.NOT_FOUND);
                } else if (data.message?.includes('rate limit')) {
                    handleError(ERROR_TYPES.RATE_LIMIT);
                } else {
                    handleError(ERROR_TYPES.SERVER_ERROR);
                }
                return;
            }
            
            setDownloadProgress({ progress: 80, status: 'processing', fileName: 'Tweet data' });
            
            setTweetData(data.data);
            const tempOriginTweets = parseLocalTweetData(data.data);
            setOriginTweets(tempOriginTweets);

            const tempTweets = tempOriginTweets.map((tweet) => {
                return {
                    name: "name",
                    screen_name: "screen_name",
                    profile_image: "",
                    tweet_text: tweet.text,
                    tweet_media: tweet.medias.map((media) => media.url),
                    medias_info: tweet.medias
                }
            });
            setTweets(tempTweets);
            
            setDownloadProgress({ progress: 100, status: 'complete', fileName: 'Tweet data' });
            
            // 延迟隐藏进度条
            setTimeout(() => {
                setDownloadProgress(null);
            }, 1500);
            
            fetchRemainApiCount();
            router.replace(`/downloader?url=${url}`);
            
        } catch (err) {
            console.error('Fetch tweet error:', err);
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                handleError(ERROR_TYPES.NETWORK);
            } else {
                handleError(ERROR_TYPES.UNKNOWN, err);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // 重试函数
    const handleRetry = () => {
        if (url) {
            retry(() => fetchTweet(url));
        }
    };

    const translateTweet = async (targetLang) => {
        if (tweets.length === 0) return;
        
        try {
            setIsLoading(true);
            const results = await Promise.all(
                tweets.map(async (tweet) => {
                    const translatedText = await translate(tweet.tweet_text, targetLang);
                    return {
                        ...tweet,
                        tweet_text: translatedText
                    };
                })
            );
            setTranslatedTweets(results);
        } catch (error) {
            console.error('Translation failed:', error);
            handleError(ERROR_TYPES.SERVER_ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadMedia = (mediaUrl, filename) => {
        const link = document.createElement('a');
        link.href = mediaUrl;
        link.download = filename || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadConfirm = () => {
        const tweet = tweets[selectedTweetIndex];
        if (tweet && tweet.medias_info && tweet.medias_info[selectedMediaIndex]) {
            const media = tweet.medias_info[selectedMediaIndex];
            const filename = `twitter_${Date.now()}.${media.type === 'photo' ? 'jpg' : 'mp4'}`;
            downloadMedia(media.url, filename);
        }
    };

    useEffect(() => {
        if (url) {
            fetchTweet(url);
        }
        fetchRemainApiCount();
    }, [url]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {/* 错误显示 */}
                    <ErrorDisplay 
                        error={error}
                        onRetry={handleRetry}
                        onDismiss={clearError}
                        locale={locale}
                    />
                    
                    {/* 重试状态 */}
                    <RetryStatus 
                        isRetrying={isRetrying}
                        retryCount={retryCount}
                        maxRetries={3}
                        locale={locale}
                    />
                    
                    {/* 下载进度 */}
                    {downloadProgress && (
                        <div className="mb-4">
                            <DownloadProgress 
                                progress={downloadProgress.progress}
                                status={downloadProgress.status}
                                fileName={downloadProgress.fileName}
                                locale={locale}
                            />
                        </div>
                    )}
                    
                    <Hero
                        locale={locale}
                        downloadButtonLabel="Fetch"
                        downloadButtonIsLoading={isLoading || isRetrying}
                        remainApiCount={remainApiCount}
                        url={url}
                        onFetch={fetchTweet}
                    />
                </div>
                
                <div className="lg:w-1/3">
                    {tweets.length > 0 && (
                        <div className="space-y-4">
                            {tweets.map((tweet, index) => (
                                <TweetCard
                                    key={index}
                                    tweet={tweet}
                                    locale={locale}
                                    onDownload={(mediaIndex) => {
                                        setSelectedTweetIndex(index);
                                        setSelectedMediaIndex(mediaIndex);
                                        onOpen();
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onConfirm={handleDownloadConfirm}
                title="Download Confirmation"
                message="Are you sure you want to download this media?"
                locale={locale}
            />
        </div>
    );
}