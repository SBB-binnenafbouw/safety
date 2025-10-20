import { FALLBACK_DATA } from "./data.js";

const repoRoot = new URL("../", import.meta.url);

const state = {
  slug: extractSlugFromPath(),
  config: null,
  article: null,
  currentLanguage: null,
  usingFallback: false
};

const elements = {
  newsletterLink: document.getElementById("newsletterLink"),
  newsletterFooterLink: document.getElementById("newsletterFooterLink"),
  logoLink: document.getElementById("logoLink"),
  languageTrigger: document.getElementById("languageTrigger"),
  languageMenu: document.getElementById("languageMenu"),
  articleBackLink: document.getElementById("articleBackLink"),
  articleMeta: document.getElementById("articleMeta"),
  articleTitle: document.getElementById("articleTitle"),
  articleRoles: document.getElementById("articleRoles"),
  articleVideo: document.getElementById("articleVideo"),
  articleContent: document.getElementById("articleContent"),
  footerYear: document.getElementById("footerYear"),
  placeholder: document.querySelector(".article-page__placeholder")
};

const PROJECT_ROOT = new URL("../", import.meta.url);
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

function isRelativeUrl(value) {
  return typeof value === "string" && !/^[a-z][a-z0-9+.-]*:/i.test(value);
}

function isLocalEnvironment() {
  if (typeof window === "undefined") return false;
  if (window.location.protocol === "file:") return true;
  return LOCAL_HOSTNAMES.has(window.location.hostname);
}

function resolveHomepageUrl() {
  const configured = state.config?.site?.homepageUrl;
  if (!configured || isLocalEnvironment()) {
    return PROJECT_ROOT.href;
  }
  if (isRelativeUrl(configured)) {
    return new URL(configured, PROJECT_ROOT).href;
  }
  return configured;
}

init();

async function init() {
  if (!state.slug) {
    renderError("Het artikel kon niet gevonden worden (ontbrekende slug in pad).");
    return;
  }

  try {
    const dataset = await loadDataset();
    state.config = dataset.config;
    state.article = dataset.article;
    state.usingFallback = dataset.isFallback;

    state.currentLanguage = determineInitialLanguage();
    document.documentElement.lang = toLocale(state.currentLanguage);

    setupLanguageSwitcher();
    populateStaticLinks();
    attachEventListeners();
    await renderArticle();
  } catch (error) {
    console.error(error);
    renderError("Kon de artikeldata niet laden. Controleer of de JSON aanwezig en geldig is.");
  }
}

function renderError(message) {
  if (elements.articleContent) {
    elements.articleContent.innerHTML = `<p class="article-page__placeholder">${message}</p>`;
  }
}

async function loadDataset() {
  let config;
  let article;
  let isConfigFallback = false;
  let isArticleFallback = false;

  try {
    config = await fetchJson(new URL("data/site-config.json", repoRoot));
  } catch (error) {
    console.warn("Kon site-config niet laden, gebruik fallback.", error);
    config = FALLBACK_DATA.config;
    isConfigFallback = true;
  }

  try {
    const articleUrl = new URL(`articles/${state.slug}/article.json`, repoRoot);
    article = await fetchJson(articleUrl);
  } catch (error) {
    console.warn("Kon artikelbestand niet laden, gebruik fallback.", error);
    article = FALLBACK_DATA.articles.find((item) => item.slug === state.slug);
    if (!article) {
      throw new Error(`Geen fallback-data gevonden voor artikel '${state.slug}'.`);
    }
    isArticleFallback = true;
  }

  return {
    config,
    article,
    isFallback: isConfigFallback || isArticleFallback
  };
}

function determineInitialLanguage() {
  const translations = state.article?.translations ?? {};
  const available = Object.keys(translations);
  if (!available.length) return "nl";

  const urlParam = new URLSearchParams(window.location.search).get("lang");
  const stored = localStorage.getItem("safety-hub-language");
  const browser = navigator.language?.slice(0, 2).toLowerCase();

  if (available.includes(urlParam)) return urlParam;
  if (available.includes(stored)) return stored;
  if (available.includes(browser)) return browser;
  return available[0];
}

function setupLanguageSwitcher() {
  if (!elements.languageMenu || !state.config?.languages) return;

  elements.languageMenu.innerHTML = "";
  state.config.languages.forEach((lang) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.code = lang.code;
    button.textContent = `${lang.flag}  ${lang.name}`;
    item.appendChild(button);
    elements.languageMenu.appendChild(item);
  });

  updateLanguageTrigger();
}

function updateLanguageTrigger() {
  if (!elements.languageTrigger || !state.config?.languages) return;
  const activeLang = state.config.languages.find((lang) => lang.code === state.currentLanguage);
  if (activeLang) {
    elements.languageTrigger.textContent = `${activeLang.flag}  ${activeLang.name}`;
    elements.languageTrigger.setAttribute("aria-label", activeLang.name);
  }
  elements.languageTrigger.setAttribute("aria-expanded", "false");
}

function populateStaticLinks() {
  const site = state.config?.site || {};
  const homepageUrl = resolveHomepageUrl();
  if (elements.newsletterLink) {
    elements.newsletterLink.href = site.newsletterUrl || "#";
  }
  if (elements.newsletterFooterLink) {
    elements.newsletterFooterLink.href = site.newsletterUrl || "#";
  }
  if (elements.logoLink) {
    elements.logoLink.href = buildLanguageAwareUrl(state.currentLanguage, homepageUrl);
  }
  if (elements.footerYear) {
    elements.footerYear.textContent = new Date().getFullYear();
  }
  if (elements.newsletterLink && state.config?.uiText) {
    const text = state.config.uiText.newsletterCta?.[state.currentLanguage] || state.config.uiText.newsletterCta?.nl;
    if (text) {
      elements.newsletterLink.textContent = text;
    }
  }
  if (elements.newsletterFooterLink && state.config?.uiText) {
    const text = state.config.uiText.newsletterCta?.[state.currentLanguage] || state.config.uiText.newsletterCta?.nl;
    if (text) {
      elements.newsletterFooterLink.textContent = text;
    }
  }
}

function attachEventListeners() {
  if (elements.languageTrigger) {
    elements.languageTrigger.addEventListener("click", () => {
      const expanded = elements.languageTrigger.getAttribute("aria-expanded") === "true";
      toggleLanguageMenu(!expanded);
    });
  }

  if (elements.languageMenu) {
    elements.languageMenu.addEventListener("click", (event) => {
      const code = event.target.dataset.code;
      if (code) {
        changeLanguage(code);
        toggleLanguageMenu(false);
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (
      elements.languageMenu &&
      elements.languageTrigger &&
      !elements.languageMenu.contains(event.target) &&
      !elements.languageTrigger.contains(event.target)
    ) {
      toggleLanguageMenu(false);
    }
  });
}

function toggleLanguageMenu(force) {
  if (!elements.languageMenu || !elements.languageTrigger) return;
  const expanded = typeof force === "boolean" ? force : elements.languageTrigger.getAttribute("aria-expanded") !== "true";
  elements.languageMenu.classList.toggle("is-visible", expanded);
  elements.languageTrigger.setAttribute("aria-expanded", expanded ? "true" : "false");
}

async function changeLanguage(code) {
  if (!state.article?.translations?.[code]) return;
  state.currentLanguage = code;
  localStorage.setItem("safety-hub-language", code);
  document.documentElement.lang = toLocale(code);
  updateLanguageTrigger();
  populateStaticLinks();
  const url = new URL(window.location.href);
  url.searchParams.set("lang", code);
  window.history.replaceState({}, "", url);
  await renderArticle();
}

async function renderArticle() {
  if (!state.article) return;
  const translation = getTranslation(state.article, state.currentLanguage);
  if (!translation) {
    renderError("Voor deze taal is geen vertaling beschikbaar.");
    return;
  }

  renderTitle(translation);
  renderMeta();
  renderVideo(translation);
  await renderContent(translation);
}

function renderTitle(translation) {
  if (elements.articleTitle) {
    elements.articleTitle.textContent = translation.title || state.article.slug;
  }
  document.title = translation.title ? `${translation.title} | SBB Safety` : "Artikel | SBB Safety";

  if (elements.articleBackLink) {
    const homepage = resolveHomepageUrl();
    elements.articleBackLink.href = buildLanguageAwareUrl(
      state.currentLanguage,
      homepage || PROJECT_ROOT.href
    );
  }
}

function renderMeta() {
  if (!state.article) return;
  if (elements.articleMeta) {
    const dateLabel = formatDate(state.article.published, state.currentLanguage);
    const tags = Array.isArray(state.article.tags) ? state.article.tags : [];
    const tagNames = tags
      .map((id) => getTagLabel(id, state.currentLanguage))
      .filter(Boolean);
    const metaText = tagNames.length ? `${dateLabel} • ${tagNames.join(", ")}` : dateLabel;
    elements.articleMeta.textContent = metaText;
  }
  renderChipList(elements.articleRoles, state.article.roles, getRoleLabel);
}

function renderChipList(container, ids, resolver) {
  if (!container) return;
  const wrapper = container.closest(".article-page__group");
  container.innerHTML = "";
  const list = Array.isArray(ids) ? ids : [];
  if (!list.length) {
    if (wrapper) wrapper.hidden = true;
    return;
  }
  if (wrapper) wrapper.hidden = false;
  list.forEach((id) => {
    const li = document.createElement("li");
    li.textContent = resolver(id, state.currentLanguage);
    container.appendChild(li);
  });
}

function renderVideo(translation) {
  if (!elements.articleVideo) return;
  const src = translation.video || "";
  if (src) {
    elements.articleVideo.src = src;
    elements.articleVideo.title = translation.title || "Video";
    elements.articleVideo.hidden = false;
  } else {
    elements.articleVideo.src = "";
    elements.articleVideo.title = "";
    elements.articleVideo.hidden = true;
  }
}

async function renderContent(translation) {
  if (!elements.articleContent) return;
  if (elements.placeholder) {
    elements.placeholder.remove();
  }

  const htmlPath = translation.html;
  if (!htmlPath) {
    elements.articleContent.innerHTML = "";
    elements.articleContent.hidden = true;
    return;
  }

  elements.articleContent.hidden = false;
  elements.articleContent.innerHTML =
    '<p class="article-page__placeholder">Inhoud wordt geladen…</p>';

  try {
    const response = await fetch(resolveResource(htmlPath));
    if (!response.ok) {
      elements.articleContent.innerHTML = "";
      elements.articleContent.hidden = true;
      return;
    }
    const markup = await response.text();
    if (!markup.trim()) {
      elements.articleContent.innerHTML = "";
      elements.articleContent.hidden = true;
      return;
    }
    elements.articleContent.innerHTML = markup;
    elements.articleContent.hidden = false;
  } catch (error) {
    console.warn("Kon HTML-fragment niet laden:", error);
    elements.articleContent.innerHTML = "";
    elements.articleContent.hidden = true;
  }
}

function resolveResource(path) {
  if (!path) return path;
  if (!isRelativeUrl(path)) return path;
  const base = path.startsWith('articles/') || path.startsWith('assets/') || path.startsWith('data/')
    ? PROJECT_ROOT
    : window.location.href;
  try {
    return new URL(path, base).toString();
  } catch (error) {
    return path;
  }
}


function getTranslation(article, languageCode) {
  if (!article?.translations) return null;
  if (article.translations[languageCode]) return article.translations[languageCode];
  if (article.translations.nl) return article.translations.nl;
  const [first] = Object.values(article.translations);
  return first || null;
}

function getRoleLabel(roleId, languageCode) {
  const role = state.config?.roles?.find((item) => item.id === roleId);
  if (!role) return roleId;
  return (
    role.translations?.[languageCode] ||
    role.translations?.nl ||
    Object.values(role.translations || {})[0] ||
    roleId
  );
}

function getTagLabel(tagId, languageCode) {
  const tag = state.config?.tags?.find((item) => item.id === tagId);
  if (!tag) return tagId;
  return (
    tag.translations?.[languageCode] ||
    tag.translations?.nl ||
    Object.values(tag.translations || {})[0] ||
    tagId
  );
}

function formatDate(value, languageCode) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(toLocale(languageCode), {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function buildLanguageAwareUrl(code, baseUrl) {
  try {
    const url = new URL(baseUrl, window.location.href);
    if (code) {
      url.searchParams.set("lang", code);
    }
    return url.toString();
  } catch (error) {
    return baseUrl;
  }
}

function toLocale(code) {
  const overrides = { ua: "uk", nl: "nl", en: "en", de: "de", pl: "pl", ro: "ro", bg: "bg", sk: "sk" };
  return overrides[code] || code || "nl";
}

function extractSlugFromPath() {
  const segments = window.location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const articlesIndex = segments.indexOf("articles");
  if (articlesIndex === -1 || articlesIndex + 1 >= segments.length) return null;
  return segments[articlesIndex + 1];
}

function fetchJson(resource) {
  return fetch(resource).then((response) => {
    if (!response.ok) {
      throw new Error(`Kon ${resource} niet ophalen (${response.status})`);
    }
    return response.json();
  });
}




