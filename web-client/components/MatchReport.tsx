
import React from 'react';
import { useCVStore } from '../store/useCVStore';

const MatchReport = ({ report, onTailor }: any) => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2>Match Rate: <span style={styles.score}>{report.matchRate * 100}%</span></h2>
            </header>

            <div style={styles.section}>
                <h3>Missing Key Requirements</h3>
                <ul style={styles.list}>
                    {report.missingKeywords.map((k: any, idx: number) => (
                        <li key={idx} style={styles.item}>
                            <strong>{k.term}</strong> ({k.category}) - <span style={styles.suggest}>{report.recommendations[idx].suggestion}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={styles.actions}>
                <button onClick={() => onTailor('technical')} style={styles.btnPrimary}>
                    Generate Technical Variant
                </button>
                <button onClick={() => onTailor('process')} style={styles.btnSecondary}>
                    Generate Process Variant
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    header: { borderBottom: '1px solid #eee', marginBottom: '1.5rem', paddingBottom: '1rem' },
    score: { color: '#00b894', fontSize: '2rem' },
    section: { marginBottom: '2rem' },
    list: { listStyle: 'none', padding: 0 },
    item: { padding: '10px 0', borderBottom: '1px solid #f9f9f9' },
    suggest: { color: '#636e72', fontStyle: 'italic' },
    actions: { display: 'flex', gap: '15px' },
    btnPrimary: { flex: 1, padding: '12px', background: '#0984e3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    btnSecondary: { flex: 1, padding: '12px', background: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
};

export default MatchReport;
