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
        : "Doorverwijzen naar het uitgelichte item…";
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
  const slug = config?.site?.highlightedArticleSlug;
  let article = slug ? articles.find((item) => item.slug === slug) : null;

  if (!article) {
    article = articles[0];
  }

  if (!article) {
    throw new Error("Geen uitgelicht artikel beschikbaar.");
  }

  const preferredLang = detectPreferredLanguage(article);
  const translations = article.translations || {};
  const translation = translations[preferredLang] || Object.values(translations)[0];
  const link = buildArticleLink(article, translation, preferredLang);

  if (!link) {
    throw new Error("Geen geldige link voor het uitgelichte artikel.");
  }

  return link;
}

function detectPreferredLanguage(article) {
  const translations = article.translations || {};
  const available = Object.keys(translations);

  if (!available.length) {
    throw new Error("Geen vertalingen beschikbaar voor het uitgelichte artikel.");
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
