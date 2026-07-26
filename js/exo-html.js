/* ============================================================
   exo-html.js — Exercices pratiques : HTML
   Le rendu est testé dans l'iframe sandboxée (voir exo-runner.js).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.html = {
  module: 'html',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-html-fiche-etal',
      level: 'fonda',
      title: 'La fiche produit de l\u2019étal',
      icon: 'sell',
      free: true,
      minutes: 15,
      kind: 'dom',
      context: "Une vendeuse d'ignames de Dantokpa veut mettre son étal en ligne. Son neveu lui a promis une page, mais il n'a livré qu'un texte brut dans un bloc-notes : à toi de le transformer en vrai HTML structuré.",
      statement: "Tu vas baliser la fiche produit « Ignames de Zagnanado » pour que navigateurs, moteurs de recherche et lecteurs d'écran la comprennent.\n\nLa fiche doit contenir : un **titre principal** avec le nom du produit, un paragraphe d'introduction, le prix mis en **valeur forte** (c'est l'information que la cliente cherche en premier), une **liste** d'au moins 3 qualités du produit (ex. « Chair ferme », « Se conserve 3 mois »), et un second paragraphe de conclusion.\n\nTout est affaire de **sémantique** : un seul `h1` par page, `strong` pour l'information essentielle, `ul`/`li` pour une suite d'éléments équivalents. Le style est déjà fourni ; ton seul travail est de choisir les bonnes balises et de bien les imbriquer.",
      constraints: [
        "Exactement **un** `h1` dans la page (le nom du produit).",
        "Le prix est marqué avec `strong` (pas `b` : c'est une information capitale, pas une simple graisse).",
        "Les qualités forment une `ul` avec au moins 3 `li`.",
        "Au moins deux paragraphes `p` distincts, pas de texte nu en vrac dans le body.",
        "Aucun style en ligne, aucune balise de présentation (`font`, `center`…)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!-- Balise cette fiche produit : h1, p, strong, ul/li.
     Texte source de la vendeuse :

     Ignames de Zagnanado
     Récoltées à la main dans les champs de la commune de Zagnanado,
     nos ignames arrivent au marché moins de 48 h après l'arrachage.
     Le sac de 50 kg : 28 000 FCFA (prix au détail possible)

     Nos qualités : Chair ferme et farineuse / Se conserve jusqu'à 3 mois
     / Calibres triés à la main / Livraison possible sur Cotonou

     Retrouvez-nous au grand marché, allée des tubercules, stand 14.
-->

` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #f7f2e8; }
h1 { font-size: 24px; margin: 0 0 8px; color: #5b3a10; }
p { max-width: 52ch; line-height: 1.7; color: #4c4436; }
strong { color: #b8860b; font-size: 1.1em; }
ul { background: #fff; border-radius: 14px; padding: 14px 18px 14px 34px;
  box-shadow: 0 8px 20px rgba(90, 62, 10, .10); max-width: 46ch; }
li { margin: 5px 0; }` }
      ],
      tests: [
        { name: 'La page a exactement un h1 nommant le produit', help: "Un seul titre principal par page : <h1>Ignames de Zagnanado</h1>.",
          check: function (doc) { var h = doc.querySelectorAll('h1'); return h.length === 1 && h[0].textContent.trim().length >= 4; } },
        { name: 'Les qualités sont une liste ul d\u2019au moins 3 li', help: "Une suite d'éléments équivalents = <ul><li>…</li></ul>.",
          check: function (doc) { var uls = doc.querySelectorAll('ul, ol'); if (!uls.length) return false; var ok = false; uls.forEach(function (u) { if (u.querySelectorAll(':scope > li').length >= 3) ok = true; }); return ok; } },
        { name: 'Le prix est mis en valeur avec strong', help: "<strong>28 000 FCFA</strong> à l'intérieur du paragraphe concerné.",
          check: function (doc) { var s = doc.querySelectorAll('strong'); var ok = false; s.forEach(function (el) { if (/\d/.test(el.textContent)) ok = true; }); return ok; } },
        { name: 'Le texte est structuré en paragraphes (au moins 2)', help: "Introduction et conclusion chacune dans un <p>.",
          check: function (doc) { return doc.querySelectorAll('p').length >= 2; } }
      ],
      hints: [
        "Commence par le squelette : `<h1>…</h1>` pour le titre, puis ouvre un premier `<p>` pour l'introduction. Demande-toi pour chaque morceau : « est-ce un titre, un paragraphe, une liste ? » — jamais « comment ça doit rendre ».",
        "La liste : `<ul><li>Chair ferme et farineuse</li><li>…</li></ul>`. Trois à quatre qualités suffisent.",
        "Le prix : il vit dans le deuxième paragraphe, entouré de `<strong>`. Relecture : chaque balise ouverte est-elle bien fermée, dans le bon ordre d'imbrication ?"
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<!-- h1 unique : l'identité de la page -->
<h1>Ignames de Zagnanado</h1>

<!-- Paragraphe d'introduction : qui, quoi, d'où -->
<p>Récoltées à la main dans les champs de la commune de Zagnanado,
nos ignames arrivent au marché moins de 48 h après l'arrachage.
Gage de fraîcheur et de goût.</p>

<!-- Le prix est l'information recherchée en premier : strong le signale -->
<p>Le sac de 50 kg : <strong>28 000 FCFA</strong> (prix au détail possible).</p>

<!-- Une suite d'éléments équivalents = une liste -->
<ul>
  <li>Chair ferme et farineuse</li>
  <li>Se conserve jusqu'à 3 mois</li>
  <li>Calibres triés à la main</li>
  <li>Livraison possible sur Cotonou</li>
</ul>

<!-- Paragraphe de conclusion : où trouver le stand -->
<p>Retrouvez-nous au grand marché, allée des tubercules, stand 14.</p>`,
        explain: "La question à te poser n'est jamais « quelle balise pour que ce soit gros ? » mais « **quelle est la fonction de ce texte ?** ». Le titre identifie la page : `h1`, un seul. Les qualités sont interchangeables et ordonnables sans changer le sens : `ul`. Le prix est l'information que la cliente scanne du regard : `strong` le marque comme important pour les humains ET pour les machines (lecteurs d'écran l'annoncent avec emphase, Google le pondère).\n\nNote ce qui est absent : aucun `br` pour aérer, aucune balise de présentation. L'aération est l'affaire du CSS, déjà fourni. Cette discipline — HTML pour le sens, CSS pour le rendu — est la fondation de tout ce que tu feras ensuite."
      },
      criteria: [
        "Un `h1` unique, placé en tête du contenu.",
        "Le prix en `strong`, dans un paragraphe.",
        "Une liste `ul` de 3+ éléments correctement imbriquée.",
        "Deux paragraphes `p` bien formés, pas de texte en dehors de tout conteneur.",
        "Le code est indenté et toutes les balises sont fermées dans l'ordre."
      ],
      variants: [
        "Ajoute un sous-titre `h2` « Nos engagements » au-dessus de la liste : la hiérarchie des titres doit rester cohérente.",
        "Ajoute une mention « offre limitée » avec `em` et explique-toi la différence d'intonation entre `em` et `strong`.",
        "Entoure toute la fiche d'un `<article>` : qu'est-ce que cela change sémantiquement ?"
      ],
      related: ['html-texte', 'html-listes', 'html-structure']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-html-formulaire-zemidjan',
      level: 'fonda',
      title: 'L\u2019inscription au registre des zémidjans',
      icon: 'how_to_reg',
      free: false,
      minutes: 25,
      kind: 'dom',
      context: "La mairie d'Abomey-Calavi numérise le registre des conducteurs de zémidjan. Le formulaire papier fonctionne bien ; ta version web doit reprendre les mêmes champs, mais avec les bonnes pratiques d'accessibilité dès le départ.",
      statement: "Construis un formulaire d'inscription avec les champs suivants : **nom complet** (texte), **numéro de téléphone** (type `tel`, obligatoire), **commune d'activité** (liste déroulante avec au moins 4 options : Abomey-Calavi, Cotonou, Porto-Novo, Ouidah), **numéro de permis** (texte, obligatoire) et un bouton d'envoi « Enregistrer ».\n\nLe point délicat — et celui sur lequel tu seras évalué — c'est l'**association labels/champs** : chaque champ possède un `id` unique, et chaque `label` pointe dessus avec `for`. Cliquer sur le titre du champ doit placer le curseur dedans. C'est gratuit pour toi et ça change tout sur mobile (zone de touche agrandie) comme pour les lecteurs d'écran.\n\nLe formulaire ne partira nulle part pour l'instant : laisse l'`action` par défaut. On s'occupe ici de la structure, pas du traitement.",
      constraints: [
        "Chaque champ a un `id` unique et un `label` dont le `for` correspond exactement.",
        "`type=\"tel\"` pour le téléphone (ouvre le pavé numérique sur mobile), `type=\"text\"` pour le reste.",
        "Téléphone et permis sont `required` ; le nom aussi (on n'inscrit pas un anonyme).",
        "Le `select` porte un `id`, un `name`, et ses `option` ont des `value` explicites.",
        "Le bouton est `<button type=\"submit\">` à l'intérieur du `form` — pas de `input type=\"button\"` détourné."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!-- Construis le formulaire : form > (label + input/select)… + button.
     Champs : nom complet, téléphone (tel, required),
     commune (select 4 options), numéro de permis (required).
     Règle d'or : chaque champ a un id, chaque label un for identique.
-->

` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #e9f1f8; }
form { background: #fff; border-radius: 20px; padding: 24px 26px; width: min(420px, 92vw);
  box-shadow: 0 10px 26px rgba(10, 60, 110, .12); display: grid; gap: 6px; }
label { font-size: 13px; font-weight: 700; color: #274a6d; margin-top: 8px; }
input, select { font: inherit; padding: 10px 13px; border-radius: 11px;
  border: 1.5px solid #c3d3e2; outline: none; }
input:focus, select:focus { border-color: #1d6fb8; }
button { margin-top: 14px; font: inherit; font-weight: 700; border: none;
  border-radius: 12px; padding: 12px; cursor: pointer; color: #fff; background: #1d6fb8; }` }
      ],
      tests: [
        { name: 'Un form contient un champ texte pour le nom, avec label associé', help: "<label for=\"nom\">Nom complet</label><input id=\"nom\" name=\"nom\" type=\"text\" required>.",
          check: function (doc) { var f = doc.querySelector('form'); if (!f) return false; var inp = f.querySelector('input[type="text"]'); if (!inp || !inp.id) return false; return !!f.querySelector('label[for="' + inp.id + '"]'); } },
        { name: 'Le téléphone est un input type tel et requis', help: "type=\"tel\" ouvre le pavé numérique sur smartphone ; required bloque l'envoi vide.",
          check: function (doc) { var t = doc.querySelector('form input[type="tel"]'); return !!t && t.required; } },
        { name: 'La commune est un select d\u2019au moins 4 options, avec label', help: "<label for=\"commune\">…</label><select id=\"commune\" name=\"commune\">…4+ <option value=\"…\">…",
          check: function (doc) { var f = doc.querySelector('form'); var s = f && f.querySelector('select'); if (!s || !s.id) return false; if (!f.querySelector('label[for="' + s.id + '"]')) return false; return s.querySelectorAll('option').length >= 4; } },
        { name: 'Tous les champs ont un label for correctement rattaché', help: "Pour chaque input/select : un id, et un label dont l'attribut for vaut exactement cet id.",
          check: function (doc) { var f = doc.querySelector('form'); if (!f) return false; var champs = f.querySelectorAll('input, select'); if (champs.length < 3) return false; var ok = true; champs.forEach(function (c) { if (!c.id || !f.querySelector('label[for="' + c.id + '"]')) ok = false; }); return ok; } },
        { name: 'Le bouton d\u2019envoi est un button type submit dans le form', help: "<button type=\"submit\">Enregistrer</button> — c'est lui qui déclenche la soumission native.",
          check: function (doc) { var f = doc.querySelector('form'); var b = f && f.querySelector('button[type="submit"]'); return !!b && b.textContent.trim().length >= 3; } }
      ],
      hints: [
        "Écris d'abord un couple label/champ parfaitement : `<label for=\"tel\">Numéro de téléphone</label>` suivi de `<input id=\"tel\" name=\"tel\" type=\"tel\" required>`. Clique ensuite sur le label dans l'aperçu : si le curseur saute dans le champ, l'association est bonne.",
        "Le select suit la même mécanique : `<label for=\"commune\">Commune d'activité</label>` puis `<select id=\"commune\" name=\"commune\">` avec tes `<option value=\"abomey-calavi\">Abomey-Calavi</option>`, etc.",
        "À la fin, relis chaque champ : id présent ? for identique ? required là où l'énoncé l'exige ? Et le bouton `type=\"submit\"` bien DANS le form."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<form>
  <!-- Le couple label/champ : for pointe sur id, à la lettre près -->
  <label for="nom">Nom complet</label>
  <input id="nom" name="nom" type="text" required autocomplete="name">

  <label for="tel">Numéro de téléphone</label>
  <input id="tel" name="tel" type="tel" required autocomplete="tel"
         placeholder="Ex. 97 00 00 00">

  <label for="commune">Commune d'activité</label>
  <select id="commune" name="commune" required>
    <option value="">— Choisir une commune —</option>
    <option value="abomey-calavi">Abomey-Calavi</option>
    <option value="cotonou">Cotonou</option>
    <option value="porto-novo">Porto-Novo</option>
    <option value="ouidah">Ouidah</option>
  </select>

  <label for="permis">Numéro de permis de conduire</label>
  <input id="permis" name="permis" type="text" required>

  <button type="submit">Enregistrer</button>
</form>`,
        explain: "Deux détails font la différence entre un formulaire « qui a l'air » et un formulaire professionnel. D'abord l'association `for`/`id` : elle relie **sémantiquement** l'étiquette au champ. Cliquer sur l'étiquette active le champ (précieux sur téléphone, où la cible au doigt est petite), et un lecteur d'écran annonce « Numéro de téléphone, champ de saisie » au lieu d'un silence gênant.\n\nEnsuite les types spécialisés : `type=\"tel\"` n'apporte pas de validation magique, mais il fait apparaître le **pavé numérique** sur mobile — à Abomey-Calavi, la mairie sera consultée depuis un téléphone, pas un PC. Enfin, `required` délègue la première validation au navigateur, gratuitement, dans la langue de l'utilisateur. La solution ajoute même `autocomplete` : petites attentions, grande confiance."
      },
      criteria: [
        "Le formulaire contient les 4 champs demandés et le bouton d'envoi.",
        "Chaque champ est cliquable via son label (association for/id exacte).",
        "`type=\"tel\"` sur le téléphone, `required` sur les 3 champs exigés.",
        "Le select a 4 options avec des `value` propres (pas de value vide sur les communes).",
        "Le bouton est un `button type=\"submit\"` à l'intérieur du `form`."
      ],
      variants: [
        "Ajoute un groupe `fieldset`/`legend` « Informations personnelles » vs « Activité » pour structurer le formulaire.",
        "Ajoute un champ « photo du permis » avec `input type=\"file\" accept=\"image/*\"` et son label.",
        "Ajoute `pattern=\"[0-9]{8}\"` sur le téléphone et teste les messages natifs du navigateur."
      ],
      related: ['html-formulaires', 'html-structure', 'html-semantique']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-html-tableau-prix',
      level: 'inter',
      title: 'Le tableau des prix du gari',
      icon: 'table',
      free: false,
      minutes: 30,
      kind: 'dom',
      context: "L'association des grossistes de gari publie chaque lundi les prix par qualité et par conditionnement. Leur affiche manuscrite au marché est illisible sous la pluie : ils veulent un vrai tableau web, lisible aussi par les revendeurs malvoyants.",
      statement: "Les tableaux HTML souffrent d'une mauvaise réputation à cause des mises en page détournées des années 2000 ; pour des **données tabulaires**, c'est au contraire l'outil exact. Tu vas construire le tableau de prix complet et accessible.\n\nStructure attendue : un `table` avec un `caption` (le titre « Prix du gari — semaine du lundi 20 juillet »), un `thead` d'une ligne avec 4 colonnes (Qualité, Sac 50 kg, Sac 25 kg, Kg détail) dont chaque `th` porte `scope=\"col\"`, un `tbody` d'au moins 4 lignes (gari blanc fin, gari jaune fin, gari blanc gros grain, tapioca) où **la première cellule de chaque ligne est un `th scope=\"row\"`**, et un `tfoot` rappelant la source (« Relevé Dantokpa — stand des grossistes », fusionné sur les 4 colonnes avec `colspan`).\n\nPourquoi tant de cérémonie ? Parce qu'un lecteur d'écran annonce « Qualité : gari blanc fin ; Sac 50 kg : 14 000 FCFA » en naviguant de cellule en cellule — uniquement si tes `th` et leurs `scope` sont en place. Le CSS est fourni pour que le résultat soit présentable.",
      constraints: [
        "`caption` est le premier enfant de `table`.",
        "`thead` avec 4 `th scope=\"col\"` exactement.",
        "`tbody` : au moins 4 lignes, chacune démarrant par `th scope=\"row\"` suivi de 3 `td`.",
        "`tfoot` : une ligne, une cellule `colspan=\"4\"`.",
        "Aucun attribut de présentation (`border`, `align`, `cellpadding`) — le style est déjà là."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!-- Construis le tableau : caption, thead (4 th scope="col"),
     tbody (4+ lignes : th scope="row" + 3 td), tfoot (colspan="4").
     Données libres mais réalistes (gari blanc fin, jaune fin,
     blanc gros grain, tapioca…).
-->

` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #fdf6ec; }
table { border-collapse: collapse; background: #fff; border-radius: 16px; overflow: hidden;
  box-shadow: 0 10px 26px rgba(120, 80, 10, .12); width: min(560px, 94vw); }
caption { font-weight: 800; font-size: 17px; padding: 14px; color: #6b4413; text-align: left; }
th, td { padding: 11px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f0e4c8; }
thead th { background: #b8860b; color: #fff; }
tbody th[scope="row"] { font-weight: 700; color: #6b4413; }
tbody tr:nth-child(even) { background: #fbf4e3; }
tfoot td { font-size: 12.5px; color: #8a7146; font-style: italic; }` }
      ],
      tests: [
        { name: 'Le tableau s\u2019ouvre sur un caption', help: "<table><caption>Prix du gari — …</caption> : premier enfant du tableau.",
          check: function (doc) { var t = doc.querySelector('table'); return !!t && t.firstElementChild && t.firstElementChild.tagName === 'CAPTION'; } },
        { name: 'thead contient 4 th avec scope="col"', help: "Chaque en-tête de colonne déclare explicitement sa portée : <th scope=\"col\">.",
          check: function (doc) { var ths = doc.querySelectorAll('table thead th'); if (ths.length !== 4) return false; var ok = true; ths.forEach(function (th) { if (th.getAttribute('scope') !== 'col') ok = false; }); return ok; } },
        { name: 'Chaque ligne du tbody commence par un th scope="row"', help: "La première cellule est l'en-tête DE LA LIGNE : <th scope=\"row\">Gari blanc fin</th> puis des <td>.",
          check: function (doc) { var trs = doc.querySelectorAll('table tbody tr'); if (trs.length < 4) return false; var ok = true; trs.forEach(function (tr) { var th = tr.querySelector('th'); if (!th || th.getAttribute('scope') !== 'row') ok = false; }); return ok; } },
        { name: 'Un tfoot fusionné sur 4 colonnes clôt le tableau', help: "<tfoot><tr><td colspan=\"4\">Relevé Dantokpa…</td></tr></tfoot>.",
          check: function (doc) { var td = doc.querySelector('table tfoot td'); return !!td && td.getAttribute('colspan') === '4'; } }
      ],
      hints: [
        "Squelette : `table > caption + thead + tbody + tfoot`. Écris-le d'abord vide, puis remplis section par section. Un tableau se lit en couches, pas ligne par ligne.",
        "Dans le `thead`, chaque `th` reçoit `scope=\"col\"` : cette cellule est l'en-tête de toute sa colonne. Dans le `tbody`, la première cellule de chaque ligne est un `th scope=\"row\"` — l'en-tête de sa ligne.",
        "Le `tfoot` : `<tr><td colspan=\"4\">Relevé Dantokpa — stand des grossistes</td></tr>`. Vérifie visuellement : la cellule de pied doit s'étaler sur toute la largeur."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<table>
  <!-- Le titre du tableau, premier enfant obligatoire -->
  <caption>Prix du gari — relevé du lundi 20 juillet (Dantokpa)</caption>

  <!-- En-têtes de colonnes : scope="col" relie chaque prix à sa colonne -->
  <thead>
    <tr>
      <th scope="col">Qualité</th>
      <th scope="col">Sac 50 kg</th>
      <th scope="col">Sac 25 kg</th>
      <th scope="col">Kg détail</th>
    </tr>
  </thead>

  <!-- Corps : la QUALITÉ ouvre chaque ligne avec scope="row" -->
  <tbody>
    <tr>
      <th scope="row">Gari blanc fin</th>
      <td>14 000 FCFA</td>
      <td>7 300 FCFA</td>
      <td>320 FCFA</td>
    </tr>
    <tr>
      <th scope="row">Gari jaune fin</th>
      <td>14 500 FCFA</td>
      <td>7 600 FCFA</td>
      <td>340 FCFA</td>
    </tr>
    <tr>
      <th scope="row">Gari blanc gros grain</th>
      <td>13 000 FCFA</td>
      <td>6 800 FCFA</td>
      <td>300 FCFA</td>
    </tr>
    <tr>
      <th scope="row">Tapioca</th>
      <td>15 500 FCFA</td>
      <td>8 100 FCFA</td>
      <td>360 FCFA</td>
    </tr>
  </tbody>

  <!-- Pied : une note sur toute la largeur -->
  <tfoot>
    <tr>
      <td colspan="4">Relevé auprès des grossistes de Dantokpa — prix indicatif hors transport.</td>
    </tr>
  </tfoot>
</table>`,
        explain: "Oui, tout ce formalisme a du sens. `caption` donne un titre **au tableau lui-même** (différent d'un `h3` flottant au-dessus, dont personne ne sait qu'il décrit le tableau). `thead`, `tbody`, `tfoot` découpent la table en régions que le navigateur et les technologies d'assistance indentifient — un lecteur d'écran répète l'en-tête de colonne à chaque changement de ligne, par exemple.\n\nLe couple `scope=\"col\"` / `scope=\"row\"` est le cœur de l'accessibilité tabulaire : il crée les associations cellule ↔ en-tête. Sans lui, entendre « 7 600 FCFA » isolément ne dit ni la qualité ni le conditionnement. Quant au `colspan=\"4\"` du pied, c'est la seule « mise en page » autorisée ici — une fusion de cellule est une donnée structurelle, pas cosmétique."
      },
      criteria: [
        "`caption` en premier enfant, texte daté et localisé.",
        "4 `th scope=\"col\"` dans le `thead`, pas plus, pas moins.",
        "4+ lignes de `tbody` dont la première cellule est `th scope=\"row\"`.",
        "`tfoot` à une cellule fusionnée sur 4 colonnes.",
        "Le tableau reste lisible et correctement stylé sans aucun attribut de présentation."
      ],
      variants: [
        "Ajoute une colonne « Évolution » avec des flèches textuelles (+5 %, −2 %) et une classe CSS pour colorer hausse/baisse.",
        "Tri manuel : duplique le tableau trié par prix croissant et compare la lisibilité de chaque version.",
        "Accessibilité avancée : remplace certains `scope` par des `id`/`headers` sur un tableau à double entrée (prix par ville × qualité)."
      ],
      related: ['html-tableaux', 'html-semantique', 'html-texte']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-html-page-accessible',
      level: 'inter',
      title: 'Une page vraiment accessible',
      icon: 'accessible_forward',
      free: false,
      minutes: 35,
      kind: 'dom',
      context: "L'ONG « Web pour tous » de Cotonou audite les sites des administrations béninoises. Verdict récurrent : des pages en div partout, impossibles à naviguer au clavier. On te confie la refonte de la page d'accueil type pour leur guide de bonnes pratiques.",
      statement: "Tu vas reconstruire une page d'actualité complète en utilisant les **repères sémantiques** (landmarks) et les filets de sécurité de l'accessibilité :\n\n1. Un **lien d'évitement** tout premier (« Aller au contenu ») qui saute directement à la zone principale — indispensable à qui navigue au clavier et ne veut pas traverser 15 liens de menu à chaque page.\n2. Un `header` contenant le logo/nom du site et un `nav` étiqueté (`aria-label`) avec une `ul` de liens.\n3. Un `main` (avec `id=\"contenu\"`, cible du lien d'évitement) contenant un `article` (l'actualité : `h1`, date dans `time`, paragraphes) et un `aside` (« À la une », liens secondaires).\n4. Une `figure` avec `img` (URL libre, `alt` descriptif réel) et `figcaption`.\n5. Un `footer` avec les mentions.\n\nLe rendu visuel est pris en charge ; structure uniquement. Chaque repère réduit le « coût de navigation » des utilisateurs qui ne pilotent pas une souris — c'est-à-dire bien plus de monde qu'on ne le croit.",
      constraints: [
        "Premier élément du corps : `<a class=\"evitement\" href=\"#contenu\">Aller au contenu</a>`, et `main` porte bien `id=\"contenu\"`.",
        "`nav` avec `aria-label=\"Navigation principale\"` et une liste `ul` pour les liens.",
        "Hiérarchie unique : `header`, `main`, `footer` en enfants directs du body ; `article` et `aside` dans `main`.",
        "`figure > img + figcaption`, avec un `alt` qui décrit réellement l'image (pas « image1.jpg »).",
        "La date de l'article est dans un `<time datetime=\"…\">`."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!-- Reconstruis la page : lien d'évitement, header (+nav aria-label),
     main#contenu (article : h1, time, figure>img+figcaption, p… ; aside),
     footer. Textes libres sur le thème « Le marché de Dantokpa se modernise ».
-->

` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { max-width: 780px; margin: 0 auto; background: #f4f4f8; }
.evitement { position: absolute; left: -9999px; background: #222; color: #fff;
  padding: 8px 14px; border-radius: 8px; z-index: 10; }
.evitement:focus { left: 10px; top: 10px; }
header { display: flex; justify-content: space-between; align-items: center; gap: 14px;
  background: #1d3557; color: #fff; padding: 14px 18px; border-radius: 14px; flex-wrap: wrap; }
nav ul { display: flex; gap: 14px; list-style: none; margin: 0; padding: 0; }
nav a { color: #ffd60a; font-size: 14px; }
main { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin: 16px 0; }
@media (max-width: 560px) { main { grid-template-columns: 1fr; } }
article, aside { background: #fff; border-radius: 14px; padding: 18px;
  box-shadow: 0 8px 20px rgba(20, 30, 60, .08); }
figure { margin: 12px 0; } figcaption { font-size: 12.5px; color: #666; margin-top: 6px; }
footer { font-size: 12.5px; color: #666; padding: 10px 4px 20px; }` },
        { key: 'js', label: 'a11y-check.js', lang: 'js', editable: false, code:
`// Rien à coder ici : l'exercice évalue uniquement ta structure HTML.` }
      ],
      tests: [
        { name: 'Un lien d\u2019évitement ouvre la page et cible #contenu', help: "Le TOUT PREMIER élément cliquable : <a class=\"evitement\" href=\"#contenu\">Aller au contenu</a> ; et <main id=\"contenu\"> existe.",
          check: function (doc) { var a = doc.body.querySelector('a.evitement, a[href="#contenu"]'); if (!a) return false; var main = doc.querySelector('main#contenu'); if (!main) return false; var first = doc.body.firstElementChild; return first === a || (first && first.contains(a)); } },
        { name: 'header contient un nav étiqueté avec une liste de liens', help: "<nav aria-label=\"Navigation principale\"><ul><li><a …>…",
          check: function (doc) { var nav = doc.querySelector('header nav'); return !!nav && nav.hasAttribute('aria-label') && !!nav.querySelector('ul li a'); } },
        { name: 'main contient un article et un aside', help: "article = contenu autonome (l'actualité) ; aside = complément (À la une). Tous deux dans main.",
          check: function (doc) { var main = doc.querySelector('main'); return !!main && !!main.querySelector('article') && !!main.querySelector('aside'); } },
        { name: 'La figure associe image (alt réel) et légende', help: "<figure><img src=\"…\" alt=\"Les étals du marché au petit matin\"><figcaption>…</figcaption></figure>.",
          check: function (doc) { var fig = doc.querySelector('figure'); if (!fig) return false; var img = fig.querySelector('img'); var cap = fig.querySelector('figcaption'); if (!img || !cap) return false; var alt = (img.getAttribute('alt') || '').trim(); return alt.length >= 12 && !/\.(jpe?g|png|gif|webp|svg)$/i.test(alt); } },
        { name: 'La date est un time avec datetime', help: "<time datetime=\"2026-07-20\">20 juillet 2026</time> : lisible par l'humain ET par la machine.",
          check: function (doc) { var t = doc.querySelector('article time'); return !!t && /^\d{4}-\d{2}-\d{2}/.test(t.getAttribute('datetime') || ''); } },
        { name: 'Un footer avec mentions ferme la page', help: "<footer> en enfant direct du body, avec mentions ou contact.",
          check: function (doc) { var f = doc.body.querySelector(':scope > footer'); return !!f && f.textContent.trim().length >= 8; } }
      ],
      hints: [
        "Commence par le squelette à plat : `a.evitement`, puis `header`, `main#contenu`, `footer` en enfants directs du body. Vérifie dans l'aperçu que la grille apparaît (le CSS attend `article` et `aside` dans `main`).",
        "L'article : `h1` (titre de l'actualité), `<time datetime=\"2026-07-20\">20 juillet 2026</time>`, puis la `figure`. L'`alt` répond à la question : « que manque-t-il si l'image ne s'affiche pas ? »",
        "L'aside : un `h2` « À la une » suffit avec une `ul` de liens. Dernier contrôle : appuie sur Tab dans l'aperçu (environnement réel) — le lien d'évitement doit apparaître en premier."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<!-- 1. Lien d'évitement : premier élément focusable de la page -->
<a class="evitement" href="#contenu">Aller au contenu</a>

<!-- 2. En-tête du site + navigation étiquetée -->
<header>
  <strong>Dantokpa Infos</strong>
  <nav aria-label="Navigation principale">
    <ul>
      <li><a href="#contenu">Accueil</a></li>
      <li><a href="#contenu">Marchés</a></li>
      <li><a href="#contenu">Transport</a></li>
    </ul>
  </nav>
</header>

<!-- 3. Contenu principal, cible du lien d'évitement -->
<main id="contenu">
  <article>
    <h1>Le marché de Dantokpa se modernise</h1>
    <p><time datetime="2026-07-20">20 juillet 2026</time> — Cotonou.</p>

    <figure>
      <img src="https://placehold.co/600x260" alt="Les allées couvertes du marché de Dantokpa au petit matin, étals déjà remplis">
      <figcaption>Les nouvelles allées couvertes, livrées en juin.</figcaption>
    </figure>

    <p>Les travaux de couverture des allées principales transforment
    le quotidien des commerçantes : finis les stocks gâtés par la pluie…</p>
  </article>

  <aside>
    <h2>À la une</h2>
    <ul>
      <li><a href="#contenu">Le prix du gari stabilisé</a></li>
      <li><a href="#contenu">Zémidjans : nouveau stationnement</a></li>
    </ul>
  </aside>
</main>

<!-- 4. Pied de page -->
<footer>
  <p>Dantokpa Infos — Bulletin municipal. Contact : redaction@mairie-cotonou.bj</p>
</footer>`,
        explain: "L'accessibilité n'est pas une couche qu'on ajoute à la fin : c'est la structure elle-même. Chaque repère joue un rôle précis. Le **lien d'évitement** place la destination la plus utile (`#contenu`) à portée de Tab ; il est invisible à la souris mais apparaît dès le premier focus clavier (regarde le CSS fourni : `position:absolute; left:-9999px` puis `:focus` le ramène). Le `nav[aria-label]` annonce « Navigation principale » au lecteur d'écran, qui la distingue d'un éventuel second menu.\n\n`article` vs `aside` tranche une vraie question de sens : ce qui se suffit à lui-même (l'actualité) est un `article` ; ce qui complète (À la une) est un `aside`. Enfin, `time[datetime]` offre une date à double lecture : « 20 juillet 2026 » pour nous, « 2026-07-20 » pour les machines (agendas, moteurs). Total : zéro JavaScript, juste du HTML bien choisi — et la page devient pilotable au clavier et explicite pour tous."
      },
      criteria: [
        "Le lien d'évitement est le premier élément et mène réellement à `#contenu`.",
        "`nav` étiqueté, `article`/`aside` correctement nichés dans `main`.",
        "L'`alt` décrit le contenu de l'image et `figcaption` la commente.",
        "La date utilise `time` avec un `datetime` ISO.",
        "Appuyer sur Tab révèle le lien d'évitement (comportement fourni par le CSS)."
      ],
      variants: [
        "Ajoute `aria-current=\"page\"` sur le lien actif du menu et une section `aria-labelledby` dans l'aside.",
        "Teste la page avec le lecteur d'écran de ton système (VoiceOver/NVDA) et liste 3 annonces qui t'ont surpris.",
        "Ajoute `prefers-reduced-motion` et un contraste renforcé `prefers-contrast` en CSS (BONUS transversal CSS)."
      ],
      related: ['html-semantique', 'html-structure', 'html-images-medias']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-html-site-cooperative',
      level: 'projet',
      title: 'Projet : le site de la coopérative de gari',
      icon: 'storefront',
      free: false,
      minutes: 60,
      kind: 'dom',
      fullDocument: true,
      context: "La coopérative des transformatrices de gari d'Abomey-Calavi veut enfin son site : une seule page, mais complète et professionnelle — produits, équipe, contact. Le livrable sera ouvert depuis WhatsApp par des acheteurs sur téléphone.",
      statement: "Tu vas livrer un **document HTML complet** (de `<!DOCTYPE html>` à `</html>`), pas un simple fragment : c'est ce qui change quand on passe de l'exercice à la vraie vie. Le site « Coopérative Gari+ » tient sur une page, navigable par ancres depuis le menu.\n\nCahier des charges :\n\n- **Tête** : `lang=\"fr\"`, `meta charset`, `meta viewport` avec les attributs attendus, un `title` explicite (« Coopérative Gari+ — Gari de qualité, Abomey-Calavi »), et la meta `description` pour l'aperçu dans les messageries.\n- **Corps** : un `header` avec nom de la coopérative et `nav` pointant vers 4 `section` identifiées : `#produits`, `#savoir-faire`, `#membres`, `#contact`. Chaque section a un `h2`. Le menu doit être le même en haut et en bas de page pour éviter de remonter à la main.\n- **Contenus** : produits en liste (3+), savoir-faire en paragraphes, membres en liste, contact en **formulaire** (nom, téléphone, message) avec labels rattachés.\n- **Pied** : `footer` avec adresse et `small` pour le copyright.\n\nLe CSS s'injecte automatiquement dans ta page (onglet styles.css en lecture seule) : concentre-toi sur un document impeccable. Le test vérifiera notamment que **toutes les ancres du menu mènent quelque part** — l'erreur n° 1 des sites one-page de ce genre.",
      constraints: [
        "Document COMPLET : doctype, `html lang=\"fr\"`, `head` (charset, viewport, title, description), `body`.",
        "4 `section` avec `id` exacts : `produits`, `savoir-faire`, `membres`, `contact` — chacune ouverte par un `h2`.",
        "Tous les liens `href=\"#…\"` (menu haut et bas) pointent vers un id existant.",
        "`meta name=\"viewport\"` avec `width=device-width` ; `title` non vide et localisé.",
        "Formulaire de contact : chaque champ a son label `for`, le bouton est `type=\"submit\"`.",
        "Toute image éventuelle porte un `alt` descriptif."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- charset, viewport, title, description -->
</head>
<body>
  <!-- header (nav) > main (4 sections#…) > nav retour > footer -->
</body>
</html>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { margin: 0; background: #f6f1e7; color: #3f3418; }
header { background: linear-gradient(120deg, #8a5a00, #b8860b); color: #fff;
  padding: 22px 18px; text-align: center; }
nav ul { list-style: none; display: flex; gap: 14px; justify-content: center;
  flex-wrap: wrap; padding: 0; margin: 12px 0 0; }
nav a { color: #fff; font-weight: 700; font-size: 14px; }
main { max-width: 680px; margin: 0 auto; }
section { background: #fff; border-radius: 18px; padding: 20px 22px; margin: 16px 0;
  box-shadow: 0 8px 22px rgba(90, 62, 10, .10); }
h2 { color: #8a5a00; margin-top: 0; }
form { display: grid; gap: 8px; }
label { font-size: 13px; font-weight: 700; }
input, textarea { font: inherit; padding: 10px 12px; border-radius: 10px;
  border: 1.5px solid #ddcfae; }
button { font: inherit; font-weight: 700; background: #8a5a00; color: #fff;
  border: none; border-radius: 12px; padding: 11px; }
footer { text-align: center; padding: 18px; font-size: 13px; }` }
      ],
      tests: [
        { name: 'Document complet : lang="fr", viewport et title renseignés', help: "<html lang=\"fr\"> + <meta name=\"viewport\" content=\"width=device-width, …\"> + un <title> explicite.",
          check: function (doc) { var ok = (doc.documentElement.getAttribute('lang') || '') === 'fr'; var vp = doc.querySelector('meta[name="viewport"]'); ok = ok && !!vp && /width=device-width/.test(vp.getAttribute('content') || ''); return ok && doc.title.trim().length >= 8; } },
        { name: 'Les 4 sections existent avec leur h2', help: "#produits, #savoir-faire, #membres, #contact — chacune portant un h2.",
          check: function (doc) { var ids = ['produits', 'savoir-faire', 'membres', 'contact']; var ok = true; ids.forEach(function (id) { var s = doc.getElementById(id); if (!s || s.tagName !== 'SECTION' || !s.querySelector('h2')) ok = false; }); return ok; } },
        { name: 'Toutes les ancres du menu mènent à une cible réelle', help: "Pour chaque a[href^=\"#\"] : vérifier que document.querySelector(href) trouve un élément. Une ancre morte = ancre vers un id inexistant.",
          check: function (doc) { var links = doc.querySelectorAll('a[href^="#"]'); if (links.length < 4) return false; var ok = true; links.forEach(function (a) { var href = a.getAttribute('href'); if (href.length < 2) { ok = false; return; } try { if (!doc.querySelector(href)) ok = false; } catch (e) { ok = false; } }); return ok; } },
        { name: 'La meta description est présente', help: "<meta name=\"description\" content=\"…\"> : c'est le texte affiché quand le lien est partagé.",
          check: function (doc) { var d = doc.querySelector('meta[name="description"]'); return !!d && (d.getAttribute('content') || '').trim().length >= 20; } },
        { name: 'Le formulaire de contact a labels rattachés et bouton submit', help: "Chaque input/textarea : id + label[for]. Bouton type=\"submit\".",
          check: function (doc) { var f = doc.querySelector('#contact form'); if (!f) return false; var champs = f.querySelectorAll('input, textarea'); if (champs.length < 3) return false; var ok = true; champs.forEach(function (c) { if (!c.id || !f.querySelector('label[for="' + c.id + '"]')) ok = false; }); return ok && !!f.querySelector('button[type="submit"]'); } },
        { name: 'Un footer avec mentions ferme le document', help: "<footer> directement dans body avec adresse et/ou copyright.",
          check: function (doc) { var f = doc.body.querySelector('footer'); return !!f && f.textContent.trim().length >= 10; } }
      ],
      hints: [
        "Écris d'abord le squelette complet vide : doctype, html/head/body, header>nav, main avec les 4 sections (id + h2 seulement), footer. Lance les tests pour valider la charpente AVANT de remplir.",
        "Les ancres : pour chaque `<a href=\"#produits\">`, il faut un `id=\"produits\"` quelque part — même orthographe exacte, accents compris (évite-les dans les id). Duplique le menu dans le footer pour le retour facile.",
        "Le formulaire recyclera le pattern du précédent exercice (label for / id). Le titre et la description : imagine ce qui s'affiche dans Google et dans l'aperçu WhatsApp quand on partage le lien."
      ],
      solution: {
        lang: 'html', label: 'index.html — solution commentée',
        code:
`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <!-- Indispensable mobile : le site sera ouvert depuis WhatsApp -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Coopérative Gari+ — Gari de qualité, Abomey-Calavi</title>
  <meta name="description" content="La coopérative des transformatrices de gari d'Abomey-Calavi : gari blanc et jaune de qualité contrôlée, tapioca, vente en gros et au détail.">
</head>
<body>

  <header>
    <h1>Coopérative Gari+</h1>
    <p>Le gari d'Abomey-Calavi, du champ à votre table</p>
    <nav aria-label="Navigation principale">
      <ul>
        <li><a href="#produits">Nos produits</a></li>
        <li><a href="#savoir-faire">Savoir-faire</a></li>
        <li><a href="#membres">Les membres</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="produits">
      <h2>Nos produits</h2>
      <ul>
        <li>Gari blanc fin — sacs de 25 et 50 kg</li>
        <li>Gari jaune à l'huile rouge — sacs de 25 kg</li>
        <li>Tapioca — sachets de 5 kg</li>
      </ul>
    </section>

    <section id="savoir-faire">
      <h2>Notre savoir-faire</h2>
      <p>De la cueillette du manioc à la torréfaction, chaque étape
      suit le cahier des charges de la coopérative : fermentation
      contrôlée, pressage complet, séchage sur claies propres.</p>
    </section>

    <section id="membres">
      <h2>Les membres</h2>
      <ul>
        <li>Aminatou S. — présidente</li>
        <li>Rebecca A. — trésorière</li>
        <li>Soundous B. — responsable qualité</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <form>
        <label for="nom">Votre nom</label>
        <input id="nom" name="nom" type="text" required>

        <label for="tel">Téléphone</label>
        <input id="tel" name="tel" type="tel" required>

        <label for="message">Votre message</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Envoyer</button>
      </form>
    </section>
  </main>

  <footer>
    <nav aria-label="Pied de page">
      <ul>
        <li><a href="#produits">Produits</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <p>Quartier Tankpè, Abomey-Calavi — Bénin</p>
    <small>&copy; 2026 Coopérative Gari+</small>
  </footer>

</body>
</html>`,
        explain: "Livrer un document complet t'oblige à penser la **tête** autant que le corps. `lang=\"fr\"` choisit la langue de lecture des synthèses vocales et des correcteurs ; la `viewport` dit aux téléphones « ne simule pas un écran de bureau » — sans elle, votre site apparaît minuscule sur le mobile de l'acheteur venu de WhatsApp ; le `title` et la `description` sont votre vitrine dans les résultats et les partages.\n\nLa mécanique one-page repose sur une règle simple et impitoyable : **chaque `#ancre` du menu doit avoir son `id` jumeau**. Le test parcourt tous les liens internes et vérifie leur cible : c'est exactement ce que ferait un utilisateur frustré de cliquer dans le vide. Enfin, note le découpage en `section` titrées (`h2`) sous un `main` : la page reste un plan de document cohérent, pas une succession d'images — et elle fonctionne déjà sans une ligne de JavaScript."
      },
      criteria: [
        "Le document est complet et valide : doctype, lang, charset, viewport, title, description.",
        "4 sections ancrées et titrées, menu fonctionnel en haut ET en bas (aucune ancre morte).",
        "Formulaire de contact complet, labels rattachés, bouton submit.",
        "Le rendu mobile est correct (viewport) et le partage affiche titre + description.",
        "Pied de page avec adresse physique et copyright."
      ],
      variants: [
        "Ajoute une vraie carte produits avec images libres (placehold.co) en `figure`+`figcaption`.",
        "Ajoute les balises Open Graph (`og:title`, `og:description`) et teste l'aperçu de partage.",
        "Lighthouse : audite la page (accessibilité, SEO) dans Chrome DevTools et corrige tout ce qui n'est pas vert."
      ],
      related: ['html-head', 'html-semantique', 'html-liens', 'html-formulaires']
    }
  ]
};
