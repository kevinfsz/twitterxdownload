 // ErrorHandler.js (客户端组件)
"use client";

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Progress
} from "@heroui/react";
import { RiErrorWarningLine, RiRefreshLine, RiCloseLine, RiInformationLine } from '@remixicon/react';
import { getTranslation } from "@/lib/i18n";

// 错误类型定义
export const ERROR_TYPES = {
  NETWORK: 'network',
  INVALID_URL: 'invalid_url',
  NOT_FOUND: 'not_found',
  RATE_LIMIT: 'rate_limit',
  SERVER_ERROR: 'server_error',
  UNKNOWN: 'unknown'
};

// 错误信息映射
const getErrorMessage = (type, locale) => {
  const t = (key) => getTranslation(locale, key);
  
  const messages = {
    [ERROR_TYPES.NETWORK]: {
      title: t('Network Error'),
      description: t('Please check your internet connection and try again.'),
      suggestion: t('Check your network connection')
    },
    [ERROR_TYPES.INVALID_URL]: {
      title: t('Invalid URL'),
      description: t('Please enter a valid Twitter/X URL.'),
      suggestion: t('Make sure the URL format is correct')
    },
    [ERROR_TYPES.NOT_FOUND]: {
      title: t('Tweet Not Found'),
      description: t('The tweet may have been deleted or made private.'),
      suggestion: t('Try another tweet URL')
    },
    [ERROR_TYPES.RATE_LIMIT]: {
      title: t('Rate Limit Exceeded'),
      description: t('Too many requests. Please wait a moment.'),
      suggestion: t('Wait a few minutes before trying again')
    },
    [ERROR_TYPES.SERVER_ERROR]: {
      title: t('Server Error'),
      description: t('Our servers are experiencing issues.'),
      suggestion: t('Please try again later')
    },
    [ERROR_TYPES.UNKNOWN]: {
      title: t('Unknown Error'),
      description: t('An unexpected error occurred.'),
      suggestion: t('Please try again or contact support')
    }
  };
  
  return messages[type] || messages[ERROR_TYPES.UNKNOWN];
};

// 重试状态组件
export function RetryStatus({ isRetrying, retryCount, maxRetries, locale }) {
  const t = (key) => getTranslation(locale, key);
  
  if (!isRetrying) return null;
  
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex items-center gap-3">
          <RiRefreshLine className="animate-spin" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium">
              {t('Retrying...')} ({retryCount}/{maxRetries})
            </p>
            <Progress 
              value={(retryCount / maxRetries) * 100} 
              className="mt-2"
              color="primary"
              size="sm"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 错误显示组件
export function ErrorDisplay({ error, onRetry, onDismiss, locale }) {
  const t = (key) => getTranslation(locale, key);
  
  if (!error) return null;
  
  const errorInfo = getErrorMessage(error.type, locale);
  
  return (
    <Card className="mb-4 border-danger">
      <CardBody>
        <div className="flex items-start gap-3">
          <RiErrorWarningLine size={24} className="text-danger flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-danger mb-2">
              {errorInfo.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {errorInfo.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <RiInformationLine size={16} />
              <span>{errorInfo.suggestion}</span>
            </div>
            <div className="flex gap-2">
              {onRetry && (
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  startContent={<RiRefreshLine />}
                  onPress={onRetry}
                >
                  {t('Try Again')}
                </Button>
              )}
              {onDismiss && (
                <Button
                  size="sm"
                  variant="light"
                  startContent={<RiCloseLine />}
                  onPress={onDismiss}
                >
                  {t('Dismiss')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 错误模态框组件
export function ErrorModal({ isOpen, error, onClose, onRetry, locale }) {
  const t = (key) => getTranslation(locale, key);
  
  if (!error) return null;
  
  const errorInfo = getErrorMessage(error.type, locale);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex gap-2 items-center">
          <RiErrorWarningLine size={24} className="text-danger" />
          {errorInfo.title}
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {errorInfo.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <RiInformationLine size={16} />
            <span>{errorInfo.suggestion}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {t('Close')}
          </Button>
          {onRetry && (
            <Button color="primary" onPress={onRetry}>
              {t('Try Again')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// 错误处理钩子
export function useErrorHandler(locale) {
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
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
  
  const retry = async (retryFn, maxRetries = 3) => {
    if (retryCount >= maxRetries) {
      handleError(ERROR_TYPES.UNKNOWN);
      return false;
    }
    
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      await retryFn();
      clearError();
      setIsRetrying(false);
      return true;
    } catch (err) {
      setIsRetrying(false);
      handleError(ERROR_TYPES.UNKNOWN, err);
      return false;
    }
  };
  
  return {
    error,
    isRetrying,
    retryCount,
    handleError,
    clearError,
    retry
  };
}