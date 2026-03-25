import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import DashboardPage from "./pages/Dashboard.tsx";
import AdminsPage from "./pages/Admins.tsx";
import ProjectsPage from "./pages/Projects.tsx";
import SkillsPage from "./pages/Skills.tsx";
import MessagesPage from "./pages/Messages.tsx";
import ResumePage from "./pages/Resume.tsx";
import AnalyticsPage from "./pages/Analytics.tsx";
import ExperiencePage from "./pages/Experience.tsx";
import AchievementsPage from "./pages/Achivements.tsx";
import CertificationsPage from "./pages/Certifications.tsx";
import ContactInfoPage from "./pages/contactInfo.tsx";
import AboutPage from "./pages/About.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="admins" element={<AdminsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="experience" element={<ExperiencePage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="certifications" element={<CertificationsPage />} />
              <Route path="contact-info" element={<ContactInfoPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="resume" element={<ResumePage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
