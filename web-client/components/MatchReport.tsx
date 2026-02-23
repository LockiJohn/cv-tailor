import React from 'react';
import { AlertCircle, CheckCircle2, Zap, Target, TrendingUp } from 'lucide-react';

const MatchReport = ({ report, onTailor }: any) => {
    const matchPercentage = Math.round(report.matchRate * 100);
    const scoreColor = matchPercentage >= 75 ? 'var(--success)' : matchPercentage >= 50 ? 'var(--warning)' : 'var(--error)';

    return (
        <div className="glass-card animate-fade">
            {/* Header */}
            <header style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Risultato Analisi</p>
                    <h2 style={{ fontSize: '1.8rem' }}>Match Score con il Job</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: scoreColor, lineHeight: 1 }}>
                        {matchPercentage}%
                    </span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {matchPercentage >= 75 ? '🔥 Ottimo profilo!' : matchPercentage >= 50 ? '⚡ Buon potenziale' : '💪 Miglioriamolo insieme'}
                    </p>
                </div>
            </header>

            {/* Score bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ background: 'var(--surface)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${matchPercentage}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${scoreColor}, var(--primary))`,
                        borderRadius: '999px',
                        transition: 'width 1s ease'
                    }} />
                </div>
            </div>

            {/* Keywords grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Missing */}
                <section>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} color="var(--error)" /> Mancanti ({report.missingKeywords?.length || 0})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {(report.missingKeywords || []).length === 0 && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nessun gap critico! 🎉</p>
                        )}
                        {(report.missingKeywords || []).map((k: any, idx: number) => (
                            <div key={idx} style={{
                                padding: '4px 10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.82rem',
                                color: '#fca5a5'
                            }}>
                                {k.importance === 'must-have' ? '⚠️ ' : ''}{k.term}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Matched */}
                <section>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={16} color="var(--success)" /> Presenti ({report.matchedKeywords?.length || 0})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {(report.matchedKeywords || []).length === 0 && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Analizza per vedere i match</p>
                        )}
                        {(report.matchedKeywords || []).map((skill: string, idx: number) => (
                            <div key={idx} style={{
                                padding: '4px 10px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.82rem',
                                color: '#6ee7b7'
                            }}>
                                ✓ {skill}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Recommendation */}
            {report.recommendations?.[0] && (
                <div style={{ background: 'var(--surface)', padding: '1.2rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                    <h4 style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                        <Zap size={15} color="var(--primary)" /> Suggerimento Prioritario
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {report.recommendations[0].suggestion}
                    </p>
                </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    id="tailor-technical-btn"
                    onClick={() => onTailor('technical')}
                    className="btn btn-primary"
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                    <Target size={18} /> Genera CV Tailored
                </button>
                <button
                    id="tailor-process-btn"
                    onClick={() => onTailor('process')}
                    className="btn btn-secondary"
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                    <TrendingUp size={18} /> Focus Soft Skills
                </button>
            </div>
        </div>
    );
};

export default MatchReport;
