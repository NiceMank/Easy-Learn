/* ============================================================
   data-tanstack.js — Contenu pédagogique TanStack Query (v5)
   Module ajouté au site existant : même contrat de données.
   Prérequis supposés : module React (rx-*), fetch et async JS.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.tanstack = {
  id: 'tanstack',
  name: 'TanStack Query',
  icon: 'cloud_sync',
  tagline: 'Le gestionnaire d\'état serveur : cache, refetch, mutations et synchronisation — sans useEffect ni usines à gaz.',
  heroTitle: 'TanStack Query, la fin des fetch dans les useEffect',

  categories: [
    /* ---------------------------------------------------------- */
    {
      id: 'premiers-pas',
      name: 'Premiers pas',
      icon: 'cloud_sync',
      fiches: [
        {
          id: 'tq-installation',
          title: 'Installation & configuration',
          icon: 'download',
          level: 'Débutant',
          tagline: '@tanstack/react-query, QueryClient, Provider et DevTools : le socle qui rend vos données serveur civilisées.',
          intro: 'TanStack Query ne remplace ni React ni votre API : c\'est une **couche de cache intelligente** posée ENTRE les deux — elle gère le chargement, le re-téléchargement, le partage des données entre composants. Mais cette couche n\'existe que si trois pièces sont posées correctement : le paquet, le `QueryClient` (le coffre), et le `QueryClientProvider` (la prise qui le rend accessible partout). Cette fiche les pose une fois, proprement, et explique pourquoi chaque détail compte.',
          blocks: [
            { t: 'h3', h: 'Pourquoi TanStack Query a-t-il besoin d\'une « mise en place » ?' },
            { t: 'p', h: 'La bibliothèque tient une promesse énorme : « donne-moi une clé et une fonction de téléchargement, je gère cache, chargement, erreurs et synchronisation ». Pour tenir cette promesse, elle doit mémoriser les réponses quelque part — et ce « quelque part » doit être UNIQUE pour toute l\'application : quand le composant Panier demande les produits 3 500 F, il doit trouver le cache rempli par le composant Catalogue. D\'où l\'architecture : UN `QueryClient` (le coffre à cache), UN `QueryClientProvider` qui l\'offre en contexte React, et des composants en dessous qui puisent dedans.' },
            { t: 'p', h: 'Analogie Boutique Awa : le `QueryClient`, c\'est le REGISTRE unique du marché où chaque échoppe note ses stocks — s\'il y en avait un par stand, deux échoppes afficheraient des prix différents. Le `Provider` est l\'affichage de ce registre à l\'entrée du marché : n\'importe quel stand (composant) peut le consulter. Installer TanStack Query, c\'est ouvrir ce registre avant d\'ouvrir les stands.' },
            { t: 'h3', h: 'Prérequis : un projet React qui tourne' },
            { t: 'table', head: ['Outil', 'Version conseillée', 'Vérification'], rows: [
              ['Projet React (Vite recommandé)', 'React ≥ 18', 'le `npm run dev` de la fiche précédente affiche la page'],
              ['Node.js LTS', '≥ 18', '`node -v`'],
              ['Le paquet TanStack Query', '`@tanstack/react-query` v5', 'apparaît dans `package.json` après install']
            ] },
            { t: 'p', h: 'Cette fiche suppose le projet de la fiche **Installation React** (ou n\'importe quel projet React existant). Note version : le paquet s\'appelle bien `@tanstack/react-query` — l\'ancien nom `react-query` (v3) est mort, n\'installe jamais l\'ancien. La v5 est l\'API que tout ce module utilise.' },
            { t: 'h3', h: 'Poser les trois pièces, une par une' },
            { t: 'p', h: 'Pièce n°1, le paquet : une seule ligne de magasin. Pièce n°2, le `QueryClient` : l\'objet-cerveau où vit le cache. Et l\'habitude qui sauve des heures : on le crée HORS du composant (au niveau du module), sinon chaque re-rendu de `App` fabricait un coffre NEUF — cache vidé en silence. Pièce n°3, le `Provider` : il « branche » le coffre sur le contexte React, exactement comme un thème ou un routeur le feraient.' },
            { t: 'code', lang: 'bash', label: 'Terminal — installation du paquet', code:
'# depuis la racine du projet React (boutique-awa/)\nnpm install @tanstack/react-query\n# optionnel mais vivement recommandé : les DevTools\nnpm install -D @tanstack/react-query-devtools\n# npm installe, puis vérifie package.json :\n#   "dependencies":    { "@tanstack/react-query": "^5.x", … }\n#   "devDependencies": { "@tanstack/react-query-devtools": "^5.x", … }' },
            { t: 'code', lang: 'jsx', label: 'src/main.jsx — le câblage complet, commenté ligne à ligne', code:
'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport { QueryClient, QueryClientProvider } from "@tanstack/react-query";\nimport { ReactQueryDevtools } from "@tanstack/react-query-devtools";\nimport App from "./App.jsx";\n\n// Pièce 2 : le coffre à cache — créé ICI, une fois, hors de tout composant\n// (créé dans App, il serait recréé → cache vidé à chaque re-rendu !)\nconst queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 60_000,        // une donnée « fraîche » pendant 1 min :\n                                // pas de re-téléchargement incessant entre vues\n      retry: 2                  // réseau capricieux (3G) : 2 essais avant erreur\n    }\n  }\n});\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  <React.StrictMode>\n    {/* Pièce 3 : le registre est affiché à l\'entrée — TOUTE l\'app en dessous */}\n    <QueryClientProvider client={queryClient}>\n      <App />\n      {/* DevTools : l\'inspecteur du cache, visible en dev, absent de la prod */}\n      <ReactQueryDevtools initialIsOpen={false} />\n    </QueryClientProvider>\n  </React.StrictMode>\n);' },
            { t: 'h3', h: 'Pourquoi le Provider doit-il être à la RACINE ?' },
            { t: 'p', h: 'Le `Provider` n\'a d\'effet que sur sa DESCENDANCE : tout composant SOUS lui peut appeler `useQuery`, aucun composant au-dessus ou à côté. Le placer trop bas — autour d\'une seule page — c\'est fabriquer DEUX coffres : les données partagées entre la page Catalogue et la page Panier ne se rencontreraient jamais, et tu perdrais le bénéfice principal (le partage de cache). La règle sans exception : **directement autour de `<App />`**, au plus haut — avec le routeur en dessous, lui aussi a besoin du cache.' },
            { t: 'h3', h: 'La vérification qui calme (le rituel complet)' },
            { t: 'ol', items: [
              '`npm install @tanstack/react-query` termine sans erreur rouge et ajoute la ligne au `package.json`.',
              '`main.jsx` contient les trois pièces : imports, `const queryClient = new QueryClient()` HORS du composant, `<QueryClientProvider client={queryClient}>` autour de `App`.',
              '`npm run dev` redémarre sans erreur — la page s\'affiche EXACTEMENT comme avant (le provider est invisible, c\'est normal).',
              'Le petit logo TanStack Query flotte en bas de l\'écran (les DevTools) : un clic ouvre l\'inspecteur du cache — pour l\'instant vide, la fiche **useQuery** le remplira.',
              'Test de l\'inspecteur : supprime volontairement le Provider → console rouge « No QueryClient set » ; remets-le → tout repartir. Tu as compris physiquement à quoi il sert.'
            ] },
            { t: 'callout', kind: 'info', h: 'DevTools et production : `ReactQueryDevtools` n\'est inclus que dans le bundle de développement — en build `npm run build`, Vite les retire (process.env.NODE_ENV), zéro poids pour le client final. Installe-les donc sans arrière-pensée : elles ne partiront jamais chez l\'utilisateur, et elles t\'expliqueront mieux que mille console.log pourquoi une requête se relance.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le QueryClient, c\'est la base de données. »** Non : c\'est un CACHE en mémoire — il retient les réponses de VOTRE API entre deux composants/deux pages. Coupé la connexion, il ne fabrique rien.',
              '**« Un seul provider pour toute l\'app, ça va à l\'encontre du découpage par page. »** C\'est précisément l\'inverse : le coffre DOIT être unique pour que la page Panier bénéficie du cache de la page Catalogue. Découper ici = deux registres discordants.',
              '**« `new QueryClient()` dans le composant, « comme ça il reste à jour ». »** C\'est l\'anti-pattern n°1 : chaque re-rendu jette le coffre et en refabrique un NEUF — le cache se vide à chaque render, les requêtes repartent, et l\'app « clignote ».',
              '**« Les DevTools alourdissent l\'utilisateur final. »** Non : elles n\'existent qu\'en build de développement ; le build de production les exclut.',
              '**« react-query (sans @tanstack) est la bonne installation. »** Non : c\'est l\'ancienne v3. Le paquet actuel est `@tanstack/react-query`, v5 — vérifier dans `package.json` qu\'il commence bien par @tanstack.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux câblages qui semblent « aller » — jusqu\'à ce que le cache disparaisse silencieusement : le Provider planté trop bas dans l\'arbre, et le QueryClient recréé à chaque rendu faute d\'avoir été externalisé.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu as posé l\'infrastructure sur laquelle TOUT ce module se branche : la fiche **State serveur vs state client** explique pourquoi ce coffre remplace à lui seul moitié de ton `useState` ; **useQuery** remplira le cache vidé que tu observe dans les DevTools ; **Mutations & invalidation** fera circuler l\'ordre « invalide » du même coffre. Côté amont, tout part du projet de la fiche **Installation React** — même `npm install`, même `main.jsx`, même serveur Vite. Et note la symétrie : `QueryClientProvider` et `ThemeProvider`/`Router` se placent exactement au même endroit — tout ce qui doit « exister partout » monte à la racine de l\'arbre React.' },
          ],
          errors: [
            {
              title: 'Le QueryClientProvider planté trop bas (ou oublié)',
              bad: 'function Catalogue() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <ListeProduits />  {/* useQuery marche ICI… */}\n    </QueryClientProvider>\n  );\n}\nfunction Panier() {\n  return <ResumePanier />;  {/* « No QueryClient set » KO écran rouge\n       ou pire : un DEUXIÈME coffre, jamais partagé avec Catalogue */}\n}',
              good: '// main.jsx — le coffre est affiché UNE fois, à l\'entrée :\n<QueryClientProvider client={queryClient}>\n  <App />   {/* catalogue, panier, compte : tout le monde partage\n                 LE MÊME cache — c\'est la raison d\'être de l\'outil */}\n</QueryClientProvider>',
              why: 'Le Provider agit par CONTEXTE : seuls ses descendants voient le cache. Placé autour d\'une page, tous les composants hors de cette branche héritent d\'un vide (« No QueryClient set, useQuery… ») — ou d\'un second coffre concurrent si on « répare » en dupliquant le Provider. Le partage du cache entre vues étant LE bénéfice central de TanStack Query, la règle est absolue : UN provider, à la racine, autour de tout — routeur inclus.'
            },
            {
              title: 'Recréer le QueryClient à chaque rendu',
              bad: 'function App() {\n  const queryClient = new QueryClient();   // DANS le composant !\n  return (\n    <QueryClientProvider client={queryClient}>\n      <Catalogue />\n    </QueryClientProvider>\n  );\n}\n// chaque re-rendu de App → un NOUVEAU coffre vide :\n// le cache clignote, les requêtes re-téléchargent en boucle,\n// les DevTools affichent un cache qui se remplit… et se vide.',
              good: '// HORS du composant, au niveau du module :\nconst queryClient = new QueryClient();\n\nfunction App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <Catalogue />\n    </QueryClientProvider>\n  );\n}\n// (variante pro : useState(() => new QueryClient()) si le client\n//  doit ABSOLUMENT vivre dans le composant — jamais neuf à l\'œil nu.)',
              why: 'Un composant React est une fonction qui se ré-exécute à chaque rendu ; tout objet créé à l\'intérieur est JETÉ à chaque passage. Le `QueryClient` étant le contenant du cache, le recréer revient à vider le sac à dos à chaque pas de course. D\'où la règle intangible : le coffre vit au niveau du module (ou dans un `useState` initialisateur si le contexte l\'exige), et le Provider ne reçoit jamais qu\'une référence stable. Le symptôme fétiche, dans les DevTools : les données qui « sautent » dès qu\'un onglet change.'
            }
          ],
          related: ['tq-concepts', 'tq-usequery', 'react-installation']
        },
        {
          id: 'tq-concepts',
          title: 'State serveur vs state client',
          icon: 'cloud_sync',
          level: 'Débutant',
          tagline: 'Pourquoi TanStack Query existe : la confusion fondatrice qu\'il dissout, et le QueryClient.',
          intro: 'Pendant des années, on a rangé dans les mêmes stores (Redux, contextes) deux choses radicalement différentes : le **state client** (onglet actif, thème, panier en cours) et le **state serveur** (les données de TON API : utilisateurs, produits, commandes). Or le state serveur n\'est pas du state : c\'est une **copie locale d\'une vérité distante**, qui peut être périmée, partagée par plusieurs écrans, et qui doit se recharger. TanStack Query est né de cette distinction : il gère exclusivement le state serveur — et il le gère entièrement.',
          blocks: [
            { t: 'h3', h: 'Ce que le state serveur exige (et qu\'on codait à la main)' },
            { t: 'ul', items: [
              'Un **cache** partagé entre composants (la liste et le détail utilisent le même post)',
              'Des outils pour savoir si la donnée est **fraîche ou périmée**',
              'Des rechargements automatiques : retour sur l\'onglet, reconnexion, intervalle',
              'La **déduplication** : deux composants demandent la même donnée → une seule requête réseau',
              'Loading, erreurs, retry — sans écrire le boilerplate à chaque fois',
              'La mise à jour après modification (mutations) sans repenser l\'architecture'
            ]},
            { t: 'p', h: 'En cumulé, c\'est des **centaines de lignes par data source** en useEffect/useReducer — avec des courses de requêtes et des caches faits maison qui fuient. TanStack Query les remplace par un modèle déclaratif : « voici la clé de la donnée, voici comment la charger, voici quand elle est périmée ».' },
            { t: 'h3', h: 'Installation et branchement : deux lignes' },
            { t: 'code', lang: 'bash', code: 'npm install @tanstack/react-query' },
            { t: 'code', lang: 'js', label: 'main.jsx — le Provider au sommet de l\'arbre', code:
'import { QueryClient, QueryClientProvider } from "@tanstack/react-query";\n\n// Le QueryClient : cerveau du cache. UNE instance par application.\nconst queryClient = new QueryClient();\n\nroot.render(\n  <QueryClientProvider client={queryClient}>\n    <App />\n  </QueryClientProvider>\n);' },
            { t: 'p', h: 'Le `QueryClient` détient le **cache global** et les réglages par défaut ; `QueryClientProvider` le diffuse à tout l\'arbre via le contexte React — tu ne crées donc jamais de deuxième client. Tous les hooks (`useQuery`, `useMutation`…) en héritent automatiquement, n\'importe où dans l\'arbre, sans props.' },
            { t: 'h3', h: 'Ce qui change mentalement' },
            { t: 'p', h: 'Avant : « j\'appelle l\'API et je stocke le résultat ». Après : « je **décris** la donnée dont mon composant a besoin (clé + fonction de chargement), et le système la synchronise ». Tu arrêtes d\'orchestrer des fetchs ; tu déclares des dépendances à des données. Le gain devient spectaculaire dès qu\'il y a plus d\'un écran.' },
            { t: 'callout', kind: 'tip', h: 'Règle de pensée : **client state → useState/useReducer/contexte ; server state → TanStack Query**. Le jour où les deux ne se mélangent plus, les architectures deviennent minces — et les bugs de « données pas à jour » disparaissent.' }
          ],
          errors: [
            { title: 'Créer le QueryClient dans le composant', bad: 'function App() {\n  const client = new QueryClient();   // recréé à CHAQUE rendu !\n  return <QueryClientProvider client={client}>...', good: 'const queryClient = new QueryClient();   // hors du composant,\nfunction App() {                          // créé UNE fois au module\n  return <QueryClientProvider client={queryClient}>...', why: 'Un client recréé à chaque rendu = cache détruit à chaque rendu : tout le bénéfice de la librairie s\'évanouit. Le client vit AU MODULE (ou dans un useState init en cas de SSR avancé).' },
            { title: 'Tout ranger dans TanStack Query, même le local', bad: 'useQuery({ queryKey: ["theme"], ... })\n// le thème, l\'onglet actif, le brouillon de formulaire...', good: '// theme/onglets → useState ou contexte.\n// TanStack Query → ce qui vient du SERVEUR.', why: 'Le moteur entier (refetch auto, invalidation, retries) est conçu pour la donnée distante. Y loger du state d\'interface local crée des effets de bord absurdes (le thème qui se « recharge ») et brouille la séparation des responsabilités.' }
          ],
          related: ['tq-usequery', 'tq-cache', 'rx-concepts', 'js-asynchrone']
        },

        {
          id: 'tq-usequery',
          title: 'useQuery : clés & fonctions',
          icon: 'download_for_offline',
          level: 'Débutant',
          tagline: 'queryKey + queryFn : le duo fondateur. Une clé bien conçue, c\'est 80 % de la réussite du cache.',
          intro: '`useQuery` est le hook central de la librairie, et il ne demande que deux choses : **`queryKey`, l\'adresse unique de la donnée** dans le cache, et **`queryFn`, la façon de l\'aller chercher**. Tout le reste — chargement, mise en cache, partage entre composants, rechargement — est automatique. La vraie compétence, c\'est de concevoir des clés bien structurées.',
          blocks: [
            { t: 'h3', h: 'Le premier useQuery' },
            { t: 'code', lang: 'js', code:
'import { useQuery } from "@tanstack/react-query";\n\nfunction ListePosts() {\n  const { data, isPending, isError, error } = useQuery({\n    queryKey: ["posts"],                // adresse de la donnée dans le cache\n    queryFn: () =>\n      fetch("/api/posts").then((r) => {\n        if (!r.ok) throw new Error("HTTP " + r.status);\n        return r.json();\n      }),\n  });\n\n  if (isPending) return <p>Chargement…</p>;\n  if (isError) return <p>Erreur : {error.message}</p>;\n\n  return <ul>{data.map((p) => <li key={p.id}>{p.titre}</li>)}</ul>;\n}' },
            { t: 'p', h: 'Observe la **`queryFn`** : elle doit retourner **une promesse qui résout les données** (ou lever une erreur). Toute fonction async marche — fetch, axios, SDK maison. Et la réponse du hook te donne les états prêts à l\'emploi (fiche États) : plus aucun `useState`/`useEffect` de chargement.' },
            { t: 'h3', h: 'La queryKey : l\'identité de la donnée' },
            { t: 'code', lang: 'js', code:
'// Clé simple pour la LISTE :\nqueryKey: ["posts"]\n\n// Clé PARAMÉTRÉE pour le DÉTAIL (l\'id fait partie de l\'adresse !) :\nqueryKey: ["posts", postId]\nqueryFn: () => fetch("/api/posts/" + postId).then((r) => r.json())\n\n// Clé avec FILTRES : chaque combinaison de filtres = un cache distinct\nqueryKey: ["posts", { statut: "publie", page: 2 }]\n\n// Hiérarchie pensée pour l\'invalidation (fiche dédiée) :\n// ["posts"]                         → toute la famille\n// ["posts", "list", filtres]        → les listes\n// ["posts", "detail", 42]           → un détail précis' },
            { t: 'p', h: 'Le cache PENSE comme une grosse Map : clé vue → donnée servie sans requête, clé inconnue → fetch. Deux points subtiles : l\'ordre des éléments du **tableau** compte (`["posts", id]` ≠ `[id, "posts"]`), mais l\'ordre des propriétés d\'un **objet** non (`{a:1,b:2}` ≡ `{b:2,a:1}`). Et la clé contient tout ce qui fait varier la donnée : si une variable influence le résultat du fetch, elle **doit** figurer dans la clé.' },
            { t: 'h3', h: 'La règle d\'or des clés' },
            { t: 'callout', kind: 'warn', h: 'Toute variable utilisée dans `queryFn` doit apparaître dans la `queryKey`. Un filtre oublié dans la clé, c\'est la liste « filtrée » qui affiche les données d\'un autre filtre — le bug de cache le plus classique, détaillé dans les erreurs ci-dessous.' },
            { t: 'h3', h: 'Déduplication gratuite' },
            { t: 'p', h: 'Trois composants appellent `useQuery(["posts"])` au même instant ? TanStack Query **n\'envoie qu\'une seule requête** et distribue le résultat aux trois (et même aux vingt prochains montages, tant que le cache est frais). C\'est la fin des fetch coordination manuelle entre parent et enfants.' }
          ],
          errors: [
            { title: 'Variable hors de la clé : collision de cache', bad: 'const [statut, setStatut] = useState("publie");\nuseQuery({\n  queryKey: ["posts"],                    // statut absent !\n  queryFn: () => fetchPosts(statut),\n});\n// change de filtre → le cache ["posts"] sert les ANCIENNES données', good: 'useQuery({\n  queryKey: ["posts", { statut }],\n  queryFn: () => fetchPosts(statut),\n});', why: 'Le cache indexe sur la clé ENTIÈRE. statut absent → tous les filtres partagent la même entrée : l\'UI affiche les données du mauvais filtre, rechargements compris. Changé de variable ? Changé de clé, point final.' },
            { title: 'queryFn qui retourne undefined ou oublie le throw', bad: 'queryFn: () => {\n  fetch("/api/posts").then(r => r.json());\n  // pas de return → promesse indéfinie, data reste undefined\n}', good: 'queryFn: () =>\n  fetch("/api/posts").then((r) => {\n    if (!r.ok) throw new Error("HTTP " + r.status);\n    return r.json();\n  });', why: 'La promesse résolue SANS valeur laisse data à undefined et pending factice. Et un HTTP 404/500 non throwé est traité comme un succès (même règle que fetch brut : response.ok se teste soi-même — fiche fetch JS).' }
          ],
          related: ['tq-etats', 'tq-cache', 'tq-dependantes', 'js-fetch']
        },

        {
          id: 'tq-etats',
          title: 'États de requête',
          icon: 'pending',
          level: 'Débutant',
          tagline: 'isPending, isFetching, isError, isSuccess — et la distinction qui change tout : chargé vs en cours.',
          intro: 'Une requête TanStack Query a **deux vies superposées** : sa vie de réponse (pending → success/error) et sa vie d\'activité réseau (fetching ↔ idle). Confondre les deux amène le bug le plus fréquent du débutant : le spinner qui **masque les données** pendant un rechargement de fond. Cinq minutes suffisent pour ne plus jamais le faire.',
          blocks: [
            { t: 'h3', h: 'La carte des états' },
            { t: 'table', head: ['Propriété', 'Vraie quand…', 'Usage'], rows: [
              ['`isPending`', 'Pas encore de données (1ʳᵉ fois)', 'Le spinner PLEIN ÉCRAN du premier chargement'],
              ['`isFetching`', 'Une requête est en cours (même en fond)', 'Indicateur DISCRET en coin, jamais bloquant'],
              ['`isError` + `error`', 'La dernière tentative a échoué', 'Message d\'erreur + bouton réessayer'],
              ['`isSuccess`', 'On a des données (fraîches ou cachées)', 'Rendu principal'],
              ['`isRefetching`', 'isFetching mais PAS la première fois', 'Rafraîchissement de fond explicite'],
              ['`isPlaceholderData`', 'Données temporaires d\'un autre cache', 'Pagination fluide (fiche Pagination)']
            ]},
            { t: 'code', lang: 'js', code:
'const { data, isPending, isError, error, isFetching } = useQuery({ ... });\n\nif (isPending) return <SpinnerPleinEcran />;   // 1ʳᵉ fois seulement\nif (isError) return <BlocErreur erreur={error} />;\n\nreturn (\n  <div>\n    {isFetching && <PetitSpinnerEnCoin />}     // fond : on GARDE les données\n    <Liste items={data} />\n  </div>\n);' },
            { t: 'p', h: 'C\'est le modèle mental « stale-while-revalidate » : les données en cache s\'affichent **immédiatement**, la mise à jour arrive en fond, l\'écran ne saute jamais. `isFetching` t\'informe, `isPending` te bloque. Ordonne-les mentalement ainsi et tu n\'écriras plus jamais un spinner qui clignote sur une page déjà remplie.' },
            { t: 'h3', h: 'Refetch manuel et statut de la dernière' },
            { t: 'code', lang: 'js', code:
'const { refetch, isRefetching, dataUpdatedAt } = useQuery({ ... });\n\n<button onClick={() => refetch()} disabled={isRefetching}>\n  {isRefetching ? "Actualisation…" : "Actualiser"}\n</button>\n<p>Mis à jour {new Date(dataUpdatedAt).toLocaleTimeString()}</p>' },
            { t: 'callout', kind: 'tip', h: 'Renommage v4 → v5 à connaître en lisant d\'anciens exemples : `isLoading` est devenu **`isPending`** (sens identique : aucune donnée disponible), et `cacheTime` est devenu **`gcTime`** (fiche Cache). Les docs datées de 2022-2023 utilisent encore les anciens noms.' }
          ],
          errors: [
            { title: 'Spinner bloquant sur isFetching', bad: 'const { data, isFetching } = useQuery(...);\nif (isFetching) return <Spinner />;\n// refocus de l\'onglet → RETOUR AU SPINNER, données dégagées !', good: 'if (isPending) return <Spinner />;\n// sinon : données affichées + indicateur de fond discret', why: 'Un refetch automatique (retour d\'onglet, reconnexion) déclenche isFetching : tout l\'écran repasse au chargement alors que les données sont là. Seul isPending, l\'absence de données, justifie de bloquer la vue.' },
            { title: 'Trois states locaux fait main en plus des états fournis', bad: 'const [loading, setLoading] = useState(false);\nconst [erreur, setErreur] = useState(null);\n// ... synchronisés à la main avec useQuery', good: '// useQuery retourne TOUT : data, isPending, isError,\n// error, isFetching. Ne duplique jamais ces états.', why: 'Dupliquer les états fournis par le hook dans du useState recrée les désynchronisations que la librairie existe pour éliminer. Lis les états du hook, directement — source unique de vérité.' }
          ],
          related: ['tq-usequery', 'tq-cache', 'tq-erreurs', 'rx-patterns']
        }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'cache-sync',
      name: 'Cache & synchronisation',
      icon: 'cached',
      fiches: [
        {
          id: 'tq-cache',
          title: 'staleTime, gcTime & refetch auto',
          icon: 'cached',
          level: 'Intermédiaire',
          tagline: 'La donnée fraîche vs périmée, la poubelle du cache, et les rechargements que tu n\'as pas à coder.',
          intro: 'Le cache de TanStack Query n\'est pas un placard où l\'on jette des données — c\'est un **système de fraîcheur** : chaque entrée a une durée de vie, se revalide d\'elle-même aux bons moments, et finit par être recyclée. Deux réglages pilotent tout, et les confondre est l\'erreur la plus célèbre de la librairie : `staleTime` (quand la donnée devient-elle périmée ?) et `gcTime` (quand le cache jette-t-il l\'entrée inutilisée ?).',
          blocks: [
            { t: 'h3', h: 'Le cycle d\'une entrée de cache' },
            { t: 'ol', items: [
              '**Fetching** — requête en cours.',
              '**Fresh** — donnée fraîche : servie instantanément, AUCUNE requête. Durée : `staleTime` (défaut 0).',
              '**Stale** — périmée mais affichable : servie AUSSI (c\'est le stale-while-revalidate), avec refetch en fond selon les déclencheurs.',
              '**Inactive** — plus aucun composant ne l\'utilise. Compte à rebours `gcTime` (défaut 5 min).',
              '**Collectée** — sortie du cache : le prochain besoin repart d\'un fetch complet (isPending).'
            ]},
            { t: 'code', lang: 'js', label: 'Réglages globaux et locaux', code:
'const queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 60_000,          // 1 min de fraîcheur par défaut\n      gcTime: 5 * 60_000,         // poubelle après 5 min d\'inactivité\n    },\n  },\n});\n\n// Une donnée quasi statique (liste des pays) :\nuseQuery({ queryKey: ["pays"], queryFn: fetchPays, staleTime: Infinity });\n\n// Une donnée très volatile (prix en temps presque réel) :\nuseQuery({ queryKey: ["prix"], queryFn: fetchPrix, staleTime: 0,\n           refetchInterval: 5000 });' },
            { t: 'h3', h: 'Les refetch automatiques — le « keep in sync »' },
            { t: 'table', head: ['Réglage (défaut)', 'Déclencheur'], rows: [
              ['`refetchOnWindowFocus` (true)', 'Retour de l\'utilisateur sur l\'onglet'],
              ['`refetchOnReconnect` (true)', 'La connexion internet revient'],
              ['`refetchOnMount` (true)', 'Le composant se monte avec donnée stale'],
              ['`refetchInterval` (false)', 'Polling : toutes les X ms, ex. notifications']
            ]},
            { t: 'p', h: 'Toutes ces revalidations ne s\'appliquent qu\'aux données **stale** : staleTime n\'est donc pas de la « mise en cache », c\'est la **durée pendant laquelle tu acceptes que la donnée ne soit pas revérifiée**. Un dashboard peut vivre avec 30 s ; un profil utilisateur avec 5 min ; une liste de pays avec l\'infini.' },
            { t: 'callout', kind: 'tip', h: 'Réglage d\'équipe recommandé : `staleTime: 30_000` à `60_000` global (élimine la majorité des refetchs inutiles), puis des overrides locaux pour les extrêmes (Infinity pour le statique, intervalle pour le temps réel). Le défaut 0 est pédagogique (« sûr ») mais en production il re-fetch beaucoup trop.' },
            { t: 'callout', kind: 'warn', h: 'En v5, `cacheTime` s\'appelle **`gcTime`** (garbage collect). Même rôle : durée avant destruction d\'une entrée **inutilisée**. La confusion staleTime/gcTime est si fréquente qu\'elle a sa propre carte d\'erreur ci-dessous — lis-la avant de toucher aux réglages.' }
          ],
          errors: [
            { title: 'Confondre staleTime et gcTime', bad: 'staleTime: 10 * 60_000,\ngcTime: 30_000,\n// « ma donnée reste 10 min » → elle DISPARAÎT après 30 s\n// d\'inactivité : refetch complet au retour !', good: 'staleTime: 60_000,      // fraîche 1 min : pas de refetch inutile\ngcTime: 10 * 60_000,    // conservée 10 min : retour instantané', why: 'staleTime = fraîcheur (refetch évité), gcTime = durée de conservation du cache inutilisé (retour instantané). gcTime < staleTime fait planter les deux : règle générale gcTime ≫ staleTime.' },
            { title: 'Désactiver tous les refetch auto « pour la perf »', bad: 'defaultOptions: { queries: {\n  refetchOnWindowFocus: false,\n  refetchOnReconnect: false,\n  refetchOnMount: false,\n} }\n// l\'utilisateur voit des données d\'hier sans le savoir', good: '// Garder les refetch auto (gratuits quand stale), et si\n// l\'UI doit maîtriser : désactiver PAR requête, pas globalement.', why: 'Ces options coupent la synchronisation : le cache affiche alors durablement des données potentiellement fausses. La performance se gagne par staleTime adapté, pas en aveuglant le système.' }
          ],
          related: ['tq-etats', 'tq-invalidation', 'tq-usequery', 'tq-pagination']
        },

        {
          id: 'tq-erreurs',
          title: 'Erreurs & retry',
          icon: 'error',
          level: 'Intermédiaire',
          tagline: 'Le retry automatique qui sauve (3 tentatives par défaut), et quand l\'arrêter.',
          intro: 'Une API qui renvoie 500 à la première tentative a souvent une bonne raison passagère — microcoupure réseau, réveil du serveur, 4G hésitante. TanStack Query **retente donc par défaut 3 fois** avec des délais croissants (backoff exponentiel) avant de déclarer forfait. Tout le machin est configurable ; ton rôle est de comprendre ce comportement pour ne pas le subir — et de savoir quelles erreurs ne méritent aucun retry.',
          blocks: [
            { t: 'h3', h: 'Le comportement par défaut' },
            { t: 'code', lang: 'js', code:
'useQuery({\n  queryKey: ["posts"],\n  queryFn: fetchPosts,\n  // DÉFAUTS (souvent parfaits) :\n  // retry: 3                  → 1 + 3 tentatives\n  // retryDelay: n => min(1000 * 2 ** n, 30_000)   → 1s, 2s, 4s…\n});' },
            { t: 'p', h: 'Conséquence UX directe : face à une panne, `isPending` dure **jusqu\'à ~7 secondes** (1s + 2s + 4s) avant le premier message d\'erreur. C\'est la robustesse qui se paie en latence — le spinner TanStack est _patient_. Pour les écrans sensibles à la vitesse, réduis ou conditionne.' },
            { t: 'h3', h: 'Retry intelligent : pas pour les 4xx' },
            { t: 'code', lang: 'js', code:
'useQuery({\n  queryKey: ["posts", id],\n  queryFn: fetchPost,\n  retry: (nb, erreur) => {\n    // Une 404/403 ne se « répare » pas en réessayant :\n    if (erreur.status >= 400 && erreur.status < 500) return false;\n    return nb < 3;\n  },\n});' },
            { t: 'p', h: 'Retenter une 404 ou une 401 est pire qu\'inutile : ça retarde l\'erreur réelle et multiplie les appels au serveur. La fonction `retry(nombre, erreur)` décide tentative par tentative — la règle commune est « retry sur 5xx et réseau, stop sur 4xx ». Les mutations, elles, **ne retentent pas par défaut** : recommander une écriture à l\'aveugle est dangereux (double commande possible).' },
            { t: 'h3', h: 'Trois façons d\'afficher l\'échec final' },
            { t: 'code', lang: 'js', code:
'// 1. En ligne, le classique :\nif (isError) return <BlocErreur message={error.message} onRetry={refetch} />;\n\n// 2. Les erreurs silencieuses en fond (rare) :\nuseQuery({ ..., retry: false, });\n\n// 3. Les Error Boundaries pour le crash-total :\nuseQuery({ ..., throwOnError: true });\n// → l\'erreur remonte au <ErrorBoundary> React le plus proche.' },
            { t: 'callout', kind: 'tip', h: 'Pense l\'erreur en deux couches : la vraie panne (réseau mort, API down → retry + message + bouton « Réessayer » via `refetch()`) et l\'erreur métier (403, 422 du serveur → pas de retry, message adapté). Le `error` du hook transporte tout ce que ta queryFn a levé — enrichis-le avec le statut HTTP dans la queryFn (voir fiche fetch JS).' }
          ],
          errors: [
            { title: 'Retry désactivé globalement', bad: 'new QueryClient({ defaultOptions: {\n  queries: { retry: 0 },\n} })', good: '// Garder le retry par défaut des requêtes, ne désactiver\n// que ponctuellement (form sensible, debug).', why: 'Retry 0 transforme chaque microcoupure réseau — omniprésentes en mobilité — en écran d\'erreur. Le retry par défaut existe parce que la majorité des échecs HTTP sont transitoires : tu veux ce filet.' },
            { title: 'Retenter les écritures comme les lectures', bad: 'useMutation({\n  mutationFn: creerCommande,\n  retry: 3,   // ⚠️ potentiellement TROIS commandes en base\n});', good: '// Mutations : retry 0 par défaut (à garder), ou idempotence\n// serveur garantie avant tout retry custom.', why: 'Une lecture retentée est bénigne ; une écriture retentée peut DUPLIQUER la donnée (le premier POST a peut-être réussi avant la coupure). Sans endpoint idempotent conçu pour, on ne retry pas les mutations.' }
          ],
          related: ['tq-etats', 'tq-cache', 'tq-mutations', 'js-erreurs']
        }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'ecriture',
      name: 'Modifier les données',
      icon: 'sync_alt',
      fiches: [
        {
          id: 'tq-mutations',
          title: 'useMutation',
          icon: 'sync_alt',
          level: 'Intermédiaire',
          tagline: 'Créer, modifier, supprimer — puis synchroniser le cache. Sans invalidation, rien ne rejaillit.',
          intro: '`useQuery` lit ; `useMutation` écrit. Le hook gère les états de l\'écriture (pending, success, error) — mais le point capital est ailleurs : après une modification réussie, **le cache doit apprendre la nouvelle**, sinon l\'UI continue d\'afficher l\'ancienne version. C\'est là que le binôme `onSuccess` + `invalidateQueries` entre en scène, et c\'est LA gymnastique à automatiser.',
          blocks: [
            { t: 'h3', h: 'Anatomie d\'une mutation' },
            { t: 'code', lang: 'js', code:
'import { useMutation, useQueryClient } from "@tanstack/react-query";\n\nfunction FormulairePost() {\n  const queryClient = useQueryClient();\n\n  const ajout = useMutation({\n    mutationFn: (nouveau) =>\n      fetch("/api/posts", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify(nouveau),\n      }).then((r) => {\n        if (!r.ok) throw new Error("Échec de création");\n        return r.json();\n      }),\n\n    // LA clé du système : après succès, on synchronise le cache\n    onSuccess: () => {\n      queryClient.invalidateQueries({ queryKey: ["posts"] });\n    },\n  });\n\n  return (\n    <button\n      disabled={ajout.isPending}\n      onClick={() => ajout.mutate({ titre: "Nouveau", contenu: "..." })}\n    >\n      {ajout.isPending ? "Envoi…" : "Publier"}\n    </button>\n  );\n}' },
            { t: 'p', h: '`mutationFn` reçoit le payload de `mutate(payload)`. Le retour du hook donne `isPending` (bouton désactivé, anti-double-clic gratuit), `isError`/`error`, `isSuccess` — les mêmes états que les requêtes, sans cache ni retry automatique (une écriture, ça ne se « recharge » pas).' },
            { t: 'h3', h: 'Le trio des callbacks pour bien réagir' },
            { t: 'code', lang: 'js', code:
'useMutation({\n  mutationFn: modifierPost,\n  onSuccess: (data, variables) => {\n    // rafraîchir les lectures concernées\n    queryClient.invalidateQueries({ queryKey: ["posts"] });\n    queryClient.invalidateQueries({ queryKey: ["posts", variables.id] });\n  },\n  onError: (erreur) => {\n    toast.error(erreur.message);                      // signaler honnêtement\n  },\n  onSettled: () => {\n    // dans TOUS les cas : réactiver, nettoyer…\n  },\n});' },
            { t: 'h3', h: 'mutate vs mutateAsync' },
            { t: 'code', lang: 'js', code:
'// mutate : « fire and forget » géré par les callbacks\najout.mutate(payload);\n\n// mutateAsync : promesse, pour ENCHAÎNER (navigation après succès…)\ntry {\n  const post = await ajout.mutateAsync(payload);\n  navigate("/posts/" + post.id);        // n\'exécute qu\'après succès\n} catch {\n  // l\'erreur a déjà été affichée par onError ; ici on ne navigue pas\n}' },
            { t: 'callout', kind: 'warn', h: 'Oublier l\'invalidation est LE bug n°1 des mutations (voir carte d\'erreur) : l\'utilisateur crée, la liste ne change pas — normal, le cache n\'a pas été prévenu. Réflexe à forger : chaque mutation réussie se termine par « quelles requêtes sont maintenant périmées ? »' }
          ],
          errors: [
            { title: 'Mutation sans invalidation : liste fantôme', bad: 'useMutation({\n  mutationFn: supprimerPost,\n  // aucun onSuccess : la liste garde l\'élément supprimé !\n});', good: 'onSuccess: () => {\n  queryClient.invalidateQueries({ queryKey: ["posts"] });\n  // la liste se re-fetch automatiquement, l\'élément disparaît\n}', why: 'Le cache ne devine pas les écritures : sans invalidation, les listes affichent des données périmées jusqu\'au prochain refetch naturel (long). Déclare systématiquement les clés impactées — c\'est le prolongement manuel de la synchronisation automatique.' },
            { title: 'Naviguer sans attendre la fin de la mutation', bad: 'ajout.mutate(payload);\nnavigate("/posts");   // part AVANT la réponse :\n// échec silencieux possible, liste non invalidée', good: 'const post = await ajout.mutateAsync(payload);\nqueryClient.invalidateQueries({ queryKey: ["posts"] });\nnavigate("/posts/" + post.id);', why: 'mutate ne promet rien : la navigation peut couper avant la synchronisation (et masquer l\'erreur). Pour enchaîner une action sur le succès, mutateAsync dans un try/catch est la forme propre.' }
          ],
          related: ['tq-invalidation', 'tq-optimiste', 'tq-etats', 'rx-formulaires', 'js-fetch']
        },

        {
          id: 'tq-invalidation',
          title: 'Invalidation & refetch manuel',
          icon: 'autorenew',
          level: 'Intermédiaire',
          tagline: 'invalidateQueries, la précision des préfixes, setQueryData et prefetch — les commandes du cache.',
          intro: 'L\'invalidation est le complément des refetchs automatiques : toi seul sais qu\'une mutation a rendu certaines données fausses, et c\'est à toi de le dire. `invalidateQueries` marque des entrées comme **stale** et les re-fetch si elles sont visibles à l\'écran ; `setQueryData` les réécrit directement ; `prefetchQuery` les pré-charge avant le besoin. Ce sont les trois leviers de précision du système.',
          blocks: [
            { t: 'h3', h: 'invalidateQueries : par clé, avec préfixe' },
            { t: 'code', lang: 'js', code:
'// Invalider TOUTE la famille posts (listes ET détails) :\nqueryClient.invalidateQueries({ queryKey: ["posts"] });\n\n// Uniquement un détail précis :\nqueryClient.invalidateQueries({ queryKey: ["posts", postId] });\n\n// Filtrage fin sur les listes seules (si tu as structuré tes clés) :\nqueryClient.invalidateQueries({ queryKey: ["posts", "list"] });\n\n// Tout le cache (rare, brutal) :\nqueryClient.invalidateQueries();' },
            { t: 'p', h: 'La correspondance fonctionne par **préfixe de tableau** : `["posts"]` touche `["posts"]`, `["posts", 42]`, `["posts", "list", {...}]`… C\'est la raison d\'être de la hiérarchie de clés de la fiche useQuery — bien nommées, elles offrent la précision chirurgicale ou le recouvrement large à la demande. L\'invalidation déclenche un **refetch immédiat des requêtes actives** (celles à l\'écran), et marque les inactives pour validation au prochain montage.' },
            { t: 'h3', h: 'setQueryData : l\'écriture directe, sans re-fetch' },
            { t: 'code', lang: 'js', code:
'onSuccess: (postModifie, variables) => {\n  // Mettre à jour le DÉTAIL directement (instantané, zéro requête) :\n  queryClient.setQueryData(["posts", variables.id], postModifie);\n\n  // Et pour la LISTE, mise à jour chirurgicale :\n  queryClient.setQueryData(["posts"], (ancienne) =>\n    ancienne?.map((p) => (p.id === postModifie.id ? postModifie : p))\n  );\n}' },
            { t: 'p', h: 'setQueryData est parfait quand la réponse du serveur **contient déjà la vérité à jour** (réponse du PUT) : pourquoi re-télécharger ? Moins fiable si la réponse est partielle ou si d\'autres filtres de liste existent — alors préfère l\'invalidation, réponse « paresseuse mais toujours juste ».' },
            { t: 'h3', h: 'prefetchQuery : le chargement avant l\'heure' },
            { t: 'code', lang: 'js', code:
'// Au survol d\'un lien, pré-charger la page cible :\n<a\n  href={"/posts/" + post.id}\n  onMouseEnter={() =>\n    queryClient.prefetchQuery({\n      queryKey: ["posts", post.id],\n      queryFn: () => fetchPost(post.id),\n    })\n  }\n>\n  {post.titre}\n</a>\n// Le clic ouvre la page avec le cache déjà rempli : rendu instantané.' },
            { t: 'callout', kind: 'tip', h: 'La hiérarchie du pragmatisme : préfère l\'invalidation après mutation (simple, jamais fausse), setQueryData quand la réponse est complète et fiable (perf maximale), prefetch pour les navigations anticipables (UX lightning). Ces trois-là couvrent 95 % des besoins de synchronisation.' }
          ],
          errors: [
            { title: 'Invalider une clé trop large (ou trop étroite)', bad: 'queryClient.invalidateQueries({ queryKey: ["posts", "list", filtres] });\n// les DÉTAILS restent périmés, et réciproquement :\nqueryClient.invalidateQueries({ queryKey: ["posts", id] });\n// les LISTES gardent l\'ancienne version', good: '// Après modif d\'un post :\nqueryClient.invalidateQueries({ queryKey: ["posts"] });\n// ou, chirurgical : setQueryData sur le détail + invalidation des listes', why: 'Le préfixe ["posts"] est ton ami par défaut : il couvre listes ET détails. La précision maximale exige la liste exacte des clés affectées — en cas de doute, invalide la famille : un refetch de trop coûte bien moins qu\'un écran faux.' },
            { title: 'setQueryData qui fige un filtre oublié', bad: 'queryClient.setQueryData(["posts"], ...);\n// mais l\'écran affiche ["posts", { statut: "publie" }] !', good: '// setQueryData avec la CLÉ EXACTE affichée, ou\n// invalidateQueries sur le préfixe (lui matchera tous les filtres).', why: 'Chaque combinaison filtre = entrée distincte du cache. Mettre à jour la clé nue ["posts"] ne touche pas les clés filtrées : l\'écran ne bouge pas. L\'invalidation par préfixe résout le cas général sans connaître les filtres actifs.' }
          ],
          related: ['tq-mutations', 'tq-usequery', 'tq-optimiste', 'tq-cache']
        },

        {
          id: 'tq-optimiste',
          title: 'Mises à jour optimistes',
          icon: 'offline_bolt',
          level: 'Avancé',
          tagline: 'L\'UI au présent avant la réponse du serveur — et le rollback, l\'autre moitié du contrat.',
          intro: 'L\'utilisateur clique « j\'aime » : doit-il attendre 400 ms de réseau pour voir le cœur se colorer ? Une **mise à jour optimiste** applique le changement à l\'UI **immédiatement**, laisse la mutation se jouer en fond, et — si le serveur refuse — **revient en arrière**. C\'est le pattern des applications qui « répondent au quart de tour » ; son prix est une petite cérémonie, à ne jamais amputer du rollback.',
          blocks: [
            { t: 'h3', h: 'La cérémonie complète en quatre étapes' },
            { t: 'code', lang: 'js', code:
'const modifPost = useMutation({\n  mutationFn: patchPost,\n\n  // 1. AVANT l\'appel réseau : préparer le terrain\n  onMutate: async (variables) => {\n    // Annule les refetchs en vol sur la clé (ils écraseraient notre optimiste)\n    await queryClient.cancelQueries({ queryKey: ["posts", variables.id] });\n\n    // Sauvegarde l\'état PRÉCÉDENT pour le rollback\n    const precedent = queryClient.getQueryData(["posts", variables.id]);\n\n    // 2. Applique le changement OPTIMISTE au cache\n    queryClient.setQueryData(["posts", variables.id], (ancien) => ({\n      ...ancien,\n      titre: variables.titre,\n    }));\n\n    // 3. Renvoie le contexte : il sera dispo dans onError/onSettled\n    return { precedent };\n  },\n\n  // 4a. Échec ? On REVIENT à l\'état sauvegardé\n  onError: (err, variables, context) => {\n    queryClient.setQueryData(["posts", variables.id], context.precedent);\n  },\n\n  // 4b. Dans tous les cas : resynchroniser avec la vérité du serveur\n  onSettled: (data, err, variables) => {\n    queryClient.invalidateQueries({ queryKey: ["posts", variables.id] });\n  },\n});' },
            { t: 'p', h: 'Retiens la trame : **annuler → sauvegarder → appliquer → (rollback / resync)**. Le point délicat est le `cancelQueries` initial : sans lui, un refetch en vol peut revenir APRÈS ton écriture optimiste et l\'écraser visuellement. L\'invalidation finale garantit que l\'optimisme finit toujours confronté à la vérité du serveur.' },
            { t: 'h3', h: 'Le cas des listes : insertion optimiste' },
            { t: 'code', lang: 'js', code:
'onMutate: async (nouveau) => {\n  await queryClient.cancelQueries({ queryKey: ["posts"] });\n  const precedente = queryClient.getQueryData(["posts"]);\n\n  queryClient.setQueryData(["posts"], (ancienne) => [\n    { ...nouveau, id: "temporaire-" + Date.now(), enCours: true }, // id fake\n    ...ancienne,\n  ]);\n\n  return { precedente };\n},\nonError: (e, v, ctx) => queryClient.setQueryData(["posts"], ctx.precedente),\nonSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),\n// le vrai id du serveur remplace le temporaire au refetch' },
            { t: 'h3', h: 'Quand NE PAS être optimiste' },
            { t: 'ul', items: [
              'Les écritures irréversibles ou financières (paiement, suppression définitive) — attends la confirmation.',
              'Les opérations dont l\'échec est fréquent et coûteux à défaire visuellement.',
              'Les cas où le résultat serveur diffère fortement de ce que tu devines (calculs côté serveur).'
            ]},
            { t: 'callout', kind: 'tip', h: 'Indique visuellement l\'optimisme en attente : l\'élément muté reçoit `opacity: 0.6` ou une pastille « envoi… » tant que `isPending`. L\'utilisateur comprend « pris en compte, synchronisation en cours » — c\'est le détail qui transforme la magie en confiance.' }
          ],
          errors: [
            { title: 'Optimisme sans rollback', bad: 'onMutate: () => {\n  queryClient.setQueryData(cle, optimiste);\n},\nonError: () => { /* juste un toast */ }\n// l\'UI affiche désormais une donnée FAUSSE durablement', good: 'onError: (e, v, ctx) => queryClient.setQueryData(cle, ctx.precedent)', why: 'Sans retour à l\'état précédent, un échec serveur laisse l\'écran en contradiction avec la base — durablement. Le rollback n\'est pas optionnel : c\'est la moitié du contrat optimiste. Toujours sauvegarder avant d\'appliquer.' },
            { title: 'Oublier cancelQueries', bad: '// setQueryData optimiste…\n// …puis un refetch (focus, intervalle) re-télécharge\n// l\'ANCIENNE version et écrase l\'optimisme en plein envoi', good: 'await queryClient.cancelQueries({ queryKey: cle });\n// AVANT le setQueryData optimiste', why: 'Entre l\'écriture optimiste et la réponse serveur, le monde continue : un refetch déclenché pile à ce moment écraserait ta valeur temporaire avec l\'ancienne. cancelQueries garantit le silence pendant l\'opération.' }
          ],
          related: ['tq-mutations', 'tq-invalidation', 'tq-erreurs', 'tq-etats']
        }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'patterns-avances',
      name: 'Patterns avancés',
      icon: 'bolt',
      fiches: [
        {
          id: 'tq-dependantes',
          title: 'Requêtes dépendantes',
          icon: 'link',
          level: 'Intermédiaire',
          tagline: 'enabled : attendre la donnée d\'une autre requête sans coder la cascade à la main.',
          intro: 'Certaines données ne peuvent être demandées qu\'après d\'autres : le profil avant les commandes du profil, l\'id avant le détail. Le réflexe JavaScript serait une cascade de `await` ; React interdit de plus les hooks conditionnels. TanStack Query résout l\'équation avec l\'option **`enabled`** : la requête reste **en pause** tant que sa condition n\'est pas remplie, puis démarre toute seule.',
          blocks: [
            { t: 'h3', h: 'Le chaînage élégant' },
            { t: 'code', lang: 'js', code:
'function PageProfil({ userId }) {\n  // 1ʳᵉ étage : l\'utilisateur\n  const user = useQuery({\n    queryKey: ["users", userId],\n    queryFn: () => fetchUser(userId),\n  });\n\n  // 2ᵉ étage : ses commandes — SEULEMENT quand l\'utilisateur et\n  // son organisation sont connus\n  const commandes = useQuery({\n    queryKey: ["commandes", user.data?.organisation_id],\n    queryFn: () => fetchCommandes(user.data.organisation_id),\n    enabled: !!user.data?.organisation_id,   // la serrure\n  });\n}' },
            { t: 'p', h: 'Tant que `enabled` est faux, la requête n\'exécute **pas** la queryFn et reste `isPending` — l\'UI affiche un état d\'attente. Dès que la condition devient vraie (donnée amont arrivée), la requête part automatiquement. Et parce que la queryKey contient la variable, tout changement d\'organisation redéclenche proprement.' },
            { t: 'h3', h: 'enabled : les autres cas d\'usage' },
            { t: 'code', lang: 'js', code:
'// Recherche seulement à partir de 3 caractères :\nuseQuery({\n  queryKey: ["recherche", terme],\n  queryFn: () => rechercher(terme),\n  enabled: terme.length >= 3,\n});\n\n// Requête conditionnée par une préférence :\nuseQuery({\n  queryKey: ["notifications"],\n  queryFn: fetchNotifications,\n  enabled: prefs.notificationsActives,\n});\n\n// Déclencheur paresseux : refetch manuel piloté par un bouton\nconst requete = useQuery({\n  queryKey: ["export"], queryFn: lancerExport, enabled: false,\n});\n<button onClick={() => requete.refetch()}>Générer l\'export</button>' },
            { t: 'callout', kind: 'warn', h: 'Ne contourne pas ça avec un hook conditionnel : `if (id) useQuery(...)` **enfreint les règles des hooks** (ordre des appels instable entre rendus, bugs atroces). enabled existe précisément pour suspendre une requête sans conditionner le hook.' }
          ],
          errors: [
            { title: 'Fetch avant l\'heure : l\'URL "undefined"', bad: 'useQuery({\n  queryKey: ["commandes", user?.id],\n  queryFn: () => fetch("/api/commandes?user=" + user.id),\n  // user vaut null au 1ᵉʳ rendu → /api/commandes?user=undefined !\n});', good: 'useQuery({\n  queryKey: ["commandes", user?.id],\n  queryFn: () => fetch("/api/commandes?user=" + user.id),\n  enabled: !!user?.id,\n});', why: 'Au montage, la donnée amont n\'a pas encore été chargée : partir sans enabled envoie une requête au paramètre undefined — 404 ou données absurdes, et une clé de cache corrompue. enabled traduit proprement la dépendance.' },
            { title: 'Cascade de useEffect pour « attendre » les données', bad: 'useEffect(() => {\n  if (user) {\n    fetchCommandes(user.id).then(setCommandes);\n  }\n}, [user]);   // on RECODE TanStack Query à la main...', good: '// Une seconde useQuery avec enabled: !!user.\n// Le système gère annulation, cache, courses entre requêtes.', why: 'Enchaîner avec des useEffect manuels réintroduit tout ce que la librairie évite : pas de cache, pas d\'annulation si user change vite, états de chargement à gérer à la main. enabled est la dépendance déclarative, propre et complète.' }
          ],
          related: ['tq-usequery', 'tq-paralleles', 'tq-etats', 'rx-effets']
        },

        {
          id: 'tq-paralleles',
          title: 'Requêtes parallèles',
          icon: 'dynamic_feed',
          level: 'Intermédiaire',
          tagline: 'Plusieurs hooks dans un composant, ou useQueries quand le nombre varie.',
          intro: 'Un dashboard a besoin de stats, d\'alertes et d\'un fil d\'activité **en même temps**. Bonne nouvelle : les requêtes indépendantes sont le cas le plus simple de TanStack Query — tu appelles plusieurs `useQuery` dans le même composant, et tout se parallélise naturellement (avec déduplication et cache partagés). La seule subtilité concerne les listes dont la taille varie, où `useQueries` prend le relais.',
          blocks: [
            { t: 'h3', h: 'Le cas facile : requêtes indépendantes, nombre fixe' },
            { t: 'code', lang: 'js', code:
'function Dashboard() {\n  const stats    = useQuery({ queryKey: ["stats"],    queryFn: fetchStats });\n  const alertes  = useQuery({ queryKey: ["alertes"],  queryFn: fetchAlertes });\n  const activite = useQuery({ queryKey: ["activite"], queryFn: fetchActivite });\n\n  // Les trois partent EN PARALLÈLE, chacune avec ses états.\n  if (stats.isPending) return <Spinner />;\n  return (\n    <>\n      <TuileStats data={stats.data} />\n      <ListeAlertes data={alertes.data} chargement={alertes.isPending} />\n      <FilActivite data={activite.data} chargement={activite.isPending} />\n    </>\n  );\n}' },
            { t: 'p', h: 'Pas de `Promise.all` à organiser, pas d\'orchestration : chaque hook vit sa vie, l\'UI **se remplit au fil de l\'eau** (chaque section gère son propre état). C\'est la composition déclarative à l\'œuvre — et bien meilleure UX qu\'un spinner global de 6 secondes.' },
            { t: 'h3', h: 'Le cas variable : useQueries' },
            { t: 'code', lang: 'js', code:
'// Un hook par élément d\'une liste ? interdit par les règles des hooks.\n// useQueries : une QUERY PAR ID, dans UN hook :\nconst produits = useQueries({\n  queries: panier.map((article) => ({\n    queryKey: ["produits", article.id],\n    queryFn: () => fetchProduit(article.id),\n  })),\n});\n\nconst toutCharge = produits.every((q) => q.isSuccess);\nconst total = toutCharge\n  ? produits.reduce((somme, q, i) => somme + q.data.prix * panier[i].qte, 0)\n  : null;' },
            { t: 'p', h: '`useQueries` retourne un tableau des résultats, indexé comme la liste d\'entrée. Chaque élément conserve sa propre clé de cache (les produits restent partagés avec le reste de l\'app), chacun peut réussir ou échouer indépendamment — et aucune règle des hooks n\'est contournée.' },
            { t: 'h3', h: 'Parallèle vs dépendant : la règle de décision' },
            { t: 'ul', items: [
              'La seconde requête a-t-elle besoin d\'une **donnée** de la première (id, filtre) ? → **dépendante**, option `enabled` (fiche précédente).',
              'Les deux peuvent partir sans se connaître ? → **parallèles**, plusieurs hooks ou `useQueries`.',
              'Tu veux empiler les états sous un seul isPending ? Compose toi-même : `stats.isPending && alertes.isPending` — ou laisse chaque section respirer, c\'est souvent mieux.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Résiste à l\'envie de « tout attendre » : parallèles, les requêtes se complètent indépendamment et l\'écran se construit progressivement. Un `isPending` global n\'est justifié que si les données n\'ont vraiment de sens qu\'ensemble (reçu de paiement, par exemple).' }
          ],
          errors: [
            { title: 'Sérialiser ce qui pouvait partir en parallèle', bad: 'const user = useQuery(...);\nconst stats = useQuery({\n  enabled: user.isSuccess,   // …alors que fetchStats n\'utilise\n  queryKey: ["stats"],       // AUCUNE donnée de user !\n  queryFn: fetchStats,\n});', good: '// Deux useQuery indépendants, appelés directement :\n// départs simultanés, gain de latence maximal.', why: 'enabled ne doit exprimer qu\'une vraie dépendance de DONNÉES. Chainer par habitude des requêtes indépendantes double la latence perçue, sans aucune raison fonctionnelle.' },
            { title: 'Boucler sur useQuery au lieu de useQueries', bad: 'panier.map((a) =>\n  useQuery({ queryKey: ["produits", a.id], ... })\n)\n// hooks appelés en nombre variable → violation des règles des hooks', good: 'useQueries({\n  queries: panier.map((a) => ({\n    queryKey: ["produits", a.id],\n    queryFn: () => fetchProduit(a.id),\n  })),\n});', why: 'Le nombre de hooks doit être stable d\'un rendu à l\'autre : une liste de longueur variable exige useQueries, LE hook conçu pour exactement ce schéma.' }
          ],
          related: ['tq-dependantes', 'tq-usequery', 'tq-etats', 'js-asynchrone']
        },

        {
          id: 'tq-pagination',
          title: 'Pagination & requêtes infinies',
          icon: 'history',
          level: 'Avancé',
          tagline: 'Pages numérotées avec placeholderData, listes sans fin avec useInfiniteQuery.',
          intro: 'Il y a deux écoles de « longue liste » : la pagination classique (pages 1, 2, 3 avec des données qui changent d\'un coup) et le scroll infini (le contenu s\'allonge en continu). TanStack Query a une réponse pour chacune : `placeholderData` pour que le passage de page **ne clignote pas**, et `useInfiniteQuery` qui gère tout le cycle « charger la suite » — avec un cache structuré en pages.',
          blocks: [
            { t: 'h3', h: 'Pagination numérotée SANS clignotement' },
            { t: 'code', lang: 'js', code:
'import { keepPreviousData, useQuery } from "@tanstack/react-query";\n\nfunction Tableau() {\n  const [page, setPage] = useState(1);\n\n  const { data, isPlaceholderData, isFetching } = useQuery({\n    queryKey: ["factures", { page }],      // la page FAIT PARTIE de la clé\n    queryFn: () => fetchFactures(page),\n    placeholderData: keepPreviousData,     // garde la page N pendant le\n  });                                      // chargement de la page N+1\n\n  return (\n    <>\n      <Table data={data.lignes} flouté={isPlaceholderData} />\n      <Pagination\n        page={page}\n        total={data.totalPages}\n        onChange={setPage}\n      />\n    </>\n  );\n}' },
            { t: 'p', h: 'Sans `keepPreviousData`, chaque changement de page repasse par « zéro donnée » : le tableau saute, vide puis rempli. Avec, **l\'ancienne page reste affichée** (indiquée par `isPlaceholderData`, souvent assombrie) jusqu\'à l\'arrivée de la nouvelle — la transition est fluide. Note que la page est dans la clé : chaque page a sa propre entrée de cache, revenir en arrière est instantané.' },
            { t: 'h3', h: 'Le scroll infini : useInfiniteQuery' },
            { t: 'code', lang: 'js', code:
'import { useInfiniteQuery } from "@tanstack/react-query";\n\nfunction FilActualites() {\n  const {\n    data, fetchNextPage, hasNextPage, isFetchingNextPage,\n  } = useInfiniteQuery({\n    queryKey: ["actus"],\n    // pageParam : fourni PAR la librairie (valeur initiale déclarée)\n    queryFn: ({ pageParam }) => fetchActus(pageParam),\n    initialPageParam: 1,\n    // "comment trouve-t-on la page suivante ?" → null = fin\n    getNextPageParam: (dernierePage) => dernierePage.pageSuivante,\n  });\n\n  return (\n    <>\n      {/* data.pages : un tableau de PAGES */}\n      {data.pages.map((page) =>\n        page.items.map((a) => <Article key={a.id} article={a} />)\n      )}\n\n      {hasNextPage && (\n        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>\n          {isFetchingNextPage ? "Chargement…" : "Voir plus"}\n        </button>\n      )}\n    </>\n  );\n}' },
            { t: 'p', h: 'La structure à retenir : `data.pages` empile les réponses (chaque page reste distincte dans le cache), `getNextPageParam` lit dans la dernière réponse de quoi demander la suivante (retourner `undefined`/`null` arrête le « Voir plus »), et `isFetchingNextPage` désactive le bouton pendant le vol. Un IntersectionObserver branché sur ce bouton = scroll infini automatique.' },
            { t: 'callout', kind: 'warn', h: 'Le cache infini et les mutations demandent de la vigilance : après suppression d\'un item, `invalidateQueries(["actus"])` re-télécharge TOUTES les pages accumulées (c\'est le prix). Mieux : mettre à jour `data.pages` avec setQueryData en mapant chaque page (retirer l\'id partout). Préfère la pagination numérotée si la liste est fortement mutable.' }
          ],
          errors: [
            { title: 'La page absente de la queryKey', bad: 'useQuery({\n  queryKey: ["factures"],      // page absente !\n  queryFn: () => fetchFactures(page),\n});\n// page 2 affiche… les données de la page 1', good: 'queryKey: ["factures", { page }],', why: 'Même pêché que la fiche useQuery : toute variable qui influence la queryFn doit être dans la clé. La page oubliée produit le bug « toutes les pages affichent la même liste » — infiniment confus pour l\'utilisateur.' },
            { title: 'Recoder l\'infini par concaténation manuelle', bad: 'useEffect(() => { charger(page).then((d) =>\n  setItems((prev) => [...prev, ...d.items])) ;}, [page]);\n// doublons si refetch, impossibilité d\'invalider proprement,\n// pas de cache par page…', good: 'useInfiniteQuery({ ..., getNextPageParam });\n// pages séparées dans le cache, invalidation propre, déduplication', why: 'La concaténation manuelle mélange tout dans un seul state : on ne peut plus invalider ni recharger une page sans tout réécrire. useInfiniteQuery garde chaque page structurée et adressable — l\'invalidation reste sensée.' }
          ],
          related: ['tq-cache', 'tq-invalidation', 'tq-etats', 'rx-listes-cles']
        },

        {
          id: 'tq-devtools',
          title: 'DevTools',
          icon: 'developer_mode',
          level: 'Débutant',
          tagline: 'Le cache en transparent : explorer, invalider, chronométrer — l\'outil qui rend visible l\'invisible.',
          intro: 'Le plus grand ennemi du dev qui découvre TanStack Query, c\'est que tout se passe **dans un cache invisible**. Les DevTools officiels ouvrent une fenêtre au rez-de-chaussée : chaque entrée de cache avec son état (fresh/stale/fetching), ses observateurs, ses timestamps — et des boutons pour invalider ou supprimer à la main. On ne debug plus à l\'aveugle : on regarde.',
          blocks: [
            { t: 'h3', h: 'Brancher les DevTools' },
            { t: 'code', lang: 'bash', code: 'npm install @tanstack/react-query-devtools' },
            { t: 'code', lang: 'js', label: 'main.jsx — visible en dev uniquement', code:
'import { ReactQueryDevtools } from "@tanstack/react-query-devtools";\n\nroot.render(\n  <QueryClientProvider client={queryClient}>\n    <App />\n    {/* Exclu automatiquement du build de production */}\n    <ReactQueryDevtools initialIsOpen={false} />\n  </QueryClientProvider>\n);' },
            { t: 'h3', h: 'Ce qu\'on y lit (et qui fait gagner des heures)' },
            { t: 'ul', items: [
              '**Chaque clé** du cache avec son statut coloré : fresh (vert), stale (jaune), fetching (bleu), inactive (gris).',
              'Le contenu exact de **`data`** et **`error`** pour chaque entrée.',
              'Le nombre d\'**observateurs** (composants) par requête — l\'indice de ce qui se recharge EN CE MOMENT.',
              'Les timestamps : dernière mise à jour et dernier fetch — pour comprendre les cadences de refetch.',
              'Des actions manuelles : **Refetch, Invalidate, Remove, Reset** — tester tes flux sans repasser par l\'UI.'
            ]},
            { t: 'h3', h: 'Le scénario de debug type' },
            { t: 'p', h: '« Mes données ne se mettent pas à jour. » Étape 1 : ouvrir les DevTools, regarder si la clé existe (sinon → problème de queryKey/queryFn). Étape 2 : est-elle fetching au mauvais moment (refetch en boucle → dépendance instable) ? Étape 3 : quels observateurs (le composant attendu est-il abonné ?) ? Étape 4 : invalider à la main et observer — le cache ment rarement, c\'est presque toujours la clé.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe d\'intégration continue : colle un flag dans l\'URL (`?rqdebug`) qui affiche les DevTools même en staging quand tu les invoques explicitement — le debug d\'un bug remonté par un utilisateur devient possible chez lui, en visio.' }
          ],
          errors: [
            { title: 'Les DevTools du bundle de production', bad: 'import { ReactQueryDevtools } from "@tanstack/react-query-devtools";\n// chargé en prod par le mauvais import ou un flag forcé :\n// poids + panneau ouvrable par les utilisateurs', good: 'import { ReactQueryDevtools } from "@tanstack/react-query-devtools";\n// le package s\'auto-exclut de la production — sauf le\n// sous-chemin /production à ne JAMAIS utiliser sans garde env.', why: 'L\'import de base est noop en production (process.env.NODE_ENV), mais le sous-chemin production ou un initialIsOpen forcé les expose : bundle alourdi + cache lisible par tous. Garde un interrupteur env + query param explicite.' },
            { title: 'Déboguer les clés à l\'œil nu', bad: 'console.log(queryClient.getQueryCache());\n// objets internes touffus, illisibles…', good: '// DevTools : arbre des clés + états + actions,\n// conçu exactement pour cette inspection.', why: 'La structure interne du cache n\'est pas conçue pour être lue en console. Les DevTools donnent la lisibilité (et l\'interactivité) en cinq minutes d\'installation — ne perds pas l\'après-midi à déplier des proxies.' }
          ],
          related: ['tq-cache', 'tq-etats', 'tq-invalidation', 'rx-patterns']
        },

        {
          id: 'tq-patterns',
          title: 'Intégration React & bonnes pratiques',
          icon: 'integration_instructions',
          level: 'Avancé',
          tagline: 'Query key factory, hooks métier, prefetch au hover : la discipline qui fait tenir un projet grand.',
          intro: 'TanStack Query s\'installe en cinq minutes ; la qualité d\'un projet tient ensuite à trois habitudes d\'organisation : **centraliser les clés**, **encapsuler les hooks** derrière des API métier, et **écrire les queryFn proprement**. Cette fiche clôt le module par la recette d\'équipe complète — celle qui fait passer un projet de « ça marche » à « on navigue dedans les yeux fermés ».',
          blocks: [
            { t: 'h3', h: 'La query key factory : un seul endroit pour toutes les clés' },
            { t: 'code', lang: 'js', label: 'queries/posts.js', code:
'// Une usine par domaine : la structure des clés vit EN UN SEUL FICHIER\nexport const postKeys = {\n  all: ["posts"],\n  lists: () => [...postKeys.all, "list"],\n  list: (filtres) => [...postKeys.lists(), filtres],\n  details: () => [...postKeys.all, "detail"],\n  detail: (id) => [...postKeys.details(), id],\n};\n\n// Dans les composants :\nuseQuery({ queryKey: postKeys.list({ statut: "publie" }), queryFn: ... });\n// Invalidation large ultra-lisible :\nqueryClient.invalidateQueries({ queryKey: postKeys.details() });' },
            { t: 'p', h: 'Sans factory, les clés s\'écrivent en dur dans vingt fichiers — et à la première rencontre (`"posts"` vs `["post"]`), l\'invalidation rate silencieusement sa cible. La factory garantit la cohérence structurelle et rend les hiérarchies faciles à lire ET à invalider (le pattern vient directement des mainteneurs).' },
            { t: 'h3', h: 'Les hooks métier : l\'API que tes composants consomment' },
            { t: 'code', lang: 'js', label: 'hooks/usePosts.js', code:
'export function usePosts(filtres) {\n  return useQuery({\n    queryKey: postKeys.list(filtres),\n    queryFn: () => api.getPosts(filtres),\n    staleTime: 30_000,\n  });\n}\n\nexport function usePost(id) {\n  return useQuery({\n    queryKey: postKeys.detail(id),\n    queryFn: () => api.getPost(id),\n    enabled: !!id,\n  });\n}\n\nexport function useCreerPost() {\n  const qc = useQueryClient();\n  return useMutation({\n    mutationFn: api.createPost,\n    onSuccess: () => qc.invalidateQueries({ queryKey: postKeys.lists() }),\n  });\n}\n\n// Le composant ne connaît NI les clés, NI fetch : juste l\'intention :\nconst { data, isPending } = usePosts({ statut: "publie" });' },
            { t: 'p', h: 'Trois bénéfices : le composant **ne connaît pas la mécanique** (changer de librairie devient indolore) ; les réglages (staleTime, invalidations) sont écrits **une fois** ; et l\'onboarding d\'un collègue se résume à « appelle usePosts ». C\'est le même raisonnement que le custom hook de la fiche Patterns React — poussé à l\'échelle d\'un domaine.' },
            { t: 'h3', h: 'Prefetch : la vitesse perçue en deux lignes' },
            { t: 'code', lang: 'js', code:
'// Pré-charger le détail au survol d\'un lien de liste :\n<Link\n  to={"/posts/" + post.id}\n  onMouseEnter={() =>\n    qc.prefetchQuery({ queryKey: postKeys.detail(post.id),\n                       queryFn: () => api.getPost(post.id) })\n  }\n>\n  {post.titre}\n</Link>' },
            { t: 'h3', h: 'La checklist de mise en production' },
            { t: 'ul', items: [
              '`staleTime` global raisonnable (30 s–1 min), overrides documentés pour statique/temps réel.',
              'Clés via factory, jamais écrites en dur dans les composants.',
              'Chaque mutation invalide (ou met à jour) son domaine — vérifié en DevTools.',
              'Retry : défaut gardé pour les lectures, désactivé/raisonné pour les mutations.',
              'DevTools vérifiés absents du bundle de production.',
              'Aucun state serveur résiduel dans des useState/zustand (listes, détails = Query).'
            ]}
          ],
          errors: [
            { title: 'Clés écrites à la main dans chaque fichier', bad: '// fichier A : ["posts", id]\n// fichier B : ["post", id]        ← singular, autre cache !\n// fichier C : ["posts", "detail", id]', good: 'postKeys.detail(id)   // partout, sans exception', why: 'Une clé déviante crée une entrée de cache orpheline : les invalidations la manquent, les refetchs se dupliquent. La factory n\'est pas du confort — c\'est la garantie structurelle du système.' },
            { title: 'queryFn acrobatique au milieu du composant', bad: 'useQuery({\n  queryFn: async () => {\n    const r = await fetch("/api/posts");\n    const j = await r.json();\n    return j.map((p) => ({ ...p, drapeau: true })); // traitement métier\n  },\n});', good: '// api.getPosts() dans api/ — transformable, testable,\n// réutilisable ; le composant reste déclaratif.', why: 'La queryFn est l\'unique frontière vers le réseau : y concentrer le code d\'accès (en-têtes, erreurs HTTP, adaptation) permet de la tester et de la faire évoluer en un point. Éparpillée dans les composants, elle devient in-maintenable très vite.' }
          ],
          related: ['tq-usequery', 'tq-mutations', 'tq-devtools', 'rx-patterns']
        }
      ]
    }
  ]
};
