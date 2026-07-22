/* ============================================================
   exo-flask.js — Exercices pratiques : Flask
   Validation : checklist d'auto-évaluation (projet local : flask --app app run --debug).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.flask = {
  module: 'flask',
  list: [
{
    "id": "exo-fk-hello-routes",
    "level": "fonda",
    "title": "Trois routes pour dire bonjour",
    "icon": "route",
    "free": true,
    "minutes": 25,
    "kind": "checklist",
    "setup": "Crée un dossier `fk-bonjour`, un environnement virtuel (`python3 -m venv .venv && source .venv/bin/activate`), installe Flask (`pip install flask`), crée `app.py` et lance `flask --app app run --debug`. Ouvre http://127.0.0.1:5000.",
    "context": "Le RESTO-U de l'université d'Abomey-Calavi veut une petite appli web : page d'accueil, menu du jour, et pré-mix. Avant la base de données et les gabarits, il faut apprivoiser la boucle fondamentale de Flask : une URL entre, une fonction s'exécute, une réponse sort. Trois routes suffisent pour tout comprendre.",
    "statement": "Tu vas écrire ta première application Flask, trois routes et un convertisseur de type.\n\n1. Crée l'application : `app = Flask(__name__)` puis une route `/` qui retourne la page d'accueil — pour l'instant, une simple chaîne HTML (on fera de vrais gabarits au prochain exercice) : titre « RESTO-U — Accueil » et liste des liens vers les autres routes.\n2. Route `/menu` : retourne le menu du jour — 4 plats béninois (amazin, pâte rouge, wagasi frit, jus de gingembre) sous forme de liste HTML construite par une boucle Python sur une liste de chaînes.\n3. Route `/plat/<int:numero>` : retourne « Détail du plat n°X » avec le numéro. Démontre le **convertisseur** : `/plat/trois` doit donner un 404 automatique sans une ligne de ton code. Bonus : si numéro dépasse la liste, renvoie volontairement un 404 explicite avec `abort(404)`.\n4. Un lien de navigation sur chaque page vers les deux autres (généré avec `url_for`) — tu constates que renommer l'URL ne casse pas les liens.\n5. Le mode debug affiche le rechargement automatique : modifie un texte, sauvegarde, recharge → changé.\n\nCe qui est évalué : la structure minimale d'une app Flask, les décorateurs de routes, les parties variables d'URL avec convertisseurs, `url_for`, et l'utilisation du mode debug. C'est le squelette sur lequel tout le reste du framework se greffe.",
    "constraints": [
        "Une seule instance : app = Flask(__name__), pas de bidouille multi-app.",
        "Les liens internes sont générés par url_for, jamais écrits en dur.",
        "La route détail utilise le convertisseur <int:…> et gère l'indice hors liste avec abort(404).",
        "Chaque route a un nom de fonction parlant (pas de doublons de nom).",
        "Le serveur est lancé en mode debug pendant le développement."
    ],
    "checklist": [
        "`flask --app app run --debug` démarre et / affiche la page d'accueil avec les liens.",
        "/menu liste les 4 plats issus de la boucle Python (pas de HTML copié 4 fois).",
        "/plat/2 affiche le bon numéro ; /plat/99 retourne 404 ; /plat/trois aussi (convertisseur).",
        "Modifier un texte et sauvegarder recharge l'appli automatiquement (pas de redémarrage manuel).",
        "Renommer /menu en /carte ne casse aucun lien interne (url_for a suivi).",
        "Le debugger interactif est visible si je provoque volontairement une exception (et je comprends pourquoi il ne doit JAMAIS être actif en production).",
        "`flask --app app routes` liste mes 3 routes avec leurs méthodes.",
        "L'application tourne aussi via `python app.py` grâce au bloc __main__ avec app.run(debug=True)."
    ],
    "hints": [
        "Le minimal vital : `from flask import Flask, url_for, abort; app = Flask(__name__)` puis `@app.route('/')` sur chaque fonction. Le décorateur associe l'URL à la fonction ; la valeur retournée devient le corps HTTP.",
        "Le convertisseur : `@app.route('/plat/<int:numero>')` ne matche que les entiers — Flask fait le tri avant toi. Pour le hors-liste : `if numero >= len(plats): abort(404)`. Et les liens : `url_for('menu')` prend le NOM DE LA FONCTION, pas l'URL.",
        "Le lancement classique : ajoute à la fin `if __name__ == '__main__': app.run(debug=True)` pour `python app.py`. Note que le mode debug = reloader + debugger interactif ; il offre l'exécution de code arbitraire dans le navigateur, donc il reste un outil de développement, point."
    ],
    "solution": {
        "lang": "py",
        "label": "app.py — solution commentée",
        "code": "\nfrom flask import Flask, url_for, abort\n\napp = Flask(__name__)\n\nPLATS = [\"Amazin au fromager\", \"Pâte rouge + wagasi\",\n         \"Igname pilée sauce arachide\", \"Jus de gingembre glacé\"]\n\n@app.route('/')\ndef accueil():\n    # url_for('nom_de_fonction') : les liens survivent aux renommages d'URL.\n    liens = (f\"<li><a href='{url_for('menu')}'>Menu du jour</a></li>\"\n             f\"<li><a href='{url_for('plat', numero=0)}'>Le plat star</a></li>\")\n    return f\"<h1>RESTO-U d'Abomey-Calavi</h1><ul>{liens}</ul>\"\n\n@app.route('/menu')\ndef menu():\n    items = \"\".join(f\"<li>{p}</li>\" for p in PLATS)   # la boucle fait la liste\n    return f\"<h1>Menu du jour</h1><ul>{items}</ul><p><a href='{url_for('accueil')}'>Accueil</a></p>\"\n\n@app.route('/plat/<int:numero>')       # <int:…> filtre déjà tout ce qui n'est pas un nombre\ndef plat(numero):\n    if not 0 <= numero < len(PLATS):\n        abort(404)                     # 404 volontaire : cette ressource n'existe pas\n    return f\"<h1>Détail du plat n°{numero}</h1><p>{PLATS[numero]}</p>\"\n\nif __name__ == '__main__':\n    app.run(debug=True)                # dev only : le debugger n'a pas sa place en prod\n",
        "explain": "Trois idées qui fondent tout Flask. Un : une route est un tableau de correspondance (URL + fonction), et le décorateur ne fait qu'y inscrire la fonction — la mécanique est simple, le pouvoir vient de ce que tu mets dans la fonction. Deux : les parties variables avec convertisseurs (<int:numero>) font de la validation gratuite : /plat/trois n'atteint même pas ton code, Flask répond 404 à ta place. Trois : url_for retourne le chemin à partir du NOM de la fonction — tes liens ne mentionnent jamais une URL, donc renommer une route ne casse rien. Et garde en tête la différence abort(404) vs convertisseur : l'un filtre la forme, l'autre juge le fond."
    },
    "criteria": [
        "Trois routes fonctionnelles avec navigation interne par url_for.",
        "Convertisseur int et abort(404) démontrés et compris.",
        "Mode debug utilisé à bon escient, avec conscience du risque."
    ],
    "variants": [
        "Ajoute `/plat/<nom>` (string libre) qui recherche un plat par nom dans la liste (insensible à la casse).",
        "Sers une vraie page HTML complète (doctype, head) à l'accueil au lieu du fragment.",
        "Défi : ajoute un en-tête personnalisé `X-Resto: UAC` à toutes les réponses via `@app.after_request`."
    ],
    "related": [
        "fk-demarrage",
        "fk-routing",
        "fk-requetes",
        "fk-erreurs"
    ]
},
{
    "id": "exo-fk-form-produit",
    "level": "fonda",
    "title": "Formulaire POST et gabarits Jinja",
    "icon": "edit_note",
    "minutes": 35,
    "kind": "checklist",
    "setup": "Reprends ton dossier Flask (ou un nouveau `fk-boutique`) : `app.py`, dossier `templates/` au même niveau. Lance `flask --app app run --debug`.",
    "context": "La vendeuse de tissus hollandais de Dantokpa veut ajouter ses coupons elle-même : nom, prix au yard, métrage disponible. Direction le formulaire HTML — et l'occasion d'apprendre le trio qui gouverne tout le web : GET affiche, POST agit, PUIS ON REDIRIGE. Rate ce schéma et chaque F5 recrée un article.",
    "statement": "Tu vas construire l'ajout de produits avec gabarits Jinja et le pattern Post/Redirect/Get.\n\n1. En mémoire, une liste `PRODUITS` de dictionnaires (3 coupons de tissu : nom, prix, metrage). Route `GET /produits` qui affiche la liste via `render_template('produits.html', produits=PRODUITS)` en bouclant en Jinja (`{% for %}`), avec échappement automatique vérifié (`{{ p.nom }}`).\n2. Route `/produits/nouveau` acceptant GET et POST (`methods=['GET', 'POST']`). GET : affiche le gabarit `nouveau.html` (champs nom, prix, métrage). POST : lit `request.form`, **valide** : nom requis (strip), prix entier > 0, métrage float > 0. Sur erreur : ré-affiche le formulaire avec les messages ET les valeurs saisies (statut 400). Sur succès : ajoute à la liste, stocke un message flash (`flash('Coupon ajouté !')`) et **redirige** vers la liste.\n3. Dans le gabarit de liste : affiche les flashs via `get_flashed_messages()` et le total des métrages disponibles.\n4. Convertis le prix à l'affichage en FCFA formaté (fonction Python `fcfa` passée au gabarit ou filtre Jinja maison `@app.template_filter('fcfa')` — plus élégant : essaie le filtre).\n5. Démontre le PRG : après un ajout, appuie sur F5 sur la liste → aucun re-envoi de formulaire (le navigateur ne propose pas de resoumettre).\n\nCe qui est évalué : request.form, la validation côté serveur avec redonne des valeurs, le flash, la redirection post-succès, et les filtres Jinja. Plus la notion capitale : l'échappement Jinja automatique — injecte `<script>` dans un nom de produit et observe le code source.",
    "constraints": [
        "POST validé serveur, toujours : le required HTML5 ne compte pas (contournable).",
        "Erreur → ré-affichage du formulaire (400) avec valeurs conservées ; succès → flash + redirect (302).",
        "Aucune donnée affichée sans échappement : {{ }} partout, aucun |safe sans raison.",
        "Les gabarits héritent d'un layout commun (base.html avec block content).",
        "Le code de traitement n'utilise jamais request.args pour lire le POST (form, pas query string)."
    ],
    "checklist": [
        "GET /produits affiche les 3 coupons initiaux formatés (« 2 500 F / yard ») et le total des métrages.",
        "Le formulaire vide soumis affiche les erreurs par champ, sans perdre ce qui était juste.",
        "Prix « abc » ou « -50 » refusé ; « 2500 » accepté (conversion int explicite).",
        "Après ajout réussi : redirection vers la liste, flash visible une fois, F5 sans risque.",
        "Un nom contenant <script>alert(1)</script> apparaît échappé dans la page (vu dans Ctrl+U).",
        "Le filtre fcfa (`{{ p.prix|fcfa }}`) fonctionne dans les deux gabarits sans duplication de la fonction.",
        "Le statut HTTP d'un formulaire invalide est 400, celui du succès 302 puis 200 (vérifie dans l'onglet Réseau).",
        "base.html porte le doctype et le menu : les autres pages n'ont que leur contenu spécifique."
    ],
    "hints": [
        "Le squelette POST : `@app.route('/produits/nouveau', methods=['GET', 'POST'])` puis `if request.method == 'POST':` — lis request.form['nom'].strip(), valide dans un dict erreurs, et `if erreurs: return render_template('nouveau.html', erreurs=erreurs, valeurs=request.form), 400`.",
        "Le flash : `flash('Coupon ajouté !', 'succes')` nécessite `app.secret_key = 'quelque-chose-de-long'` (les flashs vivent dans la session signée). Côté gabarit : `{% with messages = get_flashed_messages() %}{% if messages %} … {% endif %}{% endwith %}`.",
        "Le filtre : `@app.template_filter('fcfa') def fcfa(n): return f\"{n:,}\".replace(\",\", \" \") + \" F\"` — ensuite `{{ prix|fcfa }}` dans N'IMPORTE quel gabarit. C'est ainsi qu'on évite de passer des utilitaires en argument à chaque render_template."
    ],
    "solution": {
        "lang": "py",
        "label": "app.py (extraits) + base.html — solution commentée",
        "code": "\nfrom flask import Flask, render_template, request, redirect, url_for, flash\n\napp = Flask(__name__)\napp.secret_key = \"dev-seulement-une-longue-chaine\"   # à mettre en env en prod\n\nPRODUITS = [\n    {\"nom\": \"Wax Super Gold\", \"prix\": 2500, \"metrage\": 6.0},\n    {\"nom\": \"Hollandis VLISCO\", \"prix\": 12000, \"metrage\": 6.0},\n    {\"nom\": \"Boguilan artisanal\", \"prix\": 4000, \"metrage\": 4.5},\n]\n\n@app.template_filter('fcfa')\ndef fcfa(n):\n    # Un filtre Jinja : disponible partout, zéro duplication.\n    return f\"{n:,}\".replace(\",\", \" \") + \" F\"\n\n@app.route('/produits')\ndef produits():\n    total = sum(p[\"metrage\"] for p in PRODUITS)\n    return render_template('produits.html', produits=PRODUITS, total=total)\n\n@app.route('/produits/nouveau', methods=['GET', 'POST'])\ndef nouveau():\n    erreurs = {}\n    if request.method == 'POST':\n        nom = request.form.get('nom', '').strip()\n        try:\n            prix = int(request.form.get('prix', ''))\n            if prix <= 0: erreurs['prix'] = 'Le prix doit être positif.'\n        except ValueError:\n            erreurs['prix'] = 'Un nombre entier, sans espace.'\n        try:\n            metrage = float(request.form.get('metrage', '').replace(',', '.'))\n            if metrage <= 0: erreurs['metrage'] = 'Le métrage doit être positif.'\n        except ValueError:\n            erreurs['metrage'] = 'Un nombre (4.5 ou 4,5 acceptés).'\n        if not nom: erreurs['nom'] = 'Le nom est obligatoire.'\n        if erreurs:\n            # On REDONNE le formulaire avec valeurs et erreurs — statut 400.\n            return render_template('nouveau.html', erreurs=erreurs,\n                                   v=request.form), 400\n        PRODUITS.append({\"nom\": nom, \"prix\": prix, \"metrage\": metrage})\n        flash(f'« {nom} » ajouté à la boutique.')\n        return redirect(url_for('produits'))   # PRG : F5 ne reposte jamais\n    return render_template('nouveau.html', erreurs={}, v={})\n",
        "explain": "Garde la chorégraphie en tête : GET montre, POST valide, succès redirige, échec remonte. Le 400 sur formulaire invalide n'est pas un caprice : il dit la vérité HTTP (« ta requête est mauvaise ») et évite que l'utilisatrice croie à un enregistrement. Le redirect après succès est le célèbre PRG : il transforme la dernière requête en GET, donc F5 n'a plus de formulaire à resoumettre — c'est ainsi qu'on évite les coupons de tissu en double. flash() n'est qu'un message à usage unique transporté par la session signée ; sans secret_key, pas de session, donc pas de flash. Enfin, le filtre fcfa est la bonne réponse au formatage : écrit une fois, disponible dans tous les gabarits, et Jinja échappe tout par défaut — la sécurité vit dans les defaults."
    },
    "criteria": [
        "Formulaire complet : validation serveur, redonne des valeurs, flash, PRG respecté.",
        "Échappement Jinja démontré ; filtre fcfa partagé ; gabarits hérités proprement.",
        "Statuts HTTP observés (400/302) et compris dans l'onglet Réseau."
    ],
    "variants": [
        "Ajoute la suppression d'un produit (POST dédié + flash de confirmation), jamais en GET.",
        "Remplace la liste en mémoire par un compteur de sessions : nombre d'ajouts effectués par visiteur (`session['ajouts']`).",
        "Défi : ajoute un filtre `metrage` qui affiche « 6 yards (5,49 m) » avec conversion."
    ],
    "related": [
        "fk-templates",
        "fk-requetes",
        "fk-sessions",
        "fk-formulaires",
        "fk-templates-heritage"
    ]
},
{
    "id": "exo-fk-crud-sqlite",
    "level": "inter",
    "title": "CRUD persistant avec SQLite",
    "icon": "storage",
    "minutes": 50,
    "kind": "checklist",
    "setup": "Nouveau projet `fk-stock` : venv, `pip install flask`. Crée `app.py`, `schema.sql`, `templates/` (base + liste + form). Pas d'ORM ici : SQLite en direct avec `sqlite3` de la bibliothèque standard — pour comprendre ce que l'ORM fera ensuite à ta place.",
    "context": "Le dépôt de boissons de Fifadji veut suivre ses casiers : entrer, sortir, corriger, consulter. La liste Python en mémoire de l'exercice précédent s'évapore à chaque redémarrage : cette fois, on persiste. Table SQL, requêtes préparées, et le schéma de connexion « une par requête » de Flask via `g`.",
    "statement": "Tu vas construire un CRUD complet sur SQLite, sans ORM, avec des requêtes préparées.\n\n1. `schema.sql` : table `produits` (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, casiers INTEGER NOT NULL CHECK(casiers >= 0), prix INTEGER NOT NULL CHECK(prix > 0), cree_le TEXT DEFAULT CURRENT_TIMESTAMP). Fonction `initialiser_bd()` qui exécute ce script si la base n'existe pas (commande CLI `flask --app app init-db` : propre et rejouable).\n2. **Connexion par requête** : `def get_db():` ouvre `sqlite3.connect('stock.sqlite3')` en la stockant dans `g.db` si absente, avec `row_factory = sqlite3.Row`. `@app.teardown_appcontext` la ferme. Jamais de connexion globale partagée.\n3. **CRUD.** Liste `GET /produits` (SELECT * ORDER BY nom). Création `/produits/nouveau` (GET form + POST validé, INSERT **paramétré** `VALUES (?, ?, ?)`, commit, flash, redirect PRG). Édition `/produits/<int:id>/modifier` (pré-rempli ; UPDATE paramétré). Suppression `POST /produits/<int:id>/supprimer` (DELETE paramétré + confirmation côté gabarit).\n4. Démontre l'injection : écris volontairement, en commentaire, la version dangereuse `f\"INSERT INTO produits VALUES (... '{nom}' ...)\"` et montre en test qu'un nom avec apostrophe (\\\"Casier d'eau\\\") la casse ou pire. Puis montre que la version paramétrée l'accepte sans broncher.\n5. Règles métier : casiers et prix entiers validés côté serveur (le CHECK SQL est la ceinture, pas le pantalon). Un 404 propre si l'id n'existe pas (`get_produit(id)` qui `abort(404)` quand la requête ne retourne rien).\n6. Petite touche DBA : la liste affiche la valeur totale du parc (SUM(casiers * prix)) calculée par SQL, pas par une boucle Python — compare les deux écritures en commentaire.\n\nCe qui est évalué : la gestion de connexion (g + teardown), le paramétrage de TOUTES les requêtes dynamiques, le PRG sur toutes les écritures, et la validation double serveur + SQL.",
    "constraints": [
        "Aucune requête avec f-string ou concaténation contenant des données : toujours des paramètres ?.",
        "get_db + teardown_appcontext : une connexion par requête, fermée à la fin.",
        "Toutes les écritures (INSERT/UPDATE/DELETE) passent par POST puis redirect + flash.",
        "Les identifiants sortent de l'URL en int et donnent 404 s'ils ne correspondent à rien.",
        "init-db est idempotent : relancer la commande ne pète pas une base existante (IF NOT EXISTS) ou réinitialise volontairement."
    ],
    "checklist": [
        "init-db crée la table ; les produits ajoutés survivent aux redémarrages du serveur.",
        "Toutes les opérations CRUD fonctionnent avec flashs et redirections.",
        "Le produit « Casier d'eau » (apostrophe) entre sans erreur : preuve que le paramétrage marche.",
        "La version f-string (commentée) casse sur cette apostrophe ou accepte un ' OR 1=1 -- : démonstration faite et comprise.",
        "Un id inexistant en édition ou suppression donne un 404 propre, pas une page d'exception.",
        "Le total parc affiché est juste (vérifié avec sqlite3 en ligne de commande).",
        "Les CHECK de la table rejettent une insertion sauvage directe (prix -5 testé en console sqlite3).",
        "Aucune fuite de connexions : après plusieurs dizaines de requêtes, pas d'erreur de verrouillage."
    ],
    "hints": [
        "La connexion canonique : `def get_db(): if 'db' not in g: g.db = sqlite3.connect('stock.sqlite3'); g.db.row_factory = sqlite3.Row; return g.db` et `@app.teardown_appcontext def fermer(exc): db = g.pop('db', None); if db: db.close()`.",
        "Le paramétrage : `db.execute('INSERT INTO produits (nom, casiers, prix) VALUES (?, ?, ?)', (nom, casiers, prix)); db.commit()` — le tuple protège TOUT, y compris les apostrophes et les tentatives d'injection. `sqlite3.Row` te donne `row['nom']` lisible au lieu d'indices numériques.",
        "La commande CLI : `@app.cli.command('init-db') def init_db(): db = get_db(); db.executescript(Path('schema.sql').read_text()) ; db.commit(); print('Base initialisée.')` — et dans schema.sql utilise CREATE TABLE IF NOT EXISTS pour être rejouable."
    ],
    "solution": {
        "lang": "py",
        "label": "app.py (extraits commentés) — solution",
        "code": "\nimport sqlite3\nfrom flask import Flask, g, request, render_template, redirect, url_for, flash, abort\n\napp = Flask(__name__)\napp.secret_key = \"dev-seulement\"\nDATABASE = \"stock.sqlite3\"\n\ndef get_db():\n    if 'db' not in g:                      # une connexion PAR REQUÊTE (g meurt avec elle)\n        g.db = sqlite3.connect(DATABASE)\n        g.db.row_factory = sqlite3.Row     # row['nom'] lisible\n    return g.db\n\n@app.teardown_appcontext\ndef fermer_db(exc):\n    db = g.pop('db', None)\n    if db is not None:\n        db.close()                          # fermée quoiqu'il arrive\n\ndef get_produit(id):\n    row = get_db().execute('SELECT * FROM produits WHERE id = ?', (id,)).fetchone()\n    if row is None:\n        abort(404)                          # l'inexistant n'est pas une exception moche\n    return row\n\n@app.route('/produits')\ndef produits():\n    db = get_db()\n    rows = db.execute('SELECT * FROM produits ORDER BY nom').fetchall()\n    total = db.execute('SELECT COALESCE(SUM(casiers * prix), 0) AS v FROM produits') \\\n               .fetchone()['v']             # SQL agrège : pas de boucle Python ici\n    return render_template('produits.html', produits=rows, total=total)\n\n@app.route('/produits/nouveau', methods=['GET', 'POST'])\ndef nouveau():\n    if request.method == 'POST':\n        nom = request.form.get('nom', '').strip()\n        try:\n            casiers = int(request.form.get('casiers', ''))\n            prix = int(request.form.get('prix', ''))\n            assert casiers >= 0 and prix > 0\n        except (ValueError, AssertionError):\n            return render_template('form.html', erreur='Casiers ≥ 0 et prix > 0 obligatoires.', v=request.form), 400\n        db = get_db()\n        # ? ? ? — les données passent en PARAMÈTRES, jamais collées dans le SQL.\n        db.execute('INSERT INTO produits (nom, casiers, prix) VALUES (?, ?, ?)',\n                   (nom, casiers, prix))\n        db.commit()\n        flash(f'« {nom} » enregistré.')\n        return redirect(url_for('produits'))\n    return render_template('form.html', erreur=None, v={})\n",
        "explain": "Le piège numéro un du SQL côté web est la concaténation : la moindre apostrophe devient soit un crash, soit une porte d'entrée. Les paramètres ? passent les données par un canal à part — le moteur ne les interprète jamais comme du SQL. Deuxième pilier : la connexion dans g. Flask tue le contexte à la fin de chaque requête, teardown_appcontext ferme donc la connexion proprement ; une connexion globale, elle, finirait verrouillée ou partagée entre threads hors de son intention. get_produit avec abort(404) transforme l'inexistant en vraie réponse HTTP au lieu d'un TypeError cryptique. Enfin pousse l'agrégation vers SQL (SUM, COALESCE) : la base est faite pour ça, et ta boucle Python n'aurait rien apporté sinon de la lenteur."
    },
    "criteria": [
        "CRUD SQLite complet, persistant, avec connexion propre et requêtes toutes paramétrées.",
        "Démonstration de l'injection (version fragile vs version sûre) réalisée et expliquée.",
        "404 propres, validation serveur + CHECK SQL, agrégat SQL correct."
    ],
    "variants": [
        "Ajoute la recherche `?q=eau` avec LIKE paramétré et mise en avant des résultats.",
        "Ajoute un mouvement de stock (entrée/sortie) enregistré dans une table `mouvements` avec date.",
        "Défi : pagination simple de la liste (LIMIT/OFFSET paramétrés) à 10 produits par page."
    ],
    "related": [
        "fk-sqlalchemy",
        "fk-contexte",
        "fk-erreurs",
        "fk-formulaires",
        "fk-demarrage"
    ]
},
{
    "id": "exo-fk-api-json",
    "level": "inter",
    "title": "API JSON des prix du marché",
    "icon": "data_object",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Nouveau projet `fk-api` : venv, `pip install flask`. Données en mémoire au départ (une liste de dicts) : 8 produits du marché Dantokpa (Céréales, Tubercules, Huiles, Poissons) avec id, nom, categorie, prix, unite (\"le kg\", \"le litre\", \"la barre\"). Pour tester : curl ou HTTPie.",
    "context": "L'inter'application des vendeuses de Dantokpa a besoin d'un service de prix consultable par les applis mobiles des trois marchés partenaires. Fini les pages HTML : ici on parle JSON, verbes HTTP précis et codes de statut honnêtes. Flask jsonifie presque tout seul — presque.",
    "statement": "Tu vas écrire une petite API REST JSON disciplinée.\n\n1. `GET /api/produits` : la liste complète en JSON (`jsonify`), avec `?categorie=Cereales` et `?q=gari` en filtres combinables (query string, pas corps).\n2. `GET /api/produits/<int:id>` : le produit seul ; id inconnu → **404 JSON** `{\"erreur\": \"Produit introuvable\", \"code\": \"NOT_FOUND\"}` via un gestionnaire `@app.errorhandler(404)` qui répond en JSON (plus jamais la page HTML par défaut pour l'API).\n3. `POST /api/produits` : crée un produit depuis le JSON du corps (`request.get_json()`), validation : nom string 2-80, prix int > 0, categorie dans une liste blanche, unite requise — erreurs → 422 JSON avec la liste des champs fautifs ; succès → **201** + en-tête `Location` vers la nouvelle ressource.\n4. `PATCH /api/produits/<int:id>` : mise à jour partielle (seuls les champs fournis changent ; même validation par champ) → 200 + l'objet.\n5. `DELETE /api/produits/<int:id>` : supprime → **204 No Content** (corps vide).\n6. `GET /api/stats` : nombre de produits, prix min/max/moyenne entière par catégorie — calculé en Python pur.\n7. Protège le JSON mal formé : `request.get_json(silent=True)` et 400 explicite si le corps n'est pas du JSON valide.\n\nCe qui est évalué : la discrimination GET/safe vs POST/mutation, les statuts HTTP précis (201, 204, 400, 404, 422), la validation JSON métier, les filtres par query string, et les erreurs d'API uniformes — une API qui « répond HTML » en cas d'erreur est une API qui ment.",
    "constraints": [
        "Toutes les réponses de l'API sont du JSON avec le bon Content-Type (jsonify), y compris TOUTES les erreurs.",
        "Statuts exacts : 200 lecture, 201 création + Location, 204 suppression, 400 JSON mal formé, 404 inconnu, 422 validation.",
        "Les filtres ?categorie= et ?q= se combinent (ET logique) sans effet de bord.",
        "PATCH est réellement partiel : un PATCH avec {prix: 900} ne touche qu'au prix.",
        "La validation se fait AVANT toute modification de l'état — un corps invalide ne corrompt rien."
    ],
    "checklist": [
        "curl /api/produits retourne la liste JSON des 8 produits.",
        "Les filtres ?categorie= et ?q= se composent correctement (teste les deux ensemble).",
        "POST valide → 201, corps = produit créé avec son id, en-tête Location présent.",
        "POST avec prix -5 ou catégorie inconnue → 422 JSON listant les erreurs, et la liste n'a pas bougé.",
        "POST d'un corps texte non-JSON → 400 JSON explicite.",
        "PATCH sur seul le prix ne touche rien d'autre ; PATCH sur id inconnu → 404 JSON.",
        "DELETE → 204 et corps vide ; le re-GET après DELETE → 404 JSON.",
        "/api/stats retourne des agrégats justes par catégorie (vérifiés à la main).",
        "Aucune erreur de l'API ne retourne de HTML (vérifie le Content-Type même forcée : ex. méthode non autorisée gérée via errorhandler 405)."
    ],
    "hints": [
        "La validation centralisée : écris `def valider(donnees, partiel=False) -> dict:` qui retourne un dict champ→erreur ; utilise-la pour POST (partiel=False) et PATCH (partiel=True). Réponse : `return jsonify({'erreurs': erreurs}), 422`.",
        "Le 201 propre : `reponse = jsonify(p), 201` puis `reponse[0].headers['Location'] = url_for('get_produit', id=p['id'], _external=True)` — ou construis la réponse avec `reponse = make_response(jsonify(p), 201)`. Les deux marchent ; l'essentiel est que Location pointe la nouvelle ressource.",
        "Les erreurs JSON partout : `@app.errorhandler(404) def nf(e): return jsonify({'erreur': 'Produit introuvable', 'code': 'NOT_FOUND'}), 404` — refais-le pour 405 et 500. Et pour le JSON cassé : `data = request.get_json(silent=True); if data is None: return jsonify({'erreur': 'JSON invalide'}), 400`."
    ],
    "solution": {
        "lang": "py",
        "label": "app.py (extraits commentés) — solution",
        "code": "\nfrom flask import Flask, jsonify, request, url_for, make_response\n\napp = Flask(__name__)\n\nCATEGORIES = {\"Cereales\", \"Tubercules\", \"Huiles\", \"Poissons\"}\nPRODUITS = [\n    {\"id\": 1, \"nom\": \"Gari fin\", \"categorie\": \"Cereales\", \"prix\": 800, \"unite\": \"le kg\"},\n    {\"id\": 2, \"nom\": \"Huile rouge\", \"categorie\": \"Huiles\", \"prix\": 950, \"unite\": \"le litre\"},\n    # … 6 autres produits du marché …\n]\n_prochain_id = 3\n\ndef erreur(message, code_http, code=\"ERROR\"):\n    return jsonify({\"erreur\": message, \"code\": code}), code_http\n\n@app.errorhandler(404)\ndef nf(e):  # l'API ne répond JAMAIS en HTML, même pour une erreur\n    return erreur(\"Ressource introuvable\", 404, \"NOT_FOUND\")\n\n@app.errorhandler(405)\ndef method_nf(e):\n    return erreur(\"Méthode non autorisée\", 405, \"METHOD_NOT_ALLOWED\")\n\ndef valider(d, partiel=False):\n    erreurs = {}\n    if not partiel or 'nom' in d:\n        nom = d.get('nom')\n        if not isinstance(nom, str) or not 2 <= len(nom.strip()) <= 80:\n            erreurs['nom'] = \"Nom requis (2 à 80 caractères).\"\n    if not partiel or 'prix' in d:\n        if not isinstance(d.get('prix'), int) or d['prix'] <= 0:\n            erreurs['prix'] = \"Prix entier en FCFA, strictement positif.\"\n    if not partiel or 'categorie' in d:\n        if d.get('categorie') not in CATEGORIES:\n            erreurs['categorie'] = \"Catégorie hors liste : \" + \", \".join(sorted(CATEGORIES))\n    if not partiel or 'unite' in d:\n        if not isinstance(d.get('unite'), str) or not d['unite'].strip():\n            erreurs['unite'] = \"Unité de vente requise (ex. « le kg »).\"\n    return erreurs\n\n@app.post('/api/produits')\ndef creer():\n    global _prochain_id\n    d = request.get_json(silent=True)\n    if d is None:\n        return erreur(\"Corps JSON invalide ou absent.\", 400, \"BAD_JSON\")\n    erreurs = valider(d)\n    if erreurs:\n        return jsonify({\"erreurs\": erreurs}), 422          # Entité non traitable\n    p = {\"id\": _prochain_id, \"nom\": d['nom'].strip(), \"categorie\": d['categorie'],\n         \"prix\": d['prix'], \"unite\": d['unite'].strip()}\n    _prochain_id += 1\n    PRODUITS.append(p)\n    rep = make_response(jsonify(p), 201)\n    rep.headers['Location'] = url_for('lire', id=p['id'], _external=True)\n    return rep\n\n@app.get('/api/produits')\ndef lister():\n    items = PRODUITS\n    cat, q = request.args.get('categorie'), (request.args.get('q') or '').lower()\n    if cat: items = [p for p in items if p['categorie'] == cat]\n    if q:   items = [p for p in items if q in p['nom'].lower()]\n    return jsonify(items)\n\n@app.get('/api/produits/<int:id>')\ndef lire(id):\n    p = next((p for p in PRODUITS if p['id'] == id), None)\n    return jsonify(p) if p else erreur(\"Produit introuvable\", 404, \"NOT_FOUND\")\n",
        "explain": "Une API professionnelle se juge à ses erreurs autant qu'à ses succès. Observe : TOUT ce qui sort est du JSON, même le 404 et le 405 — une app mobile ne sait pas afficher ta page d'erreur HTML. Les statuts portent le sens : 201 dit « créé » et Location dit « où » ; 422 distingue la validation en échec du 400 qui signale un JSON syntaxiquement cassé — le client sait alors s'il doit corriger son format ou ses données. La validation mutualisée (valider avec partiel) est le secret du PATCH propre : les mêmes règles, appliquées uniquement aux champs présents. Enfin, get_json(silent=True) : sans ce garde-fou, un corps mal formé lève une exception et voilà ta 500 HTML de la honte."
    },
    "criteria": [
        "CRUD JSON complet avec statuts HTTP exacts (201+Location, 204, 400, 404, 422) et erreurs uniformes.",
        "Filtres combinables et validation métier ferme (aucun état corrompu par une entrée invalide).",
        "Content-Type JSON systématique, y compris sur toutes les erreurs testées à curl."
    ],
    "variants": [
        "Ajoute un tri `?tri=prix_desc` / `prix_asc` / `nom` avec liste blanche.",
        "Ajoute une pagination `?page=2&limite=5` et un en-tête X-Total.",
        "Défi : mets l'API dans un Blueprint `bp = Blueprint('api', __name__, url_prefix='/api')` et déplace toutes les routes dedans."
    ],
    "related": [
        "fk-api-rest",
        "fk-erreurs",
        "fk-requetes",
        "fk-blueprints"
    ]
},
{
    "id": "exo-fk-api-auth",
    "level": "projet",
    "title": "L'API de la coopérative : sessions, SQLite et tests curl",
    "icon": "key",
    "minutes": 110,
    "kind": "checklist",
    "setup": "Projet `fk-coop` avec cette structure :\n\n```\nfk-coop/\n├── app.py            # fabrique + routes auth\n├── api.py            # blueprint /api (produits, commandes)\n├── db.py             # get_db, init-db (SQLite)\n├── schema.sql\n├── templates/ (base.html, login.html)\n├── tests_curl.sh     # ton script de tests\n└── data/\n```",
    "context": "La coopérative de maraîchères de Sèmè-Kpodji veut piloter ses stocks depuis le téléphone des déléguées : consultation libre des prix, mais seules les déléguées connectées peuvent modifier et enregistrer des commandes. Derrière le web classique (login pointant sur une session), une vraie API JSON protégée. À toi de construire le tout, de le persister et de le prouver à coups de curl.",
    "statement": "Tu vas livrer une API complète avec authentification par session, persistance SQLite et script de vérification.\n\n1. **Base.** `schema.sql` : `utilisatrices` (id, nom unique, mot_de_passe TEXT — haché !), `produits` (id, nom, prix, stock), `commandes` (id, produit_id FK, quantite, total, cree_le, utilisatrice_id FK). Commande `init-db` + jeu de données : 2 déléguées (awa/cotonou2026, berthe/semecity2026) et 6 produits maraîchers.\n2. **Auth web.** `/connexion` GET/POST : vérification via `werkzeug.security.check_password_hash` (les mots de passe en base sont générés avec `generate_password_hash` — jamais en clair). Succès → `session['uid'] = id` + redirect ; échec → ré-affichage 401 avec message générique (« identifiants incorrects », sans préciser lequel — sécurité basique). `/deconnexion` vide la session.\n3. **Garde API.** Décorateur maison `@requiert_connexion` qui retourne 401 JSON si `session['uid']` absent. Applique-le aux routes d'écriture.\n4. **API.** `GET /api/produits` public (avec `?q=`). `POST /api/commandes` protégé : JSON `{produit_id, quantite}` ; validation métier complète ; **transaction** : vérifie le stock, décrémente, insère la commande (total = quantite × prix LU EN BASE, jamais envoyé par le client !) ; stock insuffisant → 409 JSON ; succès → 201 + Location. `GET /api/commandes` protégé : seulement les commandes de la personne connectée (WHERE utilisatrice_id = ?). `DELETE /api/commandes/<id>` : seulement ses propres commandes, et restaure le stock (transaction).\n5. **Indispensable sécurité** : tout SQL paramétré ; les montants recalculés côté serveur ; les sessions signées par une SECRET_KEY lue depuis l'environnement (`os.environ.get('SECRET_KEY', 'dev')` et un avertissement en commentaire).\n6. **Script de preuve** `tests_curl.sh` : au moins 12 commandes curl qui démontrent : consultation publique OK ; POST sans cookie → 401 ; connexion fausse → 401 HTML ; connexion awa → cookie ; POST commande valide → 201 (stock décrémenté vérifié par GET) ; sur-commande → 409 ; GET commandes d'awa ≠ celles de berthe ; DELETE de la commande d'autrui → 403 ; DELETE de sienne → 204 + stock restauré ; JSON cassé → 400 ; injection `' OR '1'='1` dans q → aucun effet suspect.\n\nCe qui est évalué : l'authentification sans framework lourd (session signée + hash), la séparation public/privé, la transaction multi-écritures atomique, l'interdiction absolue des montants venant du client, et surtout l'habitude professionnelle de démontrer par des tests reproductibles ce que tu prétends avoir construit.",
    "constraints": [
        "Aucun mot de passe en clair : generate_password_hash à l'inscription du seed, check_password_hash à la connexion.",
        "Le prix d'une commande est TOUJOURS relu en base ; tout montant du client est ignoré.",
        "Autorisation fine : une déléguée ne voit et ne supprime que ses commandes (id + utilisatrice_id dans la clause WHERE).",
        "Stock + commande se modifient ensemble ou pas du tout : transaction (commit unique, rollback sur erreur).",
        "Le script tests_curl.sh est exécutable et AUTO-PORTANT : il repart d'une base initialisée."
    ],
    "checklist": [
        "La base contient des hashes (commençant par pbkdf2: ou scrypt:), aucun mot de passe lisible.",
        "Un GET public fonctionne sans cookie ; un POST sans cookie reçoit 401 JSON.",
        "Un message d'erreur de connexion est identique pour « nom inconnu » et « mot de passe faux ».",
        "Après commande, le stock a exactement baissé de la quantité commandée (vérifié en base).",
        "La commande enregistre le prix du moment même si le client envoie prix: 1 (le champ est ignoré).",
        "En cas de stock insuffisant : 409, aucune écriture partielle (stock intact, pas de commande).",
        "awa ne voit ni ne supprime les commandes de berthe (403 + pas de fuite par GET).",
        "Supprimer sa commande restaure le stock exactement (test d'aller-retour au début et à la fin du script).",
        "Le script tests_curl.sh passe entièrement au vert deux fois de suite (idempotent, base réinitialisée).",
        "SECRET_KEY provient de l'environnement avec repli documenté ; le mode debug est désactivé en dehors du dev."
    ],
    "hints": [
        "Le décorateur : `def requiert_connexion(f): @wraps(f) def wrapper(*a, **kw): if 'uid' not in session: return jsonify({'erreur': 'Connexion requise'}), 401; return f(*a, **kw); return wrapper`. Importe wraps depuis functools, sinon tes noms de fonctions s'écrasent.",
        "La transaction : fais les trois écritures sur la même connexion puis UN seul db.commit() à la fin ; entoure d'un try/except qui db.rollback() sur erreur. Et n'oublie pas de relire le prix : `row = db.execute('SELECT prix, stock FROM produits WHERE id = ?', (pid,)).fetchone()`.",
        "curl pas à pas : `curl -c awa.jar -X POST -H 'Content-Type: application/json' -d '{\"nom\":\"awa\",\"mot_de_passe\":\"cotonou2026\"}' http://127.0.0.1:5000/api/connexion` stocke le cookie ; `curl -b awa.jar …` le rejoue. Ton script enchaîne exactement ça et vérifie les codes avec `-w '%{http_code}'`."
    ],
    "solution": {
        "lang": "py",
        "label": "api.py + auth.py (extraits commentés) — solution",
        "code": "\nfrom functools import wraps\nfrom flask import Blueprint, g, jsonify, request, session\nfrom werkzeug.security import generate_password_hash, check_password_hash\nfrom db import get_db\n\napi = Blueprint('api', __name__, url_prefix='/api')\n\ndef requiert_connexion(f):\n    @wraps(f)                                   # préserve le nom → sinon collisions de routes\n    def wrapper(*args, **kwargs):\n        if 'uid' not in session:\n            return jsonify({'erreur': 'Connexion requise'}), 401\n        return f(*args, **kwargs)\n    return wrapper\n\n@api.post('/connexion')\ndef connexion():\n    d = request.get_json(silent=True) or {}\n    row = get_db().execute('SELECT * FROM utilisatrices WHERE nom = ?',\n                           (d.get('nom', ''),)).fetchone()\n    # Message générique : un attaquant ne doit pas deviner quel champ est faux.\n    if row is None or not check_password_hash(row['mot_de_passe'], d.get('mot_de_passe', '')):\n        return jsonify({'erreur': 'Identifiants incorrects'}), 401\n    session.clear()\n    session['uid'] = row['id']\n    return jsonify({'ok': True, 'nom': row['nom']})\n\n@api.post('/commandes')\n@requiert_connexion\ndef commander():\n    d = request.get_json(silent=True)\n    if not isinstance(d, dict) or not isinstance(d.get('produit_id'), int) \\\n       or not isinstance(d.get('quantite'), int) or d['quantite'] <= 0:\n        return jsonify({'erreur': '{produit_id: int, quantite: int > 0} attendu'}), 422\n    db = get_db()\n    prod = db.execute('SELECT * FROM produits WHERE id = ?', (d['produit_id'],)).fetchone()\n    if prod is None:\n        return jsonify({'erreur': 'Produit inconnu'}), 404\n    if prod['stock'] < d['quantite']:\n        return jsonify({'erreur': f\"Stock insuffisant ({prod['stock']} disponible)\"}), 409\n    try:\n        # Le PRIX VIENT DE LA BASE — le client n'a pas voix au chapitre. ⚠\n        total = prod['prix'] * d['quantite']\n        db.execute('UPDATE produits SET stock = stock - ? WHERE id = ?',\n                   (d['quantite'], prod['id']))\n        cur = db.execute(\n            'INSERT INTO commandes (produit_id, quantite, total, utilisatrice_id) VALUES (?, ?, ?, ?)',\n            (prod['id'], d['quantite'], total, session['uid']))\n        db.commit()                           # tout ou rien : stock + commande ensemble\n    except Exception:\n        db.rollback()\n        return jsonify({'erreur': 'Commande impossible, rien n\\\\'a été modifié'}), 500\n    rep = jsonify({'id': cur.lastrowid, 'total': total}), 201\n    return rep\n",
        "explain": "Trois verrous rendent cette API digne de confiance. Verrou un : le hachage — la base peut fuiter demain, les mots de passe resteront illisibles (pbkdf2 les re-calcule à chaque vérification, lentement, c'est voulu). Verrou deux : le prix relu en base, parce qu'un client peut envoyer n'importe quoi ; dès qu'un montant traverse le réseau, il n'est qu'une REVENDICATION, pas une information. Verrou trois : la transaction — décrémenter le stock et insérer la commande forment une seule action logique ; sans commit unique et rollback, une coupure au milieu te laisserait un stock décompté sans commande en face. Ajoute le décorateur 401 JSON, l'autorisation à double clé (id de commande ET id d'utilisatrice dans le WHERE) et les tests curl reproductibles : l'ensemble forme exactement le genre d'API qu'une petite organisation peut faire tourner des années."
    },
    "criteria": [
        "Authentification hachée + sessions, séparation public/privé propre, messages d'erreur sans fuite.",
        "Commandes transactionnelles, prix relus en base, autorisation par propriétaire démontrée.",
        "Suite tests_curl.sh complète, exécutable, verte deux fois, preuve des cas de sécurité."
    ],
    "variants": [
        "Ajoute un rôle 'gestionnaire' : seule elle peut modifier les produits (décorateur @requiert_role).",
        "Journalise les connexions échouées dans une table audit (qui, quand).",
        "Défi : remplace la session par un jeton d'API par déléguée (table jetons, en-tête Authorization: Bearer) tout en gardant la session web."
    ],
    "related": [
        "fk-sessions",
        "fk-api-rest",
        "fk-blueprints",
        "fk-erreurs",
        "fk-configuration",
        "fk-sqlalchemy"
    ]
}
  ]
};
