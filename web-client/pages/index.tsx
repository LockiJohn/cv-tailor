import React, { useState } from 'react';
import MatchReport from '../components/MatchReport';
import BulletDiffEditor from '../components/BulletDiffEditor';
import { useCVStore } from '../store/useCVStore';
import axios from 'axios';
import { Upload, FileText, CheckCircle, Download, Languages, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const { originalResume, setResume, setJd } = useCVStore();
    const [jdInput, setJdInput] = useState('');
    const [view, setView] = useState<'upload' | 'report' | 'editor'>('upload');
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [tailoredResume, setTailoredResume] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const handleAnalyze = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/analyze`, {
                resume: originalResume || { basics: { name: "Test User" }, work: [] },
                jdText: jdInput
            });
            setAnalysisData(response.data);
            setView('report');
        } catch (error) {
            console.error("Analysis failed", error);
            alert("Analysis failed. Check your connection.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleTailor = async (type: string) => {
        setIsProcessing(true);
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
        } finally {
            setIsProcessing(false);
        }
    };

    const steps = [
        { id: 'upload', label: 'Setup', icon: <Upload size={18} /> },
        { id: 'report', label: 'Analysis', icon: <FileText size={18} /> },
        { id: 'editor', label: 'Tailor', icon: <CheckCircle size={18} /> }
    ];

    return (
        <div className="premium-container animate-fade">
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        CV Tailor <span style={{ color: 'var(--primary)', fontWeight: '400' }}>AI</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Precision tailoring for Technical Business Analysts.</p>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', opacity: 0.6 }}>
                    BETA v1.0
                </div>
            </header>

            {/* Progress Stepper */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                {steps.map((step, idx) => (
                    <div
                        key={step.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: view === step.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: view === step.id ? '600' : '400',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: `2px solid ${view === step.id ? 'var(--primary)' : 'var(--glass-border)'}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {step.icon}
                        </span>
                        {step.label}
                        {idx < steps.length - 1 && <ChevronRight size={16} opacity={0.3} />}
                    </div>
                ))}
            </div>

            <main>
                {view === 'upload' && (
                    <div className="glass-card animate-fade">
                        <h2 style={{ marginBottom: '1.5rem' }}>Start Customization</h2>
                        <div style={{ border: '2px dashed var(--glass-border)', padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-md)', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                            <Upload size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                            <p>Drag and drop your CV here, or <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>browse files</span></p>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF, DOCX accepted</span>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Target Job Description</label>
                            <textarea
                                value={jdInput}
                                onChange={(e) => setJdInput(e.target.value)}
                                placeholder="Paste the job requirements here..."
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
                                    padding: '1.2rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--surface)',
                                    color: 'var(--text)',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <button
                            disabled={isProcessing || !jdInput}
                            onClick={handleAnalyze}
                            className="btn btn-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                        >
                            {isProcessing ? 'Analyzing...' : 'Analyze Skills Gap'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {view === 'report' && analysisData && (
                    <MatchReport report={analysisData.report} onTailor={handleTailor} />
                )}

                {view === 'editor' && tailoredResume && (
                    <div className="glass-card animate-fade">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h2 style={{ marginBottom: '0.2rem' }}>Review & Refine</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Side-by-side comparison of tailored highlights.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--surface)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
                                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Languages size={14} style={{ marginRight: '6px' }} /> ITA</button>
                                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--primary)' }}>ENG</button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BulletDiffEditor
                                oldValue={originalResume.work[0].highlights[0].original}
                                newValue={tailoredResume.work[0].highlights[0].tailored}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                <Download size={18} /> Download (.docx)
                            </button>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>
                                Print to PDF
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
