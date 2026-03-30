import { useState, useRef, useEffect } from "react";
import { Upload, FileText, Download, Eye } from "lucide-react";
import { resumeAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoResume } from "@/data/demoData";
import SuccessPing from "@/components/ui/SuccessPing";

const ResumePage = () => {
  const { isDemo } = useAuth();
  const [currentResume, setCurrentResume] = useState<{ url: string; downloadUrl?: string; uploadedAt: string | null } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fireSuccess = (message: string) => {
    setShowSuccess(true);
    toast({ title: "Success", description: message });
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const fetchResume = async () => {
    if (isDemo) {
      setCurrentResume(demoResume);
      setLoading(false);
      return;
    }
    try {
      const res = await resumeAPI.get();
      setCurrentResume(res.data);
    } catch {
      setCurrentResume(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResume(); }, [isDemo]);

  const handleViewOnline = () => {
    if (!currentResume?.url) {
      toast({ title: "Error", description: "Resume not available", variant: "destructive" });
      return;
    }
    window.open(currentResume.url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    if (!currentResume?.url) {
      toast({ title: "Error", description: "Resume not available", variant: "destructive" });
      return;
    }
    try {
      if (isDemo) {
        window.open(currentResume.url, "_blank", "noopener,noreferrer");
        return;
      }
      if (currentResume.downloadUrl) {
        window.open(currentResume.downloadUrl, "_blank", "noopener,noreferrer");
        return;
      }
      // Try to get signed download URL first
      const res = await resumeAPI.download();
      window.open(res.data.downloadUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback to force-download URL if endpoint call fails.
      const fallbackDownloadUrl = currentResume.url.includes("/raw/upload/")
        ? currentResume.url.replace("/raw/upload/", "/raw/upload/fl_attachment/")
        : currentResume.url;
      window.open(fallbackDownloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid file", description: "Please upload a PDF file", variant: "destructive" });
      return;
    }
    if (isDemo) {
      toast({ title: "Demo Mode", description: "Upload is disabled in demo mode" });
      return;
    }
    setUploading(true);
    try {
      await resumeAPI.upload(file);
      fireSuccess("Resume uploaded successfully");
      fetchResume();
    } catch {
      toast({ title: "Error", description: "Failed to upload resume", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <SuccessPing show={showSuccess} message="Resume updated" />
      <h1 className="text-2xl font-display font-bold text-foreground mb-8">Resume Manager</h1>

      <div className="glass-card p-8 rounded-xl max-w-xl">
        {loading ? (
          <div className="h-32 animate-pulse bg-secondary rounded-lg" />
        ) : currentResume ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Current Resume</p>
                <p className="text-xs text-muted-foreground">
                  Uploaded {currentResume.uploadedAt ? new Date(currentResume.uploadedAt).toLocaleDateString() : "recently"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleViewOnline}
                  title="View resume online"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={handleDownload}
                  title="Download resume"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || isDemo}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? "Uploading..." : isDemo ? "Upload disabled in demo" : "Replace Resume"}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText size={28} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">No resume uploaded yet</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || isDemo}
              className="flex items-center justify-center gap-2 mx-auto px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? "Uploading..." : "Upload Resume (PDF)"}
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept=".pdf"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ResumePage;
