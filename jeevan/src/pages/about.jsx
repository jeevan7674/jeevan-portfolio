import { motion, useInView } from 'framer-motion';
import { Code2, GraduationCap, MapPin, Rocket } from 'lucide-react';
import { useRef } from 'react';

const strengths = [
  {
    icon: Code2,
    title: 'Frontend systems',
    text: 'React, Next.js, Tailwind, reusable components, and responsive UI flows.',
  },
  {
    icon: Rocket,
    title: 'Product execution',
    text: 'Turning ideas into usable screens, connected APIs, and deployable full-stack apps.',
  },
  {
    icon: GraduationCap,
    title: 'Learning mindset',
    text: 'A Computer Science student focused on improving through real projects and iteration.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div data-section-anchor className="theme-pill mb-4 inline-flex rounded-full px-5 py-2 text-sm font-medium" variants={itemVariants}>
              My Journey
            </motion.div>
            <motion.h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl" variants={itemVariants}>
              From student builder to full-stack product developer.
            </motion.h2>
            <motion.div className="mt-4 h-1 w-24 rounded theme-section-line" variants={itemVariants} />

            <motion.p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg" variants={itemVariants}>
              I am R. Jeevan Reddy, a third-year software engineering student from Bhimavaram. I enjoy building products where interface quality, performance, and backend logic feel connected from the start.
            </motion.p>
            <motion.p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg" variants={itemVariants}>
              My strongest lane is frontend and full-stack development with React, Next.js, Node, Express, and MongoDB. I care about clear visual systems, fast feedback loops, and code that stays maintainable after the first release.
            </motion.p>

            <motion.div className="mt-7 flex flex-wrap gap-3 text-sm" variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-200">
                <MapPin className="h-4 w-4" />
                Bhimavaram, Andhra Pradesh
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 px-4 py-2 text-[#22c55e]">
                Available for work
              </span>
            </motion.div>

            <motion.div className="theme-panel mt-8 rounded-2xl p-5 sm:p-6" variants={itemVariants}>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">developer summary</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Current focus</p>
                  <p className="mt-2 font-semibold leading-7 text-white">Frontend systems with full-stack execution</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Working style</p>
                  <p className="mt-2 font-semibold leading-7 text-white">Fast feedback, clean UI, maintainable code</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="theme-panel overflow-hidden rounded-2xl"
          >
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[360px] bg-slate-950/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.18),transparent_35%)]" />
                <img
                  src="jeevanreddy680.jpg"
                  alt="Jeevan Reddy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">profile snapshot</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">Building, learning, shipping.</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    I am building my career around product-minded development: thoughtful interfaces, practical backend work, and steady improvement through real projects.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-cyan-400/12 bg-slate-950/45 p-4">
                    <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Primary stack</p>
                    <p className="mt-2 font-semibold text-white">React, Next.js, Node, Express, MongoDB</p>
                  </div>
                  <div className="rounded-xl border border-cyan-400/12 bg-slate-950/45 p-4">
                    <p className="text-sm uppercase tracking-[0.16em] text-slate-500">What I enjoy building</p>
                    <p className="mt-2 font-semibold text-white">Responsive web apps, dashboards, product flows, and full-stack tools</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {strengths.map(({ icon: Icon, title, text }) => (
            <div key={title} className="theme-panel rounded-2xl p-5">
              <div className="flex gap-3">
                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
