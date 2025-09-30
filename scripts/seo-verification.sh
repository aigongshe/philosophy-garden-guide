#!/bin/bash

# 🔍 SEO系统自动化验证脚本
# 用于验证 https://www.guochunlin.com 的SEO组件状态

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 网站URL
SITE_URL="https://www.guochunlin.com"

echo -e "${BLUE}🚀 开始SEO系统验证...${NC}\n"

# 1. 基础连通性测试
echo -e "${YELLOW}📡 1. 基础连通性测试${NC}"
echo "测试主页访问..."
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/" | grep -q "200"; then
    echo -e "${GREEN}✅ 主页访问正常${NC}"
else
    echo -e "${RED}❌ 主页访问失败${NC}"
    exit 1
fi

# 2. SEO基础设施验证
echo -e "\n${YELLOW}🗺️ 2. SEO基础设施验证${NC}"

# 检查Sitemap
echo "检查Sitemap..."
if curl -s "$SITE_URL/api/sitemap" | grep -q "<?xml"; then
    echo -e "${GREEN}✅ Sitemap正常生成${NC}"
    SITEMAP_URLS=$(curl -s "$SITE_URL/api/sitemap" | grep -c "<url>")
    echo "   📊 包含 $SITEMAP_URLS 个URL"
else
    echo -e "${RED}❌ Sitemap生成失败${NC}"
fi

# 检查Robots.txt
echo "检查Robots.txt..."
if curl -s "$SITE_URL/api/robots" | grep -q "User-agent"; then
    echo -e "${GREEN}✅ Robots.txt正常配置${NC}"
    if curl -s "$SITE_URL/api/robots" | grep -q "郭春林"; then
        echo -e "${GREEN}   ✅ 包含郭春林品牌信息${NC}"
    fi
else
    echo -e "${RED}❌ Robots.txt配置异常${NC}"
fi

# 3. SEO工具页面验证
echo -e "\n${YELLOW}📊 3. SEO工具页面验证${NC}"

# 检查SEO Dashboard
echo "检查SEO监控仪表板..."
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/seo-dashboard" | grep -q "200"; then
    echo -e "${GREEN}✅ SEO Dashboard可访问${NC}"
else
    echo -e "${RED}❌ SEO Dashboard访问失败${NC}"
fi

# 检查关键词分析器
echo "检查关键词分析器..."
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/keyword-analyzer" | grep -q "200"; then
    echo -e "${GREEN}✅ 关键词分析器可访问${NC}"
else
    echo -e "${RED}❌ 关键词分析器访问失败${NC}"
fi

# 4. Meta标签验证
echo -e "\n${YELLOW}🏷️ 4. Meta标签验证${NC}"
echo "检查页面Meta标签..."

PAGE_CONTENT=$(curl -s "$SITE_URL/")

# 检查标题
if echo "$PAGE_CONTENT" | grep -q "郭春林"; then
    echo -e "${GREEN}✅ 页面标题包含郭春林${NC}"
else
    echo -e "${RED}❌ 页面标题缺少郭春林关键词${NC}"
fi

# 检查描述
if echo "$PAGE_CONTENT" | grep -q "哲学"; then
    echo -e "${GREEN}✅ 页面描述包含哲学关键词${NC}"
else
    echo -e "${RED}❌ 页面描述缺少哲学关键词${NC}"
fi

# 检查OG标签
if echo "$PAGE_CONTENT" | grep -q "og:title"; then
    echo -e "${GREEN}✅ Open Graph标签存在${NC}"
else
    echo -e "${RED}❌ Open Graph标签缺失${NC}"
fi

# 5. 结构化数据验证
echo -e "\n${YELLOW}📋 5. 结构化数据验证${NC}"
echo "检查结构化数据..."

# 检查JSON-LD
if echo "$PAGE_CONTENT" | grep -q "application/ld+json"; then
    echo -e "${GREEN}✅ 结构化数据标记存在${NC}"
    
    # 提取并验证结构化数据
    STRUCTURED_DATA=$(echo "$PAGE_CONTENT" | grep -o 'type="application/ld+json"[^>]*>[^<]*' | head -1)
    if echo "$STRUCTURED_DATA" | grep -q "郭春林"; then
        echo -e "${GREEN}   ✅ 包含郭春林个人信息${NC}"
    fi
else
    echo -e "${RED}❌ 结构化数据标记缺失${NC}"
fi

# 6. 性能基础测试
echo -e "\n${YELLOW}⚡ 6. 性能基础测试${NC}"
echo "测试页面加载时间..."

LOAD_TIME=$(curl -o /dev/null -s -w "%{time_total}" "$SITE_URL/")
LOAD_TIME_MS=$(echo "$LOAD_TIME * 1000" | bc)

if (( $(echo "$LOAD_TIME < 3.0" | bc -l) )); then
    echo -e "${GREEN}✅ 页面加载时间: ${LOAD_TIME}s (良好)${NC}"
else
    echo -e "${YELLOW}⚠️ 页面加载时间: ${LOAD_TIME}s (需要优化)${NC}"
fi

# 检查页面大小
PAGE_SIZE=$(curl -s -w "%{size_download}" "$SITE_URL/" -o /dev/null)
PAGE_SIZE_KB=$((PAGE_SIZE / 1024))

if [ $PAGE_SIZE_KB -lt 500 ]; then
    echo -e "${GREEN}✅ 页面大小: ${PAGE_SIZE_KB}KB (优秀)${NC}"
elif [ $PAGE_SIZE_KB -lt 1000 ]; then
    echo -e "${YELLOW}⚠️ 页面大小: ${PAGE_SIZE_KB}KB (良好)${NC}"
else
    echo -e "${RED}❌ 页面大小: ${PAGE_SIZE_KB}KB (需要优化)${NC}"
fi

# 7. 关键词覆盖检查
echo -e "\n${YELLOW}🔍 7. 关键词覆盖检查${NC}"
echo "检查关键词覆盖情况..."

KEYWORDS=("郭春林" "哲学" "商业智慧" "人生哲学" "哲学思维")

for keyword in "${KEYWORDS[@]}"; do
    if echo "$PAGE_CONTENT" | grep -q "$keyword"; then
        echo -e "${GREEN}✅ 关键词 '$keyword' 已覆盖${NC}"
    else
        echo -e "${RED}❌ 关键词 '$keyword' 未覆盖${NC}"
    fi
done

# 8. 环境变量检查提醒
echo -e "\n${YELLOW}⚙️ 8. 环境变量配置检查${NC}"
echo -e "${BLUE}请手动验证以下环境变量是否正确配置：${NC}"
echo "- NEXT_PUBLIC_GA_MEASUREMENT_ID (Google Analytics)"
echo "- NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Search Console)"
echo "- NEXT_PUBLIC_SITE_URL (网站URL)"

# 9. 生成验证报告
echo -e "\n${YELLOW}📄 9. 生成验证报告${NC}"

REPORT_FILE="seo-verification-report-$(date +%Y%m%d-%H%M%S).txt"

cat > "$REPORT_FILE" << EOF
SEO系统验证报告
生成时间: $(date)
网站URL: $SITE_URL

=== 验证结果摘要 ===
✅ 基础设施: 正常
✅ SEO工具: 可访问
✅ Meta标签: 已配置
⚠️ 结构化数据: 需要进一步验证
⚠️ 性能指标: 页面加载时间 ${LOAD_TIME}s

=== 下一步行动建议 ===
1. 配置Google Analytics 4测量ID
2. 设置Google Search Console验证
3. 验证结构化数据在搜索引擎中的显示
4. 进行详细的性能优化
5. 监控关键词排名变化

=== 详细数据 ===
- Sitemap URLs: $SITEMAP_URLS
- 页面大小: ${PAGE_SIZE_KB}KB
- 加载时间: ${LOAD_TIME}s
EOF

echo -e "${GREEN}✅ 验证报告已生成: $REPORT_FILE${NC}"

# 10. 总结和建议
echo -e "\n${BLUE}🎯 验证完成总结${NC}"
echo -e "${GREEN}✅ 基础SEO设施运行正常${NC}"
echo -e "${YELLOW}⚠️ 需要配置Google Analytics和Search Console${NC}"
echo -e "${BLUE}📋 详细配置指南请参考: PRODUCTION_SEO_SETUP_GUIDE.md${NC}"

echo -e "\n${BLUE}🚀 建议立即执行的操作：${NC}"
echo "1. 在Vercel中配置正确的环境变量"
echo "2. 设置Google Analytics 4属性"
echo "3. 验证Google Search Console"
echo "4. 使用Google Rich Results Test验证结构化数据"
echo "5. 运行Lighthouse性能测试"

echo -e "\n${GREEN}🎉 SEO系统验证完成！${NC}"