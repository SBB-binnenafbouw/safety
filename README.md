# Safety hub voor SBB Binnenafbouw

Deze map is klaar om naar een GitHub Pages-site te uploaden. Alles staat losjes in gewone bestanden, zodat je met een teksteditor eenvoudig talen, functies, tags en artikelen kunt bijwerken.

## Mappen en bestanden

- `index.html` – de homepage met hero, filter en kaartoverzicht.
- `assets/` – gedeelde styling (`styles.css`), artikelstijl (`article.css`), logo (`logo.png`) en scripts (`app.js`).
- `data/site-config.json` – alle systeeminstellingen: talen, functies, tags, UI-teksten en welk artikel uitgelicht wordt.
- `data/articles.json` – lijst van artikels en een verwijzing naar de properties-bestanden.
- `articles/<slug>/` – per artikel een map met HTML-versies, thumbnails en een `article.json`.
- `video-latest/` – tussenpagina die altijd doorstuurt naar het momenteel uitgelichte artikel (met optionele taalpad, bijvoorbeeld `video-latest/en/`).
- `admin/` � lokale properties manager met tabellen voor talen, functies, tags en uitgelicht artikel (open `admin/index.html`).

Daarnaast kun je op artikelniveau bewerken door `/admin/` aan de artikel-URL toe te voegen (bijvoorbeeld `articles/veilig-werken-met-hout/admin/`). Daar wijzig je datum, titels per taal, gekoppelde functies en tags van ��n artikel.
Open lokaal idealiter via een kleine webserver (bijvoorbeeld `python -m http.server` of de VS Code “Live Server”-extensie). Direct via `file:///` blokkeren moderne browsers het laden van de JSON-data; in dat geval toont de site de fallback-voorbeelden (twee demo-artikelen en de standaard instellingen).

## Talen, functies en tags beheren

In `data/site-config.json` staat alles in tabellen (arrays) die je simpel kunt bewerken:

- `languages` – naam, afkorting (code) en vlag.
- `roles` – elke functie krijgt een `id` en vertalingen per taal.
- `tags` – zelfde principe voor tags.
- `uiText` – vertaalde labels voor knoppen en teksten op de homepage.
- `site.highlightedArticleSlug` – `slug` van het artikel dat je wilt uitlichten in de hero.

Werkstappen:
1. Pas de tekst aan in een editor.
2. Sla op.
3. Ververs de browser om het resultaat te zien.

Wil je een taal toevoegen? Voeg hem aan `languages` toe en denk eraan om ook elke functie, tag en artikelvertaling die taal te geven.

## Een nieuw artikel toevoegen

1. Maak een nieuwe map onder `articles/`, bijvoorbeeld `articles/veilig-werken-op-hoogte/`.
2. Zet per taal een HTML-bestand en thumbnail in die map:
   - `index_nl.html`, `index_en.html`, … (gebruik het sjabloon uit de voorbeelden).
   - `Thumbnail_nl.png`, `Thumbnail_en.png`, … (kan ook een foto zijn).
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
      "html": "index_nl.html",
      "link": "articles/veilig-werken-op-hoogte/index_nl.html"
    },
    "en": {
      "title": "Safe work at height",
      "thumbnail": "articles/veilig-werken-op-hoogte/Thumbnail_en.png",
      "html": "index_en.html",
      "link": "articles/veilig-werken-op-hoogte/index_en.html"
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

5. Optioneel: wil je de homepage-hero op dit artikel laten wijzen? Zet de `slug` in `site.highlightedArticleSlug`.

6. Wil je voor dit artikel ook een formulier? Kopieer de map `articles/veilig-werken-met-hout/admin/` naar `articles/<slug>/admin/` (of maak een nieuwe `admin/index.html`) en open die URL in de browser.
### Over de artikel-links

- Het veld `link` bepaalt de URL van een kaart. In dit voorbeeld verwijzen ze naar `articles/<slug>/index_<taal>.html`.
- Wil je de nette structuur `https://.../<titel>/<taal>/`? Zorg dat je in GitHub daadwerkelijk folders `/<titel>/<taal>/index.html` publiceert en pas de `link`-waarde daarop aan.

## Filters en tags

- Filteren gebeurt op basis van `roles` (functies).
- Koppel functies en tags aan een artikel via het `roles`- en `tags`-veld in `article.json`.
- De dropdown in de header wordt automatisch vertaald aan de hand van `site-config.json`.

## Hero en checklist

- De tekst “Ons nieuwste item” en de checklist-knoppen komen uit `uiText`.
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
- Laat bestandsnamen van afbeeldingen en HTML’s overeenkomen met de taalcode, zo houd je alles overzichtelijk.
