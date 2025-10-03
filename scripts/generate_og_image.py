#!/usr/bin/env python3
"""
Open Graph图片生成脚本
使用Google Gemini API自动生成1200x630的OG图片
"""

import os
import sys
from pathlib import Path

try:
    import google.generativeai as genai
    from PIL import Image
    import io
except ImportError:
    print("❌ 缺少必要的库，请先安装:")
    print("   pip install google-generativeai pillow")
    sys.exit(1)

# 配置
API_KEY = os.getenv('GEMINI_API_KEY')
OUTPUT_PATH = Path('public/images/og-default.jpg')
TARGET_SIZE = (1200, 630)

# 提示词模板
PROMPTS = {
    'professional': """
Create a professional Open Graph image, exactly 1200x630 pixels, for a Chinese philosophy blog.

BACKGROUND:
- Deep blue gradient: top #1e3a8a (navy) to bottom #3b82f6 (bright blue)
- Add subtle abstract geometric patterns (circles, lines) suggesting wisdom and connectivity
- Soft glow effect in the center for depth

MAIN TITLE (Top-Center):
- Text: "哲学的花园导游"
- Font: Elegant Chinese serif (Noto Serif SC or similar)
- Color: Pure white #ffffff
- Size: 90px
- Weight: Bold
- Position: Centered horizontally, 120px from top
- Add subtle text shadow for depth

SUBTITLE (Middle):
- Text: "跟随郭春林，探索智慧人生"
- Font: Clean Chinese sans-serif (Noto Sans SC)
- Color: White #ffffff with 85% opacity
- Size: 42px
- Weight: Regular
- Position: Centered, 40px below main title

ENGLISH SUBTITLE (Below Chinese):
- Text: "Philosophy Garden Guide"
- Font: Modern sans-serif (Inter or Roboto)
- Color: Light blue #93c5fd
- Size: 30px
- Weight: Light
- Position: Centered, 25px below Chinese subtitle

AUTHOR NAME (Bottom-Right):
- Text: "郭春林"
- Font: Elegant Chinese font
- Color: Gold #fbbf24
- Size: 38px
- Weight: Medium
- Position: 60px from bottom, 100px from right edge
- Add subtle glow effect

DECORATIVE ELEMENTS:
- Abstract light rays emanating from center
- Minimalist book icon or wisdom symbol in top-left corner (subtle, 15% opacity)
- Soft circular glow behind main title
- Thin gold accent lines (1px) framing the composition

STYLE:
- Modern, professional, trustworthy
- High contrast for social media readability
- Clean and uncluttered
- Conveys wisdom, guidance, and philosophy

OUTPUT:
- Exact dimensions: 1200 x 630 pixels
- High quality, web-optimized
- Suitable for Facebook, Twitter, LinkedIn sharing
""",
    
    'chinese_style': """
Design an elegant Open Graph image (1200x630 pixels) blending Chinese traditional aesthetics with modern design for a philosophy blog.

BACKGROUND:
- Ink wash painting style gradient: deep ink blue #1e293b to dark teal #0f766e
- Subtle mountain silhouette in background (very faint, 10% opacity)
- Misty atmosphere effect

MAIN TITLE:
- Text: "哲学的花园导游"
- Style: Semi-calligraphic Chinese font (elegant but readable)
- Color: White #ffffff with gold outline
- Size: 85px
- Position: Upper-center, 130px from top

SUBTITLE:
- Text: "郭春林的智慧分享"
- Font: Clean modern Chinese font
- Color: Soft white #f0f9ff
- Size: 38px
- Position: Below main title

DECORATIVE ELEMENTS:
- Elegant bamboo silhouette on left side (subtle, 20% opacity)
- Traditional cloud pattern (祥云) in corners (very subtle)
- Red seal stamp (印章) in bottom-right with "郭春林" (authentic Chinese style)
- Thin gold border (2px) with rounded corners

AUTHOR SIGNATURE:
- Red seal stamp effect: 80x80px
- Position: Bottom-right corner, 50px from edges
- Traditional seal script style

MOOD:
- Serene, wise, cultured
- Balance of tradition and modernity
- Sophisticated and inviting

TECHNICAL:
- Dimensions: 1200 x 630 pixels (exact)
- High contrast for readability
- Optimized for social media platforms
""",
    
    'garden_theme': """
Create a metaphorical "garden guide" themed Open Graph image (1200x630 pixels) for a philosophy blog.

BACKGROUND:
- Abstract philosophical garden: geometric flowers and plants
- Color gradient: deep blue #1e3a8a to purple #6b21a8
- Stylized, not realistic - modern geometric interpretation

PATH ELEMENT:
- Golden glowing path winding through the center
- Represents the journey of wisdom
- Subtle glow effect on the path

MAIN TITLE:
- Text: "哲学的花园导游"
- Font: Elegant Chinese font
- Color: White #ffffff
- Size: 86px
- Position: Upper-center
- Slight arc following the path

SUBTITLE:
- Text: "让郭春林带你探索智慧之园"
- Color: Light gold #fde047
- Size: 38px
- Position: Along the golden path

GARDEN ELEMENTS:
- Geometric flowers (triangles, circles) in corners
- Abstract trees (simple shapes)
- All in subtle blues, purples, and golds
- 20-30% opacity for background elements

AUTHOR SIGN:
- Text: "导游：郭春林"
- Style: Like a garden sign post
- Color: Gold #fbbf24
- Position: Bottom-right
- Small decorative frame around it

MOOD:
- Inviting and guiding
- Mystical yet accessible
- Journey and exploration
- Wisdom as a beautiful garden

STYLE:
- Modern geometric art
- Balanced composition
- Clear focal point (the path)
- Metaphorical and artistic

SPECS:
- Size: 1200 x 630 pixels
- Vibrant but not overwhelming
- Clear text hierarchy
- Perfect for brand identity
""",
    
    'simple': """
1200x630像素Open Graph图片。深蓝渐变背景(#1e3a8a到#3b82f6)。白色大标题"哲学的花园导游"居中。副标题"跟随郭春林，探索智慧人生"白色居中。金色作者名"郭春林"右下角。简约智慧符号装饰。专业现代风格。高对比度。
"""
}


def check_api_key():
    """检查API密钥"""
    if not API_KEY:
        print("❌ 错误: 未找到GEMINI_API_KEY环境变量")
        print("\n请设置API密钥:")
        print("   export GEMINI_API_KEY='your-api-key'")
        print("\n或创建 .env 文件:")
        print("   GEMINI_API_KEY=your-api-key")
        return False
    return True


def generate_image(prompt_type='professional', output_path=None):
    """
    生成Open Graph图片
    
    Args:
        prompt_type: 提示词类型 ('professional', 'chinese_style', 'garden_theme', 'simple')
        output_path: 输出路径，默认为 public/images/og-default.jpg
    """
    if not check_api_key():
        return False
    
    if output_path is None:
        output_path = OUTPUT_PATH
    
    # 确保输出目录存在
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"🎨 开始生成Open Graph图片...")
    print(f"📝 使用提示词类型: {prompt_type}")
    
    try:
        # 配置API
        genai.configure(api_key=API_KEY)
        
        # 获取提示词
        prompt = PROMPTS.get(prompt_type, PROMPTS['professional'])
        
        print(f"🤖 调用Gemini API...")
        
        # 使用Imagen 3生成图片
        model = genai.GenerativeModel('imagen-3.0-generate-001')
        
        response = model.generate_images(
            prompt=prompt,
            number_of_images=1,
            safety_settings={
                'block_none': True
            }
        )
        
        if not response.images:
            print("❌ 错误: API未返回图片")
            return False
        
        print(f"✅ 图片生成成功")
        print(f"🔧 调整尺寸到 {TARGET_SIZE[0]}x{TARGET_SIZE[1]}...")
        
        # 获取图片数据
        image_data = response.images[0]._pil_image
        
        # 调整到精确尺寸
        image_resized = image_data.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
        
        # 保存图片
        image_resized.save(
            output_path,
            'JPEG',
            quality=90,
            optimize=True
        )
        
        # 获取文件大小
        file_size = output_path.stat().st_size
        file_size_kb = file_size / 1024
        
        print(f"✅ 图片已保存: {output_path}")
        print(f"📏 尺寸: {TARGET_SIZE[0]} x {TARGET_SIZE[1]} 像素")
        print(f"💾 大小: {file_size_kb:.1f} KB")
        
        if file_size_kb > 500:
            print(f"⚠️  警告: 文件大小超过500KB，建议压缩")
        
        print(f"\n🎉 完成！现在可以部署网站了。")
        print(f"\n📋 下一步:")
        print(f"   1. 验证图片: open {output_path}")
        print(f"   2. 提交代码: git add {output_path}")
        print(f"   3. 部署后验证: https://developers.facebook.com/tools/debug/")
        
        return True
        
    except Exception as e:
        print(f"❌ 错误: {str(e)}")
        print(f"\n💡 建议:")
        print(f"   1. 检查API密钥是否正确")
        print(f"   2. 检查网络连接")
        print(f"   3. 尝试使用简化提示词: --type simple")
        return False


def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='生成Open Graph社交分享图片',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 使用默认专业风格
  python generate_og_image.py
  
  # 使用中国风格
  python generate_og_image.py --type chinese_style
  
  # 使用花园主题
  python generate_og_image.py --type garden_theme
  
  # 使用简化提示词
  python generate_og_image.py --type simple
  
  # 指定输出路径
  python generate_og_image.py --output custom-og.jpg

可用的提示词类型:
  professional    - 专业简约风格（推荐）
  chinese_style   - 中国风雅致风格
  garden_theme    - 花园导游主题
  simple          - 超简化版本
        """
    )
    
    parser.add_argument(
        '--type',
        choices=['professional', 'chinese_style', 'garden_theme', 'simple'],
        default='professional',
        help='提示词类型（默认: professional）'
    )
    
    parser.add_argument(
        '--output',
        type=Path,
        default=OUTPUT_PATH,
        help=f'输出路径（默认: {OUTPUT_PATH}）'
    )
    
    parser.add_argument(
        '--list-types',
        action='store_true',
        help='列出所有可用的提示词类型'
    )
    
    args = parser.parse_args()
    
    if args.list_types:
        print("📋 可用的提示词类型:\n")
        print("1. professional    - 专业简约风格（推荐）")
        print("   深蓝渐变背景，白色标题，金色作者名，现代专业")
        print()
        print("2. chinese_style   - 中国风雅致风格")
        print("   水墨画风格，书法字体，红色印章，传统优雅")
        print()
        print("3. garden_theme    - 花园导游主题")
        print("   几何花园，金色小路，最贴合品牌名称")
        print()
        print("4. simple          - 超简化版本")
        print("   最简单的提示词，生成速度最快")
        return
    
    print("=" * 60)
    print("🎨 Open Graph图片生成器")
    print("=" * 60)
    print()
    
    success = generate_image(args.type, args.output)
    
    if not success:
        sys.exit(1)


if __name__ == '__main__':
    main()
