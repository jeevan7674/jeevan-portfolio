import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaHtml5, FaCss3Alt,
  FaPython, FaFigma
} from 'react-icons/fa';
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiExpress,
  SiMongodb, SiMysql, SiMariadb, SiPrisma
} from 'react-icons/si';
import { MdApi, MdDevices } from 'react-icons/md';

const SkillCard = ({ title, skills }) => (
  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl w-full md:w-[30%] border border-white/10">
    <h3 className="text-white text-xl font-semibold mb-6">{title}</h3>
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-white/90 transition-transform duration-300 hover:scale-110"
        >
          <div className={`text-4xl ${skill.color} transition-colors duration-300`}>
            {skill.icon}
          </div>
          <div className="text-sm mt-2">{skill.name}</div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="py-16 px-6 md:px-20 bg-gradient-to-br from-black via-[#0f172a] to-gray-900 text-white"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">My Skills</h2>
        <div className="mt-2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 flex-wrap">
        <SkillCard
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
