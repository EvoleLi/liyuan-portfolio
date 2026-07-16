import { motion } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';

export default function Hero({ data }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-3xl w-full"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text-heading">
          {data.name}
        </h1>

        <p className="mt-5 text-xl md:text-2xl font-semibold text-gradient">{data.title}</p>

        <p className="text-text-light mt-5 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {data.tagline}
        </p>

        {/* 双 CTA（胶囊） */}
        <div className="flex flex-wrap gap-4 justify-center mt-9">
          <a
            href={data.resumeFile}
            download
            className="inline-flex items-center gap-2 bg-gradient-brand text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <FiDownload size={18} />
            下载简历
          </a>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 border border-border text-text px-7 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <FiMail size={18} />
            联系我
          </button>
        </div>
      </motion.div>
    </section>
  );
}
