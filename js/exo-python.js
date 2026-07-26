/* ============================================================
   exo-python.js — Exercices pratiques : Python
   Validation : checklist d'auto-évaluation (scripts locaux : python3 fichier.py).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.python = {
  module: 'python',
  list: [
{
    "id": "exo-py-caisse",
    "level": "fonda",
    "title": "La calculatrice de la caisse",
    "icon": "calculate",
    "free": true,
    "minutes": 25,
    "kind": "checklist",
    "setup": "Vérifie Python 3.10+ (`python3 --version`). Crée un dossier `py-caisse` et un fichier `caisse.py`. Lance-le avec `python3 caisse.py`.",
    "context": "Au comptoir du supermarché Erevan d'Abomey-Calavi, la caissière calcule de tête : 3 sacs de riz à 12 500, 2 huiles à 1 750, la remise fidélité de 5 %… Un soir de pluie, une erreur de 2 000 F fausse la caisse. Direction Python : un script qui calcule tête reposée, avec ses fonctions et ses tours de boucle bien à lui.",
    "statement": "Tu vas écrire un mini-programme de caisse en console, propre et découpé.\n\n1. Définis un panier de test : une **liste de tuples** `(nom, quantité, prix_unitaire)` — 4 articles du quotidien (riz 50 kg, huile 5 L, savon, spaghetti).\n2. Écris trois fonctions : `sous_total(qte, prix) -> int` ; `appliquer_remise(total, taux=5) -> int` (renvoie le total remisé, **arrondi** au franc avec `round`) ; `fcfa(montant) -> str` qui formate `12 500 F` (séparateur d'espace — pense au formatage des f-strings ou à une boucle maison).\n3. Boucle sur le panier : affiche une ligne par article (`savon x3 — 2 250 F`), cumule le total brut.\n4. Affiche : total brut, remise (montant déduit), **total net**, et le nombre total d'articles (somme des quantités).\n5. Protège l'arrondi : la remise se calcule sur le brut, le net est entier, et ton script doit donner pour le panier de test un résultat que tu vérifies à la calculatrice.\n6. Termine par le garde-fou classique `if __name__ == \"__main__\":` autour du code de démonstration, pour que tes fonctions soient **importables** sans effet de bord (c'est ce qui permettra à un futur `pytest` de les tester).\n\nCe qui est évalué : le découpage en fonctions pures, les boucles qui cumulent proprement, le formatage, et la ritualité `__main__`. C'est petit, et c'est exactement la discipline d'un script utile au quotidien.",
    "constraints": [
        "Trois fonctions au minimum, chacune avec un seul rôle et un type de retour cohérent.",
        "Aucune variable globale modifiée par les fonctions : tout passe par paramètres et retours.",
        "Les montants restent des entiers (FCFA), la remise arrondie avec round().",
        "Le bloc d'essai est protégé par if __name__ == \"__main__\".",
        "La sortie console est alignée et lisible (colonne des montants cohérente)."
    ],
    "checklist": [
        "`python3 caisse.py` s'exécute sans erreur et affiche le ticket complet.",
        "Le total brut vaut exactement la somme des sous-totaux calculée à la main.",
        "La remise de 5 % est correcte à 1 F près (round, pas de troncature sauvage).",
        "`fcfa(12500)` renvoie exactement « 12 500 F » et `fcfa(500)` renvoie « 500 F ».",
        "Importer le module dans le REPL (`python3 -i caisse.py` ou `import caisse` sans exécution) : les fonctions sont utilisables, rien ne s'imprime deux fois grâce au __main__.",
        "Changer le taux par défaut à 10 % ne demande qu'une modification d'appel, pas du corps de la fonction.",
        "Ajouter un 5e article au panier change tous les totaux sans toucher au code des fonctions.",
        "Le code contient zéro duplication : deux lignes d'affichage d'articles ne sont jamais copiées-collées."
    ],
    "hints": [
        "Le formatage sans souffrir : `f\"{montant:,}\".replace(\",\", \" \") + \" F\"` — le format `:,` met les virgules anglaises, on les remplace par des espaces. Pour garder un entier, assure-toi d'avoir un int avant de formater.",
        "Le cumul : `total_brut = sum(sous_total(q, p) for _, q, p in panier)` — l'underscore signale une valeur ignorée. Une compréhension de générateur dans sum, c'est le Python idiomatique que l'on attend de toi.",
        "Le __main__ : mets l'affichage du ticket dans une fonction `main()`, puis `if __name__ == \"__main__\": main()`. Ainsi `import caisse` ne lance rien, mais `caisse.fcfa(12500)` répond — et pytest pourra tester chaque fonction isolément."
    ],
    "solution": {
        "lang": "py",
        "label": "caisse.py — solution commentée",
        "code": "\n# La caisse du supermarché : trois fonctions pures, un main décoratif.\nPANIER = [\n    (\"Riz parfumé 50 kg\", 1, 12500),\n    (\"Huile végétale 5 L\", 2, 1750),\n    (\"Savon de Marseille\", 3, 750),\n    (\"Spaghetti (carton)\", 1, 2400),\n]\n\ndef sous_total(qte: int, prix: int) -> int:\n    # Le sous-total : quantité × prix, tout en entiers FCFA.\n    return qte * prix\n\ndef appliquer_remise(total: int, taux: float = 5.0) -> int:\n    # Total remisé, arrondi au franc le plus proche (round, jamais int()).\n    return round(total * (1 - taux / 100))\n\ndef fcfa(montant: int) -> str:\n    # « 12500 » devient « 12 500 F » : format anglais puis espaces.\n    return f\"{montant:,}\".replace(\",\", \" \") + \" F\"\n\ndef main() -> None:\n    total_brut = sum(sous_total(qte, prix) for _, qte, prix in PANIER)\n    total_net = appliquer_remise(total_brut)\n    nb_articles = sum(qte for _, qte, _ in PANIER)\n    for nom, qte, prix in PANIER:\n        print(f\"{nom:<22} x{qte:<3} {fcfa(sous_total(qte, prix)):>12}\")\n    print(\"-\" * 44)\n    print(f\"{'Total brut':<27} {fcfa(total_brut):>12}\")\n    print(f\"{'Remise fidélité (5 %)':<27} -{fcfa(total_brut - total_net):>11}\")\n    print(f\"{'TOTAL NET':<27} {fcfa(total_net):>12}\")\n    print(f\"({nb_articles} articles)\")\n\nif __name__ == \"__main__\":\n    main()\n",
        "explain": "Trois réflexes de pro. D'abord les fonctions pures : sous_total, appliquer_remise et fcfa ne lisent rien, ne modifient rien autour d'elles — on peut les tester séparément, les réutiliser, les raisonner sans contexte. Ensuite l'argent en entiers : les floats ont des arrondis binaires (0.1 + 0.2 ≠ 0.3) ; en restant en FCFA entiers et en arrondissant une seule fois avec round, tu contrôles la précision. Enfin le garde __main__ : c'est la frontière entre la bibliothèque (tes fonctions) et le spectacle (le ticket affiché) — demain, pytest importera tes fonctions sans que la caisse ne s'anime dans la console."
    },
    "criteria": [
        "Le ticket complet s'affiche, juste à la calculatrice, avec formatage propre.",
        "Fonctions pures, argent entier, remise arrondie une seule fois.",
        "Module importable sans effet de bord grâce au __main__."
    ],
    "variants": [
        "Ajoute `tva(montant_ht, taux=18)` et affiche HT/TVA/TTC sur le ticket.",
        "Fais lire le panier depuis un fichier texte `panier.txt` (un article par ligne : nom;qté;prix).",
        "Défi : écris trois tests unitaires simples avec assert dans `test_caisse.py` et lance-les avec pytest."
    ],
    "related": [
        "py-bases",
        "py-fonctions",
        "py-chaines",
        "py-structures"
    ]
},
{
    "id": "exo-py-comptage-mots",
    "level": "fonda",
    "title": "Compter les mots du prix du jour",
    "icon": "spellcheck",
    "minutes": 30,
    "kind": "checklist",
    "setup": "Dans le dossier `py-caisse` (ou un nouveau dossier `py-mots`), crée `communique.txt` avec un texte réaliste de 8-10 lignes : le communiqué de la coopérative annonçant les prix de la semaine au marché Dantokpa (gari 800 F, igname 500 F la barre, huile rouge 950 F le litre…). Crée `mots.py`.",
    "context": "La coopérative publie chaque lundi un communiqué de prix. Le trésorier veut savoir : quels mots reviennent le plus ? Quelle est la longueur moyenne des phrases ? Un mini outil d'analyse de texte te fera toucher du doigt les dictionnaires, les compréhensions et le tri — le trio gagnant du Python quotidien.",
    "statement": "Tu vas écrire un analyseur de texte en console.\n\n1. Lis le fichier avec `open(..., encoding=\"utf-8\")` dans un `with` — jamais de fichier mal fermé.\n2. Normalise : `lower()`, puis remplace la ponctuation (,.;:!?«») par des espaces pour ne pas confondre « gari » et « gari, ». Le `str.translate` avec `str.maketrans` est parfait ; une boucle de `replace` est acceptée pour démarrer.\n3. Découpe en mots avec `split()` et compte les occurrences dans un dictionnaire `compte: dict[str, int]` (boucle classique avec `compte[mot] = compte.get(mot, 0) + 1`, puis essaie `collections.Counter` pour comparer).\n4. Ignore les mots de moins de 3 lettres pour les statistiques (le, la, du ne disent rien du marché).\n5. Affiche : nombre total de mots, nombre de mots distincts, les **5 mots les plus fréquents** (triés par fréquence décroissante puis alphabétique à égalité), et la longueur moyenne des mots arrondie à une décimale.\n6. Affiche aussi la phrase la plus longue du communiqué (découpe les phrases sur le point) et sa longueur en mots.\n\nCe qui est évalué : la lecture de fichiers sûre, la normalisation avant statistiques (l'erreur classique est de compter « Gari » et « gari » séparément), le dictionnaire comme compteur, et le tri à plusieurs critères avec `key=`.",
    "constraints": [
        "Le fichier est ouvert avec with + encoding explicite utf-8.",
        "La casse et la ponctuation sont normalisées AVANT le comptage.",
        "Le tri des 5 premiers mots est déterministe : fréquence décroissante, puis alphabétique en cas d'égalité.",
        "Les mots < 3 lettres exclus des statistiques de fréquence.",
        "Le programme s'arrête proprement avec un message clair si le fichier est absent (FileNotFoundError attrapée)."
    ],
    "checklist": [
        "Le programme affiche les totaux (mots, mots distincts) cohérents avec le fichier.",
        "« Gari » en début de phrase et « gari » ailleurs ne comptent qu'une seule entrée.",
        "« gari, » (virgule collée) n'existe pas comme mot distinct dans les résultats.",
        "Le top 5 est stable : deux exécutions donnent la même liste, égalités comprises.",
        "La moyenne des longueurs est affichée avec une décimale.",
        "La phrase la plus longue s'affiche, correctement identifiée.",
        "Renommer le fichier provoque un message d'erreur poli, pas une traceback brute.",
        "J'ai une version dict.get ET une version Counter, et je sais dire laquelle je préfère et pourquoi."
    ],
    "hints": [
        "La normalisation efficace : `table = str.maketrans(\"\", \"\", \",.;:!?\\\"'«»…\")` puis `texte.lower().translate(table)`) — le troisième argument de maketrans liste les caractères À SUPPRIMER. Le reste n'est que split().",
        "Le tri à deux critères : `top = sorted(compte.items(), key=lambda kv: (-kv[1], kv[0]))[:5]` — le moins devant la fréquence inverse le tri (décroissant), le mot ensuite en croissant. Une tuple key compare élément par élément : c'est tout l'astuce.",
        "Les phrases : `phrases = [p.strip() for p in texte.split(\".\") if p.strip()]`, puis `max(phrases, key=lambda p: len(p.split()))`. Attention aux accents : en utf-8, tout fonctionne — c'est pour ça que l'encodage explicite est non négociable."
    ],
    "solution": {
        "lang": "py",
        "label": "mots.py — solution commentée",
        "code": "\nfrom collections import Counter\nfrom pathlib import Path\n\nFICHIER = Path(\"communique.txt\")\nPONCTUATION = \",.;:!?\\\"'«»…()-\"\n\ndef lire_texte(chemin: Path) -> str:\n    # Lecture sûre : with garantit la fermeture, utf-8 garantit les accents.\n    try:\n        with chemin.open(encoding=\"utf-8\") as f:\n            return f.read()\n    except FileNotFoundError:\n        raise SystemExit(f\"Fichier introuvable : {chemin} — placez communique.txt ici.\")\n\ndef mots_normalises(texte: str) -> list[str]:\n    # Casse + ponctuation d'abord, split ensuite : « Gari, » == « gari ».\n    table = str.maketrans(\"\", \"\", PONCTUATION)\n    return texte.lower().translate(table).split()\n\ndef main() -> None:\n    texte = lire_texte(FICHIER)\n    mots = mots_normalises(texte)\n    significatifs = [m for m in mots if len(m) >= 3]\n    compte = Counter(significatifs)\n\n    print(f\"Mots totaux       : {len(mots)}\")\n    print(f\"Mots distincts    : {len(set(mots))}\")\n    print(\"Top 5 :\")\n    # tri à 2 critères : fréquence décroissante (-n), puis alphabétique.\n    for mot, n in sorted(compte.items(), key=lambda kv: (-kv[1], kv[0]))[:5]:\n        print(f\"  {mot:<15} {n} fois\")\n    if significatifs:\n        moyenne = sum(len(m) for m in significatifs) / len(significatifs)\n        print(f\"Longueur moyenne  : {moyenne:.1f} lettres\")\n    phrases = [p.strip() for p in texte.split(\".\") if p.strip()]\n    if phrases:\n        plus_longue = max(phrases, key=lambda p: len(p.split()))\n        print(f\"Phrase la plus longue ({len(plus_longue.split())} mots) :\")\n        print(f\"  « {plus_longue} »\")\n\nif __name__ == \"__main__\":\n    main()\n",
        "explain": "L'ordre des opérations est toute la leçon : normaliser AVANT de compter, sinon tu comptes des variantes de surface, pas des mots. lower() règle la casse, translate règle la ponctuation collée — seulement après, split découpe. Le tri `key=lambda kv: (-kv[1], kv[0])` est le deuxième trésor : une clé-tuple donne un tri multi-critères, et le signe moins inverse élégamment le sens numérique. Counter te fait gagner quatre lignes de dict.get ; le jour où tu dois Pondérer ou exclure, la boucle manuelle revient — connais les deux. Enfin SystemExit pour l'erreur de fichier : un message utile pour la personne qui lance le script à 7 h du matin vaut mieux qu'une traceback de 30 lignes."
    },
    "criteria": [
        "Statistiques correctes et stables sur le communiqué (totaux, top 5, moyennes, phrase la plus longue).",
        "Normalisation efficace : casse et ponctuation ne polluent pas les résultats.",
        "Code idiomatique : with, compréhensions, clef de tri, erreur fichier gérée proprement."
    ],
    "variants": [
        "Supporte plusieurs fichiers passés en arguments : `python3 mots.py lundi.txt mardi.txt` (sys.argv).",
        "Sauvegarde le top 20 dans `rapport.txt`, un mot par ligne avec sa fréquence.",
        "Défi : compte les BIGRAMMES (paires de mots adjacents) et affiche les 5 plus fréquentes."
    ],
    "related": [
        "py-chaines",
        "py-structures",
        "py-fichiers",
        "py-comprehensions",
        "py-exceptions"
    ]
},
{
    "id": "exo-py-stock-classe",
    "level": "inter",
    "title": "La classe Stock de la boutique",
    "icon": "inventory",
    "minutes": 40,
    "kind": "checklist",
    "setup": "Nouveau dossier `py-boutique`, fichier `stock.py`. Tu vas y faire vivre une vraie classe Python, avec dataclass pour les produits et du typage honnête.",
    "context": "La boutique de Madame Kpovi à Cadjèhoun vend 200 références. Jusqu'ici, le stock « existe » dans un cahier. Tu vas le modéliser : des objets Produit, une classe Stock qui les gère, des méthodes qui racontent le métier (approvisionner, vendre, alerter sur les ruptures). L'orienté objet, enfin utile.",
    "statement": "Tu vas modéliser le stock avec deux classes et une interface console minimale.\n\n1. `@dataclass class Produit` : `reference: str`, `nom: str`, `prix: int`, `quantite: int`. Ajoute une propriété `valeur` (prix × quantité) et une méthode `__post_init__` qui valide : prix > 0, quantité ≥ 0, sinon `ValueError` avec message explicite.\n2. `class Stock` : encapsule un **dict interne** `reference -> Produit`. Méthodes : `ajouter(produit)` (refuse une référence déjà présente), `vendre(reference, qte)` (décrémente ; refuse si produit inconnu ou quantité insuffisante — lève `KeyError`/`ValueError` avec messages parlants), `approvisionner(reference, qte)`, `ruptures()` (liste des produits à quantité 0), `valeur_totale() -> int`.\n3. Respecte l'encapsulation : le dict interne est « privé » (`self._produits`), et tout accès passe par les méthodes. Explique dans un commentaire pourquoi on n'expose pas le dict directement (invariants à protéger).\n4. Écris `__repr__` pour Produit et `__len__` pour Stock (`len(stock)` = nombre de références) — les dunders qui rendent tes objets civilisés.\n5. Ajoute une **propriété de classe** : `Stock.alerte_seuil = 3` et une méthode `a_commander()` qui liste les produits sous ce seuil.\n6. Démontre dans un `main()` : création de 5 produits, ventes, une tentative de vente impossible (capturée et affichée), ruptures, à commander, valeur totale du stock formatée FCFA.\n\nCe qui est évalué : le choix des structures (dict pour l'accès par référence !), les invariants protégés par l'interface, la validation dans __post_init__, les exceptions parlantes, et les petites touches pythoniques (dataclass, propriétés, dunders).",
    "constraints": [
        "Produit est une dataclass ; Stock encapsule un dict privé, aucun accès direct depuis l'extérieur.",
        "Chaque erreur métier lève une exception avec un message que la caissière comprendrait.",
        "Aucun état incohérent possible : quantités jamais négatives, références uniques.",
        "La démonstration se déroule dans main() sous la garde __main__.",
        "Type hints sur toutes les signatures publiques."
    ],
    "checklist": [
        "Vendre plus que le stock disponible lève une erreur claire, ne passe jamais en négatif.",
        "Ajouter deux fois la même référence est refusé explicitement.",
        "repr(produit) affiche quelque chose d'utile pour déboguer en une ligne.",
        "len(stock) renvoie le nombre de références, comme pour les collections natives.",
        "ruptures() et a_commander() donnent des listes correctes sur le jeu de démonstration.",
        "valeur_totale() est exacte (vérifiée à la main sur les 5 produits).",
        "Modifier le seuil de classe change immédiatement le résultat de a_commander().",
        "Un Produit au prix 0 ou à la quantité -4 est rejeté dès la construction."
    ],
    "hints": [
        "La validation dataclass : `def __post_init__(self):` s'exécute juste après l'__init__ généré — `if self.prix <= 0: raise ValueError(f\"{self.nom} : le prix doit être positif\")`. L'invariant vit au plus près de la création de l'objet.",
        "Le dict contre la liste : chercher « réf AB-12 » dans une liste, c'est O(n) à chaque vente ; dans un dict, O(1). `self._produits: dict[str, Produit] = {}` et les méthodes lisent `self._produits.get(reference)`.",
        "Les dunders utiles : `def __repr__(self): return f\"Produit({self.reference!r}, qte={self.quantite})\"` et sur Stock `def __len__(self): return len(self._produits)`. Python reconnaît ces noms spéciaux et les branche sur repr() et len() automatiquement."
    ],
    "solution": {
        "lang": "py",
        "label": "stock.py — solution commentée",
        "code": "\nfrom dataclasses import dataclass\n\n@dataclass\nclass Produit:\n    reference: str\n    nom: str\n    prix: int\n    quantite: int\n\n    def __post_init__(self):\n        # Les invariants vivent ICI : impossible de naître incohérent.\n        if self.prix <= 0:\n            raise ValueError(f\"{self.nom} : le prix doit être positif\")\n        if self.quantite < 0:\n            raise ValueError(f\"{self.nom} : la quantité ne peut être négative\")\n\n    @property\n    def valeur(self) -> int:\n        return self.prix * self.quantite\n\n    def __repr__(self):\n        return f\"Produit({self.reference!r}, {self.nom!r}, qte={self.quantite})\"\n\n\nclass Stock:\n    alerte_seuil: int = 3          # attribut de CLASSE : partagé, réglable\n\n    def __init__(self):\n        # « privé » par convention : l'interface protège les invariants.\n        self._produits: dict[str, Produit] = {}\n\n    def ajouter(self, produit: Produit) -> None:\n        if produit.reference in self._produits:\n            raise ValueError(f\"Référence déjà présente : {produit.reference}\")\n        self._produits[produit.reference] = produit\n\n    def vendre(self, reference: str, qte: int) -> None:\n        if reference not in self._produits:\n            raise KeyError(f\"Produit inconnu : {reference}\")\n        p = self._produits[reference]\n        if qte > p.quantite:\n            raise ValueError(f\"{p.nom} : stock insuffisant ({p.quantite} restant)\")\n        p.quantite -= qte\n\n    def approvisionner(self, reference: str, qte: int) -> None:\n        if reference not in self._produits:\n            raise KeyError(f\"Produit inconnu : {reference}\")\n        self._produits[reference].quantite += qte\n\n    def ruptures(self) -> list[Produit]:\n        return [p for p in self._produits.values() if p.quantite == 0]\n\n    def a_commander(self) -> list[Produit]:\n        return [p for p in self._produits.values() if p.quantite <= self.alerte_seuil]\n\n    def valeur_totale(self) -> int:\n        return sum(p.valeur for p in self._produits.values())\n\n    def __len__(self):\n        return len(self._produits)\n",
        "explain": "Ce que cet exercice t'apprend au-delà de la syntaxe : encapsuler, c'est promettre. Le dict _produits n'est jamais exposé, donc personne ne peut écrire stock._produits['AB'].quantite = -99 par accident : toutes les transitions (vendre, approvisionner) passent par des méthodes qui vérifient. La @dataclass t'économise __init__/__eq__ et la propriété valeur fait du calcul à la demande — jamais stocké, jamais désynchronisé. Les attributs de classe comme alerte_seuil sont le bon endroit pour un réglage global : ils changent pour toutes les instances d'un coup. Et les dunders (__repr__, __len__) ne sont pas du folklore : ce sont des conventions qui font que ton objet se comporte « comme du Python », lisible dans le shell et dans les logs."
    },
    "criteria": [
        "Les invariants métier sont inatteignables par l'extérieur : quantités, références et prix protégés.",
        "API lisible : méthodes métier parlantes, exceptions exploitables par l'appelant.",
        "Pythonique : dataclass, propriétés, dunders, type hints, structure dict justifiée."
    ],
    "variants": [
        "Ajoute un historique des ventes : Stock garde une liste de tuples (reference, qte, horodatage) exposée en lecture seule.",
        "Implémente `__contains__` pour écrire `if 'AB-12' in stock:` naturellement.",
        "Défi : sérialise le stock en JSON (`catalogue.json`) et recharge-le au démarrage (avec gestion du fichier absent)."
    ],
    "related": [
        "py-classes",
        "py-structures",
        "py-exceptions",
        "py-typage"
    ]
},
{
    "id": "exo-py-ventes-analyse",
    "level": "inter",
    "title": "Analyser le CSV des ventes de la semaine",
    "icon": "query_stats",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Dossier `py-ventes`. Crée `ventes.csv` (une vingtaine de lignes réalistes) :\n\n```\ndate,boutique,produit,quantite,prix_unitaire\n2026-07-13,Dantokpa,Gari fin,12,800\n2026-07-13,Akassato,Huile rouge 1L,5,950\n…\n```",
    "context": "Le grossiste de Dantokpa exporte chaque samedi ses ventes de la semaine. Le patron pose toujours les mêmes questions : quel produit a cartonné ? Quelle boutique ? Quel jour ? À quand la dernière moyenne par jour ? Plutôt que d'ouvrir un tableur chaque semaine, écrivons le rapport automatique — avec le module csv de la bibliothèque standard, pas besoin de pandas pour ça.",
    "statement": "Tu vas écrire un générateur de rapport hebdomadaire.\n\n1. Lis le CSV avec `csv.DictReader` (dans un `with`, encoding utf-8) : chaque ligne devient un dict — convertis `quantite` et `prix_unitaire` en `int` dès la lecture, avec une fonction `charger_ventes(chemin) -> list[dict]` qui saute les lignes incomplètes en les comptant (affiche « 2 lignes ignorées » si besoin).\n2. Calcule et affiche : **chiffre d'affaires total**, CA par boutique (tri décroissant), **top 3 produits** par CA, CA par date (tri chronologique).\n3. Ajoute les indicateurs de tendance : meilleur jour (date + CA), panier moyen par ligne de vente, quantité totale écoulée.\n4. Regroupe les agrégations dans une fonction `analyser(ventes) -> dict` pure (pas de print dedans !) : elle retourne le rapport calculé, `afficher(rapport)` le présente. Séparer calcul et affichage, c'est ce qui rendra le tout testable et réutilisable.\n5. Utilise `collections.defaultdict(int)` ou `Counter` pour les sommes par groupe, et une compréhension/dict comprehension pour produire les totaux par catégorie.\n6. Termine en écrivant le rapport dans `rapport_semaine.txt` (même contenu que la console) : le patron l'imprime.\n\nCe qui est évalué : la robustesse de la lecture CSV (types, lignes défectueuses), la pureté des fonctions d'analyse, les bons outils du comptage (defaultdict, comprehensions), et la sortie double console + fichier.",
    "constraints": [
        "csv.DictReader + with + utf-8 ; les conversions numériques se font à la lecture.",
        "analyser() ne print pas : elle retourne des données ; afficher() ne calcule pas.",
        "Les lignes invalides sont ignorées et comptées, jamais fatales.",
        "Le rapport est écrit dans un fichier texte en plus de la console.",
        "Les montants sont formatés FCFA à l'affichage uniquement (les calculs restent en int)."
    ],
    "checklist": [
        "Le CA total affiché est exact (vérifié sur le CSV à la main ou avec un tableur).",
        "Le classement des boutiques est trié du plus grand au plus petit CA.",
        "Le top 3 produits est juste, avec les montants associés.",
        "Une ligne avec un prix manquant n'arrête pas le rapport : elle est ignorée et comptabilisée.",
        "analyser() se teste en deux lignes dans le REPL : `analyser(charger_ventes(Path('ventes.csv')))['ca_total']`.",
        "rapport_semaine.txt contient le même texte que la console, accents corrects.",
        "Le meilleur jour affiché correspond bien au maximum du CA journalier.",
        "Ajouter une ligne au CSV et relancer donne des totaux mis à jour, sans toucher au code."
    ],
    "hints": [
        "L'agrégation sans peine : `ca_par_boutique = defaultdict(int)` puis dans la boucle `ca_par_boutique[v['boutique']] += v['quantite'] * v['prix_unitaire']`. Ou en comprehension : `{b: sum(ligne CA if la ligne est de cette boutique) …} — les deux marchent, le defaultdict est plus simple à une passe.",
        "La séparation calcul/affichage : `analyser` retourne `{'ca_total': …, 'par_boutique': dict_trie, 'top_produits': liste_de_tuples, 'par_date': …, 'meilleur_jour': (date, ca), 'panier_moyen': …}`. L'affichage n'est plus qu'une mise en forme de ce dict.",
        "Pour le top produits : accumule les CA par produit dans un defaultdict, puis `sorted(d.items(), key=lambda kv: kv[1], reverse=True)[:3]`. Et le fichier rapport : `Path('rapport_semaine.txt').write_text(texte, encoding='utf-8')` — simple et propre."
    ],
    "solution": {
        "lang": "py",
        "label": "rapport.py — solution commentée",
        "code": "\nimport csv\nfrom collections import defaultdict\nfrom pathlib import Path\n\nFICHIER = Path(\"ventes.csv\")\n\ndef charger_ventes(chemin: Path) -> list[dict]:\n    # Lit le CSV, convertit les nombres, saute les lignes incomplètes.\n    ventes, ignorees = [], 0\n    with chemin.open(encoding=\"utf-8\", newline=\"\") as f:\n        for ligne in csv.DictReader(f):\n            try:\n                ligne[\"quantite\"] = int(ligne[\"quantite\"])\n                ligne[\"prix_unitaire\"] = int(ligne[\"prix_unitaire\"])\n            except (TypeError, ValueError, KeyError):\n                ignorees += 1           # ligne bancale : on la note, on continue\n                continue\n            ligne[\"ca\"] = ligne[\"quantite\"] * ligne[\"prix_unitaire\"]\n            ventes.append(ligne)\n    if ignorees:\n        print(f\"({ignorees} ligne(s) invalide(s) ignorée(s))\")\n    return ventes\n\ndef analyser(ventes: list[dict]) -> dict:\n    # PUR : calcule, ne print jamais. Testable en une ligne de REPL.\n    par_boutique, par_produit, par_date = defaultdict(int), defaultdict(int), defaultdict(int)\n    for v in ventes:\n        par_boutique[v[\"boutique\"]] += v[\"ca\"]\n        par_produit[v[\"produit\"]] += v[\"ca\"]\n        par_date[v[\"date\"]] += v[\"ca\"]\n    tri_desc = lambda d: sorted(d.items(), key=lambda kv: kv[1], reverse=True)\n    return {\n        \"ca_total\": sum(v[\"ca\"] for v in ventes),\n        \"par_boutique\": tri_desc(par_boutique),\n        \"top_produits\": tri_desc(par_produit)[:3],\n        \"par_date\": sorted(par_date.items()),           # chronologique\n        \"meilleur_jour\": max(par_date.items(), key=lambda kv: kv[1]),\n        \"panier_moyen\": round(sum(v[\"ca\"] for v in ventes) / max(len(ventes), 1)),\n    }\n\ndef fcfa(n: int) -> str:\n    return f\"{n:,}\".replace(\",\", \" \") + \" F\"\n\ndef afficher(r: dict) -> str:\n    lignes = [\"RAPPORT HEBDOMADAIRE\", \"=\" * 40,\n              f\"CA total         : {fcfa(r['ca_total'])}\",\n              f\"Meilleur jour    : {r['meilleur_jour'][0]} — {fcfa(r['meilleur_jour'][1])}\",\n              f\"Panier moyen     : {fcfa(r['panier_moyen'])}\", \"\", \"BOUTIQUES :\"]\n    lignes += [f\"  {b:<12} {fcfa(ca):>12}\" for b, ca in r[\"par_boutique\"]]\n    lignes.append(\"TOP 3 PRODUITS :\")\n    lignes += [f\"  {p:<18} {fcfa(ca):>10}\" for p, ca in r[\"top_produits\"]]\n    return \"\\n\".join(lignes)\n\nif __name__ == \"__main__\":\n    rapport = analyser(charger_ventes(FICHIER))\n    texte = afficher(rapport)\n    print(texte)\n    Path(\"rapport_semaine.txt\").write_text(texte, encoding=\"utf-8\")\n",
        "explain": "La leçon structurante : séparer le calcul de la présentation. analyser() est pure — mêmes ventes, même rapport — ce qui la rend testable sans capter la console et réutilisable (demain : une API, un mail automatique). Le defaultdict(int) est ton ami pour toutes les sommes par groupe : plus besoin de tester « la clé existe-t-elle ? » avant d'additionner. Les lignes invalides se traitent une fois, à la frontière (le chargement) : ensuite, tout le code manipule des données propres — c'est le principe « valide tôt, détends-toi ensuite ». Et note le tri : by valeur pour les classements, by clé pour les dates. Deux lambdas, deux intentions — le lecteur comprend en un clin d'œil."
    },
    "criteria": [
        "Rapport console + fichier exacts, triés correctement, formatés proprement.",
        "Séparation stricte chargement / calcul / affichage ; analyser testable isolément.",
        "Robustesse prouvée sur lignes invalides et fichier enrichi sans changement de code."
    ],
    "variants": [
        "Ajoute un argument CLI pour comparer deux semaines : `python3 rapport.py semaine1.csv semaine2.csv` affiche l'évolution en %.",
        "Écris le rapport en HTML simple (tableau stylé) en plus du texte.",
        "Défi : détecte les produits en chute libre (CA en baisse > 30 % vs semaine précédente) avec un encart d'alerte."
    ],
    "related": [
        "py-fichiers",
        "py-structures",
        "py-comprehensions",
        "py-fonctions",
        "py-stdlib"
    ]
},
{
    "id": "exo-py-gestion-coop",
    "level": "projet",
    "title": "Gestion complète de la coopérative (CLI + persistance + tests)",
    "icon": "groups",
    "minutes": 120,
    "kind": "checklist",
    "setup": "Dossier `py-coop` avec cette architecture cible :\n\n```\npy-coop/\n├── coop/\n│   ├── __init__.py\n│   ├── modeles.py      # dataclasses Membre, Versement\n│   ├── depot.py        # persistence JSON (charger/sauvegarder)\n│   ├── operations.py   # règles métier pures\n│   └── cli.py          # interface en ligne de commande\n├── tests/\n│   └── test_operations.py\n└── data/               # créé à la volée\n```\n\nInstalle pytest : `pip install pytest`.",
    "context": "La coopérative de tisserand(e)s d'Abomey en a assez des trois cahiers (membres, cotisations, prêts) qui ne disent jamais la même chose. Tu vas construire l'outil de gestion : un CLI (`python -m coop.cli …`) avec persistance JSON, règles métier testées, et un export CSV pour la comptable. Le module Python entier se retrouve dans ce projet — structure de paquet, exceptions, fichiers, tests.",
    "statement": "Tu vas livrer une gestion de coopérative complète, en couches, testée.\n\n1. **Modèles.** `@dataclass(frozen=True) class Membre` : id (int), nom, quartier, telephone, parts (int, nombre de parts sociales) — validation en `__post_init__` (parts > 0, téléphone non vide). `@dataclass(frozen=True) class Versement` : membre_id, montant, date (str ISO), motif in {'cotisation','part_sociale','remboursement'}.\n2. **Dépôt (couche persistence).** Fonctions `charger() -> tuple[list[Membre], list[Versement]]` et `sauvegarder(membres, versements)` qui lisent/écrivent `data/coop.json` (créer le dossier au besoin ; fichier absent = coopérative vide ; dicts via `dataclasses.asdict` et reconstruction). Aucune règle métier ici : seulement de la sérialisation propre.\n3. **Opérations (métier pur).** `inscrire_membre(membres, nom, quartier, telephone, parts) -> Membre` (id auto = max+1, téléphone unique sinon `CoopError`), `enregistrer_versement(versements, membre_id, montant, date, motif) -> Versement` (montant > 0, membre existant), `situation_membre(membres, versements, membre_id) -> dict` (total cotisé, parts, solde remboursable), `solvables(membres, versements, seuil) -> list[Membre]` (membres ayant cotisé ≥ seuil), `exporter_csv(membres, versements, chemin)`. Définis `class CoopError(Exception)` dans `operations.py` et utilise-la partout pour les erreurs métier.\n4. **CLI.** Sous-commandes : `inscrire`, `verser`, `situation <id>`, `liste`, `solvables --seuil 50000`, `export-chemin.csv`. Utilise `argparse` avec sous-parseurs. Chaque commande charge, applique l'opération, sauvegarde si mutation, et affiche un résultat lisible (coop cli utilise des montants formatés).\n5. **Tests.** `tests/test_operations.py` : au moins 6 tests pytest sur le métier pur (inscription, doublon téléphone refusé, versement négatif refusé, versement sur membre inconnu refusé, situation correcte, solvables filtre bien). Les opérations pures se testent SANS toucher au disque — c'est tout l'intérêt de la séparation ; si tu veux tester le dépôt, utilise `tmp_path` de pytest.\n6. **Finitions.** `python -m coop.cli liste` affiche un tableau aligné ; tous les montants formatés FCFA ; aucune traceback brute côté CLI (CoopError → message rouge lisible, code de sortie 1).\n\nCe qui est évalué : l'architecture en couches (modèles / dépôt / métier / interface), les frozen dataclasses comme valeur immuable, les exceptions métier, argparse propre, et une couverture de tests qui prouve les règles sans dépendre du disque.",
    "constraints": [
        "Aucune règle métier dans cli.py ni dans depot.py : toutes dans operations.py, toutes testées.",
        "Les dataclasses sont frozen : aucun objet modifié après création (les « changements » créent de nouvelles listes).",
        "Toutes les erreurs métier passent par CoopError ; le CLI les traduit en messages polis, jamais de tracebacks.",
        "La persistance tolère le fichier absent et des données anciennes (dicts simples via asdict).",
        "Au moins 6 tests verts, écrits APRÈS mais exécutés AVANT la démonstration finale."
    ],
    "checklist": [
        "`python -m coop.cli inscrire --nom 'Awa Mensah' --quartier Ladji --telephone 97001122 --parts 3` ajoute un membre persistant (visible au prochain `liste`).",
        "Réinscrire le même téléphone échoue proprement (message métier, code 1).",
        "`verser` sur un id inexistant : erreur polie ; sur un membre existant : versement persisté.",
        "`situation 1` affiche total cotisé, parts, décomposition par motif.",
        "`solvables --seuil 50000` ne retient que les membres au-dessus du seuil.",
        "L'export CSV s'ouvre sans corruption dans un tableur (accents OK).",
        "`pytest -v` : 6 tests ou plus, tous verts, aucun ne dépend de l'ordre d'exécution ni d'un état du disque.",
        "Supprimer data/coop.json n'effraie pas l'application : elle repart d'une coopérative vide proprement.",
        "Le code passe un `python -m compileall coop` sans faute et les imports sont sans cycle."
    ],
    "hints": [
        "L'id auto : `nouvel_id = max((m.id for m in membres), default=0) + 1`. Et l'unicité : `if any(m.telephone == telephone for m in membres): raise CoopError(f'Ce téléphone est déjà enregistré : {telephone}')`.",
        "La situation : somme des versements du membre par motif via un defaultdict, `{motif: sum(v.montant for v in versements if v.membre_id == mid and v.motif == motif) for motif in ('cotisation','part_sociale','remboursement')}` plus le total. Frozen obligatoire : tu ne peux pas modifier un versement, tu recrées la liste avec le nouvel élément en plus (`versements + [nouveau]`).",
        "Les sous-commandes : `sous = parser.add_subparsers(dest='commande', required=True)` ; pour chaque commande, `p_inscrire = sous.add_parser('inscrire')` avec ses `--nom` etc. ; `args = parser.parse_args()` puis un dispatch `if args.commande == 'inscrire': …`. Et pour attraper CoopError au niveau du main() : `except CoopError as e: print(f'Erreur : {e}'); sys.exit(1)`."
    ],
    "solution": {
        "lang": "py",
        "label": "operations.py + extraits tests — solution commentée",
        "code": "\n# ========== coop/operations.py — le métier, pur, testable ==========\nfrom dataclasses import dataclass, replace\n\nclass CoopError(Exception):\n    # Erreur métier : le CLI la traduit en message poli.\n\n@dataclass(frozen=True)\nclass Membre:\n    id: int\n    nom: str\n    quartier: str\n    telephone: str\n    parts: int\n\n    def __post_init__(self):\n        if self.parts <= 0:\n            raise CoopError(f\"Parts sociales invalides : {self.parts}\")\n        if not self.telephone.strip():\n            raise CoopError(\"Le téléphone est obligatoire\")\n\ndef inscrire_membre(membres, nom, quartier, telephone, parts):\n    if any(m.telephone == telephone for m in membres):\n        raise CoopError(f\"Téléphone déjà enregistré : {telephone}\")\n    nouvel_id = max((m.id for m in membres), default=0) + 1\n    return Membre(nouvel_id, nom.strip(), quartier.strip(), telephone.strip(), parts)\n\ndef enregistrer_versement(versements, membres, membre_id, montant, date, motif):\n    if membre_id not in {m.id for m in membres}:\n        raise CoopError(f\"Membre inconnu : {membre_id}\")\n    if montant <= 0:\n        raise CoopError(\"Un versement doit être positif\")\n    return Versement(membre_id, montant, date, motif)\n\ndef situation_membre(membres, versements, membre_id):\n    membre = next((m for m in membres if m.id == membre_id), None)\n    if membre is None:\n        raise CoopError(f\"Membre inconnu : {membre_id}\")\n    par_motif = {mot: sum(v.montant for v in versements\n                          if v.membre_id == membre_id and v.motif == mot)\n                 for mot in (\"cotisation\", \"part_sociale\", \"remboursement\")}\n    return {\"membre\": membre, \"par_motif\": par_motif, \"total\": sum(par_motif.values())}\n\n# ========== tests/test_operations.py (extraits) ==========\ndef test_doublon_telephone_refuse():\n    m = inscrire_membre([], \"Awa\", \"Ladji\", \"97001122\", 3)\n    with pytest.raises(CoopError, match=\"déjà\"):\n        inscrire_membre([m], \"Autre\", \"Zongo\", \"97001122\", 1)\n\ndef test_solvables_filtre_correctement():\n    m1 = inscrire_membre([], \"Awa\", \"Ladji\", \"97001122\", 1)\n    m2 = inscrire_membre([m1], \"Berthe\", \"Zongo\", \"96003344\", 2)\n    vers = [enregistrer_versement([], [m1, m2], m1.id, 60000, \"2026-07-01\", \"cotisation\")]\n    assert solvables([m1, m2], vers, 50000) == [m1]\n",
        "explain": "L'architecture est la leçon : quatre couches, quatre promesses. Les modèles garantissent l'immuabilité et la validité dès la naissance (__post_init__ + frozen). Le dépôt sait lire et écrire, rien de plus : si demain JSON devient SQLite, seule cette couche change. Les opérations concentrent TOUTES les règles métier et ne touchent jamais ni disque ni console — c'est pour cela que 6 tests suffisent à prouver le cœur de l'application sans fixture pénible. Le CLI enfin traduit : arguments vers opérations, CoopError vers phrase polie. Ce découpage n'est pas du luxe académique : c'est ce qui te permettra d'ajouter un vrai serveur web plus tard sans réécrire la moindre règle. Et les frozen dataclasses ont un bénéfice discret : plus jamais de bug « qui a modifié ce membre ? » — personne ne peut, il faut en créer un nouveau."
    },
    "criteria": [
        "CLI complet et persistant : inscriptions, versements, situations, solvables, export — tout survit aux relances.",
        "Couches strictement séparées ; les règles métier sont testées sans disque via pytest (6+ tests).",
        "Expérience soignée : erreurs métier polies, sorties alignées, montants FCFA, données corrompues ou absentes gérées."
    ],
    "variants": [
        "Ajoute la commande `pret` qui accorde un prêt si le membre a ≥ 3 versements de cotisation (règle métier + test).",
        "Versionne les données : chaque sauvegarde écrit aussi `data/coop-AAAA-MM-JJ.json` (historique).",
        "Défi : ajoute une commande interactive `python -m coop.cli` (menu REPL) réutilisant les mêmes opérations sans les dupliquer."
    ],
    "related": [
        "py-classes",
        "py-fichiers",
        "py-exceptions",
        "py-modules-packages",
        "py-tests",
        "py-stdlib"
    ]
}
  ]
};
