
import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { Check, X, Edit3 } from 'lucide-react';

interface DiffEditorProps {
    oldValue: string;
    newValue: string;
}

const BulletDiffEditor: React.FC<DiffEditorProps> = ({ oldValue, newValue }) => {
    return (
        <div style={{
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'var(--surface)'
        }}>
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>AI Suggestion</span>
            </div>

            <ReactDiffViewer
                oldValue={oldValue}
                newValue={newValue}
                splitView={true}
                compareMethod={DiffMethod.WORDS}
                styles={{
                    variables: {
                        light: {
                            diffViewerBackground: 'var(--surface)',
                            addedBackground: 'rgba(16, 185, 129, 0.15)',
                            removedBackground: 'rgba(239, 68, 68, 0.15)',
                            wordAddedBackground: 'rgba(16, 185, 129, 0.3)',
                            wordRemovedBackground: 'rgba(239, 68, 68, 0.3)',
                            addedColor: '#6ee7b7',
                            removedColor: '#fca5a5',
                            codeFoldBackground: 'var(--background)',
                            emptyLineBackground: 'var(--surface)',
                            gutterBackground: 'rgba(0,0,0,0.1)',
                            gutterColor: 'var(--text-muted)',
                        }
                    }
                }}
            />

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.1)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <X size={14} /> Reject
                </button>
                <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} /> Accept Choice
                </button>
            </div>
        </div>
    );
};

export default BulletDiffEditor;
