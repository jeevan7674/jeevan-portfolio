import { useEffect, useState } from "react";
import { FolderKanban, Wrench, Mail, BarChart3 } from "lucide-react";
import { projectsAPI, skillsAPI, contactAPI, analyticsAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { demoProjects, demoSkills, demoMessages, demoAnalytics } from "@/data/demoData";

interface Stats {
  projects: number;
  skills: number;
  messages: number;
  visits: number;
}

const DashboardPage = () => {
  const { isDemo } = useAuth();
  const [stats, setStats] = useState<Stats>({ projects: 0, skills: 0, messages: 0, visits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setStats({
        projects: demoProjects.length,
        skills: demoSkills.length,
        messages: demoMessages.length,
        visits: demoAnalytics.totalVisits,
      });
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const [projectsRes, skillsRes, messagesRes, analyticsRes] = await Promise.allSettled([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          contactAPI.getAll(),
          analyticsAPI.getStats(),
        ]);

        setStats({
          projects: projectsRes.status === "fulfilled" ? projectsRes.value.data.length ?? 0 : 0,
          skills: skillsRes.status === "fulfilled" ? skillsRes.value.data.length ?? 0 : 0,
          messages: messagesRes.status === "fulfilled" ? messagesRes.value.data.length ?? 0 : 0,
          visits: analyticsRes.status === "fulfilled" ? analyticsRes.value.data.totalVisits ?? 0 : 0,
        });
      } catch {
        // Stats will remain at 0
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isDemo]);

  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban, color: "text-primary" },
    { label: "Skills", value: stats.skills, icon: Wrench, color: "text-accent" },
    { label: "Messages", value: stats.messages, icon: Mail, color: "text-green-400" },
    { label: "Total Visits", value: stats.visits, icon: BarChart3, color: "text-yellow-400" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        {isDemo && (
          <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
            Demo Mode
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon size={20} className={color} />
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-secondary rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-display font-bold text-foreground">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Quick Start</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isDemo
            ? "You're viewing the admin panel in demo mode with sample data. Connect your backend API to manage real data."
            : "Welcome to your Portfolio CMS. Use the sidebar to manage your projects, skills, messages, resume, and view analytics."}
          {!isDemo && (
            <>
              {" "}Connect your backend API by setting{" "}
              <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">VITE_API_BASE_URL</code>{" "}
              in your environment.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
