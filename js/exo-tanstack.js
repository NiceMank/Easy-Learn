/* ============================================================
   exo-tanstack.js — Exercices pratiques : TanStack Query
   Validation : checklist d'auto-évaluation (projet React local : npm run dev).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.tanstack = {
  module: 'tanstack',
  list: [
{
    "id": "exo-tq-premiere-query",
    "level": "fonda",
    "title": "Ta première useQuery : le stock du marché",
    "icon": "cloud_download",
    "free": true,
    "minutes": 30,
    "kind": "checklist",
    "setup": "Crée une app React : `npm create vite@latest tq-marche -- --template react`, puis `npm i @tanstack/react-query json-server` et ajoute un `db.json` à la racine avec une collection `produits` (5 objets `{ id, nom, prix, stock }`). Lance le faux serveur : `npx json-server db.json --port 3001` et l'app : `npm run dev`.",
    "context": "La librairie-papeterie d'Akassato tient son stock dans un fichier. Aujourd'hui tu remplaces le vieux useState + useEffect + fetch maison — celui où l'on oublie toujours un état — par TanStack Query. Tu vas voir, la différence n'est pas cosmétique : les états de chargement, d'erreur et le rechargement deviennent des citoyens de première classe.",
    "statement": "Tu vas afficher la liste des produits via useQuery, proprement, avec ses trois états.\n\n1. Dans `main.jsx`, crée un `QueryClient` et enveloppe l'app dans `<QueryClientProvider client={qc}>`. Sans provider, rien ne fonctionne : le hook cherche son client dans le contexte.\n2. Écris une fonction `fetchProduits` (fetch + vérification `res.ok` + `res.json()`). Elle doit **rejeter** en cas d'erreur HTTP : TanStack Query ne devine pas qu'un 500 est une erreur, c'est toi qui throw.\n3. Dans un composant `ListeProduits`, utilise `useQuery({ queryKey: ['produits'], queryFn: fetchProduits })`. Affiche : un squelette de chargement pendant `isPending`, un encart d'erreur (message + bouton « Réessayer » branché sur `refetch`) si `isError`, et la liste (nom, prix, stock) sinon.\n4. Ajoute un gros bouton « Actualiser le stock » qui appelle `refetch()` et affiche « mise à jour… » pendant `isFetching` — note la distinction : `isPending` (première visite, pas de données) vs `isFetching` (toute requête en vol, cache déjà présent).\n5. Teste la panne : arrête json-server et observe l'erreur ; relance-le et clique « Réessayer ». Regarde aussi l'onglet Network à l'aller-retour d'onglet navigateur : par défaut, `refetchOnWindowFocus` relance la requête quand tu reviens — comprends pourquoi c'est une fonctionnalité.\n\nCe qui est évalué : le geste fondateur (provider + queryKey + queryFn), la gestion des trois états sans un seul if tordu, et la compréhension cache vs requête. useEffect + fetch manuel est désormais banni pour la lecture de données serveur.",
    "constraints": [
        "useQuery pour la lecture : aucun fetch dans un useEffect pour ces données.",
        "La queryFn rejette sur `!res.ok` (throw new Error), sinon TanStack croit que tout va bien.",
        "Les trois états (chargement, erreur, succès) ont chacun un rendu visible et distinct.",
        "La clé de requête est un tableau stable `['produits']`, pas une string recréée autrement à chaque rendu.",
        "Le bouton Réessayer utilise `refetch` fourni par le hook, pas un rechargement de page."
    ],
    "checklist": [
        "La liste des 5 produits de db.json s'affiche avec nom, prix et stock.",
        "Pendant le premier chargement, un état « chargement » est visible (teste avec la limitation réseau 3G du navigateur).",
        "json-server arrêté → l'encart d'erreur s'affiche avec le bouton Réessayer.",
        "json-server relancé + Réessayer → la liste revient SANS recharger la page.",
        "Le bouton « Actualiser le stock » montre brièvement « mise à jour… » (isFetching) même quand les données sont déjà là.",
        "Modifier un prix dans db.json puis revenir sur l'onglet : la donnée se rafraîchit toute seule (refetchOnWindowFocus).",
        "React Query Devtools installé (`@tanstack/react-query-devtools`) : je vois la requête 'produits', son statut et sa fraîcheur.",
        "Aucun avertissement dans la console (clé stable, pas de boucle de rendu)."
    ],
    "hints": [
        "Le squelette minimal : `const { data, isPending, isError, error, refetch, isFetching } = useQuery({ queryKey: ['produits'], queryFn: fetchProduits });` — tout part de cette déstructuration.",
        "La queryFn honnête : `async function fetchProduits() { const res = await fetch('http://localhost:3001/produits'); if (!res.ok) throw new Error('Serveur indisponible (' + res.status + ')'); return res.json(); }` — fetch ne rejette pas sur les 4xx/5xx, c'est à toi de le faire.",
        "Rendu en escalier : `if (isPending) return <p>Chargement du stock…</p>; if (isError) return <div><p>{error.message}</p><button onClick={() => refetch()}>Réessayer</button></div>;` puis le rendu normal. Et `isFetching` s'affiche en petit, au-dessus de la liste déjà visible : le cache permet de ne jamais vider l'écran."
    ],
    "solution": {
        "lang": "js",
        "label": "main.jsx + ListeProduits.jsx — solution commentée",
        "code": "\n// ========== main.jsx ==========\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <QueryClientProvider client={queryClient}>\n      <App />\n    </QueryClientProvider>\n  </StrictMode>\n);\n\n// ========== ListeProduits.jsx ==========\n// ❗ fetch() ne rejette PAS sur les erreurs HTTP : on jette nous-mêmes.\nasync function fetchProduits() {\n  const res = await fetch('http://localhost:3001/produits');\n  if (!res.ok) throw new Error('Serveur indisponible (' + res.status + ')');\n  return res.json();\n}\n\nexport default function ListeProduits() {\n  const { data, isPending, isError, error, refetch, isFetching } = useQuery({\n    queryKey: ['produits'],   // identité de la donnée dans le cache\n    queryFn: fetchProduits,\n  });\n\n  if (isPending) return <p className=\"etat\">Chargement du stock…</p>;\n  if (isError) return (\n    <div className=\"etat erreur\">\n      <p>{error.message}</p>\n      <button onClick={() => refetch()}>Réessayer</button>\n    </div>\n  );\n\n  return (\n    <section>\n      <button onClick={() => refetch()} disabled={isFetching}>\n        {isFetching ? 'Mise à jour…' : 'Actualiser le stock'}\n      </button>\n      <ul>\n        {data.map((p) => (\n          <li key={p.id}>{p.nom} — {p.prix} F (stock : {p.stock})</li>\n        ))}\n      </ul>\n    </section>\n  );\n}\n",
        "explain": "Trois vérités à intégrer. Premièrement, TanStack Query gère une BONIFICATION de tes données serveur : le cache par queryKey. Deux composants qui demandent ['produits'] partagent la même donnée, et refetchOnWindowFocus la maintient fraîche sans ta supervision. Deuxièmement, fetch seul est muet sur les erreurs HTTP : sans le if (!res.ok) throw, un 500 serait traité comme un succès avec du JSON d'erreur — le bug le plus classique du stage. Troisièmement, isPending et isFetching ne sont pas interchangeables : le premier dit « je n'ai encore rien », le second « je rafraîchis ce que tu vois déjà ». Les confondre, c'est vider l'écran à chaque actualisation — l'effet stroboscope dont souffrent tant d'apps."
    },
    "criteria": [
        "useQuery + provider en place, liste rendue, et les trois états ont une UI dédiée testée.",
        "La panne serveur est gérée proprement (erreur visible, retry sans reload).",
        "Cache compris : refetchOnWindowFocus observé, devtools ouverts au moins une fois."
    ],
    "variants": [
        "Ajoute `staleTime: 30_000` dans la query et constate dans les devtools que l'onglet revisité ne refetch plus pendant 30 s.",
        "Extrais `fetchProduits` et le useQuery dans un hook `useProduits()` réutilisable.",
        "Défi : affiche un badge « données potentiellement anciennes » quand `isStale` est vrai."
    ],
    "related": [
        "tq-concepts",
        "tq-usequery",
        "tq-etats",
        "tq-erreurs",
        "tq-devtools"
    ]
},
{
    "id": "exo-tq-fiche-detail",
    "level": "fonda",
    "title": "Fiche détail : des queryKey qui dépendent",
    "icon": "badge",
    "minutes": 30,
    "kind": "checklist",
    "setup": "Reprends l'app `tq-marche` avec json-server (`db.json` contient les 5 produits). Tu ajoutes une navigation liste → détail : un simple état `selection` (id du produit) dans le composant parent suffit — pas besoin de React Router pour cet exercice.",
    "context": "Le clic sur « Cahier A4 90g » doit ouvrir sa fiche : prix d'achat, fournisseur, seuil d'alerte. Première tentation : un useEffect qui refetch à chaque clic. Deuxième tentation, la bonne : faire de l'id une partie de la queryKey, et laisser TanStack Query gérer cache, annulation et fraîcheur pour chaque produit séparément.",
    "statement": "Tu vas construire une vue détail pilotée par une queryKey variable.\n\n1. Dans le parent : `const [selection, setSelection] = useState(null)`. La liste appelle `setSelection(p.id)` au clic ; quand `selection` est non null, le composant `<FicheProduit id={selection} />` s'affiche à côté ou à la place.\n2. `fetchProduit(id)` interroge `http://localhost:3001/produits/` + id, rejette sur `!res.ok` (un 404 doit devenir une erreur, pas du JSON vide).\n3. Dans `FicheProduit` : `useQuery({ queryKey: ['produits', id], queryFn: () => fetchProduit(id) })`. Affiche les trois états comme à l'exercice précédent.\n4. **Observe le cache par clé** : ouvre les devtools, clique produit 1, produit 2, puis reviens au 1 — aucune nouvelle requête n'est nécessaire, la fiche est instantanée (staleTime 0 la marque fraîche/périmée, mais elle s'affiche immédiatement depuis le cache).\n5. Gère le retour : un bouton « ← Retour à la liste » qui remet `selection` à null. Vérifie que la liste n'a pas refetch inutilement (elle est en cache aussi).\n6. Enrichis `db.json` : ajoute `fournisseur` et `seuil_alerte` aux produits, affiche-les sur la fiche, avec un encart « Stock bas ! » quand `stock <= seuil_alerte`.\n\nCe qui est évalué : la queryKey comme identité composite — `['produits']` et `['produits', 3]` sont DEUX caches distincts — et le fait que changer de clé déclenche proprement une nouvelle requête pendant que l'ancienne fiche reste dans son tiroir de cache.",
    "constraints": [
        "L'id voyage dans la queryKey : `['produits', id]`, jamais en variable de fermeture seule sans la clé.",
        "La queryFn du détail rejette sur `!res.ok` (404 = fiche introuvable = état d'erreur affiché).",
        "Chaque produit visité a sa propre entrée de cache visible dans les devtools.",
        "Pas de useEffect de chargement : l'état dérivé (quelle fiche ?) suffit.",
        "L'UI du détail gère chargement, erreur et succès, avec bouton retour."
    ],
    "checklist": [
        "Cliquer un produit de la liste affiche sa fiche complète (nom, prix, stock, fournisseur, seuil).",
        "Les devtools montrent des entrées distinctes : ['produits'], ['produits',1], ['produits',2], …",
        "Revenir sur une fiche déjà visitée est instantané (servie depuis le cache).",
        "Un id inexistant (modifie la sélection en dur vers 999) affiche l'état d'erreur, pas un écran vide ni un crash.",
        "L'encart « Stock bas » n'apparaît que quand stock <= seuil_alerte.",
        "Le bouton Retour ramène à la liste sans nouvelle requête réseau",
        "Changer de produit rapidement deux fois n'affiche jamais la fiche du mauvais produit (la clé suit l'id courant).",
        "Aucune donnée de détail n'est stockée dans un useState recopiée depuis data."
    ],
    "hints": [
        "La règle d'or : tout ce qui identifie la ressource va dans la clé. `useQuery({ queryKey: ['produits', id], queryFn: () => fetchProduit(id) })` — la queryFn lit l'id de la fermeture, mais c'est la clé qui dit à TanStack « ceci est une donnée différente ».",
        "Dans les devtools TanStack, tu verras les clés s'empiler. Clique sur ['produits', 1] : status, dataUpdatedAt, observers. C'est la meilleure façon de comprendre que le cache est un dictionnaire : la clé EST l'adresse.",
        "Pour l'erreur 404 : `if (!res.ok) throw new Error(res.status === 404 ? 'Produit introuvable' : 'Erreur serveur ' + res.status)` — tu peux même typer tes erreurs pour personnaliser l'encart."
    ],
    "solution": {
        "lang": "js",
        "label": "App.jsx + FicheProduit.jsx — solution commentée",
        "code": "\n// ========== App.jsx ==========\nexport default function App() {\n  const [selection, setSelection] = useState(null);\n\n  // L'état dérivé suffit : quelle fiche ? aucune (liste) ou id X.\n  return selection === null\n    ? <ListeProduits onVoir={setSelection} />\n    : <FicheProduit id={selection} onRetour={() => setSelection(null)} />;\n}\n\n// ========== FicheProduit.jsx ==========\nasync function fetchProduit(id) {\n  const res = await fetch('http://localhost:3001/produits/' + id);\n  if (res.status === 404) throw new Error('Produit introuvable');\n  if (!res.ok) throw new Error('Erreur serveur (' + res.status + ')');\n  return res.json();\n}\n\nexport default function FicheProduit({ id, onRetour }) {\n  const { data: p, isPending, isError, error } = useQuery({\n    // 🔑 La clé PORTE l'id : ['produits', 2] ≠ ['produits', 3].\n    // Changer de clé = nouvelle requête propre + cache séparé par fiche.\n    queryKey: ['produits', id],\n    queryFn: () => fetchProduit(id),\n  });\n\n  if (isPending) return <p className=\"etat\">Ouverture de la fiche…</p>;\n  if (isError) return (\n    <div className=\"etat erreur\">\n      <p>{error.message}</p>\n      <button onClick={onRetour}>← Retour à la liste</button>\n    </div>\n  );\n\n  return (\n    <article>\n      <button onClick={onRetour}>← Retour à la liste</button>\n      <h2>{p.nom}</h2>\n      <p>Prix : {p.prix} F — Stock : {p.stock}</p>\n      <p>Fournisseur : {p.fournisseur}</p>\n      {p.stock <= p.seuil_alerte && (\n        <p className=\"alerte\">Stock bas ! Commander chez {p.fournisseur}.</p>\n      )}\n    </article>\n  );\n}\n",
        "explain": "La leçon tient en une phrase : la queryKey est l'identité de la donnée. Quand tu écris ['produits', id], tu dis à TanStack Query : « chaque id a sa propre boîte dans le cache ». Conséquences automatiques et gratuites : naviguer entre fiches est instantané après la première visite ; deux fiches ne se mélangent jamais ; invalider ['produits', 3] plus tard ne touche que la fiche 3. Le piège symétrique serait de mettre data du détail dans un useState « pour aller plus vite » — tu recréerais à la main, en buggé, le cache que la bibliothèque te donne. Garde l'état minimal (l'id sélectionné) et laisse la query faire le reste."
    },
    "criteria": [
        "Liste → fiche fonctionnelle, avec cache par produit observable dans les devtools.",
        "Les trois états couverts, y compris 404 propre ; la navigation retour est sans refetch.",
        "Aucun fetch manuel dans useEffect, aucune copie de data dans useState."
    ],
    "variants": [
        "Précharge la fiche au survol avec `queryClient.prefetchQuery` : le clic devient instantané.",
        "Ajoute un paramètre de tri sur la liste (`?q=` json-server) et fais voyager le tri dans la queryKey : ['produits', { tri }].",
        "Défi : remplace la sélection par React Router (`/produits/:id`) en gardant les mêmes queryKey — constate que rien ne change côté cache."
    ],
    "related": [
        "tq-dependantes",
        "tq-usequery",
        "tq-cache",
        "tq-etats"
    ]
},
{
    "id": "exo-tq-mutation-produit",
    "level": "inter",
    "title": "useMutation : ajouter un produit sans casser la liste",
    "icon": "post_add",
    "minutes": 40,
    "kind": "checklist",
    "setup": "Reprends l'app `tq-marche` (liste via useQuery déjà en place). json-server accepte les POST sur /produits — c'est tout ce qu'il te faut côté « backend ».",
    "context": "La patronne d'Akassato reçoit 20 paquets de stylos bleus : direction le formulaire « Nouveau produit ». Le naïf ajouterait un useState local et prierait pour que la liste se mette à jour. Le professionnel sait que écrire sur le serveur et relire proprement est un sport à part : useMutation + invalidation de cache.",
    "statement": "Tu vas créer le formulaire d'ajout et connecter son succès au rafraîchissement de la liste.\n\n1. Écris `postProduit(nouveau)` : POST JSON vers /produits (Content-Type application/json), rejette sur `!res.ok`, retourne le produit créé (json-server renvoie l'objet avec son nouvel id).\n2. Crée un composant `FormProduit` (champs nom, prix, stock — tous requis, prix et stock numériques > 0) avec `useMutation({ mutationFn: postProduit })`.\n3. À la soumission : `mutation.mutate(values)`. Pendant `mutation.isPending`, le bouton « Ajouter » est désactivé avec le libellé « Enregistrement… » — jamais de double envoi.\n4. Dans `onSuccess` : **invalide la liste** — `queryClient.invalidateQueries({ queryKey: ['produits'] })` — réinitialise le formulaire, et affiche une petite confirmation (« Cahier A4 ajouté au catalogue ») grâce à la donnée retournée par `data` de la mutation.\n5. Dans `onError` : affiche le message d'erreur sans vider le formulaire (la saisie est précieuse). Teste avec json-server arrêté.\n6. Soigne le détail d'espace de noms : invalider `['produits']` invalide AUSSI les fiches `['produits', id]` (correspondance par préfixe). Comprends et démontre ce comportement dans les devtools.\n\nCe qui est évalué : la séparation lecture/écriture (query vs mutation), l'invalidation comme mécanisme de cohérence (tu ne modifies pas la liste à la main : tu déclares qu'elle est périmée), et l'UX d'un formulaire qui ne perd jamais la saisie.",
    "constraints": [
        "L'écriture passe par useMutation ; le formulaire ne refetch pas la liste à la main.",
        "La synchronisation post-succès se fait par invalidateQueries sur ['produits'], pas en tripotant setQueryData sauvagement ici.",
        "Pendant la mutation, le bouton est désactivé (isPending) : un seul envoi possible.",
        "En cas d'erreur, les valeurs du formulaire sont conservées et le message s'affiche.",
        "La mutation rejette sur !res.ok comme toute fonction réseau honnête."
    ],
    "checklist": [
        "Ajouter un produit le fait apparaître dans la liste automatiquement (invalidation → refetch), sans recharger la page.",
        "Le bouton se désactive pendant l'envoi : impossible de créer deux fois le même produit en cliquant vite.",
        "json-server arrêté : l'erreur s'affiche, le formulaire garde mes valeurs, et je peux réessayer après relance.",
        "Le message de succès cite le nom du produit créé (donnée `data` de la mutation).",
        "Les devtools montrent la mutation, puis la query ['produits'] passer en « fetching » après invalidation.",
        "Invalider ['produits'] marque aussi périmées les fiches ['produits', id] : je l'ai constaté et je sais pourquoi (préfixe).",
        "Le formulaire se réinitialise uniquement après succès, jamais après erreur.",
        "Les validations locales (prix > 0, stock entier ≥ 0) empêchent d'envoyer des absurdités."
    ],
    "hints": [
        "Le triptyque : `const queryClient = useQueryClient();` puis `useMutation({ mutationFn: postProduit, onSuccess: (cree) => { queryClient.invalidateQueries({ queryKey: ['produits'] }); … } })`. La mutation réussit → on déclare la liste périmée → TanStack la refetch puisqu'elle est affichée.",
        "Pour la confirmation nommée : onSuccess reçoit en premier argument ce que mutationFn a retourné — le produit créé. `onSuccess: (cree) => setMessage(cree.nom + ' ajouté au catalogue')`.",
        "Et l'erreur : `onError: (err) => setMessageErreur(err.message)`. Le composant lit aussi `mutation.isError`/`mutation.error` directement si tu préfères dériver l'UI — les deux approches cohabitent, choisis une convention et tiens-la."
    ],
    "solution": {
        "lang": "js",
        "label": "FormProduit.jsx — solution commentée",
        "code": "\nasync function postProduit(nouveau) {\n  const res = await fetch('http://localhost:3001/produits', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(nouveau),\n  });\n  if (!res.ok) throw new Error(\"Échec de l'enregistrement (\" + res.status + \")\");\n  return res.json(); // json-server renvoie l'objet créé, id compris\n}\n\nexport default function FormProduit() {\n  const queryClient = useQueryClient();\n  const [nom, setNom] = useState('');\n  const [prix, setPrix] = useState('');\n  const [stock, setStock] = useState('');\n  const [note, setNote] = useState(null);\n\n  const mutation = useMutation({\n    mutationFn: postProduit,\n    onSuccess: (cree) => {\n      // La liste est déclarée PÉRIMÉE — c'est TanStack qui la refetch.\n      queryClient.invalidateQueries({ queryKey: ['produits'] });\n      setNom(''); setPrix(''); setStock('');\n      setNote({ type: 'ok', texte: cree.nom + ' ajouté au catalogue.' });\n    },\n    onError: (err) => setNote({ type: 'ko', texte: err.message }),\n  });\n\n  function soumettre(e) {\n    e.preventDefault();\n    const p = parseInt(prix, 10); const s = parseInt(stock, 10);\n    if (!nom.trim() || !(p > 0) || !(s >= 0)) {\n      setNote({ type: 'ko', texte: 'Nom requis, prix > 0, stock entier ≥ 0.' });\n      return;\n    }\n    mutation.mutate({ nom: nom.trim(), prix: p, stock: s });\n  }\n\n  return (\n    <form onSubmit={soumettre}>\n      <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder=\"Nom du produit\" />\n      <input value={prix} onChange={(e) => setPrix(e.target.value)} placeholder=\"Prix (F)\" inputMode=\"numeric\" />\n      <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder=\"Stock\" inputMode=\"numeric\" />\n      <button disabled={mutation.isPending}>\n        {mutation.isPending ? 'Enregistrement…' : 'Ajouter au catalogue'}\n      </button>\n      {note && <p className={note.type === 'ok' ? 'ok' : 'ko'}>{note.texte}</p>}\n    </form>\n  );\n}\n",
        "explain": "La philosophie à retenir : pour la lecture, tu demandes ; pour l'écriture, tu agis puis tu déclares. useMutation ne gère pas de cache — il exécute une action et te donne isPending, isError, data pour piloter l'UI. La cohérence vient ensuite de invalidateQueries : plutôt que de deviner comment patcher la liste localement (et te tromper : tri ? pagination ?), tu dis « cette donnée n'est plus fiable » et TanStack Query refetch exactement les requêtes actives qui matchent le préfixe. C'est plus sûr et presque toujours assez rapide. Dernier réflexe : on ne vide le formulaire qu'au succès — une saisie perdue sur erreur réseau, c'est l'utilisatrice qui paie ton bug."
    },
    "criteria": [
        "Ajout visible immédiatement via invalidation ; aucun état de liste dupliqué dans le composant.",
        "Mutation robuste : bouton bloqué pendant l'envoi, erreur affichée sans perte de saisie, succès nominé.",
        "Le comportement d'invalidation par préfixe a été démontré dans les devtools."
    ],
    "variants": [
        "Ajoute la suppression d'un produit (DELETE /produits/:id) avec confirmation, même mécanique d'invalidation.",
        "Ajoute la modification du prix (PATCH) depuis la fiche détail et invalide ['produits'] — observe fiche et liste se rafraîchir.",
        "Défi : après ajout, navigue directement vers la nouvelle fiche en utilisant l'id retourné par onSuccess."
    ],
    "related": [
        "tq-mutations",
        "tq-invalidation",
        "tq-cache",
        "tq-erreurs"
    ]
},
{
    "id": "exo-tq-optimiste",
    "level": "inter",
    "title": "Mise à jour optimiste : le stock sans spinner",
    "icon": "bolt",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Reprends l'app `tq-marche` avec sa liste et ses mutations. Ajoute dans `db.json` un bouton « Vendre 1 » par produit — enfin, ajoute l'action côté UI : tu vas implémenter le PATCH du stock décrémenté.",
    "context": "Au comptoir, la vendeuse scanne, vend, scanne, vend. Si chaque vente affiche un spinner de 300 ms, la file s'allonge. L'utilisatrice ne veut pas savoir que le réseau existe : le stock doit baisser à l'instant du clic, et se corriger silencieusement si le serveur proteste. Bienvenue dans la mise à jour optimiste — la technique la plus délicate, et la plus gratifiante, de TanStack Query.",
    "statement": "Tu vas implémenter « Vendre 1 » en optimiste, avec annulation, snapshot et rollback.\n\n1. Écris `vendreUn({ id, nouveauStock })` : PATCH vers /produits/:id avec `{ stock: nouveauStock }`, rejet sur `!res.ok`.\n2. Crée la mutation avec **les trois phases**. `onMutate(nouvelle)` : (a) `await queryClient.cancelQueries({ queryKey: ['produits'] })` pour figer tout refetch en vol qui écraserait ton changement ; (b) snapshot — `const avant = queryClient.getQueryData(['produits'])` ; (c) écris l'état optimiste avec `setQueryData(['produits'], ancien => ancien.map(p => p.id === id ? { ...p, stock: p.stock - 1 } : p))` ; (d) retourne un contexte `{ avant }`.\n3. `onError(err, variables, contexte)` : restaure `queryClient.setQueryData(['produits'], contexte.avant)` et affiche un bandeau « Vente annulée, serveur indisponible ».\n4. `onSettled` : `invalidateQueries({ queryKey: ['produits'] })` — quoi qu'il arrive, on finit par se réaligner sur la vérité du serveur.\n5. Empêche les stocks négatifs : le bouton est désactivé quand `stock === 0` (règle métier dérivée des données optimistes, donc cohérente avec ce qu'on voit).\n6. **Prouve le rollback** : arrête json-server, vends, constate le stock qui descend puis REVIENT avec le bandeau d'erreur. Relance, vends pour de vrai, vérifie dans db.json.\n\nCe qui est évalué : la mécanique exacte (cancel → snapshot → setQueryData → rollback → invalidate) et la compréhension du pourquoi de chaque étape. Un optimiste sans cancelQueries est une course critique ; sans snapshot, un optimisme qui ne revient jamais.",
    "constraints": [
        "onMutate suit l'ordre strict : cancelQueries AVANT de lire et d'écrire le cache.",
        "Le snapshot est retourné par onMutate (le contexte), puis utilisé dans onError pour le rollback.",
        "onSettled invalide toujours : succès ou échec, la fin de partie se fait côté serveur.",
        "Aucun état local de stock en parallèle du cache : l UI lit uniquement la query ['produits'].",
        "Le bouton est désactivé à stock 0 et pendant qu'un rollback est impossible… non : simplement à stock 0."
    ],
    "checklist": [
        "Cliquer « Vendre 1 » décrémente le stock INSTANTANÉMENT, sans aucun spinner ni délai perceptible.",
        "Serveur arrêté : le stock descend puis remonte quelques instants après, avec le bandeau d'erreur explicite.",
        "Serveur relancé : la vente tient, db.json montre le stock décrémenté.",
        "À stock 1, un clic passe à 0 et le bouton se désactive immédiatement (pas de -1 possible).",
        "Deux clics rapides sur deux produits différents ne se marchent pas dessus (cancel + setQueryData ciblés).",
        "Les devtools montrent setQueryData appliqué, puis le refetch d'invalidation qui confirme.",
        "Après rollback, une nouvelle tentative fonctionne (la mutation n'est pas restée bloquée).",
        "Je sais raconter pourquoi cancelQueries est indispensable : sans lui, un refetch en cours pourrait réécrire l'ancien stock APRÈS mon écriture optimiste."
    ],
    "hints": [
        "La signature complète : `useMutation({ mutationFn: vendreUn, onMutate: async ({ id }) => { await queryClient.cancelQueries({ queryKey: ['produits'] }); const avant = queryClient.getQueryData(['produits']); queryClient.setQueryData(['produits'], (old) => old.map(...)); return { avant }; }, onError: (e, v, ctx) => queryClient.setQueryData(['produits'], ctx.avant), onSettled: () => queryClient.invalidateQueries({ queryKey: ['produits'] }) })`.",
        "Le setQueryData reçoit une fonction pure : `(anciens) => anciens.map((p) => p.id === variables.id ? { ...p, stock: p.stock - 1 } : p)` — jamais de mutation in place, sinon React ne re-rend pas (référence identique).",
        "Pour tester la « course » que cancelQueries prévient : mets une latence 3 G, clique « Actualiser » puis immédiatement « Vendre 1 ». Sans cancel, le refetch en vol peut ramener l'ancien stock et écraser ton optimisme. Avec, la requête en vol est annulée."
    ],
    "solution": {
        "lang": "js",
        "label": "useVendreUn.js — solution commentée",
        "code": "\nasync function vendreUn({ id, nouveauStock }) {\n  const res = await fetch('http://localhost:3001/produits/' + id, {\n    method: 'PATCH',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ stock: nouveauStock }),\n  });\n  if (!res.ok) throw new Error('Vente refusée (' + res.status + ')');\n  return res.json();\n}\n\nexport function useVendreUn() {\n  const queryClient = useQueryClient();\n\n  return useMutation({\n    mutationFn: vendreUn,\n\n    // Phase 1 — AVANT le réseau : on parie que tout ira bien.\n    onMutate: async ({ id }) => {\n      // a) Un refetch en vol ramènerait l'ANCIEN stock par-dessus notre pari.\n      await queryClient.cancelQueries({ queryKey: ['produits'] });\n      // b) Photo d'identité du cache, pour pouvoir revenir en arrière.\n      const avant = queryClient.getQueryData(['produits']);\n      // c) Écriture optimiste : pure, immutable (sinon pas de re-render).\n      queryClient.setQueryData(['produits'], (anciens = []) =>\n        anciens.map((p) => (p.id === id ? { ...p, stock: p.stock - 1 } : p))\n      );\n      // d) Le contexte suit la mutation partout (onError, onSuccess…).\n      return { avant };\n    },\n\n    // Phase 2 — le pari est perdu : on rembourse.\n    onError: (err, variables, contexte) => {\n      if (contexte?.avant) queryClient.setQueryData(['produits'], contexte.avant);\n    },\n\n    // Phase 3 — succès ou échec : on se recale sur la vérité serveur.\n    onSettled: () => {\n      queryClient.invalidateQueries({ queryKey: ['produits'] });\n    },\n  });\n}\n",
        "explain": "Retiens la chorégraphie comme une recette de marché : ANNONCER, PHOTOGRAPHIER, PARIER, REMBOURSER si besoin. cancelQueries d'abord, parce qu'un refetch en vol est une trainée de poudre : il contiendrait l'ancien stock et réécrirait le cache après ton pari — annulé, il ne gêne plus. Le snapshot ensuite : sans photo, impossible de revenir exactement à l'état d'avant (plusieurs ventes concurrentes rendent tout « -1 » mental faux). L'écriture optimiste enfin, immuable pour que le re-render ait lieu. onSettled qui invalide est ta ceinture de sécurité finale : même après succès, tu confirmes que client et serveur racontent la même histoire — le serveur reste la source de vérité, l'optimiste n'est qu'un prêt d'expérience utilisateur."
    },
    "criteria": [
        "Le stock se met à jour instantanément au clic, sans blocage visuel, puis se confirme via invalidation.",
        "Le rollback a été démontré (serveur coupé) avec restauration fidèle du cache et message clair.",
        "La chaîne cancel → snapshot → setQueryData → contexte → onSettled est complète et dans l'ordre."
    ],
    "variants": [
        "Ajoute un compteur « Ventes du jour » qui s'incrémente optimistement avec les mêmes précautions.",
        "Gère plusieurs ventes rapides du MÊME produit : ton setQueryData fonctionnel doit empiler correctement les -1.",
        "Défi : factorise un helper `optimistePatch(queryKey, id, patch)` réutilisable pour d'autres champs (prix, nom)."
    ],
    "related": [
        "tq-optimiste",
        "tq-mutations",
        "tq-invalidation",
        "tq-cache"
    ]
},
{
    "id": "exo-tq-boutique-cache",
    "level": "projet",
    "title": "Boutique Sèmè : catalogue, panier serveur et cache discipliné",
    "icon": "storefront",
    "minutes": 120,
    "kind": "checklist",
    "setup": "Nouveau projet : `npm create vite@latest tq-semepk -- --template react` ; `npm i @tanstack/react-query @tanstack/react-query-devtools json-server`. Écris un `db.json` riche : `produits` (18 articles du marché Sèmè City avec `categorie`, `prix`, `stock`, `image_couleur`) et `panier` (tableau vide). json-server pagine nativement : `_page` et `_per_page`.",
    "context": "Le collectif des vendeuses du marché Sèmè City veut sa boutique en ligne interne : catalogue paginé, recherche, panier côté serveur (pour le retrouver d'un autre poste), totaux fiables. Trois écrans, une seule source de vérité : le cache TanStack Query. C'est l'exercice de synthèse du module — tout ce que tu as appris se combine ici.",
    "statement": "Tu vas construire la boutique complète en appliquant la discipline du cache de bout en bout.\n\n1. **Catalogue paginé.** `useQuery` sur `['produits', { page, q }]` : json-server donne `_page`, `_per_page=8`, et `q` pour la recherche plein texte. Garde les boutons Précédent/Suivant ; désactive Suivant quand la page en contient moins de 8. Quand la recherche change, reviens en page 1. Astuce : passe `placeholderData: keepPreviousData` pour que la liste n'ait pas de flash de chargement entre deux pages.\n2. **Panier serveur.** Queries `['panier']` (GET) ; mutations : ajouter (POST — si la ligne existe déjà, PATCH la quantité à la place), changer quantité (PATCH), retirer (DELETE), vider (DELETE en boucle ou json-server extend). Toutes terminent par invalidateQueries(['panier']) — l'ajout et le +1/-1 passent en **optimiste** (cancel, snapshot, rollback) ; le retrait peut rester en invalidation simple.\n3. **Cohérence stock.** Ajouter au panier décrémente le stock affiché — tu peux soit tout mutation→invalidation double (['produits', …] + ['panier']), soit, plus finement, dériver le « stock restant » : `stock - (quantitéDansLePanier || 0)`. Choisis la dérivation (elle évite les écritures concurrentes) et justifie-la dans un commentaire.\n4. **Totaux dérivés.** Le badge du panier (nombre d'articles) et le total FCFA sont `select`-és depuis la query ['panier'] — utilise l'option `select` de useQuery pour dériver, pas un second state.\n5. **Fraîcheur maîtrisée.** Configure le client : `staleTime: 15_000` global, `refetchOnWindowFocus` conservé pour le panier (multi-postes !) mais `false` pour le catalogue. Explique en commentaire pourquoi ces choix de fraîcheur sont métiers, pas techniques.\n6. **Devtools obligatoires.** Ajoute les React Query Devtools et réalise une checklist de démonstration : cache des pages, invalidations au panier, états internes pendant une mutation optimiste.\n7. **Tests de panne.** Catalogue lève bien ses erreurs (json-server coupé) avec retry ; panier idem ; une mutation optimiste rollback proprement.\n\nCe qui est évalué : les queryKeys composées qui transportent les paramètres, keepPreviousData pour la pagination, les mutations optimistes vs simples choisies à bon escient, les dérivations via `select`, la configuration volontaire de la fraîcheur, et l'hygiène absolue : zéro useEffect de fetch, zéro copie de données serveur dans useState.",
    "constraints": [
        "Toutes les données serveur vivent dans TanStack Query : aucun fetch dans useEffect, aucune copie dans useState (seuls les inputs et la page courante sont locaux).",
        "La pagination et la recherche voyagent dans la queryKey ; la liste utilise placeholderData: keepPreviousData.",
        "Le stock restant est DÉRIVÉ (catalogue + panier), pas écrit en double sur le serveur.",
        "Les mutations d'ajout/quantité sont optimistes avec snapshot et rollback ; le reste invalide proprement.",
        "Totaux et compteurs proviennent de `select` sur les queries concernées."
    ],
    "checklist": [
        "Le catalogue affiche 8 produits par page, Précédent/Suivant fonctionnels, sans flash de chargement entre pages (keepPreviousData).",
        "La recherche « gari » réduit la liste et repart en page 1 ; effacer la recherche restaure tout.",
        "Ajouter deux fois le même produit incrémente sa ligne de panier (PATCH), sans doublon.",
        "Le badge panier affiche le total d'articles instantanément (optimiste) ; couper le serveur le fait revenir proprement.",
        "Le stock restant affiché diminue quand le produit entre dans le panier, sans double écriture observée.",
        "Changer d'onglet rafraîchit le panier (multi-postes) mais pas le catalogue — la nuance est codée ET commentée.",
        "Les devtools montrent les clés ['produits', {…}] distinctes par page/recherche, et ['panier'] unique.",
        "json-server coupé : catalogue et panier affichent des erreurs élégantes avec Réessayer ; une vente optimiste rollback.",
        "`npm run build` passe sans avertissement ; aucune boucle de rendu (queryKeys stables).",
        "Je sais présenter en 2 minutes la carte des queryKeys de l'application et qui les invalide."
    ],
    "hints": [
        "La query paginée : `useQuery({ queryKey: ['produits', { page, q }], queryFn: () => fetchProduits({ page, q }), placeholderData: keepPreviousData })` — importe keepPreviousData depuis @tanstack/react-query. La page courante et q vivent dans useState : ce sont de VRAIS états UI.",
        "Le stock restant dérivé : `const lignes = useQuery({ queryKey: ['panier'], … }).data ?? []; const quantiteAuPanier = (id) => lignes.find(l => l.produitId === id)?.quantite ?? 0;` puis `stockRestant = p.stock - quantiteAuPanier(p.id)`. Aucune écriture de stock côté serveur à chaque ajout : la vérité reste « stock physique + panier actuel ».",
        "Les totaux via select : `useQuery({ queryKey: ['panier'], queryFn: fetchPanier, select: (lignes) => ({ lignes, nb: lignes.reduce((n, l) => n + l.quantite, 0), total: lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0) }) })` — select mémorise la projection et ne re-rend que si le résultat change."
    ],
    "solution": {
        "lang": "js",
        "label": "architecture cache — solution commentée (extraits)",
        "code": "\n// ========== queryClient.js — la fraîcheur est un choix MÉTIER ==========\nexport const queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 15_000,            // catalogue consulté souvent, modifié peu\n      retry: 1,\n    },\n  },\n});\n\n// ========== queries.js — UNE seule adresse par donnée ==========\nexport function useProduits({ page, q }) {\n  return useQuery({\n    queryKey: ['produits', { page, q }],   // page 1 ≠ page 2 ≠ recherche\n    queryFn: () => fetchProduits({ page, q }),\n    placeholderData: keepPreviousData,     // pas de flash entre deux pages\n    refetchOnWindowFocus: false,           // catalogue : pas urgent au focus\n  });\n}\n\nexport function usePanier() {\n  return useQuery({\n    queryKey: ['panier'],\n    queryFn: fetchPanier,                  // panier : refetchOnWindowFocus ACTIF\n    select: (lignes) => ({                 // (autres postes de caisse !)\n      lignes,\n      nb: lignes.reduce((n, l) => n + l.quantite, 0),\n      total: lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0),\n    }),\n  });\n}\n\nexport const stockRestant = (p, lignes) =>\n  p.stock - (lignes.find((l) => l.produitId === p.id)?.quantite ?? 0);\n\n// ========== useAjouterAuPanier.js — optimiste discipliné ==========\nexport function useAjouterAuPanier() {\n  const qc = useQueryClient();\n  return useMutation({\n    mutationFn: postOuPatchLigne,\n    onMutate: async ({ produit }) => {\n      await qc.cancelQueries({ queryKey: ['panier'] });\n      const avant = qc.getQueryData(['panier']);\n      qc.setQueryData(['panier'], (old = []) => {\n        const ex = old.find((l) => l.produitId === produit.id);\n        return ex\n          ? old.map((l) => l.produitId === produit.id ? { ...l, quantite: l.quantite + 1 } : l)\n          : [...old, { produitId: produit.id, nom: produit.nom, quantite: 1, prixUnitaire: produit.prix }];\n      });\n      return { avant };\n    },\n    onError: (e, v, ctx) => ctx?.avant && qc.setQueryData(['panier'], ctx.avant),\n    onSettled: () => qc.invalidateQueries({ queryKey: ['panier'] }),\n  });\n}\n",
        "explain": "Ce projet démontre l'architecture mentale de TanStack Query : le cache est ta base de données cliente, les queryKeys en sont le schéma. La pagination et la recherche entrent dans la clé parce que ce sont des ressources différentes ; keepPreviousData rend la navigation douce parce que « rien à montrer » n'est pas un état utile quand on a déjà la page précédente. Le stock restant dérivé est le choix de conception le plus important : reproduire le stock en l'écrivant deux fois (catalogue ET recalcul serveur) créerait une race condition ingérable à plusieurs postes — la dérivation coûte une ligne et supprime la classe entière de bugs. Le select, lui, transforme la requête en vue matérialisée : badge et total se recalculent sans state supplémentaire. Si tu sais expliquer chaque clé, qui la remplit, qui l'invalide, tu maîtrises TanStack Query dans ce qu'il a d'essentiel."
    },
    "criteria": [
        "Catalogue paginé + recherche + panier serveur + totaux, tous synchronisés par le cache sans fetch manuel.",
        "Mutations optimistes fonctionnelles avec rollback démontré ; invalidations ciblées et traçables dans les devtools.",
        "Choix de fraîcheur (staleTime, focus) explicites et justifiés métier ; architecture de queryKeys présentable."
    ],
    "variants": [
        "Ajoute une fiche produit (prefetch au survol de la carte) avec queryKey ['produits', id].",
        "Vide le panier avec une seule mutation « encaisser » (POST vers /ventes puis DELETE des lignes) et une invalidation groupée.",
        "Défi : persiste la page et la recherche dans l'URL (useSearchParams) — les queryKeys suivent sans effort."
    ],
    "related": [
        "tq-cache",
        "tq-pagination",
        "tq-optimiste",
        "tq-invalidation",
        "tq-devtools",
        "tq-patterns"
    ]
}
  ]
};
