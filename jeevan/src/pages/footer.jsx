import { motion } from 'framer-motion';
import { ArrowUpRight, GithubIcon, LinkedinIcon, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-cyan-400/15 bg-[#020617] pt-14 pb-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-[-8rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 gap-10 text-center md:grid-cols-[1.2fr_0.8fr_0.8fr] md:text-left">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">portfolio.footer.ts</p>
            <h3 className="mb-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-3xl font-extrabold text-transparent">
              Jeevan Reddy
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Full-stack developer building clean, usable products with React, Next.js, and MERN. Focused on interfaces that read clearly and systems that hold up in real use.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/50" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Reach Me</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a href="mailto:r.jeevanreddys680@gmail.com" className="inline-flex items-center gap-2 transition hover:text-cyan-300">
                <Mail className="h-4 w-4 text-cyan-300" />
                r.jeevanreddys680@gmail.com
              </a>
              <a
                href="https://github.com/jeevan7674"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-cyan-300"
              >
                GitHub / jeevan7674
              </a>
              <a
                href="https://linkedin.com/in/jeevan-reddy680"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-cyan-300"
              >
                LinkedIn / jeevan-reddy680
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-6 border-t border-cyan-400/15 pt-6 md:flex-row">
          <p className="text-center text-sm text-slate-400 md:text-left">
            Copyright {currentYear} Jeevan Reddy. Built with React, Tailwind, and care.
          </p>
          <div className="flex gap-3 text-white">
            <a
              href="https://github.com/jeevan7674"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/15 bg-slate-950/55 transition hover:border-cyan-300/40 hover:text-cyan-300"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/jeevan-reddy680"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/15 bg-slate-950/55 transition hover:border-cyan-300/40 hover:text-cyan-300"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:r.jeevanreddys680@gmail.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/15 bg-slate-950/55 transition hover:border-cyan-300/40 hover:text-cyan-300"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
