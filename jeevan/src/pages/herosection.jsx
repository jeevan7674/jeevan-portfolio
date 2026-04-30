import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { ArrowRight, Code2, Cpu, Terminal } from 'lucide-react';
import GradientText from '@/components/GradientText/GradientText';

const buildLog = [
  { key: 'role', value: 'Full-stack developer' },
  { key: 'stack', value: 'React / Next.js / MERN' },
  { key: 'focus', value: 'Clean UI + reliable systems' },
];

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-24 text-white sm:pt-28">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <StarsBackground className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,0.14),transparent_32%),linear-gradient(to_bottom,rgba(2,6,23,0.08),#020617_88%)]" />
        <div className="absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-cyan-300/10" />
        <div className="absolute left-1/2 top-36 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full border border-violet-300/10" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="text-center lg:text-left">
          <div className="theme-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <Cpu className="h-4 w-4" />
            Available for internships and product teams
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-300 sm:text-sm">
            Jeevan Reddy / Developer Portfolio
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            I build
            <GradientText
              colors={['#22d3ee', '#38bdf8', '#a78bfa', '#22d3ee']}
              animationSpeed={14}
              showBorder={false}
              className="block"
            >
              product-grade web experiences.
            </GradientText>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg lg:mx-0">
            Full-stack developer focused on React, Next.js, MERN apps, clean interfaces, and backend flows that feel dependable when real users touch them.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#projects" className="theme-primary-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="theme-secondary-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-5 text-xl text-slate-300 lg:justify-start">
            <a href="https://github.com/jeevan7674" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/jeevan-reddy680" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="mailto:r.jeevanreddys680@gmail.com" className="transition hover:text-cyan-300" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-6 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="theme-panel relative overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
                <span className="h-3 w-3 rounded-full bg-cyan-300" />
                <span className="h-3 w-3 rounded-full bg-violet-300" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <Terminal className="h-4 w-4 text-cyan-300" />
                build-profile.ts
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <Code2 className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-cyan-300">currently compiling</p>
                  <p className="text-xl font-bold text-white">Fast, usable products</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                {buildLog.map((item) => (
                  <div key={item.key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-400/10 bg-slate-950/55 px-4 py-3">
                    <span className="text-slate-500">const {item.key}</span>
                    <span className="text-cyan-200">"{item.value}"</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-violet-400/20 bg-violet-400/10 p-4 text-left">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-200">build philosophy</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Ship interfaces that look sharp, explain themselves quickly, and stay maintainable after the first version.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[150px] w-[150vw] -translate-x-1/2 rounded-t-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-sky-500 to-violet-500 opacity-30 blur-3xl sm:h-[180px] md:h-[200px]" />
    </section>
  );
};

export default Hero;
