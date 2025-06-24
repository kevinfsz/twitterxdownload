'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTranslation, locales } from '@/lib/i18n';
import Hero from '@/app/components/ui/Hero';
import { useState, useEffect } from 'react';
import { Link,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,Button, Drawer, DrawerContent, DrawerBody, DrawerHeader, useDisclosure } from '@heroui/react';
import RePublishPanel from '@/app/components/ui/RePublishPanel';
import { RiArrowDropDownLine } from "@remixicon/react";
import { parseTweetData } from '@/lib/parser';
import TweetCard from '@/app/components/ui/TweetCard';
import { translate } from '@/lib/translator';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import { useErrorHandler, ErrorDisplay, RetryStatus, ERROR_TYPES } from '@/app/components/ui/ErrorHandler';
import { DownloadProgress, PageLoading } from '@/app/components/ui/LoadingStates';
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
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const router = useRouter();
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

    const t = function (key) {
        return getTranslation(locale, key);
    }

    useEffect(() => {
        if(url) {
            setIsLoading(true);
            fetchTweet(url);
        }
        fetchRemainApiCount();
    }, []);

    const fetchRemainApiCount = async () => {
        const response = await fetch('/api/remains');
        const data = await response.json();
        setRemainApiCount(data.data);
    }

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

        const tempTweets = [...tweets];
        for(let i = 0; i < tempTweets.length; i++){
            const tweet = tempTweets[i];
            const translatedText = await translate(tweet.tweet_text, targetLang);

            tempTweets[i].tweet_text = translatedText;
        }
        setTweets(tempTweets);
    }

    const handleDeleteTweet = async (index) => {
        const confirmed = await ConfirmModal.show({
            title: t('Warning'),
            description: t('Are you sure you want to delete this tweet?'),
            cancelText: t('Cancel'),
            confirmText: t('Confirm')
        });
        if(!confirmed) return;
        
        const tempTweets = [...tweets];
        tempTweets.splice(index, 1);
        setTweets(tempTweets);
    }

    const handleInsertTweet = (index) => {
        const tempTweets = [...tweets];
        tempTweets.splice(index+1, 0, {
            name: "name",
            screen_name: "screen_name",
            profile_image: "",
            tweet_text: "",
            tweet_media: [],
            medias_info: []
        });
        setTweets(tempTweets);
    }

    const handleAddMedia = (index) => {

        if(tweets[index].tweet_media.length >= 4) {
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.jpg,.jpeg,.png,.mp4';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if(!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const tempTweets = [...tweets];
                tempTweets[index].tweet_media.push(e.target.result);
                tempTweets[index].medias_info.push({});
                setTweets(tempTweets);
            }
            reader.readAsDataURL(file);
        }
        
        input.click();
    }

    const handleDeleteMedia = async (index, mediaIndex) => {
        const confirmed = await ConfirmModal.show({
            title: t('Warning'),
            description: t('Are you sure you want to delete this media?'),
            cancelText: t('Cancel'),
            confirmText: t('Confirm')
        });
        if(!confirmed) return;

        const tempTweets = [...tweets];
        tempTweets[index].tweet_media.splice(mediaIndex, 1);
        tempTweets[index].medias_info.splice(mediaIndex, 1);
        setTweets(tempTweets);
    }

    const handleUpdateText = (index, text) => {
        const tempTweets = [...tweets];
        tempTweets[index].tweet_text = text;
        setTweets(tempTweets);
    }    

    return (
        <div className="page-container">
            <Drawer isOpen={isOpen} isDismissable={false} hideCloseButton={true} size="md" radius="none" onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="text-medium font-semibold">{t('Re-Publish')}</div>
                    </DrawerHeader>
                    <DrawerBody>
                        <RePublishPanel locale={locale} tweets={tweets} onClose={()=>{
                            onOpenChange(false);
                        }} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div></div>
                <div className="">
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
                        onDownload={(url) => {
                            setIsLoading(true);
                            fetchTweet(url);
                        }}
                    />
                </div>
                <div></div>
            </div>
            <div className="flex gap-4 justify-center items-start">
                { tweetData && originTweets.length > 0 && (
                    <>
                        <div className="w-1/3 md:block hidden box-border border-foreground/10 border-[1px] rounded-2xl p-8 bg-[#f8f8f8] dark:bg-foreground/5">
                            <div className="text-medium font-semibold flex items-center">
                                <div className="flex-1">{t('Parse Result')}</div>
                                <Button href={`/tweets/${originTweets[0].id_str}`} target="_blank" as={Link} color="primary" size="sm" radius="full">
                                    {t('Goto Article')}
                                </Button>
                            </div>
                            <div className="w-full h-[1px] bg-foreground/10 mt-3"/>
                            <div className="w-full mt-3">
                                {originTweets.map((tweet, index) => (
                                    <div key={index} className="w-full overflow-hidden border-[1px] border-foreground/10 py-2 mb-2 whitespace-nowrap">
                                        <div>{tweet.text}</div>
                                        {
                                            tweet.medias.map((media,index) => {
                                                return <div key={index}>[{media.type}] {media.url}</div>
                                            })
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full box-border border-foreground/10 border-[1px] rounded-2xl p-8 bg-[#f8f8f8] dark:bg-foreground/5">
                            <div className="text-medium font-semibold flex items-center">
                                <div className="flex-1">{t('Tweets Editor')}</div>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button disableRipple variant="flat" color="primary" radius="full" size="sm" className="pl-5 mr-3">
                                            {t('Translate to')}
                                            <RiArrowDropDownLine className="w-4 h-4" />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Action event example" 
                                    onAction={(key) => {translateTweet(key)}}>
                                        {Object.entries(locales).map(([key, locale]) => (
                                            <DropdownItem key={key}>
                                                {locale.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Button onPress={onOpen} color="primary" size="sm" radius="full" asChild>
                                    {t('Re-Publish')}
                                </Button>
                            </div>
                            <div className="w-full h-[1px] bg-foreground/10 mt-3"/>
                            <div className="w-full mt-3">
                                {tweets.map((tweet, index) => {
                                    return <TweetCard key={index} tweet={tweet} locale={locale} enableEdit={true} onDeleteTweet={() => handleDeleteTweet(index)} onInsertTweet={() => handleInsertTweet(index)} onAddMedia={() => handleAddMedia(index)} onDeleteMedia={(mediaIndex) => handleDeleteMedia(index, mediaIndex)} onUpdateText={(text) => handleUpdateText(index, text)} className="mb-2 cursor-auto select-text"/>
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}