import React, { useState } from 'react';
import axios from 'axios';
import {
    Upload,
    FileText,
    CheckCircle,
    ChevronRight,
    Download,
    Languages
} from 'lucide-react';

// Components
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import UploadZone from '../components/UploadZone';
import MatchReport from '../components/MatchReport';
import JobDescriptionInput from '../components/JobDescriptionInput';
import HighlightsEditor from '../components/HighlightsEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast, { ToastType } from '../components/Toast';
import { ErrorTracker } from '../services/ErrorTracker';
import ChatWidget from '../components/ChatWidget';

const Dashboard = () => {
    const [view, setView] = useState<'upload' | 'report' | 'editor'>('upload');
    React.useEffect(() => {
        ErrorTracker.init();
    }, []);

    const [jdInput, setJdInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [originalResume, setResume] = useState<any>(null);
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [tailoredResume, setTailoredResume] = useState<any>(null);
    const [targetLanguage, setTargetLanguage] = useState<'ITA' | 'ENG'>('ENG');
    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const showToast = (message: string, type: ToastType = 'info') => {
        setToast({ message, type });
    };

    const handleFileUpload = async (file: File) => {
        ErrorTracker.addBreadcrumb(`File upload started: ${file.name}`, 'interaction');
        setIsProcessing(true);
        const formData = new FormData();
        formData.append('cv', file);

        try {
            const response = await axios.post(`${API_BASE_URL}/cv/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResume(response.data.resume);
            showToast("CV caricato e analizzato con successo!", "success");
        } catch (error) {
            console.error("Upload failed", error);
            showToast("Errore nel caricamento del CV. Riprova con un PDF.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDemo = () => {
        const sampleResume = {
            basics: {
                name: "Mario Rossi",
                label: "Technical Business Analyst",
                email: "mario.rossi@example.com",
                phone: "+39 123 456 7890",
                summary: "Experienced Business Analyst specializing in bridging the gap between business needs and technical solutions."
            },
            work: [{
                company: "FinTech Solutions",
                position: "Business Analyst",
                startDate: "2020",
                endDate: "Present",
                location: "Milano, IT",
                highlights: [
                    { id: "demo-1", original: "Managed requirements for a payment gateway project involving multiple stakeholders.", tailored: "", tags: ["Stakeholder Management", "FinTech"], status: "original" },
                    { id: "demo-2", original: "Worked with SQL databases to extract data and create reports for the management team.", tailored: "", tags: ["SQL", "Data Analysis"], status: "original" },
                    { id: "demo-3", original: "Collaborated with technical teams to ensure seamless API integrations.", tailored: "", tags: ["API", "Collaboration"], status: "original" }
                ]
            }],
            skills: ["SQL", "Agile", "API Design", "Python"],
            languages: ["Italiano", "Inglese"]
        };
        const sampleJD = "We are looking for a Senior Technical Business Analyst with experience in API integrations, SQL, and Agile methodologies. The candidate must be able to bridge the gap between business needs and technical implementation.";

        setResume(sampleResume);
        // Ensure handleAnalyze can run by setting originalResume as well
        setResume(sampleResume);
        setJdInput(sampleJD);
        showToast("Dati Demo caricati con successo!", "success");
    };

    const handleAnalyze = async () => {
        ErrorTracker.addBreadcrumb('JD Analysis started', 'interaction');
        if (!originalResume) return showToast("Per favore, carica prima il tuo CV.", "error");
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/analyze`, {
                resume: originalResume,
                jdText: jdInput
            });
            setAnalysisData(response.data);
            setView('report');
            showToast("Analisi completata!", "success");
        } catch (error) {
            console.error("Analysis failed", error);
            showToast("Errore durante l'analisi. Riprova.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleHighlightsChange = (newHighlights: any[]) => {
        const updatedResume = { ...tailoredResume };
        updatedResume.work[0].highlights = newHighlights;
        setTailoredResume(updatedResume);
    };

    const handleDownload = async () => {
        if (!tailoredResume) return;
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/export/docx`, {
                resume: tailoredResume
            }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CurriculumAI_${targetLanguage}.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            showToast("Download avviato!", "success");
        } catch (error) {
            console.error("Download failed", error);
            showToast("Errore durante il download.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleTailor = async (type: string) => {
        ErrorTracker.addBreadcrumb(`Tailoring variant: ${type}`, 'interaction');
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

    const steps = [
        { id: 'upload', label: 'Setup', icon: <Upload size={18} /> },
        { id: 'report', label: 'Analysis', icon: <FileText size={18} /> },
        { id: 'editor', label: 'Tailor', icon: <CheckCircle size={18} /> }
    ];

    return (
        <Layout>
            {isProcessing && <LoadingSpinner />}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <Stepper steps={steps} currentStepId={view} />

            {view === 'upload' && (
                <>
                    <UploadZone
                        onFileUpload={handleFileUpload}
                        onDemo={handleDemo}
                        isProcessing={isProcessing}
                    />

                    {originalResume && (
                        <JobDescriptionInput
                            value={jdInput}
                            onChange={setJdInput}
                            onAnalyze={handleAnalyze}
                            isProcessing={isProcessing}
                            disabled={!jdInput}
                        />
                    )}
                </>
            )}

            {view === 'report' && analysisData && (
                <MatchReport report={analysisData.report} onTailor={handleTailor} />
            )}

            {view === 'editor' && tailoredResume && (
                <div className="glass-card animate-fade">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ marginBottom: '0.2rem' }}>Revisione Dinamica</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trascina i punti per ordinare l'impatto strategico.</p>
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
                        <HighlightsEditor
                            highlights={tailoredResume.work[0].highlights}
                            onChange={handleHighlightsChange}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleDownload}
                            disabled={isProcessing}
                            className="btn btn-primary"
                            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            <Download size={18} /> Download (.docx)
                        </button>
                        <button className="btn btn-secondary" style={{ flex: 1 }}>
                            Stampa PDF
                        </button>
                    </div>
                </div>
            )}

            <ChatWidget resume={tailoredResume || originalResume} jd={jdInput} />
        </Layout>
    );
};

export default Dashboard;
