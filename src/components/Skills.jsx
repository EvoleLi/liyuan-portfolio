import { motion } from 'framer-motion';

export default function Skills({ data }) {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-heading text-center mb-4">专业技能</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
              >
                <h3 className="font-semibold text-text-heading mb-3 text-sm uppercase tracking-wide text-primary">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-bg-alt text-text text-sm px-3 py-1.5 rounded-lg border border-border"
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
