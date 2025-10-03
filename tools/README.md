# Tools目录说明

## 📁 核心文件

### 最终结果
- `cn_郭春林_seo_results_20251003_141427.json` - 439个视频的中文SEO内容
- `en_郭春林_seo_results_20251003_141427.json` - 439个视频的英文SEO内容
- `processing_report_20251003_141427.json` - 完整处理报告

### 核心脚本
- `video_seo_generator_gemini.py` - 主程序（使用Gemini 2.5 Flash）
- `test_setup.py` - 环境测试脚本
- `check_status.py` - 状态检查脚本

### 文档
- `README_GEMINI.md` - 完整使用指南
- `config_example.env` - 配置文件示例

## 📊 参考文件

- `COMPARISON.md` - Claude vs Gemini详细对比
- `哲学与ai_results_processed.json` - JSON格式参考

## 🚀 快速开始

```bash
# 1. 设置API密钥
export GOOGLE_API_KEY="your-api-key"

# 2. 测试环境
python3 tools/test_setup.py

# 3. 运行生成器
python3 tools/video_seo_generator_gemini.py \
  --video-dir "orignal/郭春林哲学智慧" \
  --subtitle-dir "orignal/orinal_txt_md" \
  --output-dir "tools"
```

## 📈 项目成果

- ✅ 成功处理439个视频
- ✅ 生成中英文双语SEO内容
- ✅ 总成本: $0.53
- ✅ vs Claude节省98%

详见 `README_GEMINI.md`
