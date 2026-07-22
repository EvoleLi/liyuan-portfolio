const navItems = [
  { id: 'about', label: '关于' },
  { id: 'experience', label: '经历' },
  { id: 'education', label: '教育' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
];

export default function Footer({ data }) {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-bg-alt border-t border-border pt-14 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 品牌 */}
        <div>
          <h3 className="text-lg font-extrabold text-text-heading tracking-tight">
            李园
          </h3>
          <p className="text-sm text-text-light mt-3 max-w-xs leading-relaxed">
            嵌入式软件工程师，专注 STM32 / FreeRTOS 智能硬件开发，兼具 Android 原生开发经验。
          </p>
        </div>

        {/* 导航 */}
        <div>
          <h4 className="text-sm font-semibold text-text-heading mb-4">导航</h4>
          <ul className="space-y-2.5 text-sm text-text-light">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 联系 */}
        <div>
          <h4 className="text-sm font-semibold text-text-heading mb-4">联系方式</h4>
          <ul className="space-y-2.5 text-sm text-text-light">
            {data?.location && <li>地点：{data.location}</li>}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border text-center text-sm text-text-light">
        &copy; {year} 李园 · 嵌入式软件工程师 · 用代码连接软硬件世界
      </div>
    </footer>
  );
}
