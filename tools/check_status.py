#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""实时监控SEO生成进度"""

import json
import time
from pathlib import Path
from datetime import datetime

def check_status():
    """检查处理状态"""
    print("=" * 80)
    print("视频SEO生成器 - 实时状态监控")
    print("=" * 80)
    print(f"检查时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 查找最新的JSON文件
    output_dir = Path("tools")
    cn_files = list(output_dir.glob("cn_郭春林_seo_results_*.json"))
    
    if not cn_files:
        print("❌ 未找到结果文件")
        return
    
    # 获取最新文件
    latest_cn = max(cn_files, key=lambda p: p.stat().st_mtime)
    latest_en = latest_cn.name.replace("cn_", "en_")
    latest_en_path = output_dir / latest_en
    
    print(f"📁 最新中文文件: {latest_cn.name}")
    print(f"📁 最新英文文件: {latest_en}")
    print()
    
    # 读取文件
    try:
        with open(latest_cn, 'r', encoding='utf-8') as f:
            cn_data = json.load(f)
        
        with open(latest_en_path, 'r', encoding='utf-8') as f:
            en_data = json.load(f)
        
        cn_count = len(cn_data)
        en_count = len(en_data)
        
        print("📊 处理统计:")
        print("-" * 80)
        print(f"中文条目: {cn_count} 个")
        print(f"英文条目: {en_count} 个")
        print(f"总进度: {cn_count} / 439 ({cn_count*100//439}%)")
        print()
        
        # 估算剩余时间
        remaining = 439 - cn_count
        if cn_count > 0:
            # 假设每个视频15秒
            estimated_seconds = remaining * 15
            estimated_minutes = estimated_seconds / 60
            estimated_hours = estimated_minutes / 60
            
            print("⏱️  预估剩余时间:")
            print("-" * 80)
            if estimated_hours >= 1:
                print(f"约 {estimated_hours:.1f} 小时")
            else:
                print(f"约 {estimated_minutes:.0f} 分钟")
            print()
        
        # 显示最近处理的视频
        print("📝 最近处理的5个视频:")
        print("-" * 80)
        recent_videos = list(cn_data.keys())[-5:]
        for i, video in enumerate(recent_videos, 1):
            print(f"{i}. {video}")
        print()
        
        # 检查质量
        print("✅ 质量检查:")
        print("-" * 80)
        complete_count = 0
        for video, data in cn_data.items():
            if (data.get('title') and data.get('description') and 
                data.get('keywords') and data.get('summary')):
                complete_count += 1
        
        quality_rate = complete_count * 100 / cn_count if cn_count > 0 else 0
        print(f"完整条目: {complete_count} / {cn_count} ({quality_rate:.1f}%)")
        print()
        
        # 成本估算
        print("💰 成本估算:")
        print("-" * 80)
        api_calls = cn_count * 2  # 中英文各一次
        estimated_cost = api_calls * 0.0006  # 每次调用约$0.0006
        print(f"API调用次数: {api_calls} 次")
        print(f"已花费成本: ${estimated_cost:.4f}")
        
        if remaining > 0:
            remaining_cost = remaining * 2 * 0.0006
            total_cost = estimated_cost + remaining_cost
            print(f"预估剩余成本: ${remaining_cost:.4f}")
            print(f"预估总成本: ${total_cost:.4f}")
        print()
        
    except Exception as e:
        print(f"❌ 读取文件失败: {e}")
    
    print("=" * 80)
    print("提示: 运行 'bash tools/monitor_progress.sh' 查看实时日志")
    print("=" * 80)

if __name__ == "__main__":
    check_status()
