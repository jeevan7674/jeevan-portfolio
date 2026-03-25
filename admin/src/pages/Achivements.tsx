import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, Trophy } from "lucide-react";
import { achievementsAPI, type AchievementPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoAchievements } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface AchievementItem extends AchievementPayload {
  _id: string;
}

const emptyAchievement: AchievementPayload = {
  title: "",
  description: "",
  date: "",
  icon: "trophy",
};

const AchievementsPage = () => {
  const { isDemo } = useAuth();
  const [items, setItems] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AchievementPayload | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const fireSuccess = (message: string) => {
    setShowSuccess(true);
    toast({ title: "Success", description: message });
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const fetchData = async () => {
    if (isDemo) {
      setItems(demoAchievements as AchievementItem[]);
      setLoading(false);
      return;
    }
    try {
      const res = await achievementsAPI.getAll();
      setItems(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load achievements", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [isDemo]);

  const handleSave = async () => {
    if (!editing) return;
    if (isDemo) { toast({ title: "Demo Mode", description: "Changes won't persist in demo mode" }); setEditing(null); setEditId(null); return; }
    try {
      if (editId) {
        await achievementsAPI.update(editId, editing);
        fireSuccess("Achievement updated");
      } else {
        await achievementsAPI.create(editing);
        fireSuccess("Achievement created");
      }
      setEditing(null);
      setEditId(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    if (isDemo) { toast({ title: "Demo Mode", description: "Can't delete in demo mode" }); return; }
    try {
      await achievementsAPI.delete(deleteId);
      fireSuccess("Achievement deleted");
      setDeleteId(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Achievements updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Achievements</h1>
        <button onClick={() => { setEditing({ ...emptyAchievement }); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <ActionModal
        open={!!editing}
        title={`${editId ? "Edit" : "New"} Achievement`}
        onClose={() => {
          setEditing(null);
          setEditId(null);
        }}
      >
        {editing && <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Date</label>
              <input value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. March 2025" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Description</label>
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3} className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Icon</label>
            <select value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors">
              <option value="trophy">🏆 Trophy</option>
              <option value="medal">🥇 Medal</option>
              <option value="star">⭐ Star</option>
              <option value="award">🎖️ Award</option>
            </select>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
            <Save size={16} /> Save Achievement
          </button>
        </div>}
      </ActionModal>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-20 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">No achievements yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {items.map((a) => (
            <div key={a._id} className="glass-card p-4 rounded-xl flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Trophy size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-display font-bold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.description}</p>
                {a.date && <p className="text-[10px] text-muted-foreground mt-1">{a.date}</p>}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditing({ ...a }); setEditId(a._id); }}
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(a._id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Achievement"
        message="This achievement will be permanently deleted."
        confirmText="Delete Achievement"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AchievementsPage;
