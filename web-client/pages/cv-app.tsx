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
import InlineEdit from '../components/InlineEdit';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast, { ToastType } from '../components/Toast';
import { ErrorTracker } from '../services/ErrorTracker';
import { useCVStore } from '../store/useCVStore';

const Dashboard = () => {
    const {
        view, setView,
        isProcessing, setIsProcessing,
        originalResume, setOriginalResume,
        analysisData, setAnalysisData,
        tailoredResume, setTailoredResume,
        currentJd, setJd,
        targetLanguage, setTargetLanguage
    } = useCVStore();

    React.useEffect(() => {
        ErrorTracker.init();
    }, []);

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
            setOriginalResume(response.data.resume);
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
                name: "Michele Minardi",
                label: "Digital Process Engineer | Tech Business Analyst",
                email: "michele.minardi@example.com",
                phone: "+39 XXX XXXXXXX",
                summary: "Digital Process Engineer con background in Credit Risk e Finanza. Esperienza internazionale (Praga, San Diego, Barcellona) e forte orientamento ai dati e alle soluzioni AI-driven."
            },
            work: [{
                company: "Moltiply Group",
                position: "Tech Business Analyst - Digital Process Engineer",
                startDate: "Nov 2022",
                endDate: "Presente",
                location: "Italia",
                highlights: [
                    { id: "michele-1", original: "Progettazione e digitalizzazione flussi end-to-end per finanziamenti PMI secondo metodologia Agile.", tailored: "", tags: ["Agile", "Finanza"], status: "original" as const },
                    { id: "michele-2", original: "Analisi di processo e traduzione esigenze business in User Stories su Azure DevOps.", tailored: "", tags: ["Business Analysis", "Azure DevOps"], status: "original" as const },
                    { id: "michele-3", original: "Sviluppo dashboard Power BI e query SQL avanzate per monitoraggio SLA e performance.", tailored: "", tags: ["SQL", "Power BI"], status: "original" as const },
                    { id: "michele-4", original: "Automazione della documentazione tecnica tramite integrazione di strumenti digitali avanzati.", tailored: "", tags: ["Automation"], status: "original" as const }
                ]
            }, {
                company: "Gruppo Montenegro",
                position: "Analista Credit Risk e Frodi",
                startDate: "Dic 2018",
                endDate: "Gen 2021",
                location: "Italia",
                highlights: [
                    { id: "michele-5", original: "Conduzione indagini antifrode su bonifici e ordini fraudolenti.", tailored: "", tags: ["Fraud Detection"], status: "original" as const },
                    { id: "michele-6", original: "Valutazione affidabilità creditizia e analisi di bilancio per mitigazione del rischio.", tailored: "", tags: ["Risk Analysis"], status: "original" as const }
                ]
            }],
            skills: [
                { category: "Business Analysis", keywords: ["User Stories", "Process Mapping", "UAT", "Agile"] },
                { category: "Dati & Reporting", keywords: ["SQL", "Power BI", "Python", "Data Cleansing"] },
                { category: "Tools", keywords: ["Azure DevOps", "SAP", "Microsoft 365", "Figma"] }
            ],
            languages: [
                { language: "Italiano", fluency: "Madrelingua" },
                { language: "Inglese", fluency: "Professionale (Erasmus + USA)" }
            ]
        };
        const sampleJD = "Cercasisi Senior Technical Business Analyst per l'ottimizzazione di processi fintech. Richiesta esperienza in Agile, Azure DevOps, SQL e automazione dei workflow.";

        setOriginalResume(sampleResume);
        setJd(sampleJD);
        showToast("Dati Demo caricati con successo!", "success");
    };

    const handleAnalyze = async () => {
        ErrorTracker.addBreadcrumb('JD Analysis started', 'interaction');
        if (!originalResume) return showToast("Per favore, carica prima il tuo CV.", "error");
        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/analyze`, {
                resume: originalResume,
                jdText: currentJd
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
                            value={currentJd}
                            onChange={setJd}
                            onAnalyze={handleAnalyze}
                            isProcessing={isProcessing}
                            disabled={!currentJd}
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

                    {/* Summary Section */}
                    <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Riepilogo Professionale</h4>
                        <InlineEdit
                            value={tailoredResume.basics.summary}
                            onSave={(val) => {
                                const updated = { ...tailoredResume };
                                updated.basics.summary = val;
                                setTailoredResume(updated);
                            }}
                        />
                    </div>

                    {/* Experiences Section */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>Esperienze Lavorative</h4>
                        {tailoredResume.work.map((work, idx) => (
                            <div key={idx} style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                    <h5 style={{ fontSize: '1.1rem', color: '#fff' }}>{work.position} @ {work.company}</h5>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{work.startDate} - {work.endDate}</span>
                                </div>
                                <HighlightsEditor
                                    highlights={work.highlights}
                                    onChange={(newHighlights) => {
                                        const updated = { ...tailoredResume };
                                        updated.work[idx].highlights = newHighlights;
                                        setTailoredResume(updated);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Skills & Lang Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Competenze Tecniche</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {tailoredResume.skills.map((skill: any, sIdx: number) => (
                                    <div key={sIdx}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{skill.category}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {skill.keywords.map((k: string, kIdx: number) => (
                                                <span key={kIdx} style={{ padding: '4px 10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '6px', fontSize: '0.8rem' }}>
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Lingue</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {tailoredResume.languages.map((lang: any, lIdx: number) => (
                                    <div key={lIdx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--glass-bg)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <span style={{ fontWeight: '600' }}>{lang.language}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lang.fluency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
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

        </Layout>
    );
};

export default Dashboard;
