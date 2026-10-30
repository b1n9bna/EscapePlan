# EscapePlan

<p align="center">
  <a href="https://b1n9bna.github.io/EscapePlan/"><img src="https://img.shields.io/badge/Live_Demo-在线访问-indigo?style=flat-square&logo=githubpages&logoColor=white" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Server_Cost-¥0_(Pure_Static)-success?style=flat-square&logo=cloudflare" alt="Zero Server">
  <img src="https://img.shields.io/badge/Privacy-100%25_Local_First-emerald?style=flat-square&logo=shield" alt="Local First">
  <img src="https://img.shields.io/badge/Compute_Time-<10_ms-orange?style=flat-square&logo=lightning" alt="Compute Time">
  <img src="https://img.shields.io/badge/Tech-React_|_Vite_|_Tailwind-blue?style=flat-square&logo=react" alt="Tech">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License"></a>
</p>

一个开源的海外移居参考与签证算分工具（纯前端实现，所有数据保存在浏览器本地）。

在线访问地址：[https://b1n9bna.github.io/EscapePlan/](https://b1n9bna.github.io/EscapePlan/)

---

## 📖 项目背景

在了解海外移居或数字游民相关信息时，网上的资料往往比较零散，且常常夹杂各类商业推广。

EscapePlan 将部分常见国家的官方签证规则、打分标准、税后生活成本以及基础办理流程整理到了一个交互式的前端页面中，供有需要的朋友自查参考。

---

## ✨ 主要功能

1. **签证条件与算分自测**：
   - 整理并提供常见签证类别的官方条件与交互打分（如日本高度人才积分、德国机会卡 Chancenkarte、澳大利亚打工度假 WHV 462 与技术通道、西班牙非盈利/数字游民、泰国 DTV 等）。
2. **税后收入与生活成本推演**：
   - 估算部分主要城市在扣除当地个税、法定社保医保及基础租房成本后的实际结余情况。
3. **准备流程参考**：
   - 整理常见证明材料公证、海牙认证（Apostille）及落地初期（银行开户、税号等）的基础操作参考，支持勾选保存与导出 Markdown。
4. **情境模拟推演**：
   - 结合不同职业背景（如技术开发、设计、蓝领技工、护理、自由职业等），模拟多年度移居生活中的常见场景与抉择。
5. **适应度自测问卷**：
   - 从生活习惯、饮食依赖、语言交流及文化差异等维度，提供客观的心理适应评估。

---

## 🚀 本地开发与运行

项目基于 React + TypeScript + Vite + Tailwind CSS 构建：

```bash
# 1. 克隆代码
git clone https://github.com/b1n9bna/EscapePlan.git
cd EscapePlan

# 2. 安装依赖
pnpm install

# 3. 本地启动开发服务
pnpm run dev

# 4. 生产构建打包
pnpm run build
```

---

## 📊 架构与技术特点

- **纯静态交付**：生产构建产物均为静态资源，Gzip 压缩后体积仅数百 KB，支持部署于任何静态托管服务（如 GitHub Pages、Cloudflare Pages 等），服务器开销为 **¥0**。
- **本地毫秒级推演**：所有签证打分规则、税后结余与情境模拟逻辑均在浏览器本地线程完成，运算耗时 **< 10ms**，无需依赖后端 API 服务。
- **本地存储与隐私**：100% 采用本地优先（Local-First）机制，用户的测评选项与备忘清单仅保存在当前浏览器的 `LocalStorage` 中，无数据回传。

---

## 🤝 参与贡献

各国签证政策与税收标准会随时间调整。相关数据均存放在 `src/data/` 目录下的声明式文件中：
- 签证规则与国家信息：`src/data/countries.ts`
- 城市成本与税费模型：`src/data/realityCheck.ts`
- 办理流程与备忘：`src/data/diyGuide.ts`
- 问卷与情境事件：`src/data/quiz.ts` / `src/data/simulation.ts`

如发现政策变更或内容疏漏，欢迎提交 PR 或 Issue 指正。

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 授权。
