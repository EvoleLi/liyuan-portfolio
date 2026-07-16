import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value); // 确保收尾到准确终值
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats({ data }) {
  const stats = [
    { value: data.projects?.length ?? 0, label: '精选项目', num: true },
    { value: data.skills?.length ?? 0, label: '技能栈', num: true },
    { value: data.certificates?.length ?? 0, label: '竞赛奖项', num: true },
    { value: 'Top 1%', label: '专业排名', num: false },
  ];

  return (
    <section className="py-16 px-6 bg-bg-alt border-y border-border relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient leading-none">
                {s.num ? <CountUp value={Number(s.value)} /> : s.value}
              </div>
              <div className="text-sm text-text-light mt-3">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
