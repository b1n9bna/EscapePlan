export function Footer() {
  return (
    <footer className="mt-10 border-t border-stone-200 dark:border-slate-800 py-6 text-xs text-stone-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-3">
        <p>信息仅供参考，不构成法律或移民建议。申请要求以官方最新规定为准。</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>数据保存在当前浏览器</span>
          <a href="https://github.com/b1n9bna/EscapePlan" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-stone-900 dark:hover:text-slate-100">GitHub</a>
          <a href="https://github.com/b1n9bna/EscapePlan/blob/main/LICENSE" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-stone-900 dark:hover:text-slate-100">MIT License</a>
        </div>
      </div>
    </footer>
  );
}
