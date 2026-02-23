import { create } from 'zustand';

interface CVState {
    originalResume: any | null;
    tailoredVariants: any[];
    currentJd: string;
    setResume: (cv: any) => void;
    setJd: (jd: string) => void;
    addVariant: (variant: any) => void;
}

export const useCVStore = create<CVState>((set) => ({
    originalResume: null,
    tailoredVariants: [],
    currentJd: '',
    setResume: (cv) => set({ originalResume: cv }),
    setJd: (jd) => set({ currentJd: jd }),
    addVariant: (variant) => set((state) => ({ tailoredVariants: [...state.tailoredVariants, variant] })),
}));
