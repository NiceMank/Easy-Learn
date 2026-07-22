/* ============================================================
   exo-ts.js — Exercices pratiques : TypeScript
   Validation : checklist d'auto-évaluation (code exécuté en
   local : tsc / ts-node / typescriptlang.org/play).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.ts = {
  module: 'ts',
  list: [
    /* ==================== FONDAMENTAUX 1 (gratuit) ==================== */
    {
      id: 'exo-ts-catalogue-type',
      level: 'fonda',
      title: 'Le catalogue typé du marché',
      icon: 'label',
      free: true,
      minutes: 25,
      kind: 'checklist',
      setup: "Crée un dossier `ts-marche`, ouvre-le dans ton éditeur, initialise : `npm init -y && npm i typescript --save-dev && npx tsc --init` (active `\"strict\": true`). Alternative sans installation : typescriptlang.org/play.",
      context: "« Marché Navi » passe son front à TypeScript après une panne : un prix en chaîne de caractères a été multiplié par une quantité, et le résultat '13500NaN' a fini affiché aux clients. La direction ne veut plus jamais revoir ça.",
      statement: "Ta première mission TypeScript : modéliser le catalogue proprement.\n\n1. Une **interface** `Produit` : `id` (string), `nom` (string), `prix` (number, en FCFA — jamais de chaîne pour un montant), `stock` (number), `categorie` (union de littéraux : `'epicerie' | 'frais' | 'boisson'`).\n2. Une **interface** `LigneCommande` : `produit` (Produit — l'objet complet, pas l'id), `quantite` (number).\n3. Une fonction `totalCommande(lignes: LigneCommande[]): number` qui somme `prix × quantite` avec `reduce`.\n4. Une fonction `produitsEpuises(produits: Produit[]): Produit[]` filtrant `stock === 0`.\n5. Un petit script de démonstration : 3 produits factices, 1 commande, affichage du total.\n\nExigence transversale : le code doit compiler avec `tsc --noEmit` en mode `strict` sans une seule erreur ni un seul `any`. Le but n'est pas le résultat affiché — c'est que le **compilateur** devienne ton premier relecteur.",
      constraints: [
        "Mode `strict` actif durant tout l'exercice.",
        "Zéro `any` explicite ; zéro `@ts-ignore`.",
        "Les fonctions ont des types de paramètres ET de retour explicites.",
        "`categorie` est une union de littéraux, pas un simple `string`.",
        "Compilation `npx tsc --noEmit` propre avant de cocher la checklist."
      ],
      checklist: [
        "J'ai créé le projet avec `tsconfig.json` en `strict` et je comprends ce que `strict` regroupe (strictNullChecks, noImplicitAny…).",
        "L'interface `Produit` décrit les 5 champs avec les bons types, dont l'union de littéraux pour la catégorie.",
        "J'ai volontairement introduit une erreur (prix en string) pour VOIR le compilateur la refuser, puis je l'ai corrigée.",
        "`totalCommande` est typée en entrée et en sortie ; `reduce` n'a produit aucune inférence `any`.",
        "`produitsEpuises` retourne bien un `Produit[]` et non un type plus vague.",
        "`npx tsc --noEmit` ne rapporte aucune erreur sur le fichier final.",
        "Le script de démonstration s'exécute (`npx tsx` ou `ts-node`) et affiche le bon total.",
        "Je sais expliquer à voix haute la différence entre ce que vérifie le compilateur et ce qui se passe à l'exécution."
      ],
      hints: [
        "Interface : `interface Produit { id: string; nom: string; prix: number; stock: number; categorie: Categorie; }` avec `type Categorie = 'epicerie' | 'frais' | 'boisson';` déclaré au-dessus.",
        "Le total : `return lignes.reduce((somme, l) => somme + l.produit.prix * l.quantite, 0);` — grâce au typage, `l.produit.prix` est garanti number, pas de mauvaise surprise.",
        "Le test du compilateur : écris `{ id: 'p1', nom: 'Gari', prix: '13500', stock: 42, categorie: 'epicerie' }` et lis l'erreur de `tsc`. C'est exactement le bug de production de l'histoire, attrapé avant l'exécution."
      ],
      solution: {
        lang: 'ts', label: 'catalogue.ts — solution commentée',
        code:
`// Union de littéraux : seules ces trois valeurs sont LÉGALES.
type Categorie = 'epicerie' | 'frais' | 'boisson';

interface Produit {
  id: string;
  nom: string;
  prix: number;      // FCFA — toujours un nombre, jamais une chaîne
  stock: number;
  categorie: Categorie;
}

interface LigneCommande {
  produit: Produit;  // l'objet complet : on garde la richesse, pas juste un id
  quantite: number;
}

// Types explicites partout : la signature EST le contrat.
function totalCommande(lignes: LigneCommande[]): number {
  return lignes.reduce((somme, l) => somme + l.produit.prix * l.quantite, 0);
}

function produitsEpuises(produits: Produit[]): Produit[] {
  return produits.filter((p) => p.stock === 0);
}

// ---------- Démonstration ----------
const catalogue: Produit[] = [
  { id: 'gari', nom: 'Gari fin 25 kg', prix: 13500, stock: 42, categorie: 'epicerie' },
  { id: 'poisson', nom: 'Capitaine frais', prix: 4500, stock: 0, categorie: 'frais' },
  { id: 'sodabi', nom: 'Jus d\u2019hibiscus 1 L', prix: 800, stock: 60, categorie: 'boisson' }
];

const commande: LigneCommande[] = [
  { produit: catalogue[0], quantite: 2 },
  { produit: catalogue[2], quantite: 5 }
];

console.log('Total :', totalCommande(commande), 'FCFA'); // 31 000
console.log('Ruptures :', produitsEpuises(catalogue).map((p) => p.nom)); // Capitaine frais`,
        explain: "Le changement d'ère : avant, un type faux traversait tout le programme jusqu'à produire 'NaN' chez la cliente. Avec les interfaces, l'erreur est interceptée À L'ÉCRITURE, au plus près de sa cause — le compilateur devient une revue de code continue et gratuite.\n\nDeux choix méritent ton attention. `prix: number` plutôt que string DELETE toute une famille de bugs (concaténation au lieu d'addition, 'NaN') en une déclaration. Et `categorie` en union de littéraux plutôt que string rend l'inventaire des valeurs possibles exhaustif : le jour où tu écriras `case 'epicerie'`, le compilateur pourra vérifier que tu n'as oublié aucun cas. Retiens le principe : **plus le type est précis, plus le compilateur travaille pour toi**."
      },
      criteria: [
        "Compilation strict sans erreur ni `any`.",
        "Interfaces complètes et précises (union de littéraux incluse).",
        "Fonctions typées en entrée ET en sortie.",
        "[Test manuel] une valeur invalide est refusée par le compilateur avant exécution.",
        "La démonstration calcule le bon total."
      ],
      variants: [
        "Ajoute un champ optionnel `promo?: number` (pourcentage) et une fonction `prixEffectif(p: Produit): number`.",
        "Ajoute une union discriminée `StatutStock = { type: 'dispo'; quantite: number } | { type: 'epuise' } | { type: 'commande'; datePrevue: Date }` et une fonction qui l'affiche par switch exhaustif.",
        "Remplace la démo par un petit jeu de tests avec `console.assert`."
      ],
      related: ['ts-pourquoi', 'ts-interfaces', 'ts-types-scalaires', 'ts-tuples-enums']
    },

    /* ==================== FONDAMENTAUX 2 ==================== */
    {
      id: 'exo-ts-reponse-api',
      level: 'fonda',
      title: 'Discipliner les réponses d\u2019API : unions discriminées',
      icon: 'call_split',
      free: false,
      minutes: 30,
      kind: 'checklist',
      setup: "Repars du projet `ts-marche` de l'exercice précédent (même tsconfig strict), crée `reponse-api.ts`.",
      context: "Le serveur de paiement MoMo répond parfois un succès, parfois une erreur métier (« solde insuffisant »), parfois une erreur technique. Le code actuel fait `if (res.data)` au petit bonheur et plante deux fois par semaine quand la forme change.",
      statement: "Tu vas modéliser ces réponses avec une **union discriminée** — le pattern TypeScript le plus rentable qui existe.\n\n1. `interface Succes<T> { ok: true; donnees: T; }` et `interface Echec { ok: false; code: 'SOLDE_INSUFFISANT' | 'RESEAU' | 'NUMERO_INVALIDE'; message: string; }`.\n2. Le type générique : `type Reponse<T> = Succes<T> | Echec;`.\n3. Une fonction `traiterPaiement(rep: Reponse<{ transactionId: string; montant: number }>): string` qui retourne une phrase d'affichage **en traitant tous les cas** — le discriminant `rep.ok` doit rétrécir le type dans chaque branche, prouvé par le compilateur.\n4. Un simulateur `simuler(): Reponse<...>` qui retourne aléatoirement l'une des formes, et une boucle de démonstration.\n5. Enfin, le `default` du switch appelle une fonction `jamais(x: never): never` : le compilateur t'avertira si un nouveau `code` apparaît un jour sans être traité.\n\nC'est exactement ainsi que les apps sérieuses traitent `fetch` : plus de `?.` en cascade au hasard.",
      constraints: [
        "Le discriminant est un littéral (`ok: true` / `ok: false`) — pas un booléen générique.",
        "Chaque branche exploite le narrowing prouvé par le compilateur (accès `rep.donnees` UNIQUEMENT dans la branche succès).",
        "Exhaustivité garantie par la technique du `never` en `default`.",
        "Aucun cast (`as`) nulle part dans la solution.",
        "Compilation strict propre."
      ],
      checklist: [
        "Mes deux interfaces atomiques sont déclarées avec les littéraux `true`/`false` (pas `boolean`).",
        "Le type générique `Reponse<T>` réutilisable est en place.",
        "Dans la branche succès, `rep.donnees.transactionId` passe la compilation ; le même accès hors de la branche est REFUSÉ par le compilateur (j'ai testé).",
        "Le `switch` sur `rep.code` traite les trois codes métier avec des messages adaptés à la vendeuse.",
        "La fonction `jamais(x: never): never` est câblée au `default` et la compilation reste propre.",
        "J'ai simulé un 4e code métier : le compilateur m'a OBLIGÉ à le traiter (preuve d'exhaustivité).",
        "La démo affiche des phrases correctes pour chaque forme de réponse.",
        "Je sais expliquer pourquoi `ok: boolean` (au lieu de littéraux) casserait le narrowing."
      ],
      hints: [
        "Le narrowing : `if (rep.ok) { /* ici, rep est Succes<T> : rep.donnees existe */ } else { /* ici, rep est Echec : rep.code existe */ }` — le literal `ok` discrimine automatiquement.",
        "Le switch exhaustif : `switch (rep.code) { case 'SOLDE_INSUFFISANT': …; case 'RESEAU': …; case 'NUMERO_INVALIDE': …; default: return jamais(rep); }` avec `function jamais(x: never): never { throw new Error('Cas non traité : ' + JSON.stringify(x)); }`.",
        "Pourquoi `ok: boolean` casse tout : avec un booléen, `if (rep.ok)` ne prouve rien — les deux interfaces ont `ok: boolean`, donc le compilateur ne peut pas éliminer une branche. Le littéral, lui, n'a qu'une valeur possible."
      ],
      solution: {
        lang: 'ts', label: 'reponse-api.ts — solution commentée',
        code:
`interface Succes<T> { ok: true; donnees: T; }
interface Echec {
  ok: false;
  code: 'SOLDE_INSUFFISANT' | 'RESEAU' | 'NUMERO_INVALIDE';
  message: string;
}
type Reponse<T> = Succes<T> | Echec;

// Garde-fou d'exhaustivité : ne compile que si x est INATTEIGNABLE.
function jamais(x: never): never {
  throw new Error('Cas non traité : ' + JSON.stringify(x));
}

interface ConfirmationPaiement { transactionId: string; montant: number; }

function traiterPaiement(rep: Reponse<ConfirmationPaiement>): string {
  // Grâce au discriminant littéral, cette branche connaît « donnees » :
  if (rep.ok) {
    return 'Paiement de ' + rep.donnees.montant.toLocaleString('fr-FR') + ' F reçu (réf. ' + rep.donnees.transactionId + ').';
  }
  // Ici, rep est OBLIGATOIREMENT un Echec — prouvé par le compilateur.
  switch (rep.code) {
    case 'SOLDE_INSUFFISANT': return 'Solde MoMo insuffisant : proposez un autre moyen de paiement.';
    case 'RESEAU': return 'Réseau indisponible : réessayez dans un instant.';
    case 'NUMERO_INVALIDE': return 'Numéro invalide : vérifiez les 8 chiffres saisis.';
    default: return jamais(rep); // un nouveau code métier cassera la compilation — à dessein
  }
}

// ---------- Simulateur + démo ----------
function simuler(): Reponse<ConfirmationPaiement> {
  const tirage = Math.random();
  if (tirage < 0.5) return { ok: true, donnees: { transactionId: 'TXN-' + Date.now(), montant: 15000 } };
  if (tirage < 0.7) return { ok: false, code: 'SOLDE_INSUFFISANT', message: 'Solde: 9 200 F' };
  if (tirage < 0.9) return { ok: false, code: 'RESEAU', message: 'Timeout 30s' };
  return { ok: false, code: 'NUMERO_INVALIDE', message: 'Préfixe inconnu' };
}

for (let i = 0; i < 4; i++) console.log(traiterPaiement(simuler()));`,
        explain: "L'union discriminée transforme la gestion d'erreur en problème **mécanique** : le discriminant littéral rétrécit le type à chaque branche, le compilateur surveille que tu ne touches jamais `donnees` hors d'un succès, et la fonction `jamais` fait de l'exhaustivité une promesse compilée plutôt qu'une convention orale.\n\nLe point fort est la maintenance future : si l'équipe backend ajoute `COMPTE_BLOQUE` aux codes possibles, `Reponse` ne change qu'à un endroit, et **tous les traitements incomplets cessent de compiler** — le langage t'emmène littéralement vers les lignes à mettre à jour. C'est l'exact opposé du `if (res.data)` dispersé, où chaque nouvelle forme se découvre en production."
      },
      criteria: [
        "Discriminant littéral et narrowing prouvés dans les deux branches.",
        "Trois codes métier traités avec messages métier adaptés.",
        "Exhaustivité garantie par `never` (démonstration réalisée).",
        "Zéro cast, compilation strict propre.",
        "La démo produit les phrases attendues pour chaque forme."
      ],
      variants: [
        "Généralise en `Reponse<T>`_UTILISÉE par deux autres fonctions (`chargerProduits`, `creerCommande`) avec des `T` différents.",
        "Ajoute une fonction `estSucces<T>(r: Reponse<T>): r is Succes<T>` (type guard) et utilise-la avec `filter` sur un tableau de réponses.",
        "Branche la démo sur de vrais `fetch` vers une API factice locale et gère aussi les exceptions réseau."
      ],
      related: ['ts-discriminated-unions', 'ts-unions', 'ts-narrowing', 'ts-generics']
    },

    /* ==================== INTERMÉDIAIRE 1 ==================== */
    {
      id: 'exo-ts-depot-generique',
      level: 'inter',
      title: 'Le dépôt générique (Repository<T>)',
      icon: 'database',
      free: false,
      minutes: 40,
      kind: 'checklist',
      setup: "Nouveau fichier `depot.ts` dans le même projet strict. L'objectif : comprendre les génériques en construisant une abstration que tu réutiliseras dans chaque projet.",
      context: "« Marché Navi » gère des produits, des clientes, des commandes… Trois ensembles de données, trois fois les mêmes opérations (tout lister, trouver par id, ajouter, supprimer). Réécrire la même classe trois fois serait absurde : il faut UNE classe, paramétrée par le type d'entité.",
      statement: "Tu vas construire un dépôt **générique** avec contraintes — la brique la plus réutilisée du monde TypeScript.\n\n1. L'interface de contrainte : `interface Identifiable { id: string; }`.\n2. La classe : `class Depot<T extends Identifiable>` avec un `Map<string, T>` privé et les méthodes :\n   - `ajouter(entite: T): void` (refuse un id déjà présent avec une `Error` claire) ;\n   - `parId(id: string): T | undefined` (signature honnête : peut ne pas trouver) ;\n   - `tous(): T[]` ;\n   - `filtrer(predicat: (e: T) => boolean): T[]` ;\n   - `retirer(id: string): boolean` ;\n   - `mettreAJour(id: string, modifications: Partial<T>): T | undefined` — fusionne les champs fournis (attention : ne permet pas de changer l'`id`).\n3. Démontre la réutilisation : un `Depot<Produit>` (reprends l'interface de l'exercice 1) ET un `Depot<Cliente>` `{ id, nom, telephone, commune }`.\n\nL'instant magique : écris `depotClientes.parId('c1')?.nom` et constate que l'auto-complétion et le typage suivent le paramètre `T` — les méthodes sont écrites une fois, typées pour chaque usage.",
      constraints: [
        "`T extends Identifiable` : le compilateur refuse `Depot<string>` (essaie, lis l'erreur).",
        "Le stockage interne est `private` ; l'extérieur ne touche jamais la Map directement.",
        "`mettreAJour` retire `id` des modifications acceptées (`Omit<Partial<T>, 'id'>` le prouve au niveau du type).",
        "Aucun `any`, aucun cast `as` dans la classe.",
        "Démo avec DEUX types d'entités différents, compilation strict propre."
      ],
      checklist: [
        "La contrainte `extends Identifiable` refuse les types sans id (vérifié par une tentative qui échoue).",
        "La Map interne est privée : l'extérieur passe uniquement par les méthodes.",
        "`parId` retourne `T | undefined` — et l'appelant DOIT tester avant d'utiliser (strictNullChecks m'y oblige).",
        "`filtrer` accepte un prédicat typé `(e: T) => boolean` : mes lambdas ont l'auto-complétion du bon type.",
        "`mettreAJour` interdit le changement d'id au niveau du TYPE (pas juste à l'exécution).",
        "`ajouter` lève une erreur claire sur doublon d'id, testée avec un try/catch.",
        "Le même `Depot` fonctionne avec `Produit` ET `Cliente` sans aucune modification.",
        "J'ai modifié une propriété via l'auto-complétion et constaté que le typage suit `T` de bout en bout."
      ],
      hints: [
        "Squelette : `class Depot<T extends Identifiable> { private items = new Map<string, T>(); ajouter(e: T): void { if (this.items.has(e.id)) throw new Error('id déjà présent : ' + e.id); this.items.set(e.id, e); } … }`.",
        "`mettreAJour(id: string, modifs: Omit<Partial<T>, 'id'>): T | undefined { const actuel = this.items.get(id); if (!actuel) return undefined; const maj = { ...actuel, ...modifs } as T; … }` — ici UN petit as interne est acceptable si tu documentes pourquoi (les champs ont tout de `T` sauf id qui est préservé).",
        "La démo : `const produits = new Depot<Produit>(); produits.ajouter({ id: 'gari', … });` puis `const clientes = new Depot<Cliente>();` — si tu écris `new Depot<string>()`, lis attentivement l'erreur : elle t'explique la contrainte."
      ],
      solution: {
        lang: 'ts', label: 'depot.ts — solution commentée',
        code:
`interface Identifiable { id: string; }

// T extends Identifiable : on EXIGE un id, le reste est libre.
class Depot<T extends Identifiable> {
  private items = new Map<string, T>();

  ajouter(entite: T): void {
    if (this.items.has(entite.id)) {
      throw new Error('Doublon : l\'id "' + entite.id + '" existe déjà dans le dépôt.');
    }
    this.items.set(entite.id, entite);
  }

  parId(id: string): T | undefined {
    return this.items.get(id); // undefined possible : le type l'avoue
  }

  tous(): T[] {
    return [...this.items.values()];
  }

  filtrer(predicat: (e: T) => boolean): T[] {
    return this.tous().filter(predicat);
  }

  retirer(id: string): boolean {
    return this.items.delete(id);
  }

  // Omit retire 'id' du patch : le TYPE interdit de casser l'identité.
  mettreAJour(id: string, modifications: Omit<Partial<T>, 'id'>): T | undefined {
    const actuel = this.items.get(id);
    if (!actuel) return undefined;
    const maj = { ...actuel, ...modifications };
    this.items.set(id, maj);
    return maj;
  }
}

// ---------- Démonstration : un dépôt, deux mondes ----------
interface Produit extends Identifiable { nom: string; prix: number; }
interface Cliente extends Identifiable { nom: string; telephone: string; commune: string; }

const produits = new Depot<Produit>();
produits.ajouter({ id: 'gari', nom: 'Gari fin 25 kg', prix: 13500 });
produits.mettreAJour('gari', { prix: 13900 }); // OK
// produits.mettreAJour('gari', { id: 'autre' }); // ✗ le TYPE refuse

const clientes = new Depot<Cliente>();
clientes.ajouter({ id: 'c1', nom: 'Awa Mensah', telephone: '97000000', commune: 'Cotonou' });

console.log(produits.filtrer((p) => p.prix > 10000).map((p) => p.nom));
console.log(clientes.parId('c1')?.nom ?? 'Cliente inconnue');`,
        explain: "Les génériques écrivent **une fois** la structure et laissent le type varier par usage : `Depot<Produit>` et `Depot<Cliente>` partagent le code, pas les types — chacun garde son auto-complétion et ses garanties. C'est la bonne abstraction : ni copier-coller, ni `any` fuyard.\n\nDeux subtilités de pro à retenir. `parId` retourne `T | undefined` volontairement : prétendre retourner toujours `T` serait un mensonge de type qui te ferait écrire `resultat.nom` sans vérifier — `strictNullChecks` transforme l'honnêteté de la signature en protection automatique à l'appel. Et `Omit<Partial<T>, 'id'>` pour le patch : `Partial` rend tout optionnel, `Omit` en retire l'identifiant — le changement d'id devient inexprimable, **au niveau du type**, pas par convention. Voilà le standard : si une erreur est exprimable, quelqu'un la commettra ; rends-la inexprimable."
      },
      criteria: [
        "Contrainte générique prouvée (Depot<string> refusé par le compilateur).",
        "API complète : ajouter, parId, tous, filtrer, retirer, mettreAJour.",
        "Honnêteté des signatures (`T | undefined` là où il faut).",
        "L'identité est protégée par le type (Omit sur id).",
        "Deux usages concrets différents sans modification de la classe."
      ],
      variants: [
        "Ajoute `compter(predicat?)`, `premier(predicat): T | undefined` et `page(numero, taille): T[]`.",
        "Ajoute une méthode `versJSON(): string` et `depuisJSON(json: string)` (attention à la validation à l'entrée).",
        "Extrais une interface `IDepot<T>` et fais implémenter `class Depot implements IDepot<T>` : tu pourras plus tard swapper avec un dépôt HTTP sans changer l'appelant."
      ],
      related: ['ts-generics', 'ts-generics-contraintes', 'ts-utility-types', 'ts-interfaces']
    },

    /* ==================== INTERMÉDIAIRE 2 ==================== */
    {
      id: 'exo-ts-dto-fiches',
      level: 'inter',
      title: 'Les quatre vues du produit : utility types',
      icon: 'content_copy',
      free: false,
      minutes: 35,
      kind: 'checklist',
      setup: "Fichier `dto.ts` dans le projet strict. Reprends l'interface `Produit` complète : { id, nom, prix, stock, categorie, fournisseur, coutAchat, notes, creeLe }.",
      context: "Dans l'app « Marché Navi », le même produit apparaît sous quatre formes : la fiche complète (back-office), l'aperçu vendeuse (sans coût d'achat ni notes), le formulaire de mise à jour (tout optionnel sauf l'id), et la création (sans id ni date : ils sont générés). Quatre interfaces copiées à la main ? C'est le début de la désynchronisation.",
      statement: "Tu vas dériver les quatre formes depuis UNE interface source avec les **utility types** — la maintenance n'aura plus qu'un seul endroit à modifier.\n\n1. L'interface source `Produit` (complète, 9 champs, avec `readonly` sur `id` et `creeLe`).\n2. `type ProduitVendeuse = Omit<Produit, 'coutAchat' | 'notes'>` — ce qui masque les marges à la vendeuse est STRUCTUREL, pas une convention.\n3. `type ProduitCreation = Omit<Produit, 'id' | 'creeLe'>`.\n4. `type ProduitPatch = Partial<Pick<Produit, 'nom' | 'prix' | 'stock' | 'categorie'>> & { id: string }` — seuls 4 champs sont modifiables, tous optionnels, id obligatoire.\n5. Une fonction `versVendeuse(p: Produit): ProduitVendeuse` (destructuration propre) et une `appliquerPatch(p: Produit, patch: ProduitPatch): Produit` immuable.\n6. Un `Record<Categorie, number>` pour le taux de commission par catégorie, utilisé par `commissionDe(p: Produit, taux: Record<Categorie, number>): number` — exhaustif par construction.\n\nL'épreuve du feu : ajoute un champ `photo` à `Produit`… et constate que les quatre vues se propagent (ou te demandent explicitement de trancher).",
      constraints: [
        "Une seule interface source ; les autres formes sont 100 % dérivées.",
        "Le masquage vendeuse est prouvé par le compilateur (accès à `coutAchat` refusé sur ProduitVendeuse — teste-le).",
        "`appliquerPatch` retourne un NOUVEL objet (spread), jamais une mutation.",
        "Le `Record<Categorie, number>` est exhaustif : oublier une catégorie doit casser la compilation.",
        "Compilation strict propre, zéro `any`."
      ],
      checklist: [
        "L'interface source contient 9 champs, avec `readonly` sur les champs générés.",
        "`ProduitVendeuse` masque coût et notes : tenter `vendeuse.coutAchat` échoue à la compilation.",
        "`ProduitCreation` refuse un `id` fourni à la création (le serveur le génère).",
        "`ProduitPatch` n'accepte QUE les champs modifiables, tous optionnels, id obligatoire.",
        "`versVendeuse` utilise la destructuration reposante (`const { coutAchat, notes, ...publique } = p`), sans `delete`.",
        "Le `Record` de commissions est exaustif : retirer une catégorie fait hurler tsc (j'ai vérifié).",
        "`appliquerPatch` ne mute rien : l'original est intact après application (vérifié par console.log).",
        "Ajouter un champ à `Produit` propage ou questionne les vues — j'ai fait le test, puis annulé."
      ],
      hints: [
        "Les dérivations : `Omit` enlève, `Pick` garde, `Partial` rend optionnel. Compose-les : `Partial<Pick<Produit, 'nom'|'prix'|'stock'|'categorie'>> & { id: string }` se lit « les 4 champs modifiables, optionnels, + l'id requis ».",
        "`versVendeuse` : `const { coutAchat, notes, ...publique } = p; return publique;` — la destructuration avec rest retire proprement, sans `delete` (qui mute et tape sur les performances des moteurs).",
        "Le Record : `const TAUX: Record<Categorie, number> = { epicerie: 0.08, frais: 0.12, boisson: 0.05 };` — essaie d'oublier `frais` et lis l'erreur : c'est l'exhaustivité au service de la compta."
      ],
      solution: {
        lang: 'ts', label: 'dto.ts — solution commentée',
        code:
`type Categorie = 'epicerie' | 'frais' | 'boisson';

// ===== LA source de vérité =====
interface Produit {
  readonly id: string;      // généré → jamais modifié
  nom: string;
  prix: number;
  stock: number;
  categorie: Categorie;
  fournisseur: string;
  coutAchat: number;        // sensible : la marge !
  notes: string;            // internes
  readonly creeLe: Date;    // généré → jamais modifié
}

// ===== Les quatre vues DÉRIVÉES (zéro duplication) =====
type ProduitVendeuse = Omit<Produit, 'coutAchat' | 'notes'>;
type ProduitCreation = Omit<Produit, 'id' | 'creeLe'>;
type ProduitPatch = Partial<Pick<Produit, 'nom' | 'prix' | 'stock' | 'categorie'>> & { id: string };

function versVendeuse(p: Produit): ProduitVendeuse {
  const { coutAchat, notes, ...publique } = p; // retrait par destructuration
  return publique;
}

function appliquerPatch(p: Produit, patch: ProduitPatch): Produit {
  const { id, ...champs } = patch;
  return { ...p, ...champs }; // immuable : nouvel objet
}

// ===== Commission par catégorie : exhaustivité compilée =====
const TAUX_COMMISSION: Record<Categorie, number> = {
  epicerie: 0.08,
  frais: 0.12,   // oublie cette ligne… et tsc te rappelle à l'ordre
  boisson: 0.05
};

function commissionDe(p: Produit, taux: Record<Categorie, number>): number {
  return Math.round(p.prix * taux[p.categorie]); // indexation sûre : toutes les clés existent
}

// ---------- Démo ----------
const gari: Produit = {
  id: 'gari', nom: 'Gari fin 25 kg', prix: 13500, stock: 42,
  categorie: 'epicerie', fournisseur: 'Coop Savalou', coutAchat: 11000,
  notes: 'Livraison mardi', creeLe: new Date()
};
console.log(versVendeuse(gari));            // marge et notes absentes
console.log(appliquerPatch(gari, { id: 'gari', prix: 13900 }).prix, '/', gari.prix); // 13900 / 13500
console.log('Commission :', commissionDe(gari, TAUX_COMMISSION), 'F');`,
        explain: "Les utility types appliquent DRY aux **définitions de formes** : la fiche vendeuse, le brouillon de création, le patch — autant de projections du même concept. Quand le produit gagne un champ `photo`, les Omit le propagent tranquillement, le Pick t'oblige à décider consciemment s'il est modifiable, et le Record exige son taux de commission. Le type system devient une liste de tâches compilée.\n\nNote les habitudes qui accompagnent : `readonly` sur les champs générés rend l'intention visible dès l'interface ; la destructuration avec rest remplace le `delete` (mutation + coût moteur) ; `appliquerPatch` respecte l'immutabilité qui rend les états traçables. Ce sont les mêmes réflexes que dans React — et ils sont transplantables partout."
      },
      criteria: [
        "Une interface source, quatre vues purement dérivées.",
        "Le secret de la marge est structurel (impossible à fuiter par accident).",
        "Patchs immuables et typés strictement.",
        "Commission exhaustive garantie par le Record.",
        "Compilation strict propre."
      ],
      variants: [
        "Ajoute `ProduitPublic = Pick<Produit, 'nom'|'prix'|'categorie'>` et une fonction `cataloguePublic`.",
        "Rends `ProduitPatch` profondément requis sur `id` via `Required<…>` et justifie la différence.",
        "Découvre `Readonly<Produit>` et applique-le au retour de `versVendeuse` : qui cela protège-t-il ?"
      ],
      related: ['ts-utility-types', 'ts-keyof-typeof', 'ts-record-returntype', 'ts-interfaces']
    },

    /* ==================== PROJET RÉEL ==================== */
    {
      id: 'exo-ts-moteur-commandes',
      level: 'projet',
      title: 'Projet : le moteur de commandes « Navi »',
      icon: 'precision_manufacturing',
      free: false,
      minutes: 80,
      kind: 'checklist',
      setup: "Nouveau dossier `ts-commandes` (npm + typescript strict). Structure attendue : `modeles.ts`, `etat.ts`, `moteur.ts`, `demo.ts`. Ceci est un projet multi-fichiers : soigne les imports/exports.",
      context: "« Marché Navi » passe à la caisse réelle : une commande naît brouillon, passe payée, puis préparée, expédiée, livrée — ou annulée. Chaque transition a des règles (on ne paie pas deux fois, on n'expédie pas une commande vide). Aujourd'hui ces règles vivent dans la tête de la vendeuse ; demain elles vivront dans le code.",
      statement: "Projet de synthèse TypeScript : une **machine à états typée** pour les commandes. Tu assembleras unions discriminées, génériques, records et narrowing dans un même petit système.\n\nArchitecture demandée :\n\n1. **Modèles** (`modeles.ts`) : `interface Ligne { produitId: string; nom: string; prix: number; quantite: number; }` ; une **union discriminée** `Commande = CommandeBrouillon | CommandePayee | CommandeExpediee | CommandeLivree | CommandeAnnulee` — chaque variante a `statut` en littéral (`'brouillon'` etc.) et uniquement les champs pertinents (ex. `payeeLe: Date` n'existe que dans `CommandePayee` et au-delà — utilise un type de base partagé si pertinent).\n2. **Transitions** (`moteur.ts`) : `ajouterLigne(c: CommandeBrouillon, l: Ligne): CommandeBrouillon`, `payer(c: CommandeBrouillon): CommandePayee` (refuse une commande vide par une Error métier), `expedier(c: CommandePayee, transporteur: string): CommandeExpediee`, `livrer(c: CommandeExpediee): CommandeLivree`, `annuler(c: CommandeBrouillon | CommandePayee): CommandeAnnulee`. Chaque fonction n'accepte QUE le statut d'entrée légal : appeler `expedier` sur un brouillon **ne doit pas compiler**.\n3. **Totaux** : `total(c: Pick<CommandeBrouillon, 'lignes'>): number` utilisable depuis n'importe quel statut.\n4. **Journal** : `interface Evenement { date: Date; type: string; }` + chaque transition retourne la nouvelle commande ET pousse dans un journal passé en paramètre (traçabilité).\n5. **Démo** (`demo.ts`) : un cycle complet heureux + trois tentatives illégales attrapées (try/catch ou prouvées par la compilation).\n\nCe projet est exigeant : il te demande de penser comme un concepteur, pas comme un écriveur de lignes. Prends-le étape par étape, transition par transition.",
      constraints: [
        "L'union discriminée par `statut` est la seule représentation d'une commande (pas de champ fourre-tout `statut: string` + tous champs optionnels).",
        "Chaque transition a une signature qui rend les états illégaux **inexprimables au niveau du type**.",
        "Passage d'un statut à l'autre par construction d'un nouvel objet (spread), jamais de mutation en place.",
        "Journal par effet de bord explicite (paramètre), pas de variable globale cachée.",
        "`npx tsc --noEmit` propre sur l'ensemble des 4 fichiers."
      ],
      checklist: [
        "Mes 5 variantes de commande n'exposent QUE leurs champs pertinents (`expediee.transporteur` n'existe pas sur un brouillon).",
        "Appeler `expedier(brouillon, 'Zem')` est refusé par le COMPILATEUR (j'ai lu l'erreur et l'ai comprise).",
        "`payer` sur une commande vide lève une erreur métier claire, testée.",
        "Chaque transition produit un nouvel objet : l'ancien statut reste intact (vérifié par log).",
        "`total` fonctionne quel que soit le statut (j'ai testé brouillon, payée, livrée).",
        "Le journal accumule les événements dans l'ordre (création → paiement → expédition → livraison).",
        "Les tentatives illégales de la démo sont soit des erreurs de compilation (commentées avec explication) soit des erreurs d'exécution prévues et attrapées.",
        "Je peux dessiner le graphe d'états sur papier et nommer chaque transition."
      ],
      hints: [
        "Modélise un champ commun : `interface Base { id: string; lignes: Ligne[]; }` puis chaque variante étend : `interface CommandeBrouillon extends Base { statut: 'brouillon'; } interface CommandePayee extends Base { statut: 'payee'; payeeLe: Date; }`… L'union : `type Commande = CommandeBrouillon | CommandePayee | CommandeExpediee | CommandeLivree | CommandeAnnulee;`.",
        "Une transition : `function payer(c: CommandeBrouillon, journal: Evenement[]): CommandePayee { if (c.lignes.length === 0) throw new Error('Commande vide : rien à payer.'); const payee: CommandePayee = { ...c, statut: 'payee', payeeLe: new Date() }; journal.push({ date: new Date(), type: 'PAIEMENT' }); return payee; }`.",
        "Le total générique sur tous les statuts : `function total(c: { lignes: Ligne[] }): number { return c.lignes.reduce((s, l) => s + l.prix * l.quantite, 0); }` — un objet structural minimal suffit."
      ],
      solution: {
        lang: 'ts', label: 'moteur.ts (coeur) — solution commentée',
        code:
`// ===== modeles.ts =====
interface Ligne { produitId: string; nom: string; prix: number; quantite: number; }

interface Base { id: string; lignes: Ligne[]; }

// Chaque variante ne connait QUE ce qui est vrai dans son statut :
interface CommandeBrouillon extends Base { statut: 'brouillon'; }
interface CommandePayee extends Base { statut: 'payee'; payeeLe: Date; }
interface CommandeExpediee extends Base { statut: 'expediee'; payeeLe: Date; expedieeLe: Date; transporteur: string; }
interface CommandeLivree extends Base { statut: 'livree'; payeeLe: Date; expedieeLe: Date; transporteur: string; livreeLe: Date; }
interface CommandeAnnulee extends Base { statut: 'annulee'; annuleeLe: Date; motif: string; }

type Commande = CommandeBrouillon | CommandePayee | CommandeExpediee | CommandeLivree | CommandeAnnulee;

interface Evenement { date: Date; type: string; }

// ===== moteur.ts — les seules portes entre les états =====
function ajouterLigne(c: CommandeBrouillon, l: Ligne, journal: Evenement[]): CommandeBrouillon {
  journal.push({ date: new Date(), type: 'AJOUT_LIGNE:' + l.produitId });
  return { ...c, lignes: [...c.lignes, l] };
}

function total(c: { lignes: Ligne[] }): number {
  return c.lignes.reduce((s, l) => s + l.prix * l.quantite, 0);
}

function payer(c: CommandeBrouillon, journal: Evenement[]): CommandePayee {
  if (c.lignes.length === 0) throw new Error('Commande vide : rien à payer.');
  if (total(c) <= 0) throw new Error('Total nul : paiement refusé.');
  journal.push({ date: new Date(), type: 'PAIEMENT:' + total(c) });
  return { ...c, statut: 'payee', payeeLe: new Date() };
}

function expedier(c: CommandePayee, transporteur: string, journal: Evenement[]): CommandeExpediee {
  journal.push({ date: new Date(), type: 'EXPEDITION:' + transporteur });
  return { ...c, statut: 'expediee', expedieeLe: new Date(), transporteur };
}

function livrer(c: CommandeExpediee, journal: Evenement[]): CommandeLivree {
  journal.push({ date: new Date(), type: 'LIVRAISON' });
  return { ...c, statut: 'livree', livreeLe: new Date() };
}

function annuler(c: CommandeBrouillon | CommandePayee, motif: string, journal: Evenement[]): CommandeAnnulee {
  journal.push({ date: new Date(), type: 'ANNULATION:' + motif });
  const { lignes, id } = c;
  return { id, lignes, statut: 'annulee', annuleeLe: new Date(), motif };
}

// ===== demo.ts (cycle heureux) =====
const journal: Evenement[] = [];
let c = ajouterLigne({ id: 'CMD-1', statut: 'brouillon', lignes: [] },
  { produitId: 'gari', nom: 'Gari fin 25 kg', prix: 13500, quantite: 2 }, journal);
const c2 = payer(c, journal);
const c3 = expedier(c2, 'Zémidjan express', journal);
const c4 = livrer(c3, journal);
// const interdit = expedier(c, 'Zem'); // ✗ tsc refuse : un brouillon ne s'expédie pas
console.log('Total livré :', total(c4), 'F —', journal.length, 'événements tracés');`,
        explain: "Ce projet incarne la phrase qui résume TypeScript adulte : **rendre les états illégaux inreprésentables**. Une commande payée a une date de paiement, une expédiée un transporteur — imposer ça par le TYPE supprime toute une classe de bugs (« pourquoi `transporteur` est undefined ? — ah, elle n'était pas expédiée »). Le compilateur devient le gardien du workflow métier.\n\nLa conception par signatures vaut toutes les validations dispersées : `expedier` n'acceptant que `CommandePayee`, l'appel fautif est un code qui ne compile même pas — tu n'as plus besoin de tester ce cas en QA, il est physiquement impossible à écrire. Et le journal en paramètre explicite garde les transitions testables et pures (même fonction, même entrée → même sortie), tout en laissant la persistance libre (console aujourd'hui, base demain).\n\nCe pattern est la version béninoise et honnête de ce que font les systèmes de paiement sérieux : modéliser le graphe d'états métier, et laisser le langage tenir la garde."
      },
      criteria: [
        "L'union discriminée décrit fidèlement le cycle de vie (aucun champ hors-saison).",
        "Les transitions illégales sont des erreurs de compilation, pas des conventions.",
        "Les règles métier d'exécution (commande vide…) sont des erreurs claires.",
        "Le journal retrace fidèlement le cycle complet.",
        "Quatre fichiers, imports propres, compilation strict sans tache."
      ],
      variants: [
        "Ajoute `rembourser(c: CommandePayee | CommandeLivree): CommandeRemboursee` au graphe.",
        "Ajoute une remise globale : `appliquerRemise(c: CommandeBrouillon, pourcentage: number)` bornée à 50 %.",
        "Écris des tests avec `node:test` : chaque transition heureuse + chaque garde métier.",
        "Fais persister le journal en JSON sur disque (fs) et recharge-le au démarrage."
      ],
      related: ['ts-discriminated-unions', 'ts-generics', 'ts-utility-types', 'ts-narrowing', 'ts-modules']
    }
  ]
};
