/* ============================================================
   exo-java.js — Exercices pratiques
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.java = {
  module: 'java',
  list: [
    {
          "id": "exo-java-produit-encapsulation",
          "level": "fonda",
          "title": "Une classe Produit impeccable",
          "icon": "lock",
          "free": true,
          "minutes": 35,
          "kind": "checklist",
          "setup": "Installe un JDK 17+ (`java -version`). Dossier `java-boutique`, fichier `Produit.java` et `BoutiqueMain.java`. Compile tout : `javac *.java` puis `java BoutiqueMain`.",
          "context": "La quincaillerie d'Ahouanto passe ses fiches produits sur ordinateur. En Java, une fiche, c'est une classe — et la première chose que la classes t'enseigne est de dire NON par défaut : champs privés, invariants gardés par le constructeur et les méthodes. L'encapsulation n'est pas une cérémonie, c'est le garde du corps de ton stock.",
          "statement": "Tu vas écrire une classe Produit dont aucun état invalide ne peut exister.\n\n1. `public class Produit` avec trois champs **private final** : `reference` (String), `nom` (String), `prix` (int, FCFA) ; un champ `private int stock` (lui, mutable par méthodes). Explique en commentaire pourquoi final partout où c'est possible.\n2. **Constructeur** `Produit(String reference, String nom, int prix, int stock)` : valide TOUT — reference non nulle et non vide, prix > 0, stock >= 0 — et lève `IllegalArgumentException` avec message explicite sinon. Un objet invalide ne doit pas EXISTER une milliseconde.<br />\n3. Getters simples pour les quatre champs ; **aucun setter** pour reference/nom/prix (immutables). Le stock ne bouge que via `void approvisionner(int quantite)` (refuse ≤ 0) et `void vendre(int quantite)` (refuse ≤ 0, refuse si stock insuffisant avec `IllegalStateException` citant le stock restant).\n4. Méthode métier : `int valeurStock()` et `String toString()` propre — « Capitaine (ref. P-01) — 4 500 F/kg, 12 en stock » avec getNom/getPrix formatés. toString correcte = toString dans le debogueur gratuit.\n5. Le `BoutiqueMain` : crée 4 produits, affiche-les via System.out.println(produit) (toString automatique !), vends, approvisionne, puis tente les créations invalides dans des try/catch qui affichent les messages — la démonstration que rien ne passe.\n6. Question d'entretien bonus (réponse en commentaire de fin de fichier) : pourquoi NE PAS rendre le champ stock public même avec un getter ? Que pourrait faire un code extérieur catastrophique ?\n\nCe qui est évalué : final partout possible, validation dès la naissance, la distinction IllegalArgument/IllegalStateException, toString soigné. C'est la classe la plus banale du monde — et 90 % des bases de code la ratent sur les points ici exigés.",
          "constraints": [
                "Champs private ; reference/nom/prix également final ; aucun setter sur ces trois champs.",
                "Toute création ou mutation invalide lève une exception avec message parlant — aucun état incohérent ne survit.",
                "vendre utilise IllegalStateException (état) ; constructeur/approvisionner IllegalArgumentException (argument).",
                "toString réécrit proprement (@Override) ; println(produit) l'utilise sans y penser.",
                "Compilation sans avertissement avec javac -Xlint."
          ],
          "checklist": [
                "javac -Xlint *.java sans avertissement ; java BoutiqueMain affiche le catalogue.",
                "new Produit(\"\", \"X\", 100, 0) est refusé avec un message qui nomme la référence vide.",
                "new Produit(\"P-9\", \"Clous\", 0, 5) refusé : prix > 0 exigé dès la naissance.",
                "vendre(99) sur stock 3 refuse et le message cite le stock RESTANT (3).",
                "Après vente et réassort, stock et valeurStock() sont exacts (recalculés à la main).",
                "println(produit) affiche le toString lisible sans appeler toString() explicitement.",
                "La question d'entretien (stock public) est répondue en commentaire : l'extérieur pourrait stock = -50 sans que personne ne valide.",
                "reference et nom sont impossibles à changer après création (aucun point d'entrée)."
          ],
          "hints": [
                "Le constructeur-garde : `if (reference == null || reference.isBlank()) throw new IllegalArgumentException(\"référence vide\"); if (prix <= 0) throw new IllegalArgumentException(\"prix doit être > 0 : \" + prix);` — on assigne APRÈS les validations, jamais avant.",
                "vendre distingué : `if (quantite <= 0) throw new IllegalArgumentException(\"quantité positive requise\"); if (quantite > stock) throw new IllegalStateException(\"stock insuffisant (reste \" + stock + \")\"); stock -= quantite;` — argument pourri ≠ état insuffisant : deux exceptions pour deux lectures.",
                "final pédagogique : reference, nom, prix ne changeront JAMAIS (on change un prix en créant un nouveau produit ou via une méthode dédiée qui logue). final matérialise « a été décidé à la naissance » — le lecteur n'a plus à se poser la question."
          ],
          "solution": {
                "lang": "java",
                "label": "Produit.java — solution commentée",
                "code": "public class Produit {\n    // final partout où c'est possible : la naissance scelle, le lecteur se repose.\n    private final String reference;\n    private final String nom;\n    private final int prix;      // FCFA — un int, jamais un float pour l'argent\n    private int stock;           // mutable, mais UNIQUEMENT via les méthodes\n\n    public Produit(String reference, String nom, int prix, int stock) {\n        if (reference == null || reference.isBlank())\n            throw new IllegalArgumentException(\"référence obligatoire\");\n        if (nom == null || nom.isBlank())\n            throw new IllegalArgumentException(\"nom obligatoire\");\n        if (prix <= 0)\n            throw new IllegalArgumentException(\"prix doit être > 0 : \" + prix);\n        if (stock < 0)\n            throw new IllegalArgumentException(\"stock négatif impossible : \" + stock);\n        this.reference = reference;\n        this.nom = nom;\n        this.prix = prix;\n        this.stock = stock;\n    }\n\n    public String reference() { return reference; }\n    public String nom() { return nom; }\n    public int prix() { return prix; }\n    public int stock() { return stock; }\n    // pas de setters : les champs final n'ont pas vocation à bouger\n\n    public void approvisionner(int quantite) {\n        if (quantite <= 0) throw new IllegalArgumentException(\"appro positive requise\");\n        stock += quantite;\n    }\n\n    public void vendre(int quantite) {\n        if (quantite <= 0) throw new IllegalArgumentException(\"quantité positive requise\");\n        if (quantite > stock)\n            throw new IllegalStateException(\"stock insuffisant (reste \" + stock + \")\");\n        stock -= quantite;\n    }\n\n    public int valeurStock() { return prix * stock; }\n\n    @Override\n    public String toString() {\n        return String.format(\"%s (ref. %s) — %,d F/kg, %d en stock\",\n                             nom, reference, prix, stock);\n        // %,d ajoute les séparateurs de milliers tout seul\n    }\n}\n",
                "explain": "L'encapsulation bien faite est une PROMESSE : « quel que soit le chemin, cet objet reste cohérent ». Elle tient à trois murs. Mur 1 : private + final — le champ n'est ni visible ni réassignable ; celui qui lit le code n'a pas à scanner « qui touche prix ailleurs ? ». Mur 2 : le constructeur valide avant d'assigner — impossible d'obtenir un Produit au prix négatif, même par accident. Mur 3 : les mutations passent par des méthodes qui vérifient, et distinguent IllegalArgumentException (ton appel est faux) de IllegalStateException (l'objet refuse maintenant) — cette distinction épargne des heures de débogage parce qu'elle localise la faute. Observe enfin le prix en int : les doubles arrondissent 0.1 + 0.2 à autre chose que 0.3 — en monétaire, on compte en unités indivisibles (ici le franc), et on ne déroge à cette règle qu'en connaissance de cause."
          },
          "criteria": [
                "Aucun état invalide possible : validations naissance + mutations, exceptions typées.",
                "final et immuabilité partiels correctement appliqués ; toString utile.",
                "Question d'entretien répondue — l'étudiant SAISIT l'intérêt de l'encapsulation."
          ],
          "variants": [
                "Ajoute `appliquerRemise(int pourcentage)` qui crée un nouveau Produit remisé (prix final, jamais modifié).",
                "Implémente equals/hashCode sur reference (deux produits même ref = même produit logique).",
                "Défi : transforme Produit en `record` si tous les champs étaient final — note ce que le record t'oblige à changer (stock mutable en moins, vente retourne un nouveau record)."
          ],
          "related": [
                "java-encapsulation",
                "java-string-immutable",
                "java-stringbuilder",
                "java-primitifs-wrappers"
          ]
    },
    {
          "id": "exo-java-heritage",
          "level": "fonda",
          "title": "Héritage utile : Article, ArticleFrais, ArticleSolde",
          "icon": "account_tree",
          "minutes": 40,
          "kind": "checklist",
          "setup": "Reprends le dossier `java-boutique`. Nouveaux fichiers : `Article.java`, `ArticleFrais.java`, `ArticleSolde.java`, `MarcheMain.java`. `javac *.java && java MarcheMain`.",
          "context": "Le marché de Dantokpa mélange tout : poissons (à vendre aujourd'hui ou jamais), savons (se conservent des mois), et fins de série à solder. Trois comportements de prix et d'étiquette, UNE liste unique à la caisse. L'héritage, quand il est justifié, c'est exactement ça — mais tu vas aussi apprendre où il s'arrête.",
          "statement": "Tu vas modéliser une hiérarchie d'articles et le polymorphisme qui la rend utile.\n\n1. Classe de base `public class Article` : champs private final nom, prixHT (int) ; méthodes `public int prixVente()` qui retourne prixHT (par défaut) et `public String etiquette()` formatée. Constructeur validé comme à l'exercice précédent.\n2. `public class ArticleFrais extends Article` : ajoute `int joursConservation` (>0) ; surcharge `etiquette()` avec « FRAIS (Jj) » ; surcharge `prixVente()` : remise de 20 % si joursConservation ≤ 1 (le poisson du jour se brade, calcul en int, arrondi justifié en commentaire).\n3. `public class ArticleSolde extends Article` : ajoute `int remisePourcent` (1 à 90, validé) ; `prixVente()` applique la remise ; `etiquette()` affiche « -30 % » barré (virtuellement : affiche ancien prix et nouveau).\n4. Le `MarcheMain` : une `List<Article>` de 6 articles mélangés (dont 2 frais, 2 soldés) ; **boucle polymorphe** : `for (Article a : articles)` qui imprime etiquette() et prixVente() — constate en commentaire que le type STATIQUE est Article mais que les méthodes EXÉCUTÉES sont celles du type DYNAMIQUE (réécris-le toi-même, c'est LA leçon).\n5. Calcule le total caisse de la liste par somme des prixVente() — sans aucun instanceof/ cast (interdit, ce serait trahir le polymorphisme).\n6. Réflexion guidée (commentaire de fin de fichier) : pourquoi ne PAS mettre joursConservation sur Article avec 0 par défaut ? Pourquoi l'héritage est choisi ici et pas une composition (Stratégie) — quelle frontière aurait justifié la composition ?\n\nCe qui est évalué : extends propre (super(...) en première ligne), @Override partout où on redéfinit, le dispatch dynamique par la boucle (et son vocabulaire : type statique vs dynamique), et la lucidité sur les limites de l'héritage.",
          "constraints": [
                "Champs privés dans Article avec getters protégés OU protected assumés et commentés — accessible aux classes filles, pas au monde.",
                "Tout extends initialise la base via super(...) comme PREMIÈRE instruction du constructeur.",
                "@Override sur toutes les redéfinitions — le compilateur vérifie ta signature.",
                "La boucle cliente n'utilise JAMAIS instanceof ni de cast vers les sous-classes.",
                "Les nouvelles classes valident leurs paramètres propres (jours > 0, remise 1-90)."
          ],
          "checklist": [
                "Trois classes compilent ensemble ; le main instancie les trois types dans une seule List<Article>.",
                "ArticleFrais(5000, 1 jour) vend 4000 (-20 %) ; à 2 jours, vend 5000 — la règle se vérifie.",
                "ArticleSolde à 30 % vend 70 % du prix, étiquette affiche l'avant/après.",
                "La boucle totalise correctement SANS aucune branche de type (grep instanceof : 0 occurrence).",
                "Retirer @Override et mal orthographier etiquette provoque une ERREUR de compilation avertissant immédiatement (remettre ensuite).",
                "Constructeurs : une validation dans la fille remonte une IllegalArgumentException propre.",
                "super(...) est bien LA première ligne de chaque constructeur fils (testée en la déplaçant : erreur).",
                "La réflexion finale distingue clairement quand l'héritage cède devant la composition."
          ],
          "hints": [
                "Le squelette fille : `public class ArticleFrais extends Article { private final int joursConservation; public ArticleFrais(String nom, int prixHT, int jours) { super(nom, prixHT); if (jours <= 0) throw new IllegalArgumentException(); this.joursConservation = jours; } }` — super d'abord, validations ensuite, assignation enfin.",
                "La règle de prix : `@Override public int prixVente() { int base = prixHT(); return joursConservation <= 1 ? (int)Math.round(base * 0.8) : base; }` — utilise le getter de la classe mère (protected ou package), et justifie l'arrondi en commentaire.",
                "Polymorphisme en une phrase à retenir : le type de la VARIABLE choisit ce qu'on PEUT appeler (statique, compile), le type de l'OBJET choisit ce qui S'EXÉCUTE (dynamique, runtime). Écris-le en commentaire au-dessus de la boucle for."
          ],
          "solution": {
                "lang": "java",
                "label": "Article + ArticleFrais — solution commentée",
                "code": "public class Article {\n    private final String nom;\n    private final int prixHT;\n\n    public Article(String nom, int prixHT) {\n        if (nom == null || nom.isBlank()) throw new IllegalArgumentException(\"nom requis\");\n        if (prixHT <= 0) throw new IllegalArgumentException(\"prix > 0 requis\");\n        this.nom = nom;\n        this.prixHT = prixHT;\n    }\n\n    public String nom() { return nom; }\n    public int prixHT() { return prixHT; }   // visible des filles, inchangé\n\n    public int prixVente() { return prixHT; }   // comportement par défaut\n\n    public String etiquette() {\n        return String.format(\"%s — %,d F\", nom, prixVente());\n    }\n}\n\n// ========== ArticleFrais.java ==========\npublic class ArticleFrais extends Article {\n    private final int joursConservation;\n\n    public ArticleFrais(String nom, int prixHT, int joursConservation) {\n        super(nom, prixHT);                  // TOUJOURS en premier\n        if (joursConservation <= 0)\n            throw new IllegalArgumentException(\"durée de conservation > 0 requise\");\n        this.joursConservation = joursConservation;\n    }\n\n    @Override\n    public int prixVente() {\n        int base = prixHT();\n        // Braderie des derniers jours : -20 %, arrondi au franc le plus proche.\n        return joursConservation <= 1 ? (int) Math.round(base * 0.8) : base;\n    }\n\n    @Override\n    public String etiquette() {\n        return String.format(\"%s — %,d F (FRAIS, J-%d)\", nom(), prixVente(), joursConservation);\n    }\n}\n\n// ========== Boucle cliente (MarcheMain) ==========\n// Le type STATIQUE (Article) dit ce qu'on PEUT appeler ;\n// le type DYNAMIQUE (l'objet réel) dit ce qui S'EXÉCUTE.\n//   for (Article a : articles) {\n//       System.out.println(a.etiquette());   // chaque classe répond pour elle-même\n//       total += a.prixVente();\n//   }\n// Aucun instanceof : ajouter ArticleDemain n'exige AUCUNE retouche de la boucle.\n",
                "explain": "L'héritage n'est légitime que quand le « est-un » est vrai dans les DEUX sens de lecture : un poisson EST un article qu'on peut vendre et étiqueter, partout où un article est attendu. Ce qui rend l'exercice fort, c'est le bénéfice côté client : la boucle de caisse ignore les catégories — demain, ArticlePerissable ou ArticleImporté entrent dans la liste sans modifier une ligne de MarcheMain. C'est le principe ouvert/fermé en action. Et @Override n'est pas du vernis : il transforme une faute de frappe en erreur de compilation au lieu d'une méthode morte jamais appelée — le bug silencieux le plus classique du Java débutant. Retiens aussi pourquoi les champs restent PRIVATE avec getters : protected aurait été une tentation ; mais tout champ protected est un contrat publié à toutes les sous-classes futures — garde-le rare, documente-le."
          },
          "criteria": [
                "Hiérarchie propre (super, @Override, validations) et bouche polymorphe sans instanceof.",
                "Règles de prix vérifiées chiffrées à l'appui ; total caisse exact.",
                "Réflexion héritage vs composition menée lucidement."
          ],
          "variants": [
                "Ajoute `ArticleService` (vendeur paramétré par nom + commission 5 % encaissée : prixVente majoré).",
                "Implémente `Comparable<Article>` sur prixVente croissant et Collections.sort la liste.",
                "Défi : remplace l'héritage par une interface `Tarification` en composition, compare les deux solutions en commentaire."
          ],
          "related": [
                "java-heritage",
                "java-polymorphisme",
                "java-encapsulation",
                "java-abstraction",
                "java-interfaces"
          ]
    },
    {
          "id": "exo-java-collections-tontine",
          "level": "inter",
          "title": "La tontine en Map et streams",
          "icon": "savings",
          "minutes": 45,
          "kind": "checklist",
          "setup": "Dossier `java-tontine` : `Membre.java`, `Versement.java`, `Tontine.java`, `TontineMain.java`. JDK 17+. `javac *.java && java TontineMain`.",
          "context": "Awa Mensah tient sa tontine de quartier Ladji — 10 membres, 5 000 F par semaine chacune. Cahier → tableur → enfin du propre : List pour la chronologie, Map pour les totaux par membre, streams pour les questions de la présidente (« qui a cotisé plus de 60 000 ? », « total du mois ? »). L'exercice où les collections Java cessent d'être du chapitre et deviennent du service rendu.",
          "statement": "Tu vas modéliser la tontine à base de List, Map et de tout le vocabulaire Stream.\n\n1. `record Membre(int id, String nom, String telephone)` et `record Versement(int membreId, int montant, LocalDate date, int semaine)` — deux RECORDS (equals/hashCode/toString offerts), commentés comme tels.\n2. Classe `Tontine` : `List<Membre> membres`, `List<Versement> versements` (ArrayList), et méthodes : `inscrire(Membre)` (téléphone unique : vérifie par stream noneMatch), `verser(Versement)` (membre connu, montant > 0, semaine positive — validations métier).\n3. `Map<Integer, Integer> totalParMembre()` construit par stream : `versements.stream().collect(Collectors.groupingBy(Versement::membreId, Collectors.summingInt(Versement::montant)))` — UNE ligne, explique-la mot à mot en commentaire.\n4. Les questions métier en streams déclaratifs : `List<Membre> solvables(int seuil)` (filtrer les membres dont le total ≥ seuil) ; `int totalSemaine(int semaine)` (filter + mapToInt + sum) ; `Optional<Membre> meilleurCotisant()` (max avec Comparator.comparing sur la map) ; `Map<Integer, Long> presence()` : versements par semaine (`groupingBy` + `counting`).\n5. `afficherTableau()` : aligne nom / cotisé / nb versements / statut « À jour » ou « En retard » (un membre est en retard si versements < semaines écoulées passées en paramètre).\n6. Démontre la différence List/Map en commentaire de fin : pourquoi le total par membre est une Map et pas une List ? Que coûterait une List de couples pour 300 membres recherchés souvent ?\n\nCe qui est évalué : records naturels, le pipeline filter/map/collect sans une boucle explicite, groupingBy/summingInt (LE collecteur roi), Optional utilisé honnêtement, et le choix LIST ou MAP justifié. Les streams ne sont pas du snobisme : une ligne lisible remplace huit lignes mutables.",
          "constraints": [
                "Membre et Versement sont des records (immutables par construction).",
                "Toutes les agrégations/statistiques passent par des streams — zéro boucle for sur ces calculs.",
                "La validation métier (téléphone unique, montant positif) vit dans les méthodes de Tontine.",
                "Optional<Membre> pour le meilleur : utilise ifPresent ou orElse, jamais get() à l'aveugle.",
                "Collection de détail ArrayList, la Map sortie par les méthodes (pas de champ Map qui doublerait la source)."
          ],
          "checklist": [
                "Les records affichent automatiquement un toString utile (println sur un Versement).",
                "Deux membres avec le même téléphone → le second refusé par la validation.",
                "totalParMembre() exact sur des chiffres vérifiés à la main (sommes par personne).",
                "solvables(60000) liste exactement les bons membres.",
                "totalSemaine(12) donne le collecte de la semaine 12 uniquement.",
                "meilleurCotisant() vide quand aucun versement (Optional.empty géré).",
                "Le tableau d'affichage est aligné et le statut retard s'avère juste.",
                "Toutes les méthodes d'analyse se lisent en français : filter/map/collect dans l'ordre logique."
          ],
          "hints": [
                "groupingBy : `Collectors.groupingBy(Versement::membreId, Collectors.summingInt(Versement::montant))` se lit « groupe par l'id membre, et pour chaque groupe, somme les montants en int » — le premier argument choisit la clé, le deuxième dit comment agréger chaque paquet.",
                "Le meilleur : `totalParMembre().entrySet().stream().max(Map.Entry.comparingByValue()).flatMap(e -> membres.stream().filter(m -> m.id() == e.getKey()).findFirst())` — max sur les entrées, puis re-résolution du Membre. Si la Map est vide, max rend Optional.empty : la chaîne reste propre.",
                "Les retards : `long versements = versements.stream().filter(v -> v.membreId() == m.id()).count(); boolean aJour = versements >= semainesEcoulees;` — count() d'un stream filtré : la bonne réponse aux « combien parmi »."
          ],
          "solution": {
                "lang": "java",
                "label": "Tontine.java — solution commentée (extraits)",
                "code": "import java.time.LocalDate;\nimport java.util.*;\nimport java.util.stream.Collectors;\n\n// records : equals/hashCode/toString OFFERTS — données transportées, rien d'autre.\n// record Membre(int id, String nom, String telephone) {}\n// record Versement(int membreId, int montant, LocalDate date, int semaine) {}\n\npublic class Tontine {\n    private final List<Membre> membres = new ArrayList<>();\n    private final List<Versement> versements = new ArrayList<>();\n\n    public void inscrire(Membre m) {\n        boolean existe = membres.stream().anyMatch(x -> x.telephone().equals(m.telephone()));\n        if (existe) throw new IllegalArgumentException(\"téléphone déjà inscrit : \" + m.telephone());\n        membres.add(m);\n    }\n\n    public void verser(Versement v) {\n        if (v.montant() <= 0) throw new IllegalArgumentException(\"montant positif requis\");\n        if (v.semaine() <= 0) throw new IllegalArgumentException(\"semaine positive requise\");\n        boolean connu = membres.stream().anyMatch(m -> m.id() == v.membreId());\n        if (!connu) throw new IllegalArgumentException(\"membre inconnu : \" + v.membreId());\n        versements.add(v);\n    }\n\n    // LA ligne reine : « groupe par id membre ; dans chaque groupe, somme des montants ».\n    public Map<Integer, Integer> totalParMembre() {\n        return versements.stream().collect(Collectors.groupingBy(\n                Versement::membreId, Collectors.summingInt(Versement::montant)));\n    }\n\n    public List<Membre> solvables(int seuil) {\n        Map<Integer, Integer> totaux = totalParMembre();\n        return membres.stream()\n                .filter(m -> totaux.getOrDefault(m.id(), 0) >= seuil)   // pas de versement → 0\n                .toList();\n    }\n\n    public int totalSemaine(int semaine) {\n        return versements.stream()\n                .filter(v -> v.semaine() == semaine)\n                .mapToInt(Versement::montant)      // int stream : sum() primitif, pas de boxing\n                .sum();\n    }\n\n    public Optional<Membre> meilleurCotisant() {\n        return totalParMembre().entrySet().stream()\n                .max(Map.Entry.comparingByValue())          // Optional<Entry>\n                .flatMap(e -> membres.stream()\n                        .filter(m -> m.id() == e.getKey())\n                        .findFirst());\n    }\n}\n",
                "explain": "Trois réflexes de collections professionnelles. D'abord : la LISTE est la mémoire chronologique (quels versements, dans quel ordre), la MAP est la vue d'interrogation (par membre, instantané) — dupliquer les deux comme état ferait double emploi et désynchronisation ; donc la Map n'existe que comme RÉSULTAT calculé, jamais comme champ. Ensuite : groupingBy + summingInt est l'idiome qui remplace huit lignes de if/containsKey/put — quand tu le lis en français, il dit exactement ce qu'il fait ; c'est le critère d'un bon stream. Enfin Optional : max() sur une collection vide ne peut pas donner de réponse, donne un Optional — et flatMap t'évite le if présent alors… L'examen des retards par count() filtré montre le dernier idiome : « combien parmi » = filter + count, jamais une boucle compteur. Quand toutes tes questions métier se poseront en une ligne de stream lisible, la principale présidente pourra lire le code elle-même — c'est le vrai test."
          },
          "criteria": [
                "Records purs ; List chronologique ; Map dérivée ; aucune duplication d'état.",
                "groupingBy/summingInt et pipelines métier corrects et lisibles.",
                "Optional manipulé avec respect ; validations métier en place."
          ],
          "variants": [
                "Ajoute `bilanMensuel(YearMonth)` : total et versements du mois (filter par date).",
                "Ajoute `tourDePassation()` : le membre le plus ancien n'ayant pas encore reçu le pot (champ bonus).",
                "Défi : exporte le Tableau en StringBuilder aligné avec largeurs calculées dynamiquement (max des noms)."
          ],
          "related": [
                "java-list",
                "java-map",
                "java-streams-api",
                "java-lambdas",
                "java-records",
                "java-optional"
          ]
    },
    {
          "id": "exo-java-exceptions-metier",
          "level": "inter",
          "title": "Des exceptions métier qui parlent",
          "icon": "gpp_maybe",
          "minutes": 40,
          "kind": "checklist",
          "setup": "Reprends `java-tontine`. Nouveaux fichiers : `erreur/TontineException.java`, `erreur/SoldeInsuffisantException.java`, `erreur/RegleMetier.java` (dans un sous-dossier `erreur/` + package). Compile depuis la racine : `javac erreur/*.java *.java`.",
          "context": "La tontine prête maintenant : un membre emprunte, ses garanties doivent couvrir. Quand ça coince (montant trop grand, garant absent, prêt déjà remboursé), le programme doit REFUSER PROPREMENT et EXPLIQUER. Try/catch est de la syntaxe ; le métier, c'est la hiérarchie d'exceptions qui dit exactement CE qui ne va pas — et qui distingue « ta demande est bancale » de « le système déraille ».",
          "statement": "Tu vas bâtir la hiérarchie d'exceptions métier de la tontine et le traitement qui l'accompagne.\n\n1. Crée la classe mère : `public class TontineException extends RuntimeException` (choix unchecked justifié en commentaire : erreurs métier = bugs de l'appelant détectés à l'exécution) avec constructeur (String message) ET (String message, Throwable cause).\n2. Deux filles par finesse : `SoldeInsuffisantException` (ajoute champs requis/disponible + message auto-généré) et `MembreInconnuException` (ajoute l'id fautif). Lève-les dans `preter(montant, membre, garanties)` : stock de la caisse trop faible OU membre/garant introuvable — chaque rejet nomme sa faute.\n3. Ajoute `emprunterPuis(...)` NON — plutôt : dans `TontineMain`, un scénario piloté : création, deux prêts réussis, puis TROIS scénarios d'échec capturés SÉPARÉMENT (multi-catch quand même traitement, catch distincts quand traitements distincts) — montre les deux formes et commente le critère de choix : on attrape ensemble ce qu'on traite pareil, séparément ce qu'on traite différemment.\n4. `try-with-resources` : écris `journaliser(String ligne)` qui ouvre un PrintWriter vers `tontine-journal.txt` (FileWriter append) DANS un try-with-resources — démontre que le fichier se ferme même si println jette (force une IOException simulée via fichier verrouillé/impossible et observe).\n5. Crée **une** classe utilitaire `JournalVersement implements AutoCloseable` simulée (log « ouvert »/« fermé » dans la console) et montre que close() est appelée par le try-with-resources en ordre inverse de l'ouverture quand deux ressources cohabitent.\n6. Table de gouvernance en commentaire de fin : quand choisir checked (héritée d'Exception) vs unchecked (RuntimeException) ? Pourquoi N'IMPRIME-t-on JAMAIS e.printStackTrace() et on ne catch pas Exception nue ? Pourquoi les exceptions filles portent-elles des CHAMPS (requis, disponible) plutôt que tout dans le message ? Réponds en phrases complètes.\n\nCe qui est évalué : la hiérarchie qui factorise le catch (attraper TontineException attrape tout le métier), la sémantique checked/unchecked comprise, le multi-catch choisi à bon escient, try-with-resources maîtrisé (et AutoCloseable), et l'hygiène : jamais de printStackTrace, jamais de catch (Exception) fourre-tout.",
          "constraints": [
                "TontineException mère unchecked ; filles spécialisées avec CHAMPS structurés (pas que des strings).",
                "L'API de prêt lève des exceptions de cette arborescence et ELLES SEULEMENT pour les cas métier.",
                "Multi-catch utilisé seulement là où le traitement est identique ; catch distincts sinon.",
                "Journalisation par try-with-resources ; AutoCloseable implémenté honnêtement (close loguée).",
                "Aucun printStackTrace, aucun catch (Exception e) — catch précis, et l'erreur technique est wrappée avec cause si propagée."
          ],
          "checklist": [
                "Un catch (TontineException e) intercepte à lui seul les trois refus métier différents.",
                "SoldeInsuffisantException expose getRequis()/getDisponible() : le débogueur voit les chiffres sans parser le message.",
                "Le message d'erreur « Solde insuffisant : requis 80 000 F, disponible 45 000 F » est exact.",
                "Multi-catch `catch (SoldeInsuffisantException | MembreInconnuException e)` utilisé là où le traitement est le même ; justifié en commentaire.",
                "Le journal est bien fermé après usage (fichier relisible immédiatement, pas de tampon perdu).",
                "AutoCloseable maison : trace 'ouvert … fermé' prouvant l'appel automatique close().",
                "Une IOException technique est catchée et re-levée wrappée avec cause => la chaîne getCause() est visible au logging.",
                "La table de gouvernance finale est rédigée en phrases complètes et pertinentes."
          ],
          "hints": [
                "La fille structurée : `public class SoldeInsuffisantException extends TontineException { private final int requis, disponible; public SoldeInsuffisantException(int requis, int disponible) { super(\"Solde insuffisant : requis \" + requis + \" F, disponible \" + disponible + \" F\"); this.requis = requis; this.disponible = disponible; } public int requis() { return requis; } … }` — le message parle aux humains, les champs parlent au code.",
                "Le choix checked/unchecked : une erreur que l'appelant peut CORRIGER immédiatement et qui fait partie du contrat d'entrée/sortie (IOException fichier) → checked ; une erreur qui révèle une règle métier violée par le code (demander un prêt impossible) → unchecked. Ta hiérarchie métier est unchecked : les couches supérieures l'attrapent OÙ elles veulent.",
                "Wrap avec cause : `catch (IOException e) { throw new TontineException(\"journal inaccessible\", e); }` — le getCause() garde la raison technique, ton exception garde le niveau d'abstraction lisible par l'équipe. printStackTrace, lui, envoie tout dans la console et l'oublie : en production, c'est un trou."
          ],
          "solution": {
                "lang": "java",
                "label": "hiérarchie + catch + ressource — solution commentée",
                "code": "// ========== erreur/TontineException.java ==========\npackage erreur;\n\n// UNCHECKED (RuntimeException) : violer la règle métier est un bug de l'appelant,\n// détecté à l'exécution ; il ne devrait pas exiger un casque de try partout.\npublic class TontineException extends RuntimeException {\n    public TontineException(String message) { super(message); }\n    public TontineException(String message, Throwable cause) { super(message, cause); }\n}\n\n// ========== erreur/SoldeInsuffisantException.java ==========\npackage erreur;\n\npublic class SoldeInsuffisantException extends TontineException {\n    private final int requis;\n    private final int disponible;\n\n    public SoldeInsuffisantException(int requis, int disponible) {\n        super(String.format(\"Solde insuffisant : requis %,d F, disponible %,d F\",\n                            requis, disponible));\n        this.requis = requis;         // CHAMPS : le code attrape des FAITS,\n        this.disponible = disponible; // pas un message à re-parser.\n    }\n    public int requis() { return requis; }\n    public int disponible() { return disponible; }\n}\n\n// ========== Dans Tontine : le service lève, précis ==========\n// if (montant > soldeCaisse) throw new SoldeInsuffisantException(montant, soldeCaisse);\n\n// ========== Dans le main : catch distincts vs multi-catch ==========\ntry {\n    tontine.preter(80000, awa, garanties);\n} catch (SoldeInsuffisantException e) {\n    // traitement SPÉCIFIQUE : proposer moins (on connaît les chiffres !)\n    System.out.printf(\"Proposez %,d F au lieu de %,d F%n\", e.disponible(), e.requis());\n} catch (MembreInconnuException e) {\n    System.out.println(\"Fiche à créer avant tout prêt : \" + e.idFautif());\n} catch (TontineException e) {\n    // filet métier : tout le reste de la famille, traité pareil\n    System.out.println(\"Refus métier : \" + e.getMessage());\n}\n\n// ========== Journalisation try-with-resources ==========\n// try (PrintWriter j = new PrintWriter(new FileWriter(\"tontine-journal.txt\", true))) {\n//     j.println(ligne);\n// } catch (IOException e) {\n//     // fermé QUOIQUE IL ARRIVE ; wrap pour garder la cause technique\n//     throw new TontineException(\"journal inaccessible\", e);\n// }\n",
                "explain": "Une hiérarchie d'exceptions se conçoit comme un organigramme : la mère dit la famille (métier de la tontine), les filles disent la fonction exacte (solde, identité), les champs des filles portent les FAITS. Le code appelant gagne trois libertés : attraper tout le métier d'un coup (catch TontineException), traiter un cas précis (catch fille, avec chiffres exploitables), ou laisser remonter proprement. L'unchecked est ici le bon choix : demander à CHAQUE appelant de gérer par compilation une règle métier, c'est couvrir le code de try vides qui poussent à l'anti-pattern catch(Exception)… que justement on interdit. Et le try-with-resources clôt le sujet : la fermeture n'est plus un oubli potentiel mais une ligne de structure — ajoute la cause technique au wrap (throw new TontineException(msg, e)) et plus jamais une panne disque ne ressemblera à « ça marche pas ». Le détail qui distingue le pro : getCause() raconte L'HISTOIRE COMPLÈTE quand on relit l'erreur."
          },
          "criteria": [
                "Hiérarchie unchecked cohérente avec champs structurés et wrap à cause préservée.",
                "Catch sélectifs justifiés ; try-with-resources démontré avec AutoCloseable maison.",
                "Gouvernance checked/unchecked rédigée ; aucun printStackTrace/catch fourre-tout."
          ],
          "variants": [
                "Ajoute `PretdEjaRembourseException` (unchecked) et son scénario de traitement.",
                "Écris un assert d'erreurs : une méthode de tests maison qui vérifie que preter lève BIEN la bonne classe d'exception (try/catch + boolean).",
                "Défi : exceptions avec code d'erreur numéroté (E001, E002…) exposé par la mère, et journal qui les aligne."
          ],
          "related": [
                "java-try-catch-finally",
                "java-try-with-resources",
                "java-checked-unchecked",
                "java-heritage"
          ]
    },
    {
          "id": "exo-java-gestion-tontine",
          "level": "projet",
          "title": "Tontine complète : Maven, services testés, rapports streams",
          "icon": "workspace_premium",
          "minutes": 140,
          "kind": "checklist",
          "setup": "Installe Maven (`mvn -version`). Génère le squelette : `mvn archetype:generate -DgroupId=bj.tontine -DartifactId=tontine-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`. Structure cible : src/main/java/bj/tontine/{modele,service,rapport} et src/test/java avec JUnit 5 (dépendance à ajouter au pom).",
          "context": "Assemblée générale des tontines de Ladji : Awa Mensah veut l'outil définitif — inscriptions, cotisations hebdomadaires, prêts garantis, rapport d'assemblée imprimable, tout prouvé par des tests automatiques. C'est le diplôme du module Java : records, streams, exceptions métier, exceptions gouvernance… et Maven qui tient les murs pendant que les tests gardent la maison.",
          "statement": "Tu vas livrer la tontine en architecture Maven, services purs et tests JUnit 5.\n\n1. **Modèle** (`modele/`) : records `Membre(int id, String nom, String telephone)`, `Versement(int membreId, int montant, LocalDate date, int semaine)`, `Pret(int id, int membreId, int montant, int garanties, LocalDate date, EtatPret etat)` avec `enum EtatPret { ACCORDE, REMBOURSE_PARTIEL, SOLDE }`. Validation des records dans le constructeur compact (montants > 0, semaine > 0).\n2. **Exceptions** : reprends la hiérarchie TontineException de l'exercice 4 (package erreur).\n3. **Service** (`service/TontineService.java`) : UNE classe d'orchestration injectée avec ses collections : `inscrire`, `verser`, `preter(membreId, montant, garanties)` (règles : membre connu ; montant ≤ solde caisse ; garanties : nb de membres garants ≥ montant/50000 en présence distincte — la règle de la maison), `rembourser(pretId, montant)` (mise à jour état automatique : SOLDE quand tout est payé ; partiel sinon ; refuse le trop-perçu), `soldeCaisse()` (Σ versements − Σ prêts accordés + Σ remboursements — dérivé, pas stocké).\n4. **Rapports** (`rapport/RapportService.java`) : `tableauCotisations()` (Map ordonnée par total décroissant — LinkedHashMap et stream sorted), `presenceParSemaine()`, `membresEnRetard(int semainesEcoulees)`, `rapportAssemblee()` : UNE String formatée prête à imprimer (totaux caisse, prêts en cours, soudures, retards) — tout en streams, aucun état.\n5. **Tests** (`src/test/java/…`) : AU MOINS 8 tests JUnit 5 sans I/O ni framework : inscrire ok + doublon refusé ; verser ok + membre inconnu refusé (assertThrows sur la CLASSE exacte) ; prêt ok ; prêt refusé solde (SoldeInsuffisantException.champs vérifiés !) ; remboursement partiel puis solde change l'état ; trop-perçu refusé ; présence/retards exacts ; rapport contient les montants clés. `mvn test` tout vert.\n6. **Classe Main de démonstration** : scénario des 10 membres, 8 semaines, un prêt, des remboursements, puis impression du rapport d'assemblée. `mvn -q package` + jar exécutable (maven-jar-plugin avec Main-Class dans le manifest — commente cette config).\n7. **Gouvernance finale** (README.md du projet) : pourquoi le service dépend des collections injectées plutôt que de new en dur (testabilité) ; pourquoi soldeCaisse est dérivé ; pourquoi les records ; quelles règle tu GARANTIS par les tests ; un diagramme texte des dépendances modele/service/rapport.\n\nCe qui est évalué : la séparation modèle/service/rapport qui rend tout testable, les records et leur constructeur compact de validation, les règles prouvées par tests (assertThrows précis, jamais des try/catch dans les tests), la dérivation de l'état (solde non stocké), et Maven maîtrisé (pom, dépendances, phases, jar exécutable).",
          "constraints": [
                "Toute règle métier vit dans TontineService ; l'affichage dans RapportService ; aucun System.out dans les services.",
                "Records partout pour le modèle, validations dans constructeurs compacts, hiérarchie d'exceptions réutilisée.",
                "soldeCaisse est un calcul dérivé ; aucun champ solde susceptible de dériver.",
                "8+ tests JUnit assertThrows sur classes exactes ; aucun test ne touche disque, console ou réseau.",
                "mvn package produit un jar exécutable `java -jar target/tontine-app-1.0-SNAPSHOT.jar` qui lance la démo."
          ],
          "checklist": [
                "mvn test : 8 tests minimum, tous verts, sans dépendance à l'ordre (chacun instancie son propre service).",
                "mvn package sans erreur ; le jar exécutable imprime le scénario de démonstration complet.",
                "Garanties de prêt : la règle « 1 garant tranche de 50 000 » refuse un prêt de 80 000 avec un seul garant.",
                "Trop-perçu : rembourser 10 000 sur un prêt déjà soldé ou au-delà du reste est refusé (exception métier).",
                "soldeCaisse() est exact à chaque étape du scénario (vérifié à la main sur trois points).",
                "Le rapport d'assemblée affiche cotisations triées décroissantes, retards justes, prêts en cours.",
                "assertThrows vérifie AUSSI les champs (requis/disponible) d'une SoldeInsuffisantException.",
                "README.md répond aux 5 questions de gouvernance en phrases complètes.",
                "Les records refusent la création invalide dès le constructeur (montant -5 → exception).",
                "Aucune bibliothèque externe autres que JUnit : tout est bibliothèque standard Java."
          ],
          "hints": [
                "L'injection légère : `public TontineService(List<Membre> membres, List<Versement> versements, List<Pret> prets, List<Remboursement> remboursements) { … }` — les tests passent des ArrayList vides, la démo des remplies : le service ne sait pas qui le pilote, c'est le prix de la testabilité.",
                "assertThrows précis : `SoldeInsuffisantException e = assertThrows(SoldeInsuffisantException.class, () -> service.preter(1, 80000, garanties)); assertEquals(80000, e.requis()); assertEquals(50000, e.disponible());` — assertThrows RENVOIE l'exception : on peut inspecter ses champs, c'est fait pour.",
                "Le solde dérivé : `return versements.stream().mapToInt(Versement::montant).sum() - prets.stream().filter(p -> p.etat() != EtatPret.ANNULE).mapToInt(Pret::montant).sum() + remboursements.stream().mapToInt(Remboursement::montant).sum();` — si les trois flux mentent ensemble, tout ment ; en dérivant, UNE source de vérité : les événements, pas leur solde."
          ],
          "solution": {
                "lang": "java",
                "label": "TontineService + tests — solution commentée (extraits)",
                "code": "// ========== service/TontineService.java ==========\npublic class TontineService {\n    private final List<Membre> membres;\n    private final List<Versement> versements;\n    private final List<Pret> prets;\n    private final List<Remboursement> remboursements;\n\n    // Injection LÉGÈRE par constructeur : les tests pilotent les collections,\n    // la démo aussi — le service ne sait pas qui alimente le monde.\n    public TontineService(List<Membre> m, List<Versement> v,\n                          List<Pret> p, List<Remboursement> r) {\n        this.membres = m; this.versements = v;\n        this.prets = p; this.remboursements = r;\n    }\n\n    public Pret preter(int membreId, int montant, List<Integer> garantIds) {\n        Membre emprunteur = trouver(membreId);          // MembreInconnuException sinon\n        if (montant <= 0) throw new IllegalArgumentException(\"montant positif requis\");\n        int caisse = soldeCaisse();\n        if (montant > caisse) throw new SoldeInsuffisantException(montant, caisse);\n        // Règle maison : chaque garant couvre 50 000 F, garants distincts de l'emprunteur.\n        long couverture = garantIds.stream().distinct()\n                .filter(id -> id != membreId)\n                .peek(this::trouver)                    // garant inconnu -> exception\n                .count() * 50000L;\n        if (couverture < montant)\n            throw new GarantieInsuffisanteException(montant, (int) couverture);\n        Pret pret = new Pret(prochainId(), membreId, montant, garantIds.size(),\n                             LocalDate.now(), EtatPret.ACCORDE);\n        prets.add(pret);\n        return pret;\n    }\n\n    // SOLDE DÉRIVÉ : les événements sont la vérité, jamais un champ à dériver.\n    public int soldeCaisse() {\n        int entrees = versements.stream().mapToInt(Versement::montant).sum()\n                    + remboursements.stream().mapToInt(Remboursement::montant).sum();\n        int sorties = prets.stream().mapToInt(Pret::montant).sum();\n        return entrees - sorties;\n    }\n}\n\n// ========== tests (JUnit 5) ==========\n// @Test\n// void pret_refuse_quand_caisse_insuffisante() {\n//     TontineService s = fixture();\n//     SoldeInsuffisantException e = assertThrows(SoldeInsuffisantException.class,\n//             () -> s.preter(1, 80000, List.of(2)));\n//     assertEquals(80000, e.requis());       // les CHAMPS sont la preuve, pas le texte\n//     assertEquals(50000, e.disponible());\n// }\n//\n// @Test\n// void remboursement_solde_bascule_etat() {\n//     TontineService s = fixture();\n//     Pret p = s.preter(1, 60000, List.of(2, 3));\n//     s.rembourser(p.id(), 60000);\n//     assertEquals(EtatPret.SOLDE, s.pret(p.id()).etat());\n//     assertThrows(TontineException.class, () -> s.rembourser(p.id(), 1000)); // trop-perçu\n// }\n",
                "explain": "Ce projet assemble tout le module. Les records scellent le modèle (validation au constructeur compact, égalité gratuite, pas de getter manuscrit) ; le service concentre les règles et n'a aucune idée d'affichage, ce qui rend huit tests JUnit suffisants pour prouver la maison entière sans console ni disque. L'injection de collections est la version honnête de « dépendances configurables » : pas de framework, juste un constructeur — les tests injectent du vide, la démo du plein. Le solde dérivé est la décision d'architecture la plus saine : une caisse EST somme des entrées moins somme des sorties ; stocker ce chiffre serait créer une deuxième vérité qui finira par contredire la première au moment d'une coupure. assertThrows(ré) inspection des champs, le jar exécutable, le README gouvernance : à la fin, tu ne « sais » plus seulement Java, tu sais livrer un outil qu'on peut faire évoluer sans peur. Les vendeuses et les présidentes de tontine disposent d'un logiciel ; c'est le niveau attendu en entretien."
          },
          "criteria": [
                "Architecture modèle/service/rapport respectée ; aucune trace d'I/O dans les services.",
                "Règles prouvées : 8+ tests verts, assertThrows précis, champs d'exceptions inspectés.",
                "soldeCaisse dérivé exact ; jar exécutable ; README de gouvernance rédigé."
          ],
          "variants": [
                "Ajoute `Remboursement` en record propre (date incluse) si tu l'as simplifié — avec son test.",
                "Ajoute rapport exporté en fichier texte daté (rapports/AAAA-MM-JJ-rapport.txt) via un FileRapportWriter.",
                "Défi : remplace les collections injectées par une interface `Depot` (InMemoryDepot en prod, FakeDepot en tests) et montre que les tests restent verts sans modification."
          ],
          "related": [
                "java-records",
                "java-streams-api",
                "java-maven",
                "java-optional",
                "java-checked-unchecked",
                "java-collections-hierarchie"
          ]
    }
  ]
};
