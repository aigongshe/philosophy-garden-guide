#!/bin/bash

# 简单的网站监控脚本
# 每日运行一次即可

echo "=== 网站监控报告 $(date) ==="

# 1. 检查网站是否在线
echo "1. 网站连通性检查："
if curl -s -I https://www.guochunlin.com/ | grep -q "200"; then
    echo "✅ 网站正常运行"
else
    echo "❌ 网站可能有问题"
fi

# 2. 检查关键页面
echo -e "\n2. 关键页面检查："
pages=("/" "/seo-dashboard" "/keyword-analyzer" "/api/robots" "/api/sitemap")

for page in "${pages[@]}"; do
    if curl -s -I "https://www.guochunlin.com$page" | grep -q "200"; then
        echo "✅ $page 正常"
    else
        echo "❌ $page 有问题"
    fi
done

# 3. 检查页面加载速度
echo -e "\n3. 首页加载速度："
load_time=$(curl -o /dev/null -s -w "%{time_total}" https://www.guochunlin.com/)
echo "首页加载时间: ${load_time}秒"

if (( $(echo "$load_time < 3.0" | bc -l) )); then
    echo "✅ 加载速度良好"
else
    echo "⚠️ 加载速度较慢，需要优化"
fi

# 4. 检查SEO基础设施
echo -e "\n4. SEO基础检查："
if curl -s https://www.guochunlin.com/api/robots | grep -q "User-agent"; then
    echo "✅ robots.txt 正常"
else
    echo "❌ robots.txt 有问题"
fi

if curl -s https://www.guochunlin.com/api/sitemap | grep -q "urlset"; then
    echo "✅ sitemap.xml 正常"
else
    echo "❌ sitemap.xml 有问题"
fi

echo -e "\n=== 监控完成 ==="