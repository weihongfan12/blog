# 博客自动化部署脚本
# 功能：自动执行 Git 操作，执行前询问确认

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "=== 博客自动化部署脚本 ===" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host ""
    Write-Host "请选择操作：" -ForegroundColor Yellow
    Write-Host "1. 查看当前状态" -ForegroundColor Green
    Write-Host "2. 添加所有更改" -ForegroundColor Green
    Write-Host "3. 提交更改" -ForegroundColor Green
    Write-Host "4. 推送到 GitHub" -ForegroundColor Green
    Write-Host "5. 查看远程状态" -ForegroundColor Green
    Write-Host "6. 退出" -ForegroundColor Red
    Write-Host ""
    
    $choice = Read-Host "请输入选项 (1-6): "
    
    switch ($choice) {
        "1" { Show-Status }
        "2" { Add-All }
        "3" { Commit-Changes }
        "4" { Push-To-GitHub }
        "5" { Show-RemoteStatus }
        "6" { 
            Write-Host "退出脚本" -ForegroundColor Red
            exit
        }
        default {
            Write-Host "无效选项，请重新选择" -ForegroundColor Red
        }
    }
}

function Show-Status {
    Write-Host ""
    Write-Host "--- 当前状态 ---" -ForegroundColor Cyan
    
    cd "d:\软件\Trae CN\my-blog"
    
    $status = & "C:\Program Files\Git\bin\git.exe" status
    Write-Host $status
    
    Write-Host ""
    Write-Host "--- 未跟踪的文件 ---" -ForegroundColor Cyan
    
    $untracked = & "C:\Program Files\Git\bin\git.exe" ls-files --others --exclude-standard
    if ($untracked) {
        Write-Host $untracked -ForegroundColor Yellow
    } else {
        Write-Host "没有未跟踪的文件" -ForegroundColor Green
    }
    
    Write-Host ""
    Read-Host "按任意键返回主菜单..."
}

function Add-All {
    Write-Host ""
    Write-Host "--- 添加所有更改 ---" -ForegroundColor Cyan
    
    cd "d:\软件\Trae CN\my-blog"
    
    Write-Host "执行：git add ." -ForegroundColor Yellow
    $result = & "C:\Program Files\Git\bin\git.exe" add . 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 成功添加所有更改" -ForegroundColor Green
    } else {
        Write-Host "❌ 添加失败" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "按任意键返回主菜单..."
}

function Commit-Changes {
    Write-Host ""
    Write-Host "--- 提交更改 ---" -ForegroundColor Cyan
    
    cd "d:\软件\Trae CN\my-blog"
    
    $commitMessage = Read-Host "请输入提交信息（留空使用默认）："
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Update blog content"
    }
    
    Write-Host "执行：git commit -m `"$commitMessage"`" -ForegroundColor Yellow
    $result = & "C:\Program Files\Git\bin\git.exe" commit -m $commitMessage 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 成功提交更改" -ForegroundColor Green
    } else {
        Write-Host "❌ 提交失败" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "按任意键返回主菜单..."
}

function Push-To-GitHub {
    Write-Host ""
    Write-Host "--- 推送到 GitHub ---" -ForegroundColor Cyan
    
    cd "d:\软件\Trae CN\my-blog"
    
    Write-Host "准备推送到 GitHub..." -ForegroundColor Yellow
    Write-Host "远程仓库：https://github.com/weihongfan12/blog" -ForegroundColor Green
    Write-Host ""
    
    $confirm = Read-Host "确认要推送到 GitHub 吗？(y/n): "
    if ($confirm -eq "y" -or $confirm -eq "Y") {
        Write-Host "执行：git push origin main" -ForegroundColor Yellow
        $result = & "C:\Program Files\Git\bin\git.exe" push origin main 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 成功推送到 GitHub！" -ForegroundColor Green
            Write-Host ""
            Write-Host "Cloudflare Pages 将在 1-3 分钟内自动部署" -ForegroundColor Cyan
        } else {
            Write-Host "❌ 推送失败" -ForegroundColor Red
            Write-Host $result -ForegroundColor Red
        }
    } else {
        Write-Host "已取消推送" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Read-Host "按任意键返回主菜单..."
}

function Show-RemoteStatus {
    Write-Host ""
    Write-Host "--- 远程仓库状态 ---" -ForegroundColor Cyan
    
    cd "d:\软件\Trae CN\my-blog"
    
    Write-Host "执行：git remote -v" -ForegroundColor Yellow
    $result = & "C:\Program Files\Git\bin\git.exe" remote -v 2>&1
    Write-Host $result
    
    Write-Host ""
    Write-Host "执行：git ls-remote origin" -ForegroundColor Yellow
    $result = & "C:\Program Files\Git\bin\git.exe" ls-remote origin 2>&1
    Write-Host $result
    
    Write-Host ""
    Read-Host "按任意键返回主菜单..."
}

Write-Host ""
Write-Host "=== 脚本已准备就绪 ===" -ForegroundColor Green
Write-Host ""
Write-Host "使用说明：" -ForegroundColor Cyan
Write-Host "1. 每次操作前都会询问确认" -ForegroundColor Yellow
Write-Host "2. 可以查看当前 Git 状态" -ForegroundColor Yellow
Write-Host "3. 推送前会显示远程仓库信息" -ForegroundColor Yellow
Write-Host "4. 所有操作都有成功/失败提示" -ForegroundColor Yellow
Write-Host ""
Read-Host "按任意键开始..."

while ($true) {
    Clear-Host
    Show-Menu
}