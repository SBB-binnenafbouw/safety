# Safety hub voor SBB Binnenafbouw

Deze map is klaar om naar een GitHub Pages-site te uploaden. Alles staat losjes in gewone bestanden, zodat je met een teksteditor eenvoudig talen, functies, tags en artikelen kunt bijwerken.

## Mappen en bestanden

- `index.html` â€“ de homepage met hero, filter en kaartoverzicht.
- `assets/` â€“ gedeelde styling (`styles.css`), artikelstijl (`article.css`), logo (`logo.png`) en scripts (`app.js`).
- `data/site-config.json` â€“ alle systeeminstellingen: talen, functies, tags en UI-teksten.
- `data/articles.json` â€“ lijst van artikels en een verwijzing naar de properties-bestanden.
- `articles/<slug>/` â€“ per artikel een map met HTML-versies, thumbnails en een `article.json`.
- `video-latest/` â€“ tussenpagina die altijd doorstuurt naar het nieuwste artikel op basis van uploaddatum (met optionele taalpad, bijvoorbeeld `video-latest/en/`).
- `admin/`  lokale properties manager met tabellen voor talen, functies, tags en een optionele tie-breaker bij gelijke datum (open `admin/index.html`).

Daarnaast kun je op artikelniveau bewerken door `/admin/` aan de artikel-URL toe te voegen (bijvoorbeeld `articles/veilig-werken-met-hout/admin/`). Daar wijzig je datum, titels per taal, gekoppelde functies en tags van n artikel.
Open lokaal idealiter via een kleine webserver (bijvoorbeeld `python -m http.server` of de VSâ€¯Code â€œLive Serverâ€-extensie). Direct via `file:///` blokkeren moderne browsers het laden van de JSON-data; in dat geval toont de site de fallback-voorbeelden (twee demo-artikelen en de standaard instellingen).

## Talen, functies en tags beheren

In `data/site-config.json` staat alles in tabellen (arrays) die je simpel kunt bewerken:

- `languages` â€“ naam, afkorting (code) en vlag.
- `roles` â€“ elke functie krijgt een `id` en vertalingen per taal.
- `tags` â€“ zelfde principe voor tags.
- `uiText` â€“ vertaalde labels voor knoppen en teksten op de homepage.
- `site.highlightedArticleSlug` â€“ optionele `slug` als tie-breaker wanneer meerdere artikelen exact dezelfde (upload/publicatie)datum hebben.

Werkstappen:
1. Pas de tekst aan in een editor.
2. Sla op.
3. Ververs de browser om het resultaat te zien.

Wil je een taal toevoegen? Voeg hem aan `languages` toe en denk eraan om ook elke functie, tag en artikelvertaling die taal te geven.

## Een nieuw artikel toevoegen

1. Maak een nieuwe map onder `articles/`, bijvoorbeeld `articles/veilig-werken-op-hoogte/`.
2. Zet per taal een fragment en thumbnail in die map:
   - `veilig-werken-op-hoogte_nl.html`, `veilig-werken-op-hoogte_en.html`, ... (een HTML-bestand per taal met alleen de content van het artikel).
   - `Thumbnail_nl.png`, `Thumbnail_en.png`, ... (worden gebruikt voor de kaarten op de homepage).
3. Maak (of kopieer) het bestand `article.json` naar die map en vul het in:

```json
{
  "slug": "veilig-werken-op-hoogte",
  "published": "2024-05-30",
  "roles": ["monteur"],
  "tags": ["checklist"],
  "translations": {
    "nl": {
      "title": "Veilig werken op hoogte",
      "thumbnail": "articles/veilig-werken-op-hoogte/Thumbnail_nl.png",
      "video": "https://player.vimeo.com/video/<embed-id>?title=0&byline=0&portrait=0",
      "html": "articles/veilig-werken-op-hoogte/veilig-werken-op-hoogte_nl.html",
      "link": "articles/veilig-werken-op-hoogte/?lang=nl"
    },
    "en": {
      "title": "Safe work at height",
      "thumbnail": "articles/veilig-werken-op-hoogte/Thumbnail_en.png",
      "video": "https://player.vimeo.com/video/<embed-id>?title=0&byline=0&portrait=0",
      "html": "articles/veilig-werken-op-hoogte/veilig-werken-op-hoogte_en.html",
      "link": "articles/veilig-werken-op-hoogte/?lang=en"
    }
    // vul alle talen aan
  }
}
```

4. Voeg een entry toe aan `data/articles.json`:

```json
[
  // bestaande items
  {
    "slug": "veilig-werken-op-hoogte",
    "properties": "articles/veilig-werken-op-hoogte/article.json"
  }
]
```

5. Optioneel: als meerdere artikelen exact dezelfde datum hebben, kun je met `site.highlightedArticleSlug` bepalen welke van die gelijke items voorrang krijgt.
6. Wil je voor dit artikel ook een formulier? Kopieer de map `articles/veilig-boren/admin/` naar `articles/<slug>/admin/` (of maak een nieuwe `admin/index.html`) en open die URL in de browser.

### Over de artikel-links

- Het veld `link` bepaalt de URL van een kaart. Gebruik in de nieuwe opbouw `articles/<slug>/?lang=<code>`.
- Wil je een andere structuur (bijvoorbeeld `https://.../<titel>/<taal>/`)? Zorg dat je precies die paden publiceert en pas de `link`-waarde daarop aan.

## Filters en tags

- Filteren gebeurt op basis van `roles` (functies).
- Koppel functies en tags aan een artikel via het `roles`- en `tags`-veld in `article.json`.
- De dropdown in de header wordt automatisch vertaald aan de hand van `site-config.json`.

## Hero en checklist

- De tekst â€œOns nieuwste itemâ€ en de checklist-knoppen komen uit `uiText`.
- De hero en `video-latest/` kiezen automatisch het artikel met de meest recente datum (`uploadedAt`/`uploadDate`, anders `published`).
- Het LMRA-blok gebruikt de URL uit `site.lmraUrl`.
- Voor de nieuwsbrief-knop gebruik je `site.newsletterUrl`.

## Publiceren op GitHub Pages

1. Maak een publieke repository.
2. Zet alle bestanden uit deze map in de root van die repository.
3. Commit & push.
4. Activeer GitHub Pages in de repository-instellingen (Source: `main`, folder: `/ (root)`).
5. Wacht een minuut en open de URL die GitHub aangeeft.

Nieuwe artikelen uploaden = map toevoegen + bestanden aanpassen + opnieuw pushen. Geen build-stap nodig.

## Tips

- Bewaar bij grote wijzigingen altijd eerst een kopie.
- Test lokaal door `index.html` te openen en de taal te wisselen.
- Laat bestandsnamen van afbeeldingen en HTMLâ€™s overeenkomen met de taalcode, zo houd je alles overzichtelijk.


