# Audit pédagogique exhaustif — Easy Learn

**Date de l'audit :** 8 août 2026 (UTC)
**Révision auditée :** `f72a8ca3b0916515bc358cd5ffa707971f073870`
**Périmètre :** les 19 fichiers `js/data-*.js`, les 17 fichiers de contenu `js/exo-*.js`, ainsi que `js/exo-app.js` et `js/exo-runner.js` qui orchestrent les ateliers.

---

## 1. Verdict exécutif

### Conclusion sans concession

Easy Learn est aujourd'hui une **très bonne base de référence interactive**, riche, volontairement concrète et nettement au-dessus d'un simple catalogue de tutoriels. Elle n'est cependant **pas encore une formation autonome complète permettant à un débutant absolu de maîtriser totalement les 19 technologies sans aucune ressource extérieure**.

**Maturité pédagogique globale estimée : 7,3/10.**

Ce score ne récompense pas le volume brut. Il pondère :

- la continuité depuis zéro prérequis ;
- la couverture des notions indispensables et des cas limites ;
- la qualité d'explication et la posture d'enseignant ;
- la pratique, l'évaluation et la capacité à prouver une maîtrise.

### Ce qui est réellement réussi

- **407 fiches** chargées sans erreur dans les 19 modules ;
- **1 186 blocs de code**, **275 cartes `syntax`**, **22 schémas** et **14 démos** ;
- des analogies locales et mémorables : marché Dantokpa, tontine, gari, Boutique Awa, MoMo, zémidjan ;
- les chemins HTML/CSS/JavaScript, Laravel, Vue et Django sont particulièrement cohérents ;
- les contenus sécurité/erreurs sont plus sérieux que dans la plupart des cours d'introduction ;
- **835 cartes d'erreurs** ont bien les quatre champs `title`, `bad`, `good`, `why` ;
- **1 540 liens `related`**, tous résolus ;
- les 275 blocs `syntax` existants possèdent tous une légende non vide et structurée en paires `[token, explication]` ;
- les ateliers sont bien structurés : 34 fondamentaux, 34 intermédiaires, 17 projets ;
- la séparation DOM/checklist est honnête : le site ne prétend pas exécuter magiquement du PHP, du C ou de Java dans le navigateur.

### Les bloqueurs de l'objectif « 100 % autonome »

1. **C et Java sautent des fondations de langage** avant d'attaquer la mémoire JVM, les pointeurs, les collections et la concurrence.
2. **Aucun atelier Algorithmique ni Flutter**, alors que ces deux modules sont présents dans la documentation.
3. **55 ateliers serveur sont des checklists d'auto-évaluation** : aucun compilateur, interpréteur ou backend réel ne vérifie le travail de l'apprenant.
4. Le modèle de fiche ne contient **aucun champ explicite** de prérequis, objectifs mesurables, résultat attendu, durée, quiz ou checkpoint. La notion « maîtrisé » est donc déclarée par l'utilisateur, pas démontrée.
5. Le tutoiement n'est pas à 100 % : des traces de vouvoiement subsistent dans **19 fiches** (**22 occurrences** dans les textes pédagogiques), davantage si l'on compte les commentaires d'exemple.
6. Le standard éditorial est très inégal : seulement **154/407** fiches possèdent le h3 exact « Ce que les débutants comprennent mal » et **143/407** le h3 exact « Lien avec les notions déjà vues ».
7. `data-php.js` contient une série de textes visiblement corrompus ou fusionnés, dont **27 intros dupliquées** et un titre d'erreur qui expose `lang: 'php` dans le texte affiché.
8. Le dépôt ne permet pas de reproduire les tests tels quels : `npm test` échoue volontairement, les scripts pointent vers `/home/user/devdocs` au lieu du dépôt courant, et plusieurs compteurs sont périmés.

**Décision recommandée :** publier Easy Learn comme **documentation interactive avancée en cours de consolidation**, pas encore comme parcours certifiant ou promesse de maîtrise totale.

---

## 2. Inventaire quantitatif vérifié

### 2.1 Données pédagogiques

| Module | Fichier | Fiches | Cartes `syntax` | Cartes `errors` | Score /10 |
|---|---|---:|---:|---:|---:|
| Algorithmique | `data-algo.js` | 15 | 23 | 28 | **7,2** |
| HTML | `data-html.js` | 9 | 17 | 19 | **7,1** |
| CSS | `data-css.js` | 12 | 27 | 27 | **8,0** |
| JavaScript | `data-js.js` | 13 | 31 | 28 | **7,8** |
| Python | `data-python.js` | 18 | 20 | 38 | **7,7** |
| Java | `data-java.js` | 43 | 0 | 122 | **6,3** |
| Langage C | `data-c.js` | 31 | 0 | 52 | **6,4** |
| PHP | `data-php.js` | 36 | 38 | 72 | **7,8** |
| TypeScript | `data-typescript.js` | 25 | 26 | 50 | **7,6** |
| React JS | `data-react.js` | 21 | 0 | 42 | **7,5** |
| Vue.js | `data-vue.js` | 29 | 0 | 59 | **8,0** |
| Tailwind CSS | `data-tailwind.js` | 15 | 15 | 30 | **7,0** |
| TanStack Query | `data-tanstack.js` | 14 | 0 | 28 | **7,1** |
| Node.js & Express | `data-node.js` | 30 | 0 | 42 | **7,7** |
| Laravel | `data-laravel.js` | 19 | 78 | 38 | **8,1** |
| Flask | `data-flask.js` | 17 | 0 | 34 | **7,0** |
| Django | `data-django.js` | 20 | 0 | 40 | **8,0** |
| Flutter | `data-flutter.js` | 16 | 0 | 33 | **6,8** |
| React Native | `data-reactnative.js` | 24 | 0 | 53 | **7,2** |
| **Total** | **19 fichiers** | **407** | **275** | **835** | **7,3** |

**Observation importante :** dix modules utilisent exclusivement des blocs `code` sans carte `syntax` : C, Django, Flask, Flutter, Java, Node, React, React Native, TanStack Query et Vue. Cela ne constitue pas une erreur de structure, mais cela signifie qu'une grande partie du code n'est pas décortiquée token par token.

### 2.2 Cartes d'erreurs

- 407/407 fiches possèdent au moins une erreur ;
- 377 fiches possèdent au moins deux erreurs ;
- 30 fiches n'en possèdent qu'une :
  - Algorithmique : `algo-recherche`, `algo-recursion` ;
  - C : `c-compilation`, `c-structure-main`, `c-entetes`, `c-modificateurs`, `c-pointeurs-defense`, `c-tableaux`, `c-structures`, `c-packing`, `c-unions-enums`, `c-valgrind` ;
  - Node.js : `nd-single-thread`, `nd-event-loop`, `nd-npm-package-json`, `nd-npx-scripts`, `nd-fs`, `nd-path-os`, `nd-http-natif`, `nd-eventemitter`, `nd-streams-buffers`, `nd-express-bases`, `nd-req-res`, `nd-routing-methodes`, `nd-params-query-body`, `nd-express-router`, `nd-mw-integres`, `nd-mw-tiers`, `nd-sessions-vs-jwt`, `nd-orm`.

La forme est bonne : les 835 objets examinés contiennent bien un titre, un exemple `bad`, un exemple `good` et un `why` substantiel. Le manque est donc surtout **quantitatif et pédagogique**, pas syntaxique.

### 2.3 Ateliers pratiques

- **85 ateliers** au total ;
- **34 fondamentaux**, **34 intermédiaires**, **17 projets** ;
- **30 ateliers DOM** avec éditeur, aperçu et tests dans une iframe sandboxée ;
- **55 ateliers checklist** pour les langages nécessitant un environnement local ;
- **17 ateliers gratuits** ;
- **378 liens théorie → atelier**, tous résolus ;
- 17 modules ont cinq ateliers ; **Algorithmique et Flutter n'ont aucun fichier d'exercices**.

---

## 3. Méthode d'audit et état technique

### Contrôles exécutés

Le chargement direct des 19 fichiers `data-*.js` a réussi. Des copies temporaires des harnais ont été adaptées au chemin réel du dépôt et aux compteurs actuels :

| Contrôle | Résultat observé |
|---|---|
| Validation structurelle des fiches | **407 fiches, 0 lien `related` cassé : OK** |
| Scan des balises HTML brutes dans les champs Markdown | **0 balise brute : OK** |
| Navigation réelle dans les fiches | **427 pages, 407 pagers : OK** après correction du compteur Algorithmique |
| Ateliers | **85/85, dont 30 DOM et 55 checklist : OK** |
| Assertions de design | **24/24 : OK** |

### Ce qui échoue dans le dépôt sans adaptation

- `npm test` ne lance aucun test : le script est `echo "Error: no test specified" && exit 1`.
- `tests/validate.js`, `tests/census.js`, `tests/smoke.js`, `tests/render-html.js` et `tests/smoke-design.js` codent le chemin absolu `/home/user/devdocs`, inexistant dans ce checkout (`/home/user/Easy-Learn`).
- Les tests historiques attendent 371 ou 405 fiches, alors que les données chargées en comptent 407.
- `algo` contient 15 fiches, alors que plusieurs fichiers de documentation annoncent encore 13.
- `README.md` annonce 405 fiches, tandis que `PROGRESS.md` et les tests mélangent d'anciens états 371/405.

**Interprétation :** le contenu est globalement chargeable, mais l'outillage qualité n'est pas synchronisé avec le contenu réel. Une plateforme qui promet l'autonomie doit aussi permettre à son équipe de vérifier cette promesse avec une commande unique et fiable.

---

## 4. Audit transversal de la posture d'enseignant

### 4.1 Tutoiement

Le ton est majoritairement chaleureux et direct : `tu`, `ton`, `ta`, des consignes actives, et une volonté claire de parler comme un professeur devant un débutant.

La règle « tu à 100 % » n'est toutefois pas respectée. Les 19 fiches contenant du vouvoiement ou un impératif de vouvoiement dans le texte pédagogique sont :

```text
c/c-gcc-flags                 c/c-fichiers
css/css-syntaxe-selecteurs    django/jd-tests
flask/fk-templates             java/java-spring-ioc
java/java-spring-rest          laravel/lv-notions
laravel/lv-relations           laravel/lv-api-resources
python/py-contextmanagers      react/rx-evenements
rn/rn-installation             tailwind/tw-etats
tanstack/tq-installation       ts/ts-tuples-enums
ts/ts-record-returntype        vue/vue-installation
vue/vue-guards
```

On trouve notamment `vous protège`, `votre API`, `vos lectures`, `Ignorez`, `interdisez-vous` et `où vous êtes`. Les commentaires et chaînes d'exemple ajoutent d'autres occurrences (`Votre navigateur`, `votre commande`, etc.).

**Verdict :** posture bonne mais non conforme au critère strict. Il faut choisir une règle éditoriale : soit le contenu s'adresse toujours à `tu`, soit les citations et commentaires de code sont explicitement exclus du contrôle. Cette décision doit être automatisée par un lint textuel.

### 4.2 Analogies concrètes avant la théorie

C'est l'un des points forts du projet, mais pas de manière homogène.

**Très réussi :**

- Algorithmique : recette, carnet de tontine, casiers du marché, dictionnaire, poupées russes ;
- HTML : courrier/enveloppe, toile, plan d'un livre, formulaire comme point de contact ;
- PHP : consigne à bagages, douane, coffre-fort, transaction de stock ;
- Laravel : comptoir, aiguillage, oignon des middleware, facteur des queues ;
- React : parc à état, photo d'un rendu, filet de sécurité ;
- TypeScript : contrat, garde, formes discriminées ;
- Tailwind et Vue : design system, slots, composables, états d'interface.

**À renforcer :**

- C, Java et plusieurs fiches bas niveau commencent directement par une définition technique, sans étape sensorielle intermédiaire ;
- Flutter explique très bien le mécanisme mais utilise moins systématiquement une histoire concrète avant le code ;
- TanStack Query passe rapidement de `useQuery` au modèle cache/stale/fetching ;
- certaines fiches Flask, Django, Node et React Native supposent déjà que l'apprenant sait ce qu'est un serveur, un composant ou un état.

**Recommandation de gabarit :** ajouter dans chaque fiche une première section obligatoire `Analogie concrète`, suivie de `Ce que l'analogie ne couvre pas`, puis de la définition exacte. Cela empêchera les analogies décoratives qui introduisent une fausse intuition.

### 4.3 Cartes `syntax`

Les 275 cartes présentes sont bien formées :

- 275/275 ont une légende ;
- 275/275 ont des lignes à deux colonnes ;
- aucune légende n'est vide ;
- les descriptions sont explicatives, pas de simples traductions.

Les meilleurs exemples sont HTML, JavaScript, CSS, Algorithmique, PHP, TypeScript et les 78 cartes Laravel. Les légendes expliquent généralement le rôle, l'ordre, les guillemets, la sécurité ou le piège associé.

**Limite :** le critère demandé porte sur chaque bloc `syntax`, et ceux qui existent passent ce contrôle. Mais les modules code-only ont 0 carte `syntax`, donc une notion comme un pointeur C, une classe Java, un `useState`, un `Router` Vue ou un `useQuery` TanStack n'a pas de fiche canonique token par token. Il faut étendre le composant aux fondations des dix modules concernés, sans convertir mécaniquement les gros exemples de projet.

### 4.4 « Pièges et erreurs »

Le rendu est solide : les blocs `errors` opposent bien `bad` et `good`, et expliquent le pourquoi. Les erreurs sont souvent contextualisées, par exemple :

- `===` contre `==` en JavaScript/PHP ;
- `WHERE` oublié en SQL ;
- `free()` ou `realloc()` mal utilisés en C ;
- `useEffect` et closures périmées en React ;
- N+1 dans Laravel/Django ;
- variables d'environnement et secrets ;
- upload et XSS.

**Non-conformité restante :** 30 fiches n'ont qu'une carte. Même si le minimum de deux n'est pas explicitement codé dans le prompt, c'est le standard pédagogique le plus utile pour une fiche autonome : un piège de syntaxe et un piège de raisonnement, ou un piège local et un piège de production.

### 4.5 Standardisation éditoriale

Le projet semble avoir deux générations éditoriales :

- les fiches récentes/frontières possèdent les h3 standardisés et un bloc de liaison final ;
- une large partie de C, Java, Node, PHP, Django, Flask, React Native et Vue utilise d'autres titres ou aucun de ces h3.

Mesure exacte :

- h3 exact `Ce que les débutants comprennent mal` : **154/407** ;
- h3 exact `Lien avec les notions déjà vues` : **143/407** ;
- dernier h3 exactement égal au second : **141/407**.

Ce n'est pas un problème de navigation, mais c'est un problème de **contrat pédagogique et de testabilité**. Des variantes comme `Lien avec ce qu'on a déjà vu`, `Lien avec la suite` ou `Où tu as déjà croisé ces idées` sont humainement acceptables, mais elles empêchent un contrôle homogène et rendent le parcours moins prévisible.

### 4.6 Défauts éditoriaux bloquants repérés

#### Corruption de `data-php.js`

Le runtime montre des textes fusionnés : une première version se termine par un apostrophe, puis une seconde version est concaténée immédiatement. Les intros concernées sont :

```text
php-casting                 php-tableaux
php-fonctions               php-fonctions-avancees
php-fonctions-anonymes      php-superglobales
php-formulaires             php-validation
php-upload                  php-inclusion
php-poo-classes             php-poo-visibilite
php-poo-heritage             php-poo-interfaces-traits
php-erreurs                 php-exceptions-custom
php-sessions                 php-cookies
php-pdo                      php-requetes-preparees
php-crud                     php-mots-de-passe
php-xss                       php-csrf
php-composer                 php-api-rest
php-namespaces
```

Exemples visibles : `... rien ne se passe.' web (catalogue...)`, `... atteindre la prod.' PHP moderne...`, `... chacun dans le format qui lui convient.' que n'importe quel front...`.

Le titre de la première erreur de `php-casting` contient en plus `, lang: 'php`, qui est une fuite manifeste de syntaxe de données. `vue-slots` présente aussi une jonction de phrases avec `.. Une carte...`.

#### Incohérence factuelle PHP 8

Dans `php-casting`, le code affiche :

```php
in_array(0, ["a", "b"])               // true
in_array(0, ["a", "b"], true)         // false
```

Cette première affirmation correspond à l'ancien jonglage PHP 7 ; elle est fausse pour le comportement PHP 8 moderne présenté dans la même fiche. Il faut soit afficher la version, soit corriger le résultat et expliquer l'évolution.

#### Caractères typographiques hors convention

`data-php.js` contient des marqueurs qui contredisent la convention éditoriale du dépôt : **9 `⚠`, 2 `🤯` et 1 `✅`**. Dans une fiche technique, `Attention`, `Piège` ou `Incorrect` sont plus accessibles, plus cohérents avec le reste de l'interface et plus faciles à rechercher.

---

## 5. Audit détaillé module par module

Les « notions manquantes » ci-dessous sont celles qu'il faut ajouter pour soutenir la promesse « zéro prérequis → autonomie », pas une liste de tout ce que contiennent les documentations officielles.

### 5.1 Algorithmique — **7,2/10**

**Parcours actuel.** Le chemin va de l'algorithme et du pseudo-code aux variables, types, entrées/sorties, opérateurs, conditions, boucles, tableaux, fonctions et organigrammes, puis vers la lisibilité, la traduction Python/JavaScript, la recherche linéaire/dichotomique et la récursivité. La progression débutant est excellente jusqu'aux fonctions ; les deux fiches avancées sont une bonne extension récente.

**Sauts ou notions manquantes.**

- La notation Big-O apparaît au moment de comparer les recherches, mais il manque une vraie leçon préalable sur coût, mémoire, meilleur/pire cas et amortissement.
- Aucun module sur pile, file, liste chaînée, ensemble, dictionnaire, arbre, tas et graphe.
- Le tri à bulles est présenté, mais pas insertion, sélection, fusion, rapide, tas, stabilité et choix selon le contexte.
- Pas de preuve de correction, invariant de boucle, précondition/postcondition, terminaison ni raisonnement par cas limites.
- Pas de stratégie gloutonne, programmation dynamique, backtracking, parcours de graphe, plus court chemin ou union-find.
- La récursivité est intuitive, mais il manque la transformation récursif ↔ itératif, la consommation mémoire, le risque de profondeur et les critères de choix.
- Pas de fiche dédiée à la validation des entrées, aux jeux de tests et à la lecture d'une trace d'exécution complète comme compétence évaluée.

**Style et erreurs.** C'est le meilleur module pour l'analogie et l'oral. Les cartes `syntax` sont très bonnes. Deux fiches n'ont qu'une erreur. Il n'existe aucun atelier `exo-algo.js`.

**Ajout prioritaire.** Insérer `complexite`, `structures-de-donnees`, `tris-classiques`, `preuves-et-tests`, `glouton-dp-backtracking`, puis créer au moins cinq ateliers gradués de pseudo-code avec traces et cas limites.

### 5.2 HTML — **7,1/10**

**Parcours actuel.** Structure, texte, liens, listes, images/médias, tableaux, formulaires, sémantique et `<head>`. Le chemin est court mais bien dessiné, et les fiches expliquent souvent le sens avant l'apparence.

**Sauts ou notions manquantes.**

- Le débutant n'a pas de fiche distincte sur les outils du navigateur : inspecteur, DOM, validation HTML, console, réseau et lecture d'une erreur.
- Accessibilité très bien introduite mais pas complète : focus clavier, ordre de tabulation, skip link, messages d'erreur de formulaire, noms accessibles, tests avec lecteur d'écran, `aria-live` et usage de `aria` seulement quand le natif ne suffit pas.
- Manquent des éléments sémantiques utiles : `figure/figcaption`, `details/summary`, `dialog`, `time`, `address`, listes de définitions et `caption/scope/headers` approfondis pour les tableaux.
- SEO/métadonnées : canonical, robots, favicon, données structurées, sitemap, partage social complet et Content Security Policy sont seulement partiels ou absents.
- Les formulaires s'arrêtent à la validation native ; il faut relier clairement HTML à validation serveur, CSRF, erreurs persistantes et progressive enhancement.
- Pas de chapitre sur SVG inline, iframe sandboxée, web components ou stratégie de compatibilité.

**Style et erreurs.** Les analogies courrier, plan et toile sont excellentes. Les 9 fiches ont une carte `syntax` et deux erreurs, mais le h3 de liaison utilise surtout des formulations historiques et ne respecte pas le standard exact. Les cinq ateliers DOM couvrent bien structure, formulaire, tableau, accessibilité et projet ; leurs tests ne prouvent pas toute l'accessibilité réelle.

**Ajout prioritaire.** Ajouter `html-outils-et-validation`, `html-accessibilite-pratique`, `html-seo-securite`, puis un atelier qui exige clavier, focus, erreurs et inspection d'un formulaire.

### 5.3 CSS — **8,0/10**

**Parcours actuel.** Sélecteurs, cascade, unités, typographie, modèle de boîte, display, positionnement, Flexbox, Grid, responsive, transitions, animations, variables et thèmes. C'est le parcours le plus abouti parmi les modules courts.

**Sauts ou notions manquantes.**

- La mécanique du flux normal, le calcul des tailles et les containing blocks devraient être un checkpoint avant `position`, `z-index` et Grid avancé.
- Il manque les propriétés logiques (`margin-inline`, writing modes), `@supports`, nesting natif, `:has()`, style queries et une vraie stratégie de compatibilité navigateur.
- Architecture de projet : reset, cascade layers en pratique, BEM/CSS Modules, conventions de nommage, tokens multi-thèmes, extraction de composants et gestion de dette CSS.
- Accessibilité : focus-visible, contrastes, prefers-contrast, forced-colors, tailles de cible, motion sickness et formulaires natifs.
- Performance et production : chargement de polices, critical CSS, réduction, cache, print CSS, CSP et audit Lighthouse.

**Style et erreurs.** Analogies de file, axes et boîte très efficaces ; 27 cartes `syntax`, deux erreurs par fiche. Les ateliers sont les plus testables du dépôt, mais les tests automatiques ne peuvent pas certifier le rendu visuel ni le contraste sur tous les écrans.

**Ajout prioritaire.** Ajouter un parcours `flux-et-empilement`, `architecture-css`, `accessibilite-css` et une matrice de compatibilité/version.

### 5.4 JavaScript — **7,8/10**

**Parcours actuel.** Variables, types, contrôle, fonctions, tableaux, objets, ES6+, DOM, événements, fetch, asynchronisme et erreurs. La progression logique est solide et les notions modernes sont bien reliées aux fiches précédentes.

**Sauts ou notions manquantes.**

- `this`, prototypes, chaîne de prototypes, classes, itérateurs/générateurs et symboles sont trop courts pour quelqu'un qui doit comprendre le langage en profondeur.
- L'Event Loop est expliquée à travers l'asynchronisme, mais il manque une carte claire call stack, microtasks, macrotasks, rendu navigateur et starvation avant les patterns avancés.
- Pas de modules d'écosystème : npm, package.json, bundler, Vite, environnement Node, versions, import dynamique et publication.
- Pas de localStorage/sessionStorage/IndexedDB, Web Workers, WebSocket, Service Worker, notifications ou offline-first.
- Tests unitaires/intégration, lint/format, profiling, performance DOM, sécurité XSS/DOM clobbering et architecture d'application manquent.
- Validation accessible de formulaire et gestion d'état UI sont laissées aux frameworks sans pont explicite.

**Style et erreurs.** Les cartes syntaxiques sont nombreuses et claires ; les exemples sont concrets. Les cinq ateliers DOM sont bien gradués, mais il n'y a pas d'exercice Node ou de test unitaire JavaScript.

**Ajout prioritaire.** Ajouter `js-execution-model`, `js-prototypes-this`, `js-outils-tests`, `js-web-storage-workers` et un atelier testable par Vitest/Jest.

### 5.5 Python — **7,7/10**

**Parcours actuel.** Installation/REPL/script, modules/venv, bases, contrôle, chaînes, structures, compréhensions, fonctions, décorateurs, générateurs, context managers, typage, classes, fichiers, exceptions, packages, bibliothèque standard et pytest. C'est un parcours de langage assez riche.

**Sauts ou notions manquantes.**

- Le passage fonctions → décorateurs/générateurs/context managers est ambitieux ; une fiche intermédiaire sur fonctions d'ordre supérieur, itérateurs et protocoles rendrait le saut plus doux.
- Packaging moderne : `pyproject.toml`, wheels, environnements reproductibles, lockfiles, publication et séparation bibliothèque/application.
- Asyncio, tâches, threads/processus, concurrence, files de travail et règles de sécurité lors d'un appel réseau sont absents.
- Logging structuré, débogueur, profiling, exceptions dans une architecture et observabilité ne sont pas traités comme compétences autonomes.
- Typage : mypy/pyright, `Protocol`, `TypedDict`, `TypeGuard`, variance et limites runtime manquent.
- Tests : fixtures, paramétrage, mocks, couverture, tests d'API et CI manquent.
- Pas de CLI (`argparse`/Typer), dates/fuseaux robustes, SQL, HTTP ou gestion des secrets dans le module de langage.

**Style et erreurs.** Bon ton de professeur et exemples locaux ; une occurrence de vouvoiement à corriger dans `py-contextmanagers`. Cinq ateliers checklist sont pertinents, mais la correction est déclarative.

**Ajout prioritaire.** Ajouter `py-asyncio-concurrence`, `py-packaging-moderne`, `py-logging-debug`, `py-typing-outils` et une grille de tests pytest exécutable.

### 5.6 Java — **6,3/10**

**Parcours actuel.** Le module contient 43 fiches et couvre JVM, bytecode, GC, heap/stack, POO, interfaces, records, sealed classes, primitifs/wrappers, chaînes, collections, exceptions, generics, lambdas/streams/Optional, concurrence, I/O/NIO, sérialisation, Maven/Gradle, annotations et deux fiches Spring.

**Rupture majeure.** Le débutant voit l'architecture de la JVM et le bytecode avant d'avoir un parcours explicite sur variables, expressions, conditions, boucles, méthodes, tableaux, enums, packages et classes minimales. La fiche d'installation contient un Hello World, mais cela ne remplace pas une progression de langage. Le passage vers `encapsulation`/`heritage`, puis directement vers generics et concurrence, est trop brutal pour zéro prérequis.

**Notions manquantes.**

- Syntaxe élémentaire : variables, opérateurs, `if`, `switch`, boucles, méthodes, tableaux, varargs, packages/imports, enums et annotations de base ;
- `java.time`, regex, locale/Unicode, HTTP Client et JDBC ;
- test avec JUnit/Mockito, assertions, fixtures, couverture et CI ;
- logging structuré, configuration, secrets, sécurité, sérialisation JSON et validation ;
- transactions et accès BDD ;
- Spring Boot : création du projet, dépendances, configuration, tests, validation, service/repository, sécurité et déploiement ;
- distinction claire entre ce qui est garanti par le langage, la JVM, le JDK et une implémentation de GC.

**Style et erreurs.** Les analogies JVM/heap/collections sont bonnes, mais le code-only (0 `syntax`) ne fournit pas le décorticage token par token demandé. Les 43 fiches ont deux erreurs, et les cinq exercices sautent directement à la classe `Produit`, l'héritage et les streams.

**Ajout prioritaire.** Reclasser le module en trois étages : `java-syntaxe-de-zero`, `java-poo`, `java-runtime-et-outils`, puis seulement `fonctionnel`, `concurrence` et `spring`.

### 5.7 Langage C — **6,4/10**

**Parcours actuel.** Installation, compilation, flags, `main`, headers, types, modificateurs, représentation mémoire, pointeurs, stack/heap, allocation, tableaux/chaînes, structs/unions/enums, fonctions et callbacks, fichiers, préprocesseur, Valgrind/GDB, `argc/argv` et POSIX.

**Rupture majeure.** Le module traite rapidement du compilateur, de la mémoire et des pointeurs sans série identifiable sur variables, opérateurs, conditions, boucles et fonctions élémentaires. Un débutant peut compiler un Hello World puis rencontrer `void *`, `realloc`, `qsort`, padding et POSIX sans avoir construit la grammaire de base.

**Notions manquantes.**

- variables, expressions, conversions, `if`, `switch`, `for`, `while`, fonctions simples et portée ;
- tableaux 2D, chaînes et API standard introduits après les fondamentaux ;
- `make`/Makefile puis CMake, organisation multi-fichiers, compilation séparée et édition de liens en atelier ;
- UB, aliasing strict, conversions signées/non signées, alignement et règles de portabilité plus systématiques ;
- tests unitaires, fuzzing, sanitizers en profondeur, CI et analyse statique ;
- threads/C11 atomics, sockets, bibliothèques et différence POSIX/Windows ;
- pratiques de sécurité mémoire au-delà de Valgrind : ASan/UBSan/LSan, integer overflow et validation des entrées.

**Style et erreurs.** Les métaphores du couteau, du terrain mémoire et de la comptabilité sont mémorables. Il n'y a aucune carte `syntax`, et dix fiches n'ont qu'une erreur. Les cinq ateliers commencent par tableaux/structs puis qsort/fichiers/malloc : il manque au moins un atelier conditions-boucles-fonctions.

**Ajout prioritaire.** Ajouter un bloc de six fiches de grammaire C et un atelier compilable « caisse console », avant les pointeurs.

### 5.8 PHP — **7,8/10**

**Parcours actuel.** Installation, serveur local, variables/types/casting, tableaux, contrôle, fonctions, superglobales/formulaires/upload, inclusion, POO, erreurs/exceptions, sessions/cookies, PDO/CRUD, mots de passe, XSS, CSRF, Composer/PSR-4, API REST et namespaces. La couverture pratique est excellente sur les applications web classiques.

**Notions manquantes.**

- enums, attributes, property promotion/readonly en parcours explicite, itérateurs/générateurs, reflection, fibres et `DateTimeImmutable`/fuseaux ;
- PSR-12, PHPStan/Psalm, PHPUnit, architecture HTTP, injection de dépendances, services et séparation domaine/infrastructure ;
- transactions, isolation, index, verrouillage, pagination sûre et migrations de BDD approfondies ;
- authentification complète, rotation de session, rate limiting, headers, CSP, SSRF et gestion des secrets ;
- cache, files, jobs, logs, métriques, déploiement Apache/Nginx/PHP-FPM/containers ;
- API : pagination, validation de schéma, idempotence, CORS, authentification, versionnage et OpenAPI.

**Défauts bloquants.** 27 intros sont fusionnées avec une ancienne version, `php-casting` expose un fragment de structure dans le titre d'erreur, plusieurs phrases contiennent `sans error`, et le résultat de `in_array` est incohérent avec PHP 8. Une correction éditoriale et factuelle doit précéder toute publication.

**Style et erreurs.** Beaucoup d'analogies concrètes et 38 cartes syntaxiques. Les cinq ateliers sont cohérents mais restent checklist. Le module est volumineux ; une table de progression avec prérequis éviterait la sensation de catalogue.

**Ajout prioritaire.** Nettoyer entièrement les chaînes avant tout nouvel ajout, puis créer `php-tests-outils`, `php-architecture`, `php-modern-features` et `php-production`.

### 5.9 TypeScript — **7,6/10**

**Parcours actuel.** Pourquoi TypeScript, `tsc`, inférence, scalaires, tuples/enums, types spéciaux, interfaces/types, unions/discriminated unions, generics, contraintes, narrowing/type guards, classes, utility types, `Record`/`ReturnType`, `keyof`, conditional types, modules, `.d.ts`, décorateurs et DOM typé.

**Sauts ou notions manquantes.**

- Le module suppose JavaScript alors qu'il démarre par la théorie des types : il faut un sas « JavaScript indispensable » ou un test de positionnement.
- Fonctions TypeScript, paramètres optionnels, overloads, arrays/tuples, async/Promise, `unknown` dans les erreurs et `strictNullChecks` doivent précéder les types avancés.
- Structural typing, assignabilité, variance, `satisfies`, `as const`, module resolution et différences `target/module/lib` méritent un chapitre cohérent plutôt que des fragments.
- Le runtime ne valide rien : Zod/Valibot ou un pattern de validation des données externes est indispensable pour éviter l'illusion « typé = sûr ».
- Manquent build/test/lint, declaration packages, monorepo, API client, intégration Node/React/Vue et décorateurs selon la version réellement ciblée.

**Style et erreurs.** Les 26 cartes `syntax` sont parmi les plus didactiques. Le tutoiement doit être corrigé dans `ts-tuples-enums` et `ts-record-returntype`. Les cinq checklists sont intellectuellement pertinentes mais sans compilation automatisée sur la plateforme.

**Ajout prioritaire.** Introduire `ts-javascript-prerequis`, `ts-fonctions-async`, `ts-runtime-validation` et un atelier qui lance `tsc --noEmit` avec des cas de test négatifs.

### 5.10 React JS — **7,5/10**

**Parcours actuel.** Installation, concepts, composants/props, listes, événements, formulaires, state, état avancé, effets et pièges, cycle de vie, ref, reducer, contexte, hooks custom, patterns, composition, performance, portails/fragments, error boundaries et Server Components.

**Sauts ou notions manquantes.**

- Le cours doit expliciter les prérequis HTML/CSS/JavaScript, JSX et npm/Vite avant `useState` ; ils sont présents implicitement mais pas comme gate.
- Routing, architecture de projet, gestion des formulaires et validation, data fetching, cache, auth, tests RTL/Vitest, CI et accessibilité sont absents ou renvoyés à d'autres modules.
- Les Server Components sont une notion avancée dépendante d'un framework comme Next.js : il manque une fiche de contexte, installation, rendu serveur, cache et frontière client/serveur.
- Il faut traiter plus frontalement stale closures, transitions concurrentes, Suspense, streaming, hydration, sécurité XSS et erreurs asynchrones.
- Performance : `memo`/`useMemo` sont expliqués, mais profiling, virtualisation et coût réel des abstractions doivent être évalués sur un projet.

**Style et erreurs.** Très bonne pédagogie des hooks, analogies vivantes et 21 fiches à deux erreurs. Les 21 fiches utilisent des blocs code sans cartes `syntax`. Les cinq ateliers DOM sont bien testés, mais aucun n'évalue React Testing Library.

**Ajout prioritaire.** Ajouter une porte `JavaScript/JSX`, puis `react-outillage`, `react-router-formulaires`, `react-tests-accessibilite` et `react-ssr-framework`.

### 5.11 Vue.js — **8,0/10**

**Parcours actuel.** Installation, démarrage, SFC/Vite, `ref`/`reactive`, directives, script setup, props/emits, computed/watch, cycle de vie, composants, slots, v-model, validation, Router/guards, Pinia, HTTP, composables, transitions et tests. Le module est très complet pour Vue 3.

**Sauts ou notions manquantes.**

- JavaScript/HTML/CSS et l'outillage npm/Vite doivent être vérifiés explicitement avant les macros et la Composition API.
- SSR/Nuxt, hydration, SEO, server routes, gestion des secrets et déploiement sont absents.
- TypeScript dans les SFC, `defineProps` typé, `defineEmits`, `defineModel` et tests de types doivent être ajoutés.
- Accessibilité des composants, focus lors des transitions/router, gestion des erreurs réseau, annulation/races et cache restent insuffisants.
- Pinia : persistance, modules, devtools, séparation UI/domaine et tests manquent ; performance et découpage de bundle aussi.
- `v-html` est traité côté XSS, mais CSP, sanitization et frontières de confiance devraient être regroupées.

**Style et erreurs.** Très bonne couverture et beaucoup de références croisées. Comme React, les 29 fiches sont code-only sans `syntax`. `vue-slots` contient un texte fusionné (`.. Une carte...`) et `vue-installation`/`vue-guards` contiennent du vouvoiement.

**Ajout prioritaire.** Créer un parcours Vue « application production » : tests/accessibilité, TypeScript, SSR/Nuxt, auth/HTTP et déploiement.

### 5.12 Tailwind CSS — **7,0/10**

**Parcours actuel.** Installation, thème, layout, spacing, flex/grid, typographie, couleurs/opacité, responsive, états, dark mode, animations, directives, plugins et bonnes pratiques.

**Sauts ou notions manquantes.**

- La fiche principale enseigne d'abord le workflow Tailwind v3 (`tailwind.config.js`, `@tailwind base/components/utilities`, `npx tailwindcss init`), puis ajoute une note Tailwind v4. Pour un débutant en 2026, le choix de version doit être explicite et suivi de bout en bout.
- Il faut un chemin Vite/PostCSS/CLI v4, détection de fichiers, migration v3→v4 et explication de `@theme`/`@import`.
- Le module présuppose CSS/HTML sans checkpoint ; il manque cascade, specificity et limites des utilitaires.
- Accessibilité, design tokens multi-thèmes, extraction de composants, composition de classes, variantes complexes, container queries et stratégie de classes dynamiques doivent être approfondis.
- Performance, CI, purge/détection dynamique et compatibilité avec bibliothèques de composants manquent.

**Style et erreurs.** Les 15 cartes syntaxiques sont utiles et les exemples sont cohérents. Le tutoiement est à corriger dans `tw-etats`. Les cinq ateliers DOM couvrent bien les primitives et un dashboard, mais aucun n'évalue le build Tailwind réel.

**Ajout prioritaire.** Versionner le module (`v3` ou `v4`), faire du chemin moderne le chemin principal et ajouter un atelier CLI/Vite qui vérifie le CSS généré.

### 5.13 TanStack Query — **7,1/10**

**Parcours actuel.** Installation, concepts, `useQuery`, états, cache, erreurs, mutations, invalidation, optimisme, queries dépendantes/parallèles, pagination, Devtools et patterns.

**Sauts ou notions manquantes.**

- Le module suppose React, JavaScript/TypeScript, HTTP et une API fonctionnelle ; aucun test de prérequis ni mini-rappel progressif n'est prévu.
- Version v5 et conventions doivent être affichées explicitement : `isPending`, `gcTime`, `staleTime`, `queryOptions`, `select`, `placeholderData` et changements entre versions.
- SSR/hydration, Next.js, persistance, offline-first, network mode, annulation, garbage collection et synchronisation entre onglets manquent.
- Authentification, 401/403, retry par méthode HTTP, error boundaries, Suspense, tests avec MSW et invalidation après mutation complexe doivent être traités.
- Le projet de fin utilise un backend local, mais aucun environnement reproductible ni test de cache réel n'est fourni par la plateforme.

**Style et erreurs.** Bonne analogie des deux vies d'une query, mais l'installation contient du vouvoiement et les 14 fiches sont code-only. Les cinq checklists sont pertinentes mais l'apprenant doit fournir lui-même json-server et son environnement.

**Ajout prioritaire.** Ajouter un mini-module de prérequis HTTP/React, une fiche versionnée TanStack Query v5 et un atelier MSW/React Test avec assertions cache et rollback.

### 5.14 Node.js & Express — **7,7/10**

**Parcours actuel.** Installation, thread unique/Event Loop, blocage, npm/modules, fs/path/http/events/streams, Express, requête/réponse, routing, middlewares, erreurs async, sessions/JWT/bcrypt, uploads, variables d'environnement, BDD/ORM, PM2 et déploiement.

**Sauts ou notions manquantes.**

- JavaScript moderne, Promises et modules devraient être un prérequis explicite avant l'Event Loop et Express.
- Tests `node:test`/Jest/Supertest, validation de schéma, migrations, transactions et isolation BDD manquent.
- Sécurité : CSRF, SSRF, prototype pollution, rate limiting, cookies, headers, CORS par cas d'usage, injection de logs et gestion des secrets doivent être un parcours complet.
- WebSocket/SSE, worker threads, cluster, files d'attente, cache Redis, observabilité, tracing, health/readiness checks et graceful shutdown testé manquent.
- TypeScript, Docker/CI/CD, versionnement API, OpenAPI et contrats de données doivent être ajoutés pour l'autonomie professionnelle.

**Style et erreurs.** Les concepts event loop/streams sont bien illustrés, mais 18 fiches n'ont qu'une erreur et aucune carte `syntax`. Les cinq ateliers sont une bonne progression HTTP natif → Express → API, mais ne testent pas réellement les endpoints dans la plateforme.

**Ajout prioritaire.** Ajouter un parcours tests/sécurité/observabilité et un runner backend isolé ou une procédure curl avec résultats attendus.

### 5.15 Laravel — **8,1/10**

**Parcours actuel.** Notions web/terminal/BDD, installation, structure/artisan, configuration, routing, contrôleurs, middleware, Blade, validation, erreurs, migrations, Eloquent, relations, auth Breeze/Sanctum, autorisation, événements, queues, API Resources et Pest/PHPUnit.

**Forces.** C'est le module qui se rapproche le plus d'un parcours framework professionnel : chaque notion est séparée, reliée à la précédente, souvent munie d'une carte `syntax`, d'un diagramme ou d'une erreur ciblée. La sécurité et la discipline d'architecture sont visibles dès le début.

**Notions manquantes.**

- conteneur de services, providers, bindings, facades et cycle de résolution ;
- filesystem/storage, mail, notifications, scheduling, broadcasting et websockets ;
- cache/Redis, locks, rate limiting et stratégies de queue en production ;
- factories/seeders avancés, transactions, concurrence, pagination API, OpenAPI et versionnage ;
- Vite, Inertia/Livewire ou intégration frontend moderne ;
- observabilité, Telescope, logs structurés, health checks, Docker/CI/CD et déploiement horizontal ;
- autorisation multi-tenant, sécurité des tokens Sanctum et rotation/révocation.

**Style et erreurs.** Très bon usage des analogies et des cartes token par token. `lv-notions` utilise un h3 de liaison différent ; les 19 fiches ont bien deux cartes d'erreur, mais la standardisation des h3 reste incomplète.

**Ajout prioritaire.** `lv-container-providers`, `lv-cache-storage-notifications`, `lv-production-observability`, puis un projet de fin réellement testable par API.

### 5.16 Flask — **7,0/10**

**Parcours actuel.** Installation, première application, routes/requêtes, statiques, contextes, Jinja, héritage, sessions, SQLAlchemy, formulaires, configuration, blueprints/factory, erreurs, extensions, API REST et WSGI/déploiement.

**Sauts ou notions manquantes.**

- Le contexte Flask est classé avancé très tôt ; il faut d'abord une petite application avec factory, tests et cycle request/response avant `g`/`current_app`.
- Authentification/autorisation, CSRF, headers, rate limiting, validation de schéma et protection des uploads sont absents ou dispersés.
- Migrations Alembic/Flask-Migrate, transactions, relations, pagination et N+1 sont insuffisants.
- Tests Flask, fixtures, client de test, coverage, logging et débogage devraient avoir une fiche dédiée.
- Async, tâches de fond, cache, mail, CLI, OpenAPI, Docker, Gunicorn/Nginx et supervision sont à compléter.

**Style et erreurs.** Les bases Jinja et le pattern PRG sont bien expliqués ; `fk-templates` contient un vouvoiement. Aucune carte `syntax`; les cinq ateliers checklist sont bons mais nécessitent un environnement et curl à l'extérieur.

**Ajout prioritaire.** Ajouter `fk-tests`, `fk-securite`, `fk-bdd-migrations`, `fk-taches-cache` et une procédure de déploiement reproductible.

### 5.17 Django — **8,0/10**

**Parcours actuel.** Installation, projet/apps/settings, URLs, FBV/CBV, templates, modèles/ORM/migrations, formulaires, admin, auth/permissions, statiques/médias, middleware, erreurs, DRF, tests et déploiement.

**Forces.** Le socle est très complet pour un framework web : le chemin modèle → migration → formulaire → admin → auth → API → test est intelligible et les sujets N+1, custom User et DEBUG sont bien signalés.

**Notions manquantes.**

- ASGI, async views, Channels/websockets et distinction WSGI/ASGI ;
- cache, sessions avancées, emails, tâches Celery/RQ, signals et transactions ;
- index/contraintes/`select_for_update`, concurrence et isolation BDD ;
- DRF complet : permissions, auth token/JWT, pagination, filtres, throttling, versionnage et OpenAPI ;
- tests pytest, fixtures/factories, couverture, CI et tests de sécurité ;
- Docker, secrets, observabilité, static/media/CDN et déploiement réellement exécutable.

**Style et erreurs.** Très bon parcours, mais les 20 fiches sont code-only et la standardisation h3 n'est pas appliquée. `jd-tests` contient du vouvoiement. Les cinq checklists sont cohérentes, mais la plateforme ne lance pas Django.

**Ajout prioritaire.** Une fiche production/sécurité/async et un parcours API+tests reproductible suffiraient à faire passer le module au-dessus de 8,5.

### 5.18 Flutter — **6,8/10**

**Parcours actuel.** Installation, Dart bases/POO, widgets, layout, `setState`, Provider, navigation, formulaires, réseau/FutureBuilder, listes, thème, lifecycle, assets, widget tests et build.

**Sauts ou notions manquantes.**

- Dart mérite contrôle-flow, collections, `Future`, `Stream`, async/await, isolates et erreurs avant de devenir seulement un préambule à Flutter.
- Provider est présenté comme gestionnaire recommandé sans comparaison structurée avec Riverpod, Bloc/Cubit et architecture unidirectionnelle.
- Persistance locale, secure storage, auth, offline, cache, pagination et gestion d'erreurs réseau manquent.
- Accessibilité, responsive/adaptive layout, orientation, i18n/l10n, thèmes dynamiques et tests golden/integration manquent.
- Platform channels, permissions, notifications, deep links, lifecycle applicatif, profiling et memory leaks manquent.
- Signing Android/iOS, flavors, CI/CD, stores, crash reporting et mises à jour sont seulement survolés.

**Style et erreurs.** Les explications de contraintes de layout et de lifecycle sont bonnes, mais les analogies et cartes syntaxiques sont moins systématiques. Il n'existe aucun `exo-flutter.js`, donc aucun projet guidé ne confirme ces notions.

**Ajout prioritaire.** Ajouter cinq ateliers Flutter (counter, formulaire, liste, API, projet) et une fiche architecture/performance/release.

### 5.19 React Native — **7,2/10**

**Parcours actuel.** Installation, Expo/bare, exécution, composants/interactions, styles/Flexbox, FlatList, navigation, état/contexte, réseau/AsyncStorage, plateforme, animations/gestes, permissions, formulaires, debugging et build.

**Sauts ou notions manquantes.**

- React et JavaScript sont des prérequis non vérifiés ; l'apprenant peut entrer dans RN sans comprendre hooks, JSX, rendu et immutabilité.
- AsyncStorage n'est pas un coffre sécurisé : il faut secure storage, gestion des tokens, auth, biométrie, chiffrement et menaces mobiles.
- Deep linking, push notifications, offline/synchronisation, background tasks, AppState et erreurs réseau doivent être ajoutés.
- Accessibilité native, tailles de texte, VoiceOver/TalkBack, tests Jest/React Native Testing Library/Detox et mocks manquent.
- Native modules, TurboModules/Fabric, permissions par OS, build signing, flavors, CI/CD, stores, OTA et crash analytics sont incomplets.
- Performance : profiling JS/UI thread, images, listes, mémoire et re-renders doivent être mesurés.

**Style et erreurs.** Le chemin mobile est riche et les checklists sont concrètes ; l'installation contient du vouvoiement. Les 24 fiches sont code-only, sans cartes `syntax`, et les cinq ateliers checklist ne lancent pas d'émulateur ni de tests.

**Ajout prioritaire.** Créer un gate React/JS, puis cinq ateliers exécutables ou enregistrés par vidéo/trace attendue, avec un vrai chapitre sécurité et release mobile.

---

## 6. Audit exhaustif des fichiers d'exercices

### 6.1 Contrat structurel

Tous les 85 exercices chargés respectent le schéma attendu : identifiant, titre, niveau, contexte, énoncé, contraintes, critères, indices, solution et variantes. Les ateliers checklist possèdent au moins une checklist ; les DOM possèdent un panneau éditable et des tests fonctionnels.

Le découpage est pédagogique sur le papier : deux fondamentaux, deux intermédiaires et un projet par module. La progression est cependant une progression de **sujets**, pas toujours de **preuves de compétence** : le bouton « terminé » et les checkboxes ne démontrent pas que le code compile, répond correctement, respecte la sécurité ou résiste aux cas limites.

### 6.2 Couverture de chaque fichier

| Fichier | Les cinq exercices couvrent | Verdict d'audit |
|---|---|---|
| `exo-c.js` | tableaux, `struct`, `qsort`, CSV, `malloc`/binaire/Valgrind | Bon niveau intermédiaire, mais aucun exercice syntaxe de base avant tableaux/pointeurs. |
| `exo-css.js` | carte, boutons, Grid responsive, variables/thème, dashboard | Très bon atelier visuel ; ajouter contraste/focus et compatibilité. |
| `exo-django.js` | première vue, modèle/admin, CBV, ModelForm, projet auth/tests | Parcours cohérent, mais aucune exécution dans la plateforme. |
| `exo-flask.js` | routes, formulaire/Jinja, CRUD SQLite, API, sessions/tests | Bonne progression ; compléter sécurité, tests automatisés et migrations. |
| `exo-html.js` | fiche sémantique, formulaire, tableau, accessibilité, site | Meilleur ensemble pour débutant ; l'audit a11y doit aller au-delà du DOM. |
| `exo-java.js` | classe, héritage, Map/streams, exceptions, Maven/tests | Trop haut pour zéro prérequis Java ; ajouter un atelier variables/boucles. |
| `exo-js.js` | compteur DOM, validation MoMo, liste, tontine, caisse | Bonne progression front ; pas de tests unitaires ni async/API. |
| `exo-laravel.js` | page, pagination Eloquent, CRUD FormRequest, relations, API | Très cohérent ; ajouter auth/queues/production et tests exécutés. |
| `exo-node.js` | HTTP natif, Express, CRUD, fichier, API architecturée | Bonne synthèse ; l'auto-évaluation ne teste pas les endpoints. |
| `exo-php.js` | fonctions, formulaire, session, PDO préparé, mini-boutique | Bon fil rouge ; ajouter PHPUnit, headers/sécurité et transactions testées. |
| `exo-python.js` | caisse, fichier/texte, classe, CSV, CLI/persistance/tests | Bon fil rouge métier ; manque asyncio/packaging et runner pytest. |
| `exo-react.js` | `useState`, props/listes, formulaire, `useEffect`, kiosque | Bonne progression hooks ; ajouter tests RTL et accessibilité. |
| `exo-rn.js` | écran, FlatList, navigation, formulaire/bon, application complète | Pertinent mais entièrement checklist et sans émulateur. |
| `exo-tailwind.js` | utilitaires, navigation, formulaire, dark mode, dashboard | Bon apprentissage visuel ; ne prouve pas le build ni la version v4. |
| `exo-tanstack.js` | `useQuery`, queryKey dépendante, mutation, optimistic update, boutique | Très bon scénario cache ; manque MSW/SSR/offline et exécution réelle. |
| `exo-ts.js` | interface, union API, générique, utility types, moteur de commandes | Excellent ciblage type-system ; il faut compiler automatiquement les solutions/cas négatifs. |
| `exo-vue.js` | compteur, liste, computed, composant/props/emit, carnet tontine | Très bon atelier DOM ; ajouter tests Vitest et router/Pinia production. |

### 6.3 Gaps d'exercices globaux

- `algo` et `flutter` sont absents : **2/19 modules non pratiqués**.
- Les 30 exercices DOM couvrent six modules front ; les 11 autres modules ont 55 checklists. Il n'y a aucune exécution de C, Java, Python, PHP, Laravel, Django, Flask, Node, TS, RN ou TanStack.
- Une checklist ne vérifie ni la sortie, ni les tests, ni les erreurs, ni la sécurité. Elle convient à une première version premium, pas à une promesse d'autonomie complète.
- Les solutions sont disponibles après tentative dans l'interface, mais l'apprenant peut cocher sans preuve. Il faut distinguer `terminé`, `tests passés`, `revue demandée` et `maîtrisé`.
- Les ateliers ne possèdent pas tous un jeu explicite de cas limites, sortie attendue, barème et critères de qualité non fonctionnels.
- Il manque des ateliers de refactoring, debugging guidé, lecture de code existant, tests écrits d'abord, sécurité et déploiement.

### 6.4 Architecture des exercices

`exo-app.js` et `exo-runner.js` sont correctement séparés du contenu. Le runner sandboxe le DOM et remonte les résultats par `postMessage`, ce qui est une bonne décision de sécurité pour les ateliers navigateur.

Pour les ateliers serveur, le prochain niveau doit être un worker isolé, limité en CPU/mémoire/réseau, avec compilation/exécution contrôlée et version de langage déclarée. À défaut, la plateforme doit afficher explicitement : **« auto-évaluation guidée, non corrigée automatiquement »** et fournir une procédure de vérification reproductible.

---

## 7. Liste consolidée des notions prioritaires manquantes

| Priorité | Ajout transversal | Modules principalement concernés |
|---|---|---|
| P0 | Fondations de grammaire avant concepts avancés | C, Java, puis React/RN/Node/TS/frameworks |
| P0 | Prérequis explicites et test de positionnement | Tous ; particulièrement React, Vue, RN, TS, TanStack, Laravel, Flask, Django |
| P0 | Exercices Algorithmique et Flutter | Algorithmique, Flutter |
| P0 | Correction des textes fusionnés et de l'incohérence PHP 8 | PHP, Vue |
| P0 | Tests réellement lançables depuis `npm test` | Dépôt entier |
| P1 | Objectifs observables, prérequis, durée, checkpoint, résultat attendu | Tous les `data-*.js` |
| P1 | Tests, debugging, logging, profiling, CI/CD | Tous les langages serveur et Java/C/Python/JS |
| P1 | Sécurité systématique : secrets, auth, CSRF/XSS, validation, rate limiting, SSRF, uploads | Tous les modules web/mobile |
| P1 | Accessibilité et UX inclusive | HTML, CSS, JS, React, Vue, Tailwind, Flutter, RN |
| P1 | Production : déploiement, observabilité, cache, migrations, rollback | Laravel, Django, Flask, Node, PHP, Java, Python, Flutter, RN |
| P1 | Cartes syntaxiques canoniques | C, Django, Flask, Flutter, Java, Node, React, RN, TanStack, Vue |
| P2 | Versionnement exact et chemins modernes | Tailwind v3/v4, React, Vue, Django, Laravel, Node, PHP, Java, Flutter |
| P2 | Spaced repetition, quiz et diagnostics | Tous les modules |

---

## 8. Plan d'action recommandé

### Lot 1 — Bloquants avant toute communication « autonome »

1. Nettoyer les 27 intros PHP fusionnées, le titre d'erreur `php-casting`, le texte `vue-slots`, les fautes `sans error` et les caractères hors convention.
2. Corriger le cas `in_array` selon PHP 8 et marquer chaque exemple dépendant d'une version.
3. Rendre les tests portables : `ROOT = path.resolve(__dirname, '..')`, compteurs calculés depuis les données, et script `npm test` qui lance les contrôles.
4. Synchroniser `README.md`, `PROGRESS.md`, `Language.md`, les commentaires HTML et les tests sur **19 modules / 407 fiches / 85 ateliers**.
5. Ajouter les fiches fondamentales C et Java avant les fiches avancées.
6. Ajouter `exo-algo.js` et `exo-flutter.js`.

### Lot 2 — Contrat pédagogique de chaque fiche

Ajouter au schéma :

```js
{
  prerequisites: ['...'],
  objectives: ['À la fin, tu sais ...'],
  analogy: 'Image concrète avant la définition',
  blocks: [...],
  checkpoint: {
    questions: [...],
    expected: '...'
  },
  practice: ['exo-id'],
  estimatedMinutes: 20
}
```

Puis imposer par validation :

- une analogie ou une justification de son absence ;
- un objectif observable ;
- un exemple minimal ;
- un cas nominal et deux cas limites ;
- deux erreurs au minimum ;
- un lien de retour vers un prérequis et un lien vers la suite ;
- une question de vérification sans regarder la solution.

### Lot 3 — Parcours et évaluation

- Construire un **graphe de prérequis** plutôt que des liens `related` uniquement décoratifs.
- Bloquer ou recommander les modules : JS avant React/Vue/Node/TS ; Python avant Flask/Django ; PHP avant Laravel ; React avant RN/TanStack ; HTML/CSS avant Tailwind.
- Ajouter des mini-quiz de rappel, des exercices de prédiction de sortie et des corrections d'erreurs.
- Exécuter `tsc`, Python/pytest, Java/Maven, C/GCC, PHP/PHPUnit et les serveurs dans des workers isolés, ou afficher clairement la limite de l'auto-évaluation.
- Remplacer le simple statut `maîtrisé` par : `vu`, `expliqué`, `tenté`, `tests passés`, `réutilisé dans un projet`.

### Lot 4 — Qualité éditoriale continue

- Linter le tutoiement et interdire les transitions `vous/votre/vos` hors citations signalées.
- Linter les caractères interdits et les chaînes de structure (`lang:`, `bad:`, `why:`) qui fuient dans le texte.
- Ajouter une vérification de duplication de phrases dans `intro`, `tagline` et `h3`.
- Versionner les syntaxes et commandes : `PHP 8.2+`, `Java 21`, `Node 22 LTS`, `Django 5.x`, `Laravel 11/12`, `Tailwind 4`, etc., avec une fiche migration quand nécessaire.
- Faire relire les explications factuelles sensibles : mémoire C, concurrence Java, sécurité web, cache TanStack, SSR et mobile.

---

## 9. Critères de sortie pour atteindre 9/10 puis 10/10

### Seuil 9/10

- 19 modules avec parcours débutant complet et prérequis visibles ;
- 407 fiches normalisées ou justifiées ;
- 2 erreurs minimum par fiche ;
- 100 % tutoiement hors citations/code ;
- chaque notion fondamentale possède une analogie, un exemple minimal, un piège et un checkpoint ;
- ateliers Algorithmique et Flutter ajoutés ;
- tous les tests passent depuis un clone propre avec `npm test` ;
- version des outils et commandes figée ;
- sécurité/accessibilité/tests couverts dans chaque parcours web/mobile.

### Seuil 10/10

- l'apprenant est diagnostiqué, orienté et bloqué sur les prérequis manquants ;
- chaque objectif peut être prouvé par une question, une sortie ou un test ;
- les 85+ ateliers ont une correction objective ou une grille observable ;
- un backend d'exécution isolé couvre les langages serveur ;
- les projets finaux incluent tests, sécurité, documentation, déploiement, observabilité et maintenance ;
- un processus de veille/versioning empêche les exemples obsolètes ;
- des essais utilisateurs auprès de vrais débutants confirment qu'ils peuvent terminer un parcours sans documentation externe.

---

## Conclusion

Easy Learn possède déjà la matière d'un excellent **manuel interactif francophone**, avec une vraie voix pédagogique et un effort remarquable de contextualisation. Son principal problème n'est pas le manque de contenu : c'est l'absence d'un **système de progression et de preuve de maîtrise**, aggravée par quelques ruptures de fondations, l'absence d'ateliers pour deux modules, des checklists non exécutées et des incohérences éditoriales/techniques mesurables.

La priorité n'est donc pas d'ajouter indistinctement des fiches. Il faut d'abord :

1. réparer et fiabiliser le contenu existant ;
2. poser les fondations manquantes de C et Java ;
3. rendre les prérequis, objectifs et évaluations explicites ;
4. compléter Algorithmique et Flutter côté pratique ;
5. automatiser la vérification réelle ;
6. seulement ensuite élargir la couverture avancée.

À l'issue de ces lots, la plateforme pourra raisonnablement revendiquer une autonomie forte. Dans son état audité ici, la formulation honnête est : **« une documentation interactive très riche, capable d'accompagner sérieusement un débutant, mais qui ne garantit pas encore une maîtrise totale sans ressources externes. »**
