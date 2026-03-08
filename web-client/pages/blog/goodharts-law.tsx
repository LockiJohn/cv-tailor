import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';

const content = {
    en: {
        title: "Goodhart's Law Is the Problem of the Century",
        subtitle: "When a measure becomes a target, it ceases to be a good measure.",
        date: "March 8, 2026",
        readTime: "8 min read",
        backLabel: "Back",
        body: [
            {
                type: 'quote',
                text: '"When a measure becomes a target, it ceases to be a good measure." — Charles Goodhart, 1975'
            },
            {
                type: 'h2',
                text: 'The Soviet Nails'
            },
            {
                type: 'p',
                text: "In the 1950s, Soviet factories were evaluated on the number of nails produced. The result: millions of tiny, unusable nails. The plan was met. Houses didn't get built."
            },
            {
                type: 'p',
                text: "The government corrected: now the quota was by weight. Factories started producing enormous nails, useless for any practical purpose. Perfect for the metric. Perfect for nothing."
            },
            {
                type: 'p',
                text: "This is Goodhart's Law in action: every measure that becomes a target stops measuring what you wanted to measure. It's not a bug of the Soviet system. It's a fundamental law of any system where incentives exist."
            },
            {
                type: 'h2',
                text: 'The Problem Wasn\'t the Measure. It Was the Cost of Hacking It.'
            },
            {
                type: 'p',
                text: "For decades, Goodhart's Law was a manageable problem. Faking a metric cost something. It required time, organization, human resources. Companies could inflate numbers, politicians could distort statistics, but there was always a friction cost that limited the scale of the problem."
            },
            {
                type: 'p',
                text: "Today that cost has collapsed."
            },
            {
                type: 'h2',
                text: 'When Production Cost Approaches Zero'
            },
            {
                type: 'p',
                text: "We live in a society where the production of content — text, images, code, voices, video — has a marginal cost approaching zero. And every measurement system that wasn't designed for this is silently collapsing."
            },
            {
                type: 'list',
                items: [
                    "**5-star reviews** were meant to measure product quality. Today there are review farms, automated tools, and soon a single prompt will generate thousands of them. The star no longer measures anything.",
                    "**Follower counts** were meant to measure influence. Today you can buy them for €10 per thousand, with accounts that look real, that comment, that interact. Social \"score\" is completely decoupled from reality.",
                    "**Academic citations** were meant to measure the value of research. Today there are paper farms, artificial cross-citations, and entire predatory journals gaming the system.",
                    "**SEO ranking** was meant to measure a site's relevance. Today content farms generate millions of SEO-optimized articles per day. Google can't keep up.",
                    "**Business KPIs** — DAU, retention, engagement — are optimized with dark patterns, aggressive notifications, manipulative gamification. Apps are more \"used\", people are less satisfied."
                ]
            },
            {
                type: 'h2',
                text: 'The Paradox: The More You Measure, the Less You Know'
            },
            {
                type: 'p',
                text: "There's something deeply ironic about all this. We live in the age of data, the one where \"we can finally measure everything\". We have dashboards everywhere, OKRs, NPS, vanity metrics and performance metrics."
            },
            {
                type: 'p',
                text: "Yet the more precise and accessible our metrics become, the easier they are to hack. Once you know exactly how you're being measured, you know exactly how to optimize for that measure — not for what that measure is supposed to represent."
            },
            {
                type: 'p',
                text: "The problem isn't a lack of data. It's that data has become a language, and like any language, it can lie."
            },
            {
                type: 'h2',
                text: 'What Remains Immune?'
            },
            {
                type: 'p',
                text: "The real question is: does anything exist that can't be easily faked at scale?"
            },
            {
                type: 'p',
                text: "Probably yes. Things that are hard to manufacture in series. Reputation built over time through real interactions. The trust of people who truly know you. The judgment of someone with enough context to evaluate something that doesn't fit in a spreadsheet row."
            },
            {
                type: 'p',
                text: "Paradoxically, in the era of total automation, value shifts toward what is intrinsically expensive to replicate: the authentic relationship, the deep context, the informed human judgment."
            },
            {
                type: 'h2',
                text: 'The Future of Metrics'
            },
            {
                type: 'p',
                text: "We won't stop measuring. But perhaps we should stop blindly trusting the numbers we produce."
            },
            {
                type: 'p',
                text: "Goodhart's Law isn't a critique of measurement. It's an invitation to always ask: is this number telling me something true, or is it just telling me that someone found a way to make it look true?"
            },
            {
                type: 'p',
                text: "In a world where producing content, social proof, and quality signals costs almost nothing — the ability to distinguish signal from noise becomes the rarest and most valuable skill."
            },
            {
                type: 'closing',
                text: "Moscow's nails were at least tangible."
            }
        ]
    },
    it: {
        title: "La Legge di Goodhart è diventata il problema del secolo",
        subtitle: "Quando una misura diventa un obiettivo, smette di essere una buona misura.",
        date: "8 Marzo 2026",
        readTime: "8 min di lettura",
        backLabel: "Indietro",
        body: [
            {
                type: 'quote',
                text: '"When a measure becomes a target, it ceases to be a good measure." — Charles Goodhart, 1975'
            },
            {
                type: 'h2',
                text: 'I chiodi sovietici'
            },
            {
                type: 'p',
                text: "Negli anni '50, le fabbriche sovietiche venivano valutate sul numero di chiodi prodotti. Risultato: chiodini inutilizzabili, minuscoli, a milioni. Il piano veniva rispettato. Le case non si costruivano."
            },
            {
                type: 'p',
                text: "Il governo corresse: ora la quota era in peso. Le fabbriche iniziarono a produrre chiodi enormi, inutili per qualsiasi uso pratico. Perfetti per la metrica. Perfetti per niente."
            },
            {
                type: 'p',
                text: "Questa è la Legge di Goodhart in azione: ogni misura che diventa un obiettivo smette di misurare ciò che volevi misurare. Non è un bug del sistema sovietico. È una legge fondamentale di qualsiasi sistema dove esistono incentivi."
            },
            {
                type: 'h2',
                text: 'Il problema non era la misura. Era il costo di hackerarla.'
            },
            {
                type: 'p',
                text: "Per decenni, la Legge di Goodhart era un problema gestibile. Falsificare una metrica costava. Richiedeva tempo, organizzazione, risorse umane. Le aziende potevano gonfiare numeri, i politici potevano distorcere statistiche, ma c'era sempre un costo di attrito che limitava la scala del problema."
            },
            {
                type: 'p',
                text: "Oggi quel costo è crollato."
            },
            {
                type: 'h2',
                text: 'Quando il costo di produzione tende a zero'
            },
            {
                type: 'p',
                text: "Viviamo in una società in cui la produzione di contenuto — testo, immagini, codice, voci, video — ha un costo marginale che si avvicina allo zero. E ogni sistema di misurazione che non era progettato per questo sta collassando silenziosamente."
            },
            {
                type: 'list',
                items: [
                    "**Le recensioni a 5 stelle** dovevano misurare la qualità di un prodotto. Oggi esistono farm di recensioni, tool automatizzati, e presto basterà un prompt per generarne migliaia. La stella non misura più niente.",
                    "**Il numero di follower** doveva misurare l'influenza. Oggi si comprano a 10€ per mille, con account che sembrano reali, che commentano, che interagiscono. Lo \"score\" sociale è completamente disaccoppiato dalla realtà.",
                    "**Le citazioni accademiche** dovevano misurare il valore di una ricerca. Oggi esistono paper farm, citazioni incrociate artificiali, e interi journal predatori che giocano il sistema.",
                    "**Il ranking SEO** doveva misurare la rilevanza di un sito. Oggi content farm generano milioni di articoli SEO-ottimizzati al giorno. Google non riesce a stare al passo.",
                    "**I KPI aziendali** — DAU, retention, engagement — vengono ottimizzati con dark pattern, notifiche aggressive, gamification manipolativa. Le app sono più \"usate\", le persone sono meno soddisfatte."
                ]
            },
            {
                type: 'h2',
                text: 'Il paradosso: più misuri, meno sai'
            },
            {
                type: 'p',
                text: "C'è qualcosa di profondamente ironico in tutto questo. Viviamo nell'era dei dati, quella in cui \"siamo finalmente in grado di misurare tutto\". Abbiamo dashboard ovunque, OKR, NPS, metriche di vanità e metriche di performance."
            },
            {
                type: 'p',
                text: "Eppure più le nostre metriche sono precise e accessibili, più diventano facili da hackerare. Una volta che sai esattamente come vieni misurato, sai esattamente come ottimizzare per quella misura — non per ciò che quella misura dovrebbe rappresentare."
            },
            {
                type: 'p',
                text: "Il problema non è la mancanza di dati. È che i dati sono diventati un linguaggio, e come ogni linguaggio, possono mentire."
            },
            {
                type: 'h2',
                text: 'Cosa rimane immune?'
            },
            {
                type: 'p',
                text: "La domanda vera è: esiste qualcosa che non si può falsificare facilmente in serie?"
            },
            {
                type: 'p',
                text: "Probabilmente sì. Le cose difficili da fabbricare in serie. La reputazione costruita nel tempo su interazioni reali. La fiducia di chi ti conosce davvero. Il giudizio di qualcuno che ha abbastanza contesto per valutare qualcosa che non si misura in una riga di Excel."
            },
            {
                type: 'p',
                text: "Paradossalmente, nell'era dell'automazione totale, il valore si sposta verso ciò che è intrinsecamente costoso da replicare: la relazione autentica, il contesto profondo, il giudizio umano informato."
            },
            {
                type: 'h2',
                text: 'Il futuro delle metriche'
            },
            {
                type: 'p',
                text: "Non smetteremo di misurare. Ma forse dovremmo smettere di credere ciecamente ai numeri che produciamo."
            },
            {
                type: 'p',
                text: "La Legge di Goodhart non è una critica alla misurazione. È un invito a chiedersi sempre: questo numero mi dice qualcosa di vero, o mi sta solo dicendo che qualcuno ha trovato il modo di farlo sembrare vero?"
            },
            {
                type: 'p',
                text: "In un mondo dove produrre contenuto, social proof, e segnali di qualità costa quasi niente — la capacità di distinguere il segnale dal rumore diventa la competenza più rara e più preziosa."
            },
            {
                type: 'closing',
                text: "I chiodi di Mosca erano almeno tangibili."
            }
        ]
    }
};

function renderBody(body: typeof content.en.body) {
    return body.map((block, i) => {
        switch (block.type) {
            case 'quote':
                return (
                    <blockquote key={i} style={{
                        borderLeft: '2px solid #555',
                        paddingLeft: '1.5rem',
                        margin: '2rem 0',
                        color: '#888',
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        lineHeight: 1.7
                    }}>
                        {block.text}
                    </blockquote>
                );
            case 'h2':
                return (
                    <h2 key={i} style={{
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        color: '#eaeaea',
                        marginTop: '3rem',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {block.text}
                    </h2>
                );
            case 'p':
                return (
                    <p key={i} style={{
                        color: '#aaaaaa',
                        lineHeight: 1.8,
                        marginBottom: '1.2rem',
                        fontSize: '1.05rem'
                    }}>
                        {block.text}
                    </p>
                );
            case 'list':
                return (
                    <ul key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {(block.items || []).map((item, j) => {
                            // bold the **text** inside
                            const parts = item.split(/\*\*(.*?)\*\*/g);
                            return (
                                <li key={j} style={{ color: '#aaaaaa', lineHeight: 1.7, fontSize: '1.02rem' }}>
                                    {parts.map((p, k) => k % 2 === 1
                                        ? <strong key={k} style={{ color: '#eaeaea' }}>{p}</strong>
                                        : p
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                );
            case 'closing':
                return (
                    <p key={i} style={{
                        color: '#666',
                        lineHeight: 1.8,
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid #222',
                        fontStyle: 'italic',
                        fontSize: '1rem'
                    }}>
                        {block.text}
                    </p>
                );
            default:
                return null;
        }
    });
}

export default function GoodhartsLaw() {
    const [lang, setLang] = useState<'en' | 'it'>('en');
    const t = content[lang];

    return (
        <>
            <Head>
                <title>{t.title} | Michele</title>
                <meta name="description" content={t.subtitle} />
            </Head>

            <style jsx global>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    background-color: #0a0a0a !important;
                    color: #eaeaea !important;
                    font-family: 'Inter', 'Outfit', sans-serif;
                }
                .lang-toggle {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: #121212;
                    border: 1px solid #222;
                    border-radius: 20px;
                    padding: 0.4rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    color: #eaeaea;
                    z-index: 100;
                    font-size: 0.85rem;
                    transition: border-color 0.2s;
                }
                .lang-toggle:hover { border-color: #888; }
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #888;
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin-bottom: 3rem;
                    transition: color 0.2s;
                }
                .back-link:hover { color: #eaeaea; }
            `}</style>

            <button className="lang-toggle" onClick={() => setLang(l => l === 'en' ? 'it' : 'en')}>
                <Globe size={14} /> {lang === 'en' ? 'IT' : 'EN'}
            </button>

            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '5rem 2rem' }}>

                <Link href="/" className="back-link">
                    <ArrowLeft size={16} /> {t.backLabel}
                </Link>

                {/* Article Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#555', fontFamily: 'monospace', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {t.date} &bull; {t.readTime}
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.15,
                        color: '#eaeaea',
                        marginBottom: '1.2rem'
                    }}>
                        {t.title}
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: '#666', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {t.subtitle}
                    </p>
                    <div style={{ height: '1px', background: '#1e1e1e', marginTop: '2.5rem' }} />
                </header>

                {/* Article Body */}
                <article>
                    {renderBody(t.body)}
                </article>

                {/* Footer nav */}
                <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #1e1e1e' }}>
                    <Link href="/" className="back-link">
                        <ArrowLeft size={16} /> {t.backLabel}
                    </Link>
                </div>

            </div>
        </>
    );
}
