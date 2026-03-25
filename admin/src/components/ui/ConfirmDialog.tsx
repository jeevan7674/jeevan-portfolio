import { AlertTriangle } from "lucide-react";
import ActionModal from "./ActionModal";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message,
  onCancel,
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <ActionModal open={open} title={title} onClose={onCancel} maxWidthClassName="max-w-md">
      <div className="space-y-5">
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 rounded-lg bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle size={18} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-lg text-sm border border-border bg-secondary text-foreground hover:bg-muted transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-2 rounded-lg text-sm bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </ActionModal>
  );
};

export default ConfirmDialog;
