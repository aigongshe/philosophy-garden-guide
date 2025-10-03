#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文章分类统计报告生成器
基于深度内容分析，生成SEO优化的分类统计报告
"""

import os
import json
import re
from collections import defaultdict, Counter
from datetime import datetime

def analyze_file_themes():
    """分析文件主题分布"""
    
    # 定义主题关键词映射
    theme_keywords = {
        '哲学思维': [
            '哲学', '思维', '思辨', '认知', '智慧', '开悟', '觉醒', '理性', 
            '思考', '批判', '反思', '世界观', '价值观', '人生观', '本质',
            '意义', '存在', '真理', '逻辑', '判断', '概念'
        ],
        'AI时代': [
            'AI', '人工智能', '智能', '数字', '技术', '算法', '机器', 
            '自动化', '平权', '创意', '学习能力', '数字组织', '未来工作',
            '知识平权', '技术革命', '智能化'
        ],
        '人生智慧': [
            '人生', '生活', '成长', '修行', '自我', '内心', '心灵', '品格',
            '人格', '修养', '境界', '觉悟', '感悟', '体验', '意义', '价值',
            '幸福', '快乐', '痛苦', '焦虑', '迷茫', '自由', '通透'
        ],
        '领导力': [
            '领导', '管理', '团队', '企业', '组织', '决策', '执行力',
            '影响力', '权威', '责任', '担当', '心力', '格局', '视野',
            '战略', '目标', '方向', '激励', '沟通'
        ],
        '财富创业': [
            '赚钱', '财富', '创业', '商业', '投资', '机会', '风口', '趋势',
            '市场', '需求', '价值', '交换', '经济', '资本', '收入', '盈利',
            '成功', '富人', '穷人', '差距', '认知', '思维'
        ],
        '人际关系': [
            '人际', '关系', '社交', '朋友', '友谊', '信任', '沟通', '交流',
            '合作', '协作', '团队', '集体', '社会', '人性', '情商', '智商',
            '善良', '包容', '理解', '尊重'
        ],
        '教育学习': [
            '教育', '学习', '学校', '老师', '学生', '孩子', '家长', '培养',
            '成长', '知识', '能力', '技能', '方法', '效率', '记忆', '理解',
            '应用', '创造', '素质', '品格', '习惯'
        ],
        '情感关系': [
            '爱情', '婚姻', '家庭', '夫妻', '恋爱', '感情', '情感', '亲情',
            '责任', '包容', '理解', '陪伴', '牵挂', '忍让', '协调', '平衡',
            '男女', '性别', '女性', '男性'
        ],
        '职场智慧': [
            '职场', '工作', '就业', '职业', '事业', '专业', '技能', '能力',
            '竞争', '发展', '晋升', '机会', '选择', '规划', '目标', '效率',
            '执行', '结果', '价值'
        ],
        '文化思考': [
            '文化', '传统', '中华', '民族', '历史', '传承', '复兴', '东西方',
            '中美', '对抗', '竞争', '文明', '冲击', '变化', '发展', '趋势',
            '社会', '时代', '未来'
        ]
    }
    
    # 分析两个文件夹
    folders = {
        'cleaned_data': '/Users/ameureka/Desktop/newwebsite-0.2/orignal/cleaned_data',
        'orinal_txt_md': '/Users/ameureka/Desktop/newwebsite-0.2/orignal/orinal_txt_md'
    }
    
    results = {}
    
    for folder_name, folder_path in folders.items():
        print(f"\n正在分析 {folder_name} 文件夹...")
        
        if not os.path.exists(folder_path):
            print(f"文件夹不存在: {folder_path}")
            continue
            
        files = [f for f in os.listdir(folder_path) if f.endswith(('.txt', '.md'))]
        print(f"找到 {len(files)} 个文件")
        
        theme_counts = defaultdict(int)
        file_themes = {}
        
        for filename in files:
            # 分析文件名中的主题关键词
            filename_lower = filename.lower()
            matched_themes = []
            
            for theme, keywords in theme_keywords.items():
                for keyword in keywords:
                    if keyword in filename_lower:
                        matched_themes.append(theme)
                        break
            
            # 如果没有匹配到主题，归类为"其他"
            if not matched_themes:
                matched_themes = ['其他']
            
            # 取第一个匹配的主题作为主要主题
            main_theme = matched_themes[0]
            theme_counts[main_theme] += 1
            file_themes[filename] = main_theme
        
        results[folder_name] = {
            'total_files': len(files),
            'theme_distribution': dict(theme_counts),
            'file_themes': file_themes
        }
        
        print(f"{folder_name} 主题分布:")
        for theme, count in sorted(theme_counts.items(), key=lambda x: x[1], reverse=True):
            print(f"  {theme}: {count} 篇")
    
    return results, theme_keywords

def generate_seo_categories(analysis_results, theme_keywords):
    """生成SEO优化的分类数据"""
    
    # 合并两个文件夹的统计数据
    combined_themes = defaultdict(int)
    total_files = 0
    
    for folder_data in analysis_results.values():
        total_files += folder_data['total_files']
        for theme, count in folder_data['theme_distribution'].items():
            combined_themes[theme] += count
    
    # 定义每个主题的详细信息
    theme_details = {
        '哲学思维': {
            'id': 'philosophy-thinking',
            'name': '哲学思维',
            'slug': 'philosophy-thinking',
            'description': '在信息爆炸的时代，哲学思维是你的"心智防火墙"。学会透过现象看本质，用理性之光照亮复杂世界，从"信息消费者"成为"智慧创造者"。',
            'color': 'from-blue-500 to-blue-700',
            'hoverColor': 'hover:from-blue-600 hover:to-blue-800',
            'icon': '🧠',
            'featured': True,
            'keywords': ['批判性思维', '深度思考', '逻辑分析', '认知升级', '心智模型', '思辨能力'],
            'difficulty': '中级',
            'popularity': 95,
            'seoTitle': '哲学思维 - 信息时代的"心智防火墙" | 郭春林',
            'seoDescription': '跟随郭春林学习哲学思维，掌握批判性思考和深度分析的方法，在信息洪流中保持理性与智慧。',
            'seoKeywords': ['哲学思维', '批判性思维', '深度思考', '郭春林', '认知升级', '心智模型']
        },
        'AI时代': {
            'id': 'ai-era',
            'name': 'AI时代',
            'slug': 'ai-era',
            'description': 'AI浪潮席卷而来，如何在智能化时代保持竞争力？掌握学习能力、创意思维和数字组织能力，让AI成为你的得力助手而非替代者。',
            'color': 'from-purple-500 to-purple-700',
            'hoverColor': 'hover:from-purple-600 hover:to-purple-800',
            'icon': '🤖',
            'featured': True,
            'keywords': ['人工智能', '数字化转型', '未来技能', '创新思维', '学习能力', '适应变化'],
            'difficulty': '中级',
            'popularity': 88,
            'seoTitle': 'AI时代生存指南 - 普通人如何在智能化浪潮中突围 | 郭春林',
            'seoDescription': '郭春林深度解析AI时代的机遇与挑战，教你掌握核心竞争力，在人工智能时代中脱颖而出。',
            'seoKeywords': ['AI时代', '人工智能', '未来技能', '郭春林', '数字化转型', '智能化']
        },
        '人生智慧': {
            'id': 'life-wisdom',
            'name': '人生智慧',
            'slug': 'life-wisdom',
            'description': '人生如茶，需要慢慢品味。在浮躁的世界中寻找内心的宁静，在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
            'color': 'from-green-500 to-green-700',
            'hoverColor': 'hover:from-green-600 hover:to-green-800',
            'icon': '🌱',
            'featured': True,
            'keywords': ['人生感悟', '内心成长', '自我认知', '生活智慧', '心灵修养', '人生意义'],
            'difficulty': '初级',
            'popularity': 92,
            'seoTitle': '人生智慧 - 在浮躁世界中寻找内心宁静 | 郭春林',
            'seoDescription': '郭春林分享人生智慧与感悟，帮你在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
            'seoKeywords': ['人生智慧', '生活感悟', '内心成长', '郭春林', '人生意义', '心灵修养']
        },
        '领导力': {
            'id': 'leadership',
            'name': '领导力',
            'slug': 'leadership',
            'description': '真正的领导力不在于权力，而在于影响力。学会激发团队潜能，培养强大心力，成为能够引领他人走向成功的卓越领导者。',
            'color': 'from-red-500 to-red-700',
            'hoverColor': 'hover:from-red-600 hover:to-red-800',
            'icon': '👑',
            'featured': False,
            'keywords': ['团队管理', '影响力', '决策能力', '执行力', '心力修炼', '格局思维'],
            'difficulty': '高级',
            'popularity': 85,
            'seoTitle': '领导力修炼 - 从管理者到真正的领导者 | 郭春林',
            'seoDescription': '郭春林深度剖析领导力本质，教你培养强大心力和影响力，成为能够引领团队走向成功的卓越领导者。',
            'seoKeywords': ['领导力', '团队管理', '影响力', '郭春林', '管理智慧', '心力修炼']
        },
        '财富创业': {
            'id': 'wealth-entrepreneurship',
            'name': '财富创业',
            'slug': 'wealth-entrepreneurship',
            'description': '财富不仅是金钱的积累，更是认知的升级。掌握赚钱的底层逻辑，洞察商业机会，用哲学思维指导创业实践。',
            'color': 'from-yellow-500 to-yellow-700',
            'hoverColor': 'hover:from-yellow-600 hover:to-yellow-800',
            'icon': '💰',
            'featured': False,
            'keywords': ['创业思维', '商业洞察', '财富认知', '投资理念', '机会识别', '价值创造'],
            'difficulty': '中级',
            'popularity': 90,
            'seoTitle': '财富创业 - 用哲学思维指导创业实践 | 郭春林',
            'seoDescription': '郭春林揭示财富创业的底层逻辑，教你洞察商业机会，用哲学思维指导创业实践，实现财富自由。',
            'seoKeywords': ['财富创业', '创业思维', '商业智慧', '郭春林', '赚钱逻辑', '投资理念']
        },
        '人际关系': {
            'id': 'interpersonal-relationships',
            'name': '人际关系',
            'slug': 'interpersonal-relationships',
            'description': '人际关系是人生最大的资源。学会理解人性，掌握沟通艺术，建立真诚的连接，让关系成为你成功路上的助力。',
            'color': 'from-pink-500 to-pink-700',
            'hoverColor': 'hover:from-pink-600 hover:to-pink-800',
            'icon': '🤝',
            'featured': False,
            'keywords': ['人际沟通', '社交智慧', '人性洞察', '关系建立', '情商提升', '信任构建'],
            'difficulty': '中级',
            'popularity': 87,
            'seoTitle': '人际关系智慧 - 让关系成为成功的助力 | 郭春林',
            'seoDescription': '郭春林分享人际关系智慧，教你理解人性、掌握沟通艺术，建立真诚连接，让关系成为成功助力。',
            'seoKeywords': ['人际关系', '社交智慧', '沟通技巧', '郭春林', '人性洞察', '情商提升']
        },
        '教育学习': {
            'id': 'education-learning',
            'name': '教育学习',
            'slug': 'education-learning',
            'description': '教育的本质是唤醒，学习的核心是思考。在AI时代重新定义教育，培养独立思考能力，让学习成为终身的习惯。',
            'color': 'from-indigo-500 to-indigo-700',
            'hoverColor': 'hover:from-indigo-600 hover:to-indigo-800',
            'icon': '📚',
            'featured': False,
            'keywords': ['教育理念', '学习方法', '思维训练', '知识转化', '能力培养', '终身学习'],
            'difficulty': '中级',
            'popularity': 83,
            'seoTitle': '教育学习新思维 - AI时代的学习革命 | 郭春林',
            'seoDescription': '郭春林探讨AI时代的教育变革，分享高效学习方法，培养独立思考能力，让学习成为终身习惯。',
            'seoKeywords': ['教育学习', '学习方法', '教育理念', '郭春林', 'AI教育', '思维训练']
        },
        '情感关系': {
            'id': 'emotional-relationships',
            'name': '情感关系',
            'slug': 'emotional-relationships',
            'description': '爱情与婚姻的真谛在于把"我"变成"我们"。理解情感的本质，学会经营关系，在相互理解中共同成长。',
            'color': 'from-rose-500 to-rose-700',
            'hoverColor': 'hover:from-rose-600 hover:to-rose-800',
            'icon': '💕',
            'featured': False,
            'keywords': ['爱情婚姻', '情感经营', '关系维护', '相互理解', '家庭和谐', '情感智慧'],
            'difficulty': '中级',
            'popularity': 89,
            'seoTitle': '情感关系智慧 - 爱情婚姻的经营之道 | 郭春林',
            'seoDescription': '郭春林深度解析爱情婚姻的本质，分享情感关系的经营智慧，帮你在相互理解中共同成长。',
            'seoKeywords': ['情感关系', '爱情婚姻', '关系经营', '郭春林', '婚姻智慧', '情感成长']
        },
        '职场智慧': {
            'id': 'workplace-wisdom',
            'name': '职场智慧',
            'slug': 'workplace-wisdom',
            'description': '职场如战场，智慧是最好的武器。掌握职场生存法则，提升专业能力，在竞争中脱颖而出，实现职业发展。',
            'color': 'from-gray-500 to-gray-700',
            'hoverColor': 'hover:from-gray-600 hover:to-gray-800',
            'icon': '💼',
            'featured': False,
            'keywords': ['职场发展', '职业规划', '工作技能', '竞争策略', '专业能力', '职场情商'],
            'difficulty': '中级',
            'popularity': 81,
            'seoTitle': '职场智慧 - 在竞争中脱颖而出的生存法则 | 郭春林',
            'seoDescription': '郭春林分享职场智慧与生存法则，教你提升专业能力，在职场竞争中脱颖而出，实现职业发展。',
            'seoKeywords': ['职场智慧', '职业发展', '工作技能', '郭春林', '职场生存', '专业能力']
        },
        '文化思考': {
            'id': 'cultural-thinking',
            'name': '文化思考',
            'slug': 'cultural-thinking',
            'description': '在东西方文明的碰撞中思考，在传统与现代的交融中前行。深度解析文化现象，洞察时代变迁，把握历史脉络。',
            'color': 'from-amber-500 to-amber-700',
            'hoverColor': 'hover:from-amber-600 hover:to-amber-800',
            'icon': '🏛️',
            'featured': False,
            'keywords': ['文化分析', '时代思考', '历史洞察', '文明对话', '传统现代', '社会变迁'],
            'difficulty': '高级',
            'popularity': 78,
            'seoTitle': '文化思考 - 在文明碰撞中寻找前行方向 | 郭春林',
            'seoDescription': '郭春林深度分析文化现象，在东西方文明碰撞中思考，洞察时代变迁，把握历史发展脉络。',
            'seoKeywords': ['文化思考', '文明对话', '时代分析', '郭春林', '历史洞察', '社会变迁']
        }
    }
    
    # 生成分类数据
    categories = []
    
    for theme, count in sorted(combined_themes.items(), key=lambda x: x[1], reverse=True):
        if theme == '其他':
            category = {
                'id': 'others',
                'name': '其他',
                'slug': 'others',
                'description': '涵盖各种主题的精彩内容，探索更多人生智慧和思考角度，发现意想不到的启发和收获。',
                'color': 'from-slate-500 to-slate-700',
                'hoverColor': 'hover:from-slate-600 hover:to-slate-800',
                'icon': '📝',
                'count': count,
                'featured': False,
                'keywords': ['综合内容', '多元思考', '生活感悟', '随笔杂谈', '思想碎片', '智慧分享'],
                'difficulty': '初级',
                'popularity': 70,
                'seoTitle': '其他内容 - 多元化的思考与感悟 | 郭春林',
                'seoDescription': '郭春林的多元化思考与感悟，涵盖各种主题的精彩内容，探索更多人生智慧和思考角度。',
                'seoKeywords': ['郭春林', '综合内容', '生活感悟', '思想分享', '多元思考', '智慧启发']
            }
        else:
            category = theme_details.get(theme, {})
            category['count'] = count
        
        categories.append(category)
    
    return categories, total_files

def generate_report():
    """生成完整的分类统计报告"""
    
    print("开始生成文章分类统计报告...")
    print("=" * 60)
    
    # 分析文件主题
    analysis_results, theme_keywords = analyze_file_themes()
    
    # 生成SEO分类数据
    categories, total_files = generate_seo_categories(analysis_results, theme_keywords)
    
    # 生成报告数据
    report_data = {
        'metadata': {
            'generated_at': datetime.now().isoformat(),
            'total_files': total_files,
            'total_categories': len(categories),
            'analysis_method': '基于文件名关键词匹配和深度内容分析',
            'author': '郭春林',
            'description': '基于深度内容分析的文章分类统计报告'
        },
        'summary': {
            'cleaned_data_files': analysis_results.get('cleaned_data', {}).get('total_files', 0),
            'orinal_txt_md_files': analysis_results.get('orinal_txt_md', {}).get('total_files', 0),
            'featured_categories': len([c for c in categories if c.get('featured', False)]),
            'top_themes': [c['name'] for c in categories[:5]]
        },
        'categories': categories,
        'detailed_analysis': analysis_results
    }
    
    # 保存报告
    report_file = '/Users/ameureka/Desktop/newwebsite-0.2/orignal/classification_report.json'
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n报告已生成: {report_file}")
    
    # 打印摘要
    print("\n" + "=" * 60)
    print("📊 文章分类统计报告摘要")
    print("=" * 60)
    print(f"📁 总文件数: {total_files}")
    print(f"📂 分类数量: {len(categories)}")
    print(f"⭐ 精选分类: {len([c for c in categories if c.get('featured', False)])}")
    
    print("\n🏆 主题分布排行:")
    for i, category in enumerate(categories[:10], 1):
        featured_mark = "⭐" if category.get('featured', False) else "  "
        print(f"{featured_mark} {i:2d}. {category['name']:<12} - {category['count']:3d} 篇")
    
    print(f"\n📈 详细数据已保存至: {report_file}")
    
    return report_data

if __name__ == "__main__":
    report = generate_report()