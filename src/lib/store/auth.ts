import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      checkAuth: () => get().isAuthenticated,
    }),
    {
      name: 'auth-storage',
    }
  )
);
