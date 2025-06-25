'use client';

import { useState, useEffect } from 'react';

// 稳定容器组件，防止内容加载时的布局偏移
export function StableContainer({ 
  children, 
  minHeight = 'auto', 
  className = '',
  reserveSpace = true 
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className={`${className} ${reserveSpace ? 'transition-all duration-300' : ''}`}
      style={{ 
        minHeight: reserveSpace ? minHeight : 'auto',
        opacity: isLoaded ? 1 : 0
      }}
    >
      {children}
    </div>
  );
}

// 预留空间的骨架组件
export function SkeletonLoader({ 
  width = '100%', 
  height = '20px', 
  className = '',
  count = 1,
  rounded = false 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${
            rounded ? 'rounded-full' : 'rounded'
          }`}
          style={{ width, height }}
        />
      ))}
    </div>
  );
}

// 卡片骨架
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      <SkeletonLoader width="60%" height="24px" className="mb-4" />
      <SkeletonLoader count={3} height="16px" className="mb-4" />
      <SkeletonLoader width="40%" height="16px" />
    </div>
  );
}

// 按钮骨架
export function ButtonSkeleton({ className = '' }) {
  return (
    <div className={`${className}`}>
      <SkeletonLoader width="120px" height="40px" rounded />
    </div>
  );
}

// 图片骨架
export function ImageSkeleton({ width, height, className = '' }) {
  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
      style={{ width, height }}
    >
      <div className="flex items-center justify-center h-full">
        <svg 
          className="w-8 h-8 text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
}

// 防止布局偏移的容器
export function NoShiftContainer({ children, className = '' }) {
  return (
    <div className={`will-change-auto ${className}`}>
      {children}
    </div>
  );
}

// 预加载关键资源
export function PreloadCriticalResources() {
  useEffect(() => {
    // 预加载关键字体
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/fonts/inter-var.woff2';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // 预加载关键CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.href = '/styles/critical.css';
    cssLink.as = 'style';
    document.head.appendChild(cssLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(cssLink);
    };
  }, []);

  return null;
} 