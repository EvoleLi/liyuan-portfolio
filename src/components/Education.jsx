import { motion } from 'framer-motion';

export default function Education({ data }) {
  if (!data.education || data.education.length === 0) return null;

  return (
    <section id="education" className="py-12 px-6 bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow text-center mb-3">EDUCATION</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading text-center mb-4">教育背景</h2>
          <div className="w-12 h-1 bg-gradient-brand mx-auto rounded-full mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-text-heading text-lg">{edu.school}</h3>
                <p className="text-primary font-medium text-sm mt-1">
                  {edu.degree} · {edu.major}
                </p>
                <span className="text-xs text-text-light mt-2 inline-block bg-bg-alt px-2 py-0.5 rounded">{edu.period}</span>
                {edu.courses && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-text-light font-medium mb-2">主修课程</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.split(/[,，、]/).map((course, j) => (
                        <span
                          key={j}
                          className="text-xs text-text bg-bg-alt px-2 py-1 rounded-md"
                        >
                          {course.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
