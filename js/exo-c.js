/* ============================================================
   exo-c.js — Exercices pratiques
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.c = {
  module: 'c',
  list: [
    {
          "id": "exo-c-tableaux-prix",
          "level": "fonda",
          "title": "Le tableau des prix du marché",
          "icon": "table",
          "free": true,
          "minutes": 30,
          "kind": "checklist",
          "setup": "Installe GCC (`sudo apt install gcc` ou équivalent — sous macOS, `clang` convient). Dossier `c-marche`, fichier `prix.c`. Compile et exécute : `gcc -Wall -Wextra -std=c11 prix.c -o prix && ./prix`.",
          "context": "Le syndicat des mareyeuses de Dantokpa affiche chaque matin le cours des six poissons fumés : capitaine, thon, carpe, mulet, tilapia, sole. Jusqu'ici, la calculatrice fait le reste — moyenne, moins cher, plus cher. Un programme C de quatre-vingts lignes fera mieux : c'est l'exercice où les tableaux, les boucles et printf deviennent un outil de marché.",
          "statement": "Tu vas manipuler un tableau de prix de bout en bout : moyennes, extrêmes, formatage.\n\n1. Déclare deux tableaux parallèles : `const char *noms[]` (6 poissons) et `int prix[]` (leurs cours en FCFA par kg : 4500, 6000, 2800, 3200, 2500, 7500). Un commentaire te rappellera pourquoi deux tableaux parallèles sont ici acceptables — et qu'une struct serait l'étape suivante (prochain exercice, patience).\n2. Fonction `void afficher(const char *noms[], const int prix[], int n)` : affiche chaque ligne en colonnes alignées avec `printf(\"%-12s %6d F\\n\", …)` — le `%` négatif aligne à gauche, la largeur fixe fait le tableau.\n3. Fonctions de statistiques, chacune en une boucle : `int minimum(const int prix[], int n)`, `int maximum(...)`, `double moyenne(...)`. À toi de boucler et comparer ; attention au **cast** `(double)` pour la moyenne — la division entière te trahirait sans bruit.\n4. Fonction `int compter_moins_chers(const int prix[], int n, int seuil)` : combien coûtent strictement moins que `seuil` ? Et `int indice_moins_cher(...)` : l'indice du premier poisson au prix minimal.\n5. Le `main` : affichage du tableau, de la moyenne (formatée `%.0f`), du moins cher et du plus cher **avec leurs noms** (via les indices), puis « Poissons à moins de 3 500 F : X sur 6 ».\n6. Compile avec `-Wall -Wextra` et n'accepte ZÉRO avertissement : les warnings ignorés d'aujourd'hui sont les segfaults de demain.\n\nCe qui est évalué : la déclaration et le parcours de tableaux, les passages de tableaux en paramètres (l'array decay en pointeur — tu le commentes !), l'alignement printf, et le réflexe warnings-zéro. C'est petit, précis, et c'est exactement le niveau de maîtrise attendu avant malloc.",
          "constraints": [
                "Exactement deux tableaux parallèles pour les données ; tout parcours passe par des fonctions dédiées (pas de boucles dupliquées dans main).",
                "La moyenne est calculée en double via cast explicite — division entière bannie ici.",
                "Affichage aligné en colonnes avec spécificateurs de largeur printf.",
                "Compilation -Wall -Wextra -std=c11 avec zéro avertissement.",
                "Aucun nombre magique dans les boucles : la taille vient d'un const int n ou de sizeof calculé une fois."
          ],
          "checklist": [
                "gcc -Wall -Wextra -std=c11 prix.c -o prix : silencieux, aucun warning.",
                "Le tableau s'affiche aligné (les prix forment une colonne droite).",
                "La moyenne affichée est exacte (recalculée à la main : 26 500/6 ≈ 4417).",
                "Le moins cher (tilapia 2500) et le plus cher (sole 7500) s'affichent avec leurs noms, pris par indice — pas écrits en dur.",
                "compter_moins_chers(3500) répond 3 sur 6 (carpe, mulet, tilapia).",
                "Changer un prix dans le tableau et recompiler met à jour TOUTES les stats sans autre modification.",
                "Je sais expliquer pourquoi la fonction reçoit aussi `n` : un tableau passé en paramètre décroit en pointeur, sizeof ne dit plus la taille.",
                "Le programme retourne EXIT_SUCCESS (int main, return explicite)."
          ],
          "hints": [
                "La signature qui t'apprend : `double moyenne(const int prix[], int n) { long somme = 0; for (int i = 0; i < n; i++) somme += prix[i]; return (double)somme / n; }` — le long évite tout dépassement, le cast fait la vraie division.",
                "L'indice du minimum : `int indice = 0; for (int i = 1; i < n; i++) if (prix[i] < prix[indice]) indice = i; return indice;` — tu compares CONTRE l'indice courant, pas une valeur magique de départ.",
                "L'alignement : `printf(\"%-12s %6d F\\n\", noms[i], prix[i]);` — %-12s calibre le nom sur 12 à gauche, %6d cale le nombre sur 6 à droite. Change 12 et 6 : les colonnes bougent avec."
          ],
          "solution": {
                "lang": "c",
                "label": "prix.c — solution commentée",
                "code": "#include <stdio.h>\n\n/* Un tableau passé en paramètre 'décroit' en pointeur sur son 1er élément :\n   la taille VOYAGE À CÔTÉ, dans n. C'est la règle n°1 du C. */\nvoid afficher(const char *noms[], const int prix[], int n) {\n    for (int i = 0; i < n; i++) {\n        printf(\"%-12s %6d F\\n\", noms[i], prix[i]);   /* colonnes droites */\n    }\n}\n\nint minimum(const int prix[], int n) {\n    int m = prix[0];\n    for (int i = 1; i < n; i++) if (prix[i] < m) m = prix[i];\n    return m;\n}\n\nint maximum(const int prix[], int n) {\n    int m = prix[0];\n    for (int i = 1; i < n; i++) if (prix[i] > m) m = prix[i];\n    return m;\n}\n\ndouble moyenne(const int prix[], int n) {\n    long somme = 0;                    /* long : jamais de dépassement silencieux */\n    for (int i = 0; i < n; i++) somme += prix[i];\n    return (double)somme / n;          /* cast AVANT de diviser : sinon division entière */\n}\n\nint indice_moins_cher(const int prix[], int n) {\n    int indice = 0;\n    for (int i = 1; i < n; i++) if (prix[i] < prix[indice]) indice = i;\n    return indice;                     /* on compare contre l'INDICE, pas une valeur */\n}\n\nint compter_moins_chers(const int prix[], int n, int seuil) {\n    int compte = 0;\n    for (int i = 0; i < n; i++) if (prix[i] < seuil) compte++;\n    return compte;\n}\n\nint main(void) {\n    const char *noms[] = { \"Capitaine\", \"Thon\", \"Carpe\", \"Mulet\", \"Tilapia\", \"Sole\" };\n    int prix[]         = { 4500, 6000, 2800, 3200, 2500, 7500 };\n    const int n = (int)(sizeof prix / sizeof prix[0]);   /* calculé, pas figé */\n\n    afficher(noms, prix, n);\n    printf(\"Moyenne : %.0f F\\n\", moyenne(prix, n));\n    int i_min = indice_moins_cher(prix, n);\n    printf(\"Moins cher : %s (%d F)\\n\", noms[i_min], prix[i_min]);\n    int i_max = 0;\n    for (int i = 1; i < n; i++) if (prix[i] > prix[i_max]) i_max = i;\n    printf(\"Plus cher : %s (%d F)\\n\", noms[i_max], prix[i_max]);\n    printf(\"A moins de 3500 F : %d sur %d\\n\", compter_moins_chers(prix, n, 3500), n);\n    return 0;\n}\n",
                "explain": "Trois gardiens de ce code font la différence entre l'étudiant et le praticien. Le premier : fonctions dédiées par statistique — la boucle est écrite UNE fois par calcul, testable, lisible ; main orchestre. Le deuxième : (double)somme / n — sans le cast, 26500/6 vaut 4416 (division entière, tronquée), et ton affichage mentrait en silence ; en C, aucune conversion implicite ne te sauvera quand ça compte. Le troisième : n calculé par sizeof au point de déclaration et transporté partout — ajoute un poisson au tableau, tout le reste suit : c'est l'inverse du nombre magique 6 semé dans les boucles. Retiens aussi indice_moins_cher qui renvoie l'indice plutôt que la valeur : avec l'indice, tu as ET le nom ET le prix ; avec la valeur, tu as perdu la moitié de l'information."
          },
          "criteria": [
                "Tableau affiché aligné, toutes statistiques exactes et recalculables.",
                "Zéro warning -Wall -Wextra ; fonctions pures ; n explicite partout.",
                "L'étudiant explique l'array decay et le cast de la moyenne."
          ],
          "variants": [
                "Ajoute `int compter_dans_tranche(prix, n, bas, haut)` et affiche « entre 3000 et 5000 F ».",
                "Inverse le tableau dans une fonction `void inverser(int prix[], int n)` (échange in place avec indices jumeaux).",
                "Défi : trie par prix croissant avec un tri à bulles (deux boucles imbriquées) puis réaffiche — commente pourquoi ce tri est pédagogique, pas industriel."
          ],
          "related": [
                "c-tableaux",
                "c-chaines",
                "c-passage-params",
                "c-structure-main",
                "c-gcc-flags"
          ]
    },
    {
          "id": "exo-c-struct-produit",
          "level": "fonda",
          "title": "Une struct Produit pour remplacer les tableaux parallèles",
          "icon": "widgets",
          "minutes": 35,
          "kind": "checklist",
          "setup": "Reprends le dossier `c-marche`. Nouveau fichier `stock.c`. Même rigueur : `gcc -Wall -Wextra -std=c11 stock.c -o stock`.",
          "context": "Les deux tableaux parallèles de l'exercice précédent t'ont déjà fait peur : ajoute un champ (le stock en sacs) et tu dois les synchroniser en trois endroits. La struct, c'est le C qui dit « ces données vont ensemble » — et c'est la fondation de TOUT ce qui suit : tri, fichiers, allocation dynamique.",
          "statement": "Tu vas regrouper les données en struct et découvrir les fonctions qui travaillent dessus.\n\n1. Définis en tête de fichier : `typedef struct { char nom[32]; float prix_kg; int stock; } Produit;` — taille de nom fixe : 32 octets, et explique en commentaire ce que cela implique (troncature au-delà, mémoire contiguë, pas de malloc).\n2. Un tableau de 6 produits initialisés avec les **désignateurs** : `{ .nom = \"Capitaine\", .prix_kg = 4500.0f, .stock = 12 }, …` — les désignateurs rendent l'ordre des champs explicite (et tolèrent qu'on réorganise la struct plus tard).\n3. Fonctions : `void afficher_produit(const Produit *p)` (LE passage par pointeur constant : commente pourquoi on ne recopie pas ~40 octets à chaque appel) ; `float valeur_stock(const Produit *p)` ; `int vendre(Produit *p, int quantite)` qui retourne 1 si la vente est faite (stock suffisant), 0 sinon — le pointeur NON constant autorise la mutation.\n4. Le `main` crée le tableau, affiche l'inventaire, vend 3 kg de capitaine, tente une vente de 99 kg de sole (refusée avec message), puis affiche la **valeur totale du stock** (somme des valeurs) formatée.\n5. Manipulation instructive : copie une struct par valeur (`Produit copie = produits[0];`), modifie la copie, montre que l'original n'a pas bougé — contrairement aux références ailleurs, les structs du C se COPIENT. Écris-le en commentaire de démonstration.\n6. Bonus sizes : `printf(\"sizeof(Produit) = %zu\\n\", sizeof(Produit))` — observe que ça ne fait pas 32+4+4 pile ; ajoute le commentaire sur l'**alignement/padding** (relis la fiche c-packing si besoin).\n\nCe qui est évalué : la déclaration de struct + typedef, l'initialisation désignée, le passage pointeur-const vs pointeur mutable, la sémantique de copie par valeur, et la curiosité saine vis-à-vis de sizeof. C'est le socle du C impératif des deux prochains exercices.",
          "constraints": [
                "typedef struct unique ; deux tableaux parallèles INTERDITS.",
                "Initialisation avec désignateurs .champ = … (jamais les accolades positionnelles anonymes).",
                "Lecture seule → const Produit * ; mutation → Produit * ; par-recopie interdite hors démonstration.",
                "vendre vérifie le stock et signale son échec par sa valeur de retour (0/1), jamais de printf caché dedans.",
                "Zéro warning à -Wall -Wextra."
          ],
          "checklist": [
                "La struct est définie UNE fois ; tous les produits vivent dans un tableau de Produit.",
                "Initialisations désignées relisibles : on comprend chaque ligne sans regarder la struct.",
                "afficher_produit et valeur_stock prennent un const Produit * (attestation compilateur visible).",
                "Vente réussie : stock décrémenté ; tentative de 99 kg : refus propre, stock intact.",
                "La copie par valeur est démontrée (modifier la copie ne change pas l'original) et commentée.",
                "La valeur totale est cohérente (recalculée à la main sur les 6 produits).",
                "sizeof(Produit) s'affiche ; je sais dire d'où vient l'écart éventuel (padding) en une phrase.",
                "strncpy est utilisé si je copie un nom (jamais strcpy) : vu dans le code ou expliqué en commentaire."
          ],
          "hints": [
                "La forme canonique : `typedef struct { char nom[32]; float prix_kg; int stock; } Produit;` puis `void afficher_produit(const Produit *p) { printf(\"%-12s %7.0f F/kg — stock %d\\n\", p->nom, (double)p->prix_kg, p->stock); }` — const + flèche : lecture garantie sans copie.",
                "La vente : `int vendre(Produit *p, int qte) { if (p->stock < qte) return 0; p->stock -= qte; return 1; }` — la valeur de retour est le CONTRAT ; main() décide du message à afficher, pas la fonction.",
                "La copie par valeur : `Produit copie = produits[0]; copie.stock = 999; printf(\"%d vs %d\\n\", produits[0].stock, copie.stock);` — en C (et nulle part ailleurs dans tes langages objet), une struct est une VALEUR : tu clonnes gratuitement à chaque affectation. Utile… et coûteux si la struct est grosse."
          ],
          "solution": {
                "lang": "c",
                "label": "stock.c — solution commentée",
                "code": "#include <stdio.h>\n\ntypedef struct {\n    char  nom[32];     /* taille FIXE : mémoire connue, contiguë, zéro malloc */\n    float prix_kg;\n    int   stock;\n} Produit;\n\n/* Lecture seule : const + pointeur = pas de copie (la struct fait ~40 octets),\n   et le compilateur REFUSERA une écriture sur p. */\nvoid afficher_produit(const Produit *p) {\n    printf(\"%-12s %7.0f F/kg — %d en stock\\n\", p->nom, (double)p->prix_kg, p->stock);\n}\n\nfloat valeur_stock(const Produit *p) {\n    return p->prix_kg * (float)p->stock;\n}\n\n/* Pointeur MUTABLE : la fonction modifie l'original. Le retour porte le contrat. */\nint vendre(Produit *p, int quantite) {\n    if (p->stock < quantite) return 0;      /* refus : on ne touche à rien */\n    p->stock -= quantite;\n    return 1;\n}\n\nint main(void) {\n    Produit produits[] = {\n        { .nom = \"Capitaine\", .prix_kg = 4500.0f, .stock = 12 },\n        { .nom = \"Thon\",      .prix_kg = 6000.0f, .stock = 8 },\n        { .nom = \"Carpe\",     .prix_kg = 2800.0f, .stock = 20 },\n        { .nom = \"Mulet\",     .prix_kg = 3200.0f, .stock = 15 },\n        { .nom = \"Tilapia\",   .prix_kg = 2500.0f, .stock = 18 },\n        { .nom = \"Sole\",      .prix_kg = 7500.0f, .stock = 3 },\n    };\n    const int n = (int)(sizeof produits / sizeof produits[0]);\n\n    for (int i = 0; i < n; i++) afficher_produit(&produits[i]);\n\n    if (vendre(&produits[0], 3))  printf(\"3 kg de capitaine vendus.\\n\");\n    if (!vendre(&produits[5], 99)) printf(\"Vente refusée : pas assez de sole.\\n\");\n\n    /* DÉMO copie par valeur : la struct SE CLONE à l'affectation. */\n    Produit copie = produits[1];\n    copie.stock = 999;\n    printf(\"Original %d kg vs copie %d kg\\n\", produits[1].stock, copie.stock);\n\n    float total = 0.0f;\n    for (int i = 0; i < n; i++) total += valeur_stock(&produits[i]);\n    printf(\"Valeur totale du stock : %.0f F\\n\", (double)total);\n    printf(\"sizeof(Produit) = %zu\\n\", sizeof(Produit));\n    return 0;\n}\n",
                "explain": "La struct change le contrat mental : au lieu de trois tableaux à tenir en phase, tu as un tableau de choses complètes — ajoute un champ, tout suit. Le vrai enseignement est dans les signatures : const Produit * dit « je lis, ne copie pas » ; Produit * dit « je vais écrire chez toi » ; une fonction qui prendrait Produit par valeur recevrait un CLONE muet (et modifierait le clone dans le vide). Ces trois catégories de passage sont toute l'API du C — les débutants les confondent pendant un an, les pros les choisissent en une seconde. Note aussi la copie par valeur démontrée : en C, affecter une struct DUPLICATE la mémoire — génial pour un snapshot, ruineux sur une struct de 4 ko. Enfin sizeof(Produit) : le compilateur insère peut-être du padding pour aligner les champs — la mémoire n'est pas une armoire à tiroirs arbitraires, elle a des allées de largeur fixe."
          },
          "criteria": [
                "Struct unique + désignateurs ; fonctions const/mutable correctement signées.",
                "Sémantique de copie par valeur comprise et démontrée.",
                "Zéro warning ; valeur totale exacte ; vendre contrôlé par retour."
          ],
          "variants": [
                "Ajoute un champ `float prix_gros` et une fonction `appliquer_tarif_gros(Produit *p, Produit *out)` qui remplit out.",
                "Écris `int comparer(const void *a, const void *b)` sur prix_kg croissant (prépare le qsort de l'exercice 3).",
                "Défi : fournis `Produit lire_produit(void)` qui saisit nom/prix/stock au clavier avec scanf sécurisé (largeur %31s)."
          ],
          "related": [
                "c-structures",
                "c-pointeurs-bases",
                "c-passage-params",
                "c-packing",
                "c-types-primitifs"
          ]
    },
    {
          "id": "exo-c-tri-stock",
          "level": "inter",
          "title": "Trier l'inventaire avec qsort et les pointeurs de fonctions",
          "icon": "sort",
          "minutes": 40,
          "kind": "checklist",
          "setup": "Reprends `stock.c` de l'exercice struct. Nouveau fichier `tri.c` avec la même struct Produit. `gcc -Wall -Wextra -std=c11 tri.c -o tri` pour compiler ; `#include <stdlib.h>` pour qsort.",
          "context": "La mareyeuse veut son inventaire tantôt par prix (les clients chics d'abord), tantôt par stock décroissant (les urgences de réassort d'abord), tantôt par nom alphabétique (pour crier dans l'allée). Écrire trois tris à la main ? Non : qsort + pointeurs de fonctions — le C te donne le moteur, tu branches la règle.",
          "statement": "Tu vas trier le même tableau trois façons avec un UNIQUE appel à qsort et trois comparateurs.\n\n1. Garde la struct Produit de l'exercice précédent (nom[32], prix_kg, stock) et le même jeu de 6 produits, dans un ordre volontairement mélangé.\n2. Écris trois comparateurs conformes à la signature de qsort : `int cmp_prix_croissant(const void *a, const void *b)`, `int cmp_stock_decroissant(...)`, `int cmp_nom(...)`. Rappel du contrat en commentaire : négatif si a avant b, 0 si égaux, positif si a après b. ATTENTION : pour nom, utilise `strcmp` de string.h — jamais de soustraction de caractères.\n3. Montre la mécanique : dans chaque comparateur, caste d'abord — `const Produit *pa = a;` — puis compare les champs. Pour les entiers, retourne une comparaison explicite `pa->stock < pb->stock ? 1 : -1` etc. (pas de soustraction naive, commente pourquoi : dépassement possible sur grands entiers).\n4. `void afficher_inventaire(const char *titre, const Produit p[], int n)` pour réafficher proprement après chaque tri.\n5. Le `main` : affiche l'ordre initial, puis ENCHAÎNE les trois tris sur le MÊME tableau (qsort trie en place — tu modifies et réaffiches) avec `qsort(p, n, sizeof(Produit), cmp_…)` : prix croissant, stock décroissant, nom alphabétique. Vérifie chaque résultat.\n6. Démonstration avancée : écris `void *chercher_binaire(const Produit p[], int n, const char *nom)` non — plutôt utilise `bsearch` de stdlib après tri par nom pour retrouver « Tilapia » en une ligne, avec le MÊME type de comparateur. C'est LE réflexe : trier puis chercher, c'est le métier.\n\nCe qui est évalué : la signature void* générique et le cast, le contrat du comparateur, strcmp pour les chaînes, qsort en place, et bsearch comme aboutissement logique. Les pointeurs de fonctions arrêtent ici d'être de la théorie : tu en passes trois en paramètres.",
          "constraints": [
                "qsort de stdlib.h : aucun tri écrit à la main dans le programme final.",
                "Trois comparateurs distincts, tous avec cast en tête et contrat signe commenté.",
                "strcmp pour le nom ; aucune soustraction de char ni de trucs douteux.",
                "L'affichage passe par la fonction commune avec titre (pas de copier-coller).",
                "bsearch utilisé APRÈS le tri alphabétique, pour prouver l'affirmation « trié ⟹ cherchable »."
          ],
          "checklist": [
                "Ordre initial, puis les trois tris s'affichent successivement, chacun exactement dans l'ordre attendu.",
                "Après tri par prix : Tilapia (2500) en premier, Sole (7500) en dernier.",
                "Après tri stock décroissant : Carpe (20) en premier, Sole (3) en dernier.",
                "Après tri alphabétique : Capitaine… puis Carpe… puis Mulet… puis Sole… puis Thon… puis Tilapia — l'ordre des noms est parfait.",
                "bsearch retrouve bien Tilapia et affiche son prix ; bsearch sur un nom inexistant renvoie NULL (testé).",
                "Les comparateurs commencent tous par le cast const Produit * et le commentaire du contrat.",
                "Modifier un comparateur (prix décroissant) change uniquement sa section — aucun autre code ne bouge.",
                "Zéro warning -Wall -Wextra, y compris sur les signatures de comparateurs."
          ],
          "hints": [
                "Le comparateur type : `int cmp_prix_croissant(const void *a, const void *b) { const Produit *pa = a; const Produit *pb = b; if (pa->prix_kg < pb->prix_kg) return -1; if (pa->prix_kg > pb->prix_kg) return 1; return 0; }` — jamais `return pa->prix_kg - pb->prix_kg;` (float) ni `pb->stock - pa->stock` (entier : risque théorique de dépassement, et illisible).",
                "strcmp direct : `return strcmp(pa->nom, pb->nom);` — strcmp rend exactement le signe attendu par qsort ; ton comparateur chaînes tient en UNE ligne (après les casts).",
                "bsearch : `const Produit cle = { .nom = \"Tilapia\" }; Produit *trouve = bsearch(&cle, p, n, sizeof(Produit), cmp_nom);` — la clé est un Produit factice dont seul le nom sert. bsearch exige le tri correspondant au comparateur, sinon le compte de lapin est faussé."
          ],
          "solution": {
                "lang": "c",
                "label": "tri.c — solution commentée",
                "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char nom[32]; float prix_kg; int stock; } Produit;\n\n/* Contrat du comparateur : < 0 → a avant b ; 0 → égaux ; > 0 → a après b.\n   Premier réflexe : caster void* vers le type réel. */\nint cmp_prix_croissant(const void *a, const void *b) {\n    const Produit *pa = a, *pb = b;\n    if (pa->prix_kg < pb->prix_kg) return -1;\n    if (pa->prix_kg > pb->prix_kg) return 1;\n    return 0;\n}\n\nint cmp_stock_decroissant(const void *a, const void *b) {\n    const Produit *pa = a, *pb = b;\n    if (pa->stock > pb->stock) return -1;   /* plus grand d'abord */\n    if (pa->stock < pb->stock) return 1;\n    return 0;\n}\n\nint cmp_nom(const void *a, const void *b) {\n    const Produit *pa = a, *pb = b;\n    return strcmp(pa->nom, pb->nom);        /* strcmp = le bon signe, gratuit */\n}\n\nvoid afficher_inventaire(const char *titre, const Produit p[], int n) {\n    printf(\"== %s ==\\n\", titre);\n    for (int i = 0; i < n; i++)\n        printf(\"  %-12s %6.0f F/kg — %d\\n\", p[i].nom, (double)p[i].prix_kg, p[i].stock);\n}\n\nint main(void) {\n    Produit p[] = {\n        { .nom = \"Sole\",      .prix_kg = 7500.0f, .stock = 3 },\n        { .nom = \"Capitaine\", .prix_kg = 4500.0f, .stock = 12 },\n        { .nom = \"Tilapia\",   .prix_kg = 2500.0f, .stock = 18 },\n        { .nom = \"Thon\",      .prix_kg = 6000.0f, .stock = 8 },\n        { .nom = \"Carpe\",     .prix_kg = 2800.0f, .stock = 20 },\n        { .nom = \"Mulet\",     .prix_kg = 3200.0f, .stock = 15 },\n    };\n    const int n = (int)(sizeof p / sizeof p[0]);\n    afficher_inventaire(\"Initial\", p, n);\n\n    qsort(p, n, sizeof(Produit), cmp_prix_croissant);\n    afficher_inventaire(\"Par prix croissant\", p, n);\n    qsort(p, n, sizeof(Produit), cmp_stock_decroissant);\n    afficher_inventaire(\"Par stock décroissant\", p, n);\n    qsort(p, n, sizeof(Produit), cmp_nom);\n    afficher_inventaire(\"Par nom\", p, n);\n\n    /* trié ⟹ cherchable : bsearch utilise LE MÊME comparateur. */\n    const Produit cle = { .nom = \"Tilapia\" };\n    const Produit *trouve = bsearch(&cle, p, n, sizeof(Produit), cmp_nom);\n    if (trouve) printf(\"Retrouvé : %s à %.0f F/kg\\n\", trouve->nom, (double)trouve->prix_kg);\n    else        printf(\"Introuvable.\\n\");\n    return 0;\n}\n",
                "explain": "Le concept-clé est le pointeur de fonction : cmp_prix_croissant n'est pas appelé PAR TOI — tu donnes son ADRESSE à qsort, et qsort l'appellera des dizaines de fois pendant le tri, sans connaître Produit. C'est la délégation en C, l'ancêtre des lambdas : le moteur est générique, la règle est tienne. D'où le void* : qsort ne peut pas typer ton tableau pour toi, il te rend des void* et tu castes — la discipline du cast-en-première-ligne n'est pas esthétique, elle évite les déréférencements sauvages. Les subtilités comptent : strcmp plutôt qu'une soustraction de char (les chaînes ne sont pas des nombres), comparaisons explicites plutôt que des différences d'entiers (lisibilité + dépassement), et bsearch qui réutilise le même comparateur — une fois le tableau trié, chercher devient log(n). Comprends ce programme et tu as compris le C générique : qsort, bsearch, les callbacks, tout découle de ce même geste « passer l'adresse d'une fonction »."
          },
          "criteria": [
                "Trois tris exacts via qsort + comparateurs castés ; strcmp pour les chaînes.",
                "Connaissances du contrat et du pourquoi (pas de soustraction naïve) verbalisées.",
                "bsearch fonctionnel après tri alphabétique ; zéro warning."
          ],
          "variants": [
                "Ajoute cmp_valeur_stock_decroissant (prix × stock) : la mareyeuse voit d'abord où dort son capital.",
                "Écris cmp_nom_sans_casse avec strcasecmp (POSIX) — note le portage en commentaire.",
                "Défi : passes-en un second critère — prix croissant PUIS nom à égalité — dans un seul comparateur composé."
          ],
          "related": [
                "c-pointeurs-fonctions",
                "c-string-h",
                "c-structures",
                "c-pointeurs-avances",
                "c-tableaux"
          ]
    },
    {
          "id": "exo-c-fichier-csv",
          "level": "inter",
          "title": "Lire et écrire le relevé CSV des livraisons",
          "icon": "csv",
          "minutes": 45,
          "kind": "checklist",
          "setup": "Dossier `c-marche`, fichier `livraisons.c` + un fichier `livraisons.csv` de 8 lignes :\n\n```\nproduit;quantite;prix_unitaire\nGari fin;12;800\nHuile rouge;5;950\nIgname;20;500\n…\n```\n\nCompile : `gcc -Wall -Wextra -std=c11 livraisons.c -o livraisons`.",
          "context": "Le grossiste envoie ses relevés en CSV avec point-virgule (la manie des tableurs francophones avec virgule décimale). La comptable de la coop consolide : total par produit et grand total. Un tableur saurait le faire, certes — mais l'outil qui lit un fichier texte ligne par ligne, c'est l'acte de naissance de tout programme sérieux : fopen, fgets, strtok, fclose. Et l'acte de décès de ceux qui oublient fclose.",
          "statement": "Tu vas écrire un lecteur de CSV textuel rigoureux, puis un écrivain de rapport.\n\n1. `FILE *f = fopen(\"livraisons.csv\", \"r\")` : teste le NULL immédiatement (perror + EXIT_FAILURE) — le fichier absent est le cas le plus courant en production.\n2. Lis ligne par ligne avec `fgets(tampon, sizeof tampon, f)`. Rappelle dans un commentaire pourquoi fgets et pas fscanf(\"%s\") : la ligne entière, borne explicite, jamais de débordement.\n3. Saute l'en-tête (première ligne) proprement. Pour chaque ligne : ` strtok` sur le `;` pour extraire produit, quantité, prix — attention, strtok MODIFIE la chaîne (commentaire !) et une ligne peut manquer de champ : vérifie que les trois tokens existent, sinon affiche « ligne X ignorée » et continue.\n4. Accumule dans un tableau de structs `Ligne { char produit[32]; int quantite; int prix; }` (capacité fixe 64 + commentaire). Convertis avec `atoi` — et mentionne en commentaire sa grande sœur sûre `strtol` qu'on préférera dès l'exercice projet.\n5. Affiche le tableau consolidé : produit, quantité, sous-total — puis le grand total, formaté FCFA avec séparateur de milliers maison (petite fonction d'affichage avec modulo : `4500` → `4 500`).\n6. Écris `rapport.txt` avec `fopen(.., \"w\")` : le même tableau + une ligne « TOTAL : X F » + la date du jour incrustée via `<time.h>` (time + strftime) — le fichier est signé et horodaté comme un vrai rapport de comptable.\n7. Appelle `fclose` sur LES DEUX fichiers, vérifie les retours d'écriture (`fputs`/fprintf renvoient EOF en cas de souci) avec un perror si besoin.\n\nCe qui est évalué : fopen/fgets/strtok avec leurs pièges nommés, la validation de lignes défectueuses, l'écriture de fichier vérifiée, et la fermeture systématique — l'hygiène de fichiers que 90 % des programmes étudiants négligent.",
          "constraints": [
                "Toute ouverture est testée (NULL) + perror + sortie ou branche d'erreur contrôlée.",
                "Lecture par fgets borné ; découpe par strtok avec vérification du nombre de champs.",
                "Aucun buffer plus petit que la ligne possible (tampon 256 octets minimum).",
                "fclose systématique sur les deux fichiers, même en sortie d'erreur (gérer proprement).",
                "Les lignes mal formées sont ignorées et signalées, jamais fatales."
          ],
          "checklist": [
                "Sans le fichier CSV : message d'erreur propre (perror dit la raison système), code de retour 1.",
                "Le programme lit les 8 lignes et affiche les sous-totaux justes (vérifiés à la main).",
                "Une ligne à un seul champ est signalée « ligne X ignorée » sans planter.",
                "Le grand total est exact et formaté « 18 400 F » avec espace.",
                "rapport.txt existe, contient le même tableau + TOTAL + la date du jour.",
                "Double exécution : le rapport est réécrit intégralement, pas concaténé en double.",
                "strtok est commenté comme destructeur de la chaîne source — j'ai testé en passant la même ligne deux fois (commentaire de constat).",
                "Valgrind sur le programme (si installé) ou relecture : aucun fclose oublié, aucun buffer dépassé."
          ],
          "hints": [
                "Le moule de lecture : `char t[256]; if (!fgets(t, sizeof t, f)) break_ou_header; char *prod = strtok(t, \";\"); char *qte = strtok(NULL, \";\"); char *prix = strtok(NULL, \";\"); if (!prod || !qte || !prix) { printf(\"ligne %d ignorée\\n\", ligne); continue; }` — le NULL de strtok rappelle qu'il garde sa position ENTRE les appels.",
                "Le séparateur de milliers maison : écris les blocs de trois chiffres à l'envers dans un tampon avec modulo 1000, ou plus simple : recopie la chaîne du nombre en insérant un espace tous les 3 depuis la droite. Une fonction `void afficher_fcfa(FILE *out, long montant)` sert pour console ET rapport.",
                "La date : `time_t t = time(NULL); char quand[32]; strftime(quand, sizeof quand, \"%Y-%m-%d %H:%M\", localtime(&t));` puis `fprintf(out, \"Rapport du %s\\n\", quand);` — strftime = le printf du temps."
          ],
          "solution": {
                "lang": "c",
                "label": "livraisons.c — solution commentée",
                "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <time.h>\n\ntypedef struct { char produit[32]; int quantite; int prix; } Ligne;\n#define MAX_LIGNES 64          /* capacité FIXE : commentée, assumée */\n\n/* Séparateur de milliers maison : 26500 -> 26 500, pour console ET fichier. */\nvoid afficher_fcfa(FILE *out, long montant) {\n    char n[32], f[48];\n    snprintf(n, sizeof n, \"%ld\", montant);\n    int len = (int)strlen(n), j = 0;\n    for (int i = 0; i < len; i++) {\n        if (i && !((len - i) % 3)) f[j++] = ' ';\n        f[j++] = n[i];\n    }\n    f[j] = '\\0';\n    fprintf(out, \"%s F\", f);\n}\n\nvoid afficher_ligne(FILE *out, const Ligne *l) {\n    fprintf(out, \"%-14s x%-4d \", l->produit, l->quantite);\n    afficher_fcfa(out, (long)l->quantite * l->prix);\n    fputc('\\n', out);\n}\n\nint main(void) {\n    FILE *f = fopen(\"livraisons.csv\", \"r\");\n    if (!f) { perror(\"livraisons.csv\"); return EXIT_FAILURE; }   /* le cas n°1 */\n\n    Ligne lignes[MAX_LIGNES];\n    int n = 0, no = 0;\n    char t[256];\n    while (fgets(t, sizeof t, f)) {          /* fgets : la ligne, bornée */\n        no++;\n        if (no == 1) continue;               /* l'en-tête saute */\n        strtok(t, \"\\n\");                     /* retire le saut de ligne */\n        char *prod = strtok(t, \";\");         /* strtok DÉTRUIT la chaîne */\n        char *qte  = strtok(NULL, \";\");\n        char *px   = strtok(NULL, \";\");\n        if (!prod || !qte || !px || n >= MAX_LIGNES) {\n            printf(\"(ligne %d ignorée)\\n\", no);   /* signalée, pas fatale */\n            continue;\n        }\n        snprintf(lignes[n].produit, sizeof lignes[n].produit, \"%s\", prod);\n        lignes[n].quantite = atoi(qte);      /* strtol : la version sûre, au projet */\n        lignes[n].prix     = atoi(px);\n        n++;\n    }\n    fclose(f);                               /* fermé, même si tout s'est bien passé */\n\n    long total = 0;\n    for (int i = 0; i < n; i++) {\n        afficher_ligne(stdout, &lignes[i]);\n        total += (long)lignes[i].quantite * lignes[i].prix;\n    }\n    printf(\"TOTAL : \");\n    afficher_fcfa(stdout, total);\n    fputc('\\n', stdout);\n\n    FILE *r = fopen(\"rapport.txt\", \"w\");\n    if (r) {\n        char quand[32];\n        time_t mtn = time(NULL);\n        strftime(quand, sizeof quand, \"%Y-%m-%d %H:%M\", localtime(&mtn));\n        fprintf(r, \"Rapport du %s\\n\", quand);\n        for (int i = 0; i < n; i++) afficher_ligne(r, &lignes[i]);\n        fprintf(r, \"TOTAL : \");\n        afficher_fcfa(r, total);\n        fputc('\\n', r);\n        fclose(r);                           /* et le deuxième aussi */\n        puts(\"rapport.txt écrit.\");\n    } else {\n        perror(\"rapport.txt\");\n    }\n    return 0;\n}\n",
                "explain": "Ce programme t'apprend les trois stigmates de la vie avec les fichiers. Stigmate un : fopen peut échouer, toujours, pour une raison bête (le fichier est chez quelqu'un d'autre) — tester le pointeur avec perror n'est pas une formalité, c'est la différence entre un outil et un crash mystérieux. Stigmate deux : strtok est destructeur et à état global — il remplace les « ; » par des \\0 et se souvient où il en était entre deux appels ; comprends-le une fois, tu ne te feras plus jamais surprendre. Stigmate trois : fclose n'est pas optionnel — les tampons d'écriture ne se vident qu'à la fermeture ; oublie-le chez un client dont le serveur coupe brutalement, et ton rapport du jour est vide. Le petit trésor du code est afficher_fcfa(FILE *out, …) qui sert pour stdout ET pour le fichier : en C, un FILE* est une destination générique — formatte une fois, écris partout."
          },
          "criteria": [
                "Lecture fgets/strtok rigoureuse avec lignes défectueuses signalées.",
                "Écriture vérifiée + fermeture systématique ; rapport horodaté.",
                "Totaux exacts, format d'affichage partagé console/fichier."
          ],
          "variants": [
                "Remplace atoi par strtol avec vérification complète (endptr) : toute valeur non numérique devient ligne ignorée.",
                "Consolide les doublons produits : deux lignes « Gari fin » fusionnent en une seule quantité.",
                "Défi : supporte le séparateur virgule ET point-virgule automatiquement (sniffer la première ligne)."
          ],
          "related": [
                "c-fichiers",
                "c-chaines",
                "c-string-h",
                "c-structures",
                "c-erreurs-memoire"
          ]
    },
    {
          "id": "exo-c-gestion-stock",
          "level": "projet",
          "title": "Gestionnaire de stock : malloc, fichiers binaires, valgrind propre",
          "icon": "precision_manufacturing",
          "minutes": 120,
          "kind": "checklist",
          "setup": "Projet `c-depot` :\n\n```\nc-depot/\n├── stock.h       # struct, prototypes\n├── stock.c       # fonctions du stock (tableau dynamique)\n├── fichier.c     # sauvegarde/chargement binaire\n├── main.c        # menu\n└── Makefile      # gcc -Wall -Wextra -std=c11 -g\n```\n\nInstalle valgrind si possible (`sudo apt install valgrind`) — l'exigence finale : `valgrind --leak-check=full ./depot` sans la moindre perte.",
          "context": "Le dépôt de boissons de Fifadji veut enfin son vrai programme : inventaire qui grandit sans limite fixe, sauvegarde résistante aux coupures de courant (la panne de 19 h, il la connaît), et sortie programmée sans laisser un octet de mémoire traîner. C'est l'examen du module C : malloc/realloc/free, fichiers binaires, et la discipline valgrind qui sépare celui qui écrit du C de celui qui espère du C.",
          "statement": "Tu vas construire le gestionnaire complet, en quatre fichiers, avec mémoire dynamique et persistance binaire.\n\n1. **stock.h** : struct `Produit { char nom[32]; float prix; int quantite; }` ; struct `Stock { Produit *items; int n; int capacite; }` ; prototypes : `stock_init`, `stock_ajouter`, `stock_supprimer`, `stock_chercher`, `stock_liberer`, `sauvegarder_binaire`, `charger_binaire`. Include guard `#ifndef STOCK_H / #define / #endif`.\n2. **stock.c — le tableau dynamique** : `stock_init(Stock *s)` (items=NULL, n=0, capacite=0). `stock_ajouter` : si `n == capacite`, **doubler** la capacité (`realloc` vers 8, 16, 32…) — commente l'amortissement : les réallocations deviennent rares, coût moyen constant. TESTE le retour de realloc AVEC UNE VARIABLE TEMPORAIRE (`Produit *tmp = realloc(s->items, …); if (!tmp) { … } s->items = tmp;`) — réaffecter directement perd le pointeur original en cas d'échec : fuite + crash. `stock_supprimer(indice)` : décale les éléments suivants (memmove) et décrémente n (inutile de rétrécir : commente pourquoi).\n3. **fichier.c — binaire** : `int sauvegarder_binaire(const Stock *s, const char *chemin)` : ouvre en \"wb\", écrit d'abord n (`fwrite(&s->n, sizeof n, 1, f)`) puis le bloc des items (`fwrite(s->items, sizeof(Produit), n, f)`) ; vérifie CHAQUE retour de fwrite (== attendu) ; ferme. `charger` : lit n, alloue, lit le bloc, vérifie — fichier absent → stock vide, fichier tronqué → erreur propre sans fuite (libère l'allocation partielle !). Commente les limites du binaire (boutisme, version de struct) — c'est pour un usage local.\n4. **main.c — le menu** : boucle [1] Lister [2] Ajouter [3] Vendre (décrémente avec contrôle de quantité) [4] Supprimer [5] Sauvegarder [0] Quitter. Saisies par `fgets` + `strtol`/`strtof` avec endptr vérifié (scanf %s banni : buffer overflow ambulant — commentaire !). Chargement automatique au démarrage, proposition de sauvegarde à la sortie si modifications non enregistrées (flag `modifie`).\n5. **Makefile** : règles propre/all/run, flags `-Wall -Wextra -std=c11 -g`. Le -g garde les symboles pour valgrind.\n6. **Le verdict valgrind** : ajoute 50 produits, vends, supprimes, sauvegarde, quitte SANS sauvegarder, relance, recharge, quitte en sauvegardant — `valgrind --leak-check=full --error-exitcode=1 ./depot` doit dire « All heap blocks were freed — no leaks are possible » sur les DEUX scénarios de sortie. Chaque octet malloc a un free en face, sur TOUTES les branches, y compris EOF brutal dans le menu.\n\nCe qui est évalué : realloc-sûr + croissance amortie, fwrite/fread vérifiés, saisie blindée (strtol, jamais scanf dangereux), include guards, Makefile, et surtout l'hygiène mémoire prouvée par valgrind — pas par espoir.",
          "constraints": [
                "realloc via variable temporaire ; croissance par doublement ; chaque malloc/realloc testé.",
                "Aucun scanf de chaîne : saisies par fgets + strtol/strtof avec validation endptr.",
                "Chaque fwrite/fread dont le retour compte est vérifié ; fichier tronqué géré sans fuite.",
                "Toute sortie (quitter, erreur fatale) passe par stock_liberer — valgrind l'exigera.",
                "Include guards, séparation .h/.c., Makefile fonctionnel : 'make' compile tout, 'make clean' nettoie."
          ],
          "checklist": [
                "make compile les 4 fichiers en une commande et produit ./depot.",
                "Ajout de 50 produits : capacité grandit (visible si je logue n/capacite) et tous les produits sont listés correctement.",
                "Suppression au milieu : la liste reste cohérente, sans trou ni décalage.",
                "Sauvegarder, quitter, relancer : l'inventaire est restauré à l'identique (prix aux centimes près).",
                "Tronquer volontairement le fichier (couper en deux) → message d'erreur propre, stock vide, et valgrind ne montre aucune fuite sur cette branche.",
                "Entrée clavier absurde (« abc » quand une quantité est attendue) : refus poli, re-saisie, pas de boucle folle.",
                "valgrind --leak-check=full : 'All heap blocks were freed' en quittant avec ET sans sauvegarde préalable.",
                "J'ai dans stock.c le commentaire de l'amortissement, et dans main.c celui qui condamne scanf(\"%s\") en production."
          ],
          "hints": [
                "Le doublement sûr : `if (s->n == s->capacite) { int nc = s->capacite ? s->capacite * 2 : 8; Produit *tmp = realloc(s->items, (size_t)nc * sizeof *tmp); if (!tmp) { fprintf(stderr, \"Mémoire épuisée\\n\"); return 0; } s->items = tmp; s->capacite = nc; }` — le stock de la variable temporaire, c'est la mémoire qui vous salue.",
                "La saisie blindée : `char t[64]; if (!fgets(t, sizeof t, stdin)) …; char *fin; long v = strtol(t, &fin, 10); if (fin == t || *fin != '\\n') → ressaisie;` — fin == t : rien lu ; *fin non '\\n' : lettres collées après le nombre.",
                "Le menu qui fuit : un `case 0: stock_liberer(&s); return 0;` ET un `if (feof(stdin))` qui fait pareil sur Ctrl+D — chaque chemin de sortie libère. valgrind --error-exitcode=1 transforme l'oubli en échec de test : tu ne rateras plus rien."
          ],
          "solution": {
                "lang": "c",
                "label": "stock.c + fichier.c — extraits commentés",
                "code": "/* ========== stock.c — croissance amortie, realloc sûre ==========*/\nint stock_ajouter(Stock *s, Produit p) {\n    if (s->n == s->capacite) {\n        int nc = s->capacite ? s->capacite * 2 : 8;   /* doublement */\n        Produit *tmp = realloc(s->items, (size_t)nc * sizeof *tmp);\n        if (!tmp) {\n            /* realloc a échoué : s->items est TOUJOURS valide et libérable. */\n            fprintf(stderr, \"Mémoire épuisée\\n\");\n            return 0;\n        }\n        s->items = tmp;\n        s->capacite = nc;\n    }\n    s->items[s->n++] = p;\n    return 1;\n}\n\nvoid stock_supprimer(Stock *s, int indice) {\n    if (indice < 0 || indice >= s->n) return;\n    /* memmove gère le chevauchement — copier à la main boucle-avant casserait. */\n    memmove(&s->items[indice], &s->items[indice + 1],\n            (size_t)(s->n - indice - 1) * sizeof(Produit));\n    s->n--;\n    /* on NE rétrécit PAS la capacité : realloc coûte, le trou se remplira. */\n}\n\nvoid stock_liberer(Stock *s) {\n    free(s->items);\n    s->items = NULL;   /* libéré ET neutralisé : double-free impossible */\n    s->n = s->capacite = 0;\n}\n\n/* ========== fichier.c — binaire vérifié ==========*/\nint sauvegarder_binaire(const Stock *s, const char *chemin) {\n    FILE *f = fopen(chemin, \"wb\");\n    if (!f) { perror(chemin); return 0; }\n    int ok = fwrite(&s->n, sizeof s->n, 1, f) == 1\n          && fwrite(s->items, sizeof(Produit), (size_t)s->n, f) == (size_t)s->n;\n    if (fclose(f) != 0) ok = 0;    /* le vidage final peut aussi échouer */\n    return ok;\n}\n\nint charger_binaire(Stock *s, const char *chemin) {\n    FILE *f = fopen(chemin, \"rb\");\n    if (!f) return 0;                       /* absent : pas une erreur */\n    int n = 0;\n    if (fread(&n, sizeof n, 1, f) != 1 || n < 0 || n > 100000) { fclose(f); return 0; }\n    Produit *items = malloc((size_t)n * sizeof *items);\n    if (!items) { fclose(f); return 0; }\n    if (fread(items, sizeof(Produit), (size_t)n, f) != (size_t)n) {\n        free(items);                        /* TRONQUÉ : on libère ! */\n        fclose(f);\n        return 0;\n    }\n    fclose(f);\n    free(s->items);                         /* on remplace l'ancien stock */\n    s->items = items; s->n = s->capacite = n;\n    return 1;\n}\n",
                "explain": "Tout ce que le C t'a appris se dépose dans ces lignes. La variable temporaire de realloc est LA leçon n°1 : une réaffectation directe en cas d'échec condamne le pointeur original — fuite garantie, valgrind te le chante. Le doublement de capacité est la leçon n°2 : on ne realloc pas à chaque produit, on double — les coûteuses copies deviennent de plus en plus rares, le coût moyen par ajout tend vers une constante (compte-le : pour 64 produits, 6 réallocations). memmove est la leçon n°3 : décaler un tableau vers la gauche recouvre la zone lue ; memcpy est interdit sur chevauchement, memmove est fait pour. Et charger_binaire illustre le réflexe ultime : sur TOUTE branche d'erreur, libère ce que tu as alloué — le free NULL-tolérant et le NULL après free ferment la porte aux doubles libérations. Quand valgrind répond « All heap blocks were freed », tu n'as pas « fini l'exercice » : tu as démontré une propriété de ton programme. C'est une autre planète de rigueur que les langages qui pensent pour toi — et elle te rend meilleur partout."
          },
          "criteria": [
                "Programme complet : menu robuste, tableau dynamique, persistance binaire, Makefile.",
                "realloc sûre + amortie ; saisies blindées ; codes d'erreur fichiers respectés.",
                "valgrind sans AUCUNE fuite sur toutes les branches de sortie testées."
          ],
          "variants": [
                "Ajoute la sauvegarde incrémentale : à chaque modification, numérotation depot-001.dat, depot-002.dat…",
                "Ajoute une recherche dichotomique si le stock est maintenu trié par nom (bsearch de l'exo 3, revue).",
                "Défi : version texte du fichier en parallèle du binaire (export CSV lisible par la comptable)"
          ],
          "related": [
                "c-malloc-free",
                "c-valgrind",
                "c-fichiers-binaires",
                "c-erreurs-memoire",
                "c-string-h",
                "c-structures"
          ]
    }
  ]
};
