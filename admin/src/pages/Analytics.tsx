import { useEffect, useState } from "react";
import { BarChart3, Monitor, Smartphone, Tablet } from "lucide-react";
import { analyticsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoAnalytics } from "@/data/demoData";

interface AnalyticsData {
  totalVisits: number;
  pageViews: { page: string; count: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  recentVisits: { page: string; timestamp: string; deviceType: string }[];
}

const AnalyticsPage = () => {
  const { isDemo } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isDemo) {
      setData(demoAnalytics);
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const res = await analyticsAPI.getStats();
        setData(res.data);
      } catch {
        toast({ title: "Error", description: "Failed to load analytics", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [isDemo]);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Analytics</h1>
        <div className="grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="glass-card p-6 rounded-xl h-28 animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Analytics</h1>
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground text-sm">
          No analytics data available. Connect your backend to start tracking.
        </div>
      </div>
    );
  }

  const maxPageViews = Math.max(...(data.pageViews?.map((p) => p.count) || [1]));

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-8">Analytics</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Visits</span>
            <BarChart3 size={18} className="text-primary" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{data.totalVisits}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Desktop</span>
            <Monitor size={18} className="text-primary" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{data.deviceBreakdown?.desktop || 0}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Mobile</span>
            <Smartphone size={18} className="text-primary" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{data.deviceBreakdown?.mobile || 0}</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl mb-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Page Views</h2>
        <div className="space-y-3">
          {data.pageViews?.map((pv) => (
            <div key={pv.page} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-24 truncate shrink-0">{pv.page}</span>
              <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/30 rounded-full"
                  style={{ width: `${(pv.count / maxPageViews) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-8 text-right">{pv.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Recent Visits</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Page</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Device</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentVisits?.slice(0, 10).map((visit, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 text-foreground">{visit.page}</td>
                  <td className="py-2 text-muted-foreground flex items-center gap-1">
                    {visit.deviceType === "mobile" ? <Smartphone size={12} /> :
                     visit.deviceType === "tablet" ? <Tablet size={12} /> : <Monitor size={12} />}
                    {visit.deviceType}
                  </td>
                  <td className="py-2 text-muted-foreground">{new Date(visit.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
