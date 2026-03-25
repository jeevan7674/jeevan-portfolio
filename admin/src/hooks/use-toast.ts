export type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = ({ title, description }: ToastOptions) => {
    if (typeof window !== "undefined") {
      const message = description ? `${title}: ${description}` : title;
      console.info(message);
    }
  };

  return { toast };
}
