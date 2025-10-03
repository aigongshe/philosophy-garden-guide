# Open Graph优化指南

## 📋 当前状态

### ✅ 已实现
- Open Graph基础标签（og:title, og:description, og:image, og:url）
- Twitter Card支持
- 动态元数据生成
- 文章特定标签（published_time, author, section）

### ⚠️ 待完善
- 默认OG图片（og-default.jpg）
- 图片尺寸优化
- 社交媒体预览测试

---

## 🎨 Open Graph图片规范

### 推荐尺寸
- **Facebook/LinkedIn**: 1200 x 630 像素
- **Twitter**: 1200 x 675 像素（16:9）
- **通用**: 1200 x 630 像素（最佳兼容性）

### 文件要求
- 格式: JPG 或 PNG
- 大小: < 8MB（推荐 < 1MB）
- 位置: `public/images/og-default.jpg`

### 设计建议
1. **品牌元素**
   - 网站名称: "哲学的花园导游"
   - 作者: "郭春林"
   - Logo或标志性图案

2. **文字内容**
   - 主标题: 清晰可读
   - 副标题: 简短有力
   - 避免过多文字

3. **视觉设计**
   - 使用品牌色彩
   - 高对比度
   - 简洁大方

---

## 🛠️ 实现细节

### SEOHead组件配置

```typescript
// components/SEOHead.tsx
<meta property="og:type" content="website" />
<meta property="og:title" content="页面标题" />
<meta property="og:description" content="页面描述" />
<meta property="og:image" content="https://www.guochunlin.com/images/og-default.jpg" />
<meta property="og:url" content="https://www.guochunlin.com" />
<meta property="og:site_name" content="哲学的花园导游" />
<meta property="og:locale" content="zh_CN" />
```

### 配置文件

```typescript
// lib/config.ts
export const siteConfig = {
  seo: {
    defaultImage: '/images/og-default.jpg',
  },
}
```

---

## 🔍 验证工具

### 1. Facebook分享调试器
- URL: https://developers.facebook.com/tools/debug/
- 功能: 预览Facebook分享效果
- 使用: 输入页面URL，点击"调试"

### 2. Twitter Card验证器
- URL: https://cards-dev.twitter.com/validator
- 功能: 预览Twitter卡片效果
- 使用: 输入页面URL，查看预览

### 3. LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- 功能: 预览LinkedIn分享效果
- 使用: 输入页面URL，查看预览

### 4. Open Graph检查器
- URL: https://www.opengraph.xyz/
- 功能: 全面检查OG标签
- 使用: 输入页面URL，查看详细报告

---

## 📝 创建OG图片步骤

### 方式1: 使用Canva（推荐）

1. 访问 https://www.canva.com/
2. 搜索 "Open Graph" 或 "Social Media Post"
3. 选择 1200 x 630 尺寸模板
4. 添加内容:
   - 网站名称: "哲学的花园导游"
   - 作者: "郭春林"
   - 标语: "跟随郭春林，探索哲学智慧"
5. 导出为JPG格式
6. 保存为 `og-default.jpg`

### 方式2: 使用Figma

1. 创建 1200 x 630 画布
2. 设计图片内容
3. 导出为JPG
4. 保存到 `public/images/`

### 方式3: 使用在线工具

- https://www.bannerbear.com/
- https://www.placeit.net/
- https://www.crello.com/

---

## 🚀 部署后验证清单

### 基础验证
- [ ] 图片文件存在于 `public/images/og-default.jpg`
- [ ] 图片尺寸为 1200 x 630
- [ ] 图片大小 < 1MB
- [ ] 图片可通过URL访问

### 元数据验证
- [ ] og:title 正确显示
- [ ] og:description 正确显示
- [ ] og:image URL 完整且可访问
- [ ] og:url 指向正确页面
- [ ] og:type 设置正确

### 社交媒体测试
- [ ] Facebook分享预览正常
- [ ] Twitter卡片显示正常
- [ ] LinkedIn分享预览正常
- [ ] 微信分享预览正常（如适用）

---

## 🎯 优化建议

### 1. 动态OG图片
为不同页面生成不同的OG图片：

```typescript
// 文章页面
og:image = `/images/posts/${slug}-og.jpg`

// 分类页面
og:image = `/images/categories/${category}-og.jpg`

// 首页
og:image = `/images/og-default.jpg`
```

### 2. 图片优化
- 使用WebP格式（带JPG后备）
- 压缩图片大小
- 使用CDN加速

### 3. A/B测试
- 测试不同设计风格
- 分析点击率
- 优化转化效果

---

## 📊 监控指标

### 关键指标
- 社交媒体分享次数
- 点击率（CTR）
- 页面访问来源
- 用户停留时间

### 工具推荐
- Google Analytics
- Facebook Insights
- Twitter Analytics
- LinkedIn Analytics

---

## 🔧 故障排除

### 问题1: 图片不显示
**原因**: 图片路径错误或文件不存在
**解决**: 
```bash
# 检查文件是否存在
ls -la public/images/og-default.jpg

# 检查URL是否可访问
curl -I https://www.guochunlin.com/images/og-default.jpg
```

### 问题2: 缓存问题
**原因**: 社交媒体平台缓存了旧内容
**解决**:
- 使用Facebook调试器刷新缓存
- 添加版本号: `og-default.jpg?v=2`
- 等待24-48小时自动更新

### 问题3: 图片尺寸不对
**原因**: 图片尺寸不符合规范
**解决**:
```bash
# 使用ImageMagick调整尺寸
convert og-default.jpg -resize 1200x630! og-default-resized.jpg
```

---

## 📚 参考资源

### 官方文档
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing](https://developers.facebook.com/docs/sharing/webmasters)

### 设计资源
- [OG Image Gallery](https://www.ogimage.gallery/)
- [Social Sizes](https://www.socialsizes.io/)
- [Meta Tags](https://metatags.io/)

### 工具推荐
- [OG Image Generator](https://og-image.vercel.app/)
- [Social Share Preview](https://socialsharepreview.com/)
- [Meta Tags Checker](https://metatags.io/)

---

## ✅ 完成标准

### 最低要求
- ✅ 默认OG图片存在
- ✅ 所有页面包含OG标签
- ✅ 图片尺寸符合规范
- ✅ 至少通过一个验证工具测试

### 理想状态
- ✅ 每个页面有独特OG图片
- ✅ 图片经过优化压缩
- ✅ 通过所有主流平台验证
- ✅ 监控分享数据并持续优化

---

**更新时间**: 2025-10-03  
**状态**: 待完善（需添加og-default.jpg图片）
