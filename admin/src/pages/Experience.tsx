import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Building, MapPin, Calendar } from "lucide-react";
import { experienceAPI, type ExperiencePayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoExperiences } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface ExperienceItem extends ExperiencePayload {
  _id: string;
}

const emptyExperience: ExperiencePayload = {
  title: "",
  company: "",
  location: "",
  period: "",
  type: "Internship",
  description: [],
  technologies: [],
};

const ExperiencePage = () => {
  const { isDemo } = useAuth();
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ExperiencePayload | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const [descInput, setDescInput] = useState("");
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
      setItems(demoExperiences as ExperienceItem[]);
      setLoading(false);
      return;
    }
    try {
      const res = await experienceAPI.getAll();
      setItems(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load experiences", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [isDemo]);

  const handleSave = async () => {
    if (!editing) return;
    if (isDemo) {
      toast({ title: "Demo Mode", description: "Changes won't persist in demo mode" });
      setEditing(null);
      setEditId(null);
      return;
    }
    try {
      if (editId) {
        await experienceAPI.update(editId, editing);
        fireSuccess("Experience updated successfully");
      } else {
        await experienceAPI.create(editing);
        fireSuccess("Experience created successfully");
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
      await experienceAPI.delete(deleteId);
      fireSuccess("Experience deleted");
      setDeleteId(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  const addTech = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({ ...editing, technologies: [...editing.technologies, techInput.trim()] });
    setTechInput("");
  };

  const addDesc = () => {
    if (!descInput.trim() || !editing) return;
    setEditing({ ...editing, description: [...editing.description, descInput.trim()] });
    setDescInput("");
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Experience updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Experience</h1>
        <button
          onClick={() => { setEditing({ ...emptyExperience }); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <ActionModal
        open={!!editing}
        title={`${editId ? "Edit" : "New"} Experience`}
        onClose={() => {
          setEditing(null);
          setEditId(null);
        }}
        maxWidthClassName="max-w-4xl"
      >
        {editing && <div className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Job Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Company</label>
              <input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</label>
              <input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Period</label>
              <input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Jan 2025 - Present" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Type</label>
              <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Full-time Internship">Full-time Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Description Points</label>
            <div className="space-y-1.5 mb-2">
              {editing.description.map((d, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="flex-1">{d}</span>
                  <button onClick={() => setEditing({ ...editing, description: editing.description.filter((_, idx) => idx !== i) })}
                    className="text-destructive hover:opacity-70"><X size={14} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={descInput} onChange={(e) => setDescInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDesc())}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Add description point..." />
              <button onClick={addDesc} className="px-3 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-muted transition-colors">Add</button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Technologies</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {editing.technologies.map((t, i) => (
                <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                  {t}
                  <button onClick={() => setEditing({ ...editing, technologies: editing.technologies.filter((_, idx) => idx !== i) })}
                    className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Add technology..." />
              <button onClick={addTech} className="px-3 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-muted transition-colors">Add</button>
            </div>
          </div>

          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
            <Save size={16} /> Save Experience
          </button>
        </div>}
      </ActionModal>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-24 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">No experiences yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((exp) => (
            <div key={exp._id} className="glass-card p-5 rounded-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-display font-bold text-foreground">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-primary font-medium"><Building size={12} /> {exp.company}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={10} /> {exp.location}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={10} /> {exp.period}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{exp.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => { setEditing({ ...exp }); setEditId(exp._id); }}
                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(exp._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Experience"
        message="This experience entry will be permanently deleted."
        confirmText="Delete Experience"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ExperiencePage;
