/* ============================================================
   data-js.js — Contenu pédagogique JavaScript (approfondi)
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.js = {
  id: 'js',
  name: 'JavaScript',
  icon: 'javascript',
  tagline: 'Le cerveau de la page : variables, fonctions, DOM, événements, asynchrone et API.',
  heroTitle: 'JavaScript, le langage qui fait vivre tes pages',

  categories: [
    {
      id: 'fondamentaux',
      name: 'Les fondamentaux',
      icon: 'abc',
      fiches: [
        {
          id: 'js-variables',
          title: 'Variables : let, const, var',
          icon: 'data_object',
          level: 'Débutant',
          tagline: 'Stocker et nommer des valeurs — pourquoi const est ton choix par défaut.',
          intro: 'Une variable est une **étiquette collée sur une valeur** : tu ranges quelque chose une fois (un nombre, un texte, un objet), et tu le retrouves par son nom partout dans ton programme. C\'est la toute première brique de tout code — et pourtant, JavaScript offre TROIS mots pour la poser : `const`, `let` et `var`. Le premier réflexe professionnel consiste à saisir le bon sans hésiter. Spoiler : tu écriras `const` dans 90 % des cas, et `var` dans aucun.',
          blocks: [
            { t: 'h3', h: 'Le problème que les variables résolvent' },
            { t: 'p', h: 'Imagine gérer la tontine du quartier sans variables : le taux de commission (5 %) serait récrit en dur dans chaque calcul, sur chaque ligne. Le jour où la règle passe à 6 %, tu relis tout le programme en espérant n\'en oublier aucune occurrence — et les « 5 » qui voulaient dire autre chose (5 membres ?) se mélangent aux vrais taux. Avec `const TAUX = 0.05`, la valeur vit à UN endroit : la modifier revient à éditer une seule ligne, et le NOM explique l\'intention partout où il apparaît. Nommer les valeurs, c\'est déjà programmer.' },
            { t: 'h3', h: 'const, puis let… et var au musée' },
            { t: 'syntax', title: 'Déclarer, décortiqué à la déclaration près', lang: 'js', code:
'const boutique = "Awa";\nlet stock = 10;\nstock = 8;', legend: [
              ['const boutique = "Awa"', 'const : la valeur ne sera JAMAIS réassignée — c\'est le choix par défaut, qui sécurise la lecture du code'],
              ['let stock = 10;', 'let : la variable POURRA changer — tu signales explicitement cette possibilité en choisissant let'],
              ['stock = 8;', 'la RÉASSIGNATION : pas de let cette fois, la boîte existe déjà — on écrase juste son contenu'],
              ['var (au musée)', 'l\'ancêtre : portée étrange et hoisting piégeux. Tu le croiseras dans les vieux tutoriels — ne l\'écris plus']
            ]},
            { t: 'code', lang: 'js', code:
'const prenom = "Awa";     // ne peut PAS être réassignée\nlet score = 0;            // peut être réassignée plus tard\nvar ancien = 42;          // héritage du vieux JS : à éviter\n\nscore = score + 10;       // OK : let autorise la modification\nprenom = "Fatou";         // ERREUR TypeError : Assignment to constant variable' },
            { t: 'p', h: 'La règle de décision tient en une phrase : **`const` par défaut, `let` seulement quand la valeur doit changer réellement** (compteur, saisie, état qui évolue), `var` jamais. Pourquoi ce militantisme pour const ? Parce qu\'il rend ton intention explicite — « cette valeur ne bougera pas » — et transforme une famille entière de bugs (la réassignation accidentelle) en erreurs immédiates et visibles, au lieu de mystères silencieux.' },
            { t: 'h3', h: 'La subtilité de const avec objets et tableaux' },
            { t: 'code', lang: 'js', code:
'const panier = ["riz", "gombo"];\npanier.push("huile");   // OK : on modifie le CONTENU\npanier[0] = "attiéké";  // OK aussi\npanier = [];            // ERREUR : on change la RÉFÉRENCE' },
            { t: 'p', h: 'Ici, il faut bien comprendre ce que `const` verrouille : **le lien entre le nom et la valeur, pas le contenu de la valeur**. Un tableau ou un objet déclaré `const` reste modifiable de l\'intérieur (push, ajout de clé…) — et c\'est exactement ce qu\'on veut la plupart du temps. Ce qui est interdit, c\'est de réassigner le nom vers une TOUTE AUTRE valeur. Mémorise la formule : const protège la flèche, pas la cible.' },
            { t: 'h3', h: 'Sous le capot : une étiquette collée sur une valeur' },
            { t: 'p', h: 'Pour vraiment maîtriser ce qui suit, retiens l\'image mentale exacte : la variable n\'est pas une boîte contenant la valeur, c\'est une **flèche qui pointe vers elle**. Pour les valeurs simples (nombre, texte, booléen — les « primitives »), copier la variable copie la valeur : `let b = a` donne à b son propre exemplaire. Pour les objets et tableaux, copier la variable ne copie QUE la flèche : deux noms peuvent alors pointer vers LE MÊME objet, et modifier l\'un change l\'autre. C\'est la notion de référence — le piège préféré des débutants, qu\'on démontera dans la fiche Objets.' },
            { t: 'h3', h: 'Portée : où une variable existe' },
            { t: 'syntax', title: 'La portée de bloc, décortiquée', lang: 'js', code:
'{\n  const promo = 15;\n}\nconsole.log(promo);   // ReferenceError', legend: [
              ['{ … }', 'la PORTÉE de bloc : const et let n\'existent qu\'ENTRE les accolades où elles sont nées'],
              ['const promo', 'une variable de COURSE : créée dans le bloc, détruite à la sortie — rien ne fuit, le dehors reste propre'],
              ['ReferenceError', 'hors du bloc, promo n\'a JAMAIS existé : l\'erreur dit simplement « hors de portée » — et c\'est une protection, pas une punition'],
              ['le réflexe', 'déclare la variable le plus PRÈS possible de son usage, dans le bloc le plus petit possible']
            ]},
            { t: 'code', lang: 'js', code:
'const taux = 0.18;              // globale : visible partout dans le fichier\n\nfunction calculer(prix) {\n  const tva = prix * taux;      // locale au bloc { } de la fonction\n  if (prix > 1000) {\n    let remise = prix * 0.05;   // n\'existe QUE dans ce if\n  }\n  return prix + tva;\n  // ici, remise est déjà introuvable\n}\n\nconsole.log(tva);     // ERREUR ReferenceError : tva n\'existe pas ici' },
            { t: 'p', h: '`let` et `const` sont **scoped au bloc** `{ }` où ils sont déclarés : une variable créée dans un `if`, une boucle ou une fonction cesse d\'exister dès la sortie du bloc. Loin d\'être une contrainte, c\'est une protection : moins il y a de noms visibles à un endroit, moins il peut s\'y produire de collisions et d\'effets de bord. Règle de conduite : déclare chaque variable au plus PRÈS de son usage, jamais « au cas où » tout en haut du fichier.' },
            { t: 'h3', h: 'Hoisting et zone morte temporelle : pourquoi var est un piège' },
            { t: 'code', lang: 'js', code:
'console.log(a);   // undefined : var est « remontée » avec une valeur fantôme\nvar a = 5;\n\nconsole.log(b);   // ReferenceError : let existe... mais pas encore (TDZ)\nlet b = 5;' },
            { t: 'p', h: 'Sous le capot, JavaScript « remonte » (hoist) les déclarations en haut de leur portée avant d\'exécuter. Avec `var`, la variable est remontée **avec la valeur `undefined`** : le lire avant sa ligne ne plante pas, et ton bug devient un `undefined` qui voyage dans les calculs. Avec `let`/`const`, la variable existe bien techniquement, mais reste dans une **zone morte temporelle** (TDZ) jusqu\'à sa ligne : y toucher avant lève une erreur claire. Beaucoup de débutants voient ça comme de la sévérité ; en réalité, c\'est le langage qui refuse de te laisser utiliser une valeur qui n\'existe pas encore — une erreur immédiate vaut mille undefined silencieux.' },
            { t: 'h3', h: 'Bien nommer : une compétence à part entière' },
            { t: 'ul', items: [
              '`camelCase` est la convention : `nombreDeTentatives`, `estConnecte`. Pas d\'accents ni d\'espaces dans les noms.',
              'Un booléen se lit comme une question : `estVide`, `aPaye`, `peutVoter` — la condition s\'écrit alors toute seule.',
              'Une fonction se nomme par un verbe : `calculerTotal()`, `envoyerFormulaire()`.',
              'Les constantes « magiques » du programme en `MAJUSCULES_SNAKE` : `const TVA_TAUX = 0.18`, `const LIMITE_ESSAIS = 3`.',
              'Évite les noms muets (`data`, `tmp`, `x`) : on relit un code dix fois plus souvent qu\'on ne l\'écrit — et le lecteur de dans trois semaines, c\'est toi.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« const signifie que la valeur est figée. »** — Non : c\'est la FLÈCHE qui est figée. Le contenu d\'un objet ou tableau const reste librement modifiable — et c\'est très bien ainsi.',
              '**« let est plus sérieux que const pour un compteur. »** — La hiérarchie est inverse : const est le DEFAUT professionnel ; let est l\'exception justifiée par une vraie réassignation.',
              '**« La variable contient la valeur. »** — Elle pointe vers la valeur. Deux variables peuvent pointer vers le même objet — d\'où les mystères de « qui a modifié ma donnée ? » (fiche Objets).',
              '**« var est juste un let à l\'ancienne, interchangeable. »** — Sa portée fonction (il ignore les blocs if/for) et son hoisting à undefined en font une machine à bugs particulière ; aucun code moderne ne l\'utilise.',
              '**« Déclarer tout en haut, c\'est ordonné. »** — C\'est l\'inverse : loin de son usage, une variable devient illisible et réutilisable à mauvais escient. Déclaration au plus près, toujours.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est le socle du module : les prochaines s\'appuient toutes dessus. Les TYPES définissent ce que tes flèches peuvent pointer (fiche suivante, avec le fameux piège `\"5\" + 3`). La portée des blocs prendra tout son sens avec les CONDITIONS et les BOUCLES. Et la notion de référence survole les fiches OBJETS et TABLEAUX — tu comprendras alors pourquoi `const` reste compatible avec `push`.' },
            { t: 'callout', kind: 'warn', h: '`var` souffre de deux bizarreries (portée fonction, hoisting avec valeur `undefined`) qui ont coûté des générations de bugs. Tu le croiseras dans d\'anciens tutoriels ; en code moderne, on n\'en écrit pas une ligne.' }
          ],
          errors: [
            { title: 'Déclarer sans mot-clé', bad: 'nom = "Awa";  // variable globale accidentelle !', good: 'const nom = "Awa";', why: 'Oublier const/let crée une variable globale silencieuse (et plante en mode strict), visible depuis partout et source de collisions imprévisibles.' },
            { title: 'Passer à let « parce que push »', bad: 'let users = [];\n// ... uniquement parce qu\'on fait users.push() ?', good: 'const users = [];\nusers.push(nouvelUser); // push ne réassigne pas', why: 'Modifier le contenu d\'un objet/tableau n\'est pas une réassignation : const protège la référence, tu gardes la flexibilité ET la clarté d\'intention.' },
            { title: 'Lire une variable avant sa ligne', bad: 'console.log(prix);\nlet prix = 100;   // ReferenceError (TDZ)', good: 'let prix = 100;\nconsole.log(prix);', why: 'let/const existent dans une zone morte temporelle jusqu\'à leur déclaration : y accéder avant lève une erreur — ce qui est une protection, pas une punition.' }
          ],
          related: ['js-types-operateurs', 'js-fonctions', 'js-objets']
        },

        {
          id: 'js-types-operateurs',
          title: 'Types de données & opérateurs',
          icon: 'calculate',
          level: 'Débutant',
          tagline: 'string, number, boolean, null, undefined, et le fameux trio == / === / typeof.',
          intro: 'Chaque valeur en JavaScript a un **type**, et une bonne partie des bugs naissent d\'une valeur qui n\'est pas du type qu\'on croyait — un `\"12\"` (texte) au lieu d\'un `12` (nombre) suffit à transformer une addition en collage de texte. Cette fiche dresse la carte des types, apprivoise les opérateurs, puis démonte le piège national : `==` contre `===`.',
          blocks: [
            { t: 'h3', h: 'Pourquoi parler de types ?' },
            { t: 'p', h: 'Pour un humain, « 12 » et 12, c\'est pareil. Pour la machine, l\'un est une SUITE DE CARACTÈRES (comme « abc »), l\'autre une QUANTITÉ avec laquelle calculer — et l\'opérateur `+` agit différemment selon le cas (il colle les textes, il additionne les nombres). Une précision qui déroute au début : JavaScript est un langage à **typage dynamique** — le type vit dans la VALEUR, pas dans la variable. La même variable peut pointer successivement vers un nombre puis vers un texte ; c\'est flexible, et c\'est exactement pourquoi les surprises arrivent aux frontières (saisies utilisateur, données réseau).' },
            { t: 'h3', h: 'Les types à connaître' },
            { t: 'table', head: ['Type', 'Exemple', 'À quoi il sert'], rows: [
              ['`string`', '`"Bonjour"`, `\'Bénin\'`', 'Texte, entre guillemets'],
              ['`number`', '`42`, `3.14`, `-7`', 'Tous les nombres (un seul type, entiers compris)'],
              ['`boolean`', '`true`, `false`', 'Vrai/faux, la base des conditions'],
              ['`undefined`', 'variable déclarée sans valeur', '« Pas encore défini » — attribué par JS'],
              ['`null`', '`let photo = null`', '« Vide intentionnellement » — attribué par TOI'],
              ['`object`', '`{ nom: "Awa" }`, tableaux inclus', 'Collections et structures'],
              ['`bigint` / `symbol`', 'cas particuliers', 'Très grands entiers / identifiants uniques']
            ]},
            { t: 'p', h: 'L\'inspecteur officiel s\'appelle `typeof` : `typeof "texte"` → `"string"`, `typeof 42` → `"number"`. Retiens son gag historique : `typeof null` vaut `"object"` — un bug de la première version de JavaScript (1995), devenu immortel pour ne pas casser le web existant. Et `typeof NaN` vaut `"number"` : « Not a Number »… est un nombre. Personne n\'a dit que ce langage était toujours cohérent.' },
            { t: 'h3', h: 'Les opérateurs du quotidien' },
            { t: 'code', lang: 'js', code:
'// Arithmétiques\n10 + 5      // 15\n10 % 3      // 1  : reste de la division (pair/impair, cycles)\n2 ** 3      // 8  : puissance\ncompteur++  // incrémente (version courte de compteur = compteur + 1)\n\n// Concaténation de texte\n"Bonjour " + "Awa"        // "Bonjour Awa"\n\n// Comparaison -> produisent un boolean\nage >= 18\n\n// Logique\nestMajeur && aPaye    // ET : les deux\nestAdmin || estModo   // OU : au moins un\n!estConnecte          // NON : inverse' },
            { t: 'h3', h: 'La leçon n°1 : === plutôt que ==' },
            { t: 'syntax', title: '=== ou == : la règle absolue', lang: 'js', code:
'5 === "5"    // false : types différents\n5 == "5"     // true : conversion forcée — piège !', legend: [
              ['===', 'l\'égalité STRICTE : compare le TYPE ET la valeur. C\'est la seule qu\'on écrit au quotidien'],
              ['==', 'l\'égalité LÂCHE : elle CONVERTIT en cachette ("5" devient 5) avant de comparer — une source de bugs insoupçonnables'],
              ['false ici, true là', '"5" n\'EST PAS 5 : l\'un est du texte, l\'autre un nombre — la stricte le dit honnêtement'],
              ['le réflexe', 'toujours === et !== ; si une conversion est nécessaire, fais-la toi-même au grand jour : Number("5") === 5']
            ]},
            { t: 'code', lang: 'js', code:
'"5" == 5     // true  : == CONVERTIT les types avant de comparer\n"5" === 5    // false : === compare type ET valeur, sans conversion\n\n0 == ""              // true (!)\nnull == undefined    // true (le seul cas où == est toléré)\n[] == false          // true (!)\n\n// Réflexe pro : TOUJOURS === et !==' },
            { t: 'p', h: '`==` applique des règles de conversion parfois contre-intuitives (« une chaîne vide vaut zéro », les tableaux passent par du texte…). Même les développeurs expérimentés ne les récitent pas de tête — et c\'est précisément le problème : un code qu\'on ne peut pas prédire est un code à bugs. `===` est franc : même type + même valeur, sinon faux. En adoptant `===` partout, toute une catégorie de bugs disparaît de ta vie.' },
            { t: 'h3', h: 'La conversion de types (« coercion ») et les valeurs falsy' },
            { t: 'code', lang: 'js', code:
'"12" + 3          // "123" : + avec du texte -> concaténation\nNumber("12") + 3   // 15    : conversion EXPLICITE, lisible\nString(2500)       // "2500"\n\n// Les 6 valeurs "falsy" (qui valent faux dans une condition) :\n// false, 0, "", null, undefined, NaN\n// TOUT le reste est "truthy" — même "0", même [] !\n\nif ("") { }        // ne s\'exécute pas\nif ("0") { }       // s\'exécute ! "0" est une chaîne non vide' },
            { t: 'p', h: 'La liste des falsy est à connaître par cœur car elle rend les conditions expressives (`if (nom) { }` = « si un nom a été saisi ») — MAIS elle mord sur deux valeurs légitimes : `0` et `""`. Un stock à 0, un champ vidé volontairement : tous deux « faux » pour un simple `if`. La parade arrive deux sections plus bas avec `??`.' },
            { t: 'h3', h: 'Les nombres : la précision flottante dont personne ne parle' },
            { t: 'code', lang: 'js', code:
'0.1 + 0.2                 // 0.30000000000000004  (!)\n(0.1 + 0.2).toFixed(2)    // "0.30" (chaîne : arrondi pour l\'affichage)\nMath.round(4.6)           // 5\nparseInt("42px")          // 42  : lit le premier entier trouvé\nNumber("42px")            // NaN : conversion stricte\nNumber.isNaN(NaN)         // true (NaN !== NaN, il se teste ainsi)' },
            { t: 'p', h: 'Pourquoi `0.1 + 0.2` ne fait-il pas exactement `0.3` ? Sous le capot, les nombres sont stockés en **binaire flottant** (norme IEEE 754) — et 0,1 comme 0,2 n\'ont pas d\'écriture finie en binaire, exactement comme 1/3 n\'en a pas en décimal. Les erreurs de la 17e décimale sont donc inévitables… et sans conséquence pour l\'affichage (tu arrondis). Pour de la comptabilité stricte — les frais d\'une.transaction MoMo, par exemple — on compte en entiers (les centimes) ou on arrondit méthodiquement ; mais pour 99 % des cas, `toFixed` pour l\'affichage suffit.' },
            { t: 'h3', h: 'Les opérateurs modernes à connaître' },
            { t: 'syntax', title: '?? et ?. : protéger contre le vide, décortiqué', lang: 'js', code:
'const surnom = client.surnom ?? "pas de surnom";\nconst ville = client.adresse?.ville;', legend: [
              ['??', 'coalescence : prend la valeur de droite SEULEMENT si gauche vaut null ou undefined — 0, "" et false sont conservés (à la différence de ||)'],
              ['?.', 'chaînage OPTIONNEL : si adresse n\'existe pas, tout s\'arrête proprement à undefined au lieu d\'exploser en TypeError'],
              ['la combo', 'adresse?.ville ?? "inconnue" : « descends prudemment, prévois un défaut » — deux lignes de sécurité en une'],
              ['quand ?', 'à chaque donnée venant de l\'extérieur (API, formulaire, localStorage) : là où tu ne contrôles pas ce qui arrive']
            ]},
            { t: 'code', lang: 'js', code:
'user?.adresse?.ville    // ?. : enchaîne sans planter si un maillon est null/undefined\nstock ?? 0              // ?? : valeur de repli SEULEMENT si null/undefined\nstock || 0              // || : repli si falsy (avale aussi 0 et "" — attention !)\n\ncompteur ||= 10         // assigne seulement si falsy\ncompteur ??= 10         // assigne seulement si null/undefined' },
            { t: 'p', h: 'La différence `||` / `??` est LE détail qui sauve des bugs silencieux : `||` replie sur toutes les valeurs falsy (dont `0` et `""`, souvent légitimes), `??` ne replie que sur `null` et `undefined`. Pour des défauts numériques ou textuels, `??` est presque toujours le choix correct — et le chaînage `?.` est le gardien des données profondes (fiche Objets).' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« La variable a un type. »** — C\'est la VALEUR qui en a un : une variable peut pointer vers un nombre puis un texte. D\'où l\'importance de vérifier aux frontières (saisies, réseau).',
              '**« null et undefined sont interchangeables. »** — Ils se ressemblent (`==` les confond), mais la convention est claire : undefined = « pas défini, je n\'y suis pour rien », null = « volontairement vide ».',
              '**« + additionne toujours. »** — Dès qu\'un texte est dans l\'équation, tout devient concaténation. Et `-`/`×`/`÷` font l\'inverse : ils forcent les chaînes en nombres (`"10" - 2` donne 8).',
              '**« if (valeur) teste si la valeur existe. »** — Il teste si elle est « truthy » : 0, "" et false passent à la trappe alors qu\'elles peuvent être parfaitement valides.',
              '**« Number("42px") marche comme parseInt. »** — Non : Number exige une chaîne entièrement numérique (sinon NaN) ; parseInt lit le début et s\'arrête au premier caractère non chiffre.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu viens de donner un contenu aux étiquettes de la fiche Variables. La suite immédiate est la fiche CONDITIONS : tout ce que tu viens de voir — booléens, comparaisons, falsy, opérateurs logiques — est exactement le vocabulaire dont `if` se nourrit. Et la subtilité `?.`/`??` refera surface à plein régime dans la fiche OBJETS.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe frontalier : convertis EXPLICITEMENT dès l\'entrée des données (`Number(input.value)`, `String(total)`, `JSON.parse` côté réseau), et ton programme ne manipulera plus que des types propres.' }
          ],
          errors: [
            { title: 'Additionner des nombres venant d\'un formulaire', bad: 'const prix = input.value; // "25" (string !)\nconst total = prix + 10;    // "2510"', good: 'const prix = Number(input.value);\nconst total = prix + 10;    // 35', why: 'input.value renvoie TOUJOURS une chaîne. Le + devient de la concaténation. Convertis d\'abord avec Number() ou parseFloat().' },
            { title: 'if (valeur) pour tester un nombre qui peut être 0', bad: 'const quantite = 0;\nif (quantite) { afficher(); } // 0 est falsy -> jamais affiché', good: 'if (quantite !== undefined && quantite !== null) { }\n// ou le plus souvent : const qte = saisie ?? 0;', why: 'Falsy n\'est pas « absent ». 0, "" et false sont des valeurs légitimes qu\'un simple if avale. Teste précisément ce que tu veux exclure.' }
          ],
          related: ['js-variables', 'js-conditions', 'js-objets']
        },

        {
          id: 'js-conditions',
          title: 'Conditions : if, else, switch',
          icon: 'alt_route',
          level: 'Débutant',
          tagline: 'Faire décider ton programme — et l\'opérateur ternaire bien utilisé.',
          intro: 'Jusqu\'ici, ton code exécutait chaque ligne, une fois, dans l\'ordre. Un vrai programme **réagit** : si le client n\'a pas payé, on bloque la commande ; si le stock est vide, on affiche « épuisé » ; selon le rôle, on montre un écran différent. Les structures de décision sont peu nombreuses — `if`/`else`, le ternaire, `switch` — et toute la compétence consiste à choisir la bonne et à garder le chemin lisible.',
          blocks: [
            { t: 'h3', h: 'Le problème : un programme sans décision est un script, pas une application' },
            { t: 'p', h: 'Imagine l\'application de la Boutique Awa sans conditions : le bouton « Commander » fonctionnerait même avec un panier vide, les prix barrés s\'afficheraient sans promo, l\'espace vendeur s\'ouvrirait aux visiteurs. Chaque règle métier est une bifurcation : « SI telle chose, ALORS ça, SINON autre chose ». La condition est le mécanisme qui traduit ces règles en code — et les opérateurs logiques de la fiche précédente (`&&`, `||`, comparaisons, valeurs falsy) sont exactement le vocabulaire qui les alimente.' },
            { t: 'h3', h: 'if / else if / else : la bifurcation de base' },
            { t: 'syntax', title: 'if / else if / else, décortiqué', lang: 'js', code:
'if (stock >= demande) {\n  vendre(demande);\n} else if (stock > 0) {\n  proposerPartiel();\n} else {\n  afficherRupture();\n}', legend: [
              ['if (condition) {…}', 'le TEST : le bloc ne s\'exécute que si la condition vaut true — parenthèses autour du test, accolades autour du bloc'],
              ['else if', 'la branche suivante, évaluée SEULEMENT si toutes les précédentes sont fausses — le SINON SI du pseudo-code, à l\'identique'],
              ['else', 'le filet final : attrape tout ce qui reste, sans poser de condition'],
              ['la vérité JS', 'la condition est convertie en booléen : 0, "", null, undefined, NaN deviennent false (les « falsy »), tout le reste true']
            ]},
            { t: 'code', lang: 'js', code:
'const heure = new Date().getHours();\n\nif (heure < 12) {\n  console.log("Bonjour !");\n} else if (heure < 18) {\n  console.log("Bon après-midi !");\n} else {\n  console.log("Bonsoir !");\n}' },
            { t: 'p', h: 'Point de mécanique capital : les conditions sont testées **de haut en bas, et la première vraie l\'emporte** — les suivantes ne sont même pas évaluées. L\'ordre compte donc : place les cas les plus restrictifs en premier. `if (note >= 10)` posé avant `if (note >= 16)` avalerait les « mention très bien », qui n\'arriveraient jamais jusqu\'à leur branche.' },
            { t: 'p', h: 'Autre mécanique cachée utile à connaître : les opérateurs `&&` et `||` sont paresseux (court-circuit). Dans `estConnecte && chargerProfil()`, la fonction n\'est appelée QUE si le premier test est vrai ; dans `nom || "Invité"`, le repli n\'est évalué qu\'en cas de falsy. C\'est ce comportement qui rend l\'écriture `??`/`||` possible — et qui évite de déclencher des traitements inutiles (ou dangereux) quand la condition préalable échoue.' },
            { t: 'h3', h: 'Le ternaire : l\'if qui rend une valeur' },
            { t: 'syntax', title: 'Le ternaire, décortiqué', lang: 'js', code:
'const badge = stock > 0 ? "Disponible" : "Épuisé";', legend: [
              ['stock > 0 ?', 'le TEST, exactement comme dans un if'],
              ['"Disponible"', 'la valeur si VRAI — le premier choix'],
              [': "Épuisé"', 'les deux-points puis la valeur si FAUX — les DEUX branches sont obligatoires ici, contrairement au if'],
              ['une valeur, rien d\'autre', 'le ternaire PRODUIT une valeur à ranger ou à afficher : parfait pour un libellé ou un prix, pas pour de gros traitements']
            ]},
            { t: 'code', lang: 'js', code:
'const badge = estConnecte ? "Tableau de bord" : "Se connecter";\n\n// condition ? valeurSiVrai : valeurSiFaux\n\nconst classeStock = produit.stock > 0 ? "dispo" : "epuise";\nconst texte = quantite > 1 ? quantite + " articles" : "1 article";' },
            { t: 'p', h: 'Le ternaire brille pour **choisir une valeur** — un texte, une classe CSS, un nombre — au point d\'usage. Ses limites sont tout aussi claires : dès que la logique fait plus d\'un étage (ternaires imbriqués) ou exécute plusieurs actions, reviens à un bon vieux `if`. La règle d\'or d\'un code lisible : le ternaire doit tenir en une ligne évidente ; tout ce qui demande de « réfléchir » mérite un if.' },
            { t: 'h3', h: 'switch : la cascade d\'égalités' },
            { t: 'syntax', title: 'switch : un cas, un break', lang: 'js', code:
'switch (jour) {\n  case "samedi":\n    ouvrir(8, 18);\n    break;\n  default:\n    ouvrir(9, 17);\n}', legend: [
              ['switch (jour)', 'on examine UNE valeur contre une liste de cas — plus lisible que six else if à la queue'],
              ['case "samedi":', 'le cas d\'égalité STRICTE avec la valeur examinée, suivi de deux-points'],
              ['break;', 'OBLIGATOIRE à la fin de chaque cas : sans lui, l\'exécution TOMBE dans le cas suivant — le bug le plus classique du switch'],
              ['default:', 'le cas fourre-tout si rien n\'a correspondu — le else du switch']
            ]},
            { t: 'code', lang: 'js', code:
'switch (jour) {\n  case "lundi":\n    console.log("Courage, la semaine commence !");\n    break;                 // sans break, on TOMBE dans le cas suivant\n  case "vendredi":\n    console.log("Bientôt le week-end.");\n    break;\n  case "samedi":\n  case "dimanche":        // plusieurs cas -> le même traitement\n    console.log("Repos bien mérité.");\n    break;\n  default:                // tous les autres cas\n    console.log("Bonne journée !");\n}' },
            { t: 'p', h: 'Deux subtilités à mémoriser. 1) Le `break` : sans lui, l\'exécution **traverse** vers le cas suivant (fallthrough) — parfois voulu (les deux cas du week-end ci-dessus), le plus souvent un bug muet. 2) La comparaison est **stricte** : `switch` utilise `===`, pas de conversion de types. `case "5"` ne captera jamais le nombre `5`.' },
            { t: 'h3', h: 'L\'alternative moderne au switch : le dictionnaire d\'options' },
            { t: 'code', lang: 'js', code:
'const tarifsLivraison = {\n  cotonou: 500,\n  calavi: 700,\n  porto: 1000\n};\n\nconst prix = tarifsLivraison[ville] ?? 1500;\n// lisible, testable, et les données vivent hors de la logique' },
            { t: 'p', h: 'Quand un `switch` ne fait qu\'**associer une valeur à une clé**, un objet littéral fait mieux : on lit `tarifs[ville]`, on ajoute une entrée sans toucher à la logique, et `??` gère le cas par défaut. Garde le `switch` pour les cas où chaque branche exécute des ACTIONS différentes ; pour de la simple correspondance clé -> valeur, le dictionnaire est plus court, plus sûr et plus facile à faire évoluer.' },
            { t: 'h3', h: 'Le retour anticipé (early return) : la technique qui nettoie tout' },
            { t: 'code', lang: 'js', code:
'function prixLivraison(poids) {\n  if (poids <= 0) return "Poids invalide";   // garde-fou d\'abord\n  if (poids <= 1) return 500;\n  if (poids <= 5) return 1200;\n  return 2500;                                // chemin principal, à plat\n}\n// Plus de else inutiles, plus de pyramide d\'accolades.' },
            { t: 'p', h: 'L\'idée est renversante à la première lecture : au lieu d\'emboîter les cas particuliers, on les **évacue immédiatement** avec un `return`, et le chemin principal reste au niveau d\'indentation minimal. Chaque garde-fou se lit comme un contrôle d\'embarquement : on vérifie, on renvoie, on n\'en parle plus. C\'est le réflexe qui fait passer un code d\'amateur à un code de pro — et il se marie parfaitement avec la validation des paramètres en début de fonction.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« = et === dans un if, c\'est presque pareil. »** — Un seul `=` ASSIGNE la valeur plutôt que comparer, et la condition devient la valeur assignée (souvent truthy) : toujours vrai, aucun message d\'erreur. Bug vicieux par excellence.',
              '**« Il faut écrire if (estAdmin === true). »** — `estAdmin` est DÉJÀ un booléen : la comparaison est redondante. Et pour la négation : `if (!estAdmin)`.',
              '**« Un if a toujours besoin d\'un else. »** — Non ; et avec l\'early return dans une fonction, le else disparaît même très souvent, au profit d\'un code à plat.',
              '**« switch compare « à peu près » comme ==. »** — Il compare en strict (`===`) : attention aux types, `"5"` et `5` sont deux branches différentes.',
              '**« Les ternaires imbriqués font « pro ». »** — Ils font surtout illisible. Un ternaire = une ligne simple ; au-delà, if/else, c\'est aussi ça le professionnalisme.',
              '**« && et || évaluent toujours les deux côtés. »** — Non : court-circuit paresseux. `a && b()` n\'appelle `b` que si `a` est truthy ; c\'est une arme, pas un détail.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche consomme directement la précédente : les valeurs falsy (pourquoi `if (nom)` suffit à tester une saisie), le `===` (que switch applique aussi), le `??` (pour le cas par défaut du dictionnaire). La portée de bloc vue aux Variables se concrétise ici : chaque `if { }` a son propre monde de variables. Prochaine étape : répéter ces décisions en série, sans copier-coller — les BOUCLES.' },
            { t: 'callout', kind: 'tip', h: '« Sortir tôt » les cas particuliers laisse le chemin principal à plat, au niveau d\'indentation minimal. C\'est LE réflexe qui passe un code d\'amateur à lisible — et il s\'apprend en une journée.' }
          ],
          errors: [
            { title: '= au lieu de === dans le if', bad: 'if (statut = "actif") { }  // assigne "actif", donc toujours vrai !', good: 'if (statut === "actif") { }', why: 'Un seul = ASSIGNE la valeur au lieu de comparer, et la condition devient la valeur assignée (truthy). Bug vicieux car aucune erreur n\'est levée.' },
            { title: 'La pyramide des else if illisible', bad: 'if (role === "admin") { ... }\nelse {\n  if (role === "modo") { ... }\n  else {\n    if (role === "user") { ... }\n  }\n}', good: 'if (role === "admin") { ... }\nelse if (role === "modo") { ... }\nelse if (role === "user") { ... }', why: 'Chaque niveau d\'imbrication ajoute une charge mentale. else if à plat exprime exactement la même logique sans escalier — ou l\'early return si tu es dans une fonction.' }
          ],
          related: ['js-types-operateurs', 'js-boucles', 'js-erreurs']
        },

        {
          id: 'js-boucles',
          title: 'Boucles : for, while, for…of',
          icon: 'loop',
          level: 'Débutant',
          tagline: 'Répéter sans se répéter — et savoir s\'arrêter (break, continue).',
          intro: 'La boucle est le premier vrai super-pouvoir de la programmation : écrire une instruction UNE fois et la faire exécuter cent, mille fois — pour imprimer la facture de chaque membre de la tontine, parcourir le catalogue, chercher un produit. JavaScript propose quatre boucles ; savoir laquelle sortir du tiroir évite à la fois le code bancal et les boucles infinies du dimanche soir.',
          blocks: [
            { t: 'h3', h: 'Le problème : répéter sans copier-coller' },
            { t: 'p', h: 'La tontine compte 30 membres. Sans boucle, tu écrirais 30 fois `console.log("Cotisation de " + nom)` avec 30 noms différents — puis tu modifierais le message 30 fois le jour où il change. La boucle sépare **l\'action** (écrite une fois) de la **répétition** (décidée par les données) : ajoute un 31e membre, le programme suit tout seul. C\'est le même principe que les variables — nommer une fois, réutiliser partout — appliqué aux ACTIONS.' },
            { t: 'h3', h: 'for : quand on connaît le nombre de tours' },
            { t: 'syntax', title: 'for : les trois morceaux, décortiqués', lang: 'js', code:
'for (let i = 0; i < 5; i++) {\n  console.log("Table de 7 :", 7 * i);\n}', legend: [
              ['let i = 0', 'INITIALISATION : le compteur démarre — exécuté UNE seule fois, avant le premier tour'],
              ['i < 5', 'CONDITION : testée AVANT chaque tour ; dès qu\'elle devient fausse, la boucle s\'arrête'],
              ['i++', 'INCRÉMENT : exécuté APRÈS chaque tour — c\'est lui qui rapproche de la sortie, tour après tour'],
              ['tout sur une ligne', 'départ ; test ; pas — toute la mécanique est visible d\'un coup d\'œil : c\'est la force du for'],
              ['le rythme exact', 'init → test → corps → incrément → test → corps → … jusqu\'au test FAUX']
            ]},
            { t: 'code', lang: 'js', code:
'for (let i = 1; i <= 5; i++) {\n  console.log("Tentative n°" + i);\n}\n//     départ     condition de poursuite   pas à chaque tour\n\n// Rebonds utiles : compter à l\'envers, aller de 2 en 2\nfor (let i = 10; i >= 0; i--) { decompte(i); }' },
            { t: 'p', h: 'La boucle `for` classique rassemble les trois éléments de la répétition sur une seule ligne : initialisation, condition de poursuite, progression. Elle reste irremplaçable quand tu veux un contrôle fin — indices précis, pas personnalisé, parcours à l\'envers — ou quand tu dois sortir avec `break` au milieu. Son inconvénient : l\'index `i` est une mécanique que tu dois gérer toi-même, avec ses risques de bornes (`<` vs `<=`, le fameux « off by one »).' },
            { t: 'h3', h: 'while : quand on répète *tant que*' },
            { t: 'syntax', title: 'while : répéter sans savoir combien de fois', lang: 'js', code:
'let stock = 3;\nwhile (stock > 0) {\n  vendreUnArticle();\n  stock--;\n}', legend: [
              ['while (stock > 0)', 'répète TANT QUE la condition est vraie — testée AVANT chaque tour : zéro tour reste possible'],
              ['stock--', 'LA ligne vitale : quelque chose DOIT faire évoluer la condition — oublie-la et c\'est la boucle infinie, l\'onglet gelé'],
              ['for ou while ?', 'tours connus d\'avance → for ; répéter jusqu\'à un événement imprévisible (saisie valide, stock épuisé) → while — le POUR vs TANT QUE du module Algo !'],
              ['stock-- = stock = stock - 1', 'la décrémentation raccourcie : relire puis écraser, en deux caractères']
            ]},
            { t: 'code', lang: 'js', code:
'let carburant = 100;\n\nwhile (carburant > 0) {\n  conduire();\n  carburant -= 8;   // sans cette ligne : boucle INFINIE !\n}\n\n// do...while : le corps s\'exécute AU MOINS une fois\ndemande = "";\ndo {\n  demande = prompt("Tapez « ok » pour continuer");\n} while (demande !== "ok");' },
            { t: 'p', h: '`while` tourne tant que la condition est vraie — sans te garantir qu\'elle deviendra fausse un jour. C\'est à TOI de faire progresser quelque chose dans le corps vers la sortie : décrémenter, lire une saisie, avancer un curseur. Sinon : boucle infinie, onglet gelé, petit moment de solitude. Le variant `do...while` inverse l\'ordre (corps d\'abord, test ensuite) pour les cas où le premier passage est obligatoire — typiquement : poser la question au moins une fois.' },
            { t: 'h3', h: 'for…of : la boucle moderne sur les collections' },
            { t: 'syntax', title: 'for…of : visiter chaque élément, sans indice', lang: 'js', code:
'for (const produit of panier) {\n  total += produit.prix;\n}', legend: [
              ['of', '« DE chaque élément » : for…of visite les VALEURS d\'un tableau, du premier au dernier — sans indice à gérer ni piège du zéro'],
              ['const produit', 'à chaque tour, l\'élément courant porte ce nom — const, car on ne réassigne pas la variable de boucle elle-même'],
              ['total += produit.prix', 'le raccourci « ajoute à » : total = total + produit.prix — le cumul maison de toutes les sommes'],
              ['pas sur les objets', 'for…of est fait pour les COLLECTIONS (tableaux, chaînes, Map, Set) ; pour les propriétés d\'un objet, c\'est for…in ou Object.entries()']
            ]},
            { t: 'code', lang: 'js', code:
'const courses = ["riz", "huile", "gombo"];\n\nfor (const article of courses) {\n  console.log("Acheter : " + article);\n}\n\n// for...of fonctionne sur tout « itérable » :\nfor (const lettre of "gari") { console.log(lettre); }    // les caractères\nfor (const [i, article] of courses.entries()) { }       // index + valeur' },
            { t: 'p', h: '`for…of` est le choix par défaut pour parcourir : pas d\'index à gérer, pas d\'erreur de borne, lecture naturelle (« pour chaque article DE courses »). Il opère sur les itérables : tableaux, chaînes, Map, Set… Son cousin `for…in`, lui, énumère les **clés d\'un objet** — à bannir sur les tableaux : il renvoie les index en CHAÎNES (`"0" + 1` donne `"01"`) et peut ramasser des propriétés qui ne sont pas des éléments.' },
            { t: 'h3', h: 'Piloter la boucle : break et continue' },
            { t: 'code', lang: 'js', code:
'for (const n of [3, -1, 8, 0, 12]) {\n  if (n === 0) break;      // 0 -> on STOPPE toute la boucle\n  if (n < 0) continue;     // négatifs -> on SAUTE ce tour\n  console.log(n);          // affiche 3 puis 8\n}' },
            { t: 'p', h: '`break` quitte la boucle immédiatement (la recherche qui a trouvé n\'a plus de raison de continuer) ; `continue` saute au tour suivant (les négatifs sont ignorés sans quitter la vérification). Note pour les boucles imbriquées : `break` ne sort que de la boucle LA PLUS PROCHE — avec deux boucles l\'une dans l\'autre, pense à découper en fonction et utiliser `return`, souvent plus clair que les labels.' },
            { t: 'h3', h: 'Quelle boucle pour quel travail ?' },
            { t: 'table', head: ['Besoin', 'Boucle idéale', 'Pourquoi'], rows: [
              ['Parcourir un tableau', '`for…of`', 'Zéro mécanique, zéro erreur de borne'],
              ['Nombre de tours connu / index maîtrisé', '`for` classique', 'Contrôle total (pas, bornes, direction)'],
              ['Répéter jusqu\'à un état', '`while`', 'La condition est le sujet (saisie, file d\'attente)'],
              ['Transformer un tableau en autre chose', '`map` / `filter` / `reduce`', 'Exprimer l\'intention — fiche Tableaux !'],
              ['Parcourir les clés d\'un objet', '`for…in` ou `Object.entries()`', 'Conçu pour l\'objet, pas pour les tableaux']
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« for...of marche sur les objets. »** — Non : un objet n\'est pas itérable (`TypeError : x is not iterable`). Utilise `Object.entries(obj)` et boucle sur le tableau résultant.',
              '**« La vieille boucle for est dépassée. »** — Non : dès que l\'index est le sujet (paires, arrière, sauts), elle reste l\'outil précis. C\'est le `for…of` qui est le défaut pour les collections, pas l\'inverse.',
              '**« break sort de toutes les boucles. »** — Seulement de la plus imbriquée. Pour les structures à étages, une fonction avec `return` est généralement la solution propre.',
              '**« i++ avant ou après, pareil en une ligne. »** — Dans le `for`, oui ; en expression, non : `i++` rend l\'ancienne valeur, `++i` la nouvelle. Lisibilité : garde `i++` hors des expressions pour éviter le débat.',
              '**« while(true) est toujours une erreur. »** — C\'est une structure légitime pour une boucle de service avec un `break` explicite dedans ; ce qui est une erreur, c\'est le while SANS progression vers la sortie.',
              '**« Modifier un tableau en le parcourant, ça va. »** — Les index se décalent et des éléments sont sautés (voir l\'erreur rouge en bas) : `filter` est la réponse.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les CONDITIONS de la fiche précédente pilotent les sorties (`break`/`continue` = if + intention), la PORTÉE de bloc fait que l\'index `i` n\'existe que dans sa boucle, et `for…of` assume les tableaux — le sujet de la fiche suivante, où `map`, `filter` et `reduce` vont transformer ta façon de traiter les collections. Après elle, la plupart de tes boucles de « transformation » n\'existeront plus.' },
            { t: 'callout', kind: 'tip', h: 'Debug express d\'une boucle : pose un `console.log(i, element)` en première ligne du corps. Si le log ne s\'affiche jamais, la condition de départ est fausse ; s\'il ne s\'arrête plus, la progression est cassée. Deux cas couvrent 95 % des boucles rebelles.' }
          ],
          errors: [
            { title: 'La boucle infinie par oubli d\'incrément', bad: 'let i = 0;\nwhile (i < 10) {\n  console.log(i);   // i ne bouge jamais...', good: 'let i = 0;\nwhile (i < 10) {\n  console.log(i);\n  i++;\n}', why: 'while ne fait aucun pas pour toi. Sans progression vers une condition fausse, l\'onglet gèle — F12, stop, et on retourne au code.' },
            { title: 'for…in sur un tableau', bad: 'for (const i in courses) {\n  console.log(i + 1);   // "01", "11", "21"...', good: 'for (const article of courses) {\n  console.log(article);\n}', why: 'for...in itère sur les clés en CHAÎNES ("0","1"...) : i + 1 concatène au lieu d\'additionner, et des propriétés parasites peuvent surgir. for...of est fait pour les tableaux.' }
          ],
          related: ['js-conditions', 'js-tableaux', 'js-fonctions']
        }
      ]
    },

    {
      id: 'logique-donnees',
      name: 'Logique & données',
      icon: 'functions',
      fiches: [
        {
          id: 'js-fonctions',
          title: 'Fonctions',
          icon: 'functions',
          level: 'Intermédiaire',
          tagline: 'Déclaration, fléchées, paramètres par défaut, retour : le concept central de JS.',
          intro: 'Une fonction est une **machine nommée** : tu lui donnes des ingrédients (paramètres), elle te rend un plat (valeur de retour), et tu peux l\'utiliser autant de fois que tu veux sans jamais réouvrir son capot. C\'est la brique de base de tout programme : la qualité d\'un code se lit d\'abord à la qualité de ses fonctions. JavaScript en offre deux syntaxes — classique et fléchée — qui cohabitent joyeusement, et un super-pouvoir fondateur : les fonctions sont des valeurs comme les autres.',
          blocks: [
            { t: 'h3', h: 'Le problème que les fonctions résolvent' },
            { t: 'p', h: 'En attaquant les boucles, tu as déjà goûté au « écrire une fois, exécuter partout ». Les fonctions appliquent le même principe aux TRAITEMENTS ENTIERS : calculer la TVA, formater un prix en FCFA, vérifier un numéro MTN. Sans elles, le même calcul de frais serait copié à cinq endroits du projet — et le jour où les frais changent, tu en corrigeras quatre. La fonction nomme le traitement, le rend testable isolément, et te permet de lire le programme principal comme un sommaire : `validerCommande()`, `envoyerRecu()`, `mettreAJourStock()`. C\'est ça, l\'abstraction : cacher la complexité derrière un bon nom.' },
            { t: 'h3', h: 'Déclarer et appeler' },
            { t: 'syntax', title: 'function : définir puis appeler, décortiqué', lang: 'js', code:
'function tva(montant) {\n  return montant * 0.18;\n}\n\nconst total = 10000 + tva(10000);', legend: [
              ['function tva(montant)', 'la DÉCLARATION : nom + paramètres entre parenthèses. montant est l\'ingrédient ATTENDU, pas encore une vraie valeur'],
              ['return …', 'la valeur renvoyée à l\'appelant — ET la fin immédiate de la fonction : rien après un return ne s\'exécute'],
              ['tva(10000)', 'L\'APPEL avec l\'ARGUMENT concret : le résultat (1800) prend la place de l\'appel dans l\'expression → total vaut 11800'],
              ['définir ≠ exécuter', 'la déclaration n\'est qu\'une recette écrite : rien n\'est calculé tant que personne n\'appelle la fonction'],
              ['hoisting', 'les fonctions function sont « hissées » : tu peux les appeler AVANT leur ligne de déclaration — spécificité du mot-clé function']
            ]},
            { t: 'code', lang: 'js', code:
'function additionner(a, b) {\n  return a + b;\n}\n\nconst total = additionner(12, 30);   // 42\n\n// Forme fléchée (ES6), parfaite en une ligne :\nconst doubler = (n) => n * 2;            // return implicite\nconst saluer = () => console.log("Salut !");' },
            { t: 'p', h: 'Deux paires de parenthèses qui changent tout : `additionner` désigne la MACHINE (une valeur), `additionner(12, 30)` l\'ACTIVE et récupère sa production. Et `return` a un double rôle : il **renvoie** la valeur et il **arrête net** la fonction — tout ce qui suit un return exécuté est ignoré. Sans return, la fonction produit silencieusement `undefined` : la source n°1 des « undefined is not a function » et des variables vides mystérieuses.' },
            { t: 'h3', h: 'Paramètres : défauts et collecteurs' },
            { t: 'code', lang: 'js', code:
'function commander(plat, quantite = 1, sauce = false) {\n  return quantite + "x " + plat + (sauce ? " avec sauce" : "");\n}\ncommander("Attiéké-poisson");     // "1x Attiéké-poisson"\ncommander("Alloco", 3, true);     // "3x Alloco avec sauce"\n\n// ...rest : capter un nombre variable d\'arguments\nconst somme = (...nombres) => nombres.reduce((t, n) => t + n, 0);\nsomme(100, 250, 80);   // 430' },
            { t: 'p', h: 'Les paramètres par défaut s\'activent quand l\'argument est absent ou `undefined` — fini les `if (quantite === undefined) quantite = 1`. Et `...rest` rassemble tous les arguments restants en un vrai tableau : l\'outil des fonctions à entrée libre (sommes, journaux, concaténations). Astuce d\'atelier : si ta fonction attend beaucoup d\'options, prends UN objet `options` en paramètre et destructue-le — tu repars vers la fiche Objets.' },
            { t: 'h3', h: 'Déclarée vs fléchée : la vraie différence' },
            { t: 'syntax', title: 'La fonction fléchée, décortiquée', lang: 'js', code:
'const ttc = (montant) => {\n  return montant * 1.18;\n};\nconst double = n => n * 2;', legend: [
              ['const ttc = …', 'la fonction est une VALEUR rangée dans une variable : toute la philosophie de JavaScript tient dans cette ligne'],
              ['(montant) => {…}', 'la FLÉCHÉE : paramètres, flèche, corps — plus brève et omniprésente dans le JS moderne (React, map, fetch…)'],
              ['n => n * 2', 'la forme ULTRA-courte : un seul paramètre (parenthèses offertes) et une seule expression (return implicite)'],
              ['la vraie différence', 'les fléchées n\'ont PAS leur propre this : sans importance pour un calcul, décisif dans les objets et les classes — voir la fiche Objets']
            ]},
            { t: 'table', head: ['', 'function', '=> (flèche)'], rows: [
              ['Syntaxe', 'Verbeuse', 'Compacte (return implicite sur une ligne)'],
              ['`this`', 'Le sien propre (dépend de l\'appel)', 'Hérité du contexte parent (pas de this propre)'],
              ['Hoisting (utilisable avant sa ligne)', 'Oui', 'Non (c\'est une variable)'],
              ['`arguments` caché', 'Oui', 'Non (utilise `...rest`)'],
              ['Usage idéal', 'Fonctions nommées, méthodes d\'objets', 'Callbacks : map, filter, addEventListener']
            ]},
            { t: 'p', h: 'Au-delà du style, la différence qui MORD est `this` : la fléchée ne possède pas le sien et prend celui d\'alentour — génial dans un callback qui doit voir le contexte englobant, catastrophique comme méthode d\'objet (tu retrouveras ce détail en fiche Objets). Le hoisting, lui, permet d\'appeler une `function` avant sa ligne de déclaration : pratique pour lire un fichier « du général vers le détail », les branches en bas.' },
            { t: 'h3', h: 'Les fonctions sont des valeurs (le super-pouvoir)' },
            { t: 'code', lang: 'js', code:
'const direBonjour = saluer;   // pas de () : on passe la MACHINE\ndireBonjour();                // on l\'utilise ici\n\n// Une fonction peut donc être PASSÉE à une autre :\nfunction repeter(action, fois) {\n  for (let i = 0; i < fois; i++) action(i);\n}\nrepeter((i) => console.log("Tour " + i), 3);' },
            { t: 'p', h: 'Retiens bien cette phrase, elle débloque la moitié du JavaScript moderne : une fonction peut être rangée dans une variable, passée en argument, RETOURNÉE par une autre fonction. Tout le reste du module n\'est que des applications de cette idée — les callbacks des méthodes de tableaux, les gestionnaires d\'événements (`addEventListener("click", traiter)`), les `.then()` de l\'asynchrone. D\'où l\'erreur culte du débutant (voir encadré rouge) : donner les parenthèses là où on veut JUSTE la référence.' },
            { t: 'h3', h: 'Fermetures (closures) : la mémoire des fonctions' },
            { t: 'code', lang: 'js', code:
'function creerCompteur() {\n  let total = 0;                       // « sac à dos » privé\n  return function () {\n    total++;\n    return total;\n  };\n}\n\nconst compter = creerCompteur();\ncompter();   // 1\ncompter();   // 2 : il se souvient de SON total' },
            { t: 'p', h: 'Sous le capot, quand une fonction est créée À L\'INTÉRIEUR d\'une autre, elle emporte avec elle les variables locales de son berceau, même après la fin de la fonction parente : c\'est la **fermeture** (closure). On s\'en sert pour fabriquer des états privés sans objet (compteurs, mémos, configurations pré-remplies). Tu n\'as pas besoin de théoriser la closure pour coder ; il suffit de reconnaître l\'image : chaque fonction naît avec un sac à dos contenant les variables qui l\'entouraient à sa création. On l\'utilisera sans le nommer dans les événements : chaque gestionnaire de clic retient les variables de son coin de code.' },
            { t: 'h3', h: 'Fonctions pures vs effets de bord : le réflexe lisibilité' },
            { t: 'p', h: 'Une fonction **pure** fait tout son travail à travers ses paramètres et son return : mêmes entrées -> même sortie, sans toucher au monde extérieur. Elle est instantanément testable et sans surprise. À l\'opposé, les effets de bord (modifier une variable globale, écrire dans le DOM, envoyer une requête) sont nécessaires MAIS doivent être des choix visibles : `calculerFrais(montant)` reste pure, `afficherRecu(frais)` assume son effet, et les deux ne se mélangent pas. Ce réflexe — séparer le calcul de l\'affichage — changera durablement la lisibilité de ton code.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« return affiche quelque chose. »** — Non : return TRANSMET une valeur à l\'appelant ; console.log écrit dans la console du développeur. Confondre les deux est LE malentendu n°1 : une fonction qui « affiche » au lieu de retourner est inutilisable dans un calcul.',
              '**« saluer et saluer() sont la même chose. »** — Le premier est la machine, le second sa production. Partout où une fonction est attendue (callbacks, écouteurs), passe la machine — jamais son résultat immédiat.',
              '**« Une fonction sans return renvoie 0 ou « rien du tout ». »** — Elle renvoie toujours quelque chose : `undefined`. Si une variable reçoit undefined après ton appel, vérifie d\'abord le return.',
              '**« Les paramètres modifient les variables passées. »** — Pour les primitives (nombre, texte), la fonction reçoit une COPIE : impossible de modifier l\'originale. Pour les objets, elle reçoit une copie de la flèche : elle peut modifier le CONTENU, jamais repointer la variable extérieure.',
              '**« Les fléchées remplacent les functions partout. »** — Elles n\'ont ni `this` propre, ni hoisting : parfaites en callbacks, inadaptées aux méthodes d\'objets.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'La portée de bloc et le hoisting des variables expliquent pourquoi les fonctions ont leur propre monde (et pourquoi la fléchée, simple variable, n\'est pas hoistée). Les paramètres par défaut utilisent `undefined` de la fiche Types; les early returns de la fiche Conditions rendent les fonctions à plat. Et c\'est précisément pour s\'offrir de BEAUX callbacks (`x => x * 2`) que les fléchées existent : direction la fiche Tableaux, leur terrain de jeu.' },
            { t: 'callout', kind: 'tip', h: 'Une bonne fonction : fait UNE chose, porte le nom d\'un verbe (`calculerTva`, `afficherProfil`), et tient idéalement en moins de ~20 lignes. Si elle grandit, découpe-la en sous-fonctions aux noms parlants : le programme principal se transforme en sommaire.' }
          ],
          errors: [
            { title: 'Oublier le return', bad: 'function total(a, b) {\n  a + b;          // calcul perdu dans le vide\n}\nconst t = total(2, 3);  // undefined', good: 'function total(a, b) {\n  return a + b;\n}', why: 'Calculer sans retourner, c\'est cuisiner puis jeter le plat. Si une variable reçoit undefined après un appel, vérifie d\'abord le return.' },
            { title: 'Appeler la fonction au lieu de la passer', bad: 'bouton.addEventListener("click", fermer());', good: 'bouton.addEventListener("click", fermer);\n// avec des arguments :\nbouton.addEventListener("click", () => fermer(modale));', why: 'fermer() exécute la fonction IMMÉDIATEMENT et l\'écouteur reçoit son résultat (souvent undefined). Transmets la référence : le navigateur décidera du moment de l\'appel.' }
          ],
          related: ['js-variables', 'js-tableaux', 'js-evenements', 'js-asynchrone']
        },

        {
          id: 'js-tableaux',
          title: 'Tableaux & méthodes',
          icon: 'data_array',
          level: 'Intermédiaire',
          tagline: 'map, filter, reduce, find : la boîte à outils qui remplace 80 % de tes boucles.',
          intro: 'Le tableau est LA structure de données du quotidien : liste de produits, de membres, de transactions. Et la révolution personnelle survient quand tu arrêtes de parcourir à la main pour **énoncer l\'intention** — « transforme chaque élément », « garde ceux en stock », « trouve celui-là », « fais le total ». Les méthodes de tableaux incarnent cette philosophie : moins de mécanique, plus de sens.',
          blocks: [
            { t: 'h3', h: 'Le problème : les collections, et les boucles qui les brouillent' },
            { t: 'p', h: 'Presque toute donnée réelle arrive en série : le catalogue de la Boutique Awa, les cotisations de la tontine, l\'historique des transactions MoMo. Traiter ces listes à base de boucles `for` fonctionne — mais le code dit COMMENT parcourir au lieu de dire QUOI faire. Lis « garde les produits en stock, prends leur nom, trie-les » : c\'est exactement `filtrer`/`transformer`/`trier`. Les méthodes expriment l\'intention et laissent la mécanique au moteur — c\'est pour ça qu\'elles ont conquis le JavaScript moderne.' },
            { t: 'h3', h: 'Créer, lire, ajouter, retirer' },
            { t: 'syntax', title: 'Le tableau : créer, lire, mesurer', lang: 'js', code:
'const panier = ["gari", "riz"];\npanier.push("huile");\npanier[0];              // "gari"\npanier.length;          // 3', legend: [
              ['["gari", "riz"]', 'le tableau LITTÉRAL : éléments entre crochets, séparés par des virgules'],
              ['panier[0]', 'L\'INDICE commence à ZÉRO en JavaScript : le premier élément est [0] — le décalage nº 1 des débutants'],
              ['push("huile")', 'ajoute à la FIN — sa sœur pop() retire à la fin, shift()/unshift() jouent au début'],
              ['panier.length', 'le nombre d\'éléments, TOUJOURS à jour — retenir que le dernier indice vaut length - 1']
            ]},
            { t: 'code', lang: 'js', code:
'const fruits = ["pomme", "banane", "mangue"];\n\nfruits[0];            // "pomme" (l\'index commence a 0 !)\nfruits.length;        // 3 (nb d\'éléments : dernier index + 1)\nfruits.at(-1);        // "mangue" (at : les index négatifs partent de la fin)\n\nfruits.push("ananas");    // ajoute a la FIN\nfruits.unshift("kiwi");   // ajoute au DEBUT\nfruits.pop();             // retire le dernier (et le rend)\nfruits.shift();           // retire le premier\n\nfruits.includes("banane");// true\nfruits.slice(0, 2);       // copie une tranche, SANS modifier l\'original' },
            { t: 'p', h: 'Deux reflexes mnémotechniques. 1) `length` compte les éléments, donc le dernier index est TOUJOURS `length - 1` — ou plus simplement `.at(-1)`. 2) À retenir par paires contraires : `slice` COPIE sans toucher l\'original, `splice` MODIFIE sur place (insère/retire) ; la quasi-totalité du temps, c\'est `slice` qu\'on veut.' },
            { t: 'h3', h: 'map, filter, find : le trio fondateur' },
            { t: 'syntax', title: 'map / filter / find, décortiqués', lang: 'js', code:
'const prix = produits.map(p => p.prix);\nconst enStock = produits.filter(p => p.stock > 0);\nconst gari = produits.find(p => p.nom === "gari");', legend: [
              ['map(p => p.prix)', 'TRANSFORME chaque élément : tableau de même TAILLE, produits devenus prix — [A, B] devient [f(A), f(B)]'],
              ['filter(p => p.stock > 0)', 'GARDE seulement les éléments qui passent le test : tableau plus court, voire vide'],
              ['find(p => p.nom === "gari")', 'renvoie LE PREMIER élément qui passe le test — ou undefined si personne ne passe'],
              ['p => …', 'la petite fonction fléchée appliquée à CHAQUE élément : p est l\'élément courant, tu choisis son nom'],
              ['immuabilité', 'les trois NE MODIFIENT PAS le tableau d\'origine : ils construisent un nouveau résultat — le réflexe du JS moderne']
            ]},
            { t: 'code', lang: 'js', code:
'const prix = [100, 250, 80, 400];\n\n// map : TRANSFORME chaque élément -> nouveau tableau, MEME taille\nconst ttc = prix.map((p) => p * 1.18);        // [118, 295, 94.4, 472]\n\n// filter : GARDE ceux qui passent le test -> tableau plus petit\nconst chers = prix.filter((p) => p > 100);    // [250, 400]\n\n// find : le PREMIER qui passe le test (ou undefined si aucun)\nconst cible = prix.find((p) => p > 200);      // 250' },
            { t: 'p', h: 'Relis ces trois lignes : chacune dit exactement ce qu\'elle fait, sans `i`, sans `length`, sans tableau tampon à remplir à la main. Et le détail qui change tout en pratique : ces méthodes **ne modifient pas** le tableau d\'origine — elles en renvoient un NEUF. C\'est la porte ouverte au chaînage :' },
            { t: 'code', lang: 'js', code:
'const affichage = produits\n  .filter((p) => p.stock > 0)          // on garde les dispos...\n  .map((p) => p.nom)                    // ...on ne prend que les noms...\n  .sort()                               // ...tries par ordre alphabetique...\n  .join(", ");                          // ...assembles en une seule phrase' },
            { t: 'h3', h: 'Le catalogue vivant : un exemple complet' },
            { t: 'code', lang: 'js', code:
'const catalogue = [\n  { nom: "Gari premium 5kg", prix: 3500, stock: 12 },\n  { nom: "Huile rouge 1L",   prix: 1200, stock: 0 },\n  { nom: "Tissu wax 6m",     prix: 8500, stock: 4 }\n];\n\n// Qu\'affiche la Boutique Awa ?\nconst vitrine = catalogue\n  .filter((p) => p.stock > 0)\n  .map((p) => p.nom + " - " + p.prix + " FCFA");\n// ["Gari premium 5kg - 3500 FCFA", "Tissu wax 6m - 8500 FCFA"]' },
            { t: 'h3', h: 'reduce : faire fondre le tableau en une valeur' },
            { t: 'code', lang: 'js', code:
'const panier = [\n  { nom: "Riz", prix: 500, qte: 2 },\n  { nom: "Huile", prix: 1200, qte: 1 }\n];\n\nconst total = panier.reduce((acc, article) => {\n  return acc + article.prix * article.qte;\n}, 0);              // acc = accumulateur ; 0 = valeur de DEPART\n// -> 1000 + 1200 = 2200' },
            { t: 'p', h: '`reduce((acc, elem) => ..., valeurInitiale)` est le couteau suisse : somme, maximum, regroupement par catégorie, transformation en objet indexé… Deux conseils d\'artisan. 1) Donne TOUJOURS la valeur initiale — sur un tableau vide sans elle, reduce lève une erreur (souvenir douloureux garanti). 2) Si le résultat s\'exprime avec `map`/`filter`/`find`, préfère-les : un reduce illisible succède presque toujours à une idée plus simple.' },
            { t: 'h3', h: 'La garde rapprochée : every, some, sort… et l\'immuabilité' },
            { t: 'code', lang: 'js', code:
'notes.every((n) => n >= 10);           // TOUS passent ? (boolean)\nnotes.some((n) => n >= 18);            // au moins UN ?\n\n// spread : copier / fusionner sans toucher l\'original\nconst copie = [...fruits];\nconst menus = [...entrees, ...plats, "dessert"];\n\n// destructuration : extraire proprement\nconst [premier, second, ...autres] = fruits;\n\nconst lignes = csv.split("\\n");          // texte -> tableau\nconst tags = articles.flatMap((a) => a.tags);  // map + aplatissement\n\n// 2023+ : trier/sans muter l\'original en une ligne\nconst tries = notes.toSorted((a, b) => a - b);' },
            { t: 'p', h: 'Parlons immuabilité une bonne fois : les méthodes « nouvelles » (`map`, `filter`, `slice`, spread, `toSorted`) laissent l\'original intact, les anciennes (`push`, `splice`, `sort`, `reverse`) le modifient sur place. Un tableau qui change sans qu\'on s\'y attende est une mine de bugs — réflexe pro : quand tu ne sais pas, COPIE d\'abord (`[...tab].sort(...)`), modifie ensuite. C\'est exactement la même discipline des références qu\'en fiche Objets.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« L\'index commence à 1. »** — À 0. Le premier élément est `[0]`, le dernier `[length - 1]` — ou simplement `.at(-1)` si tu veux la fin sans calcul.',
              '**« map transforme mon tableau existant. »** — Non : map REConstruit un tableau neuf ; l\'original est intact. Si ton affichage ne change pas, c\'est souvent que tu as oublié de RECUPERER le résultat (`const ttc = ...`).',
              '**« find renvoie une liste. »** — find renvoie UN élément (le premier trouvé) ou undefined ; filter renvoie une liste (éventuellement vide).',
              '**« sort trie les nombres. »** — Par défaut, sort trie en TEXTE : [10, 9, 80] devient [10, 80, 9]. Et il MUTE l\'original. La formule : `[...nbs].sort((a, b) => a - b)`.',
              '**« slice et splice, même famille. »** — Presque : slice copie (safe), splice modifie sur place (attention). Dans le doute, slice — puis filter.',
              '**« forEach remplace tout. »** — forEach est pratique pour les effets (afficher), mais il ne RETOURNE rien : impossible de chaîner. Dès que tu fabriques une donnée, c\'est map/filter/reduce.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Ces méthodes prennent des FONCTIONS en argument — c\'est la fiche Fonctions qui paye : la flèche `(p) => p.stock > 0` n\'est qu\'un callback anonyme. Les boucles expliquent ce que ces méthodes font sous le capot (un forEach est une boucle habillée). Les conditions donnent les tests des filter/find. Et la prochaine fiche — Objets — complète le tableau : dans la vraie vie, tes tableaux contiennent presque toujours… des objets, comme le catalogue ci-dessus.' },
            { t: 'callout', kind: 'warn', h: '`sort()` trie par défaut en **texte** et **modifie** le tableau d\'origine. Pour des nombres : `nbs.sort((a, b) => a - b)`. Pour préserver l\'original : `[...nbs].sort(...)` ou le moderne `nbs.toSorted(...)`.' }
          ],
          errors: [
            { title: 'Modifier un tableau pendant son parcours', bad: 'panier.forEach((a, i) => {\n  if (a.prix === 0) panier.splice(i, 1); // index decales !\n});', good: 'panier = panier.filter((a) => a.prix > 0);', why: 'Retirer des éléments pendant un parcours décale les index et fait sauter des items. filter reconstruit proprement un tableau sans les indésirables.' },
            { title: 'Chercher un index puis récupérer l\'élément', bad: 'const i = users.findIndex((u) => u.id === id);\nconst user = users[i];', good: 'const user = users.find((u) => u.id === id);', why: 'find renvoie directement l\'élément (ou undefined) : une intention claire en une ligne, et plus besoin de gérer le cas -1.' },
            { title: 'reduce sans valeur initiale', bad: 'const total = panier.reduce((acc, a) => acc + a.prix);\n// TypeError si panier est VIDE !', good: 'const total = panier.reduce((acc, a) => acc + a.prix, 0);', why: 'Sans valeur initiale, reduce utilise le premier élément comme accumulateur de départ — et sur un tableau vide, il n\'a rien : erreur. Initialise toujours.' }
          ],
          related: ['js-boucles', 'js-fonctions', 'js-objets', 'js-es6']
        },

        {
          id: 'js-objets',
          title: 'Objets',
          icon: 'token',
          level: 'Intermédiaire',
          tagline: 'clé/valeur, méthodes, destructuration, this : représenter n\'importe quelle « chose » réelle.',
          intro: 'Un objet regroupe sous un seul nom tout ce qui décrit une **chose** : un produit a un nom, un prix, un stock ; un membre de tontine a un téléphone, une cotisation, un rang. C\'est le format universel de JavaScript — les API te renvoient des objets, le DOM est fait d\'objets, tes tableaux contiennent des objets. Maîtriser l\'objet, c\'est maîtriser la donnée en JavaScript.',
          blocks: [
            { t: 'h3', h: 'Le problème : représenter une « chose » complète' },
            { t: 'p', h: 'Un tableau dit « une liste de valeurs ». Mais un produit de la Boutique Awa, ce n\'est pas une liste de valeurs anonymes : `3500` ne veut rien dire sans savoir que c\'est le PRIX, `12` que c\'est le STOCK. On pourrait jongler avec trois variables séparées (`prixGari`, `stockGari`, `nomGari`) — fragiles, non transmises ensemble, impossibles à passer en paramètre d\'un coup. L\'objet rattache chaque valeur à une CLÉ nommée : la structure elle-même porte le sens, et tout part en voyage d\'une seule pièce.' },
            { t: 'h3', h: 'Créer et lire un objet' },
            { t: 'syntax', title: 'L\'objet littéral, décortiqué', lang: 'js', code:
'const produit = {\n  nom: "gari premium",\n  prix: 1500,\n  enStock: true\n};\nproduit.prix;       // 1500\nproduit["nom"];     // "gari premium"', legend: [
              ['{ … }', 'l\'objet LITTÉRAL : des couples clé: valeur, séparés par des virgules — une fiche avec des cases nommées'],
              ['nom: "gari premium"', 'une PROPRIÉTÉ : la clé (sans guillemets si c\'est un identifiant valide), deux-points, puis la valeur de n\'importe quel type'],
              ['produit.prix', 'la notation POINT : la lecture directe et lisible — ton réflexe par défaut'],
              ['produit["nom"]', 'les CROCHETS : indispensables quand la clé arrive d\'une variable ou contient espaces et tirets (produit[critere])'],
              ['une valeur = tout', 'nombre, texte, booléen, tableau, AUTRE objet, fonction : une propriété peut contenir tout JavaScript']
            ]},
            { t: 'code', lang: 'js', code:
'const produit = {\n  nom: "Gari premium",\n  prix: 3500,\n  stock: 12,\n  vendeur: "Boutique Awa"\n};\n\nproduit.nom;              // "Gari premium" — notation pointée, 95 % des cas\nproduit["prix"];          // 3500 — utile quand la clé est dans une VARIABLE\n\nconst cle = "stock";\nproduit[cle];             // 12\nproduit.auteur;           // undefined (pas de crash à la LECTURE d\'une clé absente)' },
            { t: 'p', h: 'La notation pointée est le défaut lisible ; les crochets entrent en scène dès que la clé est dynamique (choisie par l\'utilisateur, extraite d\'une variable, contenant des espaces ou des tirets : `data["prix-ht"]`). Note le contrat de lecture rassurant : accéder à une clé absente donne `undefined` — sans erreur. En revanche, lire une PROPRIÉTÉ D\'UN undefined (`produit.auteur.nom`) plante : c\'est exactement le rôle de `?.` vu aux Types.' },
            { t: 'h3', h: 'Modifier, ajouter, parcourir' },
            { t: 'code', lang: 'js', code:
'produit.stock = 8;           // modifier\nproduit.reduction = 500;     // ajouter (la clé n\'existait pas)\ndelete produit.vendeur;      // supprimer\n\n"prix" in produit;           // true : la clé existe-t-elle ?\nObject.keys(produit);        // ["nom","prix","stock","reduction"]\nObject.values(produit);      // les valeurs, dans le même ordre\nObject.entries(produit);     // [["nom","Gari premium"], ...] : ideal pour boucler\n\nfor (const [cle, valeur] of Object.entries(produit)) {\n  console.log(cle + " : " + valeur);\n}' },
            { t: 'p', h: 'Ajouter une clé se fait par simple assignation — pas de déclaration préalable. Pour parcourir, `Object.entries` est ton ami fidèle (rappel : l\'objet n\'est pas itérable au `for…of`, il faut ce pont tableau). Note d\'ordre : les clés texte conservent l\'ordre d\'insertion ; les clés entièrement numériques (`"1"`, `"2"`) remontent en premier, triées. Si l\'ordre strict compte tout le temps, c\'est `Map` (fin de fiche).' },
            { t: 'h3', h: 'Destructuration : l\'élégance au quotidien' },
            { t: 'syntax', title: 'La destructuration, décortiquée', lang: 'js', code:
'const { nom, prix } = produit;\n// ⇔ const nom = produit.nom;\n// ⇔ const prix = produit.prix;', legend: [
              ['const { nom, prix }', 'EXTRAIT les propriétés citées dans des variables du MÊME nom, en une seule ligne'],
              ['= produit', 'la SOURCE à droite : l\'objet qu\'on déballe'],
              ['{ nom: nomProduit }', 'la variante avec RENOMMAGE : la propriété nom arrive dans la variable nomProduit — anti-collision de noms'],
              ['{ prix = 0 }', 'la variante avec DÉFAUT : si la propriété est absente, la variable vaut le défaut — une sécurité de plus'],
              ['partout', 'fonctionne aussi en paramètre de fonction : function afficher({ nom, prix }) — très utilisé en React']
            ]},
            { t: 'code', lang: 'js', code:
'const { nom, prix: prixHT = 0, ...reste } = produit;\n// nom     -> "Gari premium"\n// prixHT  -> produit.prix (renommée, avec valeur par defaut)\n// reste   -> { stock, reduction } : tout le reste\n\n// Le pattern qui change tout dans les fonctions :\nfunction afficherProduit({ nom, prix, stock = 0 }) {\n  console.log(nom + " - " + prix + " FCFA - " + stock + " en stock");\n}\nafficherProduit(produit);   // un seul argument, des parametres nommes' },
            { t: 'p', h: 'La destructuration dans les paramètres mérite son statut de standard : la fonction annonce exactement ce qu\'elle consomme, l\'ORDRE des propriétés importe peu, et ajouter une option plus tard ne casse aucun appel existant. C\'est le pattern des fonctions au long cours — tu en verras partout.' },
            { t: 'h3', h: 'Le piège des références, enfin expliqué' },
            { t: 'code', lang: 'js', code:
'const original = { compteur: 1 };\nconst copie = original;         // PAS une copie : meme objet en memoire !\ncopie.compteur = 99;\nconsole.log(original.compteur); // 99 — surprise...\n\n// Vraie copie de SURFACE (premier niveau) :\nconst vraieCopie = { ...original };\n\n// Fusion / surcharge :\nconst offre = { ...produit, prix: 2900 };   // remplace prix\n\n// Copie PROFONDE (objets imbriques) :\nconst sauvegarde = structuredClone(commande);' },
            { t: 'p', h: 'Souviens-toi de l\'image des flèches (fiche Variables) : l\'assignation copie la flèche, pas la valeur. Les variables d\'objets coexistant vers la MÊME adresse expliquent tous les mystères de « qui a modifié ma donnée ?! ». Le spread `{ ...obj }` crée un nouvel objet avec les mêmes clés de premier niveau — mais les objets IMBRIQUÉS restent partagés ! Pour une copie intégrale, `structuredClone()` est l\'outil natif moderne (l\'ancien hack `JSON.parse(JSON.stringify())` perd les dates, `undefined`, fonctions… à garder pour la culture).' },
            { t: 'h3', h: 'Méthodes et le mot-clé this' },
            { t: 'code', lang: 'js', code:
'const compte = {\n  solde: 15000,\n  deposer(montant) {\n    this.solde += montant;      // this = l\'objet devant le point\n    return this;\n  },\n  retirer(montant) {\n    this.solde -= montant;\n    return this;\n  }\n};\n\ncompte.deposer(5000).retirer(2000);  // chainage grâce au return this\ncompte.solde;                        // 18000' },
            { t: 'p', h: 'Règle d\'or du `this`, valable dans 95 % des cas : **`this` est ce qui se trouve à gauche du point AU MOMENT DE L\'APPEL**. Dans `compte.deposer(5000)`, `this` vaut `compte`. Le piège : la valeur ne dépend pas d\'où la méthode est ÉCRITE mais de COMMENT elle est appelée — détache-la (`const f = compte.deposer; f();`) et `this` saute (undefined en mode strict). C\'est aussi pourquoi les méthodes fléchées échouent ici : elles n\'ont pas de `this` propre et attrapent celui d\'ailleurs (voir l\'erreur rouge). Le `return this` permet le chaînage façon jQuery — un truc de fin connaisseur.' },
            { t: 'h3', h: 'Collections spécialisées : Map et Set en une minute' },
            { t: 'ul', items: [
              '**Objet littéral** — 95 % des cas : données structurées, API, tout ce qui revient du JSON.',
              '**Map** — dictionnaire aux clés de n\'importe quel type (objets compris !), ordre d\'insertion garanti, taille via `.size`. Idéal pour indexer par identifiant : `new Map([[id, produit]])`.',
              '**Set** — une liste SANS doublons : `new Set(tags)` dédoublonne en une ligne ; conversion retour : `[...setUnique]`.',
              'Méthodes clés Map/Set : `set`/`get`/`has`/`delete` — `has` remplace les acrobaties `in`/undefined quand une clé peut valoir vraiment undefined.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« const copie = objet crée une copie. »** — Non : deux flèches vers le même objet. Seuls le spread (surface) et `structuredClone` (profondeur) copient vraiment.',
              '**« Accéder à une clé inconnue plante. »** — Non : ça rend `undefined`, silencieusement. Ce qui plante, c\'est lire une propriété D\'UN null/undefined : d\'où `?.` partout sur les données incertaines.',
              '**« delete est la seule façon de « vider » une clé. »** — Assigner `undefined` laisse la clé EXISTER (visible dans `Object.keys`, `in`) ; `delete` la retire vraiment. Différence réelle en sérialisation JSON.',
              '**« this est l\'objet où la méthode est écrite. »** — Non : c\'est l\'objet d\'APPEL (à gauche du point). Méthode détachée = this perdu ; fléchée = pas de this propre du tout.',
              '**« L\'ordre des clés est toujours celui d\'écriture. »** — Presque : les clés numériques passent devant, triées ; si l\'ordre est un contrat, utilise `Map`.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Les tableaux de la fiche précédente prennent ici leur vraie taille : les vraies données, ce sont des tableaux D\'OBJETS — tu sais déjà `filter`/`map` dessus. `const` protège la flèche mais pas le contenu : voilà pourquoi `produit.prix = 500` sur un const ne proteste pas. La destructuration annoncée en ES6 prend tout son sens ici, et l\'API de la fiche Fetch ne fera que te livrer… des objets comme ceux-ci. Prochaine : assembler toutes ces syntaxes modernes proprement — la fiche ES6.' },
            { t: 'callout', kind: 'tip', h: 'Réflexe structural : si tu hésites entre tableau et objet, demande « les éléments ont-ils des NOMS de propriétés ? » — oui -> objet ; « ce sont des occurrences du même type ? » -> tableau. Tableau d\'objets quand il y en a plusieurs.' }
          ],
          errors: [
            { title: 'Lire une propriété en profondeur sans garde', bad: 'const ville = user.adresse.ville;\n// TypeError si adresse est undefined !', good: 'const ville = user.adresse?.ville;\n// ou : const ville = user.adresse?.ville ?? "Inconnue";', why: 'Lire une propriété D\'UNE valeur undefined/null plante tout le script. Le chaînage optionnel ?. s\'arrête proprement à undefined — une ligne, zéro crash.' },
            { title: 'Une méthode fléchée et son this fantôme', bad: 'const compte = {\n  solde: 100,\n  afficher: () => console.log(this.solde) // undefined !\n};', good: 'const compte = {\n  solde: 100,\n  afficher() { console.log(this.solde); }  // 100\n};', why: 'Les fonctions fléchées n\'ont PAS de this propre : elles capturent celui du contexte extérieur. Pour les méthodes d\'objet, la syntaxe courte methode() { } est la bonne.' }
          ],
          related: ['js-tableaux', 'js-fonctions', 'js-es6', 'js-fetch']
        },

        {
          id: 'js-es6',
          title: 'JS moderne (ES6+)',
          icon: 'auto_awesome',
          level: 'Intermédiaire',
          tagline: 'Template literals, spread, destructuration, modules : la syntaxe qui a changé le métier.',
          intro: 'En 2015, l\'édition ES6 a infligé à JavaScript une cure de jouvence dont on parle encore : presque toutes les syntaxes « modernes » des tutoriels viennent de là. Tu les AS déjà croisées une à une dans les fiches précédentes — cette fiche les rassemble, les aprofondit, et ajoute les deux chapitres manquants : les classes et les modules. Considère-la comme la synthèse de tout le JavaScript que tu écriras au quotidien.',
          blocks: [
            { t: 'h3', h: 'Pourquoi ES6 a tout changé' },
            { t: 'p', h: 'Avant 2015 : pas de `let`, des chaînes assemblées au `+`, des tableaux copiés à la main, des fichiers qui se partagent les globales par collision. ES6 (surnommé ES2015) a aligné le langage avec les attentes réelles : portées saines, syntaxes expressives, modules officiels. Depuis, le rythme est annuel et tranquille (champs élégants du type `?.`, `??`, `??=`, `at()`, `toSorted()`). Bonne nouvelle pratique : tous les navigateurs récents parlent ES6 nativement — aucune étape de « build » n\'est requise pour l\'utiliser.' },
            { t: 'h3', h: 'Template literals : le texte enfin confortable' },
            { t: 'syntax', title: 'Le template literal, décortiqué', lang: 'js', code:
'const message = `Bonjour ${client.nom},\nton total est de ${total} FCFA.`;', legend: [
              ['les backticks', 'AltGr+7 deux fois : une chaîne MODERNE qui accepte les sauts de ligne en direct, sans acrobatie'],
              ['${ client.nom }', 'l\'INTERPOLATION : n\'importe quelle expression JS est évaluée puis insérée — fini "Bonjour " + nom + " !"'],
              ['${ total }', 'ici aussi : toute expression passe, même ${total * 1.18} ou ${panier.length}'],
              ['le piège', 'avec des apostrophes ou guillemets ordinaires, ${total} s\'afficherait tel quel : l\'interpolation n\'existe qu\'entre backticks']
            ]},
            { t: 'code', lang: 'js', code:
'const nom = "Awa";\nconst total = 2200;\n\n// Avec backticks ` : interpolation ${ } et multiligne\nconst message = `Bonjour ${nom},\nvotre commande de ${total} FCFA est confirmée.`;\n\n// Toute expression JS tient dans ${ } :\n`TTC : ${(total * 1.18).toFixed(0)} F`\n`Statut : ${stock > 0 ? "disponible" : "épuisé"}`' },
            { t: 'p', h: 'Le backtick (AltGr + 7 sur clavier AZERTY) transforme la fabrication de texte : interpolation directe, sauts de ligne naturels, expressions complètes dans le moule — y compris ternaires et appels. Comparé à l\'ancienne concaténation (`"Bonjour " + nom + ",\\nvotre commande de " + total + …`), la lisibilité n\'a tout simplement rien à voir. Dès que tu colles plus de deux fragments, c\'est backtick sans discussion.' },
            { t: 'h3', h: 'Destructuration : extraire sans effort' },
            { t: 'code', lang: 'js', code:
'// Tableaux : par POSITION\nconst [premier, ...reste] = [10, 20, 30];     // 10, [20, 30]\n\n// Objets : par NOM de clé (l\'ordre n\'importe pas)\nconst config = { theme: "dark", langue: "fr", taille: 16 };\nconst { theme, taille: px = 14 } = config;    // "dark", 16 (renommée + defaut)\n\n// Échange de variables en une ligne :\n[a, b] = [b, a];' },
            { t: 'p', h: 'Mémotechnique : la destructuration, c\'est la forme d\'un objet ou d\'un tableau écrite à GAUCHE de l\'assignation — on « moule » ce qu\'on veut extraire. Paramètres nommés (fiche Objets), retraits rapides, échange sans variable temporaire : c\'est la syntaxe qui rend le code auto-descriptif.' },
            { t: 'h3', h: 'Spread (...) : étaler et rassembler' },
            { t: 'syntax', title: 'Le spread, décortiqué', lang: 'js', code:
'const nouveauPanier = [...panier, "savon"];\nconst copie = { ...produit, prix: 1400 };', legend: [
              ['...panier', 'ÉTALE les éléments : comme si on avait vidé le tableau à cet endroit précis'],
              ['[...panier, "savon"]', 'la COPIE augmentée : nouveau tableau = ancien contenu + un élément, sans toucher l\'original'],
              ['{ ...produit, prix: 1400 }', 'même magie sur les objets : copier TOUTES les propriétés, puis écraser prix au passage'],
              ['le remède aux références', 'c\'est LA réponse au piège des références (fiche Objets) : crée un nouveau contenant au lieu de modifier l\'ancien']
            ]},
            { t: 'code', lang: 'js', code:
'const base = [1, 2];\nconst complet = [...base, 3, 4];              // [1,2,3,4]\nconst clone = { ...user, role: "admin" };     // copie + surcharge en une ligne\n\nMath.max(...notes);                            // étale le tableau en arguments\n\n// À l\'inverse, en PARAMÈTRE, ... rassemble (rest) :\nfunction journaliser(prefixe, ...messages) {\n  messages.forEach((m) => console.log(prefixe, m));\n}' },
            { t: 'p', h: 'Le même symbole, deux directions : en VALEUR, il étale (copie de tableau, fusion d\'objets, appels) ; en PARAMÈTRE, il rassemble. À retenir surtout : le spread crée des surfaces NEUVES sans mutation — c\'est le fondement du style « immuable » que ta future vie React/TanStack te rendra obligatoire.' },
            { t: 'h3', h: 'Optionnel et coalescent : ?. et ??' },
            { t: 'code', lang: 'js', code:
'reponse?.data?.utilisateur;      // ne plante pas si un maillon manque\n\nconst pseudo = input.value || "Invité";    // avale aussi "" et 0 — attention\nconst stock = saisie.value ?? 0;          // garde "" et 0, replie null/undefined' },
            { t: 'p', h: 'Contrastes à graver : `?.` sécurise la LECTURE profonde (ligne entière protégée), `??` sécurise le REPLI (seuls null/undefined déclenchent le défaut). Ils forment le duo anti-crash des données incertaines — réseau, configurations, saisies.' },
            { t: 'h3', h: 'Les classes : un sucre bienvenu sur les objets' },
            { t: 'code', lang: 'js', code:
'class Panier {\n  #total = 0;                    // propriété PRIVÉE (# : inaccessible dehors)\n\n  constructor(proprietaire) {\n    this.proprietaire = proprietaire;\n    this.articles = [];\n  }\n\n  ajouter(article, prix) {\n    this.articles.push(article);\n    this.#total += prix;\n    return this;\n  }\n\n  get total() { return this.#total; }\n}\n\nconst panierMoi = new Panier("Awa");\npanierMoi.ajouter("Gari", 3500).ajouter("Huile", 1200);\npanierMoi.total;   // 4700 — et #total reste à l\'abri des modifications directes' },
            { t: 'p', h: 'La classe n\'ajoute RIEN de fondamentalement neuf au langage : c\'est du sucre syntaxique par-dessus le mécanisme des prototypes d\'objets, pour écrire des « moules » lisibles. À retenir : `constructor` s\'exécute au `new`, les méthodes se partagent entre toutes les instances, et `#champ` rend une propriété réellement privée (protège un solde, un jeton d\'API). Pour des applications orientées composants ou des services à état, c\'est propre ; pour des fonctions utilitaires, l\'objet littéral et les fonctions pures restent roi — évite les classes « par principe ».' },
            { t: 'h3', h: 'Modules : un fichier = une unité' },
            { t: 'syntax', title: 'export / import : la circulation entre fichiers', lang: 'js', code:
'// utils.js\nexport const tva = m => m * 0.18;\n\n// app.js\nimport { tva } from "./utils.js";', legend: [
              ['export const tva', 'on EXPOSE explicitement ce que le fichier met à disposition — rien d\'autre n\'en sortira'],
              ['import { tva } from "…"', 'on RÉCLAME nommément ce dont on a besoin, avec le chemin relatif (./ = même dossier)'],
              ['les accolades', 'pour les exports NOMMÉS : import { tva, ttc }. L\'export default, lui, s\'importe sans accolades'],
              ['le bénéfice', 'fini les variables globales qui se marchent dessus : chaque fichier a son périmètre, chaque dépendance se trace']
            ]},
            { t: 'code', lang: 'js', code:
'// === utils.js ===\nexport const TVA = 0.18;\nexport function formaterPrix(n) { return n.toLocaleString("fr-FR") + " F"; }\nexport default class Panier { /* ... */ }\n\n// === app.js ===\nimport Panier, { TVA, formaterPrix } from "./utils.js";\n//          defaut     nommés' },
            { t: 'code', lang: 'html', label: 'Côté HTML', code:
'<script type="module" src="js/app.js"></script>\n<!-- defer implicite + mode strict + portée de module : que du bonus -->' },
            { t: 'p', h: 'Chaque module a sa PORTÉE propre (finies les collisions de globales entre fichiers) et déclare explicitement ce qu\'il expose (`export`) et consomme (`import`). Règles pratiques : le chemin DOIT commencer par `./` ou `/` (sinon le navigateur cherche un paquet) ; named imports reprennent les noms exacts, le default se renomme librement ; les modules se chargent comme defer (DOM prêt — rappel fiche DOM). Dernier point qui piège tout le monde : `file://` est refusé par CORS — lance un petit serveur local pendant le dev (extension Live Server, ou `npx serve`) ; en production, un vrai hébergement.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« || et ?? sont interchangeables. »** — Non : `||` replie aussi sur 0, "" et false (souvent légitimes !) ; `??` uniquement sur null/undefined. Faux ami n°1 de l\'ES2020.',
              '**« Backticks = apostrophes typographiques. »** — C\'est un caractère à part (AltGr + 7) ; ni \' ni " ne permettent l\'interpolation ni le multiligne.',
              '**« L\'import nommé peut inventer ses noms. »** — Les imports nommés DOIVENT reprendre les noms exportés (`{ TVA }`) ; seul le default se renomme à volonté.',
              '**« Les modules marchent en double-cliquant le HTML. »** — Non : CORS bloque les imports en `file://`. Il FAUT un serveur, même minuscule, pendant le développement.',
              '**« Une classe est obligatoire pour du « vrai » JS. »** — Non : dans la majorité des applications, fonctions + objets littéraux suffisent ; la classe sert quand un état encapsulé avec comportement devient le sujet principal.',
              '**« ES6+ exige Babel / un bundler. »** — Les navigateurs modernes le digèrent nativement ; le bundler sert à l\'optimisation et au JSX, pas à la compréhension du langage.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est la synthèse du bloc « Logique & données » : les variables (`let`/`const` sont nées là), les fonctions fléchées, le spread des tableaux, la destructuration des objets, `?.`/`??` des types… tout converge. Et elle ouvre la seconde moitié du module : les scripts en `type="module"` étant différés, le DOM sera prêt quand ton code s\'exécutera — exactement le sujet suivant.' },
            { t: 'callout', kind: 'tip', h: 'Résumé des réflexes « moderne » : backticks pour assembler du texte, spread pour copier sans mutation, destructuration dans les signatures de fonctions, ?./?? pour la donnée incertaine, et découpage en modules dès que le fichier dépasse quelques centaines de lignes.' }
          ],
          errors: [
            { title: 'Confondre || et ??', bad: 'const quantite = params.quantite || 1;\n// params.quantite === 0 -> on obtient 1, PAS 0 !', good: 'const quantite = params.quantite ?? 1;', why: '0 est falsy : || le remplace par le défaut alors que c\'est une valeur légitime. ?? ne déclenche le défaut que sur null/undefined.' },
            { title: 'Oublier le ./ dans l\'import', bad: 'import { a } from "utils.js";           // cherche un PAQUET npm', good: 'import { a } from "./utils.js";', why: 'Sans ./ ou /, le navigateur interprète le nom comme un paquet, pas un fichier : erreur de résolution. Le chemin relatif explicite est obligatoire en modules natifs.' }
          ],
          related: ['js-objets', 'js-tableaux', 'js-fonctions', 'js-asynchrone']
        }
      ]
    },

    {
      id: 'navigateur',
      name: 'Le navigateur',
      icon: 'web',
      fiches: [
        {
          id: 'js-dom',
          title: 'Le DOM',
          icon: 'account_tree',
          level: 'Intermédiaire',
          tagline: 'Sélectionner, créer, modifier les éléments de la page : le pont entre JS et HTML.',
          intro: 'Le **DOM** (Document Object Model) est la représentation vivante de ta page en mémoire : un arbre d\'objets que JavaScript peut interroger et transformer à volonté. Texte qui se met à jour, compteur qui s\'incrémente, carte qui apparaît sans recharger — tout ça, c\'est de la manipulation du DOM. Après cette fiche, tes pages cessent d\'être des documents : elles deviennent des applications.',
          blocks: [
            { t: 'h3', h: 'Le problème : faire bouger la page sans la recharger' },
            { t: 'p', h: 'Le HTML seul décrit une page FIGÉE : le serveur l\'envoie, le navigateur l\'affiche, fin de l\'histoire. Or tout ce qui rend une page utile arrive APRÈS : cliquer « + » sur un article du panier, filtrer le catalogue pendant la frappe, afficher « paiement MTN MoMo confirmé ». Ces changements n\'exigent ni rechargement ni nouveau HTML : ils consistent à modifier, en mémoire, l\'arbre que le navigateur a déjà construit. JS parle au DOM, le DOM se repeint, l\'utilisateur voit la page changer. C\'est ça, concrètement, le « web dynamique ».' },
            { t: 'h3', h: 'Sous le capot : de ton fichier HTML à un arbre d\'objets' },
            { t: 'p', h: 'Au chargement, le navigateur PARSE ton texte HTML et fabrique un arbre d\'objets : chaque balise devient un nœud avec ses propriétés (`textContent`, `className`, `children`…), accessible depuis la variable magique `document`. Quand tu modifies un de ces objets, le moteur relance (une partie de) son pipeline de rendu — tu as révisé le Layout/Paint du module CSS. Conséquence performance : les modifications groupées valent mieux que dix petites touchers (chaque changement visible peut recalculer la mise en page). Règle simple : **prépare tes éléments hors de l\'arbre, insère-les en une fois** ; le navigateur adore ça.' },
            { t: 'h3', h: 'Sélectionner : trouver ses éléments' },
            { t: 'syntax', title: 'Sélectionner, décortiqué', lang: 'js', code:
'const titre = document.querySelector("h1");\nconst cartes = document.querySelectorAll(".produit");\nconst panier = document.getElementById("panier");', legend: [
              ['document.querySelector("h1")', 'le PREMIER élément qui correspond au sélecteur CSS — ou null si rien ne correspond'],
              ['querySelectorAll(".produit")', 'TOUS les éléments correspondants, dans une liste parcourable avec forEach'],
              ['getElementById("panier")', 'le spécialiste de l\'id — ATTENTION : il veut le nu, sans #, contrairement au sélecteur CSS ("#panier")'],
              ['c\'est du CSS', 'tout sélecteur appris dans le module CSS fonctionne ici : ".produit .prix", "ul > li:first-child"… deux modules en un']
            ]},
            { t: 'code', lang: 'js', code:
'const titre = document.querySelector("h1");         // le PREMIER h1 trouvé\nconst boutons = document.querySelectorAll(".btn");  // TOUS les .btn (NodeList)\nconst champ = document.querySelector("#email");     // par id (le # du CSS !)\n\n// TOUS les sélecteurs du module CSS fonctionnent :\nconst premier = document.querySelector(".liste li:first-child");\nconst prixPromo = document.querySelectorAll(".carte[data-promo] .prix");' },
            { t: 'p', h: '`querySelector` (le premier) et `querySelectorAll` (tous, en NodeList statique itérable au forEach) sont LE standard : ils prennent n\'importe quel sélecteur CSS — ton investissement de la fiche Sélecteurs paie deux fois. Les vieilles méthodes `getElementById`/`getElementsByClassName` existent encore mais n\'apportent rien… sauf un piège : leurs collections sont « vivantes » et peuvent changer pendant ton parcours. NodeList est figée : aucune surprise.' },
            { t: 'h3', h: 'Lire et modifier le contenu' },
            { t: 'syntax', title: 'Modifier la page, propriété par propriété', lang: 'js', code:
'titre.textContent = "Nouveau catalogue";\ncarte.classList.add("promo");\nimg.src = "gari.jpg";', legend: [
              ['textContent', 'remplace le TEXTE brut — sûr par nature, car jamais interprété comme du HTML (contrairement à innerHTML)'],
              ['classList.add("promo")', 'pilote les CLASSES au lieu d\'écrire du style à la main : le visuel reste dans le CSS (remove et toggle existent aussi)'],
              ['img.src = …', 'les attributs HTML deviennent des PROPRIÉTÉS modifiables : src, href, value, disabled…'],
              ['l\'effet immédiat', 'chaque affectation rafraîchit l\'écran EN DIRECT — pas de rechargement, c\'est toute la magie du DOM']
            ]},
            { t: 'code', lang: 'js', code:
'const carte = document.querySelector(".carte");\n\ncarte.textContent;               // le TEXTE brut (lecture / écriture)\ncarte.innerHTML;                 // le HTML interprété (attention, encadré)\n\ntitre.textContent = "Boutique Awa - Soldes";   // remplace le texte, safe\n\n// Les classes : la vraie bonne manière de changer l\'apparence\ncarte.classList.add("en-promo");\ncarte.classList.remove("epuise");\ncarte.classList.toggle("ouverte");      // ajoute si absente, retire sinon\ncarte.classList.contains("en-promo");   // true / false' },
            { t: 'p', h: 'Face à trois outils, voici la hiérarchie pro. 1) **classList** pour TOUT ce qui est visuel : la mise en forme vit dans le CSS (fichier maintenable, thèmes, responsive), JS ne fait que dire « dans quel état on est ». 2) **textContent** pour le texte — toujours pour la donnée venant des utilisateurs. 3) **innerHTML** en dernier recours, uniquement pour du contenu que tu contrôles de bout en bout. Note aussi le réflexe dataset pour lire les marqueurs posés dans le HTML :' },
            { t: 'code', lang: 'js', code:
'// <article class="carte" data-id="42" data-prix="3500">...</article>\nconst carte2 = document.querySelector(".carte");\ncarte2.dataset.id;     // "42"  (toujours des CHAÎNES : convertis si besoin)\ncarte2.dataset.prix;   // "3500"\n\nconst img = document.querySelector("img");\nimg.src = "photo-gari.png";              // les attributs deviennent des propriétés\nimg.setAttribute("alt", "Sac de gari premium");\n\n// Formulaire : .value lit et écrit le contenu saisi\nconst email = document.querySelector("#email").value;' },
            { t: 'callout', kind: 'warn', h: 'N\'injecte JAMAIS de saisie utilisateur via `innerHTML` : le texte est interprété comme du HTML et un simple message piégé peut exécuter du code dans ta page (attaque XSS). `textContent` affiche la saisie en toute sécurité. Et `innerHTML +=` de reboucle reparse TOUT le conteneur — détruisant les écouteurs posés sur les enfants (voir fiche Événements).' },
            { t: 'h3', h: 'Créer et insérer des éléments' },
            { t: 'syntax', title: 'Créer puis insérer, décortiqué', lang: 'js', code:
'const li = document.createElement("li");\nli.textContent = "Gari premium";\nliste.append(li);', legend: [
              ['document.createElement("li")', 'fabrique l\'élément EN MÉMOIRE : il n\'existe nulle part dans la page tant qu\'on ne l\'a pas inséré'],
              ['li.textContent = …', 'on le remplit tranquillement HORS écran : toutes les retouches avant la mise en vitrine'],
              ['liste.append(li)', 'l\'INSERTION finale, à la fin du parent (prepend existe pour le début) — un seul mouvement, page fluide'],
              ['le trio à retenir', 'créer → remplir → insérer : toujours dans cet ordre, jamais d\'élément à moitié vide montré au public']
            ]},
            { t: 'code', lang: 'js', code:
'const liste = document.querySelector("ul.courses");\n\n// 1. Créer en mémoire (hors de l\'arbre = pas de recalculs)\nconst item = document.createElement("li");\nitem.textContent = "Gari premium - 3500 F";\nitem.classList.add("article");\n\n// 2. Insérer une seule fois\nliste.append(item);          // a la FIN du parent\nliste.prepend(item);         // au tout DEBUT (le même nœud est DÉPLACÉ)\n\n// Variante HTML plein texte, position chirurgicale :\nliste.insertAdjacentHTML("afterbegin", "<li>Pain singo</li>");\n\nitem.remove();               // supprimer un élément de la page' },
            { t: 'p', h: 'Note le détail « déplacé » : un nœud ne peut exister qu\'à UN endroit — appeler `append` avec un élément déjà présent le TÉLÉPORTE, sans copie. Pour dupliquer, `element.cloneNode(true)` (copie profonde). Et pour du volume (une vingtaine de cartes produits), la balise `<template>` du HTML offre le moule idéal : `template.content.cloneNode(true)` à remplir puis insérer — même principe « hors arbre, insérer une fois ».' },
            { t: 'h3', h: 'Se déplacer dans l\'arbre' },
            { t: 'code', lang: 'js', code:
'carte.parentElement;                    // le parent\ncarte.closest(".page-produits");        // l\'ANCÊTRE le plus proche qui matche\nArray.from(carte.children);             // les enfants (convertis en tableau)\ncarte.nextElementSibling;               // le frère suivant' },
            { t: 'p', h: '`closest()` est une pépite : « remonte les parents jusqu\'à trouver tel sélecteur ». C\'est l\'outil de la délégation d\'événements (fiche suivante) et de tout clic dont tu veux retrouver la carte parente — par rapport à `parentElement.parentElement...` qui casse au premier changement de structure.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Le script peut chercher le HTML tout de suite. »** — Un script classique s\'exécute PENDANT la lecture du document : le `<body>` n\'existe pas encore et querySelector renvoie null. Solutions : `defer` (fiche head HTML), `type="module"`, ou l\'événement DOMContentLoaded.',
              '**« innerHTML += est pratique pour ajouter. »** — += RETRAIT et recrée tous les enfants : les écouteurs posés dessus sont détruits, les saisies en cours perdues. Crée et append un VRAI élément à la place.',
              '**« style.ma-prop = « x » suffit pour tout. »** — Le style inline court-circuite ton CSS (spécificité maximale !) et part dans tous les sens. classList garde la mise en forme là où elle doit vivre : la feuille de style.',
              '**« querySelectorAll renvoie un tableau. »** — C\'est une NodeList : forEach existe, mais pas map/filter — convertis d\'abord : `[...document.querySelectorAll("p")]` ou Array.from().',
              '**« Modifier le DOM recharge la page. »** — C\'est tout l\'inverse : le DOM change sans rechargement, et c\'est ce qui permet les apps web modernes.',
              '**« dataset.prix me donne un nombre. »** — Tout est CHAÎNE dans le HTML : Number(li.dataset.prix) avant tout calcul (rappel fiche Types).'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche est la jonction des trois modules : le HTML fournit les balises et les data-*, le CSS les sélecteurs (querySelector) et prendra le relai visuel via classList, et le JS y applique types (`Number()`), conditions, boucles (créer N cartes depuis un tableau !), objets (dataset) et fonctions (callbacks partout). La suite logique est irrésistible : maintenant que tes éléments bougent, ils doivent RÉAGIR aux gestes de l\'utilisateur — les événements.' },
            { t: 'callout', kind: 'tip', h: 'Recette des listes vivantes : garde tes données dans un tableau JS (source de vérité), et écris une fonction `afficher()` qui reconstruit la liste à partir du tableau à chaque changement. Un seul chemin de mise à jour = zéro désynchronisation — l\'idée qui inspirera React plus tard.' }
          ],
          errors: [
            { title: 'querySelector sur un élément pas encore chargé', bad: 'const btn = document.querySelector("#valider");\nbtn.addEventListener(...);  // TypeError: btn is null', good: '<script defer src="app.js"></script>\n// ou wrapper :\ndocument.addEventListener("DOMContentLoaded", () => {\n  document.querySelector("#valider").addEventListener(...);\n});', why: 'Un script sans defer s\'exécute AVANT que le navigateur ait lu le `<body>` : le DOM est vide. defer garantit l\'exécution après le parsing complet.' },
            { title: 'innerHTML += dans une boucle d\'ajout', bad: 'for (const p of produits) {\n  zone.innerHTML += "<p>" + p.nom + "</p>";  // reparse tout a chaque tour\n}', good: 'const items = produits.map((p) => {\n  const el = document.createElement("p");\n  el.textContent = p.nom;\n  return el;\n});\nzone.append(...items);', why: '+= recrée tous les enfants à chaque passage : destruction des écouteurs, pertes de saisie, recalculs en cascade. Créer hors arbre puis insérer une fois est plus sûr ET plus rapide.' }
          ],
          related: ['js-evenements', 'html-semantique', 'html-head', 'js-fetch']
        },

        {
          id: 'js-evenements',
          title: 'Événements',
          icon: 'touch_app',
          level: 'Intermédiaire',
          tagline: 'click, input, submit… écouter et réagir, avec la délégation qui change tout.',
          intro: 'Une page web est une conversation : l\'utilisateur clique, tape, fait défiler — et ton code répond. Les événements sont le canal de cette conversation : on « écoute » un élément, et quand quelque chose s\'y produit, une fonction s\'exécute. Le jour où ce mécanisme devient naturel chez toi, tu contrôles littéralement toute l\'interactivité du web.',
          blocks: [
            { t: 'h3', h: 'Le problème : le code doit attendre l\'humain' },
            { t: 'p', h: 'Jusqu\'ici, ton code s\'exécutait d\'un trait, du haut vers le bas. Mais le bouton « Payer » ne sait pas quand le client cliquera — dans une seconde, jamais, dix fois de suite avec un réseau capricieux ? Impossible de l\'écrire en ligne droite. Le modèle événementiel inverse le rapport : ton code ENREGISTRE des fonctions de rappel (« si un clic arrive ICI, appelle ça »), puis se tait ; le navigateur joue le standardiste et déclenche chaque rappel quand son événement survient. Ton script ne décide plus du QUAND — il prépare le QUOI.' },
            { t: 'h3', h: 'addEventListener : la seule méthode à retenir' },
            { t: 'syntax', title: 'addEventListener, décortiqué', lang: 'js', code:
'btn.addEventListener("click", () => {\n  compteurEl.textContent = "+1 article";\n});', legend: [
              ['btn.addEventListener', 'on ABONNE l\'élément à un type d\'événement : l\'élément écoute, le navigateur le réveillera le moment venu'],
              ['"click"', 'le TYPE d\'événement entre guillemets : click, input, submit, keydown, scroll…'],
              ['() => {…}', 'le GESTIONNAIRE : la fonction exécutée quand l\'événement arrive — ton code passe le relais au navigateur'],
              ['le modèle mental', '« quand IL se passe ça SUR ça, fais ça » : élément . écouter ( quoi , réaction ) — tout l\'événementiel tient dans cette phrase'],
              ['débrayable', 'plusieurs écouteurs sur le même événement, possible ; removeEventListener existe pour se désabonner proprement']
            ]},
            { t: 'code', lang: 'js', code:
'const bouton = document.querySelector("#commander");\n\nbouton.addEventListener("click", () => {\n  console.log("Commande envoyée !");\n});\n\n// Avec l\'objet événement en paramètre :\nbouton.addEventListener("click", (event) => {\n  console.log(event.target);          // l\'élément RÉELLEMENT cliqué\n  console.log(event.currentTarget);   // l\'élément ÉCOUTÉ (ici, bouton)\n});' },
            { t: 'p', h: 'Pourquoi `addEventListener` plutôt que l\'attribut `onclick="..."` vu en vieilleries ? Trois raisons : la séparation propre (le JS reste hors du HTML), la possibilité d\'empiler PLUSIEURS réactions sur le même événement, et le retrait propre via `removeEventListener`. L\'attribut onclick n\'accepte qu\'un seul gestionnaire, qui écrase le précédent. Ancien réflexe, nouvelle habitude.' },
            { t: 'h3', h: 'L\'objet événement : tout savoir sur ce qui vient de se passer' },
            { t: 'p', h: 'Chaque gestionnaire reçoit un objet `event` rempli d\'informations. Les champs du quotidien : `target` (élément réellement atteint — pas forcément celui que tu écoutes), `currentTarget` (celui que tu écoutes), `key` (la touche pour les événements clavier), `preventDefault()` et `stopPropagation()` dont on reparle plus bas. La distinction target/currentTarget est LE piège préféré : clique sur le `<strong>Accepter</strong>` DANS un bouton, et `target` vaut le strong, `currentTarget` le bouton. C\'est exactement pour ça que la délégation utilise `closest` (tout à l\'heure).' },
            { t: 'h3', h: 'Les événements du quotidien' },
            { t: 'table', head: ['Événement', 'Se déclenche quand'], rows: [
              ['`click`', 'Clic / tap sur un élément (clavier inclus : Entrée sur un bouton)'],
              ['`input`', 'Chaque frappe dans un champ (recherche instantanée !)'],
              ['`change`', 'Un champ perd le focus APRÈS modification (select, cases, dates)'],
              ['`submit`', 'Envoi d\'un formulaire'],
              ['`keydown` / `keyup`', 'Touche pressée / relâchée'],
              ['`focus` / `blur`', 'Un champ gagne / perd le focus (validation à la volée)'],
              ['`scroll` (sur window)', 'Défilement de la page'],
              ['`DOMContentLoaded`', 'Le HTML est entièrement lu (scripts sans defer)']
            ]},
            { t: 'h3', h: 'Formulaires : submit et preventDefault' },
            { t: 'syntax', title: 'submit + preventDefault, décortiqué', lang: 'js', code:
'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const saisie = champ.value.trim();\n});', legend: [
              ['"submit" sur le form', 'l\'événement du FORMULAIRE (pas du bouton !) — il capte aussi la touche Entrée tapée dans un champ'],
              ['e.preventDefault()', 'BLOQUE le comportement par défaut (le rechargement de la page) : tu gardes la main en JavaScript'],
              ['champ.value', 'le contenu actuel d\'un champ — TOUJOURS une string : Number(champ.value) si tu veux calculer avec'],
              ['.trim()', 'retire les espaces aux deux bouts : le réflexe hygiène avant toute validation de saisie'],
              ['e, le témoin', 'l\'objet ÉVÉNEMENT : tout ce qui vient de se passer (touche tapée, élément cliqué, coordonnées…) t\'est raconté là']
            ]},
            { t: 'code', lang: 'js', code:
'const form = document.querySelector("form");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();        // EMPÊCHE le rechargement de la page\n  const email = form.email.value.trim();\n  if (!email.includes("@")) {\n    afficherErreur("E-mail invalide");\n    return;\n  }\n  envoyerAuServeur(email);\n});' },
            { t: 'p', h: 'Par défaut, l\'envoi d\'un formulaire RECHARGE la page (comportement historique) — effaçant ton état JS, ta saisie, tout. `preventDefault()` suspend ce comportement natif pour le remplacer par ta logique : validation, envoi en `fetch`, message personnalisé. Même médicament pour les liens factices `<a href="#">` détournés en boutons. Le savoir-culture : `preventDefault` n\'arrête PAS la propagation ; ce sont deux mécanismes distincts.' },
            { t: 'h3', h: 'Propagation : l\'événement qui monte les étages' },
            { t: 'p', h: 'Sous le capot, un clic traverse trois phases : il descend de la fenêtre jusqu\'à la cible (capture), atteint la cible, puis REMONTE de parent en parent jusqu\'à la fenêtre (**bubbling**). Conséquence directe : un écouteur posé sur le parent entend les clics de toute sa descendance — c\'est le fondement de la délégation juste après. `event.stopPropagation()` coupe la remontée (une modale dont on veut « cliquer dehors pour fermer » mais pas à travers elle), mais ménage-la : elle empêche les autres mécanismes légitimes (délégation parentale, fermeture générale de fenêtres) de fonctionner.' },
            { t: 'h3', h: 'La délégation : UN écouteur au lieu de cent' },
            { t: 'syntax', title: 'La délégation d\'événements, décortiquée', lang: 'js', code:
'liste.addEventListener("click", (e) => {\n  if (e.target.matches(".supprimer")) {\n    e.target.closest("li").remove();\n  }\n});', legend: [
              ['UN écouteur sur le parent', 'grâce à la propagation, le clic sur n\'importe quel enfant REMONTE jusqu\'à la liste : un seul guetteur suffit'],
              ['e.target', 'l\'élément RÉELLEMENT cliqué — pas forcément celui qui écoute : c\'est toute la différence de la délégation'],
              ['matches(".supprimer")', 'le FILTRE : « l\'élément cliqué correspond-il à ce sélecteur ? » — sinon on ignore'],
              ['closest("li")', 'remonte au plus proche ancêtre li : parfait pour supprimer la ligne entière même si on a cliqué l\'icône du bouton'],
              ['le bonus', 'les éléments ajoutés PLUS TARD (nouvel article du panier) sont couverts d\'office — aucun réabonnement à gérer']
            ]},
            { t: 'code', lang: 'js', code:
'// Le pattern des listes vivantes : écouter le PARENT,\n// puis identifier l\'enfant cliqué via closest()\ndocument.querySelector(".liste-produits").addEventListener("click", (event) => {\n  const carte = event.target.closest(".carte");\n  if (!carte || !event.currentTarget.contains(carte)) return;  // clic dehors\n\n  const id = carte.dataset.id;\n  if (event.target.closest(".btn-supprimer")) {\n    supprimerProduit(id);\n  } else {\n    ouvrirFiche(id);\n  }\n});' },
            { t: 'p', h: 'Deux avantages énormes : 1) **un seul** écouteur au lieu d\'un par carte (mémoire, clarté) ; 2) les cartes **ajoutées plus tard** (par fetch, par le DOM) fonctionnent instantanément, puisque l\'écouteur vit sur le parent toujours présent. C\'est LA technique des todo lists, tableaux de données, galeries de la Boutique Awa — et derrière le rideau, c\'est exactement ce raisonnement qu\'emploient les frameworks modernes.' },
            { t: 'h3', h: 'Aller plus loin : once, retrait, clavier, événements qui fusent' },
            { t: 'code', lang: 'js', code:
'// Ne s\'exécuter qu\'UNE fois :\nbouton.addEventListener("click", lancer, { once: true });\n\n// Retirer un écouteur exige la RÉFÉRENCE exacte de la fonction :\nfunction auClic() { /* ... */ }\nbouton.addEventListener("click", auClic);\nbouton.removeEventListener("click", auClic);   // OK\n// bouton.removeEventListener("click", () => {...})  // IMPOSSIBLE : autre référence !\n\n// Raccourci clavier global (Ctrl/Cmd + K = recherche)\ndocument.addEventListener("keydown", (e) => {\n  if ((e.ctrlKey || e.metaKey) && e.key === "k") {\n    e.preventDefault();\n    ouvrirRecherche();\n  }\n});' },
            { t: 'p', h: 'Enfin, les événements qui fusent — `scroll`, `input` d\'une recherche, `resize` — peuvent lancer des centaines d\'appels par seconde. L\'arme s\'appelle le **debounce** : n\'exécuter la logique coûteuse que lorsque l\'utilisateur a FINI (un `setTimeout` relancé à chaque frappe ; 300 ms est un réglage confortable). Ta recherche instantanée arrête de marteler l\'API à chaque lettre.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« addEventListener("click", traiter()) est bon. »** — Les parenthèses l\'exécutent IMMÉDIATEMENT ; on passe la référence `traiter` (ou une flèche enveloppe si des arguments sont requis).',
              '**« event.target est l\'élément écouté. »** — Non : c\'est l\'élément RÉELLEMENT cliqué, potentiellement un petit-enfant. L\'écouté, c\'est currentTarget ; et closest() retrouve l\'intention.',
              '**« Un deuxième addEventListener remplace le premier. »** — Non : ils S\'ADDITIONNENT, dans l\'ordre. Seul l\'ancien attribut onclick écrase.',
              '**« removeEventListener avec la même flèche anonyme marche. »** — Impossible : la référence est différente à chaque écriture. Il faut une fonction NOMMÉE, gardée en variable.',
              '**« preventDefault et stopPropagation font la même chose. »** — Deux mondes : l\'un bloque le COMPORTEMENT natif (navigation, rechargement), l\'autre arrête la REMONTÉE vers les parents. Tu peux utiliser l\'un sans l\'autre.',
              '**« Les écouteurs ralentissent si j\'en mets plein. »** — Ce qui coûte, ce sont ceux qui TRAVAILLENT intensément (scroll, input sans debounce) ; cent écouteurs-endormis ne pèsent rien… mais la délégation reste plus propre.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tout le fil s\'assemble : les gestionnaires sont des FONCTIONS passées comme valeurs (fiche Fonctions) ; la cible se retrouve via le DOM (`closest`, `dataset`) ; la validation de formulaire conjugue CONDITIONS et types (`Number()`, `.trim()`). La propagation rejoint la logique du DOM-parent-enfant de la fiche précédente. Et les callbacks événementiels sont la forme la plus simple de l\'asynchrone — « appelle-moi plus tard » — qui atteindra sa pleine mesure dans trois fiches.' },
            { t: 'callout', kind: 'tip', h: 'Pour les événements qui fusent (`scroll`, `input` d\'une recherche, `resize`), pense au **debounce** : n\'exécuter la logique que lorsque l\'utilisateur a fini. Un setTimeout relancé à chaque frappe suffit — 300 ms est un réglage confortable.' }
          ],
          errors: [
            { title: 'Appeler la fonction au lieu de la passer', bad: 'bouton.addEventListener("click", traiter());', good: 'bouton.addEventListener("click", traiter);\n// avec arguments :\nbouton.addEventListener("click", () => traiter(id));', why: 'traiter() s\'exécute IMMÉDIATEMENT et l\'écouteur reçoit son résultat (souvent undefined). On passe la référence ; le navigateur décidera du moment de l\'appel.' },
            { title: 'Oublier preventDefault sur un submit ou un lien', bad: 'form.addEventListener("submit", () => {\n  verifier();   // ...et la page RECHARGE quand même, effaçant tout\n});', good: 'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  verifier();\n});', why: 'Le comportement natif (navigation / rechargement) part avant même que ta logique ait fini. preventDefault est la première ligne de tout gestionnaire custom.' }
          ],
          related: ['js-dom', 'html-formulaires', 'js-fonctions', 'js-erreurs']
        },

        {
          id: 'js-fetch',
          title: 'fetch & API',
          icon: 'api',
          level: 'Avancé',
          tagline: 'Dialoguer avec un serveur : GET, POST, JSON, en-têtes et gestion des erreurs réseau.',
          intro: 'La page livrée au navigateur n\'est souvent qu\'une coquille : les données arrivent après, demandées à un serveur — produits, solde du compte, messages, météo de Cotonou. `fetch` est l\'outil natif de ces dialogues HTTP : il envoie une requête et te notifie de la réponse. Associé à `async/await`, il rend les appels réseau presque aussi simples à lire que du code synchrone… à condition d\'en connaître les trois pièges fondateurs.',
          blocks: [
            { t: 'h3', h: 'Le problème : les données vivent ailleurs' },
            { t: 'p', h: 'Persuader tous les prix de la Boutique Awa EN DUR dans le HTML fonctionne… jusqu\'au premier changement de prix — qui exigerait de régénérer toutes les pages. La vraie architecture sépare : le serveur garde les données (base produits), la page les DEMANDE au moment voulu. C\'est le principe des API : un programme expose des URLs de données, ton fetch les consomme. Exactement ce que fait ton téléphone quand l\'appli MTN affiche ton solde actualisé : rien n\'est stocké dans l\'écran, tout est interrogé à la demande.' },
            { t: 'h3', h: 'Sous le capot : une requête HTTP, c\'est quoi ?' },
            { t: 'p', h: 'Quand fetch part, il envoie un message structuré : une **méthode** (l\'intention : GET, POST…), une **URL**, des **en-têtes** (méta : type de contenu, jeton d\'authentification), parfois un **corps** (les données envoyées). Le serveur répond par un message structuré pareil : un **statut** (200 tout va bien, 404 introuvable, 500 panne serveur), des en-têtes, et un corps — presque toujours du **texte JSON**. Retiens la symétrie : à l\'envoi, `JSON.stringify()` convertit ton objet en texte ; à la réception, `response.json()` convertit le texte en objet JS. Ce ne sont que des allers-retours de texte au bon format.' },
            { t: 'h3', h: 'Le cycle complet d\'une requête GET' },
            { t: 'syntax', title: 'fetch en deux await, décortiqué', lang: 'js', code:
'const reponse = await fetch("/api/produits");\nconst produits = await reponse.json();', legend: [
              ['fetch("/api/produits")', 'envoie la requête HTTP et renvoie une PROMESSE de réponse — le réseau prend le temps qu\'il prend'],
              ['await', 'met la fonction en pause JUSQU\'AU résultat, sans geler la page — uniquement autorisé dans une fonction async'],
              ['reponse.json()', 'décode le CORPS de la réponse en données JS (objets, tableaux) : lui aussi est une promesse, d\'où le second await'],
              ['attention au 404', 'fetch n\'échoue que sur panne RÉSEAU : une réponse 404 ou 500 doit être testée soi-même avec reponse.ok']
            ]},
            { t: 'code', lang: 'js', code:
'async function chargerProduits() {\n  try {\n    const reponse = await fetch("https://api.exemple.bj/produits");\n\n    if (!reponse.ok) {                     // 404, 500... arrivent ICI\n      throw new Error("HTTP " + reponse.status);\n    }\n\n    const produits = await reponse.json();  // texte JSON -> tableau d\'objets\n    afficherProduits(produits);\n  } catch (erreur) {\n    console.error("Chargement impossible :", erreur);\n    afficherMessage("Vérifie ta connexion et réessaie.");\n  }\n}\nchargerProduits();' },
            { t: 'p', h: 'Trois étapes à mémoriser comme un récit : `fetch()` envoie et rend une PROMESSE de réponse ; on vérifie `response.ok` soi-même (piège n°1 : fetch ne rejette PAS sur un 404 — seuls les vrais échecs réseau déclenchent le catch) ; `response.json()` parse le corps, ce qui est AUSSI asynchrone (piège n°2 : un deuxième `await` obligatoire). Trois étapes, deux await, un contrôle manuel du statut : ce squelette couvre 95 % de tes requêtes.' },
            { t: 'h3', h: 'Envoyer des données : POST et JSON' },
            { t: 'syntax', title: 'POST + JSON : le trio indissociable', lang: 'js', code:
'await fetch("/api/commandes", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(commande)\n});', legend: [
              ['method: "POST"', 'le VERBE : GET lit (la valeur par défaut), POST crée, PUT/PATCH modifient, DELETE supprime'],
              ['headers', 'les EN-TÊTES : Content-Type annonce le format du corps — c\'est lui qui indique au serveur comment décoder'],
              ['JSON.stringify(commande)', 'SÉRIALISE l\'objet JS en texte JSON : le réseau ne transporte que du texte, pas des objets vivants'],
              ['le trio', 'POST + Content-Type json + stringify : oublie l\'un des trois et le serveur reçoit du charabia… ou rien'],
              ['au retour', 'souvent le serveur répond la ressource créée : const data = await reponse.json() te la remet entre les mains']
            ]},
            { t: 'code', lang: 'js', code:
'const reponse = await fetch("https://api.exemple.bj/commandes", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer " + jeton      // si l\'API exige un jeton\n  },\n  body: JSON.stringify({\n    produitId: 42,\n    quantite: 2,\n    paiement: "mtn-momo"\n  })\n});' },
            { t: 'p', h: 'Oublie `body: monObjet` direct : il voyagerait sous la forme du texte inutile « [object Object] ». Le trio correct : `JSON.stringify` pour sérialiser + l\'en-tête `Content-Type: application/json` pour que le serveur sache comment le relire + éventuellement `Authorization` si un jeton d\'authentification est exigé. Pour un upload de fichier ou un formulaire classique, on utiliserait `FormData` à la place de JSON — le navigateur fabrique alors l\'en-tête lui-même (ne le redéfinis donc pas dans ce cas).' },
            { t: 'h3', h: 'Verbes HTTP et codes de statut : la carte minute' },
            { t: 'table', head: ['Méthode', 'Intention', 'Corps ?'], rows: [
              ['`GET` (défaut)', 'Lire une ressource', 'Non'],
              ['`POST`', 'Créer une ressource / lancer une action', 'Oui'],
              ['`PUT` / `PATCH`', 'Remplacer / modifier partiellement', 'Oui'],
              ['`DELETE`', 'Supprimer une ressource', 'Rarement']
            ]},
            { t: 'table', head: ['Statut', 'Signification'], rows: [
              ['`200` / `201`', 'Succès / créé avec succès'],
              ['`400`', 'Ta requête est mal formée (lis le corps, il explique souvent)'],
              ['`401` / `403`', 'Non authentifié / authentifié mais interdit'],
              ['`404`', 'Ressource introuvable'],
              ['`500`', 'Panne côté serveur — retente plus tard, signale']
            ]},
            { t: 'h3', h: 'L\'UI de l\'attente : les TROIS états obligatoires' },
            { t: 'code', lang: 'js', code:
'async function chargerCatalogue() {\n  const zone = document.querySelector("#catalogue");\n  zone.innerHTML = "<p class=\'skeleton\'>Chargement du catalogue…</p>";  // 1\n  try {\n    const reponse = await fetch(url);\n    if (!reponse.ok) throw new Error("HTTP " + reponse.status);\n    const produits = await reponse.json();\n    zone.innerHTML = produits.map(carteHTML).join("");                    // 2\n  } catch {\n    zone.innerHTML = "<p>Chargement impossible. " +\n                     "<button onclick=\'chargerCatalogue()\'>Réessayer</button></p>";  // 3\n  }\n}' },
            { t: 'p', h: 'Sur une 4G capricieuse au beau milieu de Dantokpa, la requête peut prendre cinq secondes — ou échouer. Un écran vide pendant ce temps ressemble à une page cassée ; un spinner qui tourne éternellement est pire. D\'où la discipline des trois états : **chargement** (skeleton/spinner), **succès** (les données), **erreur** (message + bouton réessayer). C\'est aussi une question d\'honnêteté interface : l\'utilisateur sait toujours où il en est.' },
            { t: 'h3', h: 'Annuler une requête : AbortController' },
            { t: 'code', lang: 'js', code:
'const controleur = new AbortController();\nsetTimeout(() => controleur.abort(), 5000);   // timeout maison : 5 s max\n\ntry {\n  const rep = await fetch(url, { signal: controleur.signal });\n} catch (e) {\n  if (e.name === "AbortError") {\n    afficherMessage("Délai dépassé : réseau trop lent, réessaie.");\n  }\n}' },
            { t: 'p', h: '`AbortController` est aussi l\'outil des recherches instantanées : chaque nouvelle frappe annule la requête précédente partie pour l\'ancienne saisie — finies les réponses qui arrivent dans le désordre et écrasent le résultat frais. Un pattern simple qui change la fiabilité perçue d\'une recherche.' },
            { t: 'h3', h: 'CORS : pourquoi le navigateur dit non « pour ton bien »' },
            { t: 'p', h: 'Tôt ou tard tu rencontreras l\'erreur rouge CORS. Ce qui se passe : par sécurité, un navigateur interdit à une page du domaine A de lire des réponses du domaine B **sauf si B l\'autorise explicitement** (en-tête `Access-Control-Allow-Origin`). Sinon, n\'importe quel site malveillant pourrait lire tes données bancaires via ton navigateur connecté. Conséquences pratiques : tu ne peux pas corser de force côté client (c\'est le SERVEUR qui décide) ; `file://` est traité comme une origine douteuse, d\'où les modules et fetch bloqués en double-cliquant ton HTML — serveur local obligatoire pendant le dev.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« fetch renvoie les données. »** — Il renvoie une PROMESSE de réponse ; et la réponse exige encore son .json(), lui-même promis. D\'où : deux await, pas un.',
              '**« Une 404 fait sauter dans le catch. »** — Non : la requête a parfaitement réussi À ATTEINDRE le serveur ; fetch ne rejette que sur échec réseau. Le statut se teste soi-même via response.ok.',
              '**« body: monObjet envoie mon objet. »** — Il envoie « [object Object] ». JSON.stringify est obligatoire, avec le Content-Type qui va avec.',
              '**« Le JSON reçu est un objet. »** — C\'est du TEXTE tant que response.json() (ou JSON.parse) ne l\'a pas reconverti ; l\'injection directe dans le DOM donne le fameux [object Object], objet de tant de captures d\'écran honteuses.',
              '**« Une erreur CORS se contourne côté navigateur. »** — Non : elle se CORRÈGE côté serveur (en-têtes d\'autorisation). Côté client, tu ne peux qu\'y faire face proprement.',
              '**« Sans réseau, fetch attend éternellement. »** — Il rejette vite sur réseau coupé ; mais un réseau MOU peut traîner sans jamais échouer — d\'où le timeout maison d\'AbortController.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tout ce que tu as appris se cristallise ici : les promesses (fiche suivante, la contrepartie théorique de ce que fetch applique), les objets (le JSON qui navigue), les erreurs (try/catch vus en entier), le DOM (afficher les trois états UI), et les fonctions asynchrones (la syntaxe `async` devant ton chargement). La fiche Asynchrone à suivre est le manuel du moteur que fetch fait tourner depuis toujours.' },
            { t: 'callout', kind: 'warn', h: 'Toujours penser les TROIS états : chargement, succès, erreur. Un spinner sans fin sur une connexion capricieuse est la signature d\'un catch oublié — l\'utilisateur doit savoir ce qui se passe, sinon il clique en boucle et empire tout.' }
          ],
          errors: [
            { title: 'Oublier le await sur response.json()', bad: 'const data = fetch(url).json();\nconsole.log(data.nom);   // undefined : data est une PROMESSE', good: 'const rep = await fetch(url);\nconst data = await rep.json();\nconsole.log(data.nom);', why: 'fetch ET .json() sont asynchrones : chacun renvoie une promesse qu\'il faut attendre. Deux await, pas un.' },
            { title: 'Croire que fetch rejette sur une 404', bad: 'try {\n  const rep = await fetch(url);   // 404 -> PAS de catch !\n  afficher((await rep.json()));    // JSON d\'erreur affiché n\'importe comment\n} catch { }', good: 'if (!rep.ok) throw new Error("HTTP " + rep.status);', why: 'fetch ne rejette que si la REQUÊTE n\'a pas pu partir (réseau coupé, DNS). Une réponse HTTP d\'erreur est une réponse normale : il faut tester response.ok soi-même.' }
          ],
          related: ['js-asynchrone', 'js-objets', 'js-erreurs', 'html-formulaires']
        },

        {
          id: 'js-asynchrone',
          title: 'Asynchrone : promesses, async/await',
          icon: 'schedule',
          level: 'Avancé',
          tagline: 'setTimeout, Promise, async/await : comprendre enfin le code « qui ne s\'exécute pas dans l\'ordre ».',
          intro: 'JavaScript ne peut pas « attendre les bras croisés » : pendant un téléchargement de trois secondes, la page doit rester fluide, cliquable, vivante. La solution : lancer les tâches longues sans bloquer et être prévenu à leur fin. Ce modèle — l\'asynchrone — est LA notion qui déroute le plus les débutants, et celle qui débloque définitivement tout le reste. On va le construire pièce par pièce, de la constatation étrange jusqu\'au moteur interne.',
          blocks: [
            { t: 'h3', h: 'Le constat qui déroute : l\'ordre d\'exécution n\'est pas l\'ordre d\'écriture' },
            { t: 'code', lang: 'js', code:
'console.log("1. Début");\n\nsetTimeout(() => {\n  console.log("2. Minuteur terminé");\n}, 1000);                       // demandée pour dans 1 seconde\n\nconsole.log("3. Fin");\n\n// Affichage : 1. Début  →  3. Fin  →  (1 s plus tard) 2. Minuteur terminé' },
            { t: 'p', h: '`setTimeout(fn, ms)` ne dort PAS une seconde puis exécute : il **planifie** fn pour plus tard et rend la main immédiatement — le script continue sa route. C\'est le même mécanisme pour les événements (« clique quand tu veux ») et pour le réseau (« reviens quand la réponse arrive »). Ton programme principal ne s\'arrête JAMAIS d\'attendre : c\'est la caractéristique qui rend le web fluide… et la source de la confusion nommée « mon code s\'exécute dans le désordre ».' },
            { t: 'h3', h: 'Sous le capot : la boucle d\'événements en trois images' },
            { t: 'p', h: 'Image 1 : JavaScript ne sait faire qu\'**une chose à la fois** (une seule « pile d\'appels »). Image 2 : les tâches longues (timers, réseau, clic) sont gérées par le NAVIGATEUR, en parallèle du JS ; quand elles finissent, elles déposent ton callback dans une **file d\'attente**. Image 3 : la **boucle d\'événements** (event loop) fait le vigile — dès que la pile est vide, elle pousse le prochain callback de la file dedans. Résultat pratique épatant : `setTimeout(fn, 0)` ne s\'exécute PAS « tout de suite » mais « dès que la pile est vide », c\'est-à-dire APRÈS la fin du script en cours. Et les promesses ont une file prioritaire (microtâches) qui passe AVANT les timers : d\'où l\'ordre parfois suprenant de tes console.log.' },
            { t: 'h3', h: 'La promesse : un « bon à valoir » résultat' },
            { t: 'syntax', title: 'then / catch : brancher la suite', lang: 'js', code:
'promesse\n  .then((donnees) => afficher(donnees))\n  .catch((erreur) => afficherErreur(erreur));', legend: [
              ['.then(fn)', '« QUAND ça réussit, fais ça » : tu branches la suite sans savoir QUAND elle jouera — le navigateur te rappellera'],
              ['.catch(fn)', 'le filet : attrape n\'importe quel échec de la chaîne, d\'où qu\'il vienne'],
              ['les trois états', 'pending (en attente) → fulfilled (tenue) ou rejected (rompue) : une seule issue, définitive'],
              ['la métaphore', 'la promesse n\'est PAS le colis : c\'est le TICKET de livraison qui promet le colis — d\'où le nom']
            ]},
            { t: 'code', lang: 'js', code:
'const promesse = fetch("https://api.exemple.bj/produits");\n// À cet instant précis : la promesse est EN COURS (pending).\n// Plus tard, exactement UNE fois :\n//   tenue (fulfilled, avec la valeur)  OU  rompue (rejected, avec l\'erreur)\n\npromesse\n  .then((reponse) => reponse.json())        // si succès : étape suivante\n  .then((donnees) => afficher(donnees))     // chaînage : chaque then attend le précédent\n  .catch((erreur) => console.error(erreur)) // UNE erreur, où qu\'elle naisse dans la chaîne\n  .finally(() => cacherSpinner());          // dans tous les cas' },
            { t: 'p', h: 'La promesse formalise ce que setTimeout improvisait : un CONTENEUR de résultat futur, avec trois états (pending / fulfilled / rejected) et une garantie solide — il ne peut changer d\'état qu\'UNE fois (ton callback ne peut pas être appelé deux fois). Le `.then()` chaîne les étapes (ce que chaque then retourne est l\'entrée du suivant), `.catch()` rattrape toute panne de la chaîne, `.finally()` fait le ménage. C\'est déjà bien ; async/await va rendre ça lumineux.' },
            { t: 'h3', h: 'async/await : l\'asynchrone qui se lit comme du synchrone' },
            { t: 'syntax', title: 'async / await sous le capot du quotidien', lang: 'js', code:
'async function chargerProduits() {\n  try {\n    const reponse = await fetch("/api/produits");\n    const produits = await reponse.json();\n    afficher(produits);\n  } catch (e) {\n    afficherErreur(e);\n  }\n}', legend: [
              ['async function', 'le mot-clé qui AUTORISE await dans le corps — et qui transforme la fonction elle-même en promesse'],
              ['await fetch(…)', '« mets CETTE fonction en pause jusqu\'au résultat » — le code se lit de haut en bas comme du synchrone, sans geler la page'],
              ['try / catch', 'le filet classique : il attrape les rejets des promesses attendues — le rôle que jouait .catch dans la version .then'],
              ['pendant la pause', 'le navigateur continue de vivre : clics, animations, autres scripts — seule CETTE fonction attend, pas ta page']
            ]},
            { t: 'code', lang: 'js', code:
'async function afficherSolde() {\n  try {\n    const reponse = await fetch("/api/solde");\n    const { solde, devise } = await reponse.json();\n    document.querySelector("#solde").textContent = solde + " " + devise;\n  } catch (erreur) {\n    console.error("Impossible de lire le solde :", erreur);\n  }\n}' },
            { t: 'p', h: 'Décomposons les deux mots, car tout est là : `async` devant une fonction (1) autorise `await` à l\'intérieur et (2) fait que la fonction **renvoie TOUJOURS une promesse**. `await` fait une chose qui semble magique mais ne l\'est pas : il met EN PAUSE la fonction (elle se rendormira quand la promesse se résoudra), **sans jamais bloquer la page** — la boucle d\'événements continue de vivre, les clics répondent, l\'interface reste fluide. Et `try/catch` retrouve enfin son usage naturel avec l\'asynchrone. Le code se lit de haut en bas, comme une histoire.' },
            { t: 'h3', h: 'await n\'est PAS du parallélisme : orchestrer proprement' },
            { t: 'code', lang: 'js', code:
'// LENT : l\'un APRÈS l\'autre (6 s si chacun prend 3 s)\nconst a = await fetch(urlA);\nconst b = await fetch(urlB);\n\n// RAPIDE : ENSEMBLE (3 s au total) — les deux partent d\'un coup\nconst [repA, repB] = await Promise.all([\n  fetch(urlA),\n  fetch(urlB)\n]);' },
            { t: 'p', h: 'Piège de lecture : `await` donne l\'air séquentiel, il l\'EST — chaque ligne attend la précédente. Si les opérations sont indépendantes, `Promise.all` les lance ensemble et te notifie UNE fois toutes finies (il échoue dès que l\'une échoue ; la variante tolérante `Promise.allSettled` te livre le bilan de chacune, succès ou échec — pratique pour un tableau de bord dont chaque tuile vit sa vie). Pour la culture : `Promise.race` rend la première finie ; `Promise.any`, la première RÉUSSIE.' },
            { t: 'h3', h: 'Fabriquer une promesse soi-même' },
            { t: 'code', lang: 'js', code:
'// Le grand classique : l\'attente non bloquante\nconst attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nasync function demo() {\n  console.log("Je commence");\n  await attendre(2000);        // pause de 2 s SANS figer l\'onglet\n  console.log("2 secondes plus tard");\n}\n\n// Promisifier une vieille API à callbacks :\nconst lirePosition = () => new Promise((ok, ko) => {\n  navigator.geolocation.getCurrentPosition(ok, ko);\n});\nconst pos = await lirePosition();' },
            { t: 'p', h: '`new Promise((resolve, reject) => { ... })` te donne les deux boutons d\'atterrissage : appelle `resolve(valeur)` en cas de succès, `reject(erreur)` en cas d\'échec — et tout appelant pourra `await` ta fonction. C\'est l\'outil qui transforme n\'importe quel mécanisme à callbacks en chose await-able : timers, géolocalisation, anciennes bibliothèques.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« await bloque le navigateur en attendant. »** — C\'est l\'inverse : il endort LA FONCTION seule ; la page, les clics et les animations continuent. Bloquant, c\'est la boucle infinie synchrone.',
              '**« async rend le code parallèle. »** — Non : sequentiel par défaut (chaque await attend le précédent). Le parallélisme se DÉCLARE avec Promise.all.',
              '**« setTimeout(fn, 0) s\'exécute immédiatement. »** — Après la pile vide ET les microtâches : « immédiatement » signifie « dès que tu as fini de parler, je prends la parole ».',
              '**« Une fonction async renvoie la valeur. »** — Elle renvoie une PROMESSE de la valeur. Si tu vois « `Promise { <pending> }` » dans la console, tu as oublié un await.',
              '**« Une promesse peut être annulée. »** — Non : une promesse suit son cours ; AbortController annule les EFFETS de la requête (fetch le respecte), pas la promesse elle-même.',
              '**« try/catch attrape toutes les erreurs async. »** — Seulement celles passant par await dans son périmètre ; un setTimeout interne maladroit échappe au try extérieur (et finit en unhandled rejection silencieux — surveille la console).',
              '**« Plus d\'await partout = plus sûr. »** — Chaque await non nécessaire sérialise ce qui pouvait être parallèle : c\'est une décision, pas un décor.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Tu as assemblé ce modèle en fait dès la fiche Événements (« appelle-moi quand ça arrive ») — les promesses ne font que l\'industrialiser ? Non : elles l\'ordonnance avec une sémantique garantie (3 états, une fois). fetch est l\'application concrète courante ; try/catch est ton garde-fou de la fiche Erreurs ressoudé à l\'asynchrone ; les fonctions comme valeurs expliquent pourquoi des callbacks naviguent partout depuis le début. Et la prochaine fiche — Erreurs & débogage — te servira tous les jours dans ce monde où les choses ne se passent jamais dans l\'ordre écrit.' },
            { t: 'callout', kind: 'warn', h: '`await` ne fonctionne que dans une fonction `async` (ou au niveau racine d\'un module). Et une fonction `async` renvoie une promesse : `const x = maFonctionAsync()` ne donne pas le résultat — il faut `await maFonctionAsync()` (ou `.then()`).' }
          ],
          errors: [
            { title: 'Oublier d\'attendre une fonction async', bad: 'const user = chargerUser(5);        // promesse, PAS l\'utilisateur\nconsole.log(user.nom);            // undefined', good: 'const user = await chargerUser(5);\nconsole.log(user.nom);', why: 'Une fonction async retourne toujours une promesse. Traiter la promesse comme la valeur est l\'erreur n°1 de l\'asynchrone — si tu vois « `Promise { <pending> }` » dans la console, c\'est ça.' },
            { title: 'Mettre setTimeout pour « réparer » un problème de timing', bad: 'afficherDonnees();\nsetTimeout(() => lireDonnees(), 500); // « ça marche des fois »', good: 'await afficherDonnees();\nlireDonnees();   // séquence garantie par await', why: 'Deviner un délai est un pari sur la charge réseau/machine : fragile par définition. Les promesses existent précisément pour synchroniser sans deviner.' }
          ],
          related: ['js-fetch', 'js-erreurs', 'js-fonctions', 'js-es6']
        },

        {
          id: 'js-erreurs',
          title: 'Erreurs & débogage',
          icon: 'bug_report',
          level: 'Avancé',
          tagline: 'try/catch, throw, console et DevTools : faire des bugs une routine, pas une panique.',
          intro: 'Écrire du code sans erreur n\'existe pas ; ce qui distingue les bons développeurs, c\'est une **méthode** pour les trouver vite. L\'erreur JavaScript n\'est pas une punition : c\'est un message précis — type, message, fichier, ligne — qui n\'attend que d\'être lu calmement. Équipé des bons outils et du bon état d\'esprit, le débogage devient une routine presque satisfaisante au lieu d\'une panique du soir.',
          blocks: [
            { t: 'h3', h: 'Changer d\'état d\'esprit : l\'erreur est un rapport, pas un jugement' },
            { t: 'p', h: 'Quand l\'interpréteur rencontre une situation impossible, il ne « casse » pas ton programme par méchanceté : il fabrique un **objet d\'erreur** (TypeError, ReferenceError, SyntaxError…), avec un message et la PILE des appels qui y ont mené, puis le lance (throw). Si personne ne l\'attrape, il finit dans la console en rouge. Ce design est une chance : contrairement à un plantage silencieux en C, JavaScript te DIT ce qui se passe, où et pourquoi. Le dur métier du développeur consiste à lire ces rapports au lieu de relire tout son code en boucle.' },
            { t: 'h3', h: 'Lire un message d\'erreur comme un pro' },
            { t: 'code', lang: 'js', code:
'// TypeError: Cannot read properties of null (reading \'textContent\')\n// -> quelqueChose.textContent a été tenté, mais quelqueChose vaut null.\n//    Question : mon querySelector a-t-il trouvé l\'élément ? Le DOM existe-t-il ?\n\n// ReferenceError: total is not defined\n// -> variable inexistante À CET ENDROIT : faute de frappe ? mauvaise portée ?\n\n// SyntaxError: Unexpected token \'}\'\n// -> structure cassée : souvent l\'accolade déséquilibrée est SUR LA LIGNE AVANT.\n\n// TypeError: users.map is not a function\n// -> users n\'est pas un tableau : probablement l\'objet { data: [...] } entier.' },
            { t: 'p', h: 'Deux réflexes de lecture. La console affiche fichier et ligne : clique dessus pour sauter au crime. Et lis toujours la **première** erreur de la série : une erreur initiale en déclenche souvent dix autres en cascade — répare la première et toute la pile s\'éteint.' },
            { t: 'h3', h: 'console : ta première investigation' },
            { t: 'code', lang: 'js', code:
'console.log("valeur :", total);          // le classique\nconsole.log({ total, panier, user });    // les accolades révèlent le NOM !\nconsole.table(utilisateurs);             // tableau/objets en vraie TABLE triable\nconsole.error("échec :", err);           // rouge + pile d\'appels\nconsole.warn("déprécié : préfère la v2");\n\nconsole.time("chargement");\n// ... operation mesuree ...\nconsole.timeEnd("chargement");           // chrono précis' },
            { t: 'p', h: 'Trois joyaux méconnus : `console.table()` transforme n\'importe quel tableau d\'objets en tableau triable (idéal pour inspecter un catalogue reçu), `console.log({ variable })` affiche le nom ET la valeur (fini les logs anonymes dont on ne sait plus qui est qui), et `console.time/timeEnd` mesure sans instrumentation. Et le commandement : on retire ses logs de debug avant de livrer — ou on les remplace par un vrai repérage (fiche Erreurs, justement).' },
            { t: 'h3', h: 'Le débogueur : console.log en version tranchante' },
            { t: 'p', h: 'Dans les DevTools, onglet Sources, cliquer un numéro de ligne pause un **point d\'arrêt** : le code se FIGE à cet instant — et chaque variable révèle sa valeur exacte à ce moment. Ensuite on avance pas à pas (`F10` : ligne suivante ; `F11` : entrer dans l\'appel ; `Shift+F11` : en sortir), et l\'impossible devient trivial : on VOIT le moment où la valeur devient mauvaise. Le mot-clé `debugger;` posé dans le code déclenche l\'arrêt au bon endroit sans chercher la ligne. 90 % des bugs tombent en deux minutes ainsi, là où vingt console.log tourneraient en rond — essaie-le une fois et tu ne reviendras pas.' },
            { t: 'h3', h: 'try / catch / finally : anticiper le pire, proprement' },
            { t: 'syntax', title: 'try / catch / finally, décortiqué', lang: 'js', code:
'try {\n  const data = JSON.parse(saisie);\n} catch (erreur) {\n  afficherErreur("JSON illisible :", erreur.message);\n} finally {\n  champ.value = "";\n}', legend: [
              ['try {…}', 'la zone à RISQUE : le code susceptible de planter y vit en confinement'],
              ['catch (erreur)', 'exécuté SEULEMENT si le try a planté : le programme ne s\'arrête plus — il gère. erreur.message raconte l\'incident'],
              ['finally {…}', 'TOUJOURS exécuté, succès OU échec : le rangement (vider le champ, masquer le chargeur, refermer la ressource)'],
              ['la philosophie', 'on n\'enferme pas TOUT le programme : on entoure chaque opération risquée — réseau, JSON.parse, saisie utilisateur']
            ]},
            { t: 'code', lang: 'js', code:
'function lireJSON(texte) {\n  try {\n    return JSON.parse(texte);        // peut échouer sur du texte invalide\n  } catch (erreur) {\n    console.warn("JSON illisible :", erreur.message);\n    return null;                     // repli propre : le programme continue\n  } finally {\n    console.log("Tentative de lecture terminée");  // DANS TOUS LES CAS\n  }\n}' },
            { t: 'p', h: 'La doctrine du try/catch, car elle existe : réserve-le aux **frontières incertaines** — parsing de données venues d\'ailleurs, réseau, stockage local, environnement utilisateur. Ne l\'enroule PAS autour de tout ton code « au cas où » : un programme qui avale toutes ses erreurs devient indéboguable (tu ne sauras plus jamais pourquoi « ça ne fait rien »). Le rôle du catch n\'est pas de faire semblant — c\'est de DÉCIDER : informer, remplacer par une valeur sûre, réessayer, ou laisser remonter si tu ne peux pas réparer ici.' },
            { t: 'h3', h: 'Lancer ses propres erreurs : le rôle de throw' },
            { t: 'syntax', title: 'throw : alerter soi-même, décortiqué', lang: 'js', code:
'if (prix < 0) {\n  throw new Error("Un prix ne peut pas être négatif");\n}', legend: [
              ['throw new Error(…)', 'FABRIQUE et LANCE une erreur : l\'exécution s\'arrête ici et la faute remonte jusqu\'au catch le plus proche'],
              ['"Un prix ne peut pas…"', 'le message s\'adresse à l\'HUMAIN du futur (toi, en débogage) : précis, métier, actionnable'],
              ['pourquoi lancer ?', 'signaler IMMÉDIATEMENT qu\'une règle est violée : mieux vaut un crash explicite qu\'un prix négatif qui se promène dans le système'],
              ['la chaîne', 'throw dans une fonction appelante catch loin en amont : l\'erreur traverse les étages jusqu\'à trouver celui qui sait gérer']
            ]},
            { t: 'code', lang: 'js', code:
'function diviser(a, b) {\n  if (b === 0) {\n    throw new Error("Division par zéro interdite");\n  }\n  return a / b;\n}\n\n// L\'appelant décide :\ntry {\n  diviser(10, 0);\n} catch (erreur) {\n  afficherMessage(erreur.message);   // "Division par zéro interdite"\n}' },
            { t: 'p', h: '`throw` est la politesse d\'une fonction honnête : plutôt que rendre un résultat faux ou un `null` qui explosera plus loin, elle DIT « je ne peux pas » immédiatement, avec un message qui explique. Le voyage de l\'erreur est à mémoriser : elle remonte la pile d\'appels jusqu\'au premier try/catch capable — exactement comme les promesses rejettées cherchaient leur `.catch` dans la fiche Asynchrone. D\'où la règle d\'or du design : seuls les fichiers « frontière » attrapent (API, saisie, UI) ; le cœur du programme, lui, préfère signaler clairement.' },
            { t: 'h3', h: 'Les erreurs asynchrones : le filet de sécurité' },
            { t: 'code', lang: 'js', code:
'// 1. Dans une fonction async : try/catch autour du await — déjà vu.\n// 2. Les promesses « oubliées » sans catch finissent ici :\nwindow.addEventListener("unhandledrejection", (event) => {\n  console.error("Promesse non rattrapée :", event.reason);\n  // endroit idéal pour remonter une alerte générique\n});\n\n// 3. Filet global pour les erreurs JS classiques :\nwindow.addEventListener("error", (event) => {\n  journaliserErreur(event.message, event.filename, event.lineno);\n});' },
            { t: 'p', h: 'Ces écouteurs ne remplacent pas les try/catch ciblés : ils sont la ceinture de sécurité du « jamais vu en test » — le bug qui n\'arrive qu\'au 47e client, sur LE téléphone dont le navigateur traduit mal une API. À l\'échelle d\'un projet réel, ils alimentent un service de surveillance qui te prévient avant la première plainte client.' },
            { t: 'h3', h: 'Méthode anti-panique, en quatre pas' },
            { t: 'ol', items: [
              '**Reproduire à coup sûr** : si tu ne peux pas voir le bug deux fois, tu ne sauras jamais s\'il est réparé.',
              '**Lire TOUT le message** : type, message, pile — la première erreur suffit presque toujours.',
              '**Vérifier TES hypothèses** : `console.log({ variable })` aux frontières, plutôt que relire le code en boucle. Ne crois que ce que tu vois.',
              '**Réduire** : commente la moitié du code pour isoler la zone fautive (bissection) ; quand la zone tient en cinq lignes, le bug n\'a nulle part où se cacher.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Une erreur rouge = mon code est nul. »** — C\'est un instrument de mesure, pas une note. Les meilleurs développeurs provoquent BEAUCOUP d\'erreurs — et les lisent plus vite.',
              '**« L\'erreur est forcément à la ligne affichée. »** — La ligne EST exacte pour l\'exécution ; la CAUSE est souvent en amont (donnée mauvaise, oublie de await). Remonte la pile.',
              '**« console.log partout est une méthode. »** — C\'est un réflexe, pas une méthode : dix logs anonymes valent moins qu\'un breakpoint posé au bon endroit.',
              '**« try/catch ralentit le programme. »** — Le coût est négligeable en pratique ; la vraie question est « que DÉCIDE mon catch ? » — un catch vide est le seul vrai problème.',
              '**« Une erreur silencieuse est gentille. »** — C\'est la pire : le programme continue avec des données fausses et « marche bizarrement parfois ». Préfère mille erreurs visibles à une donnée secrètement corrompue.',
              '**« Déboguer = relire son code. »** — Relire trouve les fautes d\'orthographe ; observer trouve les bugs. Le débogueur observe, les logs confirment, la bissection isole.'
            ]},
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Cette fiche clôt le module en assemblant tout : les messages TypeError parlent des TYPES, les ReferenceError des PORTÉES, les catch des décisions sincères de la fiche CONDITIONS, les unhandledrejection de l\'ASYNCHRONE, le débogueur montre le DOM et les événements en pleine action. Avec ça, chaque bug devient ce qu\'il aurait toujours dû être : un petit mystère résolvable, pas une punition. La suite naturelle du voyage : TypeScript, qui déplace une partie de ces erreurs AVANT l\'exécution — tu apprécieras alors la différence au quotidien.' },
            { t: 'callout', kind: 'tip', h: 'Méthode anti-panique : 1) reproduire le bug à coup sûr, 2) lire TOUT le message d\'erreur, 3) vérifier TES hypothèses (console.log({ variable })) plutôt que relire le code en boucle, 4) réduire : bissectionner le code pour isoler la zone fautive.' }
          ],
          errors: [
            { title: 'Un catch vide qui enterre les erreurs', bad: 'try {\n  await sauvegarder();\n} catch (e) { }   // tout échoue... en silence', good: 'try {\n  await sauvegarder();\n} catch (e) {\n  console.error("Sauvegarde :", e);\n  afficherToast("Échec de la sauvegarde");\n}', why: 'Un échec silencieux transforme un simple bug en « l\'application est bizarre parfois ». Logue toujours, et informe l\'utilisateur si l\'action le concernait.' },
            { title: 'if (x) comme seule garde contre null', bad: 'if (user.adresse) {\n  carte.textContent = user.adresse.ville;  // et si user est null ?\n}', good: 'const ville = user?.adresse?.ville ?? "Inconnue";\ncarte.textContent = ville;', why: 'Vérifier maillon par maillon devient vite illisible ET incomplet. Le chaînage optionnel sécurise la ligne entière de manière explicite (voir fiche Objets).' }
          ],
          related: ['js-conditions', 'js-fetch', 'js-asynchrone', 'js-dom']
        }
      ]
    }
  ]
};
