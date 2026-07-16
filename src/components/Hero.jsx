import { FiGithub, FiMail, FiDownload, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
  const metrics = [
    { value: data.projects?.length ?? 0, label: '精选项目' },
    { value: data.skills?.length ?? 0, label: '技能栈' },
    { value: data.certificates?.length ?? 0, label: '竞赛奖项' },
    { value: 'Top 1%', label: '专业排名' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-3xl w-full"
      >
        {/* 求职状态徽章 */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary-light text-primary px-4 py-1.5 text-sm font-medium mb-7"
        >
          <span className="w-2 h-2 rounded-full bg-accent" />
          {data.jobIntentions?.availability ?? '求职中'} · {data.jobIntentions?.targetPosition ?? data.title}
        </motion.span>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-text-heading">
          {data.name}
        </h1>

        <p className="mt-4 text-2xl md:text-3xl font-bold text-gradient">{data.title}</p>

        <p className="text-text-light mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {data.tagline}
        </p>

        {/* 个人信息标签 */}
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          {data.age && (
            <span className="text-sm text-text-light bg-bg-alt px-3 py-1 rounded-full border border-border font-mono">
              {data.age} 岁
            </span>
          )}
          {data.location && (
            <span className="text-sm text-text-light bg-bg-alt px-3 py-1 rounded-full border border-border font-mono">
              {data.location}
            </span>
          )}
          {data.jobIntentions?.salaryRange && (
            <span className="text-sm text-primary bg-primary-light px-3 py-1 rounded-full font-medium">
              期望 {data.jobIntentions.salaryRange}
            </span>
          )}
        </div>

        {/* 双 CTA */}
        <div className="flex flex-wrap gap-4 justify-center mt-9">
          <a
            href={data.resumeFile}
            download
            className="inline-flex items-center gap-2 bg-gradient-brand text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <FiDownload size={18} />
            下载简历
          </a>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 border border-border text-text px-7 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <FiMail size={18} />
            联系我
          </button>
        </div>

        {/* 社交链接 */}
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

        {/* 数据指标带 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="bg-bg-alt border border-border rounded-2xl py-5 px-3"
            >
              <div className="text-3xl font-extrabold text-gradient leading-none">{m.value}</div>
              <div className="text-xs text-text-light mt-2">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
