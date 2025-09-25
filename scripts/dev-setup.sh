#!/bin/bash

# 哲学的花园导游 - 本地开发环境设置脚本
# Philosophy Garden Guide - Local Development Setup Script

echo "🌟 欢迎使用哲学的花园导游开发环境设置脚本"
echo "=================================================="

# 检查Node.js版本
echo "📋 检查系统环境..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js版本: $NODE_VERSION"
    
    # 检查版本是否满足要求 (v18+)
    NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
        echo "⚠️  警告: 建议使用Node.js 18或更高版本"
        echo "   当前版本: $NODE_VERSION"
        echo "   请访问 https://nodejs.org 下载最新版本"
    fi
else
    echo "❌ 未找到Node.js，请先安装Node.js"
    echo "   下载地址: https://nodejs.org"
    exit 1
fi

# 检查npm版本
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm版本: $NPM_VERSION"
else
    echo "❌ 未找到npm包管理器"
    exit 1
fi

echo ""
echo "🔧 开始安装项目依赖..."

# 安装依赖
if npm install; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败，请检查网络连接或尝试以下命令："
    echo "   npm cache clean --force"
    echo "   rm -rf node_modules package-lock.json"
    echo "   npm install"
    exit 1
fi

echo ""
echo "🏗️  构建项目..."

# 检查构建是否成功
if npm run build; then
    echo "✅ 项目构建成功"
else
    echo "❌ 项目构建失败，请检查代码是否有错误"
    exit 1
fi

echo ""
echo "🎉 开发环境设置完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 启动开发服务器: npm run dev"
echo "2. 在浏览器中访问: http://localhost:3000"
echo "3. 按照 DEVELOPMENT.md 中的检查清单验证功能"
echo ""
echo "🔍 快速验证命令："
echo "   npm run dev     # 启动开发服务器"
echo "   npm run build   # 构建生产版本"
echo "   npm run start   # 启动生产服务器"
echo "   npm run lint    # 代码质量检查"
echo ""
echo "📚 更多信息请查看:"
echo "   - README.md (项目概述)"
echo "   - DEVELOPMENT.md (开发指南)"
echo ""
echo "🚀 准备好开始开发了！"