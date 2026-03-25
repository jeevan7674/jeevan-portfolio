import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Search } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

// Button Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-md",
        outline:
          "border border-purple-500 text-purple-300 hover:bg-purple-600/10",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Badge Component
const Badge = ({ className, children }) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      className
    )}
  >
    {children}
  </div>
);

// Main Component
const Projects = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/public/projects`);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const typeFilters = useMemo(() => ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))], [projects]);

  const techFilters = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.technologies || []))], [projects]);

  const filteredProjects = projects.filter((project) => {
    const matchesType =
      selectedType === "All" || project.category === selectedType;

    const matchesTech =
      selectedTech === "All" ||
      (project.technologies || []).includes(selectedTech);

    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies || []).some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesType && matchesTech && matchesSearch;
  });


  return (
    <section id="projects" className="py-20 text-white">
      <div className="container mx-auto px-4">

        {/* HERO SECTION */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-block px-4 py-2 bg-[#1c1c2e] rounded-full mb-4 border border-[#2a2a40]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-teal-400 text-sm font-medium tracking-widest">
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-teal-400">Selected</span> Projects
          </motion.h1>

          <motion.p
            className="text-gray-400 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Real-world applications built using modern technologies
          </motion.p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto mb-6 relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1c1c2e] border border-[#2a2a40] text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 transition"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            {/* Project Type */}
            <div>
              <p className="text-sm text-gray-400 mb-3 text-center md:text-left">
                Project Type
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {typeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedType(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedType === filter
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                        : "bg-[#1c1c2e] text-gray-300 hover:bg-[#292944]"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology */}
            <div>
              <p className="text-sm text-gray-400 mb-3 text-center md:text-left">
                Technology
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {techFilters.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTech === tech
                        ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md"
                        : "bg-[#1c1c2e] text-gray-300 hover:bg-[#292944]"
                      }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* PROJECT GRID */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-[#10101A] border border-[#1c1c2b] min-h-[380px] animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="cursor-pointer rounded-2xl overflow-hidden bg-[#10101A] text-white flex flex-col shadow-md border border-[#1c1c2b] min-h-[480px] hover:shadow-teal-500/20 transition"
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
                  <h3 className="text-xl font-bold text-teal-400 mb-1 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 tracking-wide">
                    {project.description}
                  </p>

                  {/* Duration + Role */}
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{project.date || "Ongoing"}</span>
                    </div>

                    <Badge className="bg-teal-600/20 text-teal-300 border border-teal-500/30">
                      {project.status}
                    </Badge>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).map((tech, i) => (
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
                    {project.github && (
                      <div
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
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
                    )}

                    {project.demo && (
                      <div
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
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
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // EMPTY STATE
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found</p>
            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedTech("All");
                setSearchQuery("");
              }}

              className="mt-4 px-4 py-2 bg-teal-500 rounded-lg text-white hover:bg-teal-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
