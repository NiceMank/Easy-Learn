/* ============================================================
   data-c.js — Contenu pédagogique Langage C (C11/C17)
   Couvre : compilation, structure, types & représentation, pointeurs,
   allocation dynamique, tableaux & chaînes, structures/unions/enums,
   fonctions & passages, fichiers, préprocesseur, debugging, POSIX.
   Ton : le C expliqué physiquement — ce qui se passe dans la RAM.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.c = {
  id: 'c',
  name: 'Langage C',
  icon: 'memory',
  tagline: 'Le langage qui te donne les clés de la RAM — et toute la corde pour t\'y pendre.',
  heroTitle: 'Le C : parler directement à la machine',

  categories: [
    /* ======================================================
       1. PROCESSUS DE COMPILATION
       ====================================================== */
    {
      id: 'compilation',
      name: 'Compilation',
      icon: 'build',
      fiches: [
        {
          id: 'c-compilation',
          title: 'Les 4 étapes de la compilation',
          icon: 'build',
          level: 'Débutant',
          tagline: 'De main.c à un exécutable natif : prétraitement, compilation, assemblage, édition de liens.',
          intro: 'Quand tu tapes `gcc main.c -o main`, UNE SEULE commande déclenche en réalité **quatre étapes distinctes** que GCC enchaîne pour toi. Les connaître, c\'est comprendre où naît chaque message d\'erreur — et pourquoi « syntax error » à 9 h n\'a rien à voir avec « undefined reference » de 11 h.',
          blocks: [
            { t: 'h3', h: 'Le pipeline en une image' },
            { t: 'code', lang: 'text', label: 'main.c → main', code:
'main.c\n  │\n  ├─ 1. PRÉTRAITEMENT (cpp)     → dilue #include, remplace #define\n  │     main.c gonflé (encore du texte C)\n  ├─ 2. COMPILATION (cc1)          → traduit en ASSEMBLEUR\n  │     main.s (texte lisible par un humain)\n  ├─ 3. ASSEMBLAGE (as)            → traduit en code MACHINE\n  │     main.o (binaire, mais incomplet)\n  └─ 4. ÉDITION DE LIENS (ld)      → assemble les .o + bibliothèques\n        main (EXÉCUTABLE)' },
            { t: 'p', h: '**Étape 1 — Prétraitement** : le préprocesseur fait du TEXTE. `#include <stdio.h>` est remplacé par le CONTENU COMPLET de stdio.h (des milliers de lignes de déclarations), chaque `#define` est substitué à la main. Ton fichier de 20 lignes en fait maintenant 30 000 — c\'est normal.' },
            { t: 'p', h: '**Étape 2 — Compilation** : le vrai travail intellectuel. Le code C est analysé (syntaxe, types) puis traduit en **assembleur**, un langage à mi-chemin entre toi et le processeur : `mov`, `add`, `call`. **Étape 3 — Assemblage** : l\'assembleur devient des octets binaires — du code machine — rangés dans un fichier objet `.o`. Mais il manque encore printf.' },
            { t: 'p', h: '**Étape 4 — Édition de liens (linking)** : le linker recolle tes `.o` entre eux et avec la **bibliothèque standard** (là où vit VRAIMENT printf). C\'est ici qu\'échoue un appel vers une fonction jamais définie : `undefined reference to \'…\'` est une erreur de LIEN, pas de compilation — la syntaxe était bonne, le colis n\'est juste jamais arrivé.' },
            { t: 'code', lang: 'bash', label: 'Voir chaque étape de ses yeux', code:
'gcc -E main.c -o main.i    # stop après prétraitement (texte C dilué)\ngcc -S main.c              # stop après compilation (main.s, assembleur !)\ngcc -c main.c              # stop après assemblage (main.o, binaire object)\ngcc main.o -o main         # édition de liens seule\n\nwc -l main.i               # ≈ 30000 lignes : preuve du gonflement\nhead main.s                # admirer l\'assembleur une fois dans sa vie' },
            { t: 'h3', h: 'Pourquoi cette séparation est un GÉNIE' },
            { t: 'ul', items: [
              '**Compilation séparée** : chaque .c devient un .o indépendant. Tu modifies UN fichier → tu ne recompiles que lui, puis relink. Les gros projets (le noyau Linux = des millions de lignes) ne sont gérables que comme ça.',
              '**Portabilité** : le même main.c compilé sur ARM produit de l\'assembleur ARM, sur x86 de l\'assembleur x86. Le code source voyage, le binaire est local.',
              'C\'est l\'inverse des langages interprétés (Python exécute à la volée) : le C paie tout le travail AVANT l\'exécution — d\'où sa vitesse légendaire.'
            ] },
            { t: 'callout', kind: 'info', h: 'make et les Makefile automatisent ce pipeline : ils ne recompilent que les .o dont le .c est plus récent. Aucun projet C sérieux ne se compile à la main au-delà du deuxième fichier.' }
          ],
          errors: [
            { title: 'Confondre erreur de compilation et erreur de lien', lang: 'bash', bad:
'gcc main.c maths.c -o calc\n# undefined reference to `additionner\'\n# …et le débutant traque une coquille de syntaxe dans main.c',
              good:
'# undefined reference = ÉTAPE 4 : la fonction est DÉCLARÉE (compil OK)\n# mais jamais DÉFINIE dans aucun .o passé au linker.\n# Chercher : fichier oublié sur la ligne de commande, nom mal orthographié,\n# bibliothèque manquante (-lm pour math.h).',
              why: 'Chaque étape du pipeline a son vocabulaire d\'erreur. Syntax error / undeclared identifier = étape 2 (le C est mal formé). Undefined reference = étape 4 (tout était bien écrit, il manque un morceau au moment du collage). Diagnostiquer à la mauvaise étape, c\'est chercher ses clés dans le salon parce que la lumière y est meilleure.' }
          ],
          related: ['c-gcc-flags', 'c-entetes', 'c-structure-main']
        },

        {
          id: 'c-gcc-flags',
          title: 'GCC & Clang : les flags qui sauvent la vie',
          icon: 'tune',
          level: 'Intermédiaire',
          tagline: '-Wall n\'est pas optionnel — c\'est le ceinture de sécurité du langage.',
          intro: 'Le C est volontairement **permissif** : il accepte des choses dangereuses en supposant que tu sais ce que tu fais. Les avertissements du compilateur sont la contrepartie : des ennemis gratuits qu\'on t\'offre. Refuser `-Wall -Wextra`, c\'est conduire en C sans tableau de bord.',
          blocks: [
            { t: 'code', lang: 'bash', label: 'La ligne de commande de référence (à tatouer)', code:
'gcc -std=c11 -Wall -Wextra -Werror -g main.c -o main\n\n# -std=c11    : la norme (C17 = c17 ; par défaut GCC est en gnu17)\n# -Wall       : les avertissements principaux (mal nommé : pas vraiment "tous")\n# -Wextra     : les avertissements… supplémentaires (paramètres inutilisés, etc.)\n# -Werror     : transforme TOUT avertissement en ERREUR bloquante\n# -g          : embarque les infos de débogage pour GDB (fiche dédiée)' },
            { t: 'h3', h: 'Optimisation : -O0 debug, -O2 prod' },
            { t: 'table', head: ['Flag', 'Effet', 'Quand'], rows: [
              ['-O0 (défaut)', 'aucune optimisation, code fidèle au source', 'débogage'],
              ['-O2', 'optimisations sérieuses sans excès', 'production'],
              ['-O3', 'agressif (inlining, vectorisation)', 'calcul lourd, après mesure'],
              ['-Os', 'optimise la TAILLE', 'embarqué contraint'],
              ['-g', 'infos de débogage (compatible avec -O2)', 'profiling prod']
            ] },
            { t: 'h3', h: 'Les sanitizers : les camarades modernes de Valgrind' },
            { t: 'p', h: 'Depuis GCC 4.8, le compilateur peut **instrumenter** ton programme : chaque accès mémoire est vérifié à l\'exécution. C\'est plus rapide que Valgrind et souvent plus précis — le standard de qualité en 2026.' },
            { t: 'code', lang: 'bash', label: 'Compile, exécute, lis le rapport exact', code:
'gcc -std=c11 -g -fsanitize=address,undefined main.c -o main\n./main\n# AddressSanitizer: heap-buffer-overflow on address 0x…\n#     READ of size 4 at 0x… thread T0\n#     #0 0x… in traiter_commande stock.c:42        ← LA LIGNE COUPABLE\n# UBSanitizer : runtime error: signed integer overflow' },
            { t: 'ul', items: [
              '**-fsanitize=address (ASan)** : dépassements de tampon, use-after-free, fuites au exit.',
              '**-fsanitize=undefined (UBSan)** : dépassement d\'int signé, décalages invalides, derefs NULL.',
              '**-fsanitize=thread** : courses critiques (hors scope ici, mais existe).',
              'Coût : 2× plus lent, 3× plus de RAM. Un build sanitize en CI, un build -O2 en prod.'
            ] },
            { t: 'h3', h: 'GCC vs Clang' },
            { t: 'p', h: 'Deux compilateurs libres excellents, même interface de flags : Clang (LLVM) est réputé pour ses messages d\'erreur pédagogiques (avec caret ^ et couleurs), GCC pour son optimisation mature. Compiler avec LES DEUX en CI est gratuit et attrape plus d\'avertissements — chacun voit des défauts différents.' }
          ],
          errors: [
            { title: 'Compiler sans -Wall par habitude ou paresseux', lang: 'bash', bad:
'gcc main.c -o main\n./main\n# Segmentation fault — et 3 heures de printf-debugging.\n# Avec -Wall, le compilateur AVAIT prévenu : unused variable, format\n# mismatch dans printf, return manquant. Tout était écrit au départ.',
              good:
'gcc -std=c11 -Wall -Wextra -Werror main.c -o main\n# -Werror oblige à traiter les avertissements IMMÉDIATEMENT :\n# un avertissement ignoré aujourd\'hui est un bug de prod dans 6 mois.',
              why: 'Le C accepte volontairement des constructions fatales (format %d sur un float, fonction sans return, variable jamais lue). Les avertissements sont exactement la liste de ces pièges — un compilateur qui se tait vous ment par omission. À l\'échelle d\'une équipe, -Werror transforme la discipline en non-négociable.' },
            { title: 'Déboguer un binaire -O3', lang: 'bash', bad:
'gcc -O3 main.c -o main && gdb ./main\n# Dans GDB : les variables sautent, les lignes se téléportent,\n# des valeurs "optimisées dehors". Incompréhensible.',
              good:
'gcc -g -O0 main.c -o main && gdb ./main\n# Recompiler en -O2 + -g (ou utiliser -Og) pour le bug qui\n# n\'apparaît QU\'optimisé : souvent un comportement indéfini déguisé.',
              why: 'L\'optimiseur réordonne, inline et élimine : le binaire ne correspond plus ligne à ligne à ton source. Déboguer du -O3 à la main, c\'est lire une carte retournée. -Og existe exactement pour ça : optimisations qui ne gênent pas le débogage.' }
          ],
          related: ['c-compilation', 'c-valgrind', 'c-gdb']
        }
      ]
    },

    /* ======================================================
       2. STRUCTURE D\'UN PROGRAMME
       ====================================================== */
    {
      id: 'structure',
      name: 'Structure d\'un programme',
      icon: 'code',
      fiches: [
        {
          id: 'c-structure-main',
          title: 'main(), #include et codes de retour',
          icon: 'flag',
          level: 'Débutant',
          tagline: 'Le point d\'entrée, sa signature exacte, et ce que ton programme raconte au système en partant.',
          intro: 'Tout programme C commence à **`main`** — pas avant, pas ailleurs (contrairement au JS ou Python, rien ne s\'exécute « en dehors »). Sa signature est **contractuelle** : le système d\'exploitation appelle main, lui confie les arguments et attend un **code de retour** qui dit si tout s\'est bien passé.',
          blocks: [
            { t: 'code', lang: 'c', label: 'main.c — la forme canonique', code:
'#include <stdio.h>      // déclarations de printf & cie (copiées ici)\n#include <stdlib.h>     // EXIT_SUCCESS, EXIT_FAILURE, malloc…\n\nint main(void)\n{\n    int vendeuses = 2;\n    printf("Marché de Dantokpa : %d vendeuses enregistrées\\n", vendeuses);\n    return EXIT_SUCCESS;    // 0 : "tout s\'est bien passé"\n}' },
            { t: 'h3', h: 'Les deux signatures légales' },
            { t: 'ul', items: [
              '`int main(void)` : le programme ignore ses arguments. Le `void` en paramètre signifie EXPLICITEMENT « aucun » — `main()` vide laisserait la question ouverte en C.',
              '`int main(int argc, char *argv[])` : avec arguments de la ligne de commande (fiche argc/argv).',
              'Retourner autre chose que `int` (`void main`) est un abus non standard : certains compilateurs l\'acceptent, le système récupère alors une valeur aléatoire.'
            ] },
            { t: 'h3', h: '#include : une copie de texte, pas une bibliothèque' },
            { t: 'p', h: '`#include <stdio.h>` ne « charge » rien : le préprocesseur COLLE le contenu du fichier à cet endroit (étape 1 de la compilation). Ce fichier contient les **déclarations** de printf — la promesse de sa forme. Son **code**, lui, sera rattaché au moment de l\'édition de liens (étape 4). Chevron `<>` = headers système ; guillemets `"mes_macros.h"` = tes fichiers, cherchés d\'abord dans le projet.' },
            { t: 'h3', h: 'Le code de retour : parler au système' },
            { t: 'table', head: ['Valeur', 'Sens', 'Vue par le shell'], rows: [
              ['0 (EXIT_SUCCESS)', 'succès', 'echo $? → 0'],
              ['≠ 0 (EXIT_FAILURE…)', 'échec (la valeur détaille la cause)', 'echo $? → 1, 2, 42…'],
              ['pas de return en main', '0 implicite depuis C99 (main seulement)', '—']
            ] },
            { t: 'code', lang: 'bash', label: 'Le shell enchaîne sur ces codes', code:
'./inventaire gari && echo "inventaire OK"\n#       ↑ le && n\'enchaîne QUE si le code de retour vaut 0\n\n# astuce système : un script shell peut réagir\ncode = $?\necho "termine avec $code"' },
            { t: 'callout', kind: 'tip', h: 'Pendant le débogage, donne des codes DISTINCTS à chaque `exit(EXIT_FAILURE)` de parcours : 1 fichier manquant, 2 format invalide, 3 mémoire… Le script d\'automatisation saura alors exactement QUOI a échoué sans lire le texte.' }
          ],
          errors: [
            { title: 'Oublier le \\n des printf… et croire que rien ne s\'affiche', lang: 'c', bad:
'printf("Traitement en cours, 50000 lignes");\nfor (int i = 0; i < 50000; i++) travailler(i);\nprintf("terminé\\n");\n// À l\'écran : RIEN pendant des secondes, puis tout d\'un coup.\n// On croit que le programme est planté.',
              good:
'printf("Traitement en cours…\\n");    // le \\n déclenche l\'affichage\nou bien : fflush(stdout);            // vider le tampon à la demande',
              why: 'stdout est BUFFÉRISÉ : printf écrit dans un tampon en mémoire qui n\'est vidé à l\'écran qu\'au retour à la ligne, au plein, ou à la fin du programme. Sur une appli interactive (menu, barre de progression), l\'oubli du \\n ou du fflush donne l\'impression d\'un gel total alors que tout fonctionne.' }
          ],
          related: ['c-compilation', 'c-entetes', 'c-argc-argv']
        },

        {
          id: 'c-entetes',
          title: 'Fichiers d\'en-tête (.h) : la promesse et la preuve',
          icon: 'description',
          level: 'Débutant',
          tagline: 'Déclarer dans le .h, définir dans le .c — la séparation qui fait tenir les gros projets.',
          intro: 'Le C découpe chaque module en deux : le **`.h`** (l\'en-tête) annonce ce qui existe — la **déclaration**, un contrat ; le **`.c`** contient le code — la **définition**, l\'unique vrai exemplaire. Quand `main.c` et `stock.c` incluent tous deux `stock.h`, les deux connaissent le contrat, un seul .c fournit la marchandise.',
          blocks: [
            { t: 'code', lang: 'c', label: 'stock.h — le contrat', code:
'#ifndef STOCK_H          // garde d\'inclusion (fiche préprocesseur)\n#define STOCK_H\n\n// DÉCLARATIONS : "ça existe quelque part, voici la forme"\nint ajouter_sacs(int quantite);\nint retirer_sacs(int quantite);\nextern int sacs_en_stock;    // extern : déclaré, défini AILLEURS\n\n#endif                     // STOCK_H' },
            { t: 'code', lang: 'c', label: 'stock.c — la livraison', code:
'#include "stock.h"     // guillemets : le fichier est dans le projet\n\nint sacs_en_stock = 0;  // DÉFINITION (le seul vrai exemplaire)\n\nint ajouter_sacs(int q) {\n    sacs_en_stock += q;\n    return sacs_en_stock;\n}\n\nint retirer_sacs(int q) {\n    if (q > sacs_en_stock) return -1;   // convention : -1 = échec\n    sacs_en_stock -= q;\n    return sacs_en_stock;\n}' },
            { t: 'code', lang: 'bash', label: 'Compilation du projet multi-fichiers', code:
'gcc -std=c11 -Wall -Wextra -c stock.c     # stock.o\ngcc -std=c11 -Wall -Wextra -c main.c      # main.o\ngcc stock.o main.o -o inventaire          # lien final\n# règle d\'or : qui modifie un .c recompile UN SEUL .o' },
            { t: 'h3', h: 'Pourquoi la garde d\'inclusion est VITALE' },
            { t: 'p', h: '`#include` recopie le texte : si A.h inclut B.h et main.c inclut A.h ET B.h, les déclarations de B arrivent DEUX FOIS. Les types struct redéfinis explosent alors à la compilation. La garde `#ifndef … #define … #endif` rend le contenu inerte dès la deuxième inclusion (détails dans la fiche préprocesseur).' },
            { t: 'ul', items: [
              '**Dans le .h** : déclarations de fonctions, struct, typedef, extern de variables, #define.',
              '**Dans le .c** : définitions des fonctions ET des variables (l\'unique exemplaire).',
              '**Inclure son propre .h dans son .c** (comme stock.c) : le compilateur vérifie que promesse et preuve correspondent — gratuit.',
              'Le .h est une INTERFACE publique : ce qui n\'y figure pas reste privé au .c (mettre `static` devant aide le linker à l\'imposer).'
            ] },
            { t: 'callout', kind: 'info', h: 'extern : peu connu, absolument nécessaire. Une variable globale définie dans un .h serait DUPLIQUÉE dans chaque .o — le linker crie "multiple definition". Avec `extern`, tous pointent vers l\'unique définition du .c.' }
          ],
          errors: [
            { title: 'Définir une fonction (son code) dans un .h', lang: 'c', bad:
'// utilitaires.h\nint max(int a, int b) { return a > b ? a : b; }\n// inclus par 3 fichiers .c → undefined behavior de lien :\n// "multiple definition of max" chez la plupart des toolchains.',
              good:
'// utilitaires.h\ndouble max_d(double a, double b);\n// utilitaires.c\ndouble max_d(double a, double b) { return a > b ? a : b; }\n// Alternative acceptable : `static inline` dans le .h (C99+)\n// — chaque fichier a sa copie privée, le linker n\'a rien à dire.',
              why: 'Le linker exige UNE SEULE définition par symbole non-static. Un corps de fonction dans un header, c\'est autant d\'exemplaires que de fichiers qui l\'incluent : la colle finale échoue, et le message "multiple definition" envoie à tort les débutants traquer… une faute de frappe.' }
          ],
          related: ['c-compilation', 'c-compilation-conditionnelle', 'c-structure-main']
        }
      ]
    },

    /* ======================================================
       3. TYPES & REPRÉSENTATION MÉMOIRE
       ====================================================== */
    {
      id: 'types',
      name: 'Types & représentation',
      icon: '123',
      fiches: [
        {
          id: 'c-types-primitifs',
          title: 'Types primitifs & sizeof : la taille des choses',
          icon: '123',
          level: 'Débutant',
          tagline: 'int, char, float, double : combien d\'octets, quelles valeurs — et pourquoi ça dépend de la machine.',
          intro: 'En C, chaque variable occupe un nombre **EXACT** d\'octets en RAM — la mémoire n\'est pas un nuage, c\'est un casier. Le piège : le standard ne fixe que des **minimums** (`int` ≥ 16 bits). `sizeof` est ton mètre : il donne, à la COMPILATION, la taille réelle sur TA machine.',
          blocks: [
            { t: 'code', lang: 'c', label: 'Mesurer sa machine (sortie typique 64 bits)', code:
'#include <stdio.h>\n\nint main(void)\n{\n    printf("char   : %zu octet(s)\\n", sizeof(char));     // 1 — TOUJOURS 1\n    printf("short  : %zu\\n", sizeof(short));             // 2\n    printf("int    : %zu\\n", sizeof(int));               // 4\n    printf("long   : %zu\\n", sizeof(long));              // 8 sur Linux, 4 sur Windows !\n    printf("float  : %zu\\n", sizeof(float));             // 4\n    printf("double : %zu\\n", sizeof(double));            // 8\n    printf("int *  : %zu (pointeur)\\n", sizeof(int *));  // 8 sur 64 bits\n    return 0;\n}' },
            { t: 'h3', h: 'Ce que le standard garantit vraiment' },
            { t: 'ul', items: [
              '`sizeof(char) == 1` — par DÉFINITION. Un octet C = un char (pas forcément 8 bits partout, mais à 99,99 %).',
              'Ordre garanti : `char ≤ short ≤ int ≤ long ≤ long long`. C\'est tout.',
              '`int` ≥ 16 bits : sur un microcontrôleur, il peut en faire 16 — le même code change de comportement !',
              'Besoin de tailles EXACTES ? `<stdint.h>` : `int32_t`, `uint64_t`… — les types portables du système embarqué.'
            ] },
            { t: 'h3', h: 'char : un caractère est un NOMBRE' },
            { t: 'code', lang: 'c', label: 'ASCII en action', code:
'char lettre = \'A\';        // 65 dans la table ASCII\nprintf("%c = %d\\n", lettre, lettre);        // A = 65\nprintf("%c\\n", lettre + 1);                 // B — l\'arithmétique marche !\n\nchar chiffre = \'7\';       // 55 — le CARACTÈRE 7, pas la valeur 7\nint valeur = chiffre - \'0\';  // 55 - 48 = 7 : conversion caractère → nombre' },
            { t: 'p', h: 'Voilà pourquoi `\'A\'` (guillemets simples, UN caractère → un nombre de type int) et `"A"` (guillemets doubles, une chaîne → 2 octets en fait : 65 ET le terminateur 0) sont deux mondes. Le `\'\\0\'` de la fiche chaînes n\'est autre que le nombre 0 écrit « caractère nul ».' },
            { t: 'callout', kind: 'warn', h: 'sizeof donne un `size_t` : le formater avec `%d` (attend un int) est un bug de format réel sur 64 bits. Le bon format : `%zu`. Détails et drame dans la fiche Représentation.' },
            { t: 'code', lang: 'c', label: 'Le schéma RAM à garder en tête', code:
'// int sacs = 42;   sur une machine 64 bits, little-endian\n//\n//  adresse   octet    sens\n//  0x7ffc…00  2A       42 en hexa (poids faible en premier : little-endian)\n//  0x7ffc…01  00\n//  0x7ffc…02  00\n//  0x7ffc…03  00\n//           └── sizeof(int) = 4 octets réservés, contigus, NOMMÉS sacs' }
          ],
          errors: [
            { title: 'Supposer int = 4 octets partout', lang: 'c', bad:
'int max_sacs = 70000;   // Dépassement silencieux si int fait 16 bits !\n// Sur la vieille carte embarquée du compteur du marché :\n// 70000 → 4464 par wrap-around. Le stock a "fondu" tout seul.',
              good:
'#include <stdint.h>\nint32_t max_sacs = 70000;   // taille CONTRACTUELLE : 32 bits partout\n// ou au minimum : if (70000 > INT16_MAX) → choisir long.',
              why: 'Le C a 50 ans et tourne du satellite au grille-pain : ses tailles minimales datent d\'une époque où définir int = 32 aurait ruiné les petites machines. stdint.h règle le problème proprement — l\'utiliser systématiquement dans les structures partagées entre machines.' },
            { title: 'Formater un size_t avec %d', lang: 'c', bad:
'printf("taille : %d\\n", sizeof(double));\n// warning -Wformat : %d attend int, sizeof rend size_t (unsigned long)\n// → valeur absurde, voire crash selon l\'architecture.',
              good:
'printf("taille : %zu\\n", sizeof(double));   // z pour size_t, u unsigned',
              why: 'Les formats de printf sont des CONTRATS avec la pile : %d lit 4 octets signés là où sizeof a posé 8 octets non signés. La machine lit donc les mauvais octets — comportement indéfini discret. -Wall signale chacun de ces mismatchs; -Wextra les transforme en erreur.' }
          ],
          related: ['c-representation', 'c-modificateurs', 'c-chaines']
        },

        {
          id: 'c-modificateurs',
          title: 'unsigned, long, const, static, volatile',
          icon: 'rule',
          level: 'Intermédiaire',
          tagline: 'Cinq mots qui changent tout : capacité, visibilité, et ce que le compilateur a le droit de toucher.',
          intro: 'Les qualificateurs et modificateurs ajustent les types sur trois axes : la **capacité** (`unsigned`, `long`, `short`), la **promesse d\'immuabilité** (`const`) et la **visibilité/durée de vie** (`static`). Plus `volatile`, le mot étrange qui interdit au compilateur de faire semblant.',
          blocks: [
            { t: 'h3', h: 'unsigned : doubler la capacité en abandonnant le négatif' },
            { t: 'code', lang: 'c', label: 'Deux mondes de 4 octets', code:
'int          a;   // −2 147 483 648  …  +2 147 483 647\nunsigned int b;   //                0  …  +4 294 967 295\n\nunsigned int sacs = 0;\n// retirer_sacs(5) quand le stock est vide : 0 - 5 ?\nsacs = sacs - 5;    // 4294967291 ! (wrap-around défini, pas un crash)\n// ↑ le piège national, voir erreur plus bas' },
            { t: 'h3', h: 'const : la promesse vérifiée à la compilation' },
            { t: 'p', h: '`const double TVA = 0.18;` interdit toute écriture ultérieure — tentative = ERREUR de compilation, pas un bug nocturne. Crucial en paramètres : `void afficher(const char *nom)` promet « je lis mais ne modifie pas » — et le compilateur le GARANTIT. Plus de const = plus de code que tu peux lire sans crainte.' },
            { t: 'h3', h: 'static : deux sens, deux mondes' },
            { t: 'code', lang: 'c', label: 'Les deux statics', code:
'// 1. static LOCAL : vit pour TOUJOURS (comme une globale cachée)\nint passage_zeem(void) {\n    static int passages = 0;   // initialisé UNE fois, persiste entre appels\n    return ++passages;          // 1, 2, 3… — mémoire du compteur de Dantokpa\n}\n\n// 2. static FICHIER : visible uniquement dans ce .c\nstatic int fonction_interne(void) { /* invisible aux autres .o */ }\n// = le "privé" du C : l\'encapsulation se fait par static + header' },
            { t: 'h3', h: 'volatile : « c\'est le monde qui change cette case »' },
            { t: 'p', h: 'Sans volatile, le compilateur OPTIMISE : une variable relue deux fois sans réécriture visible est mise en cache dans un registre. Mais un registre ne voit pas le matériel : un port d\'entrée, une variable modifiée par une interruption peuvent changer SEULS. `volatile` force la RELecture en RAM à chaque accès — indispensable en embarqué, inutile (et coûteux) ailleurs.' },
            { t: 'table', head: ['Mot-clé', 'Axe', 'Effet'], rows: [
              ['unsigned', 'capacité', '0 … 2n−1, wrap-around défini'],
              ['long / short', 'capacité', 'plus / moins d\'octets (minimums)'],
              ['const', 'immuabilité', 'écriture = erreur de compilation'],
              ['static', 'durée/portée', 'persistance locale OU privé au fichier'],
              ['volatile', 'optimisation', 'toujours relire la RAM']
            ] }
          ],
          errors: [
            { title: 'Boucler avec un unsigned vers le bas', lang: 'c', bad:
'for (unsigned int i = 10; i >= 0; i--) {\n    traiter(i);\n}\n// i >= 0 est TOUJOURS vrai (unsigned ne descend jamais sous 0) :\n// après 0 vient 4 294 967 295 — boucle infinie + débordement.',
              good:
'for (int i = 10; i >= 0; i--) traiter(i);\n// ou, en gardant unsigned : for (unsigned i = 11; i-- > 0; ) traiter(i);\n// (idiome C classique : le test i-- > 0 décrémente APRÈS le test)',
              why: 'unsigned ne peut jamais être négatif : le test de sortie i >= 0 est vrai par définition — le compilateur (-Wtype-limits dans -Wextra) le signale d\'ailleurs. En remontant vers zéro on « wrappe » vers 4 milliards, et la boucle tourne jusqu\'au crash. Les indices descendants en signé, merci.' }
          ],
          related: ['c-types-primitifs', 'c-representation', 'c-pointeurs-defense']
        },

        {
          id: 'c-representation',
          title: 'Représentation mémoire : complément à deux, overflow, IEEE 754',
          icon: 'pin',
          level: 'Avancé',
          tagline: 'Pourquoi 200 + 100 peuvent donner −56, et 0.1 + 0.2 ≠ 0.3.',
          intro: 'Les octets en RAM ne sont que des motifs de bits — le SENS vient du type. Cette fiche ouvre le capot : comment les entiers négatifs sont codés (**complément à deux**), ce qui se passe quand une valeur déborde (**overflow**, parfois défini, parfois interdit), pourquoi les floats sont des **approximations**, et dans quel ordre les octets sont rangés (**endianness**).',
          blocks: [
            { t: 'h3', h: 'Complément à deux : le négatif en bits' },
            { t: 'code', lang: 'text', label: 'int8_t, 8 petits bits', code:
'        binaire   décimal\n  max : 0111 1111   +127\n\       0000 0001    +1\n  nul : 0000 0000     0\n       1111 1111    −1   ← ni −127, ni −0 : le complément à deux\n  min : 1000 0000   −128\n\nrègle : négatif = inverser tous les bits du positif, + 1\nconséquence : ZERO est unique, et min n\'a pas de positif miroir' },
            { t: 'p', h: 'Pourquoi ce système baroque ? Parce que l\'additionneur du processeur additionne alors SANS SE SOUCIER du signe : 1 + (−1) donne 0 naturellement, par simple débordement du 8e bit. Toute l\'arithmétique machine est construite là-dessus.' },
            { t: 'h3', h: 'Overflow : le piège défini et le piège INTERDIT' },
            { t: 'code', lang: 'c', label: 'Deux dépassements, deux lois différentes', code:
'unsigned char uc = 255;\nuc = uc + 1;     // 0 — DÉFINI : l\'unsigned « wrappe » (modulo 256). OK.\n\nint big = 2147483647;       // INT_MAX\nbig = big + 1;              // COMPORTEMENT INDÉFINI : tout peut arriver !\n// en pratique -2147483648… mais le standard autorise PIRE : le compilateur\n// peut SUPPOSER que ça n\'arrive jamais et optimiser en conséquence.\n\n// Budget Mobile Money en int signé centimes : 21 474 836,47 F max.\n// Un transfert de trop et le solde devient négatif. Vrai bug, vraies larmes.' },
            { t: 'h3', h: 'IEEE 754 : les floats sont des approximations' },
            { t: 'code', lang: 'c', label: 'La démonstration obligatoire', code:
'#include <stdio.h>\nint main(void) {\n    double a = 0.1 + 0.2;\n    printf("%.17g\\n", a);          // 0.30000000000000004\n    printf("%s\\n", a == 0.3 ? "egal" : "DIFFERENT");   // DIFFERENT !\n    return 0;\n}\n// 0.1 n\'existe pas en binaire : c\'est une fraction INFINIE (comme 1/3 en\n// décimal). On stocke la valeur la plus proche — d\'où le résidu.' },
            { t: 'ul', items: [
              '**Comparaison de floats** : jamais `==` — toujours `fabs(a - b) < 1e-9` (un epsilon adapté).',
              '**Sommes d\'argent** : pas de float. Compte en CENTIMES dans un entier (`long long`), ou bibliothèque décimale.',
              '**Précision** : float ≈ 7 chiffres significatifs, double ≈ 15 — les valeurs EXACTES au-delà s\'érodent (un id supérieur à 2⁵³ ne rentre plus dans un double).'
            ] },
            { t: 'h3', h: 'Endianness : l\'ordre des octets' },
            { t: 'code', lang: 'text', label: '0x12345678 en mémoire (x86 = little-endian)', code:
'adresse   +0     +1     +2     +3\nlittle :  78     56     34     12   ← poids faible D\'ABORD (Intel/AMD/ARM)\nbig    :  12     34     56     78   ← poids fort d\'abord (réseau, vieux PowerPC)\n\nimpact : invisible en C pur — COUPANT quand on écrit des octets bruts\n(fichiers binaires, réseau) : Un int écrit sur x86 se lit à l\'envers\nsur une machine big-endian. D\'où htonl/htons pour le réseau.' }
          ],
          errors: [
            { title: 'Comparer des floats avec ==', lang: 'c', bad:
'double total = 0.0;\nfor (int i = 0; i < 10; i++) total += 0.1;\nif (total == 1.0) printf("compte ok\\n");\n// jamais affiché : total vaut 0.9999999999999999',
              good:
'#include <math.h>\nif (fabs(total - 1.0) < 1e-9) printf("compte ok\\n");\n// Pour la MOMNAIE : entier en centimes, comparaison exacte garantie.',
              why: 'L\'accumulation d\'arrondis décale les valeurs de fractions d\'ulps — suffisant pour faire échouer == aléatoirement selon les plateformes et l\'optimisation. Un epsilon explicite rend la comparaison honnête ; pour l\'argent, seul l\'entier est exact.' },
            { title: 'Choisir par habitude l\'int signé pour un stock', lang: 'c', bad:
'int sacs_gari = 200;\nsacs_gari += 100;             // dépassement SIGNÉ = UB si > INT_MAX\n// UB = le compilateur peut "optimiser" en supposant\n// que ça n\'arrive jamais — résultat imprévisible et non traçable.',
              good:
'unsigned int sacs = 200;\nsacs += 100;                  // wrap DÉFINI (modulo 2^32) — au moins reproductible\n// Le vrai fix : choisir la taille adaptée (uint64_t) AVANT le débordement.',
              why: 'Le standard rend le dépassement signé indéfini précisément pour autoriser l\'optimisation agressive : un compilateur moderne SUPPRIMERA des tests "if (x + 1 < x)" comme impossibles. Comprendre que l\'UB n\'est pas "une valeur bizarre", c\'est "n\'importe quel comportement", change la façon d\'écrire les bornes.' }
          ],
          related: ['c-types-primitifs', 'c-modificateurs', 'c-tableaux']
        }
      ]
    },

    /* ======================================================
       4. POINTEURS (CRUCIAL)
       ====================================================== */
    {
      id: 'pointeurs',
      name: 'Pointeurs',
      icon: 'memory',
      fiches: [
        {
          id: 'c-pointeurs-bases',
          title: 'Pointeurs : adresses & et déréférencement *',
          icon: 'memory',
          level: 'Débutant',
          tagline: 'Une variable qui contient une adresse — la notion qui sépare ceux qui écrivent du C de ceux qui le subissent.',
          intro: 'Un **pointeur** est une variable qui contient une **adresse mémoire** — pas une valeur, la LOCALISATION d\'une valeur. `&` donne l\'adresse d\'une variable, `*` suit l\'adresse jusqu\'à la valeur. Tout le C tourne autour : fonctions qui modifient leurs arguments, tableaux, allocation dynamique, structures chaînées. On va le voir PHYSIQUEMENT, dans la RAM.',
          blocks: [
            { t: 'code', lang: 'c', label: 'Les deux opérateurs, à l\'œuvre', code:
'int sacs = 42;          // une variable normale : 42 quelque part en RAM\nint *p = &sacs;         // p : pointeur vers int → contient l\'ADRESSE de sacs\n\nprintf("valeur  : %d\\n", sacs);      // 42\nprintf("adresse : %p\\n", (void *)p); // 0x7ffc5a3b (exemple — change à chaque run)\nprintf("via p   : %d\\n", *p);       // 42 — on A SUIVI l\'adresse\n\n*p = 50;               // ÉCRIT à travers le pointeur\nprintf("sacs    : %d\\n", sacs);      // 50 ! sacs a changé SANS le nommer' },
            { t: 'code', lang: 'text', label: 'Ce qui se passe dans la RAM', code:
'    adresse    contenu     nom\n    0x7ffc…34  50          sacs  ◄──────────────┐\n    …\n    0x7ffc…40  0x7ffc…34   p  ────┘  p "pointe vers" sacs\n\n    `&sacs` = 0x7ffc…34            (l\'adresse, une valeur comme une autre)\n    `*p`    = le contenu DE l\'adresse stockée dans p = 50\n    `*p = 50;` = écrire À l\'adresse stockée dans p → modifie sacs' },
            { t: 'h3', h: 'Le double rôle de * — LA source de confusion' },
            { t: 'table', head: ['Contexte', 'Sens', 'Exemple'], rows: [
              ['dans une déclaration', '« c\'est un pointeur vers… »', 'int *p; → p contiendra une adresse d\'int'],
              ['dans une expression', '« suis l\'adresse » (déréférencement)', '*p = 50 ; lit y = *p'],
              ['& sur une variable', '« donne-moi son adresse »', 'int *p = &sacs'],
              ['& dans un type (pas en C !)', 'référence C++ — PAS EN C', '—']
            ] },
            { t: 'h3', h: 'Pourquoi c\'est LE pouvoir du C' },
            { t: 'ul', items: [
              '**Modifier à distance** : passer `&sacs` à une fonction la laisse changer TA variable (fiche passage par adresse).',
              '**Taille maîtrisée** : un pointeur fait 8 octets (64 bits), peu importe qu\'il vise un char ou une structure de 10 Mo — on passe l\'adresse, pas la copie.',
              '**Chaînage** : une structure contenant un pointeur vers la suivante = listes, arbres, graphes.',
              '**Le prix** : aucune garde. Une adresse fausse ou périmée, et tu lis/écris n\'importe où — d\'où les fiches défensives.'
            ] },
            { t: 'code', lang: 'c', label: 'sizeof d\'un pointeur : une adresse, c\'est une adresse', code:
'printf("%zu\\n", sizeof(char *));    // 8 sur 64 bits\nprintf("%zu\\n", sizeof(double *));  // 8 aussi\n// L\'adresse a toujours la même taille ; le TYPE pointé dit comment\n// INTERPRÉTER les octets visés (et de combien avancer en arithmétique).' },
            { t: 'callout', kind: 'warn', h: 'Un pointeur FRAÎCHEMENT déclaré pointe n\'importe où (adresse poubelle de la pile). `int *p; *p = 5;` = écriture à une adresse aléatoire → segfault ou corruption silencieuse. Initialise TOUJOURS : `int *p = NULL;` minimum (fiche hygiène).' }
          ],
          errors: [
            { title: 'Confondre déclaration et déréférencement', lang: 'c', bad:
'int *p;\nint x = 10;\np = x;          // ✗ assigne 10 comme ADRESSE : p pointe sur l\'adresse 10 !\n*p = 20;        // segfault immédiat (adresse 10 = zone interdite)',
              good:
'int x = 10;\nint *p = &x;    // p reçoit l\'ADRESSE de x\n*p = 20;        // x vaut maintenant 20\n// moyens mnémotechniques : le * de la déclaration fait partie du TYPE\n// (int * : "pointeur vers int"), le * de l\'expression est un VERBE (suis).',
              why: 'Le compilateur prévient pourtant (-Wint-conversion) : « assignment makes pointer from integer without a cast ». En traduisant mentalement les deux sens de * (déclarer vs suivre), l\'erreur devient impossible — la syntaxe ne ment pas, c\'est la lecture qui fait défaut.' },
            { title: 'Déréférencer un pointeur jamais initialisé', lang: 'c', bad:
'int *p;         // contenu : une adresse POUBELLE de la pile\nprintf("%d\\n", *p);   // on suit une adresse au hasard…\n// parfois ça "marche" (valeur absurde), parfois BOUM segfault.\n// Pire espèce de bug : intermittent.',
              good:
'int *p = NULL;          // un pointeur DÉLIBÉRÉMENT vide\nif (p != NULL) printf("%d\\n", *p);\n// habitude de pro : tout pointeur naît soit sur une vraie cible,\n// soit sur NULL — jamais dans le vide.',
              why: 'Une variable C non initialisée contient les restes de ce qui traînait à cet emplacement mémoire — ton pointeur vise donc une adresse imprevisible : lecture au hasard (benign, valeurs folles) ou écriture (catastrophe, tu casses une autre variable). NULL est l\'adresse officielle "pointe sur rien" — dereference-la : segfault IMMÉDIAT, donc débogable.' }
          ],
          related: ['c-pointeurs-avances', 'c-pointeurs-defense', 'c-passage-params']
        },

        {
          id: 'c-pointeurs-avances',
          title: 'Pointeurs de pointeurs, void* et const',
          icon: 'account_tree',
          level: 'Intermédiaire',
          tagline: 'Quand la flèche a une flèche : char **argv, le pointeur universel, et qui a le droit d\'écrire.',
          intro: 'Un pointeur étant une variable, il possède lui-même une adresse — un **pointeur de pointeur** la contient. Ajoute trois idées et tu maîtrises le tiercé avancé : le `**` classique (`char **argv`), le `void *` (pointeur vers « n\'importe quoi ») et la lecture des déclarations `const` complexes (qui est gelé : le pointeur, ou la cible ?).',
          blocks: [
            { t: 'code', lang: 'c', label: 'L\'escalier des étoiles', code:
'int sacs = 42;\nint *p = &sacs;      // p      : adresse d\'un int\nint **pp = &p;       // pp     : adresse d\'une ADRESSE d\'int\n\nprintf("%d\\n", **pp);   // 42 — deux déréférencements\n**pp = 100;              // sacs = 100, de loin en loin\n\n// À quoi ça sert ? Une fonction qui doit MODIFIER ton pointeur :\nvoid allouer(int **cible) {\n    *cible = malloc(sizeof(int));    // modifie LE POINTEUR de l\'appelant\n}\nint *zone = NULL;\nallouer(&zone);      // zone pointe désormais sur le tas' },
            { t: 'code', lang: 'text', label: 'argv : la meilleure motivation de char **', code:
'./inventaire gari 12\n\nargv[0] ──► "inventaire\\0"\nargv[1] ──► "gari\\0"\nargv[2] ──► "12\\0"\n\nchar *argv[]  = tableau de (char *) = "pointeur de pointeur de char"\nchar **argv   = même chose, forme signature\ndétail dans la fiche argc/argv' },
            { t: 'h3', h: 'void * : le pointeur sans type' },
            { t: 'ul', items: [
              '`void *` contient une adresse SANS dire ce qu\'il y a derrière — un « colis sans étiquette ».',
              'Affectation libre : `int *` → `void *` et retour se font SANS cast en C.',
              'Pour l\'utiliser, on RE-ÉTIQUETTE : `int *pi = (int *)pv;` — à TES risques.',
              '`malloc` rend un `void *` (fiche allocation), `memcpy`/`qsort` en prennent : c\'est le type des API génériques.',
              '`%p` exige `(void *)` en argument — le cast honnête dans les printf.'
            ] },
            { t: 'h3', h: 'const avec pointeurs : la déclaration à l\'envers' },
            { t: 'table', head: ['Déclaration', 'Ce qui est gelé', 'Autorisé ?'], rows: [
              ['const int *p', 'la CIBLE (*p)', 'p = autre_adresse ✓ ; *p = 5 ✗'],
              ['int * const p', 'le POINTEUR (p)', 'p = autre ✗ ; *p = 5 ✓'],
              ['const int * const p', 'les deux', 'ni l\'un ni l\'autre']
            ] },
            { t: 'p', h: 'La recette de lecture : lis de DROITE À GAUCHE. `const int *p` → « p est un pointeur vers un int qui est const » ; `int * const p` → « p est un const pointeur vers int ». `const char *nom` en paramètre = « tu me prêtes ta chaîne, je promets de ne pas y toucher » — la signature la plus honnête du C.' },
            { t: 'code', lang: 'c', label: 'Lecture appliquée', code:
'const char *ville = "Cotonou";   // je peux changer ville, pas le texte\nville = "Abomey-Calavi";          // ✓ le pointeur bouge\n/* *ville = \'c\'; */              // ✗ refusé : la cible est const\n\nchar stock[] = "gari";\nchar * const stand = stock;       // stand ne quittera JAMAIS ce tableau\nstand[0] = \'G\';                 // ✓ le contenu, lui, est libre\n/* stand = autre; */              // ✗ le pointeur est const' }
          ],
          errors: [
            { title: 'Retourner l\'adresse d\'une variable locale', lang: 'c', bad:
'int *lire_stock(void) {\n    int stock = 42;\n    return &stock;     // ✗ la variable MEURT au return : adresse suspendue\n}\nint *p = lire_stock();\nprintf("%d\\n", *p);   // lit une case RÉATTRIBUÉE : valeur folle',
              good:
'int *lire_stock(void) {\n    int *p = malloc(sizeof *p);    // vit sur le TAS : survit au return\n    *p = 42;\n    return p;                       // l\'appelant devra free()\n}\n// ou faire écrire dans la variable de l\'appelant :\nvoid lire_stock_dans(int *out) { *out = 42; }',
              why: 'Les variables locales vivent sur la PILE, recyclée à la sortie de fonction : ton pointeur vise une case immédiatement réattribuée aux appels suivants. GCC -Wreturn-local-addr le signale quand il le voit — mais les chemins indirects lui échappent. C\'est LE dangling pointer classique (fiche défensive).' },
            { title: 'Caster à travers void* sans savoir ce qui est dedans', lang: 'c', bad:
'void *colis = malloc(sizeof(double));\n*(int *)colis = 42;\n// ré-étiquetage double → int : on écrit 4 octets dans 8, mal aligné,\n// et la lecture suivante interprète les bits n\'importe comment.',
              good:
'// void* : pour les API génériques (memcpy, qsort) qui COPIENT des octets.\n// Le cast retour doit retrouver le VRAI type d\'origine — jamais au hasard.',
              why: 'void* déclare forfait de type : le compilateur ne protège plus rien, et l\'alignement (un double veut une adresse multiple de 8) peut être violé. Le contrat est verbal : cette adresse contient tel type, au bon alignement. Le casser est un UB discret, du genre qui marche 99 fois et mord la 100e.' }
          ],
          related: ['c-pointeurs-bases', 'c-pointeurs-defense', 'c-argc-argv']
        },

        {
          id: 'c-pointeurs-defense',
          title: 'NULL, dangling pointers & hygiène défensive',
          icon: 'health_and_safety',
          level: 'Intermédiaire',
          tagline: 'Le pointeur est un couteau : voici le protocole de sécurité de la cuisine.',
          intro: 'Trois accidents dominent la vie d\'un pointeur : le **sauvage** (jamais initialisé), le **nul** (`NULL` déréférencé) et le **suspendu** (il vise une mémoire déjà rendue). Le C ne te protégera pas — la sécurité est un PROTOCOLE, pas une fonctionnalité. Voici les règles que les projets sérieux rendent non négociables.',
          blocks: [
            { t: 'h3', h: 'Règle 1 : un pointeur naît propriétaire ou NULL — jamais dans le vide' },
            { t: 'code', lang: 'c', label: 'La naissance propre', code:
'int *p = NULL;        // délibérément vide (segfault IMMÉDIAT si déréférencé :\n                      //  mieux qu\'une corruption silencieuse de RAM !)\nint *q = &sacs;       // ou directement sur une vraie cible\n\nif (p != NULL) {      // règle 2 : TESTER avant de suivre\n    printf("%d\\n", *p);\n}' },
            { t: 'h3', h: 'Règle 2 : après free(), NULL — pas de pointeur zombie' },
            { t: 'code', lang: 'c', label: 'La mort propre', code:
'free(p);\np = NULL;             // le pointeur survit : on le coupe de la mémoire morte\n\nfree(p);              // free(NULL) est INOFFENSIF (défini par le standard)\nif (p != NULL) {      // tout double-free accidentel devient bénin\n    *p = 5;           // impossible de passer ici : prouvé, pas espéré\n}' },
            { t: 'h3', h: 'Le dangling pointer : l\'adresse d\'un mort' },
            { t: 'code', lang: 'c', label: 'Les deux situations typiques', code:
'// A. Mémoire libérée mais pointeur conservé :\nint *a = malloc(sizeof *a);\nfree(a);\n*a = 10;            // use-after-free : écrit dans une case REDISTRIBUÉE\n\n// B. Variable locale dont l\'adresse s\'échappe :\nint *f(void) { int x = 1; return &x; }   // x meurt au return' },
            { t: 'p', h: 'Dans les deux cas, l\'adresse TECHNIQUEMENT valide contient des données qui ne t\'appartiennent plus : lecture de valeurs folles, ou pire — écriture qui corrompt une autre allocation. Le symptôme classique : « ça marche tant que je n\'appelle rien d\'autre ». Valgrind (fiche dédiée) attrape les deux à tous les coups.' },
            { t: 'table', head: ['Accident', 'Cause', 'Défense'], rows: [
              ['wild pointer', 'jamais initialisé', '= NULL ou cible à la déclaration'],
              ['NULL deref', 'pas testé avant usage', 'if (p != NULL) aux frontières'],
              ['dangling', 'free() ou local morte', 'p = NULL après free ; jamais & de local retournée'],
              ['double free', 'free() deux fois', 'free(p); p = NULL; → le 2e est un free(NULL) légal']
            ] },
            { t: 'callout', kind: 'tip', h: 'Certains projets écrivent une macro FREE_SAFE(p) qui fait free + NULL d\'un coup ; d\'autres considèrent que le NULL masque les double-free légitimes (bugs de logique). Adopte la convention de ton équipe — mais ADOPTE-EN une.' },
            { t: 'h3', h: 'Le protocole copilote des fonctions' },
            { t: 'ul', items: [
              'Tout paramètre pointeur critique est testé en tête : `if (p == NULL) return -1;`',
              'const sur ce qu\'on promet de ne pas modifier (le compilateur fait le gendarme).',
              'Documenté dans le .h : qui ALLOUE, qui LIBÈRE — le propriétaire est toujours nommé.',
              'Un outil automatique en CI (ASan ou Valgrind) vérifie ce que les yeux ratent.'
            ] }
          ],
          errors: [
            { title: 'Tester APRÈS avoir déréférencé', lang: 'c', bad:
'int v = *p;\nif (p == NULL) return -1;    // trop tard : si p était NULL, on a déjà sauté',
              good:
'if (p == NULL) return -1;\nint v = *p;\n// L\'ordre du pipeline défensif est non négociable : teste, PUIS sers-toi.',
              why: 'Le déréférencement de NULL est un comportement indéfini — le crash (segfault) est le meilleur des mondes possibles ; le pire est une lecture "réussie" d\'une valeur absurde qui contamine les calculs en aval. Le test ne protège que s\'il précède.' }
          ],
          related: ['c-pointeurs-bases', 'c-malloc-free', 'c-valgrind']
        }
      ]
    }
  ]
};

/* ======================================================
   5. ALLOCATION DYNAMIQUE
   ====================================================== */
DEVDOCS.c.categories.push(
  {
    id: 'allocation',
    name: 'Allocation dynamique',
    icon: 'vertical_split',
    fiches: [
      {
        id: 'c-stack-vs-heap',
        title: 'Pile (Stack) vs Tas (Heap) : les deux terrains de la mémoire',
        icon: 'stacks',
        level: 'Débutant',
        tagline: 'L\'un se gère tout seul et pardonne, l\'autre t\'appartient — avec la puissance et les factures.',
        intro: 'Ton programme possède DEUX réserves de mémoire. La **pile** : rapide, automatique, bornée — chaque variable locale y naît et y meurt avec sa fonction. Le **tas** : immense, manuel, persistant — tu demandes un bloc (`malloc`), il te survit jusqu\'à ce que TU le rendes (`free`). Choisir entre les deux, c\'est choisir une durée de vie.',
        blocks: [
          { t: 'code', lang: 'text', label: 'La carte mémoire d\'un processus C', code:
' adresses hautes ┌─────────────────┐\n                 │  PILE (stack)   │  variables locales, adresses de retour\n                 │       ↓ grandit vers le bas\n                 │                 │\n                 │   (espace libre)│\n                 │                 │\n                 │       ↑ grandit vers le haut\n                 │  TAS (heap)     │  malloc/calloc/realloc — TON terrain\n                 ├─────────────────┤\n                 │  Données (data) │  globales, static initialisés\n                 │  BSS            │  globales non initialisés (à 0)\n                 │  Texte (code)   │  les instructions machine\n adresses basses └─────────────────┘' },
          { t: 'h3', h: 'La pile : self-service à durée limitée' },
          { t: 'ul', items: [
            'Allocation = déplacer un pointeur : instantanée, zéro appel système.',
            'Libération = sortie de fonction : automatique, IMPOSSIBLE à oublier.',
            'Durée de vie = la fonction (bloc `{ }`). C\'est pour ça que retourner l\'adresse d\'une locale est mortel : sa case est recyclée.',
            'Taille typique : ~8 Mo par thread (Linux) — un `int t[1000000]` local = 4 Mo d\'un coup, attention au stack overflow.'
          ] },
          { t: 'code', lang: 'c', label: 'Les deux terrains côte à côte', code:
'#include <stdio.h>\n#include <stdlib.h>\n\nvoid exemple(void) {\n    // PILE : 5 entiers, automatique\n    int locaux[5] = { 10, 20, 30, 40, 50 };\n\n    // TAS : 5 entiers, à moi jusqu\'à free\n    int *dynamiques = malloc(5 * sizeof *dynamiques);\n    if (dynamiques == NULL) return;   // malloc peut ÉCHOUER (tas plein)\n    dynamiques[0] = 10;\n\n    // … utilisation …\n    free(dynamiques);        // je RENDS le bloc — sinon : fuite\n    dynamiques = NULL;       // hygiène (fiche défensive)\n}\n// locaux disparaît tout seul ; sans free, dynamiques resterait pris' },
          { t: 'h3', h: 'Le tas : la liberté à responsabilité illimitée' },
          { t: 'ul', items: [
            'Durée de vie : jusqu\'à `free()` — survit aux fonctions, aux modules, aux heures de run.',
            'Taille : toute la RAM disponible (des Go, pas des Mo).',
            'Coût : allocation plus lente (bookeping du gestionnaire), fragmentation possible.',
            'Facture : chaque bloc demandé DOIT être rendu exactement une fois. Ni zéro (fuite), ni deux (double free).'
          ] },
          { t: 'callout', kind: 'tip', h: 'Règle de poing : local, petit, durée courte → pile. Partagé entre fonctions, grande taille, durée inconnue → tas. Quand le doute existe, la pile gagne : impossible d\'oublier de la libérer.' }
        ],
        errors: [
          { title: 'Un gros tableau sur la pile', lang: 'c', bad:
'void analyser_inventaire(void) {\n    int donnees[2000000];      // 8 Mo — la pile explose\n    // stack overflow (le nom vient de là, pas du site)\n}',
            good:
'void analyser_inventaire(void) {\n    int *donnees = malloc(2000000 * sizeof *donnees);\n    if (donnees == NULL) { fprintf(stderr, "mémoire pleine\\n"); return; }\n    /* travail… */\n    free(donnees);\n}',
            why: 'La pile est une zone bornée et précieuse : y poser des mégaoctets ne peut que s\'effondrer — et le crash arrive en PROD, quand les vraies données atteignent la taille critique que le test n\'avait pas. Tout ce qui dépasse quelques dizaines de Ko va au tas.' },
          { title: 'Récursion infinie : le stack overflow classique', lang: 'c', bad:
'int fibo(int n) {\n    return fibo(n - 1) + fibo(n - 2);   // pas de cas d\'arrêt !\n}\n// Chaque appel empile ~50 octets ; en millisecondes : pile pleine,\n// segfault — LE stack overflow littéral.',
            good:
'int fibo(int n) {\n    if (n <= 1) return n;        // LE cas d\'arrêt, testé EN PREMIER\n    return fibo(n - 1) + fibo(n - 2);\n}',
            why: 'Sur la pile, chaque appel récursif pose une adresse de retour et des locales ; sans condition de sortie, la pile grandit dans l\'espace libre jusqu\'à toucher le mur — le système tue le process. Chaque récursion écrite doit réciter son cas d\'arrêt AVANT l\'appel récursif.' }
        ],
        related: ['c-malloc-free', 'c-pointeurs-defense', 'c-erreurs-memoire']
      },

      {
        id: 'c-malloc-free',
        title: 'malloc, calloc, realloc, free : le quartet du tas',
        icon: 'view_agenda',
        level: 'Intermédiaire',
        tagline: 'Demander de la mémoire la rendre exactement une fois — la comptabilité d\'un projet C.',
        intro: 'Quatre fonctions de `<stdlib.h>` administrent le tas : **`malloc`** (prends un bloc brut), **`calloc`** (pareil, mais mis à zéro), **`realloc`** (redimensionne) et **`free`** (rends). Leur discipline est celle de tout projet C sain : un propriétaire par bloc, une libération par allocation, zéro exception.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Le cycle complet, avec les bons idiomes', code:
'#include <stdlib.h>\n\n// 1. malloc : TOUJOURS avec sizeof, TOUJOURS testé\nint *stock = malloc(n * sizeof *stock);   // *stock : taille auto-adaptée\nif (stock == NULL) { /* mémoire épuisée : décider, pas ignorer */ }\n\n// 2. calloc : malloc + remise à zéro (compteurs, index)\nint *vendus = calloc(26, sizeof *vendus);   // 26 zéros garantis\nif (vendus == NULL) { /* idem */ }\n\n// 3. realloc : agrandir — ATTENTION, peut DÉMÉNAGER le bloc\nint *tmp = realloc(stock, 2 * n * sizeof *tmp);\nif (tmp == NULL) {\n    /* stock est TOUJOURS valide : on garde l\'ancien, on gère l\'échec */\n} else {\n    stock = tmp;    // n\'oublier de récupérer la (peut-être nouvelle) adresse\n}\n\n// 4. free : une fois, puis NULL\nfree(stock);    stock = NULL;\nfree(vendus);  vendus = NULL;' },
          { t: 'h3', h: 'malloc vs calloc' },
          { t: 'table', head: ['', 'malloc', 'calloc'], rows: [
            ['Contenu initial', 'indéfini (restes en RAM)', 'zéro partout'],
            ['Signature', 'malloc(octets)', 'calloc(nb, taille_chaque)'],
            ['Usage', 'on va tout réécrire', 'tableaux de compteurs, structs'],
            ['Coût', 'léger', '+ le temps de zéroter']
          ] },
          { t: 'h3', h: 'realloc : trois vérités qui piquent' },
          { t: 'ul', items: [
            '**Il peut bouger** : faute de place contiguë, il copie AILLEURS et libère l\'ancien — toute adresse conservée ailleurs devient suspendue.',
            '**En cas d\'échec, l\'ancien bloc SURVIT** : d\'où le `realloc` vers une variable temporaire — `p = realloc(p, …)` en cas d\'erreur PERD l\'ancienne adresse : fuite garantie.',
            '`realloc(NULL, taille)` ≡ `malloc(taille)` et `realloc(p, 0)` est à éviter (comportement variable) : préfère free explicite.'
          ] },
          { t: 'p', h: 'Le comptable en chef veut des paires : pour chaque chemin d\'exécution, UN free par allocation. Les chemins d\'erreur (return au milieu) sont les grandes oubliées — c\'est pourquoi la structure `goto en_fin;` centralisant les frees est un idiome C respectable, pas un péché de jeunesse.' },
          { t: 'code', lang: 'c', label: 'L\'idiome de sortie centralisée', code:
'int traiter_commande(void) {\n    char *buf = malloc(4096);\n    FILE *f = NULL;\n    int resultat = -1;\n    if (buf == NULL) goto en_fin;\n\n    f = fopen("commandes.txt", "r");\n    if (f == NULL) goto en_fin;      // un seul endroit libère TOUT\n\n    /* traitement… */\n    resultat = 0;\n\nen_fin:\n    if (f != NULL) fclose(f);\n    free(buf);\n    return resultat;\n}' }
        ],
        errors: [
          { title: 'Oublier free() : la fuite mémoire', lang: 'c', bad:
'void tick(void) {\n    char *tmp = malloc(1024);\n    encore_du_travail(tmp);\n    // return sans free : 1 Ko parti. Appelé 60×/seconde :\n    // 3,6 Mo/min — le serveur gonfle jusqu\'au swap, puis au crash.\n}',
            good:
'void tick(void) {\n    char *tmp = malloc(1024);\n    if (tmp == NULL) return;\n    encore_du_travail(tmp);\n    free(tmp);\n    tmp = NULL;\n}\n// Et en CI : Valgrind ou ASan qui COURENT la CI, pas juste la conscience.',
            why: 'La fuite est le seul bug qui grossit en silence : chaque exécution semble OK, mais la RAM monte, monte — sur un serveur 7 j/7, c\'est le redémarrage hebdomadaire planifié « pour faire baisser la mémoire ». La RAM perdue n\'est jamais revenue : free est un PARTAGE comptable, pas une option.' },
          { title: 'p = realloc(p, taille) directement', lang: 'c', bad:
'stock = realloc(stock, 2 * n * sizeof *stock);\n// si ça échoue : rend NULL → l\'ANCIENNE adresse est perdue,\n// le bloc d\'origine devient inatteignable : fuite ET perte de données.',
            good:
'int *tmp = realloc(stock, 2 * n * sizeof *tmp);\nif (tmp != NULL) stock = tmp;\n// échec : stock pointe TOUJOURS vers l\'ancien bloc utilisable libérable.',
            why: 'realloc rend NULL en cas d\'échec SANS libérer l\'ancien bloc — parfaitement conçu. En écrasant p avec le retour, on efface la seule référence vers la mémoire restée valide : la fuite est automatique. La danse à la temporaire n\'est pas du style : c\'est la semaine comptable sans trou.' }
        ],
        related: ['c-stack-vs-heap', 'c-erreurs-memoire', 'c-valgrind']
      },

      {
        id: 'c-erreurs-memoire',
        title: 'Le catalogue des catastrophes mémoire',
        icon: 'report',
        level: 'Avancé',
        tagline: 'Fuite, double free, use-after-free, débordement de tas : les quatre cavaliers — et qui les arrête.',
        intro: 'Le C ne raisonne pas à ta place : chacun des quatre grands accidents mémoire est un **comportement indéfini** — le programme peut crasher, corrompre en silence, ou marcher 99 fois et planter devant le client. Connaître leur nom, leur mécanique et leurs symptômes, c\'est déjà les repérer dans un rapport Valgrind.',
        blocks: [
          { t: 'table', head: ['Accident', 'Mécanique', 'Symptôme typique'], rows: [
            ['Fuite (leak)', 'bloc plus référencé, jamais libéré', 'RAM qui grimpe sans jamais redescendre'],
            ['Double free', 'free() deux fois le même bloc', 'crash dans malloc/free ultérieurs, glibc "double free detected"'],
            ['Use-after-free', 'accès à un bloc déjà rendu', 'valeurs folles, crash intermittent "ça dépend de l\'ordre des appels"'],
            ['Heap overflow', 'écriture au-delà du bloc malloc', 'corruption des métadonnées du tas, plantages dans des endroits innocents']
          ] },
          { t: 'code', lang: 'c', label: 'Use-after-free : le plus bel effet papillon', code:
'int *a = malloc(sizeof *a);\n*a = 10;\nfree(a);\n\n// … plus tard, dans une fonction apparemment sans rapport…\nint *b = malloc(sizeof *b);    // malloc peut REDONNER l\'adresse de a !\n*b = 99;\n\n*a = 42;    // use-after-free : on écrit dans le bloc DE b !\n// b contient maintenant 42 : corruption silencieuse, débogage impossible' },
          { t: 'code', lang: 'text', label: 'Valgrind parle — il faut savoir lire', code:
'==1234== Invalid write of size 4\n==1234==    at 0x…: traiter (stock.c:42)\n==1234==  Address 0x… is 0 bytes after a block of size 40 alloc\'d\n==1234==    at 0x…: malloc (vg_replace_malloc.c)\n==1234==    by 0x…: main (main.c:12)\n\nLecture : ① QUOI (invalid write) ② OÙ (stock.c:42)\n          ③ par rapport à QUEL bloc (0 octets après un bloc de 40)\n          ④ alloué OÙ (main.c:12) — le mode d\'emploi du fix en 4 lignes' },
          { t: 'h3', h: 'Qui arrête quoi' },
          { t: 'ul', items: [
            '**Discipline** (NULL après free, propriétaire unique) : préventif, quotidien, humain.',
            '**-fsanitize=address** à la compilation : attrape use-after-free et overflows À L\'EXÉCUTION, avec la ligne précise — le niveau de sérieux moderne.',
            '**Valgrind memcheck** : les attrape sans recompiler (binaire normal), 20× plus lent, idéal en CI non régulier.',
            '**glibc elle-même** : free() de pointeur non alloué/double free souvent détectés — mais c\'est la SEULE protection native, et elle n\'est pas contractuelle.'
          ] },
          { t: 'callout', kind: 'warn', h: 'Le crash n\'est pas l\'ennemi — il est le SYMPTÔME HONNÊTE. Le vrai péril est le UB silencieux : le programme continue avec des données corrompues et écrit un rapport d\'inventaire erroné. En C, on préfère mille segfaults en dev qu\'une corruption heureuse en prod.' }
        ],
        errors: [
          { title: 'Double free en cascade d\'erreur', lang: 'c', bad:
'char *buf = malloc(512);\nif (erreur1) { free(buf); return; }\nif (erreur2) { free(buf); }\n/* traitement… */\nfree(buf);        // erreur2 free deux fois : double free\n// glibc peut le voir ("double free or corruption")… ou pas.',
            good:
'char *buf = malloc(512);\nint rc = -1;\nif (!erreur1 && !erreur2) rc = traitement(buf);\nfree(buf);  buf = NULL;    // UN SEUL free, en sortie unique\n// (pattern "goto en_fin" de la fiche malloc — même idée)',
            why: 'Chaque chemine de sortie pratique son propre free, la probabilité d\'en exécuter deux croît avec le nombre de branches — c\'est structurel. Centraliser la libération en UN point de sortie rend le double free structurellement impossible, d\'où l\'idiome goto du C pur.' },
          { title: 'Copier trop dans un bloc malloc-fixed', lang: 'c', bad:
'char *nom = malloc(16);\nstrcpy(nom, "Vendeuse Awa Mensah de Dantokpa");   // 33 octets dans 16\n// heap overflow : écrase les métadonnées du tas OU le bloc voisin',
            good:
'char *nom = malloc(strlen(source) + 1);   // taille CALCULÉE (+1 pour \\0)\nstrcpy(nom, source);\n// ou bien : taille fixe + copie bornée (snprintf/strncpy, fiche string.h)',
            why: 'malloc n\'attache AUCUNE étiquette de taille au bloc : seul ton code sait que c\'était 16 octets ; strcpy non — il copie au \\0, point. La taille doit donc être connue à l\'écriture : soit allouée au bon compte, soit copiée avec une borne explicite. Il n\'y a pas de troisième voie.' }
        ],
        related: ['c-malloc-free', 'c-pointeurs-defense', 'c-valgrind']
      }
    ]
  },

  /* ======================================================
     6. TABLEAUX & CHAÎNES
     ====================================================== */
  {
    id: 'tableaux',
    name: 'Tableaux & chaînes',
    icon: 'grid_on',
    fiches: [
      {
        id: 'c-tableaux',
        title: 'Tableaux statiques & arithmétique des pointeurs',
        icon: 'grid_on',
        level: 'Débutant',
        tagline: 't[i] et *(t + i) sont la même ligne — et pourquoi ça explique des années de culture C.',
        intro: 'En C, un tableau est une plage **contiguë** de cases identiques en RAM. Son nom, utilisé en expression, se **décaye** (decay) en l\'adresse de sa première case : `t` ≡ `&t[0]`. De cette seule équation découlent l\'arithmétique des pointeurs, l\'indexation, et 90 % des confusions du débutant.',
        blocks: [
          { t: 'code', lang: 'c', label: 'La relation tableau ↔ pointeur', code:
'int ventes[5] = { 12, 8, 30, 15, 22 };    // sacs de gari / jour\n\n// l\'indexation classique\nventes[2] = 31;\n\n// … est littéralement une FRIANDISE syntaxique pour :\n*(ventes + 2) = 31;\n\n// ventes + 2 : avance de 2 × sizeof(int) octets — l\'arithmétique\n// des pointeurs COMPTE EN ÉLÉMENTS, pas en octets !\nprintf("%d\\n", *ventes);        // 12 : le premier\nprintf("%d\\n", *(ventes + 4));  // 22 : le dernier' },
          { t: 'code', lang: 'text', label: 'La RAM en cartes à jouer', code:
' adresse     1000    1004    1008    1012    1016\n           ┌───────┬───────┬───────┬───────┬───────┐\n ventes    │  12   │   8   │  31   │  15   │  22   │\n           └───────┴───────┴───────┴───────┴───────┘\n             ↑                 ↑\n          ventes         ventes + 2  (= 1000 + 2×4 octets)\n          &ventes[0]     &ventes[2]' },
          { t: 'h3', h: 'Ce qui est vrai — et ce qui ne l\'est PAS' },
          { t: 'ul', items: [
            '`t[i]`, `*(t + i)`, `*(i + t)` et même `i[t]` sont ÉQUIVALENTS (oui, `2[ventes]` compile — curiosité de définition, n\'écris jamais ça au travail).',
            'Un nom de tableau N\'EST PAS un pointeur modifiable : `ventes++` est invalide (on ne déplace pas une plage).',
            '`sizeof(ventes)` = 20 (tout le tableau) mais `sizeof(p)` sur un pointeur = 8 — le pointeur a oublié la taille. D\'où la règle : la taille voyage TOUJOURS à côté.',
            'Passé en paramètre de fonction, le tableau décay : la fonction reçoit `int *` + une taille que TU dois fournir — voir l\'erreur mythique plus bas.'
          ] },
          { t: 'code', lang: 'c', label: 'Les idiomes de parcours', code:
'#define N 5\nint ventes[N] = { 12, 8, 30, 15, 22 };\n\n// 1. indice — le sûr\nfor (int i = 0; i < N; i++) printf("%d ", ventes[i]);\n\n// 2. pointeur mobile — l\'élégant\nfor (int *p = ventes; p < ventes + N; p++) printf("%d ", *p);\n\n// 3. taille calculée — le robuste\nint n = sizeof ventes / sizeof ventes[0];   // 20/4 = 5, à la COMPILE' },
          { t: 'callout', kind: 'warn', h: 'Accéder hors limites (`ventes[5]` sur un tableau de 5) ne lève AUCUNE erreur en C : tu lis ou écris la case voisine en RAM — souvent une autre variable. Comportement indéfini, corruption silencieuse. Le contrat est : TU connais la taille, TU restes dedans.' }
        ],
        errors: [
          { title: 'sizeof sur un paramètre tableau (decay)', lang: 'c', bad:
'double moyenne(int ventes[]) {\n    int n = sizeof ventes / sizeof ventes[0];   // ✗ 8/4 = 2 !\n    /* ventes est un POINTEUR ici : sizeof = taille du pointeur */\n}',
            good:
'double moyenne(int ventes[], int n) {           // la taille en paramètre +1\n    if (n <= 0) return 0;\n    long somme = 0;\n    for (int i = 0; i < n; i++) somme += ventes[i];\n    return (double)somme / n;\n}\n// appel : moyenne(ventes, sizeof ventes / sizeof ventes[0]); — calculé LÀ où\n// le tableau est encore un tableau.',
            why: 'En paramètre, `int ventes[]` est EXACTEMENT `int *ventes` : l\'information de taille est perdue au passage de la frontière. sizeof la ressuscite à tort — il mesure le pointeur reçu, pas le tableau d\'origine. Toute fonction C qui traite un tableau prend la taille en second paramètre : convention sans exception.' }
        ],
        related: ['c-pointeurs-bases', 'c-chaines', 'c-passage-params']
      },

      {
        id: 'c-chaines',
        title: 'Chaînes de caractères : le \\0 sacré',
        icon: 'text_fields',
        level: 'Intermédiaire',
        tagline: 'Une chaîne C est un pari : quelque part après ces octets, il y a un zéro. S\'il n\'y est pas, tout s\'effondre.',
        intro: 'Le C n\'a pas de type chaîne : une chaîne est une **convention** — un tableau de `char` qui se termine par le caractère nul **`\\0`** (le octet zéro). Toutes les fonctions de `<string.h>`, tous les `%s` de printf lisent jusqu\'à CE zéro. Oublier le terminateur, modifier un littéral : les deux rites de passage de tout développeur C.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Les deux habitations des chaînes', code:
'// 1. TABLEAU modifiable (la chaîne et sa maison sont à toi)\nchar ville[] = "Cotonou";    // 8 octets : C-o-t-o-n-o-u-\\0\nville[0] = \'K\';            // ✓ parfaitement légal\n\n// 2. POINTEUR vers littéral (lecture SEULE, zone protégée)\nconst char *pays = "Bénin";   // pointe vers la zone constante\n/* pays[0] = \'b\'; */        // ✗ CRASH : écriture en zone lecture seule !\n\n// sizeof intéressant :\nprintf("%zu\\n", sizeof ville);   // 8 — le tableau (avec le \\0)\nprintf("%zu\\n", strlen(ville)); // 7 — les caractères AVANT le \\0' },
          { t: 'code', lang: 'text', label: 'Ce que malloc(strlen + 1) signifie vraiment', code:
' char ville[] = "gari";\n\n indice     0     1     2     3     4\n          ┌─────┬─────┬─────┬─────┬─────┐\n contenu  │  g  │  a  │  r  │  i  │ \\0  │   ← 5 octets pour 4 lettres\n          └─────┴─────┴─────┴─────┴─────┘\n              ↑                    ↑\n         début de chaîne    TERMINATEUR — sans lui, strlen/strcpy/printf\n          (%s lit ici)      continuent dans le vide (RAM voisine !)' },
          { t: 'h3', h: 'Parcourir à la main (école de la chose)' },
          { t: 'code', lang: 'c', label: 'strlen réinventé', code:
'int ma_strlen(const char *s) {\n    int n = 0;\n    while (s[n] != \'\\0\') n++;    // avance jusqu\'au zéro\n    return n;\n}\n// Le patron de TOUTES les fonctions <string.h> : lire jusqu\'à \'\\0\'.\n// Si votre chaîne en manque : elles dépassent, corrompent, plantent.' },
          { t: 'h3', h: 'Construire une chaîne sans oublier le \\0' },
          { t: 'ul', items: [
            'Toute fonction qui écrit une chaîne dans un buffer doit y poser le `\\0` final — toi si tu écris à la main, la fonction si tu utilises strncpy à l\'ancienne (elle peut ne PAS le faire !).',
            '`snprintf(dest, taille_max, "%s", source)` est la copie moderne sûre : jamais d\'overflow, `\\0` GARANTI, retour utile.',
            'Le +1 de `malloc(strlen(s) + 1)` n\'est pas du style : c\'est LE lit du terminateur.',
            '`char s[10] = "Bonjour"` → le \\0 tient (7 = 6+1) ; `"Bonjour!"` déborde d\'1 : toujours compter +1.'
          ] },
          { t: 'callout', kind: 'warn', h: 'printf("%s", s) sans terminateur lit les octets voisins jusqu\'à tomber SUR un zéro : affichage de données privées (vieux secrets en RAM), puis segfault. Un buffer mal terminé n\'est pas un détail cosmétique — une fuite potentielle.' }
        ],
        errors: [
          { title: 'Oublier le \\0 après une copie manuelle ou un strncpy', lang: 'c', bad:
'char dest[8];\nstrncpy(dest, "Cotonou-centre", sizeof dest);   // tronque à 8 chars…\n// strncpy ne pose PAS le \\0 si la source fait EXACTEMENT la taille\n// (ou plus) : dest n\'est PAS une chaîne valide. strlen(dest) → ∞',
            good:
'char dest[9];\nsnprintf(dest, sizeof dest, "%s", "Cotonou-ce");   // \\0 garanti\n// idiom strncpy si obligé :\nstrncpy(dest, src, sizeof dest - 1);\ndest[sizeof dest - 1] = \'\\0\';   // on le pose SOI-MÊME, toujours',
            why: 'strncpy a été conçue pour les formats à taille fixe (cartes perforées logiciel !), pas pour du texte général : sa sémantique "complète par des zéros" disparaît exactement dans le cas dangereux. snprintf est la réponse universelle 2026 : borne, terminaison, code de retour détectant la troncature.' },
          { title: 'Modifier une chaîne littérale', lang: 'c', bad:
'char *quartier = "Dantokpa";\nquartier[0] = \'d\';    // Segmentation fault (ou corruption bizarre)\n// les littéraux vivent en zone LECTURE SEULE du binaire',
            good:
'char quartier[] = "Dantokpa";   // COPIE dans ton tableau : modifiable\nquartier[0] = \'d\';             // ✓\n// et pour la version pointeur : const char *q = "Dantokpa";\n// — le const transforme l\'accident en erreur de COMPILATION.',
            why: '"Texte" entre guillemets est compilé dans la section constante de l\'exécutable — le pointeur n\'y donne qu\'un passeport lecture. Le `[]` au lieu de `*` copie le texte au chaud dans TA pile : distinction fondamentale entre "je possède ces octets" et "je regarde ceux-là".' }
        ],
        related: ['c-string-h', 'c-tableaux', 'c-pointeurs-defense']
      },

      {
        id: 'c-string-h',
        title: 'string.h : strlen, strcpy, strcmp & le chaos des copies',
        icon: 'abc',
        level: 'Intermédiaire',
        tagline: 'Quatre fonctions, trois pièges par fonction : la petite bibliothèque standard qui teste si tu lis les manuels.',
        intro: '`<string.h>` est le quotidien du C : mesurer (`strlen`), copier (`strcpy`, `strncpy`), comparer (`strcmp`, `strncmp`), coller (`strcat`). Leur interface de 1978 suppose deux choses : la destination comprise est ASSEZ GRANDE, et les chaînes sont TERMINÉES. Toutes les failles buffer overflow du siècle sont nées de ces suppositions.',
        blocks: [
          { t: 'table', head: ['Fonction', 'Rôle', 'Le piège'], rows: [
            ['strlen(s)', 'longueur SANS le \\0', 'O(n) à chaque appel : dans une boucle, c\'est du O(n²) déguisé'],
            ['strcpy(d, s)', 'copie s dans d', 'aucune vérif de taille : classic overflow'],
            ['strcat(d, s)', 'colle s au bout de d', 'double peine : parcourt d, puis déborde si petit'],
            ['strcmp(a, b)', '0 si égales, <0 si…', 'if (strcmp(a,b)) lit "si DIFFÉRENT" : faux 90 % du code débutant'],
            ['strncpy/strncat', 'bornés', 'strncpy peut oublier le \\0 (fiche chaînes)']
          ] },
          { t: 'code', lang: 'c', label: 'strcmp lu correctement', code:
'#include <string.h>\n\nif (strcmp(reponse, "oui") == 0) {\n    printf("Commande confirmée\\n");\n} else {\n    printf("Annulée\\n");\n}\n\n// strcmp retourne : < 0 (a avant b), 0 (égalité), > 0 (a après b)\n// → if (strcmp(a, b)) = "s\'ils sont DIFFÉRENTS" (0 est FAUX en C)' },
          { t: 'code', lang: 'c', label: 'La copie sûre de 2026 (portable partout)', code:
'#include <stdio.h>\n\nchar dest[32];\n\nint n = snprintf(dest, sizeof dest, "%s %s", produit, quartier);\nif (n < 0 || (size_t)n >= sizeof dest) {\n    /* la chaîne a été TRONQUÉE : le saisir, ne pas l\'espérer */\n    fprintf(stderr, "nom trop long, tronqué\\n");\n}\n// snprintf : borne + \\0 GARANTI + retour = ce qu\'il AURAIT FALLU écrire' },
          { t: 'h3', h: 'Le réflexe longueur' },
          { t: 'code', lang: 'c', label: 'Le compte dans la tête AVANT le code', code:
'const char *produit = "gari";\nchar etiqu[16];\n\n// AVANT strcpy : strlen(source) + 1 <= taille(dest) ?\nif (strlen(produit) + 1 > sizeof etiqu) {\n    fprintf(stderr, "etiquette trop petite\\n");\n} else {\n    strcpy(etiqu, produit);\n}\n// pénible ? Oui. C\'s le prix du C sur les copies. snprintf fait tout\n// ce travail sans ce protocole — d\'où son succès.' },
          { t: 'h3', h: 'strlen dans les conditions de boucle : le tueur silencieux' },
          { t: 'code', lang: 'c', label: 'O(n²) sans le vouloir', code:
'// ✗ pour chaque caractère, on RECOMPTE toute la chaîne\nfor (int i = 0; i < strlen(s); i++)   // O(n) par TOUR\n    s[i] = toupper(s[i]);\n\n// ✓ compter UNE fois\nsize_t n = strlen(s);\nfor (size_t i = 0; i < n; i++)\n    s[i] = toupper((unsigned char)s[i]);' },
          { t: 'callout', kind: 'tip', h: 'gets() est le pompier pyromane historique (impossible à borner, RETIRÉ du standard en C11). Remplace tout `gets/scanf("%s")` par `fgets(buf, sizeof buf, stdin)` — borne incluse, famille recomposée.' }
        ],
        errors: [
          { title: 'Confondre la valeur de vérité de strcmp', lang: 'c', bad:
'if (strcmp(nom, "Awa")) {\n    printf("Bonjour Awa\\n\");\n}\n// strcmp rend 0 SI ÉGAL — et 0 est FAUX en C : ce code\n// salue tout le monde SAUF Awa. Le bug d\'identité inverse.',
            good:
'if (strcmp(nom, "Awa") == 0) { /* c\'est elle */ }\nif (strcmp(nom, "Awa") != 0) { /* ce n\'est pas elle */ }\n// Rituel : strcmp se lit toujours avec == 0 ou != 0 explicitement.',
            why: 'strcmp n\'est pas un prédicat "est-ce égal ?" — c\'est un comparateur à trois voies (ordre lexicographique) dont l\'égalité se lit 0. Le piège est d\'autant plus traître que le code COMPILE et tourne : seuls les tests métier révèlent la logique inversée.' },
          { title: 'strcat sur un buffer limite', lang: 'c', bad:
'char msg[20] = "Stock gari : ";\nstrcat(msg, "insuffisant pour 2 jours");\n// 13 + 24 + 1 = 38 > 20 : heap/stack overflow textuel,\n// la variable voisine s\'en souvient longtemps.',
            good:
'char msg[64];\nsnprintf(msg, sizeof msg, "Stock %s : %s", "gari", alerte);\n// ou si tu tiens à strcat : vérifier strlen(deja) + strlen(ajout) + 1.',
            why: 'strcat avance jusqu\'au \\0 PUIS copie : double parcours, zéro contrôle de la taille totale, et si msg n\'est pas terminée correctement il part courir la RAM. La concaténation sûre en C moderne s\'écrit snprintf — une fois, une borne, un terminateur garanti.' }
        ],
        related: ['c-chaines', 'c-tableaux', 'c-erreurs-memoire']
      }
    ]
  },

  /* ======================================================
     7. STRUCTURES, UNIONS & ENUMS
     ====================================================== */
  {
    id: 'structures',
    name: 'struct, union & enum',
    icon: 'view_in_ar',
    fiches: [
      {
        id: 'c-structures',
        title: 'struct & typedef : construire ses propres types',
        icon: 'view_in_ar',
        level: 'Débutant',
        tagline: 'La donnée métier cesse d\'être trois variables qui se suivent et devient UNE chose.',
        intro: 'Une **structure** regroupe des champs de types différents sous un seul nom : le enregistrement, le row de la base de données, le objet pauvre. `typedef` lui offre un nom court. Ensemble, ils sont le passage de "variables éparses" à "modèle de données" — un vendeuse, une commande, un stand.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Déclarer, nommer, utiliser', code:
'#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char nom[50];\n    char stand[10];\n    double solde;\n    int nb_sacs;\n} Vendeuse;               // le type s\'appelle Vendeuse, tout simplement\n\nint main(void) {\n    Vendeuse awa = { "Awa Mensah", "N12", 125000.0, 8 };   // init en accolade\n    Vendeuse senami = { .nom = "Sènami", .stand = "B4",    // init nommée (C99+)\n                        .solde = 98000, .nb_sacs = 5 };\n\n    awa.nb_sacs += 2;                          // accès par point\n    printf("%s : %d sacs\\n", awa.nom, awa.nb_sacs);\n    return 0;\n}' },
          { t: 'h3', h: 'Le point et la flèche' },
          { t: 'code', lang: 'c', label: '. pour la struct, -> pour son pointeur', code:
'void crediter(Vendeuse *v, double montant) {\n    v->solde += montant;     // (*v).solde — la flèche est un raccourci\n    v->nb_sacs;\n}\n\nVendeuse awa = { "Awa Mensah", "N12", 125000.0, 8 };\ncrediter(&awa, 15000);        // on passe l\'ADRESSE : pas de copie, modifiable\n\n// v->champ  ⟺  (*v).champ — mémotechnique : flèche = "va voir là-bas"' },
          { t: 'h3', h: 'Copie par valeur : la bonne surprise… et le piège' },
          { t: 'ul', items: [
            '`Vendeuse copie = awa;` COPIE toute la structure (les structs se copient, contrairement aux tableaux !).',
            '…mais la copie est SUPERFICIELLE : un champ pointeur est copié tel quel — deux structs "propriétaires" du même bloc (avec un free chacun : double free au menu).',
            'Passer une struct par valeur à une fonction = copier TOUTE la structure en pile : parfait sous ~64 octets, frime au-dessus (passer `const Struct *`).',
            'Initialisation incomplète : les champs omis d\'une accolade `{}` sont mis à ZÉRO automatiquement (contrairement aux variables brutes).'
          ] },
          { t: 'code', lang: 'bash', label: 'table de structs : la minibase locale', code:
'Vendeuse marche[100];\nstrcpy(marche[0].nom, "Awa Mensah");\n\nfor (int i = 0; i < n; i++) {\n    if (marche[i].nb_sacs < 3)\n        printf("%s doit réassortir\\n", marche[i].nom);\n}' },
          { t: 'callout', kind: 'tip', h: 'Retours multiples en C : une fonction veut rendre DEUX valeurs ? return d\'une petite struct par valeur (résultat + statut) — moderne, lisible, et les compilateurs l\'optimisent mieux que deux pointeurs de sortie.' }
        ],
        errors: [
          { title: 'Passer la grosse struct par valeur « par simplicité »', lang: 'c', bad:
'void afficher(Vendeuse v) {     // COPIE intégrale à chaque appel\n    printf("%s\\n", v.nom);\n}\nfor (int i = 0; i < 10000; i++) afficher(marche[i]);   // 10000 copies !',
            good:
'void afficher(const Vendeuse *v) {   // 8 octets, lecture garantie\n    printf("%s\\n", v->nom);\n}\nafficher(&marche[i]);',
            why: 'Par valeur, la struct entière est recopiée sur la pile à chaque appel — invisible en petit, désastreux en grand (réseau de structures). La règle : écriture prévue → pointeur ; lecture → const pointeur ; valeur → seulement les petites structs retournées, jamais passées.' }
        ],
        related: ['c-packing', 'c-unions-enums', 'c-passage-params']
      },

      {
        id: 'c-packing',
        title: 'Alignement & padding : sizeof te ment (un peu)',
        icon: 'compress',
        level: 'Avancé',
        tagline: 'Un char et un int : 5 octets ? Non, 12. Le compilateur range à sa manière — et il faut le savoir.',
        intro: 'Le processeur lit les entiers plus vite quand leur adresse est **alignée** sur leur taille (un `int` 4 octets aime une adresse multiple de 4). Pour garantir ça, le compilateur insère des **trous (padding)** entre les champs — ton struct est plus grand que la somme de ses champs. Ignorer le padding, c\'est mal calculer ses malloc, et corrompre les structures envoyées sur le fil.',
        blocks: [
          { t: 'code', lang: 'c', label: 'La démonstration sizeof', code:
'#include <stdio.h>\n\ntypedef struct { char a; int b; char c; } Compact;\ntypedef struct { int b; char a; char c; } Ordonne;\n\nint main(void) {\n    printf("Compact : %zu octets\\n", sizeof(Compact));  // 12 ! pas 6\n    printf("Ordonne : %zu octets\\n", sizeof(Ordonne));  // 8\n    return 0;\n}' },
          { t: 'code', lang: 'text', label: 'Compact en RAM : les trous de padding', code:
'adresse  : 0    1    2    3    4    5    6    7    8    9   10   11\n         ┌────┬─────────────┬─────────────┬────┬─────────────┐\n contenu : │ a  │ ░░ padding ░░ │ b (int, 4)  │ c  │ ░░ padding ░░ │\n         └────┴─────────────┴─────────────┴────┴─────────────┘\n                                              ↑\n            b DOIT commencer à une adresse multiple de 4 → 3 trous\n            + padding de fin : la struct s\'arrondit à son alignement max\n\nOrdonne (int d\'abord) : bbbb a c ░░ = 8 octets. Même contenu,\nmême sens — 33 % de gagné en réordonnant les champs, DU PLUS GRAND\nALIGNEMENT AU PLUS PETIT.' },
          { t: 'h3', h: 'Les règles pratiques' },
          { t: 'ul', items: [
            '`sizeof(struct)` ≥ somme des champs — le compilateur arrondit à l\'alignement du plus grand champ (`_Alignof` le donne).',
            'Réordonne les champs par taille DÉCROISSANTE d\'alignement : double, pointeurs, int, short, char — padding minimal gratuitement.',
            '`offsetof(Struct, champ)` donne la position réelle d\'un champ (utile pour sérialiser champ par champ).',
            '#pragma pack / __attribute__((packed)) suppriment le padding — au prix d\'accès plus lents (et de crashs sur certaines architectures). À réserver aux formats fichiers/réseau, jamais par défaut.'
          ] },
          { t: 'h3', h: 'Pourquoi cette fiche est vitale aux frontières' },
          { t: 'p', h: 'Écrire une struct brute avec `fwrite` puis la relire sur une AUTRE machine (autre compilateur, autre endianness, autre padding) est la corruption de données la plus sournoise du C : tout a l\'air de marcher, et les champs sont décalés. Sérialiser PROPREMENT : champ par champ (fwrite par champ), ou un format explicite (texte, JSON, protocole bord à bord…) — voir fiche fichiers binaires.' },
          { t: 'callout', kind: 'tip', h: 'Bit fields (`unsigned actif : 1;`) et padding interagissent subtilement ; pour les sauvegardes portables, reste aux champs classiques et gère les drapeaux avec des masques explicites (`#define ACTIF 0x01` + `&`/`|`) — plus verbeux, infiniment plus prévisible.' }
        ],
        errors: [
          { title: 'fwrite d\'une struct entière comme format de sauvegarde', lang: 'c', bad:
'typedef struct { char tag; int quantite; double prix; } Ligne;\nLigne l = { .tag = 1, .quantite = 42, .prix = 1500.0 };\nfwrite(&l, sizeof l, 1, f);\n// Relu ailleurs : padding différent (12 vs 16), endianness inversée,\n// double non standard → données corrompues en silence.',
            good:
'// Sérialiser CHAMP PAR CHAMP avec un format DOCUMENTÉ :\nfwrite(&l.tag, sizeof l.tag, 1, f);\nfwrite(&l.quantite, sizeof l.quantite, 1, f);\n// (idéalement : types fixes <stdint.h> + ordre d\'octets défini)',
            why: 'La struct en RAM est un détail d\'implémentation : padding, ordre des octets et tailles varient d\'une machine à l\'autre et d\'un -m32 à -m64. Un format de fichier est un CONTRAT : il se définit octet par octet, champ par champ, avec des tailles fixes — sinon l\'archive d\'hier devient illisible demain.' }
        ],
        related: ['c-structures', 'c-fichiers-binaires', 'c-representation']
      },

      {
        id: 'c-unions-enums',
        title: 'union, enum & le pattern tagged union',
        icon: 'merge',
        level: 'Intermédiaire',
        tagline: 'Une case, plusieurs identités : économiser la mémoire sans perdre la tête.',
        intro: 'Une **`union`** fait cohabiter plusieurs membres DANS LA MÊME case mémoire : un paiement peut être en espèces OU en Mobile Money OU par carte — jamais les trois à la fois, pourquoi payer trois places de parking ? L\'**`enum`** nomme des constantes entières. Combinés, ils forment le **tagged union** : LE type somme du C, l\'ancêtre des enums riches de Rust/Swift.',
        blocks: [
          { t: 'code', lang: 'c', label: 'union : plusieurs membres, une seule adresse', code:
'union ValeurPaiement {\n    double especes;           // montant en cash\n    struct { int operateur; char reference[13]; } momo;  // MTN=1, Moov=2\n    struct { char quatre_derniers[5]; } carte;\n};\n// sizeof(union) = taille du PLUS GRAND membre (18 octets ici, arrondi)\n// → écrire un membre ÉCRASE les autres : tous partagent la même case' },
          { t: 'code', lang: 'c', label: 'enum : nommer les cas', code:
'enum ModePaiement { PAIEMENT_ESPECES, PAIEMENT_MOMO, PAIEMENT_CARTE };\n// PAIEMENT_ESPECES = 0, _MOMO = 1, _CARTE = 2 (auto-incrément)\n// ou explicite : enum ModePaiement { PAIEMENT_ESPECES = 10, … };' },
          { t: 'h3', h: 'Le pattern complet : l\'union qui SAIT qui elle est' },
          { t: 'code', lang: 'c', label: 'Paiement : enum (tag) + union (données)', code:
'typedef struct {\n    enum ModePaiement mode;   // LE TAG : dit quel membre est valide\n    union ValeurPaiement valeur;\n    double montant;\n} Paiement;\n\ndouble percevoir(const Paiement *p) {\n    switch (p->mode) {\n    case PAIEMENT_ESPECES: return p->valeur.especes;\n    case PAIEMENT_MOMO:\n        printf("MoMo ref %s\\n", p->valeur.momo.reference);\n        return p->montant;\n    case PAIEMENT_CARTE:\n        printf("Carte •••• %s\\n", p->valeur.carte.quatre_derniers);\n        return p->montant;\n    default:\n        fprintf(stderr, "mode inconnu\\n");\n        return -1;\n    }\n}' },
          { t: 'table', head: ['Outil', 'Rôle', 'Coût / garantie'], rows: [
            ['enum', 'constantes nommées lisibles', '0 octet : ce sont des int'],
            ['union', 'mémoire alternée économe', 'aucune info sur le membre actif !'],
            ['tagged union', 'type somme sûr (si discipline)', '1 tag par valeur + switch exhaustif']
          ] },
          { t: 'h3', h: 'Le test de l\'exhaustivité' },
          { t: 'p', h: 'Ajouter `PAIEMENT_TONTINE` demain = parcourir TOUS les `switch` sur le tag. Le compilateur aide : avec `-Wall`, un `switch` sur enum oubliant un cas déclenche `-Wswitch` ; sans `default`, l\'avertissement devient visible. C\'est l\'exhaustivité artisanale du C — une convention, pas une preuve, mais une convention qui crie.' },
          { t: 'callout', kind: 'warn', h: 'Lire un membre d\'union différent de celui écrit est (sauf aliasing char) un comportement indéfini — tu réinterprètes les bits. Le tag n\'est pas décoratif : c\'est la SEULE connaissance de "qui habite là en ce moment".' }
        ],
        errors: [
          { title: 'Utiliser une union SANS tag associé', lang: 'c', bad:
'union ValeurPaiement v;\nv.momo.operateur = 1;\nstrcpy(v.momo.reference, "240612345678");\n// … 40 lignes plus loin :\nprintf("%.2f\\n", v.especes);   // lit du FLOAT sur des bits de texte !',
            good:
'Paiement p = { .mode = PAIEMENT_MOMO };\np.valeur.momo.operateur = 1;\n// tout accès passe par un switch (p.mode) — le tag décide, pas l\'humeur',
            why: 'L\'union ne garde AUCUNE trace du dernier membre écrit : sans tag, la validité d\'une lecture repose sur la mémoire du programmeur 40 lignes plus haut et le calendrier des modifications. Le tagged union monte le raisonnement au niveau du type — exactement ce que Rust/Swift ont institutionnalisé après nous.' }
        ],
        related: ['c-structures', 'c-packing', 'ts-discriminated-unions']
      }
    ]
  },

  /* ======================================================
     8. FONCTIONS & PASSAGES DE PARAMÈTRES
     ====================================================== */
  {
    id: 'fonctions',
    name: 'Fonctions & passages',
    icon: 'functions',
    fiches: [
      {
        id: 'c-passage-params',
        title: 'Passage par valeur vs par adresse : le swap mythique',
        icon: 'swap_horiz',
        level: 'Intermédiaire',
        tagline: 'Tout est par valeur en C — même les adresses. La subtilité est là, entière.',
        intro: 'En C, **tout** paramètre est une copie : la variable elle-même pour un int, l\'ADRESSE pour un pointeur. Donc une fonction ne peut JAMAIS modifier ta variable directement — mais si tu lui remets sa **copie de l\'adresse**, elle écrit chez toi. C\'est la leçon `swap()` : l\'exemple que chaque cours refait, parce qu\'il résume le langage entier.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Le swap en deux actes', code:
'#include <stdio.h>\n\n// ACTE 1 — l\'échec inévitable : par VALEUR (copies)\nvoid echanger_rate(int a, int b) {\n    int t = a; a = b; b = t;     // échange des COPIES : l\'appelant intact\n}\n\n// ACTE 2 — la réussite : par ADRESSE (copies des adresses, mémoire partagée)\nvoid echanger(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;  // écrit À L\'ADRESSE : l\'appelant modifié\n}\n\nint main(void) {\n    int x = 1, y = 2;\n    echanger_rate(x, y);   // x=1, y=2 — rien n\'a bougé\n    echanger(&x, &y);      // x=2, y=1 — le monde a changé\n    printf("%d %d\\n", x, y);\n    return 0;\n}' },
          { t: 'h3', h: 'L\'image mentale définitive' },
          { t: 'p', h: 'Passer `x`, c\'est donner la photocopie du document : le destinataire y gribouille, ton original est intact. Passer `&x`, c\'est donner LE NUMÉRO DU CASIER : le destinataire va directement fouiller ton casier — tout ce qu\'il y change te concerne. Et la photocopie du numéro de casier est suffisante : d\'où « par valeur DE L\'ADRESSE ».' },
          { t: 'h3', h: 'Les trois usages du passage par adresse' },
          { t: 'ul', items: [
            '**Modifier la variable de l\'appelant** : echanger(), lire_stock(), remplir un buffer.',
            '**Sorties multiples** : return le statut + écrire des résultats dans des pointeurs (idées : max ET min en un passage).',
            '**Éviter des copies géantes** : `const GrosseStruct *` — 8 octets passés, lecture garantie (fiche structures).'
          ] },
          { t: 'h3', h: 'Cas particulier mythique : les tableaux' },
          { t: 'code', lang: 'c', label: 'Un tableau EST déjà une adresse (decay)', code:
'void doubler(int t[], int n) {          // t est int * : l\'ADRESSE\n    for (int i = 0; i < n; i++) t[i] *= 2;\n}\n\nint ventes[5] = { 1, 2, 3, 4, 5 };\ndoubler(ventes, 5);       // PAS de copie de 20 octets : l\'adresse circule\n                           // le tableau EST modifié — c\'est voulu (decay)' },
          { t: 'callout', kind: 'tip', h: 'Question d\'entretien : « comment écrire une fonction qui MODIFIE le pointeur de l\'appelant (pas la cible) ? » Réponse : passer l\'adresse DU POINTEUR — `void allouer(int **p)` (fiche pointeurs avancés). Même logique, un étage de plus.' }
        ],
        errors: [
          { title: 'Croire que swap(a, b) par valeur fonctionne « dans les petits cas »', lang: 'c', bad:
'void echanger_rate(int a, int b) { int t = a; a = b; b = t; }\n// "en test simple, ça avait l\'air OK" — non : ça n\'a JAMAIS marché.\n// Les copies sont échangées, l\'appelant ne voit strictement rien.',
            good:
'void echanger(int *a, int *b) { int t = *a; *a = *b; *b = t; }\n// l\'appel : echanger(&x, &y);  — le & dit tout : on donne les casiers.',
            why: 'La confusion vient des langages à références (Python, JS) où la variable semble voyager. En C la frontière est nette : sans adresse, la fonction est sourde et aveugle à ton cadre. L\'erreur se compile parfaitement et roule sans bruit — seule la SÉMANTIQUE trahit.' },
          { title: 'Passer à l\'adresse quand la LECTURE suffisait', lang: 'c', bad:
'int calculer_total(Vendeuse *v) {     // appelée en lecture… mais\n    v->nb_sacs = 0;                    // une ligne de debug oubliée ?\n    return v->nb_sacs;                 // elle peut tout casser.\n}',
            good:
'int calculer_total(const Vendeuse *v) {\n    return v->nb_sacs;                 // toute écriture = erreur de COMPIL\n}',
            why: 'Le const qualifie le CONTRAT : cette fonction lit, point final. Le compilateur devient le vigile — une ligne d\'écriture accidentelle (debug oublié, fat-finger) devient une erreur à la compilation, pas un bug de prod nocturne. Le const en paramètre est le meilleur rapport signal/bruit du langage.' }
        ],
        related: ['c-pointeurs-fonctions', 'c-pointeurs-avances', 'c-structures']
      },

      {
        id: 'c-pointeurs-fonctions',
        title: 'Pointeurs de fonctions & callbacks (qsort)',
        icon: 'functions',
        level: 'Avancé',
        tagline: 'Mettre une fonction dans une variable : l\'ingrédient caché de qsort, des GUIs et des pilotes.',
        intro: 'Les fonctions aussi ont des adresses — le code est en mémoire, comme les données. Un **pointeur de fonction** le stocke, et permet de passer du COMPORTEMENT en paramètre : c\'est le callback, la lambda pauvre, l\'injection de dépendance du C. `qsort` de la bibliothèque standard en est la démonstration officielle.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Déclaration, affectation, appel', code:
'#include <stdio.h>\n\nint addition(int a, int b) { return a + b; }\nint soustraire(int a, int b) { return a - b; }\n\nint main(void) {\n    int (*operation)(int, int) = &addition;    // note les PARENTHÈSES\n\n    printf("%d\\n", operation(4, 3));           // 7\n    operation = &soustraire;\n    printf("%d\\n", (*operation)(4, 3));        // 1 — * explicite possible\n    return 0;\n}' },
          { t: 'p', h: 'La syntaxe fait peur : `int (*op)(int, int)` se décompose « pointeur (les parenthèses autour de `*op` sont OBLIGATOIRES) vers fonction prenant deux int et rendant int ». Sans parenthèses — `int *op(int, int)` — tu as déclaré une FONCTION RENDANT UN POINTEUR : l\'erreur classique en bas de page. Le remède civilisationnel : typedef.' },
          { t: 'code', lang: 'c', label: 'typedef : rendre la chose lisible', code:
'typedef int (*OperationFn)(int, int);\n\nint appliquer(OperationFn f, int x, int y) {\n    return f(x, y);\n}\n\nappliquer(&addition, 10, 5);     // 15 — le type a maintenant un NOM' },
          { t: 'h3', h: 'L\'exemple d\'école : qsort et son comparateur' },
          { t: 'code', lang: 'c', label: 'Trier des vendeuses par soldes', code:
'#include <stdlib.h>\n\nint comparer_soldes(const void *pa, const void *pb) {\n    double sa = ((const Vendeuse *)pa)->solde;\n    double sb = ((const Vendeuse *)pb)->solde;\n    return (sa > sb) - (sa < sb);    // -1, 0 ou 1 — sans débordement !\n}\n\nqsort(marche, n, sizeof(Vendeuse), &comparer_soldes);\n// qsort est générique : void* + taille d\'élément + TON comparateur —\n// l\'algorithme est fourni, la POLITIQUE (le tri) est injectée.' },
          { t: 'h3', h: 'Où ça se cache dans la vraie vie' },
          { t: 'ul', items: [
            '**qsort/bsearch** : le tri générique de la libc — le comparateur fait politique maison.',
            '**Signaux/événements** : `signal(SIGINT, gestionnaire)` — ta fonction appelée « plus tard ».',
            '**Tables de dispatch** : un tableau de pointeurs de fonctions indexé par une commande reçue (remplace le switch géant).',
            '**atexit** : enregistrer un nettoyage à faire au moment de exit.',
            'Philosophiquement : partout où la bibliothèque sait QUAND agir mais pas QUOI faire — la GUI appelle ton on_click, jamais l\'inverse.'
          ] },
          { t: 'callout', kind: 'info', h: 'Analogie JS utile : passer `comparer` à `array.sort(comparer)` est le même mécanisme — sauf qu\'en C la fonction n\'emporte PAS de contexte (pas de closure !). Besoin de données ? `void *` en paramètre (pattern « user data » : qsort_r, callbacks GUI).' }
        ],
        errors: [
          { title: 'Les parenthèses oubliées : déclarer une fonction au lieu d\'un pointeur', lang: 'c', bad:
'int *operation(int, int);\n// = déclare une FONCTION qui rend un int* : absolument pas un pointeur\n// vers fonction ! Le compilateur crie, l\'intention est morte.',
            good:
'int (*operation)(int, int) = &addition;\n// parenthèses autour de *operation : "operation est un POINTEUR vers\n// fonction(int,int)" — et typedef dès que ça dépasse une variable.',
            why: 'La syntaxe déclarative du C suit l\'usage : sans parenthèses, la priorité fait de int *f(int) une fonction (les () lient plus fort que *). Un seul caractère manquant transforme le type complet — la raison pour laquelle tout le monde typedef ces déclarations dans les projets sérieux.' },
          { title: 'Le comparateur qsort par soustraction', lang: 'c', bad:
'int cmp(const void *a, const void *b) {\n    return *(const int *)a - *(const int *)b;\n}\n// INT_MIN - x = dépassement SIGNÉ = comportement indéfini ;\n// sur doubles la troncature à int détruit l\'ordre.',
            good:
'int cmp(const void *a, const void *b) {\n    int x = *(const int *)a, y = *(const int *)b;\n    return (x > y) - (x < y);   // -1/0/1 mathématiquement propre\n}',
            why: 'La soustraction « astucieuse » contient un dépassement signé pour les valeurs extrêmes — comportement indéfini, tri corrompu, UB silencieux sur la plateforme du client. Le double test ne coûte rien, ne déborde jamais et exprime exactement le contrat de qsort.' }
        ],
        related: ['c-passage-params', 'c-structures', 'js-fonctions']
      }
    ]
  }
);

/* ======================================================
   9. GESTION DES FICHIERS (FILE I/O)
   ====================================================== */
DEVDOCS.c.categories.push(
  {
    id: 'fichiers',
    name: 'Fichiers (File I/O)',
    icon: 'folder_zip',
    fiches: [
      {
        id: 'c-fichiers',
        title: 'fopen, fprintf, fgets : les fichiers texte',
        icon: 'folder_zip',
        level: 'Intermédiaire',
        tagline: 'FILE* est le nouveau pointeur à apprivoiser — et fgets la réponse à presque toutes vos lectures.',
        intro: 'La bibliothèque standard gère les fichiers via un pointeur **`FILE *`** : `fopen` l\'obtient, `fclose` le rend, et entre les deux tu écris/lis **en mode bufferisé** (le système batch les accès disque pour toi — à l\'inverse des appels système bruts, fiche POSIX). Le mode d\'ouverture — le petit "r", "w", "a" — décide de tout le reste.',
        blocks: [
          { t: 'table', head: ['Mode', 'Sens', 'Piège'], rows: [
            ['"r"', 'lecture seule (fichier doit exister)', 'NULL si absent — TESTER'],
            ['"w"', 'écriture — CRÉE OU ÉCRASE le fichier', 'perd le contenu existant !'],
            ['"a"', 'écriture en FIN de fichier (append)', 'idéal journaux'],
            ['"r+" / "w+"', 'lecture + écriture', 'w+ écrase quand même'],
            ['"rb" / "wb"', 'binaire (obligatoire hors Unix)', 'oubli sous Windows = \\r\\n surprises']
          ] },
          { t: 'code', lang: 'c', label: 'Lire ligne à ligne — LE pattern robuste', code:
'#include <stdio.h>\n\nint main(void) {\n    FILE *f = fopen("vendeuses.txt", "r");\n    if (f == NULL) {\n        perror("vendeuses.txt");      // affiche la RAISON système exacte\n        return 1;\n    }\n\n    char ligne[256];\n    int n = 0;\n    while (fgets(ligne, sizeof ligne, f) != NULL) {\n        printf("%d : %s", ++n, ligne);    // fgets GARDE le \\n final\n    }\n\n    if (ferror(f)) fprintf(stderr, "erreur de lecture\\n");\n    fclose(f);                     // chaque fopen a son fclose\n    return 0;\n}' },
          { t: 'h3', h: 'Écrire proprement' },
          { t: 'code', lang: 'c', label: 'Le journal du marché', code:
'FILE *log = fopen("journal.txt", "a");    // append : on n\'écrase rien\nif (log == NULL) { perror("journal.txt"); return 1; }\n\nfprintf(log, "Vente: %s ×%d sacs, %.0f F\\n", "gari", 3, 2500.0);\n\nfclose(log);    // fclose FLUSH le tampon : sans lui, des lignes\n                // peuvent rester en RAM au crash — journal tronqué !' },
          { t: 'h3', h: 'fscanf : pourquoi tout le monde te le déconseille' },
          { t: 'p', h: '`fscanf(f, "%s", buf)` ne connaît pas la taille de buf : un mot trop long = buffer overflow (le gets() des fichiers). Et `%d` échoue sur entrée non numérique en laissant le curseur bloqué — boucle infinie classique. La méthode moderne : **`fgets` (borne comprise) + `sscanf`/`strtol` sur la ligne** — parsing contrôlé, taille contrôlée, erreurs détectables.' },
          { t: 'callout', kind: 'tip', h: '`perror("prefixe")` est l\'ami du débutant : il imprime ton message suivi de la description système d\'errno ("No such file or directory", "Permission denied"…). Un seul appel, un diagnostic complet — bien meilleur qu\'un fprintf générique.' }
        ],
        errors: [
          { title: 'Ne pas tester le retour de fopen', lang: 'c', bad:
'FILE *f = fopen("donnees.txt", "r");\nfgets(ligne, sizeof ligne, f);    // f == NULL → crash immédiat',
            good:
'FILE *f = fopen("donnees.txt", "r");\nif (f == NULL) {\n    perror("donnees.txt");\n    return EXIT_FAILURE;\n}\n// Tester TOUJOURS fopen : le fichier existera moins dans la vraie vie\n// que dans les tests.',
            why: 'fopen rend NULL sur échec sans lever d\'exception — le seul signal est la valeur de retour. Utiliser le FILE* NULL dans l\'appel suivant déréférence NULL + décalage : crash net, mais le message d\'erreur est perdu et on débarque dans un rapport de bug sans contexte.' },
          { title: 'fscanf("%s") pour lire un mot', lang: 'c', bad:
'char nom[32];\nfscanf(f, "%s", nom);    // combien d\'octets max ? PERSONNE ne le sait.\n// un fichier avec un "mot" de 500 octets → overflow pur.',
            good:
'char ligne[256];\nif (fgets(ligne, sizeof ligne, f) != NULL) {\n    char nom[32];\n    if (sscanf(ligne, "%31s", nom) == 1) { /* borne explicite 31+\\0 */ }\n}',
            why: 'fscanf("%s") n\'a aucune notion de la taille de destination — c\'est gets() ressuscité. La borne s\'écrit dans le format ("%31s", taille−1 pour le \\0), mais lire d\'abord une LIGNE bornée (fgets) puis parser la ligne est plus sûr, plus lisible, et évite les blocages de curseur de scanf.' }
        ],
        related: ['c-fichiers-binaires', 'c-assert-errno', 'nd-fs']
      },

      {
        id: 'c-fichiers-binaires',
        title: 'fread, fwrite & fseek : le binaire et l\'accès direct',
        icon: 'save',
        level: 'Avancé',
        tagline: 'Traiter un fichier comme un tableau d\'octets allongé — lire, sauter, recompter.',
        intro: 'Le mode texte manipule des lignes ; le mode **binaire** (`"rb"`, `"wb"`) manipule des **octets bruts** : images, archives, formats maison, registres d\'enregistrements. `fread`/`fwrite` transportent des blocs de N octets, et `fseek` déplace la tête de lecture où tu veux — le fichier devient un ruban adressable.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Écrire puis relire des enregistrements', code:
'#include <stdio.h>\ntypedef struct { int id; char nom[50]; int sacs; } EntreeStock;\n\n// Écriture\nFILE *f = fopen("stock.bin", "wb");\nif (f == NULL) { perror("stock.bin"); return 1; }\nEntreeStock e = { 1, "Awa Mensah", 42 };\nif (fwrite(&e, sizeof e, 1, f) != 1) perror("ecriture");\nfclose(f);\n\n// Relecture du 1er enregistrement\nf = fopen("stock.bin", "rb");\nEntreeStock lu;\nif (f != NULL && fread(&lu, sizeof lu, 1, f) == 1)\n    printf("%s : %d sacs\\n", lu.nom, lu.sacs);\nif (f != NULL) fclose(f);' },
          { t: 'h3', h: 'fseek : le ruban adressable' },
          { t: 'code', lang: 'c', label: 'Sauter, mesurer, revenir', code:
'fseek(f, 0, SEEK_END);\nlong taille = ftell(f);            // taille totale du fichier\nrewind(f);                         // = fseek(f, 0, SEEK_SET)\n\n// Lire le 5e enregistrement directement (accès DIRECT !)\nfseek(f, 4L * sizeof(EntreeStock), SEEK_SET);\nfread(&lu, sizeof lu, 1, f);\n\nlong icone = ftell(f);             // où en est rendu la tête ?' },
          { t: 'table', head: ['Ancre fseek', 'Sens'], rows: [
            ['SEEK_SET', 'début du fichier + offset'],
            ['SEEK_CUR', 'position actuelle + offset (peut être négatif)'],
            ['SEEK_END', 'fin + offset (négatif pour reculer)']
          ] },
          { t: 'h3', h: 'Le piège feof() — le plus grand classique' },
          { t: 'p', h: '`feof(f)` ne devient vrai qu\'**APRÈS une lecture qui a échoué** sur la fin — pas avant. La boucle `while (!feof(f)) { fread(...); traiter(...); }` traite donc le dernier bloc UNE FOIS DE TROP (lecture infructueuse, données périmées). Le pattern correct : boucler SUR le retour de fread/fgets — la condition de sortie et la réussite sont la même information : `while (fread(&e, sizeof e, 1, f) == 1) { … }`.' },
          { t: 'callout', kind: 'warn', h: 'Portabilité : une struct écrite brute avec fwrite n\'est relisible correctement que par un programme compilé pareil (même padding, même endianness, mêmes tailles — fiche packing). Un format échangé se spécifie octet par octet, types fixes <stdint.h>, jamais "dump de struct".' }
        ],
        errors: [
          { title: 'Boucler sur feof() en tête', lang: 'c', bad:
'while (!feof(f)) {\n    fread(&e, sizeof e, 1, f);\n    traiter(&e);        // dernière itération : feof devient vrai\n                        // APRÈS ce fread → traiter relit du déjà-vu !\n}',
            good:
'while (fread(&e, sizeof e, 1, f) == 1) {\n    traiter(&e);        // on traite exactement ce qui a été LU\n}',
            why: 'feof() répond à la question « la DERNIÈRE lecture a-t-elle échoué sur la fin ? » — pas « le fichier est-il fini ? ». La dernière itération lit donc zéro octet, laisse les données du tour précédent intactes et les retraite : un doublon silencieux en fin de lot. Tester le RETOUR de lecture, toujours.' },
          { title: 'Ignorer les lectures courtes de fread', lang: 'c', bad:
'fread(buf, 1, 4096, f);\nutiliser_tout(buf);    // 4096 DEMANDÉS ≠ 4096 REÇUS :\n// fichier court, erreur disque → buf à moitié poubelle.',
            good:
'size_t n = fread(buf, 1, sizeof buf, f);\nif (ferror(f)) { perror("lecture"); }\nutiliser(buf, n);      // on utilise EXACTEMENT ce qui est arrivé',
            why: 'fread est contractuel : elle rend le NOMBRE d\'éléments effectivement lus — traiter 4096 octets après n\'en avoir reçu que 1 200, c\'est traiter 2 896 octets de vieille RAM (fuite d\'information incluse). La valeur de retour n\'est pas un détail : c\'est le résultat.' }
        ],
        related: ['c-fichiers', 'c-packing', 'nd-streams-buffers']
      }
    ]
  },

  /* ======================================================
     10. DIRECTIVES DU PRÉPROCESSEUR
     ====================================================== */
  {
    id: 'preprocesseur',
    name: 'Préprocesseur',
    icon: 'transform',
    fiches: [
      {
        id: 'c-define-macros',
        title: '#define : constantes, macros et leurs guet-apens',
        icon: 'construction',
        level: 'Intermédiaire',
        tagline: 'Du texte remplacé par du texte — sans types, sans portée, sans pitié pour les parenthèses oubliées.',
        intro: '`#define` ordonne au préprocesseur une **substitution textuelle pure** : chaque occurrence du nom est remplacée par son corps AVANT la compilation. Pas de type, pas de vérification — d\'où une puissance (macros fonctionnelles) et trois pièges légendaires que chaque développeur C rencontre une fois, généralement en prod.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Constantes et macros fonctionnelles', code:
'#define NB_JOURS 7\n#define TVA 0.18\n\n#define CARRE(x) ((x) * (x))          // note les parenthèses PARTOUT\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint ventes[NB_JOURS];\ndouble ttc = 1200 * (1 + TVA);\nint s = CARRE(5);                     // ((5) * (5)) → 25' },
          { t: 'h3', h: 'Piège 1 : les parenthèses qui coûtent un vendredi' },
          { t: 'code', lang: 'c', label: 'Sans parenthèses, l\'expansion devient incorrecte', code:
'#define CARRE_MAL(x) x * x\n\nCARRE_MAL(1 + 2);\n// expansion TEXTUELLE → 1 + 2 * 1 + 2 = 5  (on attendait 9 !)\n\nCARRE(1 + 2);\n// → ((1 + 2) * (1 + 2)) = 9 ✓   // chaque paramètre ET le résultat entre ()' },
          { t: 'h3', h: 'Piège 2 : les effets de bord dupliqués' },
          { t: 'code', lang: 'c', label: 'L\'argument évalué deux fois', code:
'int x = 3;\nint m = MAX(x++, 10);\n// expansion : ((x++) > (10) ? (x++) : (10))\n// → x++ exécuté DEUX FOIS si la branche gauche gagne : x = 5 !\n// Règle : JAMAIS d\'effet de bord dans un argument de macro.' },
          { t: 'h3', h: 'Piège 3 : plusieurs instructions — l\'idiome do/while(0)' },
          { t: 'code', lang: 'c', label: 'Une macro qui se comporte comme UN appel', code:
'#define LOG_VENTE(prod, q) do { \\\n    fprintf(stderr, "[vente] %s x%d\\n", (prod), (q)); \\\n    compteur_ventes++; \\\n} while (0)\n\nif (cond) LOG_VENTE("gari", 3); else rien();\n// sans le do { } while (0) : le ; final brise l\'if/else !\n// le backslash \\ en fin de ligne = la definition continue.' },
          { t: 'h3', h: 'Macro ou inline / const ?' },
          { t: 'table', head: ['Besoin', 'Choisir'], rows: [
            ['constante numérique simple', 'const int NB_JOURS = 7; (TYPÉ) ou enum'],
            ['petite fonction logique', 'static inline (typée, évaluée une fois!)'],
            ['code générique multi-types', 'macro (le préprocesseur ne connaît pas les types)'],
            ['constitution conditionnelle de code', '#if/#ifdef — fiche suivante']
          ] },
          { t: 'callout', kind: 'tip', h: 'Les macros modernes survivent pour : logging avec __FILE__/__LINE__, assertions maison, X-macros (générer enum + strings d\'un coup), configuration de plateforme. Partout ailleurs, inline/const/fonction gagne.' }
        ],
        errors: [
          { title: 'Argument de macro sans parenthèses de protection', lang: 'c', bad:
'#define DOUBLE(x) 2 * x\nint r = DOUBLE(3 + 4);     // 2 * 3 + 4 = 10 (on attendait 14)',
            good:
'#define DOUBLE(x) (2 * (x))\n// En règle absolue : parenthèses autour de chaque UTILISATION de\n// paramètre, et autour de l\'expression ENTIÈRE.',
            why: 'La macro expanse du texte tel quel dans l\'expression de TON contexte — ses opérateurs se retrouvent en concurrence avec les tiens selon les priorités. Les parenthèses ne coûtent rien à l\'exécution (ce n\'est pas un appel) et immunisent contre tout contexte d\'usage.' },
          { title: 'Évaluer l\'argument avec effet de bord', lang: 'c', bad:
'int lu = MIN(getchar(), 60);\n// ((getchar()) < (60) ? (getchar()) : (60))\n// → deux getchar() potentiels : un caractère d\'entrée DISPARAÎT.',
            good:
'int c = getchar();\nint lu = MIN(c, 60);\n// règle incorruptible : tout argument de macro doit être un\n// simple identifiant ou littéral.',
            why: 'Le problème est invisible dans le code qui appelle — il faut connaître la définition de la macro pour savoir si x++ se produit deux fois. C\'s exactement pourquoi static inline a gagné : les arguments de fonctions, inline ou non, sont évalués UNE fois.' }
        ],
        related: ['c-compilation-conditionnelle', 'c-entetes', 'c-compilation']
      },

      {
        id: 'c-compilation-conditionnelle',
        title: '#ifdef, #ifndef : la compilation conditionnelle & les gardes',
        icon: 'alt_route',
        level: 'Intermédiaire',
        tagline: 'Écrire du code qui existe ou n\'existe pas selon l\'humeur du préprocesseur.',
        intro: 'La compilation conditionnelle fait disparaître du code AVANT que le compilateur ne le voie : `#ifdef DEBUG` pour le débogage, `#ifdef _WIN32` pour la portabilité, et — universelle — la **garde d\'inclusion** qui protège chaque header. C\'est du méta-code : le préprocesseur choisit ce que le compilateur a le droit de lire.',
        blocks: [
          { t: 'code', lang: 'c', label: 'La garde d\'inclusion, en entier, encore', code:
'// vendeuse.h\n#ifndef VENDEUSE_H       // "si ce symbole n\'est pas encore défini…"\n#define VENDEUSE_H       // "…définis-le tout de suite…"\n\ntypedef struct { char nom[50]; double solde; } Vendeuse;\ndouble ca_total(const Vendeuse *v, int n);\n\n#endif                   // "…et saute tout ça s\'il l\'était déjà."\n// Deuxième inclusion du même fichier → le corps est vide : OK.' },
          { t: 'code', lang: 'c', label: 'Debug compilé sélectivement', code:
'#ifdef DEBUG\n  #define DBG(...) fprintf(stderr, "[dbg] " __VA_ARGS__)\n#else\n  #define DBG(...) do { } while (0)   // disparait en prod : zéro coût\n#endif\n\nint main(void) {\n    DBG("ouverture du stock\\n");\n    /* … */\n    return 0;\n}\n\n// compilation : gcc main.c            → DBG invisible, coût zéro\n//               gcc -DDEBUG main.c    → DBG actif' },
          { t: 'h3', h: 'Le jeu des directives' },
          { t: 'table', head: ['Directive', 'Sens'], rows: [
            ['#ifdef SYM', 'si le symbole est défini'],
            ['#ifndef SYM', 's\'il ne l\'est pas'],
            ['#if EXPR', 'condition constante (defined, ==, <…)'],
            ['#elif / #else / #endif', 'branches de la condition'],
            ['#undef SYM', 'oublier une définition'],
            ['#error "msg"', 'compilation refuse net (ex : plateforme inconnue)']
          ] },
          { t: 'code', lang: 'c', label: 'Portabilité plateforme', code:
'#if defined(_WIN32)\n  #include <windows.h>\n  #define DORMIR(ms) Sleep(ms)\n#elif defined(__unix__) || defined(__APPLE__)\n  #include <unistd.h>\n  #define DORMIR(ms) usleep((ms) * 1000)\n#else\n  #error "Plateforme non gérée — Makefile à adapter"\n#endif' },
          { t: 'h3', h: '#pragma once : la garde moderne' },
          { t: 'p', h: '`#pragma once` en tête de header fait le même boulot que la trinité #ifndef/#define/#endif, en une ligne — supporté par GCC, Clang, MSVC. Standard ? Non. Universel ? Pratiquement. La garde classique reste l\'écriture portable garantie, mais la pragma est la préférence typique des nouveaux projets.' },
          { t: 'callout', kind: 'warn', h: 'Les DEBUG/TRACE en #ifdef sont de vieux amis… mais un mode DEBUG qui DIFFÈRE trop du build de prod finit par cacher les bugs qu\'on cherchait : assert() désactivé, chemins différents. Fiche assert : le cas d\'école.' }
        ],
        errors: [
          { title: 'Header sans garde inclus deux fois indirectement', lang: 'c', bad:
'// types.h définit struct Vendeuse, inclus par a.h ET b.h\n#include "a.h"\n#include "b.h"\n// → struct Vendeuse redéfinie : "redefinition of struct Vendeuse"',
            good:
'// types.h\n#ifndef TYPES_H\n#define TYPES_H\nstruct Vendeuse { /* … */ };\n#endif\n// ou #pragma once en première ligne : une seule passe, toujours.',
            why: 'Les graphes d\'inclusion indirects explosent vite (A inclut B et C, B et C incluent D…) : la garde n\'est pas une précaution théorique, elle est le plan de coupe anti-explosion de chaque header — à écrire AVANT la première ligne utile, par réflexe.' },
          { title: 'Nombreuses petites conditions éparpillées', lang: 'c', bad:
'#ifdef LINUX\n  charger();\n\n#endif\n#ifdef LINUX\n  afficher();\n#endif      /* …répété 40 fois dans le fichier… */',
            good:
'// regrouper par ABSTRACTION plateforme :\n// systeme_unix.c + systeme_win32.c compilés sélectivement,\n// et le code commun appelle une interface UNIQUE.',
            why: 'Chaque #ifdef fragmente la lecture (deux programmes vivent dans un fichier) et multiplie les combinaisons jamais testées. Les compilations conditionnelles effectives se comptent idéalement sur les doigts d\'une main, au niveau des FICHIERS (Makefile choisit), pas au niveau des lignes.' }
        ],
        related: ['c-define-macros', 'c-entetes', 'c-compilation']
      }
    ]
  },

  /* ======================================================
     11. DEBUGGING & GESTION D\'ERREURS
     ====================================================== */
  {
    id: 'debugging',
    name: 'Debugging & erreurs',
    icon: 'bug_report',
    fiches: [
      {
        id: 'c-valgrind',
        title: 'Valgrind : la radiographie mémoire',
        icon: 'bug_report',
        level: 'Avancé',
        tagline: 'Il ralentit 20 fois, et te rend 20 heures : chaque octet alloué ou touché est suivi à la trace.',
        intro: '**Valgrind** exécute ton programme dans un CPU virtuel instrumenté : chaque allocation, lecture et écriture mémoire est VÉRIFIÉE. Fuites, use-after-free, débordements de tas/tampon : il voit tout, avec la ligne du crime. C\'s lent — et c\'s exactement pour ça qu\'on le réserve aux runs de vérification.',
        blocks: [
          { t: 'code', lang: 'bash', label: 'Le run de base (compiler avec -g !)', code:
'gcc -std=c11 -Wall -g main.c -o main     # -g : les lignes dans le rapport\nvalgrind --leak-check=full --track-origins=yes ./main\n\n# --leak-check=full   : l\'inventaire des fuites à la sortie\n# --track-origins=yes : d\'OÙ vient chaque valeur non initialisée' },
          { t: 'code', lang: 'text', label: 'Rapport de fuite typique, commenté', code:
'==2401== 8 bytes in 2 blocks are definitely lost in loss record 1 of 1\n==2401==    at 0x4A2C: malloc (vg_replace_malloc.c:…)\n==2401==    by 0x400592: creer_vendeuse (vendeuse.c:17)\n==2401==    by 0x400611: main (main.c:23)\n\nLecture : ① QUOI   (8 octets perdus DÉFINITIVEMENT)\n          ② OÙ alloués (vendeuse.c:17, appelé depuis main.c:23)\n          → le fix : ajouter free() dans la fonction de destruction\n             DÉDIÉE (detruire_vendeuse), appelée à main.c:30' },
          { t: 'h3', h: 'Le vocabulaire des fuites — ordre de gravité' },
          { t: 'table', head: ['Catégorie', 'Sens', 'Action'], rows: [
            ['definitely lost', 'bloc plus référencé du tout', 'FUITES : le free manque, à corriger'],
            ['indirectly lost', 'perdu par un parent perdu', 'corrige le parent, elles s\'effondrent'],
            ['possibly lost', 'référence ambiguë (pointeur dans le bloc)', 'inspecter — souvent vraie fuite'],
            ['still reachable', 'pointeur global encore vivant à la sortie', 'souvent bénin (cache, config)']
          ] },
          { t: 'p', h: 'Au-delà des fuites : `Invalid read/write of size 4` — lecture ou écriture hors bloc (la localisation de l\'allocation est AUSSI donnée) ; `Conditional jump depends on uninitialised value` — variable non initialisée pilotant un if : c\'s le fumier à bugs aléatoires que Valgrind rend visible.' },
          { t: 'callout', kind: 'tip', h: 'Alternative moderne : `-fsanitize=address` (fiche GCC) intègre la détection AU PROGRAMME — 2× plus lent au lieu de 20×, rapport équivalent. Stratégie d\'équipe courante : ASan dans la CI rapide, Valgrind en vérification nocturne profonde.' },
          { t: 'p', h: 'À l\'usage, "still reachable" des bibliothèques tierces (initialisations internes jamais libérées) se masque par une suppression-file, sinon le bruit noie tes vraies fuites. Et vise TOUJOURS : `All heap blocks were freed — no leaks are possible` à la sortie.' }
        ],
        errors: [
          { title: 'Lire le rapport en commençant par la fin', lang: 'text', bad:
'# "LEAK SUMMARY: 1 200 bytes in 45 blocks" → panique vague.\n# On cible les lignes au hasard, on free partout… et on casse tout.',
            good:
'# Lire les RECORDS un par un, du premier au dernier :\n# chaque fuite a une stack complète (où allouée, par quel chemin).\n# Corriger D\'ABORD les "definitely lost" du plus grand nombre d\'octets —\n# elles éliminent souvent les "indirectly" par cascade.',
            why: 'Le rapport est organisé en enregistrements autonomes avec pile d\'allocation : il se dépense comme une liste de courses, pas comme un roman d\'angoisse. Les pourcentages réparateurs viennent des fuites DÉFINITIVES et grosses — les autres tombent souvent dans leur sillage.' }
        ],
        related: ['c-erreurs-memoire', 'c-gdb', 'c-gcc-flags']
      },

      {
        id: 'c-gdb',
        title: 'GDB : attraper un segfault en flagrant délit',
        icon: 'pest_control',
        level: 'Avancé',
        tagline: 'Arrête de deviner avec des printf : laisse le programme te montrer la ligne où il meurt.',
        intro: '**GDB** est le débogueur du C : exécution pas à pas, points d\'arrêt, inspection des variables, et — sa première mission — le **backtrace** après crash : la pile d\'appels exacte au moment du segfault, ligne et fonction. Compiler avec `-g`, apprendre six commandes, et le segfault cesse d\'être un mystère pour devenir un itinéraire.',
        blocks: [
          { t: 'code', lang: 'bash', label: 'Scène de crime en 30 secondes', code:
'gcc -std=c11 -g -O0 main.c -o main     # -g (infos) + -O0 (fidélité)\ngdb ./main\n\n(gdb) run\n# Program received signal SIGSEGV, Segmentation fault.\n# 0x00005555555551a4 in traiter (v=0x0) at stock.c:42\n# 42        total += v->sacs;\n\n(gdb) bt        # backtrace : la pile d\'appels au crash\n# #0  traiter (v=0x0) at stock.c:42\n# #1  0x… in boucler (n=3) at main.c:18\n# #2  0x… in main () at main.c:25\n\n# v=0x0 : la fonction a reçu NULL sans le tester — coupable identifié' },
          { t: 'h3', h: 'Le kit de survie en huit commandes' },
          { t: 'table', head: ['Commande', 'Rôle'], rows: [
            ['run (r)', 'lance le programme'],
            ['bt', 'backtrace : pile au crash'],
            ['break main / break 42 (b)', 'pose un point d\'arrêt'],
            ['next (n)', 'ligne suivante sans entrer dans l\'appel'],
            ['step (s)', 'ligne suivante EN ENTRANT dans l\'appel'],
            ['print var (p)', 'affiche une variable/expression (p *v, p tab[3])'],
            ['watch var', 'pose un point d\'arrêt QUAND la variable change'],
            ['continue (c)', 'reprend jusqu\'au prochain arrêt']
          ] },
          { t: 'code', lang: 'bash', label: 'watch : l\'arme des corruptions silencieuses', code:
'(gdb) break main\n(gdb) run\n(gdb) watch stock_sacs       # "préviens-moi dès que stock_sacs change"\n(gdb) continue\n# Hardware watchpoint 2: stock_sacs\n# Old value = 42\n# New value = 0\n# saboter_stock () at intrus.c:77        ← l\'écriture fantôme, prise en flag' },
          { t: 'h3', h: 'Les core dumps : déboguer APRÈS la mort' },
          { t: 'p', h: 'Sur serveur, active les coredumps (`ulimit -c unlimited`) : à chaque crash, le système écrit l\'image mémoire dans un fichier `core`. `gdb ./mon_service core` te téléporte alors DANS l\'instant du crash — backtrace, variables, tout — sans avoir à reproduire l\'incident. Indispensable pour les crashes qui "n\'arrivent qu\'en prod".' },
          { t: 'callout', kind: 'warn', h: 'Binaire compilé -O2/-O3 ? GDB ment honnêtement : variables "optimized out", lignes dans le désordre (les instructions ont été réorganisées). Débogue un build -g -O0 (ou -Og) — et garde le prod-build pour la prod.' }
        ],
        errors: [
          { title: 'Déboguer sans -g (ou en -O3)', lang: 'bash', bad:
'gcc -O3 main.c -o main && gdb ./main\n(gdb) run\n# crash, mais : pas de lignes, pas de noms de variables,\n# que des adresses mémoire et de l\'assembleur.',
            good:
'gcc -g -O0 main.c -o main && gdb ./main\n# et pour l\'ennuyeux bug qui n\'existe QU\'optimisé : -Og (ou -g avec\n# -O2) — optimisation "compatible débogage" limitant la réorganisation.',
            why: 'Les infos de débogage (-g) relient chaque instruction à sa ligne source et rendent les variables nommées ; l\'optimiseur (-O2/3) casse cette carte en inlinant et en réordonnant. Déboguer du -O3, c\'est relire une trace après passage du broyeur : tous les indices existent, aucun n\'est à sa place.' },
          { title: 'Chercher un segfault avec 200 printf', lang: 'c', bad:
'printf("avant trim\\n"); printf("après trim\\n"); /* 3 heures plus tard… */',
            good:
'gdb ./main\n(gdb) run → bt → print v → la ligne et la cause, en 30 secondes.',
            why: 'Le printf-debug montre le passage, pas la scène du crime exacte ; il faut le deviner. Le backtrace donne ligne + pile + valeurs instantanément — chaque segfault est littéralement localisé au moment où il se produit. GDB est une compétence ponctuelle à acquérir qui rembourse toute une carrière de sessions printf.' }
        ],
        related: ['c-valgrind', 'c-gcc-flags', 'c-pointeurs-defense']
      },

      {
        id: 'c-assert-errno',
        title: 'assert() & errno : deux outils, deux époques, deux pièges',
        icon: 'verified',
        level: 'Intermédiaire',
        tagline: 'L\'un vérifie ta logique en dev, l\'autre explique les échecs système — et chacun a SON piège d\'école.',
        intro: '`assert(condition)` (de `<assert.h>`) est un garde-fou de développement : si la condition est fausse, le programme S\'ARRÊTE avec le fichier, la ligne et l\'expression — un invariant brisé ne passe jamais inaperçu. **`errno`**, elle, est la variable globale (enfin, presque) où les fonctions système déposent la RAISON d\'un échec : 0 = tout roule, sinon un code à décoder avec perror/strerror.',
        blocks: [
          { t: 'code', lang: 'c', label: 'assert : l\'invariant affiché', code:
'#include <assert.h>\n\ndouble moyenne(const int *t, int n) {\n    assert(t != NULL);      // contrat d\'entrée : jamais NULL\n    assert(n > 0);          // moyenne de zéro éléments = non-sens\n    long somme = 0;\n    for (int i = 0; i < n; i++) somme += t[i];\n    return (double)somme / n;\n}\n\n// En build release (-DNDEBUG), assert() s\'évapore À ZÉRO instruction :\n// gcc -DNDEBUG … → garde seulement en DEV, jamais en prod.' },
          { t: 'p', h: 'Règle d\'or assert : vérifier des invariants de PROGRAMMATION (les bugs de TON code), JAMAIS les conditions du MONDE (fichier manquant, réseau, mémoire pleine — celles-ci peuvent arriver en prod et méritent une vraie gestion d\'erreur). Et **aucun effet de bord dedans** — voir l\'erreur mythique plus bas.' },
          { t: 'code', lang: 'c', label: 'errno : la raison d\'échec détaillée', code:
'#include <errno.h>\n#include <string.h>\n\nerrno = 0;                          // RAZ AVANT l\'appel (obligatoire)\nFILE *f = fopen("config.json", "r");\nif (f == NULL) {\n    int e = errno;                  // SAUVER tout de suite : volatile\n    fprintf(stderr, "config: %s\\n", strerror(e));\n    // perror("config");            // fait la même chose en une ligne\n    return 1;\n}' },
          { t: 'h3', h: 'errno mode d\'emploi' },
          { t: 'ul', items: [
            'Beaucoup de fonctions rendent une valeur d\'échec (NULL, −1) et REMPLISSENT errno : la valeur de retour dit "raté", errno dit "pourquoi".',
            '`errno = 0` AVANT l\'appel : certaines fonctions ne la touchent qu\'en cas d\'échec, un reste d\'erreur vieillotte peut mentir.',
            'Sauvegarder errno IMMÉDIATEMENT dans une variable : tout appel ultérieur (même fprintf) peut l\'écraser.',
            'En réalité, errno est thread-local depuis toujours — chaque thread a la sienne (pas de course entre eux).',
            'perror(s) = printf de s + ": " + strerror(errno) — l\'outil du quotidien.'
          ] },
          { t: 'callout', kind: 'tip', h: 'Convention Express/Node en parallèle : strcmp/fopen = retour d\'échec + errno ; try/catch de langages modernes = mécanique similaire en “canal dédié”. Le pattern (valeur d\'échec + code d\'erreur explicite) est universel en systèmes — fiche Node erreurs pour la version async.' }
        ],
        errors: [
          { title: 'Effet de bord dans un assert', lang: 'c', bad:
'assert((f = fopen("data.txt", "r")) != NULL);\n/* …utilisation de f… */\n// En release (-DNDEBUG) : assert disparaît ENTIÈREMENT,\n// fopen n\'est JAMAIS appelé, f reste indéfini → crash prod.',
            good:
'f = fopen("data.txt", "r");\nassert(f != NULL);              // l\'appel existe TOUJOURS, la garde en dev\nif (f == NULL) { perror("data.txt"); return 1; }   // et la gestion prod',
            why: 'L\'assertion est EFFACÉE par -DNDEBUG : tout code utile logé dedans disparaît du binaire de prod — le bug "qui marche en debug, plante en release" le plus pervers qui soit. Le code indispensable se met HORS assert ; l\'assert ne fait QUE vérifier, jamais faire.' },
          { title: 'Lire errno après d\'autres appels', lang: 'c', bad:
'FILE *f = fopen("x", "r");\nif (f == NULL) {\n    journaliser("échec d\'ouverture");   // fprintf → écrit errno !\n    printf("raison : %s\\n", strerror(errno));   // errno pollué = mensonge',
            good:
'FILE *f = fopen("x", "r");\nif (f == NULL) {\n    int e = errno;                       // SAUVER D\'ABORD\n    journaliser("ouverture impossible");\n    printf("raison : %s\\n", strerror(e));',
            why: 'errno est une variable globale écrite par PRESQUE toutes les fonctions système/libc — journaliser == appeler fprintf == réécrire errno. Sauvegarder immédiatement dans `int e = errno;` transforme une donnée volatile en donnée sûre.' }
        ],
        related: ['c-fichiers', 'c-gdb', 'nd-gestion-erreurs']
      }
    ]
  },

  /* ======================================================
     12. NOTIONS SYSTÈME / POSIX
     ====================================================== */
  {
    id: 'systeme',
    name: 'Système & POSIX',
    icon: 'terminal',
    fiches: [
      {
        id: 'c-argc-argv',
        title: 'argc & argv : parler à la ligne de commande',
        icon: 'terminal',
        level: 'Débutant',
        tagline: './inventaire gari 12 — trois valeurs qui deviennent deux arguments et un programme utile.',
        intro: 'Quand le système lance ton programme, il découpe la ligne de commande en morceaux : **`argc`** dit combien, **`argv`** est le tableau de chaînes. `argv[0]` est toujours le nom du programme — les vrais arguments commencent à 1. Maîtriser les deux, c\'est passer du programme jouet au véritable outil en ligne de commande.',
        blocks: [
          { t: 'code', lang: 'c', label: 'Anatomie complète', code:
'int main(int argc, char *argv[]) {\n    printf("programme : %s\\n", argv[0]);\n    printf("arguments : %d\\n", argc - 1);\n    for (int i = 1; i < argc; i++)\n        printf("  argv[%d] = %s\\n", i, argv[i]);\n    return 0;\n}\n\n// ./inventaire gari 12\n// programme : ./inventaire\n// arguments : 2\n//   argv[1] = gari\n//   argv[2] = 12' },
          { t: 'h3', h: 'La conversion : atoi est un mensonge poli' },
          { t: 'code', lang: 'c', label: 'strtol : la conversion qui avoue ses échecs', code:
'#include <stdlib.h>\n#include <errno.h>\n\nif (argc < 3) {\n    fprintf(stderr, "usage: %s <produit> <sacs>\\n", argv[0]);\n    return 1;\n}\n\nerrno = 0;\nchar *fin;\nlong sacs = strtol(argv[2], &fin, 10);\nif (errno != 0 || fin == argv[2] || *fin != \'\\0\') {\n    fprintf(stderr, "\'%s\' n\'est pas un nombre valide\\n", argv[2]);\n    return 2;                       // code DISTINCT par cause (fiche main)\n}\n// atoi(argv[2]) : "12abc" → 12, "abc" → 0 — silencieusement faux' },
          { t: 'h3', h: 'Le réflexe usage()' },
          { t: 'ul', items: [
            'TOUJOURS vérifier argc avant de toucher argv[i] — argv[i] n\'existe pas si l\'utilisateur n\'a rien tapé : segfault à la première utilisation réelle.',
            'Un message `usage: prog <arg1> <arg2>` sur stderr, code de sortie 2 — la convention que lisent scripts et shell.',
            'Options -drapeaux ? En petit : boucle simple sur argv ; en sérieux : `getopt()` (POSIX), qui gère -abc, -f valeur et l\'ordre.',
            'Tout argv[i] est une CHAÎNE : conversions explicites (strtol/strtod), jamais de comparaison avec == (strcmp, fiche string.h).'
          ] },
          { t: 'callout', kind: 'tip', h: 'argv[argc] vaut NULL par standard : le tableau est “sentinellé”. Peu utilisé en parcours (argc suffit), mais c\'s la forme exacte attendue par execv/execvp quand tu lanceras d\'autres programmes.' }
        ],
        errors: [
          { title: 'Lire argv[1] avant de vérifier argc', lang: 'c', bad:
'const char *produit = argv[1];    // ./prog sans argument :\n// argv[1] == NULL → la prochaine utilisation est un NULL deref classique',
            good:
'if (argc < 2) {\n    fprintf(stderr, "usage: %s <produit>\\n", argv[0]);\n    return 2;\n}\nconst char *produit = argv[1];',
            why: 'Le tableau argv ne contient que argc éléments utiles (plus le NULL final) : parler d\'argv[1] avec argc==1 revient à pointer sur le NULL terminal — déréférencé par la première fonction de chaîne venue. Le test argc est la porte, non une formalité.' },
          { title: 'atoi sur une saisie hostile', lang: 'c', bad:
'int sacs = atoi(argv[2]);\n// "./inventaire gari abc" → sacs = 0 : la commande "gratuit"\n// passe au stockage sans alerte. "./inventaire gari douze" pareil.',
            good:
'errno = 0; char *fin;\nlong sacs = strtol(argv[2], &fin, 10);\nif (errno || fin == argv[2] || *fin != \'\\0\') {\n    fprintf(stderr, "nombre attendu, reçu \'%s\'\\n", argv[2]);\n    return 2;\n}',
            why: 'atoi ne distingue pas "0" saisi de "n\'importe quoi" reçu, et ignore silencieusement les caractères en trop : toute entrée invalide devient une valeur CRÉDIBLE mais fausse. strtol avec endptr détecte l\'absence de chiffres, les restes collés ("12abc"), et errno signale le débordement — la conversion digne de confiance.' }
        ],
        related: ['c-string-h', 'c-structure-main', 'nd-npx-scripts']
      },

      {
        id: 'c-appels-systeme',
        title: 'Appels système POSIX : sous la bibliothèque, le noyau',
        icon: 'api',
        level: 'Avancé',
        tagline: 'printf n\'est pas le bout du fil : le vrai saut de frontière, c\'est write(2) — et il a un prix.',
        intro: 'stdio (printf, fopen) vit dans TON processus, avec son tampon privé. Les **appels système** (open, read, write, close — POSIX) sont la frontière vers le **noyau** : tu franchis le mur userland → kernel à chaque appel, transition mesurée en microsecondes. Comprendre la différence, c\'est comprendre pourquoi les I/O se bufferisent — et quand descendre de niveau.',
        blocks: [
          { t: 'code', lang: 'c', label: 'La copie de fichier en POSIX pur', code:
'#include <fcntl.h>\n#include <unistd.h>\n\nint main(void) {\n    int src = open("photo.jpg", O_RDONLY);\n    if (src < 0) { perror("open src"); return 1; }\n    int dst = open("copie.jpg", O_WRONLY | O_CREAT | O_TRUNC, 0644);\n    if (dst < 0) { perror("open dst"); return 1; }\n\n    char buf[8192];\n    ssize_t n;\n    while ((n = read(src, buf, sizeof buf)) > 0)\n        write(dst, buf, n);            // NB : write peut écrire MOINS (vérifier)\n\n    close(src);\n    close(dst);\n    return 0;\n}' },
          { t: 'h3', h: 'Les descripteurs de fichiers qui existent déjà' },
          { t: 'table', head: ['fd', 'Nom', 'Équivalent stdio'], rows: [
            ['0', 'entrée standard (stdin)', 'stdin'],
            ['1', 'sortie standard (stdout)', 'stdout'],
            ['2', 'erreur standard (stderr)', 'stderr']
          ] },
          { t: 'code', lang: 'c', label: 'write(2) pur vs fprintf tamponné', code:
'write(1, "direct au noyau\\n", 17);          // syscall immédiat\nprintf("moi, je dors dans un tampon utilisateur ");\n// … et ne pars vers le noyau qu\'au \\n, au plein, à fflush ou à exit' },
          { t: 'h3', h: 'Pourquoi stdio gagne quasiment toujours' },
          { t: 'ul', items: [
            'Un syscall coûte ~1µs juste en passage de frontière : écrire caractère par caractère en write = des MILLIERS de frontières ; stdio les regroupe en UNE.',
            'Le désordre redouté : mélanger printf (tampon) et write (direct) sur le même flux — les sorties arrivent DANS LE DÉSORDRE à l\'écran (le tampon part plus tard que le syscall !).',
            'Descendre de niveau quand : contrôle fin (O_DIRECT, non-bloquant), descripteurs particuliers (sockets, pipes), pas de libc sous la main (systèmes très nus).',
            'Observer : `strace -c ./prog` compte tes syscalls — le réflexe perf qui ne coûte rien.'
          ] },
          { t: 'callout', kind: 'info', h: 'Tout ce que tu connais en Node repose sur ça : libuv orchestre les syscalls non-bloquants des fichiers/sockets pour donner cet miracle « un thread, mille connexions » (voir le module Node). Le C, lui, te les donne nus.' }
        ],
        errors: [
          { title: 'Mélanger stdio et write(2) sur stdout', lang: 'c', bad:
'printf("debut ");\nwrite(1, "MILIEU\\n", 7);\nprintf("fin\\n");\n// À l\'écran : MILIEU\\ndebut fin\\n\n// write est passé DIRECT, printf attendait dans son tampon.',
            good:
'// Une voie par flux : stdio partout (et fflush(stdout) avant un write\n// critique), ou POSIX partout. fflush est le pont officiel entre les deux.',
            why: 'Deux chemins, deux horloges : le tampon stdio vit dans le processus, le write va directement au noyau — le premier saturé l\'emporte sur l\'ordre visuel. Tout mélange non fflushé produit des rapports/logs entremêlés, vainement recherchés à la lecture du code.' },
          { title: 'Compter que write/read « écrivent tout, d\'un coup »', lang: 'c', bad:
'char buf[8192];\nread(fd, buf, 8192);\nwrite(out, buf, 8192);\n// read a pu rendre 1200, write 800 — tu perds 7392 octets en silence.',
            good:
'ssize_t n = read(fd, buf, sizeof buf);\nif (n < 0) { perror("read"); }\nssize_t ecrit = 0;\nwhile (ecrit < n) {\n    ssize_t w = write(out, buf + ecrit, n - ecrit);\n    if (w < 0) { perror("write"); break; }\n    ecrit += w;\n}',
            why: 'read et write ont une politique de PROGRÈS PARTIEL contractuelle : fichiers réseau lents, signaux, pipes — tout interrompt avant la quantité demandée. La valeur de retour n\'est pas un détail de pédant : c\'s exactement ce qui a été accompli. La boucle de complétion est l\'idiome, pas l\'obsession.' }
        ],
        related: ['c-fichiers-binaires', 'c-assert-errno', 'nd-fs']
      }
    ]
  }
);
