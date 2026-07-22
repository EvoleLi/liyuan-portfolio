import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FiDownload, FiMail } from 'react-icons/fi';

/* 极简漂浮粒子 */
function Particles() {
  const positions = [
    { x: '15%', y: '20%', delay: 0 },
    { x: '78%', y: '35%', delay: 1.5 },
    { x: '35%', y: '68%', delay: 3 },
    { x: '65%', y: '75%', delay: 4.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {positions.map((p, i) => (
        <span key={i} className="particle" style={{ left: p.x, top: p.y, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

import HeroBackground from './HeroBackground';

export default function Hero({ data }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden bg-bg">
      {/* 自包含 SVG 动效背景：香槟光晕 + 细金点阵 + 电路信号流动 + 示波波（内联 DOM，首帧即播放） */}
      <HeroBackground />
      <Particles />
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-3xl w-full"
      >
        {/* 名字：香槟金流光 shimmer */}
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-shimmer">
          {data.name}
        </h1>

        <p className="mt-5 text-xl md:text-2xl font-semibold text-gradient">{data.title}</p>

        <p className="text-text-light mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {data.tagline}
        </p>

        {/* 双 CTA（磁性按钮） */}
        <div className="flex flex-wrap gap-4 justify-center mt-9">
          <a href={data.resumeFile} download className="magnetic-btn inline-flex items-center gap-2 bg-gradient-brand text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-sm">
            <FiDownload size={18} />下载简历
          </a>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn inline-flex items-center gap-2 border border-border text-text px-7 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors">
            <FiMail size={18} />联系我
          </button>
        </div>
      </motion.div>
    </section>
  );
}
