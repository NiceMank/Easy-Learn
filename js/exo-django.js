/* ============================================================
   exo-django.js — Exercices pratiques : Django
   Validation : checklist d'auto-évaluation (projet local : python manage.py runserver).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.django = {
  module: 'django',
  list: [
{
    "id": "exo-jd-premiere-vue",
    "level": "fonda",
    "title": "Première vue Django : bienvenue à la coopérative",
    "icon": "rocket_launch",
    "free": true,
    "minutes": 30,
    "kind": "checklist",
    "setup": "Crée un dossier `jd-coop`, un venv activé, `pip install django`. Puis `django-admin startproject config .` et `python manage.py startapp coop`. Déclare l'app dans `INSTALLED_APPS` (config/settings.py). Lance `python manage.py runserver`.",
    "context": "La coopérative des transformatrices de manioc de Togba ouvre son premier site. Avant les modèles et l'admin, le rite de passage : qu'une URL frappe une vue qui rend un gabarit qui hérite d'un gabarit. Ce squelette, Django te le servira toute ta vie — autant le construire proprement dès la première fois.",
    "statement": "Tu vas créer la première page du site, avec gabarit hérité et URL nommées.\n\n1. Dans `coop/urls.py` (à créer), déclare `app_name = 'coop'` et une route `path('', views.accueil, name='accueil')`. Dans `config/urls.py`, branche l'app : `path('', include('coop.urls'))`.\n2. La vue `accueil` dans `coop/views.py` : `render(request, 'coop/accueil.html', {'cooperative': 'Les Transformatrices de Togba', 'nb_membres': 47})`.\n3. Crée `coop/templates/coop/base.html` (doctype, `<title>{% block title %}…{% endblock %}</title>`, menu avec deux liens via `{% url %}`, un `{% block content %}{% endblock %}` et un pied de page avec `{% now \"Y\" %}` pour l'année) puis `coop/templates/coop/accueil.html` qui `{% extends 'coop/base.html' %}` et affiche nom, nombre de membres et un paragraphe de bienvenue.\n4. Ajoute une seconde page `/a-propos/` (vue, URL nommée `a-propos`, gabarit hérité) avec l'histoire de la coopérative — et le menu qui fonctionne dans les deux sens.\n5. Prouve les espaces de nom : dans un gabarit, écris `{% url 'coop:accueil' %}` ; puis change l'URL de l'accueil (`path('accueil/', …)`) et constate qu'aucun lien ne casse.\n\nCe qui est évalué : la structure projet/apps, le double urls.py (projet + app), render + contexte, l'héritage de gabarits avec blocks, {% url %} et app_name. C'est le Los Angeles de Django : si tu t'y retrouves, tu te repères partout.",
    "constraints": [
        "L'application a son propre urls.py avec app_name — jamais toutes les routes dans config/urls.py.",
        "Les gabarits internes vivent dans templates/coop/ sous-dossier (évite les collisions entre apps).",
        "Tous les liens internes utilisent {% url 'coop:…' %}, aucun chemin en dur.",
        "Le gabarit enfant étend base.html : un seul doctype dans tout le projet.",
        "Les données d'affichage viennent du contexte de la vue, pas écrites en dur dans le gabarit."
    ],
    "checklist": [
        "`python manage.py runserver` sans erreur ; / affiche la page d'accueil avec ses variables rendues.",
        "/a-propos/ s'affiche avec le même en-tête/pied : l'héritage fonctionne.",
        "`python manage.py check` est silencieux et INSTALLED_APPS contient bien 'coop'.",
        "Changer path('', …) en path('accueil/', …) ne casse aucun lien du menu ({% url %} a suivi).",
        "Le code source ne contient qu'un seul <!DOCTYPE html> par page.",
        "Le titre de l'onglet change selon la page (block title).",
        "L'année du pied de page vient de {% now \"Y\" %} (année courante).",
        "Un chemin inconnu (/nimporte-quoi) donne un 404 propre de Django."
    ],
    "hints": [
        "La chaîne minimale : config/urls.py → `path('', include('coop.urls'))` ; coop/urls.py → `app_name = 'coop'` + `urlpatterns = [path('', views.accueil, name='accueil')]` ; views.py → `def accueil(request): return render(request, 'coop/accueil.html', {...})`.",
        "L'héritage : dans base.html, les `{% block %}` sont les portes ouvertes ; l'enfant commence par {% extends %} tout en haut et ouvre ses {% block title %} / {% block content %}. Django assemble en remplaçant chaque block.",
        "{% now \"Y\" %} affiche l'année courante dans le gabarit — pratique pour ne jamais avoir à penser au pied de page. Et app_name + {% url 'coop:accueil' %} rendent tes liens insensibles aux déplacements d'URL : c'est le filet de sécurité de toutes les applis réutilisables."
    ],
    "solution": {
        "lang": "py",
        "label": "urls + vue + gabarits — solution commentée",
        "code": "\n# ========== coop/urls.py ==========\nfrom django.urls import path\nfrom . import views\n\napp_name = 'coop'                       # espace de nom : {% url 'coop:accueil' %}\nurlpatterns = [\n    path('', views.accueil, name='accueil'),\n    path('a-propos/', views.a_propos, name='a_propos'),\n]\n\n# ========== coop/views.py ==========\nfrom django.shortcuts import render\n\ndef accueil(request):\n    contexte = {\n        'cooperative': 'Les Transformatrices de Togba',\n        'nb_membres': 47,\n    }\n    return render(request, 'coop/accueil.html', contexte)\n\n# ========== coop/templates/coop/base.html ==========\n# <!DOCTYPE html>\n# <title>{% block title %}Coopérative de Togba{% endblock %}</title>\n# <nav>\n#   <a href=\"{% url 'coop:accueil' %}\">Accueil</a>\n#   <a href=\"{% url 'coop:a_propos' %}\">À propos</a>\n# </nav>\n# <main>{% block content %}{% endblock %}</main>\n# <footer>&copy; {% now \"Y\" %} Coopérative de Togba</footer>\n\n# ========== coop/templates/coop/accueil.html ==========\n# {% extends 'coop/base.html' %}\n# {% block title %}Accueil — Coopérative{% endblock %}\n# {% block content %}\n#   <h1>{{ cooperative }}</h1>\n#   <p>{{ nb_membres }} membres vous souhaitent la bienvenue.</p>\n# {% endblock %}\n",
        "explain": "Trois gestes qui deviennent des automatismes. D'abord la division du travail : config/urls.py distribue vers les apps, chaque app nomme Ses routes — tu peux déplacer une app entière sous /nouveau-chemin/ sans qu'un seul lien interne ne casse, parce que {% url %} recalcule à partir du NOM. Ensuite templates/coop/ en sous-dossier : deux apps peuvent chacune avoir accueil.html sans que l'une écrase l'autre. Enfin l'héritage : extends tout en haut, blocks ensuite ; c'est exactement le Blade des modules Laravel/Flask dérangé à peine — les concepts migrent, seule la syntaxe danse. Django ajoute sa signature : check, migrate, runserver, et un 404 poli même sans une ligne de configuration."
    },
    "criteria": [
        "Deux pages héritées d'un base.html, navigation fonctionnelle, URLs nommées avec app_name.",
        "Variables de contexte rendues et gabarit dans le sous-dossier de l'app.",
        "Renommage d'URL sans casse démontré grâce à {% url %}."
    ],
    "variants": [
        "Ajoute /equipe/ qui affiche une liste de membres passée en contexte (boucle for dans le gabarit).",
        "Personnalise une page 404 (handler404 + template 404.html à la racine des templates).",
        "Défi : passe nb_membres depuis la base (modèle Parametre à clé/valeur) au lieu du contexte en dur."
    ],
    "related": [
        "jd-demarrage",
        "jd-apps",
        "jd-urls",
        "jd-vues",
        "jd-templates"
    ]
},
{
    "id": "exo-jd-modele-produit",
    "level": "fonda",
    "title": "Le modèle Produit et la magie de l'admin",
    "icon": "database",
    "minutes": 35,
    "kind": "checklist",
    "setup": "Reprends le projet `jd-coop`. Vérifie SQLite par défaut (settings.DATABASES) : rien à configurer, Django embarque db.sqlite3.",
    "context": "Les transformatrices vendent : gari fin, gari rouge, tapioca, cossettes séchées. Le cahier des stocks triple ses lignes chaque semaine. Il est temps de créer le premier modèle — et de découvrir le super-pouvoir de Django : un espace d'administration complet, gratuit, à partir d'une ligne d'enregistrement.",
    "statement": "Tu vas modéliser Produit, migrer, et administrer via l'interface Django.\n\n1. Dans `coop/models.py` : `class Produit(models.Model)` avec `nom = CharField(max_length=120)`, `description = TextField(blank=True)`, `prix = PositiveIntegerField(help_text='En FCFA')`, `stock = PositiveIntegerField(default=0)`, `cree_le = DateTimeField(auto_now_add=True)`. Ajoute `def __str__(self)` qui renvoie le nom — sans lui, l'admin affichera « Produit object (1) », illisible.\n2. `python manage.py makemigrations coop` puis `migrate`. Ouvre le SQL généré avec `sqlmigrate coop 0001` : lis ce que Django a réellement créé (id auto, NOT NULL partout où il faut).\n3. Crée un superutilisateur : `createsuperuser` (awa / un mot de passe costaud). Enregistre le modèle dans `coop/admin.py` avec une **ModelAdmin** : list_display (nom, prix, stock, cree_le), list_filter sur cree_le, search_fields sur nom, ordering par nom.\n4. Connecte-toi à /admin, ajoute 6 produits réalistes, modifie un stock, constate la validation (prix négatif refusé par PositiveIntegerField).\n5. Affiche les produits sur /produits/ : vue qui fait `Produit.objects.all()` (attention : au premier essai, affiche-les AVANT de trier, puis ajoute order_by('nom') et explique la différence), gabarit avec boucle for, prix formaté par un filtre personnalisé (`templatetags/coop_extras.py` : `@register.filter def fcfa(n)`), et un message « Aucun produit » via `{% empty %}` quand la liste est vide.\n6. Bonus : ajoute `en_stock = BooleanField(default=True)` via une nouvelle migration avec valeur par défaut, et n'affiche que les produits en stock (`filter(en_stock=True)`).\n\nCe qui est évalué : la déclaration d'un modèle avec les bons types, le cycle makemigrations/migrate/sqlmigrate, l'admin comme back-office immédiat, et le triège côté ORM plutôt qu'en Python (filter/order_by, pas de if dans le gabarit).",
    "constraints": [
        "Types fidèles au métier : PositiveIntegerField pour prix/stock (FCFA entiers, jamais négatifs).",
        "Migrations engagées (pas de modèle orphelin) : makemigrations + migrate passent sans faute.",
        "__str__ défini : l'admin et le shell restent lisibles.",
        "Le filtrage/tri se fait dans la requête ORM, pas dans le gabarit ni par tri Python.",
        "Le filtre fcfa vit dans templatetags, jamais dupliqué en logique de vue."
    ],
    "checklist": [
        "sqlmigrate montre le SQL attendu (types, NOT NULL, AUTOINCREMENT).",
        "L'admin liste les produits lisiblement (nom affiché, pas « object »), avec recherche et tri fonctionnels.",
        "Tenter un prix négatif dans l'admin est refusé proprement.",
        "/produits affiche les 6 produits triés alphabétiquement avec prix formaté.",
        "Vider la table affiche le message {% empty %} sans erreur (et la remettre remplit la liste).",
        "La pagination de l'admin fonctionne à plus de 100 lignes (teste avec un import shell rapide si tu veux).",
        "La migration BooleanField a passé sans perte de données et le filtre en_stock fonctionne.",
        "Dans le shell (`python manage.py shell`), Produit.objects.filter(stock__lt=5) retourne bien les stocks faibles."
    ],
    "hints": [
        "Le modèle honnête : prix = models.PositiveIntegerField(help_text='En FCFA') — l'argent en entier positif, la base le garantit. stock idem avec default=0. Et __str__ : `return self.nom`. C'est 30 secondes qui transforment l'expérience admin.",
        "Le filtre maison : crée coop/templatetags/__init__.py (vide) et coop_extras.py avec `@register.filter def fcfa(n): return f\"{n:,}\".replace(\",\", \" \") + \" F\"`. Dans le gabarit : {% load coop_extras %} puis {{ p.prix|fcfa }}.",
        "La requête qui porte la logique : `Produit.objects.filter(en_stock=True).order_by('nom')` — le ORDER BY part en SQL, pas en Python. Et dans le shell, les lookups à double underscore (stock__lt, nom__icontains) sont ta boîte à outils quotidienne."
    ],
    "solution": {
        "lang": "py",
        "label": "models.py + admin.py + vue — solution commentée",
        "code": "\n# ========== coop/models.py ==========\nfrom django.db import models\n\nclass Produit(models.Model):\n    nom = models.CharField(max_length=120)\n    description = models.TextField(blank=True)          # optionnel, mais propre\n    prix = models.PositiveIntegerField(help_text='En FCFA')   # jamais négatif\n    stock = models.PositiveIntegerField(default=0)\n    en_stock = models.BooleanField(default=True)\n    cree_le = models.DateTimeField(auto_now_add=True)   # posé à la création\n\n    def __str__(self):                                   # lisible partout (admin, shell)\n        return self.nom\n\n# ========== coop/admin.py ==========\nfrom django.contrib import admin\n\n@admin.register(Produit)\nclass ProduitAdmin(admin.ModelAdmin):\n    list_display = ('nom', 'prix', 'stock', 'en_stock')\n    list_filter = ('en_stock', 'cree_le')\n    search_fields = ('nom',)\n    ordering = ('nom',)\n\n# ========== coop/views.py ==========\ndef produits(request):\n    liste = Produit.objects.filter(en_stock=True).order_by('nom')\n    return render(request, 'coop/produits.html', {'produits': liste})\n",
        "explain": "L'enseignement clé : tu déclares l'intention, Django fait le reste. PositiveIntegerField dit « jamais négatif » et la base comme l'admin l'appliquent sans une ligne de code de validation ; auto_now_add dit « posé à la création » et tu ne t'en occupes plus. Le cycle makemigrations→migrate→sqlmigrate est un contrat : le modèle est la source de vérité, la migration en est la trace git-able, la base la conséquence — lis sqlmigrate une fois, ça guérit du mystère. L'admin enfin n'est pas un gadget de démo : pour une coopérative, c'est LE back-office, sécurisé par défaut (CSRF, auth), et ModelAdmin le rend présentable en cinq lignes. Garde le réflexe : logique de filtre dans l'ORM, présentation dans les gabarits, formatage dans les filtres."
    },
    "criteria": [
        "Modèle correctement typé avec migrations propres ; sqlmigrate lu et compris.",
        "Admin opérationnel (ModelAdmin soigné) utilisé pour saisir les données réelles.",
        "Page publique filtrée/triée par l'ORM, prix formaté, état vide élégant."
    ],
    "variants": [
        "Ajoute une méthode de modèle `est_rupture()` (stock == 0) utilisée dans le gabarit en badge « Épuisé ».",
        "Ajoute une image du produit (ImageField + Pillow + MEDIA settings).",
        "Défi : raw_id_fields / list_editable sur stock dans l'admin pour gérer 50 produits vite."
    ],
    "related": [
        "jd-modeles",
        "jd-orm",
        "jd-migrations",
        "jd-admin",
        "jd-templates"
    ]
},
{
    "id": "exo-jd-crud-cbv",
    "level": "inter",
    "title": "CRUD avec les vues génériques (CBV)",
    "icon": "view_agenda",
    "minutes": 50,
    "kind": "checklist",
    "setup": "Reprends le projet coop avec son modèle Produit admin-rempli. Tu vas remplacer la future « gestion des produits » par les vues génériques de Django : ListView, DetailView, CreateView, UpdateView, DeleteView.",
    "context": "L'admin convient à la gestion interne, mais la présidente veut un espace « catalogue propre » pour les déléguées, sans l'univers Django admin. Les vues génériques à base de classes offrent tout le CRUD en quelques lignes — à condition de connaître leurs conventions (noms de gabarits attendus, success_url) plutôt que de les deviner.",
    "statement": "Tu vas construire le CRUD public du catalogue avec les CBV de django.views.generic.\n\n1. **Liste** : `class ProduitList(ListView)` (model = Produit, paginate_by = 8, queryset filtré en_stock). URL nommée `produits_liste`, gabarit au **chemin conventionnel** `coop/produit_list.html` — constate que Django le devine sans template_name (et seulement ensuite, sois explicite si tu préfères renommer).\n2. **Détail** : `ProduitDetail(DetailView)` — `coop/produit_detail.html`, binding par pk dans l'URL `<int:pk>`.\n3. **Création** : `ProduitCreate(CreateView)` avec `fields = ['nom', 'description', 'prix', 'stock']` et `success_url = reverse_lazy('coop:produits_liste')`. Gabarit `coop/produit_form.html` : fonctionne avec {{ form.as_p }} d'abord, puis stylé champ par champ avec les erreurs.\n4. **Édition** : `ProduitUpdate(UpdateView)` — mêmes champs, même gabarit conventionnel ; l'URL porte le pk. Constate que le formulaire arrive pré-rempli.\n5. **Suppression** : `ProduitDelete(DeleteView)` avec gabarit de confirmation `coop/produit_confirm_delete.html` et POST only — un GET n'efface rien, il montre la confirmation.\n6. **Messages** : ajoute del'UX — `messages.success(request, '…')` dans `form_valid` et le bandeau dans base.html ({% if messages %}) ; {% csrf_token %} dans CHAQUE formulaire (vérifie qu'un POST sans token → 403).\n7. Ajoute les boutons Modifier/Supprimer dans le détail et un gros « + Nouveau produit » dans la liste.\n\nCe qui est évalué : le nommage conventionnel des gabarits (app/model_view.html), reverse_lazy pour success_url (pourquoi lazy ?), les messages, et la discipline POST/confirm. Les CBV ne sont de la magie que si tu connais leurs conventions — sinon, c'est de la littérature.",
    "constraints": [
        "Les cinq vues reposent sur les classes génériques de Django, pas sur des fonctions qui réinventent tout.",
        "reverse_lazy pour success_url — jamais reverse() direct à la déclaration de classe.",
        "Gabarits aux chemins conventionnels (ou explicitement surchargés si tu sais pourquoi).",
        "Chaque formulaire porte {% csrf_token %} ; la suppression se confirme puis se POSTe.",
        "La liste reste paginée et filtrée par l'ORM."
    ],
    "checklist": [
        "Les 5 opérations marchent de bout en bout via /produits/ (list), /produits/3/, /produits/nouveau/, /produits/3/modifier/, /produits/3/supprimer/.",
        "Créer avec un prix négatif ou un nom vide réaffiche le formulaire avec les erreurs (validation du modèle réutilisée).",
        "Après create/update/delete : redirection + message de confirmation visible une fois.",
        "Un GET sur la suppression montre l'écran de confirmation, sans supprimer.",
        "Sans {% csrf_token %}, Django répond 403 — vérifié en retirant temporairement le tag.",
        "La pagination affiche 8 produits/page et ?page=2 fonctionne.",
        "La convention de nommage : renomme un gabarit et observe le TemplateDoesNotExist explicite qui cite les chemins cherchés — tu sais désormais le lire.",
        "Aucune vue par fonction CRUD en parallèle : tout est CBV."
    ],
    "hints": [
        "La classe qui dit tout : `class ProduitCreate(CreateView): model = Produit; fields = ['nom', 'description', 'prix', 'stock']; success_url = reverse_lazy('coop:produits_liste')`. Django devine le gabarit coop/produit_form.html, instancie un ModelForm, valide, insère, redirige.",
        "reverse_lazy plutôt que reverse : au moment où Python lit la classe vues.py, les urls ne sont pas nécessairement chargées — lazy reporte la résolution au premier besoin (le redirect). C'est LE détail qui évite l'ImportError circulaire classique.",
        "Les messages dans la CBV : surcharge `def form_valid(self, form): messages.success(self.request, 'Produit enregistré !'); return super().form_valid(form)`. Tu gardes le comportement par défaut et ajoutes ton grain de sel au bon endroit."
    ],
    "solution": {
        "lang": "py",
        "label": "views.py + urls.py — solution commentée",
        "code": "\n# ========== coop/views.py ==========\nfrom django.contrib import messages\nfrom django.urls import reverse_lazy\nfrom django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView\nfrom .models import Produit\n\nclass ProduitList(ListView):\n    model = Produit\n    paginate_by = 8\n    # queryset filtré + trié ; le reste (gabarit coop/produit_list.html) est conventionnel.\n    queryset = Produit.objects.filter(en_stock=True).order_by('nom')\n\nclass ProduitDetail(DetailView):\n    model = Produit                        # URL <int:pk> → self.object automatique\n\nclass ProduitCreate(CreateView):\n    model = Produit\n    fields = ['nom', 'description', 'prix', 'stock']   # ModelForm généré\n    success_url = reverse_lazy('coop:produits_liste')  # lazy : urls pas encore prêtes ici\n\n    def form_valid(self, form):\n        messages.success(self.request, 'Produit ajouté au catalogue.')\n        return super().form_valid(form)     # on garde le mécanisme, on ajoute l'UX\n\nclass ProduitUpdate(UpdateView):\n    model = Produit\n    fields = ['nom', 'description', 'prix', 'stock']\n    success_url = reverse_lazy('coop:produits_liste')\n\nclass ProduitDelete(DeleteView):\n    model = Produit\n    success_url = reverse_lazy('coop:produits_liste')\n\n    def form_valid(self, form):\n        messages.success(self.request, 'Produit supprimé.')\n        return super().form_valid(form)\n\n# ========== coop/urls.py ==========\n# path('produits/', views.ProduitList.as_view(), name='produits_liste'),\n# path('produits/nouveau/', views.ProduitCreate.as_view(), name='produits_ajout'),\n# path('produits/<int:pk>/', views.ProduitDetail.as_view(), name='produits_detail'),\n# path('produits/<int:pk>/modifier/', views.ProduitUpdate.as_view(), name='produits_edit'),\n# path('produits/<int:pk>/supprimer/', views.ProduitDelete.as_view(), name='produits_del'),\n",
        "explain": "Lis ces vingt lignes comme un accord : tu donnes le modèle, les champs et la destination ; Django fournit requêtes, formulaires, validations, CSRF, redirections. Le prix de l'accord, ce sont les conventions : coop/produit_list.html, produit_form.html, produit_confirm_delete.html ne sont pas arbitraires — ils sont devinés, et le TemplateDoesNotExist qui liste les chemins cherchés est ton meilleur ami quand tu déroges. reverse_lazy est l'autre convention : les attributs de classe se résolvent avant que les URLconfs ne soient prêtes, d'où la résolution paresseuse. Enfin, form_valid est LE point d'extension : tout ce qui doit arriver « juste au succès » (messages, envoi d'email, journal) vit ici, en appelant super() pour conserver le mécanisme. Maîtrise ces trois conventions et les CBV cessent d'être de la magie noire."
    },
    "criteria": [
        "CRUD CBV complet fonctionnel, avec conventions de gabarits maîtrisées.",
        "Validation réutilisée du modèle, messages flash, CSRF démontré.",
        "Pagination et filtrage par l'ORM ; suppression confirmée et POST only."
    ],
    "variants": [
        "Ajoute LoginRequiredMixin sur les vues d'écriture (lecture publique, écriture connectée).",
        "Transforme le form en ModelForm explicite avec widgets stylés et label français.",
        "Défi : ajoute une vue SuccessMessageMixin pour simplifier form_valid."
    ],
    "related": [
        "jd-cbv",
        "jd-formulaires",
        "jd-urls",
        "jd-templates",
        "jd-vues"
    ]
},
{
    "id": "exo-jd-form-tontine",
    "level": "inter",
    "title": "ModelForm métier : la tontine validée avec clean()",
    "icon": "savings",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Toujours `jd-coop`. Tu vas ajouter un deuxième modèle, Tontine, avec son formulaire d'inscription — le nerf de l'exercice est la validation croisée (plusieurs champs se parlent), là où les types de champs seuls ne suffisent plus.",
    "context": "Chaque semaine, la trésorière reçoit les cotisations entre 2 000 et 10 000 F, jamais le dimanche (marché fermé), et le telephone de la membre est obligatoire pour le rappel MoMo. Un formulaire, trois règles croisées, zéro exception tolérée : c'est le royaume de `clean_<champ>()` et `clean()`. À la clé aussi, la pagination des versements pour tout tenir dans la poche.",
    "statement": "Tu vas créer le modèle Versement, son ModelForm avec validations croisées, et la liste paginée.\n\n1. `class Versement(models.Model)` : membre (CharField nom), telephone (CharField), montant (PositiveIntegerField), date_versement (DateField), percue_le (DateTimeField auto_now_add). Migration.\n2. `class VersementForm(forms.ModelForm)` sur tous les champs saisis (membre, telephone, montant, date_versement). Labels en français, widgets classe CSS.\n3. **Validations champ par champ** : `clean_montant` : 2000 ≤ montant ≤ 10000 sinon ValidationError avec message métier ; `clean_telephone` : 8 chiffres après retrait des espaces (\\'97 00 11 22\\' accepté, normalisé en stockage).\n4. **Validation croisée** dans `clean()` : si date_versement est un dimanche (`weekday() == 6`) → erreur globale « Le marché est fermé le dimanche : versement impossible » ; ET si le montant dépasse 5 000 avec un téléphone absent… non, le téléphone est déjà requis : choisis plutôt date_versement dans le futur → erreur (« on ne cotise pas pour demain »). Les deux règles vivent dans clean() parce qu'elles parlent de cohérence de l'objet, pas d'un champ isolé.\n5. Vue `verser` (function-based, pour voir form.is_valid()) : GET formulaire, POST valide → save + message + redirect (PRG), invalide → ré-affichage avec erreurs (par champ sous chaque champ + non_field_errors en haut).\n6. Vue `versements` : liste paginée (`Paginator`, 10/page) triée par date décroissante ; totaux en tête (total encaissé = requête `aggregate(Sum('montant'))`), plus un petit encart « Versements du jour » filtré sur today().\n7. Ajoute la liaison au menu et un lien « Nouvelle cotisation » depuis la liste.\n\nCe qui est évalué : ModelForm comme couche de validation ET de persistance, la différence clean_champ vs clean, la normalisation à la validation (téléphone), les messages métiers explicites, Paginator, et aggregate pour le total — rien ne se calcule en boucle Python.",
    "constraints": [
        "La validation métier vit dans le Form (clean_<champ>/clean), pas dans la vue ni le gabarit.",
        "Le téléphone est normalisé AVANT sauvegarde (espaces retirés), et la règle des 8 chiffres est expliquée dans le message.",
        "Montant borné 2 000-10 000 : message citant les deux bornes.",
        "Total encaissé par aggregate(Sum) ; liste paginée Paginator avec contrôles Précédent/Suivant.",
        "PRG respecté : succès → redirect + message."
    ],
    "checklist": [
        "1 999 F refusé, 10 001 F refusé, 5 000 F accepté ; le message cite les bornes.",
        "« 97 00 11 22 » accepté et stocké « 97001122 » ; « 9700112 » (7 chiffres) refusé.",
        "Un versement daté d'un dimanche est rejeté ; un dimanche passé ET un lundi passé se comportent différemment : règle vérifiée.",
        "Une date future est rejetée avec l'erreur globale affichée en haut du formulaire (non_field_errors).",
        "Après succès : redirection, message une fois, F5 sans repost.",
        "La liste est paginée proprement à 10 lignes ; ?page=2 montre la suite ?page=99 affiche une page vide gérée (ou dernière page).",
        "Le total encaissé est juste et vient d'UN aggregate SQL (traceurs de requêtes à l'appui).",
        "Les erreurs par champ s'affichent sous chaque champ et les champs valides gardent leurs valeurs."
    ],
    "hints": [
        "clean_<champ> : `def clean_montant(self): m = self.cleaned_data['montant']; if not 2000 <= m <= 10000: raise forms.ValidationError('Entre 2 000 et 10 000 F, c\\'est le règlement de la tontine.'); return m` — retourne TOUJOURS la valeur (éventuellement corrigée).",
        "La croisée : dans `clean(self)`, lis self.cleaned_data.get('date_versement') ; ajoute l'erreur globale via `raise forms.ValidationError('…')` ou ciblée via `self.add_error('date_versement', '…')`. Attends-toi à ce que cleaned_data n'ait pas les champs invalides : protege avec .get.",
        "Paginator : `p = Paginator(versements, 10); page_obj = p.get_page(request.GET.get('page'))` — get_page gère les pages aberrantes élégamment. Et le total : `Versement.objects.aggregate(total=Sum('montant'))['total'] or 0`."
    ],
    "solution": {
        "lang": "py",
        "label": "forms.py + vues — solution commentée",
        "code": "\n# ========== coop/forms.py ==========\nfrom django import forms\nfrom django.utils import timezone\nfrom .models import Versement\n\nclass VersementForm(forms.ModelForm):\n    class Meta:\n        model = Versement\n        fields = ['membre', 'telephone', 'montant', 'date_versement']\n        labels = {'membre': 'Nom de la membre', 'montant': 'Montant (FCFA)',\n                  'telephone': 'Téléphone MoMo', 'date_versement': 'Date du versement'}\n\n    # --- règle d'un SEUL champ : clean_<champ>() ---\n    def clean_montant(self):\n        m = self.cleaned_data['montant']\n        if not 2000 <= m <= 10000:\n            raise forms.ValidationError('Entre 2 000 et 10 000 F — règlement de la tontine.')\n        return m\n\n    def clean_telephone(self):\n        tel = self.cleaned_data['telephone'].replace(' ', '')   # normalisation ici\n        if not (tel.isdigit() and len(tel) == 8):\n            raise forms.ValidationError('8 chiffres attendus (ex. 97 00 11 22).')\n        return tel\n\n    # --- règles CROISÉES / de cohérence : clean() ---\n    def clean(self):\n        cleaned = super().clean()\n        d = cleaned.get('date_versement')\n        if d is None:\n            return cleaned                    # déjà en erreur : ne pas en rajouter\n        if d.weekday() == 6:\n            self.add_error('date_versement', 'Marché fermé le dimanche : pas de versement.')\n        if d > timezone.localdate():\n            self.add_error('date_versement', 'On ne cotise pas pour demain.')\n        return cleaned\n\n# ========== coop/views.py ==========\ndef verser(request):\n    if request.method == 'POST':\n        form = VersementForm(request.POST)\n        if form.is_valid():                   # déclenche full_clean → clean_<…> → clean\n            form.save()\n            messages.success(request, 'Cotisation enregistrée.')\n            return redirect('coop:versements')\n    else:\n        form = VersementForm()\n    return render(request, 'coop/verser.html', {'form': form})\n\ndef versements(request):\n    qs = Versement.objects.order_by('-date_versement', '-percue_le')\n    page_obj = Paginator(qs, 10).get_page(request.GET.get('page'))\n    total = Versement.objects.aggregate(t=Sum('montant'))['t'] or 0\n    return render(request, 'coop/versements.html',\n                  {'page_obj': page_obj, 'total': total})\n",
        "explain": "La sagesse des formulaires Django se résume à « la validation descend le plus près possible du champ qu'elle concerne ». Une borne sur le montant ? clean_montant. Le format d'un téléphone ? clean_telephone — et accessoirement, c'est là qu'on normalise : l'utilisatrice tape « 97 00 11 22 », la base stocke « 97001122 ». Quand plusieurs champs se regardent (un dimanche, une date future), clean() prend le relais ; add_error rattache le message au bon champ tandis qu'une ValidationError globale rejoint les non_field_errors en haut. Le ModelForm te donne alors save() gratos, et l'ensemble respecte le principe DRY : ces règles serviront telles quelles dans un admin, une API ou un import — partout où le form passe. Enfin Paginator.get_page et aggregate(Sum) : pagination sans erreur de borne, total sans boucle — exactement ce que l'on attend d'un outil de trésorerie."
    },
    "criteria": [
        "Validations par champ et croisées fonctionnelles avec messages métiers et normalisation.",
        "Formulaire en PRG, erreurs localisées, valeurs conservées.",
        "Liste paginée + total agrégé par SQL, navigation saine."
    ],
    "variants": [
        "Ajoute un champ 'preuve' (ImageField) optionnel : photo du reçu MoMo (validation taille max).",
        "Filtre par mois sur la liste (`?mois=2026-07`) avec DateField de filtrage.",
        "Défi : réécris `verser` en CreateView (CBV) en gardant exactement les mêmes règles."
    ],
    "related": [
        "jd-formulaires",
        "jd-modeles",
        "jd-orm",
        "jd-vues"
    ]
},
{
    "id": "exo-jd-coop",
    "level": "projet",
    "title": "La plateforme de la coopérative : auth, permissions et tests",
    "icon": "domain",
    "minutes": 130,
    "kind": "checklist",
    "setup": "Projet final `jd-assinie` (nouveau : startproject config ., startapp coop). Base SQLite. Tu vas combiner tout le module : modèles, admin, CBV, forms, auth, tests.",
    "context": "La coopérative d'Assinie regroupe productrices et transformatrices autour de noix de cajou. Il faut une vraie plateforme : catalogue public, espace membre sécurisé pour gérer produits et commandes, rôles (membre simple vs gestionnaire), et une administration impeccable. Le tout démontré par une suite de tests Django — parce que « ça marche sur ma machine » n'est pas une preuve.",
    "statement": "Tu vas livrer la plateforme complète, cloisonnée et testée.\n\n1. **Modèles.** Produit (nom, description, prix, stock, photo URL simple, productrice ForeignKey User), Commande (produit FK, quantite, total, statut in {'en_attente','livree','annulee'}, cree_le, client_nom, client_telephone). Prix total recalculé `save()` surchargé ou dans le form — jamais fourni par le client.\n2. **Auth & rôles.** django.contrib.auth : groupe `gestionnaires`. Connexion `/comptes/connexion/` (LoginView + gabarit), déconnexion. Public : catalogue (`/produits/`, détail, commande invitée avec formulaire public : nom + téléphone + quantité). Membre connecté : tableau de bord `/espace/` listant SES produits (`filter(productrice=request.user)`) et SES commandes. Gestionnaire : voit TOUT et peut changer les statuts des commandes (permission personnalisée `peut_gerer_commandes` sur Commande — Meta.permissions — et décorateur `@permission_required`).\n3. **Écritures précautionneuses.** Création/édition de produit via CBV + `form_valid` qui pose `productrice = request.user` ; `UserPassesTestMixin` (ou comparaison de la productrice) pour éditer SEULEMENT ses propres produits ; commande publique limitée au stock disponible (validation croisée dans le form, statut 409 si dépassement) et décrémentant le stock dans la même transaction (`transaction.atomic()`).\n4. **Tests** (coop/tests.py ou tests/ package) : au moins 8 tests verts : (a) catalogue public accessible anonymement ; (b) /espace/ redirige l'anonyme vers la connexion (302 vers login) ; (c) une productrice ne voit que ses produits ; (d) création pose automatiquement la productrice ; (e) cantine : une membre ne peut PAS éditer le produit d'une autre (403) ; (f) commande qui épuise partiellement le stock décrémente juste ; (g) commande > stock rejetée et stock intact ; (h) seule une gestionnaire change un statut ; (i) le total est recalculé serveur (un total forgé dans le POST est ignoré). `python manage.py test` tout vert ; base de test isolée automatiquement.\n5. **Finitions.** Admin custom (listes filtrables, inlines Commande dans Produit), messages flash partout, pagination, {% csrf_token %} sur chaque formulaire, et settings distinguant DEBUG dev/prod via une variable d'environnement documentée dans un commentaire en tête de settings.py.\n\nCe qui est évalué : l'architecture par rôles (groupe + permission custom + mixins), la règle d'or « le serveur fixe les montants et les propriétaires », les transactions multi-écritures, et la suite de tests comme contrat de livraison. C'est l'exercice où Django se montre ce qu'il est : un framework complet pour des organisations réelles.",
    "constraints": [
        "Le propriétaire (productrice) est TOUJOURS request.user, jamais un champ posté.",
        "Le total d'une commande est calculé côté serveur ; les montants du client sont ignorés.",
        "Stock et commande bougent ensemble dans transaction.atomic().",
        "Permissions : les actions de gestion passent par une permission Django explicite, testée.",
        "Toute règle critique mentionnée (b à i) possède son test vert."
    ],
    "checklist": [
        "Le catalogue est public ; /espace/ exige la connexion (302 → login puis retour sur ?next=).",
        "Awa et Berthe ont chacune un espace ne montrant QUE leurs produits et commandes.",
        "Le POST d'un formulaire produit contenant productrice=2 n'a aucun effet : la productrice réelle est la personne connectée (test d).",
        "Éditer l'URL du produit d'une autre membre → 403 (test e).",
        "Commande de 10 sur stock 12 → stock à 2 ; commande de 5 ensuite → refusée, stock resté à 2 (tests f et g).",
        "Seule une gestionnaire passe une commande de en_attente à livree (test h) ; la permission existe dans la Meta et est auditée dans le shell.",
        "Un total forgé (total=1 dans le POST) n'affecte pas le total enregistré (test i).",
        "L'admin montre produits + commandes en inline, avec filtres et recherche.",
        "`python manage.py test` : au moins 8 tests, tous verts, en quelques secondes sur base isolée.",
        "DEBUG est piloté par l'environnement (variable DJANGO_DEBUG) avec repli sûr pour la prod."
    ],
    "hints": [
        "Le mixin qui protège : `class ProductriceRequired(UserPassesTestMixin): def test_func(self): return self.get_object().productrice == self.request.user` sur Update/Delete. Et dans Create : `form.instance.productrice = self.request.user` avant super().form_valid(form).",
        "La permission custom : dans `class Meta:` de Commande, `permissions = [('peut_gerer_commandes', 'Peut gérer les commandes')]`, migration, attribution au groupe dans un data migration ou via le shell ; puis `@permission_required('coop.peut_gerer_commandes', raise_exception=True)` sur la vue de changement de statut.",
        "La transaction : `with transaction.atomic(): produit.stock -= qte; produit.save(update_fields=['stock']); Commande.objects.create(...)`. Le test g vérifie l'invariant final : stock inchangé après refus. Et les tests Django : `self.client.force_login(user)` pour simuler une session, `assertRedirects` pour les 302, `self.assertEqual(response.status_code, 403)` pour les refus."
    ],
    "solution": {
        "lang": "py",
        "label": "extraits clés : mixin, commande atomique, tests — solution",
        "code": "\n# ========== vues d'écriture (produit) ==========\nclass ProduitCreate(LoginRequiredMixin, CreateView):\n    model = Produit\n    fields = ['nom', 'description', 'prix', 'stock', 'photo']\n    success_url = reverse_lazy('coop:espace')\n\n    def form_valid(self, form):\n        # Le propriétaire n'est JAMAIS posté : il vient de la session. ⚠\n        form.instance.productrice = self.request.user\n        messages.success(self.request, 'Produit publié.')\n        return super().form_valid(form)\n\nclass ProductriceRequired(UserPassesTestMixin):\n    def test_func(self):\n        return self.get_object().productrice == self.request.user\n\n# ========== commande publique (vue) ==========\ndef commander(request, pk):\n    produit = get_object_or_404(Produit, pk=pk, en_stock=True)\n    if request.method == 'POST':\n        form = CommandeForm(request.POST)\n        if form.is_valid():\n            qte = form.cleaned_data['quantite']\n            if qte > produit.stock:\n                messages.error(request, f'Stock insuffisant ({produit.stock} restant).')\n                return redirect('coop:produit_detail', pk=pk)\n            with transaction.atomic():            # stock + commande : tout ou rien\n                produit.stock -= qte\n                produit.save(update_fields=['stock'])\n                Commande.objects.create(\n                    produit=produit, quantite=qte,\n                    total=produit.prix * qte,     # recalculé ICI, jamais posté\n                    client_nom=form.cleaned_data['client_nom'],\n                    client_telephone=form.cleaned_data['client_telephone'])\n            messages.success(request, 'Commande enregistrée, la coopérative vous rappelle.')\n            return redirect('coop:produits_liste')\n    else:\n        form = CommandeForm()\n    return render(request, 'coop/commander.html', {'form': form, 'produit': produit})\n\n# ========== tests de contrat (extraits) ==========\nclass ReglesTest(TestCase):\n    def setUp(self):\n        self.awa = User.objects.create_user('awa', password='x' * 12)\n        self.berthe = User.objects.create_user('berthe', password='y' * 12)\n        self.p = Produit.objects.create(nom='Noix brutes', prix=1500, stock=12,\n                                        productrice=self.awa)\n\n    def test_edition_par_autruie_interdite(self):\n        self.client.force_login(self.berthe)\n        rep = self.client.get(reverse('coop:produits_edit', args=[self.p.pk]))\n        self.assertEqual(rep.status_code, 403)\n\n    def test_total_recalcule_meme_si_forge(self):\n        rep = self.client.post(reverse('coop:commander', args=[self.p.pk]),\n            {'quantite': 3, 'client_nom': 'Koffi', 'client_telephone': '97001122',\n             'total': 1})                       # tentative de fraude\n        cmd = Commande.objects.get()\n        self.assertEqual(cmd.total, 4500)        # 3 × 1500 : serveur seul souverain\n        self.assertEqual(Produit.objects.get(pk=self.p.pk).stock, 9)\n",
        "explain": "La plateforme repose sur une hiérarchie de confiance que le code rend explicite. request.user est identité ; productrice est propriété ; la permission est capacité. Un champ posté ne peut créer aucune de ces trois choses — dès qu'un formulaire les admet en entrée, la porte est ouverte (mass assignment), d'où form.instance.productrice et le total recalculé. Les mixins (LoginRequired, UserPassesTest) déplacent la logique d'accès au niveau de la classe, là ou un oubli saute aux yeux ; le décorateur permission_required fait pareil pour les rôles d'organisation. transaction.atomic rend stock et commande inséparables — l'alternative est une incohérence comptable à la première coupure réseau. Et les tests ? Ils ne prouvent pas que le code « marche » : ils prouvent que les règles tiennent, y compris contre un POST malveillant. C'est la différence entre une démo et une plateforme."
    },
    "criteria": [
        "Rôles et permissions opérationnels (public / membre / gestionnaire) avec accès vérifiés URL par URL.",
        "Invariants protégés : propriétaire, montants et stock garantis côté serveur + transactions.",
        "≥ 8 tests verts couvrant les règles critiques, y compris la fraude au total."
    ],
    "variants": [
        "Ajoute l'inscription en ligne (UserCreationForm) avec validation du groupe par une gestionnaire.",
        "Notifie par email (console backend) la productrice à chaque commande.",
        "Défi : expose les commandes en API JSON (read-only, IsAuthenticated) avec Django REST framework."
    ],
    "related": [
        "jd-auth",
        "jd-admin",
        "jd-cbv",
        "jd-formulaires",
        "jd-tests",
        "jd-modeles"
    ]
}
  ]
};
