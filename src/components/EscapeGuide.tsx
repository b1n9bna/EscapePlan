import React, { useState, useEffect } from 'react';
import {
  Compass,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Clock,
  Award,
  Check,
  ChevronDown,
  Download,
  Flame,
  HelpCircle
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import type { CountryData, VisaSubclass } from '../data/countries';
import { CITY_BENCHMARKS } from '../data/realityCheck';
import type { CityCostBenchmark } from '../data/realityCheck';
import { DIY_ROADMAPS } from '../data/diyGuide';
import type { CountryRoadmap } from '../data/diyGuide';

interface EscapeGuideProps {
  initialCountryId?: string;
  theme?: 'light' | 'dark';
}

// 针对各国的权威官方链接库（严禁任何第三方中介广告）
const OFFICIAL_PORTALS: Record<
  string,
  {
    title: string;
    authority: string;
    url: string;
    desc: string;
  }[]
> = {
  japan: [
    {
      title: '出入国在留管理厅 (出入国在留管理庁)',
      authority: '日本法务省官方管辖',
      url: 'https://www.moj.go.jp/isa/',
      desc: '日本各类在留资格标准、签证下发规则与居留政策第一官方信源。'
    },
    {
      title: '高度人才积分制官方规则与算分表',
      authority: '日本出入国在留管理厅',
      url: 'https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00016.html',
      desc: '详细列明 70 分/80 分高度人才的学历、年薪、年龄、日语具体打分对照细则。'
    },
    {
      title: '日本驻华大使馆 · 赴日签证官方指南',
      authority: '日本外务省',
      url: 'https://www.cn.emb-japan.go.jp/itpr_zh/visa.html',
      desc: '在华申请就劳签、留学签、在留资格认定证明书 (COE) 换签流程。'
    }
  ],
  australia: [
    {
      title: 'Department of Home Affairs (内政部官网)',
      authority: '澳大利亚联邦政府',
      url: 'https://immi.homeaffairs.gov.au/',
      desc: '澳大利亚所有技术移民、州担保、打工度假签 (WHV 462) 官方唯一法规与签证系统。'
    },
    {
      title: 'SkillSelect 积分制移民打分系统',
      authority: '澳大利亚内政部官方在线系统',
      url: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect',
      desc: '189/190/491 技术移民的职业清单 (SOL) 与意向书 (EOI) 官方递交入口。'
    }
  ],
  newzealand: [
    {
      title: 'Immigration New Zealand (新西兰移民局官方门户)',
      authority: '新西兰商业、创新与就业部 (MBIE)',
      url: 'https://www.immigration.govt.nz/',
      desc: '新西兰 SMC 6分制技术移民、绿色清单快速通道与认证雇员工签官方唯一法规源头。'
    },
    {
      title: 'Green List 绿色清单官方紧缺职业库与学历比对',
      authority: '新西兰移民局官方标准',
      url: 'https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/working-in-nz/qualifications-for-work/green-list-occupations',
      desc: '直通居留 (Tier 1) 与工作转居留 (Tier 2) 的对应职业、中位数时薪标准与资格核对。'
    },
    {
      title: 'NZQA 海外学历认证服务 (IQA)',
      authority: '新西兰学历资格认证局',
      url: 'https://www.nzqa.govt.nz/',
      desc: '非豁免中国高等院校学历对等新西兰 Level 7 / Level 9 官方认证唯一评估机构。'
    }
  ],
  canada: [
    {
      title: 'Immigration, Refugees and Citizenship Canada (IRCC)',
      authority: '加拿大联邦移民局官网',
      url: 'https://www.canada.ca/en/services/immigration-citizenship.html',
      desc: '加拿大联邦快速通道 (Express Entry)、学签、毕业工签 (PGWP) 官方唯一申请入口。'
    },
    {
      title: 'Comprehensive Ranking System (CRS) 官方打分工具',
      authority: '加拿大联邦政府官方直测',
      url: 'https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp',
      desc: '无中介加价，直接输入年龄、语言成绩与学历，实时计算联邦池内得分。'
    }
  ],
  usa: [
    {
      title: 'U.S. Citizenship and Immigration Services (USCIS 美国移民局)',
      authority: '美国国土安全部 (DHS)',
      url: 'https://www.uscis.gov/',
      desc: 'Form I-140 (职业移民请愿)、I-485 (身份调整)、NIW 国家利益豁免全套官方指南与审理规费。'
    },
    {
      title: 'Visa Bulletin 官方签证公告牌 (排期表)',
      authority: '美国国务院领事事务局 (travel.state.gov)',
      url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
      desc: '每月权威公布中国大陆出生申请人 EB-1、EB-2 (含NIW)、EB-3 优先日表 A 与表 B 官方排期。'
    },
    {
      title: 'Foreign Labor Application Gateway (FLAG 系统)',
      authority: '美国联邦劳工部 (U.S. Department of Labor)',
      url: 'https://flag.dol.gov/',
      desc: '查询 PERM 劳工证现行工资 (Prevailing Wage) 与各州各代码真实薪资标准。'
    }
  ],
  singapore: [
    {
      title: 'Ministry of Manpower (MOM 新加坡人力部)',
      authority: '新加坡法定政府机构',
      url: 'https://www.mom.gov.sg/',
      desc: 'COMPASS 互补专才评估框架、EP、ONE Pass 及 S Pass 准证官方政策与行业薪资基准。'
    },
    {
      title: 'Self-Assessment Tool (SAT 在线评估系统)',
      authority: '新加坡人力部官方自测',
      url: 'https://www.mom.gov.sg/eservices/services/employment-s-pass-self-assessment-tool',
      desc: '输入薪资与学历即时获得 EP/COMPASS 获批可能性的官方预先判定，准确度极高。'
    },
    {
      title: 'Immigration & Checkpoints Authority (ICA 移民与关卡局)',
      authority: '新加坡内政部',
      url: 'https://www.ica.gov.sg/',
      desc: '新加坡永久居民 (Permanent Resident / PR) 及公民身份官方唯一下发与递交系统。'
    }
  ],
  thailand: [
    {
      title: 'Thai E-Visa Official Portal',
      authority: '泰王国驻外使领馆官方电子签证平台',
      url: 'https://www.thaievisa.go.th/',
      desc: '中国公民办理目的地泰国签证 (DTV - 数字游民签 5年期) 的官方正规直申网站。'
    },
    {
      title: '泰国领事事务局 (Department of Consular Affairs)',
      authority: '泰国外交部',
      url: 'https://consular.mfa.go.th/',
      desc: 'DTV 签证、养老签证 (Non-OA/OX) 资金流水审核与出入境合规指南。'
    }
  ],
  spain: [
    {
      title: 'Ministerio de Inclusión, Seguridad Social y Migraciones',
      authority: '西班牙包容、社会保障与移民部',
      url: 'https://www.inclusion.gob.es/',
      desc: '西班牙非盈利居留 (Residencia no lucrativa) 与移民法条官方网站。'
    },
    {
      title: '初创企业法案 · 数字游民签证 (DNV) 官方指南',
      authority: '西班牙外交、欧盟与合作部',
      url: 'https://www.exteriores.gob.es/',
      desc: '远程工作者与自由职业者在西合法居留与贝克汉姆税收法案官方细则。'
    }
  ],
  germany: [
    {
      title: 'Make it in Germany (联邦官方工作与移民门户)',
      authority: '德国联邦经济部与联邦劳动署',
      url: 'https://www.make-it-in-germany.com/',
      desc: '德国联邦政府针对外国专业人才的唯一官方综合门户，提供多语言权威说明。'
    },
    {
      title: '机会卡 (Chancenkarte) 官方说明与自测',
      authority: '德国联邦外交部与驻华使领馆',
      url: 'https://china.diplo.de/',
      desc: '基于积分制的求职居留许可（满 6 分入境德国找工），官方材料清单与递签预约。'
    },
    {
      title: '联邦移民与难民局 (BAMF)',
      authority: '德国联邦内政部',
      url: 'https://www.bamf.de/',
      desc: '欧盟蓝卡 (EU Blue Card) 发放标准与定居许可证 (Niederlassungserlaubnis) 永居法条。'
    }
  ]
};

// 涉外核心材料认证统一官方入口（国家级）
const CHINESE_OFFICIAL_RESOURCES = [
  {
    title: '中国领事服务网 · 海牙认证 (Apostille) 专栏',
    authority: '中华人民共和国外交部',
    url: 'http://cs.mfa.gov.cn/',
    desc: '中国已于 2023 年 11 月正式加入《海牙公约》。涉外文书只需办理海牙附加证明书，彻底告别使馆双认证，费用省大半。'
  },
  {
    title: '学信网 (CHSI) · 出国学历中英文认证',
    authority: '中华人民共和国教育部',
    url: 'https://www.chsi.com.cn/',
    desc: '日本、德国、加拿大等国移民局认可的最高学历中英文认证报告官方唯一出具平台。'
  }
];

export const EscapeGuide: React.FC<EscapeGuideProps> = ({
  initialCountryId = 'japan',
  theme = 'dark'
}) => {
  const isLight = theme === 'light';

  // State: 当前选中的国家
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId);

  // State: 算分器选中的项 (ruleId -> points)
  const [calcSelections, setCalcSelections] = useState<Record<string, number>>({});

  // State: 当前子签证类型选择
  const [selectedSubclassId, setSelectedSubclassId] = useState<string>('');

  // State: 税后沙盒用户输入的毛年薪
  const [userGrossSalary, setUserGrossSalary] = useState<number>(0);

  // State: DIY 任务勾选清单
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // State: 当前展开的核心问答索引 (默认展开第一项)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const country: CountryData =
    COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[0];

  const COUNTRY_TO_CITY_MAP: Record<string, string> = {
    japan: 'tokyo',
    australia: 'sydney',
    newzealand: 'auckland',
    canada: 'vancouver',
    usa: 'seattle',
    singapore: 'singapore',
    thailand: 'chiangmai',
    spain: 'valencia',
    germany: 'berlin'
  };

  const cityBenchmark: CityCostBenchmark =
    CITY_BENCHMARKS[COUNTRY_TO_CITY_MAP[selectedCountryId] || 'tokyo'] ||
    CITY_BENCHMARKS['tokyo'];

  const diyRoadmap: CountryRoadmap =
    DIY_ROADMAPS[selectedCountryId] || DIY_ROADMAPS['japan'];

  const currentSubclass: VisaSubclass =
    country.subclasses.find((s) => s.id === selectedSubclassId) || country.subclasses[0];

  // 切换国家时重置各项依赖状态
  useEffect(() => {
    setSelectedSubclassId(country.subclasses[0]?.id || '');
    setCalcSelections({});
    setUserGrossSalary(cityBenchmark.grossAnnualDefault);
  }, [selectedCountryId]);

  // 从 LocalStorage 加载已勾选任务
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`escapeplan_diy_${selectedCountryId}`);
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      } else {
        setCompletedTasks({});
      }
    } catch {}
  }, [selectedCountryId]);

  const toggleTask = (taskId: string) => {
    const updated = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    setCompletedTasks(updated);
    try {
      localStorage.setItem(`escapeplan_diy_${selectedCountryId}`, JSON.stringify(updated));
    } catch {}
  };

  const handleSelectRuleOption = (ruleId: string, points: number) => {
    setCalcSelections((prev) => ({
      ...prev,
      [ruleId]: points
    }));
  };

  // 实时算分总计
  const totalPoints = Object.values(calcSelections).reduce((acc, val) => acc + val, 0);

  // 税后月结余计算
  const effectiveSalary = userGrossSalary || cityBenchmark.grossAnnualDefault;
  const monthlyGross = Math.round(effectiveSalary / 12);
  const taxAndDeductionMonthly = Math.round(monthlyGross * cityBenchmark.taxAndInsuranceRate);
  const netTakeHomeMonthly = monthlyGross - taxAndDeductionMonthly;
  const netSavingsMonthly =
    netTakeHomeMonthly - cityBenchmark.medianRent1BedMonthly - cityBenchmark.foodAndLivingMonthly;
  const netSavingsRMB = Math.round(netSavingsMonthly * cityBenchmark.currencyRateToRMB);
  const netTakeHomeRMB = Math.round(netTakeHomeMonthly * cityBenchmark.currencyRateToRMB);

  // 导出 Markdown 备忘清单
  const handleExportMarkdown = () => {
    let md = `# 逃离指北 · 我的手搓移居备忘录 - ${country.name} (${country.englishName})\n\n`;
    md += `> 生成时间：${new Date().toLocaleDateString()} | 来源：EscapePlan 逃跑计划\n\n`;
    md += `## 1. 真实生活成本参考基准\n`;
    md += `- 目标城市：${cityBenchmark.city}\n`;
    md += `- 测算税前年薪：${effectiveSalary.toLocaleString()} ${cityBenchmark.currency}\n`;
    md += `- 扣除个税/社保后月到手：约 ${netTakeHomeMonthly.toLocaleString()} ${cityBenchmark.currency} (约 ¥${netTakeHomeRMB.toLocaleString()} RMB)\n`;
    md += `- 扣除单人整租与伙食后每月预估结余：约 ${netSavingsMonthly.toLocaleString()} ${cityBenchmark.currency} (约 ¥${netSavingsRMB.toLocaleString()} RMB)\n\n`;

    if (currentSubclass.pointCalculator) {
      md += `## 2. 积分测算结果\n`;
      md += `- 签证通道：${currentSubclass.name}\n`;
      md += `- 当前自测总分：${totalPoints} 分 (合格基准线：${currentSubclass.pointCalculator.threshold} 分)\n\n`;
    }

    md += `## 3. 手搓待办清单进度\n`;
    diyRoadmap.stages.forEach((stage) => {
      md += `\n### ${stage.stageName} - ${stage.stageSubtitle}\n`;
      stage.tasks.forEach((t) => {
        const isDone = completedTasks[t.id];
        md += `- [${isDone ? 'x' : ' '}] **${t.title}** (${t.duration} | 预估预算: ${t.costEst})\n`;
        md += `  ${t.description}\n`;
      });
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EscapePlan_逃离指北_${country.name}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-year-enter font-sans">
      {/* =================================================================== */}
      {/* 1. TOP HEADER & PROMISE                                             */}
      {/* =================================================================== */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-semibold font-narrative-serif bg-amber-500/10 border-amber-500/30 text-amber-500">
          <Compass className="w-4 h-4" />
          <span>实操指南 · 击碎中介信息差 · 真实底线账本</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-narrative-serif ${
            isLight ? 'text-stone-900' : 'text-stone-100'
          }`}
        >
          逃离指北：普通人的现实自救与移居手册
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed font-reading-sans ${
            isLight ? 'text-stone-600' : 'text-stone-400'
          }`}
        >
          不编造“海外遍地黄金”的幻象，也不宣扬非理性的盲目逃跑。直面五大核心追问：
          <span className="font-semibold text-amber-500">
            『去哪里？怎么拿签证？最低花费多少？几年后能不能留？今天开始怎么动手？』
          </span>
          全部数据锚定各国移民局法条与真实购买力。
        </p>
      </div>

      {/* =================================================================== */}
      {/* 2. COUNTRY SELECTION DOCK                                           */}
      {/* =================================================================== */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-stone-400 font-mono-num uppercase tracking-wider block">
          目标国家 / 地区选择
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-2.5">
          {COUNTRIES_DATA.map((c) => {
            const isSelected = c.id === selectedCountryId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCountryId(c.id)}
                className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isLight
                      ? 'bg-amber-50/90 border-amber-500 text-stone-900 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-[#1C1F2E] border-amber-400 text-stone-100 shadow-lg shadow-black/40 ring-1 ring-amber-400/40'
                    : isLight
                    ? 'bg-white border-stone-200 hover:border-amber-400/60 text-stone-700'
                    : 'bg-[#12141D] border-white/[0.08] hover:border-white/[0.2] text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl">{c.flag}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono-num font-semibold ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : isLight
                        ? 'bg-stone-100 text-stone-600'
                        : 'bg-white/[0.06] text-stone-400'
                    }`}
                  >
                    {c.overallFriendliness}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-bold font-narrative-serif leading-tight">
                    {c.name}
                  </div>
                  <div className="text-[11px] opacity-75 font-mono-num truncate">
                    {c.englishName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. SELECTED COUNTRY OVERVIEW BANNER                                 */}
      {/* =================================================================== */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border transition-colors shadow-xl space-y-3 relative overflow-hidden ${
          isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.1]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-amber-500/20">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold font-narrative-serif">
                  {country.name} · 生存档案
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-amber-500/10 border-amber-500/30 text-amber-500">
                  {country.badge}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-reading-sans mt-0.5">
                {country.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={handleExportMarkdown}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0 ${
              isLight
                ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.1] text-stone-200'
            }`}
            title="一键导出为本地 Markdown Checklist"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>导出本国手搓清单 (.md)</span>
          </button>
        </div>

        {/* 关键基础参数 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 font-reading-sans">
          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.05]'
            }`}
          >
            <span className="text-stone-400 block text-[11px] mb-0.5">首府 / 主流城市</span>
            <span className="font-bold">{country.capital}</span>
          </div>
          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.05]'
            }`}
          >
            <span className="text-stone-400 block text-[11px] mb-0.5">语言门槛现实</span>
            <span className="font-bold">{country.languageRequirement}</span>
          </div>
          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.05]'
            }`}
          >
            <span className="text-stone-400 block text-[11px] mb-0.5">中位数技术年薪</span>
            <span className="font-bold text-amber-500 font-mono-num">{country.medianTechSalary}</span>
          </div>
          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.05]'
            }`}
          >
            <span className="text-stone-400 block text-[11px] mb-0.5">政策态度</span>
            <span className="font-bold">{country.overallFriendliness}</span>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 4. THE 5 CORE PRAGMATIC QUESTIONS (五个核心决策追问)                   */}
      {/* =================================================================== */}
      <div className="space-y-4">
        {/* ----------------------------------------------------------------- */}
        {/* Q1: 我适不适合去？（门槛、适合谁、不适合谁）                            */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`border rounded-2xl transition-all overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveFaqIndex(activeFaqIndex === 0 ? null : 0)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center shrink-0">
                Q1
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold font-narrative-serif">
                  我适合去【{country.name}】吗？有哪些中介绝口不提的硬性代价？
                </h3>
                <p className="text-xs text-stone-400 font-reading-sans">
                  客观看清自身底牌，拒绝盲目跟风
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                activeFaqIndex === 0 ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeFaqIndex === 0 && (
            <div className="p-4 sm:p-6 pt-0 border-t border-amber-500/10 space-y-4 text-xs sm:text-sm font-reading-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* 适合人群 */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isLight
                      ? 'bg-emerald-50/60 border-emerald-200 text-stone-800'
                      : 'bg-emerald-950/20 border-emerald-800/40 text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-emerald-500 font-narrative-serif">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>极其适合以下人群：</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
                    {cityBenchmark.pros.map((pro, pIdx) => (
                      <li key={pIdx}>{pro}</li>
                    ))}
                  </ul>
                </div>

                {/* 劝退/不适合人群 */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isLight
                      ? 'bg-rose-50/60 border-rose-200 text-stone-800'
                      : 'bg-rose-950/20 border-rose-800/40 text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-rose-500 font-narrative-serif">
                    <AlertTriangle className="w-4 h-4" />
                    <span>以下情况强烈建议劝退：</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
                    {cityBenchmark.cons.map((con, cIdx) => (
                      <li key={cIdx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 语言与文化现实 */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                  isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.06]'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-400 leading-relaxed">
                  <span className="font-bold text-stone-200">语言真实真相：</span>
                  {selectedCountryId === 'japan'
                    ? '纯英语只在外资IT大厂（如 Mercari、LINE）行得通；要过上舒服的生活、融入租房、办手续并进入传统本土企业，N2 是绝对底线，N1 才是舒适圈。'
                    : selectedCountryId === 'germany'
                    ? '柏林/慕尼黑有大量英语研发岗，但日常生活行政（Bürgeramt 登记、租房、看病、报税）全是纯德语，B1 是长期定居与永居的硬指标。'
                    : selectedCountryId === 'thailand'
                    ? '清迈/曼谷游民圈完全可以用英语无缝交流，但泰国不提供绿卡通道，适合作为 1~3 年的短期低成本缓冲地。'
                    : '英美澳加纯英语环境，但雅思 6.5~7.0 是绝大多数工签与永居池子最低的入池门槛。'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Q2: 怎么拿签证？三大通道（求学/工作/游民）怎么申请？内嵌积分算分器       */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`border rounded-2xl transition-all overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveFaqIndex(activeFaqIndex === 1 ? null : 1)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center shrink-0">
                Q2
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold font-narrative-serif">
                  怎么拿到签证？求学、直聘、游民各通道怎么选？内嵌官方积分测算
                </h3>
                <p className="text-xs text-stone-400 font-reading-sans">
                  拆解主流合法签证类别，公开官方打分机制
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                activeFaqIndex === 1 ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeFaqIndex === 1 && (
            <div className="p-4 sm:p-6 pt-0 border-t border-amber-500/10 space-y-5 text-xs sm:text-sm font-reading-sans">
              {/* 子签证通道切换 Pill */}
              <div className="pt-4">
                <span className="text-xs font-semibold text-stone-400 font-mono-num uppercase tracking-wider block mb-2">
                  选择查看该国签证通道：
                </span>
                <div className="flex flex-wrap gap-2">
                  {country.subclasses.map((sub) => {
                    const isSelected = sub.id === currentSubclass.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubclassId(sub.id);
                          setCalcSelections({});
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                            : isLight
                            ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300'
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className="text-[10px] opacity-75 font-mono-num">
                          [{sub.difficulty}]
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 选中子签证的详细卡片 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${
                  isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#151722] border-white/[0.08]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-amber-500/15">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base font-narrative-serif text-[#D4A359]">
                        {currentSubclass.name}
                      </span>
                      <span className="text-xs text-stone-400 font-mono-num">
                        ({currentSubclass.englishName})
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{currentSubclass.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-num shrink-0">
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">
                      下签周期: {currentSubclass.processingTime}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                      永居速度: {currentSubclass.prSpeed}
                    </span>
                  </div>
                </div>

                {/* 核心申请条件 */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-stone-300 block">
                    【官方硬性门槛与申请资格】
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-stone-400 leading-relaxed">
                    {currentSubclass.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* 官方积分算分器 (如果该签证支持算分) */}
                {currentSubclass.pointCalculator && (
                  <div
                    className={`mt-4 p-4 rounded-xl border space-y-4 ${
                      isLight
                        ? 'bg-amber-50/60 border-amber-300 text-stone-800'
                        : 'bg-[#191C28] border-amber-500/30 text-stone-100'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5 border-amber-500/20">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-sm font-narrative-serif text-amber-500">
                          官方打分系统实时测算 (在线勾选测算)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono-num text-xs">
                        <span>合格线：{currentSubclass.pointCalculator.threshold}分</span>
                        {currentSubclass.pointCalculator.fastTrackThreshold && (
                          <span className="text-emerald-400 font-bold">
                            极速通道：{currentSubclass.pointCalculator.fastTrackThreshold}分
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 算分规则选项列表 */}
                    <div className="space-y-3">
                      {currentSubclass.pointCalculator.rules.map((rule) => {
                        const currentPoints = calcSelections[rule.id] ?? 0;
                        return (
                          <div key={rule.id} className="space-y-1.5 text-xs">
                            <div className="flex items-center justify-between font-semibold">
                              <span className="text-stone-300">{rule.name}</span>
                              <span className="font-mono-num text-amber-400 font-bold">
                                {currentPoints > 0 ? `+${currentPoints} 分` : '未勾选 (0分)'}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                              {rule.options.map((opt, oIdx) => {
                                const isChecked = currentPoints === opt.points;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleSelectRuleOption(rule.id, opt.points)}
                                    className={`p-2 rounded-lg border text-left transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between ${
                                      isChecked
                                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                        : isLight
                                        ? 'bg-white border-stone-200 text-stone-600 hover:border-amber-300'
                                        : 'bg-white/[0.04] border-white/[0.06] text-stone-400 hover:border-white/[0.15]'
                                    }`}
                                  >
                                    <span className="truncate pr-1">{opt.label}</span>
                                    <span className="font-mono-num shrink-0 text-amber-400 font-bold">
                                      +{opt.points}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 算分结论展示卡 */}
                    <div
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                        totalPoints >= currentSubclass.pointCalculator.threshold
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold font-narrative-serif">
                            当前自测总积分：
                            <span className="text-lg font-mono-num text-amber-400 ml-1">
                              {totalPoints}
                            </span>{' '}
                            分
                          </div>
                          <p className="text-[11px] opacity-85">
                            {totalPoints >=
                            (currentSubclass.pointCalculator.fastTrackThreshold || 80)
                              ? `🌟 恭喜！已达 ${currentSubclass.pointCalculator.fastTrackLabel || '极速快速通道'} 要求，符合顶格加速条件！`
                              : totalPoints >= currentSubclass.pointCalculator.threshold
                              ? `✓ 已达 ${currentSubclass.pointCalculator.thresholdLabel} 准入门槛，具备正规申请资格！`
                              : `⚠️ 距离最低及格线尚差 ${
                                  currentSubclass.pointCalculator.threshold - totalPoints
                                } 分，建议按打分项补齐语言或学历硬指标。`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Q3: 真实成本与最低花费？（去滤镜真实账本）                                */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`border rounded-2xl transition-all overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveFaqIndex(activeFaqIndex === 2 ? null : 2)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center shrink-0">
                Q3
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold font-narrative-serif">
                  最低花费到底是多少？每月税后真实能剩多少钱？（真实收支沙盒）
                </h3>
                <p className="text-xs text-stone-400 font-reading-sans">
                  打破年薪汇率滤镜，扣除税费、房租与医保后的底线数字
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                activeFaqIndex === 2 ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeFaqIndex === 2 && (
            <div className="p-4 sm:p-6 pt-0 border-t border-amber-500/10 space-y-5 text-xs sm:text-sm font-reading-sans">
              {/* 最低启动资金硬指标 */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-narrative-serif flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>【启动底线】：落地该国必须准备的最低真金白银</span>
                </span>
                <div
                  className={`p-4 rounded-xl border space-y-2 leading-relaxed ${
                    isLight
                      ? 'bg-amber-50/70 border-amber-200 text-stone-800'
                      : 'bg-amber-950/20 border-amber-500/30 text-stone-200'
                  }`}
                >
                  {selectedCountryId === 'japan' ? (
                    <div>
                      <p className="font-bold text-sm text-amber-400">
                        去日本最低启动资金底线：8 ~ 10 万元人民币
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        • 语校学费首期：约 80 万日元/年（折合约 3.7 万 RMB）
                        <br />
                        • 头三个月房租及礼金押金：约 25 万日元（折合约 1.2 万 RMB）
                        <br />
                        • 官方流水证明：通常需父母或本人名下 20 万 RMB 定期存款冻结 3 个月出具存款证明。
                        <br />
                        • 自给自足平衡点：落地后日本合法打工法定上限为每周 28 小时，时薪约 1,150~1,300 日元，月打工收入约 13~15 万日元，可完全覆盖个人伙食与合租房租。
                      </p>
                    </div>
                  ) : selectedCountryId === 'germany' ? (
                    <div>
                      <p className="font-bold text-sm text-amber-400">
                        去德国最低启动资金底线：8.8 ~ 10 万元人民币
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        • 公立大学免学费：每学期仅收 250~350 欧元的学期杂费（含市内公交学期票）。
                        <br />
                        • 官方自保金（Sperrkonto 冻结账户）：移民局强制规定必须存入 11,208 欧元（约 8.8 万 RMB），存入德意志银行或 Fintiba，入境后每月按 934 欧元解冻供生活花销。
                        <br />
                        • 打工补贴：学生签每年可合法全职打工 140 天（或半职 280 天），时薪法定最低 12.41 欧元。
                      </p>
                    </div>
                  ) : selectedCountryId === 'thailand' ? (
                    <div>
                      <p className="font-bold text-sm text-amber-400">
                        去泰国最低启动资金底线：1.5 ~ 3 万元人民币
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        • DTV 签证费：约 10,000 泰铢（约 2,100 RMB），单次签发 5 年多次往返。
                        <br />
                        • 官方资产门槛：需在个人银行账户中证明拥有不少于 500,000 泰铢（约 10.5 万 RMB）存款。
                        <br />
                        • 生存红线：清迈/曼谷带泳池单身公寓月租仅需 1,500~2,500 RMB，月均生活总开销 3,500~5,000 RMB 即可极为体面生活。
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-sm text-amber-400">
                        该国官方签证保证金与最低生活费标准
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        移民局强制要求出示至少覆盖头一年生活开销的银行证明文件，通常在 15 万 ~ 30 万 RMB 之间。具体视就读学校或工作邀请函 (Job Offer) 是否包宿而定。
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 交互式税后沙盘计算器 */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#151722] border-white/[0.08]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5 border-amber-500/15">
                  <span className="font-bold text-sm font-narrative-serif text-[#D4A359]">
                    当地真实月度税后收支沙盒 ({cityBenchmark.city})
                  </span>
                  <span className="text-xs text-stone-400 font-mono-num">
                    当前汇率基准: 1 {cityBenchmark.currency} ≈ {cityBenchmark.currencyRateToRMB} RMB
                  </span>
                </div>

                {/* 年薪输入调整滑动条 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300">假设你的税前年薪 (Gross Annual Salary)：</span>
                    <span className="font-mono-num font-bold text-amber-400 text-sm">
                      {effectiveSalary.toLocaleString()} {cityBenchmark.currency}
                      <span className="text-xs text-stone-400 font-normal ml-1">
                        (约 ¥{Math.round(effectiveSalary * cityBenchmark.currencyRateToRMB).toLocaleString()} RMB)
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(cityBenchmark.grossAnnualDefault * 0.5)}
                    max={Math.round(cityBenchmark.grossAnnualDefault * 2.0)}
                    step={Math.round(cityBenchmark.grossAnnualDefault * 0.05)}
                    value={effectiveSalary}
                    onChange={(e) => setUserGrossSalary(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* 收支明细对比瀑布 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-num pt-1">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-white border-stone-200' : 'bg-black/30 border-white/[0.05]'
                    }`}
                  >
                    <span className="text-stone-400 block text-[11px]">月均税前</span>
                    <span className="font-bold">
                      {monthlyGross.toLocaleString()} {cityBenchmark.currency}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-white border-stone-200' : 'bg-black/30 border-white/[0.05]'
                    }`}
                  >
                    <span className="text-rose-400 block text-[11px]">
                      个税与社保年金 (-{Math.round(cityBenchmark.taxAndInsuranceRate * 100)}%)
                    </span>
                    <span className="font-bold text-rose-400">
                      -{taxAndDeductionMonthly.toLocaleString()} {cityBenchmark.currency}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-white border-stone-200' : 'bg-black/30 border-white/[0.05]'
                    }`}
                  >
                    <span className="text-stone-400 block text-[11px]">
                      一居室整租中位数 + 伙食
                    </span>
                    <span className="font-bold">
                      -
                      {(
                        cityBenchmark.medianRent1BedMonthly + cityBenchmark.foodAndLivingMonthly
                      ).toLocaleString()}{' '}
                      {cityBenchmark.currency}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      netSavingsMonthly > 0
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    <span className="block text-[11px] font-sans font-bold">
                      {netSavingsMonthly > 0 ? '每月净存可结余' : '月度赤字透支'}
                    </span>
                    <span className="font-bold text-sm">
                      {netSavingsMonthly.toLocaleString()} {cityBenchmark.currency}
                    </span>
                    <span className="block text-[10px] opacity-80">
                      (约 ¥{netSavingsRMB.toLocaleString()} RMB)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Q4: 留还是回？过几年能留下来吗？（签证升级阶梯 Visa Ladder）                */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`border rounded-2xl transition-all overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveFaqIndex(activeFaqIndex === 3 ? null : 3)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center shrink-0">
                Q4
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold font-narrative-serif">
                  待几年再回来？还是能彻底留下？（签证升级阶梯 Visa Ladder）
                </h3>
                <p className="text-xs text-stone-400 font-reading-sans">
                  两种心态的退路与成本核算：回国的损耗 vs 转绿卡的硬指标
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                activeFaqIndex === 3 ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeFaqIndex === 3 && (
            <div className="p-4 sm:p-6 pt-0 border-t border-amber-500/10 space-y-4 text-xs sm:text-sm font-reading-sans">
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 选项 A：待 1~3 年回国 */}
                <div
                  className={`p-4 rounded-xl border space-y-2.5 ${
                    isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#151722] border-white/[0.08]'
                  }`}
                >
                  <div className="font-bold text-amber-400 font-narrative-serif flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>【模式一】：体验 1 ~ 3 年后回国</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-400 leading-relaxed">
                    <p>
                      <strong className="text-stone-200">收获：</strong>
                      完整异国生活经历、外语熟练沟通能力、开阔视野，简历中可写海外项目经历。
                    </p>
                    <p>
                      <strong className="text-rose-400">潜在损耗（必须清醒面对）：</strong>
                      国内应届生身份彻底失效；国内社保公积金断缴；如果出国从事的是蓝领或普通兼职，回国可能面临“专业技能断代 + 35岁就业门槛”双重挤压。
                    </p>
                  </div>
                </div>

                {/* 选项 B：彻底留居拿永住/护照 */}
                <div
                  className={`p-4 rounded-xl border space-y-2.5 ${
                    isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#151722] border-white/[0.08]'
                  }`}
                >
                  <div className="font-bold text-emerald-400 font-narrative-serif flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>【模式二】：彻底留居（永住 / 绿卡路径）</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-400 leading-relaxed">
                    {selectedCountryId === 'japan' ? (
                      <div>
                        <strong className="text-stone-200">日本在留升级阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>语言学校 / 大学 (1~2年学签)</li>
                          <li>找到日本本土全职工作，换发“技术·人文知识·国际业务”工签</li>
                          <li>
                            高度人才积分达 80 分仅需 1 年 / 达 70 分需 3 年 / 普通工签缴满 10 年社保年金 ➔ 申请日本永住 (永久居留证，保留中国国籍)。
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'australia' ? (
                      <div>
                        <strong className="text-stone-200">澳大利亚永居升级阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>WHV 462 打工度假 / 留学生 485 毕业生工签入境</li>
                          <li>积累澳洲本地工作经验，冲刺 PTE 65/79 分（四炸）并完成职业评估</li>
                          <li>
                            递交 SkillSelect EOI ➔ 189 独立技术或 190 州担保获邀 ➔ 一步到位全家获得澳洲永久居留权 (PR 绿卡) ➔ 居住满 4 年可申请入籍。
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'newzealand' ? (
                      <div>
                        <strong className="text-stone-200">新西兰永居与【永久回头签】阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>通过 WHV 或海外招聘锁定 Accredited Employer 认证雇主 Job Offer</li>
                          <li>绿色清单直接获批居民签，或通过 SMC 6 分制获批居民签 (Resident Visa)</li>
                          <li>
                            持有居民签在新西兰住满 2 年（每年满 184 天）➔ 换领全球独一无二的【永久回头签 (Permanent Resident Visa)】！终身不再有任何移民监，回国多久绿卡永远有效！
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'canada' ? (
                      <div>
                        <strong className="text-stone-200">加拿大枫叶卡晋级阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>公立学院/大学毕业获得 1~3 年毕业工签 (PGWP) 或持有雇主 LMIA 工签</li>
                          <li>积累 TEER 0/1/2/3 类工作经验，将英语考至 CLB 9（雅思 8777）</li>
                          <li>
                            Express Entry 联邦池内按 CRS 分数捞选，或走 BC PNP Tech 等省提名获 600 分保送加分 ➔ 获批加拿大永久居民 (PR 枫叶卡) ➔ 5 年内住满 3 年可入籍。
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'usa' ? (
                      <div>
                        <strong className="text-stone-200">美国职业移民绿卡阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>留学生通过 F-1 STEM OPT (最长 3 年) 就业，期间由雇主抽签 H-1B 工作签证；跨国企业员工走 L-1 调派</li>
                          <li>具有行业客观影响力者可随时独立递交 EB-2 NIW (国家利益豁免)，免去雇主担保，加急 45 天锁定优先日 (Priority Date)</li>
                          <li>
                            雇主赞助 PERM 劳工证 ➔ 获批 I-140 ➔ 跟踪排期公告牌 (Visa Bulletin) ➔ 优先日到达后递交 I-485 或广领馆面签，全家落袋美国永久绿卡。
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'singapore' ? (
                      <div>
                        <strong className="text-stone-200">新加坡准证与 PR 申请路径：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>通过 COMPASS 40 分评估获得人力部颁发的就业准证 (Employment Pass - EP)</li>
                          <li>月薪达 6,000 SGD 为配偶子女办理家属准证 (DP)，全家迁居新加坡</li>
                          <li>
                            在新加坡工作纳税满 1~2 年后，向移民与关卡局 (ICA) 线上提交新加坡永久居民 (PR) 申请 ➔ ICA 综合评估学历、纳税、家庭融入度后发放蓝卡。
                          </li>
                        </ol>
                      </div>
                    ) : selectedCountryId === 'thailand' ? (
                      <div>
                        <strong className="text-stone-200">泰国居留现状：</strong>
                        <p className="mt-1">
                          泰国不属于传统移民国家，无常规普通技术绿卡通道。DTV 签最长支持 5 年（每 180 天出境一次或境内延期），适合作为自由职业与离岸收入者的长期旅居/避寒降维基地。
                        </p>
                      </div>
                    ) : selectedCountryId === 'spain' ? (
                      <div>
                        <strong className="text-stone-200">西班牙永居与欧盟护照阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>以非盈利性居留 (No Lucrativa) 或数字游民签证 (DNV) 登陆，按 1+2+2 年模式续签居留卡 (TIE)</li>
                          <li>持合法居留满 5 年（期间单次离境不超过 6 个月，累计不超过 10 个月）➔ 直接换领西班牙永久居留 / 欧盟长久居留 (Residencia de larga duración)</li>
                          <li>合法居住满 10 年并通过 DELE A2 西班牙语及 CCSE 文化常识考试 ➔ 可申请加入西班牙国籍，取得欧盟护照。</li>
                        </ol>
                      </div>
                    ) : (
                      <div>
                        <strong className="text-stone-200">德国永居与新国籍法升级阶梯：</strong>
                        <ol className="list-decimal list-inside space-y-0.5 mt-1">
                          <li>留学毕业工签 / 机会卡 (Chancenkarte) 赴德实地找工作</li>
                          <li>获得对口专业合同 ➔ 换发欧盟蓝卡 (EU Blue Card)</li>
                          <li>
                            蓝卡持有者足额缴纳 21 个月法定养老保险 + 德语达 B1 水平（或缴满 27 个月 + 德语 A1）➔ 直接换取德国永居许可证 (Niederlassungserlaubnis)！新国籍法下居住满 5 年更可申请入籍。
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Q5: 我现在要准备什么？怎么零中介 DIY？可勾选推进清单                       */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`border rounded-2xl transition-all overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveFaqIndex(activeFaqIndex === 4 ? null : 4)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center shrink-0">
                Q5
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold font-narrative-serif">
                  我现在（今天）要准备什么？怎么零中介手搓 DIY？可交互 Checklist
                </h3>
                <p className="text-xs text-stone-400 font-reading-sans">
                  分阶段时序推进表，直接勾选进度并保存至当前浏览器
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                activeFaqIndex === 4 ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeFaqIndex === 4 && (
            <div className="p-4 sm:p-6 pt-0 border-t border-amber-500/10 space-y-5 text-xs sm:text-sm font-reading-sans">
              <div className="pt-4 flex items-center justify-between">
                <span className="font-bold text-stone-300">
                  【{country.name} · 手搓推进总进度】：
                  <span className="text-amber-400 font-mono-num ml-1">
                    {diyRoadmap.stages.reduce(
                      (acc, s) => acc + s.tasks.filter((t) => completedTasks[t.id]).length,
                      0
                    )}{' '}
                    / {diyRoadmap.stages.reduce((acc, s) => acc + s.tasks.length, 0)} 项已完成
                  </span>
                </span>
                <span className="text-xs text-stone-500 font-mono-num">
                  预计全程总耗时：{diyRoadmap.overallTimeEst}
                </span>
              </div>

              {/* 各阶段任务树 */}
              <div className="space-y-4">
                {diyRoadmap.stages.map((stage, sIdx) => (
                  <div
                    key={stage.id}
                    className={`p-4 rounded-xl border space-y-3 ${
                      isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#151722] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-2 border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono-num font-bold text-xs flex items-center justify-center">
                          {sIdx + 1}
                        </span>
                        <span className="font-bold font-narrative-serif text-stone-200 text-sm">
                          {stage.stageName}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">{stage.stageSubtitle}</span>
                    </div>

                    <div className="space-y-2">
                      {stage.tasks.map((task) => {
                        const isDone = !!completedTasks[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-stone-300'
                                : isLight
                                ? 'bg-white border-stone-200 hover:border-amber-400/50'
                                : 'bg-black/30 border-white/[0.04] hover:border-white/[0.15]'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-400 text-stone-950 font-bold'
                                  : 'border-stone-500 bg-transparent'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span
                                  className={`font-bold text-xs sm:text-sm font-reading-sans ${
                                    isDone
                                      ? 'line-through text-stone-400'
                                      : isLight
                                      ? 'text-stone-900'
                                      : 'text-stone-100'
                                  }`}
                                >
                                  {task.title}
                                </span>
                                <div className="flex items-center gap-1.5 text-[10px] font-mono-num text-stone-400 shrink-0">
                                  <span>周期: {task.duration}</span>
                                  <span>|</span>
                                  <span className="text-amber-400">成本: {task.costEst}</span>
                                </div>
                              </div>
                              <p className="text-xs text-stone-400 leading-relaxed">
                                {task.description}
                              </p>
                              {task.warningTip && (
                                <p className="text-[11px] text-rose-400 font-medium">
                                  ⚠️ 避坑提醒: {task.warningTip}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. OFFICIAL AUTHORITATIVE GOVERNMENT PORTALS (官方链接权威专区)     */}
      {/* =================================================================== */}
      <div
        className={`p-5 sm:p-7 rounded-3xl border space-y-4 ${
          isLight ? 'bg-white border-stone-200' : 'bg-[#10121B] border-white/[0.1]'
        }`}
      >
        <div className="flex items-center gap-2 border-b pb-3 border-amber-500/20">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base sm:text-lg font-extrabold font-narrative-serif">
              官方权威直达专栏 · 【{country.name}】移民局与法条官方信源
            </h3>
            <p className="text-xs text-stone-400 font-reading-sans">
              全站坚决剔除任何第三方中介广告与营销推广，所有规程请以以下主权国家官方发布为准
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(OFFICIAL_PORTALS[selectedCountryId] || []).map((portal, pIdx) => (
            <a
              key={pIdx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between group hover:-translate-y-0.5 ${
                isLight
                  ? 'bg-stone-50 hover:bg-white border-stone-200 hover:border-amber-400 text-stone-800 shadow-2xs'
                  : 'bg-[#151722] hover:bg-[#1A1D2B] border-white/[0.08] hover:border-amber-400/50 text-stone-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-500 font-mono-num font-semibold">
                    {portal.authority}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="font-bold text-xs sm:text-sm font-narrative-serif group-hover:text-amber-400 transition-colors">
                  {portal.title}
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">{portal.desc}</p>
              </div>
              <div className="mt-2 text-[10px] font-mono-num text-stone-400 truncate opacity-60">
                {portal.url}
              </div>
            </a>
          ))}
        </div>

        {/* 国内涉外海牙认证权威入口 */}
        <div
          className={`p-3.5 rounded-xl border space-y-2 mt-2 ${
            isLight ? 'bg-amber-50/50 border-amber-200' : 'bg-black/30 border-white/[0.06]'
          }`}
        >
          <span className="text-xs font-bold text-amber-400 font-narrative-serif block">
            【国内材料准备权威官方通道】
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {CHINESE_OFFICIAL_RESOURCES.map((res, rIdx) => (
              <a
                key={rIdx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                <div>
                  <div className="font-bold text-stone-200 flex items-center gap-1">
                    <span>{res.title}</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{res.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
