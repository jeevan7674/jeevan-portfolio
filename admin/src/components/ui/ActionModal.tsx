import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type ActionModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
};

const ActionModal = ({
  open,
  title,
  onClose,
  children,
  maxWidthClassName = "max-w-3xl",
}: ActionModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        className={`relative h-screen w-full ${maxWidthClassName} ml-auto overflow-y-auto border-l border-border/50 bg-card/95 p-5 sm:p-6 shadow-2xl animate-drawer-in`}
      >
        <div className="sticky top-0 z-10 -mx-5 sm:-mx-6 mb-5 px-5 sm:px-6 py-3 bg-card/95 border-b border-border/40 backdrop-blur">
          <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ActionModal;
