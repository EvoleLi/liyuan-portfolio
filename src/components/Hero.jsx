import { FiGithub, FiMail, FiDownload, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
      {/* 极淡点阵网格 */}
      <div className="hero-grid" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* 终端风 kicker */}
        <p className="font-mono text-sm text-accent mb-5">
          <span className="text-primary">~/</span>liyuan
          <span className="text-text-light"> — portfolio v2.0</span>
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-text-heading">
          {data.name}
        </h1>

        {/* 角色 + 闪烁光标 */}
        <p className="text-xl md:text-2xl text-primary font-semibold mt-3 font-mono">
          {data.title}
          <span className="blink">_</span>
        </p>

        <p className="text-text-light mt-3 text-lg">{data.tagline}</p>

        {/* Personal Info Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {data.age && (
            <span className="text-sm text-text-light bg-bg-alt px-3 py-1 rounded-full border border-border font-mono">
              {data.age}岁
            </span>
          )}
          {data.location && (
            <span className="text-sm text-text-light bg-bg-alt px-3 py-1 rounded-full border border-border font-mono">
              {data.location}
            </span>
          )}
          {data.jobIntentions?.availability && (
            <span className="text-sm text-accent-2 bg-accent-2-light px-3 py-1 rounded-full font-medium">
              {data.jobIntentions.availability}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <a
            href={data.resumeFile}
            download
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
          >
            <FiDownload size={18} />
            下载简历
          </a>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 border border-border text-text px-6 py-3 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <FiMail size={18} />
            联系我
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 mt-8">
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              title="GitHub"
            >
              <FiGithub size={22} />
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              title="LinkedIn"
            >
              <FiLinkedin size={22} />
            </a>
          )}
          {data.blog && (
            <a
              href={data.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              title="博客"
            >
              <FiBookOpen size={22} />
            </a>
          )}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="text-text-light hover:text-primary transition-colors"
              title="邮箱"
            >
              <FiMail size={22} />
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
