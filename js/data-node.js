/* ============================================================
   data-node.js — Contenu pédagogique Node.js & Express (module complet)
   Couvre : architecture (Event Loop, non-bloquant), npm/Modules,
   modules natifs (fs, path, os, http, events, stream/buffer),
   fondamentaux Express, routing, middlewares, erreurs, sécurité,
   upload, bases de données, variables d'environnement, déploiement.
   Suppose JavaScript ES6+ et l'asynchrone acquis (modules JS & TS en place).
   Référence : Node 24 LTS (Krypton), Express 5 (latest npm).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.node = {
  id: 'node',
  name: 'Node.js & Express',
  icon: 'hexagon',
  tagline: 'Le JavaScript qui sort du navigateur : serveurs rapides, événements et API REST.',
  heroTitle: 'Node.js & Express, le serveur en JavaScript',

  categories: [
    /* ======================================================
       1. ARCHITECTURE : EVENT LOOP & NON-BLOQUANT
       ====================================================== */
    {
      id: 'architecture',
      name: 'Architecture : Event Loop',
      icon: 'sync',
      fiches: [
        {
          id: 'nd-single-thread',
          title: 'Un seul thread, des milliers de clients',
          icon: 'speed',
          level: 'Débutant',
          tagline: 'Pourquoi un serveur mono-thread peut servir tout un marché sans s\'essouffler.',
          intro: 'Node.js exécute TON JavaScript sur **un seul thread** — un seul caissier à la caisse. Pour autant, un serveur Node tient des milliers de connexions simultanées. Le secret n\'est pas la magie : c\'est le **I/O non-bloquant**. Le caissier ne reste jamais à attendre que le fournisseur arrive ; il prend la commande, confie l\'attente au système (libuv), et sert le client suivant.',
          blocks: [
            { t: 'p', h: 'Compare avec le modèle classique « un thread par connexion » (le PHP/Apache d\'antan) : chaque client coûte un thread complet, avec sa mémoire. À 10 000 clients, le serveur s\'effondre sous les threads qui dorment. Node inverse la logique : pendant qu\'une requête attend la base de données ou le disque, le thread **sert les autres**. L\'attente ne coûte rien.' },
            { t: 'h3', h: 'Qui fait le travail derrière ?' },
            { t: 'p', h: 'Ton JS est mono-thread, mais Node n\'est pas mono-threadé : le moteur V8 exécute ton code, et **libuv** orchestre le système d\'exploitation (sockets, fichiers) plus un petit pool de threads C++ pour ce que l\'OS ne sait pas rendre non-bloquant (certaines opérations `fs`, DNS, crypto). Toi, tu vis dans le thread JS unique : pas de verrous, pas de courses critiques entre tes propres lignes de code.' },
            { t: 'code', lang: 'js', label: 'Ce que le modèle rend naturel', code:
'// Pendant que la BD répond à la requête 1,\n// le thread sert déjà les requêtes 2, 3, 4…\napp.get(\'/stock\', async (req, res) => {\n  const gari = await db.query(\'SELECT * FROM stock WHERE produit = $1\', [\'gari\']);\n  // ↑ await NE bloque PAS le serveur : il suspend CETTE fonction,\n  //   l\'Event Loop continue de servir les autres clients.\n  res.json(gari.rows);\n});' },
            { t: 'h3', h: 'La conséquence qui change tout' },
            { t: 'ul', items: [
              '**Tout ce qui est lent doit être asynchrone** : fichiers, réseau, base de données, hash de mot de passe. Sinon tu gèles TOUS les clients.',
              'Un `while` qui tourne 10 secondes = 10 secondes où AUCUN client n\'est servi. Le prix du thread unique.',
              'Les calculs lourds (compression, traitement d\'image) ne sont pas le terrain de jeu de Node : délègue (worker threads, service externe).',
              'Pour la latence d\'Awa à Dantokpa qui consulte le stock depuis son téléphone, ce modèle est parfait : l\'API passe sa vie à attendre la BD, pas à calculer.'
            ] },
            { t: 'callout', kind: 'info', h: 'Node brille sur les applications **I/O-intensive** (API REST, chat, proxy, temps réel). Il est médiocre sur le **CPU-intensive** : c\'est un choix d\'architecture, pas un défaut.' }
          ],
          errors: [
            { title: 'Croire que tout est parallèle comme en Go ou Java', bad:
'app.get(\'/rapport\', (req, res) => {\n  const total = calculerToutLeMois();   // 8 s de CPU\n  res.json(total);\n});\n// Toutes les autres requêtes attendent 8 s aussi : un seul thread !',
              good:
'// Déléguer le calcul lourd :\n// - worker_threads pour du JS parallèle\n// - un service dédié (Python, Go) pour le massif\n// - ou découper le calcul et le laisser respirer (setImmediate)',
              why: 'Le thread unique est une force pour l\'I/O et un piège pour le CPU. Tant que ton code passe son temps à attendre (BD, réseau, disque), le modèle est supérieur aux threads classiques ; dès qu\'il calcule longtemps, il devient le goulot de tout le serveur.' }
          ],
          related: ['nd-event-loop', 'nd-blocage-event-loop', 'js-asynchrone']
        },

        {
          id: 'nd-event-loop',
          title: 'L\'Event Loop : le chef d\'orchestre',
          icon: 'autorenew',
          level: 'Intermédiaire',
          tagline: 'setTimeout, promesses, nextTick : qui passe en premier, et pourquoi.',
          intro: 'L\'**Event Loop** est la boucle qui fait tourner Node : elle dépile les callbacks dès que le call stack est vide, dans un ordre précis. Comprendre cet ordre, c\'est comprendre pourquoi `setTimeout(fn, 0)` ne veut pas dire « immédiatement » et pourquoi une promesse résolue passe devant un timer.',
          blocks: [
            { t: 'h3', h: 'Les files d\'attente, par ordre de priorité' },
            { t: 'ol', items: [
              '**Microtasks** : promesses résolues (`then`/`await`) et `process.nextTick` — vidées ENTRE chaque phase, jusqu\'à épuisement.',
              '**Timers** : callbacks de `setTimeout`/`setInterval` dont le délai est écoulé.',
              '**Poll** : événements d\'I/O (réponse BD, socket réseau) — le cœur du serveur.',
              '**Check** : callbacks de `setImmediate`.',
              'Puis la boucle recommence. Entre chaque étape : re-vidage des microtasks.'
            ] },
            { t: 'code', lang: 'js', label: 'L\'ordre à deviner avant de l\'exécuter', code:
'console.log(\'1. synchrone\');\n\nsetTimeout(() => console.log(\'4. timer\'), 0);\nsetImmediate(() => console.log(\'5. check (setImmediate)\'));\n\nPromise.resolve().then(() => console.log(\'3. microtask (promesse)\'));\nprocess.nextTick(() => console.log(\'2. nextTick\'));\n\nconsole.log(\'1 bis. synchrone\');\n\n// 1. synchrone → 1 bis → 2. nextTick → 3. promesse → 4. timer → 5. setImmediate' },
            { t: 'p', h: 'Règle qui sauve des entretiens : **synchrone d\'abord, ensuite `nextTick`, puis les promesses, et seulement après les timers et l\'I/O**. `process.nextTick` court-circuite tout — c\'est un héritage historique, à réserver aux cas rares : il peut affamer l\'Event Loop si tu le chaînes sans fin.' },
            { t: 'h3', h: 'setTimeout(0) vs setImmediate' },
            { t: 'table', head: ['Outil', 'File', 'Usage canon'], rows: [
              ['process.nextTick', 'avant tout', 'éviter (affame la boucle si chaîné)'],
              ['Promise.then / await', 'microtasks', 'suite de code asynchrone'],
              ['setTimeout fn, 0', 'timers', 'délai minimal ≈ 1 ms, pas garanti'],
              ['setImmediate', 'check', 'faire respirer la boucle entre deux calculs']
            ] },
            { t: 'callout', kind: 'tip', h: 'Pourquoi l\'ordre timers/check peut varier dans un script principal mais pas dans un callback d\'I/O ? Parce que le timer 0 ms dépend du temps de démarrage du process. Dans la pratique : ne bâtis jamais une logique sur ce micro-ordre hors I/O.' },
            { t: 'code', lang: 'js', label: 'setImmediate pour découper un gros calcul', code:
'const vendeurs = chargerDixMilleLignes();\nlet i = 0;\n\nfunction traiterLot() {\n  const fin = Math.min(i + 500, vendeurs.length);\n  for (; i < fin; i++) analyser(vendeurs[i]);\n  if (i < vendeurs.length) setImmediate(traiterLot);   // rend la main entre deux lots\n  else console.log(\'inventaire Dantokpa terminé\');\n}\ntraiterLot();   // le serveur reste réactif pendant le traitement' }
          ],
          errors: [
            { title: 'Compter sur setTimeout(fn, 0) pour « passer après le reste »', lang: 'js', bad:
'setTimeout(() => console.log(\'timout\'), 0);\nPromise.resolve().then(() => console.log(\'promesse\'));\n// Le débutant s\'attend à : timout, promesse. Faux.',
              good:
'// promesse s\'affiche TOUJOURS avant timout :\n// les microtasks passent avant la phase des timers.\n// Pour « après l\'I/O en cours », préfère setImmediate — c\'est son rôle.',
              why: 'setTimeout(0) n\'est pas un « yield » fiable : il passe par la phase timers, potentiellement après tout le travail déjà empilé. Les promesses et nextTick se glissent avant. Résultat : bugs d\'ordonnancement impossibles à reproduire en test, parfaits en production.' }
          ],
          related: ['nd-single-thread', 'nd-blocage-event-loop', 'js-asynchrone']
        },

        {
          id: 'nd-blocage-event-loop',
          title: 'Ne jamais bloquer l\'Event Loop',
          icon: 'block',
          level: 'Avancé',
          tagline: 'Le serveur qui répond en 3 ms… sauf quand une requête le gèle pour tout le monde.',
          intro: 'Bloquer l\'Event Loop, c\'est le seul vrai crime en Node : **un seul** callback lent immobilise **tous** les clients. Symptôme classique : l\'API répond bien en test, puis s\'effondre en prod — une seule route (souvent `JSON.parse` sur un fichier énorme, ou une boucle sur 500 000 lignes de gari vendu) suffit.',
          blocks: [
            { t: 'h3', h: 'Les quatre suspects habituels' },
            { t: 'ul', items: [
              '**Boucles CPU** : `for`/`while` sur de gros volumes, regex catastrophiques, tri d\'énormes tableaux.',
              '**API synchrones** : `fs.readFileSync`, `execSync`, `bcrypt.hashSync` — le nom finit par `Sync`, méfiance immédiate.',
              '**JSON géant** : `JSON.parse`/`JSON.stringify` sur des dizaines de Mo est synchrone et coûteux.',
              '**Crypto/chiffrement** : `bcrypt` en sync, `crypto.pbkdf2Sync` en route de login = tous les utilisateurs attendent.'
            ] },
            { t: 'code', lang: 'js', label: 'Le poison vs l\'antidote', code:
'// ✗ POISON : le fichier de 3 000 produits de Dantokpa bloque tout le monde\nconst produits = JSON.parse(fs.readFileSync(\'catalogue.json\', \'utf8\'));\napp.get(\'/produits\', (req, res) => res.json(produits));\n\n// ✓ ANTIDOTE 1 : charger une fois, au démarrage, en async\nimport { readFile } from \'node:fs/promises\';\nconst produitsOk = JSON.parse(await readFile(\'catalogue.json\', \'utf8\'));\n// le serveur n\'accepte des requêtes qu\'ensuite\n\n// ✓ ANTIDOTE 2 : crypto toujours en async\nconst hash = await bcrypt.hash(motDePasse, 12);   // pas hashSync' },
            { t: 'h3', h: 'Détecter le blocage avant les clients' },
            { t: 'p', h: 'Un Event Loop en bonne santé a une **latence faible et stable**. En prod, surveille-la : `perf_hooks.monitorEventLoopDelay()` te donne le p99. Règle de pouce : au-delà de quelques dizaines de ms de latence régulière, il y a un blocage en maraude.' },
            { t: 'code', lang: 'js', label: 'Mesurer la latence de la boucle', code:
'import { monitorEventLoopDelay } from \'node:perf_hooks\';\n\nconst h = monitorEventLoopDelay();\nh.enable();\nsetInterval(() => {\n  console.log(\'latence p99 (ms) :\', (h.percentile(99) / 1e6).toFixed(2));\n  h.reset();\n}, 10000);' },
            { t: 'callout', kind: 'warn', h: 'Le blocage ne vient presque jamais de l\'endroit que tu regardes en premier. Profile AVANT d\'optimiser : `node --prof`, `node --cpu-prof` ou une APM. Optimiser au hasard, c\'est repeindre la devanture pendant que la réserve brûle.' },
            { t: 'h3', h: 'Architecture de survie' },
            { t: 'ul', items: [
              '**Découper** : fragmente les gros traitements (setImmediate, chunks).',
              '**Déporter** : worker_threads pour du JS, service externe pour le massif.',
              '**Cache** : ce qui a déjà été calculé ne rebloque pas (Redis ou Map mémoire).',
              '**Plusieurs process** : PM2 en mode cluster met un thread par cœur CPU (fiche PM2).'
            ] }
          ],
          errors: [
            { title: 'Les méthodes *Sync dans les routes', lang: 'js', bad:
'app.post(\'/login\', (req, res) => {\n  const ok = bcrypt.compareSync(req.body.mdp, user.hash);\n  // 100 ms de CPU PAR tentative : 10 logins simultanés = 1 s\n  // de gel total du serveur.\n});',
              good:
'app.post(\'/login\', async (req, res) => {\n  const ok = await bcrypt.compare(req.body.mdp, user.hash);\n});\n// compare() est asynchrone : le hashage se fait hors du thread JS.',
              why: 'compareSync et hashSync exécutent la cryptographie SUR le thread principal. bcrypt est volontairement lent (défense anti brute-force) : en version sync, cette lenteur devient un déni de service auto-infligé dès que plusieurs clients se connectent.' },
            { title: 'Fuite de listeners qui fait gonfler la mémoire', lang: 'js', bad:
'app.get(\'/tick\', (req, res) => {\n  emitter.on(\'data\', () => {/* ... */});\n  // +1 listener à CHAQUE requête : MaxListenersExceededWarning,\n  // mémoire qui grimpe, redémarrages mysterieux la nuit.\n});',
              good:
'// Attacher le listener UNE fois (au démarrage) ou utiliser once(),\n// et removeListener() / removeAllListeners() quand l\'objet meurt.',
              why: 'EventEmitter retient chaque listener en mémoire. En ajouter sans jamais les retirer est la fuite de mémoire la plus banale en Node : le process grossit de requête en requête jusqu\'au crash. Node te prévient à 10 listeners : ne désactive pas l\'avertissement, corrige la cause.' }
          ],
          related: ['nd-event-loop', 'nd-eventemitter', 'nd-pm2-production']
        }
      ]
    },

    /* ======================================================
       2. NPM, NPX & MODULES
       ====================================================== */
    {
      id: 'npm-modules',
      name: 'npm, npx & modules',
      icon: 'package_2',
      fiches: [
        {
          id: 'nd-npm-package-json',
          title: 'npm & package.json : la carte d\'identité du projet',
          icon: 'inventory_2',
          level: 'Débutant',
          tagline: 'Qui installe quoi, dans quelle version — et pourquoi le lock file est sacré.',
          intro: '**npm** est à la fois le registre (la plus grande librairie de paquets au monde) et l\'outil qui les installe. Le contrat entre les deux, c\'est `package.json` : nom, scripts, dépendances et leurs versions tolérées. Sans lui, ton projet est une caisse sans étiquette.',
          blocks: [
            { t: 'code', lang: 'bash', label: 'Naissance d\'un projet API', code:
'mkdir api-dantokpa && cd api-dantokpa\nnpm init -y                    # package.json par défaut\nnpm install express            # dépendance de PROD\nnpm install --save-dev nodemon # dépendance de DEV uniquement\nnpm install                    # réinstalle tout depuis package.json + lock' },
            { t: 'h3', h: 'Semver : les plafonds et le carrelage' },
            { t: 'table', head: ['Écrit dans package.json', 'Signification', 'Installe au max'], rows: [
              ['"express": "5.1.0"', 'cette version exacte', '5.1.0'],
              ['"express": "~5.1.0"', 'patchs OK (~ tuile)', '5.1.x'],
              ['"express": "^5.1.0"', 'mineurs + patchs OK (^ chapeau)', '5.x (pas 6)'],
              ['"express": "*"', 'n\'importe quoi', 'le chaos un vendredi soir']
            ] },
            { t: 'p', h: 'Et surtout : **`package-lock.json` se COMMIT**. C\'est lui qui fige les versions EXACTES de tout l\'arbre (dépendances des dépendances comprises). Deux développeuses, un CI et la prod installent alors le même arbre au bit près — `npm ci` en CI le garantit strictement.' },
            { t: 'h3', h: 'dependencies vs devDependencies' },
            { t: 'ul', items: [
              '**dependencies** : nécessaires EN PROD (express, pg, bcrypt). Installées avec `npm install --omit=dev`.',
              '**devDependencies** : outillage local (nodemon, tests, linters). Jamais déployées.',
              'Un paquet de prod déclaré en dev = crash au premier déploiement allégé. La faute classique du vendredi.'
            ] },
            { t: 'code', lang: 'js', label: 'package.json typique d\'une API', code:
'{\n  "name": "api-dantokpa",\n  "version": "1.0.0",\n  "type": "module",              // ← active les ES Modules (fiche suivante)\n  "scripts": {\n    "dev": "nodemon server.js",\n    "start": "node server.js",\n    "test": "node --test"\n  },\n  "dependencies": { "express": "^5.1.0" },\n  "devDependencies": { "nodemon": "^3.1.0" }\n}' },
            { t: 'callout', kind: 'tip', h: '`npm outdated` pour voir ce qui vieillit, `npm audit` pour les vulnérabilités connues, `npm ls <paquet>` pour savoir QUI tire une dépendance embarrassante.' }
          ],
          errors: [
            { title: 'Ne pas committer package-lock.json', lang: 'bash', bad:
'# .gitignore\nnode_modules\npackage-lock.json     ← « ils disaient que ça devait rester local »',
              good:
'# .gitignore\nnode_modules\n.env\n# lock : COMMITTÉ. C\'est la photo exacte de l\'arbre qui marche.',
              why: 'Sans lock, npm recalcule l\'arbre à chaque install : la version d\'une sous-dépendance change, et « ça marchait sur ma machine » devient un incident de prod. Le lock existe précisément pour rendre les installations reproductibles.' }
          ],
          related: ['nd-npx-scripts', 'nd-cjs-vs-esm', 'nd-variables-env']
        },

        {
          id: 'nd-cjs-vs-esm',
          title: 'CommonJS vs ES Modules',
          icon: 'swap_horiz',
          level: 'Intermédiaire',
          tagline: 'require ou import ? Deux mondes qui cohabitent — et comment choisir.',
          intro: 'Node a historiquement utilisé **CommonJS** (`require`/`module.exports`, synchrone, créé avant que le langage ait des modules). Le standard JavaScript, lui, s\'appelle **ES Modules** (`import`/`export`). En 2026, sur un projet neuf : **ES Modules**, sans hésiter. Mais tu croiseras du CommonJS partout — il faut savoir lire les deux.',
          blocks: [
            { t: 'code', lang: 'js', label: 'Le même module, deux dialectes', code:
'// ── CommonJS (historique)\nconst express = require(\'express\');\nmodule.exports = { arrondirPrix };\n\n// ── ES Modules (standard, à privilégier)\nimport express from \'express\';\nexport function arrondirPrix(x) { return x.toFixed(2); }\nexport default arrondirPrix;' },
            { t: 'h3', h: 'Activer ESM : deux chemins' },
            { t: 'ul', items: [
              '`"type": "module"` dans package.json → tous les `.js` du projet sont ESM (recommandé).',
              'Ou l\'extension `.mjs` (toujours ESM) / `.cjs` (toujours CommonJS), utile en zone mixte.',
              'En ESM, l\'import est **statique** : chemins résolus à l\'analyse, avec l\'extension obligatoire (`./utils.js`, pas `./utils`).'
            ] },
            { t: 'table', head: ['', 'CommonJS', 'ES Modules'], rows: [
              ['import', 'require(\'express\')', 'import express from \'express\''],
              ['export', 'module.exports = …', 'export / export default'],
              ['chargement', 'synchrone', 'statique (analysable), async sous le capot'],
              ['__dirname', 'natif', 'à reconstruire (voir ci-dessous)'],
              ['top-level await', '✗', '✓ dans les modules'],
              ['tree-shaking', '✗', '✓ (utile côté bundlers)']
            ] },
            { t: 'h3', h: 'Le piège __dirname en ESM' },
            { t: 'code', lang: 'js', label: 'Retrouver son dossier en ES Modules', code:
'// __dirname n\'existe PAS en ESM. Recette officielle :\nimport { fileURLToPath } from \'node:url\';\nimport { dirname, join } from \'node:path\';\n\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = dirname(__filename);\n\nconst chemin = join(__dirname, \'data\', \'produits.json\');\n\n// Encore mieux quand on n\'a besoin QUE du fichier :\nconst dataUrl = new URL(\'./data/produits.json\', import.meta.url);' },
            { t: 'callout', kind: 'info', h: 'Interop : un module ESM peut importer du CommonJS (`import pkg from \'vieux-pkg\'` — via l\'export par défaut). L\'inverse (un CJS qui require un ESM) est possible depuis Node 22/24 pour les modules sans top-level await, mais ne compte pas dessus partout.' },
            { t: 'p', h: 'Dans ce module, tous les exemples serveur utilisent ESM avec `"type": "module"`. Si tu maintiens un vieux code CommonJS : migre fichier par fichier — les deux formats cohabitent tant qu\'un fichier ne mélange pas les deux syntaxes.' }
          ],
          errors: [
            { title: 'Mélanger les deux syntaxes dans le même fichier', lang: 'js', bad:
'const express = require(\'express\');\nimport { Router } from \'express\';\n// ✗ SyntaxError : un fichier est soit CJS, soit ESM, jamais les deux.',
              good:
'// Un choix par fichier. Projet neuf :\n// "type": "module" + import partout.',
              why: 'Le format d\'un fichier est déterminé par .js/.mjs/.cjs et le champ type — il est global au fichier. Cronenberguer les deux syntaxes donne une erreur au démarrage, au mieux ; au pire, des imports partiels incompréhensibles après un copier-coller Stack Overflow.' },
            { title: 'Oublier l\'extension dans les imports relatifs ESM', lang: 'js', bad:
'import { arrondirPrix } from \'./utils\';\n// ✗ ERR_MODULE_NOT_FOUND en ESM natif',
              good:
'import { arrondirPrix } from \'./utils.js\';\n// ✓ extension obligatoire (c\'est le bundler qui t\'avait habitué à l\'omettre)',
              why: 'Node ESM résout les chemins comme des URL : pas d\'inférence d\'extension ni d\'index.js implicite. C\'est plus strict qu\'un bundler (Vite, webpack) — le code qui marche en front peut refuser de démarrer en back pour cette seule raison.' }
          ],
          related: ['nd-npm-package-json', 'ts-modules', 'js-es6']
        },

        {
          id: 'nd-npx-scripts',
          title: 'npx & scripts npm',
          icon: 'terminal',
          level: 'Débutant',
          tagline: 'Exécuter sans installer, et faire du package.json ton tableau de bord.',
          intro: '**npx** exécute un binaire de paquet sans l\'installer globalement ; les **scripts** dans package.json standardisent les commandes du projet (`npm run dev`, `npm test`). Ensemble, ils font de package.json le point d\'entrée unique — n\'importe quelle développeuse clone et sait quoi taper.',
          blocks: [
            { t: 'code', lang: 'bash', label: 'npx à l\'œuvre', code:
'npx nodemon server.js        # exécute le nodemon LOCAL (./node_modules/.bin)\nnpx create-next-app@latest   # exécute un paquet sans l\'installer durablement\nnpx kill-port 3000           # outil jetable, zéro pollution globale\n\n# Attention : npx pose une question la première fois (télécharge-t-il ce paquet ?)\n# En CI : préfère npx --yes ou une devDependency versionnée.' },
            { t: 'h3', h: 'Pourquoi npx plutôt qu\'une installation globale ?' },
            { t: 'p', h: 'Un paquet global est partagé entre TOUS tes projets : version figée au jour où tu l\'as installé, source de « ça marchait sur l\'autre projet ». Avec npx, chacun utilise la version DÉCLARÉE dans son package.json — reproductible, isolé, sans droits admin.' },
            { t: 'h3', h: 'Les scripts : conventions utiles' },
            { t: 'code', lang: 'js', label: 'scripts dans package.json', code:
'"scripts": {\n  "dev": "nodemon server.js",        // npm run dev → rechargement auto\n  "start": "node server.js",          // npm start → commande de PROD\n  "lint": "eslint .",\n  "test": "node --test tests/",       // runner de tests intégré à Node\n  "migrate": "node scripts/migrate.js"\n}' },
            { t: 'table', head: ['Commande', 'Particularité'], rows: [
              ['npm start / npm test', 'Raccourcis officiels (pas besoin de run)'],
              ['npm run dev', 'Script custom, nécessite run'],
              ['npm run', 'Liste tous les scripts disponibles'],
              ['npm run dev -- --port 4000', 'Le -- passe des arguments au script']
            ] },
            { t: 'callout', kind: 'tip', h: 'Les scripts npm ajoutent ./node_modules/.bin au PATH : c\'est pour ça que `"dev": "nodemon server.js"` trouve nodemon SANS npx et sans installation globale.' },
            { t: 'p', h: 'Côté outillage, deux habitudes qui paient : `npm run dev` lance **nodemon** (redémarre le serveur à chaque sauvegarde — ou `node --watch` en natif depuis Node 20+) et `npm test` reste la porte d\'entrée que le CI appellera. Un nouveau venu sur le projet n\'a qu\'à lire les scripts pour comprendre le workflow.' }
          ],
          errors: [
            { title: 'Installer les outils en global', lang: 'bash', bad:
'npm install -g nodemon eslint typescript\n# 6 mois plus tard : trois versions différentes\n# selon les machines, bugs introuvables.',
              good:
'npm install --save-dev nodemon eslint\n# binaires dans le lock, exécutés via scripts npm :\n# "dev": "nodemon server.js"',
              why: 'Le global mélange les versions entre projets et machines — le cauchemar de reproductibilité. Un outil utile au projet est une dépendance du projet : déclarée, versionnée, partagée par le lock.' }
          ],
          related: ['nd-npm-package-json', 'nd-cjs-vs-esm', 'nd-pm2-production']
        }
      ]
    },

    /* ======================================================
       3. MODULES NATIFS
       ====================================================== */
    {
      id: 'modules-natifs',
      name: 'Modules natifs',
      icon: 'memory',
      fiches: [
        {
          id: 'nd-fs',
          title: 'fs : lire et écrire des fichiers',
          icon: 'folder_open',
          level: 'Débutant',
          tagline: 'Callbacks, promesses ou sync — et pourquoi une seule variante a sa place dans un serveur.',
          intro: 'Le module **`node:fs`** donne accès au système de fichiers. Il existe en trois saveurs — callbacks historiques, promesses (`node:fs/promises`, la version moderne), et méthodes synchrones. Dans un serveur Express, la règle est simple : **promesses partout, sync uniquement au démarrage**.',
          blocks: [
            { t: 'code', lang: 'js', label: 'Lecture/écriture moderne (fs/promises)', code:
'import { readFile, writeFile, appendFile, mkdir } from \'node:fs/promises\';\n\n// Le registre des vendeuses de gari, en JSON\nconst brut = await readFile(\'vendeuses.json\', \'utf8\');\nconst vendeuses = JSON.parse(brut);\n\nvendeuses.push({ nom: \'Awa Mensah\', stand: \'Dantokpa N12\', produit: \'gari\' });\nawait writeFile(\'vendeuses.json\', JSON.stringify(vendeuses, null, 2));\n//           ↑ écriture atomique ? NON — voir erreurs plus bas\n\nawait mkdir(\'exports\', { recursive: true });   // crée l\'arbre si besoin\nawait appendFile(\'exports/journal.csv\', \'Awa Mensah,gari,1200\\n\');' },
            { t: 'h3', h: 'Les trois saveurs face à face' },
            { t: 'table', head: ['Variante', 'Import', 'Où elle convient'], rows: [
              ['Promesses', 'node:fs/promises', 'serveurs, scripts : le choix par défaut'],
              ['Callback', 'node:fs (fs.readFile)', 'code legacy, API streams bas niveau'],
              ['Sync', 'node:fs (fs.readFileSync)', 'uniquement au démarrage, jamais en route']
            ] },
            { t: 'p', h: 'Note le préfixe **`node:`** : `import { readFile } from \'node:fs\'`. Il désigne sans ambiguïté un module NATIF (un paquet npm ne peut pas le surcharger) — adopte-le partout, c\'est la convention actuelle.' },
            { t: 'h3', h: 'Les méthodes qui rendent service' },
            { t: 'ul', items: [
              '`readFile` / `writeFile` : tout en mémoire — parfait sous quelques Mo.',
              '`appendFile` : journaux, exports à la ligne.',
              '`mkdir(d, { recursive: true })` : crée les dossiers parents, n\'échoue pas si ça existe.',
              '`readdir` / `stat` : lister, connaître taille et dates.',
              'Au-delà de quelques Mo : **streams** (fiche dédiée), sinon la mémoire explose.'
            ] },
            { t: 'callout', kind: 'warn', h: 'Un serveur qui écrit sur son disque local est éphémère : en plateforme cloud (Railway, Render…), le système de fichiers est REMIS À ZÉRO à chaque déploiement. Fichiers persistants = base de données ou stockage objet (S3), pas le disque.' },
            { t: 'code', lang: 'js', label: 'Charger une config au démarrage (le seul bon usage de Sync)', code:
'import { readFileSync } from \'node:fs\';\nimport { join, dirname } from \'node:path\';\nimport { fileURLToPath } from \'node:url\';\n\nconst __dirname = dirname(fileURLToPath(import.meta.url));\nconst config = JSON.parse(\n  readFileSync(join(__dirname, \'config.json\'), \'utf8\')\n);\n// Sync toléré ICI : le serveur ne sert encore personne.' }
          ],
          errors: [
            { title: 'Perdre des données en réécrivant un JSON', lang: 'js', bad:
'const data = JSON.parse(await readFile(\'db.json\', \'utf8\'));\ndata.push(nouveau);\nawait writeFile(\'db.json\', JSON.stringify(data));\n// Crash entre les deux ? Le fichier est TRONQUÉ : tout est perdu.',
              good:
'// Deux protections :\n// 1. Écrire dans un fichier TEMPORAIRE puis rename() (atomique)\n// 2. Mieux : une vraie BD (SQLite, Postgres) — un fichier JSON\n//    n\'est pas une base de données multi-clients.',
              why: 'writeFile n\'est pas atomique : un plantage en plein milieu laisse un fichier partiel. Et deux requêtes simultanées qui lisent-modifient-écrivent se marchent dessus (race condition). Un fichier JSON va bien pour la config, jamais pour des données partagées qui bougent.' }
          ],
          related: ['nd-path-os', 'nd-streams-buffers', 'nd-bd-async']
        },

        {
          id: 'nd-path-os',
          title: 'path & os : des chemins qui survivent au déploiement',
          icon: 'computer',
          level: 'Débutant',
          tagline: 'Le code qui marche sous Windows, Linux et macOS sans #ifdef.',
          intro: 'Ton serveur tournera en prod sous Linux, mais tu développes peut-être sous Windows et ta collègue sous macOS. Les séparateurs de chemins (`/` vs le DOS), le dossier courant, la mémoire machine : **`node:path`** et **`node:os`** existent pour que rien de tout cela ne soit ton problème.',
          blocks: [
            { t: 'code', lang: 'js', label: 'path : les quatre méthodes de survie', code:
'import path from \'node:path\';\n\npath.join(\'uploads\', \'photos\', \'awa.png\');\n//  uploads/photos/awa.png (séparateur ADAPTÉ à l\'OS)\n\npath.join(__dirname, \'..\' , \'public\');\n//  normalise les .. : un cran au-dessus, puis public\n\npath.extname(\'facture-mensah.pdf\');     // .pdf\npath.basename(\'/data/exports/stock.csv\'); // stock.csv\npath.parse(\'/data/exports/stock.csv\');\n//  { root, dir, base, ext, name : \'stock\' }\n\nconst absolu = path.resolve(\'data\', \'config.json\');\n//  absolu depuis le CWD — toujours préférer join(__dirname, …)' },
            { t: 'h3', h: 'Le piège du CWD (current working directory)' },
            { t: 'p', h: '`path.resolve(\'data\')` dépend d\'**où l\'on lance node** : depuis la racine du projet, ça marche ; depuis ailleurs (PM2, cron, CI), plus rien ne se trouve. Règle d\'or : **tout chemin de fichier du projet se construit depuis `__dirname`**, jamais depuis le CWD.' },
            { t: 'code', lang: 'js', label: 'os : connaître sa machine', code:
'import os from \'node:os\';\n\nos.platform();      // linux | darwin | win32\nos.cpus().length;   // 8 → PM2 en cluster visera 8 process\nos.totalmem() / 1e9;      // RAM totale en Go\nos.freemem()  / 1e9;      // RAM libre — à surveiller avant d\'allouer\nos.hostname();    // utile dans les logs multi-serveurs\nos.tmpdir();      // dossier temporaire portable (uploads multer)' },
            { t: 'table', head: ['Besoin', 'Méthode'], rows: [
              ['Assembler un chemin portable', 'path.join(...morceaux)'],
              ['Chemin relatif au FICHIER courant', 'join(__dirname, ...)'],
              ['Chemin relatif au CWD (CLI seulement)', 'path.resolve(...)'],
              ['Normaliser ../../.. contre les attaques', 'path.normalize + vérif (voir upload)'],
              ['Nb de cœurs pour le cluster', 'os.cpus().length']
            ] },
            { t: 'callout', kind: 'tip', h: 'En ESM, reconstruis `__dirname` avec `fileURLToPath(import.meta.url)` — la recette est dans la fiche CommonJS vs ESM.' }
          ],
          errors: [
            { title: 'Concaténer des chemins à la main', lang: 'js', bad:
'const fichier = __dirname + \'/uploads/\' + req.body.nom;\n// Sous Windows : mélange de séparateurs.\n// Et pire : req.body.nom = \"../../.env\" → path traversal !',
              good:
'import path from \'node:path\';\nconst base = path.join(__dirname, \'uploads\');\nconst fichier = path.join(base, path.basename(req.body.nom));\n// basename() coupe tout ../ — double protection.',
              why: 'Deux bugs pour le prix d\'une concaténation : la portabilité (séparateurs) et la sécurité (traversal). Un nom de fichier venant du client ne doit JAMAIS être injecté tel quel dans un chemin : path.basename, une regex de whitelist, ou mieux — un nom généré par le serveur.' }
          ],
          related: ['nd-fs', 'nd-upload-multer', 'nd-variables-env']
        },

        {
          id: 'nd-http-natif',
          title: 'http : un serveur sans framework',
          icon: 'http',
          level: 'Intermédiaire',
          tagline: 'Comprendre ce qu\'Express encapsule en le faisant une fois à la main.',
          intro: 'Le module **`node:http`** peut servir des requêtes sans aucune dépendance. Personne ne bâtit une vraie API dessus aujourd\'hui — mais l\'écrire UNE fois démystifie Express : tout ce qu\'il ajoute (routing, parsing, middlewares) est du sucre sur ces primitives.',
          blocks: [
            { t: 'code', lang: 'js', label: 'Une micro-API avec rien', code:
'import { createServer } from \'node:http\';\n\nconst serveur = createServer((req, res) => {\n  const { method, url } = req;\n\n  if (method === \'GET\' && url === \'/sante\') {\n    res.writeHead(200, { \'Content-Type\': \'application/json\' });\n    res.end(JSON.stringify({ ok: true, ville: \'Cotonou\' }));\n    return;\n  }\n\n  if (method === \'POST\' && url === \'/echo\') {\n    let corps = \'\';\n    req.on(\'data\', (morceau) => { corps += morceau; });  // le body arrive PAR MORCEAUX\n    req.on(\'end\', () => {\n      res.writeHead(200, { \'Content-Type\': \'application/json\' });\n      res.end(JSON.stringify({ recu: JSON.parse(corps) }));\n    });\n    return;\n  }\n\n  res.writeHead(404);\n  res.end(JSON.stringify({ erreur: \'route inconnue\' }));\n});\n\nserveur.listen(3000, () => console.log(\'http://localhost:3000\'));\n\n// Point crucial : ni gestion d\'erreurs, ni parsing — la raison d\'être d\'Express.' },
            { t: 'h3', h: 'Ce que ce code enseigne' },
            { t: 'ul', items: [
              'Le corps de la requête est un **stream** : on assemble les morceaux à la main. `express.json()` fait exactement ça, sans risque d\'oubli.',
              'Le routing est un `if/else` sur `method` + `url`. Imagine 40 routes avec params `:id`…',
              'Rien ne parse la query string, rien ne sérialise les réponses, rien ne gère les erreurs.',
              '**Express n\'est pas un serveur, c\'est une couche de confort** par-dessus node:http. `app.listen()` appelle `http.createServer` en interne.'
            ] },
            { t: 'p', h: 'Retient aussi la forme de `req` et `res` : objets natifs Node, enrichis par Express d\'un sucre comme `res.json()`. Quand Express t\'agace, ces objets restent accessibles en dessous — `res.writeHead` et `res.end` fonctionnent toujours (et se mélangent mal avec `res.send`, voir erreur).' },
            { t: 'callout', kind: 'info', h: 'Quand le http natif suffit-il vraiment ? Micro-scripts internes, healthcheck dans un conteneur, ou expérience d\'apprentissage comme celle-ci. Dès qu\'il y a deux ressources REST : Express.' }
          ],
          errors: [
            { title: 'Répondre sans status ni Content-Type explicites', lang: 'js', bad:
'res.end(JSON.stringify({ ok: true }));\n// Le client reçoit du text/plain : fetch().then(r => r.json())\n// échoue ou oblige à parser à la main ; certains proxys tournent mal.',
              good:
'res.writeHead(200, { \'Content-Type\': \'application/json; charset=utf-8\' });\nres.end(JSON.stringify({ ok: true }));\n// en Express : res.status(200).json({ ok: true }) — une ligne.',
              why: 'Le protocole HTTP annonce ce qu\'il transporte. Un Content-Type absent laisse chaque client deviner — et le navigateur, les proxys et les tests automatisés devinent différemment. Explicite, toujours.' }
          ],
          related: ['nd-express-bases', 'nd-req-res', 'nd-streams-buffers']
        },

        {
          id: 'nd-eventemitter',
          title: 'events : EventEmitter, le câblage interne',
          icon: 'podcasts',
          level: 'Intermédiaire',
          tagline: 'Le patron observateur qui fait trembler tout Node — et les fuites qui vont avec.',
          intro: '**EventEmitter** implémente le patron observateur : des objets **émettent** des événements nommés, d\'autres **écoutent**. C\'est l\'ADN de Node : `server.on(\'request\')`, `stream.on(\'data\')`, `process.on(\'exit\')` — tout est EventEmitter. Et dans tes propres applications, c\'est l\'outil pour découpler « quelque chose s\'est passé » de « ce qu\'on en fait ».',
          blocks: [
            { t: 'code', lang: 'js', label: 'Un bus d\'événements métier', code:
'import { EventEmitter } from \'node:events\';\n\nclass Bus extends EventEmitter {}\nconst bus = new Bus();\n\n// Le service commandes ÉMET, sans connaître les auditeurs\nbus.emit(\'commande:creee\', { id: 42, cliente: \'Awa Mensah\', total: 12500 });\n\n// Ailleurs dans l\'app, on ÉCOUTE — zéro dépendance directe\nbus.on(\'commande:creee\', (c) => envoyerRecuWhatsApp(c));\nbus.on(\'commande:creee\', (c) => majStock(c));\nbus.once(\'commande:creee\', (c) => logPremiereCommande(c));   // une seule fois' },
            { t: 'h3', h: 'Le réflexe à connaître' },
            { t: 'ul', items: [
              '`on(evt, fn)` : écoute permanente. `once(evt, fn)` : une seule exécution.',
              '`off(evt, fn)` (alias removeListener) : LE moyen de désabonner proprement.',
              '`emit(evt, ...args)` : synchrone ! Les listeners s\'exécutent immédiatement, dans l\'ordre d\'abonnement.',
              'L\'événement spécial `\'error\'` : s\'il n\'a AUCUN listener, il est levé comme exception — et peut faire crasher le process.'
            ] },
            { t: 'p', h: 'Quand t\'en servir ? Notifications après une action (email, audit), de coupler des modules sans import croisé, piloter des tâches internes. Quand PAS t\'en servir : pour remplacer le flux normal d\'une requête HTTP — les événements rendent le flux invisible, et le débogage devient de la divination.' },
            { t: 'code', lang: 'js', label: 'Attendre un événement en promesse (Node 15+)', code:
'import { once } from \'node:events\';\n\n// Transforme "une fois, un événement" en await — très pratique\n// pour attendre qu\'un serveur soit prêt dans les tests :\nawait once(serveur, \'listening\');\nconsole.log(\'le serveur écoute, on peut le tester\');' },
            { t: 'callout', kind: 'warn', h: 'Tu verras `MaxListenersExceededWarning: 11 listeners added`. Ce n\'est pas de la décoration : c\'est le détecteur de FUITE DE MÉMOIRE de Node que t\'as déclenché — quelque part, on ajoute des listeners sans jamais les enlever.' }
          ],
          errors: [
            { title: 'Ajouter un listener dans un handler de requête', lang: 'js', bad:
'app.get(\'/stats\', (req, res) => {\n  bus.on(\'maj\', () => calculerStats());\n  // 100 requêtes = 100 listeners qui traînent en mémoire\n});',
              good:
'// Les listeners persistants s\'attachent AU DÉMARRAGE.\n// Dans une requête : once() si vraiment nécessaire, ou rien\n// (la requête se termine, elle n\'a pas à survivre par un listener).',
              why: 'Le listener capture des références (closures) et empêche le garbage collector de libérer. À chaque requête, la mémoire grimpe et le process finit par redémarrer à 3 h du matin — le ticket d\'incident le plus classique du Node en prod.' }
          ],
          related: ['nd-streams-buffers', 'nd-blocage-event-loop', 'nd-deploiement']
        },

        {
          id: 'nd-streams-buffers',
          title: 'stream & buffer : traiter par gorgées, pas par goulots',
          icon: 'waves',
          level: 'Avancé',
          tagline: 'Un export de 2 Go dans un serveur à 512 Mo de RAM ? Sans problème.',
          intro: 'Un **Buffer** est une zone mémoire brute (des octets) ; un **stream** fait circuler ces octets PAR MORCEAUX entre une source et une destination. C\'est LA réponse de Node aux gros volumes : au lieu de charger un fichier entier en mémoire, tu le bois à la paille. L\'export complet des ventes de Dantokpa tient dans un serveur modeste.',
          blocks: [
            { t: 'code', lang: 'js', label: 'Le pipeline en trois lignes', code:
'import { createReadStream } from \'node:fs\';\nimport { createGzip } from \'node:zlib\';\nimport { createWriteStream } from \'node:fs\';\n\ncreateReadStream(\'ventes-2026.csv\')   // source (readable)\n  .pipe(createGzip())                  // transforme (transform)\n  .pipe(createWriteStream(\'ventes-2026.csv.gz\'));  // destination (writable)\n// Mémoire utilisée : quelques Ko de tampon, quel que soit le volume.' },
            { t: 'h3', h: 'Les quatre familles de streams' },
            { t: 'table', head: ['Famille', 'Rôle', 'Exemple'], rows: [
              ['Readable', 'source de données', 'fs.createReadStream, req HTTP'],
              ['Writable', 'destination', 'fs.createWriteStream, res HTTP'],
              ['Duplex', 'les deux (socket)', 'TCP socket'],
              ['Transform', 'transforme au passage', 'gzip, chiffrement, CSV parsing']
            ] },
            { t: 'h3', h: 'Backpressure : la politesse du tuyau' },
            { t: 'p', h: 'Si la source débite plus vite que la destination n\'absorbe (disque lent, réseau saturé), les morceaux s\'accumulent en mémoire. Le **backpressure** est le mécanisme par lequel la destination dit « pause ». **`.pipe()` le gère automatiquement** ; si tu écris à la main avec `.write()`, respecte sa valeur de retour et attends l\'événement `\'drain\'`.' },
            { t: 'code', lang: 'js', label: 'Streamer directement une réponse HTTP', code:
'import { createReadStream, statSync } from \'node:fs\';\n\napp.get(\'/exports/stock.csv\', (req, res) => {\n  const taille = statSync(\'exports/stock.csv\').size;\n  res.writeHead(200, {\n    \'Content-Type\': \'text/csv\',\n    \'Content-Length\': taille\n  });\n  createReadStream(\'exports/stock.csv\').pipe(res);\n  // res est un Writable : le client télécharge au fil de la lecture disque.\n});' },
            { t: 'h3', h: 'Buffer : l\'unité d\'échange' },
            { t: 'ul', items: [
              '`Buffer.from(\'gari\', \'utf8\')` : texte → octets. `buf.toString()\'utf8\')` : retour.',
              '`Buffer.concat(morceaux)` : idiomatique pour assembler un corps de requête (ce que fait express.json).',
              '`buf.subarray(a, b)` : vue SANS copie sur une tranche — rapide, mais attention aux mutations partagées.',
              'Hors manipulation binaire (protocoles, images), tu ne coderas presque jamais avec Buffer directement.'
            ] },
            { t: 'callout', kind: 'tip', h: 'API moderne : `stream/promises` exporte `pipeline(source, ...transforms, dest)` qui gère proprement erreurs ET nettoyage (les streams abandonnés sont détruits). Préfère-le à la chaîne de .pipe dès que ça devient sérieux.' }
          ],
          errors: [
            { title: 'Assembler soi-même au lieu de piper', lang: 'js', bad:
'const source = createReadStream(\'gros-fichier.log\');\nlet tout = \'\';\nsource.on(\'data\', (m) => { tout += m; });   // tout en mémoire : retour case départ\nsource.on(\'end\', () => res.send(tout));',
              good:
'createReadStream(\'gros-fichier.log\').pipe(res);\n// ou avec gestion d\'erreurs :\nimport { pipeline } from \'node:stream/promises\';\nawait pipeline(createReadStream(\'gros-fichier.log\'), res);',
              why: 'Accumuler les morceaux dans une variable annule exactement le bénéfice du streaming : la mémoire gonfle au rythme du fichier. pipe/pipeline transmettent le backpressure et ferment proprement — deux choses qu\'un code à la main oublie toujours.' }
          ],
          related: ['nd-fs', 'nd-http-natif', 'nd-upload-multer']
        }
      ]
    }
  ]
};

/* ======================================================
   4. EXPRESS : FONDAMENTAUX
   ====================================================== */
DEVDOCS.node.categories.push(
  {
    id: 'express-fondamentaux',
    name: 'Fondamentaux Express',
    icon: 'dns',
    fiches: [
      {
        id: 'nd-express-bases',
        title: 'Premier serveur Express',
        icon: 'dns',
        level: 'Débutant',
        tagline: 'Dix lignes pour une API qui répond — et comprendre chacune d\'elles.',
        intro: 'Express est un **micro-framework** : volontairement minimal, il fournit le routing, les middlewares et l\'habillage des réponses — rien de plus. Ce minimalisme est un choix de design : tu composes ta pile toi-même. En 2026, `npm install express` installe **Express 5**, la version de référence de ce module.',
        blocks: [
          { t: 'code', lang: 'js', label: 'server.js — le plus petit vrai serveur', code:
'import express from \'express\';\n\nconst app = express();\napp.use(express.json());          // lit les corps JSON (fiche middlewares intégrés)\n\nconst vendeuses = [\n  { id: 1, nom: \'Awa Mensah\', stand: \'Dantokpa N12\' },\n  { id: 2, nom: \'Sènami Koffi\', stand: \'Dantokpa B4\' }\n];\n\napp.get(\'/api/vendeuses\', (req, res) => {\n  res.json(vendeuses);            // sérialise + Content-Type + statut 200\n});\n\napp.post(\'/api/vendeuses\', (req, res) => {\n  const nouvelle = { id: vendeuses.length + 1, ...req.body };\n  vendeuses.push(nouvelle);\n  res.status(201).json(nouvelle); // 201 Created — la sémantique compte\n});\n\napp.listen(3000, () => console.log(\'API sur http://localhost:3000\'));' },
          { t: 'h3', h: 'Lire le code comme un serveur le vit' },
          { t: 'ol', items: [
            '`express()` fabrique l\'application : un accumulateur de routes et de middlewares.',
            '`app.use(express.json())` installe un middleware qui parse les corps JSON **avant** tes routes.',
            '`app.get(...)` enregistre un couple (méthode + chemin) → fonction qui reçoit `(req, res)`.',
            '`res.json(...)` fait trois choses d\'un coup : statut, en-tête Content-Type, JSON.stringify.',
            '`app.listen(port)` crée le serveur HTTP natif et l\'ouvre — ton process reste vivant grâce à lui.'
          ] },
          { t: 'h3', h: 'Express 5 : ce qui change par rapport aux vieux tutoriels' },
          { t: 'table', head: ['Avant (Express 4)', 'Maintenant (Express 5)'], rows: [
            ['Rejet de promesse non géré par défaut', 'Transmis automatiquement au middleware d\'erreurs'],
            ['app.del(...)', 'app.delete(...)'],
            ['Jokers de routes * et :id? larges', 'Syntaxe path-to-regexp v6 : /*splat'],
            ['res.send(status nombre)', 'res.sendStatus(404) ou res.status(404).send(...)']
          ] },
          { t: 'callout', kind: 'info', h: 'Si un tutoriel utilise `require(\'express\')` et `app.del`, il décrit Express 4 en CommonJS. Les concepts restent vrais ; la syntaxe, elle, date.' },
          { t: 'p', h: 'Pour tester sans navigateur : `curl -X POST http://localhost:3000/api/vendeuses -H "Content-Type: application/json" -d \'{"nom":"Afi Djossou"}\'` — ou mieux, la fiche routing te montrera `fetch` depuis le front. Garde `curl` sous le coude : c\'est le stéthoscope de l\'API.' }
        ],
        errors: [
          { title: 'Répondre deux fois à la même requête', lang: 'js', bad:
'app.get(\'/api/vendeuses\', (req, res) => {\n  if (vendeuses.length === 0) {\n    res.status(404).json({ erreur: \'aucune vendeuse\' });\n  }\n  res.json(vendeuses);          // ← si le if a répondu, on RÉPOND ENCORE\n});\n// Error: Cannot set headers after they are sent to the client',
            good:
'app.get(\'/api/vendeuses\', (req, res) => {\n  if (vendeuses.length === 0) {\n    return res.status(404).json({ erreur: \'aucune vendeuse\' });   // return !\n  }\n  res.json(vendeuses);\n});',
            why: 'res.json() ne fait PAS sortir de la fonction : ce n\'est pas un return PHP. Sans return, l\'exécution continue et la deuxième tentative d\'envoi explose. Le réflexe : toujours `return res.xxx(...)` dans les branches qui terminent.' }
        ],
        related: ['nd-req-res', 'nd-routing-methodes', 'nd-http-natif']
      },

      {
        id: 'nd-req-res',
        title: 'La boucle requête → réponse',
        icon: 'sync_alt',
        level: 'Débutant',
        tagline: 'req, res : ce qui entre, ce qui sort — et tout ce qu\'Express y a rangé.',
        intro: 'Chaque requête HTTP déclenche ta fonction avec deux objets : **`req`** (ce que le client envoie) et **`res`** (ce que le serveur prépare). Express les a enrichis par rapport aux objets natifs : tout ce dont tu as besoin au quotidien tient en une dizaine de propriétés. Les maîtriser, c\'est lire n\'importe quelle route à vue.',
        blocks: [
          { t: 'h3', h: 'req : ce que le client te raconte' },
          { t: 'table', head: ['Propriété', 'Contenu', 'Exemple'], rows: [
            ['req.method', 'verbe HTTP', 'GET, POST…'],
            ['req.params', 'paramètres d\'URL nommés', 'GET /vendeuses/12 → { id: \'12\' }'],
            ['req.query', 'query string parsée', '?page=2&tri=prix → { page: \'2\', tri: \'prix\' }'],
            ['req.body', 'corps JSON (si express.json)', '{ nom: \'Awa\' }'],
            ['req.headers', 'en-têtes', 'authorization, content-type…'],
            ['req.ip', 'IP du client', 'logs, rate limiting']
          ] },
          { t: 'h3', h: 'res : ce que tu lui réponds' },
          { t: 'ul', items: [
            '`res.status(201)` : code HTTP — puis CHAÎNAGE : .json(...), .send(...).',
            '`res.json(obj)` : LE standard des API — Content-Type JSON + sérialisation.',
            '`res.send(texteOuBuffer)` : polyvalent (HTML, texte, buffer).',
            '`res.sendFile(absolu)` : un fichier (chemin ABSOLU requis, Content-Type automatique).',
            '`res.redirect(\'/connexion\')` : redirection 302.',
            '`res.set(\'Cache-Control\', \'no-store\')` : en-tête personnalisé.'
          ] },
          { t: 'code', lang: 'js', label: 'Tout se chaîne élégamment', code:
'app.get(\'/api/commandes/:id\', async (req, res) => {\n  const commande = await db.trouverCommande(req.params.id);\n\n  if (!commande) {\n    return res.status(404).json({\n      erreur: \'commande introuvable\',\n      id: req.params.id\n    });\n  }\n\n  res\n    .status(200)\n    .set(\'Cache-Control\', \'private, max-age=30\')\n    .json(commande);\n});' },
          { t: 'h3', h: 'Le contrat implicite' },
          { t: 'p', h: 'Une requête = **une et une seule** réponse. Tant que ni send/json/end n\'a été appelé, la requête "pend" côté client (jusqu\'au timeout). Si tu ne réponds pas — callback de BD jamais retourné, middleware sans next() — le client attend dans le vide. Les fuites pendantes sont le premier suspect quand une API "rame" alors que le CPU est à 0 %.' },
          { t: 'callout', kind: 'tip', h: 'Les params et query sont TOUJOURS des chaînes : `/vendeuses/12` donne `req.params.id === \'12\'` (string !). Convertis explicitement : `Number(req.params.id)` avant de comparer à un id numérique de BD.' }
        ],
        errors: [
          { title: 'Lire req.body sans le middleware JSON', lang: 'js', bad:
'const app = express();\n\napp.post(\'/api/commandes\', (req, res) => {\n  console.log(req.body);   // undefined — et 20 minutes de débogage\n});',
            good:
'const app = express();\napp.use(express.json());   // AVANT les routes : il remplit req.body\n\napp.post(\'/api/commandes\', (req, res) => {\n  console.log(req.body);   // { produit: \'gari\', sacs: 3 }\n});',
            why: 'Par défaut, Express ne lit PAS le corps : c\'est un choix de performance (un upload binaire n\'a pas besoin d\'être parsé en JSON). express.json() est le middleware qui assemble les morceaux du stream et les parse — sans lui, req.body est undefined et tout .save() silencieux qui suit sera un mystère.' }
        ],
        related: ['nd-routing-methodes', 'nd-params-query-body', 'nd-mw-integres']
      }
    ]
  },

  /* ======================================================
     5. ROUTING
     ====================================================== */
  {
    id: 'routing',
    name: 'Routing Express',
    icon: 'alt_route',
    fiches: [
      {
        id: 'nd-routing-methodes',
        title: 'Routing : GET, POST, PUT, PATCH, DELETE',
        icon: 'route',
        level: 'Débutant',
        tagline: 'Les verbes HTTP sont un vocabulaire — parle-le correctement, ton API deviendra lisible à vue.',
        intro: 'Le routing associe un **chemin** et une **méthode HTTP** à une fonction. REST ajoute une convention simple et puissante : le chemin nomme une **ressource** (/api/vendeuses), le verbe dit l\'**action** (lire, créer, remplacer, supprimer). Une API REST se devine — on ne la lit pas.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Le CRUD complet, version sémantique', code:
'app.get(\'/api/vendeuses\', lister);          // lire la collection → 200\napp.get(\'/api/vendeuses/:id\', detail);      // lire UN élément → 200 ou 404\napp.post(\'/api/vendeuses\', creer);          // créer → 201 + l\'objet créé\napp.put(\'/api/vendeuses/:id\', remplacer);   // remplacer ENTIÈREMENT → 200\napp.patch(\'/api/vendeuses/:id\', modifier);  // modifier PARTIELLEMENT → 200\napp.delete(\'/api/vendeuses/:id\', retirer);  // supprimer → 204 No Content' },
          { t: 'h3', h: 'PUT vs PATCH : le débat qui a une réponse' },
          { t: 'table', head: ['', 'PUT', 'PATCH'], rows: [
            ['Sémantique', 'remplacement total', 'modification partielle'],
            ['Corps envoyé', 'la ressource complète', 'seulement les champs à changer'],
            ['Idempotent ?', 'oui (répéter = même état)', 'pas garanti'],
            ['Exemple', 'remettre toute la fiche d\'Awa', 'changer juste son téléphone']
          ] },
          { t: 'p', h: 'L\'**idempotence** est le test de la bonne sémantique : rejouer la même requête deux fois doit donner le même état. GET, PUT, DELETE sont idempotents ; POST ne l\'est PAS (deux POST = deux commandes créées). Voilà pourquoi un double-clic sur « Payer » doit être protégé (clé d\'idempotence côté serveur) et non juste caché par un bouton désactivé.' },
          { t: 'h3', h: 'Les statuts qui parlent' },
          { t: 'ul', items: [
            '**200** OK — lecture, modification réussie.',
            '**201** Created — POST qui crée (renvoie l\'objet, souvent avec son id).',
            '**204** No Content — DELETE réussi, rien à renvoyer.',
            '**400** — requête mal formée ; **401** non authentifié ; **403** authentifié mais interdit ; **404** introuvable ; **409** conflit (ex. email déjà pris).',
            '**500** — erreur interne : interceptée par ton middleware d\'erreurs, jamais une stack trace au client.'
          ] },
          { t: 'code', lang: 'js', label: 'app.all et les cas spéciaux', code:
'// Toutes les méthodes sur un chemin (utile pour un verrou temporaire) :\napp.all(\'/api/admin/*splat\', verifierAdmin);   // Express 5 : *splat, plus *\n\n// Alias historiques supprimés en v5 : app.del → app.delete\napp.delete(\'/api/sessions/:id\', deconnecter);' },
          { t: 'callout', kind: 'warn', h: 'Express 5 a durci la syntaxe des chemins (path-to-regexp v6) : le vieux `\'/user/:id?\'` ou le joker `*` seuls ne marchent plus. Paramètre optionnel : `/{:id}`. Joker : `/*splat`. Un tutoriel Express 4 peut littéralement refuser de démarrer sous la 5.' }
        ],
        errors: [
          { title: 'GET qui modifie des données', lang: 'js', bad:
'app.get(\'/api/commandes/:id/annuler\', annulerCommande);\n// Un simple clic sur un lien (mail, crawler, prefetch du\n// navigateur!) annule une commande sans que personne l\'ait voulu.',
            good:
'app.post(\'/api/commandes/:id/annulation\', annulerCommande);\n// ou : PATCH /api/commandes/:id  { statut: \'annulee\' }',
            why: 'GET est défini comme SÛR (safe) : il ne doit rien changer. Les navigateurs le pré-chargent, les bots le suivent, les proxys le mettent en cache. Un GET destructeur est un incident qui attend un mail de confirmation avec un lien dessus.' }
        ],
        related: ['nd-express-router', 'nd-params-query-body', 'nd-req-res']
      },

      {
        id: 'nd-params-query-body',
        title: 'params, query & body : les trois portes d\'entrée',
        icon: 'manage_search',
        level: 'Intermédiaire',
        tagline: ':id dans l\'URL, ?filtres dans la query, {données} dans le body — qui va où, et comment les valider.',
        intro: 'Trois canaux apportent les données du client : les **paramètres de route** (`req.params`), la **query string** (`req.query`) et le **corps** (`req.body`). Leur rôle respectif n\'est pas un détail de style : c\'est ce qui rend une URL partageable, les filtres bookmarkables et les créations fiables.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Les trois canaux dans UNE route', code:
'// GET /api/vendeuses/12/commandes?statut=payee&page=2\napp.get(\'/api/vendeuses/:id/commandes\', async (req, res) => {\n  const vendeuseId = Number(req.params.id);        // :id → identifies WHO\n  const { statut = \'toutes\', page = \'1\' } = req.query; // ?filtre → how to view\n  const donnees = await db.commandesDe(vendeuseId, {\n    statut,\n    page: Number(page),\n    parPage: 20\n  });\n  res.json(donnees);\n});' },
          { t: 'h3', h: 'La règle de répartition' },
          { t: 'table', head: ['Canal', 'Rôle', 'Exemple Dantokpa'], rows: [
            [':params', 'identifier LA ressource', '/api/vendeuses/12'],
            ['?query', 'filtrer, trier, paginer', '?quartier=akassato&tri=prix&page=2'],
            ['body', 'données à écrire', '{ nom: \'Awa\', stand: \'N12\' } en POST']
          ] },
          { t: 'h3', h: 'Deux pièges de types qui mordent tout le monde' },
          { t: 'ul', items: [
            '**Tout est string** : params et query n\'ont pas de types. `req.params.id === 1` est faux pour toujours — convertis (`Number(...)`) et vérifie `Number.isNaN`.',
            '**Express 5 a changé req.query** : le parseur est désormais dédié ("simple" par défaut) — les objets profonds (`?filtres[prix][min]=100`) exigent d\'opter pour le parseur "extended" (`app.set(\'query parser\', \'extended\')`)',
            'req.body dépend du Content-Type : JSON → express.json(), formulaire classique → express.urlencoded(), fichier → multer (fiche dédiée).'
          ] },
          { t: 'h3', h: 'Valider à la frontière, systématiquement' },
          { t: 'code', lang: 'js', label: 'Validation minimale qui arrête le pire', code:
'app.post(\'/api/vendeuses\', (req, res) => {\n  const { nom, stand, telephone } = req.body ?? {};\n\n  const soucis = [];\n  if (typeof nom !== \'string\' || nom.trim().length < 2) soucis.push(\'nom invalide\');\n  if (typeof stand !== \'string\') soucis.push(\'stand invalide\');\n  if (telephone !== undefined && !/^[0-9 +]{8,16}$/.test(telephone)) {\n    soucis.push(\'telephone invalide\');\n  }\n  if (soucis.length) {\n    return res.status(400).json({ erreur: \'validation\', details: soucis });\n  }\n  // … création…\n  res.status(201).json({ ok: true });\n});\n\n// À l\'échelle : zod/joi valident le schéma entier et retournent un 400 propre.' },
          { t: 'callout', kind: 'tip', h: 'Pour la pagination, borne toujours `parPage` (ex. max 100) : un client qui demande ?parPage=100000 peut sinon vider ta table d\'un coup et étrangler la base.' }
        ],
        errors: [
          { title: 'Injection de masse (mass assignment)', lang: 'js', bad:
'app.post(\'/api/vendeuses\', async (req, res) => {\n  const v = await db.creerVendeuse({ ...req.body });\n  // Le client envoie { nom, stand, role: \'admin\', solde: 999999 }\n  // → tout est inséré tel quel.\n});',
            good:
'const { nom, stand, telephone } = req.body ?? {};\nconst v = await db.creerVendeuse({ nom, stand, telephone });\n// Whitelist explicite : SEULS les champs attendus passent.',
            why: 'Spreader req.body dans la base, c\'est laisser le client choisir tes colonnes — y compris role, solde, isAdmin. Les schémas (zod, joi) existent aussi pour ça : seuls les champs déclarés survivent à la validation. La blacklist se contourne ; la whitelist tient.' }
        ],
        related: ['nd-routing-methodes', 'nd-req-res', 'lv-validation']
      },

      {
        id: 'nd-express-router',
        title: 'express.Router : découper l\'application',
        icon: 'alt_route',
        level: 'Intermédiaire',
        tagline: 'Quand server.js atteint 800 lignes, il est déjà trop tard — découpe avant.',
        intro: '**express.Router** est une mini-application enfichable : tu définis les routes d\'une ressource dans son propre fichier, puis tu les montes avec un préfixe (`app.use(\'/api/vendeuses\', vendeusesRouter)`). Résultat : vendeuses.js ne connaît que vendeuses, l\'ajout d\'une ressource n\'en touche aucune autre, et la revue de code redevient respirable.',
        blocks: [
          { t: 'code', lang: 'js', label: 'routes/vendeuses.js', code:
'import { Router } from \'express\';\nimport * as ctrl from \'../controleurs/vendeuses.js\';\n\nconst router = Router();\n\nrouter.get(\'/\', ctrl.lister);            // GET /api/vendeuses/\nrouter.get(\'/:id\', ctrl.detail);        // GET /api/vendeuses/12\nrouter.post(\'/\', ctrl.creer);           // POST /api/vendeuses/\nrouter.put(\'/:id\', ctrl.remplacer);\nrouter.delete(\'/:id\', ctrl.retirer);\n\nexport default router;' },
          { t: 'code', lang: 'js', label: 'server.js qui monte les sous-applications', code:
'import vendeusesRouter from \'./routes/vendeuses.js\';\nimport commandesRouter from \'./routes/commandes.js\';\nimport paiementsRouter from \'./routes/paiements.js\';\n\napp.use(\'/api/vendeuses\', vendeusesRouter);\napp.use(\'/api/commandes\', commandesRouter);\napp.use(\'/api/paiements\', paiementsRouter);\n\n// Le préfixe vit ICI, pas dans le routeur : une ressource, un endroit.' },
          { t: 'h3', h: 'Ce que Router apporte au-delà du ranger' },
          { t: 'ul', items: [
            '**Middlewares par ressource** : `router.use(verifierVendeuse)` ne s\'applique qu\'aux routes du routeur.',
            '**Versioning d\'API** : `app.use(\'/api/v1\', v1)` et `app.use(\'/api/v2\', v2)` cohabitent pendant la migration des clients.',
            '**Testabilité** : un routeur s\'importe dans les tests sans démarrer tout le serveur.',
            '**mergeParams** : `Router({ mergeParams: true })` pour les sous-ressources (`/vendeuses/:id/commandes` lit :id depuis le routeur parent).'
          ] },
          { t: 'h3', h: 'Une structure qui tient la route' },
          { t: 'code', lang: 'bash', label: 'arborescence type', code:
'api-dantokpa/\n├── server.js            # assemble tout\n├── app.js               # app express exportée (testable sans listen)\n├── routes/              # un fichier PAR RESSOURCE\n│   ├── vendeuses.js\n│   └── commandes.js\n├── controleurs/         # la logique métier des routes\n│   ├── vendeuses.js\n│   └── commandes.js\n├── middlewares/         # auth, validation, erreurs\n├── modeles/             # accès BD\n└── config/              # env, constantes' },
          { t: 'callout', kind: 'tip', h: 'Sépare app.js (qui assemble) de server.js (qui écoute) : les tests importent app et la bombardent de requêtes (supertest) SANS ouvrir de port — rapide et sans conflit de ports entre fichiers de test.' },
          { t: 'p', h: 'Comparaison utile : c\'est la même logique que les routes Blueprint de Flask ou les apiResource de Laravel — l\'idée universelle « une ressource = un module ». Quand tu connais l\'une, tu lis les autres.' }
        ],
        errors: [
          { title: 'Répéter le préfixe à deux endroits', lang: 'js', bad:
'// routes/vendeuses.js\nrouter.get(\'/api/vendeuses/:id\', detail);\n\n// server.js\napp.use(\'/api/vendeuses\', router);\n// → la vraie route devient /api/vendeuses/api/vendeuses/12 !',
            good:
'// routes/vendeuses.js : chemins RELATIFS au point de montage\nrouter.get(\'/:id\', detail);\n\n// server.js : le préfixe vit UNIQUEMENT ici\napp.use(\'/api/vendeuses\', router);',
            why: 'Les chemins du routeur sont résolus RELATIVEMENT à là où tu le montes. Préfixer dans les deux donne des routes doublées qui ne matchent que par accident — le 404 le plus agaçant de l\'histoire Express, car le code "semble" parfait.' }
        ],
        related: ['nd-middlewares', 'nd-routing-methodes', 'nd-gestion-erreurs']
      }
    ]
  },

  /* ======================================================
     6. MIDDLEWARES
     ====================================================== */
  {
    id: 'middlewares',
    name: 'Middlewares',
    icon: 'layers',
    fiches: [
      {
        id: 'nd-middlewares',
        title: 'Middlewares : le pipeline',
        icon: 'layers',
        level: 'Intermédiaire',
        tagline: 'Une chaîne de fonctions où chacune décide : je réponds, je modifie, ou je passe la main.',
        intro: 'Un **middleware** est une fonction `(req, res, next)` qu\'Express traverse AVANT ta route. Logging, authentification, parsing, compression : tout est middleware. Le concept qui change tout : la requête **descend le pipeline** dans l\'ordre exact de déclaration, et chaque étage choisit de continuer (`next()`), de répondre lui-même, ou de sauter au gestionnaire d\'erreurs (`next(err)`).',
        blocks: [
          { t: 'code', lang: 'js', label: 'Anatomie complète', code:
'// 1. Déclaration : (req, res, next) — next est LA clé\nfunction journal(req, res, next) {\n  const debut = Date.now();\n  res.on(\'finish\', () => {\n    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - debut}ms`);\n  });\n  next();                       // ← indispensable : sans lui, la requête PEND\n}\n\nfunction verifierCleApi(req, res, next) {\n  if (req.headers[\'x-cle-api\'] !== process.env.CLE_API) {\n    return res.status(401).json({ erreur: \'clé manquante ou invalide\' });\n    // Pas de next() : le pipeline s\'arrête ICI. La route n\'est jamais atteinte.\n  }\n  next();\n}\n\napp.use(journal);                              // global : TOUTES les requêtes\napp.get(\'/api/stock\', verifierCleApi, lireStock);   // local : cette route seulement' },
          { t: 'h3', h: 'L\'ordre EST la logique' },
          { t: 'p', h: 'Express exécute les middlewares dans **l\'ordre d\'écriture**. `express.json()` avant les routes (sinon body undefined), `helmet()` en premier (les en-têtes de sécurité valent pour toutes les réponses, y compris les erreurs), le gestionnaire 404 **après** toutes les routes, le gestionnaire d\'erreurs **en tout dernier**. Une inversion = un comportement presque correct, donc impitoyable à déboguer.' },
          { t: 'h3', h: 'Les trois sorties possibles d\'un middleware' },
          { t: 'table', head: ['Action', 'Effet', 'Cas'], rows: [
            ['next()', 'passe à l\'étage suivant', 'journal, auth OK'],
            ['res.xxx(...) sans next', 'répond et termine', '401 refusé, cache HIT'],
            ['next(err)', 'saute au gestionnaire d\'erreurs', 'exception attrapée']
          ] },
          { t: 'h3', h: 'res.locals : la boîte à outils du pipeline' },
          { t: 'p', h: 'Pour transporter une donnée d\'un middleware à la route (utilisateur authentifié, trace id), utilise **`res.locals`** — garanti par requête, sans polluer req. `res.locals.vendeuse = trouvee` dans l\'auth, `res.locals.vendeuse` lu dans la route.' },
          { t: 'callout', kind: 'tip', h: 'Un middleware peut modifier req/res AVANT de passer : c\'est ainsi qu\'express.json() ajoute req.body et que l\'auth ajoute res.locals.vendeuse. Le pipeline est une chaîne d\'enrichissement.' }
        ],
        errors: [
          { title: 'Oublier d\'appeler next()', lang: 'js', bad:
'app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  // oubli de next() → CHAQUE requête pend indéfiniment.\n  // Symptôme : "le serveur tourne mais ne répond jamais".',
            good:
'app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});\n// Règle : un middleware SE TERMINE toujours par next() ou par une réponse.',
            why: 'Sans next(), Express attend patiemment — le client aussi, jusqu\'à son timeout. En dev ça se voit ; en prod, c\'est le micro-fuite qui "consomme" des connexions jusqu\'à saturer le serveur. Un `if` sans else-next et hop, une branche qui oublie de passer la main.' },
          { title: 'Répondre puis continuer le pipeline', lang: 'js', bad:
'app.use((req, res, next) => {\n  if (!req.headers.authorization) {\n    res.status(401).json({ erreur: \'non authentifié\' });\n  }\n  next();                       // ← envoie AUSSI vers la route qui répond encore\n});',
            good:
'app.use((req, res, next) => {\n  if (!req.headers.authorization) {\n    return res.status(401).json({ erreur: \'non authentifié\' });  // return !\n  }\n  next();\n});',
            why: 'Après la réponse 401, le code continue : next() mène à la route qui répond une deuxième fois → "Cannot set headers after they are sent". Une réponse envoyée doit TOUJOURS être accompagnée d\'un return.' }
        ],
        related: ['nd-mw-integres', 'nd-gestion-erreurs', 'nd-jwt']
      },

      {
        id: 'nd-mw-integres',
        title: 'express.json(), urlencoded & static : les intégrés',
        icon: 'integration_instructions',
        level: 'Débutant',
        tagline: 'Trois middlewares fournis de série qui couvrent 80 % des besoins.',
        intro: 'Express embarque ses middlewares essentiels — plus besoin de body-parser depuis Express 4.16. **`express.json()`** parse les corps JSON, **`express.urlencoded()`** les formulaires classiques, **`express.static()`** sert les fichiers publics. Les installer au bon endroit, c\'est 80 % du confort.',
        blocks: [
          { t: 'code', lang: 'js', label: 'La configuration standard', code:
'import express from \'express\';\nimport path from \'node:path\';\n\nconst app = express();\n\n// Corps JSON (fetch/axios, API mobiles) — limite anti abus\napp.use(express.json({ limit: \'1mb\' }));\n\n// Corps de formulaire HTML classique (application/x-www-form-urlencoded)\napp.use(express.urlencoded({ extended: false }));\n\n// Fichiers publics : GET /styles/app.css sert public/styles/app.css\napp.use(express.static(path.join(__dirname, \'public\')));' },
          { t: 'h3', h: 'Ce que json() fait vraiment' },
          { t: 'ul', items: [
            'Assemble les morceaux du stream (ce qu\'on faisait à la main dans le http natif).',
            'Vérifie le Content-Type : il ne parse QUE `application/json`.',
            'Remplit req.body avec l\'objet parsé — ou laisse undefined s\'il n\'y a pas de corps.',
            'Rejette les corps mal formés avec un 400 (passé au gestionnaire d\'erreurs).',
            '`limit: \'1kb\'` ou `\'1mb\'` : bouclier contre les payloads géants qui tenteraient de saturer la mémoire.'
          ] },
          { t: 'h3', h: 'urlencoded pour les formulaires HTML' },
          { t: 'p', h: 'Quand un `<form method="POST">` classique envoie `nom=Awa&stand=N12`, `express.urlencoded()` remplit `req.body`. L\'option `extended: false` restreint aux types simples (chaînes/tableaux) — suffisant pour 99 % des formulaires, et plus sûr.' },
          { t: 'h3', h: 'static : le mini-serveur de fichiers' },
          { t: 'ul', items: [
            'Sert tout le dossier : CSS, JS, images, index.html à la racine.',
            'Gère le Content-Type, le cache et les requêtes Range tout seul.',
            'Protégé contre le path traversal (`../../.env` est refusé nativement).',
            'Réflexe prod : pour des fichiers à gros trafic, un CDN ou Nginx devant reste supérieur — static est parfait pour l\'admin ou les petits sites.'
          ] },
          { t: 'callout', kind: 'warn', h: 'json() et urlencoded() ne lisent PAS le multipart/form-data — c\'est le format des uploads de fichiers. Pour ça : multer (fiche dédiée). Chercher pourquoi req.body est vide sur un input file est un grand classique.' },
          { t: 'code', lang: 'js', label: 'Ordre correct dans une app réaliste', code:
'app.use(helmet());                                  // 1. sécurité\napp.use(morgan(\'combined\'));                       // 2. logs\napp.use(express.json({ limit: \'1mb\' }));           // 3. parsing\napp.use(express.static(path.join(__dirname, \'public\')));  // 4. fichiers\napp.use(\'/api\', apiRouter);                        // 5. routes métier\napp.use((req, res) => res.status(404).json({ erreur: \'introuvable\' }));  // 6. 404\napp.use(gestionnaireErreurs);                      // 7. erreurs : TOUJOURS dernier' }
        ],
        errors: [
          { title: 'Monter express.static() au mauvais étage', lang: 'js', bad:
'app.use(\'/api\', apiRouter);\napp.use(express.static(\'public\'));\n// Souci : /api/* exhauste le routeur AVANT de chercher un fichier ;\n// surtout, ton SPA index.html n\'est jamais servi sur les routes inconnues.',
            good:
'app.use(express.static(\'public\'));\napp.use(\'/api\', apiRouter);\n// Option SPA : après l\'API, renvoyer index.html sur les GET inconnus\n// (hors /api) pour laisser le routeur front gérer.',
            why: 'L\'ordre des app.use définit qui voit la requête en premier. static en premier laisse les fichiers être servis sans ballotter un 404 d\'API ; l\'API ensuite garde ses routes prioritaires ; la route attrape-tout du SPA vient en dernier, juste avant le 404.' }
        ],
        related: ['nd-middlewares', 'nd-upload-multer', 'nd-mw-tiers']
      },

      {
        id: 'nd-mw-tiers',
        title: 'cors, helmet, morgan & compression : les tiers indispensables',
        icon: 'extension',
        level: 'Intermédiaire',
        tagline: 'Quatre paquets installés par réflexe sur toute API sérieuse — encore faut-il savoir pourquoi.',
        intro: 'L\'écosystème Express vit de ses middlewares tiers. Quatre reviennent dans quasiment toute API de production : **cors** (qui a le droit d\'appeler l\'API depuis un navigateur), **helmet** (en-têtes de sécurité), **morgan** (journalisation HTTP) et **compression** (gzip des réponses). Les installer sans les comprendre, c\'est baisser le prix de son stand sans savoir à qui.',
        blocks: [
          { t: 'h3', h: 'cors : ouvrir, mais pas à tout vent' },
          { t: 'p', h: 'Par défaut, un navigateur bloque `fetch(\'https://api.dantokpa.bj\')` depuis `https://dantokpa.bj` (origine différente) : c\'est la Same-Origin Policy. **cors()** ajoute les en-têtes qui autorisent explicitement. Crucial : CORS ne protège rien côté serveur — c\'est un réglage du NAVIGATEUR. curl et les applications mobiles s\'en fichent.' },
          { t: 'code', lang: 'js', label: 'Configuration qui tient la prod', code:
'import cors from \'cors\';\n\napp.use(cors({\n  origin: [\'https://dantokpa.bj\', \'https://admin.dantokpa.bj\'],\n  methods: [\'GET\', \'POST\', \'PUT\', \'PATCH\', \'DELETE\'],\n  credentials: true          // autorise les cookies en cross-origin\n}));\n\n// Tout sauf :  app.use(cors())  // origin: * — confort de dev, trou de prod' },
          { t: 'h3', h: 'helmet : 15 en-têtes en une ligne' },
          { t: 'p', h: 'Helmet configure d\'un coup : X-Content-Type-Options, X-Frame-Options (clickjacking), Strict-Transport-Security, Referrer-Policy, CSP… `app.use(helmet())`, tout simplement. C\'est la ligne la plus rentable de toute ta base de code.' },
          { t: 'h3', h: 'morgan : savoir ce qui se passe' },
          { t: 'p', h: '`morgan(\'dev\')` colore et compacte pour le développement ; `morgan(\'combined\')` produit le format Apache (adopté par les agrégateurs de logs) en production. Un log par requête : méthode, chemin, statut, durée — l\'œil permanent sur l\'API.' },
          { t: 'h3', h: 'compression : gzip gratuit' },
          { t: 'p', h: '`app.use(compression())` gzippe automatiquement les réponses textuelles au-delà d\'un seuil. Une liste de 200 vendeuses passe de 45 Ko à 6 Ko — précieuse pour une cliente de Dantokpa sur un réseau 3G capricieux. Note : si Nginx ou un CDN gère déjà la compression en amont, ne double-paie pas.' },
          { t: 'table', head: ['Middleware', 'Rôle', 'Piège'], rows: [
            ['cors', 'autoriser des origines front', 'cors() nu = * en prod'],
            ['helmet', 'en-têtes sécurité', 'CSP à affiner pour les apps riches'],
            ['morgan', 'logs HTTP', 'format dev bavard en prod'],
            ['compression', 'gzip réponses', 'double compression avec le proxy']
          ] }
        ],
        errors: [
          { title: 'cors({ origin: true, credentials: true }) en production', lang: 'js', bad:
'app.use(cors({ origin: true, credentials: true }));\n// "true" écho TOUTE origine ; credentials autorise les cookies.\n// = n\'importe quel site peut lire les réponses de TES utilisateurs\n//   connectés. C\'est le confort de dev qui passe en prod un vendredi.',
            good:
'const AUTORISEES = [\'https://dantokpa.bj\'];\napp.use(cors({\n  origin: (origine, cb) => cb(null, !origine || AUTORISEES.includes(origine)),\n  credentials: true\n}));',
            why: 'Avec credentials, le navigateur envoie les cookies du site ciblé : si l\'origine est "tout le monde", n\'importe quel site malveillant peut appeler ton API AVEC la session de ta cliente. CORS se gère par liste blanche, jamais par écho.' }
        ],
        related: ['nd-middlewares', 'nd-jwt', 'php-xss']
      }
    ]
  },

  /* ======================================================
     7. GESTION DES ERREURS
     ====================================================== */
  {
    id: 'gestion-erreurs',
    name: 'Gestion des erreurs',
    icon: 'crisis_alert',
    fiches: [
      {
        id: 'nd-gestion-erreurs',
        title: 'Gestion des erreurs & async : le filet de sécurité',
        icon: 'crisis_alert',
        level: 'Intermédiaire',
        tagline: 'Le middleware à 4 arguments, la nuance Express 4/5 sur l\'async, et le 500 qui ne trahit rien.',
        intro: 'Quand une exception s\'échappe d\'une route, Express l\'envoie au **middleware d\'erreurs** : la seule fonction de la chaîne qui prend **4 arguments** `(err, req, res, next)`. C\'est ton dernier rempart : journaliser côté serveur, répondre sobrement côté client. Et depuis Express 5, les promesses rejetées y arrivent toutes seules — fin du cauchemar des asyncHandlers.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Le schéma canonique', code:
'// 1. Erreur métier typée\nclass ErreurApi extends Error {\n  constructor(statut, message) { super(message); this.statut = statut; }\n}\n\n// 2. Une route qui échoue proprement\napp.get(\'/api/commandes/:id\', async (req, res) => {\n  const cmd = await db.trouver(Number(req.params.id));\n  if (!cmd) throw new ErreurApi(404, \'commande introuvable\');\n  res.json(cmd);\n});\n\n// 3. 404 pour tout ce que les routes n\'ont pas pris\napp.use((req, res) => res.status(404).json({ erreur: \'route inconnue\' }));\n\n// 4. Le middleware d\'erreurs : QUATRE arguments, TOUJOURS EN DERNIER\n// eslint-disable-next-line no-unused-vars\napp.use((err, req, res, next) => {\n  console.error(err);                        // log COMPLET ici, côté serveur\n  const statut = err.statut || 500;\n  res.status(statut).json({\n    erreur: statut === 500 ? \'erreur interne\' : err.message\n    // jamais err.stack au client : il contient tes chemins et ta logique\n  });\n});' },
          { t: 'h3', h: 'Async : la différence Express 4 vs 5 qui tue' },
          { t: 'table', head: ['', 'Express 4 (ancien)', 'Express 5'], rows: [
            ['throw synchrone', 'capturé automatiquement', 'capturé automatiquement'],
            ['promesse rejetée dans une route async', '**PASSÉE SOUS SILENCE** : requête pendante', 'transmise au middleware d\'erreurs'],
            ['solution de l\'époque', 'wrapper asyncHandler / next(err) manuel', 'rien à faire : c\'est natif']
          ] },
          { t: 'p', h: 'C\'est LE changement majeur d\'Express 5 : `app.get(\'/\', async (req, res) => { throw new Error(\'panne BD\') })` arrive désormais au 4-arguments tout seul. Sous Express 4, la requête restait suspendue jusqu\'au timeout — LA cause numéro un des "API qui gèlent parfois". Si tu maintiens du v4 : wrapper `const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)`.' },
          { t: 'code', lang: 'js', label: 'Avec try/catch quand tu veux transformer l\'erreur', code:
'app.post(\'/api/paiements\', async (req, res, next) => {\n  try {\n    const tx = await moMo.charger(req.body);\n    res.status(201).json(tx);\n  } catch (err) {\n    if (err.code === \'SOLDE_INSUFFISANT\') {\n      return res.status(402).json({ erreur: \'solde Mobile Money insuffisant\' });\n    }\n    next(err);                    // sinon : au middleware central\n  }\n});' },
          { t: 'h3', h: 'Le cap du process : ce que le middleware ne voit pas' },
          { t: 'ul', items: [
            'Le middleware couvre les erreurs **dans le pipeline**. Les exceptions hors pipeline (handler d\'événement, timer) sont du ressort de `process.on(\'uncaughtException\')`.',
            'Réflexe production : logger `unhandledRejection` et `uncaughtException`, puis **redémarrer proprement** (PM2 le fait pour toi) — un process qui a levé une exception inattendue est dans un état douteux.',
            'En Node ≥ 15, une promesse rejetée non gérée **termine le process** par défaut : c\'est une protection, pas un caprice.'
          ] },
          { t: 'callout', kind: 'warn', h: 'Un 500 ne raconte rien au client : "erreur interne" suffit. Tout le détail (stack, requête, utilisateur) va dans TES logs, structurés si possible (JSON), jamais dans la réponse HTTP.' }
        ],
        errors: [
          { title: 'Middleware d\'erreurs avec la mauvaise signature', lang: 'js', bad:
'app.use((err, req, res) => {             // 3 arguments\n  res.status(500).json({ erreur: err.message });\n});\n// Express ne le reconnaît PAS comme gestionnaire d\'erreurs :\n// il n\'est jamais appelé en cas d\'erreur, et PIRE il devient un\n// middleware ordinaire qui interrompt TOUTES les requêtes.',
            good:
'// eslint-disable-next-line no-unused-vars\napp.use((err, req, res, next) => {       // 4 arguments : la signature EST la déclaration\n  console.error(err);\n  res.status(err.statut || 500).json({ erreur: \'erreur interne\' });\n});',
            why: 'Express distingue les middlewares par leur ARITÉ : 4 arguments = gestionnaire d\'erreurs. Le 4e paramètre (next) est obligatoire même inutilisé — c\'est la convention absolue. Trois arguments et tu as écrit un middleware normal qui reçoit chaque requête et casse tout le site.' },
          { title: 'Attraper pour ne rien dire', lang: 'js', bad:
'try {\n  await db.enregistrer(commande);\n} catch (err) {\n  // "on verra plus tard"\n}\nres.status(201).json(commande);          // mensonge au client',
            good:
'try {\n  await db.enregistrer(commande);\n} catch (err) {\n  return next(err);      // log + 500 honnête\n}\nres.status(201).json(commande);',
            why: 'Un catch vide transforme une panne en succès imaginaire : le client croit la commande enregistrée, la base non. Soit tu gères vraiment (statut adapté), soit tu transmets — jamais le silence.' }
        ],
        related: ['nd-middlewares', 'nd-express-router', 'lv-erreurs']
      }
    ]
  }
);

/* ======================================================
   8. AUTHENTIFICATION & SÉCURITÉ
   ====================================================== */
DEVDOCS.node.categories.push(
  {
    id: 'securite',
    name: 'Auth & sécurité',
    icon: 'shield',
    fiches: [
      {
        id: 'nd-sessions-vs-jwt',
        title: 'Sessions vs JWT : deux philosophies',
        icon: 'compare',
        level: 'Intermédiaire',
        tagline: 'Garder l\'état côté serveur, ou le signer et le confier au client ?',
        intro: 'HTTP n\'a pas de mémoire : chaque requête arrive amnésique. Deux stratégies pour savoir QUI parle : les **sessions** (le serveur garde un dossier par client, le cookie n\'en porte que la clé) et les **JWT** (le serveur SIGNE les infos et les confie au client, qui les représente à chaque requête). Ni meilleure ni pire : des compromis différents.',
        blocks: [
          { t: 'h3', h: 'Sessions : l\'état au chaud côté serveur' },
          { t: 'p', h: 'Au login, le serveur stocke `{ userId: 12, role: \'vendeuse\' }` quelque part (mémoire, Redis, BD) et installe un cookie `sid=abc123` (HttpOnly, Secure, SameSite). À chaque requête, il lit la clé et retrouve le dossier. Déconnexion = suppression du dossier : **révocation instantanée**. Analogie Dantokpa : le casier du marché — ton ticket ne vaut rien seul, tout dépend de ce que le gardien y trouve.' },
          { t: 'h3', h: 'JWT : l\'état signé, pas stocké' },
          { t: 'p', h: 'Le serveur signe un jeton contenant les infos (`{ sub: 12, role: \'vendeuse\', exp: … }`) et le remet au client, qui le renvoie dans l\'en-tête `Authorization: Bearer …`. Le serveur ne stocke RIEN : il vérifie la signature, lit, sert. Le casier est remplacé par un **badge plastifié infalsifiable** — mais si on te le vole, il reste valide jusqu\'à son expiration.' },
          { t: 'table', head: ['Critère', 'Sessions', 'JWT'], rows: [
            ['État côté serveur', 'oui (store à maintenir)', 'aucun (stateless)'],
            ['Révocation', 'immédiate (on efface)', 'difficile (attendre l\'expiration, ou blacklist)'],
            ['Mise à l\'échelle', 'store partagé obligatoire (Redis)', 'n\'importe quel serveur vérifie'],
            ['Clients concernés', 'navigateurs (cookies)', 'mobiles, SPA, API, services'],
            ['Fuite du jeton', 'cookie HttpOnly : protégé du JS', 'selon le stockage (voir fiche JWT)']
          ] },
          { t: 'code', lang: 'js', label: 'Le squelette session (express-session)', code:
'import session from \'express-session\';\n\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: {\n    httpOnly: true,      // invisible pour JS → anti-XSS\n    secure: true,        // HTTPS seulement\n    sameSite: \'lax\',    // frein CSRF\n    maxAge: 1000 * 60 * 60 * 8\n  }\n}));\n\napp.post(\'/login\', async (req, res) => {\n  const user = await verifierIdentifiants(req.body);\n  if (!user) return res.sendStatus(401);\n  req.session.userId = user.id;      // stocké côté serveur, cookie = juste la clé\n  res.json({ ok: true });\n});' },
          { t: 'callout', kind: 'info', h: 'En pratique, beaucoup d\'API modernes combinent : JWT d\'accès court (15 min) côté mobile/SPA + refresh token en cookie HttpOnly pour en redemander. Le meilleur des deux, au prix de la complexité.' },
          { t: 'p', h: 'Règle de décision : dashboard web classique (une seule origine, besoin de déconnecter vite) → **sessions**. API pour app mobile + SPA + micro-services → **JWT** (fiche suivante). Les deux exigent la même rigueur de transport : HTTPS partout.' }
        ],
        errors: [
          { title: 'Choisir JWT « parce que c\'est moderne »', lang: 'js', bad:
'// Besoin réel : un back-office web, 3 admin, déconnexion immédiate exigée.\n// Choix : JWT stateless partout… puis une blacklist maison pour les\n// révocations = on a RÉINVENTÉ la session, en fragile et sans le savoir.',
            good:
'// Le bon outil pour CE besoin :\n// sessions (express-session + store Redis quand ça grandit).\n// JWT se justifie quand le stateless est un vrai besoin\n// (mobile, services tiers), pas une mode.',
            why: 'Le stateless déplace le problème : impossible d\'invalider un jeton volé avant son expiration sans tenir une liste de révocation — c\'est-à-dire un état serveur, ce qu\'on voulait éviter. Choisir son mécanisme d\'auth, c\'est choisir ses compromis en connaissance de cause.' }
        ],
        related: ['nd-jwt', 'nd-bcrypt', 'php-sessions']
      },

      {
        id: 'nd-jwt',
        title: 'JWT : signer, vérifier, protéger ses routes',
        icon: 'token',
        level: 'Avancé',
        tagline: 'Trois parties, une signature — et un middleware qui fait le videur.',
        intro: 'Un **JSON Web Token** est un document signé : `en-tête.payload.signature`, trois segments Base64URL. Le payload n\'est **pas chiffré** — lisible par quiconque — mais la signature le rend **infalsifiable** sans la clé du serveur. Toute la sécurité tient à trois choses : une clé forte, une expiration courte, une vérification stricte.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Émission au login', code:
'import jwt from \'jsonwebtoken\';\n\nconst CLE = process.env.JWT_SECRET;          // 32+ octets aléatoires, dans .env\n\napp.post(\'/api/auth/connexion\', async (req, res) => {\n  const user = await verifierIdentifiants(req.body);\n  if (!user) return res.sendStatus(401);\n\n  const jeton = jwt.sign(\n    { sub: user.id, role: user.role },        // PAS de données sensibles ici\n    CLE,\n    { expiresIn: \'15m\', algorithm: \'HS256\' } // courte : un vol = 15 minutes\n  );\n  res.json({ jeton });\n});' },
          { t: 'code', lang: 'js', label: 'Le middleware videur', code:
'function exigerAuth(req, res, next) {\n  const entete = req.headers.authorization || \'\';\n  const jeton = entete.startsWith(\'Bearer \') ? entete.slice(7) : null;\n  if (!jeton) return res.sendStatus(401);            // pas de jeton : dehors\n\n  try {\n    const payload = jwt.verify(jeton, CLE, { algorithms: [\'HS256\'] });\n    res.locals.userId = payload.sub;                  // la boîte à outils du pipeline\n    res.locals.role = payload.role;\n    next();\n  } catch {\n    return res.sendStatus(401);                       // expiré, falsifié : dehors\n  }\n}\n\nconst exigerAdmin = (req, res, next) =>\n  res.locals.role === \'admin\' ? next() : res.sendStatus(403);\n\napp.get(\'/api/admin/rapports\', exigerAuth, exigerAdmin, rapports);' },
          { t: 'h3', h: '401, 403 : la nuance que tes API doivent respecter' },
          { t: 'ul', items: [
            '**401 Unauthorized** : on ne sait pas qui tu es (pas de jeton, jeton mort). Le client peut tenter de s\'authentifier.',
            '**403 Forbidden** : on sait qui tu es, mais tu n\'as pas le droit — ré-authentifier ne changera rien.',
            '404 au lieu de 403 peut masquer l\'existence d\'une ressource (occultation) : choix délibéré, à documenter.'
          ] },
          { t: 'h3', h: 'Où ranger le jeton côté client ?' },
          { t: 'table', head: ['Stockage', 'Risque', 'Verdict'], rows: [
            ['localStorage', 'lisible par TOUT JS injecté (XSS)', 'à éviter pour des jetons sensibles'],
            ['cookie HttpOnly + SameSite', 'à l\'abri du JS ; attention CSRF (SameSite aide)', 'préférable pour les web apps'],
            ['mémoire (variable SPA)', 'meilleur : disparait au refresh', 'combiné à un refresh en cookie']
          ] },
          { t: 'callout', kind: 'warn', h: 'jwt.decode() ne vérifie RIEN : il lit, c\'est tout. Toute décision de sécurité passe par jwt.verify() avec la clé ET la liste d\'algorithmes autorisés.' },
          { t: 'p', h: 'Pour aller plus loin : refresh tokens rotatifs, clés asymétriques RS256 quand d\'autres services doivent vérifier sans connaître le secret, et révocation par versioning (un champ tokenVersion en BD, incrémenté à la déconnexion globale).' }
        ],
        errors: [
          { title: 'Jeton sans expiration (ou 30 jours)', lang: 'js', bad:
'jwt.sign({ sub: user.id }, CLE);        // jamais d\'expiration\n// ou { expiresIn: \'30d\' } — un vol = un mois d\'accès tranquille.',
            good:
'jwt.sign({ sub: user.id }, CLE, { expiresIn: \'15m\' });\n// + refresh token côté client pour renouveler sans re-login.\n// Un jeton volé qui meurt vite est un problème borné.',
            why: 'L\'absence d\'expiration transforme la moindre fuite (log, extension de navigateur, XSS) en accès permanent. Un jeton court + un mécanisme de renouvellement, c\'est une surface d\'attaque réduite de plusieurs ordres de grandeur.' },
          { title: 'Cacher des secrets dans le payload', lang: 'js', bad:
'jwt.sign({ sub: user.id, motDePasseHash: user.hash, pin: user.pin }, CLE);\n// Le payload est du Base64 : tout le monde peut le LIRE.',
            good:
'jwt.sign({ sub: user.id, role: user.role }, CLE, { expiresIn: \'15m\' });\n// Minimum syndical : identifiant + rôle. Le reste reste en BD.',
            why: 'Signer protège l\'intégrité, pas la confidentialité. Quiconque intercepte le jeton lit son contenu en clair — payload = carte d\'identité lisible, jamais un coffre.' }
        ],
        related: ['nd-sessions-vs-jwt', 'nd-bcrypt', 'nd-middlewares']
      },

      {
        id: 'nd-bcrypt',
        title: 'bcrypt : hacher les mots de passe',
        icon: 'password',
        level: 'Intermédiaire',
        tagline: 'Lent à dessein, salé d\'office — la seule façon acceptable de stocker un mot de passe.',
        intro: 'Un mot de passe ne se **chiffre** pas (réversible = réversible par l\'attaquant aussi) : il se **hache** avec une fonction conçue pour être coûteuse. **bcrypt** est le standard : sel automatique et intégré au hash, facteur de coût ajustable, vérification à temps constant. Si ta base fuit, bcrypt te donne des années de protection là où SHA-256 en donne des heures.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Inscription et connexion', code:
'import bcrypt from \'bcrypt\';\n\n// ── Inscription : on hache UNE fois, on stocke le hash\napp.post(\'/api/auth/inscription\', async (req, res) => {\n  const { telephone, motDePasse } = req.body;\n  const hash = await bcrypt.hash(motDePasse, 12);   // ← ASYNC (cf. blocage)\n  await db.creerUtilisateur({ telephone, hash });\n  res.sendStatus(201);\n});\n\n// ── Connexion : on compare, jamais on dé-chiffre\napp.post(\'/api/auth/connexion\', async (req, res) => {\n  const user = await db.parTelephone(req.body.telephone);\n  const ok = user && await bcrypt.compare(req.body.motDePasse, user.hash);\n  if (!ok) return res.status(401).json({ erreur: \'identifiants invalides\' });\n  // … session ou JWT…\n});' },
          { t: 'h3', h: 'Le facteur de coût : volontairement lent' },
          { t: 'p', h: '`bcrypt.hash(mdp, 12)` = 2¹² itérations ≈ 200-300 ms par hash sur un serveur moderne. Pour UN utilisateur qui se connecte : imperceptible. Pour un attaquant qui teste 10 milliards de mots de passe : rédhibitoire. Chaque +1 double le temps — monte le coût tant que ton login reste confortable (objectif : ~250 ms).' },
          { t: 'h3', h: 'Ce que bcrypt fait pour toi (et qu\'il faut savoir)' },
          { t: 'ul', items: [
            '**Sel intégré** : deux utilisateurs avec "gari2026" auront des hash DIFFÉRENTS. Zéro gestion de ta part.',
            '**Hash autodocumenté** : `$2b$12$…` contient version, coût et sel — compare() retrouve tout seul.',
            '**60 caractères** : ta colonne doit faire au minimum 60 — prévois grand (72+).',
            '**Truncature à 72 octets** : les mots de passe plus longs sont coupés (documente ou pré-hache si ça te chiffonne).',
            '**compare() à temps constant** : la comparaison ne fuit pas d\'information par sa durée — un `===` sur les hash, si.'
          ] },
          { t: 'callout', kind: 'warn', h: 'bcrypt.hashSync / compareSync existent et sont tentants… et bloquent l\'Event Loop 250 ms PAR APPEL. En route de login qui monte en charge, c\'est un déni de service auto-infligé (voir la fiche Blocage). Async, toujours.' },
          { t: 'p', h: 'Alternatives modernes : Argon2id (recommandée par l\'OWASP, plus exigeante en mémoire). bcrypt reste parfaitement défendable en 2026 — l\'important est A) une fonction dédiée mots de passe, B) du coût, C) async.' }
        ],
        errors: [
          { title: 'SHA-256 « ça hache déjà, non ? »', lang: 'js', bad:
'import crypto from \'node:crypto\';\nconst hash = crypto.createHash(\'sha256\').update(motDePasse).digest(\'hex\');\n// Rapide = catastrophique : 10 milliards d\'essais/seconde sur GPU,\n// rainbow tables publiques, aucun sel.',
            good:
'const hash = await bcrypt.hash(motDePasse, 12);\n// Lent + salé + coût réglable : exactement ce qu\'exige l\'OWASP.',
            why: 'Les fonctions de hachage généralistes sont conçues pour être RAPIDES (intégrité de fichiers) — la qualité inverse de ce qu\'on veut pour des mots de passe. bcrypt, scrypt, Argon2 : leur lenteur calculée EST la protection.' },
          { title: 'Logger le mot de passe « pour déboguer »', lang: 'js', bad:
'app.post(\'/api/auth/connexion\', (req, res, next) => {\n  console.log(\'tentative\', req.body);       // mots de passe dans les logs !\n  next();\n});',
            good:
'console.log(\'tentative pour\', req.body.telephone);\n// Le mot de passe n\'apparaît JAMAIS : ni logs, ni erreurs, ni réponses.\n// Masque aussi req.body dans les erreurs de validation (zod le fait).',
            why: 'Les logs finissent archivés, sauvegardés undécrits, consultés par des outils tiers : un mot de passe en clair dedans vaut faille d\'authentification définitive. La règle est absolue : ce secret n\'existe que pendant le hash et le compare.' }
        ],
        related: ['nd-jwt', 'php-mots-de-passe', 'nd-blocage-event-loop']
      }
    ]
  },

  /* ======================================================
     9. FICHIERS & VARIABLES D'ENVIRONNEMENT
     ====================================================== */
  {
    id: 'fichiers-env',
    name: 'Uploads & environnement',
    icon: 'upload_file',
    fiches: [
      {
        id: 'nd-upload-multer',
        title: 'Upload de fichiers avec multer',
        icon: 'upload_file',
        level: 'Intermédiaire',
        tagline: 'multipart/form-data : le format que express.json() ne lit pas.',
        intro: 'Uploader, c\'est recevoir du binaire dans une requête : photo de stand, reçu, facture PDF. Le format HTTP s\'appelle **multipart/form-data** — et ni json() ni urlencoded() ne le parlent. **multer** est le middleware historique qui assemble les morceaux, les range et remplit `req.file` / `req.files`.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Configuration de production raisonnable', code:
'import multer from \'multer\';\nimport path from \'node:path\';\nimport crypto from \'node:crypto\';\n\nconst stockage = multer.diskStorage({\n  destination: path.join(__dirname, \'uploads\'),\n  filename: (req, fichier, cb) => {\n    // Nom généré — JAMAIS le nom du client (collisions + attaques)\n    const ext = path.extname(fichier.originalname).toLowerCase();\n    cb(null, crypto.randomUUID() + ext);\n  }\n});\n\nconst upload = multer({\n  storage: stockage,\n  limits: { fileSize: 3 * 1024 * 1024 },        // 3 Mo max : borne tout\n  fileFilter: (req, fichier, cb) => {\n    const ok = [\'image/jpeg\', \'image/png\', \'application/pdf\'].includes(fichier.mimetype);\n    cb(ok ? null : new Error(\'type de fichier refusé\'), ok);\n  }\n});' },
          { t: 'code', lang: 'js', label: 'La route qui reçoit la photo du stand', code:
'app.post(\'/api/stands/:id/photo\', upload.single(\'photo\'), async (req, res) => {\n  if (!req.file) return res.status(400).json({ erreur: \'fichier manquant\' });\n\n  await db.mettreAJourStand(req.params.id, { photo: req.file.filename });\n  res.status(201).json({ fichier: req.file.filename, taille: req.file.size });\n});\n\n// Plusieurs fichiers : upload.array(\'photos\', 5) → req.files\n// Champs nommés : upload.fields([{ name: \'photo\' }, { name: \'recu\' }])\n// Côté client : FormData — form.append(\'photo\', input.files[0])' },
          { t: 'h3', h: 'La checklist sécurité des uploads' },
          { t: 'ul', items: [
            '**Nom de fichier généré** par le serveur (randomUUID), extension en minuscules et whitelistée.',
            '**Taille bornée** (limits) : un upload sans limite = disque saturé, service à plat.',
            '**Type déclaré ≠ type réel** : mimetype vient du CLIENT ; pour les images critiques, re-vérifie la signature (sharp, file-type).',
            '**Servir hors webroot** ou via une route dédiée avec headers sûrs — un dossier uploads/ servi statiquement peut exécuter des surprises.',
            '**En cloud** : disque local éphémère → stocke en objet (S3) et garde l\'URL en BD.'
          ] },
          { t: 'callout', kind: 'tip', h: 'multer stocke AU FUR ET À MESURE sur disque (stream) : la mémoire ne gonfle pas avec le fichier. Son alternative memoryStorage() met tout en RAM — à réserver aux petits fichiers immédiatement retraités (redimensionnement) puis jetés.' }
        ],
        errors: [
          { title: 'Faire confiance au nom et au type du client', lang: 'js', bad:
'const upload = multer({ dest: \'uploads/\' });\n// + accepter originalname tel quel :\n//   photo.png ../../server.js facture.php.jpg\n// + aucune limite de taille, aucun filtre de type.',
            good:
'const upload = multer({\n  storage: stockageAvecNomsGeneres,\n  limits: { fileSize: 3 * 1024 * 1024, files: 5 },\n  fileFilter: whitelistMime\n});',
            why: 'Le nom original peut contenir des séparateurs (path traversal vers un écrasement), le mimetype peut mentir (un script déguisé en image). Un endpoint d\'upload sans bornes ni filtres est une porte d\'entrée royale — la sécurité se décide dans la CONFIGURATION de multer, pas après.' },
          { title: 'Chercher req.body sur un formulaire avec fichier', lang: 'js', bad:
'app.use(express.json());\napp.post(\'/api/stands\', (req, res) => {\n  const { nom } = req.body;      // undefined : multipart n\'est pas du JSON\n  // … et req.file n\'existe pas : multer n\'a jamais été monté.\n});',
            good:
'app.post(\'/api/stands\', upload.single(\'photo\'), (req, res) => {\n  const { nom } = req.body;      // ✓ multer remplit body (champs texte)\n  const photo = req.file;        // ✓ et le fichier\n});',
            why: 'multipart/form-data mélange champs texte et binaire dans un format spécial : express.json() l\'ignore délibérément. multer parse le tout — champs dans req.body, fichiers dans req.file(s). Oublier l\'un des deux est le débug de rentrée de tous les devs Node.' }
        ],
        related: ['nd-mw-integres', 'nd-path-os', 'nd-fs']
      },

      {
        id: 'nd-variables-env',
        title: 'Variables d\'environnement & dotenv',
        icon: 'settings_suggest',
        level: 'Débutant',
        tagline: 'La config vit dans l\'environnement, jamais dans le code.',
        intro: 'Secret JWT, URI de base de données, PORT d\'écoute : tout ce qui change entre ta machine, le CI et la prod est de la **configuration par environnement** — le facteur III des 12-factor apps. Le canal standard : `process.env`, alimenté en dev par un fichier `.env` qu\'on ne committe JAMAIS.',
        blocks: [
          { t: 'code', lang: 'js', label: 'Le module config.js qui centralise tout', code:
'// Node ≥ 20 : charge le .env SANS dépendance dès le lancement :\n//   node --env-file=.env server.js     (ou le paquet dotenv en vieux legacy)\n\nfunction demander(cle, defaut) {\n  const valeur = process.env[cle] ?? defaut;\n  if (valeur === undefined) {\n    throw new Error(`Variable d\'environnement manquante : ${cle}`);\n  }\n  return valeur;\n}\n\nexport const config = {\n  port: Number(demander(\'PORT\', \'3000\')),     // tout est STRING : convertir !\n  env: demander(\'NODE_ENV\', \'development\'),\n  jwtSecret: demander(\'JWT_SECRET\'),           // pas de défaut : crash au boot\n  bd: { url: demander(\'DATABASE_URL\') },\n  estProd: process.env.NODE_ENV === \'production\'\n};' },
          { t: 'code', lang: 'bash', label: '.env (gitignoré) et .env.example (committé)', code:
'# .env — ne jamais committer (gitignore !)\nPORT=3000\nNODE_ENV=development\nJWT_SECRET=9f2c…64 octets aléatoires…b1\nDATABASE_URL=postgres://user:pass@localhost:5432/dantokpa\n\n# .env.example — la doc vivante, committée SANS les valeurs\nPORT=\nNODE_ENV=\nJWT_SECRET=\nDATABASE_URL=\n\n# .gitignore\nnode_modules\n.env' },
          { t: 'h3', h: 'Les règles qui évitent les âneries' },
          { t: 'ul', items: [
            '**Un module config unique** : le code lit config.port, jamais process.env dispersé — tu sais où tout arrive et tu valides au démarrage.',
            '**Tout est string** : PORT=\'3000\', DEBUG=\'false\'… Number() et les comparaisons strictes (\'false\' est truthy !).',
            '**Crash tôt** : un secret manquant doit faire échouer le BOOT, pas la première requête de minuit.',
            '**En prod, pas de .env** : les plateformes (Railway, Render, Heroku…) injectent les variables dans le tableau de bord — dotenv est un outil de DEV.',
            '**NODE_ENV=production en prod** : Express y active caches et stack-traces muettes ; c\'est gratuit, ne l\'oublie pas.'
          ] },
          { t: 'callout', kind: 'warn', h: 'Ton `.env` a déjà été commité par erreur ? Supprimer le fichier ne suffit PAS : il reste dans l\'HISTORIQUE git. Les secrets sont compromis → rotation obligatoire (nouveau JWT_SECRET, nouveaux mots de passe BD), puis nettoyage d\'historique (BFG, filter-repo).' }
        ],
        errors: [
          { title: 'Secrets en dur dans le code', lang: 'js', bad:
'const CLE = \'monsecret-jwt-2026\';\nconst bd = \'postgres://admin:gari123@prod.example.com/dantokpa\';\n// Commit poussé, repo partagé, secrets grillés à vie.',
            good:
'const CLE = config.jwtSecret;         // vient de l\'environnement\nconst bd = config.bd.url;\n// Le code ne contient AUCUN secret : il peut être open-source sans risque.',
            why: 'Un secret dans le code est un secret publié : chaque clone, chaque fork, chaque capture d\'écran en réunion l\'emporte. La règle 12-factor est absolue pour une raison simple : le code voyage, la config doit rester.' },
          { title: 'if (process.env.DEBUG) avec DEBUG=false', lang: 'js', bad:
'if (process.env.DEBUG) activerDebug();\n// DEBUG=false est la chaîne \'false\' → TRUTHY → debug actif en prod !',
            good:
'if (config.debug === true) activerDebug();\n// dans config.js :\n// debug: process.env.DEBUG === \'true\'\n// Comparaison strictement à \'true\' — le seul test sûr pour un booléen env.',
            why: 'process.env ne contient QUE des chaînes : \'false\', \'0\', \'\' — les deux premières sont truthy et font basculer des features en prod. Convertis honnêtement dans le module config (=== \'true\'), et ton code n\'a plus jamais à deviner.' }
        ],
        related: ['nd-deploiement', 'nd-pm2-production', 'nd-jwt']
      }
    ]
  },

  /* ======================================================
     10. BASE DE DONNÉES
     ====================================================== */
  {
    id: 'base-de-donnees',
    name: 'Base de données',
    icon: 'database',
    fiches: [
      {
        id: 'nd-bd-async',
        title: 'Connexion & requêtes asynchrones',
        icon: 'database',
        level: 'Intermédiaire',
        tagline: 'Un pool qui attend, des paramètres qui protègent, et la grâce de await.',
        intro: 'Parler à une base de données, c\'est de l\'I/O — le terrain de jeu naturel de Node. La boîte à outils minimale : un **pool** de connexions réutilisées (ouvrir une connexion coûte cher), des **requêtes paramétrées** (la seule réponse à l\'injection SQL) et `await` dans les routes Express 5 (les erreurs BD remontent seules au gestionnaire central).',
        blocks: [
          { t: 'code', lang: 'js', label: 'db.js — le pool au centre (PostgreSQL)', code:
'import pg from \'pg\';\nconst { Pool } = pg;\n\nexport const pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 10,                    // jusqu\'à 10 clients simultanés\n  idleTimeoutMillis: 30_000\n});\n\n// Une requête = le pool prête un client, exécute, rend.\n// JAMAIS "new Client()" par requête : la latence s\'envole et la BD sature.\nexport const query = (texte, params) => pool.query(texte, params);' },
          { t: 'code', lang: 'js', label: 'Des routes qui respirent — et protègent', code:
'app.get(\'/api/vendeuses\', async (req, res) => {\n  const { quartier, limite = \'20\' } = req.query;\n  const max = Math.min(Number(limite) || 20, 100);   // borne la pagination\n\n  const { rows } = await query(\n    \'SELECT id, nom, stand, quartier FROM vendeuses\n     WHERE ($1::text IS NULL OR quartier = $1)\n     ORDER BY nom LIMIT $2\',\n    [quartier ?? null, max]      // ← paramètres : la BD sépare code et données\n  );\n  res.json(rows);\n});\n\napp.post(\'/api/vendeuses\', async (req, res) => {\n  const { nom, stand, quartier } = req.body;\n  const { rows } = await query(\n    \'INSERT INTO vendeuses (nom, stand, quartier) VALUES ($1, $2, $3) RETURNING *\',\n    [nom, stand, quartier]\n  );\n  res.status(201).json(rows[0]);\n});' },
          { t: 'h3', h: 'Transactions : quand deux écritures n\'en font qu\'une' },
          { t: 'code', lang: 'js', label: 'Commande + décrément de stock : tout ou rien', code:
'const client = await pool.connect();     // une DÉDIÉE pour toute la transaction\ntry {\n  await client.query(\'BEGIN\');\n  const { rows: [cmd] } = await client.query(\n    \'INSERT INTO commandes (vendeuse_id, total) VALUES ($1, $2) RETURNING *\',\n    [vendeuseId, total]);\n  await client.query(\n    \'UPDATE stock SET sacs = sacs - $1 WHERE produit = $2 AND sacs >= $1\',\n    [nbSacs, \'gari\']);\n  await client.query(\'COMMIT\');\n  res.status(201).json(cmd);\n} catch (err) {\n  await client.query(\'ROLLBACK\');\n  throw err;                              // → middleware d\'erreurs (Express 5)\n} finally {\n  client.release();                       // TOUJOURS rendre le client au pool\n}' },
          { t: 'h3', h: 'Les pièges rendus simples' },
          { t: 'ul', items: [
            '**Injection SQL** : seule défense fiable = requêtes paramétrées ($1, $2). La concaténation, même "filtrée", est une porte.',
            '**N+1** : boucler sur des rows pour requêter chacun = 1 + N requêtes. JOIN ou IN = une seule.',
            '**SELECT *** : tu ne sais pas ce qui revient (dont les colonnes sensibles) et ça grossit avec le temps.',
            '**Timeouts** : configure query_timeout / statement_timeout — une requête folle ne doit pas pendre 10 minutes.'
          ] },
          { t: 'callout', kind: 'tip', h: 'mysql2 fonctionne pareil (placeholders `?` au lieu de `$1`). Les concepts — pool, paramètres, transactions, release — sont identiques ; la fiche PHP sur PDO raconte la même histoire côté LAMP.' }
        ],
        errors: [
          { title: 'Concaténer les valeurs dans le SQL', lang: 'js', bad:
'const { rows } = await query(\n  `SELECT * FROM vendeuses WHERE quartier = \'${req.query.quartier}\'`\n);\n// ?quartier=\' OR 1=1 -- → toute la table\n// ?quartier=\'; DROP TABLE vendeuses; -- → catastrophe',
            good:
'const { rows } = await query(\n  \'SELECT * FROM vendeuses WHERE quartier = $1\',\n  [req.query.quartier]\n);\n// La valeur voyage SÉPARÉE du code : impossible à exécuter comme SQL.',
            why: 'La requête paramétrée envoie le SQL d\'un côté et les données de l\'autre : la base ne fusionne jamais les deux. C\'est LA contre-mesure de l\'injection SQL — pas un filtre, pas une regex : un protocole différent.' },
          { title: 'Oublier LIMIT / paginer côté mémoire', lang: 'js', bad:
'const { rows } = await query(\'SELECT * FROM commandes\');\nres.json(rows.slice(0, 20));\n// On transfère 200 000 lignes pour en garder 20…\n// latence, mémoire, et un client qui attend.',
            good:
'const { rows } = await query(\n  \'SELECT * FROM commandes ORDER BY creee_le DESC LIMIT $1 OFFSET $2\',\n  [parPage, (page - 1) * parPage]\n);',
            why: 'La base est faite pour filtrer et borner ; la ramener entière chez Node pour trancher est du gaspillage au cube — ça marchait avec 50 lignes de test, ça écroule la prod à 200 000. Paginer du côté BD, toujours.' }
        ],
        related: ['nd-orm', 'php-requetes-preparees', 'nd-gestion-erreurs']
      },

      {
        id: 'nd-orm',
        title: 'ORM/ODM : Prisma & Mongoose',
        icon: 'schema',
        level: 'Avancé',
        tagline: 'Des modèles typés au lieu de SQL à la main — ce que ça achète, ce que ça coûte.',
        intro: 'Un **ORM** (SQL) ou **ODM** (MongoDB) mappe tes tables à des objets : tu écris `prisma.vendeuse.findMany()` au lieu de `SELECT * FROM vendeuses`. **Prisma** domine l\'écosystème SQL Node (client typé généré, migrations déclaratives) ; **Mongoose** est l\'ODM historique de MongoDB (schémas, middlewares, population).',
        blocks: [
          { t: 'code', lang: 'js', label: 'Prisma : le schéma IS la source de vérité', code:
'// prisma/schema.prisma\nmodel Vendeuse {\n  id        Int      @id @default(autoincrement())\n  nom       String\n  stand     String\n  quartier  String\n  commandes Commande[]\n}\n\n// Terminal :  npx prisma migrate dev   → génère le SQL + le client typé\n\n// Dans le code : un client importé UNE fois, réutilisé partout\nimport { PrismaClient } from \'@prisma/client\';\nconst prisma = new PrismaClient();\n\nconst vendeuses = await prisma.vendeuse.findMany({\n  where: { quartier: \'akassato\' },\n  select: { id: true, nom: true, stand: true },   // pas de SELECT *\n  orderBy: { nom: \'asc\' },\n  take: 20\n});' },
          { t: 'code', lang: 'js', label: 'Mongoose : le schéma côté code', code:
'import mongoose from \'mongoose\';\n\nconst vendeuseSchema = new mongoose.Schema({\n  nom: { type: String, required: true, minlength: 2 },\n  stand: String,\n  quartier: { type: String, index: true }\n}, { timestamps: true });\n\nconst Vendeuse = mongoose.model(\'Vendeuse\', vendeuseSchema);\n\n// Validation à l\'écriture, requêtes chaînables :\nconst v = await Vendeuse.find({ quartier: \'akassato\' })\n  .select(\'nom stand\').limit(20).lean();   // .lean() = objets simples, plus rapides' },
          { t: 'table', head: ['', 'SQL brut (pg)', 'Prisma / Mongoose'], rows: [
            ['Sécurité des types', 'aucune (strings partout)', 'client typé, schéma'],
            ['Migrations', 'à gérer soi-même', 'déclaratives (prisma migrate)'],
            ['Requêtes complexes', 'SQL total, zéro traduction', 'sortie possible (raw) mais friction'],
            ['Requêtes simples CRUD', 'verbeux', 'une ligne lisible'],
            ['Apprentissage', 'SQL (transférable !)', 'SQL + l\'outil']
          ] },
          { t: 'h3', h: 'Choisir sans dogme' },
          { t: 'ul', items: [
            '**Démarre SQL brut** si tu apprends : comprendre la base avant de la cacher.',
            '**Prisma** dès que le schéma grandit et que l\'équipe veut du filet (types, migrations propres).',
            '**Mongoose** si MongoDB est imposé — sinon Postgres reste le choix par défaut raisonnable.',
            'Dans tous les cas : sais lire le SQL généré (`prisma.$queryRaw`, logs) — l\'ORM n\'efface pas la BD, il l\'habille.'
          ] },
          { t: 'callout', kind: 'warn', h: 'Piège N+1 version ORM : `for (const v of vendeuses) await prisma.commande.findMany({ where: { vendeuseId: v.id } })`. Prisma : `include` / `select` imbriqués ; Mongoose : `.populate()`. Même maladie, remèdes différents.' }
        ],
        errors: [
          { title: 'Renvoyer le modèle complet au client', lang: 'js', bad:
'app.get(\'/api/vendeuses/:id\', async (req, res) => {\n  const v = await prisma.vendeuse.findUnique({ where: { id: Number(req.params.id) } });\n  res.json(v);\n  // hash, telephone, solde & champs internes partent chez le client !\n});',
            good:
'const v = await prisma.vendeuse.findUnique({\n  where: { id },\n  select: { id: true, nom: true, stand: true, quartier: true }\n});\nres.json(v);',
            why: 'findUnique/findMany sans select remonte TOUTES les colonnes — y compris celles ajoutées dans trois mois par un collègue (hash, notes internes). La fuite du futur champ sensible est un grand classique des audits de sécurité. Sélectionne explicitement ce que le client doit voir.' }
        ],
        related: ['nd-bd-async', 'lv-eloquent', 'lv-api-resources']
      }
    ]
  },

  /* ======================================================
     11. DÉPLOIEMENT & PRODUCTION
     ====================================================== */
  {
    id: 'deploiement',
    name: 'Déploiement & production',
    icon: 'rocket_launch',
    fiches: [
      {
        id: 'nd-pm2-production',
        title: 'PM2 & mode production',
        icon: 'restart_alt',
        level: 'Avancé',
        tagline: 'Un crash à 3 h du matin ne doit réveiller personne.',
        intro: 'En prod, `node server.js` tout nu est un pari : au premier crash non attrapé, le site est mort jusqu\'à ton réveil. **PM2** est le gestionnaire de process Node de référence : redémarrage automatique, **mode cluster** (un process par cœur CPU), logs centralisés, reload sans coupure. NODE_ENV=production complète le tableau.',
        blocks: [
          { t: 'code', lang: 'bash', label: 'PM2 en cinq commandes', code:
'npm install -g pm2\npm2 start server.js -i max --name api-dantokpa   # 1 process PAR CŒUR (cluster)\npm2 logs api-dantokpa                                  # logs temps réel\npm2 monit                                              # CPU, mémoire, latence loop\npm2 reload api-dantokpa                                # rechargement SANS coupure\npm2 startup && pm2 save                                # redémarrage auto au boot du serveur' },
          { t: 'code', lang: 'js', label: 'ecosystem.config.js — la version propre', code:
'export default {\n  apps: [{\n    name: \'api-dantokpa\',\n    script: \'server.js\',\n    instances: \'max\',               // os.cpus().length process\n    exec_mode: \'cluster\',\n    max_memory_restart: \'500M\',     // fuite mémoire ? restart propre à 500 Mo\n    env_production: {\n      NODE_ENV: \'production\',\n      PORT: 3000\n    }\n  }]\n};\n// pm2 start ecosystem.config.js --env production' },
          { t: 'h3', h: 'Le mode cluster : multiplier le thread unique' },
          { t: 'p', h: 'Un process Node = un thread JS = un cœur. Le **cluster** lance N process (un par cœur) et répartit les connexions entre eux : ton serveur 8 cœurs sert ~8 fois plus, SANS changer une ligne de code. Contrainte logique : tout état en mémoire (sessions, compteurs) doit sortir vers un store partagé (Redis, BD) — les process ne se parlent pas.' },
          { t: 'h3', h: 'NODE_ENV=production : le petit interrupteur' },
          { t: 'ul', items: [
            'Express cache les templates de vues et les fichiers compilés.',
            'Les stack traces ne sont plus renvoyées aux clients.',
            'Certaines dépendances (react côté SSR, loggers) réduisent leur verbosité.',
            'Spirituellement : développement = bavard et lent, production = discret et rapide. PM2 peut l\'injecter (env_production).'
          ] },
          { t: 'callout', kind: 'tip', h: 'Alternative moderne : en conteneur/orchestré (Docker, Kubernetes), le redémarrage est du ressort de la plateforme — PM2 s\'efface, le Dockerfile fait `CMD ["node", "server.js"]` en un seul process par conteneur, répliqué par l\'orchestrateur. Les deux modèles coexistent : connais les deux.' },
          { t: 'p', h: 'Surveillance minimale viable : `pm2 monit` en local, et en sérieux une sonde externe sur `/sante` + alerte si la latence de l\'Event Loop dérive (fiche Blocage). Une API qui rame lentement est plus dure à voir qu\'une API morte.' }
        ],
        errors: [
          { title: 'node server.js en production, sans gardien', lang: 'bash', bad:
'ssh prod-serveur\nnode server.js &     # détaché à l\'arrache, déconnexion ssh → mort\n# premier uncaughtException → 404 pour tout le monde jusqu\'au matin',
            good:
'pm2 start ecosystem.config.js --env production\npm2 save && pm2 startup\n# crash → redémarrage en secondes ; reboot du serveur → tout remonte seul.',
            why: 'Un process sans superviseur est un service à l\'abandon : les exceptions inattendues arrivent TOUJOURS en prod (jamais en démo). Le gestionnaire n\'est pas du luxe — c\'est la différence entre « incident de 30 secondes » et « interruption de 6 heures ».' },
          { title: 'watch: true en production', lang: 'js', bad:
'{ name: \'api\', script: \'server.js\', watch: true }\n// Chaque fichier écrit (uploads, logs!) redémarre l\'app en pleine prod.',
            good:
'// watch uniquement en dev (nodemon). En prod :\n// reload manuel (pm2 reload) après déploiement — contrôlé, journalisé.',
            why: 'watch redémarre le process à CHAQUE modification de fichier survieillée : en prod, un simple upload ou une rotation de logs peut faire redémarrer l\'API en rafale et couper toutes les connexions en vol. Dev ≠ prod, y compris pour les automatismes confortables.' }
        ],
        related: ['nd-deploiement', 'nd-blocage-event-loop', 'nd-variables-env']
      },

      {
        id: 'nd-deploiement',
        title: 'Déployer : proxy, HTTPS & arrêt propre',
        icon: 'rocket_launch',
        level: 'Avancé',
        tagline: 'La checklist qui sépare « ça tourne sur ma machine » de « c\'est en ligne ».',
        intro: 'Mettre une API en prod, c\'est quatre chantiers : l\'**environnement** (variables injectées, port écouté), le **revers proxy** (Nginx ou plateforme qui gère TLS et route vers ton process), les **finitions** (compression, rate limiting, logs) et la **grâce** (shutdown propre, healthcheck). Une fois écrite, la checklist se rejoue à chaque projet.',
        blocks: [
          { t: 'h3', h: 'Le port et l\'écoute' },
          { t: 'code', lang: 'js', label: 'Écouter comme une plateforme l\'attend', code:
'const PORT = Number(process.env.PORT || 3000);\nconst HOST = \'0.0.0.0\';          // ← indispensable en conteneur : accepter de l\'extérieur\n\nconst serveur = app.listen(PORT, HOST, () => {\n  console.log(`API prête sur :${PORT} (${config.env})`);\n});\n\n// /sante : la sonde que la plateforme pinguera pour savoir si tu vis\napp.get(\'/sante\', (req, res) => res.json({ ok: true, uptime: process.uptime() }));' },
          { t: 'h3', h: 'L\'arrêt propre (graceful shutdown)' },
          { t: 'code', lang: 'js', label: 'Mourir comme un professionnel', code:
'function arreter(signal) {\n  console.log(`${signal} reçu : fermeture…`);\n  serveur.close(async () => {          // 1. plus de nouvelles connexions\n    await pool.end();                  // 2. fermer les pools BD proprement\n    process.exit(0);                   // 3. sortir quand tout est consommé\n  });\n  setTimeout(() => process.exit(1), 10_000).unref();   // garde-fou 10 s\n}\nprocess.on(\'SIGTERM\', () => arreter(\'SIGTERM\'));   // Kubernetes, PM2, hébergeurs\nprocess.on(\'SIGINT\', () => arreter(\'SIGINT\'));     // Ctrl+C' },
          { t: 'h3', h: 'Nginx devant Node : le partage des rôles' },
          { t: 'ul', items: [
            '**TLS/HTTPS** : le certificat vit côté Nginx (Let\'s Encrypt), Node reste en HTTP interne.',
            '**Statique** : Nginx sert les fichiers publics bien plus vite que express.static.',
            '**Rate limiting** : Nginx peut plafonner par IP avant même que Node ne travaille (ou express-rate-limit en applicatif).',
            '**Proxy** : `location /api { proxy_pass http://127.0.0.1:3000; }` — et `app.set(\'trust proxy\', 1)` côté Express pour un req.ip correct.',
            'En PaaS (Railway, Render) : tout ça est fait pour toi — ne configure que PORT, healthcheck et variables.'
          ] },
          { t: 'h3', h: 'La checklist de mise en ligne' },
          { t: 'ol', items: [
            'Variables d\'environnement injectées (jamais de .env en prod), NODE_ENV=production.',
            'Secrets régénérés pour la prod (pas ceux du dev).',
            'PM2 ou plateforme : redémarrage automatique + logs centralisés.',
            'HTTPS obligatoire (redirect 80 → 443), HSTS via helmet.',
            'Compression activée (ou gérée par le proxy/CDN).',
            'Healthcheck /sante qui teste aussi la BD.',
            'Graceful shutdown sur SIGTERM testé une fois pour de vrai.',
            'Sondes externes + alertes (latence, erreurs 5xx, disque).'
          ] },
          { t: 'callout', kind: 'warn', h: 'Le jour J du déploiement d\'Awa & co : prévois un plan de retour en arrière (build précédent taggé, pm2 deploy ou image gardée). Un rollback à 22 h, c\'est 30 secondes si préparé — et une soirée sinon.' }
        ],
        errors: [
          { title: 'Couper les connexions en vol au redéploiement', lang: 'js', bad:
'process.on(\'SIGTERM\', () => process.exit(0));\n// Les 150 requêtes en cours (dont le paiement MoMo d\'Awa) meurent net.',
            good:
'process.on(\'SIGTERM\', () => {\n  serveur.close(async () => { await pool.end(); process.exit(0); });\n});   // on sert ceux qui sont là, on refuse les nouveaux, on part.',
            why: 'process.exit immédiat détruit les sockets ouvertes : téléchargements tronqués, paiements interrompus en pleine écriture BD. Le graceful shutdown est une question de politesse envers les requêtes en vol — et d\'exactitude comptable.' },
          { title: 'Faire confiance aveuglément aux en-têtes du proxy', lang: 'js', bad:
'// Express lit X-Forwarded-For pour req.ip MAIS sans trust proxy\n// réglé, rate-limit et logs enregistrent… l\'IP d\'Nginx (127.0.0.1).',
            good:
'app.set(\'trust proxy\', 1);   // 1 niveau = Nginx devant ; req.ip = vraie IP\n// Sans ça, ton rate limiter limite… tout le monde d\'un coup (même IP).',
            why: 'Derrière un reverse proxy, la connexion directe vient du proxy : sans trust proxy, req.ip vaut 127.0.0.1 pour TOUT le monde — rate limiting global accidentel, logs sans valeur, géolocalisation impossible. Un réglage, trois bugs.' }
        ],
        related: ['nd-pm2-production', 'nd-variables-env', 'nd-gestion-erreurs']
      }
    ]
  }
);
