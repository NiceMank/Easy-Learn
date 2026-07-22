# Easy Learn — Documentation Interactive (style iOS)

Site de documentation personnelle pour **HTML, CSS, JavaScript, TypeScript, React JS, Tailwind CSS, PHP, Laravel, TanStack Query, Python, Flask, Django, Vue.js, React Native, Node.js & Express, Langage C et Java**, en pur HTML/CSS/JS vanilla, sans build ni dépendance (hors CDN des icônes Google Material Symbols Rounded). **371 fiches** au total.

## Lancer le site

Ouvre simplement `index.html` dans un navigateur — ou mieux, sers le dossier pour une expérience identique au déploiement :

```bash
cd devdocs
python3 -m http.server 8000     # puis http://localhost:8000
```

**Astuce interface** : la barre latérale défile (17 modules, ça dépasse !) et se **masque** via le bouton `left_panel_close` de la top bar — l'état est mémorisé (`localStorage` `dd-sidebar`).

## Architecture

```
devdocs/
├── index.html          # Coquille : sidebar (défilante + masquable), topbar, tab bar, overlay recherche
├── css/
│   └── main.css        # Design system complet (thèmes, composants, iOS feel)
└── js/
    ├── highlight.js    # Coloration syntaxique maison (zéro dépendance)
    ├── data-html.js    # ← CONTENU : 9 fiches HTML
    ├── data-css.js     # ← CONTENU : 12 fiches CSS
    ├── data-js.js      # ← CONTENU : 13 fiches JavaScript
    ├── data-typescript.js # ← CONTENU : 25 fiches TypeScript (accent bleu TS #3178C6)
    ├── data-tailwind.js# ← CONTENU : 15 fiches Tailwind CSS (accent cyan)
    ├── data-php.js     # ← CONTENU : 35 fiches PHP (accent violet PHP #777BB4)
    ├── data-laravel.js # ← CONTENU : 17 fiches Laravel (accent rouge brique)
    ├── data-react.js   # ← CONTENU : 20 fiches React JS (accent bleu ciel)
    ├── data-tanstack.js# ← CONTENU : 13 fiches TanStack Query (accent corail)
    ├── data-python.js  # ← CONTENU : 18 fiches Python (accent bleu Python)
    ├── data-flask.js   # ← CONTENU : 16 fiches Flask (accent anthracite)
    ├── data-django.js  # ← CONTENU : 19 fiches Django (accent vert forêt)
    ├── data-vue.js     # ← CONTENU : 28 fiches Vue.js 3 (accent vert émeraude)
    ├── data-reactnative.js # ← CONTENU : 23 fiches React Native (accent cyan/bleu clair #61DAFB)
    ├── data-node.js    # ← CONTENU : 29 fiches Node.js & Express (accent vert Node #339933/#5FA04E)
    ├── data-c.js       # ← CONTENU : 30 fiches Langage C C11/C17 (accent bleu acier #00599C)
    ├── data-java.js    # ← CONTENU : 42 fiches Java 17/21 (accent orange Java #ED8B00)
    └── app.js          # Routeur, vues, recherche, favoris, historique, thème
```

**Séparation stricte contenu / logique / présentation** : pour enrichir la doc, on ne touche QUE les fichiers `data-*.js`.

## Ajouter une fiche

Dans le `data-*.js` du langage, ajouter un objet dans le tableau `fiches` d'une catégorie :

```js
{
  id: 'css-pseudo-elements',        // unique, utilisé dans les URLs et "related"
  title: 'Pseudo-éléments',
  icon: 'water_drop',               // icône Material Symbols Rounded
  level: 'Intermédiaire',           // Débutant | Intermédiaire | Avancé
  tagline: 'Résumé d\'une ligne pour les cartes.',
  intro: 'Paragraphe d\'accroche. `code inline` entre backticks.',
  blocks: [ /* voir types ci-dessous */ ],
  errors: [
    { title: 'Piège', bad: '...code...', good: '...code...', why: 'Explication.' }
  ],
  related: ['css-syntaxe-selecteurs']  // ids de fiches liées ( tout langage )
}
```

### Types de blocs disponibles

| Type | Forme | Rendu |
|---|---|---|
| `p` | `{ t:'p', h:'texte…' }` | Paragraphe (backticks → code inline) |
| `h3` | `{ t:'h3', h:'Titre' }` | Intertitre avec liseré coloré |
| `ul` / `ol` | `{ t:'ul', items:[…] }` | Liste |
| `code` | `{ t:'code', lang:'js', label:'…', code:'…' }` | Bloc coloré + bouton copier |
| `callout` | `{ t:'callout', kind:'tip\|warn\|info', h:'…' }` | Encadré coloré |
| `table` | `{ t:'table', head:[…], rows:[[…]] }` | Tableau de référence |
| `demo` | `{ t:'demo', html:'…', height:150, caption:'…' }` | Démo réelle dans iframe sandboxée |

L'index de recherche, le temps de lecture, la navigation précédent/suivant et les compteurs se génèrent **automatiquement**.

> ⚠️ **Attention** : `title`, `tagline`, `intro` et les textes `h`/`items` sont injectés comme HTML de confiance (seul le contenu des backticks est échappé). Pour afficher une balise littérale (`<script setup>`, `<Transition>`…), écrire des **entités** (`&lt;script setup&gt;`) — une balise brute `script`/`style`/`title` avalerait tout le reste de la page.

## Fonctionnalités

- Recherche instantanée façon Spotlight (`Cmd/Ctrl + K`), titres + contenu, insensible aux accents
- Favoris & historique persistés en `localStorage`
- Mode clair/sombre persistant (accent par langage : orange HTML, bleu CSS, jaune JS, bleu TypeScript `#3178C6`, cyan Tailwind, rouge brique Laravel, bleu ciel React JS, corail TanStack, bleu Python, anthracite Flask, vert forêt Django, vert émeraude Vue.js, cyan/bleu clair React Native `#61DAFB`, vert Node `#339933`, bleu acier C `#00599C`, orange Java `#ED8B00`)
- Coloration syntaxique maison : HTML, CSS, JS, **TypeScript**, **C**, PHP, **Python**, **Java** (annotations, types usuels, appels de méthodes — le bloc Kotlin DSL du build.gradle en profite aussi), Bash — palette **Atom One Dark** officielle (fond `#282c34`, texte `#abb2bf`, jetons hue-1→6 `#56b6c2`→`#e6c07b`), identique en thème clair et sombre
- Fiches avec exemples copiables, erreurs fréquentes, notions liées, navigation préc./suiv.
- Filtre par niveau, démos live, responsive complet (tab bar iOS sur mobile)

## Module « Exercices Pratiques » (Premium)

Adossé à la documentation : **85 exercices répartis sur les 17 modules** (5 par module : 2 Fondamentaux, 2 Intermédiaires, 1 Projet réel), accessibles via l'onglet **Exercices** (`#/exercices`). Le **1er exercice Fondamentaux de chaque module est gratuit** (17 exercices), le reste est réservé au Premium **simulé**.

- **Parcours** : hub → page module → détail (énoncé structuré en étapes numérotées, contraintes, critères, indices progressifs, solution modèle commentée débloquée seulement après une vraie tentative, variantes, liens vers les fiches théoriques).
- **Design** : héros en dégradés sombres « Apple One », cartes teintées par la couleur de chaque langage, anneaux de progression façon Activité iOS, paliers Bronze/Argent/Or par module, micro-animations douces.
- **Correction** :
  - 6 modules **front** (HTML, CSS, JavaScript, React, Tailwind, Vue) : atelier de code intégré — éditeur coloré + aperçu live (côte à côte sur desktop) + **tests automatiques** exécutés dans une `<iframe>` sandboxée (`Test réussi ✓` / `Test échoué ✗`).
  - 11 modules **serveur** (TS, PHP, Laravel, TanStack, Python, Flask, Django, React Native, Node, C, Java) : **checklist d'auto-évaluation** (≥ 5 points à exécuter en local et à cocher honnêtement).
- **Verrouillage** : `js/premium.js` (isolé, remplaçable par un vrai backend sans toucher aux vues). Clés de **démonstration** : `DEVDOCS-PREMIUM-2026`, `AWA-MENTOR-2026` — « ce n'est pas un vrai paiement » (clé en `localStorage`).
- **Extensions documentées (non implémentées)** : backend Laravel (comptes + Sanctum) avec Stripe / FedaPay / MTN MoMo pour le vrai paiement, et API d'exécution de code type **Judge0** pour tester automatiquement les langages serveur.
- **Progression** : `localStorage` `dd-exo-progress-v1` (tentatives, indices utilisés, checklist, exercices réussis) ; thème dans `dd-theme` ; premium dans `dd-premium`.

```devdocs/
├── css/exo.css       # Design system du module (héros, cartes teintées, atelier, paywall)
├── js/premium.js     # Verrou Premium simulé + doc de l'extension Laravel/Stripe-FedaPay
├── js/exo-<mod>.js   # 17 fichiers de CONTENU (5 exercices chacun)
├── js/exo-runner.js  # Atelier : assemblage du document, injection des tests, postMessage
└── js/exo-app.js     # Vues (hub, module, détail, paywall), progression, événements
```

## Tests

Le contenu et l'application sont validés par des harnais Node (dans `/tmp`, recréables à volonté) :

- `validate.js` — 371 fiches sur 17 modules : IDs uniques, champs requis, blocs bien formés, liens `related` existants, highlighter non vide.
- `exocheck.js` — 85 exercices : structure complète (énoncé, contraintes, 3 indices, solution + explication, critères, variantes, liens vers des fiches réelles), 1 gratuit Fondamentaux par module, garde-fous anti-emoji/CJK.
- `exodom.js` — exécute les solutions des exercices front dans jsdom : 15/15 tests verts (15 autres skippés car ils exigent un CDN réseau).
- `smoke.js` — 113 assertions jsdom sur le site assemblé : section théorique (non-régression complète) + parcours Exercices (hub 17 cartes, verrouillage, paywall, activation par clé démo, checklist, solution après tentative, révocation).
- `smoke-design.js` — 44 assertions sur le design du module (héros colorés, familles de modules, filtre, atelier en deux colonnes, panneaux).
