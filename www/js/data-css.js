/* ============================================================
   data-css.js — Contenu pédagogique CSS (approfondi)
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.css = {
  id: 'css',
  name: 'CSS',
  icon: 'css',
  tagline: 'L\'art de la présentation : sélecteurs, box model, flexbox, grid, animations et responsive.',
  heroTitle: 'CSS, le langage qui rend le web beau et lisible',

  categories: [
    {
      id: 'bases',
      name: 'Les bases',
      icon: 'format_paint',
      fiches: [
        {
          id: 'css-syntaxe-selecteurs',
          title: 'Syntaxe & sélecteurs',
          icon: 'ads_click',
          level: 'Débutant',
          tagline: 'Cibler précisément les éléments : élément, classe, ID, descendant, pseudo-classes…',
          intro: 'CSS ne fait que répondre à deux questions : « À QUELS éléments appliquer CE style ? » Les sélecteurs répondent à la première moitié, et c\'est la compétence la plus importante de tout le langage : un bon sélecteur est précis sans être fragile, un mauvais sélecteur casse dès que le HTML bouge. Avant d\'apprendre la mécanique, il faut comprendre le problème qu\'ils résolvent : sans eux, on écrirait le style directement dans chaque balise, et la moindre retouche deviendrait un cauchemar de copier-coller.',
          blocks: [
            { t: 'h3', h: 'Le problème que les sélecteurs résolvent' },
            { t: 'p', h: 'Imagine le catalogue en ligne de la Boutique Awa : soixante fiches produits, chacune avec son prix. Sans sélecteurs, il faudrait écrire le style dans chaque balise prix, soixante fois — et le jour où Awa décide que les prix passent du bleu au vert, tu rouvrirais soixante fichiers. Avec une seule règle `.prix { color: green; }`, toute la boutique change instantanément. C\'est ça, un sélecteur : **le contrat entre ton HTML et ta présentation**. Plus ce contrat est stable (des classes nommées par le rôle), plus ton site vieillit bien.' },
            { t: 'h3', h: 'La syntaxe d\'une règle' },
            { t: 'code', lang: 'css', code:
'/* sélecteur */        /* bloc de déclarations */\n.carte {\n  background: white;    /* propriété: valeur; */\n  border-radius: 16px;\n}' },
            { t: 'p', h: 'Une règle = un **sélecteur** + un bloc de **déclarations** `propriété: valeur;`. Le point-virgule est facultatif sur la toute dernière déclaration, mais mets-le toujours : le jour où tu ajoutes une ligne en oubliant le précédent, tu obtiens un bug muet — aucune erreur affichée, juste un style qui « ne marche pas ».' },
            { t: 'p', h: 'D\'ailleurs, parlons de cette tolérance : **le CSS n\'affiche jamais d\'erreur**. Une déclaration invalide est silencieusement ignorée par le navigateur — c\'est voulu, ça permet aux nouveautés CSS d\'exister sans casser les vieux navigateurs (ils ignorent ce qu\'ils ne connaissent pas). Conséquence pratique : une faute de frappe ne plante rien, elle fait juste « rien ». Quand un style semble ignoré, la première chose à faire est d\'ouvrir les DevTools et de vérifier que ta déclaration n\'est pas barrée ou marquée d\'un avertissement.' },
            { t: 'h3', h: 'Les sélecteurs fondamentaux' },
            { t: 'table', head: ['Sélecteur', 'Cible', 'Exemple'], rows: [
              ['`p`', 'Tous les éléments de ce type', '`p { line-height: 1.6; }`'],
              ['`.classe`', 'Tout élément portant cette classe (réutilisable à volonté)', '`.btn { padding: 10px; }`'],
              ['`#id`', 'L\'unique élément portant cet id', '`#menu { }`'],
              ['`*`', 'Absolument tout (à manier avec prudence)', '`* { box-sizing: border-box; }`'],
              ['`.a.b`', 'Éléments ayant les DEUX classes à la fois', '`.btn.actif { }`'],
              ['`section p`', 'Les `p` **descendants** de `section` (tout niveau de profondeur)', '`article p { }`'],
              ['`ul > li`', 'Les `li` **enfants directs** de `ul` uniquement', '`.nav > li { }`'],
              ['`h2 + p`', 'Le `p` qui suit **immédiatement** un `h2`', '`h2 + p { margin-top: 0; }`'],
              ['`input[type="email"]`', 'Par valeur d\'attribut', '`[required] { border-color: red; }`']
            ]},
            { t: 'p', h: 'Trois philosophies à bien distinguer. Le sélecteur d\'**élément** (`p`, `table`) sert aux réglages globaux de base. La **classe** est votre outil de travail quotidien : réutilisable, nommée par le rôle (`.prix`, `.carte-produit`, `.btn`), elle survit aux réorganisations du HTML. L\'**id**, lui, est unique par page — on l\'a vu dans le module HTML : il sert aux ancres et aux labels, pas au style (sa spécificité énorme crée des guerres de priorité, voir la fiche Cascade).' },
            { t: 'h3', h: 'Combiner : dire « dedans », « enfant direct », « juste après »' },
            { t: 'p', h: 'Le vrai pouvoir des sélecteurs, ce sont les **combinateurs**. L\'espace (`A B`) descend à n\'importe quelle profondeur. Le chevron (`A > B`) s\'arrête aux enfants directs — précieux pour un menu : `.menu > li` touche les entrées principales sans polluer les sous-menus. Le plus (`A + B`) vise le frère immédiatement suivant, parfait pour le « chapô » qui suit un titre. Le tilde (`A ~ B`) vise tous les frères suivants.' },
            { t: 'code', lang: 'css', code:
'.carte-produit .prix { color: green; } /* tout prix DANS une carte, à toute profondeur */\n.menu > li { }         /* entrées du 1er niveau seulement, pas les sous-menus */\nh2 + p { font-size: 1.15rem; }  /* le paragraphe qui suit directement un h2 = chapo */\nh2 ~ p { }            /* TOUS les paragraphes qui suivent un h2 */\n.carte-produit.promo { }  /* la carte qui porte les DEUX classes (aucun espace !) */' },
            { t: 'h3', h: 'Les pseudo-classes : cibler l\'état et la position' },
            { t: 'p', h: 'Une pseudo-classe (`:…`, un seul deux-points) cible un **état que le navigateur connaît mais qui n\'existe pas dans ton HTML** : le survol, le focus, la position dans une fratrie, la validité d\'un champ… Aucune classe à écrire dans le HTML, l\'interface devient vivante toute seule.' },
            { t: 'code', lang: 'css', code:
'a:hover        { color: #0a84ff; }   /* survol */\ninput:focus-visible { outline: 2px solid #0a84ff; } /* focus clavier seulement */\nli:first-child { margin-top: 0; }    /* premier enfant */\nli:last-child  { margin-bottom: 0; } /* dernier enfant */\ntr:nth-child(even) { background: #f6f6f8; } /* lignes paires : tableau zébré */\ninput:invalid  { border-color: #ff453a; }\ninput:checked + label { font-weight: 700; } /* la case cochée illumine son label */\nbutton:disabled { opacity: 0.5; cursor: not-allowed; }' },
            { t: 'p', h: '`nth-child()` mérite un arrêt : il accepte `odd`, `even`, un nombre (`3`), ou une formule `An+B` où le navigateur fait varier n de 0 à l\'infini — `3n` = un élément sur trois, `3n+1` = le premier de chaque groupe de trois, `-n+3` = les trois premiers. Attention au piège classique : le comptage se fait parmi **tous les frères**, pas parmi les éléments qui matchent le reste du sélecteur. `.promo:nth-child(2)` se lit « est le 2e enfant **et** a la classe promo », pas « le 2e élément promo ». Pour compter par type de balise, il existe `:nth-of-type`.' },
            { t: 'p', h: 'Préfère `:focus-visible` à `:focus` pour les contours : le navigateur ne le déclenche qu\'à la navigation clavier, ce qui épargne l\'anneau disgracieux au clic souris tout en restant accessible.' },
            { t: 'h3', h: ':not(), :is() et les sélecteurs d\'attributs' },
            { t: 'code', lang: 'css', code:
'/* Tous les champs SAUF les boutons */\ninput:not([type="submit"]):not([type="button"]) { border: 1px solid #ccc; }\n\n/* Attribut : présence, valeur exacte, début, fin, contenu */\n[required]      { }   /* attribut présent */\na[target="_blank"] { }\na[href^="tel:"] { }   /* commence par : les liens téléphone du marché */\na[href$=".pdf"] { }   /* finit par : ajouter une icône « PDF » automatiquement */\nimg[src*="gari"] { }  /* contient */\n\n/* Trois sélecteurs en un */\n:is(h1, h2, h3) strong { font-weight: inherit; }' },
            { t: 'p', h: 'Les sélecteurs d\'attributs brillent pour les politiques automatiques : styliser tous les liens externes, marquer les `.pdf`, mettre en avant les champs requis — sans toucher au HTML existant. Ils ont le même poids de spécificité qu\'une classe.' },
            { t: 'h3', h: 'Les pseudo-éléments : fabriquer du décoratif sans toucher au HTML' },
            { t: 'p', h: 'Les pseudo-**éléments** (`::…`, deux deux-points) créent des morceaux virtuels : `::before` et `::after` insèrent du contenu décoratif juste avant/après le contenu réel, `::first-letter` fait une lettrine, `::placeholder` style le texte d\'indice, `::marker` contrôle les puces des listes, `::selection` la couleur de surlignage au select. Le réflexe à retenir : `::before`/`::after` n\'existent QUE si `content` est déclaré — même vide (`content: ""`). C\'est l\'oubli n°1 qui les rend « muets ».' },
            { t: 'code', lang: 'css', code:
'.prix::after { content: " FCFA"; color: #8e8e93; font-size: .8em; }\np.intro::first-letter { font-size: 2.4em; float: left; line-height: 1; }\n::selection { background: #ffd60a; }\ninput::placeholder { color: #8e8e93; }\nli::marker { color: #0a84ff; }' },
            { t: 'h3', h: 'Sous le capot : comment le navigateur apparie tes sélecteurs' },
            { t: 'p', h: 'Petit voyage interne, utile pour l\'intuition : le moteur lit tes sélecteurs **de droite à gauche**. Pour `nav ul li a`, il part de tous les `a` de la page, puis remonte les ancêtres pour vérifier `li`, puis `ul`, puis `nav`. Morale : la partie la plus à droite (le « sélecteur clé ») devrait être la plus filtrante possible. Inutile d\'en faire une obsession de performance — les navigateurs modernes sont très rapides — mais ça explique pourquoi les sélecteurs à rallonge sont aussi plus coûteux à apparier, en plus d\'être fragiles.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Un espace de plus ou de moins, c\'est du style. »** — C\'est tout l\'inverse : l\'espace EST le combinateur descendant. `div.carte` (un élément portant les deux classes) et `div .carte` (un élément `.carte` contenu dans une div) sont deux mondes différents.',
              '**« On peut cibler le parent d\'un élément. »** — Historiquement impossible en CSS ; aujourd\'hui `:has()` existe (`form:has(input:invalid)` colore le formulaire fautif), mais on en a rarement besoin quand les classes sont bien pensées.',
              '**« Plus mon sélecteur est long, plus il est fiable. »** — C\'est exactement le contraire : chaque niveau ajouté est un maillon qui cassera au prochain refactoring du HTML. Une classe seule est un contrat stable.',
              '**« nth-child compte les éléments de ma classe. »** — Non : il compte parmi TOUS les frères. Tu veux souvent `li:nth-child(3)` (structure), rarement `.promo:nth-child(3)` (qui exige que le 3e enfant soit promo).',
              '**« #id et .classe sont interchangeables. »** — L\'id est unique par page (ancre d\'URL, `label for`) ; la classe est faite pour être répétée. Styler par id t\'enferme dans une spécificité imbattable (fiche suivante).',
              '**« ::before affiche juste un fond. »** — Sans `content` déclaré, même vide, le pseudo-élément n\'est pas généré du tout : aucune boîte, aucun style visible.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Dans le module HTML, tu as appris `class`, `id`, la structure sémantique (`nav`, `article`, `li`) : les sélecteurs sont la prise que le CSS pose sur tout ça. Un HTML bien balisé demande d\'ailleurs **moins** de classes — `article p` ou `nav a` suffisent souvent. Et dès que deux règles visent le même élément (ça arrive vite !), il faut un arbitre : c\'est toute la prochaine fiche, la cascade et la spécificité.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe pro : privilégie les **classes** pour le style et réserve les sélecteurs d\'éléments (`p`, `table`) aux styles de base globaux. Ton toi-de-dans-six-mois t\'en remerciera à chaque refactoring.' }
          ],
          errors: [
            { title: 'Un espace qui change tout', bad: 'div.carte p.note  /* les p.note DANS div.carte */', good: 'div.carte.note  /* l\'élément qui a les DEUX classes */', why: 'L\'espace est le combinateur descendant. `div.carte` et `div .carte` ne veulent pas dire la même chose : le premier cible un seul élément, le second un élément contenu dans un autre.' },
            { title: 'Cibler la structure HTML plutôt que le sens', bad: 'body > div > div > ul > li:nth-child(3)', good: '.menu-item--promo', why: 'Le premier sélecteur casse dès qu\'une div s\'ajoute. Une classe nommée d\'après le RÔLE survit aux refactorings du HTML.' },
            { title: 'Un ::before muet', bad: '.icone::before {\n  background: url(fleche.svg);\n}  /* rien ne s\'affiche */', good: '.icone::before {\n  content: "";\n  display: inline-block;\n  width: 1em; height: 1em;\n  background: url(fleche.svg) no-repeat center / contain;\n}', why: 'Un pseudo-élément sans propriété `content` (même vide) n\'est tout simplement pas généré : aucune boîte n\'existe pour recevoir ton fond.' }
          ],
          related: ['css-cascade-specificite', 'css-transitions-animations', 'html-listes']
        },

        {
          id: 'css-cascade-specificite',
          title: 'Cascade & spécificité',
          icon: 'layers',
          level: 'Intermédiaire',
          tagline: 'Quand deux règles se contredisent, laquelle gagne ? Le mystère enfin résolu.',
          intro: '« Mon CSS ne marche pas ! » — dans la grande majorité des cas, si, il marche très bien : c\'est simplement une **autre règle plus prioritaire** qui l\'emporte. Le mécanisme d\'arbitrage s\'appelle la cascade (c\'est le « C » de CSS), et son cœur est la spécificité, un système de poids qui départage les règles en conflit. La comprendre une fois pour toutes, c\'est arrêter de mettre des `!important` partout et lire les DevTools comme un livre ouvert.',
          blocks: [
            { t: 'h3', h: 'Pourquoi « cascade » : des styles qui viennent de plusieurs sources' },
            { t: 'p', h: 'Avant même ta première ligne de CSS, ta page a déjà du style : celui du **navigateur** (c\'est lui qui rend les `h1` grands et gras, les `li` avec des puces, les liens bleus soulignés — d\'où une page HTML nue qui reste lisible). L\'**utilisateur** peut imposer ses préférences (taille minimale de police, mode sombre). Et puis viennent tes styles, parfois en plusieurs fichiers. Quand ces sources se contredisent, il faut un arbitre déterministe : c\'est la cascade, et elle départage **dans cet ordre** : origine et importance → couches (`@layer`) → spécificité → ordre d\'apparition.' },
            { t: 'h3', h: 'Les trois forces à retenir au quotidien' },
            { t: 'ol', items: [
              '**L\'origine et l\'importance** — tes styles d\'auteur battent les styles par défaut du navigateur ; `!important` (à éviter) écrase presque tout, y compris le style inline.',
              '**La spécificité** — à origine égale, la règle au sélecteur le plus « précis » gagne. C\'est la force que tu manipules cent fois par jour.',
              '**L\'ordre d\'apparition** — à spécificité strictement égale, la règle écrite **en dernier** dans la feuille gagne. Pas celle du HTML : celle du CSS.'
            ]},
            { t: 'h3', h: 'Le calcul de spécificité, en clair' },
            { t: 'p', h: 'Imagine trois colonnes de points `(ID, classes, éléments)`. Chaque morceau de ton sélecteur tombe dans une colonne : un `#id` dans la première ; chaque classe, pseudo-classe ou sélecteur d\'attribut dans la deuxième ; chaque nom d\'élément ou pseudo-élément dans la troisième. On compare colonne par colonne, de gauche à droite — et **les colonnes ne débordent jamais l\'une sur l\'autre** : onze classes restent en dessous d\'un seul id.' },
            { t: 'table', head: ['Sélecteur', 'Points (ID, classe, élément)'], rows: [
              ['`p`', '(0, 0, 1)'],
              ['`.carte p`', '(0, 1, 1)'],
              ['`.carte .titre`', '(0, 2, 0)'],
              ['`.menu li a`', '(0, 1, 2)'],
              ['`a:hover`', '(0, 1, 1) — la pseudo-classe compte comme une classe'],
              ['`#menu`', '(1, 0, 0)'],
              ['style inline (`style="..."`)', 'au-dessus de tout sauf `!important`']
            ]},
            { t: 'code', lang: 'css', code:
'p             { color: black; }  /* (0,0,1) */\n.info p       { color: blue; }   /* (0,1,1) : gagne sur p */\np             { color: red; }    /* égalité avec le 1er : le DERNIER gagne */\n#hero p       { color: green; }  /* (1,0,1) : écrase tout ce qui précède */\n\n/* À toi de jouer : .menu li a  vs  .btn\n   (0,1,2) contre (0,1,0) -> la colonne des classes fait match nul,\n   la colonne des éléments départage : .menu li a gagne. */' },
            { t: 'h3', h: 'À spécificité égale : la dernière règle gagne (et l\'ordre des classes dans le HTML ne compte PAS)' },
            { t: 'p', h: 'Piège vécu par absolument tout le monde : `<p class="rouge vert">` n\'est **pas** vert « parce que vert est en dernier ». L\'ordre dans l\'attribut `class` n\'a aucun effet, jamais. Ce qui compte, c\'est l\'ordre des règles **dans la feuille de style** : si `.vert` est déclaré après `.rouge`, le texte sera vert, même écrit `class="vert rouge"`. Quand deux sélecteurs de même poids se disputent, le dernier écrit parle.' },
            { t: 'h3', h: 'L\'héritage : l\'autre moitié de l\'histoire' },
            { t: 'p', h: 'Certaines propriétés se **transmettent automatiquement aux descendants** : `color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility`… C\'est pourquoi définir la police sur `body` suffit à toute la page. Les propriétés de boîte (`margin`, `padding`, `border`, `width`, `background`) ne s\'héritent pas — heureusement : chaque élément a sa propre géométrie. Sous le capot, c\'est la **valeur calculée** qui descend le long de l\'arbre ; on verra au chapitre Typographie pourquoi ça rend `line-height` sans unité si important.' },
            { t: 'code', lang: 'css', code:
'a { color: inherit; }       /* un lien dans un titre prend la couleur du titre */\n.icone { fill: currentcolor; } /* suit la couleur du texte environnant */\n.reset { all: unset; }      /* remet TOUT à plat : pratique pour un composant \"nu\" */\n/* inherit : force l\'héritage | initial : valeur CSS par défaut\n   unset : hérite si la propriété hérite, sinon initial */' },
            { t: 'p', h: 'Subtilité décisive à graver : l\'héritage n\'est **pas** un participant à la course de priorité. Une règle qui cible directement l\'élément bat TOUJOURS une valeur héritée, quelle que soit la puissance du sélecteur parent. `p { color: red; }` gagne sur les paragraphes même face à `body { color: blue !important; }` : l\'important du parent ne « force » rien sur les enfants, il n\'agit que là où il est écrit.' },
            { t: 'h3', h: '!important : le bouton nucléaire' },
            { t: 'p', h: 'Que fait réellement `!important` ? Il fait sauter la déclaration dans une **catégorie d\'origine supérieure**, au-dessus de tes styles normaux et même du style inline. Le piège : entre deux `!important`, c\'est de nouveau la spécificité qui départage — donc la course aux armements reprend un étage plus haut. Usages légitimes et assumés : les classes utilitaires qui doivent TOUJOURS gagner (`.cache { display: none !important; }`), ou la neutralisation d\'un style tiers impossible à surcharger autrement. En dehors de ça, un `!important` est presque toujours le symptôme d\'un sélecteur trop lourd ailleurs : répare la cause, ne camoufle pas.' },
            { t: 'h3', h: ':is(), :where() et @layer : la cascade domestiquée' },
            { t: 'p', h: 'Trois outils modernes à connaître. `:is(.a, .b, .c) p` compacte trois sélecteurs en un, mais prend la spécificité **la plus forte** de la liste. `:where(...)` fait la même chose avec une spécificité **nulle** : parfait pour des styles de base qu\'on pourra surcharger sans effort. Et `@layer` permet de regrouper tes styles en couches dont tu fixes l\'ordre de priorité globalement — à l\'intérieur d\'une couche inférieure, même un sélecteur très fort perd contre une couche supérieure.' },
            { t: 'code', lang: 'css', code:
'@layer base, composants;\n\n@layer base {\n  a { color: #0a84ff; }            /* styles par défaut */\n}\n@layer composants {\n  #nav a { color: inherit; }       /* bat le \"a\" du layer base,\n                                      car \"composants\" est déclaré après */  \n}' },
            { t: 'h3', h: 'Déboguer comme un pro' },
            { t: 'p', h: 'Dans les DevTools (clic droit → Inspecter), le panneau Styles liste toutes les règles qui touchent l\'élément, **de la plus prioritaire à la moins prioritaire**, les perdantes barrées. C\'est la réponse instantanée à « pourquoi mon style est ignoré ». Bonus : le bouton `:hov` permet de forcer l\'état `:hover`/`:focus` pour inspecter les styles de survol sans avoir à garder la souris immobile.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« La dernière règle gagne toujours. »** — Seulement à spécificité égale. Une règle forte écrite tôt bat une règle faible écrite tard ; l\'ordre n\'est que le tout dernier critère.',
              '**« class=\"a b\" : b l\'emporte car écrit en dernier. »** — L\'ordre dans l\'attribut HTML n\'a strictement aucun effet ; seul l\'ordre dans le CSS compte.',
              '**« !important est un bon correctif rapide. »** — Il reporte le problème : le seul moyen de battre un important est un important plus spécifique, et la spirale est lancée.',
              '**« Le style inline est imbattable. »** — `!important` le dépasse (c\'est d\'ailleurs sa seule utilité réelle dans du CSS propre).',
              '**« La spécificité, c\'est 1 + 10 + 100. »** — L\'addition mentale marche « par accident » jusqu\'à 9 ; onze classes ne valent toujours pas un id. Pense en trois colonnes comparées séparément.',
              '**« L\'héritage est une affaire de priorité. »** — Non : c\'est une valeur de repli quand RIEN ne cible l\'élément. La plus petite règle directe bat la plus grosse valeur héritée.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les sélecteurs de la fiche précédente sont la monnaie de la spécificité : chaque type (élément, classe, id) a un poids distinct. L\'héritage que tu viens de voir deviendra concret en Typographie (la police définie une fois sur `body`) et explosera en puissance avec les Variables CSS — des valeurs qui s\'héritent et se redéfinissent à la volée, leur super-pouvoir.' },
            { t: 'callout', kind: 'warn', h: '`!important` ne résout pas un problème de priorité, il le cache. Restons à spécificité 0,1,0 maximum dans la vie courante : une seule classe bien nommée suffit dans 95 % des cas.' }
          ],
          errors: [
            { title: 'Gonfler la spécificité pour "forcer"', bad: 'body main .content article p.texte { color: navy; }', good: '.texte { color: navy; }', why: 'Un sélecteur obèse est fragile et devient imbattable sans escalade. Une classe bien nommée suffit presque toujours — et elle se surcharge proprement.' },
            { title: 'Croire que l\'ordre des classes dans le HTML compte', bad: '<p class="rouge vert"> <!-- "vert" en dernier, donc vert ? -->', good: '/* L\'ordre qui compte est dans la FEUILLE CSS,\n   pas dans l\'attribut class */', why: 'class="rouge vert" ou class="vert rouge" : strictement identique. À spécificité égale, c\'est la règle écrite en DERNIER dans le CSS qui gagne.' },
            { title: 'Écraser avec !important au lieu de nettoyer', bad: 'p.texte { color: navy !important; }', good: '.texte { color: navy; }\n/* + supprimer le sélecteur obèse qui bloquait */', why: 'L\'important masque le vrai problème : une règle trop spécifique ailleurs. Dans les DevTools, repère la règle gagnante, allège son sélecteur — et l\'important devient inutile.' }
          ],
          related: ['css-syntaxe-selecteurs', 'css-variables', 'css-box-model']
        },

        {
          id: 'css-unites-couleurs',
          title: 'Unités & couleurs',
          icon: 'palette',
          level: 'Débutant',
          tagline: 'px, rem, %, vh, fr… et les nombreuses façons d\'écrire une couleur moderne.',
          intro: '« 16 quoi ? » est la question la plus posée en CSS. px, em, rem, %, vw… derrière cette profusion se cache en réalité UNE seule question : « relatif à quoi ? » Le web n\'a pas de taille fixe — ton site vivra sur un téléphone à 360 px, un écran de salon, avec une police agrandie par un malvoyant. Choisir une unité, c\'est choisir comment ta page réagira à tout ça. Même logique pour les couleurs : au-delà du hexadécimal scolaire, il existe des formats bien plus pratiques pour travailler.',
          blocks: [
            { t: 'h3', h: 'Pourquoi tant d\'unités ? Parce que le web n\'a pas de taille fixe' },
            { t: 'p', h: 'Dans Word, ta page est une feuille A4 : fixe, prévisible. Sur le web, la « page » est liquide : elle change de largeur, de densité de pixels, de taille de texte selon l\'appareil et les réglages de l\'utilisateur. Une unité **absolue** (`px`) dit « cette taille, point » ; une unité **relative** dit « une fraction de cette référence » — la police racine (`rem`), la police du contexte (`em`), le parent (`%`), la fenêtre (`vw`/`vh`), un caractère (`ch`), l\'espace libre d\'une grille (`fr`). Maîtriser les unités, c\'est décider consciemment ce qui doit rester rigide et ce qui doit s\'adapter.' },
            { t: 'h3', h: 'Le tableau des unités' },
            { t: 'table', head: ['Unité', 'Relative à', 'Cas d\'usage'], rows: [
              ['`px`', '— (fixe)', 'Bordures, ombres, petites tailles précises'],
              ['`rem`', 'Taille de police de la racine (défaut 16 px)', 'Polices, marges, espacements — **le défaut recommandé**'],
              ['`em`', 'Taille de police du parent (font-size) ou de l\'élément (autres propriétés)', 'Padding proportionnel à la taille du bouton'],
              ['`%`', 'Dimension du parent', 'Largeurs fluides simples'],
              ['`vw` / `vh`', '1 % de la largeur / hauteur de la fenêtre', 'Sections plein écran, hero 100vh'],
              ['`svh` / `dvh`', 'idem, en tenant compte des barres mobiles', 'Le vrai plein écran sur téléphone'],
              ['`ch`', 'Largeur du caractère « 0 »', 'Largeur de lecture : `max-width: 65ch`'],
              ['`fr`', 'Fraction de l\'espace dispo (Grid uniquement)', '`grid-template-columns: 1fr 2fr`']
            ]},
            { t: 'h3', h: 'rem vs px : pourquoi le web a tranché' },
            { t: 'p', h: 'Un utilisateur malvoyant peut régler la taille de police de base de son navigateur (disons 20 px au lieu de 16). Avec des tailles en `rem`, toute ta page suit son réglage — `1rem` vaut 20 px chez lui ; avec des `px`, tu ignores sa préférence et tu lui imposes ta taille. C\'est la raison d\'être du `rem` : à 16 px par défaut c\'est confortable à calculer (`1.5rem` = 24 px), et ça respecte la liberté de chacun. Sous le capot, le navigateur finit toujours par convertir en pixels CSS — le `rem` est juste un multiplicateur appliqué à `html { font-size }`.' },
            { t: 'p', h: 'Et pendant qu\'on est sous le capot : **1 px CSS n\'est pas un pixel physique**. Sur un écran de téléphone haute densité (×3), 1 px CSS couvre 3 × 3 pixels réels — le navigateur gère la conversion. Morale : le « pixel précis » n\'existe pas vraiment, alors autant choisir des unités qui respectent l\'utilisateur.' },
            { t: 'h3', h: 'em : le relatif à double face' },
            { t: 'p', h: 'L\'`em` change de référence selon la propriété, et c\'est là que se cachent à la fois son piège et son génie. Sur `font-size`, il est relatif à la taille **du parent** — imbriqué, il compose : 1,2 × 1,2 × 1,2 = effet boule de neige. Mais sur les autres propriétés (`padding`, `margin`, `border-radius`...), il est relatif à la taille de police **de l\'élément lui-même** — ce qui permet un tour de magie : des composants qui gardent leurs proportions quand on change juste leur font-size.' },
            { t: 'code', lang: 'css', code:
'.btn {\n  font-size: 1rem;\n  padding: 0.6em 1.2em;     /* proportionnel à la taille du bouton */\n  border-radius: 2em;\n}\n.btn.grand { font-size: 1.25rem; }  /* padding et rayon suivent tout seuls ! */\n\n/* Le piège en revanche : font-size en em imbriqué */\nli { font-size: 1.2em; }  /* des li dans des ul : 1.2 x 1.2 x 1.2... */' },
            { t: 'p', h: 'La règle pratique qui découle de tout ça : **`font-size` en `rem`, espacements internes de composants en `em`**. Le premier reste stable et respectueux, les seconds rendent les composants proportionnels.' },
            { t: 'h3', h: 'vw, vh… et le piège du 100vh sur mobile' },
            { t: 'p', h: '`100vh` = pleine hauteur de fenêtre — le raccourci classique du hero plein écran. Mais sur téléphone, les barres d\'adresse et de navigation se replient au scroll : le `vh` historique compte « avec barres » et ton hero se retrouve partiellement masqué. D\'où trois variantes : `svh` (petite hauteur, barres visibles), `lvh` (grande hauteur, barres repliées) et `dvh` (dynamique: s\'ajuste en direct). Pour un plein écran fiable sur mobile, `100dvh` est aujourd\'hui la bonne réponse.' },
            { t: 'h3', h: 'ch : l\'unité discrète qui rend les textes lisibles' },
            { t: 'p', h: '`1ch` = la largeur du caractère « 0 » dans la police courante. Son usage vedette : `max-width: 65ch` limite un paragraphe à environ 65 caractères par ligne — la mesure que la recherche en lisibilité recommande, et le secret des articles agréables. On y revient en Typographie.' },
            { t: 'h3', h: 'calc(), clamp(), min(), max() : les valeurs calculées' },
            { t: 'code', lang: 'css', code:
'width: calc(100% - 2rem);              /* mélanger les unités ! */\nfont-size: clamp(1.1rem, 2.5vw, 1.6rem);  /* min, idéal, max */\nmargin-inline: max(2rem, 10vw);\npadding: min(5vw, 3rem);' },
            { t: 'p', h: '`clamp(1.1rem, 2.5vw, 1.6rem)` se lit : « le vise 2,5 % de la largeur de l\'écran, mais jamais moins de 1,1rem ni plus de 1,6rem ». C\'est la **typographie fluide** : le texte grandit avec l\'écran, borné des deux côtés, sans une seule media query. `min()` et `max()` sont des clamp à une seule borne. Sous le capot, ces fonctions sont résolues au moment de l\'utilisation — elles restent donc **vivantes** et se recalculent quand la fenêtre change. Tu les retrouveras partout : c\'est le premier réflexe du responsive intrinsèque (fiche Responsive).' },
            { t: 'h3', h: 'Écrire une couleur : hexa, rgb, hsl' },
            { t: 'code', lang: 'css', code:
'color: #0a84ff;              /* hexadécimal */\ncolor: #0af;                 /* forme courte (#00aaff) */\ncolor: rgb(10 132 255);      /* décimal, syntaxe moderne */\ncolor: rgb(10 132 255 / 0.5);/* avec transparence (alpha de 0 a 1) */\ncolor: hsl(210 100% 52%);    /* teinte, saturation, luminosite */\ncolor: hsl(210 100% 52% / 0.5);' },
            { t: 'p', h: 'L\'hexadécimal n\'a rien de magique : ce sont trois nombres de 0 à 255 écrits en base 16 — `#RRGGBB`. `#FF0000` = rouge à fond, `#000000` = noir, `#FFFFFF` = blanc. La forme courte `#0af` double chaque caractère (`#00aaff`). La notation `rgb()` lit les mêmes nombres en décimal et ajoute l\'**alpha** après une barre `/` : note que la transparence d\'une couleur n\'a RIEN à voir avec `opacity`, qui rend TOUT l\'élément translucide, texte et enfants compris (et crée même un contexte d\'empilement — voir la fiche Position).' },
            { t: 'h3', h: 'HSL : penser couleur comme un humain' },
            { t: 'p', h: 'HSL décrit une couleur par sa **teinte** (0-360 sur la roue : 0 rouge, 120 vert, 210 bleu), sa **saturation** (l\'intensité) et sa **luminosité** (0 % noir, 50 % la couleur pure, 100 % blanc). Pour une variante claire, tu montes juste le 3e nombre ; pour une version désaturée, tu baisses le 2e. En hexadécimal, ces variations simples exigent un éditeur de couleur. Encore mieux, les fonctions modernes déclinent une variable de marque sans connaître sa valeur :' },
            { t: 'code', lang: 'css', code:
'/* Decliner la couleur de marque sans la connaître */\n.btn:hover {\n  background: color-mix(in oklab, var(--accent), black 15%); /* assombri */\n}\n.badge {\n  background: hsl(from var(--accent) h s calc(l + 25));    /* éclairci */\n}' },
            { t: 'p', h: 'Retiens enfin `currentcolor`, qui reprend la `color` courante du texte — parfait pour que bordures et icônes SVG suivent automatiquement la couleur du contexte, et `transparent`, couleur invisible mais animable (utile dans les dégradés).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le px est plus précis, donc meilleur. »** — Le px CSS n\'est même pas un pixel physique, et il ignore la préférence de taille de police de l\'utilisateur : précis pour toi à l\'écran de développement, rigide pour tout le monde ensuite.',
              '**« Les % marchent toujours. »** — Un % se réfère à la dimension du parent, ENCORE FAUT-IL que celle-ci soit définissable. `height: 100%` dans un parent à `height: auto` retombe sur `auto` : c\'est le mystère classique du « 100 % qui ne fait rien ».',
              '**« em et rem, c\'est pareil. »** — `rem` regarde toujours la racine et reste stable ; `em` regarde le contexte — compose en `font-size`, sert de proportion dans les paddings. Deux outils, deux métiers.',
              '**« opacity: 0.5 = couleur avec alpha 0.5. »** — `opacity` applique la transparence à TOUT l\'élément et ses descendants (et crée un contexte d\'empilement) ; l\'alpha d\'une couleur ne touche que la peinture concernée.',
              '**« 100vw = toute la largeur. »** — `vw` inclut la barre de défilement éventuelle : `100vw` peut créer un micro-scroll horizontal. Pour « toute la largeur du parent », c\'est `width: 100%`.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche arme les deux suivantes : la Typographie s\'appuie sur `rem`, `ch` et `clamp()`, et le Box model réutilisera `calc()` et la subtilité des `%`. Le mécanisme d\'héritage vu en Cascade explique pourquoi définir `font-size` sur `html` se propage en `rem` partout. Et les couleurs en variables ? C\'est toute la fiche Variables CSS, en fin de module.' },
            { t: 'callout', kind: 'tip', h: 'Convention simple et éprouvée : polices et espacements en `rem`, bordures en `px`, sections immersives en `dvh`, colonnes de texte en `ch`, et `clamp()` pour tout ce qui doit rester fluide entre mobile et desktop.' }
          ],
          errors: [
            { title: 'Tout en px, même les polices', bad: 'body { font-size: 14px; }\nh1 { font-size: 32px; }', good: 'body { font-size: 1rem; }\nh1 { font-size: 2rem; }', why: 'Les px ignorent le réglage de taille de police du navigateur : tu imposes ta taille aux malvoyants. rem respecte leur préférence, pour zéro effort.' },
            { title: 'em pour les tailles de police imbriquées', bad: 'li { font-size: 1.2em; }\n/* des li dans des li -> 1.2 x 1.2 x 1.2... */', good: 'li { font-size: 1.2rem; }', why: 'em se COMPOSE à chaque niveau d\'imbrication (effet boule de neige). rem est stable car toujours relatif à la racine.' },
            { title: 'height: 100% qui ne fait rien', bad: '.parent { height: auto; }\n.enfant { height: 100%; }  /* retombe a auto */', good: '.parent { min-height: 400px; }\n.enfant { height: 100%; }\n/* ou mieux : .parent { display: grid; } */', why: 'Un pourcentage de hauteur exige une hauteur DÉFINIE sur le parent ; avec auto, la référence est indéterminée et le navigateur replie à auto. Le piège le plus frustrant des débutants.' }
          ],
          related: ['css-variables', 'css-typographie', 'css-responsive']
        },

        {
          id: 'css-typographie',
          title: 'Typographie',
          icon: 'text_fields',
          level: 'Intermédiaire',
          tagline: 'font-family, taille fluide, interligne : 90 % du design, c\'est du texte bien réglé.',
          intro: 'On le répète souvent : le web design, c\'est 90 % de typographie. Une page avec une belle typographie et aucune décoration paraît déjà « professionnelle » ; l\'inverse est impossible. La bonne nouvelle, c\'est que le résultat tient à une poignée de réglages — interligne, mesure, hiérarchie des tailles — et non au prix de la police. Voici chacun de ces réglages, avec le pourquoi derrière le comment.',
          blocks: [
            { t: 'h3', h: 'La pile de polices : pourquoi une liste et pas une seule' },
            { t: 'p', h: 'Une police n\'existe que si elle est installée ou téléchargée : `font-family` prend donc une **liste de repli** que le navigateur parcourt jusqu\'à trouver la première disponible. La fameuse « system stack » ci-dessous affiche la police native de l\'OS (SF Pro sur Apple, Segoe UI sur Windows, Roboto sur Android) : chargement instantané, rendu impeccable, zéro fichier à télécharger, et une sensation « native » immédiate. C\'est exactement celle du site que tu lis en ce moment.' },
            { t: 'code', lang: 'css', code:
'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",\n               Roboto, Helvetica, Arial, sans-serif;\n}' },
            { t: 'h3', h: 'Charger une police personnalisée sans casser la performance' },
            { t: 'code', lang: 'css', code:
'@font-face {\n  font-family: "Inter Var";\n  src: url("inter-var.woff2") format("woff2");\n  font-weight: 100 900;   /* police variable : un seul fichier */\n  font-display: swap;     /* texte visible immédiatement */\n}' },
            { t: 'p', h: 'Trois points clés. 1) Le format `woff2` est le standard compressé du web — jamais de `.ttf` brut en production. 2) `font-display: swap` affiche le texte avec le repli pendant le chargement puis échange, évitant le « texte invisible » (FOIT) qui fait croire à une page plantée sur un réseau lent — réalité quotidienne sur la 3G d\'un marché comme Dantokpa. 3) Préfère une **police variable** : un seul fichier contient toutes les graisses de 100 à 900, alors qu\'en classique, chaque graisse est un téléchargement séparé. L\'alternative simple reste un `<link>` Google Fonts — mais garde toujours un repli générique final (`sans-serif`, `serif`, `monospace`).' },
            { t: 'h3', h: 'Les réglages qui font 80 % du résultat' },
            { t: 'code', lang: 'css', code:
'body {\n  font-size: 1rem;          /* base 16 px, respectueuse du réglage utilisateur */\n  line-height: 1.6;         /* SANS unité : proportionnel ! */\n  letter-spacing: -0.01em;\n}\n\nh1, h2, h3 {\n  line-height: 1.15;    /* les gros textes aiment l\'interligne serré */\n  letter-spacing: -0.03em;\n  font-weight: 700;\n}\n\nh1 {\n  font-size: clamp(1.8rem, 4vw, 2.6rem); /* titre fluide sans media query */\n}\n\np {\n  max-width: 65ch;      /* environ 65 caractères : la mesure idéale */\n}' },
            { t: 'ul', items: [
              '`line-height` **sans unité** : `1.6` signifie « 1,6 fois la taille courante » et s\'adapte à chaque élément — détail capital, section suivante.',
              '`max-width: 65ch` : au-delà de ~75 caractères par ligne, l\'œil se perd en revenant à la ligne. C\'est LE secret des articles agréables à lire.',
              'Titres : interligne serré + graisse + chasse légèrement négative. Corps : interligne généreux (1,5–1,7) + graisse normale.',
              'Taille fluide : `clamp()` fait grandir les titres avec l\'écran, borné des deux côtés (fiche Unités).'
            ]},
            { t: 'h3', h: 'line-height sans unité : le détail qui change tout' },
            { t: 'p', h: 'Retour sur le mécanisme d\'héritage vu en Cascade : ce qui descend dans les enfants, c\'est la **valeur calculée**. Avec `body { line-height: 24px; }`, c\'est « 24 px » qui s\'hérite — et un titre à 48 px se retrouve avec un interligne de 24 px : il s\'écrase. Avec `body { line-height: 1.5; }`, c\'est le **facteur** 1,5 qui s\'hérite : chaque élément le multiplie par SA propre taille. Même piège avec `150%` — les pourcentages héritent eux aussi de la valeur calculée. Conclusion ferme : l\'interligne se déclare toujours **sans unité**.' },
            { t: 'h3', h: 'Graisse, chasse et capitales' },
            { t: 'p', h: '`font-weight` va de 100 à 900 — `bold` vaut exactement `700`, `normal` vaut `400`. Sans fichier de graisse chargé, le navigateur **simule** le gras en épaississant les traits (rendu médiocre) : d\'où l\'intérêt des polices variables. Le `letter-spacing` (la chasse) se règle subtil : légèrement **négatif** sur les gros titres (l\'œil voit les espaces optiques grandir avec la taille), légèrement **positif** sur les petites capitales `.etiquette { text-transform: uppercase; letter-spacing: .08em; }` qui sinon se collent.' },
            { t: 'h3', h: 'Alignement, césure et troncature' },
            { t: 'code', lang: 'css', code:
'.lead      { text-align: left; }          /* justify crée des « rivières » */\n.prix      { font-variant-numeric: tabular-nums; } /* chiffres alignés en colonnes */\n.etiquette { text-transform: uppercase; letter-spacing: .08em; }\n.titre     { text-wrap: balance; }        /* évite la ligne orpheline des titres */\n.resume    { -webkit-line-clamp: 3; display: -webkit-box;\n             -webkit-box-orient: vertical; overflow: hidden; }' },
            { t: 'p', h: 'Chaque ligne mérite un commentaire. Le texte **justifié** sans césure professionnelle crée des trous blancs verticaux (« rivières ») qui fatiguent l\'œil : reste à gauche, ou ajoute `hyphens: auto` avec `lang="fr"` sur la page. `text-wrap: balance` répartit élégamment les titres sur deux lignes — fini le mot seul en dernière ligne. `line-clamp` est l\'astuce culte : tronquer un résumé de produit à 3 lignes avec « … », tout en CSS — parfait pour les cartes du catalogue de la Boutique Awa.' },
            { t: 'demo', height: 190, caption: 'Avant / après les réglages typographiques', html:
'<div style="display:flex;gap:16px;font-size:14px"><div style="flex:1;padding:10px;border:1px dashed #bbb;border-radius:8px"><strong>Sans réglages</strong><p style="margin:6px 0 0;line-height:1.2">Un texte long devient pénible à lire quand les lignes sont trop serrées et remplissent toute la largeur disponible de la page.</p></div><div style="flex:1;padding:10px;border:1px solid #0a84ff;border-radius:8px"><strong>Avec soin</strong><p style="margin:6px 0 0;line-height:1.6;max-width:32ch">Un interligne de 1,6 et une mesure courte : le texte respire, la lecture suit.</p></div></div>' },
            { t: 'h3', h: 'Les chiffres dans les prix : tabular-nums' },
            { t: 'p', h: 'Détail de pro qui change tout dans les tableaux : par défaut, les chiffres sont « proportionnels » — le « 1 » est plus étroit que le « 8 », et une colonne de prix danse. `font-variant-numeric: tabular-nums` rend tous les chiffres de même largeur : ta colonne de prix Dantokpa, ton historique MoMo ou ton relevé de tontine deviennent instantanément scannables.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Il me faut une jolie police pour un joli site. »** — L\'interligne, la mesure (65ch) et la hiérarchie des tailles font 90 % du résultat, y compris avec la police système. Une police coûteuse mal réglée reste moche.',
              '**« font-weight: bold et 700 sont différents. »** — Strictement identiques. En revanche, sans fichier de graisse chargé, le gras est simulé — d\'où l\'intérêt des polices variables qui contiennent tout.',
              '**« line-height: 1.6 et 160% sont pareils. »** — Presque, mais `160%` hérite de la valeur CALCULÉE du parent (le piège du px) ; `1.6` hérite du facteur. Toujours sans unité pour l\'interligne.',
              '**« Plus je charge de polices, plus c\'est riche. »** — Chaque fichier retarde le premier affichage et provoque des sauts de texte. Deux familles (texte + titres), idéalement variables, suffisent dans 99 % des cas.',
              '**« Le justifié fait « document officiel ». »** — Sur écran et sans césure de qualité, il crée des rivières. Gauche par défaut ; `hyphens: auto` si tu y tiens vraiment.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu viens de réutiliser trois fiches : les Unités (`rem`, `ch`, `clamp()`, et pourquoi le `%` d\'interligne piège), la Cascade (c\'est l\'**héritage** qui propage police et interligne depuis `body` — jamais avec le sélecteur `*`, qui forcerait chaque élément et casserait les exceptions locales), et le module HTML (`strong`/`em` pour le sens, `lang` pour la césure). Prochaine étape logique : comprendre la géométrie de chaque élément — le modèle de boîte.' },
            { t: 'callout', kind: 'tip', h: 'Checklist typographique de base : police système (ou variable) + `line-height: 1.6` sans unité + `max-width: 65ch` sur les paragraphes + interligne 1,15 sur les titres + tailles en `clamp`. Avec ça, n\'importe quelle page est déjà lisible.' }
          ],
          errors: [
            { title: 'line-height en pixels partout', bad: '* { line-height: 20px; }', good: 'body { line-height: 1.6; }', why: 'Une valeur fixe ne s\'adapte pas aux tailles : les titres s\'écrasent, les petits textes nagent. Sans unité, c\'est un ratio qui suit chaque élément.' },
            { title: 'Justifier le texte sur le web', bad: 'p { text-align: justify; }', good: 'p { text-align: left; }  /* ou + hyphens: auto et lang="fr" */', why: 'Sans traitement de césure professionnel, le justifié crée des trous blancs verticaux (« rivières ») qui fatiguent l\'œil et nuisent à la lecture.' }
          ],
          related: ['css-unites-couleurs', 'css-variables', 'html-texte']
        }
      ]
    },

    {
      id: 'boite-position',
      name: 'Boîtes & positionnement',
      icon: 'dashboard',
      fiches: [
        {
          id: 'css-box-model',
          title: 'Le modèle de boîte',
          icon: 'check_box_outline_blank',
          level: 'Débutant',
          tagline: 'margin, border, padding, content : LA notion à comprendre avant toute mise en page.',
          intro: 'En CSS, **tout est une boîte**. Un paragraphe, un bouton, une image : quatre couches emboîtées — le contenu, le padding (coussin interne), la bordure, la marge externe. Tant que ce modèle n\'est pas limpide dans ta tête, les éléments « ne font pas la taille demandée », les espacements semblent imprévisibles, et le CSS ressemble à de la magie capricieuse. Une fois le modèle intégré, chaque comportement se DÉDUIT au lieu de se mémoriser.',
          blocks: [
            { t: 'h3', h: 'Pourquoi un « modèle » de boîte ?' },
            { t: 'p', h: 'Sous le capot, le navigateur transforme ton DOM en un arbre de **rectangles**. Chaque élément devient une boîte constituée de quatre zones, et TOUT le reste du moteur de rendu — tailles, espacements, débordements, collisions — se calcule à partir de ces zones. C\'est le « modèle de boîte » (box model). Ce n\'est pas un concept abstrait : c\'est littéralement la structure de données que le navigateur manipule pour peindre ta page.' },
            { t: 'h3', h: 'Les quatre couches' },
            { t: 'demo', height: 190, caption: 'Le box model en action (inspecte mentalement chaque couche)', html:
'<div style="background:#ffd9ad;padding:14px;text-align:center;font-size:13px">margin<div style="background:#fff;padding:0"><div style="border:3px solid #0a84ff;background:#b6dcff;padding:16px">padding<div style="background:#0a84ff;color:#fff;padding:14px;border-radius:4px">contenu</div></div></div></div>' },
            { t: 'ul', items: [
              '**content** — le texte, l\'image. C\'est ce que `width` et `height` contrôlent… *par défaut* (voir box-sizing).',
              '**padding** — l\'espace intérieur, entre le contenu et la bordure. Il prend la couleur de fond de l\'élément et fait partie de la zone cliquable.',
              '**border** — la bordure : épaisseur + style + couleur, `border: 2px solid #333`.',
              '**margin** — l\'espace extérieur, **transparent**, qui écarte les voisins. Il peut être négatif pour provoquer des chevauchements.',
              'Cas particulier : les éléments dits « remplacés » (`img`, `video`, `input`) — leur contenu vient de l\'extérieur, et `width`/`height` agissent directement sur la boîte entière.'
            ]},
            { t: 'h3', h: 'content-box vs border-box : le réglage qui change le sens de width' },
            { t: 'p', h: 'Par défaut (`content-box`, un héritage historique conservé pour compatibilité), `width: 300px` signifie « le contenu fait 300 px » — puis le padding et la bordure s\'**ajoutent** par-dessus : 300 + 16×2 + 2×2 = 336 px affichés. C\'est contre-intuitif : tu demandes 300 et tu reçois 336. Cette incohérence est la cause de mille bugs de mise en page « qui déborde de quelques pixels ».' },
            { t: 'code', lang: 'css', code:
'html { box-sizing: border-box; }\n*, *::before, *::after { box-sizing: inherit; }' },
            { t: 'p', h: 'Ce « reset » quasi universel change tout : avec `border-box`, `width: 300px` = 300 px **au total**, bordure et padding comprises. La taille que tu demandes est celle que tu obtiens. La variante `inherit` (plutôt que `border-box` directement sur `*`) permet à un composant tiers de reparamétrer son sous-arbre sans être cassé par ton étoile — sinon, les deux formes se valent. Mets-la en tête de tous tes projets, sans exception.' },
            { t: 'h3', h: 'Les écritures raccourcies' },
            { t: 'code', lang: 'css', code:
'margin: 20px;             /* les 4 côtés */\nmargin: 10px 20px;        /* haut-bas | gauche-droite */\nmargin: 10px 20px 30px;   /* haut | g-droite | bas */\nmargin: 10px 15px 20px 25px; /* haut droite bas gauche (sens horaire) */\npadding-inline: 24px;     /* logique : gauche+droite en écriture L->R */\nmargin-block-start: 1rem; /* logique : « haut » du sens de lecture */' },
            { t: 'p', h: 'Les variantes **logiques** (`inline` = sens de la ligne, `block` = sens d\'empilement) suivent la direction d\'écriture : en arabe (droite vers gauche), `padding-inline-start` désigne automatiquement la droite. Si tu écris un jour un site bilingue français/arabe, tu n\'auras rien à changer.' },
            { t: 'h3', h: 'margin: auto : le centreur discret' },
            { t: 'p', h: 'Que fait `auto` sur une marge ? Sous le capot : la marge `auto` **absorbe tout l\'espace restant** de son côté. `margin-left: auto` pousse l\'élément à fond à droite ; `margin: 0 auto` partage l\'espace restant équitablement à gauche ET à droite — l\'élément se centre. La condition, c\'est qu\'il y ait de l\'espace à répartir : l\'élément doit être **plus étroit que son parent** (d\'où le fameux duo `max-width` + `margin: 0 auto` des colonnes de lecture). En flexbox, le même mécanisme devient un outil de poussée — on le retrouve à la fiche Flexbox.' },
            { t: 'h3', h: 'Les marges qui fusionnent : margin collapsing' },
            { t: 'p', h: 'Dernier mystère à dompter : deux marges **verticales** qui se touchent ne s\'additionnent pas — elles **fusionnent** en conservant la plus grande. Un titre avec `margin-bottom: 30px` posé sur un paragraphe à `margin-top: 20px` donne 30 px d\'espace, pas 50. Trois situations la déclenchent : marges d\'éléments voisins, marge du premier/dernier enfant qui « transpire » à travers son parent (sans bordure ni padding pour la bloquer), et marges haute/basse d\'une boîte vide qui fusionnent entre elles.' },
            { t: 'p', h: 'Pourquoi diable ce comportement ? Il est **voulu** : il garantit un rythme vertical régulier dans le texte courant, quels que soient les styles des paragraphes qui se suivent. Pour le neutraliser quand il gêne : un conteneur flex ou grid (les marges des enfants n\'y fusionnent JAMAIS — une raison de plus de les utiliser pour l\'espacement entre composants), un padding d\'un pixel, ou `display: flow-root` sur le parent.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« width: 300px = 300 px affichés. »** — Seulement en `border-box`. En `content-box` (le défaut sans reset), padding et bordure s\'AJOUTENT par-dessus.',
              '**« margin et padding sont interchangeables pour espacer. »** — Non : la marge écarte les voisins (et peut fusionner), le padding grandit la boîte. Conséquence clé : un bouton agrandi au **padding** reste cliquable sur toute la surface — agrandi à la marge, non.',
              '**« Un padding en % se réfère à la hauteur. »** — TOUS les pourcentages de padding, même verticaux, se réfèrent à la LARGEUR du parent. C\'était d\'ailleurs l\'astuce des boîtes à ratio constant (`padding-top: 56.25%` = 16/9), supplantée aujourd\'hui par `aspect-ratio`.',
              '**« Les marges négatives sont un hack sale. »** — C\'est un outil légitime du modèle : chevauchements volontaires, compensation d\'un padding parent, tirages typographiques.',
              '**« Un élément vide n\'a pas de hauteur, donc aucun effet. »** — Ses propres marges haute et basse peuvent fusionner entre elles ET avec les voisines, produisant des espacements « fantômes » difficiles à tracer.',
              '**« margin: 0 auto centre toujours. »** — Il faut que l\'élément soit plus étroit que son parent ET en display block. Sans `width`/`max-width`, aucun espace à répartir, aucun centrage.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu réutilises les Unités (`rem` pour les espacements, le piège des `%`… dont la surprise padding-vertical-relatif-à-la-largeur) et la Cascade (rien ici ne s\'hérite — chaque boîte a sa géométrie propre, sauf à forcer `box-sizing: inherit`). La prochaine fiche, `display`, explique **comment ces boîtes se placent les unes par rapport aux autres** — le modèle de boîte dit de quoi elles sont faites, display dit comment elles s\'assemblent.' },
            { t: 'callout', kind: 'tip', h: 'Dans les DevTools, l\'onglet « Computed » dessine le box model de l\'élément sélectionné avec les valeurs exactes de chaque couche. C\'est la radiographie officielle de tes bugs d\'espacement — apprends à la lire tôt.' }
          ],
          errors: [
            { title: 'Oublier box-sizing et se battre avec les largeurs', bad: '.carte {\n  width: 25%;\n  padding: 20px;  /* boum : 25% + 40px -> ça déborde */', good: '*, *::before, *::after { box-sizing: border-box; }\n.cartes { display: flex; gap: 1rem; }\n.carte { padding: 20px; }', why: 'Avec border-box, le padding est absorbé DANS la largeur. Et pour les gouttières entre cartes, gap (flex/grid) remplace élégamment les marges.' },
            { title: 'Centrer avec margin:auto en oubliant la largeur', bad: '.bloc { margin: 0 auto; } /* rien ne se passe */', good: '.bloc { max-width: 600px; margin: 0 auto; }', why: 'margin:auto centre en répartissant l\'espace RESTANT : il faut que l\'élément soit plus étroit que son parent (largeur définie, display block).' }
          ],
          related: ['css-display', 'css-flexbox', 'css-unites-couleurs']
        },

        {
          id: 'css-display',
          title: 'display : block, inline, flex…',
          icon: 'dashboard',
          level: 'Débutant',
          tagline: 'Comment les éléments se comportent entre eux, et la propriété qui gouverne tout le reste.',
          intro: '`display` est la propriété la plus fondamentale de CSS : elle décide **comment un élément participe à la mise en page**. Est-il un bloc qui prend toute la ligne ? Un mot dans le flux ? Un conteneur qui réorganise ses enfants ? Les réponses conditionnent absolument tout ce que tu feras ensuite — flexbox et grid comprises. Commençons par le cadre qui rend tout limpide : les deux faces de display.',
          blocks: [
            { t: 'h3', h: 'Deux questions en une : comment JE me place, comment MES ENFANTS se placent' },
            { t: 'p', h: 'Le modèle moderne voit `display` comme deux rôles distincts. Le rôle **extérieur** (outer) : comment l\'élément se comporte vis-à-vis de ses voisins — `block` (nouvelle ligne, pleine largeur) ou `inline` (dans la ligne, à la taille du contenu). Le rôle **intérieur** (inner) : comment ses enfants sont disposés — `flow` (le flux classique) ou un contexte spécial (`flex`, `grid`). Quand tu écris `display: flex`, tu dis en réalité « extérieur block, intérieur flex ». Cette lecture à deux faces rend tous les comportements prévisibles.' },
            { t: 'h3', h: 'Block vs inline : les deux natures' },
            { t: 'table', head: ['', 'block', 'inline'], rows: [
              ['Exemples', '`div`, `p`, `h1-h6`, `section`, `form`, `li`', '`span`, `a`, `strong`, `em`, `code`'],
              ['Largeur', 'Toute la ligne disponible', 'Juste le contenu'],
              ['Saut de ligne', 'Avant et après', 'Non, reste dans la ligne'],
              ['width / height', '✓', '✗ (ignorés)'],
              ['margin / padding verticaux', '✓ poussent les voisins', '✗ verticaux n\'écartent pas les lignes'],
            ]},
            { t: 'p', h: 'Pourquoi l\'inline ignore-t-il hauteur et marges verticales ? Sous le capot : un élément inline vit dans une **boîte de ligne** dont la hauteur dépend des textes qui s\'y trouvent ; les lignes s\'empilent ensuite verticalement. Si chaque fragment inline pouvait imposer sa hauteur, il chevaucherait les lignes voisines — le moteur préfère donc ignorer ces réglages verticaux. (L\'astuce pour aligner finement dans la ligne, c\'est `vertical-align`.)' },
            { t: 'h3', h: 'inline-block : le compromis (et son piège d\'espaces)' },
            { t: 'code', lang: 'css', code:
'.badge {\n  display: inline-block;  /* reste dans la ligne, MAIS : */\n  padding: 4px 12px;      /* padding vertical respecté */\n  border-radius: 999px;\n}' },
            { t: 'p', h: '`inline-block` se comporte comme un mot (reste dans la ligne) tout en acceptant dimensions et marges verticales — parfait pour les badges et petites étiquettes. Son défaut hérité du texte : les **espaces entre balises** dans le HTML créent de petits interstices visibles entre les boîtes. Trois badges à `width: 33%` ne tiennent pas sur une ligne. La solution moderne n\'est plus de « manger » ces espaces avec des hacks, mais de passer le parent en `display: flex` avec `gap`, qui ignore superbement les espaces du source.' },
            { t: 'h3', h: 'display: flex / grid : le parent crée un contexte' },
            { t: 'p', h: 'Quand tu écris `display: flex` ou `display: grid` sur un conteneur, **ce ne sont PAS les enfants qui changent de display** — c\'est le conteneur qui promet : « mes enfants directs seront disposés selon mes règles ». Toutes les propriétés d\'organisation (`justify-content`, `gap`, `grid-template-columns`…) se déclarent donc sur le parent. C\'est la source de l\'erreur n°1 des débutants (voir l\'encadré rouge en bas) : mettre `display: flex` sur les éléments à aligner au lieu de les mettre sur leur parent commun.' },
            { t: 'code', lang: 'css', code:
'.toolbar {\n  display: flex;      /* les enfants directs s\'alignent en ligne */\n  gap: 12px;          /* espacement entre eux, sans marges */\n}\n/* Même un <span> enfant devient un « item » blockifié automatiquement. */' },
            { t: 'h3', h: 'Cacher un élément : none, visibility, opacity — trois façons très différentes' },
            { t: 'table', head: ['Technique', 'Effet réel', 'Quand l\'utiliser'], rows: [
              ['`display: none`', 'Retiré du flux, aucune place, ignoré des lecteurs d\'écran', 'Fermeture complète (menu mobile fermé, panneau masqué)'],
              ['`visibility: hidden`', 'Invisible mais la place est GARDÉE ; plus cliquable', 'Réserver l\'emplacement sans trou visuel'],
              ['`opacity: 0`', 'Invisible, place gardée… et RESTE cliquable !', 'Fondu d\'apparition (pense à `pointer-events: none`)'],
              ['attribut `hidden` (HTML)', 'Équivaut à `display: none` par défaut', 'Le moyen sémantique, sans CSS']
            ]},
            { t: 'p', h: 'Le piège qui pique : un bouton à `opacity: 0` continue de **capter les clics** — invisible, il bloque ce qui est dessous. Le duo correct pour un fondu propre : `opacity: 0; pointer-events: none;`. Et retiens la différence d\'accessibilité : `display: none` retire aussi l\'élément de l\'arbre vocalisé, `visibility` pareil, tandis qu\'une simple transparence le laisse annoncé aux lecteurs d\'écran.' },
            { t: 'h3', h: 'contents, flow-root et autres valeurs avancées' },
            { t: 'ul', items: [
              '`display: contents` — l\'élément « se déshabille » : sa boîte disparaît, ses enfants remontent au niveau du parent. Puissant pour retirer un wrapper sémantique qui bloque une grille ou une flex.',
              '`display: flow-root` — crée un contexte de bloc autonome : contient les flottants, empêche les marges de fusionner, sans rien changer d\'autre. Le « clearfix » moderne.',
              '`display: table` / `table-cell` — reproduit les comportements de tableau sans `<table>` ; ancêtre historique du centrage vertical, aujourd\'hui remplacé par flex.',
              '`display: list-item` — le display des `li` (boîte + puce `::marker`).'
            ]},
            { t: 'h3', h: 'float : l\'héritage à connaître, pas à utiliser' },
            { t: 'p', h: 'Tu croiseras `float: left` dans d\'anciens codes et tutoriels. À l\'origine, `float` servait à faire **couler le texte autour d\'une image** — son seul usage encore légitime. Pendant quinze ans, faute de mieux, on l\'a détourné pour faire des colonnes entières, au prix de hacks célèbres (clearfix, parent effondré — car un flottant sort partiellement du flux et son parent ne « voit » plus sa hauteur). Depuis flexbox et grid, plus aucune raison de poser une mise en page au float : garde-le pour l\'image dans l\'article, et c\'est tout.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« display: flex sur chaque enfant pour les aligner. »** — C\'est le PARENT qui devient conteneur ; les enfants directs deviennent automatiquement des « items » (même un `span`). Une seule règle sur le bon élément suffit.',
              '**« inline-block + width: 33% × 3 = trois colonnes. »** — Les espaces entre balises ajoutent une gouttière invisible : la 3e boîte passe à la ligne. `display: flex` + `gap` règle ça proprement.',
              '**« display: none = opacity: 0 = visibility: hidden. »** — Flux, clic et accessibilité diffèrent sur toute la ligne (voir le tableau) ; choisir la mauvaise crée des bugs subtils.',
              '**« Transformer un span en block, c\'est mal. »** — `display` décide du RENDU, la balise du SENS ; rien de honteux. En revanche, si tu transformes tout, demande-toi si la balise était la bonne (voir la fiche html-semantique).',
              '**« block = gros, inline = petit. »** — Ces valeurs parlent de placement, pas de taille : un `div` peut faire 10 px, une `img` (inline par nature) 2000 px.',
              '**« Un display: flex conserve les puces des li. »** — Non : l\'item flex perd son `::marker`. Pour les puces stylées dans une flex, utilise `li::marker`… ou repasse en list-item.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le modèle de boîte de la fiche précédente s\'applique… différemment selon inline ou block (voilà pourquoi ton `width` sur `span` restait muet). La fusion des marges ? Neutralisée par les contextes flex/grid et `flow-root`. Et la prochaine fiche (`position`) te montrera une toute autre façon de faire sortir un élément du flux — la quatrième, et la plus radicale.' },
            { t: 'callout', kind: 'warn', h: '`float` était l\'outil de mise en page d\'avant 2015. Aujourd\'hui, flexbox et grid le remplacent à 99 %. N\'apprends `float` que pour la maintenance d\'anciens codes et le texte qui entoure une image.' }
          ],
          errors: [
            { title: 'Mettre display:flex sur les ENFANTS', bad: '.menu li { display: flex; } /* les li s\'empilent toujours */', good: '.menu { display: flex; } /* le PARENT devient conteneur flex */', why: 'flex s\'applique au conteneur et organise ses enfants directs. C\'est l\'erreur la plus fréquente des débutants en flexbox.' },
            { title: 'Régler width sur un <span> et ne rien voir', bad: 'span.prix { width: 120px; }', good: 'span.prix { display: inline-block; width: 120px; }', why: 'Un élément inline ignore width/height (il vit dans une boîte de ligne). inline-block (ou flex sur le parent) lui redonne des dimensions.' }
          ],
          related: ['css-box-model', 'css-flexbox', 'css-position']
        },

        {
          id: 'css-position',
          title: 'position & z-index',
          icon: 'my_location',
          level: 'Intermédiaire',
          tagline: 'relative, absolute, fixed, sticky : sortir du flux (et comprendre les empilements).',
          intro: 'Par défaut, chaque élément suit le flux normal : il prend la place que le document lui attribue, dans l\'ordre, sans chevaucher personne. La propriété `position` permet de le **sortir de ce flux** — pour un badge promo sur une image, une barre de paiement fixe en bas d\'écran, ou un en-tête de tableau qui reste collé au scroll. Quatre schémas, quelques règles précises, et un chapitre de géométrie en couches (z-index) : une fois ces règles connues, les mystères de superposition disparaissent.',
          blocks: [
            { t: 'h3', h: 'Le flux normal, d\'abord : la file d\'attente' },
            { t: 'p', h: 'Avant de « sortir du flux », encore faut-il comprendre ce qu\'il est : le navigateur pose chaque boîte là où le document la place — de haut en bas, en respectant `display` et le box model — et chaque élément **réserve sa place**. Sortir du flux signifie précisément que les autres éléments **ne te voient plus** : un élément en `absolute` n\'a plus de réservation, les voisins referment la file comme s\'il n\'existait pas. Soixante-dix pour cent des surprises de `position` viennent de l\'oubli de cette phrase.' },
            { t: 'h3', h: 'Les quatre schémas (plus le défaut)' },
            { t: 'table', head: ['Valeur', 'Sort du flux ?', 'Se positionne par rapport à'], rows: [
              ['`static` (défaut)', 'Non', '— : aucun décalage possible, `top`/`left` ignorés'],
              ['`relative`', 'Non (garde sa place)', 'Sa propre position normale — sert surtout de **référence**'],
              ['`absolute`', 'Oui', 'Le plus proche ancêtre **positionné** (sinon la page)'],
              ['`fixed`', 'Oui', 'La fenêtre (ne bouge plus au scroll)'],
              ['`sticky`', 'Non, hybride', 'Colle à un seuil (`top: 0`) tant que son parent défile']
            ]},
            { t: 'p', h: 'Une fois positionné (tout sauf `static`), l\'élément se règle avec `top`, `right`, `bottom`, `left` — ou le raccourci `inset: 0` pour les quatre à zéro, très pratique pour couvrir un parent. Retiens la distinction clé : `relative` et `sticky` **conservent leur réservation** dans le flux ; `absolute` et `fixed` la libèrent.' },
            { t: 'h3', h: 'Le combo fondateur : relative + absolute' },
            { t: 'code', lang: 'css', code:
'.carte {\n  position: relative;  /* devient la référence, sans bouger d\'un pixel */\n}\n.badge {\n  position: absolute;  /* se place DANS .carte, hors du flux */\n  top: 12px;\n  right: 12px;\n}' },
            { t: 'demo', height: 130, caption: 'Un badge « -20 % » en absolute, ancré à sa carte (relative)', html:
'<div style="position:relative;width:220px;margin:0 auto;padding:14px;background:#f2f4f8;border-radius:12px;font-size:14px"><div style="height:70px;background:linear-gradient(135deg,#74b9ff,#5e5ce6);border-radius:8px"></div><p style="margin:8px 0 0">Sneakers Cloud</p><span style="position:absolute;top:8px;right:8px;background:#ff453a;color:#fff;font-size:12px;font-weight:700;padding:4px 9px;border-radius:999px">-20 %</span></div>' },
            { t: 'p', h: 'La règle d\'or à réciter : **`absolute` cherche le plus proche ancêtre dont la position n\'est pas `static`**. S\'il n\'en trouve pas, il tombe sur la page entière — et ton badge « -20 % » de la Boutique Awa se colle en haut de l\'écran au lieu de sa carte. Dès qu\'un absolute semble « perdu », la question à te poser n\'est pas « quel z-index ? » mais « qui est son ancêtre de référence ? ». Note en passant le vrai métier de `relative` : bien qu\'il puisse décaler un élément visuellement (en laissant un trou derrière lui), on s\'en sert à 95 % pour servir de référence, pas pour déplacer.' },
            { t: 'h3', h: 'fixed : collé à la fenêtre' },
            { t: 'code', lang: 'css', code:
'.barre-paiement {\n  position: fixed;\n  left: 0; right: 0; bottom: 0;\n  padding-bottom: env(safe-area-inset-bottom, 0); /* encoche iPhone */\n  background: rgba(255,255,255,.85);\n  backdrop-filter: blur(12px);\n  z-index: 100;\n}' },
            { t: 'p', h: 'Le schéma des barres d\'action façon applications de paiement : toujours visibles, le contenu scrolle derrière. Deux subtilités. D\'abord `env(safe-area-inset-bottom)` évite que la barre passe sous l\'indicateur de geste des iPhone — détail d\'artisan. Ensuite le piège moderne et vicieux : **un ancêtre avec `transform`, `filter` ou `backdrop-filter` devient le nouveau référentiel du `fixed`** — ta barre « fixe » se met alors à scaler avec lui et cesse d\'être fixe à l\'écran. Si un jour un `fixed` « suit » un parent animé, tu sais où chercher.' },
            { t: 'h3', h: 'sticky : l\'hybride sous-estimé' },
            { t: 'code', lang: 'css', code:
'.table-prix thead th {\n  position: sticky;\n  top: 0;            /* INDISPENSABLE : le seuil de collage */\n  background: white; /* sinon le contenu qui défile transparaît */\n}\n\n.section h2 {\n  position: sticky;\n  top: 12px;         /* les titres de rayons « suivent » le scroll */\n}' },
            { t: 'p', h: '`sticky` reste dans le flux jusqu\'au seuil, puis colle… **à l\'intérieur de son parent uniquement** : quand le parent a fini de défiler, l\'élément repart avec lui. C\'est parfait pour l\'en-tête d\'un long tableau de prix du marché ou les lettres d\'un annuaire. Les trois causes de « sticky ne marche pas » : 1) le seuil (`top`, `bottom`…) est oublié — sans lui, rien ne colle ; 2) un ancêtre a `overflow: hidden`/`auto`/`scroll` — le scroll s\'y déroule au lieu de la fenêtre et neutralise l\'effet ; 3) le parent fait la même hauteur que l\'élément collant — il n\'a nulle part où coller.' },
            { t: 'h3', h: 'z-index et contextes d\'empilement : la troisième dimension' },
            { t: 'p', h: 'Quand des éléments se chevauchent, qui passe devant ? Sans `z-index`, l\'ordre de peinture suit des règles précises : fonds et bordures du parent d\'abord, puis le flux, puis les éléments positionnés — à étape égale, **le dernier du DOM gagne**. `z-index` permet de modifier cet ordre… mais avec une règle qui rend fou tant qu\'on l\'ignore : il ne se compare **qu\'entre éléments du même contexte d\'empilement** (stacking context).' },
            { t: 'p', h: 'Qu\'est-ce qui crée un contexte ? La racine de la page, tout élément positionné avec un `z-index` défini, tout enfant flex/grid avec un `z-index`, et — attention — tout élément avec `opacity < 1`, `transform`, `filter`, `backdrop-filter` ou `isolation: isolate`. Chaque contexte est un sac scellé : un enfant à `z-index: 9999` ne sortira JAMAIS de son sac, même pour passer devant un voisin à `z-index: 1`. C\'est *le* mécanisme derrière le célèbre bug « mon menu reste derrière la bannière » : on ne le répare pas avec un z-index plus gros, mais en sortant l\'élément du contexte fautif (le replacer plus haut dans le DOM — une modale se met tout à la fin du `body`).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« absolute = par rapport à la page. »** — Par rapport au plus proche ancêtre POSITIONNÉ ; la page n\'est que le repli. D\'où le réflexe : parent `relative` avant tout `absolute`.',
              '**« z-index marche sur n\'importe quel élément. »** — Sans position (ou statut d\'item flex/grid), `z-index` est purement ignoré. Et même positionné, il ne franchit pas les contextes scellés.',
              '**« Plus le z-index est grand, plus ça marche. »** — Les guerres de 9999999 naissent d\'un contexte d\'empilement non compris ; une échelle saine tient en trois valeurs (10, 100, 1000).',
              '**« sticky est buggé, ça ne marche jamais. »** — Dans 99 % des cas : seuil oublié, ancêtre en `overflow`, ou parent trop petit pour offrir une distance de collage.',
              '**« fixed suit le scroll d\'un conteneur. »** — Non, il suit la fenêtre… sauf ancêtre transformé/filtré, qui devient son référentiel — et alors il EST « buggé », pour de bonnes raisons de spécification.',
              '**« relative sert à déplacer des éléments. »** — Techniquement possible, mais ça laisse un trou fantôme à l\'emplacement d\'origine ; son vrai métier est de servir de référence.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tout part de la fiche `display` : le flux normal que `position` interrompt, c\'est lui. Le box model intervient deux fois — l\'espace « libéré » par un absolute se referme, et le centrage `margin: auto` fonctionne aussi pour un absolute couvrant son parent (`inset: 0; margin: auto` = centrage parfait, garde l\'astuce). Enfin, retiens que `transform` — star de la fiche Animations — **crée un contexte d\'empilement et piège les `fixed`** : ces deux fiches se répondent constamment.' },
            { t: 'callout', kind: 'tip', h: 'Convention saine : z-index reste petit et sémantique via des variables (`--z-dropdown: 100; --z-modal: 1000`). Les valeurs délirantes sont le symptôme d\'un contexte d\'empilement non compris, pas une solution.' }
          ],
          errors: [
            { title: 'absolute sans parent positionné', bad: '.badge { position: absolute; top: 10px; right: 10px; }\n/* se colle a la PAGE, pas a la carte */', good: '.carte { position: relative; }\n.badge { position: absolute; top: 10px; right: 10px; }', why: 'absolute se réfère au plus proche ancêtre positionné. Sans relative sur la carte, la référence devient la page, et le badge se balade.' },
            { title: 'Un z-index énorme pour "passer devant"', bad: '.menu { z-index: 99999; } /* passe quand même derrière */', good: '/* Remonter .menu hors du parent qui a un transform,\n   ou déplacer la modale en fin de <body> */', why: 'z-index ne franchit pas les contextes d\'empilement : un parent avec transform/opacity<1 crée une barrière qu\'aucun z-index enfant ne traverse.' }
          ],
          related: ['css-display', 'css-box-model', 'css-transitions-animations']
        }
      ]
    },

    {
      id: 'mise-en-page',
      name: 'Mise en page moderne',
      icon: 'web',
      fiches: [
        {
          id: 'css-flexbox',
          title: 'Flexbox',
          icon: 'view_column',
          level: 'Intermédiaire',
          tagline: 'Aligner, répartir, centrer : la boîte à outils des mises en page en une dimension.',
          intro: 'Flexbox a résolu le problème qui a empoisonné quinze ans de CSS : **aligner des éléments sur un axe**. C\'est à peine une exagération — « comment je centre verticalement ? » était LA blague récurrente du web des années 2000, et la réponse tenait en hacks absurdes. Aujourd\'hui : centrer ? deux lignes. Répartir l\'espace entre des boutons ? une ligne. Des cartes de même hauteur ? le comportement par défaut. Flexbox pense en **une** dimension (ligne OU colonne) — c\'est son territoire, et il le domine.',
          blocks: [
            { t: 'h3', h: 'Le problème que Flexbox a résolu' },
            { t: 'p', h: 'Avant 2015, aligner proprement exigeait des tables, des floats détournés, des `line-height` truqués et des `position: absolute` approximatifs — des techniques qui cassaient dès que le contenu changeait. Flexbox part du bon constat : dans une barre d\'outils, un menu, une rangée de cartes, ce qu\'on veut n\'est pas « tant de pixels » mais **« répartir l\'espace disponible intelligemment »**. Le navigateur fait les calculs ; tu déclares l\'intention.' },
            { t: 'h3', h: 'Le parent commande, les enfants obéissent' },
            { t: 'code', lang: 'css', code:
'.toolbar {\n  display: flex;        /* active le mode flex sur les enfants DIRECTS */\n  flex-direction: row;  /* défaut : en ligne (column pour en colonne) */\n  gap: 12px;            /* gouttière entre enfants — fini les marges */\n}' },
            { t: 'demo', height: 120, caption: 'justify-content: space-between + align-items: center', html:
'<div style="display:flex;justify-content:space-between;align-items:center;background:#eef2f7;border-radius:12px;padding:10px"><span style="font-weight:700">Logo</span><div style="display:flex;gap:8px"><span style="background:#fff;padding:6px 12px;border-radius:8px;font-size:13px">Accueil</span><span style="background:#fff;padding:6px 12px;border-radius:8px;font-size:13px">Docs</span><span style="background:#0a84ff;color:#fff;padding:6px 12px;border-radius:8px;font-size:13px">Contact</span></div></div>' },
            { t: 'p', h: 'Vocabulaire : le conteneur est le **flex container**, ses enfants directs sont les **flex items** — et « directs » compte : un petit-enfant n\'est pas un item (pour l\'aligner, on redonne `display: flex` à son parent). Les items deviennent des sortes de blocs : un `span` accepte soudain `width`. Et `gap` règle l\'espacement entre eux sans jamais toucher aux marges qui fusionnent.' },
            { t: 'h3', h: 'Les deux axes : le concept qui débloque tout' },
            { t: 'p', h: 'Tout le vocabulaire flex dépend de la direction. En `row` (défaut), l\'axe **principal** est horizontal et l\'axe **croisé** vertical. En `column`, tout s\'inverse : le principal devient vertical. Chaque propriété agit sur UN axe précis — et l\'erreur classique du débutant est de chercher `justify-content` pour centrer verticalement… alors qu\'en `column`, c\'est justement lui !' },
            { t: 'table', head: ['Propriété (sur le parent)', 'Axe', 'Valeurs utiles'], rows: [
              ['`justify-content`', 'Principal', '`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`'],
              ['`align-items`', 'Croisé', '`stretch` (défaut), `center`, `flex-start`, `flex-end`, `baseline`'],
              ['`align-content`', 'Croisé (multi-lignes)', 'même famille, si `flex-wrap: wrap`'],
              ['`flex-wrap`', '—', '`nowrap` (défaut) ou `wrap` pour autoriser le retour à la ligne']
            ]},
            { t: 'p', h: 'Le centrage parfait tant attendu : `justify-content: center; align-items: center;`. Si ça ne centre pas verticalement, vérifie que le conteneur a bien une **hauteur** (`min-height: 100vh` par exemple) : on ne peut pas répartir un espace qui n\'existe pas.' },
            { t: 'h3', h: 'Répartir : justify-content joue sur l\'espace LIBRE' },
            { t: 'p', h: 'Point de mécanique essentiel : `justify-content` ne déplace pas les items dans le vide — il **distribue l\'espace restant** une fois les items posés. Si les items remplissent déjà toute la ligne (ou ont grandi avec `flex-grow`), il n\'a plus rien à distribuer et son effet s\'annule. Et il existe un concurrent discret : une **marge `auto`** sur un item absorbe l\'espace libre AVANT `justify-content` — d\'où le combo culte « logo à gauche, actions à droite » :' },
            { t: 'code', lang: 'css', code:
'.nav { display: flex; align-items: center; gap: 1rem; }\n.nav .actions { margin-left: auto; } /* pousse tout le bloc a droite */' },
            { t: 'h3', h: 'Grandir et rétrécir : grow, shrink, basis — l\'algorithme enfin clair' },
            { t: 'p', h: 'Voici ce que le navigateur calcule réellement, sous le capot, pour chaque item. 1) Il part du **`basis`** : la taille de départ (`auto` = la width ou le contenu). 2) Il compare la somme des basis à la largeur du conteneur : s\'il reste de la place, **`grow`** se la partage au prorata — deux items à `flex-grow: 1` prennent chacun la moitié, un `2` prend le double d\'un `1`. 3) Si ça déborde, **`shrink`** réduit au prorata… mais JAMAIS sous le contenu minimal (un mot long, une image, un `pre`) sans intervention de ta part.' },
            { t: 'code', lang: 'css', code:
'.sidebar { flex: 0 0 280px; }    /* figée : ni grandit, ni rétrécit, 280px */\n.contenu { flex: 1; }            /* prend TOUT l\'espace restant */\n.media   { flex: 0 1 auto; }     /* ne grandit pas, peut rétrécir */\n\n.item.special { align-self: flex-end; } /* exception locale sur l\'axe croisé */\n.item.prioritaire { order: -1; }        /* affiché en premier (défaut : 0) */' },
            { t: 'p', h: 'Le raccourci `flex: 1` vaut `flex-grow: 1; flex-shrink: 1; flex-basis: 0%` — « pars de zéro et partage tout » : des parts VRAIMENT égales, indifférentes au contenu. À l\'inverse, `flex: auto` garde `basis: auto` et répartit seulement le surplus : les colonnes restent proportionnelles à leur contenu. Savoir lequel on veut évite bien des heures de « pourquoi mes colonnes ne sont pas égales ? ».' },
            { t: 'h3', h: 'Wrap + gap : la galerie qui se fait toute seule' },
            { t: 'code', lang: 'css', code:
'.galerie {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.galerie > * {\n  flex: 1 1 240px;  /* base 240px, grandit, rétrécit */\n}' },
            { t: 'p', h: 'Cette poignée de lignes donne au catalogue de la Boutique Awa des cartes qui passent d\'une à plusieurs colonnes selon la largeur disponible, **sans aucune media query**. Limite à connaître : sur plusieurs lignes, `justify-content: space-between` laisse la dernière ligne partielle collée à gauche avec un orphelin décalé — et surtout, les colonnes de lignes différentes **ne s\'alignent pas entre elles**. Dès que l\'alignement 2D compte, c\'est le territoire de Grid (fiche suivante).' },
            { t: 'h3', h: 'Les patterns du quotidien' },
            { t: 'ul', items: [
              '**Barre de navigation** : `display: flex; align-items: center; gap: 1rem;` + `margin-left: auto` sur le bloc d\'actions (la topbar de ce site fonctionne ainsi).',
              '**Cartes de même hauteur** : rien à faire ! `align-items: stretch` est le défaut et égalise les hauteurs sur l\'axe croisé.',
              '**Footer collé en bas de page** : `body { min-height: 100vh; display: flex; flex-direction: column; }` puis `main { flex: 1; }` — le contenu pousse le pied de page, même sur les pages courtes.',
              '**Centrage total** : conteneur flex + `justify-content: center; align-items: center;` + une hauteur définie.',
              '**Champ de recherche + bouton** : le `input` en `flex: 1`, le bouton en taille naturelle ; le formulaire s\'étire proprement.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« justify-content centre verticalement. »** — Uniquement sur l\'axe PRINCIPAL. En `row` c\'est horizontal ; en `column` c\'est vertical. Commence toujours par orienter tes axes, ensuite tes propriétés.',
              '**« width: 200px sur un item = 200 px garantis. »** — `flex-shrink` peut le réduire dès que ça manque de place, car `basis` reprend la width par défaut. Pour figer : `flex: 0 0 200px`.',
              '**« Les items rétrécissent jusqu\'à disparaître si besoin. »** — Non : plancher = contenu minimal (`min-width: auto`). Un long mot, une image ou un `pre` casse alors la ligne — cure : `min-width: 0` sur l\'item, ou `flex-wrap: wrap`.',
              '**« space-between gère les galeries multi-lignes. »** — Il ne sait pas justifier la dernière ligne partielle : l\'orphelin colle à gauche. Pour une vraie grille régulière, passe à Grid.',
              '**« order réorganise accessiblement. »** — `order` ne change que l\'AFFICHAGE : la tabulation au clavier et les lecteurs d\'écran suivent le DOM. Ne l\'utilise jamais pour inverser du contenu porteur de sens.',
              '**« gap remplace toutes les marges. »** — gap S\'AJOUTE aux marges encore présentes sur les items ; un petit reset des marges sur les enfants évite les doubles gouttières.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Flexbox est la suite directe de `display` (le conteneur crée un contexte — les enfants obéissent) et du box model (`gap` supplante les marges, `box-sizing: border-box` garde les tailles d\'items prévisibles, `margin: auto` y devient un outil de poussée). Petit rappel de la fiche Position : **le `z-index` fonctionne sur les items flex** même sans position — et un item qui rétrécit sous un seuil transparent rend justice à `min-width: 0`. La question suivante est naturelle : et si je veux aligner lignes ET colonnes ensemble ? Réponse : CSS Grid.' },
            { t: 'callout', kind: 'tip', h: 'Flexbox répond à : « distribuer des choses le long d\'une ligne (ou d\'une colonne), l\'espace s\'adaptant au contenu ». Pour une structure bidimensionnelle stable, c\'est Grid. Les deux se combinent : Grid dessine la page, Flexbox organise l\'intérieur des composants.' }
          ],
          errors: [
            { title: 'Les enfants écrasés qui débordent', bad: '.row { display: flex; }\n/* 3 enfants de 500px dans 1200px -> débordent */', good: '.row { display: flex; flex-wrap: wrap; gap: 1rem; }\n.row > img { max-width: 100%; }', why: 'Par défaut flex-wrap vaut nowrap et les enfants ne rétrécissent pas sous leur contenu minimal. Un long mot ou une image large casse la ligne : wrap + max-width sauvent la mise en page.' },
            { title: 'Texte tronqué impossible dans un enfant flex', bad: '.flex span { text-overflow: ellipsis; }', good: '.flex span { min-width: 0; overflow: hidden;\n          text-overflow: ellipsis; white-space: nowrap; }', why: 'Les enfants flex refusent de rétrécir sous leur contenu min (min-width: auto). min-width: 0 lève ce verrou et permet enfin l\'ellipsis.' }
          ],
          related: ['css-display', 'css-grid', 'css-box-model', 'css-responsive']
        },

        {
          id: 'css-grid',
          title: 'CSS Grid',
          icon: 'grid_view',
          level: 'Avancé',
          tagline: 'Lignes ET colonnes : le système de mise en page en deux dimensions, avec zones nommées.',
          intro: 'Si Flexbox aligne sur un axe, Grid **dessine la page entière** : tu définis une grille de lignes et de colonnes, puis tu places les éléments dedans — quitte à les faire se chevaucher. C\'est l\'outil des vraies structures : pages complètes, tableaux de bord, galeries régulières. Et contrairement à sa réputation, sa base tient en quelques lignes ; la complexité n\'arrive que si tu la invites.',
          blocks: [
            { t: 'h3', h: 'Le problème que Grid résout : aligner dans DEUX dimensions' },
            { t: 'p', h: 'Revenons une seconde sur la limite de Flexbox vue à la fiche précédente : en `wrap`, chaque ligne vit sa vie et les cartes de lignes différentes ne s\'alignent PAS en colonnes. Normal — flex ne pense qu\'en 1D. Grid considère ta mise en page comme un damier où les **pistes** (tracks) traversent toute la grille : la 2e colonne de la ligne 1 EST la 2e colonne de la ligne 5. Tout ce qui demande un alignement croisé — dashboard, page produit, galerie — devient trivial.' },
            { t: 'h3', h: 'Créer une grille : les pistes explicites' },
            { t: 'code', lang: 'css', code:
'.page {\n  display: grid;\n  grid-template-columns: 240px 1fr;   /* 2 colonnes : fixe + le reste */\n  grid-template-rows: auto 1fr auto;  /* 3 lignes : auto calculées sur le contenu */\n  gap: 16px;                          /* row-gap + column-gap */\n}' },
            { t: 'p', h: 'L\'unité star est le **`fr`** (fraction) : il se partage l\'espace RESTANT une fois les tailles fixes et les gaps retirés. `240px 1fr` = une colonne fixe de 240 px plus une colonne qui prend tout le reste. Trois colonnes égales : `1fr 1fr 1fr`, ou mieux `repeat(3, 1fr)`. Et `minmax(180px, 1fr)` borne une piste entre un plancher et un plafond — héros discret de la fiche.' },
            { t: 'h3', h: 'Placer les éléments : numéros, span… ou dessin' },
            { t: 'code', lang: 'css', code:
'/* Par numéros de lignes de grille (les lignes, pas les cellules !) */\nheader { grid-column: 1 / 3; }        /* de la ligne 1 à la ligne 3 */\n.hero  { grid-column: 1 / -1; }       /* toute la largeur (-1 = la fin) */\n.pub   { grid-row: span 2; }          /* s\'étire sur 2 lignes */\n\n/* L\'élégance maximale : les zones nommées */\n.page {\n  grid-template-areas:\n    "header header"\n    "nav    main"\n    "footer footer";\n}\nheader { grid-area: header; }\nnav    { grid-area: nav; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }' },
            { t: 'demo', height: 200, caption: 'Une mise en page complète en template-areas', html:
'<div style="display:grid;grid-template-columns:110px 1fr;grid-template-rows:44px 1fr 36px;gap:8px;font:600 13px sans-serif;text-align:center"><div style="grid-column:1/3;background:#74b9ff;border-radius:8px;display:grid;place-items:center">header</div><div style="background:#a29bfe;border-radius:8px;display:grid;place-items:center">nav</div><div style="background:#81ecec;border-radius:8px;display:grid;place-items:center">main</div><div style="grid-column:1/3;background:#ffeaa7;border-radius:8px;display:grid;place-items:center">footer</div></div>' },
            { t: 'p', h: '`grid-template-areas` dessine littéralement ta page en ASCII art dans ta feuille de style. La puissance devient spectaculaire au chapitre Responsive : pour un autre agencement sur mobile, tu **redessines les zones** dans une media query sans toucher une ligne de HTML (séparation parfaite contenu/présentation). Deux précisions sur les numéros : ils comptent les LIGNES de séparation (3 colonnes = 4 lignes numérotées), et tu n\'es pas obligé de placer chaque enfant — le placement automatique remplit les cases dans l\'ordre du DOM, tu ne guides que les exceptions.' },
            { t: 'h3', h: 'Aligner : dans la cellule ET la grille entière' },
            { t: 'code', lang: 'css', code:
'.carte  { display: grid; place-items: center; }  /* centrage en 1 ligne */\n.page   {\n  display: grid;\n  justify-items: stretch;   /* items dans leurs cellules (horizontal) */\n  align-items: start;       /* items dans leurs cellules (vertical) */\n  justify-content: center;  /* la GRILLE elle-même si pistes < conteneur */\n}' },
            { t: 'p', h: 'Deux niveaux d\'alignement à ne pas confondre : `*-items` règle les éléments **dans leurs cellules** (une cellule n\'est pas l\'élément : par défaut celui-ci s\'y étire, `stretch`), et `*-content` déplace **la grille complète** quand elle est plus petite que le conteneur. Et `place-items: center` est le raccourci de centrage le plus court de tout CSS — 3 mots pour le graal.' },
            { t: 'h3', h: 'La grille légendaire qui se fait toute seule' },
            { t: 'code', lang: 'css', code:
'.cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 1rem;\n}' },
            { t: 'p', h: 'Cette ligne se lit : « mets autant de colonnes que possible, chacune d\'au moins 220 px, et partage le reste équitablement ». Résultat : une galerie **100 % responsive sans media query** — 1 colonne sur téléphone, 4 sur grand écran, transitions automatiques. La nuance `auto-fill` vs `auto-fit` : `fill` conserve des pistes fantômes vides (utile pour aligner de futures lignes), `fit` les écrase à 0 et laisse les éléments restants s\'étirer — pour une galerie qui doit remplir, `auto-fit` est souvent le bon choix.' },
            { t: 'h3', h: 'Grid vs Flexbox : la règle de décision' },
            { t: 'ul', items: [
              'La **structure** impose la position (dashboard, page, galerie alignée) → **Grid**.',
              'Le **contenu** dicte la place (barre d\'outils, nuage de tags, menu) → **Flexbox**.',
              'Les éléments doivent-ils s\'aligner avec ceux des autres lignes ? Oui → Grid. Jamais → Flex.',
              'Chevauchement voulu (texte de hero sur image, badge sur vignette) → **Grid**, en plaçant deux éléments dans la même cellule — beaucoup plus propre qu\'un absolute.',
              'En pratique, on combine : Grid trace le cadre de la page, Flexbox organise l\'intérieur des composants.'
            ]},
            { t: 'h3', h: 'Pour aller plus loin : implicite et subgrid' },
            { t: 'p', h: 'Sous le capot, si des éléments dépassent ta grille explicite, le navigateur crée des **pistes implicites** — contrôle-les avec `grid-auto-rows` et `grid-auto-flow` (dont `dense`, qui bouche les trous). Et la perle récente : `subgrid` permet à un enfant d\'hériter des pistes de son parent — des cartes dont l\'image, le titre et le prix s\'alignent AU PIXEL sur toute la ligne, indépendamment du contenu de chacune. Support moderne, à mettre dans un coin de ta tête.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« 1fr = 100 %. »** — Le `fr` partage l\'espace RESTANT (après les pistes fixes ET les gaps) ; deux fois `50%` + un gap débordent, deux fois `1fr` jamais. En Grid, les % sont presque toujours un faux ami.',
              '**« Je dois numéroter chaque enfant. »** — Le placement automatique fait déjà le bon travail dans l\'ordre du DOM ; ne place que les exceptions (`grid-column: 1 / -1` pour le hero pleine largeur).',
              '**« Grid est « trop » pour trois cartes. »** — `repeat(3, 1fr)` est plus simple et plus robuste que les pourcentages flex à retaper. La question n\'est pas la taille, c\'est l\'alignement croisé.',
              '**« Les areas réorganisent accessiblement. »** — Comme `order` en flex, le visuel peut diverger du DOM ; la tabulation et les lecteurs d\'écran suivent le markup. Garde un DOM logique.',
              '**« Une colonne 1fr peut toujours rétrécir. »** — Non : `1fr` vaut implicitement `minmax(auto, 1fr)` → le contenu long (`pre`, URL, image) fait exploser la piste. Le vaccin : `minmax(0, 1fr)` (voir l\'erreur rouge ci-dessous).',
              '**« gap ne marche qu\'en flex. »** — `gap` est né en Grid puis s\'est généralisé à flex ; c\'est la même propriété, les marges de gouttière sont enterrées.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Grid hérite de la même logique de contexte que Flexbox (`display: grid` sur le parent) — et partage avec lui `gap`, `justify`/`align`, les marges non fusionnées et les items `z-index`-ables. Le `fr` est l\'unité de la fiche Unités dédiée aux grilles ; `minmax` et `repeat` préparent la fiche suivante, Responsive, où la grille auto-adaptative et les zones nommées redessinées par media query deviendront tes deux armes principales.' },
            { t: 'callout', kind: 'tip', h: 'Dans Firefox, les DevTools ont le meilleur inspecteur de grille du marché : active le badge « grid » sur le conteneur pour visualiser pistes, numéros de lignes et zones directement sur la page. Indispensable au début.' }
          ],
          errors: [
            { title: 'Confondre fr et %', bad: 'grid-template-columns: 50% 50%;\n/* + gap -> déborde : 100% + 16px */', good: 'grid-template-columns: 1fr 1fr;\n/* les fr absorbent le gap automatiquement */', why: 'Les % ignorent les gouttières : 2×50%+gap dépasse le conteneur. Les fr se partagent l\'espace RESTANT après retrait des gaps : toujours correct.' },
            { title: 'minmax(0,1fr) oublié, contenu qui explose la piste', bad: 'grid-template-columns: 200px 1fr;\n/* un <pre> ou long mot dans la colonne 1fr -> dépassement */', good: 'grid-template-columns: 200px minmax(0, 1fr);', why: 'Une piste 1fr vaut implicitement minmax(auto, 1fr) : son minimum est le contenu. minmax(0, 1fr) autorise la colonne à rétrécir, et l\'overflow se gère à l\'intérieur.' }
          ],
          related: ['css-flexbox', 'css-responsive', 'css-display', 'html-semantique']
        },

        {
          id: 'css-responsive',
          title: 'Responsive & media queries',
          icon: 'devices',
          level: 'Intermédiaire',
          tagline: 'Un site qui s\'adapte à tous les écrans : mobile-first, breakpoints, container queries.',
          intro: 'À Cotonou comme partout, l\'essentiel du trafic web arrive sur téléphone : le client consulte le catalogue de la Boutique Awa sur un écran de 360 px, souvent sur une connexion fluctuante, puis le reprendra peut-être sur un ordinateur. Le responsive design n\'est donc pas une option ni une « version mobile » : c\'est **la** façon moderne de concevoir. Et la méthode qui rend tout infiniment plus simple s\'appelle mobile-first.',
          blocks: [
            { t: 'h3', h: 'Le prérequis absolu : la balise viewport' },
            { t: 'p', h: 'Avant toute chose : sans la balise `meta viewport` (vue dans la fiche « Le head » du module HTML), le navigateur mobile **simule un écran de ~980 px puis dézoome** pour tout faire tenir. Tes media queries répondent alors à une fausse largeur de 980 px et le site paraît minuscule. Avec elle, la largeur de travail égale la largeur réelle de l\'appareil — la fondation de tout le reste :' },
            { t: 'code', lang: 'html', code:
'<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
            { t: 'h3', h: 'Mobile-first : partir du petit écran' },
            { t: 'code', lang: 'css', code:
'/* Base = mobile : le CSS simple, en une colonne */\n.cartes { display: grid; gap: 1rem; }\n\n/* On ENRICHISSIT quand l\'écran grandit */\n@media (min-width: 640px) {\n  .cartes { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 1024px) {\n  .cartes { grid-template-columns: 1fr 1fr 1fr; }\n}' },
            { t: 'p', h: 'Pourquoi ce sens-là et pas l\'inverse ? 1) **La contrainte d\'abord** : concevoir pour 360 px force l\'essentiel — contenu hiérarchisé, actions claires ; l\'espace supplémentaire devient un enrichissement, pas une compression à subir. 2) **La cascade travaille pour toi** : avec `min-width`, chaque palier ajoute des règles et les précédentes restent vraies ; avec `max-width` (le triste « desktop-second »), tu écris le desktop complet puis tu passes ton temps à **annuler** — les correctifs s\'empilent et se contredisent. 3) **La performance** : le mobile, souvent l\'appareil le moins puissant, reçoit le CSS le plus léger et gaspille moins de données — précieux sur un forfait limité.' },
            { t: 'h3', h: 'Choisir ses breakpoints : le contenu casse, pas l\'appareil' },
            { t: 'p', h: 'La tentation est grande de créer un palier par appareil (« iPhone, Galaxy, iPad… ») : c\'est une impasse — il existe des milliers de tailles. La bonne méthode : redimensionne ta fenêtre en continu et observe **où ta mise en page souffre** — texte qui s\'étire à l\'infini, cartes qui s\'écrasent, navigation qui déborde. CHAQUE point de rupture naturel devient un palier. En pratique, avec les techniques intrinsèques ci-dessous, **2 ou 3 paliers suffisent** (`640px` et `1024px` sont de bons compagnons de route), là où le layout change de nature.' },
            { t: 'h3', h: 'Le responsive intrinsèque : le CSS qui s\'adapte sans media query' },
            { t: 'p', h: 'Réduisons d\'abord les media queries au strict nécessaire, grâce aux techniques déjà croisées dans ce module :' },
            { t: 'ul', items: [
              '`clamp(1.1rem, 2.5vw, 1.6rem)` — typographie fluide, bornée (fiche Unités).',
              '`repeat(auto-fit, minmax(220px, 1fr))` — galeries auto-colonnées (fiche Grid).',
              '`flex-wrap: wrap` + `flex: 1 1 240px` — rangées de cartes fluides (fiche Flexbox).',
              'Unités relatives (`rem`, `%`, `ch`) partout où c\'est possible — aucun « mur » de pixels.',
              '`min()`/`max()`/`calc()` pour les largeurs hybrides (`width: min(100%, 750px)`).'
            ]},
            { t: 'p', h: 'Réflexe à adopter : d\'abord intrinsèque, et media query SEULEMENT quand la mise en page change de nature (menu ↔ burger, colonnes ↔ empilement, zones redessinées).' },
            { t: 'h3', h: 'Au-delà des pixels : capacités et préférences' },
            { t: 'code', lang: 'css', code:
'@media (hover: hover) {\n  .carte:hover { transform: translateY(-4px); } /* pas de survol au tactile */\n}\n@media (pointer: coarse) {\n  button { min-height: 44px; }  /* cibles tactiles généreuses */\n}\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}\n@media (prefers-color-scheme: dark) {\n  :root { --fond: #000; --texte: #f5f5f7; } /* thème OS automatique */\n}' },
            { t: 'p', h: 'Les media queries les plus élégantes ne regardent pas la taille : elles respectent **comment** l\'utilisateur interagit (doigt vs souris) et **ce qu\'il préfère** (mouvement réduit pour les sensibilités vestibulaires, thème sombre système). C\'est de l\'accessibilité écrite en CSS — et ces tests sont supportés partout.' },
            { t: 'h3', h: 'Container queries : le composant enfin autonome' },
            { t: 'p', h: 'Les media queries regardent la **fenêtre**. Mais un composant réutilisable ne se soucie pas de la fenêtre : une même carte peut finir dans la colonne principale (large) ou la sidebar (étroite). Les **container queries** répondent à cette demande vieille de quinze ans : le composant réagit à **sa propre boîte**.' },
            { t: 'code', lang: 'css', code:
'.zone { container-type: inline-size; }  /* la boîte devient référence */\n\n@container (min-width: 400px) {\n  .carte { display: flex; }  /* la carte s\'adapte a SON conteneur */\n}' },
            { t: 'p', h: 'La même carte devient horizontale dès qu\'elle dispose de 400 px — peu importe où elle est posée. C\'est le dernier chaînon du design par composants, supporté par tous les navigateurs récents.' },
            { t: 'h3', h: 'Tester comme un pro' },
            { t: 'p', h: 'Le responsive est une habitude de fabrication, pas une passe finale. Ouvre les DevTools (F12), active le mode appareil (Ctrl/Cmd + Shift + M), redimensionne en continu TOUT EN codant. Trois tests supplémentaires qui sauvent : le **throttling réseau** (simule la 3G — l\'expérience réelle de beaucoup de tes visiteurs), le **zoom à 200 %** (exigence d\'accessibilité : le site doit rester utilisable), et un **vrai téléphone** de temps en temps — le rendu tactile réserve toujours des surprises qu\'une souris ne montre pas.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Responsive = plein de media queries. »** — L\'essentiel vient des unités fluides et des layouts intrinsèques ; les media queries ne sont que le dernier ajustement, là où la nature change.',
              '**« Je duplique le bloc : une version mobile, une desktop, avec display: none. »** — Double maintenance garantie, et les deux versions pèsent sur la page. Restructure UNE seule source avec grid areas ou flex ; display: none est l\'exception (menu burger), pas la règle.',
              '**« Je code desktop puis je corrige avec max-width. »** — Tu passeras tes journées à annuler tes propres règles davantage qu\'à en écrire ; min-width et l\'enrichissement progressif sont plus courts, plus lisibles, plus robustes.',
              '**« Sur mobile, tout doit tenir sans scroller. »** — Le scroll vertical est naturel ; ce qui est interdit, c\'est le scroll HORIZONTAL : un contenu qui déborde est un bug, traque-le (`overflow-x` fantôme, souvent un 100vw ou un élément en px trop large).',
              '**« Cibler width: 390px, c\'est précis. »** — Tu ne parles qu\'à UN appareil un jour donné ; la mise en page doit casser quand ELLE le demande, pas quand un fabricant sort un modèle.',
              '**« Je pourrai vérifier le mobile à la fin du projet. »** — Le responsive se fabrique composant par composant, au fil de l\'eau ; rajouté à la fin, il coûte une refonte.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est la synthèse du module : elle consomme les Unités (`clamp`, `vw`, `rem`, `min`), la Typographie fluide, le Flexbox (`wrap`), la Grid (zone redraw dans les media queries + auto-fit), et la balise viewport de la fiche HTML « head ». Il ne reste qu\'un ingrédient pour tout piloter proprement — y compris le thème sombre de `prefers-color-scheme` — : les variables CSS, dernière fiche du module.' },
            { t: 'callout', kind: 'tip', h: 'Un site responsive est une habitude de fabrication : chaque nouveau composant est testé en redimensionnant la fenêtre AVANT de passer au suivant. Cinq secondes à chaque fois, contre une semaine de refonte à la fin.' }
          ],
          errors: [
            { title: 'Oublier la balise viewport', bad: '<head>\n  <!-- rien -->\n</head>', good: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', why: 'Sans elle, le mobile simule un écran de ~980 px et dézoome : tes media queries répondent alors à une fausse largeur, et le site paraît minuscule.' },
            { title: 'Breakpoints calqués sur des appareils', bad: '@media (width: 390px) { } /* l\'iPhone X ! */', good: '@media (min-width: 640px) { }', why: 'Cibler un appareil fige le design dans le temps et casse sur les 10 000 autres tailles. On casse la mise en page quand ELLE le demande, pas quand un fabricant sort un téléphone.' }
          ],
          related: ['css-grid', 'css-flexbox', 'css-unites-couleurs', 'css-variables']
        }
      ]
    },

    {
      id: 'dynamisme',
      name: 'Dynamisme & organisation',
      icon: 'animation',
      fiches: [
        {
          id: 'css-transitions-animations',
          title: 'Transitions & animations',
          icon: 'animation',
          level: 'Intermédiaire',
          tagline: 'transition, @keyframes, transform : donner vie à l\'interface sans Javascript (ou presque).',
          intro: 'Une interface qui réagit en douceur paraît instantanément plus soignée — c\'est tout le secret du « feeling Apple ». Au-delà du cosmétique, le mouvement a un vrai rôle : il explique d\'où vient un élément et où il va, il rend les changements d\'état compréhensibles, il masque les micro-latences. CSS offre deux mécanismes : la **transition** (un passage fluide d\'un état A à un état B) et l\'**animation** (`@keyframes`, une chorégraphie complète qui peut boucler).',
          blocks: [
            { t: 'h3', h: 'Pourquoi animer (et pourquoi si peu) ?' },
            { t: 'p', h: 'Le cerveau déteste les téléportations : un panneau qui apparaît instantanément « vient de nulle part » ; le même panneau qui glisse depuis la droite raconte son origine — et retournera logiquement à droite. C\'est la fonction narrative du mouvement. Mais une interface qui s\'agite partout fatigue : les micro-interactions professionnelles tiennent entre **150 et 300 ms** et restent discrètes. Au-delà de 400 ms, l\'utilisateur attend ; en dessous de 100 ms, il ne voit rien.' },
            { t: 'h3', h: 'La transition : l\'état A vers l\'état B' },
            { t: 'code', lang: 'css', code:
'.bouton {\n  background: #0a84ff;\n  transform: scale(1);\n  /* propriété durée courbe retard */\n  transition: background 0.25s ease,\n              transform 0.15s cubic-bezier(0.34, 1.4, 0.64, 1);\n}\n.bouton:hover  { background: #0066d6; }\n.bouton:active { transform: scale(0.94); }' },
            { t: 'demo', height: 110, caption: 'Survole puis clique : transition douce + effet de pression', html:
'<style>.db{background:#0a84ff;color:#fff;border:none;font:600 15px sans-serif;padding:12px 26px;border-radius:999px;cursor:pointer;transition:background .25s ease,transform .15s cubic-bezier(.34,1.4,.64,1)}.db:hover{background:#0066d6}.db:active{transform:scale(.94)}</style><div style="text-align:center;padding-top:18px"><button class="db">Survole-moi</button></div>' },
            { t: 'p', h: 'Deux points mécaniques cruciaux. 1) `transition` se déclare sur l\'**état de base** (`.bouton`), jamais sur `:hover` : sinon l\'effet joue à l\'aller et saute instantanément au retour. 2) Une transition a besoin des deux états ET d\'un déclencheur — une pseudo-classe (`:hover`, `:focus-visible`), l\'ajout d\'une classe, un changement de valeur. Le navigateur calcule ensuite les étapes intermédiaires (l\'**interpolation**) : pour une couleur, il glisse de nuance en nuance ; pour une longueur, il grandit d\'image en image.' },
            { t: 'h3', h: 'Sous le capot : qu\'est-ce qui est « animable » ?' },
            { t: 'p', h: 'L\'interpolation explique la règle : le navigateur sait calculer des étapes entre deux nombres (longueurs, angles, opacités, couleurs) — mais pas entre `display: none` et `block`, qui sont discrets. Solution classique pour un fondu : animer `opacity` + `visibility` (visibilité supporte la transition dans le bon sens avec un délai). Les toutes nouvelles `transition-behavior: allow-discrete` et `@starting-style` permettent d\'animer l\'apparition — prometteur, mais vérifie le support avant d\'en dépendre.' },
            { t: 'h3', h: 'Les courbes de temporisation (easing)' },
            { t: 'table', head: ['Valeur', 'Rendu', 'Usage'], rows: [
              ['`ease`', 'Lent-rapide-lent (défaut)', 'Correct partout, un peu mou'],
              ['`ease-out`', 'Départ rapide, freinage doux', 'Éléments qui apparaissent — le choix UI n°1'],
              ['`ease-in`', 'Départ lent, arrive d\'un coup', 'Éléments qui quittent l\'écran'],
              ['`linear`', 'Vitesse constante', 'Rotations continues, barres de progression'],
              ['`cubic-bezier(...)`', 'Courbe sur mesure', '`cubic-bezier(0.34,1.4,0.64,1)` = rebond léger façon iOS'],
              ['`steps(n)`', 'Par sauts', 'Machines à écrire, sprites image par image']
            ]},
            { t: 'p', h: 'Un `cubic-bezier` se comprend comme deux poignées tirant la courbe de vitesse : quand la poignée de fin dépasse 1 (comme le `1.4` ci-dessus), la valeur **dépasse sa cible puis revient** — le petit rebond élastique caractéristique des interfaces iOS. Un site comme cubic-bezier.com permet de la visualiser en direct ; en pratique, pars de `ease-out` pour tout ce qui apparaît.' },
            { t: 'h3', h: 'transform : le couteau suisse du mouvement' },
            { t: 'code', lang: 'css', code:
'.carte:hover {\n  transform: translateY(-4px) scale(1.02);  /* décale puis agrandit */\n  box-shadow: 0 18px 40px rgba(0,0,0,.12);\n}\n.menu-flottant { transform-origin: top right; } /* pousse depuis un coin */\n\n.spinner { animation: tourne 1s linear infinite; }\n@keyframes tourne { to { transform: rotate(360deg); } }' },
            { t: 'p', h: '`transform` regroupe `translate`, `rotate`, `scale`, `skew` — déplacement, rotation, homothétie, inclinaison. Deux subtilités : l\'**ordre des fonctions compte** (`translateX(50px) rotate(45deg)` pivote ensuite l\'axe des déplacements — pas le même résultat que l\'inverse), et `transform-origin` fixe le point de pivot des rotations et scale (un menu qui « pousse » depuis son hamburger, une carte qui rebondit depuis son centre). Enfin, médite ceci : transform est purement **visuel** — un élément scalé ×10 ne pousse jamais ses voisins, car le layout n\'est pas recalculé. C\'est précisément ce qui le rend si fluide.' },
            { t: 'h3', h: 'La performance : pourquoi transform et opacity règnent' },
            { t: 'p', h: 'Sous le capot, le rendu suit trois grandes étapes : **Layout** (calcul des tailles/positions de toutes les boîtes), **Paint** (peinture des pixels), **Composite** (assemblage des calques par le GPU). Animer `width`, `top` ou `margin` repasse par le Layout à CHAQUE image — recalculs CPU en cascade, saccades garanties surtout sur téléphone modeste. Animer `transform` ou `opacity` ne touche ni layout ni peinture : c\'est de la pure composition, souvent sur un thread séparé à 60 images/seconde. D\'où la règle d\'or : n\'anime que `transform` et `opacity` (et `filter` avec parcimonie — le flou coûte cher en paint). Pour le dire autrement : joue l\'illusion du mouvement avec transform, jamais la géométrie réelle.' },
            { t: 'h3', h: '@keyframes : la chorégraphie complète' },
            { t: 'code', lang: 'css', code:
'.toast {\n  animation: apparition 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) both;\n}\n@keyframes apparition {\n  from { opacity: 0; transform: translateY(16px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n.pointille {\n  animation: pulse 2s ease-in-out 0.5s infinite alternate;\n  /* nom duree courbe retard répétitions direction */\n}\n@keyframes pulse {\n  50% { opacity: 0.4; }\n}\n\n/* Des étapes plus riches encore : */\n@keyframes rebond {\n  0%   { transform: scale(.3); opacity: 0; }\n  60%  { transform: scale(1.1); }\n  100% { transform: scale(1); opacity: 1; }\n}' },
            { t: 'p', h: 'Les options essentielles : `infinite` boucle sans fin, `alternate` fait l\'aller-retour (idéal pour les pulsations), le délai décale le départ (superbe en cascade : `animation-delay` croissant via `nth-child` fait apparaître une liste en escalier — la touche premium des listes d\'articles). Le mot-clé **`both`** (`animation-fill-mode`) mérite son explication : il applique l\'état `from` PENDANT le délai et conserve l\'état `to` APRÈS la fin — sans lui, l\'élément revient brutalement à son état initial une fois l\'animation terminée. Enfin, `animation-play-state: paused` met sur pause (pratique pour un carrousel au survol).' },
            { t: 'h3', h: 'Respecter prefers-reduced-motion' },
            { t: 'p', h: 'Certains utilisateurs souffrent de troubles vestibulaires : parallax et larges mouvements peuvent provoquer des nausées. La media query vue en Responsive offre le garde-fou standard — réduire toutes les animations à un quasi-néant quand l\'utilisateur l\'a demandé dans son OS. C\'est un marqueur de professionnalisme (et ce site l\'applique) :' },
            { t: 'code', lang: 'css', code:
'@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation: none !important;\n    transition-duration: 0.01ms !important;\n  }\n}' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Je mets transition sur :hover. »** — L\'aller sera doux, le retour INSTANTANÉ. La transition appartient à l\'état de base, le :hover ne fait que changer la valeur cible.',
              '**« transition: all est plus simple. »** — `all` anime TOUT, y compris les changements impromptus (police, contenu injecté, hauteur) avec des effets bizarres, et coûte plus cher. Nomme toujours 2-3 propriétés.',
              '**« Plus c\'est long, plus c\'est premium. »** — Au-delà de 300-400 ms une interface paraît lente ; le premium, c\'est rapide + bien courbé, pas lent.',
              '**« display: none → block s\'anime. »** — Changement discret : pas d\'interpolation possible. Fondu via opacity + visibility, ou les toutes récentes allow-discrete/@starting-style.',
              '**« Animer box-shadow est gratuit. »** — C\'est du repaint à chaque frame ; sur grandes surfaces ça rame. Alternative pro : une ombre pré-rendue sur un pseudo-élément dont on anime juste l\'opacity.',
              '**« transform: scale(2) déforme la page des voisins. »** — Jamais : transform est hors du flux — ni reflow, ni poussée. C\'est précisément pour ça qu\'il est fluide.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les déclencheurs sont les pseudo-classes de la fiche Sélecteurs (`:hover`, `:focus-visible`, `:checked` + frère pour le menu burger CSS-only). `transform` crée un **contexte d\'empilement** et piège les `fixed` — la fiche Position t\'avait prévenu, tu le récoltes ici. Les durées et courbes deviendront des tokens `--duree`/`--ease` à la fiche Variables (les mieux organisées vivent ainsi). Et `prefers-reduced-motion` renvoie directement au chapitre préférences de Responsive.' },
            { t: 'callout', kind: 'tip', h: 'Règle d\'expérience : une animation doit EXPLIQUER — d\'où vient cet élément, où est passé celui-là. Si elle ne raconte rien, réduis-la ou supprime-la. La sobriété rapide est la signature des interfaces premium.' }
          ],
          errors: [
            { title: 'transition: all en production', bad: '.card { transition: all 0.3s; }', good: '.card { transition: transform 0.25s ease-out,\n                box-shadow 0.25s ease-out; }', why: 'all anime TOUT, y compris des changements impromptus (polices, contenu), avec des effets bizarres et du gaspillage. Nomme les propriétés : plus rapide et prévisible.' },
            { title: 'Animer les propriétés de layout', bad: '.panier.ouvert {\n  width: 400px;   /* recalcule toute la page a chaque frame */\n  transition: width 0.3s;\n}', good: '.panier { transform: translateX(100%); transition: transform 0.3s ease-out; }\n.panier.ouvert { transform: translateX(0); }', why: 'width, top, margin… déclenchent un reflow à chaque image. transform passe par le compositeur GPU : la même illusion, en fluide.' }
          ],
          related: ['css-position', 'css-display', 'css-syntaxe-selecteurs']
        },

        {
          id: 'css-variables',
          title: 'Variables CSS & thèmes',
          icon: 'style',
          level: 'Intermédiaire',
          tagline: '--ma-variable, var(), :root : un seul endroit pour piloter couleurs, espacements et thèmes.',
          intro: 'Les variables CSS (custom properties) ont transformé l\'organisation des feuilles de style : au lieu de répéter `#0a84ff` quarante fois, on le définit une fois sous un nom — `--accent` — et on le référence partout. Changer de thème, créer un mode sombre, harmoniser les espacements devient trivial. Mais leur vraie magie n\'est pas le raccourci d\'écriture : c\'est qu\'elles **vivent dans le navigateur** et obéissent à la cascade — ce site que tu lis en est entièrement construit sur elles.',
          blocks: [
            { t: 'h3', h: 'Le problème : la même valeur écrite quarante fois' },
            { t: 'p', h: 'Ouvre n\'importe quel vieux projet : la couleur de marque est copiée dans trente-sept règles — et pas toujours la même, car entre `#0a84ff` et `#0b85ff` personne ne voit la différence. Le jour où la Boutique Awa passe du bleu au vert, tu cherches/remplaces en priant de ne pas rater un fichier ou d\'en casser un autre bleu sans rapport. La variable inverse le rapport de force : **une seule source de vérité, des références partout**. Modifier un thème devient éditer une poignée de lignes.' },
            { t: 'h3', h: 'Déclarer et consommer' },
            { t: 'code', lang: 'css', code:
':root {\n  --accent: #0a84ff;\n  --rayon: 16px;\n  --espace: 1rem;\n}\n\n.bouton {\n  background: var(--accent);\n  border-radius: var(--rayon);\n  padding: var(--espace) calc(var(--espace) * 1.5);\n}' },
            { t: 'p', h: 'On déclare avec `--nom: valeur;` — sensible à la casse, et libre : couleurs, longueurs, ombres, chaînes (`--icone: "→"`)… — et on consomme avec `var(--nom)` **dans une valeur de propriété** (jamais dans un sélecteur). `:root` n\'est que le sélecteur de l\'élément `<html>` avec la spécificité d\'une pseudo-classe — c\'est simplement la case la plus haute de la boîte, pour une portée globale. Petite précaution : le deuxième argument de `var()` est un **repli** utilisé si la variable n\'est pas définie : `color: var(--accent, blue)`.' },
            { t: 'h3', h: 'La mécanique qui change tout : héritage + résolution à l\'usage' },
            { t: 'p', h: 'Deux propriétés rendent les variables CSS radicalement différentes des variables Sass. 1) Elles **s\'héritent** comme `color` : déclarées sur `:root`, elles descendent dans tout l\'arbre — et tout sous-arbre peut les **redéfinir localement**. 2) Elles sont **résolues à l\'usage, par le navigateur, en direct** : les Sass de ton enfance étaient remplacées à la compilation puis figées ; ici, changer la variable (via une classe, une media query, du JS) recalcule toutes les propriétés qui la consomment. Résultat : un composant entier peut changer de costume selon son contexte :' },
            { t: 'code', lang: 'css', code:
'.carte {\n  --fond-carte: white;\n  --accent-carte: var(--accent);\n  background: var(--fond-carte);\n  border-top: 3px solid var(--accent-carte);\n}\n.promo {\n  --fond-carte: #fff4e0;   /* ne s\'applique qu\'aux .promo et descendants */\n  --accent-carte: #ff9f0a;\n}\n\n/* Les media queries redéfinissent aussi les variables : */\n@media (min-width: 1024px) {\n  :root { --espace: 1.5rem; }  /* tout le site respire plus, d\'un coup */\n}' },
            { t: 'p', h: 'Subtilité qui pique une fois dans sa vie : si la variable n\'est **pas définie**, le repli de `var()` s\'applique — mais si elle est définie avec une valeur **invalide pour la propriété** (`color: var(--mavaleur)` où `--mavaleur: 12px`), la déclaration devient « invalid at computed-value time » : la propriété retombe sur son comportement par défaut (héritage ou initial), PAS sur le repli. Explication qui sauvera une de tes soirées.' },
            { t: 'h3', h: 'Le mode sombre en quinze lignes' },
            { t: 'code', lang: 'css', code:
'html[data-theme="light"] {\n  --fond: #f2f2f7; --surface: #ffffff; --texte: #1c1c1e;\n}\nhtml[data-theme="dark"] {\n  --fond: #000000; --surface: #1c1c1e; --texte: #f5f5f7;\n}\n\nbody {\n  background: var(--fond);\n  color: var(--texte);\n  transition: background 0.3s, color 0.3s;  /* bascule en douceur */\n}' },
            { t: 'p', h: 'Tout l\'effort consiste à **ne jamais écrire de couleur en dur** dans les composants — uniquement des variables **sémantiques** (`--surface`, `--texte`) plutôt que descriptives (`--bleu-clair`). Le jour du thème sombre, il n\'y a littéralement rien d\'autre à faire que redéfinir la palette. Les deux finesses de pro : combiner `prefers-color-scheme` pour l\'automatisme avec `data-theme` pour le choix manuel (le choix l\'emporte), et ajouter `color-scheme: light dark` sur `:root` pour que les contrôles natifs (barres de scroll, inputs, dates) suivent le thème. C\'est précisément la mécanique du site que tu lis.' },
            { t: 'h3', h: 'Design tokens : au-delà des couleurs' },
            { t: 'code', lang: 'css', code:
':root {\n  /* Échelle d\'espacements : multiples d\'une base */\n  --space-1: .25rem; --space-2: .5rem; --space-3: 1rem; --space-4: 2rem;\n  /* Rayons */\n  --radius-s: 8px; --radius-m: 14px; --radius-l: 24px;\n  /* Couches d\'empilement ordonnées — fini la guerre des 9999 */\n  --z-dropdown: 100; --z-overlay: 500; --z-modal: 1000;\n  /* Mouvement cohérent */\n  --duree: .25s; --ease: cubic-bezier(.34, 1.2, .64, 1);\n}\n\n.toast {\n  z-index: var(--z-overlay);\n  border-radius: var(--radius-m);\n  padding: var(--space-3) var(--space-4);\n  animation: apparition var(--duree) var(--ease) both;\n}' },
            { t: 'p', h: 'Ces variables systémiques — les **design tokens** — sont le secret de la cohérence : tous les espacements sont multiples de la même base, les trois rayons se répètent partout, les z-index s\'ordonnent sur une échelle unique (souvenir de la fiche Position), les durées et courbes sont partagées (souvenir de la fiche Animations). Quand tout le site « se ressemble », ce n\'est jamais un hasard : c\'est une échelle de tokens respectée.' },
            { t: 'h3', h: 'Piloter depuis JavaScript' },
            { t: 'code', lang: 'js', code:
'// Lire\ngetComputedStyle(document.documentElement).getPropertyValue("--accent");\n\n// Modifier -> toutes les propriétés qui l\'utilisent se mettent à jour\ndocument.documentElement.style.setProperty("--accent", "#ff9500");\n\n// La bascule de thème complète (comme le bouton lune/soleil de ce site)\ndocument.documentElement.setAttribute("data-theme", "dark");\nlocalStorage.setItem("theme", "dark");' },
            { t: 'p', h: 'C\'est la porte ouverte aux interactions impossibles autrement : un nuancier de personnalisation en direct, une barre de progression pilotée par une variable `--avancement`, une carte qui se teinte selon la catégorie du produit. Et c\'est la preuve définitive que les variables CSS sont vivantes : aucun autre mécanisme de style n\'est modifiable à chaud avec une couverture aussi totale.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« var() a toujours mon repli si ça rate. »** — Le repli sert si la variable est NON DÉFINIE. Une variable définie mais invalide pour la propriété fait basculer la déclaration en « invalid at computed-value time » : retour à l\'héritage/défaut, jamais au repli.',
              '**« On peut écrire @media (min-width: var(--bp)). »** — Non : la condition de media query est évaluée sans élément, il n\'y a rien pour hériter la variable. La parade : redéfinir la variable DANS la media query, pas l\'inverse.',
              '**« --bleu-clair est un bon nom. »** — Le nom doit dire le RÔLE (`--accent`, `--surface`, `--texte-muet`) : au thème sombre, la valeur change, le nom reste vrai. Si `--bleu` devient jaune, ton CSS ment.',
              '**« Variables CSS = variables Sass. »** — Sass disparaît à la compilation (statique, substitutions textuelles) ; les custom properties vivent dans la page : cascade, héritage, modification JS à chaud.',
              '**« Il faut tout mettre sur :root. »** — Les composants gagnent à exposer leurs propres variables avec repli (`padding: var(--pad-carte, 1rem)`) : configurabilité locale gratuite, sans fork de classe.',
              '**« var() marche dans les sélecteurs et les noms de propriétés. »** — Uniquement dans les VALEURS. Ni `var(--sel) { }`, ni `var(--prop): red;`.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les variables sont l\'aboutissement de la fiche Cascade : elles **héritent**, obéissent à la spécificité (`:root` vs `html` vs sélecteur local) et se redéfinissent en couches. Elles s\'expriment en Unités (`calc(var(--espace) * 2)`), sont redéfinies par les media queries du Responsive (`prefers-color-scheme` inclus), ordonnent les empilements de la fiche Position (`--z-*`) et partagent les durées et courbes de la fiche Animations. Tu as maintenant tous les mécanismes du CSS moderne entre les mains.' },
            { t: 'callout', kind: 'tip', h: 'Structure type d\'un projet pro : `:root` = palette + échelle d\'espacements + rayons + z-index + durées/courbes. Un thème = redéfinir cette couche. Les composants ne connaissent QUE des noms sémantiques, jamais de valeurs en dur.' }
          ],
          errors: [
            { title: 'Nommer les variables d\'après leur valeur', bad: ':root { --bleu: #0a84ff; }\n/* ...puis en mode sombre : --bleu: #ffd60a; ?? */', good: ':root { --accent: #0a84ff; }\nhtml[data-theme="dark"] { --accent: #ffd60a; }', why: 'Si --bleu devient jaune, le nom ment. Nomme le RÔLE (--accent, --surface, --texte-secondaire), jamais la couleur : la valeur peut alors changer librement.' },
            { title: 'Mettre une variable dans une media query', bad: '@media (min-width: 640px) {\n  :root { --cols: 3; }  /* CA, ça marche */\n}\n@media (min-width: var(--bp)) { } /* CA, non */', good: '/* La variable est redéfinie DANS la media query,\n   jamais utilisée comme condition. */', why: 'Les conditions de media query sont évaluées hors de tout élément : pas d\'héritage, pas de variables. Piège classique des débutants qui ont découvert les custom properties.' }
          ],
          related: ['css-cascade-specificite', 'css-unites-couleurs', 'css-responsive']
        }
      ]
    }
  ]
};
