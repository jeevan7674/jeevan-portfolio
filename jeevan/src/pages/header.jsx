import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -45% 0px', threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) sectionObserver.observe(section);
    });

    return () => sectionObserver.disconnect();
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // 🔐 Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ⌨️ Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10'
          : 'bg-slate-950/90 backdrop-blur-md border-b border-purple-500/20'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Jeevan Reddy
            </motion.div>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                aria-label={`Go to ${item.name}`}
                onClick={() => scrollToSection(item.href)}
                className={`relative group font-medium text-sm tracking-wide transition-all duration-300 text-gray-300 hover:text-purple-300 focus:outline-none ${
                  activeSection === item.href ? 'text-purple-400' : ''
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 transform transition-transform duration-300 ${
                    activeSection === item.href
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100 origin-left'
                  }`}
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              aria-label="Contact section"
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-5 py-2 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-purple-400/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 p-2 rounded-full transition-all duration-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="lg:hidden mt-4 pb-4 border-t border-purple-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            >
              <div className="flex flex-col space-y-3 pt-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    aria-label={`Go to ${item.name}`}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left text-gray-300 hover:text-purple-300 py-2 px-3 relative group font-medium text-sm ${
                      activeSection === item.href ? 'text-purple-400' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 transform transition-transform duration-300 ${
                        activeSection === item.href
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100 origin-left'
                      }`}
                    />
                  </motion.button>
                ))}
                <motion.button
                  aria-label="Contact section"
                  onClick={() => scrollToSection('#contact')}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 mt-2 rounded-lg text-sm transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
