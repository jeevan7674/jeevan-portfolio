import { useEffect, useState } from "react";
import { Save, User, Mail, MapPin, Phone, Github, Linkedin, Globe, Pencil } from "lucide-react";
import { contactInfoAPI, type ContactInfoPayload } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoContactInfo } from "@/data/demoData";
import ActionModal from "@/components/ui/ActionModal";
import SuccessPing from "@/components/ui/SuccessPing";

const ContactInfoPage = () => {
  const { isDemo } = useAuth();
  const [info, setInfo] = useState<ContactInfoPayload>({
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    availability: "Open to opportunities",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draftInfo, setDraftInfo] = useState<ContactInfoPayload>({
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    availability: "Open to opportunities",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isDemo) {
      setInfo(demoContactInfo);
      setLoading(false);
      return;
    }
    contactInfoAPI.get()
      .then((res) => setInfo(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isDemo]);

  const handleSave = async () => {
    if (isDemo) {
      setInfo(draftInfo);
      setEditing(false);
      toast({ title: "Demo Mode", description: "Preview updated in demo mode" });
      return;
    }
    try {
      await contactInfoAPI.update(draftInfo);
      setInfo(draftInfo);
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1800);
      toast({ title: "Saved", description: "Contact info updated" });
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  const fields: { key: keyof ContactInfoPayload; label: string; icon: typeof Mail; placeholder: string }[] = [
    { key: "name", label: "Full Name", icon: User, placeholder: "R.Jeevan Reddy" },
    { key: "email", label: "Email", icon: Mail, placeholder: "your@email.com" },
    { key: "phone", label: "Phone", icon: Phone, placeholder: "+91 ..." },
    { key: "location", label: "Location", icon: MapPin, placeholder: "City, State" },
    { key: "github", label: "GitHub URL", icon: Github, placeholder: "https://github.com/..." },
    { key: "linkedin", label: "LinkedIn URL", icon: Linkedin, placeholder: "https://linkedin.com/in/..." },
    { key: "website", label: "Website", icon: Globe, placeholder: "https://..." },
    { key: "availability", label: "Availability Status", icon: User, placeholder: "Open to opportunities" },
  ];

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3, 4].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-16 animate-pulse" />)}</div>;
  }

  return (
    <div>
      <SuccessPing show={showSuccess} message="Contact info updated" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Contact Info</h1>
        <button
          onClick={() => {
            setDraftInfo(info);
            setEditing(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all">
          <Pencil size={16} /> Edit Contact Info
        </button>
      </div>

      <div className="glass-card p-6 rounded-xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                <Icon size={12} /> {label}
              </label>
              <p className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm break-words">
                {info[key] || placeholder}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ActionModal
        open={editing}
        title="Edit Contact Info"
        onClose={() => setEditing(false)}
        maxWidthClassName="max-w-2xl"
      >
        <div className="space-y-4 pb-2">
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  <Icon size={12} /> {label}
                </label>
                <input
                  value={draftInfo[key] || ""}
                  onChange={(e) => setDraftInfo({ ...draftInfo, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
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

export default ContactInfoPage;
