import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const WorkExperience = () => {
  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "Tech Startup Inc.",
      location: "Ho Chi Minh City, Vietnam",
      period: "2023 - Present",
      type: "Part-time",
      description: [
        "Developed responsive web components using React and TypeScript",
        "Collaborated with senior developers on feature implementation",
        "Participated in code reviews and followed best practices",
        "Gained experience with modern development tools and workflows"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Git", "Figma"]
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Remote",
      period: "2022 - 2023",
      type: "Freelance",
      description: [
        "Built custom websites for small businesses and individuals",
        "Implemented responsive designs and optimized for performance",
        "Worked directly with clients to understand requirements",
        "Delivered projects on time and within budget"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "Bootstrap"]
    },
    {
      title: "University Project Lead",
      company: "Industrial University of HCMC",
      location: "Ho Chi Minh City, Vietnam",
      period: "2021 - 2022",
      type: "Academic",
      description: [
        "Led development of group projects using modern web technologies",
        "Mentored team members on coding best practices",
        "Implemented version control and project management workflows",
        "Delivered successful presentations to faculty and peers"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "Material-UI"]
    }
  ];

  return (
    <section id="experience" className="py-20  relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="text-purple-400 text-sm font-medium">Professional Journey</span>
          </motion.div>
          <motion.h2 className="text-4xl font-bold text-white mb-4" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Work Experience
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My professional journey and the impact I've made through various projects and experiences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-24 w-0.5 h-full bg-purple-500/20 md:left-8"></div>
              )}
              <div className="absolute left-4 top-8 w-4 h-4 bg-purple-600 rounded-full md:left-6 border-2 border-purple-400"></div>
              <div className="ml-12 mb-12 md:ml-16">
                <div className="glass border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl text-white font-semibold">{experience.title}</h3>
                    <span className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                      {experience.type}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center text-gray-400 text-sm space-y-2 md:space-y-0 md:space-x-6 mb-4">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      {experience.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {experience.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {experience.period}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {experience.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded-full hover:bg-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
