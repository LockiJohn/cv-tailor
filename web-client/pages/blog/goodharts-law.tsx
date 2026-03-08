import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';

const content = {
    en: {
        title: "All Measures Are Hackable",
        subtitle: "On Goodhart's Law, Soviet nails, and why the problem got much worse.",
        date: "March 8, 2026",
        readTime: "7 min read",
        backLabel: "Back",
        paragraphs: [
            `Consider a Soviet factory. The government needed nails — lots of them. So they set a quota: factories would be evaluated on the number of nails produced per month. The factory managers, being rational people, produced exactly what was measured. Millions of tiny nails. Useless, minuscule, but countable. The plan was fulfilled. Houses didn't get built.`,

            `The government noticed and adjusted. Now the quota was by weight. The factories responded accordingly: enormous, unusable nails. Still useless. Still perfectly measured.`,

            `This is Goodhart's Law. In 1975, economist Charles Goodhart observed that "when a measure becomes a target, it ceases to be a good measure." The nail factories didn't fail because the managers were evil. They failed because the incentive was to optimize the metric, not the underlying goal. Once you separate the two, the metric always wins.`,

            `All measures can be broken down into one of two categories.`,

            `The first are what I'd call transparent measures. These are hard to game because the underlying reality and the measure are nearly the same thing. In a small town, the local baker's reputation is a transparent measure: you know her, you've eaten her bread, you have firsthand evidence. There's almost no gap between the signal and the truth.`,

            `The second are opaque measures. These are abstractions — proxies designed to approximate something real that can't be directly observed. Star ratings, follower counts, academic citations, credit scores, GDP. Every opaque measure has a gap between the signal and the truth. That gap is where Goodhart's Law lives.`,

            `For most of history, opaque measures were still reasonably reliable. Not because they were immune to gaming, but because gaming them was expensive. Buying fake reviews required fake customers. Inflating academic citations required coordination among researchers. Distorting GDP statistics required a functioning propaganda machine. The friction was high enough that most actors didn't bother.`,

            `That friction is now approaching zero.`,

            `We live in a world where producing content — text, images, voices, video, interaction signals — has a marginal cost that is collapsing. A single API call can generate a thousand product reviews. Another can produce a synthetic social media presence that posts, comments, and likes with human-like consistency. Another can flood a research domain with plausible-sounding papers. The cost of manufacturing the appearance of quality has fallen roughly as fast as computing costs have fallen, which is to say, exponentially.`,

            `This is a different kind of problem than the Soviet nails. The Soviets had a Goodhart's Law problem contained within a closed system. A bureaucrat set a bad metric; factories gamed it; the bureaucrat could, in theory, observe the absurdity and correct it.`,

            `Our version of the problem is decentralized, continuous, and self-reinforcing. No single actor set the bad metrics. Five-star ratings emerged organically. Follower counts emerged organically. Citation counts emerged organically. They became proxies for quality because, at the time they were created, they correlated well with quality. The correlation has since been manufactured away.`,

            `Consider what this does to decision-making. Every hiring algorithm that uses LinkedIn endorsements as a signal. Every publishing algorithm that uses engagement as a proxy for relevance. Every lending algorithm that uses FICO scores as a proxy for creditworthiness. Every investment thesis that uses revenue growth as a proxy for business health. Each of these is running on signal that is increasingly detached from ground truth.`,

            `There's a compounding effect. When a measure becomes unreliable, people respond by adding more measures. More KPIs. More data points. More dashboards. But each new measure, the moment it becomes widely known and weighted, becomes a new target. The system doesn't get more legible. It gets less.`,

            `Some things remain relatively immune. Measures that require the actual thing, not just a representation of it. You can fake a reference letter, but you can't fake the judgment of someone who has worked alongside you for years. You can game a design award with strategic submissions, but you can't easily manufacture the kind of reputation that comes from a decade of good work in a tight-knit community. The most durable measures tend to be expensive in time and relationship, not in money.`,

            `The deeper problem is institutional. Our institutions — financial, academic, corporate, civic — were built assuming that their measures could be trusted. They can't, or at least, they can be trusted less with every passing year as production costs fall. The nail factories at least made nails that were physically real. The content farms don't even need to produce physical nails.`,

            `Nobody set out to build a world of fake reviews and manufactured engagement. It emerged naturally from the collision of good measures, powerful incentives, and falling production costs. Understanding that it's a structural problem, not a moral one, is the first step. The structural solution — whatever it is — will require embedding truth in places where producing a convincing fake is genuinely expensive. That's a harder engineering problem than it sounds.`,

            `Moscow's nails were at least heavy.`,
        ]
    },
    it: {
        title: "Tutte le misure sono hackerabili",
        subtitle: "Sulla Legge di Goodhart, i chiodi sovietici, e perché il problema è diventato molto peggiore.",
        date: "8 Marzo 2026",
        readTime: "7 min di lettura",
        backLabel: "Indietro",
        paragraphs: [
            `Considerate una fabbrica sovietica. Il governo aveva bisogno di chiodi — tanti. Così stabilì una quota: le fabbriche sarebbero state valutate in base al numero di chiodi prodotti al mese. I manager, da persone razionali, produssero esattamente ciò che veniva misurato. Milioni di chiodini. Inutili, minuscoli, ma numerabili. Il piano fu rispettato. Le case non si costruirono.`,

            `Il governo se ne accorse e corresse. La quota ora era in peso. Le fabbriche risposero di conseguenza: chiodi enormi, inutilizzabili. Ancora inutili. Ancora perfettamente misurati.`,

            `Questa è la Legge di Goodhart. Nel 1975, l'economista Charles Goodhart osservò che "quando una misura diventa un obiettivo, cessa di essere una buona misura." Le fabbriche di chiodi non fallirono perché i manager erano in malafede. Fallirono perché l'incentivo era ottimizzare la metrica, non l'obiettivo sottostante. Una volta separati i due, la metrica vince sempre.`,

            `Tutte le misure possono essere classificate in due categorie.`,

            `Le prime sono le misure trasparenti. Difficili da alterare perché la realtà sottostante e la misura sono quasi la stessa cosa. In un piccolo paese, la reputazione della fornaia locale è una misura trasparente: la conosci, hai mangiato il suo pane, hai prove dirette. C'è quasi nessun divario tra il segnale e la verità.`,

            `Le seconde sono le misure opache. Sono astrazioni — proxy progettati per approssimare qualcosa di reale che non si può osservare direttamente. Valutazioni in stelle, numero di follower, citazioni accademiche, credit score, PIL. Ogni misura opaca ha un divario tra il segnale e la verità. Ed è in quel divario che vive la Legge di Goodhart.`,

            `Per la maggior parte della storia, le misure opache erano comunque ragionevolmente affidabili. Non perché fossero immuni alla manipolazione, ma perché manipolarle era costoso. Comprare recensioni false richiedeva clienti falsi. Gonfiare le citazioni accademiche richiedeva coordinazione tra ricercatori. Distorcere le statistiche del PIL richiedeva una macchina propagandistica funzionante. L'attrito era abbastanza alto da scoraggiare la maggior parte degli attori.`,

            `Quell'attrito si sta avvicinando allo zero.`,

            `Viviamo in un mondo in cui produrre contenuto — testo, immagini, voci, video, segnali di interazione — ha un costo marginale in collasso. Una singola chiamata API può generare mille recensioni di prodotto. Un'altra può creare una presenza social sintetica che pubblica, commenta e mette like con coerenza umana. Un'altra ancora può inondare un dominio di ricerca con articoli dall'aspetto plausibile. Il costo di fabbricare l'apparenza della qualità è sceso più o meno alla stessa velocità con cui sono scesi i costi computazionali: in modo esponenziale.`,

            `Questo è un problema di tipo diverso rispetto ai chiodi sovietici. I sovietici avevano un problema di Legge di Goodhart contenuto in un sistema chiuso. Un burocrate stabilisce una metrica sbagliata; le fabbriche la ottimizzano; il burocrate può, in teoria, osservare l'assurdità e correggere.`,

            `La nostra versione del problema è decentralizzata, continua e autorinforzante. Nessun singolo attore ha impostato le metriche sbagliate. Le valutazioni a cinque stelle sono emerse organicamente. I conteggi dei follower sono emersi organicamente. I conteggi delle citazioni sono emersi organicamente. Sono diventati proxy per la qualità perché, quando furono creati, correlavano bene con la qualità. Quella correlazione è stata nel frattempo manufatturata via.`,

            `Considerate cosa questo fa al decision-making. Ogni algoritmo di assunzione che usa i endorsement di LinkedIn come segnale. Ogni algoritmo editoriale che usa l'engagement come proxy della rilevanza. Ogni algoritmo di credito che usa lo score FICO come proxy dell'affidabilità. Ogni tesi di investimento che usa la crescita dei ricavi come proxy della salute aziendale. Tutti stanno girando su segnali sempre più distaccati dalla realtà.`,

            `C'è un effetto cumulativo. Quando una misura diventa inaffidabile, la risposta è aggiungere altre misure. Più KPI. Più dati. Più dashboard. Ma ogni nuova misura, nel momento in cui viene resa nota e pesata, diventa un nuovo obiettivo. Il sistema non diventa più leggibile. Diventa meno.`,

            `Alcune cose rimangono relativamente immuni. Misure che richiedono la cosa vera, non solo una sua rappresentazione. Si può falsificare una lettera di referenza, ma non si può falsificare il giudizio di qualcuno che ha lavorato a fianco a te per anni. Si può manipolare un premio di design con submission strategiche, ma è difficile manufatturare il tipo di reputazione che viene da un decennio di buon lavoro in una comunità ristretta. Le misure più durevoli tendono a essere costose in tempo e relazione, non in denaro.`,

            `Il problema più profondo è istituzionale. Le nostre istituzioni — finanziarie, accademiche, aziendali, civiche — sono state costruite assumendo che le loro misure potessero essere considerate affidabili. Non possono, o almeno, possono esserlo sempre meno con ogni anno che passa mentre i costi di produzione calano. Le fabbriche di chiodi almeno producevano chiodi fisicamente reali. Le content farm non hanno nemmeno bisogno di produrre chiodi fisici.`,

            `Nessuno ha pianificato di costruire un mondo di recensioni false ed engagement manufatturato. È emerso naturalmente dalla collisione di buone misure, incentivi potenti e costi di produzione in calo. Capire che è un problema strutturale, non morale, è il primo passo. La soluzione strutturale — qualunque essa sia — richiederà di incorporare la verità in luoghi dove produrre un falso convincente è genuinamente costoso. È un problema di ingegneria più difficile di quanto sembri.`,

            `I chiodi di Mosca erano almeno pesanti.`,
        ]
    }
};

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
                    font-family: 'Georgia', 'Times New Roman', serif;
                }
                .lang-toggle {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: #111;
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
                    font-family: 'Inter', sans-serif;
                    transition: border-color 0.2s;
                }
                .lang-toggle:hover { border-color: #555; }
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #555;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 3.5rem;
                    transition: color 0.2s;
                }
                .back-link:hover { color: #eaeaea; }
                .article-body p {
                    color: #c0c0c0;
                    line-height: 1.85;
                    margin-bottom: 1.5rem;
                    font-size: 1.08rem;
                }
                .article-body p:first-child::first-letter {
                    font-size: 3.2rem;
                    font-weight: 700;
                    float: left;
                    line-height: 0.85;
                    margin-right: 0.12em;
                    color: #eaeaea;
                }
                .article-body p.standalone {
                    color: #888;
                    font-style: italic;
                    border-left: 2px solid #2a2a2a;
                    padding-left: 1.2rem;
                    margin: 2rem 0;
                }
            `}</style>

            <button className="lang-toggle" onClick={() => setLang(l => l === 'en' ? 'it' : 'en')}>
                <Globe size={14} /> {lang === 'en' ? 'IT' : 'EN'}
            </button>

            <div style={{ maxWidth: '680px', margin: '0 auto', padding: '5rem 2rem' }}>

                <Link href="/" className="back-link">
                    <ArrowLeft size={15} /> {t.backLabel}
                </Link>

                {/* Header */}
                <header style={{ marginBottom: '3.5rem' }}>
                    <p style={{
                        fontSize: '0.8rem',
                        color: '#444',
                        fontFamily: 'monospace',
                        marginBottom: '1.2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {t.date} &bull; {t.readTime}
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.2,
                        color: '#eaeaea',
                        fontFamily: "'Inter', sans-serif",
                        marginBottom: '1rem'
                    }}>
                        {t.title}
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#555',
                        lineHeight: 1.6,
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        {t.subtitle}
                    </p>
                    <div style={{ height: '1px', background: '#1a1a1a', marginTop: '2.5rem' }} />
                </header>

                {/* Article body */}
                <article className="article-body">
                    {t.paragraphs.map((para, i) => {
                        // short standalone paragraphs (< 80 chars) get italic treatment
                        const isStandalone = para.length < 80;
                        return (
                            <p key={i} className={isStandalone ? 'standalone' : ''}>
                                {para}
                            </p>
                        );
                    })}
                </article>

                {/* Footer */}
                <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #1a1a1a' }}>
                    <Link href="/" className="back-link">
                        <ArrowLeft size={15} /> {t.backLabel}
                    </Link>
                </div>

            </div>
        </>
    );
}
