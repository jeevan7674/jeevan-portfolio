import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, BriefcaseBusiness, TerminalSquare } from 'lucide-react';

const WorkExperience = () => {
  const experiences = [
  {
    title: "Product Development Engineer Intern",
    company: "GenZgalaxy",
    location: "Remote",
    period: "2025 - Present",
    type: "Full-time Internship",
    description: [
      "Working as a full-stack developer using the MERN stack",
      "Building and optimizing scalable product features",
      "Collaborating with cross-functional teams on product development",
      "Improving performance and ensuring best coding practices"
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Git", "Figma"]
  },
  {
    title: "Data Science & Tableau Intern",
    company: "1M1B (Powered by Salesforce & AICTE)",
    location: "Remote",
    period: "April 2025 - June 2025",
    type: "Internship",
    description: [
      "Gained hands-on experience with Tableau for data visualization",
      "Worked on projects aligned with sustainable development goals",
      "Explored data science concepts for solving real-world problems",
      "Collaborated with mentors to create impactful solutions"
    ],
    technologies: ["Tableau", "Python", "Pandas", "NumPy", "Data Visualization"]
  },
  {
    title: "Web Development Intern",
    company: "Vault of Codes",
    location: "Remote",
    period: "Jan 2025 - Mar 2025",
    type: "Internship",
    description: [
      "Developed responsive websites using HTML, CSS, and JavaScript",
      "Built interactive UI components and enhanced user experience",
      "Improved site performance and optimized code structure",
      "Delivered client-ready web projects on time"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"]
  }

  ];

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="absolute top-1/4 right-0 h-96 w-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 h-96 w-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-12 lg:text-left">
          <motion.div className="theme-pill inline-flex px-4 py-2 rounded-full mb-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span data-section-anchor className="text-sm font-medium">Professional Journey</span>
          </motion.div>
          <motion.h2 className="text-4xl font-black text-white mb-3 sm:text-5xl" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Work Experience
          </motion.h2>
          <div className="h-1 w-24 theme-section-line mx-auto mb-4 rounded lg:mx-0"></div>
          <p className="text-slate-300 max-w-2xl mx-auto lg:mx-0">
            Internships and product work where I started turning engineering fundamentals into team-facing output.
          </p>
        </div>

        <div className="theme-panel rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/65 px-4 py-3">
            <div className="flex items-center gap-2 text-cyan-300">
              <TerminalSquare className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-[0.22em]">experience.feed</span>
            </div>
            <span className="text-xs text-slate-500">{experiences.length} entries</span>
          </div>

          <div className="p-4 sm:p-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                className={`relative pl-12 ${index !== experiences.length - 1 ? 'pb-8' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {index !== experiences.length - 1 && (
                  <div className="absolute left-[1.15rem] top-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-300/45 to-transparent" />
                )}

                <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.12)]">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>

                <div className="rounded-2xl border border-cyan-400/12 bg-slate-950/45 p-5 transition hover:border-cyan-300/28 hover:bg-slate-900/55">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
                      <div className="mt-2 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                        <span className="flex items-center">
                          <Building className="mr-2 h-4 w-4" />
                          {experience.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {experience.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {experience.period}
                        </span>
                      </div>
                    </div>
                    <span className="self-start rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-sm text-violet-200">
                      {experience.type}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {experience.description.map((item) => (
                      <li key={item} className="flex items-start">
                        <div className="mt-2 mr-3 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="text-slate-300 leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-cyan-400/30 px-2.5 py-1 text-xs text-cyan-200 hover:bg-cyan-400/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
