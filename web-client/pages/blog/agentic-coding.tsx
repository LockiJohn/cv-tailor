import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';

const content = {
    en: {
        title: "On the Democratization of Software Creation",
        subtitle: "Agentic coding is not just a productivity tool. It is a shift in who gets to build things — and what that means.",
        date: "March 8, 2026",
        readTime: "12 min read",
        backLabel: "Back",
        sections: [
            {
                heading: null,
                paragraphs: [
                    `I want to be careful at the outset to distinguish between two very different things that are often conflated in discussions about AI and software development. The first is the productivity improvement that AI coding tools provide to existing software engineers. This is real, significant, and already happening. The second — and the one I find more interesting and consequential — is what happens to the minimum viable knowledge required to build functional software, and how that threshold will continue to fall. These are related but distinct phenomena, and I think conflating them leads to systematically underestimating what is actually occurring.`,

                    `Let me start with what I observe today. A software engineer in 2024, working with modern agentic coding tools, can accomplish roughly two to five times as much in a given day as they could five years ago, depending on the task. This is already remarkable — productivity improvements of that magnitude in any skilled profession are historically unusual. But what I find more striking is what is happening at the other end of the skill spectrum. People who would not have described themselves as software engineers at all — product managers, designers, domain experts in fields like medicine or law or finance — are now building functional applications. Not toy applications, not simple scripts: deployed, working software that solves real problems. The barrier to entry has fallen, and it has fallen fast.`
                ]
            },
            {
                heading: "The Architecture of Expertise",
                paragraphs: [
                    `To understand why this is happening, it helps to think carefully about what expertise in software development actually consists of. I think it can be roughly decomposed into several layers. At the bottom is syntactic knowledge: how programming languages work, how to express computations in code, how to avoid the immediate errors that prevent a program from running at all. Above that is structural knowledge: how to organize code, what patterns solve what classes of problems, how to think about the architecture of a system. Higher still is domain knowledge: what libraries and frameworks exist, how they interact, what their failure modes are. And above that is the kind of tacit, hard-to-articulate knowledge that comes from years of building and debugging real systems under real constraints.`,

                    `Historically, you needed all of these layers to build something nontrivial. A person who understood the problem they wanted to solve — who had deep domain expertise in, say, supply chain logistics or drug interaction modeling — but who lacked the lower layers of software expertise was effectively locked out of building their own tools. They could describe what they wanted. They could not implement it.`,

                    `Agentic coding tools have, in a meaningful sense, begun to absorb the lower layers of this expertise stack. The syntactic layer is now almost entirely handled by AI. The structural layer is increasingly handled. The framework and library knowledge layer is being absorbed at pace. What remains, increasingly, is the layer that was always the hardest to teach: a clear understanding of what you actually want, why you want it, and what constraints and tradeoffs matter. Which is to say: domain expertise and clear thinking.`
                ]
            },
            {
                heading: "The Trajectory From Here",
                paragraphs: [
                    `I think it is worth being fairly specific about where I expect this to go, while acknowledging significant uncertainty about timing. The current generation of agentic coding tools requires that a user be able to decompose a problem into reasonable sub-tasks, identify when an agent has gone wrong, and provide feedback corrections at a level of abstraction that the agent can act on. These are non-trivial skills. They require understanding what software can do, even if you don't know how to implement it. They require enough debugging intuition to notice when something is wrong before it compounds. This cognitive overhead is still keeping many potential builders out.`,

                    `The next generation of tools — and here I'm speaking of timescales of one to three years, not decades — will substantially reduce this overhead. I expect agentic systems that can take significantly more ambiguous problem specifications and resolve that ambiguity through a structured process of clarification and iteration, much the way a skilled contractor clarifies a client's architectural vision before breaking ground rather than after. I expect much stronger verification capabilities, so that the agent itself can test whether what it built actually does what was intended, catching entire classes of problems before they surface to the user. And I expect substantially longer autonomous working horizons — systems that can pursue a reasonably complex goal across dozens of steps without requiring re-alignment from the user at each one.`,

                    `If these expectations are roughly accurate, the minimum viable knowledge to build software will have fallen to something approximating: can you describe what you want in sufficient detail that a thoughtful person with no domain knowledge could begin to work on it? That is a skill that the vast majority of educated adults possess. It is not a skill that requires years of technical training to acquire.`
                ]
            },
            {
                heading: "What This Actually Means",
                paragraphs: [
                    `I want to resist the temptation to describe this purely in optimistic terms, not because I think the risks outweigh the benefits — I don't — but because I think sloppy optimism leads to underpreparation for predictable downsides.`,

                    `The straightforwardly positive version is compelling. Think about what it has meant historically that software development has been so technically demanding. Domain experts who understand their fields deeply — the nurse who knows exactly where electronic medical records fail patients, the small business owner who knows precisely what her bookkeeping software doesn't do, the teacher who has a clear vision of what a learning tool should actually look like — have been dependent on software engineers who don't share that domain knowledge to build their tools. That translation layer is costly. It is slow. It systematically distorts what gets built toward the priorities of people who can build rather than people who know. If agentic coding substantially dissolves that translation layer, things that have needed to exist for decades may now get built quickly, by the people who understood why they were needed all along.`,

                    `The global implications of this extend further. A significant fraction of the world's population is locked out of the economic gains of the software economy not primarily because they lack intelligence or ideas, but because they lack access to years of expensive technical training. Lowering the knowledge threshold for software creation does not just reallocate gains within existing software economies. It potentially expands who participates in creating digital infrastructure at all.`,

                    `The more complicated version involves what happens to people who have built careers on exactly the expertise that is being automated away. I think intellectual honesty requires acknowledging that the lower layers of software expertise — which represent a significant fraction of actual software engineering work, measured in hours — will be substantially devalued. This is not a comfortable thing to say, but I think it is true, and I think the people most affected deserve an honest account of what is happening rather than reassurance that everything will be fine.`,

                    `The historical analogy I keep returning to is not the one usually offered, which is the industrial revolution and what it did to craft manufacturing. I think the closer analogy is the introduction of word processing and desktop publishing in the 1980s. Before those tools, typesetting and layout were expert skills. After, they became widely accessible — which did not eliminate the value of genuine design expertise (that turned out to matter more than ever in some ways), but did dramatically reduce the number of people needed for basic typesetting work.  The expertise didn't disappear in value; it got compressed, and what remained was either the very high-end judgment work or the work that required understanding the domain the text was actually about. Something similar, I think, is the most plausible outcome here.`
                ]
            },
            {
                heading: "The New Scarce Resource",
                paragraphs: [
                    `If the technical knowledge required to build software is increasingly abundant — handled by agents — then the question becomes what remains scarce. I think the answer is more interesting than a simple "human creativity" or "soft skills" framing, which tends toward a kind of wishful vagueness.`,

                    `What remains genuinely scarce is: a precise and honest understanding of what problem actually needs solving. This sounds simple. It is not. Most problems are presented in ways that obscure their actual nature. The stated problem and the real problem are frequently different, and often neither the person describing the problem nor the person originally asked to solve it had the knowledge, time, or incentive to close that gap. A world of cheap code generation makes this gap much more expensive to ignore, because now the cost of generating the wrong software has dropped but the cost of having generated the wrong software has not.`,

                    `I think there will also be lasting value in what I'd call systems intuition — the ability to reason about the behavior of complex software systems under realistic conditions. What breaks, what scales, what interacts badly with what. This is not primarily a syntactic or structural skill. It is a conceptual skill, and it is one that agentic coding tools are, at least for now, not well-positioned to substitute for. They can generate the components. Whether the components will work together in the way you need them to, under the conditions you'll actually face, requires a kind of judgment that comes from exposure to systems that failed.`,

                    `None of this is an argument against the transition. It is an argument for being clear-eyed about it — about what is happening, at what speed, and with what consequences. Agentic coding is not a minor productivity enhancement. It represents a meaningful shift in the structure of who can build things, and by extension, in what kinds of things get built. I find that genuinely exciting. I also think it deserves more careful thought than it is typically receiving.`
                ]
            }
        ]
    },
    it: {
        title: "Sulla democratizzazione della creazione di software",
        subtitle: "Il coding agentivo non è solo uno strumento di produttività. È uno spostamento di chi può costruire — e di cosa questo significa.",
        date: "8 Marzo 2026",
        readTime: "12 min di lettura",
        backLabel: "Indietro",
        sections: [
            {
                heading: null,
                paragraphs: [
                    `Voglio essere preciso fin dall'inizio nel distinguere due cose molto diverse che spesso vengono confuse nelle discussioni su AI e sviluppo software. La prima è il miglioramento della produttività che gli strumenti di coding AI forniscono agli ingegneri software già esistenti. Questo è reale, significativo, e sta già avvenendo. La seconda — quella che trovo più interessante e consequenziale — è ciò che accade alla conoscenza minima necessaria per costruire software funzionale, e come questa soglia continuerà a scendere. Questi sono fenomeni correlati ma distinti, e credo che confonderli porti a sottostimare sistematicamente ciò che sta accadendo.`,

                    `Partiamo da ciò che osservo oggi. Un ingegnere software nel 2024, lavorando con strumenti moderni di agentic coding, può realizzare circa da due a cinque volte di più in una giornata rispetto a cinque anni fa, a seconda del compito. Questo è già notevole — miglioramenti di produttività di quella entità in qualsiasi professione qualificata sono storicamente insoliti. Ma ciò che trovo ancora più significativo è quello che sta succedendo all'altra estremità dello spettro di competenze. Persone che non si sarebbero mai descritte come ingegneri software — product manager, designer, esperti di dominio in campi come medicina, diritto o finanza — stanno costruendo applicazioni funzionali. Non applicazioni giocattolo, non semplici script: software deployato, funzionante, che risolve problemi reali. La barriera d'accesso è calata, e lo ha fatto velocemente.`
                ]
            },
            {
                heading: "L'architettura dell'expertise",
                paragraphs: [
                    `Per capire perché sta accadendo, è utile pensare attentamente a cosa consiste realmente l'expertise nello sviluppo software. Credo possa essere scomposta in diversi strati. Al fondo c'è la conoscenza sintattica: come funzionano i linguaggi di programmazione, come esprimere calcoli in codice, come evitare gli errori immediati che impediscono a un programma di girare. Sopra c'è la conoscenza strutturale: come organizzare il codice, quali pattern risolvono quali classi di problemi, come pensare all'architettura di un sistema. Più in alto ancora c'è la conoscenza di dominio: quali librerie e framework esistono, come interagiscono, quali sono i loro punti di rottura. E sopra tutto questo c'è il tipo di conoscenza tacita, difficile da articolare, che viene da anni di costruzione e debugging di sistemi reali sotto vincoli reali.`,

                    `Storicamente, avevi bisogno di tutti questi strati per costruire qualcosa di non triviale. Una persona che capiva il problema che voleva risolvere — che aveva una profonda expertise di dominio in, diciamo, logistica della supply chain o modellazione delle interazioni farmacologiche — ma che mancava degli strati inferiori dell'expertise software era effettivamente esclusa dalla possibilità di costruire i propri strumenti. Poteva descrivere cosa voleva. Non poteva implementarlo.`,

                    `Gli strumenti di agentic coding hanno, in senso significativo, cominciato ad assorbire gli strati inferiori di questo stack di expertise. Lo strato sintattico è ora quasi interamente gestito dall'AI. Lo strato strutturale viene gestito in misura crescente. Lo strato di conoscenza di framework e librerie viene assorbito rapidamente. Quello che rimane, sempre più, è lo strato che è sempre stato il più difficile da insegnare: una comprensione chiara di cosa si vuole veramente, perché lo si vuole, e quali vincoli e tradeoff contano. Vale a dire: expertise di dominio e pensiero chiaro.`
                ]
            },
            {
                heading: "La traiettoria da qui in poi",
                paragraphs: [
                    `Credo valga la pena essere abbastanza specifici su dove mi aspetto che questo vada, pur riconoscendo una significativa incertezza sui tempi. L'attuale generazione di strumenti di agentic coding richiede che un utente sia in grado di scomporre un problema in sotto-task ragionevoli, identificare quando un agente ha sbagliato, e fornire correzioni a un livello di astrazione su cui l'agente può agire. Queste non sono competenze banali. Richiedono di capire cosa può fare il software, anche se non sai come implementarlo. Richiedono abbastanza intuizione di debugging da notare quando qualcosa è sbagliato prima che si cumuli. Questo overhead cognitivo sta ancora tenendo fuori molti potenziali builder.`,

                    `La prossima generazione di strumenti — e qui sto parlando di scale temporali di uno o tre anni, non di decenni — ridurrà sostanzialmente questo overhead. Mi aspetto sistemi agentivi che possano prendere specifiche di problema significativamente più ambigue e risolvere quell'ambiguità attraverso un processo strutturato di chiarimento e iterazione, molto come un appaltatore esperto chiarisce la visione architettonica di un cliente prima di iniziare i lavori piuttosto che dopo. Mi aspetto capacità di verifica molto più forti, in modo che l'agente stesso possa testare se ciò che ha costruito fa effettivamente ciò che era previsto, intercettando intere classi di problemi prima che emergano all'utente. E mi aspetto orizzonti di lavoro autonomo sostanzialmente più lunghi — sistemi che possono perseguire un obiettivo ragionevolmente complesso attraverso dozzine di passi senza richiedere riallineamento da parte dell'utente a ogni passo.`,

                    `Se queste aspettative sono approssimativamente accurate, la conoscenza minima per costruire software sarà scesa a qualcosa che si approssima a: sai descrivere cosa vuoi con sufficiente dettaglio che una persona attenta senza conoscenza di dominio possa iniziare a lavorarci? Questa è una competenza che la stragrande maggioranza degli adulti istruiti possiede. Non è una competenza che richiede anni di formazione tecnica per essere acquisita.`
                ]
            },
            {
                heading: "Cosa significa davvero",
                paragraphs: [
                    `Voglio resistere alla tentazione di descrivere tutto questo in termini puramente ottimistici, non perché pensi che i rischi superino i benefici — non lo penso — ma perché l'ottimismo approssimativo porta a essere impreparati per gli aspetti negativi prevedibili.`,

                    `La versione semplicisticamente positiva è convincente. Pensate a cosa ha significato storicamente che lo sviluppo software fosse così esigente tecnicamente. Gli esperti di dominio che capiscono profondamente i loro campi — l'infermiera che sa esattamente dove le cartelle cliniche elettroniche falliscono i pazienti, il piccolo imprenditore che sa precisamente cosa il suo software di contabilità non fa, l'insegnante che ha una visione chiara di come dovrebbe apparire un strumento di apprendimento — sono stati dipendenti da ingegneri software che non condividono quella conoscenza di dominio per costruire i loro strumenti. Questo strato di traduzione è costoso. È lento. Distorce sistematicamente ciò che viene costruito verso le priorità di chi può costruire piuttosto che di chi sa. Se l'agentic coding dissolve sostanzialmente questo strato di traduzione, cose che avrebbero dovuto esistere da decenni potrebbero ora essere costruite rapidamente, dalle persone che hanno sempre capito perché erano necessarie.`,

                    `La versione più complicata riguarda cosa succede alle persone che hanno costruito carriere esattamente sull'expertise che viene automatizzata. Credo che l'onestà intellettuale richieda di riconoscere che gli strati inferiori dell'expertise software — che rappresentano una frazione significativa del lavoro effettivo di ingegneria software, misurato in ore — saranno sostanzialmente svalutati. L'analogia storica a cui continuo a tornare è l'introduzione del word processing e del desktop publishing negli anni '80. Prima di quegli strumenti, la composizione tipografica e il layout erano competenze specialistiche. Dopo, divennero ampiamente accessibili — il che non eliminò il valore della vera expertise di design, ma ridusse drasticamente il numero di persone necessarie per il lavoro tipografico di base. L'expertise non sparì in valore; venne compressa, e ciò che rimase era o il lavoro di giudizio di altissimo livello o il lavoro che richiedeva la comprensione del dominio a cui il testo si riferiva effettivamente. Qualcosa di simile, credo, è il risultato più plausibile qui.`
                ]
            },
            {
                heading: "La nuova risorsa scarsa",
                paragraphs: [
                    `Se la conoscenza tecnica necessaria per costruire software è sempre più abbondante — gestita da agenti — allora la domanda diventa cosa rimane scarso. Credo che la risposta sia più interessante di un semplice framing "creatività umana" o "soft skills", che tende verso un tipo di vaghezza ottimistica.`,

                    `Ciò che rimane genuinamente scarso è: una comprensione precisa e onesta di quale problema ha effettivamente bisogno di essere risolto. Questo suona semplice. Non lo è. La maggior parte dei problemi sono presentati in modi che oscurano la loro natura reale. Il problema dichiarato e il problema reale sono frequentemente diversi, e spesso né la persona che descrive il problema né la persona originariamente incaricata di risolverlo aveva la conoscenza, il tempo o l'incentivo per colmare quel divario. Un mondo di generazione di codice a basso costo rende questo divario molto più costoso da ignorare, perché ora il costo di generare il software sbagliato è sceso ma il costo di aver generato il software sbagliato non lo è.`,

                    `L'agentic coding non è un miglioramento minore della produttività. Rappresenta uno spostamento significativo nella struttura di chi può costruire cose, e di conseguenza, in quali tipi di cose vengono costruite. Trovo questo genuinamente eccitante. Penso anche che meriti una riflessione più attenta di quella che tipicamente riceve.`
                ]
            }
        ]
    }
};

export default function AgenticCoding() {
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
                .article-section h2 {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #eaeaea;
                    font-family: 'Inter', sans-serif;
                    letter-spacing: -0.02em;
                    margin-top: 3rem;
                    margin-bottom: 1.2rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #1e1e1e;
                }
                .article-section p {
                    color: #b8b8b8;
                    line-height: 1.9;
                    margin-bottom: 1.4rem;
                    font-size: 1.065rem;
                }
                .article-section p:first-of-type::first-letter {
                    font-size: 3.2rem;
                    font-weight: 700;
                    float: left;
                    line-height: 0.85;
                    margin-right: 0.12em;
                    color: #eaeaea;
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
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                        {t.subtitle}
                    </p>
                    <div style={{ height: '1px', background: '#1a1a1a', marginTop: '2.5rem' }} />
                </header>

                {/* Sections */}
                {t.sections.map((section, i) => (
                    <div key={i} className="article-section">
                        {section.heading && <h2>{section.heading}</h2>}
                        {section.paragraphs.map((para, j) => (
                            <p key={j}>{para}</p>
                        ))}
                    </div>
                ))}

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
