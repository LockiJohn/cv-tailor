import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';

interface ChatWidgetProps {
    resume: any;
    jd: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ resume, jd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/tailor/chat`, {
                messages: [{ role: 'user', parts: [{ text: input }] }],
                context: { resume, jd }
            });

            setMessages(prev => [...prev, { role: 'model', content: response.data.response }]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: 'model', content: "Ops, il Guru ha preso un caffè troppo lungo. Riprova tra un attimo!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary"
                    style={{
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        border: '1px solid var(--glass-border)'
                    }}
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="glass-card animate-fade" style={{
                    width: '350px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.5)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--glass-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
                            <span style={{ fontWeight: 600 }}>CurriculumAI Guru</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                                <Bot size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p style={{ fontSize: '0.9rem' }}>Ehilà! Hai bisogno di aiuto con il tuo CV o con questa Job Description? Chiedimi pure!</p>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                                <div style={{
                                    padding: '0.8rem 1rem',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    color: msg.role === 'user' ? 'white' : 'var(--text)',
                                    border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)'
                                }}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px' }}>
                                <div className="dots-container">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Chiedi al Guru..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '0.5rem 0.8rem',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="btn btn-primary"
                            style={{ width: '40px', height: '40px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                .dots-container span {
                    animation: blink 1.4s infinite;
                    opacity: 0;
                    font-size: 1.5rem;
                    line-height: 0;
                }
                .dots-container span:nth-child(2) { animation-delay: 0.2s; }
                .dots-container span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default ChatWidget;
