import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, Award, ExternalLink } from "lucide-react";
import { certificationsAPI, type CertificationPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoCertifications } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface CertificationItem extends CertificationPayload {
  _id: string;
}

const emptyCert: CertificationPayload = {
  title: "",
  issuer: "",
  date: "",
  credentialUrl: "",
  image: "",
};

const CertificationsPage = () => {
  const { isDemo } = useAuth();
  const [items, setItems] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CertificationPayload | null>(null);
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
      setItems(demoCertifications as CertificationItem[]);
      setLoading(false);
      return;
    }
    try {
      const res = await certificationsAPI.getAll();
      setItems(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load certifications", variant: "destructive" });
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
        await certificationsAPI.update(editId, editing);
        fireSuccess("Certification updated");
      } else {
        await certificationsAPI.create(editing);
        fireSuccess("Certification created");
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
      await certificationsAPI.delete(deleteId);
      fireSuccess("Certification deleted");
      setDeleteId(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Certifications updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Certifications</h1>
        <button onClick={() => { setEditing({ ...emptyCert }); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      <ActionModal
        open={!!editing}
        title={`${editId ? "Edit" : "New"} Certification`}
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
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Issuer</label>
              <input value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. Coursera, Salesforce" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Date</label>
              <input value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. June 2025" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Credential URL</label>
              <input value={editing.credentialUrl || ""} onChange={(e) => setEditing({ ...editing, credentialUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="https://..." />
            </div>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
            <Save size={16} /> Save Certification
          </button>
        </div>}
      </ActionModal>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-20 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">No certifications yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c._id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Award size={18} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-display font-bold text-foreground truncate">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.issuer} · {c.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><ExternalLink size={14} /></a>
                )}
                <button onClick={() => { setEditing({ ...c }); setEditId(c._id); }}
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(c._id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Certification"
        message="This certification will be permanently deleted."
        confirmText="Delete Certification"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CertificationsPage;
