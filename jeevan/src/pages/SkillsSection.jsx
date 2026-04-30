import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaHtml5, FaCss3Alt,
  FaPython, FaFigma, FaMobileAlt
} from 'react-icons/fa';
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiExpress,
  SiMongodb, SiMysql, SiMariadb, SiPrisma
} from 'react-icons/si';
import { MdApi, MdDevices } from 'react-icons/md';
import { Cpu, Layers3, Terminal } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Radar, IconContainer } from '@/components/ui/radar-effect';

const SWEEP_DURATION_SECONDS = 4.2;

const categories = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'app', label: 'App' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools' },
  { key: 'languages', label: 'Languages' },
];

const categoryMeta = {
  all: {
    title: 'Full Stack Scan',
    command: 'scan --stack=all --depth=production',
    description: 'A combined map of the tools I use to design, build, ship, and maintain modern products.',
  },
  frontend: {
    title: 'Interface Layer',
    command: 'scan --layer=frontend --focus=ux',
    description: 'React-driven interfaces, responsive systems, stateful components, and polished interaction design.',
  },
  backend: {
    title: 'Service Layer',
    command: 'scan --layer=backend --focus=apis',
    description: 'Server logic, API contracts, authentication flows, and scalable application foundations.',
  },
  app: {
    title: 'Product Surface',
    command: 'scan --target=app --mode=cross-platform',
    description: 'Web and mobile experiences shaped around usability, performance, and user intent.',
  },
  database: {
    title: 'Data Layer',
    command: 'scan --layer=data --integrity=on',
    description: 'Schemas, persistence, queries, and database choices that keep product behavior reliable.',
  },
  tools: {
    title: 'Workflow Tools',
    command: 'scan --toolchain=developer --speed=fast',
    description: 'Design, version control, deployment, containers, and utilities that make shipping smoother.',
  },
  languages: {
    title: 'Language Core',
    command: 'scan --syntax=languages --runtime=mixed',
    description: 'Programming languages I use to reason about product logic from frontend to backend.',
  },
};

const allSkills = [
  { name: 'ReactJS', icon: <FaReact className="h-7 w-7 text-[#61DBFB]" />, category: ['frontend', 'app'] },
  { name: 'Next.js', icon: <SiNextdotjs className="h-7 w-7 text-white" />, category: ['frontend', 'app'] },
  { name: 'JavaScript', icon: <SiJavascript className="h-7 w-7 text-[#F7DF1E]" />, category: ['languages', 'frontend'] },
  { name: 'TypeScript', icon: <SiTypescript className="h-7 w-7 text-[#3178C6]" />, category: ['languages', 'frontend'] },
  { name: 'HTML5', icon: <FaHtml5 className="h-7 w-7 text-[#E34F26]" />, category: ['languages', 'frontend'] },
  { name: 'CSS3', icon: <FaCss3Alt className="h-7 w-7 text-[#264DE4]" />, category: ['languages', 'frontend'] },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-7 w-7 text-[#38BDF8]" />, category: ['frontend', 'tools'] },
  { name: 'Node.js', icon: <FaNodeJs className="h-7 w-7 text-[#68A063]" />, category: ['backend'] },
  { name: 'Express.js', icon: <SiExpress className="h-7 w-7 text-white" />, category: ['backend'] },
  { name: 'Python', icon: <FaPython className="h-7 w-7 text-[#4B8BBE]" />, category: ['languages', 'backend'] },
  { name: 'Java', icon: <FaJava className="h-7 w-7 text-[#007396]" />, category: ['languages', 'backend'] },
  { name: 'MongoDB', icon: <SiMongodb className="h-7 w-7 text-[#47A248]" />, category: ['database'] },
  { name: 'Prisma', icon: <SiPrisma className="h-7 w-7 text-[#38BDF8]" />, category: ['database', 'backend'] },
  { name: 'MariaDB', icon: <SiMariadb className="h-7 w-7 text-[#4DB1BC]" />, category: ['database'] },
  { name: 'MySQL', icon: <SiMysql className="h-7 w-7 text-[#4479A1]" />, category: ['database'] },
  { name: 'Git', icon: <FaGitAlt className="h-7 w-7 text-[#F1502F]" />, category: ['tools'] },
  { name: 'REST APIs', icon: <MdApi className="h-7 w-7 text-[#16A34A]" />, category: ['tools', 'backend'] },
  { name: 'Responsive', icon: <MdDevices className="h-7 w-7 text-[#0EA5E9]" />, category: ['app', 'frontend'] },
  { name: 'Figma', icon: <FaFigma className="h-7 w-7 text-[#F24E1E]" />, category: ['tools'] },
  { name: 'Docker', icon: <FaDocker className="h-7 w-7 text-[#2496ED]" />, category: ['tools', 'backend'] },
  { name: 'Mobile Apps', icon: <FaMobileAlt className="h-7 w-7 text-[#A78BFA]" />, category: ['app'] },
];

const createSeededRandom = (seedText) => {
  let seed = 0;

  for (let index = 0; index < seedText.length; index += 1) {
    seed = (seed * 31 + seedText.charCodeAt(index)) >>> 0;
  }

  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scanVersion, setScanVersion] = useState(0);
  const [hasTriggeredInitialScan, setHasTriggeredInitialScan] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.35 });

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') {
      return allSkills;
    }
    return allSkills.filter((skill) => skill.category.includes(activeCategory));
  }, [activeCategory]);

  const activeMeta = categoryMeta[activeCategory];

  const positionedSkills = useMemo(() => {
    const total = filteredSkills.length;
    if (!total) {
      return [];
    }

    const random = createSeededRandom(`${activeCategory}-${total}`);
    const placements = [];
    const minDistance = total > 14 ? 12 : total > 9 ? 13 : 14.5;
    const ringLanes = [21, 28, 35, 42, 49, 56, 63];

    filteredSkills.forEach((skill) => {
      let bestCandidate = null;

      for (let attempt = 0; attempt < 120; attempt += 1) {
        const laneIndex = Math.min(
          ringLanes.length - 1,
          Math.floor(random() * Math.min(ringLanes.length, Math.max(4, Math.ceil(total / 2))))
        );
        const angle = Math.PI * (0.1 + random() * 0.8);
        const radius = ringLanes[laneIndex];
        const x = clamp(50 + Math.cos(angle) * radius, 5, 95);
        const y = clamp(95 - Math.sin(angle) * radius, 12, 88);

        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const placedSkill of placements) {
          const distance = Math.hypot(x - placedSkill.x, y - placedSkill.y);
          nearestDistance = Math.min(nearestDistance, distance);
        }

        const candidate = {
          skill,
          x,
          y,
          angle,
          radius,
          laneIndex,
          nearestDistance,
        };

        if (!bestCandidate || candidate.nearestDistance > bestCandidate.nearestDistance) {
          bestCandidate = candidate;
        }

        if (nearestDistance >= minDistance) {
          bestCandidate = candidate;
          break;
        }
      }

      const angleDegrees = (bestCandidate.angle * 180) / Math.PI;
      const sweepProgress = clamp((180 - angleDegrees) / 180, 0, 1);
      const radiusProgress = clamp((bestCandidate.radius - 18) / 48, 0, 1);

      placements.push({
        ...bestCandidate,
        ...skill,
        left: `${bestCandidate.x}%`,
        top: `${bestCandidate.y}%`,
        delay:
          0.08 +
          sweepProgress * (SWEEP_DURATION_SECONDS - 0.22) +
          radiusProgress * 0.05,
      });
    });

    return placements;
  }, [activeCategory, filteredSkills]);

  useEffect(() => {
    if (isInView && !hasTriggeredInitialScan) {
      setHasTriggeredInitialScan(true);
      setScanVersion((currentVersion) => currentVersion + 1);
    }
  }, [hasTriggeredInitialScan, isInView]);

  const handleCategorySelect = (categoryKey) => {
    setActiveCategory(categoryKey);
    setHasTriggeredInitialScan(true);
    setScanVersion((currentVersion) => currentVersion + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 scroll-mt-24 overflow-hidden px-3 py-10 text-white sm:px-5 sm:py-12 md:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="theme-pill mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold sm:text-sm"
          >
            <Cpu className="h-4 w-4" />
            Tech Radar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-white/95 sm:text-4xl"
          >
            My Skills
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-2 h-1 w-20 origin-left rounded-full theme-section-line"
          />
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="theme-panel flex flex-col justify-between rounded-2xl p-4 sm:p-5"
          >
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                <Terminal className="h-4 w-4" />
                stack-scanner
              </div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">{activeMeta.title}</h3>
              <p className="mt-2 text-sm leading-5 text-slate-300">{activeMeta.description}</p>

              <div className="mt-4 rounded-xl border border-cyan-400/15 bg-slate-950/65 p-3 font-mono text-[11px] text-slate-300">
                <span className="text-cyan-300">$</span> {activeMeta.command}
              </div>

            </div>

            <div className="mt-5 grid gap-1.5">
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => handleCategorySelect(category.key)}
                  className={`group flex items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    activeCategory === category.key
                      ? 'border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-lg shadow-cyan-500/15'
                      : 'border-cyan-400/10 bg-slate-950/45 text-slate-300 hover:border-cyan-400/40 hover:text-white'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyan-300">
                    /{category.key}
                  </span>
                </button>
              ))}
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="theme-panel relative overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/60 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
                <span className="h-3 w-3 rounded-full bg-cyan-300" />
                <span className="h-3 w-3 rounded-full bg-violet-300" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <Layers3 className="h-4 w-4 text-cyan-300" />
                skill-map.render()
              </div>
            </div>

            <div className="relative flex min-h-[21rem] items-end justify-center overflow-hidden px-2 pt-4 sm:min-h-[23rem] md:min-h-[25rem] lg:min-h-[28rem]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
              <div className="pointer-events-none absolute inset-x-8 top-8 rounded-full bg-cyan-400/10 blur-3xl h-44" />

              <div className="relative h-[clamp(14rem,40vw,25rem)] w-full max-w-[min(120vw,78rem)] overflow-visible">
                <Radar
                  mode="half"
                  showSweep={hasTriggeredInitialScan}
                  scanVersion={scanVersion}
                  sweepDurationSeconds={SWEEP_DURATION_SECONDS}
                  circlesCount={8}
                  circleStepRem={5.8}
                  className="pointer-events-none absolute left-1/2 bottom-0 z-10 w-[min(150vw,72rem)] -translate-x-1/2 sm:w-[min(138vw,78rem)] md:w-[min(120vw,84rem)] lg:w-[min(104vw,88rem)]"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

                {positionedSkills.map((skill) => (
                  <motion.div
                    key={`${activeCategory}-${scanVersion}-${skill.name}`}
                    initial={{ opacity: 0, scale: 0.72, filter: 'blur(5px)' }}
                    animate={
                      hasTriggeredInitialScan
                        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, scale: 0.72, filter: 'blur(5px)' }
                    }
                    transition={{ duration: 0.24, delay: skill.delay, ease: 'easeOut' }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 scale-[0.7] sm:scale-[0.78] md:scale-[0.86] lg:scale-[0.92]"
                    style={{ left: skill.left, top: skill.top }}
                  >
                    <IconContainer
                      icon={skill.icon}
                      text={skill.name}
                      delay={0}
                      className="drop-shadow-[0_0_18px_rgba(56,189,248,0.18)]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
