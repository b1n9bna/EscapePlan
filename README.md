<p align="center">
  <h1 align="center">🧭 EscapePlan (逃跑计划)</h1>
  <p align="center">
    <strong>面向技术人的开源全球移居自测、通道匹配与手搓 DIY 路线图。</strong><br>
    打破中介信息差垄断 · 纯本地运算保护隐私 · 拒绝贩卖焦虑 · 永久开源
  </p>
  <p align="center">
    <a href="https://b1n9bna.github.io/EscapePlan/"><img src="https://img.shields.io/badge/Live_Demo-在线访问网站-blue?style=flat-square&logo=githubpages&logoColor=white" alt="Live Demo"></a>
    <img src="https://img.shields.io/badge/Server_Cost-¥0_(Pure_Static)-success?style=flat-square&logo=cloudflare" alt="Zero Server">
    <img src="https://img.shields.io/badge/Privacy-100%25_Local_First-emerald?style=flat-square&logo=shield" alt="Local First">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  </p>
</p>

---

## 💡 为什么需要 EscapePlan？

在技术人与程序员群体中，“**全球移居 / 海外工签 / 数字游民 (Digital Nomad) / 寻找生活平替**” 是一个持续高涨的话题。

然而，我们面对的信息环境却极度恶劣：
- **中介垄断与割韭菜**：网络上 90% 的移居攻略都是中介发布的营销软文，故意把官方免费通道包装成几十万的黑盒付费服务，填个手机号就会遭遇电话狂轰滥炸。
- **官方政策碎片且晦涩**：各国移民局（日本入管局、德国联邦移民局、加拿大 IRCC 等）全是上百页的晦涩法案与打分细则。
- **缺乏真实财务与生存感知**：只谈汇率年薪，不谈高昂所得税、国民医保与真实租房生活成本，导致许多人“盲目跟风、落地后悔”。

**EscapePlan 旨在通过开源协作的力量，将全球移居政策数字化、透明化、手搓化。**

---

## ✨ 核心功能架构

```
┌────────────────────────────────────────────────────────┐
│               🧭 EscapePlan 核心产品旅程               │
├───────────────────┬────────────────────────────────────┤
│ 1. 移居精神体检   │ 5道灵魂拷问测出老中体质与毒舌诊断  │
├───────────────────┼────────────────────────────────────┤
│ 2. 签证图谱与算分 │ 日本高度人才/德国机会卡等交互算分  │
├───────────────────┼────────────────────────────────────┤
│ 3. 现实税后推演   │ 扣除严苛税收/医保/房租算出月净存   │
├───────────────────┼────────────────────────────────────┤
│ 4. 手搓 DIY 路线  │ 学信网/海牙认证/网申/落地两周清单  │
└───────────────────┴────────────────────────────────────┘
```

### 1. 🧭 移居精神自测罗盘 (Escape Compass)
- 告别枯燥的官僚问卷，通过 5 道充满梗、直击灵魂的日常生活场景测试（老中胃依赖、好山好水好无聊抗性、行政办事磨叽忍耐力、内卷做题家基因、税收拔毛心疼指数）。
- 生成个性化**移居诊断报告单**，直言不讳地指出你到底是“纯度 100% 的原生老中（建议退订机票安心摸鱼）”，还是“精神东亚卷王”、“精神北欧人”或“赛博吉普赛游民”。

### 2. 📚 签证 Subclass 深度图谱与交互算分器
- **🇯🇵 日本**：高度人才专门职 1号 (70分/80分急速永住交互打分器) + 普通技人国工签 + 2024新版特定活动数字游民签。
- **🇩🇪 德国**：2024最新落地“机会卡 (Chancenkarte)” 6分制官方找工签算分器 + 欧盟蓝卡 IT 降门槛绿色通道。
- **🇹🇭 泰国**：2024全球爆款 DTV (Destination Thailand Visa) 5年多次数字游民签。
- **🇨🇦 加拿大**：BC PNP Tech 科技定向通道 + Express Entry 联邦技术移民。

### 3. 💰 现实推演沙盒 (Reality Check)
- 输入当地预估年薪，系统自动按当地严苛税率表扣除所得税、厚生日金/年金、国民健康医疗保险等。
- 扣减中位数单人租房与日常伙食，计算每月**实打实能留在手里的净存现金 (Net Savings)**。
- 计算**国内一线等价值对冲参考**（例如：*在东京年薪 800 万日元的生活宽裕度，约等于在上海/北京税后月净入 2.4 万元*）。

### 4. 🛠️ 手搓 DIY 路线图 (DIY Action OS)
- 每一个主流国家完整的阶段性里程碑清单（从国内学信网中英文报告、海牙认证 Apostille、官方网申入口，到抵日/抵德抵泰落地前两周办卡落户指南）。
- 附带开源社区贡献的**血泪避坑警示**。
- 支持完成状态本地记忆，并可一键**导出为 Markdown 备忘录**带入 Notion 或 Obsidian。

---

## 🛡️ 隐私与开源承诺

1. **100% Local-First**：所有测试选项、算分数据与勾选记录**完全保留在您的本地浏览器 LocalStorage 中**。
2. **零服务器追踪**：本项目不部署任何后台数据采集服务器，不收集任何个人隐私，绝无商业销售骚扰。
3. **零商业广告**：不接受任何移民中介商业赞助或付费导流。

---

## 🛠️ 本地开发与运行

本项目采用纯静态架构，基于 **React + TypeScript + Vite + Tailwind CSS** 构建：

```bash
# 1. 克隆代码仓库
git clone https://github.com/b1n9bna/EscapePlan.git
cd EscapePlan

# 2. 安装项目依赖
pnpm install

# 3. 启动本地开发服务 (支持极速热更新)
pnpm run dev

# 4. 构建纯静态导出包 (可部署至任何静态托管)
pnpm run build
```

---

## 🤝 社区共建与贡献指南 (PRs Welcome)

全球各国的移民与签证法案更新频繁。**单靠一个人的精力无法穷尽全球所有政策，但开源社区可以！**

所有的国家数据、算分规则与避坑要点均位于声明式数据文件中：
- 题库与诊断画像：`src/data/quiz.ts`
- 国家与签证政策细则：`src/data/countries.ts`
- 城市生活成本与税费模型：`src/data/realityCheck.ts`
- 手搓办理步骤与避坑：`src/data/diyGuide.ts`

如果你发现了新的政策变动、有想要补充的国家/Subclass、或者有亲身踩坑的经验教训，欢迎直接提交 Pull Request！

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 协议完全开源。
