# EscapePlan

一个开源的海外移居参考与签证算分工具（纯前端实现，所有数据保存在浏览器本地）。

在线页面：[https://b1n9bna.github.io/EscapePlan/](https://b1n9bna.github.io/EscapePlan/)

---

## 项目背景

在了解海外移居或数字游民相关信息时，网上的资料往往比较零散，且常常夹杂各类商业推广。

EscapePlan 将部分常见国家的官方签证规则、打分标准、税后生活成本以及基础办理流程整理到了一个交互式的前端页面中，供有需要的朋友自查参考。

---

## 主要功能

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

## 隐私与数据说明

- **纯本地运算**：所有打分记录与选项数据仅存储在当前浏览器的 `LocalStorage` 中。
- **无数据回传**：本项目为纯静态站点，不设置后台服务器，亦不收集任何用户隐私数据。

---

## 本地开发与运行

项目基于 React + TypeScript + Vite + Tailwind CSS 构建：

```bash
# 1. 克隆代码
git clone https://github.com/b1n9bna/EscapePlan.git
cd EscapePlan

# 2. 安装依赖
pnpm install

# 3. 本地运行
pnpm run dev

# 4. 生产打包
pnpm run build
```

---

## 参与贡献

各国签证政策与税收标准会随时间调整。相关数据均存放在 `src/data/` 目录下的声明式文件中：
- 签证规则与国家信息：`src/data/countries.ts`
- 城市成本与税费模型：`src/data/realityCheck.ts`
- 办理流程与备忘：`src/data/diyGuide.ts`
- 问卷与情境事件：`src/data/quiz.ts` / `src/data/simulation.ts`

如发现政策变更或内容疏漏，欢迎提交 PR 或 Issue 指正。

---

## 许可证

本项目采用 [MIT License](LICENSE) 授权。
