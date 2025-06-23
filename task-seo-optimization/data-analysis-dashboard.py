#!/usr/bin/env python3
"""
SEO着陆页数据分析仪表板
用于生成SEO关键指标的可视化报告
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.express as px
from datetime import datetime, timedelta
import json
import requests
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

class SEODataAnalyzer:
    """SEO数据分析器"""
    
    def __init__(self, data_source: str = 'sample'):
        """
        初始化分析器
        Args:
            data_source: 数据源类型 ('google_analytics', 'search_console', 'sample')
        """
        self.data_source = data_source
        self.landing_pages = [
            'twitter-video-downloader',
            'twitter-gif-download', 
            'x-video-download',
            'mobile-video-download'
        ]
        
        # 目标关键词
        self.target_keywords = {
            'twitter video downloader': 'twitter-video-downloader',
            'twitter gif download': 'twitter-gif-download',
            'x video download': 'x-video-download',
            'mobile twitter download': 'mobile-video-download'
        }
        
        self.colors = {
            'twitter-video-downloader': '#1DA1F2',
            'twitter-gif-download': '#8B5CF6', 
            'x-video-download': '#000000',
            'mobile-video-download': '#10B981'
        }

    def generate_sample_data(self) -> Dict:
        """生成示例数据用于演示"""
        
        # 生成30天的日期范围
        date_range = pd.date_range(
            start=datetime.now() - timedelta(days=30),
            end=datetime.now(),
            freq='D'
        )
        
        data = {
            'traffic': {},
            'rankings': {},
            'conversions': {},
            'performance': {}
        }
        
        # 生成流量数据
        for page in self.landing_pages:
            base_traffic = np.random.randint(100, 500)
            trend = np.linspace(1, 1.5, len(date_range))  # 上升趋势
            noise = np.random.normal(0, 0.1, len(date_range))
            
            traffic = base_traffic * trend * (1 + noise)
            traffic = np.maximum(traffic, 0).astype(int)
            
            data['traffic'][page] = {
                'dates': date_range.strftime('%Y-%m-%d').tolist(),
                'organic_traffic': traffic.tolist(),
                'bounce_rate': np.random.uniform(0.4, 0.7, len(date_range)).tolist(),
                'session_duration': np.random.uniform(120, 300, len(date_range)).tolist()
            }
        
        # 生成排名数据
        for keyword, page in self.target_keywords.items():
            initial_rank = np.random.randint(30, 50)
            trend = np.linspace(0, -15, len(date_range))  # 排名上升（数字下降）
            noise = np.random.normal(0, 2, len(date_range))
            
            rankings = initial_rank + trend + noise
            rankings = np.maximum(rankings, 1).astype(int)
            
            data['rankings'][keyword] = {
                'dates': date_range.strftime('%Y-%m-%d').tolist(),
                'rankings': rankings.tolist(),
                'search_volume': np.random.randint(8000, 50000),
                'competition': np.random.choice(['Low', 'Medium', 'High'])
            }
        
        # 生成转化数据
        for page in self.landing_pages:
            traffic_data = data['traffic'][page]['organic_traffic']
            conversion_rate = np.random.uniform(0.02, 0.05, len(date_range))
            conversions = (np.array(traffic_data) * conversion_rate).astype(int)
            
            data['conversions'][page] = {
                'dates': date_range.strftime('%Y-%m-%d').tolist(),
                'conversions': conversions.tolist(),
                'conversion_rate': (conversion_rate * 100).tolist()
            }
        
        # 生成性能数据
        for page in self.landing_pages:
            data['performance'][page] = {
                'lcp': np.random.uniform(1.5, 3.0),
                'fid': np.random.uniform(50, 150), 
                'cls': np.random.uniform(0.05, 0.15),
                'seo_score': np.random.randint(75, 95)
            }
        
        return data

    def create_traffic_dashboard(self, data: Dict) -> go.Figure:
        """创建流量分析仪表板"""
        
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=(
                '有机流量趋势', '跳出率对比',
                '会话时长分布', '页面流量占比'
            ),
            specs=[[{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"type": "pie"}]]
        )
        
        # 1. 有机流量趋势
        for page in self.landing_pages:
            page_data = data['traffic'][page]
            fig.add_trace(
                go.Scatter(
                    x=page_data['dates'],
                    y=page_data['organic_traffic'],
                    mode='lines+markers',
                    name=page.replace('-', ' ').title(),
                    line=dict(color=self.colors[page], width=2)
                ),
                row=1, col=1
            )
        
        # 2. 跳出率对比
        pages = []
        bounce_rates = []
        for page in self.landing_pages:
            pages.append(page.replace('-', ' ').title())
            bounce_rates.append(np.mean(data['traffic'][page]['bounce_rate']) * 100)
        
        fig.add_trace(
            go.Bar(
                x=pages,
                y=bounce_rates,
                name='平均跳出率',
                marker_color=[self.colors[page] for page in self.landing_pages]
            ),
            row=1, col=2
        )
        
        # 3. 会话时长分布
        all_durations = []
        page_labels = []
        for page in self.landing_pages:
            durations = data['traffic'][page]['session_duration']
            all_durations.extend(durations)
            page_labels.extend([page.replace('-', ' ').title()] * len(durations))
        
        fig.add_trace(
            go.Box(
                y=all_durations,
                x=page_labels,
                name='会话时长',
                marker_color='lightblue'
            ),
            row=2, col=1
        )
        
        # 4. 页面流量占比
        total_traffic = []
        labels = []
        for page in self.landing_pages:
            total = sum(data['traffic'][page]['organic_traffic'])
            total_traffic.append(total)
            labels.append(page.replace('-', ' ').title())
        
        fig.add_trace(
            go.Pie(
                labels=labels,
                values=total_traffic,
                name="流量占比",
                marker_colors=[self.colors[page] for page in self.landing_pages]
            ),
            row=2, col=2
        )
        
        fig.update_layout(
            title_text="SEO着陆页流量分析仪表板",
            height=800,
            showlegend=True
        )
        
        return fig

    def generate_weekly_report(self, data: Dict) -> str:
        """生成每周数据报告"""
        
        report_date = datetime.now().strftime('%Y-%m-%d')
        
        # 计算关键指标
        total_traffic = sum([sum(data['traffic'][page]['organic_traffic']) for page in self.landing_pages])
        avg_conversion_rate = np.mean([np.mean(data['conversions'][page]['conversion_rate']) for page in self.landing_pages])
        avg_bounce_rate = np.mean([np.mean(data['traffic'][page]['bounce_rate']) for page in self.landing_pages])
        
        # 排名变化分析
        ranking_changes = {}
        for keyword in self.target_keywords.keys():
            rankings = data['rankings'][keyword]['rankings']
            change = rankings[0] - rankings[-1]  # 正值表示排名上升
            ranking_changes[keyword] = change
        
        report = f"""
# SEO着陆页周报 - {report_date}

## 📊 核心指标概览

### 流量数据
- **总有机访问量**: {total_traffic:,} 次
- **平均转化率**: {avg_conversion_rate:.2f}%
- **平均跳出率**: {avg_bounce_rate:.1%}

### 🔍 关键词排名变化
"""
        
        for keyword, change in ranking_changes.items():
            direction = "↗️" if change > 0 else "↘️" if change < 0 else "➡️"
            report += f"- **{keyword}**: {direction} {abs(change)} 位\n"
        
        report += f"""

### 🎯 页面表现分析
"""
        
        for page in self.landing_pages:
            page_traffic = sum(data['traffic'][page]['organic_traffic'])
            page_conversion = np.mean(data['conversions'][page]['conversion_rate'])
            page_title = page.replace('-', ' ').title()
            
            report += f"""
#### {page_title}
- 访问量: {page_traffic:,} 次
- 转化率: {page_conversion:.2f}%
- 性能得分: {data['performance'][page]['seo_score']}/100
"""
        
        report += f"""

### 📈 趋势分析
- 整体流量呈上升趋势
- 关键词排名持续改善
- 用户参与度稳步提升

### 🎯 下周优化重点
1. 继续优化页面加载速度
2. 增强移动端用户体验
3. 扩展长尾关键词覆盖
4. 提升内容质量和相关性

---
*报告生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""
        
        return report

    def export_dashboard(self, output_dir: str = 'reports'):
        """导出完整的数据分析仪表板"""
        
        import os
        os.makedirs(output_dir, exist_ok=True)
        
        # 生成数据
        data = self.generate_sample_data()
        
        # 创建流量图表
        traffic_fig = self.create_traffic_dashboard(data)
        
        # 保存HTML文件
        traffic_fig.write_html(f"{output_dir}/traffic_dashboard.html")
        
        # 生成文字报告
        weekly_report = self.generate_weekly_report(data)
        with open(f"{output_dir}/weekly_report.md", 'w', encoding='utf-8') as f:
            f.write(weekly_report)
        
        # 保存原始数据
        with open(f"{output_dir}/raw_data.json", 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 分析报告已导出到 {output_dir}/ 目录")
        print(f"📊 包含文件:")
        print(f"   - traffic_dashboard.html (流量分析)")
        print(f"   - weekly_report.md (周报)")
        print(f"   - raw_data.json (原始数据)")

def main():
    """主函数"""
    analyzer = SEODataAnalyzer()
    
    print("🚀 SEO数据分析仪表板启动中...")
    print("📈 正在生成示例数据和图表...")
    
    # 导出完整报告
    analyzer.export_dashboard()
    
    print("\n🎯 使用说明:")
    print("1. 打开生成的HTML文件查看交互式图表")
    print("2. 查看weekly_report.md了解关键指标")
    print("3. 使用raw_data.json进行进一步分析")
    print("\n📝 可以根据实际需求修改数据源和指标")

if __name__ == "__main__":
    main() 