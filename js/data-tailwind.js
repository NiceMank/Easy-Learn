/* ============================================================
   data-tailwind.js — Contenu pédagogique Tailwind CSS (approfondi)
   Prise en main, mise en page, style, interactivité & production.
   Exemples ancrés (Boutique Awa, marché Dantokpa, Cotonou) en
   HTML + classes Tailwind. Même contrat de données que les
   autres modules (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.tailwind = {
  id: 'tailwind',
  name: 'Tailwind CSS',
  icon: 'air',
  tagline: 'Le framework utility-first : composer ses interfaces directement dans le HTML, sans quitter le fichier.',
  heroTitle: 'Tailwind CSS, la mise en page à la vitesse des utilitaires',

  categories: [
    /* ---------------------------------------------------------- */
    {
      id: 'prise-en-main',
      name: 'Prise en main',
      icon: 'rocket_launch',
      fiches: [
        /* ------------------------------------------------------ */
        {
          id: 'tw-installation',
          title: 'Installation & configuration',
          icon: 'tune',
          level: 'Débutant',
          tagline: 'tailwind.config.js, content paths, @tailwind : le socle à poser UNE fois, correctement.',
          intro: 'Tailwind ne s\'installe pas comme le CSS qu\'on écrit à la main : c\'est un **générateur**. Tu déclares où sont tes fichiers, il scanne chaque classe utilitaire que tu utilises réellement, puis produit une feuille CSS qui ne contient qu\'elles — ni plus, ni moins. Comprendre ce mécanisme (scan, génération, purge) lève 90 % des mystères de l\'installation, et tout le reste du module repose dessus.',
          blocks: [
            { t: 'h3', h: 'Pourquoi un « framework CSS » a-t-il besoin d\'une installation ?' },
            { t: 'p', h: 'Question légitime : Bootstrap ou une simple feuille de style se « posent » avec une balise `link`, alors pourquoi Tailwind exige-t-il une étape de build ? Parce que Contrairement à une bibliothèque CSS, Tailwind ne LIVRE aucun style prêt à l\'emploi : il FABRIQUE le tien. Ses 25 000 utilitaires possibles ne peuvent pas tous être livrés — le fichier ferait des mégaoctets. La solution de l\'équipe : un petit moteur qui lit ton HTML et n\'écrit dans le CSS final que les classes que tu as réellement tapées. L\'installation, c\'est le branchement de ce moteur — rien de plus, mais rien de moins.' },
            { t: 'p', h: 'Imagine un imprimeur de Dantokpa qui tiendrait un stock de toutes les affiches imaginables : impossible, il faudrait un hangar. Il travaille « à la demande » : tu montres ton texte, il imprime exactement ce qui est commandé. ici, il faut bien comprendre que ton `content` (la liste des fichiers à scanner) est le bon de commande de cet imprimeur : si un fichier n\'y figure pas, ses classes ne seront jamais « imprimées » dans le CSS — et la page paraîtra « cassée » alors que le code est parfait.' },
            { t: 'h3', h: 'La philosophie utility-first, en deux mots' },
            { t: 'p', h: 'Le CSS traditionnel dit : « je nomme une boîte `.carte-produit`, puis je décris son style dans un fichier séparé ». Tailwind inverse la démarche : tu écris directement `class="flex items-center gap-4 rounded-xl bg-white p-4 shadow"` sur l\'élément, et chaque classe fait UNE chose (`flex` = `display: flex`, `p-4` = `padding: 1rem`…). Trois gains immédiats : tu ne baptises plus rien (adieu les `.wrapper-inner-bis`), ton CSS ne gonfle plus à chaque page, et le design reste **cohérent par construction** puisque tout puise dans la même échelle (espacements 0-96, couleurs 50-950).' },
            { t: 'p', h: 'Beaucoup de débutants rétorquent : « mais le HTML devient illisible ! » En réalité, la lisibilité se JOUE ailleurs : on découpe la page en composants (un fichier par carte, par bouton…), et la « duplication des classes » disparaît d\'elle-même. La fiche Bonnes pratiques du module y consacre toute sa première section — retiens pour l\'instant que ce débat est tranché par l\'outillage des composants, pas par un retour au CSS à grand nommage.' },
            { t: 'table', head: ['Approche', 'Principe', 'Quand ça coince'], rows: [
              ['CSS à la main (BEM…)', 'Une classe nommée par bloc, style dans un fichier séparé', 'Nommage sans fin, fichier qui gonfle, styles orphelins'],
              ['CSS-in-JS (styled-components)', 'Le style vit dans le JavaScript', 'Dépendance lourde, runtime parfois, écosystème lié'],
              ['Utility-first (Tailwind)', 'Des centaines de micro-classes combinées dans le HTML', 'HTML touffu si on refuse les composants, build requis']
            ] },
            { t: 'h3', h: 'Deux façons de démarrer' },
            { t: 'p', h: 'Pourquoi deux chemins, et pas un seul ? Parce qu\'on ne livre pas le même fichier à un étudiant qui TESTE une idée en cinq minutes et à un client qui déploie la Boutique Awa en production. Le **CDN** embarque le compilateur DANS le navigateur du visiteur : instantané, mais il compile à chaque visite (pages lourdes, aucun contrôle). La **vraie installation** compile une fois, chez toi, et livre un fichier CSS minuscule.' },
            { t: 'code', lang: 'html', label: 'Test rapide : le CDN (parfait pour apprendre, jamais en production)', code:
'<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="bg-slate-100 p-8">\n  <h1 class="text-3xl font-bold text-amber-600">Boutique Awa — Ça marche déjà.</h1>\n  <p class="mt-2 text-slate-600">Zéro installation : le navigateur compile tout seul.</p>\n</body>\n</html>' },
            { t: 'code', lang: 'bash', label: 'Vraie installation (projet réel)', code:
'# 1. Créer le projet et installer le compilateur\nnpm install -D tailwindcss\nnpx tailwindcss init            # crée tailwind.config.js\n\n# 2. Créer le fichier CSS d\'ENTRÉE (src/input.css) :\n#    @tailwind base;\n#    @tailwind components;\n#    @tailwind utilities;\n\n# 3. Lancer le compilateur en mode « surveillance »\nnpx tailwindcss -i ./src/input.css -o ./dist/output.css --watch\n#    → chaque sauvegarde HTML relance la génération, instantanément' },
            { t: 'h3', h: 'Le fichier de configuration' },
            { t: 'code', lang: 'js', label: 'tailwind.config.js — la centrale de pilotage', code:
'/** @type {import(\'tailwindcss\').Config} */\nmodule.exports = {\n  content: [\n    "./src/**/*.{html,js}",   // TOUS les fichiers où tu écris des classes\n    "./index.html"            // n\'en oublie aucun, sinon : CSS incomplet !\n  ],\n  theme: {\n    extend: {},               // tes personnalisations (fiche « Personnaliser le thème »)\n  },\n  plugins: [],                // les extensions officielles (fiche « Plugins »)\n}' },
            { t: 'p', h: 'La clé `content` est **la ligne vitale** de tout le fichier : elle liste, avec des patterns glob, les fichiers que Tailwind lit pour repérer les classes utilisées. `./src/**/*.{html,js}` se lit « tout fichier `.html` ou `.js`, dans `src` et tous ses sous-dossiers ». Si une classe n\'apparaît littéralement dans aucun de ces fichiers, son CSS ne sera **jamais généré** — c\'est le mécanisme de purge travaillant pour toi, et simultanément la source de l\'erreur n°1 des débutants (voir en bas de fiche).' },
            { t: 'callout', kind: 'warn', h: 'Le scan est **textuel**, pas intelligent : Tailwind cherche des chaînes de caractères complètes, sans exécuter ton code. `const cls = "bg-" + couleur + "-500"` n\'existe nulle part comme chaîne complète → aucune classe `bg-red-500` ne sera générée. Écris toujours les noms de classes EN ENTIER quelque part dans un fichier scanné (la fiche Bonnes pratiques donne les trois solutions pour les cas dynamiques, dont la safelist).' },
            { t: 'h3', h: 'Vérifier que tout est branché : le rituel de démarrage' },
            { t: 'ol', items: [
              'Crée `src/input.css` avec les trois lignes `@tailwind base;` `@tailwind components;` `@tailwind utilities;` — c\'est le « plan de fabrication » du fichier final (détail dans la fiche Directives).',
              'Remplis `content` dans `tailwind.config.js` — et ajoute CHAQUE nouveau dossier au fur et à mesure du projet.',
              'Lance `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch` et laisse tourner : la compilation doit se déclencher à chaque sauvegarde.',
              'Lie `dist/output.css` dans ton HTML, mets `class="bg-red-500"` sur un élément : si le rouge apparaît, tout est branché. Si rien n\'apparaît, le problème est dans les trois étapes précédentes — jamais ailleurs.'
            ] },
            { t: 'callout', kind: 'info', h: 'Note version : Tailwind v4 (2025) simplifie encore — plus besoin de `tailwind.config.js`, on écrit `@import "tailwindcss";` dans le CSS et la détection des fichiers est automatique. Les concepts de cette fiche (utilitaires, purge, `theme.extend` qui devient `@theme`) restent identiques : ce que tu apprends ici reste pleinement valide.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Tailwind est un gros fichier CSS à télécharger, comme Bootstrap. »** Faux : rien n\'existe avant le build. Il n\'y a pas de « tailwind.css » officiel à poser — le tien naît du scan de TES fichiers.',
              '**« `content` sert à choisir un thème ou des pages. »** Non : c\'est la liste des fichiers à SCANNER pour repérer les classes. Son nom est trompeur — pense « fichiers sources ».',
              '**« npm install, c\'est compliqué et optionnel. »** Une commande, une fois, par projet. Ensuite le `--watch` tourne tout seul pendant que tu écris ton HTML.',
              '**« Générer tout ce CSS va rendre mon site lourd. »** C\'est l\'inverse : la purge ne garde que les classes réellement utilisées — un site complet tient souvent sous 15 Ko minifiés.',
              '**« `@tailwind base`, `components` et `utilities` sont trois frameworks différents. »** Non : trois strates du même fichier final (reset, composants, utilitaires) — la fiche Directives les dissèque une à une.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les deux accidents de parcours de la première semaine : un dossier oublié du scan (le CSS « disparaît » sans explication), et le CDN laissé en ligne chez un client (le compilateur embarqué dans chaque visite).' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Première fiche du module : tout ce qui suit part d\'ici. Le `theme.extend` entrouvert dans la config devient un outil quotidien dans la fiche **Personnaliser le thème** ; les trois lignes `@tailwind` posées dans `input.css` sont disséquées dans la fiche **Directives** ; et le scan textuel que tu viens de comprendre motive à lui seul la moitié des **Bonnes pratiques** (classes complètes, safelist, build de production). Côté HTML, tout ceci n\'est qu\'une façon organisée de remplir l\'attribut `class` de la fiche **Syntaxe & sélecteurs** du module CSS — le navigateur, lui, ne voit jamais que du CSS ordinaire.' },
          ],
          errors: [
            {
              title: 'Oublier un dossier dans content',
              bad: 'content: ["./src/**/*.html"]\n// …mais les cartes produits sont générées dans src/js/panier.js :\n// leurs classes (flex, rounded-xl, bg-amber-500…) ne sont dans\n// AUCUN fichier scanné → le CSS de tout le panier n\'est jamais généré.\n// Symptôme : « la page produits est belle, le panier est tout nu ».',
              good: 'content: [\n  "./src/**/*.{html,js}",   // HTML et JS, src et sous-dossiers\n  "./index.html"\n]\n// Règle : tout fichier susceptible de contenir une classe\n// déclarée EN ENTIER doit matcher au moins un pattern.',
              why: 'C\'est l\'erreur n°1 du monde Tailwind : « Tailwind ne marche pas » veut dire dans 9 cas sur 10 « Tailwind ne voit pas mes fichiers ». Le scan étant textuel, une classe utilisée dans un fichier JS oublié n\'existe tout simplement pas pour le générateur. Réflexe de diagnostic, dans l\'ordre : 1) le dossier est-il dans `content` ? 2) le `--watch` tourne-t-il ? 3) la classe est-elle écrite en entier ?'
            },
            {
              title: 'Le CDN en production',
              bad: '<!-- site de la Boutique Awa livré aux clients : -->\n<script src="https://cdn.tailwindcss.com"></script>\n<!-- le navigateur de CHAQUE visiteur télécharge le compilateur\n     (~100 Ko de JS), scanne la page et génère le CSS à la volée :\n     flash de page nue au chargement, mobile lent, pas de purge. -->',
              good: '# chez toi, avant le déploiement :\nnpx tailwindcss -i src/input.css -o dist/output.css --minify\n<!-- puis dans le HTML livré : -->\n<link rel="stylesheet" href="dist/output.css">\n<!-- un fichier statique, purgé, souvent < 15 Ko : chargement immédiat -->',
              why: 'Le CDN est un jouet de démonstration, pas un outil de livraison : il fait travailler le téléphone du client à la place de ta machine de build. Le compilateur js embarqué rend la purge impossible — tout l\'arsenal est évalué à chaque visite. La version compilée, elle, ne contient QUE tes classes finales : c\'est le même principe que les exercices pratiqués en local, sauf que le pipeline tourne une fois pour toutes au déploiement.'
            }
          ],
          related: ['tw-theme', 'tw-directives', 'tw-bonnes-pratiques', 'css-syntaxe-selecteurs']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-theme',
          title: 'Personnaliser le thème',
          icon: 'design_services',
          level: 'Intermédiaire',
          tagline: 'theme.extend, couleurs de marque, échelles sur mesure et variables custom.',
          intro: 'Le thème par défaut de Tailwind est un excellent design system générique — mais ton projet a SA couleur de marque, SA police, SON arrondi signature. Toute la personnalisation passe par une idée forte : **étendre sans rien casser**. Tu ajoutes à l\'échelle existante ; tu ne la remplaces presque jamais. Cette fiche montre où, comment et pourquoi — jusqu\'aux variables CSS qui rendent le thème pilotable à l\'exécution.',
          blocks: [
            { t: 'h3', h: 'Pourquoi personnaliser un thème au lieu d\'écrire ses couleurs à la main ?' },
            { t: 'p', h: 'Sans thème, chaque développeur (ou chacune de tes propres sessions, trois mois apart) invente ses valeurs : `color: #f59e0b` ici, `color: #f59d0a` là — et au bout de six mois, le site de la Boutique Awa contient 37 jaunes presque identiques mais pas tout à fait. Un thème, c\'est le **rayon d\'épices de l\'échoppe** : ce qui est en rayon est utilisable partout, ce qui n\'y est pas n\'existe pas. La cohérence n\'est plus une discipline, c\'est la structure elle-même.' },
            { t: 'p', h: 'La mécanique est simple : `tailwind.config.js` contient un objet `theme` ; chaque valeur que tu y déclares devient automatiquement des familles de classes. Déclare une couleur `awa` et tu obtiens d\'un coup `bg-awa-500`, `text-awa-700`, `border-awa-200`, `ring-awa-300`, `from-awa-400`… Une seule ligne de configuration, des dizaines d\'utilitaires cohérents — c\'est le même mécanisme de génération vu dans la fiche Installation, appliqué à TES valeurs.' },
            { t: 'h3', h: 'extend : le seul endroit où tu toucheras vraiment' },
            { t: 'code', lang: 'js', label: 'tailwind.config.js — la palette de la Boutique Awa', code:
'module.exports = {\n  content: ["./src/**/*.{html,js}", "./index.html"],\n  theme: {\n    extend: {\n      colors: {\n        // la marque : ocre marché + vert fraîcheur\n        awa: {\n          50:  \'#fdf8ed\',\n          500: \'#d97706\',   // ambre profond — l\'accent principal\n          700: \'#b45309\'\n        },\n        momo: \'#ffcb05\',     // jaune Mobile Money (boutons de paiement)\n        moov: \'#0066b3\'\n      },\n      fontFamily: {\n        sans: [\'Inter\', \'system-ui\', \'sans-serif\']\n      },\n      borderRadius: {\n        carte: \'1.25rem\'      // l\'arrondi signature du catalogue\n      }\n    }\n  }\n}' },
            { t: 'p', h: 'Relis ce fichier comme un générateur : `colors.awa.500` débloque `bg-awa-500`, `text-awa-500`, `border-awa-500`, `ring-awa-500`, `divide-awa-500`, `from-awa-500`, `placeholder-awa-500`… `borderRadius.carte` donne `rounded-carte`. Une déclaration, une constellation de classes — et toutes portent le même chiffre `500`, donc s\'accordent entre elles. ici, tu touches au principe fondateur : **le thème EST le design system**.' },
            { t: 'ol', items: [
              '**Étape 1 — le besoin** : Awa veut un catalogue « chaud, marché, premium ». On extrait deux couleurs (ambre, ardoise) et une police (Inter).',
              '**Étape 2 — la déclaration** : elles entrent dans `theme.extend` comme ci-dessus. Rien d\'autre ne change dans le projet.',
              '**Étape 3 — l\'usage** : `class="bg-awa-500 text-white rounded-carte px-6 py-3"` sur le bouton « Commander », `class="text-awa-700"` sur les prix. Partout la même couleur, par construction.',
              '**Étape 4 — l\'évolution** : six mois plus tard, la couleur change ? Une seule valeur à modifier, tout le site suit — y compris les hover, les ring de focus, les badges.'
            ] },
            { t: 'h3', h: 'theme SANS extend : à réserver aux rares cas' },
            { t: 'p', h: 'Écrire dans `theme` directement — pas dans `theme.extend` — REMPLACE l\'échelle entière correspondante. `theme: { colors: { awa: … } }` supprime purement et simplement les 22 familles par défaut : adieu `bg-red-500`, `text-slate-700`, `border-gray-200`. C\'est parfois EXACTEMENT ce que veut un client avec un design system verrouillé (aucune couleur hors charte ne doit exister dans le CSS généré). Mais dans un projet normal, c\'est un piège : tous les exemples du web et de tes anciennes maquettes cessent de fonctionner, et tu ne comprends pas pourquoi.' },
            { t: 'callout', kind: 'warn', h: 'Règle de survie : `extend` par défaut, `theme` nu seulement quand tu VEUX interdire l\'échelle officielle. Subtilité utile : `extend` peut aussi ÉCRASER une valeur précise — `extend: { colors: { red: { 500: \'#e11d48\' } } }` ne touche que le rouge 500 et conserve tout le reste de la famille `red`.' },
            { t: 'h3', h: 'Les valeurs arbitraires : la notation entre crochets' },
            { t: 'p', h: 'Avant les variables, un mot sur l\'échappatoire : Tailwind accepte des valeurs uniques entre crochets — `w-[347px]`, `bg-[#1da1f2]`, `top-[13px]`. Pratique pour le cas réellement unique (une bannière dont la hauteur est imposée par une affiche reçue de l\'imprimeur, une couleur ponctuelle d\'un partenaire). Mais beaucoup de débutants en abusent : dix `mt-[22px]` dispersés recréent en pire le chaos que le thème devait éviter. La règle d\'or : **une occurrence = arbitraire accepté ; deux ou trois = la valeur mérite un nom dans `theme.extend`**.' },
            { t: 'code', lang: 'html', label: 'Arbitraire ponctuel (OK) vs thème (mieux)', code:
'<!-- justifié : l\'affiche du grand marché fait exactement 280px de haut —\n     elle n\'existe qu\'UNE fois dans tout le site -->\n<img src="affiche-dantokpa.jpg" class="h-[280px] w-full object-cover">\n\n<!-- à éviter, quand la même valeur revient :\n<section class="py-[64px]">   ...   <footer class="py-[64px]">\n  → dans theme.extend : spacing: { section: \'4rem\' } puis class="py-section" -->' },
            { t: 'h3', h: 'Brancher des variables CSS' },
            { t: 'p', h: 'Dernier niveau de sophistication : parfois la couleur doit changer SANS recompilation — un basculement de palette piloté par l\'utilisateur, un thème saisonnier (fêtes de fin d\'année à la boutique), un multi-tenant. La solution : déclarer les couleurs du thème comme des variables CSS vivantes. Le point délicat est la cohabitation avec la notation slash `/50` (opacité à la volée, fiche Couleurs) : il faut le format `rgb(var(--awa) / <alpha-value>)`, où Tailwind injectera lui-même l\'opacité demandée par `/50`.' },
            { t: 'code', lang: 'js', label: 'Couleurs pilotées par variables (tailwind.config.js)', code:
'theme: {\n  extend: {\n    colors: {\n      // <alpha-value> = trou que Tailwind remplit avec l\'opacité du slash\n      awa: \'rgb(var(--awa-500) / <alpha-value>)\'\n    }\n  }\n}\n\n/* et dans ton CSS d\'entrée : */\n/* :root {\n     --awa-500: 217 119 6;        // TRIplets R V B séparés d\'espaces !\n   }\n   .noel {\n     --awa-500: 190 18 60;        // le thème de décembre : rouge festif\n   } */' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : `--awa-500` stocke trois nombres `217 119 6` (PAS `#d97706`), parce que `rgb()` moderne accepte la syntaxe `rgb(R V B / alpha)`. Tailwind génère `background-color: rgb(var(--awa-500) / 0.5)` quand tu écris `bg-awa-500/50` — le slash continue de fonctionner avec les variables, ce qui serait impossible avec un hexadécimal classique.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« extend écrase tout ce que je ne liste pas. »** Non : extend FUSIONNE. Seule la clé précise que tu réécris au même niveau est remplacée — tout le reste de l\'échelle par défaut survit.',
              '**« Les valeurs arbitraires `[…]` sont « sales », à bannir. »** Elles sont faites pour l\'unique. Le problème n\'est pas la notation, c\'est la répétition d\'une valeur qui méritait un nom.',
              '**« Changer le thème oblige à relancer manuellement. »** Avec le `--watch` de la fiche Installation, la modification de la config recompile toute seule — sans watch actif, en revanche, rien ne se passe.',
              '**« On ne personnalise que les couleurs et les polices. »** Tout est thémable : espacements, ombres, breakpoints, animations, tailles max… `theme.extend` est un annuaire complet.',
              '**« Le CDN accepte la même config. »** Le CDN lit un objet `tailwind.config` en JS inline — sans purge ni build. C\'est une raison de plus pour passer à la vraie installation dès que le projet est sérieux.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux façons opposées de rater sa personnalisation : casser l\'échelle officielle par mégarde (en écrivant hors `extend`), ou ne jamais personnaliser et saupoudrer le HTML de valeurs entre crochets qui auraient dû devenir un thème.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche prolonge directement **Installation & configuration** : c\'est le même `tailwind.config.js`, simplement rempli au lieu d\'être survolé — et le scan explique pourquoi tes nouvelles classes `bg-awa-500` apparaissent dès la sauvegarde suivante. La palette déclarée ici sera manipulée avec ses nuances et son opacité dans **Couleurs, opacité & gradients** ; la police dans **Typographie** ; les variables CSS renvoient à la fiche **Variables custom properties** du module CSS. Enfin, quand tu saupoudreras trop de crochets `[…]`, la fiche **Bonnes pratiques** te rappellera que tout ce qui se répète mérite un nom.' },
          ],
          errors: [
            {
              title: 'Personnaliser hors extend',
              bad: 'theme: {\n  colors: {\n    awa: \'#d97706\'   // REMPLACE toute l\'échelle des couleurs !\n  }\n}\n// conséquence : bg-red-500, text-slate-700, border-gray-200…\n// ne génèrent PLUS RIEN — la moitié du site devient monochrome\n// et aucun message d\'erreur ne l\'explique.',
              good: 'theme: {\n  extend: {          // on AJOUTE à l\'échelle officielle\n    colors: {\n      awa: \'#d97706\'\n    }\n  }\n}\n// les 22 familles par défaut restent disponibles, + ta marque.',
              why: '`theme` et `theme.extend` ont des sémantiques opposées : l\'un REMPLACE l\'échelle entière, l\'autre fusionne. Comme l\'oubli d\'extend ne produit aucune erreur — juste des classes qui ne génèrent plus de CSS — on peut chercher des heures avant de soupçonner la config. Si `bg-red-500` a cessé de fonctionner du jour au lendemain, la première question est : « est-ce que quelqu\'un a touché à `theme` hors extend ? »'
            },
            {
              title: 'Valeurs arbitraires partout au lieu du thème',
              bad: '<button class="bg-[#d97706] text-[#fff8ee] rounded-[14px]\n                  px-[26px] py-[13px]">Commander</button>\n<a class="text-[#d97706]">…\n<span class="bg-[#d97733]">…   <!-- troisième jaune, presque pareil -->\n<!-- chaque valeur est recopiée à la main, aucune ne suit une charte,\n     et changer la couleur de marque = chercher-remplacer 40 fichiers -->',
              good: '// tailwind.config.js\ntheme: { extend: { colors: { awa: \'#d97706\' } } }\n\n<button class="bg-awa-500 text-white rounded-xl px-6 py-3">Commander</button>\n<a class="text-awa-500">…\n<!-- une seule source de vérité : la config. Le HTML exprime\n     l\'INTENTION (la couleur de la marque), jamais son code hex. -->',
              why: 'La notation `[…]` n\'est pas une faute en soi — elle devient un problème quand elle tient lieu de design system. Au-delà du chaos visuel (trois jaunes « presque pareils »), elle détruit le bénéfice principal du thème : une couleur de marque se change en UN endroit. Phrase test à te poser : « si Awa change son ambre demain, combien de fichiers dois-je rouvrir ? » Si la réponse est supérieure à un, la valeur appartient à `theme.extend`.'
            }
          ],
          related: ['tw-installation', 'tw-couleurs', 'css-variables', 'tw-bonnes-pratiques']
        },
      ]
    },
    /* ---------------------------------------------------------- */
    {
      id: 'mise-en-page',
      name: 'Mise en page',
      icon: 'dashboard',
      fiches: [
        /* ------------------------------------------------------ */
        {
          id: 'tw-layout',
          title: 'Structure : display, position, conteneur',
          icon: 'web',
          level: 'Débutant',
          tagline: 'block, hidden, relative/absolute/fixed/sticky, z-index et le fameux container centré.',
          intro: 'Avant les utilitaires virtuoses (flex, grid), il faut les fondations : comment un élément se comporte dans le flux, et comment on l\'en sort. Bonne nouvelle : si tu as lu les fiches CSS correspondantes, les utilitaires Tailwind sont simplement leurs noms raccourcis — `block` = `display: block`, `absolute` = `position: absolute`. Le concept est identique ; seule l\'écriture change. Cette fiche installe le trio qui structure 95 % des pages : le flux, la sortie de flux, le conteneur.',
          blocks: [
            { t: 'h3', h: 'Pourquoi parler de « structure » avant de décorer ?' },
            { t: 'p', h: 'Une interface réussie est d\'abord des boîtes BIEN PLACÉES ; les couleurs et ombres viennent après. Sans structure claire, on finit par bricoler : marges négatives pour « rattraper » un titre, `z-index: 9999` en désespoir de cause, badge qui s\'affiche derrière l\'image au rez-de-chaussée du téléphone. Les utilitaires de cette fiche sont les fondations invisibles — personne ne les remarque quand elles sont bonnes, tout le monde voit leur absence.' },
            { t: 'p', h: 'L\'intuition de départ : le navigateur pose chaque boîte SOUS la précédente, comme les colis s\'empilent sur l\'étal du marché le samedi matin — c\'est le **flux**. `display` change la façon d\'empiler (en ligne, en bloc). `position`, elle, autorise à SORTIR un colis de la pile pour le poser ailleurs : sur le côté de l\'étal (`absolute`), collé au comptoir (`fixed`), ou normal jusqu\'à un certain point puis accroché au plafond (`sticky`). Toute la mise en page se pense avec ces deux mouvements.' },
            { t: 'h3', h: 'Display : les utilitaires qui gouvernent tout' },
            { t: 'table', head: ['Classe', 'CSS équivalent', 'Effet concret'], rows: [
              ['`block`', '`display: block`', 'Prend toute la ligne, empile verticalement (titre, section)'],
              ['`inline-block`', '`display: inline-block`', 'Reste dans la ligne MAIS accepte largeur/hauteur (badge, bouton)'],
              ['`inline`', '`display: inline`', 'Dans le texte, sans dimensions (un mot mis en avant)'],
              ['`flex` / `grid`', '`display: flex / grid`', 'Active les mises en page modernes (fiches suivantes)'],
              ['`hidden`', '`display: none`', 'Retiré complètement du rendu (et du lecteur d\'écran)']
            ] },
            { t: 'p', h: 'Le duo qui change tout : `hidden md:block`. Traduction mot à mot (tu apprendras cette lecture dans la fiche Responsive) : « caché sur mobile, affiché À PARTIR de la taille md ». C\'est le mécanisme classique d\'un menu qui devient barre latérale sur grand écran. Note au passage que `hidden` retire l\'élément du flux ET de l\'accessibilité — ce n\'est pas « transparent » comme `invisible` (qui conserve la place), c\'est « absent ».' },
            { t: 'h3', h: 'Position : sortir du flux' },
            { t: 'p', h: 'Les cinq valeurs, racontées une fois pour toutes : `static` (le défaut — dans la file), `relative` (décalée visuellement MAIS sa place dans la file est conservée — et surtout, elle devient une RÉFÉRENCE pour ses enfants), `absolute` (sortie de la file, positionnée par rapport au parent `relative` le plus proche), `fixed` (sortie de la file et collée à l\'ÉCRAN — barre de navigation), `sticky` (normale dans la file jusqu\'à ce que son seuil touche le bord, puis accrochée — en-têtes de liste).' },
            { t: 'code', lang: 'html', label: 'Le badge promo ancré à sa carte (Boutique Awa)', code:
'<div class="relative rounded-xl border p-4">   <!-- la carte devient la RÉFÉRENCE -->\n  Gari fin — sac 5 kg\n  <span class="absolute -top-2 -right-2 rounded-full bg-amber-500\n               px-2 text-xs font-bold text-white">-20 %</span>\n  <!-- -top-2 -right-2 = « place-toi à 8px EN DEHORS, coin haut-droit\n       de la carte » : le badge chevauche élégamment le coin -->\n</div>\n\n<header class="sticky top-0 z-10 bg-white/80 backdrop-blur">\n  Barre qui colle en haut AU SCROLL (sticky + un seuil top-0, sinon rien)\n</header>\n\n<nav class="fixed bottom-0 inset-x-0 z-50 bg-white border-t">\n  Tab bar fixée en bas d\'écran, façon app mobile\n</nav>' },
            { t: 'demo', height: 110, caption: 'relative + absolute -top-2 -right-2 : le badge ancré au coin de sa carte', html:
'<div style="position:relative;width:230px;margin:16px auto 0;padding:14px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;font-size:14px">Gari fin — sac 5 kg<span style="position:absolute;top:-8px;right:-8px;background:#f59e0b;color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px">-20 %</span></div>' },
            { t: 'p', h: 'Les utilitaires de placement forment la famille **inset** : `top-0`, `right-4`, `-bottom-2` (les valeurs négatives s\'écrivent avec un `-` devant), `inset-x-0` (gauche ET droite à 0), `inset-0` (les quatre coins). Et `z-10`, `z-50` règlent l\'empilement — avec les mêmes lois qu\'en CSS pur : le z-index ne joue qu\'entre éléments positionnés d\'un même contexte, et un `transform` sur un parent scelle celui de ses enfants.' },
            { t: 'callout', kind: 'tip', h: 'Un produit = une boîte `relative` et ses détails en `absolute`. Ce schéma (carte + badge, image + bouton lecture, champ + icône) couvre l\'immense majorité des positionnements du web réel. Le réflexe à graver : dès qu\'un `absolute` existe, vérifie QUE le parent voulu porte `relative` — sans cela, l\'élément flotte par rapport à un ancêtre lointain voire à la page entière (voir l\'erreur en bas de fiche).' },
            { t: 'h3', h: 'Le conteneur : container + mx-auto + px-4' },
            { t: 'p', h: 'Sur un écran large, un texte de bout en bout est illisible — l\'œil fatigue à sauter les lignes de 30 cm. D\'où le motif universel : plafonner la largeur du contenu, centrer le bloc, garder une gouttière intérieure. En CSS pur : `max-width: 1152px; margin: 0 auto; padding: 0 1rem;`. En Tailwind, le trio `container mx-auto px-4` : `container` plafonne (sa largeur s\'adapte au palier courant), `mx-auto` centre, `px-4` empêche le contenu de coller aux bords du téléphone.' },
            { t: 'code', lang: 'html', label: 'Le squelette d\'une page Boutique Awa', code:
'<body class="bg-slate-50 text-slate-900">\n  <header class="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">\n    <div class="container mx-auto flex items-center gap-4 px-4 py-3">\n      Logo Boutique Awa — menu — panier\n    </div>\n  </header>\n\n  <main class="container mx-auto px-4 py-8">\n    Grille des produits (prochaines fiches)\n  </main>\n\n  <footer class="mt-16 border-t bg-white">\n    <div class="container mx-auto px-4 py-6 text-sm text-slate-500">\n      Cotonou · Abomey-Calavi — livraison zémidjan en 2 h\n    </div>\n  </footer>\n</body>' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : `container` n\'est PAS fluide au sens mobile-first — c\'est un `max-width` qui saute de palier en palier (640, 768, 1024 px…), ce qui crée des « marches » de largeur en redimensionnant la fenêtre. Beaucoup d\'équipes préfèrent un composant explicite : `mx-auto w-full max-w-6xl px-4`, qui est COURBÉ en continu. Sache ce que fait `container` avant de l\'adopter — les deux approches sont légitimes, elles ne se comportent juste pas pareil.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `absolute` se place par rapport à la page. »** Non : par rapport au plus proche ancêtre POSITIONNÉ (`relative`, `absolute`, `fixed`). Sans aucun, oui, il retombe sur la page — d\'où l\'illusion.',
              '**« `hidden` et `invisible` sont interchangeables. »** `hidden` retire l\'élément de la mise en page (l\'espace se referme) ; `invisible` cache le rendu mais GARDE la place — deux outils, deux usages.',
              '**« `sticky` suffit à coller une barre. »** Il faut aussi un seuil (`top-0`) ET un parent assez haut pour que le collage soit visible — dans un conteneur sans hauteur ni débordement, rien ne se passe.',
              '**« Un gros `z-index` résout tous les empilements. »** Le z-index ne vaut qu\'entre frères du même contexte d\'empilement ; un parent avec `transform` ou `opacity < 1` crée un NOUVEAU contexte qui plafonne les enfants.',
              '**« `container` est obligatoire pour une page propre. »** C\'est un utilitaire parmi d\'autres : `mx-auto max-w-6xl px-4` fait le même métier, parfois mieux (comportement fluide).'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux accidents très fréquents : employer `fixed` là où `sticky` ferait le même métier sans calcul, et poser un badge en `absolute` dont la référence a « fui » — il se place au bon endroit sur ton écran, puis dérive partout ailleurs.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche fonde le module « côté boîtes » : les marges, paddings et dimensions qui habillent ces boîtes arrivent dans **Espacements & dimensions**, et les deux valeurs de `display` modernes — `flex` et `grid` — auront chacune leur fiche juste après. `mx-auto` et `px-4` n\'étaient d\'ailleurs que du spacing déguisé. Côté CSS pur, tout ce que tu viens de voir est la traduction mot à mot des fiches **Position** et **Display** : `sticky top-0`, `z-50`, `block` n\'inventent rien, ils abrègent. Et le duo `hidden md:block`, aperçu ici, est la première pointe du **responsive** — la grande fiche de fin de parcours.' },
          ],
          errors: [
            {
              title: 'fixed pour une barre « naturellement collante »',
              bad: '<header class="fixed top-0 inset-x-0 bg-white">\n  …contenu…\n</header>\n<!-- fixed retire la barre DU FLUX : le contenu qui suit remonte\n     et passe DESSOUS. S\'ensuit la rituelle rustine\n     <main class="pt-16">… à recalculer à chaque changement\n     de hauteur de barre — et qui casse si le titre passe sur 2 lignes. -->',
              good: '<header class="sticky top-0 z-20 bg-white">\n  …contenu…\n</header>\n<main>\n  <!-- sticky RESTE dans le flux : la barre colle au scroll,\n       aucun décalage manuel à maintenir, jamais. -->\n</main>',
              why: '`fixed` répond à une autre question : « toujours visible, MÊME en dehors de son contexte » (tab bar d\'app mobile, bouton flottant). Pour une barre qui doit suivre le scroll depuis sa place naturelle, `sticky` fait exactement ça — sans sortir du flux, sans hauteur fantôme à compenser. Test rapide : si tu écris un padding « pour rattraper le fixed », tu voulais probablement un sticky.'
            },
            {
              title: 'absolute dont la référence a fui',
              bad: '<div class="rounded-xl border p-4">      <!-- PAS de relative ! -->\n  Gari fin — sac 5 kg\n  <span class="absolute -top-2 -right-2 rounded-full bg-amber-500\n               px-2 text-xs font-bold text-white">-20 %</span>\n  <!-- le badge se place par rapport à… la page (ou un ancêtre lointain\n       qui a relative). Résultat : il flotte en haut à droite de l\'écran\n       ou d\'une section voisine — « ça marchait à l\'instant T » -->',
              good: '<div class="relative rounded-xl border p-4"> <!-- LA référence -->\n  Gari fin — sac 5 kg\n  <span class="absolute -top-2 -right-2 rounded-full bg-amber-500\n               px-2 text-xs font-bold text-white">-20 %</span>\n  <!-- le badge épouse le coin de la carte, sur tout écran,\n       dans n\'importe quelle page où la carte est réutilisée -->',
              why: 'Un élément `absolute` cherche le plus proche ancêtre POSITIONNÉ pour s\'y accrocher ; sans référence explicite, il tombe sur `body` ou sur un ancêtre qui l\'était par hasard — d\'où un comportement qui semble dépendre de la page d\'accueil. La loi est binaire et sans appel : **dès qu\'un absolute apparaît dans un composant, ce composant porte `relative`**. C\'est également l\'erreur qui survit le mieux aux copier-coller : la carte isolée « marche » dans la maquette car un parent fortuit était positionné.'
            }
          ],
          related: ['tw-spacing', 'tw-flexbox-grid', 'css-position', 'css-display']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-spacing',
          title: 'Espacements & dimensions',
          icon: 'straighten',
          level: 'Débutant',
          tagline: 'L\'échelle 0.25rem, p/m/gap, w/h, fractions — et le duel w-full contre w-screen.',
          intro: 'Toutes les mesures de Tailwind — paddings, marges, gaps, largeurs — puisent dans UNE échelle : l\'unité vaut 0.25rem (4 px), et le chiffre de la classe la multiplie. `p-4` = 16 px, `mt-2` = 8 px, `w-6` = 24 px. Apprendre cette échelle une bonne fois, c\'est débloquer la moitié du vocabulaire du framework — et comprendre pourquoi des interfaces entières « sonnent juste » sans aucun pixel tapé à la main.',
          blocks: [
            { t: 'h3', h: 'Pourquoi une « échelle » au lieu de choisir ses pixels ?' },
            { t: 'p', h: 'Regarde un vieux projet CSS : `margin: 13px` ici, `17px` là, `15px` ailleurs — chaque valeur fut « sentie » à l\'instant où elle fut tapée. Résultat : des espacements presque pareils mais pas égaux, une vibration visuelle diffuse que l\'utilisateur ne sait pas nommer mais qu\'il PERÇOIT (« ce site fait brouillon »). Une échelle de note en note, comme la gamme en musique : tu ne choisis plus une fréquence parmi l\'infini, tu choisis une NOTE. Toutes les boîtes de la page jouent alors dans la même tonalité — c\'est cela, la « cohérence » qu\'on admire sur les sites premium.' },
            { t: 'p', h: 'La conversion à **mémoriser par cœur** (elle revient des milliers de fois) : `1 unité = 4 px`. Donc `p-1` = 4 px, `p-2` = 8 px, `p-3` = 12 px, `p-4` = 16 px, `p-6` = 24 px, `p-8` = 32 px, `p-12` = 48 px, `p-16` = 64 px, `p-24` = 96 px. Entre deux valeurs entières, `p-2.5` = 10 px, `p-3.5` = 14 px. Et `p-0.5` = 2 px, utile pour les micro-ajustements. Le reste — `px-4` (gauche+droite), `py-6` (haut+bas), `mt-8`, `me-2` — se déduit de la même table.' },
            { t: 'h3', h: 'L\'échelle d\'espacement, une bonne fois pour toutes' },
            { t: 'table', head: ['Classe', 'Valeur', 'Classe', 'Valeur'], rows: [
              ['`p-0` / `m-0` / `w-0`', '0', '`w-6`', '1.5rem (24 px)'],
              ['`*-0.5`', '0.125rem (2 px)', '`*-8`', '2rem (32 px)'],
              ['`*-1`', '0.25rem (4 px)', '`*-10`', '2.5rem (40 px)'],
              ['`*-2`', '0.5rem (8 px)', '`*-12`', '3rem (48 px)'],
              ['`*-3`', '0.75rem (12 px)', '`*-16`', '4rem (64 px)'],
              ['`*-4`', '1rem (16 px)', '`*-24`', '6rem (96 px)'],
              ['`*-5`', '1.25rem (20 px)', '`*-px`', '1 px exact (filets)']
            ] },
            { t: 'p', h: 'Sous le capot, pourquoi des `rem` et pas des `px` ? Parce que le `rem` suit la taille de police racine. Si un utilisateur agrandit la taille de texte de son téléphone (accessibilité, vue fatiguée), TOUTES les dimensions proportionnées en rem grandissent avec lui — le site reste respirant au lieu de comprimer un texte devenu géant. C\'est un respect du box model CSS appliqué à l\'échelle d\'un framework entier : tu n\'as rien à faire, l\'échelle y pense pour toi.' },
            { t: 'p', h: 'Les préfixes directionnels, enfin : `p-4` partout ; `px-4` / `py-4` par axe ; `pt-2` (top), `pe-2` (end = droite en LTR), `ps-2` (start), `pb-2`, et les classiques `pl/pr` si tu préfères le physique. Le couple start/end existe pour les sites multilingues (l\'arabe inverse la lecture : `ms-*`/`me-*` suivent le sens d\'écriture sans rien retoucher). Même grammaire pour `m-*`… à une différence près : les marges négatives ! `-mt-2` existe et rend de fiers services (chevaucher légèrement une image sur un bandeau).' },
            { t: 'code', lang: 'html', label: 'Une carte produit de la Boutique Awa, mesurée à l\'échelle', code:
'<article class="rounded-2xl bg-white p-4 shadow-sm">   <!-- air intérieur : 16 px -->\n  <img src="gari.jpg" class="h-40 w-full rounded-xl object-cover">\n  <div class="mt-3 flex items-start justify-between gap-3">\n    <h3 class="font-semibold">Gari fin — sac 5 kg</h3>\n    <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs\n                 font-bold text-amber-800">-20 %</span>       <!-- pilule dosée : 10 px / 2 px -->\n  </div>\n  <p class="mt-1 text-sm text-slate-500">Moulé ce matin — Dantokpa</p>\n  <button class="mt-4 w-full rounded-xl bg-awa-500 py-3 font-bold text-white">\n    Ajouter — 3 500 F\n  </button>\n</article>' },
            { t: 'h3', h: 'gap et space-* : espacer les enfants sans marges' },
            { t: 'p', h: 'Le problème historique : pour espacer 5 cartes, on mettait une marge sur chaque carte — puis on la retirait à la dernière, et tout cassait dès qu\'une carte passait à la ligne. Deux outils règlent cela proprement aujourd\'hui. `gap-4`, sur un conteneur `flex` ou `grid` : c\'est le conteneur qui impose la distance entre ses enfants, toujours correcte, même en ligne brisée. `space-y-4`, sur un parent quelconque : il ajoute une marge à chaque enfant sauf le premier.' },
            { t: 'table', head: ['Outil', 'Mécanisme', 'Quand le préférer'], rows: [
              ['`gap-*` (flex/grid)', 'Gouttière native du conteneur', 'Tout regroupement flex/grid — le choix par défaut'],
              ['`space-y-*` / `space-x-*`', 'Marge sur tous les enfants sauf le premier', 'Empiler des paragraphes ou boutons SANS conteneur flex'],
              ['marges individuelles', '`mt-*` sur tel enfant', 'L\'exception locale, pas la règle du groupe']
            ] },
            { t: 'p', h: 'Pourquoi `gap` a-t-il rendu `space-*` presque obsolète ? Parce que `space-*` applique ses marges dans UN sens : en flex-wrap, quand les éléments passent à la ligne, la ligne suivante garde le gap vertical souhaité seulement si tu ajoutes aussi les bonnes marges — bref, fragile. `gap` étant natif au modèle, `gap-4` signifie « 16 px entre voisins dans TOUTES les directions où il y a des voisins » — une ligne ou dix, c\'est juste.' },
            { t: 'h3', h: 'Dimensions : w-full, h-screen, fractions et contraintes' },
            { t: 'p', h: 'Trois familles de classes à ne pas confondre. Les **relatives** : `w-full` = 100 % DU PARENT, `w-1/2` `w-1/3` `w-2/3` `w-1/4` = fractions du parent — idéales pour les colonnes. Les **liées à l\'écran** : `w-screen` = 100vw, `h-screen` = 100vh — la fenêtre elle-même. Les **contraintes** : `min-h-screen` (AU MOINS l\'écran — le pied de page reste en bas), `max-w-md` / `max-w-6xl` (plafonds de lisibilité), `min-w-0` (la clé des textes qui doivent pouvoir rétrécir en flex).' },
            { t: 'callout', kind: 'warn', h: '`w-screen` est le suspect n°1 des scrollbars horizontales fantômes : `100vw` INCLUT la largeur de la barre de défilement verticale. Si la page scrolle verticalement (presque toujours), `w-screen` dépasse donc de ~15 px → la page se met à défiler AUSSI horizontalement. Pour « toute la largeur du parent », c\'est `w-full` qu\'il faut ; `w-screen` ne sert que pour les sections « plein sang » délibérément évadées d\'un conteneur étroit.' },
            { t: 'table', head: ['Besoin', 'Classe', 'Piège classique'], rows: [
              ['Remplir son parent', '`w-full` / `h-full`', 'Le parent lui-même n\'a pas de taille → 0'],
              ['Au moins un écran', '`min-h-screen`', '`h-screen` fige et crée un scroll interne indésirable'],
              ['Colonne de texte lisible', '`max-w-prose` (~65 car.)', '`max-w-screen-md` n\'est PAS une mesure de texte'],
              ['Moitié / tiers', '`w-1/2`, `w-1/3`, `w-2/3`', '`w-50` n\'existe pas : ce sont des fractions, pas des %'],
              ['Mobile : vraie hauteur visible', '`min-h-dvh`', '`100vh` compte la barre d\'URL du téléphone']
            ] },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `p-4` vaut 4 px. »** Non : 4 unités × 4 px = 16 px. La confusion est la plus répandue du framework — apprends la conversion le premier jour, elle se paie cash toute la vie.',
              '**« Il faut connaître toute l\'échelle par cœur. »** Cinq ou six valeurs couvrent 95 % des usages : 2 (8), 4 (16), 6 (24), 8 (32), 12 (48), 16 (64). Le reste se déduit.',
              '**« `space-y-4` met une marge sur le premier. »** Non, précisément PAS : « entre enfants », pas « avant le premier » — sinon l\'alignement avec le titre saute.',
              '**« Les marges négatives sont interdites en Tailwind. »** `-mt-2`, `-mx-4`, `-top-2` existent et sont idiomatiques — c\'est le signe `-` DEVANT la classe qui les déclenche.',
              '**« `gap` fonctionne partout. »** Non : c\'est une propriété de `flex` et `grid`. Sur un conteneur `block`, `gap-4` ne produit aucun effet — et aucun message ne te prévient.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La confusion la plus coûteuse du quotidien : `w-full` contre `w-screen`, dont l\'écart de 15 pixels casse des pages entières. Et l\'oubli le plus visible : une page mobile dont le texte colle aux bords du téléphone, faute de gouttière `px-*` sur le conteneur.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu appliques ici le premier complément de la **Structure** vue juste avant : une fois les boîtes placées (`position`, `display`), l\'échelle leur donne leurs mesures — `mx-auto` et `px-4` du conteneur n\'étaient d\'ailleurs que du spacing déguisé. `gap` prépare directement **Flexbox & Grid**, où il deviendra l\'outil d\'espacement par défaut, et les fractions `w-1/2` s\'y reconvertiront en colonnes. Le couple « valeur de l\'échelle + préfixe d\'écran » sera décliné par le **responsive** (`p-4 md:p-8`) — même grammaire, un préfixe de plus. Côté fondamentaux, tout ceci est le **box model** du module CSS mis en pilules.' },
          ],
          errors: [
            {
              title: 'w-full vs w-screen : la confusion classique',
              bad: '<section class="w-screen bg-amber-50 py-12">\n  Bandeau promo Dantokpa\n</section>\n<!-- la page a une scrollbar verticale → 100vw DÉPASSE la zone\n     visible de sa largeur (~15 px) : toute la page peut glisser\n     horizontalement, avec un liseré blanc à droite. Sur mobile,\n     le bug est flagrant : tout « tremble » au toucher. -->',
              good: '<section class="w-full bg-amber-50 py-12">\n  Bandeau promo Dantokpa\n</section>\n<!-- 100 % du parent = exactement la zone disponible,\n     scrollbar comprise. Réserver w-screen aux sections\n     volontairement évadées d\'un conteneur plus étroit. -->',
              why: '`100%` se mesure sur le parent ; `100vw` sur la fenêtre, scrollbar de défilement INCLuse. La différence est minuscule en pixels, énorme en effet : un dépassement horizontal global, cause de 90 % des « pourquoi ma page bouge-t-elle sur les côtés ? ». La règle pratique : `w-full` par défaut ; `w-screen` uniquement quand tu SAIS pourquoi tu veux la fenêtre et pas le parent (et tu gères alors l\'éventuelle scrollbar).'
            },
            {
              title: 'Oublier px-* sur le conteneur principal',
              bad: '<main class="container mx-auto py-8">\n  <h1>Catalogue</h1>…\n</main>\n<!-- sur ordinateur : rien ne choque. Sur téléphone :\n     le texte COLLE aux bords de l\'écran, ligne après ligne —\n     l\'œil tombe littéralement hors de la page. C\'est l\'oubli\n     le plus repérable en 2 secondes sur un vrai mobile. -->',
              good: '<main class="container mx-auto px-4 py-8 md:px-6">\n  <h1>Catalogue</h1>…\n</main>\n<!-- gouttière de 16 px sur mobile (elle peut s\'élargir sur\n     desktop). Réflexe automatique : tout conteneur de page =\n     container mx-auto px-4 — le px n\'est PAS optionnel. -->',
              why: '`container` centre et plafonne, mais ne MET AUCUN air entre son contenu et les bords sur petit écran : sa largeur y égale celle du téléphone. Le `px-4` (16 px de gouttière) est le geste qui sépare immédiatement une maquette de bureau d\'un site pensé pour la main. Rituel de revue avant livraison : ouvrir la page en 375 px de large — si du texte touche le bord vitre, il manque un `px-*` quelque part.'
            }
          ],
          related: ['tw-layout', 'tw-flexbox-grid', 'tw-responsive', 'css-box-model']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-flexbox-grid',
          title: 'Flexbox & Grid',
          icon: 'grid_view',
          level: 'Intermédiaire',
          tagline: 'items-center, justify-between, grid-cols-3, col-span : le CSS que tu connais, en accéléré.',
          intro: 'Flexbox et Grid sont les deux moteurs de mise en page modernes ; Tailwind les abrège en classes, sans les trahir. Si tu connais les propriétés CSS — `justify-content`, `align-items`, `grid-template-columns` — cette fiche se lit comme une table de correspondance accélérée. Si tu découvres, elle te donne l\'ordre de bataille : flex pour une rangée ou une colonne, grid pour une surface en damier.',
          blocks: [
            { t: 'h3', h: 'Pourquoi ces deux-là sont-ils devenus la norme ?' },
            { t: 'p', h: 'Pendant vingt ans, mettre trois boîtes côte à côte exigeait des acrobaties : `float` avec ses dégagements magiques, `inline-block` et ses espacements fantômes, des clearfix partout. Flexbox (une dimension) et Grid (deux dimensions) ont réglé ce problème structurellement dans les navigateurs : aligner, répartir et centrer deviennent des PROPRIÉTÉS du conteneur. Tailwind n\'invente rien ici — il donne une grammaire d\'une ligne à deux modèles qui valent mille lignes de bricolage.' },
            { t: 'p', h: 'L\'intuition directrice, à graver : **flexbox, c\'est un BANC** — des invités alignés sur UNE rangée (ou une colonne), qu\'on espace, serre ou répartit. **Grid, ce sont les TABLES d\'un restaurant** — une salle entière quadrillée, chaque objet a sa case, certains plats occupent deux couverts (`col-span-2`). Choix de vie : si ton problème est « une liste d\'éléments dans une direction », c\'est flex ; si c\'est « une surface de cases régulières dans deux directions », c\'est grid.' },
            { t: 'h3', h: 'Flexbox : la table de correspondance' },
            { t: 'table', head: ['CSS (parent)', 'Utilitaire', 'Effet'], rows: [
              ['`display: flex`', '`flex`', 'Le conteneur aligne ses enfants sur l\'axe principal'],
              ['`flex-direction: column / row`', '`flex-col` / `flex-row`', 'Inverse l\'axe principal (vertical / horizontal)'],
              ['`flex-wrap: wrap`', '`flex-wrap`', 'Autorise le passage à la ligne (catalogue dense)'],
              ['`justify-content: center/space-between…`', '`justify-center` / `justify-between`…', 'Répartition sur l\'axe PRINCIPAL'],
              ['`align-items: center/start/stretch`', '`items-center` / `items-start`…', 'Alignement sur l\'axe SECONDAIRE'],
              ['`flex: 1 1 0%`', '`flex-1`', 'L\'enfant prend toute la place disponible'],
              ['`flex-shrink: 0`', '`shrink-0`', 'L\'enfant refuse de rétrécir (icône, avatar)'],
              ['`align-self: …`', '`self-end` / `self-center`…', 'Exception d\'alignement pour UN enfant']
            ] },
            { t: 'p', h: 'Le concept qui débloque tout : les DEUX AXES. L\'axe principal suit la direction (`flex-row` → horizontal) et reçoit les `justify-*` ; l\'axe secondaire est perpendiculaire et reçoit les `items-*`. Beaucoup de débutants tapent `justify-center` en voulant centrer VERTICALEMENT — sans voir que `justify-*` ne travaille que le long de la file. Et quand tu passes en `flex-col`, TOUT pivote de 90° : `justify-center` devient le centrage vertical. Une fois cette rotation comprise, flexbox n\'a plus aucun mystère.' },
            { t: 'code', lang: 'html', label: 'La barre de navigation de la Boutique Awa', code:
'<nav class="flex items-center justify-between gap-4 py-3">\n  <!-- items-center : TOUT le monde est centré verticalement -->\n  <!-- justify-between : premier collé à gauche, dernier à droite -->\n  <a class="text-lg font-bold text-awa-700">Boutique Awa</a>\n  <div class="hidden items-center gap-6 md:flex">\n    <a class="hover:text-awa-600">Catalogue</a>\n    <a class="hover:text-awa-600">Livraison zémidjan</a>\n  </div>\n  <button class="relative rounded-full bg-awa-500 p-2 text-white">\n    Panier\n    <span class="absolute -right-1 -top-1 rounded-full bg-red-600\n                 px-1.5 text-xs font-bold">3</span>\n  </button>\n</nav>\n\n<!-- la rangée de recherche : champ qui s\'étire, bouton fixe -->\n<form class="flex gap-2">\n  <input class="min-w-0 flex-1 rounded-xl border px-4 py-2"\n         placeholder="Chercher : gari, igname, piment…">\n  <button class="shrink-0 rounded-xl bg-awa-500 px-4 py-2 text-white">OK</button>\n</form>' },
            { t: 'demo', height: 120, caption: 'flex items-center justify-between : logo à gauche, panier à droite, tout centré verticalement', html:
'<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:#fff;border-bottom:1px solid #e5e7eb;font-size:14px"><b style="color:#b45309">Boutique Awa</b><span style="display:flex;gap:14px;color:#475569">Catalogue · Livraison</span><span style="background:#d97706;color:#fff;border-radius:999px;padding:4px 10px;font-size:12px;font-weight:700">Panier (3)</span></div><div style="display:flex;gap:8px;padding:10px 14px;background:#f8fafc"><span style="flex:1;min-width:0;border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;color:#94a3b8;font-size:13px;overflow:hidden;white-space:nowrap">Chercher : gari, igname…</span><span style="background:#d97706;color:#fff;border-radius:8px;padding:6px 12px;font-size:13px">OK</span></div>' },
            { t: 'callout', kind: 'tip', h: '`min-w-0 flex-1` est le couple magique des formulaires flex : `flex-1` dit « prends la place restante », `min-w-0` autorise le champ à RÉTRÉCIR en dessous de la largeur naturelle de son contenu (par défaut, un élément flex refuse de rétrécir sous son contenu — d\'où les inputs qui débordent du mobile, et les `truncate` muets de la fiche Typographie).' },
            { t: 'h3', h: 'Grid : les pistes en une classe' },
            { t: 'p', h: 'Grid pense en PISTES : tu déclares les colonnes, les enfants se rangent tout seuls ligne après ligne. `grid grid-cols-3 gap-4` = trois colonnes égales, gouttière 16 px — `grid-template-columns: repeat(3, minmax(0, 1fr))` en CSS généré. Un enfant peut s\'étirer avec `col-span-2` ou sauter des lignes avec `row-span-2`. Et `grid-cols-none`/`grid-flow-col` existent pour les cas tordus — mais 95 % des grilles web tiennent en `grid-cols-N` + `gap` + parfois un `col-span`.' },
            { t: 'table', head: ['CSS', 'Utilitaire'], rows: [
              ['`display: grid`', '`grid`'],
              ['`grid-template-columns: repeat(4, 1fr)`', '`grid-cols-4`'],
              ['`grid-column: span 2`', '`col-span-2`'],
              ['`grid-row: span 2`', '`row-span-2`'],
              ['`gap: 1rem` / `column-gap: 1rem`', '`gap-4` / `gap-x-4`'],
              ['`place-items: center`', '`place-items-center` (centre chaque case)'],
              ['`grid-auto-rows: minmax(120px, auto)`', '`auto-rows-[minmax(120px,auto)]` (cas avancé)']
            ] },
            { t: 'code', lang: 'html', label: 'Le catalogue : grille produits + produit vedette', code:
'<section class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">\n  <!-- le produit vedette occupe 2 colonnes sur 2 rangées -->\n  <article class="col-span-2 row-span-2 rounded-2xl bg-amber-50 p-6">\n    <h3 class="text-xl font-bold">Gari premium de Savalou</h3>\n    <p>Mise en avant du mois — stock limité.</p>\n  </article>\n  <article class="rounded-2xl bg-white p-4 shadow-sm">Huile rouge 1 L</article>\n  <article class="rounded-2xl bg-white p-4 shadow-sm">Igname pile</article>\n  <article class="rounded-2xl bg-white p-4 shadow-sm">Piment frais</article>\n  <article class="rounded-2xl bg-white p-4 shadow-sm">Aloyo — 500 g</article>\n  <!-- …les autres cartes se rangent automatiquement autour -->\n</section>' },
            { t: 'table', head: ['Situation', 'Le bon outil', 'Pourquoi'], rows: [
              ['Barre de nav, rangée de boutons, champ + bouton', '`flex`', 'Une direction, tailles variées des enfants'],
              ['Catalogue de produits, galerie, tableau de bord', '`grid`', 'Cases régulières en deux dimensions'],
              ['Pile verticale simple (cartes en colonne)', '`flex flex-col gap-*`', 'Grid n\'apporterait rien d\'une seule colonne'],
              ['Mosaïque avec vedette qui s\'étire', '`grid` + `col-span`', 'Flex-wrap ne garantit pas l\'alignement des rangées']
            ] },
            { t: 'callout', kind: 'info', h: 'Sous le capot : les colonnes générées par `grid-cols-N` sont en `minmax(0, 1fr)` — le `minmax(0, …)` est précieux, il autorise une case à RÉTRÉCIR sous la taille de son contenu. Sans lui (le comportement par défaut `auto` de CSS Grid), une carte contenant un long mot ou une image trop large ÉLARGIT toute la colonne et la grille explose. Tu rencontreras l\'idée soeur `min-w-0` côté flex : même maladie, même remède, deux directions.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `items-center` centre horizontalement. »** Non : il aligne sur l\'axe SECONDAIRE — vertical en `flex-row`. Le couple `(justify-center, items-center)` ensemble donne le vrai double centrage.',
              '**« `grid-cols-4` veut dire « 4 cartes ». »** Non : 4 COLONNES par rangée, autant de rangées que nécessaire — 9 produits donnent 3 rangées.',
              '**« `flex-1` = largeur 100 %. »** Non : « prends la place RESTANTE », partagée équitablement entre tous les enfants en `flex-1`.',
              '**« Grid remplace Flexbox. »** Ils sont complémentaires : grid pour la structure de la page, flex pour l\'intérieur des composants — on les imbrique constamment.',
              '**« Il faut un plugin pour `gap` en flex. »** Non : `gap` est natif dans les navigateurs modernes, Tailwind le génère comme n\'importe quel utilitaire.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux pièges silencieux : centrer avec `items-center` sur un parent SANS hauteur (rien à centrer — l\'élément fait la taille de son contenu), et écrire `grid-cols-4` sur un conteneur qui n\'a jamais reçu `grid` (les classes de colonnes n\'ont aucun effet — et aucun navigateur ne prévient).' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu complètes ici le triptyque de la mise en page : `display: flex/grid` n\'était qu\'une ligne de la table de la fiche **Structure** ; voici ce que ces deux valeurs débloquent réellement. Le `gap` vient de l\'échelle d\'**Espacements** — c\'est l\'usage où il rend le plus de services — et les `h-40` des cartes aussi. La grille du catalogue (`grid-cols-2 md:grid-cols-4`) annonce mot pour mot la fiche **Responsive** : les préfixes d\'écran transformeront ces pistes selon l\'appareil. Et si les propriétés CSS sous-jacentes restent floues, les fiches **Flexbox** et **Grid** du module CSS sont les mêmes notions, version longue.' },
          ],
          errors: [
            {
              title: 'items-center sans hauteur sur le parent',
              bad: '<div class="flex items-center">\n  <span>Texte centré ?</span>\n</div>\n<!-- le parent fait exactement la hauteur de son contenu :\n     il n\'y a AUCUN espace vertical dans lequel centrer.\n     items-center est pourtant correctement écrit — et sans effet\n     visible. Beaucoup ajoutent alors des marges au hasard. -->',
              good: '<div class="flex h-24 items-center justify-center">\n  <span>Texte vraiment centré</span>\n</div>\n<!-- ou selon le besoin : h-full, min-h-screen, flex-1…\n     Le centrage suppose un ESPACE disponible : donner une\n     hauteur au parent, ou laisser flex l\'étirer (items-stretch) -->',
              why: 'Un conteneur flex se dimensionne à son contenu : sans hauteur explicite ni contrainte extérieure, « centrer verticalement » dans … la hauteur exacte du contenu est une identité — rien ne bouge. Le réflexe de diagnostic : quand un alignement « ne répond pas », inspecte la TAILLE du parent d\'abord. `items-center` travaille l\'espace excédentaire ; sans excédent, il est muet — et ce n\'est pas un bug, c\'est le modèle.'
            },
            {
              title: 'grid-cols-* sur un conteneur qui n\'est pas grid',
              bad: '<section class="grid-cols-3 gap-4">\n  <article>Gari</article>\n  <article>Huile</article>\n  <article>Piment</article>\n</section>\n<!-- grid-cols-3 = grid-template-columns… appliqué à un conteneur\n     en display block : totalement inerte. Les articles restent\n     empilés, et tu cherches du côté des cartes, du gap, partout\n     sauf au bon endroit : il manque le mot `grid`. -->',
              good: '<section class="grid grid-cols-3 gap-4">\n  <article>Gari</article>\n  <article>Huile</article>\n  <article>Piment</article>\n</section>\n<!-- la paire inséparable : grid ACTIVE le modèle,\n     grid-cols-3 le configure. L\'un sans l\'autre = silence. -->',
              why: 'Les utilitaires Tailwind sont de simples déclarations CSS : `grid-template-columns` sans `display: grid` est une propriété sans effet, et le navigateur n\'émet aucune alerte. C\'est la version grid d\'un phénomène général du framework : les classes sont COOPÉRATIVES — certaines installent le modèle (`grid`, `flex`, `relative`, `overflow-hidden`), d\'autres le réglent. Quand une famille de classes semble ignorée, la première vérification est toujours « le modèle est-il activé sur ce conteneur ? ».'
            }
          ],
          related: ['tw-layout', 'tw-spacing', 'tw-responsive', 'css-flexbox', 'css-grid']
        },
      ]
    },
    /* ---------------------------------------------------------- */
    {
      id: 'style-apparence',
      name: 'Style & apparence',
      icon: 'format_paint',
      fiches: [
        /* ------------------------------------------------------ */
        {
          id: 'tw-typographie',
          title: 'Typographie',
          icon: 'text_fields',
          level: 'Débutant',
          tagline: 'text-*, font-*, leading-*, tracking-*, truncate : l\'échelle typographique complète.',
          intro: 'Le texte est ~90 % du web : une interface typographiquement ratée est ratée, même avec de belles couleurs. Tailwind organise la typo comme le reste — une **échelle** (`text-xs` → `text-9xl`), des graisses nommées (`font-medium`, `font-bold`), l\'interligne (`leading-*`) et l\'approche (`tracking-*`). Et comme partout ailleurs, le chiffre magique reste le même : des valeurs pensées ensemble, jamais improvisées.',
          blocks: [
            { t: 'h3', h: 'Pourquoi une échelle typographique plutôt que des tailles au feeling ?' },
            { t: 'p', h: 'Sans système, les tailles de texte se multiplient comme les espacements : `font-size: 19px` pour ce titre, `22px` pour celui-là, `13px` pour cette légende. À peine perceptibles prises séparément, ces micro-différences composent une page « flottante » où rien ne semble tout à fait aligné. L\'échelle fixe des notes : titre principal `text-3xl`, sous-titre `text-xl`, corps `text-base`, légende `text-sm`. Quatre notes pour toute une application — et chaque ajout d\'une cinquième devient une décision réfléchie, pas un accident.' },
            { t: 'p', h: 'Le détail qui change tout sous le capot : chaque classe `text-*` embarque SON interligne couplé. `text-lg` génère `font-size: 1.125rem; line-height: 1.75rem` — petit texte = interligne généreux (lisibilité), grand titre = interligne resserré (élégance). C\'est pourquoi un titre Tailwind sort bien tassé « naturellement » alors qu\'en CSS manuel, on oublie le `line-height` une fois sur deux et le titre est affreusement aéré.' },
            { t: 'h3', h: 'Tailles, graisses, alignements' },
            { t: 'table', head: ['Famille', 'Classes', 'Rôle'], rows: [
              ['Taille', '`text-xs` → `text-9xl`', 'Échelle fixe, avec line-height couplé'],
              ['Graisse', '`font-thin` → `font-black` (100-900)', 'Hiérarchie : `font-medium` souvent suffisant'],
              ['Style', '`italic`, `not-italic`, `underline`, `line-through`, `no-underline`', 'Emphase et annotation'],
              ['Casse', '`uppercase`, `lowercase`, `capitalize`, `normal-case`', 'Étiquettes, sur-titres'],
              ['Interligne', '`leading-none` → `leading-loose` (+ chiffrés)', 'Resserre les titres, aère les paragraphes'],
              ['Approche', '`tracking-tighter` → `tracking-widest`', 'Espace inter-lettres (uppercase + tracking-wide = combo chic)'],
              ['Alignement & retrait', '`text-left/center/right/justify`, `indent-*`', 'Mise en prose'],
              ['Débordement', '`truncate`, `text-ellipsis`, `text-clip`, `line-clamp-3`', 'Maîtrise des textes trop longs']
            ] },
            { t: 'p', h: 'Deux repères de pro : d\'abord, n\'exploite pas toute la gamme — `font-normal` (400), `font-medium` (500), `font-semibold` (600) et `font-bold` (700) suffisent à construire n\'importe quelle hiérarchie. Ensuite, le duo signature des interfaces premium : une étiquette en `text-xs font-semibold uppercase tracking-wide text-slate-500` au-dessus d\'un titre `text-2xl font-bold` — la petite casse espacée fait immédiatement « application sérieuse ».' },
            { t: 'code', lang: 'html', label: 'Une fiche produit typographiée (Boutique Awa)', code:
'<article class="rounded-2xl bg-white p-5">\n  <p class="text-xs font-semibold uppercase tracking-wide text-amber-600">\n    Farines · Moulé ce matin\n  </p>\n  <h2 class="mt-1 text-2xl font-bold leading-tight text-slate-900">\n    Gari fin — sac de 5 kg\n  </h2>\n  <p class="mt-2 text-sm leading-relaxed text-slate-600">\n    Grains réguliers, tamisage double, séchage lent. Livraison\n    zémidjan partout à Cotonou et Abomey-Calavi en moins de 2 h.\n  </p>\n  <p class="mt-4 flex items-baseline gap-2">\n    <span class="text-3xl font-extrabold tracking-tight text-awa-700">3 500 F</span>\n    <span class="text-sm text-slate-400 line-through">4 200 F</span>\n    <!-- items-baseline : les deux prix s\'alignent sur la ligne de PIED -->\n  </p>\n</article>' },
            { t: 'h3', h: 'truncate : l\'ellipsis en trois classes' },
            { t: 'p', h: 'Le nom « Gari fin premium de Savalou — sac familial 25 kg, mouture extra-fine » ne rentrera jamais dans une carte de catalogue. `truncate` le termine élégamment d\'un « … ». Sous le capot, cette classe unique en génère TROIS : `overflow: hidden` (cache ce qui dépasse) + `text-overflow: ellipsis` (met les points) + `white-space: nowrap` (interdit le retour à la ligne). Les trois sont indissociables : sans `nowrap`, le texte passe simplement à la ligne ; sans `hidden`, il déborde ; sans `ellipsis`, il est coupé net.' },
            { t: 'p', h: 'Et voici le piège qui rend fou : un texte dans un conteneur **flex** refuse souvent de tronquer. Raison : un enfant flex a `min-width: auto` par défaut — il s\'élargit à son contenu au lieu de rétrécir. `truncate` demande au texte de déborder… mais le conteneur s\'élargit avec lui, donc rien ne déborde jamais ! Le remède est le `min-w-0` (ou `flex-1` avec `overflow-hidden`) vu à la fiche Flexbox : il AUTORISE l\'enfant à devenir plus étroit que son contenu.' },
            { t: 'code', lang: 'html', label: 'truncate qui marche (et pourquoi)', code:
'<!-- 1) cas simple : largeur connue -->\n<p class="w-48 truncate">Gari fin premium de Savalou — sac familial 25 kg</p>\n\n<!-- 2) cas flex : min-w-0 OBLIGATOIRE sur le bloc qui tronque -->\n<div class="flex items-center gap-3">\n  <img src="gari.jpg" class="h-10 w-10 shrink-0 rounded-lg object-cover">\n  <div class="min-w-0 flex-1">\n    <p class="truncate font-semibold">Gari fin premium de Savalou — 25 kg</p>\n    <p class="truncate text-sm text-slate-500">Moulage traditionnel, tamis double</p>\n  </div>\n  <span class="shrink-0 font-bold text-awa-700">3 500 F</span>\n</div>\n\n<!-- 3) multi-lignes : line-clamp (2, 3…) coupe proprement les descriptions -->\n<p class="line-clamp-2 text-sm text-slate-600">Longue description du produit…</p>' },
            { t: 'callout', kind: 'tip', h: '`truncate` pour UNE seule ligne, `line-clamp-2/3` pour les extraits à lire sur plusieurs lignes avant les points de suspension. Les deux supposent une contrainte de largeur quelque part dans la chaîne des parents — c\'est toute la leçon du paragraphe précédent : l\'ellipsis n\'est pas un style, c\'est la CONSÉQUENCE visible d\'une contrainte.' },
            { t: 'h3', h: 'Polices personnalisées' },
            { t: 'p', h: 'La pile par défaut (`font-sans` = polices système) est rapide et correcte, mais une boutique a sa voix : Inter, Poppins, plus le caractère local si besoin. Deux ingrédients : charger la police (un `link` Google Fonts dans le `head`, ou auto-hébergement pour la fiabilité hors-ligne — sur les connexions mobiles irrégulières, l\'auto-hébergé évite le « texte invisible en attendant la police »), puis la déclarer dans le thème.' },
            { t: 'code', lang: 'js', label: 'theme.extend.fontFamily — la voix de la Boutique Awa', code:
'// tailwind.config.js\ntheme: {\n  extend: {\n    fontFamily: {\n      // REMPLACE la pile sans-serif utilisée partout par défaut :\n      sans: [\'Inter\', \'system-ui\', \'-apple-system\', \'sans-serif\'],\n      // une famille PLUS, pour les titres seulement :\n      display: [\'Sora\', \'Inter\', \'sans-serif\']   // → class="font-display"\n    }\n  }\n}\n/* la repli en fin de chaque pile n\'est PAS du confort :\n   police non chargée (réseau lent) → le navigateur bascule\n   sur system-ui → l\'interface reste nette au lieu d\'attendre vide. */' },
            { t: 'p', h: 'Recharge les deux mécanismes ensemble : la fiche Thème a montré COMMENT `extend` génère `font-display` ; ici tu choisis QUOI y mettre. Préfère `sans` pour la police de corps (tous les `text-*` existants en héritent automatiquement — pas une classe à ajouter) et réserve les familles additionnelles (`font-display`, `font-mono`) aux accents : prix, titres, codes promo.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `text-sm` correspond à la taille « small » universelle. »** C\'est une note de l\'échelle (0.875rem avec son interligne couplé), rien de sémantique — `text-xs` est parfaitement lisible pour les étiquettes bien pensées.',
              '**« `font-bold` change de police. »** Non : même famille, graisse 700. Changer de FAMILLE c\'est `font-display`, `font-mono`, `font-serif`.',
              '**« `leading-*` règle l\'espacement entre les lettres. »** Non : l\'interligne (entre les LIGNES). L\'espacement entre lettres, c\'est `tracking-*`. Les deux se confondent à l\'oral, jamais en CSS.',
              '**« `truncate` marche tout seul sur n\'importe quel texte. »** Il faut une largeur contrainte quelque part — et `min-w-0` dans un contexte flex, sinon le conteneur s\'élargit et rien ne tronque.',
              '**« Coller `text-lg` sur le titre est une mise en page. »** Une taille sans famille adaptée, sans graisse ni interligne ajusté ne fait pas un titre : la typo premium est un QUADRILLAGE (taille × graisse × approche × couleur), pas une seule note.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux classiques : le `truncate` posé comme un sortilège sur un texte qui ne tronque pas (la contrainte de largeur manque toujours quelque part dans la chaîne), et le mélange anarchique `font-size: 18px` en CSS custom contre `text-lg` ailleurs — une page, deux systèmes, zéro cohérence.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'L\'échelle typographique est la soeur de l\'échelle d\'**Espacements** : mêmes conversions en rem, même logique de notes. `min-w-0` et le `flex items-baseline` des prix viennent de **Flexbox** — la typo ne s\'écrit jamais sans sa boîte. La police « Inter » a été déclarée dans le **thème** (`theme.extend.fontFamily`) et les couleurs de texte (`text-slate-600`, `text-awa-700`) sont la fiche suivante — **Couleurs** — où tu apprendras à lire toute la palette. Les tailles se déclineront demain par écran (`text-sm md:text-base`) avec le **responsive**, et les fondamentaux (`line-height`, `font-family`, `@font-face`) vivent dans la fiche **Typographie** du module CSS.' },
          ],
          errors: [
            {
              title: 'truncate qui ne tronque pas',
              bad: '<div class="flex items-center gap-3">\n  <div class="flex-1">        <!-- min-width: auto ! -->\n    <p class="truncate">Gari fin premium de Savalou — sac 25 kg…</p>\n  </div>\n</div>\n<!-- le bloc flex-1 REFUSE de rétrécir sous la largeur du texte :\n     il pousse le conteneur, le texte ne déborde jamais,\n     truncate n\'a aucun « dépassement » à masquer. Tout semble\n     « cassé » — le CSS est pourtant parfaitement conforme. -->',
              good: '<div class="flex items-center gap-3">\n  <div class="min-w-0 flex-1">        <!-- la clé : min-w-0 -->\n    <p class="truncate">Gari fin premium de Savalou — sac 25 kg…</p>\n  </div>\n</div>\n<!-- min-w-0 autorise le bloc à rétrécir sous son contenu :\n     le texte déborde ENFIN, truncate fait les « … » attendus. -->',
              why: '`truncate` n\'est pas un bouton magique : il ne fait que gérer un débordement EXISTANT. Or en flex, le navigateur protège par défaut le contenu (`min-width: auto`) — le conteneur préfère déborder de son parent plutôt que couper du texte. Le bug est donc dans la BOÎTE, pas dans les points de suspension. Réflexe définitif : en flex, `truncate` s\'écrit toujours en regard d\'un `min-w-0` (ou d\'un `overflow-hidden` sur le parent).'
            },
            {
              title: 'Mélanger px et échelle sans raison',
              bad: 'h1 { font-size: 2rem; }          /* un coin en CSS custom */\n<h1 class="text-[19px]">Bienvenue</h1>   /* un autre en arbitraire */\n<h2 class="text-2xl">Catalogue</h2>       <!-- un troisième en échelle -->\n<p style="font-size: 15px">…</p>          <!-- et un quatrième au feeling -->\n/* 4 façons d\'exprimer ~la même chose : la hiérarchie visuelle\n   devient imperceptible — et le jour de la refonte, personne\n   ne sait quelle valeur est « la bonne ». */',
              good: '<h1 class="text-3xl font-bold">Bienvenue</h1>\n<h2 class="text-2xl font-semibold">Catalogue</h2>\n<p class="text-base text-slate-600">…</p>\n<!-- UNE échelle, des notes nommées, une hiérarchie lisible\n     d\'un coup d\'œil. Le jour où la taille de base change,\n     elle se change via le thème, pas au milieu du HTML. -->',
              why: 'Le problème n\'est pas esthétique mais sémantique : `text-2xl` dit « c\'est le niveau titre-2 DE MON PROJET », `19px` ne dit rien. Les échelles nommées se maintiennent globalement (via le thème) ; les pixels éclatés se retouchent page par page. Les valeurs arbitraires restent légitimes pour l\'UNIQUE — une scène de hero au millimètre — mais c\'est l\'exception qui confirme la règle : « même niveau de titre = même note de l\'échelle, jamais une nouvelle valeur ».'
            }
          ],
          related: ['tw-couleurs', 'tw-theme', 'css-typographie', 'tw-responsive']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-couleurs',
          title: 'Couleurs, opacité & gradients',
          icon: 'palette',
          level: 'Intermédiaire',
          tagline: 'La palette 50→950, la notation slash /50, ring, et les dégradés from-via-to.',
          intro: 'Tailwind livre 22 familles de couleurs, chacune déclinée en 11 nuances numérotées de 50 (presque blanc) à 950 (presque noir). Ce n\'est pas un caprice de designer : c\'est un SYSTÈME — à numéro égal, les familles partagent la même luminosité, donc s\'accordent. Tu composes en chiffres (« 700 sur 50 ») et tu restes harmonieux sans connaître la théorie des couleurs. Cette fiche t\'apprend à lire la gamme, à doser l\'alpha avec le slash, et à courber en dégradés.',
          blocks: [
            { t: 'h3', h: 'Pourquoi 220 couleurs numérotées, et pas « red » ?' },
            { t: 'p', h: 'Le CSS historique nomme 140 couleurs : `red`, `tomato`, `firebrick`, `darkred`, `crimson`… — impossible de deviner lequel est le plus sombre, et pourquoi `darkgray` est plus CLAIR que `gray` (véridique). Personne ne compose un design là-dessus, donc tout le monde finit par écrire du hexadécimal : retour au chaos des `#f59e0b` vs `#f59d0a`. La palette numérotée inverse la logique : la FAMILLE (`amber`, `slate`, `emerald`) pose la teinte, le NUMÉRO pose la profondeur. `bg-amber-500` se lit d\'un coup.' },
            { t: 'p', h: 'La clé du système : à numéro égal, les familles partagent à peu près la même luminosité perçue. Conséquence pratique immense — les ACCORDS traversent les familles : `text-slate-700` sur fond `slate-50` est lisible ; `text-amber-700` sur fond `amber-50` l\'est tout autant, sans calcul. Tu peux apprendre une combinaison une fois (texte 700 sur fond 50 = excellente lisibilité des cartes) et la décliner en dix couleurs. C\'est exactement le principe des gammes en musique : les notes changent, les intervalles tiennent.' },
            { t: 'h3', h: 'Lire la palette comme une gamme musicale' },
            { t: 'table', head: ['Zone', 'Nuances', 'Leur métier dans une interface'], rows: [
              ['Très clair', '50 → 150', 'Fonds de section, surfaces en retrait, hover doux sur fond blanc'],
              ['Clair', '200 → 300', 'Bordures, séparateurs, fonds de badges/étiquettes'],
              ['Médian', '400 → 600', 'L\'ACCENT : boutons, liens, icônes — la couleur « signature »'],
              ['Foncé', '700 → 800', 'Textes forts, titres, hover de l\'accent'],
              ['Très foncé', '900 → 950', 'Texte principal, fonds en mode sombre']
            ] },
            { t: 'p', h: 'Et les familles ont chacune un tempérament : `slate`/`zinc`/`gray`/`neutral`/`stone` sont les cinq NEUTRES — choisis-en UN par projet (jamais deux : `slate` est froid-bleu, `stone` chaud-sable, et le mélange se voit). Ensuite une ou deux FAMILLES d\'accent : `amber`/`orange` pour un marché chaleureux, `emerald`/`teal` pour la fraîcheur et le paiement réussi, `sky`/`blue` pour l\'information, `red`/`rose` pour les erreurs et promos. La règle d\'or d\'un design lisible : **80 % de neutres, 20 % d\'accent** — l\'accent qui crie partout ne crie plus nulle part.' },
            { t: 'code', lang: 'html', label: 'La carte produit aux bons numéros (Boutique Awa)', code:
'<article class="rounded-2xl border border-slate-200 bg-white p-4">\n  <!-- bordure 200, surface blanche : le neutre fait la structure -->\n  <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs\n               font-bold text-amber-800">Promo marché</span>   <!-- badge 100/800 -->\n  <h3 class="mt-2 font-semibold text-slate-900">Gari fin — 5 kg</h3> <!-- texte 900 -->\n  <p class="text-sm text-slate-500">Livré en 2 h à Cotonou</p>      <!-- secondaire 500 -->\n  <button class="mt-3 w-full rounded-xl bg-awa-600 py-2.5 font-semibold text-white\n                 hover:bg-awa-700">\n    Ajouter au panier\n  </button>  <!-- accent 600, hover 700 : un cran de profondeur, jamais de noir -->\n</article>' },
            { t: 'h3', h: 'L\'opacité à la volée : la notation slash' },
            { t: 'p', h: 'Ajoute `/50` à n\'importe quelle couleur : `bg-red-500/50`, `text-slate-900/70`, `border-black/10`. Le CANAL ALPHA de la couleur — et de la couleur SEULE — passe au pourcentage indiqué. Sous le capot : `bg-slate-900/60` génère `background-color: rgb(15 23 42 / 0.6)`. Subtilité capitale : c\'est transparent SANS toucher au contenu. Le texte écrit DANS le bandeau reste pleinement opaque — exactement ce qu\'un `opacity-60` sur l\'élément rendrait impossible (il rend TOUT translucide, texte inclus — voir l\'erreur en bas de fiche).' },
            { t: 'table', head: ['Notation', 'Alpha', 'Usage typique'], rows: [
              ['`/5` → `/10`', 'quasi imperceptible', 'teinter une surface blanche avec discrétion'],
              ['`/20` → `/30`', 'léger voile', 'bordures douces, survols, ombres colorées'],
              ['`/50`', 'moitié', 'suggestions de fond, désactivé expressif'],
              ['`/70` → `/80`', 'fort mais translucide', 'barre sticky sur `backdrop-blur`, overlays d\'image'],
              ['`/95`', 'presque plein', 'fonds qui respirent tout juste']
            ] },
            { t: 'code', lang: 'html', label: 'Overlay sur photo + barre translucide', code:
'<div class="relative h-48 overflow-hidden rounded-2xl">\n  <img src="marche.jpg" class="h-full w-full object-cover">\n  <div class="absolute inset-0 bg-slate-900/60"></div>\n  <!-- voile sombre TRANSLUCIDE : la photo reste visible en dessous,\n       le texte du bandeau reste blanc net au-dessus -->\n  <p class="absolute bottom-3 left-3 font-bold text-white">\n    Marché Dantokpa, ce matin 6 h\n  </p>\n</div>\n\n<nav class="sticky top-0 bg-white/80 backdrop-blur">\n  <!-- le menu laisse deviner le contenu qui glisse en dessous -->\n</nav>' },
            { t: 'h3', h: 'Dégradés : from, via, to' },
            { t: 'p', h: 'Trois classes posent un dégradé : `bg-gradient-to-r` (la direction : `to-b`, `to-br` diagonal…) + `from-amber-400` (départ) + `to-orange-600` (arrivée), avec optionnellement `via-amber-500` au milieu. Oubli fréquent : sans `to-*`, le dégradé part de `from-*`… vers le TRANSPARENT — utile pour fondre une image dans une section, surprenant quand tu voulais deux couleurs.' },
            { t: 'code', lang: 'html', label: 'Le bandeau promo des fêtes', code:
'<section class="rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500\n                p-6 text-white">\n  <h2 class="text-2xl font-bold">Semaine du marché</h2>\n  <p class="text-white/90">-20 % sur tout le rayon farines, livraison offerte à Abomey-Calavi.</p>\n</section>\n\n<!-- dégradé « fondu » sur une photo : moitié basse du texte lisible -->\n<div class="relative h-56 overflow-hidden rounded-2xl">\n  <img src="etal.jpg" class="h-full w-full object-cover">\n  <div class="absolute inset-x-0 bottom-0 h-24\n              bg-gradient-to-t from-black/80"></div>\n</div>' },
            { t: 'callout', kind: 'tip', h: 'Les dégradés premium sont SOBRES : deux couleurs de la même famille (amber→orange), jamais l\'arc-en-ciel. Les stops supportent aussi le slash (`from-black/80`) — c\'est l\'outil n°1 des légendes de photos lisibles.' },
            { t: 'h3', h: 'ring : l\'anneau coloré sans ombre' },
            { t: 'p', h: 'Dernier outil de la boîte : `ring-2 ring-awa-500` dessine un ANNEAU autour de l\'élément — c\'est techniquement une `box-shadow` sans flou ni décalage. Trois cas d\'usage : le focus d\'un champ (`focus:ring-2`), la sélection d\'une option (taille S/M/L), ou l\'accent fin sur une carte sans la « bordure » qui ajouterait 2 px à la mise en page. Note structurelle : ring ne prend AUCUNE place dans la mise en page (box-shadow n\'en prend jamais), là où `border-2` pousse de 2 px tout le voisinage.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `text-slate-500` et `bg-slate-500` donnent « la même couleur ». »** Même teinte, mêmes rôles différents : une couleur lisible en texte (souvent ≥ 600 sur blanc) est trop vive en fond, et un fond doux (50-100) est illisible en texte. Le numéro dépend du RÔLE.',
              '**« `/50` rend tout l\'élément semi-transparent. »** Non : uniquement LA propriété colorée par la classe — le texte intérieur, les enfants, les autres propriétés restent denses. La transparence globale, c\'est `opacity-50`, outil différent.',
              '**« Il faut écrire `border` PUIS la couleur, toujours. »** Vrai et important : la classe `border` seule pose une bordure DE COULEUR HÉRITÉE (currentColor) — qui suit le texte. L\'erreur classique, détaillée en bas.',
              '**« Le mode sombre inverse les couleurs automatiquement. »** Pas du tout : chaque surface a sa paire explicite (`bg-white dark:bg-slate-900`) — c\'est toute la fiche Dark mode. La palette ne calcule rien.',
              '**« Les dégradés, c\'est kitch. »** Les dégradés criards le sont. Deux nuances voisines et sobres sont un outil quotidien du web premium (fondus de photos, bandeaux, boutons).'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La bordure posée… mais invisible (elle a hérité la couleur du texte, ou personne ne l\'a colorée), et la carte entière rendue transparente avec `opacity-50` — texte illisible compris — alors que seul le fond devait devenir translucide.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'La palette `awa` que tu as déclarée dans le **thème** (fiche Personnaliser le thème) s\'insère ici avec les mêmes règles que les familles officielles — mêmes numéros, mêmes accords. `border-slate-200`, `rounded` et les séparateurs sont la fiche suivante — **Bordures, arrondis & ombres** — où couleur et relief se rejoignent. Les états `hover:bg-awa-700` aperçus sur les boutons seront systématisés dans **États & pseudo-classes**, et la paire clair/sombre `bg-white dark:bg-slate-900` ouvre la fiche **Dark mode**. Pour la théorie (hsl, rgb, alpha), la fiche **Unités & couleurs** du module CSS reste la référence.' },
          ],
          errors: [
            {
              title: 'La bordure invisible',
              bad: '<div class="border p-4">\n  Contenu\n</div>\n<!-- `border` seul = border-width: 1px… avec border-color HÉRITÉE\n     du texte (currentColor). Si le texte est slate-900, on a une\n     bordure noire dure. Si le texte est blanc sur fond blanc…\n     plus RIEN ne se voit. Et avec `border-2 border-slate-800`\n     pas de souci — tant qu\'on n\'oublie pas l\'un des deux autres. -->',
              good: '<div class="border border-slate-200 p-4">\n  Contenu\n</div>\n<!-- les deux classes : l\'une pose l\'EPAISSEUR (border, border-2…),\n     l\'autre pose la COULEUR (border-slate-200). Un composant de carte\n     sérieux écrit toujours les deux, consciemment. -->',
              why: 'En CSS pur, `border` sans couleur prend `currentColor` — la couleur du texte. Beaucoup pensent que « border » inclut un gris par défaut comme sur les vieux navigateurs : non. L\'habitude définitive : toute bordure s\'écrit en DEUX temps « épaisseur + couleur », exactement comme un texte s\'écrit « taille + couleur ». Et si une bordure « n\'existe pas » alors que la classe est là, la première question est : « quelle couleur a-t-elle héritée ? »'
            },
            {
              title: 'Opacité globale au lieu de la couleur alpha',
              bad: '<div class="rounded-xl bg-red-500 p-4 opacity-60">\n  <h3 class="font-bold text-white">Stock épuisé</h3>\n  <p class="text-white">Réassort prévu vendredi au marché.</p>\n</div>\n<!-- opacity-60 baisse l\'alpha de TOUT L\'ÉLÉMENT, enfants compris :\n     le texte devient aussi translucide — blanc dilué sur rouge dilué =\n     contraste effondré, badge illisible, accessibilité en chute. -->',
              good: '<div class="rounded-xl bg-red-500/60 p-4">\n  <h3 class="font-bold text-white">Stock épuisé</h3>\n  <p class="text-white">Réassort prévu vendredi au marché.</p>\n</div>\n<!-- le slash agit sur la SEULE couleur de fond : le voile est\n     translucide, le texte blanc reste dense et parfaitement lisible. -->',
              why: '`opacity` est une propriété de COUCHE : elle s\'applique au rendu complet de l\'élément — fond, texte, images, ombres. La notation slash, elle, est une propriété de COULEUR : chaque classe décide indépendamment de son alpha. La règle mnémotechnique : « quand je veux voir à TRAVERS le fond, slash ; quand je veux que tout l\'élément s\'efface (chargement, élément fantôme), opacity ». Neuf fois sur dix, le besoin réel est le slash.'
            }
          ],
          related: ['tw-theme', 'tw-bordures', 'tw-etats', 'css-unites-couleurs']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-bordures',
          title: 'Bordures, arrondis & ombres',
          icon: 'crop_square',
          level: 'Débutant',
          tagline: 'rounded-*, border-*, divide-*, shadow-*, ring-* — la finition d\'une interface premium.',
          intro: 'Deux interfaces identiques en layout peuvent faire « proto du week-end » et « produit premium » — la différence tient aux finitions : des arrondis cohérents, des séparateurs fins, des ombres dosées, des anneaux de focus nets. Ces utilitaires semblent anecdotiques ; ils portent en réalité le ressenti complet de l\'application. Cette fiche t\'apprend la grammaire du fini, et deux pièges qui survivent à tous les novices.',
          blocks: [
            { t: 'h3', h: 'Pourquoi la « finition » est-elle la signature d\'un produit ?' },
            { t: 'p', h: 'Regarde un site qui fait « brouillon » : boutons aux angles vifs ici, légèrement ronds là ; ombres noires épaisses sur une carte, absentes ailleurs ; séparateurs tantôt filet gris, tantôt marge vide. Chaque imperfection est minuscule — c\'est leur CUMUL qui crie « assemblage ». Le style iOS premium que tu admires tient à trois règles simples : UNE échelle d\'arrondis (rien de vif, jamais de valeurs hors système), des ombres SUBTILES et coloriées plutôt que noires et fortes, et des séparateurs posés exactement là où l\'œil attend une rupture.' },
            { t: 'p', h: 'Tailwind fournit les trois familles avec la même logique d\'échelle que partout ailleurs : `rounded-sm` → `rounded-3xl` + `rounded-full`, `border` → `border-8` par côté ou globaux, `shadow-sm` → `shadow-2xl`, plus les deux outils de structure `divide-*` (séparateurs entre enfants) et `ring-*` (anneaux hors-jeu). Chaque famille aura sa section ci-dessous, avec ses cas d\'usage précis — car l\'erreur n\'est jamais « pas de bordure », mais « le mauvais outil de séparation ».' },
            { t: 'h3', h: 'Arrondis' },
            { t: 'p', h: 'L\'échelle : `rounded-none` (vif), `rounded-sm` (discret, champs), `rounded` (4 px, léger), `rounded-md` / `rounded-lg` (8/12 px — les boutons et champs modernes), `rounded-xl` / `rounded-2xl` / `rounded-3xl` (les cartes — 16/24/32 px, c\'est le rayon « app mobile »), et `rounded-full` (le cercle parfait : avatars, badges, pilules). Les coins peuvent se cibler : `rounded-t-2xl` (haut seulement — une image qui domine une carte), `rounded-r-lg`, voire `rounded-tl-xl` au coin près.' },
            { t: 'p', h: 'La subtilité qui piège tout le monde une fois : l\'arrondi d\'un PARENT ne coupe pas ses ENFANTS. Une carte `rounded-2xl` contenant une image pleine largeur : l\'image, rectangulaire, DÉBORDE les coins arrondis du parent — tu obtiens des coins blancs arrondis troués par des angles vifs de photo. Deux remèdes : arrondir aussi l\'enfant (`rounded-t-2xl` sur l\'image), ou mieux, couper tout ce qui dépasse du parent avec `overflow-hidden` — la classe qui « applique » l\'arrondi à tout le contenu. C\'est l\'erreur n°1 en bas de fiche.' },
            { t: 'code', lang: 'html', label: 'La carte aux coins propres (les deux écoles)', code:
'<!-- école 1 : l\'enfant porte son propre arrondi -->\n<article class="rounded-2xl bg-white shadow-sm">\n  <img src="gari.jpg" class="w-full rounded-t-2xl" alt="Gari">\n  <div class="p-4">Gari fin — 3 500 F</div>\n</article>\n\n<!-- école 2 : le parent COUPE tout débordement (plus sûre :\n     fonctionne aussi pour l\'icône absolute, le badge, le voile) -->\n<article class="overflow-hidden rounded-2xl bg-white shadow-sm">\n  <img src="gari.jpg" class="w-full" alt="Gari">\n  <div class="p-4">Gari fin — 3 500 F</div>\n</article>\n\n<!-- avatar et pilules : rounded-full, toujours -->\n<img src="awa.jpg" class="h-10 w-10 rounded-full object-cover">\n<span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold\n             text-emerald-700">Payée — MTN MoMo</span>' },
            { t: 'demo', height: 120, caption: 'Sans overflow-hidden, l\'image perce les coins arrondis ; avec, tout est contenu', html:
'<div style="display:flex;gap:16px;justify-content:center;padding-top:6px"><div style="width:110px;border-radius:16px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08);font-size:11px"><div style="height:56px;background:linear-gradient(135deg,#f59e0b,#ea580c)"></div><div style="padding:8px">Sans couper</div></div><div style="width:110px;border-radius:16px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08);overflow:hidden;font-size:11px"><div style="height:56px;background:linear-gradient(135deg,#f59e0b,#ea580c)"></div><div style="padding:8px">overflow-hidden</div></div></div>' },
            { t: 'h3', h: 'Bordures & séparateurs' },
            { t: 'p', h: 'Rappel de la fiche Couleurs : une bordure s\'écrit en DEUX classes — épaisseur (`border`, `border-2`, `border-t`, `border-b-4`) ET couleur (`border-slate-200`), car `border` seul hérite la couleur du texte. Sur un projet soigné, la bordure de structure est presque toujours `border-slate-200` (clair) sur fond blanc, `border-slate-700` en sombre — et les côtés ciblés (`border-t`, `border-b`) servent 90 % du temps : bas de header, haut de footer, filet sous un titre de section.' },
            { t: 'p', h: 'Pour les LISTES, il y a mieux que `border-b` sur chaque item : `divide-y` sur le parent. Sous le capot, il génère un sélecteur « tout enfant SUIVANT un frère visible » — chaque item reçoit une bordure HAUTE, sauf le premier. Résultat : des filets ENTRE les lignes, jamais de double-trait, jamais de filet orphelin après le dernier élément si tu ajoutes `divide-y`… où c\'est le bord inférieur du conteneur qui gère la fin. Et son jumeau horizontal `divide-x` pour les rangées (stats, barres d\'outils).' },
            { t: 'code', lang: 'html', label: 'Le registre de la tontine, filets parfaits', code:
'<ul class="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">\n  <li class="flex items-center justify-between p-3">\n    <span>Awa Mensah</span>\n    <span class="font-semibold text-emerald-600">+ 25 000 F · MoMo</span>\n  </li>\n  <li class="flex items-center justify-between p-3">\n    <span>Koffi A.</span>\n    <span class="font-semibold text-emerald-600">+ 25 000 F · Moov</span>\n  </li>\n  <li class="flex items-center justify-between p-3">\n    <span>Sena D.</span>\n    <span class="font-semibold text-amber-600">en attente</span>\n  </li>\n</ul>\n<!-- trois items, DEUX filets — et jamais à retoucher quand\n     la liste grandit : le sélecteur gère tout seul. -->' },
            { t: 'h3', h: 'Ombres & anneaux' },
            { t: 'table', head: ['Classe', 'Usage recommandé'], rows: [
              ['`shadow-sm`', 'Relief à peine perceptible — champs, petites cartes au repos'],
              ['`shadow` / `shadow-md`', 'Cartes standard, menus déroulants'],
              ['`shadow-lg` / `shadow-xl`', 'Modales, éléments flottants, survol de carte'],
              ['`shadow-2xl`', 'Héros, moment dramatique — rare'],
              ['`shadow-amber-500/30`', 'L\'ombre COLORÉE d\'un bouton d\'accent (le geste premium)'],
              ['`ring-2 ring-awa-500`', 'Focus clavier, option sélectionnée — sans effet sur la mise en page'],
              ['`ring-offset-2`', 'Un liseré BLANC entre l\'anneau et l\'élément — focus très net']
            ] },
            { t: 'p', h: 'Comment choisir entre les trois « reliefs » ? La **bordure** structure — fine, toujours là, elle DÉFINIT la boîte (prend de la place dans la mise en page). L\'**ombre** élève : elle suggère que la surface flotte au-dessus du fond — dosée, jamais noire pure (une bonne ombre de carte est `shadow-md shadow-slate-900/5` ou légèrement teintée de la couleur d\'accent). Le **ring** annonce un ÉTAT : focus du clavier, sélection — il ne prend AUCUNE place (techniquement une box-shadow sans flou). Le trio bouton premium du quotidien : `bg-awa-500 shadow-md shadow-awa-500/25 focus:ring-2`.' },
            { t: 'code', lang: 'html', label: 'Le bouton de paiement MTN MoMo, fini pour de vrai', code:
'<button class="relative rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-900\n               shadow-lg shadow-amber-500/30\n               transition hover:bg-amber-500 hover:shadow-xl hover:shadow-amber-500/40\n               focus:outline-none focus:ring-4 focus:ring-amber-300\n               active:scale-95">\n  Payer 3 500 F avec MTN MoMo\n</button>\n<!-- lecture : ombre colorée assortie au bouton (pas de gris !),\n     ring-4 doux au focus clavier, micro-enfoncement au clic\n     (active:scale-95 — la fiche États en fera une science) -->' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `rounded-2xl` sur la carte arrondit aussi ce qu\'elle contient. »** Non — l\'arrondi décore le cadre, il ne COUPE pas le contenu. Sans `overflow-hidden` ni arrondi sur l\'enfant, l\'image perce les coins.',
              '**« Plus l\'ombre est grande, plus c\'est premium. »** C\'est l\'inverse : les interfaces sobres vivent entre `shadow-sm` et `shadow-md` ; les grosses ombres = éléments flottants seulement, et toujours teintées ou très diluées (`/10`, `/20`).',
              '**« `divide-y` pose une bordure par enfant. »** Non : une bordure HAUTE sauf au premier — c\'est précisément ce qui évite le double-trait entre deux frères.',
              '**« `ring-2` grandit le bouton de 2 px. »** Jamais : ring est une ombre, les ombres ne déplacent rien — c\'est d\'ailleurs ce qui le rend parfait pour le focus (aucun saut de mise en page, contrairement à `focus:border-2`).',
              '**« `border` et `outline` sont interchangeables. »** L\'outline natif sert l\'accessibilité ; Tailwind encourage à la remplacer par un `focus:ring` visible — mais jamais par « rien » (`focus:outline-none` SEUL est une faute d\'accessibilité).'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les deux pièges du finisseur pressé : arrondir la carte en oubliant que son image déborde (les coins troués par la rectitude de la photo), et poser `border-b` sur chaque item d\'une liste — avec le double-effet collatéral (filet après le dernier, ou suppression manuelle à maintenir) alors que `divide-y` résolvait tout.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Ces finitions s\'APPLIQUENT sur les boîtes qu\'ont posées les trois fiches de mise en page — et elles se colorent avec la palette de la fiche **Couleurs**, d\'où viennent tous ces `200`, `/30` et familles assorties. Les états `hover:`/`focus:`/`active:` aperçus sur le bouton MoMo sont la fiche suivante du parcours — **États & pseudo-classes** — pendant que l\'ombre animée au survol renverra à **Animations & transitions**. Le `gap` qui sépare les lignes du registre vient d\'**Espacements**, et la rengée `flex justify-between` de chaque ligne, de **Flexbox**. Côté CSS pur, la fiche **Transitions & animations** du module CSS explique pourquoi l\'ombre se prête si bien à l\'interpolation.' },
          ],
          errors: [
            {
              title: 'rounded oublié sur les enfants qui débordent',
              bad: '<article class="rounded-2xl bg-white shadow-md">\n  <img src="gari.jpg" class="w-full" alt="Gari">\n  <div class="p-4">Gari fin — 3 500 F</div>\n</article>\n<!-- la carte est ronde… SAUF aux deux coins supérieurs, que\n     l\'image RECTangulaire vient trouer. L\'arrondi du parent est\n     un cadre décoratif : il ne rogne PAS le contenu qui dépasse.\n     Sur mobile, où l\'image est énorme, le défaut crève l\'œil. -->',
              good: '<article class="overflow-hidden rounded-2xl bg-white shadow-md">\n  <img src="gari.jpg" class="w-full" alt="Gari">\n  <div class="p-4">Gari fin — 3 500 F</div>\n</article>\n<!-- overflow-hidden = « tout ce qui dépasse du cadre arrondi est\n     coupé » : image, badge absolute, voile de dégradé — tout rentre\n     dans les coins. L\'autre école : rounded-t-2xl sur l\'image. -->',
              why: 'Le navigateur n\'arrondit que « ce qui est peint » — or l\'image peint PAR-DESSUS le cadre du parent. Sans `overflow: hidden`, rien ne l\'écrête : c\'est le modèle de débordement CSS, pas un caprice de Tailwind. `overflow-hidden` sur le parent est la version robuste parce qu\'elle couvre TOUS les enfants présents et futurs (badge promo, overlay au survol, spinner de chargement) ; l\'arrondi reporté sur chaque enfant fonctionne mais se maintient enfant par enfant.'
            },
            {
              title: 'Bordure sur chaque item au lieu de divide',
              bad: '<ul>\n  <li class="border-b border-slate-200 p-3">Awa — 25 000 F</li>\n  <li class="border-b border-slate-200 p-3">Koffi — 25 000 F</li>\n  <li class="border-b border-slate-200 p-3">Sena — en attente</li>\n</ul>\n<!-- filet SOUS le dernier item : la liste « saigne » vers le bas,\n     surtout moche dans une carte arrondie. Et à chaque ajout /\n     suppression du dernier item, il faut retoucher les classes. -->',
              good: '<ul class="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">\n  <li class="p-3">Awa — 25 000 F</li>\n  <li class="p-3">Koffi — 25 000 F</li>\n  <li class="p-3">Sena — en attente</li>\n</ul>\n<!-- les filets sont ENTRE les items, jamais après le dernier.\n     La liste grandit ou rétrécit : zéro classe à retoucher.\n     La bordure du conteneur, elle, appartient au cadre. -->',
              why: '`border-b` répété pose le filet à un endroit structurellement faux (SOUS chaque item, y compris le dernier), et charge chaque enfant d\'une responsabilité qui relève du GROUPE. `divide-y` génère `.parent > :not([hidden]) ~ :not([hidden])` — « tout enfant qui suit un frère visible » : la sémantique exacte d\'un séparateur. Elle a l\'avantage structurel des widgets dynamiques : prérender, pagination, suppression d\'une ligne — le parent seul se reconfigure.'
            }
          ],
          related: ['tw-couleurs', 'tw-etats', 'tw-typographie', 'css-transitions-animations']
        },
      ]
    },
    /* ---------------------------------------------------------- */
    {
      id: 'interactivite-production',
      name: 'Interactivité & production',
      icon: 'bolt',
      fiches: [
        /* ------------------------------------------------------ */
        {
          id: 'tw-responsive',
          title: 'Responsive : les préfixes',
          icon: 'devices',
          level: 'Intermédiaire',
          tagline: 'sm: md: lg: xl: 2xl: — le mobile-first de Tailwind, ou la fin des media queries à la main.',
          intro: 'À Cotonou comme partout en Afrique de l\'Ouest, l\'immense majorité du trafic web arrive par téléphone — souvent en 3G irrégulière, sur un écran de 5 à 6 pouces. Le **mobile-first** n\'est donc pas un slogan : c\'est le sens de lecture par défaut de Tailwind. Une classe sans préfixe vaut pour TOUS les écrans (donc le mobile) ; un préfixe `md:` signifie « À PARTIR de 768 px, remplace ». On monte en puissance, on ne redescend jamais — et une fois cette lecture acquise, le responsive cesse d\'être un combat.',
          blocks: [
            { t: 'h3', h: 'Pourquoi « mobile-first » n\'est pas un slogan' },
            { t: 'p', h: 'La vieille école (desktop-first) écrivait le style pour grand écran, puis EMPILAIT des media queries pour défaire : `display: flex` puis `display: block` en mobile, `font-size: 32px` puis `24px`… Chaque règle mobile devait ANNULER une règle desktop — deux états à maintenir dans sa tête, et une cascade qui se mord la queue. Mobile-first inverse le flux : le CSS de base EST le mobile (empilé, gros touchers, une colonne), et chaque `@media (min-width: …)` AJOUTE de la complexité quand l\'écran grandit. Tu ne defaits jamais — tu enrichis.' },
            { t: 'p', h: 'Tailwind rend cette discipline mécanique : les classes nues = le mobile (et tous les écrans), `sm:` `md:` `lg:` `xl:` `2xl:` = les enrichissements par palier. Lis chaque classe préfixée comme une phrase — « `md:grid-cols-4` » se prononce « À PARTIR de 768 pixels, quatre colonnes ». Jusqu\'à preuve du contraire, ce qui est écrit nu est ce que ton client tiendra dans sa main.' },
            { t: 'h3', h: 'Les cinq paliers' },
            { t: 'table', head: ['Préfixe', 'Seuil', 'Équivalent CSS', 'Appareils typiques'], rows: [
              ['(aucun)', '0 px', 'Règles de base', 'TOUS les écrans — donc d\'abord le mobile'],
              ['`sm:`', '≥ 640 px', '`@media (min-width: 640px)`', 'Grands téléphones, petites tablettes'],
              ['`md:`', '≥ 768 px', '`@media (min-width: 768px)`', 'Tablettes (iPad portrait)'],
              ['`lg:`', '≥ 1024 px', '`@media (min-width: 1024px)`', 'Ordinateurs portables, iPad paysage'],
              ['`xl:`', '≥ 1280 px', '`@media (min-width: 1280px)`', 'Écrans desktop'],
              ['`2xl:`', '≥ 1536 px', '`@media (min-width: 1536px)`', 'Très grands écrans']
            ] },
            { t: 'p', h: 'Deux pièges de lecture classiques, d\'entrée. Premier : `sm:` NE signifie PAS « pour mobile » — le mobile est déjà couvert par les classes nues ; `sm:` ne sert qu\'à différencier « très petit » (< 640) de « petit » (≥ 640), un ajustement relativement rare. Second : les paliers s\'ADDITIONNENT par le bas — `md:` couvre la tablette ET tout ce qui est plus grand (sauf si `lg:` vient préciser). On parle d\'héritage par palier : chaque seuil repart de ce que le précédent a posé.' },
            { t: 'h3', h: 'La lecture qui change tout : « à partir de »' },
            { t: 'p', h: 'Prenons la grille du catalogue : `grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6`. Traduction intégrale — de 0 à 639 px : deux colonnes, gouttière 12 px (le téléphone du marchand) ; À PARTIR de 640 : inchangé (aucun `sm:`) ; À PARTIR de 768 : trois colonnes (tablette au comptoir) ; À PARTIR de 1024 : quatre colonnes, gouttière 24 px (laptop du fond de boutique). Note que `gap-3` survit sur tablette : seul `lg:` le remplace. Tu n\'as jamais écrit le mot « mobile » — c\'est l\'état par défaut.' },
            { t: 'code', lang: 'html', label: 'La page catalogue en trois phrases de Tailwind', code:
'<!-- header : empilé sur mobile, horizontal dès la tablette -->\n<header class="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">\n  <h1 class="text-xl font-bold md:text-2xl">Boutique Awa</h1>\n  <nav class="flex gap-4 text-sm md:text-base">Catalogue · Livraison · Tontine</nav>\n</header>\n\n<!-- grille produits : 2 → 3 → 4 colonnes selon l\'écran -->\n<main class="grid grid-cols-2 gap-3 px-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">\n  <article class="rounded-xl bg-white p-3 shadow-sm md:p-4">Gari — 3 500 F</article>\n  <article class="rounded-xl bg-white p-3 shadow-sm md:p-4">Huile — 2 800 F</article>\n  <!-- … -->\n</main>\n\n<!-- la barre d\'action mobile n\'existe que sous md -->\n<nav class="fixed inset-x-0 bottom-0 flex justify-around border-t bg-white p-2 md:hidden">\n  Accueil · Panier · Compte\n</nav>\n<!-- et le menu latéral n\'existe qu\'À PARTIR de md -->\n<aside class="hidden w-64 border-r p-4 md:block">Filtres</aside>' },
            { t: 'callout', kind: 'tip', h: 'Le couple `hidden md:block` / `md:hidden` est l\'idiome d\'adaptation structurelle : la même FONCTION (naviguer) prend deux FORMES selon l\'écran (tab bar mobile / sidebar desktop). Ne cherche pas à « rendre » la tab bar élégante sur desktop : cache-la, affiche l\'autre. Le responsive sérieux fait ça — adapter la STRUCTURE, pas seulement retailler.' },
            { t: 'h3', h: 'Aller plus loin : max-*, l\'arbitraire, portrait & tactile' },
            { t: 'p', h: 'Parfois tu veux « tout SAUF desktop » : les variantes inverses `max-md:` (de 0 à 767 px) existent pour ça — un bandeau « appelle-nous » utile uniquement au téléphone. Pour les cas hors-échelle, les media queries arbitraires : `min-[400px]:grid-cols-3`, `max-[900px]:flex-col`. Et les variantes d\'ORIENTATION : `portrait:` / `landscape:` — un tableau de tontine qui pivote élégamment quand le client tourne son téléphone pour voir toutes les colonnes.' },
            { t: 'table', head: ['Variante', 'Se déclenche quand…', 'Exemple d\'usage'], rows: [
              ['`max-md:`', 'écran < 768 px', 'Bandeau « Appelez la boutique » (mobile seul)'],
              ['`portrait:` / `landscape:`', 'l\'écran est plus haut / plus large', 'Tableau de tontine : colonnes cachées en portrait'],
              ['`min-[400px]:`', 'media arbitraire', 'Un seuil d\'affiche précis, hors grille standard'],
              ['`hover:hover:`', 'l\'appareil sait VRAIMENT survoler', 'N\'activer les effets hover que souris/trackpad'],
              ['`motion-safe:`', 'l\'utilisateur n\'a pas réduit les animations', 'Le confort accessible (fiche Animations)']
            ] },
            { t: 'callout', kind: 'info', h: 'Sous le capot : toutes ces classes ne sont que des `@media (min-width: …)` générées automatiquement, dans le BON ordre (les plus larges après). C\'est ce qui garantit qu\'en cas de conflit, `lg:` gagne sur `md:` sur aucun — sans que tu gères toi-même l\'ordre de tes media queries. Un seul fichier généré, zéro annulation, cascade saine : c\'est le bénéfice caché du préfixe — il t\'interdit structurellement le desktop-first.' },
            { t: 'p', h: 'Dernier mot de méthode (et c\'est l\'objet de l\'une des erreurs en bas) : le responsive se pense PAR BLOC FONCTIONNEL, pas classe par classe. Question rituelle pour chaque section — « sur téléphone, quelle est la version naturelle de ce bloc ? » — puis tu montes. Trois variations standard couvrent 90 % des cas : nombre de colonnes (grid), visible/caché (hidden/md:block), orientation (flex-col, puis flex-row).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `md:` signifie « version mobile ». »** C\'est exactement l\'inverse : `md:` s\'allume À PARTIR de 768 px — donc sur tablette et au-delà. Le mobile est écrit SANS préfixe. C\'est l\'erreur n°1 du framework (détaillée en bas).',
              '**« Il faut re-typer chaque classe à chaque palier. »** Non : les paliers HÉRITENT. `p-4` vaut partout tant qu\'un `lg:p-8` ne le remplace pas. On n\'écrit que les DIFFÉRENCES.',
              '**« `hidden md:block` et `md:hidden` font la même chose. »** Non : le premier = caché sur mobile, visible À PARTIR de md ; le second = visible sur mobile, caché À PARTIR de md. Deux motifs complémentaires, pas interchangeables.',
              '**« Tailwind rend le site responsive tout seul. »** Le framework te fournit les paliers ; rien n\'est automatique. Un catalogue non préfixé sera identique sur tous les écrans — TU écris l\'adaptation.',
              '**« Tester = rétrécir la fenêtre du navigateur. »** Utile pour un premier tri, mais la cible réelle reste le téléphone : ouvre ton téléphone, sur ta connexion mobile, avant de livrer. Une heure de terrain à Dantokpa vaut mille redimensionnements.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'L\'inversion mentale (`md:` pensé « pour mobile ») qui plante toute la logique, et son corollaire invisible : la page desktop jamais questionnée parce qu\'on n\'a rétréci qu\'en traînant la fenêtre — sans plan par bloc.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu viens de réactiver tout le module en un seul préfixe : `grid-cols-2 md:grid-cols-4` (grilles de **Grid**), `p-4 md:p-8` (échelle d\'**Espacements**), `hidden md:block` (le display de **Structure**), `text-sm md:text-base` (**Typographie**) — chaque famille se decline ainsi. Le `dark:` que tu croiseras et les `hover:` déjà vus sont des COUSINS de `md:` — même syntaxe préfixe:classe, autres conditions — la fiche **États** systématise la grammaire, la fiche **Dark mode** l\'applique au thème. Et si le calcul `@media (min-width)` reste mystérieux, la fiche **Responsive** du module CSS est la référence de base.' },
          ],
          errors: [
            {
              title: 'Penser les préfixes à l\'envers (« md = mobile »)',
              bad: '<p class="md:block hidden">\n  Menu\n</p>\n<!-- intention : « cacher sur mobile, montrer sur desktop ».\n     réalité : `hidden` vaut PARTOUT (mobile inclus), puis `md:block`\n     l\'emporte dès 768 px. Ça semble marcher… jusqu\'à ce qu\'on\n     écrive « text-sm md:text-xs » en pensant « petit sur mobile » :\n     le mobile garde sm, le DESKTOP rétrécit. Tout le site\n     adopte instantanément la logique inversée, écran après écran. -->',
              good: '<p class="hidden md:block">\n  Menu\n</p>\n<!-- lecture correcte : caché partout [*], puis `md:` s\'allume\n     À PARTIR de 768 px et affiche. Le mobile est TOUJOURS l\'état\n     sans préfixe. L\'ordre des classes n\'a aucun effet — c\'est leur\n     SÈMANTIQUE qui compte, pas leur position dans l\'attribut. -->',
              why: 'Les préfixes de Tailwind sont des `min-width` : ils s\'allument QUAND L\'ÉCRAN GRANDIT, jamais l\'inverse. « md » = MEDIUM+, pas « moyen mobile ». Tant que cette lecture n\'est pas gravée, chaque classe préfixée est un pari — et le bug caractéristique (le style mobile correct mais le desktop inexplicablement « cassé ») reste incompréhensible. La phrase-test d\'un pro : « sans préfixe = mobile ; préfixe = À PARTIR DE… ».'
            },
            {
              title: 'Une media query par élément au lieu d\'un plan global',
              bad: '<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">\n<main class="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">\n<article class="rounded sm:rounded-lg md:rounded-xl lg:rounded-2xl">\n<button class="px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">\n<!-- chaque élément reçoit CINQ tailles la finesse d\'un cheveu :\n     la page grandit d\'un cran à CHAQUE palier, pour un écart\n     imperceptible. Tu passes tes journées à préfixer — et\n     l\'utilisateur ne distingue rien entre sm et md. -->',
              good: '<!-- le plan global : DEUX ou TROIS versions de chaque zone,\n     choisies une fois pour toutes -->\n<h1 class="text-xl font-bold lg:text-3xl">\n<main class="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">\n<button class="px-4 py-2 lg:px-6 lg:py-3">\n<!-- mobile d\'abord, tablette/desktop ajustés où c\'est UTILE.\n     Question d\'équipe : « quels paliers changent VRAIMENT cette\n     zone ? » — la réponse est presque jamais « les six ». -->',
              why: 'Le préfixe étant bon marché à écrire, on cède à la tentation de TOUT varier à chaque seuil — au prix d\'un HTML saturé et d\'une inutilité totale (ajustements sous le seuil de perception). Le bon questionnement est global : « quels sont les deux-trois moments où ce bloc change de nature ? ». Un catalogue : mobile (2 cols), tablette (3), desktop (4) — les autres subtilités sont du bruit. Moins de préfixes, plus de pensée.'
            }
          ],
          related: ['tw-flexbox-grid', 'tw-spacing', 'css-responsive', 'tw-dark']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-etats',
          title: 'États & pseudo-classes',
          icon: 'touch_app',
          level: 'Intermédiaire',
          tagline: 'hover:, focus:, active:, disabled:, group-hover, peer-* : l\'interactivité sans une ligne de JS.',
          intro: 'Une interface vivante RÉAGIT : le bouton s\'assombrit sous le doigt, le champ se cerne au focus, la ligne entière s\'éclaire au survol, le menu s\'adoucit quand il est désactivé. Tout cela s\'écrivait en JavaScript — on changeait des classes à la souris. Les pseudo-classes CSS font ce travail nativement, et Tailwind les abrège en préfixe d\'état : `hover:`, `focus:`, `active:`, `disabled:`… plus les deux chefs d\'orchestre `group`/`peer`. Cette fiche couvre la grammaire complète — et ses frontières précises.',
          blocks: [
            { t: 'h3', h: 'Pourquoi styler les états SANS JavaScript ?' },
            { t: 'p', h: 'On pourrait tout faire en JS : écouter `mouseenter`, ajouter une classe, l\'enlever à `mouseleave`… et payer le prix : des écouteurs qui traînent, des états désynchronisés (ta souris sort pendant un scroll ?), du code fragile au moindre refactor. Les pseudo-classes sont une déclaration AU NAVIGATEUR : « tant que l\'utilisateur survole CET élément, applique CE style » — le moteur natif gère les transitions d\'état à la perfection, gratuitement, même hors de ta vue. C\'est le même réflexe que partout en Tailwind : déléguer au navigateur ce qui relève du navigateur.' },
            { t: 'p', h: 'La grammaire est celle des préfixes déjà croisés (`md:`, `dark:`) : `état:classe`. `hover:bg-awa-600` = « bg-awa-600, uniquement au survol ». Lis toujours la phrase complète : « AU SURVOL, fond awa 600 ». Quand plusieurs conditions s\'imposent, elles se chaînent : `md:hover:bg-awa-600` = « à partir de la tablette ET au survol ». L\'ordre des préfixes dans la classe n\'a pas d\'impact sur sa signification — les deux conditions doivent être vraies, c\'est un ET logique.' },
            { t: 'h3', h: 'Les états de base' },
            { t: 'table', head: ['Préfixe', 'Se déclenche sur…', 'Usage typique'], rows: [
              ['`hover:`', 'Survol souris/trackpad', 'Couleurs plus profondes (-1 nuance), ombres, léger translate'],
              ['`focus:`', 'Focus clavier ou clic dans un champ', 'Cerne visible (`ring`), couleur de bordure'],
              ['`focus-visible:`', 'Focus CLAVIER UNIQUEMENT', 'L\'anneau de focus sans agresser le clic souris'],
              ['`active:`', 'Pendant l\'appui (clic/toucher maintenu)', 'Micro-enfoncement (`scale-95`), accent fort'],
              ['`disabled:`', 'Attribut `disabled` présent', 'Opacité réduite, curseur, grisaille'],
              ['`visited:`', 'Lien déjà visité', 'Nuancer les liens historiques'],
              ['`first:` / `last:` / `odd:` / `even:`', 'Position parmi les frères', 'Alternance des lignes, coins arrondis des extrémités'],
              ['`checked:` / `required:` / `placeholder-shown:`', 'État natif du formulaire', 'Cases cochées, champs requis, placeholder encore visible'],
              ['`empty:`', 'Aucun contenu enfant', 'État vide d\'une liste (« aucune commande »)']
            ] },
            { t: 'code', lang: 'html', label: 'Le bouton MTN MoMo qui répond aux quatre sensations', code:
'<button class="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-900 shadow-md\n               transition\n               hover:bg-amber-500\n               focus:outline-none focus:ring-4 focus:ring-amber-300\n               active:scale-95\n               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400">\n  Payer avec MTN MoMo\n</button>\n<!-- lecture :\n     hover  → la couleur monte d\'une nuance (400 → 500)\n     focus  → ring-4 (visible au clavier) ; on retire l\'outline natif\n     active → le bouton s\'enfonce de 5 % — sensation d\'appui réel\n     disabled → à la fois pâle, curseur interdit ET « plus de hover »\n     transition (fiche Animations) adoucit tous ces changements. -->' },
            { t: 'callout', kind: 'tip', h: 'Réflexe d\'accessibilité : `focus:` n\'est pas du style décoratif — c\'est le seul repère d\'un utilisateur au CLAVIER (tabulation). Ne supprime jamais l\'outline sans le remplacer par un `ring` visible. `focus-visible:` affine encore : l\'anneau n\'apparaît qu\'au clavier, pas au simple clic — le meilleur des deux mondes.' },
            { t: 'h3', h: 'group-hover : réagir au survol du PARENT' },
            { t: 'p', h: 'Cas concret du quotidien : une CARTE entière est cliquable (produit → page détail), mais c\'est son TITRE qui doit virer à l\'ambre au survol, et sa petite flèche glisser à droite. En CSS pur, il fallait écrire `.carte:hover .titre { … }` dans un fichier séparé. Tailwind résout en deux marqueurs coopératifs : `group` sur l\'ancêtre commun (la carte), `group-hover:text-amber-600` sur le titre, `group-hover:translate-x-1` sur la flèche. Lecture : « quand le GROUPE est survolé, cet enfant change ».' },
            { t: 'code', lang: 'html', label: 'La carte produit, toute entière sensible', code:
'<a href="/produit/gari" class="group block rounded-2xl bg-white p-4 shadow-sm\n                               transition hover:shadow-md">\n  <div class="overflow-hidden rounded-xl">\n    <img src="gari.jpg" class="transition group-hover:scale-105" alt="Gari">\n  </div>\n  <h3 class="mt-3 font-semibold text-slate-900 transition group-hover:text-awa-600">\n    Gari fin — 5 kg\n  </h3>\n  <p class="flex items-center justify-between text-sm text-slate-500">\n    3 500 F\n    <span class="transition group-hover:translate-x-1 group-hover:text-awa-600">→</span>\n  </p>\n</a>\n<!-- trois éléments réagissent au MÊME survol de la carte :\n     zoom de l\'image, titre ambre, flèche qui glisse — zéro JS. -->' },
            { t: 'callout', kind: 'warn', h: 'Deux précautions avec `group` : 1) le marqueur doit être sur l\'ANCÊTRE commun de tous les enfants qui réagissent — `group-hover` écrit sur un élément SANS ancêtre `group` est inerte (erreur en bas de fiche) ; 2) dans une carte qui en contient une autre (une carte « vedette » dans la grille), nomme tes groupes : `group/vedette` + `group-hover/vedette:scale-105` — sinon les hover remontent au mauvais groupe et tout s\'allume en cascade.' },
            { t: 'h3', h: 'peer : l\'état d\'un FRÈRE en influence un autre' },
            { t: 'p', h: 'Le frère de `group` : `peer` traite le cas « un élément doit changer selon l\'état d\'un AUTRE élément du même niveau ». Archétype : une case à cocher invisible pilote son propre interrupteur dessiné. L\'input (source) porte `peer`; l\'élément piloté porte `peer-checked:bg-emerald-500`. Sous le capot : le sélecteur CSS des frères `~` — CE qui impose LA contrainte fatale : l\'élément piloté doit venir APRÈS la source dans le HTML. `peer` ne remonte jamais.' },
            { t: 'code', lang: 'html', label: 'L\'interrupteur « payer à la livraison », 100 % CSS', code:
'<label class="flex cursor-pointer items-center gap-3">\n  <!-- 1) la case RÉELLE : invisible mais fonctionnelle (clavier, lecteurs d\'écran) -->\n  <input type="checkbox" class="peer sr-only">\n  <!-- 2) la piste dessinée : réagit à l\'état du frère placé AVANT elle -->\n  <span class="h-6 w-11 rounded-full bg-slate-300 transition\n               peer-checked:bg-emerald-500\n               peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-300 relative">\n    <!-- 3) le point blanc qui glisse -->\n    <span class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition\n                 peer-checked:translate-x-5"></span>\n  </span>\n  Payer à la livraison (zémidjan)\n</label>' },
            { t: 'p', h: 'Les autres usages stars du duo : un menu burger (input caché + panneau `peer-checked:translate-x-0`), un « afficher le mot de passe » (checkbox + `peer-checked:hidden` sur l\'icône œil-fermé), un champ « autre montant » qui s\'éveille (`peer-checked:opacity-100 peer-checked:pointer-events-auto`) quand la case « montant libre » est cochée dans le formulaire de tontine.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `hover:` fonctionne sur téléphone. »** Il n\'y a pas de survol au tactile : un premier TAP TIENT parfois lieu de hover (affichage intempestif d\'un menu !), et le tap d\'après suit le lien. Sur mobile, mise sur `active:` et des interactions explicites.',
              '**« `focus:` disparaît dès le clic relâché. »** Non : le focus PERSISTE tant que l\'élément reste focalisable (champ rempli, bouton tabulé). `active:` est celui qui ne vit que pendant l\'appui. Les deux se complètent.',
              '**« `group-hover:` se pose sur l\'élément qui a `group`. »** Non : `group` marque l\'ANCÊTRE ; `group-hover:` décrit l\'ENFANT. Deux marqueurs, deux éléments différents — les confondre est l\'erreur n°1 (en bas).',
              '**« `peer-checked:` marche quel que soit l\'ordre du HTML. »** Faux : le sélecteur `~` ne vise que les frères SUIVANTS. L\'input source doit venir AVANT l\'élément piloté dans le balisage.',
              '**« `disabled:opacity-50` suffit à désactiver un bouton. »** La classe stylise, elle ne DÉSACTIVE pas : c\'est l\'attribut HTML `disabled` qui bloque les clics (et déclenche la pseudo-classe). Style sans attribut = bouton pâle mais cliquable.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le `group-hover` déclaré sur un élément dont AUCUN ancêtre n\'est marqué `group` — ou sur le mauvais — et le `focus:` soigneusement dessiné… puis effacé par un `outline-none` sans remplacement, condamnant l\'utilisateur clavier.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les états revisitent TOUT ce qu\'on a stylé jusqu\'ici : `hover:bg-awa-600` et `focus:ring-4` (**Couleurs**, **Bordures**), `active:scale-95` et `group-hover:translate-x-1` (les transforms d\'**Animations**), `hover:shadow-md` (ombres). Ils se combinent au **responsive** (`md:hover:bg-awa-600`) et au **dark mode** (`dark:hover:bg-slate-700`) par la même grammaire de préfixes. Côté formulaires — terrains d\'élection de `checked`, `required`, `disabled` — la fiche **Formulaires** du module HTML pose la structure (label, attributs natifs) sur laquelle ces pseudo-classes s\'appuient ; sans attribut `disabled` réel, pas de `disabled:`.' },
          ],
          errors: [
            {
              title: 'group-hover sans group (ou sur le mauvais parent)',
              bad: '<a class="block rounded-2xl bg-white p-4">\n  <img src="gari.jpg" class="group-hover:scale-105">\n  <h3 class="group-hover:text-awa-600">Gari fin</h3>\n</a>\n<!-- AUCUN élément ne porte `group` : le navigateur cherche un\n     ancêtre marqué, n\'en trouve pas → les deux classes sont inertes.\n     Variante : `group` posé sur l\'image SEULE → le titre, enfant\n     du lien mais PAS de l\'image, ne réagit jamais. -->',
              good: '<a class="group block rounded-2xl bg-white p-4">\n  <img src="gari.jpg" class="transition group-hover:scale-105">\n  <h3 class="group-hover:text-awa-600">Gari fin</h3>\n</a>\n<!-- la paire inséparable : `group` sur l\'ANCÊTRE commun (le lien),\n     `group-hover:*` sur chaque enfant qui doit réagir.\n     Groupes imbriqués → group/vedette + group-hover/vedette:… -->',
              why: '`group-hover:` génère un sélecteur `.group:hover …` : il ne peut trouver que des ancêtres de CLASSE group. Sans ce marqueur, la classe reste lettre morte — et comme aucun message d\'erreur n\'existe, on peut croire à une faute de frappe interminable. La règle mentale : « Cherche d\'abord le groupe, ensuite l\'effet » — le débogage de toute interaction Tailwind commence par vérifier OÙ est posé le marqueur.'
            },
            {
              title: 'focus: pour le style accessibilité',
              bad: '<button class="rounded-xl bg-awa-500 px-6 py-3 text-white\n               focus:outline-none">\n  Commander\n</button>\n<!-- `focus:outline-none` supprime l\'anneau NATIF du focus…\n     et RIEN ne le remplace : l\'utilisateur au clavier tabule\n     dans le noir total — impossible de savoir où on est.\n     Le site « marche à la souris », inaccessible sinon. -->',
              good: '<button class="rounded-xl bg-awa-500 px-6 py-3 text-white\n               focus:outline-none\n               focus-visible:ring-4 focus-visible:ring-awa-300">\n  Commander\n</button>\n<!-- outline retiré ET remplacé par un ring-4 doux, qui n\'apparaît\n     qu\'au CLAVIER (focus-visible) : confort souris ET repère clavier.\n     Jamais l\'un sans l\'autre. -->',
              why: 'L\'outline de focus est la seule indication de position pour qui navigue au clavier (handicap, power-user, mobile en mode talk-back). Le supprimer « pour l\'esthétique » sans le remplacer exclut ces utilisateurs — et c\'est le seul défaut de conception qu\'on INSTALLE en trois mots. La discipline : on retire l\'outline natif SEULEMENT parce qu\'on le remplace par un ring clairement visible, et `focus-visible:` pour qu\'il ne gêne pas le clic. L\'accessibilité n\'est pas une option cosmétique.'
            }
          ],
          related: ['tw-responsive', 'tw-dark', 'tw-animations', 'css-transitions-animations', 'html-formulaires']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-dark',
          title: 'Dark mode',
          icon: 'dark_mode',
          level: 'Débutant',
          tagline: 'dark:bg-*, la stratégie class vs media, et comment brancher un vrai toggle.',
          intro: 'Le mode sombre est passé du « plus sympa » au « attendu » : confort le soir (et on consulte beaucoup le soir), économie d\'écran OLED, sensation de produit soigné. La bonne nouvelle : Tailwind en fait un préfixe d\'état comme les autres — `dark:bg-slate-900`. La moins bonne : un détail décide de TOUT — QUI déclenche le sombre ? Le réglage système du visiteur, ou un bouton de ton site ? Tant que cette stratégie n\'est pas tranchée, `dark:` fait illusion.',
          blocks: [
            { t: 'h3', h: 'Pourquoi le dark mode mérite une stratégie, pas des tâtonnements' },
            { t: 'p', h: 'Le sombre se rate plus vite que le clair : un `bg-slate-900` jeté sur la page, un texte blanc pur qui éblouit au lieu de rassurer, des ombres qui deviennent invisibles, des couleurs d\'accent qui hurlent. Et surtout : 150 classes `dark:` écrites avec amour… qui ne s\'allument JAMAIS parce que la stratégie `media` par défaut suit le réglage système, alors que l\'équipe testait un « toggle » inexistant. D\'où cette fiche en deux temps : d\'abord écrire les deux visages de chaque surface, ensuite brancher l\'interrupteur.' },
            { t: 'p', h: 'Grammaire — identique à `hover:` et `md:` : `dark:bg-slate-900` se lit « EN SOMBRE, fond slate 900 ». Chaque élément peut donc porter DEUX classes contradictoires en apparence : `bg-white dark:bg-slate-800`. Ce n\'est pas une redondance, c\'est le contrat : toi qui écris UNE surface, tu décris ses DEUX visages en même temps. Jamais « on fera le sombre plus tard » — c\'est comme décider de l\'accessibilité à la fin : ça ne revient jamais, et ça coûte dix fois.' },
            { t: 'h3', h: 'Écrire les deux états de chaque surface' },
            { t: 'p', h: 'Le modèle mental : pense ta page en COUCHES, et inverse par les EXTRÊMITÉS de la palette. Fond de page : blanc → slate-900/950. Surface (cartes) : blanc → slate-800. Bordures : slate-200 → slate-700. Texte principal : slate-900 → slate-100. Texte secondaire : slate-500 → slate-400. L\'accent (boutons, liens) : souvent plus VIF en sombre (`awa-500` → `awa-400`) car les profondeurs absorbent la lumière. Erreur classique à éviter : « blanc pur sur noir pur » — le contraste maximal fatigue ; les extrêmes de la palette (100/900) sont plus reposants que (blanc/noir).' },
            { t: 'table', head: ['Couche', 'Clair', 'Sombre'], rows: [
              ['Fond de page', '`bg-slate-50` / `bg-white`', '`dark:bg-slate-950` / `dark:bg-slate-900`'],
              ['Surface (carte)', '`bg-white`', '`dark:bg-slate-800`'],
              ['Bordure fine', '`border-slate-200`', '`dark:border-slate-700`'],
              ['Texte fort', '`text-slate-900`', '`dark:text-slate-100`'],
              ['Texte discret', '`text-slate-500`', '`dark:text-slate-400`'],
              ['Accent / bouton', '`bg-awa-600`', '`dark:bg-awa-500` (un cran plus clair)'],
              ['Ombre', '`shadow-slate-900/10`', '`dark:shadow-none` ou `dark:shadow-black/40`']
            ] },
            { t: 'code', lang: 'html', label: 'La carte commande, deux visages écrits ensemble', code:
'<body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">\n  <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm\n                  dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">\n    <p class="text-xs font-semibold uppercase tracking-wide text-amber-600\n              dark:text-amber-400">Commande n°241</p>\n    <h3 class="mt-1 font-bold">Gari fin — sac 5 kg × 2</h3>\n    <p class="text-sm text-slate-500 dark:text-slate-400">\n      Livraison zémidjan — Abomey-Calavi, ce soir avant 20 h.\n    </p>\n    <button class="mt-3 rounded-xl bg-awa-600 px-4 py-2 font-semibold text-white\n                   hover:bg-awa-700\n                   dark:bg-awa-500 dark:hover:bg-awa-400 dark:text-slate-950">\n      Suivre la livraison\n    </button>\n  </article>\n</body>' },
            { t: 'callout', kind: 'tip', h: 'Rituel de rédaction : chaque fois que tu écris une classe de couleur de SURFACE (fond, bordure, texte), écris IMMÉDIATEMENT sa partenaire `dark:` — même une approximation meilleure que rien. Trois paires par cœur et tu couvres 95 % de la page : `bg-white dark:bg-slate-800/900`, `text-slate-900 dark:text-slate-100`, `border-slate-200 dark:border-slate-700/800`.' },
            { t: 'h3', h: 'Deux stratégies, à choisir une fois' },
            { t: 'table', head: ['Stratégie', 'Config', 'Le sombre suit…', 'Toggle possible ?'], rows: [
              ['`media` (défaut v3)', 'rien à faire', 'le réglage SYSTÈME de l\'utilisateur', 'non — ni mémorisation, ni bouton'],
              ['`class` (recommandé)', '`darkMode: \'class\'`', 'la classe `dark` sur l\'élément `html`', 'oui — avec mémorisation du choix']
            ] },
            { t: 'p', h: 'Sous le capot : la stratégie `media` génère `@media (prefers-color-scheme: dark) { … }` — TOUT est décidé par le téléphone, ton site n\'a aucun levier (certains visiteurs veulent le clair alors que leur système est sombre). La stratégie `class` génère `.dark .dark\:bg-slate-900 { … }` — un sélecteur ordinaire activé par la classe : TU poses cette classe via un script, tu la mémorises (localStorage), et le visiteur garde son choix à la prochaine visite.' },
            { t: 'code', lang: 'html', label: 'Le toggle complet (stratégie class, avec mémoire)', code:
'<!-- 1) tailwind.config.js :  darkMode: "class"  -->\n\n<!-- 2) dans le <head> — AVANT tout affichage (sinon flash blanc !) -->\n<script>\n  // applique le choix mémorisé, sinon le réglage système\n  if (localStorage.theme === "dark" ||\n      (!("theme" in localStorage) && matchMedia("(prefers-color-scheme: dark)").matches)) {\n    document.documentElement.classList.add("dark");\n  }\n</script>\n\n<!-- 3) le bouton de bascule (où tu veux dans la page) -->\n<button id="theme-toggle" class="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">\n  Thème\n</button>\n<script>\n  document.getElementById("theme-toggle").addEventListener("click", () => {\n    const isDark = document.documentElement.classList.toggle("dark");\n    localStorage.theme = isDark ? "dark" : "light";   // mémoire du choix\n  });\n</script>' },
            { t: 'callout', kind: 'warn', h: 'Le flash blanc (FOUC) est le tueur de crédibilité : la page s\'affiche en clair, puis « saute » en sombre une fois JS démarré. Remède non négociable : le script d\'initialisation dans le `head`, en ligne, AVANT le rendu de la page — quatre lignes, aucun framework. Tout ce qui attend `DOMContentLoaded` arrive trop tard ; tout ce qui attend un fichier JS externe (même court) ajoute un aller-retour réseau.' },
            { t: 'p', h: 'Derniers travaux pratiques : les IMAGES et les OMBRES. Une photo sur fond blanc pur (`<img>` de QR-code MoMo, capture de reçu) agresse en sombre — `dark:opacity-90` l\'adoucit ; une ombre élégante `shadow-md` devient INVISIBLE sur slate-900 — `dark:shadow-none` honnête, ou teinte renforcée `dark:shadow-black/40`. Et si tu changes plusieurs couleurs d\'un coup au toggle, pense `transition-colors` sur le body (fiche Animations) pour un glissement doux au lieu d\'un basculement sec.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Écrire `dark:` partout suffit. »** Sans stratégie activée, ces classes sont inertes : `media` suit le système, `class` exige ton intervention. L\'écriture et le DÉCLENCHEMENT sont deux travaux séparés.',
              '**« Sombre = inverser blanc ↔ noir partout. »** Le noir/blanc purs agressent ; les sombres réussis vivent en slate-900/slate-100, avec les accents légèrement ÉCLAIRCIS (500 → 400).',
              '**« La stratégie `media` accepte un toggle. »** Non : elle obéit au système, un point c\'est tout. Le toggle = stratégie `class` + script — l\'un ne va pas sans l\'autre (voir l\'erreur en bas).',
              '**« Tester = retourner SON téléphone. »** Tout le monde teste son mode préféré ; l\'autre reste cassé. Rituel : vérifier la page DANS LES DEUX modes avant chaque livraison — et sur les surfaces secondaires (formulaires, tableaux, modales).',
              '**« `localStorage` seul règle la persistance. »** Il mémorise, mais c\'est l\'init PRÉ-RENDU dans le `head` qui évite le flash : les deux scripts se complètent, l\'un sans l\'autre laisse une fissure visible.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Écrire consciencieusement tout le sombre… avec la stratégie par défaut qui l\'ignore ; et ne valider que « son » mode, laissant le site à moitié illisible pour la moitié des visiteurs.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: '`dark:` est un préfixe d\'état comme `hover:` (fiche **États**) et se chaîne avec lui — `dark:hover:bg-slate-700` — ainsi qu\'avec le **responsive** (`md:dark:grid-cols-4`). Les paires clair/sombre que tu viens d\'écrire s\'appuient sur la **palette** (fiche Couleurs : mêmes numéros, extrémités inversées) et pourront demain être centralisées via les **variables CSS** (fiche Thème) si le thème devient multi-brand. Le toggle est ton premier vrai cas de **DOM JavaScript** (fiche du module JS) utile au quotidien : `classList.toggle`, `localStorage`, `matchMedia` — trois APIs natives, quinze lignes, zéro dépendance.' },
          ],
          errors: [
            {
              title: 'dark: partout… avec la stratégie media par défaut',
              bad: '// aucune config (stratégie « media » par défaut)\n<body class="bg-white dark:bg-slate-950">\n  <button class="dark:bg-awa-500">…</button>\n</body>\n<button id="toggle">Activer le sombre</button>\n<script>\n  // le script pose la classe « dark »… mais RIEN n\'y répond :\n  toggle.onclick = () => document.documentElement.classList.toggle("dark");\n</script>\n// les classes dark:* sont générées en @media (prefers-color-scheme) :\n// seul le RÉGLAGE SYSTÈME les allume. Le bouton développé avec amour\n// ne pilote… rien. Tests « OK » sur la machine du dev, KO chez le client.',
              good: '// tailwind.config.js\ndarkMode: "class",\n\n// + le script d\'init dans le <head> (choix mémorisé, sinon système)\n// + le bouton qui fait classList.toggle("dark") sur <html>\n// MAINTENANT, le toggle pilote réellement dark:bg-slate-950 :\n// c\'est la classe qui allume, pas le média. Et le choix survit\n// à la prochaine visite grâce à localStorage.',
              why: 'Les deux stratégies génèrent des sélecteurs totalement différents : `@media (prefers-color-scheme: dark)` d\'un côté, `.dark .dark\\:bg-…` de l\'autre. Un site écrit pour l\'un ne réagit PAS à l\'autre — et le test local est traître (ton système est peut-être déjà sombre, tout semble fonctionner). Choisir la stratégie est la toute première décision du projet dark ; quand elle n\'est pas écrite noir sur blanc dans la config, l\'équipe écrit des classes pour l\'autre monde.'
            },
            {
              title: 'Tester seulement le mode qu\'on utilise',
              bad: '<input class="w-full rounded-xl border p-3" placeholder="Numéro MoMo">\n<!-- testé en clair : parfait. JAMAIS testé en sombre :\n     le champ garde son fond blanc natif, le texte de la page est\n     devenu slate-100… saisie blanc-cassé sur blanc, formulaire\n     inutilisable — la moitié des visiteurs nocturnes part ailleurs. -->',
              good: '<input class="w-full rounded-xl border border-slate-300 bg-white p-3\n               dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100\n               dark:placeholder-slate-500" placeholder="Numéro MoMo">\n<!-- chaque surface a ses deux visages. Rituel de revue : basculer le\n     toggle, ouvrir chaque écran (dont modales, menus, formulaires),\n     vérifier le contraste des textes secondaires. -->',
              why: 'Le sombre dégrade surtout les surfaces qu\'on n\'écrit JAMAIS : les inputs natifs, les placeholders, les tableaux, les images au fond blanc, les ombres. Ces cas ne se découvrent qu\'en testant réellement — aucun linter ne les repérera à ta place (tout est du CSS valide). La règle d\'équipe la plus efficace est bête comme chou : toute PR livre une capture dans CHAQUE mode. S\'il n\'existe qu\'une capture, le sombre n\'a jamais été regardé — et l\'utilisateur sera le premier testeur.'
            }
          ],
          related: ['tw-etats', 'tw-responsive', 'tw-couleurs', 'css-variables', 'js-dom']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-animations',
          title: 'Animations & transitions',
          icon: 'animation',
          level: 'Intermédiaire',
          tagline: 'transition, duration-*, ease-*, animate-spin/pulse/ping, et keyframes personnalisés.',
          intro: 'Le mouvement est le langage d\'une interface vivante : le bouton qui s\'enfonce sous le doigt CONFIRME, la carte qui s\'élève au survol GUIDE, le spinner qui tourne RASSURE (« ça charge »). Mais le mouvement se ressent aussi quand il manque : sans `transition`, chaque `hover:scale-105` téléporte au lieu de glisser. Cette fiche pose les deux mécanismes — transition (réagir) et animation (bouger tout seul) — plus la discipline : peu, court, et toujours animable.',
          blocks: [
            { t: 'h3', h: 'Pourquoi animer — et pourquoi si peu ?' },
            { t: 'p', h: 'Une animation utile répond une question de l\'utilisateur : « mon clic a-t-il été pris ? » (rebond actif), « où est passée la carte ? » (glissement), « quelque chose se passe-t-il ? » (spinner). Une animation GRATUITE, elle, distrait : bannières clignotantes, titres qui rebondissent à l\'infini. La règle d\'équilibre des interfaces premium : chaque mouvement a une RAISON — sinon il n\'existe pas. Et la règle de dosage : 150-300 ms par transition, rarement plus ; au-delà, l\'utilisateur ATTEND l\'interface au lieu de converser avec elle.' },
            { t: 'p', h: 'Deux mécanismes distincts à ne pas fusionner : la **transition** = « quand une propriété change (au hover, au focus…), interpole-là doucement au lieu de basculer » — elle RÉAGIT à un événement. L\'**animation** (`animate-spin`, keyframes) = « joue cette chorégraphie en boucle ou une fois, seule » — elle AGIT d\'elle-même. Tout ce que les fiches précédentes ont mis en place (`hover:`, `focus:`…) devient doux grâce à la première ; les indicateurs de chargement vivent grâce à la seconde.' },
            { t: 'h3', h: 'transition : donner la permission d\'animer' },
            { t: 'p', h: 'Le malentendu n°1, à détruire tout de suite : `hover:scale-105` SEUL ne glisse pas — il TELEPORTE, instantanément. Le hover change la valeur ; rien ne dit au navigateur de prendre son temps. C\'est `transition` qui donne cette permission : posée sur l\'état NORMAL de l\'élément (pas sur `hover:` !), elle déclare « surveille mes propriétés transform, et interpole tout changement en 150 ms ». Sous le capot, `transition` = `transition-property: color, background-color, border-color…, box-shadow, transform; transition-duration: 150ms; transition-timing-function: cubic-bezier(…)` — la version tout-terrain. Les variantes `transition-colors`, `transition-transform`, `transition-opacity` ciblent précisément, avec le même confort.' },
            { t: 'table', head: ['Classe', 'Propriétés animées', 'Quand la choisir'], rows: [
              ['`transition`', 'couleurs + fond + bordures + ombre + transform + opacité', 'Le bon défaut des composants interactifs'],
              ['`transition-colors`', 'textes, fonds, bordures, ring', 'Boutons, liens, bascule clair/sombre'],
              ['`transition-transform`', '`scale`, `translate`, `rotate`', 'Zoom d\'image, carte qui monte'],
              ['`transition-opacity`', '`opacity`', 'Apparitions, menus, voiles'],
              ['`transition-all`', 'TOUT (même width/height)', 'À éviter — voir l\'erreur en bas'],
              ['`transition-none`', 'rien', 'Neutraliser une transition héritée'],
              ['`duration-75` → `duration-1000`', 'le tempo (75 à 1000 ms)', '150/200/300 : la zone de confort'],
              ['`ease-in/out/in-out/linear`', 'la courbe d\'accélération', '`ease-out` pour entrer, `ease-in` pour sortir'],
              ['`delay-75/100/150…`', 'le retard avant démarrage', 'Cascades d\'apparition (rare, sobre)']
            ] },
            { t: 'code', lang: 'html', label: 'La carte qui répond — et l\'image qui zoome sans déborder', code:
'<article class="rounded-2xl bg-white p-4 shadow-sm\n                transition hover:-translate-y-1 hover:shadow-xl">\n  <!-- TOUTE la réaction tient en un couple :\n       -translate-y-1 (la carte monte de 4 px) + hover:shadow-xl -->\n  <div class="overflow-hidden rounded-xl">\n    <img src="gari.jpg" class="transition-transform duration-300\n                              group-hover:scale-105" alt="Gari">\n  </div>\n  <h3 class="mt-3 font-semibold transition-colors group-hover:text-awa-600">\n    Gari fin — sac 5 kg\n  </h3>\n</article>\n<!-- overflow-hidden du parent : le zoom de l\'image ne déborde\n     jamais du cadre arrondi — la fiche Bordures s\'en souvenait. -->' },
            { t: 'callout', kind: 'info', h: 'Perf sous le capot : `transform` et `opacity` sont animés PAR LE GPU sans recalculer la mise en page — c\'est pourquoi ils sont les seuls « bon marché ». Animer `width`, `height`, `margin` ou `top/left` force le navigateur à REFLOWER la page à chaque image (60 fois/seconde) = saccades garanties sur les téléphones modestes. Réflexe : « je veux déplacer → translate ; redimensionner → scale ; faire apparaître → opacity ».' },
            { t: 'h3', h: 'Les quatre animate-* intégrés' },
            { t: 'table', head: ['Classe', 'Mouvement', 'Usage typique'], rows: [
              ['`animate-spin`', 'rotation 360° en boucle (1 s)', 'Spinners de chargement, icône d\'envoi'],
              ['`animate-pulse`', 'opacité qui respire (1 → 50 %)', 'Volets fantômes (skeletons), « bientôt disponible »'],
              ['`animate-ping`', 'cercle qui grandit + s\'efface', 'Notification « nouveau », point d\'attention — UNE fois chacun'],
              ['`animate-bounce`', 'petits bonds verticaux', 'Flèche « découvrir en bas » — le seul acceptable en sobre'],
              ['`animate-none`', 'stoppe tout', 'Respect de `prefers-reduced-motion` (voir plus bas)']
            ] },
            { t: 'code', lang: 'html', label: 'Chargement du panier + notification de la tontine', code:
'<!-- bouton pendant l\'envoi MTN MoMo : spinner + état désactivé -->\n<button disabled class="inline-flex items-center gap-2 rounded-xl\n                        bg-amber-400 px-6 py-3 font-bold text-slate-900\n                        disabled:opacity-70">\n  <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">\n    <circle cx="12" cy="12" r="10" stroke="currentColor"\n            stroke-width="4" class="opacity-25"/>\n    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor"\n          stroke-width="4" stroke-linecap="round"/>\n  </svg>\n  Envoi en cours…\n</button>\n\n<!-- pastille « un nouveau membre a cotisé » : le ping attire UNE fois -->\n<span class="relative flex h-3 w-3">\n  <span class="absolute inline-flex h-full w-full rounded-full\n               bg-emerald-400 opacity-75 animate-ping"></span>\n  <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>\n</span>' },
            { t: 'callout', kind: 'tip', h: 'Le `animate-ping` est le radar : il confronte à l\'attention UNE seule fois — sa boucle répétée signifie « nouveau ». N\'en décore jamais un bouton ordinaire : un ping qui répète indéfiniment éduque l\'utilisateur à l\'IGNORER, et tu perds ton outil d\'alerte le plus puissant. De même, `animate-pulse` est fait pour les SKELETONS (le bloc gris qui respire pendant le chargement du catalogue), pas pour du contenu réel.' },
            { t: 'h3', h: 'Transforms & keyframes personnalisés' },
            { t: 'p', h: 'Au-delà des quatre intégrés, le `tailwind.config.js` accepte tes propres chorégraphies : le légendaire « fade-in-up » pour l\'arrivée des cartes, un « marquee » pour le bandeau des infos du marché. D\'abord la mécanique transform de base : `translate-x-4`, `-translate-y-2`, `scale-95`, `rotate-3`, `skew-x-6` — toutes GPU-animables, autonomes (elles se cumulent : `translate-x-4 rotate-3` = les deux). Puis les keyframes maison, déclarés une fois dans le thème.' },
            { t: 'code', lang: 'js', label: 'Un fade-in-up maison dans tailwind.config.js', code:
'theme: {\n  extend: {\n    keyframes: {\n      "fade-in-up": {\n        "0%":   { opacity: "0", transform: "translateY(12px)" },\n        "100%": { opacity: "1", transform: "translateY(0)" }\n      }\n    },\n    animation: {\n      "fade-in-up": "fade-in-up 0.4s ease-out both"\n    }\n  }\n}\n// usage :  class="animate-fade-in-up"  sur les cartes du catalogue\n// (stagger facultatif via style="animation-delay: 60ms" par carte)' },
            { t: 'p', h: 'Le détail d\'accessibilité qui distingue un pro : certaines personnes souffrent de vertiges déclenchés par le mouvement (troubles vestibulaires). Elles activent « Réduire les animations » au niveau système — et le navigateur expose alors `prefers-reduced-motion: reduce`. Tailwind le traduit en variantes : `motion-reduce:animate-none motion-reduce:transition-none` pour couper court, ou inversement `motion-safe:animate-ping` pour n\'animer QUE si l\'utilisateur l\'accepte. Cinq caractères de plus, un respect immense.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `hover:scale-105` glisse tout seul. »** Non : sans `transition`, tout changement de propriété est INSTANTANÉ. La transition se pose sur l\'état de repos, jamais sur `hover:` — c\'est l\'erreur en bas.',
              '**« Plus la durée est longue, plus c\'est chic. »** Au-delà de ~300 ms, l\'utilisateur PERÇOIT une lenteur, pas une élégance. La fast-food rule : 150 ms pour un bouton, 200 pour une carte, 300 pour un panneau.',
              '**« `transition-all` est plus sûr, « ça anime tout ». »** C\'est précisément le problème — voir l\'erreur plus bas : animer width/height/margin = reflows = saccades.',
              '**« Un spinner signifie « ça plante » s\'il tourne longtemps. »** Non — mais c\'est ce que l\'utilisateur CROIT au bout de 5-8 s ! Le spinner est une promesse : au-delà, affiche un vrai message (« le réseau est lent, on réessaie… »).',
              '**« On peut animer `hidden` → `block`. »** Non : `display` n\'est PAS animable. La recette des menus : `opacity` + `translate` + un instant de `visible`, ou `scale-95` + pointer-events. Jamais display.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La frénésie d\'états qui donnent du mouvement instantané au lieu d\'un glisse (transition oubliée sur l\'état de base), et `transition-all` jeté « au cas où » — qui anime aussi ce qu\'il ne fallait pas, y compris des propriétés de mise en page.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tout ce que tu as animé ici vient des fiches précédentes : les déclencheurs `hover:`, `focus:`, `group-hover:` (**États**), l\'ombre qui grandit au survol (**Bordures**), le `-translate-y-1` qui soulève la carte (l\'échelle d\'**Espacements**), et et le couple `group-hover:scale-105` + `overflow-hidden` de la carte Boutique Awa. Le `dark:` du toggle devient fluide avec `transition-colors` sur le body (**Dark mode**). Et la théorie — courbes d\'accélération, GPU, ce qui est animable — approfondit dans la fiche **Transitions & animations** du module CSS, dont cette fiche est l\'abrégé acceleré.' },
          ],
          errors: [
            {
              title: 'hover:translate hover:scale sans transition',
              bad: '<button class="bg-awa-500 px-6 py-3 text-white\n               hover:scale-105 hover:bg-awa-600">\n  Commander\n</button>\n<!-- au survol : REPOSITIONNEMENT INSTANTANÉ, à 105 %, sans glisser.\n     L\'oeil ne comprend pas ce qui s\'est passé — la sensation est\n     « pixelé/téléporté », exactement ce qu\'une interface premium\n     évite à tout prix. Et le retour au repos téléporte A L\'INVERSE. -->',
              good: '<button class="bg-awa-500 px-6 py-3 text-white\n               transition\n               hover:scale-105 hover:bg-awa-600">\n  Commander\n</button>\n<!-- la transition vit sur l\'ÉTAT NORMAL (elle annonce : « surveille\n     transform et colors ») — chaque changement hover/focus/active\n     est alors interpolé en 150 ms : glissement net, réversible. -->',
              why: 'L\'interrupteur (hover) et le moteur (transition) sont deux propriétés distinctes : le premier change la valeur, le second décide COMMENT on y va. Oublier la transition rend tous les états instantanés — le pire étant qu\'il *semble* correct en développement (un clic, ça change, « ça marche ») sauf qu\'il manque toute la VIE de l\'interface. Réflexe à graver : la première classe d\'un élément interactif est `transition`, toujours.'
            },
            {
              title: 'transition-all « pour être sûr »',
              bad: '<div class="transition-all duration-300 hover:shadow-xl">\n  …\n</div>\n<!-- transition-all = anime TOUTES les propriétés qui changent —\n     y compris width, height, margin, padding, font-size…\n     Un enfant qui change de hauteur (un badge qui disparaît ?)\n     → la carte RESIZE animée = 300 ms de reflow = saccades,\n     surtout sur les téléphones modestes. Et le jour où tu ajoutes\n     une propriété de layout, elle sera animée à ton insu. -->',
              good: '<div class="transition-shadow duration-300 hover:shadow-xl">\n  …\n</div>\n<!-- cibler ce qu\'on veut voir bouger :\n     transition-shadow, transition-colors, transition-transform,\n     transition-opacity, ou la polyvalente `transition` (qui exclut\n     justement width/height/margin — périmètre raisonné). -->',
              why: '« Tout animer » inclut des propriétés dont l\'animation est chère (layout) ou absurde (font-size) — et masque le vrai problème : on n\'a pas choisi CE qui doit bouger. La bonne transition est une liste explicite d\'intentions. Astuce de dernière chance : `transition` (la classe polyvalente de Tailwind) couvre déjà tout l\'animable GPU + couleurs + ombres — 95 % des besoins, sans jamais toucher au layout. `transition-all` n\'est correcte que dans les maquettes rapides, jetées ensuite.'
            }
          ],
          related: ['tw-etats', 'tw-dark', 'css-transitions-animations', 'tw-bordures']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-directives',
          title: 'Directives : @tailwind, @layer, @apply',
          icon: 'layers',
          level: 'Avancé',
          tagline: 'Le CSS natif de Tailwind : où les utilitaires naissent, et comment extraire proprement.',
          intro: 'Tailwind génère une feuille CSS — mais il faut bien un CSS d\'ENTRÉE qui dise ce qu\'elle contient, et parfois y mêler du style maison pour ce que les utilitaires ne couvrent pas (scrollbar stylée, keyframes, classe imposée par un CMS). Trois directives pilotent tout : `@tailwind` insère les trois strates officielles, `@layer` range ton CSS au bon étage pour éviter la guerre de spécificité, et `@apply` extrait un motif qui se répète en classe sémantique. C\'est la fiche des frontières — là où Tailwind s\'arrête, et où il te laisse la main.',
          blocks: [
            { t: 'h3', h: 'Pourquoi y a-t-il encore du « vrai CSS » dans Tailwind ?' },
            { t: 'p', h: 'Utility-first ne veut pas dire « plus jamais de CSS ». Trois besoins restent structurels : 1) le fichier d\'entrée doit DÉCLARER ce qu\'il contient (c\'est le rôle des `@tailwind`) ; 2) certains styles échappent aux utilitaires — un style de scrollbar, un `::selection`, une classe imposée par un plugin Wordpress ; 3) un motif répété 25 fois peut mériter un NOM plutôt qu\'un 26e copier-coller. Mais attention : chacune de ces échappées a un PROTOCOLE — et l\'ignorer est la source de tous les « pourquoi mes classes ne marchent-elles plus ? ».' },
            { t: 'p', h: 'La métaphore de la fiche : ton `input.css` est une RECETTE. `@tailwind` dit « insère ici les plats préparés par la maison » ; `@layer` dit « mon plat maison va à CET étage du dressage — pas un autre » ; `@apply` dit « sers-toi directement dans les plats existants pour composer le mien ». Trois gestes précis, dans une cascade que tu contrôles au lieu de la subir.' },
            { t: 'h3', h: '@tailwind : les trois strates' },
            { t: 'table', head: ['Directive', 'Contenu injecté', 'Taille après purge'], rows: [
              ['`@tailwind base;`', 'Le preflight : reset moderne (marges à zéro, `box-sizing`, images en `block`…)', 'Toujours présent (~2 Ko)'],
              ['`@tailwind components;`', 'Couche des COMPOSANTS : vide par défaut, remplie par tes `@layer components` et les plugins', 'Selon usage'],
              ['`@tailwind utilities;`', 'TOUTE l\'artillerie (flex, p-4, bg-red-500, md:hover:…) — POURGUÉE à ce qui est scanné', 'Les classes réellement utilisées']
            ] },
            { t: 'p', h: 'Le preflight mérite deux phrases franches, car beaucoup le croient « bug » : c\'est le reset choisi par Tailwind — tous les titres `h1` perdent leur grosseur native, les listes leurs puces et marges, les boutons deviennent transparents. Intentionnel : chaque navigateur part ainsi d\'un ZÉRO commun, et TON design décide de tout, jusqu\'au dernier pixel. Conséquence attendue : un texte brut (« article d\'un CMS ») sortira totalement amorphe — c\'est le besoin auquel répond le plugin `@tailwindcss/typography`, fiche suivante.' },
            { t: 'code', lang: 'css', label: 'input.css — le plan de fabrication complet', code:
'@tailwind base;        /* le reset universel, commun à tous les navigateurs */\n@tailwind components;  /* tes composants maison (@layer components + plugins) */\n@tailwind utilities;   /* les utilitaires scannés depuis tes fichiers (content) */\n\n/* ton CSS maison viendra SOUS ces lignes — rangé par @layer (suite) */' },
            { t: 'h3', h: '@layer : ranger ton CSS au bon étage' },
            { t: 'p', h: 'Le problème précis : si tu écris `.btn { padding: 1rem; }` n\'importe où hors directive, ce style atterrit APRÈS les utilitaires dans le fichier généré. À spécificité ÉGALE, le dernier gagne en CSS — donc ton `.btn` écrase désormais systématiquement `p-4` écrit sur le même élément, et tu perds la capacité d\'ajustement local (« pourtant j\'avais mis `py-2` ici ! »). `@layer` corrige cela : il insère ton code À L\'ÉTAGE que tu choisis — `base`, `components` ou `utilities`. Le réflexe 90 % des cas : `@layer components` — et désormais, les utilitaires RESTES les derniers, capables d\'affiner ton composant.' },
            { t: 'code', lang: 'css', label: 'Le composant maison au bon étage', code:
'@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer components {\n  .btn {\n    @apply px-4 py-2 rounded-xl font-semibold;\n  }\n  .input-momo {\n    @apply w-full rounded-xl border-slate-300 px-4 py-3\n           focus:border-amber-500 focus:ring-2 focus:ring-amber-200;\n  }\n}\n\n/* usage : class="btn py-3" — le py-3 peut désormais AFFINER\n   le composant, car les utilitaires arrivent APRÈS cet étage. */' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : la cascade CSS ne connaît que deux leviers — la spécificité (poids du sélecteur) et l\'ORDRE d\'apparition (à spécificité égale, le dernier déclaré gagne). `@layer` te donne la clé du second : ton `components` est injecté ENTRE base et utilities — tu n\'as rien à « protéger », juste à être à la bonne place dans le fichier final. Pour le détail de ces lois, la fiche Cascade & spécificité du module CSS est la référence.' },
            { t: 'h3', h: '@apply : extraire un motif qui se RÉPÈTE' },
            { t: 'p', h: 'Le même groupe de classes dupliqué vingt fois — le bouton primaire du site — hurle pour devenir `.btn-primary`. `@apply` copie les utilitaires dans ta règle. MAIS retiens le critère d\'or avant toute extraction : CE NOM A-T-IL UN SENS MÉTIER ? `.btn-primary`, `.input-momo`, `.badge-livraison` : oui, l\'équipe en parle au quotidien. `.carte-redondante-flex-p4` : non, tu recrates simplement du CSS sous nouveau nom — et tu perds (lecture directe, cohérence d\'échelle, purge parfaite) sans rien gagner.' },
            { t: 'code', lang: 'css', label: 'Deux extractions justifiées (motif répété + classe imposée)', code:
'@layer components {\n  /* le bouton de paiement, utilisé 20 fois : UN nom, un endroit */\n  .btn-momo {\n    @apply rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-900\n           shadow-md shadow-amber-500/30 transition\n           hover:bg-amber-500 focus:ring-4 focus:ring-amber-300\n           disabled:opacity-50;\n  }\n  /* le CMS du blog impose .article-content : on la dresse en une passe */\n  .article-content {\n    @apply space-y-4 text-slate-700 leading-relaxed;\n  }\n}' },
            { t: 'callout', kind: 'warn', h: 'Les limites d\'`@apply` : il n\'accepte QUE des utilitaires existants (aucune classe maison, aucune valeur inventée) ; les variantes (`hover:`, `md:`) s\'appliquent tout de même (`@apply hover:bg-red-500;`) ; et un extrait trop long redevient illisible — si l\'`@apply` fait plus de 5-6 lignes, la question « faut-il vraiment extraire ? » se repose. Le classeur de composants réutilisables, c\'est toujours le COMPOSANT (partial, template, fichier JS) — `@apply` n\'est que le sponsor officiel de la duplication acceptable.' },
            { t: 'h3', h: 'Bonus : screen() et les fonctions utilitaires' },
            { t: 'p', h: 'Dans ton CSS maison, les paliers Tailwind restent accessibles SANS recopier de pixel : la fonction `screen(md)` produit la media query correspondante — `@media screen(md) { … }`. Tes breakpoints personnalisés (déclarés dans le thème) y répondent aussi. La bande passante entre le CSS maison et le système Tailwind reste donc cohérente : jamais deux sources de vérité pour les seuils.' },
            { t: 'code', lang: 'css', label: 'Une exception CSS propre à l\'écran, dans les règles', code:
'@layer components {\n  .hero-marche {\n    background-image: url("/images/dantokpa-small.jpg");\n    /* mobile d\'abord : image légère */\n  }\n  @media screen(md) {\n    .hero-marche {\n      background-image: url("/images/dantokpa-large.jpg\");\n    }\n  }\n}' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« `@layer` protège mon CSS de tout. »** Non : il LE PLACE dans la cascade. Un composant dans `@layer components` reste « plus faible » (antérieur) qu\'un utilitaire appliqué au même élément — c\'est voulu, ça s\'appelle un réglage local.',
              '**« `@apply`, c\'est la façon de faire un composant. »** Non : `@apply` ne crée qu\'une règle CSS nommée. Le vrai composant, c\'est le fichier HTML/JS réutilisable (partial Laravel, template, fichier Vue…) — `@apply` n\'en est que l\'outil d\'extraction ponctuel.',
              '**« Les trois `@tailwind` sont optionnels. »** `utilities` est obligatoire (sinon, rien ne naît) ; `components` l\'est dès que tu écris un `@layer components` ; `base` ne l\'est que si tu veux le preflight (recommandé, sauf intégration dans un site ancien très stylé).',
              '**« Le preflight est un bug qui casse mes titres. »** Non : c\'est la table rase assumée — tout devient produit de TES classes. Un h1 nu ressemblant à du paragraphe est le SYSTÈME fonctionnant correctement.',
              '**« Je peux `@apply` mes classes maison. »** Faux : uniquement les utilitaires connus du framework. Pour composer entre composants maison, on fait de la CASCADE normale (`.btn{…} .btn-momo{…}`) ou un héritage de fichier CSS classique.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le CSS perso jeté hors `@layer` (il atterrit après les utilitaires et déclare une guerre de spécificité silencieuse), et l\'`@apply` appliqué à tout ce qui bouge — chaque div devenant une nouvelle classe — qui réinvente le CSS classique en perdant tous les bénéfices du utility-first.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu reviens plein cercle à la fiche **Installation** : l\'`input.css` qui recevait trois lignes mystérieuses vient d\'être disséqué. Le `content` du scan (même fiche) explique pourquoi la purge ne touche PAS tes `@layer` — ils ne sont pas « scannés », ils sont injectés tels quels (poids à surveiller !). Le thème (**Personnaliser le thème**) ? `screen(md)` et tes familles custom y répondent directement. Et l\'extraction de motifs trop répétés pose la question que la fiche **Bonnes pratiques** tranchera en règle de trois : composant d\'abord, boucle ensuite, `@apply` en dernier.' },
          ],
          errors: [
            {
              title: 'Du CSS perso hors @layer : la guerre de spécificité',
              bad: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n.carte {\n  padding: 1.5rem;\n}\n/* .carte arrive APRÈS les utilitaires → à spécificité égale,\n   il les ÉCRASE. class="carte p-2" ne fait plus rien !\n   L\'équipe passe à forcer avec !important — la cascade devient\n   un champ de mines : chaque ajustement local déclenche un duel. */',
              good: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer components {\n  .carte {\n    @apply rounded-2xl bg-white p-6 shadow-sm;\n  }\n}\n/* .carte est maintenant AVANT les utilitaires :\n   class="carte p-2" fonctionne — le composant pose le défaut,\n   l\'utilitaire règle l\'exception locale. Dialogue restauré. */',
              why: 'La cascade CSS tranche les égalités de spécificité par l\'ORDRE d\'apparition : dernier déclaré, dernier mot. Hors `@layer`, ton CSS est le dernier — il écrase silencieusement les utilitaires, et chaque ajustement devient incompréhensible (« pourtant p-2 est là ! »). `@layer components` n\'est pas un rangement cosmétique : c\'est ta PASSATION de pouvoir aux utilitaires sur le détail, en échange du composant sur le défaut. Sans elle, chaque projet dérive en duels `!important`.'
            },
            {
              title: '@apply à tout va sur des composants uniques',
              bad: '.hero-titre { @apply mt-6 text-4xl font-bold text-slate-900; }\n.hero-sous-titre { @apply mt-2 text-lg text-slate-500; }\n.carte-gauche-haut { @apply rounded-xl bg-white p-4 shadow-sm; }\n.carte-milieu-haut { @apply rounded-xl bg-white p-4 shadow-sm; }\n/* des dizaines de classes à usage UNIQUE, créées par réflexe —\n   finalement du CSS classique réécrit avec une syntaxe plus\n   verbeuse : lecture à deux endroits, purge devenue moins fine,\n   et chaque maquette entraîne une nouvelle couche de nommage. */',
              good: '<!-- la classe reste dans le HTML tant qu\'elle est UNIQUE -->\n<h1 class="mt-6 text-4xl font-bold text-slate-900">\n<article class="rounded-xl bg-white p-4 shadow-sm">\n\n/* l\'extraction attend son heure : quand un motif RÉEL apparaît\n   — même groupe de classes sur 3+ endroits avec un nom métier —\n   ALORS .btn-momo / .input-momo. Le critère : le nom parle,\n   pas la mécanique. */',
              why: '`@apply` tente les perfectionnistes parce qu\'il « nettoie » le HTML — mais il le fait au prix d\'une double lecture (le style vit maintenant à deux endroits), d\'une purge moins chirurgicale (les classes extraites restent injectées en entier) et surtout d\'une inflation de noms. Le seuil d\'extraction professionnel est stable : répété 3+ fois AVEC une identité métier claire. En dessous, les classes restent dans le HTML — « la répétition est meilleure que la mauvaise abstraction » se vérifie chaque jour ici.'
            }
          ],
          related: ['tw-installation', 'tw-bonnes-pratiques', 'css-cascade-specificite', 'tw-theme']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-plugins',
          title: 'Plugins officiels',
          icon: 'extension',
          level: 'Intermédiaire',
          tagline: 'forms, typography, aspect-ratio… : des utilitaires bien pensés en un import.',
          intro: 'Le noyau Tailwind reste volontairement petit ; les besoins « communs mais pas universels » — formulaires présentables d\'office, texte riche de CMS, ratio d\'images stable — vivent dans des plugins OFFICIELS, maintenus par l\'équipe du framework. Un plugin = un paquet d\'utilitaires pré-écrits qui s\'intègre au thème, à la purge et aux variantes comme s\'il avait toujours été là. Un import, une ligne de config, et des mois de CSS répétitif s\'évaporent.',
          blocks: [
            { t: 'h3', h: 'Pourquoi des plugins officiels plutôt que « tout inclus » ?' },
            { t: 'p', h: 'Tous les sites n\'ont pas besoin d\'une typographie d\'article, ni d\'inputs soignés — embarquer ces styles dans le noyau alourdirait la purge de tous pour le bénéfice de quelques-uns. D\'où l\'architecture : un NOYAU minuscule (le générateur + l\'échelle), des PLUGINS officiels (`@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`, `@tailwindcss/container-queries`) qui suivent les mêmes mécanismes (« content », purge, thème). Tu installes ce que tu utilises : rien de plus n\'embarque en production. Confiance supplémentaire : ce sont les mêmes auteurs que le framework — les utilitaires suivent l\'ÉCHELLE, pas le feeling.' },
            { t: 'p', h: 'Anatomie d\'un plugin, pour ne pas les révérer : c\'est une fonction JS qui enregistre de nouveaux utilitaires (`addUtilities`) et/ou des styles de base (`addBase`) dans ton fichier généré. Tu pourrais en écrire un toi-même (niveau avancé — courant dans les design systems d\'équipe) ; pour l\'instant, retenons le circuit : `npm install` → `require()` dans la config → les nouvelles classes deviennent scannables, purgeables et thémables comme les natives.' },
            { t: 'h3', h: 'Brancher un plugin' },
            { t: 'code', lang: 'bash', label: 'Installation + branchement (2 lignes)', code:
'npm install -D @tailwindcss/forms @tailwindcss/typography\n\n// tailwind.config.js\nmodule.exports = {\n  content: ["./src/**/*.{html,js}"],\n  theme: { extend: {} },\n  plugins: [\n    require("@tailwindcss/forms"),\n    require("@tailwindcss/typography")\n  ]\n}\n// c\'est tout : les nouveaux utilitaires sont opérationnels,\n// scannés et purgés comme les natifs. Pas de CSS externe à lier.' },
            { t: 'callout', kind: 'tip', h: 'Le test de branchage express : écris `prose` sur un `article` (ou regarde un `input[type="checkbox"]` prendre du style) — si la classe produit du rendu, le plugin est actif. Si rien ne bouge, le circuit est le même que la fiche Installation : fichier scanné ? watch actif ? plugin bien dans `plugins: []` ?' },
            { t: 'h3', h: '@tailwindcss/forms : débloquer les formulaires' },
            { t: 'p', h: 'Le problème que résout ce plugin est le preflight : le reset de Tailwind met les champs à nu — `border: 0`, `background: transparent`, aucune hauteur. Un formulaire Tailwind frais est donc INVISIBLE (aucun contour !), et dresser chaque type de champ à la main prendrait des heures. `@tailwindcss/forms` injecte une couche components de « base présentable » : chaque TYPE de champ (`text`, `tel`, `select`, `checkbox`…) récupère une silhouette propre — pensée pour être sur-stylée par les utilitaires au cas par cas.' },
            { t: 'p', h: 'Le détail qui fait la différence : le plugin stylise par TYPE NATIF (`input[type="email"]`), pas par classe à retenir — ton HTML sémantique suffit, et tu gardes l\'override final en un `class` ponctuel. Résultat : dix champs « déjà corrects » par défaut, et l\'effort concentré sur les 10 % de champs signature (l\'input MoMo verrouillé ambre, la case tontine custom).' },
            { t: 'code', lang: 'html', label: 'Le formulaire de commande — présentable par défaut', code:
'<form class="space-y-4">\n  <label class="block">\n    <span class="text-sm font-medium text-slate-700">Nom complet</span>\n    <input type="text" class="mt-1 w-full" placeholder="Awa Mensah">\n    <!-- forms : border, arrondi, focus — sans une seule classe de style -->\n  </label>\n  <label class="block">\n    <span class="text-sm font-medium">Numéro MTN MoMo</span>\n    <input type="tel" class="mt-1 w-full rounded-xl border-amber-300\n           focus:border-amber-500 focus:ring-amber-200"\n           placeholder="96 00 00 00">\n    <!-- exception locale : la base du plugin + ton accent en une ligne -->\n  </label>\n  <label class="flex items-center gap-2">\n    <input type="checkbox" class="rounded text-awa-500">\n    <span class="text-sm">Payer à la livraison (zémidjan)</span>\n    <!-- case native relookée automatiquement, cochée en ambre -->\n  </label>\n</form>' },
            { t: 'callout', kind: 'warn', h: 'Choisir le champ par TYPE veut dire : le plugin ne touche PAS un `input` sans attribut `type` valide, ni une liste custom (ton `select` redessiné en div). Il reste calibré pour le natif — et c\'est la philosophie Tailwind : utilise la sémantique HTML correcte, le style suit. Aussi : les cases/radios avancées (couleurs multiples, états indéterminés) demandent encore du maison — le plugin pose le défaut, rien de plus.' },
            { t: 'h3', h: '@tailwindcss/typography : `prose`, le texte riche instantané' },
            { t: 'p', h: 'Le problème du texte GÉNÉRÉ : un article de blog sorti d\'un CMS ou d\'un fichier Markdown n\'a AUCUNE classe sur ses `<p>`, `<h2>`, `<ul>` — c\'est du HTML nu, frappé par le preflight (encore lui !) : titres sans grosseur, listes sans puces, aucun espacement. Tu ne peux pas descendre styliser balise par balise le contenu d\'un tiers. Le plugin `typography` retourne la situation : une SEULE classe `prose` sur le parent applique un thème typographique complet à tout ce que le contenu contient — titres proportionnés, listes pointées, liens colorés, tableaux stylés, code encadré.' },
            { t: 'code', lang: 'html', label: 'L\'article « Recettes du marché Dantokpa », habillé en une classe', code:
'<article class="prose prose-slate lg:prose-lg dark:prose-invert">\n  <!-- contenu généré depuis un CMS / un Markdown, SANS aucune classe : -->\n  <h2>Le gari, roi des farines</h2>\n  <p>Chaque matin dès 5 h, les sacs arrivent de Savalou…</p>\n  <ul><li>Gari fin</li><li>Gari grossier</li></ul>\n  <blockquote>« Tout se négocie, sauf la qualité. » — Awa Mensah</blockquote>\n</article>\n<!-- prose      : thème typographique complet (titres, listes, tables…)\n     prose-slate : teinte neutre assortie au site\n     lg:prose-lg : corps plus généreux sur desktop\n     dark:prose-invert : la version sombre, déjà écrite par le plugin -->' },
            { t: 'callout', kind: 'warn', h: 'Ne mélange pas les mondes : `prose` est fait pour du contenu NU (CMS, Markdown). Sur du contenu DÉJÀ composé en utilitaires, il pose ses propres styles par-dessus les tiens — les deux systèmes se battent (titres redimensionnés, liens recolorés), et personne ne gagne. La règle : une zone = `prose` OU classes Tailwind, jamais les deux. Pour les retouches fines : `prose-a:text-awa-600 prose-img:rounded-xl` te laisse habiter quand même.' },
            { t: 'h3', h: 'aspect-ratio & container queries' },
            { t: 'p', h: 'Deux autres plugins du quotidien. `@tailwindcss/aspect-ratio` : `aspect-video` (16/9), `aspect-square`, `aspect-[4/3]` — une image qui GARDE SON CADRE tant qu\'elle charge : la page ne saute plus (ce fameux CLS que Google pénalise), le zémidjan qui scroll n\'a pas l\'œil pris à rebond. Le plugin existe encore pour la compatibilité, mais sache qu\'en Tailwind récent, `aspect-*` est intégré nativement au noyau.' },
            { t: 'p', h: '`@tailwindcss/container-queries` : les media queries classiques regardent L\'ÉCRAN ; les container queries regardent le PARENT — le composant s\'adapte à SA taille, pas à l\'appareil. Cas d\'école : la carte produit posée dans la colonne étroite d\'une sidebar OU sur toute la largeur — elle doit se recomposer selon son espace RÉEL. `@container` sur le parent, `@md:grid-cols-2` sur la carte (même grammaire de préfixe, nouvelle cible). C\'est la fin du « responsive par page », au profit du « responsive par composant ».' },
            { t: 'code', lang: 'html', label: 'La carte qui s\'adapte à son conteneur, pas à l\'écran', code:
'<div class="@container">\n  <article class="grid gap-4 rounded-2xl bg-white p-4\n                  @md:grid-cols-[10rem_1fr]">\n    <img src="gari.jpg" class="aspect-square w-full rounded-xl object-cover">\n    <div>Gari fin — 3 500 F · livraison 2 h</div>\n  </article>\n</div>\n<!-- dans une sidebar étroite : la carte s\'empile\n     ; dans un flux large (@md du CONTENEUR atteint) : elle s\'étale\n     — sans aucune media query sur l\'écran. -->' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« forms rend les formulaires « jolis tout seuls ». »** Non : il rend chaque TYPE de champ PRÉSENTABLE et stylable. Un formulaire pro reste à mettre en page (labels, erreurs, espacement) — la fiche Formulaires du module HTML pour la structure, les utilitaires pour le style.',
              '**« `prose` est une police spéciale. »** Non : c\'est un thème typographique de BLOC — titres proportionnés, listes, liens, tableaux, code — tout le CONTENU nu d\'un parent. La police, c\'est `font-display` & co.',
              '**« Les plugins en production se comportent autrement. »** Non : tout plugin est intégré AU BUILD — ses utilitaires sont scannés, générés et purgés au même titre que les natifs. Zéro chargement externe, zéro runtime.',
              '**« Container queries = media queries avec un autre nom. »** Cible différente : l\'écran pour les unes, le PARENT pour les autres. Une carte réutilisée en sidebar et en pleine page ne peut être responsive « à l\'écran » — c\'est l\'usage exact des container queries.',
              '**« On ne peut pas écrire les siens. »** Si : la même API que les officiels (`addUtilities`, `addComponents`). C\'est même la pratique courante pour un design system d\'équipe — mais c\'est un niveau avancé, une fois les officiels bien en main.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Rester sans le plugin forms et dresser chaque input à la main (des heures pour un état pire), et poser `prose` sur du contenu DÉJÀ composé en classes — le duel garanti des deux systèmes typographiques.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le branchement exact (`npm install`, `plugins: [require(...)]`, scan de classes nouvelles) prolonge la fiche **Installation** — mêmes règles du jeu, purge comprise. Le personnalisage des thèmes de `prose` (couleurs de liens, tailles) passe par le même `theme.extend` que la fiche **Thème**, et le spectacle du preflight que nous avons évoqué deux fois ici est raconté en entier dans **Directives**. Pour la structure des champs (label, type, attributs), la fiche **Formulaires** du module HTML reste la référence ; et `lg:prose-lg` / `dark:prose-invert` sont de simples préfixes — les grammaires des fiches **Responsive** et **Dark mode** s\'appliquent textuellement.' },
          ],
          errors: [
            {
              title: 'Styler les inputs à la main alors que forms existe',
              bad: '/* dans un coin du CSS, par champ et par type… */\ninput[type="text"] {\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  padding: 10px 14px;\n}\ninput[type="text"]:focus {\n  outline: none;\n  border-color: #d97706;\n  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);\n}\ninput[type="tel"] { border: 1px solid #ccc; … }\ninput[type="email"] { border: 1px solid #ccc; … }\nselect { border: 1px solid #ccc; … }\n/* des dizaines de lignes par type, à maintenir navigateur par\n   navigateur — et le jour du redesign, tout à rouvrir. */',
              good: 'npm install -D @tailwindcss/forms\n// config : plugins: [require("@tailwindcss/forms")]\n// → chaque TYPE est présentable d\'office ; on ne stylise plus\n// que les exceptions :\n<input type="tel" class="rounded-xl border-amber-300\n       focus:border-amber-500 focus:ring-amber-200">\n// le reste du formulaire : labels, space-y, erreurs — utilitaires.',
              why: 'Le plugin condense en une ligne de config ce que la communauté a mis des années à apprendre sur les champs natifs : leur base est hétérogène selon les navigateurs, et les refaire soi-même est un puits sans fond (apparence du select iOS, checkbox Android, focus Safari…). Ton travail créatif mérite mieux : pose la base officielle à zéro coût, investis ton temps sur les champs qui différencient ta marque. La même logique que pour le preflight : ne réinvente pas le reset, dessine au-dessus.'
            },
            {
              title: 'prose sur du contenu déjà composé',
              bad: '<article class="prose">\n  <h2 class="text-3xl font-extrabold text-awa-700 mt-8">Recettes</h2>\n  <p class="text-slate-600 leading-relaxed">Chaque matin…</p>\n  <a href="#" class="text-awa-600 font-semibold no-underline">Lire →</a>\n</article>\n<!-- prose impose SA hauteur, SES graisses, SES couleurs de lien\n     sur les mêmes éléments que tes classes : le 3xl a un concurrent\n     officiel, le lien garde son soulignement malgré no-underline,\n     et le résultat dépend de l\'ORDRE du fichier généré = chaos. -->',
              good: '<!-- un bloc de contenu NU (CMS/Markdown) → prose habille tout : -->\n<article class="prose prose-slate max-w-none">\n  {{ contenu_du_cms }}   <!-- aucune classe dedans, prose gère -->\n</article>\n\n<!-- un bloc COMPOSÉ en classes → reste dans les classes : -->\n<article class="space-y-4">\n  <h2 class="text-3xl font-extrabold">Recettes</h2>\n</article>\n<!-- les deux systèmes sont excellents ; ils s\'excluent. -->',
              why: '`prose` est un style de BLOC descendant (`.prose h2`, `.prose a`…) : à spécificité égale ou supérieure, il vient COHABITER avec tes classes utilitaires sur les mêmes éléments — chaque attribut pris séparément devient une loterie de cascade. Les deux approches répondent à deux situations opposées : contenu INCONNU à l\'avance (prose, du CMS) vs contenu COMPOSÉ par toi (classes). Appliquer l\'une à l\'autre, c\'est combattre le système au lieu de l\'utiliser — « une zone = un système ».'
            }
          ],
          related: ['tw-installation', 'tw-theme', 'tw-typographie', 'html-formulaires', 'css-responsive']
        },
        /* ------------------------------------------------------ */
        {
          id: 'tw-bonnes-pratiques',
          title: 'Bonnes pratiques & optimisation',
          icon: 'verified',
          level: 'Avancé',
          tagline: 'Duplication, safelist, purge, ordre des classes : les réflexes qui séparent un proto d\'un produit.',
          intro: 'À ce stade, tu SAIS écrire du Tailwind. Cette dernière fiche t\'apprend à l\'écrire DURABLEMENT : quand accepter la duplication (plus souvent que l\'instinct ne le dit), comment la purge fabrique un CSS de quelques kilo-octets, pourquoi les classes dynamiques cassent tout — et la solution de la safelist — et enfin les rituels d\'équipe qui rendent le code lisible à six mois. Le fil rouge : Tailwind produit du CSS parfait SI tu respectes ses deux contrats (classes complètes + fichiers scannés).',
          blocks: [
            { t: 'h3', h: 'Pourquoi une fiche « pratiques » en fin de module ?' },
            { t: 'p', h: 'Toutes les fiches précédentes t\'ont donné des moyens ; celle-ci te donne un jugement. Le même motif répété vingt fois — faut-il extraire ? Le badge « statut » coloré selon les données — comment l\'écrire sans casser la purge ? Le CSS final pèse combien ? Aucune de ces questions n\'a de réponse syntaxique : elles demandent de comprendre le MOTEUR (le scan vu à la première fiche) et de tenir trois rituels d\'équipe. Les expérimentés ne « savent » pas plus de classes que toi — ils ont intégré ces règles du jeu.' },
            { t: 'p', h: 'Mémo des deux contrats Tailwind, duquel tout découle : **contrat 1** — chaque classe doit exister en TANT QUE CHAÎNE complète dans un fichier scanné (sinon = jamais générée) ; **contrat 2** — chaque fichier contenant des classes doit être listé dans `content` (même conséquence). Toutes les bonnes pratiques de cette fiche sont des façons de tenir ces contrats sans se priver du dynamisme.' },
            { t: 'h3', h: 'La duplication : les trois lignes de défense (dans l\'ordre)' },
            { t: 'p', h: 'Le réflexe « DRY » appris sur le CSS (« jamais de répétition ») devient ici contre-productif si on le juge mal. La vraie question : qu\'est-ce qui est dupliqué — un FRAGMENT D\'ÉCRAN (carte, bouton, ligne de tableau) ou un GROUPE DE CLASSES ? Ce n\'est pas pareil. Tout fragment d\'écran répété plus de 2-3 fois mérite un COMPOSANT — c\'est-à-dire un FICHIER : partial Blade, template Laravel, fichier Vue/React… L\'unité de réutilisation d\'interface, c\'est le morceau de balisage, jamais la classe CSS toute seule.' },
            { t: 'ol', items: [
              '**Ligne 1 — le composant (fichier).** La carte produit existe en 40 exemplaires dans 6 pages ? Elle devient `_carte-produit.html` / `CarteProduit.vue` / un partial inclu. Une seule source, la duplication s\'évapore. C\'est la réponse dans 80 % des cas.',
              '**Ligne 2 — la boucle (données).** Le même fragment répété DANS la même page (lignes du registre de tontine, liens du menu) ? Tu génères depuis les DONNÉES : boucle sur ton tableau (Blade `@foreach`, `.map()` JS…). Chaque occurrence n\'est plus qu\'une donnée de plus.',
              '**Ligne 3 — @apply (dernier recours).** Un motif répété MAIS avec un nom métier fort, pas assez grand pour un fichier (le bouton MoMo vu dans Directives) ? Extraction sémantique — rarement plus de 3-5 classes composantes par projet.'
            ] },
            { t: 'code', lang: 'html', label: 'Les trois niveaux sur les liens de navigation', code:
'<!-- 1) COMPOSANT : la carte produit vit dans SON fichier — à inclure -->\n{{-- partials/carte-produit.blade.php, utilisé 40 fois, édité UNE fois --}}\n\n<!-- 2) BOUCLE : le menu est UNE donnée, pas CINQ balises répétées -->\n{{-- nav-items = [Catalogue, Livraison, Tontine, Compte] --}}\n<nav class="flex gap-6">\n  @foreach ($navItems as $item)\n    <a href="{{ $item["url"] }}" class="text-slate-600 hover:text-awa-600\n                                      transition">{{ $item["label"] }}</a>\n  @endforeach\n</nav>\n\n<!-- 3) @apply : le motif bouton court, nommé, 20 occurrences -->\n<a class="btn-momo">Payer avec MTN MoMo</a>' },
            { t: 'callout', kind: 'tip', h: 'La phrase libératrice des équipes Tailwind : « la duplication est préférable à la mauvaise abstraction ». Deux endroits qui SE RESSEMBLENT aujourd\'hui mais évoluent différemment (page publique / page admin) gagnent à garder chacun leurs classes — extraire trop tôt crée une dépendance coûteuse. Extraction = répétition ÉPROUVÉE (3+ fois, même sens, même futur). En dessous du seuil, on copie sans culpabilité.' },
            { t: 'h3', h: 'Purifier la production : ce que Tailwind fait pour toi' },
            { t: 'p', h: 'Le mythe à tuer : « Tailwind = un gros fichier CSS ». En production, la machine à fabriquer fait le tri : le scan n\'extrait QUE les classes littéralement présentes dans tes fichiers. Un site complet consomme typiquement 100 à 600 classes uniques → le CSS final tient souvent entre 10 et 30 Ko minifiés (comparable à un fichier CSS écrit à la main — souvent moins, car il n\'y traîne aucun « ancien style » oublié). Et tout ça se fait SANS RIEN CONFIGURER : la purge est inhérente au build.' },
            { t: 'code', lang: 'bash', label: 'Le build de production, puis la vérification (le rituel)', code:
'# la commande de production (--minify RETIRE les commentaires et espaces)\nnpx tailwindcss -i src/input.css -o dist/output.css --minify\n\n# vérifier le poids réel (le chiffre qui compte pour tes visiteurs) :\nwc -c dist/output.css\nls -lh dist/output.css\n# règle mentale : > 50 Ko = suspect (un safelist oublieux ?\n# un content qui matche node_modules ? à investiguer)' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : pourquoi la purge peut-elle être aussi brutale en toute confiance ? Parce que Tailwind ne traque pas « l\'usage » à l\'exécution — il traque le TEXTE à l\'écriture. Toute classe présente en chaîne complète dans un fichier scanné survit ; toute autre disparaît sans appel. C\'est le mécanisme le plus simple qui soit (pas d\'analyse dynamique), et c\'est exactement ce qui le rend fiable — si tu respectes le format « chaîne complète » qu\'on va voir tout de suite.' },
            { t: 'h3', h: 'Le piège des classes dynamiques — et la safelist' },
            { t: 'p', h: 'Le tourment n°1 des équipes, expliqué une bonne fois : si tu CONSTRUIS la classe en assemblant des morceaux (`"bg-" + couleur + "-500"`), ton fichier ne contient JAMAIS la chaîne complète `bg-emerald-500` → jamais générée → rien ne s\'affiche, en dev comme en prod. Ce n\'est PAS un caprice de Tailwind, c\'est son mode de fonctionnement (contrat n°1). Les solutions, par ordre de préférence : 1) une **map d\'équivalence** qui nomme les classes en entier (TOUJOURS le premier choix) ; 2) l\'écriture de toutes les variantes en ternaire ; 3) la **safelist** pour les cas ingérables (contenu CMS) — en dernier, car elle échappe à la purge et regonfle le fichier.' },
            { t: 'code', lang: 'html', label: 'Le badge de statut qui fonctionne partout (la map)', code:
'{{-- le statut arrive des données : payee / en_attente / livree --}}\n@php\n  $statutStyles = [\n    "payee"      => "bg-emerald-100 text-emerald-700",\n    "en_attente" => "bg-amber-100 text-amber-800",\n    "livree"     => "bg-sky-100 text-sky-700",\n  ];\n@endphp\n<span class="rounded-full px-2.5 py-0.5 text-xs font-bold\n             {{ $statutStyles[$commande->statut] }}">\n  {{ $commande->statutLisible }}\n</span>\n{{-- chaque classe existe EN ENTIER dans ce fichier → scan OK,\n     purge OK, et l\'extend devient trivial : une ligne de tableau. --}}' },
            { t: 'code', lang: 'js', label: 'La safelist (cas CMS : classes inconnues à l\'avance)', code:
'// tailwind.config.js — seulement quand la map est impossible :\nmodule.exports = {\n  content: ["./src/**/*.{html,js}"],\n  safelist: [\n    "bg-red-500", "bg-emerald-500", "bg-sky-500",\n    { pattern: /text-(red|emerald|sky)-(600|700)/ }  // motifs ciblés !\n  ],\n}\n// PRINCIPE : aussi PETITE que possible. Chaque entrée échappe à la\n// purge et atterrit dans le CSS final — une safelist généreuse est\n// un régime d\'optimisation saboté. C\'est un sas, pas un jardin public.' },
            { t: 'h3', h: 'L\'ordre des classes : une convention, pas une contrainte' },
            { t: 'p', h: 'Un point qui angoisse inutilement les débutants : l\'ORDRE des classes dans `class="…"` n\'a AUCUN effet sur le rendu — le style appliqué dépend uniquement de l\'ordre des règles dans le CSS généré (que Tailwind maîtrise). En revanche, une convention d\'équipe rend la lecture instantanée. La plus répandue, celle du plugin Prettier officiel : d\'abord la STRUCTURE (display, position) → la BOÎTE (dimensions, padding, marge) → la TYPO → les COULEURS et effets → les ÉTATS/responsive. Le CSS, lui, écrira par catégories peu importe l\'ordre dans lequel tu tapes — mais l\'œil humain lit le HTML, alors organise-le.' },
            { t: 'code', lang: 'html', label: 'La convention Prettier officielle (lisible d\'un coup)', code:
'<!-- structure → boîte → typo → couleurs → effets → états -->\n<button class="relative flex h-12 items-center rounded-xl px-6\n               text-sm font-bold uppercase tracking-wide\n               bg-awa-500 text-white shadow-md\n               transition hover:bg-awa-600 focus:ring-4 disabled:opacity-50">\n  Commander — 3 500 F\n</button>\n<!-- l\'oeil retrouve instantanément « où est la taille ? où est l\'état ? »\n     — et le plugin prettier-plugin-tailwindcss range pour vous au sauver. -->' },
            { t: 'h3', h: 'Checklist avant production' },
            { t: 'ol', items: [
              '**Build officiel** : `--minify` exécuté, sortie dans `dist/` (jamais le fichier de dev, jamais le CDN).',
              '**content complet** : aucun dossier oublié (composants JS, templates backend, dossier public) — le manque se paie en classes manquantes.',
              '**Classes dynamiques éliminées** : zéro assemblage de chaînes (map écrite, safelist contrôlée).',
              '**CDN proscrit** : vérification finale s\'il avait servi à prototyper — la prod livre un fichier statique.',
              '**Dark testé dans les DEUX modes**, y compris formulaires et surfaces secondaires (fiche Dark).',
              '**Responsive vérifié** sur téléphone réel : la connexion mobile est le test qui ne ment pas.',
              '**Taille finale mesurée** : `ls -lh dist/output.css` — un chiffre > 50 Ko appelle une investigation (safelist, mauvais content glob).'
            ] },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Répéter des classes = mauvais code. »** Faux : répéter un FRAGMENT d\'écran = à factoriser (composant). Répéter des CLASSES à deux endroits = parfaitement sain — la mauvaise abstraction coûte plus cher que la duplication.',
              '**« L\'ordre des classes change le style. »** Non : seul l\'ordre du CSS généré compte — la convention d\'écriture (structure → état) existe pour la LECTURE humaine, jamais pour le navigateur.',
              '**« La purge peut casser mes pages. »** Uniquement si tu violes le contrat (classe reconstruite en chaînes, fichier non scanné). Respecte-le, et la purge est l\'outil le plus fiable du pipeline.',
              '**« La safelist règle les classes dynamiques sans inconvénient. »** Elle fonctionne, oui — au prix du gonflement du fichier ET de la lisibilité (le code ment « cette classe est utilisée »). La map explicite est toujours préférable.',
              '**« Prettier est obligatoire. »** Non : c\'est un confort d\'équipe. La CONVENTION importe plus que l\'outil — mais le plugin prettier-plugin-tailwindcss l\'applique gratuitement au sauver.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les classes reconstruites dynamiquement (`"bg-" + couleur + "-500"` — le piège absolu du scan), et l\'extraction Pavlovienne de chaque répétition en `@apply` — qui recrée du CSS classique en perdant la lecture directe et la purge fine.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche referme le module en bouclant sur sa première : le scan du générateur (fiche **Installation**) est la loi que TOUTES ces pratiques respectent — classes complètes, fichiers listés, build minifié. La hiérarchie « composant > boucle > @apply » tranche le dilemme ouvert dans **Directives**, et les motifs à extraire sont déjà nommés depuis le **thème** (les `awa`/… de ta palette). Les classes dynamiques de statut cotisaient déjà dans le registre tontine (**Bordures**) et les pastilles ping (**Animations**). Regarde le sommaire : tu viens de tout relier — l\'outil complete, maintenant la constance d\'équipe.' },
          ],
          errors: [
            {
              title: 'Classes concaténées dynamiquement',
              bad: '<span class="bg-{{ commande.couleur }}-500\n             text-{{ commande.couleur }}-100">\n  {{ commande.statut }}\n</span>\n{{-- le fichier ne contient que le MORCEAU « bg-…-500 » :\n     aucune chaîne complète (bg-emerald-500…) n\'existe pour\n     le scan → AUCUN de ces styles ne sera jamais généré.\n     Le badge sort complètement transparent, en prod comme en dev. --}}',
              good: '@php\n  $couleurs = [\n    \'emerald\' => \'bg-emerald-500 text-emerald-100\',\n    \'amber\'   => \'bg-amber-500 text-amber-100\',\n    \'sky\'     => \'bg-sky-500 text-sky-100\',\n  ];\n@endphp\n<span class="rounded-full px-2.5 py-0.5 {{ $couleurs[$commande->couleur] }}">\n  {{ commande.statut }}\n</span>\n{{-- les chaînes EXISTENT dans le fichier → purge intacte.\n     Et ajouter une couleur = une ligne de tableau, pas un template. --}}',
              why: 'Le scan étant textuel, un fragment de classe n\'a aucune existence : « bg-{{…}}-500 » n\'est ni bg-emerald-500 ni quoi que ce soit — pour le générateur, il n\'y a rien à générer. Les 3 solutions professionnelles, en ordre de préférence : 1) la map qui écrit les classes en entier (explicite, extensible, purge parfaite) ; 2) le ternaire multi-branches si deux-trois cas seulement ; 3) la safelist en config, jamais avant — c\'est contournement, pas solution. Le symptôme fétiche du piège : « en inspecteur, la couleur n\'existe même pas dans le calculé ».'
            },
            {
              title: 'Extraire des classes CSS à la première répétition',
              bad: '/* .petit-bloc-blanc utilisé 3 fois (dashboard, carte, footer) : */\n.petit-bloc-blanc {\n  @apply mt-4 rounded-xl bg-white p-4 shadow-sm;\n}\n/* 6 mois plus tard, la carte a BESOIN d\'un p-6, le dashboard de\n   mt-2 — on commence à voir : class="petit-bloc-blanc p-6" ici,\n   « petit-bloc-blanc mt-2 » là, et chaque changement du composant\n   réveille aucun idée des pages qu\'il va casser au loin. La classe\n   est devenue un tonnelier privé de contexte. */',
              good: '{{-- la CARTE produit répétée 30 fois → partial (fichier) :\n     partials/carte-produit.blade.php — SEULE source, nom clair.\n\n     les BLOCS blancs épars (3 pages, évolution distincte) →\n     CHACUN garde ses classes visibles :\n     class="mt-4 rounded-xl bg-white p-4 shadow-sm"\n     — pas de dépendance lointaine, changement local sûr. --}}',
              why: 'L\'extraction doit répondre à la question « ces endroits DOIVENT-ils évoluer ensemble ? », pas à « se ressemblent-ils aujourd\'hui ? ». Un ressemblance de hasard promu en composant crée une FAUSSE unité : chaque vraie divergence s\'adresse ensuite en overrides — pire que la duplication initiale. La hiérarchie professionnelle est défensive : fichier d\'abord (quand c\'est un fragment d\'UI stable), boucle ensuite, @apply uniquement pour les motifs petits, nommés, à évolution solidaire.'
            }
          ],
          related: ['tw-installation', 'tw-directives', 'tw-theme', 'tw-etats']
        }
      ]
    }
  ]
};
