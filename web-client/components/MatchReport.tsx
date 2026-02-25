import React from 'react';
import { AlertCircle, CheckCircle2, Zap, Target, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';

const Omarino = ({ score }: { score: number }) => {
    const isGood = score >= 70;
    const isAverage = score >= 40 && score < 70;

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div className="omarino-container" style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                background: isGood ? 'var(--success-bg)' : isAverage ? 'rgba(245, 158, 11, 0.1)' : 'var(--error-bg)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${isGood ? 'var(--success)' : isAverage ? 'var(--warning)' : 'var(--error)'}`,
                boxShadow: `0 0 20px ${isGood ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
            }}>
                {/* SVG Character (Omarino) */}
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                    {/* Body/Head */}
                    <circle cx="50" cy="40" r="30" fill="var(--surface)" stroke="var(--text)" strokeWidth="3" />
                    {/* Eyes */}
                    <circle cx="40" cy="35" r="4" fill="var(--text)" />
                    <circle cx="60" cy="35" r="4" fill="var(--text)" />
                    {/* Mouth */}
                    {isGood ? (
                        <path d="M35 50 Q50 65 65 50" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" />
                    ) : isAverage ? (
                        <line x1="35" y1="55" x2="65" y2="55" stroke="var(--warning)" strokeWidth="3" strokeLinecap="round" />
                    ) : (
                        <path d="M35 60 Q50 45 65 60" stroke="var(--error)" strokeWidth="3" strokeLinecap="round" />
                    )}
                </svg>

                {/* Thumbsup/Down icon floating */}
                <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    background: isGood ? 'var(--success)' : 'var(--error)',
                    borderRadius: '50%',
                    padding: '6px',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                    {isGood ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}
                </div>
            </div>

            {/* Speech Bubble */}
            <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--glass-border)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: 'var(--text)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {isGood ? "Pazzesco, sei pronto!" : isAverage ? "Non male, ma possiamo fare di meglio." : "Hmm... c'è da lavorare qui."}
            </div>
        </div>
    );
};

const MatchReport = ({ report, onTailor }: any) => {
    const matchPercentage = Math.round(report.matchRate * 100);
    const scoreColor = matchPercentage >= 75 ? 'var(--success)' : matchPercentage >= 50 ? 'var(--warning)' : 'var(--error)';

    return (
        <div className="glass-card animate-fade" style={{ border: `1px solid ${scoreColor}33` }}>
            {/* Header */}
            <header style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Analisi Pro</p>
                    <h2 style={{ fontSize: '2.2rem', background: `linear-gradient(135deg, #fff, ${scoreColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Potenziale Match
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {matchPercentage >= 75 ? '🔥 Profilo Top Tier' : matchPercentage >= 50 ? '⚡ Ottima base' : '💪 Serve un upgrade'}
                    </p>
                </div>

                {/* OMARINO HERE */}
                <Omarino score={matchPercentage} />

                <div style={{ textAlign: 'right', marginLeft: '2rem' }}>
                    <span style={{ fontSize: '4.5rem', fontWeight: '800', color: scoreColor, lineHeight: 1, letterSpacing: '-0.05em' }}>
                        {matchPercentage}%
                    </span>
                </div>
            </header>

            {/* Score bar with glow */}
            <div style={{ marginBottom: '3rem', position: 'relative' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${matchPercentage}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${scoreColor}, var(--accent))`,
                        borderRadius: '999px',
                        transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: `0 0 15px ${scoreColor}66`
                    }} />
                </div>
            </div>

            {/* Keywords grid with better aesthetics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                {/* Missing */}
                <section>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--error)' }}>
                        <AlertCircle size={20} /> Gap Critici ({report.missingKeywords?.length || 0})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(report.missingKeywords || []).length === 0 && (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mito! Hai tutto quello che serve. 🔥</p>
                        )}
                        {(report.missingKeywords || []).map((k: any, idx: number) => (
                            <div key={idx} style={{
                                padding: '6px 14px',
                                background: 'rgba(239, 68, 68, 0.08)',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                                borderRadius: '100px',
                                fontSize: '0.85rem',
                                color: '#fca5a5',
                                boxShadow: k.importance === 'must-have' ? '0 0 10px rgba(239, 68, 68, 0.1)' : 'none'
                            }}>
                                {k.importance === 'must-have' ? '🔴 ' : '⚪ '}{k.term}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Matched */}
                <section>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)' }}>
                        <CheckCircle2 size={20} /> Punti di Forza ({report.matchedKeywords?.length || 0})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(report.matchedKeywords || []).length === 0 && (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Analizza il CV per scoprire i match.</p>
                        )}
                        {(report.matchedKeywords || []).map((skill: string, idx: number) => (
                            <div key={idx} style={{
                                padding: '6px 14px',
                                background: 'rgba(16, 185, 129, 0.08)',
                                border: '1px solid rgba(16, 185, 129, 0.15)',
                                borderRadius: '100px',
                                fontSize: '0.85rem',
                                color: '#6ee7b7'
                            }}>
                                💎 {skill}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Recommendation - High Impact UI */}
            {report.recommendations?.[0] && (
                <div style={{
                    background: 'linear-gradient(135deg, var(--surface), rgba(139, 92, 246, 0.05))',
                    padding: '1.5rem 2rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '3rem',
                    border: '1px solid var(--glass-border)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary)' }} />
                    <h4 style={{ marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: 'var(--primary)' }}>
                        <Zap size={18} fill="var(--primary)" /> Strategia Consigliata
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>
                        {report.recommendations[0].suggestion}
                    </p>
                </div>
            )}

            {/* CTA Buttons - Pro Design */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button
                    id="tailor-technical-btn"
                    onClick={() => onTailor('technical')}
                    className="btn btn-primary"
                    style={{
                        flex: 1.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '1.2rem',
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        boxShadow: 'var(--shadow-glow)'
                    }}
                >
                    <Target size={22} /> Genera Versione Pro
                </button>
                <button
                    id="tailor-process-btn"
                    onClick={() => onTailor('process')}
                    className="btn btn-secondary"
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '1.2rem',
                        fontSize: '1.1rem'
                    }}
                >
                    <TrendingUp size={22} /> Soft Skills Focus
                </button>
            </div>
        </div>
    );
};

export default MatchReport;

