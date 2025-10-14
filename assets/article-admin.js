import { FALLBACK_DATA } from "./data.js";

const repoRoot = new URL("../", import.meta.url);

const state = {
  slug: extractSlugFromPath(),
  siteConfig: null,
  manifest: [],
  article: null,
  siteSource: "remote",
  manifestSource: "remote",
  articleSource: "remote",
  articlePath: null
};

const elements = {
  slugLabel: document.getElementById("articleSlug"),
  slugFooter: document.getElementById("articleSlugFooter"),
  backLink: document.getElementById("articleBackLink"),
  siteStatus: document.getElementById("siteStatus"),
  manifestStatus: document.getElementById("manifestStatus"),
  articleStatus: document.getElementById("articleStatus"),
  publishedInput: document.getElementById("publishedInput"),
  rolesContainer: document.getElementById("rolesContainer"),
  tagsContainer: document.getElementById("tagsContainer"),
  titlesContainer: document.getElementById("titlesContainer"),
  downloadButton: document.querySelector('[data-action="download-article"]'),
  importInput: document.querySelector('input[data-import="article"]')
};

init();

async function init() {
  if (!state.slug) {
    setStatus(elements.articleStatus, "Kon het artikel niet bepalen vanuit de URL.", "error");
    document.title = "Artikel niet gevonden";
    return;
  }

  document.title = `Artikelbeheer – ${state.slug}`;
  if (elements.slugLabel) elements.slugLabel.textContent = state.slug;
  if (elements.slugFooter) elements.slugFooter.textContent = state.slug;

  attachEventHandlers();
  await loadSiteConfig();
  await loadManifest();
  await loadArticle();
  renderAll();
}

function attachEventHandlers() {
  if (elements.publishedInput) {
    elements.publishedInput.addEventListener("change", () => {
      if (!state.article) return;
      state.article.published = elements.publishedInput.value;
      markArticleDirty("Publicatiedatum aangepast.");
    });
  }

  if (elements.downloadButton) {
    elements.downloadButton.addEventListener("click", () => {
      if (!state.article) return;
      downloadJson(state.article, "article.json", elements.articleStatus);
    });
  }

  if (elements.importInput) {
    elements.importInput.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        state.article = clone(json);
        state.articleSource = "import";
        markArticleDirty(`Bestand geladen: ${file.name}`);
        renderAll();
      } catch (error) {
        setStatus(elements.articleStatus, `Kon bestand niet laden: ${error.message}`, "error");
      }
    });
  }
}

async function loadSiteConfig() {
  try {
    const response = await fetch(new URL("data/site-config.json", repoRoot));
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const json = await response.json();
    state.siteConfig = clone(json);
    state.siteSource = "remote";
    setStatus(elements.siteStatus, "Site-config geladen.", "ok");
  } catch (error) {
    console.warn("Kon site-config niet laden, gebruik fallback.", error);
    state.siteConfig = clone(FALLBACK_DATA.config);
    state.siteSource = "fallback";
    setStatus(
      elements.siteStatus,
      "Kon `data/site-config.json` niet laden. Fallback gebruikt (bekijk en download).",
      "error"
    );
  }
}

async function loadManifest() {
  try {
    const response = await fetch(new URL("data/articles.json", repoRoot));
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Artikellijst is geen array.");
    state.manifest = clone(json);
    state.manifestSource = "remote";
    setStatus(elements.manifestStatus, "Artikellijst geladen.", "ok");
  } catch (error) {
    console.warn("Kon manifest niet laden, gebruik fallback.", error);
    state.manifest = FALLBACK_DATA.articles.map((article) => ({
      slug: article.slug,
      properties: `articles/${article.slug}/article.json`
    }));
    state.manifestSource = "fallback";
    setStatus(
      elements.manifestStatus,
      "Kon `data/articles.json` niet laden. Fallback gebruikt (bekijk en download).",
      "error"
    );
  }
}

async function loadArticle() {
  const manifestEntry = state.manifest.find((entry) => entry.slug === state.slug);
  const defaultPath = `articles/${state.slug}/article.json`;
  const propertiesPath = manifestEntry?.properties || defaultPath;
  state.articlePath = propertiesPath;

  try {
    const response = await fetch(new URL(propertiesPath, repoRoot));
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const json = await response.json();
    state.article = clone(json);
    state.articleSource = "remote";
    setStatus(elements.articleStatus, `${propertiesPath} geladen.`, "ok");
  } catch (error) {
    console.warn("Kon artikel niet laden, gebruik fallback.", error);
    const fallback = FALLBACK_DATA.articles.find((article) => article.slug === state.slug);
    if (fallback) {
      state.article = clone(fallback);
      state.articleSource = "fallback";
      setStatus(
        elements.articleStatus,
        "Kon artikelbestand niet laden. Fallback gebruikt (pas aan en download).",
        "error"
      );
    } else {
      state.article = {
        slug: state.slug,
        published: new Date().toISOString().slice(0, 10),
        roles: [],
        tags: [],
        translations: {}
      };
      state.articleSource = "new";
      setStatus(
        elements.articleStatus,
        "Geen bestaande data gevonden. Nieuw artikelobject aangemaakt.",
        "error"
      );
    }
  }
}

function renderAll() {
  if (!state.article || !state.siteConfig) return;
  ensureArticleStructure();
  renderBackLink();
  renderMeta();
  renderRoles();
  renderTags();
  renderTitles();
}

function renderBackLink() {
  if (!elements.backLink || !state.article) return;
  const translations = state.article.translations || {};
  const preferredLink =
    translations.nl?.link || Object.values(translations)[0]?.link || "../index.html";
  const resolved = preferredLink.startsWith("http")
    ? preferredLink
    : new URL(preferredLink, window.location.href).toString();
  elements.backLink.href = resolved;
}

function renderMeta() {
  if (!elements.publishedInput) return;
  elements.publishedInput.value = state.article.published || "";
}

function renderRoles() {
  if (!elements.rolesContainer) return;
  elements.rolesContainer.innerHTML = "";
  const roles = state.siteConfig.roles || [];
  if (!roles.length) {
    elements.rolesContainer.textContent =
      "Geen functies beschikbaar. Voeg ze toe via de hoofdadmin.";
    return;
  }

  const fragment = document.createDocumentFragment();
  roles.forEach((role) => {
    const label = document.createElement("label");
    label.className = "pill";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = role.id;
    checkbox.checked = state.article.roles?.includes(role.id);
    checkbox.addEventListener("change", () =>
      toggleArrayItem(state.article.roles, role.id, checkbox.checked)
    );

    const span = document.createElement("span");
    span.textContent = getRoleDisplayName(role);

    label.appendChild(checkbox);
    label.appendChild(span);
    fragment.appendChild(label);
  });

  elements.rolesContainer.appendChild(fragment);
}

function renderTags() {
  if (!elements.tagsContainer) return;
  elements.tagsContainer.innerHTML = "";
  const tags = state.siteConfig.tags || [];
  if (!tags.length) {
    elements.tagsContainer.textContent =
      "Geen tags beschikbaar. Voeg ze toe via de hoofdadmin.";
    return;
  }

  const fragment = document.createDocumentFragment();
  tags.forEach((tag) => {
    const label = document.createElement("label");
    label.className = "pill";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tag.id;
    checkbox.checked = state.article.tags?.includes(tag.id);
    checkbox.addEventListener("change", () =>
      toggleArrayItem(state.article.tags, tag.id, checkbox.checked)
    );

    const span = document.createElement("span");
    span.textContent = getTagDisplayName(tag);

    label.appendChild(checkbox);
    label.appendChild(span);
    fragment.appendChild(label);
  });

  elements.tagsContainer.appendChild(fragment);
}

function renderTitles() {
  if (!elements.titlesContainer) return;
  elements.titlesContainer.innerHTML = "";
  const languages = state.siteConfig.languages || [];

  if (!languages.length) {
    elements.titlesContainer.textContent =
      "Geen talen gevonden. Voeg talen toe via de hoofdadmin.";
    return;
  }

  const fragment = document.createDocumentFragment();
  languages.forEach((language) => {
    const langCode = language.code?.trim();
    if (!langCode) return;
    ensureTranslation(langCode);

    const card = document.createElement("div");
    card.className = "title-card";

    const heading = document.createElement("h4");
    heading.textContent = `${language.name} (${language.code})`;
    card.appendChild(heading);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = state.article.translations[langCode]?.title || "";
    titleInput.placeholder = "Titel";
    titleInput.addEventListener("input", () => {
      ensureTranslation(langCode);
      state.article.translations[langCode].title = titleInput.value;
      markArticleDirty("Titel aangepast.");
    });
    card.appendChild(titleInput);

    const metaRow = document.createElement("div");
    metaRow.className = "form-row form-row--inline";

    const htmlInput = document.createElement("input");
    htmlInput.type = "text";
    htmlInput.value = state.article.translations[langCode]?.html || "";
    htmlInput.placeholder = "index_<taal>.html";
    htmlInput.addEventListener("input", () => {
      ensureTranslation(langCode);
      state.article.translations[langCode].html = htmlInput.value;
      markArticleDirty("HTML-pad aangepast.");
    });

    const linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.value = state.article.translations[langCode]?.link || "";
    linkInput.placeholder = "Link";
    linkInput.addEventListener("input", () => {
      ensureTranslation(langCode);
      state.article.translations[langCode].link = linkInput.value;
      markArticleDirty("Link aangepast.");
    });

    metaRow.appendChild(htmlInput);
    metaRow.appendChild(linkInput);
    card.appendChild(metaRow);

    fragment.appendChild(card);
  });

  elements.titlesContainer.appendChild(fragment);
}

function ensureArticleStructure() {
  if (!Array.isArray(state.article.roles)) state.article.roles = [];
  if (!Array.isArray(state.article.tags)) state.article.tags = [];
  if (!state.article.translations) state.article.translations = {};
}

function ensureTranslation(langCode) {
  if (!state.article.translations[langCode]) {
    state.article.translations[langCode] = {
      title: "",
      thumbnail: state.article.translations.nl?.thumbnail || "",
      html: "",
      link: ""
    };
  }
}

function toggleArrayItem(array, value, shouldInclude) {
  if (!Array.isArray(array)) return;
  const index = array.indexOf(value);
  if (shouldInclude && index === -1) {
    array.push(value);
    markArticleDirty("Selectie bijgewerkt.");
  } else if (!shouldInclude && index !== -1) {
    array.splice(index, 1);
    markArticleDirty("Selectie bijgewerkt.");
  }
}

function getRoleDisplayName(role) {
  const langNl =
    state.siteConfig.languages.find((language) => language.code === "nl") ||
    state.siteConfig.languages[0];
  const code = langNl?.code;
  if (code && role.translations?.[code]) return role.translations[code];
  const firstTranslation = Object.values(role.translations || {})[0];
  return firstTranslation || role.id;
}

function getTagDisplayName(tag) {
  const langNl =
    state.siteConfig.languages.find((language) => language.code === "nl") ||
    state.siteConfig.languages[0];
  const code = langNl?.code;
  if (code && tag.translations?.[code]) return tag.translations[code];
  const firstTranslation = Object.values(tag.translations || {})[0];
  return firstTranslation || tag.id;
}

function downloadJson(data, filename, statusElement) {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatus(statusElement, `${filename} gedownload.`, "ok");
  } catch (error) {
    setStatus(statusElement, `Download mislukt: ${error.message}`, "error");
  }
}

function markArticleDirty(message) {
  setStatus(elements.articleStatus, message || "Wijzigingen in artikel.", "");
}

function setStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  element.dataset.state = state || "";
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function extractSlugFromPath() {
  const segments = window.location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const articlesIndex = segments.indexOf("articles");
  if (articlesIndex === -1 || articlesIndex + 1 >= segments.length) return null;
  return segments[articlesIndex + 1];
}
