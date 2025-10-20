import { FALLBACK_DATA } from "./data.js";

const state = {
  config: null,
  articles: [],
  currentLanguage: null,
  activeRole: null,
  usingFallback: false
};

const elements = {
  newsletterLink: document.getElementById("newsletterLink"),
  newsletterFooterLink: document.getElementById("newsletterFooterLink"),
  logoLink: document.getElementById("logoLink"),
  languageSwitcher: document.getElementById("languageSwitcher"),
  languageTrigger: document.getElementById("languageTrigger"),
  languageMenu: document.getElementById("languageMenu"),
  heroIntro: document.getElementById("heroIntro"),
  heroCard: document.getElementById("heroCard"),
  heroLink: document.getElementById("heroLink"),
  heroThumbnail: document.getElementById("heroThumbnail"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroTags: document.getElementById("heroTags"),
  lmraLink: document.getElementById("lmraLink"),
  heroChecklistCopy: document.querySelector(".hero__checklist p"),
  roleFilter: document.getElementById("roleFilter"),
  catalogTitle: document.getElementById("catalogTitle"),
  filterLabel: document.getElementById("filterLabel"),
  articlesGrid: document.getElementById("articlesGrid"),
  articleCardTemplate: document.getElementById("articleCardTemplate"),
  dataFallbackNotice: document.getElementById("dataFallbackNotice"),
  footerYear: document.getElementById("footerYear")
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

function resolveArticleLink(article, translation, languageCode) {
  const slug = article.slug;
  const fallback = `articles/${slug}/?lang=${languageCode}`;
  const raw = translation?.link;

  if (!raw) {
    return fallback;
  }

  try {
    const url = new URL(raw, window.location.href);
    if (!url.searchParams.has("lang")) {
      url.searchParams.set("lang", languageCode);
    }

    if (isRelativeUrl(raw)) {
      const relativePath = url.pathname.replace(/^\//, "");
      const search = url.searchParams.toString();
      return search ? `${relativePath}?${search}` : relativePath;
    }

    return url.toString();
  } catch (error) {
    return fallback;
  }
}

function findTranslationKey(article, translation) {
  if (!article?.translations || !translation) return null;
  const entry = Object.entries(article.translations).find(([, value]) => value === translation);
  return entry ? entry[0] : null;
}

async function init() {
  try {
    const dataset = await loadDataset();

    state.config = dataset.config;
    state.articles = dataset.articles.slice();
    state.usingFallback = dataset.isFallback;

    state.articles.sort((a, b) => {
      const aDate = new Date(a.published);
      const bDate = new Date(b.published);
      return bDate - aDate;
    });

    state.currentLanguage = determineInitialLanguage(state.config);
    state.activeRole = null;

    document.documentElement.lang = toLocale(state.currentLanguage);
    updateFallbackNotice();
    setupLanguageSwitcher();
    populateStaticLinks();
    setupRoleFilter();
    attachEventListeners();
    render();
  } catch (error) {
    console.error("Kon het dashboard niet laden:", error);
    elements.articlesGrid.innerHTML =
      '<p class="load-error">Er ging iets mis bij het laden van de inhoud. Controleer of de data-bestanden aanwezig zijn.</p>';
  }
}

async function loadDataset() {
  try {
    const [config, manifest] = await Promise.all([
      fetchJson("data/site-config.json"),
      fetchJson("data/articles.json")
    ]);
    const articles = await loadArticles(manifest);
    return { config, articles, isFallback: false };
  } catch (error) {
    console.warn(
      "Kon de externe data-bestanden niet laden, toon fallback-data.",
      error
    );
    return {
      config: FALLBACK_DATA.config,
      articles: FALLBACK_DATA.articles,
      isFallback: true
    };
  }
}

async function loadArticles(manifest) {
  const articles = [];
  for (const entry of manifest) {
    try {
      const details = await fetchJson(entry.properties);
      articles.push({ ...details, slug: entry.slug, properties: entry.properties });
    } catch (error) {
      console.warn(`Kon artikel ${entry.slug} niet inladen`, error);
    }
  }
  return articles;
}

function determineInitialLanguage(config) {
  const urlParam = new URLSearchParams(window.location.search).get("lang");
  const stored = localStorage.getItem("safety-hub-language");
  const browser = navigator.language?.slice(0, 2).toLowerCase();

  if (isSupportedLanguage(urlParam, config)) return urlParam;
  if (isSupportedLanguage(stored, config)) return stored;
  if (isSupportedLanguage(browser, config)) return browser;
  return config.languages[0]?.code ?? "nl";
}

function isSupportedLanguage(code, config) {
  return Boolean(code && config.languages.some((lang) => lang.code === code));
}

function setupLanguageSwitcher() {
  const { languages, uiText } = state.config;
  elements.languageMenu.innerHTML = "";
  languages.forEach((lang) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.code = lang.code;
    button.textContent = `${lang.flag}  ${lang.name}`;
    item.appendChild(button);
    elements.languageMenu.appendChild(item);
  });

  const activeLang = languages.find((lang) => lang.code === state.currentLanguage);
  elements.languageTrigger.textContent = `${activeLang.flag}  ${activeLang.name}`;
  const label =
    uiText.languageSelector[state.currentLanguage] || uiText.languageSelector.nl;
  elements.languageTrigger.setAttribute("aria-label", label);
  elements.languageTrigger.setAttribute("aria-expanded", "false");
}

function populateStaticLinks() {
  const { site } = state.config;
  const homepageUrl = resolveHomepageUrl();
  elements.newsletterLink.href = site.newsletterUrl;
  if (elements.newsletterFooterLink) {
    elements.newsletterFooterLink.href = site.newsletterUrl;
  }
  elements.lmraLink.href = buildLanguageAwareUrl(state.currentLanguage, site.lmraUrl);
  elements.logoLink.href = buildLanguageAwareUrl(state.currentLanguage, homepageUrl);
  if (elements.footerYear) {
    elements.footerYear.textContent = new Date().getFullYear();
  }
}

function updateFallbackNotice() {
  if (!elements.dataFallbackNotice) return;
  if (state.usingFallback) {
    const isFileProtocol = window.location.protocol === "file:";
    elements.dataFallbackNotice.innerHTML = isFileProtocol
      ? 'De gegevens konden niet rechtstreeks uit de data-bestanden geladen worden. Start de site via een lokale webserver (bijv. <code>python -m http.server</code>) om je eigen data te zien.'
      : "De data-bestanden konden niet geladen worden. Controleer of ze bestaan en geldig JSON bevatten.";
    elements.dataFallbackNotice.hidden = false;
  } else {
    elements.dataFallbackNotice.hidden = true;
  }
}

function setupRoleFilter() {
  const { roles, uiText } = state.config;
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = uiText.filterAll[state.currentLanguage] || "Alle functies";
  elements.roleFilter.innerHTML = "";
  elements.roleFilter.appendChild(defaultOption);

  roles.forEach((role) => {
    const option = document.createElement("option");
    option.value = role.id;
    option.textContent = getRoleLabel(role.id, state.currentLanguage);
    elements.roleFilter.appendChild(option);
  });

  elements.roleFilter.value = state.activeRole ?? "";
}

function attachEventListeners() {
  elements.languageTrigger.addEventListener("click", toggleLanguageMenu);
  elements.languageMenu.addEventListener("click", (event) => {
    if (event.target.dataset.code) {
      changeLanguage(event.target.dataset.code);
      toggleLanguageMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!elements.languageSwitcher.contains(event.target)) {
      toggleLanguageMenu(false);
    }
  });

  elements.roleFilter.addEventListener("change", (event) => {
    state.activeRole = event.target.value || null;
    renderArticles();
  });
}

function toggleLanguageMenu(force) {
  const expanded =
    typeof force === "boolean"
      ? force
      : !elements.languageMenu.classList.contains("is-visible");
  elements.languageMenu.classList.toggle("is-visible", expanded);
  elements.languageTrigger.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function changeLanguage(code) {
  if (!isSupportedLanguage(code, state.config)) return;
  state.currentLanguage = code;
  localStorage.setItem("safety-hub-language", code);
  document.documentElement.lang = toLocale(code);
  setupLanguageSwitcher();
  setupRoleFilter();
  populateStaticLinks();
  render();
}

function render() {
  renderTexts();
  renderHero();
  renderArticles();
}

function renderTexts() {
  const { uiText } = state.config;
  const lang = state.currentLanguage;

  elements.heroIntro.textContent = uiText.latestItem[lang] || uiText.latestItem.nl;
  elements.catalogTitle.textContent = uiText.allItems[lang] || uiText.allItems.nl;
  elements.filterLabel.textContent = uiText.filterLabel[lang] || uiText.filterLabel.nl;
  elements.newsletterLink.textContent =
    uiText.newsletterCta[lang] || uiText.newsletterCta.nl;
  if (elements.newsletterFooterLink) {
    elements.newsletterFooterLink.textContent =
      uiText.newsletterCta[lang] || uiText.newsletterCta.nl;
  }
  elements.heroChecklistCopy.textContent =
    uiText.lmraIntro[lang] || uiText.lmraIntro.nl;
  elements.lmraLink.textContent = uiText.lmraButton[lang] || uiText.lmraButton.nl;
  if (elements.footerYear) {
    elements.footerYear.textContent = new Date().getFullYear();
  }
}

function renderHero() {
  const { highlightedArticleSlug } = state.config.site;
  const fallbackArticle = state.articles[0];
  const heroArticle =
    state.articles.find((article) => article.slug === highlightedArticleSlug) ||
    fallbackArticle;

  if (!heroArticle) {
    elements.heroCard.style.display = "none";
    elements.heroIntro.style.display = "none";
    return;
  }

  elements.heroCard.style.display = "";
  elements.heroIntro.style.display = "";
  const translation = getTranslation(heroArticle, state.currentLanguage);
  if (!translation) {
    elements.heroCard.style.display = "none";
    elements.heroIntro.style.display = "none";
    return;
  }
  const translationLang =
    findTranslationKey(heroArticle, translation) || state.currentLanguage;
  const heroLink = resolveArticleLink(heroArticle, translation, translationLang);
  elements.heroLink.href = heroLink;
  elements.heroThumbnail.src = translation.thumbnail;
  elements.heroThumbnail.alt = translation.title;
  elements.heroTitle.textContent = translation.title;
  elements.heroMeta.textContent = buildMeta(heroArticle, translationLang);
  renderTagList(elements.heroTags, heroArticle.tags, state.currentLanguage);
}

function renderArticles() {
  const filteredArticles = state.activeRole
    ? state.articles.filter((article) => article.roles.includes(state.activeRole))
    : state.articles;

  elements.articlesGrid.innerHTML = "";

  if (filteredArticles.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      state.currentLanguage === "nl"
        ? "Geen artikelen gevonden voor deze functie."
        : "No articles found for this role.";
    elements.articlesGrid.appendChild(message);
    return;
  }

  filteredArticles.forEach((article) => {
    const card = createArticleCard(article);
    if (card) {
      elements.articlesGrid.appendChild(card);
    }
  });
}

function createArticleCard(article) {
  const translation = getTranslation(article, state.currentLanguage);
  if (!translation) return null;

  const translationLang =
    findTranslationKey(article, translation) || state.currentLanguage;
  const articleLink = resolveArticleLink(article, translation, translationLang);

  const fragment = elements.articleCardTemplate.content.cloneNode(true);
  const link = fragment.querySelector(".article-card__link");
  const thumb = fragment.querySelector(".article-card__thumb");
  const title = fragment.querySelector(".article-card__title");
  const date = fragment.querySelector(".article-card__date");
  const tags = fragment.querySelector(".article-card__tags");

  link.href = articleLink;
  thumb.src = translation.thumbnail;
  thumb.alt = translation.title;
  title.textContent = translation.title;
  date.textContent = buildMeta(article, translationLang);
  renderTagList(tags, article.tags, state.currentLanguage);

  return fragment;
}

function buildMeta(article, languageCode = state.currentLanguage) {
  const date = formatDate(article.published, languageCode);
  return date;
}

function getTranslation(article, languageCode) {
  const { translations } = article;
  if (!translations) return null;
  if (translations[languageCode]) return translations[languageCode];
  if (translations.nl) return translations.nl;
  const fallbackKey = Object.keys(translations)[0];
  return translations[fallbackKey];
}

function formatDate(value, languageCode) {
  const locale = toLocale(languageCode);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function getRoleLabel(roleId, languageCode) {
  const role = state.config.roles.find((item) => item.id === roleId);
  if (!role) return roleId;
  return (
    role.translations[languageCode] ||
    role.translations.nl ||
    Object.values(role.translations)[0]
  );
}

function getTagLabel(tagId, languageCode) {
  const tag = state.config.tags.find((item) => item.id === tagId);
  if (!tag) return tagId;
  return (
    tag.translations[languageCode] ||
    tag.translations.nl ||
    Object.values(tag.translations)[0]
  );
}

function renderTagList(listElement, tagIds, languageCode) {
  if (!listElement) return;
  listElement.innerHTML = "";
  const safeTagIds = Array.isArray(tagIds) ? tagIds : [];
  safeTagIds.forEach((tagId) => {
    const li = document.createElement("li");
    li.textContent = getTagLabel(tagId, languageCode);
    listElement.appendChild(li);
  });
}

function buildLanguageAwareUrl(code, baseUrl) {
  try {
    const url = new URL(baseUrl, window.location.href);
    url.searchParams.set("lang", code);
    return url.toString();
  } catch (error) {
    return `?lang=${code}`;
  }
}

function toLocale(code) {
  const overrides = { ua: "uk", nl: "nl", en: "en", de: "de", pl: "pl", ro: "ro", bg: "bg", sk: "sk" };
  return overrides[code] || code;
}

function fetchJson(path) {
  return fetch(path).then((response) => {
    if (!response.ok) {
      throw new Error(`Kon ${path} niet ophalen (${response.status})`);
    }
    return response.json();
  });
}

init();
