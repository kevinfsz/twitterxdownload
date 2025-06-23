import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';
import StructuredData from '@/app/components/StructuredData';

export const metadata = {
  title: 'X视频解析API文档 - 开发者指南 | TwitterXDownload',
  description: 'X(Twitter)视频解析API技术文档。了解API接口、参数配置和最佳实践。为什么选择TwitterXDownload现成服务更高效。',
  keywords: 'X视频解析API, Twitter视频API, X API文档, 推特视频解析接口, Twitter视频下载API, X视频API开发者文档',
  alternates: {
    canonical: 'https://twitterxdownload.com/tutorials/x-video-api-docs',
  },
  openGraph: {
    title: 'X视频解析API文档 - 开发者指南',
    description: 'X(Twitter)视频解析API技术文档。了解API接口、参数配置和最佳实践。为什么选择TwitterXDownload现成服务更高效。',
    type: 'article',
    url: 'https://twitterxdownload.com/tutorials/x-video-api-docs',
    images: [
      {
        url: 'https://twitterxdownload.com/images/x-video-api-docs.jpg',
        width: 1200,
        height: 630,
        alt: 'X视频解析API文档',
      }
    ],
    locale: 'zh-CN',
    siteName: 'TwitterXDownload',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X视频解析API文档 - 开发者指南',
    description: 'X(Twitter)视频解析API技术文档。了解API接口、参数配置和最佳实践。',
    images: ['https://twitterxdownload.com/images/x-video-api-docs.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function XVideoApiDocsTutorial({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  }

  // SEO优化：结构化数据
  const documentationData = {
    title: 'X视频解析API文档：开发者完整指南',
    description: '详细的X(Twitter)视频解析API技术文档，包含接口说明、参数配置、示例代码和最佳实践建议。',
    url: 'https://twitterxdownload.com/tutorials/x-video-api-docs',
    image: 'https://twitterxdownload.com/images/x-video-api-docs.jpg',
    datePublished: '2024-12-19',
    dateModified: '2024-12-19'
  };

  return (
    <>
      <StructuredData type="article" data={documentationData} />
      <div className="page-container max-w-4xl mx-auto">
        <article className="prose prose-lg mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">X视频解析API文档：开发者完整指南</h1>
            <p className="text-lg text-gray-600 mb-4">
              详细的X(Twitter)视频解析API技术文档，包含接口说明、参数配置、示例代码和最佳实践建议。
            </p>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>发布时间：2024年12月</span>
              <span>•</span>
              <span>阅读时间：6分钟</span>
              <span>•</span>
              <span>难度：⭐⭐⭐⭐</span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">API概览</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">TwitterXDownload API的核心特性：</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li><strong>高可靠性</strong>：99.9%的服务可用性保证</li>
                <li><strong>快速响应</strong>：平均响应时间小于2秒</li>
                <li><strong>多格式支持</strong>：MP4、GIF、图片等多种格式</li>
                <li><strong>高清质量</strong>：支持最高1080p视频下载</li>
                <li><strong>易于集成</strong>：RESTful API设计，支持多种编程语言</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">推荐方案：使用现成服务</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-3">🚀 为什么推荐使用TwitterXDownload现成服务？</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">开发效率</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• 无需自建API服务器</li>
                    <li>• 无需处理Twitter API复杂性</li>
                    <li>• 免维护和更新成本</li>
                    <li>• 快速集成到现有项目</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">技术优势</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• 专业团队维护</li>
                    <li>• 自动适配Twitter API变更</li>
                    <li>• 高并发处理能力</li>
                    <li>• 全球CDN加速</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <p className="text-amber-800">
                <strong>建议：</strong>对于大多数开发需求，直接使用 <Link href="/" className="text-amber-600 underline">TwitterXDownload</Link> 
                的网页版服务或集成方案，而不是自建API，这样可以显著降低开发和维护成本。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">API接口说明</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-3">基础解析接口</h3>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">接口地址</h4>
                  <code className="bg-gray-800 text-green-400 p-3 rounded block">
                    POST https://api.twitterxdownload.com/v1/parse
                  </code>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">请求参数</h4>
                  <div className="bg-white p-4 rounded border">
                    <pre className="text-sm">
{`{
  "url": "https://twitter.com/username/status/123456789",
  "format": "mp4",
  "quality": "hd"
}`}
                    </pre>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">响应示例</h4>
                  <div className="bg-white p-4 rounded border">
                    <pre className="text-sm">
{`{
  "status": "success",
  "data": {
    "video_url": "https://cdn.twitterxdownload.com/...",
    "thumbnail": "https://cdn.twitterxdownload.com/...",
    "duration": 30,
    "quality": "1080p",
    "format": "mp4"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">参数配置详解</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">参数名</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">必需</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-mono">url</td>
                    <td className="px-4 py-4 text-sm">string</td>
                    <td className="px-4 py-4 text-sm">是</td>
                    <td className="px-4 py-4 text-sm">Twitter/X推文链接</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-mono">format</td>
                    <td className="px-4 py-4 text-sm">string</td>
                    <td className="px-4 py-4 text-sm">否</td>
                    <td className="px-4 py-4 text-sm">输出格式：mp4, gif (默认mp4)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-mono">quality</td>
                    <td className="px-4 py-4 text-sm">string</td>
                    <td className="px-4 py-4 text-sm">否</td>
                    <td className="px-4 py-4 text-sm">视频质量：hd, sd (默认hd)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-mono">callback</td>
                    <td className="px-4 py-4 text-sm">string</td>
                    <td className="px-4 py-4 text-sm">否</td>
                    <td className="px-4 py-4 text-sm">回调URL (异步处理)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">代码示例</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">JavaScript (Node.js)</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`const axios = require('axios');

async function parseTwitterVideo(url) {
  try {
    const response = await axios.post('https://api.twitterxdownload.com/v1/parse', {
      url: url,
      format: 'mp4',
      quality: 'hd'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('解析失败:', error);
    throw error;
  }
}

// 使用示例
parseTwitterVideo('https://twitter.com/user/status/123456789')
  .then(result => console.log(result))
  .catch(error => console.error(error));`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Python</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`import requests
import json

def parse_twitter_video(url):
    api_url = "https://api.twitterxdownload.com/v1/parse"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    data = {
        "url": url,
        "format": "mp4",
        "quality": "hd"
    }
    
    try:
        response = requests.post(api_url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"解析失败: {e}")
        raise

# 使用示例
result = parse_twitter_video("https://twitter.com/user/status/123456789")
print(json.dumps(result, indent=2))`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">错误处理</h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">常见错误代码</h3>
                <ul className="space-y-2 text-red-700">
                  <li><code>400</code> - 请求参数错误</li>
                  <li><code>401</code> - API密钥无效</li>
                  <li><code>404</code> - 推文不存在或无视频内容</li>
                  <li><code>429</code> - 请求频率超限</li>
                  <li><code>500</code> - 服务器内部错误</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">最佳实践建议</h3>
                <ul className="list-disc pl-6 text-yellow-700">
                  <li>实现重试机制，处理临时性错误</li>
                  <li>使用合适的请求间隔，避免触发频率限制</li>
                  <li>验证输入URL格式，提前过滤无效请求</li>
                  <li>设置合理的超时时间</li>
                  <li>记录详细的错误日志便于调试</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">为什么选择现成方案？</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">❌ 自建API的挑战</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Twitter API的复杂性和变更</li>
                  <li>• 需要处理反爬虫机制</li>
                  <li>• 服务器和带宽成本</li>
                  <li>• 持续维护和更新</li>
                  <li>• 法律合规性考量</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">✅ 使用TwitterXDownload的优势</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• 专业团队维护和更新</li>
                  <li>• 稳定可靠的服务质量</li>
                  <li>• 无需技术投入</li>
                  <li>• 快速集成和部署</li>
                  <li>• 免费提供基础服务</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">集成建议</h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-4">推荐的集成方式：</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-blue-700">1. 直接嵌入网页版工具</h4>
                  <p className="text-blue-600 text-sm">最简单的方式，使用iframe嵌入TwitterXDownload网页版到您的应用中</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-blue-700">2. 使用我们的JavaScript SDK</h4>
                  <p className="text-blue-600 text-sm">提供更好的用户体验和自定义样式</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-blue-700">3. 服务端API调用</h4>
                  <p className="text-blue-600 text-sm">适合需要批量处理或后台处理的场景</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">相关教程推荐</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/iphone-twitter-video-download" className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">iPhone下载推特视频教程</h3>
                <p className="text-gray-600 text-sm">了解移动端用户如何使用我们的服务下载视频。</p>
              </Link>
              <Link href="/tutorials/chrome-extension-guide" className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Chrome扩展使用指南</h3>
                <p className="text-gray-600 text-sm">对比分析扩展与网页版工具的优劣势。</p>
              </Link>
            </div>
          </section>

          <section className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">开始使用TwitterXDownload</h2>
            <p className="mb-4">
              无论是个人项目还是企业应用，TwitterXDownload都能为您提供稳定、高效的X视频解析服务。
              立即体验我们的专业解决方案。
            </p>
            <div className="flex gap-4">
              <Link 
                href="/" 
                className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
              >
                体验网页版工具
              </Link>
              <Link 
                href="/contact" 
                className="inline-block border border-purple-500 text-purple-500 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
              >
                联系技术支持
              </Link>
            </div>
          </section>

        </article>
      </div>
    </>
  );
} 