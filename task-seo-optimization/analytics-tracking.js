/**
 * SEO着陆页 Google Analytics 事件追踪实现
 * 用于追踪用户行为和转化数据
 */

class SEOAnalytics {
  constructor() {
    this.isGA4Available = typeof gtag !== 'undefined';
    this.pageLoadTime = Date.now();
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
    this.timeOnPage = 0;
    
    this.init();
  }

  /**
   * 初始化追踪功能
   */
  init() {
    if (!this.isGA4Available) {
      console.warn('Google Analytics 4 not available');
      return;
    }

    // 页面加载事件
    this.trackPageLoad();
    
    // 滚动深度追踪
    this.initScrollTracking();
    
    // 时间追踪
    this.initTimeTracking();
    
    // 链接点击追踪
    this.initLinkTracking();
    
    // 页面离开追踪
    this.initExitTracking();
  }

  /**
   * 追踪页面加载
   */
  trackPageLoad() {
    const landingPageType = this.getLandingPageType();
    const pageLanguage = this.getPageLanguage();
    
    gtag('event', 'landing_page_view', {
      'custom_map': {
        'custom_parameter_1': 'landing_page_type',
        'custom_parameter_2': 'page_language'
      },
      'landing_page_type': landingPageType,
      'page_language': pageLanguage,
      'page_title': document.title,
      'page_location': window.location.href,
      'timestamp': new Date().toISOString()
    });

    // 发送到 Google Analytics 4
    gtag('config', 'GA_MEASUREMENT_ID', {
      'custom_map': {
        'custom_parameter_1': 'landing_page_type',
        'custom_parameter_2': 'page_language'
      }
    });
  }

  /**
   * 获取着陆页类型
   */
  getLandingPageType() {
    const path = window.location.pathname;
    
    if (path.includes('twitter-video-downloader')) return 'twitter_video';
    if (path.includes('twitter-gif-download')) return 'twitter_gif';
    if (path.includes('x-video-download')) return 'x_video';
    if (path.includes('mobile-video-download')) return 'mobile_video';
    
    return 'unknown';
  }

  /**
   * 获取页面语言
   */
  getPageLanguage() {
    const path = window.location.pathname;
    
    if (path.startsWith('/zh/')) return 'zh';
    if (path.startsWith('/en/')) return 'en';
    
    return 'default';
  }

  /**
   * 初始化滚动深度追踪
   */
  initScrollTracking() {
    let ticking = false;
    
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      this.scrollDepth = Math.round((scrollTop / docHeight) * 100);
      
      if (this.scrollDepth > this.maxScrollDepth) {
        this.maxScrollDepth = this.scrollDepth;
        
        // 发送滚动里程碑事件
        const milestones = [25, 50, 75, 90];
        milestones.forEach(milestone => {
          if (this.maxScrollDepth >= milestone && !this[`scrolled_${milestone}`]) {
            this[`scrolled_${milestone}`] = true;
            this.trackScrollMilestone(milestone);
          }
        });
      }
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    });
  }

  /**
   * 追踪滚动里程碑
   */
  trackScrollMilestone(percentage) {
    gtag('event', 'scroll_depth', {
      'event_category': 'engagement',
      'event_label': `${percentage}%`,
      'value': percentage,
      'landing_page_type': this.getLandingPageType()
    });
  }

  /**
   * 初始化时间追踪
   */
  initTimeTracking() {
    // 每30秒发送一次时间追踪事件
    setInterval(() => {
      this.timeOnPage = Math.round((Date.now() - this.pageLoadTime) / 1000);
      
      if (this.timeOnPage % 30 === 0 && this.timeOnPage > 0) {
        this.trackTimeOnPage();
      }
    }, 30000);

    // 2分钟深度参与事件
    setTimeout(() => {
      gtag('event', 'deep_engagement', {
        'event_category': 'engagement',
        'event_label': '2_minutes',
        'landing_page_type': this.getLandingPageType()
      });
    }, 120000);
  }

  /**
   * 追踪页面停留时间
   */
  trackTimeOnPage() {
    gtag('event', 'time_on_page', {
      'event_category': 'engagement',
      'event_label': `${this.timeOnPage}_seconds`,
      'value': this.timeOnPage,
      'scroll_depth': this.maxScrollDepth
    });
  }

  /**
   * 初始化链接点击追踪
   */
  initLinkTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a');
      
      if (!target) return;
      
      const href = target.href;
      const linkText = target.textContent.trim();
      const linkType = this.getLinkType(href, target);
      
      // 追踪所有链接点击
      this.trackLinkClick(href, linkText, linkType);
      
      // 特殊追踪：工具页面链接
      if (this.isToolLink(href)) {
        this.trackToolLinkClick(href, linkText);
      }
      
      // 特殊追踪：下载按钮
      if (this.isDownloadButton(target)) {
        this.trackDownloadButton(href, linkText);
      }
    });
  }

  /**
   * 获取链接类型
   */
  getLinkType(href, element) {
    if (href.includes('/downloader')) return 'tool_page';
    if (href.includes('/landing/')) return 'landing_page';
    if (href.includes('/tutorials/')) return 'tutorial';
    if (href.startsWith('mailto:')) return 'email';
    if (!href.includes(window.location.hostname)) return 'external';
    
    return 'internal';
  }

  /**
   * 判断是否为工具链接
   */
  isToolLink(href) {
    return href.includes('/downloader') || 
           href.includes('download') ||
           href.includes('tool');
  }

  /**
   * 判断是否为下载按钮
   */
  isDownloadButton(element) {
    const text = element.textContent.toLowerCase();
    const className = element.className.toLowerCase();
    
    return text.includes('download') || 
           text.includes('下载') ||
           className.includes('download') ||
           className.includes('btn-primary');
  }

  /**
   * 追踪链接点击
   */
  trackLinkClick(href, linkText, linkType) {
    gtag('event', 'link_click', {
      'event_category': 'navigation',
      'event_label': linkText,
      'link_url': href,
      'link_type': linkType,
      'source_page': window.location.pathname
    });
  }

  /**
   * 追踪工具链接点击 (重要转化事件)
   */
  trackToolLinkClick(href, linkText) {
    gtag('event', 'tool_link_click', {
      'event_category': 'conversion',
      'event_label': linkText,
      'link_url': href,
      'source_landing_page': this.getLandingPageType(),
      'time_to_click': Math.round((Date.now() - this.pageLoadTime) / 1000)
    });

    // 标记为转化事件
    gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
      'value': 1.0,
      'currency': 'USD'
    });
  }

  /**
   * 追踪下载按钮点击
   */
  trackDownloadButton(href, linkText) {
    gtag('event', 'download_attempt', {
      'event_category': 'conversion',
      'event_label': 'download_button_click',
      'download_type': this.getLandingPageType(),
      'source_landing_page': window.location.pathname,
      'user_engagement_score': this.calculateEngagementScore()
    });
  }

  /**
   * 计算用户参与度评分
   */
  calculateEngagementScore() {
    let score = 0;
    
    // 时间得分 (最大30分)
    score += Math.min(this.timeOnPage / 4, 30);
    
    // 滚动得分 (最大30分)
    score += (this.maxScrollDepth / 100) * 30;
    
    // 互动得分 (点击到达此函数说明有互动，+40分)
    score += 40;
    
    return Math.round(score);
  }

  /**
   * 初始化页面离开追踪
   */
  initExitTracking() {
    window.addEventListener('beforeunload', () => {
      const finalTimeOnPage = Math.round((Date.now() - this.pageLoadTime) / 1000);
      const engagementScore = this.calculateEngagementScore();
      
      // 发送页面离开事件
      gtag('event', 'page_exit', {
        'event_category': 'engagement',
        'time_on_page': finalTimeOnPage,
        'max_scroll_depth': this.maxScrollDepth,
        'engagement_score': engagementScore,
        'exit_type': 'beforeunload'
      });
    });

    // 追踪页面隐藏 (用户切换标签等)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gtag('event', 'page_hidden', {
          'event_category': 'engagement',
          'time_on_page': Math.round((Date.now() - this.pageLoadTime) / 1000),
          'scroll_depth': this.maxScrollDepth
        });
      }
    });
  }

  /**
   * 手动发送自定义事件
   */
  trackCustomEvent(eventName, parameters = {}) {
    gtag('event', eventName, {
      'landing_page_type': this.getLandingPageType(),
      'page_language': this.getPageLanguage(),
      ...parameters
    });
  }

  /**
   * 追踪表单提交 (如果有的话)
   */
  trackFormSubmit(formName, formData = {}) {
    gtag('event', 'form_submit', {
      'event_category': 'conversion',
      'form_name': formName,
      'landing_page_type': this.getLandingPageType(),
      ...formData
    });
  }

  /**
   * 追踪搜索行为 (如果有搜索功能)
   */
  trackSearch(searchTerm, resultCount = 0) {
    gtag('event', 'search', {
      'search_term': searchTerm,
      'result_count': resultCount,
      'source_page': window.location.pathname
    });
  }

  /**
   * 获取当前追踪状态
   */
  getTrackingStatus() {
    return {
      timeOnPage: this.timeOnPage,
      maxScrollDepth: this.maxScrollDepth,
      engagementScore: this.calculateEngagementScore(),
      landingPageType: this.getLandingPageType(),
      pageLanguage: this.getPageLanguage()
    };
  }
}

// 自动初始化追踪
document.addEventListener('DOMContentLoaded', () => {
  window.seoAnalytics = new SEOAnalytics();
  
  // 在控制台显示追踪状态 (开发环境)
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
    console.log('SEO Analytics initialized:', window.seoAnalytics.getTrackingStatus());
  }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOAnalytics;
} 