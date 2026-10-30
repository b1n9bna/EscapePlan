import React from 'react';
import { ShieldCheck, GitPullRequest } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#070A0F] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base mb-2">
              <span>🧭</span>
              <span>EscapePlan 逃跑计划</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              面向技术人的开源全球移居自测、通道匹配与手搓 DIY 路线图。纯静态构建，零中介、纯本地运算保护隐私、永久开源。
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>所有数据保存在浏览器本地，绝不上云</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">开源共建飞轮</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              各国移民政策朝令夕改。如果你发现某国打分表有新变动、或发现了前人新踩的坑，欢迎直接在 GitHub 提交 Pull Request 纠偏！
            </p>
            <a
              href="https://github.com/b1n9bna/EscapePlan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-medium"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>在 GitHub 上参与维护或提 PR ➜</span>
            </a>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">免责声明与初衷</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              本项目所有政策条文、打分项与费用测算均整理自公开官方资料与各大移民局公报，仅供个人前期评估与技术研究参考，不构成任何法律或移民建议。涉及递签请以各国官方最新法案为准。
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 EscapePlan Project. Released under the MIT License.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/b1n9bna/EscapePlan"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 hover:text-slate-300 transition"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
