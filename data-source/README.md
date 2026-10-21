# 数据源存档（节假日游客大数据监测平台）

本目录保存从「节假日游客大数据监测平台」（`https://jice.smartsteps.com/travel/`）抓取的**原始接口返回**与**规范化数据**，
以免只看截图、后续项目无处复用。

- 抓取口径：**松江区（adcode 310117）+ 2026 年国庆节（10.01–10.07）**
- 抓取时间：2026-10-20
- 平台业务口径：手机信令监测，客流单位为人次；区县级不提供性别/年龄/消费画像（景区级提供）

---

## 一、目录结构

```
data-source/
├─ raw/<抓取日期>/
│  ├─ api/<接口名>.json       每个接口的完整返回（含查询条件，可原样复现）
│  ├─ manifest.json           接口清单：名称 / dataId / filter / 行数 / 抓取时间
│  ├─ dataids.json            前端用到的全部 dataId 及其实例化参数
│  └─ api-capture.jsonl       浏览器侧请求录制（已脱敏，可回溯调用顺序）
└─ normalized/
   └─ songjiang-2026-guojiaqing.json   规范化数据集（其他项目直接消费这一个文件）
```

`src/mock/platform2026.js` 由 `normalized/songjiang-2026-guojiaqing.json` **自动生成**，不要手改。

---

## 一·补、字段字典（`normalized/*.json`）

所有比例字段为**小数**（`0.2771` = +27.71%），所有客流字段为**整数人次**。

| 路径 | 含义 |
| --- | --- |
| `meta` | 平台、接口、抓取时间、年/假期、区域（310117 松江区 / 310100 上海市）、假期起止 |
| `songjiang.visitors.total` | 累计接待游客（乘降去重口径） |
| `songjiang.visitors.dailyAvg` | 日均接待 |
| `songjiang.visitors.tb` | 同比（小数） |
| `songjiang.visitors.lastYearTotal` | 2025 同期累计接待 |
| `songjiang.night.total` / `.ratio` / `.tb` | 夜间游客量 / 夜间占比 / 夜间同比 |
| `songjiang.daily[]` | `{ day, date, visitors, nightVisitors }`，7 条，合计 = `visitors.total` |
| `songjiang.lastYearDaily[]` | 同上结构，2025 同期 |
| `songjiang.profile.origin` | `{ local, outside }` 本地 / 外地占比（区县级仅此两项） |
| `songjiang.profile.residency` | 居住时长分布 `d1/d2/d3/d4/d5up`（平台本期返回 0） |
| `songjiang.scenic.total` | 重点景区累计接待（9 家合计） |
| `songjiang.scenic.tb` / `.nightTotal` / `.nightRatio` / `.nightTb` | 景区同比 / 景区夜间量 / 占比 / 同比 |
| `songjiang.scenic.list[]` | 9 家景区：`code`（景区编码）、`name`、`visitors`、`share`（占重点景区比）、`tb`（同比）、`daily[]`（7 天）、`profile`（画像） |
| `songjiang.scenic.profile` | 9 家按接待量加权的整体画像：`gender` / `age` / `consume` / `origin` / `stay` |
| `songjiang.rankInCity` | `{ rank, districts, nightRank }` 在上海市各区中的排名 / 区县数 / 夜间排名 |
| `shanghai.*` | 上海市同口径数据集（对比基准）：`visitors` / `night` / `scenic` / `business` / `districts[]` / `districtsNight[]` / `profile` |
| `shanghai.business.total` | 上海市重点商圈接待（松江区该项平台未监测） |

CSV 等价文件在 `normalized/csv/`：`sj-daily-7days.csv`、`sj-scenic-rank.csv`、`sj-scenic-daily.csv`、`sj-scenic-profile.csv`、`sh-districts.csv`。
机读目录（接口清单 + 注意事项）在 `data-source/index.json`。

---

## 二、接口协议（复用要点）

平台所有数据都走同一个网关接口，靠 `dataId` + `filter` 区分指标：

```
POST https://jice.smartsteps.com/smart-decision/api/v2/nocache/data/json
Authorization: Bearer <localStorage.holiday_utoken>
Content-Type: application/json

{
  "adcode": "110000",
  "ext": { "rest": { "method": "GET",
    "url": "/api/v4/attr/query/list?dataId=<DATA_ID>&filter=<URL编码的JSON>" } },
  "level": "province",
  "queryType": "v4daasData",
  "regionGroup": "general",
  "time": "2024"
}
```

响应：`{ "data": [ { "body": { "code": "1", "msg": "SUCCESS", "data": [ … ] } } ] }`

`filter` 关键字段：

| 字段 | 含义 | 说明 |
| --- | --- | --- |
| `year` | 年份 | 平台可选 2023–2026 |
| `holiday_name` | 节假日 | `国庆节` / `中秋节` / `端午节` / `劳动节` |
| `fnid` | 区域编码 | `310100` 上海市、`310117` 松江区、`310000` 上海（省级） |
| `lv` | 区域层级 | `1` 省 / `2` 市（返回各区县行）/ `3` 区县（返回本区景区、商圈） |
| `scenic_code` | 景区编码 | `0` 表示不限定；对比接口用逗号分隔多个编码 |
| `time_start` / `time_end` | 采样区间 | 如 `20261001` / `20261007` |

> 注意：平台源码里部分 `filter` 不是严格 JSON（例如 `sort=all_value` 未加引号），复现时补引号即可。

### 常用 dataId 速查

| dataId | 取什么 |
| --- | --- |
| `jjrykdsjjcpt_csyk_ykgm_grand_total` | 区域累计接待游客 / 夜间游客 / 同比 |
| `jjrykdsjjcpt_csyk_ykgm_receive_tourists` | 区域逐日接待序列（含去年） |
| `jjrykdsjjcpt_csyk_ykgm_tourist_comparison` | 区域今年 vs 去年汇总 |
| `jjrykdsjjcpt_csyk_ykgm_regional_reception_city` | 全市各区县接待排行（含松江行） |
| `jjrykdsjjcpt_csyk_ykgm_regional_reception_city_night` | 全市各区县夜间排行 |
| `jjrykdsjjcpt_jqyk_ykgm_grand_total_gather_v3` | 重点景区汇总（`lv=3` 时为本区） |
| `jjrykdsjjcpt_jqyk_ykgm_regional_reception_gather_v3` | 景区接待排行 |
| `jjrykdsjjcpt_jqyk_ykgm_receive_tourists_gather_v3` | 景区维度逐日序列 |
| `jjrykdsjjcpt_sqyk_*` | 商圈同口径系列（松江区重点商圈平台未监测，返回空） |
| `qgjjshfzldjsc_ykdb_csdb_tourist` | 区域画像（本地/外地、居住时长） |
| `qgjjshfzldjsc_ykdb_jqdb_tourist` | **景区画像**（性别 / 年龄 / 消费等级 / 停留时长） |
| `qgjjshfzldjsc_ykdb_csdb_receive_tourists` | 区域逐日序列（带真实日期字段） |
| `jjrykdsjjcpt_region` | 全国行政区划字典（id / name / pid / lv / 经纬度） |
| `jjrykdsjjcpt_map_boundary` | 行政区边界 GeoJSON |

---

## 三、重新抓取（换年份 / 换地区时）

1. 用调试端口启动 Chrome 并登录：

   ```powershell
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" `
     --remote-debugging-port=9222 --user-data-dir="<项目>\.chrome-profile" `
     "https://jice.smartsteps.com/travel/#/login"
   ```

2. 抓取（脚本复用页面里的登录 token，无需再输入密码）：

   ```powershell
   node scripts/fetch-smartsteps-data.mjs            # 28 个接口：松江 + 上海 + 字典
   node scripts/fetch-smartsteps-scenic.mjs          # 9 家景区的画像与逐日序列
   node scripts/build-platform-data.mjs 2026-10-20   # 生成规范化数据 + src/mock/platform2026.js
   ```

3. 换地区/年份：改 `scripts/fetch-smartsteps-data.mjs` 顶部的 `YEAR` / `HOLIDAY` / `SJ`，
   区域编码可在 `raw/<日期>/api/ref_region_dict.json` 里查。

---

## 四、完整性校验（接口失效后仍可确认数据可用）

存档是**纯本地文件**，构建产物里没有任何对平台的引用（`grep smartsteps` 命中 0），
因此平台接口失效、账号过期都不影响演示。随时可以跑一次自洽校验：

```powershell
node scripts/verify-data-archive.mjs
```

校验项（当前全部通过，7/7）：

1. manifest 登记的 30 个接口文件是否齐全；
2. 松江区 7 日客流 / 夜间合计是否等于区级累计；
3. 9 家景区合计是否等于重点景区总量；
4. 9 家景区逐日序列（各 7 天）是否与各自累计一致；
5. 上海市各区排行里的松江区行是否等于区级累计（第 3/16）；
6. `src/mock/platform2026.js` 与 `normalized/*.json` 是否完全一致。

---

## 五、使用注意

- `raw/*/api/*.json` 是**平台原样返回**，未做加工；`normalized/` 只做结构整理与百分比换算。
- 采集涉及登录态，`api-capture.jsonl` 已把 `Authorization` / Cookie 替换为 `<REDACTED>`，请勿回填真实 token。
- 平台不提供区县级消费金额、入境客源、街镇级客流；本项目中这些口径仍为测算值，
  见 `docs/数据源清单.md` 的「来源类型」列。
- 对外发布时请遵循平台与数据提供方的使用约定。
