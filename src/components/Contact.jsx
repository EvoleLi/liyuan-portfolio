import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

export default function Contact({ data }) {
  return (
    <section id="contact" className="py-20 px-6 bg-bg-alt">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-3">CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            一起做点有意思的东西？
          </h2>
          <p className="text-text-light mb-9 max-w-xl mx-auto">
            如果你正在寻找一名嵌入式软件工程师，或对我的项目感兴趣，欢迎随时联系我。
          </p>

          {/* 唯一联系方式：邮箱 */}
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 bg-gradient-brand text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <FiMail size={18} />
            {data.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
