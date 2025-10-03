#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
视频SEO内容生成器 - Google Gemini 2.5 Flash版本

功能说明:
本脚本使用Google Gemini 2.5 Flash API自动为视频生成YouTube SEO优化内容。

主要功能:
1. 智能匹配视频文件和字幕文件
2. 使用Gemini 2.5 Flash API生成高质量SEO内容（标题、描述、关键词、摘要）
3. 生成中英文两个独立的JSON文件
4. 支持增量处理（跳过已处理的视频）
5. 完整的错误处理和日志记录

输入:
- 视频文件目录
- 字幕markdown文件目录

输出:
- cn_郭春林_seo_results_{timestamp}.json - 中文SEO内容
- en_郭春林_seo_results_{timestamp}.json - 英文SEO内容

使用示例:
```bash
# 基本使用
python video_seo_generator_gemini.py \
  --video-dir "orignal/郭春林哲学智慧" \
  --subtitle-dir "orignal/orinal_txt_md" \
  --output-dir "tools"

# 指定API密钥
python video_seo_generator_gemini.py \
  --video-dir "orignal/郭春林哲学智慧" \
  --subtitle-dir "orignal/orinal_txt_md" \
  --output-dir "tools" \
  --api-key "your-api-key"

# 限制处理数量（测试用）
python video_seo_generator_gemini.py \
  --video-dir "orignal/郭春林哲学智慧" \
  --subtitle-dir "orignal/orinal_txt_md" \
  --output-dir "tools" \
  --max-videos 5

# 强制重新处理所有视频
python video_seo_generator_gemini.py \
  --video-dir "orignal/郭春林哲学智慧" \
  --subtitle-dir "orignal/orinal_txt_md" \
  --output-dir "tools" \
  --force-reprocess
```

注意事项:
- 需要设置GOOGLE_API_KEY环境变量或通过--api-key参数提供
- Gemini 2.5 Flash具有更快的速度和更低的成本
- 建议先用--max-videos测试少量视频
- 生成的JSON文件可直接用于视频上传工具
"""

import os
import sys
import json
import logging
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime
import time
import re

# 尝试导入google-generativeai库
try:
    import google.generativeai as genai
except ImportError:
    print("错误: 未安装google-generativeai库")
    print("请运行: pip install google-generativeai")
    sys.exit(1)


class VideoSEOGenerator:
    """视频SEO内容生成器 - Gemini版本"""
    
    def __init__(
        self,
        video_dir: str,
        subtitle_dir: str,
        output_dir: str,
        api_key: Optional[str] = None,
        model_name: str = "gemini-2.0-flash-exp",
        max_videos: Optional[int] = None,
        force_reprocess: bool = False,
        log_level: str = "INFO"
    ):
        """
        初始化生成器
        
        Args:
            video_dir: 视频文件目录
            subtitle_dir: 字幕文件目录
            output_dir: 输出目录
            api_key: Google API密钥
            model_name: Gemini模型名称
            max_videos: 最大处理视频数量（用于测试）
            force_reprocess: 是否强制重新处理已存在的视频
            log_level: 日志级别
        """
        self.video_dir = Path(video_dir)
        self.subtitle_dir = Path(subtitle_dir)
        self.output_dir = Path(output_dir)
        self.model_name = model_name
        self.max_videos = max_videos
        self.force_reprocess = force_reprocess
        
        # 设置日志
        self._setup_logging(log_level)
        
        # 初始化Gemini客户端
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("未提供API密钥。请设置GOOGLE_API_KEY环境变量或使用--api-key参数")
        
        genai.configure(api_key=self.api_key)
        
        # 配置生成参数
        self.generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
        }
        
        # 安全设置
        self.safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE"
            },
        ]
        
        # 初始化模型
        self.model = genai.GenerativeModel(
            model_name=self.model_name,
            generation_config=self.generation_config,
            safety_settings=self.safety_settings
        )
        
        # 确保输出目录存在
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # 数据存储
        self.cn_seo_data = {}  # 中文SEO数据
        self.en_seo_data = {}  # 英文SEO数据
        
        # 统计信息
        self.stats = {
            "total_videos": 0,
            "total_subtitles": 0,
            "matched_pairs": 0,
            "processed": 0,
            "skipped": 0,
            "failed": 0,
            "api_calls": 0
        }
        
        self.logger.info(f"初始化完成 - 使用模型: {self.model_name}")
        self.logger.info(f"初始化完成 - 视频目录: {self.video_dir}")
        self.logger.info(f"初始化完成 - 字幕目录: {self.subtitle_dir}")
        self.logger.info(f"初始化完成 - 输出目录: {self.output_dir}")
    
    def _setup_logging(self, log_level: str):
        """设置日志配置"""
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        
        log_file = log_dir / f"video_seo_generator_gemini_{datetime.now().strftime('%Y%m%d')}.log"
        
        logging.basicConfig(
            level=getattr(logging, log_level.upper()),
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file, encoding='utf-8'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def find_video_subtitle_pairs(self) -> List[Tuple[Path, Path]]:
        """
        查找视频和字幕文件的匹配对
        
        Returns:
            匹配的(视频文件, 字幕文件)元组列表
        """
        self.logger.info("开始扫描视频和字幕文件...")
        
        # 获取所有视频文件
        video_files = list(self.video_dir.glob("*.mp4"))
        self.stats["total_videos"] = len(video_files)
        self.logger.info(f"找到 {len(video_files)} 个视频文件")
        
        # 获取所有字幕文件
        subtitle_files = list(self.subtitle_dir.glob("*.md"))
        self.stats["total_subtitles"] = len(subtitle_files)
        self.logger.info(f"找到 {len(subtitle_files)} 个字幕文件")
        
        # 创建字幕文件名映射（去除扩展名）
        subtitle_map = {f.stem: f for f in subtitle_files}
        
        # 匹配视频和字幕
        pairs = []
        for video_file in video_files:
            video_stem = video_file.stem
            
            # 尝试直接匹配
            if video_stem in subtitle_map:
                pairs.append((video_file, subtitle_map[video_stem]))
                self.logger.debug(f"匹配成功: {video_file.name} <-> {subtitle_map[video_stem].name}")
            else:
                self.logger.warning(f"未找到匹配字幕: {video_file.name}")
        
        self.stats["matched_pairs"] = len(pairs)
        self.logger.info(f"成功匹配 {len(pairs)} 对视频和字幕")
        
        return pairs
    
    def load_existing_results(self) -> Tuple[Dict, Dict]:
        """
        加载已存在的结果文件（用于增量处理）
        
        Returns:
            (中文数据, 英文数据)元组
        """
        cn_data = {}
        en_data = {}
        
        # 查找最新的结果文件
        cn_files = list(self.output_dir.glob("cn_郭春林_seo_results_*.json"))
        en_files = list(self.output_dir.glob("en_郭春林_seo_results_*.json"))
        
        if cn_files:
            latest_cn = max(cn_files, key=lambda p: p.stat().st_mtime)
            try:
                with open(latest_cn, 'r', encoding='utf-8') as f:
                    cn_data = json.load(f)
                self.logger.info(f"加载已存在的中文结果: {latest_cn.name} ({len(cn_data)} 条)")
            except Exception as e:
                self.logger.error(f"加载中文结果失败: {e}")
        
        if en_files:
            latest_en = max(en_files, key=lambda p: p.stat().st_mtime)
            try:
                with open(latest_en, 'r', encoding='utf-8') as f:
                    en_data = json.load(f)
                self.logger.info(f"加载已存在的英文结果: {latest_en.name} ({len(en_data)} 条)")
            except Exception as e:
                self.logger.error(f"加载英文结果失败: {e}")
        
        return cn_data, en_data

    def generate_seo_content_with_gemini(
        self,
        video_filename: str,
        subtitle_content: str,
        language: str = "cn"
    ) -> Dict[str, Any]:
        """
        使用Gemini API生成SEO内容
        
        Args:
            video_filename: 视频文件名
            subtitle_content: 字幕内容
            language: 语言 ("cn" 或 "en")
            
        Returns:
            包含SEO内容的字典
        """
        # 限制字幕长度（Gemini有更大的上下文窗口，但仍需控制）
        max_subtitle_length = 15000  # Gemini支持更长的输入
        if len(subtitle_content) > max_subtitle_length:
            subtitle_content = subtitle_content[:max_subtitle_length] + "\n...(内容已截断)"
        
        # 构建prompt
        if language == "cn":
            prompt = self._build_chinese_prompt(video_filename, subtitle_content)
        else:
            prompt = self._build_english_prompt(video_filename, subtitle_content)
        
        try:
            self.logger.info(f"调用Gemini API生成{language.upper()}内容: {video_filename}")
            
            # 使用Gemini生成内容
            response = self.model.generate_content(prompt)
            
            self.stats["api_calls"] += 1
            
            # 解析响应
            response_text = response.text
            seo_content = self._parse_gemini_response(response_text, language)
            
            self.logger.info(f"成功生成{language.upper()}内容: {video_filename}")
            return seo_content
            
        except Exception as e:
            self.logger.error(f"Gemini API调用失败 ({language}): {e}")
            raise
    
    def _build_chinese_prompt(self, video_filename: str, subtitle_content: str) -> str:
        """构建中文SEO生成prompt"""
        return f"""你是一位专业的YouTube视频SEO优化专家，专注于中文内容优化。

视频文件名: {video_filename}

视频字幕内容:
{subtitle_content}

请基于以上字幕内容，为这个视频生成高质量的YouTube SEO优化内容。这是郭春林老师的哲学智慧频道视频。

要求:

1. **标题 (title)**:
   - 生成10个不同风格的中文标题选项
   - 每个标题长度控制在50-80字符
   - 标题要吸引眼球、包含核心关键词
   - 使用数字、问句、悬念等技巧
   - 每个标题独立一行，用换行符\\n分隔

2. **描述 (description)**:
   - 生成详细的视频描述（300-500字）
   - 第一行必须包含 #郭春林 标签
   - 包含视频核心内容概述
   - 列出详细的内容大纲（使用数字编号）
   - 说明适合的观众群体
   - 列出观众的学习收获
   - 在描述末尾添加相关标签（#开头）

3. **关键词 (keywords)**:
   - 提取10-15个核心中文关键词
   - 关键词要精准、相关性强
   - 包含主题词、人物名、核心概念等
   - 以JSON数组格式输出

4. **摘要 (summary)**:
   - 生成200-300字的核心内容摘要
   - 用简洁的语言概括视频要点
   - 每个要点独立成段，用换行符分隔
   - 突出核心观点和价值

请严格按照以下JSON格式输出（不要添加任何markdown代码块标记，直接输出纯JSON）:

{{
  "title": "标题1\\n标题2\\n标题3\\n标题4\\n标题5\\n标题6\\n标题7\\n标题8\\n标题9\\n标题10",
  "description": "完整的视频描述内容...",
  "keywords": ["关键词1", "关键词2", "关键词3", ...],
  "summary": "核心内容摘要..."
}}

重要提示: 
- 请直接输出JSON，不要使用```json```代码块包裹
- 确保JSON格式正确，可以被直接解析
- 标题之间用\\n分隔
- 所有字符串中的引号要正确转义"""

    def _build_english_prompt(self, video_filename: str, subtitle_content: str) -> str:
        """构建英文SEO生成prompt"""
        return f"""You are a professional YouTube video SEO optimization expert specializing in English content.

Video filename: {video_filename}

Video subtitle content (Chinese):
{subtitle_content}

Based on the above subtitle content, please generate high-quality YouTube SEO optimized content for this video. This is from Guo Chunlin's Philosophy and Wisdom channel.

Requirements:

1. **Title**:
   - Generate 10 different English title options
   - Each title should be 50-80 characters
   - Titles should be eye-catching and include core keywords
   - Use numbers, questions, suspense techniques
   - Each title on a separate line, separated by \\n

2. **Description**:
   - Generate detailed video description (300-500 words in English)
   - First line must include #GuoChunlin tag
   - Include core content overview
   - List detailed content outline (numbered)
   - Specify target audience
   - List learning outcomes for viewers
   - Add relevant hashtags at the end

3. **Keywords**:
   - Extract 10-15 core English keywords
   - Keywords should be precise and highly relevant
   - Include topic words, names, core concepts
   - Output as JSON array

4. **Summary**:
   - Generate 200-300 word core content summary in English
   - Use concise language to summarize key points
   - Each point in separate paragraph, separated by \\n
   - Highlight core insights and value

Please output strictly in the following JSON format (do not add any markdown code block markers, output pure JSON directly):

{{
  "title": "Title 1\\nTitle 2\\nTitle 3\\nTitle 4\\nTitle 5\\nTitle 6\\nTitle 7\\nTitle 8\\nTitle 9\\nTitle 10",
  "description": "Complete video description...",
  "keywords": ["keyword1", "keyword2", "keyword3", ...],
  "summary": "Core content summary..."
}}

Important notes:
- Please output JSON directly without wrapping it in ```json``` code blocks
- Ensure JSON format is correct and can be parsed directly
- Separate titles with \\n
- Properly escape quotes in all strings"""

    def _parse_gemini_response(self, response_text: str, language: str) -> Dict[str, Any]:
        """
        解析Gemini的响应
        
        Args:
            response_text: Gemini返回的文本
            language: 语言类型
            
        Returns:
            解析后的SEO内容字典
        """
        try:
            # 移除可能的markdown代码块标记
            response_text = response_text.strip()
            
            # 移除各种可能的代码块标记
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            elif response_text.startswith("```"):
                response_text = response_text[3:]
            
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # 尝试找到JSON部分（如果有额外文本）
            json_start = response_text.find('{')
            json_end = response_text.rfind('}')
            
            if json_start != -1 and json_end != -1:
                response_text = response_text[json_start:json_end+1]
            
            # 解析JSON
            seo_content = json.loads(response_text)
            
            # 验证必需字段
            required_fields = ["title", "description", "keywords", "summary"]
            for field in required_fields:
                if field not in seo_content:
                    self.logger.warning(f"缺少字段: {field}")
                    seo_content[field] = "" if field != "keywords" else []
            
            # 确保keywords是列表
            if not isinstance(seo_content.get("keywords"), list):
                self.logger.warning("keywords不是列表格式，尝试转换")
                keywords_str = str(seo_content.get("keywords", ""))
                seo_content["keywords"] = [k.strip() for k in keywords_str.split(",") if k.strip()]
            
            return seo_content
            
        except json.JSONDecodeError as e:
            self.logger.error(f"JSON解析失败: {e}")
            self.logger.error(f"响应内容前500字符: {response_text[:500]}")
            
            # 尝试更宽松的解析
            try:
                # 移除可能的控制字符
                cleaned_text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', response_text)
                seo_content = json.loads(cleaned_text)
                self.logger.info("使用清理后的文本成功解析JSON")
                return seo_content
            except:
                pass
            
            # 返回空结构
            return {
                "title": "",
                "description": "",
                "keywords": [],
                "summary": ""
            }
    
    def process_video_pair(
        self,
        video_file: Path,
        subtitle_file: Path
    ) -> bool:
        """
        处理单个视频-字幕对
        
        Args:
            video_file: 视频文件路径
            subtitle_file: 字幕文件路径
            
        Returns:
            是否处理成功
        """
        video_filename = video_file.name
        
        # 检查是否已处理（增量处理）
        if not self.force_reprocess:
            if video_filename in self.cn_seo_data and video_filename in self.en_seo_data:
                self.logger.info(f"跳过已处理视频: {video_filename}")
                self.stats["skipped"] += 1
                return True
        
        try:
            # 读取字幕内容
            self.logger.info(f"处理视频: {video_filename}")
            with open(subtitle_file, 'r', encoding='utf-8') as f:
                subtitle_content = f.read()
            
            if not subtitle_content.strip():
                self.logger.warning(f"字幕内容为空: {subtitle_file.name}")
                self.stats["failed"] += 1
                return False
            
            # 生成中文SEO内容
            self.logger.info(f"生成中文SEO内容...")
            cn_content = self.generate_seo_content_with_gemini(
                video_filename,
                subtitle_content,
                language="cn"
            )
            self.cn_seo_data[video_filename] = cn_content
            
            # 等待一下避免API限流（Gemini通常更宽松）
            time.sleep(1)
            
            # 生成英文SEO内容
            self.logger.info(f"生成英文SEO内容...")
            en_content = self.generate_seo_content_with_gemini(
                video_filename,
                subtitle_content,
                language="en"
            )
            self.en_seo_data[video_filename] = en_content
            
            self.stats["processed"] += 1
            self.logger.info(f"✓ 成功处理: {video_filename} ({self.stats['processed']}/{self.stats['matched_pairs']})")
            
            # 每处理5个视频保存一次（防止数据丢失）
            if self.stats["processed"] % 5 == 0:
                self._save_intermediate_results()
            
            return True
            
        except Exception as e:
            self.logger.error(f"✗ 处理失败: {video_filename} - {e}")
            self.stats["failed"] += 1
            return False
    
    def _save_intermediate_results(self):
        """保存中间结果（防止数据丢失）"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # 保存中文结果
        cn_file = self.output_dir / f"cn_郭春林_seo_results_{timestamp}_temp.json"
        with open(cn_file, 'w', encoding='utf-8') as f:
            json.dump(self.cn_seo_data, f, ensure_ascii=False, indent=2)
        
        # 保存英文结果
        en_file = self.output_dir / f"en_郭春林_seo_results_{timestamp}_temp.json"
        with open(en_file, 'w', encoding='utf-8') as f:
            json.dump(self.en_seo_data, f, ensure_ascii=False, indent=2)
        
        self.logger.info(f"保存中间结果: {self.stats['processed']} 个视频")

    def save_final_results(self) -> Tuple[str, str]:
        """
        保存最终结果
        
        Returns:
            (中文文件路径, 英文文件路径)
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # 保存中文结果
        cn_file = self.output_dir / f"cn_郭春林_seo_results_{timestamp}.json"
        with open(cn_file, 'w', encoding='utf-8') as f:
            json.dump(self.cn_seo_data, f, ensure_ascii=False, indent=2)
        self.logger.info(f"✓ 保存中文结果: {cn_file}")
        
        # 保存英文结果
        en_file = self.output_dir / f"en_郭春林_seo_results_{timestamp}.json"
        with open(en_file, 'w', encoding='utf-8') as f:
            json.dump(self.en_seo_data, f, ensure_ascii=False, indent=2)
        self.logger.info(f"✓ 保存英文结果: {en_file}")
        
        return str(cn_file), str(en_file)
    
    def generate_summary_report(self) -> Dict[str, Any]:
        """
        生成处理摘要报告
        
        Returns:
            包含统计信息的报告字典
        """
        report = {
            "processing_time": datetime.now().isoformat(),
            "model_used": self.model_name,
            "video_directory": str(self.video_dir),
            "subtitle_directory": str(self.subtitle_dir),
            "output_directory": str(self.output_dir),
            "statistics": {
                "total_videos_found": self.stats["total_videos"],
                "total_subtitles_found": self.stats["total_subtitles"],
                "matched_pairs": self.stats["matched_pairs"],
                "processed": self.stats["processed"],
                "skipped": self.stats["skipped"],
                "failed": self.stats["failed"],
                "api_calls": self.stats["api_calls"]
            },
            "results": {
                "chinese_entries": len(self.cn_seo_data),
                "english_entries": len(self.en_seo_data)
            }
        }
        
        return report
    
    def print_summary_report(self):
        """打印处理摘要报告"""
        print("\n" + "=" * 80)
        print("处理摘要报告")
        print("=" * 80)
        print(f"使用模型: {self.model_name}")
        print(f"视频目录: {self.video_dir}")
        print(f"字幕目录: {self.subtitle_dir}")
        print(f"输出目录: {self.output_dir}")
        print("-" * 80)
        print(f"找到视频文件: {self.stats['total_videos']} 个")
        print(f"找到字幕文件: {self.stats['total_subtitles']} 个")
        print(f"成功匹配: {self.stats['matched_pairs']} 对")
        print("-" * 80)
        print(f"已处理: {self.stats['processed']} 个")
        print(f"跳过: {self.stats['skipped']} 个")
        print(f"失败: {self.stats['failed']} 个")
        print(f"API调用次数: {self.stats['api_calls']} 次")
        print("-" * 80)
        print(f"中文条目: {len(self.cn_seo_data)} 条")
        print(f"英文条目: {len(self.en_seo_data)} 条")
        print("=" * 80)
    
    def run(self):
        """执行完整的处理流程"""
        start_time = datetime.now()
        
        print("\n" + "=" * 80)
        print("视频SEO内容生成器 - Google Gemini 2.5 Flash")
        print("=" * 80)
        print(f"开始时间: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"使用模型: {self.model_name}")
        print(f"视频目录: {self.video_dir}")
        print(f"字幕目录: {self.subtitle_dir}")
        print(f"输出目录: {self.output_dir}")
        if self.max_videos:
            print(f"最大处理数量: {self.max_videos} 个")
        print("=" * 80 + "\n")
        
        try:
            # 1. 查找视频-字幕匹配对
            pairs = self.find_video_subtitle_pairs()
            
            if not pairs:
                self.logger.error("未找到任何匹配的视频-字幕对")
                return
            
            # 2. 加载已存在的结果（增量处理）
            if not self.force_reprocess:
                self.cn_seo_data, self.en_seo_data = self.load_existing_results()
            
            # 3. 限制处理数量（如果指定）
            if self.max_videos:
                pairs = pairs[:self.max_videos]
                self.logger.info(f"限制处理数量: {self.max_videos} 个")
            
            # 4. 处理每个视频-字幕对
            print(f"\n开始处理 {len(pairs)} 对视频和字幕...\n")
            
            for idx, (video_file, subtitle_file) in enumerate(pairs, 1):
                print(f"\n[{idx}/{len(pairs)}] 处理: {video_file.name}")
                print("-" * 80)
                
                success = self.process_video_pair(video_file, subtitle_file)
                
                if success:
                    print(f"✓ 成功")
                else:
                    print(f"✗ 失败")
                
                # 添加延迟避免API限流（Gemini通常更宽松）
                if idx < len(pairs):
                    time.sleep(2)
            
            # 5. 保存最终结果
            print("\n" + "=" * 80)
            print("保存最终结果...")
            print("=" * 80)
            
            cn_file, en_file = self.save_final_results()
            
            # 6. 生成并打印报告
            self.print_summary_report()
            
            # 计算总耗时
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            
            print(f"\n总耗时: {duration:.2f} 秒 ({duration/60:.2f} 分钟)")
            print(f"结束时间: {end_time.strftime('%Y-%m-%d %H:%M:%S')}")
            print("\n✓ 处理完成！\n")
            
            # 保存报告
            report = self.generate_summary_report()
            report_file = self.output_dir / f"processing_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, ensure_ascii=False, indent=2)
            print(f"处理报告已保存: {report_file}\n")
            
        except KeyboardInterrupt:
            print("\n\n用户中断处理")
            self.logger.warning("用户中断处理")
            
            # 保存已处理的结果
            if self.cn_seo_data or self.en_seo_data:
                print("保存已处理的结果...")
                self.save_final_results()
                self.print_summary_report()
            
        except Exception as e:
            self.logger.error(f"处理过程中发生错误: {e}", exc_info=True)
            print(f"\n✗ 错误: {e}\n")
            
            # 尝试保存已处理的结果
            if self.cn_seo_data or self.en_seo_data:
                print("尝试保存已处理的结果...")
                try:
                    self.save_final_results()
                except Exception as save_error:
                    self.logger.error(f"保存结果失败: {save_error}")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="视频SEO内容生成器 - 使用Google Gemini 2.5 Flash生成YouTube SEO优化内容",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 基本使用
  python video_seo_generator_gemini.py \\
    --video-dir "orignal/郭春林哲学智慧" \\
    --subtitle-dir "orignal/orinal_txt_md" \\
    --output-dir "tools"
  
  # 测试模式（只处理5个视频）
  python video_seo_generator_gemini.py \\
    --video-dir "orignal/郭春林哲学智慧" \\
    --subtitle-dir "orignal/orinal_txt_md" \\
    --output-dir "tools" \\
    --max-videos 5
  
  # 强制重新处理所有视频
  python video_seo_generator_gemini.py \\
    --video-dir "orignal/郭春林哲学智慧" \\
    --subtitle-dir "orignal/orinal_txt_md" \\
    --output-dir "tools" \\
    --force-reprocess
  
  # 使用不同的Gemini模型
  python video_seo_generator_gemini.py \\
    --video-dir "orignal/郭春林哲学智慧" \\
    --subtitle-dir "orignal/orinal_txt_md" \\
    --output-dir "tools" \\
    --model "gemini-2.0-flash-exp"
        """
    )
    
    parser.add_argument(
        "--video-dir",
        type=str,
        required=True,
        help="视频文件目录路径"
    )
    
    parser.add_argument(
        "--subtitle-dir",
        type=str,
        required=True,
        help="字幕markdown文件目录路径"
    )
    
    parser.add_argument(
        "--output-dir",
        type=str,
        default="tools",
        help="输出目录路径（默认: tools）"
    )
    
    parser.add_argument(
        "--api-key",
        type=str,
        help="Google API密钥（也可通过GOOGLE_API_KEY环境变量设置）"
    )
    
    parser.add_argument(
        "--model",
        type=str,
        default="gemini-2.0-flash-exp",
        help="Gemini模型名称（默认: gemini-2.0-flash-exp）"
    )
    
    parser.add_argument(
        "--max-videos",
        type=int,
        help="最大处理视频数量（用于测试）"
    )
    
    parser.add_argument(
        "--force-reprocess",
        action="store_true",
        help="强制重新处理所有视频（忽略已存在的结果）"
    )
    
    parser.add_argument(
        "--log-level",
        type=str,
        default="INFO",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
        help="日志级别（默认: INFO）"
    )
    
    args = parser.parse_args()
    
    # 创建生成器并运行
    try:
        generator = VideoSEOGenerator(
            video_dir=args.video_dir,
            subtitle_dir=args.subtitle_dir,
            output_dir=args.output_dir,
            api_key=args.api_key,
            model_name=args.model,
            max_videos=args.max_videos,
            force_reprocess=args.force_reprocess,
            log_level=args.log_level
        )
        
        generator.run()
        
    except Exception as e:
        print(f"\n✗ 初始化失败: {e}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
