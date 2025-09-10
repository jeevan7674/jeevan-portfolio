import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import projectData from '@/data/projectdata';

// Button Variants
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-md',
        outline: 'border border-purple-500 text-purple-300 hover:bg-purple-600/10',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  );
});
Button.displayName = 'Button';

// Badge Component
const Badge = ({ className, children }) => (
  <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', className)}>
    {children}
  </div>
);

// Main Component
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const projects = projectData;


  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  return (
    <section id='projects'
    className="py-20 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-300 text-sm font-medium tracking-widest">My Recent Work</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold mb-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto rounded-full mb-6" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === filter
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-[#1c1c2e] text-gray-300 hover:bg-[#292944]'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="cursor-pointer rounded-2xl overflow-hidden bg-[#10101A] text-white flex flex-col shadow-md border border-[#1c1c2b] min-h-[480px]"
            >
              {/* Image */}
              <div className="w-full h-[200px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                {/* Title */}
                <h3 className="text-xl font-bold text-teal-400 mb-1 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 tracking-wide">
                  {project.description}
                </p>

                {/* Date & Status */}
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="tracking-wide">{project.date}</span>
                  </div>
                  <Badge
                    className={`flex items-center gap-1 ${project.status === 'Completed'
                        ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      }`}
                  >
                    {project.status === 'Completed' ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {project.status}
                  </Badge>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      className="bg-[#1b1b2f] text-gray-300 border border-gray-600 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <div
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()} // 🛑 Prevents bubbling
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-[#1c1c2e] text-gray-300 border border-[#333]"
                      >
                        <Github size={16} /> View Code
                      </Button>
                    </a>
                  </div>
                  <div
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()} // 🛑 Prevents bubbling
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        size="sm"
                        variant="default"
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:brightness-110"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </Button>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
