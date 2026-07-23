import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSend, FiMessageCircle, FiInbox } from 'react-icons/fi';

const STORAGE_KEY = 'liyuan_visitor_questions';

export default function QnA({ data }) {
  // 预设问答（来自 profile.json）
  const faqs = data.faqs || [];

  // 访客提问（保存在本浏览器 localStorage）
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState('');
  const [openId, setOpenId] = useState(null);
  const firstRender = useRef(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setQuestions(saved);
    } catch {
      /* 忽略损坏的本地数据 */
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const submit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const item = {
      id: `v-${Date.now()}`,
      q: text,
      a: '已收到你的问题，我会通过邮箱尽快回复你 💬',
      visitor: true,
    };
    setQuestions((prev) => [item, ...prev]);
    setInput('');
    setOpenId(item.id);
  };

  // 合并：预设问答在前，访客提问在后
  const all = [
    ...faqs.map((f, i) => ({ ...f, id: `f-${i}` })),
    ...questions,
  ];

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

          {/* 下拉列表：预设问答 + 访客提问 */}
          <div className="space-y-3">
            {all.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="card overflow-hidden border-border"
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-light/40"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      {item.visitor ? (
                        <FiMessageCircle size={16} className="text-primary shrink-0" />
                      ) : (
                        <FiInbox size={16} className="text-primary shrink-0" />
                      )}
                      <span className="font-medium text-text-heading truncate">
                        {item.q}
                      </span>
                    </span>
                    {item.visitor && (
                      <span className="shrink-0 text-[11px] font-medium text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        待回复
                      </span>
                    )}
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

          {/* 留下你的问题 */}
          <div className="mt-10 card p-6">
            <h3 className="font-semibold text-text-heading mb-1 flex items-center gap-2">
              <FiSend size={16} className="text-primary" />
              留下你的问题
            </h3>
            <p className="text-xs text-text-light mb-4">
              填写后问题会显示在上方的下拉列表中，并保存在你当前的浏览器中（仅本机可见）。
            </p>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={120}
                placeholder="例如：你平时用什么调试工具？"
                className="flex-1 px-4 py-3 rounded-full border border-border bg-bg text-text outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="magnetic-btn inline-flex items-center justify-center gap-2 bg-gradient-brand text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shrink-0"
              >
                <FiSend size={16} />
                提交提问
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
