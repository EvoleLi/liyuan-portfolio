import { motion } from 'framer-motion';

export default function Stats({ data }) {
  const stats = [
    { value: data.projects?.length ?? 0, label: '精选项目' },
    { value: data.skills?.length ?? 0, label: '技能栈' },
    { value: data.certificates?.length ?? 0, label: '竞赛奖项' },
    { value: 'Top 1%', label: '专业排名' },
  ];

  return (
    <section className="py-16 px-6 bg-bg-alt border-y border-border">
      <div className="max-w-5xl mx-auto">
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
                {s.value}
              </div>
              <div className="text-sm text-text-light mt-3">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
