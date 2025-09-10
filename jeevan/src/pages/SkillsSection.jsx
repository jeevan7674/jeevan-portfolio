import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaHtml5, FaCss3Alt,
  FaPython, FaFigma
} from 'react-icons/fa';
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiExpress,
  SiMongodb, SiMysql, SiMariadb, SiPrisma
} from 'react-icons/si';
import { MdApi, MdDevices } from 'react-icons/md';
import { motion } from 'framer-motion';

const skillCardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

const SkillCard = ({ title, skills, index }) => (
  <motion.div
    custom={index}
    variants={skillCardVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg w-full md:w-[30%] border border-white/10 transition-all duration-500 hover:shadow-cyan-500/30 hover:border-cyan-400/40"
  >
    <h3 className="text-white text-xl font-semibold mb-6">{title}</h3>
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.15 }}
          className="flex flex-col items-center text-white/90"
        >
          <motion.div
            whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
            transition={{ duration: 0.4 }}
            className={`text-4xl ${skill.color}`}
          >
            {skill.icon}
          </motion.div>
          <div className="text-xs mt-2 font-medium">{skill.name}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 py-24 px-6 md:px-20 text-white"
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white/95"
        >
          My Skills
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full origin-left"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 flex-wrap">
        <SkillCard
          index={0}
          title="Frontend Development"
          skills={[
            { name: 'ReactJS', icon: <FaReact />, color: 'text-[#61DBFB]' },
            { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white' },
            { name: 'JavaScript (ES6+)', icon: <SiJavascript />, color: 'text-[#F7DF1E]' },
            { name: 'TypeScript', icon: <SiTypescript />, color: 'text-[#3178C6]' },
            { name: 'HTML5', icon: <FaHtml5 />, color: 'text-[#E34F26]' },
            { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-[#264DE4]' },
            { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-[#38BDF8]' },
          ]}
        />
        <SkillCard
          index={1}
          title="Backend & Database"
          skills={[
            { name: 'Node.js', icon: <FaNodeJs />, color: 'text-[#68A063]' },
            { name: 'Express.js', icon: <SiExpress />, color: 'text-white' },
            { name: 'Python', icon: <FaPython />, color: 'text-[#4B8BBE]' },
            { name: 'Java', icon: <FaJava />, color: 'text-[#007396]' },
            { name: 'MongoDB', icon: <SiMongodb />, color: 'text-[#47A248]' },
            { name: 'Prisma', icon: <SiPrisma />, color: 'text-[#0C344B]' },
            { name: 'MariaDB', icon: <SiMariadb />, color: 'text-[#003545]' },
            { name: 'MySQL', icon: <SiMysql />, color: 'text-[#4479A1]' },
          ]}
        />
        <SkillCard
          index={2}
          title="Tools & Methodologies"
          skills={[
            { name: 'Git', icon: <FaGitAlt />, color: 'text-[#F1502F]' },
            { name: 'RESTful APIs', icon: <MdApi />, color: 'text-[#16A34A]' },
            { name: 'Responsive Design', icon: <MdDevices />, color: 'text-[#0EA5E9]' },
            { name: 'Figma', icon: <FaFigma />, color: 'text-[#F24E1E]' },
            { name: 'Docker', icon: <FaDocker />, color: 'text-[#2496ED]' },
          ]}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
