import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <AdminSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="relative flex-1 overflow-auto">
        <div className="sticky top-0 z-20 md:hidden border-b border-border/50 bg-background/90 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-sm font-display font-semibold text-foreground">Admin Panel</h2>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg border border-border bg-secondary text-foreground"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl p-3 md:p-8">
          <div className="rounded-2xl border border-border/40 bg-card/30 p-4 md:p-6 backdrop-blur-xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
