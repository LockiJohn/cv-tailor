import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                    V2 Pro
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
