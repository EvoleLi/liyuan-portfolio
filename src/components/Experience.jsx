import { motion } from 'framer-motion';

export default function Experience({ data }) {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-heading text-center mb-4">工作经历</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-12" />

          {/* Timeline */}
          <div className="relative border-l-2 border-border ml-4 md:ml-0 md:border-l-0">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative pl-10 pb-12 last:pb-0 md:pl-0 md:pb-10"
              >
                {/* Dot */}
                <div className="absolute left-[-9px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-white md:hidden" />

                {/* Card */}
                <div className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-text-heading">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-text-light whitespace-nowrap">{exp.period}</span>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-text-light mb-3">{exp.location}</p>
                  )}
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-text text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
