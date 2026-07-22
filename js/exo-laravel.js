/* ============================================================
   exo-laravel.js — Exercices pratiques : Laravel
   Validation : checklist d'auto-évaluation (projet local : php artisan serve).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.laravel = {
  module: 'laravel',
  list: [
{
    "id": "exo-lv-page-apropos",
    "level": "fonda",
    "title": "Une page « À propos » bien faite",
    "icon": "article",
    "free": true,
    "minutes": 25,
    "kind": "checklist",
    "setup": "Installe Laravel 11+ (`composer create-project laravel/laravel coop-app`), entre dans le dossier et lance `php artisan serve`. Ouvre http://localhost:8000.",
    "context": "La coopérative féminine de transformation de gari de Godomey veut son site vitrine. Première brique : une page « À propos » qui partage un en-tête et un pied de page communs — tu n'as pas envie de copier-coller ce HTML dans chaque page, et Laravel non plus.",
    "statement": "Tu vas créer ta première vraie page Laravel, avec la bonne architecture dès le départ.\n\n1. Génère un contrôleur `PagesController` avec `php artisan make:controller PagesController`.\n2. Déclare dans `routes/web.php` une route `GET /a-propos` menant à son action `apropos`, **nommée** `a-propos`.\n3. Crée un layout Blade `resources/views/layouts/app.blade.php` avec : doctype, `<title>` alimenté par `@yield('title')`, un en-tête (nom de la coopérative + menu), un `@yield('content')` dans un `<main>`, et un pied de page affichant l'année **calculée en PHP**.\n4. Crée `resources/views/pages/a-propos.blade.php` qui étend ce layout (`@extends`), remplit les sections `title` et `content`, et affiche un paragraphe de présentation reçu par une variable.\n5. Dans l'en-tête du layout : un lien « Accueil » vers `/` et un lien « À propos » généré avec `route('a-propos')`.\n6. Passe depuis le contrôleur une présentation contenant du HTML (`<strong>gari</strong>`) et observe dans le code source que Blade échappe par défaut.\n\nCe qui est évalué : la chaîne route → contrôleur → vue, l'héritage de gabarits Blade, l'échappement par défaut de `{{ }}`, les routes nommées. C'est la grammaire de base de toute application Laravel, et on la soigne dès le premier fichier.",
    "constraints": [
        "La route passe par un contrôleur, pas par une closure dans `web.php`.",
        "La route est nommée et le menu utilise `route('a-propos')`, jamais l'URL en dur.",
        "Le layout est partagé via `@extends` / `@section` — aucune duplication de doctype ou de menu.",
        "Toute variable affichée passe par `{{ }}` (syntaxe échappée) ; tu sais expliquer pourquoi tu évites `{!! !!}` ici.",
        "L'année du pied de page vient de `date('Y')` ou `now()->year`, pas d'un texte fixe."
    ],
    "checklist": [
        "`php artisan serve` démarre sans erreur et http://localhost:8000/a-propos retourne bien une page (statut 200, pas de page Whoops).",
        "`php artisan route:list` affiche la route `GET /a-propos`, son nom `a-propos` et son contrôleur.",
        "Le code source (Ctrl+U) ne montre qu'un seul `<!DOCTYPE html>` : le layout assemble bien en-tête, contenu et pied.",
        "En injectant `<script>alert(1)</script>` dans la variable de présentation, la source affiche le texte échappé (`&lt;script&gt;`) : je constate que Blade protège par défaut.",
        "Le lien « À propos » du menu est généré par `route('a-propos')` ; en changeant l'URL de la route, le lien suit sans retoucher la vue.",
        "L'année du pied de page est l'année courante, produite par du PHP.",
        "Le `<title>` de l'onglet affiche le texte défini dans la section `title` de la vue enfant.",
        "`php artisan view:clear` puis rechargement : la page fonctionne toujours."
    ],
    "hints": [
        "La chaîne complète : dans `web.php`, `Route::get('/a-propos', [PagesController::class, 'apropos'])->name('a-propos');` puis dans le contrôleur `public function apropos() { return view('pages.a-propos', ['presentation' => '…']); }`.",
        "Le layout : `@yield('title')` dans `<title>`, `@yield('content')` là où le contenu change. La vue enfant : `@extends('layouts.app')` en première ligne, puis `@section('title', 'À propos')` et `@section('content') … @endsection`.",
        "Pour le pied de page : `<p>&copy; {{ date('Y') }} Coopérative</p>`. Pour le menu : `<a href=\"{{ route('a-propos') }}\">À propos</a>` — `route()` lit le nom, pas le chemin : l'URL peut changer sans casser le site."
    ],
    "solution": {
        "lang": "php",
        "label": "routes + contrôleur + layout + vue — solution commentée",
        "code": "\n// ========== routes/web.php ==========\nuse Illuminate\\Support\\Facades\\Route;\nuse App\\Http\\Controllers\\PagesController;\n\nRoute::get('/', fn () => view('accueil'))->name('accueil');\n// Le NOM est la signature stable : l'URL peut bouger sans casser un seul lien.\nRoute::get('/a-propos', [PagesController::class, 'apropos'])->name('a-propos');\n",
        "explain": "Retiens la chaîne : la route dirige, le contrôleur orchestre, la vue compose. On nomme la route pour que les liens survivent aux changements d'URL ; on passe par un contrôleur dès le premier jour, même pour une page statique, parce que demain elle affichera l'équipe ou les chiffres de la coopérative. Côté Blade, @extends/@section évite la duplication — un seul endroit pour le menu — et {{ }} échappe tout par défaut : le jour où une donnée utilisateur atterrit dans cette variable, tu es déjà protégé."
    },
    "criteria": [
        "La page /a-propos s'affiche avec en-tête et pied de page communs, sans duplication de HTML.",
        "Blade échappe le HTML injecté : la démonstration avec la balise script a été faite et observée dans le code source.",
        "La route est nommée et utilisée via route() dans le menu ; route:list la montre."
    ],
    "variants": [
        "Ajoute une deuxième page /equipe en 5 minutes en réutilisant le même layout : si c'est long, ton héritage n'est pas propre.",
        "Extrais le menu dans un partial `layouts/_nav.blade.php` inclus avec @include dans le layout.",
        "Défi : passe aussi un tableau d'étapes de l'histoire de la coopérative et affiche-le avec une boucle @foreach."
    ],
    "related": [
        "lv-fondamentaux",
        "lv-routing",
        "lv-controleurs",
        "lv-blade"
    ]
},
{
    "id": "exo-lv-liste-produits",
    "level": "fonda",
    "title": "Catalogue paginé avec Eloquent",
    "icon": "inventory_2",
    "minutes": 35,
    "kind": "checklist",
    "setup": "Reprends le projet de l'exercice précédent (ou recrée un projet Laravel). Configure une base SQLite : dans `.env`, mets `DB_CONNECTION=sqlite` et crée le fichier `database/database.sqlite` (vide), puis vérifie avec `php artisan migrate`.",
    "context": "Le site de la coopérative prend forme. Maintenant, les visiteurs veulent voir les produits : gari fin, gari rouge huilé, tapioca, igname pilée… Une douzaine de références, bientôt une centaine. Il faut une vraie base de données, des données de démonstration pour travailler, et une pagination pour ne pas tout afficher d'un coup.",
    "statement": "Tu vas brancher Eloquent de bout en bout : migration, modèle, seeders, liste paginée et page de détail.\n\n1. Crée le modèle et sa migration en une commande : `php artisan make:model Produit -m`. La table `produits` contient : `nom` (string), `description` (text, nullable), `prix` (unsignedInteger, en FCFA), `image_couleur` (string, un code hexadécimal pour l'exercice).\n2. Écris `ProduitSeeder` (`php artisan make:seeder ProduitSeeder`) qui insère **12 produits** réalistes de la coopérative (gari fin 800 F le kg, atassi 1 200 F, etc.), puis appelle-le depuis `DatabaseSeeder`. Lance `php artisan migrate:fresh --seed`.\n3. Route `GET /produits` → action `index` : récupère les produits avec `Produit::paginate(6)` et affiche-les en cartes (nom, prix formaté, liseré de `image_couleur`) dans une vue qui étend ton layout. Affiche les liens de pagination avec `{{ $produits->links() }}`.\n4. Route `GET /produits/{produit}` → action `show(Produit $produit)` : **route model binding implicite** — Laravel injecte le produit ou rend une 404 automatiquement. La vue de détail affiche nom, prix, description.\n5. Sur la liste, chaque carte porte un lien « Voir » vers `route('produits.show', $produit)`.\n\nCe qui est évalué : migration propre, données de test reproductibles, l'injection de modèle par Laravel (le petit miracle du binding), et la pagination qui tient la route quand le catalogue grossit.",
    "constraints": [
        "La migration est définitive : `migrate:fresh --seed` doit toujours redonner un état sain avec 12 produits.",
        "La pagination passe par `paginate(6)`, jamais par `all()` ni un découpage manuel.",
        "Le détail exploite le route model binding : signature `show(Produit $produit)`, aucun `Produit::find()` manuel.",
        "Les prix sont formatés à l'affichage (`number_format`), pas stockés formatés.",
        "Les vues réutilisent le layout commun (pas de nouveau doctype)."
    ],
    "checklist": [
        "`php artisan migrate:fresh --seed` s'exécute sans erreur et repeuple les 12 produits.",
        "/produits affiche exactement 6 produits et les liens de pagination mènent à la page 2 avec les 6 autres.",
        "Un paramètre `?page=99` ne fait pas planter l'application (page vide élégante).",
        "/produits/3 affiche le bon produit ; /produits/9999 retourne une 404 propre sans code de recherche manuel.",
        "Les prix s'affichent au format « 1 200 F » avec séparateur de milliers.",
        "Dans la barre de débogage Laravel (ou DB::listen), la liste n'exécute qu'UNE requête paginée, pas une requête par produit.",
        "Le seeder est rejouable : le lancer deux fois ne double pas les produits (truncate ou firstOrCreate).",
        "Le code du contrôleur tient en deux méthodes courtes et lisibles."
    ],
    "hints": [
        "La migration : `$table->string('nom'); $table->text('description')->nullable(); $table->unsignedInteger('prix'); $table->string('image_couleur', 7);` — des types simples, des montants en entiers (jamais en float pour l'argent).",
        "Le contrôleur : `public function index() { return view('produits.index', ['produits' => Produit::paginate(6)]); }` et `public function show(Produit $produit) { return view('produits.show', compact('produit')); }`. Le nom du paramètre `{produit}` de la route doit correspondre au nom de variable `$produit`.",
        "Pour le format de prix, une méthode d'accès sur le modèle : `public function prixFormat(): string { return number_format($this->prix, 0, ',', ' ') . ' F'; }` puis `{{ $produit->prixFormat() }}` dans la vue. C'est mieux qu'un formatage éparpillé dans les templates."
    ],
    "solution": {
        "lang": "php",
        "label": "migration + seeder + contrôleur — solution commentée",
        "code": "\n// ========== database/migrations/xxxx_create_produits_table.php ==========\npublic function up(): void\n{\n    Schema::create('produits', function (Blueprint $table) {\n        $table->id();\n        $table->string('nom');\n        $table->text('description')->nullable();      // tout n'a pas de description\n        $table->unsignedInteger('prix');              // FCFA : un ENTIER, jamais un float\n        $table->string('image_couleur', 7);           // ex : '#D97706'\n        $table->timestamps();\n    });\n}\n",
        "explain": "Trois idées à retenir. D'abord l'argent se stocke en entiers (les floats arrondissent mal : 0.1 + 0.2 ≠ 0.3). Ensuite le route model binding : quand le paramètre de route {produit} porte le même nom que la variable $produit typée, Laravel fait le findOrFail pour toi — zéro requête écrite, 404 gratuite. Enfin paginate() remplace all() : il compte, découpe et génère les liens ; ton catalogue peut passer de 12 à 12 000 produits sans toucher au code."
    },
    "criteria": [
        "Le catalogue liste 6 produits par page avec navigation fonctionnelle entre les pages.",
        "La fiche détail fonctionne via le binding implicite et retourne une 404 propre sur un identifiant inconnu.",
        "migrate:fresh --seed restaure un état identique à chaque exécution."
    ],
    "variants": [
        "Ajoute une colonne `stock` et n'affiche sur la liste que les produits `where('stock', '>', 0)`.",
        "Formate le prix via un **Accessor Eloquent** (`Attribute::make`) pour l'utiliser comme un attribut normal : `$produit->prix_format`.",
        "Défi : ajoute une recherche `?q=gari` filtrant la liste paginée — pense à `->withQueryString()` sur les liens."
    ],
    "related": [
        "lv-migrations",
        "lv-eloquent",
        "lv-routing",
        "lv-controleurs",
        "lv-blade"
    ]
},
{
    "id": "exo-lv-crud-produits",
    "level": "inter",
    "title": "CRUD complet avec FormRequest",
    "icon": "edit_note",
    "minutes": 50,
    "kind": "checklist",
    "setup": "Reprends le projet avec le modèle `Produit` et son catalogue paginé (exercices précédents). Tu ajoutes maintenant la partie « bureau » : la présidente de la coopérative doit pouvoir gérer les produits elle-même.",
    "context": "Jusqu'ici, les produits entrent en base par le seeder — c'est toi, la développeuse, qui modifies les prix. La présidente veut un écran : ajouter du gari rouge, corriger un prix, retirer un produit de la saison. Un CRUD, donc. Et un CRUD Laravel sérieux ne valide jamais dans le contrôleur : il délègue à une FormRequest.",
    "statement": "Tu vas construire le CRUD complet des produits, avec validation dédiée et messages en français.\n\n1. Génère un contrôleur resource : `php artisan make:controller ProduitController --resource --model=Produit` (adapte si le tien existe déjà) et déclare `Route::resource('produits', ProduitController::class);`. Liste les 7 routes avec `route:list` et identifie chaque verbe.\n2. Crée **deux FormRequest** : `php artisan make:request StoreProduitRequest` et `UpdateProduitRequest`. Règles communes : `nom` requis, string, 3 à 120 caractères ; `prix` requis, integer, min 50 ; `description` nullable, string, max 2000 ; `image_couleur` requis, regex hexadécimal `#RRGGBB`. Écris les messages d'erreur **en français** via la méthode `messages()`.\n3. `create` affiche le formulaire ; `store(StoreProduitRequest $request)` crée avec `Produit::create($request->validated())` — pense à `$fillable` sur le modèle — puis **redirige** avec `->with('succes', 'Produit ajouté au catalogue.')`.\n4. `edit`/`update` suivent le même mouvement avec `UpdateProduitRequest`. `destroy` supprime et redirige avec un flash.\n5. Les vues : formulaire unique partagé (`_form.blade.php` inclus par `create` et `edit` avec `$produit` neuf ou existant), `old()` sur chaque champ, affichage des erreurs champ par champ (`@error`), et le bandeau flash `session('succes')` dans le layout. La suppression est un **formulaire POST + @method('DELETE')** avec confirmation, jamais un simple lien.\n6. Protège les routes d'écriture du CSRF (automatique avec les formulaires Blade si tu gardes `@csrf`) et vérifie qu'un POST sans token est rejeté.\n\nCe qui est évalué : la discipline de validation (FormRequest + validated()), le pattern POST/Redirect/GET, `$fillable` contre la mass assignment, et l'UX des formulaires qui redonnent les valeurs saisies.",
    "constraints": [
        "La validation vit dans les FormRequest : les actions du contrôleur ne contiennent aucune règle.",
        "`store` et `update` n'utilisent que `$request->validated()` — jamais `$request->all()`.",
        "Le modèle déclare explicitement `$fillable` (la liste blanche), pas `$guarded = []`.",
        "Après chaque écriture réussie : redirection + message flash, jamais d'affichage direct de la vue.",
        "Le formulaire réaffiche les valeurs via `old()` (ou la valeur du modèle en édition) après une erreur."
    ],
    "checklist": [
        "`php artisan route:list` montre les 7 routes resource avec leurs noms (produits.index, .create, .store, …).",
        "Soumettre le formulaire vide affiche les erreurs en français sous chaque champ concerné, sans perdre les valeurs valides déjà saisies.",
        "Un prix de -500 ou « abc » est refusé ; 250 est accepté.",
        "Après création, je suis redirigé (POST/Redirect/GET) et le bandeau de succès s'affiche une seule fois, puis disparaît au rechargement.",
        "La modification conserve les autres champs et met bien à jour l'enregistrement existant (pas de doublon créé).",
        "La suppression passe par un formulaire DELETE avec @method('DELETE') et @csrf ; un simple GET /produits/3/destroy n'existe pas.",
        "Un POST forgé sans token CSRF (via curl) est rejeté avec une 419.",
        "`$request->all()` n'apparaît nulle part ; `attacker-champ=admin` injecté dans le formulaire est silencieusement ignoré."
    ],
    "hints": [
        "La signature qui change tout : `public function store(StoreProduitRequest $request)`. Laravel valide AVANT d'entrer dans la méthode ; en cas d'échec, il redirige en arrière avec les erreurs et les anciennes valeurs tout seul.",
        "Le formulaire partagé : `create` passe `new Produit()`, `edit` passe le produit existant, et chaque champ vaut `old('nom', $produit->nom)`. L'action change : `route('produits.store')` pour créer, `route('produits.update', $produit)` + `@method('PUT')` pour éditer.",
        "Pour le flash : `return redirect()->route('produits.index')->with('succes', 'Produit ajouté.');` et dans le layout `@if (session('succes')) <div class=\"flash\">{{ session('succes') }}</div> @endif`. Un flash ne vit qu'une requête : c'est exactement ce qu'il faut pour un message de confirmation."
    ],
    "solution": {
        "lang": "php",
        "label": "FormRequest + contrôleur (extraits) — solution commentée",
        "code": "\n// ========== app/Http/Requests/StoreProduitRequest.php ==========\npublic function authorize(): bool\n{\n    return true; // pas d'authentification dans cet exercice : on autorise tout\n}\n\npublic function rules(): array\n{\n    return [\n        'nom'          => ['required', 'string', 'min:3', 'max:120'],\n        'prix'         => ['required', 'integer', 'min:50'],\n        'description'  => ['nullable', 'string', 'max:2000'],\n        'image_couleur'=> ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],\n    ];\n}\n\npublic function messages(): array\n{\n    return [\n        'nom.required'  => 'Le nom du produit est obligatoire.',\n        'nom.min'       => 'Un nom de moins de 3 lettres, vraiment ?',\n        'prix.required' => 'Indique le prix en FCFA.',\n        'prix.min'      => 'Rien ne coûte moins de 50 F à la coopérative.',\n    ];\n}\n\n// ========== app/Http/Controllers/ProduitController.php (extraits) ==========\npublic function store(StoreProduitRequest $request)\n{\n    // La validation est DÉJÀ faite ici, sinon on n'entrerait pas.\n    $produit = Produit::create($request->validated()); // $fillable protège le reste\n    // PRG : on redirige, on n'affiche pas — F5 ne reposte jamais le formulaire.\n    return redirect()->route('produits.show', $produit)\n                     ->with('succes', 'Produit ajouté au catalogue.');\n}\n\npublic function update(UpdateProduitRequest $request, Produit $produit)\n{\n    $produit->update($request->validated());\n    return redirect()->route('produits.show', $produit)\n                     ->with('succes', 'Produit mis à jour.');\n}\n\npublic function destroy(Produit $produit)\n{\n    $produit->delete();\n    return redirect()->route('produits.index')\n                     ->with('succes', 'Produit retiré du catalogue.');\n}\n",
        "explain": "Le secret, c'est la répartition des rôles. La FormRequest connaît les règles et parle français à l'utilisatrice ; le contrôleur ne voit que des données propres, d'où validated() à la place de all() — validated() ne retourne QUE les champs déclarés dans les règles, donc même un champ malveillant ajouté au formulaire est ignoré. $fillable est la deuxième porte : il liste les colonnes affectables en masse. Enfin le PRG (POST puis Redirect puis GET) : si tu affichais directement la vue après le POST, un simple F5 re-enverrait le formulaire et dupliquerait le produit. La redirection + flash, c'est la manière professionnelle de dire « c'est fait »."
    },
    "criteria": [
        "Les 7 opérations resource fonctionnent : lister, voir, créer, modifier, supprimer, avec les formulaires associés.",
        "La validation rejette les données invalides avec des messages français et conserve les saisies.",
        "CSRF, $fillable et validated() forment la triple protection, démontrée par les tests négatifs (curl, champ injecté)."
    ],
    "variants": [
        "Ajoute un upload d'image de produit (règle `image|max:2048`, `store('produits', 'public')`, `Storage::url()`).",
        "Passe en soft deletes : les produits « supprimés » restent récupérables (`SoftDeletes`, requête `withTrashed` côté admin).",
        "Défi : déduplique les règles communes aux deux FormRequest via un trait ou une classe mère `ProduitRequest`."
    ],
    "related": [
        "lv-validation",
        "lv-eloquent",
        "lv-controleurs",
        "lv-erreurs",
        "lv-blade"
    ]
},
{
    "id": "exo-lv-relations",
    "level": "inter",
    "title": "Catégories et relations Eloquent",
    "icon": "account_tree",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Reprends le projet catalogue avec son CRUD de produits. Tu vas ajouter une table `categories` et relier chaque produit à sa catégorie.",
    "context": "Le catalogue grandit : gari, tapioca, atassi, farine de maïs, huile rouge… La présidente veut un menu « Céréales », « Tubercules », « Huiles ». Et elle veut voir, sur chaque fiche produit, sa catégorie. C'est l'exercice où tu découvres le monstre qui guette tous les débutants Eloquent : le problème N+1.",
    "statement": "Tu vas modéliser la relation Catégorie → Produits, l'exploiter dans les vues, et prouver que tes requêtes restent saines.\n\n1. `php artisan make:model Categorie -m` : table `categories` (`nom` string unique, `slug` string unique). Ajoute une **colonne** `categorie_id` aux produits via une nouvelle migration : `unsignedBigInteger` + clé étrangère `constrained('categories')->cascadeOnDelete()`. Écris un `CategorieSeeder` (4 catégories) et rattache chaque produit du `ProduitSeeder` à sa catégorie. `migrate:fresh --seed`.\n2. Déclare les relations : `Categorie hasMany Produit` et `Produit belongsTo Categorie`.\n3. Dans le formulaire produit (create/edit), remplace tout champ libre éventuel par un **`<select>` des catégories** alimenté depuis la base, avec la valeur présélectionnée (`old('categorie_id', $produit->categorie_id)`). Ajoute la règle `'categorie_id' => ['required', 'exists:categories,id']` aux deux FormRequest.\n4. Sur la liste des produits, affiche sous chaque nom un badge avec le nom de sa catégorie. **Charge-la par eager loading** : `Produit::with('categorie')->paginate(6)`. Prouve ensuite la différence : active la barre de debug (ou `DB::listen`) et compare le nombre de requêtes avec et sans `with`.\n5. Ajoute `GET /categories/{categorie:slug}` qui affiche la catégorie, son nombre de produits (via `withCount('produits')`) et la liste paginée de ses produits.\n6. Bonus de présentation : le menu du layout liste les catégories — construis-le avec `Categorie::withCount('produits')->get()` et affiche « Céréales (5) ».\n\nCe qui est évalué : les migrations de clés étrangères, les deux directions d'une relation, la validation `exists`, le `withCount`, et surtout le réflexe eager loading — le tic qui distingue un code Laravel qui tient la charge d'un code qui s'effondre à 300 produits.",
    "constraints": [
        "La clé étrangère est une vraie contrainte SQL (`constrained`), pas une simple colonne orpheline.",
        "Les listes qui affichent des relations passent par `with()` — aucune requête par ligne (N+1 interdit).",
        "Le select des catégories vient de la base, jamais d'un tableau écrit en dur dans la vue.",
        "La validation exige `exists:categories,id` sur `categorie_id`.",
        "La route catégorie utilise le binding par `slug` (`{categorie:slug}`), jolie URL obligatoire."
    ],
    "checklist": [
        "`migrate:fresh --seed` reconstruit tout : 4 catégories, 12 produits correctement rattachés.",
        "Créer un produit via le formulaire l'associe bien à la catégorie choisie dans le select.",
        "Un `categorie_id=999` forgé dans le HTML du select est rejeté par la validation.",
        "Sur /produits, la barre de debug montre 2 requêtes (produits paginés + catégories) quel que soit le nombre de lignes affichées.",
        "Retirer le `with('categorie')` fait grimper le compteur de requêtes à 2 + 6 : j'ai vu le N+1 de mes propres yeux.",
        "La page /categories/cereales affiche le bon compteur et uniquement les produits de cette catégorie.",
        "Le menu affiche les compteurs sans requête par catégorie (withCount vérifié).",
        "Supprimer une catégorie propage la suppression (cascade) — ou je sais expliquer pourquoi je choisirais restrict en production."
    ],
    "hints": [
        "La migration d'ajout : `Schema::table('produits', function (Blueprint $table) { $table->foreignId('categorie_id')->constrained()->cascadeOnDelete(); });` — `foreignId` crée la colonne typée, `constrained` devine la table au pluriel, `cascadeOnDelete` propage.",
        "Les deux faces de la relation : dans `Categorie`, `public function produits() { return $this->hasMany(Produit::class); }` ; dans `Produit`, `public function categorie() { return $this->belongsTo(Categorie::class); }`. Le nom de la méthode devient le nom utilisé par `with('categorie')`.",
        "Pour la page catégorie : route `Route::get('/categories/{categorie:slug}', …)`, puis dans l'action `$categorie->loadCount('produits')` et `$categorie->produits()->paginate(6)`. Attention : `produits` (la relation) se pagine via la méthode `produits()` — la requête — pas via la collection déjà chargée."
    ],
    "solution": {
        "lang": "php",
        "label": "migration + relations + contrôleur — solution commentée",
        "code": "\n// ========== migration d'ajout de la clé étrangère ==========\nSchema::table('produits', function (Blueprint $table) {\n    $table->foreignId('categorie_id')          // colonne typée + nommage conventionnel\n          ->constrained()                      // FK vers categories.id\n          ->cascadeOnDelete();                 // catégorie supprimée → produits aussi\n});\n\n// ========== app/Models/Categorie.php ==========\npublic function produits()\n{\n    return $this->hasMany(Produit::class);     // UNE catégorie, PLUSIEURS produits\n}\n\n// ========== app/Models/Produit.php ==========\npublic function categorie()\n{\n    return $this->belongsTo(Categorie::class); // le produit PORTE la clé étrangère\n}\n\n// ========== ProduitController@index — le remède au N+1 ==========\npublic function index()\n{\n    return view('produits.index', [\n        // with() = 2 requêtes au total. Sans lui : 1 + 1 par produit affiché.\n        'produits' => Produit::with('categorie')->latest()->paginate(6),\n    ]);\n}\n\n// ========== CategorieController@show ==========\npublic function show(Categorie $categorie)    // binding par slug (route {categorie:slug})\n{\n    return view('categories.show', [\n        'categorie' => $categorie->loadCount('produits'),\n        // La relation se pagine via la REQUÊTE (parenthèses), pas la collection.\n        'produits' => $categorie->produits()->paginate(6),\n    ]);\n}\n",
        "explain": "Trois gestes de pro. Un : la clé étrangère est une contrainte réelle — la base refuse l'incohérence, ton code n'a pas à deviner. Deux : with() n'est pas une optimisation optionnelle, c'est la façon normale de lire des relations dans une liste ; garde l'habitude d'ouvrir la barre de debug et de compter les requêtes, le N+1 ne se sent pas au clic, il se lit. Trois : belongsTo vit du côté qui porte la clé (le produit), hasMany de l'autre — quand tu hésites, demande-toi « quelle table contient categorie_id ? ». Enfin, {categorie:slug} dans la route dit à Laravel de chercher par slug : tes URLs restent lisibles sans une ligne de code supplémentaire."
    },
    "criteria": [
        "Catégories créées, produits rattachés, select fonctionnel dans le CRUD.",
        "Aucune liste ne produit de N+1 : le compteur de requêtes reste plat quel que soit le nombre de lignes.",
        "La page catégorie (URL en slug) affiche compteur et produits paginés de la seule catégorie concernée."
    ],
    "variants": [
        "Ajoute une page d'accueil affichant les 3 catégories les plus fournies (`withCount` + `orderByDesc('produits_count')`).",
        "Transforme la suppression de catégorie : bloque la suppression si elle contient encore des produits (`restrictOnDelete` ou test manuel + message).",
        "Défi : relation many-to-many — des `etiquettes` (Bio, Du terroir, Promo) attachées aux produits via une table pivot et `belongsToMany`."
    ],
    "related": [
        "lv-relations",
        "lv-eloquent",
        "lv-migrations",
        "lv-validation"
    ]
},
{
    "id": "exo-lv-api-tontines",
    "level": "projet",
    "title": "API REST des tontines de quartier",
    "icon": "api",
    "minutes": 90,
    "kind": "checklist",
    "setup": "Nouveau projet : `composer create-project laravel/laravel tontines-api`. Base SQLite comme d'habitude. Pour tester l'API : curl, HTTPie ou le fichier `tests/Feature` — pas de frontend à écrire, c'est une API pure.",
    "context": "Awa Mensah coordonne trois tontines dans le quartier Ladji à Cotonou : chaque semaine, les membres cotisent, et un bénéficiaire différent récolte la cagnotte. Son cahier et sa calculatrice atteignent leurs limites. Une applic mobile arrivera plus tard ; ton travail, aujourd'hui, c'est l'API REST solide qui la servira : tontines, membres, cotisations.",
    "statement": "Tu vas construire une API REST complète, versionnée, testée automatiquement.\n\n1. **Modèle de données.** Migration + modèle `Tontine` (`nom` string unique, `montant_cotisation` unsignedInteger, `frequence` enum('hebdomadaire','mensuelle'), `demarree_le` date). Migration + modèle `Membre` (`nom`, `telephone` string, `tontine_id` FK cascade, unique le couple tontine+telephone). Migration + modèle `Cotisation` (`membre_id` FK, `montant` unsignedInteger, `payee_le` date, `semaine` unsignedSmallInteger). Relations hasMany/belongsTo en conséquence, seeders réalistes (2 tontines, 8 membres, une vingtaine de cotisations).\n2. **Endpoints v1.** Dans `routes/api.php`, préfixe `v1` : `GET /v1/tontines`, `POST /v1/tontines`, `GET /v1/tontines/{tontine}`, `PATCH /v1/tontines/{tontine}`, `DELETE /v1/tontines/{tontine}`, et en imbriqué `GET /v1/tontines/{tontine}/membres`, `POST /v1/tontines/{tontine}/membres`. Utilise `Route::apiResource` autant que possible — il ne génère pas les routes de formulaires.\n3. **Réponses propres.** Crée `TontineResource` et `MembreResource` (`php artisan make:resource`). La collection de tontines inclut `membres_count` et `total_collecte` (somme des cotisations) via `loadCount`/`loadSum` — jamais calculés en boucle. Formate les montants en entiers FCFA et les dates en ISO 8601.\n4. **Validation.** `StoreTontineRequest` (fréquence dans la liste, montant ≥ 500) et `StoreMembreRequest` (téléphone requis, format béninois tolérant : 8 à 12 chiffres, unique dans la tontine). Les erreurs doivent ressortir en JSON 422 avec messages français — c'est automatique avec les FormRequest sur une route `api`.\n5. **Cotisations.** `POST /v1/membres/{membre}/cotisations` qui enregistre une cotisation (montant = celui de la tontine si omis, semaine requise, pas deux cotisations du même membre la même semaine : contrainte unique composée + règle applicative). Réponse 201 avec la cotisation créée.\n6. **Tests automatisés.** Écris une classe de tests de bout en bout avec `RefreshDatabase` : création de tontine (201 + structure JSON), refus d'une tontine sans fréquence valide (422 + message français), ajout d'un membre, impossibilité d'un doublon téléphone dans la même tontine (422), double cotisation même semaine refusée (422 ou 409), et suppression de tontine (204 + membres en cascade). Vise 6 tests verts : `php artisan test`.\n\nCe qui est évalué : la conception d'une API cohérente (verbes, statuts, structure), les API Resources comme couche de présentation, la validation JSON, les contraintes d'intégrité doubles (base + applicative), et les tests qui prouvent le tout sans frontend.",
    "constraints": [
        "Les réponses passent par des API Resources : aucun modèle Eloquent brut retourné directement (`return $tontine` interdit).",
        "Statuts HTTP corrects : 201 à la création, 422 à la validation, 404 au binding manquant, 204 à la suppression.",
        "Les totaux (`membres_count`, `total_collecte`) viennent de `loadCount`/`loadSum`, pas de boucles PHP.",
        "L'unicité « membre + semaine » des cotisations est garantie AUSSI par une contrainte unique en base.",
        "Au moins 6 tests de fonctionnalité verts, avec `RefreshDatabase`."
    ],
    "checklist": [
        "`php artisan route:list` montre les routes v1 avec les bons verbes ; apiResource n'a généré ni create ni edit.",
        "GET /api/v1/tontines retourne du JSON avec membres_count et total_collecte cohérents avec les seeders.",
        "POST d'une tontine avec `frequence=tous_les_jours` → 422 JSON avec message français explicite.",
        "Le même téléphone dans deux tontines différentes est accepté ; dans la même tontine → 422.",
        "Deux cotisations du même membre, même semaine : la seconde est refusée même en contournant l'application (unique en base vérifié).",
        "Un Accept: application/json sur une 404 donne du JSON propre, pas une page HTML.",
        "DELETE d'une tontine supprime membres et cotisations en cascade (vérifié en base).",
        "`php artisan test` : 6 tests ou plus, tous verts, base d'essai isolée (sqlite en mémoire)."
    ],
    "hints": [
        "Le groupe de routes : `Route::prefix('v1')->group(function () { Route::apiResource('tontines', TontineController::class); Route::apiResource('tontines.membres', MembreController::class)->only(['index','store']); … });` — la notation pointée crée l'imbrication `/tontines/{tontine}/membres` et le binding du parent.",
        "Les compteurs sans N+1 : dans `index`, `Tontine::withCount('membres')->withSum('cotisations', 'montant')->paginate(15)` — tu obtiens `membres_count` et `cotisations_sum_montant` que le Resource expose sous de jolis noms.",
        "La double protection des cotisations : en base, `$table->unique(['membre_id', 'semaine']);` — et côté applicatif, attrape le `QueryException` ou valide en amont pour retourner un 422 lisible plutôt qu'un 500. Les deux couches ont un rôle : la base garantit, l'application explique."
    ],
    "solution": {
        "lang": "php",
        "label": "routes + resource + test — solution commentée (extraits)",
        "code": "\n// ========== routes/api.php ==========\nRoute::prefix('v1')->group(function () {\n    Route::apiResource('tontines', TontineController::class);\n    Route::apiResource('tontines.membres', MembreController::class)->only(['index', 'store']);\n    Route::post('membres/{membre}/cotisations', [CotisationController::class, 'store']);\n});\n\n// ========== app/Http/Resources/TontineResource.php ==========\npublic function toArray($request): array\n{\n    return [\n        'id'             => $this->id,\n        'nom'            => $this->nom,\n        'montant'        => $this->montant_cotisation,      // entier FCFA\n        'frequence'      => $this->frequence->value,         // enum → string\n        'membres_count'  => $this->whenCounted('membres'),\n        'total_collecte' => $this->whenNotNull($this->cotisations_sum_montant),\n        'creee_le'       => $this->created_at->toIso8601String(),\n    ];\n}\n\n// ========== TontineController@index ==========\npublic function index()\n{\n    $tontines = Tontine::withCount('membres')\n        ->withSum('cotisations', 'montant')     // SQL agrège : zéro boucle PHP\n        ->paginate(15);\n    return TontineResource::collection($tontines);\n}\n\n// ========== tests/Feature/TontineTest.php (un test parmi six) ==========\npublic function test_on_refuse_une_frequence_inconnue(): void\n{\n    $reponse = $this->postJson('/api/v1/tontines', [\n        'nom' => 'Tontine des Mareyeuses',\n        'montant_cotisation' => 5000,\n        'frequence' => 'tous_les_jours',          // hors enum !\n        'demarree_le' => '2026-02-01',\n    ]);\n    $reponse->assertStatus(422)\n            ->assertJsonValidationErrors(['frequence']);\n}\n",
        "explain": "Regarde comment chaque couche reste à sa place. Les routes ne font que nommer et imbriquer ; apiResource t'évite d'écrire sept lignes par ressource et — détail qui compte — ne crée pas create/edit, qui n'ont pas de sens en API. Le Resource est ton traducteur : la base parle snake_case et centimes, l'extérieur reçoit des noms stables, des entiers FCFA et des dates ISO ; le jour où tu renommes une colonne, tu ne casses aucun client de l'API. withSum demande à SQL de faire le calcul qu'une boucle aurait fait en php — plus rapide, plus sobre. Et le test postJson : c'est ta filet de sécurité définitif. Pas de frontend ici, donc la preuve passe par PHPUnit : si 6 scénarios métiers sont verts, l'application mobile pourra se brancher demain sans surprise."
    },
    "criteria": [
        "L'API couvre tontines, membres et cotisations avec verbes et statuts HTTP corrects, réponses JSON uniformes via Resources.",
        "Les doubles unicités (téléphone par tontine, cotisation par semaine) tiennent à la fois en validation et en contraintes SQL.",
        "Au moins 6 tests de fonctionnalité verts prouvent les cas nominaux ET les refus."
    ],
    "variants": [
        "Ajoute Sanctum : un token par coordinatrice, routes d'écriture protégées par `auth:sanctum`, lecture publique.",
        "Ajoute `GET /v1/tontines/{tontine}/tour` qui calcule le prochain bénéficiaire (membre le plus ancien sans tour effectué).",
        "Défi : endpoints de pagination des cotisations filtres par semaine (`?semaine=12`) avec test dédié."
    ],
    "related": [
        "lv-api-resources",
        "lv-validation",
        "lv-relations",
        "lv-tests",
        "lv-eloquent"
    ]
}
  ]
};
