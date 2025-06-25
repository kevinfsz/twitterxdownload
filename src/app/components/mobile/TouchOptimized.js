'use client';

import { useState, useEffect } from 'react';

// 触摸友好的按钮组件
export function TouchButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...props 
}) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm min-h-[40px]', // 至少40px高度，符合触摸标准
    medium: 'px-6 py-3 text-base min-h-[44px]', // 44px是移动端推荐最小触摸目标
    large: 'px-8 py-4 text-lg min-h-[48px]'
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} rounded-lg`}
      onClick={onClick}
      disabled={disabled}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        touchAction: 'manipulation' // 防止双击缩放
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// 移动端优化的输入框
export function TouchInput({ 
  className = '', 
  type = 'text',
  placeholder,
  value,
  onChange,
  ...props 
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] ${className}`}
      style={{ 
        fontSize: '16px', // 防止iOS缩放
        touchAction: 'manipulation'
      }}
      {...props}
    />
  );
}

// 移动端友好的卡片组件
export function TouchCard({ 
  children, 
  onClick, 
  className = '',
  hoverable = false 
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-150 ${
        hoverable ? 'hover:shadow-lg cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      onTouchStart={() => hoverable && setIsPressed(true)}
      onTouchEnd={() => hoverable && setIsPressed(false)}
      onMouseDown={() => hoverable && setIsPressed(true)}
      onMouseUp={() => hoverable && setIsPressed(false)}
      onMouseLeave={() => hoverable && setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </div>
  );
}

// 移动端导航组件
export function MobileNav({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* 背景遮罩 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          style={{ touchAction: 'none' }}
        />
      )}
      
      {/* 侧边栏 */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <TouchButton 
            onClick={onClose}
            variant="secondary"
            size="small"
            className="ml-auto"
          >
            ✕
          </TouchButton>
        </div>
        <div className="p-4 overflow-y-auto h-full pb-20">
          {children}
        </div>
      </div>
    </>
  );
}

// 移动端优化的表格
export function MobileTable({ headers, data, renderRow }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isDesktop) {
    // 桌面端显示常规表格
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {headers.map((header, index) => (
                <th key={index} className="text-left p-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                {renderRow(row, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 移动端显示卡片式布局
  return (
    <div className="space-y-4">
      {data.map((row, index) => (
        <TouchCard key={index} className="p-4">
          {headers.map((header, headerIndex) => (
            <div key={headerIndex} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                {header}
              </span>
              <span className="text-right">
                {renderRow(row, index)[headerIndex]}
              </span>
            </div>
          ))}
        </TouchCard>
      ))}
    </div>
  );
}

// 移动端友好的标签页
export function MobileTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <TouchButton
            key={index}
            onClick={() => onTabChange(index)}
            variant={activeTab === index ? 'primary' : 'secondary'}
            size="small"
            className={`flex-shrink-0 mr-2 mb-2 ${
              activeTab === index 
                ? 'border-b-2 border-blue-500 bg-transparent text-blue-600' 
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </TouchButton>
        ))}
      </div>
    </div>
  );
} 