import { CheckCircle2 } from "lucide-react";

type SuccessPingProps = {
  show: boolean;
  message?: string;
};

const SuccessPing = ({ show, message = "Saved successfully" }: SuccessPingProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-[60] pointer-events-none animate-success-in">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-emerald-300 shadow-lg shadow-emerald-500/15">
        <CheckCircle2 size={16} />
        <span className="text-xs font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SuccessPing;
