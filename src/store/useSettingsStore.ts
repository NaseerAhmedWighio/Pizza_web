import { create } from 'zustand';

interface SettingsState {
  settings: any | null;
  loading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  loading: true,
  fetchSettings: async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      set({ settings: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  }
}));
