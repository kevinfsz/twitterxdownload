// MyNavbar.js (服务端组件)
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { getTranslation, isChinese } from "@/lib/i18n";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher"; // 新的客户端组件
import { ThemeSwitcher } from "./ThemeSwitcher";
import FriendsLink from "./FriendsLink";

export default function MyNavbar({ locale = 'en' }) {
  const t = function(key){
    return getTranslation(locale, key);
  }
  return (
    <Navbar classNames={{
      wrapper: "page-container"
    }}>
      <NavbarBrand>
        <Link href="/" className="text-foreground">
          <Image src="/images/logo.png" alt="TwitterXDownload" width={32} height={32} />
          <p className="font-bold text-inherit mx-3 text-2xl">
            {t('TwitterXDownload')}
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {process.env.NEXT_PUBLIC_SEARCH_ENABLED != 0 && <NavbarItem>
          <Link color="foreground" href="/tweets">
          {t('Search Tweets')}
          </Link>
        </NavbarItem>}
        <NavbarItem>
          <Link color="foreground" href="/downloader">
          {t('Downloader')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" color="foreground" className="p-0 h-auto min-w-0">
                {t('Tools')}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Download Tools">
              <DropdownItem key="twitter-video-downloader">
                <Link href={`/${locale}/landing/twitter-video-downloader`} className="w-full text-foreground">
                  {isChinese(locale) ? 'Twitter视频下载器' : 'Twitter Video Downloader'}
                </Link>
              </DropdownItem>
              <DropdownItem key="twitter-gif-download">
                <Link href={`/${locale}/landing/twitter-gif-download`} className="w-full text-foreground">
                  {isChinese(locale) ? 'Twitter GIF下载' : 'Twitter GIF Download'}
                </Link>
              </DropdownItem>
              <DropdownItem key="x-video-download">
                <Link href={`/${locale}/landing/x-video-download`} className="w-full text-foreground">
                  {isChinese(locale) ? 'X视频下载器' : 'X Video Downloader'}
                </Link>
              </DropdownItem>
              <DropdownItem key="mobile-video-download">
                <Link href={`/${locale}/landing/mobile-video-download`} className="w-full text-foreground">
                  {isChinese(locale) ? '移动端下载' : 'Mobile Downloader'}
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <FriendsLink locale={locale} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <LanguageSwitcher locale={locale} />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
