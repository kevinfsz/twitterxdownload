 // MobileMenu.js (客户端组件)
"use client";

import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Link,
  Divider
} from "@heroui/react";
import { RiMenuLine, RiCloseLine, RiDownloadLine, RiSearchLine, RiToolsLine, RiGlobalLine } from '@remixicon/react';
import { getTranslation, isChinese } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

const toolsLinks = [
    {
      key: "twitter-video-downloader",
      nameZh: "Twitter视频下载器",
      nameEn: "Twitter Video Downloader",
      path: "/landing/twitter-video-downloader"
    },
    {
      key: "twitter-gif-download", 
      nameZh: "Twitter GIF下载",
      nameEn: "Twitter GIF Download",
      path: "/landing/twitter-gif-download"
    },
    {
      key: "x-video-download",
      nameZh: "X视频下载器", 
      nameEn: "X Video Downloader",
      path: "/landing/x-video-download"
    },
    {
      key: "mobile-video-download",
      nameZh: "移动端下载",
      nameEn: "Mobile Downloader", 
      path: "/landing/mobile-video-download"
    }
];

export default function MobileMenu({ locale = 'en' }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const t = function(key){
        return getTranslation(locale, key);
    }

    return (
        <>
            <Button
                isIconOnly
                variant="light"
                className="md:hidden"
                onPress={() => setIsOpen(true)}
            >
                <RiMenuLine size={24} />
            </Button>

            <Drawer 
                isOpen={isOpen} 
                onOpenChange={setIsOpen}
                placement="left"
                size="sm"
            >
                <DrawerContent>
                    <DrawerHeader className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{t('Menu')}</h2>
                            <Button
                                isIconOnly
                                variant="light"
                                onPress={() => setIsOpen(false)}
                            >
                                <RiCloseLine size={20} />
                            </Button>
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className="flex flex-col gap-4">
                            {/* 主要导航 */}
                            <div className="flex flex-col gap-2">
                                <Link 
                                    href={`/${locale}/downloader`}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onPress={() => setIsOpen(false)}
                                >
                                    <RiDownloadLine size={20} />
                                    <span>{t('Downloader')}</span>
                                </Link>

                                {process.env.NEXT_PUBLIC_SEARCH_ENABLED != 0 && (
                                    <Link 
                                        href={`/${locale}/tweets`}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onPress={() => setIsOpen(false)}
                                    >
                                        <RiSearchLine size={20} />
                                        <span>{t('Search Tweets')}</span>
                                    </Link>
                                )}
                            </div>

                            <Divider />

                            {/* 工具菜单 */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 p-3">
                                    <RiToolsLine size={20} />
                                    <span className="font-medium">{t('Tools')}</span>
                                </div>
                                {toolsLinks.map((tool) => (
                                    <Link
                                        key={tool.key}
                                        href={`/${locale}${tool.path}`}
                                        className="flex items-center gap-3 p-3 pl-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onPress={() => setIsOpen(false)}
                                    >
                                        <span className="text-sm">{isChinese(locale) ? tool.nameZh : tool.nameEn}</span>
                                    </Link>
                                ))}
                            </div>

                            <Divider />

                            {/* 设置选项 */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3">
                                        <RiGlobalLine size={20} />
                                        <span>{t('Language')}</span>
                                    </div>
                                    <LanguageSwitcher locale={locale} />
                                </div>
                                
                                <div className="flex items-center justify-between p-3">
                                    <span>{t('Theme')}</span>
                                    <ThemeSwitcher />
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}