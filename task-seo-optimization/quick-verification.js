#!/usr/bin/env node

/**
 * SEO着陆页快速验证脚本
 * 自动化检查关键功能点，节省人工验证时间
 */

const https = require('https');
const http = require('http');

// 验证配置
const config = {
      baseUrl: 'https://ai-xdownload.xyz',
  timeout: 10000,
  userAgent: 'Mozilla/5.0 (compatible; SEO-Verification-Bot/1.0)',
};

// 需要验证的URL列表
const urlsToVerify = [
  // 中文版本
  '/zh/landing/twitter-video-downloader',
  '/zh/landing/twitter-gif-download',
  '/zh/landing/x-video-download',
  '/zh/landing/mobile-video-download',
  
  // 英文版本
  '/en/landing/twitter-video-downloader',
  '/en/landing/twitter-gif-download',
  '/en/landing/x-video-download',
  '/en/landing/mobile-video-download',
  
  // 默认版本
  '/landing/twitter-video-downloader',
  '/landing/twitter-gif-download',
  '/landing/x-video-download',
  '/landing/mobile-video-download',
  
  // 系统页面
  '/sitemap.xml',
  '/robots.txt'
];

// 验证结果统计
const results = {
  passed: 0,
  failed: 0,
  details: []
};

/**
 * 发送HTTP请求验证URL
 */
function verifyUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${config.baseUrl}${url}`;
    const urlObj = new URL(fullUrl);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': config.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache'
      },
      timeout: config.timeout
    };

    const req = client.request(options, (res) => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'] || '';
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          url,
          statusCode,
          contentType,
          success: statusCode >= 200 && statusCode < 400,
          size: data.length,
          hasTitle: data.includes('<title>'),
          hasMetaDescription: data.includes('<meta name="description"'),
          hasOpenGraph: data.includes('<meta property="og:'),
          hasTwitterCard: data.includes('<meta name="twitter:'),
          responseTime: Date.now() - startTime
        };
        
        resolve(result);
      });
    });

    req.on('error', (error) => {
      resolve({
        url,
        statusCode: 'ERROR',
        success: false,
        error: error.message,
        responseTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        statusCode: 'TIMEOUT',
        success: false,
        error: 'Request timeout',
        responseTime: config.timeout
      });
    });

    const startTime = Date.now();
    req.end();
  });
}

/**
 * 验证网站地图内容
 */
async function verifySitemap() {
  console.log('\n🗺️ 验证网站地图...');
  
  const sitemapResult = await verifyUrl('/sitemap.xml');
  
  if (sitemapResult.success) {
    // 这里可以进一步解析XML内容，检查是否包含所有着陆页URL
    console.log('✅ 网站地图可访问');
    return true;
  } else {
    console.log('❌ 网站地图访问失败:', sitemapResult.error || sitemapResult.statusCode);
    return false;
  }
}

/**
 * 验证robots.txt
 */
async function verifyRobots() {
  console.log('\n🤖 验证robots.txt...');
  
  const robotsResult = await verifyUrl('/robots.txt');
  
  if (robotsResult.success) {
    console.log('✅ robots.txt可访问');
    return true;
  } else {
    console.log('❌ robots.txt访问失败:', robotsResult.error || robotsResult.statusCode);
    return false;
  }
}

/**
 * 批量验证着陆页
 */
async function verifyLandingPages() {
  console.log('\n📄 验证着陆页...');
  
  const landingPageUrls = urlsToVerify.filter(url => url.includes('/landing/'));
  const promises = landingPageUrls.map(url => verifyUrl(url));
  
  const results = await Promise.all(promises);
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const responseTime = result.responseTime ? `${result.responseTime}ms` : 'N/A';
    
    console.log(`${status} ${result.url} - ${result.statusCode} (${responseTime})`);
    
    if (result.success) {
      // 检查SEO要素
      const seoChecks = [];
      if (result.hasTitle) seoChecks.push('Title');
      if (result.hasMetaDescription) seoChecks.push('Meta Desc');
      if (result.hasOpenGraph) seoChecks.push('OpenGraph');
      if (result.hasTwitterCard) seoChecks.push('Twitter Card');
      
      console.log(`   SEO要素: ${seoChecks.join(', ') || '无'}`);
      console.log(`   页面大小: ${(result.size / 1024).toFixed(1)}KB`);
    } else {
      console.log(`   错误: ${result.error || '未知错误'}`);
    }
    
    // 更新统计
    if (result.success) {
      results.passed++;
    } else {
      results.failed++;
    }
    
    results.details.push(result);
  });
  
  return results;
}

/**
 * 性能基准测试
 */
async function performanceTest() {
  console.log('\n⚡ 性能基准测试...');
  
  const testUrls = [
    '/zh/landing/twitter-video-downloader',
    '/en/landing/twitter-video-downloader'
  ];
  
  for (const url of testUrls) {
    const result = await verifyUrl(url);
    if (result.success) {
      const responseTime = result.responseTime;
      const size = result.size;
      
      console.log(`📊 ${url}:`);
      console.log(`   响应时间: ${responseTime}ms ${responseTime < 2000 ? '✅' : '⚠️'}`);
      console.log(`   页面大小: ${(size / 1024).toFixed(1)}KB ${size < 500000 ? '✅' : '⚠️'}`);
    }
  }
}

/**
 * 生成验证报告
 */
function generateReport(landingPageResults) {
  console.log('\n📊 验证报告');
  console.log('='.repeat(50));
  
  const totalTests = landingPageResults.details.length;
  const passedTests = landingPageResults.details.filter(r => r.success).length;
  const failedTests = totalTests - passedTests;
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  
  console.log(`总测试数: ${totalTests}`);
  console.log(`通过: ${passedTests} ✅`);
  console.log(`失败: ${failedTests} ❌`);
  console.log(`成功率: ${successRate}%`);
  
  if (failedTests > 0) {
    console.log('\n❌ 失败的测试:');
    landingPageResults.details
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`  - ${r.url}: ${r.statusCode} ${r.error ? `(${r.error})` : ''}`);
      });
  }
  
  // 性能统计
  const responseTimes = landingPageResults.details
    .filter(r => r.success && r.responseTime)
    .map(r => r.responseTime);
  
  if (responseTimes.length > 0) {
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const maxResponseTime = Math.max(...responseTimes);
    
    console.log('\n⚡ 性能统计:');
    console.log(`平均响应时间: ${avgResponseTime.toFixed(0)}ms`);
    console.log(`最慢响应时间: ${maxResponseTime}ms`);
    console.log(`性能评级: ${avgResponseTime < 2000 ? '优秀 ✅' : avgResponseTime < 3000 ? '良好 ⚠️' : '需优化 ❌'}`);
  }
  
  return {
    totalTests,
    passedTests,
    failedTests,
    successRate: parseFloat(successRate)
  };
}

/**
 * 主验证流程
 */
async function main() {
  console.log('🚀 开始SEO着陆页快速验证...\n');
  console.log(`验证目标: ${config.baseUrl}`);
  console.log(`验证时间: ${new Date().toLocaleString('zh-CN')}\n`);
  
  try {
    // 1. 验证系统文件
    const sitemapOk = await verifySitemap();
    const robotsOk = await verifyRobots();
    
    // 2. 验证着陆页
    const landingPageResults = await verifyLandingPages();
    
    // 3. 性能测试
    await performanceTest();
    
    // 4. 生成报告
    const report = generateReport(landingPageResults);
    
    // 5. 总结
    console.log('\n🎯 验证总结:');
    if (report.successRate >= 95) {
      console.log('🎉 验证通过！可以进行部署。');
    } else if (report.successRate >= 80) {
      console.log('⚠️  大部分功能正常，建议修复失败项后部署。');
    } else {
      console.log('❌ 存在较多问题，建议修复后重新验证。');
    }
    
    // 6. 下一步建议
    console.log('\n📋 下一步建议:');
    if (report.successRate >= 95) {
      console.log('✅ 运行完整的部署验证清单');
      console.log('✅ 使用Google PageSpeed Insights测试性能');
      console.log('✅ 提交到Google Search Console');
    } else {
      console.log('🔧 修复失败的URL');
      console.log('🔧 检查服务器配置');
      console.log('🔧 重新运行验证脚本');
    }
    
  } catch (error) {
    console.error('❌ 验证过程中发生错误:', error.message);
    process.exit(1);
  }
  
  console.log('\n✨ 验证完成!');
}

// 运行验证
if (require.main === module) {
  main();
}

module.exports = {
  verifyUrl,
  verifyLandingPages,
  verifySitemap,
  verifyRobots,
  performanceTest,
  generateReport
}; 