import { FALLBACK_DATA } from "./data.js";

const statusElement = document.getElementById("status");
const repoRoot = new URL("../", import.meta.url);

initRedirect();

async function initRedirect() {
  try {
    const dataset = await loadDataset();
    const targetUrl = resolveTargetUrl(dataset);

    if (statusElement) {
      statusElement.textContent = dataset.isFallback
        ? "Voorbeeldartikel openen…"
        : "Doorverwijzen naar het nieuwste item…";
    }

    setTimeout(() => {
      window.location.replace(targetUrl);
    }, 120);
  } catch (error) {
    console.error("Kon geen redirect uitvoeren:", error);
    if (statusElement) {
      const isFileProtocol = window.location.protocol === "file:";
      statusElement.innerHTML = isFileProtocol
        ? 'We konden de data-bestanden niet laden. Start de site via een lokale webserver (bijv. <code>python -m http.server</code>) en probeer opnieuw.'
        : "We konden de data-bestanden niet laden. Controleer of ze aanwezig zijn op de server.";
    }
  }
}

async function loadDataset() {
  try {
    const [config, manifest] = await Promise.all([
      fetchJson(new URL("data/site-config.json", repoRoot)),
      fetchJson(new URL("data/articles.json", repoRoot))
    ]);
    const articles = await loadArticles(manifest);

    return { config, articles, isFallback: false };
  } catch (error) {
    console.warn("Externe data niet beschikbaar, gebruik fallback-data.", error);
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
    const url = new URL(entry.properties, repoRoot);
    try {
      const details = await fetchJson(url);
      articles.push({ ...details, slug: entry.slug });
    } catch (error) {
      console.warn(`Kon artikelgegevens niet laden (${url}).`, error);
    }
  }

  return articles;
}

function resolveTargetUrl(dataset) {
  const { config, articles } = dataset;
  const preferredSlug = config?.site?.highlightedArticleSlug || "";
  const article = selectNewestArticle(articles, preferredSlug);

  if (!article) {
    throw new Error("Geen artikelen beschikbaar voor redirect.");
  }

  const preferredLang = detectPreferredLanguage(article);
  const translations = article.translations || {};
  const translation = translations[preferredLang] || Object.values(translations)[0];
  const link = buildArticleLink(article, translation, preferredLang);

  if (!link) {
    throw new Error("Geen geldige link voor het nieuwste artikel.");
  }

  return link;
}

function getArticleUploadDateValue(article) {
  return article?.uploadedAt || article?.uploadDate || article?.published || "";
}

function getArticleUploadTimestamp(article) {
  const rawValue = getArticleUploadDateValue(article);
  if (!rawValue) return Number.NEGATIVE_INFINITY;
  const timestamp = Date.parse(rawValue);
  return Number.isFinite(timestamp) ? timestamp : Number.NEGATIVE_INFINITY;
}

function selectNewestArticle(articles, preferredSlug = "") {
  if (!Array.isArray(articles) || !articles.length) return null;
  return articles.reduce((newest, candidate) => {
    if (!newest) return candidate;
    const newestTimestamp = getArticleUploadTimestamp(newest);
    const candidateTimestamp = getArticleUploadTimestamp(candidate);
    if (candidateTimestamp > newestTimestamp) return candidate;
    if (candidateTimestamp < newestTimestamp) return newest;
    const newestIsPreferred = preferredSlug && newest?.slug === preferredSlug;
    const candidateIsPreferred = preferredSlug && candidate?.slug === preferredSlug;
    if (candidateIsPreferred !== newestIsPreferred) {
      return candidateIsPreferred ? candidate : newest;
    }
    const newestSlug = newest?.slug || "";
    const candidateSlug = candidate?.slug || "";
    return candidateSlug.localeCompare(newestSlug) < 0 ? candidate : newest;
  }, null);
}

function detectPreferredLanguage(article) {
  const translations = article.translations || {};
  const available = Object.keys(translations);

  if (!available.length) {
    throw new Error("Geen vertalingen beschikbaar voor het nieuwste artikel.");
  }

  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  const pathLang = detectPathLanguage();

  const preferred =
    (queryLang && translations[queryLang] && queryLang) ||
    (pathLang && translations[pathLang] && pathLang) ||
    (translations.nl ? "nl" : available[0]);

  return preferred;
}

function detectPathLanguage() {
  const segments = window.location.pathname.replace(/\/+$/, "").split("/");
  const index = segments.lastIndexOf("video-latest");
  if (index === -1) return null;
  const langSegment = segments[index + 1];
  if (!langSegment || langSegment === "index.html") return null;
  return langSegment;
}

function buildArticleLink(article, translation, languageCode) {
  const slug = article.slug;
  const fallback = `articles/${slug}/?lang=${languageCode}`;
  if (!translation) {
    return new URL(fallback, repoRoot).toString();
  }

  const raw = translation.link || fallback;

  try {
    const url = new URL(raw, repoRoot);
    if (!url.searchParams.has("lang")) {
      url.searchParams.set("lang", languageCode);
    }
    return url.toString();
  } catch (error) {
    return new URL(fallback, repoRoot).toString();
  }
}

function fetchJson(resource) {
  return fetch(resource).then((response) => {
    if (!response.ok) {
      throw new Error(`Kon ${resource} niet ophalen (${response.status})`);
    }
    return response.json();
  });
}
