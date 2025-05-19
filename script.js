// Vent på at hele DOM'en er indlæst, før scriptet køres
document.addEventListener('DOMContentLoaded', () => {
    // --- Data for Skriv (Brugerens Danske Tekst) ---
    const writingsData = [
        {
            title: "ok",
            fullText: `Jeg ser dig hver dag, En jakke, en cykelist, en stemme i det fjerne.
Mange ting minder om dig, Er det afsavnet?
Er det mit min samvittighed?
Er det dig?

Savn fortolkes, Savn overvejes, Tårer spildes,
Tårer grædes,

To sønner uden deres far, En far som altid har været der, En far som har lyttet, En far som har forstået, En far som har støttet,

Du er her ikke mere,
3 år er gået på få øjeblikke, Hvis 3 år kan forsvinde ved et knips, Hvad så med mit liv?
Hvad med mine døtre?
Når jeg at opdage, lære dem at kende,
opdrage dem, elske dem?
Jeg ser dig hver dag,
så hvorfor savner jeg dig så meget?
Hvordan kan jeg være fortabt, når jeg ikke ved hvor jeg skal hen?`
        },
        {
            title: "ok2",
            fullText: `Hvad sker der når vi dør? Bliver vi mødt? Bliver vi mødt af vores indre afsavn? Dem som vi ikke følte vi besøgte nok, Dem som vi ikke elskede nok, Dem som vi ikke kunne leve uden, Dem som vi nu kan være sammen med.

Men bliver vi accepteret?
Har de affundet sig ved døden?
Kan de leve med at du er ankommet?
Eller bliver der sort?
Sort. Ingenting. Nul.

Måske vi bliver mødt af det vi tror på, En gud, en filosofi, en tanke? Et familiemedlem. Lever vi videre i de levendes tanker?
Eller bliver vi glemt?

En ting er sikkert.
Taler vi aldrig om de døde, så bliver der sort.
Så kan vi ikke leve videre, så bliver vi glemt, og når man bliver glemt, er man ikke længere til.

Sort. Ingenting. Nul`
        },
        {
            title: "ok3",
            fullText: `Livet er og bliver svært, Det er svært at være til, Det er svært at kigge sig omkring,
Det er svært at kigge ind ad.
Fordi, kigger vi kun ud,
får vi så nogensinde styr, styr på os selv og vores egne problemer,
styr på os selv og vores egne mangler? vores egne fejl?

Men hvorfor er livet så svært?
Livet er som et korthus, det kan blives stort og smukt, men med et enkelt forkert pust, bum. Så er livet veltet, endt og gået.
og nåede du alt det du skulle mens du var her?
nåede du at elske? nåede du at blive elsket?
nåede du at finde ud af hvad du skulle mens du var her?
Nåede du at finde ud af hvorfor du var her?

Livet er svært, Der er mange spørgsmål der puster på ens korthus.
Hver eneste dag med frygt for at det vil falde. Og hvis det falder, er det så for sent at bygge det op på ny?
Meningen med det hele er nok at mestre,
mestre ikke at spekulere,
Ikke at spekulere om du var god nok, om andre synes du var god nok, eller om dine egne forventninger blev opfyldt,

Livet er svært,
men kan du tæmme spekulationens fangarme, kan det måske blive en smule lettere at være til,
i denne verden`
        },
        {
            title: "ok4",
            fullText: `Hvornår er man god nok?
Det ved jeg ikke om man bliver,
..og god nok til hvad? 
Til sig selv, eller sine omgivelser? 
Forventninger der hober sig op,
forventninger fra de bedste i ens liv,
forventninger fra venner,
venner som man ikke kan leve uden,
venner som man ikke vil skuffe.
Hvis ikke de kan opfyldes,
er jeg så overhovedet god nok? `
        },
        {
            title: "ok5",
            fullText: `Jeg har en skygge jeg ikke kan slippe af med.
Skygger er normalt ikke til at slippe,
men den her har jeg kæmpet med hele mit liv. 
Det er ikke en stemme, en tanke eller andet. 
Det er ikke noget jeg forestiller mig, eller bilder mig selv ind. 
Det er en jeg kæmper med hver eneste dag, og en jeg har kæmpet med det meste af mit voksne liv.. 

Jeg har ikke vidst hvor skrøbelig jeg var, 
lige indtil den første forelskelse, 
den første skuffelse, 
det første møgfald. 

Hele min barndom har jeg været glad, 
jeg har altid været den glade,
den som aldrig var ked af det,
den som støttede mine kammerater når de lå nede i mudderet. 
Dertil voksede jeg op, og der medfulgte skuffelse
depression, angst, frygt, usikkerhed. 
Skuffelse i kærlighed. Var jeg ikke god nok? 
Depression. Hvad skal jeg her? 
Angst. Hvorfor er jeg ikke social længere? Hvorfor er jeg blevet bange for kontakt? 
Frygt. Frygt for at miste, frygt for at være alene.
Usikkerhed. Hvorfor er jeg ikke god nok? 

Alle disse ting er noget som skyggen bilder mig ind. 
Skyggen er og bliver mig selv. 
Jeg er min egen værste fjende. 
Jeg kan ikke slippe af med den. 

Jeg har for mange år siden fundet mit livs kærlighed. 
Hun elsker mig på trods af min skygge,
en skygge som jeg prøver at holde væk. 
Hvorfor elsker hun mig, når jeg har svært ved at elske mig selv? 
Hun givet mig mine døtre, og jeg elsker dem af hele mit hjerte. 

Skyggen er dog magtfuld og manipulerende. 
Fordi på trods af den kærlighedserklæring, 
overbeviser den mig stadig om skuffelse, depression, angst, frygt og usikkerhed.`
        }
        // Tilføj nye noter her ved at tilføje nye objekter til dette array
    ];

    // --- Modal Elementer ---
    const modalOverlay = document.getElementById('note-modal-overlay');
    const modalContainer = document.getElementById('note-modal');
    const modalTitleElement = document.getElementById('modal-title');
    const modalFullTextElement = document.getElementById('modal-full-text');
    const modalCloseButton = document.getElementById('modal-close-button');

    // --- Hjælpefunktion: Konverter linjeskift i brugerinput til <br> tags ---
    function convertNewlinesToBr(text) {
        if (!text) return '';
        return text.trim().replace(/\n/g, '<br>');
    }

    // --- Hjælpefunktion: Tilføj <br> efter tegnsætning ---
    function addPunctuationBreaks(htmlText) {
        if (!htmlText) return '';
        let processedText = htmlText;
        processedText = processedText.replace(/([,?!.])(\s*)/g, (match, punctuation, spaceAfterPunctuation) => {
            return punctuation + '<br>' + spaceAfterPunctuation;
        });
        processedText = processedText.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
        return processedText;
    }

    // --- Hjælpefunktion til at oprette snippet ---
    function createSnippet(fullText, wordCount = 10, charLimit = 85) { // Lidt højere charLimit pga. større font
        const textOnly = fullText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (!textOnly) return ''; 
        const words = textOnly.split(' ');
        let needsEllipsis = false;
        let snippetWordsArray = words.slice(0, wordCount);
        let currentSnippet = snippetWordsArray.join(' ');
        if (words.length > wordCount) needsEllipsis = true;
        if (currentSnippet.length > charLimit) {
            currentSnippet = currentSnippet.substring(0, charLimit);
            needsEllipsis = true; 
            const lastSpaceIndex = currentSnippet.lastIndexOf(' ');
            if (lastSpaceIndex > 0 && currentSnippet.length === charLimit) { 
                currentSnippet = currentSnippet.substring(0, lastSpaceIndex);
            }
        }
        if (needsEllipsis) {
            if (currentSnippet.endsWith('...')) return currentSnippet;
            if (currentSnippet.endsWith('.') || currentSnippet.endsWith(',')) {
                currentSnippet = currentSnippet.slice(0, -1);
            }
            return currentSnippet.trim() + '...'; 
        }
        return currentSnippet; 
    }

    // --- Funktion til at åbne Modal med Animation ---
    function openModalWithAnimation(title, originalFullText, clickedNoteElement) {
        // Tilføj klik-animation til noten
        if (clickedNoteElement) {
            clickedNoteElement.classList.add('note-clicked');
            // Fjern animationsklassen efter animationen er færdig for at tillade gentagelse
            setTimeout(() => {
                clickedNoteElement.classList.remove('note-clicked');
            }, 300); // Matcher varigheden af noteClickAnimation i CSS
        }

        // En lille forsinkelse før modalen vises for at lade note-klik-animationen spille lidt
        setTimeout(() => {
            modalTitleElement.textContent = title;
            const textWithUserBreaks = convertNewlinesToBr(originalFullText);
            const finalTextForDisplay = addPunctuationBreaks(textWithUserBreaks);
            
            modalFullTextElement.innerHTML = `<div class="text-gray-700 leading-loose mt-4">${finalTextForDisplay}</div>`;
            modalOverlay.classList.add('is-visible');
            modalContainer.classList.add('is-visible');
            document.body.classList.add('body-no-scroll');
        }, 100); // Lille forsinkelse for at klik-animationen kan ses
    }

    // --- Funktion til at lukke Modal ---
    function closeModal() {
        modalOverlay.classList.remove('is-visible');
        modalContainer.classList.remove('is-visible');
        document.body.classList.remove('body-no-scroll');
    }

    if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // --- Funktion til at oprette et Grid Note Element ---
    function createGridNoteElement(noteData, index) {
        const article = document.createElement('article');
        article.className = 'note bg-white p-6 md:p-8 rounded-2xl note-shadow transform';
        article.dataset.title = noteData.title;
        article.dataset.fullText = noteData.fullText;

        const snippetDiv = document.createElement('div');
        snippetDiv.className = 'note-snippet';

        const titleH3 = document.createElement('h3');
        // Bruger Tailwind klasser for størrelse og vægt, som er justeret i HTML/CSS
        titleH3.className = 'font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-3'; 
        titleH3.textContent = noteData.title;

        const snippetP = document.createElement('p');
        // Bruger Tailwind klasser for størrelse
        snippetP.className = 'text-gray-700 leading-relaxed text-md'; 
        snippetP.textContent = createSnippet(noteData.fullText); 

        snippetDiv.appendChild(titleH3);
        snippetDiv.appendChild(snippetP);
        article.appendChild(snippetDiv);

        article.addEventListener('click', () => {
            // Passerer 'article' elementet til animationsfunktionen
            openModalWithAnimation(article.dataset.title, article.dataset.fullText, article);
        });
        return article;
    }
    
    // --- Udfyld Skriv Grid ---
    const writingsGrid = document.querySelector('.writings-grid');
    if (writingsGrid) {
        writingsData.forEach((data, index) => {
            const noteEl = createGridNoteElement(data, index);
            writingsGrid.appendChild(noteEl);
        });
    }

    // --- Logik for Tilfældig Fremhævet Note ---
    const featuredNoteElement = document.getElementById('featured-note');
    const featuredTitleElement = document.getElementById('featured-title');
    const featuredSnippetElement = document.getElementById('featured-snippet-text');
    
    if (writingsData.length > 0 && featuredNoteElement) {
        const randomIndex = Math.floor(Math.random() * writingsData.length);
        const randomNoteData = writingsData[randomIndex];

        featuredTitleElement.textContent = randomNoteData.title;
        featuredSnippetElement.textContent = createSnippet(randomNoteData.fullText); 
        
        featuredNoteElement.dataset.title = randomNoteData.title;
        featuredNoteElement.dataset.fullText = randomNoteData.fullText;

        featuredNoteElement.addEventListener('click', () => {
            // Passerer 'featuredNoteElement' til animationsfunktionen
            openModalWithAnimation(featuredNoteElement.dataset.title, featuredNoteElement.dataset.fullText, featuredNoteElement);
        });

    } else if (featuredNoteElement) {
        featuredTitleElement.textContent = "ingen skriv endnu";
        featuredSnippetElement.textContent = "tilføj nogle noter til samlingen nedenfor for at se en fremhævet her.";
    }

    // --- Anvend Forskudt Fade-in Animation på ALLE noter (Grid + Fremhævet) ---
    const allNoteDOMElements = document.querySelectorAll('.note'); 
    const observerOptions = {
        root: null, rootMargin: '0px', threshold: 0.1 
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => { 
            if (entry.isIntersecting) {
                const actualIndex = Array.from(allNoteDOMElements).indexOf(entry.target);
                // Gør stagger-effekten lidt mere udtalt
                entry.target.style.animation = `fadeInAnimation 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) ${actualIndex * 0.15}s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    allNoteDOMElements.forEach(note => {
        scrollObserver.observe(note);
    });

    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
