const QUIZ_LANGUAGES = [
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "ro", label: "Romana", flag: "🇷🇴" },
  { code: "bg", label: "Balgarski", flag: "🇧🇬" },
  { code: "sk", label: "Slovencina", flag: "🇸🇰" },
  { code: "ua", label: "Ukrainska", flag: "🇺🇦" }
];
const DEFAULT_LANG = "nl";

const TRANSLATIONS = {
  "shared.header.newsletter": {
    nl: "Inschrijven nieuwsbrief",
    en: "Subscribe to the newsletter",
    de: "Für den Newsletter anmelden",
    pl: "Zapisz się na newsletter",
    ro: "Abonează-te la newsletter",
    bg: "Абонирай се за бюлетина",
    sk: "Prihlásiť sa na newsletter",
    ua: "Підписатися на розсилку"
  },
  "shared.header.backHub": {
    nl: "Terug naar safety hub",
    en: "Back to the safety hub",
    de: "Zur Safety Hub zurück",
    pl: "Wróć do safety hub",
    ro: "Înapoi la safety hub",
    bg: "Назад към safety hub",
    sk: "Späť na safety hub",
    ua: "Назад до safety hub"
  },
  "shared.buttons.backToQuestions": {
    nl: "Terug naar vragen",
    en: "Back to the questions",
    de: "Zurück zu den Fragen",
    pl: "Wróć do pytań",
    ro: "Înapoi la întrebări",
    bg: "Назад към въпросите",
    sk: "Späť na otázky",
    ua: "Назад до запитань"
  },
  "shared.buttons.takePart": {
    nl: "Doe mee met de giveaway",
    en: "Join the giveaway",
    de: "Am Gewinnspiel teilnehmen",
    pl: "Dołącz do konkursu",
    ro: "Participă la tombolă",
    bg: "Участвай в играта",
    sk: "Zapoj sa do súťaže",
    ua: "Взяти участь у розіграші"
  },
  "shared.buttons.toVideos": {
    nl: "Ga naar video's",
    en: "Go to the videos",
    de: "Zu den Videos",
    pl: "Przejdź do filmów",
    ro: "Mergi la videoclipuri",
    bg: "Към видеата",
    sk: "Prejsť na videá",
    ua: "Перейти до відео"
  },
  "shared.buttons.newsletter": {
    nl: "Inschrijven nieuwsbrief",
    en: "Subscribe to the newsletter",
    de: "Für den Newsletter anmelden",
    pl: "Zapisz się na newsletter",
    ro: "Abonează-te la newsletter",
    bg: "Абонирай се за бюлетина",
    sk: "Prihlásiť sa na newsletter",
    ua: "Підписатися на розсилку"
  },
  "questions.stepEyebrow": {
    nl: "Stap 1",
    en: "Step 1",
    de: "Schritt 1",
    pl: "Krok 1",
    ro: "Pasul 1",
    bg: "Стъпка 1",
    sk: "Krok 1",
    ua: "Крок 1"
  },
  "questions.title": {
    nl: "Veiligheidsquiz",
    en: "Safety quiz",
    de: "Sicherheitsquiz",
    pl: "Quiz BHP",
    ro: "Chestionar de securitate",
    bg: "Тест по безопасност",
    sk: "Bezpečnostný kvíz",
    ua: "Тест з безпеки"
  },
  "questions.lead": {
    nl: "Beantwoord eerst al je vragen. Klik daarna op <strong>Gegevens invullen</strong> om ze op te slaan en door te gaan naar stap 2.",
    en: "Answer all questions first. Then click <strong>Provide details</strong> to save them and move to step 2.",
    de: "Beantworte zuerst alle Fragen. Klicke anschließend auf <strong>Daten eingeben</strong>, um alles zu speichern und zu Schritt 2 zu gehen.",
    pl: "Najpierw odpowiedz na wszystkie pytania. Następnie kliknij <strong>Uzupełnij dane</strong>, aby je zapisać i przejść do kroku 2.",
    ro: "Răspunde mai întâi la toate întrebările. Apoi apasă <strong>Completează datele</strong> pentru a salva și a trece la pasul 2.",
    bg: "Отговори първо на всички въпроси. След това натисни <strong>Попълни данните</strong>, за да ги запазиш и да продължиш към стъпка 2.",
    sk: "Najprv odpovedz na všetky otázky. Potom klikni na <strong>Vyplniť údaje</strong> a pokračuj na krok 2.",
    ua: "Спочатку дай відповіді на всі питання. Потім натисни <strong>Заповнити дані</strong>, щоб зберегти їх і перейти до кроку 2."
  },
  "questions.labelPrefix": {
    nl: "Vraag",
    en: "Question",
    de: "Frage",
    pl: "Pytanie",
    ro: "Întrebarea",
    bg: "Въпрос",
    sk: "Otázka",
    ua: "Питання"
  },
  "questions.titles.q1": {
    nl: "Situatie op de bouwplaats",
    en: "Situation on the job site",
    de: "Situation auf der Baustelle",
    pl: "Sytuacja na budowie",
    ro: "Situație pe șantier",
    bg: "Ситуация на обекта",
    sk: "Situácia na stavbe",
    ua: "Ситуація на будмайданчику"
  },
  "questions.bodies.q1": {
    nl: "Je staat op het punt te beginnen, maar er liggen plassen water waar je elektrisch gereedschap moet gebruiken. Wat doe je volgens de video “Bewust werken” voordat je start?",
    en: "You are about to start, but there are puddles where you have to work with power tools. According to the video “Working consciously”, what do you do before you start?",
    de: "Du willst beginnen, aber dort, wo du mit Elektro-Werkzeugen arbeiten musst, stehen Pfützen. Was machst du laut Video „Bewust werken“, bevor du startest?",
    pl: "Zaraz zaczynasz, ale w miejscu pracy stoją kałuże, a musisz używać elektronarzędzi. Co według filmu „Świadoma praca” robisz przed startem?",
    ro: "Ești pe cale să începi, dar sunt bălți acolo unde trebuie să lucrezi cu scule electrice. Ce faci conform video-ului „Lucrează conștient” înainte de a începe?",
    bg: "Готов си да започнеш, но има локви там, където трябва да работиш с електроинструменти. Какво правиш според видеото „Работи съзнателно“ преди да започнеш?",
    sk: "Chystáš sa začať, ale tam, kde máš používať elektrické náradie, sú kaluže. Čo podľa videa „Vedome pracovať“ urobíš pred štartom?",
    ua: "Ти збираєшся почати, але там, де потрібно працювати з електроінструментом, є калюжі. Що робиш згідно з відео «Працюй свідомо» перед початком?"
  },
  "questions.titles.q2": {
    nl: "Koppel risico's en beschermingsmiddelen",
    en: "Match risks and protection",
    de: "Risiken und Schutz zuordnen",
    pl: "Połącz zagrożenia i ochronę",
    ro: "Potrivește riscurile cu protecția",
    bg: "Свържи рисковете със защитата",
    sk: "Spáruj riziká a ochranu",
    ua: "Поєднай ризики та захист"
  },
  "questions.bodies.q2": {
    nl: "Versleep elk pictogram naar het risico waarbij het hoort. Elk pictogram kan maar één keer gebruikt worden.",
    en: "Drag each pictogram to the risk it belongs to. Each pictogram can be used only once.",
    de: "Ziehe jedes Piktogramm zu dem passenden Risiko. Jedes Piktogramm darf nur einmal verwendet werden.",
    pl: "Przeciągnij każdą ikonę do odpowiedniego zagrożenia. Każdą ikonę możesz użyć tylko raz.",
    ro: "Trage fiecare pictogramă către riscul corespunzător. Fiecare pictogramă poate fi folosită o singură dată.",
    bg: "Плъзни всяка пиктограма към съответния риск. Всяка пиктограма се използва само веднъж.",
    sk: "Presuň každú piktogram k príslušnému riziku. Každý symbol sa dá použiť iba raz.",
    ua: "Перетягни кожну піктограму до відповідного ризику. Кожну піктограму можна використати лише один раз."
  },
  "questions.match.legendTitle": {
    nl: "Kennisvraag – combinatie",
    en: "Knowledge question – matching",
    de: "Wissensfrage – Zuordnung",
    pl: "Pytanie wiedzy – dopasowanie",
    ro: "Întrebare de cunoștințe – potrivire",
    bg: "Знание – съчетаване",
    sk: "Vedná otázka – priradenie",
    ua: "Питання знань – поєднання"
  },
  "questions.match.legendHint": {
    nl: "Koppel elk risico aan het juiste beschermingsmiddel.",
    en: "Match every risk with the right protection.",
    de: "Ordne jedem Risiko den passenden Schutz zu.",
    pl: "Przypisz do każdego zagrożenia właściwą ochronę.",
    ro: "Potrivește fiecare risc cu echipamentul corect.",
    bg: "Свържи всеки риск със съответната защита.",
    sk: "Priraď každému riziku správnu ochranu.",
    ua: "Поєднай кожен ризик із відповідним захистом."
  },
  "questions.match.hint": {
    nl: "Sleep hier het juiste beschermingsmiddel.",
    en: "Drag the correct protection here.",
    de: "Ziehe hier den passenden Schutz hinein.",
    pl: "Przeciągnij tutaj odpowiednie zabezpieczenie.",
    ro: "Trage aici echipamentul corect.",
    bg: "Провлечи тук правилната защита.",
    sk: "Presuň sem správnu ochranu.",
    ua: "Перетягни сюди відповідний засіб захисту."
  },
  "questions.match.placeholder": {
    nl: "Nog niets geplaatst",
    en: "Nothing placed yet",
    de: "Noch nichts abgelegt",
    pl: "Jeszcze nic nie przypisano",
    ro: "Încă nu ai plasat nimic",
    bg: "Все още няма елемент",
    sk: "Zatiaľ nič vložené",
    ua: "Ще нічого не додано"
  },
  "questions.match.poolTitle": {
    nl: "Beschermingsmiddelen",
    en: "Protective equipment",
    de: "Schutzausrüstung",
    pl: "Środki ochrony",
    ro: "Echipamente de protecție",
    bg: "Средства за защита",
    sk: "Ochranné prostriedky",
    ua: "Засоби захисту"
  },
  "questions.match.poolHint": {
    nl: "Sleep elk pictogram naar een risico. Sleep terug naar dit vak om opnieuw te beginnen.",
    en: "Drag each pictogram to a risk. Drag it back here to start over.",
    de: "Ziehe jedes Piktogramm zu einem Risiko. Ziehe es zurück, um neu zu beginnen.",
    pl: "Przeciągnij każdą ikonę do ryzyka. Przeciągnij z powrotem, aby zacząć od nowa.",
    ro: "Trage fiecare pictogramă către un risc. Adu-o înapoi aici pentru a reîncepe.",
    bg: "Плъзни всяка пиктограма към риск. Върни я тук, за да започнеш отново.",
    sk: "Presuň každý symbol k riziku. Vráť ho späť sem, aby si začal znova.",
    ua: "Перетягни кожну піктограму до ризику. Поверни її сюди, щоб почати знову."
  },
  "questions.match.risks.trillingen": {
    nl: "Harde trillingen",
    en: "Strong vibrations",
    de: "Starke Vibrationen",
    pl: "Silne wibracje",
    ro: "Vibrații puternice",
    bg: "Силни вибрации",
    sk: "Silné vibrácie",
    ua: "Сильні вібрації"
  },
  "questions.match.risks.stof": {
    nl: "Vrijkomend stof / kleine deeltjes",
    en: "Dust / small particles",
    de: "Staub / kleine Partikel",
    pl: "Pył / drobne cząstki",
    ro: "Praf / particule fine",
    bg: "Прах / малки частици",
    sk: "Prach / drobné častice",
    ua: "Пил / дрібні частинки"
  },
  "questions.match.risks.elektriciteit": {
    nl: "Elektriciteit",
    en: "Electricity",
    de: "Elektrizität",
    pl: "Elektryczność",
    ro: "Electricitate",
    bg: "Електричество",
    sk: "Elektrina",
    ua: "Електрика"
  },
  "questions.match.risks.hoogte": {
    nl: "Werken op hoogte",
    en: "Working at height",
    de: "Arbeiten in der Höhe",
    pl: "Praca na wysokości",
    ro: "Lucru la înălțime",
    bg: "Работа на височина",
    sk: "Práca vo výške",
    ua: "Робота на висоті"
  },
  "questions.match.risks.lawaai": {
    nl: "Hard lawaai",
    en: "Loud noise",
    de: "Laute Geräusche",
    pl: "Głośny hałas",
    ro: "Zgomot puternic",
    bg: "Силен шум",
    sk: "Hlasný hluk",
    ua: "Гучний шум"
  },
  "questions.match.ppe.valbescherming": {
    nl: "Valbescherming",
    en: "Fall protection",
    de: "Absturzsicherung",
    pl: "Ochrona przed upadkiem",
    ro: "Protecție împotriva căderii",
    bg: "Предпазване от падане",
    sk: "Zabezpečenie proti pádu",
    ua: "Захист від падіння"
  },
  "questions.match.ppe.elekhandschoenen": {
    nl: "Elektriciteitshandschoenen",
    en: "Electrical gloves",
    de: "Isolierende Handschuhe",
    pl: "Rękawice elektroizolacyjne",
    ro: "Mănuși electrice",
    bg: "Изолиращи ръкавици",
    sk: "Elektrikárske rukavice",
    ua: "Електроізоляційні рукавички"
  },
  "questions.match.ppe.trilhandschoenen": {
    nl: "Trilhandschoenen",
    en: "Anti-vibration gloves",
    de: "Anti-Vibrationshandschuhe",
    pl: "Rękawice antywibracyjne",
    ro: "Mănuși antivibrație",
    bg: "Антивибрационни ръкавици",
    sk: "Antivibračné rukavice",
    ua: "Антивібраційні рукавички"
  },
  "questions.match.ppe.adembescherming": {
    nl: "Adembescherming",
    en: "Respiratory protection",
    de: "Atemschutz",
    pl: "Ochrona dróg oddechowych",
    ro: "Protecție respiratorie",
    bg: "Дихателна защита",
    sk: "Ochrana dýchacích ciest",
    ua: "Захист дихальних шляхів"
  },
  "questions.match.ppe.oorbescherming": {
    nl: "Oorbescherming",
    en: "Hearing protection",
    de: "Gehörschutz",
    pl: "Ochronniki słuchu",
    ro: "Protecție auditivă",
    bg: "Защита за слуха",
    sk: "Ochrana sluchu",
    ua: "Захист слуху"
  },
  "questions.titles.q3": {
    nl: "Keuringsplicht",
    en: "Inspection duty",
    de: "Prüfpflicht",
    pl: "Obowiązek przeglądu",
    ro: "Obligația de verificare",
    bg: "Задължение за проверка",
    sk: "Povinnosť revízie",
    ua: "Обов'язок перевірки"
  },
  "questions.bodies.q3": {
    nl: "Een collega zegt dat zijn slijptol “net nieuw” is en dus niet gekeurd hoeft te worden. Wat is hier fout aan volgens Gereedschapskeuringen?",
    en: "A colleague says his grinder is “brand new” so it doesn’t need an inspection yet. According to Tool Inspections, what is wrong?",
    de: "Ein Kollege meint, seine Flex sei „nagelneu“ und müsse daher noch nicht geprüft werden. Was ist laut Werkzeuginspektionen daran falsch?",
    pl: "Kolega twierdzi, że jego szlifierka jest „zupełnie nowa”, więc nie wymaga przeglądu. Co jest w tym nie tak według zasad kontroli narzędzi?",
    ro: "Un coleg spune că polizorul lui este „nou-nouț” și nu trebuie verificat. Ce nu este în regulă conform verificărilor de scule?",
    bg: "Колега казва, че ъглошлайфът му е „чисто нов“, затова няма нужда от проверка. Какво не е наред според правилата за преглед на инструменти?",
    sk: "Kolega tvrdí, že jeho brúska je „úplne nová“, takže ešte netreba revíziu. Čo je na tom podľa kontrol náradia zlé?",
    ua: "Колега каже, що його шліфмашина «новенька», тому перевірка не потрібна. Що в цьому не так за правилами огляду інструментів?"
  },
  "questions.q3.options.a": {
    nl: "Nieuwe gereedschappen hebben een jaar vrijstelling",
    en: "New tools are exempt for one year",
    de: "Neue Werkzeuge haben ein Jahr Freistellung",
    pl: "Nowe narzędzia mają roczny wyjątek",
    ro: "Sculele noi au un an de scutire",
    bg: "Новите инструменти имат една година освобождаване",
    sk: "Nové náradie má ročný odklad",
    ua: "Новий інструмент звільнений на рік"
  },
  "questions.q3.options.b": {
    nl: "Alleen elektrische gereedschappen hoeven gekeurd",
    en: "Only electrical tools need inspection",
    de: "Nur Elektro-Werkzeuge müssen geprüft werden",
    pl: "Tylko elektronarzędzia wymagają przeglądu",
    ro: "Doar sculele electrice trebuie verificate",
    bg: "Само електрическите инструменти се проверяват",
    sk: "Kontrola sa týka iba elektrického náradia",
    ua: "Перевіряють лише електроінструмент"
  },
  "questions.q3.options.c": {
    nl: "Elk arbeidsmiddel moet gekeurd worden, ongeacht leeftijd",
    en: "Every work tool must be inspected, regardless of age",
    de: "Jedes Arbeitsmittel muss geprüft werden, unabhängig vom Alter",
    pl: "Każde narzędzie musi mieć przegląd, niezależnie od wieku",
    ro: "Fiecare echipament trebuie verificat, indiferent de vechime",
    bg: "Всяко работно средство се проверява, независимо от възрастта",
    sk: "Každý pracovný prostriedok musí byť revidovaný bez ohľadu na vek",
    ua: "Кожне знаряддя треба перевіряти незалежно від віку"
  },
  "questions.q3.options.d": {
    nl: "Een nieuw product is automatisch goedgekeurd",
    en: "A new product is automatically approved",
    de: "Ein neues Produkt ist automatisch freigegeben",
    pl: "Nowy produkt jest automatycznie zatwierdzony",
    ro: "Un produs nou este aprobat automat",
    bg: "Нов продукт е автоматично одобрен",
    sk: "Nový produkt je automaticky schválený",
    ua: "Новий виріб автоматично вважається придатним"
  },
  "questions.titles.q4": {
    nl: "Hijswerk",
    en: "Hoisting work",
    de: "Hebearbeiten",
    pl: "Prace dźwigowe",
    ro: "Lucrări de ridicare",
    bg: "Работа с подем",
    sk: "Práce s bremenami",
    ua: "Підіймальні роботи"
  },
  "questions.bodies.q4": {
    nl: "Waarom mag je volgens Hijsen nooit schuin hijsen, zelfs niet een klein beetje?",
    en: "Why is it forbidden according to Hoisting to lift at an angle, even a little?",
    de: "Warum darf man laut „Hijsen“ niemals schräg heben, auch nicht ein bisschen?",
    pl: "Dlaczego według zasad podnoszenia nie wolno podnosić po skosie, nawet minimalnie?",
    ro: "De ce nu ai voie, conform regulilor de ridicare, să ridici oblic, nici măcar puțin?",
    bg: "Защо според правилата за вдигане никога не бива да повдигаш под ъгъл, дори малък?",
    sk: "Prečo sa podľa pravidiel zdvíhania nesmie zdvíhať šikmo ani trochu?",
    ua: "Чому за правилами підйому не можна підіймати вантаж під кутом, навіть трохи?"
  },
  "questions.titles.q5": {
    nl: "Herkenning",
    en: "Recognition",
    de: "Erkennen",
    pl: "Rozpoznanie",
    ro: "Recunoaștere",
    bg: "Разпознаване",
    sk: "Rozpoznanie",
    ua: "Розпізнавання"
  },
  "questions.bodies.q5": {
    nl: "“De borgclip op een hijshaak is alleen nodig bij zware lasten.”",
    en: "“The safety clip on a lifting hook is only needed for heavy loads.”",
    de: "„Die Sicherungsklammer am Lasthaken ist nur bei schweren Lasten nötig.“",
    pl: "„Zabezpieczenie haka potrzebne jest tylko przy ciężkich ładunkach.”",
    ro: "„Siguranța cârligului este necesară doar pentru sarcini grele.”",
    bg: "„Предпазната щипка на куката е нужна само при тежки товари.“",
    sk: "„Bezpečnostná západka na háku je potrebná iba pri ťažkých bremenách.“",
    ua: "«Фіксатор на гаку потрібен лише для важких вантажів.»"
  },
  "questions.q5.options.true": {
    nl: "Juist",
    en: "True",
    de: "Richtig",
    pl: "Prawda",
    ro: "Adevărat",
    bg: "Вярно",
    sk: "Pravda",
    ua: "Правда"
  },
  "questions.q5.options.false": {
    nl: "Onjuist",
    en: "False",
    de: "Falsch",
    pl: "Fałsz",
    ro: "Fals",
    bg: "Невярно",
    sk: "Nepravda",
    ua: "Неправда"
  },
  "questions.titles.q6": {
    nl: "LMRA of voorbereiding?",
    en: "LMRA or preparation?",
    de: "LMRA oder Vorbereitung?",
    pl: "LMRA czy przygotowanie?",
    ro: "LMRA sau pregătire?",
    bg: "LMRA или подготовка?",
    sk: "LMRA alebo príprava?",
    ua: "LMRA чи підготовка?"
  },
  "questions.bodies.q6": {
    nl: "Volgens Bewust werken voer je een LMRA uit net voordat je start. Welke situatie hoort niet bij de LMRA maar bij de voorbereiding?",
    en: "According to Working consciously you carry out an LMRA right before you start. Which situation belongs to preparation instead of the LMRA?",
    de: "Laut „Bewust werken“ führst du die LMRA direkt vor dem Start durch. Welche Situation gehört zur Vorbereitung und nicht zur LMRA?",
    pl: "Według filmu „Świadoma praca” LMRA wykonujesz tuż przed startem. Która sytuacja należy do przygotowań, a nie do LMRA?",
    ro: "Conform “Lucrează conștient”, LMRA se face chiar înainte de pornire. Care situație ține de pregătire și nu de LMRA?",
    bg: "Според „Работи съзнателно“ LMRA се прави точно преди началото. Коя ситуация е част от подготовката, а не от LMRA?",
    sk: "Podľa „Vedome pracovať“ robíš LMRA tesne pred začiatkom. Ktorá situácia patrí do prípravy a nie do LMRA?",
    ua: "За «Працюй свідомо» LMRA роблять перед стартом. Яка ситуація належить до підготовки, а не до LMRA?"
  },
  "questions.q6.options.a": {
    nl: "Controle van PBM’s",
    en: "Checking PPE",
    de: "PSA kontrollieren",
    pl: "Sprawdzenie ŚOI",
    ro: "Verificarea EIP",
    bg: "Проверка на ЛПС",
    sk: "Kontrola OOPP",
    ua: "Перевірка ЗІЗ"
  },
  "questions.q6.options.b": {
    nl: "Checken of werkplek veilig en opgeruimd is",
    en: "Checking if the workplace is safe and tidy",
    de: "Prüfen, ob der Arbeitsplatz sicher und aufgeräumt ist",
    pl: "Sprawdzenie, czy miejsce pracy jest bezpieczne i uporządkowane",
    ro: "Verifică dacă locul de muncă este sigur și curat",
    bg: "Проверка дали работното място е безопасно и подредено",
    sk: "Skontrolovať, či je pracovisko bezpečné a upratané",
    ua: "Перевірити, чи робоче місце безпечне й чисте"
  },
  "questions.q6.options.c": {
    nl: "Controleren of gereedschap gekeurd is",
    en: "Checking whether the tools are certified",
    de: "Prüfen, ob das Werkzeug geprüft wurde",
    pl: "Sprawdzenie, czy narzędzia mają przegląd",
    ro: "Verifică dacă sculele sunt avizate",
    bg: "Проверка дали инструментите са проверени",
    sk: "Skontrolovať, či sú náradia revidované",
    ua: "Перевірити, чи інструмент пройшов огляд"
  },
  "questions.q6.options.d": {
    nl: "Overleggen wie wat gaat doen bij nood",
    en: "Discuss who does what in an emergency",
    de: "Absprechen, wer was im Notfall macht",
    pl: "Uzgodnić, kto co robi w sytuacji awaryjnej",
    ro: "Stabiliți cine ce face în caz de urgență",
    bg: "Обсъдете кой какво прави при авария",
    sk: "Dohodnite sa, kto čo robí pri núdzi",
    ua: "Узгодити, хто що робить у разі аварії"
  },
  "questions.titles.q7": {
    nl: "Praktijk op hoogte",
    en: "Practice at height",
    de: "Arbeiten in der Höhe",
    pl: "Praca na wysokości",
    ro: "Practică la înălțime",
    bg: "Практика на височина",
    sk: "Praxe vo výške",
    ua: "Практика на висоті"
  },
  "questions.bodies.q7": {
    nl: "Je moet een ladder gebruiken waarvan het keuringslabel niet leesbaar meer is. Wat zegt Gereedschapskeuringen dat je moet doen?",
    en: "You need to use a ladder whose inspection label can no longer be read. What do Tool Inspections say you must do?",
    de: "Du sollst eine Leiter benutzen, deren Prüfplakette unleserlich ist. Was musst du laut Werkzeuginspektionen tun?",
    pl: "Masz użyć drabiny z nieczytelną naklejką przeglądu. Co według zasad kontroli narzędzi powinieneś zrobić?",
    ro: "Trebuie să folosești o scară al cărei autocolant de verificare nu se mai poate citi. Ce trebuie să faci conform verificărilor?",
    bg: "Трябва да използваш стълба, чийто етикет за проверка не се чете. Какво изискват правилата?",
    sk: "Máš použiť rebrík, ktorého revízna značka je nečitateľná. Čo treba podľa kontrol urobiť?",
    ua: "Потрібно скористатися драбиною з нерозбірливою відміткою огляду. Що треба зробити за правилами?"
  },
  "questions.q7.options.a": {
    nl: "Zelf beoordelen of hij nog stevig is",
    en: "Judge yourself whether it’s still sturdy",
    de: "Selbst prüfen, ob sie stabil ist",
    pl: "Sam oceniać, czy jest stabilna",
    ro: "Evaluează singur dacă este stabilă",
    bg: "Сам прецени дали е стабилна",
    sk: "Sám posúď, či je pevný",
    ua: "Самостійно оцінити міцність"
  },
  "questions.q7.options.b": {
    nl: "Alleen gebruiken als je hem dagelijks inspecteert",
    en: "Use it only if you inspect it daily",
    de: "Nur verwenden, wenn du sie täglich prüfst",
    pl: "Używaj tylko przy codziennej kontroli",
    ro: "Folosește-o doar dacă o inspectezi zilnic",
    bg: "Ползвай я само при ежедневна проверка",
    sk: "Používaj len pri dennej kontrole",
    ua: "Використовуй лише за щоденної перевірки"
  },
  "questions.q7.options.c": {
    nl: "Niet gebruiken tot de keuring bevestigd is",
    en: "Do not use it until the inspection is confirmed or redone",
    de: "Nicht benutzen, bis die Prüfung bestätigt oder erneuert ist",
    pl: "Nie używaj, dopóki nie zostanie potwierdzony przegląd",
    ro: "Nu o folosi până nu este confirmată sau refăcută verificarea",
    bg: "Не я използвай, докато проверката не се потвърди или повтори",
    sk: "Nepoužívaj, kým sa revízia nepotvrdí alebo nezopakuje",
    ua: "Не використовуй, доки огляд не підтвердять чи не проведуть знову"
  },
  "questions.q7.options.d": {
    nl: "Alleen binnen gebruiken, dat is veiliger",
    en: "Use it indoors only, that’s safer",
    de: "Nur innen verwenden, das ist sicherer",
    pl: "Używaj tylko w pomieszczeniach, tak jest bezpieczniej",
    ro: "Folosește-o doar în interior, e mai sigur",
    bg: "Ползвай я само на закрито, това е по-безопасно",
    sk: "Používaj ho iba v interiéri, je to bezpečnejšie",
    ua: "Використовуй тільки в приміщенні, так безпечніше"
  },
  "questions.titles.q8": {
    nl: "Overkoepelende boodschap",
    en: "Core message",
    de: "Zentrale Botschaft",
    pl: "Główne przesłanie",
    ro: "Mesaj central",
    bg: "Основно послание",
    sk: "Hlavné posolstvo",
    ua: "Головне повідомлення"
  },
  "questions.bodies.q8": {
    nl: "Wat hebben de video’s Bewust werken, Gereedschapskeuringen en Hijsen inhoudelijk met elkaar gemeen?",
    en: "What do the videos Working consciously, Tool inspections and Hoisting have in common?",
    de: "Was haben die Videos „Bewust werken“, „Werkzeugprüfungen“ und „Hijsen“ inhaltlich gemeinsam?",
    pl: "Co łączy filmy „Świadoma praca”, „Kontrola narzędzi” i „Podnoszenie”?",
    ro: "Ce au în comun videoclipurile „Lucrează conștient”, „Verificarea sculelor” și „Ridicare”?",
    bg: "Какво общо имат видеата „Работи съзнателно“, „Проверка на инструменти“ и „Подем“?",
    sk: "Čo majú spoločné videá „Vedome pracovať“, „Kontrola náradia“ a „Zdvíhanie“?",
    ua: "Що спільного у відео «Працюй свідомо», «Огляд інструментів» та «Підіймання»?"
  },
  "questions.titles.q9": {
    nl: "Persoonlijke reflectie",
    en: "Personal reflection",
    de: "Persönliche Reflexion",
    pl: "Refleksja osobista",
    ro: "Reflecție personală",
    bg: "Лична рефлексия",
    sk: "Osobná reflexia",
    ua: "Особиста рефлексія"
  },
  "questions.bodies.q9": {
    nl: "Wanneer heb jij voor het laatst iemand aangesproken op onveilig gedrag, en hoe reageerde die persoon?",
    en: "When did you last address someone about unsafe behaviour and how did they react?",
    de: "Wann hast du zuletzt jemanden auf unsicheres Verhalten angesprochen und wie hat die Person reagiert?",
    pl: "Kiedy ostatnio zwróciłeś komuś uwagę na niebezpieczne zachowanie i jak zareagował?",
    ro: "Când ai atras ultima dată atenția cuiva pentru un comportament nesigur și cum a reacționat?",
    bg: "Кога за последно обърна внимание на някого за опасно поведение и как реагира?",
    sk: "Kedy si naposledy upozornil niekoho na nebezpečné správanie a ako reagoval?",
    ua: "Коли ти востаннє зробив зауваження за небезпечну поведінку і як людина відреагувала?"
  },
  "questions.titles.q10": {
    nl: "Vooruit denken",
    en: "Thinking ahead",
    de: "Vorausdenken",
    pl: "Myślenie z wyprzedzeniem",
    ro: "Gândește în avans",
    bg: "Мисли напред",
    sk: "Myslieť dopredu",
    ua: "Думати наперед"
  },
  "questions.bodies.q10": {
    nl: "Bij welk type werk op de bouw onderschatten mensen vaak de risico’s, en welke maatregel voorkomt dat het beste?",
    en: "For what kind of construction work do people often underestimate the risks, and which measure prevents that best?",
    de: "Bei welcher Bauarbeit unterschätzen Menschen häufig die Risiken und welche Maßnahme beugt dem am besten vor?",
    pl: "Przy jakich pracach na budowie ludzie najczęściej lekceważą ryzyko i jakie działanie najlepiej temu zapobiega?",
    ro: "La ce tip de lucru pe șantier oamenii subestimează riscurile și ce măsură previne cel mai bine acest lucru?",
    bg: "При каква работа на строеж хората често подценяват рисковете и коя мярка го предотвратява най-добре?",
    sk: "Pri akom type práce na stavbe ľudia podceňujú riziká a aké opatrenie tomu najlepšie zabráni?",
    ua: "Під час якого виду робіт на будівництві люди найчастіше недооцінюють ризики та який захід найкраще це попереджає?"
  },
  "questions.button.next": {
    nl: "Gegevens invullen",
    en: "Provide details",
    de: "Daten eingeben",
    pl: "Uzupełnij dane",
    ro: "Completează datele",
    bg: "Попълни данните",
    sk: "Vyplniť údaje",
    ua: "Заповнити дані"
  },
  "questions.alert.intro": {
    nl: "Je hebt nog niet alle vragen beantwoord:",
    en: "You have not answered every question yet:",
    de: "Du hast noch nicht alle Fragen beantwortet:",
    pl: "Nie odpowiedziałeś jeszcze na wszystkie pytania:",
    ro: "Nu ai răspuns încă la toate întrebările:",
    bg: "Все още не си отговорил на всички въпроси:",
    sk: "Ešte si neodpovedal na všetky otázky:",
    ua: "Ти ще не відповів на всі питання:"
  },
  "questions.alert.prompt": {
    nl: "Wil je toch doorgaan?",
    en: "Do you still want to continue?",
    de: "Möchtest du trotzdem fortfahren?",
    pl: "Czy mimo to chcesz kontynuować?",
    ro: "Vrei totuși să continui?",
    bg: "Искаш ли все пак да продължиш?",
    sk: "Chceš napriek tomu pokračovať?",
    ua: "Бажаєш усе одно продовжити?"
  },
  "details.stepEyebrow": {
    nl: "Stap 2",
    en: "Step 2",
    de: "Schritt 2",
    pl: "Krok 2",
    ro: "Pasul 2",
    bg: "Стъпка 2",
    sk: "Krok 2",
    ua: "Крок 2"
  },
  "details.title": {
    nl: "Gegevens afronden",
    en: "Complete your details",
    de: "Angaben abschließen",
    pl: "Uzupełnij dane",
    ro: "Finalizează datele",
    bg: "Завърши данните",
    sk: "Dokonči údaje",
    ua: "Заверши дані"
  },
  "details.lead": {
    nl: "Controleer je antwoorden en vul daarna je gegevens in. We koppelen ze aan je inzending.",
    en: "Check your answers and then enter your details. We will link them to your submission.",
    de: "Prüfe deine Antworten und gib anschließend deine Daten ein. Wir verknüpfen sie mit deiner Einsendung.",
    pl: "Sprawdź odpowiedzi, a potem wpisz swoje dane. Połączymy je z twoim zgłoszeniem.",
    ro: "Verifică răspunsurile și apoi completează datele. Le asociem cu înscrierea ta.",
    bg: "Провери отговорите и попълни данните си. Ще ги свържем с подаденото от теб.",
    sk: "Skontroluj odpovede a potom zadaj údaje. Prepojíme ich s tvojím záznamom.",
    ua: "Перевір відповіді та введи свої дані. Ми пов’яжемо їх із твоєю заявкою."
  },
  "details.summaryTitle": {
    nl: "Jouw antwoorden",
    en: "Your answers",
    de: "Deine Antworten",
    pl: "Twoje odpowiedzi",
    ro: "Răspunsurile tale",
    bg: "Твоите отговори",
    sk: "Tvoje odpovede",
    ua: "Твої відповіді"
  },
  "details.missing.prefix": {
    nl: "We konden geen ingevulde antwoorden vinden.",
    en: "We could not find any completed answers.",
    de: "Wir konnten keine ausgefüllten Antworten finden.",
    pl: "Nie znaleźliśmy żadnych wypełnionych odpowiedzi.",
    ro: "Nu am găsit răspunsuri completate.",
    bg: "Не открихме попълнени отговори.",
    sk: "Nenašli sme žiadne vyplnené odpovede.",
    ua: "Ми не знайшли жодних відповідей."
  },
  "details.missing.link": {
    nl: "Ga terug naar stap 1",
    en: "Go back to step 1",
    de: "Zurück zu Schritt 1",
    pl: "Wróć do kroku 1",
    ro: "Înapoi la pasul 1",
    bg: "Върни се към стъпка 1",
    sk: "Späť na krok 1",
    ua: "Повернись до кроку 1"
  },
  "details.missing.suffix": {
    nl: "om de quiz eerst in te vullen.",
    en: "to fill in the quiz first.",
    de: "um zuerst das Quiz auszufüllen.",
    pl: "aby najpierw wypełnić quiz.",
    ro: "pentru a completa mai întâi chestionarul.",
    bg: "за да попълниш първо теста.",
    sk: "aby si najprv vyplnil kvíz.",
    ua: "щоб спочатку пройти тест."
  },
  "details.fields.nameLabel": {
    nl: "Naam",
    en: "Name",
    de: "Name",
    pl: "Imię i nazwisko",
    ro: "Nume",
    bg: "Име",
    sk: "Meno",
    ua: "Ім’я"
  },
  "details.fields.namePlaceholder": {
    nl: "Voor- en achternaam",
    en: "First and last name",
    de: "Vor- und Nachname",
    pl: "Imię i nazwisko",
    ro: "Prenume și nume",
    bg: "Име и фамилия",
    sk: "Meno a priezvisko",
    ua: "Ім’я та прізвище"
  },
  "details.fields.companyLabel": {
    nl: "Bedrijf",
    en: "Company",
    de: "Unternehmen",
    pl: "Firma",
    ro: "Companie",
    bg: "Компания",
    sk: "Spoločnosť",
    ua: "Компанія"
  },
  "details.fields.companyPlaceholder": {
    nl: "Organisatie of opdrachtgever",
    en: "Organisation or client",
    de: "Organisation oder Auftraggeber",
    pl: "Organizacja lub zleceniodawca",
    ro: "Organizație sau client",
    bg: "Организация или възложител",
    sk: "Organizácia alebo objednávateľ",
    ua: "Організація або замовник"
  },
  "details.fields.emailLabel": {
    nl: "E-mailadres",
    en: "Email address",
    de: "E-Mail-Adresse",
    pl: "Adres e-mail",
    ro: "Adresă de e-mail",
    bg: "Имейл адрес",
    sk: "Emailová adresa",
    ua: "Електронна адреса"
  },
  "details.fields.emailPlaceholder": {
    nl: "naam@bedrijf.nl",
    en: "name@company.com",
    de: "name@firma.de",
    pl: "imie@firma.pl",
    ro: "nume@companie.ro",
    bg: "name@company.bg",
    sk: "meno@firma.sk",
    ua: "name@company.ua"
  },
  "details.status.loading": {
    nl: "Bezig met verzenden...",
    en: "Sending...",
    de: "Sende...",
    pl: "Wysyłanie...",
    ro: "Se trimite...",
    bg: "Изпращаме...",
    sk: "Odosielam...",
    ua: "Надсилаємо..."
  },
  "details.alert.noAnswers": {
    nl: "We hebben geen quizantwoorden gevonden. Vul eerst stap 1 in.",
    en: "We couldn’t find any quiz answers. Please complete step 1 first.",
    de: "Wir haben keine Quizantworten gefunden. Bitte erledige zuerst Schritt 1.",
    pl: "Nie znaleźliśmy odpowiedzi z quizu. Najpierw wypełnij krok 1.",
    ro: "Nu am găsit răspunsurile din quiz. Completează mai întâi pasul 1.",
    bg: "Не открихме отговори от теста. Попълни първо стъпка 1.",
    sk: "Nenašli sme odpovede z kvízu. Najprv dokonči krok 1.",
    ua: "Ми не знайшли відповідей тесту. Спочатку пройди крок 1."
  },
  "details.alert.missingFields": {
    nl: "Vul alle velden in voordat je verder gaat.",
    en: "Fill in all fields before you continue.",
    de: "Bitte fülle alle Felder aus, bevor du fortfährst.",
    pl: "Uzupełnij wszystkie pola, zanim przejdziesz dalej.",
    ro: "Completează toate câmpurile înainte de a continua.",
    bg: "Попълни всички полета, преди да продължиш.",
    sk: "Pred pokračovaním vyplň všetky polia.",
    ua: "Заповни всі поля перед продовженням."
  },
  "details.alert.error": {
    nl: "Opslaan in Google Sheets is niet gelukt. Controleer je verbinding en probeer opnieuw.",
    en: "Saving to Google Sheets failed. Check your connection and try again.",
    de: "Speichern in Google Sheets ist fehlgeschlagen. Prüfe die Verbindung und versuche es erneut.",
    pl: "Nie udało się zapisać w Google Sheets. Sprawdź połączenie i spróbuj ponownie.",
    ro: "Salvarea în Google Sheets a eșuat. Verifică conexiunea și încearcă din nou.",
    bg: "Записът в Google Sheets не бе успешен. Провери връзката и опитай пак.",
    sk: "Uloženie do Google Sheets zlyhalo. Skontroluj pripojenie a skús znova.",
    ua: "Не вдалося зберегти в Google Sheets. Перевір з’єднання й спробуй ще раз."
  },
  "success.stepEyebrow": {
    nl: "Stap afgerond",
    en: "Step completed",
    de: "Schritt abgeschlossen",
    pl: "Krok zakończony",
    ro: "Pas finalizat",
    bg: "Стъпката е завършена",
    sk: "Krok dokončený",
    ua: "Крок завершено"
  },
  "success.title": {
    nl: "Bedankt voor je inzending!",
    en: "Thank you for your submission!",
    de: "Danke für deine Einsendung!",
    pl: "Dziękujemy za zgłoszenie!",
    ro: "Mulțumim pentru înscriere!",
    bg: "Благодарим за изпратеното!",
    sk: "Ďakujeme za odoslanie!",
    ua: "Дякуємо за подачу!"
  },
  "success.body": {
    nl: "Je antwoorden en gegevens zijn opgeslagen. We laten van ons horen wanneer je in de prijzen valt.",
    en: "Your answers and details have been saved. We will contact you if you win a prize.",
    de: "Deine Antworten und Daten wurden gespeichert. Wir melden uns, falls du gewinnst.",
    pl: "Twoje odpowiedzi i dane zostały zapisane. Damy znać, jeśli wygrasz nagrodę.",
    ro: "Răspunsurile și datele tale au fost salvate. Te vom contacta dacă câștigi un premiu.",
    bg: "Отговорите и данните ти са запазени. Ще се свържем с теб, ако спечелиш.",
    sk: "Tvoje odpovede a údaje sú uložené. Ozveme sa ti, ak vyhráš.",
    ua: "Твої відповіді й дані збережено. Ми зв’яжемося з тобою, якщо виграєш."
  }
};

function getCurrentLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  if (requested && QUIZ_LANGUAGES.some((lang) => lang.code === requested)) {
    return requested;
  }
  return DEFAULT_LANG;
}

let currentLanguage = getCurrentLanguage();

document.documentElement.lang = currentLanguage === "ua" ? "uk" : currentLanguage;

window.currentQuizLanguage = currentLanguage;
window.quizTranslate = translate;
window.quizWithLang = withLang;

applyTranslations();
updateLanguageLinks();
setupLanguageSwitcher();

function translate(key, lang = currentLanguage) {
  const entry = TRANSLATIONS[key];
  if (!entry) return "";
  return entry[lang] || entry[DEFAULT_LANG] || Object.values(entry)[0] || "";
}

function withLang(base) {
  if (!base) return window.location.pathname;
  const absolutePattern = /^https?:/i;
  if (absolutePattern.test(base)) {
    const url = new URL(base);
    url.searchParams.set("lang", currentLanguage);
    return url.toString();
  }
  const [pathPart, hashPart] = base.split("#");
  const separator = pathPart.includes("?") ? "&" : "?";
  const built = `${pathPart}${separator}lang=${currentLanguage}`;
  return hashPart ? `${built}#${hashPart}` : built;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    let value = translate(key);
    if (!value) return;
    const number = node.getAttribute("data-i18n-number");
    if (number) {
      value = `${value} ${number}`;
    }
    const attr = node.getAttribute("data-i18n-attr");
    if (attr) {
      node.setAttribute(attr, value);
    } else {
      node.innerHTML = value;
    }
  });
}

function updateLanguageLinks() {
  document.querySelectorAll("[data-lang-base]").forEach((link) => {
    const base = link.getAttribute("data-lang-base");
    if (!base) return;
    link.href = withLang(base);
  });
}

function setupLanguageSwitcher() {
  const switcher = document.getElementById("languageSwitcher");
  if (!switcher) return;
  const trigger = document.getElementById("languageTrigger");
  const menu = document.getElementById("languageMenu");
  if (!trigger || !menu) return;

  const current = QUIZ_LANGUAGES.find((lang) => lang.code === currentLanguage);
  trigger.textContent = formatLanguageLabel(current) || "Language";
  trigger.setAttribute("aria-expanded", "false");
  menu.innerHTML = "";
  menu.classList.remove("is-visible");
  menu.hidden = true;

  QUIZ_LANGUAGES.forEach((lang) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = formatLanguageLabel(lang);
    button.dataset.value = lang.code;
    if (lang.code === currentLanguage) {
      button.setAttribute("aria-current", "true");
    }
    button.addEventListener("click", () => {
      if (lang.code === currentLanguage) {
        closeMenu();
        return;
      }
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang.code);
      window.location.assign(url.toString());
    });
    item.appendChild(button);
    menu.appendChild(item);
  });

  function closeMenu() {
    trigger.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-visible");
    menu.hidden = true;
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("is-visible", !expanded);
    menu.hidden = expanded;
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      closeMenu();
    }
  });
}

function formatLanguageLabel(lang) {
  if (!lang) return "";
  return lang.flag ? `${lang.flag} ${lang.label}` : lang.label;
}
