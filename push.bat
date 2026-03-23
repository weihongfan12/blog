@echo off
chcp 65001 > nul
echo ========================================
echo 自动提交并推送到 GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 添加所有修改的文件...
"C:\Program Files\Git\bin\git.exe" add .
if %errorlevel% neq 0 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✅ 文件已添加
echo.

echo [2/4] 提交更改...
"C:\Program Files\Git\bin\git.exe" commit -m "Update blog content"
if %errorlevel% neq 0 (
    echo ⚠️ 没有需要提交的更改
    pause
    exit /b 0
)
echo ✅ 提交成功
echo.

echo [3/4] 推送到 GitHub...
"C:\Program Files\Git\bin\git.exe" push origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查网络连接或 GitHub 凭证
    pause
    exit /b 1
)
echo ✅ 推送成功
echo.

echo [4/4] 完成！
echo ========================================
echo 🎉 代码已成功推送到 GitHub
echo 🌐 Cloudflare Pages 将在几分钟内自动部署
echo ========================================
echo.
pause