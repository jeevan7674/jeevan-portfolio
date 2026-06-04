import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  CalendarDays,
  Search,
  Filter,
  FolderKanban,
  Layers3,
  Sparkles,
  Code2,
  MonitorSmartphone,
  ServerCog,
  Database,
  Terminal,
  RefreshCcw,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

// Button Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "theme-primary-button hover:shadow-md",
        outline:
          "theme-secondary-button",
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

const categoryIcons = {
  web: Code2,
  app: MonitorSmartphone,
  mobile: MonitorSmartphone,
  backend: ServerCog,
  database: Database,
  "web/app": Layers3,
  "mobile/web": MonitorSmartphone,
};

const getCategoryIcon = (category = "") => {
  const normalized = String(category).toLowerCase();
  return categoryIcons[normalized] || categoryIcons[normalized.replace(/\s+/g, "")] || FolderKanban;
};

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

  const activeProjects = filteredProjects.filter(
    (project) => (project.status || "").toLowerCase() !== "completed"
  ).length;
  const completedProjects = filteredProjects.length - activeProjects;
  const totalStacks = new Set(filteredProjects.flatMap((project) => project.technologies || [])).size;

  const resetFilters = () => {
    setSelectedType("All");
    setSelectedTech("All");
    setSearchQuery("");
  };


  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute left-[-10rem] top-12 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-12rem] bottom-0 h-[32rem] w-[32rem] rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="theme-pill mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              Portfolio showcase
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-cyan-300">Selected</span> projects built like product features, not simple cards.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              A curated explorer for work I have shipped or am actively building. The layout is designed to feel more like a developer dashboard, with clear hierarchy, stronger metadata, and a tighter visual system.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="theme-panel rounded-2xl p-4 sm:p-5 lg:mt-12 lg:sticky lg:top-24 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-300 mb-4">
              <Terminal className="h-4 w-4" />
              search & filter
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Find project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-cyan-400/15 bg-slate-950/65 py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-300"
                />
              </div>
            </div>

            {/* Type Filters */}
            <div className="mb-4">
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">Project type</p>
              <div className="flex flex-wrap gap-1.5">
                {typeFilters.map((filter) => {
                  const Icon = getCategoryIcon(filter);
                  const active = selectedType === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedType(filter)}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                        active
                          ? "border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-lg shadow-cyan-500/10"
                          : "border-cyan-400/10 bg-slate-950/60 text-slate-300 hover:border-cyan-400/30"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tech Filters */}
            <div className="mb-4">
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">Stack</p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {techFilters.map((tech) => {
                  const active = selectedTech === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all whitespace-nowrap ${
                        active
                          ? "border-violet-300 bg-violet-400/15 text-violet-100 shadow-lg shadow-violet-500/10"
                          : "border-cyan-400/10 bg-slate-950/60 text-slate-300 hover:border-cyan-400/30"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Query Snapshot */}
            <div className="rounded-lg border border-cyan-400/15 bg-slate-950/55 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-2">
                <Code2 className="h-3 w-3" />
                query snapshot
              </div>
              <div className="space-y-1 font-mono text-[10px] text-slate-400">
                <p>$ type = {selectedType}</p>
                <p>$ stack = {selectedTech}</p>
                <p>$ search = {searchQuery || '""'}</p>
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 w-full theme-secondary-button inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
            >
              <RefreshCcw className="h-3 w-3" />
              Reset all
            </button>
          </motion.aside>
        </div>





        {/* PROJECT GRID */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="theme-panel aspect-square rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6"
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
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/projects/${project.id}`);
                }}
                className="theme-panel group flex cursor-pointer flex-col overflow-hidden rounded-xl text-white transition hover:border-cyan-300/35 hover:shadow-cyan-500/15"
              >
                <div className="relative h-44 overflow-hidden border-b border-cyan-400/15 bg-slate-950/70">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.92),transparent_65%)]" />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-cyan-400/15 bg-slate-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur-md">
                    <FolderKanban className="h-3 w-3" />
                    {project.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-3.5">
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-white line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-3 text-slate-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-md border border-cyan-400/10 bg-slate-950/40 px-2.5 py-1.5">
                    <CalendarDays className="h-2.5 w-2.5 text-cyan-300 flex-shrink-0" />
                    <span className="text-[10px] text-slate-300 flex-1 truncate">{project.date || "Ongoing"}</span>
                    <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 font-mono text-[9px] text-violet-100 whitespace-nowrap">
                      {project.status || "Draft"}
                    </div>
                  </div>

                  <div className="mb-auto">
                    <p className="text-[9px] uppercase tracking-[0.1em] text-slate-600 mb-1">Stack</p>
                    <div className="flex flex-wrap gap-1">
                      {(project.technologies || []).slice(0, 3).map((tech, i) => (
                        <span key={i} className="inline-flex rounded-full border border-cyan-400/10 bg-slate-900/70 px-1.5 py-0.5 text-[9px] text-slate-300">
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 3 && (
                        <span className="inline-flex rounded-full border border-cyan-400/10 bg-slate-900/70 px-1.5 py-0.5 text-[9px] text-slate-400">
                          +{(project.technologies || []).length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-center border border-violet-400/20 bg-slate-950/60 text-[10px] text-slate-200 hover:bg-violet-400/10 h-7"
                        >
                          <Github size={12} className="mr-1" />
                          Code
                        </Button>
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          variant="default"
                          className="w-full justify-center text-[10px] theme-primary-button hover:brightness-110 h-7"
                        >
                          <ExternalLink size={12} className="mr-1" />
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="theme-panel col-span-full rounded-2xl px-6 py-16 text-center mt-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-200">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">No projects found</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Try a different filter, clear the current search, or reset the stack selection to bring the project index back into view.
            </p>
            <button
              onClick={() => resetFilters()}
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 theme-primary-button"
            >
              <RefreshCcw className="h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
