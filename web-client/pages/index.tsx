import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Github, Linkedin, Mail, ExternalLink, Globe, BookOpen, Sparkles, TrendingUp, Gamepad2, Home, Briefcase, Code, LineChart, MessageSquare, Link as LinkIcon } from 'lucide-react';
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
        footer: "Crafted with care.",
        funOn: "✦ Fun Mode",
        funOff: "✦ Minimal",
        financeTitle: "Financial Portfolio (Facsimile)",
        financeDisclaimer: "* Not financial advice. This is a facsimile portfolio.",
        gamesTitle: "Game Time ✨",
        gamesDesc: "Experimental games built 100% via Agentic AI Coding.",
        menuHome: "Home",
        menuExperience: "Experience",
        menuProjects: "Projects",
        menuFinance: "Portfolio",
        menuGames: "Games",
        menuBlog: "Blog",
        menuContact: "Contact",
        menuExternal: "External Links"
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
        footer: "Creato con cura.",
        funOn: "✦ Fun Mode",
        funOff: "✦ Minimal",
        financeTitle: "Portafoglio Finanziario (Facsimile)",
        financeDisclaimer: "* Non sono consigli finanziari. Questo è un portafoglio facsimile.",
        gamesTitle: "Area Svago ✨",
        gamesDesc: "Giochi sperimentali creati al 100% tramite Agentic AI Coding.",
        menuHome: "Home",
        menuExperience: "Esperienza",
        menuProjects: "Progetti",
        menuFinance: "Portafoglio",
        menuGames: "Giochi",
        menuBlog: "Blog",
        menuContact: "Contatti",
        menuExternal: "Link Esterni"
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
        previewGradient: "linear-gradient(135deg, #10b98122, #06b6d422)",
        funGradient: "linear-gradient(135deg, #06b6d455, #10b98155)",
    },
    {
        title: "CV Tailor AI",
        descriptionEn: "An intelligent tool that automatically tailors your resume to specific job descriptions using advanced LLM analysis.",
        descriptionIt: "Uno strumento intelligente che adatta automaticamente il tuo CV a specifiche offerte di lavoro utilizzando l'analisi LLM avanzata.",
        tags: ["React", "Express", "Node.js", "Tailwind"],
        year: "2024",
        previewGradient: "linear-gradient(135deg, #8b5cf622, #ec489922)",
        funGradient: "linear-gradient(135deg, #c084fc55, #ec489955)",
    },
    {
        title: "OpenPrometeo",
        descriptionEn: "An Instagram philosophy & art page exploring mental models, existential themes, and visual storytelling. 12K+ followers, 1400+ posts. The folio between Psychology and Aesthetics.",
        descriptionIt: "Una pagina Instagram di Filosofia e Arte che esplora modelli mentali, temi esistenziali e visual storytelling. 12K+ follower, 1400+ post. Il confine tra Psicologia ed Estetica.",
        tags: ["Philosophy", "Visual Art", "Storytelling", "12K+ followers"],
        year: "2020–",
        previewGradient: "linear-gradient(135deg, #7c3aed22, #a78bfa22)",
        funGradient: "linear-gradient(135deg, #7c3aed66, #fbbf2444)",
        link: "https://www.instagram.com/openprometeo_"
    },
    {
        title: "Worms Bazooka & Space Impact",
        descriptionEn: "Modern web-based recreations of classic games, built from scratch using HTML5 Canvas and vanilla JavaScript.",
        descriptionIt: "Vero e proprio remake web di giochi classici, creati da zero usando HTML5 Canvas e vanilla JavaScript.",
        tags: ["Game Dev", "JavaScript", "Canvas API"],
        year: "2024",
        previewGradient: "linear-gradient(135deg, #f59e0b22, #ef444422)",
        funGradient: "linear-gradient(135deg, #fbbf2455, #ef444455)",
        link: null
    }
];

const games = [
    {
        title: "Worms Bazooka & Space Impact",
        descEn: "Modern web-based recreations of classic games, built from scratch using HTML5 Canvas, physics, and vanilla JavaScript.",
        descIt: "Remake web di giochi classici, creati da zero usando HTML5 Canvas, fisica e vanilla JavaScript.",
        link: "#",
    },
    {
        title: "Retro Snake AI",
        descEn: "Classic Snake but the apples try to run away from you using pathfinding algorithms.",
        descIt: "Il classico Snake, ma le mele cercano di scappare usando algoritmi di pathfinding.",
        link: "#",
    },
    {
        title: "Cyber-Pong 2077",
        descEn: "Neon-lit, high-speed pong with power-ups and particle explosions. Pure chaotic fun.",
        descIt: "Pong ad alta velocità e luci al neon, con potenziamenti ed esplosioni di particelle. Puro caos.",
        link: "#",
    }
];

const financialAssets = [
    { ticker: "MSTR", name: "MicroStrategy", price: "$1,625.30", return: "+412.8%", isPositive: true },
    { ticker: "NVDA", name: "Nvidia", price: "$875.28", return: "+185.4%", isPositive: true },
    { ticker: "AMD", name: "AMD", price: "$180.45", return: "+65.2%", isPositive: true },
    { ticker: "TSM", name: "TSMC", price: "$145.20", return: "+42.5%", isPositive: true },
    { ticker: "MSFT", name: "Microsoft", price: "$420.55", return: "+58.7%", isPositive: true },
    { ticker: "AMZN", name: "Amazon", price: "$178.15", return: "+52.3%", isPositive: true },
    { ticker: "GOOGL", name: "Alphabet", price: "$152.00", return: "+40.1%", isPositive: true },
    { ticker: "SONY", name: "Sony Group", price: "$85.50", return: "+12.3%", isPositive: true },
    { ticker: "CY4.MI", name: "Cy4Gate", price: "€5.20", return: "-8.5%", isPositive: false },
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
        titleEn: "On the Democratization of Software Creation",
        titleIt: "Sulla democratizzazione della creazione di software",
        date: "March 8, 2026",
        readTimeEn: "12 min read",
        readTimeIt: "12 min di lettura",
        link: "/blog/agentic-coding"
    },
    {
        titleEn: "All Measures Are Hackable",
        titleIt: "Tutte le misure sono hackerabili",
        date: "March 8, 2026",
        readTimeEn: "7 min read",
        readTimeIt: "7 min di lettura",
        link: "/blog/goodharts-law"
    },
    {
        titleEn: "On Money Creation",
        titleIt: "Sulla creazione del denaro",
        date: "March 8, 2026",
        readTimeEn: "9 min read",
        readTimeIt: "9 min di lettura",
        link: "/blog/money-creation"
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

// --- Sacred Geometry SVG Background ---
const SacredGeoBg = () => (
    <svg
        viewBox="0 0 800 800"
        style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vmax', height: '100vmax',
            opacity: 0.06, pointerEvents: 'none', zIndex: 0,
            animation: 'spin-bg 120s linear infinite'
        }}
        fill="none" stroke="#c084fc" strokeWidth="0.8"
    >
        {/* Flower of Life - large central */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 400 + 80 * Math.cos(rad);
            const cy = 400 + 80 * Math.sin(rad);
            return <circle key={i} cx={cx} cy={cy} r={80} />;
        })}
        <circle cx="400" cy="400" r="80" />
        {/* Outer ring */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 400 + 160 * Math.cos(rad);
            const cy = 400 + 160 * Math.sin(rad);
            return <circle key={`o${i}`} cx={cx} cy={cy} r={80} />;
        })}
        {/* Metatron's cube lines */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
            const r = (a * Math.PI) / 180;
            return [0, 60, 120, 180, 240, 300].map((b, j) => {
                const r2 = (b * Math.PI) / 180;
                return <line key={`l${i}${j}`}
                    x1={400 + 160 * Math.cos(r)} y1={400 + 160 * Math.sin(r)}
                    x2={400 + 160 * Math.cos(r2)} y2={400 + 160 * Math.sin(r2)}
                />;
            });
        })}
        {/* Outer big circles */}
        <circle cx="400" cy="400" r="240" />
        <circle cx="400" cy="400" r="320" />
        <circle cx="400" cy="400" r="160" />
    </svg>
);

// --- Flower of Life SVG (hero icon) ---
const FlowerOfLife = ({ funMode }: { funMode: boolean }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none"
        stroke={funMode ? '#fbbf24' : 'currentColor'} strokeWidth="0.5"
        style={{ filter: funMode ? 'drop-shadow(0 0 8px #fbbf2488)' : 'none' }}>
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
    const [funMode, setFunMode] = useState(false);

    useEffect(() => {
        ErrorTracker.init();
    }, []);

    const t = translations[lang];

    return (
        <Layout>
            <Head>
                <title>{t.title}</title>
                <meta name="description" content="Portfolio and Resume of Michele." />
            </Head>

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
                    background-color: ${funMode ? '#0d0520' : 'var(--minimal-bg)'} !important;
                    color: ${funMode ? '#f0e6ff' : 'var(--minimal-text)'} !important;
                    font-family: 'Inter', 'Outfit', sans-serif;
                    transition: background-color 0.6s ease, color 0.6s ease;
                }

                .minimal-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                    position: relative;
                    z-index: 1;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    ${funMode ? `
                        background: linear-gradient(90deg, #c084fc, #fbbf24);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    ` : `color: var(--minimal-accent);`}
                }

                .section-title::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: ${funMode
                    ? 'linear-gradient(90deg, #7c3aed44, transparent)'
                    : 'var(--minimal-border)'};
                    margin-top: 4px;
                }

                .flower-wrapper {
                    width: 64px;
                    height: 64px;
                    margin-bottom: 2rem;
                    color: var(--minimal-muted);
                    animation: spin-slow ${funMode ? '15s' : '60s'} linear infinite;
                    opacity: ${funMode ? 1 : 0.8};
                    transition: all 0.6s ease;
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-bg {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(192, 132, 252, 0.2); }
                    50% { box-shadow: 0 0 30px rgba(192, 132, 252, 0.5); }
                }

                /* Hide Layout header */
                header { display: none !important; }

                /* Controls row */
                .controls-row {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    display: flex;
                    gap: 0.75rem;
                    z-index: 100;
                }

                .ctrl-btn {
                    border-radius: 20px;
                    padding: 0.4rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.3s ease;
                    border: 1px solid;
                    font-family: inherit;
                }

                .ctrl-btn.lang {
                    background: ${funMode ? 'rgba(124,58,237,0.2)' : '#121212'};
                    border-color: ${funMode ? '#7c3aed' : '#222222'};
                    color: ${funMode ? '#c084fc' : '#eaeaea'};
                    backdrop-filter: ${funMode ? 'blur(10px)' : 'none'};
                }

                .ctrl-btn.fun {
                    background: ${funMode
                    ? 'linear-gradient(135deg, #7c3aed, #c084fc)'
                    : '#121212'};
                    border-color: ${funMode ? '#c084fc' : '#444'};
                    color: ${funMode ? '#fff' : '#888'};
                    animation: ${funMode ? 'pulse-glow 3s ease infinite' : 'none'};
                    font-weight: ${funMode ? '600' : '400'};
                }

                .ctrl-btn:hover {
                    transform: translateY(-1px);
                }

                /* Fun mode card styles */
                .project-card-fun {
                    background: rgba(124, 58, 237, 0.08) !important;
                    border: 1px solid rgba(124, 58, 237, 0.3) !important;
                    backdrop-filter: blur(12px);
                    transition: all 0.3s ease !important;
                }

                .project-card-fun:hover {
                    border-color: rgba(192, 132, 252, 0.6) !important;
                    box-shadow: 0 0 25px rgba(192, 132, 252, 0.2) !important;
                    transform: translateY(-6px) !important;
                }

                .tag-fun {
                    background: rgba(124, 58, 237, 0.15) !important;
                    border-color: rgba(124, 58, 237, 0.4) !important;
                    color: #c084fc !important;
                }

                .blog-row-fun {
                    border: 1px solid rgba(124, 58, 237, 0.25) !important;
                    background: rgba(124, 58, 237, 0.05) !important;
                    backdrop-filter: blur(10px);
                }

                .blog-row-fun:hover {
                    background: rgba(124, 58, 237, 0.15) !important;
                    border-color: rgba(192, 132, 252, 0.5) !important;
                    box-shadow: 0 0 20px rgba(192, 132, 252, 0.15) !important;
                }

                .exp-card-fun {
                    border-left: 1px solid rgba(251, 191, 36, 0.4) !important;
                    position: relative;
                }

                .exp-card-fun::before {
                    content: '✦';
                    position: absolute;
                    left: -0.65rem;
                    top: 0;
                    color: #fbbf24;
                    font-size: 0.7rem;
                    background: #0d0520;
                    padding: 2px 0;
                }

                .contact-section-fun {
                    background: rgba(124, 58, 237, 0.1) !important;
                    border: 1px solid rgba(124, 58, 237, 0.3) !important;
                    backdrop-filter: blur(15px);
                    animation: pulse-glow 4s ease infinite;
                }

                /* Sidebar Styles */
                .sidebar-hit-area {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 25px;
                    height: 100vh;
                    z-index: 999;
                }
                .sidebar-wrapper {
                    position: fixed;
                    top: 0;
                    left: -280px;
                    width: 280px;
                    height: 100vh;
                    background: var(--minimal-surface);
                    border-right: 1px solid var(--minimal-border);
                    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 2.5rem 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    z-index: 1000;
                    backdrop-filter: blur(12px);
                    box-shadow: 10px 0 30px rgba(0,0,0,0.5);
                }
                .sidebar-hit-area:hover + .sidebar-wrapper,
                .sidebar-wrapper:hover {
                    left: 0;
                }
                .sidebar-link {
                    color: var(--minimal-text);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 400;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    opacity: 0.8;
                }
                .sidebar-link:hover {
                    color: var(--minimal-accent);
                    opacity: 1;
                    transform: translateX(4px);
                }
                .sidebar-fun {
                    background: rgba(13, 5, 32, 0.9) !important;
                    border-right: 1px solid rgba(192, 132, 252, 0.3) !important;
                    box-shadow: 4px 0 30px rgba(124, 58, 237, 0.15) !important;
                }
                .sidebar-link-fun {
                    color: #c4a8e0 !important;
                }
                .sidebar-link-fun:hover {
                    color: #fbbf24 !important;
                    text-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
                }
            `}</style>

            {/* Sacred geometry background - only in fun mode */}
            {funMode && <SacredGeoBg />}

            {/* Controls */}
            <div className="controls-row">
                <button className="ctrl-btn fun" onClick={() => setFunMode(f => !f)}>
                    <Sparkles size={13} /> {funMode ? t.funOff : t.funOn}
                </button>
                <button className="ctrl-btn lang" onClick={() => setLang(l => l === 'en' ? 'it' : 'en')}>
                    <Globe size={13} /> {lang === 'en' ? 'IT' : 'EN'}
                </button>
            </div>

            {/* Sidebar */}
            <div className="sidebar-hit-area" />
            <div className={`sidebar-wrapper ${funMode ? 'sidebar-fun' : ''}`}>
                <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '2rem', letterSpacing: '-0.02em', color: funMode ? '#fbbf24' : 'var(--minimal-text)' }}>
                    Michele.
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1 }}>
                    <a href="#hero" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><Home size={18} /> {t.menuHome}</a>
                    <a href="#experience" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><Briefcase size={18} /> {t.menuExperience}</a>
                    <a href="#projects" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><Code size={18} /> {t.menuProjects}</a>
                    <a href="#finance" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><LineChart size={18} /> {t.menuFinance}</a>
                    <a href="#games" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><Gamepad2 size={18} /> {t.menuGames}</a>
                    <a href="#blog" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><BookOpen size={18} /> {t.menuBlog}</a>
                    <a href="#contact" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><MessageSquare size={18} /> {t.menuContact}</a>
                </nav>

                <div style={{ borderTop: `1px solid ${funMode ? 'rgba(192, 132, 252, 0.2)' : 'var(--minimal-border)'}`, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: funMode ? 'rgba(196,168,224,0.6)' : 'var(--minimal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.menuExternal}</span>
                    <a href="/open-prometeo.html" target="_blank" rel="noopener noreferrer" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><LinkIcon size={16} /> Open Prometeo</a>
                    <a href="https://ailingo.vercel.app/" target="_blank" rel="noopener noreferrer" className={`sidebar-link ${funMode ? 'sidebar-link-fun' : ''}`}><LinkIcon size={16} /> Ailingo</a>
                </div>
            </div>

            <div className="minimal-container animate-fade">

                {/* Hero */}
                <section id="hero" style={{ marginBottom: '6rem' }}>
                    <div className="flower-wrapper">
                        <FlowerOfLife funMode={funMode} />
                    </div>
                    <h1 style={{
                        fontSize: '3rem', fontWeight: 600,
                        letterSpacing: '-0.04em', marginBottom: '1rem', lineHeight: 1.1,
                        ...(funMode ? {
                            background: 'linear-gradient(135deg, #f0e6ff, #c084fc, #fbbf24)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        } : {})
                    }}>
                        {translations[lang].greeting}<br />
                        <span style={{ color: funMode ? '#a78bfa' : 'var(--minimal-muted)', WebkitTextFillColor: funMode ? '#a78bfa' : undefined }}>
                            {translations[lang].role}
                        </span>
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: funMode ? '#c084fc' : 'var(--minimal-muted)',
                        maxWidth: '600px', marginBottom: '2rem',
                        lineHeight: 1.6, whiteSpace: 'pre-line',
                        transition: 'color 0.4s ease'
                    }}>
                        {translations[lang].intro}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="mailto:michele.minardi.1992@gmail.com" style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.6rem 1.2rem', borderRadius: '8px',
                            textDecoration: 'none', fontFamily: 'inherit', fontSize: '0.9rem',
                            cursor: 'pointer',
                            background: funMode ? 'rgba(124,58,237,0.2)' : '#121212',
                            border: `1px solid ${funMode ? '#7c3aed' : '#222'}`,
                            color: funMode ? '#c084fc' : '#eaeaea',
                            transition: 'all 0.3s ease',
                            backdropFilter: funMode ? 'blur(10px)' : 'none',
                        }}>
                            <Mail size={16} /> {translations[lang].emailBtn}
                        </a>
                        <a href="https://github.com/LockiJohn/openprometeo.github.io/blob/main/index.html"
                            target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.6rem', borderRadius: '8px', textDecoration: 'none',
                                background: 'transparent', border: '1px solid transparent',
                                color: funMode ? '#a78bfa' : '#888888',
                                transition: 'color 0.3s ease',
                            }}>
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com/in/michele-minardi-/"
                            target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.6rem', borderRadius: '8px', textDecoration: 'none',
                                background: 'transparent', border: '1px solid transparent',
                                color: funMode ? '#a78bfa' : '#888888',
                                transition: 'color 0.3s ease',
                            }}>
                            <Linkedin size={18} />
                        </a>
                    </div>
                </section>

                {/* Experience */}
                <section id="experience" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{translations[lang].experienceTitle}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {experience.map((job, index) => (
                            <div key={index}
                                className={funMode ? 'exp-card-fun' : ''}
                                style={{
                                    borderLeft: funMode ? undefined : '1px solid var(--minimal-border)',
                                    paddingLeft: '1.5rem',
                                    marginLeft: '0.5rem'
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: funMode ? '#f0e6ff' : '#eaeaea' }}>
                                        {lang === 'en' ? job.roleEn : job.roleIt}
                                    </h3>
                                    <span style={{ fontSize: '0.9rem', color: funMode ? '#fbbf24' : '#888888', fontFamily: 'monospace' }}>
                                        {job.period}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '1rem', color: funMode ? '#a78bfa' : '#888888', marginBottom: '0.75rem', fontWeight: 400 }}>
                                    {job.company}
                                </h4>
                                <p style={{ color: funMode ? '#c4a8e0' : '#aaaaaa', lineHeight: 1.6 }}>
                                    {lang === 'en' ? job.descriptionEn : job.descriptionIt}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{translations[lang].projectsTitle}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {projects.map((project, index) => {
                            const card = (
                                <div
                                    className={funMode ? 'project-card-fun' : ''}
                                    style={{
                                        background: funMode ? undefined : 'transparent',
                                        border: funMode ? undefined : '1px solid var(--minimal-border)',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                                        cursor: project.link ? 'pointer' : 'default',
                                        display: 'flex', flexDirection: 'column', height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!funMode) {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.borderColor = 'var(--minimal-muted)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!funMode) {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'var(--minimal-border)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        height: '140px',
                                        background: funMode ? project.funGradient : project.previewGradient,
                                        borderBottom: `1px solid ${funMode ? 'rgba(124,58,237,0.3)' : 'var(--minimal-border)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', overflow: 'hidden'
                                    }}>
                                        {funMode && (
                                            <svg viewBox="0 0 100 100" style={{
                                                position: 'absolute', width: '80px', opacity: 0.15,
                                                animation: 'spin-slow 20s linear infinite'
                                            }} fill="none" stroke="#c084fc" strokeWidth="0.8">
                                                {[0, 60, 120, 180, 240, 300].map((a, i) => {
                                                    const r = (a * Math.PI) / 180;
                                                    return <circle key={i} cx={50 + 15 * Math.cos(r)} cy={50 + 15 * Math.sin(r)} r={15} />;
                                                })}
                                                <circle cx="50" cy="50" r="15" />
                                            </svg>
                                        )}
                                        <ExternalLink size={32} opacity={project.link ? 0.5 : 0.3}
                                            color={funMode ? '#c084fc' : 'var(--minimal-accent)'}
                                            style={{ position: 'relative', zIndex: 1, filter: funMode ? 'drop-shadow(0 0 6px #c084fc88)' : 'none' }}
                                        />
                                    </div>

                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: funMode ? '#f0e6ff' : '#eaeaea' }}>
                                                {project.title}
                                            </h3>
                                            <span style={{ fontSize: '0.8rem', color: funMode ? '#fbbf24' : '#888888', fontFamily: 'monospace' }}>
                                                {project.year}
                                            </span>
                                        </div>
                                        <p style={{ color: funMode ? '#c4a8e0' : 'var(--minimal-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5, flex: 1 }}>
                                            {lang === 'en' ? project.descriptionEn : project.descriptionIt}
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {project.tags.map(tag => (
                                                <span key={tag}
                                                    className={funMode ? 'tag-fun' : ''}
                                                    style={!funMode ? {
                                                        fontSize: '0.75rem', color: '#888888',
                                                        background: '#090909', padding: '4px 8px',
                                                        borderRadius: '4px', border: '1px solid #222222'
                                                    } : { fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                            return project.link
                                ? <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>{card}</a>
                                : <div key={index}>{card}</div>;
                        })}
                    </div>
                </section>

                {/* Financial Portfolio */}
                <section id="finance" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{translations[lang].financeTitle}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        {financialAssets.map((asset, index) => (
                            <div key={index}
                                style={{
                                    padding: '1.25rem',
                                    border: funMode ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid var(--minimal-border)',
                                    borderRadius: '8px',
                                    display: 'flex', flexDirection: 'column', gap: '0.25rem',
                                    background: funMode ? 'rgba(251, 191, 36, 0.05)' : 'transparent',
                                    backdropFilter: funMode ? 'blur(8px)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    if (funMode) e.currentTarget.style.boxShadow = '0 0 15px rgba(251, 191, 36, 0.15)';
                                    else e.currentTarget.style.borderColor = 'var(--minimal-muted)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    if (funMode) e.currentTarget.style.boxShadow = 'none';
                                    else e.currentTarget.style.borderColor = 'var(--minimal-border)';
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: funMode ? '#fbbf24' : 'var(--minimal-text)' }}>{asset.ticker}</span>
                                    <span style={{ fontSize: '0.8rem', color: funMode ? '#c4a8e0' : 'var(--minimal-muted)' }}>{asset.name}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.75rem' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: funMode ? '#f0e6ff' : 'var(--minimal-text)' }}>{asset.price}</span>
                                    <span style={{
                                        fontSize: '0.9rem', fontWeight: 500,
                                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                                        color: asset.isPositive
                                            ? (funMode ? '#34d399' : '#10b981')
                                            : (funMode ? '#f87171' : '#ef4444')
                                    }}>
                                        <TrendingUp size={14} style={{ transform: asset.isPositive ? 'none' : 'scaleY(-1)' }} />
                                        {asset.return}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{
                        fontSize: '0.75rem',
                        color: funMode ? 'rgba(196, 168, 224, 0.6)' : 'var(--minimal-muted)',
                        marginTop: '1.5rem',
                        fontStyle: 'italic',
                        opacity: 0.8
                    }}>
                        {translations[lang].financeDisclaimer}
                    </p>
                </section>

                {/* Game Time */}
                <section id="games" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{translations[lang].gamesTitle}</h2>
                    <p style={{ color: funMode ? '#c4a8e0' : 'var(--minimal-muted)', marginBottom: '2rem', fontStyle: 'italic', opacity: 0.9 }}>
                        {translations[lang].gamesDesc}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {games.map((game, index) => (
                            <a key={index} href={game.link} style={{ textDecoration: 'none', display: 'block' }}>
                                <div className={funMode ? 'project-card-fun' : ''} style={{
                                    padding: '1.5rem',
                                    border: funMode ? '1px solid rgba(124, 58, 237, 0.4)' : '1px solid var(--minimal-border)',
                                    borderRadius: '12px',
                                    background: funMode ? 'rgba(124, 58, 237, 0.05)' : 'transparent',
                                    transition: 'all 0.3s ease',
                                    display: 'flex', flexDirection: 'column', height: '100%',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        if (funMode) e.currentTarget.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.2)';
                                        else e.currentTarget.style.borderColor = 'var(--minimal-muted)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        if (funMode) e.currentTarget.style.boxShadow = 'none';
                                        else e.currentTarget.style.borderColor = 'var(--minimal-border)';
                                    }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: funMode ? '#fbbf24' : 'var(--minimal-text)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <Gamepad2 size={18} /> {game.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: funMode ? '#f0e6ff' : 'var(--minimal-muted)', lineHeight: 1.5 }}>
                                        {lang === 'en' ? game.descEn : game.descIt}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Blog */}
                <section id="blog" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">{translations[lang].blogTitle}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {blogPosts.map((post, index) => (
                            <a key={index} href={post.link}
                                className={funMode ? 'blog-row-fun' : ''}
                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '1.5rem',
                                    border: funMode ? undefined : '1px solid var(--minimal-border)',
                                    borderRadius: '8px', textDecoration: 'none', color: 'inherit',
                                    transition: 'all 0.2s ease',
                                    background: funMode ? undefined : 'transparent'
                                }}
                                onMouseEnter={e => { if (!funMode) (e.currentTarget as HTMLElement).style.background = 'var(--minimal-surface)'; }}
                                onMouseLeave={e => { if (!funMode) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem', color: funMode ? '#f0e6ff' : '#eaeaea' }}>
                                        {lang === 'en' ? post.titleEn : post.titleIt}
                                    </h3>
                                    <span style={{ fontSize: '0.85rem', color: funMode ? '#a78bfa' : '#888888' }}>
                                        {post.date} &bull; {lang === 'en' ? post.readTimeEn : post.readTimeIt}
                                    </span>
                                </div>
                                <BookOpen size={18} color={funMode ? '#c084fc' : '#888888'}
                                    style={{ filter: funMode ? 'drop-shadow(0 0 4px #c084fc)' : 'none' }} />
                            </a>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section id="contact"
                    className={funMode ? 'contact-section-fun' : ''}
                    style={{
                        marginBottom: '4rem', padding: '4rem 2rem',
                        background: funMode ? undefined : 'var(--minimal-surface)',
                        borderRadius: '16px',
                        border: funMode ? undefined : '1px solid var(--minimal-border)',
                        textAlign: 'center'
                    }}>
                    <h2 style={{
                        fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.02em',
                        ...(funMode ? {
                            background: 'linear-gradient(135deg, #f0e6ff, #c084fc, #fbbf24)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        } : { color: '#eaeaea' })
                    }}>
                        {translations[lang].contactTitle}
                    </h2>
                    <p style={{ color: funMode ? '#c4a8e0' : '#888888', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
                        {translations[lang].contactText}
                    </p>
                    <a href="mailto:michele.minardi.1992@gmail.com" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 500, fontSize: '1.05rem',
                        textDecoration: 'none', fontFamily: 'inherit',
                        background: funMode ? 'linear-gradient(135deg, #7c3aed, #c084fc)' : '#fff',
                        color: funMode ? '#fff' : '#000',
                        boxShadow: funMode ? '0 0 30px rgba(192, 132, 252, 0.4)' : 'none',
                        transition: 'all 0.3s ease',
                    }}>
                        <Mail size={18} /> {translations[lang].emailBtn}
                    </a>
                </section>

                {/* Footer */}
                <footer style={{
                    marginTop: '8rem', paddingTop: '2rem',
                    borderTop: `1px solid ${funMode ? 'rgba(124,58,237,0.3)' : 'var(--minimal-border)'}`,
                    textAlign: 'center',
                    color: funMode ? '#7c3aed' : '#888888',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Michele. {translations[lang].footer}
                        {funMode && ' ✦'}
                    </p>
                </footer>

            </div>
        </Layout>
    );
}
