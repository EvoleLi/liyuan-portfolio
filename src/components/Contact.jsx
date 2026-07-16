import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { useState } from 'react';

export default function Contact({ data }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Since we don't have a backend, open mailto as fallback
    const form = e.target;
    const name = form.name.value;
    const subject = form.subject.value;
    const message = form.message.value;
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`来自 ${name}：\n\n${message}`)}`;
    setSubmitted(true);
    form.reset();
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-heading text-center mb-4">联系我</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-8" />

          <p className="text-center text-text-light mb-10">
            如果你对我的经历感兴趣，欢迎通过以下方式联系我
          </p>

          {/* Quick contact cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 bg-bg-alt border border-border rounded-lg px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              <FiMail size={18} />
              <span className="text-sm">{data.email}</span>
            </a>
            {data.location && (
              <div className="flex items-center gap-2 bg-bg-alt border border-border rounded-lg px-5 py-3">
                <FiMapPin size={18} />
                <span className="text-sm">{data.location}</span>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="你的名字"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="你的邮箱"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <input
              type="text"
              name="subject"
              required
              placeholder="主题"
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="你的留言..."
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center justify-center gap-2"
            >
              <FiSend size={16} />
              {submitted ? '已发送！' : '发送消息'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
