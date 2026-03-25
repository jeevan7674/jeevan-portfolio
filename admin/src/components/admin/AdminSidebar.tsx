import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Mail,
  FileText,
  BarChart3,
  LogOut,
  ArrowLeft,
  Briefcase,
  Trophy,
  Award,
  Phone,
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/admins", icon: Shield, label: "Admin Members" },
  { to: "/admin/about", icon: User, label: "About" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/skills", icon: Wrench, label: "Skills" },
  { to: "/admin/experience", icon: Briefcase, label: "Experience" },
  { to: "/admin/achievements", icon: Trophy, label: "Achievements" },
  { to: "/admin/certifications", icon: Award, label: "Certifications" },
  { to: "/admin/contact-info", icon: Phone, label: "Contact Info" },
  { to: "/admin/messages", icon: Mail, label: "Messages" },
  { to: "/admin/resume", icon: FileText, label: "Resume" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const { logout, isDemo } = useAuth();

  return (
    <>
      <button
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-label="Close sidebar overlay"
      />

      <aside className={`fixed md:static top-0 left-0 z-40 w-[84vw] max-w-72 md:w-72 min-h-screen bg-card/80 border-r border-border/60 backdrop-blur-xl flex flex-col transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-border/60">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">Admin Console</p>
              <h2 className="text-xl font-display font-bold gradient-text">Portfolio CMS</h2>
              {isDemo && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium uppercase tracking-wider">
                  Demo Mode
                </span>
              )}
            </div>
            <button onClick={onClose} className="md:hidden text-muted-foreground hover:text-foreground transition-colors" aria-label="Close sidebar">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-transparent"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/60 space-y-1.5">
          <a
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-transparent"
          >
            <ArrowLeft size={18} />
            View Portfolio
          </a>
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors border border-destructive/20 w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
