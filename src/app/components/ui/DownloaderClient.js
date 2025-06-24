// DownloaderClient.js - 客户端下载器组件
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

export default function DownloaderClient({ locale }) {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [remainApiCount, setRemainApiCount] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [tweetData, setTweetData] = useState(null);
    const [originTweets, setOriginTweets] = useState([]);
    const [tweets, setTweets] = useState([]);
    
    // 添加进度显示状态
    const [downloadProgress, setDownloadProgress] = useState(null);

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

    let retryTimes = 0;
    const fetchTweet = async (url) => {
        // 开始显示进度
        setDownloadProgress({ progress: 10, status: 'fetching', fileName: 'Tweet data' });
        
        const tweet_id = url.match(/status\/(\d{19})/)?.[1] || url.split('/').pop();
        
        // 更新进度
        setDownloadProgress({ progress: 30, status: 'fetching', fileName: 'Tweet data' });
        
        const response = await fetch(`/api/requestx?tweet_id=${tweet_id}`);
        const data = await response.json();
        
        // 更新进度
        setDownloadProgress({ progress: 60, status: 'processing', fileName: 'Tweet data' });

        if(!data.success){
            // 如果请求失败,最多重试3次
            // 每次重试的间隔时间需要随机在 1000-1500ms 之间
            if(retryTimes < 3){
                setDownloadProgress({ progress: 20, status: 'retrying', fileName: `Retry ${retryTimes + 1}/3` });
                setTimeout(() => {
                    console.log("retry fetch " + (retryTimes+1));
                    fetchTweet(url);
                    retryTimes++;
                }, 1000 + Math.random() * 500);
            }else{
                retryTimes = 0;
                setIsLoading(false);
                setDownloadProgress({ progress: 100, status: 'error', fileName: 'Failed to fetch tweet' });
                // 3秒后隐藏错误提示
                setTimeout(() => {
                    setDownloadProgress(null);
                }, 3000);
            }
            return;
        }

        // 更新进度
        setDownloadProgress({ progress: 80, status: 'processing', fileName: 'Tweet data' });

        setIsLoading(false);
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
        console.log(tempTweets);

        // 完成进度
        setDownloadProgress({ progress: 100, status: 'complete', fileName: 'Tweet data loaded' });
        
        // 延迟隐藏进度条
        setTimeout(() => {
            setDownloadProgress(null);
        }, 1500);

        fetchRemainApiCount();

        router.replace(`/${locale}/downloader?url=${url}`);
    }

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 transition-colors duration-500">
            <Drawer isOpen={isOpen} isDismissable={false} hideCloseButton={true} size="md" radius="none" onOpenChange={onOpenChange}>
                <DrawerContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                    <DrawerHeader className="border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('Re-Publish')}</div>
                    </DrawerHeader>
                    <DrawerBody className="p-6">
                        <RePublishPanel locale={locale} tweets={tweets} onClose={()=>{
                            onOpenChange(false);
                        }} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            
            {/* 主要内容区域 */}
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col gap-8 justify-center items-center max-w-6xl mx-auto">
                <div></div>
                <div className="">
                    <Hero
                        locale={locale}
                        downloadButtonLabel="Fetch"
                        downloadButtonIsLoading={isLoading}
                        remainApiCount={remainApiCount}
                        url={url}
                        onDownload={(url) => {
                            setIsLoading(true);
                            fetchTweet(url);
                        }}
                    />
                </div>
                
                {/* 精美进度显示组件 */}
                {downloadProgress && (
                    <div className="w-full max-w-lg mx-auto mb-6 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20 transition-all duration-500 animate-in slide-in-from-top-4">
                        {/* 状态图标和标题 */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                downloadProgress.status === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                                downloadProgress.status === 'complete' ? 'bg-green-100 dark:bg-green-900/30' :
                                'bg-blue-100 dark:bg-blue-900/30'
                            } transition-colors duration-300`}>
                                {downloadProgress.status === 'error' ? (
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : downloadProgress.status === 'complete' ? (
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <div className="w-5 h-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg leading-tight">{downloadProgress.fileName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {downloadProgress.status === 'fetching' ? t('Fetching tweet data...') :
                                     downloadProgress.status === 'processing' ? t('Processing content...') :
                                     downloadProgress.status === 'retrying' ? t('Retrying connection...') :
                                     downloadProgress.status === 'complete' ? t('Successfully completed!') :
                                     downloadProgress.status === 'error' ? t('An error occurred') :
                                     downloadProgress.status
                                    }
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`text-2xl font-bold ${
                                    downloadProgress.status === 'error' ? 'text-red-600 dark:text-red-400' :
                                    downloadProgress.status === 'complete' ? 'text-green-600 dark:text-green-400' :
                                    'text-blue-600 dark:text-blue-400'
                                } transition-colors duration-300`}>
                                    {downloadProgress.progress}%
                                </span>
                            </div>
                        </div>
                        
                        {/* 现代化进度条 */}
                        <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out ${
                                    downloadProgress.status === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                    downloadProgress.status === 'complete' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                    'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                                } shadow-lg`}
                                style={{ width: `${downloadProgress.progress}%` }}
                            >
                                {/* 进度条光泽效果 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                            </div>
                            
                            {/* 进度条背景纹理 */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/10 to-transparent"></div>
                        </div>
                        
                        {/* 底部装饰线 */}
                        <div className="mt-4 flex justify-center">
                            <div className={`w-12 h-1 rounded-full ${
                                downloadProgress.status === 'error' ? 'bg-red-200 dark:bg-red-800' :
                                downloadProgress.status === 'complete' ? 'bg-green-200 dark:bg-green-800' :
                                'bg-blue-200 dark:bg-blue-800'
                            } transition-colors duration-300`}></div>
                        </div>
                    </div>
                )}
                
                </div>
            </div>
            
            {/* 内容展示区域 */}
            <div className="container mx-auto px-4">
                <div className="flex gap-6 justify-center items-start max-w-7xl mx-auto">
                { tweetData && originTweets.length > 0 && (
                    <>
                        <div className="w-1/3 md:block hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30">
                            <div className="flex items-center mb-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('Parse Result')}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">解析的推文内容</p>
                                </div>
                                <Button href={`/${locale}/tweets/${originTweets[0].id_str}`} target="_blank" as={Link} color="primary" size="sm" radius="full" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
                                    {t('Goto Article')}
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {originTweets.map((tweet, index) => (
                                    <div key={index} className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-gray-700/80">
                                        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed line-clamp-3">{tweet.text}</div>
                                        {tweet.medias.length > 0 && (
                                            <div className="mt-3 space-y-1">
                                                {tweet.medias.map((media,mediaIndex) => (
                                                    <div key={mediaIndex} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            media.type === 'photo' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                            'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                                        }`}>
                                                            {media.type}
                                                        </span>
                                                        <span className="truncate">{media.url.substring(0, 40)}...</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30">
                            <div className="flex items-center mb-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('Tweets Editor')}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">编辑推文内容并重新发布</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button 
                                                disableRipple 
                                                variant="flat" 
                                                radius="full" 
                                                size="sm" 
                                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg border-0"
                                            >
                                                {t('Translate to')}
                                                <RiArrowDropDownLine className="w-4 h-4" />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Translation options" className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl"
                                        onAction={(key) => {translateTweet(key)}}>
                                            {Object.entries(locales).map(([key, locale]) => (
                                                <DropdownItem key={key} className="hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg">
                                                    {locale.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Button 
                                        onPress={onOpen} 
                                        radius="full" 
                                        size="sm" 
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg border-0"
                                    >
                                        {t('Re-Publish')}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {tweets.map((tweet, index) => {
                                    return <TweetCard key={index} tweet={tweet} locale={locale} enableEdit={true} onDeleteTweet={() => handleDeleteTweet(index)} onInsertTweet={() => handleInsertTweet(index)} onAddMedia={() => handleAddMedia(index)} onDeleteMedia={(mediaIndex) => handleDeleteMedia(index, mediaIndex)} onUpdateText={(text) => handleUpdateText(index, text)} className="mb-2 cursor-auto select-text"/>
                                })}
                            </div>
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}