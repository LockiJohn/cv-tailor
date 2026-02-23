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

    const [targetLanguage, setTargetLanguage] = useState<'ITA' | 'ENG'>('ENG');
    const [isDragging, setIsDragging] = useState(false);

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

    const handleLanguageSwitch = async (lang: 'ITA' | 'ENG') => {
        if (lang === targetLanguage) return;
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/translate`, {
                resume: tailoredResume,
                targetLanguage: lang
            });
            setTailoredResume(response.data.translatedResume);
            setTargetLanguage(lang);
        } catch (error) {
            console.error("Translation failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            console.log("File dropped:", files[0].name);
            // In a real scenario, we'd trigger the parser here
            alert(`File "${files[0].name}" received! (Parser backend integration pending)`);
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
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.2rem' }}>
                        Curriculum<span style={{ color: 'var(--primary)', fontWeight: '600' }}>AI</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '300', fontStyle: 'italic' }}>
                        Rendere chill trovare lavoro.
                    </p>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', opacity: 0.6 }}>
                    BETA v1.1
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
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--glass-border)'}`,
                                padding: '3rem',
                                textAlign: 'center',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '2rem',
                                background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.02)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Upload size={48} style={{ color: isDragging ? 'var(--primary-hover)' : 'var(--primary)', marginBottom: '1rem', transition: 'all 0.3s ease' }} />
                            <p>{isDragging ? 'Drop it here!' : 'Drag and drop your CV here, or'} <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>browse files</span></p>
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
                                <button
                                    onClick={() => handleLanguageSwitch('ITA')}
                                    className="btn btn-secondary"
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '0.8rem',
                                        background: targetLanguage === 'ITA' ? 'var(--primary)' : 'transparent',
                                        borderColor: targetLanguage === 'ITA' ? 'var(--primary)' : 'var(--glass-border)'
                                    }}
                                >
                                    <Languages size={14} style={{ marginRight: '6px' }} /> ITA
                                </button>
                                <button
                                    onClick={() => handleLanguageSwitch('ENG')}
                                    className="btn btn-secondary"
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '0.8rem',
                                        background: targetLanguage === 'ENG' ? 'var(--primary)' : 'transparent',
                                        borderColor: targetLanguage === 'ENG' ? 'var(--primary)' : 'var(--glass-border)'
                                    }}
                                >
                                    ENG
                                </button>
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
