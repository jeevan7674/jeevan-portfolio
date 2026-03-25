import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, Shield } from "lucide-react";
import { adminsAPI, type AdminUser } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

type AdminForm = {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "editor";
  active?: boolean;
};

const AdminsPage = () => {
  const { admin: currentAdmin } = useAuth();
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminForm | null>(null);
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
    try {
      const res = await adminsAPI.getAll();
      setItems(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load admins", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    try {
      if (editId) {
        await adminsAPI.update(editId, editing);
        fireSuccess("Admin updated successfully");
      } else {
        if (!editing.email || !editing.password) {
          return toast({ title: "Error", description: "Email and password are required", variant: "destructive" });
        }
        await adminsAPI.create({
          name: editing.name || "",
          email: editing.email,
          password: editing.password,
          role: editing.role || "admin",
        });
        fireSuccess("Admin created successfully");
      }
      setEditing(null);
      setEditId(null);
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await adminsAPI.delete(deleteId);
      fireSuccess("Admin removed");
      setDeleteId(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Admins updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Members</h1>
        <button
          onClick={() => {
            setEditing({ role: "admin", active: true });
            setEditId(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Add Admin
        </button>
      </div>

      <ActionModal
        open={!!editing}
        title={`${editId ? "Edit" : "New"} Admin`}
        onClose={() => {
          setEditing(null);
          setEditId(null);
        }}
      >
        {editing && <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Name
              </label>
              <input
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                value={editing.email || ""}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                type="email"
                disabled={!!editId}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                placeholder="email@example.com"
              />
            </div>
          </div>
          {!editId && (
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                value={editing.password || ""}
                onChange={(e) => setEditing({ ...editing, password: e.target.value })}
                type="password"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Strong password"
              />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Role</label>
              <select
                value={editing.role || "admin"}
                onChange={(e) => setEditing({ ...editing, role: e.target.value as "admin" | "editor" })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Status</label>
              <select
                value={editing.active ? "active" : "inactive"}
                onChange={(e) => setEditing({ ...editing, active: e.target.value === "active" })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
          >
            <Save size={16} /> Save Admin
          </button>
        </div>}
      </ActionModal>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-20 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">No admins yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="glass-card p-4 rounded-xl flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-display font-bold text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.email}</p>
                <div className="flex gap-2 mt-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      item.role === "admin" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {item.role}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      item.active ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                  {currentAdmin?._id === item._id && <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary">You</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {currentAdmin?._id !== item._id && (
                  <>
                    <button
                      onClick={() => {
                        setEditing({ name: item.name, role: item.role, active: item.active });
                        setEditId(item._id);
                      }}
                      className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Admin"
        message="This admin account will be removed permanently."
        confirmText="Delete Admin"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminsPage;
