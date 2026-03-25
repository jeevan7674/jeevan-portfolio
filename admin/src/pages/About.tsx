import { useEffect, useState } from "react";
import { Save, Pencil } from "lucide-react";
import { aboutAPI, type AboutPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoAbout } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import SuccessPing from "@/components/ui/SuccessPing";

const AboutPage = () => {
  const { isDemo } = useAuth();
  const [about, setAbout] = useState<AboutPayload>({
    headline: "",
    bio: [],
    initials: "",
  });
  const [loading, setLoading] = useState(true);
  const [bioText, setBioText] = useState("");
  const [editing, setEditing] = useState(false);
  const [draftAbout, setDraftAbout] = useState<AboutPayload>({
    headline: "",
    bio: [],
    initials: "",
  });
  const [draftBioText, setDraftBioText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isDemo) {
      setAbout(demoAbout);
      setBioText(demoAbout.bio.join("\n\n"));
      setLoading(false);
      return;
    }
    aboutAPI.get()
      .then((res) => {
        setAbout(res.data);
        setBioText(res.data.bio?.join("\n\n") || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isDemo]);

  const handleSave = async () => {
    const payload = { ...draftAbout, bio: draftBioText.split("\n\n").filter(Boolean) };
    if (isDemo) {
      setAbout(payload);
      setBioText(draftBioText);
      setEditing(false);
      toast({ title: "Demo Mode", description: "Preview updated in demo mode" });
      return;
    }
    try {
      await aboutAPI.update(payload);
      setAbout(payload);
      setBioText(draftBioText);
      setEditing(false);
      setShowSuccess(true);
      toast({ title: "Saved", description: "About section updated" });
      setTimeout(() => setShowSuccess(false), 1800);
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-16 animate-pulse" />)}</div>;
  }

  return (
    <div>
      <SuccessPing show={showSuccess} message="About updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">About Section</h1>
        <button
          onClick={() => {
            setDraftAbout(about);
            setDraftBioText(bioText);
            setEditing(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
          <Pencil size={16} /> Edit About
        </button>
      </div>

      <div className="glass-card p-6 rounded-xl space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Display Initials</label>
            <p className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm">{about.initials || "-"}</p>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Headline / Tagline</label>
            <p className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm">{about.headline || "-"}</p>
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
            Bio Paragraphs
          </label>
          <div className="space-y-2">
            {about.bio.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bio content yet.</p>
            ) : (
              about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-sm text-foreground/90 leading-relaxed">{paragraph}</p>
              ))
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{bioText.split("\n\n").filter(Boolean).length} paragraph(s)</p>
        </div>
      </div>

      <ActionModal
        open={editing}
        title="Edit About"
        onClose={() => setEditing(false)}
        maxWidthClassName="max-w-3xl"
      >
        <div className="space-y-5 pb-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Display Initials</label>
              <input
                value={draftAbout.initials}
                onChange={(e) => setDraftAbout({ ...draftAbout, initials: e.target.value })}
                placeholder="JR"
                maxLength={4}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Headline / Tagline</label>
              <input
                value={draftAbout.headline}
                onChange={(e) => setDraftAbout({ ...draftAbout, headline: e.target.value })}
                placeholder="Full-Stack Developer & Designer"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              Bio Paragraphs <span className="text-muted-foreground/60">(separate paragraphs with a blank line)</span>
            </label>
            <textarea
              value={draftBioText}
              onChange={(e) => setDraftBioText(e.target.value)}
              rows={10}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Write your bio here...&#10;&#10;Separate paragraphs with a blank line."
            />
            <p className="text-xs text-muted-foreground mt-1">{draftBioText.split("\n\n").filter(Boolean).length} paragraph(s)</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg text-sm border border-border bg-secondary text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </ActionModal>
    </div>
  );
};

export default AboutPage;
