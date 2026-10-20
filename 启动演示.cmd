@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 松江区文旅态势感知平台 · 演示

where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 未检测到 Node.js，请先安装 Node.js 18 及以上版本。
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo [提示] 未找到 dist\index.html，正在打包，请稍候...
  if not exist ".tmp" mkdir ".tmp"
  set "TEMP=%CD%\.tmp"
  set "TMP=%CD%\.tmp"
  call npm.cmd run build
  if errorlevel 1 (
    echo [错误] 打包失败，请联系技术人员。
    pause
    exit /b 1
  )
)

node demo-server.mjs
pause
