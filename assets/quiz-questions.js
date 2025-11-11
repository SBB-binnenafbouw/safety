const STORAGE_KEY = "lmraQuizWorkbook";

const matchingOptions = {
  valbescherming: "questions.match.ppe.valbescherming",
  elekhandschoenen: "questions.match.ppe.elekhandschoenen",
  trilhandschoenen: "questions.match.ppe.trilhandschoenen",
  adembescherming: "questions.match.ppe.adembescherming",
  oorbescherming: "questions.match.ppe.oorbescherming"
};

const multipleChoiceOptions = {
  toepassingsvraag: {
    A: "questions.q3.options.a",
    B: "questions.q3.options.b",
    C: "questions.q3.options.c",
    D: "questions.q3.options.d"
  },
  inzichtvraag: {
    A: "questions.q6.options.a",
    B: "questions.q6.options.b",
    C: "questions.q6.options.c",
    D: "questions.q6.options.d"
  },
  praktijkvraag: {
    A: "questions.q7.options.a",
    B: "questions.q7.options.b",
    C: "questions.q7.options.c",
    D: "questions.q7.options.d"
  },
  herkenning: {
    juist: "questions.q5.options.true",
    onjuist: "questions.q5.options.false"
  }
};

const questionLabels = {
  situatievraag: { number: 1, categoryTitleKey: "questions.titles.q1", questionKey: "questions.titles.q1" },
  match_trillingen: { number: 2, categoryTitleKey: "questions.titles.q2", questionKey: "questions.match.risks.trillingen" },
  match_stof: { number: 2, categoryTitleKey: "questions.titles.q2", questionKey: "questions.match.risks.stof" },
  match_elektriciteit: { number: 2, categoryTitleKey: "questions.titles.q2", questionKey: "questions.match.risks.elektriciteit" },
  match_hoogte: { number: 2, categoryTitleKey: "questions.titles.q2", questionKey: "questions.match.risks.hoogte" },
  match_lawaai: { number: 2, categoryTitleKey: "questions.titles.q2", questionKey: "questions.match.risks.lawaai" },
  toepassingsvraag: { number: 3, categoryTitleKey: "questions.titles.q3", questionKey: "questions.titles.q3" },
  redeneervraag: { number: 4, categoryTitleKey: "questions.titles.q4", questionKey: "questions.titles.q4" },
  herkenning: { number: 5, categoryTitleKey: "questions.titles.q5", questionKey: "questions.titles.q5" },
  inzichtvraag: { number: 6, categoryTitleKey: "questions.titles.q6", questionKey: "questions.titles.q6" },
  praktijkvraag: { number: 7, categoryTitleKey: "questions.titles.q7", questionKey: "questions.titles.q7" },
  koppeling: { number: 8, categoryTitleKey: "questions.titles.q8", questionKey: "questions.titles.q8" },
  reflectie: { number: 9, categoryTitleKey: "questions.titles.q9", questionKey: "questions.titles.q9" },
  denkvraag: { number: 10, categoryTitleKey: "questions.titles.q10", questionKey: "questions.titles.q10" }
};

const questionGroups = [
  { number: 1, titleKey: "questions.titles.q1", keys: ["situatievraag"] },
  {
    number: 2,
    titleKey: "questions.titles.q2",
    keys: [
      "match_trillingen",
      "match_stof",
      "match_elektriciteit",
      "match_hoogte",
      "match_lawaai"
    ]
  },
  { number: 3, titleKey: "questions.titles.q3", keys: ["toepassingsvraag"] },
  { number: 4, titleKey: "questions.titles.q4", keys: ["redeneervraag"] },
  { number: 5, titleKey: "questions.titles.q5", keys: ["herkenning"] },
  { number: 6, titleKey: "questions.titles.q6", keys: ["inzichtvraag"] },
  { number: 7, titleKey: "questions.titles.q7", keys: ["praktijkvraag"] },
  { number: 8, titleKey: "questions.titles.q8", keys: ["koppeling"] },
  { number: 9, titleKey: "questions.titles.q9", keys: ["reflectie"] },
  { number: 10, titleKey: "questions.titles.q10", keys: ["denkvraag"] }
];

const translateKey = (key) => {
  if (!key) return "";
  return typeof window.quizTranslate === "function" ? window.quizTranslate(key) : key;
};

const quizLanguage = window.currentQuizLanguage || "nl";

setupMatchingQuestion();

const form = document.getElementById("questionsForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const plainData = Object.fromEntries(formData.entries());
    const timestamp = new Date().toISOString();

    const getText = (value) => (typeof value === "string" ? value.trim() : "");
    const getChoice = (key) => getText(plainData[key]);

    const responses = {
      situatievraag: getText(plainData.situatievraag),
      match_trillingen: getChoice("match_trillingen"),
      match_stof: getChoice("match_stof"),
      match_elektriciteit: getChoice("match_elektriciteit"),
      match_hoogte: getChoice("match_hoogte"),
      match_lawaai: getChoice("match_lawaai"),
      toepassingsvraag: getChoice("toepassingsvraag"),
      redeneervraag: getText(plainData.redeneervraag),
      herkenning: getChoice("herkenning"),
      inzichtvraag: getChoice("inzichtvraag"),
      praktijkvraag: getChoice("praktijkvraag"),
      koppeling: getText(plainData.koppeling),
      reflectie: getText(plainData.reflectie),
      denkvraag: getText(plainData.denkvraag)
    };

    const incompleteGroups = questionGroups.filter((group) =>
      group.keys.some((key) => !responses[key])
    );

    if (incompleteGroups.length > 0) {
      const warning = [
        "Je hebt nog niet alle vragen beantwoord:",
        "",
        ...incompleteGroups.map((group) => `- ${group.label}`),
        "",
        "Wil je toch doorgaan?"
      ].join("\n");

      const proceed = window.confirm(warning);
      if (!proceed) {
        return;
      }
    }

    const answerRows = [];
    const summary = [];

    const addRow = (questionKey, value, renderValue = (val) => val) => {
      const meta = questionLabels[questionKey];
      const safeValue = typeof value === "string" ? value : value ?? "";
      const rendered = renderValue(safeValue) ?? "";
      const cleanedAnswer = typeof rendered === "string" ? rendered.trim() : "";
      const categoryLabel = buildCategoryLabel(meta);
      const questionLabel = buildQuestionLabel(meta) || questionKey;

      answerRows.push({
        categorie: categoryLabel || translateKey("questions.labelPrefix") || "Vraag",
        vraag: questionLabel,
        antwoord: cleanedAnswer
      });

      summary.push({
        label: questionLabel,
        answer: cleanedAnswer || "-"
      });
    };

    addRow("situatievraag", responses.situatievraag);

    addRow(
      "match_trillingen",
      responses.match_trillingen,
      (val) => translateKey(matchingOptions[val]) || val
    );
    addRow(
      "match_stof",
      responses.match_stof,
      (val) => translateKey(matchingOptions[val]) || val
    );
    addRow(
      "match_elektriciteit",
      responses.match_elektriciteit,
      (val) => translateKey(matchingOptions[val]) || val
    );
    addRow(
      "match_hoogte",
      responses.match_hoogte,
      (val) => translateKey(matchingOptions[val]) || val
    );
    addRow(
      "match_lawaai",
      responses.match_lawaai,
      (val) => translateKey(matchingOptions[val]) || val
    );

    addRow(
      "toepassingsvraag",
      responses.toepassingsvraag,
      (val) => translateKey(multipleChoiceOptions.toepassingsvraag[val]) || ""
    );
    addRow("redeneervraag", responses.redeneervraag);
    addRow(
      "herkenning",
      responses.herkenning,
      (val) => translateKey(multipleChoiceOptions.herkenning[val]) || ""
    );
    addRow(
      "inzichtvraag",
      responses.inzichtvraag,
      (val) => translateKey(multipleChoiceOptions.inzichtvraag[val]) || ""
    );
    addRow(
      "praktijkvraag",
      responses.praktijkvraag,
      (val) => translateKey(multipleChoiceOptions.praktijkvraag[val]) || ""
    );
    addRow("koppeling", responses.koppeling);
    addRow("reflectie", responses.reflectie);
    addRow("denkvraag", responses.denkvraag);

    const payload = {
      savedAt: timestamp,
      answerRows,
      summary,
      language: quizLanguage
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    const detailsUrl = window.quizWithLang
      ? window.quizWithLang("gegevens.html")
      : "gegevens.html";
    window.location.assign(detailsUrl);
  });
}

function setupMatchingQuestion() {
  const pool = document.querySelector("[data-drop-pool]");
  const poolList = pool?.querySelector("[data-drop-pool-list]");
  const draggables = Array.from(document.querySelectorAll("[data-draggable]"));
  const dropZones = Array.from(document.querySelectorAll("[data-dropzone]"));

  if (!pool || !poolList || dropZones.length === 0 || draggables.length === 0) {
    return;
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    event.currentTarget?.classList?.add("quiz-dropzone--active");
  };

  const setZoneSelection = (zone, value) => {
    const placeholder = zone.querySelector("[data-drop-placeholder]");
    if (placeholder) {
      placeholder.style.display = value ? "none" : "";
    }
    const input = zone.querySelector("[data-drop-input]");
    if (input) {
      input.value = value;
    }
    zone.dataset.selection = value;
    if (value) {
      zone.classList.add("quiz-dropzone--filled");
    } else {
      zone.classList.remove("quiz-dropzone--filled");
    }
  };

  const moveItemToPool = (item) => {
    const originZone = item.closest("[data-dropzone]");
    if (originZone) {
      setZoneSelection(originZone, "");
    }
    item.classList.remove("is-dragging");
    poolList.appendChild(item);
  };

  draggables.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", item.id);
      event.dataTransfer.effectAllowed = "move";
      item.classList.add("is-dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("is-dragging");
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        moveItemToPool(item);
      }
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      zone.classList.add("quiz-dropzone--active");
    });
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", (event) => {
      if (!zone.contains(event.relatedTarget)) {
        zone.classList.remove("quiz-dropzone--active");
      }
    });
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("quiz-dropzone--active");

      const itemId = event.dataTransfer.getData("text/plain");
      if (!itemId) return;
      const item = document.getElementById(itemId);
      if (!item) return;

      const slot = zone.querySelector("[data-drop-slot]");
      if (!slot) return;

      const originZone = item.closest("[data-dropzone]");
      if (originZone && originZone !== zone) {
        setZoneSelection(originZone, "");
      }

      const existing = slot.querySelector("[data-draggable]");
      if (existing && existing !== item) {
        moveItemToPool(existing);
      }

      slot.appendChild(item);
      setZoneSelection(zone, item.dataset.value || "");
    });
  });

  pool.addEventListener("dragenter", handleDragOver);
  pool.addEventListener("dragover", handleDragOver);
  pool.addEventListener("dragleave", (event) => {
    if (!pool.contains(event.relatedTarget)) {
      pool.classList.remove("quiz-dropzone--active");
    }
  });
  pool.addEventListener("drop", (event) => {
    event.preventDefault();
    pool.classList.remove("quiz-dropzone--active");
    const itemId = event.dataTransfer.getData("text/plain");
    if (!itemId) return;
    const item = document.getElementById(itemId);
    if (!item) return;
    moveItemToPool(item);
  });
}

function buildGroupLabel(group) {
  const prefix = translateKey("questions.labelPrefix") || "Vraag";
  const numberPart = group.number ? ` ${group.number}` : "";
  const title = translateKey(group.titleKey) || "";
  return `${prefix}${numberPart}${title ? ` - ${title}` : ""}`;
}

function buildCategoryLabel(meta) {
  if (!meta) {
    return translateKey("questions.labelPrefix") || "Vraag";
  }
  const prefix = translateKey("questions.labelPrefix") || "Vraag";
  const numberPart = meta.number ? ` ${meta.number}` : "";
  const title = translateKey(meta.categoryTitleKey || meta.questionKey) || "";
  return `${prefix}${numberPart}${title ? ` - ${title}` : ""}`;
}

function buildQuestionLabel(meta) {
  if (!meta) return "";
  return translateKey(meta.questionKey) || "";
}
