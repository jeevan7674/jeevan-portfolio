import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Tag, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import projectData from '@/data/projectData';
import Header from './header';

// ✅ Updated Button Component
const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:brightness-110',
    outline: 'border border-gray-500 text-gray-300 hover:bg-gray-800',
    ghost: 'text-gray-300 hover:text-white underline underline-offset-4',
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ✅ Updated Badge Component with Icons
const Badge = ({ type, children }) => {
  const baseStyles =
    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#1b1e2b]/80 text-teal-300 border border-teal-500 backdrop-blur-sm shadow-sm';

  const icons = {
    category: <Tag size={14} />,
    date: <Calendar size={14} />,
    status: <Activity size={14} />,
  };

  return (
    <span className={baseStyles}>
      {icons[type]} {children}
    </span>
  );
};

// ✅ Main ProjectDetails Component
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((p) => p.id === id);

  if (!project) return <div className="text-white text-center mt-20">Project not found</div>;

  return (
    <>
      <Header />

      <motion.section
        className="min-h-screen pt-32 pb-16 px-6 md:px-20 bg-gradient-to-br from-[#0f0f1a] to-[#12121c] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              {project.title}
            </h1>

            {/* Badges */}
            <div className="flex gap-4 flex-wrap text-sm">
              <Badge type="category">{project.category}</Badge>
              <Badge type="date">{project.date}</Badge>
              <Badge type="status">{project.status}</Badge>
            </div>

            <p className="text-gray-300 max-w-2xl text-base">{project.description}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button onClick={() => window.open(project.demo, '_blank')}>
                <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
              </Button>
              <Button
                onClick={() => window.open(project.github, '_blank')}
                variant="outline"
              >
                <Github className="mr-2 w-4 h-4" /> View Code
              </Button>
            </div>
          </div>

          {/* Project Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="rounded-xl w-full max-w-lg border border-slate-700 shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Project Details Section */}
        <motion.div
          className="mt-20 space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Goal */}
          <div>
            <h2 className="text-2xl font-bold mb-2 text-green-400">🎯 Project Goal & Overview</h2>
            <p className="text-gray-300 max-w-4xl leading-relaxed">{project.goal}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">🚀 Key Features</h2>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 list-disc list-inside">
              {project.features.map((feature, index) => (
                <li key={index} className="text-green-300">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">🛠 Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-white border border-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold mb-4 text-green-400">🖼 Project Gallery</h2>
            <motion.div
              className="inline-block rounded-xl border border-slate-700 shadow-xl overflow-hidden max-w-4xl w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.galleryImage || project.image}
                alt="Project Preview"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <p className="text-sm text-gray-500 mt-2">Gallery preview of the project interface</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-400 mb-4">✨ Thank you for checking out this project!</p>
          <Button onClick={() => navigate(-1)} variant="ghost">
            ← Back to Projects
          </Button>
        </motion.div>
      </motion.section>
    </>
  );
};

export default ProjectDetails;
