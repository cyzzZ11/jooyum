@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0.."

set "CF=%~dp0cloudflared\cloudflared.exe"

echo.
echo [1/3] 检查本地服务 http://localhost:5173 ...
for /f %%c in ('powershell -NoProfile -Command "try{(Invoke-WebRequest -Uri ''http://localhost:5173/'' -UseBasicParsing -TimeoutSec 5).StatusCode}catch{''000''}"') do set CODE=%%c
if not "%CODE%"=="200" (
  echo [错误] 本地服务没起来（返回 %CODE%）
  echo        请先在另一个终端执行:  npm run dev
  exit /b 1
)
echo       OK

if exist "%CF%" goto :run

echo [2/3] 下载 cloudflared ...
if not exist "%~dp0cloudflared" mkdir "%~dp0cloudflared"
powershell -NoProfile -Command "$ProgressPreference='SilentlyContinue'; try{ Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile '%CF%' -UseBasicParsing; 'OK' } catch { 'ERR' }"
if not exist "%CF%" (
  echo [错误] 下载失败，请手动下载 cloudflared-windows-amd64.exe 放到 tools\cloudflared\
  exit /b 1
)
echo       OK

:run
echo [3/3] 启动 Cloudflare 快速隧道（Ctrl+C 结束）
echo.
echo   ------------------------------------------------------------
echo   公网地址会打印在下面的输出里，形如
echo     https://xxxx-xxxx-xxxx.trycloudflare.com
echo   ------------------------------------------------------------
echo.
"%CF%" tunnel --no-autoupdate --url http://localhost:5173
goto :eof
