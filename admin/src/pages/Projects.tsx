import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, ExternalLink, Github } from "lucide-react";
import { projectsAPI, type ProjectPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoProjects } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface ProjectItem extends ProjectPayload {
  _id: string;
  createdAt?: string;
}

const emptyProject: ProjectPayload = {
  id: "",
  title: "",
  description: "",
  date: "",
  image: "",
  galleryImage: "",
  goal: "",
  features: [],
  technologies: [],
  github: "",
  demo: "",
  tags: [],
  category: "Web",
  status: "In Progress",
};

const ProjectsPage = () => {
  const { isDemo } = useAuth();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProjectPayload | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const fireSuccess = (message: string) => {
    setShowSuccess(true);
    toast({ title: "Success", description: message });
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const fetchProjects = async () => {
    if (isDemo) {
      setProjects(demoProjects as ProjectItem[]);
      setLoading(false);
      return;
    }
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load projects", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, [isDemo]);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editId) {
        await projectsAPI.update(editId, editing, { image: imageFile, galleryImage: galleryImageFile, galleryImages: galleryImageFiles });
        fireSuccess("Project updated successfully");
      } else {
        await projectsAPI.create(editing, { image: imageFile, galleryImage: galleryImageFile, galleryImages: galleryImageFiles });
        fireSuccess("Project created successfully");
      }
      setEditing(null);
      setEditId(null);
      setImageFile(null);
      setGalleryImageFile(null);
      setGalleryImageFiles([]);
      fetchProjects();
    } catch {
      toast({ title: "Error", description: "Failed to save project", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await projectsAPI.delete(deleteId);
      fireSuccess("Project deleted");
      setDeleteId(null);
      fetchProjects();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  const addTech = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({ ...editing, technologies: [...editing.technologies, techInput.trim()] });
    setTechInput("");
  };

  const removeTech = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, technologies: editing.technologies.filter((_, i) => i !== idx) });
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...(editing.features || []), featureInput.trim()] });
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: (editing.features || []).filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Projects updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Projects</h1>
        <button
          onClick={() => {
            setEditing({ ...emptyProject });
            setEditId(null);
            setImageFile(null);
            setGalleryImageFile(null);
            setGalleryImageFiles([]);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Edit / Create form */}
      <ActionModal
        open={!!editing}
        title={editId ? "Edit Project" : "New Project"}
        onClose={() => {
          setEditing(null);
          setEditId(null);
          setImageFile(null);
          setGalleryImageFile(null);
          setGalleryImageFiles([]);
        }}
        maxWidthClassName="max-w-4xl"
      >
        {editing && (
          <div className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Title</label>
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Project ID (slug)</label>
              <input
                value={editing.id || ""}
                onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="active-harmony"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Category</label>
              <input
                value={editing.category || ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Web, Mobile, etc."
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Date</label>
              <input
                value={editing.date || ""}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Sep 2025"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Goal</label>
            <textarea
              value={editing.goal || ""}
              onChange={(e) => setEditing({ ...editing, goal: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Primary project objective"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Features</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(editing.features || []).map((feature, i) => (
                <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-accent/10 text-accent">
                  {feature}
                  <button onClick={() => removeFeature(i)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Add feature..."
              />
              <button onClick={addFeature} className="px-3 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-muted transition-colors">
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Technologies</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {editing.technologies.map((tech, i) => (
                <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                  {tech}
                  <button onClick={() => removeTech(i)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Add technology..."
              />
              <button onClick={addTech} className="px-3 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-muted transition-colors">
                Add
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">GitHub Link</label>
              <input
                value={editing.github}
                onChange={(e) => setEditing({ ...editing, github: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Demo Link</label>
              <input
                value={editing.demo}
                onChange={(e) => setEditing({ ...editing, demo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Cover Image Upload</label>
              {editing.image && (
                <p className="text-[10px] text-muted-foreground mb-1 truncate">Current: {editing.image}</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Primary Gallery Image Upload</label>
              {editing.galleryImage && (
                <p className="text-[10px] text-muted-foreground mb-1 truncate">Current: {editing.galleryImage}</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Gallery Images Upload (Multiple)</label>
            {editing.galleryImages && editing.galleryImages.length > 0 && (
              <p className="text-[10px] text-muted-foreground mb-1">Current gallery images: {editing.galleryImages.length}</p>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryImageFiles(Array.from(e.target.files || []))}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {galleryImageFiles.length > 0 && (
              <p className="text-[10px] text-primary mt-1">Selected {galleryImageFiles.length} new image(s)</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Status</label>
            <select
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value as "Completed" | "In Progress" })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all"
            >
              <Save size={16} /> Save Project
            </button>
          </div>
        )}
      </ActionModal>

      {/* Projects list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-4 rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">
          No projects yet. Click "Add Project" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project._id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-4 border border-border/40">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-display font-bold text-foreground truncate">{project.title}</h3>
                  {project.date && <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{project.date}</span>}
                  {project.category && <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent">{project.category}</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 4}</span>
                  )}
                </div>
                {project.features && project.features.length > 0 && (
                  <p className="text-[10px] text-muted-foreground mt-1">{project.features.length} feature(s)</p>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  project.status === "Completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {project.status}
                </span>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={14} />
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => {
                    setEditing({ ...project });
                    setEditId(project._id);
                    setImageFile(null);
                    setGalleryImageFile(null);
                    setGalleryImageFiles([]);
                  }}
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleteId(project._id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="This project will be permanently deleted. This action cannot be undone."
        confirmText="Delete Project"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProjectsPage;
