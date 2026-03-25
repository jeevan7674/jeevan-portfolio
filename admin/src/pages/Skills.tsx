import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { skillsAPI, type SkillPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoSkills } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface SkillItem extends SkillPayload {
  _id: string;
}

const SkillsPage = () => {
  const { isDemo } = useAuth();
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SkillPayload | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const fireSuccess = (message: string) => {
    setShowSuccess(true);
    toast({ title: "Success", description: message });
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const fetchSkills = async () => {
    if (isDemo) {
      setSkills(demoSkills);
      setLoading(false);
      return;
    }
    try {
      const res = await skillsAPI.getAll();
      setSkills(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load skills", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, [isDemo]);

  const handleSave = async () => {
    if (!editing) return;
    try {
      await skillsAPI.create(editing);
      fireSuccess("Skill added successfully");
      setEditing(null);
      fetchSkills();
    } catch {
      toast({ title: "Error", description: "Failed to save skill", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await skillsAPI.delete(deleteId);
      fireSuccess("Skill removed");
      setDeleteId(null);
      fetchSkills();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, s) => {
    (acc[s.group] = acc[s.group] || []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <SuccessPing show={showSuccess} message="Skills updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Skills</h1>
        <button
          onClick={() => setEditing({ name: "", color: "hsl(265, 85%, 60%)", group: "Frontend" })}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <ActionModal
        open={!!editing}
        title="New Skill"
        onClose={() => setEditing(null)}
        maxWidthClassName="max-w-2xl"
      >
        {editing && <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Name</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Group</label>
              <select
                value={editing.group}
                onChange={(e) => setEditing({ ...editing, group: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option>Frontend</option>
                <option>Backend & Database</option>
                <option>Tools & Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Color (HSL)</label>
              <input
                value={editing.color}
                onChange={(e) => setEditing({ ...editing, color: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="hsl(190, 90%, 60%)"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
          >
            <Save size={16} /> Save Skill
          </button>
        </div>}
      </ActionModal>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-16 animate-pulse" />)}
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">
          No skills yet. Click "Add Skill" to create one.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="glass-card p-6 rounded-xl">
              <h3 className="text-sm font-display font-bold text-foreground mb-3">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-sm text-foreground group"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                    {skill.name}
                    <button
                      onClick={() => setDeleteId(skill._id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Skill"
        message="This skill will be removed permanently."
        confirmText="Delete Skill"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SkillsPage;
