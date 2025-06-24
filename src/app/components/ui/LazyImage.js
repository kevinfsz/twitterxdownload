 // LazyImage.js (客户端组件)
"use client";

import { useState, useRef, useEffect } from 'react';
import { Skeleton } from "@heroui/react";
import { RiImageLine, RiErrorWarningLine } from '@remixicon/react';

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  placeholder = true,
  fallback = null,
  onLoad,
  onError,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // 创建 Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px' // 提前50px开始加载
      }
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleLoad = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(e);
  };

  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
    ...props.style
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={imageStyle}
    >
      {/* 加载状态 */}
      {isLoading && placeholder && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full">
            <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
              <RiImageLine size={32} className="text-gray-400" />
            </div>
          </Skeleton>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {fallback || (
            <div className="text-center text-gray-500">
              <RiErrorWarningLine size={32} className="mx-auto mb-2" />
              <p className="text-sm">Failed to load image</p>
            </div>
          )}
        </div>
      )}

      {/* 实际图片 */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${hasError ? 'hidden' : ''}`}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
}

// 预设的图片组件变体
export function AvatarImage({ src, alt, size = 48, ...props }) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${props.className || ''}`}
      {...props}
    />
  );
}

export function TweetMediaImage({ src, alt, ...props }) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={`rounded-lg object-cover ${props.className || ''}`}
      placeholder={true}
      {...props}
    />
  );
}