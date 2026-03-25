type ApiResponse<T> = Promise<{ data: T }>;

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "http://localhost:5000/api";

async function request<T>(path: string, init?: RequestInit): ApiResponse<T> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("admin_token") : null;
  const isFormData = init?.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }

  const data = (await res.json()) as T;
  return { data };
}

export type AboutPayload = {
  headline: string;
  bio: string[];
  initials: string;
};

export type AchievementPayload = {
  title: string;
  description: string;
  date: string;
  icon: string;
};

export type CertificationPayload = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
};

export type ContactInfoPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  availability: string;
};

export type ExperiencePayload = {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
};

export type ProjectPayload = {
  id?: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
  galleryImage?: string;
  galleryImages?: string[];
  goal?: string;
  features?: string[];
  technologies: string[];
  github: string;
  demo: string;
  tags: string[];
  category: string;
  status: "Completed" | "In Progress";
};

const toProjectFormData = (payload: ProjectPayload, files?: { image?: File | null; galleryImage?: File | null; galleryImages?: File[] | null }) => {
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  if (files?.image) {
    formData.append("image", files.image);
  }
  if (files?.galleryImage) {
    formData.append("galleryImage", files.galleryImage);
  }
  if (files?.galleryImages?.length) {
    files.galleryImages.forEach((file) => formData.append("galleryImages", file));
  }
  return formData;
};

export type SkillPayload = {
  name: string;
  color: string;
  group: string;
};

type MessageItem = {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "unread" | "read";
};

type AnalyticsData = {
  totalVisits: number;
  pageViews: { page: string; count: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  recentVisits: { page: string; timestamp: string; deviceType: string }[];
};

export const aboutAPI = {
  get: () => request<AboutPayload>("/about"),
  update: (payload: AboutPayload) => request<AboutPayload>("/about", { method: "PUT", body: JSON.stringify(payload) }),
};

export const achievementsAPI = {
  getAll: () => request<Array<AchievementPayload & { _id: string }>>("/achievements"),
  create: (payload: AchievementPayload) => request<unknown>("/achievements", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: AchievementPayload) =>
    request<unknown>(`/achievements/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id: string) => request<unknown>(`/achievements/${id}`, { method: "DELETE" }),
};

export const analyticsAPI = {
  getStats: () => request<AnalyticsData>("/analytics/stats"),
  track: (page: string, deviceType: "desktop" | "mobile" | "tablet") =>
    request<unknown>("/analytics/track", { method: "POST", body: JSON.stringify({ page, deviceType }) }),
};

export const certificationsAPI = {
  getAll: () => request<Array<CertificationPayload & { _id: string }>>("/certifications"),
  create: (payload: CertificationPayload) => request<unknown>("/certifications", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: CertificationPayload) =>
    request<unknown>(`/certifications/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id: string) => request<unknown>(`/certifications/${id}`, { method: "DELETE" }),
};

export const contactInfoAPI = {
  get: () => request<ContactInfoPayload>("/contact-info"),
  update: (payload: ContactInfoPayload) => request<unknown>("/contact-info", { method: "PUT", body: JSON.stringify(payload) }),
};

export const experienceAPI = {
  getAll: () => request<Array<ExperiencePayload & { _id: string }>>("/experience"),
  create: (payload: ExperiencePayload) => request<unknown>("/experience", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: ExperiencePayload) =>
    request<unknown>(`/experience/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id: string) => request<unknown>(`/experience/${id}`, { method: "DELETE" }),
};

export const projectsAPI = {
  getAll: () => request<Array<ProjectPayload & { _id: string }>>("/projects"),
  create: (payload: ProjectPayload, files?: { image?: File | null; galleryImage?: File | null; galleryImages?: File[] | null }) =>
    request<unknown>("/projects", { method: "POST", body: toProjectFormData(payload, files) }),
  update: (id: string, payload: ProjectPayload, files?: { image?: File | null; galleryImage?: File | null; galleryImages?: File[] | null }) =>
    request<unknown>(`/projects/${id}`, { method: "PUT", body: toProjectFormData(payload, files) }),
  delete: (id: string) => request<unknown>(`/projects/${id}`, { method: "DELETE" }),
};

export const skillsAPI = {
  getAll: () => request<Array<SkillPayload & { _id: string }>>("/skills"),
  create: (payload: SkillPayload) => request<unknown>("/skills", { method: "POST", body: JSON.stringify(payload) }),
  delete: (id: string) => request<unknown>(`/skills/${id}`, { method: "DELETE" }),
};

export const contactAPI = {
  create: (payload: { name: string; email: string; message: string }) =>
    request<unknown>("/contact", { method: "POST", body: JSON.stringify(payload) }),
  getAll: () => request<MessageItem[]>("/contact"),
  markRead: (id: string) => request<unknown>(`/contact/${id}/read`, { method: "PATCH" }),
  delete: (id: string) => request<unknown>(`/contact/${id}`, { method: "DELETE" }),
};

export const resumeAPI = {
  get: () => request<{ url: string; downloadUrl?: string; uploadedAt: string | null }>("/resume"),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<unknown>("/resume", { method: "PUT", body: formData });
  },
  download: () => request<{ downloadUrl: string }>("/resume/download"),
};

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const adminsAPI = {
  getAll: () => request<AdminUser[]>("/admins"),
  create: (payload: { name: string; email: string; password: string; role: "admin" | "editor" }) =>
    request<AdminUser>("/admins", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: { name?: string; role?: string; active?: boolean }) =>
    request<AdminUser>(`/admins/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id: string) => request<unknown>(`/admins/${id}`, { method: "DELETE" }),
};
