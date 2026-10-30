export interface DIYTask {
  id: string;
  title: string;
  duration: string;
  costEst: string;
  isCrucial: boolean;
  description: string;
  officialLinks?: { label: string; url: string }[];
  warningTip?: string;
}

export interface DIYStage {
  id: string;
  stageName: string;
  stageSubtitle: string;
  icon: string;
  tasks: DIYTask[];
}

export interface CountryRoadmap {
  countryId: string;
  countryName: string;
  flag: string;
  overallTimeEst: string;
  stages: DIYStage[];
}

export const DIY_ROADMAPS: Record<string, CountryRoadmap> = {
  japan: {
    countryId: "japan",
    countryName: "日本 (高度人才 / 技人国工签)",
    flag: "🇯🇵",
    overallTimeEst: "国内准备 3 ~ 6 个月 ➜ 赴日落地 2 周搞定",
    stages: [
      {
        id: "jp-s1",
        stageName: "阶段一：国内公证认证与学历背书",
        stageSubtitle: "提前准备好入管局最看重的客观证据链",
        icon: "FileCheck",
        tasks: [
          {
            id: "jp-t1",
            title: "学信网 (CHESICC) 高等学历与学位在线验证报告 (英文版)",
            duration: "1 ~ 3 个工作日",
            costEst: "免费 (学信网官方下载英文PDF)",
            isCrucial: true,
            description: "登录学信网，申请教育部学历证书电子注册备案表和中国高等教育学位在线验证报告，必须选择附带英文翻译版，入管局核验二维码可直接调取。",
            officialLinks: [{ label: "学信网官方入口", url: "https://www.chsi.com.cn/" }],
            warningTip: "如果是硕士毕业，本科和硕士的两份报告都要做，且务必注意报告有效验证期设置为 6 个月！"
          },
          {
            id: "jp-t2",
            title: "中国计算机技术与软件专业技术资格 (软考) 证书备档",
            duration: "现有证书",
            costEst: "免费",
            isCrucial: false,
            description: "中日 IT 资格互认体系！如果你考过软考中级/高级（如系统架构师、系统分析师、软件设计师），高度人才打分可直接加 5 分（最多 10 分）。准备好原件与扫描件。",
            warningTip: "需同时准备好国家人社部证书查询网上的验证截图与成绩单备案。"
          },
          {
            id: "jp-t3",
            title: "以往企业的工作经历证明书 (在职/离职证明)",
            duration: "1 ~ 2 周",
            costEst: "免费",
            isCrucial: true,
            description: "高度人才算分计算‘实务经验年限’的核心证据。需包含在职起止时间、职位名称、具体从事的软件开发/架构工作内容描述，并由原公司盖公章或HR签字。",
            warningTip: "若原公司已注销，可用劳动合同、个人社保连续缴费记录及个税App完税证明作为补充替代材料。"
          }
        ]
      },
      {
        id: "jp-s2",
        stageName: "阶段二：在留资格认定证明书 (COE) 官方递签",
        stageSubtitle: "日本法务省出入国在留管理厅核心审批",
        icon: "Stamp",
        tasks: [
          {
            id: "jp-t4",
            title: "日本雇主向入管局提交 COE (在留资格) 申请",
            duration: "高度人才约 2~4 周 / 普通工签约 1~2 个月",
            costEst: "免费 (官方免申请费)",
            isCrucial: true,
            description: "日本雇主或委托的行政书士将你的打分计算表、聘用合同、学历报告及日本公司财报提交给东京/大阪入管局。高度人才走优先受理通道，审批极其神速。",
            officialLinks: [{ label: "日本入国管理局 COE 指南", url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html" }],
            warningTip: "高度人才计算表中的各项分数务必百分之百能提供对应佐证，切勿虚高申报！"
          },
          {
            id: "jp-t5",
            title: "凭 COE 电子版在国内指定代办处换发签证贴纸",
            duration: "4 ~ 7 个工作日",
            costEst: "约 300 ~ 500 RMB (代办费)",
            isCrucial: true,
            description: "收到入管局下发的 COE（在留资格认定证明书）后，携带护照原件、户口本、证件照，前往户籍所在地对应的日本领事馆指定代办旅行社换发正式日本工作签证。",
            warningTip: "日本使领馆不接受个人直接进馆送签，必须通过官方指定的送签旅行社递交！"
          }
        ]
      },
      {
        id: "jp-s3",
        stageName: "阶段三：初抵日本黄金两周生存清单",
        stageSubtitle: "快速拿到在留卡、登记住民票、开立银行账户与手机卡",
        icon: "CheckCircle",
        tasks: [
          {
            id: "jp-t6",
            title: "成田/羽田/关西机场现场领取在留卡 (Residence Card)",
            duration: "入境通道 5 分钟",
            costEst: "免费",
            isCrucial: true,
            description: "落地主要国际机场走中长期居民通道，海关工作人员现场制作并核发你的‘在留卡’。高度人才卡片上会明确印有‘高度专门职第1号’字样。",
            warningTip: "务必走大机场的中长期通道！若是从小地方机场入境可能无法现场发卡，会耽误后续落户。"
          },
          {
            id: "jp-t7",
            title: "前往市区役所/町役场登记‘住民票’与加入国民健保",
            duration: "入境后 14 天内必须完成",
            costEst: "住民票副本约 300 日元/份",
            isCrucial: true,
            description: "带上在留卡和租房/住址证明，在辖区区役所办理住址登记（住民登录），并现场申领个人番号（My Number 卡交付申请书）。",
            warningTip: "住民票是后续去银行开户、办手机卡、租房的核心先决凭证，建议当场多打印 2~3 份带个人番号的正式副本备用！"
          },
          {
            id: "jp-t8",
            title: "办理日本银行账户与格安手机卡 (SIM)",
            duration: "1 ~ 3 天",
            costEst: "手机月租约 1500~3000 日元",
            isCrucial: true,
            description: "初到日本前半年，传统大银行（三菱UFJ/三井住友）通常要求住满半年；推荐先办‘邮政银行 (Japan Post Bank / ゆうちょ銀行)’或新形态网银（住信SBI/乐天银行）；手机卡推荐 LINEMO、ahamo 或 IIJmio 等格安卡。",
            warningTip: "办卡时确保姓名拼音与在留卡片严格一致，防止后续工资入账匹配失败。"
          }
        ]
      }
    ]
  },
  germany: {
    countryId: "germany",
    countryName: "德国 (机会卡 / 欧盟蓝卡)",
    flag: "🇩🇪",
    overallTimeEst: "准备 4 ~ 8 个月 ➜ 赴德找工或就职",
    stages: [
      {
        id: "de-s1",
        stageName: "阶段一：学历认证与德/英语言过关",
        stageSubtitle: "打通德国官方资质认证通道",
        icon: "FileCheck",
        tasks: [
          {
            id: "de-t1",
            title: "德国外国教育事务中心 (Anabin) 院校及学位评级比对 (H+)",
            duration: "1 天 (在线查询)",
            costEst: "免费",
            isCrucial: true,
            description: "登录 Anabin 数据库，查询你的国内母校是否为 H+（表示该大学学历完全等同于德国大学学历）。将院校页面及专业页打印成 PDF。",
            officialLinks: [{ label: "Anabin 官方数据库", url: "https://anabin.kmk.org/anabin.html" }],
            warningTip: "如果学校不是 H+，则必须向德国 ZAB 申请个人学历同等性评估 (Statement of Comparability)，耗时约 2~3 个月。"
          },
          {
            id: "de-t2",
            title: "海牙认证 (Apostille) 与德语宣誓翻译",
            duration: "1 ~ 2 周",
            costEst: "海牙认证每份约 50~100 RMB + 翻译约 300 RMB",
            isCrucial: true,
            description: "中国自 2023 年 11 月正式加入《海牙公约》！学历证书、学位证书、无犯罪记录公证书直接在中国外交部或各省外办办理【海牙认证附加证明书 (Apostille)】即可直接在德生效，彻底告别以前繁琐昂贵的使馆双认证！",
            warningTip: "德方严苛要求由德国法院宣誓翻译官进行认证翻译，建议找有德意志法院备案资质的宣誓翻译出具。"
          }
        ]
      },
      {
        id: "de-s2",
        stageName: "阶段二：自备资金与使馆递签 (机会卡/蓝卡)",
        stageSubtitle: "限制性账户开立与官方预约",
        icon: "Stamp",
        tasks: [
          {
            id: "de-t3",
            title: "开立德国限制性银行账户 (Blocked Account / Sperrkonto)",
            duration: "2 ~ 5 个工作日",
            costEst: "每月 1,027 欧元 (年存约 12,324 欧元)",
            isCrucial: true,
            description: "如果申请机会卡（找工签），需在 Fintiba、Expatrio 或 Coracle 开立冻结账户并存入 1 年法定生活保证金证明自己无需德国救济；若是已有雇主 Offer 走蓝卡则直接免除此项！",
            warningTip: "转汇请注意跨境电汇手续费和中间行扣费，确保最终入账金额分文不少于官方下限。"
          },
          {
            id: "de-t4",
            title: "德国使领馆在线预约与现场递签 (Consular Appointment)",
            duration: "等候排期 1 ~ 4 周，出签 2 ~ 4 周",
            costEst: "签证费 75 欧元",
            isCrucial: true,
            description: "在北京、上海、广州、成都或沈阳的德国签证中心或使馆官网上预约长期居留签证（National Visa）递签时间，携带完整动机信、打分自测表、资金证明赴约。",
            officialLinks: [{ label: "德国驻华使领馆签证大厅", url: "https://china.diplo.de/cn-zh" }]
          }
        ]
      }
    ]
  },
  thailand: {
    countryId: "thailand",
    countryName: "泰国 (DTV 5年数字游民签)",
    flag: "🇹🇭",
    overallTimeEst: "全流程仅需 1 ~ 2 周！目前全球最丝滑长期签",
    stages: [
      {
        id: "th-s1",
        stageName: "极速极简：纯线上官方电子签办理 (E-Visa)",
        stageSubtitle: "甚至不需要去大使馆，全流程纯网上提交",
        icon: "Send",
        tasks: [
          {
            id: "th-t1",
            title: "准备 50 万泰铢 (约合 10 万人民币 / 1.4 万美元) 银行流水",
            duration: "1 天",
            costEst: "银行打印费 0~20 RMB",
            isCrucial: true,
            description: "国内任一主流银行活期借记卡存款证明或近 3 个月流水，余额大于 10 万人民币即可（资金不用转走，开完证明即可正常使用）。中英文对照电子版即可。",
            warningTip: "确保流水上有账户名拼音与银行盖章，最好临时存放 1 周以上避免被怀疑短期过桥。"
          },
          {
            id: "th-t2",
            title: "准备远程工作合同或自由职业开发作品集 (Portfolio)",
            duration: "1 ~ 2 天",
            costEst: "免费",
            isCrucial: true,
            description: "与境外公司的 Remote 雇佣合同，或者个人 GitHub 开源主页、独立开发上线作品、Stripe/PayPal 结汇流水，证明你有不依托泰国本土的稳定远程收入。",
            warningTip: "全英文准备，重点体现‘自给自足的远程技术工作者 (Digital Nomad)’属性。"
          },
          {
            id: "th-t3",
            title: "登录泰国官方电子签证系统 (Thaievisa) 递交申请",
            duration: "审查约 5 ~ 15 个工作日下签",
            costEst: "签证规费约 10,000 泰铢 (约 2,000 RMB)",
            isCrucial: true,
            description: "在官方网站注册，选择 Destination Thailand Visa (DTV)，上传护照、白底证件照、资金证明与合同，在线使用信用卡支付费用，电子签证直接发到邮箱！",
            officialLinks: [{ label: "泰国官方电子签入口 (Thaievisa)", url: "https://thaievisa.go.th/" }],
            warningTip: "注意申请时填报的所在国家/管辖使馆必须与你当前 IP 或合法居住地一致。"
          }
        ]
      }
    ]
  },
  australia: {
    countryId: "australia",
    countryName: "澳大利亚 (WHV 打工度假 / 紧缺技工护理)",
    flag: "🇦🇺",
    overallTimeEst: "WHV 摇号后 1 个月出签 ➜ 落地立即开启打工存钱",
    stages: [
      {
        id: "au-s1",
        stageName: "阶段一：WHV 抢名额与资金证明准备",
        stageSubtitle: "每年 5000 个配额的准入准备",
        icon: "FileCheck",
        tasks: [
          {
            id: "au-t1",
            title: "考取基础英语成绩 (雅思 4.5 / PTE 30+)",
            duration: "1 ~ 2 周备考",
            costEst: "考试费约 1,500 ~ 2,000 RMB",
            isCrucial: true,
            description: "澳洲打工度假签对语言要求极低，只需等同于雅思 4.5 分（PTE 30分）即可满足！四级及格者通常裸考即过。",
            warningTip: "成绩单必须在递交申请之日前的 12 个月内有效！"
          },
          {
            id: "au-t2",
            title: "开具 5,000 澳币 (约 2.4 万 RMB) 存款证明",
            duration: "1 天",
            costEst: "银行打印费 0~20 RMB",
            isCrucial: true,
            description: "借记卡流水或存款证明，证明你有足够的生活费支持初抵澳洲的生活与返程机票。",
            warningTip: "建议开 3.5 万 ~ 5 万 RMB 更加稳妥，且附带银行英文翻译件。"
          }
        ]
      },
      {
        id: "au-s2",
        stageName: "阶段二：落地澳洲黄金一周",
        stageSubtitle: "办税号 TFN、开本地银行卡与白卡/咖啡证书",
        icon: "CheckCircle",
        tasks: [
          {
            id: "au-t3",
            title: "申请澳大利亚税号 (TFN - Tax File Number)",
            duration: "落地后在线申请，约 1~2 周邮寄到住址",
            costEst: "免费 (ATO 官网在线申请)",
            isCrucial: true,
            description: "抵澳后立刻登录 ATO (澳洲税务局) 官网在线免费申请 TFN。在澳洲合法打工必须向雇主提供 TFN，否则会被代扣最高 47% 的惩罚性预扣税！",
            warningTip: "必须人在澳洲境内才能提交在线申请，提前在境外无法申请！"
          },
          {
            id: "au-t4",
            title: "考取特定行业上岗证书 (白卡 White Card / RSA 酒类服务)",
            duration: "在线学习半天完成",
            costEst: "约 $40 ~ $90 澳币",
            isCrucial: false,
            description: "若想做建筑/装修蓝领，必须持有 White Card 白卡；若想在酒吧、西餐厅当服务员，必须持有对应州的 RSA 证书。",
            warningTip: "务必在澳洲政府 RTO 认证的正规培训机构官网报名考试。"
          }
        ]
      }
    ]
  },
  spain: {
    countryId: "spain",
    countryName: "西班牙 (非盈利居留 No Lucrativa)",
    flag: "🇪🇸",
    overallTimeEst: "国内公证与签证约 2 ~ 3 个月 ➜ 赴西按指纹拿居留卡 (TIE)",
    stages: [
      {
        id: "es-s1",
        stageName: "阶段一：国内非盈利资产与被动收入证明",
        stageSubtitle: "向领事馆证明‘我不去抢西班牙人饭碗，我自备足够资金去消费’",
        icon: "FileCheck",
        tasks: [
          {
            id: "es-t1",
            title: "准备近 1 年银行流水与存款证明 (主申请人建议备 30~50 万 RMB)",
            duration: "1 ~ 3 天",
            costEst: "免费",
            isCrucial: true,
            description: "西班牙官方标准为每月拥有 IPREM 指数 400% 的资金 (约 2,400 欧/月，年备约 28,800 欧)。如果有房租租金收入、理财分红或股票分红流水更具说服力。",
            warningTip: "领事馆非常看重资金的合法稳定沉淀，切忌在递签前突然突击转入一大笔来源不明的资金！"
          },
          {
            id: "es-t2",
            title: "无犯罪记录证明公证与海牙认证 (Apostille)",
            duration: "1 ~ 2 周",
            costEst: "公证费约 200 RMB + 海牙认证约 50~100 RMB",
            isCrucial: true,
            description: "户籍地派出所开具无犯罪记录，公证处出具西语翻译公证书，并在中国外交部或省外办办理【海牙认证附加证明书 (Apostille)】即可在西直接生效！",
            warningTip: "无犯罪证明自出具之日起通常只有 3 个月有效期，注意递签时间节点！"
          }
        ]
      },
      {
        id: "es-s2",
        stageName: "阶段二：使馆递签与抵西按指纹拿卡",
        stageSubtitle: "全家登录与领取 TIE 外国人居留卡",
        icon: "CheckCircle",
        tasks: [
          {
            id: "es-t3",
            title: "购买西班牙本土全额商业医疗保险 (Sin Copago 无免赔)",
            duration: "1 天",
            costEst: "单人约 500 ~ 1,200 欧/年 (依年龄而定)",
            isCrucial: true,
            description: "必须由西班牙本土合规保险公司 (如 Sanitas, Asisa, Adeslas) 出具的包含住院、急诊且无自付额 (Sin Copago) 的保单。",
            warningTip: "不可使用普通旅游意外险替代！必须是正规一年期私人医保。"
          },
          {
            id: "es-t4",
            title: "抵西 1 个月内预约警察局 (Cita) 按指纹领取 TIE 卡",
            duration: "按指纹后约 30 天取卡",
            costEst: "工本规费约 16 欧元",
            isCrucial: true,
            description: "入境西班牙后，凭租房合同在住址所属市政厅登记住址证明 (Empadronamiento)，随后预约国家警察局录入十指指纹，领取实体 TIE 居留卡！",
            warningTip: "马德里和巴塞罗那警察局放号极为紧张，可考虑在瓦伦西亚、塞维利亚或南部城市办理更轻松。"
          }
        ]
      }
    ]
  }
};
