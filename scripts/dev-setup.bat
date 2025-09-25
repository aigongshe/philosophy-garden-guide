@echo off
chcp 65001 >nul
echo 🌟 欢迎使用哲学的花园导游开发环境设置脚本
echo ==================================================

echo 📋 检查系统环境...

:: 检查Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未找到Node.js，请先安装Node.js
    echo    下载地址: https://nodejs.org
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js版本: %NODE_VERSION%
)

:: 检查npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未找到npm包管理器
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm版本: %NPM_VERSION%
)

echo.
echo 🔧 开始安装项目依赖...

:: 安装依赖
npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败，请检查网络连接或尝试以下命令：
    echo    npm cache clean --force
    echo    rmdir /s /q node_modules
    echo    del package-lock.json
    echo    npm install
    pause
    exit /b 1
) else (
    echo ✅ 依赖安装成功
)

echo.
echo 🏗️  构建项目...

:: 构建项目
npm run build
if %errorlevel% neq 0 (
    echo ❌ 项目构建失败，请检查代码是否有错误
    pause
    exit /b 1
) else (
    echo ✅ 项目构建成功
)

echo.
echo 🎉 开发环境设置完成！
echo.
echo 📋 接下来的步骤：
echo 1. 启动开发服务器: npm run dev
echo 2. 在浏览器中访问: http://localhost:3000
echo 3. 按照 DEVELOPMENT.md 中的检查清单验证功能
echo.
echo 🔍 快速验证命令：
echo    npm run dev     # 启动开发服务器
echo    npm run build   # 构建生产版本
echo    npm run start   # 启动生产服务器
echo    npm run lint    # 代码质量检查
echo.
echo 📚 更多信息请查看:
echo    - README.md (项目概述)
echo    - DEVELOPMENT.md (开发指南)
echo.
echo 🚀 准备好开始开发了！
pause