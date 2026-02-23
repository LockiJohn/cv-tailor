import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: 'var(--primary)',
        error: '#ff4d4d',
        info: '#3b82f6'
    };

    const icons = {
        success: <CheckCircle size={18} />,
        error: <AlertCircle size={18} />,
        info: <Info size={18} />
    };

    return (
        <div className="animate-fade-in" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--surface)',
            borderLeft: `4px solid ${colors[type]}`,
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 2000,
            maxWidth: '400px',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)'
        }}>
            <span style={{ color: colors[type] }}>{icons[type]}</span>
            <span style={{ fontSize: '0.9rem', flex: 1 }}>{message}</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
            </button>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Toast;
