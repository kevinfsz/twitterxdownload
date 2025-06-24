// DownloaderClient.js - 客户端下载器组件
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDisclosure } from "@heroui/react";
import { getTranslation } from '@/lib/i18n';
import { parseTweetData } from '@/lib/parser';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
// 暂时移除复杂的错误处理导入，使用简化版本
import Hero from '@/app/components/ui/Hero';
import TweetCard from '@/app/components/ui/TweetCard';

export default function DownloaderClient({ locale }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const [isLoading, setIsLoading] = useState(false);
    const [remainApiCount, setRemainApiCount] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    // 简化的错误处理
    const [error, setError] = useState(null);
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    
    // 下载进度
    const [downloadProgress, setDownloadProgress] = useState(null);

    const [tweetData, setTweetData] = useState(null);
    const [originTweets, setOriginTweets] = useState([]);
    const [tweets, setTweets] = useState([]);
    
    // 其他状态变量
    const [selectedTweetIndex, setSelectedTweetIndex] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [translatedTweets, setTranslatedTweets] = useState([]);

    const t = function (key) {
        return getTranslation(locale, key);
    };

    const handleError = (errorType, originalError = null) => {
        console.error('Error occurred:', { errorType, originalError });
        setError({
            type: errorType,
            originalError,
            timestamp: new Date().toISOString()
        });
    };

    const clearError = () => {
        setError(null);
        setRetryCount(0);
    };

    const fetchRemainApiCount = async () => {
        try {
            const response = await fetch('/api/remains');
            const data = await response.json();
            setRemainApiCount(data.data || 0);
        } catch (error) {
            console.error('Failed to fetch API count:', error);
        }
    };

    const fetchTweet = async (url) => {
        try {
            clearError();
            setIsLoading(true);
            setDownloadProgress({ progress: 10, status: 'fetching', fileName: 'Tweet data' });
            
            // 验证URL格式
            const twitterUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;
            if (!twitterUrlPattern.test(url)) {
                handleError('invalid_url');
                return;
            }
            
            const tweet_id = url.match(/status\/(\d{19})/)?.[1] || url.split('/').pop();
            if (!tweet_id) {
                handleError('invalid_url');
                return;
            }
            
            setDownloadProgress({ progress: 30, status: 'fetching', fileName: 'Tweet data' });
            
            const response = await fetch(`/api/requestx?tweet_id=${tweet_id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    handleError('not_found');
                } else if (response.status === 429) {
                    handleError('rate_limit');
                } else if (response.status >= 500) {
                    handleError('server_error');
                } else {
                    handleError('network');
                }
                return;
            }
            
            const data = await response.json();
            setDownloadProgress({ progress: 60, status: 'processing', fileName: 'Tweet data' });
            
            if (!data.success) {
                // 根据错误消息确定错误类型
                if (data.message?.includes('not found')) {
                    handleError('not_found');
                } else if (data.message?.includes('rate limit')) {
                    handleError('rate_limit');
                } else {
                    handleError('server_error');
                }
                return;
            }
            
            setDownloadProgress({ progress: 80, status: 'processing', fileName: 'Tweet data' });
            
            setTweetData(data.data);
            const tempOriginTweets = parseTweetData(data.data);
            setOriginTweets(tempOriginTweets);

            const tempTweets = tempOriginTweets.map((tweet) => {
                return {
                    name: "name",
                    screen_name: "screen_name",
                    profile_image: "",
                    tweet_text: tweet.text,
                    tweet_media: tweet.medias.map((media) => media.url),
                    medias_info: tweet.medias
                };
            });
            setTweets(tempTweets);
            
            setDownloadProgress({ progress: 100, status: 'complete', fileName: 'Tweet data' });
            
            // 延迟隐藏进度条
            setTimeout(() => {
                setDownloadProgress(null);
            }, 1500);
            
            fetchRemainApiCount();
            router.replace(`/downloader?url=${encodeURIComponent(url)}`);
            
        } catch (err) {
            console.error('Fetch tweet error:', err);
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                handleError('network');
            } else {
                handleError('unknown', err);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // 重试函数
    const handleRetry = () => {
        if (url && retryCount < 3) {
            setIsRetrying(true);
            setRetryCount(prev => prev + 1);
            fetchTweet(url).finally(() => {
                setIsRetrying(false);
            });
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
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadConfirm = () => {
        const tweet = tweets[selectedTweetIndex];
        if (tweet && tweet.medias_info && tweet.medias_info[selectedMediaIndex]) {
            const media = tweet.medias_info[selectedMediaIndex];
            const extension = media.type === 'photo' ? 'jpg' : 'mp4';
            const filename = `twitter_${Date.now()}.${extension}`;
            downloadMedia(media.url, filename);
        }
    };

    useEffect(() => {
        fetchRemainApiCount();
        if (url) {
            fetchTweet(url);
        }
    }, [url]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {/* 错误显示 */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <h4 className="font-bold">{t('Error')}</h4>
                            <p>{t('An error occurred')}: {error.type}</p>
                            <button 
                                onClick={handleRetry}
                                disabled={retryCount >= 3}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {t('Try Again')} ({retryCount}/3)
                            </button>
                            <button 
                                onClick={clearError}
                                className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                {t('Dismiss')}
                            </button>
                        </div>
                    )}
                    
                    {/* 重试状态 */}
                    {isRetrying && (
                        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                            <p>{t('Retrying...')} ({retryCount}/3)</p>
                            <div className="w-full bg-blue-200 rounded-full h-2.5 mt-2">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full animate-pulse" 
                                    style={{ width: `${(retryCount / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                    
                    {/* 下载进度 */}
                    {downloadProgress && (
                        <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded">
                            <p className="font-medium">{downloadProgress.fileName}</p>
                            <p className="text-sm text-gray-600">{t('Status')}: {downloadProgress.status}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${downloadProgress.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 text-right mt-1">{downloadProgress.progress}%</p>
                        </div>
                    )}
                    
                    <Hero
                        locale={locale}
                        downloadButtonLabel="Fetch"
                        downloadButtonIsLoading={isLoading || isRetrying}
                        remainApiCount={remainApiCount}
                        url={url}
                        onDownload={fetchTweet}
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