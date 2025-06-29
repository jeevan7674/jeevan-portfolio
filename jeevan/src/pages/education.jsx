import { GraduationCap, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Merged UI components
const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-white/5 border-purple-500/20 shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-purple-500/20">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

const Badge = ({ children, className = '', variant }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium border ${variant === 'outline' ? 'bg-transparent border-purple-400/50 text-purple-300' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'} ${className}`}>{children}</span>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const Education = () => {
  const education = [
    {
      degree: "Software Engineering",
      school: "Industrial University of Ho Chi Minh City",
      period: "2021 - 2025",
      gpa: "3.8/4.0",
      description: "Final-year student focused on web development, software architecture, and modern programming practices"
    },
    {
      degree: "Web Development Certification",
      school: "Online Learning Platforms",
      period: "2022 - 2023",
      gpa: "Excellence",
      description: "Intensive courses covering React, Next.js, Node.js, and modern web technologies"
    }
  ];

  const activities = [
    {
      title: "Frontend Development Projects",
      period: "2022 - Present",
      description: "Built multiple responsive web applications using React, Next.js, and modern CSS frameworks"
    },
    {
      title: "Open Source Contributor",
      period: "2023 - Present",
      description: "Active contributor to various React and TypeScript projects on GitHub"
    },
    {
      title: "University Tech Events",
      period: "2022 - 2024",
      description: "Participated in coding competitions and tech workshops at university level"
    },
    {
      title: "Self-directed Learning",
      period: "2021 - Present",
      description: "Continuously learning new technologies and best practices in web development"
    }
  ];

  const certifications = [
    "React Advanced Certification",
    "JavaScript ES6+ Proficiency",
    "Responsive Web Design",
    "Modern CSS & Tailwind"
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">Academic Background</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Education & Activities</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <GraduationCap className="mr-3 h-6 w-6 text-purple-400" /> Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div key={index} custom={index} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:bg-slate-800/70 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-white">{edu.degree}</CardTitle>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="mr-2 h-4 w-4" /> {edu.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium text-purple-400 mb-2">{edu.school}</p>
                        <p className="text-gray-300 mb-2">{edu.description}</p>
                        <Badge>GPA: {edu.gpa}</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Award className="mr-3 h-6 w-6 text-violet-400" /> Activities & Achievements
              </h3>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <motion.div key={index} custom={index} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:bg-slate-800/70 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-white">{activity.title}</CardTitle>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="mr-2 h-4 w-4" /> {activity.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{activity.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-6">Certifications & Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="hover:bg-purple-500/20 transition-all duration-300"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
