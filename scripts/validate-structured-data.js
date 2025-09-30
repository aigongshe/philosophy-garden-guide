/**
 * 🏗️ 结构化数据验证工具
 * 用于验证Schema.org标记的正确性和完整性
 */

// 结构化数据验证器
class StructuredDataValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.validSchemas = [];
    }

    // 验证JSON-LD语法
    validateJSONLD(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            return { valid: true, data };
        } catch (error) {
            this.errors.push(`JSON-LD语法错误: ${error.message}`);
            return { valid: false, error: error.message };
        }
    }

    // 验证Person Schema
    validatePersonSchema(data) {
        console.log('👤 验证Person Schema...');
        
        const required = ['@context', '@type', 'name'];
        const recommended = ['description', 'url', 'image', 'jobTitle', 'knowsAbout'];
        
        // 检查必需字段
        for (const field of required) {
            if (!data[field]) {
                this.errors.push(`Person Schema缺少必需字段: ${field}`);
            }
        }
        
        // 检查推荐字段
        for (const field of recommended) {
            if (!data[field]) {
                this.warnings.push(`Person Schema建议添加字段: ${field}`);
            }
        }
        
        // 验证郭春林特定信息
        if (data.name && !data.name.includes('郭春林')) {
            this.warnings.push('Person Schema建议在name字段中包含"郭春林"');
        }
        
        if (data.knowsAbout && Array.isArray(data.knowsAbout)) {
            const philosophyKeywords = ['哲学', '哲学思维', '商业智慧'];
            const hasPhilosophyKeywords = philosophyKeywords.some(keyword => 
                data.knowsAbout.some(item => item.includes(keyword))
            );
            
            if (!hasPhilosophyKeywords) {
                this.warnings.push('Person Schema建议在knowsAbout中包含哲学相关关键词');
            }
        }
        
        console.log('✅ Person Schema验证完成');
        return data;
    }

    // 验证Organization Schema
    validateOrganizationSchema(data) {
        console.log('🏢 验证Organization Schema...');
        
        const required = ['@context', '@type', 'name', 'url'];
        const recommended = ['description', 'logo', 'founder', 'contactPoint'];
        
        // 检查必需字段
        for (const field of required) {
            if (!data[field]) {
                this.errors.push(`Organization Schema缺少必需字段: ${field}`);
            }
        }
        
        // 检查推荐字段
        for (const field of recommended) {
            if (!data[field]) {
                this.warnings.push(`Organization Schema建议添加字段: ${field}`);
            }
        }
        
        // 验证品牌信息
        if (data.name && !data.name.includes('哲学')) {
            this.warnings.push('Organization Schema建议在name中体现哲学主题');
        }
        
        console.log('✅ Organization Schema验证完成');
        return data;
    }

    // 验证Website Schema
    validateWebsiteSchema(data) {
        console.log('🌐 验证Website Schema...');
        
        const required = ['@context', '@type', 'name', 'url'];
        const recommended = ['description', 'author', 'publisher'];
        
        // 检查必需字段
        for (const field of required) {
            if (!data[field]) {
                this.errors.push(`Website Schema缺少必需字段: ${field}`);
            }
        }
        
        // 检查推荐字段
        for (const field of recommended) {
            if (!data[field]) {
                this.warnings.push(`Website Schema建议添加字段: ${field}`);
            }
        }
        
        console.log('✅ Website Schema验证完成');
        return data;
    }

    // 验证Article Schema
    validateArticleSchema(data) {
        console.log('📄 验证Article Schema...');
        
        const required = ['@context', '@type', 'headline', 'author', 'datePublished'];
        const recommended = ['description', 'image', 'publisher', 'mainEntityOfPage'];
        
        // 检查必需字段
        for (const field of required) {
            if (!data[field]) {
                this.errors.push(`Article Schema缺少必需字段: ${field}`);
            }
        }
        
        // 检查推荐字段
        for (const field of recommended) {
            if (!data[field]) {
                this.warnings.push(`Article Schema建议添加字段: ${field}`);
            }
        }
        
        console.log('✅ Article Schema验证完成');
        return data;
    }

    // 从页面提取结构化数据
    extractStructuredData() {
        if (typeof document === 'undefined') {
            console.log('❌ 此函数需要在浏览器环境中运行');
            return [];
        }

        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        const structuredData = [];

        scripts.forEach((script, index) => {
            const jsonString = script.textContent;
            const validation = this.validateJSONLD(jsonString);
            
            if (validation.valid) {
                structuredData.push({
                    index,
                    type: validation.data['@type'],
                    data: validation.data
                });
            }
        });

        return structuredData;
    }

    // 验证所有结构化数据
    validateAll() {
        console.log('🔍 开始验证所有结构化数据...\n');
        
        const structuredData = this.extractStructuredData();
        
        if (structuredData.length === 0) {
            this.errors.push('页面中未找到结构化数据');
            return this.generateReport();
        }

        console.log(`📊 找到 ${structuredData.length} 个结构化数据块`);

        structuredData.forEach(({ type, data, index }) => {
            console.log(`\n🔍 验证第 ${index + 1} 个结构化数据 (类型: ${type})`);
            
            switch (type) {
                case 'Person':
                    this.validatePersonSchema(data);
                    break;
                case 'Organization':
                    this.validateOrganizationSchema(data);
                    break;
                case 'Website':
                    this.validateWebsiteSchema(data);
                    break;
                case 'Article':
                    this.validateArticleSchema(data);
                    break;
                default:
                    this.warnings.push(`未知的Schema类型: ${type}`);
            }
            
            this.validSchemas.push({ type, data });
        });

        return this.generateReport();
    }

    // 生成验证报告
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalSchemas: this.validSchemas.length,
            errors: this.errors,
            warnings: this.warnings,
            validSchemas: this.validSchemas.map(s => s.type),
            recommendations: []
        };

        // 生成建议
        if (this.errors.length === 0) {
            report.recommendations.push('✅ 所有结构化数据语法正确');
        } else {
            report.recommendations.push('❌ 修复结构化数据错误');
        }

        if (this.warnings.length > 0) {
            report.recommendations.push('⚠️ 考虑添加推荐的Schema字段');
        }

        // 检查是否包含核心Schema类型
        const coreTypes = ['Person', 'Organization', 'Website'];
        const missingTypes = coreTypes.filter(type => !report.validSchemas.includes(type));
        
        if (missingTypes.length > 0) {
            report.recommendations.push(`📋 建议添加缺失的Schema类型: ${missingTypes.join(', ')}`);
        }

        report.recommendations.push('🔍 使用Google Rich Results Test验证');
        report.recommendations.push('📊 监控搜索结果中的富媒体显示');

        return report;
    }

    // 打印验证结果
    printReport(report) {
        console.log('\n📄 结构化数据验证报告');
        console.log('='.repeat(50));
        console.log(`⏰ 验证时间: ${report.timestamp}`);
        console.log(`📊 Schema总数: ${report.totalSchemas}`);
        console.log(`❌ 错误数量: ${report.errors.length}`);
        console.log(`⚠️ 警告数量: ${report.warnings.length}`);
        
        if (report.errors.length > 0) {
            console.log('\n❌ 错误列表:');
            report.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        }
        
        if (report.warnings.length > 0) {
            console.log('\n⚠️ 警告列表:');
            report.warnings.forEach((warning, index) => {
                console.log(`${index + 1}. ${warning}`);
            });
        }
        
        console.log('\n🎯 建议操作:');
        report.recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
        });
        
        console.log('\n🔗 有用链接:');
        console.log('- Google Rich Results Test: https://search.google.com/test/rich-results');
        console.log('- Schema.org Validator: https://validator.schema.org/');
        console.log('- Google Search Console: https://search.google.com/search-console/');
    }
}

// 主要验证函数
function validateStructuredData() {
    const validator = new StructuredDataValidator();
    const report = validator.validateAll();
    validator.printReport(report);
    return report;
}

// 导出（Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StructuredDataValidator,
        validateStructuredData
    };
}

// 浏览器环境自动运行
if (typeof window !== 'undefined') {
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(validateStructuredData, 1000);
        });
    } else {
        setTimeout(validateStructuredData, 1000);
    }
}

/**
 * 使用说明:
 * 
 * 1. 在浏览器中运行:
 *    - 访问 https://www.guochunlin.com/
 *    - 打开开发者工具 (F12)
 *    - 在控制台中粘贴此脚本
 *    - 查看验证结果
 * 
 * 2. 手动验证特定Schema:
 *    const validator = new StructuredDataValidator();
 *    const data = validator.extractStructuredData();
 *    console.log(data);
 * 
 * 3. 外部验证工具:
 *    - Google Rich Results Test
 *    - Schema.org Validator
 *    - Google Search Console
 */