import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "http://localhost:5000/api";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  active: boolean;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isDemo: boolean;
  admin: AdminUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginDemo: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "admin_token";
const DEMO_KEY = "admin_demo";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    const savedDemo = window.localStorage.getItem(DEMO_KEY) === "1";

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setIsDemo(false);
    } else if (savedDemo) {
      setIsAuthenticated(true);
      setIsDemo(true);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    const data = (await res.json()) as { token: string; admin: AdminUser };

    setToken(data.token);
    setAdmin(data.admin);
    setIsAuthenticated(true);
    setIsDemo(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOKEN_KEY, data.token);
      window.localStorage.removeItem(DEMO_KEY);
    }
  }, []);

  const loginDemo = useCallback(() => {
    setIsAuthenticated(true);
    setIsDemo(true);
    setToken(null);
    setAdmin(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(DEMO_KEY, "1");
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsDemo(false);
    setToken(null);
    setAdmin(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(DEMO_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isDemo, admin, token, login, logout, loginDemo }),
    [isAuthenticated, isDemo, admin, token, login, logout, loginDemo],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
