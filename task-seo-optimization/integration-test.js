/**
 * SEO着陆页集成测试脚本
 * 用于验证所有新创建的着陆页路由和链接是否正常工作
 */

const testUrls = [
  // 中文版本
  { url: '/zh/landing/twitter-video-downloader', name: 'Twitter视频下载器 (中文)' },
  { url: '/zh/landing/twitter-gif-download', name: 'Twitter GIF下载 (中文)' },
  { url: '/zh/landing/x-video-download', name: 'X视频下载器 (中文)' },
  { url: '/zh/landing/mobile-video-download', name: '移动端下载器 (中文)' },
  
  // 英文版本
  { url: '/en/landing/twitter-video-downloader', name: 'Twitter Video Downloader (English)' },
  { url: '/en/landing/twitter-gif-download', name: 'Twitter GIF Download (English)' },
  { url: '/en/landing/x-video-download', name: 'X Video Download (English)' },
  { url: '/en/landing/mobile-video-download', name: 'Mobile Video Download (English)' },
  
  // 默认语言版本
  { url: '/landing/twitter-video-downloader', name: 'Twitter Video Downloader (Default)' },
  { url: '/landing/twitter-gif-download', name: 'Twitter GIF Download (Default)' },
  { url: '/landing/x-video-download', name: 'X Video Download (Default)' },
  { url: '/landing/mobile-video-download', name: 'Mobile Video Download (Default)' },
];

const baseUrl = 'https://ai-xdownload.xyz';

/**
 * 测试单个URL的可访问性
 */
async function testUrl(url, name) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Test-Bot/1.0)',
      },
    });
    
    const status = response.status;
    const success = status >= 200 && status < 400;
    
    console.log(`${success ? '✅' : '❌'} ${name}: ${status} - ${url}`);
    
    return {
      url,
      name,
      status,
      success,
    };
  } catch (error) {
    console.log(`❌ ${name}: ERROR - ${error.message} - ${url}`);
    return {
      url,
      name,
      status: 'ERROR',
      success: false,
      error: error.message,
    };
  }
}

/**
 * 运行完整测试套件
 */
async function runTests() {
  console.log('🚀 开始SEO着陆页集成测试...\n');
  console.log(`测试基础URL: ${baseUrl}`);
  console.log(`测试页面数量: ${testUrls.length}\n`);
  
  const results = [];
  
  for (const testCase of testUrls) {
    const result = await testUrl(testCase.url, testCase.name);
    results.push(result);
    
    // 添加短暂延迟，避免过于频繁的请求
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // 生成测试报告
  console.log('\n📊 测试报告:');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`总测试数: ${results.length}`);
  console.log(`成功: ${successful} ✅`);
  console.log(`失败: ${failed} ❌`);
  console.log(`成功率: ${((successful / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ 失败的测试:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.status} ${r.error ? `(${r.error})` : ''}`);
    });
  }
  
  console.log('\n🔍 SEO检查项目:');
  console.log('  - 页面标题是否包含目标关键词');
  console.log('  - Meta描述是否完整且吸引人');
  console.log('  - H1标签是否包含主要关键词');
  console.log('  - 结构化数据是否正确实现');
  console.log('  - 内部链接是否有效');
  console.log('  - 页面加载速度是否优化');
  
  return results;
}

/**
 * 验证网站地图是否包含所有着陆页
 */
async function testSitemap() {
  console.log('\n🗺️ 测试网站地图...');
  
  try {
    const response = await fetch(`${baseUrl}/sitemap.xml`);
    const sitemapContent = await response.text();
    
    const missingUrls = [];
    testUrls.forEach(testCase => {
      const fullUrl = `${baseUrl}${testCase.url}`;
      if (!sitemapContent.includes(fullUrl)) {
        missingUrls.push(testCase.url);
      }
    });
    
    if (missingUrls.length === 0) {
      console.log('✅ 网站地图包含所有着陆页');
    } else {
      console.log('❌ 网站地图缺失以下页面:');
      missingUrls.forEach(url => console.log(`  - ${url}`));
    }
    
    return missingUrls.length === 0;
  } catch (error) {
    console.log(`❌ 无法访问网站地图: ${error.message}`);
    return false;
  }
}

// 如果直接运行此脚本
if (typeof module !== 'undefined' && require.main === module) {
  (async () => {
    await runTests();
    await testSitemap();
    console.log('\n✨ 测试完成!');
  })();
}

module.exports = {
  testUrl,
  runTests,
  testSitemap,
  testUrls,
}; 