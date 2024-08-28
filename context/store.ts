import { create } from "zustand";

export const useStore = create((set) => ({
  refresh: false,
  ChengeStatusFile: (val: any) => set((state: any) => ({ refresh: val })),

}));
