/* ============================================================
   data-python.js — Contenu pédagogique Python (module complet)
   Couvre : démarrage & interpréteur, types, contrôle, chaînes,
   structures, compréhensions, fonctions (scope), décorateurs,
   générateurs, context managers, typage, POO complète, fichiers,
   exceptions (+ personnalisées), modules/packages, venv/pip,
   bibliothèque standard et introduction aux tests.
   C'est la FONDATION sur laquelle s'appuie le module Flask.
   Même contrat de données (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.python = {
  id: 'python',
  name: 'Python',
  icon: 'terminal',
  tagline: 'Le langage complet : types, contrôle, fonctions, POO, fichiers, stdlib, typage et tests — la fondation de Flask et Django.',
  heroTitle: 'Python, du premier script à l\'architecture',

  categories: [
    /* ======================================================
       1. BIEN DÉMARRER
       ====================================================== */
    {
      id: 'demarrer-py',
      name: 'Bien démarrer',
      icon: 'rocket_launch',
      fiches: [
        {
          id: 'py-demarrage',
          title: 'Installation, interpréteur & premier script',
          icon: 'download',
          level: 'Débutant',
          tagline: 'python --version, le REPL comme laboratoire, et le garde-fou __main__ expliqué une fois pour toutes.',
          intro: 'Avant toute chose : un interpréteur Python récent (3.12+ idéalement), deux façons de lui parler — le **REPL** interactif pour expérimenter, le **fichier `.py`** pour construire — et un garde-fou qu\'on retrouve dans chaque projet sérieux : `if __name__ == "__main__"`. Trente minutes bien investies pour des années de confort.',
          blocks: [
            { t: 'h3', h: 'Installer et vérifier' },
            { t: 'code', lang: 'bash', code:
'# Linux : déjà installé (sudo apt install python3 sinon)\n# macOS : brew install python   (ou python.org)\n# Windows : python.org — [X] COCHER "Add Python to PATH" !\n\npython3 --version     # → Python 3.12.x — DOIT répondre avant d\'aller plus loin\n# Windows : la commande peut s\'appeler "python" ou "py" (py -0 pour lister)' },
            { t: 'h3', h: 'Le REPL : ton laboratoire immédiat' },
            { t: 'code', lang: 'py', code:
'# python3  (sans argument) ouvre le REPL : Read, Eval, Print, Loop\n>>> 2 + 3 * 4\n14\n>>> "cotonou".upper()\n"COTONOU"\n>>> prix = 2500\n>>> prix * 1.18        # chaque expression est ÉVALUÉE puis AFFICHÉE\n2950.0\n# quit() pour sortir. Idéal pour TESTER UNE IDÉE en 10 secondes.' },
            { t: 'p', h: 'Le REPL est parfait pour vérifier une méthode, un format de date, un slicing… mais rien n\'y est sauvegardé : dès que ça dépasse trois lignes, on passe au fichier. Garde un onglet REPL ouvert en permanence — c\'est le réflexe des pythonistes rapides.' },
            { t: 'h3', h: 'Le script : éditer, lancer, recommencer' },
            { t: 'code', lang: 'py', label: 'hello.py', code:
'# Un fichier .py s\'exécute de HAUT EN BAS, ligne par ligne :\nvilles = ["Cotonou", "Parakou", "Natitingou"]\n\nfor i, ville in enumerate(villes, start=1):\n    print(f"{i}. {ville}")\n\nprint("Terminé !")' },
            { t: 'code', lang: 'bash', code:
'python3 hello.py\n# 1. Cotonou\n# 2. Parakou\n# 3. Natitingou\n# Terminé !' },
            { t: 'h3', h: 'if __name__ == "__main__" : le garde-fou' },
            { t: 'code', lang: 'py', code:
'def aire_rect(longueur, largeur):\n    return longueur * largeur\n\nif __name__ == "__main__":\n    # Ce bloc ne s\'exécute QUE si l\'on lance CE FICHIER directement :\n    print(aire_rect(12, 5))         # test manuel de la librairie !' },
            { t: 'p', h: 'Quand un module est **importé**, Python l\'exécute entièrement (c\'est ainsi que ses fonctions existent) — et sa variable spéciale `__name__` vaut alors le NOM du module, pas `"__main__"`. Ce test sépare donc « ce qu\'on réutilise » (les fonctions, importables depuis un test ou depuis Flask) de « ce qu\'on exécute au lancement » (les démos, le `app.run()`). La fiche venv y revient, et la fiche Démarrage du module **Flask** montre pourquoi c\'est vital pour un serveur.' },
            { t: 'h3', h: 'Le venv : la bulle que Flask & Django réutiliseront' },
            { t: 'p', h: 'Dernière notion à poser dès maintenant : Python installe ses paquets « par interpréteur » — sans précaution, deux projets se marchent dessus (l\'un exige flask 2, l\'autre flask 3 : conflit garanti). La solution universelle : une **bulle par projet** — le `venv`, un dossier à créer une fois par projet puis à « activer » : tant qu\'elle est active, `pip` installe DEDANS, jamais dans le système. C\'est l\'équivalent Python du `node_modules/` local, sauf qu\'il faut l\'activer à chaque terminal — les modules **Flask** et **Django** emploient exactement ces mêmes gestes.' },
            { t: 'code', lang: 'bash', label: 'La bulle en trois gestes (le mémo officiel de tous les cours Python du site)', code:
'python3 -m venv .venv           # 1) créer la bulle dans le projet\n.venv\\Scripts\\activate         :: 2) l\'activer — Windows (PowerShell : .ps1)\nsource .venv/bin/activate       # 2) l\'activer — macOS / Linux\n#    → l\'invite affiche « (.venv) » : la preuve que tu es DEDANS.\npip install paquet              # 3) installer — dans la bulle seulement\n#    la quitter : deactivate' },
            { t: 'callout', kind: 'tip', h: 'Retiens `python -m <module>` : `python -m venv .venv`, `python -m pip install flask`, `python -m pytest`. L\'option -m exécute un module AVEC l\'interpréteur appelant — tu ne mélanges jamais les versions ; c\'est la forme à privilégier systématiquement.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Python s\'installe plusieurs fois, une par projet. »** Non : l\'interpréteur s\'installe UNE fois par machine ; chaque projet reçoit seulement une bulle légère — le venv — qui le référence sans le dupliquer.',
              '**« Sous Windows, l\'installeur configure tout seul. »** Seulement si tu coches « Add python.exe to PATH » ; sinon le terminal répond « n\'est pas reconnu ». Case manquée ? Relance l\'installeur : bouton Modify, coche, Apply.',
              '**« pip installe dans mon dossier projet. »** pip installe dans l\'environnement ACTIF à l\'instant T : sans venv activé, le paquet part dans le Python global — d\'où les ModuleNotFoundError alors que « l\'install a réussi ».',
              '**« Le venv reste activé. »** Il se désactive à chaque fermeture du terminal : le réflexe `source .venv/bin/activate` (ou `.venv\\Scripts\\activate` sous Windows) revient au début de chaque session de travail.',
              '**« `python` et `python3`, c\'est pareil. »** Sous macOS/Linux, `python` peut être absent ou viser un Python 2 fossilisé ; `python3` est la commande fiable — et sous Windows c\'est le lanceur `py` qui choisit le mieux.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Toute cette fiche repose sur UNE habitude transversale — lire une sortie de terminal sans paniquer — que tu as croisée dans chaque fiche d\'installation de ce site (Node, PHP, Composer…). Le venv que tu viens de créer est le MÊME que les fiches **Installation & configuration** de Flask et de Django te feront réactiver : la notion est posée ici pour de bon, elle ne changera plus. Et le REPL que tu as ouvert trois minutes plus tôt devient l\'aire de jeux des fiches **Les types qu\'on croise partout** et **Listes, tuples & dictionnaires** : garder un onglet REPL à côté de la lecture reste la meilleure façon d\'apprendre.' }
          ],
          errors: [
            { title: '"python n\'est pas reconnu" au terminal', bad: 'python --version\n# "command not found" / "n\'est pas reconnu comme commande…"', good: '# macOS & Linux : la commande s\'appelle python3 (récent)\npython3 --version\n# Windows : réinstaller en cochant "Add Python to PATH",\n# ou utiliser le lanceur : py --version', why: 'Selon les systèmes, l\'exécutable s\'appelle python, python3 ou py — et Windows n\'ajoute Python au PATH que si on le demande à l\'installation. Première heure de tout débutant : vérifier QUEL command exist et s\'y tenir.' },
            { title: 'Lancer le script depuis le mauvais dossier', bad: 'cd ~\npython3 projets/boutique/app.py\n# ModuleNotFoundError / can\'t open file…\n# car app.py importe ses frères RELATIVEMENT au dossier courant', good: 'cd projets/boutique          # se placer à la RACINE du projet\npython3 app.py\n# ou : python3 -m app   (résolution en package, fiche Modules)', why: 'Python résout les imports à partir du répertoire courant (sys.path[0]) : lancé d\'ailleurs, le script ne trouve plus ses modules voisins. La règle : toujours lancer depuis la racine du projet.' }
          ],
          related: ['py-modules-venv', 'py-controle', 'fk-demarrage', 'py-tests']
        },

        {
          id: 'py-modules-venv',
          title: 'Modules, pip & environnements virtuels',
          icon: 'inventory_2',
          level: 'Intermédiaire',
          tagline: 'import, __name__, pip install et venv : l\'hygiène de projet sans laquelle rien ne marche.',
          intro: 'Un module, c\'est un fichier `.py` ; un package, un dossier de modules. Tu organises ton code avec `import`, tu ajoutes des librairies avec `pip`… et tu les isoles **par projet** avec un environnement virtuel (`venv`) — sinon deux projets exigeant des versions différentes de Flask se marchent dessus. C\'est le socle hygiénique de tout le web Python.',
          blocks: [
            { t: 'h3', h: 'Importer proprement' },
            { t: 'code', lang: 'py', code:
'import math                    # tout le module : math.sqrt(9)\nfrom flask import Flask        # une pièce précise : Flask(...)\nfrom datetime import date as d # alias, pour les noms à collisions\n\n# TON code : même mécanique\n# from models import Tache     (models.py à côté)\n# from blog.routes import bp   (package blog/ avec __init__.py)' },
            { t: 'h3', h: 'Le garde-fou if __name__ == "__main__"' },
            { t: 'code', lang: 'py', code:
'# app.py\ndef fonction_utile():\n    return 42\n\nif __name__ == "__main__":\n    # Ce bloc ne s\'exécute QUE si : python app.py\n    # Un `import app` (tests, autre module) le saute — c\'est le but !\n    app.run(debug=True)' },
            { t: 'p', h: 'À l\'import, Python EXÉCUTE le fichier de bout en bout (c\'est ainsi que les classes et fonctions existent). `__name__` vaut `"__main__"` uniquement dans le fichier lancé directement : ce test sépare « ce qu\'on réutilise à l\'import » de « ce qu\'on exécute au lancement ». Tu le retrouves dans **chaque** projet Flask — c\'est la fiche Démarrer qui en abonde.' },
            { t: 'h3', h: 'venv : un Python par projet' },
            { t: 'code', lang: 'bash', code:
'# Créer l\'environnement (une fois, à la racine du projet)\npython -m venv .venv\n\n# L\'ACTIVER — le réflexe oublié n°1 :\nsource .venv/bin/activate        # macOS / Linux (zsh, bash)\n# .venv\\Scripts\\activate         # Windows (cmd)\n\n# Le prompt affiche (.venv) : pip installe MAINTENANT dans le projet\npip install flask flask-sqlalchemy\n\n# Geler les versions pour l\'équipe / le serveur\npip freeze > requirements.txt\npip install -r requirements.txt  # chez un collègue : même environnement' },
            { t: 'p', h: 'Pourquoi `python -m venv` plutôt que la commande `venv` ? L\'option `-m` exécute un module AVEC le Python appelant : tu es certain que l\'environnement correspond au bon interpréteur. Même logique pour `python -m pip install ...` — préfère-la toujours au `pip` nu.' },
            { t: 'callout', kind: 'warn', h: '`.venv/` ne se versionne JAMAIS (il est énorme et machine-spécifique) : ajoute-le à ton `.gitignore` dès le premier commit. C\'est `requirements.txt` qui voyage, pas l\'environnement.' }
          ],
          errors: [
            { title: '"ModuleNotFoundError: No module named flask"', bad: 'pip install flask\npython app.py\n# ModuleNotFoundError … alors que l\'install a "réussi" !', good: 'source .venv/bin/activate\npython -m pip install flask\npython app.py', why: 'Sans venv activé, pip installe dans le Python GLOBAL et python peut en viser un autre — ou l\'inverse. L\'environnement activé ALIGNE les deux : même interpréteur, même site-packages.' },
            { title: 'Exécutions parasites à l\'import', bad: '# outils.py\nprint("Connexion à la BDD…")   # s\'exécute à CHAQUE import !\nimport outils   # depuis app.py → message surprise', good: 'def connecter(): ...\nif __name__ == "__main__":\n    print("Connexion à la BDD…")  # lancement direct seulement', why: 'Importer = exécuter le fichier. Toute logique "active" (connexions, prints, app.run) doit vivre dans des fonctions ou sous le garde-fou __main__, sinon chaque import a des effets de bord.' }
          ],
          related: ['py-exceptions', 'py-modules-packages', 'fk-demarrage', 'fk-blueprints']
        }
      ]
    },

    /* ======================================================
       2. LE CŒUR DU LANGAGE
       ====================================================== */
    {
      id: 'langage-py',
      name: 'Le cœur du langage',
      icon: 'code',
      fiches: [
        {
          id: 'py-bases',
          title: 'Variables, types & f-strings',
          icon: 'category',
          level: 'Débutant',
          tagline: 'str, int, bool, None — le typage dynamique de Python, et l\'indentation qui EST la syntaxe.',
          intro: 'Python est un langage à **typage dynamique** : une variable n\'a pas de type déclaré, c\'est la valeur qu\'elle contient qui en porte un — et ce type peut changer au fil du script. C\'est ce qui rend Python si rapide à écrire… à condition de connaître les types de base et LA règle qui surprend tout le monde au début : l\'**indentation n\'est pas du style, c\'est de la grammaire**.',
          blocks: [
            { t: 'h3', h: 'Les types qu\'on croise partout' },
            { t: 'code', lang: 'py', code:
'nom = "Awa"            # str — chaîne de caractères\nage = 27               # int — entier\nprix = 19.99           # float — décimal\nactif = True           # bool — True / False (majuscule !)\nresultat = None        # NoneType — "aucune valeur", l\'absence explicite\n\nprint(type(age))       # <class "int"> — type() inspecte n\'importe quoi' },
            { t: 'p', h: 'Pas de `const`, pas de déclaration : on assigne et c\'est tout. Les noms s\'écrivent en `snake_case` par convention. `None` joue le rôle de `null` : c\'est LA valeur « rien » de Python, et beaucoup de fonctions la retournent par défaut (fiche Fonctions).' },
            { t: 'h3', h: 'Les f-strings : l\'interpolation native' },
            { t: 'code', lang: 'py', code:
'nom = "Awa"\nville = "Cotonou"\n\n# f"..." : le texte entre { } est ÉVALUÉ — n\'importe quelle expression\nmessage = f"Bonjour {nom}, bienvenue à {ville.upper()} !"\nprint(f"Dans 3 ans : {2026 + 3}")\n\n# Anciennes écoles (à reconnaître, plus à utiliser) :\n# "Bonjour " + nom        → concaténation fragile (types !)\n# "Bonjour {}".format(nom) → verbeux' },
            { t: 'h3', h: 'L\'indentation : des blocs sans accolades' },
            { t: 'code', lang: 'py', code:
'if age >= 18:\n    print("Majeur")        # 4 espaces : le bloc EST l\'indentation\n    if actif:\n        print("et actif")  # 8 espaces : un niveau de plus\nelse:\n    print("Mineur")\n\nfor lettre in "abc":      # for itère sur TOUT itérable\n    print(lettre)' },
            { t: 'callout', kind: 'warn', h: 'Règle absolue : **jamais de mélange tabulations / espaces** dans un même fichier (4 espaces = la norme, ton éditeur s\'en charge). Un seul caractère de décalage et Python lève `IndentationError` — l\'erreur n°1 des débutants, souvent importée d\'un copier-coller.' }
          ],
          errors: [
            { title: 'Additionner une chaîne et un nombre', bad: 'age = 27\nprint("Age : " + age)\n# TypeError: can only concatenate str (not "int") to str', good: 'print(f"Age : {age}")          # f-string : conversion automatique\nprint("Age : " + str(age))     # ou conversion explicite', why: 'Python refuse la conversion implicite str↔int : c\'est voulu (langage "fortement" typé malgré le typage dynamique). La f-string convertit proprement ET reste lisible.' },
            { title: 'Casser l\'indentation sans s\'en rendre compte', bad: 'def saluer():\nprint("Bonjour")\n# IndentationError: expected an indented block', good: 'def saluer():\n    print("Bonjour")   # contenu de la fonction = décalé d\'un cran', why: 'Il n\'y a ni accolades ni end : seule l\'indentation délimite les blocs. Configure ton éditeur pour "insérer des espaces" et le problème disparaît définitivement.' },
            { title: 'Confondre == (valeur) et is (identité)', bad: 'a = [1, 2]\nb = [1, 2]\nprint(a == b)     # True  (même contenu)\nprint(a is b)     # False (deux objets distincts !)\nif x == None:     # "marche" souvent… mais non idiomatique', good: '# is : réservé aux SINGLETONS (None, True, False)\nif x is None:\nif flag:                       # pas même besoin de is True\n# == : pour comparer les VALEURS, partout ailleurs', why: '== compare les VALEURS via __eq__ (qu\'une classe peut redéfinir et donc "mentir") ; is compare l\'identité (même objet exact en mémoire). Avec les singletons comme None, is est la forme infaillible et lisible attendue par tout pythoniste.' }
          ],
          related: ['py-structures', 'py-fonctions', 'fk-demarrage']
        },

        {
          id: 'py-controle',
          title: 'Conditions & boucles',
          icon: 'call_split',
          level: 'Débutant',
          tagline: 'if/elif/else, for et while Pythonic (enumerate, zip), break/continue — et le mystérieux else de boucle.',
          intro: 'Contrôler le flux, en Python, c\'est d\'abord penser **vérité** : presque toute valeur est soit « truthy » soit « falsy » (`""`, `0`, `[]`, `None` sont faux). Ensuite, un renversement d\'habitude pour qui vient d\'autres langages : la boucle `for` n\'itère PAS sur des indices — elle itère directement sur les **objets**. Tout le reste (enumerate, zip, else de boucle) découle de là.',
          blocks: [
            { t: 'h3', h: 'if / elif / else — et la vérité des valeurs' },
            { t: 'code', lang: 'py', code:
'stock = 3\n\nif stock == 0:\n    print("Rupture")\nelif stock < 5:\n    print("Stock faible")    # elif : autant de branches que nécessaire\nelse:\n    print("Stock OK")\n\n# La forme IDIOMATIQUE : tester la valeur elle-même\nif taches:            # liste NON vide ? (falsy : "", 0, [], {}, None)\n    afficher(taches)\nif not erreurs:       # aucune erreur ?\n    valider()' },
            { t: 'h3', h: 'for : itérer sur les OBJETS' },
            { t: 'code', lang: 'py', code:
'taches = ["gari", "apy", "piment"]\n\nfor t in taches:                       # chaque ÉLÉMENT, pas un index !\n    print(t)\n\nfor i, t in enumerate(taches, start=1):  # index + élément, proprement\n    print(f"{i}. {t}")\n\nnoms = ["Awa", "Moussa"]\nprix = [500, 800]\nfor n, p in zip(noms, prix):             # deux listes en parallèle\n    print(f"{n} doit {p} F")\n\nfor i in range(3):       # 0, 1, 2 — quand on a VRAIMENT besoin de nombres\n    print("bip")' },
            { t: 'h3', h: 'while, break & continue' },
            { t: 'code', lang: 'py', code:
'essais = 0\nwhile essais < 3:                    # tourne TANT QUE la condition tient\n    mdp = input("Mot de passe : ")\n    if mdp == "":\n        continue                     # saute au tour suivant\n    if verifier(mdp):\n        print("Connecté !")\n        break                        # sort IMMÉDIATEMENT de la boucle\n    essais += 1\n# Attention au while sans sortie : la boucle infinie guette (Ctrl+C !)' },
            { t: 'h3', h: 'Le else de boucle : l\'arme secrète' },
            { t: 'code', lang: 'py', code:
'def chercher(liste, cible):\n    for x in liste:\n        if x == cible:\n            print("Trouvé :", x)\n            break\n    else:\n        # s\'exécute SEULEMENT si la boucle est allée au bout\n        # SANS rencontrer break — "rien trouvé"\n        print("Absent de la liste.")\n# Plus de drapeau "trouve = False" à gérer à la main !' },
            { t: 'callout', kind: 'info', h: 'Depuis Python 3.10, `match/case` (structural pattern matching) permet un `switch` en mieux — il peut **déstructurer** le motif : `match point: case (0, 0): … case (x, 0): …`. Utile face à des dicts/événements variés ; pour un simple if/elif, inutile de compliquer.' }
          ],
          errors: [
            { title: 'for i in range(len(liste)) : le réflexe importé', bad: 'for i in range(len(taches)):\n    print(taches[i])     # illisible, lent à écrire, fragile', good: 'for t in taches:\n    print(t)\n# besoin de l\'index ? for i, t in enumerate(taches):', why: 'Itérer sur les index pour re-piocher les éléments est un réflexe d\'autres langages : plus long, moins sûr (IndexError à la moindre erreur de borne). Python itère sur les objets directement — enumerate rend l\'index disponible quand il sert vraiment.' },
            { title: 'Tester les conteneurs par leur longueur', bad: 'if len(erreurs) == 0:\n    valider()\nif len(panier) > 0:\n    afficher(panier)', good: 'if not erreurs:\n    valider()\nif panier:\n    afficher(panier)', why: 'Les conteneurs vides sont falsy, les remplis truthy : tester la valeur est LE style Python (PEP 8). len(x) == 0 fonctionne mais trahit l\'habitude — et la truthiness s\'étend naturellement aux None.' }
          ],
          related: ['py-bases', 'py-structures', 'py-comprehensions', 'fk-templates']
        },

        {
          id: 'py-chaines',
          title: 'Chaînes de caractères en profondeur',
          icon: 'text_fields',
          level: 'Débutant',
          tagline: 'Immuables mais riches : les méthodes du quotidien et le mini-langage de formatage des f-strings.',
          intro: 'On manipule plus de texte que de nombres : noms, emails, URLs, CSV, templates… La `str` Python est **immuable** — toute « modification » crée une nouvelle chaîne — et bardée de méthodes. À cela s\'ajoute la **mini-langue de formatage** des f-strings (`:.2f`, `:>10`), qui formate nombres, alignements et dates sans effort ',
          blocks: [
            { t: 'h3', h: 'Création et immutabilité' },
            { t: 'code', lang: 'py', code:
'ville = "Cotonou"\n\nville[0]        # "C" — indexation comme les listes\nville[::-1]     # "uonotoC" — slicing identique (retourne NEUF)\nville[0] = "K"  # TypeError ! Une str ne se modifie PAS en place.\n\nville = "K" + ville[1:]     # on CRÉE une nouvelle valeur et on réassigne' },
            { t: 'table', head: ['Méthode', 'Effet', 'Exemple'], rows: [
              ['`strip()`', 'espace aux bords', '`"  texte ".strip()`'],
              ['`lower()` / `upper()` / `title()`', 'casse', '`email.lower()`'],
              ['`split(sep)`', 'chaîne → liste', '`"a,b,c".split(",")`'],
              ['`join(liste)`', 'liste → chaîne', '`", ".join(tags)`'],
              ['`replace(v, n)`', 'remplacer', '`tel.replace(" ", "")`'],
              ['`startswith()` / `endswith()`', 'préfixe/suffixe', '`url.startswith("https")`'],
              ['`find()` / `count()`', 'chercher / compter', '`s.find("@")` (-1 si absent)']
            ]},
            { t: 'h3', h: 'Le duo split/join, au cœur du parsing' },
            { t: 'code', lang: 'py', code:
'ligne = "gari,2500,sac 25kg"\nchamps = ligne.split(",")            # ["gari", "2500", "sac 25kg"]\n\nproduits = ["attiéké", "alloco", "foutou"]\nmenu = " → ".join(produits)          # "attiéké → alloco → foutou"\n# Note : join s\'appelle sur le SÉPARATEUR, pas sur la liste !' },
            { t: 'h3', h: 'f-strings : le formatage professionnel' },
            { t: 'code', lang: 'py', code:
'prix = 2450.5\ntotal = 1234567.89\n\nf"{prix:.2f} F"        # "2450.50 F"        — 2 décimales\nf"{total:,.0f}"        # "1,234,568"        — séparateur de milliers\nf"{0.857:.1%}"         # "85.7%"            — pourcentage\nf"{ville:^15}"         # "    Cotonou    "  — centré sur 15 (->, < alignent)\nf"{prix=}"             # "prix=2450.5"      — DEBUG magique (3.8+)' },
            { t: 'callout', kind: 'tip', h: 'Si les f-strings ne suffisent pas (templates complexes côté utilisateur), regarde `string.Template` — mais pour du HTML, c\'est le travail de **Jinja2** (module Flask, fiche Templates), jamais de concaténation : l\'échappement anti-XSS y est automatique.' }
          ],
          errors: [
            { title: 'Oublier que les méthodes RETOURNENT une nouvelle chaîne', bad: 'pseudo = "  Awa "\npseudo.strip()\npseudo.upper()\nprint(pseudo)          # "  Awa " — intactes : les résultats sont JETÉS', good: 'pseudo = "  Awa "\npseudo = pseudo.strip().upper()   # immuable → réassigner la NOUVELLE\nprint(pseudo)                     # "AWA"', why: 'Même leçon que replace : avec un type immuable, aucune méthode ne modifie en place. Si le résultat d\'une méthode « ne marche pas », 9 fois sur 10 il a été calculé… puis perdu au lieu d\'être réassigné.' },
            { title: 'Concaténer dans une boucle', bad: 'html = ""\nfor p in produits:\n    html += "<li>" + p + "</li>"   # nouvelle copie à CHAQUE tour !', good: 'lignes = [f"<li>{p}</li>" for p in produits]\nhtml = "".join(lignes)             # une SEULE construction', why: 'Chaque += recopie toute la chaîne (immuabilité) : le coût devient quadratique sur les grosses boucles. Construire une liste puis join est l\'idiome performant — et il est plus lisible.' }
          ],
          related: ['py-bases', 'py-stdlib', 'fk-templates', 'py-structures']
        },

        {
          id: 'py-structures',
          title: 'Listes, dictionnaires & Cie',
          icon: 'data_array',
          level: 'Débutant',
          tagline: 'list, dict, tuple, set : les quatre contenants qui représentent 95 % de tes données.',
          intro: 'En Python, presque tout finit dans une **liste** (collection ordonnée et modifiable) ou un **dictionnaire** (paires clé→valeur, l\'équivalent des objets JS et des tableaux associatifs). Ajoute le `tuple` (liste figée) et le `set` (sans doublons) et tu tiens la trousse complète : JSON, résultats SQLAlchemy, sessions… tout s\'exprime avec eux.',
          blocks: [
            { t: 'h3', h: 'La liste : ordonnée, modifiable, indexée' },
            { t: 'code', lang: 'py', code:
'courses = ["attiéké", "gari", "piment"]\n\ncourses.append("huile")      # ajouter à la fin\ncourses.remove("gari")       # retirer par valeur\nprint(courses[0])            # "attiéké" — index 0-based\nprint(courses[-1])           # "huile" — négatif = depuis la fin !\nprint(len(courses))          # 3\n\nfor article in courses:\n    print(f"- {article}")\n\n# Tranches (slicing) : courses[1:3], courses[::-1] (inversée)' },
            { t: 'h3', h: 'Le dictionnaire : la star du web Python' },
            { t: 'code', lang: 'py', code:
'user = {"pseudo": "awa", "ville": "Cotonou", "points": 1500}\n\nuser["points"] += 100                 # lire / modifier par clé\nuser["niveau"] = "or"                 # créer une clé à la volée\nprint(user.get("email"))              # None si absente — SAFE\nprint(user.get("email", "inconnu"))   # avec valeur par défaut\n\nfor cle, valeur in user.items():\n    print(f"{cle} → {valeur}")\n\n# C\'est EXACTEMENT ce que JSON devient après request.get_json()' },
            { t: 'h3', h: 'Les compréhensions : transformer en une ligne' },
            { t: 'code', lang: 'py', code:
'prix = [100, 250, 80]\n\n# Liste : transformer + filtrer\npromos = [p * 0.9 for p in prix if p >= 100]     # [90.0, 225.0]\n\n# Dict : restructurer\nmajus = {u["pseudo"]: u["points"] for u in users}\n# → le pattern préféré pour sérialiser des modèles en API !' },
            { t: 'p', h: '`tuple` (parenthèses, immuable) sert aux retours multiples : `lat, lng = position()`. Le `set` dédoublonne : `set(tags)`. Tu en croiseras moins, mais reconnais-les à vue.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe anti-KeyError : pour LIRE une clé qui peut manquer, toujours `dico.get("clé", défaut)`. Réserve les crochets `dico["clé"]` aux clés dont tu es certain — l\'exception `KeyError` est le signal que tu as supposé à tort.' }
          ],
          errors: [
            { title: 'Modifier une liste pendant qu\'on la parcourt', bad: 'for article in courses:\n    if article.startswith("p"):\n        courses.remove(article)   # des éléments SAUTÉS !', good: 'courses = [a for a in courses if not a.startswith("p")]\n# ou : for article in courses[:]:  # une COPIE', why: 'Retirer un élément décale les index pendant l\'itération : la boucle en saute un sur deux silencieusement. Reconstruire via compréhension est à la fois sûr et plus lisible.' },
            { title: 'Croire que le dictionnaire est ordonné "par hasard"', bad: '# vieux réflexe : re-trier un dict pour l\'afficher…', good: '# depuis Python 3.7, l\'ordre d\'insertion est GARANTI :\nd = {"b": 1, "a": 2}\nlist(d)        # ["b", "a"] — dans l\'ordre d\'ajout', why: 'Longtemps non ordonnés, les dicts conservent désormais leur ordre d\'insertion : tes JSON de réponse sortent dans l\'ordre où tu as construit les clés — utile et documenté.' }
          ],
          related: ['py-bases', 'py-comprehensions', 'fk-api-rest', 'fk-sessions']
        },

        {
          id: 'py-comprehensions',
          title: 'Compréhensions : listes, dicts, sets, générateurs',
          icon: 'filter_list',
          level: 'Intermédiaire',
          tagline: '[transformer + filtrer en une ligne] — l\'idiome Python par excellence, et ses limites à respecter.',
          intro: 'La compréhension est le geste signature de Python : au lieu d\'écrire une boucle de cinq lignes avec un `append`, on écrit l\'**intention** — « donne-moi la liste des X transformés, pour ces éléments, si cette condition ». Ça se lit presque en français. Mais comme toute concision, elle a un prix : un cran de trop et on fabrique de l\'illISIBLE.',
          blocks: [
            { t: 'h3', h: 'Anatomie : [expression for élément in source if condition]' },
            { t: 'code', lang: 'py', code:
'# La boucle équivalente d\'abord :\ncarres = []\nfor n in range(10):\n    if n % 2 == 0:\n        carres.append(n * n)\n\n# …devient, mot à mot :\ncarres = [n * n for n in range(10) if n % 2 == 0]\n#         └─QUOI────┘  └──D\'OÙ──┘  └────SI────┘\n# → [0, 4, 16, 36, 64]' },
            { t: 'h3', h: 'Dict et set compréhensions' },
            { t: 'code', lang: 'py', code:
'users = [{"pseudo": "awa", "points": 1500}, {"pseudo": "moussa", "points": 800}]\n\n# Dict : clé: valeur — ici une table de consultation par pseudo :\npar_pseudo = {u["pseudo"]: u["points"] for u in users}\n# {"awa": 1500, "moussa": 800}\n\n# Set : dédoublonner une transformation :\ninitiales = {u["pseudo"][0].upper() for u in users}     # {"A", "M"}\n\n# Inverser un dictionnaire en une ligne :\nliens = {"accueil": "/", "blog": "/blog"}\npar_url = {url: nom for nom, url in liens.items()}' },
            { t: 'h3', h: 'Compréhensions paresseuses (générateurs)' },
            { t: 'code', lang: 'py', code:
'nombres = range(1_000_000)\n\n# [ ] construit LA LISTE ENTIÈRE en mémoire ; ( ) LA CALCULE À LA DEMANDE :\ncarres = (n * n for n in nombres)      # générateur : rien n\'est calculé !\n\ntotal = sum(n * n for n in nombres)    # passé DIRECTEMENT à la fonction,\n                                       # sans même les parenthèses — fluide' },
            { t: 'p', h: 'Les parenthèses donnent un **générateur** (fiche dédiée) : la valeur suivante n\'est produite que quand on la consomme. En pratique : compréhension-liste si tu dois réutiliser le résultat plusieurs fois, générateur si tu ne fais qu\'un passage (sum, max, any, join…).' },
            { t: 'callout', kind: 'warn', h: 'Le seuil de lisibilité : UNE transformation + UN filtre = parfait. Une condition à double étage ou deux `for` imbriqués au-delà du simple produit cartésien = **revenir à une boucle classique**. Une compréhension que tu dois relire trois fois est déjà un bug futur — le code Python vise la clarté, pas la taille.' }
          ],
          errors: [
            { title: 'Effet de bord dans une compréhension', bad: '[print(p) for p in produits]\n# une liste de None créée pour rien + intentions confuses\ninscrits = [envoyer_mail(u) for u in users]   # pareil', good: 'for p in produits:\n    print(p)\nfor u in users:\n    envoyer_mail(u)\n# ou récupérer un RÉSULTAT : statuts = [envoyer(u) for u in users]', why: 'La compréhension construit une VALEUR ; les actions (print, envoi, log) sont par définition des effets de bord — elles vivent dans des boucles for normales. Sinon tu paies une liste entière dont personne ne veut.' },
            { title: 'Nommer variables de boucle qui écrasent les extérieures', bad: 'prix = 500\ntaxes = [prix * 0.18 for prix in articles]\n# heureusement : la variable de compréhension est LOCALE,\n# ton "prix" extérieur survit (depuis Python 3)… mais illisible !', good: 'taxes = [p * 0.18 for p in articles]\n# des NOMS COURTS et distincts : p, u, t, ligne…', why: 'Depuis Python 3, la variable de boucle d\'une compréhension n\'est plus publiée dans le scope environnant — mais réutiliser le même nom reste un piège de lecture. Convention : noms courts implémentiers (p, u, t), réservés aux compréhensions.' }
          ],
          related: ['py-structures', 'py-generateurs', 'py-fonctions', 'fk-api-rest']
        }
      ]
    },

    /* ======================================================
       3. FONCTIONS & CONCEPTS AVANCÉS
       ====================================================== */
    {
      id: 'fonctions-py',
      name: 'Fonctions & concepts avancés',
      icon: 'functions',
      fiches: [
        {
          id: 'py-fonctions',
          title: 'Fonctions : def & arguments',
          icon: 'functions',
          level: 'Débutant',
          tagline: 'Paramètres nommés, valeurs par défaut, *args/**kwargs — la signature à la Python.',
          intro: 'Chaque vue Flask est une fonction ; chaque décorateur l\'enrobe. Autant dire que maîtriser `def` et sa gestion souple des arguments — positionnels, **nommés**, valeurs par défaut, collecteurs `*args` et `**kwargs` — n\'est pas optionnel. Ajoutons la **portée** (quel nom voit quoi), et le piège le plus célèbre de tout Python : le **défaut mutable**.',
          blocks: [
            { t: 'h3', h: 'Définir, appeler, retourner' },
            { t: 'code', lang: 'py', code:
'def prix_ttc(prix_ht, tva=0.18):\n    """Retourne le prix TTC. (docstring : la doc vit dans la fonction)"""\n    return round(prix_ht * (1 + tva), 2)\n\nprix_ttc(1000)                 # 1180.0 — tva par défaut\nprix_ttc(1000, 0.05)           # 1050.0 — positionnel\nprix_ttc(1000, tva=0.05)       # idem, mais LISIBLE (argument nommé)' },
            { t: 'p', h: '`return` renvoie la valeur ET stoppe la fonction — sans `return`, une fonction retourne **implicitement `None`** (source de mille `TypeError: "NoneType" object is not…`). Un seul `return` peut renvoyer un tuple : `return total, nb` — et l\'appelant débale : `total, nb = calcul()`.' },
            { t: 'h3', h: '*args et **kwargs : les collecteurs' },
            { t: 'code', lang: 'py', code:
'def journal(titre, *articles, **meta):\n    # *articles : tuple de TOUS les positionnels supplémentaires\n    # **meta : dict de TOUS les arguments nommés supplémentaires\n    print(titre, articles, meta)\n\njournal("Actu", "a1", "a2", categorie="sport", urgent=True)\n# Actu ("a1", "a2") {"categorie": "sport", "urgent": True}' },
            { t: 'p', h: 'On ne les écrit pas tous les jours, mais on les LIT partout : signatures des frameworks, décorateurs génériques, wrappers. `**kwargs` est la porte d\'entrée pour transmettre un jeu d\'options sans les énumérer.' },
            { t: 'h3', h: 'Portée : local > englobant > global (LEGB)' },
            { t: 'code', lang: 'py', code:
'taux = 0.18                     # variable GLOBALE du module\n\ndef facturer(prix):\n    return prix * (1 + taux)    # LIRE un global : permis sans rien dire\n\ncompteur = 0\ndef incrementer():\n    global compteur             # MODIFIER un global : il faut le déclarer\n    compteur += 1\n\ndef externe():\n    x = 1\n    def interne():\n        nonlocal x              # cible le x de la fonction ENGLOBANTE\n        x += 1\n    interne()\n    return x                    # → 2' },
            { t: 'p', h: 'Règle de résolution : Python cherche un nom **L**ocal → **E**nglobant → **G**lobal → **B**uiltins (fonctions du langage). Subtilité fatale : toute **assignation** dans une fonction rend le nom local à TOUTE la fonction — c\'est pourquoi `compteur += 1` sans `global` explose en `UnboundLocalError` (voir les erreurs). Bonne conduite : préfère paramètres et retours ; `global`/`nonlocal` = derniers recours.' },
            { t: 'h3', h: 'Type hints : documenter sans contraindre' },
            { t: 'code', lang: 'py', code:
'def saluer(nom: str, fois: int = 1) -> str:\n    return " ".join([f"Bonjour {nom}"] * fois)\n# Les annotations ne bloquent RIEN à l\'exécution : elles servent à\n# l\'éditeur (autocomplétion) et aux linters (mypy). Fiche Typage pour tout.' },
            { t: 'callout', kind: 'warn', h: 'LE piège à connaître par cœur : **une valeur par défaut mutable (`[]`, `{}`) est créée UNE SEULE FOIS** à la définition et partagée entre tous les appels. Règle d\'or : jamais de mutable en valeur par défaut — on met `None` et on crée dedans.' }
          ],
          errors: [
            { title: 'Le défaut mutable qui "se souvient"', bad: 'def ajouter(item, panier=[]):\n    panier.append(item)\n    return panier\najouter("a")   # ["a"]\najouter("b")   # ["a", "b"]  ← la liste PRÉCÉDENTE !', good: 'def ajouter(item, panier=None):\n    if panier is None:\n        panier = []          # liste NEUVE à chaque appel\n    panier.append(item)\n    return panier', why: 'Les défauts sont évalués UNE fois, à la définition de la fonction : la même liste sert tous les appels. C\'est LE bug culte de Python — reconnaissable à l\'état qui "fuite" entre appels.' },
            { title: 'Oublier le return (résultat = None)', bad: 'def total(panier):\n    sum(panier)       # calculé… puis jeté !\nprix = total([10, 20])   # None\nprint(prix + 5)          # TypeError !', good: 'def total(panier):\n    return sum(panier)', why: 'Python ne retourne rien tout seul : sans return, la convention veut que la fonction rende None. L\'erreur n\'explose qu\'AU POINT D\'UTILISATION, loin de la cause — faut classique du débutant.' },
            { title: 'UnboundLocalError en modifiant un global', bad: 'compteur = 0\ndef tick():\n    compteur += 1   # UnboundLocalError !\n    print(compteur)', good: 'def tick():\n    global compteur\n    compteur += 1\n# ou mieux : def tick(n): return n + 1   (zéro état global)', why: 'Dès qu\'une fonction ASSIGNE un nom, Python le déclare local à toute la fonction — la lecture de "compteur" vise alors un local jamais initialisé. global lève l\'ambiguïté ; l\'idéal reste d\'éviter l\'état global partagé.' }
          ],
          related: ['py-decorateurs', 'py-structures', 'fk-routing']
        },

        {
          id: 'py-decorateurs',
          title: 'Décorateurs',
          icon: 'auto_fix_high',
          level: 'Intermédiaire',
          tagline: 'Enrober une fonction pour lui ajouter un comportement — le mécanisme derrière @app.route.',
          intro: 'Impossible de lire du Flask sans comprendre les décorateurs : `@app.route("/")` au-dessus d\'une fonction, c\'est un décorateur — « **prends ma fonction, fais-en quelque chose de plus, et rends-moi le résultat** ». Le concept fait peur ; la mécanique tient en dix lignes, et une fois vue, tout l\'écosystème Python devient limpide.',
          blocks: [
            { t: 'h3', h: 'Une fonction EST une valeur' },
            { t: 'code', lang: 'py', code:
'def dire_bonjour():\n    print("Bonjour !")\n\nf = dire_bonjour      # SANS parenthèses : on manipule la fonction elle-même\nf()                   # Bonjour ! — appelée via son alias' },
            { t: 'h3', h: 'Fabriquer un décorateur maison' },
            { t: 'code', lang: 'py', code:
'import functools\n\ndef journaliser(func):\n    @functools.wraps(func)              # préserve nom et docstring !\n    def wrapper(*args, **kwargs):\n        print(f"→ appel de {func.__name__}")\n        resultat = func(*args, **kwargs)\n        print(f"← retour : {resultat}")\n        return resultat\n    return wrapper\n\n@journaliser                          # ≡ total = journaliser(total)\ndef total(panier):\n    return sum(panier)\n\ntotal([10, 20, 30])   # → appel de total / ← retour : 60' },
            { t: 'p', h: 'Le schéma est toujours le même : le décorateur reçoit `func`, définit un `wrapper` qui fait quelque chose AVANT et/ou APRÈS, délègue via `func(*args, **kwargs)`, et retourne le wrapper. L\'`@` au-dessus de la définition n\'est que du sucre pour `ma_fonction = journaliser(ma_fonction)`.' },
            { t: 'h3', h: 'Ce que Flask en fait, concrètement' },
            { t: 'code', lang: 'py', code:
'@app.route("/produits")     # enregistre la fonction dans la table des routes\n@login_required             # vérifie la SESSION avant d\'exécuter la vue\ndef produits():\n    return render_template("produits.html")\n# Deux décorateurs s\'empilent : route en haut, garde juste au-dessus de la vue.' },
            { t: 'h3', h: 'Décorateur à argument : une couche de plus' },
            { t: 'code', lang: 'py', code:
'def repeter(fois):                    # décorateur PARAMÉTRÉ\n    def decorateur(func):\n        @functools.wraps(func)\n        def wrapper(*a, **kw):\n            for _ in range(fois):\n                func(*a, **kw)\n        return wrapper\n    return decorateur\n\n@repeter(3)\ndef bip():\n    print("bip !")' },
            { t: 'callout', kind: 'tip', h: 'Ne saute jamais `functools.wraps` : sans lui, la fonction enrobée perd son `__name__` et sa docstring. Or Flask utilise `__name__` pour nommer l\'**endpoint** de chaque route — oublier wraps dans TES décorateurs de vues provoque des collisions d\'endpoints incompréhensibles.' }
          ],
          errors: [
            { title: 'Décorateur qui oublie d\'appeler la fonction', bad: 'def deco(func):\n    def wrapper(*a, **kw):\n        print("avant")\n        # func jamais appelée : la vue NE S\'EXÉCUTE PAS !\n    return wrapper', good: 'def deco(func):\n    @functools.wraps(func)\n    def wrapper(*a, **kw):\n        print("avant")\n        return func(*a, **kw)\n    return wrapper', why: 'Le wrapper REMPLACE la fonction : tout ce qu\'il ne fait pas n\'a plus lieu. Oublier l\'appel (ou le return de son résultat) produit des vues muettes — la page affiche None sans erreur visible.' },
            { title: 'Appeler la fonction en l\'enrobant', bad: '@app.route("/")\ndef accueil(): ...\n\naccueil = journaliser(accueil())   # appel IMMÉDIAT, pas enrobage !', good: 'accueil = journaliser(accueil)   # on passe la fonction,\n                                   # le wrapper l\'appellera plus tard', why: 'Les parenthèses déclenchent l\'exécution : tu enrobes alors le RÉSULTAT (souvent None). Un décorateur travaille toujours sur la référence de la fonction, jamais sur son appel.' }
          ],
          related: ['py-fonctions', 'py-contextmanagers', 'fk-routing', 'fk-extensions']
        },

        {
          id: 'py-generateurs',
          title: 'Générateurs : yield',
          icon: 'loop',
          level: 'Avancé',
          tagline: 'Une fonction qui fait des pauses : produire les valeurs UNE À UNE, sans jamais tout charger.',
          intro: 'Un `return` termine une fonction ; un **`yield`** la met en **pause** : elle rend une valeur, gèle son état, et reprend exactement là où elle en était au prochain appel. Une fonction contenant `yield` ne retourne pas une liste — elle retourne un **générateur**, un itérateur paresseux qui produit ses valeurs à la demande. C\'est LA réponse Python à trois problèmes : fichiers énormes, séries infinies, pipelines de données.',
          blocks: [
            { t: 'h3', h: 'yield vs return : la pause qui change tout' },
            { t: 'code', lang: 'py', code:
'def compte_a_rebours(n):\n    while n > 0:\n        yield f"Encore {n}…"     # rend une valeur, SE FIGE ICI\n        n -= 1\n    yield "Décollage !"\n\netapes = compte_a_rebours(3)\nprint(next(etapes))   # "Encore 3…" — l\'état local (n) est CONSERVÉ\nprint(next(etapes))   # "Encore 2…"\nfor reste in etapes:  # for appelle next tout seul, jusqu\'à l\'épuisement\n    print(reste)      # "Encore 1…", "Décollage !"' },
            { t: 'h3', h: 'Le cas d\'école : lire un fichier énorme' },
            { t: 'code', lang: 'py', code:
'def lignes_erreurs(chemin):\n    with open(chemin, encoding="utf-8") as f:\n        for ligne in f:                  # f est DÉJÀ paresseux !\n            if "ERREUR" in ligne:\n                yield ligne.strip()      # on ne produit QUE les pertinentes\n\n# Un log de 20 Go ? Pas de list() : on traite ligne à ligne,\n# la mémoire reste PLATE quelle que soit la taille du fichier.\nfor e in lignes_erreurs("serveur.log"):\n    alerter(e)' },
            { t: 'h3', h: 'Séries infinies & pipelines' },
            { t: 'code', lang: 'py', code:
'def fibonacci():\n    a, b = 0, 1\n    while True:                    # infinie… et pourtant sans danger !\n        yield a\n        a, b = b, a + b\n\nfrom itertools import islice\ndix_premiers = list(islice(fibonacci(), 10))   # on pioche ce qu\'il faut' },
            { t: 'p', h: 'Les générateurs se **chaînent** comme des tuyaux : `lignes → filtrées → nettoyées → comptées`, chaque étage étant un générateur qui consomme le précédent. Zéro liste intermédiaire, une mémoire constante — c\'est exactement la philosophie des streams Unix, en syntaxe Python.' },
            { t: 'callout', kind: 'warn', h: 'Un générateur est **à usage unique** : épuisé une fois, il reste vide pour toujours (comme une cassette lue jusqu\'au bout). Deuxième besoin = recréer un générateur (rappeler la fonction), ou matérialiser en liste si la donnée tient en mémoire.' }
          ],
          errors: [
            { title: 'Parcourir deux fois le même générateur', bad: 'g = (x * 2 for x in range(3))\nprint(list(g))     # [0, 2, 4]\nprint(list(g))     # [] ← VIDE, sans erreur ni avertissement !', good: 'doublons = [x * 2 for x in range(3)]   # liste si 2 usages\n# ou recréer : g = (x * 2 for x in range(3)) avant chaque passage', why: 'L\'itérateur garde sa position : arrivé au bout, tout nouvel appel à next lève StopIteration — que list() traduit en "plus rien". La redondance silencieusement vide est LE symptôme classique du générateur épuisé.' },
            { title: 'Demander len() ou indexer un générateur', bad: 'g = (n for n in range(100))\nprint(len(g))      # TypeError: object of type "generator" has no len()\nprint(g[5])        # TypeError : pas d\'indexation !', good: 'cinquieme = next(itertools.islice(g, 4, None))\n# ou mater la liste si besoin : valeurs = list(g)', why: 'Un générateur ne CONNAÎT pas sa taille : il n\'a produit aucune valeur encore. len/index exigent la matérialisation — ce qui sacrifie la paresse ; si tu en as besoin partout, tu voulais une liste.' }
          ],
          related: ['py-fonctions', 'py-comprehensions', 'py-contextmanagers', 'py-fichiers']
        },

        {
          id: 'py-contextmanagers',
          title: 'Context managers : with',
          icon: 'meeting_room',
          level: 'Avancé',
          tagline: 'with = entrée + sortie GARANTIES : fichiers, connexions, verrous… fermés même en cas de crash.',
          intro: '`with open(...) as f:` — tu l\'as déjà écrit ; voici ce que ça veut dire. Un **context manager** est un objet qui sait **entrer** (`__enter__`) et **sortir** (`__exit__`) d\'un contexte — et Python GARANTIT la sortie, même si une exception explose au milieu du bloc. C\'est le mécanisme derrière tout ce qui « s\'ouvre et doit se fermer » : fichiers, connexions BDD, transactions, verrous, timers.',
          blocks: [
            { t: 'h3', h: 'Le problème qu\'il résout' },
            { t: 'code', lang: 'py', code:
'# Sans with : la fermeture peut être OUBLIÉE ou sautée par une erreur\nf = open("donnees.txt", encoding="utf-8")\ndonnes = f.read()          # si ça plante ICI → fichier resté OUVERT\nf.close()\n\n# Avec with : fermer est garanti, quoi qu\'il arrive dans le bloc\nwith open("donnees.txt", encoding="utf-8") as f:\n    donnes = f.read()\n# ← à la sortie du bloc (normale OU en exception), __exit__ a fermé f' },
            { t: 'h3', h: 'Le protocole : __enter__ / __exit__' },
            { t: 'code', lang: 'py', code:
'class ConnexionBDD:\n    def __enter__(self):\n        print("Connexion ouverte")\n        self.connexion = ouvrir()\n        return self.connexion          # ← ce qui arrive dans "as x"\n\n    def __exit__(self, exc_type, exc, trace):\n        self.connexion.close()\n        print("Connexion fermée (même si erreur)")\n        return False                   # False = NE PAS étouffer l\'exception !\n\nwith ConnexionBDD() as db:\n    db.executer("SELECT 1")' },
            { t: 'p', h: '`__exit__` reçoit trois paramètres décrivant l\'exception éventuelle (son type, l\'exception, le traceback) — `None` si tout s\'est bien passé. Son **retour booléen est critique** : `True` ÉTOUFFE l\'exception (la fait disparaître), `False` la laisse remonter. Ignorez ce détail et vous masquez des bugs sans le savoir (voir erreurs).' },
            { t: 'h3', h: 'contextlib : la version légère avec @contextmanager' },
            { t: 'code', lang: 'py', code:
'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef chronometre(nom):\n    debut = time.perf_counter()\n    yield                      # ← le code du "with" s\'exécute ICI\n    duree = time.perf_counter() - debut\n    print(f"{nom} : {duree:.2f} s")\n\nwith chronometre("Import des ventes"):\n    importer_ventes()\n\n# Avant yield = __enter__ ; après = __exit__. Les exceptions du bloc\n# RESSORTENT au niveau du yield : on peut les try/except là.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe à tatouer : **tout ce qui s\'ouvre se ferme dans un `with`** — fichiers, connexions (`with db.session…` en Flask-SQLAlchemy pour les transactions !), verrous de threads, sessions HTTP. Et la bibliothèque `contextlib` fournit des utilitaires bonus : `suppress()` (ignorer une exception précise), `redirect_stdout()`…' }
          ],
          errors: [
            { title: 'Fichier ouvert sans with (fuite silencieuse)', bad: 'f = open("rapport.csv", "w", encoding="utf-8")\nf.write(donnees())     # plante ici ? le fichier reste ouvert :\n# verrouillé sous Windows, données parfois NON flushées !', good: 'with open("rapport.csv", "w", encoding="utf-8") as f:\n    f.write(donnees())\n# fermé + flush GARANTIS à la sortie du bloc', why: 'Sans with, la fermeture dépend de la bonne fortune (pas d\'erreur, pas d\'oubli, ramasse-miettes au bon moment). Sous Windows, un fichier ouvert peut être inaccessible à tout autre programme — le genre de bug qui « marche sur ma machine » Linux.' },
            { title: '__exit__ qui avale l\'exception sans le vouloir', bad: 'def __exit__(self, t, e, tb):\n    self.close()\n    return True          # "tout va bien" → l\'exception DISPARAÎT', good: 'def __exit__(self, t, e, tb):\n    self.close()\n    return False         # l\'erreur remonte après fermeture\n# (étouffer = choix délibéré : contextlib.suppress, jamais un accident)', why: 'Retourner une valeur truthy depuis __exit__ indique à Python « j\'ai géré cette erreur » : elle n\'existe plus. Le plantage disparaît dans un silence total — la règle est False par défaut, True uniquement pour un comportement DOCUMENTÉ.' }
          ],
          related: ['py-fichiers', 'py-decorateurs', 'py-classes', 'fk-sqlalchemy']
        },

        {
          id: 'py-typage',
          title: 'Annotations de type (typing)',
          icon: 'label',
          level: 'Intermédiaire',
          tagline: 'list[int], dict[str, int], X | None : documenter les formes attendues — sans jamais contraindre l\'exécution.',
          intro: 'Python reste dynamiquement typé : les **annotations de type** ne changent rien à l\'exécution — une fonction annotée `int` accepte toujours n\'importe quoi. Alors à quoi bon ? Trois clients les lisent : **l\'éditeur** (autocomplétion et erreurs soulignées en rouge), **les linters** externes (mypy, pyright) qui traquent les bugs avant l\'exécution, et **les humains** (et frameworks !) qui découvrent la forme des données attendue d\'un coup d\'œil.',
          blocks: [
            { t: 'h3', h: 'La syntaxe essentielle' },
            { t: 'code', lang: 'py', code:
'def prix_ttc(prix_ht: float, tva: float = 0.18) -> float:\n    return round(prix_ht * (1 + tva), 2)\n\n# Variables annotées :\ncompteur: int = 0\nutilisateurs: list[str] = ["awa", "moussa"]          # paramétré (3.9+)\npoints: dict[str, int] = {"awa": 1500}\ncoordonnees: tuple[float, float] = (6.37, 2.35)\n\n# Paramètre OPTIONNEL = peut être None :\ndef trouver(pseudo: str) -> dict | None:             # X | None (3.10+)\n    ...\n# avant : Optional[dict] via "from typing import Optional"' },
            { t: 'h3', h: 'Ce que l\'annotation NE FAIT PAS' },
            { t: 'code', lang: 'py', code:
'def double(x: int) -> int:\n    return x * 2\n\ndouble("abc")        # "abcabc" — AUCUNE erreur à l\'exécution !!\n# Les annotations sont métadonnées (f.__annotations__),\n# ignorées par l\'interpréteur : way mypy/pyright pour les vérifier.' },
            { t: 'code', lang: 'bash', code:
'pip install mypy\nmypy app.py          # analyse statique : détecte les incohérences\n# app.py:12: error: Argument 1 to "double" has incompatible type "str"' },
            { t: 'p', h: 'En pratique, l\'immense majorité des projets fait : annotations **honestes** + mypy (ou pyright intégré à l\'éditeur) sur les chemins principaux. Le module `typing` fournit aussi `Any` (je ne sais pas), `Union`, `Callable[[int], str]`, `Protocol` (interfaces), `TypedDict` (dicts structurés) — utiles dès qu\'on dépasse les types intégrés paramétrés.' },
            { t: 'h3', h: 'Où ça rapporte le plus : les frontières' },
            { t: 'ul', items: [
              '**Fonctions publiques / bibliothèques** : la signature devient la documentation officielle.',
              '**Modèles de données** : `@dataclass` et `pydantic` LISENT les annotations — validation automatique !',
              '**Frameworks** : FastAPI génère toute la validation et la doc OpenAPI DEPUIS les annotations.',
              '**Règle du 80/20** : annote les signatures, pas chaque variable locale évidente.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Annote en réponse réelle, pas souhaitée : si la fonction peut retourner None, écris `-> dict | None` — un mypyet (et tes lecteurs) te remercieront. Une annotation mensongère est pire que pas d\'annotation : elle fait confiance à tort.' }
          ],
          errors: [
            { title: 'Croire que ": int" protège à l\'exécution', bad: 'def rectifier(montant: int) -> int:\n    return montant - 100\nrectifier("1000")      # TypeError AILLEURS, plus loin… ou pire : passe', good: '# annotations = documentation + mypy ; validation = code explicite\nif not isinstance(montant, (int, float)):\n    raise TypeError("montant numérique attendu")', why: 'L\'interpréteur ignore les annotations : un mauvais type entre, circule, et explose au premier usage incompatible — retrouvé loin de la cause. Pour une VRAIE validation d\'entrées, c\'est du código (isinstance, pydantic, validateurs de formulaires).' },
            { title: 'Annotation qui promet trop', bad: 'def charger_user(id: int) -> dict:\n    u = db.session.get(User, id)\n    return u           # …peut valoir None si id absent !!', good: 'def charger_user(id: int) -> User | None:\n    return db.session.get(User, id)\n# l\'appelant DEVRA gérer le None — et mypy vérifie qu\'il le fait', why: 'Promettre un dict alors qu\'on peut rendre None entraîne l\'appelant en confiance vers AttributeError. L\'annotation honnête (X | None) convertit un bug latent en contrat visible — et vérifié.' }
          ],
          related: ['py-fonctions', 'py-classes', 'py-decorateurs']
        }
      ]
    },

    /* ======================================================
       4. OBJETS, FICHIERS & ERREURS
       ====================================================== */
    {
      id: 'objets-fichiers-py',
      name: 'Objets, fichiers & erreurs',
      icon: 'category',
      fiches: [
        {
          id: 'py-classes',
          title: 'Classes & objets',
          icon: 'account_tree',
          level: 'Intermédiaire',
          tagline: 'class, __init__, self, héritage, méthodes spéciales, @property : la POO au niveau Python.',
          intro: 'On peut écrire beaucoup de Python sans créer de classe… mais on en **sous-classe** constamment : tes modèles SQLAlchemy héritent de `db.Model`, tes formulaires héritent de `FlaskForm`, tes exceptions héritent de `Exception`. Il te faut donc le niveau complet de la POO Python : `__init__` et `self`, l\'héritage, les **méthodes spéciales** (`__str__`, `__repr__`, `__eq__`) et les **propriétés** (`@property`).',
          blocks: [
            { t: 'h3', h: 'Anatomie minimale' },
            { t: 'code', lang: 'py', code:
'class Compte:\n    banque = "Ecobank"          # attribut de CLASSE : partagé par tous\n\n    def __init__(self, titulaire, solde=0):\n        self.titulaire = titulaire     # attributs D\'INSTANCE : à chacun les siens\n        self.solde = solde\n\n    def deposer(self, montant):\n        self.solde += montant\n        return self.solde\n\nc = Compte("Awa", 5000)\nc.deposer(1500)\nprint(c.solde)          # 6500' },
            { t: 'p', h: '`__init__` n\'est pas le constructeur au sens strict (l\'objet existe déjà) : c\'est l\'initialiseur, appelé juste après la création. Et `self` — l\'instance elle-même — doit figurer en **premier paramètre de chaque méthode** ; Python le remplit automatiquement à l\'appel (`c.deposer(1500)` ≡ `Compte.deposer(c, 1500)`).' },
            { t: 'h3', h: 'Héritage : « est une sorte de »' },
            { t: 'code', lang: 'py', code:
'class CompteEpargne(Compte):          # hérite de TOUT Compte\n    def __init__(self, titulaire, solde=0, taux=0.04):\n        super().__init__(titulaire, solde)   # on réutilise le parent\n        self.taux = taux\n\n    def capitaliser(self):\n        self.solde *= 1 + self.taux\n\n# EXACTEMENT le mécanisme de : class Tache(db.Model)' },
            { t: 'p', h: 'Quand tu écriras `class Tache(db.Model)`, retiens cette image : `db.Model` fournit le moteur (mapping SQL↔objet), ta classe n\'ajoute que des **attributs de classe** (`id = db.Column(...)`) que l\'héritage transforme en colonnes. La déclaration a l\'air magique ; c\'est de l\'héritage classique.' },
            { t: 'h3', h: 'Méthodes spéciales : parler la langue de Python' },
            { t: 'code', lang: 'py', code:
'class Produit:\n    def __init__(self, nom, prix):\n        self.nom = nom\n        self.prix = prix\n\n    def __repr__(self):                     # pour les DÉVELOPPEURS (REPL, debug)\n        return f"Produit({self.nom!r}, {self.prix!r})"\n\n    def __str__(self):                      # pour les HUMAINS (print, f-string)\n        return f"{self.nom} — {self.prix} F"\n\n    def __eq__(self, autre):                # ce que "==" signifie pour TES objets\n        return isinstance(autre, Produit) and self.nom == autre.nom\n\np = Produit("Gari", 2500)\nprint(p)          # Gari — 2500 F        (via __str__)\np                 # Produit("Gari", 2500) (via __repr__, sinon <object at 0x…>)' },
            { t: 'p', h: 'Les « dunders » (double underscore) branchent TES objets sur la syntaxe du langage : `len(x)` → `__len__`, `x + y` → `__add__`, `x == y` → `__eq__`, `x[i]` → `__getitem__`. Sans `__repr__`, le REPL affiche l\'adresse mémoire — le premier marqueur d\'une classe « inachevée ».' },
            { t: 'h3', h: '@property : une méthode qui se porte comme un attribut' },
            { t: 'code', lang: 'py', code:
'class Panier:\n    def __init__(self):\n        self.articles = []\n\n    @property\n    def total(self):                        # se LIT panier.total — sans () !\n        return sum(a.prix for a in self.articles)\n\n    @property\n    def promo(self):\n        return self.total * 0.9\n\n# Et pour valider à L\'ÉCRITURE :\n#   @solde.setter\n#   def solde(self, valeur):\n#       if valeur < 0: raise ValueError(...)\n#       self._solde = valeur' },
            { t: 'p', h: '`@property` sert à deux choses : exposer un **calcul** comme s\'il était stocké (`panier.total` recalculé à chaque lecture), et **faire évoluer une API sans la casser** — un attribut public peut devenir une propriété validée sans que les utilisateurs changent leur code. C\'est LE mécanisme favori des ORMs pour leurs colonnes et relations.' },
            { t: 'callout', kind: 'tip', h: 'Heuristique pragmatique : une classe se justifie quand tu as **données + comportements liés** (un Compte sait se capitaliser). Un simple paquet de données ? Un `dict` ou un `@dataclass` suffit — ne fabrique pas de la POO par réflexe.' }
          ],
          errors: [
            { title: 'Oublier self dans la signature', bad: 'class Compte:\n    def deposer(montant):        # self absent !\n        ...\nc.deposer(100)\n# TypeError: deposer() takes 1 positional argument but 2 were given', good: 'def deposer(self, montant):\n    self.solde += montant', why: 'L\'appel via l\'instance injecte self en premier : la signature c.deposer(100) en envoie DEUX. Ce message d\'erreur cryptique ("but 2 were given") signifie presque toujours un self oublié.' },
            { title: 'Liste en attribut de classe : partagée par tous', bad: 'class Panier:\n    articles = []        # attribut de CLASSE mutable…\np1, p2 = Panier(), Panier()\np1.articles.append("gari")\nprint(p2.articles)       # ["gari"]  ← p2 aussi !!', good: 'class Panier:\n    def __init__(self):\n        self.articles = []   # attribut d\'INSTANCE, un par objet', why: 'Même piège que le défaut mutable des fonctions, un étage plus haut : la liste vit sur la CLASSE, donc toutes les instances la partagent. Les mutables vivent dans __init__, jamais sur la classe.' }
          ],
          related: ['py-fonctions', 'py-decorateurs', 'fk-sqlalchemy', 'fk-formulaires']
        },

        {
          id: 'py-fichiers',
          title: 'Fichiers : lecture, écriture & chemins',
          icon: 'file_open',
          level: 'Intermédiaire',
          tagline: 'with open(..., encoding="utf-8"), les bons modes, et pathlib enfin civilisé pour les chemins.',
          intro: 'Lire un CSV, écrire un rapport, charger une config JSON : l\'accès fichier est quotidien — et truffé de petites embûches (encodage, chemin Windows, fichier laissé ouvert). Python règle l\'essentiel avec trois outils : **`with open()`** pour l\'I/O, les **`encoding=` explicites** (accents sauvés), et **`pathlib`** pour des chemins portables qu\'on assemble comme des objets, pas comme des chaînes.',
          blocks: [
            { t: 'h3', h: 'Lire : trois niveaux de voracité' },
            { t: 'code', lang: 'py', code:
'# Toujours with + encoding — les deux règles non négociables :\nwith open("notes.txt", encoding="utf-8") as f:\n    tout = f.read()                    # TOUTE la chaîne d\'un coup\n\nwith open("notes.txt", encoding="utf-8") as f:\n    lignes = f.readlines()             # LISTE de lignes (mémoire !)\n\nwith open("gros_fichier.log", encoding="utf-8") as f:\n    for ligne in f:                    # PARESSEUX : une ligne à la fois\n        if "ERREUR" in ligne:          # → la boucle for est LA bonne méthode\n            print(ligne.strip())       #   pour les gros fichiers' },
            { t: 'h3', h: 'Écrire et les modes d\'ouverture' },
            { t: 'table', head: ['Mode', 'Sens', 'Piège'], rows: [
              ['`"r"`', 'lecture (défaut)', 'erreur si absent'],
              ['`"w"`', 'écriture', '**ÉCRASE** le contenu existant !'],
              ['`"a"`', 'ajout en fin', 'ne lit pas'],
              ['`"x"`', 'création exclusive', 'erreur si le fichier existe (sécurité)'],
              ['`"rb"` / `"wb"`', 'binaire', 'images, PDF, uploads — pas d\'encoding']
            ]},
            { t: 'code', lang: 'py', code:
'with open("rapport.txt", "w", encoding="utf-8") as f:\n    f.write("Total : 1 250 F\\n")\n    f.writelines(["Ligne 1\\n", "Ligne 2\\n"])\n\nwith open("rapport.txt", "a", encoding="utf-8") as f:   # j\'AJOUTE\n    f.write("Signature : Awa\\n")' },
            { t: 'h3', h: 'pathlib : les chemins en objets (Linux, macOS, Windows)' },
            { t: 'code', lang: 'py', code:
'from pathlib import Path\n\nbase = Path("monprojet")\nconfig = base / "config" / "app.json"    # l\'opérateur / assemble les chemins !\n\nprint(config.name)       # "app.json"\nprint(config.suffix)     # ".json"\nprint(config.parent)     # monprojet/config\nconfig.exists()          # False — tester avant d\'ouvrir\n\n# Relatif au SCRIPT, pas au dossier courant (le piège universel) :\nICI = Path(__file__).parent\ncfg = ICI / ".." / "config" / "app.json"\n\ntexte = config.read_text(encoding="utf-8")    # raccourcis sans with\nPath("sortie").mkdir(parents=True, exist_ok=True)\nfor pdf in Path(".").glob("**/*.pdf"):   # recherche récursive\n    traiter(pdf)\n\n# os.path (join, exists, dirname) fait la même chose en chaînes :\n# héritage historique — pathlib lui est préféré partout depuis 3.4.' },
            { t: 'callout', kind: 'tip', h: 'JSON dans un fichier ? Ne le parse pas à la main : `json.load(f)` / `json.dump(data, f, ensure_ascii=False, indent=2)` (fiche Bibliothèque standard). CSV ? Le module `csv`. Fichier fourni par l\'utilisateur (upload) ? En Flask : `send_from_directory` et un dossier dédié (fiche Fichiers statiques).' }
          ],
          errors: [
            { title: 'Oublier encoding="utf-8"', bad: 'open("clients.txt").read()\n# marche sur TON Linux, UnicodeDecodeError sur le Windows\n# du collègue (défaut = cp1252 !) : les accents trinquent', good: 'open("clients.txt", encoding="utf-8").read()\n# explicite = portable ; et en écriture : même règle', why: 'L\'encodage par défaut dépend du SYSTÈME (locale), pas du fichier : utf-8 sous Linux, souvent cp1252 sous Windows. Un é en mémoire vaut un crash aléatoire ailleurs. encoding= explicite, à chaque open, est le seul blindage.' },
            { title: 'Chemin en dur ou relatif au mauvais endroit', bad: 'f = open("config/app.json")        # marche lancé D\'ICI, plante ailleurs\nf = open("C:\\\\projets\\\\app\\\\cfg.json")  # Windows only, dur sur le disque', good: 'from pathlib import Path\nICI = Path(__file__).parent\ncfg = ICI / "config" / "app.json"\n# portable (OS-agnostique) et ANCRÉ au script, pas au terminal', why: 'Un chemin relatif est résolu par rapport au répertoire courant du PROCESSUS — change de dossier de lancement et le fichier « disparaît ». Ancrer à __file__ rend le script déplaçable sans surprise.' }
          ],
          related: ['py-contextmanagers', 'py-exceptions', 'fk-statiques', 'fk-configuration']
        },

        {
          id: 'py-exceptions',
          title: 'Exceptions : try / except',
          icon: 'error',
          level: 'Intermédiaire',
          tagline: 'Précises, nommées, traçables : bien attraper une erreur, c\'est d\'abord savoir laquelle.',
          intro: 'En Python, une erreur non traitée interrompt tout le programme en affichant un **traceback** — la pile d\'appels jusqu\'au point de rupture (lis-le de bas en haut : la dernière ligne est la cause). Les exceptions se traitent avec `try/except`, mais la qualité d\'un traitement se juge à un critère : **sa précision**. Et quand les erreurs standard ne suffisent plus, on crée les siennes.',
          blocks: [
            { t: 'h3', h: 'La structure complète' },
            { t: 'code', lang: 'py', code:
'def lire_config(chemin):\n    try:\n        with open(chemin) as f:\n            return f.read()\n    except FileNotFoundError:\n        print(f"Fichier absent : {chemin} — config par défaut.")\n        return {}\n    except PermissionError as e:\n        print(f"Droits insuffisants : {e}")\n        raise                       # on re-lance après avoir loggué' },
            { t: 'h3', h: 'else / finally / raise : les trois compléments' },
            { t: 'code', lang: 'py', code:
'connexion = None\ntry:\n    connexion = ouvrir_bdd()\nexcept ConnectionError:\n    print("BDD injoignable")\nelse:\n    # s\'exécute SEULEMENT si try a réussi — y mettre la "suite normale"\n    migrer(connexion)\nfinally:\n    # TOUJOURS exécuté (erreur ou pas) : libérer les ressources\n    if connexion:\n        connexion.close()' },
            { t: 'table', head: ['Exception', 'Cause typique'], rows: [
              ['`KeyError`', 'clé de dict absente — `d["x"]` au lieu de `d.get("x")`'],
              ['`ValueError`', 'bonne famille, mauvaise valeur — `int("abc")`'],
              ['`TypeError`', 'mauvais type — concaténer str + int, None + 5'],
              ['`AttributeError`', 'attribut/méthode inexistant — souvent sur un `None`'],
              ['`IndexError`', 'index hors liste'],
              ['`FileNotFoundError`', 'chemin de fichier invalide']
            ]},
            { t: 'h3', h: 'Créer ses propres exceptions' },
            { t: 'code', lang: 'py', code:
'class SoldeInsuffisantError(Exception):\n    """Levée quand un retrait dépasse le solde."""\n    def __init__(self, solde, demande):\n        super().__init__(f"Solde {solde} F < retrait {demande} F")\n        self.manque = demande - solde      # transporte des DONNÉES utiles\n\ndef retirer(compte, montant):\n    if montant > compte.solde:\n        raise SoldeInsuffisantError(compte.solde, montant)\n    compte.solde -= montant\n\n# Côté appelant — un traitement MÉTIER ciblé :\n# except SoldeInsuffisantError as e:\n#     flash(f"Il vous manque {e.manque} F", "erreur")' },
            { t: 'p', h: 'Hérite d\'**`Exception`** — jamais de `BaseException` (qui inclut Ctrl+C et la sortie du programme) —, nomme parlant (`PaiementRefuseError`), transporte les données utiles au traitement. En Flask, ces exceptions métier se convertissent en réponses HTTP via les errorhandlers : c\'est le pont fiche « Gestion des erreurs » du module Flask.' },
            { t: 'callout', kind: 'tip', h: 'Un traceback se lit de BAS en HAUT : la toute dernière ligne = exception + message, les lignes au-dessus = le chemin d\'appels jusqu\'à elle. Ne t\'arrête pas à « y\'a une erreur » — lis la dernière ligne, elle nomme presque toujours exactement le problème.' }
          ],
          errors: [
            { title: 'Le except nu qui avale tout', bad: 'try:\n    traiter_commande()\nexcept:\n    pass     # TOUT disparaît : bug métier, typo, Ctrl+C…', good: 'try:\n    traiter_commande()\nexcept PaiementError as e:\n    journal.error("Paiement refusé : %r", e)\n    raise', why: 'Un except sans type intercepte même SystemExit et KeyboardInterrupt, et masque les VRAIS bugs (un NameError de faute de frappe passe inaperçu). Toujours nommer le type visé — et journaliser.' },
            { title: 'Confondre None et exception', bad: 'user = User.query.get(42)\nprint(user.pseudo)     # AttributeError si 42 n\'existe pas…', good: 'user = User.query.get(42)\nif user is None:\n    abort(404)\n# ou mieux : db.get_or_404(User, 42) — fiche SQLAlchemy', why: 'Beaucoup d\'API Python signalent l\'absence par None SANS lever d\'exception : le crash a lieu plus loin, sur l\'usage. Tester None tôt (ou utiliser les variantes get_or_404 / .get()) évite les AttributeError en cascade.' }
          ],
          related: ['py-bases', 'py-classes', 'fk-erreurs', 'fk-sqlalchemy']
        }
      ]
    },

    /* ======================================================
       5. PROJET, STDLIB & QUALITÉ
       ====================================================== */
    {
      id: 'projet-py',
      name: 'Projet, stdlib & qualité',
      icon: 'folder_open',
      fiches: [
        {
          id: 'py-modules-packages',
          title: 'Organiser en packages',
          icon: 'folder_open',
          level: 'Intermédiaire',
          tagline: 'Dossier + __init__.py, imports absolus vs relatifs — et pourquoi tes fichiers ne doivent pas s\'appeler json.py.',
          intro: 'Un module = un fichier. Au-delà de deux-trois fichiers, on groupe en **package** : un dossier contenant un `__init__.py`, qui s\'importe comme un tout (`from blog.routes import bp`). C\'est exactement la structure que prend un projet Flask dès qu\'il grandit — et elle obéit à des règles dont la violation produit les erreurs d\'import les plus déroutantes de tout Python.',
          blocks: [
            { t: 'h3', h: 'Structure de référence' },
            { t: 'code', lang: 'bash', code:
'boutique/\n├── app.py                  # point d\'entrée\n├── config.py               # un MODULE (un fichier)\n└── boutique/               # un PACKAGE (un dossier + __init__.py)\n    ├── __init__.py         # rend le dossier importable (peut contenir\n    │                       # l\'API publique du package)\n    ├── produits/\n    │   ├── __init__.py\n    │   ├── modeles.py      # class Produit(db.Model)…\n    │   └── vues.py         # routes du domaine\n    └── commandes/\n        ├── __init__.py\n        ├── modeles.py\n        └── vues.py' },
            { t: 'h3', h: 'Les formes d\'import, hiérarchisées' },
            { t: 'table', head: ['Forme', 'Verdict', 'Pourquoi'], rows: [
              ['`import json`', 'ok', 'explicite : json.loads visible'],
              ['`from json import loads`', 'ok', 'précis ; attention aux collisions de noms'],
              ['`import numpy as np`', 'ok', 'alias de convention (pd, plt, np…)'],
              ['`from x import *`', '**interdit**', 'importe TOUT : collisions silencieuses, origine introuvable']
            ]},
            { t: 'code', lang: 'py', code:
'# Dans boutique/produits/vues.py — deux styles :\n\n# 1. import ABSOLU (recommandé : lisible de partout, stable au déplacement)\nfrom boutique.produits.modeles import Produit\n\n# 2. import RELATIF (raccourcis internes au package)\nfrom .modeles import Produit        # . = Ce package\nfrom ..commandes.modeles import Commande   # .. = le parent\n\n# Pour qu\'un package s\'exécute proprement en module :\n# python -m boutique.produits.vues    ← depuis la RACINE du projet' },
            { t: 'h3', h: '__init__.py : carte de visite du package' },
            { t: 'code', lang: 'py', code:
'# boutique/produits/__init__.py\n# On y expose CE QUE LE MONDE a le droit d\'importer :\nfrom .modeles import Produit\nfrom .vues import bp\n\n__all__ = ["Produit", "bp"]     # définit l\'API publique\n\n# résultat ailleurs : from boutique.produits import Produit\n# — sans connaître l\'organisation interne, qui peut changer.' },
            { t: 'callout', kind: 'warn', h: 'Python cherche les modules dans `sys.path` — dont le dossier du script lancé EN PREMIER. Traduction : un de TES fichiers peut **ombrager** une librairie standard ou installée si le nom coïncide. C\'est l\'erreur n°1 du chapitre : voir plus bas.' }
          ],
          errors: [
            { title: 'Nommer son script json.py / random.py / email.py', bad: '# Mon fichier : random.py\nimport random\nprint(random.randint(1, 10))\n# AttributeError / ImportError cabalistiques !', good: '# Renomme : aleatoire.py, tirage.py, mon_random.py\n# Python importe TON fichier à la place du module standard\n# (et le fichier peut s\'importer LUI-MÊME !)', why: 'Le dossier courant précède la bibliothèque standard dans la recherche : ton json.py masque le vrai json. Symptôme signature : "module has no attribute loads" sur du code standard pourtant correct. Renomme, supprime les .pyc/__pycache__ associés.' },
            { title: 'from x import * (l\'import sauvage)', bad: 'from datetime import *\nfrom utils import *\ndate = maintenant()      # d\'où vient maintenant ?? Collisions ?', good: 'from datetime import datetime, date, timedelta\n# chaque nom est explicite ; l\'éditeur et le lecteur te remercient', why: 'L\'import étoile verse tout le contenu du module dans l\'espace courant : noms écrasés sans avertir, provenance illisible, outillage aveugle. On n\'écrit de * nulle part en production.' }
          ],
          related: ['py-modules-venv', 'py-fichiers', 'fk-blueprints', 'py-tests']
        },

        {
          id: 'py-stdlib',
          title: 'Bibliothèque standard : l\'essentiel',
          icon: 'home_repair_service',
          level: 'Intermédiaire',
          tagline: 'datetime, json, random, re, collections : cinq coffres déjà installés — « batteries included ».',
          intro: 'La devise de Python est « piles incluses » : avant d\'installer quoi que ce soit avec pip, vérifie — le besoin a probablement son module **standard**. Parade des cinq que tu utiliseras chaque semaine : `datetime` (dates et heures), `json` (sérialisation), `random` (hasard), `re` (expressions régulières) et `collections` (conteneurs évolués).',
          blocks: [
            { t: 'h3', h: 'datetime : les dates sans douleur (presque)' },
            { t: 'code', lang: 'py', code:
'from datetime import datetime, date, timedelta\n\nmaintenant = datetime.now()\nprint(maintenant.strftime("%d/%m/%Y %H:%M"))     # "21/07/2026 14:30"\n\nentree = datetime.strptime("25/12/2026", "%d/%m/%Y")  # chaîne → date\ndans_une_semaine = date.today() + timedelta(days=7)   # arithmétique\n\n# Attention aux FUSEAUX : datetime.now() = heure locale naïve.\n# Pour des dates « aware » (production, API) : zoneinfo\nfrom zoneinfo import ZoneInfo\nlome = datetime.now(ZoneInfo("Africa/Porto-Novo"))' },
            { t: 'h3', h: 'json : Python ↔ JSON' },
            { t: 'code', lang: 'py', code:
'import json\n\npanier = {"articles": ["gari", "piment"], "total": 3300, "promo": None}\n\ntexte = json.dumps(panier, ensure_ascii=False)   # dict → chaîne JSON\n# ensure_ascii=False : conserve les accents ("attiéké" lisible !)\nretour = json.loads(texte)                       # chaîne JSON → dict\nprint(retour["total"])                           # 3300\n\n# directement dans un FICHIER :\nwith open("panier.json", "w", encoding="utf-8") as f:\n    json.dump(panier, f, ensure_ascii=False, indent=2)\n# c\'est EXACTEMENT ce mécanisme que renvoie une API Flask (jsonify)' },
            { t: 'h3', h: 'random : le hasard du quotidien (PAS crypto !)' },
            { t: 'code', lang: 'py', code:
'import random\n\nrandom.randint(1, 6)              # dé : entier 1..6 inclus\nrandom.choice(["awa", "moussa"])  # un élément au hasard\nrandom.sample(prix_list, 3)       # 3 éléments DISTINCTS\nrandom.shuffle(deck)              # mélange EN PLACE (retourne None !)\nrandom.random()                   # float 0.0 <= x < 1.0\n\n# Mots de passe, jetons, clés ? PAS random → le module secrets :\nimport secrets\nsecrets.token_hex(16)             # vraiment imprévisible' },
            { t: 'h3', h: 're : les regex de survie' },
            { t: 'code', lang: 'py', code:
'import re\n\nemail = "awa@cotonou.bj"\n\n# re.search(MOTIF, texte) → un Match… ou None (donc tester avec if !)\nif re.search(r"^[\\w.]+@[\\w]+\\.[a-z]{2,3}$", email):\n    print("forme valide")\n\n# r"..." : la chaîne BRUTE — sinon les \\ se doublent dans l\'enfer\nprix = re.findall(r"\\d+", "3 gari + 2 piments")     # ["3", "2"]\ntel = re.sub(r"\\D", "", "+229 01 97 00 00 00")     # "2290197000000"\n\n# alphabet de survie : \\d chiffre, \\w mot, . n\'importe, + 1ouPlus,\n# * 0ouPlus, ? optionnel, ^ début, $ fin, [abc] classe, {2,4} compte' },
            { t: 'h3', h: 'collections : Counter et defaultdict' },
            { t: 'code', lang: 'py', code:
'from collections import Counter, defaultdict\n\nvotes = ["awa", "moussa", "awa", "awa", "moussa", "fatou"]\ndepouillement = Counter(votes)\nprint(depouillement.most_common(1))     # [("awa", 4)] — top 1\n\n# defaultdict : la clé s\'AUTO-CRÉE avec la valeur par défaut (ici : [])\npar_ville = defaultdict(list)\nfor user in utilisateurs:\n    par_ville[user["ville"]].append(user["pseudo"])\n# plus besoin de setdefault ville par ville !' },
            { t: 'callout', kind: 'tip', h: 'Avant d\'installer : cherche d\'abord dans la stdlib — `itertools` (itérateurs), `functools` (cache `lru_cache` !), `pathlib`, `csv`, `statistics`, `sqlite3` (une BDD intégrée !), `urllib`, `subprocess`. Une dépendance évitée est une dette évitée.' }
          ],
          errors: [
            { title: 'loads vs load, dumps vs dump', bad: 'with open("cfg.json") as f:\n    cfg = json.loads(f)      # TypeError : loads attend une CHAÎNE !', good: 'with open("cfg.json") as f:\n    cfg = json.load(f)       # sans "s" = lit le FICHIER\n# loads/dumps = strings ; load/dump = flux (fichiers)', why: 'Le suffixe s signifie string : json.loads(texte) parse une chaîne déjà lue ; json.load(fichier) fait la lecture ET le parsing. Confusion garantie au début — le message TypeError révèle immédiatement lequel on attendait.' },
            { title: 'random pour la sécurité', bad: 'import random\ntoken = "".join(random.choice(alphabet) for _ in range(32))\n# PRÉVISIBLE : ce générateur est statistique, pas cryptographique', good: 'import secrets\ntoken = secrets.token_urlsafe(32)\n# jetons, mots de passe temporaires, clés : secrets UNIQUEMENT', why: 'random est déterministe à l\'intérieur (graine prédictible) : un attaquant peut reconstituer la série des mots de passe générés. secrets utilise l\'entropie du système d\'exploitation — c\'est la seule famille acceptable pour la sécurité.' }
          ],
          related: ['py-fichiers', 'py-structures', 'fk-api-rest', 'py-chaines']
        },

        {
          id: 'py-tests',
          title: 'Tester : unittest & pytest',
          icon: 'bug_report',
          level: 'Intermédiaire',
          tagline: 'Un test = une fonction qui VÉRIFIE le comportement : premier test en 10 lignes, confiance en permanence.',
          intro: 'Tester, c\'est écrire du code qui **exécute ton code** et vérifie que le résultat est celui attendu — pour découvrir les régressions au moment où elles naissent, pas quand l\'utilisateur appelle. Python embarque **`unittest`** dans la bibliothèque standard ; l\'industrie utilise majoritairement **`pytest`**, plus simple et plus expressif. Tu apprendras les deux — les concepts sont identiques, seule la forme change.',
          blocks: [
            { t: 'h3', h: 'L\'anatomie d\'un test' },
            { t: 'code', lang: 'py', code:
'# total.py — LE CODE À TESTER\ndef total_panier(lignes):\n    """lignes : liste de dicts {"prix": x, "qte": y}"""\n    return sum(l["prix"] * l["qte"] for l in lignes)' },
            { t: 'code', lang: 'py', label: 'test_total.py (unittest)', code:
'import unittest\nfrom total import total_panier\n\nclass TestTotalPanier(unittest.TestCase):\n\n    def test_total_simple(self):\n        panier = [{"prix": 2500, "qte": 2}, {"prix": 300, "qte": 3}]\n        self.assertEqual(total_panier(panier), 5900)\n\n    def test_panier_vide(self):\n        self.assertEqual(total_panier([]), 0)   # cas LIMITE aussi !\n\nif __name__ == "__main__":\n    unittest.main()' },
            { t: 'code', lang: 'bash', code:
'python -m unittest              # découvre et exécute test_*.py\n# ..\n# Ran 2 tests in 0.001s — OK' },
            { t: 'h3', h: 'pytest : même idée, zéro cérémonie' },
            { t: 'code', lang: 'bash', code: 'pip install pytest' },
            { t: 'code', lang: 'py', label: 'test_total.py (pytest)', code:
'from total import total_panier\n\ndef test_total_simple():\n    panier = [{"prix": 2500, "qte": 2}, {"prix": 300, "qte": 3}]\n    assert total_panier(panier) == 5900      # assert NU : message détaillé\n\ndef test_panier_vide():\n    assert total_panier([]) == 0\n\ndef test_chiffres_negatifs_rejetes():\n    # pytest.raises : vérifier qu\'une ERREUR est bien levée\n    import pytest\n    with pytest.raises(TypeError):\n        total_panier(None)   # sommer None doit planter TypeError' },
            { t: 'code', lang: 'bash', code:
'pytest -q\n# 3 passed in 0.02s\npython -m pytest -k panier      # ne lancer que ce qui contient "panier"' },
            { t: 'h3', h: 'Les raccourcis qui font la différence' },
            { t: 'ul', items: [
              '**AAA** : Arrange (préparer), Act (appeler UNE chose), Assert (vérifier) — la structure lisible de tout test.',
              '**Un comportement = un test** : nom parlant (`test_panier_vide_vaut_zero`, pas `test1`).',
              '**Cas limites d\'abord** : vide, zéro, None, caractères spéciaux, très grand — c\'est là que vivent les bugs.',
              '**Tests isolés** : pas d\'ordre imposé, pas d\'état partagé entre tests (pytest fournit les fixtures pour ça).',
              '**Tester SON code** : pas la stdlib ni le framework — eux sont déjà testés par leurs auteurs.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Le code facile à tester est le code **pur** (entrées → sortie, pas d\'effet de bord caché) : c\'est la même vertu que les comprehensions, les reducers… et celle que récompensent les architectures Flask (factory = app CONSTRUITE, donc re-construite en test avec une config à part — fiche Blueprints & factory).' }
          ],
          errors: [
            { title: 'Tester le framework au lieu de son propre code', bad: 'def test_sum():\n    assert sum([1, 2]) == 3        # …teste PYTHON, pas ton code !\ndef test_liste_append():\n    l = []\n    l.append(1)\n    assert l == [1]                # pareil', good: 'def test_remise_appliquee():\n    assert appliquer_remise(1000, 0.1) == 900\n# un test = un comportement MÉTIER que toi seul peux casser', why: 'Un test qui ne peut échouer que si le LANGAGE est cassé ne protège rien. Le filet utile cible tes règles métier : calculs, validations, transformations — ce qui peut régresser à la prochaine retouche.' },
            { title: 'Tests dépendants de l\'ordre d\'exécution', bad: 'donnees = []   # partagées\ndef test_ajout():\n    donnees.append(1)\ndef test_taille():\n    assert len(donnees) == 1   # faux  Un seul test ? random si -x après', good: 'def test_taille():\n    donnees = [1]              # chaque test PRÉPARE son propre monde\n    assert len(donnees) == 1\n# ou fixtures pytest (@pytest.fixture) pour la préparation partagée', why: 'pytest exécute dans l\'ordre du fichier — aujourd\'hui ; demain en parallèle, ou lancé partiellement : un état partagé fait des tests qui « passent seuls mais échouent ensemble ». Chaque test doit pouvoir tourner SEUL.' }
          ],
          related: ['py-exceptions', 'py-modules-packages', 'py-typage', 'fk-blueprints']
        }
      ]
    }
  ]
};
