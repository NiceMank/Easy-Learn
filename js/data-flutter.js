/* ============================================================
   data-flutter.js — Module Flutter pour Easy Learn
   Catégorie : Mobile | Couleur : --c-flutter #0553B1
   14 fiches : installation, Dart (bases + POO), widgets,
   layout, état (setState + Provider), navigation, formulaires,
   réseau, listes, thème, cycle de vie, assets, tests, build.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};
DEVDOCS.flutter = {id:"flutter",name:"Flutter",icon:"deployed_code",tagline:"Un seul code Dart, deux apps natives (iOS et Android) - widgets, Hot Reload, Material Design et Cupertino, performances 60 fps.",heroTitle:"Flutter, le framework mobile de Google qui dessine chaque pixel",categories:[
{id:"fondamentaux",name:"Fondamentaux",icon:"rocket_launch",fiches:[
{id:"flutter-installation",title:"Installation & configuration",icon:"download",level:"Débutant",tagline:"Flutter SDK, flutter doctor, Android Studio/VS Code : ton environnement de dev mobile en 20 minutes.",intro:"Installer Flutter, c'est poser TROIS briques : le **SDK Flutter** (Dart + moteur de rendu + outils de build), un **IDE** (VS Code ou Android Studio), et un **appareil cible** (téléphone, émulateur ou simulateur). `flutter doctor` vérifie que tout est en place. Cette fiche te guide OS par OS et te fait voir ton app sur un écran en moins d'une heure.",blocks:[
{t:"h3",h:"Pourquoi Flutter exige-t-il tout cet outillage ?"},
{t:"p",h:"Flutter **dessine chaque pixel** via son moteur Impeller, compile Dart en code natif ARM/x86, et intègre les SDK Android/iOS. Trois briques : le SDK Flutter, les SDK plateformes (Android SDK, Xcode), et un éditeur avec plugins. L'investissement initial est d'une heure la première fois — ensuite `flutter create` et `flutter run` sont tes seules commandes."},
{t:"h3",h:"Windows, macOS, Linux : les trois chemins"},
{t:"code",lang:"bash",label:"Installation — Windows",code:"# 1. Télécharger Flutter SDK (ZIP) docs.flutter.dev → C:\\flutter\n# 2. Ajouter C:\\flutter\\bin au PATH\n# 3. Android Studio + SDK Platforms + Emulator + VS Code\n# 4. flutter doctor → [✓] partout\n# 5. flutter doctor --android-licenses → y à chaque licence"},
{t:"code",lang:"bash",label:"Installation — macOS",code:"# brew install --cask flutter\n# export PATH=\"$HOME/development/flutter/bin:$PATH\"\n# Xcode (Mac App Store) + sudo gem install cocoapods\n# flutter doctor → tout [✓]"},
{t:"code",lang:"bash",label:"Installation — Linux",code:"# sudo apt install curl git clang cmake ninja-build -y\n# git clone https://github.com/flutter/flutter.git -b stable ~/flutter\n# export PATH=\"$HOME/flutter/bin:$PATH\"\n# sudo snap install android-studio --classic\n# flutter doctor + flutter doctor --android-licenses"},
{t:"h3",h:"Premier projet, premier flutter run"},
{t:"code",lang:"bash",label:"Du terminal au téléphone",code:"flutter create awa_boutique\ncd awa_boutique\nflutter run\n# Choix : 1) téléphone  2) émulateur  3) Chrome\n# Hot Reload : touche \"r\" dans le terminal → changement < 1 sec\n# Hot Restart : touche \"R\" → reset état + reload"},
{t:"h3",h:"La structure générée"},
{t:"code",lang:"text",label:"awa_boutique/ après flutter create",code:"awa_boutique/\n├── lib/main.dart           # point d'entrée Dart\n├── pubspec.yaml             # nom, version, dépendances\n├── android/                 # projet Android natif\n├── ios/                     # projet iOS natif\n├── test/widget_test.dart    # tests\n└── analysis_options.yaml    # règles de lint"},
{t:"p",h:"Le fichier clé : `pubspec.yaml`. Équivalent du `package.json` — déclare dépendances, assets et métadonnées. Modifier = `flutter pub get` obligatoire. Les dossiers `android/` et `ios/` contiennent de VRAIS projets natifs — tu n'y touches presque jamais, mais ils sont là pour le réglage fin."},
{t:"callout",kind:"info",h:"Différence clé avec React Native/Expo : Flutter intègre SES PROPRES dossiers natifs dès `flutter create` — pas d'« éjecter ». Le Hot Reload est le plus rapide du marché (~300 ms). Contrepartie : installation initiale plus lourde."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Flutter = Dart, je dois apprendre un nouveau langage. »** Dart ressemble à Java/JavaScript — syntaxe familière en 30 min. Le vrai investissement est l'architecture en widgets.",
  "**« flutter doctor me dit Android license status unknown. »** `flutter doctor --android-licenses` et `y` résout ça. Problème n°1 des débutants Flutter.",
  "**« Sans Mac, pas d'app iPhone. »** Faux pour le développement : tu codes sur Android/Chrome, le build iOS est dans le cloud (Codemagic). Seule la publication App Store exige un Mac.",
  "**« Je dois maîtriser Android Studio. »** Non — VS Code suffit pour 95 %. Android Studio sert aux SDK/émulateurs.",
  "**« Le Hot Reload casse souvent. »** Il refuse sur un changement de signature de méthode — c'est voulu. Hot Restart (`R`) résout ces cas."
]},
{t:"h3",h:"Les erreurs typiques à ne plus commettre"},
{t:"p",h:"Ignorer les croix rouges de `flutter doctor` → build qui échoue plus tard. Oublier le mode développeur + debug USB sur Android → `flutter devices` ne voit rien."},
{t:"h3",h:"Lien avec les notions déjà vues"},
{t:"p",h:"L'environnement posé, les fiches suivantes t'apprennent Dart puis les widgets. `flutter create` = `npx create-expo-app`, `pubspec.yaml` = `package.json`, `lib/` = `src/`. Une fois installé, tu ne touches plus à la config."}
],errors:[
{title:"flutter doctor : Android license status unknown",lang:"bash",bad:"flutter doctor\n# [✗] Android license status unknown\n# → flutter run : « License not accepted » → crash",good:"flutter doctor --android-licenses\n# → taper \"y\" à chaque licence\n# flutter doctor → [✓] Android toolchain ✓",why:"Google exige l'acceptation des licences SDK Android avant compilation. Sans cette étape, Gradle refuse de builder. Piège n°1 sur Windows/Linux."},
{title:"flutter devices ne voit pas le téléphone",lang:"bash",bad:"flutter devices\n# No devices found. Téléphone branché mais mode développeur + debug USB non activés.",good:"# Téléphone → À propos → 7× « Numéro de build »\n# Options développeur → Débogage USB → ON\n# Débrancher/rebrancher → accepter clé RSA\n# flutter devices → doit afficher le device",why:"Android exige mode développeur ET debug USB. Sans debug USB, le pont ADB ne s'active pas."},
{title:"flutter pub get oublié après modification de pubspec.yaml",lang:"bash",bad:"# Ajout http: ^1.2.0 dans pubspec → flutter run\n# Error: Could not resolve the package 'http'",good:"flutter pub get\n# → télécharge la dépendance\n# flutter run → OK ✓",why:"pubspec.yaml déclare une intention — flutter pub get l'exécute. VS Code propose « Get packages » automatiquement."}
],related:["flutter-dart-bases","flutter-widgets","flutter-build","rn-installation"]},
{id:"flutter-dart-bases",title:"Dart : variables, types et null safety",icon:"data_object",level:"Débutant",tagline:"var, final, const, int, String, List, Map, ? et late : les fondations du langage qui fait tourner Flutter.",intro:"Dart est un langage **orienté objet, à typage statique avec inférence**, optimisé pour la compilation AOT (production) ET JIT (Hot Reload). Si tu viens de JS : Dart ressemble à TypeScript en plus strict. Si tu viens de Java : Dart en plus concis — pas de `new` obligatoire, fonctions top-level, et **null safety** qui distingue `String?` (nullable) de `String` (non-nullable).",blocks:[
{t:"h3",h:"Les trois façons de déclarer une variable"},
{t:"code",lang:"dart",label:"lib/bases.dart",code:"void main() {\n  // 1) var : type INFÉRÉ, fixé à la 1ère affectation\n  var nom = \"Awa Mensah\";     // Dart infère String\n  // nom = 42;                // ERREUR : var a fixé String\n  var age = 28;               // Dart infère int\n\n  // 2) Type explicite (signatures de fonction…)\n  String ville = \"Cotonou\";\n  int nbSacs = 12;\n  double prix = 250.50;\n  bool disponible = true;\n\n  // 3) dynamic : désactive le type-checking (rare)\n  dynamic truc = \"gari\";\n  truc = 42;                  // OK mais perd toute vérification\n}"},
{t:"h3",h:"final vs const : immuable, deux variantes"},
{t:"code",lang:"dart",code:"// final  : valeur fixée UNE FOIS au runtime\nfinal maintenant = DateTime.now();       // OK\n// const  : valeur connue À LA COMPILATION\nconst pi = 3.14159;\nconst doubleRayon = 2 * pi;             // OK\n// const impossible = DateTime.now();    // ERREUR compilation\n\n// En Flutter : const Widget = widget CANONIQUE (pas reconstruit)\n// const Text(\"Bonjour\") → créé UNE fois, réutilisé"},
{t:"h3",h:"Null safety : la distinction qui change tout"},
{t:"code",lang:"dart",code:"// SANS ? → NE PEUT PAS être null\nString prenom = \"Awa\";\n// prenom = null;            // ERREUR compilation\n\n// AVEC ? → PEUT être null\nString? surnom = null;       // OK\nsurnom = \"La reine du gari\"; // OK aussi\n\n// Utiliser une nullable :\nint? longueur = surnom?.length;         // ?. → null si surnom null\nString affichage = surnom ?? \"Anonyme\"; // ?? → valeur par défaut\n// surnom!.length   → ! = « je sais », CRASH si null\n\n// late : « je promets d'initialiser avant usage »\nlate String description;\ndescription = \"Vendeuse de gari premium\";   // OK"},
{t:"h3",h:"Collections : List, Map, Set"},
{t:"code",lang:"dart",code:"// List (tableau) :\nList<String> fruits = [\"mangue\", \"ananas\", \"orange\"];\nvar legumes = <String>[];                  // liste vide typée\n\n// Map (dictionnaire) :\nMap<String, int> stock = {\"gari\": 120, \"sucre\": 45};\nstock[\"gari\"] = 115;                       // mise à jour\n\n// Set (sans doublon) :\nSet<String> uniques = {\"Awa\", \"Koffi\", \"Awa\"}; // {Awa, Koffi}"},
{t:"h3",h:"Fonctions et fonctions fléchées"},
{t:"code",lang:"dart",code:"int calculerTotal(int prix, int qte) {\n  return prix * qte;\n}\n// Fléchée :\nint total(int p, int q) => p * q;\n\n// Paramètres nommés + défauts :\nvoid afficher({required String nom, int stock = 0}) {\n  print(\"$nom — $stock en stock\");\n}\nafficher(nom: \"Gari Ijebu\", stock: 200);\n\n// Paramètres optionnels positionnels :\nString saluer(String nom, [String titre = \"Client\"]) => \"$titre $nom\";"},
{t:"callout",kind:"tip",h:"Réflexe : toujours `final` plutôt que `var` — empêche la réassignation accidentelle. JAMAIS `dynamic` sauf contrainte avérée (JSON brut)."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Dart = JavaScript avec des types. »** Faux — Dart est compilé (AOT natif), avec vrai système de classes et null safety obligatoire. La syntaxe ressemble, le moteur non.",
  "**« final et const, c'est pareil. »** `final` = runtime, `const` = compilation. `const` est plus restrictif mais permet l'optimisation des widgets canoniques.",
  "**« Je mets des late partout. »** `late` est une promesse — si non tenue → crash runtime. Pour injection de dépendances seulement."
]},
{t:"h3",h:"Les erreurs typiques"}, {t:"p",h:"Confondre `var` (type fixé) et `dynamic` (pas de type). Attribuer null à une variable non-nullable sans `?`."},
{t:"h3",h:"Lien avec les notions déjà vues"},
{t:"p",h:"Dart est à Flutter ce que JavaScript est à React. Si tu connais TypeScript : `String?` = `string | null`, `final` ≈ `const` (JS), `late` ≈ `!` (definite assignment)."}
],errors:[
{title:"var puis changement de type",lang:"dart",bad:"var x = \"Bonjour\";\nx = 42;  // Error: can't assign int to String",good:"Object y = \"Bonjour\";  // type large\ny = 42;  // OK\n// Mieux : deux variables distinctes",why:"var fixe le type à la 1ère affectation — inférence, pas dynamic."},
{title:"Attribuer null à une non-nullable",lang:"dart",bad:"String nom = null;  // Compile error",good:"String? nom = null;   // nullable\nString nom = \"\";        // défaut vide",why:"La null safety est le garde-fou de Dart. Par défaut, un type NE PEUT PAS être null. Marque avec ? et gère avec ?. ?? ou if."}
],related:["flutter-dart-poo","flutter-widgets","ts-types-scalaires","java-primitifs-wrappers"]},
{id:"flutter-dart-poo",title:"Dart : classes, héritage et POO",icon:"account_tree",level:"Intermédiaire",tagline:"class, extends, implements, mixin : la programmation orientée objet en Dart, socle de tous les widgets Flutter.",intro:"En Flutter, TOUT est classe — chaque widget, state, contrôleur. Dart propose une POO moderne : constructeurs nommés, paramètres `required`, initializer lists, héritage simple, interfaces implicites et **mixins** pour la composition sans héritage multiple.",blocks:[
{t:"h3",h:"La classe Produit — complet"},
{t:"code",lang:"dart",label:"lib/modeles/produit.dart",code:"class Produit {\n  final String nom;\n  final int prix;\n  int _stock;                        // _ = privé (portée fichier)\n\n  Produit({required this.nom, required this.prix, int stock = 0})\n      : _stock = stock;              // initializer list\n\n  Produit.gratuit(String nom)         // constructeur nommé\n      : nom = nom, prix = 0, _stock = 999;\n\n  int get stock => _stock;           // getter\n  set stock(int v) { if (v < 0) throw ArgumentError(); _stock = v; }\n\n  String afficher() => \"$nom — $prix FCFA (stock: $_stock)\";\n  @override String toString() => \"Produit($nom)\";\n}\n\nfinal gari = Produit(nom: \"Gari Ijebu\", prix: 500, stock: 120);\nfinal promo = Produit.gratuit(\"Échantillon\");"},
{t:"h3",h:"Héritage, interfaces et mixins"},
{t:"code",lang:"dart",code:"// extends = héritage SIMPLE\nclass ProduitAlimentaire extends Produit {\n  final DateTime peremption;\n  ProduitAlimentaire({required super.nom, required super.prix,\n    required this.peremption, super.stock});\n}\n\n// implements = contrat (tout est interface implicite)\nclass ProduitExportable implements Comparable<ProduitExportable> {\n  final String code; final double poids;\n  const ProduitExportable({required this.code, required this.poids});\n  @override int compareTo(ProduitExportable a) => poids.compareTo(a.poids);\n}\n\n// mixin = classe SANS constructeur, pour composition via with\nmixin Logger {\n  void log(String msg) => print(\"[${DateTime.now()}] $msg\");\n}\nclass ProduitAvecLog extends Produit with Logger {\n  ProduitAvecLog({required super.nom, required super.prix}) {\n    log(\"Produit créé : $nom\");\n  }\n}\n// En Flutter : class MonEtat extends State<MonWidget> with SingleTickerProviderStateMixin"},
{t:"callout",kind:"tip",h:"Les DEUX seuls héritages que tu écriras 90 % du temps : `extends StatelessWidget` et `extends State<MonWidget>`. Le reste se fait par composition — comme en React."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« extends et implements, c'est pareil. »** `extends` = héritage de l'IMPLÉMENTATION. `implements` = contrat uniquement, tu dois tout réécrire.",
  "**« Un mixin, c'est une classe. »** Non — pas de constructeur, pas d'instanciation seule. Conçu pour `with`.",
  "**« Le _ rend privé à la classe. »** Non — portée FICHIER. Deux classes du même fichier voient leurs membres `_` mutuels."
]},
{t:"h3",h:"Lien avec les notions déjà vues"},
{t:"p",h:"La POO Dart est le socle de tous les widgets. La fiche Widgets montre comment `StatelessWidget` et `StatefulWidget` étendent ces classes."}
],errors:[
{title:"Oublier required sur un paramètre nommé obligatoire",lang:"dart",bad:"class P { String nom; P({this.nom}); }\n// P() → nom reste non initialisé",good:"class P { String nom; P({required this.nom}); }\n// P() → refuse de compiler",why:"Sans required, un paramètre nommé est optionnel. required force l'appelant."},
{title:"Confondre extends et implements",lang:"dart",bad:"class W extends A, B {} // Un seul extends autorisé",good:"class W extends A with Mixin1, Mixin2 {}",why:"Dart = héritage simple. Pour composer : with + mixins. implements = contrat uniquement."}
],related:["flutter-dart-bases","flutter-widgets","java-encapsulation"]}
]},
{id:"widgets",name:"Widgets",icon:"widgets",fiches:[
{id:"flutter-widgets",title:"Widgets : tout est widget",icon:"widgets",level:"Débutant",tagline:"StatelessWidget, StatefulWidget, arbre de widgets : pourquoi Flutter réinvente tout avec ce concept unificateur.",intro:"En Flutter, **tout est widget** — bouton, texte, marge, alignement, l'app entière. Un widget est un objet Dart **immuable** décrivant une partie de l'UI. Flutter ne modifie JAMAIS un widget — il en crée de nouveaux, compare l'ancien arbre au nouveau, et ne repeint que ce qui a changé. Modèle inspiré de React (`build()` = `render()`, `setState` = `useState`), avec une différence : l'arbre contrôle aussi mise en page, style, animations.",blocks:[
{t:"h3",h:"Le widget minimal"}, {t:"code",lang:"dart",label:"lib/main.dart",code:"import 'package:flutter/material.dart';\nvoid main() => runApp(const BoutiqueAwa());\n\nclass BoutiqueAwa extends StatelessWidget {\n  const BoutiqueAwa({super.key});\n  @override Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Boutique Awa',\n      debugShowCheckedModeBanner: false,\n      theme: ThemeData(colorSchemeSeed: const Color(0xFF0553B1), useMaterial3: true),\n      home: const PageAccueil(),\n    );\n  }\n}\nclass PageAccueil extends StatelessWidget {\n  const PageAccueil({super.key});\n  @override Widget build(BuildContext c) => Scaffold(\n    appBar: AppBar(title: const Text('Boutique d\\'Awa')),\n    body: const Center(child: Text('Bonjour le marché Dantokpa !',\n      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600))),\n  );\n}"},
{t:"h3",h:"StatelessWidget vs StatefulWidget"},
{t:"table",head:["","StatelessWidget","StatefulWidget"],rows:[
  ["Quand ?","Interface FIXE","Interface qui ÉVOLUE"],
  ["Exemples","Text, Icon, Padding, AppBar","TextField, Checkbox, Formulaire"],
  ["Classes","1 : Widget → build()","2 : Widget + State<Widget> → build()"],
  ["const ?","OUI, TOUJOURS","Le Widget peut être const, pas son State"]
]},
{t:"h3",h:"StatefulWidget : le compteur de gari"},
{t:"code",lang:"dart",label:"lib/compteur.dart",code:"class CompteurGari extends StatefulWidget {\n  final String vendeuse;\n  const CompteurGari({super.key, required this.vendeuse});\n  @override State<CompteurGari> createState() => _CompteurGariState();\n}\nclass _CompteurGariState extends State<CompteurGari> {\n  int _sacs = 0;\n  void _ajouter() => setState(() => _sacs++);\n  void _retirer() => setState(() { if (_sacs > 0) _sacs--; });\n  @override Widget build(BuildContext c) => Card(child: Padding(\n    padding: const EdgeInsets.all(16),\n    child: Column(mainAxisSize: MainAxisSize.min, children: [\n      Text(widget.vendeuse, style: Theme.of(c).textTheme.headlineSmall),\n      Text('$_sacs sacs', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),\n      Row(mainAxisAlignment: MainAxisAlignment.center, children: [\n        FilledButton.tonalIcon(icon: const Icon(Icons.remove), label: const Text('Retirer'), onPressed: _retirer),\n        const SizedBox(width: 12),\n        FilledButton.icon(icon: const Icon(Icons.add), label: const Text('Ajouter'), onPressed: _ajouter),\n      ]),\n    ]),\n  ));\n}"},
{t:"p",h:"Trois arbres parallèles : **Widgets** (ta description, immuable) → **Elements** (pont persistant) → **RenderObjects** (peinture effective). Tu ne manipules que le premier."},
{t:"callout",kind:"info",h:"Devs React : `StatelessWidget` = composant fonction, `StatefulWidget` + `State` = composant + `useState`. Différence majeure : le STYLE et la MISE EN PAGE sont AUSSI des widgets (Padding, Center, SizedBox…)."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« const devant un widget, c'est cosmétique. »** Non — instance CANONIQUE réutilisée. 1000 × `const Text(\"X\")` = 1 objet, pas 1000.",
  "**« Le State et le Widget, même classe ? »** Non — Widget immuable (recréé), State mutable (PERSISTE). C'est ce découplage qui rend le Hot Reload possible.",
  "**« build() est lent. »** Non — appelé au CHANGEMENT d'état, pas à chaque frame. Flutter diff l'ancien et le nouveau, ne repeint que ce qui a bougé."
]},
{t:"h3",h:"Les erreurs typiques"}, {t:"p",h:"Modifier une variable sans `setState` → écran figé. Mettre du texte brut hors d'un `Text()` → erreur de compilation. Oublier `super.key` dans les constructeurs."},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Modèle widgets = copier-coller conceptuel du modèle composants React : arbre déclaratif → diff → mise à jour minimale. 60 % de Flutter = React que tu connais déjà."}
],errors:[
{title:"Texte hors d'un widget Text",lang:"dart",bad:"Scaffold(body: Center(child: \"Bonjour\"))\n// Error: String can't be assigned to Widget",good:"Scaffold(body: Center(child: Text(\"Bonjour\")))",why:"Flutter exige que CHAQUE pixel soit décrit par un widget. Une String n'est pas un widget."},
{title:"Modifier une variable sans setState",lang:"dart",bad:"int _c = 0;\nvoid _inc() { _c++; }  // RIEN à l'écran",good:"void _inc() { setState(() => _c++); }  // rebuild ✓",why:"Flutter ne surveille pas tes variables. setState() est le SEUL signal de rebuild. Piège n°1 du premier StatefulWidget."}
],related:["flutter-dart-poo","flutter-layout","flutter-setstate","rx-composants-props"]}
]},
{id:"layout",name:"Mise en page",icon:"dashboard",fiches:[
{id:"flutter-layout",title:"Row, Column, Container, Expanded",icon:"space_dashboard",level:"Débutant",tagline:"La mise en page Flutter : Row pour l'horizontal, Column pour la verticale, Container pour la boîte, Expanded pour les proportions.",intro:"Pas de flexbox CSS — Flutter a son PROPRE système de layout en widgets. **Row** = horizontal, **Column** = vertical. **Container** = boîte à tout faire. **Expanded** = distribution de l'espace restant. Règle d'or : contrainte descend du parent, taille remonte de l'enfant (« constraints go down, sizes go up »).",blocks:[
{t:"h3",h:"Row et Column : les deux axes"},
{t:"code",lang:"dart",code:"class CarteProduit extends StatelessWidget {\n  const CarteProduit({super.key});\n  @override Widget build(BuildContext c) => Card(child: Padding(\n    padding: const EdgeInsets.all(12),\n    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [\n      Row(crossAxisAlignment: CrossAxisAlignment.center, children: [\n        Container(width: 64, height: 64,\n          decoration: BoxDecoration(color: Colors.amber.shade100, borderRadius: BorderRadius.circular(12)),\n          child: const Icon(Icons.grain, size: 32)),\n        const SizedBox(width: 12),\n        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [\n          Text('Gari Ijebu'), Text('500 FCFA / sac'),\n        ])),\n        FilledButton(onPressed: (){}, child: const Text('Acheter')),\n      ]),\n    ]),\n  ));\n}"},
{t:"h3",h:"mainAxisAlignment vs crossAxisAlignment"},
{t:"table",head:["Propriété","Row","Column"],rows:[
  ["mainAxisAlignment","Alignement HORIZONTAL","Alignement VERTICAL"],
  ["crossAxisAlignment","Alignement VERTICAL","Alignement HORIZONTAL"],
  ["spaceBetween","Un à gauche, un à droite","Un en haut, un en bas"],
  ["stretch","Prend HAUTEUR max","Prend LARGEUR max"]
]},
{t:"p",h:"Mémorisation : **mainAxis = l'axe du layout**. 80 % des bugs de layout viennent d'une confusion main/cross."},
{t:"h3",h:"Expanded vs Flexible"}, {t:"code",lang:"dart",code:"Row(children: [\n  Expanded(flex: 2, child: Container(color: Colors.blue)),  // 2/3\n  Expanded(flex: 1, child: Container(color: Colors.green)), // 1/3\n]);\n// Flexible = prend ce dont il a besoin sans forcer"},
{t:"h3",h:"Container"}, {t:"code",lang:"dart",code:"Container(\n  width: 200, height: 100,\n  margin: const EdgeInsets.all(16),\n  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),\n  decoration: BoxDecoration(\n    color: Colors.white, borderRadius: BorderRadius.circular(16),\n    border: Border.all(color: Colors.grey.shade300),\n    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 12)],\n  ),\n  child: Text('Du gari premium'),\n)"},
{t:"callout",kind:"warn",h:"Piège : `color` ET `decoration` ensemble → erreur. Mets la couleur DANS BoxDecoration."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Expanded = pourcentage. »** Prend une part de l'ESPACE RESTANT après les fixes. Pas 50% de l'écran total.",
  "**« SizedBox(width:12) ou margin ? »** Les deux fonctionnent. Préférer SizedBox dans Row/Column (tout est widget), margin pour l'extérieur d'un Container.",
  "**« MainAxisAlignment ne marche pas ! »** Vérifie `mainAxisSize: MainAxisSize.max` (défaut). Si `min` + parent infini = aucun effet."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Layout Flutter = Flexbox CSS. React Native : `Row` = `flexDirection:row`, `Column` = `flexDirection:column`, `Expanded(flex:n)` = `flex:n`."}
],errors:[
{title:"color ET decoration",lang:"dart",bad:"Container(color: Colors.red, decoration: BoxDecoration(…))\n// Cannot provide both",good:"Container(decoration: BoxDecoration(color: Colors.red, …))",why:"Container.color est un raccourci. Mets la couleur dans BoxDecoration."},
{title:"Oublier Expanded",lang:"dart",bad:"Row(children: [Text('Gari'), Text('Très long'*5)])  // overflow",good:"Row(children: [Text('Gari'), Expanded(child: Text('Très long'*5))])",why:"Sans Expanded, chaque enfant = taille naturelle. Expanded dit « donne-moi le reste »."}
],related:["flutter-widgets","flutter-theme","css-flexbox","rn-flexbox"]}
]},
{id:"etat",name:"Gestion d'état",icon:"account_tree",fiches:[
{id:"flutter-setstate",title:"setState et la gestion d'état locale",icon:"sync",level:"Intermédiaire",tagline:"Comment setState() fait le job pour un écran — et pourquoi il devient un problème à l'échelle de l'app.",intro:"`setState()` est LA méthode fondamentale : elle dit à Flutter « rebuild ce widget ». Sur un écran simple, parfait. Sur 15 écrans partageant un panier, `setState()` local devient ingérable — données dupliquées, écrans désynchronisés. Cette fiche montre la bonne pratique pour l'état LOCAL et quand passer à Provider.",blocks:[
{t:"h3",h:"Le pattern setState propre"}, {t:"code",lang:"dart",code:"class _PanierState extends State<EcranPanier> {\n  final _articles = <Map<String,dynamic>>[];\n  bool _chargement = false; String? _erreur;\n  Future<void> _charger() async {\n    setState(() => _chargement = true);\n    try { /* appel API… */\n      setState(() { _articles.addAll([…]); _chargement = false; });\n    } catch (e) { setState(() { _erreur = e.toString(); _chargement = false; }); }\n  }\n  @override void initState() { super.initState(); _charger(); }\n  @override Widget build(BuildContext c) {\n    if (_chargement) return const Center(child: CircularProgressIndicator());\n    if (_erreur != null) return Center(child: Text('Erreur : $_erreur'));\n    return ListView.builder(itemCount: _articles.length, …);\n  }\n}"},
{t:"h3",h:"Signaux d'alarme : quand setState ne suffit plus"},
{t:"ul",items:["Prop drilling sur 4+ widgets","Deux écrans reflètent le même état","setState sur widget démonté (crash)","Logique loading/error/data dupliquée","`build()` > 50 lignes"]},
{t:"h3",h:"Le remède"}, {t:"p",h:"Tant que l'état vit dans UN écran → `setState`. Dès qu'il traverse deux écrans → Provider (fiche suivante). Règle universelle : l'état descend, les événements remontent."},
{t:"callout",kind:"warn",h:"setState() dans build() = boucle infinie. JAMAIS. JAMAIS."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« setState est asynchrone. »** Non — SYNCHRONE. Le rebuild est PLANIFIÉ pour la prochaine frame.",
  "**« setState reconstruit tout. »** Non — seuls les widgets modifiés. Les `const` sont réutilisés.",
  "**« Plus de setState = plus réactif. »** Non — 10 setState synchrones = 1 rebuild. 10 dans des Future = 10 rebuilds."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"`setState` = `useState` React / réactivité Vue. Provider = Context + useReducer."}
],errors:[
{title:"setState sur widget démonté",lang:"dart",bad:"Future.delayed(d, () { setState(() => …); }); // crash « called after dispose() »",good:"Future.delayed(d, () { if (!mounted) return; setState(() => …); });",why:"Après dispose(), le State n'est plus attaché. `mounted` est le garde-fou."},
{title:"setState dans build()",lang:"dart",bad:"@override Widget build(c) { setState(() => _c++); return …; } // boucle ∞",good:"// PAS de setState dans build(). Utiliser initState(), callbacks, ou didChangeDependencies().",why:"build() est PURE. Les side-effects sont dans initState/callbacks/dispose."}
],related:["flutter-provider","flutter-widgets","flutter-lifecycle","rx-state"]},
{id:"flutter-provider",title:"Provider : l'état partagé",icon:"share",level:"Intermédiaire",tagline:"ChangeNotifier, Provider, Consumer : l'architecture recommandée par Google pour partager l'état à travers TOUS les écrans.",intro:"Provider est le gestionnaire d'état **recommandé par l'équipe Flutter**. `ChangeNotifier` détient les données, `Provider` l'injecte, `context.watch` lit et rebuild. Équivalent de Context + useReducer (React) ou Pinia (Vue).",blocks:[
{t:"h3",h:"Le ChangeNotifier"}, {t:"code",lang:"dart",label:"lib/modeles/panier.dart",code:"class Panier extends ChangeNotifier {\n  final _articles = <Map<String,dynamic>>[];\n  List<Map<String,dynamic>> get articles => List.unmodifiable(_articles);\n  int get nombre => _articles.length;\n  void ajouter(String nom, int prix, int qte) {\n    final i = _articles.indexWhere((a) => a['nom'] == nom);\n    if (i >= 0) _articles[i]['qte'] += qte;\n    else _articles.add({'nom':nom,'prix':prix,'qte':qte});\n    notifyListeners();  // ← le signal\n  }\n  void retirer(String nom) { _articles.removeWhere((a) => a['nom'] == nom); notifyListeners(); }\n}"},
{t:"h3",h:"Injection et lecture"}, {t:"code",lang:"dart",code:"// main.dart :\nvoid main() => runApp(\n  MultiProvider(providers: [ChangeNotifierProvider(create: (_) => Panier())],\n    child: const BoutiqueAwa()));\n\n// Dans un écran :\nfinal panier = context.watch<Panier>();   // ABONNEMENT → rebuild\n// context.read<Panier>()                  // LECTURE UNIQUE (callbacks seulement)"},
{t:"h3",h:"read vs watch"}, {t:"table",head:["","context.read<T>()","context.watch<T>()"],rows:[
  ["Quand ?","CALLBACKS (onPressed)","build()"],
  ["Rebuild ?","NON","OUI"],
  ["Règle","Pour les actions","Pour l'affichage"]
]},
{t:"callout",kind:"tip",h:"Jamais `context.read` dans `build()` — UI figée. Préfère `context.select()` à `watch()` pour les rebuilds fins."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Provider = grosses apps. »** Non — parfait dès que 2 widgets non frères partagent une donnée.",
  "**« notifyListeners rebuild tout. »** Non — seuls les widgets qui écoutent CE ChangeNotifier.",
  "**« Un seul ChangeNotifier pour tout. »** Non — sépare par domaine (Panier, Profil, Préférences)."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Provider = Context API + useReducer (React) = Pinia (Vue). Store réactif injecté, accessible partout sans prop drilling."}
],errors:[
{title:"context.read dans build()",lang:"dart",bad:"build(c) { final p = context.read<Panier>(); return Text('${p.nombre}'); } // Figé à 0",good:"build(c) { final p = context.watch<Panier>(); return Text('${p.nombre}'); } // Réactif ✓",why:"« watch pour voir, read pour agir ». read() ne crée pas d'abonnement."},
{title:"Provider hors arbre Navigator",lang:"dart",bad:"runApp(MaterialApp(home: Home()));\n// Poussé via Navigator → ProviderNotFoundException",good:"runApp(ChangeNotifierProvider(create: (_) => Panier(), child: MaterialApp(home: Home())));",why:"Provider doit être AU-DESSUS de MaterialApp pour que les écrans Navigator le voient."}
],related:["flutter-setstate","flutter-navigation","rx-contexte","flutter-setstate"]}
]},
{id:"navigation",name:"Navigation",icon:"explore",fiches:[
{id:"flutter-navigation",title:"Navigator : écrans, routes et passage de données",icon:"explore",level:"Intermédiaire",tagline:"Navigator.push, routes nommées, et le pattern « retour avec résultat » — la pile d'écrans mobile sans URL.",intro:"Navigator gère une **pile de routes**. `push()` ajoute un écran (glisse depuis la droite), `pop()` le retire. Même principe que React Navigation Stack. Particularité Flutter : Navigator est INTÉGRÉ, et chaque `push` peut renvoyer un résultat au `pop()` — idéal pour création/édition.",blocks:[
{t:"h3",h:"push et pop avec retour"}, {t:"code",lang:"dart",code:"// Depuis la liste :\nfinal modifie = await Navigator.push<bool>(context, MaterialPageRoute(builder: (_) => Detail(id: i)));\n// Depuis le détail (retour avec true si modifié) :\nNavigator.pop(context, true);"},
{t:"h3",h:"Routes nommées"}, {t:"code",lang:"dart",code:"MaterialApp(\n  onGenerateRoute: (settings) {\n    if (settings.name == '/detail') {\n      final id = settings.arguments as int;\n      return MaterialPageRoute(builder: (_) => Detail(id: id));\n    }\n    return MaterialPageRoute(builder: (_) => const Liste());\n  },\n);\nNavigator.pushNamed(context, '/detail', arguments: 42);"},
{t:"callout",kind:"tip",h:"pushReplacement / pushAndRemoveUntil pour login → home sans retour possible. `pop(context, resultat)` pour renvoyer une valeur au await."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Je passe mon Panier dans les arguments. »** Tu peux, mais ne DEVRAIS pas. La navigation = CLÉS. L'état partagé = Provider.",
  "**« pop() ferme juste. »** pop() peut renvoyer une valeur. C'est le pattern canonique pour les formulaires.",
  "**« pushNamed suffit. »** Non — `push` direct est indispensable pour paramètres complexes et animations custom."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Navigator Flutter = React Navigation Stack. API plus simple (intégré, pas de dépendance externe), concept de pile identique."}
],errors:[
{title:"push sans await",lang:"dart",bad:"Navigator.push(context, …); print('fait'); // s'exécute IMMÉDIATEMENT",good:"final r = await Navigator.push(context, …); if (r != null) print(r);",why:"Navigator.push renvoie un Future — sans await, le code continue tout de suite."},
{title:"Navigation sans MaterialApp",lang:"dart",bad:"void main() => runApp(Text('Bonjour')); Navigator.push(…); // « Navigator not found »",good:"void main() => runApp(MaterialApp(home: Accueil()));",why:"MaterialApp crée le Navigator racine automatiquement."}
],related:["flutter-provider","flutter-setstate","rn-navigation-setup"]}
]},
{id:"formulaires",name:"Formulaires & saisie",icon:"edit_note",fiches:[
{id:"flutter-formulaires",title:"TextField, Form et validation",icon:"edit_note",level:"Intermédiaire",tagline:"TextEditingController, Form + TextFormField, validation au submit : le pattern complet du formulaire Flutter.",intro:"Un formulaire Flutter : **TextEditingController** (lire/écrire), widget **Form** (coordonner validation), `GlobalKey<FormState>` (accès programmatique), `TextFormField` avec `validator`. Pattern canonique : `_formKey.currentState!.validate()` au submit.",blocks:[
{t:"h3",h:"Formulaire complet"}, {t:"code",lang:"dart",code:"class _AjoutState extends State<Ajout> {\n  final _formKey = GlobalKey<FormState>();\n  final _nomCtrl = TextEditingController();\n  @override void dispose() { _nomCtrl.dispose(); super.dispose(); }\n  void _soumettre() {\n    if (_formKey.currentState!.validate()) {\n      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${_nomCtrl.text} ajouté')));\n      Navigator.pop(context, true);\n    }\n  }\n  @override Widget build(BuildContext c) => Scaffold(appBar: AppBar(title: Text('Nouveau')),\n    body: Padding(padding: EdgeInsets.all(20), child: Form(key: _formKey, child: Column(children: [\n      TextFormField(controller: _nomCtrl,\n        decoration: InputDecoration(labelText: 'Nom', border: OutlineInputBorder()),\n        validator: (v) => (v == null || v.trim().isEmpty) ? 'Requis' : null),\n      SizedBox(height: 24),\n      FilledButton.icon(icon: Icon(Icons.add), label: Text('Ajouter'), onPressed: _soumettre),\n    ]))));\n}"},
{t:"p",h:"validator() renvoie null = OK, String = message d'erreur. validate() vérifie TOUS les champs du Form. `TextEditingController` nécessite dispose() — sinon fuite mémoire."},
{t:"callout",kind:"warn",h:"Toujours `controller.dispose()` dans `dispose()`. Jamais `controller.text = …` dans `build()` — boucle infinie."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« validator à chaque frappe. »** Non — seulement à l'appel de `validate()`. Pour temps réel : `onChanged` + logique séparée.",
  "**« Un contrôleur pour deux champs. »** Non — chaque TextFormField a besoin de son PROPRE contrôleur.",
  "**« Form = cosmétique. »** Non — `FormState` gère validation, sauvegarde (`onSaved`) et reset de TOUS les champs."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Pattern `Form + GlobalKey + TextFormField + validator` = `useForm + register + validate` (React Hook Form) = `v-model + rules` (Vue). Principe universel."}
],errors:[
{title:"TextEditingController non disposé",lang:"dart",bad:"class _State extends State<W> { final _c = TextEditingController(); /* pas de dispose() */ }",good:"@override void dispose() { _c.dispose(); super.dispose(); }",why:"TextEditingController enregistre des listeners. Sans dispose(), fuite mémoire."},
{title:"validator retourne false",lang:"dart",bad:"validator: (v) => (v?.isEmpty ?? true) ? 'Requis' : false;  // 'false' affiché comme erreur",good:"validator: (v) => (v?.isEmpty ?? true) ? 'Requis' : null;  // null = pas d'erreur",why:"validator : String = erreur, null = valide. false est une String → affichée."}
],related:["flutter-setstate","flutter-theme","flutter-formulaires"]}
]},
{id:"reseau",name:"Réseau & API",icon:"cloud_download",fiches:[
{id:"flutter-reseau",title:"http, FutureBuilder et async/await",icon:"cloud_download",level:"Intermédiaire",tagline:"Le package http, async/await, et FutureBuilder pour transformer une réponse API en UI réactive sans effort.",intro:"`http.get(Uri.parse(\"...\"))` → `Future<Response>`, `await` attend. **FutureBuilder** : widget qui prend un Future et rebuild automatiquement — plus besoin de `setState` pour gérer chargement/erreur/données.",blocks:[
{t:"h3",h:"Service API + FutureBuilder"}, {t:"code",lang:"dart",code:"// pubspec.yaml → http: ^1.2.0 → flutter pub get\nclass Api {\n  static Future<List<Map<String,dynamic>>> getProduits() async {\n    final r = await http.get(Uri.parse('https://api.exemple.bj/produits'));\n    if (r.statusCode == 200) return (jsonDecode(r.body) as List).cast<Map<String,dynamic>>();\n    throw Exception('HTTP ${r.statusCode}');\n  }\n}\n// FutureBuilder :\nFutureBuilder<List<Map<String,dynamic>>>(\n  future: Api.getProduits(),\n  builder: (ctx, snap) {\n    if (snap.connectionState == ConnectionState.waiting) return Center(child: CircularProgressIndicator());\n    if (snap.hasError) return Center(child: Text('Erreur : ${snap.error}'));\n    return ListView.builder(itemCount: snap.data!.length, …);\n  },\n)"},
{t:"h3",h:"Piège : Future dans build()"}, {t:"p",h:"NE PAS créer le Future dans `build()` si le parent rebuild. Solution : `initState()` stocke le Future (`late final _future = Api.getProduits()`). FutureBuilder dans un StatelessWidget = acceptable (pas de rebuilds spontanés)."},
{t:"callout",kind:"warn",h:"http.get() ne lève JAMAIS d'exception sur 404/500. Toujours vérifier `statusCode` manuellement. Piège n°1 des débutants réseau Flutter."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« 404 lève une exception. »** Non — vérifier statusCode systématiquement.",
  "**« jsonDecode renvoie un type fiable. »** Non — renvoie `dynamic`. Toujours valider avant caster.",
  "**« FutureBuilder appelle à chaque rebuild. »** Oui si Future recréé dans build(). Solution : Future stocké dans le State."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"FutureBuilder = React.Suspense + use(). `http.get` = `fetch()` de Dart. Même piège sur les codes d'erreur."}
],errors:[
{title:"Future recréé dans build() → appels API en boucle",lang:"dart",bad:"build(c) => FutureBuilder(future: Api.getProduits(), …);  // recréé à chaque rebuild",good:"class _State extends State<W> { late final _f = Api.getProduits(); build(c) => FutureBuilder(future: _f, …); }",why:"initState stocke le Future → exécuté UNE fois."},
{title:"statusCode non vérifié",lang:"dart",bad:"final r = await http.get(uri); final d = jsonDecode(r.body);  // 404 → crash",good:"if (r.statusCode != 200) throw Exception('Erreur ${r.statusCode}'); final d = jsonDecode(r.body);",why:"Le package http ne jette pas sur les erreurs HTTP — à toi de vérifier."}
],related:["flutter-setstate","flutter-provider","flutter-dart-bases","js-fetch"]}
]},
{id:"listes",name:"Listes",icon:"view_list",fiches:[
{id:"flutter-listview",title:"ListView, ListView.builder et GridView",icon:"view_list",level:"Intermédiaire",tagline:"ListView.builder pour la virtualisation, ListView pour 10 éléments, GridView pour les grilles.",intro:"**ListView**(`children:[]`) = tous les widgets d'un coup (≤20 éléments). **ListView.builder** = virtualisation, ne construit que les widgets visibles (>100 éléments). Règle : dès que ça défile, `ListView.builder`.",blocks:[
{t:"h3",h:"ListView.builder + GridView"}, {t:"code",lang:"dart",code:"ListView.builder(\n  itemCount: produits.length,\n  itemBuilder: (ctx, i) => ListTile(title: Text(produits[i].nom)),\n)\n// GridView :\nGridView.builder(\n  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, childAspectRatio: 0.75),\n  itemCount: produits.length,\n  itemBuilder: (ctx, i) => Card(child: Column(children: [\n    Icon(Icons.grain, size: 48),\n    Text(produits[i].nom),\n  ])),\n)"},
{t:"callout",kind:"tip",h:"`ListView.builder` est déjà virtualisé. `const` widgets enfants + pas de calculs lourds dans itemBuilder = perfs optimales."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« ListView sans builder, pareil. »** 2000 widgets construits d'un coup même si 8 visibles → mémoire explose.",
  "**« itemBuilder = rapide impératif. »** Appelé à chaque entrée dans la zone visible. Pas d'API, pas de calculs lourds."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"`ListView.builder` = `FlatList` Flutter. Virtualisation, `itemBuilder` = `renderItem`. Recyclage automatique."}
],errors:[
{title:"ListView dans Column sans Expanded",lang:"dart",bad:"Column(children: [Text('Titre'), ListView(children: […] ),])  // hauteur infinie",good:"Column(children: [Text('Titre'), Expanded(child: ListView(children: […]))])",why:"Column → hauteur illimitée. ListView a besoin d'une hauteur FINIE. Expanded résout."},
{title:"ListView.builder sans itemCount",lang:"dart",bad:"ListView.builder(itemBuilder: (ctx,i) => …)  // appelé à l'infini",good:"ListView.builder(itemCount: articles.length, itemBuilder: …)",why:"Sans itemCount, builder ne sait pas quand s'arrêter → index out of range."}
],related:["flutter-layout","flutter-reseau","rn-flatlist"]}
]},
{id:"theme",name:"Thème & style",icon:"palette",fiches:[
{id:"flutter-theme",title:"ThemeData, Material Design et Cupertino",icon:"palette",level:"Intermédiaire",tagline:"ThemeData pour unifier le look, Material pour Android, Cupertino pour iOS — et comment choisir.",intro:"Flutter embarque DEUX langages de design : **Material Design** (Google) et **Cupertino** (Apple). L'outil central : **ThemeData**, passé à `MaterialApp`, cascade couleurs, polices, formes à TOUS les widgets.",blocks:[
{t:"h3",h:"ThemeData complet Material 3"}, {t:"code",lang:"dart",code:"MaterialApp(\n  theme: ThemeData(\n    colorSchemeSeed: Color(0xFF0553B1), useMaterial3: true, fontFamily: 'Inter',\n    cardTheme: CardThemeData(elevation: 0, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),\n    inputDecorationTheme: InputDecorationTheme(border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true),\n  ),\n  darkTheme: ThemeData(colorSchemeSeed: Color(0xFF60CAF6), useMaterial3: true, brightness: Brightness.dark),\n  themeMode: ThemeMode.system,\n)"},
{t:"h3",h:"Material vs Cupertino"}, {t:"table",head:["","Material","Cupertino"],rows:[["Widget racine","MaterialApp","CupertinoApp"],["Barre navigation","AppBar","CupertinoNavigationBar"],["Quand ?","Android-first, multiplateforme","Expérience iOS pure"]]},
{t:"p",h:"Pour 80 % des apps, Material + bon ThemeData suffit. `colorSchemeSeed` génère automatiquement une palette Material 3 depuis UNE couleur."},
{t:"callout",kind:"info",h:"Devs web : `ThemeData` = `:root` CSS. `Theme.of(context)` = `var(--primary)`. Pas de cascade, pas de spécificité."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« colorSchemeSeed génère tout. »** 80 % oui — les 20 % restants (formes, typo) demandent des surcharges.",
  "**« CupertinoApp = MaterialApp look Apple. »** Non — DEUX navigateurs COMPLÈTEMENT séparés.",
  "**« ThemeData configuré une fois = oublié. »** Les widgets avec couleur directe ne suivront PAS un changement de thème."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Thème Flutter = Design Tokens CSS. Le site Easy Learn lui-même suit un design iOS premium — le genre de cohérence que ThemeData apporte."}
],errors:[
{title:"Theme.of(context) avant MaterialApp",lang:"dart",bad:"void main() { final c = Theme.of(context).colorScheme.primary; runApp(…); }  // crash",good:"runApp(MaterialApp(home: Builder(builder: (ctx) => Text('${Theme.of(ctx).colorScheme.primary}'))));",why:"Theme.of remonte l'arbre. Avant runApp(), pas d'arbre, pas de thème."},
{title:"Scaffold dans CupertinoPageScaffold",lang:"dart",bad:"CupertinoPageScaffold(navigationBar: …, child: Scaffold(body: …))  // doubles barres",good:"// Choisir UN écosystème par page : tout Material OU tout Cupertino",why:"Deux conteneurs de page avec leur propre navigation → conflits visuels."}
],related:["flutter-widgets","flutter-layout","flutter-theme"]}
]},
{id:"lifecycle",name:"Cycle de vie",icon:"replay",fiches:[
{id:"flutter-lifecycle",title:"initState, dispose et le cycle de vie",icon:"replay",level:"Intermédiaire",tagline:"Quand initialiser, quand nettoyer, quand réagir aux changements : le cycle de vie d'un StatefulWidget.",intro:"Cycle de vie d'un `State` Flutter : `initState()` (1×), `build()` (chaque rebuild), `didChangeDependencies()`, `didUpdateWidget()`, `dispose()` (1×). Comprendre ces 5 méthodes = 50 % de bugs de timing évités.",blocks:[
{t:"h3",h:"Le cycle chronologique"}, {t:"ol",items:[
  "**initState()** — UNE fois. Initialiser contrôleurs, lancer abonnements. PAS de `context.dependOnInheritedWidget`.",
  "**didChangeDependencies()** — après initState + quand InheritedWidget change (Theme, Provider).",
  "**build()** — après initState/didChangeDependencies + chaque setState(). PUR.",
  "**didUpdateWidget()** — quand le PARENT change les props. Réinitialiser état local.",
  "**dispose()** — UNE fois. Nettoyer contrôleurs, abonnements, streams. super.dispose() EN DERNIER."
]},
{t:"h3",h:"Pattern complet"}, {t:"code",lang:"dart",code:"class _RechercheState extends State<Recherche> {\n  final _ctrl = TextEditingController();\n  @override void initState() {\n    super.initState(); _ctrl.addListener(_onChange);\n    WidgetsBinding.instance.addPostFrameCallback((_) => _charger());\n  }\n  @override void didUpdateWidget(covariant Recherche old) {\n    super.didUpdateWidget(old); if (widget.cat != old.cat) _ctrl.clear();\n  }\n  @override void dispose() { _ctrl.dispose(); super.dispose(); }\n}"},
{t:"callout",kind:"tip",h:"Règle `late final` dans initState : `late final MaClasse _donnee;` initialisée dans initState. Dart garantit l'assignation avant lecture."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« initState = constructeur. »** Non — constructeur AVANT initState, sans contexte Flutter.",
  "**« didChangeDependencies à chaque rebuild. »** Non — seulement montage et changements d'InheritedWidget.",
  "**« dispose optionnel. »** Dès qu'il y a UN contrôleur/listener → dispose obligatoire."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Cycle Flutter = cycle React : `initState` = `componentDidMount` + `useEffect([],[])`, `dispose` = `componentWillUnmount` + cleanup."}
],errors:[
{title:"context dans initState",lang:"dart",bad:"initState() { final p = context.read<Panier>(); }  // crash subtil",good:"initState() { addPostFrameCallback((_) { final p = context.read<Panier>(); }); }",why:"Pendant initState, le 1er build n'est pas fait. addPostFrameCallback garantit le contexte complet."},
{title:"super.dispose() oublié",lang:"dart",bad:"dispose() { _ctrl.dispose(); /* pas de super.dispose() */ }",good:"dispose() { _ctrl.dispose(); super.dispose(); }",why:"State<T> nettoie ses ressources internes via dispose(). Sans super, fuite."}
],related:["flutter-setstate","flutter-widgets","flutter-formulaires","rx-effets"]}
]},
{id:"assets",name:"Assets & ressources",icon:"folder",fiches:[
{id:"flutter-assets",title:"Images, polices et pubspec.yaml",icon:"image",level:"Débutant",tagline:"Comment déclarer, organiser et utiliser images, icônes et polices personnalisées dans une app Flutter.",intro:"Flutter ne « découvre » pas automatiquement les fichiers — chaque image, police doit être **déclarée** dans `pubspec.yaml`. Ça permet de ne bundler QUE ce qui est utilisé.",blocks:[
{t:"h3",h:"Déclaration dans pubspec.yaml"}, {t:"code",lang:"yaml",code:"flutter:\n  assets:\n    - assets/images/logo.png\n    - assets/images/produits/    # tout le dossier\n  fonts:\n    - family: Inter\n      fonts:\n        - asset: assets/polices/Inter-Regular.ttf\n          weight: 400"},
{t:"h3",h:"Utilisation"}, {t:"code",lang:"dart",code:"Image.asset('assets/images/logo.png', width: 120, height: 60)\nImage.network('https://exemple.bj/gari.png', errorBuilder: (_,__,___) => Icon(Icons.broken_image))\nfinal jsonStr = await rootBundle.loadString('assets/data/produits.json');\n// Police globale : MaterialApp(theme: ThemeData(fontFamily: 'Inter'), …)\n// Police locale : TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.w700)"},
{t:"callout",kind:"info",h:"Jamais d'assets dans `lib/`. Après modification pubspec.yaml : Hot Restart obligatoire — le Hot Reload ne recharge pas les assets."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Images dans lib/. »** Non — assets hors lib/, déclarés dans pubspec.yaml.",
  "**« Dossier = tout inclus. »** Oui (le / final), mais chaque fichier augmente la taille APK.",
  "**« rootBundle.loadString dans build(). »** Non — c'est un Future. Utilise FutureBuilder ou initState."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"`pubspec.yaml` = `package.json` de Flutter. `AssetImage` = `require(\"./img.png\")` en React."}
],errors:[
{title:"Image non déclarée dans pubspec.yaml",lang:"dart",bad:"Image.asset('assets/logo.png') // « Unable to load asset »",good:"# pubspec.yaml : flutter: assets: - assets/logo.png  + Hot Restart",why:"Sans déclaration, le bundler n'inclut pas l'asset dans l'APK."},
{title:"Indentation YAML incorrecte",lang:"yaml",bad:"flutter:\nassets:           # ERREUR d'indentation\n  - assets/",good:"flutter:\n  assets:         # 2 espaces\n    - assets/",why:"YAML sensible à l'indentation. Un espace de décalage = parsing cassé."}
],related:["flutter-installation","flutter-theme"]}
]},
{id:"tests",name:"Tests",icon:"bug_report",fiches:[
{id:"flutter-tests",title:"Widget tests : introduction",icon:"bug_report",level:"Avancé",tagline:"Tester des widgets Flutter avec flutter_test : pumpWidget, find, expect — le test d'UI sans appareil.",intro:"**flutter_test** monte un widget en headless, simule des interactions (`tap`, `enterText`), vérifie le rendu (`find.text`, `expect`). En 5 lignes, tu sais si ton compteur s'incrémente.",blocks:[
{t:"h3",h:"Test minimal"}, {t:"code",lang:"dart",code:"testWidgets('compteur s\\'incrémente', (tester) async {\n  await tester.pumpWidget(const MaterialApp(home: CompteurGari(vendeuse: 'Awa')));\n  expect(find.text('0 sacs'), findsOneWidget);\n  await tester.tap(find.byIcon(Icons.add));\n  await tester.pump();  // attendre rebuild\n  expect(find.text('1 sacs'), findsOneWidget);\n});"},
{t:"h3",h:"Les trois familles"}, {t:"table",head:["Type","Ce qu'il teste","Vitesse"],rows:[["Unit","Fonctions pures, ChangeNotifiers","ms"],["Widget","Widget isolé, interactions, rendu","secondes"],["Integration","App complète sur appareil","minutes"]]},
{t:"p",h:"Widget test = sweet spot : UI + logique, sans lenteur. Règle : widget test pour écrans critiques, unit test pour logique métier."},
{t:"callout",kind:"tip",h:"`pumpAndSettle()` après animations/FutureBuilder — `pump()` = 1 frame, `pumpAndSettle()` = attend TOUT."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« Widget tests = bonus. »** Non — 5 min pour attraper les régressions critiques.",
  "**« tester.tap ne marche pas. »** Widget dans un ListView ? `scrollUntilVisible` d'abord.",
  "**« pumpWidget recrée tout. »** Oui — ardoise propre entre les tests. Factorise le setup."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"`flutter_test` = React Testing Library. Pattern `pumpWidget → find → tap → pump → expect` universel."}
],errors:[
{title:"pump() vs pumpAndSettle()",lang:"dart",bad:"tester.tap(find.text('Charger')); tester.pump(); // FutureBuilder pas résolu → expect échoue",good:"tester.tap(find.text('Charger')); tester.pumpAndSettle(); // attend tout → OK",why:"pump = 1 frame. pumpAndSettle = boucle jusqu'à plus de rebuilds/animations."},
{title:"Oublier MaterialApp autour du widget testé",lang:"dart",bad:"tester.pumpWidget(CompteurGari(…)); // No MediaQuery widget found",good:"tester.pumpWidget(MaterialApp(home: CompteurGari(…)));",why:"Beaucoup de widgets dépendent de MaterialApp pour Theme, MediaQuery, Navigator."}
],related:["flutter-widgets","flutter-setstate","flutter-lifecycle"]}
]},
{id:"build",name:"Build & déploiement",icon:"publish",fiches:[
{id:"flutter-build",title:"Générer un APK Android et notions de build iOS",icon:"publish",level:"Avancé",tagline:"flutter build apk --release, signature, versionnement : la dernière ligne droite avant le Play Store.",intro:"`flutter run` = développement. `flutter build` = publication. Flutter compile Dart en code natif ARM/x86, le bundle avec le moteur, et produit un binaire signé : **APK/AAB** (Android) ou **IPA** (iOS). Cette fiche couvre le build Android et survole iOS.",blocks:[
{t:"h3",h:"Build Android"}, {t:"code",lang:"bash",code:"flutter clean && flutter pub get\nflutter build apk --release      # APK test\nflutter build appbundle --release # AAB Play Store (recommandé)\n\n# Signature OBLIGATOIRE :\nkeytool -genkey -v -keystore ~/awa-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias awa\n# + configurer signingConfigs.release dans android/app/build.gradle"},
{t:"h3",h:"Versionnement"}, {t:"code",lang:"yaml",code:"version: 1.0.0+1\n# 1.0.0 = version_name (visible)\n# +1    = version_code (incrémental obligatoire Play Store)"},
{t:"h3",h:"Checklist avant Play Store"}, {t:"ol",items:[
  "label dans AndroidManifest.xml = nom sous l'icône",
  "Remplacer ic_launcher.png (toutes densités) par ta vraie icône",
  "debugShowCheckedModeBanner: false",
  "Tester SUR APPAREIL RÉEL en release : flutter run --release",
  "Signature production — JAMAIS keystore debug",
  "Build l'App Bundle (AAB), pas l'APK"
]},
{t:"h3",h:"iOS (survol)"}, {t:"ul",items:["**Mac obligatoire** pour Xcode.","**Compte Apple Developer** (99 USD/an).","**Codemagic** : CI cloud pour build/sign iOS sans Mac local."]},
{t:"callout",kind:"warn",h:"NE JAMAIS perdre le keystore de production ! Sans lui, impossible de METTRE À JOUR l'app sur le Play Store. Sauvegarde sur 2 supports physiques."},
{t:"h3",h:"Ce que les débutants comprennent mal"},
{t:"ul",items:[
  "**« flutter build = flutter run en plus lent. »** Non — debug (JIT) vs release (AOT optimisé). Perfs, taille, erreurs : tout diffère.",
  "**« version_code cosmétique. »** Non — STRICTEMENT CROISSANT exigé par Play Store.",
  "**« App Flutter = 50 Mo min. »** Non — ~15 Mo en release APK. Avec assets lourds, ça monte."
]},
{t:"h3",h:"Lien avec les notions déjà vues"}, {t:"p",h:"Build Flutter = EAS Build Expo (React Native) : compilation, signature, soumission stores. Flutter = plus de contrôle local ; Expo = plus de cloud."}
],errors:[
{title:"Build release avec debug keystore",lang:"bash",bad:"flutter build apk --release\n# Pas de config signature → keystore debug\n# Play Store rejette : « signed with a debug certificate »",good:"# 1) Créer keystore prod\n# 2) Config signingConfigs.release dans build.gradle\n# 3) flutter build appbundle --release ✓",why:"Debug keystore générique et public — stores refusent. Signature = identité de l'app."},
{title:"version_code non incrémenté",lang:"bash",bad:"version: 1.0.0+1 → upload OK\nversion: 1.0.1+1 → Play Store : « Version code 1 already used »",good:"version: 1.0.1+2  # bump manuel OBLIGATOIRE",why:"Play Store identifie chaque artefact par version_code. Doit être strictement croissant."}
],related:["flutter-installation","flutter-theme","flutter-assets","rn-build"]}
]}
]};