# 把大屏开放到局域网 / 公网

> 本文基于 2026-10-16 在这台机器上的实测。**已跑通公网访问**。

## 一、当前可用地址

| 场景 | 地址 |
|---|---|
| 本机 | `http://localhost:5173/` |
| 局域网（同 WiFi / 办公网） | `http://192.168.1.13:5173/` |
| **公网**（Cloudflare 快速隧道，别人在任何网络都能打开） | 见 `tools/tunnel.log` 里的 `https://xxxx-xxxx-xxxx.trycloudflare.com` |

公网地址每次重启隧道都会变（这是 Cloudflare 免注册隧道的行为）。

---

## 二、重要：一个把我误导了很久的坑

**这台机器的 git-bash 版 curl 是坏的。** 它对 `github.com`、`cloudflare.com` 等域名会返回

```
curl: (43) A libcurl function was given a bad argument
```

退出码 43 是 **libcurl 的参数错误**，不是网络错误，但配合 `-w "%{http_code}"` 会输出 `000`，
看起来和"被墙"一模一样。我一开始据此得出了"境外站点全被墙"的错误结论。

**用 PowerShell 交叉验证后真相是：境外站点全部可达。**

| 目标 | curl（误导） | PowerShell（真实） |
|---|---|---|
| `github.com` | 000 | **200** |
| `www.cloudflare.com` | 000 | **200** |
| `api.trycloudflare.com` | 000 | **405**（GET 该接口本就 405，说明通） |
| `registry.npmjs.org` | 000 | **200** |
| `cdn.jsdelivr.net` | 200 | 200 |

> 结论：**在这台机器上排查网络，用 PowerShell 的 `Invoke-WebRequest`，别用 git-bash 的 curl。**
> 项目里的 `scripts/*.mjs` 用的是 Node 内置 `fetch`，不受影响。

---

## 三、公网方案（已跑通）

### Cloudflare 快速隧道 —— 免注册、免代理

```bat
:: 开发服务器在另一个终端跑着:  npm run dev
tools\start-public-cloudflare.cmd
```

脚本会：检测本地 5173 → 缺则用 PowerShell 下载 `cloudflared.exe` → 起隧道并打印公网地址。
`cloudflared` 客户端已在 `tools/cloudflared/cloudflared.exe`（v2026.10.1）。

> 不需要开 Clash，也不需要注册任何账号，cloudflared 直接连出去。

### ⚠️ 必须配 `vite.config.ts` 的 `allowedHosts`

Vite 有主机白名单（防 DNS rebinding）。隧道域名的 Host 头不是 localhost，**不配就会 403**：

```
Blocked request. This host ("xxx.trycloudflare.com") is not allowed.
To allow this host, add "xxx.trycloudflare.com" to `server.allowedHosts` in vite.config.js.
```

已在 `vite.config.ts` 配好常见隧道域名后缀：

```ts
server: {
  host: '0.0.0.0',
  port: 5173,
  allowedHosts: [
    '.trycloudflare.com', '.cpolar.cn', '.cpolar.top', '.natappfree.cc',
    '.ngrok.cc', '.ngrok-free.app', '.i996.me', '.oray.net',
    '.localhost.run', '.serveo.net',
  ],
},
```

---

## 四、备选方案

### cpolar（国内隧道，需注册）

客户端已下载到 `tools/cpolar/cpolar.exe`（v3.2.62）。
cpolar 强制要求 authtoken（直接跑会 `user authToken auth failed`），需先注册。

```bat
:: 1. 注册 https://dashboard.cpolar.com/signup
:: 2. 到 https://dashboard.cpolar.com/auth 复制 Authtoken
:: 3. 运行
tools\start-public.cmd <你的authtoken>
```

同类可替换：natapp、花生壳(oray)、樱花frp(i996.me)、ngrok.cc。

### 静态托管（长期）

```bat
npm run build      :: 产物 dist/（约 5.7 MB）
npm run preview    :: 本地预览构建结果
```

丢到 Gitee Pages / 阿里云 OSS / 腾讯云 COS 等即可，需要自备账号。

### 局域网

已在 `vite.config.ts` 里 `host: '0.0.0.0'`，同网段直接访问 `http://192.168.1.13:5173/`。

---

## 五、tools/ 目录

```
tools/
├─ start-public-cloudflare.cmd   # Cloudflare 快速隧道（免注册，推荐）
├─ start-public.cmd              # cpolar 隧道（需 authtoken）
├─ cloudflared/cloudflared.exe   # 已下载（55 MB）
├─ cpolar/cpolar.exe             # 已下载（15.7 MB）
├─ cpolar.zip                    # 原始压缩包
└─ tunnel.log                    # 隧道运行日志（公网地址在这里）
```

二进制已在 `.gitignore` 中排除。

---

## 六、排查备忘

- **隧道地址 403** → 十有八九是 Vite 的 `allowedHosts` 没配（看响应体，会明说是 Vite 拦的）
- **隧道起来了但打不开** → 先 `curl localhost:5173` 确认本机可访问
- **判断是否被墙** → 用 PowerShell，不要用 git-bash 的 curl
- **看公网地址** → `grep trycloudflare tools/tunnel.log`
- **Clash 说明** → 本机装了 Clash Verge（混合端口 7897，控制口 9097）。
  排查时**不需要**它；它现在开着会把系统代理打开（`ProxyEnable=1`），
  cloudflared 不受影响（Go 只认 `HTTPS_PROXY` 环境变量，不读 Windows 系统代理）。
