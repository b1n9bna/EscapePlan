# EscapePlan

浏览器端的人生模拟和移居信息参考工具。

[在线使用](https://b1n9bna.github.io/EscapePlan/)

## 功能

- **人生模拟**：随机生成家庭背景，随年龄推进事件，通过选择影响后续经历。可以查看模拟记录和结局图鉴。
- **出海指北**：按国家查看签证条件、积分测算、生活成本估算、长期居留路径和准备清单。清单支持勾选保存和导出 Markdown。

目前收录日本、澳大利亚、新西兰、加拿大、美国、新加坡、泰国、西班牙和德国。

## 本地运行

环境要求：Node.js `^20.19.0 || >=22.12.0`、pnpm。

```bash
git clone https://github.com/b1n9bna/EscapePlan.git
cd EscapePlan
pnpm install
pnpm run dev
```

```bash
pnpm run lint     # 代码检查
pnpm run build    # 类型检查与生产构建，输出到 dist/
pnpm run preview  # 预览构建结果
```

使用 React、TypeScript、Vite 和 Tailwind CSS。推送到 `main` 后，GitHub Actions 会构建并部署到 GitHub Pages，也可以自行托管 `dist/`。

## 数据与限制

- 签证和费用资料为项目内置数据，不会自动跟随政策更新。申请前请通过页面中的官方链接核实。
- 收支测算使用参考成本和固定税费比例，不是精确的个税或生活预算计算。
- 人生模拟由预设事件和规则生成，不用于预测个人经历。
- 主题、字号、清单勾选和已解锁结局保存在当前浏览器的 `localStorage` 中。当前模拟进度不会自动保存，刷新或切换到出海指北后需要重新开始。
- 应用没有业务后端；页面会加载外部字体，官方资料链接会跳转到外部网站。

已知问题：随机家庭生成存在未处理的边界情况，可能触发 `wealth.tier` 渲染错误。项目仍需完善数据校验。

## 修改数据

| 文件 | 内容 |
| --- | --- |
| `src/data/simulation.ts` | 人生模拟规则 |
| `src/data/provincial_ecosystems.ts` | 地域和家庭背景 |
| `src/data/countries.ts` | 国家、签证条件与积分规则 |
| `src/data/realityCheck.ts` | 城市成本与收支测算参数 |
| `src/data/diyGuide.ts` | 准备流程与清单 |

数据修正请附来源链接和更新日期，便于核对。代码问题请提供复现步骤。

## 许可证

[MIT](LICENSE)
