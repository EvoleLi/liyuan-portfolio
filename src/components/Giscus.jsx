import { useEffect, useRef } from 'react';

/* Giscus 公开问答墙：基于 GitHub Discussions，访客公开提问、站长公开回复、所有人可见
   注意：站长需先在 https://giscus.app 把 Giscus 应用安装到本仓库 */
export default function Giscus() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.querySelector('script.giscus')) return; // 避免重复注入

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
  }, []);

  return <div ref={ref} className="giscus mt-8" />;
}
