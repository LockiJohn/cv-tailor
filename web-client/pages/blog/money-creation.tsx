import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';

const content = {
    en: {
        title: "On Money Creation",
        subtitle: "Where money actually comes from, and why the answer is stranger than you think.",
        date: "March 8, 2026",
        readTime: "9 min read",
        backLabel: "Back",
        paragraphs: [
            `Consider a town with a single bank. The bank has 100 coins in its vault, deposited by the town's wealthiest farmer. A merchant comes in and asks for a loan of 80 coins to buy a new warehouse. The bank lends them out. Now there are 180 coins of purchasing power in the town: the farmer's 100 on deposit, and the merchant's 80 in hand, even though only 100 coins physically exist. The bank just created 80 coins worth of money.`,

            `This is, roughly, how money has always worked.`,

            `Most people have a model of banks in their head that goes like this: banks collect deposits, keep some for safety, and lend out the rest. The loan money comes from someone else's savings. This model is wrong. It was wrong in the 1800s, it is wrong today, and the Bank of England said so explicitly in a 2014 paper that caused a minor scandal among economics students who had been taught otherwise: "Whenever a bank makes a loan, it simultaneously creates a matching deposit in the borrower's bank account, thereby creating new money."`,

            `Banks don't lend out deposits. They create deposits.`,

            `The constraint isn't how many deposits they have. The constraints are: the interest rate set by the central bank (which makes borrowing more or less attractive), capital requirements (banks must hold some equity against losses), and the willingness of creditworthy borrowers to take on debt. That last one is arguably the most binding of the three.`,

            `This matters because it completely changes how you should think about monetary policy. When a central bank raises interest rates, it isn't making money more scarce by hoarding it. It's making borrowing more expensive, which reduces the incentive to take on new loans, which slows the rate at which the banking system manufactures new money. The central bank doesn't control the money supply directly. It controls the price of credit, which influences the rate at which private banks generate money through lending.`,

            `There are essentially three sources of new money in a modern economy.`,

            `The first is private bank lending. A person gets a mortgage, a company takes out a revolving credit line, a startup draws on a venture debt facility. In each case, money is created at the moment the loan is made and destroyed when it's repaid. The net money supply expands when new loans are being taken out faster than old ones are being paid back, and contracts in the reverse. Most of the money in circulation in any advanced economy was created this way.`,

            `The second is government deficit spending. When a government spends more than it collects in taxes, the difference has to come from somewhere. In practice, it issues bonds, which are bought by banks and other institutions, often with money they create in the process of buying them. The government then spends that money into the economy. Whether this is inflationary depends on whether the economy has spare capacity to absorb the demand. If it does, it's just more people working. If it doesn't, prices go up.`,

            `The third, which became newly visible after 2008, is central bank reserve creation — what became known as quantitative easing. The central bank creates reserves out of nothing and uses them to buy financial assets, typically government bonds, from the banking system. This doesn't directly create money in the economy in the way lending does, since the reserves sit in the banking system and never circulate in the real economy unless banks lend against them. It does push down long-term interest rates and, in theory, encourages more of category one.`,

            `These three mechanisms interact in complex ways. But they share a property that most people find counterintuitive: they are all demand-driven. Money isn't injected into the economy like water into a pipe. It's pulled into existence by the demand for credit, which is itself driven by expectations about the future. If businesses expect growth, they borrow to invest and money expands. If they expect contraction, they repair their balance sheets and money shrinks. The economy's mood partially determines the money supply, not just the reverse.`,

            `This creates some uncomfortable implications. Inflation isn't simply "too much money chasing too few goods." That framing assumes the money supply is exogenous — fixed externally and then distributed. But if money is created by lending decisions made by millions of private actors, the money supply is endogenous. It changes based on what people expect, which changes based on what money is available, which changes based on what people expect. The system is reflexive.`,

            `It also means that central banks have much less direct control than their public image suggests. They can raise the cost of credit. They can provide emergency liquidity. They can signal their intentions and hope the private banking system responds as expected. But they cannot simply dial money creation up or down like a faucet. During the 2008 crisis, the Fed dropped rates to zero and created trillions in reserves. Banks mostly sat on them. You can make credit cheap, but you can't force people to borrow.`,

            `The town with the single bank eventually had a problem. All the loans created money, which circulated. But some of that money left the town on imports, never to return. And the interest on the loans had to be paid, which meant borrowers needed to earn more than they borrowed. Where does the extra money to pay interest come from? It has to come from new loans, or from someone else's spending. In aggregate, the interest burden of a credit-money system can only be paid by continuous expansion — new money, new loans, new borrowers.`,

            `An economy that stops growing, in a credit-money system, quietly begins to eat itself.`,

            `This is not a design flaw that was accidentally introduced. It is a feature of any system where money is a liability of the banking system rather than a neutral medium. The town didn't design it this way. It emerged from millions of individual lending decisions, accumulated over centuries, formalized in regulation, and now so deeply embedded in everyday life that questioning it feels like questioning gravity.`,

            `Understanding where money comes from doesn't tell you what to do about it. But it does change what questions you ask. "Where will the government find the money?" is a less interesting question once you understand that the government's bank can create it. "Who will bear the inflation risk?" is a better one. "Can we sustain this level of credit growth?" is better still. The first question assumes scarcity. The better questions are about consequences.`,
        ]
    },
    it: {
        title: "Sulla creazione del denaro",
        subtitle: "Da dove viene davvero il denaro, e perché la risposta è più strana di quanto pensi.",
        date: "8 Marzo 2026",
        readTime: "9 min di lettura",
        backLabel: "Indietro",
        paragraphs: [
            `Immaginate un paese con una sola banca. La banca ha 100 monete nel caveau, depositate dal contadino più ricco del paese. Un mercante entra e chiede un prestito di 80 monete per acquistare un nuovo magazzino. La banca le presta. Ora nel paese esistono 180 monete di potere d'acquisto: le 100 del contadino in deposito, e le 80 del mercante in mano, anche se fisicamente esistono solo 100 monete. La banca ha appena creato 80 monete di denaro.`,

            `Questo è, grossomodo, come il denaro ha sempre funzionato.`,

            `La maggior parte delle persone ha in testa un modello delle banche che funziona così: le banche raccolgono depositi, ne tengono un po' per sicurezza, e prestano il resto. Il denaro del prestito viene dai risparmi di qualcun altro. Questo modello è sbagliato. Era sbagliato nell'800, è sbagliato oggi, e la Bank of England lo ha detto esplicitamente in un documento del 2014 che causò un piccolo scandalo tra gli studenti di economia: "Ogni volta che una banca concede un prestito, crea simultaneamente un deposito corrispondente nel conto bancario del mutuatario, creando così nuovo denaro."`,

            `Le banche non prestano depositi. Creano depositi.`,

            `Il vincolo non è quanti depositi hanno. I vincoli sono: il tasso di interesse fissato dalla banca centrale (che rende il prestito più o meno attraente), i requisiti di capitale (le banche devono detenere del patrimonio a fronte delle perdite), e la disponibilità di mutuatari solvibili ad assumere debiti. Quest'ultimo è probabilmente il più stringente dei tre.`,

            `Questo è importante perché cambia completamente il modo in cui si dovrebbe pensare alla politica monetaria. Quando una banca centrale alza i tassi di interesse, non sta rendendo il denaro più scarso accumulandolo. Sta rendendo il prestito più costoso, il che riduce l'incentivo a contrarre nuovi prestiti, il che rallenta il ritmo con cui il sistema bancario produce nuovo denaro. La banca centrale non controlla direttamente l'offerta di moneta. Controlla il prezzo del credito, che influenza il ritmo con cui le banche private generano denaro attraverso i prestiti.`,

            `In un'economia moderna esistono essenzialmente tre fonti di nuovo denaro.`,

            `La prima è il prestito bancario privato. Una persona ottiene un mutuo, un'azienda accede a una linea di credito revolving, una startup attinge a un debito venture. In ogni caso, il denaro viene creato nel momento in cui il prestito viene erogato e distrutto quando viene rimborsato. L'offerta netta di moneta si espande quando vengono contratti nuovi prestiti più velocemente di quanto vengano rimborsati quelli vecchi, e si contrae nel caso inverso. La maggior parte del denaro circolante in qualsiasi economia avanzata è stata creata in questo modo.`,

            `La seconda è la spesa pubblica in deficit. Quando un governo spende più di quanto incassa con le tasse, la differenza deve venire da qualche parte. In pratica, emette obbligazioni, acquistate da banche e altre istituzioni, spesso con denaro che creano nel processo di acquisto. Il governo poi spende quel denaro nell'economia. Se questo sia inflazionistico dipende dal fatto che l'economia abbia capacità di riserva per assorbire la domanda. Se sì, significa solo più persone che lavorano. Se no, i prezzi salgono.`,

            `La terza, diventata visibile dopo il 2008, è la creazione di riserve da parte della banca centrale — quella che è diventata nota come quantitative easing. La banca centrale crea riserve dal nulla e le utilizza per acquistare attività finanziarie, tipicamente titoli di stato, dal sistema bancario. Questo non crea direttamente denaro nell'economia nel modo in cui lo fa il prestito, poiché le riserve rimangono nel sistema bancario e non circolano mai nell'economia reale a meno che le banche non le prestino. Abbassa però i tassi di interesse a lungo termine e, in teoria, incoraggia più attività della prima categoria.`,

            `Questi tre meccanismi interagiscono in modi complessi. Ma condividono una proprietà che la maggior parte delle persone trova controintuitiva: sono tutti guidati dalla domanda. Il denaro non viene iniettato nell'economia come acqua in un tubo. Viene attirato all'esistenza dalla domanda di credito, che è a sua volta guidata dalle aspettative sul futuro. Se le imprese si aspettano crescita, prendono in prestito per investire e il denaro si espande. Se si aspettano una contrazione, riparano i loro bilanci e il denaro si contrae. L'umore dell'economia determina parzialmente l'offerta di moneta, non solo il contrario.`,

            `Questo crea alcune implicazioni scomode. L'inflazione non è semplicemente "troppo denaro che insegue troppo pochi beni." Questa formulazione assume che l'offerta di moneta sia esogena — fissata esternamente e poi distribuita. Ma se il denaro viene creato da decisioni di prestito prese da milioni di attori privati, l'offerta di moneta è endogena. Cambia in base a ciò che le persone si aspettano, il che cambia in base a quanto denaro è disponibile, il che cambia in base a ciò che le persone si aspettano. Il sistema è riflessivo.`,

            `Significa anche che le banche centrali hanno molto meno controllo diretto di quanto la loro immagine pubblica suggerisca. Possono alzare il costo del credito. Possono fornire liquidità di emergenza. Possono segnalare le proprie intenzioni e sperare che il sistema bancario privato risponda come previsto. Ma non possono semplicemente regolare la creazione di denaro come un rubinetto. Durante la crisi del 2008, la Fed ha portato i tassi a zero e creato migliaia di miliardi di riserve. Le banche le hanno per lo più accumulate. Si può rendere il credito economico, ma non si può obbligare le persone a prendere in prestito.`,

            `Il paese con la singola banca alla fine ebbe un problema. Tutti i prestiti creavano denaro che circolava. Ma parte di quel denaro lasciava il paese per importazioni, senza mai tornare. E gli interessi sui prestiti dovevano essere pagati, il che significava che i mutuatari dovevano guadagnare più di quanto avevano preso in prestito. Da dove viene il denaro extra per pagare gli interessi? Deve venire da nuovi prestiti, o dalla spesa di qualcun altro. In aggregato, il peso degli interessi di un sistema a moneta creditizia può essere pagato solo con un'espansione continua — nuovo denaro, nuovi prestiti, nuovi mutuatari.`,

            `Un'economia che smette di crescere, in un sistema a moneta creditizia, comincia silenziosamente a consumarsi.`,

            `Questo non è un difetto di progettazione introdotto accidentalmente. È una caratteristica di qualsiasi sistema in cui il denaro è una passività del sistema bancario piuttosto che un mezzo neutro. Il paese non l'ha progettato così. È emerso da milioni di decisioni di prestito individuali, accumulate nel corso dei secoli, formalizzate in regolamenti, e ora così profondamente radicato nella vita quotidiana che mettere in discussione tutto ciò sembra mettere in discussione la gravità.`,

            `Capire da dove viene il denaro non dice cosa fare al riguardo. Ma cambia le domande che si fanno. "Dove troverà i soldi il governo?" è una domanda meno interessante una volta capito che la banca del governo può crearli. "Chi si farà carico del rischio inflazionistico?" è una domanda migliore. "Possiamo sostenere questo livello di crescita del credito?" è ancora migliore. La prima domanda presuppone la scarsità. Le domande migliori riguardano le conseguenze.`,
        ]
    }
};

export default function OnMoneyCreation() {
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
                    color: #777;
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
                        const isStandalone = para.length < 90;
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
