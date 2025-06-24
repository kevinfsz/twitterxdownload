 // LoadingStates.js (客户端组件)
"use client";

import {
  Card,
  CardBody,
  Skeleton,
  Progress,
  Spinner
} from "@heroui/react";
import { RiDownloadLine, RiLoader4Line } from '@remixicon/react';
import { getTranslation } from "@/lib/i18n";

// 骨架屏 - 推文卡片
export function TweetCardSkeleton() {
  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
            <Skeleton className="h-20 w-full rounded mt-3" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-8 w-20 rounded" />
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 骨架屏 - 推文列表
export function TweetListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <TweetCardSkeleton key={index} />
      ))}
    </div>
  );
}

// 骨架屏 - 热门创作者
export function CreatorCardSkeleton() {
  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 下载进度组件
export function DownloadProgress({ 
  progress, 
  status, 
  fileName, 
  locale 
}) {
  const t = (key) => getTranslation(locale, key);
  
  const statusMessages = {
    'fetching': t('Fetching tweet data...'),
    'processing': t('Processing media files...'),
    'downloading': t('Downloading...'),
    'complete': t('Download complete!'),
    'error': t('Download failed')
  };
  
  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <RiDownloadLine size={20} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">{fileName}</p>
            <p className="text-xs text-gray-500">{statusMessages[status]}</p>
          </div>
        </div>
        <Progress 
          value={progress} 
          className="mb-2"
          color={status === 'error' ? 'danger' : 'primary'}
        />
        <p className="text-xs text-gray-500 text-right">{progress}%</p>
      </CardBody>
    </Card>
  );
}

// 页面加载组件
export function PageLoading({ message, locale }) {
  const t = (key) => getTranslation(locale, key);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="lg" color="primary" />
      <p className="text-gray-600 dark:text-gray-400">
        {message || t('Loading...')}
      </p>
    </div>
  );
}

// 按钮加载状态
export function LoadingButton({ 
  isLoading, 
  children, 
  loadingText,
  locale,
  ...props 
}) {
  const t = (key) => getTranslation(locale, key);
  
  return (
    <button
      disabled={isLoading}
      className={`
        relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${props.className || ''}
      `}
      {...props}
    >
      {isLoading && (
        <RiLoader4Line className="animate-spin" size={16} />
      )}
      {isLoading ? (loadingText || t('Loading...')) : children}
    </button>
  );
}

// 搜索加载状态
export function SearchLoading({ locale }) {
  const t = (key) => getTranslation(locale, key);
  
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <Spinner size="sm" />
        <span className="text-gray-600 dark:text-gray-400">
          {t('Searching...')}
        </span>
      </div>
    </div>
  );
}

// 空状态组件
export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  locale 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && <Icon size={48} className="text-gray-400 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      {action}
    </div>
  );
}

// 网络状态指示器
export function NetworkStatus({ isOnline, locale }) {
  const t = (key) => getTranslation(locale, key);
  
  if (isOnline) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-danger text-white text-center py-2 z-50">
      <p className="text-sm">{t('No internet connection')}</p>
    </div>
  );
}