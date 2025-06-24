// ToolsMenu.js (客户端组件)
"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";
import { getTranslation, isChinese } from "@/lib/i18n";

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

export default function ToolsMenu({ locale = 'en' }) {
    const t = function(key){
        return getTranslation(locale, key);
    }

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <span className="text-md cursor-pointer">{t('Tools')}</span>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Download Tools"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        onAction={(key) => {
            const tool = toolsLinks.find(item => item.key === key);
            if (tool) {
                window.location.href = `/${locale}${tool.path}`;
            }
        }}
      >
        {toolsLinks.map((tool) => (
          <DropdownItem key={tool.key}>
            <div className="flex items-center">
              <div>
                <div>{isChinese(locale) ? tool.nameZh : tool.nameEn}</div>
              </div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
