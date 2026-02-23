"use strict";

import React, { useState } from 'react';
import MatchReport from '../components/MatchReport';
import BulletDiffEditor from '../components/BulletDiffEditor';
import { useCVStore } from '../store/useCVStore';
import axios from 'axios';

const Dashboard = () => {
    const { originalResume, setResume, setJd } = useCVStore();
    const [jdInput, setJdInput] = useState('');
    const [view, setView] = useState<'upload' | 'report' | 'editor'>('upload');
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [tailoredResume, setTailoredResume] = useState<any>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const handleAnalyze = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/analyze`, {
                resume: originalResume || { basics: { name: "Test User" }, work: [] }, // Fallback for testing
                jdText: jdInput
            });
            setAnalysisData(response.data);
            setView('report');
        } catch (error) {
            console.error("Analysis failed", error);
            alert("Analysis failed. Make sure the backend is running on port 5000.");
        }
    };

    const handleTailor = async (type: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/generate`, {
                resume: originalResume,
                analysis: analysisData.analysis,
                variantType: type
            });
            setTailoredResume(response.data.tailoredResume);
            setView('editor');
        } catch (error) {
            console.error("Tailoring failed", error);
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>CV Tailor <span style={styles.badge}>MVP</span></h1>
            </header>

            <main style={styles.main}>
                {view === 'upload' && (
                    <div style={styles.card}>
                        <h2>Upload & Analyze</h2>
                        <input type="file" style={{ marginBottom: '1rem' }} />
                        <textarea
                            value={jdInput}
                            onChange={(e) => setJdInput(e.target.value)}
                            placeholder="Paste Job Description here..."
                            style={styles.textarea}
                        />
                        <button onClick={handleAnalyze} style={styles.button}>Analyze Skills Gap</button>
                    </div>
                )}

                {view === 'report' && analysisData && (
                    <MatchReport report={analysisData.report} onTailor={handleTailor} />
                )}

                {view === 'editor' && tailoredResume && (
                    <div style={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h2>Review Changes</h2>
                            <div style={styles.lngSwitch}>
                                <button style={styles.lngBtn}>ITA</button>
                                <button style={styles.lngBtn}>ENG</button>
                            </div>
                        </div>
                        <BulletDiffEditor
                            oldValue={originalResume.work[0].highlights[0].original}
                            newValue={tailoredResume.work[0].highlights[0].tailored}
                        />
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button style={styles.button}>Download DOCX</button>
                            <button style={styles.button}>Download PDF</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const styles: any = {
    container: { fontFamily: 'Inter, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '2rem' },
    header: { marginBottom: '2rem', textAlign: 'center' },
    badge: { fontSize: '0.8rem', backgroundColor: '#2d3436', color: '#fff', padding: '2px 8px', borderRadius: '12px', verticalAlign: 'middle' },
    main: { maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    card: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    textarea: { width: '100%', minHeight: '200px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '10px' },
    button: { padding: '1rem', backgroundColor: '#0984e3', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }
};

export default Dashboard;
