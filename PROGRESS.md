# PROGRESS.md — Easy Learn : état exact du projet

> **Mis à jour le 23 juillet 2026** — après le commit `fdcdb75` (fiches Installation & Configuration) + cette sauvegarde de session.
> **But de ce fichier** : permettre de reprendre le projet dans une nouvelle session sans rien réexpliquer. Tout ce qui suit est relevé sur le disque, pas écrit de mémoire. Si une divergence apparaît entre ce fichier et le code, **le code fait foi** (et ce fichier doit être corrigé).

---

## 1. Vue d'ensemble

- **Projet** : « Easy Learn », site personnel de documentation pour apprendre à coder **en français**, style iOS premium (flous, cartes, Material Symbols Rounded, thème clair/sombre).
- **Stack** : **100 % HTML/CSS/JS vanilla**, aucune étape de build, aucune dépendance d'exécution (hors CDN Google Fonts pour les icônes). On ouvre `index.html`, ça marche.
- **Restructuration React/Laravel : NON ENTAMÉE.** Aucun scaffold frontend React, aucun backend Laravel, aucune migration/seed/endpoint/auth n'existe. Cette idée n'apparaît que comme **piste documentée** dans le texte du paywall de démonstration (`js/exo-app.js`) et dans le README (« Extensions documentées (non implémentées) »). Ne rien présupposer d'existant.
- **Contenu actuel** : **371 fiches** réparties sur **17 modules**, **85 exercices pratiques** (voir section 4).
- **Localisation de travail** : le projet vit dans `/home/user/devdocs/` (cette machine). **Ce dossier n'est pas lui-même un dépôt Git** : la version fait foi sur GitHub `NiceMank/Easy-Learn` (branche `main`, dépôt privé), synchronisée par la procédure de la section 8.

## 2. Arborescence réelle (telle qu'elle existe sur le disque)

```
/home/user/devdocs/
├── index.html            # coquille unique : topbar, sidebar, #view, overlay de recherche
├── README.md             # présentation + structure + section Tests
├── Language.md           # recensement des 17 modules (compteurs à jour : 371)
├── PROGRESS.md           # CE FICHIER
├── .gitignore            # système/éditeur + node_modules/dist/build/out + .env* + vendor/
├── css/
│   ├── main.css          # design system iOS (37 ko), thème [data-theme], flous
│   └── exo.css           # design du module Exercices (38 ko)
├── js/
│   ├── app.js            # routeur par hash, vues, recherche Spotlight (Ctrl+K), favoris,
│   │                     historique, thème, sidebar. Renderer = renderBlock() + md()
│   ├── highlight.js      # coloration syntaxique maison (objet global High : esc, run)
│   ├── premium.js        # déverrouillage premium DÉMO (clé stockée en localStorage)
│   ├── exo-app.js        # vues Exercices (hub/module/détail/paywall), progression
│   ├── exo-runner.js     # atelier dom : iframe sandboxée, injection des tests, postMessage
│   ├── data-<mod>.js     # 17 fichiers de CONTENU : window.DEVDOCS.<clé> (371 fiches)
│   └── exo-<mod>.js      # 17 fichiers d'EXERCICES : window.DEVDOCS_EXO.<clé> (85 exos)
└── tests/                # harnais de validation Node/jsdom (voir section 6)
    ├── render-html.js    # charge une page réelle via jsdom + assertions par mode
    ├── smoke.js          # accueil + 17 sommaires + 371 fiches via le routeur réel
    ├── exocheck.js       # structure + rendu des 85 exercices
    ├── smoke-design.js   # 24 assertions statiques sur le design
    ├── validate.js       # IDs uniques, blocs bien formés, related non cassés
    ├── scan-all-tags.js  # anti-régression « balise brute hors backticks » (md())
    └── census.js         # recensement factuel (fiches/module, 1re fiche, install oui/non)

Hors projet (machine locale seulement, JAMAIS commités) :
├── /home/user/devdocs-backup-*.js|json   # sauvegardes pré-réécriture des data
└── /home/user/uploads/Mon personnal Token Gittub farelahd.txt  # token GitHub EN CLAIR
```

## 3. Modules de contenu : état précis

**Totaux : 371 fiches · 17 modules.** Détail relevé par `tests/census.js` le 23/07/2026 :

| Module (clé) | Fichier | Fiches | 1re fiche (id) | Passe d'approfondissement | Fiche Installation & Config |
|---|---|---|---|---|---|
| React JS (`react`) | data-react.js | 21 | `react-installation` | **OUI** (backup *-ORIGINAL présent) | **OUI** — créée |
| Vue.js (`vue`) | data-vue.js | 29 | `vue-installation` | non tracée | **OUI** — créée |
| Tailwind CSS (`tailwind`) | data-tailwind.js | 15 | `tw-installation` | **OUI** (backup *-ORIGINAL) | **OUI** — fiche pré-existante harmonisée |
| Laravel (`laravel`) | data-laravel.js | 18 | `lv-installation` | **OUI** (backup *-ORIGINAL) | **OUI** — créée |
| TanStack Query (`tanstack`) | data-tanstack.js | 14 | `tq-installation` | non tracée | **OUI** — créée |
| Python (`python`) | data-python.js | 18 | `py-demarrage` | non tracée | **OUI** — fiche pré-existante complétée |
| Flask (`flask`) | data-flask.js | 17 | `fk-installation` | non tracée | **OUI** — créée |
| Django (`django`) | data-django.js | 20 | `jd-installation` | non tracée | **OUI** — créée |
| React Native (`rn`) | data-reactnative.js | 24 | `rn-installation` | non tracée | **OUI** — créée |
| PHP (`php`) | data-php.js | 35 | `php-fondamentaux` | non tracée | **NON — candidate n°1** |
| Node.js (`node`) | data-node.js | 29 | `nd-single-thread` | non tracée | **NON — candidate n°2** |
| Langage C (`c`) | data-c.js | 30 | `c-compilation` | non tracée | **NON — candidate n°3** |
| Java (`java`) | data-java.js | 42 | `java-jdk-jre-jvm` | non tracée | **NON — candidate n°4** |
| TypeScript (`ts`) | data-typescript.js | 25 | `ts-pourquoi` | non tracée | NON — **doublon partiel** : `ts-tsc-config` couvre déjà la configuration |
| HTML (`html`) | data-html.js | 9 | `html-structure` | non tracée | NON — **rien à installer** (navigateur seul) |
| CSS (`css`) | data-css.js | 12 | `css-syntaxe-selecteurs` | non tracée | NON — **rien à installer** |
| JavaScript (`js`) | data-js.js | 13 | `js-variables` | non tracée | NON — **rien à installer** |

### Fiches « Installation & Configuration » (directive exécutée le 22/07/2026)

- **7 créées de zéro**, en **toute première position** de leur sommaire, icône **`download`**, niveau **`Débutant`** : `react-installation` (26 blocs — Node/npm, `npm create vite@latest`, arborescence, `vite.config.js`/`package.json`, serveur dev, React DevTools), `tq-installation` (21 — `@tanstack/react-query`, `QueryClient`+`QueryClientProvider` racine, DevTools), `lv-installation` (24 — PHP, Composer, `composer create-project laravel/laravel`, `.env`, clé d'app, `php artisan serve`, arborescence des dossiers générés), `fk-installation` (25 — venv, `pip install flask`, structure minimale, `FLASK_APP`), `jd-installation` (21 — venv, `pip install django`, `startproject`, création d'app, migrations), `vue-installation` (22 — `npm create vue@latest`, gabarit, Vite pour Vue), `rn-installation` (23 — Expo vs CLI, `npx create-expo-app`, Expo Go/simulateur).
- **2 pré-existantes adaptées** : `tw-installation` (icône alignée sur `download`, section « pipeline npm dev/build » ajoutée, remarque OS ; 28 blocs) et `py-demarrage` (bloc **venv** ajouté — celui que Flask/Django réutilisent — **+ les deux h3 obligatoires qui manquaient** ; 19 blocs).
- Chaque fiche contient : prérequis et versions minimales, étapes commentées (pas de simple liste), fichiers générés expliqués un par un, vérification que ça marche (commande/page), erreurs fréquentes d'installation + résolution (version Node, PATH PHP, port occupé, venv oublié…), différences Windows/macOS/Linux, h3 exacts « **Ce que les débutants comprennent mal** » et « **Lien avec les notions déjà vues** » (dernier h3, suivi d'un `p`), `errors: […]` ×2.
- **Reste à faire (analyse validée avec l'utilisateur)** : PHP (XAMPP/brew/apt, `php -S`, `php.ini`), Node (nvm vs installateur, node/npm/npx, `npm init`), C (gcc/clang, MinGW sous Windows, première compilation), Java (JDK Temurin vs Oracle, `JAVA_HOME`, PATH, `javac -version`). TypeScript : à évaluer (partiellement couvert). HTML/CSS/JS : exclus volontairement.

## 4. Module Exercices Pratiques (premium) : état

**Terminé et vert.** 85 exercices = 5 par module × 17 modules (2 Fondamentaux, 2 Intermédiaires, 1 Projet ; le 1er de chaque module est gratuit) : **30 `dom`** (atelier codé, tests auto dans iframe sandboxée — HTML, CSS, JS, React, Tailwind, Vue) + **55 `checklist`** (auto-évaluation locale — les 11 autres). Schéma `dom` : `panes[]` (dont ≥1 éditable avec `code`) + `tests[]` (`check: function(doc)`) ; schéma checklist : `setup/context/statement/constraints/checklist[]/hints/solution`. Progression en `localStorage` (`dd-exo-progress-v1`). Verrou premium : `js/premium.js`, **simulation assumée** — clé stockée en `dd-premium` dans localStorage, clés de démo `DEVDOCS-PREMIUM-2026` / `AWA-MENTOR-2026` ; le paywall dit lui-même que ce n'est pas un vrai paiement et documente l'hypothétique backend (Laravel + Sanctum, Stripe/FedaPay/MTN MoMo, API Judge0). Validation `tests/exocheck.js` : **OK** (85/85, rendu réel OK).

## 5. Interface & fonctionnalités (toutes livrées)

Routeur par hash (`#/`, `#/<module>`, `#/fiche/<id>`, `#/exercices…`, favoris, historique) · recherche Spotlight avec **Ctrl+K** (correctif du focus : essai immédiat + `select()` + rAF + renfort `setTimeout` 60 ms — livré dans la v1.0) · index de recherche accent-insensible avec extraits · favoris (`dd-favs`) · historique (`dd-hist`) · thème clair/sombre (`dd-theme`, respect `prefers-color-scheme`) · pager précédent/suivant par fiche · notions liées · compteurs de lecture calculés **au runtime** (`f.read`, jamais stocké dans les data) · révélations au scroll (`IntersectionObserver`).

## 6. Qualité — harnais de validation

Suite **persistante dans `tests/`** (versionnée). **Prérequis** : jsdom v29 — `mkdir -p /tmp/nm && cd /tmp/nm && npm i jsdom` (chargé depuis `/tmp/nm` ; **à réinstaller à chaque session** car `/tmp` est vidé à chaque nouveau message et `node_modules` n'est jamais sauvegardé).

```
node tests/validate.js        # structure + related     → 371 fiches, 0 related cassé
node tests/scan-all-tags.js   # anti-régression md()    → 0 balise brute
node tests/smoke-design.js    # 24 assertions design    → 24/24
node tests/exocheck.js        # 85 exercices            → 85 (30 dom / 55 checklist), rendu OK
node tests/smoke.js           # navigation réelle       → 389 pages, 371 pager
node tests/census.js          # faits (compteurs)       → tableau de la section 3
node tests/render-html.js /fiche/<id> fiche   # inspecter UNE fiche en détail
```

**Dernier passage complet : 23/07/2026, tout au vert.**

⚠️ **Bug corrigé le 22/07/2026 (à ne pas réintroduire)** : des balises HTML brutes (`<template>`, `<script setup>`, `<Transition>`, `<Text>`, `<int:id>`, `<T>`…) présentes dans 14 champs passés par `md()` devenaient de vrais éléments DOM et **avalaient la fin des fiches** (5 fiches Vue avaient perdu leur pager). 20 occurrences backtickées (Vue ×6, Java ×7, Django ×3, RN ×2, C ×1, Flask ×1). `tests/scan-all-tags.js` surveille ça **avant chaque commit**.

## 7. Décisions techniques & conventions (verrouillées — ne pas re-décider autrement)

1. **Vanilla only, zéro build.** Le contenu vit dans `js/data-*.js` sous `window.DEVDOCS.<clé>` (clé du module React Native = `rn`). Jamais de framework, jamais de bundler.
2. **Blocs plats** de fiche : `h3, p, ul, ol, code, callout, table, demo` (+ champs `tagline, intro, errors[2 min], related[]`). `callout.kind ∈ {tip, warn, info}` ; bloc `code` : `{ t:'code', lang, label?, code }` ; bloc `demo` : `{ t:'demo', html, height? }` (iframe sandboxée).
3. **Règle `md()`** : `intro, tagline, p, h3, callout.h, items ul/ol, cellules de table, errors.why` passent par le mini-markdown `md()` — **toute balise HTML brute y devient un élément DOM** ; toujours l'écrire entre backticks : `` `<template>` ``. `table.head` et `errors.title` passent par `High.esc` (bruts autorisés). Les blocs `code` sont échappés par `High.run` (sûrs).
4. **Chaque fiche** : h3 exact « Ce que les débutants comprennent mal » + h3 exact « Lien avec les notions déjà vues » (**dernier h3, suivi d'un `p`**) + `errors` ×2 enrichies (title, bad, good, why).
5. **Ton de rédaction** : français, professeur passionné qui explique **à l'oral**, **tutoiement**, exemples ancrés localement — Cotonou, Abomey-Calavi, marché Dantokpa, gari, Awa Mensah / Boutique Awa, zémidjan, MTN MoMo / Moov Money, tontine. **Jamais de placeholder.**
6. **Interdits typographiques** : aucun emoji, aucun CJK (U+3000+), aucun diacritique combinant (U+0300–036F). Tolérés uniquement : `✓`, `✗`, `→` (U+2192), `★`, les filets de boîte (`─│┌┐└┘├`), `·`, `°`, « », `—`, `…`.
7. **Chaînes JS** : single-quoted, apostrophes échappées `\'`, sauts de ligne `\n` littéraux. **Écrire les gros extraits par heredoc bash quoté (`<< 'EOF'`)** — JAMAIS dans des triple-quotes Python (Python mange les `\'` et casse le JS — déjà mordu).
8. **Icônes** : noms Material Symbols Rounded existants ; une fiche d'installation = icône `download`, niveau `Débutant`, première position du sommaire.
9. **Ajout d'un module** (voir Language.md) : `data-<id>.js` + `exo-<id>.js` + déclaration dans `index.html`, couleur `--c-<id>`/`.ic-<id>`/`.dot-<id>` dans `main.css`, `LANGS` dans `app.js`, `MODULE_ORDER` dans `exo-app.js`, entrée de sidebar.
10. **Après tout ajout de contenu** : mettre à jour les compteurs dans `index.html` (meta description), `README.md`, `Language.md` (le total 364 → 371 a dû être rattrapé une fois — ne pas l'oublier).

## 8. Git & dépôt GitHub

- **Distant** : `https://github.com/NiceMank/Easy-Learn.git` (privé), branche `main`. Historique : `be6cd11` Initial commit → `ef5a3e5` Easy Learn v1.0 → `fdcdb75` Fiches Installation & Configuration → *ce commit de sauvegarde*.
- **Le dossier `/home/user/devdocs` n'est PAS un repo Git.** Procédure établie (à réutiliser) : cloner le distant dans `/tmp/easy-learn` avec le token en URL `x-access-token:…` (jamais affiché : passer les sorties à `sed 's/[A-Za-z0-9_]\{20,\}/<TOKEN-MASQUE>/g'`), y copier le contenu de `devdocs/`, **scan anti-secret** (`grep -rlE "gh[pousr]_…|github_pat_…" --exclude-dir=.git .` doit répondre rien), `git add -A`, commit avec `git -c user.name="NiceMank" -c user.email="farelahdk@gmail.com" commit -m "…"`, `git push origin main`, vérification via l'API `repos/NiceMank/Easy-Learn/commits`, puis `rm -rf /tmp/easy-learn`.
- **Token** : dans `/home/user/uploads/Mon personnal Token Gittub farelahd.txt` (EN CLAIR — conseil déjà donné à l'utilisateur de le révoquer/régénérer ; ne JAMAIS le commité, l'afficher ou le copier ailleurs). Extraction : `grep -oE 'gh[pousr]_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+' <fichier> | head -1`.
- `.gitignore` (désormais DANS devdocs) : `.DS_Store`, `Thumbs.db`, `*.log`, `.vscode/`, `.idea/`, `node_modules/`, `dist/`, `build/`, `out/`, `.env`, `.env.*`, `*.local`, `vendor/`.

## 9. Problèmes connus / points d'attention

1. **28 fiches n'ont qu'une seule carte d'erreur** (`343/371 ≥ 2`) : ce sont des fiches d'origine antérieures au standard « errors × 2 ». Non bloquant ; candidat d'enrichissement futur.
2. **Deux caractères interdits subsistent dans le contenu d'origine** (hors périmètre des directives traitées, laissés volontairement) : un `⚠️` dans un commentaire de `data-tanstack.js` (bloc mutation) et un `🚀` dans `data-django.js` (fiche `jd-demarrage`). À nettoyer si on touche ces fiches.
3. **`/tmp` est vidé à chaque nouveau message utilisateur** et `node_modules` n'est jamais persisté → réinstaller jsdom avant tout test navigateur ; les sauvegardes `devdocs-backup-*` sont en `/home/user` (hors dépôt).
4. **Design/responsive non-testé sur vrais appareils** : tout est validé en jsdom + assertions statiques ; une passe manuelle navigateur reste souhaitable avant toute publication publique.
5. **Premium = démo** : quiconque vide le localStorage débloque le contenu — assumé et affiché dans le paywall ; un vrai verrou exige le backend documenté (non commencé, cf. section 1).

## 10. Prochaine étape prévue (ordre établi)

1. **À la reprise, demander confirmation à l'utilisateur** puis créer les 4 fiches **Installation & Configuration** manquantes — `php-installation`, `nd-installation`, `c-installation`, `java-installation` — en **première position** de leurs modules (mêmes gabarits que les 9 existantes : icône `download`, Débutant, prérequis/étapes commentées/fichiers générés/vérification/erreurs+ résolutions/différences OS/les deux h3 obligatoires/2 erreurs enrichies). Préfixes d'ids : `php-`, `nd-` (Node — pas `node-`), `c-`, `java-`.
2. TypeScript : décider si une fiche d'installation est utile au regard de `ts-tsc-config` (doublon partiel) — par défaut : **non**, ou la recentrer sur l'installation Node+tsc+`tsx`/IntelliSense VS Code.
3. HTML/CSS/JS : **aucune fiche d'installation** (navigateur suffit) — décision actée.
4. Après tout ajout : harnais complet au vert → compteurs (`index.html`, `README.md`, `Language.md`) → commit + push (section 8).

## 11. Pour une IA qui reprend le projet (mode d'emploi, 2 minutes)

1. Lire ce `PROGRESS.md` en entier.
2. Vérifier les faits sur disque : `node tests/census.js` puis `node tests/validate.js`.
3. Respecter les sections 7 (conventions) et 3 (état des modules) — ne pas renommer les clés de modules ni les préfixes d'ids.
4. Avant de coder un test navigateur : réinstaller jsdom dans `/tmp/nm` (section 6).
5. Avant de commiter : relancer les 5 harnais + scan anti-secret ; suivre la procédure Git de la section 8 avec le message détaillé en français.
