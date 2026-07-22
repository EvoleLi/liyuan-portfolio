import heroBg from '../assets/hero-bg.svg?raw';

/* 将 SVG 动效背景内联进 DOM，确保 SMIL 动画在首帧即稳定播放
   （避免 background-image 场景下需刷新才触发的已知问题） */
export default function HeroBackground() {
  return (
    <div
      className="hero-bg-img"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: heroBg }}
    />
  );
}
