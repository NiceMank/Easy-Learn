/* ============================================================
   data-laravel.js — Contenu pédagogique Laravel (approfondi)
   Fondamentaux, cycle HTTP, Eloquent, sécurité, architecture
   avancée. Exemples en PHP, ancrés dans la vie réelle (Cotonou).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.laravel = {
  id: 'laravel',
  name: 'Laravel',
  icon: 'deployed_code',
  tagline: 'Le framework PHP élégant : routes, Eloquent, Blade, queues et tout l\'écosystème pour des applications robustes.',
  heroTitle: 'Laravel, l\'art du backend PHP sans friction',

  categories: [
    /* ==================== 1. FONDAMENTAUX ==================== */
    {
      id: 'fondamentaux',
      name: 'Fondamentaux',
      icon: 'architecture',
      fiches: [
        {
          id: 'lv-notions',
          title: 'Notions de base : le web, le terminal et la base de données',
          icon: 'school',
          level: 'Débutant',
          tagline: 'Client, serveur, requête HTTP, terminal, paquets, base de données : tous les mots que le cours Laravel emploie, expliqués une fois pour toutes — avec schémas.',
          intro: 'Ce module emploie parfois des mots comme « requête », « serveur » ou « migration » comme s\'ils allaient de soi. Rien d\'anormal : ce sont les briques du métier. Cette fiche d\'entrée les définit TOUS, simplement et en images — lis-la avant la fiche Installation, ou reviens-y dès qu\'un mot te résiste. Dix minutes ici t\'en feront gagner des heures ensuite.',
          blocks: [
            { t: 'h3', h: 'Comment le web fonctionne en 30 secondes' },
            { t: 'p', h: 'Quand tu tapes une adresse ou que tu cliques un lien, ton NAVIGATEUR (Chrome, Safari…) envoie une question à travers Internet : la **requête HTTP**. De l\'autre côté, un ordinateur allumé en permanence — le **serveur** — la reçoit, fait travailler ton application, puis renvoie la **réponse** (la page que tu vois). Ce va-et-vient question/réponse EST le web : chaque page, chaque clic, chaque formulaire. Comme au restaurant : le client (navigateur) commande, la cuisine (serveur + application) prépare en regardant ses réserves (la base de données), puis le plat revient en salle.' },
            { t: 'diagram', title: 'Le va-et-vient fondamental : requête → traitement → réponse', svg: `<svg viewBox="0 0 680 260">
  <defs><marker id="lv-n1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="40" width="168" height="64" rx="12" class="dg-b"/>
  <text x="104" y="66" class="dg-t" text-anchor="middle">Navigateur</text>
  <text x="104" y="86" class="dg-m" text-anchor="middle">le client (PC, téléphone)</text>
  <rect x="330" y="14" width="330" height="232" rx="14" class="dg-zone"/>
  <text x="344" y="36" class="dg-ms">LE SERVEUR — ALLUMÉ 24H/24</text>
  <rect x="360" y="48" width="270" height="56" rx="12" class="dg-ba"/>
  <text x="495" y="70" class="dg-t" text-anchor="middle">Laravel — ton application</text>
  <text x="495" y="90" class="dg-m" text-anchor="middle">routes → contrôleur → vue</text>
  <rect x="360" y="168" width="270" height="56" rx="12" class="dg-b"/>
  <text x="495" y="190" class="dg-t" text-anchor="middle">Base de données</text>
  <text x="495" y="210" class="dg-m" text-anchor="middle">produits, clients, commandes</text>
  <path d="M 190,50 C 250,44 300,54 356,62" class="dg-e" marker-end="url(#lv-n1)"/>
  <circle cx="272" cy="42" r="9" class="dg-num"/><text x="272" y="46" class="dg-numt" text-anchor="middle">1</text>
  <text x="272" y="28" class="dg-m" text-anchor="middle">requête HTTP : GET /boutique</text>
  <path d="M 560,106 L 560,164" class="dg-e" marker-end="url(#lv-n1)"/>
  <circle cx="560" cy="134" r="9" class="dg-num"/><text x="560" y="138" class="dg-numt" text-anchor="middle">2</text>
  <text x="576" y="138" class="dg-m">requête SQL</text>
  <path d="M 430,164 L 430,106" class="dg-e" marker-end="url(#lv-n1)"/>
  <circle cx="430" cy="134" r="9" class="dg-num"/><text x="430" y="138" class="dg-numt" text-anchor="middle">3</text>
  <text x="414" y="138" class="dg-m" text-anchor="end">les lignes trouvées</text>
  <path d="M 356,88 C 296,92 250,92 190,84" class="dg-e" marker-end="url(#lv-n1)"/>
  <circle cx="274" cy="96" r="9" class="dg-num"/><text x="274" y="100" class="dg-numt" text-anchor="middle">4</text>
  <text x="274" y="117" class="dg-m" text-anchor="middle">réponse : la page HTML</text>
</svg>`, caption: 'Ce cycle se répète à CHAQUE clic. Laravel, c\'est la cuisine : la fiche suivante (« Structure, cycle de vie ») en ouvre les portes une par une. Retiens déjà ceci : ton navigateur ne voit jamais ni le code PHP, ni la base — seulement la réponse HTML.' },
            { t: 'table', head: ['Mot', 'Traduction simple'], rows: [
              ['URL', 'L\'adresse complète d\'une page — comme l\'adresse postale d\'une maison (« https://boutique-awa.bj/boutique »)'],
              ['requête HTTP', 'La question envoyée par le navigateur : « je veux TELLE page, TELLE action »'],
              ['réponse HTTP', 'Ce que le serveur renvoie : du HTML, du JSON, une image… accompagné d\'un **statut**'],
              ['verbe HTTP', 'L\'intention de la question : `GET` (lire) ou `POST` (envoyer des données) sont les deux plus courants'],
              ['statut (200, 404, 500…)', 'Le verdict du serveur : 200 « voilà », 404 « inconnu », 500 « j\'ai planté » — tu les verras tous'],
              ['HTML / CSS / JavaScript', 'Les trois langages que le NAVIGATEUR comprend : le contenu, le style, l\'interactivité'],
              ['PHP', 'Le langage exécuté par le SERVEUR (jamais par le navigateur) — celui dans lequel Laravel est écrit']
            ] },
            { t: 'h3', h: 'Langage, framework, bibliothèque : qui commande qui ?' },
            { t: 'p', h: '**PHP est un langage** : un vocabulaire et une grammaire que l\'ordinateur exécute. Une **bibliothèque** est une caisse d\'outils tout faits (générer un PDF, redimensionner une image) : c\'est TOI qui l\'appelles quand tu en as besoin. Un **framework** inverse la relation : il fournit la structure ET appelle TON code au bon moment — « ne nous appelez pas, on vous appellera ». Concrètement avec Laravel : quand une requête arrive, c\'est LUI qui la reçoit, l\'aiguille (les routes), la protège (les middleware), puis délègue à TON contrôleur — et renvoie la réponse. Tu écris les 20 % métier (TA boutique), il fournit les 80 % d\'infrastructure, écrits en PHP eux aussi.' },
            { t: 'diagram', title: 'La pile des outils : qui fait quoi (et ce que TU écris vraiment)', svg: `<svg viewBox="0 0 680 232">
  <defs><marker id="lv-n2" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="100" y="16" width="400" height="40" rx="10" class="dg-ba"/>
  <text x="300" y="40" class="dg-t" text-anchor="middle">TON code : routes, contrôleurs, vues</text>
  <rect x="100" y="64" width="400" height="40" rx="10" class="dg-b"/>
  <text x="300" y="88" class="dg-t" text-anchor="middle">Laravel : routing, Eloquent, Blade, auth…</text>
  <rect x="100" y="112" width="400" height="40" rx="10" class="dg-b"/>
  <text x="300" y="136" class="dg-t" text-anchor="middle">PHP — le moteur qui exécute tout</text>
  <rect x="100" y="160" width="400" height="40" rx="10" class="dg-b"/>
  <text x="300" y="184" class="dg-t" text-anchor="middle">Serveur web + système d'exploitation</text>
  <path d="M 40,28 L 95,28" class="dg-e" marker-end="url(#lv-n2)"/>
  <text x="67" y="18" class="dg-m" text-anchor="middle">requête</text>
  <path d="M 95,44 L 40,44" class="dg-e" marker-end="url(#lv-n2)"/>
  <text x="67" y="58" class="dg-m" text-anchor="middle">réponse</text>
  <text x="512" y="40" class="dg-m">◀ tu n'écris QUE cette couche</text>
  <text x="512" y="88" class="dg-m">◀ déjà écrit, testé, audité</text>
  <text x="512" y="136" class="dg-m">◀ le langage</text>
  <text x="512" y="184" class="dg-m">◀ la machine, allumée 24h/24</text>
</svg>`, caption: 'Lecture : la requête descend la pile, la réponse la remonte. Ton travail se concentre dans la couche du haut — le reste est déjà écrit par des experts : c\'est exactement la promesse d\'un framework. Et Composer (fiche Installation) est le magasin qui livre la couche Laravel et les bibliothèques.' },
            { t: 'h3', h: 'Le terminal : piloter l\'ordinateur en tapant du texte' },
            { t: 'p', h: 'Le TERMINAL (aussi appelé « console » ou « invite de commandes ») est cette fenêtre sombre où l\'on tape des ordres au lieu de cliquer. Pourquoi s\'en servir ? Parce que les outils de développement (Composer, artisan…) n\'ont pas d\'interface graphique : on leur parle EN TEXTANT. L\'ouvrir : **Windows** → touche Windows, tape « Terminal » ; **macOS** → Cmd+Espace, tape « Terminal » ; **Linux** → Ctrl+Alt+T. Une commande se lit de gauche à droite : dans `php artisan serve`, `php` est le programme appelé, `artisan serve` ce qu\'on lui demande — ici « démarre le serveur, s\'il te plaît ».' },
            { t: 'code', lang: 'bash', label: 'Les cinq commandes de survie (essaie-les, aucun danger)', code: 'pwd                    # « où suis-je ? » : affiche le dossier courant\ncd boutique-awa        # « entre DANS le dossier boutique-awa » (change directory)\ncd ..                  # « remonte d\'un dossier »\nls                     # liste les fichiers du dossier courant (sous Windows : dir)\nphp -v                 # demande sa version à PHP — ta première discussion avec lui' },
            { t: 'callout', kind: 'warn', h: 'Deux pièges qui font perdre des heures la première semaine. **Le `$` (ou `>`) affiché au début des commandes dans les tutoriels ne se tape PAS** : c\'est l\'invite, le signe « à toi de parler ». Et les commandes se tapent **dans le bon dossier** : `php artisan …` ne fonctionne que dans le dossier du projet — fais d\'abord `cd boutique-awa`, sinon : « Could not open input file: artisan ».' },
            { t: 'h3', h: 'La base de données : le cahier où rien ne s\'efface' },
            { t: 'p', h: 'Ton application PHP s\'arrête après chaque réponse (la fiche suivante l\'expliquera en détail) : tout ce qui doit survivre — produits, clients, commandes — est rangé dans la **base de données**. Elle ressemble à un classeur de tableaux : une **table** par sujet (`produits`, `clients`, `commandes`), une **colonne** par information (`nom`, `prix`, `stock`), une **ligne** par élément concret. On l\'interroge dans un langage de questions appelé **SQL** — et bonne nouvelle : Eloquent, la fiche phare du module, traduira ce SQL pour toi. Pour débuter tu utiliseras **SQLite** : la base entière tient en UN fichier, rien à installer ; **MySQL** viendra plus tard, en production.' },
            { t: 'diagram', title: 'Anatomie d\'une base de données : table, colonnes, lignes', svg: `<svg viewBox="0 0 680 230">
  <defs><marker id="lv-n3" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="46" y="30" class="dg-t">la TABLE : produits</text>
  <rect x="46" y="44" width="50" height="26" class="dg-ba"/><rect x="96" y="44" width="170" height="26" class="dg-ba"/><rect x="266" y="44" width="100" height="26" class="dg-ba"/><rect x="366" y="44" width="100" height="26" class="dg-ba"/>
  <text x="71" y="61" class="dg-t" text-anchor="middle">id</text><text x="181" y="61" class="dg-t" text-anchor="middle">nom</text><text x="316" y="61" class="dg-t" text-anchor="middle">prix</text><text x="416" y="61" class="dg-t" text-anchor="middle">stock</text>
  <rect x="46" y="70" width="50" height="26" class="dg-b"/><rect x="96" y="70" width="170" height="26" class="dg-b"/><rect x="266" y="70" width="100" height="26" class="dg-b"/><rect x="366" y="70" width="100" height="26" class="dg-b"/>
  <text x="71" y="87" class="dg-m" text-anchor="middle">1</text><text x="181" y="87" class="dg-m" text-anchor="middle">Gari premium</text><text x="316" y="87" class="dg-m" text-anchor="middle">21 000</text><text x="416" y="87" class="dg-m" text-anchor="middle">12</text>
  <rect x="46" y="96" width="50" height="26" class="dg-b"/><rect x="96" y="96" width="170" height="26" class="dg-b"/><rect x="266" y="96" width="100" height="26" class="dg-b"/><rect x="366" y="96" width="100" height="26" class="dg-b"/>
  <text x="71" y="113" class="dg-m" text-anchor="middle">2</text><text x="181" y="113" class="dg-m" text-anchor="middle">Huile rouge 5L</text><text x="316" y="113" class="dg-m" text-anchor="middle">6 500</text><text x="416" y="113" class="dg-m" text-anchor="middle">30</text>
  <text x="676" y="26" class="dg-t" text-anchor="end">une COLONNE = une information</text>
  <path d="M 640,34 L 340,48" class="dg-e" marker-end="url(#lv-n3)"/>
  <text x="46" y="168" class="dg-t">une LIGNE = un élément (un produit)</text>
  <path d="M 100,158 L 60,100" class="dg-e" marker-end="url(#lv-n3)"/>
  <text x="500" y="80" class="dg-tt" text-anchor="middle">Eloquent</text>
  <path d="M 474,96 L 512,120" class="dg-ea" marker-end="url(#lv-n3)"/>
  <rect x="516" y="124" width="148" height="66" rx="12" class="dg-b"/>
  <text x="590" y="146" class="dg-t" text-anchor="middle">objet Produit</text>
  <text x="590" y="164" class="dg-ms" text-anchor="middle">{ nom: 'Gari premium',</text>
  <text x="590" y="180" class="dg-ms" text-anchor="middle">prix: 21000 }</text>
</svg>`, caption: 'La formule magique : TABLE = le sujet, COLONNE = l\'information, LIGNE = l\'élément. Et garde la flèche de droite sous le coude : Eloquent (l\'ORM de Laravel) transformera chaque ligne en objet PHP manipulable — c\'est tout le sujet de la fiche Eloquent.' },
            { t: 'h3', h: 'Frontend et backend : de quel côté du comptoir ?' },
            { t: 'ul', items: [
              '**Frontend** (le « devant ») : ce qui s\'exécute dans le NAVIGATEUR du visiteur — HTML, CSS, JavaScript. On le voit, on clique dessus.',
              '**Backend** (l\'« arrière-boutique ») : ce qui s\'exécute sur le SERVEUR — PHP, Laravel, la base de données. Invisible du visiteur, c\'est là que vivent les données et les règles du jeu.',
              'Le pont entre les deux : la requête / réponse HTTP du premier schéma. Laravel est un framework **backend** : il fabrique la réponse (HTML ou JSON) que le frontend affiche.',
              'Piège classique : chercher son PHP dans « Afficher le code source » de la page. Tu n\'y verras JAMAIS ton PHP — il a déjà été exécuté et remplacé par son résultat HTML avant l\'envoi.'
            ] },
            { t: 'h3', h: 'Le petit glossaire du module (à garder sous le coude)' },
            { t: 'table', head: ['Terme', 'Sens en une phrase'], rows: [
              ['framework', 'Une application « à trous » : il fournit la structure, tu remplis le métier'],
              ['paquet (package)', 'Une bibliothèque prête à l\'emploi livrée par Composer — comme une appli dans un téléphone'],
              ['dépendance', 'Un paquet dont TON projet a besoin pour tourner (Laravel lui-même est une dépendance)'],
              ['API', 'Une façade « pour programmes » : l\'application y répond en données (JSON) plutôt qu\'en pages à lire'],
              ['JSON', 'Un format texte pour transporter des données structurées : `{ "nom": "Gari", "prix": 21000 }`'],
              ['ORM', 'Le traducteur tables ↔ objets : chaque ligne de base devient un objet PHP (fiche Eloquent)'],
              ['MVC', 'La répartition Modèle (données) / Vue (affichage) / Contrôleur (chef d\'orchestre) — schéma à la fiche Contrôleurs'],
              ['artisan', 'La console de commandes de Laravel : `php artisan …` crée fichiers et migrations, lance le serveur']
            ] },
            { t: 'h3', h: 'Lien avec la suite' },
            { t: 'p', h: 'Tu as maintenant tous les mots pour attaquer : la fiche **Installation** va te faire poser chaque outil un par un (PHP le moteur, Composer le magasin à paquets, le projet frais), et la fiche **Structure, cycle de vie & artisan** rouvrira le premier schéma de cette page en zoomant sur ce qui se passe ENTRE la requête et la réponse. Un conseil de lecture : ne récite pas ce glossaire — utilise-le. Chaque fois qu\'un mot du cours te semble flou, reviens ici.' }
          ],
          errors: [
            { title: 'Confondre le terminal et le navigateur', lang: 'bash', bad:
'# L\'erreur presque universelle de la première semaine :\n# taper ceci dans la BARRE D\'ADRESSE du navigateur :\nphp artisan serve\n# → Google répond « aucun résultat »… une adresse attend une URL,\n#   pas une commande. Ou l\'inverse : taper dans le TERMINAL :\nhttp://localhost:8000\n# → « command not found » : le terminal ne visite pas les pages.', good:
'# Chaque outil a SA fenêtre :\n#\n# Dans le TERMINAL : donner des ORDRES à ta machine\nphp artisan serve              # démarre le serveur — ici ✓\n#\n# Dans le NAVIGATEUR : poser des QUESTIONS aux serveurs\nhttp://localhost:8000          # voir la page — ici ✓\n#\n# Mémo : on TRAVAILLE dans le terminal, on REGARDE dans le navigateur.', why: 'Le terminal et le navigateur parlent deux protocoles différents : le premier exécute des COMMANDES sur ta machine, le second envoie des requêtes HTTP à des serveurs. « http://localhost:8000 » n\'est pas une commande (aucun programme de ce nom) et « php artisan serve » n\'est pas une adresse (aucun site de ce nom). Ce mélange est le premier tribunal de tout débutant : trente secondes à comprendre la différence épargnent une journée de « ça ne marche pas ».' },
            { title: '« Could not open input file: artisan »', lang: 'bash', bad:
'C:\\Users\\awa> php artisan make:model Produit\n# → Could not open input file: artisan\n# Panique : « mon installation est cassée ! » — non.\n# La commande a été lancée depuis TON DOSSIER PERSONNEL,\n# pas depuis le dossier du projet. artisan est un FICHIER :\n# php le cherche ici… et ne le trouve pas.', good:
'C:\\Users\\awa> cd boutique-awa        # d\'abord ENTRER dans le projet\nC:\\Users\\awa\\boutique-awa> php artisan make:model Produit\n# → Model created successfully.\n# Réflexe : quand « php artisan … » répond « file not found »,\n# vérifie où tu es (pwd / cd) avant de douter de l\'installation.', why: 'Une commande s\'exécute TOUJOURS dans un dossier courant, et `php artisan …` signifie « exécute le fichier artisan QUI EST DANS CE DOSSIER ». Hors du projet, ce fichier n\'existe pas : l\'erreur est littérale, pas un mystère d\'installation. C\'est la version grand public d\'une loi plus vaste du métier : avant d\'accuser l\'outil, vérifier le contexte (dossier, utilisateur, serveur lancé). Le rituel à garder : ouvrir le terminal → `cd` vers le projet → et seulement ensuite, travailler.' }
          ],
          related: ['lv-installation', 'lv-fondamentaux', 'lv-routing']
        },
        {
          id: 'lv-installation',
          title: 'Installation & configuration',
          icon: 'download',
          level: 'Débutant',
          tagline: 'PHP, Composer, create-project, .env, base de données et artisan serve : l\'atelier Laravel, posé proprement.',
          intro: 'Avant la première route, il faut l\'atelier : PHP pour exécuter le code, Composer pour télécharger le framework, un projet créé par l\'assistant officiel, un `.env` rempli et une base pour parler données. Cette fiche pose tout, dans l\'ordre, en expliquant le RÔLE de chaque outil — parce que 80 % des « Laravel ne marche pas » des débutants sont en réalité des problèmes d\'environnement, pas de code.',
          blocks: [
            { t: 'h3', h: 'Pourquoi Laravel ne « se télécharge » pas-t-il comme un simple fichier ?' },
            { t: 'p', h: 'Une application Laravel n\'est pas un fichier qu\'on pose : c\'est un ASSEMBLAGE — le cœur du framework (des dizaines de paquets), TON code métier au milieu (routes, contrôleurs, vues), et des réglages qui changent d\'une machine à l\'autre (base de données, clés). Télécharger un « laravel.zip » figerait tout ça en bloc. La bonne méthode procède en deux temps : **Composer** crée le squelette frais depuis le gabarit officiel, puis **artisan** (la console intégrée) l\'initialise pour TA machine (clé de chiffrement, base). C\'est le même contrat que npm côté JavaScript : un manifeste, des dépendances versionnées, un dossier `vendor/` jetable.' },
            { t: 'p', h: 'La carte des outils, une bonne fois : **PHP** est le moteur qui exécute tout (le « Node » du monde PHP). **Composer** est son npm : il lit `composer.json`, télécharge `vendor/`, verrouille les versions dans `composer.lock`. **artisan** est le terminal bilingue de Laravel : il crée projets, contrôleurs, migrations… — tu t\'en serviras à chaque séance. Et le **serveur Web** ? Pendant le développement, c\'est `php artisan serve` qui joue ce rôle — Apache/Nginx n\'interviennent qu\'en production.' },
            { t: 'callout', kind: 'info', h: 'Mot nouveau — **paquet** (ou « package ») : une boîte de code toute prête, écrite par quelqu\'un d\'autre, que Composer télécharge dans le dossier `vendor/` (Laravel lui-même est un paquet !). Ton projet **dépend** de ces boîtes — d\'où le mot **dépendance**. Composer porte le joli nom de **gestionnaire de paquets** : pense à un magasin d\'applications pour ton projet. Si les mots « terminal », « PATH » ou « commande » te sont étrangers, fais d\'abord un détour par la fiche **Notions de base** — elle est faite pour toi.' },
            { t: 'h3', h: 'Prérequis : PHP et Composer, dans le bon sens' },
            { t: 'table', head: ['Outil', 'Version requise', 'Vérification', 'Rôle'], rows: [
              ['PHP (CLI)', '≥ 8.2 (Laravel 11/12)', '`php -v` DOIT répondre 8.2+', 'Exécute le framework et ton code'],
              ['Extensions PHP usuelles', 'mbstring, xml, sqlite3/pdo, curl, openssl', '`php -m` les liste', 'Sans elles : erreurs cryptiques à l\'install'],
              ['Composer', '2.x', '`composer --version`', 'Télécharge et verrouille les paquets'],
              ['Une base (pour débuter)', 'SQLite — zéro installation', '`php -m` liste `sqlite3`', 'Fichier unique, parfait en dev']
            ] },
            { t: 'callout', kind: 'info', h: 'Par OS — la méthode qui coûte le moins de larmes. **Windows/macOS : Laravel Herd** (installateur de la famille Laravel — PHP, Composer, tout pré-câblé en 5 min, l\'équivalent moderne de XAMPP sans les maux de tête PATH). **Linux Ubuntu/Debian : `sudo apt install php-cli php-mbstring php-xml php-sqlite3 php-curl composer`** — chaque extension s\'installe en un paquet séparé, ne les oublie pas. **Windows, sans Herd :** XAMPP marche aussi — mais attends-toi à ajouter PHP au PATH toi-même (l\'erreur n°1 en bas).' },
            { t: 'h3', h: 'Créer le projet : l\'assistant officiel fait le gros du travail' },
            { t: 'diagram', title: 'Les 5 étapes de l\'installation, dans l\'ordre', svg: `<svg viewBox="0 0 680 150">
  <defs><marker id="lv-i1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="16" y="44" width="124" height="62" rx="12" class="dg-b"/>
  <text x="78" y="68" class="dg-t" text-anchor="middle">1 · Vérifier</text>
  <text x="78" y="88" class="dg-m" text-anchor="middle">php -v · composer</text>
  <path d="M 140,75 L 146,75" class="dg-e" marker-end="url(#lv-i1)"/>
  <rect x="147" y="44" width="124" height="62" rx="12" class="dg-b"/>
  <text x="209" y="68" class="dg-t" text-anchor="middle">2 · Créer</text>
  <text x="209" y="88" class="dg-m" text-anchor="middle">create-project</text>
  <path d="M 271,75 L 277,75" class="dg-e" marker-end="url(#lv-i1)"/>
  <rect x="278" y="44" width="124" height="62" rx="12" class="dg-b"/>
  <text x="340" y="68" class="dg-t" text-anchor="middle">3 · Initialiser</text>
  <text x="340" y="88" class="dg-m" text-anchor="middle">key:generate</text>
  <path d="M 402,75 L 408,75" class="dg-e" marker-end="url(#lv-i1)"/>
  <rect x="409" y="44" width="124" height="62" rx="12" class="dg-b"/>
  <text x="471" y="68" class="dg-t" text-anchor="middle">4 · La base</text>
  <text x="471" y="88" class="dg-m" text-anchor="middle">sqlite + migrate</text>
  <path d="M 533,75 L 539,75" class="dg-e" marker-end="url(#lv-i1)"/>
  <rect x="540" y="44" width="124" height="62" rx="12" class="dg-ba"/>
  <text x="602" y="68" class="dg-t" text-anchor="middle">5 · Lancer</text>
  <text x="602" y="88" class="dg-m" text-anchor="middle">artisan serve ✓</text>
</svg>`, caption: 'Chaque ligne de commande ci-dessous correspond à UNE de ces étapes — si l\'une échoue, tu sais exactement où tu en es. Et le raccourci bienvenu : les étapes 3 et 4 sont faites **une seule fois par projet** ; au quotidien, tu ne tapes que la 5.' },
            { t: 'code', lang: 'bash', label: 'Terminal — de zéro au projet qui tourne', code:
'# 1) Vérifier le socle — ces deux lignes DOIVENT répondre avant tout :\nphp -v                # → PHP 8.2.x ou plus\ncomposer --version    # → Composer 2.x\n\n# 2) Créer le projet « boutique-awa » (télécharge le framework + le squelette)\ncomposer create-project laravel/laravel boutique-awa\ncd boutique-awa\n\n# 3) La clé de chiffrement (OBLIGATOIRE — sessions, cookies chiffrés)\nphp artisan key:generate\n\n# 4) Créer la base SQLite (un simple fichier) et la préparer\ntype nul > database\\database.sqlite   :: Windows\ntouch database/database.sqlite        # macOS / Linux\nphp artisan migrate                   # crée users, cache, jobs…\n\n# 5) Lancer le serveur de développement\nphp artisan serve\n#   → « Server running on http://127.0.0.1:8000 » —\n#     la page d\'accueil Laravel s\'affiche : l\'atelier fonctionne.' },
            { t: 'p', h: 'Relis chaque geste : `create-project` télécharge le framework dans `vendor/` ET le squelette applicatif (routes/, app/, config/) — c\'est l\'équivalent de `npm create vite@latest` + `npm install` réunis. `key:generate` écrit une clé dans `.env` : sans elle, tout le chiffrement (sessions !) refuse de tourner — l\'erreur n°2 en bas. `migrate` construit les tables de base (users, cache, jobs) dans ta base fraîche. Et `serve` lance un serveur PHP intégré — pratique en dev, jamais en prod.' },
            { t: 'callout', kind: 'info', h: 'Comment lire `http://127.0.0.1:8000` : `127.0.0.1` est l\'adresse spéciale qui désigne **toujours ta propre machine** (son surnom : `localhost` — « l\'hôte local »). Le `:8000` est le **port** : un numéro de guichet qui permet à plusieurs serveurs de cohabiter sur la même machine. Traduction complète : « la page servie par MON serveur de dev, guichet 8000 » — elle n\'est visible que chez toi, personne d\'autre ne peut la voir, et c\'est normal.' },
            { t: 'h3', h: 'Le fichier .env et la connexion à la base' },
            { t: 'p', h: '`.env` est le TROUSSEAU de réglages par machine : identifiants de base, clé secrète, URL — différent en dev, en staging, en prod, et JAMAIS commité (`.gitignore` le sait). Laravel le lit à chaque démarrage, et `config/database.php` s\'y réfère. Pour débuter, SQLite est le bonheur : pas de serveur MySQL à installer, un fichier à sauvegarder avec le projet. La fiche **Configuration** du module détaillera `config:cache` et le piège associé ; ici retiens seulement : tu changes `.env`, tu relances `php artisan serve`.' },
            { t: 'code', lang: 'bash', label: '.env — les lignes qui comptent aujourd\'hui', code:
'APP_NAME="Boutique Awa"\nAPP_ENV=local              # « local » en dev : erreurs détaillées affichées\nAPP_DEBUG=true             # JAMAIS true en production !\nAPP_KEY=base64:…           # rempli par php artisan key:generate\n\nDB_CONNECTION=sqlite       # la base d\'un fichier — parfait pour débuter\n# (plus tard, MySQL : DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME…)' },
            { t: 'h3', h: 'Les dossiers que create-project a posés' },
            { t: 'code', lang: 'text', label: 'boutique-awa/ — le squelette Laravel (extrait)', code:
'boutique-awa/\n├── artisan              # la console : tout part de « php artisan … »\n├── composer.json        # le manifeste des dépendances (le « package.json » PHP)\n├── composer.lock        # les versions EXACTES installées — à commiter\n├── .env                 # le trousseau de réglages de TA machine — JAMAIS commité\n├── .env.example         # sa version vierge, pour les nouvelles machines\n├── .gitignore           # ignore vendor/ et .env — déjà prêt\n├── app/                 # TON code : Models, Http/Controllers, Policies…\n├── config/              # les réglages du framework (database, session, app…)\n├── database/\n│   ├── migrations/      # les fichiers de schéma (versionnés, comme Git)\n│   └── database.sqlite  # la base d\'un fichier — créée par toi (étape 4)\n├── public/              # la SEULE porte d\'entrée web : index.php\n├── routes/\n│   └── web.php          # tes pages commencent ICI\n├── storage/ + bootstrap/cache/   # logs, caches — doivent rester inscriptibles\n└── vendor/              # le framework téléchargé — jetable, jamais commité' },
            { t: 'p', h: 'La fiche **Structure, cycle de vie & artisan** dissèque chaque dossier en profondeur — retiens pour l\'instant l\'essentiel : ton code vit dans `app/` et `routes/`, tes RÉGLAGES dans `config/` + `.env`, la base dans `database/`, et `vendor/` se régénère avec `composer install` si tu le supprimes. `public/index.php` est la seule URL que le serveur sert physiquement — tout le reste de l\'application reste INVISIBLE du web, c\'est une sécurité de conception.' },
            { t: 'h3', h: 'La vérification qui calme (le rituel complet)' },
            { t: 'ol', items: [
              '`php -v` ≥ 8.2 et `composer --version` répondent tous les deux — sinon l\'OS est le problème, pas Laravel (erreur n°1).',
              '`composer create-project laravel/laravel boutique-awa` se termine sans rouge — `vendor/` existe.',
              '`php artisan key:generate` affiche « Application key set successfully » (et `.env` contient `APP_KEY=base64:…`).',
              '`php artisan migrate` crée les tables sans erreur de connexion (sinon : le fichier `database/database.sqlite` manque, ou `DB_CONNECTION` n\'est pas `sqlite`).',
              '`php artisan serve` tourne, et `http://127.0.0.1:8000` affiche la page d\'accueil Laravel avec son lien « Documentation ».',
              'Le terminal où tourne `serve` ne sert à RIEN d\'autre : c\'est la fenêtre du serveur. Ouvrez un SECOND terminal pour jouer avec `php artisan` — et gardez le premier ouvert.'
            ] },
            { t: 'callout', kind: 'warn', h: 'Port 8000 déjà pris (un autre serve tourne ailleurs) ? `php artisan serve --port=8080`. Un autre réflexe qui évite 90 % des mystères : quand tu modifies `.env`, REDÉMARRE le serveur (Ctrl+C puis `php artisan serve`) — le fichier n\'est relu qu\'au démarrage.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Composer est un logiciel à ouvrir, comme une application. »** Non : c\'est une COMMANDE de terminal. Tu ne « lances » pas Composer, tu lui donnes des ordres (`create-project`, `install`, `require`) — et il retourne dormir.',
              '**« `vendor/` fait partie du code, il faut le commiter. »** Non : régénéré par `composer install` — exactement comme `node_modules`. Le dépôt voyage avec `composer.json` + `composer.lock`, jamais avec le fatras.',
              '**« `php artisan serve` est LE serveur de production. »** Non : c\'est le petit serveur de DEV (mono-processus, PHP embarqué). En production, on passe par Nginx/Apache + PHP-FPM — tu n\'y penseras qu\'au déploiement.',
              '**« `.env` peut être poussé sur GitHub « vite fait ». »** JAMAIS : il contient la clé de chiffrement et les identifiants de base. C\'est le premier fichier du `.gitignore`. La bonne pratique : committe `.env.example` (vide des secrets), garde le vrai pour toi.',
              '**« key:generate est optionnel. »** Non : sans APP_KEY, les sessions et les cookies chiffrés plantent (« No application encryption key ») — l\'erreur n°2 ci-dessous, garantie sur tout nouveau clone.'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux blocages avant tout code : le terminal qui ne connaît pas PHP (le PATH de l\'OS n\'a pas été mis à jour), et le projet clone parfaitement cloné… sauf la clé d\'application jamais régénérée.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Ce chantier est le point de départ physique de tout le module : les dossiers que tu viens de voir apparaître (`routes/`, `app/`, `config/`, `database/`) sont cartographiés un par un dans la fiche **Structure, cycle de vie & artisan** ; le `.env` et son rapport à `config/` fondent la fiche **Configuration** ; et `php artisan migrate` que tu as lancé « pour voir » deviendra une science dans **Migrations**. Composer, lui, a le même vocabulaire que le npm de la fiche **Installation React** — manifeste, lock, dossier jetable — : le modèle mental est déjà fait.' },
          ],
          errors: [
            {
              title: 'PHP non reconnu dans le terminal (PATH)',
              bad: 'php -v\n# →  "php" n\'est pas reconnu comme une commande interne ou externe\n# →  ou : command not found: php\n# …alors que XAMPP/Herd EST installé ! Le programme existe sur le\n# disque, Windows/macOS ne sait juste pas où le chercher.',
              good: '# 1) Windows : ajouter le dossier PHP au PATH\n#    (XAMPP : C:\\xampp\\php ; Herd le fait tout seul)\n#    Panneau de config → Variables d\'environnement → Path → Nouveau\n# 2) FERMER et ROUVRIR le terminal (obligatoire : le PATH est lu\n#    au démarrage du terminal !) puis :\nphp -v\n# → « PHP 8.3.x (cli)… » : enfin reconnu. Sur Linux/macOS, le\n# gestionnaire de paquets (apt/brew/Herd) fait ce travail pour vous.',
              why: 'Un terminal ne trouve une commande que si son dossier figure dans la variable PATH — liste d\'annuaires où chercher les exécutables. Quand PHP est installé « quelque part » (XAMPP, Herd, apt), il faut : 1) vérifier que ce dossier EST dans le PATH, 2) rouvrir le terminal (il ne relit jamais le PATH à chaud — 9 débutants sur 10 modifient la variable puis testent dans la VIEILLE fenêtre). Dernier piège de la famille : `php` et `php8.3` sont parfois deux noms différents sur Linux — `php -v` répond sur l\'un, pas l\'autre.'
            },
            {
              title: 'APP_KEY manquant (key:generate jamais lancé)',
              bad: 'git clone https://github.com/equipe/boutique-awa.git\ncd boutique-awa && composer install && php artisan serve\n# page d\'accueil OK, puis au premier login :\n# →  RuntimeException: No application encryption key has been specified.\n# …parce que `.env` n\'est PAS versionné (normal !), et que la clé\n# de CHIFFREMENT n\'a jamais été régénérée sur cette machine.',
              good: '# après CHAQUE clone, le quartet complet :\ncomposer install\ncp .env.example .env        # recrée le trousseau vide\nphp artisan key:generate    # écrit APP_KEY=base64:… dans .env\nphp artisan migrate         # prépare la base locale\nphp artisan serve           # l\'app tourne, sessions OK',
              why: 'La clé APP_KEY chiffre sessions et cookies ; sans elle, toute la mécanique d\'authentification s\'arrête net — et l\'erreur n\'apparaît qu\'au premier usage CHIFFRÉ (typiquement le login), pas à la page d\'accueil, d\'où l\'illusion « le clone marche ». `.env` n\'étant jamais versionné, CHAQUE machine (collègue, serveur, ton autre PC) doit refaire le rituel : `.env.example` copié, `key:generate`, `migrate`. C\'est d\'ailleurs exactement ce que font les kits de démarrage Laravel — le rituel n\'est pas une corvée, c\'est le contrat.'
            }
          ],
          related: ['lv-notions', 'lv-fondamentaux', 'lv-configuration', 'lv-migrations']
        },
        {
          id: 'lv-fondamentaux',
          title: 'Structure, cycle de vie & artisan',
          icon: 'account_tree',
          level: 'Débutant',
          tagline: 'Où vit chaque fichier, comment une requête traverse le framework, et la baguette magique artisan.', 
          intro: 'Avant d\'écrire la moindre route, tu as besoin d\'une carte du territoire. Laravel est un framework **opinionated** — « à opinions fortes » : il décide où vivent tes fichiers, comment s\'appellent tes classes, où passe une requête. Cette rigueur apparente est exactement ce qui rend le développement si rapide une fois la carte connue : tu ne cherches plus où mettre les choses, tu ne lis plus la documentation d\'organisation de chaque projet, tu codes. Cette fiche te donne la carte complète (et les 20 % qui servent 80 % du temps), le trajet précis d\'une requête de bout en bout, et artisan, la console qui génère tout le code de cadrage à ta place.', 
          blocks: [
            { t: 'h3', h: 'Pourquoi Laravel ose t\'imposer une structure' },
            { t: 'p', h: 'Le PHP « à la main » a un vice célèbre : chaque projet s\'organise différemment. Les contrôleurs dans `pages/`, ou dans `actions/`, ou mélangés au HTML dans chaque fichier… Rejoindre un projet existant devenait une semaine d\'archéologie. Laravel a tranché : **la structure du projet est décidée par le framework, pas par chaque développeur**. Conséquence directe : deux applications Laravel créées par deux inconnus se ressemblent comme deux étals bien tenus du marché Dantokpa — la viande est toujours au même endroit, les épices aussi. Quand tu rejoins une équipe, tu sais déjà où tout vit. Quand tu reviens sur ton propre projet six mois après, pareil. Ce que tu perds en « liberté » d\'organisation, tu le regagnes en vitesse réelle, chaque jour.' },
            { t: 'p', h: 'Cette convention a un second effet, plus technique : le framework peut **deviner**. Un modèle s\'appelle `Produit` ? La table s\'appelle `produits` — pas besoin de le déclarer. Une route s\'appelle `commandes.show` ? La vue attendue est `commandes/show.blade.php`. Chaque convention respectée est une ligne de configuration que tu n\'écris pas. C\'est le contrat silencieux de Laravel : tu respectes ses habitudes, il enlève de ton chemin tout ce qui n\'est pas ton métier.' },
            { t: 'h3', h: 'La structure du projet, dossier par dossier' },
            { t: 'table', head: ['Dossier / fichier', 'Ce qui y vit', 'Ce que TU y fais'], rows: [
              ['`app/Http/Controllers/`', 'les contrôleurs HTTP', 'ton code le plus fréquent : recevoir une requête, répondre'],
              ['`app/Models/`', 'les modèles Eloquent', 'tes tables parlées en PHP (fiches Eloquent)'],
              ['`routes/web.php`, `routes/api.php`', 'la table d\'aiguillage', 'déclarer quelle URL appelle quoi'],
              ['`resources/views/`', 'les templates Blade', 'ton HTML dynamique'],
              ['`database/migrations/`', 'le schéma de la base, en code', 'créer/faire évoluer les tables, versionné avec Git'],
              ['`config/`', 'tous les réglages (hors secrets)', 'lire via `config(\'app.name\')` — jamais modifier en prod directement'],
              ['`public/`', 'la SEULE racine visible du web', '`index.php` + assets compilés ; nginx/Apache pointe ICI'],
              ['`storage/`', 'fichiers générés : logs, uploads, cache, sessions', 'tu n\'y codes pas, tu le protèges (droits d\'écriture)'],
              ['`vendor/`', 'les dépendances Composer (Laravel inclus)', 'JAMAIS rien modifier — tout y est régénéré'],
              ['`bootstrap/app.php`', 'le câblage du framework (Laravel 11+)', 'middleware, exceptions, routes : la centrale de branchements'],
              ['`artisan`', 'la console Laravel (un fichier PHP)', '`php artisan …` : tout se pilote là']
            ]},
            { t: 'p', h: 'Retiens la règle des 80/20 : au quotidien, tu vis dans **`app/`, `routes/`, `resources/views/` et `database/`**, avec un détour régulier par `config/`. Le reste est de l\'infrastructure que tu ne toucheras qu\'en cas de besoin précis. Et note bien le rôle de `public/` : c\'est la SEULE porte d\'entrée web — tout le reste du projet (tes secrets, tes classes) est hors de portée des navigateurs. C\'est un choix de sécurité fondamental, pas un caprice.' },
            { t: 'h3', h: 'Le cycle de vie d\'une requête, de index.php à la réponse' },
            { t: 'diagram', title: 'Le voyage d\'une requête, en une image', svg: `<svg viewBox="0 0 680 250">
  <defs><marker id="lv-f1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="16" y="30" width="204" height="56" rx="12" class="dg-b"/>
  <circle cx="30" cy="30" r="9" class="dg-num"/><text x="30" y="34" class="dg-numt" text-anchor="middle">1</text>
  <text x="118" y="52" class="dg-t" text-anchor="middle">Navigateur</text>
  <text x="118" y="72" class="dg-m" text-anchor="middle">GET /boutique</text>
  <path d="M 220,58 L 236,58" class="dg-e" marker-end="url(#lv-f1)"/>
  <rect x="238" y="30" width="204" height="56" rx="12" class="dg-b"/>
  <circle cx="252" cy="30" r="9" class="dg-num"/><text x="252" y="34" class="dg-numt" text-anchor="middle">2</text>
  <text x="340" y="52" class="dg-t" text-anchor="middle">public/index.php</text>
  <text x="340" y="72" class="dg-m" text-anchor="middle">démarre le framework</text>
  <path d="M 442,58 L 458,58" class="dg-e" marker-end="url(#lv-f1)"/>
  <rect x="460" y="30" width="204" height="56" rx="12" class="dg-b"/>
  <circle cx="474" cy="30" r="9" class="dg-num"/><text x="474" y="34" class="dg-numt" text-anchor="middle">3</text>
  <text x="562" y="52" class="dg-t" text-anchor="middle">Middleware</text>
  <text x="562" y="72" class="dg-m" text-anchor="middle">session · CSRF · auth…</text>
  <path d="M 562,86 L 562,138" class="dg-e" marker-end="url(#lv-f1)"/>
  <rect x="460" y="140" width="204" height="56" rx="12" class="dg-b"/>
  <circle cx="474" cy="140" r="9" class="dg-num"/><text x="474" y="144" class="dg-numt" text-anchor="middle">4</text>
  <text x="562" y="162" class="dg-t" text-anchor="middle">Routeur</text>
  <text x="562" y="182" class="dg-m" text-anchor="middle">quelle route répond ?</text>
  <path d="M 460,168 L 444,168" class="dg-e" marker-end="url(#lv-f1)"/>
  <rect x="238" y="140" width="204" height="56" rx="12" class="dg-ba"/>
  <circle cx="252" cy="140" r="9" class="dg-num"/><text x="252" y="144" class="dg-numt" text-anchor="middle">5</text>
  <text x="340" y="162" class="dg-t" text-anchor="middle">Contrôleur + modèles</text>
  <text x="340" y="182" class="dg-m" text-anchor="middle">TON code parle à la base</text>
  <path d="M 238,168 L 222,168" class="dg-e" marker-end="url(#lv-f1)"/>
  <rect x="16" y="140" width="204" height="56" rx="12" class="dg-b"/>
  <circle cx="30" cy="140" r="9" class="dg-num"/><text x="30" y="144" class="dg-numt" text-anchor="middle">6</text>
  <text x="118" y="162" class="dg-t" text-anchor="middle">Réponse HTML / JSON</text>
  <text x="118" y="182" class="dg-m" text-anchor="middle">renvoyée au navigateur</text>
  <path d="M 118,196 L 118,232" class="dg-e dg-dash" marker-end="url(#lv-f1)"/>
  <text x="132" y="228" class="dg-m">cycle terminé — PHP s'éteint, prêt pour la requête suivante</text>
</svg>`, caption: 'Suis les numéros : c\'est le même voyage que la liste détaillée ci-dessous, étape par étape. Deux choses à retenir : **tout** passe par public/index.php (le reste du projet est invisible du web), et le framework redémarre à CHAQUE requête — c\'est le modèle « shared nothing » qu\'on déplie juste après.' },
            { t: 'ol', items: [
              '**Le frontal web** (nginx/Apache) reçoit `GET /boutique` et redirige TOUT vers `public/index.php` — le point d\'entrée unique. Aucune autre URL ne correspond à un fichier réel.',
              '**`index.php` démarre le framework** : il charge l\'autoloader de Composer (qui sait trouver chaque classe depuis `vendor/`), puis crée l\'application depuis `bootstrap/app.php`.',
              '**Le noyau HTTP (kernel) prend la requête** et la fait traverser la pile de MIDDLEWARE globaux : gestion de session, protection CSRF, cookies chiffrés… (fiche Middleware — chaque couche peut arrêter le voyage).',
              '**Le routeur cherche la correspondance** dans `routes/web.php` : URL + verbe HTTP → un contrôleur et une méthode. La moindre erreur 404/405 naît ICI.',
              '**Ton code s\'exécute** : le contrôleur parle aux modèles, prépare une réponse (vue Blade, JSON, redirection…). Les middleware ont une seconde chance de transformer la réponse au retour — la fameuse image de l\'**oignon**.',
              '**La réponse repart** par le même tuyau : le kernel l\'envoie au client, puis le framework « termine » proprement (fermeture de session, événements de fin). Un processus PHP MEUR après chaque réponse — c\'est le modèle « shared nothing », à bien comprendre : rien ne survit d\'une requête à l\'autre hors base, cache et session.'
            ]},
            { t: 'callout', kind: 'info', h: 'Sous le capot : le talon d\'Achille historique de PHP (tout redémarrer à chaque requête) devient une force avec Laravel : pas d\'état global pourri entre deux appels, pas de fuite mémoire qui s\'accumule. Les outils modernes (Octane) réutilisent des workers pour la vitesse, mais le MODÈLE MENTAL reste « chaque requête est neuve » — écris ton code comme si l\'application redémarrait à chaque fois, et tu ne te tromperas jamais.' },
            { t: 'h3', h: 'artisan : la console qui écrit le code à ta place' },
            { t: 'p', h: 'Tout framework sérieux a un talon : le « boilerplate », ce code de cadrage répétitif (en-têtes de classe, namespaces, squelettes vides). artisan l\'efface : chaque `make:*` génère un fichier PARFAITEMENT conforme aux conventions — bon dossier, bon namespace, bonne signature — en une seconde, sans faute de frappe. Tu gardes ton énergie pour la logique métier, pas pour retenir si les contrôleurs vont au singulier ou au pluriel.' },
            { t: 'code', lang: 'php', label: 'Les commandes du premier mois', code:
'php artisan serve                        # serveur de dev sur http://127.0.0.1:8000\nphp artisan route:list                   # TOUTES les routes, d\'un coup d\'œil\n\n# Les générateurs — les fichiers naissent au bon endroit :\nphp artisan make:model Produit -mcr\n#   -m : migration   -c : contrôleur   -r : contrôleur RESOURCE (7 méthodes CRUD)\n\nphp artisan make:controller PanierController --resource\nphp artisan make:request StoreProduitRequest    # validation dédiée (fiche Validation)\nphp artisan make:migration create_produits_table\nphp artisan migrate                             # jouer les migrations en attente\nphp artisan migrate:fresh --seed                # TOUT reconstruire + données de test\nphp artisan tinker                              # console PHP interactive dans ton app' },
            { t: 'callout', kind: 'tip', h: '`php artisan` seul liste TOUTES les commandes, et `php artisan help make:model` détaille chaque option. L\'habitude à prendre : avant de créer un fichier à la main, demande-toi s\'il existe un `make:` — il existe presque toujours (contrôleur, modèle, migration, request, policy, job, listener, test, resource, middleware…).' },
            { t: 'h3', h: 'tinker : le laboratoire intégré' },
            { t: 'code', lang: 'php', code:
'php artisan tinker\n\n>>> App\\Models\\Produit::count();\n= 12\n\n>>> $p = App\\Models\\Produit::create([\n...     \'nom\' => \'Gari premium 50 kg\',\n...     \'prix\' => 21000,\n... ]);\n= App\\Models\\Produit { id: 13, nom: "Gari premium 50 kg", prix: 21000 }\n\n>>> $p->prix * 3;\n= 63000\n\n// Tester une requête Eloquent, un scope, une relation — sans écrire\n// de route, sans navigateur. C\'est là que tu APPRENDS ton modèle.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Le framework est une prison, je ne peux rien organiser à ma façon. »** Faux — c\'est une convention DEFAUT. Tu peux créer tes propres dossiers (et tu le feras : `app/Services`, `app/Actions`…). La convention couvre ce qui n\'a pas de raison d\'être réinventé ; ton originalité s\'exprime dans le métier, pas dans le choix d\'un dossier.',
              '**« public/ est un dossier comme un autre. »** Non : c\'est la SEULE racine exposée au web. Pointer nginx/Apache ailleurs (ou activer le listing de dossiers) expose tes `.env` et ton code — la première faille des tutos bâclés. Tout le reste du projet doit rester INVISIBLE du web.',
              '**« storage/app est l\'endroit où servir mes images publiques. »** Par défaut `storage/app` n\'est PAS public. Pour les fichiers publics : `storage:link` crée un lien symbolique `public/storage` → `storage/app/public`. Les fichiers privés (factures) restent hors de portée et passent par un contrôleur qui vérifie les droits.',
              '**« artisan est juste un raccourci pour les flemmards. »** artisan applique les CONVENTIONS à ta place : bon namespace, bon emplacement, signatures exactes. Le fichier généré est identique à celui que tu aurais écrit si tu connaissais parfaitement le framework — sauf qu\'il est là maintenant, sans faute.',
              '**« Une application PHP garde son état entre deux requêtes. »** Non : shared nothing. Chaque requête repart de zéro — tout état persistant vit dans la base, le cache, la session ou la queue. `static::$compteur++` ne compte rien du tout d\'utile.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux réflexes dangereux qui sont en fait des apprentissages manqués : toucher à ce qui ne t\'appartient pas, et oublier que la base suit le code.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche d\'ouverture pose le socle sur lequel TOUT le module s\'appuie, et tu vas le croiser à chaque chapitre suivant : le cycle de vie « chaque requête démarre une application neuve » explique pourquoi la fiche Configuration exige `config:cache` pour figer tes réglages, pourquoi la fiche Middleware peut décrire la requête comme un tunnel de couches, et pourquoi la fiche Queues programme un worker comme « UNE requête qui dure ». Les dossiers survolés ici deviennent des chapitres entiers : `routes/` ouvre le cycle HTTP, `database/migrations` versionnera ton schéma, `app/Models` accueillera Eloquent, `tests/` fermera la marche. Et `artisan`, rencontré aujourd\'hui, restera ton compagnon de chaque fiche : il génère les contrôleurs, lance les migrations, monte les workers et exécute les tests.' }
          ],
          errors: [
            { title: 'Modifier des fichiers dans vendor/', lang: 'php', bad:
'// vendor/laravel/framework/src/Illuminate/Routing/Router.php\n// → tu ajoutes un var_dump() "pour déboguer\", ou tu modifies\n//   une méthode "juste pour mon cas\".\n// ✗ Ça marche 5 minutes… puis composer update efface TOUT.\n//   Pire : le serveur de prod ne verra JAMAIS ta modif', good:
'// 1) Déboguer : lis le code de vendor (c\'est une mine,\n//    tu peux y mettre des breakpoints via Xdebug MAIS les retirer).\n// 2) Étendre : Laravel est FAIT pour être étendu, pas modifié —\n//    hérite de la classe, crée ton propre middleware/macro,\n//    ou surcharge via le container (fiches Middleware & Contrôleurs).\n// Règle absolue : vendor/ est en LECTURE SEULE, comme la\n// bibliothèque municipale — on consulte, on n\'écrit pas dedans.', why: '`vendor/` est ENTIÈREMENT régénéré par Composer (`composer install` sur le serveur efface et recrée tout, en ne suivant que `composer.lock`). Toute modification y est donc jetable par nature — et invisible pour les autres environnements, ce qui crée le pire des bugs : « ça marche sur ma machine ». Laravel anticipe le besoin de personnalisation par des mécanismes d\'EXTENSION (héritage, macros, bindings du container, événements) : si tu ressens le besoin d\'éditer vendor, c\'est qu\'il existe une porte officielle que tu n\'as pas encore trouvée. Cherche-la — elle est dans ces fiches.' },
            { title: 'Oublier migrate après un git pull', lang: 'php', bad:
'$ git pull origin main\n# → le collègue a ajouté : migration add_colonne_stock_to_produits\n$ php artisan serve\n# … ton catalogue plante : SQLSTATE[42S22] Column not found: stock\n// ✗ « Son code est cassé ! » — non, TA BASE est en retard', good:
'$ git pull origin main\n$ composer install          # les dépendances ont pu changer\n$ php artisan migrate       # la base suit le code — les trois vont ENSEMBLE\n\n# Réflexe d\'équipe (à coller dans ton flux) :\n#   après CHAQUE pull/checkout : composer install + php artisan migrate\n# Et artisan tient compte du statut : migrate ne rejoue que\n# les migrations NON exécutées — zéro risque de doublon.', why: 'La migration est `git` pour ta base de données : le code versions et le schéma doivent avancer en parfaite synchronisation (c\'est tout le sujet de la fiche Migrations). Laravel sait exactement quelles migrations ont été exécutées (table `migrations`), donc `migrate` est toujours sûr — il ne fait que rattraper le retard. L\'erreur n\'a rien de honteux, elle est UNIVERSELLE : chaque équipe finit par automatiser le réflexe (hook post-merge, script make dev, ou note dans le README) plutôt que de compter sur la mémoire.' }
          ],
          related: ['lv-configuration', 'lv-routing', 'lv-migrations', 'lv-tests']
        },
        {
          id: 'lv-configuration',
          title: 'Configuration & environnement',
          icon: 'settings',
          level: 'Débutant',
          tagline: '.env, fichiers config, config:cache : la séparation propre entre code et réglages.', 
          intro: 'Ton application ne fait pas le même métier sur ton PC et sur le serveur : base locale contre base de production, fausses_notifications contre vrais SMS, debug bavard contre pages d\'erreur sobres. La réponse de Laravel est le couple `.env` / `config/` — une séparation NETTE entre ce qui change D\'ENVIRONNEMENT et ce qui décrit l\'application. Maîtriser ce couple, c\'est éviter les deux catastrophes classiques : le secret poussé sur GitHub, et l\'app qui « ne prend pas en compte » les réglages fraîchement modifiés. On va démonter la mécanique exacte, parce que 90 % des pannes de configuration viennent d\'UNE incompréhension précise que tu n\'auras plus.', 
          blocks: [
            { t: 'h3', h: 'Pourquoi séparer le CODE des RÉGLAGES' },
            { t: 'p', h: 'Imagine le code source de ta boutique Awa avec la connexion à la base écrite EN DUR dans une classe : hôte MySQL de la prod, login, mot de passe. Trois problèmes immédiats : ton PC de dev ne peut plus tourner (il pointe sur la prod — et tu risques de casser les vraies données en testant) ; ton mot de passe part sur GitHub avec le premier `git push` (et les robots qui écument les dépôts publics trouvent les mots de passe MySQL en quelques minutes) ; et chaque serveur (dev, staging, prod) exige des valeurs différentes, donc tu réécrirais le code à chaque déploiement. La solution industrie (les « 12 factors ») : le CODE est identique partout, et ce qui change est INJECTÉ par l\'environnement. Laravel l\'implémente avec `.env` par environnement + des fichiers `config/` qui ne contiennent QUE de la structure, jamais de secret.' },
            { t: 'h3', h: 'Le couple .env / config : qui lit quoi' },
            { t: 'p', h: 'Le flux exact à graver : au démarrage, Laravel lit le fichier `.env` (non versionné, propre à chaque machine) et injecte ses valeurs dans les variables d\'environnement PHP. Les fichiers de `config/` — versionnés, partagés — piochent dans ces variables avec `env(\'CLE\')` et leur donnent une FORME (tableaux, valeurs par défaut, libellés stables). TON code, lui, ne lit JAMAIS `.env` directement : il passe par `config(\'services.mtn_momo.secret\')`. Trois acteurs, trois rôles : `.env` = les valeurs de CETTE machine ; `config/` = la cartouche de toutes les options de l\'app ; `config()` = l\'unique porte de lecture dans ton code.' },
            { t: 'code', lang: 'php', label: '.env (cette machine uniquement — JAMAIS commité)', code:
'APP_NAME="Boutique Awa"\nAPP_ENV=local          # local sur ton PC, production sur le serveur\nAPP_DEBUG=true         # true en dev, ABSOLUMENT false en prod\nAPP_URL=http://localhost:8000\n\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_DATABASE=boutique_dev\nDB_USERNAME=root\n\nMTN_MOMO_API_KEY=sk_test_51AbC…     # le secret vit ICI, hors git' },
            { t: 'code', lang: 'php', label: 'config/services.php — le formateur de valeurs', code:
'<?php\n\nreturn [\n\n    \'mtn_momo\' => [\n        \'api_key\' => env(\'MTN_MOMO_API_KEY\'),        // pioché dans .env\n        \'base_url\' => env(\'MTN_MOMO_URL\', \'https://sandbox.momodeveloper.mtn.com\'),\n        \'timeout\' => 15,\n    ],\n\n];\n\n// Ton code métier lit UNIQUEMENT ceci :\n// config(\'services.mtn_momo.api_key\')   → la valeur de CETTE machine\n// config(\'services.mtn_momo.timeout\')  → 15 (même sans .env, le défaut tient)' },
            { t: 'diagram', title: 'Le voyage d\'une valeur : du .env jusqu\'à ton code', svg: `<svg viewBox="0 0 680 190">
  <defs><marker id="lv-c1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="30" y="40" width="170" height="56" rx="12" class="dg-b"/>
  <text x="115" y="62" class="dg-t" text-anchor="middle">.env</text>
  <text x="115" y="82" class="dg-m" text-anchor="middle">valeurs de CETTE machine</text>
  <path d="M 200,68 L 253,68" class="dg-e" marker-end="url(#lv-c1)"/>
  <circle cx="226" cy="68" r="9" class="dg-num"/><text x="226" y="72" class="dg-numt" text-anchor="middle">1</text>
  <rect x="255" y="40" width="190" height="56" rx="12" class="dg-b"/>
  <text x="350" y="62" class="dg-t" text-anchor="middle">config/services.php</text>
  <text x="350" y="82" class="dg-m" text-anchor="middle">met en forme via env(…)</text>
  <path d="M 445,68 L 508,68" class="dg-e" marker-end="url(#lv-c1)"/>
  <circle cx="476" cy="68" r="9" class="dg-num"/><text x="476" y="72" class="dg-numt" text-anchor="middle">2</text>
  <rect x="510" y="40" width="150" height="56" rx="12" class="dg-ba"/>
  <text x="585" y="62" class="dg-t" text-anchor="middle">Ton code</text>
  <text x="585" y="82" class="dg-m" text-anchor="middle">config(…) — partout</text>
  <rect x="30" y="112" width="630" height="58" rx="12" class="dg-zone"/>
  <text x="46" y="134" class="dg-m">En production, config:cache fige le tout dans UN fichier plat : le .env n'est PLUS lu.</text>
  <text x="46" y="154" class="dg-m">Conséquence : env() appelé hors de config/ retourne null en prod — le piège vu juste après.</text>
</svg>`, caption: 'Trois acteurs, trois rôles : .env stocke (jamais commité), config/ structure (versionné), config() lit (ton code). La flèche ne va JAMAIS dans l\'autre sens : ton code ne lit pas .env directement.' },
            { t: 'h3', h: 'Sous le capot : config:cache, et pourquoi env() hors de config/ te piégera' },
            { t: 'p', h: 'En production, on lance `php artisan config:cache` : Laravel lit UNE FOIS tous les fichiers `config/`, les aplatit en un seul PHP ultra-rapide à charger, et écrit le résultat dans `bootstrap/cache/config.php`. À partir de ce moment — retiens bien — **le fichier `.env` n\'est tout simplement PLUS lu**. Conséquence qui a fait souffrir des générations de débutants : si ton code appelle `env(\'MTN_MOMO_API_KEY\')` directement (hors `config/`), il obtient `null` en production, alors que tout marchait en local. Le crash est silencieux, incompréhensible… et disparaît dès que tu remplaces par `config(\'services.mtn_momo.api_key\')` : la valeur était bien dans le cache, c\'est la porte d\'entrée qui était fausse.' },
            { t: 'callout', kind: 'warn', h: 'La règle d\'or en une phrase : **`env()` n\'a le droit de cité QUE dans les fichiers de `config/`** — ailleurs, uniquement `config()`. Et réciproquement, après chaque changement de config en production : `php artisan config:cache` pour régénérer le cache, sinon l\'ancienne version continue de servir.' },
            { t: 'h3', h: 'Les commandes à connaître par cœur' },
            { t: 'code', lang: 'php', code:
'php artisan about            # radiographie de l\'app : version, env, cache, drivers\nphp artisan config:cache     # PRODUCTION : fige les réglages (rapide, sûr)\nphp artisan config:clear     # après changement : vide le cache pour le régénérer\nphp artisan key:generate     # régénère APP_KEY (ATTENTION : voir ci-dessous)\n\n# À l\'installation d\'un projet existant :\ncp .env.example .env         # le squelette de réglages versionné, SANS secrets\nphp artisan key:generate     # écrit APP_KEY=base64:… dans TON .env, une fois' },
            { t: 'p', h: '`APP_KEY` mérite une minute : c\'est la clé maîtresse avec laquelle Laravel CHIFFRE les cookies, les sessions et les données que tu chiffres avec `Crypt::`. Perds-la (ou régénère-la par erreur avec `key:generate` en prod) et tous les cookies chiffrés deviennent illisibles : sessions invalidées, utilisateurs déconnectés, données `Crypt::encrypt()` perdues à jamais. En dev, régénère tant que tu veux ; en production, on sauvegarde la clé autant que la base.' },
            { t: 'h3', h: 'Les environnements : local, staging, production' },
            { t: 'ul', items: [
              '**`APP_ENV=local`** : debug bavard (stack traces complètes), mails détournés vers Mailpit/plutôt que les clients, caches désactivés — tout pour voir clair pendant le dev.',
              '**`APP_ENV=staging`** : la répétition générale — même configuration que la prod, données jetables, serveur identique. La dernière ligne de défense avant les vrais clients.',
              '**`APP_ENV=production`** : `APP_DEBUG=false` NON NÉGOCIABLE — une stack trace en prod affiche requêtes SQL, chemins de fichiers, variables d\'environnement : c\'est une faille de sécurité à ciel ouvert. Config et routes cachés, erreurs loguées et page 500 sobre.',
              'Le même COMMIT passe de l\'un à l\'autre : seul le `.env` change — c\'est précisément le but de toute cette architecture. Si tu dois toucher au code pour déployer, la séparation a été cassée quelque part.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« .env est un fichier de configuration comme les autres. »** Non : `.env` est SPÉCIFIQUE à une machine et reste hors de git (il est dans le `.gitignore` de base). Le fichier PARTAGÉ est `.env.example` — le squelette sans secrets qui dit aux collègues quelles clés remplir.',
              '**« Je modifie .env, l\'application devrait changer aussitôt. »** Pas si `config:cache` a été joué : le cache est figé, `.env` n\'est plus consulté. D\'où le réflexe : en prod, TOUJOURS `config:clear` (ou refaire `config:cache`) après un changement.',
              '**« env() est la manière normale de lire un réglage. »** Seulement dans `config/`. Dans le code métier, `env()` fonctionne en local et casse en prod cachée — `config()` est la seule lecture fiable partout.',
              '**« APP_DEBUG=true, ce n\'est pas grave, ça aide les clients. »** En production c\'est une fuite de sécurité : stack traces avec SQL, chemins serveur, parfois secrets d\'environnement. Le client veut une page d\'erreur gentille ; la trace, toi seul la lis dans les LOGS.',
              '**« Les fichiers config/ contiennent mes mots de passe. »** Par construction, non : ils référencent via `env()`. Un `config/database.php` ne contient aucun secret — c\'est pour ça qu\'il est versionné sans danger.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les deux confusions les plus fréquentes — et leurs versions propres.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Retour immédiat sur la fiche Fondamentaux : si toute l\'application redémarre à chaque requête, relire cinquante fichiers de config à chaque démarrage serait une ruine — voilà pourquoi `config:cache` existe, et voilà pourquoi un `.env` modifié « sans effet » est le premier piège du module. Le réglage `APP_DEBUG` rencontré ici pilote directement le visage des erreurs de la fiche Erreurs : verbeux en local, muet en production, et ce n\'est pas un détail. Enfin, quand tu arriveras à la fiche Authentification, ses guards et ses sessions se règleront dans `config/auth.php` et `config/session.php` — mêmes règles du jeu qu\'ici : `env()` n\'a de droit de cité que dans `config/`.' }
          ],
          errors: [
            { title: 'Modifier le .env et ne rien voir changer', lang: 'php', bad:
'# En production, tu corriges une valeur :\nMTN_MOMO_URL=https://api.mtn.com\n# … tu testes : toujours l\'ancienne URL. Tu vides le\n# navigateur, tu reboot le PC du cybercafé — rien.\n// ✗ la prod a un config:cache actif : .env n\'est PLUS lu', good:
'# En production, APRÈS chaque changement de config :\n$ php artisan config:clear     # ou directement :\n$ php artisan config:cache     # (clear + rebuild en une passe)\n\n# Le cache est RECONSTRUIT avec tes nouvelles valeurs.\n# En local, pas de cache → le changement est immédiat ;\n# c\'est cette asymétrie qui fait croire à un bug.', why: '`config:cache` existe pour la performance (un seul fichier PHP au lieu de parser `.env` à chaque requête), et il fige INTENTIONNELLEMENT les réglages — c\'est le prix de la vitesse en prod. Le problème n\'est donc pas le cache mais l\'oubli de le régénérer : la mécanique sous le capot explique précisément le symptôme « mes changements ne passent pas ». Installe le réflexe : déploiement = `git pull` → `composer install` → `migrate` → `config:cache` (les quatre, toujours ensemble).' },
            { title: 'env() utilisé dans le code métier', lang: 'php', bad:
'class MoMoService {\n    public function payer($montant) {\n        $cle = env(\'MTN_MOMO_API_KEY\');   // ✗ OK en local…\n        // NULL en production (config cachée) → paiements\n        // silencieusement KO, erreurs 401 incompréhensibles\n    }\n}', good:
'// config/services.php :\n\'mtn_momo\' => [\n    \'api_key\' => env(\'MTN_MOMO_API_KEY\'),\n],\n\n// app/Services/MoMoService.php :\nclass MoMoService {\n    public function payer($montant) {\n        $cle = config(\'services.mtn_momo.api_key\');   // ✓ fiable partout :\n        // lue depuis .env en local, depuis le CACHE en prod\n    }\n}', why: 'C\'est l\'envers exact de la carte d\'à côté : `config:cache` rend `.env` invisible, donc `env()` hors de `config/` retourne `null` en production — les pires pannes sont celles qui ne se produisent PAS en local. La règle est absolue en une ligne : `env()` uniquement dans `config/*.php`, `config()` partout ailleurs. Astuce pro : en testant ton déploiement en staging (avec `config:cache` actif), tu découvres ces erreurs AVANT la prod — une raison de plus de toujours répéter dans des conditions identiques.' }
          ],
          related: ['lv-fondamentaux', 'lv-erreurs', 'lv-authentification']
        }
      ]
    },
    /* ==================== 2. LE CYCLE HTTP ==================== */
    {
      id: 'cycle-http',
      name: 'Le cycle HTTP',
      icon: 'route',
      fiches: [
        {
          id: 'lv-routing',
          title: 'Routing',
          icon: 'route',
          level: 'Débutant',
          tagline: 'Routes web/API, paramètres, groupes, nommage : la table d\'aiguillage de ton application.', 
          intro: 'En PHP classique, l\'URL EST le système de fichiers : `/pages/produit.php?id=4` expose ton organisation interne à tout le monde. Le routeur inverse la relation : **l\'URL est un contrat public, et le code qui y répond est libre d\'habiter où il veut**. Cette fiche couvre la mécanique complète — déclarer, paramétrer, nommer, grouper — jusqu\'au détail qui distingue un amateur d\'un pro : le route model binding, où Laravel va chercher le modèle en base PENDANT l\'aiguillage. Maîtriser le routing, c\'est maîtriser la frontière de ton application : tout ce qui arrive frappe d\'abord cette porte.', 
          blocks: [
            { t: 'h3', h: 'Le problème : pourquoi une table d\'aiguillage' },
            { t: 'p', h: 'Sans routeur, chaque URL publique correspond à un FICHIER à un emplacement FIXE. Trois douleurs sans fin : renommer ou déplacer un fichier casse tous les liens du site (et ceux des clients) ; l\'URL `/commande/valider.php?montant=4500` révèle ta technologie et ta structure (une invitation pour qui cherche des failles) ; et tu ne peux pas avoir la BELLE adresse `/boutique/gari-premium` sans créer physiquement ce chemin. Le routeur découple : **l\'URL publique est une promesse, ton organisation interne un détail**. Tu déclares « `/boutique` répondît `CatalogueController@index` » — et demain tu peux réorganiser `app/` entièrement sans qu\'aucun client ne s\'en aperçoive.' },
            { t: 'h3', h: 'Déclarer une route : le contrat minimal' },
            { t: 'code', lang: 'php', label: 'routes/web.php', code:
'use Illuminate\\Support\\Facades\\Route;\nuse App\\Http\\Controllers\\CatalogueController;\n\n// FORME MINIMALE (didactique) — une closure directement dans la route :\nRoute::get(\'/bonjour\', function () {\n    return \'Bienvenue à la Boutique Awa\';\n});\n\n// FORME RÉELLE — le contrôleur : la route AIGUILLE, ne TRAVAILLE pas\nRoute::get(\'/boutique\', [CatalogueController::class, \'index\']);\nRoute::post(\'/boutique/panier\', [PanierController::class, \'ajouter\']);\n\n// Voir TOUTE la table d\'aiguillage :\n// $ php artisan route:list' },
            { t: 'diagram', title: 'Comment le routeur choisit : verbe + URL, première ligne qui matche', svg: `<svg viewBox="0 0 680 240">
  <defs><marker id="lv-r1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="88" width="180" height="56" rx="12" class="dg-b"/>
  <text x="110" y="110" class="dg-t" text-anchor="middle">Requête entrante</text>
  <text x="110" y="130" class="dg-m" text-anchor="middle">GET /boutique/gari-premium</text>
  <rect x="254" y="16" width="230" height="210" rx="14" class="dg-b"/>
  <text x="369" y="40" class="dg-t" text-anchor="middle">Table des routes</text>
  <text x="369" y="58" class="dg-ms" text-anchor="middle">(parcourue dans l'ordre)</text>
  <text x="268" y="88" class="dg-m">GET /boutique</text>
  <text x="470" y="88" class="dg-ko" text-anchor="end">✗ URL ≠</text>
  <rect x="262" y="100" width="214" height="30" rx="8" class="dg-ba"/>
  <text x="268" y="120" class="dg-t">GET /boutique/{produit}</text>
  <text x="470" y="120" class="dg-ok" text-anchor="end">✓ MATCH</text>
  <text x="268" y="152" class="dg-m">POST /boutique/panier</text>
  <text x="470" y="152" class="dg-ko" text-anchor="end">✗ verbe ≠</text>
  <text x="268" y="184" class="dg-m">PUT /boutique/{produit}</text>
  <text x="470" y="184" class="dg-ko" text-anchor="end">✗ verbe ≠</text>
  <text x="369" y="212" class="dg-ms" text-anchor="middle">gagnante : /boutique/gari-premium</text>
  <rect x="520" y="84" width="144" height="76" rx="12" class="dg-ba"/>
  <text x="592" y="106" class="dg-t" text-anchor="middle">Contrôleur</text>
  <text x="592" y="126" class="dg-m" text-anchor="middle">CatalogueController</text>
  <text x="592" y="144" class="dg-ms" text-anchor="middle">show('gari-premium')</text>
  <path d="M 200,116 L 250,116" class="dg-e" marker-end="url(#lv-r1)"/>
  <circle cx="226" cy="116" r="9" class="dg-num"/><text x="226" y="120" class="dg-numt" text-anchor="middle">1</text>
  <path d="M 484,116 L 518,116" class="dg-e" marker-end="url(#lv-r1)"/>
  <circle cx="501" cy="116" r="9" class="dg-num"/><text x="501" y="120" class="dg-numt" text-anchor="middle">2</text>
</svg>`, caption: 'Le routeur compare la requête (verbe + URL) à CHAQUE ligne, dans l\'ordre de déclaration, et s\'arrête au premier motif qui matche — sans se demander « laquelle tu pensais ». Le paramètre {produit} capture le segment « gari-premium » et le transmet au contrôleur. C\'est pourquoi l\'ordre et les contraintes comptent tant (pièges en bas de page).' },
            { t: 'p', h: 'Les deux formes sont légales, mais tiens-toi à la règle d\'or : **une closure ne dépasse jamais trois lignes de logique**. Dès qu\'une route fait quelque chose (base de données, validation, vrai métier), elle déménage dans un contrôleur — la prochaine fiche explique pourquoi (injection de dépendances, testabilité, lisibilité). La closure garde un usage honorable : la page statique, le ping de santé, le lien temporaire.' },
            { t: 'h3', h: 'Les verbes HTTP ont un sens — utilise-les' },
            { t: 'table', head: ['Verbe', 'Intention', 'Exemple Boutique Awa'], rows: [
              ['`GET`', 'LIRE — sans effet de bord, partageable, marquable en favori', '`GET /boutique/gari-premium` : la fiche produit'],
              ['`POST`', 'CRÉER une nouvelle chose (commande, avis, cotisation)', '`POST /commandes` : valider le panier'],
              ['`PUT` / `PATCH`', 'MODIFIER une chose existante (PUT = remplacement entier, PATCH = partiel)', '`PATCH /commandes/42` : changer l\'adresse de livraison'],
              ['`DELETE`', 'SUPPRIMER', '`DELETE /avis/7` : retirer un commentaire']
            ]},
            { t: 'p', h: 'Pourquoi insister ? Parce que les verbes portent une PROMESSE technique : `GET` est relançable sans danger (le navigateur le recharge librement), alors que `POST` lui demande « faut-il renvoyer le formulaire ? ». Utiliser `GET /supprimer-produit/4` côté est non seulement une hérésie sémantique, c\'est dangereux : un lien préchargé par le navigateur ou cliqué par un robot supprime tes produits. Pour les formulaires HTML qui ne connaissent que GET/POST, Laravel fournit la convention `@method(\'DELETE\')` — le fameux « method spoofing » que tu verras dans `lv-blade`.' },
            { t: 'h3', h: 'Paramètres de route : l\'URL devient une donnée' },
            { t: 'code', lang: 'php', code:
'// {} = segment variable, capturé et transmis au contrôleur :\nRoute::get(\'/boutique/{produit}\', [CatalogueController::class, \'show\']);\n//   /boutique/gari-premium  →  show(\'gari-premium\')\n\n// Plusieurs paramètres, dans l\'ordre :\nRoute::get(\'/tontines/{tontine}/membres/{membre}\', [TontineController::class, \'membre\']);\n\n// Paramètre OPTIONNEL (avec valeur par défaut dans le contrôleur) :\nRoute::get(\'/boutique/categorie/{categorie?}\', [CatalogueController::class, \'categorie\']);\n\n// CONTRAINTES : le segment doit respecter un motif pour matcher :\nRoute::get(\'/produits/{produit}\', …)->whereNumber(\'produit\');           // chiffres only\nRoute::get(\'/archives/{annee}/{mois}\', …)\n    ->where([\'annee\' => \'[0-9]{4}\', \'mois\' => \'0?[1-9]|1[0-2]\']);' },
            { t: 'h3', h: 'Nommer les routes : la corde de sécurité' },
            { t: 'code', lang: 'php', code:
'Route::get(\'/boutique/{produit}\', [CatalogueController::class, \'show\'])\n    ->name(\'produits.show\');     // → le NOM, stable, indépendant de l\'URL\n\n// Dans Blade et le code : JAMAIS l\'URL en dur, TOUJOURS le nom\n<a href=\"{{ route(\'produits.show\', [\'produit\' => $p->slug]) }}\">\n    {{ $p->nom }}\n</a>\n// → /boutique/gari-premium\n\n// Demain, l\'URL change ? /boutique → /catalogue : UNE ligne modifiée,\n// les 300 liens du site suivent automatiquement. C\'est ÇA, nommer.\n\n// Et la redirection, même combat :\nreturn redirect()->route(\'commandes.confirmation\', [\'commande\' => $commande]);' },
            { t: 'h3', h: 'Groupes : préfixer, nommer, protéger en une passe' },
            { t: 'code', lang: 'php', code:
'// Un espace admin : même préfixe d\'URL, même préfixe de nom, même\n// contrôle d\'accès — déclarés UNE SEULE FOIS pour 12 routes :\nRoute::prefix(\'admin\')\n    ->name(\'admin.\')\n    ->middleware(\'auth\')                        // tout le groupe exige le login\n    ->group(function () {\n        Route::get(\'/produits\', [AdminProduitController::class, \'index\'])\n            ->name(\'produits.index\');          // → /admin/produits, nom « admin.produits.index »\n        Route::get(\'/commandes\', [AdminCommandeController::class, \'index\'])\n            ->name(\'commandes.index\');\n        // … chaque route hérite DU GROUPE : rien à répéter,\n        // rien à oublier (le jour où auth manque sur UNE route…)\n    });' },
            { t: 'h3', h: 'Le route model binding : Laravel devine le modèle' },
            { t: 'p', h: 'Voici la finesse qui vend le framework. Une route `/produits/{produit}` reçoit un identifiant (id ou slug). Ton réflexe honnête : `$produit = Produit::findOrFail($id)` en première ligne du contrôleur. Le binding fait cette recherche PENDANT l\'aiguillage : si le paramètre de route s\'appelle `{produit}` et que la méthode type-hint `Produit $produit`, Laravel injecte le modèle TROUVÉ — et répond 404 tout seul s\'il n\'existe pas. Ta première ligne disparaît ; le contrôleur reçoit un objet prêt à l\'emploi, garanti existant.' },
            { t: 'code', lang: 'php', code:
'// Route : nom du paramètre = nom de la variable (c\'est LA convention)\nRoute::get(\'/produits/{produit}\', [ProduitController::class, \'show\']);\n\npublic function show(Produit $produit)\n{\n    // $produit est DÉJÀ l\'objet trouvé (findOrFail automatique) :\n    return view(\'produits.show\', [\'produit\' => $produit]);\n}\n\n// Par défaut la recherche se fait sur l\'id. Pour utiliser le slug :\n// public function getRouteKeyName() { return \'slug\'; }   // dans le modèle' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Les routes sont testées une fois par requête. »** La table est parcourue DANS L\'ORDRE de déclaration et le PREMIER motif qui matche gagne. `Route::get(\'/produits/{produit}\', …)` déclarée AVANT `/produits/nouveau` avale la seconde — le mot « nouveau » matche `{produit}`. Règle : spécifique AVANT générique, ou contraintes sur le joker.',
              '**« {produit} capture n\'importe quoi sauf si je le précise. »** Sans contrainte, oui : lettres, slugs, nombres. Si ton contrôleur attend un id numérique et reçoit « nouveau », la 404 du binding te sauve — mais une route non liée à un modèle plantera plus loin. Contrains dès que le motif est connu.',
              '**« web.php et api.php, c\'est pareil. »** Non : `routes/api.php` monte automatiquement sous le préfixe `/api`, SANS session ni CSRF (stateless), avec ses propres middleware. Une appli peut vivre sans api.php (tout dans web) ; mais dès qu\'un front JavaScript consomme tes données, la frontière compte.',
              '**« Name() est un confort pour gens maniaques. »** C\'est un CONTRAT de stabilité : le jour où l\'URL change (refonte d\'architecture, migration /boutique → /catalogue), tous les liens générés par `route()` restent justes. L\'URL en dur, elle, casse en silence, page par page.',
              '**« Le binding fait de la magie. »** Non : une convention + du code explicite. Nom du paramètre = nom de la variable, type-hint du modèle = la table interrogée, clé = `id` sauf si `getRouteKeyName()` dit autre chose. Quand ça ne marche pas, c\'est presque toujours une de ces trois conventions qui n\'est pas respectée.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le classement des routes et les contraintes : deux pièges mécaniques, une seule leçon — le routeur est naïf, il donne raison au premier motif qui matche.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu tiens l\'aiguillage ; la suite logique, la fiche Contrôleurs, montre à QUOI le routeur délègue — une route décide QUI prend la main, le contrôleur mène le travail. Le `->middleware("auth")` posé sur tes groupes sera disséqué couche par couche dans la fiche Middleware, et les paramètres contraints (`->whereNumber("produit")`) forment la première douane — la douane complète, avec sa quarantaine de règles, c\'est la fiche Validation. Garde enfin sous le coude les noms de route : `route("produits.show", $produit)` servira aussi bien dans Blade que dans les tests, et quand tu publieras l\'API de la Boutique Awa sous le préfixe `/api`, la fiche API Resources uniformisera ce que ces routes répondent.' }
          ],
          errors: [
            { title: 'La route attrapée par le mauvais joker', lang: 'php', bad:
'Route::get(\'/produits/{produit}\', [ProduitController::class, \'show\']);\nRoute::get(\'/produits/nouveau\', [ProduitController::class, \'create\']);\n\n// GET /produits/nouveau → show(\'nouveau\') — CRASH typique car {produit} MATCHE\n//   « nouveau » et qu\'il est déclaré EN PREMIER. Le formulaire de\n//   création n\'est jamais atteint ; on tombe sur la fiche\n//   d\'un produit nommé… « nouveau » (404 si binding).', good:
'// Solution 1 : le spécifique AVANT le générique\nRoute::get(\'/produits/nouveau\', [ProduitController::class, \'create\']);\nRoute::get(\'/produits/{produit}\', [ProduitController::class, \'show\']);\n\n// Solution 2 (mieux, si binding sur id) : CONTRAINDRE le joker\nRoute::get(\'/produits/{produit}\', [ProduitController::class, \'show\'])\n    ->whereNumber(\'produit\');\n// « nouveau » ne matche plus le motif → la route suivante peut gagner.\n// Avec du slug : ->where(\'produit\', \'[a-z0-9-]+\') garde la création libre', why: 'Le routeur de Laravel est délibérément simple et rapide : il parcourt la table dans l\'ordre de déclaration et s\'arrête au PREMIER motif qui matche — sans intelligence du « tu voulais probablement dire… ». Toute la responsabilité est chez toi, et elle tient en deux réflexes : déclarer les URLs LITTÉRALES avant les jokers, et contraindre les jokers dès que le motif est connu (`whereNumber`, expressions régulières). Un `php artisan route:list` affiché en entier révèle 90 % de ces collisions en dix secondes.' },
            { title: 'Paramètre non contraint qui avale tout', lang: 'php', bad:
'Route::get(\'/commandes/{commande}\', [CommandeController::class, \'show\']);\n\n// Sans binding, le contrôleur reçoit la CHAÎNE brute :\npublic function show($commande) {\n    $montant = $commande->montant;      // — CRASH : string → propriété\n    // « nouvelle », « annuler » : tout passe ici d\'abord\n}', good:
'Route::get(\'/commandes/{commande}\', [CommandeController::class, \'show\'])\n    ->whereNumber(\'commande\');\n\n// …et, la solution moderne : le BINDING, qui combine contrainte\n// implicite et sécurité d\'existence (404 si introuvable) :\npublic function show(Commande $commande) {\n    return view(\'commandes.show\', [\'commande\' => $commande]);   // objet garanti\n}', why: 'Un paramètre de route arrive TOUJOURS en string brute, quel que soit son aspect : les perfs du routeur viennent de ce qu\'il ne devine rien. Sans contrainte ni binding, deux risques se cumulent — le joker matche des URLs que tu réservais à autre chose (collisions), et tu manipules une chaîne comme un objet (plantage `propriété sur string`, ou injection SQL si tu la concatènes dans une requête brute). La paire contrainte + binding résout les deux d\'un coup : le motif filtre l\'URL, le modèle type-hinté garantit un objet existant.' }
          ],
          related: ['lv-controleurs', 'lv-middleware', 'lv-validation', 'lv-api-resources']
        },
        {
          id: 'lv-controleurs',
          title: 'Contrôleurs',
          icon: 'gamepad',
          level: 'Intermédiaire',
          tagline: 'Resource controllers, injection de dépendances, binding : le maître d\'orchestre HTTP — mince.', 
          intro: 'Le contrôleur est le maître d\'orchestre de ta requête HTTP : il reçoit, il coordonne, il répond — mais il ne joue d\'aucun instrument. C\'est LA règle d\'architecture de Laravel, et presque tout ce qui distingue une app maintenable d\'un bourbier en découle : le contrôleur doit rester MINCE. Cette fiche te donne la mécanique complète — les 7 méthodes resource, l\'injection de dépendances qui remplace le `new`, le binding déjà vu côté routes — et surtout le critère concret pour savoir quand du code doit déménager ailleurs.', 
          blocks: [
            { t: 'h3', h: 'Pourquoi un contrôleur plutôt qu\'une closure dans la route' },
            { t: 'p', h: 'On l\'a dit : une closure dans `routes/web.php` dégénère vite — la logique s\'y entasse, non testable, non réutilisable, impossible à organiser. Le contrôleur est une CLASSE, et cette petitesse de rien change tout : une classe peut recevoir des dépendances (l\'injection, ci-dessous), être testée isolément, regrouper les 7 actions CRUD d\'une même ressource au même endroit. Conséquence pratique : les routes deviennent une table SÈCHE et lisible — aiguillage pur — et le métier vit dans des classes nommées, que tinker, les tests et l\'IDE comprennent.' },
            { t: 'diagram', title: 'MVC : le trio qui répond à une requête (et le rôle de chacun)', svg: `<svg viewBox="0 0 680 246">
  <defs><marker id="lv-ct1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="16" y="30" width="170" height="44" rx="12" class="dg-b"/>
  <text x="101" y="48" class="dg-t" text-anchor="middle">Requête HTTP</text>
  <text x="101" y="66" class="dg-m" text-anchor="middle">GET /produits</text>
  <rect x="250" y="22" width="210" height="60" rx="12" class="dg-ba"/>
  <text x="355" y="46" class="dg-t" text-anchor="middle">CONTRÔLEUR</text>
  <text x="355" y="66" class="dg-m" text-anchor="middle">le chef d'orchestre — TON code</text>
  <path d="M 186,52 L 248,52" class="dg-e" marker-end="url(#lv-ct1)"/>
  <rect x="486" y="118" width="178" height="60" rx="12" class="dg-b"/>
  <text x="575" y="142" class="dg-t" text-anchor="middle">MODÈLE</text>
  <text x="575" y="162" class="dg-m" text-anchor="middle">les données (Eloquent)</text>
  <rect x="16" y="118" width="178" height="60" rx="12" class="dg-b"/>
  <text x="105" y="142" class="dg-t" text-anchor="middle">VUE</text>
  <text x="105" y="162" class="dg-m" text-anchor="middle">l'affichage (Blade)</text>
  <rect x="486" y="196" width="178" height="36" rx="10" class="dg-b"/>
  <text x="575" y="219" class="dg-m" text-anchor="middle">base de données</text>
  <path d="M 462,68 L 558,112" class="dg-e" marker-end="url(#lv-ct1)"/>
  <text x="513" y="84" class="dg-ms" text-anchor="middle">demande les données</text>
  <path d="M 558,128 L 466,86" class="dg-e" marker-end="url(#lv-ct1)"/>
  <text x="515" y="118" class="dg-ms" text-anchor="middle">résultats</text>
  <path d="M 575,178 L 575,194" class="dg-e" marker-end="url(#lv-ct1)"/>
  <text x="586" y="190" class="dg-ms">SQL</text>
  <path d="M 248,76 L 108,116" class="dg-e" marker-end="url(#lv-ct1)"/>
  <text x="176" y="88" class="dg-ms" text-anchor="middle">prépare l'affichage</text>
  <path d="M 105,178 L 105,210" class="dg-e" marker-end="url(#lv-ct1)"/>
  <text x="119" y="206" class="dg-m">réponse HTML → navigateur</text>
</svg>`, caption: '**M**odèle = les données (Eloquent parle à la base), **V**ue = l\'affichage (Blade produit le HTML), **C**ontrôleur = le chef d\'orchestre : il reçoit la requête, demande les données au modèle et décide de la réponse. Toute l\'architecture de Laravel tourne autour de ce trio — et le contrôleur reste MINCE : il coordonne, il ne calcule pas.' },
            { t: 'h3', h: 'Créer et câbler : le contrôleur resource en une commande' },
            { t: 'code', lang: 'php', code:
'php artisan make:controller ProduitController --resource\n// → app/Http/Controllers/ProduitController.php avec les 7 méthodes CRUD :\n\n//   index()    GET    /produits              liste (paginée !)\n//   create()   GET    /produits/create       formulaire de création\n//   store()    POST   /produits              enregistre le nouveau\n//   show()     GET    /produits/{produit}    fiche détail\n//   edit()     GET    /produits/{p}/edit     formulaire d\'édition\n//   update()   PUT/PATCH /produits/{p}       enregistre la modif\n//   destroy()  DELETE /produits/{p}          supprime\n\n// Le câblage en UNE ligne (routes/web.php) :\nRoute::resource(\'produits\', ProduitController::class);\n// → les 7 routes, nommées, contraintes nommées produits.index,\n//   produits.show… : php artisan route:list pour vérifier' },
            { t: 'p', h: '`Route::resource` est LE standard Laravel : quand tu vois un contrôleur « resource », tu connais déjà les 7 méthodes sans lire le fichier. Tu peux exclure ou restreindre (`->only([\'index\', \'show\'])`, `->except([\'destroy\'])`) — par exemple une ressource publique en lecture seule. Cette convention n\'est pas une prison : c\'est un vocabulaire partagé qui te fait gagner dix minutes par ressource, pour toujours.' },
            { t: 'h3', h: 'L\'injection de dépendances : tu demandes, Laravel fournit' },
            { t: 'p', h: 'Habituellement, ton code CRÉE ce dont il a besoin : `$service = new MoMoService(...)`. L\'inversion : tu DÉCLARES le besoin dans la signature de la méthode, et le **container** de Laravel le résout pour toi. Trois collisions magnifiques avec le reste du framework — la `Request` HTTP, la Form Request typée (validation automatique avant ta première ligne, fiche Validation), et le route model binding (le modèle déjà trouvé, fiche Routing) : trois besoins, trois objets livrés, zéro `new`.' },
            { t: 'code', lang: 'php', code:
'// app/Http/Controllers/ProduitController.php\n\npublic function index(Request $request)\n{\n    // $request : l\'objet HTTP complet (query, input, headers, user…)\n    $recherche = $request->query(\'q\', \'\');\n    $produits = Produit::query()\n        ->when($recherche, fn ($q) => $q->where(\'nom\', \'like\', "%$recherche%"))\n        ->paginate(20);                                 // PAGINE, jamais all()\n    return view(\'produits.index\', [\'produits\' => $produits]);\n}\n\npublic function store(StoreProduitRequest $request)   // validé AVANT d\'entrer ici\n{\n    // $request->validated() : SEULEMENT les champs validés — rien d\'autre\n    $produit = Produit::create($request->validated());\n    return redirect()->route(\'produits.show\', $produit)\n        ->with(\'succes\', \'Produit ajouté au catalogue.\');\n}\n\npublic function show(Produit $produit)                // binding : objet garanti\n{\n    return view(\'produits.show\', [\'produit\' => $produit]);\n}' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : le container lit la signature de ta méthode par réflexion (les type-hints), construit ou récupère chaque dépendance (les classes concrètes sont construites à la volée, les INTERFACES résolues via les bindings de `AppServiceProvider`), puis appelle ta méthode. L\'injection fonctionne aussi dans le CONSTRUCTEUR du contrôleur (un service partagé par toutes les méthodes) — même mécanisme.' },
            { t: 'h3', h: 'Le contrôleur à une seule action (invokable)' },
            { t: 'code', lang: 'php', code:
'php artisan make:controller GenererFactureController --invokable\n\nclass GenererFactureController extends Controller\n{\n    public function __invoke(Commande $commande)\n    {\n        // UNE action = UNE classe. La route est limpide :\n        //   Route::get(\'/commandes/{commande}/facture\', GenererFactureController::class);\n        return $commande->telechargerFacture();\n    }\n}\n\n// Quand choisir ? Une action SINGULIÈRE qui n\'appartient à aucune\n// ressource CRUD : exporter un rapport, valider un panier, envoyer\n// une newsletter. Mieux que de tordre un resource pour l\'y loger.' },
            { t: 'h3', h: 'Garder le contrôleur MINCE : la règle et le critère' },
            { t: 'p', h: 'La mission du contrôleur tient en quatre verbes : **valider** (ou recevoir une requête validée), **autoriser** (fiche Gates & Policies), **coordonner** (appeler modèles et services), **répondre** (vue, JSON, redirection). Tout le reste a une autre maison : les requêtes complexes vivent dans le modèle (scopes) ou des classes dédiées, la logique métier dans `app/Services` ou `app/Actions`, le travail lent dans un Job (fiche Queues). Le critère pratique à te poser à chaque méthode : **si tu devais réutiliser ce code ailleurs (commande artisan, autre contrôleur, listener), est-ce possible tel quel ?** Non → ce code n\'est pas du contrôleur, il déménage.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Un contrôleur doit contenir tout ce qui concerne sa ressource. »** Non : il coordonne, il ne contient pas. Un contrôleur « dieu » de 800 lignes est l\'anti-pattern le plus célèbre du framework — et le point de départ de toutes les refactoring stories.',
              '**« Les méthodes doivent retourner une vue. »** Elles retournent une RÉPONSE : `view()` pour du HTML, `redirect()->route()` après une action (jamais render direct après un POST — repostage au refresh !), un tableau ou une Resource pour du JSON automatique.',
              '**« L\'injection est réservée aux cas compliqués. »** Elle est le mode NORMAL de récupération des dépendances dans Laravel : request, modèle bound, services — écris les signatures dont ta méthode a besoin, le container fait le reste.',
              '**« find() puis vérifier null, c\'est comme findOrFail. »** `find()` retourne `null` silencieusement si l\'id n\'existe pas, et l\'appel suivant sur null explose. `findOrFail()` (ou le binding) répond 404 — le bon signal, propre, testé par le framework.',
              '**« request()->input(\'x\') est validé si le champ est dans le form. »** Le formulaire HTML n\'est qu\'une SUGGESTION : n\'importe quel client peut envoyer n\'importe quoi. Seul `$request->validated()` (depuis une Form Request) est digne de confiance — la fiche Validation détaille pourquoi `$request->all()` est un poison.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le contrôleur obèse et son symptôme frère, l\'objet null — les deux se soignent par les conventions que tu as maintenant en main.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche capitalise la précédente et prépare les cinq suivantes : le routeur (fiche Routing) t\'a remis la main, et chaque chantier laissé ouvert trouve son chapitre — `validate()` et les Form Requests prennent toute la fiche Validation, `return view(...)` s\'épanouit dans la fiche Blade, `$this->authorize(...)` devient une discipline complète dans la fiche Autorisation, et `dispatch(...)` annonce la fiche Queues. La règle « un contrôleur reste mince » n\'a de sens QUE parce que ces fiches existent : chacune prend une part du travail que tu serais tenté d\'empiler ici.' }
          ],
          errors: [
            { title: 'Le contrôleur obèse', lang: 'php', bad:
'public function store(Request $request)         // 180 lignes :\n{\n    $request->validate([/* 12 règles… */]);\n    $produit = new Produit;\n    $produit->nom = $request->nom;\n    // … upload d\'images ligne par ligne, redimension GD ici,\n    // … envoi du mail de confirmation ici,\n    // … logique de stock fournisseur ici,\n    // … construction de la réponse JSON ici\n    return response()->json([\'ok\' => true]);\n}\n// ✗ inréutilisable, illisible, intestable — et impossible à\n//   dispatcher en queue quand le traitement devient lent', good:
'public function store(StoreProduitRequest $request)\n{\n    $this->authorize(\'create\', Produit::class);          // policy\n    $produit = Produit::create($request->validated());    // mass assignment sûr\n    TraiterImagesProduit::dispatch($produit);             // job en queue\n    return redirect()->route(\'produits.show\', $produit)\n        ->with(\'succes\', \'Produit créé — images en préparation.\');\n}\n// ✓ 6 lignes. Chaque responsabilité a sa maison : request pour\n//   valider, modèle pour créer, job pour le travail lourd.', why: 'La tentation est mécanique : tout ce dont store() a besoin « est là », alors tout vit là. Le coût est invisible au début — l\'obésité se paie quand tu dois TESTER (un contrôleur de 180 lignes exige un scénario HTTP complet pour tester un calcul de stock), RÉUTILISER (la commande artisan de réimport doit tout réécrire), ou accélérer (l\'upload synchrone bloque la requête). La découpe n\'est pas du perfectionnisme : c\'est ce qui te permettra de répondre « oui, en dix minutes » quand on te demandera la même action en import de masse.' },
            { title: 'find() manuel + appel sur null', lang: 'php', bad:
'public function show($id)\n{\n    $produit = Produit::find($id);          // null si l\'id n\'existe pas\n    return view(\'produits.show\', [\n        \'nom\' => $produit->nom,             // — CRASH : « Attempt to read\n        //     property on null » — la 500 au lieu de la 404\n    ]);\n}', good:
'// Option A — explicite :\n$produit = Produit::findOrFail($id);    // 404 propre si introuvable\n\n// Option B — la meilleure : le BINDING (fiche Routing)\npublic function show(Produit $produit)\n{\n    return view(\'produits.show\', [\'produit\' => $produit]);\n}\n// → objet garanti, 404 automatique, une ligne de moins.', why: 'Une 404 est une information juste (« cette URL ne désigne rien ») ; une 500 est un aveu de panne — et elle brise le contrat HTTP en racontant « ton serveur est cassé » alors que c\'est l\'URL qui est fausse. `find()` est un outil déjà passif (retourne `null` « si tu veux gérer toi-même »), réservé aux cas où l\'absence est un scénario légitime (« cherche ce client s\'il existe déjà »). Pour toute URL paramétrée — la fiche d\'un produit, le détail d\'une commande — l\'existence est OBLIGATOIRE : `findOrFail()` ou binding, sans exception.' }
          ],
          related: ['lv-routing', 'lv-validation', 'lv-blade', 'lv-autorisation', 'lv-queues']
        },
        {
          id: 'lv-middleware',
          title: 'Middleware',
          icon: 'filter_alt',
          level: 'Intermédiaire',
          tagline: 'La pile d\'oignons : auth, CORS, et tes propres filtres HTTP en une classe.', 
          intro: 'Chaque requête qui entre dans ton application traverse une file de contrôles avant d\'atteindre ton contrôleur — et chaque réponse repasse par la même file en sens inverse. Auth, CSRF, CORS, limitation de débit : autant de questions qu\'on ne veut traiter QU\'UNE SEULE FOIS, pour toutes les routes à la fois. Le middleware est la classe qui répond à ce besoin : un filtre HTTP réutilisable, avec la question offensive « puis-je laisser passer ça ? » au centre. Cette fiche démonte la mécanique (le fameux `$next`), l\'enregistrement moderne de Laravel 11+, et le moment exact où tu dois écrire le tien.', 
          blocks: [
            { t: 'h3', h: 'Le problème : une règle, cent routes' },
            { t: 'p', h: 'Ton espace admin filet + ton panier filet + ton compte filet… Ajouter `if (!auth()->check()) return redirect(\'/login\')` en tête de 40 contrôleurs, c\'est 40 copies à maintenir — et 40 occasions d\'en oublier une (l\'erreur n°1 de sécurité du débutant : la route qui trainait, non protégée). Le middleware REVERSE la relation : la règle est écrite UNE FOIS dans une classe, et le ROUTAGE l\'applique aux routes concernées — groupe `admin`, groupe `api`, ou application entière. Le contrôleur n\'a même plus besoin de savoir que la règle existe : la requête est DÉJÀ filtrée quand elle arrive.' },
            { t: 'h3', h: 'Anatomie : l\'oignon et le $next' },
            { t: 'p', h: 'Un middleware reçoit la requête et une fonction `$next` (« passe au suivant »). Avant `$next`, tu peux BLOQUER (redirection, 403, 429) ou MODIFIER la requête ; `$next($request)` transmet au middleware suivant, puis au contrôleur — et au retour, la RÉPONSE traverse de nouveau ta couche dans l\'autre sens, où tu peux la transformer (ajouter un en-tête, compresser). C\'est la structure en **oignon** : chaque couche enveloppe les suivantes, à l\'aller et au retour. L\'ordre dans lequel tu emboîtes compte : la session AVANT l\'auth (l\'auth lit la session), CSRF APRÈS la session (le jeton vit en session).' },
            { t: 'diagram', title: 'Le tunnel des middleware, à l\'aller… et au retour', svg: `<svg viewBox="0 0 680 200">
  <defs><marker id="lv-m1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="14" y="73" width="116" height="54" rx="12" class="dg-b"/>
  <text x="72" y="95" class="dg-t" text-anchor="middle">Requête</text>
  <text x="72" y="113" class="dg-m" text-anchor="middle">POST /admin</text>
  <rect x="150" y="40" width="76" height="120" rx="12" class="dg-b"/>
  <circle cx="188" cy="40" r="9" class="dg-num"/><text x="188" y="44" class="dg-numt" text-anchor="middle">1</text>
  <text x="188" y="95" class="dg-t" text-anchor="middle">CORS</text>
  <text x="188" y="113" class="dg-ms" text-anchor="middle">en-têtes</text>
  <rect x="246" y="40" width="76" height="120" rx="12" class="dg-b"/>
  <circle cx="284" cy="40" r="9" class="dg-num"/><text x="284" y="44" class="dg-numt" text-anchor="middle">2</text>
  <text x="284" y="95" class="dg-t" text-anchor="middle">Session</text>
  <text x="284" y="113" class="dg-ms" text-anchor="middle">qui es-tu ?</text>
  <rect x="342" y="40" width="76" height="120" rx="12" class="dg-b"/>
  <circle cx="380" cy="40" r="9" class="dg-num"/><text x="380" y="44" class="dg-numt" text-anchor="middle">3</text>
  <text x="380" y="95" class="dg-t" text-anchor="middle">CSRF</text>
  <text x="380" y="113" class="dg-ms" text-anchor="middle">jeton signé</text>
  <rect x="438" y="40" width="76" height="120" rx="12" class="dg-b"/>
  <circle cx="476" cy="40" r="9" class="dg-num"/><text x="476" y="44" class="dg-numt" text-anchor="middle">4</text>
  <text x="476" y="95" class="dg-t" text-anchor="middle">auth</text>
  <text x="476" y="113" class="dg-ms" text-anchor="middle">connecté ?</text>
  <rect x="540" y="73" width="126" height="54" rx="12" class="dg-ba"/>
  <text x="603" y="95" class="dg-t" text-anchor="middle">TON contrôleur</text>
  <text x="603" y="113" class="dg-m" text-anchor="middle">enfin ✓</text>
  <path d="M 130,100 L 148,100" class="dg-e" marker-end="url(#lv-m1)"/>
  <path d="M 226,100 L 244,100" class="dg-e" marker-end="url(#lv-m1)"/>
  <path d="M 322,100 L 340,100" class="dg-e" marker-end="url(#lv-m1)"/>
  <path d="M 418,100 L 436,100" class="dg-e" marker-end="url(#lv-m1)"/>
  <path d="M 514,100 L 538,100" class="dg-e" marker-end="url(#lv-m1)"/>
  <path d="M 603,127 L 603,178 L 72,178 L 72,130" class="dg-e dg-dash" marker-end="url(#lv-m1)"/>
  <text x="334" y="170" class="dg-m" text-anchor="middle">la réponse repasse par les mêmes couches au retour (en-têtes, mesures…)</text>
</svg>`, caption: 'Chaque couche peut BLOQUER (403, 419, redirection login) — et alors le contrôleur n\'est JAMAIS appelé. C\'est le point fort : une règle écrite une fois protège toutes les routes du groupe. À l\'aller, chaque couche décide ; au retour (pointillés), elle peut peaufiner la réponse.' },
            { t: 'code', lang: 'php', label: 'app/Http/Middleware/CouvreFeu.php', code:
'<?php\n\nnamespace App\\Http\\Middleware;\n\nuse Closure;\nuse Illuminate\\Http\\Request;\nuse Symfony\\Component\\HttpFoundation\\Response;\n\nclass CouvreFeu\n{\n    public function handle(Request $request, Closure $next): Response\n    {\n        // AVANT $next : BLOQUER ou transformer la REQUÊTE —\n        $heure = (int) now()->format(\'H\');\n        if ($heure >= 22 || $heure < 6) {\n            // Couvre-feu maintenance : la boutique ferme la nuit\n            if ($request->is(\'admin/*\')) {\n                abort(503, \'Maintenance nocturne — réessaie à 6 h.\');\n            }\n        }\n\n        $response = $next($request);   // le reste de l\'oignon s\'exécute\n\n        // APRÈS $next : transformer la RÉPONSE si besoin —\n        $response->headers->set(\'X-Boutique\', \'Awa\');\n\n        return $response;              // TOUJOURS retourner une réponse\n    }\n}' },
            { t: 'h3', h: 'Enregistrer et appliquer (Laravel 11+)' },
            { t: 'code', lang: 'php', label: 'bootstrap/app.php — la centrale de branchements', code:
'<?php\n\nreturn Application::configure(basePath: dirname(__DIR__))\n    ->withRouting(\n        web: __DIR__.\'/../routes/web.php\',\n        api: __DIR__.\'/../routes/api.php\',\n        commands: __DIR__.\'/../routes/console.php\',\n        health: \'/up\',\n    )\n    ->withMiddleware(function (Middleware $middleware) {\n        // ALIAS : nom court → classe (utilisable dans les routes)\n        $middleware->alias([\n            \'couvre-feu\' => \\App\\Http\\Middleware\\CouvreFeu::class,\n        ]);\n\n        // GLOBAL : s\'exécute sur TOUTES les requêtes\n        $middleware->append(\\App\\Http\\Middleware\\LogLent::class);\n\n        // GROUPE existant : ajouter AU groupe web ou api\n        $middleware->web(append: [\\App\\Http\\Middleware\\Annonce::class]);\n    })\n    ->create();\n\n// Puis dans les routes — par nom d\'alias :\n//   Route::middleware(\'couvre-feu\')->group(…);\n//   Route::get(\'/admin\', …)->middleware(\'couvre-feu\');' },
            { t: 'p', h: 'Avant Laravel 11, ce câblage vivait dans `app/Http/Kernel.php` (`$middlewareAliases`, `$middlewareGroups`) — tu rencontreras ce fichier dans la documentation et les vieux projets ; la PHILOSOPHIE est identique, seule l\'adresse a changé. Le réflexe à garder : alias courts pour les usages ciblés (`->middleware(\'auth\')`), groupe pour les familles (`web`, `api`), global pour ce qui concerne VRAIMENT chaque requête (logs, métriques).' },
            { t: 'h3', h: 'Les middleware que tu utilises déjà (sans le savoir)' },
            { t: 'table', head: ['Alias', 'Métier', 'Ce qu\'il fait si ça bloque'], rows: [
              ['`auth`', 'exige un utilisateur connecté', 'redirection vers /login (web) ou 401 (api)'],
              ['`guest`', 'exige un VISITEUR non connecté (login/register)', 'redirige les connectés vers leur espace'],
              ['`verified`', 'exige un e-mail confirmé', 'renvoie vers la page de vérification'],
              ['`throttle:60,1`', '60 requêtes par minute max (anti-abus)', '429 Too Many Requests'],
              ['`can:update,produit`', 'autorisation par policy (fiche dédiée)', '403 Forbidden'],
              ['CORS / CSRF (globaux)', 'sécurité navigateur — pas un choix', 'pré-vol refusé / 419 Page Expired']
            ]},
            { t: 'h3', h: 'Quand écrire le tien — et quand ne pas' },
            { t: 'p', h: 'Écris un middleware quand la règle est **transverse et sans métier** : authentification, restrictions techniques (horaires, IP, débit, locale), mesure (logs, en-têtes de suivi). Ne l\'écris PAS pour de la logique métier (« vérifier que le solde de la tontine est positif ») : ça se teste unitair\'ment — c\'est un service/une policy, pas un filtre HTTP. Et ne l\'écris pas pour ce que le framework offre déjà : la moitié des middlewares « maison » du débutant existent dans la colonne de gauche du tableau ci-dessus.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Le middleware s\'exécute avant le contrôleur, point. »** La moitié du pouvoir est APRÈS `$next` : la réponse traverse ta couche au retour — c\'est là qu\'on ajoute les en-têtes de cache, de CORS, de sécurité, qu\'on mesure le temps de réponse.',
              '**« Bloquer = return avant $next. »** Bloquer = RETOURNER une réponse d\'erreur (`abort(403)`, `redirect()`, `response()->json()`). `$next($request)` n\'est appelé QUE si tu laisses passer — et tout code après `$next` s\'exécute TOUJOURS (au retour), même quand le contrôleur a répondu.',
              '**« L\'ordre des middleware ne compte pas. »** Il compte énormément : `auth` avant `session` est cassé par construction (l\'auth LIT la session), et ton CORS global doit précéder le routage. Le groupe `web` du framework est ordonné pour toi ; tes ajouts globaux réfléchissent à leur place.',
              '**« Un middleware peut modifier la base / l\'état. »** Techniquement possible, architecturalement toxique : un middleware est un FILTRE, pas un acteur. Toute écriture métier déménage dans le contrôleur, un service ou un listener.',
              '**« Mettre auth sur un groupe suffit. »** Non : la DÉFENSE EN PROFONDEUR exige aussi les policies au niveau objet (middleware auth = « connecté » ; policy = « a le droit sur CETTE commande »). Un middleware d\'accès ouvre la porte de la maison, pas celle de chaque chambre.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux pièges qui portent exactement le même remède : placer le contrôle AU BON MOMENT du voyage.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le concret d\'abord : ce que tu viens de traverser est le cycle de vie de la fiche Fondamentaux vu de l\'intérieur — entre le moment où le routeur (fiche Routing) désigne la route et l\'exécution du contrôleur, la requête passe ce tunnel de couches. Deux de ces couches portent des noms que tu vas bientôt rencontrer en entier : le middleware `auth` sera alimenté par la fiche Authentification (quelqu\'un doit poser l\'identité avant qu\'on la contrôle), et `can` trouvera ses policies dans la fiche Autorisation. Enfin, toute exception levée dans une couche — un 401 non connecté, un 403 refusé — aboutit au même gestionnaire central : la fiche Erreurs.' }
          ],
          errors: [
            { title: 'Vérifier APRÈS $next ce qui devait bloquer avant', lang: 'php', bad:
'public function handle(Request $request, Closure $next): Response\n{\n    $response = $next($request);         // d\'abord on laisse TRAVAILLER\n    if (!$request->user()?->estAdmin()) {\n        abort(403);                      // ✗ TROP TARD : le contrôleur a\n        //   DÉJÀ supprimé le produit — la 403 ne répare RIEN,\n        //   elle masque juste le résultat\n    }\n    return $response;\n}', good:
'public function handle(Request $request, Closure $next): Response\n{\n    if (!$request->user()?->estAdmin()) {\n        abort(403);                      // ✓ AVANT : la requête n\'atteint\n    }                                    //   JAMAIS le contrôleur\n    return $next($request);              // et le code après $next (en-têtes,\n}                                        // mesures) n\'existe que si nécessaire', why: 'L\'oignon n\'est symétrique qu\'en apparence : la PHASE D\'ALLER est la phase de DÉCISION (« laisser passer, oui ou non »), la phase de retour est la phase de FINITION (en-têtes, logs). Un contrôle d\'accès placé au retour n\'empêche rien — l\'effet de bord (suppression, écriture, paiement) s\'est déjà produit dans la couche interne. La trace est sans appel : `abort` avant `$next` = jamais d\'exécution métier ; `abort` après $next = exécution métier PUIS une erreur affichée. Toute règle de blocage se pense AVANT.' },
            { title: 'Logique métier dissimulée dans un middleware', lang: 'php', bad:
'// App\\Http\\Middleware\\VerifieSolde.php\npublic function handle(Request $request, Closure $next)\n{\n    $tontine = $request->route(\'tontine\');\n    if ($tontine->solde < $request->montant) {\n        return back()->withErrors(\'Solde insuffisant.\');   // ✗\n    }\n    $tontine->increment(\'total_cotisations\', $request->montant);  // ✗✗\n    return $next($request);\n}\n// Deux fautes : la business rule (suffisance de fonds) est du\n// MÉTIER (service, Form Request), et l\'EFFET DE BORD (écriture)\n// n\'a PAS sa place dans un FILTRE.', good:
'// Règles métier → Form Request (validation) ou Policy (droits) :\npublic function rules() {\n    return [\n        \'montant\' => [\'required\', \'integer\', \'min:1000\',\n            function ($attr, $value, $fail) {\n                if ($this->tontine->solde < $value) {\n                    $fail(\'Solde insuffisant pour cette cotisation.\');\n                }\n            }],\n    ];\n}\n// Écritures → contrôleur / service / listener : testables,\n// transactionnables, traçables. Le middleware reste un gardien\n// de frontière, pas un caissier masqué.', why: 'Le middleware a un contrat implicite : filtrer, pas travailler. Le violer produit le pire type de dette — la règle métier devient INVISIBLE (personne ne cherche la validation du solde dans un fichier nommé VerifieSolde.php), INTESTABLE (elle exige une requête HTTP complète pour être vérifiée) et PIÉGEUSE (elle s\'exécute pour toutes les routes du groupe, y compris celles qui ne la veulent pas). Laravel a une maison pour CHAQUE besoin : validation → Form Request, droits → Policy, calcul → Service, réaction → Listener. La discipline est simple : si ça écrit, calcule ou juge du métier, ça n\'est pas un middleware.' }
          ],
          related: ['lv-routing', 'lv-authentification', 'lv-fondamentaux', 'lv-erreurs']
        },
        {
          id: 'lv-blade',
          title: 'Blade',
          icon: 'web_asset',
          level: 'Débutant',
          tagline: '{{ }}, @if, @foreach, layouts hérités et composants `<x-*>` : le moteur de templates qui reste du PHP.', 
          intro: 'Blade est la réponse de Laravel à une question vieille comme le web : comment mélanger données et HTML sans que ni l\'un ni l\'autre ne souffre ? La réponse : un moteur de templates qui se compile en PHP pur, garde les accolades naturelles `{{ }}`, échappe TOUT par défaut (la sécurité d\'abord), et compose tes pages par héritage de layouts puis par composants `<x-*>`. Cette fiche couvre les quatre niveaux dans l\'ordre où tu les utiliseras : afficher, structurer, assembler, factoriser.', 
          blocks: [
            { t: 'h3', h: 'Afficher des données — en sécurité par défaut' },
            { t: 'p', h: 'Le réflexe PHP de base, `<?= $produit->nom ?>`, affiche la valeur TELLE QUELLE — y compris si un client malveillant a saisi `<script>…</script>` dans le nom de son produit (la XSS, injection n°1 du web). Blade corrige le défaut à la racine : **`{{ }}` ÉCHAPPE systématiquement** (les chevrons deviennent `&lt;script&gt;`, inoffensifs). Le rendu d\'une saisie utilisateur est donc sûr PAR DÉFAUT — la porte blindée est fermée sans que tu y penses. Le contre-pied exact : `{!! !!}` qui affiche BRUT, réservé au HTML que TU maîtrises (un rendu de Markdown interne, jamais une saisie).' },
            { t: 'callout', kind: 'info', h: 'Deux mots nouveaux, expliqués vite. Un **moteur de templates** : le logiciel qui prend un fichier « HTML + trous » (les `{{ }}` et `@if`) et le remplit avec tes données pour produire le HTML final. Et la **XSS** (« Cross-Site Scripting ») : le piège où un visiteur injecte du code (un script) dans TON site via un champ (nom, commentaire) — si le site affiche sa saisie telle quelle, le script s\'exécute chez tous les autres visiteurs. D\'où l\'importance de l\'échappement automatique de `{{ }}`.' },
            { t: 'code', lang: 'php', label: 'resources/views/produits/show.blade.php', code:
'<h1>{{ $produit->nom }}</h1>\n<p>{{ $produit->description }}</p>\n\n{{-- affichage avec défaut (syntaxe courte et sûre) --}}\n<p>Stock : {{ $produit->stock ?? \'non renseigné\' }}</p>\n\n{{-- une saisie utilisateur : --}}\n{{-- {{ $avis->texte }} échappe → le <script> devient du texte inerte --}}\n\n{{-- le HTML maîtrisé UNIQUEMENT (ici : contenu rédigé par toi) --}}\n{!! $guideHtml !!}\n\n{{-- un commentaire Blade : NI dans le HTML envoyé, NI dans la page vue --}}\n{{-- utile pour documenter le template ; <!-- --> serait visible publiquement --}}' },
            { t: 'h3', h: 'Les directives de tous les jours' },
            { t: 'code', lang: 'php', code:
'{{-- conditions --}}\n@if ($produit->stock === 0)\n    <em>Rupture — réappro en cours</em>\n@elseif ($produit->stock < 5)\n    <strong>Plus que {{ $produit->stock }} en stock !</strong>\n@else\n    <span>En stock</span>\n@endif\n\n{{-- boucle avec $loop qui connaît tout --}}\n@foreach ($produits as $produit)\n    <li class=\"{{ $loop->first ? \'premier\' : \'\' }}\">\n        {{ $loop->iteration }}/{{ $loop->count }} — {{ $produit->nom }}\n    </li>\n@endforeach\n\n{{-- authentification sans if PHP --}}\n@auth\n    <p>Bonjour {{ auth()->user()->name }}</p>\n@endauth\n@guest\n    <a href=\"{{ route(\'login\') }}\">Se connecter</a>\n@endguest\n\n{{-- inclusion d\'un bout de vue partagé --}}\n@include(\'partials.alerte-promo\', [\'jusque\' => \'samedi\'])' },
            { t: 'p', h: 'Note le style général : les directives `@…` remplacent le PHP encombrant (`<?php if (…): ?>`) tout en restant du PHP compilé. Ce n\'est pas un nouveau langage à apprendre, c\'est du PHP raccourci vers sa partie STRUCTURE — et toute expression PHP reste utilisable entre `{{ }}` (`{{ number_format($prix) }} F`, `{{ now()->format(\'d/m\') }}`).' },
            { t: 'h3', h: 'Layouts : une coquille, mille pages' },
            { t: 'p', h: 'Chaque page de ta boutique partage la même coquille (en-tête, navigation, pied) — la dupliquer dans 50 templates assure 50 divergences. L\'héritage de layout résout : un template MAÎTRE déclare des zones (`@yield`), chaque page les REMPLIT (`@section`). Modifier la coquille = modifier UN fichier, les 50 pages héritent aussitôt. C\'est la même idée que la composition React, transposée au serveur.' },
            { t: 'code', lang: 'php', label: 'resources/views/layouts/app.blade.php (la coquille)', code:
'<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <meta charset="utf-8">\n    <title>@yield(\'titre\', \'Boutique Awa\')</title>\n</head>\n<body>\n    <nav>\n        <a href="{{ route(\'produits.index\') }}">Catalogue</a>\n        @auth <a href="{{ route(\'commandes.index\') }}">Mes commandes</a> @endauth\n    </nav>\n\n    <main>\n        @yield(\'contenu\')          {{-- la zone que chaque page remplit --}}\n    </main>\n\n    <footer>© {{ date(\'Y\') }} Boutique Awa — Cotonou</footer>\n</body>\n</html>' },
            { t: 'code', lang: 'php', label: 'resources/views/produits/index.blade.php (la page)', code:
'@extends(\'layouts.app\')        {{-- j\'hérite de la coquille --}}\n\n@section(\'titre\', \'Catalogue — Boutique Awa\')\n\n@section(\'contenu\')\n    <h1>Catalogue du jour</h1>\n    @foreach ($produits as $produit)\n        <x-carte-produit :produit="$produit" />\n    @endforeach\n@endsection' },
            { t: 'diagram', title: 'Assemblage d\'une page : la coquille + la section + les composants', svg: `<svg viewBox="0 0 680 240">
  <defs><marker id="lv-b1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="20" y="28" class="dg-t">layout app.blade.php — la coquille</text>
  <rect x="20" y="40" width="240" height="172" rx="14" class="dg-b"/>
  <rect x="32" y="54" width="216" height="24" rx="8" class="dg-pill"/>
  <text x="140" y="70" class="dg-ms" text-anchor="middle">en-tête + nav (commun à toutes les pages)</text>
  <rect x="32" y="86" width="216" height="76" rx="10" class="dg-zone"/>
  <text x="140" y="130" class="dg-m" text-anchor="middle">@yield('contenu')</text>
  <rect x="32" y="170" width="216" height="28" rx="8" class="dg-pill"/>
  <text x="140" y="188" class="dg-ms" text-anchor="middle">pied de page (commun)</text>
  <text x="322" y="74" class="dg-t">page produits/index.blade.php</text>
  <rect x="322" y="86" width="172" height="76" rx="12" class="dg-b"/>
  <text x="408" y="112" class="dg-m" text-anchor="middle">@extends + @section</text>
  <text x="408" y="132" class="dg-ms" text-anchor="middle">'contenu' rempli ici</text>
  <text x="408" y="150" class="dg-ms" text-anchor="middle">@foreach + composants</text>
  <path d="M 322,124 L 252,124" class="dg-ea" marker-end="url(#lv-b1)"/>
  <text x="322" y="188" class="dg-t">composants réutilisables</text>
  <rect x="322" y="198" width="172" height="34" rx="10" class="dg-b"/>
  <text x="408" y="220" class="dg-t" text-anchor="middle">&lt;x-carte-produit /&gt;</text>
  <path d="M 408,196 L 408,164" class="dg-e" marker-end="url(#lv-b1)"/>
  <rect x="540" y="86" width="124" height="76" rx="12" class="dg-ba"/>
  <text x="602" y="112" class="dg-t" text-anchor="middle">PAGE HTML</text>
  <text x="602" y="132" class="dg-ms" text-anchor="middle">assemblée une fois</text>
  <text x="602" y="150" class="dg-ms" text-anchor="middle">→ au navigateur</text>
  <path d="M 510,124 L 538,124" class="dg-e" marker-end="url(#lv-b1)"/>
</svg>`, caption: 'La page déclare « j\'hérite de la coquille » (@extends), remplit la zone prévue (@section alimente @yield), et utilise des morceaux réutilisables (composants). Modifier la coquille = UN fichier, toutes les pages suivent — c\'est tout l\'intérêt.' },
            { t: 'p', h: 'L\'héritage traite la coquille ; les COMPOSANTS traitent les morceaux réutilisables : carte produit, badge promo, alerte, bouton danger. Crée `resources/views/components/carte-produit.blade.php` et tu obtiens la balise `<x-carte-produit />` — avec Props typées (`@props`), attributs fusionnés (`$attributes`), et slots pour le contenu. C\'est la composition `<Composant />` de React, côté serveur : le point où Blade cesse d\'être « un moteur de templates » et devient un système de composants.' },
            { t: 'code', lang: 'php', label: 'resources/views/components/carte-produit.blade.php', code:
'@props([\'produit\', \'compacte\' => false])\n\n<article {{ $attributes->merge([\'class\' => \'carte\']) }}>\n    <h3>{{ $produit->nom }}</h3>\n    <p>{{ number_format($produit->prix, 0, \',\', \' \') }} F</p>\n\n    @if ($produit->stock === 0)\n        <em>Rupture</em>\n    @endif\n\n    {{-- slot : contenu libre placé entre les balises au moment de l\'usage --}}\n    @unless($compacte)\n        <div class="actions">{{ $slot }}</div>\n    @endunless\n</article>\n\n{{-- usage dans une page :\n<x-carte-produit :produit="$p" class="vedette">\n    <a href="{{ route(\'produits.show\', $p) }}">Voir la fiche</a>\n</x-carte-produit>\n--}}' },
            { t: 'callout', kind: 'warn', h: '`@csrf` est OBLIGATOIRE dans tout formulaire POST/PUT/DELETE — sans jeton, Laravel répond 419 Page Expired. Et pour un verbe que HTML ne connaît pas : `@method(\'DELETE\')` dans le même formulaire (le « method spoofing » rencontré dans la fiche Routing).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« {!! !!} existe, donc c\'est fait pour ça. »** Oui — pour du HTML MAÎTRISÉ (contenu de ton éditeur, rendu Markdown interne). Jamais pour une saisie utilisateur : une seule occurrence non filtrée et ta boutique affiche le script d\'un autre à tous tes clients.',
              '**« Blade est un langage de template à apprendre en entier. »** Blade est du PHP compilé : `{{ }}`, `@if`, `@foreach` se traduisent directement. Tout le reste (helpers, composants) est de l\'ergonomie par-dessus, apprise au besoin.',
              '**« @yield et @section, c\'est la même chose que @include. »** Non : l\'héritage assemble une COQUILLE à des pages (vertical), l\'include injecte un FRAGMENT dans une page (horizontal). Les deux cohabitent : ta page @extends le layout et @include partiel après partiel.',
              '**« Un composant Blade est un composant JavaScript. »** Non : il est rendu AU SERVEUR et produit du HTML final — zéro JS envoyé. Pour l\'interactivité navigateur, tu ajoutes du JS par-dessus (Alpine, Vue/React ponctuel) ; le couple Blade + Alpine couvre 90 % des besoins d\'une app classique.',
              '**« Le cache Blade fait que mes modifs ne s\'affichent pas. »** Blade compile en PHP depuis les templates modifiés — Laravel détecte le changement automatiquement en dev. Si la page semble figée, c\'est ailleurs (cache applicatif, `view:cache`, opcache) : `php artisan view:clear` règle le doute en une seconde.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Deux fautes de sécurité diamétralement opposées — l\'une qui affiche trop, l\'autre qui protège trop peu.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Blade est la dernière main avant les yeux du visiteur : la fiche Contrôleurs lui a passé ses variables (`return view("produits.index", compact("produits"))`), `route()` et `url()` réutilisent les noms signés dans la fiche Routing, et `@auth` / `@can` traduisent en affichage ce que la fiche Authentification sait du visiteur. Les formulaires posés ici renvoient à la fiche Formulaires du module HTML : la mécanique (`method`, `action`, les attributs `name`) n\'a pas changé d\'un pouce — Blade n\'ajoute que la sécurité (`@csrf`), le confort (`@error`, `old()`) et l\'échappement (`{{ }}`).' }
          ],
          errors: [
            { title: '{!! !!} sur une saisie utilisateur', lang: 'php', bad:
'{{-- l\'avis d\'un client, affiché « pour garder les sauts de ligne » : --}}\n<div class="avis">{!! $avis->texte !!}</div>\n\n{{-- le client a écrit :\n     <script>fetch(\'/admin/mots-de-passe\').then(r => /* vol */)</script>\n     → exécuté chez CHAQUE visiteur de la fiche produit.\n     XSS stockée : la faille n°1 des sites faits maison. --}}', good:
'{{-- la saisie utilisateur est TOUJOURS échappée --}}\n<div class="avis">{{ $avis->texte }}</div>\n\n{{-- besoin de sauts de ligne ? le helper nl2br AVANT l\'échappement : --}}\n<div class="avis">{!! nl2br(e($avis->texte)) !!}</div>\n{{-- e() échappe le texte, nl2br ajoute les <br> MAÎTRISÉS,\n   et seul le HTML que TU as généré traverse --}}', why: 'L\'échappement est le contrat de sécurité de Blade : `{{ }}` transforme les chevrons en entités, rendant tout HTML injecté inoffensif. `{!! !!}` déchire ce contrat volontairement — il n\'accepte que du HTML dont TU maîtrises la source (ton éditeur riche, ton parseur Markdown filtré). La saisie utilisateur n\'obéit jamais : le script volera les sessions de tes clients ET de tes administrateurs. Quand tu as besoin de structure (retours à la ligne), compose : échappe d\'abord LE TEXTE, puis ajoute TES balises — jamais l\'inverse.' },
            { title: 'Oublier @csrf dans un formulaire', lang: 'php', bad:
'<form method="POST" action="{{ route(\'produits.store\') }}">\n    <input name="nom" placeholder="Gari premium 50 kg">\n    <button>Enregistrer</button>\n</form>\n{{-- à la soumission : 419 Page Expired, sans autre explication.\n   Pire réflexe : DÉSACTIVER la protection CSRF "pour avancer". --}}', good:
'<form method="POST" action="{{ route(\'produits.store\') }}">\n    @csrf                                    {{-- le jeton, en 6 caractères --}}\n    <input name="nom" placeholder="Gari premium 50 kg">\n    <button>Enregistrer</button>\n</form>\n\n<form method="POST" action="{{ route(\'produits.update\', $produit) }}">\n    @csrf\n    @method(\'PUT\')                          {{-- le verbe HTTP complet --}}\n    …\n</form>', why: 'CSRF protège contre le « Cross-Site Request Forgery » : un site hostile qui ferait soumettre un formulaire À TON NOM (tu es connecté à ta boutique dans un autre onglet) avec l\'action de son choix — suppression, virement, changement de profil. Le jeton `@csrf` prouve que le formulaire vient bien de TES pages. La 419 est donc une garde qui bloque TOI aujourd\'hui, pour bloquer un attaquant demain : on ne la « répare » pas en désactivant la garde, mais en donnant le jeton à chaque formulaire. 6 caractères, zéro exception.' }
          ],
          related: ['lv-controleurs', 'lv-routing', 'lv-authentification', 'html-formulaires']
        },
        {
          id: 'lv-validation',
          title: 'Validation & Form Requests',
          icon: 'fact_check',
          level: 'Intermédiaire',
          tagline: 'Règles déclaratives, Form Requests dédiés, et pourquoi « jamais confiance » est une devise saine.', 
          intro: 'Chaque donnée qui arrive du dehors — formulaire, API, fichier — est une accusée : elle PRETEND être un email valide, un montant positif, un slug disponible. La validation est le bureau des douanes où chaque prétention est vérifiée AVANT d\'entrer dans ton pays (ta base). Laravel rend cette douane presque agréable : des règles déclaratives (`required|email|unique:users`), des messages automatiques en français, et les Form Requests qui isolent toute la procédure hors de tes contrôleurs. Cette fiche pose la règle d\'or (`validated()` ou rien), puis te donne les deux voies et quand choisir chacune.', 
          blocks: [
            { t: 'h3', h: 'Pourquoi le navigateur ne peut pas être ta seule douane' },
            { t: 'p', h: 'Ton formulaire HTML a `required`, `type="email"`, `min="1000"` ? Merveilleux pour le confort — et complètement inutile pour la sécurité : n\'importe qui soumet la même requête avec `curl` ou Postman, sans passer par ton formulaire. **La validation côté client sert l\'utilisateur, la validation côté serveur protège l\'application.** Tu ne choisis pas entre les deux : tu écris la seconde de toute façon, la première quand tu as le temps. Cette fiche ne parle que de la seconde — celle qui garde ta base propre quand le monde envoie n\'importe quoi.' },
            { t: 'h3', h: 'La voie rapide : validate() dans le contrôleur' },
            { t: 'code', lang: 'php', code:
'public function store(Request $request)\n{\n    $donnees = $request->validate([\n        \'nom\'          => [\'required\', \'string\', \'max:120\'],\n        \'prix\'         => [\'required\', \'integer\', \'min:100\'],\n        \'description\'  => [\'nullable\', \'string\', \'max:2000\'],\n        \'categorie_id\' => [\'required\', \'exists:categories,id\'],\n    ]);\n    // Échec → redirection auto avec les erreurs en session (web)\n    //      ou 422 JSON (api) — ta ligne suivante n\'est JAMAIS exécutée\n    // Succès → $donnees ne contient QUE les champs validés\n\n    $produit = Produit::create($donnees);\n    return redirect()->route(\'produits.show\', $produit);\n}' },
            { t: 'p', h: 'Cette voie est parfaite pour les petits formulaires (3-4 champs, une seule utilisation). La règle à retenir d\'ici : **`validate()` retourne les données VALIDÉES** — un tableau qui ne contient que les champs que tu as déclarés. Tout le reste (`_token`, champs injectés en douce par un curieux) est dehors. C\'est la différence entre « ce que l\'utilisateur a envoyé » et « ce que l\'application accepte ».' },
            { t: 'h3', h: 'La voie pro : le Form Request' },
            { t: 'p', h: 'Dès que les règles deviennent sérieuses (conditionnelles, métier, réutilisées dans l\'API), elles DÉMÉNAGENT dans une classe dédiée : le Form Request. Trois avantages nets : le contrôleur reste mince (injection directe — la fiche Contrôleurs en parle) ; les règles sont testables et réutilisables ; et `authorize()` y accueille le contrôle d\'accès pour la requête (« ce vendeur peut-il modifier CE produit ? »), fusionnant validation de DONNÉES et autorisation d\'ACTION au bon endroit.' },
            { t: 'code', lang: 'php', label: 'app/Http/Requests/StoreProduitRequest.php', code:
'<?php\n\nnamespace App\\Http\\Requests;\n\nuse Illuminate\\Foundation\\Http\\FormRequest;\n\nclass StoreProduitRequest extends FormRequest\n{\n    // 1) DROITS : cette action est-elle permise, indépendamment des champs ?\n    public function authorize(): bool\n    {\n        return $this->user()->can(\'create\', \\App\\Models\\Produit::class);\n    }\n\n    // 2) RÈGLES : qu\'est-ce qui a le droit d\'entrer ?\n    public function rules(): array\n    {\n        return [\n            \'nom\'          => [\'required\', \'string\', \'max:120\', \'unique:produits,nom\'],\n            \'prix\'         => [\'required\', \'integer\', \'min:100\'],\n            \'stock\'        => [\'required\', \'integer\', \'min:0\'],\n            \'description\'  => [\'nullable\', \'string\', \'max:2000\'],\n            \'promo\'        => [\'nullable\', \'boolean\'],\n            \'image\'        => [\'nullable\', \'image\', \'max:2048\'],       // Ko\n        ];\n    }\n\n    // 3) MESSAGES (optionnel) : parler humain, pas regex\n    public function messages(): array\n    {\n        return [\n            \'nom.unique\' => \'Ce nom de produit est déjà pris par le catalogue.\',\n            \'prix.min\'   => \'Un prix doit être d\'au moins 100 F.\',\n        ];\n    }\n}\n\n// Dans le contrôleur — INJECTION DIRECTE (fiche Contrôleurs) :\npublic function store(StoreProduitRequest $request)\n{\n    // arrivé ici, TOUT est validé ET autorisé :\n    $produit = Produit::create($request->validated());\n    return redirect()->route(\'produits.show\', $produit);\n}' },
            { t: 'diagram', title: 'La douane avant la base : rien n\'entre sans être vérifié', svg: `<svg viewBox="0 0 680 222">
  <defs><marker id="lv-v1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <path d="M 260,92 L 260,56" class="dg-e" marker-end="url(#lv-v1)"/>
  <text x="260" y="48" class="dg-ko" text-anchor="middle">✗ 403 — pas le droit</text>
  <rect x="16" y="92" width="130" height="56" rx="12" class="dg-b"/>
  <text x="81" y="114" class="dg-t" text-anchor="middle">Formulaire</text>
  <text x="81" y="134" class="dg-m" text-anchor="middle">POST /produits</text>
  <rect x="190" y="92" width="140" height="56" rx="12" class="dg-b"/>
  <circle cx="260" cy="92" r="9" class="dg-num"/><text x="260" y="96" class="dg-numt" text-anchor="middle">1</text>
  <text x="260" y="116" class="dg-t" text-anchor="middle">authorize()</text>
  <text x="260" y="134" class="dg-m" text-anchor="middle">les droits ?</text>
  <rect x="374" y="92" width="140" height="56" rx="12" class="dg-b"/>
  <circle cx="444" cy="92" r="9" class="dg-num"/><text x="444" y="96" class="dg-numt" text-anchor="middle">2</text>
  <text x="444" y="116" class="dg-t" text-anchor="middle">rules()</text>
  <text x="444" y="134" class="dg-m" text-anchor="middle">les données ?</text>
  <rect x="558" y="92" width="108" height="56" rx="12" class="dg-ba"/>
  <circle cx="612" cy="92" r="9" class="dg-num"/><text x="612" y="96" class="dg-numt" text-anchor="middle">3</text>
  <text x="612" y="116" class="dg-t" text-anchor="middle">Contrôleur</text>
  <text x="612" y="134" class="dg-ms" text-anchor="middle">→ ta base, propre</text>
  <path d="M 146,120 L 188,120" class="dg-e" marker-end="url(#lv-v1)"/>
  <path d="M 330,120 L 372,120" class="dg-e" marker-end="url(#lv-v1)"/>
  <path d="M 514,120 L 556,120" class="dg-e" marker-end="url(#lv-v1)"/>
  <path d="M 444,148 L 444,182" class="dg-e" marker-end="url(#lv-v1)"/>
  <text x="444" y="200" class="dg-ko" text-anchor="middle">✗ retour au formulaire + erreurs</text>
  <text x="444" y="216" class="dg-ms" text-anchor="middle">(en API : réponse 422 JSON) — et rien ne touche la base</text>
</svg>`, caption: 'Trois barrières, dans l\'ordre : authorize() (as-tu le droit d\'AGIR ?), rules() (les données sont-elles saines ?), et seulement alors ton contrôleur — qui ne reçoit que validated(), les champs déclarés et propres. En cas d\'échec, la requête repart avec les erreurs : la donnée douteuse ne touche JAMAIS ta base.' },
            { t: 'h3', h: 'Les règles à connaître par cœur' },
            { t: 'table', head: ['Règle', 'Sens', 'Exemple typique'], rows: [
              ['`required`', 'le champ doit être présent ET non vide', 'nom, prix'],
              ['`nullable`', 'peut être vide, MAIS si présent, respecte les autres règles', 'description, promo'],
              ['`string` / `integer` / `boolean` / `numeric`', 'le TYPE, avant toute logique', 'stock (pas « douze »)'],
              ['`email`', 'format d\'adresse valide', 'contact client'],
              ['`min:` / `max:`', 'borne (chiffres pour nombres, caractères pour chaînes, Ko pour fichiers)', 'prix min:100'],
              ['`unique:table,colonne`', 'aucune ligne existante avec cette valeur', 'nom de produit, email'],
              ['`exists:table,colonne`', 'la valeur EXISTE en base (clé étrangère sûre)', 'categorie_id'],
              ['`in:a,b,c`', 'liste fermée de valeurs', 'statut in:payee,livree,annulee'],
              ['`confirmed`', 'le champ `xxx_confirmation` est identique', 'mot de passe'],
              ['`date` / `after:tomorrow` / `before:`', 'validité et bornes de dates', 'livraison après-demain au plus tôt']
            ]},
            { t: 'callout', kind: 'tip', h: 'Deux formes pour écrire les règles : la CHAÎNE `\'required|string|max:120\'` (compacte) ou le TABLEAU `[\'required\', \'string\', \'max:120\']` (obligatoire dès qu\'on ajoute des objets de règle comme `Rule::unique(…)->ignore($id)` — voir la carte d\'erreur en bas). Dès que la ligne chaîne dépasse 4 éléments ou devient dynamique, le tableau gagne.' },
            { t: 'h3', h: 'Afficher les erreurs côté Blade' },
            { t: 'code', lang: 'php', code:
'<form method="POST" action="{{ route(\'produits.store\') }}">\n    @csrf\n\n    <label>Nom\n        {{-- old() : RE-REMPLIR avec la saisie précédente --}}\n        <input name="nom" value="{{ old(\'nom\') }}" required>\n    </label>\n    @error(\'nom\')\n        <p class="erreur">{{ $message }}</p>     {{-- le message de LA règle tombée --}}\n    @enderror\n\n    <label>Prix (F)\n        <input name="prix" value="{{ old(\'prix\') }}" inputmode="numeric">\n    </label>\n    @error(\'prix\')<p class="erreur">{{ $message }}</p>@enderror\n\n    <button>Ajouter au catalogue</button>\n</form>\n\n{{-- et le récapitulatif global en haut, si tu préfères :\n@if ($errors->any())\n    <ul>@foreach ($errors->all() as $erreur)<li>{{ $erreur }}</li>@endforeach</ul>\n@endif\n--}}' },
            { t: 'p', h: 'La magie discrète à comprendre : quand la validation échoue, Laravel REDIRIGE avec les erreurs ET les anciennes entrées en session — `old(\'nom\')` et `@error` n\'ont rien à faire d\'autre que les lire. C\'est pourquoi le cycle « soumettre → règle tombée → formulaire réaffiché rempli » est gratuit : tu n\'écris que l\'AFFICHAGE.' },
            { t: 'h3', h: 'validated() vs all() : la ligne de sécurité' },
            { t: 'p', h: '`$request->all()` est « tout ce qui est arrivé » — y compris ce que tu n\'as jamais déclaré : un client curieux qui ajoute `"role": "admin"` ou `"solde": 999999` à sa requête voit ces champs passer DIRECTEMENT à ta base si tu fais `User::create($request->all())`. `validated()` est l\'inverse exact : seuls les champs déclarés dans les règles sortent. Entre les deux, il n\'y a pas de débat — il y a ce qu\'on appelle le **mass assignment**, la vulnérabilité historique des frameworks, désamorcée par une habitude : jamais `all()` vers la base.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« La validation HTML/JS suffit si elle est bien faite. »** Elle saute au premier `curl` venu. Client = confort, serveur = sécurité : les deux vocabulaires, jamais un seul.',
              '**« nullable veut dire « pas obligé de valider ». »** Non : « le champ peut être absent OU vide, mais s\'il est fourni il respecte les règles ». `nullable|email` laisse passer un vide, jamais « patate ».',
              '**« unique:produits suffit aussi en modification. »** En édition, le produit se trouve « en doublon » avec LUI-MÊME — il faut dire `ignore` à la règle (la carte en bas). Le piège classique du CRUD.',
              '**« Je stocke $request->all() puisque j\'ai validé juste avant. »** Non : `validate()`/validated() EST la frontière — appelle la méthode et travaille sur SON RETOUR, pas sur la requête originale.',
              '**« 422 et 419 se ressemblent. »** 422 = validation tombée (les erreurs t\'expliquent quoi) ; 419 = jeton CSRF manquant/expiré (fiche Blade — `@csrf`). Deux fautes, deux réparations distinctes.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La règle unique qui se mord la queue en édition, et le raccourci `$request->all()` — deux cartes qui se paient une fois chacune, jamais deux.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'La douane se situe précisément entre deux mondes déjà croisés : elle garde le contrôleur mince (fiche Contrôleurs) et elle dialogue avec la base via `unique` et `exists` — un avant-goût d\'Eloquent. Côté sortie, `@error` et `old()` de la fiche Blade affichent exactement ce que le Form Request a refusé ; côté droits, la fiche Autorisation répondra à une question complémentaire : non plus « la donnée est-elle saine ? » mais « as-tu le droit de la toucher ? » — les deux contrôles se complètent et ne se remplacent jamais. Et n\'oublie pas la porte d\'entrée de tout ça : les formulaires HTML (module HTML), dont les `name` deviennent les clés du tableau `$request` que tu viens de valider.' }
          ],
          errors: [
            { title: 'unique qui se mord la queue en mode édition', lang: 'php', bad:
'public function rules(): array\n{\n    return [\n        \'nom\' => [\'required\', \'unique:produits,nom\'],   // ✗ en ÉDITION :\n    ];                                                     // le produit devient\n}                                                          // « doublon » de lui-même !\n// → impossible de sauvegarder la fiche sans changer le nom', good:
'use Illuminate\\Validation\\Rule;\n\npublic function rules(): array\n{\n    return [\n        \'nom\' => [\n            \'required\',\n            Rule::unique(\'produits\', \'nom\')->ignore($this->produit),\n            // « unique, SAUF cette ligne-là » — le produit cohabite avec lui-même\n        ],\n    ];\n}\n// En store(), $this->produit est null → ignore(null) ne change rien :\n// la MÊME règle sert la création et l\'édition sans doublon fantôme.', why: 'La règle `unique` interroge la table et exige « aucune autre ligne avec cette valeur » — naïvement, la ligne ACTUELLE du produit compte comme une autre. Le formulaire d\'édition échoue alors sur LE champ que tu n\'as pas touché, avec un message qui accuse un doublon invisible. C\'est LE piège de validation le plus répandu, et sa solution est le passage à la syntaxe objet `Rule::unique()->ignore()` : une règle unique, honnête sur les deux chemins (création, édition), qui ne demande aucune duplication de logique.' },
            { title: 'Stocker $request->all() au lieu de validated()', lang: 'php', bad:
'public function store(StoreProduitRequest $request)\n{\n    // "j\'ai validé juste au-dessus, tout va bien" :\n    $produit = Produit::create($request->all());      // ✗\n    // la requête contenait : nom, prix… + "role": "fournisseur"\n    // + "commission": 95 — injectés par un client curieux,\n    // SILENCIEUSEMENT enregistrés dans la base\n    return redirect()->route(\'produits.show\', $produit);\n}', good:
'public function store(StoreProduitRequest $request)\n{\n    $produit = Produit::create($request->validated());  // ✓\n    // → uniquement nom, prix, stock, description, promo, image\n    // tout champ non déclaré meurt à la frontière\n    return redirect()->route(\'produits.show\', $produit);\n}\n// Et pour les clés étrangères système (jamais du client) :\n$produit = Produit::create([\n    ...$request->validated(),\n    \'boutique_id\' => $request->user()->boutique_id,   // ajouté PAR TOI\n]);', why: 'Laravel protège le mass assignment par `$fillable` (fiche Eloquent), mais croire que la liste `$fillable` suffit te laisse vulnérable dès qu\'un champ « interne » y figure par négligence — et le client peut TOUT transmettre. `validated()` est la frontière ARCHITECTURALE : ce qui sort de la validation est par construction ce que tu as déclaré, ni plus ni moins. Les données système (propriétaire, boutique, timestamps métier) s\'ajoutent CÔTÉ SERVEUR, jamais depuis la requête — l\'habitude la plus rentable du framework.' }
          ],
          related: ['lv-controleurs', 'lv-eloquent', 'lv-blade', 'lv-autorisation', 'html-formulaires']
        },
        {
          id: 'lv-erreurs',
          title: 'Erreurs & exceptions',
          icon: 'report',
          level: 'Intermédiaire',
          tagline: 'abort(), handler d\'exceptions, pages d\'erreur, logs : transformer les pannes en réponses propres.', 
          intro: 'Une application qui ne plante jamais n\'existe pas ; il n\'y a que des applications qui plantent PROPREMENT. La question n\'est pas « comment éviter toute erreur » mais « que voit l\'utilisateur, que sais-je MOI, et comment je reprends la main ». Laravel répond par trois mécanismes à connaître : `abort()` pour les erreurs HTTP volontaires (404, 403), le gestionnaire central d\'exceptions pour tout le reste (et ta séparation web/JSON), et les logs pour ton journal de bord. Plus un dossier d\'exceptions métier qui feront de tes règles du jeu des citoyennes de premier ordre.', 
          blocks: [
            { t: 'h3', h: 'Produire une erreur HTTP proprement : abort()' },
            { t: 'p', h: 'Une erreur HTTP n\'est pas un échec à cacher — c\'est un MESSAGE protocolaire. `abort(404)` dit « cette ressource n\'existe pas » (pas la peine de chercher plus loin) et `abort(403)` dit « tu n\'as pas le droit » (même si elle existe — ou justement parce qu\'elle existe, on ne confirme rien aux curieux). À l\'intérieur de l\'application, ces codes ont une valeur : les middleware, les policies et les tests comprennent le protocole. L\'anti-modèle : `return \'Erreur\'` ou une 500 générique là où un code précis raconte la vérité.' },
            { t: 'code', lang: 'php', code:
'public function show(Commande $commande)      // binding → 404 auto si absente\n{\n    if ($commande->user_id !== auth()->id()) {\n        abort(403);                        // « interdit » — on ne détaille PAS\n    }\n    return view(\'commandes.show\', [\'commande\' => $commande]);\n}\n\n// Les codes parlent : 401 (non connecté), 403 (connecté mais interdit),\n// 404 (inconnu), 419 (CSRF expiré), 422 (validation), 429 (débit), 500 (panne).\nabort_if($stock < $quantite, 422, \'Stock insuffisant pour cette commande.\');' },
            { t: 'h3', h: 'Le gestionnaire central : withExceptions (Laravel 11+)' },
            { t: 'p', h: 'Toute exception NON attrapée dans ton code finit sa course dans le **gestionnaire d\'exceptions** — le filet central. Là, trois décisions sont prises pour toi, configurables : **rapporter** (écrire dans les logs / notifier Sentry), **rendre** (transformer l\'exception en réponse HTTP), et **masquer** (ne jamais envoyer les détails internes au client). En Laravel 11+, ce câblage vit dans `bootstrap/app.php`, à côté du middleware.' },
            { t: 'code', lang: 'php', label: 'bootstrap/app.php — le filet central', code:
'->withExceptions(function (Exceptions $exceptions) {\n    // 1) Ne JAMAIS rapporter les erreurs « attendues » (422, 404…) :\n    //    elles polluent les logs de bruit normal.\n    $exceptions->dontReport([\n        \\Illuminate\\Validation\\ValidationException::class,\n    ]);\n\n    // 2) RENDRE une exception métier de manière personnalisée —\n    //    web ET api en même endroit :\n    $exceptions->render(function (SoldeInsuffisant $e, $request) {\n        if ($request->expectsJson()) {\n            return response()->json([\n                \'erreur\' => \'solde_insuffisant\',\n                \'message\' => $e->getMessage(),\n            ], 422);\n        }\n        return back()->withErrors([\'montant\' => $e->getMessage()]);\n    });\n\n    // 3) Enrichir le CONTEXTE des rapports (utilisateur, requête) :\n    $exceptions->context(function () {\n        return [\'boutique\' => auth()->user()?->boutique?->slug];\n    });\n})' },
            { t: 'diagram', title: 'Une exception attrapée par le filet : deux destinations', svg: `<svg viewBox="0 0 680 220">
  <defs><marker id="lv-e1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="82" width="180" height="56" rx="12" class="dg-b"/>
  <text x="110" y="104" class="dg-t" text-anchor="middle">Exception levée</text>
  <text x="110" y="124" class="dg-ms" text-anchor="middle">throw new SoldeInsuffisant</text>
  <path d="M 200,110 L 248,110" class="dg-e" marker-end="url(#lv-e1)"/>
  <rect x="250" y="82" width="180" height="56" rx="12" class="dg-ba"/>
  <text x="340" y="104" class="dg-t" text-anchor="middle">Gestionnaire central</text>
  <text x="340" y="124" class="dg-m" text-anchor="middle">bootstrap/app.php</text>
  <path d="M 430,96 L 498,54" class="dg-e" marker-end="url(#lv-e1)"/>
  <text x="452" y="70" class="dg-ms" text-anchor="middle">report()</text>
  <rect x="500" y="20" width="164" height="56" rx="12" class="dg-b"/>
  <text x="582" y="42" class="dg-t" text-anchor="middle">RAPPORT — pour TOI</text>
  <text x="582" y="62" class="dg-ms" text-anchor="middle">logs structurés, Sentry…</text>
  <path d="M 430,124 L 498,170" class="dg-e" marker-end="url(#lv-e1)"/>
  <text x="452" y="154" class="dg-ms" text-anchor="middle">render()</text>
  <rect x="500" y="144" width="164" height="64" rx="12" class="dg-b"/>
  <text x="582" y="166" class="dg-t" text-anchor="middle">RENDU — le visiteur</text>
  <text x="582" y="184" class="dg-ms" text-anchor="middle">web : page sobre (404, 500…)</text>
  <text x="582" y="200" class="dg-ms" text-anchor="middle">api : JSON { erreur: … }</text>
</svg>`, caption: 'Toute exception non attrapée finit au gestionnaire central, qui fait DEUX choses distinctes : t\'en informer TOI proprement (logs, alertes — avec tous les détails techniques), et répondre au visiteur sobrement (page d\'erreur ou JSON, SANS les détails). En production avec APP_DEBUG=false, cette séparation est une question de sécurité.' },
            { t: 'h3', h: 'Les exceptions métier : de simples classes' },
            { t: 'p', h: 'L\'exception générique `throw new Exception(\'solde insuffisant\')` est un panneau sans nom — impossible à distinguer d\'une panne à l\'arrivée. Une EXCEPTION MÉTIER est une petite classe nommée qui porte le sens : `SoldeInsuffisant`, `CommandeDejaLivree`, `TontineComplete`. Elle peut même porter sa propre RÉPONSE (méthode `render()`) : l\'endroit où elle naît (ton service de tontine) n\'a plus à savoir comment on l\'affiche — il la jette, le protocole fait le reste.' },
            { t: 'code', lang: 'php', label: 'app/Exceptions/SoldeInsuffisant.php', code:
'<?php\n\nnamespace App\\Exceptions;\n\nuse Exception;\n\nclass SoldeInsuffisant extends Exception\n{\n    public function __construct(public readonly int $solde, public readonly int $montant)\n    {\n        parent::__construct(\n            "Solde insuffisant : {$solde} F disponibles pour une demande de {$montant} F."\n        );\n    }\n\n    // (optionnel) sa propre réponse — sans même câbler le handler :\n    public function render($request)\n    {\n        return response()->json([\'erreur\' => \'solde_insuffisant\', \'solde\' => $this->solde], 422);\n    }\n}\n\n// Dans le service métier — clair, testable, typé :\nif ($tontine->solde < $montant) {\n    throw new SoldeInsuffisant($tontine->solde, $montant);\n}' },
            { t: 'h3', h: 'Web ou JSON : la même erreur, deux visages' },
            { t: 'p', h: 'Laravel choisit le FORMAT de la réponse d\'erreur à l\'en-tête `Accept` de la requête : un navigateur reçoit la page 404/500 Blade (personnalisable dans `resources/views/errors/`), un client API reçoit du JSON structuré. `$request->expectsJson()` est l\'interrupteur si tu veux forcer une branche (cas du handler métier ci-dessus). Le principe d\'or de l\'API : le client programme sur TES codes et TES champs (`erreur: solde_insuffisant`) — jamais sur tes messages en clair, que tu dois pouvoir réécrire librement pour les humains.' },
            { t: 'h3', h: 'Les logs : ton journal de bord' },
            { t: 'code', lang: 'php', code:
'use Illuminate\\Support\\Facades\\Log;\n\nLog::info(\'Commande créée\', [\'commande\' => $commande->id, \'montant\' => $total]);\nLog::warning(\'Paiement MoMo lent\', [\'duree_ms\' => $ms, \'operateur\' => \'MTN\']);\nLog::error(\'Échec de livraison zémidjan\', [\n    \'commande\' => $commande->id,\n    \'chauffeur\' => $chauffeur->telephone,\n    \'exception\' => $e->getMessage(),\n]);\n\n// Le contexte STRUCTURÉ (tableaux) est indexable dans un agrégateur\n// (Sentry, Meilisearch des logs…) ; pas besoin de greps sur du texte.\n\n// Storage/logs/laravel.log — en prod : channel « daily » (rotation)\n// + Sentry/Flare pour être ALERTÉ au lieu d\'aller voir quand il est trop tard.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« try/catch partout, c\'est du code défensif. »** Un catch vide ou muet est du SABOTAGE : l\'erreur disparaît, le code continue sur des données fausses. On catch pour RÉAGIR (retenter, compenser, prévenir) — sinon on laisse remonter au gestionnaire central.',
              '**« La 500 est l\'ennemie à éliminer par tous moyens. »** La 500 est le SIGNAL HONNÊTE d\'une panne interne : ton métier, c\'est qu\'elle soit RARE (tests, logs) et SOBRE (page générique — détails dans TES logs). La museler par des catch créerait l\'apparence de santé sur un corps malade.',
              '**« Le client doit savoir pourquoi ça a planté. »** Il doit savoir QU\'AGIR — « réessaie », « contacte-nous ». Les DÉTAILS (requête SQL, chemin de fichier, nom de classe) sont à toi, dans les logs : chaque détail offert au client est un indice gratuit pour un attaquant.',
              '**« abort(404) alors que la commande existe DÉVOILE rien. »** Au contraire : renvoyer 404 (au lieu de 403) sur la ressource d\'autrui ne confirme même pas son existence — c\'est un pattern de confidentialité assumé par beaucoup d\'apps. Ton choix doit être CONSCIENT, pas subi.',
              '**« Logs = var_dump dans un fichier. »** Les logs STRUCTURÉS servent à reconstituer une histoire (quelle commande, quel utilisateur, quelle durée) en filtrant des champs — un `Log::warning` bien placé remplace dix sessions de `dd()` en prod.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le catch qui étouffe le signal, et l\'écho des détails internes au client — les deux faces d\'une même mauvaise conscience.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Trois fils déjà croisés convergent ici : `APP_DEBUG`, réglé dans la fiche Configuration, décide du visage — page détaillée en local, message sobre en production ; les `AuthorizationException` que la fiche Autorisation lèvera deviennent les 403 rendus par ce même gestionnaire central ; et chaque comportement décrit aujourd\'hui se verrouille dans la fiche Tests (`assertStatus(422)`, `assertForbidden()`). La symétrie avec le `try/catch` du module JavaScript te donne un modèle mental unique : une exception REMONTE jusqu\'à un gestionnaire central, et les `catch` semés en chemin qui avalent sans rien dire sont des sabotages — quel que soit le langage.' }
          ],
          errors: [
            { title: 'Le try/catch qui avale tout', lang: 'php', bad:
'try {\n    $paiement = $momo->debiter($montant);\n    $commande->marquerPayee();\n    Mail::to($commande->user)->send(new ConfirmationCommande($commande));\n} catch (\\Throwable $e) {\n    // « au moins ça ne plante pas » — ✗ catastrophe silencieuse :\n    //   paiement débité ? commande marquée ? mail parti ? ON NE SAIT PAS.\n    //   Personne n\'est prévenu, rien n\'est logué, le métier est en\n    //   état incohérent et tu l\'apprendras par un client furieux.\n}', good:
'try {\n    $paiement = $momo->debiter($montant);\n} catch (PaiementException $e) {          // catch PRÉCIS : ce seul type\n    Log::warning(\'Échec MoMo\', [\'commande\' => $commande->id, \'raison\' => $e->getMessage()]);\n    return back()->withErrors(\'Le paiement a échoué — réessaie ou change d\'opérateur.\');\n}\n$commande->marquerPayee();\nMail::to($commande->user)->queue(new ConfirmationCommande($commande));\n// ✓ chaque panne a UN gardien, les autres remontent au handler\n//   central qui logge et alerte — rien ne meurt dans le silence.', why: 'Le catch large est PAYÉ cher en information : il intercepte les pannes inattendues avec le même silence que les pannes prévues — et une application qu\'on croit saine alors qu\'elle échoue en silence est pire qu\'une application qui crie. La doctrine Laravel : catch PRÉCIS pour les fautes attendues (réseau d\'opérateur, carte refusée) avec ACTION compensatoire, et remontée libre au gestionnaire central pour le reste — qui logge, notifie et répond sobrement. Le silence n\'est jamais gratuit : il se paie en confiance plus tard.' },
            { title: 'Retourner $e->getMessage() au client', lang: 'php', bad:
'catch (\\Throwable $e) {\n    return response()->json([\n        \'erreur\' => $e->getMessage(),       // ✗ fuite interne :\n        // "SQLSTATE[42S22]: Column not found: \'solde\'\n        //  (SQL: select solde from tontines where…)"\n        // → structure de la base offerte au monde entier\n    ], 500);\n}', good:
'catch (\\Throwable $e) {\n    Log::error(\'Panne critique\', [\'trace\' => $e]);   // les détails → TES logs\n    report($e);                                       // → Sentry/Flare (alerte)\n    return response()->json([\n        \'erreur\' => \'interne\',\n        \'message\' => \'Un problème est survenu — l\'équipe est prévenue.\',\n        \'reference\' => $reference = str()->uuid(),   // traçabilité pour l\'utilisateur\n    ], 500);\n}\n// ✓ le client reçoit de quoi CONTINUER (une référence à donner au support),\n//   toi tu reçois de quoi RÉPARER (la trace complète côté serveur).', why: 'Le message d\'exception est écrit POUR LE DÉVELOPPEUR — il nomme tables, classes, chemins, requêtes : une carte gratuite de ton infrastructure pour qui sait lire. La bonne séparation des rôles est la règle « horloge cassée » du backend : au client, un signal ACTIONNABLE (code stable, message humain, référence traceable) ; au serveur, la vérité complète (logs structurés + alerte). Les grandes plates-formes font de même — « Something went wrong (ref: abc123) » n\'est pas de la paresse, c\'est de l\'hygiène de sécurité.' }
          ],
          related: ['lv-configuration', 'lv-autorisation', 'lv-tests', 'js-erreurs']
        },
      ]
    },
    /* ==================== 3. BASE DE DONNÉES & ELOQUENT ==================== */
    {
      id: 'base-de-donnees',
      name: 'Base de données & Eloquent',
      icon: 'storage',
      fiches: [
        {
          id: 'lv-migrations',
          title: 'Migrations & schéma',
          icon: 'database',
          level: 'Intermédiaire',
          tagline: 'Le schéma de base en code versionné : créer, modifier, annuler — sans jamais toucher phpMyAdmin.', 
          intro: 'Ta base de données est le bien le plus précieux de l\'application — et pourtant, des générations de développeurs PHP l\'ont façonnée à la souris dans phpMyAdmin, sans historique, sans équipe, sans retour en arrière. Les migrations changent le statut du schéma : **il devient du CODE**, versionné avec Git, rejouable à l\'identique sur n\'importe quelle machine, réversible. Cette fiche te donne le cycle complet — créer, modifier, annuler, reconstruire — avec la règle d\'or du travail en équipe qui évite la catastrophe classique du « je viens d\'éditer une migration lancée il y a trois mois en production ».', 
          blocks: [
            { t: 'h3', h: 'Pourquoi ta base mérite du Git autant que ton code' },
            { t: 'p', h: 'Travailler le schéma à la main (phpMyAdmin, « j\'ajoute la colonne en prod, puis sur ma machine, enfin je crois ») produit trois maux qui finissent TOUJOURS par mordre : les bases dev/prod dérivent (le bug « ça marche chez moi » à l\'état pur) ; une nouvelle recrue met deux jours à reconstruire la base (en devinant ce qui manque) ; et aucun retour en arrière n\'existe quand une colonne mal nommée empoisonne le code. La migration régle les trois d\'un coup : le schéma est DÉCRIT en PHP, chaque changement est un fichier daté joué UNE FOIS partout, et chaque machine — collègue, CI, production — obtient EXACTEMENT la même structure en tapant `php artisan migrate`. Le nouveau venu, lui, tape `migrate:fresh --seed` et a une base complète avec données de démo en trente secondes.' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : Laravel tient un registre — la table `migrations` — listant chaque migration DÉJÀ exécutée sur CETTE base. `migrate` ne rejoue que les fichiers absents du registre : rejouer mille fois la commande est sûr, chaque changement n\'est appliqué qu\'une fois. C\'est ce registre qui rend l\'édition rétroactive si dangereuse (carte d\'erreur en bas) : la base pense avoir déjà joué ce fichier.' },
            { t: 'diagram', title: 'Le registre `migrations` : comment ta base sait ce qui est déjà fait', svg: `<svg viewBox="0 0 680 214">
  <defs><marker id="lv-mig1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="20" width="270" height="186" rx="14" class="dg-b"/>
  <text x="155" y="42" class="dg-t" text-anchor="middle">database/migrations/</text>
  <text x="34" y="70" class="dg-m">2026_01_01_create_users</text>
  <text x="276" y="70" class="dg-ok" text-anchor="end">✔ jouée</text>
  <text x="34" y="96" class="dg-m">2026_02_10_create_produits</text>
  <text x="276" y="96" class="dg-ok" text-anchor="end">✔ jouée</text>
  <text x="34" y="122" class="dg-m">2026_03_02_add_seuil_alerte</text>
  <text x="276" y="122" class="dg-warn" text-anchor="end">en attente…</text>
  <text x="34" y="160" class="dg-ms">(côté fichiers : l'historique complet,</text>
  <text x="34" y="176" class="dg-ms">versionné avec Git)</text>
  <path d="M 292,100 L 336,100" class="dg-ea" marker-end="url(#lv-mig1)"/>
  <text x="314" y="118" class="dg-ms" text-anchor="middle">php artisan</text>
  <text x="314" y="132" class="dg-ms" text-anchor="middle">migrate</text>
  <rect x="342" y="20" width="150" height="186" rx="14" class="dg-b"/>
  <text x="417" y="42" class="dg-t" text-anchor="middle">table migrations</text>
  <text x="417" y="58" class="dg-ms" text-anchor="middle">(le registre)</text>
  <text x="354" y="80" class="dg-m">…users</text><text x="480" y="80" class="dg-ok" text-anchor="end">✔</text>
  <text x="354" y="106" class="dg-m">…produits</text><text x="480" y="106" class="dg-ok" text-anchor="end">✔</text>
  <text x="354" y="132" class="dg-m">…seuil</text><text x="480" y="132" class="dg-tt" text-anchor="end">✔ NOUVEAU</text>
  <path d="M 497,100 L 520,100" class="dg-e" marker-end="url(#lv-mig1)"/>
  <rect x="524" y="20" width="140" height="186" rx="14" class="dg-b"/>
  <text x="594" y="42" class="dg-t" text-anchor="middle">la vraie base</text>
  <text x="538" y="68" class="dg-m">produits :</text>
  <text x="538" y="90" class="dg-ms">· id</text>
  <text x="538" y="108" class="dg-ms">· nom</text>
  <text x="538" y="126" class="dg-ms">· prix</text>
  <text x="538" y="144" class="dg-tt">· + seuil_alerte</text>
</svg>`, caption: '`migrate` compare les fichiers au registre : seule la migration « en attente » est jouée — le schéma gagne sa colonne, le registre sa ligne ✔. Rejouer la commande mille fois ne change plus rien. Et c\'est exactement pour ça qu\'on ne retouche JAMAIS un fichier déjà marqué ✔ : personne ne le relira.' },
            { t: 'h3', h: 'Créer une table : la migration comme contrat' },
            { t: 'code', lang: 'php', label: 'database/migrations/2026_07_22_000001_create_produits_table.php', code:
'<?php\n\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    // up() : ce qu\'il faut FAIRE pour avancer — le contrat « créer »\n    public function up(): void\n    {\n        Schema::create(\'produits\', function (Blueprint $table) {\n            $table->id();                                  // PK auto incrémentée\n            $table->string(\'nom\', 120);\n            $table->string(\'slug\')->unique();\n            $table->unsignedInteger(\'prix\');             // en FRANCS, pas de float !\n            $table->unsignedInteger(\'stock\')->default(0);\n            $table->text(\'description\')->nullable();     // peut être vide\n            $table->boolean(\'promo\')->default(false);\n            $table->foreignId(\'categorie_id\')            // la clé étrangère…\n                  ->constrained()                        // …vers categories.id\n                  ->cascadeOnDelete();                   // catégorie supprimée → produits aussi\n            $table->timestamps();                         // created_at + updated_at\n        });\n    }\n\n    // down() : l\'INVERSE exact — ce qu\'il faut faire pour RECULER\n    public function down(): void\n    {\n        Schema::dropIfExists(\'produits\');\n    }\n};' },
            { t: 'p', h: 'Deux détails à graver. `nullable()` n\'est pas une paresse — c\'est une DÉCISION : toute colonne que le client peut légalement laisser vide doit l\'accepter en base, sinon c\'est la base qui dira non à ta place (avec une exception SQL peu aimable). Et l\'`up/down` en miroir : chaque `up` doit avoir un `down` qui défait proprement — le `rollback` (annulation du dernier lot) en dépend entièrement. Un `down` qui ne fait rien est une porte de sortie condamnée.' },
            { t: 'table', head: ['Type de colonne', 'Usage typique Boutique Awa'], rows: [
              ['`string(n)`', 'noms, slugs, téléphones (varchars courts bornés)'],
              ['`text`', 'descriptions, avis — texte long sans limite pratique'],
              ['`unsignedInteger`', 'prix en F, stocks, quantités (jamais de float pour l\'argent !)'],
              ['`decimal(8,2)`', 'montants DÉCIMALUX quand inévitable (taux, remises)'],
              ['`boolean`', 'drapeaux : promo, visible, livré'],
              ['`json`', 'données semi-structurées : préférences, adresses multiples'],
              ['`dateTime` / `date`', 'livraison prévue, cotisation du mois de…'],
              ['`foreignId` + `constrained()`', 'la clé étrangère standard (voir section 5)']
            ]},
            { t: 'h3', h: 'Modifier une table : la nouvelle migration, jamais l\'histoire' },
            { t: 'p', h: 'La tentation est grande : « la colonne `stock_seuil_alerte` aurait dû être dans la migration des produits, je l\'ajoute DANS le vieux fichier ». STOP. La règle d\'or : **une migration déjà commitée ne se retouche plus** — on ajoute une NOUVELLE migration, datée d\'aujourd\'hui, qui fait la modification. Pourquoi ? Parce que la vieille est peut-être déjà exécutée en production, chez les collègues, en CI : le registre `migrations` dit « fait », personne ne la rejouera — seul ton PC aurait le bon schéma, l\'exact inverse du but des migrations.' },
            { t: 'code', lang: 'php', label: '2026_07_25_000002_add_seuil_alerte_to_produits_table.php', code:
'public function up(): void\n{\n    Schema::table(\'produits\', function (Blueprint $table) {\n        $table->unsignedInteger(\'seuil_alerte\')->default(5)->after(\'stock\');\n    });\n}\n\npublic function down(): void\n{\n    Schema::table(\'produits\', function (Blueprint $table) {\n        $table->dropColumn(\'seuil_alerte\');    // le miroir exact de up()\n    });\n}\n\n// Changer le TYPE d\'une colonne existante :\nSchema::table(\'produits\', function (Blueprint $table) {\n    $table->string(\'nom\', 200)->change();       // nécessite doctrine/dbal\n    // (souvent : faire deux migrations — ajouter une colonne neuve,\n    //  migrer les données, supprimer l\'ancienne — plus sûr)\n});' },
            { t: 'h3', h: 'Les commandes du cycle de vie' },
            { t: 'code', lang: 'php', code:
'php artisan migrate                # jouer les migrations EN ATTENTE (le quotidien)\nphp artisan migrate:status         # qui a tourné, qui attend — avant/après un pull\nphp artisan migrate:rollback       # annuler le DERNIER lot (via les down())\nphp artisan migrate:rollback --step=3   # remonter de 3 lots précisément\n\nphp artisan migrate:fresh          # DANGER : DROP TOUTES les tables puis relance tout\nphp artisan migrate:fresh --seed   # idem + données de démo (le reset dev parfait)\n\n# fresh = données PERDUES : interdit en production, parfait en local.\n# En prod : migrate seul, et des migrations ADDITIONNELLES SÛRES\n# (pas de drop de colonne le même commit que le code qui l\'utilise encore).' },
            { t: 'h3', h: 'Clés étrangères : ordre et responsabilité' },
            { t: 'p', h: 'La contrainte `cascadeOnDelete` soulève la vraie question architecturale : que devient l\'enfant quand le parent disparaît ? La cascade est confortable (supprimer une catégorie nettoie ses produits) mais dangereuse pour les données de valeur : supprimer un client qui effacerait ses commandes détruit ta comptabilité — là, `restrictOnDelete()` (le défaut prudent : refus si des enfants existent) ou `nullOnDelete()` (la commande reste, sans client) sont tes amis. Deuxième loi mécanique : la table RÉFÉRENCÉE doit exister AVANT la table qui la référence — d\'où l\'importance du nommage daté des fichiers (carte d\'erreur en bas).' },
            { t: 'code', lang: 'php', code:
'// Trois politiques, trois métiers différents :\n$table->foreignId(\'categorie_id\')->constrained()->cascadeOnDelete();\n//   supprimer la catégorie → ses produits partent (cohérent si catalogue flexible)\n\n$table->foreignId(\'client_id\')->constrained(\'users\')->restrictOnDelete();\n   // un client AVEC des commandes ne peut pas être supprimé (compta protégée)\n\n$table->foreignId(\'livreur_id\')->nullable()->constrained(\'users\')->nullOnDelete();\n//   le livreur part, la commande reste — son livreur devient « non assigné »' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Les migrations sont pour créer le projet, après je peux bricoler la base. »** Toute évolution du schéma passe par une migration, pour toujours — le jour où tu modifies à la main, les bases dérivent et le registre devient un menteur.',
              '**« migrate:fresh est la commande normale de dev. »** C\'est le RESET nucléaire : toutes les tables droppées. En dev fréquemment utile (repartir propre), en prod c\'est la perte totale de données — Laravel te prévient en prod. Connaître les deux visages de la commande avant de la taper.',
              '**« nullable c\'est sale, il faut des chaînes vides partout. »** Une chaîne vide `\'\'` et `NULL` ne racontent pas la même chose : « le client n\'a pas répondu » vs « pas de donnée ». Modélise honnêtement : NULL pour l\'absence de valeur, une chaîne vide n\'a de sens que si elle EST une réponse.',
              '**« L\'ordre des fichiers ne compte pas, ils ont des dates. »** Il compte : la clé étrangère exige une table parent existante. Une migration de `commandes` DATÉE avant `produits` (ou nommée sans date) plante sur une base fraîche même si tout roule sur la tienne, déjà construite.',
              '**« Je peux éditer la migration et refaire migrate. »** Migrer = rejouer les ABSENTES du registre — ta vieille migration éditée est DANS le registre : ignorée. Pour une correction en plein dev partagé : `migrate:fresh` (données perdues) ou une migration corrective (données sauves).'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les deux fautes d\'histoire : éditer le passé, et voyager les tables dans le désordre.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: '`artisan`, rencontré dès la fiche Fondamentaux, trouve ici sa mission la plus précieuse : versionner ton schéma comme Git versionne ton code. Les tables créées aujourd\'hui deviennent les modèles de la fiche Eloquent — chaque colonne, chaque index, chaque contrainte trouvera son écho dans les casts et les scopes — et chaque `foreignId()->constrained()` pose physiquement une relation que la fiche Relations déclarera ensuite côté modèles. Enfin, garde en mémoire `migrate:fresh` : la fiche Tests le relancera avant chaque test via `RefreshDatabase`, et tes migrations deviendront le filet de sécurité de toute la suite.' }
          ],
          errors: [
            { title: 'Modifier une vieille migration déjà en production', lang: 'php', bad:
'// "la colonne aurait dû s\'appeller seuil_alerte, je corrige"\n// → tu ÉDITES 2026_07_22_000001_create_produits_table.php\n// → localement, migrate:fresh : parfait.\n// → en PROD : la migration est DÉJÀ dans le registre —\n//   jamais rejouée. La colonne garde l\'ancien nom, le code\n//   frais plante : SQLSTATE[42S22] Column not found in prod', good:
'// Règle d\'or post-commit : on n\'édite JAMAIS l\'histoire —\n// on écrit la migration SUIVANTE qui corrige :\n\n// 2026_07_28_rename_stock_threshold_in_produits_table.php\npublic function up(): void\n{\n    Schema::table(\'produits\', function (Blueprint $table) {\n        $table->renameColumn(\'seuil_stock\', \'seuil_alerte\');\n    });\n}\npublic function down(): void\n{\n    Schema::table(\'produits\', function (Blueprint $table) {\n        $table->renameColumn(\'seuil_alerte\', \'seuil_stock\');\n    });\n}\n// → l\'équipe, la CI et la prod appliquent la correction EN ORDRE,\n//   le registre reste un narrateur fiable.', why: 'Le registre `migrations` rend le schéma IDEMPOTENT — chaque fichier joué une fois, dans l\'ordre, partout — mais ce mécanisme repose sur une promesse : le CONTENU d\'un fichier joué ne change plus. L\'édition rétroactive casse cette promesse silencieusement : ta machine (qui refait fresh) et la prod (qui a déjà joué) vivent alors des schémas DIFFÉRENTS avec le même journal — le pire scénario, indétectable avant la mise en production. En dev SOLO, pré-commit et avant tout partage : corrige le fichier et refais fresh. Dès qu\'un collègue, la CI ou la prod a pu jouer la migration : nouvelle migration corrective, jamais d\'édition.' },
            { title: 'Ordre des migrations : la clé étrangère avant la table', lang: 'php', bad:
'// 2026_07_22_000001_create_commandes_table.php  → DATÉE AVANT produits\nSchema::create(\'commandes\', function (Blueprint $table) {\n    $table->id();\n    $table->foreignId(\'produit_id\')->constrained();   // — CRASH —\n    // SQLSTATE[HY000]: Cannot add foreign key constraint\n    // — la table produits n\'existe pas ENCORE sur une base fraîche\n});', good:
'// Le parent D\'ABORD, l\'enfant ENSUITE — les dates de fichier le garantissent :\n//   2026_07_22_000001_create_produits_table.php      (parent)\n//   2026_07_22_000002_create_commandes_table.php     (enfant)\n\n// Ou, quand l\'ordre historique est déjà cassé : déplacer la contrainte\n// dans une migration TARDIVE dédiée :\nSchema::table(\'commandes\', function (Blueprint $table) {\n    $table->foreign(\'produit_id\')->references(\'id\')->on(\'produits\');\n});', why: 'Les migrations s\'exécutent STRICTEMENT dans l\'ordre alphabétique (donc chronologique avec le nommage daté par défaut), et une contrainte de clé étrangère exige que la table référencée EXISTE au moment de la création. Naïvement, tu testes toujours sur ta base déjà construite — l\'erreur n\'apparaît que sur une base VIDE : chez la nouvelle recrue, dans la CI, sur le nouveau serveur de prod. Deux garde-fous : `migrate:fresh` régulier en CI (tout rejoué de zéro — l\'ordre se vérifie tout seul) et le réflexe de créer les parents avant les enfants dès le nommage des fichiers.' }
          ],
          related: ['lv-eloquent', 'lv-relations', 'lv-fondamentaux', 'lv-tests']
        },
        {
          id: 'lv-eloquent',
          title: 'Eloquent : modèles & requêtes',
          icon: 'storage',
          level: 'Intermédiaire',
          tagline: 'Un modèle = une table : requêtes fluides, mass assignment, casts et accessors/mutators.', 
          intro: 'Eloquent est l\'ORM de Laravel : chaque table devient une classe, chaque ligne un objet, chaque requête une phrase fluide en PHP. `Produit::where(\'promo\', true)->orderBy(\'nom\')->paginate(20)` se lit comme de la prose — alors que la même requête en SQL brut exige chaînage de strings, échappement et mapping manuel ligne par ligne. Cette fiche te donne le fonctionnement complet du modèle : les conventions qui le font marcher gratuitement, les requêtes du quotidien (avec la garde `paginate` contre `all`), le mass assignment sécurisé, les scopes qui nomment tes filtres, et les casts/accessors qui adaptent les valeurs à la frontière.', 
          blocks: [
            { t: 'h3', h: 'Le modèle minimal — et les conventions qui le font marcher' },
            { t: 'p', h: 'Eloquent respecte la philosophie « convention sur configuration » au sommet : une classe VIDE de 10 lignes fonctionne ENTIÈREMENT, si tu respectes ses habitudes de nommage. La classe `Produit` (singulier, PascalCase) correspond à la table `produits` (pluriel, snake_case) ; la clé primaire s\'appelle `id` ; les colonnes `created_at`/`updated_at` sont remplies MAGICIEMENT à chaque sauvegarde. Respecte les conventions : zéro configuration. Déroge (table au singulier, clé `code_produit`) : dis-le explicitement — trois propriétés suffisent, lisibles au premier regard.' },
            { t: 'code', lang: 'php', label: 'app/Models/Produit.php — la forme minimale qui marche', code:
'<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass Produit extends Model\n{\n    // Rien d\'autre n\'est REQUIS, grâce aux conventions :\n    //   table       → produits         (déduite du nom de classe)\n    //   clé prim.   → id               (auto-incrémentée)\n    //   timestamps  → created_at / updated_at gérés tout seuls\n\n    // La SEULE chose à décider : le mass assignment (sécurité)\n    protected $fillable = [\n        \'nom\', \'slug\', \'prix\', \'stock\', \'description\', \'categorie_id\',\n    ];\n\n    // Les casts : la valeur PHP native à la frontière de la base\n    protected $casts = [\n        \'promo\'     => \'boolean\',\n        \'prix\'      => \'integer\',\n        \'options\'   => \'array\',          // colonne json → tableau PHP\n        \'publie_le\' => \'date\',\n    ];\n}\n\n// Dérogations explicites, si besoin :\n// protected $table = \'catalogue_produits\';\n// protected $primaryKey = \'code\';\n// public $timestamps = false;' },
            { t: 'diagram', title: 'Ce qu\'est un ORM : des tables SQL transformées en objets PHP', svg: `<svg viewBox="0 0 680 230">
  <defs><marker id="lv-el1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="30" y="38" class="dg-t">la table SQL : produits</text>
  <rect x="30" y="50" width="44" height="24" class="dg-ba"/><rect x="74" y="50" width="108" height="24" class="dg-ba"/><rect x="182" y="50" width="76" height="24" class="dg-ba"/>
  <text x="52" y="66" class="dg-t" text-anchor="middle">id</text><text x="128" y="66" class="dg-t" text-anchor="middle">nom</text><text x="220" y="66" class="dg-t" text-anchor="middle">prix</text>
  <rect x="30" y="74" width="44" height="24" class="dg-b"/><rect x="74" y="74" width="108" height="24" class="dg-b"/><rect x="182" y="74" width="76" height="24" class="dg-b"/>
  <text x="52" y="90" class="dg-m" text-anchor="middle">1</text><text x="128" y="90" class="dg-m" text-anchor="middle">Gari</text><text x="220" y="90" class="dg-m" text-anchor="middle">21000</text>
  <rect x="30" y="98" width="44" height="24" class="dg-b"/><rect x="74" y="98" width="108" height="24" class="dg-b"/><rect x="182" y="98" width="76" height="24" class="dg-b"/>
  <text x="52" y="114" class="dg-m" text-anchor="middle">2</text><text x="128" y="114" class="dg-m" text-anchor="middle">Huile</text><text x="220" y="114" class="dg-m" text-anchor="middle">6500</text>
  <text x="312" y="52" class="dg-tt" text-anchor="middle">Eloquent</text>
  <text x="312" y="68" class="dg-ms" text-anchor="middle">(l'ORM de Laravel)</text>
  <path d="M 258,86 C 300,74 330,66 366,68" class="dg-e dg-dash" marker-end="url(#lv-el1)"/>
  <path d="M 258,110 C 300,120 330,132 366,134" class="dg-e dg-dash" marker-end="url(#lv-el1)"/>
  <rect x="366" y="56" width="290" height="48" rx="12" class="dg-b"/>
  <text x="511" y="78" class="dg-t" text-anchor="middle">objet Produit #1</text>
  <text x="511" y="96" class="dg-ms" text-anchor="middle">{ id: 1, nom: 'Gari', prix: 21000 }</text>
  <rect x="366" y="122" width="290" height="48" rx="12" class="dg-b"/>
  <text x="511" y="144" class="dg-t" text-anchor="middle">objet Produit #2</text>
  <text x="511" y="162" class="dg-ms" text-anchor="middle">{ id: 2, nom: 'Huile', prix: 6500 }</text>
  <text x="511" y="196" class="dg-m" text-anchor="middle">la classe Produit parle à la TABLE entière —</text>
  <text x="511" y="214" class="dg-ms" text-anchor="middle">et chaque LIGNE devient un objet avec ses attributs</text>
</svg>`, caption: '**ORM** = « Object-Relational Mapping » : le traducteur officiel entre le monde SQL (tables, lignes) et le monde PHP (classes, objets). Fini le SQL à la main et la copie de chaque champ : `Produit::all()` retourne une **collection** d\'objets (un tableau enrichi, avec des méthodes pratiques), et `$produit->prix` lit la colonne directement. Tu parles PHP, Eloquent parle SQL.' },
            { t: 'h3', h: 'Les requêtes du quotidien — fluides et lisibles' },
            { t: 'code', lang: 'php', code:
'// Trouver UNE ligne (par clé primaire) — avec le 404 honnête :\n$produit = Produit::findOrFail($id);\n\n// Filtrer — la phrase fluide du query builder Eloquent :\n$promos = Produit::where(\'promo\', true)\n    ->where(\'stock\', \'>\', 0)\n    ->orderBy(\'nom\')\n    ->paginate(20);                          // JAMAIS all() en prod\n\n// Le premier qui matche (ou la création si absent) :\n$categorie = Categorie::firstOrCreate([\'nom\' => \'Céréales\']);\n\n// Le contenu brut pour un select HTML :\n$categories = Categorie::orderBy(\'nom\')->pluck(\'nom\', \'id\');\n// → collection [1 => \'Céréales\', 2 => \'Huiles\', …]\n\n// Créer (mass assignment sécurisé) / mettre à jour / supprimer :\n$produit = Produit::create($request->validated());     // fiche Validation\n$produit->update([\'stock\' => $produit->stock - $quantite]);\n$produit->delete();\n\n// Compter, sommer — la base travaille, pas PHP :\nProduit::where(\'promo\', true)->count();\nProduit::sum(\'prix\');' },
            { t: 'callout', kind: 'warn', h: '`paginate()` est la règle d\'hygiène de toute liste côté serveur : `Produit::all()` charge TOUTE la table en mémoire — anodin avec 12 produits, fatal avec 40 000 (la 500 en prod, le samedi soir). En bonus, `{{ $produits->links() }}` dans Blade rend toute la pagination, styles inclus.' },
            { t: 'h3', h: 'Mass assignment : la frontière à bien garder' },
            { t: 'p', h: '`create($tableau)` remplit le modèle d\'un coup — pratique et dangereux si le tableau vient de la requête sans filtrage (la fiche Validation insiste déjà). `$fillable` déclare la LISTE BLANCHE des attributs remplissables en masse : tout autre champ passé est silencieusement ignoré. La meilleure architecture combine les DEUX garde-fous : `validated()` à l\'entrée (la requête ne contient que ce que tu as déclaré — fiche Validation) ET `$fillable` dans le modèle (paranoïa structurelle si un jour `validated()` est contourné).' },
            { t: 'h3', h: 'Scopes : donner un nom à tes filtres' },
            { t: 'code', lang: 'php', code:
'// Dans app/Models/Produit.php — le filtre devient du vocabulaire :\npublic function scopeEnStock($query)\n{\n    return $query->where(\'stock\', \'>\', 0);\n}\n\npublic function scopeRecherche($query, string $terme)\n{\n    return $query->where(\'nom\', \'like\', "%{$terme}%");\n}\n\n// À l\'usage, la requête LIT comme la phrase qu\'elle exécute :\nProduit::enStock()->recherche($q)->paginate(20);\n// au lieu de (re)écrire les where dans chaque contrôleur —\n// et un jour la règle « en stock » change de formule : UN endroit.' },
            { t: 'h3', h: 'Accessors & mutators : la valeur qui s\'adapte à la frontière' },
            { t: 'code', lang: 'php', code:
'// Dans app/Models/Produit.php — syntaxe Laravel 9+ :\nuse Illuminate\\Database\\Eloquent\\Casts\\Attribute;\n\n// ACCESSOR : la base stocke, PHP compose —\nprotected function prixFormate(): Attribute\n{\n    return Attribute::get(fn () =>\n        number_format($this->prix, 0, \',\', \' \') . \' F\'\n    );\n}\n//   $produit->prix_formate  →  « 21 000 F »   (la colonne reste 21000)\n\n// MUTATOR : PHP compose, la base stocke —\nprotected function slug(): Attribute\n{\n    return Attribute::set(fn ($value) => str()->slug($value ?: $this->nom));\n}\n\n// Casts (rappel du modèle) : le passage natif <-> stockage —\n//   \'options\' => \'array\'      json dans la base, tableau en PHP\n//   \'publie_le\' => \'date\'     string SQL → objet Carbon\n//   \'promo\' => \'boolean\'      0/1 → vrai booléen' },
            { t: 'p', h: 'Sous le capot : le modèle fait référence à la fois à l\'objet (ton produit) et au lanceur de requêtes (`Produit::where(…)` démarre un query builder Eloquent). Cette dualité est le prix d\'entrée mental : les méthodes STATIQUES parlent à la table, les méthodes d\'INSTANCE à la ligne. Eloquent gère le passage entre les deux avec élégance, mais quand tu écris tes propres méthodes sur le modèle, choisis consciemment ton camp : scope (requête, statique-de-fait) ou accessor/mutator (instance).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Le modèle est juste un conteneur de données. »** C\'est le vocabulaire métier de ta base : scopes (filtres nommés), accessors (valeurs composées), relations (fiche suivante) — plus le modèle parle ton métier, moins les contrôleurs se répètent.',
              '**« firstOrCreate est magique et toujours juste. »** Il fait DEUX requêtes (SELECT puis INSERT si absent) — en concurrence (deux clients simultanés), le doublon passe. La garantie réelle exige `UNIQUE` en base (migration) et `updateOrCreate` ou gestion d\'exception.',
              '**« $fillable est du détail, je mets tout pour aller vite. »** `$fillable` + `$request->validated()` forment LA frontière du mass assignment — la fiche Validation a consacré une carte d\'erreur entière à `$request->all()`. Les deux vont ensemble, jamais l\'un sans l\'autre.',
              '**« all() n\'est lent que sur les grosses tables. »** all() est une BOMBE À RETARDEMENT : la table grossit chaque jour, et ta 12-lignes-de-produits d\'aujourd\'hui est la 40 000-lignes-qui-tue-le-serveur de l\'année prochaine. paginate() n\'a pas d\'excuse à l\'écriture.',
              '**« accessors = colonnes calculées, il faut les mettre en SQL. »** Un accessor ne stocke RIEN : il compose à la lecture en PHP (et n\'est donc PAS requêtable en SQL). Une vraie colonne dérivée s\'écrit en migration (ou générée) si tu dois filtrer dessus — choisis l\'outil selon l\'usage.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le fillable manquant qui fait semblant de sauvegarder, et le all() qui couche le serveur — deux cartes, deux réflexes de survie.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Chaque modèle est le miroir PHP d\'une table que la fiche Migrations a dessinée — `$fillable` protège ce que la migration a créé, `$casts` relit fidèlement ses types. Les règles `unique` et `exists` de la fiche Validation dialoguent avec ces mêmes tables, et tout ce que tu viens d\'apprendre (scopes, requêtes, collections) sera sérialisé proprement par la fiche API Resources quand la Boutique Awa exposera son JSON. La suite directe est la fiche Relations : un modèle seul, c\'est une fiche produit ; des modèles reliés, c\'est tout le marché Dantokpa.' }
          ],
          errors: [
            { title: 'create() silencieusement vide — la $fillable manquante', lang: 'php', bad:
'$produit = Produit::create($request->validated());\n// → MassAssignmentException ? Non, pire : certains champs PASSENT,\n//   d\'autres sont SILENCIEUSEMENT ignorés. Le produit est créé\n//   avec prix=null, stock=null, description=null — sans un mot.\n// ✗ « Mon formulaire ne marche pas » : c\'est fillable qui trie.', good:
'// app/Models/Produit.php — la liste blanche DÉCLARÉE :\nprotected $fillable = [\n    \'nom\', \'slug\', \'prix\', \'stock\', \'description\', \'categorie_id\',\n];\n\n// Et la double protection systématique :\n$produit = Produit::create($request->validated());\n//   validated() filtre À L\'ENTRÉE (la requête n\'a que les champs),\n//   $fillable filtre AU MODÈLE (paranoïa structurelle).\n// → chaque champ écrit est déclaré DEUX FOIS : impossible à oublier,\n//   impossible à détourner.', why: 'Par défaut Eloquent refuse TOUTE injection massive (le `MassAssignmentException`) — la tentation est d\'élargir `$fillable` ou `$guarded = []` « pour avancer », sans comprendre que le mécanisme exige une DÉCLARATION. Le vrai piège est le silence : ni exception ni log, juste des colonnes vides qui ont l\'air d\'un bug de formulaire pendant que le mass assignment tient bon. Les deux protections ne se compensent pas, elles se complètent : validated() garantit l\'entrée, $fillable garantit le modèle — et six mois plus tard, c\'est cette redondance qui sauve la boutique quand un nouveau dev ajoute un champ sensible au formulaire sans mesurer la portée.' },
            { title: 'Post::all() sur une grande table', lang: 'php', bad:
'public function index()\n{\n    // 12 produits en dev → 40 000 en prod deux ans plus tard :\n    $produits = Produit::all();        // ✗ TOUT en mémoire,\n    //   chaque fois : 50 Mo d\'objets, la 500 qui dort depuis le début,\n    //   réveillée le samedi de Noël quand le pic arrive.\n    return view(\'produits.index\', [\'produits\' => $produits]);\n}', good:
'public function index()\n{\n    $produits = Produit::query()\n        ->when(request(\'q\'), fn ($query) => $query->recherche(request(\'q\')))\n        ->orderBy(\'nom\')\n        ->paginate(20);                   // ✓ la base filtre et page\n    return view(\'produits.index\', [\'produits\' => $produits]);\n}\n// + {{ $produits->links() }} dans Blade : la pagination complète\n//   est déjà écrite — styles compris.', why: '`all()` n\'est pas un raccourci, c\'est un pari : « cette table restera petite ». Le pari est TOUJOURS perdu avec le temps — et, pire, il est perdu SILENCIEUSEMENT : tout fonctionne jusqu\'au jour où la mémoire du serveur rend l\'âme sous le pic de charge. paginate() retourne une collection enrichie qui sait déjà produire sa navigation (la ligne Blade en bas) — le coût d\'écriture est le même que all(), le coût d\'absence est la panne. Apprends aussi `cursor()` pour les exports géants (une ligne à la fois en mémoire) — le même instinct : la base travaille, PHP promenade.' }
          ],
          related: ['lv-migrations', 'lv-relations', 'lv-validation', 'lv-api-resources']
        },
        {
          id: 'lv-relations',
          title: 'Relations Eloquent',
          icon: 'schema',
          level: 'Avancé',
          tagline: 'hasMany, belongsTo, belongsToMany — et l\'eager loading qui tue le N+1.', 
          intro: 'Une base relationnelle est un TISSU : catégories → produits, produits <-> commandes, clients → tontines. Eloquent transforme ces liens en propriétés PHP naturelles : `$commande->produits`, `$produit->categorie->nom`. La magie a un prix d\'entrée — comprendre qui porte la clé — et un piège classique qui attend chaque débutant au premier affichage de liste : le problème N+1, où une scène de 20 lignes coûte 41 requêtes SQL. Cette fiche donne les trois relations du quotidien, la table pivot avec ses données, et le remède chirurgical au N+1.', 
          blocks: [
            { t: 'h3', h: 'One-to-many : le couple hasMany / belongsTo' },
            { t: 'p', h: 'La relation la plus fréquente : UNE catégorie a PLUSIEURS produits, et chaque produit APPARTIENT à une catégorie. La clé de lecture à graver : **la clé étrangère vit chez l\'enfant** (le produit porte `categorie_id` — la fiche Migrations l\'a créée). Du côté Eloquent, chacun des deux modèles DÉCLARE son versant : le parent dit `hasMany`, l\'enfant répond `belongsTo`. Ce couple n\'est pas de la redondance : il donne LES DEUX sens de lecture — `$categorie->produits` ET `$produit->categorie` — en deux lignes chacune.' },
            { t: 'code', lang: 'php', code:
'// app/Models/Categorie.php — le PARENT\nclass Categorie extends Model\n{\n    public function produits()\n    {\n        return $this->hasMany(Produit::class);   // « j\'ai PLUSIEURS »\n    }\n}\n\n// app/Models/Produit.php — l\'ENFANT (il porte la clé categorie_id)\nclass Produit extends Model\n{\n    public function categorie()\n    {\n        return $this->belongsTo(Categorie::class);   // « j\'appartiens À »\n    }\n}\n\n// À l\'usage — les deux sens, tout aussi naturels :\n$categorie->produits()->where(\'stock\', \'>\', 0)->get();\n$produit->categorie->nom;                      // « Céréales »\n\n// ATTENTION à la nuance PROPERTY vs MÉTHODE :\n//   $categorie->produits      → COLLECTION déjà chargée (lazy)\n//   $categorie->produits()    → QUERY BUILDER (tu continues à filtrer)' },
            { t: 'h3', h: 'Many-to-many : la table pivot avec ses données' },
            { t: 'p', h: 'Une commande a PLUSIEURS produits, un produit apparaît dans PLUSIEURS commandes — la relation many-to-many exige une TABLE PIVOT entre les deux (créée en migration : `commande_produit` avec ses deux clés + des COLONNES MÉTIER : la quantité commandée, le prix AU MOMENT de l\'achat). Eloquent la rend invisible quand tu n\'en as pas besoin, accessible quand tu en as : `belongsToMany` des deux côtés, `->withPivot()` pour lire, `attach`/`sync` pour écrire.' },
            { t: 'code', lang: 'php', code:
'// app/Models/Commande.php\npublic function produits()\n{\n    return $this->belongsToMany(Produit::class)\n        ->withPivot(\'quantite\', \'prix_unitaire\')   // les données DU LIEN\n        ->withTimestamps();\n}\n\n// Attacher un produit AU PANIER avec ses données de lien :\n$commande->produits()->attach($produit->id, [\n    \'quantite\' => 3,\n    \'prix_unitaire\' => $produit->prix,   // figé à l\'instant de l\'achat !\n]);\n\n// Synchroniser (remplacer TOUT le contenu — le fidèle du panier) :\n$commande->produits()->sync([\n    $idGari  => [\'quantite\' => 2, \'prix_unitaire\' => 21000],\n    $idHuile => [\'quantite\' => 1, \'prix_unitaire\' => 6500],\n]);\n\n// Lire : la ligne de commande est un produit + ses données pivot\nforeach ($commande->produits as $ligne) {\n    echo $ligne->nom, \' × \', $ligne->pivot->quantite,\n         \' = \', $ligne->pivot->prix_unitaire * $ligne->pivot->quantite;\n}' },
            { t: 'callout', kind: 'tip', h: 'La colonne `prix_unitaire` au pivot n\'est PAS de la duplication bête : c\'est de l\'HISTORIQUE. Le prix du catalogue changera la semaine prochaine ; ta commande livrée doit se souvenir du prix du jour de l\'achat. La règle : copie les valeurs d\'instantané (montants, taux, adresses) dans le pivot — et référence, ne copie pas, ce qui doit rester vivant.' },
            { t: 'diagram', title: 'Les trois relations du quotidien, posées sur le schéma', svg: `<svg viewBox="0 0 680 250">
  <defs><marker id="lv-rel1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="30" y="30" width="180" height="54" rx="12" class="dg-b"/>
  <text x="120" y="52" class="dg-t" text-anchor="middle">CATEGORIES</text>
  <text x="120" y="70" class="dg-ms" text-anchor="middle">id · nom</text>
  <rect x="270" y="30" width="190" height="54" rx="12" class="dg-b"/>
  <text x="365" y="52" class="dg-t" text-anchor="middle">PRODUITS</text>
  <text x="365" y="70" class="dg-ms" text-anchor="middle">id · nom · categorie_id</text>
  <rect x="30" y="140" width="180" height="54" rx="12" class="dg-b"/>
  <text x="120" y="162" class="dg-t" text-anchor="middle">COMMANDES</text>
  <text x="120" y="180" class="dg-ms" text-anchor="middle">id · client_id · date</text>
  <rect x="270" y="140" width="190" height="72" rx="12" class="dg-ba"/>
  <text x="365" y="160" class="dg-t" text-anchor="middle">commande_produit (pivot)</text>
  <text x="365" y="178" class="dg-ms" text-anchor="middle">commande_id · produit_id</text>
  <text x="365" y="196" class="dg-tt" text-anchor="middle">+ quantite · prix_unitaire</text>
  <path d="M 210,57 L 268,57" class="dg-e" marker-end="url(#lv-rel1)"/>
  <text x="226" y="50" class="dg-t">1</text><text x="254" y="50" class="dg-t">N</text>
  <text x="240" y="80" class="dg-ms" text-anchor="middle">hasMany / belongsTo</text>
  <path d="M 210,167 L 268,167" class="dg-e" marker-end="url(#lv-rel1)"/>
  <text x="226" y="160" class="dg-t">1</text><text x="254" y="160" class="dg-t">N</text>
  <path d="M 365,84 L 365,138" class="dg-e" marker-end="url(#lv-rel1)"/>
  <text x="353" y="106" class="dg-t">1</text><text x="353" y="130" class="dg-t">N</text>
  <text x="476" y="166" class="dg-ms">le prix du LIEN, figé</text>
  <text x="476" y="182" class="dg-ms">au moment de l'achat</text>
  <text x="340" y="234" class="dg-m" text-anchor="middle">le pivot rend possible la relation plusieurs-à-plusieurs commandes ⇔ produits</text>
</svg>`, caption: 'La règle d\'or de lecture : **la clé étrangère vit chez l\'enfant** — produits porte categorie_id, le pivot porte les deux clés. Et la table pivot n\'est pas qu\'un « tuyau » : elle stocke les données DU LIEN (la quantité, le prix figé à l\'achat). Voilà pourquoi belongsToMany existe : cette table est obligatoire physiquement, Eloquent la rend simplement invisible quand tu n\'as pas besoin de ses données.' },
            { t: 'h3', h: 'LE piège : le N+1, et l\'eager loading qui le tue' },
            { t: 'p', h: 'Scène de crime connue d\'avance : ta vue liste 20 commandes et affiche le client de chacune (`$commande->user->name` dans la boucle Blade). Eloquent exécute 1 requête pour les commandes… puis **une requête PAR LIGNE** pour aller chercher chaque client : 21 requêtes pour une page, chaque requête ajoutant sa latence. Avec 100 lignes, 101 requêtes — et ton hébergeur partagé de Cotonou toussote. C\'est le problème N+1 : le coût caché du chargement PARESSEUX (lazy loading), invisible tant qu\'on ne compte pas les requêtes.' },
            { t: 'code', lang: 'php', code:
'// AVANT (N+1) : la relation est chargée À CHAQUE TOUR dans la vue\n$commandes = Commande::paginate(20);\n// la vue fera 20 requêtes supplémentaires, une par $commande->user\n\n// APRÈS : with() charge TOUT en 2 requêtes — la relation PRÉ-CHARGÉE :\n$commandes = Commande::with(\'user\')->paginate(20);\n//   requête 1 : SELECT * FROM commandes LIMIT 20\n//   requête 2 : SELECT * FROM users WHERE id IN (1, 7, 9, …)\n//   puis Eloquent COUSIT : chaque commande reçoit son user. Fini.\n\n// plusieurs relations : ->with(\'user\', \'produits\')\n// relation imbriquée : ->with(\'produits.categorie\')\n// colonnes limitées : ->with(\'user:id,name\')   (précise toujours l\'id !)\n// compter SANS charger : ->withCount(\'produits\')   $categorie->produits_count' },
            { t: 'diagram', title: 'Le N+1 en chiffres : 21 requêtes contre 2, pour la MÊME page', svg: `<svg viewBox="0 0 680 214">
  <defs><marker id="lv-rel2" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="20" y="40" class="dg-t">SANS with() — le chargement paresseux (lazy)</text>
  <rect x="20" y="52" width="160" height="40" rx="10" class="dg-b"/>
  <text x="100" y="76" class="dg-m" text-anchor="middle">SELECT * FROM commandes</text>
  <path d="M 180,72 L 204,72" class="dg-e" marker-end="url(#lv-rel2)"/>
  <rect x="206" y="52" width="190" height="40" rx="10" class="dg-b"/>
  <text x="301" y="76" class="dg-m" text-anchor="middle">users : 1 requête PAR commande</text>
  <path d="M 396,72 L 428,72" class="dg-ko" marker-end="url(#lv-rel2)"/>
  <rect x="430" y="52" width="150" height="40" rx="20" class="dg-b"/>
  <text x="505" y="77" class="dg-ko" text-anchor="middle">= 21 requêtes !</text>
  <text x="20" y="136" class="dg-t">AVEC with('user') — l'eager loading</text>
  <rect x="20" y="148" width="200" height="40" rx="10" class="dg-b"/>
  <text x="120" y="172" class="dg-m" text-anchor="middle">SELECT commandes LIMIT 20</text>
  <path d="M 220,168 L 244,168" class="dg-e" marker-end="url(#lv-rel2)"/>
  <rect x="246" y="148" width="230" height="40" rx="10" class="dg-b"/>
  <text x="361" y="172" class="dg-ms" text-anchor="middle">SELECT users WHERE id IN (1, 7, 9, …)</text>
  <path d="M 476,168 L 500,168" class="dg-e" marker-end="url(#lv-rel2)"/>
  <rect x="502" y="148" width="120" height="40" rx="20" class="dg-b"/>
  <text x="562" y="173" class="dg-ok" text-anchor="middle">= 2 requêtes ✓</text>
  <text x="340" y="208" class="dg-ms" text-anchor="middle">puis Eloquent COUSIT le tout en mémoire : la vue boucle sans requêter de plus</text>
</svg>`, caption: 'Le lazy loading relance une requête SQL à CHAQUE tour de boucle — inoffensif avec 3 lignes en dev, catastrophique avec 200 en production. `with(\'user\')` dit à Eloquent : « charge les relations MAINTENANT, par lots » — deux requêtes quelle que soit la taille de la liste. D\'où le réflexe : une relation utilisée dans une boucle = un with() dans la requête.' },
            { t: 'callout', kind: 'info', h: 'Laravel 11 peut TE PROTÉGER structurellement : `Model::preventLazyLoading(!app()->isProduction())` (dans AppServiceProvider) lève une exception dès qu\'une relation est chargée à la paresse en dev — tu découvres chaque N+1 à l\'écriture, jamais en prod. Et pour compter les requêtes pendant le dev : Laravel Telescope ou la barre de debug Clockwork — une page qui en fait plus de 5 vous dévisage.' },
            { t: 'h3', h: 'Arbres plus profonds : hasManyThrough, morphTo (repères)' },
            { t: 'p', h: 'Deux relations moins quotidiennes à connaître de nom : `hasManyThrough` (« les commandes DE MES produits » en traversant la boutique — `$boutique->commandes()` sans rattacher les commandes directement à la boutique) et les relations POLYMORPHES (`avisables` : des avis attachés indifféremment à un produit OU à une boutique — une table, une colonne type + id). Garde-les pour le jour précis où ton schéma les appelle — et reviens d\'abord vérifier qu\'une relation SIMPLE ne suffisait pas : la moitié des polymorphes du débutant sont des tables classiques qui manquaient.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« La relation est une propriété magique — elle coûte rien. »** Chaque accès lazy EST une requête SQL. La propriété donne l\'illusion de la gratuité ; `with()` rend le coût visible et groupé.',
              '**« belongsToMany n\'a pas besoin de table intermédiaire. »** La table pivot est OBLIGATOIRE physiquement (elle vit en migration) — Eloquent la rend conceptuellement invisible en lecture, accessible via `pivot` quand elle porte des données.',
              '**« hasMany seul suffit, belongsTo est du clichet. »** Les deux versants servent LES DEUX sens : sans `belongsTo`, `$produit->categorie` n\'existe pas — tu dois requêter à la main. Deux lignes, deux directions.',
              '**« $categorie->produits()->get() et $categorie->produits sont pareils. »** Le premier est une REQUÊTE fraîche en base (filtrable avant exécution) ; le second la collection ACTUELLEMENT chargée en mémoire (filtrable en PHP, mais la requête est partie).',
              '**« Eager loading = toujours tout charger en avance. »** Non : charger préventivement ce qui ne sert pas gaspille autant que le N+1 (mémoire, jointures). La règle : with() là où la vue utilise des relations dans une boucle — seulement là.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le N+1 que la vue révèle après coup, et le belongsTo planté du mauvais côté — les deux rites de passage d\'Eloquent.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les clés étrangères posées dans les migrations prennent ici leur nom et leur vie côté Eloquent — `hasMany`, `belongsTo`, `belongsToMany` ne font que déclarer ce que `constrained()` a déjà câblé. Le monstre N+1 que tu viens de dompter avec `with()` réapparaîtra sous le nom `whenLoaded` dans la fiche API Resources : même combat, autre canal, et `Model::preventLazyLoading` restera ton chien de garde dans les deux cas. La fiche Tests te donnera enfin le dernier outil : compter les requêtes dans un test pour PROUVER qu\'une page reste sobre, au lieu de le sentir.' }
          ],
          errors: [
            { title: 'Boucle + relation = N+1 (l\'erreur n°1 d\'Eloquent)', lang: 'php', bad:
'public function index()\n{\n    $commandes = Commande::paginate(20);          // ✗ vue chargée lazy\n    return view(\'commandes.index\', compact(\'commandes\'));\n}\n\n{{-- dans la vue :\n@foreach ($commandes as $commande)\n    <li>{{ $commande->user->name }} — {{ $commande->produits->count() }} articles</li>\n@endforeach\n→ 1 + 20 (users) + 20 (produits) = 41 requêtes pour 1 page --}}', good:
'public function index()\n{\n    $commandes = Commande::with([\'user:id,name\'])\n        ->withCount(\'produits\')                  // compte SANS charger les lignes\n        ->paginate(20);\n    return view(\'commandes.index\', compact(\'commandes\'));\n}\n\n{{-- la vue, à peine modifiée — et 2 requêtes au lieu de 41 :\n@foreach ($commandes as $commande)\n    <li>{{ $commande->user->name }} — {{ $commande->produits_count }} articles</li>\n@endforeach --}}', why: 'Le lazy loading est confortable au démarrage puis systématiquement punitif à l\'échelle — et le symptôme n\'apparaît qu\'avec du volume réel, en production (en dev, 12 lignes passent inaperçues). Le remède n\'est pas de charger « plus partout » mais de rendre le coût CONSCIENT : `preventLazyLoading` en dev te signale l\'oubli au moment de l\'écriture, `with()` pré-charge par lots IN (2 requêtes), `withCount()` évite de charger des lignes pour les compter. Recycler : si tu écris une relation dans une boucle, elle mérite un with() dans la requête.' },
            { title: 'belongsTo du mauvais côté', lang: 'php', bad:
'// "le produit appartient à la catégorie, la catégorie a un produit" :\nclass Categorie extends Model\n{\n    public function produit()           // ✗ mauvais versant +\n    {                                   //   mauvais pluriel :\n        return $this->belongsTo(Produit::class);   // cherche produit_id\n    }                                   //   sur la table categories…\n}                                       //   qui ne l\'a PAS → toujours null\n\n// La logique s\'inverse à la lecture : produit->categorie OK,\n// categorie->produits introuvable.', good:
'// Le sens se DÉDUIIT de la clé de la migration :\n//   produits.categorie_id  →  le PRODUIT porte la clé.\n\nclass Categorie extends Model\n{\n    public function produits()          // hasMany : la catégorie\n    {                                   // en a PLUSIEURS\n        return $this->hasMany(Produit::class);\n    }\n}\n\nclass Produit extends Model\n{\n    public function categorie()         // belongsTo : le produit\n    {                                   // appartient À UNE\n        return $this->belongsTo(Categorie::class);\n    }\n}', why: 'Le couple hasMany/belongsTo n\'est pas décoratif : il reflète le SCHÉMA physique. La clé étrangère `categorie_id` vit SUR la table products (fiche Migrations) — donc l\'enfant EST Produit, et c\'est lui qui `belongsTo`. L\'inverse (mettre belongsTo sur la catégorie) fait chercher à Eloquent une colonne `produit_id` dans la table categories — silencieusement nulle partout. La phrase de vérification à te répéter : « la clé est CHEZ QUI ? » — celui qui la porte says belongsTo, l\'autre says hasMany. Et en tinker : `Categorie::first()->produits` répond la vérité en deux secondes.' }
          ],
          related: ['lv-eloquent', 'lv-migrations', 'lv-api-resources', 'lv-tests']
        },
      ]
    },
    /* ==================== 4. SÉCURITÉ & ACCÈS ==================== */
    {
      id: 'securite-acces',
      name: 'Sécurité & accès',
      icon: 'shield',
      fiches: [
        {
          id: 'lv-authentification',
          title: 'Authentification (Breeze & Sanctum)',
          icon: 'shield',
          level: 'Intermédiaire',
          tagline: 'Login/register en quinze minutes avec Breeze, tokens API avec Sanctum — et les mots de passe enfin bien hashés.', 
          intro: 'Avant toute autorisation vient la question d\'identité : **qui es-tu ?** Et avant d\'écrire le moindre écran de login : la bonne nouvelle — tu n\'écriras probablement JAMAIS ton système d\'authentification à la main. Laravel fournit Breeze (auth web complète : inscription, connexion, reset de mot de passe, vérification d\'e-mail — en quinze minutes montre en main) et Sanctum (tokens pour API, SPA et mobiles). Cette fiche te donne les deux voies, le moment exact où choisir l\'une, l\'autre ou les deux, et la règle unique des mots de passe qui évite le péché originel du PHP : hasher deux fois, ou hasher mal.', 
          blocks: [
            { t: 'h3', h: 'Le problème : « j\'écris mon login moi-même »' },
            { t: 'p', h: 'Le login semble trivial (un formulaire, une comparaison) — jusqu\'à ce que tu listes ce qui l\'entoure vraiment : hachage SÛR des mots de passe (bcrypt/argon, salage) ; protection contre le brute force (throttle) ; « se souvenir de moi » (cookies persistants) ; réinitialisation par e-mail avec jeton expirant ; vérification d\'adresse ; gestion des sessions multi-appareils. Chacune de ces briques est un champ de mines documenté — et le moindre écart est une faille de sécurité publiée. Breeze fournit tout cela, AUDITÉ, prêt, avec des vues sobres que tu personnalises : ton énergie va sur TON métier, pas sur la réécriture pour la millième fois du wheel de l\'authentification.' },
            { t: 'p', h: 'Ancrage dans tes acquis : l\'authentification répond « QUI es-tu ? » (identité). L\'AUTORISATION — la fiche suivante — répond « as-tu le DROIT de faire ça, sur cet objet précis ? ». Connecté ≠ autorisé : Awa est bien connectée à la boutique, elle n\'a pas pour autant le droit de supprimer la catégorie de sa sœur. Retiens dès maintenant les deux questions séparées, elles ont deux outils séparés.' },
            { t: 'h3', h: 'Breeze : l\'auth web complète, prête à l\'emploi' },
            { t: 'code', lang: 'php', code:
'composer require laravel/breeze --dev\nphp artisan breeze:install blade     # stack : Blade (ou vue / react / api)\nphp artisan migrate                  # users, password_reset_tokens, sessions…\nnpm install && npm run dev           # compiler les vues d\'auth (sobres, modifiables)\n\n# Il apparaît alors, déjà câblé :\n#   /register  /login  /forgot-password  /reset-password  /verify-email\n#   routes/auth.php (lisible — chaque route est explicite)\n#   app/Http/Controllers/Auth/* (les contrôleurs, TON code désormais)\n#   resources/views/auth/* (Blade Tailwind, à ta charte)\n\n# Protéger une zone ? Ton acquis de la fiche Middleware :\nRoute::middleware(\'auth\')->group(function () {\n    Route::get(\'/commandes\', [CommandeController::class, \'index\']);\n    Route::resource(\'produits\', ProduitController::class)->only([\'create\', \'store\']);\n});' },
            { t: 'p', h: 'Le détail qui change tout par rapport aux anciens kits : **Breeze n\'installe pas de « boîte noire » — il génère du code DANS TON PROJET** (contrôleurs `Auth/`, requêtes `Auth/`, vues). Tu lis chaque ligne, tu modifies chaque ligne : c\'est TA base d\'auth, simplement écrite par des experts et auditée. Les variantes : `breeze:install vue`/`react` pour SPA du même webpack, ou `breeze:install api` qui laisse place à Sanctum seul pour un front externe.' },
            { t: 'h3', h: 'Utiliser l\'utilisateur connecté, partout' },
            { t: 'code', lang: 'php', code:
'// L\'access global, trois formes équivalentes :\n$request->user();                       // dans une méthode (la préférée)\nauth()->user();                         // via le helper\nAuth::user();                           // via la facade (use Illuminate\\Support\\Facades\\Auth)\n\n// → l\'instance du modèle User connecté, ou null si invité.\n//   Le TEST honnête : auth()->check()  /  auth()->guest()\n\n// Dans Blade (fiche Blade) — sans un if PHP :\n@auth\n    <p>Bonjour {{ auth()->user()->name }} — {{ auth()->user()->boutique->nom }}</p>\n@endauth\n@guest\n    <a href="{{ route(\'login\') }}">Se connecter pour commander</a>\n@endguest\n\n// Lier la donnée à la personne, au moment de la création :\n$commande = $request->user()->commandes()->create([\n    ...$request->validated(),\n    \'reference\' => str()->upper(str()->random(8)),\n]);   // user_id rempli via la relation (fiche Relations) — jamais via le form' },
            { t: 'h3', h: 'Sanctum : les tokens pour API, SPA, mobile' },
            { t: 'p', h: 'La session-cookie (Breeze) est parfaite pour LE navigateur de TON site — elle ne marche plus pour l\'application mobile, le SPA déployée ailleurs, ou l\'intégration d\'un partenaire (un agrégateur de livraison zémidjan qui consulte tes commandes). Sanctum résout avec des **tokens** : une longue chaîne générée PAR utilisateur, stockée HASHÉE en base, présentée à chaque requête dans l\'en-tête `Authorization: Bearer …`. Chaque token porte des **abilities** (permissions : `commandes:lire`, `commandes:ecrire`) — le partenaire peut lire sans jamais écrire.' },
            { t: 'code', lang: 'php', code:
'// Générer un token (une seule fois côté serveur) :\n$user = User::find(3);\n$token = $user->createToken(\'zemidjan-app\', [\'commandes:lire\']);\n$token->plainTextToken;   // « 4|sU… » — MONTRÉ UNE SEULE FOIS, à copier\n//                          // (en base : le HASH — la fuite du fichier ne vole rien)\n\n// routes/api.php — protéger par token ET par ability :\nRoute::middleware(\'auth:sanctum\')->group(function () {\n    Route::get(\'/commandes\', [ApiCommandeController::class, \'index\'])\n        ->middleware(\'abilities:commandes:lire\');\n    Route::post(\'/commandes\', [ApiCommandeController::class, \'store\'])\n        ->middleware(\'abilities:commandes:ecrire\');\n});\n\n// Le client (module JavaScript — fiche fetch de data-js) :\n//   fetch(\'/api/commandes\', {\n//       headers: { Authorization: \'Bearer \' + token, Accept: \'application/json\' }\n//   })' },
            { t: 'callout', kind: 'tip', h: 'Règle de choix : navigateur sur TON domaine → session Breeze (CSRF inclus, zéro JS à gérer). Mobile, SPA externe, partenaire → tokens Sanctum. Les DEUX cohabitent naturellement (le compte web en session, l\'app mobile en token) — c\'est le dessin standard des projets sérieux.' },
            { t: 'diagram', title: 'Les deux façons de prouver « c\'est moi » : session ou token', svg: `<svg viewBox="0 0 680 230">
  <defs><marker id="lv-au1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="20" y="30" class="dg-t">Sur le web (Breeze) : la session-cookie</text>
  <rect x="20" y="44" width="140" height="48" rx="10" class="dg-b"/>
  <text x="90" y="66" class="dg-t" text-anchor="middle">Formulaire /login</text>
  <text x="90" y="84" class="dg-ms" text-anchor="middle">email + mot de passe</text>
  <path d="M 160,68 L 174,68" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="176" y="44" width="150" height="48" rx="10" class="dg-b"/>
  <text x="251" y="66" class="dg-t" text-anchor="middle">Vérification</text>
  <text x="251" y="84" class="dg-ms" text-anchor="middle">hash bcrypt comparé</text>
  <path d="M 326,68 L 340,68" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="342" y="44" width="150" height="48" rx="10" class="dg-ba"/>
  <text x="417" y="66" class="dg-t" text-anchor="middle">Session + cookie</text>
  <text x="417" y="84" class="dg-ms" text-anchor="middle">le serveur se souvient</text>
  <path d="M 492,68 L 506,68" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="508" y="44" width="156" height="48" rx="10" class="dg-b"/>
  <text x="586" y="66" class="dg-t" text-anchor="middle">Connecté</text>
  <text x="586" y="84" class="dg-ms" text-anchor="middle">auth()->user() partout</text>
  <text x="20" y="110" class="dg-ko">✗</text>
  <text x="34" y="110" class="dg-ms">identifiants faux → retour au formulaire</text>
  <text x="20" y="142" class="dg-t">Sur mobile / API (Sanctum) : le token</text>
  <rect x="20" y="156" width="140" height="48" rx="10" class="dg-b"/>
  <text x="90" y="178" class="dg-t" text-anchor="middle">createToken()</text>
  <text x="90" y="196" class="dg-ms" text-anchor="middle">montré UNE seule fois</text>
  <path d="M 160,180 L 174,180" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="176" y="156" width="150" height="48" rx="10" class="dg-b"/>
  <text x="251" y="178" class="dg-t" text-anchor="middle">Token stocké</text>
  <text x="251" y="196" class="dg-ms" text-anchor="middle">hashé en base</text>
  <path d="M 326,180 L 340,180" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="342" y="156" width="150" height="48" rx="10" class="dg-ba"/>
  <text x="417" y="178" class="dg-t" text-anchor="middle">Chaque requête</text>
  <text x="417" y="196" class="dg-ms" text-anchor="middle">Authorization: Bearer …</text>
  <path d="M 492,180 L 506,180" class="dg-e" marker-end="url(#lv-au1)"/>
  <rect x="508" y="156" width="156" height="48" rx="10" class="dg-b"/>
  <text x="586" y="178" class="dg-t" text-anchor="middle">Abilities</text>
  <text x="586" y="196" class="dg-ms" text-anchor="middle">commandes:lire, pas écrire</text>
  <text x="20" y="222" class="dg-ko">✗</text>
  <text x="34" y="222" class="dg-ms">token absent ou faux → 401 Unauthorized</text>
</svg>`, caption: 'Session = le serveur garde un registre et ton NAVIGATEUR présente un cookie à chaque visite (parfait pour ton site). Token = une longue chaîne-secrète présentée dans l\'en-tête de CHAQUE requête (parfait pour mobile et partenaires — pas besoin de cookies). Dans les deux cas, le mot de passe servi de clé une fois : ensuite c\'est la session ou le token qui parle.' },
            { t: 'h3', h: 'Les mots de passe : le réflexe unique, gratuit' },
            { t: 'p', h: 'Un mot de passe ne se STOCKE jamais : on stocke son HASH (bcrypt — lent, salé, spécifiquement conçu pour résister au brute-force). Laravel a intégré la règle dans le modèle User moderne : le cast `\'password\' => \'hashed\'` hâche AUTOMATIQUEMENT à chaque écriture de l\'attribut, et la vérification `password_verify` est faite par le système d\'auth. Tu n\'as RIEN à écrire — et surtout rien à hacher toi-même : c\'est le péché de la carte d\'erreur en bas (le double hash qui casse le login sans bruit).' },
            { t: 'code', lang: 'php', label: 'app/Models/User.php — le cast qui fait le travail', code:
'protected function casts(): array\n{\n    return [\n        \'email_verified_at\' => \'datetime\',\n        \'password\' => \'hashed\',        // → hachage automatique :\n        // User::create([\'password\' => \'mot2passe\']) stocke le HASH.\n    ];\n}\n\n// Le login, par le système (Breeze) — jamais de comparaison soi-même :\n//   Auth::attempt([\'email\' => $e, \'password\' => $motEnClair])\n// → recalcule le hash du candidat avec le SEL stocké, compare,\n//   ouvre la session si égalité. Le mot de passe en clair n\'est\n//   JAMAIS stocké, JAMAIS logué, vu une seule fois : à la réception.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Breeze est un package externe dont je subis les choix. »** Non : il GÉNÈRE ton code (contrôleurs, requests, vues dans TON projet) — ensuite tu possèdes chaque ligne. La boîte noire, c\'est ce qu\'il évite.',
              '**« Token et session, c\'est interchangeable. »** La session-cookie dépend des cookies (navigateur, même domaine, CSRF) ; le token s\'envoie en en-tête (mobile, inter-domaines). Choisir est un vrai dessin d\'architecture, pas une préférence.',
              '**« Le token en base est le token qu\'on montre. »** Non : Sanctum stocke le HASH du token — la valeur en clair (Bearer) n\'est montrée qu\'UNE fois à la création. Stocke-la côté client soigneusement ; perdue, on en régénère un.',
              '**« md5 ou sha1 + un sel maison suffisent pour un mot de passe. »** Ces algorithmes sont RAPIDES — des milliards d\'essais par seconde au brute force. bcrypt/argon sont LENTS exprès : c\'est la fonction qui protège le mot de passe après la fuite de ta base. Laravel choisit bcrypt pour toi ; ton travail est de ne rien casser.',
              '**« auth()->user() existe, donc l\'URL /commandes/{commande} est sûre. »** L\'utilisateur est connecté, oui — mais la commande n\'est pas LA SIENNE si l\'id vient de l\'URL (identification ≠ autorisation). Le middleware auth ouvre la porte de la maison ; la policy (fiche suivante) garde chaque chambre.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le hash haché deux fois qui casse tout login, et la mutation « rangée » hors du contrôle d\'accès — deux cartes qui touchent toutes deux à la confiance.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le middleware `auth`, croisé dans la fiche Middleware, n\'avait de sens que parce que quelqu\'un pose d\'abord l\'identité en session — c\'est ce quelqu\'un que tu viens d\'apprendre. La validation des identifiants (fiche Validation) garde la porte d\'entrée, et la fiche Autorisation prend le relais immédiat : savoir QUI est là ne dit pas CE QU\'IL a le droit de faire — confusion classique chez les débutants. Côté API, Sanctum dialoguera directement avec le `fetch` du module JavaScript : ton front envoie le token dans l\'en-tête `Authorization`, Sanctum le vérifie — le contrat complet tient en une ligne HTTP.' }
          ],
          errors: [
            { title: 'Hasher soi-même (et en double)', lang: 'php', bad:
'User::create([\n    \'name\' => $request->name,\n    \'email\' => $request->email,\n    \'password\' => Hash::make($request->password),   // ✗ DOUBLE HASH :\n    //   le cast hashed hache ENCORE une fois — la base stocke le\n    //   hash DU HASH. Login : le candidat haché ne matche jamais.\n    //   Symptôme : « le mot de passe ne marche jamais », sans erreur.\n]);', good:
'User::create([\n    \'name\' => $request->name,\n    \'email\' => $request->email,\n    \'password\' => $request->password,        // ✓ la valeur EN CLAIR :\n    //   le cast \'password\' => \'hashed\' hache UNE fois, au bon moment.\n]);\n\n// Sans le cast (vieux modèle) : Hash::make() UNE SEULE FOIS — mais\n// la réponse moderne reste : le cast, et ne plus y penser.\n// Vérifie dans tinker : User::latest()->first()->password\n//   commence par $2y$10$… = bcrypt, UNE fois.', why: 'Le cast `hashed` est invisible — c\'est exactement ce qui en fait le piège : quiconque ajoute `Hash::make()` « par habitude » obtient un hash DU hash, inutilisable à la vérification car `password_verify` compare le candidat avec le hash STOCKÉ. Et le symptôme est le pire : aucun message d\'erreur, juste « identifiants invalides » pour tout le monde, immédiatement après l\'inscription. Tiens la règle simple : le modèle User de Laravel 11+ gère le hachage ; ton rôle est de ne PAS hacher, et de vérifier en tinker que le stockage commence par `$2y$`.' },
            { title: 'Exposer des mutations sans auth', lang: 'php', bad:
'// routes/web.php — « pas de lien vers cette page, personne ne tombera dessus » :\nRoute::get(\'/admin/produits/{produit}/supprimer\', [ProduitController::class, \'destroy\']);\nRoute::get(\'/admin/utilisateurs\', [UserController::class, \'index\']);\n\n// ✗ sécurité par l\'obscurité : les robots scannent /admin/* en permanence,\n//   un client partage l\'URL, et pire — la route est en GET :\n//   un simple lien cliqué (un mail, un message) SUPPRIME le produit', good:
'Route::middleware(\'auth\')->prefix(\'admin\')->name(\'admin.\')->group(function () {\n    // des actions, aux bons verbes (fiche Routing) :\n    Route::resource(\'produits\', AdminProduitController::class)\n        ->except([\'index\', \'show\']);\n    Route::get(\'/utilisateurs\', [AdminUserController::class, \'index\']);\n});\n// ✓ auth sur le GROUPE (impossible à oublier route par route),\n//   mutations en POST/PUT/DELETE (protégées par CSRF + jamais\n//   exécutées par un simple chargement de page)', why: 'L\'obscurité n\'est pas une défense : les scanners testent méthodiquement `/admin`, `/dashboard`, `/delete` sur tous les sites PHP du monde, et une URL « cachée » finit toujours partagée (un lien copié, un onglet laissé ouvert, un historique de navigateur). La vraie architecture empile : `auth` sur le GROUPE (le mot de passe de la maison), bon verbe HTTP (une mutation ne s\'exécute pas par accident de navigation), CSRF (formulaire signé), et la policy au niveau OBJET (fiche suivante — même un utilisateur connecté ne supprime que SES produits). Aucune de ces couches ne coûte un effort ; toutes ensemble, elles rendent la route « cachée » inutile — parce qu\'impossible à utiliser mal.' }
          ],
          related: ['lv-autorisation', 'lv-middleware', 'lv-validation', 'js-fetch']
        },
        {
          id: 'lv-autorisation',
          title: 'Autorisation : Gates & Policies',
          icon: 'gavel',
          level: 'Avancé',
          tagline: '« Qui a le droit de faire quoi sur cette ressource » — centralisé, testable, réutilisable.', 
          intro: 'La connexion ouvre la porte de la boutique — pas celle de la réserve. Awa est authentifiée, mais peut-elle modifier LE produit de sa sœur ? Supprimer LA catégorie du groupe ? C\'est la seconde question de sécurité : **l\'autorisation**, qui s\'exprime toujours ainsi : UN sujet (l\'utilisateur) veut UNE action (update, delete) sur UN objet (CE produit-là). Laravel répond avec deux outils — la Gate pour la règle ponctuelle, la Policy pour les droits d\'un modèle réunis en une classe — et un principe d\'or : le contrôle d\'accès vit CÔTÉ SERVEUR, centralisé, testable. Le bouton masqué dans Blade n\'est que la cerise cosmétique.', 
          blocks: [
            { t: 'h3', h: 'La question précise : qui, quoi, sur quoi' },
            { t: 'p', h: '« Autorisé » sans objet ne veut rien dire. Chaque règle d\'accès répond à : QUEL utilisateur (connecté ? rôle admin ?), quelle ACTION (voir, créer, modifier, supprimer, publier), sur QUELLE instance précise (le produit #42 — pas « un produit en général »). Cette précision change le code : `$commande->user_id === auth()->id()` est une règle d\'autorisation — et écrire cette ligne en quinze contrôleurs, c\'est quinze chances d\'en rater un. Les Gates et Policies CENTRALISENT ces règles en un endroit nommé, testable, réutilisable dans les contrôleurs, Blade, l\'API et les actions en queue.' },
            { t: 'diagram', title: 'Les deux portes : le middleware ouvre la maison, la policy garde chaque chambre', svg: `<svg viewBox="0 0 680 240">
  <defs><marker id="lv-g1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="16" y="86" width="96" height="48" rx="12" class="dg-b"/>
  <text x="64" y="106" class="dg-t" text-anchor="middle">Awa</text>
  <text x="64" y="124" class="dg-ms" text-anchor="middle">navigateur</text>
  <rect x="150" y="16" width="514" height="206" rx="16" class="dg-zone"/>
  <text x="650" y="38" class="dg-ms" text-anchor="end">LA BOUTIQUE (zone connectée)</text>
  <rect x="170" y="100" width="150" height="64" rx="12" class="dg-b"/>
  <circle cx="245" cy="100" r="9" class="dg-num"/><text x="245" y="104" class="dg-numt" text-anchor="middle">1</text>
  <text x="245" y="126" class="dg-t" text-anchor="middle">middleware auth</text>
  <text x="245" y="146" class="dg-m" text-anchor="middle">connectée ?</text>
  <rect x="350" y="60" width="286" height="136" rx="14" class="dg-zone"/>
  <text x="622" y="82" class="dg-ms" text-anchor="end">COMMANDE #42 — la chambre</text>
  <rect x="386" y="96" width="170" height="64" rx="12" class="dg-ba"/>
  <circle cx="471" cy="96" r="9" class="dg-num"/><text x="471" y="100" class="dg-numt" text-anchor="middle">2</text>
  <text x="471" y="122" class="dg-t" text-anchor="middle">policy update()</text>
  <text x="471" y="142" class="dg-m" text-anchor="middle">SA commande ?</text>
  <text x="493" y="178" class="dg-ok" text-anchor="middle" font-size="12">✓ si OUI : l'action s'exécute</text>
  <path d="M 112,110 L 168,128" class="dg-e" marker-end="url(#lv-g1)"/>
  <path d="M 320,132 L 384,128" class="dg-e" marker-end="url(#lv-g1)"/>
  <path d="M 200,100 L 200,58" class="dg-e" marker-end="url(#lv-g1)"/>
  <text x="200" y="50" class="dg-ko" text-anchor="middle" font-size="12">✗ renvoyée vers /login</text>
  <path d="M 471,160 L 471,196" class="dg-e" marker-end="url(#lv-g1)"/>
  <text x="471" y="214" class="dg-ko" text-anchor="middle" font-size="12">✗ 403 : pas SA commande</text>
</svg>`, caption: 'L\'authentification (portière ①) répond « QUI es-tu ? » ; l\'autorisation (portière ②) répond « as-tu le droit de faire ÇA, sur CET objet précis ? ». Un utilisateur connecté qui tape l\'URL d\'une commande d\'un autre passe la première porte… et se fait arrêter net à la seconde. Voilà pourquoi cacher le bouton ne suffit JAMAIS : la vraie frontière est serveur, pas visuelle.' },
            { t: 'h3', h: 'Gate : la règle simple et rapide' },
            { t: 'code', lang: 'php', label: 'app/Providers/AppServiceProvider.php', code:
'use Illuminate\\Support\\Facades\\Gate;\n\npublic function boot(): void\n{\n    // La règle PONCTUELLE, hors modèle précis — parfaite en Gate :\n    Gate::define(\'gerer-boutique\', function ($user) {\n        return $user->estAdmin() || $user->boutique?->estActive();\n    });\n}\n\n// À l\'usage, trois formes — même règle :\n// 1) dans un contrôleur :\nGate::authorize(\'gerer-boutique\');            // 403 si refus, sinon continue\n\n// 2) dans Blade :\n@can(\'gerer-boutique\')\n    <a href="{{ route(\'admin.produits.index\') }}">Administration</a>\n@endcan\n\n// 3) dans du code (valeur booléenne, pour composer) :\nif (Gate::allows(\'gerer-boutique\')) { /* … */ }' },
            { t: 'h3', h: 'Policy : les droits d\'un modèle, réunis en une classe' },
            { t: 'code', lang: 'php', code:
'php artisan make:policy ProduitPolicy --model=Produit\n→ app/Policies/ProduitPolicy.php avec les squelettes CRUD.\n\nclass ProduitPolicy\n{\n    // Voir LA fiche d\'un produit : tout le monde ? ou boutique→membres ?\n    public function view($user, Produit $produit): bool\n    {\n        return true;   // catalogue public\n    }\n\n    // Modifier CE produit : son propriétaire seulement\n    public function update($user, Produit $produit): bool\n    {\n        return $user->boutique_id === $produit->boutique_id;\n    }\n\n    // Supprimer : propriétaire, et pas s\'il a des commandes en cours\n    public function delete($user, Produit $produit): bool\n    {\n        return $user->boutique_id === $produit->boutique_id\n            && !$produit->commandes()->exists();\n    }\n}\n\n// Laravel devine le lien Produit <-> ProduitPolicy par convention\n// (même nom + « Policy »). Sinon :\n// Gate::policy(Produit::class, ProduitPolicy::class);   dans boot()' },
            { t: 'p', h: 'La policy est le rangement qui change tout : chaque modèle « sensible » a sa classe de droits, chaque action une méthode, chaque règle DEUX MINUTES à relire. Quand le client demande « et aussi, les gestionnaires peuvent modifier les produits des autres », tu touches UNE méthode (`update`), pas quinze contrôleurs.' },
            { t: 'h3', h: 'Appliquer la policy : les quatre endroits' },
            { t: 'code', lang: 'php', code:
'// 1) Contrôleur, à la main (le plus explicite) :\npublic function update(UpdateProduitRequest $request, Produit $produit)\n{\n    $this->authorize(\'update\', $produit);        // 403 si refusé\n    $produit->update($request->validated());\n    return redirect()->route(\'produits.show\', $produit);\n}\n\n// 2) Contrôleur Resource, d\'un coup (méthode policy vs action CRUD) :\npublic function __construct()\n{\n    $this->authorizeResource(Produit::class, \'produit\');\n}   // index→viewAny, show→view, store→create, update→update, destroy→delete…\n\n// 3) Dans la ROUTE (middleware can) :\nRoute::delete(\'/produits/{produit}\', …)->middleware(\'can:delete,produit\');\n\n// 4) Dans BLADE (l\'affichage suit les droits — la cerise cosmétique) :\n@can(\'update\', $produit)\n    <a href="{{ route(\'produits.edit\', $produit) }}">Modifier</a>\n@endcan' },
            { t: 'callout', kind: 'info', h: 'Sous le capot : les méthodes de policy reçoivent TOUJOURS l\'utilisateur connecté en premier argument — un INVITÉ ne les atteint pas par défaut (refus immédiat, 403), sauf si tu marques la méthode avec `?User $user` (nullable) pour autoriser explicitement des invités. Et la porte de service : `Gate::before(fn ($user) => $user->estAdmin() ? true : null)` laisse les admins passer PARTOUT (`true` accorde, `null` continue vers la règle normale).' },
            { t: 'h3', h: 'Gate ou Policy : la règle de choix en une ligne' },
            { t: 'p', h: 'La règle est presque toujours tranchée : **une action SUR UN MODÈLE → Policy** (update Produit, delete Commande, restore Tontine) ; **une capacité GÉNÉRALE de l\'app → Gate** (gerer-boutique, acces-rapports, publier-promos). Le jour où ta Gate commence à recevoir un modèle en second argument, c\'est une Policy qui demande à naître.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Le middleware auth protège déjà mes routes sensibles. »** auth prouve l\'IDENTITÉ (« Awa est connectée ») — pas le DROIT (« sur SA commande »). Un utilisateur connecté qui tape l\'id d\'un autre dans l\'URL accède à tout : c\'est le trou de sécurité n°1 des apps PHP.',
              '**« Cacher le bouton « Supprimer » dans Blade suffit. »** Le bouton caché est COSMÉTIQUE : la route existe encore — un client tape l\'URL directement. Le contrôle serveur (authorize/policy) est LA sécurité ; le cache visuel n\'est que son reflet pour l\'utilisateur honnête.',
              '**« $this->authorize() dans le contrôleur, ça protège déjà tout. »** Il protège ce contrôleur. Les mêmes règles doivent tenir dans Blade, l\'API, les jobs en queue — d\'où la policy CENTRALE : une règle, quatre usages, jamais dupliquée.',
              '**« Policy = réservé aux gros sites à rôles. »** Une boutique à un seul rôle a déjà des policies naturelles : « modifier SON produit ». Ce n\'est pas RBAC enterprise, c\'est juste la propriété des données — dès deux utilisateurs, ça existe.',
              '**« Un invité peut voir, il suffit de laisser tomber l\'auth. »** Par défaut la policy refuse aux invités ; pour autoriser explicitement : méthode avec `?User $user` nullable et logique `$user?->can(...) ?? true`. Un choix écrit est un choix maîtrisé.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'L\'illusion du bouton caché, et la comparaison d\'ids copiée-collée — deux formes du même péché de dispersion.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche ferme le triptyque de l\'accès : la fiche Authentification dit QUI tu es, le middleware (fiche Middleware) te contrôle au portail, et la policy tranche au cas par cas — avec `$this->authorize()` dans le contrôleur (fiche Contrôleurs) comme point de rencontre des trois. Elle se distingue de la fiche Validation par la question posée : l\'une protège l\'INTÉGRITÉ des données, l\'autre le PROPRIÉTAIRE, et une vraie application exige les deux à chaque action sensible. Ses décisions — 403 ou passage — se verrouillent dans la fiche Tests avec `assertForbidden()` et `assertOk()` : une règle de droit non testée est une règle supposée.' }
          ],
          errors: [
            { title: 'Le contrôle « visuel » sans contrôle serveur', lang: 'php', bad:
'{{-- Dans la vue : --}}\n@auth\n    <a href="{{ route(\'produits.edit\', $produit) }}">Modifier</a>\n@endauth\n\n// …et dans les routes, RIEN (ou juste auth sur le groupe).\n// ✗ Le bouton n\'apparaît pas aux invités, certes — mais un CLIENT\n//   CONNECTÉ tape /produits/42/edit : il modifie le produit #42\n//   DE QUELQU\'UN D\'AUTRE. Le visuel protège le décor, pas la donnée.', good:
'// La sécurité vit CÔTÉ SERVEUR (et le visuel en découle) :\n\n// ProduitPolicy::update — la règle UNE FOIS :\npublic function update($user, Produit $produit): bool\n{\n    return $user->boutique_id === $produit->boutique_id;\n}\n\n// Contrôleur :\npublic function edit(Produit $produit)\n{\n    $this->authorize(\'update\', $produit);        // ✓ 403 si pas le tien\n    return view(\'produits.edit\', [\'produit\' => $produit]);\n}\n\n// Blade — le bouton REFLÈTE la même règle (cosmétique, pas gardien) :\n@can(\'update\', $produit)\n    <a href="{{ route(\'produits.edit\', $produit) }}">Modifier</a>\n@endcan', why: 'C\'est la faute de sécurité n°1 des applications CRUD : la confusion de l\'INTERFACE et de la DÉFENSE. Un formulaire caché ou un lien absent n\'arrête ni `curl`, ni la modification de l\'id dans la barre d\'adresse, ni le référencement accidentel d\'un moteur de recherche — la règle « CETTE ressource appartient à CET utilisateur » ne peut vivre que dans un garde exécuté à CHAQUE requête, serveur. Blade participe à l\'expérience (on n\'affiche pas ce qu\'on ne peut pas faire), la policy décide de la réalité. Et l\'ordre de construction est l\'inverse du réflexe : d\'abord la policy, ensuite le bouton qui l\'honore.' },
            { title: 'Comparaison d\'ids disséminée partout', lang: 'php', bad:
'// ProduitController (ligne 2) :      if ($produit->boutique_id !== auth()->user()->boutique_id) abort(403);\n// CommandeController (ligne 5) :     if ($commande->boutique_id !== auth()->user()->boutique_id) abort(403);\n// ApiProduitController (ligne 3) :   if ($produit->boutique_id !== auth()->user()->boutique_id) abort(403);\n// …15 copies au total. Demain : « les gestionnaires PEUVENT voir\n// les produits des autres » — 15 endroits à retrouver, 15 tests à\n// réécrire, et celui qui est oublié devient la faille de sécurité.', good:
'// La règle UNE FOIS, dans ProduitPolicy :\npublic function update($user, Produit $produit): bool\n{\n    return $user->boutique_id === $produit->boutique_id\n        || $user->estGestionnaire();          // → le changement, UN endroit\n}\n\n// Partout où la règle est demandée :\n$this->authorize(\'update\', $produit);          // contrôleur\n@can(\'update\', $produit)                       // Blade\nGate::allows(\'update\', $produit)               // code métier\n// → quinze usages, une règle, un test', why: 'La duplication d\'une règle de sécurité n\'est pas un problème de style, c\'est un problème de PROBABILITÉ : chaque copie est un tirage indépendant à l\'oubli, et la faille sera dans la copie ratée — pas dans les quatorze autres. La centralisation policy a le bénéfice jumeau : la règle devient TESTABLE (un test unitaire sur `ProduitPolicy::update` prouve tous les usages), et lisible — un auditeur de sécurité lit TES règles d\'accès dans DEUX fichiers (Gates + Policies), pas en fouillant quarante contrôleurs. Sécurité et lisibilité avancent main dans la main, ici comme presque toujours.' }
          ],
          related: ['lv-authentification', 'lv-controleurs', 'lv-validation', 'lv-tests']
        },
      ]
    },
    /* ==================== 5. ARCHITECTURE AVANCÉE ==================== */
    {
      id: 'architecture-avancee',
      name: 'Architecture avancée',
      icon: 'bolt',
      fiches: [
        {
          id: 'lv-evenements',
          title: 'Événements & listeners',
          icon: 'notifications_active',
          level: 'Avancé',
          tagline: '« Il s\'est passé X » → plusieurs réactions, découplées : le code qui ne s\'emmêle plus.', 
          intro: 'Ta méthode `store()` crée la commande, envoie le mail de confirmation, notifie le livreur zémidjan, incrémente les statistiques, prévient l\'admin par SMS… 80 lignes où se mélangent création, mail, SMS et stats — que tu dois réveiller ligne par ligne pour ajouter quoi que ce soit. L\'architecture événementielle propose le découplage élégant : le contrôleur crie JUSTE « une commande est payée » (l\'événement) et des RÉACTIONS indépendantes (les listeners) font chacune leur métier, sans que personne ne connaisse personne. C\'est le pattern Observer au service de ta boutique : ajouter une réaction n\'oblige plus à toucher au code qui déclenche.', 
          blocks: [
            { t: 'h3', h: 'Le problème : le contrôleur qui sait trop' },
            { t: 'p', h: 'Commençons par le constat chirurgical : si, pour ajouter « notifier par WhatsApp » à ta commande, tu dois OUVRIR et MODIFIER `CommandeController::store()`, ta conception force chaque nouveauté à réouvrir un fichhier qui marchait. C\'est la violation du principe ouvert/fermé : un code SÛR devrait être fermé à la modification directe, ouvert à l\'extension par ajout de NOUVEAUX fichiers. L\'événement répare exactement ça : le contrôleur publie UN FAIT (« CommandePayee »), et chaque réaction est un NOUVEAU fichier branché par enregistrement — le contrôleur peut être oublié pendant des mois, le système continue d\'apprendre des réactions.' },
            { t: 'h3', h: 'Les trois acteurs, et le mécanisme complet' },
            { t: 'p', h: 'Trois rôles à distinguer nettement : l\'**ÉVÉNEMENT** est une petite classe qui transporte le FAIT et ses données (la commande, le montant) — rien d\'autre, pas de logique. Le **LISTENER** est la réaction, une classe par réaction (« EnvoyerConfirmationMail », « NotifierZemidjan ») avec sa méthode `handle()`. Et `dispatch()` est la PUBLICATION : l\'endroit du code qui crie le fait, sans dire (et sans savoir) qui écoute. Ajouter une réaction = créer un listener — le point de publication n\'est jamais modifié.' },
            { t: 'diagram', title: 'Le découplage en image : un fait publié, plusieurs réactions abonnées', svg: `<svg viewBox="0 0 680 250">
  <defs><marker id="lv-ev1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="96" width="150" height="60" rx="12" class="dg-b"/>
  <text x="95" y="120" class="dg-t" text-anchor="middle">store()</text>
  <text x="95" y="140" class="dg-ms" text-anchor="middle">event(new …)</text>
  <rect x="236" y="96" width="180" height="60" rx="12" class="dg-ba"/>
  <text x="326" y="120" class="dg-t" text-anchor="middle">ÉVÉNEMENT</text>
  <text x="326" y="139" class="dg-ms" text-anchor="middle">CommandePayee {commande, montant}</text>
  <path d="M 170,126 L 234,126" class="dg-e" marker-end="url(#lv-ev1)"/>
  <rect x="470" y="24" width="196" height="44" rx="10" class="dg-b"/>
  <text x="568" y="44" class="dg-t" text-anchor="middle">EnvoyerConfirmationMail</text>
  <text x="568" y="62" class="dg-ms" text-anchor="middle">listener — mail au client</text>
  <rect x="470" y="92" width="196" height="44" rx="10" class="dg-b"/>
  <text x="568" y="112" class="dg-t" text-anchor="middle">NotifierZemidjan</text>
  <text x="568" y="130" class="dg-ms" text-anchor="middle">listener — SMS au livreur</text>
  <rect x="470" y="160" width="196" height="44" rx="10" class="dg-b"/>
  <text x="568" y="180" class="dg-t" text-anchor="middle">IncrementerStats</text>
  <text x="568" y="198" class="dg-ms" text-anchor="middle">listener — statistiques</text>
  <path d="M 416,116 C 440,70 440,46 468,46" class="dg-e" marker-end="url(#lv-ev1)"/>
  <path d="M 416,126 L 468,118" class="dg-e" marker-end="url(#lv-ev1)"/>
  <path d="M 416,136 C 440,180 440,182 468,182" class="dg-e" marker-end="url(#lv-ev1)"/>
  <rect x="236" y="212" width="430" height="30" rx="10" class="dg-zone"/>
  <text x="451" y="231" class="dg-ms" text-anchor="middle">+ future réaction : un NOUVEAU fichier, jamais une modif du contrôleur</text>
</svg>`, caption: 'Le contrôleur crie « une commande est payée » et n\'en sait pas plus — il ne connaît ni mail, ni SMS, ni stats. Chaque réaction est une classe à part, branchée ailleurs. Ajouter « notifier par WhatsApp » demain = UN nouveau listener, zéro modification de store() : le code qui marche n\'est plus jamais réouvert.' },
            { t: 'code', lang: 'php', code:
'// 1) L\'ÉVÉNEMENT — le fait, avec ses données, rien d\'autre\n//    php artisan make:event CommandePayee\nnamespace App\\Events;\n\nclass CommandePayee\n{\n    public function __construct(\n        public readonly \\App\\Models\\Commande $commande,\n        public readonly int $montant,\n    ) {}\n}\n\n// 2) LE LISTENER — UNE réaction, une classe\n//    php artisan make:listener EnvoyerConfirmationMail --event=CommandePayee\nnamespace App\\Listeners;\n\nclass EnvoyerConfirmationMail\n{\n    public function handle(\\App\\Events\\CommandePayee $evenement): void\n    {\n        \\Illuminate\\Support\\Facades\\Mail::to($evenement->commande->user)\n            ->queue(new \\App\\Mail\\ConfirmationCommande($evenement->commande));\n    }\n}\n\n// 3) LA PUBLICATION — le contrôleur crie le fait, sans savoir qui écoute\npublic function store(StoreCommandeRequest $request)\n{\n    $commande = Commande::create([...]);\n    event(new \\App\\Events\\CommandePayee($commande, $total));\n    // ou : CommandePayee::dispatch($commande, $total);\n    return redirect()->route(\'commandes.confirmation\', $commande);\n}' },
            { t: 'h3', h: 'Enregistrement : découverte automatique vs explicite' },
            { t: 'code', lang: 'php', code:
'// Laravel 11+ DÉCOUVRE automatiquement les listeners dans app/Listeners\n// — une classe dont handle() type un événement est abonnée TOUTE SEULE.\n// Zéro câblage, c\'est le mode moderne par défaut.\n\n// L\'enregistrement EXPLICITE (quand tu veux voir la liste, ou des events\n// hors de app/Listeners) — bootstrap/app.php :\n->withEvents(discover: [\n    __DIR__.\'/../app/Listeners\',\n])\n\n// …ou via l\'attribut (moderne, localisé à côté du listener) :\nuse Illuminate\\Events\\Attributes\\AsListener;\n\n#[AsListener(\\App\\Events\\CommandePayee::class)]\nclass EnvoyerConfirmationMail { /* handle()… */ }' },
            { t: 'callout', kind: 'tip', h: 'Tu peux aussi ÉCOUTER les événements du framework : `Registered` (inscription finie — parfait pour le mail de bienvenue personnalisé), `Login`, `Logout`, `Verified`, et tous ceux d\'Eloquent si besoin. La même mécanique, sans rien dispatcher toi-même : tu n\'écris que le listener.' },
            { t: 'h3', h: 'Synchrone ou en queue : la ligne qui change la latence' },
            { t: 'p', h: 'Par défaut le listener est SYNCHRONE : il s\'exécute dans la requête du client, qui attend. Un mail SMTP de 800 ms × 3 listeners = la confirmation de commande qui « rame » — alors que le client n\'a besoin que de « c\'est enregistré ». La solution est D\'UNE LIGNE : le listener implémente `ShouldQueue` et il part en queue (fiche suivante) — la requête rend aussitôt, les mails partent en arrière-plan. C\'est la frontière d\'usage : « le client a-t-il besoin du RÉSULTAT de cette réaction, maintenant ? » Non → queue.' },
            { t: 'code', lang: 'php', code:
'use Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass EnvoyerConfirmationMail implements ShouldQueue   // → la ligne magique\n{\n    public function handle(\\App\\Events\\CommandePayee $evenement): void\n    {\n        // maintenant exécuté par le WORKER, hors de la requête\n    }\n}\n// → la réponse HTTP part en 80 ms ; le mail suit en tâche de fond.\n// La fiche Queues détaille workers, retries et échecs.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Événement = notification. »** Non : l\'événement est le FAIT (« commande payée »), la notification est UN canal possible pour l\'annoncer (mail, SMS) — une notification sera souvent ENVOYÉE PAR un listener qui a entendu l\'événement. Trois couches, trois fichiers.',
              '**« dispatch() exécute tout de suite, forcément. »** Seulement le synchrone par défaut : dès que le listener porte `ShouldQueue`, dispatch() n\'exécute qu\'une MISE EN FILE — l\'exécution réelle appartient au worker. La latence de ta réponse ne dépend donc que de tes listeners synchro.',
              '**« Plus il y a d\'événements, plus c\'est découplé, donc meilleur. »** Le débogage: « pourquoi ce mail part-il ? » devient une chasse aux listeners quand tout est événement. Règle pratique : événements pour les FAITS MÉTIER IMPORTANTS (payé, livré, inscrit) ; les détails mécaniques restent dans des services appelés directement.',
              '**« L\'ordre des listeners est garanti. »** Non : abonne-les comme si l\'ordre était inconnu (par queue, il l\'est réellement). Si A dépend de B, ce n\'est pas deux listeners — c\'est UN listener qui appelle deux services dans l\'ordre voulu.',
              '**« Un événement peut remplacer une transaction. »** Un événement dispatché AVANT le commit de transaction peut être consommé AVANT que la donnée existe (piège du job lu trop tôt). La convention honnête : dispatcher APRÈS le commit (`DB::afterCommit()`), ou `ShouldQueue` + transactions soignées dans le service d\'abord.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La réaction lente qui plombe la requête, et le listener jamais branché — deux pannes sourdes, un seul remède : la visibilité.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le contrôleur mince, idéal de la fiche Contrôleurs, trouve ici son deuxième souffle : il ÉMET `CommandePassee` au lieu d\'envoyer lui-même quatre mails et un SMS. Tu as d\'ailleurs déjà croisé un événement sans le savoir : `Registered`, lancé par l\'authentification à chaque inscription — la fiche Authentification en dépend pour son mail de vérification. La frontière entre ici et la fiche Queues tient en une question : synchrone ou pas ? — la plupart de tes listeners finiront en `ShouldQueue`, c\'est-à-dire en jobs. Et `Event::fake()`, dans la fiche Tests, te permettra de prouver que ton contrôleur a bien émis, sans envoyer un seul mail réel.' }
          ],
          errors: [
            { title: 'Le listener synchrone qui plombe la requête', lang: 'php', bad:
'class EnvoyerConfirmationMail   // pas de ShouldQueue\n{\n    public function handle(CommandePayee $evenement): void\n    {\n        Mail::to($evenement->commande->user)\n            ->send(new ConfirmationCommande($evenement->commande));\n        // ✗ le client ATTEND le SMTP (300-1500 ms) pour voir\n        //   sa page de confirmation — plus le SMS, plus les stats…\n        //   la « lenteur boutique » n\'est pas le code : c\'est le sync.\n    }\n}', good:
'use Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass EnvoyerConfirmationMail implements ShouldQueue   // le fix tient là\n{\n    public function handle(CommandePayee $evenement): void\n    {\n        Mail::to($evenement->commande->user)\n            ->queue(new ConfirmationCommande($evenement->commande));\n        // ✓ la requête rend immédiatement ; le worker envoie derrière\n    }\n}\n// Et teste la non-latence : la page de confirmation ignore\n// totalement que le mail part — c\'est le but du découplage.', why: 'La question clé de tout listener : « le client a-t-il besoin du RÉSULTAT de cette réaction, maintenant ? » Pour un mail, un SMS, une notification livreur : non — il a besoin de savoir que la commande existe, pas que le SMTP a répondu. Le listener synchrone paye ce confort en LATENCE dans LA requête de l\'utilisateur (et chaque nouvelle réaction s\'ajoute à la note). La ligne `implements ShouldQueue` transpose la réaction au worker (fiche suivante) sans changer une ligne de logique — le découplage se mesure alors en millisecondes, ce qui est la raison d\'être de l\'architecture.' },
            { title: 'Confiance aveugle à l\'enregistrement', lang: 'php', bad:
'// Tu crées app/Listeners/NotifierZemidjan.php…\n//   mais la méthode s\'appelle gerer() au lieu de handle(),\n//   ou la classe est dans app/Services/Notification au lieu de\n//   app/Listeners/, et la découverte automatique la rate.\n// → l\'événement est dispatché, PERSONNE ne réagit, RIEN ne plante.\n//   Tu le découvres par le client : « je n\'ai jamais reçu le SMS ».', good:
'// 1) La visibilité d\'abord :\nphp artisan event:list\n//   → chaque événement, et SES listeners, en clair. Si le tien\n//     n\'y est pas, il n\'est pas branché — corrige l\'emplacement\n//     (app/Listeners/) ou le nom de méthode (handle()).\n\n// 2) Un test qui prouve la réaction (fiche Tests) :\nit(\'notifie le livreur à la commande payée\', function () {\n    Notification::fake();\n    event(new CommandePayee($commande, 15000));\n    Notification::assertSentTo($livreur, NotificationZemidjan::class);\n});', why: 'L\'architecture événementielle échange du couplage contre de l\'OPACITÉ : la liste des abonnés n\'est plus dans le code que tu lis — elle est dans la runtime. Côté cadeau : ajouter une réaction sans toucher au déclencheur. Côté ombre : une réaction mal branchée est INDIFFÉRENTE à l\'exécution (dispatch ne sait pas que personne n\'écoute). Les deux gardes professionnelles sont `php artisan event:list` (la table d\'abonnés, vérifiable en une commande) et le test de comportement (la réaction existe-t-elle POUR de vrai). Ne jamais « croire » l\'abonnement : le vérifier ou le tester.' }
          ],
          related: ['lv-queues', 'lv-controleurs', 'lv-tests', 'lv-authentification']
        },
        {
          id: 'lv-queues',
          title: 'Jobs & queues',
          icon: 'schedule',
          level: 'Avancé',
          tagline: 'Reporter le travail lourd en arrière-plan : dispatch, workers, retries et jobs échoués.', 
          intro: 'Ton client valide sa commande et ton serveur… redimensionne trois images, génère un PDF, appelle l\'API MTN MoMo, envoie deux mails. Quatre à huit secondes de page blanche — le client frappe F5, ta commande part en double, ton hébergeur toussote. La file d\'attente (queue) coupe ce nœud : la requête RÉPOND en 100 ms (« c\'est enregistré »), pendant qu\'un WORKER séparé digère le travail lourd en arrière-plan. Cette fiche couvre la mécanique entière — le job, la file, le worker qui la déverse — avec les deux pièges qui font passer la queue d\'un confort à une exigence : le worker jamais lancé, et le modèle « vivant » passé au job.', 
          blocks: [
            { t: 'h3', h: 'Le problème : le travail lourd n\'a rien à faire dans la requête' },
            { t: 'p', h: 'Le cycle HTTP est un huit clos : chaque requête monopolise un worker PHP de ton serveur — pendant que le tien redimensionne une image de 4 Mo, il NE SERT PERSONNE D\'AUTRE (les autres clients attendent leur tour sur l\'hébergement mutualisé). Et la montre joue contre toi : l\'utilisateur abandonne au-delà de 2-3 secondes, le navigateur coupe à 30-120. La loi d\'airain : tout ce qui dépasse une demi-seconde de traitement ET dont le client n\'a pas besoin du résultat immédiat est candidat à la queue. Mails, PDF, images, appels d\'API externes, exports : toute la liste passe en arrière-plan — et ta boutique redevient instantanée.' },
            { t: 'h3', h: 'La mécanique : le job, la file, le worker' },
            { t: 'p', h: 'Trois acteurs, un flux. Le **JOB** est une classe décrivant UNE tâche (avec sa méthode `handle()` — « ce qu\'il faudra faire ») ; il est SÉRIALISÉ (ses propriétés deviennent du JSON) et rangé dans la **FILE** (la table `jobs` en base, ou Redis — une boîte aux lettres ordonnée : FIFO). Le **WORKER** est un processus LONG (`php artisan queue:work`) qui vit à côté : il lit la file en boucle, désérialise chaque job et exécute `handle()`. Le serveur web, lui, ne fait QUE déposer l\'enveloppe — c\'est toute la latence que le client paie.' },
            { t: 'diagram', title: 'La même action, deux mondes : 4 secondes d\'attente contre 160 ms', svg: `<svg viewBox="0 0 680 262">
  <defs><marker id="lv-q1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <text x="20" y="30" class="dg-t">SANS queue — le client attend tout, dans sa requête</text>
  <rect x="20" y="42" width="150" height="46" rx="10" class="dg-b"/>
  <text x="95" y="62" class="dg-m" text-anchor="middle">créer la commande</text>
  <text x="95" y="80" class="dg-ms" text-anchor="middle">150 ms</text>
  <path d="M 170,65 L 184,65" class="dg-e" marker-end="url(#lv-q1)"/>
  <rect x="186" y="42" width="150" height="46" rx="10" class="dg-b"/>
  <text x="261" y="62" class="dg-m" text-anchor="middle">envoyer le mail</text>
  <text x="261" y="80" class="dg-ms" text-anchor="middle">900 ms</text>
  <path d="M 336,65 L 350,65" class="dg-e" marker-end="url(#lv-q1)"/>
  <rect x="352" y="42" width="150" height="46" rx="10" class="dg-b"/>
  <text x="427" y="62" class="dg-m" text-anchor="middle">traiter les images</text>
  <text x="427" y="80" class="dg-ms" text-anchor="middle">3 s</text>
  <path d="M 502,65 L 516,65" class="dg-e" marker-end="url(#lv-q1)"/>
  <rect x="518" y="42" width="146" height="46" rx="23" class="dg-b"/>
  <text x="591" y="62" class="dg-ko" text-anchor="middle" font-size="13">réponse : ~4 s</text>
  <text x="591" y="80" class="dg-ms" text-anchor="middle">client frustré…</text>
  <text x="20" y="122" class="dg-t">AVEC queue — la requête dépose l'enveloppe et répond</text>
  <rect x="20" y="134" width="220" height="46" rx="10" class="dg-b"/>
  <text x="130" y="154" class="dg-m" text-anchor="middle">créer commande + dispatch()</text>
  <text x="130" y="172" class="dg-ms" text-anchor="middle">160 ms</text>
  <path d="M 240,157 L 254,157" class="dg-e" marker-end="url(#lv-q1)"/>
  <rect x="256" y="134" width="162" height="46" rx="23" class="dg-b"/>
  <text x="337" y="154" class="dg-ok" text-anchor="middle" font-size="13">réponse : 160 ms</text>
  <text x="337" y="172" class="dg-ms" text-anchor="middle">le client est servi ✓</text>
  <path d="M 130,182 L 130,194" class="dg-e dg-dash" marker-end="url(#lv-q1)"/>
  <rect x="20" y="196" width="290" height="52" rx="12" class="dg-zone"/>
  <text x="34" y="214" class="dg-ms">LA FILE (jobs en attente)</text>
  <rect x="34" y="220" width="78" height="22" rx="11" class="dg-pill"/>
  <text x="73" y="235" class="dg-ms" text-anchor="middle">job : mail</text>
  <rect x="120" y="220" width="90" height="22" rx="11" class="dg-pill"/>
  <text x="165" y="235" class="dg-ms" text-anchor="middle">job : images</text>
  <path d="M 310,222 L 378,222" class="dg-e dg-dash" marker-end="url(#lv-q1)"/>
  <rect x="380" y="196" width="216" height="52" rx="12" class="dg-b"/>
  <text x="488" y="218" class="dg-t" text-anchor="middle">WORKER (queue:work)</text>
  <text x="488" y="236" class="dg-ms" text-anchor="middle">exécute en arrière-plan, en boucle</text>
</svg>`, caption: 'Le client n\'a pas besoin du mail pour savoir que sa commande est enregistrée : tout ce qui est LENT et différable part dans la file, et le worker — un processus à part, lancé une fois — la vide en continu. Sans worker, rappelle-toi : la file gonfle en silence (carte d\'erreur en bas).' },
            { t: 'code', lang: 'php', code:
'php artisan make:job TraiterImagesProduit\n→ app/Jobs/TraiterImagesProduit.php\n\nnamespace App\\Jobs;\n\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass TraiterImagesProduit implements ShouldQueue\n{\n    use \\Illuminate\\Bus\\Queueable;                    // le kit standard\n\n    public $tries = 3;              // 3 chances avant l\'échec définitif\n    public $backoff = [30, 120, 600];  // délais entre tentatives : 30 s, 2 min, 10 min\n\n    public function __construct(public readonly \\App\\Models\\Produit $produit) {}\n\n    public function handle(): void\n    {\n        $produit = $this->produit->fresh();       // données du JOUR, pas d\'hier\n        foreach ($produit->images as $image) {\n            $image->redimensionner(1200, 900);\n            $image->genererMiniature();\n        }\n    }\n}\n\n// Dans le contrôleur — la dépose, puis la réponse immédiate :\nTraiterImagesProduit::dispatch($produit);\nreturn redirect()->route(\'produits.show\', $produit)\n    ->with(\'succes\', \'Produit créé — images en préparation.\');' },
            { t: 'h3', h: 'Configurer : database pour démarrer, Redis pour les sérieux' },
            { t: 'code', lang: 'php', code:
'# .env — le pilote de file (connection « sync » par défaut en dev) :\nQUEUE_CONNECTION=database        # la table jobs (zéro infra à installer)\n# QUEUE_CONNECTION=redis         # la référence pro (file + cache + verrous)\n\nphp artisan queue:table && php artisan migrate   # la boîte aux lettres\n\n# Le worker — processus LONG, à superviser en production :\nphp artisan queue:work --queue=high,default --tries=3 --timeout=90\n#   --queue=high,default : la file « high » passe AVANT « default »\n#   --tries/--timeout : garde-fous du worker (lisez : ne laisser aucun job\n#   tourner plus de 90 s sans verdict)\n\n# En prod : Supervisor garde le worker VIVANT (redémarrage automatique).\n# En dev : lance-le dans un terminal, il écoute jusqu\'à Ctrl+C.' },
            { t: 'h3', h: 'Retries, échecs et la morgue des jobs (failed_jobs)' },
            { t: 'p', h: 'Un job peut échouer : l\'API MTN ne répond pas, l\'image est corrompue, la base un coup de baïonnette. La queue le gère par défaut selon tes règles : `tries` combien de fois, `backoff` entre quelques délais, `retryAfter` quand un timeout frappe. Au bout de la dernière tentative ratée, le job n\'est PAS supprimé : il est rangé dans la table **`failed_jobs`** — la morgue — avec sa trace complète. Tu y lis LE motif (`php artisan queue:failed`), et une fois la cause réparée : `php artisan queue:retry all` repart la file. Rien ne meurt dans le silence — c\'est la différence avec le cron au grenier.' },
            { t: 'h3', h: 'Sous le capot : pourquoi le job ne peut PAS emporter ton modèle vivant' },
            { t: 'code', lang: 'php', code:
'// Le job est SÉRIALISÉ avant d\'entrer dans la file :\ndispatch(new TraiterImagesProduit($produit));\n// → l\'enveloppe stockée en base ne peut contenir que du JSON :\n//   les propriétés publiques, figées à l\'instant du dispatch.\n\n// Le trait SerializesModels ruse intelligemment :\n//   → il ne stocke QUE L\'ID du modèle ({\"produit\":{« id »:42}})\n//   → au réveil, le worker REFAIT Produit::find(42)\n// Conséquences nettes :\n// 1) le produit supprimé entre-temps ? handle() sur un modèle ABSENT\n//    → $this->produit->fresh() renvoie null, ou DeleteWhenMissingModels.\n// 2) les relations chargées au dispatch ne survivent PAS —\n//    recharge avec ->load() dans handle().\n// 3) un objet métier complexe (montant, adresse) :\n//    stocke ses DONNÉES (montant int, adresse string), jamais l\'objet tourbillon.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« La queue et le cron, c\'est pareil. »** Le cron exécute une commande PÉRIODIQUE (« chaque nuit »), la queue traite des TÂCHES en continu, dès leur arrivée. La queue est parfaite pour le ponctuel lourd ; le cron pour le périodique — ils se complètent sans se concurrencer.',
              '**« dispatch() lance le traitement. »** dispatch() DÉPOSE l\'enveloppe. Le worker séparé fait le traitement — sans worker, la file GONFLE silencieusement et rien ne part (carte d\'erreur en bas).',
              '**« Le job voit la base comme au moment du dispatch. »** Il voit la base AU RÉVEIL — d\'où `fresh()` avant le travail, et le refus de faire confiance aux données figées du dispatch.',
              '**« sync en dev = la queue testée. »** sync exécute immédiatement — tu apprends du code dans handle(), mais RIEN du cycle (sérialisation, worker, retry). Garde au moins un environnement (staging, un test) avec une vraie file.',
              '**« Un job qui rate est perdu, c\'est fatal. »** Non : il finit dans `failed_jobs` (avec la trace), réparable et relançable (`queue:retry`). Ce qui est fatal, c\'est la file jamais surveillée — mets une alerte sur le count des échoués, au moins un dashboard Horizon en sérieux.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le worker oublié qui fait gonfler la file, et le modèle tourbillon passé au job — les deux faces du même détachement à civiliser.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les événements de la fiche précédente se TERMINENT souvent ici : un listener `ShouldQueue`, c\'est un job, point final — la fiche Événements t\'a donné le déclencheur, celle-ci te donne la salle d\'attente. Le mail de bienvenue post-inscription (fiche Authentification) est ton cas d\'école, et les échecs rebouclent sur la fiche Erreurs : `failed_jobs`, `retry`, logs — tout y est. Si l\'idée « ne pas bloquer la requête » te rappelle les promesses de la fiche Asynchrone du module JavaScript, c\'est la même intuition — à ceci près qu\'ici, le « plus tard » survit au redémarrage du serveur grâce à la persistance.' }
          ],
          errors: [
            { title: 'Job dispatché… jamais traité', lang: 'php', bad:
'// En production, les clients appellent : « j\'ai pas reçu le mail ».\n// Tu vérifies : le code est bon, le dispatch est bien là…\n// → le WORKER n\'est pas lancé (ou est mort mardi à 3 h).\n//   La file `jobs` compte 4 812 enveloppes en attente,\n//   chaque « commande » a soigneusement déposé un courrier\n//   dans une boîte aux lettres sans facteur. ✗', good:
'// 1) En prod : Supervisor veille (extrait de config) :\n//   [program:worker]\n//   command=php /var/www/artisan queue:work --tries=3 --timeout=90\n//   autostart=true\n//   autorestart=true          → le redémarrage, toujours\n\n// 2) Surveiller la file, au minimum :\nphp artisan queue:monitor default --max=100\n//   (alerte si la file dépasse 100 enveloppes en attente)\n\n// 3) Le réflexe déploiement : queue:restart après chaque mise\n//   en ligne (le worker recharge le code neuf).\n// La queue est une ligne de vie : traite-la comme si chaque\n// enveloppe comptait — parce qu\'elle compte une commande chacune.', why: 'L\'asynchronisme inverse la visibilité : synchrone, une panne est une erreur 500 immédiate ; asynchrone, une panne est une boîte aux lettres qui gonfle EN SILENCE — jusqu\'à ce que les clients te le disent, 4 000 enveloppes trop tard. Le worker est un processus à part entière : il meurt (redéploiement, mémoire, hébergeur), il doit être gardé vivant (Supervisor), surveillé en amplitude (monitor, alertes) et rafraîchi à chaque déploiement (queue:restart — le worker long charge le code au DÉMARRAGE, il tournerait sur l\'ancien code sinon). La queue bien traitée est l\'outil le plus rentable de Laravel ; la queue non supervisée est un détecteur de confiance qui grille.' },
            { title: 'Passer un modèle Eloquent « vivant » au job', lang: 'php', bad:
'class TraiterImagesProduit implements ShouldQueue\n{\n    public function __construct(\n        public Produit $produit,\n        public $relationsChargees,          // ✗ collections, relations lazy\n    ) {}\n    public function handle(): void\n    {\n        $this->produit->images->first()->redimensionner();\n        // ✗ les images chargées AU DISPATCH ne sont PAS celles de maintenant :\n        //   la relation figée JSON, le modèle peut avoir bougé (ou être mort)\n    }\n}', good:
'class TraiterImagesProduit implements ShouldQueue\n{\n    use SerializesModels;              // → stocke l\'ID, régénère au réveil\n\n    public function __construct(public readonly Produit $produit) {}\n\n    public function handle(): void\n    {\n        $produit = $this->produit->fresh([\'images\']);   // données DU JOUR\n        if (!$produit) return;                          // mort entre-temps\n        foreach ($produit->images as $image) {\n            $image->redimensionner(1200, 900);\n        }\n    }\n}', why: 'Entre dispatch et exécution, le TEMPS PASSE — la base aussi : le produit peut être édité, supprimé, enrichi d\'autres images. Le trait SerializesModels n\'est pas du confort : c\'est la RÉPONSE correcte au temps qui passe (stocke l\'id, re-fetch au réveil). Le modèle « vivant » (avec relations pré-chargées au dispatch) est une photo du passé présentée comme le présent — et chaque relation figée ajoute sa tromperie. Règles de survie du métier asynchrone : ne passer que des IDENTIFIANTS et DONNÉES SIMPLES au constructeur, recharger TOUT au démarrage de handle() avec fresh(), et décider explicitement du cas « modèle mort entre-temps » (sauter proprement, ou DeleteWhenMissingModels) — ces trois lignes sauvent des weekends entiers de débogage en production.' }
          ],
          related: ['lv-evenements', 'lv-authentification', 'lv-erreurs', 'js-asynchrone']
        },
        {
          id: 'lv-api-resources',
          title: 'API Resources',
          icon: 'api',
          level: 'Avancé',
          tagline: 'Transformer tes modèles en réponses JSON stables, sans fuiter un seul champ interne.', 
          intro: 'Renvoyer ton modèle Eloquent directement en JSON, c\'est ouvrir la portière de ta voiture en pleine rue : tout le monde voit l\'intérieur — colonnes internes, timestamps techniques, clés étrangères, champs sensibles de la table d\'à côté (la relation lazy qui démarre au premier regard). Les **API Resources** remettent le chauffeur au centre : une classe par ressource qui décide PRÉCISÉMENT quels champs sortent, sous quel nom, dans quel format — un contrat de sortie STABLE dont tu peux faire évoluer l\'intérieur sans casser les clients. C\'est la colonne vertébrale de toute API Laravel sérieuse, et le point d\'entrée de la consommation par fetch (module JavaScript).', 
          blocks: [
            { t: 'h3', h: 'Le problème : « return $produit » est une fuite par défaut' },
            { t: 'p', h: 'Quand tu fais `return $produit;` dans un contrôleur API, Laravel sérialise TOUT l\'objet : chaque colonne (y compris `seuil_interne`, `fournisseur_id`, `created_at` brut ISO 8601), et — plus insidieux — chaque RELATION déjà chargée en mémoire au fil du contrôleur (la boutique du produit, avec le téléphone du vendeur). Le client API voit une fuite de données qui a l\'air d\'une réponse normale, et ton API colle son schéma interne à la figure du monde : renommer une colonne en base devient une casse d\'API, publique, versionnée. La resource coupe la relation : **le client ne voit que ce que le contrat déclare**, et l\'intérieur reste libre de bouger.' },
            { t: 'diagram', title: 'La resource : une liste blanche entre ton modèle et le monde', svg: `<svg viewBox="0 0 680 240">
  <defs><marker id="lv-api1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="20" y="20" width="236" height="200" rx="14" class="dg-b"/>
  <text x="138" y="42" class="dg-t" text-anchor="middle">Modèle Eloquent (tout)</text>
  <text x="34" y="66" class="dg-m">id · nom · prix · stock</text>
  <text x="34" y="84" class="dg-m">description · created_at</text>
  <text x="34" y="108" class="dg-ko" font-size="12">✗ seuil_interne</text>
  <text x="34" y="126" class="dg-ko" font-size="12">✗ fournisseur_id</text>
  <text x="34" y="144" class="dg-ko" font-size="12">✗ boutique.vendeur.tel</text>
  <text x="34" y="162" class="dg-ko" font-size="12">✗ timestamps bruts ISO</text>
  <text x="34" y="188" class="dg-ms">tout ça sort si tu fais</text>
  <text x="34" y="204" class="dg-ms">return $produit;  (la fuite)</text>
  <path d="M 256,120 L 290,120" class="dg-e" marker-end="url(#lv-api1)"/>
  <rect x="292" y="76" width="150" height="88" rx="12" class="dg-ba"/>
  <text x="367" y="104" class="dg-t" text-anchor="middle">ProduitResource</text>
  <text x="367" y="124" class="dg-m" text-anchor="middle">toArray() :</text>
  <text x="367" y="142" class="dg-m" text-anchor="middle">la liste blanche</text>
  <path d="M 442,120 L 476,110" class="dg-e" marker-end="url(#lv-api1)"/>
  <rect x="478" y="40" width="182" height="160" rx="14" class="dg-b"/>
  <text x="569" y="62" class="dg-t" text-anchor="middle">{ JSON — le contrat }</text>
  <text x="492" y="88" class="dg-m">"id": 1,</text>
  <text x="492" y="106" class="dg-m">"nom": "Gari",</text>
  <text x="492" y="124" class="dg-m">"prix": 21000,</text>
  <text x="492" y="142" class="dg-m">"en_stock": true,</text>
  <text x="492" y="160" class="dg-m">"categorie": { … }</text>
  <text x="492" y="184" class="dg-ok" font-size="12">✓ stable, maîtrisé, sans fuite</text>
</svg>`, caption: 'La resource est un traducteur à LISTE BLANCHE : seuls les champs déclarés dans toArray() franchissent la frontière — les colonnes internes, relations chargées et formats bruts restent dedans. Résultat : les clients API programment contre un contrat stable, et tu peux renommer une colonne en base demain sans rien casser.' },
            { t: 'h3', h: 'Créer et retourner une resource' },
            { t: 'code', lang: 'php', code:
'php artisan make:resource ProduitResource\n→ app/Http/Resources/ProduitResource.php\n\nnamespace App\\Http\\Resources;\n\nuse Illuminate\\Http\\Resources\\Json\\JsonResource;\n\nclass ProduitResource extends JsonResource\n{\n    // La FORME de la sortie — un tableau, dire ce qui sort, et comment :\n    public function toArray($request): array\n    {\n        return [\n            \'id\'         => $this->id,\n            \'nom\'        => $this->nom,\n            \'prix\'       => $this->prix,\n            \'prix_humain\' => $this->prix_formate,             // accessor (fiche Eloquent)\n            \'en_stock\'   => $this->stock > 0,\n            \'categorie\'  => new CategorieResource($this->whenLoaded(\'categorie\')),\n            //            + relation imbriquée, CHARGÉE SEULEMENT si le\n            //              contrôleur l\'a eager-loadée — sinon ABSENTE du JSON,\n            //              jamais null qui gâche le contrat\n            \'liens\'      => [\n                \'fiche\' => route(\'api.produits.show\', $this->id),\n            ],\n        ];\n    }\n}\n\n// Dans le contrôleur — une ligne, le contrat à la place de l\'objet :\npublic function show(Produit $produit)\n{\n    return new ProduitResource($produit->load(\'categorie\'));   // eager-load controlé\n}\n\npublic function index()\n{\n    $produits = Produit::enStock()->paginate(20);\n    return ProduitResource::collection($produits);   // liste + meta de pagination AUTO\n}' },
            { t: 'p', h: 'Note le bonus structurel : `ProduitResource::collection($pagination)` conserve les métadonnées Laravel (`links`, `meta`) — la pagination API standard, versionnée gratuitement. Le client fetch (module JavaScript, fiche fetch) consomme `json.data` et `json.meta.current_page` sans surprises, et ta documentation REST devient la resource elle-même.' },
            { t: 'h3', h: 'Pourquoi c\'est une protection — pas un confort' },
            { t: 'table', head: ['Sans resource', 'Avec resource'], rows: [
              ['Toute colonne sort, y compris internes', 'Seuls les champs DÉCLARÉS sortent'],
              ['Relations lazy embarquées quand chargées', '`whenLoaded` : chargée = présente, sinon absente'],
              ['Renommer une colonne casse l\'API publique', 'La resource traduit : l\'interne bouge, le contrat tient'],
              ['Timestamps bruts ISO, formats au hasard', 'Formats normalisés : `prix` en int, dates en string FR si tu veux'],
              ['Chaque endpoint expose sa version du même modèle', 'UN contrat partagé par tous les endpoints (index, show, search)']
            ]},
            { t: 'h3', h: 'Sous le capot : whenLoaded et le N+1 de l\'API' },
            { t: 'p', h: 'Le problème N+1 (fiche Relations) suit l\'API comme son ombre : une resource qui touche `$this->categorie` sur CHAQUE ligne d\'une collection de 20 provoque 20 requêtes SQL si la relation n\'est pas pré-chargée. Le mécanisme `whenLoaded` joue ici en double : il rend l\'ABSENCE propre quand la relation n\'est pas chargée (pas de `null` forcé, pas d\'erreur, simplement le champ absent du contrat), ET il rend VISIBLE le lazy loading — si le champ catégorie de votre console disparaît du JSON, c\'est que le contrôleur a oublié son `with()` — le symptôme t\'alerte avant la dégradation de latence, exactement comme `preventLazyLoading` côté web.' },
            { t: 'code', lang: 'php', code:
'// Le contrôleur commande le chargement — la resource ne requête JAMAIS :\npublic function index()\n{\n    $produits = Produit::enStock()\n        ->with(\'categorie:id,nom\')          // 2 requêtes, pas 21\n        ->paginate(20);\n    return ProduitResource::collection($produits);\n}\n\n// La resource lit les relations SANS déclencher de requêtes\n// (whenLoaded), et peut même réutiliser des sous-resources :\n\'categorie\' => new CategorieResource($this->whenLoaded(\'categorie\')),\n\'avis\'      => AvisResource::collection($this->whenLoaded(\'avis\')),\n\'note_moyenne\' => $this->when(\n    $this->relationLoaded(\'avis\'),\n    fn () => round($this->avis->avg(\'note\'), 1)\n),' },
            { t: 'callout', kind: 'info', h: 'Versionner plus tard ? La tentation `v1/ProduitResource` peut attendre : le contrat unique sert tant que les champs ne se cassent pas. Quand une v2 arrive VRAIMENT (changement de forme incompatible), tu auras `App\\Http\\Resources\\V2\\ProduitResource` — mais seulement ce jour-là. Ne pré-paie pas une complexité de versionnage que la stabilité du contrat rend superflue aujourd\'hui.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Eloquent → JSON est déjà un contrat, il y a tout dedans. »** C\'est l\'inverse : « tout dedans » n\'est pas un contrat, c\'est une FUITE (colonnes internes, relations du moment) ET une promesse implicite (« tu peux compter sur ces champs ») que tu devras honorer toute la vie de l\'API. Le contrat explicite libère l\'intérieur.',
              '**« Une resource = un endpoint. »** Non : une resource par MODÈLE (ou forme), partagée par tous les endpoints (index, show, recherche, exports). C\'est ce partage qui garantit au client qu\'une fiche produit a TOUJOURS la même forme, quel que soit le chemin emprunté.',
              '**« whenLoaded masque les oublis de with(). »** Il les rend PROPRES (champ absent) — mais l\'oubli reste un oubli fonctionnel (le client ne voit plus la catégorie). Le garde-fou reste `preventLazyLoading` en dev + le test de forme de l\'API.',
              '**« Je dois versionner dès le premier jour. »** La version est un COÛT (deux arbres de resources, deux documentations) qui ne se justifie que par une casse incompatible. Le terrain prépayé, c\'est le contrat stable — pas la version.',
              '**« La resource peut requêter un peu, au pire. »** La resource est un TRANSLATEUR, pas un lanceur de requêtes — toute méthode qui déclenche SQL (avg sur relation loadée non eager, count) doit être offerte PAR le contrôleur (eager ou withCount), lue par la resource.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Le modèle brut rendu au monde, et la resource qui relance N+1 — les deux fuites du cycle API, bouchées.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu appliques ici, côté SORTIE, tout ce que les fiches Eloquent et Relations t\'ont appris côté LECTURE : `whenLoaded` n\'existe que parce que `with()` (fiche Relations) pré-charge, et le N+1 qui y frappe est exactement le monstre que `preventLazyLoading` t\'a appris à repérer — autre canal, même diagnostic. Sanctum (fiche Authentification) garde la porte de ces endpoints, et le JSON que tu signes ici devient le contrat que le `fetch` du module JavaScript consommera là-bas : un champ renommé est une casse pour ton front, d\'où l\'importance des ressources comme couche de traduction stable.' }
          ],
          errors: [
            { title: 'Retourner le modèle brut', lang: 'php', bad:
'public function show(Produit $produit)\n{\n    $produit->load(\'boutique.vendeur\');     // le contrôleur a chargé…\n    return $produit;                           // ✗ …et TOUT sort :\n    // - seuil_interne, fournisseur_id (colonnes internes)\n    // - boutique.vendeur.telephone (numéro privé dans le JSON public)\n    // - created_at brut ISO 8601\n    // Le client fetch n\'a qu\'à lire — et ton contrat est maintenant\n    // gravé dans la pierre du monde entier', good:
'public function show(Produit $produit)\n{\n    return new ProduitResource($produit->load(\'categorie\'));\n    // ✓ sort ENTIÈREMENT ce que toArray() déclare, RIEN de plus :\n    //   pas de seuil_interne, pas de vendeur, dates formatées,\n    //   catégorie seule (et présente, eager-loadée consciemment)\n}', why: 'La sérialisation automatique d\'Eloquent est paresseuse par principe : tout ce qui est là passe, parce que la bibiothèque ne peut pas deviner ce qui est PUBLIC. Le coût n\'est pas que cosmétique : chaque colonne interne rendue visible devient partie TANT publique (tu ne peux plus la renommer sans casser des clients), chaque relation chargée embarque données PRIVÉES potentielles — et les tests passent quand même, rien ne semble cassé. La resource inverse la responsabilité : rien ne sort par défaut, tout sortie se déclare — la liste blanche au lieu de la boîte ouverte. Et l\'intérieur retrouve sa liberté de mouvement, qui est la définition même du mot « privé ».' },
            { title: 'La resource qui relance le N+1', lang: 'php', bad:
'// ProduitResource::toArray() :\n\'categorie\' => $this->categorie->nom,     // ✗ propriété lazy :\n//  pour 20 produits en collection → 20 requêtes SQL,\n//  l\'API « toute simple » qui rame exactement comme la vue web\n//  du débutant — le N+1 (fiche Relations) a juste changé d\'étage', good:
'// 1) Le CONTRÔLEUR eager-loade — la resource ne requête pas :\npublic function index()\n{\n    $produits = Produit::enStock()\n        ->with(\'categorie:id,nom\')\n        ->paginate(20);\n    return ProduitResource::collection($produits);\n}\n\n// 2) La resource LIT la relation proprement :\n\'categorie\' => new CategorieResource($this->whenLoaded(\'categorie\')),\n//   → présente si chargée (2 requêtes au total), champ absent sinon —\n//     jamais de null forcé, jamais de requête surprise', why: 'Le N+1 est agnostique au canal : la même trappe existe côté Blade et côté API. La ressource semble innocente (« je lis la propriété categorie ») — mais Eloquent y répond à la paresse, une requête par ligne, et ta collection de 20 coûte 21 aller-retours SQL. Le réflexe intégré en trois temps conserve la séparation des rôles : le CONTRÔLEUR pré-charge (`with()` — il connaît le volume), la RESOURCE traduit (`whenLoaded` — elle ignore les volumes), et `preventLazyLoading` en dev aboie immédiatement si la chaîne casse. Un endpoint lent d\'abord, des requêtes comptées toujours : l\'API et le web partagent le même diagnostic.' }
          ],
          related: ['lv-relations', 'lv-authentification', 'lv-eloquent', 'js-fetch']
        },
        {
          id: 'lv-tests',
          title: 'Tests : Pest & PHPUnit',
          icon: 'science',
          level: 'Avancé',
          tagline: 'Feature tests HTTP, base de test isolée, factories : dormir tranquille à chaque déploiement.', 
          intro: 'Tu connais la sensation du vendredi 18 h : un collègue déploie la refonte du panier, et tout le weekend tu surveilles Slack en attendant « le site est en rade ». Les tests sont l\'antidote structurel : avant chaque déploiement, une SUITE de scénarios (« un invité peut voir le catalogue », « Awa ne peut pas supprimer le produit de sa sœur », « le paiement MoMo échoué redirige avec erreur ») rejoue ta boutique entière en une minute — et la 500 ne part jamais en prod. Laravel rend les tests presque agréables : HTTP complet en une ligne (`$this->get(\'/boutique\')->assertOk()`), base SQLite en mémoire isolée par test, factories qui donnent des données réalistes, et Pest, la syntaxe qui donne envie d\'en écrire. C\'est la fiche qui transforme chacune des 16 autres en preuve.', 
          blocks: [
            { t: 'h3', h: 'Pourquoi les tests automatisés (et pas « je vérifierai à la main »)' },
            { t: 'p', h: 'Ton site a 30 pages et 12 formulaires : vérifier à la main que « tout marche » avant chaque déploiement prend 45 minutes — et tu le fais donc jamais, ou en diagonale, ou la veille du bug. La boucle d\'or : tu écris le test UNE FOIS (le code qui VÉRITIFIE le comportement), et ensuite il rejoue en secondes, à chaque commit à jamais. Le prix est au début ; la rente est permanente. Et l\'effet secondaire que personne ne prévoit : écrire le test AVANT d\'implémenter te fait CHOISIR l\'API d\'abord (« la commande doit renvoyer vers confirmation après POST /commandes ») — le test éclaire la conception avant de vérifier l\'implémentation.' },
            { t: 'h3', h: 'Pest : la syntaxe qui donne envie' },
            { t: 'code', lang: 'php', label: 'tests/Feature/CatalogueTest.php', code:
'<?php\n\nuse App\\Models\\Categorie;\nuse App\\Models\\Produit;\n\nit(\'affiche le catalogue public\', function () {\n    Categorie::factory()->create([\'nom\' => \'Céréales\']);\n    Produit::factory()->create([\'nom\' => \'Gari premium\', \'stock\' => 8]);\n\n    $this->get(\'/boutique\')\n        ->assertOk()                          // 200\n        ->assertSee(\'Gari premium\')          // contenu présent\n        ->assertSee(\'Céréales\');\n});\n\nit(\'redirige un invité qui veut commander\', function () {\n    $this->post(\'/commandes\', [\'produit_id\' => 1])\n        ->assertRedirect(\'/login\');          // middleware auth d\'abord\n});\n\nit(\'refuse à Awa de supprimer le produit de sa sœur\', function () {\n    $awa = \\App\\Models\\User::factory()->create();\n    $produit = Produit::factory()->create();   // d\'une AUTRE boutique\n\n    $this->actingAs($awa)\n        ->delete(\"/produits/{$produit->id}\")\n        ->assertForbidden();                  // la policy en preuve\n});' },
            { t: 'diagram', title: 'Anatomie d\'un test : Arrange, Act, Assert', svg: `<svg viewBox="0 0 680 172">
  <defs><marker id="lv-t1" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-fill-e"/></marker></defs>
  <rect x="16" y="52" width="150" height="72" rx="12" class="dg-b"/>
  <text x="91" y="76" class="dg-t" text-anchor="middle">1 · ARRANGE</text>
  <text x="91" y="94" class="dg-m" text-anchor="middle">les données</text>
  <text x="91" y="112" class="dg-ms" text-anchor="middle">Produit::factory()</text>
  <path d="M 166,88 L 194,88" class="dg-e" marker-end="url(#lv-t1)"/>
  <rect x="196" y="52" width="150" height="72" rx="12" class="dg-b"/>
  <text x="271" y="76" class="dg-t" text-anchor="middle">2 · ACT</text>
  <text x="271" y="94" class="dg-m" text-anchor="middle">l'action testée</text>
  <text x="271" y="112" class="dg-ms" text-anchor="middle">get('/boutique')</text>
  <path d="M 346,88 L 374,88" class="dg-e" marker-end="url(#lv-t1)"/>
  <rect x="376" y="52" width="150" height="72" rx="12" class="dg-b"/>
  <text x="451" y="76" class="dg-t" text-anchor="middle">3 · ASSERT</text>
  <text x="451" y="94" class="dg-m" text-anchor="middle">la preuve</text>
  <text x="451" y="112" class="dg-ms" text-anchor="middle">assertOk() · assertSee()</text>
  <path d="M 526,88 L 554,88" class="dg-e" marker-end="url(#lv-t1)"/>
  <rect x="556" y="52" width="110" height="72" rx="12" class="dg-ba"/>
  <text x="611" y="82" class="dg-t" text-anchor="middle">vert ✓</text>
  <text x="611" y="102" class="dg-t" text-anchor="middle">/ rouge ✗</text>
  <text x="340" y="156" class="dg-m" text-anchor="middle">…sur une base SQLite EN MÉMOIRE recréée à chaque test (RefreshDatabase) — jamais ta vraie base.</text>
</svg>`, caption: 'Chaque test suit le même scénario en trois temps : on PRÉPARE un mini-monde (factory), on JOUE l\'action (une requête factice à toute l\'application), puis on EXIGE le résultat (les assertions). Si la boutique change un jour et qu\'un comportement promis dévie — le test vire au rouge AVANT la mise en ligne, pas après.' },
            { t: 'callout', kind: 'info', h: 'Mot nouveau — une **assertion** (`assertOk`, `assertSee`, `assertForbidden`…) : un contrat écrit, « cette page DOIT répondre 200 ». Le test exécute le scénario puis confronte la réalité au contrat : conforme → vert ; déviante → rouge, avec la ligne fautive. Une suite verte n\'est pas « rien » : c\'est toutes tes règles du jeu qui tiennent encore, vérifiées en une minute.' },
            { t: 'p', h: 'PHPUnit sous-jacent, Pest au-dessus : les `assertOk()`, `assertRedirect()`, `assertForbidden()`, `assertSee()`, `assertJsonPath()` sont des helpers HTTP Laravel — le test Feature joue TOUTE la pile (route → middleware → contrôleur → policy → base de test), exactement comme un vrai client, mais en mémoire et instantané. C\'est la raison de son efficacité : chaque fiche de ce module (routing, middleware, policy, validation…) devient une LIGNE de preuve possible.' },
            { t: 'h3', h: 'La base de test : isolée, fraîche, jetable' },
            { t: 'code', lang: 'php', label: 'phpunit.xml + le trait RefreshDatabase', code:
'<!-- phpunit.xml — la config DÉDIÉE AUX TESTS (surcharge .env) -->\n<env name="APP_ENV" value="testing"/>\n<env name="DB_CONNECTION" value="sqlite"/>\n<env name="DB_DATABASE" value=":memory:"/>        <!-- base EN MÉMOIRE,\n                                                      créée vide à chaque test,\n                                                      détruite à sa sortie -->\n\n<?php\n\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\n\nuses(RefreshDatabase::class);    // Pest : migrations rejouées avant CHAQUE\n                                   // test dans cette base jetable — zéro fuite\n                                   // d\'un test à l\'autre (l\'isolement parfait)\n\nit(\'compte les produits du catalogue\', function () {\n    Produit::factory()->count(3)->create();\n    expect(Produit::count())->toBe(3);        // toujours 3, jamais 3 + débris\n});' },
            { t: 'callout', kind: 'warn', h: 'La pire erreur possible (carte en bas) : tester sur ta BASE DE DEV. `RefreshDatabase` y réinitialiserait TOUT — et le moindre `User::factory()->count(500)->create()` polluerait ton environnement de développement. La règle de survie : `phpunit.xml` avec SQLite en mémoire, JAMAIS la base du `.env` de dev. Et le test doit se préoccuper de sa base LUI-MÊME (RefreshDatabase), pas d\'un .env à surveiller.' },
            { t: 'h3', h: 'Les factories : des données réalistes en une ligne' },
            { t: 'code', lang: 'php', code:
'php artisan make:factory ProduitFactory --model=Produit\n\nclass ProduitFactory extends Factory\n{\n    public function definition(): array\n    {\n        return [\n            \'nom\'          => fake()->words(3, true),       // Faker francisé\n            \'slug\'         => fn ($attrs) => str()->slug($attrs[\'nom\']),\n            \'prix\'         => fake()->numberBetween(500, 50000),\n            \'stock\'        => fake()->numberBetween(0, 100),\n            \'categorie_id\' => Categorie::factory(),          // le parent auto\n        ];\n    }\n}\n\n// À l\'usage — chaque scénario, ses données du jour :\nProduit::factory()->create();                                // 1\nProduit::factory()->count(10)->create();                     // 10\nProduit::factory()->enStock()->enPromo()->create();          // états nommés\nProduit::factory()->for(Categorie::factory()->create([\'nom\' => \'Huiles\']))->create();\n// → des données DIFFÉRENTES à chaque exécution (pas le biais du\n//   « ça marche avec CE jeu de données »), repliables avec le seed.' },
            { t: 'h3', h: 'Les fakes : couper le monde extérieur' },
            { t: 'code', lang: 'php', code:
'use Illuminate\\Support\\Facades\\Mail;\nuse Illuminate\\Support\\Facades\\Notification;\nuse Illuminate\\Support\\Facades\\Http;\n\nit(\'envoie la confirmation après le paiement\', function () {\n    Mail::fake();                       // RIEN ne part — tout est ENREGISTRÉ\n    Notification::fake();\n    Http::fake([\n        \'api.mtn.com/*\' => Http::response([\'status\' => \'SUCCESSFUL\'], 200),\n    ]);                                 // l\'API MTN devient une marionnette\n\n    $this->actingAs($client)->post(\'/commandes\', $donnees)->assertOk();\n\n    Mail::assertQueued(ConfirmationCommande::class);        // la preuve\n    Http::assertSent(fn ($req) => $req[\'amount\'] == 15000); // et l\'appel exact\n});' },
            { t: 'h3', h: 'Que tester, dans quel ordre ? La pyramide simple' },
            { t: 'ol', items: [
              '**D\'abord le bonheur** (« happy path ») : un utilisateur connecté ajoute un produit, le voit dans sa liste — chaque feature passée au scénario nominal.',
              '**Ensuite les droits** : invité → redirection login ; Awa → pas sur la donnée d\'autrui (test policy, fiche Autorisation) ; gestionnaire → permis là où prévu.',
              '**Puis les validations** : prix négatif refusé, email invalide refusé, nom en doublon refusé — la Form Request en preuve (fiche Validation).',
              '**Puis les exceptions contrôlées** : solde insuffisant → 422 avec `solde_insuffisant` ; commande déjà livrée → l\'exception métier exacte (fiche Erreurs).',
              '**Enfin les cas limites métier** : montant exactement au seuil, commande à zéro quantité refusée, twintaine simultanée. Le path qui t\'a brûlé UNE FOIS devient un test PERMANENT — c\'est la rançon du succès.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ol', items: [
              '**« Les tests ralentissent le développement. »** Au départ, un peu ; ensuite tu refactores sans peur (« renommons la colonne » → tests verts ou rouges en 30 secondes, pas vendredi 18 h). Le temps économisé sur le débogage prod paye le pari chaque semaine.',
              '**« RefreshDatabase = automatique, pas besoin d\'y penser. »** Il faut la base de TEST (SQLite en mémoire) — RefreshDatabase contre la mauvaise base est la catastrophe (carte en bas).',
              '**« Plus de tests = mieux : testons tout chaque classe. »** Le coût est le MAINTIEN de la suite : un test fragile coûte plus cher que son absence. La pyramide consacrée : feature HTTP d\'abord (le comportement utilisateur), unitaire pour les calculs purs, navigateur (Dusk) seulement pour les parcours JS critiques.',
              '**« fake() et données réalistes sont un luxe. »** Une factory réaliste (montants 500-50 000 F, noms variés) trouve les bugs que le jeu de démo immuable cache (le null, le cas limite, le montant zéro). Le fake aléatoire est un testeur gratuit qui ne dort jamais.',
              '**« Il faut un écran vert 100 % coverage. »** Le coverage mesure la COUVERTURE, pas la PERTINENCE : 80 % de chemins utiles testés avec soin battent 100 % de lignes traversées sans assertion. Chaque test doit POUVOIR échouer — celui qui ne peut pas échouer ne prouve rien.'
            ]},
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'La mauvaise base de données visée par les tests, et le test du seul chemin heureux — les deux fissures par lesquelles tout l\'édifice se fissure.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Dernière fiche du module, et la boucle est bouclée : le redémarrage propre à chaque requête, découvert dans la fiche Fondamentaux, est précisément ce qui rend `RefreshDatabase` et les tests isolés possibles. Tout ce que tu as appris devient ici une PREUVE : les 403 de la fiche Autorisation (`assertForbidden`), les 422 de la fiche Validation (`assertInvalid`), l\'émission de la fiche Événements (`Event::fake`), l\'envoi des jobs de la fiche Queues (`Queue::fake`) — sans jamais toucher la vraie base, ni envoyer un vrai mail à Awa. Chaque fiche précédente avait une promesse ; celle-ci la fait signer.' }
          ],
          errors: [
            { title: 'Les tests qui tapent la vraie base', lang: 'php', bad:
'// phpunit.xml oublié au défaut, ou :\n<env name=\"DB_DATABASE\" value=\"boutique\"/>\n\n$ php artisan test\n// ✗ RefreshDatabase vient de VIDER ta base de dev\n//   (migrate:fresh contre boutique) — 3 mois de produits de\n//   démo, de comptes de test, perdus. Ou au mieux : chaque test\n//   laisse ses débris s\'empiler dans ta base de développement.', good:
'<!-- phpunit.xml — LA base de test, isolée, en mémoire -->\n<env name=\"APP_ENV\" value=\"testing\"/>\n<env name=\"DB_CONNECTION\" value=\"sqlite\"/>\n<env name=\"DB_DATABASE\" value=\":memory:\"/>\n<!-- à chaque test : une base vide construite, utilisée, détruite. -->\n\n<?php\nuses(\\Illuminate\\Foundation\\Testing\\RefreshDatabase::class);\n// → les tests vivent dans leur bulle, ta dev en paix\n// Bonus survie : php artisan test —parallel si la suite grossit', why: 'Le test a besoin d\'une base DÉTERMINISTE : les données attendues doivent être CELLES créées par le test, pas le souvenir d\'une session précédente. La réponse canonique est SQLite in-memory (création instantanée, zéro état persistant, zéro collision avec ta dev) + RefreshDatabase (les migrations rejouées à chaque test, garantissant l\'isolement à l\'intérieur de la suite). Le piège `DB_DATABASE` oublié fait tout l\'inverse : le test touche ta dev, RefreshDatabase « nettoie » donc ta dev complète — et c\'est un samedi matin perdu à re-seeder que `value=\":memory:\"` aurait empêché. La base de test n\'est pas un détail : c\'est la règle n°1 du métier de testeur.' },
            { title: 'Tester seulement le chemin heureux', lang: 'php', bad:
'it(\'le client peut commander\', function () {\n    $this->actingAs($client)->post(\'/commandes\', $donnees)->assertOk();\n});\n// ✗ et puis… rien. Le test passe même si :\n//   - un invité peut commander (auth oubliée sur la route)\n//   - Awa peut payer avec le solde de sa sœur\n//   - le stock part en négatif\n//   - l\'API MTN renvoie une erreur et la commande est quand même créée\n// Le chemin heureux prouve que le site EXISTE, pas qu\'il PROTÈGE.', good:
'// Le nominal + les protections qui font le métier :\nit(\'le client connecté peut commander\', fn () => /* scenario ok */);\nit(\'un invité est renvoyé vers le login\',\n    fn () => $this->post(\'/commandes\', [])->assertRedirect(\'/login\'));\nit(\'refuse le produit d\'une autre boutique\',\n    fn () => $this->actingAs($awa)->delete("/produits/{$produit->id}")->assertForbidden());\nit(\'rejette proprement l\'échec de paiement MoMo\', function () {\n    Http::fake([\'api.mtn.com/*\' => Http::response([\'status\' => \'FAILED\'], 400)]);\n    $this->post(\'/commandes\', $donnees)->assertSessionHasErrors();\n    expect(Commande::count())->toBe(0);   // rien n\'a été créé en base\n});', why: 'Le test du chemin heureux est nécessaire mais pas suffisant : il prouve que la fonction marche quand tout va bien — ce qui est la situation LA MOINS FRÉQUENTE en production réelle (invités curieux, concurrents qui testent, API externes en panne, doubles-clics). Chaque protection (middleware, policy, validation, solde, transaction) mérite sa propre preuve, parce que CHACUNE peut tomber seule lors d\'une refactorisation. Le critère honnête d\'une suite qui tient : pour chaque règle de sécurité ou métier écrite dans le code, il existe UN test qui ROUGIRAIT si tu désactivais la règle manuellement. Le reste est décoration verte.' }
          ],
          related: ['lv-autorisation', 'lv-validation', 'lv-queues', 'lv-evenements', 'lv-fondamentaux']
        }
      ]
    }
  ]
};
