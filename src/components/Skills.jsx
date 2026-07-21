import { motion } from 'framer-motion';

export default function Skills({ data }) {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow text-center mb-3">SKILLS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading text-center mb-4">专业技能</h2>
          <div className="w-12 h-1 bg-gradient-brand mx-auto rounded-full mb-12 divider-animate" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-5"
              >
                <h3 className="font-semibold text-text-heading mb-3 text-sm uppercase tracking-wide text-primary font-mono">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-bg-alt text-text text-sm px-3 py-1.5 rounded-lg border border-border font-mono text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certificates */}
          {data.certificates && data.certificates.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-text-heading text-center mb-6">证书 & 认证</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {data.certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="bg-bg-alt border border-border rounded-lg px-5 py-3 text-center"
                  >
                    <p className="font-medium text-text-heading text-sm">{cert.name}</p>
                    <p className="text-xs text-text-light mt-0.5">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
