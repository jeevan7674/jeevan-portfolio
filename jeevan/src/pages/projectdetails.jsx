import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Github,
  CalendarDays,
  Tag,
  Activity,
  ArrowLeft,
  Target,
  Sparkles,
  Layers3,
  Image as ImageIcon,
  Terminal,
  Code2,
  FolderKanban,
  MonitorSmartphone,
  ServerCog,
  Database,
  FileText,
  Link2,
  Rocket,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './header';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'theme-primary-button hover:brightness-110',
    outline: 'theme-secondary-button',
    ghost: 'text-slate-300 hover:text-cyan-300 underline underline-offset-4',
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ type, children }) => {
  const baseStyles =
    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-200 border border-cyan-400/20 backdrop-blur-sm shadow-sm';

  const icons = {
    category: <Tag size={14} />,
    date: <CalendarDays size={14} />,
    status: <Activity size={14} />,
  };

  return (
    <span className={baseStyles}>
      {icons[type]} {children}
    </span>
  );
};

const buildSummary = (project) => [
  { label: 'Category', value: project.category || 'Project', icon: FolderKanban },
  { label: 'Timeline', value: project.date || 'Ongoing', icon: CalendarDays },
  { label: 'Status', value: project.status || 'Draft', icon: Activity },
  {
    label: 'Tech stack',
    value: `${(project.technologies || []).length} tools`,
    icon: Layers3,
  },
];

const getSectionIcon = (label) => {
  const normalized = label.toLowerCase();

  if (normalized.includes('goal')) return Target;
  if (normalized.includes('feature')) return Sparkles;
  if (normalized.includes('technolog')) return Code2;
  if (normalized.includes('gallery')) return ImageIcon;

  return FileText;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/public/projects/${id}`);
        if (!res.ok) {
          setProject(null);
          return;
        }
        const data = await res.json();
        setProject(data);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading project...</div>;
  if (!project) return <div className="text-white text-center mt-20">Project not found</div>;

  const summaryCards = buildSummary(project);
  const galleryImages = project.galleryImages?.length ? project.galleryImages : [project.galleryImage || project.image];

  return (
    <>
      <Header />

      <motion.section
        className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute left-[-10rem] top-12 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-10rem] bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.button
            onClick={() => navigate(-1)}
            className="theme-secondary-button mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </motion.button>

          <motion.div
            className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="space-y-6">
              <div className="theme-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                <Terminal className="h-4 w-4" />
                project case study
              </div>

              <div>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  {project.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="theme-panel rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                        <Icon className="h-4 w-4 text-cyan-300" />
                        {item.label}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button onClick={() => window.open(project.demo, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Button>
                <Button onClick={() => window.open(project.github, '_blank')} variant="outline">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </Button>
              </div>

              <div className="theme-panel rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300">
                  <Layers3 className="h-4 w-4" />
                  build notes
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <div key={tech} className="rounded-xl border border-cyan-400/15 bg-slate-950/55 px-4 py-3 text-sm text-slate-300">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                className="theme-panel overflow-hidden rounded-2xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
              >
                <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
                    <span className="h-3 w-3 rounded-full bg-cyan-300" />
                    <span className="h-3 w-3 rounded-full bg-violet-300" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <Code2 className="h-4 w-4 text-cyan-300" />
                    preview.png
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.8),transparent_60%)]" />
                </div>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="theme-panel rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <MonitorSmartphone className="h-4 w-4 text-cyan-300" />
                    Category
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{project.category}</p>
                </div>
                <div className="theme-panel rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <ServerCog className="h-4 w-4 text-cyan-300" />
                    Status
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{project.status}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <section className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Target className="h-4 w-4" />
                  Project goal and overview
                </div>
                <p className="max-w-4xl leading-7 text-slate-300">{project.goal}</p>
              </section>

              <section className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                  Key features
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {(project.features || []).map((feature, index) => (
                    <li key={index} className="flex gap-3 rounded-xl border border-cyan-400/10 bg-slate-950/55 p-4 text-sm leading-6 text-slate-300">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Database className="h-4 w-4" />
                  Technologies used
                </div>
                <div className="flex flex-wrap gap-3">
                  {(project.technologies || []).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-cyan-400/15 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <ImageIcon className="h-4 w-4" />
                  Project gallery
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={`${img}-${idx}`}
                      className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-950/70"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                    >
                      <img
                        src={img}
                        alt={`Project Preview ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-500">Gallery preview of the project interface.</p>
              </section>
            </div>

            <aside className="space-y-4 xl:sticky xl:top-32 xl:self-start">
              <div className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300">
                  <FileText className="h-4 w-4" />
                  project console
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-slate-950/55 px-4 py-3">
                    <span>Path</span>
                    <span className="font-mono text-slate-400">/projects/{id}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-slate-950/55 px-4 py-3">
                    <span>Preview mode</span>
                    <span className="text-cyan-200">Interactive</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-slate-950/55 px-4 py-3">
                    <span>Links</span>
                    <span className="text-violet-200">Live + source</span>
                  </div>
                </div>
              </div>

              <div className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Link2 className="h-4 w-4" />
                  Quick links
                </div>
                <div className="space-y-3">
                  <Button onClick={() => window.open(project.demo, '_blank')} className="w-full justify-center">
                    <ExternalLink className="mr-2 h-4 w-4" /> Open live project
                  </Button>
                  <Button onClick={() => window.open(project.github, '_blank')} variant="outline" className="w-full justify-center">
                    <Github className="mr-2 h-4 w-4" /> Open source code
                  </Button>
                </div>
              </div>

              <div className="theme-panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Rocket className="h-4 w-4" />
                  Delivery notes
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  This page now reads like a case study: stronger hierarchy, more visible metadata, safer icon usage, and a clearer visual bridge to the rest of the developer theme.
                </p>
              </div>
            </aside>
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="mb-4 text-slate-400">Thanks for exploring this project.</p>
            <Button onClick={() => navigate(-1)} variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default ProjectDetails;
