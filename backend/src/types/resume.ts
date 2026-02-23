export interface ResumeSchema {
    basics: {
        name: string;
        label: string;
        email: string;
        phone: string;
        summary: string;
    };
    work: WorkExperience[];
    skills: SkillCategory[];
    languages: Language[];
}

export interface WorkExperience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    highlights: BulletPoint[];
}

export interface BulletPoint {
    id: string;
    original: string;
    tailored?: string;
    tags: string[];
    status: 'original' | 'suggested' | 'accepted' | 'rejected' | 'hallucination_check';
}

export interface SkillCategory {
    category: string;
    keywords: string[];
}

export interface Language {
    language: string;
    fluency: string;
}
