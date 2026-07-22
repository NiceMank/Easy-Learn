/* ============================================================
   data-flask.js — Contenu pédagogique Flask (module complet)
   Couvre : démarrage & debug, routing, requêtes/réponses,
   fichiers statiques, contextes, Jinja2 (bases + héritage),
   sessions/cookies/flash, SQLAlchemy, formulaires & Flask-WTF,
   configuration, blueprints & factory, gestion des erreurs,
   extensions (Login/Migrate), API REST, déploiement WSGI.
   Même contrat de données (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.flask = {
  id: 'flask',
  name: 'Flask',
  icon: 'science',
  tagline: 'Le micro-framework web Python : routes, Jinja2, formulaires, SQLAlchemy, API REST — léger par défaut, extensible à volonté.',
  heroTitle: 'Flask, le web Python sans chichi',

  categories: [
    /* ======================================================
       1. DÉMARRER
       ====================================================== */
    {
      id: 'demarrer',
      name: 'Démarrer',
      icon: 'flag',
      fiches: [
        {
          id: 'fk-demarrage',
          title: 'Première application, structure & debug',
          icon: 'science',
          level: 'Débutant',
          tagline: 'Cinq lignes pour un serveur web — et les deux lignes qui sauvent : __main__ et --debug.',
          intro: 'Flask se présente comme un **micro-framework** : le cœur tient en une poignée de concepts (routes + vues), et tout le reste — BDD, auth, formulaires — est une **extension** que tu ajoutes si besoin. C\'est l\'inverse de Django : rien d\'imposé, tout se compose. Voici la plus petite app possible, puis comment elle grandit proprement.',
          blocks: [
            { t: 'h3', h: 'Bonjour le monde' },
            { t: 'code', lang: 'bash', code:
'# Dans un environnement virtuel activé (fiche venv !)\npip install flask' },
            { t: 'code', lang: 'py', label: 'app.py', code:
'from flask import Flask\n\napp = Flask(__name__)        # __name__ = nom du module :\n                             # Flask sait où il vit (templates, static…)\n\n@app.get("/")                # route : l\'URL "/" appelle cette fonction ("vue")\ndef accueil():\n    return "<h1>Bonjour depuis Cotonou !</h1>"\n\nif __name__ == "__main__":   # uniquement si on lance CE fichier (fiche venv)\n    app.run(debug=True)      # rechargement auto + page d\'erreur interactive' },
            { t: 'code', lang: 'bash', code:
'# Lancement, deux portes d\'entrée :\npython app.py                      # grâce au garde-fou __main__\nflask --app app run --debug        # le CLI officiel (recommandé)\n\n# → http://127.0.0.1:5000  (serveur de DÉVELOPPEMENT — jamais en prod)' },
            { t: 'h3', h: 'La structure qui grandit sans douleur' },
            { t: 'code', lang: 'bash', code:
'monprojet/\n├── .venv/                # l\'environnement (jamais versionné)\n├── app.py                # → deviendra create_app() quand ça grandit\n├── requirements.txt      # pip freeze > requirements.txt\n├── static/               # css, js, images — servis tels quels\n│   └── css/site.css\n└── templates/            # les fichiers Jinja2 (.html)\n    ├── base.html\n    └── accueil.html' },
            { t: 'p', h: 'Deux conventions à adopter dès le premier jour : un dossier `templates/` (Flask le trouve tout seul pour `render_template`) et un dossier `static/`. Tout le reste — blueprints, factory, packages — vient quand le fichier dépasse ~300 lignes, pas avant : Flask récompense l\'itération.' },
            { t: 'h3', h: 'Le mode debug, ton meilleur ami… local' },
            { t: 'p', h: 'Avec `debug=True` (ou `--debug`), Flask **recharge le serveur à chaque sauvegarde** et, en cas d\'erreur, affiche une page avec le traceback complet **et une console Python interactive sur chaque frame**. C\'est un luxe de développement absolu — et une faille de sécurité cataclysmique en production : cette console exécute du Python ARBITRAIRE sur ton serveur. Debug = jamais, jamais en prod (fiche Déploiement).' },
            { t: 'callout', kind: 'tip', h: 'Apprends à lire la page d\'erreur du debugger : le traceback se lit de bas en haut (la dernière ligne = la cause), et cliquer une ligne affiche les variables locales à cet instant. C\'est ta compagne quotidienne — plus elle te parle tôt, plus elle t\'économise.' }
          ],
          errors: [
            { title: 'Oublier le garde-fou __main__', bad: 'app.run()        # sans garde-fou, tout en haut niveau\n# `import app` (tests, gunicorn, autre module)…\n# DÉMARRE LE SERVEUR : blocage, double instance, bugs absurdes', good: 'if __name__ == "__main__":\n    app.run(debug=True)\n# ou ne jamais appeler run() et tout passer par le CLI flask', why: 'Importer un module l\'exécute en entier : sans garde-fou, le serveur démarre dès l\'import — alors qu\'un serveur WSGI ou un test veulent juste l\'objet app. Le garde-fou sépare "bibliothèque" de "programme lancé".' },
            { title: 'debug=True qui reste en production', bad: 'app.run(debug=True, host="0.0.0.0")   # poussé en ligne tel quel', good: '# En prod : serveur WSGI (gunicorn) + debug explicitement FALSh\n# (FLASK_DEBUG=0) — fiche Déploiement', why: 'Le debugger Werkzeug ouvre une console Python interactive dans le navigateur à quiconque provoque une erreur : exécution de code à distance. C\'est LA bêtise classique du premier déploiement Flask.' }
          ],
          related: ['fk-routing', 'py-modules-venv', 'fk-configuration', 'fk-deploiement']
        }
      ]
    },

    /* ======================================================
       2. ROUTING & REQUÊTES
       ====================================================== */
    {
      id: 'routing',
      name: 'Routing & requêtes',
      icon: 'alt_route',
      fiches: [
        {
          id: 'fk-routing',
          title: 'Routes, URLs dynamiques & url_for',
          icon: 'alt_route',
          level: 'Débutant',
          tagline: '@app.route, convertisseurs <int:id>, méthodes HTTP — et ne plus JAMAIS écrire une URL à la main.',
          intro: 'Le routing, c\'est la table des matières de ton application : chaque décorateur `@app.route("/chemin")` associe une URL à une **fonction vue**. Flask va plus loin que les chemins fixes : des segments **dynamiques capturés en arguments**, des filtres par **méthode HTTP**, et surtout `url_for`, qui génère les URLs à partir des noms de vues — fini les chemins bricolés en chaînes.',
          blocks: [
            { t: 'h3', h: 'Segments dynamiques & convertisseurs' },
            { t: 'code', lang: 'py', code:
'@app.get("/hello/<nom>")               # <nom> : chaîne sans "/"\ndef hello(nom):                         # reçu en ARGUMENT de la vue\n    return f"<h1>Salut {nom} !</h1>"\n\n@app.get("/article/<int:id>")          # int : 404 automatique si non numérique !\ndef article(id):\n    return f"Article n°{id}"\n\n@app.get("/docs/<path:fichier>")       # path : accepte les "/"\ndef docs(fichier):\n    return f"Tu lis : {fichier}"' },
            { t: 'table', head: ['Convertisseur', 'Accepte', 'Exemple'], rows: [
              ['`<nom>` (string)', 'tout texte sans `/`', '`/hello/awa`'],
              ['`<int:id>`', 'entiers uniquement', '`/article/42` → 404 pour `/article/abc`'],
              ['`<float:x>`', 'décimaux', '`/note/4.5`'],
              ['`<path:p>`', 'texte avec `/`', '`/docs/api/v1/intro`'],
              ['`<uuid:u>`', 'identifiants UUID', '`/cle/3f2a…`']
            ]},
            { t: 'h3', h: 'Méthodes HTTP : une URL, plusieurs intentions' },
            { t: 'code', lang: 'py', code:
'from flask import request\n\n# Forme historique : une vue, plusieurs méthodes\n@app.route("/contact", methods=["GET", "POST"])\ndef contact():\n    if request.method == "POST":\n        return "Message reçu !"\n    return render_template("contact.html")\n\n# Forme moderne (Flask 2+) : une vue par intention — plus lisible\n@app.get("/contact")     # afficher le formulaire\n@app.post("/contact")    # traiter la soumission' },
            { t: 'h3', h: 'url_for : les URLs par leur NOM' },
            { t: 'code', lang: 'py', code:
'from flask import url_for\n\nurl_for("article", id=42)        # → "/article/42"\nurl_for("accueil", page=3)       # → "/?page=3"  (le surplus = query string)\nurl_for("static", filename="css/site.css")   # les assets aussi !\n\n# Dans un template Jinja — la règle d\'or :\n# <a href="{{ url_for("article", id=a.id) }}">{{ a.titre }}</a>' },
            { t: 'p', h: '`url_for` prend le **nom de la fonction vue** (l\'endpoint), pas son URL. Les arguments deviennent les segments dynamiques, et tout ce qui dépasse part en query string. Si demain tu déplaces la vue de `/article/<int:id>` à `/blog/<int:id>`, **aucun lien à corriger** : tout suit automatiquement.' },
            { t: 'callout', kind: 'tip', h: 'En cas de doute sur les routes existantes : `flask routes` dans le terminal liste toute la table (URL → endpoint → méthodes). Le premier réflexe quand un `url_for` lève `BuildError` : le nom d\'endpoint invoqué existe-t-il dans cette liste ?' }
          ],
          errors: [
            { title: 'URLs construites à la main', bad: 'return f"<a href=\\"/article/{id}\\">Lire</a>"\n# casse au premier url_prefix, hébergement sous-dossier,\n# ou espace/accident de caractère non échappé', good: 'return redirect(url_for("article", id=id))\n# ou dans le template : {{ url_for("article", id=id) }}', why: 'Les chemins codés en dur ignorent la table de routage : ils ne suivent ni les préfixes (blueprints) ni l\'encodage des caractères spéciaux. url_for est la SEULE source fiable — et elle échappe pour toi.' },
            { title: 'Deux vues, un seul nom : collision d\'endpoints', bad: '@app.get("/a")\ndef liste(): ...\n@app.get("/b")\ndef liste(): ...\n# AssertionError: View function mapping is overwriting…', good: '@app.get("/a")\ndef liste_a(): ...\n@app.get("/b")\ndef liste_b(): ...', why: 'Le nom de la fonction = l\'endpoint : deux routes avec la même fonction (ou le même nom) s\'écrasent l\'une l\'autre au démarrage. Les noms de vues doivent être uniques — url_for s\'y réfère.' }
          ],
          related: ['fk-requetes', 'fk-templates', 'py-decorateurs', 'fk-blueprints']
        },

        {
          id: 'fk-requetes',
          title: 'Requêtes & réponses',
          icon: 'swap_vert',
          level: 'Débutant',
          tagline: 'request.args pour l\'URL, request.form pour les formulaires, get_json pour le JSON — et la réponse en tuple.',
          intro: 'Chaque vue reçoit une requête et produit une réponse. Flask expose la première via l\'objet `request` (un objet « magique » qui désigne toujours la requête **en cours**) et rend la seconde triviale : retourne une chaîne, un dict (JSON automatique), ou un **tuple** pour contrôler code de statut et en-têtes. Le tout est de savoir dans quelle poche de la requête chercher.',
          blocks: [
            { t: 'h3', h: 'Les quatre poches de la requête' },
            { t: 'code', lang: 'py', code:
'from flask import request, redirect, url_for\n\n@app.get("/recherche")\ndef recherche():\n    # 1. QUERY STRING : /recherche?q=alloco&page=2\n    q = request.args.get("q", "")\n    page = request.args.get("page", 1, type=int)   # conversion + défaut\n\n@app.post("/inscription")\ndef inscription():\n    # 2. FORMULAIRE HTML : <form method="post">, champs name=…\n    pseudo = request.form.get("pseudo", "").strip()\n\n    # 3. FICHIERS (enctype="multipart/form-data") :\n    avatar = request.files.get("avatar")\n\n@app.post("/api/taches")\ndef creer_tache():\n    # 4. CORPS JSON (fetch / client JS) :\n    donnees = request.get_json()       # → dict Python, ou None' },
            { t: 'p', h: 'Réflexe de lecture : `args` = ce qui est dans l\'**URL** (après le `?`), `form` = un **formulaire HTML** posté, `files` = les **fichiers** du formulaire, `get_json()` = un **corps JSON** envoyé par du JavaScript ou une appli. Tous acceptent `.get("clé", défaut)` — même philosophie que les dictionnaires (fiche Structures Python).' },
            { t: 'h3', h: 'Construire la réponse : retour simple, dict ou tuple' },
            { t: 'code', lang: 'py', code:
'@app.get("/")\ndef accueil():\n    return "<h1>Accueil</h1>"                    # HTML, statut 200\n\n@app.get("/api/taches")\ndef taches():\n    return {"taches": ["t1", "t2"]}              # dict → JSON AUTOMATIQUE\n\n@app.post("/api/taches")\ndef creer():\n    return {"id": 1, "texte": "…"}, 201          # (corps, STATUT)\n\n@app.get("/vieux-blog")\ndef vieux():\n    return redirect(url_for("accueil"))          # 302 vers une autre vue\n\nfrom flask import make_response\n@app.get("/telechargement")\ndef export():\n    resp = make_response("a,b,c\\n1,2,3\\n")      # contrôle total\n    resp.headers["Content-Type"] = "text/csv"\n    resp.headers["Content-Disposition"] = "attachment; filename=export.csv"\n    return resp' },
            { t: 'table', head: ['Statut', 'Sens', 'Quand'], rows: [
              ['`200`', 'OK', 'lecture réussie (défaut)'],
              ['`201`', 'Créé', 'POST de création abouti'],
              ['`204`', 'OK sans contenu', 'DELETE réussi'],
              ['`302`', 'Redirection', 'après un POST réussi, page déplacée'],
              ['`400`', 'Requête invalide', 'données manquantes / malformées'],
              ['`404`', 'Introuvable', 'id inexistant — `get_or_404` / `abort(404)`'],
              ['`500`', 'Erreur serveur', 'exception non traitée dans la vue']
            ]},
            { t: 'callout', kind: 'warn', h: '`request` n\'est pas une variable globale ordinaire : c\'est un **proxy** vers la requête du thread courant (fiche Contextes). Conséquence pratique : il n\'existe que PENDANT une requête — l\'utiliser dans un script ou une tâche de fond lève `RuntimeError: Working outside of request context`.' }
          ],
          errors: [
            { title: 'Chercher le POST dans request.args', bad: 'pseudo = request.args.get("pseudo")\n# None… alors que le formulaire est bien rempli !', good: 'pseudo = request.form.get("pseudo")\n# args = URL ; form = corps de formulaire ; json = corps JSON', why: 'Les trois poches sont distinctes et ne se mélangent PAS : une valeur postée n\'apparaît jamais dans args. Quand une donnée « disparait », vérifier d\'abord qu\'on lit la bonne poche.' },
            { title: 'Renvoyer un tuple dans le mauvais ordre', bad: 'return 201, {"id": 1}\n# TypeError / réponse incohérente', good: 'return {"id": 1}, 201\n# ordre : (corps, statut) — ou (corps, statut, en-têtes)', why: 'Le contrat du tuple est (body, status, headers) : le statut en premier inverse le protocole. Astuce mémo : le corps vient toujours en premier, le reste précise.' }
          ],
          related: ['fk-routing', 'fk-sessions', 'fk-formulaires', 'html-formulaires']
        },

        {
          id: 'fk-statiques',
          title: 'Fichiers statiques',
          icon: 'folder',
          level: 'Débutant',
          tagline: 'static/ servi tel quel, url_for partout — et pourquoi les uploads n\'y vivent pas.',
          intro: 'CSS, JavaScript, images, polices : tout ce qui n\'est pas généré dynamiquement vit dans le dossier `static/`, servi automatiquement sous l\'URL `/static/...` en développement. La seule règle à retenir est celle des liens : **toujours via `url_for`**, jamais en dur — le reste n\'est qu\'organisation et bonnes habitudes de déploiement.',
          blocks: [
            { t: 'h3', h: 'La convention : static/ + url_for' },
            { t: 'code', lang: 'bash', code:
'static/\n├── css/site.css\n├── js/app.js\n└── img/logo.png' },
            { t: 'code', lang: 'html', code:
'<!-- templates/base.html — des LIENS GÉNÉRÉS, jamais écrits à la main -->\n<link rel="stylesheet" href="{{ url_for("static", filename="css/site.css") }}">\n<img src="{{ url_for("static", filename="img/logo.png") }}" alt="Logo">\n<script src="{{ url_for("static", filename="js/app.js") }}" defer></script>' },
            { t: 'p', h: '`filename` est **relatif au dossier static/** : sous-dossiers inclus. Si demain l\'app est montée sous `/blog/` ou derrière un CDN préfixé, `url_for("static", …)` suit sans qu\'on touche un seul template. C\'est la même assurance que pour les vues (fiche Routing).' },
            { t: 'h3', h: 'Le cache navigateur : le paramètre anti-staleness' },
            { t: 'code', lang: 'html', code:
'<!-- Le navigateur met /static/… en cache AGRESSIVEMENT.\n     Après une modif CSS, force le rechargement en versionnant : -->\n<link rel="stylesheet" href="{{ url_for("static", filename="css/site.css") }}?v=3">' },
            { t: 'h3', h: 'Fichiers envoyés par les utilisateurs : ailleurs !' },
            { t: 'code', lang: 'py', code:
'from flask import send_from_directory\nimport os\n\nUPLOADS = os.path.join(app.instance_path, "uploads")   # hors static/\n\n@app.get("/uploads/<path:nom>")\ndef fichier_uploade(nom):\n    # send_from_directory sert SÛREMENT (anti ../) un dossier dédié\n    return send_from_directory(UPLOADS, nom)' },
            { t: 'callout', kind: 'tip', h: 'En production, le couple idéal : **nginx** (ou un CDN) sert `static/` directement à la vitesse du disque, et ne laisse à Flask que le dynamique. Le serveur de dev gère tout seul — inutile de configurer quoi que ce soit avant le déploiement.' }
          ],
          errors: [
            { title: 'Chemins statiques écrits en dur', bad: '<link href="/static/css/site.css" rel="stylesheet">\n<!-- casse dès que l\'app est servie sous /blog/ ou via CDN -->', good: '<link href="{{ url_for("static", filename="css/site.css") }}" rel="stylesheet">', why: 'Le préfixe de montage de l\'app n\'est pas toujours "/" : un chemin absolu en dur ignore le contexte de déploiement. url_for recalcule le bon préfixe à chaque environnement.' },
            { title: 'Stocker les uploads utilisateurs dans static/', bad: 'avatar.save("static/uploads/avatar.png")\n# puis au redéploiement : les avatars ONT DISPARU', good: '# Dossier dédié hors code versionné (+ volume persistant),\n# servi via send_from_directory ou le serveur web', why: 'Un déploiement propre remplace souvent tout le répertoire applicatif : static/ fait partie du CODE. Les données utilisateurs sont des DONNÉES — elles vivent hors du déploiement, avec la base de données.' }
          ],
          related: ['fk-templates', 'fk-blueprints', 'fk-deploiement']
        },

        {
          id: 'fk-contexte',
          title: 'Contextes : request, g & current_app',
          icon: 'layers',
          level: 'Avancé',
          tagline: 'Pourquoi request fonctionne sans argument, où ranger les données d\'UNE requête, et l\'erreur "outside of context".',
          intro: 'Flask fait un petit tour de passe-passe : `request` semble global mais désigne toujours la requête **du thread courant**. Ce confort a un prix à comprendre : deux **contextes** (application et requête) encadrent l\'exécution, et les objets magiques (`request`, `session`, `g`, `current_app`) n\'existent qu\'à l\'intérieur. C\'est LE chapitre qui transforme les erreurs bizarres de Flask en non-événements.',
          blocks: [
            { t: 'h3', h: 'Les deux contextes, en une image' },
            { t: 'p', h: 'Le **contexte d\'application** est actif tant que l\'app « travaille » : il expose `current_app` (l\'app courante, sans l\'importer !) et `g` (un fourre-tout). Le **contexte de requête**, plus étroit, n\'existe que PENDANT le traitement d\'une requête HTTP : il ajoute `request` et `session`. Les vues vivent dans les deux ; un script lancé à la main n\'a **aucun des deux** — d\'où l\'erreur légendaire.' },
            { t: 'h3', h: 'g : le sac à dos d\'une requête' },
            { t: 'code', lang: 'py', code:
'from flask import g, request\n\n@app.before_request\ndef charger_utilisateur():\n    # s\'exécute AVANT chaque vue : on prépare le terrain\n    token = request.headers.get("X-Token")\n    g.user = trouver_user_par_token(token)     # vit UNE requête, puis meurt\n\n@app.get("/moi")\ndef moi():\n    return {"pseudo": g.user.pseudo}           # dispo dans TOUTE la requête\n\nteardown = app.teardown_appcontext\ndef fermer_db(erreur=None):\n    pass  # → ici se ferment les ressources (connexion BDD maison…)' },
            { t: 'p', h: '`g` est un **objet vide réinitialisé à chaque requête** : parfait pour l\'utilisateur connecté, la connexion BDD, un timing de debug — tout ce qui est « transversal MAIS éphémère ». Ni variable globale (partagée entre threads !), ni paramètre passé de vue en vue.' },
            { t: 'h3', h: 'current_app : la config sans importer app' },
            { t: 'code', lang: 'py', code:
'from flask import current_app\n\ndef envoyer_mail(destinataire):\n    serveur = current_app.config["MAIL_SERVER"]   # pas d\'import circulaire !\n    # → c\'est ainsi que les extensions parlent à l\'application' },
            { t: 'h3', h: 'Hors contexte : pousser le contexte soi-même' },
            { t: 'code', lang: 'py', code:
'# scripts/seed.py — un script LANCÉ À LA MAIN :\nfrom app import create_app\napp = create_app()\n\nwith app.app_context():          # on POUSSE le contexte manuellement\n    db.create_all()              # db a besoin de current_app !\n\n# Idem pour simuler une requête (tests, debug) :\nwith app.test_request_context("/api/taches?x=1"):\n    print(request.args)' },
            { t: 'callout', kind: 'warn', h: '`RuntimeError: Working outside of application context` (ou request context) = tu touches un objet magique sans contexte actif. Presque toujours l\'un des trois cas : script lancé à la main (→ `with app.app_context()`), tâche de fond, ou import mal placé. Jamais un bug de Flask — un contexte manquant.' }
          ],
          errors: [
            { title: 'Variable globale mutable pour partager entre vues', bad: 'PANIER = []            # au niveau du module\n@app.post("/add")\ndef add():\n    PANIER.append(request.form["id"])\n    # → partagé par TOUS les utilisateurs, dans TOUS les threads…', good: 'session["panier"].append(...)   # par UTILISATEUR (cookie signé)\n# ou g.panier pour UNE requête ; la BDD pour persister', why: 'Le module est chargé UNE fois et partagé par tous les threads/workers du serveur : une liste globale mélange les données de tous les visiteurs et des processus. Le bon périmètre : session (par utilisateur), g (par requête), BDD (persistant).' },
            { title: 'Utiliser request dans un script ou un timer', bad: 'def tache_planifiee():\n    print(request.remote_addr)\n# RuntimeError: Working outside of request context', good: '# Passer les données nécessaires en ARGUMENTS au moment\n# de la requête : lancer_tache(ip=request.remote_addr)\n# ou pousser un contexte de test si vraiment indispensable', why: 'Hors d\'une requête HTTP, l\'objet request ne désigne… rien. Les données de requête doivent être CAPTURÉES pendant la requête puis passées explicitement au code différé — c\'est aussi ce qui rend ce code testable.' }
          ],
          related: ['fk-sessions', 'fk-blueprints', 'fk-sqlalchemy', 'py-modules-venv']
        }
      ]
    },

    /* ======================================================
       3. TEMPLATES JINJA2
       ====================================================== */
    {
      id: 'templates',
      name: 'Templates Jinja2',
      icon: 'description',
      fiches: [
        {
          id: 'fk-templates',
          title: 'Jinja2 : les bases',
          icon: 'description',
          level: 'Débutant',
          tagline: '{{ }} pour afficher, {% %} pour décider — et l\'autoescape qui bloque les XSS sans y penser.',
          intro: 'Flask ne génère pas le HTML en concaténant des chaînes (imagine l\'enfer) : il délègue à **Jinja2**, un moteur de templates où le HTML reste du HTML et la logique tient dans deux syntaxes — `{{ }}` pour **afficher** une valeur, `{% %}` pour **contrôler** (if, for). Et un garde-fou vous protège par défaut : tout ce que `{{ }}` affiche est **échappé**, ce qui tue la majorité des failles XSS dans l\'œuf.',
          blocks: [
            { t: 'h3', h: 'De la vue au template' },
            { t: 'code', lang: 'py', code:
'from flask import render_template\n\n@app.get("/taches")\ndef taches():\n    liste = ["Acheter du gari", "Réviser Flask", "Payer le loyer"]\n    # chaque argument nommé devient une VARIABLE du template :\n    return render_template("taches.html", taches=liste, titre="Mes tâches")' },
            { t: 'code', lang: 'html', label: 'templates/taches.html', code:
'<h1>{{ titre }}</h1>\n\n{% if taches %}\n  <ul>\n  {% for t in taches %}\n    <li>{{ loop.index }}. {{ t }}</li>   <!-- loop.index : le n° de ligne -->\n  {% else %}\n    <li>Rien à faire — profitez-en !</li>  <!-- for/else : la boucle était vide -->\n  {% endfor %}\n  </ul>\n{% endif %}\n\n{# commentaire Jinja : absent du HTML final (contraire de <!-- -->) #}' },
            { t: 'p', h: 'Dans `{{ }}`, tu évalues du **Python familier** : `{{ user.pseudo }}`, `{{ taches[0] }}`, `{{ panier|length }}`, `{{ "Bonjour " + nom }}`. Dans `{% %}`, les structures de contrôle : `if/elif/else/endif`, `for/else/endfor`, `set` pour une variable locale. La logique reste volontairement limitée : un template n\'est pas un programme.' },
            { t: 'h3', h: 'L\'autoescape : ton bouclier anti-XSS' },
            { t: 'code', lang: 'html', code:
'<!-- Si un utilisateur s\'inscrit avec le pseudo : <script>alert(1)</script> -->\n<p>Bienvenue {{ pseudo }}</p>\n\n<!-- Jinja affiche LITTÉRALEMENT :\n     &lt;script&gt;alert(1)&lt;/script&gt; — texte inoffensif, pas du code ! -->' },
            { t: 'p', h: 'Tout ce qui passe par `{{ }}` est échappé **par défaut**. Le filtre `|safe` désactive ce bouclier pour du HTML de confiance (que TU as généré) — n\'y mets JAMAIS une saisie utilisateur. Et bannis `render_template_string` sur du contenu externe : un template interprété depuis une entrée utilisateur, c\'est une injection de code (SSTI).' },
            { t: 'callout', kind: 'tip', h: 'Règle de répartition : le template **affiche**, la vue **prépare**. Une condition d\'affichage (`{% if panier %}`) y a sa place ; un calcul de TVA, une requête SQL ou un appel d\'API n\'ont RIEN à faire dans un template — ils vivent dans la vue ou sinon la couche métier.' }
          ],
          errors: [
            { title: 'Injecter du HTML utilisateur avec |safe', bad: '<div>{{ commentaire|safe }}</div>\n<!-- le visiteur peut y poser un <script> voleur de cookies -->', good: '<div>{{ commentaire }}</div>\n<!-- échappé par défaut ; si HTML riche vraiment voulu :\n     passer par une lib de SANITISATION (bleach) avant -->', why: '|safe dit à Jinja « fais confiance » : dès que la source n\'est pas TON code, c\'est une porte XSS grande ouverte. L\'échappement par défaut n\'a de coût que lorsqu\'on le contourne.' },
            { title: 'Mettre la logique métier dans le template', bad: '{% for c in commandes %}\n  {% set total = c.prix * c.qte * 1.18 %}\n  {# …calculs, filtres tordus, appels cachés… #}\n{% endfor %}', good: '{# la vue prépare une liste de dicts totals déjà calculés #}\n{% for l in lignes %}\n  <tr><td>{{ l.nom }}</td><td>{{ l.total|fcfa }}</td></tr>\n{% endfor %}', why: 'Un template touffu est illisible, non testable et casse au premier changement métier. La règle : les données arrivent PRÊTES à l\'emploi ; Jinja ne fait que les poser dans le HTML.' }
          ],
          related: ['fk-templates-heritage', 'fk-statiques', 'fk-erreurs', 'py-structures']
        },

        {
          id: 'fk-templates-heritage',
          title: 'Héritage, includes & filtres',
          icon: 'mediation',
          level: 'Intermédiaire',
          tagline: 'Un base.html, des {% block %} à remplir, des filtres pour présenter — la fin du copier-coller.',
          intro: 'Sans héritage, chaque page répète doctype, menu et pied de page — et la moindre retouche se réplique partout. Jinja inverse le rapport : un **`base.html`** définit le squelette avec des **`{% block %}`** vides, et chaque page qui `{% extends %}` ce base ne remplit **que ses blocs**. Ajoute les `{% include %}` (morceaux réutilisables), les macros (fonctions de template) et les filtres (formatage), et tu tiens l\'outillage complet.',
          blocks: [
            { t: 'h3', h: 'Le parent : base.html' },
            { t: 'code', lang: 'html', label: 'templates/base.html', code:
'<!doctype html>\n<html lang="fr">\n<head>\n  <meta charset="utf-8">\n  <title>{% block title %}Mon App{% endblock %}</title>\n  <link rel="stylesheet" href="{{ url_for("static", filename="css/site.css") }}">\n</head>\n<body>\n  <nav><a href="{{ url_for("accueil") }}">Accueil</a></nav>\n  <main>\n    {% block content %}{% endblock %}   {# les enfants remplissent ICI #}\n  </main>\n  {% block scripts %}{% endblock %}\n</body>\n</html>' },
            { t: 'h3', h: 'L\'enfant : il remplit les blocs' },
            { t: 'code', lang: 'html', label: 'templates/taches.html', code:
'{% extends "base.html" %}              {# TOUJOURS en tout premier #}\n\n{% block title %}Tâches — {{ super() }}{% endblock %}\n{# super() = le contenu du bloc PARENT ("Mon App") — composition ! #}\n\n{% block content %}\n  <h1>Mes tâches</h1>\n  <ul>\n  {% for t in taches %}\n    <li>{{ t.texte }} — {{ t.prix|fcfa }}</li>\n  {% endfor %}\n  </ul>\n{% endblock %}' },
            { t: 'h3', h: 'Include (morceaux) & macro (fonctions)' },
            { t: 'code', lang: 'html', code:
'{% include "_menu.html" %}            {# colle un fragment réutilisable #}\n\n{# Une MACRO : du HTML paramétrable, importable partout #}\n{% macro carte_produit(p) %}\n  <article class="carte">\n    <h3>{{ p.nom }}</h3><p>{{ p.prix|fcfa }}</p>\n  </article>\n{% endmacro %}\n\n{% for p in produits %}{{ carte_produit(p) }}{% endfor %}' },
            { t: 'h3', h: 'Les filtres : {{ valeur|filtre }}' },
            { t: 'table', head: ['Filtre', 'Effet', 'Exemple'], rows: [
              ['`upper` / `lower` / `title`', 'casse', '`{{ nom|upper }}`'],
              ['`length`', 'taille', '`{{ taches|length }}`'],
              ['`join(", ")`', 'colle une liste', '`{{ tags|join(", ") }}`'],
              ['`default("…")`', 'si undefined/None', '`{{ surnom|default("Nouveau") }}`'],
              ['`round(2)`', 'arrondi', '`{{ taux|round(1) }}`'],
              ['`safe` / `e`', 'HTML (danger !)', '`{{ html|e }}`']
            ]},
            { t: 'code', lang: 'py', code:
'# Et les filtres MAISON, déclarés côté Flask :\n@app.template_filter("fcfa")\ndef fcfa(n):\n    return f"{n:,.0f} F".replace(",", " ")\n\n# utilisable ensuite partout : {{ produit.prix|fcfa }} → "1 500 F"' },
            { t: 'callout', kind: 'warn', h: '`{% extends %}` doit être la **première balise du fichier** (un seul parent par template — pour combiner, utilise include/macro). Placer du contenu avant extends (hors commentaire) lève une erreur immédiate : la hiérarchie se déclare d\'abord, le contenu ensuite.' }
          ],
          errors: [
            { title: 'Dupliquer le layout au lieu d\'hériter', bad: '<!-- chaque page : doctype + <head> + nav + footer copiés -->\n<!-- 30 pages × une modif de menu = 30 fichiers à éditer -->', good: '{% extends "base.html" %}\n{% block content %}…{% endblock %}\n<!-- une modif de base.html = tout le site à jour -->', why: 'La duplication de layout est THE dette technique des petits sites : l\'héritage concentre l\'ossature en UN endroit. Dès la deuxième page, on crée base.html — jamais après.' },
            { title: 'Exception Undefined sur une variable absente', bad: '{{ user.surnom }}\n{# jinja2.UndefinedError si le contexte ne la fournit pas…\n   ou pire : affichage silencieusement vide en prod #}', good: '{{ user.surnom|default("") }}\n{# ou dans la vue : render_template("p.html", surnom=user.surnom or "") #}', why: 'Une variable non fournie au template est un Undefined capricieux selon la config. Sécurise à l\'affichage (default) ou à la source (contexte complet) — et décide UNE convention pour toute l\'app.' }
          ],
          related: ['fk-templates', 'fk-sessions', 'fk-formulaires', 'fk-statiques']
        }
      ]
    },

    /* ======================================================
       4. ÉTAT & DONNÉES
       ====================================================== */
    {
      id: 'donnees',
      name: 'État & données',
      icon: 'database',
      fiches: [
        {
          id: 'fk-sessions',
          title: 'Sessions, cookies & flash',
          icon: 'vpn_key',
          level: 'Intermédiaire',
          tagline: 'session comme un dict, une SECRET_KEY qui signe — mais signé ne veut pas dire secret.',
          intro: 'HTTP est **sans état** : chaque requête arrive vierge. La **session** Flask répare ça en stockant des données par utilisateur, persistantes d\'une page à l\'autre — côté client, dans un cookie **signé** par ta `SECRET_KEY` (impossible à falsifier sans la clé… mais lisible par quiconque le décode !). Et au passage, les **messages flash** règlent le classique « afficher une confirmation UNE fois après redirection ».',
          blocks: [
            { t: 'h3', h: 'La session : un dict qui suit l\'utilisateur' },
            { t: 'code', lang: 'py', code:
'from flask import session\nimport os\n\napp.secret_key = os.environ["SECRET_KEY"]   # OBLIGATOIRE : elle SIGNE le cookie\n\n@app.post("/panier/ajouter")\ndef ajouter():\n    session.setdefault("panier", []).append(request.form["produit_id"])\n    session.modified = True          # muter une liste en place : le signaler !\n    return redirect(url_for("panier"))\n\n@app.get("/panier")\ndef panier():\n    return {"articles": session.get("panier", [])}\n\n@app.post("/deconnexion")\ndef deconnexion():\n    session.clear()                  # tout vider proprement\n    return redirect(url_for("accueil"))' },
            { t: 'callout', kind: 'warn', h: '**Signé ≠ chiffré !** Le cookie de session est LISIBLE par le navigateur (base64 décodable par tous) : il ne peut pas être MODIFIÉ sans la clé, mais son contenu n\'est pas secret. Jamais de mot de passe, jeton API ou donnée sensible dedans — un id utilisateur ou un panier, oui ; un secret, jamais.' },
            { t: 'h3', h: 'Cookies maison & durée de vie' },
            { t: 'code', lang: 'py', code:
'from flask import make_response\nfrom datetime import timedelta\n\napp.permanent_session_lifetime = timedelta(days=7)\n\n@app.get("/theme/<choix>")\ndef theme(choix):\n    resp = make_response(redirect(url_for("accueil")))\n    resp.set_cookie("theme", choix, max_age=60*60*24*365,\n                    httponly=True, samesite="Lax")   # options de SÉCURITÉ\n    return resp\n# lecture : request.cookies.get("theme", "clair")' },
            { t: 'h3', h: 'Les messages flash : la confirmation une-fois-seulement' },
            { t: 'code', lang: 'py', code:
'from flask import flash\n\n@app.post("/profil")\ndef maj_profil():\n    sauvegarder()\n    flash("Profil mis à jour !", "succes")     # catégorie libre\n    return redirect(url_for("profil"))         # PRG : message AU RENDU SUIVANT' },
            { t: 'code', lang: 'html', label: 'base.html (extrait)', code:
'{% with messages = get_flashed_messages(with_categories=true) %}\n  {% for categorie, msg in messages %}\n    <div class="alerte {{ categorie }}">{{ msg }}</div>\n  {% endfor %}\n{% endwith %}\n<!-- consommé AU PREMIER rendu : rafraîchir ne le réaffiche plus -->' },
            { t: 'p', h: 'Le duo flash + redirect résout élégamment le pattern Post-Redirect-Get : l\'action POST modifie, redirige, et la page affichée montre la confirmation — sans risquer la double soumission au rafraîchissement (fiche Formulaires).' }
          ],
          errors: [
            { title: 'SECRET_KEY courte, dure ou commitée', bad: 'app.secret_key = "dev"     # ou collée dans le Git public…', good: 'app.secret_key = os.environ["SECRET_KEY"]\n# 32+ caractères aléatoires (python -c "import secrets;\n# print(secrets.token_hex(32))"), dans le .env, DANS .gitignore', why: 'La clé signe les sessions : qui la connaît FORGE des cookies (usurpation d\'utilisateur). Une clé devinée ou leakée annule toute la protection — régénérer + jamais dans le dépôt.' },
            { title: 'Ajouter dans session sans session.modified', bad: 'session["panier"].append(id)\n# semble marcher… sauf que le cookie n\'est pas re-émis :\n# l\'article DISPARAÎT à la page suivante', good: 'session.setdefault("panier", []).append(id)\nsession.modified = True\n# (ou réassigner : session["panier"] = session["panier"] + [id])', why: 'Flask ne re-sérialise le cookie que si la session a CHANGÉ — or muter une liste en place n\'est pas détectable. session.modified = True force la réémission. Le bug « le panier n\'enregistre pas » vient de là dans 9 cas sur 10.' }
          ],
          related: ['fk-configuration', 'fk-contexte', 'fk-extensions', 'py-structures']
        },

        {
          id: 'fk-sqlalchemy',
          title: 'Bases de données avec Flask-SQLAlchemy',
          icon: 'storage',
          level: 'Intermédiaire',
          tagline: 'db.Model, db.session et get_or_404 : le SQL en objets Python — et le commit qui fait tout persister.',
          intro: 'Écrire du SQL à la main dans chaque vue devient vite ingérable ; **SQLAlchemy** (via l\'extension `Flask-SQLAlchemy`) mappe tes tables sur des **classes** : une classe = une table, un attribut = une colonne, un objet = une ligne. Tu manipules Python, il parle SQL — avec pour règle cardinale : **rien n\'est écrit sans `db.session.commit()`**.',
          blocks: [
            { t: 'h3', h: 'Installation & câblage (pattern compatible factory)' },
            { t: 'code', lang: 'bash', code: 'pip install flask-sqlalchemy' },
            { t: 'code', lang: 'py', code:
'# extensions.py — créer SANS app : évite les imports circulaires\nfrom flask_sqlalchemy import SQLAlchemy\ndb = SQLAlchemy()\n\n# app.py — puis BRANCHER :\napp.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"  # ou postgres://…\ndb.init_app(app)\n\nwith app.app_context():      # db a besoin du contexte (fiche Contextes !)\n    db.create_all()          # crée les tables manquantes (1er démarrage)' },
            { t: 'h3', h: 'Déclarer un modèle' },
            { t: 'code', lang: 'py', code:
'# models.py\nfrom extensions import db\n\nclass Tache(db.Model):                    # une CLASSE = une TABLE\n    id = db.Column(db.Integer, primary_key=True)\n    texte = db.Column(db.String(200), nullable=False)\n    faite = db.Column(db.Boolean, default=False)\n\n    # Clé étrangère + relation (une ligne = un objet navigable) :\n    projet_id = db.Column(db.Integer, db.ForeignKey("projet.id"))\n    projet = db.relationship("Projet", backref="taches")\n\nclass Projet(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    nom = db.Column(db.String(80), nullable=False)\n# tache.projet → l\'objet Projet ; projet.taches → la liste de ses Tache' },
            { t: 'h3', h: 'CRUD : create, read, update, delete' },
            { t: 'code', lang: 'py', code:
'# CREATE — ajouter puis COMMIT (sinon : rien n\'est écrit !)\nnouvelle = Tache(texte="Acheter du gari", projet_id=1)\ndb.session.add(nouvelle)\ndb.session.commit()          # INSERT exécuté ICI\n\n# READ — la syntaxe moderne (SQLAlchemy 2 / select) :\ntaches = db.session.execute(\n    db.select(Tache).filter_by(faite=False).order_by(Tache.id.desc())\n).scalars().all()\n\ntache = db.session.get(Tache, 3)          # par clé primaire → None si absente\ntache = db.get_or_404(Tache, 3)           # …ou 404 AUTOMATIQUE (vues !)\n\n# UPDATE — modifier l\'objet, puis commit :\ntache.faite = True\ndb.session.commit()\n\n# DELETE :\ndb.session.delete(tache)\ndb.session.commit()' },
            { t: 'p', h: 'Le cycle mental est toujours le même : **modifier des objets, puis `commit()`** pour matérialiser. Entre deux, rien n\'a touché la base — et en cas d\'erreur, `db.session.rollback()` revient à l\'état propre. Le `db.select(...)` moderne remplace l\'ancien `Tache.query...` (encore omniprésent dans les tutoriels).' },
            { t: 'callout', kind: 'tip', h: 'Attention au **N+1** dès que tu boucles : `{% for t in taches %}{{ t.projet.nom }}` déclenche UNE requête par tâche (lazy loading). Remède : charger la relation d\'avance — `db.select(Tache).options(db.joinedload(Tache.projet))`. Même leçon que la fiche Eloquent du module Laravel !' }
          ],
          errors: [
            { title: 'Oublier db.session.commit()', bad: 'tache = Tache(texte="…")\ndb.session.add(tache)\nreturn redirect(url_for("taches"))\n# la liste est vide : RIEN n\'a été écrit !', good: 'db.session.add(tache)\ndb.session.commit()\nreturn redirect(url_for("taches"))', why: 'La session SQLAlchemy est une ZONE DE PRÉPARATION : add/delete et les modifications d\'objets n\'atteignent la base qu\'au commit. Oublier = données perdues en silence, sans aucune erreur.' },
            { title: 'Modifier le modèle et relancer db.create_all()', bad: '# Ajout d\'une colonne "priorite" au modèle…\ndb.create_all()\n# Aucune erreur, mais la colonne N\'EXISTE PAS en base !', good: '# create_all ne fait que CRÉER l\'absent — pas de migration.\n# Pour faire ÉVOLUER un schéma : Flask-Migrate (Alembic),\n# fiche Extensions : flask db migrate / upgrade', why: 'create_all est idempotent OUT création : il ne compare ni n\'altère les tables existantes. Le développement « réel » passe par des migrations versionnées — sinon le schéma dérive du modèle jusqu\'au plantage en prod.' }
          ],
          related: ['py-classes', 'fk-extensions', 'fk-configuration', 'fk-api-rest']
        },

        {
          id: 'fk-formulaires',
          title: 'Formulaires & validation (Flask-WTF)',
          icon: 'checklist',
          level: 'Intermédiaire',
          tagline: 'request.form à la main pour comprendre, FlaskForm + validateurs pour produire — et le PRG, toujours.',
          intro: 'Un formulaire HTML, c\'est facile à afficher et traître à traiter : il faut récupérer les champs, **les valider** (jamais de confiance côté client), réafficher les erreurs, et empêcher les doubles soumissions. Flask-WTF (WTForms) industrialise tout ça : une **classe de formulaire** déclare champs et validateurs, `validate_on_submit()` orchestre, et le **CSRF** est géré nativement.',
          blocks: [
            { t: 'h3', h: 'À la main d\'abord (pour comprendre le mécanisme)' },
            { t: 'code', lang: 'py', code:
'@app.route("/contact", methods=["GET", "POST"])\ndef contact():\n    erreurs = {}\n    if request.method == "POST":\n        email = request.form.get("email", "").strip()\n        if "@" not in email:\n            erreurs["email"] = "Email invalide"\n        if not erreurs:\n            envoyer(email)\n            flash("Message envoyé !", "succes")\n            return redirect(url_for("contact"))   # PRG ! (voir plus bas)\n    return render_template("contact.html", erreurs=erreurs)' },
            { t: 'h3', h: 'Flask-WTF : déclarer plutôt que bricoler' },
            { t: 'code', lang: 'bash', code: 'pip install flask-wtf' },
            { t: 'code', lang: 'py', code:
'# forms.py\nfrom flask_wtf import FlaskForm\nfrom wtforms import StringField, PasswordField\nfrom wtforms.validators import DataRequired, Length, Email\n\nclass InscriptionForm(FlaskForm):\n    pseudo = StringField("Pseudo",\n        validators=[DataRequired(), Length(min=3, max=20)])\n    email = StringField("Email", validators=[DataRequired(), Email()])\n    mdp = PasswordField("Mot de passe",\n        validators=[DataRequired(), Length(min=8)])\n\n# vues.py\n@app.route("/inscription", methods=["GET", "POST"])\ndef inscription():\n    form = InscriptionForm()                # lié à la requête courante\n    if form.validate_on_submit():           # POST + CSRF + validateurs OK\n        creer_user(form.pseudo.data, form.email.data, form.mdp.data)\n        return redirect(url_for("accueil")) # statut + PRG d\'un coup\n    return render_template("inscription.html", form=form)' },
            { t: 'code', lang: 'html', label: 'templates/inscription.html', code:
'<form method="post" novalidate>\n  {{ form.hidden_tag() }}        {# JETON CSRF — sans lui : 400 Bad Request #}\n\n  {{ form.pseudo.label }} {{ form.pseudo() }}\n  {% for e in form.pseudo.errors %}<em class="err">{{ e }}</em>{% endfor %}\n\n  {{ form.email.label }} {{ form.email() }}\n  {% for e in form.email.errors %}<em class="err">{{ e }}</em>{% endfor %}\n\n  {{ form.mdp.label }} {{ form.mdp() }}\n  {% for e in form.mdp.errors %}<em class="err">{{ e }}</em>{% endfor %}\n\n  <button>Créer mon compte</button>\n</form>' },
            { t: 'p', h: 'Lecture du flux : en **GET**, `validate_on_submit()` renvoie `False` → on affiche le formulaire vide. En **POST**, il vérifie le jeton CSRF puis chaque validateur ; un échec réaffiche la page avec `form.champ.errors` remplis. La validation côté serveur ne se négocie JAMAIS — l\'attribut `novalidate` au-dessus désactive volontairement la validation HTML5 pour démontrer que le serveur seul décide.' },
            { t: 'h3', h: 'Le pattern PRG : Post → Redirect → Get' },
            { t: 'p', h: 'Après TOUT POST réussi : **`redirect()`, jamais un template**. Sinon l\'utilisateur qui rafraîchit (F5) re-soumet le formulaire — double commande, double paiement. La redirection transforme l\'arrivée en GET inoffensive, et le message de confirmation voyage via **flash** (fiche Sessions). C\'est le réflexe hygiénique n°1 du web formulaire.' },
            { t: 'callout', kind: 'tip', h: 'WTForms ramène plein de validateurs : `DataRequired`, `Length`, `Email`, `EqualTo("mdp")` (confirmation), `NumberRange`, `Regexp`. Et on peut écrire les siens : toute fonction `def valide_pseudo(form, field)` qui lève `ValidationError` s\'ajoute à la liste.' }
          ],
          errors: [
            { title: 'Ré-afficher le template après un POST réussi', bad: 'if form.validate_on_submit():\n    creer_user(...)\n    return render_template("merci.html")   # F5 = re-soumission !', good: 'if form.validate_on_submit():\n    creer_user(...)\n    flash("Compte créé !", "succes")\n    return redirect(url_for("accueil"))    # PRG : GET inoffensif', why: 'Sans redirection, la dernière requête du navigateur reste le POST : un rafraîchissement le rejoue (double insertion, double débit). Le navigateur prévient avec « Confirmer le renvoi du formulaire » — le symptôme signature d\'un PRG manquant.' },
            { title: '400 Bad Request : jeton CSRF oublié', bad: '<form method="post">\n  {{ form.pseudo() }}   <!-- pas de hidden_tag() -->', good: '<form method="post">\n  {{ form.hidden_tag() }}   {# champ hidden signé #}\n  {{ form.pseudo() }}', why: 'Flask-WTF exige le jeton CSRF à CHAQUE POST : sans hidden_tag(), validate_on_submit() échoue et la requête est rejetée en 400. C\'est la protection contre la soumission de formulaires depuis un site tiers — pas une formalité.' }
          ],
          related: ['fk-requetes', 'fk-templates-heritage', 'html-formulaires', 'fk-erreurs']
        },

        {
          id: 'fk-configuration',
          title: 'Configuration & variables d\'environnement',
          icon: 'settings',
          level: 'Intermédiaire',
          tagline: 'app.config, classes de config et le .env : une seule base de code, des paramètres par contexte.',
          intro: 'SECRET_KEY, URL de base de données, clés d\'API, drapeaux de debug : ces valeurs changent selon l\'environnement (ton poste, la CI, la prod) et certaines ne doivent **jamais** entrer dans Git. Flask centralise la configuration dans `app.config`, qu\'on alimente de trois façons complémentaires : directement, via des **classes** (Dev/Test/Prod), et depuis les **variables d\'environnement** (le `.env`).',
          blocks: [
            { t: 'h3', h: 'Trois portes pour la même pièce' },
            { t: 'code', lang: 'py', code:
'import os\n\n# 1. À la main (prototypes uniquement) :\napp.config["SECRET_KEY"] = os.environ["SECRET_KEY"]\n\n# 2. Par CLASSES — la version qui monte en charge :\nclass Config:                              # socle commun\n    SECRET_KEY = os.environ["SECRET_KEY"]\n    SQLALCHEMY_DATABASE_URI = os.environ.get(\n        "DATABASE_URL", "sqlite:///app.db")    # défaut local\n\nclass ConfigDev(Config):\n    DEBUG = True\n\nclass ConfigProd(Config):\n    DEBUG = False\n    SESSION_COOKIE_SECURE = True          # cookies en HTTPS seulement\n\napp.config.from_object(ConfigDev if os.environ.get("FLASK_DEBUG") else ConfigProd)' },
            { t: 'h3', h: 'Le .env : des secrets hors du code' },
            { t: 'code', lang: 'bash', code:
'# pip install python-dotenv   (le CLI flask le charge automatiquement)\n\n# .env — NON VERSIONNÉ (.gitignore !)\nSECRET_KEY=0f8a2…64_caractères_hex\nDATABASE_URL=postgresql://user:mdp@localhost/boutique\n\n# .env.example — celui-là, on le partage (les NOMS, pas les valeurs)\nSECRET_KEY=\nDATABASE_URL=' },
            { t: 'p', h: 'Au démarrage du CLI `flask`, le `.env` est converti en variables d\'environnement automatiquement. En production, ce sont les variables réelles de la plateforme (Heroku, Docker, systemd) qui jouent ce rôle — d\'où la règle d\'or : **le code lit `os.environ`, il ne devine jamais où vit la valeur**.' },
            { t: 'h3', h: 'Lire la config partout : current_app' },
            { t: 'code', lang: 'py', code:
'from flask import current_app\n\ndef quota_api():\n    return current_app.config["API_QUOTA"]\n# Pas besoin d\'importer "app" : le contexte la fournit (fiche Contextes).\n# Et le dossier instance/ : pour les fichiers DE DÉPLOIEMENT, non versionnés :\n# app.instance_path → sqlite, uploads, config locale…' },
            { t: 'callout', kind: 'warn', h: 'Règle de survie : `.env` dans `.gitignore` AVANT le premier commit. Un secret commité est un secret publié — GitHub le scanne en quelques minutes (clés AWS pillées, etc.). Si ça arrive : révoque/régénère la clé immédiatement, la supprimer de l\'historique ne suffit pas.' }
          ],
          errors: [
            { title: 'Secrets en dur dans le code', bad: 'app.config["SECRET_KEY"] = "supersecret123"\nSTRIPE_KEY = "sk_live_51H…"        # partis dans Git → leak', good: 'SECRET_KEY = os.environ["SECRET_KEY"]\n# os.environ.get("CLÉ", défaut) pour les optionnelles;\n# os.environ["CLÉ"] (crash explicite) pour les vitales', why: 'Le code voyage : dépôt, forks, CI, captures d\'écran. Seules les variables d\'environnement restent sur la machine. Et lire os.environ[...] sans défaut fait échouer le démarrage TÔT (bon réflexe : crash lisible plutôt que comportement dégradé).' },
            { title: 'Lire les variables avant qu\'elles existent', bad: '# au niveau du module, AVANT create_app() :\nDB = os.environ["DATABASE_URL"]\n# KeyError en CI / sur un shell sans .env chargé', good: '# à l\'intérieur de create_app() (après load_dotenv) —\n# ou mieux : laisser app.config les centraliser et lire\n# current_app.config au point d\'usage', why: 'L\'ordre d\'exécution compte : le .env est chargé au démarrage du CLI ou de la factory. Lire au niveau module fige la valeur (ou plante) avant que l\'environnement soit prêt — et rend le code impossible à tester avec des configs variées.' }
          ],
          related: ['fk-demarrage', 'fk-sessions', 'fk-deploiement', 'py-modules-venv']
        }
      ]
    },

    /* ======================================================
       5. ARCHITECTURE & EXTENSIONS
       ====================================================== */
    {
      id: 'archi',
      name: 'Architecture & extensions',
      icon: 'dashboard_customize',
      fiches: [
        {
          id: 'fk-blueprints',
          title: 'Blueprints & application factory',
          icon: 'view_module',
          level: 'Intermédiaire',
          tagline: 'Découper l\'app en modules avec Blueprint, l\'assembler avec create_app — adieu l\'app.py géant.',
          intro: 'Quand `app.py` dépasse quelques centaines de lignes, deux problèmes arrivent : tout est mélangé, et les **imports circulaires** commencent (les routes ont besoin de `app`, `app` a besoin des routes). Flask répond avec deux patterns complémentaires : les **blueprints** (des mini-applications par domaine, enregistrées ensuite) et l\'**application factory** `create_app()` (une fonction qui CONSTRUIT l\'app).',
          blocks: [
            { t: 'h3', h: 'Blueprint : un domaine = un module' },
            { t: 'code', lang: 'py', label: 'blog/routes.py', code:
'from flask import Blueprint, render_template\n\nbp = Blueprint("blog", __name__, url_prefix="/blog")\n#                        └─ nom du bp (namespace des endpoints)\n\n@bp.get("/")\ndef liste():\n    return render_template("blog/liste.html")   # cherche dans templates/blog/\n\n@bp.get("/<int:id>")\ndef article(id):\n    return render_template("blog/article.html", article=trouver(id))' },
            { t: 'h3', h: 'La factory : construire l\'app au lieu de la déclarer' },
            { t: 'code', lang: 'py', label: 'app.py (version factory)', code:
'from flask import Flask\n\ndef create_app(config_obj="config.ConfigDev"):\n    app = Flask(__name__)\n    app.config.from_object(config_obj)\n\n    # Extensions : branchées APRÈS (elles existaient SANS app :\n    # db = SQLAlchemy() au niveau module, puis ici) :\n    db.init_app(app)\n    login_manager.init_app(app)\n\n    # Blueprints — import DIFFÉRÉ pour casser les cycles :\n    from blog.routes import bp as blog_bp\n    from auth.routes import bp as auth_bp\n    app.register_blueprint(blog_bp)   # → /blog/…\n    app.register_blueprint(auth_bp)   # → /auth/…\n\n    with app.app_context():\n        db.create_all()\n    return app\n# flask --app "app:create_app()" run' },
            { t: 'p', h: 'Bénéfices immédiats : chaque domaine vit dans son dossier (`blog/`, `auth/`) avec ses routes, et la factory permet de créer **plusieurs instances** (une pour les tests avec une base éphémère, une pour la prod) — c\'est aussi le paramètre que prend le serveur WSGI en déploiement.' },
            { t: 'h3', h: 'url_for et le namespace des blueprints' },
            { t: 'code', lang: 'py', code:
'# L\'endpoint devient "nom_du_blueprint.nom_de_la_vue" :\nurl_for("blog.liste")          # → "/blog/"\nurl_for("blog.article", id=3)  # → "/blog/3"\nurl_for("auth.connexion")      # → "/auth/connexion"\n# Plus de collisions : deux vues "liste" dans deux bps cohabitent.' },
            { t: 'callout', kind: 'tip', h: 'Imports différés (à l\'intérieur de `create_app`) + extensions créées sans app (`db = SQLAlchemy()` puis `init_app`) : ce duo tue définitivement le « **ImportError: cannot import name app — circular import** », le blocage classique dès qu\'on découpe un projet Flask.' }
          ],
          errors: [
            { title: 'L\'import circulaire app ↔ routes', bad: '# app.py : from routes import *   (pour enregistrer)\n# routes.py : from app import app  (pour décorer @app.route)\n# → ImportError circulaire au démarrage', good: '# routes.py : bp = Blueprint(...) + @bp.route\n# app.py : create_app() enregistre les bps APRÈS création', why: 'Les deux modules se nécessitent mutuellement au chargement : Python bloque. Blueprint + factory inversent la dépendance : les routes ne connaissent que LEUR blueprint, l\'app les découvre à l\'assemblage.' },
            { title: 'Endpoints dupliqués entre blueprints (même nom de bp)', bad: 'bp = Blueprint("blog", __name__)     # dans admin/ ET public/\n# → ValueError: name "blog" is already registered', good: 'bp = Blueprint("admin_blog", __name__, url_prefix="/admin/blog")\nbp = Blueprint("blog", __name__, url_prefix="/blog")', why: 'Le NOM du blueprint est un namespace global d\'endpoints : deux bps homonymes s\'écrasent au register. Nommer par domaine (admin_blog), préfixer par URL, et la cohabitation devient naturelle.' }
          ],
          related: ['fk-routing', 'fk-contexte', 'fk-sqlalchemy', 'py-decorateurs']
        },

        {
          id: 'fk-erreurs',
          title: 'Gestion des erreurs',
          icon: 'error',
          level: 'Intermédiaire',
          tagline: 'abort pour signaler, errorhandler pour présenter — des 404 élégantes et des 500 traçables.',
          intro: 'Une erreur HTTP n\'est pas un plantage : c\'est une **réponse** avec un statut particulier. Flask distingue deux gestes — **signaler** (`abort(404)`, ou laisser les convertisseurs et `get_or_404` le faire pour toi) et **présenter** (`@app.errorhandler` pour transformer l\'erreur en page ou en JSON propre). Bien faite, cette mécanique centralise TOUT le traitement d\'erreurs de l\'app.',
          blocks: [
            { t: 'h3', h: 'Signaler : abort() et les raccourcis' },
            { t: 'code', lang: 'py', code:
'from flask import abort\n\n@app.get("/article/<int:id>")\ndef article(id):\n    a = db.session.get(Article, id)\n    if a is None:\n        abort(404)                 # court-circuite proprement la vue\n    if a.brouillon and not g.user:\n        abort(403)                 # interdit : logique métier\n\n# Encore mieux pour le 404 CRUD : db.get_or_404(Article, id)\n# Et <int:id> REJETTE déjà tout seul /article/abc → 404 gratuite.' },
            { t: 'h3', h: 'Présenter : pages d\'erreur personnalisées' },
            { t: 'code', lang: 'py', code:
'@app.errorhandler(404)\ndef page_inconnue(e):\n    return render_template("404.html"), 404     # TOUJOURS avec son statut !\n\n@app.errorhandler(500)\ndef erreur_serveur(e):\n    app.logger.exception("Plantage sur %s", request.path)   # la trace part en log\n    return render_template("500.html"), 500' },
            { t: 'code', lang: 'html', label: 'templates/404.html', code:
'{% extends "base.html" %}\n{% block title %}Page introuvable{% endblock %}\n{% block content %}\n  <h1>Oups — cette page n\'existe pas (404)</h1>\n  <p><a href="{{ url_for("accueil") }}">Retourner à l\'accueil</a></p>\n{% endblock %}' },
            { t: 'h3', h: 'API et site dans la même app : le bon format selon la route' },
            { t: 'code', lang: 'py', code:
'@app.errorhandler(404)\ndef introuvable(e):\n    if request.path.startswith("/api/"):\n        # un client JSON ne veut PAS d\'une page HTML !\n        return {"erreur": "Ressource introuvable"}, 404\n    return render_template("404.html"), 404\n\n@app.errorhandler(Exception) \ndef inattendu(e):\n    app.logger.exception(e)   # filet de sécurité ultime : logguer PUIS répondre\n    return {"erreur": "Erreur interne"}, 500' },
            { t: 'callout', kind: 'tip', h: 'Règle de traçabilité : une 404 peut rester silencieuse (normal, du trafic), mais une **500 doit TOUJOURS être journalisée** (`app.logger.exception`) avec traceback — sinon tu découvres tes plantages par les utilisateurs. Et en HTML, l\'erreur reste une PAGE cohérente avec le site : jamais l\'écran brut de Werkzeug en prod.' }
          ],
          errors: [
            { title: 'Page HTML d\'erreur pour une API', bad: '# fetch("/api/taches/999") → le client reçoit :\n# <html>…Page introuvable…</html>\n# response.json() EXPLOSE : "Unexpected token <"', good: 'if request.path.startswith("/api/") or request.is_json:\n    return {"erreur": "Introuvable"}, 404\nreturn render_template("404.html"), 404', why: 'Le contrat d\'une API est le JSON : une page HTML d\'erreur casse le PARSEUR du client et masque totalement le vrai problème. Routage de la réponse d\'erreur par nature de la route (ou négociation de contenu).'},
            { title: 'Attraper puis écraser le statut', bad: 'try:\n    article = db.get_or_404(Article, id)\nexcept Exception:\n    return redirect(url_for("liste"))   # 404 devenue… 302 muette', good: '# Laisser remonter : abort/get_or_404 produisent la BONNE\n# exception HTTP, les handlers la présentent. On n\'attrape\n# que ce qu\'on sait RÉPARER (fiche Exceptions Python).', why: 'Intercepter une HTTPException pour la convertir en redirection fait perdre le statut (le client croit que tout va bien) et la log. Les exceptions HTTP de Flask VEULENT remonter jusqu\'aux errorhandlers — ne pas les attraper.' }
          ],
          related: ['fk-requetes', 'fk-api-rest', 'py-exceptions', 'fk-templates']
        },

        {
          id: 'fk-extensions',
          title: 'Flask-Login, Flask-Migrate & compagnie',
          icon: 'extension',
          level: 'Avancé',
          tagline: 'Login gère la session utilisateur, Migrate versionne le schéma — les deux extensions à connaître par cœur.',
          intro: 'Le « micro » de Flask signifie que chaque besoin sérieux a son extension officielle ou quasi. Deux dominent toutes les autres : **Flask-Login** (authentification par session : qui est connecté, protection des vues) et **Flask-Migrate** (Alembic : faire **évoluer** le schéma sans perdre les données). Voici le montage complet des deux, plus le panorama du reste.',
          blocks: [
            { t: 'h3', h: 'Flask-Login : le montage en quatre pièces' },
            { t: 'code', lang: 'bash', code: 'pip install flask-login flask-migrate' },
            { t: 'code', lang: 'py', code:
'# 1. LE MODÈLE hérite de UserMixin (id, is_authenticated… tout cuit) :\nfrom flask_login import UserMixin\nfrom werkzeug.security import generate_password_hash, check_password_hash\n\nclass User(UserMixin, db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    pseudo = db.Column(db.String(30), unique=True, nullable=False)\n    mdp_hash = db.Column(db.String(255), nullable=False)\n\n    def definir_mdp(self, mdp):\n        self.mdp_hash = generate_password_hash(mdp)   # JAMAIS en clair !\n    def verifier_mdp(self, mdp):\n        return check_password_hash(self.mdp_hash, mdp)\n\n# 2. LE MANAGER sait retrouver un user depuis l\'id stocké en session :\nfrom flask_login import LoginManager\nlogin = LoginManager(app)\nlogin.login_view = "connexion"            # où rediriger les non-connectés\n\n@login.user_loader\ndef charger_user(user_id):\n    return db.session.get(User, int(user_id))' },
            { t: 'code', lang: 'py', code:
'# 3. CONNEXION / DÉCONNEXION :\nfrom flask_login import login_user, logout_user, login_required, current_user\n\n@app.route("/connexion", methods=["GET", "POST"])\ndef connexion():\n    if request.method == "POST":\n        user = db.session.execute(\n            db.select(User).filter_by(pseudo=request.form["pseudo"])\n        ).scalar_one_or_none()\n        if user and user.verifier_mdp(request.form["mdp"]):\n            login_user(user)\n            # ?next=/profil : renvoyer là où on voulait aller :\n            return redirect(request.args.get("next") or url_for("accueil"))\n        flash("Identifiants incorrects", "erreur")\n    return render_template("connexion.html")\n\n@app.post("/deconnexion")\n@login_required\ndef deconnexion():\n    logout_user()\n    return redirect(url_for("accueil"))\n\n# 4. PROTÉGER + UTILISER :\n@app.get("/profil")\n@login_required                       # non connecté → redirect login_view\ndef profil():\n    return render_template("profil.html", user=current_user)' },
            { t: 'h3', h: 'Flask-Migrate : le schéma qui évolue SANS tout perdre' },
            { t: 'code', lang: 'bash', code:
'# extensions : migrate = Migrate() ; factory : migrate.init_app(app, db)\nflask db init                    # une fois : crée migrations/\nflask db migrate -m "ajout bio"  # DIFFÉRENTIEL auto : modèle vs base\nflask db upgrade                 # applique — en prod comme en local' },
            { t: 'p', h: 'Rappel de la fiche SQLAlchemy : `db.create_all()` ne fait que CRÉER l\'absent ; il n\'ALTÈRE jamais une table existante. `flask db migrate` génère un script versionné (à relire et commiter !) décrivant le passage du schéma actuel au schéma du modèle. C\'est l\'équivalent des migrations Laravel — même philosophie, mêmes réflexes.' },
            { t: 'h3', h: 'Et le reste de l\'écurie' },
            { t: 'table', head: ['Extension', 'Ton besoin'], rows: [
              ['Flask-Mail', 'envoyer des emails (confirmation, reset mdp)'],
              ['Flask-Caching', 'mémoïser vues et calculs lourds (redis/memcached)'],
              ['Flask-CORS', 'autoriser un front JS (React) à appeler ton API'],
              ['Flask-Limiter', 'limiter le débit (anti-bruteforce sur /connexion)'],
              ['Flask-Admin', 'back-office CRUD généré sur les modèles']
            ]},
            { t: 'callout', kind: 'warn', h: 'Règle d\'or des mots de passe : **jamais en clair, jamais un hash maison** — `generate_password_hash` (bcrypt/scrypt via Werkzeug) et `check_password_hash` à la vérification. Un champ `mdp` en clair dans une base qui fuite = catastrophe juridique et humaine ; ce n\'est PAS une optimisation optionnelle.' }
          ],
          errors: [
            { title: 'db.create_all() utilisé comme outil de migration', bad: '# "J\'ai ajouté une colonne, je relance create_all"…\n# rien ne change : la table EXISTE déjà, elle est ignorée.\n# Solution radicale constatée en prod : DROP TABLE + perte des données.', good: 'flask db migrate -m "ajout colonne bio"\nflask db upgrade\n# migration VERSIONNÉE, relue, applicable en prod sans rien perdre', why: 'create_all ne regarde que l\'EXISTENCE des tables. Toute évolution de schéma passe par une migration différentielle — sinon c\'est la désynchronisation modèle/base, ou pire : la destruction-recréation des données de prod.' },
            { title: 'Protéger les vues à la main, une par une', bad: '@app.get("/profil")\ndef profil():\n    if not session.get("user_id"):\n        return redirect(url_for("connexion"))\n    # …recopié dans 15 vues, oublié dans la 16e', good: '@app.get("/profil")\n@login_required            # déclaratif, impossible à oublier en revue\ndef profil(): ...\n# + login.login_view pour l\'aiguillage global', why: 'La sécurité copiée-collée se dégrade à chaque nouvelle vue (ratés silencieux). @login_required est un gardien déclaratif qui se voit au-dessus de la route — et login_view centralise la redirection, next= compris.' }
          ],
          related: ['fk-sqlalchemy', 'fk-sessions', 'fk-formulaires', 'fk-blueprints']
        }
      ]
    },

    /* ======================================================
       6. API & PRODUCTION
       ====================================================== */
    {
      id: 'production',
      name: 'API & production',
      icon: 'cloud_upload',
      fiches: [
        {
          id: 'fk-api-rest',
          title: 'API REST avec Flask',
          icon: 'api',
          level: 'Avancé',
          tagline: 'Ressources, verbes, statuts honnêtes et JSON propre — l\'API que ton front (et TanStack) mérite.',
          intro: 'Une API REST n\'est pas « des routes qui renvoient du JSON » : c\'est un **contrat** — des URLs pensées en **ressources** (`/api/taches/3`), des verbes HTTP qui expriment l\'intention (GET lit, POST crée, PATCH modifie, DELETE supprime), des **codes de statut honnêtes** et des erreurs au même format que les succès. Ce contrat, c\'est ce qui permet à un front — fetch, React, TanStack Query — de consommer sans surprise.',
          blocks: [
            { t: 'h3', h: 'La ressource avant tout' },
            { t: 'table', head: ['Verbe + URL', 'Intention', 'Statut succès'], rows: [
              ['GET /api/taches', 'lister (avec pagination)', '200'],
              ['GET /api/taches/3', 'détail d\'UNE ressource', '200 (404 si absente)'],
              ['POST /api/taches', 'créer', '201 + ressource créée'],
              ['PATCH /api/taches/3', 'modifier partiellement', '200'],
              ['DELETE /api/taches/3', 'supprimer', '204 (vide)']
            ]},
            { t: 'code', lang: 'py', label: 'api/routes.py — blueprint + sérialisation', code:
'from flask import Blueprint, request\n\nbp = Blueprint("api", __name__, url_prefix="/api")\n\ndef tache_dict(t):               # la sérialisation VIT ICI, une seule fois\n    return {"id": t.id, "texte": t.texte, "faite": t.faite}\n\n@bp.get("/taches")\ndef liste():\n    page = request.args.get("page", 1, type=int)\n    par_page = 20\n    requete = (db.select(Tache).order_by(Tache.id)\n                 .limit(par_page).offset((page - 1) * par_page))\n    taches = db.session.execute(requete).scalars().all()\n    return {"page": page, "taches": [tache_dict(t) for t in taches]}\n\n@bp.get("/taches/<int:id>")\ndef detail(id):\n    return tache_dict(db.get_or_404(Tache, id))     # 404 JSON via handler\n\n@bp.post("/taches")\ndef creer():\n    d = request.get_json(force=True) or {}\n    texte = (d.get("texte") or "").strip()\n    if not texte:\n        return {"erreur": "Le champ texte est obligatoire"}, 400\n    t = Tache(texte=texte)\n    db.session.add(t)\n    db.session.commit()\n    return tache_dict(t), 201                       # ressource CRÉÉE + statut\n\n@bp.patch("/taches/<int:id>")\ndef maj(id):\n    t = db.get_or_404(Tache, id)\n    d = request.get_json(force=True) or {}\n    if "texte" in d: t.texte = d["texte"].strip()\n    if "faite" in d: t.faite = bool(d["faite"])\n    db.session.commit()\n    return tache_dict(t)\n\n@bp.delete("/taches/<int:id>")\ndef supprimer(id):\n    db.session.delete(db.get_or_404(Tache, id))\n    db.session.commit()\n    return "", 204                                  # succès SANS contenu' },
            { t: 'h3', h: 'Erreurs au format de l\'API' },
            { t: 'p', h: 'Un client JSON ne veut jamais de page HTML : branche l\'errorhandler (fiche Erreurs) pour renvoyer `{"erreur": "…"}` sous `/api/`, avec le VRAI statut — 400 validation, 404 absent, 500 inattendu. Front obligé ? `fetch` ne lève PAS d\'exception sur un 4xx : il faut tester `response.ok`… sauf si tu délègues à TanStack Query, qui gère statuts, cache et retries pour toi (modules JS + TanStack du site).' },
            { t: 'callout', kind: 'tip', h: 'CORS : un front servi depuis un AUTRE domaine (React en dev sur :5173, API sur :5000) sera bloqué par le navigateur. `pip install flask-cors` puis `CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})` — jamais `origins="*"` avec des sessions/cookies en jeu.' }
          ],
          errors: [
            { title: 'Statut 200 partout, erreur dans le corps', bad: 'if not texte:\n    return {"erreur": "texte obligatoire"}   # statut 200 !!\n# le front fait response.ok → TRUE → considère un succès', good: 'return {"erreur": "texte obligatoire"}, 400\n# le statut EST le signal ; le corps précise le détail', why: 'fetch() ne rejette que sur erreur RÉSEAU : un 400 reçu en 200 transforme chaque échec en faux succès côté client (données « sauvegardées » qui ne l\'étaient pas). Le code HTTP fait partie du contrat — toujours l\'honorer.' },
            { title: 'Renvoyer les objets SQLAlchemy directement', bad: 'return jsonify(taches)\n# TypeError: Object of type Tache is not JSON serializable', good: 'return {"taches": [tache_dict(t) for t in taches]}\n# (ou une lib de sérialisation : marshmallow — modèles riches)', why: 'Un modèle ORM contient biens plus que des données : état interne SQLAlchemy, relations (boucles infinies à sérialiser !), champs sensibles (hash !). Sérialiser explicitement — c\'est aussi ta frontière de confidentialité.' }
          ],
          related: ['fk-requetes', 'fk-sqlalchemy', 'js-fetch', 'tq-usequery']
        },

        {
          id: 'fk-deploiement',
          title: 'Déploiement : WSGI & serveur de production',
          icon: 'cloud_upload',
          level: 'Avancé',
          tagline: 'Le serveur de dev dit lui-même "not designed for production" — WSGI, gunicorn et le proxy devant.',
          intro: 'Au premier lancement, Flask affiche sans détour : « *WARNING: This is a development server. Do not use it in a production deployment.* » Le serveur intégré est un outil de dev — mono-thread, fragile, avec son dangereux debugger. En production, on interpose un **serveur WSGI** réel (Gunicorn, uWSGI, Waitress) derrière un **reverse proxy** (nginx), et on bascule toute la configuration en variables d\'environnement.',
          blocks: [
            { t: 'h3', h: 'L\'architecture standard, en une image' },
            { t: 'code', lang: 'bash', code:
'#   Internet\n#      │\n#   nginx :443  → TLS (HTTPS) + sert /static/ à la vitesse du disque\n#      │ proxy_pass 127.0.0.1:8000\n#   gunicorn (4 workers) ← le serveur WSGI, parle FLASK\n#      │\n#   app Flask ← tes blueprints, ta factory' },
            { t: 'p', h: '**WSGI** (Web Server Gateway Interface) est le CONTRAT entre un serveur web Python et ton application : n\'importe quel serveur WSGI sait faire tourner n\'importe quelle app WSGI (Flask, Django…). C\'est pourquoi ton code ne change JAMAIS entre le dev et la prod — seul le serveur qui l\'héberge change.' },
            { t: 'h3', h: 'Gunicorn en pratique' },
            { t: 'code', lang: 'bash', code:
'pip install gunicorn        # (Waitress si Windows : waitress-serve)\n\n# Lancer la factory avec 4 workers (≈ 2×CPU+1), en local :\ngunicorn -w 4 -b 127.0.0.1:8000 "app:create_app()"\n\n# requirements.txt à jour + variables d\'environnement :\npip freeze > requirements.txt\nexport SECRET_KEY="…" DATABASE_URL="postgresql://…"\n# .env géré par systemd / Docker / la plateforme — pas par Git' },
            { t: 'h3', h: 'Le checklist avant mise en ligne' },
            { t: 'ul', items: [
              '**Debug OFF** : `FLASK_DEBUG=0`, aucun `app.run()` dans le code de prod — le debugger Werkzeug ouvert = exécution de code à distance.',
              '**Secrets en environnement** : SECRET_KEY, DATABASE_URL jamais commités (fiche Configuration).',
              '**Migrations jouées** : `flask db upgrade` au déploiement, pas create_all (fiche Extensions).',
              '**Statiques par nginx** (ou CDN) : Flask ne sert que le dynamique.',
              '**HTTPS** : certificat (Let\'s Encrypt) + `SESSION_COOKIE_SECURE = True`.',
              '**Logs** : `app.logger` vers stdout collecté par systemd/Docker — une 500 silencieuse est un bug invisible (fiche Erreurs).',
              '**process manager** : systemd (ou Docker) relance gunicorn en cas de crash et au boot.'
            ]},
            { t: 'p', h: 'Alternative sans y passer des heures : les plateformes managées (Render, Railway, PythonAnywhere, Fly.io) fournissent WSGI + HTTPS + variables d\'environnement clé en main — parfait pour apprendre le CYCLE déploiement avant d\'administrer le VPS soi-même.' },
            { t: 'callout', kind: 'tip', h: 'Teste localement COMME en prod avant de pousser : `gunicorn "app:create_app()"` sur ta machine, debug désactivé, variables d\'environnement posées. Si ça tourne chez toi dans ces conditions, ça tournera sur le serveur — le delta dev/prod est la première source de « ça marchait en local ».' }
          ],
          errors: [
            { title: 'app.run(debug=True) poussé en production', bad: 'if __name__ == "__main__":\n    app.run(host="0.0.0.0", debug=True)\n# servi au monde entier… avec la console interactive du debugger', good: '# code : create_app() sans app.run()\n# serveur : gunicorn -w 4 "app:create_app()" + FLASK_DEBUG=0', why: 'Double faute : le serveur de dev ne tient pas la charge (mono-thread, pas durci) ET le debugger = console Python ouverte à quiconque provoque une exception. La doc de Werkzeug le condamne en une ligne : never use it in production.' },
            { title: 'Écouter 0.0.0.0 sans proxy ni pare-feu', bad: 'gunicorn -b 0.0.0.0:8000 …    # l\'app EXPOSEE nue sur internet', good: 'gunicorn -b 127.0.0.1:8000 …    # visible seulement de nginx\n# nginx répond en 443 et proxy_pass vers 127.0.0.1:8000', why: '0.0.0.0 ouvre le port à TOUTES les interfaces réseau : ton app brute (sans TLS, sans protections du proxy) devient la porte d\'entrée. Le reverse proxy est la façade blindée ; gunicorn reste dans la cour intérieure.' }
          ],
          related: ['fk-configuration', 'fk-statiques', 'fk-erreurs', 'fk-demarrage']
        }
      ]
    }
  ]
};
