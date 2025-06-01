// stores/useProjectCountStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectCountState {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useProjectCountStore = create(
  persist<ProjectCountState>(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "project-count-storage", // Key in localStorage
    }
  )
);
