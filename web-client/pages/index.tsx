import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Globe, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import { ErrorTracker } from '../services/ErrorTracker';

// --- Translations ---
const translations = {
    en: {
        title: "Michele | BA Analyst, Tech Savvy and Finance",
        greeting: "Hi, I'm Michele.",
        role: "BA Analyst, Tech Savvy and Finance.",
        intro: "Digital Engineer. Business Analyst. Investor. Traveler. AI Lover. Curious mind.\n\nAll of the above. None of the above.",
        emailBtn: "Email Me",
        experienceTitle: "Work Experience",
        projectsTitle: "Selected Projects",
        blogTitle: "Latest Articles",
        contactTitle: "Get In Touch",
        contactText: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        footer: "Crafted with care."
    },
    it: {
        title: "Michele | BA Analyst, Tech Savvy and Finance",
        greeting: "Ciao, sono Michele.",
        role: "BA Analyst, Tech Savvy e Finance.",
        intro: "Digital Engineer. Business Analyst. Investor. Traveler. AI Lover. Curious mind.\n\nAll of the above. None of the above.",
        emailBtn: "Scrivimi",
        experienceTitle: "Esperienza Lavorativa",
        projectsTitle: "Progetti Selezionati",
        blogTitle: "Ultimi Articoli",
        contactTitle: "Contattami",
        contactText: "Sono sempre aperto a discutere di nuovi progetti, idee creative o opportunità per far parte della tua visione.",
        footer: "Creato con cura."
    }
};

// --- Data ---
const projects = [
    {
        title: "Ailingo",
        descriptionEn: "An AI-powered language learning platform focusing on personalized exercises and dynamic content generation.",
        descriptionIt: "Una piattaforma per l'apprendimento delle lingue basata sull'IA, focalizzata su esercizi personalizzati e generazione dinamica dei contenuti.",
        tags: ["Next.js", "TypeScript", "Python", "FastAPI", "GenAI"],
        year: "2025",
        previewGradient: "linear-gradient(135deg, #10b98122, #06b6d422)"
    },
    {
        title: "CV Tailor AI",
        descriptionEn: "An intelligent tool that automatically tailors your resume to specific job descriptions using advanced LLM analysis.",
        descriptionIt: "Uno strumento intelligente che adatta automaticamente il tuo CV a specifiche offerte di lavoro utilizzando l'analisi LLM avanzata.",
        tags: ["React", "Express", "Node.js", "Tailwind"],
        year: "2024",
        previewGradient: "linear-gradient(135deg, #8b5cf622, #ec489922)"
    },
    {
        title: "Worms Bazooka & Space Impact",
        descriptionEn: "Modern web-based recreations of classic games, built from scratch using HTML5 Canvas and vanilla JavaScript.",
        descriptionIt: "Vero e proprio remake web di giochi classici, creati da zero usando HTML5 Canvas e vanilla JavaScript.",
        tags: ["Game Dev", "JavaScript", "Canvas API"],
        year: "2024",
        previewGradient: "linear-gradient(135deg, #f59e0b22, #ef444422)"
    }
];

const experience = [
    {
        roleEn: "Digital Process Engineer / Tech Business Analyst",
        roleIt: "Digital Process Engineer / Tech Business Analyst",
        company: "Moltiply Group",
        period: "Nov 2022 - Present",
        descriptionEn: "Driving digital transformation in credit lending for SMEs. Designing end-to-end digital processes using Agile methodologies. Analyzing business needs and translating them into technical requirements (User Stories, Azure DevOps). Implementing data analytics solutions with SQL, Python, and Power BI.",
        descriptionIt: "Guida della trasformazione digitale nel credito alle PMI. Progettazione di flussi digitali end-to-end secondo metodologie Agile. Analisi delle esigenze di business e traduzione in requisiti tecnici (User Stories, Azure DevOps). Implementazione di soluzioni data analytics con SQL, Python e Power BI."
    },
    {
        roleEn: "Credit Risk & Fraud Analyst",
        roleIt: "Analista Credit Risk e Frodi",
        company: "Gruppo Montenegro",
        period: "Dec 2018 - Jan 2021",
        descriptionEn: "Conducted anti-fraud investigations and creditworthiness assessments. Analyzed financial statements and payment trends to mitigate risk. Managed reporting for management and sales teams.",
        descriptionIt: "Conduzione di indagini antifrode e valutazione dell'affidabilità creditizia dei clienti. Analisi di bilancio e dei trend di pagamento per la mitigazione del rischio. Gestione della reportistica per il management e la forza vendita."
    }
];

const blogPosts = [
    {
        titleEn: "Goodhart's Law Is the Problem of the Century",
        titleIt: "La Legge di Goodhart è il problema del secolo",
        date: "March 8, 2026",
        readTimeEn: "8 min read",
        readTimeIt: "8 min di lettura",
        link: "/blog/goodharts-law"
    },
    {
        titleEn: "The Future of AI in Language Learning",
        titleIt: "Il Futuro dell'IA nell'Apprendimento delle Lingue",
        date: "March 5, 2026",
        readTimeEn: "5 min read",
        readTimeIt: "5 min di lettura",
        link: "#"
    },
    {
        titleEn: "Why Next.js is perfect for Portfolio Sites",
        titleIt: "Perché Next.js è perfetto per siti Portfolio",
        date: "February 20, 2026",
        readTimeEn: "4 min read",
        readTimeIt: "4 min di lettura",
        link: "#"
    }
];

// --- Flower of Life SVG Component ---
const FlowerOfLife = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="15" />
        <circle cx="50" cy="35" r="15" />
        <circle cx="63" cy="42.5" r="15" />
        <circle cx="63" cy="57.5" r="15" />
        <circle cx="50" cy="65" r="15" />
        <circle cx="37" cy="57.5" r="15" />
        <circle cx="37" cy="42.5" r="15" />
    </svg>
);


export default function Portfolio() {
    const [lang, setLang] = useState<'en' | 'it'>('en');

    useEffect(() => {
        ErrorTracker.init();
    }, []);

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'it' : 'en');
    };

    const t = translations[lang];

    return (
        <Layout>
            <Head>
                <title>{t.title}</title>
                <meta name="description" content="Portfolio and Resume of Michele." />
            </Head>

            {/* Custom Styles for Minimal Theme */}
            <style jsx global>{`
                :root {
                    --minimal-bg: #0a0a0a;
                    --minimal-surface: #121212;
                    --minimal-text: #eaeaea;
                    --minimal-muted: #888888;
                    --minimal-border: #222222;
                    --minimal-accent: #ffffff;
                }
                
                body {
                    background-color: var(--minimal-bg) !important;
                    color: var(--minimal-text) !important;
                    font-family: 'Inter', 'Outfit', sans-serif;
                }

                .minimal-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 2rem;
                    color: var(--minimal-accent);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .section-title::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--minimal-border);
                    margin-top: 4px;
                }

                /* Flower of Life Header Animation */
                .flower-wrapper {
                    width: 64px;
                    height: 64px;
                    margin-bottom: 2rem;
                    color: var(--minimal-muted);
                    animation: spin-slow 60s linear infinite;
                    opacity: 0.8;
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Layout overrides for header to keep it clean */
                header { display: none !important; }

                /* Toggle Switch */
                .lang-toggle {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: var(--minimal-surface);
                    border: 1px solid var(--minimal-border);
                    border-radius: 20px;
                    padding: 0.4rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    color: var(--minimal-text);
                    z-index: 100;
                    font-size: 0.85rem;
                    transition: border-color 0.2s;
                }
                .lang-toggle:hover {
                    border-color: var(--minimal-muted);
                }
            `}</style>

            <button className="lang-toggle" onClick={toggleLanguage}>
                <Globe size={14} /> {lang === 'en' ? 'IT' : 'EN'}
            </button>

            <div className="minimal-container animate-fade">

                {/* Hero Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <div className="flower-wrapper">
                        <FlowerOfLife />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.04em', marginBottom: '1rem', lineHeight: 1.1 }}>
                        {t.greeting}<br />
                        <span style={{ color: 'var(--minimal-muted)' }}>{t.role}</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--minimal-muted)', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {t.intro}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="mailto:contact@example.com" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--minimal-surface)', borderColor: 'var(--minimal-border)', color: 'var(--minimal-text)' }}>
                            <Mail size={16} /> {t.emailBtn}
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'transparent', color: 'var(--minimal-muted)' }}>
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com/in/michele-minardi-/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'transparent', color: 'var(--minimal-muted)' }}>
                            <Linkedin size={18} />
                        </a>
                    </div>
                </section>

                {/* Experience Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{t.experienceTitle}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {experience.map((job, index) => (
                            <div key={index} style={{ borderLeft: '1px solid var(--minimal-border)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--minimal-text)' }}>{lang === 'en' ? job.roleEn : job.roleIt}</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--minimal-muted)', fontFamily: 'monospace' }}>{job.period}</span>
                                </div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--minimal-muted)', marginBottom: '0.75rem', fontWeight: 400 }}>{job.company}</h4>
                                <p style={{ color: '#aaaaaa', lineHeight: 1.6 }}>{lang === 'en' ? job.descriptionEn : job.descriptionIt}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section with Previews */}
                <section style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{t.projectsTitle}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {projects.map((project, index) => (
                            <div key={index} style={{
                                background: 'transparent',
                                border: '1px solid var(--minimal-border)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease, border-color 0.2s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = 'var(--minimal-muted)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--minimal-border)';
                                }}
                            >
                                {/* Visual Preview Box */}
                                <div style={{
                                    height: '140px',
                                    background: project.previewGradient,
                                    borderBottom: '1px solid var(--minimal-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* Placeholder for project image/icon */}
                                    <ExternalLink size={32} opacity={0.3} color="var(--minimal-accent)" />
                                </div>

                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--minimal-text)' }}>{project.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--minimal-muted)', fontFamily: 'monospace' }}>{project.year}</span>
                                    </div>
                                    <p style={{ color: 'var(--minimal-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5, flex: 1 }}>
                                        {lang === 'en' ? project.descriptionEn : project.descriptionIt}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {project.tags.map(tag => (
                                            <span key={tag} style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--minimal-muted)',
                                                background: '#090909',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                border: '1px solid var(--minimal-border)'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Blog Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{t.blogTitle}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {blogPosts.map((post, index) => (
                            <a key={index} href={post.link} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem',
                                border: '1px solid var(--minimal-border)',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'background 0.2s',
                                background: 'transparent'
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--minimal-surface)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--minimal-text)' }}>{lang === 'en' ? post.titleEn : post.titleIt}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--minimal-muted)' }}>{post.date} &bull; {lang === 'en' ? post.readTimeEn : post.readTimeIt}</span>
                                </div>
                                <BookOpen size={18} color="var(--minimal-muted)" />
                            </a>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section style={{ marginBottom: '4rem', padding: '4rem 2rem', background: 'var(--minimal-surface)', borderRadius: '16px', border: '1px solid var(--minimal-border)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--minimal-text)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{t.contactTitle}</h2>
                    <p style={{ color: 'var(--minimal-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
                        {t.contactText}
                    </p>
                    <a href="mailto:contact@example.com" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 500, fontSize: '1.05rem' }}>
                        <Mail size={18} /> {t.emailBtn}
                    </a>
                </section>

                {/* Footer */}
                <footer style={{ marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid var(--minimal-border)', textAlign: 'center', color: 'var(--minimal-muted)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Michele. {t.footer}</p>
                </footer>

            </div>
        </Layout>
    );
}
