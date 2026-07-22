import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navItems = [
  { id: 'about', label: '关于' },
  { id: 'experience', label: '经历' },
  { id: 'education', label: '教育' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动联动高亮当前区块
  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-lg shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-extrabold text-text-heading tracking-tight"
        >
          李园
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative text-sm transition-colors ${
                active === item.id ? 'text-primary' : 'text-text-light hover:text-primary'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1.5 left-0 right-0 mx-auto h-0.5 rounded-full bg-gradient-brand transition-all duration-300 ${
                  active === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="magnetic-btn inline-flex items-center gap-1.5 bg-gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <FiDownload size={14} />
            下载简历
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-heading p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-border px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-text-light hover:text-primary transition-colors text-left"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="magnetic-btn inline-flex items-center justify-center gap-1.5 bg-gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
          >
            <FiDownload size={14} />
            下载简历
          </button>
        </div>
      )}
    </nav>
  );
}
