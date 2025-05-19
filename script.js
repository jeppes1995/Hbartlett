// Vent på at hele DOM'en er indlæst, før scriptet køres
document.addEventListener('DOMContentLoaded', () => {
    // --- Data for Skriv (Brugerens Danske Tekst) ---
    // Brug backticks (`) for at skrive multiline tekst nemmere
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
        // Først trim for at fjerne overflødige linjeskift i starten/slutningen af template literal
        // Derefter erstat alle newline karakterer (\n) med <br>
        return text.trim().replace(/\n/g, '<br>');
    }

    // --- Hjælpefunktion: Tilføj <br> efter tegnsætning ---
    function addPunctuationBreaks(htmlText) {
        if (!htmlText) return '';
        let processedText = htmlText;
        // Tilføj <br> efter specificeret tegnsætning, bevar eventuelle mellemrum efter tegnet.
        // $1 er tegnet, $2 er mellemrummet.
        processedText = processedText.replace(/([,?!.])(\s*)/g, (match, punctuation, spaceAfterPunctuation) => {
            // Undgå at tilføje <br> hvis der allerede er et <br> lige efter (fra convertNewlinesToBr)
            // Dette er en simpel tjek; mere robust logik kan være nødvendig for komplekse tilfælde.
            // For nu fokuserer vi på at tilføje <br> og derefter rydde op.
            return punctuation + '<br>' + spaceAfterPunctuation;
        });
        
        // Ryd op: Konsolider flere <br> tags (potentielt med whitespace imellem) til et enkelt <br>.
        // Dette hjælper med at fjerne overflødige breaks, der kan opstå.
        processedText = processedText.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
        return processedText;
    }

    // --- Hjælpefunktion til at oprette snippet ---
    function createSnippet(fullText, wordCount = 10, charLimit = 75) {
        // Fjern HTML-tags for at få ren tekst til snippet-generering
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
            // Fjern eventuelt afsluttende tegnsætning før tilføjelse af ellipsis
            if (currentSnippet.endsWith('.') || currentSnippet.endsWith(',')) {
                currentSnippet = currentSnippet.slice(0, -1);
            }
            return currentSnippet.trim() + '...'; // Sørg for ingen efterfølgende mellemrum før ellipsis
        }
        return currentSnippet; 
    }

    // --- Funktion til at åbne Modal ---
    function openModal(title, originalFullText) { // Modtager nu originalFullText
        modalTitleElement.textContent = title;
        // Trin 1: Konverter brugerens linjeskift (fra template literals) til <br>
        const textWithUserBreaks = convertNewlinesToBr(originalFullText);
        // Trin 2: Tilføj yderligere <br> efter tegnsætning
        const finalTextForDisplay = addPunctuationBreaks(textWithUserBreaks);
        
        modalFullTextElement.innerHTML = `<div class="text-gray-700 leading-loose mt-4">${finalTextForDisplay}</div>`;
        modalOverlay.classList.add('is-visible');
        modalContainer.classList.add('is-visible');
        document.body.classList.add('body-no-scroll');
    }

    // --- Funktion til at lukke Modal ---
    function closeModal() {
        modalOverlay.classList.remove('is-visible');
        modalContainer.classList.remove('is-visible');
        document.body.classList.remove('body-no-scroll');
    }

    // Tilføj event listeners for at lukke modal
    if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);


    // --- Funktion til at oprette et Grid Note Element ---
    function createGridNoteElement(noteData, index) {
        const article = document.createElement('article');
        article.className = 'note bg-white p-6 md:p-8 rounded-2xl note-shadow transform';
        // Gem original data på elementet for nem adgang senere
        article.dataset.title = noteData.title;
        article.dataset.fullText = noteData.fullText; // Gem original fullText

        const snippetDiv = document.createElement('div');
        snippetDiv.className = 'note-snippet';

        const titleH3 = document.createElement('h3');
        titleH3.className = 'font-playfair text-2xl font-semibold text-gray-800 mb-3';
        titleH3.textContent = noteData.title;

        const snippetP = document.createElement('p');
        snippetP.className = 'text-gray-600 leading-relaxed text-sm';
        snippetP.textContent = createSnippet(noteData.fullText); // Snippet bruger original tekst

        snippetDiv.appendChild(titleH3);
        snippetDiv.appendChild(snippetP);
        article.appendChild(snippetDiv);

        // Klik-listener til at åbne modal
        article.addEventListener('click', () => {
            openModal(article.dataset.title, article.dataset.fullText);
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
    // const featuredContentFullSource = document.getElementById('featured-content-full-source'); // Ikke længere nødvendigt at gemme i DOM
    
    if (writingsData.length > 0 && featuredNoteElement) {
        const randomIndex = Math.floor(Math.random() * writingsData.length);
        const randomNoteData = writingsData[randomIndex];

        featuredTitleElement.textContent = randomNoteData.title;
        featuredSnippetElement.textContent = createSnippet(randomNoteData.fullText); 
        
        // Gem data på det fremhævede note-element for modal-funktionalitet
        featuredNoteElement.dataset.title = randomNoteData.title;
        featuredNoteElement.dataset.fullText = randomNoteData.fullText;

        featuredNoteElement.addEventListener('click', () => {
            openModal(featuredNoteElement.dataset.title, featuredNoteElement.dataset.fullText);
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
                entry.target.style.animation = `fadeInAnimation 0.5s ease-in-out ${actualIndex * 0.1}s forwards`;
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
