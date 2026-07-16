import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiBookOpen, FiBriefcase, FiDollarSign, FiClock, FiMapPin } from 'react-icons/fi';

const iconMap = {
  code: FiCode,
  users: FiUsers,
  target: FiTarget,
  book: FiBookOpen,
};

export default function About({ data }) {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow text-center mb-3">ABOUT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading text-center mb-4">关于我</h2>
          <div className="w-12 h-1 bg-gradient-brand mx-auto rounded-full mb-8" />

          <p className="text-lg text-text text-center max-w-2xl mx-auto leading-relaxed">
            {data.about}
          </p>

          {/* Highlights — 四列特性卡 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {data.highlights.map((item, i) => {
              const Icon = iconMap[item.icon] || FiCode;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-semibold text-text-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-text-light">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Job Intentions */}
          {data.jobIntentions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 bg-bg-alt rounded-2xl p-6 border border-border max-w-2xl mx-auto"
            >
              <h3 className="font-semibold text-text-heading mb-4 flex items-center justify-center gap-2">
                <FiBriefcase className="text-primary" size={18} />
                求职意向
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {data.jobIntentions.targetPosition && (
                  <div className="flex items-center gap-2 text-text">
                    <FiBriefcase size={14} className="text-primary flex-shrink-0" />
                    <span>{data.jobIntentions.targetPosition}</span>
                  </div>
                )}
                {data.jobIntentions.salaryRange && (
                  <div className="flex items-center gap-2 text-text">
                    <FiDollarSign size={14} className="text-primary flex-shrink-0" />
                    <span>{data.jobIntentions.salaryRange}</span>
                  </div>
                )}
                {data.jobIntentions.availability && (
                  <div className="flex items-center gap-2 text-text">
                    <FiClock size={14} className="text-primary flex-shrink-0" />
                    <span>{data.jobIntentions.availability}</span>
                  </div>
                )}
                {data.jobIntentions.city && (
                  <div className="flex items-center gap-2 text-text">
                    <FiMapPin size={14} className="text-primary flex-shrink-0" />
                    <span>{data.jobIntentions.city}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
