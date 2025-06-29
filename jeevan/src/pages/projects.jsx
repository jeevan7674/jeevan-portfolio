import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Button Component
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg',
        outline: 'border border-purple-500/50 text-purple-300 hover:bg-purple-500/20',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
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
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

// Card Components
const Card = ({ className, ...props }) => (
  <div className={cn('rounded-xl border bg-card text-card-foreground shadow', className)} {...props} />
);
const CardHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
const CardTitle = ({ className, ...props }) => (
  <h3 className={cn('text-xl font-semibold leading-none tracking-tight', className)} {...props} />
);
const CardContent = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

// Badge Component
const Badge = ({ className, children }) => (
  <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', className)}>
    {children}
  </div>
);

// Projects Component
const Projects = () => {
  const projects = [
    {
      title: "Ecommerce Full-stack Website",
      description: "A modern, full-featured e-commerce platform with real-time chatbot support.",
      status: "In Progress",
      date: "Start: 27 May 2025",
      technologies: ["Next.js", "TailwindCSS", "Clerk", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/images/project1.png"
    },
    {
      title: "Green Grocery Full-stack Website",
      description: "An online store specializing in fresh, organic groceries.",
      status: "In Progress",
      date: "Start: 27 May 2025",
      technologies: ["Next.js", "TailwindCSS", "Clerk", "MongoDB", "Node.js"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/images/project2.png"
    },
    {
      title: "Online Bookstore Frontend",
      description: "The client-side application for a collaborative online bookstore project.",
      status: "Completed",
      date: "Start: 11 Jan 2025",
      technologies: ["Next.js", "TailwindCSS", "TypeScript", "React Query"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "/images/project3.png"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#0c0c1d] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <motion.div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <span className="text-purple-400 text-sm font-medium">My recent work</span>
          </motion.div>

          <motion.h2 className="text-4xl font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            Featured Projects
          </motion.h2>

          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mb-6"></div>

          <div className="flex justify-center gap-4 mb-6">
            {['All', 'Web', 'AI', 'Mobile'].map((filter) => (
              <button key={filter} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
                ${filter === 'All'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : 'bg-[#1b1b2f] text-gray-300 hover:bg-[#2a2a3c]'}`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}>
          {projects.map((project, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group bg-[#141425] border border-[#23263b] rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
              <div className="aspect-video overflow-hidden">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-white group-hover:text-purple-300 transition">{project.title}</CardTitle>
                  <Badge className={`${project.status === 'Completed'
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'}`}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm flex items-center gap-1"><Calendar size={14} /> {project.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} className="border border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github size={16} /> View Code
                  </Button>
                  <Button size="sm" variant="default" className="flex-1">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
