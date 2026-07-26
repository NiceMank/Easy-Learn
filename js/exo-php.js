/* ============================================================
   exo-php.js — Exercices pratiques : PHP
   Validation : checklist d'auto-évaluation (code exécuté en
   local : php -S localhost:8000 depuis le dossier du projet).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.php = {
  module: 'php',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-php-caisse-ttc',
      level: 'fonda',
      title: 'Les fonctions de la caisse TTC',
      icon: 'calculate',
      free: true,
      minutes: 20,
      kind: 'checklist',
      setup: "Installe PHP 8+ (`php -v` pour vérifier). Crée un dossier `php-caisse`, un fichier `index.php`, et lance `php -S localhost:8000` dedans. Ouvre http://localhost:8000.",
      context: "La quincaillerie d'Ahouanto affiche ses prix hors taxes mais facture TTC (TVA 18 %). Entre les arrondis au hasard et les formats « 13500F » sans espace, chaque vendeuse sort sa calculatrice : il faut des fonctions fiables, une fois pour toutes.",
      statement: "Tu vas écrire la boîte à outils de la caisse, en PHP pur.\n\n1. `prixTTC(float $ht, float $tva = 18.0): int` — le prix TTC **arrondi au franc le plus proche** (les centimes n'existent pas au comptoir).\n2. `fcfa(int $montant): string` — formatage lisible : `13 500 F` (séparateur de milliers, `number_format` avec espace).\n3. Une table `$produits` (tableau de tableaux associatifs : `nom`, `prix_ht`) avec 4 articles.\n4. Un affichage HTML : pour chaque produit, une ligne avec nom, HT, TTC — **tout texte injecté dans le HTML passe par `htmlspecialchars`**, par habitude non négociable.\n5. En bas : le total TTC du panier fictif de 2 articles choisis par un tableau de quantités.\n\nCe qui est évalué : la déclaration des types (`declare(strict_types=1)` en tête de fichier), le paramètre par défaut propre, l'arrondi maîtrisé, l'échappement systématique. Ce sont les gestes qui séparent un script d'étudiant d'un code de boutique.",
      constraints: [
        "`declare(strict_types=1);` en première instruction du fichier.",
        "Signatures typées : paramètres ET type de retour, paramètre `$tva` avec valeur par défaut.",
        "Arrondi au franc le plus proche (`round` avec retour entier via cast explicite).",
        "Toute donnée affichée dans le HTML passe par `htmlspecialchars` (homogénéité via une fonction `e()` si tu préfères).",
        "Le total TTC est calculé par une boucle, jamais écrit en dur."
      ],
      checklist: [
        "`php -l index.php` ne rapporte aucune erreur de syntaxe avant même d'ouvrir le navigateur.",
        "`strict_types=1` est en place : appeler `prixTTC('abc')` déclenche une TypeError que j'ai lue et comprise.",
        "`prixTTC(10000)` retourne 11800 (int) et `prixTTC(10000, 0)` retourne 10000 : la TVA est un paramètre, pas une constante cachée.",
        "`fcfa(13500)` affiche « 13 500 F » avec séparateur de milliers correct.",
        "La page liste les 4 produits avec HT et TTC cohérents.",
        "Le code source de la page (Ctrl+U) ne contient aucune donnée injectée non échappée.",
        "Le total TTC des 2 articles du panier fictif est juste (vérifié à la calculatrice).",
        "Aucun avertissement/warning PHP n'apparaît dans la page (display_errors actif en dev)."
      ],
      hints: [
        "La fonction clé : `function prixTTC(float $ht, float $tva = 18.0): int { return (int) round($ht * (1 + $tva / 100)); }` — le `round` puis le cast rendent l'arrondi explicite et le type stable.",
        "Le format : `return number_format($montant, 0, ',', ' ') . ' F';` — `number_format` accepte décimales, séparateur de décimales (vide/virgule) et de milliers.",
        "L'échappement : écris d'abord `function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }` puis utilise `e($p['nom'])` partout dans le HTML. Une habitude se forme en la rendant facile."
      ],
      solution: {
        lang: 'php', label: 'index.php — solution commentée',
        code:
`<?php
declare(strict_types=1); // le type est un contrat, pas une suggestion

// ---------- Boîte à outils de la caisse ----------
function prixTTC(float $ht, float $tva = 18.0): int
{
    // round au franc le plus proche, puis cast explicite en int
    return (int) round($ht * (1 + $tva / 100));
}

function fcfa(int $montant): string
{
    return number_format($montant, 0, ',', ' ') . ' F';
}

// Petit raccourci d'échappement : la sécurité doit être FACILE
function e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// ---------- Données ----------
$produits = [
    ['nom' => 'Clous 8 cm (kg)', 'prix_ht' => 1500],
    ['nom' => 'Ciment 50 kg', 'prix_ht' => 5500],
    ['nom' => 'Fer à béton 8 mm', 'prix_ht' => 3800],
    ['nom' => 'Pince universelle', 'prix_ht' => 2500],
];

$panier = ['Ciment 50 kg' => 2, 'Pince universelle' => 1]; // nom => quantité

$total = 0;
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Caisse TTC</title></head>
<body>
  <h1>Caisse — quincaillerie d'Ahouanto</h1>
  <ul>
    <?php foreach ($produits as $p): ?>
      <li>
        <?= e($p['nom']) ?> :
        <?= fcfa((int) $p['prix_ht']) ?> HT —
        <strong><?= fcfa(prixTTC((float) $p['prix_ht'])) ?> TTC</strong>
      </li>
    <?php endforeach; ?>
  </ul>

  <?php foreach ($panier as $nom => $qte):
      foreach ($produits as $p) {
          if ($p['nom'] === $nom) { $total += prixTTC((float) $p['prix_ht']) * $qte; }
      }
  endforeach; ?>
  <p>Total panier TTC : <strong><?= fcfa($total) ?></strong></p>
</body>
</html>`,
        explain: "Trois réflexes de professionnel sont cachés dans ce petit fichier. `strict_types=1` transforme le typage en contrat réel : sans lui, PHP convertit silencieusement `'abc'` en `0` et ta caisse affiche 0 F au lieu de hurler — la TypeError, elle, te sauve. Le paramètre par défaut (`$tva = 18.0`) exprime le cas courant sans l'enfermer : le jour où la loi change, un seul appel change, pas la fonction.\n\nEt l'échappement systématique via `e()` : ce produit s'appelle peut-être honnêtement « Fer à béton », mais demain une saisie contiendra `<script>` — la faille XSS naît toujours de l'oubli, jamais de la malveillance de ton client actuel. La règle d'or : on échappe À L'AFFICHAGE (dans le HTML), pas à la saisie, et on le fait tellement souvent qu'une fonction courte s'impose. Enfin, le total calculé par boucle plutôt qu'écrit en dur : les données changeront toujours, la méthode reste."
      },
      criteria: [
        "Fonctions typées avec strict_types, paramètre par défaut utilisé proprement.",
        "Arrondi et formatage conformes (13 500 F, entiers).",
        "Échappement systématique à l'affichage.",
        "Page fonctionnelle : liste + total exact.",
        "Aucun warning PHP, syntaxe vérifiée via `php -l`."
      ],
      variants: [
        "Ajoute `appliquerRemise(int $ttc, float $pourcentage): int` (bornée à 30 %) et affiche le prix barré + remisé.",
        "Ajoute une TVA par catégorie (18 % standard, 0 % de première nécessité) et refactor vers une fonction unique `prixTTCProduit`.",
        "Écris le même rendu avec la syntaxe alternative `foreach: … endforeach;` vs accolades et choisis ton style en le justifiant."
      ],
      related: ['php-fonctions', 'php-variables', 'php-types', 'php-xss']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-php-form-contact',
      level: 'fonda',
      title: 'Le formulaire de contact de la coopérative',
      icon: 'contact_mail',
      free: false,
      minutes: 30,
      kind: 'checklist',
      setup: "Même projet `php-caisse` (ou nouveau dossier) — crée `contact.php`. Le serveur `php -S localhost:8000` doit tourner.",
      context: "La coopérative Gari+ reçoit ses demandes d'acheteurs via un formulaire web. Hier, un « client » a posté du HTML dans le champ message, et la page suivante a exécuté son script chez la trésorière. Le formulaire doit devenir étanche ET rester agréable.",
      statement: "Tu vas construire le cycle POST complet avec sécurité de base :\n\n1. Le formulaire (`contact.php`, méthode POST) : `nom`, `telephone` (8 chiffres), `message` (10 caractères min). Les champs sont **ré-affichés avec les valeurs saisies** en cas d'erreur (l'utilisateur ne retape pas tout).\n2. Côté serveur (même fichier, début) : lire `$_POST` proprement (`trim` sur toutes les entrées), valider chaque champ, accumuler les erreurs dans un tableau `$erreurs` indexé par champ.\n3. Affichage des erreurs : message dédié sous chaque champ concerné ; les valeurs valides déjà saisies restent en place (`value=\"<?= e($nom) ?>\"`).\n4. Si tout est valide : afficher un encadré de confirmation « Merci Awa, nous vous rappelons au 97 00 00 00 » (données échappées, bien sûr) — pas de traitement réel pour l'instant.\n5. Le tout en UN fichier, avec `strict_types`.\n\nLe point pédagogique fort : tu vas manipuler le cycle requête → validation → réaffichage, qui est LE cycle fondamental du web côté serveur. Tout formulaire que tu rencontreras (Laravel y compris) n'est qu'une version automatée de cette boucle.",
      constraints: [
        "Lecture via `$_POST` avec coalescence nulle (`?? ''`), jamais d'accès direct non protégé.",
        "Validation serveur (jamais seulement HTML : `required` côté client ne protège de rien).",
        "Erreurs par champ + valeurs ré-affichées échappées.",
        "Téléphone validé sur le format (expression régulière 8 chiffres, ou équivalent lisible).",
        "Confirmation sans ré-afficher le formulaire (état « succès » distinct)."
      ],
      checklist: [
        "Soumettre un formulaire vide affiche les 3 erreurs de champ, sans warning PHP (index non défini évité via `?? ''`).",
        "Les valeurs correctes saisies restent dans les champs après une soumission partiellement invalide.",
        "Un téléphone de 5 chiffres ou avec lettres est refusé avec un message explicite.",
        "Un message de 4 caractères est refusé avec mention du minimum.",
        "Injecter `<script>alert(1)</script>` dans le nom N'EXÉCUTE rien : la page affiche le texte échappé (Ctrl+U pour vérifier).",
        "Soumission valide : encadré de confirmation avec nom et numéro correctement échappés.",
        "Le formulaire disparaît après succès (pas de double soumission visible).",
        "`php -l contact.php` propre et aucun avertissement en navigation."
      ],
      hints: [
        "Structure : récupère les entrées en tête (`$nom = trim($_POST['nom'] ?? ''); …`), valide SEULEMENT si le formulaire a été soumis (`$_SERVER['REQUEST_METHOD'] === 'POST'`), remplis `$erreurs`.",
        "Validation téléphone : `if (!preg_match('/^[0-9]{8}$/', $tel)) $erreurs['telephone'] = '8 chiffres attendus, sans espaces.';` — la regex vient APRÈS le trim, pas avant.",
        "Ré-affichage : `<input name=\"nom\" value=\"<?= e($nom) ?\">` et sous le champ `<?php if (isset($erreurs['nom'])): ?><p class=\"err\"><?= e($erreurs['nom']) ?></p><?php endif; ?>`. Le `isset` évite les index manquants."
      ],
      solution: {
        lang: 'php', label: 'contact.php — solution commentée',
        code:
`<?php
declare(strict_types=1);

function e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// 1. ENTRÉES : toujours avec coalescence + trim (jamais d'accès direct)
$nom = trim($_POST['nom'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$message = trim($_POST['message'] ?? '');

$erreurs = [];
$succes = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 2. VALIDATION serveur (le client peut tout falsifier)
    if ($nom === '' || mb_strlen($nom) < 2) {
        $erreurs['nom'] = 'Indiquez votre nom (2 caractères minimum).';
    }
    if (!preg_match('/^[0-9]{8}$/', $telephone)) {
        $erreurs['telephone'] = 'Numéro attendu : 8 chiffres, sans espaces.';
    }
    if (mb_strlen($message) < 10) {
        $erreurs['message'] = 'Votre message est trop court (10 caractères minimum).';
    }
    $succes = $erreurs === [];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Contact — Coopérative Gari+</title></head>
<body>
  <h1>Écrivez-nous</h1>

  <?php if ($succes): ?>
    <!-- 4. ÉTAT SUCCÈS : données échappées, formulaire disparu -->
    <p>Merci <?= e($nom) ?>, nous vous rappelons au <?= e($telephone) ?>
       concernant : « <?= e($message) ?> ».</p>
  <?php else: ?>
    <form method="post">
      <label>Nom
        <input name="nom" value="<?= e($nom) ?>">
        <?php if (isset($erreurs['nom'])): ?><em><?= e($erreurs['nom']) ?></em><?php endif; ?>
      </label>

      <label>Téléphone
        <input name="telephone" inputmode="numeric" value="<?= e($telephone) ?>">
        <?php if (isset($erreurs['telephone'])): ?><em><?= e($erreurs['telephone']) ?></em><?php endif; ?>
      </label>

      <label>Message
        <textarea name="message" rows="4"><?= e($message) ?></textarea>
        <?php if (isset($erreurs['message'])): ?><em><?= e($erreurs['message']) ?></em><?php endif; ?>
      </label>

      <button type="submit">Envoyer</button>
    </form>
  <?php endif; ?>
</body>
</html>`,
        explain: "Trois principes tiennent ce fichier debout. Le **coalescence nulle + trim** à l'entrée : `$_POST['nom']` n'existe pas si le champ manque — sans `?? ''`, tu récoltes un warning qui révèle des détails techniques. Le **champ ré-affiché** : en cas d'erreur, l'utilisateur voit sa saisie et l'erreur correspondante — chaque rejet sans ré-affichage est un client qui abandonne.\n\nLe troisième est le plus vital : la **validation serveur est la seule qui compte**. `required` et `type=\"tel\"` côté HTML sont un confort, pas une protection — n'importe quel `curl` contourne ton formulaire. Côté serveur, tu valides chaque champ, tu échappes chaque sortie : l'attaque XSS du contexte s'éteint simplement parce que le texte injecté est écrit comme du texte, jamais comme du code. Note l'alternance `if (succes) … else …` : deux états exclusifs, jamais le formulaire ET la confirmation en même temps."
      },
      criteria: [
        "Le cycle POST complet fonctionne : saisie, validation, erreurs ciblées, succès.",
        "Champs ré-affichés avec valeurs échappées.",
        "Injection XSS neutralisée à l'affichage (vérifiée en source).",
        "Aucun warning sur index non défini.",
        "Téléphone : format strictement validé côté serveur."
      ],
      variants: [
        "Ajoute un champ `email` optionnel mais validé s'il est rempli (`filter_var` FILTER_VALIDATE_EMAIL).",
        "Envoie réellement l'email avec `mail()` en local ou prépare le tableau `$donnees` pour un futur envoi SMTP.",
        "Passe au pattern PRG : après succès, `header('Location: merci.php')` + `exit` pour empêcher le re-POST au rafraîchissement."
      ],
      related: ['php-formulaires', 'php-validation', 'php-superglobales', 'php-xss']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-php-crud-session',
      level: 'inter',
      title: 'Le CRUD de stock en session',
      icon: 'inventory_2',
      free: false,
      minutes: 45,
      kind: 'checklist',
      setup: "Lance `php -S localhost:8000` dans un dossier `php-stock`. Fichier principal `index.php`. La session PHP servira de « base de données » temporaire.",
      context: "La boutique de tissus « Wax&Co » attend son vrai back-office MySQL la semaine prochaine. En attendant, la patronne veut tester le workflow : ajouter, modifier, supprimer des tissus — en mémoire de session, pour valider les écrans avant la base.",
      statement: "Tu vas construire un **CRUD complet** (Create, Read, Update, Delete) avec la session PHP comme stockage :\n\n1. `session_start()` en tête ; le catalogue vit dans `$_SESSION['tissus']` (tableau indexé par id : `['id' => ['nom', 'prix', 'metres']]`). Au premier chargement, tu y semes trois tissus.\n2. **Liste** : tableau HTML (nom, prix, métrage) avec pour chaque ligne un lien « Modifier » et un formulaire « Supprimer » (POST, pas un lien GET — la suppression est une action sensible).\n3. **Ajout/Modification** : UN formulaire unique (nom, prix, métrage) qui remplit les champs si `?edit=ID` est présent ; validation identique aux deux usages (nom non vide, prix > 0, métrage ≥ 0).\n4. **PRG** (Post-Redirect-Get) : après CHAQUE écriture réussie (ajout, modif, suppression) : `header('Location: index.php'); exit;` — le rafraîchissement ne re-soumet jamais.\n5. **Flash** : un message d'une seule lecture (`$_SESSION['flash']`) affiché puis supprimé (« Tissu ajouté », « Tissu supprimé »…).\n\nLa session simule la base : les structures (boucles, validations, PRG, flash) seront IDENTIQUES en PDO la semaine prochaine. C'est le plan avant la maison.",
      constraints: [
        "`session_start()` avant TOUT affichage (sinon headers déjà envoyés).",
        "IDs stables : prochain id = `max(ids) + 1` (jamais `count()` qui se recycle après suppression).",
        "Toute écriture suivie d'une redirection PRG.",
        "Suppression en POST avec bouton de type submit dédié (pas de GET destructeur).",
        "Échappement de toutes les sorties HTML."
      ],
      checklist: [
        "Les 3 tissus initiaux s'affichent au premier chargement, et ne re-grènent pas ensuite (test de présence de la clé de session).",
        "Ajouter un tissu fonctionne et la liste se met à jour APRÈS redirection (l'URL ne contient plus les données).",
        "Rafraîchir la page après ajout ne duplique PAS le tissu (preuve du PRG).",
        "Modifier un tissu pré-remplit le formulaire et applique les changements au bon id.",
        "La validation refuse nom vide et prix ≤ 0, avec messages clairs.",
        "Supprimer retire la ligne (POST uniquement — l'accès direct en GET ne supprime rien).",
        "Supprimer deux fois un id ne casse pas le calcul du prochain id (via max, pas count).",
        "Le message flash apparaît une fois, disparaît au rafraîchissement suivant.",
        "Changer d'onglet/fermer ne fait rien perdre : la session survit (cookie de session)."
      ],
      hints: [
        "Semis : `if (!isset($_SESSION['tissus'])) { $_SESSION['tissus'] = [1 => ['nom'=>'Wax Hollandais', 'prix'=>12500, 'metres'=>30], …]; }`.",
        "Prochain id : `$ids = array_keys($_SESSION['tissus']); $nouvelId = $ids ? max($ids) + 1 : 1;` — avec max, supprimer le dernier ne « recycle » jamais un id.",
        "PRG : place le traitement en TÊTE de fichier, avant tout HTML : `if ($_SERVER['REQUEST_METHOD'] === 'POST') { …traitement…; $_SESSION['flash'] = '…'; header('Location: index.php'); exit; }`. L'affichage vient après — toujours."
      ],
      solution: {
        lang: 'php', label: 'index.php (coeur) — solution commentée',
        code:
`<?php
declare(strict_types=1);
session_start(); // TOUJOURS avant le moindre octet de sortie

function e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// ----- Semis initial (simule la base) -----
if (!isset($_SESSION['tissus'])) {
    $_SESSION['tissus'] = [
        1 => ['nom' => 'Wax Hollandais 6 yards', 'prix' => 12500, 'metres' => 30],
        2 => ['nom' => 'Super Woodin', 'prix' => 15000, 'metres' => 18],
        3 => ['nom' => 'Pagne tissé Sabè', 'prix' => 22000, 'metres' => 8],
    ];
}
$tissus = &$_SESSION['tissus']; // référence : les modifs écrivent en session

$editId = isset($_GET['edit']) ? (int) $_GET['edit'] : null;
$enEdition = $editId !== null && isset($tissus[$editId]);
$values = ['nom' => '', 'prix' => '', 'metres' => ''];
if ($enEdition) {
    $values = array_map('strval', $tissus[$editId]);
}
$erreurs = [];

// ----- Traitements POST (en tête, avant tout HTML) -----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'supprimer') {
        $id = (int) ($_POST['id'] ?? 0);
        unset($tissus[$id]);
        $_SESSION['flash'] = 'Tissu supprimé.';
        header('Location: index.php');
        exit;
    }

    // ajout / modification : même validation
    $values = [
        'nom' => trim((string) ($_POST['nom'] ?? '')),
        'prix' => trim((string) ($_POST['prix'] ?? '')),
        'metres' => trim((string) ($_POST['metres'] ?? '')),
    ];
    if ($values['nom'] === '') $erreurs[] = 'Le nom est obligatoire.';
    if (!is_numeric($values['prix']) || (float) $values['prix'] <= 0) $erreurs[] = 'Prix invalide (supérieur à 0).';
    if (!is_numeric($values['metres']) || (float) $values['metres'] < 0) $erreurs[] = 'Métrage invalide.';

    if (!$erreurs) {
        if ($action === 'modifier' && $enEdition) {
            $tissus[$editId] = ['nom' => $values['nom'], 'prix' => (float) $values['prix'], 'metres' => (float) $values['metres']];
            $_SESSION['flash'] = 'Tissu modifié.';
        } else {
            $ids = array_keys($tissus);
            $tissus[$ids ? max($ids) + 1 : 1] = ['nom' => $values['nom'], 'prix' => (float) $values['prix'], 'metres' => (float) $values['metres']];
            $_SESSION['flash'] = 'Tissu ajouté.';
        }
        header('Location: index.php'); // PRG : on sort du POST
        exit;
    }
}

// ----- Flash à lecture unique -----
$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
<!-- HTML : flash, tableau avec lignes+actions, formulaire pré-rempli -->
<?php if ($flash): ?><p><strong><?= e($flash) ?></strong></p><?php endif; ?>
<table>
  <?php foreach ($tissus as $id => $t): ?>
    <tr>
      <td><?= e($t['nom']) ?></td>
      <td><?= number_format($t['prix'], 0, ',', ' ') ?> F</td>
      <td><?= e((string) $t['metres']) ?> m</td>
      <td><a href="?edit=<?= $id ?>">Modifier</a></td>
      <td>
        <form method="post" style="display:inline">
          <input type="hidden" name="action" value="supprimer">
          <input type="hidden" name="id" value="<?= $id ?>">
          <button type="submit">Supprimer</button>
        </form>
      </td>
    </tr>
  <?php endforeach; ?>
</table>
<h2><?= $enEdition ? 'Modifier ce tissu' : 'Ajouter un tissu' ?></h2>
<form method="post">
  <input type="hidden" name="action" value="<?= $enEdition ? 'modifier' : 'ajouter' ?>">
  <input name="nom" value="<?= e($values['nom']) ?>" placeholder="Nom">
  <input name="prix" value="<?= e($values['prix']) ?>" placeholder="Prix">
  <input name="metres" value="<?= e($values['metres']) ?>" placeholder="Métrage">
  <button type="submit">Enregistrer</button>
  <?php if ($enEdition): ?><a href="index.php">Annuler</a><?php endif; ?>
</form>`,
        explain: "Trois idées structurent ce CRUD. La **référence sur la session** (`$tissus = &$_SESSION['tissus']`) : tes écritures vont directement au stockage — pas de recopie à oublier à la fin. Le **PRG** : toute action mutante se termine par `header('Location: …') + exit`. Sans ça, un F5 re-soumet le POST et duplique l'ajout — le navigateur prévient même l'utilisateur, preuve que c'est l'architecture attendue du web.\n\nEt le **flash à lecture unique** : écris en session avant la redirection, lis puis `unset` immédiatement — le message n'apparaît qu'une seule fois, jamais « collé ». Comprends aussi pourquoi `max(id)+1` plutôt que `count()+1` : supprime le tissu 3 et count retombe à 2, le prochain ajout réutilise l'id 3 — collision assurée ; `max` regarde ce qui existe réellement. Ce sont les mêmes pièges qu'avec les auto-incréments mal compris en SQL."
      },
      criteria: [
        "CRUD complet fonctionnel sur la session (ajout, lecture, modif, suppression).",
        "PRG systématique après chaque écriture (F5 inoffensif).",
        "IDs stables, suppression POST, flash à lecture unique.",
        "Validation homogénéisée et messages clairs.",
        "Aucune fuite de données non échappées."
      ],
      variants: [
        "Ajoute une confirmation de suppression en JavaScript (`onsubmit` avec confirm).",
        "Ajoute un tri cliquable (prix/nom/métrage) via paramètre GET en lecture seule.",
        "Ajoute une pagination côté session (5 par page) avec liens Précédent/Suivant.",
        "Prépare la migration : encapsule les lectures/écritures dans des fonctions (`tousLesTissus()`, `ajouterTissu()`) prêtes à être recâblées sur PDO."
      ],
      related: ['php-sessions', 'php-formulaires', 'php-superglobales', 'php-crud']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-php-pdo-catalogue',
      level: 'inter',
      title: 'Le catalogue PDO : requêtes préparées ou rien',
      icon: 'storage',
      free: false,
      minutes: 50,
      kind: 'checklist',
      setup: "Active PDO SQLite : `php -m | grep -i sqlite` (sinon installe php-sqlite3). Nouveau dossier `php-catalogue`, fichiers `db.php` (connexion) et `index.php`.",
      context: "« Wax&Co » passe à la vraie base de données ! Le premier développeur avait concaténé les recherches directement dans le SQL : un client a tapé « ' OR 1=1 -- » dans la recherche et vidé la table. L'agence impose : du PDO, des requêtes préparées, partout.",
      statement: "Tu vas construire le catalogue persistant et sécurisé :\n\n1. `db.php` : connexion PDO à SQLite (`catalogue.sqlite`) avec les options sérieuses : `ERRMODE_EXCEPTION`, `FETCH_ASSOC` par défaut, pas d'émulation des requêtes préparées (`ATTR_EMULATE_PREPARES = false`).\n2. Au premier lancement : création de la table `produits (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prix INTEGER, stock INTEGER)` et semis si vide.\n3. `index.php` : liste des produits avec **recherche** (`?q=`) et **tri** (`?tri=prix|nom|stock`) — le tri sur liste blanche STRICTE (les noms de colonnes ne passent jamais dans une chaîne préparée).\n4. **Requêtes préparées partout** : recherche avec `'WHERE nom LIKE :q'` et `execute([':q' => '%' . $q . '%'])` ; insertion d'un nouveau produit (petit formulaire) en prepared statement + PRG.\n5. Affichage du stock avec seuil visuel (« stock faible » < 10) et échappement systématique.\n\nLe mot d'ordre de l'agence : tout ce qui vient de l'extérieur est une **donnée** pour la base, jamais du SQL. Les identifiants de colonnes (tri) sont la seule exception — traités par liste blanche, pas par échappement.",
      constraints: [
        "Options PDO rigoureuses (exceptions, assoc, pas d'émulation).",
        "Aucune concaténation de données utilisateur dans le SQL : tout par placeholders `:nom`.",
        "Tri par liste blanche de colonnes autorisées uniquement.",
        "Insertion préparée + PRG.",
        "Échappement HTML à l'affichage maintenu."
      ],
      checklist: [
        "`db.php` retourne une connexion réutilisable (`require` dans index) — une seule connexion par requête.",
        "La table se crée et se seme toute seule au premier chargement (peu importe combien de fois je relance).",
        "La recherche « gari » n'affiche que les produits correspondants, via LIKE préparé.",
        "L'injection `' OR 1=1 --` dans la recherche RETOURNE 0 ligne au lieu de tout afficher (j'ai testé !).",
        "Le tri sur `prix`, `nom`, `stock` fonctionne ; `?tri=DROP` tombe sur un tri par défaut sans erreur SQL.",
        "Ajouter un produit avec un nom contenant des apostrophes (« Huile d'Awoulaba ») passe sans erreur.",
        "PRG après ajout, flash OK.",
        "Le seuil « stock faible » s'affiche sous les bons produits.",
        "`php -l` propre sur les deux fichiers ; aucune erreur dans le log du serveur."
      ],
      hints: [
        "Connexion : `$pdo = new PDO('sqlite:' . __DIR__ . '/catalogue.sqlite', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]);`.",
        "Liste blanche tri : `$tris = ['prix' => 'prix', 'nom' => 'nom', 'stock' => 'stock']; $tri = $tris[$_GET['tri'] ?? 'nom'] ?? 'nom';` puis `\"SELECT * FROM produits WHERE nom LIKE :q ORDER BY $tri\"` — la colonne vient du code, pas du client.",
        "Recherche préparée : `$stmt = $pdo->prepare('SELECT * FROM produits WHERE nom LIKE :q ORDER BY ' . $tri); $stmt->execute([':q' => '%' . $q . '%']);` — le `%…%` est une DONNÉE, il va dans le execute, pas dans la chaîne SQL."
      ],
      solution: {
        lang: 'php', label: 'db.php + index.php (coeur) — solution commentée',
        code:
`<?php // ===== db.php =====
declare(strict_types=1);

function db(): PDO
{
    static $pdo = null; // une seule connexion par requête
    if ($pdo === null) {
        $pdo = new PDO('sqlite:' . __DIR__ . '/catalogue.sqlite', null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,     // erreurs = exceptions
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // tableaux associatifs
            PDO::ATTR_EMULATE_PREPARES => false,              // vraies requêtes préparées
        ]);
        $pdo->exec('CREATE TABLE IF NOT EXISTS produits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL, prix INTEGER NOT NULL, stock INTEGER NOT NULL DEFAULT 0)');
        if ((int) $pdo->query('SELECT COUNT(*) FROM produits')->fetchColumn() === 0) {
            $stmt = $pdo->prepare('INSERT INTO produits (nom, prix, stock) VALUES (?, ?, ?)');
            foreach ([['Wax Hollandais', 12500, 30], ['Super Woodin', 15000, 6], ['Pagne Sabè', 22000, 25]] as $p) {
                $stmt->execute($p);
            }
        }
    }
    return $pdo;
}

<?php // ===== index.php (coeur) =====
require __DIR__ . '/db.php';
$pdo = db();

// ----- Ajout (préparé + PRG) -----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = trim($_POST['nom'] ?? '');
    $prix = (int) ($_POST['prix'] ?? 0);
    $stock = (int) ($_POST['stock'] ?? 0);
    if ($nom !== '' && $prix > 0 && $stock >= 0) {
        $pdo->prepare('INSERT INTO produits (nom, prix, stock) VALUES (:nom, :prix, :stock)')
            ->execute([':nom' => $nom, ':prix' => $prix, ':stock' => $stock]);
    }
    header('Location: index.php');
    exit;
}

// ----- Liste : recherche (préparée) + tri (liste blanche) -----
$q = trim($_GET['q'] ?? '');
$tris = ['prix' => 'prix', 'nom' => 'nom', 'stock' => 'stock']; // jamais de SQL client
$tri = $tris[$_GET['tri'] ?? 'nom'] ?? 'nom';

$stmt = $pdo->prepare("SELECT * FROM produits WHERE nom LIKE :q ORDER BY $tri");
$stmt->execute([':q' => '%' . $q . '%']); // le %…% est une donnée, pas du SQL
$produits = $stmt->fetchAll();
?>
<form method="get">
  <input name="q" value="<?= htmlspecialchars($q, ENT_QUOTES, 'UTF-8') ?>" placeholder="Rechercher…">
  <select name="tri">
    <?php foreach (['nom' => 'Nom', 'prix' => 'Prix', 'stock' => 'Stock'] as $val => $lib): ?>
      <option value="<?= $val ?>" <?= $tri === $val ? 'selected' : '' ?>><?= $lib ?></option>
    <?php endforeach; ?>
  </select>
  <button>Filtrer</button>
</form>
<ul>
  <?php foreach ($produits as $p): ?>
    <li>
      <?= htmlspecialchars($p['nom'], ENT_QUOTES, 'UTF-8') ?> —
      <?= number_format((int) $p['prix'], 0, ',', ' ') ?> F
      (<?= (int) $p['stock'] ?> en stock<?= $p['stock'] < 10 ? ' — STOCK FAIBLE' : '' ?>)
    </li>
  <?php endforeach; ?>
</ul>`,
        explain: "L'injection SQL n'est pas une astuce de pirate : c'est la confusion entre **code** et **données**. Concaténer `'gari'` dans la chaîne SQL fait de l'entrée utilisateur un bout de programme ; la requête préparée envoie d'abord le squelette SQL à la base (compilé), puis les données séparément (jamais réinterprétées). Ton attaquant au `' OR 1=1 --` n'écrit plus du SQL, il cherche littéralement un produit nommé « ' OR 1=1 -- » — et n'en trouve pas, merci pour lui.\n\nDeux précisions de professionnel. `ATTR_EMULATE_PREPARES => false` exige les VRAIES requêtes préparées du moteur (pas l'émulation qui ré-introduit le risque sur certains cas tordus d'encodage). Et le tri : les noms de COLONNES ne peuvent pas être des placeholders — c'est structurel, pas une flemme. La liste blanche (`['prix' => 'prix', …]`) est donc LA bonne réponse : le client choisit une clé, ton code fournit la valeur SQL, l'entrée n'arrive jamais au SQL."
      },
      criteria: [
        "Connexion PDO avec options rigoureuses, table créée et semée automatiquement.",
        "Recherche insensible et sécurisée (préparée, wildcards en données).",
        "Tri fonctionnel par liste blanche, paramètre hostile neutralisé.",
        "Ajout préparé + PRG ; apostrophes gérées sans douleur.",
        "Test d'injection réellement effectué et repoussé."
      ],
      variants: [
        "Ajoute une pagination SQL (`LIMIT :n OFFSET :o` avec placeholders entiers bindés via `bindValue(PDO::PARAM_INT)`).",
        "Ajoute une colonne catégorie + filtre par catégorie (préparé, liste blanche des catégories).",
        "Migre le CRUD-session précédent sur PDO (même structure UI, nouveau stockage) et compare."
      ],
      related: ['php-pdo', 'php-requetes-preparees', 'php-crud', 'php-superglobales']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-php-mini-boutique',
      level: 'projet',
      title: 'Projet : la mini-boutique structurée « Wax&Co »',
      icon: 'storefront',
      free: false,
      minutes: 90,
      kind: 'checklist',
      setup: "Projet le plus conséquent : dossier `waxandco/` avec `public/` (index.php, assets), `src/` (db.php, fonctions.php), `templates/` (entete.php, pied.php). Le serveur se lance dans `public/` : `php -S localhost:8000 -t public`. SQLite via PDO.",
      context: "« Wax&Co » ouvre sa boutique en ligne : catalogue, panier, commande. Le cahier des charges de la patronne est simple et impitoyable : « que ça marche, que ce soit propre, et que mes clientes ne voient jamais une erreur de code ». À toi de structurer comme un pro, pas de bidouiller une page géante.",
      statement: "Tu vas construire une mini-boutique **structurée**, pas un script de 500 lignes :\n\n1. **Séparation** : `public/index.php` (front controller : lit `?page=` sur liste blanche `catalogue|panier|commande`), `src/db.php` (PDO), `src/fonctions.php` (e(), fcfa(), flash helpers), `templates/` (entête/pied partagés via `require`).\n2. **Catalogue** (`pages/catalogue.php`) : liste PDO des tissus, bouton « Ajouter au panier » (POST + PRG) avec vérification du stock côté serveur.\n3. **Panier** (`pages/panier.php`) : session `$_SESSION['panier']` (id → quantité), tableau avec sous-totaux et total, modification des quantités, suppression par ligne, vidage.\n4. **Commande** (`pages/commande.php`) : récapitulatif + formulaire (nom, téléphone) → transaction PDO : insertion de la commande + des lignes, décrément du stock, vidage du panier, page de confirmation avec numéro de commande. La **transaction** est obligatoire : tout réussit ou tout s'annule.\n5. **Sécurité** : jeton **CSRF** sur chaque formulaire, comparaison avec `hash_equals`, régénéré après commande.\n\nC'est LE projet où tout converge : PDO, sessions, PRG, transactions, CSRF, architecture. Fais-le en plusieurs sessions : catalogue d'abord, panier ensuite, commande enfin. Ne tente pas tout d'un coup.",
      constraints: [
        "Front controller + liste blanche de pages (jamais `include $_GET['page']` brut — faille d'inclusion).",
        "Jeton CSRF sur les 3 formulaires sensibles (ajout panier, maj panier, commande), vérifié avec `hash_equals`.",
        "Commande en **transaction** PDO (beginTransaction/commit/rollBack) avec re-vérification du stock DANS la transaction.",
        "PRG après chaque POST ; messages flash.",
        "Mots de passe : aucun ; mais téléphone validé et montants JAMAIS venant du client (toujours recalculés depuis la base)."
      ],
      checklist: [
        "L'arborescence public/src/templates/pages est en place ; l'URL `?page=inconnue` retombe proprement sur le catalogue.",
        "`include $_GET['page']` n'existe NULLE part (faille d'inclusion localisée : je sais dire pourquoi).",
        "Le catalogue affiche le stock réel de la base et grise l'ajout quand stock = 0.",
        "Soumettre un formulaire sans jeton CSRF (ou avec un faux) est rejeté proprement (message, pas page blanche).",
        "Le panier affiche sous-totaux et total recalculés DEPUIS les prix de la base (jamais des montants postés).",
        "Modifier une quantité au-delà du stock est refusé avec un message clair.",
        "Passer la commande insère commande + lignes et décrémente le stock — vérifié en base.",
        "Tuer PHP au milieu de la commande (simulation : throw dans la boucle) ne laisse AUCUNE ligne insérée (rollback — j'ai testé).",
        "La confirmation affiche le numéro de commande et le panier est vide.",
        "Aucun warning/notice dans les logs du serveur PHP pendant tout le parcours."
      ],
      hints: [
        "Front controller : `$pages = ['catalogue','panier','commande']; $page = in_array($_GET['page'] ?? 'catalogue', $pages, true) ? … : 'catalogue'; require \"pages/$page.php\";` — l'utilisateur choisit une CLÉ, ton code la valeur.",
        "CSRF : `$_SESSION['csrf'] ??= bin2hex(random_bytes(32));` puis champ caché `<input type=\"hidden\" name=\"csrf\" value=\"<?= e($_SESSION['csrf']) ?>\">` ; côté POST : `if (!hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '')) { http_response_code(403); exit('Jeton invalide'); }`.",
        "Transaction commande : `$pdo->beginTransaction(); try { …update stock avec WHERE stock >= :qte et vérifie rowCount… insert commande + lignes…; $pdo->commit(); } catch (Throwable $e) { $pdo->rollBack(); throw $e; }` — le `WHERE stock >= qte` atomique évite les stocks négatifs en concurrence."
      ],
      solution: {
        lang: 'php', label: 'coeur commande.php — solution commentée',
        code:
`<?php // ===== pages/commande.php (coeur transactionnel) =====
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. CSRF d'abord : la requête doit venir de NOTRE formulaire
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(403);
        exit('Jeton de sécurité invalide. Rechargez la page.');
    }
    $nom = trim($_POST['nom'] ?? '');
    $tel = trim($_POST['telephone'] ?? '');
    if ($nom === '' || !preg_match('/^[0-9]{8}$/', $tel)) {
        $_SESSION['flash'] = 'Nom et téléphone (8 chiffres) obligatoires.';
        header('Location: ?page=commande');
        exit;
    }

    $panier = $_SESSION['panier'] ?? [];
    if (!$panier) { header('Location: ?page=catalogue'); exit; }

    $pdo->beginTransaction(); // 2. Tout ou rien
    try {
        // 3. Prix & stocks vérifiables UNIQUEMENT depuis la base
        $ids = array_keys($panier);
        $marqueurs = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $pdo->prepare("SELECT * FROM produits WHERE id IN ($marqueurs)");
        $stmt->execute($ids);
        $produits = $stmt->fetchAll(PDO::FETCH_UNIQUE);

        $total = 0;
        foreach ($panier as $id => $qte) {
            if (!isset($produits[$id]) || $produits[$id]['stock'] < $qte) {
                throw new RuntimeException('Stock insuffisant pour un article.');
            }
            $total += $produits[$id]['prix'] * $qte;
        }

        $pdo->prepare('INSERT INTO commandes (client, telephone, total, cree_le) VALUES (?, ?, ?, datetime("now"))')
            ->execute([$nom, $tel, $total]);
        $commandeId = (int) $pdo->lastInsertId();

        $ligne = $pdo->prepare('INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)');
        $stock = $pdo->prepare('UPDATE produits SET stock = stock - ? WHERE id = ? AND stock >= ?');
        foreach ($panier as $id => $qte) {
            $ligne->execute([$commandeId, $id, $qte, $produits[$id]['prix']]);
            $stock->execute([$qte, $id, $qte]); // garde-fou atomique anti-surstock
            if ($stock->rowCount() === 0) throw new RuntimeException('Course au stock perdue.');
        }

        $pdo->commit();
        $_SESSION['panier'] = [];
        $_SESSION['csrf'] = bin2hex(random_bytes(32)); // régénéré : une commande = un jeton
        $_SESSION['flash'] = 'Commande n° ' . $commandeId . ' confirmée. Merci ' . $nom . ' !';
        header('Location: ?page=catalogue');
        exit;
    } catch (Throwable $e) {
        $pdo->rollBack(); // rien n'est écrit : la base reste cohérente
        $_SESSION['flash'] = 'Commande impossible : ' . $e->getMessage();
        header('Location: ?page=panier');
        exit;
    }
}

// (affichage du formulaire/récapitulatif ici, avec champ CSRF caché)`,
        explain: "Tout ce projet gravite autour de trois garanties. La **transaction** : sans elle, un crash entre « stock décrémenté » et « ligne insérée » offre des tissus gratuits ou (pire) vend deux fois le dernier coupon ; `beginTransaction`/`commit`/`rollBack` rendent la commande atomique — et le `UPDATE … WHERE stock >= qte` fermé par `rowCount` déjoue même deux clientes achetant simultanément le dernier métrage.\n\nLa **source de vérité** : les prix et stocks relus depuis la base DANS la transaction — jamais depuis `$_POST`. Un client peut poster n'importe quel montant ; ta boutique, elle, fait confiance à SES données. Enfin le **CSRF** : sans jeton, une page piégée (image, formulaire caché) peut faire passer des commandes au nom de la vendeuse déjà connectée à sa boutique ; le jeton aléatoire en session, vérifié avec `hash_equals` (comparaison à temps constant, anti timming attack), rend la requête traçable à TON formulaire. Trois garanties, un marchand qui dort tranquille."
      },
      criteria: [
        "Architecture propre : front controller, includes, templates partagés.",
        "Parcours complet fonctionnel : catalogue → panier → commande → confirmation.",
        "Transaction prouvée (aucun état intermédiaire possible en base).",
        "CSRF sur tous les formulaires sensibles, rejet poli des faux jetons.",
        "Montants toujours recalculés côté serveur ; zéro confiance client.",
        "Journal des erreurs propre sur tout le parcours."
      ],
      variants: [
        "Ajoute un espace « Mes commandes » (numéro de téléphone comme identifiant léger) listant l'historique via jointure.",
        "Ajoute l'export CSV des commandes du jour (en-têtes `Content-Type: text/csv` + `fputcsv`).",
        "Ajoute un mot de passe admin (`password_hash`/`password_verify`) protégeant une page d'ajout de tissus.",
        "Test de charge maison : script qui passe 20 commandes concurrentes et vérifie l'absence de stock négatif."
      ],
      related: ['php-pdo', 'php-sessions', 'php-csrf', 'php-requetes-preparees', 'php-inclusion', 'php-mots-de-passe']
    }
  ]
};
