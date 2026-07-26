/* ============================================================
   exo-tailwind.js — Exercices pratiques : Tailwind CSS
   Tests orientés CLASSES utilitaires (robustes même hors-ligne :
   les classes vivent dans le DOM, pas besoin du CDN pour les lire).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

var _TW_HEAD = '<scr' + 'ipt src="https://cdn.tailwindcss.com/3.4.16"></scr' + 'ipt>';

window.DEVDOCS_EXO.tailwind = {
  module: 'tailwind',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-tw-carte-gari',
      level: 'fonda',
      title: 'La carte gari en utilitaires',
      icon: 'shopping_bag',
      free: true,
      minutes: 15,
      kind: 'dom',
      head: _TW_HEAD,
      context: "Le collectif « Marché Navi » a adopté Tailwind pour aller vite. On te donne une carte produit en HTML nu : à toi de la transformer en carte premium avec des classes utilitaires, sans écrire une ligne de CSS.",
      statement: "Bienvenue dans Tailwind : ici, le style s'écrit **directement dans les classes** du HTML, un utilitaire par intention. Ta mission : styliser la carte gari.\n\nCible à atteindre :\n\n- La `.carte` : fond blanc (`bg-white`), coins très arrondis (`rounded-2xl`), ombre douce (`shadow-lg`), remplissage `p-6` et largeur max (`max-w-sm`).\n- Le `.prix` : gros et coloré — `text-xl`, `font-bold` (ou `font-extrabold`), `text-amber-600`.\n- Le bouton : `bg-amber-500`, `text-white`, `font-semibold`, `px-5 py-2.5`, `rounded-full`, plus les états `hover:bg-amber-600` et `transition`.\n- Le badge `.stock` : petit texte vert sur fond clair — `text-xs`, `font-medium`, `text-green-700`, `bg-green-100`, `rounded-full`, `px-2.5 py-0.5`.\n\nRésiste à la tentation d'écrire du CSS custom : tout doit passer par les utilitaires. C'est la discipline qui rend Tailwind si rapide en équipe.",
      constraints: [
        "Uniquement des classes utilitaires Tailwind : zéro <style>, zéro style en ligne.",
        "La carte : `bg-white rounded-2xl shadow-lg p-6 max-w-sm` (modifiable mais couvre ces 5 intentions).",
        "Le prix : graisse forte + `text-amber-600`.",
        "Le bouton : fond amber, coins pilule, états hover + transition.",
        "Le badge stock : `text-xs` sur fond `bg-green-100` arrondi."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!-- Ajoute les classes Tailwind directement sur les éléments -->
<article class="carte">
  <span class="stock">En stock — 42 sacs</span>
  <h1>Gari fin de Savalou</h1>
  <p class="prix">13 500 FCFA</p>
  <p class="desc">Torréfaction lente, granulométrie fine, sans sable.</p>
  <button type="button">Ajouter au panier</button>
</article>
` },
        { key: 'css', label: 'decor.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #f3efe6; font-family: ui-sans-serif, system-ui, sans-serif; }
h1 { margin: 8px 0 2px; }` }
      ],
      tests: [
        { name: 'La carte est blanche, arrondie, ombrée et paddée', help: "class=\"carte bg-white rounded-2xl shadow-lg p-6\" — quatre intentions, quatre utilitaires.",
          check: function (doc) { var c = doc.querySelector('.carte'); if (!c) return false; var need = ['bg-white', 'rounded-2xl', 'shadow-lg', 'p-6']; var ok = true; need.forEach(function (k) { if (!c.classList.contains(k)) ok = false; }); return ok; } },
        { name: 'Le prix est gros, gras et ambré', help: "text-xl (ou plus), font-bold/extrabold, text-amber-600.",
          check: function (doc) { var p = doc.querySelector('.prix'); if (!p) return false; var gras = p.classList.contains('font-bold') || p.classList.contains('font-extrabold'); var gros = /text-(xl|2xl|3xl)/.test(p.className); return gras && gros && p.classList.contains('text-amber-600'); } },
        { name: 'Le bouton est une pilule amber interactive', help: "bg-amber-500 text-white rounded-full + hover:bg-amber-600 + transition.",
          check: function (doc) { var b = doc.querySelector('button'); if (!b) return false; var ok = b.classList.contains('bg-amber-500') && b.classList.contains('text-white') && b.classList.contains('rounded-full'); return ok && b.classList.contains('hover:bg-amber-600'); } },
        { name: 'Le badge stock est petit, vert, sur fond clair arrondi', help: "text-xs text-green-700 bg-green-100 rounded-full px-2.5 py-0.5 (ou proche).",
          check: function (doc) { var s = doc.querySelector('.stock'); if (!s) return false; return s.classList.contains('text-xs') && /text-green-\d00/.test(s.className) && /bg-green-\d00/.test(s.className) && /rounded(-full|-md|-lg)?/.test(s.className); } }
      ],
      hints: [
        "Pense en intentions : « fond blanc » → `bg-white`, « coins très ronds » → `rounded-2xl`, « ombre douce » → `shadow-lg`. Chaque classe ne fait qu'UNE chose, c'est la philosophie.",
        "L'échelle d'espacement : `p-6` = 1,5 rem (24px). `px-5 py-2.5` = horizontal 20px, vertical 10px — le bouton s'en trouve équilibré.",
        "Les états se préfixent : `hover:bg-amber-600` ne s'applique qu'au survol, `transition` anime le changement. Teste en passant la souris sur le bouton de l'aperçu."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<!-- Chaque classe = une intention de style. On lit la carte comme une phrase. -->
<article class="carte bg-white rounded-2xl shadow-lg p-6 max-w-sm">
  <!-- Badge discret : petit texte vert sur fond vert dilué, pilule -->
  <span class="stock inline-block text-xs font-medium text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">En stock — 42 sacs</span>

  <h1 class="text-lg font-bold text-gray-900">Gari fin de Savalou</h1>

  <!-- Prix : LA donnée recherchée. Taille + graisse + couleur d'accent -->
  <p class="prix text-xl font-bold text-amber-600">13 500 FCFA</p>

  <p class="desc text-sm text-gray-600 mb-4">Torréfaction lente, granulométrie fine, sans sable.</p>

  <!-- Pilule amber : état hover assombri, transition pour la douceur -->
  <button type="button" class="bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-amber-600 transition">
    Ajouter au panier
  </button>
</article>`,
        explain: "La force de Tailwind est la **co-localisation** : le style vit à côté de l'élément qu'il décrit. Tu relis la carte sans aller-retour vers un fichier CSS, et supprimer un élément supprime son style avec lui — zéro CSS orphelin.\n\nObserve les conventions d'échelle : `p-6` (24px), `px-2.5` (10px), `text-xs/sm/lg/xl`, `font-medium/bold`. Cette échelle partagée est ce qui harmonise visuellement sans effort : au lieu d'inventer 13px ici et 14px là, tu pioches dans des valeurs étalonnées. États et variantes se préfixent (`hover:…`, plus tard `md:…`, `dark:…`) — une grammaire régulière que tu liras bientôt aussi vite que du texte."
      },
      criteria: [
        "La carte affiche fond blanc, `rounded-2xl`, ombre, padding — via utilitaires uniquement.",
        "Le prix ressort immédiatement (taille, graisse, amber).",
        "Le bouton réagit au survol (hover: + transition).",
        "Le badge est une vraie pilule informative en vert dilué.",
        "Aucun CSS écrit à la main, y compris en ligne."
      ],
      variants: [
        "Ajoute `hover:shadow-xl hover:-translate-y-1 transition` sur la carte entière et observe la micro-élévation.",
        "Crée un deuxième badge `Promo −10 %` en amber au-dessus du prix (`bg-amber-100 text-amber-700`).",
        "Ajoute l'image avec `aspect-[4/3] object-cover rounded-xl mb-3` via placehold.co."
      ],
      related: ['tw-theme', 'tw-couleurs', 'tw-spacing', 'tw-typographie']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-tw-navbar-marche',
      level: 'fonda',
      title: 'La barre de navigation du marché',
      icon: 'menu',
      free: false,
      minutes: 25,
      kind: 'dom',
      head: _TW_HEAD,
      context: "« Marché Navi » doit tenir dans la poche : 80 % des vendeuses consultent le site depuis un téléphone. La barre de navigation doit donc naître mobile, puis s'ouvrir sur grand écran — la pensée mobile-first de Tailwind.",
      statement: "Tu vas réaliser une navbar responsive selon la philosophie Tailwind : **d'abord le mobile, puis les variantes `md:` pour les écrans moyens et plus**.\n\nCible :\n\n- La `nav` : rangée flexible alignée au centre, contenu poussé aux extrémités — `flex items-center justify-between`, fond `bg-emerald-700`, texte `text-white`, espacement `px-6 py-4`.\n- Le logo : `font-bold text-lg`.\n- Le menu `ul` : **caché sur mobile** (`hidden`), **rangée à partir de md** (`md:flex md:items-center gap-6`) ; les liens en `text-sm` avec `hover:text-amber-300`.\n- Le bouton burger : visible uniquement sur mobile — `md:hidden` (le câblage du menu dépliant est laissé en défi bonus, pas dans cet exercice).\n\nLa règle d'or à mémoriser : une classe **sans préfixe s'applique partout** ; `md:…` surcharge à partir de 768px. `hidden md:flex` se lit donc : « caché par défaut, flexible dès l'écran moyen ».",
      constraints: [
        "Approche mobile-first : états par défaut = mobile, variantes `md:` pour le large.",
        "Le menu : `hidden` + `md:flex` (couple à mémoriser par cœur).",
        "Le burger : `md:hidden` (disparaît dès que le menu tient).",
        "La nav : `flex items-center justify-between px-6 py-4 bg-emerald-700 text-white`.",
        "Utilitaires uniquement, zéro CSS custom."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<body class="bg-gray-50">
<!-- Stylise : nav, logo, ul (hidden md:flex…), burger (md:hidden) -->
<nav>
  <span class="logo">Marché Navi</span>
  <button type="button" class="burger" aria-label="Menu">☰</button>
  <ul class="menu">
    <li><a href="#">Accueil</a></li>
    <li><a href="#">Étals</a></li>
    <li><a href="#">Prix du jour</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<main class="p-6 text-gray-600">Contenu de la page…</main>
</body>
` },
        { key: 'css', label: 'reset.css', lang: 'css', editable: false, code:
`body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; }
ul { list-style: none; margin: 0; padding: 0; }
a { color: inherit; text-decoration: none; }
button { font: inherit; background: none; border: none; color: inherit; cursor: pointer; font-size: 20px; }` }
      ],
      tests: [
        { name: 'La nav est une rangée flex alignée, espacée entre les bords', help: "flex items-center justify-between sur la nav : logo à gauche, menu à droite.",
          check: function (doc) { var n = doc.querySelector('nav'); return !!n && n.classList.contains('flex') && n.classList.contains('items-center') && n.classList.contains('justify-between'); } },
        { name: 'La nav a fond émeraude, texte blanc et espacement', help: "bg-emerald-700 text-white px-6 py-4.",
          check: function (doc) { var n = doc.querySelector('nav'); return /bg-emerald-\d00/.test(n.className) && n.classList.contains('text-white') && /p[xy]-[46]/.test(n.className); } },
        { name: 'Le menu est caché sur mobile et rangée dès md (hidden md:flex)', help: "Le couple culte : class=\"menu hidden md:flex md:items-center gap-6\".",
          check: function (doc) { var u = doc.querySelector('.menu'); return !!u && u.classList.contains('hidden') && u.classList.contains('md:flex'); } },
        { name: 'Le burger disparaît sur grand écran (md:hidden)', help: "md:hidden : visible sous 768px seulement.",
          check: function (doc) { var b = doc.querySelector('.burger'); return !!b && b.classList.contains('md:hidden'); } }
      ],
      hints: [
        "Traduis : « caché par défaut, flexible dès md » → `class=\"menu hidden md:flex md:items-center gap-6\"`. `gap-6` espace les `li` sans marges.",
        "Le burger est l'inverse : visible par défaut, caché dès md → `class=\"burger md:hidden\"` (garde l'aria-label !).",
        "La nav elle-même : `class=\"flex items-center justify-between bg-emerald-700 text-white px-6 py-4\"`. Agrandis et rétrécis la fenêtre de l'aperçu pour vérifier la bascule à 768px."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<body class="bg-gray-50">
<nav class="flex items-center justify-between bg-emerald-700 text-white px-6 py-4">
  <!-- Logo : graisse + taille suffisent, pas besoin de plus -->
  <span class="logo font-bold text-lg">Marché Navi</span>

  <!-- Burger : mobile UNIQUEMENT (caché dès md) -->
  <button type="button" class="burger md:hidden" aria-label="Ouvrir le menu">☰</button>

  <!-- Menu : caché sur mobile, rangée dès l'écran moyen -->
  <ul class="menu hidden md:flex md:items-center gap-6 text-sm">
    <li><a href="#" class="hover:text-amber-300 transition">Accueil</a></li>
    <li><a href="#" class="hover:text-amber-300 transition">Étals</a></li>
    <li><a href="#" class="hover:text-amber-300 transition">Prix du jour</a></li>
    <li><a href="#" class="hover:text-amber-300 transition">Contact</a></li>
  </ul>
</nav>
<main class="p-6 text-gray-600">Contenu de la page…</main>
</body>`,
        explain: "Tout l'exercice tient dans la grammaire mobile-first de Tailwind : une classe nue cible **toutes** les tailles ; un préfixe (`md:`, `lg:`) signifie « à partir de cette largeur ». `hidden md:flex` et `md:hidden` sont les deux faces de la même pièce — le menu et le burger se relaient exactement à la frontière de 768px, sans une ligne de JavaScript ni de media query écrite à la main.\n\nRemarque l'usage de `gap-6` sur la rangée : comme pour Grid, `gap` remplace les marges entre liens et évite le classique « dernier élément avec marge en trop ». Enfin, les `hover:text-amber-300` par lien montrent que les états s'écrivent au plus près de l'élément : relire un lien revient à lire sa petite phrase complète."
      },
      criteria: [
        "Navbar en rangée avec logo/logo et menu/burger correctement répartis.",
        "Le menu suit `hidden md:flex`, le burger `md:hidden`.",
        "Fond émeraude + texte blanc + espacements réguliers via l'échelle Tailwind.",
        "Aucun CSS personnalisé ajouté.",
        "La bascule mobile/desktop fonctionne quand on redimensionne."
      ],
      variants: [
        "Branche le burger en JS minimal (`menu.classList.toggle('hidden')`) pour un vrai menu mobile dépliant.",
        "Ajoute `sticky top-0 z-50` à la nav et constate l'effet au scroll.",
        "Ajoute une variante `lg:px-12` et `md:text-base` pour un raffinage par paliers."
      ],
      related: ['tw-responsive', 'tw-flexbox-grid', 'tw-layout', 'tw-etats']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-tw-formulaire-livraison',
      level: 'inter',
      title: 'Le formulaire de livraison en deux colonnes',
      icon: 'local_shipping',
      free: false,
      minutes: 35,
      kind: 'dom',
      head: _TW_HEAD,
      context: "Le service de livraison de « Marché Navi » ouvre les commandes WhatsApp→web. Le formulaire doit être irréprochable sur téléphone (une colonne) et efficace sur ordinateur (deux colonnes), avec un focus bien visible pour saisir vite au marché.",
      statement: "À toi de composer un formulaire complet à la sauce utilitaire :\n\n- Le `form` : grille — `grid gap-4 sm:grid-cols-2` (une colonne sur mobile, deux dès le palier `sm`). Le champ « adresse » et le bouton occupent **toute la largeur** : `sm:col-span-2`.\n- Les `label` : `block text-sm font-medium text-gray-700 mb-1` (le `block` est indispensable : un label inline ne pousse pas le champ à la ligne).\n- Les `input`, `select`, `textarea` : `w-full rounded-lg border border-gray-300 px-3 py-2` + état de focus clairement visible : `focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`.\n- Le bouton : `bg-emerald-600 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-emerald-700 transition`.\n- Enveloppe : la carte `.carte-form` en `bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto`.\n\nNote la symétrie : chaque variante entre crochets (palier, état) enrichit la base sans la dupliquer.",
      constraints: [
        "Formulaire en grille `sm:grid-cols-2` ; adresse et bouton en `sm:col-span-2`.",
        "Chaque champ : `w-full rounded-lg border` + padding + `focus:ring-2` sur au moins la saisie principale (idéalement tous).",
        "Labels en `block` avec `text-sm font-medium`.",
        "Utilitaires uniquement ; structure HTML existante conservée.",
        "Le focus doit être visiblement différent du repos (anneau + bordure colorée)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<body class="bg-gray-100 p-4">
<div class="carte-form">
  <h1 class="titre">Livraison de commande</h1>
  <form>
    <div>
      <label for="nom">Nom complet</label>
      <input id="nom" type="text" placeholder="Awa Mensah">
    </div>
    <div>
      <label for="tel">Téléphone</label>
      <input id="tel" type="tel" placeholder="97 00 00 00">
    </div>
    <div class="large-adresse">
      <label for="adresse">Adresse de livraison</label>
      <input id="adresse" type="text" placeholder="Quartier, repère…">
    </div>
    <div>
      <label for="creneau">Créneau</label>
      <select id="creneau"><option>Matin 8h-11h</option><option>Après-midi 14h-17h</option></select>
    </div>
    <div class="large-notes">
      <label for="notes">Notes (optionnel)</label>
      <textarea id="notes" rows="2" placeholder="Portail vert, 2e cour…"></textarea>
    </div>
    <button type="submit" class="large-bouton">Valider la livraison</button>
  </form>
</div>
</body>
` },
        { key: 'css', label: 'reset.css', lang: 'css', editable: false, code:
`body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 0; }
h1 { margin: 0 0 14px; }
input, select, textarea { font: inherit; box-sizing: border-box; }` }
      ],
      tests: [
        { name: 'Le formulaire est une grille 2 colonnes dès sm', help: "form { grid gap-4 sm:grid-cols-2 } — mobile d'abord (une colonne par défaut).",
          check: function (doc) { var f = doc.querySelector('form'); return !!f && f.classList.contains('grid') && f.classList.contains('sm:grid-cols-2'); } },
        { name: 'Adresse et bouton occupent toute la largeur (sm:col-span-2)', help: "Ajoute sm:col-span-2 au conteneur de l'adresse et au bouton.",
          check: function (doc) { var spans = doc.querySelectorAll('.sm\\:col-span-2'); return spans.length >= 2; } },
        { name: 'Tous les champs sont pleine largeur et arrondis', help: "w-full rounded-lg border border-gray-300 px-3 py-2 — sur input, select ET textarea.",
          check: function (doc) { var champs = doc.querySelectorAll('form input, form select, form textarea'); if (champs.length < 4) return false; var ok = true; champs.forEach(function (c) { if (!c.classList.contains('w-full') || !c.classList.contains('rounded-lg') || !c.classList.contains('border')) ok = false; }); return ok; } },
        { name: 'Les labels poussent le champ à la ligne (block) et sont sobres', help: "block text-sm font-medium text-gray-700 — sans block, le champ reste collé au label.",
          check: function (doc) { var labels = doc.querySelectorAll('form label'); if (labels.length < 4) return false; var ok = true; labels.forEach(function (l) { if (!l.classList.contains('block') || !l.classList.contains('text-sm')) ok = false; }); return ok; } },
        { name: 'Le focus est annoncé par un anneau (focus:ring-2)', help: "focus:outline-none focus:ring-2 focus:ring-emerald-500 sur les champs.",
          check: function (doc) { var ringed = doc.querySelectorAll('form .focus\\:ring-2, form .focus\\:ring-4'); return ringed.length >= 3; } }
      ],
      hints: [
        "La grille : `class=\"grid gap-4 sm:grid-cols-2\"` sur le `form`. Par défaut c'est une colonne ; à `sm` (640px) ça devient deux. Pour les champs pleine largeur : `sm:col-span-2` sur leur `div` conteneur (pas sur l'input).",
        "Attention au piège du label : sans `block`, `mb-1` ne pousse rien vers le bas car le label n'occupe pas sa propre ligne. Couple à mémoriser : `block mb-1`.",
        "Le triplet focus sur chaque champ : `focus:outline-none` retire le contour natif (disgracieux et asymétrique) À CONDITION de le remplacer par `focus:ring-2 focus:ring-emerald-500` — jamais l'un sans l'autre, sinon l'accessibilité clavier s'effondre."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<body class="bg-gray-100 p-4">
<div class="carte-form bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
  <h1 class="titre text-xl font-bold text-gray-900">Livraison de commande</h1>

  <!-- Grille mobile-first : 1 colonne, puis 2 dès sm -->
  <form class="grid gap-4 sm:grid-cols-2">

    <div>
      <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
      <input id="nom" type="text" placeholder="Awa Mensah"
             class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
    </div>

    <div>
      <label for="tel" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
      <input id="tel" type="tel" placeholder="97 00 00 00"
             class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
    </div>

    <!-- Pleine largeur sur desktop : col-span-2 -->
    <div class="sm:col-span-2">
      <label for="adresse" class="block text-sm font-medium text-gray-700 mb-1">Adresse de livraison</label>
      <input id="adresse" type="text" placeholder="Quartier, repère…"
             class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
    </div>

    <div class="sm:col-span-2">
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
      <textarea id="notes" rows="2" placeholder="Portail vert, 2e cour…"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"></textarea>
    </div>

    <button type="submit"
            class="sm:col-span-2 bg-emerald-600 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-emerald-700 transition">
      Valider la livraison
    </button>
  </form>
</div>
</body>`,
        explain: "Trois principes à retenir. **Mobile-first** : on n'écrit `grid-cols-2` nulle part — seulement `sm:grid-cols-2`. Par défaut la grille est mono-colonne, le design de base est donc déjà le design mobile ; les écrans larges sont un raffinement. C'est l'inverse mental du CSS historique et ça change tout.\n\n**Le `block` du label** : un label est inline par nature ; sans `block`, ton `mb-1` n'a aucun effet vertical et le champ reste accolé. Le couple `block mb-1` revient dans 95 % des formulaires.\n\n**Le focus engineering** : `focus:outline-none` supprime le liseré natif du navigateur — utile esthétiquement, mais dangereux seul, car l'utilisateur au clavier ne sait plus où il est. La règle d'or : on ne retire un contour natif qu'en installant un remplaçant plus beau ET plus visible (`focus:ring-2 focus:ring-emerald-500`). L'anneau Tailwind est un `box-shadow` : il ne décale pas la mise en page."
      },
      criteria: [
        "Grille mobile-first effective : une colonne sur petit écran, deux dès `sm`.",
        "Champs larges correctement étendus via `sm:col-span-2`.",
        "Tous les champs : `w-full`, arrondis, bordés, paddés, anneau de focus.",
        "Labels en `block`, sobres et réguliers.",
        "Aucune classe collée au hasard : chacune se justifie."
      ],
      variants: [
        "Ajoute un état d'erreur : champ téléphone avec `border-red-500 focus:ring-red-500` + message `text-sm text-red-600 mt-1`.",
        "Ajoute un champ « photo du colis » stylé avec `file:` variants de Tailwind.",
        "Passe le bouton en `disabled:opacity-50 disabled:cursor-not-allowed` quand le formulaire est incomplet (petit JS en bonus)."
      ],
      related: ['tw-responsive', 'tw-etats', 'tw-spacing', 'tw-bordures']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-tw-dark-marche',
      level: 'inter',
      title: 'Le mode sombre de l\u2019étal nocturne',
      icon: 'dark_mode',
      free: false,
      minutes: 40,
      kind: 'dom',
      head: '<scr' + 'ipt src="https://cdn.tailwindcss.com/3.4.16"></scr' + 'ipt><scr' + 'ipt>tailwind.config = { darkMode: "class" }</scr' + 'ipt>',
      context: "Les mareyeuses ouvrent l'app à 4 h du matin, sur le port de pêche, en pleine nuit. Un écran blanc les aveugle : le mode sombre n'est pas un gadget mais une condition de travail. Tailwind le déclenche via une classe `dark` sur la racine.",
      statement: "Tu vas décliner l'interface en mode sombre au moyen du préfixe **`dark:`**. Principe : chaque élément reçoit sa paire de classes — l'apparence claire nue, la sombre préfixée — et le basculeur fourni (JS en lecture seule) ajoute ou retire la classe `dark` sur `<html>`.\n\nÀ décliner :\n\n- Le fond de page : `bg-gray-100` ↔ `dark:bg-gray-900`.\n- La `.carte` : `bg-white` ↔ `dark:bg-gray-800`, avec `transition-colors` pour adoucir.\n- Le titre et le texte : `text-gray-900` ↔ `dark:text-gray-100` ; `text-gray-600` ↔ `dark:text-gray-300`.\n- Le bouton : reste amber, mais assombri la nuit : `dark:bg-amber-500` si tu es parti de `bg-amber-600` (les couleurs vives « poppent » trop dans le noir).\n- Le badge : `bg-green-100 text-green-700` ↔ `dark:bg-green-900 dark:text-green-200`.\n\nLa clé `darkMode: 'class'` est déjà configurée dans l'en-tête de l'atelier : c'est ce qui te permet de basculer à la demande plutôt que de subir les réglages système.",
      constraints: [
        "Chaque surface et chaque texte important a sa paire claire + variante `dark:`.",
        "`transition-colors` au moins sur la page et la carte (jamais `transition-all` systématique).",
        "Le badge et le bouton gardent leur rôle coloré identifiable la nuit.",
        "Le contraste reste lisible dans les deux modes (teste-les réellement).",
        "Utilitaires uniquement."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<body class="page">
<div class="conteneur">
  <button type="button" id="basculer" class="btn-bascule">Basculer clair / sombre</button>
  <article class="carte">
    <span class="badge">Arrivage du jour</span>
    <h1 class="titre">Capitaine frais</h1>
    <p class="desc">Pêché cette nuit au large de Cotonou, livré avant 7 h.</p>
    <p class="prix">4 500 F / kg</p>
    <button type="button" class="btn-action">Commander</button>
  </article>
</div>
</body>
` },
        { key: 'css', label: 'reset.css', lang: 'css', editable: false, code:
`body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; }
h1 { margin: 6px 0 4px; }` },
        { key: 'js', label: 'dark.js', lang: 'js', editable: false, code:
`// Déjà branché : ajoute/retire la classe "dark" sur <html>.
document.querySelector('#basculer').addEventListener('click', function () {
  document.documentElement.classList.toggle('dark');
});` }
      ],
      tests: [
        { name: 'La page a sa paire claire + dark (bg-gray-100 dark:bg-gray-900 ou proche)', help: "body { bg-gray-100 dark:bg-gray-900 } — clair d'abord, variante dark: ensuite.",
          check: function (doc) { var b = doc.body.className || doc.querySelector('.page').className; return /bg-(gray|slate|neutral|zinc)-\d+/.test(b) && /dark:bg-(gray|slate|neutral|zinc)-\d+/.test(b); } },
        { name: 'La carte passe en surface sombre avec transition', help: "carte { bg-white dark:bg-gray-800 transition-colors }",
          check: function (doc) { var c = doc.querySelector('.carte'); return !!c && /bg-(white|gray-50)/.test(c.className) && /dark:bg-(gray|slate|neutral|zinc)-\d+/.test(c.className) && /transition-colors/.test(c.className); } },
        { name: 'Les textes ont des variantes dark lisibles', help: "titre : dark:text-gray-100 ; desc : dark:text-gray-300 (ou proche).",
          check: function (doc) { var t = doc.querySelector('.titre'); var d = doc.querySelector('.desc'); return !!t && /dark:text-/.test(t.className) && !!d && /dark:text-/.test(d.className); } },
        { name: 'Badge et bouton gardent une identité colorée adaptée la nuit', help: "badge : dark:bg-green-900 dark:text-green-200 ; bouton : variante dark: d'amber (ou autre accent).",
          check: function (doc) { var badge = doc.querySelector('.badge'); var btn = doc.querySelector('.btn-action'); return !!badge && /dark:/.test(badge.className) && !!btn && /dark:/.test(btn.className); } },
        { name: 'Le basculeur fonctionne : la classe dark change l\u2019arrière-plan calculé', help: "Clique Basculer : le fond calculé de la page doit changer (preuve que ta paire de classes est branchée).",
          check: function (doc, win) { var b = doc.querySelector('#basculer'); if (!b) return false; var target = doc.body; var before = win.getComputedStyle(target).backgroundColor; b.click(); var after = win.getComputedStyle(target).backgroundColor; var ok = before !== after; b.click(); return ok; } }
      ],
      hints: [
        "Travaille élément par élément, toujours le même réflexe : « en clair c'est X, donc en sombre ce sera dark:Y ». Page : `bg-gray-100 dark:bg-gray-900`. Carte : `bg-white dark:bg-gray-800 transition-colors`.",
        "Les textes suivent la surface : titre `text-gray-900 dark:text-gray-100`, description `text-gray-600 dark:text-gray-300`. Retiens : sombre ≠ inverser tout, c'est re-niveler les contrastes (un gris 600 devient 300, pas du blanc pur).",
        "Le badge « Arrivage » : `bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200`. Puis clique le basculeur et inspecte chaque zone à la recherche d'un oubli — le test final est ton œil."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<body class="page bg-gray-100 dark:bg-gray-900 transition-colors min-h-screen">
<div class="conteneur max-w-sm mx-auto p-6">

  <button type="button" id="basculer"
          class="btn-bascule mb-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium px-4 py-2 transition-colors">
    Basculer clair / sombre
  </button>

  <article class="carte bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
    <span class="badge inline-block text-xs font-medium rounded-full px-2.5 py-0.5
                 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">Arrivage du jour</span>

    <h1 class="titre text-lg font-bold text-gray-900 dark:text-gray-100">Capitaine frais</h1>
    <p class="desc text-sm text-gray-600 dark:text-gray-300">Pêché cette nuit au large de Cotonou, livré avant 7 h.</p>

    <!-- Le prix garde sa fonction d'accent dans les deux modes -->
    <p class="prix text-xl font-bold text-amber-600 dark:text-amber-400 mt-3">4 500 F / kg</p>

    <button type="button"
            class="btn-action mt-4 bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-full
                   hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 transition-colors">
      Commander
    </button>
  </article>
</div>
</body>`,
        explain: "Le mode sombre Tailwind repose sur une convention : `dark:` préfixe une classe qui ne s'applique que lorsque la classe `dark` est présente sur un ancêtre (stratégie `class`, configurée dans l'en-tête de l'atelier). Chaque élément déclare donc ses **deux vérités** côte à côte — claire nue, sombre préfixée — et la bascule devient un simple toggle de classe, sans réécrire le moindre style.\n\nLe travail de qualité est dans les **niveaux** : on n'inverse pas bêtement noir/blanc. Un fond `gray-100` devient `gray-900`, une carte blanche devient `gray-800` (pas noire : les surfaces doivent se distinguer du fond), un texte `gray-600` devient `gray-300` pour garder sa subordination. L'accent amber s'éclaircit légèrement la nuit (`amber-600 → amber-400`) car une saturation identique paraît plus agressive sur fond sombre. Enfin `transition-colors` anime précisément les couleurs — pas `transition-all`, qui animerait aussi les changements de taille et ferait « respirer » les cartes."
      },
      criteria: [
        "Page, carte, titre, description, badge, bouton : chacun a ses deux variantes.",
        "La bascule fonctionne et change réellement le rendu (test du fond calculé).",
        "Les contrastes sont re-nivelés proprement (pas d'inversion brutale).",
        "`transition-colors` ciblé, pas d'animation parasite.",
        "Le résultat est utilisable à 4 h du matin sans éblouir."
      ],
      variants: [
        "Ajoute les états de survol manquants en mode sombre (`dark:hover:bg-…`) sur toutes les zones cliquables.",
        "Étends à tout le dashboard de l'exercice précédent : quelles paires de classes ajoutes-tu ?",
        "Ajoute le respect de `prefers-color-scheme` À L'INITIALISATION (petit JS) tout en gardant la bascule manuelle prioritaire."
      ],
      related: ['tw-dark', 'tw-couleurs', 'tw-etats', 'tw-animations']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-tw-dashboard-sacco',
      level: 'projet',
      title: 'Projet : le tableau de bord de la SACCO',
      icon: 'account_balance',
      free: false,
      minutes: 65,
      kind: 'dom',
      head: _TW_HEAD,
      context: "La SACCO (coopérative d'épargne) des commerçantes de Dantokpa veut son back-office : épargne, prêts, membres. La direction a posé une exigence : utilisable par la secrétaire sur son Android ET par le trésorier sur son PC — une seule base de code, zéro CSS custom.",
      statement: "Tu vas assembler un **tableau de bord complet responsive** en pur Tailwind, en réutilisant tout ce que tu as appris dans ce module : flex, grid, variantes de palier, états. Le livrable ressemble à une vraie app 2026.\n\nCahier des charges :\n\n- **Coquille** : un conteneur `flex min-h-screen`. La barre latérale : `hidden md:flex md:flex-col w-64 bg-emerald-800 text-white p-5` avec liens `rounded-lg px-3 py-2 hover:bg-emerald-700` (un actif : `bg-emerald-700`).\n- **Contenu** : `flex-1 bg-gray-100 p-4 md:p-8` avec un en-tête (`flex items-center justify-between`) : titre `text-2xl font-bold` + bouton d'action.\n- **Statistiques** : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` ; chaque carte `bg-white rounded-xl shadow p-5` avec libellé `text-sm text-gray-500` et valeur `text-2xl font-bold`.\n- **Table des prêts** : enveloppée d'`overflow-x-auto` pour scroller proprement sur mobile ; table `w-full text-left text-sm` ; `th` en `text-xs uppercase text-gray-500 border-b px-3 py-2` ; `td` en `px-3 py-2.5 border-b border-gray-100` ; statut en pilule (`inline-block rounded-full text-xs font-medium px-2.5 py-0.5` vert/amber selon le cas).\n- **Mobile** : la barre disparaît (le burger est un bonus) et tout tient en une colonne sans débordement.\n\nRends fière la secrétaire : relis-toi, vérifie chaque palier en redimensionnant, soigne les alignements.",
      constraints: [
        "Barre latérale `hidden md:flex w-64` — disparue sur mobile, présente dès md.",
        "Statistiques : grille 1 → 2 → 4 colonnes (`sm:` et `lg:`), gap régulier.",
        "Table dans `overflow-x-auto` + classes de lisibilité (bordures fines, caps, padding).",
        "Tous les espacements depuis l'échelle Tailwind, palette restreinte (emerald + grays + un accent).",
        "Zéro CSS écrit à la main."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<body class="fond">
<div class="coquille">
  <!-- Barre latérale (hidden md:flex …) -->
  <aside class="nav">
    <span class="marque">SACCO Dantokpa</span>
    <a href="#" class="lien actif">Tableau de bord</a>
    <a href="#" class="lien">Membres</a>
    <a href="#" class="lien">Prêts</a>
    <a href="#" class="lien">Épargne</a>
  </aside>

  <!-- Contenu principal -->
  <main class="principal">
    <header class="entete">
      <h1 class="titre">Tableau de bord</h1>
      <button type="button" class="btn-nouveau">+ Nouveau prêt</button>
    </header>

    <section class="stats">
      <article class="stat"><span class="libelle">Épargne totale</span><span class="valeur">8 450 000 F</span></article>
      <article class="stat"><span class="libelle">Prêts en cours</span><span class="valeur">23</span></article>
      <article class="stat"><span class="libelle">Membres actives</span><span class="valeur">147</span></article>
      <article class="stat"><span class="libelle">Taux de remboursement</span><span class="valeur">96 %</span></article>
    </section>

    <section class="bloc-prets">
      <h2 class="sous-titre">Prêts récents</h2>
      <div class="tableau-wrap">
        <table class="tableau">
          <thead><tr><th>Membre</th><th>Montant</th><th>Échéance</th><th>Statut</th></tr></thead>
          <tbody>
            <tr><td>Aminatou S.</td><td>150 000 F</td><td>30/08/2026</td><td><span class="statut ok">À jour</span></td></tr>
            <tr><td>Koffi D.</td><td>80 000 F</td><td>15/07/2026</td><td><span class="statut attente">Retard 5 j</span></td></tr>
            <tr><td>Rebecca A.</td><td>200 000 F</td><td>02/09/2026</td><td><span class="statut ok">À jour</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</div>
</body>
` },
        { key: 'css', label: 'reset.css', lang: 'css', editable: false, code:
`body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; }
a { text-decoration: none; color: inherit; }
table { border-collapse: collapse; }
h1, h2 { margin: 0; }
button { font: inherit; border: none; cursor: pointer; }` }
      ],
      tests: [
        { name: 'La barre latérale : fixe en largeur, cachée sur mobile', help: "aside { hidden md:flex md:flex-col w-64 bg-emerald-800 text-white p-5 min-h-… }",
          check: function (doc) { var a = doc.querySelector('.nav'); return !!a && a.classList.contains('hidden') && (a.classList.contains('md:flex') || a.classList.contains('md:block')) && a.classList.contains('w-64'); } },
        { name: 'Les statistiques montent en puissance : 1 → 2 → 4 colonnes', help: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.",
          check: function (doc) { var s = doc.querySelector('.stats'); return !!s && s.classList.contains('grid') && s.classList.contains('sm:grid-cols-2') && s.classList.contains('lg:grid-cols-4') && /gap-\d/.test(s.className); } },
        { name: 'Chaque stat est une carte blanche arrondie et ombrée', help: "bg-white rounded-xl shadow p-5.",
          check: function (doc) { var cards = doc.querySelectorAll('.stat'); if (cards.length < 4) return false; var ok = true; cards.forEach(function (c) { if (!c.classList.contains('bg-white') || !/rounded(-xl|-lg|-2xl)/.test(c.className) || !/shadow/.test(c.className)) ok = false; }); return ok; } },
        { name: 'La table est protégée du débordement mobile (overflow-x-auto)', help: "Le conteneur direct de la table porte overflow-x-auto.",
          check: function (doc) { var w = doc.querySelector('.tableau-wrap'); return !!w && w.classList.contains('overflow-x-auto'); } },
        { name: 'Les statuts sont des pilules colorées', help: "inline-block rounded-full text-xs font-medium px-2.5 py-0.5 + couleurs (bg-green-100 text-green-700 / bg-amber-100 text-amber-700…).",
          check: function (doc) { var s = doc.querySelectorAll('.statut'); if (s.length < 2) return false; var ok = true; s.forEach(function (el) { if (!/rounded-full/.test(el.className) || !el.classList.contains('text-xs') || !/bg-\w+-\d+/.test(el.className)) ok = false; }); return ok; } }
      ],
      hints: [
        "La coquille : `coquille` = `flex min-h-screen` ; la nav `hidden md:flex md:flex-col w-64 bg-emerald-800 text-white p-5` ; le principal `flex-1 bg-gray-100 p-4 md:p-8`. `flex-1` est le mot-clé qui absorbe l'espace restant à droite de la barre de 64.",
        "La grille de stats est le même motif que `hidden md:flex` décliné en trois paliers : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Lis : 1 colonne par défaut, 2 dès 640px, 4 dès 1024px.",
        "La table : le wrap `overflow-x-auto` est LA solution mobile (la table peut scroller horizontalement sans casser la page). Et n'oublie pas les pilules de statut : `inline-block` est nécessaire pour que le padding vertical prenne effet sur un `span`."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<body class="fond bg-gray-100">
<div class="coquille flex min-h-screen">

  <!-- Barre latérale : invisible sur mobile, colonne dès md -->
  <aside class="nav hidden md:flex md:flex-col w-64 bg-emerald-800 text-white p-5 gap-1">
    <span class="marque font-bold text-lg mb-6">SACCO Dantokpa</span>
    <a href="#" class="lien actif rounded-lg px-3 py-2 bg-emerald-700 text-sm font-medium">Tableau de bord</a>
    <a href="#" class="lien rounded-lg px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-700 transition">Membres</a>
    <a href="#" class="lien rounded-lg px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-700 transition">Prêts</a>
    <a href="#" class="lien rounded-lg px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-700 transition">Épargne</a>
  </aside>

  <!-- Contenu : absorbe tout l'espace restant -->
  <main class="principal flex-1 p-4 md:p-8">
    <header class="entete flex items-center justify-between mb-6">
      <h1 class="titre text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <button type="button" class="btn-nouveau bg-amber-500 hover:bg-amber-600 transition text-white font-semibold rounded-lg px-4 py-2 text-sm">+ Nouveau prêt</button>
    </header>

    <!-- Statistiques : 1 → 2 → 4 colonnes selon la largeur -->
    <section class="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <article class="stat bg-white rounded-xl shadow p-5">
        <span class="libelle block text-sm text-gray-500 mb-1">Épargne totale</span>
        <span class="valeur text-2xl font-bold text-gray-900">8 450 000 F</span>
      </article>
      <article class="stat bg-white rounded-xl shadow p-5">
        <span class="libelle block text-sm text-gray-500 mb-1">Prêts en cours</span>
        <span class="valeur text-2xl font-bold text-gray-900">23</span>
      </article>
      <article class="stat bg-white rounded-xl shadow p-5">
        <span class="libelle block text-sm text-gray-500 mb-1">Membres actives</span>
        <span class="valeur text-2xl font-bold text-gray-900">147</span>
      </article>
      <article class="stat bg-white rounded-xl shadow p-5">
        <span class="libelle block text-sm text-gray-500 mb-1">Taux de remboursement</span>
        <span class="valeur text-2xl font-bold text-emerald-600">96 %</span>
      </article>
    </section>

    <section class="bloc-prets bg-white rounded-xl shadow p-5">
      <h2 class="sous-titre text-lg font-bold text-gray-900 mb-4">Prêts récents</h2>
      <!-- Le wrap protège la page : la table scrolle horizontalement DESSOUS le contenu -->
      <div class="tableau-wrap overflow-x-auto">
        <table class="tableau w-full text-left text-sm">
          <thead>
            <tr>
              <th class="text-xs uppercase text-gray-500 border-b px-3 py-2">Membre</th>
              <th class="text-xs uppercase text-gray-500 border-b px-3 py-2">Montant</th>
              <th class="text-xs uppercase text-gray-500 border-b px-3 py-2">Échéance</th>
              <th class="text-xs uppercase text-gray-500 border-b px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-3 py-2.5 border-b border-gray-100">Aminatou S.</td>
              <td class="px-3 py-2.5 border-b border-gray-100 font-medium">150 000 F</td>
              <td class="px-3 py-2.5 border-b border-gray-100">30/08/2026</td>
              <td class="px-3 py-2.5 border-b border-gray-100"><span class="statut ok inline-block rounded-full text-xs font-medium px-2.5 py-0.5 bg-green-100 text-green-700">À jour</span></td>
            </tr>
            <tr>
              <td class="px-3 py-2.5 border-b border-gray-100">Koffi D.</td>
              <td class="px-3 py-2.5 border-b border-gray-100 font-medium">80 000 F</td>
              <td class="px-3 py-2.5 border-b border-gray-100">15/07/2026</td>
              <td class="px-3 py-2.5 border-b border-gray-100"><span class="statut attente inline-block rounded-full text-xs font-medium px-2.5 py-0.5 bg-amber-100 text-amber-700">Retard 5 j</span></td>
            </tr>
            <tr>
              <td class="px-3 py-2.5 border-b border-gray-100">Rebecca A.</td>
              <td class="px-3 py-2.5 border-b border-gray-100 font-medium">200 000 F</td>
              <td class="px-3 py-2.5 border-b border-gray-100">02/09/2026</td>
              <td class="px-3 py-2.5 border-b border-gray-100"><span class="statut ok inline-block rounded-full text-xs font-medium px-2.5 py-0.5 bg-green-100 text-green-700">À jour</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</div>
</body>`,
        explain: "Ce projet assemble trois motifs qui couvrent 90 % des interfaces d'admin. D'abord la **coquille flex** : `flex` sur le parent, largeur fixe `w-64` sur la barre, `flex-1` sur le contenu — la barre impose sa largeur, le reste s'adapte. Ensuite la **grille à paliers** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) traduit la hiérarchie d'espace disponible : sur téléphone, l'info défile verticalement ; sur bureau, elle s'aligne. Enfin le **wrap `overflow-x-auto`** qui résout élégamment le dilemme des tables sur mobile : mieux vaut un scroll horizontal localisé dans la table qu'une page entière qui déborde.\n\nNote la discipline de palette : emerald (marque), grays (neutres), amber (action), green/amber (statuts). Quatre familles, pas une de plus. Et l'alignement vertical toujours par l'échelle (`p-5`, `px-3 py-2.5`, `gap-4`) : c'est cette régularité invisible qui donne le sentiment « produit fini »."
      },
      criteria: [
        "Mobile : une colonne, aucune barre latérale, table scrollable proprement.",
        "Desktop : barre fixe 256px + contenu fluide, stats en 4 colonnes.",
        "Statuts en pilules colorées, typographie hiérarchisée (xs/sm/2xl).",
        "Palette disciplinée, états hover sur tous les éléments cliquables.",
        "Aucun CSS hors Tailwind ; le rendu inspire confiance à la direction."
      ],
      variants: [
        "Ajoute un menu mobile : barre latérale en `fixed inset-y-0 left-0 z-40 transform -translate-x-full` + bouton burger qui anime la translation (petit JS).",
        "Ajoute les variantes `dark:` de tout l'écran (exercice précédent) et une bascule.",
        "Extrais les répétitions avec `@apply` dans un composant `.btn` / `.carte` (en build Tailwind) et discute : quand vaut-il mieux `@apply` que dupliquer ?"
      ],
      related: ['tw-flexbox-grid', 'tw-responsive', 'tw-bonnes-pratiques', 'tw-spacing']
    }
  ]
};
