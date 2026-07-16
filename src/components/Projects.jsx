import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects({ data }) {
  if (!data.projects || data.projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-6 bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-primary mb-3 text-center">05 / PROJECTS</p>
          <h2 className="text-3xl font-bold text-text-heading text-center mb-4">项目精选</h2>
          <div className="w-12 h-1 bg-gradient-brand mx-auto rounded-full mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition flex flex-col"
              >
                <h3 className="font-semibold text-lg text-text-heading mb-2">{proj.name}</h3>
                <p className="text-text-light text-sm flex-1 mb-3">{proj.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-md font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {proj.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-text-light flex items-start gap-1.5">
                      <span className="text-primary">•</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="flex gap-3 mt-auto pt-2 border-t border-border">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <FiExternalLink size={14} /> 在线演示
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-light hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      <FiGithub size={14} /> 源代码
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
