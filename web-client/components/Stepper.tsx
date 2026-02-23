import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface StepperProps {
    steps: Step[];
    currentStepId: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStepId }) => {
    return (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            {steps.map((step, idx) => (
                <div
                    key={step.id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: currentStepId === step.id ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: currentStepId === step.id ? '600' : '400',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: `2px solid ${currentStepId === step.id ? 'var(--primary)' : 'var(--glass-border)'}`,
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
    );
};

export default Stepper;
