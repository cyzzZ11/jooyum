// 银行信贷产品，数据来源：老站 /songjiangscitech/api/bank/{id}（2026-11 抓取）
export const bankProducts = {
  "中国工商银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "中型科技型企业批次贷", credit: "最高不超过2000万元", term: "一般不超过1年，最长不超过3年", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "小微企业购建贷", credit: "最高不超过3000万元", term: "最长不超过15年", rate: "最低2.85%起，以审批为准", guarantee: "" },
        { name: "小微企业经营性物业贷款", credit: "最高不超过3000万元", term: "最长不超过15年", rate: "最低2.85%起，以审批为准", guarantee: "" },
        { name: "固定资产贷款", credit: "一般不超过项目总投资的70%，最高不超过项目总投资的80%", term: "一般不超过15年，最长不超过20年", rate: "商议，以审批为准", guarantee: "" },
        { name: "经营性物业支持贷款", credit: "最高不超过物业原值的80%", term: "一般不超过10年，最长不超过15年", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "科技企业控股型并购贷", credit: "不超过交易对价的80%", term: "最长不超过10年", rate: "商议，以审批为准", guarantee: "" },
        { name: "科技企业参股型并购贷", credit: "不超过交易对价的60%", term: "最长不超过7年", rate: "商议，以审批为准", guarantee: "" },
        { name: "非居民并购贷", credit: "不超过交易对价的80%", term: "最长不超过10年", rate: "商议，以审批为准", guarantee: "" }
      ]
    }
  ],
  "中国农业银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "科捷贷", credit: "最高不超过1000万元", term: "最长不超过12个月", rate: "2.3%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "经营性物业抵押贷款", credit: "不限", term: "最长不超过180个月", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "科技企业\n并购贷款", credit: "不超过并购交易价款80%", term: "最长不超过120个月", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "保理e融", credit: "根据实际测定", term: "最长不超过12个月", rate: "以审批为准", guarantee: "" },
        { name: "政采e贷", credit: "不超过近两年政采合同均值的70% ", term: "最长不超过12个月", rate: "最低2.7%起，以审批为准", guarantee: "" }
      ]
    }
  ],
  "中国银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "科技成长贷", credit: "最高不超过20000万元", term: "最长不超过3年，以审批为准", rate: "商议，以审批为准", guarantee: "" },
        { name: "科技履约贷", credit: "最高不超过1000万元", term: "最长不超过1年，以审批为准", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "科创助力贷", credit: "最高不超过300万元", term: "最长不超过1年，以审批为准", rate: "最低2.5%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "科技成长贷（固定资产）", credit: "融资比例最高不超过80%", term: "最长不超过20年，以审批为准", rate: "商议，以审批为准", guarantee: "" },
        { name: "出口买方信贷", credit: "融资比例最高不超过80%", term: "最长不超过20年，以审批为准", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款（非科技类）", credit: "融资比例最高不超过60%", term: "最长不超过7年，以审批为准", rate: "商议，以审批为准", guarantee: "" },
        { name: "并购贷款（科技类）", credit: "控股型并购：融资比例最高不超过80%\n参股型并购：融资比例最高不超过60%", term: "1、控股型并购：最长不超过10年\n2、参股型并购：最长不超过7年", rate: "商议，以审批为准", guarantee: "" },
        { name: "非居民并购贷款", credit: "融资比例最高不超过80%", term: "最长不超过10年，以审批为准", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "脱核链贷", credit: "最高不超过1000万元", term: "最长不超过1年，以审批为准", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "融易达", credit: "融资比例最高不超过100%", term: "最长不超过180天，以审批为准", rate: "商议，以审批为准", guarantee: "" },
        { name: "销易达", credit: "融资比例最高不超过80％", term: "最长不超过180天，以审批为准", rate: "商议，以审批为准", guarantee: "" }
      ]
    }
  ],
  "中国建设银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "善新贷", credit: "最高不超过1000万", term: "最长不超过3年", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "科创贷", credit: "最高不超过近2年平均销售收入的30%", term: "最长不超过3年", rate: "最低2.11%起，以审批为准", guarantee: "" },
        { name: "善科贷", credit: "最高不超过1000万", term: "最长不超过3年", rate: "最低3%起，以审批为准", guarantee: "" },
        { name: "抵押快贷", credit: "最高不超过1000万", term: "最长不超过10年", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "沪惠园区贷", credit: "最高不超过1000万", term: "最长不超过1年", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "善营贷", credit: "最高不超过1000万", term: "最长不超过3年", rate: "最低2.7%起，以审批为准", guarantee: "" },
        { name: "科技履约贷", credit: "最高不超过3000万", term: "最长不超过3年", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "制（智）慧贷", credit: "最高不超过3000万", term: "最长不超过3年", rate: "最低2.11%起，以审批为准", guarantee: "" },
        { name: "科技研发经营贷", credit: "根据企业资金需求合理测算，不设上限", term: "最长不超过5年", rate: "最低2.11%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "科技研发项目贷", credit: "最高不超过项目总投的80%", term: "最长不超过10年", rate: "最低2.51%起，以审批为准", guarantee: "" },
        { name: "基本建设贷款", credit: "最高不超过项目总投的80%", term: "最长不超过20年", rate: "最低2.51%起，以审批为准", guarantee: "" },
        { name: "产业园区建设贷款", credit: "最高不超过项目总投的80%", term: "最长不超过20年", rate: "最低2.51%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "控股型并购贷款", credit: "最高不超过交易价款的70%", term: "最长不超过10年", rate: "最低2.51%起，以审批为准", guarantee: "" },
        { name: "参股型并购贷款", credit: "最高不超过交易价款的60%", term: "最长不超过7年", rate: "最低2.51%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "e信通", credit: "先收息方式的融资比例可达100％，单笔融资金额原则上不超过5000万元", term: "最长不超过12个月", rate: "最低2.08%起，以审批为准", guarantee: "" },
        { name: "e订通", credit: "最高不超过订单金额的70%，单笔融资金额原则上不超过5000万元", term: "最长不超过12个月", rate: "最低2.08%起，以审批为准", guarantee: "" },
        { name: "e销通", credit: "最高不超过订单金额的70%，单笔融资金额原则上不超过5000万元", term: "最长不超过12个月", rate: "最低2.08%起，以审批为准", guarantee: "" }
      ]
    }
  ],
  "交通银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "智慧知产贷", credit: "最高额度高达2000万元", term: "3年", rate: "按照分行规定利率指导要求执行", guarantee: "" },
        { name: "普惠e贷", credit: "1.抵押贷款最高可贷3000万元；\n2.信用贷款最高2000万元；\n3.保证贷款最高500万；", term: "3年", rate: "基于LPR给予小微企业优惠利率", guarantee: "" },
        { name: "流动资金贷款", credit: "根据借款人实际需求确定", term: "一般最长不超过1年，原则上最长不超过3年，对于经营现金流回收周期较长的，可适当延长贷款期限，最长不超过5年。", rate: "按照国家利率政策和交通银行贷款利率管理要求执行", guarantee: "" },
        { name: "科创人才贷", credit: "最高300万元", term: "最长2年，循环额度、随借随还", rate: "基于LPR给予小微企业优惠利率", guarantee: "" },
        { name: "数字转型技改贷", credit: "上限2000万元", term: "1-3年", rate: "LPR，针对注册在松江区内参与数字化转型企业给予特定的利率优惠可突破LPR", guarantee: "" },
        { name: "融e贷", credit: "最高可达500万", term: "最长2年，循环额度、随借随还", rate: "基于LPR给予小微企业优惠利率", guarantee: "" },
        { name: "担保基金贷", credit: "额度最高可至2000万元", term: "3年", rate: "担保费0.5%/年，部分符合要求的客户可享贴息贴费", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "人民币固定资金贷款", credit: "根据项目总投和融资需求等综合确定", term: "原则上最长不超过15年", rate: "固定资产贷款执行国家利率政策和交通银行有关中长期贷款利率管理规定。原则上采用浮动利率方式，且不得低于基准利率。", guarantee: "" },
        { name: "固定资产支持融资", credit: "根据项目和融资需求等综合确定", term: "一般最长不超过12年", rate: "利率参照贷款市场报价利率（LPR）定价", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "不超过收购支付对价总额（含受让老股、增资、承债等）的60%", term: "最长不超过7年", rate: "具体视期限及增信等情况", guarantee: "" },
        { name: "海外并购", credit: "一般不超过60%", term: "3~5年", rate: "具体视期限及增信等情况", guarantee: "" }
      ]
    }
  ],
  "中国邮政储蓄银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "快捷贷", credit: "10万元–1500万元", term: "最长不超过5年", rate: "最低2.5%起以审批为准", guarantee: "" },
        { name: "税贷通", credit: "5万元–500万元", term: "最长不超过2年", rate: "最低2.5%起以审批为准", guarantee: "" },
        { name: "公司流动资金贷款", credit: "根据客户一般风险额度", term: "最长不超过5年", rate: "最低2.5%起以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "100万元–10000万元", term: "按客户要求，已审批为主", rate: "根据客户资质一事一议", guarantee: "" },
        { name: "绿色项目贷款", credit: "200万元–20000万元", term: "按客户要求，已审批为主", rate: "根据客户资质一事一议", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "根据客户一般风险额度", term: "按客户要求，已审批为主", rate: "根据客户资质一事一议", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "线上保理", credit: "最高不超过50000万元", term: "最长不超过1年", rate: "根据客户资质一事一议", guarantee: "" },
        { name: "应收账款质押融资", credit: "10万元–5000万元", term: "按客户要求，已审批为主", rate: "根据客户资质一事一议", guarantee: "" }
      ]
    }
  ],
  "中国农业发展银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "农业科技与装备贷款", credit: "根据企业实际财务情况及需求而定", term: "最长不超过36个月", rate: "面谈", guarantee: "" },
        { name: "农业生产资料贷款", credit: "根据企业实际财务情况及需求而定", term: "最长不超过36个月", rate: "面谈", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "农业科技与装备贷款", credit: "根据企业实际财务情况及需求而定", term: "最长不超过60个月", rate: "面谈", guarantee: "" },
        { name: "农业生产资料贷款", credit: "根据企业实际财务情况及需求而定", term: "最长不超过60个月", rate: "面谈", guarantee: "" }
      ]
    }
  ],
  "上海农商银行松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "茸质贷", credit: "一般不超过2000万元，最高不超过3000万元", term: "最长不超过3年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" },
        { name: "中小微担保基金贷", credit: "一般不超过2000万元，最高不超过3000万元", term: "最长不超过3年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" },
        { name: "对公银税快贷（循环贷）", credit: "最高不超过300万元（纳税信用评级A级不超过300万，B级不超过200万，C级不超过30万）", term: "最长不超过2年，支持随借随还", rate: "以LPR为基准，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "以审批为准", term: "一般不超过10年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" },
        { name: "城市更新贷款", credit: "以审批为准", term: "一般不超过15年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "一般不超过并购交易总价款和费用的60%，科技型企业最高可达并购交易总价款和费用的80%，以审批为准", term: "一般不超过7年，科技型企业最长可达10年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" },
        { name: "跨境并购贷款", credit: "一般不超过跨境并购交易价款和费用的60%，以审批为准", term: "一般不超过7年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" },
        { name: "员工持股计划", credit: "一般不超过员工持股出资额的80%，且单家目标企业员工持股计划和股权激励贷款总金额原则上不超过5000万元，最高不超过1亿元。对单个借款人原则上不超过1000万元，最高不超过2000万元，以审批为准", term: "最长不超过10年，以审批为准", rate: "以LPR为基准，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "智慧供应链", credit: "以审批为准", term: "最长不超过1年，以审批为准", rate: "一般最低2.3%起，以审批为准", guarantee: "" },
        { name: "非融资性保函", credit: "以审批为准", term: "一般不超过5年，以审批为准", rate: "全额保证金：按保函金额 1‰-3‰/季，不满一季按一季收取，最低标准500元/季；\n非全额保证金:按保函金额1.5‰-6‰/季，不满一季按一季收取，最低标准1000元/季", guarantee: "" },
        { name: "鑫秒贴", credit: "实体型客户额度不做特别限制，非实体型客户最高不超3亿元，以审批为准", term: "一般不超过6个月", rate: "按票据市场每日定价", guarantee: "" }
      ]
    }
  ],
  "上海银行松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "政策性担保贷款", credit: "100万元-1000万元", term: "12个月", rate: "最高LPR-30基点", guarantee: "" },
        { name: "创业贷", credit: "100万元-500万元", term: "12个月", rate: "最高LPR+30基点", guarantee: "" },
        { name: "宅即贷", credit: "100万元-1000万元", term: "最短12个月，最长120个月", rate: "最高LPR+30基点", guarantee: "" },
        { name: "票易贷", credit: "50万元-1000万元", term: "最长不超过6个月", rate: "2.1%-2.8%", guarantee: "" },
        { name: "信优贷", credit: "10万元-100万元", term: "12个月", rate: "2.5%-4.5%", guarantee: "" },
        { name: "信科贷", credit: "10万元-300万元", term: "12个月", rate: "2.5%-4.5%", guarantee: "" },
        { name: "投贷联动", credit: "最高不超过1亿元", term: "原则上最长不超过12个月，单笔提款期限最长不超过36个月", rate: "2.34%-4.5%", guarantee: "" },
        { name: "研发贷", credit: "最高不超过2亿元", term: "原则上最高为3年，可根据企业实际需求适当放宽期限限制，最长可达5年", rate: "2.51%-4.5%", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "不超过项目总投的80%", term: "最长不超过15年", rate: "2.85%-4.5%", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "员工持股贷", credit: "单个借款人贷款金额最高不超过2000万元，持股平台最高不超过2亿元，并且不超过借款人参与本次股权融资总金额的60%", term: "最长不超过5年", rate: "2.51%-4.5%", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "上行e链反向保理", credit: "根据实际需求确定", term: "最长不超过1年", rate: "2.11%-4.5%", guarantee: "" }
      ]
    }
  ],
  "浦发银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "浦新贷", credit: "最高不超过3000万元", term: "最长不超过3年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "惠闪贷", credit: "最高不超过500万元", term: "1年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "浦投贷", credit: "最高不超过1000万元", term: "最长不超过3年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "专精特新小巨人贷", credit: "最高不超过5000万元", term: "最长不超过3年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "上市贷", credit: "最高不超过8000万元", term: "最长不超过3年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "中小微担保基金贷款", credit: "最高不超过3000万元", term: "1年", rate: "2.5%-3.5%", guarantee: "" },
        { name: "浦创贷", credit: "最高不超过500万元", term: "1年", rate: "2.5%-3.5%", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "最高按总投资的80%", term: "最长不超过10年", rate: "2.6%-3.5%", guarantee: "" },
        { name: "经营性物业", credit: "按物业现金流测算", term: "最长不超过15年", rate: "2.6%-3.5%", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "浦银并购贷", credit: "最高按交易价格的80%", term: "最长不超过10年", rate: "按照方案及期限约定", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "浦链通", credit: "根据客户实际需求设定，\n一般最高不超过供应商\n应收账款的100%", term: "最长不超过2年", rate: "2.4%-3%", guarantee: "" }
      ]
    }
  ],
  "招商银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "普惠抵押贷", credit: "最高不超过3000万元", term: "最长不超过36个月", rate: "2.5%-3%", guarantee: "" },
        { name: "招企贷", credit: "最高不超过500万元", term: "额度有效期最长24个月，单笔业务期限最长不超过12个月", rate: "3%-3.6%", guarantee: "" },
        { name: "招捷贷", credit: "最高不超过3000万元", term: "最长不超过36个月", rate: "最低2.4%起", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "无上限", term: "一般不超过10年，超过10年的一事一议", rate: "3%-4.5%", guarantee: "" },
        { name: "购置贷", credit: "最高可达8成", term: "一般不超过10年，特殊项目可根据具体情况合理确定", rate: "3%-4.5%", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款（并上市公司；私有化；员工持股贷款、股票回购贷款等；境外公司）", credit: "杠杆上限可达80%", term: "科技控股型最长可达10年", rate: "最低3%起，以审批为准", guarantee: "" },
        { name: "硬资产并购", credit: "杠杆上限可达80%", term: "最长不超过7年", rate: "最低3%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "政采贷", credit: "最高不超过1000万元", term: "最长不超过12个月", rate: "最低3%起", guarantee: "" },
        { name: "招链易贷", credit: "最高不超过1000万元", term: "最长不超过12个月", rate: "3.5%-4%", guarantee: "" },
        { name: "经销易贷", credit: "最高不超过3000万元", term: "最长不超过12个月", rate: "4%-4.5%", guarantee: "" }
      ]
    }
  ],
  "中国光大银行上海松江科技支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "流动资金贷款", credit: "商议，以审批为准", term: "商议，以审批为准", rate: "商议，以审批为准", guarantee: "" },
        { name: "专精特新企业贷", credit: "最高不超过1000万元", term: "最长不超过3年", rate: "商议，以审批为准", guarantee: "" },
        { name: "科技e贷", credit: "最高不超过300万元", term: "最长不超过18个月", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "设备更新和技术改造再贷款", credit: "商议，以审批为准", term: "商议，以审批为准", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "商议，以审批为准", term: "最长不超过10年", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "1+N保理", credit: "商议，以审批为准", term: "最长不超过1年", rate: "商议，以审批为准", guarantee: "" },
        { name: "订单贷", credit: "商议，以审批为准", term: "最长不超过1年", rate: "商议，以审批为准", guarantee: "" },
        { name: "保兑仓", credit: "商议，以审批为准", term: "最长不超过1年", rate: "商议，以审批为准", guarantee: "" }
      ]
    }
  ],
  "中国民生银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "批次贷", credit: "最高不超过1000万元", term: "最长不超过12个月", rate: "LPR-20bp", guarantee: "" },
        { name: "厂房营运贷", credit: "最高不超过3000万元", term: "最长不超过120个月", rate: "\u003c3%", guarantee: "" },
        { name: "民生惠担保贷", credit: "最高不超过300万元", term: "最长不超过12个月", rate: "随行就市", guarantee: "" },
        { name: "民生惠•抵押贷", credit: "最高不超过3000万元", term: "最长不超过60个月", rate: "随行就市", guarantee: "" },
        { name: "创业担保贷", credit: "最高不超过300万元", term: "最长不超过12个月", rate: "随行就市；贷款到期后可享受区就促50%贴息", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "项目前期贷", credit: "不超过总投概算的20%-30%", term: "最长不超过36个月，且贷款提用不超过建设期", rate: "随行就市", guarantee: "" },
        { name: "固定资产贷款", credit: "一般最高不超过总投概算的80%，资本金比例符合国家及立项要求", term: "一般不超过10-15年", rate: "随行就市", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款（包括跨境并购）", credit: "最高额度为并购交易总价款的60%", term: "最长不超过84个月", rate: "随行就市", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "信融e", credit: "不超过应收账款金额的100%", term: "最长不超过6个月", rate: "随行就市", guarantee: "" },
        { name: "脱核采购e", credit: "与历史采购额匹配 （模型审批最高1000万元，超过1000万元模型辅助人工快速审批）", term: "根据具体项目结算周期个性化定制方案", rate: "随行就市", guarantee: "" },
        { name: "承贴直通车", credit: "不超过票面金额的100%", term: "最长不超过6个月", rate: "随行就市", guarantee: "" }
      ]
    }
  ],
  "浙商银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "超短贷", credit: "最高不超过20亿元", term: "最长不超过1月，以审批为准", rate: "最低2.5%起，以审批为准", guarantee: "" },
        { name: "普通流贷", credit: "最高不超过20亿元", term: "最长不超过3年，以审批为准", rate: "最低3%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "房地产开发贷款", credit: "最高不超过20亿元", term: "最长不超过5年，以审批为准", rate: "最低4%起，以审批为准", guarantee: "" },
        { name: "园区开发贷款", credit: "最高不超过2亿元", term: "最长不超过3年，以审批为准", rate: "最低4%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "最高不超过20亿元", term: "最长不超过7年，以审批为准", rate: "最低4%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "银票", credit: "最高不超过20亿元", term: "最长不超过6月，以审批为准", rate: "最低1%起，以审批为准", guarantee: "" },
        { name: "国内证", credit: "最高不超过20亿元", term: "最长不超过1年，以审批为准", rate: "最低1.5%起，以审批为准", guarantee: "" }
      ]
    }
  ],
  "宁波银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "综合授信", credit: "1000万元-100000万元，根据营收核定", term: "1-5年，个案个议", rate: "最低2.14%起，以审批为准", guarantee: "" },
        { name: "担保基金贷款", credit: "300万元-1000万元", term: "1年", rate: "2.1%-2.8%", guarantee: "" },
        { name: "3.小微贷", credit: "100万元-300万元", term: "3年", rate: "2.1%-3.6%", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "波波智链", credit: "2000万元-30000万元", term: "1年", rate: "按票据市场价格", guarantee: "" }
      ]
    }
  ],
  "华夏银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "房抵贷", credit: "最高不超过3000万元", term: "最长不超过30年", rate: "不低于2.15%", guarantee: "" },
        { name: "专精特新贷", credit: "最高不超过2000万元", term: "最长不超过3年", rate: "不低于2.15%", guarantee: "" },
        { name: "银税贷", credit: "最高不超过500万元", term: "最长不超过1年", rate: "不低于2.15%", guarantee: "" },
        { name: "龙商贷", credit: "最高不超过500万元", term: "最长不超过3年", rate: "不低于2.5%", guarantee: "" },
        { name: "烟商贷", credit: "最高不超过100万元", term: "最长不超过1年", rate: "不低于2.5%", guarantee: "" },
        { name: "房产按揭贷", credit: "最高不超过3000万元", term: "最长不超过10年", rate: "不低于2.15%", guarantee: "" },
        { name: "信用增值贷", credit: "最高不超过500万元", term: "最长不超过1年", rate: "不低于2.15%", guarantee: "" },
        { name: "流动资金贷款", credit: "不高于企业营收40%", term: "一年以内/1年至3年", rate: "单笔单议", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "债务融资工具承销", credit: "结合企业营收、利润情况以及企业发行额度判定", term: "依情况而定", rate: "单笔单议", guarantee: "" },
        { name: "债券投资业务", credit: "结合企业营收、利润情况以及企业发行额度判定", term: "投资后转出或持有至到期", rate: "单笔单议", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "不超过并购价款60%", term: "最长不超过7年", rate: "单笔单议", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "数字保理", credit: "结合企业营收、利润情况等判定", term: "最长不超过1年", rate: "单笔单议", guarantee: "" }
      ]
    }
  ],
  "江苏银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "G60科创贷", credit: "最高不超过10000万元", term: "最长不超过36个月", rate: "3%-4%", guarantee: "" },
        { name: "政采通", credit: "最高不超过2000万元", term: "最长不超过12个月", rate: "3%-4%", guarantee: "" },
        { name: "科创e贷", credit: "最高不超过1000万元", term: "36个月循环额度，随借随还，额度期内可做无还本续贷，单次提款最长期限3年", rate: "2.6%-4%", guarantee: "" },
        { name: "采销e贷", credit: "最高不超过1000万元", term: "36个月循环额度，随借随还，额度期内可做无还本续贷，单次提款最长期限3年", rate: "3%-4%", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "项目营运期贷款", credit: "额度视项目情况而定", term: "最长不超过120个月", rate: "3%-5%", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "额度视项目情况而定", term: "最长不超过84个月", rate: "3%-5%", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "e 融单（反向保理）", credit: "额度视项目情况而定", term: "最长不超过12个月", rate: "3%-4%", guarantee: "" }
      ]
    }
  ],
  "兴业银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "兴速贷-政府采购专属", credit: "最高不超过1000万元", term: "最长不超过12个月", rate: " 2.5%-2.8%", guarantee: "" }
      ]
    }
  ],
  "北京银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "科创e贷", credit: "最高不超过500万元", term: "36个月", rate: "根据政策和企业资质调整", guarantee: "" },
        { name: "领航e贷", credit: "最高不超过2000万元", term: "36个月", rate: "根据政策和企业资质调整", guarantee: "" },
        { name: "资信e贷", credit: "最高不超过300万元", term: "36个月", rate: "根据政策和企业资质调整", guarantee: "" },
        { name: "金粒e贷", credit: "最高不超过1000万元", term: "24个月", rate: "根据政策和企业资质调整", guarantee: "" },
        { name: "文旅e贷", credit: "最高不超过1000万元", term: "12个月", rate: "根据政策和企业资质调整", guarantee: "" },
        { name: "抵押快贷", credit: "最高不超过1000万元", term: "60个月", rate: "根据政策和企业资质调整", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款(含并购银团)", credit: "传统并购：\n不超过交易对价的60%\n科技企业并购：\n①控股型：不超过交易对价的80%；\n②参股型：不超过交易对价的60%；", term: "传统并购：\n不超过7年\n科技企业并购：\n①控股型：不超过10年\n②参股型：不超过7年", rate: "不低于同期限自律价格", guarantee: "" },
        { name: "股票增持回购贷款", credit: "不超过增持、回购的90%", term: "原则上不超过3年", rate: "不高于2.25%，根据政策调整", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "保理", credit: "看审批情况", term: "看审批情况", rate: "看审批情况", guarantee: "" },
        { name: "线上采购贷（上游供应商贷款）", credit: "500万元以内", term: "不超过12个月", rate: "系统审批利率央行LPR+65BP至央行LPR+165BP，可申请调整", guarantee: "" },
        { name: "线上订货贷（下游经销商贷款）", credit: "2000万元以内", term: "不超过12个月", rate: "系统审批利率央行LPR+65BP至央行LPR+165BP，可申请调整", guarantee: "" }
      ]
    }
  ],
  "广发银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "科信贷", credit: "最高可达1000万元", term: "最长不超过1年", rate: "3%-5%", guarantee: "" },
        { name: "快融通", credit: "最高可达2000万元", term: "最长不超过3年", rate: "3%-10%", guarantee: "" },
        { name: "税银通", credit: "最高可达1000万元", term: "最长不超过1年", rate: "3.5%起", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "科技E贷", credit: "最高可达1000万元", term: "最长不超过1年", rate: "3.45%-5.5%", guarantee: "" },
        { name: "小微E秒贷", credit: "最高可达100万元", term: "最长不超过1年", rate: "4%-12%", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "以审批为准", term: "最长不超过7年", rate: "以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "保付通", credit: "以审批为准", term: "最长不超过1年", rate: "3%-7%", guarantee: "" }
      ]
    }
  ],
  "泰隆银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "科技企业贷", credit: "100万元-1000万元", term: "最长不超过3年", rate: "最低2.8起，以审批为准", guarantee: "" },
        { name: "知识产权贷款", credit: "100万元-1000万元", term: "最长不超过3年", rate: "最低2.8起，以审批为准", guarantee: "" }
      ]
    },
  ],
  "上海松江民生村镇银行": [
    {
      type: "流动资金支持",
      items: [
        { name: "中小微企业抵押贷", credit: "最高不超过5000万元", term: "最长不超过10年", rate: "最低3%起，以审批为准", guarantee: "" },
        { name: "法人按揭及经营性物业贷", credit: "最高不超过3000万元", term: "最长不超过10年", rate: "最低3%起，以审批为准", guarantee: "" },
        { name: "担保基金贷", credit: "最高不超过500万元", term: "最长不超过1年", rate: "最低3.5%起，以审批为准", guarantee: "" },
        { name: "惠民信用微贷", credit: "最高不超过50万元", term: "最长不超过3年", rate: "最低5%起，以审批为准", guarantee: "" },
        { name: "助农专项贷", credit: "最高不超过50万元", term: "最长不超过3年", rate: "最低3.5%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "易链贷", credit: "最高不超过1000万元", term: "最长不超过3年", rate: "最低3.5%起，以审批为准", guarantee: "" }
      ]
    }
  ],
  "上海松江富明村镇银行": [
    {
      type: "流动资金支持",
      items: [
        { name: "创业贷", credit: "最高不超过500万元", term: "最长不超过5年，以审批为准", rate: "最低2.88%起，以审批为准", guarantee: "" },
        { name: "助富贷", credit: "最高不超过500万元", term: "最长不超过5年，以审批为准", rate: "最低2.88%起，以审批为准", guarantee: "" }
      ]
    },
  ],
  "浙江民泰商业银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "流动资金贷款", credit: "根据客户情况评估", term: "60", rate: "差别化利率定价", guarantee: "" },
        { name: "个人经营贷款", credit: "根据客户情况评估", term: "60", rate: "差别化利率定价", guarantee: "" },
        { name: "随E行", credit: "50", term: "12", rate: "差别化利率定价", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "E链通", credit: "根据客户情况评估", term: "12", rate: "差别化利率定价", guarantee: "" }
      ]
    }
  ],
  "平安银行上海松江支行": [
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" },
        { name: "房地产开发贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" },
        { name: "特定资产收费权支持贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" },
        { name: "住房租赁贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" },
        { name: "保障性住房开发贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" },
        { name: "经营性物业贷款", credit: "视项目情况决定", term: "视项目情况决定，通常3年以上", rate: "自律机制以上", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "视项目情况决定", term: "不超过84个月", rate: "3%-5%", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "极速保函", credit: "3000万元", term: "最长不超过60个月", rate: "0.1%-0.4%", guarantee: "" },
        { name: "极速福费廷", credit: "0-5亿元", term: "12个月", rate: "随行就市", guarantee: "" },
        { name: "银票极速贴", credit: "300万（含）以下凭营业执照和法人身份证即可申请；超过300万根据企业营业收入、销售增长率等自动化审批。", term: "12个月", rate: "无费用，仅贴现利率。贴现率市场化程度高，根据市场情况实时报价", guarantee: "" },
        { name: "国内保理", credit: "授信额度按审批授权权限", term: "按照客户应收账款剩余付款期核定单笔业务期限，一般不超过1年，原则上不超2年", rate: "按照保理授信品种定价", guarantee: "" },
        { name: "平安透", credit: "授信额度按审批授权权限", term: "额度期限不超过1年，单笔期限不超过180天", rate: "按照流贷产品定价", guarantee: "" }
      ]
    }
  ],
  "大连银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "小微企业抵押贷", credit: "最高不超过3000万元", term: "最长不超过10年", rate: "最低2.5%起", guarantee: "" },
        { name: "应收账款质押贷款", credit: "视项目情况决定", term: "最长不超过1年", rate: "一事一议", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "视项目情况决定", term: "最长不超过10年", rate: "一事一议", guarantee: "" },
        { name: "经营性物业贷款", credit: "视项目情况决定", term: "最长不超过15年", rate: "一事一议", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "视项目情况决定", term: "最长不超过7年", rate: "一事一议", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "国内保理", credit: "视项目情况决定", term: "1-3年", rate: "一事一议", guarantee: "" },
        { name: "商业承兑汇票保理", credit: "视项目情况决定", term: "最长不超过6个月", rate: "一事一议", guarantee: "" }
      ]
    }
  ],
  "宁波通商银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "超额抵押经营贷", credit: "最高不超过3000万元", term: "最长不超过10年，单笔最长不超过5年，以审批为准", rate: "3.8%-5.5%，以审批为准", guarantee: "" },
        { name: "科创企业信用贷", credit: "最高不超过500万元（国家重点），最高不超过300万元（省市级及重点科创）", term: "最长不超过5年，单笔最长不超过3年，以审批为准", rate: "3.8%-5.5%，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "园区供应链金融", credit: "不超过订单/应收（授信支持资产）的80%，不超过本年经销合同金额的20%，不超过采购金额的80%", term: "最长不超过2年，以审批为准", rate: "2.7%-5.5%，以审批为准", guarantee: "" }
      ]
    }
  ],
  "杭州银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "抵易贷", credit: "最高不超过1000万元", term: "最长不超过36月", rate: "商议，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "云E信", credit: "300万元-3000万元", term: "6月-12月", rate: "商议，以审批为准", guarantee: "" }
      ]
    }
  ],
  "厦门国际银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "流动资金贷款", credit: "一事一议", term: "最长不超过3年，以审批为准", rate: "以审批为准", guarantee: "" },
        { name: "快e融", credit: "300万元", term: "最长不超过1年，以审批为准", rate: "最低3.5%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "项目投资",
      items: [
        { name: "固定资产贷款", credit: "项目总投的80%", term: "最长不超过10年，以审批为准", rate: "最低3.5%起，以审批为准", guarantee: "" },
        { name: "经营性物业贷款", credit: "抵押物价值的60%", term: "最长不超过15年，以审批为准", rate: "最低3.5%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "并购金融",
      items: [
        { name: "并购贷款", credit: "项目总投的60%", term: "最长不超过10年，以审批为准", rate: "最低3.5%起，以审批为准", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "链e融", credit: "50000万元", term: "最长不超过3年，以审批为准", rate: "最低2.4%起，以审批为准", guarantee: "" }
      ]
    }
  ],
  "盛京银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "盛科贷", credit: "2000万元", term: "3-12个月", rate: "3.8%-4%", guarantee: "" },
        { name: "盛链贷", credit: "500万元", term: "3-12个月", rate: "0.033", guarantee: "" },
        { name: "盛信贷", credit: "500万元", term: "3-12个月", rate: "0.033", guarantee: "" },
        { name: "盛抵贷", credit: "2000万元", term: "3-36个月", rate: "2.9%-3%", guarantee: "" },
        { name: "盛产贷", credit: "100万元", term: "3-12个月", rate: "3.8%-4%", guarantee: "" }
      ]
    },
    {
      type: "供应链金融",
      items: [
        { name: "供应商融资", credit: "最高融资比例可为应收账款金额的100%", term: "与实际账期相匹配，融资到期日最长不超过应收账款到期日后30天。融资期限最长不得超过一年。", rate: "以审批为准", guarantee: "" }
      ]
    }
  ],
  "温州银行上海松江支行": [
    {
      type: "流动资金支持",
      items: [
        { name: "温信贷", credit: "最高不超过300万元", term: "最长不超过3年", rate: "0.05", guarantee: "" },
        { name: "共富创业贷", credit: "最高不超过1000万元", term: "最长不超过3年", rate: "0.05", guarantee: "" }
      ]
    },
  ]
}
