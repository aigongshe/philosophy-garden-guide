#!/usr/bin/env node

/**
 * 网站健康检查脚本
 * 检查所有关键页面的可访问性和性能
 */

const https = require('https');
const http = require('http');

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.guochunlin.com'
  : 'http://localhost:3000';

// 需要检查的页面列表
const pagesToCheck = [
  '/',
  '/posts',
  '/categories',
  '/categories/philosophy-thinking',
  '/categories/business-wisdom',
  '/categories/life-philosophy',
  '/about',
  '/api/sitemap',
  '/api/robots',
];

// 检查单个页面
async function checkPage(path) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${path}`;
    const client = baseUrl.startsWith('https') ? https : http;
    
    const startTime = Date.now();
    
    const req = client.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      resolve({
        path,
        status: res.statusCode,
        responseTime,
        headers: res.headers,
        success: res.statusCode >= 200 && res.statusCode < 400,
      });
    });
    
    req.on('error', (error) => {
      resolve({
        path,
        status: 0,
        responseTime: 0,
        error: error.message,
        success: false,
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        path,
        status: 0,
        responseTime: 0,
        error: 'Timeout',
        success: false,
      });
    });
  });
}

// 运行健康检查
async function runHealthCheck() {
  console.log('🏥 开始网站健康检查...\n');
  console.log(`🌐 检查地址: ${baseUrl}\n`);
  
  const results = [];
  
  for (const path of pagesToCheck) {
    process.stdout.write(`检查 ${path}... `);
    const result = await checkPage(path);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${result.status} (${result.responseTime}ms)`);
    } else {
      console.log(`❌ ${result.status || 'ERROR'} ${result.error ? `(${result.error})` : ''}`);
    }
  }
  
  // 生成报告
  console.log('\n📊 健康检查报告');
  console.log('='.repeat(50));
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  const successRate = (successCount / totalCount * 100).toFixed(1);
  
  console.log(`✅ 成功页面: ${successCount}/${totalCount} (${successRate}%)`);
  
  const avgResponseTime = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + r.responseTime, 0) / successCount;
  
  console.log(`⚡ 平均响应时间: ${avgResponseTime.toFixed(0)}ms`);
  
  // 失败的页面
  const failedPages = results.filter(r => !r.success);
  if (failedPages.length > 0) {
    console.log('\n❌ 失败页面:');
    failedPages.forEach(page => {
      console.log(`   ${page.path}: ${page.error || `HTTP ${page.status}`}`);
    });
  }
  
  // 慢页面警告
  const slowPages = results.filter(r => r.success && r.responseTime > 2000);
  if (slowPages.length > 0) {
    console.log('\n⚠️  响应较慢的页面 (>2s):');
    slowPages.forEach(page => {
      console.log(`   ${page.path}: ${page.responseTime}ms`);
    });
  }
  
  // SEO检查
  console.log('\n🔍 SEO检查:');
  const homePageResult = results.find(r => r.path === '/');
  if (homePageResult && homePageResult.success) {
    const headers = homePageResult.headers;
    
    // 检查重要的SEO头部
    const seoChecks = [
      {
        name: 'Content-Type',
        check: headers['content-type']?.includes('text/html'),
        value: headers['content-type'],
      },
      {
        name: 'Cache-Control',
        check: !!headers['cache-control'],
        value: headers['cache-control'],
      },
      {
        name: 'X-Powered-By隐藏',
        check: !headers['x-powered-by'] || headers['x-powered-by'] !== 'Express',
        value: headers['x-powered-by'] || '已隐藏',
      },
    ];
    
    seoChecks.forEach(check => {
      const status = check.check ? '✅' : '⚠️';
      console.log(`   ${status} ${check.name}: ${check.value || 'N/A'}`);
    });
  }
  
  // 性能评级
  console.log('\n⚡ 性能评级:');
  if (avgResponseTime < 500) {
    console.log('   🚀 优秀 (<500ms)');
  } else if (avgResponseTime < 1000) {
    console.log('   ✅ 良好 (<1s)');
  } else if (avgResponseTime < 2000) {
    console.log('   ⚠️  一般 (<2s)');
  } else {
    console.log('   ❌ 需要优化 (>2s)');
  }
  
  console.log('\n🎉 健康检查完成!');
  
  // 返回退出码
  process.exit(failedPages.length > 0 ? 1 : 0);
}

// 如果直接运行此脚本
if (require.main === module) {
  runHealthCheck().catch(console.error);
}

module.exports = { runHealthCheck, checkPage };