import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';
import { ErrorTracker } from '../services/ErrorTracker';

// --- Types ---
type Project = {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    year: string;
};

type Experience = {
    role: string;
    company: string;
    period: string;
    description: string;
};

// --- Data ---
const projects: Project[] = [
    {
        title: "Ailingo",
        description: "An AI-powered language learning platform focusing on personalized exercises and dynamic content generation.",
        tags: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "GenAI"],
        year: "2025"
    },
    {
        title: "CV Tailor AI",
        description: "An intelligent tool that automatically tailors your resume to specific job descriptions using advanced LLM analysis.",
        tags: ["React", "Express", "Node.js", "TailwindCSS"],
        year: "2024"
    },
    {
        title: "Worms Bazooka & Space Impact",
        description: "Modern web-based recreations of classic games, built from scratch using HTML5 Canvas and vanilla JavaScript.",
        tags: ["Game Dev", "JavaScript", "Canvas API"],
        year: "2024"
    }
];

const experience: Experience[] = [
    {
        role: "Senior Full Stack Engineer",
        company: "Tech Solutions Inc.",
        period: "2020 - Present",
        description: "Leading the development of scalable web applications. Architected microservices yielding a 40% performance improvement."
    },
    {
        role: "Frontend Developer",
        company: "Creative Digital Agency",
        period: "2017 - 2020",
        description: "Specialized in creating high-performance, accessible user interfaces. Mentored junior developers and established UI guidelines."
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
    useEffect(() => {
        ErrorTracker.init();
    }, []);

    return (
        <Layout>
            <Head>
                <title>Michele | Software Engineer</title>
                <meta name="description" content="Portfolio and Resume of Michele, a passionate Software Engineer." />
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
            `}</style>

            <div className="minimal-container animate-fade">

                {/* Hero Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <div className="flower-wrapper">
                        <FlowerOfLife />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.04em', marginBottom: '1rem', lineHeight: 1.1 }}>
                        Hi, I'm Michele.<br />
                        <span style={{ color: 'var(--minimal-muted)' }}>Software Engineer.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--minimal-muted)', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.6 }}>
                        I build robust, elegant, and user-centric web applications. Passionate about exploring complex problems and finding simple, effective solutions.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="mailto:contact@example.com" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--minimal-surface)', borderColor: 'var(--minimal-border)', color: 'var(--minimal-text)' }}>
                            <Mail size={16} /> Email Me
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'transparent', color: 'var(--minimal-muted)' }}>
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'transparent', color: 'var(--minimal-muted)' }}>
                            <Linkedin size={18} />
                        </a>
                    </div>
                </section>

                {/* Experience Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">Work Experience</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {experience.map((job, index) => (
                            <div key={index} style={{ borderLeft: '1px solid var(--minimal-border)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--minimal-text)' }}>{job.role}</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--minimal-muted)', fontFamily: 'monospace' }}>{job.period}</span>
                                </div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--minimal-muted)', marginBottom: '0.75rem', fontWeight: 400 }}>{job.company}</h4>
                                <p style={{ color: '#aaaaaa', lineHeight: 1.6 }}>{job.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 className="section-title">Selected Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {projects.map((project, index) => (
                            <div key={index} style={{
                                background: 'var(--minimal-surface)',
                                border: '1px solid var(--minimal-border)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                transition: 'transform 0.2s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>{project.title}</h3>
                                    <ExternalLink size={16} color="var(--minimal-muted)" />
                                </div>
                                <p style={{ color: 'var(--minimal-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5, minHeight: '4.5rem' }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--minimal-muted)',
                                            background: '#000000',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid var(--minimal-border)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid var(--minimal-border)', textAlign: 'center', color: 'var(--minimal-muted)', fontSize: '0.9rem' }}>
                    <p>© {new Date().getFullYear()} Michele. Crafted with care.</p>
                </footer>

            </div>
        </Layout>
    );
}
