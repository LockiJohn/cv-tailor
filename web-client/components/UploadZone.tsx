import React, { useState, useRef } from 'react';
import { Upload, Sparkles } from 'lucide-react';

interface UploadZoneProps {
    onFileUpload: (file: File) => void;
    onDemo: () => void;
    isProcessing: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileUpload, onDemo, isProcessing }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
                onFileUpload(file);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div className="glass-card animate-fade">
            <h2 style={{ marginBottom: '0.5rem' }}>Carica il tuo CV</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Inizia caricando il tuo CV oppure prova con dati demo.
            </p>

            <input
                id="cv-file-input"
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.docx"
                onChange={handleFileChange}
                disabled={isProcessing}
            />

            <div
                id="cv-drop-zone"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isProcessing && fileInputRef.current?.click()}
                style={{
                    border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--glass-border)'}`,
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    background: isDragging ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s ease',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    userSelect: 'none',
                }}
            >
                <Upload
                    size={48}
                    style={{
                        color: isDragging ? 'var(--primary)' : 'var(--text-muted)',
                        marginBottom: '1rem',
                        transition: 'color 0.2s ease',
                        display: 'block',
                        margin: '0 auto 1rem'
                    }}
                />
                <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                    {isDragging ? '✅ Rilascia qui!' : 'Trascina il tuo CV qui'}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    oppure <span style={{ color: 'var(--primary)', fontWeight: 500 }}>clicca per sfogliare</span>
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Supporta PDF e DOCX
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    id="demo-btn"
                    onClick={(e) => { e.stopPropagation(); onDemo(); }}
                    disabled={isProcessing}
                    style={{
                        background: 'none',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--secondary)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        padding: '0.6rem 1.4rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                    }}
                >
                    <Sparkles size={16} /> Prova con dati Demo
                </button>
            </div>
        </div>
    );
};

export default UploadZone;
