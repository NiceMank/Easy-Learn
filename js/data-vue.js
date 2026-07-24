/* ============================================================
   data-vue.js — Contenu pédagogique Vue.js (Vue 3, module complet)
   Couvre : démarrage (createApp), SFC, Vite, réactivité (ref /
   reactive + pièges), directives (v-if, v-for, v-bind, v-on,
   v-model, v-html), Options vs Composition API, <script setup>,
   props & emits, computed & watchers, cycle de vie, composants &
   slots, formulaires & validation, Vue Router & guards, Pinia,
   requêtes HTTP, composables, transitions, tests (Vitest).
   Même contrat de données (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.vue = {
  id: 'vue',
  name: 'Vue.js',
  icon: 'change_history',
  tagline: 'Le framework JavaScript progressif : réactivité fine, composants monofichier, router, Pinia — Vue 3 et la Composition API de bout en bout.',
  heroTitle: 'Vue 3, du premier {{ message }} aux applications ambitieuses',

  categories: [
    /* ======================================================
       1. FONDAMENTAUX
       ====================================================== */
    {
      id: 'fondamentaux',
      name: 'Fondamentaux',
      icon: 'rocket_launch',
      fiches: [
        {
          id: 'vue-installation',
          title: 'Installation & configuration',
          icon: 'download',
          level: 'Débutant',
          tagline: 'npm create vue@latest : le gabarit officiel, ses questions, et le serveur Vite prêt à coder.',
          intro: 'Vue se laisse essayer en une balise `script` (le CDN de la fiche suivante le prouve) — mais un vrai projet Vue, avec ses composants en fichiers `.vue`, exige le même atelier que React : Node, un bundler (Vite), un serveur de dev. La bonne nouvelle : c\'est EXACTEMENT le même geste, `npm create vue@latest` au lieu de `create vite` — et l\'assistant te pose quelques questions qui méritent d\'être comprises plutôt que validées au hasard.',
          blocks: [
            { t: 'h3', h: 'Pourquoi un gabarit officiel (et pas un .vue écrit à la main) ?' },
            { t: 'p', h: 'Un composant Vue moderne vit dans un fichier `.vue` (template + script + style dans UN seul fichier — tu adoreras cette fiche SFC) — mais aucun navigateur ne lit les `.vue` : il faut un atelier qui les compile en JS. `npm create vue@latest` est le gabarit officiel : il prépare Vite (le compilateur/serveur), le routeur si tu le demandes, Pinia pour l\'état global, ESLint/Prettier pour la propreté — une architecture éprouvée en 30 secondes, sans que tu aies à assembler ces pièces à la main.' },
            { t: 'p', h: 'Et l\'atelier est familier : c\'est le même Node, le même Vite, le même `npm run dev` que la fiche **Installation React** — parce que Vue ET React s\'appuient sur Vite comme moteur de dev. Seul le gabarit change ; le modèle mental (transpilation à la volée, rechargement à chaud, `node_modules` jetable) est identique. Sur une machine où React tourne déjà, tu es prêt en avance.' },
            { t: 'h3', h: 'Prérequis : Node, toujours lui' },
            { t: 'table', head: ['Outil', 'Version requise', 'Vérification'], rows: [
              ['Node.js LTS', '≥ 18 (idéal : 20/22)', '`node -v`'],
              ['npm (avec Node)', '≥ 9', '`npm -v`'],
              ['VS Code + extension Vue (Volar)', 'dernière stable', 'l\'extension Vue - Official active'],
              ['Vue DevTools (navigateur)', 'extension Chrome/Firefox', 'l\'onglet Vue apparaît en F12, sur la page de dev']
            ] },
            { t: 'p', h: 'Si `node -v` reste muet, retourne d\'abord à la fiche **Installation React** : elle installe Node de A à Z — la même installation sert ici, 1 pour 1. Et installe **Vue DevTools** dès aujourd\'hui : elle montre l\'arbre des composants, leurs données réactives en direct (les `ref` que tu découvriras) — l\'équivalent React a sa propre extension, celle-ci parle Vue.' },
            { t: 'h3', h: 'Les questions du générateur : répondre en connaissance de cause' },
            { t: 'p', h: '`npm create vue@latest` pose des questions interactives. Voici les réponses de raison pour un projet d\'apprentissage sérieux — et pourquoi : **Router ? OUI** (navigation entre pages — indispensable à toute boutique) ; **Pinia ? OUI** (l\'état global, le panier partagéé entre composants) ; **TypeScript ? NON pour débuter** (il s\'ajoutera plus tard sans douleur) ; **ESLint ? OUI** (la grammaire contrôlée — on ne négocie pas la propreté) ; **Prettier ? Oui** si proposé. Les autres (tests, E2E) se remettent à plus tard : tu peux toujours les ajouter, jamais les retirer facilement.' },
            { t: 'code', lang: 'bash', label: 'Terminal — création et premier lancement', code:
'# 1) Lancer le générateur officiel Vue\nnpm create vue@latest boutique-awa\n#    Questions posées (réponses recommandées pour débuter) :\n#      Add Vue Router ?        → Yes   (navigation catalogue → produit)\n#      Add Pinia ?             → Yes   (le panier partagé entre pages)\n#      Add TypeScript ?        → No    (tu l\'ajouteras quand tu voudras)\n#      Add ESLint ?            → Yes   (le correcteur intégré)\n#      Add Prettier ?          → Yes\n#      (Tests / E2E / JSX…)    → No    (plus tard, sans risque)\n\n# 2) Installer les dépendances — incontournable :\ncd boutique-awa\nnpm install\n\n# 3) Démarrer le serveur de développement\nnpm run dev\n# → « Local: http://localhost:5173/ » — la page Vue+Vite s\'affiche.' },
            { t: 'p', h: 'Note le point commun avec React : le générateur ne fait que PRÉPARER `package.json` — c\'est `npm install` qui télécharge vraiment les kilos d\'outillage dans `node_modules/`. Et `npm run dev` = même serveur Vite, même port 5173, même rechargement à chaud : si les deux tournent ensemble, ils se décalent automatiquement (5174) — lis l\'URL affichée.' },
            { t: 'h3', h: 'La structure générée, dossier par dossier' },
            { t: 'code', lang: 'text', label: 'boutique-awa/ — après npm create vue', code:
'boutique-awa/\n├── index.html           # une boîte vide <div id="app"> où Vue montera\n├── package.json         # scripts (dev/build) + dépendances\n├── vite.config.js       # l\'atelier : plugin Vue, alias « @ » vers src/\n├── public/              # fichiers servis tels quels (favicon…)\n└── src/\n    ├── main.js          # l\'entrée : crée l\'app, monte le routeur et Pinia\n    ├── App.vue          # le COMPOSANT RACINE (template+script+style en un)\n    ├── assets/          # images, CSS global\n    ├── components/      # TES petits composants réutilisables (.vue)\n    ├── views/           # les PAGES (accueil, catalogue…) — côté routeur\n    ├── router/          # index.js : la table des routes (si tu as dit oui)\n    └── stores/          # les stores Pinia (état global du panier, par ex.)' },
            { t: 'p', h: 'Deux lignes d\'attention à `main.js` : il crée l\'application (`createApp(App)` — rencontré aussi au CDN de la fiche suivante), lui BRANCHE le routeur et Pinia (`app.use(router)`), et la monte sur `#app`. Tous les `app.use(…)` lu dans la suite du module s\'empilent ici, avant `app.mount()`. Et `App.vue` accueille `<RouterView />` : la pièce que le routeur change selon l\'URL — tes pages vivent dans `views/`, vos petits blocs réutilisables dans `components/`.' },
            { t: 'h3', h: 'La vérification qui calme (le rituel complet)' },
            { t: 'ol', items: [
              '`node -v` ≥ 18 répond — sinon, installation du socle (fiche Installation React).',
              '`npm create vue@latest boutique-awa` pose ses questions ; tu réponds en lisant pourquoi (routeur + Pinia oui).',
              '`npm install` se termine sans rouge — `node_modules/` existe, `package-lock.json` est né.',
              '`npm run dev` affiche l\'URL : http://localhost:5173 montre « Vite + Vue » avec le compteur cliquable.',
              'Édite `src/App.vue` (un mot du titre) : la page se met à jour SEULE — l\'atelier compile tes `.vue`.',
              'Vue DevTools (F12 → onglet Vue) montre l\'arbre `App → HelloWorld` : l\'inspecteur fonctionne.'
            ] },
            { t: 'callout', kind: 'info', h: 'Par OS : identique à React — les commandes sont celles de Node, PORTAGÉES par lui. Windows : si PowerShell bloque le script, `npm.cmd run dev`. macOS/Linux : nvm reste la voie propre. Et si le port est pris, Vite décale tout seul — un réflexe qui vaut pour tout l\'écosystème.' },
                        { t: 'h3', h: 'Le cycle de vie d'\'une instance : naissance, vie, mort' },
            { t: 'p', h: 'Une application Vue ne vit pas éternellement. `createApp` la crée, `mount` l'\'insère dans la page, et `app.unmount()` la détruit — nettoyant tous les écouteurs, les timers, les observateurs, et restaurant le contenu original du point de montage. C'\'est l'\'équivalent d'\'un composant démonté, mais au niveau de l'\'application entière. La fiche Cycle de vie détaille ce qu'\'un composant individuel traverse ; ici, c'\'est l'\'application elle-même qui peut naître et mourir.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Vue et React ont des besoins totalement différents. »** Non : même Node, même Vite, même `npm create` — seul le GABARIT (les fichiers de départ) diffère. Apprendre l\'atelier d\'un framework, c\'est apprendre l\'atelier de tous les Vite-based.',
              '**« Les questions du générateur sont accessoires — on dit oui à tout. »** Répondre au hasard c\'est payer plus tard : récupérer le routeur APRES coup coûte une installation manuelle (+ câbler main.js) ; dire oui à tout te noie dans des dossiers à ignorer. Réfléchis à chaque question.',
              '**« `createApp` n\'arrive qu\'avec Vite. »** Non : c\'est l\'API officielle de Vue — la fiche suivante l\'utilise via CDN, sans aucun build. La différence : avec Vite, les COMPOSANTS vivent dans des fichiers `.vue` compilés ; sans, tout tient dans le script de la page.',
              '**« Il faut relancer le serveur à chaque modification de code. »** Non : HMR recharge tout seul, état conservé. On ne relance qu\'après avoir touché `vite.config.js`.',
              '**« npm create installe Vue sur la machine. »** Non : rien ne s\'installe « sur la machine » — tout vit dans le projet. Chaque projet porte son Vue, sa version, ses plugins : la portabilité parfaite.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux mésaventures de premier lancement : taper `npm run dev` hors du dossier du projet (le terminal ne trouve pas `package.json` — et hurle ENOENT), et cocher les options du gabarit au hasard puis regretter l\'absence du routeur le jour où la page « détail produit » arrive.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'L\'atelier posé, la fiche **Créer et monter une application** fait écho : le même `createApp`/`mount()` y est présenté en version CDN — tu comprendras la différence entre les deux mondes, et pourquoi Vite. La fiche **Composants monofichiers (SFC)** expliquera la magie `.vue` que Vite compile, **Vite & vue.config** approfondira la configuration, et **Le routing** ouvrira `router/index.js` que le gabarit vient de créer. Côté cousins, c\'est la même maison que React (**Installation & configuration**) — même serveur de dev, même `node_modules` jetable : le modèle ne s\'apprend qu\'une fois.' },
          ],
          errors: [
            {
              title: 'npm run dev lancé hors du dossier projet',
              bad: 'npm create vue@latest boutique-awa\nnpm run dev\n# →  npm error code ENOENT\n#     npm error syscall open … package.json\n#     npm error enoent Could not read package.json\n# normal : le terminal cherche package.json DANS LE DOSSIER COURANT\n# — il n\'est pas où tu te trouves, il est dans boutique-awa/.',
              good: 'cd boutique-awa      # d\'abord : ENTRER dans le projet\nnpm install          # (toujours, la première fois)\nnpm run dev          # → Local: http://localhost:5173/\n# réflexe universel : « cd dans le dossier du projet » AVANT\n# toute commande npm — npm travaille TOUJOURS là où tu es.',
              why: 'npm n\'explore pas le disque : il travaille dans le dossier COURANT — un `package.json` s\'y trouve ou la commande échoue. L\'erreur ENOENT après création de projet est presque toujours un oubli de `cd` (la commande est affichée en fin de générateur, relisez !). C\'est LE réflexe universel du développement moderne : place-toi dans le projet, puis commande — identique chez React, Vite, npm, Composer, pip.'
            },
            {
              title: 'Répondre au hasard aux questions du générateur',
              bad: 'npm create vue@latest boutique-awa\n# Add Vue Router?        → <Entrée> (Non) — « on verra »\n# Add Pinia?             → <Entrée> (Non)\n# …une semaine plus tard : la page /produit/42 doit exister —\n# sans routeur, il faut TOUT installer manuellement :\n#  npm install vue-router + créer router/index.js + câbler\n#  main.js + reconfigurer App.vue (au prix de bugs d\'assemblage)',
              good: 'npm create vue@latest boutique-awa\n# réponses réfléchies, pour un projet qui grandira :\n#   Router → Yes   Pinia → Yes   ESLint → Yes   Prettier → Yes\n#   TypeScript → No (pour l\'apprentissage ; ajout plus tard = 5 min)\n# c\'est gratuit au moment du scaffold — cher à installer après, quand\n# des dizaines de fichiers supposent déjà son absence.',
              why: 'Le gabarit n\'est pas un quiz à passer vite : chaque question configure DE VRAIS fichiers (`router/index.js`, `stores/`, le câblage de `main.js`) qu\'il est long de reproduire cohérentement à la main. Dire « oui » coûte un dossier vide que tu ignoreras ; dire « non » au routeur t\'obligera à tout ajouter à la main au moment le plus chargé du projet. La règle pro des scaffolds : lis chaque question, et prends ce qui répond à « en aurai-je besoin dans 3 mois ? » — la réponse étant presque toujours oui pour le routeur.'
            }
          ],
          related: ['vue-demarrage', 'vue-sfc', 'vue-vite']
        },
        {
          id: 'vue-demarrage',
          title: 'Créer et monter une application',
          icon: 'rocket_launch',
          level: 'Débutant',
          tagline: 'createApp, l\'instance d\'application et le montage : les trois lignes par lesquelles tout commence.',
          intro: 'Vue est né en 2014 d\'une frustration d\'Evan You : les frameworks de l\'époque obligeaient à apprendre tout un monde avant d\'afficher quoi que ce soit. Sa promesse inverse — **progressive** — tient toujours : tu peux démarrer avec une balise script et un `{{ message }}`, puis grandir jusqu\'à une application complète sans changer de philosophie. Avant de parler composants et réactivité, regardons comment une application Vue **naît** : une instance créée avec `createApp`, puis montée sur un nœud du DOM.',
          blocks: [
            { t: 'h3', h: 'La version 30 secondes : le CDN' },
            { t: 'p', h: 'Pour goûter Vue sans rien installer, une balise `<script>` suffit. Ce n\'est **pas** la façon de travailler sur un vrai projet (pas de build, pas de SFC), mais c\'est parfait pour comprendre le mécanisme : Vue prend possession d\'un morceau de page et le rend réactif.' },
            { t: 'code', lang: 'html', label: 'index.html — essai via CDN', code:
'<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Vue en 30 secondes</title>\n  <!-- Vue depuis un CDN : parfait pour goûter, pas pour un vrai projet -->\n  <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>\n</head>\n<body>\n  <!-- Le point de montage : Vue ne contrôle QUE le contenu de cette balise -->\n  <div id="app">\n    <h1>{{ message }}</h1>\n    <button @click="compteur++">Clics : {{ compteur }}</button>\n  </div>\n\n  <script>\n    // createApp reçoit le composant RACINE (ici défini à la volée)\n    const app = Vue.createApp({\n      data() {            // Options API : l\'état initial (on y reviendra)\n        return { message: "Bonjour Vue", compteur: 0 };\n      }\n    });\n    app.mount("#app");    // Vue prend possession de #app (sélecteur CSS)\n  <\/script>\n</body>\n</html>' },
            { t: 'p', h: 'Deux choses à remarquer. `{{ message }}` est une **interpolation** : Vue remplace les moustaches par la valeur — et, détail fondateur, il la **remplacera encore** si la valeur change. `@click` est la directive d\'événement (fiche v-on). Le reste de la page, hors de `#app`, reste du HTML statique que Vue ignore : il s\'intègre *dans* une page existante, il ne la réquisitionne pas.' },
            { t: 'h3', h: 'createApp : l\'instance d\'application' },
            { t: 'p', h: 'Sur un vrai projet (fiche Vite), tout part de `createApp(racine)`. Cette fonction retourne une **instance d\'application** : le chef d\'orchestre qui enregistre les plugins, règle la configuration globale, puis se monte. Deux étapes, deux responsabilités : `createApp` prépare, `mount` attache au DOM. Entre les deux, on configure — c\'est le dernier moment où c\'est possible.' },
            { t: 'code', lang: 'js', label: 'src/main.js — point d\'entrée classique', code:
'import { createApp } from "vue";\nimport App from "./App.vue";       // le composant racine\nimport router from "./router";\n\nconst app = createApp(App);        // 1. création de l\'instance\n\napp.use(router);                   // 2. enregistrement de plugins\napp.config.errorHandler = (err) => {\n  console.error("Erreur attrapée globalement :", err);\n};\n\napp.mount("#app");                 // 3. montage = attache au DOM réel' },
            { t: 'callout', kind: 'tip', h: '`mount("#app")` accepte un sélecteur CSS **ou** un élément DOM. L\'élément cible reste dans la page, mais son contenu est remplacé par le rendu du composant racine : n\'y mets rien d\'important, c\'est une coquille vide par convention.' },
                        { t: 'h3', h: 'data() : la première rencontre avec la réactivité' },
            { t: 'p', h: 'Dans l'\'exemple CDN, `data()` est une fonction qui retourne un OBJET. Ce n'\'est pas un hasard : Vue appelle `data()` une fois au moment de la création, et chaque propriété retournée devient **réactive** — c'\'est-à-dire que toute modification déclenche une mise à jour automatique du DOM. Pourquoi une FONCTION qui retourne un objet plutôt qu'\'un objet directement ? Parce qu'\'un composant peut être réutilisé plusieurs fois : chaque instance appelle sa propre `data()`, obtenant ainsi SA copie fraîche des données. Un objet partagé ferait que trois compteurs sur la même page partageraient tous le même état — désastre garanti.' },
            { t: 'p', h: 'Cette fonction `data()` est le cœur de ce qu'\'on appelle l'\'**Options API** : l'\'état vit dans une case nommée `data`, les méthodes dans `methods`, les valeurs dérivées dans `computed`… Un composant est découpé en « tiroirs » que Vue remplit au moment de la création. C'\'est très lisible quand le composant est petit ; la **Composition API** (fiche dédiée) inverse l'\'organisation — par sujet plutôt que par type d'\'outil — et devient plus naturelle quand le composant grossit. Les deux font la même chose ; ce module te donne les deux et te laisse choisir selon le contexte.' },
            { t: 'h3', h: 'Plusieurs apps sur une même page ?' },
            { t: 'p', h: 'Rien n\'oblige à n\'avoir qu\'une instance : `createApp` peut être appelée plusieurs fois, sur des points de montage différents (`#panier`, `#recherche`…). C\'est la porte d\'entrée historique de Vue dans des sites **déjà rendus** (WordPress, Django, Laravel) : on saupoudre un widget Vue là où la page a besoin d\'interactivité, sans réécrire le site en application monopage.' }
          ],
          errors: [
            { title: 'Monter avant que le DOM existe', lang: 'js', bad: '// Dans le <head> de la page :\ncreateApp(App).mount("#app");\n// [Vue warn]: mount target selector "#app" matched no element', good: '// 1) index.html à la racine, script en type="module" (différé par défaut)\n<script type="module" src="/src/main.js"><\/script>\n// 2) ou attendre le parsing complet :\ndocument.addEventListener("DOMContentLoaded", () => {\n  createApp(App).mount("#app");\n});', why: 'mount() cherche l\'élément immédiatement ; si le HTML n\'est pas encore parsé, il ne trouve rien. Les scripts `type="module"` (et le point d\'entrée Vite) s\'exécutent après le parsing : en les utilisant, le problème disparaît de lui-même.' },
            { title: 'Croire que n\'importe quel objet devient réactif', lang: 'js', bad: 'const config = { compteur: 0 };\ncreateApp(config).mount("#app");\nconfig.compteur = 5;   // rien ne se met à jour à l\'écran', good: 'createApp({\n  data() { return { compteur: 0 }; }\n}).mount("#app");\n// La réactivité s\'obtient via data(), ref() ou reactive() (fiches dédiées)', why: 'Seules les données déclarées à Vue deviennent réactives ; un objet extérieur passé tel quel n\'est pas "tracé". C\'est la première intuition à corriger : Vue n\'observe que ce qu\'on lui confie.' }
          ],
          related: ['vue-sfc', 'vue-vite', 'js-dom', 'vue-api-styles']
        },

        {
          id: 'vue-sfc',
          title: 'Les composants monofichier (.vue)',
          icon: 'article',
          level: 'Débutant',
          tagline: 'Template, script et style dans un même fichier : le format de composant qui a fait la renommée de Vue.',
          intro: 'Un **Single-File Component** (SFC) est un fichier `.vue` qui regroupe les trois vies d\'un composant : son HTML (`<template>`), sa logique (`<script>`) et ses styles (`<style>`). C\'est le format que tout l\'écosystème Vue attend — et la raison pour laquelle on parle de composants "autonomes" : ouvrir un fichier `.vue`, c\'est voir *tout* ce qu\'il est d\'un coup d\'œil. Revers de la médaille : le navigateur ne sait pas lire `.vue`, il faut une étape de compilation — précisément le travail de Vite (fiche suivante).',
          blocks: [
            { t: 'h3', h: 'L\'anatomie d\'un .vue' },
            { t: 'code', lang: 'html', label: 'Compteur.vue', code:
'<!-- UN fichier = UN composant, trois langages -->\n<template>\n  <button class="compteur" @click="compteur++">\n    {{ compteur }} clics\n  </button>\n</template>\n\n<script setup>\n// <script setup> = Composition API sans cérémonie (fiche dédiée)\nimport { ref } from "vue";\nconst compteur = ref(0);     // état local réactif\n<\/script>\n\n<style scoped>\n/* scoped : ces styles ne s\'appliquent QU\'à ce composant */\n.compteur {\n  border-radius: 12px;\n  padding: 8px 16px;\n}\n<\/style>' },
            { t: 'p', h: 'Trois blocs, trois rôles. `<template>` contient le HTML du composant, enrichi des directives Vue (`@click`, `{{ }}`…). `<script setup>` contient la logique en Composition API : tout ce qui y est déclaré au niveau supérieur — imports, constantes, fonctions — est **automatiquement disponible dans le template**. `<style scoped>` applique ses règles *uniquement* à ce composant : Vue ajoute pour cela un attribut unique (`data-v-xxxx`) aux éléments, et l\'injecte dans les sélecteurs générés.' },
            { t: 'h3', h: 'Pourquoi les gens adorent' },
            { t: 'ul', items: [
              '**Co-localisation** : HTML, JS et CSS d\'un composant vivent ensemble — fini les allers-retours entre trois fichiers.',
              'Les blocs sont compilés séparément : le template devient une fonction de rendu optimisée, le CSS scoped est isolé.',
              'Vue 3 autorise **plusieurs nœuds racine** dans le template (fragments) — fini le `<div>` fourre-tout obligatoire de Vue 2.',
              'Coloration et autocomplétion excellentes avec l\'extension officielle (Vue - Official / Volar).'
            ] },
            { t: 'h3', h: 'Ce que le compilateur fait pour toi' },
            { t: 'p', h: 'Au build, `<template>` est transformé en fonction JavaScript de **rendu** (celle qui produit le DOM virtuel), `<script setup>` devient le corps du composant, et chaque `<style>` est extrait vers le CSS final. Tu n\'écriras presque jamais de fonction de rendu à la main : le SFC est du sucre très bien pensé au-dessus de JavaScript.' },
            { t: 'callout', kind: 'warn', h: 'Un fichier `.vue` ne s\'ouvre pas directement dans le navigateur : tenter `<script src="Compteur.vue">` échouera. Il faut l\'outillage (Vite, via `npm create vue@latest`) ou la version CDN avec templates en chaînes de caractères — réservée aux maquettes.' }
          ],
          errors: [
            { title: 'Oublier scoped et polluer toute l\'application', lang: 'css', bad: '<style>\n.titre { color: red; }   /* sans scoped : s\'applique à TOUS les .titre du site */\n</style>', good: '<style scoped>\n.titre { color: red; }   /* uniquement les .titre de CE composant */\n</style>', why: 'Le CSS est global par nature : sans scoped, le style d\'un composant fuit partout et les collisions deviennent ingérables à mesure que le projet grandit. scoped n\'est pas optionnel dans un travail d\'équipe.' },
            { title: 'Mélanger <script> classique et logique éparpillée', lang: 'html', bad: '<template>\n  <button @click="alert(1)">Go</button>   <!-- logique entassée en inline -->\n</template>\n<script>\n/* script classique sans setup, data/methods mélangés… */\n<\/script>', good: '<script setup>\nimport { ref } from "vue";\nconst compteur = ref(0);\nfunction go() { compteur.value++; }\n<\/script>\n<!-- toute la logique au même endroit, exposée au template -->', why: 'Mélanger les formes de script complique la lecture et masque ce qui est réellement exposé au template. Choisis `<script setup>` (la forme moderne, fiche dédiée) et tiens-t\'y : un fichier, une convention.' }
          ],
          related: ['vue-vite', 'vue-script-setup', 'vue-demarrage', 'css-variables']
        },

        {
          id: 'vue-vite',
          title: 'Créer un projet avec Vite',
          icon: 'bolt',
          level: 'Débutant',
          tagline: 'npm create vue, serveur de dev instantané, build optimisé : la chaîne d\'outillage officielle.',
          intro: 'Écrire des SFC suppose un **outil de build** : Vue a choisi **Vite** (créé par le même Evan You). Son idée : pendant le développement, servir les modules ES natifs au navigateur *à la demande* au lieu de tout re-bundler — démarrage quasi instantané, rechargement à chaud qui conserve l\'état. En production, Rollup prend le relais pour un bundle optimisé. Concrètement, cinq commandes suffisent à connaître par cœur.',
          blocks: [
            { t: 'h3', h: 'Les cinq commandes' },
            { t: 'code', lang: 'bash', code:
'npm create vue@latest    # assistant officiel : nom, TypeScript ?, Router ?, Pinia ?…\ncd mon-app\nnpm install              # restaure node_modules depuis package.json\nnpm run dev              # serveur de dev avec HMR (rechargement instantané)\nnpm run build            # build de production → dist/\nnpm run preview          # sert le build en local pour vérification' },
            { t: 'p', h: '`npm create vue@latest` lance l\'assistant officiel : nom du projet, TypeScript oui/non, **Vue Router**, **Pinia**, **Vitest**, ESLint… Réponds honnêtement : tout ce que tu coches est câblé proprement dès le départ (et tout peut s\'ajouter plus tard — fiches Router, Pinia, Tests).' },
            { t: 'h3', h: 'La structure générée' },
            { t: 'code', lang: 'bash', code:
'mon-app/\n├── index.html          # la COQUILLE HTML — c\'est elle, la vraie entrée\n├── package.json        # dépendances + scripts (dev/build/preview)\n├── vite.config.js      # config Vite (plugins, alias…)\n├── public/             # fichiers servis TELS QUELS (favicon, robots.txt)\n└── src/\n    ├── main.js         # createApp(App).use(router).mount("#app")\n    ├── App.vue         # composant racine\n    ├── assets/         # images/css IMPORTÉS (hashés, optimisés au build)\n    ├── components/     # tes composants\n    └── router/         # présent si tu as coché Vue Router' },
            { t: 'p', h: 'Deux détails qui surprennent au début. D\'abord, l\'entrée du projet est `index.html` à la **racine** (ni dans `public/`, ni dans `src/`) : Vite y injecte le module `src/main.js`. Ensuite, `assets/` (traité par le build : hash, minification, optimisation) ne se comporte pas comme `public/` (copié tel quel, non traité). Image utilisée dans un `<img :src>` importé ? `assets/`. Favicon ou fichier tiers ? `public/`.' },
            { t: 'h3', h: 'Le rechargement à chaud (HMR)' },
            { t: 'p', h: 'Lance `npm run dev`, modifie un composant, sauvegarde : la page se met à jour **sans rechargement complet et sans perdre l\'état**. C\'est le HMR : Vite ne remplace que le module modifié. Tu vas vite considérer ça comme normal — profites-en pour itérer par petits pas : modifier, regarder, corriger. Le HMR ne fait pas que recharger le module : il **conserve l\'état local** de tous les autres composants. Si tu as rempli trois champs d\'un formulaire et que tu changes uniquement la couleur du bouton, tes champs restent remplis. Cette prouesse vient du fait que Vite ne recharge pas la page — il injecte le nouveau module dans le graphe de modules déjà chargés, comme on remplace une pièce dans un moteur qui tourne.'' },
            { t: 'callout', kind: 'tip', h: 'Comportement absurde après une mise à jour de dépendances ? Supprime `node_modules` et le lockfile, puis `npm install`. Et vérifie `node -v` : Vite exige une version LTS récente de Node.' }
          ],
          errors: [
            { title: 'Éditer les fichiers de dist/ puis "perdre" ses changements', lang: 'bash', bad: 'npm run build   # → dist/\n# modifier dist/index.html à la main…\n# écrasé sans sommation au prochain build', good: '# On ne touche JAMAIS dist/ : on modifie src/, puis\nnpm run build   # régénère dist/ intégralement', why: 'dist/ est un ARTEFACT : il est recréé de zéro à chaque build. Toute modification manuelle y est vouée à disparaître — la source de vérité, c\'est src/.' },
            { title: 'Oublier npm install après avoir cloné un projet', lang: 'bash', bad: 'git clone projet-vue && cd projet-vue\nnpm run dev   # "vue" introuvable, vite: command not found…', good: 'npm install   # restaure node_modules depuis package.json\nnpm run dev', why: 'node_modules n\'est jamais versionné (bien trop lourd) : il est reconstruit localement à partir de package.json. Ne pas l\'installer, c\'est essayer de démarrer une voiture sans ses roues.' }
          ],
          related: ['vue-sfc', 'vue-demarrage', 'vue-router']
        }
      ]
    },

    /* ======================================================
       2. RÉACTIVITÉ
       ====================================================== */
    {
      id: 'reactivite',
      name: 'Réactivité',
      icon: 'sync_alt',
      fiches: [
        {
          id: 'vue-ref',
          title: 'ref : la boîte réactive',
          icon: 'radio_button_checked',
          level: 'Débutant',
          tagline: 'La réactivité de Vue tient en une enveloppe : ref() — et son fameux .value.',
          intro: 'La **réactivité** est le contrat fondateur de Vue : tu changes une donnée, l\'interface se met à jour toute seule. Pour les valeurs simples — nombres, chaînes, booléens, mais aussi objets et tableaux en pratique — l\'outil est `ref()` : il enveloppe la valeur dans une **boîte traquée**. Quand le contenu de la boîte change, Vue sait exactement quels bouts de DOM en dépendaient et ne recalcule que ceux-là. C\'est plus fin qu\'un re-rendu global — et c\'est pourquoi Vue n\'a besoin ni d\'un `setState`, ni d\'un diff complet de la page.',
          blocks: [
            { t: 'h3', h: 'Créer et manipuler une ref' },
            { t: 'code', lang: 'js', code:
'import { ref } from "vue";\n\nconst compteur = ref(0);      // ref(0) crée une "boîte" { value: 0 }\n\ncompteur.value++;             // EN JAVASCRIPT : on passe par .value\nconsole.log(compteur.value);  // 1\nconsole.log(compteur);        // l\'objet boîte, PAS 1' },
            { t: 'p', h: 'Le point crucial : `ref(0)` ne retourne pas `0` mais un **objet** `{ value: 0 }`. En JavaScript, on lit et on écrit donc toujours via `.value`. Ça rebute deux jours, puis ça devient un réflexe — et c\'est le prix pour que JavaScript (qui ne permet pas d\'intercepter l\'affectation d\'une variable) puisse suivre les changements.' },
            { t: 'h3', h: 'Dans le template : oublie .value' },
            { t: 'code', lang: 'html', code:
'<template>\n  <!-- Dans le TEMPLATE, les refs sont déballées automatiquement -->\n  <p>Compteur : {{ compteur }}</p>\n  <button @click="compteur++">+1</button>\n  <!-- PAS de .value ici : Vue s\'en charge -->\n</template>' },
            { t: 'p', h: 'Règle simple : `.value` partout **en JS**, jamais dans le template. (Nuance : une ref nichée comme propriété d\'un objet n\'est déballée qu\'en fin d\'expression — un détail qui pique une fois, puis qu\'on oublie en gardant ses refs à plat.)' },
            { t: 'h3', h: 'ref ou reactive ?' },
            { t: 'table', head: ['Question', 'ref', 'reactive'], rows: [
              ['Types acceptés', 'Tout (primitifs, objets, tableaux)', 'Objets et tableaux uniquement'],
              ['En JavaScript', '.value obligatoire', 'Accès direct aux propriétés'],
              ['Réassignation / déstructuration', 'Sûre : la boîte voyage partout', 'Casse la réactivité (fiche suivante)'],
              ['Recommandation officielle', 'Oui, par défaut', 'Pour des objets bien regroupés']
            ] },
            { t: 'p', h: 'Concrètement : prends l\'habitude d\'utiliser `ref()` **pour tout** au début — y compris objets et tableaux. `reactive()` garde sa place pour des structures qu\'on préfère manipuler "à nu" (un gros objet de formulaire, par exemple), au prix des pièges de la fiche suivante.' },
            { t: 'callout', kind: 'info', h: 'Comparaison pour qui vient de React : `ref` joue le rôle de `useState`, mais la mise à jour est une simple affectation (`maRef.value = 42`) — pas de setter spécial, pas de re-rendu du composant entier : Vue ne retouche que le DOM concerné (fiche State du module React).' }
          ],
          errors: [
            { title: 'Oublier .value en JavaScript', lang: 'js', bad: 'const compteur = ref(0);\ncompteur++;            // NaN : on incrémente l\'objet, pas son contenu\nif (compteur > 5) {}   // toujours faux : compare une boîte à un nombre', good: 'compteur.value++;\nif (compteur.value > 5) {\n  // ok : on vise le contenu de la boîte\n}', why: 'La ref est une boîte : toute opération en JS doit viser son contenu via .value. Les bugs qui en découlent sont silencieux (NaN, conditions jamais vraies) — le pire genre à traquer.' },
            { title: 'Écrire .value dans le template', lang: 'html', bad: '<p>{{ compteur.value }}</p>\n<!-- affiche 0… mais devient fragile : sur une ref nichée dans un\n     objet, .value affiche undefined sans prévenir -->', good: '<p>{{ compteur }}</p>\n<!-- le template déballe tout seul, toujours -->', why: 'Le déballage automatique du template rend .value inutile et parfois trompeur (il ne s\'applique pas aux refs nichées). Une règle, pas d\'exception : .value en JS, rien dans le template.' }
          ],
          related: ['vue-reactive', 'vue-computed', 'js-variables', 'rx-state']
        },

        {
          id: 'vue-reactive',
          title: 'reactive() et les pièges de la réactivité',
          icon: 'data_object',
          level: 'Intermédiaire',
          tagline: 'reactive() pour les objets, et pourquoi déstructurer peut tout casser silencieusement.',
          intro: '`reactive()` rend un **objet** (ou un tableau, Map, Set) entièrement réactif via un `Proxy` : lecture et écriture de chaque propriété sont interceptées, en profondeur. Séduisant… mais il a deux limitations structurantes : ça ne marche pas sur les primitives, et la réactivité tient à l\'identité de l\'objet-proxifié — la briser (réassignation, déstructuration, spread) la perd *sans aucune erreur*. C\'est le piège nº1 des débutants Vue, on le démonte en détail.',
          blocks: [
            { t: 'h3', h: 'reactive au quotidien' },
            { t: 'code', lang: 'js', code:
'import { reactive, toRefs } from "vue";\n\nconst utilisateur = reactive({ nom: "Awa", age: 27 });\nutilisateur.age++;          // pas de .value : on touche l\'objet directement\n\n// PIÈGE : déstructurer casse le lien réactif\nconst { nom } = utilisateur;        // nom = simple string, plus jamais réactive\nnom = "Mariam";                     // zéro mise à jour de l\'UI…and erreur en const !\n\n// LA SOLUTION : toRefs convertit chaque propriété en ref synchronisée\nconst { nom: nomReactif, age } = toRefs(utilisateur);\nnomReactif.value = "Mariam";        // met à jour utilisateur.nom, l\'UI suit' },
            { t: 'h3', h: 'Pourquoi la déstructuration casse tout' },
            { t: 'p', h: 'Le proxy de Vue ne protège que **l\'objet lui-même**. Quand tu écris `const { nom } = utilisateur`, tu extrais la *valeur courante* de la propriété dans une variable JavaScript ordinaire : le lien avec le proxy est rompu. Modifier cette variable ne déclenchera jamais de mise à jour, et elle ne reflétera plus les changements futurs. Aucun message d\'erreur : la page paraît simplement "ne pas se rafraîchir".' },
            { t: 'ul', items: [
              '**Réassigner l\'objet** (`utilisateur = reactive({...})`) : l\'ancienne référence traquée est abandonnée, le template reste branché sur l\'ancienne.',
              '**Spread** dans un nouvel objet (`{ ...utilisateur }`) : simple copie de valeurs à l\'instant T.',
              '**Passer une propriété** à une fonction qui la stocke : même rupture de lien qu\'une extraction.'
            ] },
            { t: 'h3', h: 'Les portes de sortie propres' },
            { t: 'p', h: 'Trois réflexes t\'évitent 99 % du problème. **1)** Préfère `ref()` dès qu\'une valeur doit voyager : une ref se déstructure sans rien perdre, c\'est la boîte qui voyage. **2)** Pour décomposer un objet réactif, utilise `toRefs()` : chaque propriété devient une ref adossée à l\'original. **3)** Pour une seule propriété : `toRef(obj, "cle")`, ou une `computed`.' },
            { t: 'callout', kind: 'tip', h: 'Règle de conduite en `<script setup>` : des refs à plat pour l\'état ("compteur", "chargement", "utilisateur"), et `reactive` réservé aux structures qu\'on veut manipuler comme des objets classiques sans jamais en extraire les morceaux (formulaires volumineux, états de grilles).' }
          ],
          errors: [
            { title: 'Déstructurer un reactive puis s\'étonner que l\'UI gèle', lang: 'js', bad: 'const form = reactive({ nom: "", email: "" });\nconst { nom } = form;\nnom.value = "Awa";   // TypeError ou silence : nom n\'est PAS une ref', good: 'import { toRefs } from "vue";\nconst { nom, email } = toRefs(form);\nnom.value = "Awa";   // met à jour form.nom, l\'UI est rafraîchie', why: 'La déstructuration copie la valeur à l\'instant T, hors du proxy. toRefs conserve le lien en enveloppant CHAQUE propriété dans une ref synchronisée avec l\'original : tu récupères la commodité ET la réactivité.' },
            { title: 'Réassigner un reactive', lang: 'js', bad: 'let etat = reactive({ items: [] });\netat = reactive({ items: [] });   // le template regarde toujours l\'ANCIEN objet', good: 'const etat = reactive({ items: [] });\netat.items = [];                 // on MUTE, on ne remplace pas\n// ou : const etat = ref({ items: [] });\n//      etat.value = { items: [] };   // la ref autorise le remplacement', why: 'Le template suit la référence initiale ; lui substituer un nouvel objet le débranche silencieusement. Soit on mute les propriétés en place, soit on utilise une ref, qui existe justement pour autoriser le remplacement complet via .value.' },
            { title: 'Vouloir rendre une primitive "reactive"', lang: 'js', bad: 'const compteur = reactive(0);\n// warning : reactive() n\'accepte que des objets', good: 'const compteur = ref(0);   // les primitives passent par ref', why: 'reactive ne peut intercepter que l\'accès à des propriétés d\'un objet : un nombre ne se "proxifie" pas. Les primitives passent par ref — c\'est d\'ailleurs la raison d\'être de ref.' }
          ],
          related: ['vue-ref', 'vue-watch', 'vue-pinia', 'js-objets']
        }
      ]
    },

    /* ======================================================
       3. DIRECTIVES
       ====================================================== */
    {
      id: 'directives',
      name: 'Directives',
      icon: 'code',
      fiches: [
        {
          id: 'vue-v-if',
          title: 'v-if, v-else et v-show',
          icon: 'call_split',
          level: 'Débutant',
          tagline: 'Afficher sous condition : v-if décide si le DOM existe, v-show s\'il est visible.',
          intro: 'Deux outils pour la même envie — "afficher ça seulement si…" — avec une différence de **nature** : `v-if` ajoute et retire réellement les éléments du DOM (et crée/détruit les composants concernés), tandis que `v-show` bascule un simple `display: none`. Choisir entre les deux est une question de fréquence de bascule et de coût de création. Regardons d\'abord la famille v-if au complet.',
          blocks: [
            { t: 'h3', h: 'La chaîne v-if / v-else-if / v-else' },
            { t: 'code', lang: 'html', code:
'<template>\n  <p v-if="score >= 90">Excellent !</p>\n  <p v-else-if="score >= 50">Encourageant…</p>\n  <p v-else>On révise et on réessaie.</p>\n\n  <!-- v-if sur un GROUPE sans balise en trop : <template> disparaît au rendu -->\n  <template v-if="connecte">\n    <h2>Tableau de bord</h2>\n    <p>Bienvenue {{ user.nom }}</p>\n  </template>\n</template>' },
            { t: 'p', h: '`v-else` et `v-else-if` doivent **immédiatement suivre** leur `v-if` : un élément intercalé casse la chaîne (le compilateur proteste). Et pour conditionner un *groupe* d\'éléments sans ajouter de balise parasite, on met `v-if` sur un `<template>` : il disparaît au rendu, seuls ses enfants conditionnés restent. Cette astuce — utiliser `<template>` comme conteneur invisible — est un super-pouvoir propre à Vue : la balise `<template>` existe bien dans le HTML natif (pour stocker des gabarits inertes), mais Vue la détourne élégamment. Au rendu, le `<template>` n\'existe plus — seuls ses enfants apparaissent dans le DOM. Résultat : pas de `<div>` parasite qui casse une grille CSS ou une liste `<ul>` (qui n\'accepte que des `<li>` comme enfants directs).' },
            { t: 'h3', h: 'v-show : le costume, pas la naissance' },
            { t: 'code', lang: 'html', code:
'<p v-show="menuOuvert">Menu latéral</p>\n<!-- Rendu TOUJOURS présent dans le DOM : display: none quand faux.\n     v-show = bascule fréquente ; v-if = condition rare ou contenu coûteux -->' },
            { t: 'table', head: ['Critère', 'v-if', 'v-show'], rows: [
              ['Premier rendu si faux', 'Rien n\'est créé (paresseux)', 'Tout est créé, puis masqué'],
              ['Coût d\'une bascule', 'Crée/détruit le DOM et les composants', 'Négligeable (display: none)'],
              ['État interne des composants', 'Perdu à la destruction', 'Conservé'],
              ['Cas typique', 'Branchement rare, contenu lourd', 'Onglets, menus, bascules fréquentes']
            ] },
            { t: 'callout', kind: 'tip', h: 'Un composant lourd (graphe, éditeur riche) affiché deux fois par session ? `v-if`, pour ne pas payer sa création inutilement. Un panneau qu\'on ouvre/ferme en boucle ? `v-show`, pour des bascules instantanées et un état conservé.' }
          ],
          errors: [
            { title: 'v-if et v-for sur le MÊME élément', lang: 'html', bad: '<li v-for="t in taches" v-if="t.visible" :key="t.id">…</li>\n<!-- t n\'existe pas encore à l\'évaluation de v-if → erreur -->', good: '<template v-for="t in taches" :key="t.id">\n  <li v-if="t.visible">…</li>\n</template>\n<!-- ou mieux : filtrer la liste dans une computed (fiche v-for) -->', why: 'Quand les deux cohabitent sur un élément, v-if est évalué EN PREMIER et n\'a pas accès à la variable de boucle : bug garanti. Imbrique via `<template>`, ou filtre la liste en amont avec une propriété calculée.' },
            { title: 'Croire que v-show retire du DOM (et y laisser un secret)', lang: 'html', bad: '<div v-show="estAdmin">Soldes internes, marges…</div>\n<!-- présent dans le code source, un simple F12 l\'affiche -->', good: '<div v-if="estAdmin">Soldes internes…</div>\n<!-- et surtout : vraie autorisation vérifiée CÔTÉ SERVEUR -->', why: 'v-show masque visuellement : le contenu reste inspectable dans le HTML. Tout ce qui est sensible exige v-if — et rien de confidentiel ne devrait de toute façon arriver au navigateur sans contrôle serveur.' }
          ],
          related: ['vue-v-for', 'vue-transitions', 'js-conditions']
        },

        {
          id: 'vue-v-for',
          title: 'v-for et la clé :key',
          icon: 'repeat',
          level: 'Débutant',
          tagline: 'Répéter du DOM pour chaque élément d\'une liste — et donner à chacun une identité stable.',
          intro: '`v-for` rend un élément **par item** d\'une collection : tableau, objet, ou même intervalle numérique. Le point sur lequel on ne négocie pas est la **clé** `:key` : elle donne à chaque ligne une identité qui survit aux réordonnancements. Sans elle, Vue réutilise les nœuds DOM "au mieux" — c\'est-à-dire par position — ce qui corrompt silencieusement les états internes (champs remplis, cases cochées, focus) dès que la liste bouge.',
          blocks: [
            { t: 'h3', h: 'Les trois formes à connaître' },
            { t: 'code', lang: 'html', code:
'<li v-for="tache in taches" :key="tache.id">\n  {{ tache.titre }}\n</li>\n\n<!-- avec l\'index en second paramètre -->\n<li v-for="(tache, i) in taches" :key="tache.id">\n  {{ i + 1 }}. {{ tache.titre }}\n</li>\n\n<!-- sur un objet : (valeur, cle) -->\n<p v-for="(valeur, cle) in profil" :key="cle">{{ cle }} : {{ valeur }}</p>\n\n<!-- sur un nombre : de 1 à 5 (pratique pour des étapes, des étoiles…) -->\n<span v-for="n in 5" :key="n">★</span>' },
            { t: 'p', h: 'Dans tous les cas : `:key` obligatoire, unique parmi les enfants, et **stable** — un identifiant métier (l\'`id` de la base), jamais un index si la liste peut être filtrée, triée ou modifiée.' },
            { t: 'h3', h: 'Pourquoi :key change tout' },
            { t: 'p', h: 'Quand la liste change, Vue réconcilie ancien et nouveau rendus. Avec des clés, il travaille **par identité** : la ligne `id=7` qui descend en position 2 garde son DOM (simplement déplacé). Sans clé — ou pire, avec l\'index comme clé — il réutilise **par position** : le DOM de la ligne 1 est muté pour afficher la ligne 2, et tout état interne (saisie en cours, case cochée, focus) colle alors à la mauvaise donnée.' },
            { t: 'h3', h: 'Listes réactives : tout est détecté' },
            { t: 'p', h: 'En Vue 3, **toutes** les mutations de tableau sont détectées (`push`, `splice`, `sort`, même `tab[i] = x` et `tab.length = 0`) — c\'était une limitation de Vue 2, oublie-la. Tu peux donc muter naturellement, ou réassigner (`taches.value = taches.value.filter(...)`) : dans les deux cas, l\'affichage suit.' },
            { t: 'callout', kind: 'tip', h: 'Besoin d\'afficher une version filtrée ou triée SANS toucher à la source ? Une `computed` : `const visibles = computed(() => taches.value.filter(t => !t.faite))`, puis `v-for` dessus. La liste d\'origine reste intacte, et le calcul ne se rejoue que si la source change (fiche computed).' }
          ],
          errors: [
            { title: 'Oublier :key (ou y mettre l\'index) sur une liste vivante', lang: 'html', bad: '<li v-for="(t, i) in taches" :key="i">\n  <input v-model="t.titre">\n</li>\n<!-- supprime la 1re ligne : l\'input de la 2e garde un état mélangé -->', good: '<li v-for="t in taches" :key="t.id">\n  <input v-model="t.titre">\n</li>\n<!-- id métier : chaque ligne garde SON DOM, supprimée ou déplacée -->', why: 'L\'index n\'est pas une identité : quand la liste se réordonne, la "clé" 0 désigne un autre objet. Vue déplace alors des données dans des DOM recyclés au lieu de déplacer les DOM — états internes désynchronisés, bugs impossibles à reproduire à la main.' },
            { title: 'Itérer sur une valeur encore nulle', lang: 'js', bad: 'const utilisateurs = ref(null);\n// avant la réponse du fetch : v-for sur null → erreur au rendu', good: 'const utilisateurs = ref([]);   // liste vide par défaut\n// + un v-if="chargement" sur un conteneur pendant la requête (fiche HTTP)', why: 'v-for exige un itérable : null ou undefined lève une erreur. Initialise les listes à [] et gère le chargement explicitement : écran stable, zéro crash.' }
          ],
          related: ['vue-v-if', 'vue-computed', 'js-tableaux', 'rx-listes-cles']
        },

        {
          id: 'vue-v-bind',
          title: 'v-bind : lier attributs, classes et styles',
          icon: 'link',
          level: 'Débutant',
          tagline: 'Les moustaches parlent dans le texte ; v-bind (ou :) fait passer les données dans les attributs.',
          intro: 'Règle d\'or du template Vue : `{{ }}` fonctionne dans le **contenu texte**, jamais dans les attributs. Pour injecter une donnée dans `src`, `href`, `disabled` ou `title`, on **lie** l\'attribut avec `v-bind:` — dont le raccourci `:` est utilisé partout. Et parce que classes et styles sont les attributs qu\'on manipule le plus, v-bind leur offre des syntaxes enrichies (objets, tableaux) qui transforment le CSS dynamique en jeu d\'enfant.',
          blocks: [
            { t: 'h3', h: 'Le réflexe de base' },
            { t: 'code', lang: 'html', code:
'<img :src="produit.image" :alt="produit.nom">\n<a :href="fiche.url">Voir la fiche</a>\n<button :disabled="chargement">Envoyer</button>\n\n<!-- argument DYNAMIQUE : même le NOM de l\'attribut est réactif -->\n<button :[nomAttribut]="valeur">Dynamique</button>\n\n<!-- objet entier : lie plusieurs attributs d\'un coup -->\n<img v-bind="attributsImage">' },
            { t: 'p', h: 'Dès que la valeur vient d\'une donnée, l\'attribut prend `:` ; sinon il reste statique. Note que `:disabled="chargement"` supprime littéralement l\'attribut quand la valeur est fausse — pratique pour tous les attributs booléens (`required`, `readonly`…).' },
            { t: 'h3', h: 'Classes dynamiques : la syntaxe objet' },
            { t: 'code', lang: 'html', code:
'<!-- Objet : la classe est présente SI la valeur est vraie -->\n<div :class="{ actif: estActif, \'texte-erreur\': erreur }"></div>\n\n<!-- Tableau : additionne des classes calculées -->\n<div :class="[base, estActif ? \'actif\' : \'\']"></div>\n\n<!-- Les deux se marient, et fusionnent avec le class statique -->\n<div class="carte" :class="[{ selectionne: id === choix }, variante]"></div>\n\n<!-- Style : objet JS, propriétés en camelCase -->\n<button :style="{ color: couleur, fontSize: taille + \'px\' }">OK</button>' },
            { t: 'p', h: 'Avec `:class="{ actif: estActif }"`, la classe `actif` est présente **si et seulement si** `estActif` est vrai. Cette syntaxe objet n\'est pas un caprice de design : elle résout le problème du « delta de classes ». Sans elle, pour basculer une classe dynamiquement, tu devrais écrire `:class="estActif ? 'carte actif' : 'carte'"` — et à chaque nouvelle classe conditionnelle, la ternaire deviendrait illisible. L\'objet `{ actif: estActif, 'en-promo': promo }` fusionne automatiquement avec le `class` statique — Vue fait l\'addition et ne retient que les classes dont la valeur est vraie. Même philosophie pour `:style` : l\'objet JavaScript est fusionné avec le style existant, et les propriétés en camelCase (`fontSize`) sont automatiquement converties en kebab-case CSS (`font-size`). — plusieurs paires dans le même objet, et ça fusionne avec un éventuel `class` statique. La forme tableau additionne des classes calculées. Côté style, l\'objet accepte même un tableau pour fusionner plusieurs objets de style. Ces deux enrichissements remplacent élégamment la concaténation de classes à la main — et adorent les variables CSS (fiche Variables du module CSS).' },
            { t: 'callout', kind: 'info', h: 'Comparaison : en JavaScript pur, tu écrirais `element.setAttribute("src", url)`… et tu répèterais à chaque changement (fiche DOM du module JS). v-bind déclare la liaison UNE fois ; Vue la maintient pour toujours.' }
          ],
          errors: [
            { title: 'Mettre des moustaches dans un attribut', lang: 'html', bad: '<img src="{{ produit.image }}">\n<!-- envoyé TEL QUEL : URL littérale "{{ produit.image }}", image cassée -->', good: '<img :src="produit.image" :alt="produit.nom">', why: 'Le navigateur ignore {{ }} dans un attribut ; seul v-bind crée la liaison et la maintient. C\'est LA distinction à intégrer dès le premier jour : moustaches = contenu texte, :attribut = valeur.' },
            { title: 'Oublier les guillemets sur une clé CSS avec tiret', lang: 'html', bad: ':class="{ texte-erreur: erreur }"\n<!-- SyntaxError : le tiret est lu comme une soustraction -->', good: ':class="{ \'texte-erreur\': erreur }"\n<!-- une clé contenant un tiret se quote, comme en JavaScript -->', why: 'L\'objet passé à :class est du JavaScript ordinaire : ses clés obéissent aux mêmes règles — une clé avec tiret doit être entourée de guillemets. L\'erreur se signale dès la compilation, encore faut-il la comprendre.' }
          ],
          related: ['vue-v-on', 'vue-v-model', 'js-dom', 'css-variables']
        },

        {
          id: 'vue-v-on',
          title: 'v-on : écouter les événements',
          icon: 'touch_app',
          level: 'Débutant',
          tagline: 'Des clics aux touches clavier : @ relie le DOM à tes méthodes, modificateurs inclus.',
          intro: 'Côté interactions, Vue déclare les écouteurs **dans le template** avec `v-on:` — raccourci `@`, omniprésent. Pourquoi `@` et pas le `onclick` natif de HTML ? Parce que `@click` n\'est PAS un attribut HTML — c\'est une directive Vue. La différence est fondamentale : `onclick="maFonction()"` exécute une chaîne de caractères comme du code (eval déguisé, portée globale, pas de closure sur ton état) ; `@click="maFonction"` évalue une EXPRESSION JavaScript dans la portée du composant — avec accès à toutes tes données réactives, tes méthodes, tes computed. C\'est pour ça que `@click="compteur++"` fonctionne : `compteur` est une variable de ton composant, pas une variable globale. avec `v-on:` — raccourci `@`, omniprésent. Là où le JavaScript vanilla impose `addEventListener` plus la gestion manuelle du retrait (fiche Événements du module JS), la directive s\'occupe de tout : attachement, retrait à la destruction du composant, contexte correct. Cerise sur le gâteau : les **modificateurs** (`.prevent`, `.stop`, `.enter`, `.once`) remplacent les incantations `event.preventDefault()` éparpillées dans le code.',
          blocks: [
            { t: 'h3', h: 'Les trois écritures' },
            { t: 'code', lang: 'html', code:
'<!-- 1. Gestionnaire nommé : la méthode reçoit l\'Event natif -->\n<button @click="incrementer">+1</button>\n\n<!-- 2. Avec arguments : $event passe l\'Event explicitement -->\n<button @click="supprimer(tache.id, $event)">Supprimer</button>\n\n<!-- 3. Inline : toléré pour une opération triviale -->\n<button @click="n++">+1</button>' },
            { t: 'p', h: 'Privilégie le **gestionnaire nommé** : la logique reste au même endroit que l\'état, et se teste facilement. La forme inline se tolère pour une opération triviale. Besoin de l\'objet Event ET d\'arguments ? `$event` est la variable magique fournie par Vue.' },
            { t: 'h3', h: 'Modificateurs : les post-it du template' },
            { t: 'code', lang: 'html', code:
'<form @submit.prevent="envoyer">…</form>   <!-- empêche le rechargement -->\n<a @click.stop="ouvrir">…</a>              <!-- stoppe la propagation -->\n<button @click.once="activer">…</button>   <!-- une seule fois -->\n<input @keyup.enter="valider">             <!-- uniquement la touche Entrée -->\n<div @click.self="fermer">…</div>          <!-- clic sur l\'élément même, pas un enfant -->\n<button @click.left.stop="action">…</button>   <!-- les modificateurs se chaînent -->' },
            { t: 'p', h: '`.prevent` annule le comportement par défaut, `.stop` stoppe la propagation, `.once` désabonne après la première exécution. Côté clavier : `.enter`, `.esc`, `.tab`, `.space`… filtrent la touche. Ils se chaînent dans l\'ordre qui a du sens pour ton cas.' },
            { t: 'callout', kind: 'tip', h: 'Sur un formulaire, `@submit.prevent` sur la balise `<form>` (et non `@click` sur le bouton) capte AUSSI la touche Entrée pressée dans un champ : l\'expérience native du web, gratuitement.' }
          ],
          errors: [
            { title: 'Appeler la méthode au lieu de la passer (ou l\'inverse)', lang: 'html', bad: '<button @click="sauvegarder">OK</button>\n// sauvegarder(id)  → id reçoit… un MouseEvent (pas de parenthèses\n// = Vue appelle avec l\'Event natif)', good: '<button @click="sauvegarder">OK</button>\n// méthode : sauvegarder(event) — l\'Event natif sans parenthèses\n<button @click="sauvegarder(42, $event)">OK</button>\n// parenthèses = TU choisis les arguments, $event passe l\'Event', why: 'Sans parenthèses, Vue appelle ta méthode avec l\'événement natif ; avec, c\'est toi qui composes l\'appel. Mélanger les deux produit des paramètres décalés et des [object MouseEvent] inattendus.' },
            { title: 'Oublier .prevent et repartir en rechargement de page', lang: 'html', bad: '<form @submit="envoyer">\n<!-- soumission native : GET vers la même page, état perdu, écran blanc -->', good: '<form @submit.prevent="envoyer">\n<!-- et dans envoyer() : validation puis fetch (fiches Validation & HTTP) -->', why: 'Un formulaire HTML soumis recharge la page par défaut — annulant ton traitement JS et vidant l\'état. .prevent accompagne 99 % des @submit dans une application Vue.' }
          ],
          related: ['vue-v-bind', 'vue-emits', 'vue-v-model', 'js-evenements']
        },

        {
          id: 'vue-v-html',
          title: 'v-html : le HTML brut et ses risques',
          icon: 'gpp_maybe',
          level: 'Intermédiaire',
          tagline: 'Injecter du HTML tel quel est parfois nécessaire — et dangereux dès que la source n\'est pas 100 % maîtrisée.',
          intro: 'Par défaut, Vue **échappe** tout : `{{ "<b>x</b>" }}` affiche littéralement les balises — le `<` devient `&lt;`, inoffensif. Ce n\'est pas de la prudence excessive : c\'est la seule défense fiable contre le **XSS** (Cross-Site Scripting), l\'attaque n°1 des applications web depuis vingt ans. Le scénario : un utilisateur malveillant tape `<script>volerCookies()</script>` dans un champ « commentaire ». Sans échappement, ce code s\'exécute dans le navigateur de TOUS les visiteurs qui lisent le commentaire — vol de session, défacement, actions à leur place. Vue échappe par défaut PRÉCISÉMENT pour que tu n\'aies pas à y penser. `v-html` est la SORTIE DE SECOURS — à n\'emprunter que quand tu SAIS que le HTML est sûr (contenu d\'un CMS de confiance, Markdown que TU as compilé). `v-html` court-circuite cette protection et injecte la chaîne comme HTML réellement interprété. Usage légitime : du contenu riche venant d\'un CMS, ou de TON Markdown compilé. Usage catastrophique : afficher une saisie utilisateur — commentaire, pseudo, message — qui peut embarquer un script ou un gestionnaire inline malveillant. C\'est la porte d\'entrée classique du **XSS** (injection de script).',
          blocks: [
            { t: 'h3', h: 'Voir la différence' },
            { t: 'code', lang: 'html', code:
'<p>{{ contenuHtml }}</p>\n<!-- affiche : <b>Gras</b> — le texte BRUT, échappé, sûr quelle que soit la source -->\n\n<div v-html="contenuHtml"></div>\n<!-- interprète : Gras en vrai gras — et interpréterait AUSSI un script malveillant -->' },
            { t: 'p', h: 'Première ligne : sûre à 100 %, quelle que soit la donnée. Deuxième : le HTML est exécuté par le navigateur — y compris un éventuel `<script>` ou un attribut `onerror` piégé. La règle de sécurité n\'a pas d\'exception : `v-html` ne reçoit **jamais** de contenu utilisateur non assaini.' },
            { t: 'h3', h: 'Assainir avant d\'injecter' },
            { t: 'code', lang: 'js', code:
'import DOMPurify from "dompurify";\n\n// on nettoie AVANT de stocker ou d\'afficher :\nconst htmlPropre = DOMPurify.sanitize(contenuBrut);\n// <div v-html="htmlPropre"></div> devient alors acceptable\n// (scripts, on* et javascript: supprimés, balises autorisées conservées)' },
            { t: 'p', h: 'Deux pièges propres à v-html. **1)** Les directives Vue ne s\'exécutent PAS dans le HTML injecté : c\'est du contenu, pas du template — un `@click` dedans restera lettre morte. **2)** Les styles `scoped` du composant ne s\'y appliquent pas non plus : il faut recourir au sélecteur `:deep()` (ex. `:deep(img) { max-width: 100% }`).' },
            { t: 'callout', kind: 'warn', h: 'Ton cas d\'usage est "contenu riche maîtrisé" (articles, pages CMS de confiance) ? v-html + DOMPurify côté traitement est un bon duo. Ton cas est "afficher ce que les gens écrivent" ? La bonne réponse est presque toujours : échapper (moustaches), ou compiler en Markdown restreint.' }
          ],
          errors: [
            { title: 'Afficher un commentaire utilisateur avec v-html', lang: 'html', bad: '<div v-html="commentaire"></div>\n<!-- commentaire = "<img src=x onerror=\'vol de session\'>" :\n     le code s\'exécute chez CHAQUE lecteur -->', good: '<p>{{ commentaire }}</p>                         <!-- échappé : sûr -->\n<div v-html="htmlAssaini"></div>   <!-- contenu MAÎTRISÉ + DOMPurify -->', why: 'v-html interprète le HTML tel quel : toute saisie devient un vecteur d\'injection (vol de session, défacement). L\'échappement par défaut n\'est pas une contrainte, c\'est un garde-fou — ne le contourne que pour du contenu dont tu maîtrises la chaîne de production.' },
            { title: 'Attendre des directives Vue dans le HTML injecté', lang: 'js', bad: 'const widget = "<button @click=\'go\'>Go</button>";\n// <div v-html="widget"></div>\n// @click affiché comme attribut mort : jamais compilé', good: '// Le contenu dynamique ET interactif se fait avec des composants :\nimport MonWidget from "./MonWidget.vue";\n// <component :is="…"> pour varier (fiche Composants)', why: 'v-html injecte du HTML APRÈS la compilation du template : son contenu n\'est jamais travaillé par Vue. Pour de l\'interactivité, on compose des composants — on n\'injecte pas du pseudo-template.' }
          ],
          related: ['vue-v-bind', 'vue-composants', 'js-erreurs']
        }
      ]
    },

    /* ======================================================
       4. OPTIONS API VS COMPOSITION API
       ====================================================== */
    {
      id: 'styles-api',
      name: 'Options vs Composition API',
      icon: 'compare_arrows',
      fiches: [
        {
          id: 'vue-api-styles',
          title: 'Options API vs Composition API',
          icon: 'compare_arrows',
          level: 'Intermédiaire',
          tagline: 'Deux façons d\'écrire le même composant : par cases (Options) ou par sujets (Composition).',
          intro: 'Vue propose deux styles pour décrire un composant. L\'**Options API** (historique, issue de Vue 1 et 2) organise le code par *type d\'outil* : une option `data`, une option `methods`, une option `computed`… La **Composition API** (arrivée avec Vue 3) organise par *fonctionnalité* : tout ce qui concerne le panier est regroupé, tout ce qui concerne la recherche aussi. La puissance est égale — l\'organisation diffère, et elle change tout dès que le composant grossit.',
          blocks: [
            { t: 'h3', h: 'Le même compteur, deux écoles' },
            { t: 'code', lang: 'js', label: 'Options API — par cases', code:
'export default {\n  data() {\n    return { compteur: 0 };            // l\'état\n  },\n  computed: {\n    double() { return this.compteur * 2; }   // les dérivés\n  },\n  methods: {\n    incrementer() { this.compteur++; }       // les actions\n  },\n  mounted() {\n    console.log("monté !");                  // le cycle de vie\n  }\n};' },
            { t: 'code', lang: 'js', label: 'Composition API — par sujets', code:
'import { ref, computed, onMounted } from "vue";\n\nexport default {\n  setup() {\n    const compteur = ref(0);                          // l\'état\n    const double = computed(() => compteur.value * 2); // les dérivés\n    function incrementer() { compteur.value++; }       // les actions\n    onMounted(() => console.log("monté !"));           // le cycle de vie\n\n    return { compteur, double, incrementer };   // exposé au template\n  }\n};' },
            { t: 'p', h: 'En Options, Vue te fournit `this` et des cases à remplir ; en Composition, tu écris du JavaScript ordinaire dans `setup()` et tu **retournes** ce que le template peut utiliser. Seconde différence, plus subtile : en Composition, chaque état est explicite (`ref`, `computed`) — rien n\'est magique, tout s\'importe, tout se teste comme des fonctions.' },
            { t: 'h3', h: 'Quand préférer quoi' },
            { t: 'ul', items: [
              '**Composition** : composants riches (une fonctionnalité = un bloc qu\'on peut extraire en composable), réutilisation de logique entre composants, TypeScript de bout en bout.',
              '**Options** : petits composants, équipes qui la connaissent déjà, reprise de code Vue 2 — sa structure par cases reste très lisible quand il y en a peu.',
              'Les deux styles cohabitent dans un même projet (évite seulement de mélanger DANS un même composant).',
              'La documentation officielle documente les deux ; `<script setup>` est la forme Composition conseillée aujourd\'hui — c\'est celle de ce module.'
            ] },
            { t: 'callout', kind: 'info', h: 'Tu viens de React ? La Composition API répond à la même douleur que les hooks (réutiliser de la logique à état), sans leurs règles : pas d\'ordre d\'appel imposé, pas de tableau de dépendances à maintenir, `setup()` ne s\'exécute qu\'UNE fois par composant.' }
          ],
          errors: [
            { title: 'Utiliser this en Composition API', lang: 'js', bad: 'setup() {\n  this.compteur++;   // undefined : pas de this dans setup()\n}', good: 'setup() {\n  const compteur = ref(0);\n  compteur.value++;\n  return { compteur };\n}', why: 'this est la machine de l\'Options API ; setup() s\'exécute AVANT la création de l\'instance et n\'y a pas accès. En Composition, tout passe par des variables locales explicites — c\'est justement ce qui rend la logique extractible en composables.' },
            { title: 'Oublier le return dans setup() (forme classique)', lang: 'js', bad: 'setup() {\n  const compteur = ref(0);\n  // template : {{ compteur }} → vide, warning "property not found"\n}', good: 'setup() {\n  const compteur = ref(0);\n  return { compteur };   // seul ce qui est retourné est exposé\n}\n// ou mieux : <script setup>, qui expose tout automatiquement', why: 'Seul l\'objet retourné par setup() est visible du template. Oublier le return donne des interpolations vides sans gros message d\'erreur — d\'où l\'attrait de `<script setup>`, qui ne connaît pas ce problème.' }
          ],
          related: ['vue-script-setup', 'vue-ref', 'vue-composables', 'rx-hooks-custom']
        },

        {
          id: 'vue-script-setup',
          title: '&lt;script setup&gt;, la Composition sans cérémonie',
          icon: 'auto_fix_high',
          level: 'Intermédiaire',
          tagline: 'Le sucre syntaxique qui expose tout au template — et fait de defineProps/defineEmits des macros de compilation.',
          intro: '`<script setup>` est la forme que tu écriras 95 % du temps. C'est `setup()` débarrassée de deux cérémonies : la fonction englobante et le `return` final. Techniquement, ce n'est pas juste du sucre — c'est une **macro de compilation**. Le compilateur SFC transforme `<script setup>` en une vraie fonction `setup()` standard, avec le `return` automatiquement généré. Les imports de composants, les constantes, les fonctions : tout est aspiré. Et les mots-clés `defineProps`, `defineEmits`, `defineModel`, `defineExpose` sont eux aussi compilés — ils n'existent pas dans le runtime Vue, c'est le compilateur qui les remplace. Cette compilation explique POURQUOI on ne les importe pas : importer `defineProps` depuis 'vue' serait un mensonge — la fonction n'y est pas. Tout ce qui est déclaré au niveau supérieur — variables, imports, fonctions — est directement utilisable dans le template. Les déclarations spéciales (`defineProps`, `defineEmits`, `defineModel`, `defineExpose`) sont des **macros de compilation** : tu les appelles sans les importer, et elles disparaissent au build.',
          blocks: [
            { t: 'h3', h: 'Concrètement' },
            { t: 'p', h: 'Reprenons un composant de recherche : avec `<script setup>`, il perd la fonction et le return de la forme classique — le haut du fichier EST la logique du composant.' },
            { t: 'code', lang: 'html', label: 'Recherche.vue', code:
'<template>\n  <input v-model="terme" placeholder="Rechercher…">\n  <p>{{ resultats.length }} résultat(s)</p>\n  <CarteResultat v-for="r in resultats" :key="r.id" :resultat="r" />\n</template>\n\n<script setup>\n// Tout ce niveau supérieur est exposé au template, sans return :\nimport { ref, computed } from "vue";\nimport CarteResultat from "./CarteResultat.vue";   // importé = utilisable dans le template\n\nconst props = defineProps({ source: Array });      // macro : s\'utilise telle quelle\nconst emit = defineEmits(["selection"]);\n\nconst terme = ref("");\nconst resultats = computed(() =>\n  (props.source ?? []).filter((x) => x.titre.includes(terme.value))\n);\n<\/script>' },
            { t: 'p', h: 'Trois choses à remarquer. **1)** Un composant importé est immédiatement utilisable dans le template (plus d\'option `components`). **2)** `defineProps` et `defineEmits` s\'appellent tels quels : ce sont des macros, ne cherche pas à les importer. **3)** L\'ordre des déclarations est libre — mais une convention de lecture s\'impose : props/emits d\'abord, état ensuite, calculés, méthodes, cycle de vie.' },
            { t: 'h3', h: 'Les subtilités qui piquent une fois' },
            { t: 'ul', items: [
              'Pas de `this` (comme toute la Composition API) — tout est variable locale.',
              '`defineExpose(...)` choisit ce qu\'un parent peut atteindre via une ref de template ; **rien n\'est exposé par défaut** — et c\'est une bonne nouvelle (encapsulation).',
              'Le `await` au niveau supérieur est possible — unique dans l'écosystème front. Tu peux écrire `const data = await fetch('/api/produits').then(r => r.json())` DIRECTEMENT dans `<script setup>`. Le prix : le composant devient asynchrone et DOIT être enveloppé dans `<Suspense>` par son parent — qui affiche un fallback (spinner, squelette) tant que le setup n'est pas terminé. Pendant l'attente, le composant n'existe PAS DU TOUT : pas de DOM, pas d'état, pas d'événements. C'est parfait pour le chargement initial de données critiques ; pour le reste, un `onMounted` + état de chargement classique reste plus prévisible et plus facile à déboguer.',
              'Un `<script>` classique peut coexister avec `<script setup>` pour des options non couvertes — ou utilise la macro `defineOptions({ name: "…" })`.'
            ] },
            { t: 'callout', kind: 'tip', h: 'Convention de projet qui paie vite : une seule forme de script par fichier, props/emits en tête, fonctions aux noms de verbes. Le futur toi (et tes collègues) lisent le composant comme on lit une recette.' }
          ],
          errors: [
            { title: 'Importer defineProps depuis "vue"', lang: 'js', bad: 'import { defineProps } from "vue";   // inutile — et trompeur\nconst props = defineProps({ titre: String });', good: 'const props = defineProps({ titre: String });\n// macro de compilation : s\'utilise telle quelle, sans import', why: 'defineProps/defineEmits/defineModel sont transformés à la compilation et n\'existent pas comme exports runtime. Les importer "au cas où" révèle — et entretient — la confusion entre macro et fonction ordinaire.' },
            { title: 'Croire que le parent atteint tout via une ref de template', lang: 'js', bad: '// Parent : enfantRef.value.reset()\n// → TypeError : reset is not a function\n// Enfant en <script setup> : function reset() {…}  (non exposée)', good: '// Enfant :\nfunction reset() { formulaire.value = {}; }\ndefineExpose({ reset });   // la liste blanche explicite\n// Parent : enfantRef.value.reset()  → ok', why: '`<script setup>` rend le composant fermé par défaut : seules les fonctions passées à defineExpose franchissent la frontière. C\'est l\'encapsulation appliquée aux composants — documente ta surface publique avec defineExpose.' }
          ],
          related: ['vue-api-styles', 'vue-props', 'vue-emits', 'vue-sfc']
        }
      ]
    }
  ]
};
/*__SUITE__*/
/* data-vue.js — suite (catégories 5 à 9) */
DEVDOCS.vue.categories.push(

    /* ======================================================
       5. PROPS & ÉVÉNEMENTS
       ====================================================== */
    {
      id: 'props-emits',
      name: 'Props & événements',
      icon: 'hub',
      fiches: [
        {
          id: 'vue-props',
          title: 'defineProps : faire descendre les données',
          icon: 'call_received',
          level: 'Intermédiaire',
          tagline: 'Les props circulent dans un sens : du parent vers l\'enfant — déclarées, typées, validées.',
          intro: 'Un composant utile est **paramétrable** : la carte affiche LE produit qu\'on lui passe. Ce paramétrage, ce sont les props — les "arguments" du composant. Vue les déclare avec `defineProps`, les type, les dote de valeurs par défaut. Mais le vrai sujet n\'est pas la syntaxe, c\'est la RÈGLE : **le flux est strictement descendant**. L\'enfant lit ses props, ne les modifie JAMAIS. Si tu viens de JS vanilla, ça peut sembler arbitraire — « pourquoi ne pas modifier la prop ? » Parce que la prop appartient au PARENT. Si l\'enfant la modifie, il crée une DEUXIÈME source de vérité. Quand un bug affiche un prix fantôme six mois plus tard, tu passes des heures à chercher QUI a modifié quoi. Le flux descendant transforme cette chasse au trésor en certitude : la valeur remonte TOUJOURS au propriétaire. Pour signaler un changement, l\'enfant émet un événement — il propose, il ne décide pas.',
          blocks: [
            { t: 'h3', h: 'Déclarer, typer, valider' },
            { t: 'code', lang: 'js', label: 'Enfant — CarteEtape.vue (script setup)', code:
'const props = defineProps({\n  titre: { type: String, required: true },\n  etapes: { type: Array, default: () => [] },   // objet/tableau : USINE !\n  actif: Boolean,\n  taille: {\n    type: String,\n    default: "moyen",\n    validator: (v) => ["petit", "moyen", "grand"].includes(v)\n  }\n});\n\nconsole.log(props.titre);   // lecture : OK. Écriture : INTERDITE.' },
            { t: 'code', lang: 'js', label: 'Forme "type-only" + withDefaults (TypeScript ready)', code:
'const props = withDefaults(defineProps({\n  titre: String,\n  etapes: Array\n}), {\n  titre: "Sans titre",\n  etapes: () => []\n});' },
            { t: 'p', h: 'Tu peux utiliser la forme courte `defineProps(["titre"])` pour un prototype, mais passe vite à la forme objet : `type`, `required`, `default`, `validator` transforment la déclaration en documentation auto-testée — Vue avertit en développement dès qu\'un parent passe autre chose.' },
            { t: 'h3', h: 'Le sens unique du flux' },
            { t: 'p', h: 'Toute prop appartient au parent. Si l\'enfant la modifie, il casse la traçabilité : qui a changé cette valeur, d\'où ? Vue lève d\'ailleurs un avertissement en développement. Les deux sorties propres quand une valeur doit "remonter" : émettre un événement (`emit("like", id)`), ou un `v-model` sur composant (fiche Formulaires).' },
            { t: 'callout', kind: 'tip', h: 'Côté template, les props s\'écrivent en **kebab-case** : `<CarteProduit :prix-unitaire="450" />` pour une prop déclarée `prixUnitaire`. Vue fait la correspondance, mais la paire camelCase en JS / kebab-case en HTML évite tous les quiproquos.' }
          ],
          errors: [
            { title: 'Muter une prop directement', lang: 'js', bad: 'const props = defineProps({ compteur: Number });\nprops.compteur++;   // warning : évitez de muter une prop !\n// enfant et parent se désynchronisent silencieusement', good: '// 1) valeur locale dérivée de la prop :\nconst local = ref(props.compteur);\nlocal.value++;\n// 2) ou demander au PARENT de changer la source :\nconst emit = defineEmits(["incremente"]);\nemit("incremente");', why: 'La prop est une vue descendante : la modifier localement ne change pas la source, et sera écrasée à la prochaine mise à jour du parent. On copie en état local, ou on émet vers le parent — jamais les deux mondes mélangés.' },
            { title: 'default d\'objet ou tableau sans fonction usine', lang: 'js', bad: 'options: {\n  type: Object,\n  default: { tri: "nom" }   // PARTAGÉ entre toutes les instances !\n}', good: 'options: {\n  type: Object,\n  default: () => ({ tri: "nom" })   // copie fraîche à chaque instance\n}', why: 'Un objet par défaut écrit en dur est la MÊME référence pour toutes les instances du composant : muter les options d\'une carte les muterait partout. La fonction usine garantit une copie neuve — le fameux piège du "mutable default" (même bêtise qu\'en Python, fiche Fonctions du module Python !).' }
          ],
          related: ['vue-emits', 'vue-composants', 'vue-v-model', 'rx-composants-props']
        },

        {
          id: 'vue-emits',
          title: 'defineEmits : remonter l\'information',
          icon: 'call_made',
          level: 'Intermédiaire',
          tagline: 'L\'enfant parle au parent par événements personnalisés : emit("ajouter", charge).',
          intro: 'Les props descendent, les **événements remontent** : c'est l'autre moitié de la communication parent-enfant. Tu pourrais te demander : pourquoi ne pas simplement passer une fonction en prop, comme le fait React avec `onAdd={handler}` ? Parce qu'un événement est un CONTRAT explicite. `defineEmits(['ajouter', 'supprimer'])` dit au parent « voici les signaux que je peux émettre » — documenté, vérifiable par le compilateur, visible dans les DevTools Vue. Une fonction passée en prop, elle, est opaque : rien n'indique QUELLE prop est un callback, ni avec quels arguments elle sera appelée. Le système d'événements de Vue rend explicite ce qui, en React, n'est qu'une convention de nommage (`onXxx`). : c\'est l\'autre moitié de la communication parent-enfant. Un bouton ne sait pas ce que son clic signifie pour le métier ; il annonce `emit("ajouter", article)` et le parent décide. `defineEmits` déclare ces événements (avec validation possible), le parent écoute avec `@ajouter="..."` — exactement comme un événement natif.',
          blocks: [
            { t: 'h3', h: 'Émettre côté enfant' },
            { t: 'code', lang: 'js', label: 'ChampAjout.vue — script', code:
'const emit = defineEmits({\n  // validation de la charge utile : retourner false = avertissement\n  ajouter: (texte) => typeof texte === "string" && texte.length > 0,\n  annuler: null                    // pas de charge utile\n});\n\nfunction valider(saisie) {\n  emit("ajouter", saisie);         // le parent reçoit la chaîne\n}\nfunction abandonner() {\n  emit("annuler");\n}' },
            { t: 'p', h: 'Déclarer les événements sert à trois choses : documenter la surface du composant, activer la **validation** de la charge utile, et empêcher ces événements de retomber dans les attributs hérités. La charge peut contenir plusieurs arguments : `emit("filtre", { ville: "Cotonou", max: 5000 })`.' },
            { t: 'h3', h: 'Écouter côté parent' },
            { t: 'code', lang: 'html', label: 'Parent', code:
'<template>\n  <ChampAjout @ajouter="onAjoute" @annuler="brouillon = \'\'" />\n\n  <ul>\n    <li v-for="t in taches" :key="t.id">{{ t.titre }}</li>\n  </ul>\n</template>\n\n<script setup>\nimport { ref } from "vue";\nimport ChampAjout from "./ChampAjout.vue";\n\nconst taches = ref([]);\nconst brouillon = ref("");\n\nfunction onAjoute(texte) {           // le texte vient de l\'enfant\n  taches.value.push({ id: Date.now(), titre: texte });\n}\n<\/script>' },
            { t: 'p', h: 'Conventions précieuses : nomme tes événements en **kebab-case** (`ajouter-rapide`) — le HTML est insensible à la casse — et préfère un verbe cohérent dans tout le projet. L\'enfant reste ignorant du monde : zéro import depuis le parent, zéro store — donc testable en isolation (fiche Tests).' },
            { t: 'callout', kind: 'info', h: 'Comparaison React : là où React fait passer des callbacks EN PROP (`onAdd={fn}`), Vue institutionnalise l\'événement. Les deux expriment la même idée — Vue rend simplement le contrat explicite et validable via defineEmits (fiche Composants & props du module React).' }
          ],
          errors: [
            { title: 'Confusion de casse entre émission et écoute', lang: 'html', bad: '// enfant : emit("ajouterRapide")\n<!-- parent : @ajouterrapide="…" — ne reçoit RIEN\n     (le HTML a tout passé en minuscules) -->', good: '// enfant : emit("ajouter-rapide")\n<!-- parent : @ajouter-rapide="…" -->\n// kebab-case des deux côtés : zéro ambiguïté', why: 'Les attributs HTML sont insensibles à la casse : un événement camelCase devient illisible côté template. kebab-case partout est la convention officielle pour cette raison précise.' },
            { title: 'Muter la prop ET émettre : double source de vérité', lang: 'js', bad: 'function onChange(v) {\n  props.valeur = v;            // interdit : mutation de prop\n  emit("update", v);           // + événement : qui croire ?\n}', good: 'function onChange(v) {\n  emit("update:valeur", v);    // convention v-model :\n                                // l\'enfant PROPOSE, le parent DÉCIDE\n}', why: 'Si l\'enfant mute la prop ET émet, la valeur vit en deux endroits qui finiront par diverger. Un seul patron : la source vit chez le parent, l\'enfant propose un changement via update:* (fiche v-model sur composants).' }
          ],
          related: ['vue-props', 'vue-v-on', 'vue-v-model', 'rx-evenements']
        }
      ]
    },

    /* ======================================================
       6. PROPRIÉTÉS CALCULÉES & WATCHERS
       ====================================================== */
    {
      id: 'calcule-watch',
      name: 'Calculées & watchers',
      icon: 'calculate',
      fiches: [
        {
          id: 'vue-computed',
          title: 'computed : dériver sans recalculer',
          icon: 'calculate',
          level: 'Intermédiaire',
          tagline: 'Une valeur dérivée, déclarée une fois, recalculée seulement quand ses dépendances bougent.',
          intro: 'Beaucoup de données affichées **se déduisent** de l\'état : total du panier, liste filtrée, initiales d\'un nom. Les calculer dans le template — ou dans une méthode appelée à chaque rendu — répète le travail à chaque rafraîchissement. `computed` déclare la dérivation UNE fois : Vue en trace les dépendances réactives, **met le résultat en cache**, et ne recalcule que si l\'une d\'elles change. C\'est à la fois plus propre et plus rapide.',
          blocks: [
            { t: 'h3', h: 'Le réflexe' },
            { t: 'code', lang: 'js', code:
'import { ref, computed } from "vue";\n\nconst panier = ref([\n  { nom: "Gari", prix: 500, qte: 2 },\n  { nom: "Tchoukoutou", prix: 300, qte: 1 }\n]);\n\n// déclaré UNE fois ; recalculé UNIQUEMENT si panier change\nconst sousTotal = computed(() =>\n  panier.value.reduce((s, p) => s + p.prix * p.qte, 0)\n);\nconst total = computed(() => sousTotal.value * 1.18);   // les computed se chaînent' },
            { t: 'p', h: 'Au template, `{{ sousTotal }}` s\'utilise comme une ref — déballée automatiquement. La fonction passée à `computed` doit être **pure** : mêmes entrées → même sortie, et aucun effet de bord (pas de fetch, pas de mutation d\'état). Une computed qui triche devient imprévisible : son moment d\'exécution est une optimisation, pas une garantie.' },
            { t: 'h3', h: 'La computed en écriture' },
            { t: 'code', lang: 'js', code:
'const prenom = ref("Awa");\nconst nom = ref("Mensah");\n\nconst nomComplet = computed({\n  get: () => prenom.value + " " + nom.value,\n  set: (v) => {\n    const morceaux = v.trim().split(" ");\n    prenom.value = morceaux.shift() ?? "";\n    nom.value = morceaux.join(" ");\n  }\n});\n// <input v-model="nomComplet"> fonctionne désormais dans les DEUX sens !' },
            { t: 'p', h: 'Le couple `get`/`set` permet à une computed d\'être la cible d\'un `v-model` : pattern très puissant pour présenter une vue transformée d\'une donnée (majuscules, unité, devise) tout en écrivant vers la source.' },
            { t: 'h3', h: 'computed, méthode ou watch ?' },
            { t: 'table', head: ['Besoin', 'Bon outil'], rows: [
              ['Valeur dérivée synchrone, affichée', 'computed — cache + pure'],
              ['Recalcul ponctuel sans cache', 'Méthode appelée dans le template'],
              ['Effet quand X change (fetch, log, timer)', 'watch / watchEffect'],
              ['Valeur dérivée asynchrone', 'watch + états, ou composable useFetch']
            ] }
          ],
          errors: [
            { title: 'Confondre computed et watch (le classique)', lang: 'js', bad: 'const total = ref(0);\nwatch(panier, (p) => {\n  total.value = p.reduce((s, x) => s + x.prix, 0);\n}, { deep: true });   // dérivation cachée dans un effet', good: 'const total = computed(() =>\n  panier.value.reduce((s, x) => s + x.prix, 0)\n);', why: 'Une valeur qui SE CALCULE depuis d\'autres est une computed : déclarative, cachée, sans état dupliqué. Avec le watch-dérivation, total existe en double — et peut désynchroniser : c\'est LE contre-exemple à retenir entre les deux fiches.' },
            { title: 'Mettre un effet (fetch, mutation) dans une computed', lang: 'js', bad: 'const profil = computed(() => {\n  fetch("/api/profil/" + id.value);   // effet de bord : combien de fois ?\n  return cacheProfil;\n});', good: 'const profil = ref(null);\nwatch(id, chargerProfil, { immediate: true });\n// ou un composable useFetch (fiche Composables)', why: 'computed s\'exécute quand Vue le juge utile — potentiellement zéro ou plusieurs fois : un effet y devient non déterministe (appels doublés, ordre incertain). Pures pour computed ; effets dans watch/watchEffect.' }
          ],
          related: ['vue-watch', 'vue-ref', 'vue-v-model', 'js-fonctions']
        },

        {
          id: 'vue-watch',
          title: 'watch et watchEffect : réagir aux changements',
          icon: 'visibility',
          level: 'Intermédiaire',
          tagline: 'Déclencher des effets quand une donnée change : appels API, persistance, annulations.',
          intro: '`computed` dérive des valeurs ; `watch` produit des **effets** : envoyer une requête quand l\'id change, sauvegarder un brouillon, démarrer un timer. Vue observe soit explicitement les sources que tu désignes (`watch`), soit automatiquement tout ce que tu lis (`watchEffect`). Bien utilisé, c\'est la colle entre la réactivité et le monde extérieur ; mal utilisé, une machine à doubles états et à boucles infinies.',
          blocks: [
            { t: 'h3', h: 'watch : les sources et leurs formes' },
            { t: 'code', lang: 'js', code:
'import { ref, watch } from "vue";\n\nconst question = ref("");\nconst reponse = ref("Pose une question…");\n\n// 1) une ref directement : le callback reçoit (nouvelle, ancienne)\nwatch(question, async (nouvelle, ancienne) => {\n  reponse.value = "Recherche…";\n  reponse.value = await chercher(nouvelle);   // effet : appel API\n});\n\n// 2) une propriété d\'objet réactif : OBLIGATOIREMENT une fonction\nwatch(() => form.value.ville, (v) => console.log("ville :", v));\n\n// 3) plusieurs sources à la fois\nwatch([prenom, nom], ([p, n]) => console.log(p, n));' },
            { t: 'h3', h: 'Options : deep, immediate, flush' },
            { t: 'p', h: '`{ immediate: true }` exécute le callback dès le départ (pratique pour charger au montage). `{ deep: true }` descend dans l\'objet pour détecter les mutations internes — coûteux sur de grosses structures, à réserver aux cas nécessaires. `{ flush: "post" }` diffère l\'exécution APRÈS la mise à jour du DOM, utile si le callback lit le DOM.' },
            { t: 'h3', h: 'watchEffect : la version automatique' },
            { t: 'code', lang: 'js', code:
'import { ref, watchEffect } from "vue";\n\nconst url = ref("/api/articles?page=1");\nconst data = ref(null);\n\nwatchEffect(async (onCleanup) => {\n  // watchEffect traque TOUTES les sources lues pendant l\'exécution (url, …)\n  const ctrl = new AbortController();\n  onCleanup(() => ctrl.abort());        // annulé si url change avant la fin\n  const res = await fetch(url.value, { signal: ctrl.signal });\n  data.value = await res.json();\n});' },
            { t: 'p', h: 'watchEffect ne prend pas de liste de sources : il se ré-exécute dès que l\'une des valeurs **lues pendant son exécution** change. Plus concis, moins de contrôle (pas d\'ancienne valeur). Le paramètre `onCleanup` enregistre le rattrapage exécuté avant chaque nouvelle exécution — l\'outil précis contre les **courses** : une réponse lente arrivée après une nouvelle requête est simplement annulée.' },
            { t: 'callout', kind: 'warn', h: 'Règle de tri en dix secondes : besoin du RÉSULTAT ? → computed. Besoin de l\'EFFET ? → watch/watchEffect. Jamais une computed qui provoque un effet, jamais un watch qui calcule une valeur affichée.' }
          ],
          errors: [
            { title: 'Observer une propriété d\'objet directement', lang: 'js', bad: 'watch(form.ville, cb);   // observe la VALEUR actuelle (string) : jamais déclenché\nwatch(form, cb);          // sans deep : seul un REMPLACEMENT de form est vu', good: 'watch(() => form.ville, cb);       // fonction = réévaluée à chaque changement\nwatch(form, cb, { deep: true });       // ou deep pour tout l\'objet', why: 'watch a besoin d\'une SOURCE réactive : une ref, ou une fonction qu\'il peut réévaluer. Lui passer une valeur primitive déballée revient à photographier l\'instant T — plus rien ne bouge ensuite.' },
            { title: 'Boucle infinie : le callback modifie ses propres sources', lang: 'js', bad: 'watch(compteur, (v) => {\n  compteur.value = v + 1;   // modifie la source → redéclenche le watch → boucle\n});', good: 'watch(compteur, (v) => {\n  if (v > 100) compteur.value = 0;   // mutation CONDITIONNÉE : un point fixe existe\n});', why: 'Un watcher qui réécrit sa source doit converger : condition d\'arrêt ou calcul idempotent. Sinon : exécution en chaîne jusqu\'à rupture — le symptôme typique : la page gèle avant tout message utile.' }
          ],
          related: ['vue-computed', 'vue-cycle-vie', 'vue-http', 'js-asynchrone']
        }
      ]
    },

    /* ======================================================
       7. CYCLE DE VIE
       ====================================================== */
    {
      id: 'cycle-vie',
      name: 'Cycle de vie',
      icon: 'autorenew',
      fiches: [
        {
          id: 'vue-cycle-vie',
          title: 'Le cycle de vie d\'un composant',
          icon: 'autorenew',
          level: 'Intermédiaire',
          tagline: 'Création, montage, mises à jour, démontage : les bons crochets pour les bons travaux.',
          intro: 'Un composant Vue traverse quatre grandes phases : création (setup, l\'état s\'initialise), montage (insertion dans le DOM réel), mises à jour (quand une donnée réactive change), et démontage (retrait du DOM). Comprendre CET ORDRE est la compétence la plus rentable — parce que 90% des bugs « ça marche une fois sur deux » viennent d\'un code exécuté dans la mauvaise phase. Exemple canonique : tu veux mesurer la hauteur d\'un `<div>` pour afficher une jauge. Dans `setup()`, le `<div>` n\'existe pas encore → `null`. Dans `onMounted()`, le DOM est prêt. Tu oublies de nettoyer un `setInterval` dans `onUnmounted()` ? Il continue de tourner après disparition du composant → écriture dans un état mort. À chaque étape correspond un **hook** : `onMounted`, `onUpdated`, `onUnmounted`… La règle d\'or : tout ce qui s\'ouvre se ferme dans `onUnmounted`.',
          blocks: [
            { t: 'h3', h: 'La chronologie à connaître' },
            { t: 'ol', items: [
              '**setup()** s\'exécute — l\'état existe, le DOM PAS ENCORE (inutile de cibler un élément ici).',
              '**onBeforeMount** → le rendu initial est préparé.',
              '**onMounted** → le composant est dans la page : DOM disponible ; c\'est LE hook des appels API et des intégrations tierces (carte, graphe).',
              '**onBeforeUpdate / onUpdated** → à chaque re-rendu déclenché par la réactivité (onUpdated avec parcimonie : il tire souvent).',
              '**onBeforeUnmount** → dernier instant où tout existe encore.',
              '**onUnmounted** → nettoyage : clearInterval, removeEventListener, fermeture de sockets.'
            ] },
            { t: 'h3', h: 'Le couple ouverture / fermeture' },
            { t: 'code', lang: 'js', code:
'import { ref, onMounted, onUnmounted } from "vue";\n\nconst secondes = ref(0);\nlet timer;\n\nonMounted(async () => {\n  timer = setInterval(() => secondes.value++, 1000);\n  // hook typique aussi : charger les données ici (fiche HTTP)\n});\n\nonUnmounted(() => clearInterval(timer));\n// Sans cette ligne, le timer survit à la destruction du composant : fuite.' },
            { t: 'p', h: 'Deux détails qui payent. Les hooks s\'enregistrent PENDANT `setup` (ou pendant un composable appelé depuis setup). Et ils sont **empilables** : deux `onMounted` s\'exécutent dans l\'ordre — c\'est ce qui permet à chaque composable d\'attacher sa propre hygiène sans coordination avec toi (fiche Composables).' },
            { t: 'callout', kind: 'tip', h: 'Accès DOM : pose une ref de template (`<div ref="graphe">` + `const graphe = ref(null)`), puis lis-la dans `onMounted` — le seul moment où son existence est garantie.' }
          ],
          errors: [
            { title: 'Toucher au DOM dans setup au lieu d\'onMounted', lang: 'js', bad: 'const graphe = ref(null);\ndessinerGraphe(graphe.value);\n// null : setup s\'exécute AVANT le montage, le <div> n\'existe pas', good: 'onMounted(() => dessinerGraphe(graphe.value));\n// DOM garanti : le composant vient d\'être inséré', why: 'setup prépare la logique ; le DOM n\'existe qu\'après le premier rendu. Toute intégration qui touche au DOM (bibliothèque de graphes, mesures de taille) appartient à onMounted.' },
            { title: 'Timers et abonnements fantômes', lang: 'js', bad: 'onMounted(() => {\n  setInterval(rafraichir, 5000);            // survit au démontage…\n  window.addEventListener("resize", maj);   // …et s\'empile à chaque visite\n});', good: 'let id;\nonMounted(() => {\n  id = setInterval(rafraichir, 5000);\n  window.addEventListener("resize", maj);\n});\nonUnmounted(() => {\n  clearInterval(id);\n  window.removeEventListener("resize", maj);\n});', why: 'Quitter le composant ne détruit pas ce que TU as créé : timers et listeners continuent — multipliés à chaque navigation — en appelant un composant mort. Chaque onMounted mérite son onUnmounted symétrique.' }
          ],
          related: ['vue-watch', 'vue-http', 'vue-composables', 'rx-cycle-vie']
        }
      ]
    },

    /* ======================================================
       8. COMPOSANTS & SLOTS
       ====================================================== */
    {
      id: 'composants',
      name: 'Composants & slots',
      icon: 'widgets',
      fiches: [
        {
          id: 'vue-composants',
          title: 'Composer et réutiliser les composants',
          icon: 'widgets',
          level: 'Intermédiaire',
          tagline: 'Penser en briques : composition, héritage des attributs et composants dynamiques.',
          intro: 'Tout ce qu\'on a vu (props, emits, slots à venir) sert un dessein : découper l\'interface en **briques réutilisables**. Mais QUAND découper ? Trois signaux ne trompent pas. 1) Le fichier dépasse ~200 lignes — au-delà, le scroll cache une partie de la logique. 2) Tu écris un commentaire `<!-- PANIER -->` pour t\'y retrouver dans ton propre template — chaque section commentée veut devenir un composant. 3) Deux parties du template utilisent la MÊME structure avec des données différentes (deux listes, trois cartes) — c\'est un composant réutilisable qui attend de naître. À l\'inverse, ne découpe PAS un composant utilisé UNE fois et faisant moins de 50 lignes : la navigation entre fichiers coûterait plus que le bénéfice. La règle n\'est pas « un fichier par écran » mais « une responsabilité par composant ». Cette fiche couvre l\'assemblage : enregistrement, héritage des attributs, et le couteau suisse `<component :is>`.',
          blocks: [
            { t: 'h3', h: 'Enregistrer et imbriquer' },
            { t: 'code', lang: 'html', label: 'PageTaches.vue', code:
'<template>\n  <main>\n    <EnteteTaches :total="taches.length" />\n    <ListeTaches :taches="taches" @supprimer="retirer" />\n  </main>\n</template>\n\n<script setup>\nimport { ref } from "vue";\nimport EnteteTaches from "./EnteteTaches.vue";\nimport ListeTaches from "./ListeTaches.vue";\n// Importé = utilisable dans le template (PascalCase ou kebab-case au choix)\n\nconst taches = ref([{ id: 1, titre: "Apprendre Vue" }]);\nfunction retirer(id) {\n  taches.value = taches.value.filter((t) => t.id !== id);\n}\n<\/script>' },
            { t: 'p', h: 'L\'état vit dans le parent commun le plus proche ("lifting state up", dirait React) : `ListeTaches` reçoit les données en props et signale les faits par events. Cette asymétrie est voulue : une seule source de vérité, des enfants interchangeables.' },
            { t: 'h3', h: 'Héritage d\'attributs (fallthrough)' },
            { t: 'p', h: 'Un attribut passé au composant SANS être déclaré en prop (`class`, `id`, `aria-*`…) n\'est pas perdu : il "tombe" sur l\'élément racine. C\'est ce qui rend `<MonBouton class="pleine-largeur">` possible. Pour un composant multi-racine (fragment), Vue ne sait plus où déposer ces attributs : `inheritAttrs: false` (via `defineOptions`) + `v-bind="$attrs"` te rendent le contrôle manuel.' },
            { t: 'h3', h: 'Composants dynamiques : &lt;component :is&gt;' },
            { t: 'code', lang: 'html', code:
'<template>\n  <nav>\n    <button @click="onglet = OngletProfil">Profil</button>\n    <button @click="onglet = OngletReglages">Réglages</button>\n  </nav>\n\n  <!-- :is choisit le composant rendu : onglets, assistants… -->\n  <KeepAlive>\n    <component :is="onglet" />\n  </KeepAlive>\n</template>\n\n<script setup>\nimport { shallowRef } from "vue";\nimport OngletProfil from "./OngletProfil.vue";\nimport OngletReglages from "./OngletReglages.vue";\n\n// shallowRef : on stocke des COMPOSANTS, inutile de proxifier leur définition\nconst onglet = shallowRef(OngletProfil);\n<\/script>' },
            { t: 'p', h: '`<KeepAlive>` en bonus : il suspend les composants inactifs au lieu de les détruire — l\'onglet quitté conserve son état (saisie, position de scroll) et revient instantanément. Le coût : de la mémoire pour les onglets dormants.' }
          ],
          errors: [
            { title: 'Composant non résolu : import absent ou casse différente', lang: 'html', bad: '<template><liste-taches /></template>\n<!-- [Vue warn]: Failed to resolve component: liste-taches\n     → rien ne s\'affiche -->', good: '<script setup>\nimport ListeTaches from "./ListeTaches.vue";\n<\/script>\n<template><ListeTaches /></template>   <!-- ou <liste-taches /> -->', why: 'En `<script setup>`, un composant doit être IMPORTÉ pour exister dans le template. Le warning "failed to resolve component" signifie presque toujours : import oublié, ou orthographe/casse différente entre la balise et l\'import.' },
            { title: 'Découper trop tard : le composant-cathédrale', lang: 'js', bad: '// PageCommande.vue : 900 lignes — articles + client + paiement + récap\n// chaque modification casse trois sujets, tests impossibles', good: '// PageCommande.vue orchestre ;\n// LigneArticle.vue, AdresseClient.vue, RecapCommande.vue\n// portent chacun UN sujet, testable et réutilisable', why: 'Un composant devient pénible exactement quand on ne peut plus le décrire en une phrase. Découper tôt coûte peu (props/events) ; découper tard coûte une réécriture.' }
          ],
          related: ['vue-props', 'vue-emits', 'vue-slots', 'vue-pinia']
        },

        {
          id: 'vue-slots',
          title: 'Slots : injecter du contenu',
          icon: 'space_dashboard',
          level: 'Intermédiaire',
          tagline: 'Le composant fournit le cadre, le parent le contenu : slots simples, nommés et à portée.',
          intro: 'Les props font passer des **données** ; les slots font passer du **template**. Cette distinction cache une règle de PORTÉE qui surprend tout le monde la première fois : le contenu d'un slot est COMPILÉ dans la portée du PARENT, pas de l'enfant. Si tu écris `<Carte>{{ monTitre }}</Carte>`, la variable `monTitre` est cherchée dans les données du composant qui CONTIENT `<Carte>`, pas dans `Carte` lui-même. Ça semble évident rétrospectivement — tu écris le template dans le fichier du parent, donc ses variables sont celles du parent — mais ça crée une asymétrie fondamentale : l'enfant n'a AUCUN accès aux données insérées via un slot, et le parent n'a AUCUN accès aux données internes de l'enfant. Le seul pont entre les deux mondes, c'est le **scoped slot** : l'enfant PRÊTE explicitement ses données au contenu du slot via des bindings (`:item="ligne"`).. Une carte ne sait pas quel titre ni quels boutons tu mettras dedans : elle dessine le cadre et ménage des ouvertures. Trois niveaux : le slot par défaut (le contenu libre), les slots nommés (plusieurs zones), et les scoped slots — où le composant PRÊTE ses données au contenu injecté, une inversion élégante.',
          blocks: [
            { t: 'h3', h: 'Cadre et contenu' },
            { t: 'code', lang: 'html', label: 'Carte.vue — l\'enfant', code:
'<article class="carte">\n  <header>\n    <slot name="entete">Titre par défaut</slot>   <!-- repli si rien n\'est fourni -->\n  </header>\n  <main>\n    <slot>Contenu par défaut</slot>               <!-- le slot PAR DÉFAUT -->\n  </main>\n  <footer>\n    <slot name="pied" :maj="dateMaj" />           <!-- slot nommé AVEC données prêtées -->\n  </footer>\n</article>' },
            { t: 'code', lang: 'html', label: 'Le parent', code:
'<Carte>\n  <template #entete><h3>Rapport des ventes</h3></template>\n\n  Voici le contenu libre du slot par défaut.\n\n  <template #pied="{ maj }">Mis à jour le {{ maj }}</template>\n</Carte>' },
            { t: 'p', h: 'Tout ce qui est écrit entre les balises du composant tombe dans `<slot />`. Un `<slot name="entete">` attrape le `<template #entete>`. Le texte placé DANS le slot est le **contenu de repli** : rendu seulement si le parent ne fournit rien — parfait pour des composants "configurables mais jamais vides".' },
            { t: 'h3', h: 'Scoped slots : prêter les données de l\'enfant' },
            { t: 'code', lang: 'html', code:
'<!-- Liste.vue : possède la MÉCANIQUE, prête chaque item au parent -->\n<ul>\n  <li v-for="u in utilisateurs" :key="u.id">\n    <slot name="ligne" :utilisateur="u">{{ u.nom }}</slot>\n  </li>\n</ul>\n\n<!-- le parent : décide du RENDU de chaque ligne -->\n<Liste :utilisateurs="users">\n  <template #ligne="{ utilisateur }">\n    <strong>{{ utilisateur.nom }}</strong> — {{ utilisateur.role }}\n  </template>\n</Liste>' },
            { t: 'p', h: 'C\'est le pattern des bibliothèques de composants (tables, listes) : l\'enfant garde la boucle et la mécanique, le parent décide du rendu ligne par ligne. Règle à retenir : le contenu du slot est compilé dans la portée du **parent** — seul ce que l\'enfant lie explicitement au slot (`:utilisateur="u"`) devient accessible à l\'intérieur.' },
            { t: 'callout', kind: 'tip', h: 'La même logique de liste avec trois présentations différentes ? Un scoped slot, et tu n\'écris plus jamais trois composants-listes.' }
          ],
          errors: [
            { title: 'Chercher une donnée de l\'enfant dans le contenu du slot', lang: 'html', bad: '<Liste :utilisateurs="users">\n  <p>{{ utilisateur.nom }}</p>\n  <!-- undefined : ce contenu vit dans la portée du PARENT -->\n</Liste>', good: '<Liste :utilisateurs="users">\n  <template #ligne="{ utilisateur }">\n    <p>{{ utilisateur.nom }}</p>   <!-- fourni par le slot de l\'enfant -->\n  </template>\n</Liste>', why: 'Le contenu placé entre les balises est compilé avec les données du parent. Les données internes de l\'enfant ne remontent que via les bindings du slot — c\'est exactement le rôle du scoped slot.' },
            { title: 'Contenu qui atterrit dans le mauvais slot', lang: 'html', bad: '<Carte>\n  <h3>Titre</h3>            <!-- ira au slot PAR DÉFAUT, pas à "entete" -->\n  <template #pied>…</template>\n</Carte>', good: '<Carte>\n  <template #entete><h3>Titre</h3></template>\n  Contenu du slot par défaut…\n  <template #pied>…</template>\n</Carte>', why: 'Seul un `<template #nom>` vise un slot nommé ; tous les éléments « en vrac » alimentent le slot par défaut. Résultat classique de l\'erreur : un titre affiché au mauvais endroit — ou deux fois si le slot par défaut est aussi rendu.' }
          ],
          related: ['vue-composants', 'vue-props', 'vue-emits']
        }
      ]
    },

    /* ======================================================
       9. FORMULAIRES
       ====================================================== */
    {
      id: 'formulaires',
      name: 'Formulaires',
      icon: 'edit_note',
      fiches: [
        {
          id: 'vue-v-model',
          title: 'v-model : la liaison bidirectionnelle',
          icon: 'input',
          level: 'Débutant',
          tagline: 'Un raccourci pour :value + @input — sur champs texte, cases, listes, et même tes composants.',
          intro: 'Les formulaires veulent écrire dans l\'état à chaque frappe : `v-model` synchronise un contrôle et une donnée **dans les deux sens**. Sous le capot, c\'est du sucre : `:value="x"` + `@input="x = $event.target.value"`. Savoir ça démystifie tout — les modificateurs (`.lazy`, `.number`, `.trim`), le comportement selon le type de contrôle, et surtout le `v-model` sur TES composants, mécanique du `update:modelValue`.',
          blocks: [
            { t: 'h3', h: 'Chaque contrôle a son comportement' },
            { t: 'code', lang: 'html', code:
'<template>\n  <input v-model="nom" type="text" placeholder="Ton nom">\n  <textarea v-model="bio" rows="3"></textarea>\n\n  <!-- case → booléen (true-value/false-value pour des valeurs métier) -->\n  <label><input v-model="accepte" type="checkbox"> J\'accepte les CGU</label>\n\n  <!-- radio : la valeur de l\'option choisie -->\n  <label><input v-model="langue" type="radio" value="fon"> Fon</label>\n  <label><input v-model="langue" type="radio" value="fr"> Français</label>\n\n  <select v-model="ville">\n    <option disabled value="">Choisis ta ville</option>\n    <option v-for="v in villes" :key="v" :value="v">{{ v }}</option>\n  </select>\n</template>\n\n<script setup>\nimport { ref } from "vue";\nconst nom = ref("");\nconst bio = ref("");\nconst accepte = ref(false);\nconst langue = ref("");\nconst ville = ref("");     // "" = l\'option disabled "Choisis…" s\'affiche\nconst villes = ["Cotonou", "Abomey-Calavi", "Porto-Novo", "Parakou"];\n<\/script>' },
            { t: 'h3', h: 'Modificateurs de v-model' },
            { t: 'ul', items: [
              '**`.lazy`** : synchronise à l\'événement `change` (perte de focus) au lieu de chaque frappe — champs coûteux, recherche distante.',
              '**`.number`** : convertit en nombre (`parseFloat`) — indispensable pour `<input type="number">`, sinon tu stockes des chaînes.',
              '**`.trim`** : supprime les espaces de bord — pseudo, e-mail. Ils se chaînent : `v-model.trim.lazy="recherche"`.'
            ] },
            { t: 'h3', h: 'v-model sur TES composants' },
            { t: 'code', lang: 'html', label: 'ChampTexte.vue — un composant compatible v-model', code:
'<template>\n  <label>\n    {{ label }}\n    <input :value="modelValue"\n           @input="emit(\'update:modelValue\', $event.target.value)">\n  </label>\n</template>\n\n<script setup>\ndefineProps({ modelValue: String, label: String });\nconst emit = defineEmits(["update:modelValue"]);\n<\/script>\n\n<!-- le parent : -->\n<ChampTexte v-model="nom" label="Nom" />\n<!-- ≡ <ChampTexte :modelValue="nom" @update:modelValue="nom = $event" /> -->' },
            { t: 'p', h: 'La convention `modelValue` + `update:modelValue` suffit pour UN v-model. Pour PLUSIEURS liaisons sur le même composant, des arguments : `v-model:prenom="p" v-model:nom="n"` (props `prenom`/`nom`, événements `update:prenom`/`update:nom`). Un formulaire de dix champs devient dix composants propres. (Vue 3.4+ offre aussi la macro `defineModel()`, encore plus courte.)' }
          ],
          errors: [
            { title: 'Mélanger :value et v-model sur le même contrôle', lang: 'html', bad: '<input :value="nom" v-model="nom">\n<!-- deux gestionnaires se concurrencent : comportement imprévisible -->', good: '<input v-model="nom">\n<!-- v-model EST déjà :value + @input — une seule stratégie -->', why: 'Doubler la liaison crée deux sources qui s\'écrasent. Un contrôle = une seule stratégie : soit v-model (99 % des cas), soit :value + @input manuel quand tu veux intercepter chaque frappe.' },
            { title: 'Valeur initiale undefined : le select qui affiche n\'importe quoi', lang: 'js', bad: 'const ville = ref();   // undefined\n// aucune option ne correspond : le navigateur affiche\n// une valeur au hasard (souvent la première)', good: 'const ville = ref("");\n// "" correspond à l\'option placeholder : <option disabled value="">', why: 'v-model sur un select choisit l\'option DONT LA VALUE correspond exactement ; undefined ne correspond à rien, et l\'affichage échappe alors à ton contrôle. Initialiser à "" (ou à la valeur du placeholder) garde la main.' }
          ],
          related: ['vue-v-bind', 'vue-v-on', 'vue-validation', 'html-formulaires', 'rx-formulaires']
        },

        {
          id: 'vue-validation',
          title: 'Valider un formulaire proprement',
          icon: 'fact_check',
          level: 'Intermédiaire',
          tagline: 'Règles près de l\'état, erreurs calculées, retours utiles — et validation côté serveur, toujours.',
          intro: 'La validation n\'a rien de spécifique à Vue : c\'est de la donnée dérivée (les erreurs) affichée au bon moment. Le pattern robuste en Composition API : un état de formulaire `reactive`, une `computed` d\'erreurs, un drapeau "touché" par champ pour ne pas crier trop tôt. Pour les gros formulaires, VeeValidate ou un schéma Zod/Valibot centralisent les règles — même philosophie, plus de confort.',
          blocks: [
            { t: 'h3', h: 'Le pattern computed d\'erreurs' },
            { t: 'code', lang: 'js', code:
'import { reactive, computed, ref } from "vue";\n\nconst form = reactive({ nom: "", email: "", mdp: "" });\nconst touche = reactive({ nom: false, email: false, mdp: false });\nconst envoye = ref(false);\n\nconst erreurs = computed(() => {\n  const e = {};\n  if (!form.nom.trim()) e.nom = "Le nom est requis.";\n  if (!form.email.includes("@") || !form.email.includes("."))\n    e.email = "Adresse e-mail invalide.";\n  if (form.mdp.length < 8) e.mdp = "8 caractères minimum.";\n  return e;\n});\n\nfunction valider() {\n  envoye.value = true;\n  if (Object.keys(erreurs.value).length) return;   // soumission bloquée\n  // …envoi au serveur (fiche HTTP) — la VRAIE validation est là-bas\n}' },
            { t: 'code', lang: 'html', label: 'Le template', code:
'<form @submit.prevent="valider" novalidate>\n  <input v-model.trim="form.nom" placeholder="Nom"\n         @blur="touche.nom = true"\n         :aria-invalid="!!erreurs.nom && touche.nom">\n  <p v-if="touche.nom && erreurs.nom" class="erreur">{{ erreurs.nom }}</p>\n\n  <input v-model="form.email" type="email" placeholder="E-mail"\n         @blur="touche.email = true">\n  <p v-if="touche.email && erreurs.email" class="erreur">{{ erreurs.email }}</p>\n\n  <input v-model="form.mdp" type="password" placeholder="Mot de passe"\n         @blur="touche.mdp = true">\n  <p v-if="(touche.mdp || envoye) && erreurs.mdp" class="erreur">{{ erreurs.mdp }}</p>\n\n  <button :disabled="envoye && !!Object.keys(erreurs).length">Créer mon compte</button>\n</form>' },
            { t: 'p', h: 'Trois décisions UX à connaître. **1)** Valider au `blur` (drapeau `touche`) : ne jamais afficher d\'erreur sur un champ pas encore visité. **2)** À la soumission, TOUT afficher (`envoye`). **3)** `novalidate` sur le formulaire : tu maîtrises le message, la langue et le style — les bulles natives du navigateur ne se mélangent pas à ton design.' },
            { t: 'callout', kind: 'warn', h: 'La validation côté client est un CONFORT, jamais une sécurité : n\'importe qui peut soumettre à la main (curl, Postman). Le serveur revalide tout — même principe que dans les modules Laravel et Django : la vraie frontière est côté serveur.' }
          ],
          errors: [
            { title: 'Afficher les erreurs dès la première frappe', lang: 'html', bad: '<input v-model="form.email" type="email">\n<p v-if="erreurs.email">{{ erreurs.email }}</p>\n<!-- "E-mail invalide" avant même d\'avoir fini de taper… -->', good: '<input v-model="form.email" type="email" @blur="touche.email = true">\n<p v-if="touche.email && erreurs.email">{{ erreurs.email }}</p>', why: 'Chaque règle s\'évalue sur un état incomplet pendant la saisie : afficher immédiatement agresse l\'utilisateur avant qu\'il ait eu sa chance. Laisse le blur (ou la soumission) déclencher l\'affichage.' },
            { title: 'Se reposer sur required comme SEULE validation', lang: 'html', bad: '<form @submit.prevent="valider">\n  <input required v-model="form.nom">\n  <!-- @submit.prevent court-circuite AUSSI la validation native :\n       required est tout simplement ignoré -->', good: '<form @submit.prevent="valider" novalidate>\n  <!-- règles explicites dans la computed erreurs\n       + revalidation côté serveur (obligatoire) -->', why: 'Dès que @submit.prevent intercepte, la validation native ne s\'exprime plus (sauf appel manuel à checkValidity()). Pattern SPA = règles déclarées en JS ; les attributs HTML restent un filet d\'accessibilité, pas une stratégie.' }
          ],
          related: ['vue-v-model', 'vue-computed', 'html-formulaires', 'vue-http']
        }
      ]
    }
);
/*__FIN_PART2__*/
/* data-vue.js — suite (catégories 10 à 15) */
DEVDOCS.vue.categories.push(

    /* ======================================================
       10. VUE ROUTER
       ====================================================== */
    {
      id: 'routing',
      name: 'Vue Router',
      icon: 'route',
      fiches: [
        {
          id: 'vue-router',
          title: 'Vue Router : les bases',
          icon: 'route',
          level: 'Intermédiaire',
          tagline: 'Routes, RouterLink, RouterView, paramètres dynamiques et lazy loading — la colonne vertébrale de la SPA.',
          intro: 'Une application monopage *simule* la navigation : l'URL change dans la barre d'adresse, le bouton « précédent » du navigateur fonctionne, mais **aucune requête HTTP n'est envoyée au serveur**. Tout se joue côté client. Le routeur intercepte le clic sur un `<RouterLink>`, modifie l'URL via l'API History du navigateur (`pushState`), et remplace le contenu de `<RouterView>` par le composant correspondant — le tout en quelques millisecondes, sans flash blanc, sans rechargement. C'est ce qui donne aux SPA leur fluidité… mais c'est aussi ce qui cause LE bug numéro un du premier déploiement : rafraîchir la page (F5) sur `/article/42` envoie cette URL AU SERVEUR, qui répond 404 parce qu'il ne connaît que `index.html`. La solution : une règle de rewrite serveur qui renvoie TOUJOURS `index.html`, laissant le routeur côté client reprendre la main. : l\'URL change, l\'historique fonctionne, mais le serveur n\'est interrogé que pour des données. **Vue Router** est le routeur officiel : il associe des URL à des composants et rend le bon selon l\'adresse. Cette fiche pose les fondations ; la suivante ajoute navigation programmatique et gardiens.',
          blocks: [
            { t: 'h3', h: 'Installation et câblage' },
            { t: 'code', lang: 'bash', code:
'npm install vue-router@4\n# (ou coche "Router" dans npm create vue@latest : tout est déjà câblé)' },
            { t: 'code', lang: 'js', label: 'src/router/index.js', code:
'import { createRouter, createWebHistory } from "vue-router";\nimport Accueil from "../views/Accueil.vue";\n\nconst routes = [\n  { path: "/", component: Accueil },\n  // segment DYNAMIQUE : /article/12, /article/42…\n  { path: "/article/:id", name: "article", component: () => import("../views/Article.vue"), props: true },\n  // import EN FONCTION = chargement paresseux (code splitté)\n  { path: "/a-propos", component: () => import("../views/APropos.vue") },\n  // attrape-tout 404 :\n  { path: "/:pathMatch(.*)*", component: () => import("../views/Introuvable.vue") }\n];\n\nexport default createRouter({\n  history: createWebHistory(),\n  routes\n});' },
            { t: 'code', lang: 'js', label: 'src/main.js', code:
'import { createApp } from "vue";\nimport App from "./App.vue";\nimport router from "./router";\n\ncreateApp(App).use(router).mount("#app");' },
            { t: 'h3', h: 'La coquille : RouterLink et RouterView' },
            { t: 'code', lang: 'html', label: 'App.vue', code:
'<template>\n  <nav>\n    <!-- RouterLink = vrai lien <a>, MAIS sans rechargement de page -->\n    <RouterLink to="/">Accueil</RouterLink>\n    <RouterLink to="/a-propos">À propos</RouterLink>\n  </nav>\n\n  <!-- RouterView = la sortie : le composant de la route courante s\'y rend -->\n  <RouterView />\n</template>' },
            { t: 'p', h: '`RouterLink` génère un vrai `<a href>` (accessibilité, clic droit, SEO) mais intercepte le clic : pas de rechargement. La classe `router-link-active` est ajoutée au lien actif — style-la, c\'est ton indicateur de navigation gratuit.' },
            { t: 'h3', h: 'Paramètres et chargement paresseux' },
            { t: 'p', h: 'Le segment `:id` se lit de deux façons dans le composant cible : `useRoute()` (`route.params.id`, réactif — pense à `watch`er si le même composant sert plusieurs ids), ou en **prop** grâce à `props: true` sur la route, plus testable. Et remarque l\'import en fonction `() => import("...")` : la route est chargée **à la demande** — ta page d\'accueil ne paie pas le code de la page admin.' }
          ],
          errors: [
            { title: 'Naviguer avec <a href> dans une SPA', lang: 'html', bad: '<a href="/article/3">Lire</a>\n<!-- rechargement complet : état perdu, lenteur, flash blanc -->', good: '<RouterLink :to="\'/article/\' + article.id">Lire</RouterLink>\n<!-- ou mieux, par route nommée :\n     :to="{ name: \'article\', params: { id: article.id } }" -->', why: 'Un lien classique demande une NOUVELLE page au serveur et détruit l\'application en mémoire. RouterLink navigue côté client : instantané, état conservé. La route nommée, en bonus, survit au changement d\'URL.' },
            { title: 'Le mode history qui répond 404 en production', lang: 'js', bad: '// createWebHistory() → URL propres /article/3\n// déployé tel quel : F5 sur /article/3 → 404 serveur', good: '// soit une règle serveur qui renvoie index.html pour toutes les routes\n// (rewrite nginx/Apache — même principe que pour Laravel/Django)\n// soit createWebHashHistory() → /#/article/3\n// (la partie après # n\'est jamais envoyée au serveur)', why: 'Avec des URL "propres", le navigateur demande /article/3 AU SERVEUR, qui ne connaît que index.html. Sans rewrite, rafraîchir = 404 : le piège nº1 du premier déploiement de SPA.' }
          ],
          related: ['vue-guards', 'vue-vite', 'vue-composants']
        },

        {
          id: 'vue-guards',
          title: 'Navigation programmatique & guards',
          icon: 'policy',
          level: 'Avancé',
          tagline: 'router.push pour naviguer par le code, beforeEach pour autoriser — la douane de tes routes.',
          intro: 'Deux outils complètent le routeur. La **navigation programmatique** (`useRouter`) : rediriger après une connexion, aller au détail après un clic sur une carte. Les **guards de navigation** (`beforeEach` et compagnie) : des frontières exécutées avant chaque changement de route — idéales pour l\'authentification, les permissions, ou le fameux "vous avez des changements non sauvegardés".',
          blocks: [
            { t: 'h3', h: 'Naviguer depuis le code' },
            { t: 'code', lang: 'js', code:
'import { useRouter, useRoute } from "vue-router";\n\nconst router = useRouter();   // le routeur = les ACTIONS\nconst route = useRoute();     // la route courante = la LECTURE (réactive)\n\nrouter.push("/tableau-de-bord");                          // par chemin\nrouter.push({ name: "article", params: { id: 42 } });     // par route NOMMÉE\nrouter.push({ path: "/recherche", query: { q: "vue" } }); // → /recherche?q=vue\nrouter.replace("/connexion");   // pareil, SANS entrée d\'historique (login !)\nrouter.back();                  // retour arrière' },
            { t: 'p', h: 'Distingue bien les deux : `useRoute()` donne la route **courante** (params, query, meta — réactive) ; `useRouter()` donne le **routeur** (push, replace, back). Et nomme tes routes (`name: "article"`) : si l\'URL change, la référence, elle, tient bon.' },
            { t: 'h3', h: 'Les guards : la douane' },
            { t: 'code', lang: 'js', label: 'src/router/index.js', code:
'import { useAuthStore } from "../stores/auth";   // Pinia — fiche dédiée\n\nconst routes = [\n  { path: "/admin", component: () => import("../views/Admin.vue"),\n    meta: { requiresAuth: true } },          // drapeau libre, lu par le guard\n  { path: "/connexion", name: "connexion", component: () => import("../views/Connexion.vue") }\n];\n\nconst router = createRouter({ history: createWebHistory(), routes });\n\nrouter.beforeEach((to, from) => {\n  const auth = useAuthStore();\n  if (to.meta.requiresAuth && !auth.connecte) {\n    // retourner une route = rediriger ; ne rien retourner = laisser passer\n    return { name: "connexion", query: { redirect: to.fullPath } };\n  }\n});\n\nexport default router;' },
            { t: 'p', h: 'Le guard reçoit `to` (destination) et `from` (origine) ; sa **valeur de retour** décide : rien/true → passage, false → annulation, objet route → redirection. Les `meta` sont ta liberté : `requiresAuth`, `role: "admin"`… D\'autres niveaux existent — par route (`beforeEnter`), dans le composant (`onBeforeRouteUpdate`, `onBeforeRouteLeave`) — même logique, autre granularité.' },
            { t: 'callout', kind: 'warn', h: 'Un guard n\'est pas une sécurité, seulement de l\'UX : tout le code côté client est lisible. Les données sensibles exigent un contrôle CÔTÉ SERVEUR — exactement comme les middlewares de Django et Laravel (même principe, autres modules).' }
          ],
          errors: [
            { title: 'Boucle de redirection : le guard renvoie vers sa propre route', lang: 'js', bad: 'router.beforeEach((to) => {\n  if (!auth.connecte) return { name: "connexion" };\n});\n// /connexion elle-même est interceptée → "infinite redirect"', good: 'router.beforeEach((to) => {\n  if (to.meta.requiresAuth && !auth.connecte && to.name !== "connexion")\n    return { name: "connexion" };\n});\n// la page de secours est EXCLUE de la condition', why: 'Une redirection DÉCLENCHE une nouvelle navigation, qui repasse le guard : s\'il redirige encore, boucle infinie (le routeur finit par avorter). Exclus toujours la destination de secours de ta condition.' },
            { title: 'Oublier de décider : navigation figée sans verdict', lang: 'js', bad: 'router.beforeEach(async (to) => {\n  await verifierSession();\n  // et si ça échoue ? aucune branche ne retourne quoi que ce soit\n});', good: 'router.beforeEach(async (to) => {\n  try {\n    await verifierSession();\n  } catch {\n    return { name: "connexion" };   // TOUS les chemins décident\n  }\n});', why: 'Le guard est une promesse de décision : chaque branche doit aboutir (retour explicite, ou next() dans l\'ancien style). Une navigation sans verdict laisse l\'URL changée… et l\'écran vide.' }
          ],
          related: ['vue-router', 'vue-pinia', 'vue-http']
        }
      ]
    },

    /* ======================================================
       11. GESTION D\'ÉTAT : PINIA
       ====================================================== */
    {
      id: 'etat-pinia',
      name: 'Gestion d\'état : Pinia',
      icon: 'inventory_2',
      fiches: [
        {
          id: 'vue-pinia',
          title: 'Pinia : l\'état partagé sans douleur',
          icon: 'inventory_2',
          level: 'Intermédiaire',
          tagline: 'Stores, state, getters, actions — quand les props ne suffisent plus, et pas avant.',
          intro: 'Tant que la donnée voyage parent → enfant, props et events suffisent. La question qui amène à Pinia n'est pas « comment partager de l'état », c'est « comment partager de l'état entre des composants qui n'ont AUCUN ancêtre commun proche ». Le compteur du panier dans l'en-tête et la liste des articles dans la page produit : ils sont frères dans l'arbre, leur premier parent commun est la racine de l'app. Faire remonter l'état du panier jusqu'à la racine pour le redescendre partout, c'est du **prop drilling** — chaque composant intermédiaire reçoit et transmet des données qui ne le concernent pas, alourdissant sa signature et rendant tout refactoring périlleux. Pinia résout ça en offrant des entrepôts réactifs accessibles DEPUIS N'IMPORTE OÙ dans l'arbre, sans que les composants intermédiaires aient à les connaître.',
          blocks: [
            { t: 'h3', h: 'Créer et câbler' },
            { t: 'code', lang: 'bash', code: 'npm install pinia' },
            { t: 'code', lang: 'js', label: 'src/main.js', code:
'import { createApp } from "vue";\nimport { createPinia } from "pinia";\nimport App from "./App.vue";\n\ncreateApp(App).use(createPinia()).mount("#app");' },
            { t: 'code', lang: 'js', label: 'src/stores/panier.js — style "setup"', code:
'import { ref, computed } from "vue";\nimport { defineStore } from "pinia";\n\n// defineStore("nom", setup) — tout ce que retourne la fonction est le store\nexport const usePanierStore = defineStore("panier", () => {\n  // state\n  const articles = ref([]);\n\n  // getters\n  const total = computed(() =>\n    articles.value.reduce((s, a) => s + a.prix, 0)\n  );\n\n  // actions (synchrones ou asynchrones)\n  function ajouter(article) {\n    articles.value.push(article);\n  }\n  async function commander() {\n    await fetch("/api/commandes", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify(articles.value)\n    });\n    articles.value = [];\n  }\n\n  return { articles, total, ajouter, commander };\n});' },
            { t: 'p', h: 'Deux styles existent — options (`state`/`getters`/`actions`, proche de l\'Options API) et **setup** (ci-dessus : ref = state, computed = getters, fonctions = actions). Le style setup est le plus souple : tout ce que tu sais de la Composition API s\'y applique — watch, composables — et le typage suit naturellement.' },
            { t: 'h3', h: 'Consommer : le piège storeToRefs' },
            { t: 'code', lang: 'html', label: 'Dans un composant', code:
'<template>\n  <p>{{ articles.length }} article(s) — total : {{ total }} F</p>\n  <button @click="panier.ajouter({ nom: \'Gari\', prix: 500 })">+ Gari</button>\n</template>\n\n<script setup>\nimport { storeToRefs } from "pinia";\nimport { usePanierStore } from "./stores/panier";\n\nconst panier = usePanierStore();\n\n// ÉTAT : extraire via storeToRefs pour garder la réactivité\nconst { articles, total } = storeToRefs(panier);\n// ACTIONS : accès direct sur le store, pas de déstructuration nécessaire\npanier.ajouter({ nom: "Tchoukoutou", prix: 300 });\n<\/script>' },
            { t: 'p', h: 'Déstructurer un store directement (`const { articles } = usePanierStore()`) reproduit le piège `reactive()` de la fiche Réactivité : valeurs débranchées, UI figée. `storeToRefs` extrait l\'état en refs synchronisées ; les actions, elles, s\'appellent directement sur le store (ou se déstructurent sans risque — ce sont de simples fonctions).' },
            { t: 'h3', h: 'Store ou pas store ?' },
            { t: 'table', head: ['Situation', 'Outil adapté'], rows: [
              ['Donnée d\'UN composant et ses enfants', 'ref/reactive local + props/events'],
              ['Communication entre 2-3 composants proches', 'props/events, ou provide/inject'],
              ['Donnée transverse : session, panier, préférences', '**Pinia**'],
              ['Cache de requêtes API, synchronisation serveur', 'TanStack Query — module dédié (vue-query existe)']
            ] },
            { t: 'callout', kind: 'tip', h: 'Pinia s\'intègre aux DevTools Vue : timeline des mutations, inspection des stores, voyage dans le temps. Installe l\'extension navigateur "Vue.js devtools" dès maintenant — déboguer un store à l\'aveugle, c\'est du temps perdu.' }
          ],
          errors: [
            { title: 'Déstructurer le store sans storeToRefs', lang: 'js', bad: 'const panier = usePanierStore();\nconst { articles, total } = panier;   // débranché : l\'UI ne suit plus\narticles.value.push(item);            // (d\'ailleurs articles n\'est même pas une ref)', good: 'import { storeToRefs } from "pinia";\nconst panier = usePanierStore();\nconst { articles, total } = storeToRefs(panier);   // état : refs synchronisées\npanier.ajouter(item);                              // action : via le store', why: 'Même mécanique que reactive() : l\'état du store vit derrière des refs/proxies ; extraire les valeurs les débranche. storeToRefs conserve le lien — c\'est le toRefs du store.' },
            { title: 'Tout mettre dans le store "au cas où"', lang: 'js', bad: '// stores/formulaire.js : brouillonLogin, caseCGU, placeholderRecherche…\n// → store poubelle : n\'importe quel écran modifie tout,\n//   bugs d\'interférence entre pages sans rapport', good: '// local : const brouillon = ref("");        // formulaire\n// store : session, panier, thème — les données réellement TRANSVERSALES', why: 'Un store global multiplie les dépendances invisibles : déboguer devient une chasse à "qui a modifié ça ?". Règle saine : le store n\'accueille que ce qui doit survivre à un changement de page ou servir plusieurs branches de l\'arbre.' }
          ],
          related: ['vue-reactive', 'vue-composables', 'vue-guards', 'tq-concepts']
        }
      ]
    },

    /* ======================================================
       12. REQUÊTES HTTP
       ====================================================== */
    {
      id: 'http',
      name: 'Requêtes HTTP',
      icon: 'cloud_sync',
      fiches: [
        {
          id: 'vue-http',
          title: 'Requêtes HTTP : fetch, chargement, erreurs',
          icon: 'cloud_sync',
          level: 'Intermédiaire',
          tagline: 'Appeler une API depuis Vue, c\'est toujours : données + chargement + erreur — trois refs et des réflexes.',
          intro: 'Vue ne fournit pas de client HTTP : on utilise `fetch` (natif) ou axios. La vraie compétence n\'est pas l\'appel — `fetch(url)` tout le monde sait faire — c\'est l\'**orchestre des états**. Une requête réseau n\'a pas deux issues mais TROIS : idle → chargement → succès OU erreur. Ces trois états s\'EXCLUENT — pas de chargement ET erreur simultanés. Les représenter avec trois `ref` (`data`, `chargement`, `erreur`) est le pattern le plus robuste : l\'UI devient un simple `v-if/v-else-if/v-else`. L\'alternative — un objet unique `{ statut: \'idle\' | \'loading\' | \'ok\' | \'error\', data, erreur }` — est encore plus propre (source unique, combinaisons impossibles éliminées). C\'est une machine à états appliquée au chargement de données. Où déclencher (onMounted ou watcher), comment éviter les courses quand l\'utilisateur clique plus vite que le réseau — ces sujets sont exactement ceux que TanStack Query industrialise (vue-query existe).',
          blocks: [
            { t: 'h3', h: 'Le trio d\'état minimal' },
            { t: 'code', lang: 'js', code:
'import { ref, onMounted } from "vue";\n\nconst utilisateurs = ref([]);     // tableau vide, JAMAIS null (fiche v-for)\nconst chargement = ref(false);\nconst erreur = ref(null);\n\nonMounted(async () => {\n  chargement.value = true;\n  erreur.value = null;\n  try {\n    const res = await fetch("https://api.exemple.bj/utilisateurs");\n    if (!res.ok) throw new Error("HTTP " + res.status);   // 404/500 ne lancent PAS !\n    utilisateurs.value = await res.json();\n  } catch (e) {\n    erreur.value = e.message;\n  } finally {\n    chargement.value = false;      // éteint le spinner dans TOUS les cas\n  }\n});' },
            { t: 'code', lang: 'html', label: 'Le template, état par état', code:
'<template>\n  <p v-if="chargement">Chargement…</p>\n  <p v-else-if="erreur" class="erreur">Échec : {{ erreur }}</p>\n  <ul v-else>\n    <li v-for="u in utilisateurs" :key="u.id">{{ u.nom }}</li>\n  </ul>\n</template>' },
            { t: 'p', h: 'Points clés : listes initialisées à `ref([])` ; lecture de `res.ok` AVANT `res.json()` (les erreurs HTTP ne rejettent pas la promesse !) ; `finally` pour éteindre le chargement quoi qu\'il arrive. Ce squelette couvre 90 % des cas — avant de devenir un composable (fiche suivante).' },
            { t: 'h3', h: 'fetch ou axios ?' },
            { t: 'table', head: ['Critère', 'fetch (natif)', 'axios'], rows: [
              ['Installation', 'Aucune', 'npm install axios'],
              ['Erreurs HTTP', 'Manuelles (res.ok)', 'Rejetées automatiquement'],
              ['JSON', 'res.json() explicite', 'Automatique (res.data)'],
              ['Intercepteurs / instances', '—', 'Natifs (en-tête d\'auth centralisé, refresh au 401)'],
              ['Annulation', 'AbortController', 'AbortController aussi']
            ] },
            { t: 'p', h: 'Pour quelques appels : `fetch` suffit largement, et c\'est la norme web (fiche fetch du module JS). Pour un projet avec authentification par jeton, axios et ses intercepteurs (poser l\'en-tête UNE fois, rafraîchir le jeton au 401) rentabilisent vite l\'installation.' },
            { t: 'callout', kind: 'tip', h: 'Dès que tu veux du **cache, de la déduplication, de la revalidation, de la pagination infinie** : ne réinvente pas — TanStack Query a une déclinaison officielle pour Vue (`@tanstack/vue-query`). Les concepts sont identiques (fiche Concepts du module TanStack), seule la colle syntaxique change.' }
          ],
          errors: [
            { title: 'Oublier res.ok : traiter un 404 comme des données', lang: 'js', bad: 'const res = await fetch(url);\nconst data = await res.json();\n// 404/500 passent AUSSI ici : data = le corps d\'erreur, bug trois lignes plus loin', good: 'const res = await fetch(url);\nif (!res.ok) throw new Error("HTTP " + res.status);\nconst data = await res.json();', why: 'fetch ne rejette que sur erreur RÉSEAU ; une réponse 500 est une "réussite" technique de la promesse. Sans contrôle de res.ok, ton catch reste muet et l\'erreur explose au mauvais endroit, loin de sa cause.' },
            { title: 'Course de requêtes : la réponse lente écrase la récente', lang: 'js', bad: 'const api = "/api/recherche?q=";\nwatch(terme, async (t) => {\n  resultats.value = await (await fetch(api + t)).json();\n});\n// taper "ab" puis "abc" vite : la réponse de "ab"\n// peut arriver APRÈS celle de "abc" → écran incohérent', good: 'watch(terme, async (t, ancienne, onCleanup) => {\n  const ctrl = new AbortController();\n  onCleanup(() => ctrl.abort());   // nouvelle exécution = ancienne annulée\n  const res = await fetch(api + t, { signal: ctrl.signal });\n  resultats.value = await res.json();\n});', why: 'Les réponses arrivent dans le désordre : sans annulation, la dernière AFFICHÉE n\'est pas forcément la dernière DEMANDÉE. onCleanup (watch/watchEffect) + AbortController est le remède propre et natif — la version Zakaria du bon vieux flag "ignore les réponses périmées".' }
          ],
          related: ['js-fetch', 'js-asynchrone', 'vue-cycle-vie', 'vue-composables', 'tq-concepts']
        }
      ]
    },

    /* ======================================================
       13. COMPOSABLES
       ====================================================== */
    {
      id: 'composables',
      name: 'Composables',
      icon: 'extension',
      fiches: [
        {
          id: 'vue-composables',
          title: 'Composables : la logique réutilisable',
          icon: 'extension',
          level: 'Avancé',
          tagline: 'Extraire de la logique à état dans des fonctions use* : les "hooks" de Vue, sans leurs règles.',
          intro: 'Quand deux composants ont besoin de la MÊME logique réactive — suivre la souris, lire localStorage, paginer une API — ni les props ni les **mixins** (l\'ancienne solution de Vue 2) n\'offrent une réponse propre. Une parenthèse historique éclaire le sujet : les mixins fusionnaient leurs data, methods et hooks avec ceux du composant comme un copier-coller invisible. Deux mixins définissant la même méthode ? Mystère sur qui gagne. Impossible en lisant le composant de savoir d\'où vient `this.debounceSearch()`. Les **composables** résolvent ça radicalement : ce sont de simples fonctions. Tu les appelles, tu reçois des refs. La provenance est explicite — `const { x, y } = useSouris()`. C\'est l\'analogue des hooks custom de React, en plus libre : pas de règle d\'ordre d\'appel, `setup` ne s\'exécutant qu\'une fois.',
          blocks: [
            { t: 'h3', h: 'Écrire un composable' },
            { t: 'code', lang: 'js', label: 'composables/useSouris.js', code:
'import { ref, onMounted, onUnmounted } from "vue";\n\nexport function useSouris() {\n  const x = ref(0);\n  const y = ref(0);\n\n  function maj(e) {\n    x.value = e.pageX;\n    y.value = e.pageY;\n  }\n\n  // le composable enregistre SA propre hygiène :\n  onMounted(() => window.addEventListener("mousemove", maj));\n  onUnmounted(() => window.removeEventListener("mousemove", maj));\n\n  return { x, y };   // convention : un objet de refs, déstructurable sans casse\n}' },
            { t: 'code', lang: 'js', label: 'Utilisation', code:
'import { useSouris } from "./composables/useSouris";\n\nconst { x, y } = useSouris();\n// template : {{ x }}, {{ y }} — réactif, car ce sont des REFS retournées' },
            { t: 'p', h: 'Trois propriétés remarquables. **1)** Le composable peut enregistrer SON propre cleanup via `onUnmounted` : l\'hygiène voyage avec la logique. **2)** Chaque APPEL crée un état neuf (deux `useSouris()` = deux paires x/y indépendantes) — pour du partagé, voir la fiche Pinia. **3)** Conventions : préfixe `use`, dossier `composables/`, retour d\'un objet de refs — déstructurable sans rien perdre, contrairement à `reactive()`.' },
            { t: 'h3', h: 'Le grand classique : useFetch' },
            { t: 'code', lang: 'js', label: 'composables/useFetch.js', code:
'import { ref, watchEffect, toValue } from "vue";\n\nexport function useFetch(url) {   // url : valeur, ref ou getter — réactif !\n  const data = ref(null);\n  const erreur = ref(null);\n  const chargement = ref(false);\n\n  watchEffect(async (onCleanup) => {\n    const ctrl = new AbortController();\n    onCleanup(() => ctrl.abort());\n    data.value = null;\n    erreur.value = null;\n    chargement.value = true;\n    try {\n      const res = await fetch(toValue(url), { signal: ctrl.signal });\n      if (!res.ok) throw new Error("HTTP " + res.status);\n      data.value = await res.json();\n    } catch (e) {\n      if (e.name !== "AbortError") erreur.value = e.message;\n    } finally {\n      chargement.value = false;\n    }\n  });\n\n  return { data, erreur, chargement };\n}' },
            { t: 'p', h: 'Note `toValue(url)` (Vue 3.3+) : il accepte indifféremment valeur, ref ou fonction — LA convention pour les arguments de composables. Le consommateur écrit `useFetch(computed(() => "/api/articles/" + id.value))` et les rechargements suivent l\'id automatiquement.' },
            { t: 'callout', kind: 'info', h: 'Avant d\'écrire le tien, regarde **VueUse** : la bibliothèque communautaire de référence (useLocalStorage, useEventListener, useDark, useBreakpoints…). Un import vaut mieux qu\'un copier-coller.' }
          ],
          errors: [
            { title: 'Retourner des valeurs déballées : la réactivité fout le camp', lang: 'js', bad: 'export function useCompteur() {\n  const compteur = ref(0);\n  return { compteur: compteur.value };   // retourne 0, figé — pas la ref\n}', good: 'export function useCompteur() {\n  const compteur = ref(0);\n  const double = computed(() => compteur.value * 2);\n  function incrementer() { compteur.value++; }\n  return { compteur, double, incrementer };   // refs + fonctions\n}', why: 'Le consommateur déstructure le retour : seules les refs et computed survivent à l\'extraction. Une valeur déballée fige l\'état à l\'appel — le même piège que reactive(), un étage plus haut.' },
            { title: 'Croire partager en réutilisant : état dupliqué', lang: 'js', bad: '// Deux composants appellent useTheme() chacun de leur côté :\n// deux états indépendants — changer l\'un ne touche pas l\'autre', good: '// État partagé : sortir l\'état de la fonction\nconst theme = ref("clair");          // niveau module = singleton\nexport function useTheme() {\n  function basculer() { theme.value = theme.value === "clair" ? "sombre" : "clair"; }\n  return { theme, basculer };\n}\n// …ou un store Pinia si ça dépasse un point de partage', why: 'Un composable est une fonction : chaque appel exécute un nouvel univers. Pour PARTAGER, l\'état doit vivre hors de la fonction (niveau module) ou dans un store. C\'est LA distinction à méditer entre "réutilisable" et "partagé".' }
          ],
          related: ['vue-watch', 'vue-http', 'vue-pinia', 'rx-hooks-custom']
        }
      ]
    },

    /* ======================================================
       14. TRANSITIONS & ANIMATIONS
       ====================================================== */
    {
      id: 'transitions',
      name: 'Transitions & animations',
      icon: 'animation',
      fiches: [
        {
          id: 'vue-transitions',
          title: '&lt;Transition&gt; et &lt;TransitionGroup&gt;',
          icon: 'animation',
          level: 'Intermédiaire',
          tagline: 'Vue branche tes classes CSS sur le cycle entrée/sortie — et anime même les listes.',
          intro: 'Une interface qui fait apparaître ses éléments brutalement semble cassée ; 200 ms d\'opacité change tout. Vue fournit `<Transition>` : un composant invisible qui détecte l\'entrée et la sortie de SON enfant unique (via v-if, v-show ou composant dynamique) et applique des **classes CSS à chaque phase**. Tu écris l\'animation en CSS (fiche Transitions du module CSS), Vue orchestre le timing — y compris la sortie, impossible en CSS seul.',
          blocks: [
            { t: 'h3', h: 'Les six classes du cycle' },
            { t: 'code', lang: 'html', code:
'<template>\n  <button @click="visible = !visible">Basculer</button>\n\n  <Transition name="fondu">\n    <div v-if="visible" class="modal">…contenu…</div>\n  </Transition>\n</template>' },
            { t: 'code', lang: 'css', code:
'/* name="fondu" → préfixe des classes (fondu-enter-*, fondu-leave-*) */\n.fondu-enter-active,\n.fondu-leave-active { transition: opacity .25s ease; }\n\n.fondu-enter-from,\n.fondu-leave-to     { opacity: 0; }\n\n/* variantes : translateY pour un slide, @keyframes pour du complexe */' },
            { t: 'p', h: 'Le cycle complet : à l\'entrée, `enter-from` (état initial) → `enter-to`, le tout pendant `enter-active` ; à la sortie, `leave-from` → `leave-to` pendant `leave-active`. L\'astuce qui change tout : Vue **maintient l\'élément dans le DOM pendant leave-active** — c\'est ce qui rend l\'animation de sortie possible, là où un v-if seul tuerait l\'élément instantanément.' },
            { t: 'h3', h: 'Réglages qui sauvent' },
            { t: 'ul', items: [
              '**`mode="out-in"`** : l\'ancien part PUIS le nouveau entre — évite le chevauchement disgracieux lors d\'une bascule.',
              '**`appear`** : joue aussi l\'animation au premier rendu.',
              '**@keyframes** au lieu de transition : dans `*-active`, `animation: ...` pour des séquences complexes.',
              '**Hooks JS** (`@before-enter`, `@enter`, `@after-leave`) pour piloter en JavaScript (GSAP et compagnie).'
            ] },
            { t: 'h3', h: 'TransitionGroup : animer les listes' },
            { t: 'code', lang: 'html', code:
'<TransitionGroup name="liste" tag="ul">\n  <li v-for="t in taches" :key="t.id">{{ t.titre }}</li>\n</TransitionGroup>' },
            { t: 'code', lang: 'css', code:
'/* entrées / sorties individuelles */\n.liste-enter-active,\n.liste-leave-active { transition: all .3s ease; }\n.liste-enter-from,\n.liste-leave-to     { opacity: 0; transform: translateX(20px); }\n\n/* LA magie : les AUTRES éléments glissent vers leur nouvelle place */\n.liste-move { transition: transform .3s ease; }\n\n/* pour que la sortie ne pousse pas les voisins pendant qu\'elle joue */\n.liste-leave-active { position: absolute; }' },
            { t: 'p', h: '`<TransitionGroup>` exige des **clés** (comme v-for) et rend une vraie balise conteneur (`tag="ul"`). La classe `-move`, appliquée automatiquement aux éléments déplacés, donne l\'effet "réorganisation douce" des apps natives — c\'est de l\'animation FLIP calculée pour toi.' }
          ],
          errors: [
            { title: 'Transition sans enfant conditionné (ou avec deux) : rien ne joue', lang: 'html', bad: '<Transition><div>Toujours là</div></Transition>          <!-- jamais de cycle -->\n<Transition><div v-if="a">A</div><div v-if="b">B</div></Transition> <!-- warning -->', good: '<Transition mode="out-in">\n  <div v-if="a" key="a">A</div>\n  <div v-else key="b">B</div>\n</Transition>', why: '`<Transition>` n\'orchestre que l\'entrée/sortie d\'UN enfant (v-if, v-show, :is). Sans variation, il ne se passe rien ; avec deux enfants, il refuse. Bascule unique + key distinctes lui permettent d\'identifier qui entre et qui sort.' },
            { title: 'Entrée qui joue, sortie qui saute : durée mal placée', lang: 'css', bad: '.fondu-leave-active { opacity: .2s; }\n/* propriété inexistante : durée calculée = 0 → l\'élément est retiré net */', good: '.fondu-enter-active,\n.fondu-leave-active {\n  transition: opacity .3s ease;   /* Vue LIT la durée réelle pour la sortie */\n}', why: 'Vue détermine QUAND retirer l\'élément en lisant transition-duration / animation-duration calculées. Une faute de frappe (ou une durée sur la mauvaise classe) = sortie amputée : l\'entrée glisse, la sortie coupe.' }
          ],
          related: ['vue-v-if', 'vue-v-for', 'css-transitions-animations', 'vue-composants']
        }
      ]
    },

    /* ======================================================
       15. TESTS
       ====================================================== */
    {
      id: 'tests',
      name: 'Tests',
      icon: 'bug_report',
      fiches: [
        {
          id: 'vue-tests',
          title: 'Tester ses composants (Vitest + Vue Test Utils)',
          icon: 'checklist',
          level: 'Avancé',
          tagline: 'Monter un composant en isolation, cliquer, affirmer : les fondations du test Vue.',
          intro: 'Un composant Vue est une unité de code comme une autre : on peut le **monter hors du navigateur**, simuler des interactions et vérifier rendus et événements. Le duo officiel : **Vitest** (runner ultra-rapide, intégré à Vite) et **Vue Test Utils** (`mount`, `wrapper.find`, `trigger`, `emitted`). Objectif de cette fiche : écrire le test qui tient debout — celui qui vérifie le COMPORTEMENT, pas l\'implémentation.',
          blocks: [
            { t: 'h3', h: 'Installation' },
            { t: 'code', lang: 'bash', code:
'# option 1 : coché à la création du projet\nnpm create vue@latest        # → "Add Vitest ?" : Yes\n\n# option 2 : ajout manuel\nnpm install -D vitest @vue/test-utils jsdom\nnpm run test:unit            # script fourni par create-vue' },
            { t: 'h3', h: 'Le premier test' },
            { t: 'code', lang: 'js', label: 'tests/Compteur.spec.js', code:
'import { describe, it, expect } from "vitest";\nimport { mount } from "@vue/test-utils";\nimport Compteur from "../src/components/Compteur.vue";\n\ndescribe("Compteur", () => {\n  it("incrémente au clic", async () => {\n    const wrapper = mount(Compteur);                 // monte le composant\n\n    expect(wrapper.text()).toContain("0");\n\n    await wrapper.find("button").trigger("click");   // interaction + nextTick\n    expect(wrapper.text()).toContain("1");\n  });\n\n  it("émet quand on valide", async () => {\n    const wrapper = mount(Compteur);\n    await wrapper.find("button").trigger("click");\n\n    // on vérifie la COMMUNICATION vers le parent, pas l\'état interne\n    expect(wrapper.emitted("mis-a-jour")).toHaveLength(1);\n    expect(wrapper.emitted("mis-a-jour")[0]).toEqual([1]);\n  });\n});' },
            { t: 'p', h: 'Le squelette est invariable : `mount(Composant, { props })` → interaction `await wrapper.find("button").trigger("click")` → assertion. Deux détails capitaux. **1)** Le `await` est obligatoire : l\'interaction déclenche un cycle de rendu asynchrone (`nextTick` sous le capot). **2)** `wrapper.emitted("nom")` liste les événements émis avec leurs charges — tester la communication, c\'est tester le contrat du composant.' },
            { t: 'h3', h: 'Que tester ?' },
            { t: 'ul', items: [
              'Le rendu pour des props données (un titre, un état vide, un état d\'erreur).',
              'Les interactions : clic, saisie (`setValue` sur un champ v-model), soumission.',
              'Les événements émis (`emitted()`) et les changements visibles.',
              'Ce qu\'on NE teste pas : les détails internes (nom de méthode, structure DOM fragile) — un test qui casse à chaque refonte sans signaler de bug est un passif, pas un filet.'
            ] },
            { t: 'callout', kind: 'tip', h: '`mount` rend les composants enfants pour de vrai ; pour isoler complètement, `shallowMount` les remplace par des stubs. Règle pragmatique : mount par défaut (test fidèle), shallowMount quand l\'enfant est lourd ou bruyant (appels réseau à mocker).' }
          ],
          errors: [
            { title: 'Oublier await : assertion avant le re-rendu', lang: 'js', bad: 'wrapper.find("button").trigger("click");\nexpect(wrapper.text()).toContain("1");\n// échoue : le DOM n\'est pas encore rafraîchi', good: 'await wrapper.find("button").trigger("click");\nexpect(wrapper.text()).toContain("1");', why: 'trigger() retourne une promesse attachée au prochain tick de rendu ; sans await, l\'assertion s\'exécute sur l\'ANCIEN DOM — faux négatifs intermittents, le symptôme le plus énervant du débutant en tests Vue.' },
            { title: 'Tester l\'implémentation au lieu du comportement', lang: 'js', bad: 'expect(wrapper.vm.compteurInterne).toBe(1);\n// le jour où compteur devient computed :\n// test cassé, fonctionnalité parfaitement intacte', good: 'expect(wrapper.text()).toContain("Compteur : 1");\n// on vérifie ce que VOIT l\'utilisateur + ce que le PARENT reçoit (emitted)', why: 'Un test doit survivre aux refontes internes : s\'il vérifie le contrat (affichage, événements), il reste vert tant que le composant tient parole — et ne crie que sur les vraies régressions.' }
          ],
          related: ['vue-composants', 'vue-emits', 'vue-v-model', 'js-erreurs']
        }
      ]
    }
);
/*__FIN_VUE__*/
