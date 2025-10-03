#!/bin/bash
# Open Graph图片设置脚本

echo "======================================"
echo "Open Graph图片设置"
echo "======================================"
echo ""

# 创建images目录
mkdir -p public/images

# 检查是否有og-default图片
if [ ! -f "public/images/og-default.jpg" ]; then
    echo "⚠️  未找到 og-default.jpg"
    echo ""
    echo "请执行以下操作之一："
    echo ""
    echo "1. 手动添加图片:"
    echo "   - 将图片命名为 og-default.jpg"
    echo "   - 放置到 public/images/ 目录"
    echo "   - 推荐尺寸: 1200x630 像素"
    echo ""
    echo "2. 使用在线工具生成:"
    echo "   - https://www.canva.com/ (推荐)"
    echo "   - https://www.figma.com/"
    echo "   - 搜索 'Open Graph Image Template'"
    echo ""
    echo "3. 图片内容建议:"
    echo "   - 网站名称: 哲学的花园导游"
    echo "   - 作者: 郭春林"
    echo "   - 简短标语或核心理念"
    echo "   - 使用品牌色彩"
    echo ""
else
    echo "✅ og-default.jpg 已存在"
    
    # 检查图片尺寸
    if command -v identify &> /dev/null; then
        size=$(identify -format "%wx%h" public/images/og-default.jpg 2>/dev/null)
        echo "   尺寸: $size"
        
        # 检查是否符合推荐尺寸
        if [ "$size" = "1200x630" ]; then
            echo "   ✅ 尺寸符合Open Graph标准"
        else
            echo "   ⚠️  推荐尺寸: 1200x630 (当前: $size)"
        fi
    fi
fi

echo ""
echo "======================================"
echo "Open Graph验证"
echo "======================================"
echo ""
echo "部署后，使用以下工具验证:"
echo ""
echo "1. Facebook分享调试器:"
echo "   https://developers.facebook.com/tools/debug/"
echo ""
echo "2. Twitter Card验证器:"
echo "   https://cards-dev.twitter.com/validator"
echo ""
echo "3. LinkedIn Post Inspector:"
echo "   https://www.linkedin.com/post-inspector/"
echo ""
echo "4. Open Graph检查器:"
echo "   https://www.opengraph.xyz/"
echo ""
echo "======================================"
