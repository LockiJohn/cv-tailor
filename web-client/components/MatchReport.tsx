
import React from 'react';
import { AlertCircle, CheckCircle2, Zap, Target } from 'lucide-react';

const MatchReport = ({ report, onTailor }: any) => {
    const matchPercentage = Math.round(report.matchRate * 100);

    return (
        <div className="glass-card animate-fade">
            <header style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analysis Result</p>
                    <h2 style={{ fontSize: '2rem' }}>Job Match Score</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', lineHeight: 1 }}>{matchPercentage}%</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <section>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} color="var(--warning)" /> Missing Requirements
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {report.missingKeywords.map((k: any, idx: number) => (
                            <div key={idx} style={{
                                padding: '6px 12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                color: '#fca5a5'
                            }}>
                                {k.term}
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={18} color="var(--success)" /> Matching Skills
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {/* Assuming some matching keywords exist in a real scenario */}
                        {['Business Analysis', 'Stakeholder Management', 'SQL'].map((skill, idx) => (
                            <div key={idx} style={{
                                padding: '6px 12px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                color: '#6ee7b7'
                            }}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="var(--primary)" /> Smart Recommendation
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    {report.recommendations[0]?.suggestion || "Focus on highlighting your technical documentation skills to bridge the gap."}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => onTailor('technical')} className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} /> Apply Technical Tailoring
                </button>
                <button onClick={() => onTailor('process')} className="btn btn-secondary" style={{ flex: 1 }}>
                    Soft Skills Focus
                </button>
            </div>
        </div>
    );
};

export default MatchReport;
