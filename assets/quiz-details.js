const STORAGE_KEY = "lmraQuizWorkbook";
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyzqVF27mJCcJTJDn8THUfBQIJVBFTr7qj-Oy4HOL8GYGN0BHmOiRBEhD0TT3e2cV5e/exec"; // eigen web-app URL

const summarySection = document.getElementById("summarySection");
const answersList = document.getElementById("answersList");
const missingDataNotice = document.getElementById("missingDataNotice");
const detailsForm = document.getElementById("detailsForm");
const submitButton = detailsForm?.querySelector('button[type="submit"]');
const originalButtonLabel =
  submitButton?.querySelector(".quiz-button__label")?.textContent ||
  submitButton?.textContent ||
  "Versturen";

let storedPayload = null;
const pageLanguage = window.currentQuizLanguage || "nl";
const translateKey = (key) =>
  typeof window.quizTranslate === "function" ? window.quizTranslate(key) : null;
const loadingText = translateKey("details.status.loading") || "Bezig met verzenden...";
const alertNoAnswers = translateKey("details.alert.noAnswers") || "We hebben geen quizantwoorden gevonden. Vul eerst stap 1 in.";
const alertMissingFields =
  translateKey("details.alert.missingFields") || "Vul alle velden in voordat je verder gaat.";
const alertSubmitError =
  translateKey("details.alert.error") ||
  "Opslaan in Google Sheets is niet gelukt. Controleer je internetverbinding en probeer het opnieuw.";

function loadStoredData() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Kan quizgegevens niet lezen:", error);
    return null;
  }
}

function renderSummary(summary) {
  if (!summarySection || !answersList) return;
  answersList.innerHTML = "";

  summary.forEach(({ label, answer }) => {
    const question = document.createElement("dt");
    question.textContent = label;
    const response = document.createElement("dd");
    response.textContent = answer || "-";
    answersList.append(question, response);
  });

  summarySection.hidden = summary.length === 0;
}

function buildSubmissionPayload(participant) {
  return {
    savedAt: storedPayload?.savedAt || new Date().toISOString(),
    participant,
    answers: storedPayload?.answerRows || [],
    summary: storedPayload?.summary || [],
    userAgent: navigator.userAgent,
    language: pageLanguage
  };
}

async function sendToGoogleSheet(payload) {
  const url = GOOGLE_APPS_SCRIPT_URL;
  const canPost =
    typeof url === "string" &&
    url.length > 0 &&
    !url.includes("YOUR_DEPLOYMENT_ID");

  if (!canPost) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(payload)
    });
    const rawText = await response.text();

    let data = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch (error) {
      console.warn("Kon JSON-antwoord van Apps Script niet parsen:", rawText);
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        `Google Apps Script gaf status ${response.status}: ${rawText || "geen antwoord"}`
      );
    }

    if (data && data.status && data.status !== "ok") {
      throw new Error(data.message || "Onbekende fout vanuit Google Apps Script");
    }
  } catch (networkError) {
    console.warn("CORS of netwerkfout genegeerd, ga uit van succes:", networkError);
  }
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;
  submitButton.disabled = isSubmitting;
  submitButton.setAttribute("aria-busy", String(isSubmitting));
  submitButton.classList.toggle("is-loading", isSubmitting);
  const label = submitButton.querySelector(".quiz-button__label");
  if (label) {
    label.textContent = isSubmitting ? loadingText : originalButtonLabel;
  } else {
    submitButton.textContent = isSubmitting ? loadingText : originalButtonLabel;
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!storedPayload?.answerRows?.length) {
    alert(alertNoAnswers);
    return;
  }

  const formData = new FormData(detailsForm);
  const getValue = (key) => String(formData.get(key) || "").trim();
  const name = getValue("participantName");
  const company = getValue("participantCompany");
  const email = getValue("participantEmail");

  if (!name || !company || !email) {
    alert(alertMissingFields);
    return;
  }

  setSubmitting(true);

  try {
    const payload = buildSubmissionPayload({ name, company, email });

    await sendToGoogleSheet(payload);
    sessionStorage.removeItem(STORAGE_KEY);
    const successUrl = window.quizWithLang
      ? window.quizWithLang("bedankt.html")
      : "bedankt.html";
    window.location.assign(successUrl);
  } catch (error) {
    console.error("Verzenden mislukt:", error);
    alert(alertSubmitError);
    return;
  } finally {
    setSubmitting(false);
  }
}

function init() {
  storedPayload = loadStoredData();

  if (!storedPayload || !storedPayload.answerRows) {
    missingDataNotice.hidden = false;
    if (submitButton) {
      submitButton.disabled = true;
    }
    return;
  }

  renderSummary(storedPayload.summary || []);
  missingDataNotice.hidden = true;

  detailsForm?.addEventListener("submit", handleSubmit);
}

init();
