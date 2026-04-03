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
      className="relative z-10 min-h-[78svh] scroll-mt-28 overflow-hidden px-3 py-4 text-white sm:min-h-[84svh] sm:px-5 sm:py-5 md:min-h-[88svh] md:px-8 lg:px-14"
    >
      <div className="mx-auto flex min-h-[78svh] w-full max-w-[1400px] flex-col justify-start gap-3 sm:min-h-[84svh] sm:gap-3.5 md:min-h-[88svh]">
      <div className="text-center pt-1 sm:pt-2">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold tracking-tight text-white/95 sm:text-4xl md:text-5xl"
        >
          My Skills
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-2 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => handleCategorySelect(category.key)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 sm:px-3.5 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm ${
              activeCategory === category.key
                ? 'border-cyan-300 bg-cyan-500/20 text-cyan-100 shadow-lg shadow-cyan-500/20'
                : 'border-white/15 bg-white/5 text-white/75 hover:border-cyan-400/40 hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="relative flex min-h-0 flex-1 items-start justify-center overflow-visible pt-1 sm:pt-2">
        <div className="relative h-[clamp(13.5rem,68vw,19rem)] w-full max-w-[min(145vw,68rem)] overflow-visible sm:h-[clamp(16rem,54vw,24rem)] sm:max-w-[min(132vw,74rem)] md:h-[clamp(18rem,46vw,28rem)] md:max-w-[min(120vw,82rem)] lg:h-[clamp(20rem,42vw,31rem)] lg:max-w-[min(112vw,92rem)]">
          <Radar
            mode="half"
            showSweep={hasTriggeredInitialScan}
            scanVersion={scanVersion}
            sweepDurationSeconds={SWEEP_DURATION_SECONDS}
            circlesCount={8}
            circleStepRem={5.8}
            className="pointer-events-none absolute left-1/2 bottom-0 z-10 w-[min(170vw,74rem)] -translate-x-1/2 sm:w-[min(155vw,80rem)] md:w-[min(138vw,86rem)] lg:w-[min(124vw,92rem)]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

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
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 scale-[0.78] sm:scale-[0.88] md:scale-[0.96] lg:scale-100"
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
      </div>
    </section>
  );
};

export default SkillsSection;
