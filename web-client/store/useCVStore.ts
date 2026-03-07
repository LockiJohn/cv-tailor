import { create } from 'zustand';

interface CVState {
    view: 'upload' | 'report' | 'editor';
    isProcessing: boolean;
    originalResume: any | null;
    analysisData: any | null;
    tailoredResume: any | null;
    currentJd: string;
    targetLanguage: 'ITA' | 'ENG';

    // Actions
    setView: (view: 'upload' | 'report' | 'editor') => void;
    setIsProcessing: (loading: boolean) => void;
    setOriginalResume: (cv: any) => void;
    setAnalysisData: (data: any) => void;
    setTailoredResume: (cv: any) => void;
    setJd: (jd: string) => void;
    setTargetLanguage: (lang: 'ITA' | 'ENG') => void;
}

export const useCVStore = create<CVState>((set) => ({
    view: 'upload',
    isProcessing: false,
    originalResume: null,
    analysisData: null,
    tailoredResume: null,
    currentJd: '',
    targetLanguage: 'ENG',

    setView: (view) => set({ view }),
    setIsProcessing: (isProcessing) => set({ isProcessing }),
    setOriginalResume: (originalResume) => set({ originalResume }),
    setAnalysisData: (analysisData) => set({ analysisData }),
    setTailoredResume: (tailoredResume) => set({ tailoredResume }),
    setJd: (currentJd) => set({ currentJd }),
    setTargetLanguage: (targetLanguage) => set({ targetLanguage }),
}));
