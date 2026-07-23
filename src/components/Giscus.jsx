import { useEffect, useRef, useState } from 'react';

/* Giscus 公开问答墙：基于 GitHub Discussions，访客公开提问、站长公开回复、所有人可见
   前置条件：站长需在 https://github.com/apps/giscus 安装 Giscus App 到本仓库 */
export default function Giscus() {
  const ref = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ref.current?.querySelector('script.giscus')) return;

    // 监听 Giscus 报错（未安装 App 时触发）
    const handler = (e) => {
      if (
        e.data &&
        typeof e.data === 'object' &&
        e.data.giscus?.error === 'not_installed'
      ) {
        setError(true);
      }
    };
    window.addEventListener('message', handler);

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.className = 'giscus';
    s.setAttribute('data-repo', 'EvoleLi/liyuan-portfolio');
    s.setAttribute('data-repo-id', 'R_kgDOTgClkA');
    s.setAttribute('data-category', 'Q&A');
    s.setAttribute('data-category-id', 'DIC_kwDOTgClkM4DBxqq');
    s.setAttribute('data-mapping', 'specific');
    s.setAttribute('data-term', '作品集公开问答墙');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'top');
    s.setAttribute('data-theme', '/giscus-champagne.css');
    s.setAttribute('data-lang', 'zh-CN');
    s.setAttribute('data-loading', 'lazy');
    ref.current?.appendChild(s);

    return () => window.removeEventListener('message', handler);
  }, []);

  /* 未安装 Giscus App 时显示友好引导 */
  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-border bg-bg p-6 text-center">
        <p className="text-text-heading font-medium mb-2">
          💬 公开提问墙正在准备中
        </p>
        <p className="text-sm text-text-light mb-4">
          站长正在配置提问功能，完成后即可在此处公开提问与回复。
        </p>
        <a
          href="https://github.com/apps/giscus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          了解 Giscus 配置 →
        </a>
      </div>
    );
  }

  return <div ref={ref} className="giscus mt-8" />;
}
