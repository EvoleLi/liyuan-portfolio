import { motion } from 'framer-motion';

export default function Education({ data }) {
  if (!data.education || data.education.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-heading text-center mb-4">教育背景</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-8" />

          <div className="flex justify-center">
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-6 w-full max-w-lg"
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
