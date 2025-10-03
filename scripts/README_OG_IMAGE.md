# 🎨 Open Graph图片生成工具

自动生成1200x630像素的社交媒体分享图片

---

## 🚀 快速开始

### 方法1: 使用Python脚本（自动化）

```bash
# 1. 安装依赖
pip install google-generativeai pillow

# 2. 设置API密钥
export GEMINI_API_KEY='your-api-key'

# 3. 生成图片（使用默认专业风格）
python scripts/generate_og_image.py

# 完成！图片已保存到 public/images/og-default.jpg
```

### 方法2: 使用Google AI Studio（手动）

```bash
# 1. 访问 https://aistudio.google.com/

# 2. 复制提示词（见下方）

# 3. 生成并下载图片

# 4. 移动到正确位置
mv ~/Downloads/generated-image.jpg public/images/og-default.jpg
```

---

## 📝 提示词选择

### 🌟 推荐: 专业简约风格

```bash
python scripts/generate_og_image.py --type professional
```

**特点**: 深蓝渐变，白色标题，金色作者名，现代专业

### 🎨 中国风雅致风格

```bash
python scripts/generate_og_image.py --type chinese_style
```

**特点**: 水墨画风格，书法字体，红色印章，传统优雅

### 🌺 花园导游主题

```bash
python scripts/generate_og_image.py --type garden_theme
```

**特点**: 几何花园，金色小路，最贴合品牌名称

### ⚡ 超简化版本

```bash
python scripts/generate_og_image.py --type simple
```

**特点**: 最简单的提示词，生成速度最快

---

## 🛠️ 安装配置

### 1. 安装Python依赖

```bash
pip install google-generativeai pillow
```

### 2. 获取API密钥

1. 访问: https://aistudio.google.com/app/apikey
2. 点击 "Create API Key"
3. 复制生成的密钥

### 3. 配置环境变量

**方法A: 临时设置**
```bash
export GEMINI_API_KEY='your-api-key-here'
```

**方法B: 使用.env文件**
```bash
# 复制示例文件
cp scripts/.env.example scripts/.env

# 编辑.env文件，填入你的API密钥
nano scripts/.env
```

**方法C: 添加到shell配置**
```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

---

## 📖 使用指南

### 基本用法

```bash
# 使用默认设置（专业风格）
python scripts/generate_og_image.py

# 指定风格
python scripts/generate_og_image.py --type chinese_style

# 指定输出路径
python scripts/generate_og_image.py --output custom-og.jpg

# 查看所有可用风格
python scripts/generate_og_image.py --list-types
```

### 高级用法

```bash
# 生成多个版本进行对比
python scripts/generate_og_image.py --type professional --output og-v1.jpg
python scripts/generate_og_image.py --type chinese_style --output og-v2.jpg
python scripts/generate_og_image.py --type garden_theme --output og-v3.jpg

# 查看生成的图片
open og-v1.jpg og-v2.jpg og-v3.jpg

# 选择最佳版本
cp og-v1.jpg public/images/og-default.jpg
```

---

## ✅ 验证检查

### 本地验证

```bash
# 检查文件是否存在
ls -lh public/images/og-default.jpg

# 验证图片尺寸
sips -g pixelWidth -g pixelHeight public/images/og-default.jpg

# 应该显示:
# pixelWidth: 1200
# pixelHeight: 630

# 查看图片
open public/images/og-default.jpg
```

### 部署后验证

1. **Facebook分享调试器**
   ```
   https://developers.facebook.com/tools/debug/
   ```

2. **Twitter Card验证器**
   ```
   https://cards-dev.twitter.com/validator
   ```

3. **LinkedIn Post Inspector**
   ```
   https://www.linkedin.com/post-inspector/
   ```

4. **通用OG检查器**
   ```
   https://www.opengraph.xyz/
   ```

---

## 🎨 手动生成（使用AI Studio）

如果不想使用Python脚本，可以手动生成：

### 步骤1: 复制提示词

**专业简约风格（推荐）**:
```
Create a professional Open Graph image, exactly 1200x630 pixels, for a Chinese philosophy blog.

BACKGROUND:
- Deep blue gradient: top #1e3a8a to bottom #3b82f6
- Subtle abstract geometric patterns suggesting wisdom
- Soft glow effect in center

MAIN TITLE (Top-Center):
- Text: "哲学的花园导游"
- Font: Elegant Chinese serif
- Color: White #ffffff
- Size: 90px, Bold
- Position: Centered, 120px from top

SUBTITLE (Middle):
- Text: "跟随郭春林，探索智慧人生"
- Font: Clean Chinese sans-serif
- Color: White #ffffff, 85% opacity
- Size: 42px
- Position: Centered, below main title

ENGLISH SUBTITLE:
- Text: "Philosophy Garden Guide"
- Font: Modern sans-serif
- Color: Light blue #93c5fd
- Size: 30px
- Position: Centered, below Chinese subtitle

AUTHOR (Bottom-Right):
- Text: "郭春林"
- Color: Gold #fbbf24
- Size: 38px
- Position: 60px from bottom, 100px from right

STYLE: Modern, professional, high contrast, clean
OUTPUT: 1200 x 630 pixels, web-optimized
```

### 步骤2: 生成图片

1. 访问: https://aistudio.google.com/
2. 选择 "Image Generation"
3. 粘贴提示词
4. 点击 "Generate"
5. 等待30-60秒

### 步骤3: 下载保存

```bash
# 下载图片后
mv ~/Downloads/generated-image.jpg public/images/og-default.jpg

# 验证
ls -lh public/images/og-default.jpg
```

---

## 🔧 故障排除

### 问题1: API密钥错误

```
❌ 错误: 未找到GEMINI_API_KEY环境变量
```

**解决方案**:
```bash
# 检查环境变量
echo $GEMINI_API_KEY

# 如果为空，设置它
export GEMINI_API_KEY='your-api-key'

# 或使用.env文件
cp scripts/.env.example scripts/.env
# 编辑.env文件填入密钥
```

### 问题2: 缺少依赖

```
❌ 缺少必要的库
```

**解决方案**:
```bash
pip install google-generativeai pillow
```

### 问题3: 图片尺寸不对

```bash
# 手动调整尺寸
sips -z 630 1200 input.jpg --out og-default.jpg

# 或使用ImageMagick
convert input.jpg -resize 1200x630! og-default.jpg
```

### 问题4: 文件太大

```bash
# 压缩图片
sips -s format jpeg -s formatOptions 85 og-default.jpg

# 或使用ImageMagick
convert og-default.jpg -quality 85 og-default-compressed.jpg
```

### 问题5: 生成失败

**解决方案**:
1. 尝试使用简化提示词: `--type simple`
2. 检查网络连接
3. 验证API密钥是否有效
4. 查看API配额是否用完

---

## 💰 成本估算

### Gemini API定价

- **Imagen 3**: 约 $0.04 per image
- **每月免费额度**: 通常有一定免费配额

### 成本对比

| 方案 | 成本 | 时间 |
|------|------|------|
| 手动设计 | $50-200 | 2-4小时 |
| Canva Pro | $12.99/月 | 30分钟 |
| Gemini API | $0.04 | 1分钟 |
| **本脚本** | **$0.04** | **1分钟** |

---

## 📚 完整文档

- **终极指南**: `docs/GEMINI_IMAGE_PROMPT_ULTIMATE.md`
- **快速开始**: `docs/QUICK_START_OG_IMAGE.md`
- **OG优化**: `docs/OPEN_GRAPH_OPTIMIZATION.md`

---

## 🎯 最佳实践

### 设计建议

1. **保持简洁**: 3-4个元素足够
2. **文字优先**: 标题必须清晰
3. **高对比度**: 确保可读性
4. **品牌一致**: 使用网站配色

### 技术建议

1. **精确尺寸**: 必须是1200x630
2. **优化大小**: 保持在500KB以下
3. **格式选择**: JPG通常最好
4. **测试验证**: 多平台测试

### 内容建议

1. **价值主张**: 一眼看出网站主题
2. **建立信任**: 专业设计增加可信度
3. **吸引点击**: 使用吸引人的视觉
4. **文化适配**: 考虑目标受众

---

## 🚀 快速命令参考

```bash
# 安装
pip install google-generativeai pillow

# 配置
export GEMINI_API_KEY='your-key'

# 生成（专业风格）
python scripts/generate_og_image.py

# 生成（中国风）
python scripts/generate_og_image.py --type chinese_style

# 生成（花园主题）
python scripts/generate_og_image.py --type garden_theme

# 验证
ls -lh public/images/og-default.jpg
sips -g pixelWidth -g pixelHeight public/images/og-default.jpg

# 部署
git add public/images/og-default.jpg
git commit -m "Add Open Graph image"
git push
```

---

## 📞 获取帮助

```bash
# 查看帮助
python scripts/generate_og_image.py --help

# 列出所有风格
python scripts/generate_og_image.py --list-types
```

---

## 🎉 完成检查清单

- [ ] 安装了Python依赖
- [ ] 配置了API密钥
- [ ] 生成了图片
- [ ] 验证了尺寸（1200x630）
- [ ] 文件大小合适（<500KB）
- [ ] 图片清晰美观
- [ ] 移动到正确位置
- [ ] 提交到Git
- [ ] 部署到生产环境
- [ ] 使用验证工具测试

---

**预计时间**: 5-10分钟  
**难度**: ⭐⭐ (简单)  
**推荐方法**: Python脚本自动生成  

**祝你成功！** 🚀
