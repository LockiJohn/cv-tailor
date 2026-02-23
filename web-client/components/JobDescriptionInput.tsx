import React from 'react';
import { ChevronRight } from 'lucide-react';

interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
    onAnalyze: () => void;
    isProcessing: boolean;
    disabled: boolean;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
    value,
    onChange,
    onAnalyze,
    isProcessing,
    disabled
}) => {
    return (
        <div className="glass-card animate-fade" style={{ marginTop: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Job Description di destinazione
                </label>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Incolla qui i requisiti della posizione..."
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
                disabled={disabled || isProcessing}
                onClick={onAnalyze}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
            >
                {isProcessing ? 'Analisi in corso...' : 'Analizza Match'}
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default JobDescriptionInput;
