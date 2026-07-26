/* ============================================================
   exo-react.js — Exercices pratiques : React JS
   Exécution via CDN (React 18 UMD + Babel standalone) dans
   l'iframe sandboxée. Nécessite une connexion au premier test.
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

var _RX_HEAD =
  '<scr' + 'ipt src="https://unpkg.com/react@18.3.1/umd/react.development.js"></scr' + 'ipt>' +
  '<scr' + 'ipt src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></scr' + 'ipt>' +
  '<scr' + 'ipt src="https://unpkg.com/@babel/standalone@7.26.2/babel.min.js"></scr' + 'ipt>';

window.DEVDOCS_EXO.react = {
  module: 'react',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-react-compteur-limite',
      level: 'fonda',
      title: 'Le compteur borné avec useState',
      icon: 'exposure_plus_1',
      free: true,
      minutes: 20,
      kind: 'dom',
      scriptType: 'babel',
      head: _RX_HEAD,
      readySelector: '#root',
      readyMinLen: 10,
      readyWait: 500,
      context: "La salle de sport « Forme+ » de Cotonou limite ses cours collectifs à 20 inscrits. Le coach gère les inscriptions depuis son téléphone : + quand quelqu'un s'inscrit, − quand quelqu'un annule — jamais plus de 20, jamais moins de 0.",
      statement: "On passe à React, et avec lui au **parc à état** : tu ne toucheras plus jamais le DOM à la main. Ici, ton unique outil est le hook `useState`.\n\nConstruis un composant `App` qui gère le nombre d'inscrits :\n\n- Un état `const [inscrits, setInscrits] = useState(0)` — c'est la **seule** source de vérité.\n- Le nombre s'affiche dans `<span id=\"valeur\">`.\n- Deux boutons `#inc` (« + Inscription ») et `#dec` (« − Annulation ») modifient l'état via `setInscrits`.\n- Les **bornes bloquantes** : à 20, le bouton `#inc` reçoit l'attribut `disabled` ; à 0, c'est `#dec`. Un message conditionnel `#complet` apparaît quand la salle est pleine (« Cours complet — liste d'attente ouverte »), sinon il n'existe pas dans le DOM.\n\nLe déclic à chercher : tu ne dis plus « change le texte » puis « désactive le bouton » — tu décris l'interface **en fonction de l'état**, et React se charge des modifications du DOM. Tout (affichage, disabled, message) se déduit de `inscrits`.",
      constraints: [
        "Un seul `useState` pour le nombre ; aucune manipulation directe du DOM (`textContent` interdit).",
        "Mise à jour via la forme fonctionnelle ou valeur calculée depuis l'état courant : jamais de lecture du DOM.",
        "`disabled` sur les boutons aux bornes 0 et 20 (attribut réel, pas une classe visuelle).",
        "`#complet` dans le DOM **uniquement** quand `inscrits === 20` (rendu conditionnel).",
        "Le JSX reste simple : un `main.carte` englobant titre, compteur, boutons."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code: `<div id="root"></div>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eef2f7; }
.carte { background: #fff; border-radius: 22px; padding: 26px 30px; text-align: center;
  box-shadow: 0 12px 30px rgba(10, 40, 90, .10); max-width: 340px; }
h1 { font-size: 19px; margin: 0 0 4px; }
#valeur { font-size: 52px; font-weight: 800; display: block; margin: 8px 0;
  font-variant-numeric: tabular-nums; }
.actions { display: flex; gap: 10px; justify-content: center; margin-top: 12px; }
button { font: inherit; font-weight: 700; border: none; border-radius: 999px;
  padding: 10px 18px; cursor: pointer; color: #fff; background: #1d6fb8; }
button:disabled { opacity: .4; cursor: not-allowed; }
#complet { color: #b02a37; font-weight: 600; font-size: 13.5px; margin-top: 10px; }` },
        { key: 'js', label: 'app.jsx', lang: 'js', editable: true, code:
`const { useState } = React;

function App() {
  // 1. État : const [inscrits, setInscrits] = useState(0)
  // 2. Rendu : tout se DÉDUIT de l'état (valeur, disabled, message)
  return (
    <main className="carte">
      <h1>Cours collectif — jeudi 18 h</h1>
      {/* À toi : span#valeur, boutons #inc #dec, message #complet */}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
` }
      ],
      tests: [
        { name: 'Le clic sur #inc augmente la valeur affichée', help: "setInscrits(inscrits + 1) — l'affichage suit, sans toucher au DOM (React le fait pour toi).",
          check: function (doc) { var v = doc.querySelector('#valeur'); var b = doc.querySelector('#inc'); if (!v || !b) return false; var avant = parseInt(v.textContent, 10); b.click(); return parseInt(v.textContent, 10) === avant + 1; } },
        { name: 'Le clic sur #dec diminue la valeur affichée', help: "Même logique descendante, toujours via setInscrits.",
          check: function (doc) { var v = doc.querySelector('#valeur'); var inc = doc.querySelector('#inc'); var dec = doc.querySelector('#dec'); inc.click(); inc.click(); var avant = parseInt(v.textContent, 10); dec.click(); return parseInt(v.textContent, 10) === avant - 1; } },
        { name: 'À 0, le bouton #dec est réellement disabled', help: "disabled={inscrits === 0} — et n'oublie pas de repasser la valeur à 0 pour le vérifier (l'état est déjà à 0 au démarrage si le test précédent a annulé).",
          check: function (doc) { var v = doc.querySelector('#valeur'); var dec = doc.querySelector('#dec'); var inc = doc.querySelector('#inc'); var n = parseInt(v.textContent, 10); for (var i = 0; i < n + 2; i++) dec.click(); return dec.disabled === true && parseInt(v.textContent, 10) === 0; } },
        { name: 'À 20, #inc est disabled et le message complet apparaît', help: "disabled={inscrits === 20} sur #inc ; {inscrits === 20 && <p id=\"complet\">…} pour le message (conditionnel, pas juste caché).",
          check: function (doc) { var v = doc.querySelector('#valeur'); var inc = doc.querySelector('#inc'); var n = parseInt(v.textContent, 10); for (var i = 0; i < 25 - n; i++) inc.click(); var complet = doc.querySelector('#complet'); return inc.disabled === true && parseInt(v.textContent, 10) === 20 && !!complet && complet.textContent.trim().length > 5; } },
        { name: 'Redescendre sous 20 fait disparaître le message et réactive #inc', help: "Le rendu conditionnel doit réagir dans les deux sens : tout se recalcule à chaque changement d'état.",
          check: function (doc) { var dec = doc.querySelector('#dec'); var inc = doc.querySelector('#inc'); dec.click(); return !doc.querySelector('#complet') && inc.disabled === false; } }
      ],
      hints: [
        "Le squelette : `const [inscrits, setInscrits] = useState(0);` puis dans le JSX `<span id=\"valeur\">{inscrits}</span>`. Les accolades `{}` insèrent la valeur — c'est toute la magie du JSX.",
        "Les boutons : `<button id=\"inc\" onClick={() => setInscrits(inscrits + 1)}>+ Inscription</button>`. Pour les bornes : `disabled={inscrits >= 20}` et `disabled={inscrits <= 0}` — l'expression du disabled se recalcule à chaque rendu.",
        "Le message : `{inscrits === 20 && <p id=\"complet\">Cours complet — liste d'attente ouverte</p>}`. En JSX, `condition && <élément>` n'affiche l'élément que si la condition est vraie. Pas besoin de if/else pour un cas si simple."
      ],
      solution: {
        lang: 'js', label: 'app.jsx — solution commentée',
        code:
`const { useState } = React;

function App() {
  // État unique : la SEULE chose que le composant doit se rappeler.
  const [inscrits, setInscrits] = useState(0);
  const CAPACITE = 20;

  return (
    <main className="carte">
      <h1>Cours collectif — jeudi 18 h</h1>

      {/* L'affichage LIT l'état ; il ne le stocke pas */}
      <span id="valeur">{inscrits}</span>
      <p>{inscrits <= 1 ? 'inscrit' : 'inscrits'} sur {CAPACITE}</p>

      {/* disabled est une EXPRESSION : recalculée à chaque rendu */}
      <div className="actions">
        <button id="dec" disabled={inscrits <= 0}
                onClick={() => setInscrits(inscrits - 1)}>− Annulation</button>
        <button id="inc" disabled={inscrits >= CAPACITE}
                onClick={() => setInscrits(inscrits + 1)}>+ Inscription</button>
      </div>

      {/* Rendu conditionnel : le paragraphe n'existe qu'à 20 inscrits */}
      {inscrits === CAPACITE && (
        <p id="complet">Cours complet — liste d'attente ouverte</p>
      )}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
        explain: "Compare avec l'exercice JavaScript du compteur : là-bas tu maintenais la valeur, puis tu écrivais le texte, puis tu vidais le message — trois gestes synchronisés à la main. Ici, tu déclares une seule fois « l'affichage, c'est `inscrits` », « désactivé, c'est `inscrits >= 20` » et React rejoue ces formules à chaque changement d'état. **L'interface devient une fonction de l'état** : c'est la définition même de React.\n\nDeux habitudes à ancrer dès maintenant. La mise à jour passe toujours par le setter (`setInscrits(inscrits + 1)`) : modifier la variable directement ne déclencherait aucun rendu, l'écran resterait figé. Et le rendu conditionnel `condition && <p>…` n'est pas un détail cosmétique : l'élément est réellement **absent** du DOM quand la condition est fausse — aucun `display:none` coquillant, aucune donnée fantôme pour les lecteurs d'écran."
      },
      criteria: [
        "Les boutons modifient l'affichage via `useState` uniquement.",
        "Les bornes 0 et 20 désactivent réellement les bons boutons (`disabled`).",
        "Le message « complet » n'existe dans le DOM qu'à 20 inscrits, dans les deux sens.",
        "Le compteur ne dépasse jamais la capacité, même en cliquant frénétiquement.",
        "Aucune manipulation directe du DOM dans ton code."
      ],
      variants: [
        "Ajoute la file d'attente : au-delà de 20, un second compteur `attente` s'incrémente et s'affiche.",
        "Remplace l'incrément figé par la forme fonctionnelle `setInscrits(prev => prev + 1)` et explique quand elle est indispensable.",
        "Ajoute un bouton « Session suivante » qui remet `inscrits` A 0 avec une confirmation `window.confirm`."
      ],
      related: ['rx-state', 'rx-evenements', 'rx-composants-props', 'rx-concepts']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-react-cartes-etal',
      level: 'fonda',
      title: 'Les cartes de l\u2019étal : props et listes',
      icon: 'view_agenda',
      free: false,
      minutes: 30,
      kind: 'dom',
      scriptType: 'babel',
      head: _RX_HEAD,
      readySelector: '#root',
      readyMinLen: 10,
      readyWait: 500,
      context: "« Marché Navi » a 40 produits en base. Écrire 40 cartes à la main est exclu ; dupliquer-coller-modifier est pire. Il faut UN composant CarteProduit, nourri par des données via les props, et répété par une liste.",
      statement: "Deux concepts indissociables dans cet exercice : le **composant réutilisable à props** et le **rendu de liste avec `map` et `key`**.\n\nÀ construire :\n\n1. Un tableau `PRODUITS` (fourni dans le starter) avec 4 produits `{ id, nom, prix, stock }`.\n2. Un composant `CarteProduit({ nom, prix, stock })` qui affiche une carte `article.carte` : nom dans un `<h2>`, prix dans un `<span className=\"prix\">`, et un badge `<span className=\"badge-epuise\">Épuisé</span>` **uniquement si `stock === 0`** (sinon rien dans le DOM).\n3. Dans `App`, la liste : `PRODUITS.map(p => <CarteProduit key={p.id} nom={p.nom} prix={p.prix} stock={p.stock} />)` dans `section#catalogue`.\n4. Un compteur global : pied de page `<p id=\"pied\">4 produits — 3 disponibles</p>` calculé depuis le tableau (jamais écrit en dur).\n\nLa `key` n'est pas décorative : elle permet à React d'identifier chaque enfant d'une liste lors des mises à jour. Et garde en tête la règle d'airain : **les props se lisent, ne se modifient jamais**.",
      constraints: [
        "`CarteProduit` reçoit ses données uniquement via les props — aucun accès global au tableau depuis le composant.",
        "La liste est produite par `map` avec une `key` stable (`p.id`, jamais l'index des yeux fermés… et ici les ids existent, profites-en).",
        "Le badge « Épuisé » est conditionnel : absent du DOM quand `stock > 0`.",
        "Le pied de page est calculé (`length`, `filter`), pas écrit en dur.",
        "Rien d'autre dans le DOM que ce que les données décrivent."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code: `<div id="root"></div>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { max-width: 760px; margin: 0 auto; background: #f6f1e7; }
h1 { font-size: 22px; color: #5b3a10; }
#catalogue { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.carte { background: #fff; border-radius: 16px; padding: 16px;
  box-shadow: 0 8px 20px rgba(90, 62, 10, .10); position: relative; }
.carte h2 { font-size: 16px; margin: 0 0 4px; }
.prix { font-weight: 800; color: #b8860b; }
.badge-epuise { position: absolute; top: 12px; right: 12px; background: #f8d7da;
  color: #842029; font-size: 11.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
#pied { color: #8a7146; font-size: 13px; margin-top: 16px; }` },
        { key: 'js', label: 'app.jsx', lang: 'js', editable: true, code:
`const PRODUITS = [
  { id: 'gari', nom: 'Gari fin de Savalou', prix: 13500, stock: 42 },
  { id: 'igname', nom: 'Ignames de Zagnanado', prix: 4200, stock: 0 },
  { id: 'huile', nom: 'Huile rouge 5 L', prix: 8500, stock: 15 },
  { id: 'tapioca', nom: 'Tapioca premium', prix: 15500, stock: 8 }
];

// 1. Composant CarteProduit({ nom, prix, stock })
// 2. App : section#catalogue avec PRODUITS.map(...) + p#pied calculé

function App() {
  return (
    <main>
      <h1>L'étal du jour</h1>
      {/* À toi */}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
` }
      ],
      tests: [
        { name: 'Les 4 produits s\u2019affichent en cartes', help: "PRODUITS.map(p => <CarteProduit key={p.id} … />) dans section#catalogue.",
          check: function (doc) { var c = doc.querySelector('#catalogue'); return !!c && c.querySelectorAll('article.carte').length === 4; } },
        { name: 'Chaque carte montre nom et prix de SON produit', help: "Les données arrivent via les props : carte 2 = 'Ignames de Zagnanado', pas une copie de la carte 1.",
          check: function (doc) { var cartes = doc.querySelectorAll('#catalogue article.carte'); if (cartes.length < 2) return false; var textes = []; cartes.forEach(function (c) { textes.push(c.textContent); }); return /Ignames/.test(textes.join(' ')) && /Gari fin/.test(textes.join(' ')); } },
        { name: 'Le badge Épuisé n\u2019apparaît que sur le produit à stock 0', help: "{stock === 0 && <span className=\"badge-epuise\">Épuisé</span>} — exactement 1 badge pour l'igname.",
          check: function (doc) { var badges = doc.querySelectorAll('.badge-epuise'); if (badges.length !== 1) return false; var carte = badges[0].closest('article.carte'); return carte && /Ignames/.test(carte.textContent); } },
        { name: 'Le pied de page compte les produits et les disponibles', help: "Calculé : PRODUITS.filter(p => p.stock > 0).length + '/' ou '- '… '…3 disponibles'.",
          check: function (doc) { var p = doc.querySelector('#pied'); return !!p && /4/.test(p.textContent) && /3/.test(p.textContent) && /disponible/i.test(p.textContent); } }
      ],
      hints: [
        "Le composant : `function CarteProduit({ nom, prix, stock }) { return (<article className=\"carte\">…</article>); }` — déstructure les props dans la signature, c'est l'idiome le plus lisible.",
        "Le badge : `{stock === 0 && <span className=\"badge-epuise\">Épuisé</span>}` — la condition court-circuite le JSX quand stock > 0.",
        "La liste : `{PRODUITS.map(p => <CarteProduit key={p.id} nom={p.nom} prix={p.prix} stock={p.stock} />)}`. Et le pied : `{PRODUITS.filter(p => p.stock > 0).length}` pour les disponibles."
      ],
      solution: {
        lang: 'js', label: 'app.jsx — solution commentée',
        code:
`const PRODUITS = [
  { id: 'gari', nom: 'Gari fin de Savalou', prix: 13500, stock: 42 },
  { id: 'igname', nom: 'Ignames de Zagnanado', prix: 4200, stock: 0 },
  { id: 'huile', nom: 'Huile rouge 5 L', prix: 8500, stock: 15 },
  { id: 'tapioca', nom: 'Tapioca premium', prix: 15500, stock: 8 }
];

// Composant réutilisable : ses données arrivent par les props. Point.
function CarteProduit({ nom, prix, stock }) {
  return (
    <article className="carte">
      {/* Badge conditionnel : absent du DOM si du stock existe */}
      {stock === 0 && <span className="badge-epuise">Épuisé</span>}
      <h2>{nom}</h2>
      <span className="prix">{prix.toLocaleString('fr-FR')} FCFA</span>
    </article>
  );
}

function App() {
  const disponibles = PRODUITS.filter(function (p) { return p.stock > 0; }).length;

  return (
    <main>
      <h1>L'étal du jour</h1>

      {/* map transforme des DONNÉES en ÉLÉMENTS ; key identifie chaque enfant */}
      <section id="catalogue">
        {PRODUITS.map(function (p) {
          return <CarteProduit key={p.id} nom={p.nom} prix={p.prix} stock={p.stock} />;
        })}
      </section>

      {/* Le pied est CALCULÉ : si le catalogue change, il reste juste */}
      <p id="pied">{PRODUITS.length} produits — {disponibles} disponibles</p>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
        explain: "Formule à mémoriser : **`tableau.map(donnée => <Composant {...props} />) = interface**. Quand les données passent de 4 à 400 produits, ton code ne change pas d'une ligne — c'est la scalabilité déclarative. Le composant `CarteProduit` ignore même l'existence du tableau : il reçoit `nom`, `prix`, `stock` en props et affiche. Cette ignorance est sa force : tu pourras le réutiliser pour la recherche, les favoris, les promotions...\n\nLa `key` mérite un parenthèse sérieux. React s'en sert pour apparier enfants anciens/nouveaux lors d'un nouveau rendu : avec `key={p.id}`, il sait exactement quel DOM correspond à quel produit et met à jour au plus juste. Avec l'index du tableau, un simple tri casserait cette correspondance et provoquerait des bugs visuels inexplicables. Règle : une valeur **stable et unique par donnée** — ici nos ids métier, parfaits pour le rôle."
      },
      criteria: [
        "Un composant `CarteProduit` à props, réutilisé 4 fois par `map`.",
        "Chaque carte affiche les données de SON produit.",
        "Le badge « Épuisé » apparaît une seule fois, sur le bon produit.",
        "Le pied calcule le total et les disponibles depuis le tableau.",
        "Les `key` utilisent `p.id`, stable et unique."
      ],
      variants: [
        "Ajoute un bouton « +1 panier » par carte qui incrémente un compteur total dans `App` (remontée d'état par callback — anticipe l'exercice suivant).",
        "Ajoute un tri « prix croissant / alphabétique » avec un `useState` pour le critère.",
        "Formate le prix avec une prop optionnelle `promo` (\u221215 %) barré + nouveau prix."
      ],
      related: ['rx-composants-props', 'rx-listes-cles', 'rx-concepts']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-react-formulaire-vendeuse',
      level: 'inter',
      title: 'Le formulaire contrôlé de la vendeuse',
      icon: 'edit_note',
      free: false,
      minutes: 40,
      kind: 'dom',
      scriptType: 'babel',
      head: _RX_HEAD,
      readySelector: '#root',
      readyMinLen: 10,
      readyWait: 600,
      context: "« Marché Navi » permet aux vendeuses d'ajouter un produit depuis le marché. Formulaire obligatoire : nom + prix. Pas de produit sans nom, pas de prix à zéro — le catalogue est la vitrine, la qualité des données est non négociable.",
      statement: "Tu vas construire un **formulaire contrôlé** complet : les champs lisent leur valeur dans l'état, et chaque frappe met à jour l'état via `onChange`. C'est la moitié des formulaires React du marché — l'autre moitié étant les bibliothèques qui automatisent ce même principe.\n\nÀ construire dans `App` :\n\n1. Deux états de champs : `nom` et `prix` ; un état `produits` (tableau initial fourni) ; un état `erreur` (chaîne vide au départ).\n2. Un formulaire `#form-ajout` : `input#nom` et `input#prix` **contrôlés** (`value={nom}` + `onChange`), bouton submit « Ajouter ».\n3. À la soumission (`onSubmit` sur le form, `preventDefault`) : si `nom` nettoyé est vide → `erreur` = « Le nom est obligatoire » ; si le prix n'est pas un nombre > 0 → « Prix invalide (supérieur à zéro attendu) » ; sinon ajout au tableau, champs réinitialisés, erreur effacée.\n4. L'erreur s'affiche dans `<p id=\"msg-erreur\">` uniquement quand elle existe.\n5. Le catalogue s'affiche sous forme de `ul#catalogue` (un `li` par produit : nom — prix), mis à jour à chaque ajout.\n\nLe fil conducteur : dans React, le `value` d'un champ **reflète** l'état ; il n'est plus une mémoire indépendante. Si tu oublies le `onChange`, le champ gèle — démo à faire une fois pour comprendre à jamais.",
      constraints: [
        "Champs **contrôlés** : `value={état}` + `onChange={(e) => setÉtat(e.target.value)}` obligatoires.",
        "Soumission via `onSubmit` du `form` avec `e.preventDefault()`.",
        "Validation métier côté React : nom non vide après `trim`, prix numérique strictement positif.",
        "Après ajout : champs réinitialisés (`setNom('')`, `setPrix('')`), erreur vidée.",
        "Le catalogue reflète `produits` à tout instant (pas de DOM ajouté à la main)."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code: `<div id="root"></div>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eef6ef; }
.app { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(440px, 92vw);
  box-shadow: 0 10px 26px rgba(20, 80, 40, .12); }
h1 { font-size: 19px; margin: 0 0 14px; }
form { display: grid; gap: 10px; margin-bottom: 16px; }
input { font: inherit; padding: 10px 13px; border-radius: 11px; border: 1.5px solid #c4d8c4; outline: none; }
input:focus { border-color: #2e7d32; }
button { font: inherit; font-weight: 700; border: none; border-radius: 12px;
  padding: 11px; cursor: pointer; color: #fff; background: #2e7d32; }
#msg-erreur { color: #b02a37; font-size: 13.5px; font-weight: 600; margin: 0; }
ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 7px; }
li { background: #f1f7f1; border-radius: 10px; padding: 9px 12px; font-size: 14.5px; }` },
        { key: 'js', label: 'app.jsx', lang: 'js', editable: true, code:
`const { useState } = React;

function App() {
  // États : nom, prix (champs contrôlés), produits, erreur
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Gari fin', prix: 13500 },
    { id: 2, nom: 'Huile rouge 5 L', prix: 8500 }
  ]);
  // À toi : nom, prix, erreur + ajouterProduit(e) + le JSX complet

  return (
    <main className="app">
      <h1>Ma boutique — ajouter un produit</h1>
      {/* form#form-ajout (input#nom, input#prix, bouton, p#msg-erreur?) */}
      {/* ul#catalogue depuis l'état produits */}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
` }
      ],
      tests: [
        { name: 'Les champs sont contrôlés (la saisie passe par l\u2019état)', help: "value={nom} onChange={…} — sans onChange, React fige le champ (essaie de taper sans !).",
          check: function (doc, win) { var inp = doc.querySelector('#nom'); if (!inp) return false; var setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set; setter.call(inp, 'Tapioca'); inp.dispatchEvent(new win.Event('input', { bubbles: true })); return inp.value === 'Tapioca'; } },
        { name: 'Soumettre ajoute le produit au catalogue', help: "onSubmit + preventDefault, puis setProduits([...produits, nouveau]).",
          check: function (doc, win) { var setV = function (el, v) { Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new win.Event('input', { bubbles: true })); }; var nom = doc.querySelector('#nom'); var prix = doc.querySelector('#prix'); var form = doc.querySelector('#form-ajout'); var ul = doc.querySelector('#catalogue'); if (!nom || !prix || !form || !ul) return false; setV(nom, 'Piment sec'); setV(prix, '1200'); form.dispatchEvent(new win.Event('submit', { cancelable: true, bubbles: true })); return /Piment sec/.test(ul.textContent); } },
        { name: 'Les champs se réinitialisent après l\u2019ajout', help: "setNom('') et setPrix('') juste après l'ajout réussi.",
          check: function (doc) { var nom = doc.querySelector('#nom'); return nom.value === ''; } },
        { name: 'Un nom vide affiche l\u2019erreur et n\u2019ajoute rien', help: "trim() avant validation ; setErreur('Le nom est obligatoire') ; NE PAS modifier produits.",
          check: function (doc, win) { var setV = function (el, v) { Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new win.Event('input', { bubbles: true })); }; var nom = doc.querySelector('#nom'); var prix = doc.querySelector('#prix'); var form = doc.querySelector('#form-ajout'); var ul = doc.querySelector('#catalogue'); var avant = ul.querySelectorAll('li').length; setV(nom, '   '); setV(prix, '500'); form.dispatchEvent(new win.Event('submit', { cancelable: true, bubbles: true })); var err = doc.querySelector('#msg-erreur'); return ul.querySelectorAll('li').length === avant && !!err && err.textContent.trim().length > 4; } },
        { name: 'Un prix invalide est refusé proprement', help: "Number(prix) > 0 requis ; 'abc' ou '0' → message d'erreur, pas d'ajout.",
          check: function (doc, win) { var setV = function (el, v) { Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new win.Event('input', { bubbles: true })); }; var nom = doc.querySelector('#nom'); var prix = doc.querySelector('#prix'); var form = doc.querySelector('#form-ajout'); var ul = doc.querySelector('#catalogue'); var avant = ul.querySelectorAll('li').length; setV(nom, 'Produit test'); setV(prix, 'abc'); form.dispatchEvent(new win.Event('submit', { cancelable: true, bubbles: true })); return ul.querySelectorAll('li').length === avant && doc.querySelector('#msg-erreur'); } }
      ],
      hints: [
        "États : `const [nom, setNom] = useState(''); const [prix, setPrix] = useState(''); const [erreur, setErreur] = useState('');`. Champs : `<input id=\"nom\" value={nom} onChange={(e) => setNom(e.target.value)} />`. Tes frappes écrivent dans l'état, qui réécrit le champ — la boucle contrôlée.",
        "Le submit : `function ajouterProduit(e) { e.preventDefault(); … }`. Validations d'abord (deux `if` avec `setErreur(...); return;`), ensuite seulement le chemin heureux : `setProduits([...produits, { id: Date.now(), nom: nomNettoye, prix: Number(prix) }])`.",
        "Réinitialisation dans le chemin heureux : `setNom(''); setPrix(''); setErreur('');`. L'erreur : `{erreur && <p id=\"msg-erreur\">{erreur}</p>}` placé avant le bouton."
      ],
      solution: {
        lang: 'js', label: 'app.jsx — solution commentée',
        code:
`const { useState } = React;

function App() {
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Gari fin', prix: 13500 },
    { id: 2, nom: 'Huile rouge 5 L', prix: 8500 }
  ]);
  // Champs contrôlés : l'état est la valeur, l'input en est le reflet
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [erreur, setErreur] = useState('');

  function ajouterProduit(e) {
    e.preventDefault(); // sinon rechargement + état perdu

    // Gardes métier : on ÉCHOUe vite, avec un message utile
    const nomPropre = nom.trim();
    if (nomPropre === '') { setErreur('Le nom du produit est obligatoire.'); return; }
    const prixNombre = Number(prix);
    if (!Number.isFinite(prixNombre) || prixNombre <= 0) {
      setErreur('Prix invalide : un montant supérieur à zéro est attendu.');
      return;
    }

    // Chemin heureux : ajout IMMUTABLE (nouveau tableau), champs remis à zéro
    setProduits([...produits, { id: Date.now(), nom: nomPropre, prix: prixNombre }]);
    setNom('');
    setPrix('');
    setErreur('');
  }

  return (
    <main className="app">
      <h1>Ma boutique — ajouter un produit</h1>

      <form id="form-ajout" onSubmit={ajouterProduit}>
        {/* Champs contrôlés : value LIT l'état, onChange l'ÉCRIT */}
        <input id="nom" type="text" placeholder="Nom du produit"
               value={nom} onChange={(e) => setNom(e.target.value)} />
        <input id="prix" type="text" inputMode="numeric" placeholder="Prix (FCFA)"
               value={prix} onChange={(e) => setPrix(e.target.value)} />

        {erreur && <p id="msg-erreur">{erreur}</p>}
        <button type="submit">Ajouter</button>
      </form>

      <ul id="catalogue">
        {produits.map((p) => (
          <li key={p.id}>{p.nom} — {p.prix.toLocaleString('fr-FR')} FCFA</li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
        explain: "Le formulaire contrôlé formalise un va-et-vient précis : `value={nom}` fait **descendre** l'état vers l'écran, `onChange` fait **remonter** la frappe vers l'état. La valeur vit à un seul endroit — le composant peut la valider, la transformer, la bloquer à tout moment. Essaie de retirer le `onChange` : le champ devient inaltérable, démonstration par l'absurde que l'état pilote l'écran et pas l'inverse.\n\nDeux points de méthode pro. Les validations sont des **gardes en tête de fonction** (`if …; return;`) : le chemin heureux reste plat et lisible, jamais noyé dans des `else`. Et l'ajout se fait par **immutabilité** — `[...produits, nouveau]` crée un nouveau tableau au lieu de muter l'ancien avec `push`. React détecte les changements par référence : un tableau muté en place peut passer inaperçu et l'écran ne se met pas à jour. Mémorise : `push` local OK avant setState, mais le state lui-même se remplace, il ne se trafique pas."
      },
      criteria: [
        "Champs réellement contrôlés (value + onChange).",
        "Ajout fonctionnel et visible immédiatement dans le catalogue.",
        "Nom vide ou prix invalide → erreur explicite, catalogue inchangé.",
        "Réinitialisation complète après ajout réussi.",
        "Mises à jour immutables de l'état `produits` (spread)."
      ],
      variants: [
        "Ajoute le compteur de catalogue « n produit(s) » recalculé automatiquement (dérivation, pas setState).",
        "Ajoute un bouton de suppression par ligne (filter par id).",
        "Ajoute le champ stock avec `parseInt` et affiche « stock faible » en orange sous 5."
      ],
      related: ['rx-formulaires', 'rx-state', 'rx-listes-cles', 'rx-evenements']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-react-todo-effets',
      level: 'inter',
      title: 'La todo-list qui mémorise : useEffect',
      icon: 'fact_check',
      free: false,
      minutes: 45,
      kind: 'dom',
      scriptType: 'babel',
      head: _RX_HEAD,
      readySelector: '#root',
      readyMinLen: 10,
      readyWait: 600,
      context: "La vendeuse de « Marché Navi » gère ses tâches du matin (passer commande, compter la caisse, vérifier les dates). Elle veut deux choses : voir dans l'onglet du navigateur combien de tâches restent ouvertes, et filtrer l'affichage — toutes, ou seulement celles qui restent à faire.",
      statement: "Cet exercice combine `useState`, `useEffect` et la **dérivation** : afficher le bon sous-ensemble sans dupliquer l'état. Trois missions :\n\n1. **Les tâches** : état `todos` (tableau d'objets `{ id, texte, faite }`, 3 exemples fournis). Ajout via formulaire contrôlé `#form-todo` (`input#nouvelle` + submit). Chaque `li` contient une `input[type=checkbox]` qui inverse `faite` pour la ligne, et le texte s'affiche dans un `<span>`.\n2. **L'effet de bord** : `useEffect` qui met à jour `document.title` en « Tâches (n à faire) » **à chaque changement** du nombre de tâches non faites. C'est ça, un effet : une synchronisation entre ton état React et quelque chose HORS de React (ici le titre de l'onglet).\n3. **Le filtre** : état `filtre` (`'toutes'` ou `'ouvertes'`) piloté par deux boutons `#voir-toutes` / `#voir-ouvertes`. La liste affichée se **calcule** depuis `todos` + `filtre` — jamais un second tableau d'état.\n\nLe piège classique serait de maintenir `todosOuverts` à côté et de le synchroniser à la main : deux sources, un divorce garanti. Une seule source de vérité, et tout le reste se dérive.",
      constraints: [
        "Un seul état de données (`todos`) ; le filtre dérive l'affichage au rendu (`todos.filter(...)`).",
        "`useEffect` avec le tableau de dépendances correct (recalcul à chaque changement du compte ouvert).",
        "Toggle via checkbox contrôlée : `checked={t.faite}` + `onChange` → mise à jour immutable (`map`).",
        "Ajout immutable (`spread`), id unique (`Date.now()`), pas de tâche vide.",
        "Le titre document toujours exact, même juste après un toggle ou un ajout."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code: `<div id="root"></div>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { display: grid; place-items: center; min-height: 95vh; background: #eef2f7; }
.app { background: #fff; border-radius: 22px; padding: 24px 28px; width: min(460px, 92vw);
  box-shadow: 0 10px 26px rgba(10, 40, 90, .12); }
h1 { font-size: 19px; margin: 0 0 12px; }
form { display: flex; gap: 8px; margin-bottom: 12px; }
input[type="text"] { flex: 1; font: inherit; padding: 10px 13px; border-radius: 11px;
  border: 1.5px solid #c3d3e2; outline: none; }
button { font: inherit; font-weight: 700; border: none; border-radius: 11px;
  padding: 10px 15px; cursor: pointer; color: #fff; background: #1d6fb8; }
.filtres { display: flex; gap: 8px; margin-bottom: 12px; }
.filtres button { background: #e8eef4; color: #274a6d; padding: 8px 14px; }
.filtres button.actif { background: #1d6fb8; color: #fff; }
ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
li { display: flex; align-items: center; gap: 10px; background: #f3f7fb;
  border-radius: 10px; padding: 9px 12px; font-size: 14.5px; }
li span.faite { text-decoration: line-through; color: #8a97a5; }` },
        { key: 'js', label: 'app.jsx', lang: 'js', editable: true, code:
`const { useState, useEffect } = React;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, texte: 'Passer la commande de gari', faite: true },
    { id: 2, texte: 'Compter la caisse du week-end', faite: false },
    { id: 3, texte: 'Vérifier les dates d\u2019expiration', faite: false }
  ]);
  // À toi : input (état), filtre (état), useEffect sur document.title,
  // ajouter(e), basculer(id), et le JSX (form#form-todo, input#nouvelle,
  // boutons #voir-toutes #voir-ouvertes, ul#liste)

  return (
    <main className="app">
      <h1>Matines de la boutique</h1>
      {/* À toi */}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
` }
      ],
      tests: [
        { name: 'Ajouter une tâche l\u2019affiche dans la liste', help: "Ajout immutable : setTodos([...todos, { id: Date.now(), texte: n, faite: false }]).",
          check: function (doc, win) { var inp = doc.querySelector('#nouvelle'); var form = doc.querySelector('#form-todo'); var ul = doc.querySelector('#liste'); if (!inp || !form || !ul) return false; Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set.call(inp, 'Appeler le grossiste'); inp.dispatchEvent(new win.Event('input', { bubbles: true })); form.dispatchEvent(new win.Event('submit', { cancelable: true, bubbles: true })); return /Appeler le grossiste/.test(ul.textContent); } },
        { name: 'Document.title compte les tâches OUVERTES exactement', help: "useEffect sur le compte des non-faites : document.title = 'Tâches (n à faire)'. 2 ouvertes au départ + 1 ajoutée = 3.",
          check: function (doc) { var m = doc.title.match(/\((\d+)/); return !!m && parseInt(m[1], 10) === 3; } },
        { name: 'Cocher une tâche l\u2019actualise (barrée) et met le titre à jour', help: "Toggle immutable : setTodos(todos.map(t => t.id === id ? { ...t, faite: !t.faite } : t)).",
          check: function (doc, win) { var ul = doc.querySelector('#liste'); var cibles = ul.querySelectorAll('li input[type="checkbox"]'); if (!cibles.length) return false; var avant = parseInt(doc.title.match(/\((\d+)/)[1], 10); var unchecked = null; for (var i = 0; i < cibles.length; i++) { if (!cibles[i].checked) { unchecked = cibles[i]; break; } } if (!unchecked) return false; unchecked.click(); var apres = parseInt(doc.title.match(/\((\d+)/)[1], 10); return apres === avant - 1; } },
        { name: 'Le filtre « ouvertes » masque les tâches faites', help: "Dérivation : listeAffichee = filtre === 'ouvertes' ? todos.filter(t => !t.faite) : todos — rendue dans le JSX.",
          check: function (doc) { var b = doc.querySelector('#voir-ouvertes'); if (!b) return false; b.click(); var lis = doc.querySelectorAll('#liste li'); var ok = lis.length >= 1; lis.forEach(function (li) { var cb = li.querySelector('input[type="checkbox"]'); if (cb && cb.checked) ok = false; }); return ok; } },
        { name: 'Le filtre « toutes » réaffiche l\u2019ensemble', help: "Même dérivation, branche 'toutes' : la liste complète repasse.",
          check: function (doc) { var t = doc.querySelector('#voir-toutes'); var lisAvant = doc.querySelectorAll('#liste li').length; t.click(); return doc.querySelectorAll('#liste li').length > lisAvant; } }
      ],
      hints: [
        "Le compte d'ouvertes se calcule : `const ouvertes = todos.filter(t => !t.faite).length;`. Puis l'effet : `useEffect(() => { document.title = 'Tâches (' + ouvertes + ' à faire)'; }, [ouvertes]);` — tableau de dépendances = « rejoue quand cette valeur change ».",
        "Le toggle sans mutation : `setTodos(todos.map(t => t.id === id ? { ...t, faite: !t.faite } : t))`. `map` retourne un NOUVEAU tableau où seule la ligne ciblée est copiée modifiée — React voit la différence et re-rend.",
        "Le filtre : `const affichees = filtre === 'ouvertes' ? todos.filter(t => !t.faite) : todos;` placé juste avant le return, puis `{affichees.map(...)}` dans le JSX. Jamais de useState pour ça : ce serait une copie qui se désynchroniserait."
      ],
      solution: {
        lang: 'js', label: 'app.jsx — solution commentée',
        code:
`const { useState, useEffect } = React;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, texte: 'Passer la commande de gari', faite: true },
    { id: 2, texte: 'Compter la caisse du week-end', faite: false },
    { id: 3, texte: "Vérifier les dates d'expiration", faite: false }
  ]);
  const [nouvelle, setNouvelle] = useState('');
  const [filtre, setFiltre] = useState('toutes');

  // DÉRIVATION (pas un état) : recalculé à chaque rendu, toujours juste
  const ouvertes = todos.filter((t) => !t.faite).length;
  const affichees = filtre === 'ouvertes' ? todos.filter((t) => !t.faite) : todos;

  // EFFET : synchronise quelque chose HORS de React (le titre de l'onglet)
  useEffect(() => {
    document.title = 'Tâches (' + ouvertes + ' à faire)';
  }, [ouvertes]); // ne rejoue que si le compte change

  function ajouter(e) {
    e.preventDefault();
    const texte = nouvelle.trim();
    if (texte === '') return;
    setTodos([...todos, { id: Date.now(), texte: texte, faite: false }]);
    setNouvelle('');
  }

  function basculer(id) {
    // MAJ IMMUTABLE : nouveau tableau, ligne ciblée copiée-modifiée
    setTodos(todos.map((t) => (t.id === id ? { ...t, faite: !t.faite } : t)));
  }

  return (
    <main className="app">
      <h1>Matines de la boutique</h1>

      <form id="form-todo" onSubmit={ajouter}>
        <input id="nouvelle" type="text" placeholder="Nouvelle tâche…"
               value={nouvelle} onChange={(e) => setNouvelle(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      <div className="filtres">
        <button id="voir-toutes" type="button"
                className={filtre === 'toutes' ? 'actif' : ''}
                onClick={() => setFiltre('toutes')}>Toutes</button>
        <button id="voir-ouvertes" type="button"
                className={filtre === 'ouvertes' ? 'actif' : ''}
                onClick={() => setFiltre('ouvertes')}>À faire</button>
      </div>

      <ul id="liste">
        {affichees.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.faite} onChange={() => basculer(t.id)} />
            <span className={t.faite ? 'faite' : ''}>{t.texte}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
        explain: "Trois notions d'un coup, clarifions chacune. **L'effet** : `useEffect` existe pour synchroniser React avec l'extérieur — titre d'onglet, abonnement, timer, appel réseau. Son tableau de dépendances `[ouvertes]` est un filtre de rejouement : l'effet s'exécute au montage puis **uniquement** si `ouvertes` a changé. Sans lui, il rejouerait après chaque frappe dans le champ — gaspillage pur.\n\n**La dérivation** : `affichees` n'est pas un état. Si tu maintenais un second tableau `todosOuverts` en parallèle, chaque ajout, toggle ou suppression exigerait de synchroniser les deux à la main — et le jour où tu oublies une synchro, l'écran ment. Une seule source (`todos`), tout le reste se calcule au rendu : c'est gratuit, car un composant n'est qu'une fonction qui produit le JSX depuis l'état courant.\n\n**L'immutabilité** du toggle via `map` + spread : le nouveau tableau replace l'ancien par référence, React re-rend, et chaque ligne inchangée garde la même référence d'objet — ce qui permettra plus tard à `React.memo` d'éviter de re-rendre les lignes intactes."
      },
      criteria: [
        "Ajout et toggle 100 % immutables, sans DOM manuel.",
        "Le titre de l'onglet reflète toujours le bon nombre de tâches ouvertes.",
        "Le filtre est une dérivation, pas un second état.",
        "La checkbox est contrôlée (`checked` + `onChange`).",
        "Le bouton de filtre actif est visuellement distingué (classe `actif`)."
      ],
      variants: [
        "Ajoute la suppression d'une tâche (bouton par ligne + `filter`).",
        "Ajoute « Tout cocher / tout décocher » en une seule mise à jour d'état.",
        "Défi : persiste `todos` dans `localStorage` DANS l'effet (et recharge au montage) — en local, l'atelier sandboxé bloque le stockage."
      ],
      related: ['rx-effets', 'rx-state', 'rx-effets-pieges', 'rx-etat-avance']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-react-kiosque',
      level: 'projet',
      title: 'Projet : le kiosque numérique',
      icon: 'storefront',
      free: false,
      minutes: 80,
      kind: 'dom',
      scriptType: 'babel',
      head: _RX_HEAD,
      readySelector: '#root',
      readyMinLen: 10,
      readyWait: 600,
      context: "Le kiosque à journaux d'Abomey-Calavi digitalise ses ventes : journaux, magazines, cartes prépayées. Le patron veut un écran unique pour la vendeuse : catalogue catégorisé, recherche, panier avec quantités, total en vue — fiable à 7 h du matin comme à 19 h.",
      statement: "Projet de synthèse du module React : tu construis une **caisse de kiosque** complète, en composants propres, états minimaux et dérivations disciplinées. Données fournies dans le starter (`PRODUITS`).\n\nFonctionnalités :\n\n1. **Catalogue** : rendu depuis `PRODUITS` dans `section#catalogue`, cartes `article.carte` (nom, prix, bouton `#ajouter` avec `data-id`). Trois onglets catégories : `#onglet-tous`, `#onglet-presse`, `#onglet-telecom` — filtrent par `p.categorie` ('presse' ou 'telecom').\n2. **Recherche** : `input#recherche` contrôlé, filtre insensible à la casse **combiné** avec l'onglet actif (les deux critères s'appliquent ensemble).\n3. **Panier** : état `panier` = tableau `{ id, qte }`. Ajouter un produit déjà présent **incrémente** sa quantité (une seule ligne par produit). Affichage dans `ul#panier` : `nom × qte — sous-total`. Un bouton `#moins` par ligne décrémente (retire la ligne à 0).\n4. **Total** : `#total` calcule la somme `prix × qte` depuis le panier + `PRODUITS`, formatée.\n5. **Remise** : `#remise` vide le panier.\n\nAttendus de qualité : composants séparés (`CarteProduit`, `LignePanier`…) ; tout calcul visible (filtrés, total) se **dérive** ; mises à jour **immutables** partout. Traite ce projet comme une mission payée : nomme bien, découpe proprement, ne laisse aucun état superflu.",
      constraints: [
        "Au moins 2 composants extraits (ex. `CarteProduit`, `LignePanier`).",
        "Panier groupé : jamais deux lignes pour le même produit (`find` + `map` immutables).",
        "Recherche ET catégorie se combinent dans une seule dérivation.",
        "Total calculé par `reduce` sur le panier — jamais stocké.",
        "`#moins` décrémente et retire la ligne à quantité 0 (filter).",
        "Aucun état dérivé (visibles, total...) en `useState`."
      ],
      panes: [
        { key: 'html', label: 'index.html', lang: 'html', editable: false, code: `<div id="root"></div>` },
        { key: 'css', label: 'styles.css', lang: 'css', editable: false, code:
`body { background: #f2f2f7; min-height: 95vh; }
.kiosque { display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; max-width: 880px; margin: 0 auto; }
@media (max-width: 640px) { .kiosque { grid-template-columns: 1fr; } }
.col { background: #fff; border-radius: 20px; padding: 18px 20px; box-shadow: 0 8px 22px rgba(15, 23, 42, .08); }
h1 { font-size: 19px; margin: 0 0 12px; }
.onglets { display: flex; gap: 8px; margin-bottom: 12px; }
.onglets button { font: inherit; font-weight: 700; font-size: 13px; border: none; border-radius: 999px;
  padding: 8px 14px; cursor: pointer; background: #eee9df; color: #6b5b3e; }
.onglets button.actif { background: #b8860b; color: #fff; }
#recherche { width: 100%; box-sizing: border-box; font: inherit; padding: 10px 13px;
  border-radius: 11px; border: 1.5px solid #ddd3bd; margin-bottom: 12px; outline: none; }
#catalogue { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.carte { border: 1px solid #eee5cf; border-radius: 14px; padding: 12px; display: grid; gap: 5px; }
.carte strong { font-size: 14px; }
.carte .prix { font-size: 13px; color: #8a7146; }
.carte button { font: inherit; font-weight: 700; border: none; border-radius: 10px;
  padding: 8px; cursor: pointer; color: #fff; background: #b8860b; }
#panier { list-style: none; margin: 0 0 12px; padding: 0; display: grid; gap: 7px; }
#panier li { display: flex; justify-content: space-between; align-items: center; gap: 8px;
  background: #faf6ec; border-radius: 10px; padding: 8px 11px; font-size: 13.5px; }
#panier .moins { border: none; border-radius: 8px; background: #f0e4c8; color: #6b4413;
  font-weight: 800; cursor: pointer; width: 26px; height: 26px; }
.ligne-total { display: flex; justify-content: space-between; font-weight: 800;
  border-top: 2px dashed #ddd3bd; padding-top: 10px; }
#remise { width: 100%; margin-top: 12px; font: inherit; font-weight: 700; border: none;
  border-radius: 12px; padding: 11px; cursor: pointer; color: #fff; background: #6b5b3e; }` },
        { key: 'js', label: 'app.jsx', lang: 'js', editable: true, code:
`const { useState } = React;

const PRODUITS = [
  { id: 'frat', nom: 'Fraternité Matin', prix: 300, categorie: 'presse' },
  { id: 'nat', nom: 'La Nation', prix: 300, categorie: 'presse' },
  { id: 'eco', nom: 'Éco Hebdo', prix: 500, categorie: 'presse' },
  { id: 'sport', nom: 'Sport Passion', prix: 700, categorie: 'presse' },
  { id: 'moov2', nom: 'Recharge Moov 2 000', prix: 2000, categorie: 'telecom' },
  { id: 'mtn5', nom: 'Recharge MTN 5 000', prix: 5000, categorie: 'telecom' }
];

// Composants à extraire : CarteProduit, LignePanier (minimum)
// États App : panier, recherche, onglet — RIEN d'autre ne doit être un état

function App() {
  return (
    <main className="kiosque">
      <section className="col">
        <h1>Kiosque d\u2019Abomey-Calavi</h1>
      </section>
      <aside className="col">
        <h1>Vente en cours</h1>
      </aside>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
` }
      ],
      tests: [
        { name: 'Le catalogue affiche les 6 produits au démarrage', help: "PRODUITS.map + key={p.id} dans section#catalogue.",
          check: function (doc) { var c = doc.querySelector('#catalogue'); return !!c && c.querySelectorAll('article.carte').length === 6; } },
        { name: 'Ajouter deux fois le même produit donne UNE ligne avec × 2', help: "find dans panier : si présent → map incrémente qte ; sinon push { id, qte: 1 }.",
          check: function (doc) { var b = doc.querySelector('#catalogue article.carte button'); var ul = doc.querySelector('#panier'); if (!b || !ul) return false; b.click(); b.click(); var lis = ul.querySelectorAll('li'); return lis.length === 1 && /2/.test(lis[0].textContent); } },
        { name: 'Le total est exact (prix × quantités)', help: "reduce((s, ligne) => s + produitDe(ligne.id).prix * ligne.qte, 0) — recalculé, jamais stocké.",
          check: function (doc) { var t = doc.querySelector('#total'); if (!t) return false; var n = parseInt(t.textContent.replace(/\D/g, ''), 10); return n === 600; // Fraternité Matin 300 × 2
          } },
        { name: 'L\u2019onglet télécom ne montre que les recharges', help: "Onglets : setOnglet('telecom') ; visibles = PRODUITS.filter(p => onglet === 'tous' || p.categorie === onglet).",
          check: function (doc) { var o = doc.querySelector('#onglet-telecom'); if (!o) return false; o.click(); var cartes = doc.querySelectorAll('#catalogue article.carte'); return cartes.length === 2; } },
        { name: 'La recherche combine texte ET catégorie active', help: "visibles.filter(p => p.nom.toLowerCase().includes(q)) — appliqué APRÈS le filtre d'onglet : chercher 'recharge moov' dans l'onglet telecom → 1 carte.",
          check: function (doc, win) { var r = doc.querySelector('#recherche'); if (!r) return false; Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value').set.call(r, 'moov'); r.dispatchEvent(new win.Event('input', { bubbles: true })); var n = doc.querySelectorAll('#catalogue article.carte').length; return n === 1; } },
        { name: 'Réinitialiser vide le panier et remet le total à zéro', help: "setPanier([]) ; le total suit tout seul car il est dérivé.",
          check: function (doc) { var b = doc.querySelector('#remise'); var ul = doc.querySelector('#panier'); var t = doc.querySelector('#total'); var rc = doc.querySelector('#recherche'); if (rc) { rc.value = ''; } if (!b) return false; b.click(); return ul.querySelectorAll('li').length === 0 && parseInt(t.textContent.replace(/\D/g, ''), 10) === 0; } }
      ],
      hints: [
        "États : `const [panier, setPanier] = useState([])`, `recherche`, `onglet`. Tout le reste (catalogue filtré, total) se calcule en haut du composant : `const visibles = PRODUITS.filter(p => (onglet === 'tous' || p.categorie === onglet) && p.nom.toLowerCase().includes(q));`.",
        "L'ajout groupé : `const existant = panier.find(l => l.id === id); setPanier(existant ? panier.map(l => l.id === id ? { ...l, qte: l.qte + 1 } : l) : [...panier, { id, qte: 1 }]);`. Trois branches couvertes, zéro mutation.",
        "Le total : `const total = panier.reduce((s, l) => s + PRODUITS.find(p => p.id === l.id).prix * l.qte, 0);`. La décrémentation : `map` (qte−1) puis `filter(l => l.qte > 0)` enchaînés."
      ],
      solution: {
        lang: 'js', label: 'app.jsx — solution commentée',
        code:
`const { useState } = React;

const PRODUITS = [
  { id: 'frat', nom: 'Fraternité Matin', prix: 300, categorie: 'presse' },
  { id: 'nat', nom: 'La Nation', prix: 300, categorie: 'presse' },
  { id: 'eco', nom: 'Éco Hebdo', prix: 500, categorie: 'presse' },
  { id: 'sport', nom: 'Sport Passion', prix: 700, categorie: 'presse' },
  { id: 'moov2', nom: 'Recharge Moov 2 000', prix: 2000, categorie: 'telecom' },
  { id: 'mtn5', nom: 'Recharge MTN 5 000', prix: 5000, categorie: 'telecom' }
];

function produitDe(id) {
  return PRODUITS.find((p) => p.id === id);
}
function fcfas(n) { return n.toLocaleString('fr-FR') + ' F'; }

/* ---- Composants extraits ---- */
function CarteProduit({ produit, onAjouter }) {
  return (
    <article className="carte">
      <strong>{produit.nom}</strong>
      <span className="prix">{fcfas(produit.prix)}</span>
      <button type="button" onClick={() => onAjouter(produit.id)}>Ajouter</button>
    </article>
  );
}

function LignePanier({ ligne, onMoins }) {
  const p = produitDe(ligne.id);
  return (
    <li>
      <span>{p.nom} × {ligne.qte}</span>
      <span>{fcfas(p.prix * ligne.qte)}</span>
      <button type="button" className="moins" onClick={() => onMoins(ligne.id)}>−</button>
    </li>
  );
}

/* ---- App : 3 états maximum, tout le reste est dérivé ---- */
function App() {
  const [panier, setPanier] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [onglet, setOnglet] = useState('tous');

  // DÉRIVATIONS : recalculées à chaque rendu, jamais stockées
  const q = recherche.trim().toLowerCase();
  const visibles = PRODUITS.filter((p) =>
    (onglet === 'tous' || p.categorie === onglet) &&
    p.nom.toLowerCase().includes(q)
  );
  const total = panier.reduce((s, l) => s + produitDe(l.id).prix * l.qte, 0);

  function ajouter(id) {
    const existe = panier.some((l) => l.id === id);
    setPanier(existe
      ? panier.map((l) => (l.id === id ? { ...l, qte: l.qte + 1 } : l))
      : [...panier, { id: id, qte: 1 }]
    );
  }

  function moins(id) {
    setPanier(
      panier
        .map((l) => (l.id === id ? { ...l, qte: l.qte - 1 } : l))
        .filter((l) => l.qte > 0) // à 0, la ligne disparaît
    );
  }

  return (
    <main className="kiosque">
      <section className="col">
        <h1>Kiosque d'Abomey-Calavi</h1>

        <div className="onglets">
          <button id="onglet-tous" type="button"
                  className={onglet === 'tous' ? 'actif' : ''}
                  onClick={() => setOnglet('tous')}>Tous</button>
          <button id="onglet-presse" type="button"
                  className={onglet === 'presse' ? 'actif' : ''}
                  onClick={() => setOnglet('presse')}>Presse</button>
          <button id="onglet-telecom" type="button"
                  className={onglet === 'telecom' ? 'actif' : ''}
                  onClick={() => setOnglet('telecom')}>Télécom</button>
        </div>

        <input id="recherche" type="search" placeholder="Rechercher…"
               value={recherche} onChange={(e) => setRecherche(e.target.value)} />

        <section id="catalogue">
          {visibles.map((p) => (
            <CarteProduit key={p.id} produit={p} onAjouter={ajouter} />
          ))}
        </section>
      </section>

      <aside className="col">
        <h1>Vente en cours</h1>
        <ul id="panier">
          {panier.map((l) => (
            <LignePanier key={l.id} ligne={l} onMoins={moins} />
          ))}
        </ul>
        <p className="ligne-total"><span>Total</span><span id="total">{fcfas(total)}</span></p>
        <button id="remise" type="button" onClick={() => setPanier([])}>Encaisser & remettre à zéro</button>
      </aside>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
        explain: "Ce projet prouve la puissance du modèle React quand on respecte ses règles. **Trois états suffisent** : panier, recherche, onglet. Catalogue filtré et total sont des dérivations — des expressions recalculées à chaque rendu. Cherche un endroit où synchroniser quoi que ce soit : il n'y en a pas. C'est la signature d'un état minimal.\n\nLa bonne surprise architecturale : les deux filtres se **composent** naturellement dans un seul `filter` (`onglet` ET `recherche`). Pas de branches, pas d'états intermédiaires — en déclaratif, combiner deux critères revient juste à les écrire ensemble.\n\nEnfin le panier groupé : la logique « trouve, incrémente ou crée » tient en un ternaire immutable. `LignePanier` retrouve son produit via `produitDe(ligne.id)` plutôt que de dupliquer nom et prix dans l'état du panier — le panier ne stocke que le strict nécessaire (`id`, `qte`), le reste se référence. C'est le même principe qu'une clé étrangère en base : **ne duplique jamais ce que tu peux joindre**."
      },
      criteria: [
        "Catalogue filtré par onglets ET recherche combinés, toujours cohérent.",
        "Panier groupé par produit avec quantités, moins fonctionnel, retrait à zéro.",
        "Total exact en permanence, pur calcul dérivé.",
        "Composants extraits, états minimaux, mises à jour immutables.",
        "Remise à zéro fiable pour enchaîner les ventes du matin."
      ],
      variants: [
        "Ajoute le montant reçu et la monnaie à rendre (dérivée, bien sûr).",
        "Ajoute un récapitulatif d'impression (bouton + `window.print`, panier masqué hors impression côté catalogue).",
        "Pagine le catalogue ou ajoute un tri prix croissant/décroissant (état supplémentaire justifié, dérivation adaptée).",
        "Défi : persiste `panier` dans `localStorage` via `useEffect` (en local, pas dans l'atelier sandboxé)."
      ],
      related: ['rx-state', 'rx-listes-cles', 'rx-formulaires', 'rx-patterns', 'rx-etat-avance']
    }
  ]
};
