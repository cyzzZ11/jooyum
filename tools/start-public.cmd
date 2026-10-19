@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0.."

set "TOKEN=%~1"
if "%TOKEN%"=="" goto :usage

set "CPOLAR=%~dp0cpolar\cpolar.exe"
if not exist "%CPOLAR%" (
  echo [!] 未找到 %CPOLAR%
  exit /b 1
)

echo.
echo [1/3] 检查本地服务 http://localhost:5173 ...
for /f %%c in ('curl -s -o nul -m 4 -w "%%{http_code}" http://localhost:5173/') do set CODE=%%c
if not "%CODE%"=="200" (
  echo [!] 本地服务没起来（返回 %CODE%）。
  echo     请先在另一个终端执行:  npm run dev
  exit /b 1
)
echo      OK

echo [2/3] 写入 cpolar authtoken ...
"%CPOLAR%" authtoken %TOKEN% >nul 2>&1

echo [3/3] 启动隧道（Ctrl+C 结束）
echo.
echo   ------------------------------------------------
echo   公网地址会在下面打印，形如 https://xxxx.cpolar.cn
echo   ------------------------------------------------
echo.
"%CPOLAR%" http 5173
goto :eof

:usage
echo.
echo   把本地 5173 端口暴露到公网（cpolar 免费隧道）
echo.
echo   用法:  tools\start-public.cmd ^<你的authtoken^>
echo.
echo   获取 token（免费，约 1 分钟）:
echo     1. 注册  https://dashboard.cpolar.com/signup
echo     2. 登录后打开  https://dashboard.cpolar.com/auth
echo     3. 复制 Authtoken，作为参数传给本脚本
echo.
echo   注意: 免费版每次重启隧道公网地址会变；重启开发服务器不影响隧道。
echo.
exit /b 1
