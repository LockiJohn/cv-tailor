import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface InlineEditProps {
    value: string;
    onSave: (newValue: string) => void;
}

const InlineEdit: React.FC<InlineEditProps> = ({ value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                }}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
                <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{value}</span>
                <Edit2 size={14} style={{ opacity: 0.4, flexShrink: 0, marginLeft: '1rem' }} />
            </div>
        );
    }

    return (
        <div style={{ padding: '0.5rem' }}>
            <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
                style={{
                    width: '100%',
                    background: 'var(--background)',
                    border: '1px solid var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    padding: '0.5rem',
                    fontSize: '0.95rem',
                    minHeight: '80px',
                    outline: 'none',
                    resize: 'vertical'
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                    onClick={handleCancel}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                    <X size={18} />
                </button>
                <button
                    onClick={handleSave}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Check size={18} />
                </button>
            </div>
        </div>
    );
};

export default InlineEdit;
