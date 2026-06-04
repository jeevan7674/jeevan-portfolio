import { GraduationCap, Award, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Reusable UI Components
const Card = ({ className, children }) => (
  <div className={`theme-panel rounded-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-5 border-b border-cyan-400/15">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="p-5">{children}</div>
);

const Badge = ({ children, className = '', variant }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium border
    ${variant === 'outline'
      ? 'bg-transparent border-violet-400/50 text-violet-200'
      : 'bg-cyan-400/10 text-cyan-200 border-cyan-400/20'}
    ${className}`}>{children}
  </span>
);

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const Education = () => {
  const education = [
    {
      degree: "Computer Science and Engineering",
      school: "S.R.K.R Engineering College, Bhimavaram",
      period: "2023 - Present",
      gpa: "9.08/10.0",
      description: "Pursuing a Bachelor's degree with a focus on software development, full-stack development, and web technologies."
    },
    {
      degree: "Intermediate Education",
      school: "Narayana Junior College, Vijayawada",
      period: "2021 - 2023",
      gpa: "Excellence",
      description: "Focused on Mathematics, Physics, and Chemistry, securing top scores in all subjects."
    },
    {
      degree: "Secondary School Education",
      school: "S.D.R high school ,Nandyal",
      period: "2019 - 2021",
      gpa: "Excellence",
      description: "Completed CBSE curriculum with a strong foundation in core subjects."
    },
  ];

  const activities = [
    {
      title: "Frontend Development Projects",
      period: "2023 - Present",
      description: "Developed multiple responsive web apps using React, Next.js, and Tailwind CSS."
    },
    {
      title: "Joint Secretary of Finance, Language Nest Club",
      period: "2024 - Present",
      description: "Managed event finances and promoted language learning and cross-cultural exchange."
    },
    {
      title: "S.R.K.R Orator Championship 2K24 Finalist",
      period: "Oct 2024",
      description: "Finalist showcasing public speaking and technological knowledge."
    },
    {
      title: "Prajwalan Hackathon 2K25",
      period: "Feb 17–18, 2025",
      description: "Built a full-stack solution supporting SMEs through digital transformation."
    },
    {
      title: "PAIE Cell Volunteer",
      period: "2024 - Present",
      description: "Organized yoga/wellness workshops promoting student well-being."
    }
  ];

  const certifications = [
    "React Advanced Certification",
    "JavaScript ES6+ Proficiency",
    "Responsive Web Design",
    "Modern CSS & Tailwind"
  ];

  return (
    <section id="education" className="relative overflow-hidden px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="mb-10 text-center lg:text-left">
            <div data-section-anchor className="theme-pill inline-flex px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium">Academic Background</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-3 sm:text-5xl">Education & Activities</h2>
            <div className="h-1 w-24 rounded theme-section-line mx-auto lg:mx-0" />
            <p className="mx-auto mt-5 max-w-3xl text-slate-300 lg:mx-0">
              The coursework, clubs, competitions, and experiments that shaped how I think about building products.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div variants={fadeInUp} className="theme-panel rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/65 px-4 py-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em]">learning-path.ts</span>
                </div>
                <span className="text-xs text-slate-500">3 records</span>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                {education.map((edu, index) => (
                  <motion.div key={edu.degree} custom={index} variants={fadeInUp}>
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardTitle className="mb-1">{edu.degree}</CardTitle>
                            <p className="text-cyan-300 font-medium text-sm">{edu.school}</p>
                          </div>
                          <Badge>{edu.gpa}</Badge>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-slate-400">
                          <Calendar className="mr-2 h-4 w-4" /> {edu.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 text-sm leading-6">{edu.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-6">
              <motion.div variants={fadeInUp} className="theme-panel rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/65 px-4 py-3">
                  <div className="flex items-center gap-2 text-violet-200">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-mono text-xs uppercase tracking-[0.22em]">activity-feed.log</span>
                  </div>
                  <span className="text-xs text-slate-500">5 highlights</span>
                </div>
                <div className="p-4 sm:p-5 space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div key={activity.title} custom={index} variants={fadeInUp} className="rounded-xl border border-cyan-400/12 bg-slate-950/45 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-white">{activity.title}</h3>
                          <div className="mt-2 flex items-center text-sm text-slate-400">
                            <Calendar className="mr-2 h-4 w-4" /> {activity.period}
                          </div>
                        </div>
                        <Award className="h-5 w-5 shrink-0 text-violet-300" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{activity.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="theme-panel rounded-2xl p-5">
                <h3 className="text-xl font-semibold text-white mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="outline"
                      className="hover:bg-violet-400/15 transition-all duration-300"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
