#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
在SEO结果JSON文件的所有title字段末尾追加网站链接
"""

import json
import sys
from pathlib import Path

# 配置
LINK_TO_ADD = "\n更多访问链接：https://www.guochunlin.com/"

def add_link_to_titles(input_file, output_file=None):
    """
    在JSON文件中所有视频的title字段末尾追加链接
    
    Args:
        input_file: 输入JSON文件路径
        output_file: 输出JSON文件路径（如果为None，则覆盖原文件）
    """
    
    # 读取JSON文件
    print(f"📖 正在读取文件: {input_file}")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"❌ 错误: 文件不存在 - {input_file}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ 错误: JSON格式错误 - {e}")
        sys.exit(1)
    
    # 统计信息
    total_videos = len(data)
    modified_count = 0
    skipped_count = 0
    
    print(f"📊 找到 {total_videos} 个视频条目")
    print(f"🔗 将追加链接: {LINK_TO_ADD.strip()}")
    print()
    
    # 遍历所有视频条目
    for video_name, video_data in data.items():
        if 'title' in video_data:
            current_title = video_data['title']
            
            # 检查是否已经包含链接
            if LINK_TO_ADD.strip() in current_title:
                print(f"⏭️  跳过 (已包含链接): {video_name}")
                skipped_count += 1
                continue
            
            # 在title末尾追加链接
            video_data['title'] = current_title + LINK_TO_ADD
            modified_count += 1
            print(f"✅ 已修改: {video_name}")
        else:
            print(f"⚠️  警告: 缺少title字段 - {video_name}")
    
    print()
    print("=" * 60)
    print(f"📊 处理完成统计:")
    print(f"   总视频数: {total_videos}")
    print(f"   已修改: {modified_count}")
    print(f"   已跳过: {skipped_count}")
    print("=" * 60)
    print()
    
    # 保存修改后的JSON
    if output_file is None:
        output_file = input_file
        print(f"💾 正在覆盖原文件: {output_file}")
    else:
        print(f"💾 正在保存到新文件: {output_file}")
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ 文件保存成功！")
    except Exception as e:
        print(f"❌ 错误: 保存文件失败 - {e}")
        sys.exit(1)
    
    # 显示示例
    print()
    print("=" * 60)
    print("📝 修改示例 (第一个修改的视频):")
    print("=" * 60)
    for video_name, video_data in data.items():
        if 'title' in video_data and LINK_TO_ADD.strip() in video_data['title']:
            print(f"\n视频: {video_name}")
            print(f"\n修改后的title (最后3行):")
            title_lines = video_data['title'].split('\n')
            for line in title_lines[-3:]:
                print(f"  {line}")
            break
    print()

def main():
    """主函数"""
    
    print()
    print("=" * 60)
    print("🔗 SEO标题链接追加工具")
    print("=" * 60)
    print()
    
    # 检查命令行参数
    if len(sys.argv) < 2:
        print("使用方法:")
        print(f"  python {sys.argv[0]} <输入文件> [输出文件]")
        print()
        print("示例:")
        print(f"  python {sys.argv[0]} cn_郭春林_seo_results_20251003_141427.json")
        print(f"  python {sys.argv[0]} input.json output.json")
        print()
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    # 执行修改
    add_link_to_titles(input_file, output_file)
    
    print()
    print("🎉 所有操作完成！")
    print()

if __name__ == "__main__":
    main()
