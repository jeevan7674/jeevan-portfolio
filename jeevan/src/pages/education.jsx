import { GraduationCap, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Reusable UI Components
const Card = ({ className, children }) => (
  <div className={`rounded-2xl border bg-white/5 border-purple-500/20 shadow-lg transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-5 border-b border-purple-500/20">{children}</div>
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
      ? 'bg-transparent border-purple-400/50 text-purple-300'
      : 'bg-purple-600/20 text-purple-200 border-purple-600/30'}
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
    <section
      id="education"
      className="py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden"
    >
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-500/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>

          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-4">
              <span className="text-purple-400 text-sm font-medium">Academic Background</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Education & Activities</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-400 to-violet-400" />
          </motion.div>

          {/* Education & Activities */}
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Education Column */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <GraduationCap className="mr-3 h-6 w-6 text-purple-400" /> Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div key={index} custom={index} variants={fadeInUp}>
                    <Card className="hover:bg-slate-800/70 bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{edu.degree}</CardTitle>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <Calendar className="mr-2 h-4 w-4" /> {edu.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-purple-300 font-medium mb-2">{edu.school}</p>
                        <p className="text-gray-300 text-sm mb-2">{edu.description}</p>
                        <Badge>GPA: {edu.gpa}</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Activities Column */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Award className="mr-3 h-6 w-6 text-violet-400" /> Activities & Achievements
              </h3>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <motion.div key={index} custom={index} variants={fadeInUp}>
                    <Card className="hover:bg-slate-800/70 bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{activity.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <Calendar className="mr-2 h-4 w-4" /> {activity.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm">{activity.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
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
