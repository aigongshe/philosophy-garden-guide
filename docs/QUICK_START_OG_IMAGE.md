# 🚀 Open Graph图片生成 - 5分钟快速指南

**目标**: 为"哲学的花园导游"网站生成1200x630像素的社交分享图片

---

## ⚡ 最快方法（推荐）

### 步骤1: 复制提示词（10秒）

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

### 步骤2: 生成图片（1分钟）

1. 访问: https://aistudio.google.com/
2. 选择 "Image Generation" 或 "Imagen 3"
3. 粘贴上面的提示词
4. 点击 "Generate"
5. 等待30-60秒

### 步骤3: 下载保存（30秒）

1. 下载生成的图片
2. 重命名为 `og-default.jpg`
3. 移动到项目目录

```bash
mv ~/Downloads/generated-image.jpg public/images/og-default.jpg
```

### 步骤4: 验证（30秒）

```bash
# 检查文件
ls -lh public/images/og-default.jpg

# 验证尺寸
sips -g pixelWidth -g pixelHeight public/images/og-default.jpg

# 应该显示: 1200 x 630
```

---

## 🎨 备选方案（如果上面不满意）

### 超简化提示词

```
1200x630像素Open Graph图片。深蓝渐变背景。白色大标题"哲学的花园导游"居中。副标题"跟随郭春林，探索智慧人生"。金色作者名"郭春林"右下角。专业现代风格。
```

### 中国风提示词

```
1200x630像素Open Graph图片，中国风格。水墨画风格背景，深蓝色调。书法风格标题"哲学的花园导游"，白色或金色。副标题"郭春林的智慧分享"。右下角红色印章效果，写"郭春林"。淡雅竹子或梅花装饰。优雅专业。
```

### 花园主题提示词

```
1200x630像素Open Graph图片，花园导游主题。抽象几何花园背景，深蓝到紫色渐变。金色发光小路穿过中心。标题"哲学的花园导游"沿路径排列，白色。副标题"让郭春林带你探索智慧之园"，金色。右下角"导游：郭春林"如同花园标牌。现代几何艺术风格。
```

---

## 🛠️ 使用Canva（最简单，无需AI）

1. 访问: https://www.canva.com/
2. 搜索: "1200 x 630"
3. 选择空白模板
4. 添加元素:
   - 背景: 深蓝色渐变 (#1e3a8a → #3b82f6)
   - 主标题: "哲学的花园导游" (白色, 90px, 粗体)
   - 副标题: "跟随郭春林，探索智慧人生" (白色, 42px)
   - 英文: "Philosophy Garden Guide" (浅蓝, 30px)
   - 作者: "郭春林" (金色 #fbbf24, 38px, 右下)
5. 下载为JPG
6. 重命名为 `og-default.jpg`

**预计时间**: 5-10分钟

---

## ✅ 完成检查清单

- [ ] 图片尺寸精确为 1200 x 630 像素
- [ ] 文件名为 `og-default.jpg`
- [ ] 文件位于 `public/images/` 目录
- [ ] 文件大小 < 500KB
- [ ] 文字清晰可读
- [ ] 整体美观专业

---

## 🌐 部署后验证

### 验证工具

1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/
4. **通用**: https://www.opengraph.xyz/

### 验证步骤

1. 部署网站
2. 访问上面任一验证工具
3. 输入你的网站URL
4. 查看预览效果
5. 确认图片正确显示

---

## 🎯 设计要点

### 必须包含
- ✅ 网站名称: "哲学的花园导游"
- ✅ 作者: "郭春林"
- ✅ 副标题或标语
- ✅ 1200x630像素尺寸

### 推荐配色
- **主色**: 深蓝 #1e3a8a
- **辅色**: 亮蓝 #3b82f6
- **强调**: 金色 #fbbf24
- **文字**: 白色 #ffffff

### 设计原则
- 简洁清晰
- 高对比度
- 文字优先
- 品牌一致

---

## 💡 快速决策

### 如果你想要...

- **最快生成** → 使用超简化提示词
- **最佳效果** → 使用完整提示词（步骤1）
- **最简单** → 使用Canva
- **中国风** → 使用中国风提示词
- **品牌契合** → 使用花园主题提示词

---

## 🚨 常见问题

**Q: 尺寸不对怎么办？**
```bash
sips -z 630 1200 input.jpg --out og-default.jpg
```

**Q: 文件太大怎么办？**
```bash
sips -s format jpeg -s formatOptions 85 og-default.jpg
```

**Q: 生成失败怎么办？**
使用超简化提示词或Canva

---

## 🎉 完成！

完成后运行:

```bash
bash scripts/setup-og-images.sh
```

这将验证你的设置并提供反馈。

---

**预计总时间**: 5-10分钟  
**难度**: ⭐⭐ (简单)  
**推荐方法**: Google AI Studio + 完整提示词  

**祝你成功！** 🚀
