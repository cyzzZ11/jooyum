/**
 * 把 `data-source/raw/<日期>/api/*.json` 的原始接口返回，整理成：
 *
 *   1. data-source/normalized/songjiang-2026-guojiaqing.json   规范化数据（跨项目复用）
 *   2. src/mock/platform2026.js                                项目内使用的 ES 模块
 *
 * 用法：node scripts/build-platform-data.mjs [raw 日期目录]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const day = process.argv[2] || new Date().toISOString().slice(0, 10)
const RAW = join('data-source', 'raw', day)
const API = join(RAW, 'api')
const NORM_DIR = join('data-source', 'normalized')
const NORM = join(NORM_DIR, 'songjiang-2026-guojiaqing.json')

const read = (name) => {
  const j = JSON.parse(readFileSync(join(API, name + '.json'), 'utf8'))
  return j.response?.data ?? j.response ?? null
}
const manifest = JSON.parse(readFileSync(join(RAW, 'manifest.json'), 'utf8'))
const fetchedAt = manifest[0]?.fetchedAt || new Date().toISOString()

const round = (v, n = 0) => {
  const p = 10 ** n
  return Math.round(v * p) / p
}
const r4 = (v) => round(v, 4)

/* ---------- 松江区 ---------- */
const sjTotal = read('sj_grand_total')[0]
const sjYear = read('sj_year_compare')
const sjDaily = read('sj_daily')
const sjProfile = read('sj_profile')[0]
const sjScenicTotal = read('sj_scenic_total')[0]
const sjScenicRank = read('sj_scenic_rank')
const sjScenicProfile = read('sj_scenic_profile')
const sjScenicDaily = read('sj_scenic_daily_dated')

const pickYear = (rows, year) => rows.filter((r) => String(r.year) === String(year))
const sjCur = pickYear(sjDaily, 2026)
const sjLast = pickYear(sjDaily, 2025)

const dates = ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07']

/** 景区画像按接待量加权聚合 */
function weightedProfile(rows) {
  const wSum = rows.reduce((a, r) => a + (r.all_value || 0), 0) || 1
  const acc = (field) => rows.reduce((a, r) => a + (r[field] || 0) * (r.all_value || 0), 0) / wSum
  const keys = Object.keys(rows[0] || {}).filter((k) => /_ratio$/.test(k) && !/^tb_|^avg_tb/.test(k))
  const out = {}
  for (const k of keys) out[k] = r4(acc(k))
  return out
}

const scenics = sjScenicRank.map((r) => {
  const profile = sjScenicProfile.find((p) => String(p.scenic_code) === String(r.region_code))
  const daily = sjScenicDaily.filter((d) => String(d.scenic_code) === String(r.region_code)).sort((a, b) => a.date_time - b.date_time)
  return {
    code: String(r.region_code),
    name: r.scenic_name,
    visitors: r.all_value,
    visitorsAvg: round(r.all_value_avg, 2),
    share: r4(r.zb_ratio_all_value || 0),
    tb: r4(r.tb_ratio_all_value || 0),
    daily: daily.map((d) => ({ day: Number(d.date_time), visitors: d.all_value, nightVisitors: d.all_night })),
    profile: profile
      ? {
          gender: { male: r4(profile.male_value_ratio), female: r4(profile.female_value_ratio) },
          age: {
            '16-24': r4(profile.age_16_24_ratio),
            '25-34': r4(profile.age_25_34_ratio),
            '35-44': r4(profile.age_35_44_ratio),
            '45-54': r4(profile.age_45_54_ratio),
            '55+': r4(profile.age_above_55_ratio)
          },
          consume: {
            s1_low: r4(profile.s1_ratio),
            s2_midLow: r4(profile.s2_ratio),
            s3_mid: r4(profile.s3_ratio),
            s4_midHigh: r4(profile.s4_ratio),
            s5_high: r4(profile.s5_ratio)
          },
          origin: { local: r4(profile.bd_value_ratio), outside: r4(profile.wd_value_ratio) },
          stay: {
            lt1h: r4(profile.time1_ratio),
            h1to2: r4(profile.time1_2_ratio),
            h2to4: r4(profile.time2_4_ratio),
            gt4h: r4(profile.time4_ratio)
          }
        }
      : null
  }
})

const scenicWeightedProfile = sjScenicProfile.length ? weightedProfile(sjScenicProfile) : null

/* ---------- 上海市（对比基准） ---------- */
const shTotal = read('sh_grand_total')[0]
const shYear = read('sh_year_compare')
const shScenicTotal = read('sh_scenic_total')[0]
const shBusinessTotal = read('sh_business_total')[0]
const shDistricts = read('sh_districts').map((r, i) => ({
  rank: i + 1,
  name: r.region_name,
  visitors: r.all_value,
  tb: r4(r.tb_ratio_all_value || 0)
}))
const shDistrictsNight = read('sh_districts_night').map((r, i) => ({
  rank: i + 1,
  name: r.region_name,
  nightVisitors: r.all_night,
  nightRatio: r4(r.zb_ratio_all_night || 0)
}))
const shProfile = read('sh_profile')[0]

const sjRank = shDistricts.find((d) => d.name === '松江区')
const sjNightRank = shDistrictsNight.find((d) => d.name === '松江区')

const normalized = {
  meta: {
    platform: '节假日游客大数据监测平台',
    host: 'https://jice.smartsteps.com/travel/',
    api: 'POST /smart-decision/api/v2/nocache/data/json → /api/v4/attr/query/list?dataId=…',
    appCode: 'jjrykdsjjcpt / qgjjshfzldjsc',
    capturedAt: fetchedAt,
    year: 2026,
    holiday: '国庆节',
    period: { start: '2026-10-01', end: '2026-10-07', days: 7 },
    region: { code: 310117, name: '松江区', parent: { code: 310100, name: '上海市' } },
    note: '数值为平台原样返回（人次），未做任何加工；区县级不提供性别/年龄/消费画像，景区级提供。'
  },
  songjiang: {
    visitors: {
      total: sjTotal.all_value,
      dailyAvg: round(sjTotal.all_value_avg, 2),
      tb: r4(sjTotal.tb_ratio_all_value),
      lastYearTotal: sjYear.find((r) => String(r.year) === '2025')?.all_value_sum ?? null
    },
    night: {
      total: sjTotal.all_night,
      ratio: r4(sjTotal.zb_ratio_all_night),
      tb: r4(sjTotal.tb_ratio_all_night),
      lastYearTotal: sjYear.find((r) => String(r.year) === '2025')?.all_night_sum ?? null
    },
    daily: sjCur.map((d) => ({ day: d.date_time, date: '2026-' + dates[d.date_time - 1], visitors: d.all_value, nightVisitors: d.all_night })),
    lastYearDaily: sjLast.map((d) => ({ day: d.date_time, date: '2025-' + dates[d.date_time - 1], visitors: d.all_value, nightVisitors: d.all_night })),
    profile: {
      origin: { local: r4(sjProfile.bd_value_ratio), outside: r4(sjProfile.wd_value_ratio) },
      residency: {
        d1: r4(sjProfile.residency1_ratio),
        d2: r4(sjProfile.residency2_ratio),
        d3: r4(sjProfile.residency3_ratio),
        d4: r4(sjProfile.residency4_ratio),
        d5up: r4(sjProfile.residency_5up_ratio)
      },
      note: '区县级仅提供本地/外地与居住时长；性别、年龄、消费能力为 0（平台不提供），见 scenicProfile'
    },
    scenic: {
      total: sjScenicTotal.all_value,
      dailyAvg: round(sjScenicTotal.all_value_avg, 2),
      tb: r4(sjScenicTotal.tb_ratio_all_value),
      nightTotal: sjScenicTotal.all_night,
      nightRatio: r4(sjScenicTotal.zb_ratio_all_night),
      nightTb: r4(sjScenicTotal.tb_ratio_all_night),
      count: scenics.length,
      list: scenics,
      profile: scenicWeightedProfile
        ? {
            gender: { male: scenicWeightedProfile.male_value_ratio, female: scenicWeightedProfile.female_value_ratio },
            age: {
              '16-24': scenicWeightedProfile.age_16_24_ratio,
              '25-34': scenicWeightedProfile.age_25_34_ratio,
              '35-44': scenicWeightedProfile.age_35_44_ratio,
              '45-54': scenicWeightedProfile.age_45_54_ratio,
              '55+': scenicWeightedProfile.age_above_55_ratio
            },
            consume: {
              s1_low: scenicWeightedProfile.s1_ratio,
              s2_midLow: scenicWeightedProfile.s2_ratio,
              s3_mid: scenicWeightedProfile.s3_ratio,
              s4_midHigh: scenicWeightedProfile.s4_ratio,
              s5_high: scenicWeightedProfile.s5_ratio
            },
            origin: { local: scenicWeightedProfile.bd_value_ratio, outside: scenicWeightedProfile.wd_value_ratio },
            stay: {
              lt1h: scenicWeightedProfile.time1_ratio,
              h1to2: scenicWeightedProfile.time1_2_ratio,
              h2to4: scenicWeightedProfile.time2_4_ratio,
              gt4h: scenicWeightedProfile.time4_ratio
            },
            method: '9 家重点景区按接待量加权平均'
          }
        : null
    },
    business: { total: null, note: '平台未监测松江区重点商圈（接口返回空），商圈数据仍为测算值' },
    rankInCity: { rank: sjRank?.rank ?? null, districts: shDistricts.length, nightRank: sjNightRank?.rank ?? null }
  },
  shanghai: {
    visitors: {
      total: shTotal.all_value,
      dailyAvg: round(shTotal.all_value_avg, 2),
      tb: r4(shTotal.tb_ratio_all_value),
      lastYearTotal: shYear.find((r) => String(r.year) === '2025')?.all_value_sum ?? null
    },
    night: {
      total: shTotal.all_night,
      ratio: r4(shTotal.zb_ratio_all_night),
      tb: r4(shTotal.tb_ratio_all_night)
    },
    scenic: {
      total: shScenicTotal.all_value,
      tb: r4(shScenicTotal.tb_ratio_all_value),
      nightTotal: shScenicTotal.all_night,
      nightRatio: r4(shScenicTotal.zb_ratio_all_night)
    },
    business: {
      total: shBusinessTotal.all_value,
      tb: r4(shBusinessTotal.tb_ratio_all_value),
      nightTotal: shBusinessTotal.all_night,
      nightRatio: r4(shBusinessTotal.zb_ratio_all_night)
    },
    districts: shDistricts,
    districtsNight: shDistrictsNight,
    profile: {
      gender: { male: r4(shProfile.male_value_ratio), female: r4(shProfile.female_value_ratio) },
      age: {
        '16-24': r4(shProfile.age_16_24_ratio),
        '25-34': r4(shProfile.age_25_34_ratio),
        '35-44': r4(shProfile.age_35_44_ratio),
        '45-54': r4(shProfile.age_45_54_ratio),
        '55+': r4(shProfile.age_above_55_ratio)
      },
      consume: {
        s1_low: r4(shProfile.s1_ratio),
        s2_midLow: r4(shProfile.s2_ratio),
        s3_mid: r4(shProfile.s3_ratio),
        s4_midHigh: r4(shProfile.s4_ratio),
        s5_high: r4(shProfile.s5_ratio)
      },
      origin: { local: r4(shProfile.bd_value_ratio), outside: r4(shProfile.wd_value_ratio) },
      stay: {
        lt1h: r4(shProfile.residency1_ratio),
        h1to2: r4(shProfile.residency2_ratio),
        h2to4: r4(shProfile.residency3_ratio),
        gt4h: r4(shProfile.residency4_ratio)
      }
    }
  }
}

mkdirSync(NORM_DIR, { recursive: true })
writeFileSync(NORM, JSON.stringify(normalized, null, 1), 'utf8')
console.log('已生成规范化数据：' + NORM)

const js = `/**
 * 自动生成，请勿手工编辑。
 *
 * 来源：节假日游客大数据监测平台（https://jice.smartsteps.com/travel/）
 *       松江区 · 2026 年国庆节（10.01-10.07）
 * 抓取：${fetchedAt}
 * 原始接口存档：data-source/raw/${day}/api/*.json
 * 规范化数据：data-source/normalized/songjiang-2026-guojiaqing.json
 *
 * 重新生成：node scripts/build-platform-data.mjs ${day}
 */
export const PLATFORM_2026 = ${JSON.stringify(normalized, null, 1)}

export default PLATFORM_2026
`
writeFileSync(join('src', 'mock', 'platform2026.js'), js, 'utf8')
console.log('已生成应用数据：src/mock/platform2026.js')

/* 控制台摘要，便于人工核对 */
const s = normalized.songjiang
console.log('\n松江区 2026 国庆：')
console.log('  累计接待 ', s.visitors.total, '人次  同比', (s.visitors.tb * 100).toFixed(2) + '%')
console.log('  夜间接待 ', s.night.total, '人次  占比', (s.night.ratio * 100).toFixed(2) + '%')
console.log('  重点景区 ', s.scenic.total, '人次  同比', (s.scenic.tb * 100).toFixed(2) + '%  (' + s.scenic.count + ' 家)')
console.log('  日度合计 ', s.daily.reduce((a, d) => a + d.visitors, 0))
console.log('  景区日度合计', s.scenic.list.reduce((a, x) => a + x.daily.reduce((b, d) => b + d.visitors, 0), 0))
console.log('  景区合计校验', s.scenic.list.reduce((a, x) => a + x.visitors, 0))
console.log('  全市排名 ', s.rankInCity.rank + '/' + s.rankInCity.districts, ' 夜间排名', s.rankInCity.nightRank)
