import { FALLBACK_DATA } from "../assets/data.js";

const repoRoot = new URL("../", import.meta.url);

const state = {
  siteConfig: null,
  manifest: [],
  siteSource: "remote",
  manifestSource: "remote"
};

const elements = {
  siteStatus: document.getElementById("siteConfigStatus"),
  manifestStatus: document.getElementById("manifestStatus"),
  languagesTableBody: document.querySelector("#languagesTable tbody"),
  rolesTableHead: document.querySelector("#rolesTable thead"),
  rolesTableBody: document.querySelector("#rolesTable tbody"),
  tagsTableHead: document.querySelector("#tagsTable thead"),
  tagsTableBody: document.querySelector("#tagsTable tbody"),
  highlightSelect: document.getElementById("highlightSelect"),
  manifestTableBody: document.querySelector("#manifestTable tbody")
};

init();

async function init() {
  attachEventHandlers();
  await loadSiteConfig();
  await loadManifest();
  syncTranslationsWithLanguages();
  renderAll();
}

function attachEventHandlers() {
  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    switch (button.dataset.action) {
      case "add-language":
        addLanguage();
        break;
      case "add-role":
        addRole();
        break;
      case "add-tag":
        addTag();
        break;
      case "download-config":
        downloadJson(state.siteConfig, "site-config.json", elements.siteStatus);
        break;
      case "download-manifest":
        downloadJson(state.manifest, "articles.json", elements.manifestStatus);
        break;
      case "add-manifest-entry":
        addManifestEntry();
        break;
      default:
        break;
    }
  });

  document
    .querySelector('input[data-import="siteConfig"]')
    .addEventListener("change", handleSiteConfigImport);

  document
    .querySelector('input[data-import="manifest"]')
    .addEventListener("change", handleManifestImport);

  elements.highlightSelect.addEventListener("change", () => {
    if (!state.siteConfig?.site) return;
    state.siteConfig.site.highlightedArticleSlug = elements.highlightSelect.value || "";
    markSiteDirty("Uitgelicht artikel aangepast.");
  });
}

async function loadSiteConfig() {
  try {
    const response = await fetch(new URL("data/site-config.json", repoRoot));
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const json = await response.json();
    state.siteConfig = clone(json);
    ensureSiteStructure();
    state.siteSource = "remote";
    setStatus(elements.siteStatus, "Site-config geladen.", "ok");
  } catch (error) {
    console.warn("Kon site-config niet laden, gebruik fallback.", error);
    state.siteConfig = clone(FALLBACK_DATA.config);
    ensureSiteStructure();
    state.siteSource = "fallback";
    setStatus(
      elements.siteStatus,
      "Kon `data/site-config.json` niet laden. Fallback gebruikt (download om op te slaan).",
      "error"
    );
  }
}

async function loadManifest() {
  try {
    const response = await fetch(new URL("data/articles.json", repoRoot));
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Manifest is geen array.");
    state.manifest = clone(json);
    state.manifestSource = "remote";
    setStatus(elements.manifestStatus, "Artikellijst geladen.", "ok");
  } catch (error) {
    console.warn("Kon artikellijst niet laden, gebruik fallback.", error);
    state.manifest = FALLBACK_DATA.articles.map((article) => ({
      slug: article.slug,
      properties: `articles/${article.slug}/article.json`
    }));
    state.manifestSource = "fallback";
    setStatus(
      elements.manifestStatus,
      "Kon `data/articles.json` niet laden. Fallback gebruikt (download om op te slaan).",
      "error"
    );
  }
}

function ensureSiteStructure() {
  if (!state.siteConfig.site) {
    state.siteConfig.site = {
      homepageUrl: "",
      newsletterUrl: "",
      lmraUrl: "",
      highlightedArticleSlug: ""
    };
  }
  if (!Array.isArray(state.siteConfig.languages)) state.siteConfig.languages = [];
  if (!Array.isArray(state.siteConfig.roles)) state.siteConfig.roles = [];
  if (!Array.isArray(state.siteConfig.tags)) state.siteConfig.tags = [];
}

function renderAll() {
  renderLanguages();
  syncTranslationsWithLanguages();
  renderRoles();
  renderTags();
  renderManifest();
  renderHighlightSelect();
}

function renderLanguages() {
  const tbody = elements.languagesTableBody;
  tbody.innerHTML = "";

  state.siteConfig.languages.forEach((lang, index) => {
    const row = document.createElement("tr");

    row.appendChild(createTableInputCell(lang.name, (value) => updateLanguageField(index, "name", value)));
    row.appendChild(
      createTableInputCell(lang.code, (value) => updateLanguageCode(index, value), { type: "code" })
    );
    row.appendChild(
      createTableInputCell(lang.flag || "", (value) => updateLanguageField(index, "flag", value))
    );

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.dataset.variant = "danger";
    deleteButton.textContent = "Verwijderen";
    deleteButton.addEventListener("click", () => removeLanguage(index));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

function renderRoles() {
  const head = elements.rolesTableHead;
  const body = elements.rolesTableBody;
  head.innerHTML = "";
  body.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>ID</th>`;
  getLanguageCodes().forEach((code) => {
    const lang = findLanguageByCode(code);
    const title = lang ? `${lang.name} (${lang.code})` : code;
    const th = document.createElement("th");
    th.textContent = title;
    headerRow.appendChild(th);
  });
  headerRow.appendChild(document.createElement("th"));
  head.appendChild(headerRow);

  state.siteConfig.roles.forEach((role, index) => {
    const row = document.createElement("tr");
    row.appendChild(
      createTableInputCell(role.id, (value) => {
        role.id = value.trim();
        markSiteDirty("Functies bijgewerkt.");
      })
    );

    getLanguageCodes().forEach((code) => {
      const value = role.translations?.[code] ?? "";
      row.appendChild(
        createTableInputCell(value, (newValue) => {
          if (!role.translations) role.translations = {};
          role.translations[code] = newValue;
          markSiteDirty("Functies bijgewerkt.");
        })
      );
    });

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.dataset.variant = "danger";
    deleteButton.textContent = "Verwijderen";
    deleteButton.addEventListener("click", () => {
      state.siteConfig.roles.splice(index, 1);
      markSiteDirty("Functie verwijderd.");
      renderRoles();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    body.appendChild(row);
  });
}

function renderTags() {
  const head = elements.tagsTableHead;
  const body = elements.tagsTableBody;
  head.innerHTML = "";
  body.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>ID</th>`;
  getLanguageCodes().forEach((code) => {
    const lang = findLanguageByCode(code);
    const title = lang ? `${lang.name} (${lang.code})` : code;
    const th = document.createElement("th");
    th.textContent = title;
    headerRow.appendChild(th);
  });
  headerRow.appendChild(document.createElement("th"));
  head.appendChild(headerRow);

  state.siteConfig.tags.forEach((tag, index) => {
    const row = document.createElement("tr");
    row.appendChild(
      createTableInputCell(tag.id, (value) => {
        tag.id = value.trim();
        markSiteDirty("Tags bijgewerkt.");
      })
    );

    getLanguageCodes().forEach((code) => {
      const value = tag.translations?.[code] ?? "";
      row.appendChild(
        createTableInputCell(value, (newValue) => {
          if (!tag.translations) tag.translations = {};
          tag.translations[code] = newValue;
          markSiteDirty("Tags bijgewerkt.");
        })
      );
    });

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.dataset.variant = "danger";
    deleteButton.textContent = "Verwijderen";
    deleteButton.addEventListener("click", () => {
      state.siteConfig.tags.splice(index, 1);
      markSiteDirty("Tag verwijderd.");
      renderTags();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    body.appendChild(row);
  });
}

function renderManifest() {
  const tbody = elements.manifestTableBody;
  tbody.innerHTML = "";

  state.manifest.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.appendChild(
      createTableInputCell(entry.slug, (value) => {
        const previous = entry.slug;
        entry.slug = value.trim();
        if (state.siteConfig.site.highlightedArticleSlug === previous) {
          state.siteConfig.site.highlightedArticleSlug = entry.slug;
          renderHighlightSelect();
        }
        markManifestDirty("Slug aangepast.");
      })
    );

    row.appendChild(
      createTableInputCell(entry.properties, (value) => {
        entry.properties = value.trim();
        markManifestDirty("Pad aangepast.");
      })
    );

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.dataset.variant = "danger";
    deleteButton.textContent = "Verwijderen";
    deleteButton.addEventListener("click", () => {
      const [removed] = state.manifest.splice(index, 1);
      markManifestDirty("Artikelregel verwijderd.");
      if (state.siteConfig.site.highlightedArticleSlug === removed.slug) {
        state.siteConfig.site.highlightedArticleSlug = state.manifest[0]?.slug || "";
      }
      renderManifest();
      renderHighlightSelect();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

function renderHighlightSelect() {
  const select = elements.highlightSelect;
  const current = state.siteConfig.site.highlightedArticleSlug || "";
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "-- kies een artikel --";
  select.appendChild(placeholder);

  state.manifest.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.slug;
    option.textContent = entry.slug || "(zonder naam)";
    if (entry.slug === current) option.selected = true;
    select.appendChild(option);
  });

  if (!state.manifest.some((entry) => entry.slug === current)) {
    select.value = "";
  }
}

function addLanguage() {
  state.siteConfig.languages.push({ name: "", code: "", flag: "" });
  markSiteDirty("Nieuwe taal toegevoegd.");
  renderLanguages();
  syncTranslationsWithLanguages();
  renderRoles();
  renderTags();
}

function updateLanguageField(index, field, value) {
  const language = state.siteConfig.languages[index];
  language[field] = value;
  markSiteDirty("Taal aangepast.");
}

function updateLanguageCode(index, newCode) {
  const language = state.siteConfig.languages[index];
  const prevCode = language.code;
  const trimmed = newCode.trim();
  if (prevCode === trimmed) return;
  language.code = trimmed;
  renameTranslationKey(prevCode, trimmed);
  syncTranslationsWithLanguages();
  markSiteDirty("Taalcode aangepast.");
  renderRoles();
  renderTags();
}

function removeLanguage(index) {
  const [removed] = state.siteConfig.languages.splice(index, 1);
  markSiteDirty("Taal verwijderd.");
  if (removed?.code) {
    removeTranslationKey(removed.code);
  }
  syncTranslationsWithLanguages();
  renderLanguages();
  renderRoles();
  renderTags();
}

function addRole() {
  const baseId = "functie";
  let counter = state.siteConfig.roles.length + 1;
  while (state.siteConfig.roles.some((role) => role.id === `${baseId}-${counter}`)) {
    counter += 1;
  }
  const translations = {};
  getLanguageCodes().forEach((code) => {
    translations[code] = "";
  });
  state.siteConfig.roles.push({ id: `${baseId}-${counter}`, translations });
  markSiteDirty("Nieuwe functie toegevoegd.");
  renderRoles();
}

function addTag() {
  const baseId = "tag";
  let counter = state.siteConfig.tags.length + 1;
  while (state.siteConfig.tags.some((tag) => tag.id === `${baseId}-${counter}`)) {
    counter += 1;
  }
  const translations = {};
  getLanguageCodes().forEach((code) => {
    translations[code] = "";
  });
  state.siteConfig.tags.push({ id: `${baseId}-${counter}`, translations });
  markSiteDirty("Nieuwe tag toegevoegd.");
  renderTags();
}

function addManifestEntry() {
  state.manifest.push({ slug: "", properties: "" });
  markManifestDirty("Nieuwe manifestregel toegevoegd.");
  renderManifest();
  renderHighlightSelect();
}

function handleSiteConfigImport(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  file
    .text()
    .then((text) => {
      const json = JSON.parse(text);
      state.siteConfig = clone(json);
      ensureSiteStructure();
      state.siteSource = "import";
      setStatus(elements.siteStatus, `Bestand geladen: ${file.name}`, "ok");
      renderAll();
    })
    .catch((error) => {
      setStatus(elements.siteStatus, `Kon bestand niet laden: ${error.message}`, "error");
    });
}

function handleManifestImport(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  file
    .text()
    .then((text) => {
      const json = JSON.parse(text);
      if (!Array.isArray(json)) throw new Error("Bestand bevat geen array.");
      state.manifest = clone(json);
      state.manifestSource = "import";
      setStatus(elements.manifestStatus, `Bestand geladen: ${file.name}`, "ok");
      renderManifest();
      renderHighlightSelect();
    })
    .catch((error) => {
      setStatus(elements.manifestStatus, `Kon bestand niet laden: ${error.message}`, "error");
    });
}

function createTableInputCell(value, onChange, options = {}) {
  const cell = document.createElement("td");
  const input = document.createElement("input");
  input.type = options.type === "code" ? "text" : options.type || "text";
  input.value = value ?? "";
  if (options.type === "code") {
    input.addEventListener("change", () => {
      const normalised = input.value.trim();
      input.value = normalised;
      onChange(normalised);
    });
  } else {
    input.addEventListener("input", () => onChange(input.value));
  }
  cell.appendChild(input);
  return cell;
}

function syncTranslationsWithLanguages() {
  const codes = getLanguageCodes();
  state.siteConfig.roles.forEach((role) => {
    if (!role.translations) role.translations = {};
    Object.keys(role.translations).forEach((code) => {
      if (!codes.includes(code)) delete role.translations[code];
    });
    codes.forEach((code) => {
      if (!(code in role.translations)) role.translations[code] = "";
    });
  });

  state.siteConfig.tags.forEach((tag) => {
    if (!tag.translations) tag.translations = {};
    Object.keys(tag.translations).forEach((code) => {
      if (!codes.includes(code)) delete tag.translations[code];
    });
    codes.forEach((code) => {
      if (!(code in tag.translations)) tag.translations[code] = "";
    });
  });
}

function renameTranslationKey(oldCode, newCode) {
  if (!oldCode || oldCode === newCode) return;
  state.siteConfig.roles.forEach((role) => {
    if (role.translations && oldCode in role.translations) {
      if (newCode) role.translations[newCode] = role.translations[oldCode];
      delete role.translations[oldCode];
    }
  });
  state.siteConfig.tags.forEach((tag) => {
    if (tag.translations && oldCode in tag.translations) {
      if (newCode) tag.translations[newCode] = tag.translations[oldCode];
      delete tag.translations[oldCode];
    }
  });
}

function removeTranslationKey(code) {
  if (!code) return;
  state.siteConfig.roles.forEach((role) => {
    if (role.translations) delete role.translations[code];
  });
  state.siteConfig.tags.forEach((tag) => {
    if (tag.translations) delete tag.translations[code];
  });
}

function getLanguageCodes() {
  return state.siteConfig.languages
    .map((language) => language.code.trim())
    .filter((code, index, array) => code && array.indexOf(code) === index);
}

function findLanguageByCode(code) {
  return state.siteConfig.languages.find((language) => language.code === code);
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

function markSiteDirty(message) {
  setStatus(elements.siteStatus, message || "Wijziging in site-config.", "");
}

function markManifestDirty(message) {
  setStatus(elements.manifestStatus, message || "Wijziging in artikellijst.", "");
}

function setStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  element.dataset.state = state || "";
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
