/* ============================================================
   exo-css.js — Exercices pratiques : CSS
   Le HTML est fourni ; l'élève écrit le CSS. Les tests lisent
   les styles CALCULÉS (getComputedStyle) dans l'iframe.
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.css = {
  module: 'css',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-css-carte-produit',
      level: 'fonda',
      title: 'La carte produit du marché en ligne',
      icon: 'shopping_bag',
      free: true,
      minutes: 20,
      kind: 'dom',
      context: "Le collectif « Marché Navi » de Cotonou lance sa boutique en ligne. La maquette montre des cartes produits aérées, douces, dans l'esprit iOS : coins arrondis, ombre portée subtile, prix bien visible.",
      statement: "Le HTML de la carte est fourni ; tu n'écris que le CSS (`styles.css`).\n\nObjectifs visuels : la `.carte` a un fond blanc, un rayon d'angle **d'au moins 16px**, une **ombre portée** douce (pas un trait dur), et un **remplissage interne** (padding) d'au moins 16px pour que le contenu respire. Le `.prix` doit ressortir : graisse forte (700 ou plus) et une couleur distincte du texte courant. Le `button` reçoit un fond plein, des coins arrondis (12px minimum, idéal : pilule) et `cursor: pointer`.\n\nExercice de fondation : `border-radius`, `box-shadow`, `padding`, couleurs et graisses. Tout le reste du CSS n'est que variation sur ces gestes.",
      constraints: [
        "Tout dans `styles.css` ; aucun style en ligne, aucune modification du HTML.",
        "`.carte` : `border-radius` ≥ 16px, `box-shadow` non vide, `padding` ≥ 16px, fond explicite.",
        "`.prix` : `font-weight` ≥ 700 et une couleur différente du texte standard.",
        "Le bouton : fond plein, `border-radius` ≥ 12px, `border: none`, `cursor: pointer`.",
        "Valeurs en unités relatives ou px — mais cohérentes entre elles."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<article class="carte">
  <div class="visuel">gari 25 kg</div>
  <h2>Gari fin de Savalou</h2>
  <p class="prix">13 500 FCFA</p>
  <p class="desc">Torréfaction lente au feu de bois, granulométrie fine, sans sable.</p>
  <button type="button">Ajouter au panier</button>
</article>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: true, code:
`/* À toi : transforme ce bloc nu en carte premium.
   Pense : fond, radius (>= 16px), ombre douce, padding, prix, bouton. */

` },
        { key: 'js', label: 'script.js', lang: 'js', editable: false, code: `// Rien à coder : l'exercice évalue ton CSS.` }
      ],
      tests: [
        { name: 'La carte a un fond et des coins arrondis (≥ 16px)', help: ".carte { background: #fff; border-radius: 16px ou plus; } — vérifie avec l'aperçu.",
          check: function (doc, win) { var c = doc.querySelector('.carte'); if (!c) return false; var s = win.getComputedStyle(c); var r = parseFloat(s.borderTopLeftRadius) || parseFloat(s.borderRadius) || 0; var bg = s.backgroundColor; return r >= 16 && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'; } },
        { name: 'La carte flotte grâce à une ombre douce', help: "box-shadow: 0 <dy> <flou> rgba(…, faible) ; évite les ombres noires dures.",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.carte')); return s.boxShadow !== 'none' && /rgba?\(/.test(s.boxShadow); } },
        { name: 'Le contenu respire (padding ≥ 16px)', help: "padding: 16px ou plus sur .carte pour décoller le contenu des bords.",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.carte')); var p = parseFloat(s.paddingTop) || 0; var q = parseFloat(s.paddingLeft) || 0; return p >= 16 && q >= 16; } },
        { name: 'Le prix ressort : graisse forte et couleur dédiée', help: ".prix { font-weight: 700+; color: une couleur d'accent, pas le gris/noir par défaut. }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.prix')); var w = parseInt(s.fontWeight, 10) || 400; var col = s.color; return w >= 700 && col !== 'rgb(0, 0, 0)' && col !== 'rgb(25, 25, 25)'; } },
        { name: 'Le bouton invite au clic (fond, radius, curseur)', help: "button { background: …; border: none; border-radius: 999px; cursor: pointer; }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('button')); var r = parseFloat(s.borderTopLeftRadius) || parseFloat(s.borderRadius) || 0; var bg = s.backgroundColor; return r >= 12 && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && s.cursor === 'pointer' && s.borderTopStyle === 'none'; } }
      ],
      hints: [
        "Commence par la carte elle-même : `background:#fff; border-radius:18px; padding:22px;`. Regarde l'aperçu : elle doit déjà respirer.",
        "L'ombre douce : `box-shadow: 0 10px 26px rgba(80, 55, 10, .12);` — un décalage vertical, un flou large, une couleur assombrie réduite en alpha. Jamais de noir plein.",
        "Prix et bouton : `.prix { font-weight:800; color:#b8860b; }` puis un bouton pilule : `border-radius:999px; border:none; background:#b8860b; color:#fff; cursor:pointer; padding:10px 18px;`."
      ],
      solution: {
        lang: 'css', label: 'styles.css — solution commentée',
        code:
`/* La carte : fond clair, coins généreux, ombre douce, air */
.carte {
  background: #ffffff;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 10px 26px rgba(80, 55, 10, .12);
  max-width: 320px;
}

/* Le visuel-placeholder reçoit une touche de couleur (bonus) */
.visuel {
  background: #f5eedd;
  color: #8a7146;
  border-radius: 14px;
  padding: 30px 14px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 14px;
}

h2 { font-size: 19px; margin: 0 0 6px; }

/* Le prix : l'information n° 1, traitée comme telle */
.prix {
  font-weight: 800;
  font-size: 18px;
  color: #b8860b;
  margin: 0 0 8px;
}

.desc { color: #6c6250; font-size: 14px; line-height: 1.6; margin: 0 0 14px; }

/* Le bouton : plein, pilule, curseur explicite */
button {
  font: inherit;
  font-weight: 700;
  background: #b8860b;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 11px 20px;
  cursor: pointer;
}`,
        explain: "Relis le code : chaque règle répond à une intention. La **carte** pose trois fondamentaux visuels : le fond (séparer du décor), le rayon (adoucir, c'est la signature « premium »), l'ombre (soulever). Une ombre crédible n'est jamais noire : elle reprend une couleur chaude de l'environnement, très diluée (`rgba(80, 55, 10, .12)`), avec un flou d'environ 2,5 fois le décalage vertical.\n\nLe **prix** gagne sa hiérarchie par deux leviers seulement — graisse et couleur — et c'est suffisant : multiplier les artifices (taille + couleur + encadré + souligné) tue la hiérarchie. Enfin, le **bouton** communique sa cliquabilité par trois signaux : le fond plein (affordance visuelle), le `cursor: pointer` (affordance souris) et les coins pilule (convention tactile). Garde ces gestes : tu les réécriras toute ta carrière."
      },
      criteria: [
        "La carte est clairement délimitée : fond, coins ≥ 16px, ombre visible mais douce.",
        "Le contenu ne touche jamais les bords (padding ≥ 16px).",
        "Le prix saute aux yeux : graisse ≥ 700, couleur d'accent.",
        "Le bouton est évidemment cliquable (fond plein, radius, pointer).",
        "Aucune modification du HTML ni style en ligne."
      ],
      variants: [
        "Ajoute un effet `hover` : la carte se soulève (`transform: translateY(-3px)`) avec ombre renforcée, le tout `transition: .3s`.",
        "Déclare une palette en variables CSS (`:root { --accent: #b8860b; }`) et remplace toutes les occurrences.",
        "Crée une variante `.carte--promo` avec un ruban « −15 % » en `::before` positionné."
      ],
      related: ['css-box-model', 'css-unites-couleurs', 'css-syntaxe-selecteurs']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-css-boutons-momo',
      level: 'fonda',
      title: 'Les boutons d\u2019action MTN MoMo',
      icon: 'touch_app',
      free: false,
      minutes: 25,
      kind: 'dom',
      context: "Une fintech de Cotonou harmonise ses écrans de paiement MTN MoMo. Aujourd'hui, chaque développeur style ses boutons à sa sauce : le design system impose désormais une classe de base `.btn` et ses variantes.",
      statement: "Tu vas construire la brique la plus réutilisée d'un design system : le bouton. Le HTML fournit deux boutons : `.btn.btn-principal` (« Payer ») et `.btn.btn-secondaire` (« Annuler »).\n\nAttendus : la classe **`.btn`** porte tout ce qui est commun — `font: inherit`, graisse, `padding` confortable (au moins 10px en vertical), `border-radius` ≥ 12px, `border: none`, `cursor: pointer`, et une **`transition`** douce pour les états futurs. La variante **`.btn-principal`** impose le jaune MTN (`#ffc400`) sur texte sombre ; la variante **`.btn-secondaire`** joue la discrétion (fond clair, texte standard), clairement **différente** du principal : à aucun moment l'utilisateur ne doit confondre l'action coûteuse et la porte de sortie.\n\nC'est la leçon d'architecture CSS la plus rentable qui soit : **le commun sur la base, le spécifique sur les variantes**. Zéro duplication.",
      constraints: [
        "`.btn` définit padding (≥ 10px vertical), radius (≥ 12px), `border: none`, `cursor: pointer`, `font: inherit` et une `transition`.",
        "Les variantes ne répètent AUCUNE de ces propriétés : elles ne déclarent que couleurs (et éventuelle bordure).",
        "`.btn-principal` : fond `#ffc400`, texte suffisamment sombre pour le contraste.",
        "`.btn-secondaire` : fond visiblement différent du principal.",
        "Ajoute un état `:hover` (léger assombrissement ou élévation) et `:active` (`transform: scale(.97)`) sur `.btn`."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="ecran">
  <h1>Confirmer le paiement</h1>
  <p>15 000 FCFA vers « Boutique Sènan » — commission 100 FCFA.</p>
  <div class="actions">
    <button type="button" class="btn btn-principal">Payer 15 100 FCFA</button>
    <button type="button" class="btn btn-secondaire">Annuler</button>
  </div>
</main>` },
        { key: 'css', label: 'base.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #fbf6df; }
.ecran { background: #fff; border-radius: 22px; padding: 26px 30px; max-width: 400px;
  box-shadow: 0 12px 30px rgba(120, 90, 0, .12); text-align: center; }
h1 { font-size: 20px; margin: 0 0 6px; }
p { color: #6c6250; font-size: 14px; margin: 0 0 18px; }
.actions { display: grid; gap: 10px; }` },
        { key: 'css2', label: 'design-system.css', lang: 'css', editable: true, code:
`/* Fichier du design system — la seule chose que tu livres :
   .btn (le commun), .btn-principal et .btn-secondaire (les variantes),
   puis les états :hover / :active sur la base. */

` }
      ],
      tests: [
        { name: 'La base .btn est confortable : padding ≥ 10px et radius ≥ 12px', help: ".btn { padding: 12px 20px; border-radius: 12px; } — la zone de touche compte.",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.btn')); return (parseFloat(s.paddingTop) || parseFloat(s.padding) || 0) >= 10 && (parseFloat(s.borderTopLeftRadius) || parseFloat(s.borderRadius) || 0) >= 12; } },
        { name: 'La base .btn est interactive : curseur pointer, sans bordure, transition douce', help: "cursor: pointer; border: none; transition: … .2s; sur .btn (pas sur les variantes).",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.btn')); var dur = parseFloat(s.transitionDuration) || 0; var tr = String(s.transition || ''); return s.cursor === 'pointer' && s.borderTopStyle === 'none' && (dur > 0 || /[\d.]+s\b/.test(tr)); } },
        { name: 'Le principal est jaune MTN avec texte sombre', help: ".btn-principal { background: #ffc400; color: #3d2e00 (ou proche) ; }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.btn-principal')); return s.backgroundColor === 'rgb(255, 196, 0)'; } },
        { name: 'Le secondaire est clairement distinct du principal', help: "Un fond différent (clair, grisé…) : l'utilisateur ne doit pas pouvoir confondre Payer et Annuler.",
          check: function (doc, win) { var p = win.getComputedStyle(doc.querySelector('.btn-principal')); var sec = win.getComputedStyle(doc.querySelector('.btn-secondaire')); return sec.backgroundColor !== p.backgroundColor; } },
        { name: 'La base ne fuite pas de couleur : les variantes ne redéclarent que des couleurs', help: "Ouvre ton fichier : les règles de variante ne doivent contenir ni padding, ni radius, ni cursor — sinon c'est du code à remonter dans .btn.",
          check: function (doc, win) { var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent; var variantes = css.match(/\.btn-(principal|secondaire)\s*\{[^}]*\}/g) || []; if (!variantes.length) return false; var ok = true; variantes.forEach(function (v) { if (/(padding|border-radius|cursor|font)\s*:/.test(v)) ok = false; }); return ok; } }
      ],
      hints: [
        "Écris `.btn` d'abord, comme si c'était le bouton par défaut de l'entreprise : `padding: 12px 22px; border: none; border-radius: 14px; font: inherit; font-weight: 700; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s;`.",
        "Puis les variantes, ultra courtes : `.btn-principal { background: #ffc400; color: #3d2e00; }` et `.btn-secondaire { background: #f3ecce; color: #6b5b3e; }`. Si tu répètes quoi que ce soit de la base, arrête-toi : c'est le signal.",
        "Termine par les états sur la base : `.btn:hover { box-shadow: 0 6px 16px rgba(120,90,0,.18); }` et `.btn:active { transform: scale(.97); }`. Comme ils sont sur `.btn`, les deux variantes en profitent gratuitement."
      ],
      solution: {
        lang: 'css', label: 'design-system.css — solution commentée',
        code:
`/* ===== BASE : tout ce qui est commun aux boutons ===== */
.btn {
  font: inherit;              /* hérite de la police de la page */
  font-weight: 700;
  padding: 12px 22px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s, background .2s;
}

/* États communs : déclarés une fois, profitent aux deux variantes */
.btn:hover { box-shadow: 0 6px 16px rgba(120, 90, 0, .18); }
.btn:active { transform: scale(.97); }

/* ===== VARIANTES : couleurs uniquement ===== */
.btn-principal {
  background: #ffc400;        /* jaune MTN */
  color: #3d2e00;             /* contraste AA sur jaune */
}

.btn-secondaire {
  background: #f3ecce;
  color: #6b5b3e;
}`,
        explain: "La valeur de cet exercice est architecturale. En déclarant padding, radius, curseur et transition **une seule fois** sur `.btn`, tu obtiens trois garanties : la cohérence (tous les boutons de l'application se ressemblent), la maintenance (changer le rayon d'angle = une ligne), et l'économie (chaque nouvelle variante = deux déclarations). Les variantes ne parlent que de couleurs : c'est leur seule différence pertinente.\n\nL'état `:active { transform: scale(.97) }` est la micro-interaction signature d'iOS : un léger « enfoncement » qui confirme le toucher. Et puisque la `transition` vit sur `.btn`, elle anime gratuitement tous les états de toutes les variantes — c'est l'effet de levier d'une bonne base. Le choix du texte sombre sur jaune n'est pas esthétique : `#ffc400` est très lumineux, un texte blanc y serait illisible et le contraste échouerait aux audits d'accessibilité."
      },
      criteria: [
        "`.btn` centralise tout le commun ; les variantes ne contiennent que des couleurs.",
        "Principal jaune MTN lisible ; secondaire visuellement subordonné.",
        "Padding ≥ 10px, radius ≥ 12px, curseur pointer, transition active.",
        "`hover` et `active` réagissent sur les deux boutons sans re-déclaration.",
        "Le rendu est propre dans l'aperçu, sur mobile comme sur desktop."
      ],
      variants: [
        "Ajoute `.btn-danger` (suppression de bénéficiaire) toujours en 3 lignes, et `.btn:disabled` (opacité + `cursor: not-allowed`).",
        "Ajoute un état `:focus-visible` avec anneau (`outline` ou `box-shadow` annulaire) pour la navigation clavier.",
        "Extrais les couleurs en variables CSS et produis un thème sombre basculant `data-theme` sur `html`."
      ],
      related: ['css-syntaxe-selecteurs', 'css-cascade-specificite', 'css-transitions-animations']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-css-grille-etal',
      level: 'inter',
      title: 'La grille de l\u2019étal, responsive sans média requête',
      icon: 'grid_view',
      free: false,
      minutes: 35,
      kind: 'dom',
      context: "La boutique « Marché Navi » affiche les produits de l'étal du jour. Sur le téléphone de la vendeuse : une colonne. Sur la tablette du comptoir : deux ou trois. Sur le PC du bureau : quatre. Personne ne veut maintenir des points de rupture pour chaque appareil.",
      statement: "Tu vas mettre en page la liste des produits avec **CSS Grid** et sa combinaison magique : `repeat(auto-fit, minmax(min, 1fr))` — le nombre de colonnes s'adapte tout seul à la largeur disponible, sans une seule media query.\n\nCahier des charges : le conteneur `.grille` devient une grille (`display: grid`) avec des pistes `repeat(auto-fit, minmax(180px, 1fr))` et un `gap` d'au moins 14px. Les articles ont déjà leur style. En bonus de soin : le `.visuel` de chaque carte garde des proportions harmonieuses grâce à `aspect-ratio: 4 / 3`, et les cartes s'étirent pour avoir la même hauteur (comportement par défaut de Grid, vérifie-le visuellement).\n\nComprends bien chaque mot de la formule avant d'écrire : `repeat` répète une piste, `auto-fit` choisit combien en fonction de la place, `minmax` borne la largeur d'une colonne, `1fr` distribue le reste. C'est LA ligne de CSS la plus utilisée du e-commerce moderne.",
      constraints: [
        "`.grille` : `display: grid` + `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))` + `gap` ≥ 14px.",
        "Aucune media query pour la grille elle-même (c'est tout l'intérêt).",
        "`.visuel` : `aspect-ratio: 4 / 3` pour des vignettes stables.",
        "Les cartes doivent naturellement partager la même hauteur par ligne (ne casse pas l'étirement par défaut).",
        "Optionnel mais recommandé : `grid-auto-rows: 1fr` si tu remarques des hauteurs inégales."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<h1>L'étal du jour</h1>
<section class="grille">
  <article class="carte"><div class="visuel">gari</div><h2>Gari fin</h2><p class="prix">13 500 F</p></article>
  <article class="carte"><div class="visuel">ignames</div><h2>Ignames</h2><p class="prix">4 200 F</p></article>
  <article class="carte"><div class="visuel">huile</div><h2>Huile rouge</h2><p class="prix">8 500 F</p></article>
  <article class="carte"><div class="visuel">tomates</div><h2>Tomates</h2><p class="prix">6 000 F</p></article>
  <article class="carte"><div class="visuel">piments</div><h2>Piments</h2><p class="prix">1 000 F</p></article>
  <article class="carte"><div class="visuel">arachides</div><h2>Arachides</h2><p class="prix">9 000 F</p></article>
</section>` },
        { key: 'css', label: 'base.css', lang: 'css', editable: false, code:
`body { max-width: 980px; margin: 0 auto; background: #f6f1e7; }
h1 { font-size: 22px; color: #5b3a10; }
.carte { background: #fff; border-radius: 16px; padding: 14px;
  box-shadow: 0 8px 20px rgba(90, 62, 10, .10); }
.visuel { background: linear-gradient(135deg, #efe2bf, #e3d2a5); border-radius: 10px;
  display: grid; place-items: center; font-weight: 700; color: #8a7146; margin-bottom: 10px; }
h2 { font-size: 16px; margin: 0 0 2px; }
.prix { font-weight: 800; color: #b8860b; margin: 0; }` },
        { key: 'css2', label: 'layout.css', lang: 'css', editable: true, code:
`/* Ta mission : .grille en grid auto-adaptative + visuels en aspect-ratio.
   Une seule règle suffit presque — comprends chaque mot de la formule. */

` }
      ],
      tests: [
        { name: 'Le conteneur est une vraie grille CSS', help: ".grille { display: grid; } — vérifie dans l'aperçu que les cartes s'alignent en colonnes.",
          check: function (doc, win) { return win.getComputedStyle(doc.querySelector('.grille')).display === 'grid'; } },
        { name: 'Les colonnes utilisent repeat(auto-fit|auto-fill, minmax)', help: "La formule attendue : grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) ; adapte le 180px si tu veux, mais garde repeat + minmax.",
          check: function (doc) { var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent.replace(/\s+/g, ' '); return /repeat\(\s*auto-(fit|fill)\s*,\s*minmax\(/.test(css); } },
        { name: 'Un espacement régulier (gap ≥ 14px)', help: "gap: 14px ou plus — jamais de marges bricolées sur les cartes (Grid le fait pour toi).",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.grille')); var g = parseFloat(s.gap) || 0; return g >= 14; } },
        { name: 'Les vignettes gardent leurs proportions', help: ".visuel { aspect-ratio: 4 / 3; } — fini les hauteurs au hasard.",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.visuel')); var ar = s.aspectRatio || ''; return ar !== 'auto' && ar !== ''; } },
        { name: 'Résultat : au moins 2 colonnes s\u2019affichent réellement', help: "À la largeur courante de l'aperçu, les pistes calculées doivent montrer plusieurs colonnes.",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.grille')); var cols = s.gridTemplateColumns.split(' ').filter(function (t) { return t.indexOf('px') >= 0; }); var pistes = s.gridTemplateColumns.split(' ').filter(Boolean); return cols.length >= 2 || pistes.length >= 2; } }
      ],
      hints: [
        "La ligne-clef : `.grille { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }`. Écris-la, puis redimensionne ta fenêtre : regarde les colonnes apparaître et disparaître toutes seules.",
        "Décortique : `minmax(180px, 1fr)` = chaque colonne fait AU MOINS 180px et au plus une fraction égale du reste ; `auto-fit` = « mets-en autant que ça tient ». Quand la place manque pour une colonne supplémentaire de 180px, les colonnes restantes s'étirent grâce au `1fr`.",
        "Le visuel : `.visuel { aspect-ratio: 4 / 3; }` — compare avant/après. Et si des cartes d'une même ligne ont des hauteurs différentes, c'est normal : Grid étire par défaut ; `align-items` sur la grille contrôle ça si besoin."
      ],
      solution: {
        lang: 'css', label: 'layout.css — solution commentée',
        code:
`/* La grille auto-adaptative : LA formule e-commerce */
.grille {
  display: grid;
  /* Autant de colonnes de min 180px que possible ;
     le 1fr distribue l'espace restant entre elles */
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

/* Hauteurs égales entre lignes (sécurité visuelle) */
.grille { grid-auto-rows: 1fr; }
.grille .carte { display: flex; flex-direction: column; }

/* Vignettes stables : 4/3 quoi qu'il arrive */
.visuel { aspect-ratio: 4 / 3; }`,
        explain: "Cette seule règle remplace des dizaines de lignes de media queries. Le navigateur calcule : « combien de pistes de 180px minimum tiennent dans la largeur courante ? » — il en crée autant (`auto-fit`), puis le `1fr` partage l'espace restant pour que les colonnes remplissent exactement la ligne. Résultat : 1 colonne sur petit téléphone, 2-3 sur tablette, 4-5 sur écran large, **réactif à la largeur réelle du conteneur** et pas à un appareil supposé.\n\nLe `gap` mérite une attention particulière : il remplace proprement les marges entre cartes, sans les effets de bord des marges (fusion, débord de la dernière colonne…). Dès que tu poses des éléments en grille, `gap` est ton seul outil d'espacement interne — les marges redeviennent l'outil d'espacement EXTERNE entre blocs. La solution ajoute `aspect-ratio` pour des vignettes stables : fini les aperçus qui s'effondrent tant que l'image n'est pas chargée."
      },
      criteria: [
        "`display: grid` sur `.grille` avec la formule `repeat(auto-fit, minmax(…, 1fr))`.",
        "`gap` ≥ 14px, aucune marge bricolée sur les cartes.",
        "Les vignettes ont un `aspect-ratio` explicite.",
        "Redimensionner la fenêtre change le nombre de colonnes sans media query.",
        "Les cartes d'une ligne partagent une hauteur harmonieuse."
      ],
      variants: [
        "Fais la une : `.carte:first-child { grid-column: span 2; }` et vérifie son comportement sur petit écran.",
        "Version `auto-fill` : affiche les mêmes cartes et explique la différence de comportement quand la dernière ligne est incomplète.",
        "Ajoute `@media (prefers-reduced-motion: reduce)` et `container queries` (`@container`) pour une carte orientée horizontalement quand la piste dépasse 300px."
      ],
      related: ['css-grid', 'css-responsive', 'css-unites-couleurs']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-css-theme-variables',
      level: 'inter',
      title: 'Le thème clair/sombre de la coopérative',
      icon: 'dark_mode',
      free: false,
      minutes: 40,
      kind: 'dom',
      context: "L'application de suivi des stocks de la coopérative Gari+ s'utilise à 5 h du matin au marché, en plein noir. La dizaine de productrices réclame un mode sombre — mais le site a 40 couleurs écrites en dur partout. Refonte indispensable.",
      statement: "Tu vas architecturer un **thème piloté par variables CSS** : les couleurs sont déclarées une fois dans `:root`, le reste du CSS ne consomme que les variables, et un attribut `data-theme=\"sombre\"` sur `body` en redéfinit certaines pour basculer toute la page d'un coup.\n\nLe HTML fourni contient un bouton `#basculer` déjà branché (JavaScript en lecture seule) qui alterne `data-theme` entre `clair` et `sombre`. Ton travail :\n\n1. `:root` déclare au minimum `--fond`, `--surface`, `--texte`, `--accent` avec les valeurs du thème clair.\n2. `body` (fond, texte) et `.carte` (fond, ombre douce) **consomment** ces variables via `var()` — plus une seule couleur en dur.\n3. `body[data-theme=\"sombre\"]` redéfinit les variables pour le thème sombre : fond très sombre mais pas noir pur (ex. `#16130e`), surface légèrement plus claire, texte quasi blanc.\n4. Une `transition` sur `body` et `.carte` adoucit la bascule.\n\nTeste avec le bouton : la page entière doit basculer instantanément. C'est la preuve que ton thème est bien centralisé.",
      constraints: [
        "Les couleurs vivent dans `:root` (clair) et `body[data-theme=\"sombre\"]` (sombre), nulle part ailleurs.",
        "`body` et `.carte` n'utilisent QUE `var(--…)` pour leurs couleurs et fonds.",
        "Le bouton bascule réellement le thème complet (fond, cartes, textes) sans JavaScript ajouté.",
        "Transition douce (0,3 s) sur `background-color` et `color` de body et `.carte`.",
        "Le thème sombre reste lisible : contraste texte/fond suffisant, pas de noir pur (#000) en fond."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<body data-theme="clair">
<button type="button" id="basculer">Basculer le thème</button>
<main>
  <h1>Stock de la coopérative</h1>
  <article class="carte"><h2>Gari blanc</h2><p><strong>42 sacs</strong> en stock</p></article>
  <article class="carte"><h2>Tapioca</h2><p><strong>18 sacs</strong> en stock</p></article>
</main>
</body>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: true, code:
`/* 1) :root — palette du thème clair (variables)
   2) body / .carte — consomment les variables via var()
   3) body[data-theme="sombre"] — redéfinit la palette
   4) transition douce sur la bascule                               */
` },
        { key: 'js', label: 'theme.js', lang: 'js', editable: false, code:
`// Déjà branché : bascule l'attribut data-theme de <body>.
document.querySelector('#basculer').addEventListener('click', function () {
  var b = document.body;
  b.setAttribute('data-theme', b.getAttribute('data-theme') === 'sombre' ? 'clair' : 'sombre');
});` }
      ],
      tests: [
        { name: 'La palette claire est centralisée dans :root', help: ":root { --fond: …; --surface: …; --texte: …; --accent: …; }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.documentElement); var vars = ['--fond', '--surface', '--texte', '--accent']; var ok = true; vars.forEach(function (v) { if (!s.getPropertyValue(v).trim()) ok = false; }); return ok; } },
        { name: 'body et .carte consomment les variables', help: "Ton CSS : body { background: var(--fond); color: var(--texte); } et .carte { background: var(--surface); }.",
          check: function (doc) { var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent; return /body\s*\{[^}]*var\(--fond\)/.test(css) && /\.carte\s*\{[^}]*var\(--surface\)/.test(css); } },
        { name: 'Le thème sombre redéfinit les mêmes variables', help: "body[data-theme=\"sombre\"] { --fond: #16130e; … } — même nom, autres valeurs.",
          check: function (doc) { var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent; var m = css.match(/body\[data-theme\s*=\s*"sombre"\]\s*\{([^}]*)\}/); return !!m && /--fond\s*:/.test(m[1]) && /--surface\s*:/.test(m[1]) && /--texte\s*:/.test(m[1]); } },
        { name: 'Le bouton bascule réellement les couleurs de la page', help: "Si tout consomme les variables, changer data-theme suffit : clique Basculer et compare le fond avant/après.",
          check: function (doc, win) { var b = doc.querySelector('#basculer'); if (!b) return false; var avant = doc.body.getAttribute('data-theme') || ''; var before = win.getComputedStyle(doc.body).backgroundColor; b.click(); var after = win.getComputedStyle(doc.body).backgroundColor; var basculeAttr = (doc.body.getAttribute('data-theme') || '') !== avant; var couleur = before !== after; b.click(); return couleur || basculeAttr; } },
        { name: 'La bascule est adoucie par une transition', help: "body { transition: background-color .3s, color .3s; } — la transition ne coûte qu'une ligne.",
          check: function (doc, win) { var d = parseFloat(win.getComputedStyle(doc.body).transitionDuration) || 0; var tr = String(win.getComputedStyle(doc.body).transition || ''); return d > 0 || /[\d.]+s\b/.test(tr); } }
      ],
      hints: [
        "Écris la palette du CLAIR d'abord : `:root { --fond: #f6f1e7; --surface: #ffffff; --texte: #3f3418; --accent: #b8860b; }`, puis fais consommer : `body { background: var(--fond); color: var(--texte); }`. Le site doit être inchangé visuellement — preuve que les variables passent bien partout.",
        "Le sombre n'est QUE des redéfinitions : `body[data-theme=\"sombre\"] { --fond: #16130e; --surface: #241f14; --texte: #f2ecdd; --accent: #e0b34d; }`. Comme les éléments lisent `var(--…)`, ils suivent automatiquement la nouvelle valeur — tu ne touches aucune autre règle.",
        "La transition : ajoute `transition: background-color .3s, color .3s;` à `body` ET à `.carte`. Puis clique le bouton et admire."
      ],
      solution: {
        lang: 'css', label: 'styles.css — solution commentée',
        code:
`/* ===== Palette du thème clair (single source of truth) ===== */
:root {
  --fond: #f6f1e7;
  --surface: #ffffff;
  --texte: #3f3418;
  --accent: #b8860b;
}

/* ===== Thème sombre : on redéfinit LES MÊMES jetons ===== */
body[data-theme="sombre"] {
  --fond: #16130e;      /* très sombre, mais pas noir pur */
  --surface: #241f14;
  --texte: #f2ecdd;
  --accent: #e0b34d;
}

/* ===== Consommation : plus aucune couleur en dur ===== */
body {
  background: var(--fond);
  color: var(--texte);
  transition: background-color .3s, color .3s;
}

#basculer {
  font: inherit; font-weight: 700;
  background: var(--accent); color: #fff;
  border: none; border-radius: 999px; padding: 9px 18px; cursor: pointer;
  margin-bottom: 16px;
}

main { max-width: 560px; display: grid; gap: 14px; }

.carte {
  background: var(--surface);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 10px 24px rgba(20, 14, 2, .12);
  transition: background-color .3s, color .3s;
}
.carte h2 { margin: 0 0 4px; color: var(--texte); }
.carte strong { color: var(--accent); }`,
        explain: "L'idée force : **les couleurs sont des données, pas du style**. Une fois rangées en variables, elles deviennent swapables : le sélecteur `body[data-theme=\"sombre\"]` est plus spécifique que `:root`, donc ses redéfinitions gagnent uniquement quand l'attribut est là. Comme `body` et `.carte` lisent les variables avec `var()`, basculer l'attribut suffit à repeindre toute la page — le JavaScript n'a qu'à changer un attribut, il ne connaît aucune couleur.\n\nDeux raffinements de pro. Le fond sombre évite le noir pur : un `#16130e` chaud fatigue moins l'œil et conserve l'identité visuelle. Et la `transition` est posée sur les propriétés qui changent (`background-color`, `color`), pas sur `all` — cibler ce qui bouge évite les animations surprises quand la mise en page évoluera. Demain, le même mécanisme portera un troisième thème ou `prefers-color-scheme` sans réécrire une seule règle de composant."
      },
      criteria: [
        "Toutes les couleurs passent par des variables dans `:root`.",
        "Le thème sombre est une pure redéfinition de variables (zéro règle de composant dupliquée).",
        "Le bouton bascule la page entière, instantanément et sans JavaScript ajouté.",
        "La transition adoucit la bascule sur body et cartes.",
        "Lisibilité préservée dans les deux thèmes (contraste, pas de noir pur)."
      ],
      variants: [
        "Ajoute `@media (prefers-color-scheme: dark)` pour le thème sombre automatique, en gardant la priorité au choix manuel.",
        "Ajoute une variable `--radius` et montre comment un « thème compact vs confortable » la modulerait.",
        "Transforme l'ombre en variable (`--ombre`) adaptée à chaque thème (plus diffuse en sombre)."
      ],
      related: ['css-variables', 'css-cascade-specificite', 'css-transitions-animations']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-css-dashboard-tontine',
      level: 'projet',
      title: 'Projet : le tableau de bord « Tontine+ »',
      icon: 'dashboard',
      free: false,
      minutes: 70,
      kind: 'dom',
      context: "La startup béninoise Tontine+ digitalise les tontines de quartier. L'écran central — le tableau de bord de la trésorière — a été maquetté sur Figma : barre latérale collante, statistiques en grille, effet verre dépoli (glassmorphism) sur la barre du haut. Le HTML est livré ; c'est ton CSS qui doit tout faire vivre.",
      statement: "Tu stylises un tableau de bord complet (HTML fourni, riche en classes) pour atteindre la qualité « iOS premium ». Cahier des charges :\n\n1. **Structure** : `.corps` est une grille à deux colonnes (barre latérale `220px` fixe + contenu fluide) ; la `.nav-laterale` reste **collante** (`position: sticky` avec un `top`) pendant le défilement.\n2. **Verre dépoli** : la `.barre` du haut est sticky également, avec `backdrop-filter: blur()` et un fond translucide (`rgba` avec alpha < 1) — le contenu défile derrière, flouté.\n3. **Statistiques** : `.stats` est une grille auto-adaptative (`repeat(auto-fit, minmax(180px, 1fr))`, gap ≥ 14px) ; chaque `.stat` est une carte (fond, radius ≥ 16px, padding, ombre douce) avec sa valeur en gros et fort.\n4. **Table** : la `.tableau` reçoit un habillage carte et des lignes aérées (padding ≥ 10px, séparateurs fins).\n5. **Responsive** : en dessous de `760px`, tout passe en une colonne (la nav devient horizontale en haut ou disparaît au profit du contenu) via media query.\n\nToutes les valeurs hexadécimales te sont libres, mais sois cohérent : une vraie palette, pas un arc-en-ciel. Travaille l'aperçu jusqu'à ce qu'il donne envie d'y toucher.",
      constraints: [
        "`.corps` en `display: grid` avec une colonne latérale fixe (~220px) + `1fr` pour le contenu.",
        "`.nav-laterale` et `.barre` : `position: sticky` opérationnel (top explicite).",
        "`.barre` : `backdrop-filter: blur(14px)` (ou plus) ET fond `rgba(...)` translucide.",
        "`.stats` : grille `auto-fit` + `minmax` ; `.stat` : radius ≥ 16px, padding, ombre, valeur en `font-weight` ≥ 800.",
        "Media query `max-width: 760px` : mise en page une colonne.",
        "Palette cohérente via variables CSS (au moins 4 jetons)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<div class="appli">
  <header class="barre">
    <strong>Tontine+</strong>
    <span class="qui">Trésorière : Awa Mensah</span>
  </header>
  <div class="corps">
    <aside class="nav-laterale">
      <a href="#">Tableau de bord</a>
      <a href="#">Membres</a>
      <a href="#">Cotisations</a>
      <a href="#">Tours de paiement</a>
      <a href="#">Paramètres</a>
    </aside>
    <main class="contenu">
      <h1>Bonjour Awa</h1>
      <section class="stats">
        <article class="stat"><span class="libelle">Cagnotte</span><span class="valeur">412 500 F</span></article>
        <article class="stat"><span class="libelle">Membres actifs</span><span class="valeur">18</span></article>
        <article class="stat"><span class="libelle">Prochaine bénéficiaire</span><span class="valeur">Rebecca A.</span></article>
      </section>
      <section class="tableau">
        <h2>Dernières cotisations</h2>
        <table>
          <thead><tr><th>Membre</th><th>Date</th><th>Montant</th></tr></thead>
          <tbody>
            <tr><td>Aminatou S.</td><td>20/07</td><td>5 000 F</td></tr>
            <tr><td>Soundous B.</td><td>20/07</td><td>5 000 F</td></tr>
            <tr><td>Rebecca A.</td><td>19/07</td><td>5 000 F</td></tr>
            <tr><td>Koffi D.</td><td>18/07</td><td>10 000 F</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</div>` },
        { key: 'css', label: 'base.css', lang: 'css', editable: false, code:
`body { background: #f2f2f7; min-height: 120vh; margin: 0; }
h1 { font-size: 22px; margin: 18px 0 12px; }
h2 { font-size: 16px; margin: 0 0 10px; }
table { border-collapse: collapse; width: 100%; }
a { text-decoration: none; }` },
        { key: 'css2', label: 'dashboard.css', lang: 'css', editable: true, code:
`/* Livrable : variables, barre verre dépoli, grille .corps + nav sticky,
   cartes .stat, tableau, media query 760px. À toi de jouer. */

` }
      ],
      tests: [
        { name: 'La mise en page est une grille à deux colonnes', help: ".corps { display: grid; grid-template-columns: 220px 1fr; }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.corps')); if (s.display !== 'grid') return false; var cols = s.gridTemplateColumns.split(' ').filter(function (t) { return t.indexOf('px') >= 0; }); var pistes = s.gridTemplateColumns.split(' ').filter(Boolean); return cols.length >= 2 || pistes.length >= 2; } },
        { name: 'La navigation latérale reste collante au défilement', help: ".nav-laterale { position: sticky; top: 16px; align-self: start; }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.nav-laterale')); return s.position === 'sticky' && (parseFloat(s.top) || parseFloat(s.top) === 0); } },
        { name: 'La barre du haut est du verre dépoli (sticky + blur + rgba)', help: ".barre { position: sticky; top: 0; backdrop-filter: blur(14px); background: rgba(255,255,255,.66); }",
          check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.barre')); var bf = s.backdropFilter || s.webkitBackdropFilter || 'none'; var bg = s.backgroundColor; var m = bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\)/); var alpha = m ? parseFloat(m[1]) : 1; return s.position === 'sticky' && bf !== 'none' && alpha < 1; } },
        { name: 'Les statistiques forment une grille auto-adaptative de cartes', help: ".stats { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 14px+; } .stat { border-radius: 16px+; padding; box-shadow; }",
          check: function (doc, win) { var stats = doc.querySelector('.stats'); var s = win.getComputedStyle(stats); var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent; var formule = /repeat\(\s*auto-(fit|fill)/.test(css); var carte = win.getComputedStyle(doc.querySelector('.stat')); return s.display === 'grid' && formule && (parseFloat(carte.borderTopLeftRadius) || parseFloat(carte.borderRadius) || 0) >= 16 && carte.boxShadow !== 'none'; } },
        { name: 'Le tableau est aéré et habillé', help: "th/td avec padding ≥ 10px et séparateurs fins ; .tableau en carte (fond, radius, padding).",
          check: function (doc, win) { var td = doc.querySelector('.tableau tbody td'); var s = win.getComputedStyle(td); var zone = win.getComputedStyle(doc.querySelector('.tableau')); return (parseFloat(s.paddingTop) || parseFloat(s.padding) || 0) >= 10 && (parseFloat(zone.borderTopLeftRadius) || parseFloat(zone.borderRadius) || 0) >= 14 && zone.backgroundColor !== 'rgba(0, 0, 0, 0)'; } },
        { name: 'Une media query passe en une colonne sous 760px', help: "@media (max-width: 760px) { .corps { grid-template-columns: 1fr; } … }",
          check: function (doc) { var st = doc.querySelectorAll('style'); var css = st[st.length - 1].textContent.replace(/\s+/g, ' '); return /@media\s*\(max-width:\s*760px\)/.test(css) && /grid-template-columns:\s*1fr/.test(css); } }
      ],
      hints: [
        "Pose d'abord le squelette : `body { margin:0 }`, `.corps { display:grid; grid-template-columns:220px 1fr; gap:18px; padding: 0 18px 30px; }`, `.contenu { min-width: 0; }` (évite les débordements de la table).",
        "La barre verre : `.barre { position: sticky; top: 0; z-index: 10; background: rgba(255,255,255,.66); backdrop-filter: blur(14px) saturate(1.4); }`. Le `z-index` est indispensable : sans lui, le contenu passe PAR-DESSUS ta barre au scroll.",
        "Sticky pour la nav : `position: sticky` ne fonctionne que si l'élément a de la place pour se déplacer — mets `align-self: start` (sinon la grille étire la nav et le sticky ne s'observe pas) et un `top` explicite. Media query finale : `.corps { grid-template-columns: 1fr; }` et la nav en `position: static`."
      ],
      solution: {
        lang: 'css', label: 'dashboard.css — solution commentée',
        code:
`:root {
  --fond: #f2f2f7;
  --surface: #ffffff;
  --texte: #1c1c1e;
  --texte-2: #6c6c70;
  --accent: #0a84ff;
  --radius: 18px;
  --ombre: 0 8px 22px rgba(15, 23, 42, .08);
}

/* ===== Barre haute : verre dépoli collant ===== */
.barre {
  position: sticky;
  top: 0;
  z-index: 10;                                  /* au-dessus du contenu qui défile */
  display: flex; justify-content: space-between; align-items: center;
  padding: 13px 20px;
  background: rgba(255, 255, 255, .66);          /* translucide : sinue à travers */
  -webkit-backdrop-filter: blur(14px) saturate(1.5);
  backdrop-filter: blur(14px) saturate(1.5);     /* le verre dépoli */
  border-bottom: 1px solid rgba(0, 0, 0, .06);
}
.barre .qui { color: var(--texte-2); font-size: 13.5px; }

/* ===== Charpente ===== */
.corps {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px;
  padding: 18px;
  max-width: 1100px;
  margin: 0 auto;
}
.contenu { min-width: 0; }                       /* laisse la table se contracter */

/* ===== Nav latérale collante ===== */
.nav-laterale {
  position: sticky;
  top: 76px;                                     /* sous la barre */
  align-self: start;                             /* NE PAS étirer : le sticky a besoin de marge de manœuvre */
  display: grid; gap: 4px;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px;
  box-shadow: var(--ombre);
}
.nav-laterale a {
  color: var(--texte-2); font-weight: 600; font-size: 14px;
  padding: 9px 12px; border-radius: 12px;
  transition: background .2s, color .2s;
}
.nav-laterale a:hover { background: rgba(10, 132, 255, .1); color: var(--accent); }

/* ===== Statistiques ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}
.stat {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px 18px;
  box-shadow: var(--ombre);
  display: grid; gap: 4px;
}
.stat .libelle { font-size: 12.5px; color: var(--texte-2); font-weight: 600; }
.stat .valeur { font-size: 21px; font-weight: 800; letter-spacing: -0.02em; }

/* ===== Tableau ===== */
.tableau {
  margin-top: 18px;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px 18px;
  box-shadow: var(--ombre);
}
.tableau th, .tableau td { padding: 11px 12px; text-align: left; font-size: 14px; }
.tableau thead th { color: var(--texte-2); font-size: 12.5px; text-transform: uppercase; letter-spacing: .04em; }
.tableau tbody tr { border-top: 1px solid rgba(0, 0, 0, .06); }

/* ===== Responsive ===== */
@media (max-width: 760px) {
  .corps { grid-template-columns: 1fr; }
  .nav-laterale {
    position: static;
    grid-auto-flow: column;
    overflow-x: auto;
  }
}`,
        explain: "Trois mécaniques portent ce projet. La **barre en verre dépoli** combine trois ingrédients indissociables : un fond `rgba` translucide (sinon rien à flouter), le `backdrop-filter` qui dépolit ce qui passe dessous, et un `z-index` qui garantit que le contenu défile bien **derrière**. Oublier l'un des trois et l'effet s'effondre silencieusement.\n\nLe **sticky latéral** illustre le piège le plus documenté de CSS Grid : une grille étire ses enfants par défaut (`stretch`), donc la nav occupait toute la hauteur et n'avait nulle part où « coller ». `align-self: start` la rétracte sur son contenu et libère le ris de manœuvre qui rend `position: sticky` observable. Retiens ce réflexe : « sticky ne marche pas ? vérifie l'étirement du parent. »\n\nEnfin, remarque que le responsive n'a eu besoin que de **deux lignes réelles** (colonne unique + nav statique) : c'est la récompense d'une architecture Grid propre et de contenus fluides. Si ta media query contient 40 lignes, c'est souvent le signe que la base était trop rigide."
      },
      criteria: [
        "Barre sticky en verre dépoli fonctionnelle (blur visible au défilement).",
        "Nav latérale collante qui accompagne le scroll puis cède la place en mobile.",
        "Statistiques auto-adaptatives en cartes premium (radius, ombre, hiérarchie).",
        "Tableau lisible : padding, séparateurs discrets, caps d'en-têtes sobres.",
        "Sous 760px : une colonne, nav horizontale, aucun débordement.",
        "Palette en variables cohérente d'un bout à l'autre."
      ],
      variants: [
        "Ajoute un indicateur d'onglet actif : `.nav-laterale a.actif` (fond accent doux + texte accentué).",
        "Passe tout le dashboard en thème sombre via `body[data-theme]` en recyclant l'exercice précédent.",
        "Anime l'apparition des cartes `.stat` : `@keyframes` fondu + translation, décalées avec `animation-delay` par `:nth-child`."
      ],
      related: ['css-grid', 'css-position', 'css-variables', 'css-responsive']
    }
  ]
};
