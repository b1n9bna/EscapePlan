import React, { useState, useEffect } from 'react';
import { DIY_ROADMAPS } from '../data/diyGuide';
import type { CountryRoadmap } from '../data/diyGuide';
import { ExternalLink, AlertTriangle, Download } from 'lucide-react';

interface DIYGuideSectionProps {
  initialCountryId?: string;
}

export const DIYGuideSection: React.FC<DIYGuideSectionProps> = ({
  initialCountryId = 'japan'
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const roadmap: CountryRoadmap =
    DIY_ROADMAPS[selectedCountryId] || DIY_ROADMAPS['japan'];

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('escapeplan_diy_tasks');
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const updated = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    setCompletedTasks(updated);
    try {
      localStorage.setItem('escapeplan_diy_tasks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Calculate completion stats
  const allTasks = roadmap.stages.flatMap((s) => s.tasks);
  const completedCount = allTasks.filter((t) => completedTasks[t.id]).length;
  const progressPercent = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  const handleExportMarkdown = () => {
    let md = `# EscapePlan 我的手搓移居备忘录 - ${roadmap.countryName}\n\n`;
    md += `> 全流程预估周期：${roadmap.overallTimeEst}\n`;
    md += `> 当前完成进度：${completedCount}/${allTasks.length} (${progressPercent}%)\n\n`;

    roadmap.stages.forEach((stage) => {
      md += `## ${stage.stageName}\n*${stage.stageSubtitle}*\n\n`;
      stage.tasks.forEach((task) => {
        const isDone = completedTasks[task.id] ? '[x]' : '[ ]';
        md += `- ${isDone} **${task.title}** (耗时: ${task.duration} | 规费: ${task.costEst})\n`;
        md += `  - 说明：${task.description}\n`;
        if (task.warningTip) {
          md += `  - ⚠️ 避坑提醒：${task.warningTip}\n`;
        }
      });
      md += '\n';
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EscapePlan_Roadmap_${roadmap.countryId}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          🛠️ 手搓 DIY 路线图：一步步办完全流程
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          让中介几十万服务费打水漂。国内学历公证、海牙认证 Apostille、官方网申递签、抵日/抵德落地黄金两周的完整执行清单。
        </p>
      </div>

      {/* Country Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {Object.values(DIY_ROADMAPS).map((rm) => {
          const isSelected = rm.countryId === selectedCountryId;
          return (
            <button
              key={rm.countryId}
              onClick={() => setSelectedCountryId(rm.countryId)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-xl">{rm.flag}</span>
              <span>{rm.countryName}</span>
            </button>
          );
        })}
      </div>

      {/* Progress & Export Header */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>全周期耗时预估：</span>
            <span className="text-blue-400 font-semibold">{roadmap.overallTimeEst}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-300 font-medium">
              办签进度：{completedCount} / {allTasks.length} 项已完成
            </span>
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>

        <button
          onClick={handleExportMarkdown}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>导出 Markdown 备忘录</span>
        </button>
      </div>

      {/* Stages List */}
      <div className="space-y-8">
        {roadmap.stages.map((stage, sIdx) => (
          <div key={stage.id} className="relative">
            {/* Stage Title */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {sIdx + 1}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {stage.stageName}
                </h3>
                <p className="text-xs text-slate-400">{stage.stageSubtitle}</p>
              </div>
            </div>

            {/* Tasks Cards */}
            <div className="space-y-3 sm:ml-10">
              {stage.tasks.map((task) => {
                const isChecked = !!completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-75'
                        : 'bg-[#121824] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 mt-0.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer flex-shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <h4
                            className={`text-sm sm:text-base font-semibold ${
                              isChecked ? 'line-through text-slate-500' : 'text-slate-100'
                            }`}
                          >
                            {task.title}
                          </h4>

                          <div className="flex items-center space-x-2">
                            {task.isCrucial ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                                核心关键项
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                加分项/常规
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
                          <span>耗时：{task.duration}</span>
                          <span>•</span>
                          <span>规费成本：{task.costEst}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                          {task.description}
                        </p>

                        {/* Official Links */}
                        {task.officialLinks && task.officialLinks.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {task.officialLinks.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Warning Callout */}
                        {task.warningTip && (
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 flex items-start space-x-2 text-xs text-amber-300/90 leading-relaxed">
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-300">避坑提醒：</strong>
                              {task.warningTip}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
