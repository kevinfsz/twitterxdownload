 // PWAInstaller.js (客户端组件)
"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { RiDownloadLine, RiCloseLine, RiSmartphoneLine, RiAppsLine } from '@remixicon/react';
import { getTranslation } from "@/lib/i18n";

export default function PWAInstaller({ locale = 'en' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const t = (key) => getTranslation(locale, key);

  useEffect(() => {
    // 检查是否已安装
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      if (window.navigator.standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    // 监听安装提示事件
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // 延迟显示安装提示
      setTimeout(() => {
        if (!localStorage.getItem('pwa-install-dismissed')) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };

    // 监听应用安装事件
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    checkInstalled();
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // 如果没有原生安装提示，显示手动安装说明
      setShowInstructions(true);
      return;
    }

    try {
      const result = await deferredPrompt.prompt();
      console.log('PWA install result:', result);
      
      if (result.outcome === 'accepted') {
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('PWA install error:', error);
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // 如果已安装，不显示任何内容
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* 安装提示卡片 */}
      {showInstallPrompt && (
        <Card className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <RiAppsLine size={24} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">
                  {t('Install App')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {t('Install TwitterXDownload for faster access and offline use.')}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    onPress={handleInstallClick}
                    startContent={<RiDownloadLine size={16} />}
                  >
                    {t('Install')}
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleDismiss}
                    startContent={<RiCloseLine size={16} />}
                  >
                    {t('Later')}
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 手动安装说明模态框 */}
      <Modal isOpen={showInstructions} onClose={() => setShowInstructions(false)}>
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <RiSmartphoneLine size={24} />
            {t('Install Instructions')}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('Chrome/Edge (Android)')}</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-600 dark:text-gray-400">
                  <li>{t('Tap the menu button (⋮)')}</li>
                  <li>{t('Select "Add to Home screen"')}</li>
                  <li>{t('Tap "Add" to confirm')}</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{t('Safari (iOS)')}</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-600 dark:text-gray-400">
                  <li>{t('Tap the share button')}</li>
                  <li>{t('Scroll down and tap "Add to Home Screen"')}</li>
                  <li>{t('Tap "Add" to confirm')}</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{t('Chrome (Desktop)')}</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-600 dark:text-gray-400">
                  <li>{t('Click the install icon in the address bar')}</li>
                  <li>{t('Or go to Settings > Install TwitterXDownload')}</li>
                </ol>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setShowInstructions(false)}>
              {t('Got it')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}