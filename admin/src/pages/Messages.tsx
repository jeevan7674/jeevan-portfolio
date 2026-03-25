import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Clock } from "lucide-react";
import { contactAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoMessages } from "@/data/demoData";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SuccessPing from "@/components/ui/SuccessPing";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

const MessagesPage = () => {
  const { isDemo } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const fireSuccess = (message: string) => {
    setShowSuccess(true);
    toast({ title: "Success", description: message });
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const fetchMessages = async () => {
    if (isDemo) {
      setMessages(demoMessages);
      setLoading(false);
      return;
    }
    try {
      const res = await contactAPI.getAll();
      setMessages(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load messages", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [isDemo]);

  const handleMarkRead = async (id: string) => {
    if (isDemo) {
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, status: "read" } : m));
      return;
    }
    try {
      await contactAPI.markRead(id);
      fetchMessages();
    } catch {
      // silent
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    if (isDemo) {
      setMessages((prev) => prev.filter((m) => m._id !== deleteId));
      if (selected?._id === deleteId) setSelected(null);
      fireSuccess("Message deleted (demo)");
      setDeleteId(null);
      return;
    }
    try {
      await contactAPI.delete(deleteId);
      fireSuccess("Message deleted");
      if (selected?._id === deleteId) setSelected(null);
      setDeleteId(null);
      fetchMessages();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div>
      <SuccessPing show={showSuccess} message="Messages updated" />
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>
        {unreadCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-2">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="glass-card p-4 rounded-xl h-16 animate-pulse" />)
          ) : messages.length === 0 ? (
            <div className="glass-card p-8 rounded-xl text-center text-muted-foreground text-sm">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => { setSelected(msg); if (msg.status === "unread") handleMarkRead(msg._id); }}
                className={`w-full text-left glass-card p-4 rounded-xl transition-all ${
                  selected?._id === msg._id ? "border-primary/30" : ""
                } ${msg.status === "unread" ? "border-l-2 border-l-primary" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{msg.name}</span>
                  {msg.status === "unread" ? (
                    <Mail size={12} className="text-primary shrink-0" />
                  ) : (
                    <MailOpen size={12} className="text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
              </button>
            ))
          )}
        </div>

        <div className="md:col-span-3">
          {selected ? (
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">
                    {selected.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {new Date(selected.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setDeleteId(selected._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-xl text-center text-muted-foreground text-sm">
              Select a message to view
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Message"
        message="This message will be permanently deleted."
        confirmText="Delete Message"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default MessagesPage;
