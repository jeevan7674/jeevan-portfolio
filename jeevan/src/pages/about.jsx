import { motion, useInView } from 'framer-motion';
import { Code2, GraduationCap, MapPin, Rocket } from 'lucide-react';
import { useRef } from 'react';

const focusItems = [
  {
    icon: Code2,
    title: 'Frontend systems',
    text: 'React, Next.js, Tailwind, reusable UI patterns, and responsive flows.',
  },
  {
    icon: Rocket,
    title: 'Product execution',
    text: 'Turning ideas into usable screens, connected APIs, and deployable apps.',
  },
  {
    icon: GraduationCap,
    title: 'Learning loop',
    text: 'Computer Science student sharpening full-stack fundamentals every build.',
  },
];

const commits = [
  'Studying CSE at S.R.K.R Engineering College',
  'Building MERN and Next.js products',
  'Exploring mobile apps, automations, and practical AI workflows',
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

      <div ref={ref} className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="theme-pill mb-4 inline-flex rounded-full px-5 py-2 text-sm font-medium" variants={itemVariants}>
            My Journey
          </motion.div>
          <motion.h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl" variants={itemVariants}>
            From student builder to full-stack product developer.
          </motion.h2>
          <motion.div className="mt-4 h-1 w-24 rounded theme-section-line" variants={itemVariants} />
          <motion.p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg" variants={itemVariants}>
            I am R. Jeevan Reddy, a third-year software engineering student from Bhimavaram. I like building products where the interface, performance, and backend logic all feel connected instead of stitched together.
          </motion.p>
          <motion.p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg" variants={itemVariants}>
            My strongest lane is frontend and full-stack development with React, Next.js, Node, Express, and MongoDB. I care about clean visual systems, fast feedback, and code that remains easy to extend.
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
        </motion.div>

        <motion.div
          className="grid gap-5 lg:grid-cols-[0.78fr_1fr]"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <img
              src="jeevanreddy680.jpg"
              alt="Jeevan Reddy"
              className="relative aspect-[4/5] w-full rounded-2xl border border-cyan-400/25 object-cover shadow-2xl"
            />
            <div className="theme-panel absolute -bottom-5 left-4 right-4 rounded-xl px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">current mode</p>
              <p className="mt-1 text-sm font-semibold text-white">Building, learning, shipping</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="theme-panel rounded-2xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">commit history</p>
              <div className="mt-4 space-y-3">
                {commits.map((commit, index) => (
                  <div key={commit} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.5)]" />
                    <p className="text-sm leading-6 text-slate-300">
                      <span className="font-mono text-slate-500">#{index + 1}</span> {commit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {focusItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="theme-panel rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
