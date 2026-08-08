/* ============================================================
   data-algo.js — Module Algorithmique & Pseudo-code
   Fondations de la logique de programmation avant tout langage.
   Public : grand débutant, aucune connaissance préalable.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.algo = {
  id: 'algo',
  name: 'Algorithmique',
  icon: 'account_tree',
  tagline: 'La logique avant le code : variables, conditions, boucles, tableaux — les fondations qui marchent dans TOUS les langages.',
  heroTitle: 'Algorithmique, la logique avant le code',

  categories: [
    /* ======================================================
       1. PREMIERS PAS
       ====================================================== */
    {
      id: 'premiers-pas',
      name: 'Premiers pas',
      icon: 'rocket_launch',
      fiches: [
        {
          id: 'algo-definition',
          title: 'Qu\'est-ce qu\'un algorithme ?',
          icon: 'psychology',
          level: 'Débutant',
          tagline: 'Avant de parler code, parlons logique : un algorithme, c\'est une recette — et tu en suis déjà tous les jours.',
          intro: 'Le mot « algorithme » fait peur. Il évoque des maths compliquées, des écrans noirs, du jargon. En réalité, tu connais déjà des dizaines d\'algorithmes par cœur — tu les appelles juste autrement. Une recette de cuisine, un itinéraire Google Maps, le mode d\'emploi pour faire une lessive : ce sont tous des algorithmes. Un algorithme, c\'est simplement une **suite d\'instructions précises, dans un ordre précis, pour résoudre un problème**. Cette fiche est la plus importante du module : si tu comprends ce qu\'est un algorithme, tout le reste — variables, boucles, conditions — devient juste du vocabulaire pour écrire ces instructions.',
          blocks: [
            { t: 'h3', h: 'Trois exemples de la vraie vie avant toute ligne de code' },
            { t: 'p', h: '**1. La recette de l\'akassa (pâte de maïs fermentée).** « Prendre 500 g de farine de maïs. Ajouter 1 L d\'eau tiède. Mélanger jusqu\'à obtenir une pâte homogène. Laisser fermenter 48 heures. Cuire à feu doux en remuant 20 minutes. » Ces cinq étapes sont un algorithme : une entrée (la farine, l\'eau), une sortie (l\'akassa prêt), et des étapes dans un ORDRE PRÉCIS. Si tu cuis avant de fermenter, le résultat est immangeable. L\'ordre compte.' },
            { t: 'p', h: '**2. L\'itinéraire du zémidjan.** « Départ marché Dantokpa. Prendre la rue vers le carrefour Sainte-Rita. Au rond-point, prendre la 2e sortie. Continuer 500 m jusqu\'au portail bleu. » C\'est un algorithme de navigation : un point de départ, une destination, et des décisions à chaque carrefour (c\'est ce qu\'on appellera une « condition »).' },
            { t: 'p', h: '**3. Le tri des pièces de monnaie.** Tu vides ta poche : des pièces de 500 F, 200 F, 100 F, 50 F. Tu veux les ranger de la plus grosse à la plus petite. Algorithme : « Prendre toutes les pièces. Chercher la plus grosse, la mettre de côté. Recommencer avec ce qui reste. » C\'est un algorithme de TRI — le sujet de plusieurs fiches du module.' },
            { t: 'h3', h: 'La définition officielle, maintenant que l\'intuition est là' },
            { t: 'syntax', title: 'La forme canonique d\'un algorithme, décortiquée', lang: 'text', code:
'ALGORITHME totalPanier\nDÉBUT\n  total ← 0\n  AFFICHER total\nFIN', legend: [
              ['ALGORITHME totalPanier', 'la DÉCLARATION : on baptise la recette d\'un nom en MAJUSCULES, par convention du module'],
              ['DÉBUT … FIN', 'les BORNES : tout ce qui se trouve entre les deux s\'exécute de haut en bas, une ligne à la fois, sans exception'],
              ['total ← 0', 'une AFFECTATION : la flèche range la valeur de droite dans la boîte nommée à gauche — l\'opération nº 1 de tout algorithme'],
              ['AFFICHER total', 'une SORTIE : montrer le résultat à l\'utilisateur. Un algorithme se juge à ce trio : entrées → traitement fini → résultat']
            ]},
            { t: 'p', h: 'Un **algorithme** est une suite finie d\'opérations élémentaires, exécutées dans un ordre précis, qui transforme des **données d\'entrée** en un **résultat de sortie**. Chaque terme compte : « finie » signifie qu\'il se termine (pas de boucle infinie) ; « élémentaire » signifie que chaque étape est assez simple pour être exécutée sans ambiguïté ; « ordre précis » signifie que les étapes ne sont pas interchangeables. Le processeur de ton téléphone ne « comprend » rien — il exécute bêtement des instructions, une par une, dans l\'ordre. La magie vient de la combinaison de ces instructions simples.' },
            { t: 'h3', h: 'Les trois propriétés d\'un bon algorithme' },
            { t: 'ul', items: [
              '**Il se termine** (finitude) : une recette qui dit « remuer jusqu\'à ce que ce soit prêt » sans définir « prêt » n\'est pas un algorithme. Il faut un critère d\'arrêt clair (« remuer 20 minutes »).',
              '**Chaque étape est sans ambiguïté** (précision) : « mettre un peu de sel » n\'est pas une instruction précise. « Ajouter 5 g de sel » l\'est. Un ordinateur ne sait pas improviser.',
              '**Il produit le résultat attendu** (correction) : si ta recette d\'akassa produit du béton à chaque fois, l\'algorithme est faux, même si les étapes sont claires.'
            ] },
            { t: 'h3', h: 'Algorithme = programme ? Pas tout à fait' },
            { t: 'p', h: 'Un **algorithme** est une idée, écrite en français (ou en maths, ou en dessin). Un **programme** est cette même idée traduite dans un langage que l\'ordinateur comprend (Python, JavaScript, C…). L\'algorithme est la recette ; le programme, c\'est la recette en anglais pour un cuisinier américain. C\'est pour ça que ce module existe : apprendre à PENSER les algorithmes avant de les CODER. Une fois que tu sais écrire un algorithme en français, le traduire en Python ou JavaScript n\'est plus qu\'une question de vocabulaire.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Un algorithme, c\'est du code. »** Non — c\'est la LOGIQUE avant le code. Tu peux écrire un algorithme sur un papier, avec des phrases en français. Le code, c\'est la TRADUCTION de cette logique pour une machine.',
              '**« Les algorithmes, c\'est que pour les maths. »** Non — un algorithme peut résoudre N\'IMPORTE quel problème : commander un zémidjan, gérer une tontine, afficher un catalogue. Le calcul n\'est qu\'UN type de problème parmi d\'autres.',
              '**« Je dois tout mémoriser pour écrire un algorithme. »** Non — comprendre la LOGIQUE est plus important que mémoriser la syntaxe. Tu peux toujours chercher « comment on écrit une boucle en Python », mais tu dois SAVOIR que tu as besoin d\'une boucle.',
              '**« Un algorithme compliqué est un bon algorithme. »** C\'est le contraire : un bon algorithme est le plus SIMPLE possible pour résoudre le problème. La complexité est un défaut, pas une qualité.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est le socle de tout le module — et de tous les modules suivants. La notion de « suite d\'instructions dans l\'ordre » prépare les **variables** (fiche suivante : stocker des résultats intermédiaires) et les **conditions** (comment choisir entre deux chemins). Si tu as déjà ouvert le module HTML, tu as vu que `<h1>` puis `<p>` puis `<img>` s\'exécutent dans l\'ordre : c\'est déjà un algorithme d\'affichage. Et chaque fois que tu suis une recette, un plan, un mode d\'emploi — tu exécutes un algorithme sans le savoir.' }
          ],
          errors: [
            {
              title: 'Croire que l\'ordinateur « comprend » ce qu\'on lui dit',
              bad: '// On écrit :\nAFFICHER "Bonjour le marché"\n// et on s\'attend à ce que l\'ordinateur\n// « sache » ce qu\'est un marché.',
              good: '// Un ordinateur ne comprend RIEN.\n// Il exécute des instructions, point.\n// « Bonjour le marché » est juste\n// une suite de caractères pour lui.\n// C\'est le programmeur qui donne du sens.',
              why: 'Confondre « exécuter » et « comprendre » mène à des bugs mystérieux : l\'ordinateur fait EXACTEMENT ce qu\'on lui dit, pas ce qu\'on VOUDRAIT qu\'il fasse. Une virgule oubliée = une instruction différente. La précision absolue est le prix de la programmation.'
            },
            {
              title: 'Écrire des étapes trop vagues',
              bad: '1. Préparer les ingrédients\n2. Cuire\n3. Servir',
              good: '1. Peser 500 g de farine de maïs\n2. Verser 1 L d\'eau tiède (30-35 °C)\n3. Mélanger 3 minutes jusqu\'à disparition des grumeaux\n4. Laisser fermenter 48 h à température ambiante\n5. Cuire à feu doux en remuant 20 minutes',
              why: '« Préparer » n\'est pas une instruction : c\'est un objectif. Un algorithme doit décomposer chaque objectif en actions ÉLÉMENTAIRES — des actions qu\'un exécutant (humain ou machine) peut réaliser sans réfléchir, sans interpréter, sans improviser.'
            }
          ],
          related: ['algo-pseudo-code', 'algo-variables', 'algo-organigrammes']
        },
        {
          id: 'algo-pseudo-code',
          title: 'Le pseudo-code : à quoi ça sert',
          icon: 'edit_note',
          level: 'Débutant',
          tagline: 'Écrire la logique en français avant de la traduire en code : la compétence qui distingue ceux qui programment de ceux qui tapent.',
          intro: 'Imagine que tu dois expliquer une recette à quelqu\'un qui ne parle pas ta langue. Tu vas mimer, montrer du doigt, utiliser des mots simples. Le **pseudo-code**, c\'est exactement ça : tu écris la logique de ton programme en français simplifié, sans te soucier des règles d\'un langage particulier. Une fois que la logique est claire sur le papier, la traduire en Python, JavaScript ou PHP n\'est plus qu\'une formalité. Cette fiche pose les conventions qu\'on utilisera dans TOUT le module — la grammaire du pseudo-code.',
          blocks: [
            { t: 'h3', h: 'Pourquoi ne pas écrire directement en Python ou JavaScript ?' },
            { t: 'p', h: 'Parce que les langages de programmation sont remplis de détails qui n\'ont rien à voir avec la logique. En JavaScript, tu dois écrire `let x = 5;` (le `let`, le point-virgule). En Python, `x = 5` suffit. En C, `int x = 5;` (il faut déclarer le type). Trois syntaxes différentes pour la MÊME idée : « je range 5 dans une boîte appelée x ». Le pseudo-code te libère de ces détails. Tu écris `x ← 5` et tu passes à la suite. La syntaxe exacte, tu l\'apprendras plus tard, dans le langage de ton choix.' },
            { t: 'p', h: 'Deuxième raison, encore plus importante : **quand tu écris du vrai code, ton cerveau fait deux choses à la fois** — résoudre le problème ET respecter la syntaxe du langage. C\'est comme essayer de composer un poème dans une langue que tu apprends : tu passes plus de temps à chercher tes mots qu\'à réfléchir à ce que tu veux dire. Le pseudo-code sépare les deux : d\'abord la logique (en français), ensuite la syntaxe (dans le vrai langage).' },
            { t: 'h3', h: 'Notre convention de pseudo-code pour tout le module' },
            { t: 'syntax', title: 'Lire une ligne de pseudo-code, token par token', lang: 'text', code:
'prix ← 1500        // la flèche range la valeur\nSI prix > 1000 ALORS\n  AFFICHER "Livraison offerte"\nFIN SI', legend: [
              ['←', 'l\'AFFECTATION : « range la valeur de droite dans la variable de gauche ». Ce n\'est PAS le « égal » des maths !'],
              ['SI … ALORS … FIN SI', 'la DÉCISION : le bloc indenté ne s\'exécute que si la condition est VRAIE ; FIN SI ferme proprement la porte'],
              ['"Livraison offerte"', 'le texte se note TOUJOURS entre guillemets — sinon Livraison serait pris pour une variable'],
              ['// …', 'un commentaire : une note pour les humains, totalement ignorée à l\'exécution']
            ]},
            { t: 'p', h: 'Pour que tu puisses lire n\'importe quelle fiche sans te demander « ça veut dire quoi ce symbole ? », on va utiliser les MÊMES conventions partout. Les voici — imprime-les ou garde-les sous les yeux pour les premières fiches :' },
            { t: 'table', head: ['En pseudo-code', 'Signification', 'Équivalent en français'], rows: [
              ['`x ← 5`', 'Affectation : ranger 5 dans x', '« x prend la valeur 5 »'],
              ['`LIRE x`', 'Lire une saisie utilisateur', '« demande une valeur, range-la dans x »'],
              ['`AFFICHER x`', 'Afficher une valeur à l\'écran', '« montre le contenu de x »'],
              ['`SI condition ALORS`', 'Condition', '« si c\'est vrai, fais ceci »'],
              ['`SINON`', 'Alternative', '« sinon, fais cela »'],
              ['`TANT QUE condition FAIRE`', 'Boucle conditionnelle', '« répète tant que c\'est vrai »'],
              ['`POUR i DE 1 À n FAIRE`', 'Boucle comptée', '« répète n fois »'],
              ['`// commentaire`', 'Explication ignorée', '« note pour toi-même »'],
              ['`FONCTION nom(param)`', 'Définition de fonction', '« voici un bloc d\'instructions réutilisable »'],
              ['`RETOURNER valeur`', 'Renvoyer un résultat', '« le résultat de la fonction est… »']
            ] },
            { t: 'h3', h: 'Conventions de notation' },
            { t: 'ul', items: [
              'Les **mots-clés** du pseudo-code sont en MAJUSCULES (`SI`, `TANT QUE`, `LIRE`, `AFFICHER`) pour les distinguer du reste.',
              'Les **noms de variables** sont en minuscules, descriptifs (`prix_gari`, `nombre_sacs`, `est_disponible`).',
              'L\'**indentation** (décalage vers la droite) montre ce qui est « à l\'intérieur » d\'un bloc. Tout ce qui dépend d\'un `SI` ou d\'un `TANT QUE` est décalé de 2 espaces.',
              'Les **commentaires** commencent par `//` et sont ignorés. Ils expliquent POURQUOI on fait quelque chose, pas CE QU\'on fait (le code le dit déjà).'
            ] },
            { t: 'h3', h: 'Exemple : la différence entre penser en code et penser en pseudo-code' },
            { t: 'p', h: 'Imaginons qu\'on veut vérifier si un client a droit à une réduction (plus de 50 000 F d\'achats). Voici la MÊME logique écrite de trois façons :' },
            { t: 'code', lang: 'text', label: 'La logique pure — ce que ton cerveau pense', code:
'// Algorithme : vérifier la réduction\nLIRE total_achats\nSI total_achats > 50000 ALORS\n  AFFICHER "Réduction de 10 % accordée"\nSINON\n  AFFICHER "Pas de réduction"\nFIN SI' },
            { t: 'code', lang: 'js', label: 'Même logique en JavaScript (détails de syntaxe)', code:
'let totalAchats = Number(prompt("Total des achats ?"));\nif (totalAchats > 50000) {\n  console.log("Réduction de 10 % accordée");\n} else {\n  console.log("Pas de réduction");\n}' },
            { t: 'code', lang: 'py', label: 'Même logique en Python (autres détails)', code:
'total_achats = float(input("Total des achats ? "))\nif total_achats > 50000:\n    print("Réduction de 10 % accordée")\nelse:\n    print("Pas de réduction")' },
            { t: 'p', h: 'La logique est IDENTIQUE dans les trois versions. Seule la syntaxe change. Si tu sais écrire la version pseudo-code, tu sais déjà l\'essentiel — il ne te reste qu\'à apprendre le vocabulaire du langage cible. C\'est exactement le but de ce module.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le pseudo-code, c\'est un langage comme Python, avec des règles strictes. »** Non — c\'est du FRANÇAIS structuré. Personne ne va compiler ton pseudo-code. Il sert à COMMUNIQUER une idée, pas à l\'exécuter. Si ton pseudo-code est clair pour un humain, il est correct.',
              '**« Je peux sauter l\'étape pseudo-code, je code directement. »** Tu peux… pour des programmes de 10 lignes. Au-delà, écrire la logique d\'abord t\'évite de réécrire 3 fois le même code parce que tu n\'avais pas pensé à un cas. Les pros le font — ils appellent ça « design » ou « plan ».',
              '**« Mon pseudo-code doit ressembler à du vrai code. »** Non — le pseudo-code bien écrit se lit comme une conversation structurée. Si ta grand-mère peut suivre la logique, ton pseudo-code est excellent.',
              '**« TANT QUE et POUR sont interchangeables. »** Non — `TANT QUE` s\'utilise quand tu ne sais pas combien de tours il y aura ; `POUR` quand le nombre de tours est connu. Choisir la mauvaise, c\'est comme prendre un marteau pour visser.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est la grammaire de tout le module. Chaque notion suivante — variables, conditions, boucles — sera présentée D\'ABORD en pseudo-code avec CETTE convention, puis illustrée en Python et JavaScript. Garde la table des conventions sous les yeux pour les 3-4 premières fiches ; ensuite, elle deviendra naturelle. Et si tu ouvres un jour le module Python ou JavaScript, tu reconnaîtras immédiatement les structures que tu auras apprises ici.' }
          ],
          errors: [
            {
              title: 'Oublier que le pseudo-code doit être COMPRIS, pas EXÉCUTÉ',
              bad: 'x = int(input())\nif x > 0: print("positif")',
              good: 'LIRE nombre\nSI nombre > 0 ALORS\n  AFFICHER "Le nombre est positif"\nFIN SI',
              why: 'Le premier exemple est du Python valide… mais quelqu\'un qui ne connaît pas Python ne peut pas le lire. Le pseudo-code doit être auto-suffisant — compréhensible SANS connaître un langage de programmation. « LIRE » dit ce que ça fait ; `int(input())` dit COMMENT.'
            },
            {
              title: 'Mélanger pseudo-code et vrai code dans le même bloc',
              bad: 'POUR i DE 1 À n FAIRE\n  print(tableau[i])      // du Python au milieu !\nFIN POUR',
              good: 'POUR i DE 1 À n FAIRE\n  AFFICHER tableau[i]\nFIN POUR\n\n// Plus tard, en Python :\nfor i in range(1, n+1):\n    print(tableau[i])',
              why: 'Mélanger les deux mondes casse la promesse du pseudo-code : être lisible par tous. Garde le pseudo-code PUR (100 % français structuré). La traduction en vrai langage vient DANS UN AUTRE BLOC, à part, clairement séparé.'
            }
          ],
          related: ['algo-definition', 'algo-variables', 'algo-conditions', 'algo-boucles', 'algo-passage-code']
        }
      ]
    },

    /* ======================================================
       2. DONNÉES
       ====================================================== */
    {
      id: 'donnees',
      name: 'Données & variables',
      icon: 'data_object',
      fiches: [
        {
          id: 'algo-variables',
          title: 'Les variables : des boîtes étiquetées',
          icon: 'label',
          level: 'Débutant',
          tagline: 'Une variable, c\'est une boîte avec une étiquette — tu y ranges une valeur, et tu la ressors quand tu veux.',
          intro: 'Imaginons que tu tiens un carnet de comptes pour la tontine des couturières. Tu notes « Aminatou : 5 000 F », « Soundous : 5 000 F ». Le lendemain, Aminatou te donne 5 000 F de plus. Tu ne vas pas réécrire TOUT le carnet — tu vas juste changer la ligne d\'Aminatou. En programmation, cette « ligne du carnet », c\'est une **variable** : un espace de stockage avec un NOM (l\'étiquette) et une VALEUR (ce qui est rangé dedans). Cette fiche est la plus fondamentale après « qu\'est-ce qu\'un algorithme » : TOUT le reste du module (conditions, boucles, fonctions) manipule des variables.',
          blocks: [
            { t: 'h3', h: 'L\'analogie de la boîte étiquetée' },
            { t: 'p', h: 'Imagine une étagère avec des boîtes. Chaque boîte porte une étiquette (son NOM). Tu peux ranger UNE chose à la fois dans chaque boîte (sa VALEUR). Tu peux ouvrir la boîte pour VOIR ce qu\'il y a dedans, REMPLACER le contenu par autre chose, ou COPIER le contenu dans une autre boîte. Une variable, c\'est exactement ça. `x ← 5` signifie : « prends une boîte, colle une étiquette `x` dessus, mets `5` dedans ». Plus tard, `AFFICHER x` signifie : « ouvre la boîte `x` et montre ce qu\'il y a dedans ».' },
            { t: 'h3', h: 'Déclaration, affectation, lecture' },
            { t: 'syntax', title: 'Les trois gestes d\'une variable, décortiqués', lang: 'text', code:
'score ← 0\nscore ← score + 10\nAFFICHER score', legend: [
              ['score ← 0', 'DÉCLARER + initialiser : créer la boîte « score » et y ranger 0. Une variable doit TOUJOURS avoir une valeur de départ'],
              ['score ← score + 10', 'RELIRE puis ÉCRASER : la machine lit l\'ancienne valeur (0), ajoute 10, et range le résultat (10) à la place. La flèche n\'est pas une égalité !'],
              ['AFFICHER score', 'LIRE la valeur : à cet instant précis, la boîte contient 10 — c\'est ce contenu qui part vers l\'écran'],
              ['la règle d\'or', 'à droite de ← on CALCULE avec l\'ancien contenu ; à gauche, on ÉCRIT le nouveau. Lecture d\'abord, écrasement ensuite']
            ]},
            { t: 'code', lang: 'text', label: 'Les trois opérations de base sur une variable', code:
'// 1. AFFECTATION : ranger une valeur dans la boîte\nprix_gari ← 500\nnombre_sacs ← 12\nvendeuse ← "Awa Mensah"\nest_disponible ← VRAI\n\n// 2. LECTURE : utiliser le contenu de la boîte\nAFFICHER prix_gari           // affiche 500\ntotal ← prix_gari * nombre_sacs   // utilise les VALEURS des boîtes\nAFFICHER total                // affiche 6000\n\n// 3. MODIFICATION : changer le contenu\nprix_gari ← 550              // la boîte contient maintenant 550\n// L\'ancienne valeur (500) est PERDUE — écrasée' },
            { t: 'p', h: 'Deux choses cruciales dans cet exemple. D\'abord, `prix_gari ← 500` ne signifie PAS « prix_gari est égal à 500 pour toujours ». C\'est une AFFECTATION : « à cet instant, je mets 500 dans la boîte prix_gari ». La flèche `←` n\'est pas un signe égal mathématique — c\'est un geste, une action. Ensuite, quand on écrit `total ← prix_gari * nombre_sacs`, on ne range pas le CALCUL dans la boîte — on range le RÉSULTAT du calcul (6000). La boîte contient une valeur, jamais une formule.' },
            { t: 'h3', h: 'Nommer une variable : l\'art de se faire comprendre plus tard' },
            { t: 'p', h: 'Tu pourrais appeler tes boîtes `a`, `b`, `c`. Ton programme marcherait. Mais quand tu le reliras dans 6 mois, tu passeras 20 minutes à te demander ce que `b` représentait. Une variable bien nommée, c\'est une variable qui RACONTE ce qu\'elle contient : `prix_gari` plutôt que `p`, `nombre_sacs` plutôt que `n`, `vendeuse_principale` plutôt que `v`. Les règles de nommage qu\'on utilisera dans tout le module :' },
            { t: 'ul', items: [
              '**Descriptif** : le nom dit CE que contient la boîte, pas COMMENT on l\'utilise. `total_ventes` plutôt que `x` ; `est_disponible` plutôt que `flag`.',
              '**En minuscules, avec des underscores** (`_`) pour séparer les mots : `prix_unitaire`, `nombre_articles`. C\'est la convention dite « snake_case ».',
              '**Les booléens** (vrai/faux) commencent par `est_` : `est_valide`, `est_vide`, `est_termine`.',
              '**Pas d\'accents ni d\'espaces** : `prix_gari` et non `prix garì`. Seuls les lettres (a-z), chiffres (0-9) et underscores sont autorisés.',
              '**Pas de mots réservés** : tu ne peux pas appeler ta variable `SI`, `POUR`, `TANT_QUE` — ces mots ont déjà un sens.'
            ] },
            { t: 'h3', h: 'Le nom ≠ la valeur — la confusion nº 1 des débutants' },
            { t: 'p', h: 'Quand tu écris `AFFICHER vendeuse`, tu ne demandes pas à l\'ordinateur d\'afficher le MOT « vendeuse ». Tu demandes d\'ouvrir la boîte étiquetée `vendeuse` et d\'afficher son CONTENU. C\'est la différence entre le NOM d\'une variable (l\'étiquette sur la boîte, qui ne change jamais) et sa VALEUR (le contenu, qui peut changer à tout moment). Si plus tard tu fais `vendeuse ← "Koffi Adjoa"`, le nom reste `vendeuse` mais le contenu a changé.' },
            { t: 'h3', h: 'Trace d\'exécution : suivre les variables pas à pas' },
            { t: 'p', h: 'Voici un mini-programme et ce qui se passe DANS LES BOÎTES à chaque étape. C\'est ce qu\'on appelle une « trace » :' },
            { t: 'table', head: ['Instruction exécutée', 'Boîte "prix"', 'Boîte "qte"', 'Boîte "total"'], rows: [
              ['`prix ← 500`', '500', '(vide)', '(vide)'],
              ['`qte ← 3`', '500', '3', '(vide)'],
              ['`total ← prix * qte`', '500', '3', '1500'],
              ['`prix ← 550`', '550', '3', '1500'],
              ['`AFFICHER total`', '550', '3', '1500']
            ] },
            { t: 'p', h: 'Regarde la dernière ligne : on a changé `prix`, mais `total` n\'a PAS changé. Il vaut toujours 1500. Pourquoi ? Parce que `total` a été calculé UNE FOIS, à la ligne 3, avec la valeur de `prix` À CE MOMENT-LÀ (500). Modifier `prix` APRÈS ne change pas `total`. Une variable stocke une VALEUR, pas une FORMULE. C\'est une des leçons les plus importantes du module — et la source de bugs que tu verras dans tous les langages.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« x ← 5 veut dire que x est égal à 5. »** Non — c\'est une AFFECTATION : « range 5 dans x ». La preuve : `x ← x + 1` est parfaitement valide en programmation (« prends la valeur de x, ajoute 1, range le résultat dans x ») mais serait absurde en maths (aucun nombre n\'est égal à lui-même + 1).',
              '**« Une variable qui n\'a pas reçu de valeur contient 0. »** Non — elle ne contient RIEN. Utiliser une variable non initialisée, c\'est ouvrir une boîte vide : selon le langage, tu obtiendras une erreur ou une valeur aléatoire. Toujours donner une valeur AVANT de lire.',
              '**« Modifier prix change automatiquement total. »** Non — `total` a été calculé UNE FOIS avec l\'ANCIENNE valeur de `prix`. Il ne se met pas à jour tout seul. Pour recalculer, il faut RÉEXÉCUTER `total ← prix * qte`.',
              '**« Je peux mettre n\'importe quel caractère dans un nom de variable. »** Non — uniquement lettres, chiffres et underscores. Pas d\'espaces, pas d\'accents, pas de tirets. Et le nom ne peut pas commencer par un chiffre.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les variables sont le socle de TOUT. La fiche suivante (`algo-types`) précise CE QU\'on peut mettre dans une boîte (nombres, texte, booléens). Les conditions (`algo-conditions`) comparent des variables ; les boucles (`algo-boucles`) les modifient à chaque tour ; les tableaux (`algo-tableaux`) sont des rangées de boîtes indexées. Et dans n\'importe quel vrai langage, tu retrouveras les variables — sous le nom de `let` (JavaScript), `$` (PHP), ou rien du tout (Python).' }
          ],
          errors: [
            {
              title: 'Confondre le nom de la variable et une chaîne de caractères',
              bad: 'AFFICHER vendeuse\n// Affiche le CONTENU de la boîte\n// "Awa Mensah"\n\nAFFICHER "vendeuse"\n// Affiche le MOT "vendeuse"\n// (les guillemets font la différence !)',
              good: '// Sans guillemets : on lit la boîte\nAFFICHER vendeuse       → Awa Mensah\n\n// Avec guillemets : du texte fixe\nAFFICHER "vendeuse"     → vendeuse\n\n// Mixte : texte + contenu de boîte\nAFFICHER "Vendeuse : " + vendeuse\n→ Vendeuse : Awa Mensah',
              why: 'Les guillemets sont le seul moyen de distinguer « affiche le MOT vendeuse » de « affiche le CONTENU de la boîte vendeuse ». Sans guillemets, l\'ordinateur cherche une variable de ce nom. Avec, il prend les caractères tels quels. C\'est universel — même distinction en Python, JS, PHP.'
            },
            {
              title: 'Lire une variable avant de lui avoir donné une valeur',
              bad: 'AFFICHER total\n// total n\'a jamais reçu de valeur !\n// → erreur ou valeur bizarre',
              good: 'total ← 0          // on initialise\nAFFICHER total      // 0\n// Puis on calcule :\ntotal ← prix * qte\nAFFICHER total      // 6000',
              why: 'Une variable qui n\'a jamais reçu de valeur est une boîte vide. L\'ouvrir, c\'est lire du bruit — une valeur laissée par un programme précédent en mémoire. Certains langages refusent de compiler (Java, C#), d\'autres affichent une erreur (Python), d\'autres retournent `undefined` (JavaScript). Dans tous les cas, le réflexe à prendre : TOUJOURS initialiser avant de lire.'
            }
          ],
          related: ['algo-types', 'algo-conditions', 'algo-boucles', 'algo-tableaux']
        },
        {
          id: 'algo-types',
          title: 'Les types de données de base',
          icon: 'category',
          level: 'Débutant',
          tagline: 'Un nombre, du texte, un oui/non : tout ce qu\'on peut ranger dans une variable — et rien d\'autre.',
          intro: 'Une boîte (variable) peut contenir différentes CATÉGORIES de choses. Tu ne ranges pas un prix (500 F) de la même façon qu\'un nom ("Awa") ou qu\'une réponse (oui/non). Ces catégories s\'appellent des **types de données**. En connaître quatre suffit pour résoudre 90 % des problèmes du quotidien : les nombres entiers, les nombres décimaux, le texte, et les booléens (vrai/faux). Cette fiche te les présente avec des exemples concrets du marché — parce qu\'un type, c\'est juste une réponse à la question « qu\'est-ce que je peux faire avec cette valeur ? » On ne fait pas les mêmes opérations sur un prix que sur un nom.',
          blocks: [
            { t: 'h3', h: 'Type 1 : le nombre entier' },
            { t: 'p', h: 'Un **entier** (integer), c\'est un nombre sans virgule : `12`, `500`, `-3`, `0`. Au marché, c\'est le nombre de sacs de gari, la quantité de clients servis, le numéro d\'un stand. Les opérations naturelles : addition, soustraction, multiplication, division entière, modulo (le reste de la division). Exemple : `12` sacs restants, `3` vendus → `12 - 3 = 9`. Le résultat est toujours un entier.' },
            { t: 'h3', h: 'Type 2 : le nombre décimal' },
            { t: 'p', h: 'Un **décimal** (float, nombre à virgule) permet de représenter des prix avec centimes (`499.99`), des mesures (`1.5` kg), des pourcentages (`0.18` pour 18 %). Attention : en informatique, le séparateur décimal est le POINT, pas la virgule. `19.99` et non `19,99`. Et les calculs sur les décimaux ne sont pas toujours exacts à cause de la façon dont l\'ordinateur les stocke (en binaire) — `0.1 + 0.2` peut donner `0.30000000000000004` au lieu de `0.3`. Pour l\'argent, on préfère souvent compter en centimes avec des entiers (500 F = 500, pas 500.00).' },
            { t: 'h3', h: 'Type 3 : le texte (chaîne de caractères)' },
            { t: 'p', h: 'Une **chaîne de caractères** (string), c\'est du texte : un nom, un message, une adresse. On la reconnaît à ses GUILLEMETS : `"Awa Mensah"`, `"gari"`, `"Dantokpa N12"`. Sans guillemets, `Awa` serait interprété comme un nom de variable ; avec, c\'est du texte. On peut concaténer (coller bout à bout) des chaînes : `"Bonjour " + vendeuse` donne `"Bonjour Awa Mensah"`. On peut mesurer leur longueur (`TAILLE("gari")` = 4), extraire une partie, chercher un mot dedans.' },
            { t: 'h3', h: 'Type 4 : le booléen (vrai/faux)' },
            { t: 'p', h: 'Un **booléen** (boolean), c\'est une simple réponse OUI/NON, VRAI/FAUX. Il n\'y a que DEUX valeurs possibles : `VRAI` ou `FAUX`. C\'est le type des CONDITIONS : « le stock est-il vide ? » → `FAUX` (il reste 12 sacs). « Le client a-t-il payé ? » → `VRAI`. Les booléens semblent minuscules, mais ils sont les plus puissants : ce sont eux qui pilotent les `SI` (si c\'est VRAI, fais ceci) et les `TANT QUE` (continue tant que c\'est VRAI). C\'est le type des DÉCISIONS.' },
            { t: 'h3', h: 'Résumé visuel des quatre types' },
            { t: 'syntax', title: 'Les quatre littéraux à reconnaître à vue', lang: 'text', code:
'age ← 25              // ENTIER\nprix ← 1499.99        // DÉCIMAL\nnom ← "Awa"           // TEXTE\nenStock ← VRAI        // BOOLÉEN', legend: [
              ['25', 'ENTIER : un nombre sans virgule — quantités, compteurs, âges. Gare à 25 / 10 qui peut donner 2 en division entière'],
              ['1499.99', 'DÉCIMAL : un nombre à virgule, pour les prix et les mesures — avec la fameuse imprécision 0.1 + 0.2 ≈ 0.3 dans les vrais langages'],
              ['"Awa"', 'TEXTE (chaîne de caractères) : toujours entre guillemets. Et "25" entre guillemets est du TEXTE, pas un nombre !'],
              ['VRAI', 'BOOLÉEN : seulement VRAI ou FAUX — le résultat naturel de toutes les comparaisons, et le carburant des SI et des TANT QUE']
            ]},
            { t: 'table', head: ['Type', 'Exemples', 'Opérations possibles', 'Anecdotique'], rows: [
              ['Entier', '`500`, `-3`, `0`, `42`', '`+`, `-`, `*`, `/`, `%`', 'Pas de virgule. Souvent utilisé pour compter.'],
              ['Décimal', '`499.99`, `1.5`, `0.18`', '`+`, `-`, `*`, `/`', 'Le point, jamais la virgule. Imprécision binaire.'],
              ['Chaîne', '`"gari"`, `"Bonjour"`', 'concaténer `+`, longueur, chercher', 'Toujours entre guillemets.'],
              ['Booléen', '`VRAI`, `FAUX`', '`ET`, `OU`, `NON`', 'Seulement 2 valeurs. Pilote les conditions.']
            ] },
            { t: 'h3', h: 'Pourquoi les types sont importants' },
            { t: 'p', h: 'Parce qu\'on ne fait PAS la même chose avec un nombre qu\'avec du texte. `500 + 3` donne `503` (addition). `"500" + "3"` donne `"5003"` (concaténation de texte). Mêmes symboles, résultat complètement différent. Si par erreur tu traites un nombre comme du texte, ton addition devient une colle de mots — et tu passes trois heures à chercher pourquoi `12 + 3` fait `123`. C\'est le bug le plus classique des débutants, dans TOUS les langages. Certains langages (Java, C) t\'obligent à déclarer le type à l\'avance ; d\'autres (Python, JavaScript, PHP) le déduisent automatiquement. Mais dans tous les cas, le type EXISTE — visible ou pas.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Un nombre entre guillemets, c\'est un nombre. »** Non — `"500"` (avec guillemets) est du TEXTE, pas un nombre. On ne peut pas faire d\'addition avec. C\'est comme écrire « cinq cents » sur un papier : un humain comprend que c\'est un nombre, un ordinateur voit juste les lettres c-i-n-q.',
              '**« VRAI = 1 et FAUX = 0. »** Parfois oui en interne, mais ne compte pas dessus. `VRAI` n\'est pas un nombre, c\'est un état. Traiter un booléen comme un nombre, c\'est prendre le risque de bugs subtils.',
              '**« Tous les nombres sont stockés exactement. »** Les entiers, oui (jusqu\'à une certaine taille). Les décimaux, NON — à cause du stockage binaire. Pour l\'argent, utilise des entiers (centimes) ou des types spéciaux selon le langage.',
              '**« Une variable peut changer de type. »** Dans certains langages (Python, JavaScript, PHP), oui. Dans d\'autres (Java, C), non. Mais même quand c\'est possible, c\'est une MAUVAISE IDÉE : une variable qui était un nombre et devient du texte en cours de route, c\'est un bug en puissance.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les types donnent un SENS aux variables de la fiche précédente. Savoir QUOI ranger dans une boîte est aussi important que de savoir COMMENT la nommer. La fiche suivante (`algo-io`) utilise ces types pour LIRE ce que l\'utilisateur tape (toujours du texte au départ, à convertir si besoin) et AFFICHER des résultats. Et dans n\'importe quel langage — Python (`int`, `float`, `str`, `bool`), JavaScript (`number`, `string`, `boolean`) — tu retrouveras ces quatre familles, parfois avec des noms différents, jamais avec des concepts différents.' }
          ],
          errors: [
            {
              title: 'Additionner du texte en croyant additionner des nombres',
              bad: 'prix ← "500"\nqte ← "3"\ntotal ← prix + qte\nAFFICHER total\n// Affiche "5003" (concaténation de texte !)',
              good: 'prix ← 500       // sans guillemets : nombre\nqte ← 3\ntotal ← prix + qte\nAFFICHER total\n// Affiche 503 (addition)',
              why: 'Le symbole `+` fait DEUX choses différentes selon le type : addition pour les nombres, concaténation pour le texte. Quand tes données viennent d\'un formulaire ou d\'une saisie utilisateur, elles arrivent TOUJOURS en texte. Il faut les CONVERTIR en nombre avant de calculer — c\'est le sujet de la fiche Entrées/Sorties.'
            },
            {
              title: 'Comparer un booléen avec VRAI comme si c\'était un test',
              bad: 'SI est_valide = VRAI ALORS\n  AFFICHER "OK"\nFIN SI\n// = est une AFFECTATION, pas une comparaison !\n// On a MIS VRAI dans est_valide, puis on teste\n// est_valide (qui est maintenant toujours VRAI)',
              good: 'SI est_valide ALORS    // est_valide EST déjà un booléen\n  AFFICHER "OK"\nFIN SI\n// ou, pour comparer :\nSI est_valide = VRAI ALORS   // = est la comparaison\n  AFFICHER "OK"\nFIN SI',
              why: 'En pseudo-code, on utilise `=` pour l\'égalité et `←` pour l\'affectation — justement pour éviter cette confusion. Mais dans beaucoup de vrais langages, `=` c\'est l\'affectation et `==` la comparaison. Le bug « j\'ai mis un = au lieu de == » est le plus célèbre de l\'histoire de la programmation.'
            }
          ],
          related: ['algo-variables', 'algo-io', 'algo-conditions', 'algo-operateurs']
        },
        {
          id: 'algo-io',
          title: 'Entrées / sorties : LIRE et AFFICHER',
          icon: 'input',
          level: 'Débutant',
          tagline: 'Parler à l\'utilisateur : récupérer ce qu\'il tape et lui montrer les résultats — les deux portes de tout programme.',
          intro: 'Jusqu\'ici, nos algorithmes travaillaient avec des valeurs « en dur » : `prix ← 500`. Mais dans la vraie vie, c\'est l\'UTILISATEUR qui donne les valeurs. À la caisse de la boutique, on ne code pas le prix de chaque article — on le LIT (saisie, code-barres). Et une fois le total calculé, on ne le garde pas pour soi — on l\'AFFICHE. Ces deux opérations — LIRE (recevoir une donnée) et AFFICHER (montrer un résultat) — sont les portes d\'entrée et de sortie de tout programme interactif. Cette fiche les présente en pseudo-code, avec la subtilité cruciale : TOUT ce que l\'utilisateur tape arrive en TEXTE, même les nombres — il faut les convertir.',
          blocks: [
            { t: 'h3', h: 'LIRE : la porte d\'entrée' },
            { t: 'syntax', title: 'LIRE : bloquer et recueillir, décortiqué', lang: 'text', code:
'LIRE nomClient\nAFFICHER "Bonjour " + nomClient', legend: [
              ['LIRE nomClient', 'met le programme en PAUSE, attend que l\'utilisateur tape quelque chose, puis range sa réponse dans la variable indiquée'],
              ['nomClient', 'la boîte RÉCEPTRICE : après le LIRE, elle contient ce que l\'humain a tapé — du TEXTE, le plus souvent'],
              ['AFFICHER "Bonjour " + nomClient', 'preuve immédiate : on peut réutiliser la saisie dans la foulée, comme si elle avait toujours été là'],
              ['la règle d\'hygiène', 'ce qui vient d\'un LIRE est une entrée EXTERNE : imprévisible — les vrais programmes la vérifient avant de la croire']
            ]},
            { t: 'p', h: '`LIRE x` signifie : « attends que l\'utilisateur tape quelque chose, et range cette valeur dans la variable `x` ». C\'est l\'équivalent d\'un champ de formulaire, d\'une question dans un terminal, d\'un prompt. Le programme s\'ARRÊTE et attend. Quand l\'utilisateur a fini de taper (touche Entrée), la valeur est stockée dans `x` et le programme continue. Ce qui est tapé est TOUJOURS du texte. Si l\'utilisateur tape `500`, tu reçois la CHAÎNE `"500"`, pas le nombre `500`.' },
            { t: 'h3', h: 'AFFICHER : la porte de sortie' },
            { t: 'syntax', title: 'AFFICHER : assembler une phrase, décortiqué', lang: 'text', code:
'AFFICHER "Total : " + total + " FCFA"', legend: [
              ['AFFICHER …', 'envoie une SORTIE vers l\'écran. L\'utilisateur ne voit QUE ce qui est affiché — jamais tes variables ni tes calculs internes'],
              ['"Total : "', 'un morceau de texte fixe, avec son espace final — il ne s\'invente pas tout seul !'],
              ['+', 'la CONCATÉNATION : le plus colle les morceaux de texte et les valeurs de variables en une seule phrase'],
              ['total', 'la VARIABLE lue à cet instant : sa valeur actuelle remplace son nom dans la phrase affichée']
            ]},
            { t: 'p', h: '`AFFICHER x` signifie : « montre le contenu de la variable `x` à l\'écran ». On peut afficher une variable (`AFFICHER total`), du texte fixe (`AFFICHER "Bonjour"`), ou les deux ensemble (`AFFICHER "Total : " + total`). C\'est le seul moyen pour ton programme de COMMUNIQUER avec l\'utilisateur. Sans `AFFICHER`, ton programme travaille dans le noir — il calcule, mais personne ne voit le résultat.' },
            { t: 'h3', h: 'Exemple complet : le calculateur de prix du marché' },
            { t: 'code', lang: 'text', label: 'Pseudo-code — calcul du prix total', code:
'// Programme : calculer le prix total d\'une commande\nAFFICHER "Quel produit ?"\nLIRE produit\nAFFICHER "Prix unitaire (FCFA) ?"\nLIRE prix_texte\nprix ← CONVERTIR_EN_NOMBRE(prix_texte)\nAFFICHER "Quantité ?"\nLIRE qte_texte\nqte ← CONVERTIR_EN_NOMBRE(qte_texte)\ntotal ← prix * qte\nAFFICHER "Commande : " + produit\nAFFICHER "Total : " + total + " FCFA"' },
            { t: 'p', h: 'Remarque la conversion : on lit `prix_texte` (une chaîne), puis on le convertit en nombre avec `CONVERTIR_EN_NOMBRE`. Si l\'utilisateur tape `500`, la conversion donne le nombre `500`. S\'il tape `"gratuit"`, la conversion échoue — et il faut gérer cette erreur (fiche Conditions). Cette étape de conversion est OBLIGATOIRE dans tous les langages, même ceux qui la font automatiquement (JavaScript est le champion des conversions silencieuses qui créent des bugs).' },
            { t: 'h3', h: 'Trace d\'exécution pas à pas' },
            { t: 'table', head: ['Étape', 'Ce qui se passe', 'Valeur lue / affichée'], rows: [
              ['1', 'Le programme affiche la question', '→ "Quel produit ?"'],
              ['2', 'L\'utilisateur tape "gari"', 'produit ← "gari"'],
              ['3', 'Question prix', '→ "Prix unitaire ?"'],
              ['4', 'L\'utilisateur tape "500"', 'prix_texte ← "500"'],
              ['5', 'Conversion', 'prix ← 500 (nombre)'],
              ['6', 'Question quantité', '→ "Quantité ?"'],
              ['7', 'L\'utilisateur tape "3"', 'qte_texte ← "3"'],
              ['8', 'Conversion', 'qte ← 3 (nombre)'],
              ['9', 'Calcul', 'total ← 500 * 3 = 1500'],
              ['10', 'Affichage résultat', '→ "Commande : gari Total : 1500 FCFA"']
            ] },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« LIRE attend que j\'appuie sur Entrée, mais je peux aussi cliquer. »** En pseudo-code, `LIRE` suppose une saisie au clavier validée par Entrée. Dans une vraie interface graphique, une « lecture » peut être un clic, un champ de formulaire, un curseur. Le concept est le même : le programme attend une action de l\'utilisateur.',
              '**« Si je LIRE un nombre, j\'obtiens un nombre. »** Non — tu obtiens du TEXTE, même si l\'utilisateur a tapé des chiffres. La conversion en nombre est une étape séparée, explicite. Oublier cette conversion est le bug n°1 des calculs sur des saisies utilisateur.',
              '**« AFFICHER est juste pour déboguer. »** Non — dans un programme interactif, `AFFICHER` est le SEUL moyen de donner le résultat à l\'utilisateur. Sans lui, le programme est une boîte noire qui ne sert à rien.',
              '**« Je peux AFFICHER une variable directement. »** Oui, mais le résultat peut être surprenant : `AFFICHER total` affiche `1500`, pas `"total : 1500 FCFA"`. L\'habillage du message (libellé, unité) est à ta charge.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: '`LIRE` et `AFFICHER` sont les opérations qui donnent VIE aux variables (`algo-variables`) : au lieu de coder `prix ← 500` en dur, on demande à l\'utilisateur. Les types (`algo-types`) deviennent concrets : `LIRE` retourne toujours une chaîne, qu\'il faut convertir. Les conditions (`algo-conditions`) permettront de VALIDER ce que l\'utilisateur tape. Et dans tous les vrais langages, ces opérations existent : `input()` en Python, `prompt()` en JavaScript, `readline()` en PHP, `scanf()` en C.' }
          ],
          errors: [
            {
              title: 'Oublier de convertir la saisie avant de calculer',
              bad: 'AFFICHER "Prix ?"\nLIRE prix\nAFFICHER "Quantité ?"\nLIRE qte\ntotal ← prix * qte\n// prix et qte sont du TEXTE !\n// "500" * "3" → erreur ou résultat absurde',
              good: 'AFFICHER "Prix ?"\nLIRE prix_texte\nprix ← CONVERTIR_EN_NOMBRE(prix_texte)\nAFFICHER "Quantité ?"\nLIRE qte_texte\nqte ← CONVERTIR_EN_NOMBRE(qte_texte)\ntotal ← prix * qte',
              why: 'Toute saisie utilisateur est du TEXTE. Même si l\'utilisateur tape `500`, l\'ordinateur reçoit les caractères `5`, `0`, `0` — pas le nombre 500. La conversion explicite transforme ces caractères en valeur numérique. Si l\'utilisateur tape autre chose ("gratuit"), la conversion échoue — et c\'est une erreur qu\'il faut GÉRER (fiche Conditions).'
            },
            {
              title: 'Afficher sans contexte (l\'utilisateur ne comprend pas ce qu\'on lui montre)',
              bad: 'total ← 1500\nAFFICHER total\n// L\'écran affiche juste "1500"\n// L\'utilisateur se demande :\n// « 1500 quoi ? De quel produit ? »',
              good: 'AFFICHER "Total de votre commande : " + total + " FCFA"\n// L\'écran affiche :\n// "Total de votre commande : 1500 FCFA"',
              why: 'Un nombre brut sans libellé est inexploitable. `AFFICHER total` montre `1500` — est-ce des francs CFA, des dollars, des kilos ? L\'utilisateur ne doit jamais avoir à DEVINER ce qu\'un nombre représente. Chaque affichage inclut son unité et son contexte.'
            }
          ],
          related: ['algo-variables', 'algo-types', 'algo-conditions', 'algo-operateurs']
        }
      ]
    },

    /* ======================================================
       3. OPÉRATEURS
       ====================================================== */
    {
      id: 'operateurs',
      name: 'Opérateurs',
      icon: 'calculate',
      fiches: [
        {
          id: 'algo-operateurs',
          title: 'Opérateurs : calculs, comparaisons, logique',
          icon: 'calculate',
          level: 'Débutant',
          tagline: '+ - * / pour calculer, = ≠ < > pour comparer, ET OU NON pour raisonner : les trois familles d\'opérateurs.',
          intro: 'Une variable, c\'est bien. Mais ce qui rend la programmation puissante, c\'est ce qu\'on PEUT FAIRE avec ces variables. Comparer deux prix, vérifier si un stock est vide, calculer une remise — tout ça passe par des **opérateurs**. Il en existe trois familles, et les connaître couvre 90 % de ce que tu écriras : les opérateurs ARITHMÉTIQUES (calculer), les opérateurs de COMPARAISON (décider), et les opérateurs LOGIQUES (combiner des décisions). Cette fiche est dense — garde-la comme référence et reviens-y quand les fiches Conditions et Boucles utiliseront ces symboles.',
          blocks: [
            { t: 'h3', h: 'Famille 1 : les opérateurs arithmétiques (calculer)' },
            { t: 'syntax', title: 'DIV et MOD : les deux stars méconnues', lang: 'text', code:
'quotient ← 17 DIV 5   // → 3\nreste ← 17 MOD 5      // → 2', legend: [
              ['DIV', 'la division ENTIÈRE : combien de fois 5 rentre au complet dans 17 — 3, sans virgule ni arrondi'],
              ['MOD', 'le RESTE de la division : 17 = 3 × 5 + 2. Star discrète de l\'algorithmique'],
              ['à quoi ça sert ?', 'pair/impair (n MOD 2 vaut 0 ou 1), boucler sur les jours de la semaine, répartir en colonnes, convertir des minutes en heures'],
              ['17 / 5', 'au contraire, la simple barre donne 3.4 : le DÉCIMAL complet. Trois divisions, trois résultats différents — choisis la bonne !']
            ]},
            { t: 'p', h: 'Ce sont les opérateurs que tu connais depuis l\'école primaire, avec deux ajouts propres à l\'informatique :' },
            { t: 'table', head: ['Opérateur', 'Nom', 'Exemple', 'Résultat'], rows: [
              ['`+`', 'Addition', '`5 + 3`', '`8`'],
              ['`-`', 'Soustraction', '`5 - 3`', '`2`'],
              ['`*`', 'Multiplication', '`5 * 3`', '`15`'],
              ['`/`', 'Division', '`5 / 2`', '`2.5`'],
              ['`%`', 'Modulo (reste)', '`5 % 2`', '`1` (reste de 5÷2)'],
              ['`//`', 'Division entière', '`5 // 2`', '`2` (partie entière)']
            ] },
            { t: 'p', h: 'Le **modulo** (`%`) mérite une explication : c\'est le RESTE de la division entière. `17 % 5` = 2 (car 17 = 3×5 + 2). À quoi ça sert ? À savoir si un nombre est pair (`n % 2 = 0`), à faire une action tous les N tours de boucle, à distribuer des éléments dans des colonnes. C\'est l\'opérateur le plus sous-estimé — et le plus utile une fois qu\'on le comprend.' },
            { t: 'h3', h: 'Famille 2 : les opérateurs de comparaison (décider)' },
            { t: 'syntax', title: 'Comparer : la matière première des décisions', lang: 'text', code:
'stock > 0        // VRAI si on peut vendre\nprix = 1500      // égalité stricte\nnom ≠ ""         // différent d\'un texte vide', legend: [
              ['>  >=  <  <=', 'les comparaisons d\'ordre : le résultat est TOUJOURS VRAI ou FAUX, jamais un nombre'],
              ['=', 'le test d\'égalité. En pseudo-code on reste simple avec = ; en vrai langage ce sera == ou === — ne confonds plus avec l\'affectation ←'],
              ['≠', '« différent de » : deviendra != ou !== en programmation'],
              ['""', 'le texte VIDE : un contenu légitime, différent de « rien » — tester nom ≠ "" vérifie qu\'un champ a bien été rempli']
            ]},
            { t: 'p', h: 'Ces opérateurs répondent à une question par VRAI ou FAUX. Ils sont le cœur des CONDITIONS (`SI`).' },
            { t: 'table', head: ['Opérateur', 'Signification', 'Exemple', 'Résultat'], rows: [
              ['`=`', 'Égal à', '`5 = 3`', '`FAUX`'],
              ['`≠`', 'Différent de', '`5 ≠ 3`', '`VRAI`'],
              ['`<`', 'Strictement inférieur', '`5 < 3`', '`FAUX`'],
              ['`>`', 'Strictement supérieur', '`5 > 3`', '`VRAI`'],
              ['`≤`', 'Inférieur ou égal', '`5 ≤ 5`', '`VRAI`'],
              ['`≥`', 'Supérieur ou égal', '`3 ≥ 5`', '`FAUX`']
            ] },
            { t: 'callout', kind: 'warn', h: 'En pseudo-code, on utilise `=` pour l\'égalité et `←` pour l\'affectation. Mais dans presque tous les vrais langages, c\'est l\'inverse : `=` pour l\'affectation, `==` pour l\'égalité. C\'est LA confusion à anticiper quand tu passeras à Python ou JavaScript.' },
            { t: 'h3', h: 'Famille 3 : les opérateurs logiques (combiner)' },
            { t: 'syntax', title: 'ET, OU, NON : combiner les conditions', lang: 'text', code:
'SI age >= 18 ET carteValide ALORS\n  AFFICHER "Entrée autorisée"\nFIN SI', legend: [
              ['ET', 'les DEUX côtés doivent être vrais — un seul faux fait tout basculer à FAUX. Chaque contrainte ajoutée DURCIT le filtre'],
              ['OU', 'il suffit qu\'UN côté soit vrai — il faut les deux faux pour échouer. Idéal pour « paiement MoMo OU carte OU espèces »'],
              ['NON condition', 'l\'INVERSE logique : NON VRAI vaut FAUX. Sert à exprimer « tant que le client N\'est PAS servi »'],
              ['le réflexe pro', 'dès qu\'une condition dépasse deux morceaux, pose-toi la question des parenthèses : ET l\'emporte sur OU, comme × sur +']
            ]},
            { t: 'p', h: 'Ces opérateurs combinent des conditions. « Je veux un gari ET de l\'huile », « Je prends le zémidjan OU le taxi » : tu fais déjà de la logique combinatoire sans le savoir.' },
            { t: 'table', head: ['Opérateur', 'Signification', 'Est VRAI si…', 'Exemple'], rows: [
              ['`ET`', 'Conjonction', 'Les DEUX conditions sont vraies', '`age ≥ 18 ET pays = "Bénin"`'],
              ['`OU`', 'Disjonction', 'Au MOINS UNE condition est vraie', '`moyen = "zemidjan" OU moyen = "taxi"`'],
              ['`NON`', 'Négation', 'La condition est FAUSSE', '`NON est_vide` (≡ `est_vide = FAUX`)']
            ] },
            { t: 'p', h: 'La subtilité du `OU` : en français, « fromage OU dessert » sous-entend souvent « l\'un OU l\'autre, pas les deux ». En informatique, `OU` est INCLUSIF : si les deux sont vrais, le résultat est VRAI. Pour le « ou exclusif » (l\'un ou l\'autre mais pas les deux), on précise `OU exclusif`.' },
            { t: 'h3', h: 'Exemple complet : vérifier l\'éligibilité à une promotion' },
            { t: 'code', lang: 'text', label: 'Pseudo-code — promotion Dantokpa', code:
'// Promotion : -10 % si le client achète pour plus de\n// 10 000 F ET qu\'il est membre de la tontine\nLIRE total_achats\nLIRE est_membre_tontine\nSI (total_achats > 10000) ET (est_membre_tontine = VRAI) ALORS\n  remise ← total_achats * 0.10\n  prix_final ← total_achats - remise\n  AFFICHER "Remise de 10 % : -" + remise + " FCFA"\n  AFFICHER "Prix final : " + prix_final + " FCFA"\nSINON\n  AFFICHER "Pas de remise applicable"\nFIN SI' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le modulo, c\'est juste pour les maths. »** Non — c\'est l\'outil le plus pratique du quotidien : savoir si un nombre est pair (`n % 2 = 0`), si on est à la 5e ligne d\'un tableau (`i % 5 = 0`), si une année est bissextile. Apprends à le reconnaître.',
              '**« `=` et `←` c\'est pareil, c\'est juste une question de style. »** Non — c\'est la différence entre DIRE « je mets 5 dans x » (`x ← 5`) et DEMANDER « x vaut-il 5 ? » (`x = 5`). Les confondre, c\'est comme confondre « je remplis le verre » et « le verre est-il plein ? ». Actions ≠ questions.',
              '**« `ET` et `OU` s\'utilisent comme en français. »** Presque, mais avec une différence clé : en informatique, les deux côtés sont TOUJOURS évalués. Dans `(x ≠ 0) ET (10 / x > 2)`, si `x = 0`, la division va planter AVANT que le `ET` ne voie que la première condition est fausse. Certains langages ont un `ET` « paresseux » qui s\'arrête dès qu\'il sait le résultat — mais pas tous.',
              '**« Les comparaisons ne marchent que sur les nombres. »** On peut aussi comparer du texte (`"gari" < "huile"` → VRAI car `g` vient avant `h` dans l\'alphabet) et des booléens. Mais les règles varient selon le langage — renseigne-toi.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les opérateurs sont les outils qui transforment des variables inactives en logique vivante. Les comparaisons alimentent directement les conditions (`algo-conditions`) : un `SI` sans comparaison, c\'est une voiture sans volant. Les opérateurs logiques (`ET`, `OU`, `NON`) permettent de combiner plusieurs conditions. Et les opérateurs arithmétiques sont le pain quotidien des boucles (`algo-boucles`) : `i ← i + 1` est probablement la ligne de code la plus écrite de l\'histoire de l\'informatique.' }
          ],
          errors: [
            {
              title: 'Utiliser = pour l\'affectation et = pour la comparaison dans la même ligne',
              bad: 'SI x = 5 ALORS    // Est-ce une affectation ? Une comparaison ?\n  AFFICHER "ok"\nFIN SI\n// En pseudo-code, = est la comparaison.\n// Mais en Python/JS, = serait l\'affectation !',
              good: '// En pseudo-code (notre convention) :\nSI x = 5 ALORS\n  AFFICHER "ok"\nFIN SI\n// Plus tard en Python :\nif x == 5:\n    print("ok")\n// Plus tard en JavaScript :\nif (x === 5) { console.log("ok"); }',
              why: 'Le passage du pseudo-code au vrai code est le moment où cette confusion explose. En pseudo-code, `=` compare et `←` affecte. En Python/JS, `=` affecte et `==` compare. Ce n\'est pas une « erreur de syntaxe » — c\'est un bug LOGIQUE : ton programme compile, tourne… et fait n\'importe quoi.'
            },
            {
              title: 'Oublier les parenthèses dans une condition composée',
              bad: 'SI age ≥ 18 ET pays = "Bénin" ALORS\n// L\'ordinateur lit-il :\n// (age ≥ 18) ET (pays = "Bénin") ?\n// Ou : age ≥ (18 ET pays) = "Bénin" ?\n// Les opérateurs ont des PRIORITÉS — comme en maths\n// où × est prioritaire sur +.',
              good: 'SI (age ≥ 18) ET (pays = "Bénin") ALORS\n// Les parenthèses lèvent toute ambiguïté.\n// Même si tu connais les priorités,\n// celui qui relira ton code dans 6 mois\n// te remerciera.',
              why: 'Les opérateurs ont des règles de priorité (ET avant OU, comparaisons avant ET/OU…) mais personne ne les connaît toutes par cœur. Les parenthèses coûtent deux caractères et éliminent une classe entière de bugs. Utilise-les systématiquement dès qu\'il y a plus d\'une condition.'
            }
          ],
          related: ['algo-variables', 'algo-conditions', 'algo-boucles', 'algo-types']
        }
      ]
    },

    /* ======================================================
       4. CONTRÔLE
       ====================================================== */
    {
      id: 'controle',
      name: 'Structures de contrôle',
      icon: 'alt_route',
      fiches: [
        {
          id: 'algo-conditions',
          title: 'SI, SINON, SINON SI : faire des choix',
          icon: 'call_split',
          level: 'Débutant',
          tagline: 'Le programme ne suit plus un chemin tout droit — il CHOISIT sa route selon les circonstances.',
          intro: 'Jusqu\'ici, tous nos algorithmes étaient linéaires : ligne 1, ligne 2, ligne 3… dans l\'ordre, sans surprise. Mais un vrai programme doit S\'ADAPTER. « Si le client a payé, confirme la commande. Sinon, affiche un message d\'attente. » « Si le stock est vide, ne pas vendre. Sinon, décrémenter le stock. » Ces bifurcations s\'appellent des **structures conditionnelles** — et la plus courante, `SI / SINON`, est probablement la construction la plus importante que tu apprendras dans ce module. Un programme sans conditions, c\'est un distributeur automatique qui donne la même canette quel que soit le bouton pressé.',
          blocks: [
            { t: 'h3', h: 'L\'analogie de l\'arbre de décision' },
            { t: 'p', h: 'Imagine que tu es à un carrefour. Ton GPS te dit : « SI le feu est vert, ALORS avance tout droit. SINON, tourne à droite. » Cette phrase contient TOUTE la structure conditionnelle : une CONDITION (le feu est-il vert ?), une branche VRAI (avancer), une branche FAUX (tourner). C\'est exactement ce que fait un `SI / SINON`.' },
            { t: 'h3', h: 'La structure SI / SINON en pseudo-code' },
            { t: 'syntax', title: 'SI / SINON / FIN SI : la bifurcation, décortiquée', lang: 'text', code:
'SI stock >= quantiteDemandee ALORS\n  AFFICHER "Vente acceptée"\nSINON\n  AFFICHER "Stock insuffisant"\nFIN SI', legend: [
              ['SI condition ALORS', 'le TEST : si la condition vaut VRAI, le bloc indenté s\'exécute ; sinon on l\'enjambé d\'un bond'],
              ['>=', 'le choix de l\'opérateur est la moitié du métier : stock >= demande accepte le « juste assez », stock > demande le refuse'],
              ['SINON', 'le plan B : ne s\'exécute QUE si la condition est fausse. UN des deux blocs tourne, jamais les deux, jamais aucun'],
              ['FIN SI', 'la fermeture obligatoire : sans elle, l\'ordinateur ne sait plus où la décision se termine'],
              ['l\'indentation', 'le décalage à droite n\'est pas décoratif : il montre visuellement ce qui DÉPEND du test — relire devient instantané']
            ]},
            { t: 'code', lang: 'text', label: 'Forme simple', code:
'SI condition ALORS\n  // instructions si la condition est VRAIE\nSINON\n  // instructions si la condition est FAUSSE\nFIN SI' },
            { t: 'p', h: 'Le `SINON` est OPTIONNEL. Si tu n\'as rien à faire quand la condition est fausse, tu peux écrire simplement `SI … ALORS … FIN SI` sans le `SINON`. Et note l\'indentation : les instructions à l\'intérieur du SI sont DÉCALÉES VERS LA DROITE. Ce n\'est pas décoratif — ça montre visuellement ce qui « appartient » à la condition.' },
            { t: 'h3', h: 'Exemple 1 : vérifier le stock avant de vendre' },
            { t: 'code', lang: 'text', label: 'Boutique — vente avec contrôle de stock', code:
'LIRE quantite_demandee\nSI quantite_demandee ≤ stock_disponible ALORS\n  stock_disponible ← stock_disponible - quantite_demandee\n  AFFICHER "Vente effectuée. Stock restant : " + stock_disponible\nSINON\n  AFFICHER "Stock insuffisant. Disponible : " + stock_disponible\nFIN SI' },
            { t: 'h3', h: 'Exemple 2 : plusieurs branches avec SINON SI' },
            { t: 'syntax', title: 'SINON SI : la cascade de cas, décortiquée', lang: 'text', code:
'SI total >= 50000 ALORS\n  taux ← 10\nSINON SI total >= 20000 ALORS\n  taux ← 5\nSINON\n  taux ← 0\nFIN SI', legend: [
              ['SINON SI … ALORS', 'enchaîne les tests : chaque condition n\'est évaluée QUE si toutes les précédentes sont fausses'],
              ['l\'ORDRE compte', 'on teste du plus exigeant au plus tolérant : un total de 60 000 passe le 1er test et ne redescend JAMAIS aux suivants'],
              ['taux ← 10', 'chaque branche fait sa petite cuisine : remplir la même variable permet de la lire après le FIN SI, quel que soit le chemin'],
              ['SINON final', 'le filet de sécurité : il attrape tous les cas restants — le programme ne reste jamais « sans réponse »']
            ]},
            { t: 'p', h: 'Quand il y a plus de deux chemins possibles, on enchaîne les `SINON SI` :' },
            { t: 'code', lang: 'text', label: 'Boutique — tarifs selon la quantité', code:
'LIRE nb_sacs\nprix_unitaire ← 0\nSI nb_sacs ≥ 100 ALORS\n  prix_unitaire ← 400    // tarif grossiste\nSINON SI nb_sacs ≥ 50 ALORS\n  prix_unitaire ← 450    // tarif demi-gros\nSINON SI nb_sacs ≥ 10 ALORS\n  prix_unitaire ← 480    // tarif détaillant\nSINON\n  prix_unitaire ← 500    // prix public\nFIN SI\nAFFICHER "Prix unitaire : " + prix_unitaire + " FCFA"\nAFFICHER "Total : " + (nb_sacs * prix_unitaire) + " FCFA"' },
            { t: 'p', h: 'Important : l\'ordre des `SINON SI` compte. Chaque condition est testée DANS L\'ORDRE, et la PREMIÈRE qui est vraie est exécutée — les suivantes sont ignorées. C\'est pour ça que `≥ 100` vient avant `≥ 50` : si on testait `≥ 50` d\'abord, 100 sacs tomberaient dans le tarif demi-gros au lieu du tarif grossiste.' },
            { t: 'h3', h: 'SI sans SINON : la version courte' },
            { t: 'p', h: 'Parfois tu veux faire une action UNIQUEMENT si la condition est vraie, et ne rien faire sinon. Le `SINON` n\'est pas obligatoire :' },
            { t: 'code', lang: 'text', label: 'Boutique — alerte de stock bas', code:
'SI stock_disponible < 10 ALORS\n  AFFICHER "Alerte : stock bas, réapprovisionnez !"\nFIN SI\n// Pas de SINON — on ne fait rien si le stock est OK' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le SINON est obligatoire. »** Non — il est optionnel. Si tu n\'as rien à faire dans le cas contraire, ne mets pas de `SINON`. Écrire `SI … SINON // ne rien faire` est du bruit inutile.',
              '**« On peut mettre un SI dans un SI. »** Oui, sans limite — on appelle ça des conditions « imbriquées ». Mais au-delà de 2-3 niveaux, c\'est illisible. Utilise `SINON SI` ou découpe en fonctions.',
              '**« La condition doit être entre parenthèses. »** En pseudo-code, ce n\'est pas obligatoire (tu peux écrire `SI x > 5 ALORS`). Dans beaucoup de vrais langages, les parenthèses sont obligatoires autour de la condition (`if (x > 5)`).',
              '**« SI stock > 0 ALORS vendre veut dire qu\'on ne vend QUE si le stock est positif. »** Exact — et c\'est le piège : SI on oublie le `SINON`, que se passe-t-il si le stock est nul ? Rien. Le programme continue comme si de rien n\'était. Parfois c\'est voulu ; souvent c\'est un oubli.'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les conditions utilisent les opérateurs de comparaison (`algo-operateurs`) et les booléens (`algo-types`). La condition `SI est_valide ALORS` exploite directement une variable booléenne. Les conditions sont aussi le premier endroit où l\'on voit l\'INTÉRÊT des booléens : sans eux, impossible de choisir entre deux branches. La fiche suivante (`algo-boucles`) combine conditions ET répétition : `TANT QUE` est un `SI` qui se répète.' }
          ],
          errors: [
            {
              title: 'Tester la mauvaise condition à cause de l\'ordre des SI / SINON SI',
              bad: 'SI nb_sacs ≥ 50 ALORS prix ← 450\nSINON SI nb_sacs ≥ 100 ALORS prix ← 400\n// 100 sacs → tombent dans ≥ 50 (450 F) !\n// La condition ≥ 100 n\'est JAMAIS testée pour 100.',
              good: 'SI nb_sacs ≥ 100 ALORS prix ← 400\nSINON SI nb_sacs ≥ 50 ALORS prix ← 450\nSINON prix ← 500\n// On teste du PLUS RESTRICTIF au MOINS RESTRICTIF.',
              why: 'Les `SINON SI` sont testés dans l\'ordre et la PREMIÈRE condition vraie gagne. Mettre une condition plus large AVANT une plus restrictive, c\'est rendre la seconde inatteignable. Règle d\'or : toujours tester les cas les PLUS SPÉCIFIQUES en premier.'
            },
            {
              title: 'Oublier le cas où aucune condition n\'est vraie',
              bad: 'SI nb_sacs ≥ 100 ALORS prix ← 400\nSINON SI nb_sacs ≥ 50 ALORS prix ← 450\nSINON SI nb_sacs ≥ 10 ALORS prix ← 480\n// Et si nb_sacs = 5 ?\n// prix ← n\'a jamais été défini !',
              good: 'SI nb_sacs ≥ 100 ALORS prix ← 400\nSINON SI nb_sacs ≥ 50 ALORS prix ← 450\nSINON SI nb_sacs ≥ 10 ALORS prix ← 480\nSINON prix ← 500\n// Le SINON final attrape TOUS les cas restants.',
              why: 'Une chaîne de `SINON SI` sans `SINON` final laisse des cas non traités. La variable `prix` n\'aura jamais reçu de valeur pour les quantités < 10 — selon le langage, tu obtiendras une erreur, une valeur par défaut, ou un bug silencieux. Toujours avoir un `SINON` attrape-tout en dernier recours, même s\'il ne fait qu\'afficher une erreur.'
            }
          ],
          related: ['algo-operateurs', 'algo-boucles', 'algo-types', 'algo-variables']
        },
        {
          id: 'algo-boucles',
          title: 'TANT QUE, POUR, RÉPÉTER : répéter sans se répéter',
          icon: 'repeat',
          level: 'Débutant',
          tagline: 'Faire 100 fois la même chose sans écrire 100 lignes : les boucles, le vrai moteur de l\'informatique.',
          intro: 'Imagine qu\'on te demande d\'afficher les nombres de 1 à 100. Tu pourrais écrire `AFFICHER 1`, `AFFICHER 2`… cent fois. Mais imagine maintenant qu\'on te demande d\'afficher les nombres de 1 à N, où N est saisi par l\'utilisateur. Impossible d\'écrire « N lignes » si tu ne connais pas N à l\'avance. Les **boucles** sont la solution : tu écris le traitement UNE FOIS, et tu demandes à la machine de le RÉPÉTER automatiquement. Trois types de boucles couvrent tous les besoins : `TANT QUE` (répéter tant qu\'une condition est vraie), `POUR` (répéter un nombre connu de fois), et `RÉPÉTER JUSQU\'À` (faire au moins une fois).',
          blocks: [
            { t: 'h3', h: 'TANT QUE : la boucle conditionnelle' },
            { t: 'syntax', title: 'TANT QUE : répéter sous condition, décortiqué', lang: 'text', code:
'stock ← 10\nTANT QUE stock > 0 FAIRE\n  AFFICHER "Vente d\'un article"\n  stock ← stock - 1\nFIN TANT QUE', legend: [
              ['TANT QUE condition FAIRE', 'répète le bloc TANT QUE la condition reste vraie — le test se fait AVANT chaque tour : zéro tour est possible'],
              ['stock ← stock - 1', 'LA ligne vitale : quelque chose dans la boucle doit faire ÉVOLUER la condition. Oublie-la et la boucle tourne pour toujours — le crash classique'],
              ['stock ← 10', 'l\'initialisation AVANT la boucle : sans valeur de départ, la condition n\'a rien à tester'],
              ['le rythme exact', 'tester → exécuter → retester → réexécuter… jusqu\'au test FAUX : la sortie se fait proprement, entre deux tours']
            ]},
            { t: 'p', h: '`TANT QUE` répète un bloc d\'instructions AUSSI LONGTEMPS qu\'une condition reste vraie. Si la condition est fausse dès le départ, le bloc n\'est JAMAIS exécuté (zéro tour). C\'est la boucle la plus souple, mais aussi la plus dangereuse — si la condition ne devient jamais fausse, la boucle tourne À L\'INFINI.' },
            { t: 'code', lang: 'text', label: 'Boutique — servir les clients un par un', code:
'nb_clients ← 10\nclients_servis ← 0\nTANT QUE clients_servis < nb_clients FAIRE\n  AFFICHER "Client suivant : " + (clients_servis + 1)\n  clients_servis ← clients_servis + 1\nFIN TANT QUE\nAFFICHER "Tous les clients ont été servis"' },
            { t: 'p', h: 'Trace pas à pas : au début, `clients_servis = 0`. Condition `0 < 10` → VRAIE, on entre. On incrémente → `clients_servis = 1`. Condition `1 < 10` → VRAIE. … Au 10e tour, `clients_servis = 10`. Condition `10 < 10` → FAUSSE, on sort.' },
            { t: 'h3', h: 'POUR : la boucle comptée' },
            { t: 'syntax', title: 'POUR : le nombre de tours connu d\'avance', lang: 'text', code:
'POUR i DE 1 À 5 FAIRE\n  AFFICHER "7 × " + i + " = " + (7 * i)\nFIN POUR', legend: [
              ['POUR i DE 1 À 5 FAIRE', 'la boucle COMPTÉE : i prend 1, puis 2, 3, 4, 5 — tu SAIS d\'avance qu\'il y aura 5 tours, ni plus ni moins'],
              ['i', 'le compteur : une variable offerte par la boucle, relisible à chaque tour — parfaite pour numéroter, indexer, calculer'],
              ['FIN POUR', 'fermeture du bloc ; le compteur avance TOUT SEUL à chaque retour — pas de ligne i ← i + 1 à écrire, pas de boucle infinie possible'],
              ['POUR ou TANT QUE ?', 'nombre de tours connu → POUR ; répéter jusqu\'à un événement imprévisible (saisie correcte, stock épuisé) → TANT QUE']
            ]},
            { t: 'p', h: '`POUR` répète un nombre CONNU de fois. Tu sais exactement combien de tours la boucle va faire AVANT de commencer. C\'est la boucle la plus utilisée — et la plus sûre, car le nombre d\'itérations est borné.' },
            { t: 'code', lang: 'text', label: 'Calculer le total des ventes du jour', code:
'total ← 0\nAFFICHER "Nombre de ventes à saisir ?"\nLIRE nb_ventes\nPOUR i DE 1 À nb_ventes FAIRE\n  AFFICHER "Montant de la vente " + i + " ?"\n  LIRE montant_texte\n  montant ← CONVERTIR_EN_NOMBRE(montant_texte)\n  total ← total + montant\nFIN POUR\nAFFICHER "Total des ventes : " + total + " FCFA"' },
            { t: 'p', h: 'La variable `i` est le « compteur de boucle » : elle prend les valeurs 1, 2, 3… jusqu\'à `nb_ventes`. Tu peux l\'utiliser dans le corps de la boucle (par exemple pour afficher « Vente n°3 »). Elle est automatiquement incrémentée à chaque tour.' },
            { t: 'h3', h: 'RÉPÉTER JUSQU\'À : la boucle qui s\'exécute au moins une fois' },
            { t: 'syntax', title: 'RÉPÉTER JUSQU\'À : au moins un tour, garanti', lang: 'text', code:
'RÉPÉTER\n  AFFICHER "Mot de passe ?"\n  LIRE saisie\nJUSQU\'À saisie = "zemi2024"', legend: [
              ['RÉPÉTER', 'le corps s\'exécute D\'ABORD, sans poser de question : ici on demande le mot de passe une première fois, quoi qu\'il arrive'],
              ['JUSQU\'À condition', 'le test se fait APRÈS le corps — et attention au sens : on SORT quand la condition devient VRAIE. C\'est l\'inverse du TANT QUE'],
              ['au moins 1 tour', 'c\'est la seule boucle qui garantit une exécution : parfaite pour les saisies obligatoires (mot de passe, choix de menu)'],
              ['le piège symétrique', 'comme TANT QUE, elle exige que le corps fasse évoluer la condition — ici le LIRE saisie — sinon : boucle infinie']
            ]},
            { t: 'p', h: '`RÉPÉTER … JUSQU\'À` vérifie la condition APRÈS avoir exécuté le corps. Conséquence : le bloc est exécuté AU MOINS UNE FOIS, même si la condition est fausse au départ. C\'est la boucle des validations (« demande le mot de passe, répète jusqu\'à ce qu\'il soit correct ») et des menus interactifs.' },
            { t: 'code', lang: 'text', label: 'Validation de mot de passe', code:
'RÉPÉTER\n  AFFICHER "Mot de passe :"\n  LIRE saisie\n  SI saisie ≠ mot_de_passe_secret ALORS\n    AFFICHER "Mot de passe incorrect. Réessaie."\n  FIN SI\nJUSQU\'À saisie = mot_de_passe_secret\nAFFICHER "Accès autorisé."' },
            { t: 'h3', h: 'Quelle boucle choisir ?' },
            { t: 'table', head: ['Boucle', 'Quand l\'utiliser', 'Nombre de tours', 'Risque'], rows: [
              ['`POUR`', 'Nombre d\'itérations CONNU à l\'avance', 'Borné (n tours)', 'Faible'],
              ['`TANT QUE`', 'La condition de sortie dépend d\'un calcul', 'Inconnu (0 à ∞)', 'Élevé (boucle infinie)'],
              ['`RÉPÉTER`', 'Le corps doit s\'exécuter AU MOINS UNE FOIS', 'Inconnu (1 à ∞)', 'Élevé'],
            ] },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Une boucle infinie, c\'est un bug théorique, ça n\'arrive jamais. »** Si, et plus souvent qu\'on ne croit. Cause n°1 : oublier d\'incrémenter le compteur. Cause n°2 : condition qui n\'évolue pas vers FAUX. Dans un `TANT QUE`, la condition DOIT finir par devenir fausse. Vérifie TOUJOURS ce qui fait progresser la boucle.',
              '**« POUR et TANT QUE sont interchangeables. »** En théorie, tout `POUR` peut s\'écrire en `TANT QUE` (et vice versa). En pratique, ils expriment des INTENTIONS différentes. `POUR` dit « je sais combien de tours ». `TANT QUE` dit « j\'attends que quelque chose se produise ». Choisir le bon rend le code plus lisible.',
              '**« Le compteur du POUR doit s\'appeler i. »** C\'est une convention pour les exemples courts, mais dans du vrai code, donne-lui un nom qui a du sens : `num_client`, `jour`, `ligne`. `i` est acceptable pour un index temporaire dans une boucle de moins de 5 lignes.',
              '**« Je peux modifier le compteur à l\'intérieur d\'un POUR. »** Techniquement oui dans certains langages, mais c\'est une TRÈS MAUVAISE IDÉE. Le compteur appartient à la boucle — n\'y touche pas. Si tu as besoin de sauter des itérations, utilise `CONTINUER` (passe au tour suivant) ou `SORTIR` (quitte la boucle).'
            ] },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les boucles utilisent massivement les opérateurs (`algo-operateurs`) — `i ← i + 1` est un classique — et les conditions (`algo-conditions`) pour décider de continuer. Les tableaux (`algo-tableaux`) sont la raison d\'être des boucles `POUR` : parcourir chaque élément un par un. Et dans tout vrai langage, tu retrouveras ces trois boucles : `while`, `for`, `do…while` (JavaScript/C/PHP) ou `while`/`for` (Python, qui n\'a pas de `do…while` natif).' }
          ],
          errors: [
            {
              title: 'Boucle infinie : la condition ne devient jamais fausse',
              bad: 'stock ← 10\nTANT QUE stock > 0 FAIRE\n  AFFICHER "Stock : " + stock\n  // OUBLI : stock ← stock - 1\nFIN TANT QUE\n// La condition stock > 0 est TOUJOURS vraie\n// → le programme tourne indéfiniment',
              good: 'stock ← 10\nTANT QUE stock > 0 FAIRE\n  AFFICHER "Stock : " + stock\n  stock ← stock - 1\nFIN TANT QUE\n// À chaque tour, stock diminue → finira par 0',
              why: 'Un `TANT QUE` exige que le corps de la boucle MODIFIE quelque chose qui rapproche la condition de FAUX. Sans cette modification, la condition reste éternellement VRAIE. C\'est le bug le plus classique — et sur un serveur, une boucle infinie peut bloquer tout le site.'
            },
            {
              title: 'Confondre POUR et TANT QUE pour un parcours de tableau',
              bad: 'i ← 1\nTANT QUE i ≤ taille(tableau) FAIRE\n  AFFICHER tableau[i]\n  i ← i + 1\nFIN TANT QUE\n// Fonctionne, mais pourquoi écrire 3 lignes\n// quand POUR le fait en 1 ?',
              good: 'POUR i DE 1 À taille(tableau) FAIRE\n  AFFICHER tableau[i]\nFIN POUR\n// POUR est fait EXACTEMENT pour ça :\n// parcourir un tableau de taille connue.',
              why: 'Quand le nombre de tours est connu à l\'avance, `POUR` est plus lisible, plus court, et plus sûr (pas de risque d\'oublier l\'incrémentation). Réserve `TANT QUE` aux situations où tu ne sais pas combien de tours il y aura (ex. « chercher jusqu\'à trouver »).'
            }
          ],
          related: ['algo-conditions', 'algo-operateurs', 'algo-tableaux', 'algo-variables']
        }
      ]
    }
  ]
};

/* ======================================================
   5 à 8 — Suite : Tableaux, Fonctions, Organigrammes, Passage au code
   ====================================================== */
DEVDOCS.algo.categories.push(
  /* ======================================================
     5. TABLEAUX
     ====================================================== */
  {
    id: 'tableaux',
    name: 'Tableaux',
    icon: 'list_alt',
    fiches: [
      {
        id: 'algo-tableaux',
        title: 'Les tableaux : des rangées de boîtes numérotées',
        icon: 'list_alt',
        level: 'Intermédiaire',
        tagline: 'Quand une variable ne suffit plus : stocker des listes entières, du carnet de tontine au catalogue du marché.',
        intro: 'Imagine que tu dois gérer les cotisations de 50 membres d\'une tontine. Tu pourrais créer 50 variables : `cotisation_1`, `cotisation_2`, `cotisation_3`… C\'est exactement ce que les débutants font — et c\'est intenable. Imagine maintenant devoir AFFICHER les 50 noms : 50 lignes de `AFFICHER`. Imagine devoir chercher le plus gros cotisant : 50 comparaisons écrites à la main. Les **tableaux** sont la solution : une seule variable contient une COLLECTION de valeurs, rangées dans des cases numérotées. Au lieu de 50 variables, tu en as une — et une boucle de 3 lignes fait tout le travail.',
        blocks: [
          { t: 'h3', h: 'L\'analogie du casier de marché' },
          { t: 'p', h: 'Imagine un casier avec 50 compartiments numérotés de 1 à 50. Chaque compartiment peut contenir UNE valeur. Le casier entier s\'appelle `cotisations`. Pour accéder au compartiment n°12, tu écris `cotisations[12]`. Pour connaître le nombre total de compartiments : `TAILLE(cotisations)`. Un tableau, c\'est exactement ça : une variable qui contient PLUSIEURS valeurs, accessibles par leur NUMÉRO (l\'index).' },
          { t: 'h3', h: 'Déclaration, lecture, écriture, parcours' },
          { t: 'syntax', title: 'Le tableau : quatre gestes, décortiqués', lang: 'text', code:
'notes ← [12, 15, 9, 18]\nAFFICHER notes[1]        // → 12 : le premier casier\nnotes[3] ← 17            // écrase le 9\nPOUR i DE 1 À 4 FAIRE\n  AFFICHER notes[i]\nFIN POUR', legend: [
              ['notes ← [12, 15, 9, 18]', 'UN seul nom pour une COLLECTION ordonnée — adieu note1, note2, note3 qui interdisaient toute boucle'],
              ['notes[1]', 'l\'INDICE entre crochets vise UN casier. Convention du module : on compte à partir de 1 — (la plupart des vrais langages commencent à 0, piège nº 1 !)'],
              ['notes[3] ← 17', 'même mécanique en ÉCRITURE : on vise le casier, on écrase son contenu — les autres casiers ne bougent pas'],
              ['notes[i] dans un POUR', 'le PARCOURS : la boucle + l\'indice variable = visiter chaque casier sans copier-coller. C\'est là que le tableau décolle']
            ]},
          { t: 'code', lang: 'text', label: 'Pseudo-code — manipulations de base', code:
'// Déclarer un tableau de 5 éléments\nventes ← [12000, 8500, 15000, 9200, 11000]\n\n// Lire un élément (index 1 = premier !)\nAFFICHER ventes[1]        // 12000\nAFFICHER ventes[3]        // 15000\n\n// Modifier un élément\nventes[2] ← 9000         // remplace 8500 par 9000\n\n// Ajouter un élément à la fin\nAJOUTER(ventes, 13000)    // le tableau a maintenant 6 éléments\n\n// Parcourir tout le tableau\nPOUR i DE 1 À TAILLE(ventes) FAIRE\n  AFFICHER "Vente " + i + " : " + ventes[i] + " FCFA"\nFIN POUR' },
          { t: 'callout', kind: 'warn', h: 'Dans la plupart des langages (C, Java, JavaScript, Python…), les indices de tableau commencent à **0**, pas à 1. Le premier élément est `tableau[0]`, le dernier est `tableau[n-1]`. En pseudo-code, on commence à 1 pour la lisibilité — mais garde ça en tête pour le passage au vrai code !' },
          { t: 'h3', h: 'Exemple complet : totaux et recherche' },
          { t: 'code', lang: 'text', label: 'Tontine — calculs sur un tableau de cotisations', code:
'cotisations ← [5000, 5000, 5000, 3000, 5000, 5000]\n\n// 1. SOMME : total des cotisations\ntotal ← 0\nPOUR i DE 1 À TAILLE(cotisations) FAIRE\n  total ← total + cotisations[i]\nFIN POUR\nAFFICHER "Total cotisé : " + total + " FCFA"\n\n// 2. RECHERCHE : trouver la première cotisation < 5000\ni ← 1\ntrouve ← FAUX\ntant_que i ≤ TAILLE(cotisations) ET NON trouve FAIRE\n  SI cotisations[i] < 5000 ALORS\n    AFFICHER "Cotisation incomplète au membre " + i\n    trouve ← VRAI\n  FIN SI\n  i ← i + 1\nFIN TANT QUE\nSI NON trouve ALORS\n  AFFICHER "Toutes les cotisations sont complètes"\nFIN SI\n\n// 3. MAXIMUM : qui a le plus cotisé ?\nmax ← cotisations[1]\nAFFICHER "Recherche du maximum…"\nPOUR i DE 2 À TAILLE(cotisations) FAIRE\n  SI cotisations[i] > max ALORS\n    max ← cotisations[i]\n  FIN SI\nFIN POUR\nAFFICHER "Cotisation maximale : " + max + " FCFA"' },
          { t: 'h3', h: 'Le tri à bulles : ton premier algorithme de tri' },
          { t: 'syntax', title: 'L\'échange en trois temps : le cœur du tri', lang: 'text', code:
'SI notes[j] > notes[j+1] ALORS\n  temp ← notes[j]\n  notes[j] ← notes[j+1]\n  notes[j+1] ← temp\nFIN SI', legend: [
              ['notes[j] > notes[j+1]', 'la question posée des MILLIERS de fois : deux VOISINS sont-ils dans le bon ordre ?'],
              ['temp ← notes[j]', 'la variable TAMPON : elle garde la valeur à l\'abri pendant le va-et-vient. Sans elle, notes[j] ← notes[j+1] détruit une des deux valeurs à jamais'],
              ['les trois lignes', 'sauvegarder → écraser → reposer : cet échange en 3 temps est un motif universel, à connaître par cœur'],
              ['pourquoi « à bulles »', 'à force d\'échanges voisins, les grandes valeurs MONTENT vers la fin du tableau… comme des bulles vers la surface']
            ]},
          { t: 'p', h: 'Trier, c\'est ranger dans l\'ordre. Le **tri à bulles** est le plus simple à comprendre — on compare chaque paire d\'éléments voisins et on les échange s\'ils sont dans le mauvais ordre. Comme des bulles qui remontent à la surface, les plus grandes valeurs « flottent » vers la fin.' },
          { t: 'code', lang: 'text', label: 'Tri à bulles — pseudo-code complet', code:
'// Trier le tableau "notes" par ordre croissant\nnotes ← [12, 8, 15, 10, 7]\nn ← TAILLE(notes)\n\nPOUR i DE 1 À n-1 FAIRE\n  POUR j DE 1 À n-i FAIRE\n    SI notes[j] > notes[j+1] ALORS\n      // Échanger les deux éléments\n      temp ← notes[j]\n      notes[j] ← notes[j+1]\n      notes[j+1] ← temp\n    FIN SI\n  FIN POUR\nFIN POUR\n\n// Après tri : [7, 8, 10, 12, 15]\nAFFICHER "Notes triées :"\nPOUR i DE 1 À n FAIRE\n  AFFICHER notes[i]\nFIN POUR' },
          { t: 'p', h: 'Trace sur [12, 8, 15, 10, 7]. Premier passage (i=1) : on compare 12 et 8 → échange → [8,12,15,10,7]. 12 et 15 → OK. 15 et 10 → échange → [8,12,10,15,7]. 15 et 7 → échange → [8,12,10,7,15]. Le 15 est « remonté » à la fin. Deuxième passage : [8,10,7,12,15]. Troisième : [8,7,10,12,15]. Quatrième : [7,8,10,12,15]. Cinq comparaisons par passage, quatre passages = 20 comparaisons au total.' },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Le premier élément est à l\'index 1. »** En pseudo-code oui, par convention. Mais en Python, C, Java, JavaScript, le premier est à l\'index 0. Ne sois pas surpris quand tu verras `tableau[0]` dans les autres modules.',
            '**« Un tableau peut contenir des types mélangés. »** En pseudo-code oui, mais dans les vrais langages, c\'est parfois interdit (Java, C) ou déconseillé. Un tableau de prix devrait contenir UNIQUEMENT des prix.',
            '**« TAILLE(tableau) donne le dernier index. »** Non — `TAILLE` donne le NOMBRE d\'éléments. Si le tableau a 5 éléments (indices 1 à 5), `TAILLE` vaut 5, pas 5. Le dernier index est `TAILLE(tableau)`.',
            '**« Le tri à bulles, c\'est juste pour apprendre, personne ne l\'utilise. »** Vrai — pour trier de grandes quantités, des algorithmes bien plus rapides existent (tri rapide, tri fusion). Mais le comprendre, c\'est comprendre le principe de TOUS les tris : comparer et échanger.'
          ] },
          { t: 'h3', h: 'Lien avec les notions déjà vues' },
          { t: 'p', h: 'Les tableaux sont la raison d\'être des boucles `POUR` (`algo-boucles`) : parcourir un tableau élément par élément. La recherche dans un tableau combine boucle ET condition (`algo-conditions`). Le tri combine boucles imbriquées et conditions. Les fonctions (`algo-fonctions`) permettent d\'encapsuler les opérations sur les tableaux (une fonction `SOMME`, une fonction `RECHERCHER`, une fonction `TRIER`).' }
        ],
        errors: [
          {
            title: 'Dépasser les bornes du tableau (accéder à l\'index 6 dans un tableau de 5 éléments)',
            bad: 'notes ← [12, 8, 15, 10, 7]\nAFFICHER notes[6]\n// ERREUR : le tableau a 5 éléments (indices 1 à 5)\n// L\'index 6 n\'existe pas !',
            good: 'notes ← [12, 8, 15, 10, 7]\nSI 6 ≤ TAILLE(notes) ALORS\n  AFFICHER notes[6]\nSINON\n  AFFICHER "Index invalide : le tableau a " + TAILLE(notes) + " éléments"\nFIN SI',
            why: 'Accéder à un index qui dépasse la taille du tableau, c\'est comme chercher le compartiment n°6 dans un casier qui n\'en a que 5. Selon le langage : erreur immédiate (Python), arrêt du programme (Java), valeur `undefined` (JavaScript), ou — le pire — lecture d\'une case mémoire aléatoire (C). Toujours vérifier que l\'index est ≤ la taille.'
          },
          {
            title: 'Modifier le tableau pendant qu\'on le parcourt',
            bad: 'POUR i DE 1 À TAILLE(tableau) FAIRE\n  SI tableau[i] < 0 ALORS\n    SUPPRIMER(tableau, i)\n  FIN SI\nFIN POUR\n// Supprimer un élément DÉCALE les indices !\n// Après suppression de l\'élément 3,\n// l\'ancien élément 4 devient l\'élément 3\n// → on saute des éléments sans le savoir',
            good: '// Solution 1 : parcourir à l\'envers\nPOUR i DE TAILLE(tableau) À 1 (pas de -1) FAIRE\n  SI tableau[i] < 0 ALORS\n    SUPPRIMER(tableau, i)\n  FIN SI\nFIN POUR\n// Solution 2 : créer un nouveau tableau filtré',
            why: 'Supprimer ou insérer pendant un parcours change la numérotation. L\'élément suivant « glisse » à l\'index qu\'on vient de traiter, et la boucle passe au suivant sans le voir. C\'est un bug vicieux car il ne se produit que si DEUX éléments consécutifs remplissent la condition.'
          }
        ],
        related: ['algo-boucles', 'algo-conditions', 'algo-fonctions', 'algo-variables']
      }
    ]
  },

  /* ======================================================
     6. FONCTIONS
     ====================================================== */
  {
    id: 'fonctions',
    name: 'Fonctions',
    icon: 'functions',
    fiches: [
      {
        id: 'algo-fonctions',
        title: 'Fonctions & procédures : découper pour régner',
        icon: 'functions',
        level: 'Intermédiaire',
        tagline: 'Ne réécris jamais deux fois la même logique : mets-la dans une boîte nommée, et appelle-la.',
        intro: 'Tu as écrit un super algorithme qui calcule le total d\'une commande. La semaine suivante, tu en as besoin pour une autre page. Tu copies-colles les 15 lignes. Puis tu découvres un bug dans le calcul — et tu dois le corriger à TROIS endroits différents. Les **fonctions** (aussi appelées procédures ou sous-programmes) résolvent ce problème : tu écris la logique UNE FOIS, tu lui donnes un NOM, et tu l\'appelles partout où tu en as besoin. Une fonction, c\'est un mini-programme dans ton programme — avec ses propres entrées (paramètres) et sa propre sortie (valeur de retour).',
        blocks: [
          { t: 'h3', h: 'L\'analogie du cuisinier spécialisé' },
          { t: 'p', h: 'Dans un restaurant, le chef ne fait pas tout lui-même. Il a un cuisinier spécialisé dans les sauces, un autre dans les desserts. Quand le chef a besoin d\'une sauce, il ne réexplique pas la recette — il appelle le cuisinier sauces : « Prépare-moi une sauce tomate pour 4 personnes ». Le cuisinier travaille, puis rend le résultat. Une fonction, c\'est ce cuisinier : un bloc de code spécialisé, qu\'on appelle avec des paramètres (la commande) et qui retourne un résultat (le plat).' },
          { t: 'h3', h: 'Définir et appeler une fonction' },
          { t: 'syntax', title: 'FONCTION … RETOURNER : le sous-programme, décortiqué', lang: 'text', code:
'FONCTION tva(montant)\n  RETOURNER montant * 0.18\nFIN FONCTION\n\ntotal ← 10000 + tva(10000)', legend: [
              ['FONCTION tva(montant)', 'la DÉFINITION : on emballe un calcul réutilisable. montant est le PARAMÈTRE — l\'ingrédient attendu, pas encore une vraie valeur'],
              ['RETOURNER …', 'le RÉSULTAT renvoyé à l\'appelant : c\'est lui qui distingue la FONCTION (rend une valeur) de la procédure (agit sans rien rendre)'],
              ['FIN FONCTION', 'fermeture de la définition. À ce stade, RIEN n\'a encore été calculé — on a écrit la recette, pas cuisiné'],
              ['tva(10000)', 'L\'APPEL : on fournit une valeur concrète, la fonction calcule, et son résultat (1800) prend la place de l\'appel dans l\'expression → total = 11800']
            ]},
          { t: 'code', lang: 'text', label: 'Pseudo-code — fonction de calcul du total', code:
'// DÉFINITION de la fonction (écrite une seule fois)\nFONCTION calculer_total(prix, quantite)\n  resultat ← prix * quantite\n  RETOURNER resultat\nFIN FONCTION\n\n// APPELS de la fonction (autant de fois qu\'on veut)\ntotal1 ← calculer_total(500, 3)    // 1500\ntotal2 ← calculer_total(1200, 5)   // 6000\ntotal3 ← calculer_total(350, 10)   // 3500\n\nAFFICHER total1\nAFFICHER total2\nAFFICHER total3' },
          { t: 'p', h: '`prix` et `quantite` sont les **paramètres** — les entrées de la fonction. `resultat` est la **valeur de retour** — ce que la fonction renvoie à l\'appelant. À l\'intérieur de la fonction, les paramètres se comportent comme des variables locales : elles n\'existent QUE pendant l\'exécution de la fonction.' },
          { t: 'h3', h: 'Procédure vs Fonction' },
          { t: 'p', h: 'Une **procédure** est une fonction qui ne retourne RIEN — elle fait quelque chose (afficher, sauvegarder, modifier) mais ne renvoie pas de valeur. Une **fonction** retourne TOUJOURS une valeur. En pratique, on dit souvent « fonction » pour les deux. Dans ce module : `RETOURNER` signale une fonction qui renvoie une valeur ; l\'absence de `RETOURNER` signale une procédure.' },
          { t: 'h3', h: 'Exemple complet : du code dupliqué au code factorisé' },
          { t: 'code', lang: 'text', label: 'AVANT : code dupliqué (3 fois la même logique)', code:
'// Calcul pour le gari\ntotal_gari ← 500 * 3\nAFFICHER "Total gari : " + total_gari\n\n// Calcul pour l\'huile\ntotal_huile ← 1200 * 5\nAFFICHER "Total huile : " + total_huile\n\n// Calcul pour le piment\ntotal_piment ← 350 * 10\nAFFICHER "Total piment : " + total_piment' },
          { t: 'code', lang: 'text', label: 'APRÈS : logique factorisée en une fonction', code:
'FONCTION afficher_total(produit, prix, quantite)\n  total ← prix * quantite\n  AFFICHER "Total " + produit + " : " + total + " FCFA"\nFIN FONCTION\n\nafficher_total("gari", 500, 3)\nafficher_total("huile", 1200, 5)\nafficher_total("piment", 350, 10)' },
          { t: 'p', h: '15 lignes → 7 lignes. Et si le calcul de total doit inclure la TVA demain, tu modifies UNE SEULE ligne dans la fonction, pas trois endroits différents. C\'est le principe DRY : Don\'t Repeat Yourself.' },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Les paramètres sont les mêmes variables que dans le programme principal. »** Non — un paramètre est une variable LOCALE à la fonction. `prix` dans `calculer_total(prix, quantite)` n\'a aucun lien avec une éventuelle variable `prix` du programme principal. Même nom = variables différentes dans deux mondes différents.',
            '**« Une fonction DOIT avoir des paramètres. »** Non — une fonction peut n\'avoir AUCUN paramètre. Par exemple, une fonction `afficher_menu()` qui montre toujours le même menu n\'a besoin d\'aucune entrée.',
            '**« Si je modifie un paramètre dans la fonction, ça modifie la variable d\'origine. »** Non — les paramètres sont des COPIES (passage par valeur). Modifier `prix` dans la fonction ne change pas la variable `prix` du programme appelant.',
            '**« Plus une fonction est longue, plus elle est utile. »** C\'est le contraire : une bonne fonction fait UNE SEULE chose, bien. Si ta fonction fait plus de 15-20 lignes, elle fait probablement trop de choses — découpe-la.'
          ] },
          { t: 'h3', h: 'Lien avec les notions déjà vues' },
          { t: 'p', h: 'Les fonctions sont l\'aboutissement de tout ce qui précède : elles utilisent des variables (`algo-variables`), des conditions (`algo-conditions`), des boucles (`algo-boucles`), et manipulent des tableaux (`algo-tableaux`). Une fonction peut en APPELER une autre — c\'est le principe de décomposition. Dans tous les vrais langages, les fonctions existent sous une forme ou une autre : `def` en Python, `function` en JavaScript, `function` en PHP, `void` en C/Java. La syntaxe change, le concept est universel.' }
        ],
        errors: [
          {
            title: 'Oublier le RETOURNER — la fonction ne renvoie rien',
            bad: 'FONCTION calculer_total(prix, qte)\n  resultat ← prix * qte\n  // OUBLI du RETOURNER !\nFIN FONCTION\nt ← calculer_total(500, 3)\n// t est vide — la fonction n\'a rien retourné',
            good: 'FONCTION calculer_total(prix, qte)\n  resultat ← prix * qte\n  RETOURNER resultat\nFIN FONCTION\nt ← calculer_total(500, 3)\n// t = 1500',
            why: 'Sans `RETOURNER`, la fonction fait le calcul… et jette le résultat. La variable `resultat` est LOCALE à la fonction ; elle meurt quand la fonction se termine. Le `RETOURNER` est le seul moyen de faire sortir une valeur de la fonction vers l\'extérieur.'
          },
          {
            title: 'Appeler la fonction avec les arguments dans le mauvais ordre',
            bad: 'FONCTION afficher_total(produit, prix, qte)\n  AFFICHER produit + " : " + (prix * qte) + " FCFA"\nFIN FONCTION\n// Appel :\nafficher_total(500, 3, "gari")\n// produit = 500, prix = 3, qte = "gari"\n// → "500 : gari FCFA" ?!',
            good: 'afficher_total("gari", 500, 3)\n// produit = "gari", prix = 500, qte = 3\n// → "gari : 1500 FCFA" ✓',
            why: 'Les arguments sont associés aux paramètres dans l\'ORDRE : le premier argument va dans le premier paramètre, le deuxième dans le deuxième, etc. Si tu inverses, tu obtiens des résultats absurdes — et aucune erreur ne te préviendra, car les types sont les mêmes (texte, nombre, nombre).'
          }
        ],
        related: ['algo-variables', 'algo-conditions', 'algo-boucles', 'algo-tableaux']
      }
    ]
  },

  /* ======================================================
     7. ORGANIGRAMMES
     ====================================================== */
  {
    id: 'organigrammes',
    name: 'Organigrammes',
    icon: 'account_tree',
    fiches: [
      {
        id: 'algo-organigrammes',
        title: 'Les organigrammes : voir la logique',
        icon: 'account_tree',
        level: 'Débutant',
        tagline: 'Représenter visuellement un algorithme avec des formes standard — le plan d\'architecte avant de construire.',
        intro: 'Certaines personnes pensent mieux en images qu\'en texte. Pour elles, un bloc de pseudo-code de 20 lignes est intimidant, mais un dessin avec des flèches et des losanges devient immédiatement clair. Les **organigrammes** (ou algorigrammes) sont la traduction VISUELLE d\'un algorithme : chaque forme a une signification précise, et les flèches montrent le chemin suivi. Cette fiche te donne les symboles standard et t\'apprend à passer du texte au dessin — et inversement.',
        blocks: [
          { t: 'h3', h: 'Les symboles standard (norme ISO)' },
          { t: 'syntax', title: 'Lire un organigramme : les cinq symboles vitaux', lang: 'text', code:
'[ovale]            → DÉBUT / FIN\n[parallélogramme]  → ENTRÉE / SORTIE\n[rectangle]        → TRAITEMENT\n[losange]          → DÉCISION\n[flèche]           → fil d\'exécution', legend: [
              ['[ovale]', 'les BORNES : un seul DÉBUT en haut, une ou plusieurs FIN. Tout organigramme commence et finit dans des ovales'],
              ['[parallélogramme]', 'les ÉCHANGES avec l\'extérieur : LIRE (entrée) et AFFICHER (sortie)'],
              ['[rectangle]', 'le TRAITEMENT : calculs et affectations — total ← 0, prix ← prix × 1.18'],
              ['[losange]', 'la DÉCISION : une question à réponse OUI/NON, dont partent DEUX flèches étiquetées — le seul symbole à deux sorties'],
              ['[flèche]', 'le FIL de l\'exécution : elle dit où l\'on va ensuite ; remonter vers le haut = une boucle']
            ]},
          { t: 'table', head: ['Forme', 'Signification', 'Exemple'], rows: [
            ['Ovale', 'DÉBUT ou FIN', '« Début » / « Fin du programme »'],
            ['Rectangle', 'TRAITEMENT (action)', '« total ← prix * qte »'],
            ['Losange', 'DÉCISION (condition)', '« stock > 0 ? »'],
            ['Parallélogramme', 'ENTRÉE / SORTIE', '« LIRE prix », « AFFICHER total »'],
            ['Flèche', 'SENS de parcours', 'Relie les étapes entre elles'],
            ['Cercle', 'CONNECTEUR (suite ailleurs)', '« A » (reprendre au connecteur « A »)']
          ] },
          { t: 'h3', h: 'Exemple : la vérification de stock en organigramme' },
          { t: 'p', h: 'Voici l\'organigramme correspondant à l\'algorithme « vendre si le stock est suffisant » :' },
          { t: 'code', lang: 'text', label: 'Organigramme textuel (ASCII)', code:
'    ┌─────────┐\n    │  DÉBUT  │\n    └────+────┘\n         │\n    ┌────v────┐\n    │LIRE qte │\n    └────+────┘\n         │\n    ┌────v────────┐\n    │ qte ≤ stock │  ← losange = condition\n    └────+────────┘\n     OUI │     NON\n    ┌────v────┐  ┌────v────────┐\n    │ stock ← │  │AFFICHER     │\n    │stock-qte│  │\"Insuffisant\"│\n    └────+────┘  └────+────────┘\n         │            │\n    ┌────v────┐       │\n    │AFFICHER │       │\n    │\"Vendu\"  │       │\n    └────+────┘       │\n         └──────+─────┘\n              ┌─v──┐\n              │FIN │\n              └────┘' },
          { t: 'h3', h: 'Quand utiliser un organigramme plutôt que du pseudo-code ?' },
          { t: 'ul', items: [
            '**Algorithme avec beaucoup de décisions** (SI / SINON SI imbriqués) : le dessin montre tous les chemins possibles d\'un coup d\'œil, là où le texte demande de suivre les indentations.',
            '**Communication avec des non-programmeurs** : un client ou un chef de projet peut valider un organigramme sans savoir lire du code.',
            '**Débogage** : suivre le chemin avec son doigt permet de repérer les branches mortes (conditions jamais atteintes) ou les boucles infinies.',
            '**Pour le reste** : le pseudo-code est plus compact, plus facile à modifier, et se traduit directement en code. Les deux sont complémentaires.'
          ] },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Un organigramme, c\'est juste pour les présentations. »** Non — c\'est un outil de conception, surtout pour les algorithmes complexes. Beaucoup de développeurs expérimentés griffonnent un organigramme au tableau avant de coder un module compliqué.',
            '**« Il faut dessiner un organigramme pour chaque programme. »** Non — pour un algorithme linéaire simple (lire → calculer → afficher), l\'organigramme n\'apporte rien. Réserve-le aux algorithmes avec au moins 2-3 bifurcations.',
            '**« Les formes sont optionnelles, l\'important c\'est le texte dedans. »** Les formes sont une CONVENTION internationale. Un losange = une décision, PARTOUT dans le monde. Si tu utilises un rectangle pour une décision, tu perds le bénéfice de la lecture immédiate.'
          ] },
          { t: 'h3', h: 'Lien avec les notions déjà vues' },
          { t: 'p', h: 'Un organigramme n\'est qu\'une représentation VISUELLE des structures déjà apprises : les rectangles sont des variables et affectations (`algo-variables`), les losanges sont des conditions (`algo-conditions`), les flèches qui rebouclent sont des boucles (`algo-boucles`). Savoir passer de l\'un à l\'autre — texte → dessin → texte — est une compétence qui te servira dans tous les langages.' }
        ],
        errors: [
          {
            title: 'Oublier de faire converger les branches d\'un SI / SINON',
            bad: 'Après un losange (condition), les deux branches\n(OUI et NON) partent dans des directions différentes…\net ne se rejoignent JAMAIS. Le programme\nse termine sur DEUX chemins séparés.',
            good: 'Après le traitement des deux branches,\nles flèches doivent CONVERGER vers un point commun\n(le reste du programme). Un SI / SINON fermé\nrevient toujours au flux principal après le bloc.',
            why: 'Un organigramme qui ne fait pas converger ses branches après une décision suggère que le programme se divise en deux mondes parallèles qui ne se rejoignent jamais — ce qui n\'arrive quasiment jamais. Les branches d\'une décision se REFERMENT toujours (sauf fin de programme).'
          },
          {
            title: 'Dessiner une boucle sans condition de sortie visible',
            bad: 'Une flèche qui part d\'un traitement, remonte,\net pointe sur… rien de précis. On ne sait pas\nQUAND la boucle s\'arrête ni POURQUOI.',
            good: 'Toute boucle a un LOSANGE (condition) qui\ncontrôle la sortie. La flèche de retour arrive\nSUR ce losange, et une flèche de sortie\n(NON) continue vers la suite du programme.',
            why: 'Une boucle sans condition de sortie explicite dans l\'organigramme, c\'est une boucle infinie visuelle. Le losange de condition est LE symbole qui dit « on continue ou on sort ? » — sans lui, le lecteur ne peut pas comprendre la logique de la boucle.'
          }
        ],
        related: ['algo-conditions', 'algo-boucles', 'algo-definition', 'algo-pseudo-code']
      }
    ]
  },

  /* ======================================================
     8. BONNES PRATIQUES & PASSAGE AU CODE
     ====================================================== */
  {
    id: 'bonnes-pratiques',
    name: 'Bonnes pratiques & au-delà',
    icon: 'verified',
    fiches: [
      {
        id: 'algo-lisibilite',
        title: 'Nommage, indentation, commentaires',
        icon: 'format_paragraph',
        level: 'Débutant',
        tagline: 'Écrire du code que tu peux relire dans six mois — et que les autres comprennent en cinq minutes.',
        intro: 'Un programme n\'est pas écrit pour l\'ordinateur — l\'ordinateur exécute n\'importe quoi, même le code le plus sale. Un programme est écrit pour les HUMAINS : toi dans six mois, ton collègue qui reprend ton code, l\'étudiant qui apprend en te lisant. Les bonnes pratiques de lisibilité ne sont pas optionnelles — elles font la différence entre un programme maintenable et un programme jetable. Et la bonne nouvelle : ce sont des habitudes simples, gratuites, qui deviennent des réflexes en une semaine.',
        blocks: [
          { t: 'h3', h: 'Nommage : la règle d\'or' },
          { t: 'p', h: 'Un nom de variable doit répondre à UNE question : « qu\'est-ce que cette boîte contient ? » Pas « à quoi elle sert », pas « quel type elle a », pas « dans quelle fonction elle vit ». Juste : quel est SON CONTENU. `nombre_clients` plutôt que `n`. `prix_unitaire_ht` plutôt que `p`. `est_valide` plutôt que `flag`. Le test ultime : montre ton code à quelqu\'un qui ne l\'a jamais vu. S\'il peut deviner ce que fait chaque variable sans lire les commentaires, tes noms sont bons.' },
          { t: 'table', head: ['À éviter', 'À préférer', 'Pourquoi'], rows: [
            ['`a`, `b`, `c`', '`prix`, `qte`, `total`', 'Le lecteur sait ce que contient la boîte'],
            ['`flag`, `status`', '`est_valide`, `est_termine`', '`flag` ne dit pas ce qui est vrai ou faux'],
            ['`data`, `info`, `temp`', '`catalogue_produits`, `adresse_livraison`', 'Un nom vague cache une pensée vague'],
            ['`x1`, `x2`, `x3`', '`prix_entree`, `prix_plat`, `prix_dessert`', 'Numéroter ne décrit pas le RÔLE'],
            ['`qte` (abréviation)', '`quantite`', 'Deux caractères gagnés, clarté perdue']
          ] },
          { t: 'h3', h: 'Indentation : la géographie du code' },
          { t: 'p', h: 'L\'indentation, c\'est le décalage vers la droite de tout ce qui est « à l\'intérieur » d\'un bloc (SI, TANT QUE, POUR, FONCTION). Ce n\'est pas décoratif : ça montre visuellement la STRUCTURE du programme. Un code mal indenté, c\'est une carte sans relief — on ne voit pas les vallées ni les montagnes.' },
          { t: 'code', lang: 'text', label: 'Sans indentation (illisible)', code:
'Sac ← 500\nbudget ← 1600\nTANT QUE budget ≥ prix_sac FAIRE\nbudget ← budget - prix_sac\nFIN TANT QUE\nAFFICHER "Reste : " + budget' },
          { t: 'code', lang: 'text', label: 'Avec indentation (lisible)', code:
'prix_sac ← 500\nbudget ← 1600\nTANT QUE budget ≥ prix_sac FAIRE\n  budget ← budget - prix_sac\nFIN TANT QUE\nAFFICHER "Reste : " + budget + " FCFA"' },
          { t: 'p', h: 'La convention : 2 espaces (ou 4) par niveau d\'imbrication. Sois constant — si tu changes de style au milieu du programme, tu perds le bénéfice visuel. Et surtout : l\'indentation est OBLIGATOIRE dans certains langages (Python), où elle DÉFINIT les blocs.' },
          { t: 'h3', h: 'Commentaires : expliquer POURQUOI, pas QUOI' },
          { t: 'syntax', title: 'Le bon commentaire, décortiqué', lang: 'text', code:
'// On arrondit au franc supérieur pour couvrir\n// les courses du zémidjan (livraison)\ntotalArrondi ← arrondirSup(total)', legend: [
              ['// …', 'le commentaire : ignoré par la machine, écrit pour l\'humain qui relira — toi, dans trois mois'],
              ['POURQUOI > QUOI', 'le code montre déjà CE qu\'il fait ; le commentaire précieux explique POURQUOI ce choix — la règle d\'or'],
              ['totalArrondi', 'remarque le nom : il rend déjà la moitié du commentaire inutile. Le meilleur commentaire reste un bon nom de variable'],
              ['l\'anti-exemple', '« totalArrondi ← arrondirSup(total)  // arrondit au supérieur » = bruit pur : il répète le QUOI sans ajouter de sens']
            ]},
          { t: 'p', h: 'Un commentaire explique la RAISON d\'un choix, pas ce que fait le code. « Incrémenter le compteur » comme commentaire sur `i ← i + 1` est inutile — le code le dit déjà. « On commence à 1 car le tableau de la tontine n\'a pas de mois 0 » — ÇA, c\'est utile. Le code dit COMMENT ; le commentaire dit POURQUOI.' },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Un code bien écrit n\'a pas besoin de commentaires. »** Faux — même un code parfaitement nommé ne peut pas expliquer POURQUOI tu as choisi CET algorithme plutôt qu\'un autre, POURQUOI tu traites ce cas particulier, POURQUOI cette constante vaut 0.18 (c\'est la TVA ? un taux de commission ?).',
            '**« Plus il y a de commentaires, mieux c\'est. »** Non — un commentaire sur chaque ligne NOIE l\'information utile. Commente les décisions importantes, pas la mécanique évidente. Un bon ratio : 1 commentaire pour 5-10 lignes de code.',
            '**« L\'indentation, c\'est juste pour faire joli. »** Non — en Python, c\'est la syntaxe du langage. Et dans tous les langages, c\'est la première chose que regarde un développeur pour comprendre la structure du code.',
            '**« Les noms longs ralentissent l\'écriture. »** L\'autocomplétion de tous les éditeurs modernes tape le nom pour toi. Le temps gagné à écrire `qte` au lieu de `quantite` est perdu cent fois quand tu relis ton code. Écris pour le LECTEUR, pas pour l\'écriveur.'
          ] },
          { t: 'h3', h: 'Lien avec les notions déjà vues' },
          { t: 'p', h: 'Ces bonnes pratiques s\'appliquent à TOUT ce qui précède : nomme tes variables (`algo-variables`), indente tes conditions (`algo-conditions`) et tes boucles (`algo-boucles`), commente tes fonctions (`algo-fonctions`). Et elles s\'appliquent à TOUS les langages que tu apprendras ensuite — Python, JavaScript, PHP, C, Java… Les conventions de nommage changent légèrement (`camelCase` en JS, `snake_case` en Python), mais le principe est universel.' }
        ],
        errors: [
          {
            title: 'Commenter le code en décrivant ce qu\'il fait (et non pourquoi)',
            bad: '// J\'initialise le total à 0\ntotal ← 0\n// Je boucle sur tous les éléments\nPOUR i DE 1 À n FAIRE\n  // J\'ajoute l\'élément courant au total\n  total ← total + tableau[i]\nFIN POUR\n// Ces commentaires n\'apprennent RIEN\n// que le code ne dise déjà.',
            good: '// On initialise à 0 pour le cas où le tableau est vide\ntotal ← 0\nPOUR i DE 1 À n FAIRE\n  total ← total + tableau[i]\nFIN POUR\n// Note : la somme peut dépasser 2 milliards → utiliser un type adapté',
            why: 'Des commentaires qui paraphrasent le code doublent la quantité de texte à lire sans ajouter d\'information. Pire : quand le code change mais que le commentaire reste (parce que personne n\'y pense), le commentaire devient MENSONGER — il dit le contraire de ce que fait le code.'
          },
          {
            title: 'Utiliser des noms trop génériques qui obligent à lire le contexte',
            bad: 'temp ← prix * 0.18\nfinal ← prix + temp\n// \"temp\" et \"final\" : il faut lire TOUT\n// le code pour comprendre CS QUOI.',
            good: 'tva ← prix * 0.18\nprix_ttc ← prix + tva\n// En une fraction de seconde, on sait :\n// on calcule la TVA et le prix TTC.',
            why: 'Un nom générique comme `temp` ou `data` oblige le lecteur à REMONTER dans le code pour retrouver l\'origine de la valeur. Un nom précis comme `tva` ou `prix_ttc` contient toute l\'information nécessaire — la lecture est instantanée.'
          }
        ],
        related: ['algo-variables', 'algo-conditions', 'algo-boucles', 'algo-fonctions', 'algo-passage-code']
      },
      {
        id: 'algo-passage-code',
        title: 'Du pseudo-code au vrai code : Python & JavaScript',
        icon: 'sync_alt',
        level: 'Intermédiaire',
        tagline: 'Le pont entre ce module et les suivants : traduire la logique apprise en syntaxe Python et JavaScript.',
        intro: 'Ça y est — tu sais écrire des algorithmes en français structuré. Tu maîtrises les variables, les conditions, les boucles, les tableaux, les fonctions. Maintenant, il est temps de franchir le pont : traduire cette logique dans un VRAI langage de programmation. Cette fiche prend plusieurs algorithmes déjà vus dans le module et te montre leur équivalent en **Python** et en **JavaScript** — les deux langages documentés sur Easy Learn. Le but n\'est PAS de tout mémoriser, mais de voir LE PATTERN : la logique est toujours la même, seule la « forme » change.',
        blocks: [
          { t: 'h3', h: 'Table de correspondance : pseudo-code → Python → JavaScript' },
          { t: 'syntax', title: 'La même idée, trois habillages', lang: 'text', code:
'SI age >= 18 ALORS       // pseudo-code\nif age >= 18:            # Python\nif (age >= 18) {         // JavaScript', legend: [
              ['SI … ALORS → if', 'la même NOTION dans trois langues : la logique ne change pas, seule la syntaxe — c\'est la grande leçon de cette fiche'],
              [': et le retrait (Python)', 'Python délimite le bloc par les deux-points ET l\'indentation — pas d\'accolades, l\'alignement fait foi'],
              ['(…) et {…} (JavaScript)', 'JavaScript exige le test entre PARENTHÈSES et le bloc entre ACCOLADES — l\'indentation, elle, ne sert qu\'aux humains'],
              ['la stratégie', 'maîtrise les notions en pseudo-code : chaque nouveau langage devient un simple exercice de traduction, pas un nouveau monde']
            ]},
          { t: 'table', head: ['Pseudo-code', 'Python', 'JavaScript', 'Ce qui change'], rows: [
            ['`x ← 5`', '`x = 5`', '`let x = 5;`', '`←` devient `=`, JS veut `let`'],
            ['`AFFICHER x`', '`print(x)`', '`console.log(x);`', 'Le nom de la fonction change'],
            ['`LIRE x`', '`x = input()`', '`let x = prompt();`', 'Python: input(), JS: prompt()'],
            ['`SI … ALORS`', '`if …:`', '`if (…) { }`', 'Python : `:` et indentation. JS : `()` et `{}`'],
            ['`SINON`', '`else:`', '`else { }`', 'Idem'],
            ['`TANT QUE … FAIRE`', '`while …:`', '`while (…) { }`', 'Idem'],
            ['`POUR i DE 1 À n`', '`for i in range(1, n+1):`', '`for (let i=1; i<=n; i++) { }`', 'Python : range(). JS : syntaxe C'],
            ['`FONCTION … FIN`', '`def …:`', '`function …( ) { }`', 'Python : def. JS : function'],
            ['`RETOURNER x`', '`return x`', '`return x;`', 'Presque identique'],
            ['`// commentaire`', '`# commentaire`', '`// commentaire`', 'Python : # au lieu de //']
          ] },
          { t: 'h3', h: 'Exemple 1 : le calculateur de prix' },
          { t: 'code', lang: 'text', label: 'Pseudo-code (ce que tu sais déjà)', code:
'LIRE prix_texte\nprix ← CONVERTIR_EN_NOMBRE(prix_texte)\nLIRE qte_texte\nqte ← CONVERTIR_EN_NOMBRE(qte_texte)\ntotal ← prix * qte\nAFFICHER "Total : " + total + " FCFA"' },
          { t: 'code', lang: 'py', label: 'Python', code:
'prix = float(input("Prix unitaire ? "))\nqte = int(input("Quantité ? "))\ntotal = prix * qte\nprint(f"Total : {total} FCFA")' },
          { t: 'code', lang: 'js', label: 'JavaScript', code:
'let prix = Number(prompt("Prix unitaire ?"));\nlet qte = Number(prompt("Quantité ?"));\nlet total = prix * qte;\nconsole.log("Total : " + total + " FCFA");' },
          { t: 'h3', h: 'Exemple 2 : la boucle avec condition' },
          { t: 'code', lang: 'text', label: 'Pseudo-code', code:
'stock ← 10\nTANT QUE stock > 0 FAIRE\n  AFFICHER "Stock restant : " + stock\n  LIRE qte_vendue_texte\n  qte_vendue ← CONVERTIR_EN_NOMBRE(qte_vendue_texte)\n  stock ← stock - qte_vendue\nFIN TANT QUE\nAFFICHER "Stock épuisé !"' },
          { t: 'code', lang: 'py', label: 'Python', code:
'stock = 10\nwhile stock > 0:\n    print(f"Stock restant : {stock}")\n    qte_vendue = int(input("Quantité vendue ? "))\n    stock = stock - qte_vendue\nprint("Stock épuisé !")' },
          { t: 'code', lang: 'js', label: 'JavaScript', code:
'let stock = 10;\nwhile (stock > 0) {\n  console.log("Stock restant : " + stock);\n  let qte = Number(prompt("Quantité vendue ?"));\n  stock = stock - qte;\n}\nconsole.log("Stock épuisé !");' },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Maintenant que je connais Python, je n\'ai plus besoin du pseudo-code. »** Faux — le pseudo-code reste utile pour CONCEVOIR avant de coder, même en Python. C\'est comme le brouillon avant la copie propre : il n\'est pas fait pour être montré, il est fait pour t\'aider à RÉFLÉCHIR.',
            '**« Les deux versions Python et JS sont interchangeables. »** La logique oui, la syntaxe non. `input()` lit toujours une chaîne en Python ; `prompt()` lit toujours une chaîne en JS. Mais `print()` n\'a pas de point-virgule, `console.log()` en a un. Ce sont des détails mécaniques — l\'important est que tu reconnaisses la STRUCTURE (variable, condition, boucle) derrière la syntaxe.',
            '**« Je dois apprendre les deux en même temps. »** Non — choisis-en UN pour commencer. Python est plus indulgent pour apprendre (pas de `;`, pas de `{}`, pas de `let`). JavaScript est plus utile si tu veux faire du web. Les deux reposent sur la MÊME logique algorithmique que tu viens d\'apprendre.'
          ] },
          { t: 'h3', h: 'Lien avec les notions déjà vues' },
          { t: 'p', h: 'Cette fiche est le point de jonction entre le module Algorithmique et TOUS les autres modules du site. Chaque ligne de Python ou JavaScript que tu écriras désormais repose sur une structure que tu connais déjà en pseudo-code. Les modules HTML, CSS, JavaScript, Python, PHP et tous les autres t\'attendent — et tu as maintenant les fondations logiques pour tous les aborder. Bienvenue dans la programmation.' }
        ],
        errors: [
          {
            title: 'Croire que la syntaxe est la partie difficile',
            bad: '// « Je n\'arrive pas à retenir qu\'en Python\n// c\'est input() et en JS c\'est prompt().\n// Je ne suis pas fait pour coder. »',
            good: '// La syntaxe, ça se GOOGLE.\n// \"python read user input\" → input()\n// \"javascript read user input\" → prompt()\n// Ce qui ne se google PAS, c\'est la LOGIQUE :\n// SAVOIR qu\'il faut lire, convertir, calculer.\n// Et ÇA, tu le sais déjà.',
            why: 'Les développeurs expérimentés cherchent la syntaxe tous les jours — même pour des langages qu\'ils connaissent. Ce qui fait la différence entre un débutant et un pro, ce n\'est pas la mémoire de la syntaxe, c\'est la capacité à DÉCOMPOSER un problème en étapes logiques. Et cette capacité, tu viens de l\'acquérir.'
          },
          {
            title: 'Traduire mot à mot le pseudo-code sans adapter à la philosophie du langage',
            bad: '# Python — écrit comme du pseudo-code traduit mot à mot :\nstock = 10\nwhile stock > 0:\n    print("Stock restant : " + str(stock))\n    qte_texte = input("Quantité ? ")\n    qte = int(qte_texte)\n    stock = stock - qte',
            good: '# Python — la version idiomatique (\"pythonique\") :\nstock = 10\nwhile stock > 0:\n    print(f"Stock restant : {stock}")\n    qte = int(input("Quantité ? "))\n    stock -= qte  # équivalent à stock = stock - qte',
            why: 'Chaque langage a ses idiomes. Traduire mot à mot le pseudo-code donne du code qui « marche » mais qui n\'est pas naturel. Python adore les f-strings (`f"..."`), les opérateurs combinés (`-=`, `+=`), et la concision. JavaScript aime les template literals, les arrow functions, `const` plutôt que `let` quand la valeur ne change pas. Adapte-toi au langage cible — le pseudo-code t\'a donné le plan, pas le texte final.'
          }
        ],
        related: ['algo-definition', 'algo-pseudo-code', 'algo-variables', 'algo-conditions', 'algo-boucles', 'py-demarrage', 'js-variables']
      }
    ]
  },

  /* ======================================================
     9. ALGORITHMES CLASSIQUES & RÉCURSIVITÉ
     ====================================================== */
  {
    id: 'algorithmes-avances',
    name: 'Algorithmes classiques & Récursivité',
    icon: 'account_tree',
    fiches: [
      {
        id: 'algo-recherche',
        title: 'Recherche linéaire vs Recherche dichotomique',
        icon: 'search',
        level: 'Avancé',
        tagline: 'Trouver une aiguille dans une botte de foin : la méthode lente (une par une) vs la méthode éclair (couper en deux).',
        intro: 'Imaginons que tu cherches le mot « Zémidjan » dans un dictionnaire de 100 000 mots. Deux choix s\'offrent à toi : tourner les pages une par une depuis la lettre A (recherche linéaire), ou ouvrir le dictionnaire au milieu, voir qu\'on est à la lettre M, et éliminer immédiatement les 50 000 premières pages d\'un seul coup (recherche dichotomique). La différence ? Dans le premier cas, tu peux faire 100 000 vérifications. Dans le second, 17 vérifications suffisent ! Cette fiche décortique ces deux algorithmes de recherche fondamentaux.',
        blocks: [
          { t: 'h3', h: 'La recherche linéaire : l\'approche naïve' },
          { t: 'p', h: 'La **recherche linéaire** (ou séquentielle) consiste à parcourir le tableau élément par élément, du début à la fin, jusqu\'à trouver l\'élément recherché ou atteindre la fin du tableau. C\'est la seule méthode possible si le tableau N\'EST PAS trié.' },
          { t: 'syntax', title: 'Recherche linéaire en pseudo-code', lang: 'text', code:
'FONCTION chercher_lineaire(tableau, valeur_cible)\n  POUR i DE 1 À TAILLE(tableau) FAIRE\n    SI tableau[i] = valeur_cible ALORS\n      RETOURNER i  // trouvé à l\'index i !\n    FIN SI\n  FIN POUR\n  RETOURNER -1  // non trouvé\nFIN FONCTION', legend: [
            ['POUR i DE 1 À TAILLE', 'on examine les cases une à une, dans l\'ordre, du premier au dernier élément'],
            ['RETOURNER i', 'dès que l\'élément est trouvé, la fonction s\'arrête immédiatement et renvoie l\'index'],
            ['RETOURNER -1', 'si la boucle se termine sans rien trouver, la convention universelle est de renvoyer -1']
          ]},
          { t: 'h3', h: 'La recherche dichotomique (Binary Search) : l\'approche par division' },
          { t: 'p', h: 'La **recherche dichotomique** exige une condition préalable stricte : **LE TABLEAU DOIT ÊTRE TRIÉ**. À chaque étape, on regarde l\'élément du milieu. S\'il est plus grand que notre cible, on élimine toute la moitié droite. S\'il est plus petit, on élimine toute la moitié gauche. On divise l\'espace de recherche par 2 à chaque coup.' },
          { t: 'syntax', title: 'Recherche dichotomique en pseudo-code', lang: 'text', code:
'FONCTION chercher_dichotomique(tableau, cible)\n  debut ← 1\n  fin ← TAILLE(tableau)\n  TANT QUE debut ≤ fin FAIRE\n    milieu ← (debut + fin) DIV 2\n    SI tableau[milieu] = cible ALORS\n      RETOURNER milieu\n    SINON SI tableau[milieu] < cible ALORS\n      debut ← milieu + 1  // chercher dans la moitié droite\n    SINON\n      fin ← milieu - 1    // chercher dans la moitié gauche\n    FIN SI\n  FIN TANT QUE\n  RETOURNER -1\nFIN FONCTION', legend: [
            ['debut ≤ fin', 'tant qu\'il reste des cases non éliminées à examiner entre debut et fin'],
            ['(debut + fin) DIV 2', 'calcule l\'index de la case située exactement au milieu du segment actuel'],
            ['debut ← milieu + 1', 'si la valeur au milieu est trop petite, la cible est forcément plus loin à droite'],
            ['fin ← milieu - 1', 'si la valeur au milieu est trop grande, la cible est forcément plus haut à gauche']
          ]},
          { t: 'h3', h: 'Comparaison des performances : O(N) vs O(log N)' },
          { t: 'table', head: ['Taille du tableau (N)', 'Recherche linéaire (pire cas)', 'Recherche dichotomique (pire cas)'], rows: [
            ['10 éléments', '10 comparaisons', '4 comparaisons'],
            ['1 000 éléments', '1 000 comparaisons', '10 comparaisons'],
            ['1 000 000 éléments', '1 000 000 comparaisons', '20 comparaisons'],
            ['1 000 000 000 éléments', '1 milliard de comparaisons', '30 comparaisons']
          ]},
          { t: 'p', h: 'La différence est vertigineuse : pour un milliard d\'éléments, la recherche linéaire peut prendre plusieurs secondes, alors que la recherche dichotomique répond en 30 étapes invisibles à l\'œil humain.' },
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« Je peux utiliser la recherche dichotomique sur n\'importe quel tableau. »** ABSOLUMENT FAUX. Si le tableau n\'est pas trié, la dichotomie éliminera la mauvaise moitié et conclura à tort que l\'élément n\'existe pas.',
            '**« Il vaut toujours mieux trier puis faire une dichotomie. »** Pas toujours ! Trier un tableau coûte du temps. Si tu ne cherches qu\'UNE seule fois dans un tableau non trié, une simple recherche linéaire est plus rapide que de trier d\'abord.'
          ] }
        ],
        errors: [
          {
            title: 'Lancer une recherche dichotomique sur un tableau non trié',
            bad: 'tableau ← [15, 3, 42, 8, 1]\nindex ← chercher_dichotomique(tableau, 8)\n// Le milieu sera 42, 8 < 42 donc on cherche à gauche [15, 3]…\n// Résultat : -1 (non trouvé alors que 8 est bien présent !)',
            good: '// Solution 1 : trier le tableau D\'ABORD\nTRIER(tableau)  // devient [1, 3, 8, 15, 42]\nindex ← chercher_dichotomique(tableau, 8)  // trouve 8 à l\'index 3 !\n\n// Solution 2 : utiliser la recherche linéaire si le tableau reste désordonné',
            why: 'La dichotomie repose à 100 % sur l\'hypothèse que tous les éléments à droite du milieu sont plus grands et tous ceux à gauche sont plus petits. Sans tri, cette hypothèse est fausse.'
          }
        ],
        related: ['algo-tableaux', 'algo-boucles', 'algo-fonctions']
      },
      {
        id: 'algo-recursion',
        title: 'La récursivité & la pile d\'appels',
        icon: 'layers',
        level: 'Avancé',
        tagline: 'Une fonction qui s\'appelle elle-même : comprendre le cas de base et la pile d\'appels (Call Stack).',
        intro: 'Imagine des poupées russes (les Matryoshka). Tu ouvres une grande poupée : dedans se trouve une poupée identique mais plus petite. Tu l\'ouvres : une autre encore plus petite. Tu continues jusqu\'à atteindre la TOUTE PETITE poupée pleine qu\'on ne peut pas ouvrir. Tu as enfin fini d\'ouvrir, tu peux tout refermer. En programmation, la **récursivité** est cette idée exacte : une fonction qui s\'appelle **elle-même** sur un problème plus petit, jusqu\'à atteindre un cas de départ simple qu\'on appelle le **cas de base**.',
        blocks: [
          { t: 'h3', h: 'Les deux règles d\'or de la récursivité' },
          { t: 'p', h: 'Toute fonction récursive DOIT comporter deux parties obligatoires :' },
          { t: 'ul', items: [
            '**1. Le Cas de Base (Condition d\'arrêt)** : C\'est la condition qui ARRÊTE les appels récursifs et renvoie une valeur directe sans rappel. Sans lui, la fonction s\'appelle à l\'infini jusqu\'au plantage (`Stack Overflow`).',
            '**2. Le Cas Récursif** : C\'est l\'étape où la fonction s\'appelle elle-même, mais avec un argument **RÉDUIT** qui la rapproche inexorablement du cas de base.'
          ] },
          { t: 'syntax', title: 'Calcul de la factorielle (N!) en récursif', lang: 'text', code:
'FONCTION factorielle(n)\n  SI n ≤ 1 ALORS\n    RETOURNER 1         // CAS DE BASE\n  SINON\n    RETOURNER n * factorielle(n - 1)  // CAS RÉCURSIF\n  FIN SI\nFIN FONCTION', legend: [
            ['SI n ≤ 1 RETOURNER 1', 'le CAS DE BASE : si n vaut 1 (ou 0), la réponse est 1. La chaîne d\'appels s\'arrête ici !'],
            ['n * factorielle(n - 1)', 'le CAS RÉCURSIF : 5! = 5 × 4!. La fonction s\'appelle elle-même avec (n - 1), un problème plus petit']
          ]},
          { t: 'h3', h: 'Que se passe-t-il en mémoire ? La pile d\'appels (Call Stack)' },
          { t: 'p', h: 'Quand tu appelles `factorielle(3)`, l\'ordinateur ne calcule pas le résultat instantanément. Il empile chaque appel en mémoire dans ce qu\'on appelle la **pile d\'appels** (Call Stack) :' },
          { t: 'table', head: ['Étape', 'Action sur la pile d\'appels', 'État de la pile (de bas en haut)'], rows: [
            ['1', 'Appel initial `factorielle(3)`', '`factorielle(3)` (en attente de 3 * factorielle(2))'],
            ['2', 'Appel de `factorielle(2)`', '`factorielle(3)` → `factorielle(2)` (en attente de 2 * factorielle(1))'],
            ['3', 'Appel de `factorielle(1)`', '`factorielle(1)` atteint le cas de base'],
            ['4', '`factorielle(1)` renvoie 1', '`factorielle(1)` est dépilée → renvoie 1'],
            ['5', '`factorielle(2)` calcule 2 * 1 = 2', '`factorielle(2)` est dépilée → renvoie 2'],
            ['6', '`factorielle(3)` calcule 3 * 2 = 6', '`factorielle(3)` est dépilée → renvoie 6. FIN !']
          ]},
          { t: 'h3', h: 'Ce que les débutants comprennent mal' },
          { t: 'ul', items: [
            '**« La récursivité est toujours meilleure qu\'une boucle. »** Faux. Chaque appel récursif consomme de la mémoire dans la pile d\'appels. Une boucle `POUR` ou `TANT QUE` est souvent plus rapide et consomme 0 mémoire supplémentaire.',
            '**« Que signifie Stack Overflow ? »** Si tu oublies le cas de base ou que ta condition d\'arrêt n\'est jamais atteinte, la pile d\'appels se remplit indéfiniment jusqu\'à saturer la mémoire allouée. C\'est l\'origine du célèbre nom du site d\'entraide !'
          ] }
        ],
        errors: [
          {
            title: 'Oublier le cas de base (Stack Overflow garanti)',
            bad: 'FONCTION comptera_rebours(n)\n  AFFICHER n\n  RETOURNER comptera_rebours(n - 1)  // Pas de cas de base !\nFIN FONCTION',
            good: 'FONCTION comptera_rebours(n)\n  SI n ≤ 0 ALORS\n    AFFICHER "Décollage !"\n    RETOURNER  // Cas de base !\n  FIN SI\n  AFFICHER n\n  RETOURNER comptera_rebours(n - 1)\nFIN FONCTION',
            why: 'Sans cas de base, la fonction s\'appellera pour n=0, n=-1, n=-2... indéfiniment jusqu\'à épuisement de la mémoire de la pile d\'appels (Stack Overflow).'
          }
        ],
        related: ['algo-fonctions', 'algo-boucles']
      }
    ]
  }
);
/*__FIN_ALGO__*/