/* ============================================================
   exo-js.js — Exercices pratiques : JavaScript
   Ateliers « dom » : code exécuté et testé dans un iframe
   sandboxé (voir exo-runner.js).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.js = {
  module: 'js',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-js-compteur-gari',
      level: 'fonda',
      title: 'Le compteur de sacs de gari',
      icon: 'exposure_plus_1',
      free: true,
      minutes: 20,
      kind: 'dom',
      context: "Awa Mensah tient son comptoir de gari à Dantokpa. Entre deux clientes, elle veut compter les sacs vendus depuis son téléphone, sans risque de descendre sous zéro ni de dépasser le stock du jour.",
      statement: "Ta mission : rendre fonctionnel le compteur déjà maquetté. Le HTML et le CSS sont fournis (en lecture seule) — tu n'écris **que le JavaScript**.\n\nLe compteur affiche un nombre dans `#compteur`. Le bouton `#plus` ajoute un sac, le bouton `#moins` en retire un. Deux règles métier, dictées par la réalité du marché : on ne peut pas vendre **moins de 0 sac**, et le stock du jour est limité à **50 sacs**. Quand on bute sur une limite, le compteur ne bouge pas et le paragraphe `#info` affiche un message d'explication (par exemple « Stock épuisé » ou « Impossible de descendre sous zéro ») ; dès que le compteur change à nouveau, le message s'efface.\n\nC'est l'exercice fondateur de toute interface : un **état** (une variable), des **événements** (les clics) et une **mise à jour du DOM** qui reflète l'état. Prends le temps de bien séparer ces trois rôles dans ta tête.",
      constraints: [
        "Ne touche ni au HTML ni au CSS : tout se passe dans l'onglet `script.js`.",
        "Utilise `addEventListener` (jamais d'attribut `onclick`).",
        "Garde la valeur dans une variable JavaScript : le DOM affiche l'état, il ne le stocke pas.",
        "Le compteur reste borné entre **0 et 50** inclus, quoi que fasse l'utilisateur.",
        "`#info` affiche un message quand une limite bloque, et redevient vide au prochain changement réussi."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="carte">
  <h1>Comptoir d'Awa — gari</h1>
  <p class="sous-titre">Sacs vendus aujourd'hui</p>
  <p class="compteur" id="compteur">0</p>
  <p class="info" id="info"></p>
  <div class="actions">
    <button type="button" id="moins">− 1 sac</button>
    <button type="button" id="plus">+ 1 sac</button>
  </div>
</main>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #f5f0e6; }
.carte { background: #fff; border-radius: 22px; padding: 26px 30px; text-align: center;
  box-shadow: 0 12px 30px rgba(90, 62, 10, .12); max-width: 340px; }
h1 { font-size: 19px; margin: 0 0 2px; }
.sous-titre { color: #8a7146; margin: 0 0 10px; font-size: 13px; }
.compteur { font-size: 56px; font-weight: 800; margin: 0; font-variant-numeric: tabular-nums; }
.info { min-height: 20px; color: #c0392b; font-size: 13px; margin: 4px 0 10px; }
.actions { display: flex; gap: 10px; justify-content: center; }
button { font: inherit; font-weight: 700; border: none; border-radius: 999px;
  padding: 10px 18px; cursor: pointer; color: #fff; background: #b8860b; }
button#moins { background: #6b5b3e; }
button:active { transform: scale(.95); }` },
        { key: 'js', label: 'script.js', lang: 'js', editable: true, code:
`// 1. Sélectionne les éléments du DOM dont tu as besoin.
// 2. Déclare une variable d'état : le nombre de sacs vendus.
// 3. Branche les clics sur #plus et #moins.
// 4. Mets à jour #compteur et #info à chaque changement.

` }
      ],
      tests: [
        { name: 'Le bouton + 1 sac incrémente le compteur', help: "Branche un écouteur 'click' sur #plus qui augmente ta variable d'état puis réécrit le texte de #compteur.",
          check: function (doc) { var c = doc.querySelector('#compteur'); var b = doc.querySelector('#plus'); if (!c || !b) return false; b.click(); return parseInt(c.textContent, 10) === 1; } },
        { name: 'Le bouton − 1 sac décrémente le compteur', help: "Même logique pour #moins, en sens inverse.",
          check: function (doc) { var c = doc.querySelector('#compteur'); var b = doc.querySelector('#moins'); if (!c || !b) return false; b.click(); return parseInt(c.textContent, 10) === 0; } },
        { name: 'Impossible de descendre sous zéro (avec message)', help: "Avant de décrémenter, vérifie que la valeur est > 0 ; sinon affiche un message dans #info et ne change pas le compteur.",
          check: function (doc) { var c = doc.querySelector('#compteur'); var i = doc.querySelector('#info'); var b = doc.querySelector('#moins'); if (!c || !b || !i) return false; if (i) i.textContent = ''; b.click(); return parseInt(c.textContent, 10) === 0 && i.textContent.trim().length > 0; } },
        { name: 'Le stock est plafonné à 50 sacs', help: "De même à l'autre borne : si la valeur vaut déjà 50, #plus ne fait plus rien (et #info explique pourquoi).",
          check: function (doc) { var c = doc.querySelector('#compteur'); var b = doc.querySelector('#plus'); if (!c || !b) return false; for (var k = 0; k < 55; k++) b.click(); return parseInt(c.textContent, 10) === 50; } }
      ],
      hints: [
        "Commence par `const compteur = document.querySelector('#compteur')` pour chaque élément : #plus, #moins, #info. Vérifie avec un `console.log` que tes sélections ne sont pas `null`.",
        "Crée une variable `let sacs = 0`. Ajoute un écouteur sur #plus : `sacs = Math.min(50, sacs + 1)` puis `compteur.textContent = sacs`. Math.min et Math.max sont les gardiens de tes bornes.",
        "Pour le message : si `sacs + 1` dépasse 50, écris dans `info.textContent` au lieu d'incrémenter. Sinon, incrémente ET remets `info.textContent = ''`. Réplique le raisonnement pour la borne 0."
      ],
      solution: {
        lang: 'js', label: 'script.js — solution commentée',
        code:
`// --- 1. Sélections : on capture une fois, on réutilise partout ---
const compteur = document.querySelector('#compteur');
const info = document.querySelector('#info');
const btnPlus = document.querySelector('#plus');
const btnMoins = document.querySelector('#moins');

// --- 2. État : UNE seule source de vérité, en mémoire ---
let sacs = 0;
const STOCK_MAX = 50;

// Petite fonction utilitaire : le DOM reflète toujours l'état.
function afficher() {
  compteur.textContent = sacs;
}

btnPlus.addEventListener('click', function () {
  if (sacs >= STOCK_MAX) {
    info.textContent = 'Stock épuisé : 50 sacs maximum aujourd\\'hui.';
    return; // on sort tôt : l'état ne change pas
  }
  sacs = sacs + 1;
  info.textContent = ''; // le changement a réussi : on efface le message
  afficher();
});

btnMoins.addEventListener('click', function () {
  if (sacs <= 0) {
    info.textContent = 'Impossible de descendre sous zéro sac.';
    return;
  }
  sacs = sacs - 1;
  info.textContent = '';
  afficher();
});

afficher(); // état initial affiché (cohérent avec le HTML)`,
        explain: "Le mot d'ordre de cet exercice : **le DOM n'est pas ta base de données**. La valeur vit dans `sacs`, une variable ; `textContent` ne fait que l'afficher. Si tu lisais la valeur depuis le HTML (`parseInt(compteur.textContent)`), tu mélangerais lecture et écriture, et chaque bug d'affichage deviendrait un bug de données.\n\nRemarque aussi le `return` précoce quand une limite est atteinte : c'est le patron « garde-fou ». On traite d'abord le cas d'erreur, puis le chemin heureux reste aligné à gauche, sans `else` imbriqués. Enfin, la fonction `afficher()` centralise l'écriture dans le DOM : le jour où le format change (par exemple afficher « 12 sacs »), tu ne modifies qu'un seul endroit."
      },
      criteria: [
        "Cliquer sur `#plus` augmente l'affichage de 1, cliquer sur `#moins` le diminue de 1.",
        "À 0, `#moins` ne fait plus rien et `#info` affiche un message ; à 50, `#plus` ne fait plus rien avec un message.",
        "Un changement réussi efface le message d'erreur.",
        "La valeur est portée par une variable JavaScript, pas relue depuis le HTML."
      ],
      variants: [
        "Ajoute un bouton « Réinitialiser » qui remet le compteur à 0 et vide le message.",
        "Ajoute un champ nombre « pas » (1, 2, 5…) : les boutons ajoutent/retirent ce pas, toujours bornés entre 0 et 50.",
        "Défi : persiste la valeur dans `localStorage` pour qu'Awa retrouve son compte après rechargement (à tester en local, l'iframe des tests n'a pas de stockage)."
      ],
      related: ['js-dom', 'js-evenements', 'js-variables']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-js-validateur-momo',
      level: 'fonda',
      title: 'Le validateur de numéro MoMo',
      icon: 'pin',
      free: false,
      minutes: 25,
      kind: 'dom',
      context: "Le réseau de zémidjans d'Abomey-Calavi encaisse par MTN Mobile Money. Leur secrétaire recopie les numéros à la main dans un tableur : une erreur de saisie, et l'argent part chez un inconnu. On te demande un contrôle immédiat à la saisie.",
      statement: "On te fournit un formulaire avec un champ `#tel`, un bouton `#verifier` et un paragraphe `#verdict`. À toi d'écrire la logique de validation en JavaScript.\n\nRègles métier (simplifiées pour l'exercice) : un numéro acceptable contient **exactement 8 chiffres** et commence par l'un des préfixes autorisés : `51`, `52`, `53`, `54`, `61`, `66`, `67`, `69`. Au clic sur le bouton, le verdict s'affiche dans `#verdict` avec un message clair (« Numéro valide » ou une explication précise : « 8 chiffres attendus », « Préfixe non autorisé »…) et l'attribut `data-etat` du paragraphe passe à `ok` ou `ko` — c'est ce marqueur qui pilotera plus tard la couleur du message.\n\nBonus de sérieux : la validation se relance aussi **à chaque frappe** (événement `input`), pour corriger l'utilisateur en direct plutôt qu'à la fin.",
      constraints: [
        "Toute la logique dans `script.js` ; HTML et CSS en lecture seule.",
        "Le paragraphe `#verdict` porte `data-etat=\"ok\"` ou `data-etat=\"ko\"` après chaque vérification.",
        "Messages distincts selon la faute : longueur incorrecte ≠ préfixe inconnu — l'utilisateur doit comprendre quoi corriger.",
        "Un seul endroit calcule la validité (écris une fonction `analyser(numero)` qui retourne ce qui va bien).",
        "Bonus `input` : écoute la frappe en plus du clic (déclenche la même fonction)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="carte">
  <h1>Paiement MoMo — zémidjans</h1>
  <label for="tel">Numéro du client</label>
  <div class="ligne">
    <input id="tel" type="tel" inputmode="numeric" placeholder="Ex. 61234567" maxlength="10">
    <button type="button" id="verifier">Vérifier</button>
  </div>
  <p id="verdict" data-etat="">En attente de saisie…</p>
</main>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #fff8e1; }
.carte { background: #fff; border-radius: 22px; padding: 26px 30px; max-width: 380px;
  box-shadow: 0 12px 30px rgba(120, 90, 0, .14); }
h1 { font-size: 19px; margin: 0 0 14px; }
label { font-size: 13px; font-weight: 700; color: #7a6510; }
.ligne { display: flex; gap: 8px; margin: 8px 0 12px; }
input { flex: 1; font: inherit; padding: 10px 14px; border-radius: 12px;
  border: 1.5px solid #d8cfae; outline: none; }
input:focus { border-color: #ffc400; }
button { font: inherit; font-weight: 700; border: none; border-radius: 12px;
  padding: 10px 16px; cursor: pointer; color: #3d2e00; background: #ffc400; }
#verdict { margin: 0; font-size: 14px; font-weight: 600; color: #8a7a40; }
#verdict[data-etat="ok"] { color: #1e7e34; }
#verdict[data-etat="ko"] { color: #b02a37; }` },
        { key: 'js', label: 'script.js', lang: 'js', editable: true, code:
`// Objectif : valider le numéro à la demande (clic) et en direct (frappe).
// Pense à factoriser : une fonction de VÉRIFICATION, une fonction d'AFFICHAGE.

` }
      ],
      tests: [
        { name: 'Un numéro correct (ex. 61234567) est accepté', help: "Vérifie d'abord la longueur (8) puis le préfixe parmi la liste autorisée ; mets data-etat à 'ok'.",
          check: function (doc) { var t = doc.querySelector('#tel'); var b = doc.querySelector('#verifier'); var v = doc.querySelector('#verdict'); if (!t || !b || !v) return false; t.value = '61234567'; b.click(); return v.getAttribute('data-etat') === 'ok'; } },
        { name: 'Un numéro trop court est refusé avec un message de longueur', help: "'61234' (5 chiffres) doit donner data-etat 'ko' et un message qui parle des 8 chiffres attendus.",
          check: function (doc) { var t = doc.querySelector('#tel'); var b = doc.querySelector('#verifier'); var v = doc.querySelector('#verdict'); t.value = '61234'; b.click(); return v.getAttribute('data-etat') === 'ko' && /8|huit|longueur|chiffre/i.test(v.textContent); } },
        { name: 'Un préfixe inconnu est refusé', help: "'42123456' a 8 chiffres mais un mauvais préfixe : data-etat 'ko', message mentionnant le préfixe.",
          check: function (doc) { var t = doc.querySelector('#tel'); var b = doc.querySelector('#verifier'); var v = doc.querySelector('#verdict'); t.value = '42123456'; b.click(); return v.getAttribute('data-etat') === 'ko' && /préfixe|prefixe|operateur|opérateur|opérateur|autoris/i.test(v.textContent); } },
        { name: 'Les lettres sont refusées', help: "Teste avec une expression régulière comme /^\\d{8}$/ pour garantir « que des chiffres ».",
          check: function (doc) { var t = doc.querySelector('#tel'); var b = doc.querySelector('#verifier'); var v = doc.querySelector('#verdict'); t.value = '61abc567'; b.click(); return v.getAttribute('data-etat') === 'ko'; } }
      ],
      hints: [
        "Pose d'abord la fonction qui répond à une seule question : « ce numéro est-il valide, et sinon pourquoi ? ». Signature utile : `analyser(numero)` retourne `{ ok: true }` ou `{ ok: false, message: '…' }`.",
        "Pour la longueur et les chiffres : `/^\\d{8}$/.test(numero)` couvre les deux d'un coup. Pour le préfixe : `const PREFIXES = ['51','52','53','54','61','66','67','69']` puis `PREFIXES.indexOf(numero.slice(0, 2)) !== -1` — ou `PREFIXES.includes(...)`.",
        "Écris ensuite `afficher(resultat)` qui met à jour `verdict.textContent` et `verdict.setAttribute('data-etat', …)`. Branche-la sur le clic ET sur `input` via une petite fonction `verifierChamp()` commune qui lit `tel.value`."
      ],
      solution: {
        lang: 'js', label: 'script.js — solution commentée',
        code:
`const tel = document.querySelector('#tel');
const btn = document.querySelector('#verifier');
const verdict = document.querySelector('#verdict');

const PREFIXES = ['51', '52', '53', '54', '61', '66', '67', '69'];

// Cœur métier : ANAYLSER, sans toucher au DOM.
// Retourne un objet { ok, message } : facile à tester, à réutiliser.
function analyser(numero) {
  const n = numero.trim(); // l'utilisateur colle parfois des espaces
  if (!/^\\d+$/.test(n)) {
    return { ok: false, message: 'Seuls des chiffres sont autorisés (pas de lettres ni d\\'espaces).' };
  }
  if (n.length !== 8) {
    return { ok: false, message: '8 chiffres attendus, tu en as saisi ' + n.length + '.' };
  }
  if (!PREFIXES.includes(n.slice(0, 2))) {
    return { ok: false, message: 'Préfixe ' + n.slice(0, 2) + ' non autorisé. Attendus : ' + PREFIXES.join(', ') + '.' };
  }
  return { ok: true, message: 'Numéro valide — prêt pour l\\'encaissement.' };
}

// Présentation : met à jour le message et le marqueur d'état.
function afficher(resultat) {
  verdict.textContent = resultat.message;
  verdict.setAttribute('data-etat', resultat.ok ? 'ok' : 'ko');
}

// Un point d'entrée unique, branché sur DEUX événements.
function verifierChamp() {
  afficher(analyser(tel.value));
}

btn.addEventListener('click', verifierChamp);
tel.addEventListener('input', verifierChamp); // correction en direct`,
        explain: "L'idée-clé est la **séparation des rôles** : `analyser` ne connaît pas le DOM, elle ne fait que du calcul sur une chaîne ; `afficher` ne connaît pas les règles, elle affiche ce qu'on lui donne. Cette séparation est ce qui te permettra plus tard de réutiliser `analyser` côté serveur ou dans des tests automatisés.\n\nNote l'ordre des contrôles : on commence par le moins cher et le plus discriminant (format général), puis longueur, puis préfixe. Chaque message dit précisément quoi corriger — c'est ça, une interface respectueuse. Enfin, brancher la même fonction sur `click` et `input` coûte une ligne et améliore énormément l'expérience : l'utilisateur n'attend pas le bouton pour savoir."
      },
      criteria: [
        "`61234567` passe en `data-etat=\"ok\"` avec un message de confirmation.",
        "Un numéro d'une mauvaise longueur est refusé avec un message sur les 8 chiffres.",
        "Un préfixe hors liste est refusé avec un message explicite.",
        "Lettres, espaces internes et champ vide sont refusés, sans plantage.",
        "La validation se relance aussi pendant la frappe (événement `input`)."
      ],
      variants: [
        "Accepte les saisies avec espaces de lecture (« 61 23 45 67 ») en nettoyant avant d'analyser.",
        "Colore la bordure du champ en vert/rouge en plus du message (pilote-la avec le même `data-etat`).",
        "Défi : ajoute les préfixes Moov (60, 62, 63, 64, 65, 68) et affiche l'opérateur détecté (« MTN » / « Moov ») dans le verdict."
      ],
      related: ['js-conditions', 'js-types-operateurs', 'js-evenements']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-js-courses-dantokpa',
      level: 'inter',
      title: 'La liste de courses de Dantokpa',
      icon: 'checklist',
      free: false,
      minutes: 35,
      kind: 'dom',
      context: "Une restauratrice de Cotonou part à Dantokpa avec sa liste sur le téléphone. Elle veut ajouter les articles au fil des stands et rayer ceux qu'elle a déjà trouvés — sans recharger la page, tout en direct.",
      statement: "Tu vas construire la logique complète d'une liste dynamique : ajout, suppression individuelle, compteur, vidage global. Le markup fourni contient un formulaire `#ajout` (champ `#article` + bouton), une liste `#liste`, un compteur `#compteur` et un bouton `#tout-effacer`.\n\nComportements attendus : soumettre le formulaire ajoute un `<li>` contenant le texte saisi **et** un bouton `Supprimer` (classe `suppr`) ; un clic sur ce bouton retire sa ligne ; le compteur affiche en permanence « n article(s) » ; le bouton global vide toute la liste. Un champ vide (ou rempli d'espaces) ne doit jamais produire de ligne.\n\nLe point technique sous-jacent : les lignes n'existent pas au chargement, elles naissent dynamiquement. C'est toute la différence entre attacher un écouteur par élément (impossible ici) et la **délégation d'événements** — un seul écouteur sur la liste, qui décide selon la cible du clic. Cet exercice combine formulaire, DOM, tableaux de gestion et délégation : c'est le premier vrai plat complet.",
      constraints: [
        "Empêche le rechargement de la page à la soumission (`preventDefault`).",
        "Ignore les saisies vides ou ne contenant que des espaces (`trim`).",
        "Chaque `<li>` contient le texte dans un `<span>` et un `<button type=\"button\" class=\"suppr\">Supprimer</button>`.",
        "La suppression passe par **un seul écouteur** posé sur `#liste` (délégation), pas un écouteur par bouton.",
        "Le compteur `#compteur` affiche toujours « 0 article », « 1 article », « n articles ».",
        "`#tout-effacer` vide la liste et remet le compteur à zéro."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="carte">
  <h1>Courses de Dantokpa</h1>
  <form id="ajout" autocomplete="off">
    <input id="article" type="text" placeholder="Ex. Gari blanc 25 kg" aria-label="Article">
    <button type="submit">Ajouter</button>
  </form>
  <p id="compteur">0 article</p>
  <ul id="liste"></ul>
  <button type="button" id="tout-effacer" class="danger">Tout effacer</button>
</main>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eef4ee; }
.carte { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(440px, 92vw);
  box-shadow: 0 12px 30px rgba(20, 70, 30, .12); }
h1 { font-size: 19px; margin: 0 0 14px; }
form { display: flex; gap: 8px; }
input { flex: 1; font: inherit; padding: 10px 14px; border-radius: 12px;
  border: 1.5px solid #c4d4c4; outline: none; }
input:focus { border-color: #2e7d32; }
button { font: inherit; font-weight: 700; border: none; border-radius: 12px;
  padding: 10px 16px; cursor: pointer; color: #fff; background: #2e7d32; }
#compteur { font-size: 13px; color: #5c735c; margin: 12px 0 6px; }
ul { list-style: none; margin: 0 0 14px; padding: 0; display: grid; gap: 8px; }
li { display: flex; align-items: center; justify-content: space-between; gap: 10px;
  background: #f1f7f1; border-radius: 12px; padding: 9px 12px; font-size: 14.5px; }
button.suppr { background: #f8d7da; color: #842029; padding: 6px 12px; font-size: 12.5px; }
button.danger { background: #842029; width: 100%; }` },
        { key: 'js', label: 'script.js', lang: 'js', editable: true, code:
`// Additions : écoute la SOUMISSION du formulaire (pas le clic du bouton).
// Suppression : UN écouteur sur #liste (délégation d'événements).
// Compteur : une fonction mettreAJourCompteur() appelée après chaque changement.

` }
      ],
      tests: [
        { name: 'Soumettre le formulaire ajoute une ligne avec le texte saisi', help: "Écoute 'submit' sur #ajout, appelle event.preventDefault(), crée un <li> avec un span contenant article.value.",
          check: function (doc, win) { var f = doc.querySelector('#ajout'); var inp = doc.querySelector('#article'); var ul = doc.querySelector('#liste'); var te = doc.querySelector('#tout-effacer'); if (te) te.click(); if (!f || !inp || !ul) return false; inp.value = 'Huile rouge 5L'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); var li = ul.querySelector('li'); return !!li && /Huile rouge 5L/.test(li.textContent); } },
        { name: 'Le champ est vidé après l\u2019ajout', help: "Pense à remettre article.value = '' (et idéalement le focus) après un ajout réussi.",
          check: function (doc, win) { var f = doc.querySelector('#ajout'); var inp = doc.querySelector('#article'); inp.value = 'Gari jaune'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); return inp.value.trim() === ''; } },
        { name: 'Une saisie vide ne crée aucune ligne', help: "Fais le test value.trim() === '' AVANT de créer le <li>.",
          check: function (doc, win) { var f = doc.querySelector('#ajout'); var inp = doc.querySelector('#article'); var ul = doc.querySelector('#liste'); var te = doc.querySelector('#tout-effacer'); if (te) te.click(); inp.value = '   '; f.dispatchEvent(new win.Event('submit', { cancelable: true })); return ul.querySelectorAll('li').length === 0; } },
        { name: 'Le bouton Supprimer retire sa ligne (délégation)', help: "Un seul écouteur 'click' sur #liste ; dedans, vérifie event.target.closest('.suppr') et retire le <li> parent.",
          check: function (doc, win) { var f = doc.querySelector('#ajout'); var inp = doc.querySelector('#article'); var ul = doc.querySelector('#liste'); var te = doc.querySelector('#tout-effacer'); if (te) te.click(); inp.value = 'A'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); inp.value = 'B'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); var btn = ul.querySelector('li .suppr'); if (!btn) return false; btn.click(); return ul.querySelectorAll('li').length === 1; } },
        { name: 'Le compteur affiche le bon nombre d\u2019articles', help: "Crée une fonction mettreAJourCompteur() qui compte les <li> et gère le pluriel ; appelle-la après chaque opération.",
          check: function (doc, win) { var f = doc.querySelector('#ajout'); var inp = doc.querySelector('#article'); var ul = doc.querySelector('#liste'); var c = doc.querySelector('#compteur'); var te = doc.querySelector('#tout-effacer'); if (te) te.click(); inp.value = 'X'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); inp.value = 'Y'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); inp.value = 'Z'; f.dispatchEvent(new win.Event('submit', { cancelable: true })); return /3\s+articles?/.test(c.textContent); } },
        { name: 'Tout effacer vide la liste et remet le compteur à zéro', help: "Écoute le clic sur #tout-effacer : ul.innerHTML = '' puis mettreAJourCompteur().",
          check: function (doc) { var ul = doc.querySelector('#liste'); var c = doc.querySelector('#compteur'); var t = doc.querySelector('#tout-effacer'); if (!t) return false; t.click(); return ul.querySelectorAll('li').length === 0 && /0\s+article/.test(c.textContent); } }
      ],
      hints: [
        "Formulaire : `form.addEventListener('submit', (e) => { e.preventDefault(); … })`. Sans `preventDefault`, la page se recharge et ta liste disparaît aussitôt — l'erreur classique du débutant.",
        "Construction d'une ligne : `const li = document.createElement('li')` ; à l'intérieur un `<span>` avec `li.querySelector('span').textContent = texte` (textContent, jamais innerHTML avec du texte utilisateur — faille XSS), et un bouton `className = 'suppr'`.",
        "Délégation : `liste.addEventListener('click', (e) => { const btn = e.target.closest('.suppr'); if (btn) btn.closest('li').remove(); })`. Un seul écouteur gère tous les boutons présents ET futurs. Ensuite factorise `mettreAJourCompteur()` et appelle-la partout."
      ],
      solution: {
        lang: 'js', label: 'script.js — solution commentée',
        code:
`const form = document.querySelector('#ajout');
const champ = document.querySelector('#article');
const liste = document.querySelector('#liste');
const compteur = document.querySelector('#compteur');
const toutEffacer = document.querySelector('#tout-effacer');

// Le compteur se recalcule depuis le DOM réel : toujours juste.
function mettreAJourCompteur() {
  const n = liste.querySelectorAll('li').length;
  compteur.textContent = n + ' article' + (n > 1 ? 's' : '');
}

// Ajout : écouter la SOUMISSION couvre le clic ET la touche Entrée.
form.addEventListener('submit', function (e) {
  e.preventDefault(); // sinon : rechargement de page, liste perdue
  const texte = champ.value.trim();
  if (texte === '') return; // jamais de ligne vide

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = texte; // textContent = sûr (pas d'injection HTML)

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'suppr';
  btn.textContent = 'Supprimer';

  li.append(span, btn);
  liste.append(li);

  champ.value = '';
  champ.focus();
  mettreAJourCompteur();
});

// Suppression par DÉLÉGATION : un seul écouteur sur le conteneur,
// qui gère les boutons existants ET ceux créés plus tard.
liste.addEventListener('click', function (e) {
  const btn = e.target.closest('.suppr');
  if (!btn) return; // clic ailleurs dans la liste : rien à faire
  btn.closest('li').remove();
  mettreAJourCompteur();
});

toutEffacer.addEventListener('click', function () {
  liste.innerHTML = '';
  mettreAJourCompteur();
});

mettreAJourCompteur(); // synchronise l'affichage initial`,
        explain: "Trois idées font la valeur de cet exercice. D'abord, **écouter `submit` plutôt que le clic du bouton** : la soumission couvre aussi la touche Entrée dans le champ — un clic, lui, ne la verrait jamais. Ensuite, `preventDefault` : sans lui, le navigateur recharge la page (comportement par défaut d'un formulaire) et tout ton travail s'évapore en une fraction de seconde ; c'est LA cause numéro un des « mon code ne marche pas » chez les débutants.\n\nEnsuite la **délégation d'événements** : les boutons Supprimer n'existent pas au chargement, impossible de leur attacher un écouteur directement. On pose donc l'écouteur sur le parent stable (`#liste`), et au clic on regarde `event.target.closest('.suppr')` — le clic remonte (bouillonne) jusqu'à la liste, et `closest` retrouve le bouton concerné. Un seul écouteur, zéro fuite mémoire, et ça marche pour toutes les lignes futures. Enfin, le compteur est **recalculé depuis le DOM** plutôt que maintenu dans une variable parallèle : une seule source de vérité, zéro désynchronisation."
      },
      criteria: [
        "La touche Entrée comme le clic ajoutent l'article, sans recharger la page.",
        "Le texte est nettoyé (`trim`) et le champ se vide après ajout.",
        "Chaque ligne a son bouton Supprimer fonctionnel, y compris après plusieurs ajouts.",
        "Le compteur est exact à tout moment, au singulier comme au pluriel.",
        "« Tout effacer » réinitialise la liste et le compteur."
      ],
      variants: [
        "Ajoute un état « acheté » : clic sur le texte de l'article barre la ligne (classe CSS) et le compteur affiche « 2/5 trouvés ».",
        "Trie la liste par ordre alphabétique à chaque ajout (`localeCompare`).",
        "Défi : sauvegarde la liste dans `localStorage` et recharge-la à l'ouverture (à tester en local — l'atelier sandboxé n'a pas de stockage)."
      ],
      related: ['js-evenements', 'js-dom', 'js-tableaux']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-js-tontine-calcul',
      level: 'inter',
      title: 'Le calculateur de tontine',
      icon: 'calculate',
      free: false,
      minutes: 30,
      kind: 'dom',
      context: "Le groupe de couturières du quartier Ladji fait une tontine hebdomadaire. La trésorière additionne encore les cotisations à la main dans son cahier — et se trompe quand quelqu'un paie en avance pour deux semaines.",
      statement: "On te donne une zone de saisie `#montants` (un montant par ligne, en francs CFA), un bouton `#calculer` et trois sorties : `#total`, `#moyenne`, `#membres`. À toi d'écrire le moteur de calcul.\n\nComportement attendu : au clic, le script découpe le contenu ligne par ligne, convertit chaque ligne en nombre, **ignore silencieusement** les lignes vides ou non numériques (la trésorière note parfois « Awa (absente) »), puis affiche : le total en FCFA, la moyenne **arrondie au franc le plus proche**, et le nombre de lignes valides sous la forme « n membre(s) ». Aucune ligne valide ? Affiche « 0 » partout sans produire `NaN` ni diviser par zéro.\n\nDerrière cet énoncé simple se cachent les compétences qui font un vrai développeur : transformer du texte sale en données propres (`split`, `map`, `Number`, `filter`), agréger (`reduce`), et formater pour un humain. C'est exactement ce que tu feras avec les réponses d'API demain.",
      constraints: [
        "Découpe sur les retours à la ligne (`split('\\n')` ou `split(/\\r?\\n/)`).",
        "Une ligne est valide si, après `trim`, `Number(ligne)` donne un nombre fini et si la ligne n'est pas vide.",
        "Les lignes invalides sont ignorées — jamais affichées, jamais signalées comme erreur.",
        "La moyenne est un entier arrondi (`Math.round`) ; sans ligne valide, tout affiche 0.",
        "Affiche les montants avec séparateur de milliers si tu veux, mais le nombre doit rester lisible par `parseInt` après nettoyage des non-chiffres."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="carte">
  <h1>Tontine des couturières</h1>
  <label for="montants">Cotisations du jour (une par ligne)</label>
  <textarea id="montants" rows="7" placeholder="5000&#10;2500&#10;Awa (absente)&#10;10000"></textarea>
  <button type="button" id="calculer">Calculer</button>
  <dl class="resultats">
    <div><dt>Total collecté</dt><dd id="total">0</dd></div>
    <div><dt>Cotisation moyenne</dt><dd id="moyenne">0</dd></div>
    <div><dt>Cotisants valides</dt><dd id="membres">0 membre</dd></div>
  </dl>
</main>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #f3eefa; }
.carte { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(460px, 92vw);
  box-shadow: 0 12px 30px rgba(70, 30, 120, .12); }
h1 { font-size: 19px; margin: 0 0 12px; }
label { font-size: 13px; font-weight: 700; color: #5d4a86; }
textarea { width: 100%; font: inherit; font-size: 14px; padding: 10px 14px; margin: 8px 0 12px;
  border-radius: 12px; border: 1.5px solid #d3c6ec; resize: vertical; outline: none; }
textarea:focus { border-color: #6d3cc0; }
button { font: inherit; font-weight: 700; border: none; border-radius: 12px; width: 100%;
  padding: 11px 16px; cursor: pointer; color: #fff; background: #6d3cc0; }
.resultats { margin: 16px 0 0; display: grid; gap: 8px; }
.resultats div { display: flex; justify-content: space-between; background: #f6f1fc;
  border-radius: 10px; padding: 9px 12px; font-size: 14px; }
.resultats dt { color: #5d4a86; } .resultats dd { margin: 0; font-weight: 800; }` },
        { key: 'js', label: 'script.js', lang: 'js', editable: true, code:
`// Pipeline conseillé : texte -> lignes -> nombres valides -> calculs -> affichage.
// Méthodes utiles : split, map, filter, reduce, Math.round.

` }
      ],
      tests: [
        { name: 'Le total est la somme des lignes numériques', help: "split('\\n') → trim → Number → filter les valeurs valides → reduce pour additionner.",
          check: function (doc) { var ta = doc.querySelector('#montants'); var b = doc.querySelector('#calculer'); var t = doc.querySelector('#total'); ta.value = '5000\n2500\n10000'; b.click(); return parseInt(t.textContent.replace(/\D/g, ''), 10) === 17500; } },
        { name: 'Les lignes non numériques sont ignorées', help: "« Awa (absente) » ou une ligne vide ne doivent ni casser le calcul ni compter comme 0 explicite : elles sont simplement écartées.",
          check: function (doc) { var ta = doc.querySelector('#montants'); var b = doc.querySelector('#calculer'); var t = doc.querySelector('#total'); var m = doc.querySelector('#membres'); ta.value = '5000\nAwa (absente)\n\n2500'; b.click(); return parseInt(t.textContent.replace(/\D/g, ''), 10) === 7500 && /2\s+membres?/.test(m.textContent); } },
        { name: 'La moyenne est arrondie à l\u2019entier le plus proche', help: "Math.round(total / nombreValides). 5000 + 2500 + 1000 = 8500 sur 3 → 2833.",
          check: function (doc) { var ta = doc.querySelector('#montants'); var b = doc.querySelector('#calculer'); var m = doc.querySelector('#moyenne'); ta.value = '5000\n2500\n1000'; b.click(); return parseInt(m.textContent.replace(/\D/g, ''), 10) === 2833; } },
        { name: 'Aucune ligne valide → zéro partout, jamais NaN', help: "Protège la division : si le tableau des valides est vide, affiche 0 sans calculer de moyenne.",
          check: function (doc) { var ta = doc.querySelector('#montants'); var b = doc.querySelector('#calculer'); var t = doc.querySelector('#total'); var m = doc.querySelector('#moyenne'); var mb = doc.querySelector('#membres'); ta.value = 'rien\n'; b.click(); return t.textContent.indexOf('NaN') < 0 && m.textContent.indexOf('NaN') < 0 && parseInt(t.textContent.replace(/\D/g, ''), 10) === 0 && /0\s+membre/.test(mb.textContent); } }
      ],
      hints: [
        "Transforme d'abord le texte en tableau propre : `const lignes = ta.value.split('\\n')` puis `.map(l => Number(l.trim()))`. Que devient `Number('')` ? `0`. Et `Number('Awa')` ? `NaN`. C'est le piège : `Number('')` vaut 0, donc filtre aussi les chaînes vides AVANT de convertir.",
        "Filtre en deux temps : `.filter(l => l.trim() !== '')` sur les lignes, PUIS conversion, PUIS `.filter(n => Number.isFinite(n) && n >= 0)`. Middleware propre, données propres.",
        "`total = nombres.reduce((somme, n) => somme + n, 0)`. Pour la moyenne : `nombres.length ? Math.round(total / nombres.length) : 0`. Pour les milliers : `total.toLocaleString('fr-FR')`."
      ],
      solution: {
        lang: 'js', label: 'script.js — solution commentée',
        code:
`const zone = document.querySelector('#montants');
const bouton = document.querySelector('#calculer');
const outTotal = document.querySelector('#total');
const outMoyenne = document.querySelector('#moyenne');
const outMembres = document.querySelector('#membres');

// Texte brut -> tableau de nombres valides.
function extraireMontants(texte) {
  return texte
    .split(/\\r?\\n/)                    // 1) découpe par ligne
    .map(function (l) { return l.trim(); }) // 2) nettoie les espaces
    .filter(function (l) { return l !== ''; }) // 3) écarte les lignes vides
    .map(function (l) { return Number(l); })   // 4) convertit
    .filter(function (n) { return Number.isFinite(n) && n >= 0; }); // 5) garde les vrais nombres
}

function formater(n) {
  return n.toLocaleString('fr-FR'); // 17 500 — lisible pour une humaine
}

bouton.addEventListener('click', function () {
  const montants = extraireMontants(zone.value);
  const total = montants.reduce(function (s, n) { return s + n; }, 0);
  const moyenne = montants.length ? Math.round(total / montants.length) : 0;

  outTotal.textContent = formater(total) + ' FCFA';
  outMoyenne.textContent = formater(moyenne) + ' FCFA';
  outMembres.textContent = montants.length + ' membre' + (montants.length > 1 ? 's' : '');
});`,
        explain: "Cet exercice est une leçon de **pipeline de données** : plutôt qu'une grosse boucle qui fait tout en vrac, on enchaîne des transformations simples et nommables — découper, nettoyer, écarter, convertir, écarter encore. Chaque étape tient en une ligne et se teste mentalement. Le double `filter` n'est pas du gaspillage : il exprime deux règles métier différentes (les lignes vides d'un côté, les contenus non numériques de l'autre).\n\nDeux pièges méritent ta vigilance. `Number('')` retourne `0`, pas `NaN` : sans le filtre des chaînes vides, une ligne blanche serait comptée comme une cotisation de 0 FCFA et ferait baisser la moyenne — un bug silencieux, le pire genre. Et la division : `total / 0` donne `Infinity`, `Math.round(Infinity)` reste `Infinity`. Le petit ternaire sur `montants.length` est le garde-fou indispensable. Enfin, `toLocaleString('fr-FR')` gère le séparateur de milliers proprement : ne réinvente jamais ce formatage à la main."
      },
      criteria: [
        "Le total est la somme exacte des lignes numériques uniquement.",
        "Lignes vides, textes et montants négatifs sont écartés sans bloquer le calcul.",
        "La moyenne est entière, arrondie au plus proche.",
        "Sans ligne valide, l'affichage reste « 0 » partout (jamais `NaN` ni `Infinity`).",
        "Le comptage affiche le nombre de cotisations valides avec le bon pluriel."
      ],
      variants: [
        "Ajoute le montant le plus élevé et le plus bas de la semaine (`Math.max(...nombres)` avec le spread).",
        "Affiche la prochaine bénéficiaire : si chaque semaine a une ligne « membre : montant », trie pour proposer celle qui n'a pas encore reçu.",
        "Défi : autorise les formats « 5.000 » et « 5 000 » en normalisant avant conversion (parsage de nombre localisé)."
      ],
      related: ['js-tableaux', 'js-fonctions', 'js-types-operateurs']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-js-caisse-dantokpa',
      level: 'projet',
      title: 'Projet : la caisse enregistreuse de Dantokpa',
      icon: 'point_of_sale',
      free: false,
      minutes: 75,
      kind: 'dom',
      context: "Un grossiste de Dantokpa veut équiper son comptoir d'une petite caisse tactile : catalogue de produits sur la gauche, ticket de caisse sur la droite, recherche pour retrouver vite un article au milieu de la foule de 11 heures.",
      statement: "C'est ton premier **mini-projet complet** : tu construis une caisse enregistreuse fonctionnelle, de A à Z, en JavaScript vanilla. Le catalogue est fourni dans `script.js` (constante `PRODUITS`, à conserver) — ton travail est de tout faire vivre autour.\n\nFonctionnalités attendues :\n\n1. **Catalogue** : au chargement, affiche chaque produit dans `#catalogue` sous forme de carte (`<article class=\"produit\">`) avec son nom (`<strong>`), son prix et un bouton `Ajouter` portant `data-id` avec l'identifiant du produit.\n2. **Ticket** : un clic sur `Ajouter` insère une ligne dans `#ticket` (`<li>` avec nom + prix). Plusieurs clics sur le même produit créent plusieurs lignes — c'est un ticket, pas un panier groupé.\n3. **Total** : `#total` affiche en permanence la somme des lignes du ticket, formatée avec séparateur de milliers.\n4. **Recherche** : taper dans `#recherche` filtre le catalogue en direct (insensible à la casse) : seules les cartes correspondant au texte restent affichées (`hidden` ou re-render, au choix).\n5. **Annulation** : `#nouvelle-caisse` vide le ticket et remet le total à zéro.\n\nCe projet mobilise tout le module : rendu depuis des données, délégation d'événements, calcul d'agrégat, filtrage texte, état. Prends-le au sérieux, traite-le comme une mission client : code lisible, fonctions courtes, noms qui parlent.",
      constraints: [
        "Ne modifie pas la constante `PRODUITS` fournie.",
        "Rendu du catalogue par `createElement` ou template cloné — pas d'`innerHTML` avec du contenu qui viendrait un jour d'une base de données sans échappement (prends l'habitude propre dès maintenant).",
        "Un seul écouteur de clic sur `#catalogue` pour tous les boutons Ajouter (délégation obligatoire).",
        "Le total est calculé avec `reduce` à partir du tableau d'état `ticket` (jamais relu depuis le DOM).",
        "La recherche filtre sur le nom, insensible à la casse ; vider le champ réaffiche tout.",
        "Tout tient dans `script.js`, sans bibliothèque externe."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code:
`<main class="app">
  <section class="col">
    <h1>Caisse — Dantokpa</h1>
    <input id="recherche" type="search" placeholder="Rechercher un article…" aria-label="Rechercher">
    <div id="catalogue"></div>
  </section>
  <aside class="col ticket-zone">
    <h2>Ticket</h2>
    <ul id="ticket"></ul>
    <p class="ligne-total"><span>Total</span><strong id="total">0 FCFA</strong></p>
    <button type="button" id="nouvelle-caisse">Nouvelle vente</button>
  </aside>
</main>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { background: #f4f1ea; min-height: 95vh; }
.app { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; max-width: 860px; margin: 0 auto; }
@media (max-width: 640px) { .app { grid-template-columns: 1fr; } }
.col { background: #fff; border-radius: 20px; padding: 18px 20px;
  box-shadow: 0 10px 26px rgba(90, 62, 10, .10); }
h1, h2 { font-size: 18px; margin: 0 0 12px; }
#recherche { width: 100%; font: inherit; padding: 10px 14px; border-radius: 12px;
  border: 1.5px solid #ddd3bd; margin-bottom: 12px; outline: none; }
#recherche:focus { border-color: #b8860b; }
#catalogue { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.produit { border: 1px solid #eee5cf; border-radius: 14px; padding: 12px; display: grid; gap: 6px; }
.produit strong { font-size: 14px; }
.produit .prix { font-size: 13px; color: #8a7146; }
.produit button { font: inherit; font-weight: 700; border: none; border-radius: 10px;
  padding: 8px 10px; cursor: pointer; color: #fff; background: #b8860b; }
#ticket { list-style: none; margin: 0 0 12px; padding: 0; display: grid; gap: 6px;
  max-height: 260px; overflow: auto; }
#ticket li { display: flex; justify-content: space-between; gap: 10px; font-size: 13.5px;
  background: #faf6ec; border-radius: 10px; padding: 8px 11px; }
.ligne-total { display: flex; justify-content: space-between; font-size: 15px;
  border-top: 2px dashed #ddd3bd; padding-top: 10px; }
#total { font-variant-numeric: tabular-nums; }
#nouvelle-caisse { width: 100%; font: inherit; font-weight: 700; border: none;
  border-radius: 12px; padding: 11px; cursor: pointer; color: #fff; background: #6b5b3e; }` },
        { key: 'js', label: 'script.js', lang: 'js', editable: true, code:
`// ===== Données fournies par le grossiste — NE PAS MODIFIER =====
const PRODUITS = [
  { id: 'gari', nom: 'Gari blanc 25 kg', prix: 13500 },
  { id: 'huile', nom: 'Huile rouge 5 L', prix: 8500 },
  { id: 'igname', nom: 'Ignames (botte)', prix: 4200 },
  { id: 'tomate', nom: 'Tomates (panier)', prix: 6000 },
  { id: 'piment', nom: 'Piments (sachet)', prix: 1000 },
  { id: 'arachide', nom: 'Arachides 10 kg', prix: 9000 }
];

// ===== État : le ticket est un TABLEAU de produits ajoutés =====
const ticket = [];

// À toi : rendCatalogue(produits), ajouteAuTicket(id), rendTicket(),
// filtre(texte), et les branchements (délégation, input, clic).

` }
      ],
      tests: [
        { name: 'Le catalogue affiche les 6 produits au chargement', help: "Parcours PRODUITS au démarrage et crée une <article class=\"produit\"> par produit dans #catalogue.",
          check: function (doc) { var cat = doc.querySelector('#catalogue'); return !!cat && cat.querySelectorAll('.produit').length === 6; } },
        { name: 'Chaque carte a nom, prix et un bouton Ajouter avec data-id', help: "Le bouton doit porter data-id=\"l'identifiant du produit\" pour savoir quoi ajouter.",
          check: function (doc) { var arts = doc.querySelectorAll('#catalogue .produit'); if (!arts.length) return false; var ok = true; arts.forEach(function (a) { var b = a.querySelector('button[data-id]'); if (!b || !a.querySelector('strong')) ok = false; }); return ok; } },
        { name: 'Cliquer sur Ajouter insère une ligne dans le ticket', help: "Un écouteur DÉLÉGUÉ sur #catalogue : event.target.closest('button[data-id]') → retrouve le produit → push dans ticket → re-rendu.",
          check: function (doc) { var reset = doc.querySelector('#nouvelle-caisse'); if (reset) reset.click(); var b = doc.querySelector('#catalogue .produit button[data-id]'); var ul = doc.querySelector('#ticket'); if (!b || !ul) return false; b.click(); return ul.querySelectorAll('li').length === 1; } },
        { name: 'Le total est la somme exacte des lignes', help: "Additionne avec ticket.reduce((s, p) => s + p.prix, 0) puis formate. Gari (13500) + piments (1000) = 14500.",
          check: function (doc) { var reset = doc.querySelector('#nouvelle-caisse'); var tot = doc.querySelector('#total'); if (!reset || !tot) return false; reset.click(); ['gari', 'piment'].forEach(function (id) { var b = doc.querySelector('#catalogue button[data-id="' + id + '"]'); if (b) b.click(); }); return parseInt(tot.textContent.replace(/\D/g, ''), 10) === 14500; } },
        { name: 'La recherche filtre le catalogue en direct (insensible à la casse)', help: "Sur 'input', compare nom.toLowerCase().includes(texte) pour chaque produit et ne garde que les cartes correspondantes.",
          check: function (doc, win) { var r = doc.querySelector('#recherche'); var cat = doc.querySelector('#catalogue'); r.value = 'GARI'; r.dispatchEvent(new win.Event('input', { bubbles: true })); var visibles = Array.prototype.filter.call(cat.querySelectorAll('.produit'), function (a) { return !a.hidden && a.style.display !== 'none'; }); return visibles.length === 1; } },
        { name: 'Nouvelle vente vide le ticket et remet le total à zéro', help: "Vide le tableau d'état (ticket.length = 0) ET l'affichage, puis remets le total à « 0 FCFA ».",
          check: function (doc) { var b = doc.querySelector('#nouvelle-caisse'); var ul = doc.querySelector('#ticket'); var tot = doc.querySelector('#total'); if (!b) return false; b.click(); return ul.querySelectorAll('li').length === 0 && parseInt(tot.textContent.replace(/\D/g, ''), 10) === 0; } }
      ],
      hints: [
        "Structure ton code en 4 fonctions : `trouverProduit(id)`, `rendCatalogue(produitsAffiches)`, `rendTicket()`, et les branchements. `rendCatalogue` vide `#catalogue` puis y crée les cartes — le filtre devient alors trivial : re-rendre avec un sous-tableau.",
        "Pour la délégation : `catalogue.addEventListener('click', (e) => { const b = e.target.closest('button[data-id]'); if (!b) return; ticket.push(trouverProduit(b.dataset.id)); rendTicket(); })`. Le `dataset.id` te donne la chaîne de l'attribut `data-id`.",
        "Recherche : un écouteur `input` qui appelle `rendCatalogue(PRODUITS.filter(p => p.nom.toLowerCase().includes(q)))` où `q = recherche.value.trim().toLowerCase()`. Vider le champ filtre avec une chaîne vide → tout repasse. Attention à ré-attacher la délégation sur #catalogue et non sur les cartes (elles sont recréées)."
      ],
      solution: {
        lang: 'js', label: 'script.js — solution commentée',
        code:
`// ===== Données fournies par le grossiste =====
const PRODUITS = [
  { id: 'gari', nom: 'Gari blanc 25 kg', prix: 13500 },
  { id: 'huile', nom: 'Huile rouge 5 L', prix: 8500 },
  { id: 'igname', nom: 'Ignames (botte)', prix: 4200 },
  { id: 'tomate', nom: 'Tomates (panier)', prix: 6000 },
  { id: 'piment', nom: 'Piments (sachet)', prix: 1000 },
  { id: 'arachide', nom: 'Arachides 10 kg', prix: 9000 }
];

// ===== État =====
const ticket = []; // seule source de vérité pour le contenu du ticket

// ===== Sélections =====
const zoneCatalogue = document.querySelector('#catalogue');
const listeTicket = document.querySelector('#ticket');
const outTotal = document.querySelector('#total');
const champRecherche = document.querySelector('#recherche');
const btnNouvelle = document.querySelector('#nouvelle-caisse');

// ===== Petits utilitaires =====
function trouverProduit(id) {
  return PRODUITS.find(function (p) { return p.id === id; });
}
function fcfas(n) { return n.toLocaleString('fr-FR') + ' FCFA'; }

// ===== Rendus : le DOM reflète l'état, toujours =====
function rendCatalogue(produits) {
  zoneCatalogue.innerHTML = ''; // on repart d'une page blanche
  produits.forEach(function (p) {
    const carte = document.createElement('article');
    carte.className = 'produit';

    const nom = document.createElement('strong');
    nom.textContent = p.nom;

    const prix = document.createElement('span');
    prix.className = 'prix';
    prix.textContent = fcfas(p.prix);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.id = p.id; // la carte transporte l'identité du produit
    btn.textContent = 'Ajouter';

    carte.append(nom, prix, btn);
    zoneCatalogue.append(carte);
  });
}

function rendTicket() {
  listeTicket.innerHTML = '';
  ticket.forEach(function (p) {
    const li = document.createElement('li');
    const nom = document.createElement('span');
    nom.textContent = p.nom;
    const prix = document.createElement('span');
    prix.textContent = fcfas(p.prix);
    li.append(nom, prix);
    listeTicket.append(li);
  });
  const total = ticket.reduce(function (s, p) { return s + p.prix; }, 0);
  outTotal.textContent = fcfas(total);
}

// ===== Branchements =====
// Délégation : UN écouteur sur le conteneur survit aux re-rendus des cartes.
zoneCatalogue.addEventListener('click', function (e) {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
  const produit = trouverProduit(btn.dataset.id);
  if (!produit) return;
  ticket.push(produit);
  rendTicket();
});

champRecherche.addEventListener('input', function () {
  const q = champRecherche.value.trim().toLowerCase();
  rendCatalogue(PRODUITS.filter(function (p) {
    return p.nom.toLowerCase().indexOf(q) !== -1;
  }));
});

btnNouvelle.addEventListener('click', function () {
  ticket.length = 0; // vide le tableau d'état SANS changer sa référence
  rendTicket();
});

// ===== Démarrage =====
rendCatalogue(PRODUITS);
rendTicket();`,
        explain: "Ce projet cristallise l'architecture qui sert partout, de React à Vue : **un état, des fonctions de rendu, des événements qui modifient l'état puis relancent le rendu**. Le tableau `ticket` est la seule source de vérité ; `rendTicket()` ne fait que le traduire en DOM. Jamais tu ne « lis » l'interface pour savoir ce qu'elle contient — tu demandes à l'état.\n\nDeux détails de professionnel. La délégation est posée sur `#catalogue`, un élément qui n'est **jamais recréé** : quand le filtre re-rend les cartes, les anciennes disparaissent avec leurs écouteurs éventuels, mais l'écouteur du parent, lui, survit et continue d'attraper les clics des nouvelles cartes. Et `ticket.length = 0` au lieu de `ticket = []` : la constante `ticket` garde sa référence, toutes les fonctions qui la capturaient voient le même tableau vidé — pas de copie fantôme.\n\nEnfin, remarque comme la recherche devient presque gratuite une fois `rendCatalogue(produits)` écrit : filtrer = re-rendre un sous-tableau. Quand une fonctionnalité tombe « toute seule », c'est le signe que tes fonctions ont de bonnes responsabilités."
      },
      criteria: [
        "Le catalogue affiche les 6 produits avec nom, prix et bouton fonctionnel au chargement.",
        "Ajouter plusieurs produits (dont deux fois le même) produit autant de lignes et un total exact.",
        "La recherche filtre en direct, insensible à la casse, et vider le champ réaffiche tout le catalogue.",
        "« Nouvelle vente » réinitialise ticket et total.",
        "Le code reste lisible : fonctions courtes, une seule source de vérité, délégation d'événements."
      ],
      variants: [
        "Regroupe les lignes identiques : « Gari blanc 25 kg × 2 — 27 000 FCFA » avec boutons +/− par ligne.",
        "Ajoute un bouton « Imprimer le ticket » qui ouvre `window.print()` avec une feuille de style `@media print`.",
        "Ajoute un champ « Montant reçu » qui calcule la monnaie à rendre.",
        "Défi : persiste la vente en cours dans `localStorage` (en local) et archive chaque vente validée dans un historique consultable."
      ],
      related: ['js-objets', 'js-tableaux', 'js-dom', 'js-evenements']
    }
  ]
};
