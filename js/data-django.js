/* ============================================================
   data-django.js — Contenu pédagogique Django (module complet)
   Couvre : démarrage & manage.py, apps & INSTALLED_APPS, URLs,
   vues FBV + CBV/génériques, templates DTL, modèles & ORM,
   migrations, formulaires/ModelForm, admin, authentification,
   statiques & médias, middleware, settings, erreurs, DRF,
   déploiement et tests Django.
   Comparaisons brèves avec Flask (modules Python/Flask en place).
   Même contrat de données (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.django = {
  id: 'django',
  name: 'Django',
  icon: 'foundation',
  tagline: 'Le framework web Python « batteries included » : ORM, admin, auth, migrations — tout est fourni, structuré et cohérent.',
  heroTitle: 'Django, le web Python tout-terrain',

  categories: [
    /* ======================================================
       1. DÉMARRER AVEC DJANGO
       ====================================================== */
    {
      id: 'demarrer-dj',
      name: 'Démarrer avec Django',
      icon: 'flag',
      fiches: [
        {
          id: 'jd-demarrage',
          title: 'Premier projet & manage.py',
          icon: 'foundation',
          level: 'Débutant',
          tagline: 'django-admin startproject, la structure projet vs app, et le mode debug qui sait se taire.',
          intro: 'Là où Flask te donne une page blanche (micro-framework), Django te livre une **maison meublée** : ORM, admin, auth, migrations, tout est inclus — c\'est la philosophie « *batteries included* ». Prix à payer : plus de structure à absorber au départ. Bonne nouvelle : la structure est **toujours la même**, et une fois qu\'on la lit, on la lit partout.',
          blocks: [
            { t: 'h3', h: 'Créer le projet (dans un venv !)' },
            { t: 'code', lang: 'bash', code:
'python -m pip install django\n\n# Un PROJET = le site entier (settings, URLs racine, WSGI…)\ndjango-admin startproject monsite\n\ncd monsite\npython manage.py runserver\n# → http://127.0.0.1:8000  (fusée Django 🚀 — "The install worked successfully!")' },
            { t: 'h3', h: 'Ce que startproject a créé' },
            { t: 'code', lang: 'bash', code:
'monsite/                  ← la RACINE (nom libre, juste un dossier)\n├── manage.py             ← ton couteau suisse : toutes les commandes\n└── monsite/              ← le PAQUET projet (ce nom-là compte)\n    ├── __init__.py\n    ├── settings.py       ← LA configuration (fiche Settings)\n    ├── urls.py           ← la table de routage RACINE (fiche URLs)\n    ├── wsgi.py           ← point d\'entrée serveur WSGI (déploiement)\n    └── asgi.py           ← point d\'entrée ASGI (async, websockets…)' },
            { t: 'h3', h: 'manage.py : une seule porte d\'entrée' },
            { t: 'code', lang: 'bash', code:
'python manage.py runserver          # serveur de DEV (rechargement auto)\npython manage.py startapp blog      # créer une APP (fiche suivante)\npython manage.py makemigrations     # préparer les migrations BDD\npython manage.py migrate            # appliquer les migrations\npython manage.py createsuperuser    # un compte admin\npython manage.py shell              # REPL avec Django CHARGÉ (ORM dispo !)\npython manage.py check              # vérifier la cohérence du projet' },
            { t: 'p', h: 'Différence productrice avec Flask : pas de dossier `templates/` ni `static/` au niveau projet au départ — Django les cherche **dans chaque app** (fiche Apps), et `manage.py` centralise les commandes. Garde `python manage.py check` sous le coude : il détecte la plupart des erreurs de configuration avant même le premier runserver.' },
            { t: 'h3', h: 'DEBUG et la page jaune qu\'on apprend à aimer' },
            { t: 'p', h: 'Avec `DEBUG = True` (défaut), toute exception affiche une **page jaune** riche : traceback complet, variables locales, requête SQL fautive… C\'est le debugger Django — formateur, indiscret. En production, `DEBUG = False` est **imposé** (il révèle des secrets !) — et c\'est là qu\'`ALLOWED_HOSTS` devient obligatoire (fiche Déploiement).' },
            { t: 'callout', kind: 'tip', h: 'Réflexe terminal : honore toujours `python manage.py ...` depuis la **racine du projet** (là où vit manage.py). Les commandes échouées « no such command » ou « module not found » viennent presque toujours d\'un lancement ailleurs — même leçon que le dossier courant en Python pur.' }
          ],
          errors: [
            { title: 'Confondre le dossier projet et l\'app', bad: 'django-admin startproject blog\n# puis TOUT mettre dans monsite/ : modèles, vues, templates…\n# → un projet monolithique impossible à réutiliser', good: 'django-admin startproject monsite\npython manage.py startapp blog\n# le PROJET porte la config ; chaque APP porte une fonctionnalité', why: 'Le projet est le contenant (settings, urls racine, wsgi) ; les apps sont les briques métier réutilisables. Tout caser dans le projet, c\'est renoncer à la modularité qui fait la force de Django — l\'erreur se paie à la première refonte.' },
            { title: 'DEBUG=True laissé en ligne', bad: '# settings.py poussé tel quel en production :\nDEBUG = True\n# page jaune complète = code source + variables exposées au public', good: 'DEBUG = os.environ.get("DEBUG", "False") == "True"\n# et en prod : DEBUG=False + ALLOWED_HOSTS + secrets en env', why: 'La page de debug révèle chemins, versions, variables d\'environnement et fragments de code : c\'est une carte du site pour un attaquant. Le réflexe : DEBUG piloté par l\'environnement, jamais par défaut en dur (fiches Settings & Déploiement).' }
          ],
          related: ['jd-apps', 'py-modules-venv', 'fk-demarrage', 'jd-deploiement']
        },

        {
          id: 'jd-apps',
          title: 'Apps & INSTALLED_APPS',
          icon: 'layers',
          level: 'Débutant',
          tagline: 'Une app = une fonctionnalité autonome (modèles, vues, templates, admin) : le Lego officiel de Django.',
          intro: 'Django découpe un site en **apps** : des modules métier **autonomes** — blog, comptes, boutique — chacune avec ses modèles, ses vues, ses templates, sa partie admin. Une app bien faite peut être **réutilisée** d\'un projet à l\'autre (c\'est ainsi que marchent les 10 000 apps tierces de l\'écosystème). Encore faut-il la **déclarer** : rien ne tourne tant qu\'elle n\'est pas dans `INSTALLED_APPS`.',
          blocks: [
            { t: 'h3', h: 'Créer et déclarer une app' },
            { t: 'code', lang: 'bash', code: 'python manage.py startapp blog' },
            { t: 'code', lang: 'bash', code:
'blog/\n├── migrations/       ← l\'historique du SCHÉMA de la BDD (fiche Migrations)\n│   └── __init__.py\n├── __init__.py\n├── admin.py          ← enregistrement dans l\'ADMIN (fiche Admin)\n├── apps.py           ← carte d\'identité de l\'app (BlogConfig)\n├── models.py         ← LES TABLES, en classes Python (fiche Modèles)\n├── tests.py          ← les tests de l\'app (fiche Tests)\n└── views.py          ← les VUES, la logique (fiche Vues)' },
            { t: 'code', lang: 'py', label: 'mysite/settings.py', code:
'INSTALLED_APPS = [\n    # les apps de Django elle-même, déjà là :\n    "django.contrib.admin",\n    "django.contrib.auth",\n    "django.contrib.contenttypes",\n    "django.contrib.sessions",\n    "django.contrib.messages",\n    "django.contrib.staticfiles",\n    # …puis les tiennes :\n    "blog",                 # ou "blog.apps.BlogConfig" — équivalent\n]' },
            { t: 'p', h: 'Tant que l\'app n\'est pas listée, Django **l\'ignore** : ses modèles ne migrent pas (`No changes detected`), ses templates sont invisibles, ses signaux morts. Le duo `startapp` + ajout à `INSTALLED_APPS` est inséparable — l\'oublier est le bug n°1 des premiers jours Django.' },
            { t: 'h3', h: 'Où vivent templates et fichiers statiques ?' },
            { t: 'p', h: 'Chaque app peut porter ses propres dossiers : `blog/templates/blog/accueil.html` et `blog/static/blog/style.css`. L\'habitude critique : les placer dans un **SOUS-DOSSIER AU NOM DE L\'APP** (`templates/blog/…`) — sinon deux templates du même nom dans deux apps **se masquent** l\'un l\'autre sans prévenir. Django fusionne les arborescences ; c\'est toi qui évites les collisions.' },
            { t: 'h3', h: 'Penser l\'app « réutilisable »' },
            { t: 'ul', items: [
              '**Un domaine = une app** : `blog`, `comptes`, `paiements` — pas `utils` fourre-tout.',
              '**Autonomie** : l\'app importe d\'autres apps avec parcimonie ; jamais le projet (sens unique).',
              '**Ses URLs sous include()** : `path("blog/", include("blog.urls"))` — le projet ne connaît que le préfixe.',
              '**Ses noms d\'URL namespacés** : `app_name = "blog"` + `{% url "blog:article" %}` — zéro collision entre apps.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Le test mental de la bonne découpe : « pourrais-je brancher `blog` sur un AUTRE projet sans retouche ? ». Si la réponse est oui, ton app est bien née. Django récompense cette discipline — c\'est la différence avec une app Flask ad hoc (les blueprints jouent un rôle voisin, en moins contraignant — fiche Blueprints du module Flask).' }
          ],
          errors: [
            { title: '"No changes detected" au makemigrations', bad: 'python manage.py makemigrations\n# No changes detected — alors que tu viens de créer models.py !', good: '# L\'app n\'est pas (encore) dans INSTALLED_APPS :\nINSTALLED_APPS = [..., "blog"]\npython manage.py makemigrations blog\n# (préciser le nom de l\'app débloque aussi les cas ambigus)', why: 'Sans déclaration, Django ne sait pas que blog existe : ses modèles ne sont jamais scannés. C\'est LE réflexe-condition : toute anomalie « mon app est ignorée » → vérifier INSTALLED_APPS en premier.' },
            { title: 'Templates d\'apps qui s\'écrasent entre eux', bad: 'blog/templates/accueil.html\ncomptes/templates/accueil.html\n# render(request, "accueil.html") → le PREMIER trouvé gagne,\n# quelle que soit l\'app appelante !', good: 'blog/templates/blog/accueil.html\ncomptes/templates/comptes/accueil.html\n# render(request, "blog/accueil.html") — sans ambiguïté', why: 'Les loaders fusionnent tous les dossiers templates/ des apps dans UN espace de noms plat : même chemin relatif = collision silencieuse. Le préfixe du nom d\'app est la convention officielle — idem pour static/.' }
          ],
          related: ['jd-urls', 'jd-modeles', 'fk-blueprints', 'py-modules-packages']
        },

        {
          id: 'jd-settings',
          title: 'settings.py & environnements',
          icon: 'manufacturing',
          level: 'Intermédiaire',
          tagline: 'Un fichier de config Python (du vrai code !), les réglages vitaux, et le split dev/test/prod.',
          intro: '`settings.py` n\'est pas un fichier INI ou YAML : c\'est **du Python exécuté** — tu peux y calculer des chemins, lire l\'environnement, importer. Django y charge au démarrage : `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `INSTALLED_APPS`, `DATABASES`, `MIDDLEWARE`, `TEMPLATES`… Comprendre ces dix lignes conditionne 90 % des problèmes de configuration.',
          blocks: [
            { t: 'h3', h: 'Les réglages qu\'on touche vraiment' },
            { t: 'code', lang: 'py', label: 'mysite/settings.py', code:
'from pathlib import Path\nimport os\n\nBASE_DIR = Path(__file__).resolve().parent.parent   # racine du projet\n\n# Les 4 interrupteurs vitaux — TOUS pilotés par l\'environnement :\nSECRET_KEY = os.environ["DJANGO_SECRET_KEY"]           # signe sessions/CSRF…\nDEBUG = os.environ.get("DEBUG", "True") == "True"      # page jaune (dev !)\nALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")\nDATABASES = {\n    "default": {\n        "ENGINE": "django.db.backends.sqlite3",         # postgres en prod\n        "NAME": BASE_DIR / "db.sqlite3",                # → dj-database-url pratique\n    }\n}' },
            { t: 'h3', h: 'BASE_DIR et les chemins : la bonne habitude' },
            { t: 'code', lang: 'py', code:
'# BASE_DIR = racine du projet : TOUT se déduit d\'elle (pathlib !)\nSTATIC_URL = "static/"\nSTATICFILES_DIRS = [BASE_DIR / "static"]        # assets du projet (hors apps)\nSTATIC_ROOT = BASE_DIR / "staticfiles"          # cible de collectstatic (prod)\nMEDIA_ROOT = BASE_DIR / "media"                 # uploads utilisateurs\nMEDIA_URL = "media/"\nTEMPLATES = [{\n    "BACKEND": "django.template.backends.django.DjangoTemplates",\n    "DIRS": [BASE_DIR / "templates"],           # templates du PROJET (base.html !)\n    "APP_DIRS": True,                            # + ceux de chaque APP\n    "OPTIONS": { "context_processors": [...] },\n}]' },
            { t: 'h3', h: 'Le split dev / prod : la méthode du paquet settings' },
            { t: 'code', lang: 'bash', code:
'mysite/\n└── settings/            ← settings.py devient un PACKAGE\n    ├── __init__.py\n    ├── base.py          # TOUT le commun\n    ├── dev.py           # from .base import * ; DEBUG = True\n    └── prod.py          # from .base import * ; DEBUG = False + durcissements\n\n# utilisation :\npython manage.py runserver --settings=mysite.settings.dev\n# ou via env : DJANGO_SETTINGS_MODULE=mysite.settings.prod' },
            { t: 'p', h: 'Pour les secrets, python-dotenv fonctionne (comme en Flask), mais le réflexe Django reste : valeurs par défaut raisonnables en **dev**, tout obligatoire depuis l\'environnement en **prod**. Et `from .base import *` est l\'UNIQUE endroit où l\'import étoile est toléré — convention assumée du monde Django.' },
            { t: 'callout', kind: 'warn', h: '`ALLOWED_HOSTS = ["*"]` « pour que ça marche » désactive une protection réelle (attaques par en-tête Host forgé). Liste tes vrais domaines : `["boutique.bj", "www.boutique.bj", "127.0.0.1"]`. Et quand DEBUG=False, sans ALLOWED_HOSTS valide, Django répond **400 Bad Request** à TOUT le monde — l\'erreur de mise en ligne la plus célèbre.' }
          ],
          errors: [
            { title: '400 Bad Request en prod : ALLOWED_HOSTS', bad: 'DEBUG = False\nALLOWED_HOSTS = []        # oublié…\n# le site répond 400 à CHAQUE requête, y compris les tiennes', good: 'ALLOWED_HOSTS = ["boutique.bj", "www.boutique.bj"]\n# en dev local : ["127.0.0.1", "localhost"] suffit\n# (avec DEBUG=True, Django tolère localhost quand la liste est vide)', why: 'Quand DEBUG=False, Django vérifie l\'en-tête Host de CHAQUE requête contre ALLOWED_HOSTS — protection anti-Host-header-poisoning. Une liste qui ne contient pas ton domaine = rejet systématique. 400 partout en prod ? Regarde ici d\'abord.' },
            { title: 'SECRET_KEY commitée ou régénérée en prod', bad: 'SECRET_KEY = "django-insecure-abc123"    # dans Git\n# ou pire : "oups, je change la clé" → toutes les sessions meurent', good: 'SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]\n# générée UNE fois (secrets.token_hex(32)), stockée hors Git,\n# et STABLE (la changer déconnecte tous les utilisateurs)', why: 'La SECRET_KEY signe sessions, tokens CSRF, reset de mots de passe : connue, elle se forge ; changée, elle invalide tout ce qui a été signé avec. Comme en Flask — environnement, jamais version, jamais de rotation impromptue.' }
          ],
          related: ['jd-demarrage', 'jd-deploiement', 'fk-configuration', 'py-fichiers']
        }
      ]
    },

    /* ======================================================
       2. URLS, VUES & TEMPLATES
       ====================================================== */
    {
      id: 'vues-dj',
      name: 'URLs, vues & templates',
      icon: 'alt_route',
      fiches: [
        {
          id: 'jd-urls',
          title: 'URLs : path(), include() & namespaces',
          icon: 'alt_route',
          level: 'Débutant',
          tagline: 'La cartographie URL → vue, les paramètres typés <int:id>, et {% url %} qui ne casse jamais un lien.',
          intro: 'Chez Django, le routage est **explicite et centralisé** : pas de décorateur magique sur les vues comme `@app.route` en Flask — un fichier `urls.py` déclare une **liste `urlpatterns`** qui associe chaque motif d\'URL à une vue. C\'est verbeux au premier contact, et c\'est une force : on voit toute la cartographie d\'un coup d\'œil, on la découpe par app avec `include()`, et on la consomme à l\'envers avec le tag `{% url %}`.',
          blocks: [
            { t: 'h3', h: 'La table de routage' },
            { t: 'code', lang: 'py', label: 'blog/urls.py', code:
'from django.urls import path\nfrom . import views\n\napp_name = "blog"            # ← le NAMESPACE (voir plus bas)\n\nurlpatterns = [\n    path("", views.liste, name="liste"),                    # /blog/\n    path("<int:pk>/", views.detail, name="detail"),         # /blog/42/\n    path("<slug:slug>/", views.par_slug, name="slug"),      # /blog/mon-titre/\n    path("archives/<int:annee>/", views.archives, name="archives"),\n]\n# path() = requête → vue ; name= sert à RETROUVER l\'URL partout ailleurs' },
            { t: 'table', head: ['Convertisseur', 'Capture', 'Exemple'], rows: [
              ['`<str:x>`', 'texte sans `/` (défaut)', '`/blog/abc/`'],
              ['`<int:x>`', 'entier → `int` Python', '`/blog/42/`'],
              ['`<slug:x>`', 'lettres, chiffres, - et _', '`/blog/mon-article/`'],
              ['`<uuid:x>`', 'UUID', '`/cle/3f2a…/`'],
              ['`<path:x>`', 'texte AVEC `/`', '`/docs/api/v1/`']
            ]},
            { t: 'h3', h: 'include() : chaque app gère ses URLs' },
            { t: 'code', lang: 'py', label: 'mysite/urls.py (racine)', code:
'from django.contrib import admin\nfrom django.urls import path, include\n\nurlpatterns = [\n    path("admin/", admin.site.urls),         # l\'admin, déjà là !\n    path("blog/", include("blog.urls")),     # délègue à blog/urls.py\n    path("comptes/", include("comptes.urls")),\n]\n# L\'app blog ne connaît PAS son préfixe : déplacer /blog/ → /actus/\n# ne touche QUE cette ligne.' },
            { t: 'h3', h: 'Inverser les URLs : jamais de chemin en dur' },
            { t: 'code', lang: 'py', code:
'# Dans un TEMPLATE — namespace:nom (grâce à app_name) :\n# <a href="{% url "blog:detail" pk=article.pk %}">Lire</a>\n\n# Dans une VUE — reverse() et redirect() :\nfrom django.urls import reverse\nreverse("blog:detail", kwargs={"pk": 42})     # → "/blog/42/"\n\nfrom django.shortcuts import redirect\nreturn redirect("blog:liste")                 # 302 vers l\'URL NOMMÉE\nreturn redirect(article)                      # → article.get_absolute_url()' },
            { t: 'p', h: 'Trois endroits, UN contrat : le **nom** de l\'URL (`blog:detail`) et ses paramètres (`pk`). Change le motif `/blog/` en `/articles/` — template, vues et tests suivent sans une seule retouche. C\'est l\'équivalent de `url_for` en Flask, en version namespacée.' },
            { t: 'callout', kind: 'tip', h: 'Convention `get_absolute_url()` sur les modèles : chaque objet sait où il vit (`return reverse("blog:detail", kwargs={"pk": self.pk})`). Les vues génériques, l\'admin et `redirect(objet)` s\'en servent tous — ajoute-la à chaque modèle principal.' }
          ],
          errors: [
            { title: 'Deux patterns qui se "volent" les requêtes', bad: 'path("<str:x>/", views.detail),\npath("nouveau/", views.creer),\n# /blog/nouveau/ tombe sur DETAIL (x="nouveau") — jamais sur creer !', good: 'path("nouveau/", views.creer),   # le SPÉCIFIQUE d\'abord\npath("<str:x>/", views.detail),    # le GÉNÉRIQUE ensuite\n# ou typé : path("<int:pk>/" …) qui ne peut pas manger "nouveau"', why: 'urlpatterns est évaluée DANS L\'ORDRE, premier motif gagnant. Un motif large placé avant un motif précis le masque en silence. Règle : du plus spécifique au plus général — et des convertisseurs typés (<int:>, <slug:>) qui limitent naturellement le vol.' },
            { title: 'Lien en dur dans les templates', bad: '<a href="/blog/{{ a.pk }}/">Lire</a>\n# casse au premier changement de préfixe, et {% url %} inutilisé', good: '<a href="{% url "blog:detail" pk=a.pk %}">Lire</a>', why: 'Le chemin n\'existe qu\'une fois : dans urls.py. Le dupliquer dans les templates le rend fragile (préfixes, include() déplacés, i18n des URLs). {% url %} + namespaces = la seule source de vérité.' }
          ],
          related: ['jd-vues', 'jd-apps', 'fk-routing', 'jd-templates']
        },

        {
          id: 'jd-vues',
          title: 'Vues basées fonctions (FBV)',
          icon: 'visibility',
          level: 'Débutant',
          tagline: 'request en entrée, response en sortie : render, redirect, get_object_or_404 — et le trio à ne JAMAIS confondre.',
          intro: 'Une **vue** Django est une fonction qui reçoit un objet `request` et retourne une `response`. Point. La simplicité est totale — et c\'est pourquoi on décortique d\'abord les **FBV** (Function-Based Views) avant les classes. Tout le reste de Django (CBV, génériques) n\'est qu\'un emballage autour de ce mécanisme.',
          blocks: [
            { t: 'h3', h: 'Anatomie complète' },
            { t: 'code', lang: 'py', label: 'blog/views.py', code:
'from django.shortcuts import render, get_object_or_404, redirect\nfrom .models import Article\n\ndef liste(request):\n    articles = Article.objects.filter(publie=True).order_by("-date_pub")\n    # render(request, template, contexte) : le contexte DEVIENT les\n    # variables du template — même idée que Flask, même piège à éviter\n    return render(request, "blog/liste.html", {"articles": articles})\n\ndef detail(request, pk):                    # pk vient de <int:pk> dans urls.py\n    article = get_object_or_404(Article, pk=pk)   # 404 propre si absent\n    return render(request, "blog/detail.html", {"article": article})\n\ndef creer(request):\n    if request.method == "POST":            # POST = traiter\n        form = ArticleForm(request.POST)\n        if form.is_valid():\n            form.save()\n            return redirect("blog:liste")   # …puis REDIRIGER (PRG !)\n    else:\n        form = ArticleForm()                # GET = AFFICHER le formulaire\n    return render(request, "blog/form.html", {"form": form})' },
            { t: 'h3', h: 'render ≠ redirect : la distinction vitale' },
            { t: 'table', head: ['Outil', 'Effet', 'Quand'], rows: [
              ['`render(...)`', 'produit du HTML, URL inchangée', 'afficher une page (GET) ou ré-afficher le formulaire avec erreurs'],
              ['`redirect(...)`', '302 : le navigateur RE-DEMANDE une URL', 'après un POST réussi — sinon F5 re-soumet !'],
              ['`get_object_or_404(...)`', 'objet ou Http404', 'détail/suppression par pk — jamais get() nu']
            ]},
            { t: 'p', h: 'C\'est le même pattern **PRG** qu\'en Flask (Post-Redirect-Get) : après tout POST qui MODIFIE, `redirect()`. `render` après un POST réussi = rafraîchissement qui re-soumet le formulaire — double création, double commande. Et `Model.objects.get(pk=…)` nu lève `DoesNotExist` → 500 ; `get_object_or_404` convertit proprement en **404**.' },
            { t: 'h3', h: 'request : les poches utiles' },
            { t: 'code', lang: 'py', code:
'request.method              # "GET" / "POST"…\nrequest.GET.get("page", "1")   # query string (?page=2)\nrequest.POST.get("titre")      # formulaire posté\nrequest.FILES.get("avatar")    # fichiers (enctype multipart !)\nrequest.user                   # utilisateur connecté (fiche Auth)\nrequest.session["panier"]      # session serveur (fiche Flask, mêmes idées)' },
            { t: 'callout', kind: 'tip', h: 'FBV par défaut, CBV quand le pattern est standard (liste/détail/CRUD d\'un modèle — fiche suivante). Une vue métier tordue en FBV reste **lisible** ; la même en CBV mal comprise devient une boîte noire. La doc officielle elle-même recommande : maîtrise les FBV d\'abord, passe aux CBV quand elles t\'économisent vraiment du code.' }
          ],
          errors: [
            { title: 'render() après un POST réussi', bad: 'if form.is_valid():\n    form.save()\n    return render(request, "blog/merci.html")   # F5 = re-soumission !', good: 'if form.is_valid():\n    form.save()\n    return redirect("blog:detail", pk=objet.pk)   # PRG', why: 'render laisse la dernière requête du navigateur être le POST : F5 la rejoue (« Confirmer le renvoi du formulaire »). Après toute écriture réussie, on redirige vers une page GET — règle absolue du web, Django inclus.' },
            { title: 'Model.objects.get() nu en vue publique', bad: 'article = Article.objects.get(pk=pk)\n# pk=999999 → Article.DoesNotExist → page 500 au visiteur !', good: 'article = get_object_or_404(Article, pk=pk)\n# id absent → 404 (normal) plutôt que 500 (panne)', why: 'Un get() sans résultat lève une exception métier qui, non traitée, devient une erreur serveur. Or un id inexistant est un cas NORMAL (lien périmé, URL tapée à la main) : il mérite une 404, seulement ça.' }
          ],
          related: ['jd-urls', 'jd-formulaires', 'fk-requetes', 'jd-erreurs']
        },

        {
          id: 'jd-cbv',
          title: 'Vues basées classes & vues génériques',
          icon: 'view_cozy',
          level: 'Intermédiaire',
          tagline: 'ListView, DetailView, CreateView : 12 lignes de CRUD que Django a déjà écrites pour toi.',
          intro: 'Afficher une liste paginée d\'articles, le détail d\'un objet, un formulaire de création : 80 % des vues web suivent ces schémas. Django les a codés **une fois pour toutes** dans les **vues génériques** — des classes dont tu hérites en ne précisant que le modèle et le template. C\'est le sommet du « batteries included » : moins de code, mais un contrat à comprendre.',
          blocks: [
            { t: 'h3', h: 'Le trio de base' },
            { t: 'code', lang: 'py', code:
'from django.views.generic import ListView, DetailView, CreateView\nfrom django.urls import reverse_lazy\nfrom .models import Article\n\nclass ArticleListView(ListView):\n    model = Article                       # tout est déduit : requête,\n    template_name = "blog/liste.html"     # queryset (= objects.all()),\n    context_object_name = "articles"      # nom en template (sinon object_list)\n    paginate_by = 10                      # pagination GRATUITE (page_obj !)\n\nclass ArticleDetailView(DetailView):\n    model = Article                       # récupère par pk/slug + 404 auto\n    # template par défaut : blog/article_detail.html (app/modele_detail)\n\nclass ArticleCreateView(CreateView):\n    model = Article\n    fields = ["titre", "contenu"]         # ModelForm fabriqué tout seul\n    success_url = reverse_lazy("blog:liste")   # où aller après save' },
            { t: 'code', lang: 'py', label: 'blog/urls.py', code:
'urlpatterns = [\n    path("", ArticleListView.as_view(), name="liste"),\n    path("<int:pk>/", ArticleDetailView.as_view(), name="detail"),\n    path("nouveau/", ArticleCreateView.as_view(), name="creer"),\n]\n# .as_view() : la MÉTHODE qui rend la classe appelable comme une FBV' },
            { t: 'h3', h: 'Personnaliser : surcharger une méthode, pas réécrire' },
            { t: 'code', lang: 'py', code:
'class ArticleListView(ListView):\n    model = Article\n\n    def get_queryset(self):\n        # le point d\'entrée OFFICIEL pour filtrer (requête, user, kwargs)\n        return (Article.objects\n                .filter(publie=True)\n                .order_by("-date_pub"))\n\n    def get_context_data(self, **kwargs):\n        ctx = super().get_context_data(**kwargs)   # garde l\'existant !\n        ctx["nb_brouillons"] = Article.objects.filter(publie=False).count()\n        return ctx' },
            { t: 'p', h: 'La philosophie CBV : on n\'écrit plus la vue, on **injecte des surcharges** aux points prévus — `get_queryset` pour les données, `get_context_data` pour le contexte, `form_valid` pour ce qui se passe à la sauvegarde. La doc « Classy Class-Based Views » (ccbv.co.uk) liste tous ces points d\'extension : c\'est la carte de lecture indispensable.' },
            { t: 'h3', h: 'Et les mixins : les décorateurs de classes' },
            { t: 'code', lang: 'py', code:
'from django.contrib.auth.mixins import LoginRequiredMixin\n\nclass TableauDeBordView(LoginRequiredMixin, ListView):\n    # LoginRequiredMixin EN PREMIER : il court-circuite avant le reste\n    model = Article\n    def get_queryset(self):\n        return Article.objects.filter(auteur=self.request.user)' },
            { t: 'callout', kind: 'warn', h: 'Piège de lisibilité : une CBV est un arbre d\'héritage ; surcharger une méthode qui n\'existe pas (faute de frappe : `get_query_set`) ne lève **aucune erreur** — ta surcharge est juste ignorée. Quand une CBV « n\'écoute pas », vérifie le nom exact de la méthode sur ccbv.co.uk avant tout.' }
          ],
          errors: [
            { title: 'Filtrer en surchargeant queryset en attribut, de façon dynamique', bad: 'class ArticlesUserView(ListView):\n    queryset = Article.objects.filter(publie=True)\n    # évalué UNE FOIS à l\'import + ignore request.user !', good: 'def get_queryset(self):\n    return Article.objects.filter(\n        publie=True, auteur=self.request.user)', why: 'Un attribut queryset est évalué au CHARGEMENT du module : figé (vieilles données en cache possible) et incapable de voir la requête. Tout filtrage dépendant du contexte (user, kwargs d\'URL, GET) vit dans get_queryset().' },
            { title: 'success_url = reverse() au niveau classe : ImportError', bad: 'class ArticleCreateView(CreateView):\n    success_url = reverse("blog:liste")\n# → AppRegistryNotReady / import circulaire au chargement !', good: 'success_url = reverse_lazy("blog:liste")\n# ou : def get_success_url(self): return reverse(...)', why: 'Au niveau CLASSE, le module est évalué AVANT que les URLs soient chargées : reverse() explose. reverse_lazy diffère la résolution au premier usage — LA règle chaque fois qu\'on résout une URL hors d\'une fonction.' }
          ],
          related: ['jd-vues', 'jd-formulaires', 'jd-auth', 'py-classes']
        },

        {
          id: 'jd-templates',
          title: 'Templates : le DTL',
          icon: 'description',
          level: 'Débutant',
          tagline: '{{ }} et {% %} famille Jinja, héritage par blocks, filtres |pipe — plus le csrf_token qui sauve les meubles.',
          intro: 'Django livre son propre moteur de templates, le **DTL** — cousin de Jinja2 (même famille : `{{ variable }}`, `{% tag %}`), avec deux particularités à connaître : la logique est volontairement **plus limitée** (pas d\'appels de fonctions arbitraires dans le template) et le **`{% csrf_token %}`** est **obligatoire** dans chaque formulaire POST (sinon : 403). Si tu viens du module Flask/Jinja, tout te sera familier en dix minutes.',
          blocks: [
            { t: 'h3', h: 'Variables, boucles, conditions' },
            { t: 'code', lang: 'html', label: 'blog/liste.html', code:
'<h1>{{ titre_page }}</h1>\n\n{% if articles %}\n  <ul>\n  {% for a in articles %}\n    <li>\n      <a href="{% url "blog:detail" pk=a.pk %}">{{ a.titre }}</a>\n      — publié le {{ a.date_pub|date:"d F Y" }}\n      {% if forloop.first %}<strong>(le plus récent)</strong>{% endif %}\n    </li>\n  {% empty %}\n    <li>Aucun article pour le moment.</li>   {# for…empty : la bonne surprise #}\n  {% endfor %}\n  </ul>\n{% endif %}\n\n{# Notation POINT universelle : a.titre cherche attribut, clé de dict,\n   méthode SANS parenthèses — le DTL appelle tout seul. #}' },
            { t: 'table', head: ['Jinja2 (Flask)', 'DTL (Django)', 'Note'], rows: [
              ['`{{ loop.index }}`', '`{{ forloop.counter }}`', 'compteur de boucle'],
              ['`{% for … %}{% else %}`', '`{% for … %}{% empty %}`', 'boucle vide'],
              ['`{{ x|length }}`', '`{{ x|length }}`', 'filtres très proches'],
              ['appels `{{ f(x) }}`', '**impossibles**', 'le template n\'appelle rien : la vue prépare'],
              ['`, ".join(tags)`', '`{{ tags|join:", " }}`', 'join est un filtre'],
              ['macro/include', 'include seulement', 'DTL n\'a pas de macros']
            ]},
            { t: 'h3', h: 'Héritage : base.html + blocks' },
            { t: 'code', lang: 'html', code:
'<!-- templates/base.html -->\n{% load static %}\n<title>{% block title %}Mon Site{% endblock %}</title>\n<link rel="stylesheet" href="{% static "css/site.css" %}">\n<main>{% block content %}{% endblock %}</main>\n\n<!-- blog/detail.html -->\n{% extends "base.html" %}\n{% block title %}{{ article.titre }}{% endblock %}\n{% block content %}\n  <h1>{{ article.titre }}</h1>\n  <p>{{ article.contenu|linebreaks }}</p>\n{% endblock %}\n<!-- extends EN PREMIER, comme en Jinja — un seul parent par template -->' },
            { t: 'h3', h: 'Les filtres du quotidien' },
            { t: 'code', lang: 'html', code:
'{{ article.date_pub|date:"d/m/Y" }}     {{ article.titre|upper }}\n{{ article.contenu|truncatewords:30 }}  {{ prix|default:"—" }}\n{{ articles|length }} article{{ articles|pluralize }}   {# le "s" auto ! #}\n{{ commentaire|linebreaksbr }}          {# sauts de ligne → <br> #}' },
            { t: 'code', lang: 'py', code:
'# Filtre MAISON : blog/templatetags/prix_extras.py\nfrom django import template\nregister = template.Library()\n\n@register.filter\ndef fcfa(n):\n    return f"{n:,.0f} F".replace(",", " ")\n\n# puis : {% load prix_extras %} en haut du template → {{ p.prix|fcfa }}' },
            { t: 'callout', kind: 'warn', h: 'Tout formulaire POST Django doit contenir **`{% csrf_token %}`** — sans lui, la réponse est un **403 Forbidden** sec (le middleware CSRF veille). C\'est la sécurité anti-CSRF native, équivalente du `hidden_tag()` de Flask-WTF : non négociable, à tatouer.' }
          ],
          errors: [
            { title: '403 Forbidden sur un formulaire sans csrf_token', bad: '<form method="post">\n  <input name="titre">\n  <button>OK</button>\n</form>\n<!-- → 403 CSRF verification failed -->', good: '<form method="post">\n  {% csrf_token %}              <!-- le champ caché signé -->\n  <input name="titre">\n</form>', why: 'Django exige le jeton CSRF à tout POST : c\'est la parade contre les soumissions forgées depuis un site tiers. Le bloc {% csrf_token %} est aussi indispensable aux appels AJAX POST (header X-CSRFToken).' },
            { title: 'Mettre la logique métier dans le template', bad: '{% for c in commandes %}\n  {# calculs de totaux, filtres chaînés, "si VIP alors…" #}\n{% endfor %}', good: '{# la VUE prépare des objets/dicts prêts : total, est_vip #}\n{% for c in commandes %}\n  <tr><td>{{ c.total|fcfa }}</td></tr>\n{% endfor %}', why: 'Le DTL est VOLONTAIREMENT limité pour te pousser à préparer les données dans la vue (ou en property du modèle). Un template qui calcule est un template in-testable : la règle Flask/Jinja « le template affiche, la vue prépare » vaut ici aussi.' }
          ],
          related: ['jd-vues', 'fk-templates', 'fk-templates-heritage', 'jd-statiques']
        }
      ]
    },

    /* ======================================================
       3. DONNÉES : ORM & FORMULAIRES
       ====================================================== */
    {
      id: 'donnees-dj',
      name: 'Données : ORM & formulaires',
      icon: 'storage',
      fiches: [
        {
          id: 'jd-modeles',
          title: 'Modèles : champs & relations',
          icon: 'storage',
          level: 'Intermédiaire',
          tagline: 'Une classe = une table : CharField, ForeignKey, ManyToMany — et related_name, le détail qui sauve l\'admin.',
          intro: 'L\'ORM de Django est le morceau le plus impressionnant du « batteries included » : un modèle = une **classe** héritant de `models.Model`, dont les **attributs de classe** décrivent les colonnes. Déclaré une fois, il te donne la table, les requêtes ORM (fiche suivante), les **migrations** automatiques, le formulaire ModelForm et l\'interface d\'admin. Un seul fichier, quatre cadeaux.',
          blocks: [
            { t: 'h3', h: 'Déclarer un modèle' },
            { t: 'code', lang: 'py', label: 'blog/models.py', code:
'from django.db import models\n\nclass Auteur(models.Model):\n    nom = models.CharField(max_length=80)          # CharField EXIGE max_length\n    bio = models.TextField(blank=True)             # blank=True : champ facultatif\n\n    def __str__(self):                              # L\'affichage dans l\'admin !\n        return self.nom\n\nclass Article(models.Model):\n    titre = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)            # pour l\'URL\n    contenu = models.TextField()\n    publie = models.BooleanField(default=False)\n    prix = models.DecimalField(max_digits=9, decimal_places=0, default=0)\n    date_pub = models.DateTimeField(auto_now_add=True)   # posée à la création\n    auteur = models.ForeignKey(\n        Auteur, on_delete=models.CASCADE,          # que faire si l\'auteur part\n        related_name="articles"                    # auteur.articles.all() !\n    )\n    tags = models.ManyToManyField("Tag", blank=True, related_name="articles")\n\n    class Meta:\n        ordering = ["-date_pub"]                    # tri par défaut partout' },
            { t: 'table', head: ['Champ', 'SQL', 'Usage'], rows: [
              ['`CharField`', 'VARCHAR', 'textes courts — `max_length` requis'],
              ['`TextField`', 'TEXT', 'textes longs sans limite'],
              ['`IntegerField` / `DecimalField`', 'INT / NUMERIC', 'argent = Decimal, JAMAIS float (!)'],
              ['`BooleanField` / `DateTimeField`', 'BOOL / TIMESTAMP', '`auto_now_add` création, `auto_now` modif'],
              ['`EmailField` / `SlugField` / `URLField`', 'VARCHAR validé', 'validation de forme incluse'],
              ['`FileField` / `ImageField`', 'chemin + fichier', 'uploads (`upload_to`, fiche Médias)']
            ]},
            { t: 'h3', h: 'Relations : les trois archetypes' },
            { t: 'code', lang: 'py', code:
'# N:1 — ForeignKey (plusieurs articles, UN auteur) :\nauteur = models.ForeignKey(Auteur, on_delete=models.CASCADE,\n                           related_name="articles")\n\n# M:N — ManyToManyField (plusieurs tags ↔ plusieurs articles) :\ntags = models.ManyToManyField("Tag", related_name="articles")\n# usage : article.tags.add(django_tag) ; article.tags.all()\n\n# 1:1 — OneToOneField (UN profil par utilisateur) :\nprofil = models.OneToOneField(User, on_delete=models.CASCADE,\n                              related_name="profil")\n\n# on_delete : CASCADE (tout supprimer), PROTECT (interdire),\n#             SET_NULL (null=True requis) — lis la doc, choisis en conscience.' },
            { t: 'p', h: '`related_name` name le **chemin inverse** : `auteur.articles.all()`. Sans lui, Django fabrique `article_set` — illisible, et **collision garantie** dès que deux ForeignKeys pointent vers le même modèle (fiche Erreurs fréquentes). Nomme-le toujours explicitement, au pluriel.' },
            { t: 'callout', kind: 'tip', h: '`null=True` vs `blank=True` : le premier autorise NULL **en base** (à éviter sur les champs texte — deux « vides » cohabitent), le second autorise le champ vide **dans les formulaires**. Duo standard pour un texte optionnel : `CharField(max_length=80, blank=True, default="")`.' }
          ],
          errors: [
            { title: 'Oublier les migrations après modification du modèle', bad: '# ajout d\'un champ dans models.py, puis :\nArticle.objects.create(..., bio="…")\n# django.db.utils.OperationalError: no such column: blog_article.bio', good: 'python manage.py makemigrations blog   # 1. décrire le changement\npython manage.py migrate                # 2. l\'appliquer en base', why: 'Le modèle Python et le SCHÉMA SQL sont deux mondes : seuls makemigrations + migrate les synchronisent. C\'est LE réflexe Django n°1 : tout changement de modèle = les deux commandes, immédiatement (fiche Migrations).' },
            { title: 'Deux FK vers User sans related_name', bad: 'class Commentaire(models.Model):\n    auteur = models.ForeignKey(User, on_delete=models.CASCADE)\n    approuve_par = models.ForeignKey(User, null=True,\n                                     on_delete=models.SET_NULL)\n# Reverse accessor clash ! (les deux feraient user.commentaire_set)', good: 'auteur = models.ForeignKey(User, related_name="commentaires", …)\napprouve_par = models.ForeignKey(User, related_name="validations", …)', why: 'Le chemin inverse par défaut (<modele>_set) se duplique dès que deux relations visent le même modèle : Django refuse de démarrer avec une erreur "clash". related_name distincts = fin du problème — et des chemins lisibles.' }
          ],
          related: ['jd-orm', 'jd-migrations', 'fk-sqlalchemy', 'py-classes']
        },

        {
          id: 'jd-orm',
          title: 'Requêtes ORM & QuerySets',
          icon: 'query_stats',
          level: 'Intermédiaire',
          tagline: 'filter(), exclude(), annotate() : des requêtes paresseuses et composables — et le N+1 à tuer dans l\'œuf.',
          intro: 'Le QuerySet est l\'objet magique de Django : **paresseux** (le SQL ne part que quand tu consommes), **chainable** (chaque méthode en renvoie un nouveau), et expressif via un mini-langage de *lookups* (`champ__operateur=valeur`). Maîtriser `filter/exclude/get/annotate` — et comprendre quand le SQL part vraiment — c\'est 90 % du quotidien Django.',
          blocks: [
            { t: 'h3', h: 'Les bases chainables' },
            { t: 'code', lang: 'py', code:
'from blog.models import Article\n\n# QUERYSET : rien n\'est exécuté tant qu\'on n\'ITÈRE pas !\nrecents = Article.objects.filter(publie=True).order_by("-date_pub")[:10]\n\nfor a in recents:                    # ← LE SQL PART ICI (une seule fois)\n    print(a.titre)\n\nArticle.objects.get(pk=42)           # UN objet — DoesNotExist si absent\nArticle.objects.filter(publie=True).count()\nArticle.objects.filter(prix__gt=1000).exclude(titre__icontains="brouillon")\nArticle.objects.filter(auteur__nom="Awa")      # TRAVERSER les relations : __\nArticle.objects.filter(publie=True).exists()   # booléen optimisé' },
            { t: 'table', head: ['Lookup', 'Sens', 'Exemple'], rows: [
              ['`champ__gte` / `__lte`', '≥ / ≤', '`prix__gte=1000`'],
              ['`champ__contains` / `__icontains`', 'contient (i = insensible casse)', '`titre__icontains="django"`'],
              ['`champ__in`', 'dans la liste', "`id__in=[1, 2, 3]`"],
              ['`champ__date` / `__year`', 'partie de date', '`date_pub__year=2026`'],
              ['`champ__isnull`', 'NULL ?', '`bio__isnull=True`'],
              ['`fk__champ`', 'traverse la relation', '`auteur__nom__icontains="wa"`']
            ]},
            { t: 'h3', h: 'annotate : demander à SQL de compter' },
            { t: 'code', lang: 'py', code:
'from django.db.models import Count, Avg\n\n# chaque auteur avec le NOMBRE d\'articles — calculé PAR LA BASE :\nauteurs = (Auteur.objects\n           .annotate(nb_articles=Count("articles"))   # related_name !\n           .order_by("-nb_articles"))\nfor a in auteurs:\n    print(a.nom, a.nb_articles)\n\nprix_moyen = Article.objects.aggregate(Avg("prix"))   # {"prix__avg": …}' },
            { t: 'h3', h: 'Le N+1 : le meurtrier silencieux' },
            { t: 'code', lang: 'py', code:
'# ❌ classique : 1 requête pour les articles… puis 1 PAR article :\nfor a in Article.objects.all():        # 1 requête\n    print(a.auteur.nom)                # +1 requête À CHAQUE tour ! (lazy)\n\n# ✅ select_related : la JOINTURE dans la requête initiale (FK, 1:1)\nfor a in Article.objects.select_related("auteur"):\n    print(a.auteur.nom)                # 1 requête au TOTAL\n\n# ✅ prefetch_related : relation M:N / inverse — 2 requêtes au total\nfor a in Article.objects.prefetch_related("tags"):\n    print([t.nom for t in a.tags.all()])' },
            { t: 'p', h: 'En dev, garde un œil sur la page de debug Django (onglet SQL) ou le package `django-debug-toolbar` : ils comptent les requêtes par page. Une page à 150 requêtes = un N+1 caché, quasiment toujours soigné par `select_related`/`prefetch_related`. Même leçon que pour l\'Eager Loading de Laravel et le `joinedload` de SQLAlchemy.' },
            { t: 'callout', kind: 'tip', h: 'Le QuerySet SE COMPOSE : écris `qs = Article.objects.filter(publie=True)` puis `qs = qs.order_by("-date_pub")`, branche avec des `if` (formulaire de filtres !) — tant que tu n\'itères pas, tu ne paies rien. C\'est l\'arme des vues de recherche/filtres.' }
          ],
          errors: [
            { title: 'len(qs) + boucle + count() : SQL multiplié inutilement', bad: 'if len(articles) == 0:        # évalue TOUT le queryset…\n    return\nfor a in articles:              # …et une deuxième fois ici !\n    print(a.titre)', good: 'if not articles.exists():     # requête booléenne optimisée\n    return\nfor a in articles:              # UNE requête itérative\n    print(a.titre)', why: 'Un QuerySet se consomme : itérer dessus après un len() peut re-partir en SQL. exists()/count() expriment l\'intention optimisée ; itérer UNE fois et chaîner — la paresse travaille pour toi, pas contre.' },
            { title: 'Filtrer en Python au lieu du SQL', bad: 'actifs = [a for a in Article.objects.all() if a.publie]\n# TOUTE la table en mémoire, triée à la main…', good: 'actifs = Article.objects.filter(publie=True)\n# la base filtre ET indexe ; Python reçoit le strict nécessaire', why: 'Filtrer en Python télécharge toute la table (mémoire, réseau) et renonce aux index. Règle d\'or ORM : tout ce que SQL sait faire (WHERE, ORDER, LIMIT, COUNT) doit rester DANS SQL — Python pour ce que SQL ne sait pas.' }
          ],
          related: ['jd-modeles', 'fk-sqlalchemy', 'py-comprehensions', 'jd-migrations']
        },

        {
          id: 'jd-migrations',
          title: 'Migrations : le schéma sous contrôle',
          icon: 'sync',
          level: 'Intermédiaire',
          tagline: 'makemigrations décrit, migrate applique : le schéma ÉVOLUE avec le code, versionné dans Git.',
          intro: 'Modifier un modèle et synchroniser la base : en SQL manuel c\'est l\'angoisse (ALTER TABLE à la main, collègues désynchronisés). Django automatise tout : **`makemigrations`** compare tes modèles au dernier état connu et **écrit un fichier de migration** (du Python versionné !), **`migrate`** applique ce qui n\'a pas encore été joué. Le schéma de la base voyage **avec le code** — c\'est le principe des migrations de Laravel, inventé… par Django.',
          blocks: [
            { t: 'h3', h: 'Le duo quotidien' },
            { t: 'code', lang: 'bash', code:
'# 1. tu CHANGES models.py (champ, relation, Meta…)\n# 2. Django fabrique le fichier de migration :\npython manage.py makemigrations blog\n# Migrations for "blog":\n#   blog/migrations/0003_article_bio.py\n#     - Add field bio to article\n\n# 3. tu lis le fichier (c\'est du Python — RELIS-LE !), tu le COMMIT\n# 4. application en base :\npython manage.py migrate\n# Applying blog.0003_article_bio... OK' },
            { t: 'h3', h: 'Les commandes qui dépannent' },
            { t: 'code', lang: 'bash', code:
'python manage.py showmigrations blog     # quelles sont jouées ? [X] / [ ]\npython manage.py migrate blog 0002       # REVENIR en arrière !\npython manage.py sqlmigrate blog 0003    # voir le SQL généré\npython manage.py makemigrations --empty blog   # migration manuelle (données !)' },
            { t: 'p', h: 'Le point capital : **les fichiers de migration se committent** (dans `blog/migrations/`). C\'est eux qui garantissent que ton collègue, la CI et la prod applique **exactement** les mêmes changements, dans le même ordre. La table `django_migrations` en base tient le registre de ce qui a été appliqué.' },
            { t: 'h3', h: 'Migrations de DONNÉES (RunPython)' },
            { t: 'code', lang: 'py', code:
'# générée avec makemigrations --empty, remplie à la main :\ndef remplir_slugs(apps, schema_editor):\n    Article = apps.get_model("blog", "Article")   # TOUJOURS via apps,\n    for a in Article.objects.all():               # pas l\'import direct !\n        a.slug = slugify(a.titre)\n        a.save()\n\nclass Migration(migrations.Migration):\n    dependencies = [("blog", "0004_ajout_slug")]\n    operations = [migrations.RunPython(remplir_slugs)]' },
            { t: 'callout', kind: 'warn', h: 'Piège classique de la contrainte `NOT NULL` : ajouter un champ obligatoire sur une table **peuplée** — Django demande alors une valeur par défaut (option 1 : fournir une valeur one-off ; option 2 : ajouter `default=` au modèle). C\'est normal et protecteur : la base refuse d\'inventer des valeurs pour les lignes existantes.' }
          ],
          errors: [
            { title: 'Appliquer migrate avant makemigrations… ou jamais à temps', bad: '# modèle modifié, migrate lancé direct :\npython manage.py migrate\n# "no migrations to apply" — et le champ manque toujours en base !', good: 'python manage.py makemigrations   # D\'ABORD décrire\npython manage.py migrate            # PUIS appliquer', why: 'migrate n\'applique que des fichiers de migration EXISTANTS : sans makemigrations, il n\'y a rien à jouer. Le réflexe permanent : après TOUT changement de modèle, les DEUX commandes, dans cet ordre.' },
            { title: 'Éditer/supprimer une migration déjà appliquée partout', bad: '# 0003 poussée et appliquée en prod… puis modifiée "au propre"\n# → conflit : la prod a joué l\'ANCIENNE version, l\'historique diverge', good: '# une migration appliquée/partagée est IMMUABLE :\n# on corrige avec une NOUVELLE migration (0004) qui répare', why: 'Les migrations forment une CHAÎNE dépendante (dependencies). En modifier une déjà jouée ailleurs casse la synchronisation historique (InconsistentMigrationHistory). Réparation = nouvelle migration, jamais réécriture du passé.' }
          ],
          related: ['jd-modeles', 'fk-extensions', 'fk-sqlalchemy', 'jd-deploiement']
        },

        {
          id: 'jd-formulaires',
          title: 'Formulaires & ModelForm',
          icon: 'assignment',
          level: 'Intermédiaire',
          tagline: 'forms.Form déclare, is_valid() décide, cleaned_data délivre — et ModelForm fabrique le tout depuis le modèle.',
          intro: 'Django traite un formulaire comme un **objet** : déclaré en classe, il sait se **rendre en HTML**, **valider** la soumission (`is_valid()`), et exposer les données propres (`cleaned_data`). Quand la cible est un modèle, `ModelForm` déduit les champs tout seul — avec la validation CSRF native (`{% csrf_token %}`) déjà vue en templates. C\'est la réponse « batteries included » à ce que Flask-WTF fournit à Flask.',
          blocks: [
            { t: 'h3', h: 'forms.Form : la version explicite' },
            { t: 'code', lang: 'py', label: 'blog/forms.py', code:
'from django import forms\n\nclass ContactForm(forms.Form):\n    nom = forms.CharField(max_length=80)\n    email = forms.EmailField()\n    message = forms.CharField(widget=forms.Textarea)\n\n    # validation MÉTIER : méthode clean_<champ> — levée = champ refusé\n    def clean_message(self):\n        msg = self.cleaned_data["message"]\n        if len(msg) < 10:\n            raise forms.ValidationError("Un peu court : 10 caractères min.")\n        return msg' },
            { t: 'code', lang: 'py', label: 'blog/views.py', code:
'def contact(request):\n    if request.method == "POST":\n        form = ContactForm(request.POST)     # LE FORMULAIRE LIÉ aux données\n        if form.is_valid():                   # valide CHAQUE champ + clean_*\n            envoyer(form.cleaned_data)        # données NETTOYÉES et typées\n            return redirect("blog:merci")     # PRG, toujours\n    else:\n        form = ContactForm()                  # GET : formulaire vierge\n    return render(request, "blog/contact.html", {"form": form})' },
            { t: 'code', lang: 'html', label: 'blog/contact.html', code:
'<form method="post">\n  {% csrf_token %}\n  {{ form.as_p }}          <!-- champs + labels + erreurs, tout généré -->\n  <button>Envoyer</button>\n</form>\n\n<!-- version manuelle pour la maquette précise :\n{{ form.nom.label_tag }} {{ form.nom }} {{ form.nom.errors }} -->' },
            { t: 'h3', h: 'ModelForm : le formulaire né du modèle' },
            { t: 'code', lang: 'py', code:
'class ArticleForm(forms.ModelForm):\n    class Meta:\n        model = Article\n        fields = ["titre", "slug", "contenu", "publie", "tags"]\n        # ou exclude = ["date_pub"] — JAMAIS fields = "__all__" en prod\n\ndef editer(request, pk):\n    article = get_object_or_404(Article, pk=pk)\n    if request.method == "POST":\n        form = ArticleForm(request.POST, request.FILES, instance=article)\n        if form.is_valid():\n            form.save()               # crée OU MET À JOUR l\'objet lié !\n            return redirect("blog:detail", pk=article.pk)\n    else:\n        form = ArticleForm(instance=article)    # pré-rempli depuis l\'objet\n    return render(request, "blog/edit.html", {"form": form, "a": article})' },
            { t: 'p', h: 'Le cycle mental : `instance=` lie le formulaire à une ligne existante (édition), absent = création. `form.save()` persiste directement — tu peux intercepter avant : `objet = form.save(commit=False)` puis `objet.auteur = request.user` puis `objet.save()`. Pattern quotidien pour les champs que l\'utilisateur ne doit PAS remplir (auteur, dates).' },
            { t: 'callout', kind: 'warn', h: '`fields = "__all__"` est un piège de sécurité : la prochaine colonne sensible (`is_staff`, `hash`) se retrouve éditable par formulaire sans que personne ne l\'ait décidé. Liste toujours explicitement les champs exposés — le jour où le modèle grandit, la surface d\'attaque, elle, ne bouge pas.' }
          ],
          errors: [
            { title: 'Lire request.POST["email"] au lieu de cleaned_data', bad: 'email = request.POST["email"]\n# non validé, non typé, espaces inclus — et KeyError si absent', good: 'if form.is_valid():\n    email = form.cleaned_data["email"]   # validé, nettoyé, typé', why: 'request.POST est cru : chaînes jamais validées, absence qui lève KeyError, conversions absentes (les dates/restent des str). is_valid() + cleaned_data est LE canal — toute lecture directe contourne la validation que tu viens d\'écrire.' },
            { title: 'Oublier request.FILES (uploads vides)', bad: 'form = ArticleForm(request.POST)\n# le fichier image arrive… et form.is_valid() échoue / champ vide', good: 'form = ArticleForm(request.POST, request.FILES, instance=a)\n# + <form enctype="multipart/form-data"> dans le template !', why: 'Les fichiers ne voyagent pas dans POST mais dans FILES — et seulement si le formulaire HTML porte enctype="multipart/form-data". Les deux oublis vont ensemble : le symptôme « l\'image ne s\'enregistre jamais » commence toujours ici.' }
          ],
          related: ['jd-vues', 'jd-modeles', 'fk-formulaires', 'html-formulaires']
        }
      ]
    },

    /* ======================================================
       4. AUTH, ADMIN & INFRASTRUCTURE
       ====================================================== */
    {
      id: 'infra-dj',
      name: 'Auth, admin & infrastructure',
      icon: 'admin_panel_settings',
      fiches: [
        {
          id: 'jd-admin',
          title: 'Le panneau d\'administration',
          icon: 'admin_panel_settings',
          level: 'Intermédiaire',
          tagline: 'admin.site.register et un back-office CRUD complet apparaît — personnalisable, sécurisé, gratuit.',
          intro: 'L\'admin Django est la démonstration la plus grinçante du « batteries included » : tu déclares tes modèles dans `admin.py`, et tu obtiens un **back-office complet** — listes, recherches, filtres, formulaires, permissions — accessible sur `/admin/`. Ce n\'est pas un gadget de démo : des équipes entières gèrent leur contenu là-dessus en production, après quelques personnalisations.',
          blocks: [
            { t: 'h3', h: 'En 3 lignes' },
            { t: 'code', lang: 'bash', code:
'python manage.py createsuperuser     # un compte staff (une fois)' },
            { t: 'code', lang: 'py', label: 'blog/admin.py', code:
'from django.contrib import admin\nfrom .models import Article, Auteur\n\nadmin.site.register(Auteur)          # CRUD complet immédiat\nadmin.site.register(Article)\n# → http://127.0.0.1:8000/admin/ : lister, créer, éditer, supprimer !' },
            { t: 'h3', h: 'Personnaliser avec ModelAdmin' },
            { t: 'code', lang: 'py', label: 'blog/admin.py', code:
'@admin.register(Article)\nclass ArticleAdmin(admin.ModelAdmin):\n    list_display = ("titre", "auteur", "publie", "date_pub")  # colonnes\n    list_filter = ("publie", "date_pub")                      # filtres latéraux\n    search_fields = ("titre", "contenu")                      # champ recherche\n    prepopulated_fields = {"slug": ("titre",)}                # slug auto !\n    ordering = ("-date_pub",)' },
            { t: 'code', lang: 'py', code:
'# Le bonus quasi magique — les inlines (éditer les ENFANTS dans le parent) :\nclass CommentaireInline(admin.TabularInline):\n    model = Commentaire\n    extra = 1                         # lignes vides affichées d\'avance\n\n@admin.register(Article)\nclass ArticleAdmin(admin.ModelAdmin):\n    inlines = [CommentaireInline]     # commentaires édités DANS l\'article' },
            { t: 'h3', h: 'Ce que l\'admin est — et n\'est pas' },
            { t: 'ul', items: [
              '**Un outil INTERNE** : staff, contenu, support — pas l\'interface de tes visiteurs.',
              '**Sécurisé par l\'auth** : seuls les comptes `is_staff` (et les permissions par modèle) entrent.',
              '**Action maison possible** : `@admin.action(description="Publier")` + `actions = [publier]` pour les traitements par lot.',
              '**Ne pas l\'exposer tel quel** : en prod, change l\'URL `admin/` (obscurité), force un mot de passe fort, idéalement IP allowlist / 2FA via package.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Règle d\'affichage : un modèle sans `__str__` apparaît dans l\'admin sous `Article object (3)` — illisible dès dix objets. Définis `__str__` sur CHAQUE modèle dès sa création (fiche POO — la dunder qui sert partout) ; ton admin devient navigable immédiatement.' }
          ],
          errors: [
            { title: 'Tout le monde est superuser (« pour aller vite »)', bad: '# le compte redac@ est superuser → il voit TOUT, supprime TOUT', good: '# is_staff=True + permissions ciblées (groupes !) :\n# Groupe "Rédaction" : add/change article ; pas delete, pas auth', why: 'L\'admin honore le système de permissions par modèle (add/change/delete/view) : les groupes permettent un back-office à rôles en dix minutes. Le tout-superuser est la première erre de gouvernance — et la dernière avant l\'accident.' },
            { title: 'list_display avec une relation qui tue la page', bad: 'list_display = ("titre", "auteur", "tags")\n# la page liste fait SELECT × N par ligne…', good: 'list_display = ("titre", "auteur")\nlist_select_related = ("auteur",)      # jointure en une requête\n# ou une méthode @property affichée, pré-calculée en get_queryset', why: 'Chaque colonne relationnelle peut générer une requête PAR LIGNE (N+1 version admin). list_select_related et les méthodes annotées en get_queryset gardent l\'admin fluide — même leçon que la fiche ORM.' }
          ],
          related: ['jd-auth', 'jd-modeles', 'fk-extensions', 'py-classes']
        },

        {
          id: 'jd-auth',
          title: 'Authentification & permissions',
          icon: 'vpn_key',
          level: 'Intermédiaire',
          tagline: 'Le système d\'auth est INCLUS : User, login_required, permissions — ne réinvente jamais la roue des mots de passe.',
          intro: 'Django embarque un système d\'authentification **complet et éprouvé** : modèle `User`, hashage des mots de passe, sessions, vues de connexion/déconnexion/reset, permissions et groupes. Comparé à Flask-Login (excellent, mais à câbler soi-même — fiche Extensions Flask), tout est **déjà dans INSTALLED_APPS** : `django.contrib.auth` + `django.contrib.contenttypes` + `django.contrib.sessions`. Ta mission : l\'utiliser, pas le réécrire.',
          blocks: [
            { t: 'h3', h: 'Brancher les vues officielles de connexion' },
            { t: 'code', lang: 'py', label: 'mysite/urls.py', code:
'urlpatterns = [\n    path("admin/", admin.site.urls),\n    path("comptes/", include("django.contrib.auth.urls")),\n    # ↑ fournit : login, logout, password_change, password_reset…\n]\n# Django cherche alors : templates/registration/login.html (à toi !)' },
            { t: 'code', lang: 'html', label: 'templates/registration/login.html', code:
'{% extends "base.html" %}\n{% block content %}\n<h1>Connexion</h1>\n<form method="post">\n  {% csrf_token %}\n  {{ form.as_p }}\n  <button>Se connecter</button>\n</form>\n{% endblock %}\n<!-- LOGIN_REDIRECT_URL = "blog:liste" dans settings.py pour l\'après-login -->' },
            { t: 'h3', h: 'Protéger et savoir QUI est connecté' },
            { t: 'code', lang: 'py', code:
'from django.contrib.auth.decorators import login_required\n\n@login_required                         # non connecté → LOGIN_URL + ?next=\ndef profil(request):\n    return render(request, "blog/profil.html", {"user": request.user})\n\n# En CBV : LoginRequiredMixin (fiche CBV) ; dans les templates :\n# {% if user.is_authenticated %}Bonjour {{ user.username }}{% endif %}' },
            { t: 'code', lang: 'py', code:
'# Créer un utilisateur — JAMAIS en assignant le mot de passe en clair :\nfrom django.contrib.auth.models import User\nu = User.objects.create_user(username="awa", password="S3cur!té")\n#         └─ create_user : hashage automatique (PBKDF2 par défaut)\n\n# Attribution d\'une permission métier + vérification :\nif request.user.has_perm("blog.publier_article"):\n    publier()\n\n# Permissions par GROUPE (recommandé) : dans l\'admin,\n# créer le groupe "Rédaction", cocher, affecter les users.' },
            { t: 'h3', h: 'Le piège du modèle User custom — décide TÔT' },
            { t: 'code', lang: 'py', code:
'# Si un jour tu veux User avec email/pseudo/téléphone custom :\n# créer TON modèle AVANT la première migration prod :\n# comptes/models.py\nfrom django.contrib.auth.models import AbstractUser\nclass User(AbstractUser):\n    telephone = models.CharField(max_length=20, blank=True)\n\n# settings.py : AUTH_USER_MODEL = "comptes.User"\n# Changer APRÈS = douleur migratoire majeure. La doc officielle :\n# « fortement recommandé, même si vous n\'avez rien à ajouter (encore) ».' },
            { t: 'callout', kind: 'warn', h: 'Jamais de hash maison, jamais de mot de passe en clair dans la base, jamais de `user.password = …` suivi de `save()` (ça stocke le texte brut !) — `set_password()` / `create_user()`. Django a résolu le problème sérieusement ; ne le contourne pas (même leçon que `generate_password_hash` en Flask).' }
          ],
          errors: [
            { title: 'Modifier AUTH_USER_MODEL après des migrations en prod', bad: '# projet lancé, base pleine… "et si User avait un champ ville ?"\n# AUTH_USER_MODEL changé → migrations impossibles, tables auth cassées', good: '# Dès le DÉBUT du projet, avant le premier migrate :\nAUTH_USER_MODEL = "comptes.User"     # AbstractUser, même vide', why: 'Toutes les tables auth (permissions, session, relations FK vers User) sont LIÉES au modèle déclaré en settings au moment des migrations. Le changer ensuite exige de recréer/renommer des tables critiques. Le AbstractUser initial dès le jour 1 est la vaccination officielle.' },
            { title: 'Vérifier le rôle à la main dans CHAQUE vue', bad: 'def publier(request, pk):\n    if request.user.username != "awa":   # liste de noms en dur…', good: '@permission_required("blog.publier_article", raise_exception=True)\ndef publier(request, pk):\n    # la permission vit DANS LA BASE (groupes), pas dans le code', why: 'Les rôles codés en dur ne se gèrent pas (nouvelle rédactrice = nouveau commit, redeploy). Les permissions en base + groupes admin se modifient sans déployer — c\'est leur raison d\'être, et l\'admin les administre déjà.' }
          ],
          related: ['jd-admin', 'jd-cbv', 'fk-extensions', 'fk-sessions']
        },

        {
          id: 'jd-statiques',
          title: 'Fichiers statiques & médias',
          icon: 'perm_media',
          level: 'Intermédiaire',
          tagline: 'STATIC pour TON css/js, MEDIA pour LEURS uploads : deux mondes, deux réglages, zéro mélange.',
          intro: 'Django sépare proprement deux familles de fichiers : les **statiques** (ton CSS, ton JS, ton logo — partie du code) servies via `STATIC_URL`, et les **médias** (ce que les utilisateurs **uploadent** — avatars, factures) rangés sous `MEDIA_ROOT`. En dev, Django sert les deux gentiment ; en prod, `collectstatic` et un vrai serveur web prennent le relais. La confusion entre ces deux familles est LA source des « images 404 ».',
          blocks: [
            { t: 'h3', h: 'Statiques : le trio settings / disque / template' },
            { t: 'code', lang: 'py', label: 'mysite/settings.py', code:
'STATIC_URL = "static/"                        # préfixe d\'URL public\nSTATICFILES_DIRS = [BASE_DIR / "static"]      # assets du PROJET (hors apps)\nSTATIC_ROOT = BASE_DIR / "staticfiles"        # où collectstatic RASSEMBLE' },
            { t: 'code', lang: 'bash', code:
'static/                 ← STATICFILES_DIRS : tes fichiers "globaux"\n├── css/site.css\n└── js/app.js\nblog/static/blog/blog.css   ← assets d\'APP (sous-dossier au nom de l\'app !)' },
            { t: 'code', lang: 'html', code:
'{% load static %}       <!-- OBLIGATOIRE en tête de template -->\n<link rel="stylesheet" href="{% static "css/site.css" %}">\n<img src="{% static "blog/logo.png" %}" alt="Logo">\n<!-- jamais /static/... en dur : le préfixe peut changer (CDN !) -->' },
            { t: 'h3', h: 'Médias : les uploads des utilisateurs' },
            { t: 'code', lang: 'py', label: 'mysite/settings.py', code:
'MEDIA_URL = "media/"\nMEDIA_ROOT = BASE_DIR / "media"     # dossier RÉEL, hors code versionné' },
            { t: 'code', lang: 'py', code:
'# modèle :\navatar = models.ImageField(upload_to="avatars/")   # → media/avatars/x.png\n# usage template : <img src="{{ user.profil.avatar.url }}">\n# (ImageField nécessite Pillow : pip install pillow)' },
            { t: 'code', lang: 'py', label: 'mysite/urls.py — servir les médias EN DEV UNIQUEMENT', code:
'from django.conf import settings\nfrom django.conf.urls.static import static\n\nurlpatterns = [path("admin/", admin.site.urls), …]\n\nif settings.DEBUG:                       # JAMAIS en prod : perf + sécurité\n    urlpatterns += static(settings.MEDIA_URL,\n                          document_root=settings.MEDIA_ROOT)' },
            { t: 'callout', kind: 'tip', h: 'En production : `collectstatic` rassemble tout dans `STATIC_ROOT`, que **nginx** (ou un CDN, ou WhiteNoise en pur Python) sert directement ; les **médias** vivent hors du code, idéalement sur un stockage objet (S3) via le package `django-storages`. Règle d\'or : le serveur de déploiement ne redéploie jamais les données des utilisateurs (fiche Déploiement).' }
          ],
          errors: [
            { title: '404 sur les images après mise en prod (collectstatic oublié)', bad: '# runserver local : tout s\'affiche (« Django servait les statiques ! »)\n# prod : plus aucune image, CSS nu — et on accuse le serveur web', good: 'python manage.py collectstatic     # STATIC_ROOT rempli\n# + nginx location /static/ → STATIC_ROOT\n# (en DEBUG=False, Django ne sert PLUS rien par design)', why: 'En DEBUG=True, runserver sert les statiques « pour aider » ; en prod ce servi disparaît — les fichiers doivent être collectés et servis par le vrai serveur web. C\'est LE passage obligé du déploiement Django.' },
            { title: 'Uploads rangés dans static/ (perdus au déploiement)', bad: 'avatar = models.ImageField(upload_to="static/avatars/")\n# → media confondu avec le code : écrasé au redeploy, et versionné !', good: 'MEDIA_ROOT = BASE_DIR / "media"\navatar = models.ImageField(upload_to="avatars/")\n# les uploads sont des DONNÉES : hors code, + sauvegardés à part', why: 'static/ est du CODE (versionné, remplacé au déploiement) ; media/ est de la DONNÉE utilisateur (persistante, sauvegardée). Y mélanger les uploads = les détruire au prochain déploiement — exactement le piège déjà vu dans la fiche Fichiers statiques de Flask.' }
          ],
          related: ['jd-templates', 'jd-deploiement', 'fk-statiques', 'jd-settings']
        },

        {
          id: 'jd-middleware',
          title: 'Middleware',
          icon: 'linear_scale',
          level: 'Avancé',
          tagline: 'Une chaîne de traitements autour de CHAQUE requête : ordre compte, et s\'y insérer proprement.',
          intro: 'Un middleware est un composant qui **enveloppe** le traitement de chaque requête : elle le traverse **à l\'aller** (avant la vue), et la réponse le retraverse **au retour**. C\'est là que vivent déjà les mécaniques invisibles de Django — sessions, CSRF, auth, messages — et c\'est l\'endroit officiel pour tes propres comportements transverses : logs, en-têtes, maintenance, limites.',
          blocks: [
            { t: 'h3', h: 'La chaîne par défaut, dans l\'ordre' },
            { t: 'code', lang: 'py', label: 'mysite/settings.py', code:
'MIDDLEWARE = [\n    "django.middleware.security.SecurityMiddleware",     # HTTPS, HSTS…\n    "django.contrib.sessions.middleware.SessionMiddleware",  # session\n    "django.middleware.common.CommonMiddleware",         # APPEND_SLASH…\n    "django.middleware.csrf.CsrfViewMiddleware",         # CSRF (403 !)\n    "django.contrib.auth.middleware.AuthenticationMiddleware",  # request.user\n    "django.contrib.messages.middleware.MessageMiddleware",     # flashes\n    "django.middleware.clickjacking.XFrameOptionsMiddleware",   # X-Frame\n]\n# Requête : ↓ dans l\'ordre — Réponse : ↑ dans l\'ordre INVERSE.\n# Auth APRÈS Session : request.user a besoin de la session — l\'ordre COMPTE.' },
            { t: 'h3', h: 'Écrire le sien : le contrat en 15 lignes' },
            { t: 'code', lang: 'py', label: 'blog/middleware.py', code:
'import time\nimport logging\n\njournal = logging.getLogger(__name__)\n\nclass ChronometreMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response   # l\'appelable SUIVANT dans la chaîne\n\n    def __call__(self, request):\n        # AVANT la vue :\n        debut = time.perf_counter()\n\n        response = self.get_response(request)   # la chaîne continue ↓\n\n        # APRÈS la vue (réponse en main) :\n        duree = time.perf_counter() - debut\n        if duree > 1.0:\n            journal.warning("LENT %s %.2fs", request.path, duree)\n        response["X-Duree"] = f"{duree:.3f}"    # en-tête maison\n        return response' },
            { t: 'code', lang: 'py', code:
'# activation : on l\'INSÈRE dans la liste (position réfléchie !) :\nMIDDLEWARE = [\n    "django.middleware.security.SecurityMiddleware",\n    "blog.middleware.ChronometreMiddleware",     # haut = enveloppe TOUT\n    # …\n]' },
            { t: 'p', h: 'La métaphore à retenir : un **oignon**. La requête entre par les couches extérieures (Security d\'abord) jusqu\'à la vue au cœur, puis la réponse ressort en sens inverse. Court-circuiter est possible : un middleware qui **rentoure une réponse sans appeler `get_response`** coupe la chaîne — c\'est ainsi qu\'un middleware de maintenance renvoie 503 sans jamais atteindre la vue.' },
            { t: 'callout', kind: 'warn', h: 'Middleware ≠ fourre-tout : il s\'exécute à CHAQUE requête de TOUTES les vues. Un comportement qui ne concerne qu\'une vue → décorateur. Uniquement par chemin d\'URL → teste `request.path` et sors TÔT. Un middleware lent est une taxe payée par 100 % du trafic — mesure-le.' }
          ],
          errors: [
            { title: 'Middleware déclaré au mauvais étage', bad: 'MIDDLEWARE = [\n    "monapp.middleware.AuthMiddleware",  # AVANT SessionMiddleware…\n    "django.contrib.sessions.middleware.SessionMiddleware",\n]\n# request.session n\'existe PAS encore : AttributeError garanti', good: '# placer APRÈS ce dont on dépend :\n# session → après SessionMiddleware ; user → après AuthenticationMiddleware', why: 'Les objets magiques (session, user, messages) sont FABRIQUÉS par leur middleware respectif dans l\'ordre de la liste : en amont, ils n\'existent pas. AttributeError sur request.session/request.user dans un middleware = question d\'ordre, pas de bug Django.' },
            { title: 'Oublier d\'appeler get_response (réponse muette)', bad: 'def __call__(self, request):\n    journal.info(request.path)\n    # …aucun retour → response = None → TypeError en aval', good: 'def __call__(self, request):\n    journal.info(request.path)\n    return self.get_response(request)\n# (court-circuit volontaire : return HttpResponse("Maintenance", status=503))', why: 'Le contrat exige une HttpResponse à la fin : appeler get_response (la chaîne continue) ou en fabriquer une (court-circuit assumé). Ne rien retourner, c\'est casser l\'oignon au milieu — toutes les vues tombent en 500.' }
          ],
          related: ['jd-settings', 'jd-erreurs', 'fk-contexte', 'py-decorateurs']
        },

        {
          id: 'jd-erreurs',
          title: 'Pages d\'erreur & Http404',
          icon: 'crisis_alert',
          level: 'Intermédiaire',
          tagline: 'raise Http404 pour les cas normaux, handler404/handler500 pour les pages — actives seulement hors DEBUG.',
          intro: 'Django distingue deux mondes : en dev (`DEBUG=True`), tu VEUX la page jaune détaillée ; en prod, les erreurs doivent devenir de **vraies pages de ton design** tout en journalisant discrètement les détails sensibles. Les mécanismes : `Http404` pour signaler un « pas trouvé » métier, et les `handler404`/`handler500` pour personnaliser l\'affichage — qui ne s\'activent **que si DEBUG=False**.',
          blocks: [
            { t: 'h3', h: 'Signaler : Http404 vs les autres' },
            { t: 'code', lang: 'py', code:
'from django.http import Http404\n\ndef detail(request, pk):\n    try:\n        article = Article.objects.get(pk=pk, publie=True)\n    except Article.DoesNotExist:\n        raise Http404("Cet article n\'existe pas (ou n\'est pas publié).")\n# → 404. Pour 90 % des cas, RACCOURCI : get_object_or_404(Article, pk=pk)\n\nfrom django.core.exceptions import PermissionDenied\nraise PermissionDenied        # → 403 (page 403.html)\n# return HttpResponseBadRequest("…")  # → 400 explicite' },
            { t: 'h3', h: 'Présenter : templates + handlers' },
            { t: 'code', lang: 'bash', code:
'templates/\n├── 404.html      ← page introuvable (votre design, lien accueil)\n├── 403.html\n└── 500.html      ← erreur serveur — AUCUNE variable sensible n\'y arrive' },
            { t: 'code', lang: 'py', label: 'mysite/urls.py', code:
'# Handlers CUSTOM (optionnel : Django utilise déjà templates/404.html)\ndef ma_404(request, exception):\n    return render(request, "404.html", status=404)\n\nhandler404 = "mysite.urls.ma_404"\n# handler500 = "mysite.urls.ma_500"   (idem — AUCUN contexte fiable)' },
            { t: 'p', h: 'Point critique : ces pages ne remplacent la page jaune **que lorsque DEBUG=False**. Pour les tester en local, bascule DEBUG à False temporairement (avec `ALLOWED_HOSTS = ["127.0.0.1", "localhost"]` et `collectstatic` pour le CSS). La 500 ne reçoit **aucune variable de contexte fiable** — elle doit rester autonome, sans base de données.' },
            { t: 'h3', h: 'La trace, elle, part dans les logs — pas à l\'écran' },
            { t: 'code', lang: 'py', code:
'import logging\njournal = logging.getLogger(__name__)\n\ndef paiement(request):\n    try:\n        charger_carte(...)\n    except PaiementError as e:\n        journal.error("Paiement refusé user=%s : %s", request.user.pk, e)\n        return render(request, "paiement/erreur.html", status=402)\n# LOGGING dans settings : console en dev, fichier/service (Sentry) en prod.' },
            { t: 'callout', kind: 'tip', h: 'ADMINS : en prod, Django peut **t\'envoyer un email à chaque 500** (`ADMINS = [("Awa", "awa@shop.bj")]` + `LOGGING` handler mail_admins). En deux lignes, tu es prévenu des plantages AVANT les utilisateurs. Passe à Sentry quand le volume grandit.' }
          ],
          errors: [
            { title: 'Tester ses pages 404/500 avec DEBUG=True', bad: '# « ma page 404 n\'apparaît jamais ! »\n# → DEBUG=True affiche TOUJOURS la page technique jaune', good: 'DEBUG = False\nALLOWED_HOSTS = ["127.0.0.1", "localhost"]\n# temporairement en local → tes 404.html/500.html prennent le relais', why: 'Les handlers personnalisés ne s\'activent que hors debug : la page jaune a priorité. Le test des pages d\'erreur fait partie de la checklist pré-production — avec DEBUG localement rebasculé ensuite.' },
            { title: 'Attraper DoesNotExist et renvoyer… autre chose que 404', bad: 'try:\n    a = Article.objects.get(pk=pk)\nexcept Article.DoesNotExist:\n    return redirect("blog:liste")   # visiteur : « tout est normal » ?', good: 'article = get_object_or_404(Article, pk=pk)\n# id absent = page 404 honnête (SEO + clarté), pas une redirection floue', why: 'Rediriger mélange la sémantique : le client (et Google) voit un 302 vers « normal » pour une ressource morte. Un contenu inexistant = 404 — le code HTTP fait partie du contrat, ici comme dans l\'API REST Flask.' }
          ],
          related: ['jd-vues', 'jd-deploiement', 'fk-erreurs', 'py-exceptions']
        }
      ]
    },

    /* ======================================================
       5. API, TESTS & PRODUCTION
       ====================================================== */
    {
      id: 'prod-dj',
      name: 'API, tests & production',
      icon: 'cloud_upload',
      fiches: [
        {
          id: 'jd-api',
          title: 'API REST : Django REST Framework',
          icon: 'api',
          level: 'Avancé',
          tagline: 'JsonResponse pour un endpoint, DRF pour une vraie API : serializers, ViewSets, routers.',
          intro: 'Pour un ou deux endpoints JSON, `JsonResponse` suffit. Pour une **vraie API** (CRUD complet, validation, pagination, permissions, documentation), l\'écosystème a élu son standard : **Django REST Framework** (DRF). Sa philosophie est identique à Django : déclarer (serializer = équivalent ModelForm) et laisser le framework assembler — c\'est l\'équivalent « batteries included » de ce que tu construis à la main dans la fiche API REST de Flask.',
          blocks: [
            { t: 'h3', h: 'L\'endpoint nu, sans DRF (pour comprendre)' },
            { t: 'code', lang: 'py', code:
'from django.http import JsonResponse\n\ndef api_articles(request):\n    articles = Article.objects.filter(publie=True).values(\n        "id", "titre", "date_pub"\n    )                                # .values : dicts directement sérialisables\n    return JsonResponse({"articles": list(articles)})\n# statut explicite : JsonResponse({…}, status=201)' },
            { t: 'h3', h: 'DRF : serializer → ViewSet → router' },
            { t: 'code', lang: 'bash', code:
'pip install djangorestframework\n# settings.py : INSTALLED_APPS += ["rest_framework"]' },
            { t: 'code', lang: 'py', label: 'blog/serializers.py', code:
'from rest_framework import serializers\nfrom .models import Article\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    auteur = serializers.StringRelatedField()    # affiche __str__, pas l\'id\n    class Meta:\n        model = Article\n        fields = ["id", "titre", "slug", "contenu", "prix",\n                  "publie", "date_pub", "auteur"]\n        read_only_fields = ["date_pub"]\n# Serializer = queryset → JSON **ET** JSON validé → objets (comme ModelForm)' },
            { t: 'code', lang: 'py', label: 'blog/views.py + urls.py', code:
'from rest_framework import viewsets\nfrom rest_framework.permissions import IsAuthenticatedOrReadOnly\n\nclass ArticleViewSet(viewsets.ModelViewSet):\n    queryset = Article.objects.all()\n    serializer_class = ArticleSerializer\n    permission_classes = [IsAuthenticatedOrReadOnly]\n    # ↑ liste+détail en GET libre, écriture réservée aux connectés\n\n# urls.py — le ROUTER fabrique /articles/ et /articles/<pk>/ :\nfrom rest_framework.routers import DefaultRouter\nrouter = DefaultRouter()\nrouter.register("articles", ArticleViewSet, basename="article")\n# urlpatterns += [path("api/", include(router.urls))]' },
            { t: 'table', head: ['Verbe + URL', 'Action DRF', 'Statut'], rows: [
              ['GET /api/articles/', 'list() — paginée en config', '200'],
              ['POST /api/articles/', 'create() — serializer validé', '201 / 400'],
              ['GET /api/articles/3/', 'retrieve()', '200 / 404'],
              ['PUT/PATCH /api/articles/3/', 'update()/partial_update()', '200'],
              ['DELETE /api/articles/3/', 'destroy()', '204']
            ]},
            { t: 'p', h: 'Bonus immédiats : **API navigable** intégrée (ouvre `/api/articles/` dans le navigateur !), validation automatique avec erreurs 400 détaillées, pagination configurable en settings, système de permissions composables, tokens/JWT via packages. Côté front, le contrat est strictement celui déjà vu : statuts honnêtes, JSON partout — le module **TanStack Query** (fiche useQuery) consomme ces endpoints sans adaptation.' },
            { t: 'callout', kind: 'tip', h: 'Conventions DRF qui sauvent : routing sous préfixe `/api/` dédié (erreurs JSON garanties par DRF, HTML par Django), versionnage dès que ça grandit (`/api/v1/`), et serializer explicite — jamais `fields = "__all__"` (même piège que ModelForm : la fuite du futur champ sensible).' }
          ],
          errors: [
            { title: 'Sérialiser un QuerySet à la main avec list()', bad: 'def api_auteurs(request):\n    return JsonResponse(list(Auteur.objects.all()), safe=False)\n# TypeError: Object of type Auteur is not JSON serializable', good: 'def api_auteurs(request):\n    data = Auteur.objects.values("id", "nom", "bio")\n    return JsonResponse(list(data), safe=False)\n# ou un ModelSerializer si DRF est dans le projet', why: 'JsonResponse ne sait sérialiser que les types natifs Python : un objet modèle n\'en fait pas partie. values()/values_list() produisent des dicts/tuples sérialisables — et safe=False est exigé pour les listes racines.' },
            { title: 'permission_classes oublié : API ouverte à tous vents', bad: 'class ArticleViewSet(viewsets.ModelViewSet):\n    queryset = Article.objects.all()\n    serializer_class = ArticleSerializer\n    # …n\'importe qui peut POST/PATCH/DELETE !', good: 'permission_classes = [IsAuthenticatedOrReadOnly]\n# voire IsAdminUser, ou une permission maison :\n# class EstAuteur(permissions.BasePermission): has_object_permission →\n#   return obj.auteur == request.user', why: 'DRF laisse par défaut AllowAny en config initiale : un ViewSet sans permission explicite est une API CRUD publique. La déclaration des permissions est la DERNIÈRE ligne avant mise en ligne — à vérifier endpoint par endpoint.' }
          ],
          related: ['fk-api-rest', 'tq-usequery', 'js-fetch', 'jd-auth']
        },

        {
          id: 'jd-tests',
          title: 'Tests Django : TestCase & client de test',
          icon: 'lab_profile',
          level: 'Intermédiaire',
          tagline: 'Base éphémère automatique, client HTTP simulé : tester une vue Django en 20 lignes.',
          intro: 'Tu connais déjà les fondamentaux (fiche Tests Python : AAA, cas limites, isolation). Django ajoute deux super-pouvoirs : `TestCase` crée à chaque test une **base de données jetable** (votre vraie base n\'est jamais touchée) et `self.client` simule des **requêtes HTTP complètes** — sans serveur lancé. Tu testes la vue **par son contrat** : URL → statut + contenu.',
          blocks: [
            { t: 'h3', h: 'Le premier test de bout en bout' },
            { t: 'code', lang: 'py', label: 'blog/tests.py', code:
'from django.test import TestCase\nfrom django.urls import reverse\nfrom .models import Article, Auteur\n\nclass VueListeTests(TestCase):\n\n    def setUp(self):                     # Préparation FRAÎCHE par test\n        auteur = Auteur.objects.create(nom="Awa")\n        Article.objects.create(titre="Django en pratique", publie=True,\n                               auteur=auteur)\n        Article.objects.create(titre="Brouillon", publie=False,\n                               auteur=auteur)\n\n    def test_liste_ne_montre_que_les_publies(self):\n        reponse = self.client.get(reverse("blog:liste"))\n        self.assertEqual(reponse.status_code, 200)\n        self.assertContains(reponse, "Django en pratique")     # dans le HTML\n        self.assertNotContains(reponse, "Brouillon")\n\n    def test_detail_inconnu_renvoie_404(self):\n        reponse = self.client.get(reverse("blog:detail", kwargs={"pk": 999}))\n        self.assertEqual(reponse.status_code, 404)' },
            { t: 'code', lang: 'bash', code:
'python manage.py test              # base de test créée, tests, détruite\npython manage.py test blog         # une seule app\npython manage.py test --keepdb     # recycle la base de test (plus rapide)' },
            { t: 'h3', h: 'Le client : simuler GET, POST, et même la connexion' },
            { t: 'code', lang: 'py', code:
'# POST avec données (formulaire) :\nreponse = self.client.post(reverse("blog:creer"), {\n    "titre": "Test", "contenu": "Corps", "publie": "on"})\nself.assertRedirects(reponse, reverse("blog:liste"))\nself.assertEqual(Article.objects.count(), 3)   # l\'EFFET en base vérifié !\n\n# Connecter un user de test pour les vues protégées :\nfrom django.contrib.auth.models import User\nuser = User.objects.create_user("awa", password="pass123")\nself.client.login(username="awa", password="pass123")\n# ou directement : self.client.force_login(user)' },
            { t: 'h3', h: 'Tester le MÉTIER, pas le framework' },
            { t: 'ul', items: [
              '**Modèles** : propriétés, méthodes custom (`article.resume`), contraintes métier.',
              '**Vues** : statut, template utilisé (`assertTemplateUsed`), variables du contexte.',
              '**Formulaires** : `form.is_valid()` faux/vrai selon données, messages d\'erreur.',
              '**Permissions** : anonyme → redirect login ; sans perm → 403.',
              'Pas besoin de tester `CharField` ni `render` — eux sont déjà testés par Django.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Couplage parfait : le pattern AAA toujours (fiche Tests Python), un `setUp` qui prépare le minimum, et un test = UN comportement. Et si `tests.py` grossit : il peut devenir un package `tests/` (modèles, vues, formulaires séparés) — Django le découvre pareil.' }
          ],
          errors: [
            { title: 'Données créées en dehors des tests (édifice de cartes)', bad: 'class VueTests(TestCase):\n    article = Article.objects.create(titre="X")   # hors setUp/\n    # partagé entre tests → ordre dépendant, fuites entre tests', good: 'def setUp(self):\n    Article.objects.create(titre="X")\n# chaque test repart d\'une base VIERGE (rollback automatique)', why: 'TestCase entoure chaque test d\'une transaction ANULÉE : les objets du setUp n\'existent que le temps du test. Les données partagées au niveau classe rendent les tests dépendants d\'un ordre — et flaky sous parallélisation.' },
            { title: 'Tester contre la VRAIE base (histoire d\'horreur)', bad: '# un script maison qui tape la base de dev — ou pire, de prod…', good: 'python manage.py test\n# TestCase utilise AUTOMATIQUEMENT une base jetable :\n# "test_<nom_de_la_base>" créée puis détruite — zéro risque', why: 'Le test qui écrit dans la vraie base la pollue (ou la détruit). Le mécanisme officiel isole par construction : impossible d\'abîmer quoi que ce soit — c\'est la raison n°1 d\'utiliser manage.py test plutôt que des scripts ad hoc.' }
          ],
          related: ['py-tests', 'jd-vues', 'jd-modeles', 'py-exceptions']
        },

        {
          id: 'jd-deploiement',
          title: 'Déploiement : WSGI, collectstatic & checklist',
          icon: 'publish',
          level: 'Avancé',
          tagline: 'DEBUG=False, ALLOWED_HOSTS, collectstatic, gunicorn — le rituel de passage de la fusée au service.',
          intro: 'Le `runserver` est un outil de développement (mono-processus, pas durci). La mise en production Django suit un rituel établi : configuration pilotée par l\'environnement, **`collectstatic`** pour les assets, un serveur **WSGI** (gunicorn/uWSGI) ou **ASGI** (daphne/uvicorn si async) derrière un reverse proxy — et `manage.py check --deploy` qui vérifie ta check-list sécurité automatiquement.',
          blocks: [
            { t: 'h3', h: 'L\'architecture de référence' },
            { t: 'code', lang: 'bash', code:
'#   Internet\n#      │\n#   nginx :443  → HTTPS + sert /static/ et /media/ directement\n#      │ proxy_pass 127.0.0.1:8000\n#   gunicorn mysite.wsgi   (2-4×CPU workers)\n#      │\n#   Django (factory implicite : mysite/wsgi.py livre "application")' },
            { t: 'code', lang: 'bash', code:
'# mysite/wsgi.py existe DÈS startproject — il livre l\'objet "application" :\npip install gunicorn\ngunicorn mysite.wsgi:application -w 4 -b 127.0.0.1:8000\n\n# ASGI (websockets/async) : daphne mysite.asgi:application\n#   (uvicorn mysite.asgi:application marche aussi)' },
            { t: 'h3', h: 'collectstatic : le passage obligé des assets' },
            { t: 'code', lang: 'bash', code:
'python manage.py collectstatic\n# → tous les static/ de TOUTES les apps + STATICFILES_DIRS\n#   rassemblés dans STATIC_ROOT (nginx le sert directement)\n\n# Alternative pur-Python sans nginx : WhiteNoise\n# MIDDLEWARE = ["whitenoise.middleware.WhiteNoiseMiddleware", …]\n# → les statiques sont servis par Django, à la vitesse correcte' },
            { t: 'h3', h: 'La checklist de mise en ligne' },
            { t: 'code', lang: 'bash', code:
'python manage.py check --deploy\n# Django audite AUTOMATIQUEMENT : SECRET_KEY, DEBUG, ALLOWED_HOSTS,\n# cookies sécurisés, HSTS, X_FRAME_OPTIONS… et vous dit ce qui manque.' },
            { t: 'ul', items: [
              '**DEBUG=False** + **ALLOWED_HOSTS** = [\"boutique.bj\", …] (sinon 400 partout !)',
              '**SECRET_KEY** et DATABASE_URL depuis l\'environnement (settings split, fiche Settings)',
              '**python manage.py migrate** joué au déploiement (fiche Migrations)',
              '**collectstatic** lancé, /static/ et /media/ servis par nginx ou WhiteNoise',
              '**HTTPS** : SECURE_SSL_REDIRECT=True, SESSION_COOKIE_SECURE=True, CSRF_COOKIE_SECURE=True',
              '**Logs** + emails d\'erreurs (ADMINS) ou Sentry — la 500 invisible est un bug muet',
              '**CSRF_TRUSTED_ORIGINS** = le domaine https si proxy/domaines multiples'
            ]},
            { t: 'p', h: 'Base de données : sqlite se défend en dev et petits sites internes ; pour du trafic réel, PostgreSQL (`"ENGINE": "django.db.backends.postgresql"` + `dj-database-url` pour l\'URL d\'environnement). Plateformes managées (Render, Railway, PythonAnywhere) : excellentes pour apprendre le CYCLE avant l\'administration VPS complète — mêmes réflexes que la fiche Déploiement Flask.' },
            { t: 'callout', kind: 'warn', h: 'Le sinistre classique du premier déploiement : **les médias utilisateurs perdus** parce qu\'ils vivaient dans le conteneur/le code versionné. MEDIA_ROOT doit vivre sur un volume persistant (ou S3 via django-storages) sauvegardé indépendamment du code — le redéploiement ne touche jamais les données.' }
          ],
          errors: [
            { title: '400 Bad Request généralisé au 1er déploiement', bad: 'DEBUG = False\nALLOWED_HOSTS = []          # oublié ou mal orthographié\n# → 400 sur TOUTES les requêtes, site « mort » alors que le serveur tourne', good: 'ALLOWED_HOSTS = ["boutique.bj", "www.boutique.bj"]\n# + manage.py check --deploy qui le signale AVANT la panne', why: 'Avec DEBUG=False, l\'en-tête Host de chaque requête est validée contre ALLOWED_HOSTS ; non conforme → 400. C\'est LA panne n°1 du passage en prod — un réglage, pas un bug serveur (déjà vu en Settings, il le mérite deux fois).' },
            { title: 'runserver exposé en production', bad: 'python manage.py runserver 0.0.0.0:8000   # en prod, « pour voir »\n# mono-thread, non durci, sans TLS… et parfois DEBUG encore True !', good: 'gunicorn mysite.wsgi:application -b 127.0.0.1:8000\n# derrière nginx (TLS en 443) — runserver ne sort JAMAIS du dev', why: 'runserver est un outil pédagogique : lenteur, absence de durcissement, rechargement de code à chaud indésirable. Le serveur WSGI est la seule porte sérieuse — et nginx la façade qui gère le chiffrement et les statiques.' }
          ],
          related: ['jd-settings', 'jd-statiques', 'fk-deploiement', 'jd-erreurs']
        }
      ]
    }
  ]
};
