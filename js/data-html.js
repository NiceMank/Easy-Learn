/* ============================================================
   data-html.js — Contenu pédagogique HTML (passe d'approfondissement)
   Pour ajouter une fiche : copier un objet "fiche" et remplir.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.html = {
  id: 'html',
  name: 'HTML',
  icon: 'html',
  tagline: 'Le squelette de toutes tes pages : balises, structure sémantique, formulaires et médias.',
  heroTitle: 'HTML, le langage qui donne un sens à ton contenu',

  categories: [
    {
      id: 'fondations',
      name: 'Les fondations',
      icon: 'foundation',
      fiches: [
        {
          id: 'html-structure',
          title: 'Structure d\'une page',
          icon: 'article',
          level: 'Débutant',
          tagline: 'Doctype, `<html>`, `<head>`, `<body>` : l\'anatomie minimale de tout document web.',
          intro: 'Pourquoi une simple page web a-t-elle besoin d\'une structure aussi codifiée ? Parce qu\'un navigateur est une machine : il ne devine rien, il ne lit pas entre les lignes. Tout ce que tu ne déclares pas explicitement, il devra l\'inventer — et il invente mal. Avant même d\'écrire la moindre balise de contenu, prends donc le temps de comprendre comment une page HTML est organisée. Garde en tête l\'image du courrier officiel : il y a l\'enveloppe (les informations de routage, invisibles pour le destinataire) et la lettre elle-même (ce qu\'on lit). HTML fonctionne exactement pareil, avec deux grandes zones : le `head` et le `body`.',
          blocks: [
            { t: 'h3', h: 'Pourquoi un tel rituel autour d\'une simple page ?' },
            { t: 'p', h: 'Demande-toi ce qui se passerait sans ce cadre. Tu écrirais ton texte brut dans un fichier, le navigateur l\'afficherait, certes… mais avec quel encodage ? Selon quelles règles de mise en page ? Pour quel type d\'écran ? Dans les années 90, chaque navigateur répondait à ces questions à sa manière, et le même HTML s\'affichait différemment partout. Un enfer. Le doctype et la structure servent à verrouiller ces réponses une fois pour toutes : c\'est un **contrat** entre toi et le navigateur, pas une décoration.' },
            { t: 'p', h: 'Regarde la structure comme trois couches qui répondent chacune à une question précise du navigateur : la **déclaration** (le doctype : « selon quelles règles dois-je interpréter ce document ? »), la **racine** (`<html>` : « où commence et où finit le document ? »), et les **deux zones** (`<head>` et `<body>` : « qu\'est-ce qui concerne la page elle-même, et qu\'est-ce qui doit s\'afficher ? »). Une fois ces trois réponses comprises, tout le reste du HTML n\'est que du remplissage dans ces zones.' },
            { t: 'h3', h: 'Le squelette minimal' },
            { t: 'p', h: 'Voici la page HTML la plus petite qui soit valide. Mémorise-la : chaque page que tu écriras partira de cette base. Ensuite, on la décortique ligne par ligne — car chaque ligne existe pour une raison précise.' },
            { t: 'code', lang: 'html', label: 'index.html — le point de départ', code:
'<!DOCTYPE html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Ma première page</title>\n  </head>\n  <body>\n    <h1>Bonjour le monde !</h1>\n  </body>\n</html>' },
            { t: 'h3', h: 'Ligne par ligne, qu\'est-ce qui se passe ?' },
            { t: 'ul', items: [
              '`<!DOCTYPE html>` — Ce n\'est **pas une balise**, c\'une déclaration, une instruction pour le navigateur : « interprète ce document selon les règles modernes du HTML ». Sans elle, le navigateur bascule en *quirks mode*, un mode de compatibilité qui imite les bugs des navigateurs des années 90 (notamment le mauvais calcul des dimensions des boîtes d\'Internet Explorer 5). Concrètement : tes largeurs CSS se comportent différemment et ta mise en page semble « cassée » alors que ton code est bon.',
              '`<html lang="fr">` — La racine du document : tout le reste vit à l\'intérieur. L\'attribut `lang` déclare la langue du contenu. Il ne traduit rien, mais il aide les traducteurs automatiques, les moteurs de recherche et surtout les lecteurs d\'écran — un synthétiseur vocal configuré en anglais qui tombe sur une page `lang="fr"` adaptera sa prononciation au lieu de massacrer ton texte.',
              '`<head>` — L\'enveloppe. Tout ce qu\'on y met **concerne** la page mais ne s\'affiche **pas** dans la page : encodage, titre d\'onglet, liens vers les feuilles de style, métadonnées pour les moteurs et les réseaux sociaux. Un titre `<h1>` placé ici n\'apparaîtra jamais à l\'écran.',
              '`<meta charset="UTF-8">` — Indique l\'encodage des caractères. Ton fichier est une suite d\'octets ; le navigateur doit savoir comment les convertir en caractères. En UTF-8, le « é » s\'écrit avec deux octets ; si le navigateur les relit en Latin-1 (croyance par défaut très ancienne), il affiche « Ã© ». Ce fameux charabia que tu as déjà croisé sur des sites mal configurés vient de là — pas d\'un bug mystérieux. D\'où la règle : `charset` **en toute première ligne du head**, avant tout texte potentiellement accentué (y compris le `<title>`).',
              '`<meta name="viewport" ...>` — Rend la page adaptative sur mobile. Petit point historique utile : quand l\'iPhone est sorti en 2007, les sites étaient conçus pour 1024 px de large. Pour les afficher « entiers », le téléphone a simulé un écran de 980 px puis a dézoomé. Cette déclaration dit : « ne simule rien, utilise la vraie largeur de l\'appareil ». Sans elle, ton site mobile s\'affiche tout petit.',
              '`<title>` — Le titre de l\'onglet, repris mot pour mot dans les résultats Google et les favoris. C\'est le seul élément du head visible *quelque part* — mais hors de la page elle-même. On y reviendra longuement dans la fiche sur le `<head>`.',
              '`<body>` — La lettre. Tout ce qui doit être visible à l\'écran vit ici, et **uniquement** ici : titres, paragraphes, images, menus, formulaires.'
            ]},
            { t: 'h3', h: 'Ce qui se passe sous le capot : du fichier à l\'écran' },
            { t: 'p', h: 'Quand le navigateur reçoit ton fichier, il ne l\'affiche pas d\'un coup : il le **transforme** d\'abord. La chaîne ressemble à ceci : les octets deviennent des caractères (merci `charset`), les caractères sont découpés en jetons (`<h1>`, texte, `</h1>`…), et ces jetons sont assemblés en un arbre d\'objets en mémoire : le **DOM** (Document Object Model). Chaque balise devient un nœud, imbriqué dans son parent, exactement comme un arbre généalogique.' },
            { t: 'p', h: 'Cet arbre explique deux réflexes professionnels que tu verras partout. D\'abord, le CSS se charge dans le `head` : si la feuille de style arrivait après le contenu, le visiteur verrait un instant la page « toute nue », non stylée — le *flash of unstyled content*. Ensuite, le navigateur construit le rendu à partir du DOM + du CSSOM (l\'arbre des styles) : si un script balancé au milieu du HTML modifie ces arbres, tout le rendu s\'interrompt pour l\'exécuter. C\'est pourquoi on charge les scripts avec `defer` : téléchargement en parallèle, exécution une fois le DOM complet. La fiche sur le `<head>` détaillera cette mécanique.' },
            { t: 'p', h: 'Dernier réflexe de lecture à connaître : le navigateur est **tolerant-réparateur**. Oublie une balise fermante, mets du texte hors du `body`, il n\'affiche pas d\'erreur — il *devine* et répare à ta place. C\'est confortable au début, mais dangereux : le DOM réparé ne ressemble plus forcément à ce que tu as écrit, et ton CSS ou ton JS cessera de cibler ce que tu crois. Un validateur HTML (celui du W3C) te permet de vérifier que le DOM sera bien celui que tu as prévu.' },
            { t: 'h3', h: 'Un vrai point de départ de projet' },
            { t: 'p', h: 'Dans un projet réel, on part rarement du strict minimum : quelques lignes supplémentaires rendent la page immédiatement « pro ». Les voici — la fiche sur le `<head>` les expliquera toutes en profondeur.' },
            { t: 'code', lang: 'html', label: 'index.html — base de projet réaliste', code:
'<!DOCTYPE html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n    <title>Boutique Awa — Gari et produits du terroir</title>\n    <meta name="description" content="Gari premium, huile rouge et épices du marché Dantokpa, livrés à Cotonou. Commande simple, paiement à la livraison.">\n\n    <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n    <link rel="stylesheet" href="css/main.css">\n    <script src="js/app.js" defer></script>\n  </head>\n  <body>\n    <h1>Boutique Awa</h1>\n  </body>\n</html>' },
            { t: 'p', h: 'Trois ajouts par rapport au squelette minimal : une `description` pensée pour inciter au clic dans Google, une icône d\'onglet, et le couple classique `main.css` + `app.js defer`. Remarque l\'ordre : encodage et viewport d\'abord, contenu « parlé aux humains et aux moteurs » ensuite, ressources à la fin.' },
            { t: 'h3', 'h': 'Les alternatives… et pourquoi on ne les retient pas' },
            { t: 'ul', items: [
              '**Les vieux doctypes verbeux** — tu croiseras parfois `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ...>`. C\'était le prix du mode standard à l\'époque XML. Le doctype HTML5, court et sans version, déclenche le même mode moderne d\'un coup sec. Garde toujours la version courte : d\'ailleurs, si HTML évolue un jour, ce sera *sans* changer le doctype.',
              '**`<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`** — l\'ancienne écriture longue pour l\'encodage. Elle fonctionne encore, mais `<meta charset="UTF-8">` est la forme officielle, plus simple à mémoriser.',
              '**Omettre les balises `<head>` et `<body>`** — surprise : en HTML5, ces balises ouvrantes et fermantes sont techniquement optionnelles, le navigateur les réinsère. Ne t\'en sers pas. Explicite bat implicite : un code auto-réparé est un code qu\'on ne maîtrise plus.'
            ]},
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« Le doctype est une balise HTML comme les autres » — non. C\'est une instruction de lecture placée *avant* le document. Pas de balise fermante, pas d\'attribut, pas de contenu. Son absence ne produit aucune erreur visible, juste un moteur de rendu différent : c\'est le piège le plus silencieux du HTML.',
              '« Tout ce qui est dans le `head` s\'affiche quelque part » — non, rien ne s\'y affiche. Même le `<title>` ne s\'affiche pas *dans la page* : il habite l\'onglet et les résultats de recherche. Si un texte doit être vu par le visiteur, il va dans le `body`, point.',
              '« `lang="fr"` traduit automatiquement ma page » — non, il **déclare** la langue existante pour les machines (lecteurs d\'écran, moteurs, outils de traduction). Il ne change aucun mot.',
              '« Si j\'oublie une balise, le navigateur affichera une erreur » — jamais en HTML pur. Il répare en silence, et c\'est précisément cette réparation silencieuse qui crée des bugs difficiles à comprendre plus tard.',
              '« Le charset, c\'est du détail » — le jour où tes données viendront d\'une base MySQL ou d\'un formulaire avec des noms comme « Sègla » ou « Kpêdê », tu comprendras pourquoi il est en ligne 1.'
            ]},
            { t: 'h3', h: 'Lien avec la suite du module' },
            { t: 'p', h: 'Cette charpente est la base de **tout** le module. La prochaine fiche — *Titres & texte* — te montrera quoi mettre **dans le body** pour structurer ton contenu. La fiche *Le `<head>` & les métadonnées*, en fin de parcours, reprendra l\'enveloppe et la poussera au niveau professionnel (SEO, réseaux sociaux, performance).' },
            { t: 'callout', kind: 'tip', h: 'Dans VS Code, tape `!` puis `Entrée` dans un fichier `.html` : l\'éditeur génère tout ce squelette automatiquement (c\'est l\'abréviation Emmet). Tu n\'as plus aucune excuse pour l\'oublier.' }
          ],
          errors: [
            { title: 'Oublier le doctype', bad: '<html>\n  <head><title>Page</title></head>\n  ...', good: '<!DOCTYPE html>\n<html lang="fr">\n  ...', why: 'Sans doctype, le navigateur passe en quirks mode : le calcul des dimensions (box model) change et ton CSS semble « buggy » alors qu\'il est correct. Le navigateur ne t\'avertit de rien.' },
            { title: 'Mettre du contenu visible dans le <head>', bad: '<head>\n  <h1>Mon titre</h1>\n</head>', good: '<head>\n  <title>Mon titre</title>\n</head>\n<body>\n  <h1>Mon titre</h1>\n</body>', why: 'Le navigateur fermera le head et déplacera de force ton contenu dans le body, ce qui produit un DOM différent de celui que tu as écrit — source de bugs CSS et JS incompréhensibles. Le titre visible de la page s\'écrit dans un h1, celui de l\'onglet dans title.' }
          ],
          related: ['html-head', 'html-semantique', 'js-dom']
        },

        {
          id: 'html-texte',
          title: 'Titres & texte',
          icon: 'format_bold',
          level: 'Débutant',
          tagline: 'h1–h6, p, strong, em, blockquote : hiérarchiser et enrichir le contenu textuel.',
          intro: 'Le web est fait à plus de 90 % de texte. Pourtant, la majorité des débutants balisent leur texte « à l\'œil » : ce qui doit paraître gros devient un titre, ce qui doit paraître gras devient un `<b>`. C\'est exactement à l\'envers. En HTML, on ne décrit jamais l\'apparence — on **déclare le rôle** de chaque fragment : ceci est un titre de niveau 2, ceci est important, ceci est une citation. L\'apparence viendra ensuite, via le CSS. Cette séparation n\'est pas un caprice de puriste : c\'est elle qui rend ta page lisible par Google, par un lecteur d\'écran, et re-stylable en une minute.',
          blocks: [
            { t: 'h3', h: 'Pourquoi « mettre en forme » ne suffit pas' },
            { t: 'p', h: 'Imagine que tu dictes ta page à quelqu\'un au téléphone. Tu ne dirais pas « ensuite il y a du texte gros, puis du texte normal » : tu dirais « le titre du chapitre est…, puis un paragraphe…, et là appuie sur ce mot ». C\'est exactement ainsi que fonctionnent les lecteurs d\'écran : ils ne voient pas ta page, ils en écoutent la structure. Enquête après enquête, il ressort que la majorité de leurs utilisateurs naviguent **par les titres** — ils demandent la liste des `h1`-`h6` et sautent directement à la section qui les intéresse. Sans vraie hiérarchie de titres, ta page est pour eux un mur sonore indivisible.' },
            { t: 'p', h: 'Même logique pour Google : le robot ne « voit » pas ta mise en page, il extrait le **plan** du document pour comprendre de quoi parle chaque partie. Un bon plan de titres, c\'est du référencement gratuit. Morale : le HTML décrit le sens, le CSS décide du look. Retiens cette phrase, elle te servira dans tout le module.' },
            { t: 'h3', h: 'La hiérarchie des titres : d\'abord l\'intuition' },
            { t: 'p', h: 'Les six niveaux `h1` à `h6` forment la **table des matières** de ta page. Pense à un livre : `h1` est le titre du livre (par convention, un seul par page), `h2` ses chapitres, `h3` les sections de chapitre, et ainsi de suite. Ce plan se lit en indentation, comme dans un éditeur de code.' },
            { t: 'code', lang: 'html', label: 'Le plan, minimal', code:
'<h1>Guide du café</h1>\n  <h2>Les grandes familles</h2>\n    <h3>Arabica</h3>\n    <h3>Robusta</h3>\n  <h2>Les méthodes d\'infusion</h2>\n    <h3>Espresso</h3>\n    <h3>Filtre</h3>' },
            { t: 'code', lang: 'html', label: 'Le même réflexe dans une vraie page', code:
'<h1>Le marché Dantokpa en pratique</h1>\n\n  <h2>Se repérer dans les allées</h2>\n    <h3>Le carré des céréales</h3>\n    <h3>Le coin des tissus wax</h3>\n\n  <h2>Négocier les prix</h2>\n    <h3>La règle d\'or du sourire</h3>\n    <h3>Quand le prix affiché n\'est que le début</h3>' },
            { t: 'p', h: 'Remarque l\'indentation : ce n\'est pas une obligation du langage, c\'est un cadeau que tu te fais — en une seconde, tu contrôles visuellement que le plan ne « saute » jamais un niveau. Un `h4` qui suit directement un `h1`, c\'est comme un livre dont le chapitre 2 contiendrait une sous-sous-section sans section : le lecteur est perdu.' },
            { t: 'p', h: 'Une nuance honnête que tu rencontreras dans des tutoriels vieillots : HTML5 avait prévu un « algorithme de plan » magique où chaque section repartirait à `h1`. Les navigateurs **ne l\'ont jamais implémenté**. Donc la pratique pro qui vaut partout : un seul `h1` par page (convention forte, pas interdiction technique), puis une cascade `h2` → `h3` sans rupture.' },
            { t: 'h3', h: 'Paragraphes, espaces et retours à la ligne : le piège classique' },
            { t: 'p', h: 'Point fondamental qu\'il faut intégrer une fois pour toutes : **HTML ignore les retours à la ligne et compresse les espaces multiples**. Dans ton fichier, tu peux écrire un mot par ligne avec vingt espaces entre chacun, le navigateur affichera une seule ligne avec un seul espace. Ce n\'est pas un bug : c\'est voulu, pour que la mise en page dépende du CSS et jamais de la « mise en page » de ton code source.' },
            { t: 'code', lang: 'html', code:
'<p>Chez Awa\n   12 rue des Céréales</p>  <!-- affiché sur UNE seule ligne ! -->\n\n<p>Chez Awa<br>\n12 rue des Céréales</p>   <!-- deux lignes à l\'écran -->\n\n<pre>Ligne 1 : conservée\n     avec    ses    espaces</pre>   <!-- affichée telle quelle -->' },
            { t: 'ul', items: [
              '`<p>` — un paragraphe complet. Pour passer au suivant, nouvelle balise `<p>`, et c\'est le CSS (`margin`) qui gère l\'espace entre eux.',
              '`<br>` — un retour à la ligne **au sein** d\'un même paragraphe. Ses cas légitimes : une adresse, un poème, un numéro de téléphone sur deux lignes. Son abus classique : cinq `<br>` pour « aérer » — ça, ce sont des marges CSS.',
              '`<pre>` — texte **préformaté** : espaces et retours conservés tels quels. Parfait pour un schéma ASCII ou un extrait où l\'indentation porte le sens (c\'est aussi la base des blocs de code, avec `<code>` à l\'intérieur).',
              '`<hr>` — une **rupture thématique** entre deux sujets (ligne horizontale par défaut). Ce n\'est pas une « ligne décorative » : ressers-t\'en quand le sujet change vraiment.'
            ]},
            { t: 'h3', h: 'Le sens des mots : strong, em et leurs faux amis' },
            { t: 'table', head: ['Balise', 'Sens déclaré', 'Rendu par défaut'], rows: [
              ['`strong`', 'Importance, gravité (à ne pas rater)', 'Gras'],
              ['`em`', 'Emphase : change le sens de la phrase à l\'oral', 'Italique'],
              ['`mark`', 'Passage pertinent dans le contexte actuel', 'Surligné jaune'],
              ['`small`', 'Mentions légales, texte secondaire', 'Plus petit'],
              ['`code`', 'Fragment de code informatique', 'Chasse fixe'],
              ['`kbd`', 'Saisie à effectuer au clavier', 'Chasse fixe'],
              ['`blockquote`', 'Citation longue (bloc autonome)', 'Marge à gauche'],
              ['`q`', 'Citation courte (dans la phrase)', 'Guillemets automatiques'],
              ['`abbr`', 'Abréviation (avec `title` pour le développement)', 'Souligné pointillé'],
              ['`pre`', 'Texte préformaté (espaces conservés)', 'Chasse fixe']
            ]},
            { t: 'p', h: '`em` mérite une minute : il marque un changement d\'**intonation**. « Je n\'ai *pas* dit ça » ne veut pas dire la même chose que « Je n\'ai pas dit *ça* ». Le lecteur d\'écran peut réellement appuyer ces mots. `strong`, lui, signale « attention, ceci est crucial » — un avertissement, un chiffre choc.' },
            { t: 'code', lang: 'html', label: 'Dans un vrai paragraphe de boutique', code:
'<p>\n  <strong>Dernière semaine</strong> : le sac de gari premium passe à\n  <strong>4 800 FCFA</strong> au lieu de 6 000. Comme le dit Awa :\n  <q>La qualité, ça se goûte, ça ne se raconte pas.</q>\n  Paiement par <abbr title="Mobile Money">MoMo</abbr> accepté —\n  tape <code>*880#</code> puis <kbd>2</kbd>.\n</p>' },
            { t: 'demo', height: 150, caption: 'Rendu réel des balises de texte', html:
'<h2 style="margin:0 0 8px;font-size:19px">Titre de section</h2><p style="margin:0 0 10px">Un paragraphe avec du <strong>contenu important</strong>, une <em>emphase</em> et un <mark>passage surligné</mark>.</p><blockquote style="margin:0;padding-left:12px;border-left:3px solid #ccc;color:#555">« La simplicité est la sophistication suprême. »</blockquote>' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '`<br>` vs deux `<p>` — `<br>` garde la même unité de sens (adresse sur deux lignes) ; deux `<p>` séparent deux idées (avec une vraie marge, contrôlable). Doute ? Choisis deux `<p>`.',
              '`<hr>` vs bordure CSS — `<hr>` = rupture de **sens** (nouveau sujet) ; `border-top` = simple filet visuel. Si le sens ne change pas, c\'est du CSS.',
              '`<mark>` vs `<span class="surligne">` — `<mark>` dit « pertinent *dans le contexte actuel* » (un mot recherché retrouvé, par exemple) ; pour une couleur permanente et décorative, un `span` + CSS est plus honnête.',
              '`<b>` / `<i>` vs `<strong>` / `<em>` — `<b>` et `<i>` ne disent rien sur le sens. Reste un cas légitime hérité de la typographie : un nom scientifique (*Azadirachta indica*, par exemple) ou un terme étranger dans son texte — là, `<i>` est admis. Sinon, intention = `strong`/`em`.',
              '`<abbr>` vs glossaire — une abréviation ponctuelle : `abbr title`. Dix sigles à définir : fais un glossaire avec une liste de définitions (fiche *Listes*).'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Toutes ces balises vivent **dans le `<body>`** de la charpente posée à la fiche précédente. Et ne confonds pas les deux « titres » de ta page : `<title>` (dans le `head`, pour l\'onglet et Google) et `<h1>` (dans le `body`, pour le lecteur). Ils se répondent — la fiche sur le `<head>` y reviendra — mais ce sont deux mondes séparés.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« `h1` à `h6`, ce sont six tailles de texte » — non, six **niveaux** d\'un plan. La taille se règle en CSS ; choisir un `h4` parce qu\'il est « plus petit » casse le plan pour ceux qui naviguent par titres.',
              '« Plusieurs `<br>` ou `&nbsp;`, ça centre et ça espace » — non : HTML compresse tout ça en un seul espace. Tout alignement, tout espacement, toute mise en page = CSS (flexbox va devenir ton meilleur ami).',
              '« `strong` et `b`, c\'est pareil, du gras » — visuellement oui, sémantiquement non : `b` est muet pour un lecteur d\'écran, `strong` porte une intention.',
              '« Un seul `h1`, c\'est la loi » — c\'est une **convention** pro forte, pas une interdiction du langage. Dans le doute, respecte-la : elle simplifie le plan pour tout le monde.',
              '« `<hr>` est une ligne jolie » — c\'est un changement de sujet. Pour décorer, une bordure CSS.'
            ]},
            { t: 'callout', kind: 'warn', h: 'Réflexe à graver : si tu écris une balise « pour l\'effet visuel », tu fais du CSS sans le savoir. Demande-toi toujours « quel est le **rôle** de ce fragment ? », puis laisse le style au CSS.' }
          ],
          errors: [
            { title: 'Choisir le niveau de titre pour sa taille', bad: '<h4>Mon titre de page</h4>\n<!-- « parce que h1 est trop gros » -->', good: '<h1>Mon titre de page</h1>\n<style>h1 { font-size: 1.4rem; }</style>', why: 'La taille se gère en CSS. Sauter des niveaux (h1 puis h4) casse le plan du document pour les lecteurs d\'écran et le SEO. On balise le rôle, on stylise ensuite.' },
            { title: 'Aligner avec des espaces', bad: '<p>Cotonou&nbsp;&nbsp;&nbsp;&nbsp;10h30</p>', good: '<p class="ligne"><span>Cotonou</span><span>10h30</span></p>\n<style>.ligne{display:flex;justify-content:space-between}</style>', why: 'HTML compresse les espaces multiples en un seul : ton alignement s\'effondre dès l\'affichage. Toute mise en page horizontale relève du CSS.' }
          ],
          related: ['html-structure', 'html-semantique', 'css-typographie']
        },

        {
          id: 'html-liens',
          title: 'Liens & navigation',
          icon: 'link',
          level: 'Débutant',
          tagline: 'La balise `<a>` : liens internes, externes, ancres, mailto/tel et bonnes pratiques.',
          intro: 'Enlève les liens, et le web meurt : il ne reste que des brochures numériques isolées, impossibles à découvrir et à enchaîner. Le lien hypertexte — le « H » de HTML — est l\'invention qui a transformé des documents en **toile**. Une seule balise, `<a>`, suffit à relier des pages entre elles ; mais derrière sa simplicité apparente se cachent quatre familles de destinations, la mécanique déroutante des chemins relatifs, et un vrai piège de sécurité avec `target="_blank"`. C\'est ce qu\'on démêle ici, dans l\'ordre.',
          blocks: [
            { t: 'h3', h: 'Pourquoi le lien change tout' },
            { t: 'p', h: 'Avant les liens, consulter deux documents impliquait de copier laborieusement une adresse, de la recoller, d\'attendre. Le lien rend la navigation **continue** : un clic, et tu passes d\'un article à sa source, d\'un produit à son paiement, d\'un sommaire à son chapitre. Et ce n\'est pas qu\'un confort humain : Google découvre littéralement tes pages en *suivant* les liens depuis d\'autres pages. Un site sans liens entrants est une île que personne ne visite ; une page sans lien sortant, une impasse.' },
            { t: 'h3', h: 'L\'anatomie d\'un lien, d\'abord en douceur' },
            { t: 'code', lang: 'html', code:
'<a href="https://developer.mozilla.org">MDN Web Docs</a>' },
            { t: 'p', h: 'Deux morceaux, deux rôles. L\'attribut `href` (*hypertext reference*) contient la **destination** ; le texte entre les balises est la **zone cliquable**. Et ce texte, crois-le ou non, est lu à voix haute par les lecteurs d\'écran quand on leur demande « la liste des liens de la page ». Écoute la différence : « Cliquez ici. Cliquez ici. Cliquez ici. » contre « Voir les tarifs. Télécharger le catalogue. Contacter Awa. » — dans le premier cas, la personne doit visiter chaque lien pour savoir où il mène. Un bon texte de lien se comprend **hors contexte**.' },
            { t: 'h3', h: 'Les quatre familles de destinations' },
            { t: 'table', head: ['Type', 'Exemple de href', 'Effet au clic'], rows: [
              ['URL absolue', '`https://exemple.com/page`', 'Va vers un autre site (protocole complet)'],
              ['Chemin relatif', '`a-propos.html`, `../img/logo.png`', 'Navigue dans TON site, relativement au fichier courant'],
              ['Ancre', '`#tarifs`', 'Fait défiler jusqu\'à l\'élément qui a `id="tarifs"` sur la page'],
              ['Protocoles spéciaux', '`mailto:a@b.com`, `tel:+22960000000`', 'Ouvre le logiciel d\'e-mail ou l\'app Téléphone'],
              ['Téléchargement', '`catalogue.pdf` + attribut `download`', 'Télécharge le fichier au lieu de l\'ouvrir']
            ]},
            { t: 'h3', h: 'Chemins relatifs : LE point qui bloque tout le monde' },
            { t: 'p', h: 'Retiens le modèle mental : **tu pars toujours du dossier du fichier où tu écris**. Le chemin relatif est un itinéraire piéton : « descends dans ce sous-dossier, remonte d\'un cran, prends ce fichier ». Ce n\'est pas l\'adresse du fichier cible, c\'est le *chemin pour la rejoindre depuis toi*.' },
            { t: 'ul', items: [
              '`page.html` → le fichier `page.html` dans le **même dossier** que moi.',
              '`docs/page.html` → je **descends** dans le sous-dossier `docs`, puis je prends `page.html`.',
              '`../page.html` → je **remonte** d\'un dossier, puis je prends `page.html`.',
              '`/page.html` → je repars de la **racine du site**. Pratique en production, mais attention en local sans serveur : la « racine » devient celle de ton disque dur et le lien casse.'
            ]},
            { t: 'code', lang: 'html', label: 'Exercice mental guidé — arborescence de la boutique', code:
'boutique/\n├── index.html\n├── pages/\n│   └── produits.html\n└── img/\n    └── gari.jpg\n\n<!-- Dans pages/produits.html, afficher gari.img : -->\n<img src="../img/gari.jpg" alt="Sac de gari premium">\n<!-- ../ -> remonte de pages/ à la racine, puis img/gari.jpg -->\n\n<!-- Dans index.html, lier la page produits : -->\n<a href="pages/produits.html">Voir nos produits</a>' },
            { t: 'p', h: 'Subtilité « sous le capot » qui explique 90 % des liens cassés : le navigateur résout les chemins relatifs par rapport à l\'**URL du document**, et **le slash final compte**. Si ta page est servie à `…/docs` (sans slash), un lien `page.html` pointera vers `…/page.html` ; servie à `…/docs/` (avec slash), le même lien visera `…/docs/page.html`. Même fichier HTML, deux résolutions différentes. Quand un lien « marche sur une page mais pas sur l\'autre », vérifie ce slash en premier.' },
            { t: 'h3', h: 'Naviguer dans la page : les ancres' },
            { t: 'code', lang: 'html', code:
'<a href="#chapitre-3">Aller au chapitre 3</a>\n\n<h2 id="chapitre-3">Chapitre 3</h2>\n<!-- Le clic fait défiler la page jusqu\'à ce h2. -->' },
            { t: 'p', h: 'Deux détails à connaître. Un : la correspondance `href="#chapitre-3"` ↔ `id="chapitre-3"` est **sensible à la casse** (`#Chapitre` ne trouve pas `chapitre`). Deux : si tu as un en-tête fixe qui recouvre le haut de l\'écran, l\'ancre arrivera cachée dessous — deux lignes de CSS règlent ça : `scroll-margin-top: 90px;` sur l\'élément ciblé (ou `scroll-behavior: smooth` sur `html` pour un défilement doux). Bonus pour plus tard : le sélecteur CSS `:target` permet de surligner l\'élément atteint.' },
            { t: 'h3', h: 'Ouvrir dans un nouvel onglet, proprement' },
            { t: 'code', lang: 'html', code:
'<a href="https://exemple.com" target="_blank" rel="noopener noreferrer">\n  Voir le site partenaire\n</a>' },
            { t: 'p', h: '`target="_blank"` ouvre la destination dans un nouvel onglet. Mais voici ce qui se passe **sous le capot** sans précaution : la page ouverte reçoit, côté JavaScript, une référence `window.opener` qui pointe vers **ta** page — et peut s\'en servir pour rediriger ton onglet d\'origine vers une copie piégée de ton site (phishing dit de « tabnabbing »). L\'utilisateur revient sur ton onglet, croit être chez toi, entre son mot de passe… adieu le compte. L\'attribut `rel="noopener"` coupe cette référence ; `noreferrer` ajoute l\'absence d\'en-tête de provenance. Réflexe professionnel : `_blank` ne va jamais sans `rel="noopener noreferrer"`.' },
            { t: 'callout', kind: 'tip', h: 'Réserve `_blank` aux vrais besoins (document PDF, aide pendant un formulaire). Laisser l\'utilisateur maîtriser sa navigation — clic molette, clic droit, retour arrière — est la meilleure ergonomie : ne force un nouvel onglet que si le contexte serait perdu.' },
            { t: 'h3', h: 'Au-delà du web : mailto, tel… et WhatsApp' },
            { t: 'code', lang: 'html', label: 'Une vraie page contact à Cotonou', code:
'<!-- Appeler directement depuis un téléphone -->\n<a href="tel:+22960000000">Appeler Awa</a>\n\n<!-- Pré-remplir un e-mail -->\n<a href="mailto:awa@boutique.bj?subject=Commande%20gari&body=Bonjour%20Awa">Écrire à la boutique</a>\n\n<!-- Ouvrir une discussion WhatsApp pré-remplie -->\n<a href="https://wa.me/22960000000?text=Bonjour%2C%20je%20veux%20commander">Commander sur WhatsApp</a>' },
            { t: 'p', h: '`tel:` est un super-pouvoir mobile : un clic et le téléphone compose. `mailto:` ouvre le logiciel de messagerie avec destinataire, sujet et corps pré-remplis — les espaces et caractères spéciaux s\'encodent (`%20` pour un espace, `%2C` pour une virgule). Et le format `wa.me/<numéro international sans +>` est devenu LE bouton « commander » des boutiques de la région. Ces trois liens transforment une simple page de présentation en outil de vente.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`<a>` vs `<button>`** — la règle d\'or : une **navigation** (aller quelque part) = un lien ; une **action** (envoyer, supprimer, ouvrir une modale) = un bouton. Un `<a href="#">` qui déclenche du JS est un bouton déguisé : il casse le clic molette, le « ouvrir dans un nouvel onglet » et annonce un faux lien au lecteur d\'écran.',
              '**`_blank` vs même onglet** — même onglet par défaut (navigation fluide, historique propre) ; `_blank` seulement pour préserver un contexte fragile (formulaire à moitié rempli, lecteur audio en cours).',
              '**Chemins relatifs vs absolus** — relatifs pour tout ce qui est interne (ton site reste portable d\'un domaine à l\'autre, du local à la prod) ; absolus réservés aux autres sites.',
              '**`download` vs lien direct** — lien direct : le navigateur *affiche* le PDF/image s\'il sait faire ; `download` : il le *télécharge* (tu peux même imposer un nouveau nom de fichier).'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Un lien enrobe librement le **texte** de la fiche précédente (`<a><strong>Gari premium</strong></a>`), et bientôt une **image** entière. Les ancres exploitent les `id` des titres `h2`/`h3` de ton plan. Et la fiche suivante — *Listes* — te montrera pourquoi tous les menus de navigation du monde s\'écrivent « une liste de liens » : c\'est la combinaison de ces deux notions.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« Un `<a>` sans `href` est un lien désactivé » — c\'est pire : sans `href`, l\'élément **n\'est plus un lien** : pas de focus clavier, pas de curseur main, pas d\'annonce correcte. Pour déclencher une action, c\'est `<button>`.',
              '« `href="#"` est un raccourci neutre » — non : ça pointe vers une ancre vide, ce qui fait sauter la page en haut et pollue l\'historique. Encore `<button>`.',
              '« `target="_blank"` est sécurisé par défaut » — les navigateurs récents ont durci les choses, mais la norme explicite reste `rel="noopener noreferrer"`. Zéro raison de s\'en passer.',
              '« `mailto:` envoie un e-mail tout seul » — ça **ouvre le logiciel** de messagerie pré-rempli ; l\'utilisateur clique ensuite sur Envoyer. Pour envoyer vraiment depuis le site, il faudra un formulaire + un serveur (fiche *Formulaires*, puis les modules PHP/Laravel).',
              '« Les liens relatifs partent de la racine du site » — ils partent du **dossier du fichier courant** ; seul un `/` initial les fait partir de la racine.'
            ]}
          ],
          errors: [
            { title: 'target="_blank" sans rel="noopener"', bad: '<a href="https://site.fr" target="_blank">Lien</a>', good: '<a href="https://site.fr" target="_blank" rel="noopener noreferrer">Lien</a>', why: 'Sans noopener, la page ouverte garde une référence window.opener vers ton onglet et peut le rediriger à ton insu (tabnabbing). Expliciter rel est la norme professionnelle, même si les navigateurs récents ont durci le défaut.' },
            { title: 'Un <a> sans href pour faire un bouton', bad: '<a onclick="envoyer()">Envoyer</a>', good: '<button type="button" onclick="envoyer()">Envoyer</button>', why: 'Sans href, le pseudo-lien n\'est ni focusable au clavier, ni annoncé comme lien, ni ouvrable en nouvel onglet. Une action = un `<button>` ; une navigation = un `<a href>`.' }
          ],
          related: ['html-structure', 'html-images-medias', 'js-evenements']
        },

        {
          id: 'html-listes',
          title: 'Listes',
          icon: 'format_list_bulleted',
          level: 'Débutant',
          tagline: 'ul, ol, dl : énumérer proprement, imbriquer, et une surprise avec les listes de définitions.',
          intro: 'On pense en listes : courses au marché, étapes d\'une recette, classement des vendeuses du carré. Les machines aussi raisonnent en listes — mais elles ont besoin qu\'on leur dise **de quel type** il s\'agit. HTML propose trois familles de listes, et choisir la bonne n\'est pas une question de look (les puces, les numéros, ça se change en CSS) : c\'est une question de **sens**. L\'ordre compte-t-il ? On numérote. L\'ordre est indifférent ? Simple énumération. Des paires terme/définition ? Liste de descriptions. Trois balises, trois messages différents aux machines.',
          blocks: [
            { t: 'h3', h: 'Pourquoi trois types ? Parce que l\'ordre porte un sens' },
            { t: 'p', h: 'Quand un lecteur d\'écran rencontre une liste, il l\'annonce : « liste, 5 éléments ». L\'utilisateur sait immédiatement où il va et peut sauter d\'élément en élément — ou quitter la liste entière d\'une touche. Avec des `<div>` ou des `<p>` empilés, plus rien de tout cela : la page devient un flux sans repères. Choisir la bonne balise de liste, c\'est offrir ce GPS gratuitement.' },
            { t: 'table', head: ['Balise', 'Signification', 'Cas d\'usage'], rows: [
              ['`ul` (unordered)', 'L\'ordre n\'a **pas** d\'importance', 'Ingrédients, fonctionnalités, charactéristiques, menu de navigation'],
              ['`ol` (ordered)', 'L\'ordre **compte** : une séquence', 'Étapes d\'une procédure, classement, top 10, instructions'],
              ['`dl` (description)', 'Des **paires** terme → définition', 'Glossaire, fiche technique, FAQ, caractéristiques d\'un produit']
            ]},
            { t: 'code', lang: 'html', label: 'Les trois types, version minimale', code:
'<ul>\n  <li>Farine de manioc</li>\n  <li>Huile rouge</li>\n</ul>\n\n<ol>\n  <li>Faire bouillir l\'eau</li>\n  <li>Verser la farine en pluie</li>\n</ol>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>Langage de structure du contenu</dd>\n  <dt>CSS</dt>\n  <dd>Langage de présentation</dd>\n</dl>' },
            { t: 'demo', height: 235, caption: 'ul, ol et dl rendues par le navigateur', html:
'<strong>Ingrédients</strong><ul style="margin:4px 0 10px"><li>Farine de manioc</li><li>Huile rouge</li></ul><strong>Étapes</strong><ol style="margin:4px 0 10px;padding-left:22px"><li>Faire bouillir l\'eau</li><li>Verser la farine</li></ol><strong>Glossaire</strong><dl style="margin:4px 0"><dt style="font-weight:700">HTML</dt><dd style="margin:0 0 4px 18px">Structure</dd><dt style="font-weight:700">CSS</dt><dd style="margin:0 0 0 18px">Présentation</dd></dl>' },
            { t: 'h3', h: 'Exemple réaliste : la fiche produit d\'Awa' },
            { t: 'p', h: 'Regarde comment les trois listes se complètent dans une vraie fiche de boutique : caractéristiques (ordre indifférent, `ul`), marche à suivre pour commander (séquence, `ol`), et fiche technique (paires, `dl`).' },
            { t: 'code', lang: 'html', label: 'produit.html — extraits', code:
'<!-- Caractéristiques : retirer l\'une ne casse rien -> ul -->\n<ul>\n  <li>Gari fin premium, mouture double</li>\n  <li>Sac de 5 kg, production de Savalou</li>\n</ul>\n\n<!-- Commande : étapes à suivre DANS L\'ORDRE -> ol -->\n<ol>\n  <li>Choisis ta quantité</li>\n  <li>Réserve par téléphone ou WhatsApp</li>\n  <li>Paye à la livraison (espèces ou MoMo)</li>\n</ol>\n\n<!-- Fiche technique : termes et valeurs associées -> dl -->\n<dl>\n  <dt>Origine</dt>\n  <dd>Savalou, Collines</dd>\n  <dt>Conservation</dt>\n  <dd>6 mois au sec, à l\'abri de l\'humidité</dd>\n  <dd>Refermer le sac après usage</dd>\n</dl>' },
            { t: 'p', h: 'Note la souplesse de `<dl>` : un terme peut avoir **plusieurs définitions** (plusieurs `dd` pour un seul `dt`, comme « Conservation » ici), et plusieurs termes peuvent partager **une** définition (plusieurs `dt` devant un `dd` — pratique pour les synonymes). C\'est la seule liste à deux colonnes logiques, et elle est trop méconnue.' },
            { t: 'h3', h: 'Imbriquer des listes : la règle d\'or du `<li>`' },
            { t: 'p', h: 'Pour créer une sous-liste, on place une **liste entière à l\'intérieur d\'un `<li>`** — jamais directement dans le `<ul>` parent. C\'est LA structure de tous les menus déroulants du web.' },
            { t: 'code', lang: 'html', code:
'<ul>\n  <li>Fruits\n    <ul>\n      <li>Mangues</li>\n      <li>Ananas</li>\n    </ul>\n  </li>\n  <li>Tubercules</li>\n</ul>' },
            { t: 'p', h: 'Pourquoi tant de rigidité ? Sous le capot, le navigateur construit le DOM à partir de ces règles. Une `<ul>` placée *entre* deux `<li>` crée une structure ambiguë que le navigateur « répare » à sa façon — et le DOM résultant ne ressemble plus à ton intention. Ton CSS (`ul ul li { ... }`) cessera de cibler ce que tu crois. La règle « un enfant direct de `ul`/`ol` est un `li`, et rien d\'autre » élimine toute cette catégorie de bugs.' },
            { t: 'h3', h: 'Sous le capot : puces, numéros et la boîte ::marker' },
            { t: 'p', h: 'Chaque `<li>` possède en réalité **deux boîtes** : la boîte de contenu et une petite boîte *marker* qui porte la puce ou le numéro. Depuis peu, tu la styles directement en CSS : `li::marker { color: tomato; }` — couleur, taille, et même contenu. Pour `ol`, la numérotation est un vrai compteur interne, ce qui rend naturels les attributs suivants :' },
            { t: 'ul', items: [
              '`start="4"` — commence la numérotation à 4 (pense à un tutoriel en plusieurs pages).',
              '`reversed` — numérote à rebours : parfait pour un compte à rebours ou un « top 3 » qui démarre par la médaille de bronze.',
              '`type="a"` ou `type="I"` — lettres ou chiffres romains. Ça fonctionne, mais en pratique, fais-le plutôt en CSS avec `list-style-type` : toute la présentation au même endroit.'
            ]},
            { t: 'code', lang: 'html', label: 'Le podium du carré des céréales, en reversed', code:
'<ol reversed>\n  <li>Tante Rose — médaille d\'or</li>\n  <li>Maman Sika — médaille d\'argent</li>\n  <li>Awa — médaille de bronze</li>\n</ol>\n<!-- Affiche : 3. Tante Rose / 2. Maman Sika / 1. Awa -->' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`list-style-type` vs `::marker` vs image de fond** — changer le style des puces : `list-style-type` d\'abord ; recolorer/agrandir : `::marker` ; remplacer par une icône : `list-style: none` + pseudo-élément ou image de fond. La dernière option est la plus flexible, mais utilise-la avec modération.',
              '**`dl` vs `<table>`** — pour une fiche technique : si chaque terme a une valeur (ou une petite liste), `dl` est plus léger et plus parlant ; s\'il y a **plusieurs lignes de mesures** (mois par mois, produit par produit), c\'est un tableau — la fiche *Tableaux* arrive justement.',
              '**Attribut `type` vs CSS `list-style-type`** — l\'attribut est figé dans le HTML ; le CSS te permet de varier selon la taille d\'écran ou le thème. Pro = CSS.',
              '**Menu de navigation : `ul` + `nav`** — la convention universelle : `<nav><ul><li><a …>`. Elle combine la fiche *Liens* avec celle-ci, et sera couronnée par le `<nav>` de la fiche *Sémantique*.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Une liste est un contenu du `body` (fiche *Structure*), ses éléments contiennent le texte riche de la fiche *Titres & texte* (`<li><strong>Gari premium</strong></li>`), et surtout : **un menu est une liste de liens** (fiche *Liens*). Tu as maintenant toutes les briques pour écrire la navigation complète de ton premier site.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« `ul`, c\'est \"à puces\", `ol`, c\'est \"numéroté\" » — c\'est leur **rendu par défaut**, pas leur sens. Une `ul` numérotée (`ol` déguisée) mentira aux machines ; le bon choix part de la question « l\'ordre compte-t-il ? » — le style se règle en CSS.',
              '« `dl` est vieux et déconseillé » — au contraire : c\'est la balise HTML5 officielle pour glossaires, fiches techniques et métadonnées. Elle est sous-utilisée par ignorance, pas par obsolescence.',
              '« Je peux mettre un `<h3>` ou un `<p>` directement dans un `<ul>` » — seuls des `<li>` sont admis en enfants directs. Mets ton titre AVANT la liste, et ton `<p>` DANS le `<li>`.',
              '« Les puces, ça se change avec des images collées dans le texte » — non : `list-style-type` ou `::marker` en CSS. Jamais de caractère « • » tapé à la main.',
              '« Une liste, c\'est pour les menus » — c\'est pour **tout groupe homogène** : résultats de recherche, cartes produits, galeries, étapes de paiement. Une fois l\'œil ouvert, tu verras des listes partout.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Un menu de navigation est sémantiquement une liste de liens : `<nav><ul><li><a ...>`. C\'est la convention universelle — les lecteurs d\'écran annoncent alors « liste de 5 éléments », ce qui aide énormément à s\'orienter.' }
          ],
          errors: [
            { title: 'Mettre autre chose qu\'un <li> dans un <ul>', bad: '<ul>\n  <p>Mon item</p>\n</ul>', good: '<ul>\n  <li><p>Mon item</p></li>\n</ul>', why: 'Seuls des `<li>` sont autorisés comme enfants directs de `ul`/`ol`. Le navigateur réparera ton HTML d\'une façon imprévisible, et ton CSS ne ciblera plus ce que tu crois.' },
            { title: 'Imbriquer la sous-liste à côté du <li>', bad: '<ul>\n  <li>Fruits</li>\n  <ul><li>Mangues</li></ul>\n</ul>', good: '<ul>\n  <li>Fruits\n    <ul><li>Mangues</li></ul>\n  </li>\n</ul>', why: 'Une liste dans une liste doit vivre DANS un élément `<li>`, sinon le DOM généré ne correspond pas à l\'imbrication visuelle attendue — et tes menus déroulants CSS casseront.' }
          ],
          related: ['html-texte', 'html-semantique', 'css-syntaxe-selecteurs']
        }
      ]
    },

    {
      id: 'contenu-riche',
      name: 'Contenu riche',
      icon: 'perm_media',
      fiches: [
        {
          id: 'html-images-medias',
          title: 'Images & médias',
          icon: 'image',
          level: 'Intermédiaire',
          tagline: 'img, srcset, picture, audio et video : des médias rapides, accessibles et adaptés à l\'écran.',
          intro: 'Les images représentent souvent la moitié du poids d\'une page web — et chaque kilo-octet coûte du temps de chargement à tout le monde, de la data réellement chère aux visiteurs dont la connexion décroche dès qu\'il pleut sur Cotonou. Une image mal intégrée peut doubler ce poids ou faire sauter toute la mise en page pendant le chargement. La bonne nouvelle : HTML moderne donne tout ce qu\'il faut pour servir **la bonne image, au bon écran, au bon moment** — mais ces attributs ne se devinent pas. On les prend dans l\'ordre.',
          blocks: [
            { t: 'h3', h: 'Pourquoi l\'image est l\'ennemi public n°1 de la performance' },
            { t: 'p', h: 'Retiens deux chiffres qui font réfléchir : une photo brute de smartphone pèse 3 à 12 Mo, et une page web médiane fait ~2,5 Mo **au total**. Une seule photo non optimisée peut donc sextupler le temps de chargement. Et le mal est double : pendant que l\'image se télécharge, si tu n\'as pas réservé sa place, tout le texte **saute** quand elle arrive (le fameux *layout shift* qui fait cliquer à côté du bouton). Bien vendre des images, c\'est de l\'ergonomie autant que de la technique.' },
            { t: 'h3', h: 'La base : `<img>`, mais bien remplie' },
            { t: 'code', lang: 'html', code:
'<img src="photos/cascade.jpg" alt="Cascade tombant dans une forêt tropicale" width="800" height="533" loading="lazy" decoding="async">' },
            { t: 'ul', items: [
              '`src` — le chemin de l\'image (relatif ou absolu ; les règles de la fiche *Liens* s\'appliquent telles quelles).',
              '`alt` — le texte **alternatif**. Ce n\'est ni une légende ni un tooltip : c\'est ce qui sera lu par un lecteur d\'écran et affiché si l\'image ne charge pas. Décris ce que l\'image *apporte*, pas ce qu\'elle est.',
              '`width` / `height` — les dimensions **réelles** du fichier. Les déclarer permet au navigateur de réserver exactement la place pendant le chargement : fini le texte qui saute.',
              '`loading="lazy"` — l\'image ne sera téléchargée que lorsqu\'elle approchera de l\'écran. Gratuit, natif, gain énorme sur les pages longues (galeries, catalogues).',
              '`decoding="async"` — autorise le navigateur à décoder l\'image hors du fil principal : la page ne fige pas pendant le décodage d\'une grosse image.'
            ]},
            { t: 'h3', h: 'alt : la question à se poser devant CHAQUE image' },
            { t: 'ol', items: [
              '**Si cette image disparaissait, quelle information perdrait-on ?** Aucune → c\'est du décor : `alt=""` (vide), le lecteur d\'écran l\'ignore poliment.',
              'Une vraie information → décris **l\'apport** en une phrase : pas « image1.jpg » ni juste « cascade », mais ce que l\'image montre d\'utile dans CE contexte.',
              'L\'image est **un lien** ? Décris la destination, pas l\'image : `alt="Accéder à la boutique Awa"` bat `alt="logo"`.  ',
              'Un graphique ou un schéma ? Résume la donnée clé, et offre l\'équivalent texte à côté si c\'est dense.'
            ]},
            { t: 'p', h: 'Et la fausse amie : `alt` n\'est **pas** `title`. L\'infobulle au survol vient de `title` — qui est optionnelle et souvent superflue. Un `alt` **absent**, c\'est une faute (le lecteur d\'écran lit le nom du fichier !) ; un `alt=""` **vide**, c\'est une décision propre : « ceci est décoratif ».' },
            { t: 'h3', h: 'Sous le capot : pixels CSS vs pixels réels' },
            { t: 'p', h: 'Pourquoi une image de 400 px paraît floue sur un bon téléphone ? Parce que le « pixel » du CSS est une unité **abstraite**. Un écran récent (densité 2x ou 3x, type Retina) remplit chaque pixel CSS avec 4 ou 9 pixels physiques. Pour rester nette sur un écran 2x, une image affichée 400 px de large doit donc être fournie en 800 px réels. C\'est exactement le problème que `srcset` résout, avec deux descripteurs : `w` (largeur réelle de chaque fichier, pour les tailles fluides) et `x` (densité, pour les tailles fixes).' },
            { t: 'h3', h: 'Des images adaptatives avec srcset et sizes' },
            { t: 'code', lang: 'html', code:
'<img src="cascade-800.jpg"\n     srcset="cascade-400.jpg 400w,\n             cascade-800.jpg 800w,\n             cascade-1600.jpg 1600w"\n     sizes="(max-width: 600px) 100vw, 50vw"\n     alt="Cascade en forêt" width="800" height="533">' },
            { t: 'p', h: 'Traduction littérale : « voici trois versions du même visuel, voici leurs largeurs réelles (`w`) ; et par ailleurs l\'image occupera 100 % de la largeur de l\'écran jusqu\'à 600 px, puis la moitié de l\'écran (`sizes`). » À partir de ces deux informations **et de la densité de l\'écran**, le navigateur calcule tout seul le fichier optimal. Un smartphone 390 px à densité 2 prendra `cascade-800.jpg` (390 × 2 ≈ 800, c\'est pile) — pas les 1600. Tu n\'as rien à programmer.' },
            { t: 'callout', kind: 'warn', h: '`sizes` est obligatoire avec les descripteurs `w`, et il doit coller à ta mise en page CSS réelle : si tu annonces 50vw mais que le CSS affiche l\'image pleine largeur, le navigateur choisira un fichier trop petit → image floue. Quand tu changes ta grille, pense à ajuster `sizes`.' },
            { t: 'h3', h: 'Exemple réaliste : la page produit d\'Awa' },
            { t: 'code', lang: 'html', label: 'produit.html — le visuel complet', code:
'<figure>\n  <picture>\n    <source srcset="img/gari.avif" type="image/avif">\n    <source srcset="img/gari.webp" type="image/webp">\n    <img src="img/gari.jpg" alt="Sac de gari premium ouvert, mouture fine visible"\n         width="1200" height="800" loading="lazy" decoding="async">\n  </picture>\n  <figcaption>Le gari d\'Awa : mouture fine, séchage traditionnel.</figcaption>\n</figure>' },
            { t: 'p', h: 'Trois idées dans ce bloc. `<picture>` sert les formats modernes (**AVIF** puis **WebP**, jusqu\'à 2-3 fois plus légers que le JPEG à qualité égale) aux navigateurs qui les comprennent, avec un JPEG universel en repli — le tout sans une ligne de JavaScript. `<figure>` + `<figcaption>` rattachent une légende visible à son média (mieux qu\'un `<p>` flottant). Et `loading="lazy"` car cette image est loin sous la ligne de flottaison.' },
            { t: 'h3', h: '`<picture>` : deux missions à ne pas confondre' },
            { t: 'ul', items: [
              '**Changement de format** (attribut `type`) : même image, encodage plus léger. Le navigateur prend le premier format qu\'il sait lire. → Cas n°1, 95 % des usages.',
              '**Direction artistique** (attribut `media`) : servir une image **différente** selon l\'écran — par exemple un plan resserré et vertical sur mobile, un panorama horizontal sur desktop. → Rare, mais irremplaçable quand le recadrage change le sens de l\'image : `<source media="(max-width: 600px)" srcset="hero-mobile.jpg">`.'
            ]},
            { t: 'h3', h: 'Audio et vidéo : le natif d\'abord' },
            { t: 'code', lang: 'html', code:
'<video controls width="640" poster="apercu.jpg" preload="metadata">\n  <source src="tuto.webm" type="video/webm">\n  <source src="tuto.mp4" type="video/mp4">\n  Votre navigateur ne lit pas la vidéo.\n</video>\n\n<audio controls src="podcast.mp3" preload="metadata"></audio>' },
            { t: 'p', h: '`controls` affiche les contrôles natifs — **sans lui, la vidéo est injouable** (oubli classique). `poster` donne une image d\'attente ; `preload="metadata"` télécharge juste durée et dimensions, pas le fichier entier, tant que l\'utilisateur n\'a pas cliqué. Plusieurs `<source>` offrent des formats de repli. Astuce « GIF moderne » : un `<video autoplay muted loop playsinline>` avec un MP4 pèse dix fois moins lourd qu\'un GIF animé — c\'est la technique des sites soignés.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`srcset` avec `w` vs avec `x`** — image fluide qui change de taille selon l\'écran (bannière, photo d\'article) : `w` + `sizes` ; image à taille fixe qui doit juste être nette sur Retina (logo 200 px, avatar) : plus simple avec `x` (`srcset="logo@2x.png 2x"`).',
              '**`<picture>` vs `srcset` seul** — même image, juste plus légère : `srcset` suffit ; format moderne avec repli OU recadrage par écran : `<picture>`.',
              '**`<video>` native vs iframe YouTube** — la native : contrôle total, aucun cookie tiers, lecture hors-ligne… mais **tu héberges le fichier** (coût de bande passante). YouTube : gratuit, adaptatif, partageable — au prix des trackers et du cadre YouTube. À Cotonou où la bande passante se paie, l\'iframe reste souvent rationnelle pour de la longue vidéo.',
              '**GIF animé vs `<video muted loop>`** — GIF : simple, mais énorme et 256 couleurs ; `<video>` MP4/WebM : ~10× plus léger, plus net, pausable. Le « GIF » moderne est une vidéo muette en boucle.',
              '**`lazy` vs `eager`** — `lazy` partout… **sauf** pour l\'image principale visible dès l\'ouverture (le hero) : elle doit partir en `eager` (le défaut), sinon tu retardes le premier rendu.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Chemins relatifs : tout ce qui vaut pour `href` vaut pour `src` (fiche *Liens*) — et une `<img>` peut s\'enrouler dans un `<a>` (vignette → plein écran) ou vivre dans une `<figure>` sémantique (fiche *Sémantique*). Pour l\'image hero, on verra `<link rel="preload">` dans la fiche *Le `<head>`* : c\'est le complément performance parfait de cette fiche.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« `width="300"` redimensionne mon image » — non : ça redimensionne l\'**affichage**, pas le **fichier**. Le visiteur télécharge quand même les 12 Mo. Le redimensionnement se fait dans ton éditeur d\'images / ton build.',
              '« `alt=""` vide, c\'est pareil que pas d\'`alt` » — inverse exact : vide = « décor, ignore sereinement » ; absent = faute (le lecteur lit « g a r i point j p g »…).',
              '« `lazy` partout, c\'est gratuit » — sur l\'image hero, c\'est un contresens qui retarde le premier affichage.',
              '« `poster` est obligatoire » — non, c\'est une vitrine optionnelle ; sans lui, la première image (ou le fond noir) s\'affiche.',
              '« Mettre l\'image en base64 dans le HTML, c\'est optimisé » — au contraire : +33 % de poids, impossible à mettre en cache séparément. Réservé aux tout petits pictogrammes dans le CSS.',
              '« `srcset` choisit selon le débit » — non : il choisit selon la **taille d\'affichage et la densité d\'écran**. Le débit ne rentre pas dans l\'équation (c\'est le rôle du streaming adaptatif pour la vidéo).'
            ]},
            { t: 'callout', kind: 'warn', h: 'Ne laisse jamais `alt` « au hasard ». Deux décisions propres seulement : image purement décorative → `alt=""` ; image informative → une vraie description de l\'apport. Tout le reste est à corriger.' }
          ],
          errors: [
            { title: 'Redimensionner via HTML au lieu d\'optimiser le fichier', bad: '<img src="photo-12-Mo.jpg" width="300">', good: '<img src="photo-600px.webp" width="300" height="200" alt="...">', why: 'width/height changent l\'affichage, pas le poids téléchargé. Le visiteur paie quand même les 12 Mo — en temps ET en data. Exporte une version adaptée (WebP/AVIF, ~la taille d\'affichage), puis sers-la via srcset pour les écrans denses.' },
            { title: 'alt="image1.jpg" ou alt="image"', bad: '<img src="produit.jpg" alt="image">', good: '<img src="produit.jpg" alt="Sac de gari premium de 5 kg, mouture fine">', why: 'Un alt générique n\'aide ni le non-voyant, ni le référencement, ni l\'utilisateur dont l\'image n\'a pas chargé. Décris l\'information, pas le fichier.' }
          ],
          related: ['html-liens', 'html-semantique', 'css-responsive']
        },

        {
          id: 'html-tableaux',
          title: 'Tableaux',
          icon: 'table',
          level: 'Intermédiaire',
          tagline: 'table, thead, tbody, colspan : structurer de vraies données tabulaires (et rien d\'autre).',
          intro: 'Le tableau HTML traîne une réputation volée. Dans les années 2000, faute de CSS digne de ce nom, on s\'en servait pour découper la mise en page des sites — une colonne pour le menu, une pour le contenu. Ce détournement a fait tant de dégâts que « tableau » est devenu un gros mot. Aujourd\'hui, la règle est limpide et facile à mémoriser : `<table>` présente des **données** (un relevé, un planning, un comparatif), le CSS fait la mise en page. Et bien construit, un tableau n\'est pas un truc ringard : c\'est l\'un des composants les plus accessibles du web.',
          blocks: [
            { t: 'h3', h: 'D\'abord l\'intuition : deux dimensions, deux directions de lecture' },
            { t: 'p', h: 'Qu\'est-ce qui différencie des données tabulaires d\'une liste ? La **relation croisée**. Dans « Février → 1 510 ventes », la cellule n\'a de sens qu\'à l\'intersection d\'une ligne et d\'une colonne : elle répond à deux questions à la fois (« quel mois ? quelle mesure ? »). Tant que ton information répond à une seule question, reste sur une liste ; dès qu\'elle en répond à deux, c\'est un tableau. Ce test en deux secondes tranche 95 % des hésitations.' },
            { t: 'code', lang: 'html', label: 'La structure correcte, version minimale', code:
'<table>\n  <caption>Ventes du trimestre</caption>\n  <thead>\n    <tr>\n      <th scope="col">Mois</th>\n      <th scope="col">Ventes</th>\n      <th scope="col">Évolution</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Janvier</th>\n      <td>1 240</td>\n      <td>+4 %</td>\n    </tr>\n    <tr>\n      <th scope="row">Février</th>\n      <td>1 510</td>\n      <td>+21 %</td>\n    </tr>\n  </tbody>\n</table>' },
            { t: 'ul', items: [
              '`tr` — une ligne (*table row*).',
              '`td` — une cellule de données (*table data*).',
              '`th` — une cellule d\'**en-tête**, en gras par défaut. C\'est le personnage clé de l\'histoire : avec `scope="col"` ou `scope="row"`, tu déclares si elle décrit sa colonne ou sa ligne.',
              '`thead` / `tbody` / `tfoot` — regroupent l\'en-tête, le corps et le pied (totaux, sommes). À l\'impression de longues tables, le navigateur **répète le `thead` sur chaque page** — gratuit.',
              '`caption` — le titre du tableau, annoncé **avant** que la table ne soit lue. Bien plus utile qu\'un titre perdu dans un `<p>` au-dessus.',
            ]},
            { t: 'p', h: 'Pourquoi tant de cérémonie autour de `th scope` ? Écoute ce que dit un lecteur d\'écran sans lui : « 1 240, plus 4 % » — incompréhensible hors contexte visuel. Avec les `scope`, il annonce : « Mois : Janvier. Ventes : 1 240. Évolution : plus 4 % ». Chaque cellule devient autoportante, comme si tu relisais la fiche au téléphone. C\'est ÇA, l\'accessibilité des tableaux : la donnée se défend toute seule.' },
            { t: 'demo', height: 210, caption: 'Le tableau ci-dessus, stylé au minimum', html:
'<table style="border-collapse:collapse;width:100%"><caption style="font-weight:700;text-align:left;padding-bottom:8px">Ventes du trimestre</caption><thead><tr><th style="text-align:left;border-bottom:2px solid #333;padding:6px">Mois</th><th style="text-align:left;border-bottom:2px solid #333;padding:6px">Ventes</th><th style="text-align:left;border-bottom:2px solid #333;padding:6px">Évolution</th></tr></thead><tbody><tr><td style="border-bottom:1px solid #ddd;padding:6px">Janvier</td><td style="border-bottom:1px solid #ddd;padding:6px">1 240</td><td style="border-bottom:1px solid #ddd;padding:6px">+4 %</td></tr><tr><td style="padding:6px">Février</td><td style="padding:6px">1 510</td><td style="padding:6px;color:green">+21 %</td></tr></tbody></table>' },
            { t: 'h3', h: 'Exemple réaliste : la tontine du quartier' },
            { t: 'code', lang: 'html', label: 'tontine.html — relevé complet avec pied de table', code:
'<table class="table-scroll">\n  <caption>Tontine « Espoir » — versements de mars</caption>\n  <colgroup>\n    <col>\n    <col>\n    <col style="text-align:right">\n  </colgroup>\n  <thead>\n    <tr>\n      <th scope="col">Membre</th>\n      <th scope="col">Jour de tour</th>\n      <th scope="col">Versement</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Awa M.</th>\n      <td>5 mars</td>\n      <td>50 000 FCFA</td>\n    </tr>\n    <tr>\n      <th scope="row">Tante Rose</th>\n      <td>12 mars</td>\n      <td>50 000 FCFA</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total collecté</th>\n      <td></td>\n      <td><strong>100 000 FCFA</strong></td>\n    </tr>\n  </tfoot>\n</table>' },
            { t: 'p', h: 'Deux ajouts « vrai projet » : le `tfoot` pour le total (structurellement, il peut se placer après `tbody` — le navigateur l\'affichera en bas), et `colgroup` pour **coiffer des colonnes entières** d\'un style commun (ici, aligner les montants à droite d\'un coup, sans répéter une classe sur chaque cellule). Petite limite à connaître : `col` ne transporte que peu de propriétés (largeur, fond, bordures, visibilité) — pour typographier le texte d\'une colonne, on visera plutôt `td:nth-child(3)`.' },
            { t: 'h3', h: 'Sous le capot : comment le navigateur mesure les colonnes' },
            { t: 'p', h: 'Par défaut, un tableau se met en page en mode **automatique** : le navigateur lit TOUT le contenu, puis répartit les largeurs de colonnes selon ce qu\'elles contiennent. Deux conséquences utiles à connaître. D\'abord, le tableau grandit si le contenu grandit — c\'est pourquoi une URL longue peut « exploser » une colonne (le CSS `word-break` sert là). Ensuite, ce double passage coûte du temps de rendu sur les très grosses tables : `table-layout: fixed` fige les largeurs dès la première ligne (prévisible et rapide), au prix d\'un rognage possible des contenus longs. Et `border-collapse: collapse` — LE réflexe n°1 de tout tableau stylé — fusionne les doubles bordures apparentes entre cellules.' },
            { t: 'h3', h: 'Fusions : colspan et rowspan sans drame' },
            { t: 'code', lang: 'html', code:
'<tr>\n  <td colspan="2">Total semestre</td>\n  <td>7 890</td>\n</tr>\n<tr>\n  <td rowspan="2">Zone Afrique de l\'Ouest</td>\n  <td>Bénin</td>\n  <td>420</td>\n</tr>\n<tr>\n  <td>Togo</td>\n  <td>310</td>\n</tr>' },
            { t: 'p', h: '`colspan="n"` étire une cellule sur n colonnes, `rowspan="n"` sur n lignes. La règle d\'or qui évite tous les drames : **après une fusion, la rangée contient moins de cellules écrites, mais toujours le même total de colonnes logiques**. Compte en colonnes, pas en balises : si ton tableau a 3 colonnes et qu\'une cellule en vaut 2, la ligne n\'en écrira que 2 (2 + 1 = 3). Une cellule mal comptée, et le tableau « tire » d\'un côté ou crée un trou — réflexe : recompte chaque rangée concernée par une fusion.' },
            { t: 'h3', h: 'Tableaux et petits écrans' },
            { t: 'p', h: 'Un tableau large déborde sur mobile — et un tableau est *censé* être large, c\'est sa nature. La réponse standard, simple, efficace et tactile : l\'envelopper dans un conteneur défilant horizontalement. Les données restent intactes, la page ne se casse pas, et le geste est naturel sur téléphone.' },
            { t: 'code', lang: 'css', code:
'.table-scroll {\n  overflow-x: auto;     /* défilement horizontal si (et seulement si) besoin */\n}\n.table-scroll table {\n  min-width: 560px;   /* le tableau garde sa lisibilité, le conteneur défile */\n}' },
            { t: 'p', h: 'Point d\'accessibilité pro : un conteneur défilant devrait être atteignable au clavier. Deux attributs suffisent sur le wrapper : `tabindex="0"` et un `role="region"` avec un `aria-label` (« Tableau des ventes, défilement horizontal »). Détail rare, mais c\'est ce genre de touche qui distingue un composant fini.' },
            { t: 'callout', kind: 'tip', h: 'Pour le style, la base qui suffit presque toujours : `border-collapse: collapse` pour des bordures propres, puis un zébrage `tbody tr:nth-child(even) { background: ... }`. La fiche *Sélecteurs CSS* t\'ouvrira tous les raffinements.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`<table>` vs `<dl>`** — paires terme/valeur par ligne (fiche technique) : `dl`, plus simple ; plusieurs lignes de mesures croisant plusieurs dimensions : `table`. Retour au test « une question ou deux ».',
              '**`<table>` vs grille CSS pour une app** — un calendrier de réservation, un seat-picker, un dashboard : ce sont des **interfaces**, pas des documents de données. Grille CSS + ARIA si nécessaire ; le `<table>` reste le roi du document.',
              '**`caption` vs titre `<h2>` au-dessus vs `aria-label`** — `caption` gagne : c\'est le seul rattaché **structurellement** à la table (lu en premier, déplacé avec elle). Le `<h2>` reste valable si le tableau est la section entière ; `aria-label` uniquement quand aucun titre visible n\'est souhaité.',
              '**Table simple vs divs + `role="table"`** — ne reconstruis JAMAIS une table en `<div>` : tu réécrirais à la main, en ARIA, ce que `<table>` offre gratuitement. La div-fantaisie est un anti-pattern.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Chaque cellule contient le texte enrichi de la fiche *Titres & texte* (`<td>Paiement <strong>reçu</strong></td>`). `th` est au tableau ce que le sémantique est à la page — te voilà prêt pour la fiche *Sémantique*. Et pour mettre une colonne entière en valeur, les sélecteurs du module CSS reprendront le relais de `colgroup`.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« Les tableaux, c\'est interdit / ringard » — faux : **détournés pour la mise en page**, oui, c\'est fini ; pour les données, ils sont irremplaçables et au top de l\'accessibilité. Tout est dans le « pour quoi ? ».',
              '« `th`, c\'est pour mettre en gras » — le gras est un rendu par défaut ; `th` **déclare un rôle d\'en-tête**. Un simple `<td>` gras via CSS n\'annoncera rien à personne.',
              '« `colspan` ajoute des cellules » — non : il **consomme** des colonnes voisines. La ligne contient moins de balises après fusion, jamais plus.',
              '« Un tableau doit tenir dans l\'écran coûte que coûte » — mieux vaut un défilement horizontal assumé qu\'un tableau ratatiné illisible. Le contenu prime.',
              '« L\'ordre thead/tbody/tfoot est rigide » — `tfoot` peut s\'écrire après `tbody` : le navigateur affichera quand même le pied en bas. Utile quand le total vient d\'un calcul.'
            ]}
          ],
          errors: [
            { title: 'Utiliser un tableau pour la mise en page', bad: '<table>\n  <tr>\n    <td><nav>menu</nav></td>\n    <td><main>contenu</main></td>\n  </tr>\n</table>', good: '<div class="layout">\n  <nav>menu</nav>\n  <main>contenu</main>\n</div>\n<style>.layout{display:grid;grid-template-columns:220px 1fr}</style>', why: 'Un tableau annonce aux technologies d\'assistance « voici des données en relation ». Pour une mise en page, c\'est un mensonge sémantique qui piège le lecteur d\'écran : flexbox et grid font ça infiniment mieux.' },
            { title: 'Des <td> en guise d\'en-têtes', bad: '<tr>\n  <td><b>Nom</b></td>\n  <td><b>Âge</b></td>\n</tr>', good: '<tr>\n  <th scope="col">Nom</th>\n  <th scope="col">Âge</th>\n</tr>', why: '`<b>` ne change que l\'apparence, `<th>` déclare le rôle d\'en-tête. Le tableau devient navigable pour les lecteurs d\'écran (« Nom : Awa » au lieu de « Awa » tout seul) et mieux compris par les moteurs.' }
          ],
          related: ['html-listes', 'html-semantique', 'css-grid', 'css-responsive']
        },

        {
          id: 'html-formulaires',
          title: 'Formulaires',
          icon: 'edit_note',
          level: 'Intermédiaire',
          tagline: 'form, input, label, validation native : collecter des données proprement et sans JavaScript.',
          intro: 'Partout ailleurs sur ta page, tu *donnes* de l\'information au visiteur. Le formulaire est le seul endroit où c\'est **lui qui t\'en donne** : son nom, son numéro, sa commande, son argent. C\'est donc, au franc près, la zone la plus rentable de ton site — et, pas de chance, celle où chaque friction (un champ mal étiqueté, un clavier mal adapté) fait abandonner des clients. La bonne nouvelle tient en une phrase : HTML moderne embarque une validation complète, gratuite et native. La plupart des formulaires « compliqués » qu\'on rencontre sont en réalité… mal balisés.',
          blocks: [
            { t: 'h3', h: 'Pourquoi les formulaires méritent ta meilleure attention' },
            { t: 'p', h: 'Sur un écran de téléphone tenu d\'une main, chaque chiffre compte. Une étiquette floue, et l\'utilisateur hésite ; un mauvais clavier qui s\'ouvre (lettres au lieu de chiffres pour un numéro), et il soupire ; une erreur non expliquée à l\'envoi, et il part commander ailleurs. Tu ne le verras jamais dans tes logs : ce sera juste un client de moins. Tout ce qu\'on va voir dans cette fiche — `label`, bons `type`, validation native — sert un seul objectif : **réduire le coût d\'effort** de celui qui te donne quelque chose.' },
            { t: 'h3', h: 'Le trio de base : form, label, input — d\'abord l\'intuition' },
            { t: 'p', h: 'Imagine le formulaire papier d\'une boutique : le carton imprimé (le `form`), le libellé imprimé devant chaque case (le `label`), la case elle-même (l\'`input`), et le cachet final (« Envoyé pour traitement » = le bouton submit). HTML reproduit fidèlement cette logique. Le détail que personne ne soupçonne au début : un libellé posé **à côté** d\'une case n\'est pas *relié* à elle — il faut les attacher explicitement.' },
            { t: 'code', lang: 'html', label: 'Le minimum vital qui fonctionne', code:
'<form action="/inscription" method="post">\n  <label for="email">Adresse e-mail</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="mdp">Mot de passe</label>\n  <input type="password" id="mdp" name="password" minlength="8" required>\n\n  <button type="submit">Créer mon compte</button>\n</form>' },
            { t: 'p', h: 'Trois points **vitaux** se cachent dans ces quelques lignes. Un : le `<label>` est relié à son champ par le couple `for`/`id` — cliquer sur le libellé active le champ (bénédiction sur mobile), et le lecteur d\'écran annonce la bonne étiquette. Deux : c\'est `name` — **pas `id`** — qui devient la clé envoyée au serveur. Un input sans `name` envoie… absolument rien. Trois : `action` et `method` décident où et comment les données partent. Sans `action`, le formulaire se renvoie vers la page courante (c\'est parfois voulu pour un traitement JS).' },
            { t: 'demo', height: 235, caption: 'Ce formulaire fonctionne déjà — teste la validation native', html:
'<form style="display:flex;flex-direction:column;gap:10px;max-width:320px"><label for="d-email" style="font-weight:600">Adresse e-mail</label><input id="d-email" type="email" required placeholder="toi@exemple.bj" style="padding:9px 12px;border:1px solid #bbb;border-radius:8px;font:inherit"><label for="d-mdp" style="font-weight:600">Mot de passe (8 car. min)</label><input id="d-mdp" type="password" minlength="8" required style="padding:9px 12px;border:1px solid #bbb;border-radius:8px;font:inherit"><button type="submit" style="padding:10px;border:none;border-radius:8px;background:#0a84ff;color:#fff;font:inherit;font-weight:600;cursor:pointer">Créer mon compte</button></form>' },
            { t: 'h3', h: 'GET ou POST : la question se pose à chaque `<form>`' },
            { t: 'table', head: ['', 'GET', 'POST'], rows: [
              ['Où voyagent les données', 'Dans l\'URL (`?q=gari`)', 'Dans le corps de la requête, invisibles'],
              ['Partageable / marquable', 'Oui — on peut copier le lien de recherche', 'Non — et tant mieux pour les secrets'],
              ['Taille des données', 'Limitée par l\'URL', 'Large (fichiers via `multipart`)'],
              ['Cas typique', 'Recherche, filtres d\'un catalogue', 'Inscription, paiement, mot de passe']
            ]},
            { t: 'p', h: 'Le réflexe à développer : **si le résultat doit être partageable par lien** (une recherche « gari », une page filtrée), c\'est `GET` — et ne mets jamais un mot de passe ni une donnée privée dans une URL. Pour tout le reste, `POST`. C\'est aussi une question de sémantique HTTP : GET annonce « je lis », POST « je transmets ». Les modules PHP/Laravel reprendront cette distinction côté serveur.' },
            { t: 'h3', h: 'Les types d\'input qui te font gagner du code (et le clavier magique)' },
            { t: 'p', h: 'Chaque `type` fait trois cadeaux d\'un coup : le bon **clavier** sur mobile (chiffres pour `tel`, arobase en évidence pour `email`), une **validation** gratuite, et de meilleures **aides à la saisie**. Tableau de chasse :' },
            { t: 'table', head: ['type', 'Comportement offert'], rows: [
              ['`email`', 'Clavier avec @ en évidence + vérifie la forme de l\'e-mail'],
              ['`password`', 'Masque la saisie (+ bouton œil natif dans certains navigateurs)'],
              ['`number`', 'Chiffres ; `min`, `max`, `step` disponibles'],
              ['`tel`', 'Clavier téléphonique (pas de validation imposée : les numéros varient)'],
              ['`date`', 'Sélecteur de date natif'],
              ['`checkbox`', 'Cases indépendantes — plusieurs peuvent être cochées'],
              ['`radio`', 'Choix **unique** dans un groupe (le `name` commun les lie)'],
              ['`range`', 'Curseur, avec `min`/`max`'],
              ['`file`', 'Envoi de fichier (`accept=".jpg,.png"` filtre le dialogue)'],
              ['`search`', 'Champ de recherche, avec croix d\'effacement native']
            ]},
            { t: 'p', h: 'Deux attributs modernes qui changent la vie sur mobile. `inputmode` impose le clavier **indépendamment du type** (`inputmode="numeric"` pour un code PIN ficelé en texte). Et `autocomplete` laisse le navigateur préremplir : `autocomplete="tel"` sur un numéro, `autocomplete="one-time-code"` sur le code SMS de confirmation MoMo — ce dernier ouvre même la suggestion automatique du code reçu par SMS sur beaucoup de téléphones. Zéro JavaScript, UX de grande app.' },
            { t: 'h3', h: 'Exemple réaliste : le bon de commande d\'Awa' },
            { t: 'code', lang: 'html', label: 'commande.html — un vrai formulaire de boutique', code:
'<form action="/commander" method="post">\n\n  <label for="nom">Nom complet</label>\n  <input type="text" id="nom" name="nom" autocomplete="name" required>\n\n  <label for="tel">Téléphone (pour la livraison)</label>\n  <input type="tel" id="tel" name="telephone" inputmode="tel"\n         autocomplete="tel" placeholder="6X XX XX XX" required>\n\n  <label for="commune">Commune de livraison</label>\n  <select id="commune" name="commune" required>\n    <option value="">— Choisir —</option>\n    <option value="cotonou">Cotonou</option>\n    <option value="abomey-calavi">Abomey-Calavi</option>\n    <option value="porto-novo">Porto-Novo</option>\n  </select>\n\n  <label for="quartier">Quartier</label>\n  <input type="text" id="quartier" name="quartier" list="quartiers">\n  <datalist id="quartiers">\n    <option value="Akpakpa">\n    <option value="Fidjrossè">\n    <option value="Cadjehoun">\n  </datalist>\n\n  <fieldset>\n    <legend>Paiement</legend>\n    <label><input type="radio" name="paiement" value="especes" checked> Espèces à la livraison</label>\n    <label><input type="radio" name="paiement" value="momo"> MTN MoMo</label>\n    <label><input type="radio" name="paiement" value="moov"> Moov Money</label>\n  </fieldset>\n\n  <label for="precision">Précisions (optionnel)</label>\n  <textarea id="precision" name="precision" rows="3" maxlength="300"></textarea>\n\n  <button type="submit">Valider ma commande</button>\n</form>' },
            { t: 'p', h: 'Deux pièces méritent un arrêt. D\'abord `<datalist>` : la petite perle méconnue qui offre des **suggestions sans fermer la saisie** — la commune est fermée (`select`), le quartier est libre mais suggéré (`datalist`). C\'est la combo « champ texte + aide » des apps natives, en trois lignes de HTML. Ensuite, le `fieldset`/`legend` : les trois labels radio (« Espèces », « MTN MoMo »…) sont muets pris isolément ; la `legend` « Paiement » leur donne leur contexte, annoncé par les lecteurs d\'écran à l\'entrée du groupe.' },
            { t: 'h3', h: 'La validation native : required, minlength, pattern' },
            { t: 'code', lang: 'html', code:
'<input type="text" name="pseudo" required minlength="3" maxlength="20"\n       pattern="[A-Za-z0-9_]+" title="Lettres, chiffres et underscore uniquement">' },
            { t: 'p', h: 'À la soumission, le navigateur bloque l\'envoi et affiche une bulle d\'erreur **sans JavaScript** : champ vide, format `email`, longueur, `pattern` (une expression régulière vérifiée sur toute la valeur ; `title` fournit le message). À connaître aussi : la pseudo-classe CSS moderne `:user-invalid` ne colore le champ en rouge **qu\'après interaction** de l\'utilisateur (contrairement à `:invalid`, qui rougit un formulaire vierge — mauvais accueil). Et en débogage, `novalidate` sur le `<form>` désactive toute la validation pour tester ton serveur à la main.' },
            { t: 'p', h: 'Dernier distinguo piégeux : `disabled` vs `readonly`. Un champ **désactivé** (`disabled`) est grisé, non cliquable… **et n\'est pas envoyé** du tout. Un champ en `readonly` reste lisible par l\'utilisateur (copie possible) **et est envoyé** normalement. Pour pré-remplir un montant non modifiable qui doit arriver au serveur : `readonly`, pas `disabled` — ou un champ caché `type="hidden"`.' },
            { t: 'callout', kind: 'warn', h: 'La validation HTML est un **confort** côté client, jamais une sécurité. N\'importe qui peut la contourner (outils de développement). Toutes les données doivent être re-vérifiées côté serveur — c\'est la première loi des modules PHP, Laravel et Node.' },
            { t: 'h3', h: 'Sous le capot : ce qui part VRAIMENT au serveur' },
            { t: 'p', h: 'Quand tu cliques « Valider ma commande » en POST, le navigateur assemble un petit paquet texte au format `application/x-www-form-urlencoded`. Chaque élément devient `nom_du_champ=valeur`, séparés par des `&` :' },
            { t: 'code', lang: 'html', label: 'Le corps de la requête, tel qu\'expédié', code:
'nom=Awa+Mensah&telephone=61234567&commune=cotonou&paiement=momo&precision=Livrer+avant+18h' },
            { t: 'p', h: 'Trois règles qui s\'expliquent soudain. Pour qu\'une **checkbox** envoie quelque chose, donne-lui une `value` (sinon, cochée, elle envoie `on` — pas très parlant). Les **radio** partagent un `name` : seule l\'option choisie part. Et dès qu\'il y a un `type="file"`, le formulaire doit passer en `enctype="multipart/form-data"` (le fichier ne tient pas dans du texte). Le jour où tu liras `$_POST` en PHP ou `req.body` en Express, tu reconnaîtras ce paquet : c\'est le même.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`select` vs groupe de `radio` vs `datalist`** — choix fermé et long (pays) : `select` ; choix fermé et court (2-4 options, lisibilité) : `radio` ; choix **ouvert avec suggestions** : `datalist`. Une seule bonne réponse par contexte.',
              '**Validation native vs JS vs serveur** — native : confort instantané, 0 code. JS : messages sur mesure, vérifications croisées (« confirmer le mot de passe »), envoi AJAX fluide. Serveur : garde-fou final, **non négociable** quoi qu\'il arrive. Les trois couches se complètent, jamais ne se remplacent.',
              '**Envoi `<form>` classique vs `fetch()` JS** — le classique recharge la page (parfait pour un premier site, et c\'est le socle que PHP/Laravel consomment). `fetch()` reste sur la page (UX d\'application ; modules JS/React). Les deux viennent du MÊME HTML — d\'où l\'importance de bien le baliser dès maintenant.',
              '**`placeholder` vs `label`** — le placeholder est un **indice de format** (« 6X XX XX XX ») qui disparaît à la saisie ; il ne remplace JAMAIS le libellé. Un champ sans label est un champ muet.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Le `<label>` et son champ, c\'est de la mise en relation à la *Liens* (un `for` vers un `id`, comme une ancre vers sa cible). Les groupes de boutons réutilisent les listes et le texte riche. Le bouton vs le lien : la distinction **action / navigation** de la fiche *Liens* s\'incarne ici dans `type="submit"` vs `<a>`. Enfin, `charset="UTF-8"` de la fiche *Structure* garantit que « Fidjrossè » arrive intact au serveur.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« C\'est `id` qui envoie les données » — non : `id` sert au HTML/CSS/JS **interne** (label, ancres, sélecteurs) ; `name` sert à l\'**envoi**. Pas de `name`, pas de données.',
              '« Le placeholder suffit pour étiqueter » — il disparaît à la première lettre tapée et n\'est pas un label pour les technologies d\'assistance. `placeholder` = indice de format, `label` = identité.',
              '« `required` sécurise mon site » — il embellit l\'expérience, mais se contourne en 5 secondes. La vraie validation vit côté serveur.',
              '« `disabled` = `readonly` » — `disabled` n\'envoie rien, `readonly` envoie. Ce piège a vidé bien des montants de commandes.',
              '« Un `<button>` sans `type` est neutre » — dans un `<form>`, il vaut `submit` par défaut : ton bouton « Annuler » *envoie* le formulaire. Toujours déclarer `type`.',
              '« GET pour lire, POST pour écrire, toujours » — c\'est l\'intention HTTP, pas une loi mécanique : un gros envoi de formulaire de recherche avancée en POST existe aussi. Pars du critère « résultat partageable par URL ? ».'
            ]}
          ],
          errors: [
            { title: 'Un label flottant, non relié au champ', bad: '<label>Email</label>\n<input type="email" id="e">', good: '<label for="e">Email</label>\n<input type="email" id="e" name="email">', why: 'Sans for/id correspondants, le clic sur le label ne fait rien et le lecteur d\'écran n\'annonce pas l\'étiquette. Alternative valide : envelopper l\'input dans le label.' },
            { title: 'type="text" pour tout', bad: '<input type="text" name="age">', good: '<input type="number" name="age" min="0" max="120">', why: 'Le bon type donne le bon clavier sur mobile, une validation gratuite et de meilleures aides à la saisie. Zéro effort pour beaucoup d\'ergonomie — surtout sur téléphone.' },
            { title: 'Un bouton sans type dans un formulaire', bad: '<form>\n  <button>Annuler</button>\n</form>', good: '<button type="button">Annuler</button>', why: 'Dans un `<form>`, un `<button>` sans type vaut `type="submit"` par défaut : ton bouton « Annuler » ENVOIE le formulaire. Déclare toujours le type.' }
          ],
          related: ['html-structure', 'html-texte', 'js-evenements', 'js-fetch']
        },
      ]
    },

    {
      id: 'architecture',
      name: 'Architecture & métadonnées',
      icon: 'account_tree',
      fiches: [
        {
          id: 'html-semantique',
          title: 'HTML sémantique',
          icon: 'account_tree',
          level: 'Intermédiaire',
          tagline: 'header, nav, main, article, section : donner du sens à la structure, pas juste des boîtes.',
          intro: 'Tu peux construire une page entière avec des `<div>`. Elle fonctionnera — visuellement. Mais pour un moteur de recherche qui indexe, un lecteur d\'écran qui navigue, ou un collègue qui reprend ton code dans six mois, ce sera une soupe de boîtes anonymes : impossible de dire « le contenu principal est ici, ce bloc est une navigation, celui-là un article autonome ». Le HTML sémantique consiste à **nommer les rôles**. C\'est la fiche qui transforme des pages qui « marchent » en pages qui *parlent*.',
          blocks: [
            { t: 'h3', h: 'Pourquoi donner des noms à des boîtes ?' },
            { t: 'p', h: 'Pense à une ville où tu débarques sans plan. Si tout s\'appelle « rue », tu tournes en rond ; s\'il y a « le marché », « la mairie », « la gare », tu te repères d\'instinct. Les balises sémantiques sont les **repères** de ta page : `header` (l\'entrée), `nav` (les panneaux indicateurs), `main` (le cœur), `aside` (l\'annexe), `footer` (la sortie). Et voici le point concret : ces repères sont *réellement* utilisés. Le rotor de VoiceOver (le lecteur d\'écran d\'Apple) propose littéralement un menu « Repères » qui liste `main`, `navigation`, `banner`... L\'utilisateur saute d\'un repère à l\'autre comme toi tu scannes visuellement. Sans eux, il doit écouter toute la page, en entier, chaque fois.' },
            { t: 'table', head: ['Balise', 'Rôle déclaré'], rows: [
              ['`header`', 'En-tête de la page ou d\'une section (logo, titre, accroche)'],
              ['`nav`', 'Bloc de navigation (principal ou secondaire)'],
              ['`main`', 'Le contenu **principal** — **unique** par page'],
              ['`section`', 'Regroupement thématique, généralement avec un titre'],
              ['`article`', 'Contenu **autonome et redistribuable** : post, carte produit, commentaire'],
              ['`aside`', 'Contenu complémentaire au contexte (barre latérale, encadré « à lire aussi »)'],
              ['`footer`', 'Pied de page ou de section (mentions, auteur, liens de fin)'],
              ['`figure` / `figcaption`', 'Média + légende solidaires (déplaçables ensemble)'],
              ['`time`', 'Date/heure **lisible par les machines** (attribut `datetime`)'],
              ['`address`', 'Coordonnées de **contact** de l\'article ou du site (pas n\'importe quelle adresse)']
            ]},
            { t: 'h3', h: 'À quoi ressemble une vraie page' },
            { t: 'code', lang: 'html', label: 'Une structure complète, lisible à voix haute', code:
'<body>\n  <header>\n    <nav><!-- logo + menu --></nav>\n  </header>\n\n  <main>\n    <h1>Le marché Dantokpa en pratique</h1>\n\n    <article>\n      <h2>Se repérer dans les allées</h2>\n      <p>Publié le <time datetime="2026-07-21">21 juillet 2026</time></p>\n\n      <section>\n        <h3>Le carré des céréales</h3>\n        <p>...</p>\n      </section>\n    </article>\n\n    <article>\n      <h2>Négocier les prix</h2>\n      <p>...</p>\n    </article>\n  </main>\n\n  <aside>\n    <h2>À lire aussi</h2>\n    <!-- ... -->\n  </aside>\n\n  <footer>© 2026 — Boutique Awa</footer>\n</body>' },
            { t: 'demo', height: 250, caption: 'Les grandes zones d\'une page sémantique', html:
'<div style="font-family:monospace;font-size:13px;display:flex;flex-direction:column;gap:6px;height:100%"><div style="background:#ffe2c2;padding:10px;border-radius:8px">header &gt; nav</div><div style="display:flex;gap:6px;flex:1"><div style="background:#d2e6ff;padding:10px;border-radius:8px;flex:2">main &gt; article &gt; section</div><div style="background:#e5d2ff;padding:10px;border-radius:8px;flex:1">aside</div></div><div style="background:#d4f4dd;padding:10px;border-radius:8px">footer</div></div>' },
            { t: 'h3', h: 'Sous le capot : l\'arbre d\'accessibilité' },
            { t: 'p', h: 'Voici ce qui se passe concrètement dans le navigateur : à partir de ton DOM, il construit en parallèle un **arbre d\'accessibilité** (*accessibility tree*) — une version simplifiée de la page où chaque élément expose un **rôle**, un **nom** et un **état**. C\'est cette structure-là, pas tes pixels, que les technologies d\'assistance consomment. Un `<button>` y apparaît comme « bouton, activable » ; un `<nav>` comme un repère « navigation » ; une suite de `<div>` comme… rien, du texte en vrac. La bonne balise, c\'est littéralement le bon rôle exposé **gratuitement** au système d\'exploitation. C\'est pour ça qu\'aucun CSS au monde ne « répare » un HTML non sémantique : il touche l\'apparence, jamais l\'arbre d\'accessibilité.' },
            { t: 'h3', h: 'Pourquoi c\'est si important — au-delà de l\'accessibilité' },
            { t: 'ul', items: [
              '**Accessibilité** — les repères (landmarks) offrent des raccourcis de navigation : sauter au `main`, ignorer la `nav`, lister les `article`. C\'est le bénéfice n°1, non négociable.',
              '**Compréhension par les moteurs** — Google pondère mieux un contenu clairement délimité (le « cœur » du sujet dans `main`/`article`, isolé du bruit de `nav`/`footer`). Pas de bonus magique, mais une lecture plus nette — et l\'extrait choisi en résultat est souvent meilleur.',
              '**Maintenabilité** — dans six mois, `.sidebar` ou `<aside>` te parlera infiniment plus que `div class="col2b"`. Le code se relit comme un plan de ville.',
              '**CSS plus simple** — on cible `nav a`, `main > article`, `footer p` directement, sans empiler des classes utilitaires partout. Sélecteurs plus courts, intentions plus claires.',
              '**Syndication** — les lecteurs RSS et outils de « lecture plus tard » savent extraire l\'`<article>` et ignorer le reste. Ton contenu voyage proprement.'
            ]},
            { t: 'h3', h: 'section vs article vs div : le test en 5 secondes' },
            { t: 'ul', items: [
              'Le bloc aurait-il un sens **tout seul**, copié dans un autre site ou un flux RSS ? → `<article>`. Et oui : un **commentaire** est un article, une **carte produit** aussi, pas seulement les billets de blog.',
              'Le bloc regroupe-t-il un **thème** avec un titre naturel ? → `<section>`. Sans titre naturel, méfie-toi…',
              'Aucun des deux — c\'est juste une boîte pour le style ? → `<div>`, et c\'est **parfaitement correct** : la sémantique n\'oblige pas à nommer l\'innommable.'
            ]},
            { t: 'p', h: 'Quelques subtilités de pro. Plusieurs `<nav>` sont autorisés (navigation principale + fil d\'Ariane) — distingue-les avec `aria-label` (`aria-label="Fil d\'Ariane"`). `header` et `footer` peuvent aussi servir **à l\'intérieur** d\'un article ou d\'une section (en-tête de carte, pied de billet). Les `article` s\'imbriquent : un billet contenant ses commentaires, chaque commentaire étant un article. Et `<address>` est réservé aux **coordonnées de contact** du contenu courant, pas à toute adresse citée dans le texte.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**Balise native vs `<div role="...">`** — la première règle d\'ARIA, gravée dans la spec : *n\'utilise ARIA que si aucune balise HTML native ne fait le job*. `<main>` bat `div role="main"` sur toute la ligne (moins de code, moins d\'erreurs, style par défaut parfois utile).',
              '**`<section>` vs `<div>`** — une `section` sans titre est un repère **aveugle** : elle apparaît dans le plan sans nom. Si tu n\'as pas de titre à lui donner, c\'est une `div`.',
              '**Nav par liens directs vs `ul` de liens** — la convention `nav > ul > li > a` (fiches *Liens* + *Listes*) reste reine : « liste de 5 éléments » s\'annonce et se parcourt par sauts.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Tout se branche maintenant : le plan `h1`-`h6` (fiche *Titres & texte*) s\'inscrit **dans** ces zones ; le menu est une liste de liens (fiches *Liens* + *Listes*) **posée dans** `<nav>` ; la `<figure>` enrobe les médias de la fiche *Images* ; le `body` unique de la fiche *Structure* accueille ces régions comme un plan de ville. Et dans la fiche suivante — *Le `<head>`* — tu découvriras comment même l\'enveloppe invisible parle aux mêmes machines.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« La sémantique interdit les `<div>` » — non : `<div>` reste l\'outil neutre du découpage **visuel**. La règle : s\'il existe une balise qui *dit le rôle*, prends-la ; sinon, `<div>` et `<span>` sont faits pour ça. « Divite aiguë » = mal ; `div` ciblé = santé.',
              '« Bien baliser = premier sur Google » — non, et méfie-toi de quiconque le promet. C\'est un **facilitateur** (meilleure compréhension, meilleurs extraits), pas un sésame. Le contenu utile reste roi.',
              '« `<article>` = article de blog uniquement » — tout contenu **autonome et redistribuable** : billet, carte produit, commentaire, météo du jour. Le test RSS tranche.',
              '« `<main>` par section, ou imbriqué dans un article » — un seul `<main>` par page, et il ne vit ni dans un `article`, ni dans `header`/`nav`/`footer` : il **contient** le cœur, il ne s\'y niche pas.',
              '« Plus il y a de balises sémantiques, mieux c\'est » — un repère mal choisi ou sans titre **ajoute du bruit** au plan. La sobriété exacte bat la profusion approximative.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Réflexe de relecture : désactive visuellement ton CSS (ou lis le code à voix haute). Si la « carte d\'identité » de chaque grande zone est évidente — celle-ci est la navigation, celle-ci le contenu, celle-ci l\'annexe — ton HTML est sémantique. Sinon, c\'est de la soupe de boîtes.' }
          ],
          errors: [
            { title: 'La divite aiguë', bad: '<div class="header">\n  <div class="nav">...</div>\n</div>', good: '<header>\n  <nav>...</nav>\n</header>', why: 'Même rendu visuel, mais le second annonce sa structure aux lecteurs d\'écran (repères navigables), aux robots et à tes collègues. Le premier ne dit littéralement rien — et le CSS ne peut rien y changer.' },
            { title: 'Plusieurs <main> ou un <main> dans un article', bad: '<article>\n  <main>Contenu</main>\n</article>', good: '<main>\n  <article>Contenu</article>\n</main>', why: '`<main>` est unique et englobe le contenu principal : il ne peut être ni multiple, ni imbriqué dans un article/header/footer. C\'est la zone, pas une simple boîte.' }
          ],
          related: ['html-structure', 'html-head', 'css-display', 'html-tableaux']
        },

        {
          id: 'html-head',
          title: 'Le <head> & les métadonnées',
          icon: 'description',
          level: 'Intermédiaire',
          tagline: 'title, meta, Open Graph, favicon, defer : tout ce qui se passe dans les coulisses de la page.',
          intro: 'Le `<head>` est la pièce que le visiteur ne voit jamais — et pourtant, c\'est souvent **par lui que ton site se présente au monde**. Avant même qu\'on clique, ton lien a déjà fait son show : titre bleu dans Google, jolie carte avec image dans WhatsApp, icône dans l\'onglet, teinte de la barre du navigateur mobile. Toutes ces « cartes de visite » se fabriquent ici, dans les coulisses. Une fiche courte en balises, mais décisive pour l\'aspect professionnel de tes pages.',
          blocks: [
            { t: 'h3', h: 'Pourquoi soigner une zone que personne ne voit ?' },
            { t: 'p', h: 'Pose-toi la question inverse : quand tu colles un lien vers ta boutique dans une discussion WhatsApp, qu\'est-ce qui s\'affiche ? Une carte avec image et titre soignés… ou un lien gris sans visage ? Cette différence, elle se joue **entièrement** dans quatre lignes de `<meta>`. De même, l\'onglet que l\'utilisateur retrouve parmi trente autres, c\'est ton `<title>` + ton favicon ; le résumé qui donne envie de cliquer dans Google, c\'est ta `description`. Le head est le réceptionniste de ton site : le visiteur ne le voit pas travailler, mais toute la première impression passe par lui.' },
            { t: 'h3', h: 'Les indispensables, dans l\'ordre' },
            { t: 'code', lang: 'html', label: 'Le head de base, commenté par position', code:
'<head>\n  <!-- 1. L\'encodage D\'ABORD : tout le texte qui suit en dépend -->\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <!-- 2. Ce qui parle aux humains et aux moteurs -->\n  <title>Guide CSS Flexbox — Easy Learn</title>\n  <meta name="description" content="Apprends Flexbox en 15 minutes :\n        explications claires, exemples copiables, pièges déjoués.">\n\n  <!-- 3. L\'identité visuelle de l\'onglet -->\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n\n  <!-- 4. Les ressources -->\n  <link rel="stylesheet" href="css/main.css">\n  <script src="js/app.js" defer></script>\n</head>' },
            { t: 'ul', items: [
              '`charset` et `viewport` **en tout premier** : ils changent la façon dont le navigateur **décode et met en page** tout ce qui suit — y compris le `<title>`, qui peut contenir des accents.',
              '`<title>` — ~50 à 60 caractères, **unique par page**, verbe + bénéfice de préférence. Le format pro qui vaut partout : `Contenu — Marque`. C\'est le titre bleu cliquable dans Google ET l\'étiquette de l\'onglet.',
              '`meta description` — ~155 caractères : le petit texte gris sous ton lien dans les résultats. Soyons honnêtes et précis : elle n\'influence **pas** le classement (Google l\'a confirmé maintes fois), mais elle influence le **clic**. C\'est un argumentaire, pas une liste de mots-clés : « Apprends Flexbox en 15 minutes » vend ; « flexbox, css, tutoriel, guide, apprendre » ne vend pas.',
              '`meta name="robots" content="noindex"` — dit à Google de ne **pas indexer** une page (brouillon, staging, page privée). À connaître pour l\'éviter… ou l\'utiliser à bon escient.',
              '`canonical` — quand la même page est joignable par plusieurs URL (`?ref=wa`, www vs sans www), elle déclare l\'URL **officielle** et évite la dilution en « contenu dupliqué ».'
            ]},
            { t: 'h3', h: 'Briller au partage : Open Graph' },
            { t: 'p', h: 'Quand tu colles un lien sur WhatsApp, X ou LinkedIn, la carte avec image et titre ne sort pas de nulle part : la plateforme va lire les balises **Open Graph** de ta page. Sans elles, elle devine — et elle devine mal.' },
            { t: 'code', lang: 'html', label: 'Le minimum Open Graph, qui change tout', code:
'<meta property="og:title" content="Boutique Awa — Gari premium de Savalou">\n<meta property="og:description" content="Commande avant 15 h, livrée le soir même à Cotonou.">\n<meta property="og:image" content="https://boutique-awa.bj/couverture.jpg">\n<meta property="og:type" content="website">\n<meta name="theme-color" content="#0a84ff">' },
            { t: 'p', h: 'Trois règles pratiques, hélas souvent apprises en cassant. `og:image` exige une URL **absolue** complète (`https://…`) : un chemin relatif est ignoré en silence. La taille qui voyage bien partout : **1200 × 630 px**. Et les plateformes **mettent en cache** cette carte agressivement : après avoir changé l\'image, ton lien peut montrer l\'ancienne pendant des jours — d\'où l\'existence des « debuggers » de partage officiels pour forcer le rafraîchissement. Quant à `theme-color`, il teinte la barre d\'interface du navigateur mobile aux couleurs de ta marque : le détail « app native » qui coûte une ligne.' },
            { t: 'h3', h: 'Sous le capot : le navigateur lit plus vite que toi' },
            { t: 'p', h: 'Pourquoi l\'ordre et les attributs comptent tant ? Parce que le navigateur ne lit pas bêtement ligne à ligne : un analyseur spéculatif (*preloader*) **saute en avant** dans le document pour repérer au plus tôt les ressources lourdes (CSS, polices, images hero) et lancer leur téléchargement avant même d\'avoir fini de parser. Chaque `<link>` et `<script>` du head est donc une instruction de planning autant qu\'une référence. C\'est aussi pourquoi on dit que « le CSS bloque le rendu » : le navigateur attend la feuille de style pour peindre (sinon, flash blanc sans style = *FOUC*) — c\'est voulu, assume-le dans le head — alors qu\'un `<script>` sans attribut **bloque tout** en plein parsing.' },
            { t: 'table', head: ['Écriture', 'Comportement'], rows: [
              ['`<script src>`', 'Parsing en pause : télécharge PUIS exécute immédiatement, bloquant le rendu'],
              ['`<script defer>`', 'Télécharge **en parallèle**, exécute **après** le HTML, dans l\'ordre des balises — **le bon défaut**'],
              ['`<script async>`', 'Télécharge en parallèle, exécute **dès que prêt**, sans ordre garanti — pour les scripts 100 % indépendants (analytics)'],
              ['`<script type="module">`', 'Modules ES : `defer` **natif** (inclus), pas besoin de l\'attribut'],
              ['`<link rel="stylesheet">`', 'Bloque le rendu (voulu : empêche le flash sans style)'],
              ['`<link rel="preload" as="image" href="...">`', 'Précharge une ressource critique (image hero, police) que le preloader trouverait « trop tard »']
            ]},
            { t: 'h3', h: 'Exemple réaliste : le head « production » complet' },
            { t: 'code', lang: 'html', label: 'Le head d\'une vraie boutique, prêt à partager', code:
'<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <title>Boutique Awa — Gari premium, livré à Cotonou</title>\n  <meta name="description" content="Gari de Savalou, huile rouge et épices du marché Dantokpa. Commande avant 15 h, livraison le soir même.">\n  <link rel="canonical" href="https://boutique-awa.bj/">\n  <meta name="robots" content="index,follow">\n\n  <meta property="og:title" content="Boutique Awa — Gari premium de Savalou">\n  <meta property="og:description" content="Commande avant 15 h, livrée le soir même à Cotonou.">\n  <meta property="og:image" content="https://boutique-awa.bj/og/accueil.jpg">\n  <meta property="og:type" content="website">\n  <meta name="theme-color" content="#ff6b00">\n\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n  <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png">\n\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="stylesheet" href="css/main.css">\n  <script src="js/app.js" defer></script>\n</head>' },
            { t: 'p', h: '`apple-touch-icon` couvre l\'ajout à l\'écran d\'accueil sur iPhone ; le favicon PNG en secours du SVG ; `preconnect` amorce la connexion vers les Google Fonts avant la demande de la feuille de style (quelques précieuses millisecondes) ; et `robots="index,follow"` est explicite là où le défaut l\'est déjà — gratuit, rassurant. En **staging**, au contraire : `noindex,nofollow` écrit noir sur blanc, pour éviter qu\'une démo se retrouve dans Google.' },
            { t: 'h3', h: 'Les alternatives et quand les choisir' },
            { t: 'ul', items: [
              '**`defer` vs `async` vs `type="module"`** — ton code touche le DOM ou dépend d\'un autre script : `defer` ; script tiers totalement indépendant qui peut s\'exécuter dès qu\'il arrive : `async` ; base de code en modules ES : `type="module"` (defer inclus).',
              '**Favicon SVG vs ICO vs PNG** — SVG : net, léger, adapté au thème sombre, moderne ; PNG 32 px : repli universel ; le vénérable `.ico` reste un filet de sécurité historique (les navigateurs le demandent encore par défaut à `/favicon.ico`).',
              '**`meta robots` noindex vs `robots.txt`** — nuance classique et souvent inversée : `robots.txt` dit « ne **crawle** pas cette zone » (la page peut quand même apparaître via un lien externe !) ; `noindex` dit « ne la montre pas dans les résultats ». Pour cacher vraiment une page : mot de passe, pas ces deux-là.',
              '**Redirection `<meta http-equiv="refresh">` vs 301 serveur** — la meta-refresh est un pis-aller bancal (historique brisé, SEO faible, accès clavier pénible). Une vraie redirection 301 se fait côté serveur (module Laravel/Node).',
              '**Le vieux `<meta name="keywords">`** — **mort depuis 2009** chez Google. Conserve-le comme anecdote d\'histoire du web, jamais dans ton head.'
            ]},
            { t: 'h3', h: 'Lien avec ce qu\'on a déjà vu' },
            { t: 'p', h: 'Tout se recroise ici, en plus profond : `charset` et `viewport` étaient passés en coup de vent à la fiche *Structure* — tu sais maintenant **pourquoi première ligne**. Le couple `<title>` (onglet/Google) ↔ `<h1>` (page) de la fiche *Titres & texte* s\'aligne sans se confondre : le title vend, le h1 accueille. `og:image` et `preload` branchent directement sur la fiche *Images* (formats modernes acceptés aussi). Et le `defer` que tu as vu fonctionner « sous le capot » à la fiche *Structure* trouve enfin sa timeline complète.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '« `meta description` fait monter dans Google » — non : elle fait **cliquer**, pas **monter**. Rédige-la comme une pub honnête, pas comme un bourrage de mots-clés.',
              '« `<meta name="keywords">` sert encore » — mort depuis près de vingt ans. Google le **ignore** officiellement ; y rentrer des mots-clés ne fait que divulguer ta stratégie aux concurrents.',
              '« `noindex` cache ma page du public » — non : la page reste **publiquement accessible** à quiconque a l\'URL ; elle est juste hors de l\'index Google. Pour cacher : authentification serveur.',
              '« `og:image` avec un chemin relatif, ça passe » — non : URL **absolue** obligatoire, `https` compris. C\'est l\'erreur n°1 des cartes WhatsApp vides.',
              '« Le `<title>` peut être le même sur toutes les pages » — chaque page mérite son titre : c\'est l\'étiquette de l\'onglet (retrouvailles !) et le titre du résultat Google. « Contenu — Marque », page par page.'
            ]},
            { t: 'callout', kind: 'tip', h: 'Réflexe à adopter pour toute la vie : tout script que tu écris toi-même prend `defer` dans le `<head>`. Fini les scripts planqués en bas de page « au cas où », et fini les erreurs « élément null » parce que le DOM n\'existait pas encore au moment de l\'exécution.' }
          ],
          errors: [
            { title: 'Le même <title> sur toutes les pages', bad: '<title>Mon Site</title>', good: '<title>Tableaux HTML — Mon Site</title>', why: 'Le title est un signal SEO majeur et l\'étiquette de l\'onglet. « Page 3 » dans un onglet n\'aide personne à se retrouver parmi trente onglets ; « Contenu — Marque » est le format standard.' },
            { title: 'Script sans defer qui touche le DOM dans le head', bad: '<head>\n  <script src="app.js"></script>\n</head>\n<!-- app.js : document.querySelector("#btn") -> null ! -->', good: '<script src="app.js" defer></script>', why: 'Au moment où le script s\'exécute, le `<body>` n\'est pas encore parsé : le DOM est vide. defer télécharge en parallèle et garantit l\'exécution après le parsing complet — la solution propre, sans hacks.' }
          ],
          related: ['html-structure', 'html-semantique', 'js-dom']
        }
      ]
    }
  ]
};
