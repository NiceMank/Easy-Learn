/* ============================================================
   exo-vue.js — Exercices pratiques : Vue.js
   Exécution via CDN (Vue 3 esm-browser, gabarits dans le DOM,
   Options API) dans l'iframe sandboxée. Connexion requise au
   premier lancement des tests.
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

var _VUE_HEAD =
  '<scr' + 'ipt async src="https://unpkg.com/es-module-shims@1.10.0/dist/es-module-shims.min.js"></scr' + 'ipt>' +
  '<scr' + 'ipt type="importmap">{"imports":{"vue":"https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js"}}</scr' + 'ipt>';

window.DEVDOCS_EXO.vue = {
  module: 'vue',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-vue-compteur-stock',
      level: 'fonda',
      title: 'Le compteur de stock de la pharmacie',
      icon: 'exposure_plus_1',
      free: true,
      minutes: 20,
      kind: 'dom',
      scriptType: 'module',
      head: _VUE_HEAD,
      readySelector: '#app',
      readyMinLen: 40,
      readyWait: 400,
      context: "La pharmacie du quartier Godomey compte les boîtes de paracétamol à l'ouverture et à la fermeture. Retour fournisseur possible, stock plafonné à 60 boîtes par rayonnage : le compteur doit respecter les deux bornes.",
      statement: "Bienvenue dans Vue : ici, le gabarit vit dans le HTML et devient **réactif** dès que tes données changent. Tu écriras très peu de JavaScript — Vue fait le lien tout seul.\n\nMission :\n\n1. Dans `app.js` : `createApp({ data() { return { stock: 0 } } }).mount('#app')` — `data` retourne l'état initial (0 boîte).\n2. Dans le gabarit `#app` (HTML éditable) : affiche le stock dans `<span id=\"valeur\">` avec l'interpolation `{{ stock }}`.\n3. Deux boutons `#inc` / `#dec` avec la directive `@click` : `@click=\"stock = Math.min(60, stock + 1)\"` pour l'un, `@click=\"stock = Math.max(0, stock - 1)\"` pour l'autre — les expressions réactives sont permises dans le gabarit, et ici elles suffisent.\n4. **Bornes visibles** : à 60, `#inc` reçoit l'attribut disabled via `:disabled=\"stock >= 60\"` ; à 0, `#dec` via `:disabled=\"stock <= 0\"`.\n5. Un message `<p id=\"plein\">` n'apparaît que si le rayon est plein, via `v-if=\"stock >= 60\"`.\n\nNote la philosophie : le `:` (raccourci de `v-bind:`) rend un attribut **réactif** ; `@` écoute un événement ; `v-if` crée ou détruit l'élément. Trois symboles, et toute l'interactivité de base est couverte.",
      constraints: [
        "`{{ stock }}` alimente `#valeur` — jamais de texte en dur.",
        "Les boutons se branchent avec `@click` (ou `v-on:click`), les bornes avec `:disabled` (jamais du DOM manuel).",
        "`#plein` existe uniquement quand le stock atteint 60 (`v-if`, pas `v-show`).",
        "L'état vit dans `data()` ; l'app se monte avec `.mount('#app')`.",
        "Aucune ligne de manipulation DOM dans ton JavaScript."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<div id="app">
  <main class="carte">
    <h1>Rayon paracétamol 500 mg</h1>
    <!-- À toi : span#valeur, boutons #inc / #dec (bornés), p#plein (v-if) -->
  </main>
</div>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eaf5f0; }
.carte { background: #fff; border-radius: 22px; padding: 26px 30px; text-align: center;
  box-shadow: 0 12px 30px rgba(20, 80, 60, .10); max-width: 340px; }
h1 { font-size: 19px; margin: 0 0 6px; }
#valeur { display: block; font-size: 52px; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.actions { display: flex; gap: 10px; justify-content: center; }
button { font: inherit; font-weight: 700; border: none; border-radius: 999px;
  padding: 10px 18px; cursor: pointer; color: #fff; background: #1f9d6c; }
button:disabled { opacity: .4; cursor: not-allowed; }
#plein { color: #b02a37; font-weight: 600; font-size: 13.5px; }` },
        { key: 'js', label: 'app.js', lang: 'js', editable: true, code:
`import { createApp } from 'vue';

// Monte ton app : data() retourne { stock: 0 }
// Le reste se joue dans le gabarit HTML (directives).
` }
      ],
      tests: [
        { name: 'Le clic sur #inc augmente la valeur affichée', help: "@click=\"stock = Math.min(60, stock + 1)\" — l'interpolation suit toute seule.",
          check: function (doc) { var v = doc.querySelector('#valeur'); var b = doc.querySelector('#inc'); if (!v || !b) return false; var avant = parseInt(v.textContent, 10); b.click(); return new Promise(function (res) { setTimeout(function () { res(parseInt(v.textContent, 10) === avant + 1); }, 120); }); } },
        { name: 'Le clic sur #dec diminue la valeur affichée', help: "Même logique avec Math.max(0, stock - 1).",
          check: function (doc) { var v = doc.querySelector('#valeur'); var d = doc.querySelector('#dec'); var i = doc.querySelector('#inc'); i.click(); i.click(); var avant = parseInt(v.textContent, 10); d.click(); return new Promise(function (res) { setTimeout(function () { res(parseInt(v.textContent, 10) === avant - 1); }, 120); }); } },
        { name: 'À 60, #inc est désactivé et le rayon déclaré plein', help: ":disabled=\"stock >= 60\" sur #inc + v-if=\"stock >= 60\" pour #plein.",
          check: function (doc) { var v = doc.querySelector('#valeur'); var i = doc.querySelector('#inc'); var n = parseInt(v.textContent, 10); for (var k = 0; k < 70 - n; k++) i.click(); return new Promise(function (res) { setTimeout(function () { res(i.disabled === true && parseInt(v.textContent, 10) === 60 && !!doc.querySelector('#plein')); }, 150); }); } },
        { name: 'À 0, #dec est désactivé et le stock ne descend pas sous zéro', help: ":disabled=\"stock <= 0\" — le bouton grisé empêche l'action impossible.",
          check: function (doc) { var v = doc.querySelector('#valeur'); var d = doc.querySelector('#dec'); var n = parseInt(v.textContent, 10); for (var k = 0; k < n + 3; k++) d.click(); return new Promise(function (res) { setTimeout(function () { res(parseInt(v.textContent, 10) === 0 && d.disabled === true); }, 150); }); } }
      ],
      hints: [
        "Le JavaScript minimal : `createApp({ data() { return { stock: 0 } } }).mount('#app')`. C'est tout. Vue prend le relais côté gabarit.",
        "Le gabarit : `<span id=\"valeur\">{{ stock }}</span>` et `<button id=\"inc\" @click=\"stock = Math.min(60, stock + 1)\" :disabled=\"stock >= 60\">+ Arrivage</button>`.",
        "Le message conditionnel : `<p id=\"plein\" v-if=\"stock >= 60\">Rayon plein — commande fournisseur en attente.</p>`. Recharge mentalement : si tu montes puis redescends, l'élément doit disparaître du DOM."
      ],
      solution: {
        lang: 'html', label: 'index.html + app.js — solution commentée',
        code:
`<!-- ===== index.html ===== -->
<div id="app">
  <main class="carte">
    <h1>Rayon paracétamol 500 mg</h1>

    <!-- Interpolation : le texte suit l'état tout seul -->
    <span id="valeur">{{ stock }}</span>
    <p>{{ stock <= 1 ? 'boîte' : 'boîtes' }} en rayon</p>

    <div class="actions">
      <!-- @click écoute ; :disabled lie l'attribut à une expression -->
      <button id="dec" @click="stock = Math.max(0, stock - 1)"
              :disabled="stock <= 0">− Retour</button>
      <button id="inc" @click="stock = Math.min(60, stock + 1)"
              :disabled="stock >= 60">+ Arrivage</button>
    </div>

    <!-- v-if : l'élément n'existe QUE rayon plein -->
    <p id="plein" v-if="stock >= 60">Rayon plein — commande fournisseur en attente.</p>
  </main>
</div>

<script type="module">
// ===== app.js =====
import { createApp } from 'vue';

createApp({
  data() {
    return { stock: 0 }; // l'état initial, rien de plus
  }
}).mount('#app');
</script>`,
        explain: "Trois mécanismes de Vue apparaissent dès ce premier exercice. L'**interpolation** `{{ stock }}` crée une zone de texte réactive : change `stock`, le DOM suit sans instruction supplémentaire. Le **binding d'attribut** `:disabled=\"expression\"` rejoue l'expression à chaque changement de réactivité — l'attribut est en permanence cohérent avec l'état. Et `v-if` gouverne l'**existence** de l'élément : absent du DOM, vraiment — pas du `display:none`.\n\nRemarque aussi la direction du flux : ton JavaScript n'émet qu'un état (`data`), et toute la logique d'affichage se lit dans le gabarit, près des éléments concernés. C'est ce qui rend Vue si rapide à prendre : le HTML redevient le centre du jeu, simplement augmenté de directives."
      },
      criteria: [
        "Le compteur bouge au clic dans les deux sens, sans intervention DOM.",
        "Bornes 0 et 60 respectées via `:disabled`, boutons grisés visuellement.",
        "`#plein` apparaît et disparaît effectivement du DOM.",
        "L'état vit dans `data()`, montage correct de l'app.",
        "Zéro manipulation du DOM dans ton JavaScript."
      ],
      variants: [
        "Déplace la logique de bornes dans des `methods` (`arrivage()`, `retour()`) : quand les expressions du gabarit grossissent, les méthodes prennent le relais.",
        "Ajoute une computed `pourcentage` (stock / 60 en %) affichée en barre de progression.",
        "Ajoute un bouton « Nouvelle journée » qui remet le stock au dernier inventaire (état supplémentaire)."
      ],
      related: ['vue-ref', 'vue-v-bind', 'vue-v-on', 'vue-v-if', 'vue-demarrage']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-vue-liste-courses',
      level: 'fonda',
      title: 'La liste de courses réactive',
      icon: 'playlist_add',
      free: false,
      minutes: 25,
      kind: 'dom',
      scriptType: 'module',
      head: _VUE_HEAD,
      readySelector: '#app',
      readyMinLen: 40,
      readyWait: 400,
      context: "Même mission qu'en JavaScript vanilla — la liste de courses de Dantokpa — mais cette fois avec Vue. Compte les lignes de code en moins : c'est la démonstration la plus parlante de ce qu'un framework apporte.",
      statement: "Reproduis la liste de courses en Vue :\n\n1. **État** : `articles` (tableau de chaînes, 2 exemples pré-remplis) et `saisie` (chaîne vide) dans `data()`.\n2. **Affichage** : `ul#liste` rendue avec `v-for=\"(a, i) in articles\"` et `:key=\"i\"` (ou mieux : un id). Le message `<p id=\"vide\">` s'affiche via `v-if` quand la liste est vide.\n3. **Ajout** : champ `input#saisie` lié avec **`v-model`** (synchronisation bidirectionnelle automatique) + bouton `#ajouter` : `@click` pousse la saisie nettoyée (si non vide) dans le tableau et vide le champ.\n4. **Suppression** : chaque `li` a un bouton `.suppr` : `@click=\"articles.splice(i, 1)\"` — `splice` mutateur est **détecté** par Vue (pas besoin d'immutabilité comme en React).\n5. **Compteur** : `<p id=\"compteur\">` affiche « n article(s) » via `{{ articles.length }}` — dérivation automatique.\n\nArrête-toi une seconde sur `v-model` : il fait gratuitement ce qu'en vanilla coûtait un écouteur `input` + une réécriture de valeur. Retiens surtout le concept : source unique, synchronisation déclarative.",
      constraints: [
        "`v-model` sur l'input de saisie (pas de `value`/`onInput` manuels).",
        "`v-for` avec une `:key` sur chaque ligne.",
        "`v-if` pour le message vide dans `#vide` ; disparition automatique dès le premier article.",
        "Ajout : trim + garde vide + réinitialisation du champ.",
        "Compteur `{{ articles.length }}` — jamais maintenu à la main."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<div id="app">
  <main class="carte">
    <h1>Courses de Dantokpa</h1>
    <!-- input#saisie (v-model) + bouton#ajouter (@click) -->
    <!-- p#compteur, ul#liste (v-for + :key), p#vide (v-if) -->
  </main>
</div>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eef4ee; }
.carte { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(440px, 92vw);
  box-shadow: 0 10px 26px rgba(20, 70, 30, .12); }
h1 { font-size: 19px; margin: 0 0 12px; }
.ligne { display: flex; gap: 8px; }
input { flex: 1; font: inherit; padding: 10px 13px; border-radius: 11px; border: 1.5px solid #c4d8c4; outline: none; }
button { font: inherit; font-weight: 700; border: none; border-radius: 11px;
  padding: 10px 15px; cursor: pointer; color: #fff; background: #2e7d32; }
#compteur, #vide { font-size: 13px; color: #5c735c; margin: 10px 0 4px; }
ul { list-style: none; margin: 6px 0 0; padding: 0; display: grid; gap: 7px; }
li { display: flex; justify-content: space-between; align-items: center;
  background: #f1f7f1; border-radius: 10px; padding: 9px 12px; font-size: 14.5px; }
li button { background: #f8d7da; color: #842029; padding: 5px 11px; font-size: 12.5px; }` },
        { key: 'js', label: 'app.js', lang: 'js', editable: true, code:
`import { createApp } from 'vue';

createApp({
  data() {
    return {
      saisie: '',
      articles: ['Gari blanc 25 kg', 'Huile rouge 5 L']
    };
  },
  methods: {
    // ajouter() : trim, garde, push, reset
  }
}).mount('#app');
` }
      ],
      tests: [
        { name: 'Taper dans le champ met à jour l\u2019état (v-model) et permet l\u2019ajout', help: "v-model=\"saisie\" sur l'input ; ajouter() pousse la valeur dans articles.",
          check: function (doc, win) { var inp = doc.querySelector('#saisie'); var b = doc.querySelector('#ajouter'); var ul = doc.querySelector('#liste'); if (!inp || !b || !ul) return false; inp.value = 'Tapioca 5 kg'; inp.dispatchEvent(new win.Event('input', { bubbles: true })); b.click(); return new Promise(function (res) { setTimeout(function () { res(/Tapioca 5 kg/.test(ul.textContent)); }, 150); }); } },
        { name: 'Le champ se vide après l\u2019ajout', help: "Dans ajouter() : this.saisie = '' — v-model synchronise l'écran gratuitement.",
          check: function (doc) { return doc.querySelector('#saisie').value === ''; } },
        { name: 'Le compteur reflète le nombre d\u2019articles', help: "{{ articles.length }} article(s) — dérivation gratuite.",
          check: function (doc) { var c = doc.querySelector('#compteur'); var ul = doc.querySelector('#liste'); if (!c || !ul) return false; var n = ul.querySelectorAll('li').length; return c.textContent.indexOf(String(n)) >= 0; } },
        { name: 'Le bouton Supprimer retire sa ligne (splice)', help: "@click=\"articles.splice(i, 1)\" dans le v-for — Vue détecte la mutation du tableau.",
          check: function (doc) { var btn = doc.querySelector('#liste li .suppr'); if (!btn) return false; var avant = doc.querySelectorAll('#liste li').length; btn.click(); return new Promise(function (res) { setTimeout(function () { res(doc.querySelectorAll('#liste li').length === avant - 1); }, 150); }); } },
        { name: 'Le message vide apparaît quand la liste est… vide', help: "<p id=\"vide\" v-if=\"articles.length === 0\">… — v-if le crée et le détruit réellement.",
          check: function (doc) { return new Promise(function (res) { (function step() { var btn = doc.querySelector('#liste li .suppr'); if (btn) { btn.click(); setTimeout(step, 120); return; } res(doc.querySelectorAll('#liste li').length === 0 && !!doc.querySelector('#vide')); })(); }); } }
      ],
      hints: [
        "Le champ : `<input id=\"saisie\" v-model=\"saisie\" type=\"text\">`. v-model = `value` + écoute `input` en une directive.",
        "La méthode : `ajouter() { const t = this.saisie.trim(); if (t === '') return; this.articles.push(t); this.saisie = ''; }`. Note que `push` sur le tableau EST détecté par la réactivité de Vue — pas besoin d'immutabilité ici (c'est une différence majeure avec React).",
        "La liste : `<ul id=\"liste\"><li v-for=\"(a, i) in articles\" :key=\"i\"><span>{{ a }}</span><button class=\"suppr\" @click=\"articles.splice(i, 1)\">Supprimer</button></li></ul>` et `<p id=\"vide\" v-if=\"!articles.length\">Liste vide — le marché attend.</p>`."
      ],
      solution: {
        lang: 'html', label: 'index.html + app.js — solution commentée',
        code:
`<!-- ===== index.html ===== -->
<div id="app">
  <main class="carte">
    <h1>Courses de Dantokpa</h1>

    <div class="ligne">
      <!-- v-model : synchronisation bidirectionnelle gratuite -->
      <input id="saisie" v-model="saisie" type="text"
             placeholder="Ex. Gari jaune" @keyup.enter="ajouter">
      <button id="ajouter" @click="ajouter">Ajouter</button>
    </div>

    <!-- Dérivation automatique : recalculée à chaque changement -->
    <p id="compteur">{{ articles.length }} article{{ articles.length > 1 ? 's' : '' }}</p>
    <p id="vide" v-if="articles.length === 0">Liste vide — le marché attend.</p>

    <!-- v-for + :key ; splice est détecté par la réactivité de Vue -->
    <ul id="liste">
      <li v-for="(a, i) in articles" :key="i">
        <span>{{ a }}</span>
        <button class="suppr" type="button" @click="articles.splice(i, 1)">Supprimer</button>
      </li>
    </ul>
  </main>
</div>

<script type="module">
// ===== app.js =====
import { createApp } from 'vue';

createApp({
  data() {
    return {
      saisie: '',
      articles: ['Gari blanc 25 kg', 'Huile rouge 5 L']
    };
  },
  methods: {
    ajouter() {
      const texte = this.saisie.trim();
      if (texte === '') return;     // jamais de ligne vide
      this.articles.push(texte);    // push : détecté par Vue
      this.saisie = '';             // v-model vide le champ pour nous
    }
  }
}).mount('#app');
</script>`,
        explain: "Compare avec la version vanilla : l'écouteur, le preventDefault, la construction du `li`… ont disparu. Trois directives couvrent tout : `v-model` synchronise le champ avec l'état (et note l'élégance — vider `saisie` vide l'écran **automatiquement**), `v-for` répète le gabarit par élément, `v-if` fait vivre le message vide.\n\nDeux subtilités de la réactivité Vue à retenir. D'une part, les méthodes mutatrices du tableau (`push`, `splice`, `sort`…) sont **instrumentées** par Vue : la mutation est détectée et le rendu relancé — là où React exige un nouveau tableau, Vue accepte la mutation contrôlée. D'autre part, tout ce qui vit dans le gabarit (`{{ articles.length }}`) est recalculé à chaque changement pertinent : tu n'écris jamais de code de synchronisation. Ajoute `@keyup.enter` sur l'input et la touche Entrée devient gratuite également — c'est toujours Vue qui décode les événements pour toi."
      },
      criteria: [
        "Ajout via `v-model` + méthode, champ réinitialisé automatiquement.",
        "Suppression par ligne fonctionnelle (`splice`).",
        "Compteur et message vide toujours cohérents sans code de synchro.",
        "Chaque ligne de la liste possède sa `:key`.",
        "Zéro DOM manuel dans le JavaScript."
      ],
      variants: [
        "Ajoute un état « acheté » par article (objets `{ id, texte, achete }`) avec case à cocher et `.achete { text-decoration: line-through }` liée par `:class`.",
        "Ajoute un `computed` qui trie les articles alphabétiquement pour l'affichage sans toucher au tableau source.",
        "Compte les articles distincts contenant « gari » via un `computed` + `filter`."
      ],
      related: ['vue-v-for', 'vue-v-model', 'vue-v-on', 'vue-v-if', 'vue-computed']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-vue-filtre-prix',
      level: 'inter',
      title: 'Le filtre de prix du grossiste',
      icon: 'filter_list',
      free: false,
      minutes: 40,
      kind: 'dom',
      scriptType: 'module',
      head: _VUE_HEAD,
      readySelector: '#app',
      readyMinLen: 40,
      readyWait: 500,
      context: "Le grossiste de Dantokpa consulte son catalogue sur téléphone au cœur du marché. Deux gestes uniquement : un plafond de prix au curseur, et le tri croissant/décroissant. Ni plus ni moins — la fluidité prime au marché.",
      statement: "Cet exercice te fait toucher du doigt la force des **`computed`** : des valeurs dérivées, mises en cache, recalculées uniquement quand leurs dépendances bougent.\n\nÀ construire :\n\n1. **État** : `produits` (6 références fournies `{ id, nom, prix }`), `plafond` (nombre, 20 000 par défaut), `tri` (`'asc'` ou `'desc'`).\n2. **Curseur** : `input#plafond` de type `range` (min 5 000, max 50 000, pas 500) lié par `v-model.number` ; sa valeur s'affiche dans `<output id=\"valeur-plafond\">`.\n3. **Tri** : bouton `#tri` qui bascule `tri` entre 'asc' et 'desc' et affiche le sens courant (« Prix croissant » / « Prix décroissant »).\n4. **La liste** `ul#resultats` ne rend que les produits `prix <= plafond`, triés selon `tri` — via UN computed `resultats` qui enchaîne `filter` puis un `slice().sort(...)` (slice ! Le `sort` mute : ne jamais trier le tableau source en place).\n5. Un compte `<p id=\"total-resultats\">` recalculé : « n produit(s) sous ce plafond ».\n\nTout se dérive : aucune méthode `filtrer()`, aucun état `resultats`. Tu changes le curseur, le computed recalcule, l'écran suit. C'est la réactivité qui travaille pour toi.",
      constraints: [
        "UN computed `resultats` chaîne filtre + tri ; le tableau `produits` n'est JAMAIS muté (slice avant sort).",
        "`v-model.number` sur le range (sinon tu manipules des chaînes).",
        "Le bouton de tri affiche le sens courant, calculé depuis `tri`.",
        "`#total-resultats` et `#valeur-plafond` se mettent à jour seuls (interpolations/computed).",
        "Aucun `watch` toléré ici : tout est dérivation synchrone."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<div id="app">
  <main class="carte">
    <h1>Catalogue du grossiste</h1>
    <!-- label + input#plafond range (v-model.number) + output#valeur-plafond -->
    <!-- bouton#tri (bascule + libellé courant) -->
    <!-- p#total-resultats, ul#resultats (v-for sur le computed) -->
  </main>
</div>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #f3eef9; }
.carte { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(480px, 92vw);
  box-shadow: 0 10px 26px rgba(70, 30, 120, .12); }
h1 { font-size: 19px; margin: 0 0 14px; }
label { font-size: 13px; font-weight: 700; color: #5d4a86; }
input[type="range"] { width: 100%; margin: 8px 0 4px; accent-color: #6d3cc0; }
output { font-weight: 800; color: #6d3cc0; }
.boutons { margin: 12px 0; }
button { font: inherit; font-weight: 700; border: none; border-radius: 999px;
  padding: 9px 16px; cursor: pointer; color: #fff; background: #6d3cc0; }
#total-resultats { font-size: 13px; color: #5d4a86; }
ul { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 7px; }
li { display: flex; justify-content: space-between; background: #f6f1fc;
  border-radius: 10px; padding: 9px 12px; font-size: 14.5px; }
li .prix { font-weight: 800; }` },
        { key: 'js', label: 'app.js', lang: 'js', editable: true, code:
`import { createApp } from 'vue';

createApp({
  data() {
    return {
      plafond: 20000,
      tri: 'asc',
      produits: [
        { id: 1, nom: 'Gari blanc 50 kg', prix: 13000 },
        { id: 2, nom: 'Gari jaune 50 kg', prix: 14500 },
        { id: 3, nom: 'Huile rouge 25 L', prix: 41000 },
        { id: 4, nom: 'Ignames (sac)', prix: 18000 },
        { id: 5, nom: 'Tapioca 25 kg', prix: 15500 },
        { id: 6, nom: 'Farine de maïs 50 kg', prix: 21000 }
      ]
    };
  },
  computed: {
    // resultats : filter(plafond) puis slice().sort(tri)
  }
}).mount('#app');
` }
      ],
      tests: [
        { name: 'Le curseur plafonne réellement la liste affichée', help: "computed : this.produits.filter(p => p.prix <= this.plafond). Abaisser le plafond à 15000 → 3 produits.",
          check: function (doc, win) { var r = doc.querySelector('#plafond'); if (!r) return false; r.value = '15000'; r.dispatchEvent(new win.Event('input', { bubbles: true })); return new Promise(function (res) { setTimeout(function () { res(doc.querySelectorAll('#resultats li').length === 3); }, 200); }); } },
        { name: 'La valeur du plafond s\u2019affiche (output)', help: "{{ plafond.toLocaleString('fr-FR') }} dans l'output : elle suit le curseur.",
          check: function (doc) { var o = doc.querySelector('#valeur-plafond'); return !!o && /15\s?000/.test(o.textContent.replace(/\u202f|\u00a0/g, ' ')); } },
        { name: 'Le tri croissant ordonne les prix de bas en haut', help: "slice().sort((a, b) => a.prix - b.prix) — et PAS sort sur le tableau source.",
          check: function (doc) { var lis = doc.querySelectorAll('#resultats li .prix'); if (lis.length < 2) return false; var prix = []; lis.forEach(function (l) { prix.push(parseInt(l.textContent.replace(/\D/g, ''), 10) || 0); }); for (var i = 1; i < prix.length; i++) { if (prix[i] < prix[i - 1]) return false; } return true; } },
        { name: 'Le bouton bascule en tri décroissant', help: "@click=\"tri = tri === 'asc' ? 'desc' : 'asc'\" ; le libellé reflète l'état courant.",
          check: function (doc) { var b = doc.querySelector('#tri'); if (!b) return false; b.click(); return new Promise(function (res) { setTimeout(function () { var lis = doc.querySelectorAll('#resultats li .prix'); var prix = []; lis.forEach(function (l) { prix.push(parseInt(l.textContent.replace(/\D/g, ''), 10) || 0); }); for (var i = 1; i < prix.length; i++) { if (prix[i] > prix[i - 1]) { res(false); return; } } res(true); }, 200); }); } },
        { name: 'Le compte de résultats est exact en toutes circonstances', help: "{{ resultats.length }} produit(s) — la dérivation fait le travail, pas une variable.",
          check: function (doc) { var t = doc.querySelector('#total-resultats'); var n = doc.querySelectorAll('#resultats li').length; return !!t && t.textContent.indexOf(String(n)) >= 0; } }
      ],
      hints: [
        "Le computed : `resultats() { return this.produits.filter(p => p.prix <= this.plafond).slice().sort((a, b) => this.tri === 'asc' ? a.prix - b.prix : b.prix - a.prix); }`. Le `slice()` crée une copie AVANT le sort — sans lui, tu tries le tableau source et perturbes tout le reste.",
        "Le range : `<input id=\"plafond\" type=\"range\" min=\"5000\" max=\"50000\" step=\"500\" v-model.number=\"plafond\">` — le modifieur `.number` convertit en nombre, indispensable pour les comparaisons.",
        "Le bouton : `<button id=\"tri\" @click=\"tri = tri === 'asc' ? 'desc' : 'asc'\">{{ tri === 'asc' ? 'Prix croissant' : 'Prix décroissant' }}</button>` — l'étiquette elle-même est une dérivation."
      ],
      solution: {
        lang: 'html', label: 'index.html + app.js — solution commentée',
        code:
`<!-- ===== index.html ===== -->
<div id="app">
  <main class="carte">
    <h1>Catalogue du grossiste</h1>

    <label for="plafond">Plafond de prix</label>
    <input id="plafond" type="range" min="5000" max="50000" step="500"
           v-model.number="plafond">
    <output id="valeur-plafond">{{ plafond.toLocaleString('fr-FR') }} FCFA max</output>

    <div class="boutons">
      <!-- Le libellé aussi est une dérivation -->
      <button id="tri" @click="tri = tri === 'asc' ? 'desc' : 'asc'">
        {{ tri === 'asc' ? 'Prix croissant' : 'Prix décroissant' }}
      </button>
    </div>

    <p id="total-resultats">{{ resultats.length }} produit(s) sous ce plafond</p>

    <!-- Le v-for consomme UNIQUEMENT le computed -->
    <ul id="resultats">
      <li v-for="p in resultats" :key="p.id">
        <span>{{ p.nom }}</span>
        <span class="prix">{{ p.prix.toLocaleString('fr-FR') }} F</span>
      </li>
    </ul>
  </main>
</div>

<script type="module">
// ===== app.js =====
import { createApp } from 'vue';

createApp({
  data() {
    return {
      plafond: 20000,
      tri: 'asc',
      produits: [
        { id: 1, nom: 'Gari blanc 50 kg', prix: 13000 },
        { id: 2, nom: 'Gari jaune 50 kg', prix: 14500 },
        { id: 3, nom: 'Huile rouge 25 L', prix: 41000 },
        { id: 4, nom: 'Ignames (sac)', prix: 18000 },
        { id: 5, nom: 'Tapioca 25 kg', prix: 15500 },
        { id: 6, nom: 'Farine de maïs 50 kg', prix: 21000 }
      ]
    };
  },
  computed: {
    resultats() {
      return this.produits
        .filter((p) => p.prix <= this.plafond)
        .slice() // copie ! sort muterait sinon le tableau source
        .sort((a, b) => (this.tri === 'asc' ? a.prix - b.prix : b.prix - a.prix));
    }
  }
}).mount('#app');
</script>`,
        explain: "Le computed est le cœur de cet exercice, et il vient avec deux garanties que le code manuel ne donne pas. **Il est déclaratif** : tu écris la relation « resultats = produits filtrés et triés » une fois, et Vue la maintient vraie quoi qu'il arrive — curseur, tri, futures modifications du catalogue. **Il est mis en cache** : tant que ni `plafond` ni `tri` ni `produits` ne changent, Vue ressort le résultat mémorisé sans recalculer — gratuit en performances.\n\nLe piège du `sort` mérite un moment : `Array.prototype.sort` trie **en place**, il mute. Appliqué directement à `this.produits`, il réordonnerait ta source de données silencieusement — et d'autres parties de l'app afficheraient soudain le catalogue dans l'ordre du dernier tri. Le `slice()` préalable crée une copie jetable : la source reste immaculée. Et `v-model.number` t'évite les comparaisons `'15000' < 9000` qui seraient fausses en chaînes de caractères."
      },
      criteria: [
        "Le filtre plafond agit en direct, la liste et le compte suivent.",
        "Le tri bascule croissant/décroissant sans casser le tableau source.",
        "UN computed centralise filtre + tri (cache réactif).",
        "Plafond affiché formaté, libellé de tri dérivé.",
        "Aucun `watch`, aucune duplication d'état."
      ],
      variants: [
        "Ajoute un `computed` `economies` : somme du prix des produits exclus par le plafond (« en filtrant à 15 000 F tu masques 90 500 F de stock »).",
        "Ajoute un second curseur `plancher` (prix minimum) — le computed devient un filtre à deux bornes.",
        "Remplace le tri par 3 boutons radio (nom A-Z, prix croissant, prix décroissant) pilotés par `v-model`."
      ],
      related: ['vue-computed', 'vue-v-model', 'vue-v-for', 'vue-watch']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-vue-cartes-composant',
      level: 'inter',
      title: 'La carte produit : composant, props et emit',
      icon: 'widgets',
      free: false,
      minutes: 45,
      kind: 'dom',
      scriptType: 'module',
      head: _VUE_HEAD,
      readySelector: '#app',
      readyMinLen: 40,
      readyWait: 500,
      context: "« Marché Navi » grossit : 40 produits, puis 400. La carte produit copiée-collée en devient indisciplinable. Il faut un vrai composant `carte-produit` : des props en entrée, un événement émis vers le parent quand on ajoute au panier.",
      statement: "Tu vas franchir le cap de la **séparation en composants** Vue. L'architecture à atteindre :\n\n1. Un composant enfant `carte-produit` (déclaré dans le JS) avec :\n   - des **props** : `nom` (String), `prix` (Number), `epuise` (Boolean) — déclarées avec leurs types ;\n   - un template : `article.carte` affichant nom/prix + badge « Épuisé » si la prop l'exige + un bouton `#ajouter` (réellement un `button.add-panier`) **désactivé** quand épuisé ;\n   - au clic : `this.$emit('ajout')` — l'enfant **signale**, il ne décide pas. Gérer le panier est l'affaire du parent.\n2. Le parent `App` :\n   - enregistre le composant (`components: { 'carte-produit': CarteProduit }`) ;\n   - tient l'état `panierTotal` (nombre d'articles) affiché dans `<strong id=\"total-panier\">` ;\n   - écoute l'événement sur chaque carte : `@ajout=\"panierTotal++\"` (ou une méthode).\n\nLe contrat à graver : **les props descendent, les événements montent**. L'enfant ne connaît ni le panier ni le catalogue ; il affiche ce qu'on lui donne et signale ce qui se passe. C'est ce qui le rend réutilisable partout.",
      constraints: [
        "`carte-produit` déclaré en JS avec `props` typées (`nom: String`, `prix: Number`, `epuise: Boolean`).",
        "Le bouton émet `this.$emit('ajout')` — aucune modification d'état parent depuis l'enfant.",
        "Le parent écoute `@ajout` sur l'usage du composant et incrémente son propre état.",
        "Bouton `disabled` lié à la prop `epuise` ; badge affiché par `v-if` dans l'enfant.",
        "Le catalogue parent nourrit les cartes via `v-for` + bindings (`:nom`, `:prix`, `:epuise`)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<div id="app">
  <main class="carte-app">
    <h1>Étal du jour</h1>
    <p class="ligne-panier">Panier : <strong id="total-panier">{{ panierTotal }}</strong> article(s)</p>
    <section id="catalogue">
      <!-- Utilise <carte-produit … @ajout="…" /> dans un v-for sur produits -->
    </section>
  </main>
</div>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { max-width: 780px; margin: 0 auto; background: #f6f1e7; }
h1 { font-size: 21px; color: #5b3a10; }
.ligne-panier { color: #8a7146; }
#total-panier { color: #b8860b; font-size: 18px; }
#catalogue { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.carte { position: relative; background: #fff; border-radius: 16px; padding: 16px;
  box-shadow: 0 8px 20px rgba(90, 62, 10, .10); display: grid; gap: 6px; }
.carte h2 { font-size: 15.5px; margin: 0; }
.carte .prix { font-weight: 800; color: #b8860b; }
.badge { position: absolute; top: 10px; right: 10px; background: #f8d7da; color: #842029;
  font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.add-panier { font: inherit; font-weight: 700; border: none; border-radius: 10px;
  padding: 9px; cursor: pointer; color: #fff; background: #b8860b; }
.add-panier:disabled { opacity: .4; cursor: not-allowed; }` },
        { key: 'js', label: 'app.js', lang: 'js', editable: true, code:
`import { createApp } from 'vue';

// 1) Définis CarteProduit : props { nom: String, prix: Number, epuise: Boolean },
//    template (carte + badge v-if + bouton add-panier qui $emit('ajout'))
// 2) App : components, data() { panierTotal, produits }, écoute @ajout

createApp({
  components: {},
  data() {
    return {
      panierTotal: 0,
      produits: [
        { id: 1, nom: 'Gari fin 25 kg', prix: 13500, epuise: false },
        { id: 2, nom: 'Huile rouge 5 L', prix: 8500, epuise: false },
        { id: 3, nom: 'Ignames (botte)', prix: 4200, epuise: true }
      ]
    };
  }
}).mount('#app');
` }
      ],
      tests: [
        { name: 'Le catalogue affiche une carte par produit via le composant', help: "<carte-produit v-for=\"p in produits\" :key=\"p.id\" :nom=\"p.nom\" :prix=\"p.prix\" :epuise=\"p.epuise\" @ajout=\"panierTotal++\" />",
          check: function (doc) { var c = doc.querySelector('#catalogue'); return !!c && c.querySelectorAll('article.carte').length === 3; } },
        { name: 'Le produit épuisé a bouton désactivé et badge', help: "Dans l'enfant : :disabled=\"epuise\" sur le bouton et v-if=\"epuise\" sur le badge.",
          check: function (doc) { var badges = doc.querySelectorAll('.badge'); if (badges.length !== 1) return false; var carte = badges[0].closest('article.carte'); var btn = carte.querySelector('button'); return btn.disabled === true; } },
        { name: 'Cliquer « Ajouter » incremente le compteur DU PARENT', help: "L'enfant fait $emit('ajout') ; le parent écoute @ajout et incrémente panierTotal — jamais l'inverse.",
          check: function (doc) { var btns = doc.querySelectorAll('article.carte button'); var t = doc.querySelector('#total-panier'); if (!btns.length || !t) return false; var avant = parseInt(t.textContent, 10) || 0; for (var i = 0; i < btns.length; i++) { if (!btns[i].disabled) { btns[i].click(); break; } } return new Promise(function (res) { setTimeout(function () { res(parseInt(t.textContent, 10) === avant + 1); }, 150); }); } },
        { name: 'Deux ajouts successifs cumulent correctement', help: "Chaque clic émet un nouvel événement : le compteur doit refléter 2 après le second clic.",
          check: function (doc) { var btns = doc.querySelectorAll('article.carte button'); var t = doc.querySelector('#total-panier'); var actif = null; for (var i = 0; i < btns.length; i++) { if (!btns[i].disabled) { actif = btns[i]; break; } } var avant = parseInt(t.textContent, 10); actif.click(); return new Promise(function (res) { setTimeout(function () { res(parseInt(t.textContent, 10) === avant + 1); }, 150); }); } }
      ],
      hints: [
        "Le composant : `const CarteProduit = { props: { nom: String, prix: Number, epuise: Boolean }, template: '<article class=\"carte\">…</article>' }`. Dans le template, les props s'utilisent directement : `{{ nom }}`, `:disabled=\"epuise\"`.",
        "Le clic dans l'enfant : `<button class=\"add-panier\" :disabled=\"epuise\" @click=\"$emit('ajout')\">Ajouter</button>` (ou `this.$emit('ajout')` dans une méthode). L'enfant ignore TOUT du panier — il signale, point.",
        "Côté parent : `components: { 'carte-produit': CarteProduit }` puis dans le gabarit : `<carte-produit v-for=\"p in produits\" :key=\"p.id\" :nom=\"p.nom\" :prix=\"p.prix\" :epuise=\"p.epuise\" @ajout=\"panierTotal++\" />`."
      ],
      solution: {
        lang: 'js', label: 'app.js — solution commentée',
        code:
`import { createApp } from 'vue';

/* ===== Composant enfant : contrat clair, zéro connaissance du parent ===== */
const CarteProduit = {
  // Props TYPÉES : le contrat d'entrée du composant
  props: {
    nom: String,
    prix: Number,
    epuise: Boolean
  },
  template: '<article class="carte">'
    + '<span class="badge" v-if="epuise">Épuisé</span>'
    + '<h2>{{ nom }}</h2>'
    + '<span class="prix">{{ prix.toLocaleString("fr-FR") }} FCFA</span>'
    + '<button class="add-panier" :disabled="epuise" @click="$emit(\'ajout\')">'
    + 'Ajouter au panier</button></article>'
};

/* ===== Parent : détient l'état, décide, écoute ===== */
createApp({
  components: { 'carte-produit': CarteProduit },
  data() {
    return {
      panierTotal: 0,
      produits: [
        { id: 1, nom: 'Gari fin 25 kg', prix: 13500, epuise: false },
        { id: 2, nom: 'Huile rouge 5 L', prix: 8500, epuise: false },
        { id: 3, nom: 'Ignames (botte)', prix: 4200, epuise: true }
      ]
    };
  }
}).mount('#app');

/* ===== Gabarit (index.html, dans #catalogue) =====
<carte-produit
  v-for="p in produits"
  :key="p.id"
  :nom="p.nom"
  :prix="p.prix"
  :epuise="p.epuise"
  @ajout="panierTotal++">
</carte-produit>
*/`,
        explain: "Le modèle mental à garder : **un composant est un contrat**. En entrée, les props — déclarées avec leurs types, ce qui documente l'usage et fait hurler Vue en console si tu passes une chaîne là où un nombre est attendu. En sortie, les événements émis — `$emit('ajout')` dit « il s'est passé ça », sans savoir qui écoute ni ce qui sera fait. Le parent seul possède l'état `panierTotal` et décide de son sort.\n\nCette asymétrie — **props down, events up** — est ce qui garde l'application lisible quand elle grandit : les données circulent dans un seul sens de la hiérarchie, les modifications remontent par des signaux explicites. Un enfant qui irait modifier l'état de son parent directement créerait des couplages invisibles ; ici, le parent pourrait afficher le total, ou garder un vrai panier détaillé, ou envoyer une requête réseau : l'enfant n'en sait rien, et n'a pas à le savoir."
      },
      criteria: [
        "Composant `carte-produit` avec props déclarées et typées.",
        "L'événement `ajout` voyage de l'enfant vers l'état du parent.",
        "L'état épuisé est complet : badge + bouton désactivé.",
        "Le catalogue parent nourrit les cartes par `v-for` + bindings.",
        "Zéro couplage inverse (l'enfant ne touche rien du parent)."
      ],
      variants: [
        "Émets un événement avec charge utile : `@ajout=\"ajouter(p)\"` (méthode parent) et garde un vrai panier détaillé (noms + quantités).",
        "Ajoute une prop optionnelle `promo` (Number, default 0) affichant le prix barré et le prix remisé.",
        "Passe le catalogue dans un **slot** : une carte composite avec contenu libre entre les balises du composant."
      ],
      related: ['vue-props', 'vue-emits', 'vue-composants', 'vue-v-for']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-vue-tontine',
      level: 'projet',
      title: 'Projet : le carnet de tontine digital',
      icon: 'savings',
      free: false,
      minutes: 75,
      kind: 'dom',
      scriptType: 'module',
      head: _VUE_HEAD,
      readySelector: '#app',
      readyMinLen: 40,
      readyWait: 500,
      context: "La trésorière de la tontine des couturières tient encore son carnet papier : 12 membres, cotisation hebdomadaire de 5 000 F, un tour de receveuse par semaine. Erreurs de totaux, oublis de retardataires… Le groupe la pousse à passer au numérique.",
      statement: "Projet de synthèse Vue : le **carnet de tontine** complet, en un seul écran réactif. État de départ fourni (5 membres). Fonctionnalités :\n\n1. **Table des membres** : `ul#membres` rendu depuis le tableau (nom, cotisations payées — nombre de semaines réglières, statut). Chaque membre a un bouton `#payer` (« +1 semaine ») qui incrémente ses cotisations payées ; statut « À jour » affiché quand payées == semaines écoulées (5 au départ), sinon « 2 semaines de retard ».\n2. **Inscription** : formulaire `#form-membre` (input `#nom-membre` v-model + submit) ajoutant un membre à 0 semaine payée.\n3. **Totaux dérivés** : `<strong id=\"cagnotte\">` = total des cotisations (somme des semaines payées × 5 000 F) ; `<strong id=\"a-jour\">` = nombre de membres à jour ; `<strong id=\"retard\">` = nombre en retard. Tout computed.\n4. **Recherche** `input#recherche` (v-model) filtrant la liste en direct (insensible à la casse).\n5. **Prochaine bénéficiaire** : `<p id=\"beneficiaire\">` affiche le premier membre à jour non encore servi (champ `servie` booléen, ajoute-le) — un bouton `#servir` la marque servie et passe à la suivante.\n\nAutorise-toi méthodes, computed, `v-for`, `v-model`, `@click` — tout le module se rassemble. Sois particulièrement vigilant sur les dérivations : aucun total stocké dans `data()`.",
      constraints: [
        "Cagnotte, compteurs à jour/en retard et bénéficiaire : `computed` uniquement, recalcul réactif.",
        "Bouton `#payer` : mutation détectable par Vue sur l'objet membre.",
        "Recherche : filtration en computed, insensible à la casse.",
        "Ajout de membre : garde champ vide + réinitialisation ; 0 semaine payée à l'arrivée.",
        "`#servir` marque la bénéficiaire courante et révèle la suivante automatiquement."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: true, code:
`<div id="app">
  <main class="carte-app">
    <h1>Tontine des couturières — semaine 5</h1>
    <dl class="totaux">
      <div><dt>Cagnotte</dt><dd><strong id="cagnotte"></strong></dd></div>
      <div><dt>À jour</dt><dd><strong id="a-jour"></strong></dd></div>
      <div><dt>En retard</dt><dd><strong id="retard"></strong></dd></div>
    </dl>
    <!-- p#beneficiaire + bouton#servir -->
    <!-- input#recherche (v-model) -->
    <!-- form#form-membre : input#nom-membre + submit -->
    <!-- ul#membres : nom, statut, bouton #payer -->
  </main>
</div>
` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: start center; min-height: 95vh; background: #edf3fb; }
.carte-app { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(520px, 92vw);
  box-shadow: 0 10px 26px rgba(20, 50, 110, .12); margin: 18px 0; }
h1 { font-size: 19px; margin: 0 0 14px; }
.totaux { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 0 0 12px; }
.totaux div { background: #f0f5fc; border-radius: 14px; padding: 12px; text-align: center; }
.totaux dt { font-size: 12px; color: #4d6690; }
.totaux dd { margin: 2px 0 0; font-size: 17px; font-weight: 800; }
#beneficiaire { background: #eef9f1; border: 1px solid #cdeed8; border-radius: 12px;
  padding: 10px 14px; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
#beneficiaire button { background: #1f9d6c; }
input[type="text"], input[type="search"] { font: inherit; padding: 10px 13px; border-radius: 11px;
  border: 1.5px solid #c3d3e2; outline: none; box-sizing: border-box; }
form { display: flex; gap: 8px; margin: 10px 0 14px; }
form input { flex: 1; }
button { font: inherit; font-weight: 700; border: none; border-radius: 11px;
  padding: 10px 15px; cursor: pointer; color: #fff; background: #2a60a8; }
#recherche { width: 100%; margin-bottom: 10px; }
ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
li { display: flex; align-items: center; justify-content: space-between; gap: 8px;
  background: #f5f8fc; border-radius: 10px; padding: 9px 12px; font-size: 14px; }
li .statut { font-size: 12.5px; color: #4d6690; }
li .ok { color: #1f9d6c; font-weight: 700; }
li button { padding: 7px 12px; font-size: 12.5px; background: #1f9d6c; }` },
        { key: 'js', label: 'app.js', lang: 'js', editable: true, code:
`import { createApp } from 'vue';

createApp({
  data() {
    return {
      semaines: 5,
      cotisation: 5000,
      nomMembre: '',
      recherche: '',
      membres: [
        { id: 1, nom: 'Aminatou S.', payees: 5, servie: false },
        { id: 2, nom: 'Soundous B.', payees: 3, servie: false },
        { id: 3, nom: 'Rebecca A.', payees: 5, servie: true },
        { id: 4, nom: 'Koffi D.', payees: 4, servie: false },
        { id: 5, nom: 'Mama R.', payees: 5, servie: false }
      ]
    };
  },
  computed: {
    // cagnotte, aJour, enRetard, membresFiltres, beneficiaire
  },
  methods: {
    // payer(m), ajouterMembre(), servir()
  }
}).mount('#app');
` }
      ],
      tests: [
        { name: 'La cagnotte est la somme des cotisations payées × 5 000 F', help: "computed : membres.reduce((s, m) => s + m.payees, 0) * cotisation. Au départ : 22 × 5 000 = 110 000.",
          check: function (doc) { var c = doc.querySelector('#cagnotte'); return !!c && parseInt(c.textContent.replace(/\D/g, ''), 10) === 110000; } },
        { name: 'Le compteur d\u2019en retard est exact (2 au départ)', help: "computed : membres.filter(m => m.payees < semaines).length.",
          check: function (doc) { var r = doc.querySelector('#retard'); return !!r && parseInt(r.textContent.replace(/\D/g, ''), 10) === 2; } },
        { name: 'Payer une semaine pour Soundous la fait passer à jour et augmente la cagnotte', help: "payer(m) : m.payees++ — Vue détecte la mutation de l'objet membre (réactif par proxy).",
          check: function (doc) { var lis = doc.querySelectorAll('#membres li'); var cible = null; lis.forEach(function (li) { if (/Soundous/.test(li.textContent)) cible = li; }); if (!cible) return false; var b = cible.querySelector('button'); b.click(); b.click(); return new Promise(function (res) { setTimeout(function () { var c = doc.querySelector('#cagnotte'); var retard = doc.querySelector('#retard'); res(parseInt(c.textContent.replace(/\D/g, ''), 10) === 120000 && parseInt(retard.textContent.replace(/\D/g, ''), 10) === 1); }, 200); }); } },
        { name: 'Inscrire un membre l\u2019ajoute à la liste avec 0 semaine payée', help: "ajouterMembre : trim + garde + push({ id: Date.now(), nom, payees: 0, servie: false }) + reset.",
          check: function (doc, win) { var inp = doc.querySelector('#nom-membre'); var form = doc.querySelector('#form-membre'); var ul = doc.querySelector('#membres'); if (!inp || !form || !ul) return false; inp.value = 'Élodie T.'; inp.dispatchEvent(new win.Event('input', { bubbles: true })); form.dispatchEvent(new win.Event('submit', { cancelable: true, bubbles: true })); return new Promise(function (res) { setTimeout(function () { res(/Élodie T./.test(ul.textContent) && inp.value === ''); }, 200); }); } },
        { name: 'La recherche filtre la liste en direct', help: "computed membresFiltres : filter sur le nom en minuscules — 'rebecca' → 1 ligne.",
          check: function (doc, win) { var r = doc.querySelector('#recherche'); if (!r) return false; r.value = 'rebecca'; r.dispatchEvent(new win.Event('input', { bubbles: true })); return new Promise(function (res) { setTimeout(function () { res(doc.querySelectorAll('#membres li').length === 1); }, 200); }); } },
        { name: 'La prochaine bénéficiaire est Aminatou, puis change après « servir »', help: "computed : premier membre (payees === semaines && !servie) ; servir() marque servie = true — la suivante apparaît automatiquement.",
          check: function (doc) { var b = doc.querySelector('#beneficiaire'); if (!b || !/Aminatou/.test(b.textContent)) return false; var btn = doc.querySelector('#servir'); if (!btn) return false; btn.click(); return new Promise(function (res) { setTimeout(function () { res(/Mama R./.test(doc.querySelector('#beneficiaire').textContent)); }, 200); }); } }
      ],
      hints: [
        "Les computed d'abord : `cagnotte() { return this.membres.reduce((s, m) => s + m.payees, 0) * this.cotisation; }`, `aJour()`, `enRetard()`, `membresFiltres()`, `beneficiaire() { return this.membres.find(m => m.payees >= this.semaines && !m.servie) || null; }`.",
        "Les méthodes : `payer(m) { if (m.payees < this.semaines) m.payees++; }` (la mutation d'une propriété d'objet existant EST suivie par Vue ; inutile de remplacer le tableau). `servir() { if (this.beneficiaire) this.beneficiaire.servie = true; }`.",
        "La recherche et la liste : `membresFiltres() { const q = this.recherche.trim().toLowerCase(); return this.membres.filter(m => m.nom.toLowerCase().includes(q)); }` et le v-for consomme `membresFiltres`, jamais `membres` directement."
      ],
      solution: {
        lang: 'js', label: 'app.js — solution commentée',
        code:
`import { createApp } from 'vue';

createApp({
  data() {
    return {
      semaines: 5,          // semaines écoulées dans le cycle
      cotisation: 5000,     // FCFA par semaine
      nomMembre: '',
      recherche: '',
      membres: [
        { id: 1, nom: 'Aminatou S.', payees: 5, servie: false },
        { id: 2, nom: 'Soundous B.', payees: 3, servie: false },
        { id: 3, nom: 'Rebecca A.', payees: 5, servie: true },
        { id: 4, nom: 'Koffi D.', payees: 4, servie: false },
        { id: 5, nom: 'Mama R.', payees: 5, servie: false }
      ]
    };
  },

  computed: {
    cagnotte() {
      return this.membres.reduce((s, m) => s + m.payees, 0) * this.cotisation;
    },
    aJour() {
      return this.membres.filter((m) => m.payees >= this.semaines).length;
    },
    enRetard() {
      return this.membres.length - this.aJour;
    },
    membresFiltres() {
      const q = this.recherche.trim().toLowerCase();
      return this.membres.filter((m) => m.nom.toLowerCase().includes(q));
    },
    /* Première membre à jour non encore servie — pure dérivation */
    beneficiaire() {
      return this.membres.find((m) => m.payees >= this.semaines && !m.servie) || null;
    }
  },

  methods: {
    payer(m) {
      if (m.payees < this.semaines) m.payees++; // mutation suivie par Vue
    },
    ajouterMembre() {
      const nom = this.nomMembre.trim();
      if (nom === '') return;
      this.membres.push({ id: Date.now(), nom: nom, payees: 0, servie: false });
      this.nomMembre = '';
    },
    servir() {
      if (this.beneficiaire) this.beneficiaire.servie = true;
      // La suivante apparaît SEULE : beneficiaire est un computed
    }
  }
}).mount('#app');

/* ===== Gabarit principal (extraits) =====
  <p id="beneficiaire" v-if="beneficiaire">
    Prochaine bénéficiaire : <strong>{{ beneficiaire.nom }}</strong>
    <button id="servir" @click="servir">Marquer servie</button>
  </p>
  <ul id="membres">
    <li v-for="m in membresFiltres" :key="m.id">
      <span>{{ m.nom }}</span>
      <span class="statut" :class="{ ok: m.payees >= semaines }">
        {{ m.payees >= semaines ? 'À jour' : (semaines - m.payees) + ' sem. de retard' }}
      </span>
      <button id="payer" @click="payer(m)" :disabled="m.payees >= semaines">+1 semaine</button>
    </li>
  </ul>
*/`,
        explain: "Le projet illustre le réflexe qui distingue une appli Vue solide d'un enchevêtrement : **data = faits atomiques ; computed = tout ce qui se calcule**. Faits : membres, leurs semaines payées, servies ou non, plus deux paramètres. Tout le reste — cagnotte, compteurs, liste filtrée, prochaine bénéficiaire — vit en computed. Cherche dans la solution une seule synchronisation manuelle : il n'y en a pas, y compris après `servir()` où la bénéficiaire suivante apparaît « toute seule ».\n\nNote la mutation directe `m.payees++`. La réactivité de Vue 3 (Proxy) suit chaque propriété de chaque objet : muter est accepté et détecté — l'immutabilité stricte, obligatoire en React, n'est pas l'idiome de Vue. Mais attention à la frontière de la règle : la mutation convient aux propriétés EXISTANTES. Ajouter une nouvelle clé à un objet après coup exige prudence (en Vue 3, c'est détecté aussi, reste qu'initialiser toutes les clés d'un objet dès sa création reste la pratique la plus sûre).\n\nEnfin, observe comment le `v-for` consomme `membresFiltres` (computed) et non `membres` : la recherche devient un simple filtre déclaratif en amont du rendu."
      },
      criteria: [
        "Totaux dérivés (cagnotte, à jour, retard) exacts en permanence.",
        "« +1 semaine » fonctionnel et borné, rattrapage visible dans les compteurs.",
        "Inscription et recherche réactives, y compris pour les nouveaux membres.",
        "La bénéficiaire défile correctement, sans aucune synchronisation manuelle.",
        "Toutes les dérivations en computed ; les méthodes restent courtes et lisibles."
      ],
      variants: [
        "Ajoute un historique : chaque paiement empile une ligne `{ qui, quand }` affichée en bas (v-for second tableau).",
        "Ajoute le récapitulatif par membre « à recevoir : semaines × cotisation × n membres » quand vient son tour.",
        "Transforme les totaux en **composant** `carte-total` réutilisé trois fois (props libellé/valeur).",
        "Défi : persistance locale (`localStorage`) via `watch` profond sur `membres` (en local, pas dans l'atelier)."
      ],
      related: ['vue-computed', 'vue-v-model', 'vue-v-for', 'vue-v-on', 'vue-watch']
    }
  ]
};
