/* ============================================================
   exo-node.js — Exercices pratiques
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.node = {
  module: 'node',
  list: [
    {
          "id": "exo-nd-serveur-natif",
          "level": "fonda",
          "title": "Un serveur HTTP sans Express",
          "icon": "dns",
          "free": true,
          "minutes": 25,
          "kind": "checklist",
          "setup": "Installe Node 18+ (`node --version`). Crée un dossier `nd-natif` et un fichier `serveur.js`. Lance `node serveur.js` puis ouvre http://localhost:3000.",
          "context": "Le cybercafé d'Akpakpa veut une page d'accueil locale pour ses machines : horaires, tarifs, état des postes. Avant d'installer Express et toute sa mécanique, touchons le moteur à mains nues : le module http de Node. Comprendre ce qu'Express cache rend tout le reste limpide.",
          "statement": "Tu vas écrire un petit serveur HTTP avec le module natif, trois routes et du JSON.\n\n1. Crée le serveur : `const http = require('http')` puis `http.createServer((req, res) => { … }).listen(3000)`. Logue « Serveur sur http://localhost:3000 » au démarrage.\n2. Route `GET /` : réponds du HTML complet (doctype, titre « Cybercafé Akpakpa », menu de liens vers les autres routes), `Content-Type: text/html; charset=utf-8` — pense aux accents, d'où le charset explicite.\n3. Route `GET /tarifs` : réponds du JSON — un tableau d'objets { poste, prix_heure } (console 500 F, bureautique 300 F, impression 100 F la page) — avec `Content-Type: application/json` et `JSON.stringify`.\n4. Toute autre URL : **404 honnête** — statusCode 404 + petite page ou JSON d'erreur.\n5. Bonus pédagogique : écris le routage d'abord avec une cascade `if (req.url === '/')` … puis refactore proprement en `switch (req.url)` (les deux versions en commentaire l'une de l'autre, pour sentir la différence).\n6. Observe : `req.method` et `req.url` suffisent à tout router ; regarde-les dans la console à chaque requête (`console.log(req.method, req.url)`).\n\nCe qui est évalué : la boucle requête/réponse nue, les en-têtes écrits à la main, et la compréhension que chaque framework ajoute une couche au-dessus de CES lignes-là. Celui qui a écrit ce serveur ne regardera plus jamais Express comme de la magie.",
          "constraints": [
                "Uniquement les modules natifs (http) : aucune dépendance externe, pas de package.json installé.",
                "Chaque réponse déclare son Content-Type correct (text/html; charset=utf-8 ou application/json).",
                "Le JSON est produit par JSON.stringify depuis des objets JS, jamais concaténé à la main.",
                "Le 404 change le statusCode AVANT res.end() et retourne un message clair.",
                "Le serveur écoute sur un port constant (3000) avec un log au démarrage."
          ],
          "checklist": [
                "node serveur.js démarre et logue l'adresse.",
                "http://localhost:3000 affiche la page d'accueil avec les accents corrects.",
                "http://localhost:3000/tarifs retourne un JSON valide (Content-Type visible dans l'onglet Réseau).",
                "http://localhost:3000/nimportequoi retourne bien un statut 404 (vérifié dans curl -i ou l'onglet Réseau).",
                "La console du serveur affiche method + url de chaque requête à mesure qu'elles arrivent.",
                "Ctrl+C arrête le serveur proprement ; relancer fonctionne immédiatement (pas de port bloqué oublié).",
                "J'ai les deux versions du routage (if et switch) et je sais dire pourquoi le switch se lit mieux à 10 routes.",
                "res.writeHead est utilisé UNE fois par réponse (status + headers ensemble), jamais deux res.end() par branche."
          ],
          "hints": [
                "Le squelette : `const server = http.createServer((req, res) => { if (req.url === '/') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); res.end('<h1>…</h1>'); } … }); server.listen(3000, () => console.log('Serveur sur http://localhost:3000'));`",
                "La route JSON : `res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(tarifs));` — le client recevra du vrai JSON, pas du texte déguisé.",
                "Le 404 en dernier, dans le `default:` du switch : `res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ erreur: 'Route inconnue' }));` — règle d'hygiène : un handler = une seule façon de répondre, et toujours res.end() en dernier."
          ],
          "solution": {
                "lang": "js",
                "label": "serveur.js — solution commentée",
                "code": "// serveur.js — le même moteur que sous Express, à mains nues.\nconst http = require('http');\n\nconst TARIFS = [\n  { poste: 'Console / jeux', prix_heure: 500 },\n  { poste: 'Bureautique', prix_heure: 300 },\n  { poste: 'Impression', prix_heure: 100 },   // la page\n];\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { 'Content-Type': type + '; charset=utf-8' });\n  res.end(corps);            // TOUJOURS terminer : la réponse doit se fermer\n}\n\nconst server = http.createServer((req, res) => {\n  console.log(req.method, req.url);          // respiration du serveur : chaque hit\n\n  switch (req.url) {\n    case '/':\n      return envoyer(res, 200, 'text/html',\n        '<h1>Cybercafé Akpakpa</h1>' +\n        '<p>Ouvert 8h – 22h. <a href=\"/tarifs\">Tarifs</a></p>');\n    case '/tarifs':\n      return envoyer(res, 200, 'application/json', JSON.stringify(TARIFS));\n    default:\n      return envoyer(res, 404, 'application/json',\n        JSON.stringify({ erreur: 'Route inconnue : ' + req.url }));\n  }\n});\n\nserver.listen(3000, () => {\n  console.log('Serveur sur http://localhost:3000');\n});\n",
                "explain": "Trois vérités à emporter de ce serveur nu. Un : une réponse HTTP est un couple en-têtes/corps, et writeHead scelle les en-têtes — tout ce qui doit être dit sur le statut et le type s'y joue, avant qu'une seule donnée ne sorte. Deux : res.end() est la poignée de porte : tant qu'il n'est pas appelé, le navigateur attend, et un deuxième end() après le premier est une erreur — la fonction envoyer centralise ce contrat pour que chaque branche y pense. Trois : le switch sur req.url EST un routeur — Express ne fait qu'envelopper ce réflexe dans des app.get() avec middlewares et paramètres d'URL. Quand un stagiaire dit « Express est compliqué », c'est presque toujours parce qu'il n'a jamais vu ces vingt lignes."
          },
          "criteria": [
                "Serveur natif fonctionnel : HTML, JSON et 404 aux bons statuts et Content-Type.",
                "Code lisible : helper de réponse, routage en switch, log des requêtes.",
                "Compréhension affirmée du lien Express = sucre au-dessus de http.createServer."
          ],
          "variants": [
                "Ajoute `GET /etat` retournant du JSON dynamique (nombre de postes libres qui change à chaque requête via un compteur).",
                "Sers également un `GET /style.css` avec le Content-Type text/css et un lien depuis l'accueil.",
                "Défi : lis le port depuis `process.env.PORT || 3000` et logue-le tel quel au démarrage."
          ],
          "related": [
                "nd-http-natif",
                "nd-single-thread",
                "nd-cjs-vs-esm",
                "nd-event-loop"
          ]
    },
    {
          "id": "exo-nd-express-base",
          "level": "fonda",
          "title": "Express : la même chose, en civilisé",
          "icon": "rocket_launch",
          "minutes": 30,
          "kind": "checklist",
          "setup": "Dossier `nd-express` : `npm init -y` puis `npm install express`. Fichier `serveur.js`. Lance `node serveur.js` (ou `npm start` avec le script).",
          "context": "Ton serveur natif marche, mais 15 routes en switch, c'est illisible — et chacun réécrit le parse JSON, le statique, les 404. Express est LE standard qui factorise tout ça. Même cybercafé, même besoins : tu vas réécrire propre, avec middlewares et JSON automatique.",
          "statement": "Tu vas porter le cybercafé sur Express, avec les pipelines bien rangés.\n\n1. `const express = require('express'); const app = express();` puis `app.use(express.json())` en premier middleware — comprends que chaque requête traverse les `app.use` dans l'ordre avant d'atteindre les routes.\n2. Un middleware maison de log en tête : affiche `[GET] /tarifs — 172µs` (Date.now() avant/après `next()`). C'est ton premier middleware écrit à la main : il doit appeler next() sinon tout reste figé.\n3. Reprends les routes : `app.get('/')` (HTML d'accueil), `app.get('/tarifs')` (res.json directement — Express met le Content-Type pour toi), et ajoute `app.get('/tarifs/:poste')` — paramètre d'URL lu via `req.params.poste`, recherche insensible à la casse, 404 JSON si inconnu.\n4. Sers un dossier `public/` avec `express.static` : déposes-y un `style.css` et lie-le dans l'accueil. Compare avec l'exercice précédent : combien de lignes as-tu sauvées ?\n5. Intercepteur 404 à la FIN (pas de route matchée → 404 JSON), et un **middleware d'erreur** à 4 paramètres `(err, req, res, next)` qui répond 500 JSON : fais exprès de `throw` dans une route pour le voir attraper l'erreur proprement.\n6. Ajoute le start script dans package.json (`\"start\": \"node serveur.js\"`) et constate que `npm start` suffit.\n\nCe qui est évalué : la chaîne de middlewares dans l'ordre (log → json → routes → 404 → erreurs), res.json et le raccourci des params, et la différence entre « fin de monde normal » (404) et « ça a explosé » (500).",
          "constraints": [
                "Middlewares dans l'ordre : log maison, express.json(), static, routes, gestionnaire 404, gestionnaire d'erreurs — cet ordre est commenté dans le code.",
                "Toute lecture de req.body suppose express.json() monté AVANT la route.",
                "res.json() pour le JSON, jamais de JSON.stringify manuel + writeHead.",
                "Le 404 et le 500 sont deux pièces distinctes, placées après les routes.",
                "npm start lance le serveur via le script du package.json."
          ],
          "checklist": [
                "npm start démarre ; la console affiche un log formaté par requête avec son temps de réponse.",
                "/tarifs et /tarifs/console répondent du JSON correct ; /tarifs/inconnu → 404 JSON.",
                "Le style.css de public/ se charge dans la page d'accueil (vu dans l'onglet Réseau).",
                "Une route volontairement cassée (throw) produit un 500 JSON propre, pas un crash du process.",
                "Retirer express.json() puis poster montre que req.body devient undefined : je l'ai constaté puis remis en place.",
                "Les console.log de mes middlewares prouvent l'ordre de passage (log avant les routes).",
                "Postman/curl : POST invalide JSON → Express répond 400 (de lui-même) — je sais pourquoi.",
                "Le temps mesuré par le middleware de log est plausible (quelques ms)."
          ],
          "hints": [
                "Le middleware maison : `app.use((req, res, next) => { const t0 = Date.now(); res.on('finish', () => console.log('[' + req.method + '] ' + req.url + ' — ' + (Date.now() - t0) + 'ms')); next(); })` — sans next(), la requête s'arrête là.",
                "Les params : `app.get('/tarifs/:poste', (req, res) => { const p = TARIFS.find(t => t.poste.toLowerCase().includes(req.params.poste.toLowerCase())); if (!p) return res.status(404).json({ erreur: 'Poste inconnu' }); res.json(p); })`.",
                "Le gestionnaire d'erreur se reconnaît à ses 4 paramètres : `app.use((err, req, res, next) => { console.error(err.message); res.status(500).json({ erreur: 'Erreur interne' }); })` — oublie un paramètre, Express ne l'appellera jamais pour une erreur."
          ],
          "solution": {
                "lang": "js",
                "label": "serveur.js — solution commentée",
                "code": "const express = require('express');\nconst app = express();\n\n// 1) Logger maison : PREMIER middleware, il mesure tout le passage.\napp.use((req, res, next) => {\n  const t0 = Date.now();\n  res.on('finish', () => {\n    console.log('[' + req.method + '] ' + req.url + ' — ' + (Date.now() - t0) + 'ms');\n  });\n  next();                          // sans next(), la requête reste bloquée ici !\n});\n\n// 2) Parseur de corps JSON (body-parser intégré à Express 4.16+).\napp.use(express.json());\n// 3) Statique.\napp.use(express.static('public'));\n\nconst TARIFS = [\n  { poste: 'Console', prix_heure: 500 },\n  { poste: 'Bureautique', prix_heure: 300 },\n  { poste: 'Impression', prix_heure: 100 },\n];\n\napp.get('/', (req, res) => {\n  res.type('html').send('<h1>Cybercafé Akpakpa</h1><p><a href=\"/tarifs\">Tarifs</a></p>');\n});\n\napp.get('/tarifs', (req, res) => res.json(TARIFS));\n\napp.get('/tarifs/:poste', (req, res) => {\n  const recherche = req.params.poste.toLowerCase();\n  const p = TARIFS.find(t => t.poste.toLowerCase().includes(recherche));\n  if (!p) return res.status(404).json({ erreur: 'Poste inconnu' });\n  res.json(p);                     // Content-Type + stringify offerts\n});\n\n// 4) AUCUNE route n'a matché : c'est ici, après toutes les routes.\napp.use((req, res) => res.status(404).json({ erreur: 'Route inconnue' }));\n\n// 5) Gestionnaire d'erreurs : QUATRE paramètres, c'est sa signature.\napp.use((err, req, res, next) => {\n  console.error('Boum :', err.message);\n  res.status(500).json({ erreur: 'Erreur interne du serveur' });\n});\n\napp.listen(3000, () => console.log('Express sur http://localhost:3000'));\n",
                "explain": "La clé de voûte d'Express, c'est l'ORDRE : chaque requête descend la pile des app.use jusqu'à ce qu'un étage réponde. Ton logger en premier mesure donc le trajet complet ; express.json() avant les routes garantit req.body ; le 404 après les routes n'attrape que ce qui n'a trouvé aucun preneur. Deux machines souvent confondues : next() poursuit vers l'étage suivant, next(err) saute directement au gestionnaire d'erreurs (celui à quatre paramètres — sans le quatrième, Express ne le reconnaît pas comme tel). Note ce qui a disparu par rapport au natif : writeHead, JSON.stringify, le switch, la gestion manuelle du statique — autant de code que tu ne réécriras plus, et donc de bugs que tu ne réintroduiras plus."
          },
          "criteria": [
                "Pipeline Express ordonné et commenté (log, json, static, routes, 404, erreurs).",
                "Params d'URL et res.json maîtrisés ; 404 et 500 distincts et testés.",
                "static + script npm fonctionnels."
          ],
          "variants": [
                "Ajoute `app.get('/horaires')` avec un JSON d'ouverture par jour de la semaine.",
                "Ajoute un middleware qui mesure le séparateur « --- » visuel entre les requêtes (lisibilité console).",
                "Défi : lis le port dans process.env.PORT avec repli 3000 et documente-le en commentaire."
          ],
          "related": [
                "nd-express-bases",
                "nd-req-res",
                "nd-routing-methodes",
                "nd-params-query-body",
                "nd-middlewares",
                "nd-gestion-erreurs"
          ]
    },
    {
          "id": "exo-nd-crud-memoire",
          "level": "inter",
          "title": "CRUD complet de la bibliothèque de prêt",
          "icon": "menu_book",
          "minutes": 45,
          "kind": "checklist",
          "setup": "Dossier `nd-biblio` : `npm init -y && npm install express`. Deux fichiers : `serveur.js` (bootstrap) et `routes/livres.js` (le Router). Données en mémoire : un tableau de livres { id, titre, auteur, emprunte }.",
          "context": "La bibliothèque de prêt du quartier Zongo prête ses 300 ouvrages aux écoliers. Le cahier des emprunts est déchiré ; la présidente veut une API que sa fille branchera plus tard à une application. C'est l'exercice où ton Express prend des muscles : routeur dédié, cinq verbes, validation centralisée, et gestion d'erreurs qui ne laisse passer aucune exception.",
          "statement": "Tu vas écrire un CRUD REST complet, structuré avec express.Router().\n\n1. **Structure** : `routes/livres.js` exporte un `express.Router()` monté dans `serveur.js` via `app.use('/api/livres', livresRouter)`. Le serveur ne connaît plus QUE le montage : toute la logique livre vit dans son module.\n2. **État en mémoire** : un tableau `livres` dans le module du routeur (8 livres réalistes : L'Enfant noir, Une si longue lettre, Le Petit Prince…) et un compteur `prochainId`. Commentaire honnête en tête : « perdu au redémarrage — c'est voulu ici, la persistance arrive au prochain exercice ».\n3. **Les cinq routes** : `GET /` (liste, avec `?disponible=true` en filtre optionnel), `GET /:id` (404 JSON si absent), `POST /` (création + 201 + Location), `PUT /:id` (remplacement validé) ou `PATCH /:id` (partiel), `DELETE /:id` (204).\n4. **Validation** : middleware `validerLivre` qui vérifie titre (2-120 caractères) et auteur (2-80) — erreurs 422 agrégées par champ, appliqué à POST et PUT/PATCH. Sur :id, un middleware `trouverLivre` résout l'id → livre ou 404, et attache `req.livre` — les handlers aval ne cherchent plus rien.\n5. **Emprunt** : `POST /:id/emprunter` et `POST /:id/retourner` qui basculent `emprunte` (409 si incohérent : emprunter un livre déjà sorti). Les verbes « d'action » en POST, c'est assumé et commenté.\n6. **Filets de sécurité** : 404 JSON global après le montage, gestionnaire d'erreurs 4 paramètres, et une route de test `GET /api/livres/boom` qui `throw` pour prouver que le filet attrape.\n\nCe qui est évalué : le découpage Router, les middlewares de route réutilisables (trouverLivre est LE pattern à retenir), les statuts exacts, et le fait qu'aucune réponse d'erreur ne soit une page HTML ou un crash.",
          "constraints": [
                "express.Router() dans un module séparé, monté sous /api/livres — pas de app.get('/api/livres/…') en vrac dans serveur.js.",
                "trouverLivre et validerLivre sont des middlewares réutilisés par les routes concernées.",
                "Statuts exacts : 200, 201 (+Location), 204, 404, 409, 422, 500 en JSON uniquement.",
                "DELETE est idempotent OU renvoie 404 au deuxième appel — choisis, code, et commente ton choix.",
                "Aucune bibliothèque de validation externe : tout à la main, agrégée par champ."
          ],
          "checklist": [
                "GET /api/livres liste les 8 livres ; ?disponible=true n'en retourne que les non empruntés.",
                "GET /api/livres/3 et …/999 → fiche ou 404 JSON propre.",
                "POST sans auteur ou avec titre d'une lettre → 422 avec la liste des champs en faute, rien n'est créé.",
                "POST valide → 201, en-tête Location vers la nouvelle ressource, prochainId incrémenté.",
                "PUT sur :id remplace titre/auteur validés ; PATCH ne touche que les champs fournis.",
                "DELETE → 204 ; re-GET après DELETE → 404.",
                "Emprunter deux fois le même livre → 409 avec message clair ; retourner fonctionne.",
                "GET /api/livres/boom → 500 JSON, et le processus est TOUJOURS vivant après.",
                "Les routes sont toutes déclarées dans routes/livres.js (grep -c \"router\\.\" confirme) et serveur.js reste minuscule."
          ],
          "hints": [
                "Le module routeur : `const router = express.Router(); const livres = […]; let prochainId = 9; function trouverLivre(req, res, next) { const l = livres.find(x => x.id === Number(req.params.id)); if (!l) return res.status(404).json({ erreur: 'Livre introuvable' }); req.livre = l; next(); } module.exports = router;`",
                "Le montage : dans serveur.js, `app.use('/api/livres', require('./routes/livres'));` — à l'intérieur du routeur, on écrit router.get('/') qui correspond donc à /api/livres/. Le préfixe n'apparaît plus nulle part dans les routes : c'est la réutilisabilité.",
                "L'emprunt : `router.post('/:id/emprunter', trouverLivre, (req, res) => { if (req.livre.emprunte) return res.status(409).json({ erreur: 'Déjà emprunté' }); req.livre.emprunte = true; res.json(req.livre); })` — le middleware a fait 80 % du travail."
          ],
          "solution": {
                "lang": "js",
                "label": "routes/livres.js — solution commentée",
                "code": "const express = require('express');\nconst router = express.Router();\n\n// État EN MÉMOIRE : perdu au redémarrage — assumé ici, persistance au suivant.\nconst livres = [\n  { id: 1, titre: \"L'Enfant noir\", auteur: 'Camara Laye', emprunte: false },\n  { id: 2, titre: 'Une si longue lettre', auteur: 'Mariama Bâ', emprunte: true },\n  // … 6 autres titres de la bibliothèque …\n];\nlet prochainId = 3;\n\n// Middleware de RÉSOLUTION : cherche une fois, attache, ou 404.\nfunction trouverLivre(req, res, next) {\n  const livre = livres.find((l) => l.id === Number(req.params.id));\n  if (!livre) return res.status(404).json({ erreur: 'Livre introuvable' });\n  req.livre = livre;               // les handlers aval ne cherchent plus rien\n  next();\n}\n\n// Middleware de VALIDATION : agrège toutes les fautes d'un coup.\nfunction validerLivre(req, res, next) {\n  const { titre, auteur } = req.body || {};\n  const erreurs = {};\n  if (typeof titre !== 'string' || titre.trim().length < 2 || titre.length > 120)\n    erreurs.titre = 'Titre requis (2 à 120 caractères).';\n  if (typeof auteur !== 'string' || auteur.trim().length < 2 || auteur.length > 80)\n    erreurs.auteur = 'Auteur requis (2 à 80 caractères).';\n  if (Object.keys(erreurs).length) return res.status(422).json({ erreurs });\n  next();\n}\n\nrouter.get('/', (req, res) => {\n  const dispo = req.query.disponible === 'true';\n  res.json(dispo ? livres.filter((l) => !l.emprunte) : livres);\n});\n\nrouter.get('/:id', trouverLivre, (req, res) => res.json(req.livre));\n\nrouter.post('/', validerLivre, (req, res) => {\n  const livre = { id: prochainId++, titre: req.body.titre.trim(),\n                  auteur: req.body.auteur.trim(), emprunte: false };\n  livres.push(livre);\n  res.status(201).location('/api/livres/' + livre.id).json(livre);\n});\n\nrouter.delete('/:id', trouverLivre, (req, res) => {\n  livres.splice(livres.indexOf(req.livre), 1);\n  res.status(204).end();           // No Content : succès muet\n});\n\nrouter.post('/:id/emprunter', trouverLivre, (req, res) => {\n  if (req.livre.emprunte) return res.status(409).json({ erreur: 'Livre déjà emprunté' });\n  req.livre.emprunte = true;\n  res.json(req.livre);\n});\n\nmodule.exports = router;\n",
                "explain": "Le héros de cet exercice est trouverLivre : un middleware de résolution qui transforme un :id brut en objet métier. Sans lui, chaque route répète find + 404 — avec lui, trois handlers se résument à leur intention. C'est exactement ce que feront plus tard les ORM et les frameworks opiniâtres, donc assimile le geste maintenant. validerLivre montre le second réflexe : agréger TOUTES les erreurs d'un coup (une 422 par champ, pas au premier fautif) — l'usager mobile corrige tout en une passe au lieu de soumettre cinq fois. Et la réponse à la sempiternelle question « pourquoi 204 sans corps ? » : parce que le succès d'une suppression n'a rien à raconter ; renvoyer l'objet supprimé serait même trompeur, il n'existe plus. Enfin, remarque l'état global du module : simple et suffisant tant qu'un seul process sert l'API — la sauvegarde disque de l'exercice suivant te montrera où ce modèle atteint sa limite."
          },
          "criteria": [
                "CRUD complet via Router dédié : cinq routes + emprunt/retour, statuts exacts.",
                "Middlewares de résolution et de validation réutilisés sans duplication.",
                "Aucune erreur non JSON ; le processus survit à une exception de route."
          ],
          "variants": [
                "Ajoute `GET /api/livres/stats` (total, empruntés, disponibles) hors du Router ? Non : DANS le Router, avant /:id, et explique pourquoi l'ordre compte.",
                "Remplace le tableau par une Map pour l'accès O(1) et mesure la différence de code.",
                "Défi : pagination `?page=2&limite=5` sur la liste avec métadonnées { page, total, pages }."
          ],
          "related": [
                "nd-express-router",
                "nd-routing-methodes",
                "nd-params-query-body",
                "nd-middlewares",
                "nd-gestion-erreurs",
                "nd-req-res"
          ]
    },
    {
          "id": "exo-nd-persistance-fichier",
          "level": "inter",
          "title": "Sauvegarder sur disque, sans base de données",
          "icon": "save",
          "minutes": 50,
          "kind": "checklist",
          "setup": "Reprends `nd-biblio` de l'exercice CRUD. Tu vas ajouter `store.js` (la couche disque) et modifier le routeur pour qu'il l'utilise. Node 18+ : fs.promises est dans la bibliothèque standard.",
          "context": "Tu redémarres le serveur de la bibliothèque et — horreur — les emprunts de la semaine ont disparu. La mémoire, c'était charmant en démo. Avant la vraie base de données, la transition honnête : persister dans un fichier JSON, mais BIEN — écriture atomique, chargement tolérant, pas de corruption si deux enregistrements se bousculent.",
          "statement": "Tu vas écrire une couche de persistance fichier robuste et l'y brancher.\n\n1. **store.js** : module exportant `charger()` et `sauvegarder(donnees)`, avec `CHEMIN = path.join(__dirname, 'data', 'biblio.json')`. Au chargement : `fs.mkdir` du dossier (recursive), lecture en try/catch — fichier absent OU JSON corrompu → renvoie l'état initial (8 livres de départ), jamais de crash.\n2. **Écriture atomique** : sauvegarder écrit d'abord dans `biblio.json.tmp`, puis `fs.rename` vers le fichier final. Explique en commentaire pourquoi : si le process meurt pendant l'écriture, le fichier d'origine reste intact ; rename est atomique sur POSIX — c'est LA technique de tous les outils sérieux.\n3. **Anti-collision** : chaîne les écritures — `let filet = Promise.resolve(); function sauvegarder(d) { filet = filet.then(() => ecrireAtomique(d)); return filet; }` Deux sauvegardes simultanées se mettent en file au lieu de se mordre le fichier.\n4. **Brancher le routeur** : toutes les routes deviennent async ; `charger()` une fois au boot (exporte une promesse `pret` depuis store ou un init explicite dans serveur.js qui attend avant listen). Après CHAQUE mutation (POST, PUT, PATCH, DELETE, emprunter, retourner) : `await sauvegarder(livres)`. Un 500 propre si la sauvegarde échoue — la mutation mémoire reste (commentaire sur ce compromis).\n5. **Async partout oblige** : enveloppe les handlers dans un mini utilitaire `ah = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)` — Express 4 ne catch pas les rejets async tout seul ; sans ce filet, un await qui échoue = requête pendante éternelle.\n6. **Démonstration** : emprunter un livre, Ctrl+C, relancer → l'emprunt est toujours là. Casse volontairement le JSON, relance → démarrage propre sur l'état initial + avertissement console.\n\nCe qui est évalué : fs.promises avec path.join (jamais de string concaténée pour les chemins), l'écriture atomique, la sérialisation des écritures, la différence entre Express 4 et 5 sur l'async, et la tolérance aux données abîmées.",
          "constraints": [
                "fs.promises (ou fs/promises) partout : aucun appel synchrone (readFileSync interdit) hors démarrage commenté.",
                "Chemins construits avec path.join(__dirname, …), jamais de './data/biblio.json' relatif au CWD.",
                "Écriture atomique par fichier temporaire + rename, avec commentaire d'explication.",
                "Sérialisation des écritures (filet de promesses) pour interdire deux écritures simultanées.",
                "Tous les handlers async passent par l'enveloppe ah (ou asyncHandler) — aucun await nu dans un handler Express 4."
          ],
          "checklist": [
                "Emprunter, Ctrl+C, relancer : l'état est restauré depuis le disque.",
                "Le fichier data/biblio.json est du JSON lisible (cat, et il est pretty-printé avec 2 espaces).",
                "Supprimer le fichier et relancer : état initial silencieux ; le corrompre et relancer : avertissement + état initial.",
                "Deux POST quasi simultanés (Promise.all de deux fetch curl) : aucun fichier .tmp orphelin ni JSON tronqué.",
                "Une erreur d'écriture simulée (dossier data en lecture seule) produit 500 JSON et le process survit.",
                "Aucun readFileSync dans le code des handlers (grep confirme).",
                "Changer le CWD de lancement (node ../nd-biblio/serveur.js depuis ailleurs) : le fichier est TOUJOURS trouvé (path.join + __dirname).",
                "tmp n'existe plus après une sauvegarde réussie (rename a bien remplacé)."
          ],
          "hints": [
                "L'enveloppe async : `const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);` puis `router.post('/', validerLivre, ah(async (req, res) => { … await sauvegarder(livres); … }))`. Express 4 ne rejette pas les promesses pour toi ; Express 5, si.",
                "L'écriture atomique : `const tmp = CHEMIN + '.tmp'; await fsp.writeFile(tmp, JSON.stringify(d, null, 2)); await fsp.rename(tmp, CHEMIN);` — rename remplace de façon atomique : un lecteur voit l'ancien OU le nouveau, jamais un entre-deux.",
                "Le filet : `let filet = Promise.resolve(); function sauvegarder(d) { filet = filet.then(() => ecrireAtomique(d)).catch((e) => { console.error(e); throw e; }); return filet; }` — chaque écriture attend la précédente : fini les chevauchements."
          ],
          "solution": {
                "lang": "js",
                "label": "store.js — solution commentée",
                "code": "const fsp = require('fs/promises');\nconst path = require('path');\n\nconst DOSSIER = path.join(__dirname, 'data');        // __dirname : ancré au CODE,\nconst CHEMIN = path.join(DOSSIER, 'biblio.json');    // pas au dossier de lancement\n\nconst ETAT_INITIAL = () => ([\n  { id: 1, titre: \"L'Enfant noir\", auteur: 'Camara Laye', emprunte: false },\n  { id: 2, titre: 'Une si longue lettre', auteur: 'Mariama Bâ', emprunte: false },\n]);\n\nasync function charger() {\n  try {\n    const brut = await fsp.readFile(CHEMIN, 'utf8');\n    const lu = JSON.parse(brut);\n    if (!Array.isArray(lu)) throw new Error('format inattendu');\n    return lu;\n  } catch (e) {\n    // Fichier absent OU corrompu : on repart proprement, en prévenant.\n    if (e.code !== 'ENOENT') console.warn('Données illisibles, état initial :', e.message);\n    return ETAT_INITIAL();\n  }\n}\n\nasync function ecrireAtomique(donnees) {\n  await fsp.mkdir(DOSSIER, { recursive: true });\n  const tmp = CHEMIN + '.tmp';\n  await fsp.writeFile(tmp, JSON.stringify(donnees, null, 2), 'utf8');\n  await fsp.rename(tmp, CHEMIN);   // atomique : l'ancien reste intact jusqu'au swap\n}\n\n// Deux sauvegardes simultanées se METTENT EN FILE au lieu de se chevaucher.\nlet filet = Promise.resolve();\nfunction sauvegarder(donnees) {\n  filet = filet.then(() => ecrireAtomique(donnees));\n  return filet;\n}\n\nmodule.exports = { charger, sauvegarder };\n",
                "explain": "Trois pièges réels se cachent dans « écrire un JSON sur disque ». Le premier : le lancement depuis un autre dossier — './data' serait résolu depuis le endroit où tu tapes node, pas depuis ton code ; path.join(__dirname, …) ancre le fichier au module, où que tu sois. Le deuxième : une coupure PENDANT l'écriture laisse un JSON tronqué, donc un démarrage suivant en échec — l'écriture dans un .tmp puis rename rend le basculement atomique, c'est gratuit alors ne t'en prive jamais. Le troisième : deux requêtes qui mutent à la milliseconde près lanceraient deux écritures chevauchées, et le dernier octet gagnant serait la loterie — le filet de promesses les aligne proprement. Note le compromis assumé : la mémoire mute d'abord, le disque suit ; si la sauvegarde échoue, la mémoire contient un état que le disque n'a pas. Pour une bibliothèque de quartier c'est acceptable (et c'est dit honnêtement) ; pour de l'argent, c'est une vraie base transactionnelle qu'il te faudra."
          },
          "criteria": [
                "Persistance démontrée au redémarrage, chargement tolérant (absent/corrompu).",
                "Écriture atomique + filet anti-collision, async natif sans sync, chemins ancrés.",
                "Handlers protégés par l'enveloppe async ; erreurs disque en 500 propre."
          ],
          "variants": [
                "Ajoute une rotation : garde biblio-1.json … biblio-3.json des sauvegardes précédentes.",
                "Expose GET /api/livres/export qui renvoie le fichier en téléchargement (res.download).",
                "Défi : verrouille le process contre un double lancement (lockfile avec fs.open 'wx' ou proper-lockfile en mention)."
          ],
          "related": [
                "nd-fs",
                "nd-path-os",
                "nd-event-loop",
                "nd-blocage-event-loop",
                "nd-gestion-erreurs",
                "nd-single-thread"
          ]
    },
    {
          "id": "exo-nd-api-commandes",
          "level": "projet",
          "title": "L'API des commandes du marché, en architecture sérieuse",
          "icon": "architecture",
          "minutes": 130,
          "kind": "checklist",
          "setup": "Projet `nd-commandes` propre :\n\n```\nnd-commandes/\n├── serveur.js            # bootstrap uniquement\n├── config.js             # port, env\n├── store.js              # persistance JSON (exercice précédent, réutilisé)\n├── routes/\n│   ├── produits.js       # catalogue\n│   └── commandes.js      # création, suivi, annulation\n├── services/\n│   ├── produitsService.js\n│   └── commandesService.js   # règles métier PURES\n├── middlewares/\n│   ├── erreurs.js        # 404 + 500 JSON\n│   └── validation.js     # fabriques de validateurs\n└── tests_curl.sh\n```\n\n`npm init -y && npm install express`.",
          "context": "Trois vendeuses de Dantokpa prennent les commandes des restaurants : poisson fumé, gombo, piment, huile rouge — livraison le soir par zémidjan. Elles veulent une API fiable : catalogue, commandes avec statuts (passee → confirmee → livree, ou annulee), stock décrémenté, totaux justes. C'est le projet de synthèse : tout ce que le module t'a montré se compose ici en une architecture qui pourrait aller en production demain.",
          "statement": "Tu vas livrer l'API complète, organisée en couches, prouvée par script.\n\n1. **Architecture en couches stricte** : les routes ne font QUE déléguer (req → service → res) ; les services portent TOUTES les règles métier (stock insuffisant, transitions de statut légales, calculs) et ne connaissent ni req ni res ; store.js persiste ; middlewares factorisent 404/erreurs/validation. Ajoute un commentaire d'en-tête par fichier qui nomme sa couche.\n2. **Données** : produits (id, nom, prix, stock) et commandes (id, lignes [{produitId, quantite, prixUnitaire}], statut, client {nom, telephone}, creeLeISO). store.js de l'exercice précédent, adapté aux deux collections dans un seul fichier JSON.\n3. **Catalogue public** : GET /api/produits (+?q= recherche), GET /api/produits/:id.\n4. **Commandes** : POST /api/commandes — validation (lignes non vides, nom et téléphone 8 chiffres requis) ; le service vérifie le stock de CHAQUE ligne, **relit les prix en base** (le client n'envoie que les id+quantités), calcule le total, décrémente et enregistre → 201 + Location. GET /api/commandes/:id (suivi). POST /api/commandes/:id/confirmer et /livrer : transitions EXACTES passee→confirmee→livree uniquement (toute autre → 409). POST /api/commandes/:id/annuler : possible seulement depuis passee/confirmee, et **restitue le stock** dans la même opération ; annuler une livrée → 409.\n5. **Erreur métier typée** : classe `ErreurMetier extends Error` (avec `statut`) levée par les services ; le gestionnaire d'erreurs la reconnaît et répond `statut` + message ; tout le reste → 500 générique. Les services restent ainsi transportables (futur worker, tests unitaires sans HTTP).\n6. **Configuration** : config.js exporte PORT depuis `process.env.PORT || 3000` et un booléen `production`. En production (NODE_ENV=production), le gestionnaire d'erreurs masque les détails internes (message générique) alors qu'en dev il les montre — codé ET prouvé.\n7. **Sécurité série annexe** : en commentaires d'en-tête de README.md du projet, documente la suite : authentification par jetons JWT signés côté serveur (clé dans variable d'environnement `JWT_SECRET`, jamais en dur — les vendeuses se connecteraient, les mutations seraient protégées) et hachage de mots de passe avec bcrypt. NE l'implémente PAS ici : le but est de savoir raconter l'architecture cible.\n8. **tests_curl.sh** : script exécutable démontrant : catalogue OK ; création valide → 201 + stock décrémenté (vérif par GET produit) ; création sur stock insuffisant → 409 RIEN n'a bougé ; prix forgé côté client ignoré ; téléphone invalide → 422 ; confirmer → livrer OK ; livrer deux fois → 409 ; annuler une livrée → 409 ; annuler une confirmée → 200 avec stock restitué (vérif GET) ; JSON cassé → 400 ; route inconnue → 404 ; démarrage sur PORT=4567 fonctionne. Minimum 11 scénarios, statuts affichés, script rejouable (base réinitialisée en tête).\n\nCe qui est évalué : la séparation réelle route/service/store, les prix CÔTÉ SERVEUR, les transitions d'état métier inviolables, la restitution de stock transactionnelle, config par environnement, et un script de preuve — une API qu'on peut présenter à une autre développeuse sans rougir.",
          "constraints": [
                "Aucune règle métier dans les routes : grep sur routes/ ne montre aucun calcul de total ni de stock — tout est dans services/.",
                "Le prix facturé est TOUJOURS relu en base (tout prix envoyé par le client est ignoré).",
                "Transitions de statut limitées exactement à passee→confirmee→livree et annuler depuis passee|confirmee.",
                "Annulation + restitution de stock = une seule séquence cohérente ; en cas d'erreur, rien n'est à moitié fait.",
                "Secrets et config jamais codés en dur : PORT/JWT_SECRET viennent de process.env (JWT seulement documenté).",
                "tests_curl.sh exécutable, auto-portant, et vert deux exécutions de suite."
          ],
          "checklist": [
                "serveur.js tient en ~25 lignes (bootstrap) ; les routes n'importent aucun module fs.",
                "Création de commande : total exact = Σ(quantite × prix DE LA BASE) ; tentatives de prix forgé sans effet.",
                "Stock insuffisant sur UNE ligne → 409 global, aucune ligne n'a été décrémentée (vérifié par GET produits).",
                "Le cycle passee → confirmee → livree fonctionne ; toute transition illégale → 409 JSON sans mutation d'état.",
                "Annuler une commande : statut annulee + stock de chaque ligne restitué exactement (preuve par GET avant/après).",
                "ErreurMetier produit le statut voulu ; un bug de programmation (throw 'boum' dans un service) → 500 générique en production, détaillé en dev.",
                "NODE_ENV=production : l'erreur 500 ne fuite PAS le message interne ; sans la variable : elle le montre.",
                "PORT=4567 node serveur.js : l'API écoute bien sur 4567 (config lue).",
                "Redémarrage du serveur : commandes et stocks persistés (store atomique).",
                "tests_curl.sh : 11 scénarios verts, immédiatement rejouable."
          ],
          "hints": [
                "Le squelette du service : `class ErreurMetier extends Error { constructor(statut, message) { super(message); this.statut = statut; } }` puis dans commandesService : `function creerCommande(donnees, produits) { if (!donnees.lignes?.length) throw new ErreurMetier(422, '…'); const lignes = donnees.lignes.map(l => { const p = produits.find(x => x.id === l.produitId); if (!p) throw new ErreurMetier(404, 'Produit ' + l.produitId + ' inconnu'); if (p.stock < l.quantite) throw new ErreurMetier(409, 'Stock insuffisant pour ' + p.nom); return { produitId: p.id, quantite: l.quantite, prixUnitaire: p.prix }; }); …`",
                "Le gestionnaire qui comprend ErreurMetier : `app.use((err, req, res, next) => { const statut = err.statut || 500; const detail = process.env.NODE_ENV === 'production' ? undefined : err.message; res.status(statut).json({ erreur: statut === 500 ? 'Erreur interne' : err.message, detail }); })` — en production, statut 500 ne dit que « Erreur interne », rien d'autre.",
                "La transition : `const SUIVANTS = { passee: 'confirmee', confirmee: 'livree' }; function avancer(c, cible) { if (SUIVANTS[c.statut] !== cible) throw new ErreurMetier(409, 'Transition ' + c.statut + ' → ' + cible + ' interdite'); c.statut = cible; }` — une table de vérité tient lieu d'algorithmique compliquée et se lit comme le cahier des vendeuses."
          ],
          "solution": {
                "lang": "js",
                "label": "services/commandesService.js + middlewares/erreurs.js — extraits commentés",
                "code": "// ========== services/commandesService.js — le métier, zéro HTTP ==========\nclass ErreurMetier extends Error {\n  constructor(statut, message) { super(message); this.statut = statut; }\n}\n\nconst SUIVANTS = { passee: 'confirmee', confirmee: 'livree' };  // table de vérité\n\nfunction creer(donnees, produits, commandes) {\n  const tel = String(donnees?.client?.telephone || '').replace(/\\s/g, '');\n  if (!/^\\d{8}$/.test(tel)) throw new ErreurMetier(422, 'Téléphone : 8 chiffres requis.');\n  if (!donnees.client.nom?.trim()) throw new ErreurMetier(422, 'Nom du client requis.');\n  if (!Array.isArray(donnees.lignes) || !donnees.lignes.length)\n    throw new ErreurMetier(422, 'Au moins une ligne de commande.');\n\n  const lignes = donnees.lignes.map((l) => {\n    const p = produits.find((x) => x.id === l.produitId);\n    if (!p) throw new ErreurMetier(404, 'Produit inconnu : ' + l.produitId);\n    if (!Number.isInteger(l.quantite) || l.quantite <= 0)\n      throw new ErreurMetier(422, 'Quantité invalide pour ' + p.nom);\n    if (p.stock < l.quantite)\n      throw new ErreurMetier(409, 'Stock insuffisant : ' + p.nom + ' (' + p.stock + ' dispo)');\n    // ⚠ prix RELU EN BASE : le client n'a jamais voix au chapitre du montant.\n    return { produitId: p.id, quantite: l.quantite, prixUnitaire: p.prix };\n  });\n  const total = lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);\n  lignes.forEach((l) => {\n    produits.find((x) => x.id === l.produitId).stock -= l.quantite;\n  });\n  const commande = { id: (commandes.at(-1)?.id || 0) + 1, lignes, total, statut: 'passee',\n    client: { nom: donnees.client.nom.trim(), telephone: tel },\n    creeLe: new Date().toISOString() };\n  commandes.push(commande);\n  return commande;\n}\n\nfunction annuler(commande, produits) {\n  if (commande.statut === 'livree') throw new ErreurMetier(409, 'Une livrée ne s\\'annule plus.');\n  if (commande.statut === 'annulee') throw new ErreurMetier(409, 'Déjà annulée.');\n  commande.lignes.forEach((l) => {\n    produits.find((x) => x.id === l.produitId).stock += l.quantite;  // restitution\n  });\n  commande.statut = 'annulee';\n  return commande;\n}\n\n// ========== middlewares/erreurs.js ==========\nfunction pasTrouve(req, res) { res.status(404).json({ erreur: 'Route inconnue' }); }\nfunction boiteAerreurs(err, req, res, next) {\n  const statut = err.statut || 500;\n  const prod = process.env.NODE_ENV === 'production';\n  if (statut === 500) console.error('Erreur interne :', err);\n  res.status(statut).json({\n    erreur: statut === 500 ? 'Erreur interne du serveur' : err.message,\n    ...(prod ? {} : { detail: err.message }),     // stack seulement hors prod\n  });\n}\nmodule.exports = { ErreurMetier, pasTrouve, boiteAerreurs };\n",
                "explain": "Cette architecture tient en une règle : chaque couche ne parle qu'à sa voisine. La route traduit HTTP → objets simples et appelle le service ; le service applique le cahier des vendeuses (prix relus, stock, transitions) et lève des ErreurMetier quand la réalité désobéit ; le store persiste ; le gestionnaire d'erreurs reconvertit tout en HTTP. Le bénéfice se mesure aux tests curl : les 11 scénarios ne passent pas « par magie », ils passent parce qu'aucune règle n'est éparpillée — change la règle de stock, tu modifies UN fichier, et les routes ne bougent pas. La table SUIVANTS vaut une dissertation : au lieu d'imbriquer des conditions fragiles, elle déclare l'automate tel que les vendeuses le racontent (« après passée, on confirme ; après confirmée, on livre ; c'est tout »). Enfin, note le réflexe NODE_ENV : un message interne qui fuite en production donne des indices à qui veut attaquer ; en dev, la même route te donne la stack — configure, ne commente pas."
          },
          "criteria": [
                "Architecture routes/services/store réelle ; prix serveur ; transitions inviolables ; stock transactionnel.",
                "Config environnement (PORT, NODE_ENV) fonctionnelle et démontrée ; aucune clé en dur.",
                "tests_curl.sh : 11 scénarios verts, rejouable ; persistance au redémarrage prouvée."
          ],
          "variants": [
                "Implémente maintenant la mention JWT : POST /api/connexion (bcrypt + jsonwebtoken, JWT_SECRET en env) protégeant confirmer/livrer/annuler.",
                "Ajoute GET /api/rapports/jour?date=AAAA-MM-JJ (chiffre d'affaires des commandes livrées ce jour-là) calculé dans un rapportService.",
                "Défi : remplace le store JSON par SQLite (better-sqlite3) SANS changer les services (seule la couche store bouge — c'est le test ultime de ton architecture)."
          ],
          "related": [
                "nd-express-router",
                "nd-middlewares",
                "nd-gestion-erreurs",
                "nd-variables-env",
                "nd-jwt",
                "nd-bcrypt",
                "nd-deploiement"
          ]
    }
  ]
};
