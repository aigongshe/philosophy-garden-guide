#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
视频SEO生成器 - 环境测试脚本

用于验证环境配置是否正确
"""

import os
import sys
from pathlib import Path

def print_status(message, status):
    """打印状态信息"""
    if status:
        print(f"✓ {message}")
    else:
        print(f"✗ {message}")
    return status

def test_python_version():
    """测试Python版本"""
    version = sys.version_info
    is_ok = version.major == 3 and version.minor >= 8
    print_status(
        f"Python版本: {version.major}.{version.minor}.{version.micro}",
        is_ok
    )
    if not is_ok:
        print("  需要Python 3.8或更高版本")
    return is_ok

def test_gemini_library():
    """测试google-generativeai库"""
    try:
        import google.generativeai as genai
        version = genai.__version__ if hasattr(genai, '__version__') else "已安装"
        print_status(f"google-generativeai库: {version}", True)
        return True
    except ImportError:
        print_status("google-generativeai库: 未安装", False)
        print("  请运行: pip install google-generativeai")
        return False

def test_api_key():
    """测试API密钥"""
    api_key = os.getenv("GOOGLE_API_KEY")
    if api_key:
        masked_key = api_key[:8] + "..." + api_key[-4:] if len(api_key) > 12 else "***"
        print_status(f"Google API密钥: {masked_key}", True)
        return True
    else:
        print_status("Google API密钥: 未设置", False)
        print("  请设置环境变量: export GOOGLE_API_KEY='your-key'")
        return False

def test_directories():
    """测试目录"""
    dirs = {
        "视频目录": "orignal/郭春林哲学智慧",
        "字幕目录": "orignal/orinal_txt_md",
        "输出目录": "tools"
    }
    
    all_ok = True
    for name, path in dirs.items():
        p = Path(path)
        exists = p.exists()
        if exists:
            if name == "输出目录":
                print_status(f"{name}: {path}", True)
            else:
                count = len(list(p.glob("*")))
                print_status(f"{name}: {path} ({count} 个文件)", True)
        else:
            print_status(f"{name}: {path} (不存在)", False)
            all_ok = False
    
    return all_ok

def test_file_matching():
    """测试文件匹配"""
    video_dir = Path("orignal/郭春林哲学智慧")
    subtitle_dir = Path("orignal/orinal_txt_md")
    
    if not video_dir.exists() or not subtitle_dir.exists():
        print_status("文件匹配测试: 跳过（目录不存在）", False)
        return False
    
    videos = list(video_dir.glob("*.mp4"))
    subtitles = list(subtitle_dir.glob("*.md"))
    
    subtitle_stems = {f.stem for f in subtitles}
    matched = sum(1 for v in videos if v.stem in subtitle_stems)
    
    print_status(
        f"文件匹配: {matched}/{len(videos)} 个视频有对应字幕",
        matched > 0
    )
    
    return matched > 0

def test_api_connection():
    """测试API连接"""
    try:
        import google.generativeai as genai
        api_key = os.getenv("GOOGLE_API_KEY")
        
        if not api_key:
            print_status("API连接测试: 跳过（未设置密钥）", False)
            return False
        
        print("  正在测试Gemini API连接...")
        genai.configure(api_key=api_key)
        
        # 发送一个简单的测试请求
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content("请回复'测试成功'")
        
        response_text = response.text
        print_status(f"API连接测试: 成功 (响应: {response_text[:20]}...)", True)
        return True
        
    except Exception as e:
        print_status(f"API连接测试: 失败 ({str(e)[:50]}...)", False)
        return False

def main():
    """主函数"""
    print("=" * 80)
    print("视频SEO生成器 - 环境测试")
    print("=" * 80)
    print()
    
    results = []
    
    print("1. Python环境")
    print("-" * 80)
    results.append(test_python_version())
    print()
    
    print("2. 依赖库")
    print("-" * 80)
    results.append(test_gemini_library())
    print()
    
    print("3. API配置")
    print("-" * 80)
    api_ok = test_api_key()
    results.append(api_ok)
    print()
    
    print("4. 目录结构")
    print("-" * 80)
    results.append(test_directories())
    print()
    
    print("5. 文件匹配")
    print("-" * 80)
    results.append(test_file_matching())
    print()
    
    if api_ok:
        print("6. API连接")
        print("-" * 80)
        results.append(test_api_connection())
        print()
    
    # 总结
    print("=" * 80)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"✓ 所有测试通过 ({passed}/{total})")
        print()
        print("环境配置正确，可以开始使用视频SEO生成器！")
        print()
        print("运行命令:")
        print("  python tools/video_seo_generator_gemini.py \\")
        print("    --video-dir 'orignal/郭春林哲学智慧' \\")
        print("    --subtitle-dir 'orignal/orinal_txt_md' \\")
        print("    --output-dir 'tools' \\")
        print("    --max-videos 5")
    else:
        print(f"✗ 部分测试失败 ({passed}/{total})")
        print()
        print("请根据上述错误信息修复问题后重试")
    
    print("=" * 80)
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
