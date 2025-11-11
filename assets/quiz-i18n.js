const LANG_CODES = ['nl', 'en', 'de', 'pl', 'ro', 'bg', 'sk', 'ua'];
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
    "nl": "Inschrijven nieuwsbrief",
    "en": "Subscribe to the newsletter",
    "de": "Subscribe to the newsletter",
    "pl": "Subscribe to the newsletter",
    "ro": "Subscribe to the newsletter",
    "bg": "Subscribe to the newsletter",
    "sk": "Subscribe to the newsletter",
    "ua": "Subscribe to the newsletter"
  },
  "shared.header.backHub": {
    "nl": "Terug naar safety hub",
    "en": "Back to the safety hub",
    "de": "Back to the safety hub",
    "pl": "Back to the safety hub",
    "ro": "Back to the safety hub",
    "bg": "Back to the safety hub",
    "sk": "Back to the safety hub",
    "ua": "Back to the safety hub"
  },
  "shared.buttons.backToQuestions": {
    "nl": "Terug naar vragen",
    "en": "Back to the questions",
    "de": "Back to the questions",
    "pl": "Back to the questions",
    "ro": "Back to the questions",
    "bg": "Back to the questions",
    "sk": "Back to the questions",
    "ua": "Back to the questions"
  },
  "shared.buttons.takePart": {
    "nl": "Doe mee met de giveaway",
    "en": "Join the giveaway",
    "de": "Join the giveaway",
    "pl": "Join the giveaway",
    "ro": "Join the giveaway",
    "bg": "Join the giveaway",
    "sk": "Join the giveaway",
    "ua": "Join the giveaway"
  },
  "shared.buttons.toVideos": {
    "nl": "Ga naar video's",
    "en": "Go to the videos",
    "de": "Go to the videos",
    "pl": "Go to the videos",
    "ro": "Go to the videos",
    "bg": "Go to the videos",
    "sk": "Go to the videos",
    "ua": "Go to the videos"
  },
  "shared.buttons.newsletter": {
    "nl": "Inschrijven nieuwsbrief",
    "en": "Subscribe to the newsletter",
    "de": "Subscribe to the newsletter",
    "pl": "Subscribe to the newsletter",
    "ro": "Subscribe to the newsletter",
    "bg": "Subscribe to the newsletter",
    "sk": "Subscribe to the newsletter",
    "ua": "Subscribe to the newsletter"
  },
  "questions.stepEyebrow": {
    "nl": "Stap",
    "en": "Step",
    "de": "Step",
    "pl": "Step",
    "ro": "Step",
    "bg": "Step",
    "sk": "Step",
    "ua": "Step"
  },
  "questions.title": {
    "nl": "Veiligheidsquiz",
    "en": "Safety quiz",
    "de": "Safety quiz",
    "pl": "Safety quiz",
    "ro": "Safety quiz",
    "bg": "Safety quiz",
    "sk": "Safety quiz",
    "ua": "Safety quiz"
  },
  "questions.lead": {
    "nl": "Beantwoord eerst alle vragen. Klik daarna op <strong>Gegevens invullen</strong> om door te gaan naar stap 2.",
    "en": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "de": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "pl": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "ro": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "bg": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "sk": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2.",
    "ua": "Answer all questions first. Then click <strong>Provide details</strong> to continue to step 2."
  },
  "questions.labelPrefix": {
    "nl": "Vraag",
    "en": "Question",
    "de": "Question",
    "pl": "Question",
    "ro": "Question",
    "bg": "Question",
    "sk": "Question",
    "ua": "Question"
  },
  "questions.titles.q1": {
    "nl": "Koppel risico's en PBM's",
    "en": "Match risks and PPE",
    "de": "Match risks and PPE",
    "pl": "Match risks and PPE",
    "ro": "Match risks and PPE",
    "bg": "Match risks and PPE",
    "sk": "Match risks and PPE",
    "ua": "Match risks and PPE"
  },
  "questions.bodies.q1": {
    "nl": "Versleep elke PBM naar het risico waarbij het hoort. Elke PBM kan maar \u00e9\u00e9n keer gebruikt worden.",
    "en": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "de": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "pl": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "ro": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "bg": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "sk": "Drag each PPE item to the matching risk. Each PPE can be used only once.",
    "ua": "Drag each PPE item to the matching risk. Each PPE can be used only once."
  },
  "questions.titles.q2": {
    "nl": "Keuringsplicht",
    "en": "Inspection duty",
    "de": "Inspection duty",
    "pl": "Inspection duty",
    "ro": "Inspection duty",
    "bg": "Inspection duty",
    "sk": "Inspection duty",
    "ua": "Inspection duty"
  },
  "questions.bodies.q2": {
    "nl": "Een collega zegt dat zijn slijptol \"net nieuw\" is en dus niet gekeurd hoeft te worden. Welke stelling klopt?",
    "en": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "de": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "pl": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "ro": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "bg": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "sk": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?",
    "ua": "A colleague says his grinder is \"brand new\" so it does not need an inspection. Which statement is correct?"
  },
  "questions.titles.q3": {
    "nl": "Hijswerk",
    "en": "Hoisting work",
    "de": "Hoisting work",
    "pl": "Hoisting work",
    "ro": "Hoisting work",
    "bg": "Hoisting work",
    "sk": "Hoisting work",
    "ua": "Hoisting work"
  },
  "questions.bodies.q3": {
    "nl": "Waarom mag je volgens ladingen nooit schuin hijsen, zelfs niet een klein beetje?",
    "en": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "de": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "pl": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "ro": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "bg": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "sk": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?",
    "ua": "Why is it forbidden according to lifting guidelines to hoist at an angle, even a little?"
  },
  "questions.titles.q4": {
    "nl": "Herkenning",
    "en": "Recognition",
    "de": "Recognition",
    "pl": "Recognition",
    "ro": "Recognition",
    "bg": "Recognition",
    "sk": "Recognition",
    "ua": "Recognition"
  },
  "questions.bodies.q4": {
    "nl": "\"De borgclip op een hijshaak is alleen nodig bij zware lasten.\"",
    "en": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "de": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "pl": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "ro": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "bg": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "sk": "\"The safety clip on a lifting hook is only needed for heavy loads.\"",
    "ua": "\"The safety clip on a lifting hook is only needed for heavy loads.\""
  },
  "questions.titles.q5": {
    "nl": "LMRA of voorbereiding?",
    "en": "LMRA or preparation?",
    "de": "LMRA or preparation?",
    "pl": "LMRA or preparation?",
    "ro": "LMRA or preparation?",
    "bg": "LMRA or preparation?",
    "sk": "LMRA or preparation?",
    "ua": "LMRA or preparation?"
  },
  "questions.bodies.q5": {
    "nl": "Je voert een LMRA uit net voordat je start. Wat had je al voor je naar werk ging moeten doen?",
    "en": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "de": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "pl": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "ro": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "bg": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "sk": "You carry out an LMRA right before you start. What should you already have done before leaving for work?",
    "ua": "You carry out an LMRA right before you start. What should you already have done before leaving for work?"
  },
  "questions.titles.q6": {
    "nl": "Situatie op de bouwplaats",
    "en": "Situation on the job site",
    "de": "Situation on the job site",
    "pl": "Situation on the job site",
    "ro": "Situation on the job site",
    "bg": "Situation on the job site",
    "sk": "Situation on the job site",
    "ua": "Situation on the job site"
  },
  "questions.bodies.q6": {
    "nl": "Je staat op het punt te beginnen, maar er liggen plassen water waar je elektrisch gereedschap moet gebruiken. Wat doe je?",
    "en": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "de": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "pl": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "ro": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "bg": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "sk": "You are about to start, but there are puddles where you must use power tools. What do you do?",
    "ua": "You are about to start, but there are puddles where you must use power tools. What do you do?"
  },
  "questions.titles.q7": {
    "nl": "Praktijk op hoogte",
    "en": "Working at height",
    "de": "Working at height",
    "pl": "Working at height",
    "ro": "Working at height",
    "bg": "Working at height",
    "sk": "Working at height",
    "ua": "Working at height"
  },
  "questions.bodies.q7": {
    "nl": "Je moet een ladder gebruiken waarvan het keuringslabel niet leesbaar meer is. Wat moet je doen?",
    "en": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "de": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "pl": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "ro": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "bg": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "sk": "You need to use a ladder whose inspection label can no longer be read. What should you do?",
    "ua": "You need to use a ladder whose inspection label can no longer be read. What should you do?"
  },
  "questions.titles.q8": {
    "nl": "Persoonlijke reflectie",
    "en": "Personal reflection",
    "de": "Personal reflection",
    "pl": "Personal reflection",
    "ro": "Personal reflection",
    "bg": "Personal reflection",
    "sk": "Personal reflection",
    "ua": "Personal reflection"
  },
  "questions.bodies.q8": {
    "nl": "Wanneer heb jij voor het laatst iemand aangesproken op onveilig gedrag, en hoe reageerde die persoon?",
    "en": "When did you last address someone about unsafe behaviour, and how did they react?",
    "de": "When did you last address someone about unsafe behaviour, and how did they react?",
    "pl": "When did you last address someone about unsafe behaviour, and how did they react?",
    "ro": "When did you last address someone about unsafe behaviour, and how did they react?",
    "bg": "When did you last address someone about unsafe behaviour, and how did they react?",
    "sk": "When did you last address someone about unsafe behaviour, and how did they react?",
    "ua": "When did you last address someone about unsafe behaviour, and how did they react?"
  },
  "questions.match.risks.trillingen": {
    "nl": "Harde trillingen",
    "en": "Strong vibrations",
    "de": "Strong vibrations",
    "pl": "Strong vibrations",
    "ro": "Strong vibrations",
    "bg": "Strong vibrations",
    "sk": "Strong vibrations",
    "ua": "Strong vibrations"
  },
  "questions.match.risks.stof": {
    "nl": "Vrijkomend stof / kleine deeltjes",
    "en": "Dust / small particles",
    "de": "Dust / small particles",
    "pl": "Dust / small particles",
    "ro": "Dust / small particles",
    "bg": "Dust / small particles",
    "sk": "Dust / small particles",
    "ua": "Dust / small particles"
  },
  "questions.match.risks.elektriciteit": {
    "nl": "Elektriciteit",
    "en": "Electricity",
    "de": "Electricity",
    "pl": "Electricity",
    "ro": "Electricity",
    "bg": "Electricity",
    "sk": "Electricity",
    "ua": "Electricity"
  },
  "questions.match.risks.hoogte": {
    "nl": "Werken op hoogte",
    "en": "Working at height",
    "de": "Working at height",
    "pl": "Working at height",
    "ro": "Working at height",
    "bg": "Working at height",
    "sk": "Working at height",
    "ua": "Working at height"
  },
  "questions.match.risks.lawaai": {
    "nl": "Hard lawaai",
    "en": "Loud noise",
    "de": "Loud noise",
    "pl": "Loud noise",
    "ro": "Loud noise",
    "bg": "Loud noise",
    "sk": "Loud noise",
    "ua": "Loud noise"
  },
  "questions.match.hint": {
    "nl": "Sleep hier de juiste PBM.",
    "en": "Drag the correct PPE here.",
    "de": "Drag the correct PPE here.",
    "pl": "Drag the correct PPE here.",
    "ro": "Drag the correct PPE here.",
    "bg": "Drag the correct PPE here.",
    "sk": "Drag the correct PPE here.",
    "ua": "Drag the correct PPE here."
  },
  "questions.match.placeholder": {
    "nl": "Nog niets geplaatst",
    "en": "Nothing placed yet",
    "de": "Nothing placed yet",
    "pl": "Nothing placed yet",
    "ro": "Nothing placed yet",
    "bg": "Nothing placed yet",
    "sk": "Nothing placed yet",
    "ua": "Nothing placed yet"
  },
  "questions.match.poolTitle": {
    "nl": "Beschermingsmiddelen",
    "en": "Protective equipment",
    "de": "Protective equipment",
    "pl": "Protective equipment",
    "ro": "Protective equipment",
    "bg": "Protective equipment",
    "sk": "Protective equipment",
    "ua": "Protective equipment"
  },
  "questions.match.poolHint": {
    "nl": "Versleep elke PBM naar een risico. Sleep terug naar dit vak om opnieuw te beginnen.",
    "en": "Drag each PPE item to a risk. Drag it back here to start over.",
    "de": "Drag each PPE item to a risk. Drag it back here to start over.",
    "pl": "Drag each PPE item to a risk. Drag it back here to start over.",
    "ro": "Drag each PPE item to a risk. Drag it back here to start over.",
    "bg": "Drag each PPE item to a risk. Drag it back here to start over.",
    "sk": "Drag each PPE item to a risk. Drag it back here to start over.",
    "ua": "Drag each PPE item to a risk. Drag it back here to start over."
  },
  "questions.match.legendTitle": {
    "nl": "",
    "en": "",
    "de": "",
    "pl": "",
    "ro": "",
    "bg": "",
    "sk": "",
    "ua": ""
  },
  "questions.match.legendHint": {
    "nl": "",
    "en": "",
    "de": "",
    "pl": "",
    "ro": "",
    "bg": "",
    "sk": "",
    "ua": ""
  },
  "questions.match.ppe.valbescherming": {
    "nl": "Valbescherming",
    "en": "Fall protection",
    "de": "Fall protection",
    "pl": "Fall protection",
    "ro": "Fall protection",
    "bg": "Fall protection",
    "sk": "Fall protection",
    "ua": "Fall protection"
  },
  "questions.match.ppe.elekhandschoenen": {
    "nl": "Elektriciteitshandschoenen",
    "en": "Electrical gloves",
    "de": "Electrical gloves",
    "pl": "Electrical gloves",
    "ro": "Electrical gloves",
    "bg": "Electrical gloves",
    "sk": "Electrical gloves",
    "ua": "Electrical gloves"
  },
  "questions.match.ppe.trilhandschoenen": {
    "nl": "Trilhandschoenen",
    "en": "Anti-vibration gloves",
    "de": "Anti-vibration gloves",
    "pl": "Anti-vibration gloves",
    "ro": "Anti-vibration gloves",
    "bg": "Anti-vibration gloves",
    "sk": "Anti-vibration gloves",
    "ua": "Anti-vibration gloves"
  },
  "questions.match.ppe.adembescherming": {
    "nl": "Adembescherming",
    "en": "Respiratory protection",
    "de": "Respiratory protection",
    "pl": "Respiratory protection",
    "ro": "Respiratory protection",
    "bg": "Respiratory protection",
    "sk": "Respiratory protection",
    "ua": "Respiratory protection"
  },
  "questions.match.ppe.oorbescherming": {
    "nl": "Oorbescherming",
    "en": "Hearing protection",
    "de": "Hearing protection",
    "pl": "Hearing protection",
    "ro": "Hearing protection",
    "bg": "Hearing protection",
    "sk": "Hearing protection",
    "ua": "Hearing protection"
  },
  "questions.q3.options.a": {
    "nl": "Nieuwe gereedschappen hebben een jaar vrijstelling",
    "en": "New tools are exempt for one year",
    "de": "New tools are exempt for one year",
    "pl": "New tools are exempt for one year",
    "ro": "New tools are exempt for one year",
    "bg": "New tools are exempt for one year",
    "sk": "New tools are exempt for one year",
    "ua": "New tools are exempt for one year"
  },
  "questions.q3.options.b": {
    "nl": "Alleen elektrische gereedschappen hoeven gekeurd",
    "en": "Only electrical tools need inspection",
    "de": "Only electrical tools need inspection",
    "pl": "Only electrical tools need inspection",
    "ro": "Only electrical tools need inspection",
    "bg": "Only electrical tools need inspection",
    "sk": "Only electrical tools need inspection",
    "ua": "Only electrical tools need inspection"
  },
  "questions.q3.options.c": {
    "nl": "Elk arbeidsmiddel moet gekeurd worden, ongeacht leeftijd",
    "en": "Every tool must be inspected regardless of age",
    "de": "Every tool must be inspected regardless of age",
    "pl": "Every tool must be inspected regardless of age",
    "ro": "Every tool must be inspected regardless of age",
    "bg": "Every tool must be inspected regardless of age",
    "sk": "Every tool must be inspected regardless of age",
    "ua": "Every tool must be inspected regardless of age"
  },
  "questions.q3.options.d": {
    "nl": "Een nieuw product is automatisch goedgekeurd",
    "en": "A new product is automatically approved",
    "de": "A new product is automatically approved",
    "pl": "A new product is automatically approved",
    "ro": "A new product is automatically approved",
    "bg": "A new product is automatically approved",
    "sk": "A new product is automatically approved",
    "ua": "A new product is automatically approved"
  },
  "questions.q5.options.true": {
    "nl": "Juist",
    "en": "True",
    "de": "True",
    "pl": "True",
    "ro": "True",
    "bg": "True",
    "sk": "True",
    "ua": "True"
  },
  "questions.q5.options.false": {
    "nl": "Onjuist",
    "en": "False",
    "de": "False",
    "pl": "False",
    "ro": "False",
    "bg": "False",
    "sk": "False",
    "ua": "False"
  },
  "questions.q6.options.a": {
    "nl": "Bedenken welke risico's er zijn",
    "en": "Think about the risks",
    "de": "Think about the risks",
    "pl": "Think about the risks",
    "ro": "Think about the risks",
    "bg": "Think about the risks",
    "sk": "Think about the risks",
    "ua": "Think about the risks"
  },
  "questions.q6.options.b": {
    "nl": "Checken of werkplek veilig en opgeruimd is",
    "en": "Check if the workplace is safe and tidy",
    "de": "Check if the workplace is safe and tidy",
    "pl": "Check if the workplace is safe and tidy",
    "ro": "Check if the workplace is safe and tidy",
    "bg": "Check if the workplace is safe and tidy",
    "sk": "Check if the workplace is safe and tidy",
    "ua": "Check if the workplace is safe and tidy"
  },
  "questions.q6.options.c": {
    "nl": "Controleren of gereedschap gekeurd is",
    "en": "Check if the tools are certified",
    "de": "Check if the tools are certified",
    "pl": "Check if the tools are certified",
    "ro": "Check if the tools are certified",
    "bg": "Check if the tools are certified",
    "sk": "Check if the tools are certified",
    "ua": "Check if the tools are certified"
  },
  "questions.q6.options.d": {
    "nl": "Nagaan of je weet wat te doen bij nood",
    "en": "Make sure you know what to do in an emergency",
    "de": "Make sure you know what to do in an emergency",
    "pl": "Make sure you know what to do in an emergency",
    "ro": "Make sure you know what to do in an emergency",
    "bg": "Make sure you know what to do in an emergency",
    "sk": "Make sure you know what to do in an emergency",
    "ua": "Make sure you know what to do in an emergency"
  },
  "questions.q7.options.a": {
    "nl": "Zelf beoordelen of hij nog stevig is",
    "en": "Judge yourself whether it is sturdy",
    "de": "Judge yourself whether it is sturdy",
    "pl": "Judge yourself whether it is sturdy",
    "ro": "Judge yourself whether it is sturdy",
    "bg": "Judge yourself whether it is sturdy",
    "sk": "Judge yourself whether it is sturdy",
    "ua": "Judge yourself whether it is sturdy"
  },
  "questions.q7.options.b": {
    "nl": "Alleen gebruiken als je hem dagelijks inspecteert",
    "en": "Use it only if you inspect it daily",
    "de": "Use it only if you inspect it daily",
    "pl": "Use it only if you inspect it daily",
    "ro": "Use it only if you inspect it daily",
    "bg": "Use it only if you inspect it daily",
    "sk": "Use it only if you inspect it daily",
    "ua": "Use it only if you inspect it daily"
  },
  "questions.q7.options.c": {
    "nl": "Niet gebruiken tot de keuring bevestigd is",
    "en": "Do not use it until the inspection is confirmed",
    "de": "Do not use it until the inspection is confirmed",
    "pl": "Do not use it until the inspection is confirmed",
    "ro": "Do not use it until the inspection is confirmed",
    "bg": "Do not use it until the inspection is confirmed",
    "sk": "Do not use it until the inspection is confirmed",
    "ua": "Do not use it until the inspection is confirmed"
  },
  "questions.q7.options.d": {
    "nl": "Alleen binnen gebruiken, dat is veiliger",
    "en": "Use it indoors only; that is safer",
    "de": "Use it indoors only; that is safer",
    "pl": "Use it indoors only; that is safer",
    "ro": "Use it indoors only; that is safer",
    "bg": "Use it indoors only; that is safer",
    "sk": "Use it indoors only; that is safer",
    "ua": "Use it indoors only; that is safer"
  },
  "questions.button.next": {
    "nl": "Gegevens invullen",
    "en": "Provide details",
    "de": "Provide details",
    "pl": "Provide details",
    "ro": "Provide details",
    "bg": "Provide details",
    "sk": "Provide details",
    "ua": "Provide details"
  },
  "questions.alert.intro": {
    "nl": "Je hebt nog niet alle vragen beantwoord:",
    "en": "You have not answered every question yet:",
    "de": "You have not answered every question yet:",
    "pl": "You have not answered every question yet:",
    "ro": "You have not answered every question yet:",
    "bg": "You have not answered every question yet:",
    "sk": "You have not answered every question yet:",
    "ua": "You have not answered every question yet:"
  },
  "questions.alert.prompt": {
    "nl": "Wil je toch doorgaan?",
    "en": "Do you still want to continue?",
    "de": "Do you still want to continue?",
    "pl": "Do you still want to continue?",
    "ro": "Do you still want to continue?",
    "bg": "Do you still want to continue?",
    "sk": "Do you still want to continue?",
    "ua": "Do you still want to continue?"
  },
  "details.stepEyebrow": {
    "nl": "Stap 2",
    "en": "Step 2",
    "de": "Step 2",
    "pl": "Step 2",
    "ro": "Step 2",
    "bg": "Step 2",
    "sk": "Step 2",
    "ua": "Step 2"
  },
  "details.title": {
    "nl": "Gegevens afronden",
    "en": "Complete your details",
    "de": "Complete your details",
    "pl": "Complete your details",
    "ro": "Complete your details",
    "bg": "Complete your details",
    "sk": "Complete your details",
    "ua": "Complete your details"
  },
  "details.lead": {
    "nl": "Controleer je antwoorden en vul daarna je gegevens in. We koppelen ze aan je inzending.",
    "en": "Check your answers and then enter your details. We will link them to your entry.",
    "de": "Check your answers and then enter your details. We will link them to your entry.",
    "pl": "Check your answers and then enter your details. We will link them to your entry.",
    "ro": "Check your answers and then enter your details. We will link them to your entry.",
    "bg": "Check your answers and then enter your details. We will link them to your entry.",
    "sk": "Check your answers and then enter your details. We will link them to your entry.",
    "ua": "Check your answers and then enter your details. We will link them to your entry."
  },
  "details.summaryTitle": {
    "nl": "Jouw antwoorden",
    "en": "Your answers",
    "de": "Your answers",
    "pl": "Your answers",
    "ro": "Your answers",
    "bg": "Your answers",
    "sk": "Your answers",
    "ua": "Your answers"
  },
  "details.missing.prefix": {
    "nl": "We konden geen ingevulde antwoorden vinden.",
    "en": "We could not find any completed answers.",
    "de": "We could not find any completed answers.",
    "pl": "We could not find any completed answers.",
    "ro": "We could not find any completed answers.",
    "bg": "We could not find any completed answers.",
    "sk": "We could not find any completed answers.",
    "ua": "We could not find any completed answers."
  },
  "details.missing.link": {
    "nl": "Ga terug naar stap 1",
    "en": "Go back to step 1",
    "de": "Go back to step 1",
    "pl": "Go back to step 1",
    "ro": "Go back to step 1",
    "bg": "Go back to step 1",
    "sk": "Go back to step 1",
    "ua": "Go back to step 1"
  },
  "details.missing.suffix": {
    "nl": "om de quiz eerst in te vullen.",
    "en": "to fill in the quiz first.",
    "de": "to fill in the quiz first.",
    "pl": "to fill in the quiz first.",
    "ro": "to fill in the quiz first.",
    "bg": "to fill in the quiz first.",
    "sk": "to fill in the quiz first.",
    "ua": "to fill in the quiz first."
  },
  "details.fields.nameLabel": {
    "nl": "Naam",
    "en": "Name",
    "de": "Name",
    "pl": "Name",
    "ro": "Name",
    "bg": "Name",
    "sk": "Name",
    "ua": "Name"
  },
  "details.fields.namePlaceholder": {
    "nl": "Voor- en achternaam",
    "en": "First and last name",
    "de": "First and last name",
    "pl": "First and last name",
    "ro": "First and last name",
    "bg": "First and last name",
    "sk": "First and last name",
    "ua": "First and last name"
  },
  "details.fields.companyLabel": {
    "nl": "Bedrijf",
    "en": "Company",
    "de": "Company",
    "pl": "Company",
    "ro": "Company",
    "bg": "Company",
    "sk": "Company",
    "ua": "Company"
  },
  "details.fields.companyPlaceholder": {
    "nl": "Organisatie of opdrachtgever",
    "en": "Organisation or client",
    "de": "Organisation or client",
    "pl": "Organisation or client",
    "ro": "Organisation or client",
    "bg": "Organisation or client",
    "sk": "Organisation or client",
    "ua": "Organisation or client"
  },
  "details.fields.emailLabel": {
    "nl": "E-mailadres",
    "en": "Email address",
    "de": "Email address",
    "pl": "Email address",
    "ro": "Email address",
    "bg": "Email address",
    "sk": "Email address",
    "ua": "Email address"
  },
  "details.fields.emailPlaceholder": {
    "nl": "naam@bedrijf.nl",
    "en": "name@company.com",
    "de": "name@company.com",
    "pl": "name@company.com",
    "ro": "name@company.com",
    "bg": "name@company.com",
    "sk": "name@company.com",
    "ua": "name@company.com"
  },
  "details.status.loading": {
    "nl": "Bezig met verzenden...",
    "en": "Sending...",
    "de": "Sending...",
    "pl": "Sending...",
    "ro": "Sending...",
    "bg": "Sending...",
    "sk": "Sending...",
    "ua": "Sending..."
  },
  "details.alert.noAnswers": {
    "nl": "We hebben geen quizantwoorden gevonden. Vul eerst stap 1 in.",
    "en": "We couldn't find any quiz answers. Please complete step 1 first.",
    "de": "We couldn't find any quiz answers. Please complete step 1 first.",
    "pl": "We couldn't find any quiz answers. Please complete step 1 first.",
    "ro": "We couldn't find any quiz answers. Please complete step 1 first.",
    "bg": "We couldn't find any quiz answers. Please complete step 1 first.",
    "sk": "We couldn't find any quiz answers. Please complete step 1 first.",
    "ua": "We couldn't find any quiz answers. Please complete step 1 first."
  },
  "details.alert.missingFields": {
    "nl": "Vul alle velden in voordat je verder gaat.",
    "en": "Fill in all fields before you continue.",
    "de": "Fill in all fields before you continue.",
    "pl": "Fill in all fields before you continue.",
    "ro": "Fill in all fields before you continue.",
    "bg": "Fill in all fields before you continue.",
    "sk": "Fill in all fields before you continue.",
    "ua": "Fill in all fields before you continue."
  },
  "details.alert.error": {
    "nl": "Opslaan in Google Sheets is niet gelukt. Controleer je verbinding en probeer opnieuw.",
    "en": "Saving to Google Sheets failed. Check your connection and try again.",
    "de": "Saving to Google Sheets failed. Check your connection and try again.",
    "pl": "Saving to Google Sheets failed. Check your connection and try again.",
    "ro": "Saving to Google Sheets failed. Check your connection and try again.",
    "bg": "Saving to Google Sheets failed. Check your connection and try again.",
    "sk": "Saving to Google Sheets failed. Check your connection and try again.",
    "ua": "Saving to Google Sheets failed. Check your connection and try again."
  },
  "success.stepEyebrow": {
    "nl": "Stap afgerond",
    "en": "Step completed",
    "de": "Step completed",
    "pl": "Step completed",
    "ro": "Step completed",
    "bg": "Step completed",
    "sk": "Step completed",
    "ua": "Step completed"
  },
  "success.title": {
    "nl": "Bedankt voor je inzending!",
    "en": "Thank you for your submission!",
    "de": "Thank you for your submission!",
    "pl": "Thank you for your submission!",
    "ro": "Thank you for your submission!",
    "bg": "Thank you for your submission!",
    "sk": "Thank you for your submission!",
    "ua": "Thank you for your submission!"
  },
  "success.body": {
    "nl": "Je antwoorden en gegevens zijn opgeslagen. We laten van ons horen wanneer je in de prijzen valt.",
    "en": "Your answers and details have been saved. We will contact you if you win a prize.",
    "de": "Your answers and details have been saved. We will contact you if you win a prize.",
    "pl": "Your answers and details have been saved. We will contact you if you win a prize.",
    "ro": "Your answers and details have been saved. We will contact you if you win a prize.",
    "bg": "Your answers and details have been saved. We will contact you if you win a prize.",
    "sk": "Your answers and details have been saved. We will contact you if you win a prize.",
    "ua": "Your answers and details have been saved. We will contact you if you win a prize."
  }
};

const currentLanguage = getCurrentLanguage();
const DEFAULT_LOCALE = currentLanguage === "ua" ? "uk" : currentLanguage;
document.documentElement.lang = DEFAULT_LOCALE;
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

function getCurrentLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  if (requested && QUIZ_LANGUAGES.some((lang) => lang.code === requested)) {
    return requested;
  }
  return DEFAULT_LANG;
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
