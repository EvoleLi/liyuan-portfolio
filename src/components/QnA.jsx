import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiInbox, FiMessageSquare } from 'react-icons/fi';
import Giscus from './Giscus';

export default function QnA({ data }) {
  const faqs = data.faqs || [];
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="qna" className="py-20 px-6 bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow text-center mb-3">Q &amp; A</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading text-center mb-4">
            常见问题 &amp; 提问
          </h2>
          <div className="w-12 h-1 bg-gradient-brand mx-auto rounded-full mb-10 divider-animate" />

          {/* 下拉列表：预设问答（数据驱动） */}
          <p className="text-sm text-text-light text-center mb-4">
            先看看下面的常见问题，也许已经有你想问的 👇
          </p>
          <div className="space-y-3">
            {faqs.map((item, i) => {
              const id = `f-${i}`;
              const isOpen = openId === id;
              return (
                <div key={id} className="card overflow-hidden border-border">
                  <button
                    onClick={() => toggle(id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-light/40"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <FiInbox size={16} className="text-primary shrink-0" />
                      <span className="font-medium text-text-heading truncate">
                        {item.q}
                      </span>
                    </span>
                    <FiChevronDown
                      size={18}
                      className={`shrink-0 text-text-light transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pt-1 text-text-light leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* 公开提问墙（Giscus） */}
          <div className="mt-12 text-center">
            <h3 className="font-semibold text-text-heading mb-1 flex items-center justify-center gap-2">
              <FiMessageSquare size={18} className="text-primary" />
              公开提问墙
            </h3>
            <p className="text-xs text-text-light mb-2">
              在这里提出的问题所有人可见，站长会公开回复。
            </p>
          </div>
          <Giscus />
        </motion.div>
      </div>
    </section>
  );
}
