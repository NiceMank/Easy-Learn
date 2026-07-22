/* ============================================================
   data-java.js — Contenu pédagogique Java (17/21/25)
   Couvre : JVM & bytecode, POO, interfaces modernes, types &
   conversion, collections, exceptions, généricité, lambdas &
   streams, concurrence, I/O moderne, build, Spring Boot.
   Ton : le professeur qui te montre ce que la JVM fait
   réellement — et pourquoi Java exige cette rigueur.
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.java = {
  id: 'java',
  name: 'Java',
  icon: 'coffee',
  tagline: 'JVM, POO rigoureuse, collections, streams et Spring Boot : le langage des systèmes qui durent.',
  heroTitle: 'Java : la rigueur au service des grandes applications',

  categories: [
    /* ======================================================
       1. ARCHITECTURE JVM
       ====================================================== */
    {
      id: 'architecture',
      name: 'Architecture JVM',
      icon: 'developer_board',
      fiches: [
        {
          id: 'java-jdk-jre-jvm',
          title: 'JDK, JRE et JVM : qui fait quoi ?',
          icon: 'coffee',
          level: 'Débutant',
          tagline: 'JDK pour développer, JRE pour exécuter, JVM pour faire tourner : les trois étages de la fusée Java.',
          intro: 'Avant d\'écrire la moindre ligne, il faut comprendre **qui exécute quoi**. Java n\'est pas qu\'un langage : c\'est toute une plateforme organisée en trois couches emboîtées — le **JDK** avec lequel tu développes, le **JRE** qui suffit pour exécuter, et la **JVM**, la machine virtuelle qui fait réellement tourner ton programme. Confondre ces trois boîtes, c\'est se garantir des erreurs d\'installation absurdes.',
          blocks: [
            { t: 'h3', h: 'Les trois boîtes, une fois pour toutes' },
            { t: 'p', h: 'Commençons par la plus petite. La **JVM (Java Virtual Machine)** est un programme qui lit du **bytecode** — le contenu de tes fichiers `.class` — et l\'exécute sur ta machine. Elle gère la mémoire, les threads, la sécurité. C\'est elle qui rend Java portable : la JVM de Windows et celle de Linux parlent le même bytecode.' },
            { t: 'p', h: 'Le **JRE (Java Runtime Environment)**, c\'est la JVM **plus** les bibliothèques standard (`java.lang`, `java.util`, `java.io`…). Avec un JRE, tu peux *exécuter* un programme Java, mais tu ne peux rien compiler : il n\'y a pas de `javac` dedans. Depuis Java 9 et les modules, le JRE a d\'ailleurs perdu son statut officiel — ce qui compte, c\'est le JDK.' },
            { t: 'p', h: 'Le **JDK (Java Development Kit)**, c\'est le JRE **plus** les outils du développeur : le compilateur `javac`, le débogueur `jdb`, `jar` pour empaqueter, `jshell` pour tester du code à la volée, `javadoc`… Règle simple : **toi, tu installes un JDK**, toujours. Le serveur de production, lui, peut se contenter d\'un runtime.' },
            { t: 'code', lang: 'text', label: 'Les poupées russes', code:
'┌─────────────────────────────────────────────┐\n│  JDK (Java Development Kit)                 │\n│  javac · jar · javadoc · jshell · jdb       │\n│  ┌───────────────────────────────────────┐  │\n│  │  JRE (Java Runtime Environment)       │  │\n│  │  bibliothèques standard (java.base…)  │  │\n│  │  ┌─────────────────────────────────┐  │  │\n│  │  │  JVM (Java Virtual Machine)     │  │  │\n│  │  │  exécute le BYTECODE (.class)   │  │  │\n│  │  └─────────────────────────────────┘  │  │\n│  └───────────────────────────────────────┘  │\n└─────────────────────────────────────────────┘' },
            { t: 'code', lang: 'bash', label: 'Vérifier ton installation', code:
'java -version\n# openjdk version "21.0.5" 2024-10-15 LTS\n# OpenJDK Runtime Environment Temurin-21.0.5\n\njavac -version\n# javac 21.0.5        ← si cette commande échoue, tu n\'as PAS de JDK' },
            { t: 'h3', h: 'Quelle version choisir en 2026 ?' },
            { t: 'p', h: 'Java sort une version tous les **six mois**, mais seules certaines reçoivent le label **LTS (Long-Term Support)** : ce sont elles que l\'on installe en entreprise. La cadence est d\'une LTS tous les deux ans. Retiens ce paysage — il conditionne tout ce que tu peux utiliser dans ton code.' },
            { t: 'table', head: ['Version', 'Type', 'Sortie', 'Support Premier'], rows: [
              ['Java 17', 'LTS', 'sept. 2021', 'jusqu\'à sept. 2026'],
              ['Java 21', 'LTS', 'sept. 2023', 'jusqu\'à sept. 2028'],
              ['Java 25', 'LTS', 'sept. 2025', 'jusqu\'à sept. 2030'],
              ['Java 26', 'non-LTS', 'mars 2026', 'jusqu\'à sept. 2026']
            ] },
            { t: 'p', h: 'Ce module cible **Java 17 et 21** : les `records`, les `sealed`, le pattern matching et les threads virtuels que tu vas rencontrer y sont tous stabilisés. Les exemples restent valables sur Java 25, la LTS la plus récente.' },
            { t: 'callout', kind: 'info', h: 'OpenJDK est le projet open source de référence. Par-dessus, plusieurs distributions : Oracle JDK, Eclipse Temurin (Adoptium), Amazon Corretto, Azul Zulu. Même bytecode, même langage — choisis-en une et dors tranquille. Pour un projet béninois hébergé sur un VPS Linux, Temurin est un excellent choix gratuit.' },
            { t: 'h3', h: 'Pourquoi une machine VIRTUELLE ?' },
            { t: 'p', h: 'Revenons au module C un instant : GCC compile ton `.c` directement en binaire x86 ou ARM — le programme ne tourne que sur le processeur pour lequel il a été compilé. Java a fait le pari inverse en 1995 : compiler vers un **processeur fictif** (la JVM), puis fournir une implémentation de ce processeur pour chaque système réel. Tu compiles une fois, le programme tourne partout. C\'est le fameux **Write Once, Run Anywhere**.' },
            { t: 'ul', items: [
              '**Portabilité** : le même fichier `.class` tourne sous Windows, macOS ou Linux sans recompilation.',
              '**Sécurité** : la JVM vérifie le bytecode avant exécution (bytecode verifier) et isole le programme de la machine réelle.',
              '**Services** : garbage collector, gestion des threads, observabilité (JFR, JMX) — des outils qu\'un binaire natif n\'a pas.',
              '**Optimisation continue** : la même JVM peut exécuter du Java, du Kotlin, de Scala ou Groovy — c\'est une plateforme, pas juste un langage.'
            ] }
          ],
          errors: [
            { title: 'Installer uniquement un JRE… puis chercher javac', lang: 'bash', bad:
'$ javac Hello.java\nbash: javac: command not found\n# Pourtant "java -version" répondait !',
              good:
'# Le JRE exécute mais ne compile pas : il n\'embarque pas javac.\n# Toujours installer un JDK complet :\nsudo apt install openjdk-21-jdk        # Debian/Ubuntu\nbrew install --cask temurin@21        # macOS',
              why: '`java -version` ne prouve que la présence d\'un *runtime*. Le compilateur `javac` n\'existe que dans le JDK. C\'est l\'erreur d\'installation la plus classique : tout semblait prêt, et la première compilation échoue.' },
            { title: 'Plusieurs JDK mélangés, et chaque outil en voit un différent', lang: 'bash', bad:
'# JAVA_HOME pointe sur Java 17, le PATH expose Java 21 :\n$ java -version      → 21.0.5\n$ mvn -version       → Java version: 17.0.13\n# Maven compile en 17, tes tests tournent en 21 : bonjour les bugs « chez moi ça marche ».',
              good:
'# UN seul JDK de référence, annoncé via JAVA_HOME :\nexport JAVA_HOME=/usr/lib/jvm/temurin-21\nexport PATH="$JAVA_HOME/bin:$PATH"\n# Maven, Gradle et les IDE respectent JAVA_HOME.',
              why: 'Les outils de l\'écosystème (Maven, Gradle, serveurs) lisent la variable `JAVA_HOME`, pas le `PATH`. Quand les deux désignent des JDK différents, compiler et exécuter n\'utilisent plus la même version — et les incompatibilités de bytecode apparaissent au pire moment.' }
          ],
          related: ['java-bytecode', 'java-heap-stack', 'java-garbage-collector', 'java-maven']
        },

        {
          id: 'java-bytecode',
          title: 'La compilation et le bytecode',
          icon: 'data_object',
          level: 'Débutant',
          tagline: 'javac traduit ton .java en bytecode, la JVM le transforme en code natif à la volée : le secret de la portabilité.',
          intro: 'En C, le compilateur produit un exécutable natif lié à UN processeur. Java coupe le problème en deux : `javac` traduit d\'abord ton code vers un formalisme intermédiaire — le **bytecode** — puis la JVM l\'exécute en le **recompilant à chaud** vers du code machine optimisé. Cette double traduction explique à la fois la portabilité légendaire de Java et ses performances surprenantes.',
          blocks: [
            { t: 'h3', h: 'Le voyage d\'un fichier : .java → .class → natif' },
            { t: 'code', lang: 'text', label: 'Les deux traductions', code:
'Hello.java                     Hello.class                  machine x86/ARM\n(code SOURCE)                  (BYTECODE portable)          (instructions natives)\n     │    javac, à la compilation   │   JIT, PENDANT l\'exécution    │\n     └──────────────────────────────┼──────────────────────────────┘\n                                    │\n        « Write Once »              │        « Run Anywhere »\n        tu compiles UNE fois        │   chaque JVM traduit pour SON OS' },
            { t: 'p', h: '**Étape 1 — `javac`** analyse ton code source (syntaxe, type de chaque expression) et produit un fichier `.class` contenant du bytecode : une suite d\'instructions pour la machine *abstraite* de Java. Ce fichier n\'est **pas** exécutable directement par ton processeur — c\'est une langue que seule la JVM comprend.' },
            { t: 'code', lang: 'java', label: 'Hello.java', code:
'public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Akô ! La JVM parle bytecode.");\n    }\n}' },
            { t: 'code', lang: 'bash', label: 'Compiler, exécuter, espionner', code:
'javac Hello.java        # produit Hello.class (du bytecode, pas un exécutable !)\njava Hello              # la JVM charge Hello.class et l\'exécute\n\njavap -c Hello          # désassembleur : montre le bytecode réel' },
            { t: 'code', lang: 'text', label: 'Ce que javap -c révèle', code:
'public static void main(java.lang.String[]);\n  Code:\n     0: getstatic     #7    // récupère System.out\n     3: ldc           #13   // charge la chaîne "Akô !..."\n     5: invokevirtual #15   // appelle println(...)\n     8: return\n\n// getstatic, ldc, invokevirtual : le vocabulaire de la JVM.\n// Peu importe le système : ce programme d\'instructions est IDENTIQUE partout.' },
            { t: 'h3', h: 'Le JIT : la JVM apprend en exécutant' },
            { t: 'p', h: 'Interpréter du bytecode instruction par instruction serait lent. Alors la JVM **HotSpot** observe ton programme tourner : les méthodes exécutées des milliers de fois — les *hot spots* — sont **recompilées en code natif optimisé pendant l\'exécution** par le compilateur JIT (Just-In-Time), en plusieurs niveaux (C1 rapide puis C2 agressif).' },
            { t: 'ul', items: [
              '**Le JIT voit la réalité** : il sait quelles branches sont prises, quels types passent réellement — il peut *inliner* des méthodes et éliminer des vérifications, optimisations impossibles pour un compilateur statique comme GCC.',
              '**Les objets courts ne coûtent presque rien** : escape analysis, allocation rapide sur le heap — le JIT transforme souvent du code « naïf » en code excellent.',
              '**Le démarrage est le prix à payer** : un programme Java est plus lent à lancer (la machine se « chauffe »), puis accélère. C\'est pourquoi Java excelle sur les services longue vie (API, backends) plutôt que sur les scripts de cinq secondes.'
            ] },
            { t: 'callout', kind: 'tip', h: 'Depuis Java 11, `java Hello.java` (avec l\'extension !) lance directement un fichier source unique : pratique pour tester une idée. Mais dès qu\'il y a deux fichiers, retour au vrai pipeline javac puis java.' },
            { t: 'h3', h: 'Ce que le fichier .class contient' },
            { t: 'p', h: 'Un en-tête avec le **numéro de version de classe** (Java 17 = 61, Java 21 = 65, Java 25 = 69), un **constant pool** rangé de toutes les chaînes et références, puis le bytecode de chaque méthode. Ce numéro de version est la clé de l\'erreur d\'incompatibilité la plus célèbre du monde Java : exécuter sur une JVM plus vieille que le compilateur utilisé est impossible.' }
          ],
          errors: [
            { title: 'Taper java Hello.class au lieu de java Hello', lang: 'bash', bad:
'$ java Hello.class\nErreur : impossible de trouver ou de charger la classe principale Hello.class',
              good:
'$ java Hello\n# « java » attend le NOM DE CLASSE, pas un nom de fichier.\n# Pas d\'extension, pas de chemin avec des /.',
              why: 'La JVM raisonne en *noms de classes* (com.boutique.App), pas en fichiers. Donner `Hello.class`, c\'est lui demander de trouver une classe nommée « class » dans un package « Hello » — qui n\'existe pas.' },
            { title: 'Compiler en Java 21, exécuter sur une JVM 17', lang: 'bash', bad:
'$ java -version            → 17.0.13\n$ java com.boutique.App\njava.lang.UnsupportedClassVersionError: com/boutique/App\nhas been compiled by a more recent version of the Java Runtime\n(class file version 65.0), this version recognizes up to 61.0',
              good:
'# Aligner les versions : soit exécuter avec le JDK 21+,\n# soit compiler pour la cible la plus ancienne :\njavac --release 17 src/com/boutique/App.java',
              why: 'Chaque `.class` porte sa version cible ; une JVM ne lit que les versions ≤ la sienne (17 lit jusqu\'à 61, 21 jusqu\'à 65). Le flag `--release` force javac à produire du bytecode compatible avec une version précise — à mettre en place dès que la production est plus vieille que ta machine.' },
            { title: 'Oublier le package au moment de l\'exécution', lang: 'bash', bad:
'# Classe déclarée : package com.boutique;\n$ cd classes/com/boutique\n$ java App\nErreur : impossible de trouver ou de charger la classe principale App',
              good:
'# On lance depuis la RACINE des classes, avec le nom complet :\n$ cd classes\n$ java com.boutique.App',
              why: 'Le nom complet d\'une classe inclut son package : `com.boutique.App`. La JVM traduit les points en répertoires depuis le **classpath**. Depuis l\'intérieur du dossier, ce nom « complet » n\'est plus résolvable — d\'où l\'erreur qui fait perdre vingt minutes à chaque débutant.' }
          ],
          related: ['java-jdk-jre-jvm', 'java-heap-stack', 'java-garbage-collector', 'java-maven']
        },

        {
          id: 'java-garbage-collector',
          title: 'Le Garbage Collector',
          icon: 'recycling',
          level: 'Intermédiaire',
          tagline: 'La JVM ramasse automatiquement les objets abandonnés : adieu free, mais pas adieu les fuites.',
          intro: 'En C, chaque `malloc` exige son `free`, sous peine de fuite. Java a fait un choix radical : **le programmeur ne libère jamais la mémoire lui-même**. Un ramasse-miettes — le **Garbage Collector** — détecte les objets devenus inaccessibles et récupère leur place tout seul. C\'est un confort immense… à condition de comprendre *comment* il décide, sinon tu recréeras des fuites sans t\'en rendre compte.',
          blocks: [
            { t: 'h3', h: 'Le critère : l\'atteignabilité, pas l\'utilité' },
            { t: 'p', h: 'Le GC ne se demande pas « cet objet sera-t-il encore utile ? » — il est incapable de prédire l\'avenir. Il se demande : « peut-on **atteindre** cet objet en suivant des références depuis les **GC roots** ? » Les racines, ce sont : les variables locales des stacks de tous les threads actifs, les champs `static` des classes chargées, et quelques références techniques internes à la JVM. Tout objet non atteignable depuis ces racines est déclaré **mort** : sa place sera récupérée.' },
            { t: 'code', lang: 'java', label: 'Rendre un objet orphelin', code:
'public static void main(String[] args) {\n    Client client = new Client("Awa", "Cotonou"); // racine vivante : variable locale\n    client = null;      // plus AUCUNE référence → le Client devient orphelin\n\n    for (int i = 0; i < 3; i++) {\n        Facture f = new Facture(i);  // une nouvelle Facture par tour\n    }   // à chaque tour, la précédente n\'est plus atteignable → éligible GC\n}' },
            { t: 'p', h: '**Éligible ne veut pas dire supprimé tout de suite.** Le GC passe quand *il* le juge utile — souvent quand le heap jeune se remplit. Il n\'y a aucune garantie de délai, et c\'est voulu : la JVM optimise le débit global, pas la ponctualité de chaque libération.' },
            { t: 'h3', h: 'La stratégie générationnelle : la plupart des objets meurent jeunes' },
            { t: 'p', h: 'Observation fondatrice : dans un programme typique (une requête HTTP, un calcul), **la quasi-totalité des objets deviennent inutiles en quelques millisecondes**, et les rares survivants vivent longtemps. Le heap est donc organisé en générations pour exploiter cette statistique.' },
            { t: 'code', lang: 'text', label: 'Le heap vu par le GC', code:
'HEAP\n┌─────────────────────────────────────────┬────────────────┐\n│  YOUNG GENERATION                       │  OLD GENERATION│\n│  ┌──────────┬───────────┬───────────┐   │  (tenured)     │\n│  │   Eden   │ Survivor 0│ Survivor 1│   │  les objets qui│\n│  │ départ   │           │           │   │  ont survécu   │\n│  └──────────┴───────────┴───────────┘   │  à plusieurs GC│\n│  minor GC : rapide, très fréquent       │  major GC :    │\n│                                         │  rare, coûteux │\n└─────────────────────────────────────────┴────────────────┘\n  nouvel objet → Eden ; s\'il survit à un GC → Survivor ;\n  encore vivant après quelques tours → PROMU vers OLD' },
            { t: 'ul', items: [
              '**Minor GC** : nettoie la young generation. Très rapide car peu de survivants — on copie les vivants, on jette le reste d\'un coup.',
              '**Major GC** : s\'occupe de la old generation, plus vaste et pleine d\'objets vivants. C\'est lui qui coûte cher quand il survient trop souvent.',
              '**Stop-the-world** : la plupart des phases de GC suspendent tes threads quelques millisecondes. Les GC modernes (G1, le défaut depuis Java 9 ; ZGC et Shenandoah pour les pauses < 1 ms) réduisent ces pauses à coups de régions et de travail concurrent.',
              '**Conséquence pratique** : créer des objets courts en boucle est *bon marché* en Java (Eden les avale) — mais saturer la old generation déclenche les GC coûteux.'
            ] },
            { t: 'h3', h: 'Pourquoi tu ne gagnes JAMAIS à l\'aider de force' },
            { t: 'p', h: '`System.gc()` ne *force* rien : c\'est une **suggestion** que la JVM est libre d\'ignorer — et l\'option `-XX:+DisableExplicitGC` la rend même totalement muette. Appeler gc() dans une boucle de production ne fait que provoquer des pauses inutiles. Le vrai levier, c\'est ton *code* : ne pas garder de références inutiles, dimensionner les caches, choisir les bonnes collections.' },
            { t: 'callout', kind: 'warn', h: 'Le GC ne ferme pas tes fichiers, sockets ou connexions ! Il ne gère que la MÉMOIRE. Une ressource du système se referme explicitement — c\'est tout le rôle du try-with-resources. Confondre « l\'objet sera ramassé » et « le fichier sera fermé » provoque des fuites de descripteurs.' },
            { t: 'p', h: 'Et la méthode `finalize()`, censée s\'exécuter avant la destruction ? **À bannir absolument** : timing imprévisible, coût pour le GC, source de bugs. Elle est *deprecated for removal* depuis Java 9. Pour libérer une ressource : `AutoCloseable` + try-with-resources, point final.' }
          ],
          errors: [
            { title: 'La fuite mémoire à la Java : la collection static qui ne finit jamais', lang: 'java', bad:
'public class Registre {\n    // static = rattaché à la CLASSE, racine GC éternelle !\n    private static final List<Session> SESSIONS = new ArrayList<>();\n\n    public static void onLogin(Session s) {\n        SESSIONS.add(s);        // chaque connexion ajoute…\n    }                           // …et RIEN ne retire jamais\n}\n// Au bout de quelques jours : OutOfMemoryError: Java heap space',
              good:
'// Un cache BORNÉ : les plus vieilles entrées partent toutes seules\nprivate static final Map<String, Session> SESSIONS =\n    Collections.synchronizedMap(new LinkedHashMap<>(1000, 0.75f, true) {\n        @Override protected boolean removeEldestEntry(Map.Entry<String, Session> e) {\n            return size() > 1000;   // LRU : jamais plus de 1000 sessions\n        }\n    });\n// Et surtout : retirer explicitement lors du logout.',
              why: 'Le GC ne récupère que les objets **inatteignables**. Une liste `static` est une racine vivante en permanence : tout ce qu\'elle contient reste atteignable *à jamais*, même si plus personne ne s\'en sert. Le ramasse-miettes fonctionne parfaitement — c\'est ton code qui lui interdit de travailler. Toute collection `static` doit être bornée (LRU, taille max) ou vidée explicitement.' },
            { title: 'Compter sur finalize() pour nettoyer', lang: 'java', bad:
'@Override\nprotected void finalize() {\n    connexion.close(); // « au cas où » — ne sera peut-être JAMAIS appelé\n}',
              good:
'public class ImportMoMo implements AutoCloseable {\n    public void traiter() { /* … */ }\n    @Override public void close() { connexion.close(); }\n}\ntry (ImportMoMo imp = new ImportMoMo()) { imp.traiter(); }\n// close() appelé À COUP SÛR, même en cas d\'exception. ✓',
              why: '`finalize()` s\'exécute quand le GC passe — c\'est-à-dire *peut-être jamais* avant la fin du programme. Entre-temps, la connexion reste ouverte. Dépréciée pour suppression, imprévisible en timing : elle n\'a plus aucune place dans du code moderne. Le try-with-resources couvre 100 % des cas, de façon déterministe.' },
            { title: 'Appeler System.gc() « pour optimiser »', lang: 'java', bad:
'for (Commande c : commandes) {\n    traiter(c);\n    System.gc();   // « pour libérer au fur et à mesure »\n}',
              good:
'for (Commande c : commandes) {\n    traiter(c);    // le GC sait très bien gérer les objets courts\n}\n// Si la mémoire inquiète : profiler (JFR, VisualVM) et tuner\n// le heap (-Xmx), ne jamais invoquer gc() soi-même.',
              why: '`System.gc()` est une suggestion, souvent suivie d\'un full GC *stop-the-world* qui gèle l\'application des centaines de millisecondes. Dans une boucle, tu transformes l\'allocation bon marché sur Eden en pauses catastrophiques. Le GC sait son métier — ton rôle est de ne pas conserver de références inutiles.' }
          ],
          related: ['java-heap-stack', 'java-try-with-resources', 'java-map', 'java-virtual-threads']
        },

        {
          id: 'java-heap-stack',
          title: 'Heap vs Stack : le modèle mémoire de la JVM',
          icon: 'stacks',
          level: 'Intermédiaire',
          tagline: 'Variables locales sur la pile, objets sur le tas : la carte mentale qui explique StackOverflowError et OutOfMemoryError.',
          intro: 'Chaque programme Java vit avec **deux mémoires** aux rôles opposés. La **stack** est un empilement ordonné de cadres d\'appels — rapide, privée à chaque thread, nettoyée automatiquement à chaque `return`. Le **heap** est un grand espace partagé où naissent tous les objets — le royaume du garbage collector. Savoir *qui vit où* transforme deux messages d\'erreur terrifiants en diagnostics limpides.',
          blocks: [
            { t: 'h3', h: 'La stack : une pile d\'appels par thread' },
            { t: 'p', h: 'À chaque appel de méthode, la JVM empile un **cadre (frame)** sur la stack du thread courant. Le cadre contient les **variables locales et les paramètres** : les valeurs des types primitifs (`int`, `double`…) y vivent *directement*, et les variables de type objet y stockent des **références** — des adresses qui pointent vers le heap. Quand la méthode se termine, son cadre est détruit instantanément : pas de GC là-bas, juste un pointeur qui redescend. C\'est pourquoi la stack est si rapide.' },
            { t: 'p', h: '**Un point crucial : chaque thread possède sa propre stack.** Les variables locales sont donc naturellement invisibles des autres threads — c\'est la première protection contre les bugs de concurrence. Le heap, lui, est **unique et partagé** par tous les threads : tout objet peut être touché par n\'importe quel thread qui en détient une référence. D\'où l\'existence de `synchronized`.' },
            { t: 'code', lang: 'text', label: 'Qui vit où ?', code:
'STACK du thread main                        HEAP (unique, partagé)\n┌───────────────────────────────┐           ┌─────────────────────────┐\n│ frame retirer(2000)           │           │                         │\n│   long montant = 2000         │           │   Compte { solde … }    │\n├───────────────────────────────┤           │        ▲                │\n│ frame main()                  │           │        │                │\n│   int age      = 21           │           │        │ référence      │\n│   Compte c  ──────────────────┼───────────┼────────┘                │\n│   String ville = "Cotonou" ──┼──────────► │  String pool: "Cotonou" │\n└───────────────────────────────┘           └─────────────────────────┘\n  existence liée à l\'appel :                  survit tant qu\'une\n  return → le cadre disparaît                  référence le vise' },
            { t: 'code', lang: 'java', label: 'Lire ce code avec la carte en tête', code:
'void retirer(Compte c, long montant) {\n    long frais = montant / 100;   // primitif → VIT dans le cadre de la stack\n    if (montant > c.getSolde()) { // c : référence (stack) → objet Compte (heap)\n        throw new IllegalStateException("solde insuffisant");\n    }\n}   // retour → le cadre saute : montant et frais disparaissent aussitôt,\n    // le Compte SURVIT sur le heap (main le référence encore).' },
            { t: 'h3', h: 'Les deux erreurs à connaître par cœur' },
            { t: 'table', head: ['Erreur', 'Mémoire en cause', 'Cause typique', 'Remède'], rows: [
              ['StackOverflowError', 'stack du thread', 'appels de méthodes jamais terminés (récursion infinie)', 'condition d\'arrêt, itération'],
              ['OutOfMemoryError: Java heap space', 'heap', 'trop d\'objets retenus (fuite, cache non borné)', 'libérer les références, -Xmx'],
              ['OutOfMemoryError: unable to create native thread', 'hors heap', 'trop de threads OS', 'pools, threads virtuels']
            ] },
            { t: 'p', h: 'La stack d\'un thread fait environ **512 Ko à 1 Mo** (option `-Xss`) : quelques milliers de cadres profonds et elle déborde. Le heap se règle avec `-Xmx` (maximum) et `-Xms` (départ). En production, on dimensionne le heap selon la charge mesurée, jamais au hasard.' },
            { t: 'callout', kind: 'tip', h: 'Deux nuances de pro : le **string pool** (les littéraux partagés) vit dans le heap, pas dans les cadres. Et le JIT peut parfois allouer un objet court *sur la stack* (escape analysis) quand il prouve qu\'il ne s\'échappe pas de la méthode — mais c\'est une optimisation interne, pas quelque chose que tu contrôles depuis Java.' },
            { t: 'h3', h: 'final ne change RIEN à l\'emplacement' },
            { t: 'p', h: '`final Compte c = …` signifie « la *référence* c ne sera jamais réassignée ». Elle reste une variable de stack, et l\'objet reste sur le heap, **modifiable** s\'il possède des setters. `final` verrouille la flèche, pas la cible. Pour un objet vraiment inaltérable, il faut une classe immuable (ou un `record`).' }
          ],
          errors: [
            { title: 'La récursion sans condition d\'arrêt : stack overflow', lang: 'java', bad:
'static long fact(long n) {\n    return n * fact(n - 1);   // aucun cas de base !\n}\n// fact(5) → fact(4) → … → fact(-927384…)…\n// Exception in thread "main" java.lang.StackOverflowError',
              good:
'static long fact(long n) {\n    if (n <= 1) return 1;          // condition d\'arrêt : CHAQUE branche y mène\n    return n * fact(n - 1);\n}\n// Chaque appel empile un cadre ; l\'arrêt les dépile tous.',
              why: 'Chaque appel récursif empile un nouveau cadre (paramètres + variables locales) sur la stack du thread — indispensable pour que les retours se calculent en cascade. Sans condition d\'arrêt, les cadres s\'empilent indéfiniment jusqu\'à saturer la pile du thread : StackOverflowError. Ce n\'est pas une fuite de heap, c\'est la pile d\'appels qui cède.' },
            { title: 'Croire que les objets vivent sur la stack comme en C++', lang: 'java', bad:
'Compte vider() {\n    Compte c = new Compte();\n    c.retirer(100);\n    return c;   // le débutant C++ craint de « retourner un objet local »\n}',
              good:
'Compte vider() {\n    Compte c = new Compte();  // l\'objet est sur le HEAP, toujours\n    c.retirer(100);\n    return c;                 // on retourne la RÉFÉRENCE : parfaitement sûr ✓\n}',
              why: 'En Java, *tous* les objets naissent avec `new` sur le heap — seule la référence (quelques octets) vit dans le cadre de la méthode. Retourner `c` copie la référence, jamais l\'objet : il reste vivant tant que quelqu\'un le vise, le GC le gère. Le cauchemar des pointeurs vers variables locales détruites n\'existe tout simplement pas ici.' },
            { title: 'Penser que final met l\'objet sur la stack ou le rend immuable', lang: 'java', bad:
'final Compte c = new Compte();\nc.retirer(500);     // le débutant s\'attend à une erreur…\n// …mais ça COMPILE : final n\'empêche pas de modifier l\'objet !',
              good:
'final Compte c = new Compte();\nc.retirer(500);        // ✓ l\'objet évolue\n// c = new Compte();   // ✗ SEUL ceci est interdit : réassigner la référence.',
              why: '`final` s\'applique à la *variable*, pas à l\'objet pointé : la flèche ne bouge plus, la cible reste libre. L\'immuabilité réelle vient d\'une classe sans setters et avec des champs eux-mêmes finaux/profonds — les `record` sont la voie royale moderne pour ça.' }
          ],
          related: ['java-garbage-collector', 'java-string-immutable', 'c-stack-vs-heap', 'java-virtual-threads']
        }
      ]
    },

    /* ======================================================
       2. PILIERS DE LA POO
       ====================================================== */
    {
      id: 'poo',
      name: 'Piliers de la POO',
      icon: 'hub',
      fiches: [
        {
          id: 'java-encapsulation',
          title: 'L\'encapsulation : verrouiller l\'état',
          icon: 'lock',
          level: 'Débutant',
          tagline: 'private partout, validation à l\'entrée : pourquoi Java t\'oblige à protéger tes données comme une caisse de banque.',
          intro: 'L\'encapsulation est le premier pilier de l\'orienté objet, et le plus trahi. L\'idée : un objet est **propriétaire de son état** et n\'autorise sa modification que par des portes contrôlées — ses méthodes. Chez MTN, personne ne modifie ton solde MoMo en écrivant directement dans la base : tout passe par des opérations qui *vérifient*. Tes classes doivent fonctionner pareil.',
          blocks: [
            { t: 'h3', h: 'Le problème : le champ public est un piège' },
            { t: 'code', lang: 'java', label: 'Sans encapsulation, l\'anarchie', code:
'class Compte {\n    public long solde;            // tout le monde peut y toucher !\n}\nCompte c = new Compte();\nc.solde = -50_000;              // un solde négatif ?! AUCUN garde-fou.\nc.solde = c.solde + 1;          // un dépôt d\'un franc ? Personne ne le saura.' },
            { t: 'p', h: 'Avec un champ `public`, **aucune règle métier ne peut tenir** : n\'importe quelle ligne du programme peut casser l\'invariant « un solde MoMo ne descend jamais sous zéro ». Et le jour où tu veux ajouter une validation, un journal ou un arrondi, tu dois modifier *tous* les endroits qui touchent le champ — mission impossible sur du vrai code.' },
            { t: 'h3', h: 'La solution : private + méthodes qui font la police' },
            { t: 'code', lang: 'java', label: 'Un compte qui se protège lui-même', code:
'public class CompteMoMo {\n    private final String numero;   // ne change jamais après construction\n    private long solde;            // en francs CFA — INACCESSIBLE de l\'extérieur\n\n    public CompteMoMo(String numero, long depotInitial) {\n        if (depotInitial < 0) throw new IllegalArgumentException("dépôt négatif");\n        this.numero = numero;\n        this.solde = depotInitial;\n    }\n\n    public long getSolde() { return solde; }   // lecture seule : pas de setter !\n\n    public void deposer(long montant) {\n        if (montant <= 0) throw new IllegalArgumentException("montant invalide");\n        solde += montant;\n    }\n\n    public void retirer(long montant) {\n        if (montant <= 0)  throw new IllegalArgumentException("montant invalide");\n        if (montant > solde) throw new IllegalStateException("solde insuffisant");\n        solde -= montant;\n    }\n}' },
            { t: 'ul', items: [
              '**La validation vit en UN seul endroit** : la méthode. Impossible de contourner la règle « pas de retrait supérieur au solde ».',
              '**L\'état interne peut changer de forme** sans impacter les utilisateurs : demain le solde peut devenir un `BigDecimal`, le getter convertira.',
              '**Tu documentes par le code** : les méthodes publiques forment le « mode d\'emploi » de l\'objet, le reste est détail d\'implémentation.',
              '**Convention JavaBean** : `getX()`, `setX(v)`, `isActif()` pour les booléens. Beaucoup de frameworks (Jackson, JPA, JavaFX) s\'y attendent.'
            ] },
            { t: 'h3', h: 'Les quatre niveaux de visibilité' },
            { t: 'table', head: ['Modificateur', 'Ma classe', 'Mon package', 'Sous-classes', 'Monde entier'], rows: [
              ['private', '✓', '✗', '✗', '✗'],
              ['(package-private, rien)', '✓', '✓', '✗', '✗'],
              ['protected', '✓', '✓', '✓', '✗'],
              ['public', '✓', '✓', '✓', '✓']
            ] },
            { t: 'p', h: 'Règle d\'or du clean code Java : **tout commence `private`**, y compris les méthodes, et on n\'élargit que lorsque le besoin est prouvé. Chaque membre public est un contrat que tu devras honorer pour toujours. L\'absence de mot-clé donne la visibilité « package » — très utile pour organiser les classes d\'un même module.' },
            { t: 'callout', kind: 'tip', h: 'Un getter qui expose une **collection interne** brise l\'encapsulation en silence : l\'appelant peut y ajouter des éléments sans passer par tes validations. Retourne une copie défensive (`new ArrayList<>(stock)`) ou une vue en lecture seule (`Collections.unmodifiableList(stock)`, `List.copyOf(stock)`).' }
          ],
          errors: [
            { title: 'Le setter automatique qui désamorce la protection', lang: 'java', bad:
'public void setSolde(long solde) {\n    this.solde = solde;      // généré par l\'IDE… et retirer(-99_999) inutile !\n}',
              good:
'// Pas de setSolde DU TOUT. Les seules mutations sont métier :\npublic void retirer(long montant) { /* validations, puis solde -= montant */ }\npublic void deposer(long montant) { /* validations, puis solde += montant */ }',
              why: 'Générer getters et setters pour tous les champs redonne l\'accès brut exact que `private` était censé interdire : l\'encapsulation devient du théâtre. On n\'expose que les opérations qui ont un **sens métier** ; beaucoup de champs n\'ont besoin ni de getter, ni de setter.' },
            { title: 'Renvoyer la collection interne par le getter', lang: 'java', bad:
'public List<Commande> getCommandes() {\n    return commandes;                 // la liste INTERNE s\'échappe !\n}\n// ailleurs : boutique.getCommandes().clear();  // vidée sans passer par la boutique',
              good:
'public List<Commande> getCommandes() {\n    return List.copyOf(commandes);   // instantané en lecture seule ✓\n}\npublic void ajouterCommande(Commande c) {\n    // la SEULE porte d\'entrée, avec validation\n    commandes.add(Objects.requireNonNull(c));\n}',
              why: 'Retourner la référence interne, c\'est offrir un passe-partout : plus personne ne contrôle les ajouts/suppressions, les invariants tombent, et le singleton de concurrence peut même lever ConcurrentModificationException. La copie défensive isole ton état du monde extérieur.' }
          ],
          related: ['java-heritage', 'java-abstraction', 'java-records', 'java-string-immutable']
        },

        {
          id: 'java-heritage',
          title: 'L\'héritage avec extends',
          icon: 'account_tree',
          level: 'Débutant',
          tagline: 'Un Zémidjan est un Véhicule : extends modélise les relations est-un, super fait remonter l\'eau aux racines.',
          intro: 'L\'héritage permet à une classe de **recevoir gratuitement** l\'état et le comportement d\'une autre, pour ensuite les spécialiser. En Java, le mot-clé est `extends`, et il ne marche bien qu\'une seule chose : exprimer une relation **est-un**. Utilisé pour autre chose — typiquement « récupérer du code sans réfléchir » — il devient la source d\'architectures fragiles.',
          blocks: [
            { t: 'h3', h: 'Le test avant tout extends : la phrase est-un' },
            { t: 'p', h: 'Avant d\'écrire la moindre ligne, pose la question : « est-ce que *« sous-classe » est un « super-classe »* tient la route dans le métier ? » Un Zémidjan **est un** Véhicule ✓. Une Commande **est un** Produit ? Non, une commande *contient* des produits ✗ — ce doit être de la composition. Si la phrase sonne faux à Dantokpa, elle est fausse dans ton code.' },
            { t: 'code', lang: 'java', label: 'Une hiérarchie honnête', code:
'public class Vehicule {\n    protected final String immatriculation;\n\n    public Vehicule(String immatriculation) {\n        this.immatriculation = immatriculation;\n    }\n    public String demarrer() {\n        return "Véhicule " + immatriculation + " démarre.";\n    }\n}\n\npublic class Zemidjan extends Vehicule {\n    public Zemidjan(String immatriculation) {\n        super(immatriculation);           // OBLIGATOIRE : appel du constructeur parent\n    }\n    @Override\n    public String demarrer() {\n        return super.demarrer()           // on réutilise le comportement parent…\n             + " Casque OK, MoMo prêt.";  // …puis on spécialise.\n    }\n}' },
            { t: 'ul', items: [
              '**Héritage simple uniquement** : une classe n\'a qu\'UN parent direct (exit les diamants du C++). Pour « plusieurs natures », Java offre les interfaces.',
              '**`super(...)`** doit être la première instruction du constructeur : le parent est construit *avant* l\'enfant — normal, l\'enfant peut utiliser l\'état hérité.',
              '**`@Override`** signale une redéfinition : le compilateur vérifie qu\'une méthode parente correspond exactement. Toujours l\'écrire, c\'est une assurance gratuite.',
              '**Upcasting naturel** : `Vehicule v = new Zemidjan("BJ 001")` compile sans effort — un Zemidjan se range sans protester dans un parking de Vehicules. C\'est la porte d\'entrée du polymorphisme.'
            ] },
            { t: 'h3', h: 'Verrouiller la descendance quand il le faut' },
            { t: 'p', h: '`final class Zemidjan` interdit tout héritage — la conception est close. `final` devant une méthode en interdit la redéfinition. Et depuis Java 17, les **sealed classes** offrent l\'entre-deux : héritage autorisé, mais seulement pour une liste blanche de classes. L\'héritage est un engagement : plus tu ouvres, plus les sous-classes *existent* comme clients de ton code interne.' },
            { t: 'callout', kind: 'warn', h: 'Préfère la COMPOSITION à l\'héritage dès que la relation est-un a le moindre doute. Une classe fragile qui change casse toutes ses filles ( fragile base class ). La règle d\'expérience : l\'héritage pour la *hiérarchie de types*, la composition pour la *réutilisation de code*.' }
          ],
          errors: [
            { title: 'Hériter pour voler du code, sans relation est-un', lang: 'java', bad:
'class Commande extends Produit {   // « j\'ai besoin du nom et du prix »\n}\n// Une commande N\'EST PAS un produit : on peut maintenant\n// vendre une Commande là où un Produit est attendu. Absurde.',
              good:
'class Commande {\n    private final List<Produit> produits = new ArrayList<>();  // composition ✓\n    public long total() {\n        return produits.stream().mapToLong(Produit::prix).sum();\n    }\n}',
              why: 'L\'héritage rend ta sous-classe *substituable* à la mère partout dans le programme : tous les usages de Produit accepteront une Commande, avec des conséquences imprévisibles. Pour réutiliser du comportement, délègue : un champ, une méthode qui en appelle une autre. C\'est la composition, et elle se teste bien mieux.' },
            { title: 'Oublier super(…) alors que le parent exige des paramètres', lang: 'java', bad:
'class Zemidjan extends Vehicule {\n    Zemidjan(String immat) {\n        // rien… le compilateur tente super() tout seul\n    }\n}\n// ✗ constructeur Vehicule() sans argument N\'EXISTE plus :\n// error: constructor Vehicule in class Vehicule cannot be applied',
              good:
'Zemidjan(String immat) {\n    super(immat);   // première ligne, explicite et obligatoire ✓\n}',
              why: 'Java insère un appel implicite à `super()`… qui échoue dès que la classe mère n\'a *pas* de constructeur sans argument. Le constructeur parent initialise l\'état hérité : il doit recevoir ses paramètres, en premier, toujours.' }
          ],
          related: ['java-polymorphisme', 'java-abstraction', 'java-interfaces', 'java-sealed']
        },

        {
          id: 'java-polymorphisme',
          title: 'Le polymorphisme : une variable, mille comportements',
          icon: 'alt_route',
          level: 'Intermédiaire',
          tagline: 'Appeler executer() sur un Paiement sans savoir s\'il est MoMo ou carte bancaire : la liaison dynamique à l\'œuvre.',
          intro: 'Le polymorphisme est ce qui rend l\'héritage utile : **la même déclaration de variable accueille des objets de natures différentes, et c\'est l\'objet réel — pas le type déclaré — qui répond à l\'appel de méthode**. Un contrôleur de caisse demande « exécute ce paiement » sans savoir si tu paies en MoMo ou en carte ; chaque objet sait quoi faire. C\'est le moteur des architectures extensibles.',
          blocks: [
            { t: 'h3', h: 'La liaison dynamique expliquée simplement' },
            { t: 'code', lang: 'java', label: 'Le même appel, deux résultats', code:
'public abstract class Paiement {\n    abstract String executer(long montant);\n}\npublic class PaiementMoMo extends Paiement {\n    @Override String executer(long m) { return "MoMo *880# : -" + m + " F CFA"; }\n}\npublic class PaiementCarte extends Paiement {\n    @Override String executer(long m) { return "VISA **** 4242 : -" + m + " F CFA"; }\n}\n\nPaiement[] caisse = { new PaiementMoMo(), new PaiementCarte() };\nfor (Paiement p : caisse) {\n    System.out.println(p.executer(5_000));\n}\n// MoMo *880# : -5000 F CFA        ← p est « déclaré » Paiement…\n// VISA **** 4242 : -5000 F CFA    ← …mais l\'OBJET choisit quelle méthode tourne' },
            { t: 'p', h: 'À la compilation, le compilateur ne connaît que le type *déclaré* `Paiement` : il vérifie juste que `executer(long)` existe quelque part dans ce type. À l\'exécution, la JVM regarde la classe **réelle** de l\'objet et appelle la version **la plus spécifique** de la méthode — c\'est la *liaison dynamique* (dynamic dispatch). Aucun `if (type == …)` : ajoute demain `PaiementFlooz` et la boucle marchera sans être retouchée. C\'est le principe *ouvert/fermé* en action.' },
            { t: 'h3', h: 'Redéfinition (override) ≠ surcharge (overload)' },
            { t: 'table', head: ['', 'Redéfinition @Override', 'Surcharge overload'], rows: [
              ['Quoi', 'même signature dans une classe FILLE', 'même nom, paramètres DIFFÉRENTS, même classe'],
              ['Quand choisie', 'à l\'exécution (liaison dynamique)', 'à la COMPILATION, sur les types déclarés'],
              ['Exemple', 'Zemidjan.demarrer() remplace Vehicule.demarrer()', 'afficher(String) et afficher(int)'],
              ['Piège', 'sans @Override, une coquille crée une surcharge silencieuse', 'croire que l\'objet réel décide — non, le type déclaré']
            ] },
            { t: 'code', lang: 'java', label: 'Pattern matching instanceof (Java 16+)', code:
'// Besoin exceptionnel du type précis ? Le nouveau instanceof teste ET caste :\nif (p instanceof PaiementMoMo momo) {   // momo est DÉJÀ casté si le test passe\n    momo.envoyerNotificationSms();\n}\n// Avant Java 16, il fallait : if (… instanceof PaiementMoMo) {\n//     PaiementMoMo momo = (PaiementMoMo) p; … }  — verbeux et risqué.' },
            { t: 'callout', kind: 'tip', h: 'Un `instanceof` ici ou là est acceptable. Une cascade de `instanceof` pour *choisir* un comportement est l\'aveu que le polymorphisme n\'a pas été utilisé : déplace ce comportement dans une méthode que chaque sous-classe redéfinit, et laisse la liaison dynamique travailler.' }
          ],
          errors: [
            { title: 'Surcharger au lieu de redéfinir : la méthode « fantôme »', lang: 'java', bad:
'public class Produit {\n    public boolean meme(Produit autre) { /* … */ }\n}\npublic class Article extends Produit {\n    // voulait redéfinir… mais le paramètre est Article, pas Produit !\n    public boolean meme(Article autre) { /* … */ }   // SURCHARGE silencieuse\n}\nProduit p = new Article();\np.meme(new Article());   // appelle Produit.meme, PAS Article.meme !',
              good:
'public class Article extends Produit {\n    @Override                                // le compilateur M\'ALERTE si je me trompe\n    public boolean meme(Produit autre) {     // signature EXACTEMENT identique ✓\n        /* … */\n    }\n}',
              why: 'La redéfinition exige la *même signature* ; changer le type du paramètre crée une deuxième méthode distincte. Le compilateur choisit alors au moment de la compilation, d\'après le type déclaré — et ta version « spécialisée » n\'est jamais appelée. Sans `@Override`, aucune alerte. Avec, l\'erreur s\'affiche instantanément : c\'est l\'annotation la plus rentable du langage.' },
            { title: 'Appeler une méthode redéfinissable depuis le constructeur', lang: 'java', bad:
'class Paiement {\n    Paiement() { initialiser(); }      // initialiser() sera PEUT-ÊTRE redéfinie…\n    void initialiser() { }\n}\nclass PaiementMoMo extends Paiement {\n    private final String numero = "97000000"; // initialisé APRÈS super()…\n    @Override void initialiser() {\n        envoyer(numero);               // numero vaut encore null !\n    }\n}',
              good:
'// Règle absolue : le constructeur ne touche que des méthodes\n// private, final ou statiques — jamais une méthode redéfinissable.\nclass PaiementMoMo extends Paiement {\n    private final String numero;\n    PaiementMoMo(String numero) {\n        this.numero = numero;\n        initialiser();                 // appelé quand l\'objet est COMPLET\n    }\n    private void initialiser() { envoyer(numero); }   // private = non redéfinissable',
              why: 'Le constructeur parent s\'exécute *avant* l\'initialisation des champs de l\'enfant. Si `initialiser()` est redéfinie, c\'est la version de l\'enfant qui tourne **sur un objet à moitié construit** (champs à null ou 0). Bug tellement sournois que toutes les chartes qualité l\'interdisent.' },
            { title: 'Caster à l\'aveugle : ClassCastException', lang: 'java', bad:
'Paiement p = panier.modeChoisi();\nPaiementMoMo momo = (PaiementMoMo) p;   // si l\'utilisateur a choisi la carte…\n// Exception in thread "main" java.lang.ClassCastException',
              good:
'if (p instanceof PaiementMoMo momo) {   // test + cast atomique ✓\n    momo.envoyerNotificationSms();\n} else {\n    // chemin prévu pour les autres paiements\n}',
              why: 'Le cast descendant n\'est jamais vérifié à la compilation — la JVM le vérifie à l\'exécution et explode en cas d\'erreur. Le pattern matching `instanceof` garantit que le cast ne s\'exécute que si le test a réussi : la ClassCastException devient structurellement impossible.' }
          ],
          related: ['java-heritage', 'java-abstraction', 'java-interfaces', 'java-sealed']
        },

        {
          id: 'java-abstraction',
          title: 'L\'abstraction et les classes abstract',
          icon: 'architecture',
          level: 'Intermédiaire',
          tagline: 'Donner le squelette sans livrer tous les détails : la classe qu\'on ne peut pas instancier, et qui pilote ses filles.',
          intro: 'L\'abstraction, c\'est l\'art de modéliser **l\'essentiel sans le détail**. En Java, son outil principal est la **classe abstraite** : une classe marquée `abstract`, qu\'on ne peut pas instancier, qui peut mélanger méthodes *implémentées* (le socle commun) et méthodes *abstraites* (les points que chaque fille devra écrire). Elle est parfaite pour les squelettes d\'algorithmes métier.',
          blocks: [
            { t: 'h3', h: 'Une classe dont on ne veut PAS d\'instance' },
            { t: 'p', h: 'Qu\'est-ce qu\'une « OperationBoutique » en soi ? Rien de concret : ce qui existe, c\'est une Vente, un Approvisionnement, une Inventaire. La classe parent sert à *factoriser* ce que toutes les opérations partagent — une date, un Journal — et à imposer ce qu\'elles doivent fournir. La déclarer `abstract` interdit `new OperationBoutique()` : le compilateur *protège le sens* du modèle.' },
            { t: 'code', lang: 'java', label: 'Le patron de méthode (Template Method) en action', code:
'public abstract class OperationBoutique {\n\n    // Méthode CONCRÈTE et finale : le squelette, commun à toutes\n    public final String auditer() {\n        return "[" + java.time.LocalDate.now() + "] " + resumer();\n                                                      // ↑ délègue aux filles\n    }\n\n    // Méthode ABSTRAITE : pas de corps — chaque fille fournit le sien\n    abstract String resumer();\n}\n\npublic class Vente extends OperationBoutique {\n    @Override String resumer() { return "VENTE de 3 sacs de gari — Dantokpa"; }\n}\npublic class Approvisionnement extends OperationBoutique {\n    @Override String resumer() { return "APPRO 50 sacs — fournisseur Malick"; }\n}\n\n// new OperationBoutique()  → ✗ ERREUR de compilation : abstract !\nOperationBoutique op = new Vente();\nop.auditer();            // "[2026-07-21] VENTE de 3 sacs de gari — Dantokpa"' },
            { t: 'ul', items: [
              '**Mixité** : une classe abstraite peut avoir des **attributs**, des constructeurs, des méthodes concrètes *et* des méthodes abstraites — c\'est ce qui la distingue d\'une interface.',
              '**Contrat forcé** : une fille *concrète* DOIT implémenter toutes les méthodes abstraites, sinon le compilateur refuse. Le squelette garantit sa complétude.',
              '**Template Method** : `auditer()` est final et délègue un point précis (`resumer()`) aux filles — le patron de conception qui exploite au mieux l\'abstraction.',
              '**Une fille peut rester abstraite** : elle reporte alors l\'obligation d\'implémentation sur *ses* filles — des hiérarchies à étages.'
            ] },
            { t: 'h3', h: 'Abstraction ≠ classe abstraite' },
            { t: 'p', h: 'Ne confonds pas le **concept** et l\'**outil**. L\'abstraction — cacher la complexité derrière une surface simple — se pratique aussi avec des méthodes bien nommées, des packages cohérents, des interfaces. Le mot-clé `abstract` n\'est qu\'un mécanisme parmi d\'autres. Un bon développeur Java pense en modèles clairs ; les mots-clés suivent.' },
            { t: 'callout', kind: 'info', h: 'Classe abstraite ou interface ? La réponse courte : état à partager + code commun substantiel → classe abstraite ; contrat pur sans état → interface. La fiche sur les interfaces détaille les règles de décision les unes contre les autres.' }
          ],
          errors: [
            { title: 'Déclarer abstract final class : la contradiction qui ne compile pas', lang: 'java', bad:
'public abstract final class OperationBoutique { }\n// ✗ error: illegal combination of modifiers: abstract and final',
              good:
'// Choisis ton intention :\npublic abstract class OperationBoutique { }   // « conçue pour être étendue »\npublic final class Utilitaire { }              // « jamais étendue »',
              why: '`abstract` exige d\'être étendue pour servir, `final` interdit toute extension : les deux se contredisent logiquement, et Java le refuse net. C\'est rassurant : le langage interrompt les modèles incohérents dès la compilation.' },
            { title: 'Une fille concrète qui oublie une méthode abstraite', lang: 'java', bad:
'public class Inventaire extends OperationBoutique {\n    // rien…\n}\n// ✗ error: Inventaire is not abstract and does not override\n//    abstract method resumer() in OperationBoutique',
              good:
'public class Inventaire extends OperationBoutique {\n    @Override String resumer() {\n        return "INVENTAIRE — 3 écarts constatés";\n    }\n}\n// …ou alors elle assume : public abstract class Inventaire …',
              why: 'C\'est la *force* des classes abstraites : le contrat est vérifié par le compilateur, pas par la discipline. Une fille concrète sans toutes les implementations ne compile tout simplement pas. Seule échappatoire légale : elle se déclare aussi `abstract` et reporte la dette sur ses filles.' }
          ],
          related: ['java-interfaces', 'java-polymorphisme', 'java-heritage', 'java-records']
        }
      ]
    },

    /* ======================================================
       3. INTERFACES, RECORDS & SEALED
       ====================================================== */
    {
      id: 'interfaces',
      name: 'Interfaces, records & sealed',
      icon: 'account_tree',
      fiches: [
        {
          id: 'java-interfaces',
          title: 'Les interfaces : contrats, default et static',
          icon: 'handshake',
          level: 'Intermédiaire',
          tagline: 'Un contrat sans état, héritable à volonté — enrichi depuis Java 8 par les méthodes default, static et private.',
          intro: 'L\'interface est le deuxième grand dispositif d\'abstraction de Java : une **liste de capacités** qu\'une classe s\'engage à fournir, sans état ni hiérarchie imposée. Une classe ne peut hériter que d\'un parent, mais peut **implémenter autant d\'interfaces qu\'elle veut** — c\'est la réponse de Java aux hiérarchies multiples, et la clé des architectures découplées (et testables).',
          blocks: [
            { t: 'h3', h: 'Un contrat pur — avec des raccourcis implicites' },
            { t: 'code', lang: 'java', label: 'Tout est implicite dans une interface', code:
'public interface Payable {\n    long PLAFOND = 100_000L;     // public static final  — implicite !\n\n    String payer(long montant);  // public abstract      — implicite !\n\n    // === Java 8 : méthodes avec CORPS dans une interface ? Oui. ===\n    default String recu(long montant) {          // code offert, redéfinissable\n        return "REÇU — " + payer(montant);      // appelle même l\'abstraite\n    }\n    static boolean montantValide(long m) {        // utilitaire lié au contrat\n        return m > 0 && m <= PLAFOND;             // appel : Payable.montantValide(50_000)\n    }\n    private static String prefixe() {             // Java 9 : factorisation interne\n        return "MOMO-";\n    }\n}' },
            { t: 'p', h: '**Pourquoi les méthodes `default` ont changé l\'histoire de Java** : en 2014, Oracle voulait ajouter `stream()` à l\'interface `Collection` — utilisée par des *millions* de classes dans le monde. Sans default, chaque implémentation aurait dû être modifiée : l\'écosystème entier aurait cassé. La méthode `default` fournit un corps *de secours* dans l\'interface elle-même : les anciennes classes continuent de compiler et le nouveau comportement est disponible partout. C\'est de l\'évolution d\'API sans casse.' },
            { t: 'h3', h: 'Le vrai pouvoir : plusieurs interfaces, zéro diamant' },
            { t: 'code', lang: 'java', label: 'Composer des capacités', code:
'public interface Payable     { String payer(long montant); }\npublic interface Remboursable { String rembourser(long montant); }\npublic interface Journalisable {\n    default void log(String message) { System.out.println("[LOG] " + message); }\n}\n\n// Une classe compose librement — impossible avec extends :\npublic class CaisseBoutique implements Payable, Remboursable, Journalisable {\n    @Override public String payer(long m)      { log("paiement " + m); return "OK"; }\n    @Override public String rembourser(long m) { return "OK"; }\n}' },
            { t: 'h3', h: 'Le conflit de defaults : le diamant résolu à la main' },
            { t: 'code', lang: 'java', label: 'Deux interfaces, même default', code:
'interface A { default String salut() { return "A"; } }\ninterface B { default String salut() { return "B"; } }\n\nclass C implements A, B {\n    // ✗ COMPILE PAS tant qu\'on ne tranche pas : le compilateur exige un choix.\n    @Override public String salut() {\n        return A.super.salut() + "-" + B.super.salut();   // syntaxe dédiée ✓\n    }\n}' },
            { t: 'h3', h: 'Classe abstraite ou interface ? Les règles de décision' },
            { t: 'table', head: ['Critère', 'Interface', 'Classe abstraite'], rows: [
              ['État (attributs)', '✗ jamais (constantes seulement)', '✓ oui'],
              ['Implémentations multiples', '✓ à volonté', '✗ un seul extends'],
              ['Constructeur', '✗', '✓'],
              ['Cas d\'usage', 'capacité (Comparable, Payable)', 'socle commun avec code partagé'],
              ['Évolution', 'ajout de default sans casse', 'ajout de méthode concrète sans casse'],
            ] },
            { t: 'p', h: 'Réflexe moderne : **interface d\'abord**. Elle découple au maximum, se moque de la hiérarchie, et se laisse étoffer avec des `default`. On ne sort la classe abstraite que lorsque l\'état partagé ou un squelette d\'algorithme l\'exige — souvent d\'ailleurs *les deux* : une interface publique + une classe abstraite `AbstractXxx` qui facilite l\'implémentation (c\'est exactement la structure de `List` / `AbstractList` dans le JDK).' },
            { t: 'callout', kind: 'tip', h: 'Une interface avec UNE seule méthode abstraite est une **interface fonctionnelle** (`@FunctionalInterface`) : elle devient cible de lambda — la porte d\'entrée de tout le Java fonctionnel et de l\'API Stream.' }
          ],
          errors: [
            { title: 'Tenter d\'ajouter de l\'état dans une interface', lang: 'java', bad:
'public interface Compte {\n    long solde;              // le débutant pense créer un attribut…\n}\n// …mais c\'est une CONSTANTE : public static final, initialisée une fois,\n// PARTAGÉE par toutes les implémentations. Piège absolu.',
              good:
'public interface Compte {\n    long getSolde();         // la donnée vit dans chaque CLASSE implémenteuse\n}\nclass CompteMoMo implements Compte {\n    private long solde;      // ← l\'état, là où il doit être\n    @Override public long getSolde() { return solde; }\n}',
              why: 'Tout champ écrit dans une interface est silencieusement promu `public static final` — une constante unique, commune à tous, sans lien avec les objets. L\'état n\'a jamais sa place dans une interface : seule la *forme* des accès (le contrat). Si tu veux mutualiser de l\'état, c\'est une classe abstraite qu\'il te faut.' },
            { title: 'Réduire la visibilité en implémentant', lang: 'java', bad:
'class CaisseBoutique implements Payable {\n    @Override String payer(long m) { return "OK"; }\n}\n// ✗ error: attempting to assign weaker access privileges;\n//    was public',
              good:
'class CaisseBoutique implements Payable {\n    @Override public String payer(long m) { return "OK"; }   // public, exigé ✓\n}',
              why: 'Les méthodes d\'une interface sont implicitement `public`. L\'implémentation ne peut pas *resserrer* la visibilité promise par le contrat — tout client d\'une Payable doit pouvoir appeler payer(). Oublier le `public` est la coquille de signature la plus fréquente chez les débutants en interfaces.' }
          ],
          related: ['java-abstraction', 'java-lambdas', 'java-interfaces-fonctionnelles', 'java-polymorphisme']
        },

        {
          id: 'java-records',
          title: 'Les records : les données, rien que les données',
          icon: 'inventory',
          level: 'Intermédiaire',
          tagline: 'Une ligne déclare un porteur de données complet : constructeur, accesseurs, equals, hashCode et toString offerts.',
          intro: 'Combien de fois as-tu écrit la même classe hors d\'usage : trois champs `private final`, un constructeur, trois getters, puis `equals`, `hashCode` et `toString` générés par l\'IDE ? Cinquante lignes pour dire « c\'est juste de la donnée ». Le **record** (définitif depuis Java 16) fait tenir tout ça sur **une ligne** — et le rend immuable par construction.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Avant / après', code:
'// AVANT : ~60 lignes de champs final + ctor + getters + equals/hashCode/toString\n// APRÈS :\npublic record TransactionDto(String reference, long montant,\n                             java.time.LocalDateTime date) { }\n\nvar t = new TransactionDto("MOMO-7F2A", 15_000, java.time.LocalDateTime.now());\nt.reference();     // accesseur : le nom SANS le préfixe get\nt.montant();\nSystem.out.println(t);  // toString auto : TransactionDto[reference=MOMO-7F2A, …]\nt.equals(autre);        // compare TOUS les composants, champ par champ ✓' },
            { t: 'ul', items: [
              '**Immuabilité garantie** : chaque composant est `private final`, aucun setter n\'existe. Un record circule sans crainte entre threads et sert de clé de Map fiable.',
              '**Le compilateur écrit tout** : constructeur canonique, accesseurs `nom()`, `equals`/`hashCode` basés sur *tous* les composants, `toString` lisible.',
              '**Transparent pour la donnée** : le contrat « ce que tu mets est ce que tu lis » rend les records parfaits en **DTO** (réponses JSON Spring, lignes de base, événements).',
              '**Un record peut implémenter des interfaces** et déclarer méthodes, champs statiques, constructeurs supplémentaires — mais il ne peut rien étendre (il hérite déjà de `java.lang.Record`).'
            ] },
            { t: 'h3', h: 'Le constructeur compact : validation sans bruit' },
            { t: 'code', lang: 'java', label: 'Verrouiller les données dès la naissance', code:
'public record TransactionDto(String reference, long montant) {\n    public TransactionDto {          // constructeur COMPACT : pas de paramètres répétés\n        if (montant <= 0) {\n            throw new IllegalArgumentException("montant positif requis : " + montant);\n        }\n        reference = reference.strip(); // normaliser : on modifie le PARAMÈTRE,\n    }                                  // le champ final reçoit la valeur corrigée\n    // la JVM écrit ensuite this.reference = reference; … toute seule\n}\n\nnew TransactionDto("  MOMO-7F2A ", 15_000).reference();   // "MOMO-7F2A" ✓\nnew TransactionDto("X", -50);   // ✗ IllegalArgumentException : impossible de mal construire' },
            { t: 'h3', h: 'Quand le record n\'est PAS la bonne réponse' },
            { t: 'p', h: 'Le record modélise des *données transparentes*. Il est inadapté quand tu veux **cacher l\'implémentation** (encapsulation forte avec état interne différent de l\'API), quand l\'objet doit évoluer (mutable), ou quand tu dois étendre une classe existante. Et pour les entités JPA classiques, le record immuable ne convient pas (les entités ont un cycle de vie mutable) — par contre il excelle en projection de requête. La frontière est claire : *valeur* → record ; *entité avec identité* → classe.' },
            { t: 'callout', kind: 'info', h: 'Les frameworks modernes parlent record couramment : Jackson (2.12+) les sérialise/désérialise en JSON, Spring les accepte en DTO, Hibernate en résultats. Le seul point de vigilance : certains vieux mécanismes attendent des accesseurs `getNom()` et ne reconnaissent pas `nom()`.' }
          ],
          errors: [
            { title: 'Chercher à modifier un record après création', lang: 'java', bad:
'var t = new TransactionDto("REF", 15_000);\n// t.montant = 20_000;      ✗ le champ est private final\n// t.setMontant(20_000);    ✗ cette méthode n\'existe pas',
              good:
'// Un record se REMPLACE, il ne mute pas. Crée une déclinaison :\npublic record TransactionDto(String reference, long montant) {\n    public TransactionDto avecMontant(long nouveau) {\n        return new TransactionDto(reference, nouveau);   // wither, pas setter ✓\n    }\n}\nvar t2 = t.avecMontant(20_000);',
              why: 'L\'immuabilité est *la raison d\'être* du record : elle le rend thread-safe, cacheable, fiable en clé de HashMap. Vouloir le modifier, c\'est vouloir une classe. Les « withers » (méthodes qui retournent une copie altérée) donnent la souplesse sans casser la garantie.' },
            { title: 'Construire sans validation puis découvrir des données pourries', lang: 'java', bad:
'public record CompteDto(String numero, long solde) { }\n// new CompteDto(null, -500_000) passe sans broncher…\n// …et explose 40 lignes plus loin dans un calcul de TVA.',
              good:
'public record CompteDto(String numero, long solde) {\n    public CompteDto {\n        Objects.requireNonNull(numero, "numero obligatoire");\n        if (solde < 0) throw new IllegalArgumentException("solde négatif");\n    }\n}\n// L\'objet mauvais n\'EXISTE JAMAIS : l\'exception naît à la construction. ✓',
              why: 'Un DTO non validé, c\'est une bombe à retardement : l\'erreur éclate loin de sa source, dans le code qui *consomme* la donnée. Le constructeur compact coûte trois lignes et fait de l\'invariant une *loi physique* de ton programme : un objet invalide est inconstruisible. C\'est la philosophie « fail fast » chère à Java.' },
            { title: 'Croire que record = JavaBean compatible partout', lang: 'java', bad:
'// Ancienne introspection attendue :\n// getReference() / setReference() — introuvables sur un record.\n// Certains vieux mappers : BeanUtils.getProperty(t, "reference") → erreur.',
              good:
'// 1. Frameworks modernes (Jackson ≥2.12, Spring 6, Hibernate 6) : records natifs ✓\n// 2. Introspection programmatique : utilise les RecordComponent :\nfor (var rc : TransactionDto.class.getRecordComponents()) {\n    System.out.println(rc.getName());\n}\n// 3. Coincé avec une vieille lib ? Garde une classe JavaBean classique pour elle.',
              why: 'Le record n\'est pas un JavaBean : ses accesseurs s\'appellent `reference()` et non `getReference()`. Les outils précédant Java 16 s\'appuient sur la convention de nommage Bean et trébuchent. Ce n\'est pas un défaut — c\'est un contrat différent, assumé, que l\'écosystème moderne a adopté.' }
          ],
          related: ['java-encapsulation', 'java-string-immutable', 'java-sealed', 'java-spring-rest']
        },

        {
          id: 'java-sealed',
          title: 'Les sealed classes : un héritage sous contrôle',
          icon: 'fact_check',
          level: 'Avancé',
          tagline: 'Décider exactement qui peut hériter de toi — et débloquer le switch exhaustif du pattern matching.',
          intro: 'Classiquement, Java n\'offre que deux extrêmes : `final` (personne n\'hérite) ou rien (tout le monde peut). La classe **scellée** (Java 17) introduit l\'entre-deux professionnel : l\'héritage **autorisé mais listé**. Tu déclares toi-même les seules classes habilitées à te prolonger — et le compilateur peut soudain *prouver* qu\'un `switch` couvre tous les cas possibles.',
          blocks: [
            { t: 'h3', h: 'sealed + permits : la liste blanche de la descendance' },
            { t: 'code', lang: 'java', label: 'Modéliser les états d\'un paiement MoMo', code:
'public sealed interface StatutPaiement\n        permits StatutPaiement.Initie, StatutPaiement.Reussi, StatutPaiement.Echoue {\n\n    record Initie(String reference) implements StatutPaiement { }\n    record Reussi(String reference, java.time.LocalDateTime date) implements StatutPaiement { }\n    record Echoue(String reference, String motif) implements StatutPaiement { }\n}\n// Initie, Reussi, Echoue : les SEULES formes possibles d\'un statut.\n// Un quatrième ? Interdit partout dans le programme.' },
            { t: 'ul', items: [
              '**`sealed`** marque la classe/interface comme contrôlée ; **`permits`** énumère les enfants autorisés (implicite si tout vit dans le même fichier).',
              '**Chaque enfant choisit son camp** : `final` (fin de lignée), `sealed` (il continue la hiérarchie contrôlée avec ses propres `permits`) ou `non-sealed` (il ré-ouvre à tous). Ni l\'un ni l\'autre = erreur de compilation.',
              '**Même package (ou module)** : le compilateur doit connaître physiquement toute la hiérarchie — sinon *prouver* l\'exhaustivité serait impossible.',
              '**records + sealed = couple parfait** : les records sont `final` par nature et portent des données — le duo idéal pour modéliser des variantes.'
            ] },
            { t: 'h3', h: 'La récompense : le switch qui Prouve qu\'il est complet (Java 21)' },
            { t: 'code', lang: 'java', label: 'Pattern matching exhaustif', code:
'static String libelle(StatutPaiement s) {\n    return switch (s) {\n        case StatutPaiement.Initie i  -> "En attente du client… (ref " + i.reference() + ")";\n        case StatutPaiement.Reussi r  -> "Payé le " + r.date().toLocalDate();\n        case StatutPaiement.Echoue e  -> "Échec : " + e.motif();\n        // AUCUN default nécessaire : la hiérarchie étant scellée,\n        // le compilateur SAIT que ces 3 cas épuisent les possibilités. ✓\n    };\n}' },
            { t: 'p', h: 'Sois attentif à la valeur ajoutée : ajoutes-tu demain un statut `Rembourse` dans le `permits` ? **Tous les switch de la codebase deviennent des erreurs de compilation** tant qu\'ils ne traitent pas le nouveau cas. C\'est le rêve de toute maintenance : au lieu de traquer les `if/else` incomplets à l\'œil, c\'est le compilateur qui liste les endroits à revoir. On passe de « j\'espère n\'avoir rien oublié » à « le code refuse de compiler tant que ce n\'est pas fini ».' },
            { t: 'callout', kind: 'tip', h: 'Cas d\'usage royaux : états d\'une machine à états (commande, paiement), résultat Success/Erreur (alternative typée aux exceptions), noeuds d\'un AST, messages d\'un protocole. Partout où tu écrirais un enum *avec des données différentes selon les cas*, le couple sealed + records est la réponse moderne.' }
          ],
          errors: [
            { title: 'Un enfant ni final, ni sealed, ni non-sealed', lang: 'java', bad:
'public sealed interface StatutPaiement permits Reussi { }\nclass Reussi implements StatutPaiement { }\n// ✗ error: class must either be declared final, sealed, or non-sealed',
              good:
'final class Reussi implements StatutPaiement { }        // fin de lignée\n// ou : sealed class Reussi … permits … { }               // sous-hiérarchie\n// ou : non-sealed class Reussi … { }                     // réouverture assumée',
              why: 'Sceller une hiérarchie, c\'est demander à *tous* ses maillons de déclarer leur politique d\'héritage : le compilateur veut savoir, niveau par niveau, jusqu\'où va la liste des possibilités. Oublier ce choix rend la hiérarchie indécidable — le compilateur refuse donc de compiler, et il a raison.' },
            { title: 'Croire que sealed empêche l\'instanciation', lang: 'java', bad:
'sealed class Paiement permits PaiementMoMo { }\n// « on ne peut plus faire new Paiement() ? » — si ! sealed ≠ abstract.',
              good:
'sealed abstract class Paiement\n        permits PaiementMoMo, PaiementCarte { }   // souvent les DEUX :\n// sealed contrôle QUI étend, abstract contrôle SI on instancie.',
              why: '`sealed` limite la *descendance*, `abstract` interdit l\'*instanciation* directe — ce sont deux verrous orthogonaux. En pratique, une hiérarchie de variantes se déclare souvent `sealed abstract class` (ou interface) : personne ne crée le type de base, et la liste des sous-types est close.' }
          ],
          related: ['java-heritage', 'java-records', 'java-interfaces', 'java-polymorphisme']
        }
      ]
    }
]};
DEVDOCS.java.categories.push(
    /* ======================================================
       4. TYPES & CONVERSION
       ====================================================== */
    {
      id: 'types',
      name: 'Types & conversion',
      icon: '123',
      fiches: [
        {
          id: 'java-primitifs-wrappers',
          title: 'Types primitifs et Wrappers',
          icon: '123',
          level: 'Débutant',
          tagline: 'int vit dans la variable, Integer est un objet référencé — et l\'autoboxing fait silencieusement la navette entre les deux.',
          intro: 'Java vit avec **deux familles de types**. Huit types **primitifs** — des valeurs brutes stockées directement dans la variable — et, pour chacun, un **wrapper** objet (`Integer`, `Double`…) indispensable dès qu\'il faut un objet : collections, génériques, `null`. Entre les deux, le compilateur glisse des conversions automatiques, l\'**autoboxing**, qui cachent des pièges célèbres.',
          blocks: [
            { t: 'h3', h: 'Les 8 primitifs : la valeur, rien que la valeur' },
            { t: 'table', head: ['Type', 'Taille', 'Wrapper', 'Exemple de littéral'], rows: [
              ['byte', '8 bits (−128 à 127)', 'Byte', '(byte) 42'],
              ['short', '16 bits', 'Short', '(short) 1_000'],
              ['int', '32 bits', 'Integer', '250_000'],
              ['long', '64 bits', 'Long', '9_000_000_000L'],
              ['float', '32 bits (précision simple)', 'Float', '2.5f'],
              ['double', '64 bits (précision double)', 'Double', '19.99'],
              ['char', '16 bits (UTF-16, non signé)', 'Character', "'A'"],
              ['boolean', '1 valeur logique', 'Boolean', 'true']
            ] },
            { t: 'p', h: 'Une variable primitive **contient la valeur elle-même** : `int age = 21;` range 21 dans les 32 bits de la variable (sur la stack si c\'est une locale). Elle ne peut jamais valoir `null` — « pas de valeur » n\'existe pas pour un primitif. Note le `L` derrière un long, le `f` derrière un float, et l\'underscore `1_000_000` (Java 7+) pour lire les grands montants — très utile pour les francs CFA.' },
            { t: 'h3', h: 'Pourquoi des wrappers ? Parce que l\'objet règne partout' },
            { t: 'p', h: 'Les **génériques n\'acceptent que des types objet** : `List<int>` est interdit, il faut `List<Integer>`. Les wrappers ajoutent de plus une trousse d\'outils statiques (`Integer.parseInt("42")`, `Long.MAX_VALUE`, `Double.compare`) et l\'autorisation de `null` — pratique pour « inconnu », dangereux dès qu\'on déballe sans réfléchir (voir les pièges en bas). Ils sont **immuables**, comme String.' },
            { t: 'code', lang: 'java', label: 'L\'autoboxing / unboxing en action', code:
'Integer total = 42;      // autoboxing : le compilateur écrit Integer.valueOf(42)\nint brut = total;        // unboxing   : le compilateur écrit total.intValue()\n\nList<Integer> panier = new ArrayList<>();\npanier.add(2_500);       // autoboxing : la collection ne stocke QUE des objets\nint premier = panier.get(0);   // unboxing\n\n// Et le piège caché : chaque 2_500 devient un OBJET Integer du heap.' },
            { t: 'h3', h: 'Le cache d\'Integer : la bizarrerie qu\'il faut avoir vue une fois' },
            { t: 'code', lang: 'java', label: 'Le même code affiche true puis false', code:
'Integer a = 127, b = 127;\nSystem.out.println(a == b);        // true  : les deux pointent l\'objet DU CACHE\n\nInteger c = 128, d = 128;\nSystem.out.println(c == d);        // false : deux objets différents du heap !\nSystem.out.println(c.equals(d));   // true  ✓ : on compare les VALEURS' },
            { t: 'p', h: 'Pour économiser la mémoire, la JVM maintient un **cache des Integer de −128 à 127** : `valueOf` y puise au lieu de créer. Résultat : deux petites valeurs autoboxées partagent le même objet (== true), deux grosses non (== false). Ce comportement **sémantiquement instable** est la meilleure démonstration du monde que `==` sur des wrappers est un bug en attente — on compare les objets avec `.equals()`, toujours.' },
            { t: 'callout', kind: 'tip', h: 'En code intensif (boucles, sommes), reste en primitifs : Long sum + une collection force un objet par valeur. L\'API Stream offre des canaux spécialisés (`IntStream`, `mapToInt`, `sum()`) qui évitent carrément le boxing. Mesure : sur une somme de 10 millions de valeurs, l\'écart se compte en ordres de grandeur, pas en pour-cents.' }
          ],
          errors: [
            { title: 'Comparer deux Integer avec ==', lang: 'java', bad:
'Integer soldeA = lireSolde(compteA);   // 100_000\nInteger soldeB = lireSolde(compteB);   // 100_000\nif (soldeA == soldeB) { /* … */ }      // false ! Deux objets distincts.\n// (ça « marchait » en test avec 50 et 50… le cache −128..127. Puis plus en prod.)',
              good:
'if (soldeA.equals(soldeB)) { /* … */ }        // compare les VALEURS ✓\n// ou, encore mieux quand null est exclu :\nif (soldeA.intValue() == soldeB.intValue()) { /* … */ }\n// et pour sécuriser null : Objects.equals(soldeA, soldeB)',
              why: 'Pour les objets — et les wrappers sont des objets — `==` compare les **références** (est-ce le même objet ?), pas le contenu. Le cache −128..127 rend le bug intermittent en tests, ce qui le retarde jusqu\'en production. Règle absolue : wrappers, String et tout objet se comparent avec `.equals()` — `==` est réservé aux primitifs et aux tests d\'identité.' },
            { title: 'Déballer un Integer null : la NPE masquée', lang: 'java', bad:
'Integer remise = fiche.remise();   // peut renvoyer null (« pas de remise »)\nint total = prixBase - remise;     // unboxing silencieux → NullPointerException !\n// L\'erreur pointe cette ligne, pas la méthode fiche.remise().',
              good:
'Integer remise = fiche.remise();\nint total = prixBase - (remise != null ? remise : 0);   // on décide du « défaut » ✓\n// ou mieux : changer l\'API en int + convention, ou OptionalInt.',
              why: 'L\'unboxing d\'un wrapper null lève une NullPointerException au moment de la conversion — loin de la source du null. C\'est la NPE la plus sournoise du langage, car la ligne fautive a l\'air anodine. Dès qu\'un primitif reçoit un wrapper, exige-toi de savoir *prouver* qu\'il n\'est pas null : test, valeur par défaut explicite ou API repensée.' },
            { title: 'Sommer des millions de valeurs avec un wrapper', lang: 'java', bad:
'Long total = 0L;\nfor (int i = 0; i < 10_000_000; i++) {\n    total += i;   // 10 M d\'unboxing + 10 M de NOUVEAUX Long créés\n}',
              good:
'long total = 0L;\nfor (int i = 0; i < 10_000_000; i++) {\n    total += i;   // aucun objet créé : le compteur reste dans les registres ✓\n}\n// et avec un IntStream : IntStream.range(0, 10_000_000).sum();',
              why: '`total += i` sur un Long provoque à chaque tour un `longValue()` puis un `Long.valueOf()` — un objet heap alloué par itération, que le GC devra ramasser ensuite. Sur les grosses volumétries, c\'est la différence entre des millisecondes et des secondes. Les helpers de boxing sont faits pour l\'interop, pas pour l\'arithmétique de masse.' }
          ],
          related: ['java-string-immutable', 'java-collections-hierarchie', 'java-heap-stack', 'java-streams-api']
        },

        {
          id: 'java-string-immutable',
          title: 'String : l\'immutabilité comme religion',
          icon: 'abc',
          level: 'Débutant',
          tagline: 'Une String ne se modifie jamais : chaque transformation crée un nouvel objet — et c\'est exactement ce qui la rend fiable.',
          intro: 'La `String` est l\'objet le plus manipulé de Java, et le plus mal compris : **elle est immuable**. Une fois créée, son contenu est figé pour toujours — `toUpperCase()`, `replace()`, `concat()` ne *modifient* rien, ils *fabriquent* une nouvelle chaîne. Ce choix de conception radical, loin d\'être un caprice, rend les chaînes sûres, partageables et rapides en clé de table.',
          blocks: [
            { t: 'p', h: '**Définition** : immuable = aucune méthode ne peut changer le contenu d\'une String existante. Toute « modification » produit un **nouvel objet** ; l\'ancien reste intact jusqu\'à ce que le GC le ramasse. Concrètement, si tu ne récupères pas le résultat d\'une transformation… tu n\'as rien fait.' },
            { t: 'code', lang: 'java', label: 'Le piège nº 1 des débutants', code:
'String s = "gari rouge";\ns.toUpperCase();               // crée "GARI ROUGE"… qui part DIRECT au rebut !\nSystem.out.println(s);         // "gari rouge" — s n\'a pas bougé d\'un octet\n\nString t = s.toUpperCase();    // ✓ on RÉCUPÈRE le nouvel objet\nSystem.out.println(t);         // "GARI ROUGE"' },
            { t: 'h3', h: 'Le string pool : un seul objet pour mille littéraux' },
            { t: 'p', h: 'Grâce à l\'immutabilité, la JVM peut **partager** les chaînes : tous les littéraux `"cotonou"` d\'un programme désignent *le même objet* du **string pool** (dans le heap). Moins d\'objets, moins de mémoire, comparaisons structurelles fiables. Mais `new String("cotonou")` force un objet *neuf*, hors pool — c\'est la source de la question piège préférée des entretiens.' },
            { t: 'code', lang: 'java', label: '== versus equals, la démonstration', code:
'String a = "cotonou";\nString b = "cotonou";\nSystem.out.println(a == b);              // true  : MÊME objet du pool\n\nString c = new String("cotonou");        // objet NEUF, hors pool\nSystem.out.println(a == c);              // false : deux objets, même texte\nSystem.out.println(a.equals(c));         // true  ✓ : compare le CONTENU\n\nSystem.out.println(a == c.intern());     // true  : intern() ramène au pool' },
            { t: 'ul', items: [
              '**Thread-safety gratuite** : immuable ⇒ aucune méthode ne peut casser l\'objet pendant qu\'un autre thread le lit. Zéro synchronisation nécessaire.',
              '**Clé de HashMap parfaite** : le hashCode est calculé *une fois* et mis en cache — des recherches rapides et un comportement stable.',
              '**Sécurité** : une String utilisée comme mot de passe ou nom de classe ne peut pas être modifiée en place par du code tiers qui en détient la référence.',
              '**Le pool n\'existe QUE grâce à l\'immutabilité** : si tu pouvais éditer « cotonou » en place, tu corrompra tous les coins du programme qui partagent ce littéral.'
            ] },
            { t: 'h3', h: 'La boîte à outils moderne (Java 11 à 15)' },
            { t: 'code', lang: 'java', label: 'Méthodes à connaître', code:
'"  Gari fin  ".strip();          // "Gari fin" — gère l\'UNICODE (trim() non !)\n"   ".isBlank();                 // true  (isEmpty() aurait dit false)\n"be ".repeat(3);                 // "be be be "\n"ref-7F2A".startsWith("ref-");  // true\n"l1\\nl2\\nl3".lines().count();   // 3 : un Stream<String> des lignes' },
            { t: 'code', lang: 'java', label: 'Les text blocks (Java 15) : adieu les concaténations', code:
'String json = """\n    {\n      "produit": "gari",\n      "prix": 2500,\n      "devise": "XOF"\n    }\n    """;\n// Guillemets libres, retours à la ligne réels — parfait pour JSON, SQL, HTML.\nString requete = "SELECT * FROM ventes";   // ← l\'ancienne écriture, compare !' },
            { t: 'callout', kind: 'warn', h: 'Préfère `strip()` à `trim()` sur du texte béninois réel : noms propres, factures avec espaces insécables, saisies copiées-collées. `trim()` ne supprime que les caractères ≤ espace ASCII, `strip()` comprend l\'Unicode — différence visible dès le premier « é » ou espace insécable.' }
          ],
          errors: [
            { title: 'Le classique des classiques : == au lieu de equals', lang: 'java', bad:
'String saisie = scanner.nextLine();        // l\'utilisateur tape : momo\nif (saisie == "momo") {                    // false ! (saisie ≠ littéral du pool)\n    lancerPaiement();\n} else {\n    System.out.println("opérateur inconnu");  // ← toujours ce chemin\n}',
              good:
'if ("momo".equals(saisie)) {               // compare le CONTENU ✓\n    lancerPaiement();\n}\n// Astuce de robustesse : le littéral en PREMIER —\n// jamais de NullPointerException même si saisie vaut null.',
              why: '`==` vérifie l\'**identité** (même objet en mémoire ?), pas l\'**égalité de contenu**. Le string pool rend le bug intermittent : deux littéraux identiques passent, une saisie utilisateur ou une chaîne calculée échoue. C\'est LE bug de string nº 1 : toute comparaison de contenu passe par `.equals()`, sans exception.' },
            { title: 'equals sur une variable potentiellement null : NPE', lang: 'java', bad:
'String statut = paiement.statut();    // peut renvoyer null\nif (statut.equals("PAYEE")) { /* … */ }  // NullPointerException si null !',
              good:
'if ("PAYEE".equals(statut)) { /* … */ }   // le littéral n\'est jamais null ✓\n// ou la forme utilitaire null-safe :\nif (Objects.equals(statut, "PAYEE")) { /* … */ }',
              why: 'La NPE vient de l\'appel `variable.equals(…)` quand la variable vaut `null`. Inverser les opérandes (littéral en premier) rend l\'appel structurellement sûr, et `Objects.equals(a, b)` gère les deux nulls proprement. Quand « absent » devient un *cas* à part entière, pense à `Optional` plutôt qu\'au null.' },
            { title: 'Enchaîner les + dans une boucle', lang: 'java', bad:
'String ticket = "";\nfor (Produit p : panier) {\n    ticket += p.nom() + " : " + p.prix() + " F\\n";   // un NOUVEL objet par tour !\n}',
              good:
'StringBuilder sb = new StringBuilder();\nfor (Produit p : panier) {\n    sb.append(p.nom()).append(" : ").append(p.prix()).append(" F\\n");\n}\nString ticket = sb.toString();   // UN seul tampon, réutilisé ✓',
              why: 'Chaque `+=` duplique TOUTE la chaîne déjà construite dans un nouvel objet : un ticket de 1 000 lignes copie environ 500 000 caractères au lieu de 1 000 — complexité quadratique, et mille objets jetables pour le GC. Toute construction de chaîne *en boucle* passe par StringBuilder (voir la fiche dédiée).' }
          ],
          related: ['java-stringbuilder', 'java-primitifs-wrappers', 'java-optional', 'java-heap-stack']
        },

        {
          id: 'java-stringbuilder',
          title: 'StringBuilder : la concaténation sans gaspillage',
          icon: 'edit_note',
          level: 'Débutant',
          tagline: 'Un tampon de caractères que tu modifies en place : append, insert, delete — sans empiler les String jetables.',
          intro: 'Puisque les `String` sont immuables, construire un long texte par morceaux semble condamné à produire des montagnes d\'objets intermédiaires. `StringBuilder` résout exactement ce problème : c\'est un **tampon de caractères mutable**, interne, que l\'on remplit puis que l\'on convertit *une seule fois* en String. Maîtriser quand l\'utiliser — et quand ne pas l\'utiliser — est un grand classique de l\'entretien Java.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Construire un ticket de caisse', code:
'StringBuilder sb = new StringBuilder(128);   // capacité initiale (optionnelle)\nsb.append("BOUTIQUE AWA — Dantokpa\\n");\nfor (Produit p : panier) {\n    sb.append(p.nom())                       // chaînage fluide : append renvoie this\n      .append(" × ").append(p.quantite())\n      .append(" = ").append(p.total()).append(" F\\n");\n}\nsb.setLength(sb.length() - 1);             // retire le dernier \\n\nString ticket = sb.toString();             // LE moment où la String naît' },
            { t: 'h3', h: 'Ce qui se passe physiquement' },
            { t: 'p', h: 'Un StringBuilder gère un **tableau de char interne** plus grand que nécessaire : `append` écrit dans l\'espace libre (coût quasi nul), et quand le tampon est plein il est remplacé par un tableau deux fois plus grand — comme l\'ArrayList des caractères. Donner une capacité initiale réaliste (`new StringBuilder(128)`) évite quelques copies, mais le gain majeur, c\'est de ne créer **qu\'un seul tampon et une seule String finale** au lieu d\'un objet par étape.' },
            { t: 'ul', items: [
              '`length()` / `capacity()` : le contenu utile vs la taille du tampon.',
              '`append(x)` accepte tout (String, int, double, Object…) ; `insert(i, x)`, `delete(début, fin)`, `reverse()` complètent la panoplie.',
              '`setLength(n)` tronque (ou allonge de caractères nuls) — parfait pour couper un séparateur final.',
              'Le chaînage (`a().b().c()`) rend la construction lisible : chaque méthode retourne `this`.'
            ] },
            { t: 'h3', h: 'Là où tu peux garder tes + tranquillement' },
            { t: 'p', h: 'Le compilateur **optimise déjà une expression unique** avec `+` en StringBuilder. Crois donc : `String ligne = nom + " — " + prix + " F";` est parfaitement écrit — une seule expression, un seul tampon synthétique par la JVM. Le problème ne se pose **que lorsque la concaténation s\'étale sur plusieurs instructions**, typiquement une boucle ou des appels de méthodes successifs.' },
            { t: 'code', lang: 'java', label: 'Ce qui est optimisé — et ce qui ne l\'est pas', code:
'// ✓ BIEN : une seule expression → javac génère un StringBuilder tout seul\nString ligne = p.nom() + " : " + p.prix() + " F";\n\n// ✗ MAL : boucle → chaque itération recrée tampon ET chaîne\nString ticket = "";\nfor (Produit p : panier) { ticket += ligne; }\n\n// ✓ BIEN : un StringBuilder stable tout du long\nStringBuilder sb = new StringBuilder();\nfor (Produit p : panier) { sb.append(ligne); }' },
            { t: 'h3', h: 'Et StringBuffer, le frère synchronisé ?' },
            { t: 'p', h: '`StringBuffer` offre *la même API*, avec chaque méthode déclarée `synchronized` — il date de Java 1.0, à l\'époque où « tout synchroniser » semblait une bonne idée. En pratique, un tampon de construction sert *à l\'intérieur d\'une méthode*, donc d\'un seul thread : la synchronisation ne fait que ralentir. **Réflexe moderne : StringBuilder partout.** StringBuffer ne se justifie que pour un tampon réellement partagé entre threads — et dans ce cas, il y a souvent mieux à faire côté conception.' },
            { t: 'callout', kind: 'tip', h: 'Pour joindre une collection avec un séparateur, pas besoin de boucle : `String.join(" · ", noms)` depuis Java 8, ou `stream.map(Produit::nom).collect(Collectors.joining(" · "))`. Le StringBuilder manuel reste pour les constructions structurées (gabarits, rapports).' }
          ],
          errors: [
            { title: 'La concaténation en boucle (complexité cachée)', lang: 'java', bad:
'String csv = "";\nfor (Vente v : ventesDuMois) {                    // 20 000 ventes ?\n    csv += v.date() + ";" + v.montant() + "\\n";   // ~20 000 objets String …\n}                                                  // …et des COPIES totales répétées',
              good:
'StringBuilder csv = new StringBuilder(64_000);     // dimensionner si on sait\nfor (Vente v : ventesDuMois) {\n    csv.append(v.date()).append(\';\').append(v.montant()).append(\'\\n\');\n}\nString rapport = csv.toString();                   // 1 tampon + 1 String ✓',
              why: 'Chaque `+=` recopie l\'intégralité du texte accumulé : le coût total croît avec le *carré* du nombre de lignes. Une export de 20 000 ventes passe alors de quelques millisecondes (StringBuilder) à plusieurs secondes, avec un GC qui s\'affole en prime. La règle est sans exception : boucle + concaténation = StringBuilder.' },
            { title: 'StringBuffer par habitude « au cas où il y aurait des threads »', lang: 'java', bad:
'StringBuffer sb = new StringBuffer();   // synchronized sur CHAQUE append —\nfor (Produit p : panier) { sb.append(p.nom()); }   // …pour rien : usage local',
              good:
'StringBuilder sb = new StringBuilder();  // confiné à la méthode = un seul thread ✓\nfor (Produit p : panier) { sb.append(p.nom()); }',
              why: 'La synchronisation a un coût (verrou pris/relâché à chaque appel) même sans contention. Un tampon de construction vit le temps d\'une méthode : aucun second thread ne le voit jamais, le verrou ne protège donc rien. Choisir StringBuffer « par sûreté » ralentit le code sans acheter la moindre sécurité.' },
            { title: 'Renvoyer ou stocker le builder au lieu de la chaîne', lang: 'java', bad:
'public String getTicket() {\n    // … construction dans sb …\n    return this.tampon;        // ✗ un StringBuilder N\'EST PAS une String\n}                              // error: incompatible types',
              good:
'public String getTicket() {\n    return tampon.toString();  // la conversion explicite, au dernier moment ✓\n}\n// Bonus : conserver ce tampon en champ d\'instance exposerait\n// un état MUTABLE — une fuite d\'encapsulation.',
              why: 'StringBuilder et String ne partagent aucune relation d\'héritage : il faut `toString()` pour convertir. Au-delà du compile error immédiat, la leçon est architecturale : le builder est un *outil de chantier interne*, la String immuable est le *produit fini* — seul le produit fini traverse les frontières de ton code.' }
          ],
          related: ['java-string-immutable', 'java-streams-api', 'java-synchronized', 'java-encapsulation']
        }
      ]
    },

    /* ======================================================
       5. COLLECTIONS FRAMEWORK
       ====================================================== */
    {
      id: 'collections',
      name: 'Collections Framework',
      icon: 'view_module',
      fiches: [
        {
          id: 'java-collections-hierarchie',
          title: 'La hiérarchie du Collections Framework',
          icon: 'view_module',
          level: 'Intermédiaire',
          tagline: 'List, Set, Queue d\'un côté, Map de l\'autre : la carte du territoire avant de choisir son conteneur.',
          intro: 'Avant de courir à `ArrayList` partout, prends dix minutes pour lire la **carte**: le Collections Framework est un petit jeu d\'**interfaces** (`List`, `Set`, `Queue`, `Map`) incarnées par des **implémentations** aux compromis précis (`ArrayList`, `HashSet`, `TreeMap`…). Programmer contre les interfaces et choisir l\'implémentation en connaissance de cause, c\'est 80 % de l\'art des collections.',
          blocks: [
            { t: 'code', lang: 'text', label: 'L\'arborescence à retenir', code:
'Iterable                              ◄ parcourable (for-each)\n  └ Collection                        ◄ taille, add, remove…\n      ├ List      ordonnée + DOUBLONS + index\n      │            ├ ArrayList      (tableau redimensionné — le défaut)\n      │            └ LinkedList     (chaînage — files particulières)\n      ├ Set       PAS de doublons (equals/hashCode)\n      │            ├ HashSet        (rapide, non ordonné)\n      │            ├ LinkedHashSet  (ordre d\'insertion)\n      │            └ TreeSet        (trié — NavigableSet)\n      └ Queue     file d\'attente (FIFO) — PriorityQueue, ArrayDeque\n\nMap           clé → valeur (N\'HÉRITE PAS de Collection !)\n               ├ HashMap        (rapide, non ordonnée)\n               ├ LinkedHashMap  (ordre d\'insertion — base d\'un LRU)\n               └ TreeMap        (triée par clé)' },
            { t: 'p', h: '**Deux mondes séparés** : `Collection` d\'un côté (des *éléments*), `Map` de l\'autre (des *associations* clé→valeur). `Map` n\'étend pas `Collection` — on ne fait pas `map.add(…)`, on fait `map.put(clé, valeur)`. C\'est la question de cours la plus posée, retiens-la.' },
            { t: 'h3', h: 'La question qui décide du conteneur' },
            { t: 'table', head: ['Besoin', 'Choix par défaut', 'Complexité typique'], rows: [
              ['suite ordonnée, accès par index, doublons ok', 'ArrayList', 'get O(1), add fin amorti O(1)'],
              ['unicité, appartenance très rapide', 'HashSet', 'add/contains O(1)'],
              ['unicité + ordre trié', 'TreeSet', 'add/contains O(log n)'],
              ['associations clé→valeur rapides', 'HashMap', 'put/get O(1)'],
              ['associations ordonnées par clé', 'TreeMap', 'put/get O(log n)'],
              ['file FIFO', 'ArrayDeque', 'offer/poll O(1)']
            ] },
            { t: 'p', h: 'Réflexe professionnel : **déclare avec l\'interface, instancie l\'implémentation** — `List<String> noms = new ArrayList<>();`. Ta méthode exposera `List`, pas `ArrayList` : tu pourras changer l\'implémentation demain sans impacter personne. Le losange `<>` (diamond) laisse le compilateur déduire le type.' },
            { t: 'h3', h: 'List.of, Map.of : les usines immuables de Java 9' },
            { t: 'code', lang: 'java', label: 'Trois façons de « créer une liste » — trois contrats', code:
'List<String> a = new ArrayList<>(List.of("gari", "riz"));\na.add("huile");                 // ✓ liste MODIFIABLE\n\nList<String> b = Arrays.asList("gari", "riz");\nb.set(0, "attiéké");            // ✓ remplacement ok…\nb.add("huile");                 // ✗ UnsupportedOperationException : TAILLE FIXE !\n\nList<String> c = List.of("gari", "riz", "huile");\nc.set(1, "x");                  // ✗ IMMUABLE : ni add, ni set, ni remove\n\nMap<String, Integer> prix = Map.of("gari", 2500, "riz", 3500);  // immuable ✓' },
            { t: 'callout', kind: 'tip', h: 'Pour les constants métier (« opérateurs du Bénin », « taxes applicables »), `List.of`/`Set.of`/`Map.of` sont parfaits : pas d\'allocation inutile, impossibles à corrompre par un appelant. Ne les confonds plus jamais avec `Arrays.asList`, la fausse bonne idée à taille fixe héritée de Java 5.' },
            { t: 'p', h: 'Et la classe utilitaire **`java.util.Collections`** (avec un s) : `sort`, `shuffle`, `reverse`, `unmodifiableList`, `synchronizedMap`… Une armurerie statique qui complète les interfaces — passage obligé pour les vues en lecture seule qui protègent ton encapsulation.' }
          ],
          errors: [
            { title: 'Traiter une Map comme une Collection', lang: 'java', bad:
'Map<String, Integer> stock = new HashMap<>();\nstock.add("gari", 120);            // ✗ error: add n\'existe PAS\nfor (String kv : stock) { /* … */ }  // ✗ Map n\'est pas Iterable non plus !',
              good:
'stock.put("gari", 120);\nfor (Map.Entry<String, Integer> e : stock.entrySet()) {\n    System.out.println(e.getKey() + " → " + e.getValue());\n}\n// ou : stock.forEach((produit, qte) -> …);   // BiConsumer, Java 8+',
              why: '`Map` n\'hérite PAS de `Collection` : pas de `add`, pas d\'itérateur direct. L\'itération passe par une *vue* — `keySet()`, `values()`, `entrySet()` — ou par `forEach` avec deux arguments. C\'est la faute de design la plus fréquente des premiers contacts avec Map, et elle est entièrement de bonne foi : l\'arborescence montre pourquoi les deux mondes sont cousins mais séparés.' },
            { title: 'Recruter Vector et Hashtable comme en 1998', lang: 'java', bad:
'Vector<String> noms = new Vector<>();          // synchronisé partout, lent\nHashtable<String, Integer> t = new Hashtable<>(); // pareil + null interdit',
              good:
'List<String> noms = new ArrayList<>();                    // ✓ défaut\nMap<String, Integer> t = new HashMap<>();                 // ✓ défaut\n// Vraie concurrence ? ConcurrentHashMap, CopyOnWriteArrayList —\n// des structures CONÇUES pour, pas des méthodes toutes synchronized.',
              why: '`Vector` et `Hashtable` date du Java 1.0 : chaque méthode est `synchronized`, ce qui paie un verrou à chaque appel sans même garantir la cohérence des compositions (contains-then-add reste une course). Des structures concurrentes modernes et bien plus fines existent depuis Java 5 (`java.util.concurrent`). Ces deux ancêtres survivent uniquement pour compatibilité.' },
            { title: 'Prendre LinkedList « pour les performances » sans mesurer', lang: 'java', bad:
'List<Produit> stock = new LinkedList<>();\nfor (int i = 0; i < stock.size(); i++) {\n    traiter(stock.get(i));    // get(i) = O(n) → boucle O(n²) catastrophique !',
              good:
'List<Produit> stock = new ArrayList<>();   // get(i) = O(1) ✓\nfor (Produit p : stock) { traiter(p); }    // ou : for-each (itérateur)\n// LinkedList n\'est bonne que comme Deque (offer/poll aux deux bouts) —\n// et même là, ArrayDeque est presque toujours plus rapide.',
              why: 'Dans une LinkedList, atteindre l\'élément i exige de parcourir i maillons : les petites insertions « O(1) » dont parlent les vieux tutoriels sont noyées sous les traversées réelles et le coût mémoire des nœuds pointés de partout (le cache processeur déteste ça). ArrayList, contiguë, gagne dans ~95 % des cas mesurés. « En cas de doute : ArrayList » est la règle officielle du JDK depuis 20 ans.' }
          ],
          related: ['java-list', 'java-set', 'java-map', 'java-generics-bases']
        },

        {
          id: 'java-list',
          title: 'ArrayList et LinkedList',
          icon: 'format_list_bulleted',
          level: 'Débutant',
          tagline: 'La liste ordonnée qui accepte les doublons : ArrayList pour tout faire — LinkedList pour les rares cas qui le méritent.',
          intro: 'La `List` est la collection du quotidien : une **suite ordonnée** d\'éléments, indexée, qui **accepte les doublons**. « Ordonnée » veut dire : les éléments restent dans l\'ordre où tu les as insérés. Deux implémentations dominent — `ArrayList`, un tableau qui grandit tout seul, et `LinkedList`, une chaîne de nœuds. Voyons leurs mécaniques pour choisir lucidement.',
          blocks: [
            { t: 'h3', h: 'ArrayList : un tableau qui se redimensionne' },
            { t: 'p', h: 'Dedans, simple : un **tableau interne** plus grand que le nombre d\'éléments. `add` écrit dans la première case libre — sauf quand le tableau est plein : il est alors remplacé par un tableau **1,5× plus grand**, copie comprise. Ce coût de copie *amorti* sur des milliers d\'ajouts rend le `add` final quasi constant. Et l\'accès `get(i)` ? Une case de tableau : instantané.' },
            { t: 'code', lang: 'java', label: 'Les opérations de la vie d\'une liste', code:
'List<String> courses = new ArrayList<>();      // diamond : type déduit\ncourses.add("gari");             // [gari]\ncourses.add(0, "eau minérale");  // insertion en tête : décale tout (O(n))\ncourses.add("gari");             // [eau minérale, gari, gari] — doublon OK ✓\ncourses.get(1);                  // "gari" — accès par index : O(1)\ncourses.indexOf("gari");         // 1 : première occurrence\ncourses.remove("gari");          // retire la PREMIÈRE occurrence\ncourses.size();                  // taille logique, pas la capacité interne' },
            { t: 'table', head: ['Opération', 'ArrayList', 'LinkedList'], rows: [
              ['get(i) par index', 'O(1)', 'O(n) — traverse i nœuds'],
              ['add en fin', 'O(1) amorti', 'O(1)'],
              ['add/remove au milieu', 'O(n) — décale le tableau', 'O(n) — traverse d\'abord'],
              ['mémoire par élément', 'faible (contigu)', 'élevée (2 pointeurs + objet nœud)'],
              ['parcours for-each', 'cache-friendly, très rapide', 'saute en mémoire, lent']
            ] },
            { t: 'p', h: 'Vérité de terrain qui surprend : même pour **insérer au milieu**, ArrayList gagne souvent. Décaler des cases d\'un tableau contigu est *extrêmement* rapide chez les processeurs modernes (copies mémoire en rafales), alors que LinkedList doit d\'abord **marcher** jusqu\'au milieu en suivant des pointeurs dispersés. LinkedList ne se justifie réellement que comme file double extrémité (`Deque`)… où `ArrayDeque` la bat encore la plupart du temps.' },
            { t: 'h3', h: 'Modifier en itérant : l\'exception qui protège tes données' },
            { t: 'code', lang: 'java', label: 'La bonne et la mauvaise manière de purger', code:
'List<Produit> panier = new ArrayList<>(List.of(riz, gari, huile));\n\n// ✗ MAL : retirer pendant le for-each\nfor (Produit p : panier) {\n    if (p.stock() == 0) panier.remove(p);   // ConcurrentModificationException !\n}\n\n// ✓ BIEN, option 1 : removeIf (Java 8) — lisible, correct, court\npanier.removeIf(p -> p.stock() == 0);\n\n// ✓ BIEN, option 2 : l\'Iterator officieux\nfor (Iterator<Produit> it = panier.iterator(); it.hasNext(); ) {\n    if (it.next().stock() == 0) it.remove();   // retrait VIA l\'itérateur = autorisé\n}' },
            { t: 'p', h: 'La `ConcurrentModificationException` (CME) n\'est **pas** un bug de la bibliothèque : c\'est un mécanisme *fail-fast* de l\'itérateur, qui détecte que la liste a été modifiée « dans son dos » et refuse de continuer à parcourir une structure incohérente. Remarque qu\'elle peut aussi surgir en mono-thread — elle ne parle pas forcément de concurrence.' },
            { t: 'callout', kind: 'tip', h: 'Tu connais la taille à l\'avance (import de 50 000 lignes) ? `new ArrayList<>(50_000)` pré-dimensionne le tableau : zéro redimensionnement en route. La taille logique démarre à 0 — seule la capacité est réservée.' }
          ],
          errors: [
            { title: 'Retirer d\'une liste pendant un for-each (CME)', lang: 'java', bad:
'for (Produit p : panier) {\n    if (p.prix() <= 0) {\n        panier.remove(p);      // ConcurrentModificationException au tour suivant\n    }\n}',
              good:
'panier.removeIf(p -> p.prix() <= 0);                // ✓ la voie Java 8\n// ou manuellement :\nIterator<Produit> it = panier.iterator();\nwhile (it.hasNext()) {\n    if (it.next().prix() <= 0) it.remove();          // ✓ retrait par l\'itérateur\n}',
              why: 'Le for-each cache un `Iterator` qui surveille un compteur de modifications structurelles de la liste. Ton `panier.remove(p)` incrémente ce compteur sans passer par lui : l\'itérateur s\'en aperçoit et jette la CME — une protection, pas un caprice. `it.remove()` ou `removeIf` modifient *à travers* l\'itérateur : le compteur reste cohérent, tout est légal.' },
            { title: 'Écrire une boucle for classique sur une LinkedList', lang: 'java', bad:
'List<Vente> ventes = new LinkedList<>();\n// … 100 000 ventes …\nfor (int i = 0; i < ventes.size(); i++) {\n    total += ventes.get(i).montant();   // chaque get(i) retraverse depuis le début !\n}                                        // → des minutes au lieu de millisecondes',
              good:
'for (Vente v : ventes) {              // itérateur : avance de nœud en nœud ✓\n    total += v.montant();\n}\n// ou mieux, avant même la boucle : revoir le choix d\'implémentation —\n// ici une ArrayList aurait rendu le for classique inoffensif.',
              why: '`get(i)` sur LinkedList est O(n) : une boucle complète coûte O(n²) — 100 000 éléments, c\'est de l\'ordre de 5 milliards d\'étapes de nœuds. Le for-each utilise l\'itérateur, qui *se souvient* de sa position : parcours O(n) quel que soit le type de liste. C\'est l\'exemple canonique où le choix de la mauvaise implémentation + la mauvaise boucle = catastrophe de production.' },
            { title: 'Confondre Arrays.asList avec une vraie liste', lang: 'java', bad:
'List<String> tags = Arrays.asList("promo", "ramadan");\ntags.add("aid");          // ✗ UnsupportedOperationException !\n// Pourtant tags.set(0, "soldes")… fonctionne ?!',
              good:
'// Pour une liste immuable : List.of("promo", "ramadan");           ✓\n// Pour une liste MODIFIABLE pré-remplie :\nList<String> tags = new ArrayList<>(List.of("promo", "ramadan"));   ✓',
              why: '`Arrays.asList` retourne une **vue sur le tableau d\'origine** : taille fixe par construction (on ne peut pas allonger un tableau !), mais `set` possible puisqu\'il ne change pas la taille. Ce contrat étrange — ni modifiable ni immuable — piège tout le monde une fois. Depuis Java 9, `List.of` (immuable) ou un copiage explicite dans ArrayList rendent l\'intention lisible.' }
          ],
          related: ['java-set', 'java-collections-hierarchie', 'java-map', 'java-streams-api']
        },

        {
          id: 'java-set',
          title: 'HashSet, LinkedHashSet et TreeSet',
          icon: 'checklist',
          level: 'Intermédiaire',
          tagline: 'Pas deux fois le même article sur l\'étal : HashSet pour la vitesse, TreeSet pour l\'ordre trié.',
          intro: 'Un `Set` modélise un **référentiel sans doublons** : y ajouter deux fois le même élément ne change rien. C\'est l\'outil de la déduplication et des tests d\'appartenance ultra-rapides. Mais tout repose sur un contrat que Java te confie : `equals()` et `hashCode()` définissent *ce que « le même » veut dire*. Mal tenir ce contrat, et ton Set devient un trou noir.',
          blocks: [
            { t: 'h3', h: 'Trois implémentations, trois promesses' },
            { t: 'table', head: ['Implémentation', 'Ordre garanti', 'Coût add/contains', 'Exige'], rows: [
              ['HashSet', 'aucun (aléatoire en apparence)', 'O(1)', 'equals + hashCode corrects'],
              ['LinkedHashSet', 'ordre d\'insertion', 'O(1)', 'equals + hashCode corrects'],
              ['TreeSet', 'tri naturel ou Comparator', 'O(log n)', 'Comparable ou Comparator']
            ] },
            { t: 'code', lang: 'java', label: 'La déduplication en quatre lignes', code:
'String[] saisies = {"gari", "riz", "gari", "huile", "riz"};\nSet<String> referentiel = new HashSet<>();\nfor (String s : saisies) referentiel.add(s);\nSystem.out.println(referentiel);          // [gari, riz, huile] — doublons absorbés\nreferentiel.contains("riz");              // true, en O(1) :\n// hash du mot → CASE du tableau interne → vérification equals dans la case' },
            { t: 'h3', h: 'Le contrat equals/hashCode : ce que le Set attend de toi' },
            { t: 'p', h: 'Un HashSet range chaque élément dans une **case calculée depuis son `hashCode()`**, puis utilise `equals()` pour distinguer les éléments tombant dans la même case. D\'où le contrat sacré : **deux objets égaux selon `equals()` DOIVENT avoir le même `hashCode()`**. Si tu redéfinis `equals` sans `hashCode`, deux objets « identiques » atterrissent dans des cases différentes : le doublon passe, `contains` dit false sur un objet pourtant présent.' },
            { t: 'code', lang: 'java', label: 'L\'objet perdu faute de hashCode', code:
'class Article {\n    final String nom;\n    Article(String nom) { this.nom = nom; }\n    @Override public boolean equals(Object o) {\n        return o instanceof Article a && a.nom.equals(nom);   // redéfini ✓\n    }\n    // …mais hashCode NON redéfini → hérité d\'Object : basé sur l\'ADRESSE !\n}\nSet<Article> rayon = new HashSet<>();\nrayon.add(new Article("savon"));\nrayon.contains(new Article("savon"));   // false !  — l\'objet est LÀ, invisible\nrayon.add(new Article("savon"));        // accepté : rayon.size() == 2\n\n// ✓ La solution de 2026 : laisser un record écrire les DEUX, correctement :\nrecord ArticleR(String nom) { }         // equals + hashCode d\'après les champs' },
            { t: 'ul', items: [
              '**Déduit les deux des mêmes champs** : ce qui définit « même » dans equals doit entrer dans hashCode — sinon la règle d\'or casse dans l\'autre sens.',
              '**Un hashCode n\'est pas une identité unique** : deux objets différents *peuvent* partager un hash (collision) ; equals tranche. L\'inverse (égaux mais hash différent) est interdit.',
              '**Le record est ton ami** : ses equals/hashCode/toString générés sont corrects *par construction*.',
              '**TreeSet n\'utilise PAS equals** : il juge l\'égalité au `compareTo() == 0` — un TreeSet et un HashSet peuvent donc « voir » des ensembles différents !'
            ] },
            { t: 'callout', kind: 'warn', h: 'Ne mute JAMAIS un champ participant au hashCode après insertion : le hash change, l\'objet reste dans son ancienne case — il devient introuvable pour le Set, définitivement perdu. Les éléments d\'un HashSet et les clés d\'un HashMap doivent être immuables (String, Integer, records…).' }
          ],
          errors: [
            { title: 'Redéfinir equals sans hashCode (le piège réglementaire)', lang: 'java', bad:
'@Override\npublic boolean equals(Object o) {\n    return o instanceof Article a && a.nom.equals(nom);\n}\n// et… rien d\'autre. hashCode() hérite d\'Object (adresse mémoire).\nSet<Article> s = new HashSet<>();\ns.add(new Article("gari"));\ns.contains(new Article("gari"));   // false → doublons acceptés, trou noir',
              good:
'@Override public boolean equals(Object o) {\n    return o instanceof Article a && a.nom.equals(nom);\n}\n@Override public int hashCode() {\n    return Objects.hash(nom);        // dérivé des MÊMES champs que equals ✓\n}\n// ✨ et si la classe est un simple porteur de données : laisse un record faire.',
              why: 'HashSet/HashMap font appel à hashCode() *avant* equals(). Des objets égaux selon ton equals mais de hash différents iront dans des cases distinctes : le Set ne les comparera jamais entre eux. Résultat observé : contains false, doublons acceptés, size qui gonfle. L\'IDE ou un record génèrent le couple correct — ne l\'écris jamais qu\'à moitié à la main.' },
            { title: 'Muter un élément après l\'avoir rangé', lang: 'java', bad:
'Set<Produit> stock = new HashSet<>();\nProduit p = new Produit("gari", 2_500);   // hash calculé sur nom+prix\nstock.add(p);\np.setPrix(2_800);                          // hash CHANGÉ, case inchangée !\nstock.contains(p);                         // false : il se cherche dans la\n                                          // mauvaise case — perdu pour le Set',
              good:
'// 1. N\'utilise que des éléments IMMUABLES (record, String, Integer) ✓\n// 2. Ou, si la mutation est métier : sortir, modifier, re-ranger :\nstock.remove(p);\np.setPrix(2_800);\nstock.add(p);',
              why: 'Le HashSet a rangé l\'objet dans la case de son *ancien* hash. Modifier un champ du hash le fait « déménager » logiquement sans bouger physiquement : contains le cherche à sa nouvelle adresse et ne le trouve pas. C\'est une corruption silencieuse — ni exception ni log. L\'immuabilité des éléments (et des clés de Map) est la protection définitive.' },
            { title: 'Ranger dans un TreeSet sans ordre défini : ClassCastException', lang: 'java', bad:
'record Etudiant(String nom) { }               // pas de Comparable\nSet<Etudiant> classe = new TreeSet<>();\nclasse.add(new Etudiant("Awa"));              // ClassCastException :\n// Etudiant cannot be cast to Comparable',
              good:
'// Option 1 : l\'ordre naturel fait partie du type\nrecord Etudiant(String nom) implements Comparable<Etudiant> {\n    @Override public int compareTo(Etudiant e) { return nom.compareTo(e.nom); }\n}\n// Option 2 : le tri est contextuel → Comparator externe à la construction\nSet<Etudiant> classe = new TreeSet<>(Comparator.comparing(Etudiant::nom));',
              why: 'TreeSet maintient ses éléments *triés* dans un arbre rouge-noir : chaque insertion exige de comparer. Si tu n\'as fourni ni `Comparable` naturel ni `Comparator` explicite, le Set tente un cast désespéré qui explose au premier `add`. Le choix des deux options : ordre *intrinsèque et unique* → Comparable ; ordre *parmi d\'autres* → Comparator.' }
          ],
          related: ['java-map', 'java-comparable-comparator', 'java-records', 'java-list']
        },

        {
          id: 'java-map',
          title: 'HashMap, LinkedHashMap et TreeMap',
          icon: 'table',
          level: 'Intermédiaire',
          tagline: 'Des paires clé → valeur fulgurantes : l\'annuaire de Cotonou dans ton programme, du HashMap au cache LRU.',
          intro: 'La `Map` associe une **clé** à une **valeur** : numéro → client, produit → stock, session → panier. C\'est la structure la plus rentable de l\'informatique quotidienne — et la plus utilisée des entretiens. Sous son capot, le même mécanisme que HashSet (hash → case), des méthodes de composition formidables depuis Java 8, et trois implémentations aux ordres de parcours différents.',
          blocks: [
            { t: 'h3', h: 'La mécanique du HashMap' },
            { t: 'p', h: 'Au `put`, la Map calcule `hashCode()` de la clé, en déduit une **case** d\'un tableau interne (le bucket), et y range l\'entrée. Au `get`, même calcul : elle va *directement* à la bonne case et distingue les collisions avec `equals()` — d\'où le O(1) légendaire. Quand une case déborde (plus de ~8 entrées), elle devient un petit arbre rouge-noir : dégradation douce en O(log n) au lieu d\'O(n). **Tout repose sur la stabilité du hash de la clé** : clés immuables obligatoires — String et Integer sont parfaits, les records aussi.' },
            { t: 'code', lang: 'java', label: 'Le quotidien avec une Map', code:
'Map<String, Integer> stock = new HashMap<>();\nstock.put("gari", 120);\nstock.get("gari");                    // 120 — ou null si absente : voir les pièges !\nstock.getOrDefault("huile", 0);       // 0 : pas de null, pas de NPE à l\'unboxing\nstock.putIfAbsent("gari", 999);       // existe déjà → inchangé (120)\nstock.merge("gari", 30, Integer::sum); // 150 : « additionne » proprement ✨\n\nstock.forEach((produit, qte) -> System.out.println(produit + " : " + qte));' },
            { t: 'code', lang: 'java', label: 'Le comptage par catégorie — le refrain des entretiens', code:
'Map<String, Integer> ventesParProduit = new HashMap<>();\nfor (Vente v : ventes) {\n    ventesParProduit.merge(v.produit(), v.quantite(), Integer::sum);\n}\n// une ligne « merge » remplace tout le if containsKey / put du siècle dernier.\n// Équivalent avec une liste à créer à la volée :\nMap<String, List<Vente>> parClient = new HashMap<>();\nparClient.computeIfAbsent(nomClient, k -> new ArrayList<>()).add(vente);' },
            { t: 'h3', h: 'Les trois implémentations' },
            { t: 'table', head: ['Map', 'Ordre de parcours', 'Coût', 'Atout signature'], rows: [
              ['HashMap', 'aucun', 'O(1)', 'la vitesse pure — une clé null tolérée'],
              ['LinkedHashMap', 'ordre d\'insertion (ou d\'accès)', 'O(1)', 'le cache LRU en 4 lignes'],
              ['TreeMap', 'tri par clé', 'O(log n)', 'NavigableMap : floor/ceiling/tailMap']
            ] },
            { t: 'code', lang: 'java', label: 'LinkedHashMap en mode cache LRU', code:
'// accessOrder = true : chaque get « rafraîchit » l\'entrée (elle recule en fin)\nMap<String, Session> cache = new LinkedHashMap<>(16, 0.75f, true) {\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<String, Session> eldest) {\n        return size() > 1_000;      // la plus ancienne saute au-delà de 1000\n    }\n};\n// Un cache borné, sans fuite, sans bibliothèque externe. Le rêve.' },
            { t: 'p', h: 'Pour les constantes, Java 9 apporte `Map.of("gari", 2500, "riz", 3500)` (jusqu\'à 10 paires) et `Map.ofEntries(entry(…), …)` au-delà — immuables, compacts, sans `null` toléré. Parfait pour les grilles tarifaires figées.' },
            { t: 'callout', kind: 'tip', h: 'Test d\'appartenance : `containsKey`. Récupération en une passe : la valeur de retour de `get` — jamais le duo `if (contains) get()` qui interroge deux fois la même case. Et surtout, note ce réflexe de pro : **`getOrDefault` pour les compteurs, `computeIfAbsent` pour les accumulateurs, `merge` pour les totaux**.' }
          ],
          errors: [
            { title: 'Une clé mutable dont l\'état change après le put', lang: 'java', bad:
'class Client { String numero; /* + setter */ }\nMap<Client, Double> soldes = new HashMap<>();\nClient awa = new Client();\nawa.numero = "97000000";\nsoldes.put(awa, 1_200.0);\nawa.numero = "91000000";      // le hash de la clé CHANGE sous la Map !\nsoldes.get(awa);              // null — la clé existe pourtant… perdue',
              good:
'// ✓ Clé immuable et STABLE : record / String / Integer\nrecord Client(String numero) { }\nMap<Client, Double> soldes = new HashMap<>();\n// ou mieux sémantiquement : la clé est directement le numéro\nMap<String, Double> soldesParNumero = new HashMap<>();',
              why: 'Comme pour HashSet, la clé a été rangée dans la case de son *ancien* hash ; la modifier la déplace logiquement sans la déplacer physiquement — contains et get fouillent une autre case et ne la retrouvent plus. Le bug est silencieux, sans exception, et temporellement distant de sa cause. Règle absolue : **clés immuables — String, Integer, enum, records**.' },
            { title: 'Unboxing sauvage du retour de get : NPE en embuscade', lang: 'java', bad:
'Map<String, Integer> stock = new HashMap<>();\nint qte = stock.get("huile");    // get renvoie null (absente)\n                                  // → unboxing automatique → NullPointerException !',
              good:
'int qte = stock.getOrDefault("huile", 0);              // ✓ valeur par défaut\n// ou si null est un SIGNAL à traiter différemment :\nInteger q = stock.get("huile");\nif (q == null) { /* cas « jamais approvisionné » */ } else { int qte = q; }',
              why: '`get` retourne un objet wrapper qui *peut* être null ; l\'assigner à un primitif déclenche un unboxing immédiat — la NPE classique, ici camouflée derrière l\'air inoffensif de la ligne. Trois saluts : getOrDefault, traiter le null explicitement, ou revoir l\'API. Ce motif (« wrapper de Map → primitif ») est le deuxième grand générateur de NPE après le null direct.' },
            { title: 'Modifier la structure en pleine itération', lang: 'java', bad:
'for (Map.Entry<String, Integer> e : stock.entrySet()) {\n    if (e.getValue() == 0) stock.remove(e.getKey());   // CME !\n}',
              good:
'stock.entrySet().removeIf(e -> e.getValue() == 0);     // ✓ Java 8\n// ou modifier les valeurs en place quand la STRUCTURE ne change pas :\nstock.replaceAll((produit, qte) -> qte + 10);          // ✓ réassort global',
              why: 'Comme les listes, les vues d\'une Map (entrySet, keySet) emploient des itérateurs *fail-fast* : retirer une entrée en passant par la Map pendant le parcours casse leur compteur interne — ConcurrentModificationException. Les méthodes `removeIf`, `replaceAll` et `compute` parcourent elles-mêmes la structure *à l\'intérieur* : ce sont les portes légales.' }
          ],
          related: ['java-set', 'java-comparable-comparator', 'java-streams-api', 'java-garbage-collector']
        },

        {
          id: 'java-comparable-comparator',
          title: 'Comparable vs Comparator',
          icon: 'sort',
          level: 'Intermédiaire',
          tagline: 'Comparable grave un ordre naturel dans l\'objet ; Comparator est un juge externe, composable à l\'infini.',
          intro: 'Trier exige une réponse à une question simple : « qui passe devant qui ? » Java offre deux façons de la donner. **`Comparable`** est écrite *dans* la classe — un **ordre naturel** unique. **`Comparator`** est une fonction externe, passée au tri — autant d\'**ordres contextuels** que tu veux. Savoir les distinguer (et éviter leurs deux pièges mortels) est indispensable dès qu\'un `TreeSet`, un `sort()` ou un `Stream.sorted()` entre en jeu.',
          blocks: [
            { t: 'h3', h: 'Comparable : l\'ordre naturel, écrit une fois pour toutes' },
            { t: 'code', lang: 'java', label: 'Un produit qui sait se comparer', code:
'public record Produit(String nom, int prix) implements Comparable<Produit> {\n    @Override\n    public int compareTo(Produit autre) {\n        return Integer.compare(prix, autre.prix);   // ordre naturel : prix croissant\n    }\n}\n\nList<Produit> rayon = new ArrayList<>(List.of(gari, riz, huile));\nrayon.sort(null);                  // null = « utilise compareTo » ✓\nSet<Produit> trie = new TreeSet<>(rayon);   // TreeSet l\'exploite automatiquement' },
            { t: 'p', h: 'La convention de `compareTo` est une **table de trois signes** : négatif → `this` *avant* l\'autre ; zéro → « équivalents pour le tri » ; positif → *après*. Toute la plateforme s\'y conforme (`String`, `Integer`, `LocalDate`…), et `Collections.sort` / `list.sort(null)` / `TreeSet` / `Arrays.sort` consomment cet ordre sans configuration.' },
            { t: 'h3', h: 'Comparator : le juge externe, souvent une lambda' },
            { t: 'code', lang: 'java', label: 'Composer des critères en une expression', code:
'rayon.sort(Comparator.comparing(Produit::nom));                      // alphabétique\nrayon.sort(Comparator.comparingInt(Produit::prix).reversed());       // prix décroissant\n\n// Le nec plus ultra : critères ENCHAÎNÉS, déclaratifs\nComparator<Produit> tarif = Comparator\n        .comparingInt(Produit::prix)        // 1er critère : prix\n        .thenComparing(Produit::nom);       // ex æquo → le nom départage\nrayon.sort(tarif);\n\nimport static java.util.Comparator.*;\nrayon.sort(nullsFirst(comparing(Produit::nom)));  // tolère même les nulls' },
            { t: 'ul', items: [
              '**`comparing` / `comparingInt/Long/Double`** : choisis la variante primitive pour éviter l\'autoboxing en tri massif.',
              '**`thenComparing`** : chiffres après chiffres, le composeur de critères — fini les cascades de `if` dans les compareTo artisanaux.',
              '**`reversed`, `nullsFirst`, `nullsLast`** : décorateurs prêts à l\'emploi, infiniment plus sûrs que le bricolage manuel.',
              '**Dans un Stream** : `.sorted(Comparator.comparing(Produit::prix))` — le même objet, la même logique.',
              '**Quand utiliser quoi** : un ordre *intrinsèque et stable* (code article, date) → Comparable ; les *présentations* (par prix pour le manager, par nom pour le stock) → Comparator.'
            ] },
            { t: 'h3', h: 'La cohérence compareTo / equals — le trou noir des TreeSet' },
            { t: 'p', h: 'Un TreeSet considère « doublon » tout élément dont `compareTo` retourne 0. Si ton compareTo dit « même prix ⇒ 0 » mais que `equals` compare le nom, ton TreeSet **avalera** tous les produits de même prix après le premier — disparition silencieuse. La règle : compareTo cohérent avec equals, c\'est-à-dire **comparer TOUS les champs d\'identité en cascade** jusqu\'à un départage total.' }
          ],
          errors: [
            { title: 'Comparer par soustraction : le débordement silencieux', lang: 'java', bad:
'list.sort((a, b) -> a.prix() - b.prix());\n// Joli… jusqu\'au jour où a.prix() == -2_000_000_000 (avoir massif)\n// et b.prix() == 1_500_000_000 : la soustraction DÉBORDE,\n// le signe s\'inverse → tri incohérent, voire « Comparison method\n// violates its general contract! » au beau milieu de la prod.',
              good:
'list.sort(Comparator.comparingInt(Produit::prix));      // ✓\n// ou dans un compareTo maison : Integer.compare(a, b)   // jamais « a - b »',
              why: 'La soustraction de deux int peut déborder (overflow) et changer de signe : le comparateur devient intransitif — b > a, mais aussi a > b selon le troisième élément — et l\'algorithme de tri part en violation de contrat, parfois en exception. `Integer.compare` et `Comparator.comparingInt` n\'ont pas ce vice. « Jamais de soustraction dans un comparateur » fait partie des règles d\'Effective Java pour une raison.' },
            { title: 'Un compareTo incomplet : TreeSet qui mange des éléments', lang: 'java', bad:
'record Produit(String nom, int prix) implements Comparable<Produit> {\n    public int compareTo(Produit p) {\n        return Integer.compare(prix, p.prix);   // 0 dès que les PRIX s\'égalisent\n    }\n}\nSet<Produit> s = new TreeSet<>();\ns.add(new Produit("gari", 2500));   // rangé\ns.add(new Produit("riz", 2500));    // compareTo==0 → considéré DOUBLON :\nSystem.out.println(s.size());       // 1 — le riz a DISPARU !',
              good:
'public int compareTo(Produit p) {\n    int parPrix = Integer.compare(prix, p.prix);\n    if (parPrix != 0) return parPrix;\n    return nom.compareTo(p.nom);          // départage TOTAL ✓\n}\n// et en record, le plus simple : Comparator.comparingInt(Produit::prix)\n//                                    .thenComparing(Produit::nom)',
              why: 'Les structures triées (TreeSet, TreeMap, PriorityQueue) n\'appellent JAMAIS equals() : elles déclarent « même » ce que `compareTo`/`compare` déclare « 0 ». Un critère partiel fait donc *toujours* perdre des éléments, sans la moindre erreur. La règle pratique : la comparaison doit descendre jusqu\'à un critère discriminant (id, nom unique) — et rester cohérente avec equals autant que possible.' },
            { title: 'Le comparateur maison « parfois faux » : Integer.signum bidouillé', lang: 'java', bad:
'Comparator<Produit> c = (a, b) -> Integer.signum(a.prix() - b.prix());\n// signum ne cache pas le débordement : même overflow que « a - b » !',
              good:
'Comparator<Produit> c = Comparator.comparingInt(Produit::prix);',
              why: 'Enrouler la soustraction dans `signum` change tout sauf l\'essentiel : `a.prix() - b.prix()` est calculé *avant* signum, donc l\'overflow produit déjà le mauvais signe. La cosmétique ne sauve pas une base arithmétique fautive — d\'où l\'importance de bannir carrément l\'opérateur « - » du territoire des comparateurs.' }
          ],
          related: ['java-set', 'java-map', 'java-lambdas', 'java-streams-api']
        }
      ]
    }
);
DEVDOCS.java.categories.push(
    /* ======================================================
       6. GESTION DES EXCEPTIONS
       ====================================================== */
    {
      id: 'exceptions',
      name: 'Gestion des exceptions',
      icon: 'gpp_maybe',
      fiches: [
        {
          id: 'java-checked-unchecked',
          title: 'Checked vs Unchecked : les deux justices de Java',
          icon: 'gpp_maybe',
          level: 'Intermédiaire',
          tagline: 'IOException te force à prévoir un plan B dès la compilation ; NullPointerException te punit après coup : deux justices, deux stratégies.',
          intro: 'Java est le seul grand langage à distinguer **checked** et **unchecked** exceptions — et cette distinction conditionne ton style de code. Les **checked** traitent les *aléas du monde extérieur* (fichier absent, réseau coupé) : le compilateur **exige** une stratégie. Les **unchecked** signalent des *bugs du programmeur* : on ne les déclare pas, on les **corrige**.',
          blocks: [
            { t: 'code', lang: 'text', label: 'L\'arbre généalogique des erreurs', code:
'Throwable\n├─ Error                    ✋ irrécupérable : OutOfMemoryError,\n│                              StackOverflowError — ne JAMAIS attraper\n└─ Exception\n   ├─ RuntimeException      UNCHECKED — bugs du programme :\n   │     NullPointerException, IllegalArgumentException,\n   │     IllegalStateException, IndexOutOfBoundsException,\n   │     ClassCastException  → ne se déclare PAS, se prévient\n   └─ (les autres)          CHECKED — aléas à prévoir :\n         IOException, SQLException, ParseException\n         → le compilateur EXIGE try/catch ou « throws »' },
            { t: 'p', h: 'Pour la **checked** exception (ex. `IOException`), le compilateur joue les professeurs stricts : « ton programme *dépend* d\'un fichier qui peut ne pas être là — montre-moi ton plan B, ou déclare officiellement que tu transmets le problème à l\'étage au-dessus ». Impossible de faire l\'autruche : ta méthode doit porter la clause `throws` ou contenir un `try/catch`, sinon ça ne compile pas.' },
            { t: 'code', lang: 'java', label: 'Les deux réponses légales à une checked', code:
'// Réponse 1 : je TRANSMETS (le problème remonte à mon appelant)\nString chargerVentes(Path fichier) throws IOException {\n    return Files.readString(fichier);\n}\n\n// Réponse 2 : je GÈRE, du plus précis au plus général\ntry {\n    return Files.readString(fichier);\n} catch (NoSuchFileException e) {           // cas précis : fichier absent\n    return "[]";                            // plan B : catalogue vide\n} catch (IOException e) {                   // le reste : disque plein, droits…\n    throw new UncheckedIOException("chargement impossible: " + fichier, e);\n}' },
            { t: 'p', h: 'Pour la **unchecked** (`RuntimeException` et ses filles), aucune contrainte de compilation : elles parlent de ta *logique*. Une NullPointerException, une IndexOutOfBoundsException ne sont pas des aléas à gérer avec un catch systématique — ce sont des fautes à **corriger** : tester le null, valider l\'indice, renforcer les invariants. Attraper une NPE « pour faire disparaître le message » repousse le bug sous le tapis.' },
            { t: 'table', head: ['', 'Checked', 'Unchecked'], rows: [
              ['Question métier', 'le monde extérieur a trouvé un aléas', 'ton code contient une faute'],
              ['Compilateur', 'exige une stratégie', 'ne dit rien'],
              ['Exemples', 'IOException, SQLException', 'NPE, IllegalArgumentException'],
              ['Réaction saine', 'plan B, remontée déclarée', 'corriger la cause']
            ] },
            { t: 'h3', h: 'Créer sa propre exception : le message est l\'audit' },
            { t: 'code', lang: 'java', label: 'Une exception métier qui parle', code:
'public class SoldeInsuffisantException extends RuntimeException {\n    public SoldeInsuffisantException(long solde, long demande) {\n        super("Retrait de " + demande + " F refusé : solde actuel " + solde + " F");\n    }\n}\n\nif (montant > compte.getSolde()) {\n    throw new SoldeInsuffisantException(compte.getSolde(), montant);\n}\n// → Retrait de 100000 F refusé : solde actuel 65000 F\n// Un message qui dit QUOI, OÙ, COMBIEN : le debug à 3 h du matin te dira merci.' },
            { t: 'callout', kind: 'tip', h: 'Le consensus moderne (Spring, Kotlin, Effective Java) : le *métier* préfère les **unchecked** — les signatures restent propres, la gestion se fait en haut de pile (un seul endroit, ex. un contrôleur). Les checked se réservent aux cas où l\'appelant a *vraiment* une action réaliste à tenter (réessayer, fichier de secours).' }
          ],
          errors: [
            { title: 'Le catch vide qui avale tout : l\'arme du silence', lang: 'java', bad:
'try {\n    exporter(rapport);\n} catch (IOException e) {\n    // on verra plus tard\n}\n// L\'export échoue EN SILENCE. Le client reçoit un PDF vide,\n// personne ne sait pourquoi, l\'enquête part des utilisateurs.',
              good:
'} catch (IOException e) {\n    journal.log(Level.ERROR, "export échoué: " + rapport.id(), e);\n    throw new ExportException("rapport " + rapport.id(), e);\n}\n// Attraper sans rien faire n\'est JAMAIS une option :\n// on logue, on transforme, on remonte — ou les trois.',
              why: 'Une exception attrapée et avalée, c\'est un triage d\'urgence qui ne prévient personne : le programme continue dans un état peut-être faux, et l\'erreur réapparaît loin, déguisée. Le pire n\'est pas l\'incident, c\'est l\'absence de trace. Règle de la maison : un catch doit *faire* quelque chose — loguer, compenser, relancer. Le « on verra plus tard » ne passe aucune revue de code sérieuse.' },
            { title: 'throws Exception sur toutes les méthodes : fuite d\'abstraction', lang: 'java', bad:
'public double tva(long montant)           throws Exception { … }\npublic long totalPanier(Panier p)          throws Exception { … }\npublic void imprimerTicket()               throws Exception { … }\n// « Exception » : quoi ? pourquoi ? où est mon plan B ?',
              good:
'public long totalPanier(Panier p) {\n    Objects.requireNonNull(p, "panier obligatoire");   // unchecked explicite\n    // …calcul pur : aucune exception checked à cacher ici\n}\n// Seule la méthode qui touche VRAIMENT le disque déclare l\'IOException ;\n// les couches du dessus ne connaissent que le métier.',
              why: '`throws Exception` pollue la signature : il force chaque appelant à gérer un fourre-tout impossible à analyser, et trahit l\'implémentation interne (demain tu changes le disque par une API ? les signatures n\'ont plus de sens). Chaque niveau d\'abstraction ne doit déclarer que ce qui *lui* appartient — ou convertir au passage : `UncheckIOException` et consort sont faits pour ça.' },
            { title: 'Attraper Throwable ou Error au motif de « tout sécuriser »', lang: 'java', bad:
'try {\n    service.traiter(commandes);\n} catch (Throwable t) {          // atrape AUSSI OutOfMemoryError !\n    log("hmm", t);\n}                                // …et on continue avec un heap mort ?',
              good:
'// Les Error relèvent de l\'état catastrophique de la JVM : on laisse mourir\n// proprement (le programme ne peut plus garantir quoi que ce soit).\n// On limite ses catch à Exception — voire au type le plus précis possible.',
              why: '`Error` signale que *la plateforme elle-même* vacille (heap saturé, stack épuisée) : la JVM n\'est plus en état d\'exécuter ton plan B de manière fiable. Les attraper « par prudence » masque des symptômes vitaux et peut prolonger un fonctionnement corrompu. Sécuriser, c\'est laisser le crash net, et analyser le dump — pas continuer le zombie.' }
          ],
          related: ['java-try-catch-finally', 'java-try-with-resources', 'java-optional', 'nd-gestion-erreurs']
        },

        {
          id: 'java-try-catch-finally',
          title: 'try, catch, finally : orchestrer la reprise',
          icon: 'healing',
          level: 'Débutant',
          tagline: 'Capturer près de la cause, décider du plan B, nettoyer coûte que coûte : la chorégraphie complète du try.',
          intro: 'Trois mots-clés, une chorégraphie précise. Le bloc `try` tente ; les blocs `catch` prennent le relais selon le type de l\'incident ; `finally` nettoie dans **tous les cas**. Mal orchestrés, ils produisent les bugs les plus retors du langage — notamment le `return` dans `finally`, capable de faire disparaître une exception. Voyons la mécanique.',
          blocks: [
            { t: 'code', lang: 'text', label: 'Le déroulement, image par image', code:
'try { étape A → étape B → étape C }\n        A lève une exception   (B et C ne s\'exécuteront JAMAIS)\n            │\n            ▼\nla JVM cherche un catch compatible, DANS L\'ORDRE déclaré\n  ├─ catch (FileNotFoundException e)  → trop précis ? non : en premier ✓\n  └─ catch (IOException e)            → filet général : EN DERNIER\nfinalement :\nfinally { nettoyage }    ← toujours exécuté, exception ou pas ✓\n          (sauf System.exit(0) ou kill brutal de la JVM)\npuis, si aucun catch n\'a endigué :\nl\'exception REMONTE la pile d\'appels jusqu\'à trouver preneur' },
            { t: 'code', lang: 'java', label: 'Un traitement de fichier bien orchestré', code:
'Rapport rapport;\ntry {\n    String data = Files.readString(chemin);      // peut lever NoSuchFile, IO…\n    rapport = analyser(data);\n} catch (NoSuchFileException e) {                 // cas précis d\'abord\n    journal.log(WARN, "Export absent : " + chemin);\n    rapport = Rapport.vide();\n} catch (IOException | IllegalStateException e) { // multi-catch (Java 7)\n    journal.log(ERROR, "Analyse impossible : " + chemin, e);\n    throw e;                                      // relancer — après log utile\n} finally {\n    compteurTraitements.incrementAndGet();        // dans TOUS les chemins ✓\n}' },
            { t: 'ul', items: [
              '**Ordre des catch** : du plus spécifique au plus général — sinon le général intercepte tout, et le précis devient du code mort que le compilateur *refuse* (unreachable catch).',
              '**Multi-catch** : `catch (IOException | SQLException e)` évite de dupliquer un handler — depuis Java 7. Les types doivent être sans lien d\'héritage.',
              '**finally = nettoyage** : compteurs, verrous, indicateurs d\'état — tout ce qui doit être rétabli, exception ou pas, succès ou pas.',
              '**la pile déroule** : si personne n\'attrape, chaque méthode s\'achève « anormalement » jusqu\'en haut — c\'est le texte de la stack trace.'
            ] },
            { t: 'h3', h: 'Le piège légendaire : return dans finally' },
            { t: 'code', lang: 'java', label: 'Comment faire disparaître une exception', code:
'static int lireSolde() {\n    try {\n        if (true) throw new IOException("disque plein");\n        return 1;\n    } finally {\n        // return 0;          // ← AVALE tout : l\'exception disparaît,\n    }                         //    l\'appelant reçoit 0 tranquillement.\n                              // javac l\'autorise : le bug ABSOLU.' },
            { t: 'callout', kind: 'warn', h: '`e.printStackTrace()` n\'est pas une gestion d\'erreur : elle vomit la pile sur `stderr`, hors de tout journal structuré. En production, un logger (SLF4J) avec la stack en second argument — `log.error("export échoué", e)` — sinon l\'enquête se fait à l\'aveugle.' }
          ],
          errors: [
            { title: 'Un return dans finally : l\'exception évaporée', lang: 'java', bad:
'static String analyser() {\n    try {\n        return moteur.analyseRisquee();     // lève ParseException\n    } catch (ParseException e) {\n        return "erreur d\'analyse";          // ✓ plan B correct…\n    } finally {\n        nettoyer();\n        return "nettoyé";                   // ✗ …annulé par CE return :\n    }                                      // TOUS les chemins rendent "nettoyé" !',
              good:
'static String analyser() {\n    try {\n        return moteur.analyseRisquee();\n    } catch (ParseException e) {\n        return "erreur d\'analyse";\n    } finally {\n        nettoyer();                         // nettoie, ne DECIDE pas ✓\n    }\n}',
              why: '`finally` s\'exécute en dernier… et un `return` dedans **remplace** tout ce qui était en cours : les autres return, mais aussi les exceptions *encore en vol*. L\'appelant peut donc recevoir un faux succès alors que tout a explosé en chemin — le pire mensonge qu\'un code puisse raconter. Les analyseurs statiques le signalent : le mot-clé `return` n\'a jamais sa place dans `finally`.' },
            { title: 'Catch trop large en premier : les autres deviennent morts', lang: 'java', bad:
'} catch (Exception e) {                    // intercepte TOUT\n    log("erreur", e);\n} catch (NoSuchFileException e) {          // ✗ unreachable catch block\n    planB();                                // ne s\'affichera JAMAIS',
              good:
'} catch (NoSuchFileException e) {          // le précis ouvre la marche\n    planB();\n} catch (IOException e) {                   // le général ferme le cortège\n    log("Inattendu sur " + chemin, e);\n    throw e;\n}',
              why: 'La JVM teste les catch **dans l\'ordre** et exécute le premier compatible : un filet générique en tête aspire tous les cas, y compris ceux pour lesquels tu avais une vraie stratégie. Le compilateur te sauve en refusant (unreachable code) — la correction est purement… ordonnée : spécifique → général, comme des cercles concentriques.' },
            { title: 'Relancer en perdant la cause : la nouvelle exception orpheline', lang: 'java', bad:
'} catch (SQLException e) {\n    throw new ImportException("import échoué");   // l\'originale ? engloutie.\n}\n// Plus de « ORA-01400 colonne obligatoire » dans les logs :\n// seulement « import échoué ». Bon courage.',
              good:
'} catch (SQLException e) {\n    throw new ImportException("import échoué pour " + fichier, e);\n    //                                                        ↑ la CAUSE ✓\n}\n// getCause() conserve la chaîne complète : la vraie raison survit aux\n// re-emballages, et la stack trace affiche les « Caused by: » salvateurs.',
              why: 'Chaque exception transporte une stack trace *liée à sa naissance* : c\'est souvent la seule information qui compte. La jeter et en lancer une autre sans la chaîner, c\'est brûler la scène de crime à l\'arrivée des policiers. Le constructeur `(message, cause)` existe sur toutes les exceptions standard — utilise-le systématiquement.' }
          ],
          related: ['java-checked-unchecked', 'java-try-with-resources', 'java-path-files', 'java-io-vs-nio']
        },

        {
          id: 'java-try-with-resources',
          title: 'try-with-resources : la fermeture automatique',
          icon: 'autorenew',
          level: 'Intermédiaire',
          tagline: 'La ressource qui se referme toute seule, même quand tout explose au milieu du traitement.',
          intro: 'Avant Java 7, chaque `close()` réclamait un `finally` d\'acrobate — et une fois sur deux, la fermeture elle-même jetait une exception qui *masquait* l\'originale. Le **try-with-resources** a tout automatisé : déclare ta ressource dans les parenthèses du `try`, et elle sera fermée **garantie**, dans le bon ordre, quoi qu\'il arrive. C\'est le réflexe nº 1 dès qu\'une classe implémente `AutoCloseable`.',
          blocks: [
            { t: 'p', h: '**Le problème d\'abord** : fichiers, sockets, connexions SQL sont des *ressources du système* — chacune consomme un descripteur limité. Les oublier ouvertes = fuite qui termine en « too many open files ». Et surtout : **le GC ne ferme rien** — ne compte jamais sur lui pour ça. La fermeture doit être déterministe, et le try-with-resources la rend gratuite.' },
            { t: 'code', lang: 'java', label: 'Le réflexe moderne', code:
'Path source = Path.of("exports", "ventes-2026-07.txt");\nPath cible  = Path.of("exports", "ventes-2026-07-clean.txt");\n\ntry (var reader = Files.newBufferedReader(source);\n     var writer = Files.newBufferedWriter(cible)) {\n    String ligne;\n    while ((ligne = reader.readLine()) != null) {\n        writer.write(ligne.strip().toUpperCase());\n        writer.newLine();\n    }\n}   // writer.close() PUIS reader.close() — automatique,\n    // même si le traitement lève une exception en cours de route ✓' },
            { t: 'ul', items: [
              '`AutoCloseable` est le contrat (`close()` peut lever `Exception`) ; `Closeable` l\'étend pour l\'I/O (`IOException`). Une interface, un réflexe.',
              '**Fermeture en ordre inverse** de la déclaration : le writer (qu\'il faut vider) avant le reader — la JVM gère.',
              'La ressource déclarée dans le `try` est **final** et sa portée s\'arrête au bloc : impossible de la réutiliser fermée par accident.',
              '`try-with-resources` et `catch`/`finally` se **combinent** librement : le close automatique a lieu avant d\'entrer dans le catch.'
            ] },
            { t: 'h3', h: 'Les exceptions supprimées : the show must go on' },
            { t: 'p', h: 'Cas sournois : ton traitement lève `E1`, puis `close()` lève `E2`. Avant Java 7, `E2` *remplaçait* `E1` — tu ne savais plus pourquoi ça avait planté. Avec le try-with-resources, **`E1` gagne** et `E2` est rangée dans `getSuppressed()` : rien ne se perd.' },
            { t: 'code', lang: 'java', label: 'Récupérer les exceptions discrètes', code:
'} catch (IOException e) {\n    System.err.println("traitement échoué : " + e.getMessage());\n    for (Throwable s : e.getSuppressed()) {\n        System.err.println("  + fermeture aussi : " + s.getMessage());\n    }\n}' },
            { t: 'h3', h: 'Rendre TES classes refermables proprement' },
            { t: 'code', lang: 'java', label: 'Implémenter AutoCloseable', code:
'public class ImportMoMo implements AutoCloseable {\n    private final HttpClient client;\n    private BufferedReader csv;\n\n    public void demarrer() throws IOException {\n        this.csv = Files.newBufferedReader(Path.of("import.csv"));\n        // …\n    }\n    @Override\n    public void close() {\n        // libération idempotente — appeler close() deux fois doit rester inoffensif\n        try { if (csv != null) csv.close(); } catch (IOException ignore) { }\n    }\n}\n\ntry (var importDuJour = new ImportMoMo()) {\n    importDuJour.demarrer();\n}   // fermeture garantie, même si demarrer() explose ✓' },
            { t: 'callout', kind: 'tip', h: 'Depuis Java 19, même les pools de threads (`ExecutorService`) sont `AutoCloseable` : `try (var pool = Executors.newFixedThreadPool(4)) { … }` arrête proprement le pool à la sortie. La culture try-with-resources s\'étend à tout ce qui possède un cycle de vie — apprends à repérer les classes « refermables ».' }
          ],
          errors: [
            { title: 'Créer la ressource AVANT le try : la fenêtre de fuite', lang: 'java', bad:
'BufferedReader reader = Files.newBufferedReader(chemin);   // déjà ouvert…\ntry (reader) {                              // Java 9+ : ressource « effectivement final »\n    …\n}\n// 1. Si le constructeur suivant lève → reader jamais fermé ?\n// 2. Le reader reste visible et utilisable APRES le bloc — refermé !',
              good:
'try (var reader = Files.newBufferedReader(chemin);\n     var writer = Files.newBufferedWriter(sortie)) {\n    // créé ET confiné dans le bloc : impossible de sortir ouvert ou\n    // de réutiliser un objet fermé après coup. ✓\n}',
              why: 'La ressource tient son cycle de vie du bloc `try` : la créer à l\'extérieur ouvre une fenêtre où aucune fermeture automatique ne s\'applique (exception entre ouverture et entrée dans le try) et laisse l\'objet accessible après sa fermeture. La forme canonique fait tout, dans l\'ordre : ouvrir, utiliser, refermer, oublier.' },
            { title: 'Croire que le finally ne passe plus', lang: 'java', bad:
'try (var in = Files.newInputStream(f)) {\n    traiter(in);\n} finally {\n    // le débutant ne met RIEN ici, croyant finally devenu inutile\n}',
              good:
'try (var in = Files.newInputStream(f)) {\n    traiter(in);\n} finally {\n    verrou.unlock();              // finally vit toujours !\n    indicateurTraitement.set(false);\n}\n// Automatisé : le close().  Toujours à toi : le reste (verrous, drapeaux).',
              why: 'Le try-with-resources ne dispense que du `close()` des ressources déclarées. Tout le reste — libérer un `ReentrantLock`, repositionner un indicateur, notifier un Scheduler — reste de la compétence du `finally`, qui s\'exécute avec la même garantie d\'avant. Confondre les deux responsabilités laisse des verrous pris pour l\'éternité.' },
            { title: 'Ignorer les suppressed lors du diagnostic', lang: 'java', bad:
'} catch (IOException e) {\n    log.error("échec : " + e.getMessage());   // et si la VRAIE raison\n}                                              // était dans un close() ?',
              good:
'} catch (IOException e) {\n    log.error("échec : {}", e.getMessage());\n    for (Throwable s : e.getSuppressed()) {\n        log.error("  exception de fermeture : {}", s.getMessage());\n    }\n}',
              why: 'Quand le traitement lève E1 et que `close()` ajoute E2, E1 est relancée et E2 ne disparaît **pas** : elle dort dans `getSuppressed()`. Ne pas la consulter, c\'est ignorer la moitié du rapport d\'incident — par exemple le « disque plein » qui était la vraie cause de la lecture ratée.' }
          ],
          related: ['java-try-catch-finally', 'java-checked-unchecked', 'java-executor-completable', 'java-io-vs-nio']
        }
      ]
    },

    /* ======================================================
       7. GÉNÉRICITÉ
       ====================================================== */
    {
      id: 'generics',
      name: 'Généricité',
      icon: 'category',
      fiches: [
        {
          id: 'java-generics-bases',
          title: 'Les generics : des conteneurs qui connaissent leur contenu',
          icon: 'category',
          level: 'Intermédiaire',
          tagline: 'List sans paramètre, c\'est un sac où l\'on jette tout et d\'où l\'on ressort des ClassCastException : les generics font la police à la compilation.',
          intro: 'Ajoutés en Java 5 (2004), les **generics** permettent d\'écrire des classes et méthodes *paramétrées par un type* : `List<String>` est une liste qui ne sait contenir *que* des chaînes. Le compilateur vérifie tout **avant** l\'exécution — plus de casts suspects, plus de ClassCastException en production. C\'est la couche de rigueur qui change définitivement la vie d\'une codebase.',
          blocks: [
            { t: 'h3', h: 'Avant / après : pourquoi les generics existent' },
            { t: 'code', lang: 'java', label: 'L\'enfer des raw types (Java 1.4)', code:
'// AVANT : la liste « fourre-tout »\nList panier = new ArrayList();\npanier.add("gari");\npanier.add(42);                     // aucun frein : tout entre\nString article = (String) panier.get(1);   // ClassCastException EN EXÉCUTION\n\n// AVEC generics : la sécurité déplacée à la COMPILATION\nList<String> panier = new ArrayList<>();\npanier.add("gari");\npanier.add(42);           // ✗ ERREUR de compilation — attrapé par l\'IDE\nString article = panier.get(0);   // plus AUCUN cast : le type voyage avec la liste' },
            { t: 'h3', h: 'Écrire une classe générique' },
            { t: 'code', lang: 'java', label: 'Un conteneur paramétré', code:
'public class Caisse<T> {                    // T : type « à définir à l\'usage »\n    private final List<T> contenu = new ArrayList<>();\n\n    public void ranger(T article) { contenu.add(article); }\n    public T premier() { return contenu.get(0); }\n    public int taille() { return contenu.size(); }\n}\n\nCaisse<Produit> caisseProduits = new Caisse<>();   // diamond : T = Produit déduit\ncaisseProduits.ranger(new Produit("gari", 2_500));\ncaisseProduits.ranger("texte");                    // ✗ compilation refuse\n\nCaisse<String> caisseMots = new Caisse<>();\ncaisseMots.ranger("MOMO");   // une MÊME classe Caisse, infiniment réutilisable' },
            { t: 'ul', items: [
              '**Conventions de nommage** : `T` (type), `E` (élément de collection), `K`/`V` (clé/valeur), `N` (nombre). Une lettre majuscule, parlante par sa position.',
              '**Le compilateur substitue** : dans `Caisse<Produit>`, chaque occurrence de `T` est raisonnée comme `Produit` — d\'où le refus de ranger une String.',
              '**Diamond `<>`** : le type de droite est déduit de celui de gauche depuis Java 7 — moins de bruit, autant de rigueur.'
            ] },
            { t: 'h3', h: 'Méthodes génériques et bornes' },
            { t: 'code', lang: 'java', label: 'Une méthode qui exige « comparable »', code:
'// Méthode générique : le <T> AVANT le type de retour déclare le paramètre\nstatic <T> T premier(List<T> liste) {\n    return liste.get(0);\n}\n\n// Borne : j\'exige que T sache se comparer — sinon, pas de max possible !\nstatic <T extends Comparable<T>> T max(Collection<T> elements) {\n    T champion = null;\n    for (T e : elements) {\n        if (champion == null || e.compareTo(champion) > 0) champion = e;\n    }\n    return champion;\n}\n\nProduit star = max(stock);            // T = Produit (Comparable ✓)\n// max(List.of("a", 1));              // ✗ erreur : T ne peut pas être « n\'importe quoi »' },
            { t: 'p', h: 'La borne `<T extends Comparable<T>>` se lit « tout type qui se sait comparer à lui-même » — `extends` couvre ici aussi les interfaces (c\'est le seul endroit de Java où `extends` parle aussi d\'interface). Les bornes rendent ton API honnête : ce qu\'elle exige est écrit dans la signature, vérifiable par le compilateur, pas dans un commentaire.' }
          ],
          errors: [
            { title: 'Céder à la paresse des raw types', lang: 'java', bad:
'List produits = new ArrayList();     // raw type : warning « unchecked » ignoré\nproduits.add(new Produit("gari", 2_500));\nproduits.add("riz");                  // tout passe — compilation comprise…\nProduit p = (Produit) produits.get(1);  // ✗ mais BOUM à l\'exécution',
              good:
'List<Produit> produits = new ArrayList<>();   // paramétré ✓\nproduits.add(new Produit("gari", 2_500));\nproduits.add("riz");              // ✗ refuse de compiler : problème réglé EN AMONT',
              why: 'Le raw type désactive la vérification générique et reporte tous les contrôles à l\'exécution, au moment du cast — là où c\'est le plus cher à débugger. Le compilateur supplie avec ses warnings *unchecked* de ne pas le faire. Chaque raw type toléré repousse la ClassCastException à demain — et demain, c\'est la production.' },
            { title: 'Vouloir paramétrer avec un primitif', lang: 'java', bad:
'List<int> notes = new ArrayList<>();     // ✗ error: unexpected type\nMap<char, Integer> compteurs;            // ✗ pareil',
              good:
'List<Integer> notes = new ArrayList<>();   // les WRAPPERS ✓\nnotes.add(15);                             // autoboxing transparent\n// Souci de performance ? Streams primitifs (IntStream) ou\n// collections spécialisées d\'eclipse — jamais de List primitif.',
              why: 'Le mécanisme des generics travaille sur des *types référence* (objets) — et pour cause : à l\'exécution, tout est effacé vers Object. Un primitif n\'a pas d\'adresse d\'objet, il ne peut donc pas remplir ce moule. Les wrappers comblent le fossé, avec l\'autoboxing qui rend la syntaxe aussi douce que celle des primitifs.' },
            { title: 'Essayer de créer un objet du type paramétré', lang: 'java', bad:
'class Fabrique<T> {\n    T creer() { return new T(); }        // ✗ error: unexpected type\n}',
              good:
'class Fabrique<T> {\n    private final Supplier<T> constructeur;\n    Fabrique(Supplier<T> constructeur) { this.constructeur = constructeur; }\n    T creer() { return constructeur.get(); }        // ✓ la fabrique EST fournie\n}\nvar fabriqueProduits = new Fabrique<>(() -> new Produit("?", 0));',
              why: 'Le type paramétré `T` est **effacé** à l\'exécution : `new T()` voudrait instancier « quelque chose » que la JVM ne connaît plus. La solution idiomatique est de *passer la fabrication* en paramètre (`Supplier<T>`, ou un `Class<T>` token pour la réflexion). Détail complet et conséquences : voir la fiche sur le type erasure, tout vient de là.' }
          ],
          related: ['java-wildcards', 'java-type-erasure', 'java-collections-hierarchie', 'java-primitifs-wrappers']
        },

        {
          id: 'java-wildcards',
          title: 'Les jokers : ? extends et ? super',
          icon: 'question_mark',
          level: 'Avancé',
          tagline: '? extends pour lire, ? super pour écrire : la règle PECS qui tranche toutes les hésitations.',
          intro: 'C\'est l\'un des concepts qui bloque le plus de développeurs : pourquoi `ArrayList<Integer>` ne peut-il pas être lu comme une `List<Number>`, alors qu\'un Integer EST un Number ? La réponse tient en un mot : **invariance**. Les jokers (*wildcards*) sont les exceptions contrôlées à cette invariance — deux directions, une mémorable règle : **PECS**.',
          blocks: [
            { t: 'h3', h: 'Pourquoi l\'invariance : la démonstration par l\'absurde' },
            { t: 'code', lang: 'java', label: 'La catastrophe que le compilateur empêche', code:
'List<Integer> entiers = new ArrayList<>();   // des entiers, juré\nentiers.add(42);\n\n// SUPPOSONS autorisée cette ligne (elle ne l\'est PAS — imaginons) :\nList<Number> nombres = entiers;\nnombres.add(3.14);      // un Double… ajouté via l\'alias List<Number>\n\n// Et maintenant, côté « vraie » liste :\nInteger x = entiers.get(1);   // catastrophe : on attend un Integer,\n                              // on reçoit 3.14 → ClassCastException.\n// La garantie entière des generics vole en éclats.\n// Donc : List<Integer> n\'est PAS une List<Number>. Point.' },
            { t: 'h3', h: '? extends T — la lecture sécurisée (Producer)' },
            { t: 'code', lang: 'java', label: 'Accepter n\'importe quel nombre', code:
'static double somme(List<? extends Number> nombres) {\n    // « une liste de TEL ou TEL descendant de Number, je ne sais pas lequel »\n    double total = 0;\n    for (Number n : nombres) total += n.doubleValue();   // LECTURE : Number garanti ✓\n    return total;\n}\n\nsomme(List.of(1, 2, 3));          // List<Integer> ✓\nsomme(List.of(2.5, 0.5));         // List<Double> ✓\n\n// MAIS : nombres.add(3.14);      // ✗ interdit !\n// Le type exact est inconnu : si c\'était une List<Integer> ?\n// Le compilateur ne peut autoriser AUCUN add (sauf null, sans intérêt).' },
            { t: 'p', h: 'Lecture garantie, écriture interdite : la liste est un **producteur** de valeurs — elle te *donne* des Number (ou descendants), tu peux les lire en toute sécurité, mais tu ne peux rien y remettre sans casser quelque chose.' },
            { t: 'h3', h: '? super T — l\'écriture sécurisée (Consumer)' },
            { t: 'code', lang: 'java', label: 'Remplir une file, peu importe son étiquette', code:
'static void remplirZeros(List<? super Integer> cible, int combien) {\n    // « une liste qui accepte AU MINIMUM des Integer »\n    for (int i = 0; i < combien; i++) cible.add(0);   // ÉCRITURE garantie ✓\n}\n\nremplirZeros(new ArrayList<Number>(), 3);   // ✓ Number est super-type d\'Integer\nremplirZeros(new ArrayList<Object>(), 3);   // ✓ Object aussi\n\n// MAIS : Integer lu = cible.get(0);        // ✗ lecture limitée à Object\n// La liste pourrait être une List<Object> : rien ne dit « il n\'y a QUE des Integer ».' },
            { t: 'table', head: ['Joker', 'Je peux…', 'La liste est un…', 'Exemple JDK culte'], rows: [
              ['? extends T', 'lire des T (ou descendants)', 'PRODUCTEUR', 'Stream.map accepte Function<? super T, ? extends R>'],
              ['? super T', 'écrire des T', 'CONSOMMATEUR', 'Collections.copy(dst = ? super T)'],
              ['? (unbounded)', 'rien écrire, lire des Object', 'catalogue scellé', 'List<?> pour « n\'importe quelle liste »']
            ] },
            { t: 'p', h: '**PECS** (Joshua Bloch, *Effective Java*) : **P**roducer **E**xtends, **C**onsumer **S**uper. Quand ta méthode *lit* dans la structure, pense « liste qui produit » → `? extends`; quand elle y *écrit*, pense « liste qui consomme » → `? super`. Reste-il un cas mixte (lecture ET écriture, comme un tri `sort`) ? Alors le type précis, sans joker : `List<T>`.' },
            { t: 'callout', kind: 'warn', h: 'Règle de style API : **jamais de joker dans un type de retour**. Un `List<? extends Number> calculer()` impose le casse-tête des wildcards à *chaque appelant*. Le joker appartient aux *paramètres* — c\'est la méthode qui s\'adapte au monde, pas l\'inverse.' }
          ],
          errors: [
            { title: 'Assigner List<Integer> à List<Number>', lang: 'java', bad:
'List<Integer> entiers = new ArrayList<>();\nList<Number> nombres = entiers;   // ✗ error: incompatible types\nnombres.add(3.14);                // (et si ça compilait : un Double chez les Integer !)',
              good:
'// Pour LIRE les entiers comme des nombres : la wildcard extends ✓\nList<? extends Number> nombres = entiers;\nNumber premier = nombres.get(0);   // lecture OK\n// nombres.add(3.14);              // …mais écriture refusée (et heureusement)',
              why: 'Les generics sont invariants pour *empêcher exactement le cauchemar montré plus haut* : une variable d\'un type plus large laisserait entrer des valeurs interdites par la vraie liste. La wildcard `? extends` offre le compromis contrôlé : voir « comme un Number » pour lecture, avec interdiction totale d\'écrire. Si tu dois absolument écrire, la liste doit être typée au *plus grand dénominateur* dès le départ.' },
            { title: 'Tenter un add dans un ? extends', lang: 'java', bad:
'static void ajouter(List<? extends Number> cible) {\n    cible.add(3.14);       // ✗ error. Même un Integer serait refusé :\n}                           // et si la vraie liste était List<Double> ?',
              good:
'static void ajouterTrois(List<? super Integer> cible) {\n    cible.add(3);          // ✓ Integer accepté par TOUT super-type\n}\n// Tu veux ÉCRIRE ? La bonne wildcard est super.\n// Tu veux lire ET écrire ? Pas de wildcard : paramètre précis List<T>.',
              why: 'Avec `? extends Number`, le compilateur sait seulement que la liste contient *un type descendant de Number, identité inconnue*. Ajouter quoi que ce soit risque d\'y glisser un mauvais type — donc tout add (hors null) est bloqué. C\'est la garde-fou qui rend l\'enrichissement possible sans danger. À l\'intérieur de ce dispositif, tu es obligé de choisir ton rôle : lecteur, ou écrivain.' },
            { title: 'Wildcards partout « pour être souple »', lang: 'java', bad:
'static List<? extends Number> calculerTotaux(List<? super Vente> ventes) { … }\n// L\'appelant reçoit une liste illisible/immuable, et doit lui-même\n// accepter des trucs impossibles à fournir. Personne n\'y gagne.',
              good:
'static List<Number> calculerTotaux(List<Vente> ventes) { … }\n// Signature simple à l\'appel ; si besoin de souplesse en ENTRÉE :\nstatic List<Number> calculerTotaux(List<? extends Vente> ventes) { … }',
              why: 'Chaque wildcard est une *flexibilité* offerte mais une *contrainte* subie (lecture seule ou écriture seule). Multiplier les jokers sans raison fabrique des signatures intimidantes et des angles morts. La maxime d\'Effective Java : wildcards en paramètres quand c\'est utile, jamais en retour, et le moins possible.' }
          ],
          related: ['java-generics-bases', 'java-type-erasure', 'java-collections-hierarchie', 'java-streams-api']
        },

        {
          id: 'java-type-erasure',
          title: 'Le type erasure : le secret que la JVM ignore',
          icon: 'ink_eraser',
          level: 'Avancé',
          tagline: 'À l\'exécution, une liste de String et une liste de Integer sont le même objet : le type est effacé après vérification.',
          intro: 'Voici la vérité que la plupart des développeurs découvrent tard : **les generics n\'existent que pendant la compilation**. Vérifiés, ils sont ensuite **effacés** (*type erasure*) : la JVM n\'a jamais entendu parler de `List<String>` — juste de `List`. Ce mécanisme, conçu pour la compatibilité avec le Java d\'avant 2004, explique une série d\'interdictions célèbres : pas de `new T()`, pas de `instanceof` paramétré, pas de surcharge sur des listes différemment paramétrées.',
          blocks: [
            { t: 'h3', h: 'Ce que le compilateur écrit vraiment' },
            { t: 'code', lang: 'java', label: 'Ton code — et ce que la JVM voit', code:
'// CE QUE TU ÉCRIS\nList<String> noms = new ArrayList<>();\nnoms.add("Awa");\nString premier = noms.get(0);\n\n// CE QUE LA JVM EXÉCUTE (après effacement + casts synthétiques)\nList noms = new ArrayList();            // « raw type » : plus de String nulle part\nnoms.add("Awa");                        // la JVM accepte TOUT — le compilateur a filtré\nString premier = (String) noms.get(0);  // le cast est INSÉRÉ par javac, invisible' },
            { t: 'p', h: '**Pourquoi ce choix ?** En 2004, des milliards de lignes de Java 1.4 existaient. Ajouter les generics « pour de vrai » dans la JVM aurait rendu les anciennes bibliothèques incompatibles : une méthode prenant une vieille `List` brute aurait refusé une nouvelle `List<String>`. L\'effacement rend les deux *binairement identiques* — l\'ancien et le nouveau monde cohabitent, au prix de quelques interdictions à connaître.' },
            { t: 'h3', h: 'Les interdictions, une par une (et leur pourquoi)' },
            { t: 'ul', items: [
              '**`new T()` impossible** : T est effacé ; la JVM ne sait plus quel type instancier. Contournement : passer une `Supplier<T>` ou un jeton `Class<T>`.',
              '**`x instanceof List<String>` impossible** : au runtime, cet objet est juste une `List` — impossible de savoir ce que le compilateur l\'avait remplie. Seul `instanceof List<?>` existe.',
              '**Pas de surcharge paramétrée** : `void f(List<String>)` et `void f(List<Integer>)` deviennent, après effacement, deux fois `void f(List)` — mêmes signatures, rejet de compilation.',
              '**`T.class`, `T[]` champs statiques de type T interdits** : même cause — le type n\'existe plus quand il faudrait l\'utiliser.',
              '**Les exceptions génériques interdites** : `catch (MonException<String> e)` demanderait de distinguer au runtime ce qui a disparu.'
            ] },
            { t: 'h3', h: 'Le tableau sait, la liste oublie : covariance vs invariance' },
            { t: 'code', lang: 'java', label: 'Le contraste édifiant', code:
'// Les tableaux RÉTIENT leur type à l\'exécution (réifiés), et sont COVARIANTS :\nNumber[] tab = new Integer[5];    // compile — Integer[] est un Number[]\ntab[0] = 3.14;                    // ✗ ArrayStoreException À L\'EXÉCUTION :\n                                  // le tableau se souvient qu\'il contient des Integer !\n\n// Les listes OUBLIENT (effacées) mais sont INVARIANTES — l\'erreur donc AVANT :\nList<Number> liste = new ArrayList<Integer>();   // ✗ ne compile même pas ✓' },
            { t: 'p', h: 'Leçon d\'histoire : la covariance des tableaux, héritée du tout jeune Java, *décale les erreurs de types à l\'exécution*. Les generics ont appris de cette faute : invariance stricte + effacement + vérification maximale à la compilation. C\'est pourquoi « List over array » est un réflexe du Java moderne.' },
            { t: 'h3', h: 'Le jeton de type : comment faire vivre T au runtime' },
            { t: 'code', lang: 'java', label: 'Le pattern Class<T> des pros', code:
'static <T> T lireConfig(String chemin, Class<T> type) throws IOException {\n    String json = Files.readString(Path.of(chemin));\n    return MAPPER.readValue(json, type);      // Jackson reçoit le type comme OBJET\n}\n\nConfigBoutique cfg = lireConfig("cfg.json", ConfigBoutique.class);   // ✓\n// Le paramètre Class<T> capture le type dans une VALEUR : effacement contourné.\n// (Pour les types paramétrés entiers — List<Produit> — Jackson utilise\n//  le « super type token » : new TypeReference<List<Produit>>() {}.)' }
          ],
          errors: [
            { title: 'Chercher à instancier T directement', lang: 'java', bad:
'class Fabrique<T> {\n    T creerDefaut() {\n        return new T();            // ✗ unexpected type\n    }\n}',
              good:
'static <T> T creer(Supplier<T> fabrique) {\n    return fabrique.get();         // la fabrique voyage en paramètre ✓\n}\nProduit vide = creer(() -> new Produit("à définir", 0));\n// Ou avec un jeton de classe : creer(Config.class) si newInstance suffit.',
              why: 'Après effacement, `T` disparaît : la JVM n\'a littéralement aucune information sur le type à construire. Le remède universel est de *passer la capacité de création* depuis l\'appelant, qui, lui, connaît le type : `Supplier<T>`, `Class<T>` ou une méthode factory. C\'est l\'idiome « la demande transporte la connaissance » — tu le retrouves dans Jackson, Gson, Spring.' },
            { title: 'Filtrer avec instanceof paramétré', lang: 'java', bad:
'static boolean queDesChiffres(List<?> liste) {\n    return liste instanceof List<Integer>;    // ✗ illegal generic type\n}',
              good:
'static boolean queDesChiffres(List<?> liste) {\n    for (Object o : liste) {\n        if (!(o instanceof Integer)) return false;    // teste les ÉLÉMENTS ✓\n    }\n    return true;\n}',
              why: '`instanceof` est un test *runtime* : il ne peut vérifier que ce qui existe encore à ce moment-là — l\'objet est une `List`, tout le reste a été effacé. On teste donc les *éléments* un par un, ou on capture le type dans un jeton `Class<T>` dès le début. Ce n\'est pas une limite arbitraire : c\'est le prix logique de l\'effacement.' },
            { title: 'Oublier @SafeVarargs avec les varargs génériques', lang: 'java', bad:
'static <T> List<T> regrouper(T... elements) {\n    return Arrays.asList(elements);    // warning : « Possible heap pollution »\n}                                        // le tableau T... EST réifié, lui !',
              good:
'@SafeVarargs\nstatic <T> List<T> regrouper(T... elements) {   // j\'affirme : je ne corromps\n    return new ArrayList<>(Arrays.asList(elements));  // PAS le tableau reçu\n}\n// @SafeVarargs n\'est permise que sur les méthodes final/static/private :\n// celles qu\'on ne peut pas redéfinir (la promesse doit être incassable).',
              why: 'Le varargs `T...` crée un tableau *réifié* dont le type exact est celui de l\'appel : y stocker un mauvais objet (via des casts sauvages) produirait des ClassCastException différées dans un autre coin du programme. Java oblige donc le concepteur de la méthode à jurer qu\'il *ne fait que lire* ce tableau : `@SafeVarargs`. Sans elle, warning légitime du compilateur — à traiter, pas à étouffer.' }
          ],
          related: ['java-generics-bases', 'java-wildcards', 'java-interfaces-fonctionnelles', 'java-collections-hierarchie']
        }
      ]
    },

    /* ======================================================
       8. JAVA FONCTIONNEL & STREAMS
       ====================================================== */
    {
      id: 'fonctionnel',
      name: 'Java fonctionnel & Streams',
      icon: 'waves',
      fiches: [
        {
          id: 'java-lambdas',
          title: 'Les lambdas : des fonctions de passage',
          icon: 'functions',
          level: 'Intermédiaire',
          tagline: '(a, b) -> a + b : passer un comportement comme un colis, sans créer de classe — la porte d\'entrée du Java moderne.',
          intro: 'Avant Java 8, passer « un bout de comportement » (un tri, un filtre) exigeait une **classe anonyme** de sept lignes pour une ligne de logique. La **lambda** réduit ce bruit à l\'essentiel : les paramètres, une flèche, le corps. Mais attention : une lambda n\'a pas d\'existence propre — elle s\'attache toujours à une **interface fonctionnelle** cible.',
          blocks: [
            { t: 'code', lang: 'java', label: 'La métamorphose Java 8', code:
'// AVANT : la classe anonyme — verbeuse jusqu\'à l\'absurde\npanier.sort(new Comparator<Produit>() {\n    @Override public int compare(Produit a, Produit b) {\n        return Integer.compare(a.prix(), b.prix());\n    }\n});\n\n// LAMBDA : seule l\'intention survit\npanier.sort((a, b) -> Integer.compare(a.prix(), b.prix()));\n\n// RÉFÉRENCE DE MÉTHODE : quand la lambda ne fait que déléguer\npanier.sort(Comparator.comparingInt(Produit::prix));' },
            { t: 'h3', h: 'Anatomie et règles de syntaxe' },
            { t: 'ul', items: [
              '`(a, b) -> a + b` — une expression : le `return` est implicite.',
              '`(a, b) -> { int t = a + b; return t; }` — un bloc : accolades et `return` explicites.',
              'Les types souvent **inférés** : `(a, b)` suffit ; écris-les quand la lisibilité le demande : `(Produit a, Produit b) -> …`.',
              'Un seul paramètre, sans type → **parenthèses optionnelles** : `x -> x * 2`.',
              'La cible décide de TOUT : la même lambda `() -> 42` peut être `Supplier<Integer>` ou un `Callable<Integer>` — elle prend le type de l\'interface attendue.'
            ] },
            { t: 'h3', h: 'La règle d\'or : les variables capturées sont figées' },
            { t: 'code', lang: 'java', label: 'Capture et « effectively final »', code:
'long seuil = 10_000;\nPredicate<Vente> grosse = v -> v.montant() > seuil;   // capture de seuil ✓\n\n// seuil = 20_000;   // ✗ ERREUR de compilation :\n                     // une variable locale capturée doit être\n                     // FINALE ou « effectivement finale » (jamais modifiée)\n\n// Pourquoi cette sévérité ? La lambda peut s\'exécuter plus tard, sur un\n// AUTRE THREAD, longtemps après la fin de la méthode : la JVM travaille\n// sur une COPIE. Si l\'originale pouvait varier, copie et original divergeraient\n// — promesse de cohérence impossible à tenir. Figé donc.' },
            { t: 'h3', h: 'Les quatre familles de références de méthodes' },
            { t: 'table', head: ['Forme', 'Exemple', 'Signifie'], rows: [
              ['Classe::methodeStatique', 'Integer::parseInt', 's -> Integer.parseInt(s)'],
              ['objet::methodeInstance', 'System.out::println', 'x -> System.out.println(x)'],
              ['Classe::methodeInstance', 'String::toUpperCase', 's -> s.toUpperCase() (1er param = récepteur)'],
              ['Classe::new', 'Produit::new', '() -> new Produit() (constructeur)']
            ] },
            { t: 'p', h: 'Quand ta lambda ne fait qu\'**appeler une méthode existante avec les mêmes arguments**, la référence de méthode est encore plus parlante : `forEach(System.out::println)`. Le jour où la logique dépasse une ligne, extrais une méthode nommée… et référence-la : `this::estGrosseVente`. C\'est le style « composition nommée » qui vieillit bien.' },
            { t: 'callout', kind: 'tip', h: '`this` dans une lambda désigne **l\'instance englobante** (celle de la méthode où tu écris) — pas d\'objet nouveau créé. À l\'inverse, dans une classe anonyme, `this` est l\'instance *anonyme*. Confusion classique de portée quand on convertit du vieux code en lambdas.' }
          ],
          errors: [
            { title: 'Modifier une variable capturée : la compilation bloque', lang: 'java', bad:
'long total = 0;\nventes.forEach(v -> total += v.montant());   // ✗ variable used in lambda\n                                              // should be final…',
              good:
'// Somme : c\'est EXACTEMENT le métier de l\'API Stream :\nlong total = ventes.stream().mapToLong(Vente::montant).sum();\n// Si tu dois vraiment compter « de l\'extérieur » : AtomicLong, jamais long[1]\nAtomicLong total = new AtomicLong();\nventes.forEach(v -> total.addAndGet(v.montant()));   // référence stable ✓',
              why: 'La mutabilité demandée violerait le contrat de la capture (copie figée). La réponse n\'est pas de *tricher* (le vieux truc `long[1]`), mais d\'utiliser l\'outil fait pour : les réductions de Stream (`sum`, `reduce`, `collect`) portent l\'accumulation *à l\'intérieur* du pipeline — là où elle est sûre et parallélisable. C\'est l\'esprit fonctionnel : pas d\'effet de bord externe.' },
            { title: 'Confondre this dans lambda et classe anonyme', lang: 'java', bad:
'class Caisse {\n    long solde = 1_000;\n    Runnable audit() {\n        return new Runnable() {\n            @Override public void run() {\n                System.out.println(this.solde);   // ✗ error : this = le Runnable !\n            }\n        };\n    }\n}',
              good:
'class Caisse {\n    long solde = 1_000;\n    Runnable audit() {\n        return () -> System.out.println(this.solde);   // this = la Caisse ✓\n    }\n}\n// (Ou, en classe anonyme : écrire Caisse.this.solde. Mais la lambda clarifie.)',
              why: 'La classe anonyme crée *un nouvel objet*, donc `this` change de cible ; la lambda n\'en crée pas — `this` reste l\'instance englobante. Convertir un code « anonyme → lambda » sans réviser les `this` introduit des bugs de portée subtils, typiquement des champs introuvables ou pire, des mauvais objets notifiés.' },
            { title: 'La lambda-pavé qui avalé la logique métier', lang: 'java', bad:
'commandes.forEach(c -> {\n    // 35 lignes : validation, taxation, arrondis, journalisation,\n    // envoi mail client, mise à jour du stock, écriture PDF…\n});',
              good:
'commandes.forEach(this::traiterCommande);\n\nprivate void traiterCommande(Commande c) {\n    valider(c); facturer(c); expedier(c);\n}\n// Une lambda = l\'expression d\'UN comportement. Sinon : méthode nommée.',
              why: 'La lambda brille par sa brièveté expressive : au-delà de quelques lignes, elle cesse d\'être lue — et échappe aux tests unitaires ciblés (on ne peut pas appeler une lambda « de l\'extérieur »). Extraire une méthode nommée rend chaque étape testable, réutilisable, documentable pour la suivante — et la composition finale reste d\'une ligne.' }
          ],
          related: ['java-interfaces-fonctionnelles', 'java-streams-api', 'java-comparable-comparator', 'java-interfaces']
        },

        {
          id: 'java-interfaces-fonctionnelles',
          title: 'Function, Predicate, Supplier, Consumer',
          icon: 'widgets',
          level: 'Intermédiaire',
          tagline: 'java.util.function : la trousse d\'interfaces standard que chaque développeur Java connaît sur le bout des doigts.',
          intro: 'Une lambda ne flotte pas dans le vide : elle doit **coller à une interface à une seule méthode abstraite** — une *interface fonctionnelle*. Plutôt que d\'en inventer mille, Java 8 a fourni une dizaine de signatures génériques dans `java.util.function`. Elles couvrent 95 % des usages, et toute l\'API Stream fonctionne avec. Apprends-les comme une table de multiplication.',
          blocks: [
            { t: 'p', h: '**Le marqueur officiel** : `@FunctionalInterface` déclare et *fait vérifier par le compilateur* qu\'une interface n\'a qu\'une méthode abstraite. Les méthodes `default`, `static` (et celles héritées d\'`Object` comme `equals`) ne comptent pas. Une interface fonctionnelle peut donc être riche — tant qu\'elle ne demande qu\'UNE seule implémentation.' },
            { t: 'table', head: ['Interface', 'Méthode / signature', 'Question posée', 'Utilisation culte'], rows: [
              ['`Function<T,R>`', 'R apply(T)', '« transformer T en R »', 'stream.map(...), andThen'],
              ['`Predicate<T>`', 'boolean test(T)', '« faut-il garder T ? »', 'stream.filter(...), removeIf'],
              ['`Consumer<T>`', 'void accept(T)', '« consommer T »', 'forEach(...), andThen'],
              ['`Supplier<T>`', 'T get()', '« fournir T »', 'orElseGet(...), fabriques lazy'],
              ['`UnaryOperator<T>`', 'T apply(T)', '`Function<T,T>` (même type)', 'List.replaceAll(...)'],
              ['`BiFunction<T,U,R>`', 'R apply(T, U)', '« combiner un couple »', 'Map.merge(...), reduce']
            ] },
            { t: 'h3', h: 'La composition : des petites pièces, des machines' },
            { t: 'code', lang: 'java', label: 'Assembler les comportements', code:
'Predicate<Vente> valide   = v -> v.montant() > 0;\nPredicate<Vente> grosse   = v -> v.montant() >= 500_000;\nPredicate<Vente> importante = valide.and(grosse);       // && déclaré en code ✨\nPredicate<Vente> negligeable = importante.negate();     // !\n\nFunction<String, String> nettoyer   = String::strip;\nFunction<String, String> majuscules = String::toUpperCase;\nFunction<String, String> normaliser = nettoyer.andThen(majuscules);\nnormaliser.apply("  momo  ");       // "MOMO" : pipeline T -> R -> R\' -> R\'\'\n\nConsumer<Vente> journaliser = v -> journal.log(INFO, v.toString());\nConsumer<Vente> notifier    = v -> sms.envoyer(v.vendeur(), "Vente enregistrée");\nConsumer<Vente> traiter     = journaliser.andThen(notifier);   // chaîne d\'effets' },
            { t: 'h3', h: 'Les variantes primitives : la perf silencieuse' },
            { t: 'code', lang: 'java', label: 'Éviter l\'autoboxing en série', code:
'Predicate<Long> grosseCoûteuse = m -> m > 500_000;      // boxing à CHAQUE appel\n\nLongPredicate grosse = m -> m > 500_000;                // long natif ✓\nIntPredicate pair   = n -> n % 2 == 0;\nToLongFunction<Vente> montant = Vente::montant;           // pour Stream.mapToLong\n\nlong total = ventes.stream()\n    .mapToLong(Vente::montant)      // LongStream : zéro objet intermédiaire\n    .sum();\n// Sur 10 M d\'éléments, les variantes primitives changent le destin du GC.' },
            { t: 'h3', h: 'Définir la sienne : quand le standard ne suffit plus' },
            { t: 'code', lang: 'java', label: 'Une interface fonctionnelle métier', code:
'@FunctionalInterface\ninterface ConversionDevise {\n    long convertir(long montantXOF, double taux);\n\n    default ConversionDevise arrondirAuCent() {        // default : ne compte pas\n        return (montant, taux) -> Math.round(convertir(montant, taux));\n    }\n}\n\nConversionDevise versEuro = (montant, taux) ->\n        Math.round(montant / taux);      // 1 EUR ≈ 655,957 XOF — arrondi métier\nlong prixEuro = versEuro.convertir(65_595_700L, 655.957);',
              }
          ],
          errors: [
            { title: 'Deux méthodes abstraites : plus de cible lambda', lang: 'java', bad:
'@FunctionalInterface\ninterface Traitement {\n    void demarrer();\n    void arreter();       // ✗ error: @FunctionalInterface n\'est pas respectée\n}',
              good:
'@FunctionalInterface\ninterface Traitement {\n    void demarrer();                // LA méthode abstraite unique\n    default void arreter() {        // default : hors SAM, autorisée ✓\n        System.out.println("arrêt propre");\n    }\n}\n// Deux vraies abstraites ? Ce n\'est plus une interface fonctionnelle,\n// c\'est un contrat classique — implémente-le nommément.',
              why: 'La lambda repose sur un principe : **une seule méthode à implémenter** — ainsi le compilateur associe sans ambiguïté le code `(params) -> corps` à LA méthode. Deux abstraites, et l\'association devient indécidable : la compilation l\'interdit net. L\'annotation `@FunctionalInterface` transforme ce principe en garde-fou permanent : tout ajout futur d\'abstraite cassera le build, pas ta prod.' },
            { title: 'Ignorer les variantes primitives sur les gros volumes', lang: 'java', bad:
'Predicate<Long> seuil = m -> m > 500_000;\nlong total = ventes.stream()\n    .map(Vente::montant)            // Stream<Long> : un objet Long PAR vente\n    .filter(seuil)\n    .reduce(0L, Long::sum);',
              good:
'long total = ventes.stream()\n    .mapToLong(Vente::montant)      // LongStream : zéro wrapper ✓\n    .filter(m -> m > 500_000)\n    .sum();\n// LongPredicate, ToLongFunction, LongStream : la famille primitive.',
              why: 'Chaque Long créé par l\'autoboxing est un objet du heap — et des millions d\'objets à vie de quelques nanosecondes pressent le GC. Les variantes primitives (`IntPredicate`, `ToLongFunction`, `mapToLong`…) laissent tout dans des registres et des canaux dédiés. Sur les calculs massifs, c\'est typiquement un facteur 5 à 10 en vitesse et une mémoire divisée.' },
            { title: 'Inventer sa propre FunctionalInterface équivalente', lang: 'java', bad:
'interface StringEnMajuscules {                     // « parce que c\'est ma classe »\n    String mettreEnMajuscules(String entree);\n}\nFunction<String, String> f = String::toUpperCase;   // existait déjà !',
              good:
'Function<String, String> enMajuscules = String::toUpperCase;\n// Les interfaces standard partagent la même forme : interop totale avec\n// Stream, Optional, CompletableFuture — sans adaptateur aucun.',
              why: 'Créer sa propre interface fonctionnelle « équivalente » fragmente l\'API : tes méthodes ne pourront pas prendre un `Function` standard, ni être composées avec `andThen`. On ne crée une interface dédiée que lorsque le **nom** et le **contrat** métier apportent une vraie valeur sémantique (ConversionDevise, ValidateurFacture) — jamais pour « une fonction de String vers String ».' }
          ],
          related: ['java-lambdas', 'java-streams-api', 'java-primitifs-wrappers', 'java-optional']
        },

        {
          id: 'java-streams-api',
          title: 'L\'API Stream : le tapis roulant des données',
          icon: 'waves',
          level: 'Intermédiaire',
          tagline: 'filter → map → collect : transformer les collections comme sur un tapis d\'usine — paresseux, déclaratif, sans boucle visible.',
          intro: 'L\'API Stream (Java 8) a changé la manière d\'écrire les traitements de données : au lieu de dérouler des boucles avec un état qui mute partout, tu **déclares un pipeline** — source, transformations, résultat — et la bibliothèque l\'exécute efficacement. Trois idées à ancrer : un stream **ne stocke rien**, il est **paresseux**, et il **ne s\'utilise qu\'une seule fois**.',
          blocks: [
            { t: 'code', lang: 'text', label: 'Le pipeline en trois temps', code:
'LISTE DE VENTES (source : stream())\n      │\n      ├─ filter(v -> v.statut() == PAYEE)     intermédiaire : paresseux,\n      ├─ map(Vente::montant)                  encore paresseux,\n      ├─ sorted(reverseOrder())               toujours paresseux…\n      │\n      ▼    (rien ne s\'est encore passé !)\n      sum()                            TERMINAL : tout se déclenche ICI\n\nSortie possible : valeur (sum, count), collection (collect),\nréponse booléenne (anyMatch)… mais LE SEUL déclencheur, c\'est lui.' },
            { t: 'code', lang: 'java', label: 'Le chiffre d\'affaires de Dantokpa, en pipelines', code:
'// Total des ventes de gari payées :\nlong totalGari = ventes.stream()\n    .filter(v -> v.produit().equals("gari"))     // garde les ventes de gari\n    .mapToLong(Vente::montant)                   // primitif : zéro boxing\n    .sum();\n\n// Chiffre par vendeur (regroupement + agrégat) :\nMap<String, Long> parVendeur = ventes.stream()\n    .filter(v -> v.statut() == Statut.PAYEE)\n    .collect(Collectors.groupingBy(\n            Vente::vendeur,\n            Collectors.summingLong(Vente::montant)));\n\n// Top 3 descriptions des plus grosses ventes :\nList<String> podium = ventes.stream()\n    .sorted(Comparator.comparingLong(Vente::montant).reversed())\n    .map(v -> v.vendeur() + " : " + v.montant() + " F")\n    .distinct()\n    .limit(3)\n    .collect(Collectors.toList());' },
            { t: 'h3', h: 'Le catalogue mental à connaître' },
            { t: 'table', head: ['Étage', 'Opérations', 'Rôle'], rows: [
              ['intermédiaires', 'filter, map, flatMap, distinct, sorted, limit, skip, peek', 'définissent le plan, LAZY'],
              ['terminales — valeur', 'sum, count, min, max, reduce, anyMatch, allMatch, findFirst', 'répondent à une question'],
              ['terminales — collecte', 'collect(toList/toSet/toMap/joining), groupingBy, partitioningBy', 'rassemblent le résultat']
            ] },
            { t: 'h3', h: 'Paresseux : la démonstration qui marque' },
            { t: 'code', lang: 'java', label: 'Sans terminale, rien ne bouge', code:
'Stream<Vente> plan = ventes.stream()\n    .filter(v -> { System.out.println("examiné : " + v); return v.paye(); });\n// …\n// RIEN n\'est affiché. Le pipeline est un PLAN, pas une exécution.\n// Ajoute plan.count(); et d\'un coup : toutes les lignes « examiné » défilent.' },
            { t: 'h3', h: 'Collectors : l\'art des rassemblements' },
            { t: 'code', lang: 'java', label: 'Les collecteurs qui remplacent 15 lignes', code:
'Map<Boolean, List<Vente>> repartition = ventes.stream()\n    .collect(Collectors.partitioningBy(Vente::paye));   // payées / en attente\n\nString vocabulaire = produits.stream()\n    .map(Produit::nom)\n    .distinct()\n    .collect(Collectors.joining(", "));      // "gari, huile, riz"\n\nMap<String, Long> comptes = ventes.stream()\n    .collect(Collectors.groupingBy(Vente::vendeur, Collectors.counting()));' },
            { t: 'callout', kind: 'warn', h: 'Un stream se consomme **une seule fois** : le réutiliser lève `IllegalStateException: stream has already been operated upon or closed`. Et modifier la collection *source* pendant le pipeline = `ConcurrentModificationException`. Le stream est un voyage à sens unique depuis une source *stable*.' }
          ],
          errors: [
            { title: 'Réutiliser un stream déjà consommé', lang: 'java', bad:
'Stream<Vente> s = ventes.stream().filter(Vente::paye);\nlong nb = s.count();                 // premier passage : OK\nlong total = s.mapToLong(Vente::montant).sum();\n// ✗ IllegalStateException: stream has already been operated upon…',
              good:
'// Recrée le pipeline : c\'est local, gratuit en mémoire, toujours sain.\nlong total = ventes.stream()\n    .filter(Vente::paye)\n    .mapToLong(Vente::montant)\n    .sum();\n// Un stream est un VOYAGE, pas un véhicule garé : on repart de la source.',
              why: 'La consommation d\'un stream détruit son état interne : fermé, vidé, terminé. Stocker des streams dans des variables comme s\'ils étaient des listes est le bug du débutant ; la garantie de la paresse n\'existe que dans la chaîne *complète* écrite d\'un tenant. Partage et stocke la *source* (la collection), jamais le pipeline.' },
            { title: 'Effet de bord externe dans un map : le pipeline qui triche', lang: 'java', bad:
'List<String> vendus = new ArrayList<>();\nproduits.stream()\n    .filter(Produit::estVendu)\n    .map(p -> vendus.add(p.nom()));      // ✗ effet de bord : mutation externe\n// Si demain le stream devient parallelStream : corruption garantie.',
              good:
'List<String> vendus = produits.stream()\n    .filter(Produit::estVendu)\n    .map(Produit::nom)\n    .collect(Collectors.toList());       // ✓ le TERMINAL collectionne',
              why: 'Les opérations d\'un pipeline doivent être *pures* — même entrée, même sortie, zéro contact avec un état extérieur — sinon la bibliothèque ne peut plus garantir ni l\'ordre ni la parallélisabilité. Toute collecte passe par `collect` (qui connaît les bons accumulateurs thread-safes). C\'est le prix de la puissance : sur ce tapis roulant, on ne « touche » à rien à la main.' },
            { title: 'parallelStream « pour que ce soit rapide »', lang: 'java', bad:
'rapport = lignes.parallelStream()      // 200 lignes ? 2 000 ?\n                .map(this::nettoyer)    // travail de 3 ms\n                .collect(toList());     // → coût du découpage >> gain',
              good:
'// La parallélisation SE MESURE, sur les bonnes conditions seulement :\n// (1) des millions d\'éléments, (2) du CALCUL pur par élément (pas d\'I/O !),\n// (3) une source facilement scindable (ArrayList, tableaux),\n// (4) un benchmark qui PROUVE le gain. À défaut : stream() séquentiel.',
              why: 'Un parallelStream découpe le travail et le distribue sur un pool partagé (ForkJoinPool commun à toute la JVM) : communication entre threads, ordre des résultats, contention. Sur un petit volume ou des opérations légères, le surcoût dépasse largement le gain — fréquent « 4 fois plus lent ». Et avec un fond d\'I/O (lecture réseau), c\'est carrément l\'anti-outil : ce sont les *threads virtuels* qui traitent ce cas-là.' }
          ],
          related: ['java-lambdas', 'java-interfaces-fonctionnelles', 'java-optional', 'java-map']
        },

        {
          id: 'java-optional',
          title: 'Optional : l\'antidote déclaré à NullPointerException',
          icon: 'indeterminate_check_box',
          level: 'Intermédiaire',
          tagline: 'Une boîte qui dit honnêtement « il peut ne rien y avoir » — au lieu du null qui attend de te trahir.',
          intro: 'Tony Hoare lui-même a qualifié l\'invention du `null` (1965) de « billion-dollar mistake » : chaque référence peut être nulle, chaque appel de méthode dessus est une NPE potentielle. `Optional<T>` (Java 8) rend **l\'absence explicite dans la signature** : une méthode qui retourne `Optional<Client>` t\'oblige, par le typage, à répondre à la question « et si c\'est vide ? ».',
          blocks: [
            { t: 'code', lang: 'java', label: 'La comparaison qui fait tout comprendre', code:
'// Avant : l\'absence INVISIBLE dans la signature\nClient trouverClient(String numero);          // peut renvoyer null… qui sait ?\nString ville = trouverClient(num).adresse().ville();   // NPE à la première absence\n\n// Avec Optional : l\'absence DANS le type — impossible à ignorer\nOptional<Client> trouverClient(String numero);\nString ville = trouverClient(num)\n    .map(Client::adresse)\n    .map(Adresse::ville)\n    .orElse("ville inconnue");                 // ✓ la réponse au vide est écrite' },
            { t: 'h3', h: 'Créer et consommer proprement' },
            { t: 'code', lang: 'java', label: 'Les quatre gestes du quotidien', code:
'Optional<Client> peutEtre = depot.findByNumero(numero);\n\n// 1. Valeur de repli (statique) :\nClient c = peutEtre.orElse(INVITE);\n\n// 2. Calculer LA valeur de repli — paresseusement (lambda, seulement si vide) :\nClient c2 = peutEtre.orElseGet(() -> creerClientInvite());\n\n// 3. Ne pas accepter le vide :\nClient c3 = peutEtre.orElseThrow(() -> new NoSuchElementException("client " + numero));\n\n// 4. Agir s\'il y a quelqu\'un :\npeutEtre.ifPresent(cl -> notifier(cl));\npeutEtre.ifPresentOrElse(this::notifier, () -> journal.log("aucun client"));' },
            { t: 'h3', h: 'orElse vs orElseGet : l\'appel qui coûte' },
            { t: 'code', lang: 'java', label: 'La différence qui se paie en base de données', code:
'depot.findByNumero(num).orElse(genererClientParDefaut());\n// ✗ genererClientParDefaut() s\'exécute TOUJOURS — même si le client existe !\n// (l\'argument est évalué AVANT l\'appel d\'orElse)\n\ndepot.findByNumero(num).orElseGet(() -> genererClientParDefaut());\n// ✓ le Supplier n\'est appelé QUE si la boîte est vide —\n// indispensable quand la valeur de repli coûte (SQL, réseau, fichier).' },
            { t: 'h3', h: 'Transformer sans jamais quitter la boîte' },
            { t: 'code', lang: 'java', label: 'La chaîne Optional, en cascade', code:
'String ville = depot.findByNumero(numero)\n    .map(Client::adresse)                    // Optional<Adresse>\n    .map(Adresse::ville)                     // Optional<String>\n    .filter(v -> !v.isBlank())                // vide si chaîne blanche\n    .orElse("Cotonou");                       // replat à la fin, UNE fois' },
            { t: 'p', h: 'Et pour les primitifs (`findFirst` sur un IntStream, un `sum()` sans éléments), il existe `OptionalInt`, `OptionalLong`, `OptionalDouble` — mêmes usages, sans autoboxing.' },
            { t: 'callout', kind: 'tip', h: 'Les délimitations du bon usage sont codifiées par les auteurs de l\'API : **Optional = type de RETOUR**, point. Pas un champ d\'entité (sérialisation !), pas un paramètre de méthode (surcharges lisibles à la place), pas un élément de collection. Le chanceux exception : les `findFirst`/`max` des streams, et la logique interne si tu documentes.' }
          ],
          errors: [
            { title: 'Optional.get() sans isPresent() : la NoSuchElement', lang: 'java', bad:
'Optional<Produit> p = catalogue.findByNom(saisie);\nreturn p.get().prix();       // NoSuchElementException s\'il est VIDE\n// Tu as remplacé une NPE… par une autre explosion — même résultat.',
              good:
'return catalogue.findByNom(saisie)\n    .map(Produit::prix)\n    .orElseThrow(() -> new NoSuchElementException("produit inconnu: " + saisie));',
              why: '`get()` est le retour au péché originel : l\'exception se contente de changer de nom, et le code *semble* moderne. L\'intérêt d\'Optional, c\'est que le traitement de l\'absence soit **exprimé** — orElse, orElseThrow avec message, ifPresent. Sur une vraie codebase, tout `.get()` isolé est un drapeau rouge de revue de code.' },
            { title: 'Le pattern isPresent()/get() : recréer l\'if null avec Optional', lang: 'java', bad:
'Optional<Client> oc = depot.findByNumero(num);\nif (oc.isPresent()) {\n    facture.oc.get().client();   // isPresent + get : Optional utilisé comme un null\n} else {\n    journal.log("sans client");\n}',
              good:
'depot.findByNumero(num)\n     .ifPresentOrElse(this::facturer, () -> journal.log("sans client"));\n\n// ou si tu dois CONSTRUIRE quelque chose quand présent :\nString ligne = depot.findByNumero(num)\n    .map(c -> "Facture " + c.nom())\n    .orElse("client absent du référentiel");',
              why: 'Le couple `isPresent()/get()` réintroduit l\'exact problème qu\'Optional résout : une interrogation manuelle oubliable, une extraction dangereuse. Le style `map`/`ifPresent(OrElse)`/filtres rend le choix de l\'absence **structurel**, pas mémoriel — c\'est là-dessus que toute la valeur de l\'API repose.' },
            { title: 'Optional en champ d\'entité ou en paramètre de méthode', lang: 'java', bad:
'public class Facture {\n    private Optional<Client> client;    // ✗ sérialisation/JPA/question d\'état\n}\npublic void notifier(Optional<Client> client) { … }   // ✗ signature lourde',
              good:
'// Champ : garde le null MÉTIER interne, expose un Optional en SORTIE :\npublic Optional<Client> getClient() { return Optional.ofNullable(client); }\n// Paramètre : surcharges ou builder :\npublic void notifier(Client client) { … }\npublic void notifierInvite() { … }',
              why: 'Les concepteurs de l\'API ont été explicites : Optional représente un *retour possiblement vide*, pas un modèle de donnée. En champ, il complique la sérialisation et JPA, double l\'état « absent » avec le bon vieux null, alourdit chaque accès. En paramètre, il rend l\'appelant responsable d\'un choix qui t\'appartient. C\'est pour cela qu\'il est resté intentionnellement non-Serializable.' }
          ],
          related: ['java-streams-api', 'java-string-immutable', 'java-checked-unchecked', 'java-spring-rest']
        }
      ]
    }
);
DEVDOCS.java.categories.push(
    /* ======================================================
       9. CONCURRENCE & MULTITHREADING
       ====================================================== */
    {
      id: 'concurrence',
      name: 'Concurrence & threads',
      icon: 'bolt',
      fiches: [
        {
          id: 'java-thread-runnable',
          title: 'Thread et Runnable : les fondations',
          icon: 'directions_run',
          level: 'Avancé',
          tagline: 'Un thread, c\'est un employé de la boutique : il fait sa tâche pendant que le patron en fait une autre — si on le lance correctement.',
          intro: 'Un **thread** est un flux d\'exécution indépendant : sa propre stack, son propre chemin dans le code, partagé le même heap avec les autres. C\'est l\'outil quand une tâche longue (export, encaissement, synchronisation réseau) ne doit pas geler le reste. Java le modélise sobrement : une **tâche** (`Runnable`) confiée à un **exécuteur** (`Thread`) — séparation fondatrice.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Lancer (vraiment) un thread', code:
'// La TÂCHE : quoi faire — un Runnable (interface fonctionnelle !)\nRunnable export = () -> {\n    System.out.println("Export lancé par " + Thread.currentThread().getName());\n    // …générer le PDF de fin de journée…\n};\n\n// L\'EXÉCUTEUR : qui le fait — un Thread NOMMÉ (debug salvateur)\nThread comptable = new Thread(export, "export-pdf");\ncomptable.start();          // ✓ crée un VRAI nouveau flux d\'exécution\n\n// comptable.run();         // ✗ exécute la tâche SUR LE THREAD COURANT :\n                             // aucun parallélisme, blocage complet. L\'erreur nº 1.' },
            { t: 'h3', h: 'Le cycle de vie : six états à connaître' },
            { t: 'code', lang: 'text', label: 'Du berceau à la tombe', code:
'NEW ──start()──► RUNNABLE  ◄──────► (l\'OS décide qui tourne vraiment)\n (Thread créé)       │\n                     │  sleep(ms), join(), wait(), verrou déjà pris\n                     ▼\n           TIMED_WAITING / WAITING / BLOCKED\n                     │  délai écoulé, notify(), verrou libéré\n                     ▼\n                TERMINATED     ← run() terminé : DÉFINITIF,\n                                 un thread ne redémarre JAMAIS' },
            { t: 'p', h: 'Retiens surtout : `BLOCKED` = en attente d\'un verrou `synchronized` (un autre thread est dans la cabine), `WAITING`/`TIMED_WAITING` = pause explicite. Un thread terminé ne se relance pas — on en crée un autre. Et les outils de diagnostic (jstack, JFR) affichent les *noms* : nommer ses threads est un investissement qui te rend service dès le premier blocage en production.' },
            { t: 'h3', h: 'Arrêter proprement : la coopération, pas l\'exécution' },
            { t: 'code', lang: 'java', label: 'Le protocole interrupt', code:
'Thread recon = new Thread(() -> {\n    while (!Thread.currentThread().isInterrupted()) {\n        rapprocherStocks();\n        try {\n            Thread.sleep(5_000);            // sleep RÉAGIT à interrupt :\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();   // ✓ on RELANCE le drapeau\n            return;                               // et on sort proprement\n        }\n    }\n});\nrecon.start();\nrecon.interrupt();       // demande CIVILE : « s\'il te plaît, arrête-toi »\n\n// Thread.stop() existe encore… DEPRECATED depuis Java 1.2 : il coupe\n// le fil en plein milieu de l\'écriture d\'un objet — état corrompu garanti.' },
            { t: 'ul', items: [
              '**Préfère implémenter `Runnable`** (ou une lambda) que d\'étendre `Thread` : la tâche reste testable et exécutable par n\'importe quel mécanisme (thread, pool, virtual thread). `extends Thread` fusionne inutilement tâche et exécuteur.',
              '**Chaque thread possède sa stack** (~512 Ko - 1 Mo) : les variables locales restent privées par nature ; le *heap*, lui, est partagé — toute la difficulté de la concurrence est ramassée là.',
              '**Un thread « daemon »** n\'empêche pas la JVM de s\'arrêter (utile pour les services d\'arrière-plan) ; les threads classiques la maintiennent vivante — raison pour laquelle une app « finie » peut refuser de quitter.',
              '**Aujourd\'hui, les threads « à la main » se raréfient** : ExecutorService les mutualise, les virtual threads les démocratisent — mais cette mécanique reste la base de tout ce qui suit.'
            ] }
          ],
          errors: [
            { title: 'Appeler run() au lieu de start()', lang: 'java', bad:
'Thread t = new Thread(() -> exporterPdf());\nt.run();          // compile parfaitement…\n// et l\'export S\'EXÉCUTE sur le thread courant : l\'interface se fige, le\n// « multithreading » n\'a jamais existé. Le bug le plus silencieux de Java.',
              good:
'Thread t = new Thread(() -> exporterPdf(), "export-pdf");\nt.start();        // ✓ demande à la JVM de CRÉER le fil et d\'y appeler run()',
              why: '`run()` est une méthode tout à fait ordinaire : l\'appeler, c\'est exécuter le code *ici et maintenant*, sans nouveau thread. Seul `start()` demande à la JVM le flux d\'exécution séparé dans lequel run() sera ensuite appelé. Comme en C un fork sans fork. Pas d\'exception, pas de warning : juste du code séquentiel déguisé en parallèle.' },
            { title: 'Avaler InterruptedException et continuer gaiement', lang: 'java', bad:
'while (true) {\n    traiterTacheSuivante();\n    try { Thread.sleep(1_000); }\n    catch (InterruptedException e) { /* circulez */ }   // drapeau perdu !\n}\n// Personne ne pourra PLUS jamais arrêter ce thread poliment.',
              good:
'while (!Thread.currentThread().isInterrupted()) {\n    traiterTacheSuivante();\n    try { Thread.sleep(1_000); }\n    catch (InterruptedException e) {\n        Thread.currentThread().interrupt();   // réarme le drapeau ✓\n        break;                                 // ou return\n    }\n}',
              why: '`sleep()` répond à un interrupt en *levant* InterruptedException **et en effaçant le drapeau**. L\'avaler, c\'est déchirer la note de licenciement : la boucle repart et le thread devient inarrêtable autrement qu\'en tuant la JVM. Réarmer le drapeau permet à l\'appelant — souvent un framework qui veut arrêter proprement — de savoir qu\'il a été entendu.' },
            { title: 'Étendre Thread pour « gagner du temps »', lang: 'java', bad:
'class ExportPdf extends Thread {      // la tâche EST un Thread — couplage total\n    @Override public void run() { generer(); }\n}\nnew ExportPdf().start();              // test unitaire ? pool ? virtual ? inadapté',
              good:
'class ExportPdf implements Runnable {          // la tâche, pure\n    @Override public void run() { generer(); }\n}\nnew Thread(new ExportPdf(), "export-pdf").start();          // thread classique ✓\nexecutor.submit(new ExportPdf());                          // pool ✓\nThread.startVirtualThread(new ExportPdf());                // virtual ✓',
              why: 'Java n\'autorise qu\'un seul `extends` : le dépenser pour « être un Thread » verrouille ta hiérarchie et fusionne deux rôles — *quoi faire* et *qui l\'exécute*. Avec `Runnable`, la même tâche se lance partout : thread simple, pool, executor de threads virtuels, tests unitaires en appel direct. C\'est la composition qui gagne, comme toujours en Java.' }
          ],
          related: ['java-synchronized', 'java-executor-completable', 'java-virtual-threads', 'java-heap-stack']
        },

        {
          id: 'java-synchronized',
          title: 'synchronized : un seul dans la cabine',
          icon: 'security',
          level: 'Avancé',
          tagline: 'Le verrou qui garantit qu\'un seul thread touche au solde à la fois — et rebat les cartes de la visibilité.',
          intro: 'Dès que deux threads partagent un état, la catastrophe a un nom : la **race condition**. Deux opérations « évidentes » s\'entrelacent et produisent un résultat ni prévu ni reproductible — le pire genre de bug. `synchronized` est la réponse historique de Java : un verrou qui n\'admet qu\'**un thread à la fois** dans une section critique. Mais il protège autre chose de moins visible : la *mémoire*.',
          blocks: [
            { t: 'code', lang: 'java', label: 'La course perdue : deux retraits simultanés', code:
'class Guichet {\n    private long solde = 100_000;\n\n    void retirer(long montant) {            // NON protégé :\n        if (solde >= montant) {              // 1. « assez d\'argent ? » OUI\n            long nouveau = solde - montant;  // 2. ← AUTRE THREAD PASSE ICI\n            solde = nouveau;                 // 3. écrase au vu de sa vieille lecture\n        }\n    }\n}\n// Deux retraits de 80 000 passent CHACUN le test du solde…\n// résultat : -60 000. Le guichet a payé deux fois ce qu\'il n\'avait pas.\n// C\'est la « lost update » : la star des bugs de concurrence.' },
            { t: 'code', lang: 'java', label: 'La même chose, verrouillée', code:
'class Guichet {\n    private long solde = 100_000;\n\n    synchronized void retirer(long montant) {   // ✓ un SEUL thread à la fois\n        if (solde >= montant) {\n            solde -= montant;                    // test + écriture = indivisible\n        }\n    }\n}\n// Le deuxième retrait attend la sortie du premier : il lit le BON solde\n// (80 000 → 20 000) et son test échoue, correctement, honnêtement.' },
            { t: 'h3', h: 'Ce que synchronized fait EXACTEMENT' },
            { t: 'ul', items: [
              '**Exclusion mutuelle** : chaque objet Java possède un *moniteur* ; `synchronized` le verrouille à l\'entrée, le libère à la sortie — même en cas d\'exception.',
              '**Visibilité** : tout ce qu\'a écrit le thread A avant de *libérer* le verrou devient visible pour le thread B qui le *prend* ensuite. C\'est le fameux bord **happens-before** du Java Memory Model — sans lui, B pourrait lire des valeurs périmées du cache processeur.',
              '**Réentrance** : le même thread peut reprendre SON verrou (méthode synchronized qui en appelle une autre) sans se bloquer lui-même.',
              '**Méthode ou bloc : quel objet verrouille ?** : une méthode d\'instance synchronisée verrouille `this` ; une méthode `static synchronized` verrouille... la `Class` elle-même — différent, souvent oublié !',
              '**Un bloc `synchronized(verrou)` sur un objet privé** restreint la section critique au strict nécessaire : plus le verrou est petit, moins on paie.'
            ] },
            { t: 'code', lang: 'java', label: 'Le bloc dédié : verrou privé, portée minimale', code:
'class Journal {\n    private final List<String> lignes = new ArrayList<>();\n    private final Object verrou = new Object();    // verrou PRIVÉ, dédié\n\n    void ajouter(String ligne) {\n        // … préparation coûteuse HORS verrou …\n        synchronized (verrou) {                     // section critique minimale\n            lignes.add(ligne);                      // seul l\'accès partagé est protégé\n        }\n    }\n}' },
            { t: 'callout', kind: 'warn', h: '`synchronized` n\'est pas gratuit : contention = files d\'attente, et une section critique trop large transforme ton multithreading en single-threading à files d\'attente. La règle : verrouiller *le moins possible* (l\'accès à l\'état partagé), garder le travail lent (I/O, calculs) hors du verrou. Et pour les compteurs et accumulateurs simples, `AtomicInteger` et consorts font mieux, sans verrou.' }
          ],
          errors: [
            { title: 'Deux threads, deux verrous différents : le verrou décoratif', lang: 'java', bad:
'// Thread 1 : synchronized (verrouA) { solde -= m; }\n// Thread 2 : synchronized (verrouB) { solde -= m; }\n// Chacun entre librement : l\'exclusion n\'a JAMAIS existé.\n// Variant sournois : synchroniser sur un paramètre ou un champ NON final\n// réassigné entre-temps.',
              good:
'private final Object verrouCompte = new Object();   // UN verrou, final\nvoid retirer(long m) {\n    synchronized (verrouCompte) { solde -= m; }      // TOUS les accès au solde\n}                                                     // passent par LUI',
              why: 'L\'exclusion mutuelle ne fonctionne qu\'**entre prises du MÊME verrou** : synchroniser sur des objets différents, c\'est poser deux portes sur deux couloirs qui mènent à la même caisse. En particulier, verrouiller sur `this` alors que l\'objet peut être accédé autrement, ou sur un objet réassigné, détruit la garantie. Le verrou est un *contrat partagé* : même objet, stable, privé, documenté.' },
            { title: 'Synchroniser sur un String ou un Integer : les objets partagés', lang: 'java', bad:
'synchronized ("verrouSolde") { solde -= m; }      // String LITTÉRALE !\nsynchronized (Integer.valueOf(seuil)) { … }        // Integer du cache −128..127…\n// Ces objets sont MUTUALISÉS par la JVM : ton voisin peut détenir\n// LE MÊME objet — tu bloques son code, ou il bloque le tien. Imprevisible.',
              good:
'private final Object verrou = new Object();    // neuf, privé, à RIEN d\'autre\nsynchronized (verrou) { solde -= m; }\n// Un verrou utile n\'a pas d\'autre existence que verrouiller.',
              why: 'Le pool de String interne les littéraux ; le cache d\'Integer partage les petites valeurs ; un Boolean TRUE/FALSE est unique par JVM. Verrouiller dessus, c\'est prendre la poignée d\'une porte qui sert tout l\'immeuble : interblocages mystérieux entre bibliothèques qui ne se connaissent pas. Un `new Object()` privé est le seul garant qu\'on est seul à détenir la clé.' },
            { title: 'wait() testé avec if : la notification volée', lang: 'java', bad:
'synchronized (file) {\n    if (file.isEmpty()) file.wait();     // spurious wakeup possible !\n    prendre(file);                        // et on pop sur une file vide : plantage',
              good:
'synchronized (file) {\n    while (file.isEmpty()) file.wait();   // TOUJOURS une boucle while ✓\n    prendre(file);                        // réveil = on REVERIFIE la condition\n}\n// (Et à première occasion : BlockingQueue — la file qui sait attendre\n// toute seule, sans ces chorégraphies.)',
              why: 'La JVM se réserve des *réveils intempestifs* (spurious wakeups), et `notify()` peut réveiller plusieurs threads pour une seule ressource : la condition peut de nouveau être fausse au retour de `wait()`. Le `while` réévalue à chaque réveil — c\'est le motif officiel du Javadoc, pas un style capricieux. Cela dit, ces dinosaures `wait/notify` ont cédé la place aux `BlockingQueue`, `Semaphore` et autres outils de `java.util.concurrent`.' }
          ],
          related: ['java-volatile', 'java-thread-runnable', 'java-executor-completable', 'java-virtual-threads']
        },

        {
          id: 'java-volatile',
          title: 'volatile : la visibilité entre threads',
          icon: 'visibility',
          level: 'Avancé',
          tagline: 'Sans volatile, un thread peut lire éternellement une valeur périmée : le drapeau d\'arrêt bouge, mais lui ne le voit jamais.',
          intro: 'Pour la vitesse, chaque cœur du processeur **met en cache** les variables qu\'il utilise. Conséquence infernale en concurrence : un thread écrit `actif = false` dans SON cache, l\'autre thread continue de lire l\'**ancienne valeur** dans le sien — la boucle ne s\'arrête jamais. Le mot-clé `volatile` ordonne la lecture/écriture directement en mémoire principale : la valeur écrite par l\'un est *immédiatement* visible de tous.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Le drapeau d\'arrêt : cas d\'école', code:
'class Machine {\n    private volatile boolean enMarche = true;   // ← le mot qui change tout\n\n    void produire() {\n        while (enMarche) {                // SANS volatile : possible boucle\n            fabriquerPiece();             // infinie — la JVM peut « hisser » la\n        }                                  // lecture hors de la boucle (optimisation !)\n    }\n    void arreter() { enMarche = false; }  // AVEC volatile : vue tout de suite ✓\n}' },
            { t: 'p', h: '**Ce que volatile garantit** : (1) **visibilité** — lecture/écriture en mémoire principale, pas de valeur périmée de cache ; (2) **ordonnancement** — le compilateur et le processeur ne peuvent pas déplacer des accès autour d\'un accès volatile (c\'est ce qu\'on appelle une *barrière mémoire*). Écrire `enMarche = false` crée un bord happens-before : tout ce que le thread a fait *avant* devient visible pour celui qui lit la variable ensuite.' },
            { t: 'h3', h: 'Ce que volatile ne fait PAS : l\'atomicité' },
            { t: 'code', lang: 'java', label: 'Le compteur volatile qui perd quand même des mises à jour', code:
'private volatile int compteur = 0;\n\nvoid incrementer() {\n    compteur++;      // = lire compteur, ajouter 1, réécrire — TROIS pas !\n}\n// Deux threads lisent « 10 » en même temps, écrivent chacun « 11 » :\n// une incrémentation perdue. volatile n\'aide EN RIEN ici —\n// la visibilité ne rend pas les opérations composées atomiques.\n\n// ✓ Correct : opération atomique garantie par CAS matériel\nprivate final AtomicInteger compteur = new AtomicInteger();\nvoid incrementer() { compteur.incrementAndGet(); }   // inséparable ✓' },
            { t: 'h3', h: 'Le double-checked locking : volatile à son poste le plus subtil' },
            { t: 'code', lang: 'java', label: 'Le singleton paresseux, version correcte', code:
'public class Registre {\n    private static volatile Registre INSTANCE;   // volatile OBLIGATOIRE\n\n    public static Registre get() {\n        if (INSTANCE == null) {                    // lecture rapide, hors verrou\n            synchronized (Registre.class) {\n                if (INSTANCE == null) {            // double vérification sous verrou\n                    INSTANCE = new Registre();\n                }\n            }\n        }\n        return INSTANCE;\n    }\n}\n// Sans volatile : l\'écriture peut être REORDONNÉE — la référence publiée\n// AVANT que le constructeur ait fini d\'initialiser les champs. Un autre thread\n// reçoit alors une instance « visible mais à moitié construite ». Effroyable.' },
            { t: 'table', head: ['', 'volatile', 'synchronized'], rows: [
              ['Visibilité inter-threads', '✓', '✓'],
              ['Atomicité des opérations composées', '✗', '✓'],
              ['Exclusion mutuelle (un à la fois)', '✗', '✓'],
              ['Blocage de threads', 'jamais', 'oui (contention possible)']
            ] },
            { t: 'callout', kind: 'tip', h: 'Les règles du volatile, résumées à l\'usage : drapeaux d\'arrêt et autres *publications d\'état simple* (une variable que chacun lit, qu\'un seul écrit) → volatile. Compteurs, totaux, états composés → `AtomicInteger`/verrous. Dès que ça dépasse ça : les collections concurrentes ou un bon vieux synchronized — n\'essaie pas de construire ta propre quincaillerie atomique.' }
          ],
          errors: [
            { title: 'volatile sur un compteur ++ : la protection illusoire', lang: 'java', bad:
'private volatile int nombreDeCommandes = 0;\nvoid onCommande() { nombreDeCommandes++; }\n// 1 000 commandes simultanées plus tard : 983. Des increments perdus,\n// alors que « la variable était bien volatile, monsieur » !',
              good:
'private final AtomicInteger nombreDeCommandes = new AtomicInteger();\nvoid onCommande() { nombreDeCommandes.incrementAndGet(); }\nlong total() { return nombreDeCommandes.get(); }\n// Visible ET atomique, sans verrou : le CAS du processeur fait le travail.',
              why: '`++` n\'est pas une opération : c\'est *lire, incrémenter, écrire* — trois temps entre lesquels un autre thread peut se glisser. Volatile garantit que la lecture est fraiche, mais deux lectures fraiches peuvent être **les mêmes** : résultat, écrasement mutuel. Seules une exclusion (synchronized) ou une opération *matériellement* inséparable (AtomicInteger et sa famille CAS) rendent la composition sûre.' },
            { title: 'Double-checked locking sans volatile : l\'objet à moitié né', lang: 'java', bad:
'private static Registre INSTANCE;    // PAS volatile\npublic static Registre get() {\n    if (INSTANCE == null) {\n        synchronized (Registre.class) {\n            if (INSTANCE == null) INSTANCE = new Registre();\n        }\n    }\n    return INSTANCE;    // un autre thread peut voir la référence\n}                        // AVANT que les champs soient initialisés !',
              good:
'private static volatile Registre INSTANCE;\n// …le code reste identique ; volatile interdit la réordonnancement\n// « affecter la référence avant fin du constructeur ».\n// (Réflexe 2026 : un enum à un élément, ou un « holder static », est plus simple et plus sûr.)',
              why: 'La création d\'objet n\'est pas indivisible : réserver la mémoire, initialiser les champs, publier la référence… et le JIT/processeur peut *réordonner* ces étapes s\'il n\'y a pas de barrière. Sans volatile, un lecteur concurrent récupère une référence non nulle vers un objet dont les `final` (coucou, sécurité !) n\'ont pas encore été écrits. Le singleton DCL ne fonctionne qu\'avec volatile — sinon, il a la forme de la rigueur et le contenu du chaos.' },
            { title: 'volatile « partout où ça partage » : la confusion des rôles', lang: 'java', bad:
'private volatile String dernierMessage;\nprivate volatile long soldeTotal;\nprivate volatile List<Commande> historique;\n// Tout volatile = rien de pensé : l\'intention architecturale disparaît\n// (et historique reste de toute façon cassable en interne !).',
              good:
'// Volatile : drapeaux et publications SIMPLES uniquement.\n// Compteurs/états composés : AtomicXxx. Collections partagées :\n// ConcurrentHashMap, CopyOnWriteArrayList — des structures FAITES pour.',
              why: 'Volatile protège la *référence* (ou la primitive) elle-même, rien autour : une liste volatile peut toujours voir son *contenu* corrompu par des accès concurrents. Préciser volatile partout signale qu\'on n\'a pas arbitré entre visibilité, atomicité et exclusion — alors que chaque outil de `java.util.concurrent` (et la fiche suivante) a été construit exactement pour un de ces cas.' }
          ],
          related: ['java-synchronized', 'java-thread-runnable', 'java-heap-stack', 'java-executor-completable']
        },

        {
          id: 'java-executor-completable',
          title: 'ExecutorService, Future et CompletableFuture',
          icon: 'groups',
          level: 'Avancé',
          tagline: 'Confie tes tâches à une équipe de threads : Future rapporte le résultat, CompletableFuture compose des pipelines asynchrones.',
          intro: 'Créer un `new Thread()` par tâche, c\'est recruter un employé par client : coûteux (1 Mo de stack par embauche), impossible à organiser, ça finit en débordement. L\'**ExecutorService** mutualise une équipe de threads réutilisés ; le **Future** est le récépissé qui promet un résultat plus tard ; et **CompletableFuture** enchaîne les étapes asynchrones comme un Stream, sans bloquer. C\'est l\'infrastructure de toute la concurrence moderne — avant que les threads virtuels ne simplifient encore la donne.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Le pool, la tâche, le récépissé', code:
'try (ExecutorService equipe = Executors.newFixedThreadPool(4)) { // AutoCloseable Java 19+\n\n    // Callable = une tâche QUI RETOURNE un résultat (vs Runnable : rien)\n    Future<Long> ticket = equipe.submit(() -> calculerTotal(ventes));\n\n    // … le thread principal continue sa vie ici …\n\n    Long total = ticket.get(2, TimeUnit.SECONDS);   // TOUJOURS un timeout !\n}   // pool arrêté automatiquement à la fermeture du try ✓' },
            { t: 'ul', items: [
              '**`submit(Callable)`** rend un `Future<T>` tout de suite ; la tâche s\'exécute *ailleurs* pendant que tu continues.',
              '**`future.get()`** bloque jusqu\'au résultat ; `get(timeout)` est la forme *vitale* — un calcul parti en boucle infinie ne te pend plus au bout.',
              '**Le pool réutilise** ses N threads pour des milliers de tâches : naissance une fois, amortie pour toujours ; plus d\'explosion de stacks natives.',
              '**`invokeAll(tâches)`** lance une série et rend tous les Future ; idéale pour les traitements par lot (« 200 fichiers à nettoyer »).',
              '**`shutdown()` / `awaitTermination()`** : jamais de pool zombie — et depuis Java 19, le try-with-resources le fait pour toi.'
            ] },
            { t: 'h3', h: 'CompletableFuture : le pipeline asynchrone' },
            { t: 'code', lang: 'java', label: 'Interroger deux opérateurs en parallèle, composer', code:
'CompletableFuture<Double> mtn = CompletableFuture\n    .supplyAsync(() -> api.coursMtn())\n    .orTimeout(1, TimeUnit.SECONDS);              // pas d\'attente infinie ✓\n\nCompletableFuture<Double> moov = CompletableFuture\n    .supplyAsync(() -> api.coursMoov());\n\nCompletableFuture<Double> meilleur = mtn\n    .thenCombine(moov, Math::min)                 // combine DEUX futurs\n    .exceptionally(ex -> {                         // chaîne de secours\n        journal.log(Level.WARN, "cotation échouée", ex);\n        return Double.POSITIVE_INFINITY;\n    });\n\nDouble prix = meilleur.join();   // join() = comme get(), en unchecked' },
            { t: 'table', head: ['Étape', 'Rôle', 'Lambda attendue'], rows: [
              ['thenApply(f)', 'transforme le résultat', 'valeur → valeur'],
              ['thenCompose(f)', 'enchaîne une NOUVELLE async', 'valeur → CompletableFuture (aplatit !)'],
              ['thenCombine(a, b)', 'fusionne deux futurs', '(x, y) → résultat'],
              ['acceptEither / allOf / anyOf', 'premier arrivé / tous / n\'importe lequel', 'course ou barrière'],
              ['exceptionally / handle', 'plan B sur erreur', 'erreur → repli']
            ] },
            { t: 'callout', kind: 'warn', h: 'Sans Executor personnalisé, `supplyAsync` s\'exécute sur le `ForkJoinPool.commonPool` — un pool *partagé par TOUTE la JVM*. Y envoyer des appels lents (réseau, SQL) met en file les tâches d\'autres bibliothèques. Sur plateforme : un pool dédié pour l\'I/O bloquante ; ou mieux, depuis Java 21, un executor de **threads virtuels** — le sujet de la fiche suivante.' }
          ],
          errors: [
            { title: 'Future.get() sans timeout : le gel qui ne pardonne pas', lang: 'java', bad:
'Future<Commande> f = pool.submit(() -> api.lireCommande(id));\nCommande c = f.get();          // et si l\'API ne répond JAMAIS ?\n// Le thread appelant est bloqué… indéfiniment. Files d\'attente en cascade,\n// redémarrage manuel à 2 h du matin.',
              good:
'Commande c = f.get(500, TimeUnit.MILLISECONDS);\n}catch (TimeoutException e) {\n    f.cancel(true);            // on libère la tâche partie trop loin\n    throw new DelaiDepasseException(id);\n}\n// Un service distant mérite un timeout + une annulation. Toujours.',
              why: 'Un `get()` nu fait du thread appelant l\'otage de la tâche : pas de borne, pas d\'issue. En production, les appels distants échouent parfois *en ne finissant pas* — seul le timeout borne la durée du désastre, et `cancel(true)` réclame l\'interruption du travail zombie. Si tu n\'as pas choisi ton timeout, tu as choisi l\'infini.' },
            { title: 'Oublier shutdown() : la JVM qui refuse de mourir', lang: 'java', bad:
'ExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(tache);\nSystem.out.println("fin du programme");\n// …mais la console ne rend pas la main ! Les threads du pool,\n// non-daemon, maintiennent la JVM vivante — « l\'application qui ne s\'arrête pas ».',
              good:
'ExecutorService pool = Executors.newFixedThreadPool(4);\ntry {\n    pool.submit(tache).get(2, TimeUnit.SECONDS);\n} finally {\n    pool.shutdown();                                   // refuse les nouvelles tâches\n    pool.awaitTermination(3, TimeUnit.SECONDS);        // attend la fin en cours\n}\n// …ou depuis Java 19 : try (pool) { … } — AutoCloseable, cadeau.',
              why: 'Les threads d\'un pool sont créés *non-daemon* : tant que l\'ExecutorService vit, la JVM vit — main() terminé ou non. Le programme « fantôme » qui reste en tâche de fond après sa fin est un classique des premiers pas en concurrence. shutdown + awaitTermination (ou le try-with-resources) formalisent la fin de contrat.' },
            { title: 'Confondre thenApply et thenCompose : le futur de futur', lang: 'java', bad:
'CompletableFuture<CompletableFuture<Client>> tout =\n    loginFuture.thenApply(session -> api.chargerClient(session));   // imbriqué !\nClient c = tout.join().join();   // double join, signatures laides, erreurs piégées',
              good:
'CompletableFuture<Client> clientFuture =\n    loginFuture.thenCompose(session -> api.chargerClient(session));   // aplati ✓\nClient c = clientFuture.join();\n// thenApply : la lambda rend une VALEUR → CF<Valeur>\n// thenCompose : la lambda rend un CF → CF<Valeur> (le flatMap de l\'async !)',
              why: 'Quand ton étape renvoie *elle-même* un CompletableFuture (c\'est le cas de tout appel réseau), `thenApply` l\'emballe sans le déballer — tu te retrouves avec un futur dans un futur, et la gestion d\'erreurs devient un casse-tête. `thenCompose` fusionne les deux niveaux en un seul pipeline propre. Même distinction qu\'entre `map` et `flatMap` chez les streams; et même réflexe : composition = compose.' }
          ],
          related: ['java-thread-runnable', 'java-virtual-threads', 'java-lambdas', 'java-checked-unchecked']
        },

        {
          id: 'java-virtual-threads',
          title: 'Les threads virtuels : Loom change la donne',
          icon: 'dynamic_feed',
          level: 'Avancé',
          tagline: 'Un million de threads ? Une formalité depuis Java 21 : la JVM démonte et remonte tes tâches sur une poignée de vrais threads.',
          intro: 'Pendant vingt-cinq ans, la concurrence Java s\'est pensée avec un budget strict : un thread plateforme = un thread OS = ~1 Mo de stack → quelques milliers tout au plus, d\'où les piscines compliquées et le style « réactif » indigeste dès qu\'on voulait monter en charge d\'I/O. Les **threads virtuels** (Project Loom, stable en Java 21) changent l\'unité de compte : des threads **gérés par la JVM**, si légers que l\'on en crée un *par tâche* — et que le code redevient simple.',
          blocks: [
            { t: 'h3', h: 'Le problème qu\'ils résolvent : l\'I/O qui immobilise' },
            { t: 'p', h: 'Un serveur classique « un thread par requête » frappe le mur dès que les requêtes se multiplient — pourtant, ces threads passent 95 % de leur temps à **attendre** : la base de données, l\'API HTTP, le fichier. Attendre ne coûte aucun CPU… mais enchaîne un thread OS entier et sa stack d\'1 Mo. La solution historique (callback, CompletableFuture, réactif) rendait le code illisible. Loom déplace le multiplexage *dans la JVM* : quand un thread virtuel bloque sur une I/O, la JVM le **démonte** de son « carrier thread » et en monte un autre — le carrier, lui, ne dort jamais.' },
            { t: 'code', lang: 'text', label: 'La pyramide Loom', code:
'100 000 threads VIRTUELS (tâches : HTTP, SQL, fichiers)\n        │  la JVM les monte / démonte à chaque blocage I/O\n        ▼\n~ 12 threads PORTEURS (« carriers », ≈ 1 par cœur disponible)\n        │  seuls ces-là existent pour l\'OS\n        ▼\nquelques threads OS, utilisés à 100 % quand ça calcule vraiment' },
            { t: 'code', lang: 'java', label: 'Un par tâche, sans pool, style simple', code:
'// L\'executor des âges modernes : un thread virtuel NEUF par tâche\ntry (var exec = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (Requete r : requetes) {\n        exec.submit(() -> service.traiter(r));   // 100 000 requêtes : tranquille\n    }\n}   // attend la fin de tout, puis ferme ✓\n\n// Variante directe pour un coup unique :\nThread.startVirtualThread(() -> exporterRapport(jour));\n\n// Le code reste IMPÉRATIF : try/catch, boucles, appels bloquants JDBC/HTTP\n// — exactement comme tu l\'aurais écrit en 2005. « Write dumb code ».' },
            { t: 'ul', items: [
              '**I/O-bound = paradis** : API, services qui parlent à une DB, crawleurs, batchs fichiers. C\'est le cas 90 % des backends — dont les applications bancaires et de mobile money qui enchaînent des appels distants.',
              '**CPU-bound = zéro gain** : calculer ne bloque jamais la JVM ; le parallélisme utile reste borné par le nombre de cœurs → `parallelStream`/ForkJoin plus adaptés.',
              '**On ne « pool » pas les virtuels** : chacun est jetable ; la liste d\'attente se code par un `Semaphore` si la ressource aval est limitée (ex. 20 connexions DB max).',
              '**La stack d\'un VT** vit sur le heap, grandit/réduit dynamiquement — quelques centaines d\'octets au départ, pas 1 Mo réservé.',
              '**Les mêmes outils fonctionnent** : synchronized, verrous, ThreadLocal (à doser : il se paie par thread…), JFR pour observer.'
            ] },
            { t: 'p', h: '**Le piège du pinning, réglé en Java 24** : avant, un `synchronized` contenant une I/O bloquante *clouait* le VT à son carrier (le « pinning »), réduisant la magie à néant — contournable en remplaçant le verrou par un `ReentrantLock`. Le JEP 491 (Java 24) a réécrit les moniteurs pour qu\'`synchronized` se détache proprement : le sujet n\'existe plus sur les JVM récentes, mais vérifie les bibliothèques vieillottes si tu restes en 21-23.' }
          ],
          errors: [
            { title: 'Pooler ses threads virtuels « comme avant »', lang: 'java', bad:
'ExecutorService pool = Executors.newFixedThreadPool(200,\n        Thread.ofVirtual().factory());        // 200 VT, « et plafond ! »\n// Inutile et contre-productif : les VT sont FAITS pour être\ncréés à la demande, un par tâche, sans plancher.',
              good:
'ExecutorService exec = Executors.newVirtualThreadPerTaskExecutor();\n// Une tâche = un VT neuf, qui disparaît après. Pour borner l\'accès à une\n// ressource rare (pool de 20 connexions), on ajoute un Semaphore(20)\n// DANS la tâche — pas en limitant le nombre de threads.',
              why: 'Le pooling est une réponse à une rareté — les threads plateformes coûteux. Les VT étant quasi gratuits à créer/détruire, plafonner le pool recrée artificiellement la pénurie que Loom vient d\'abolir (et bloque des tâches simplement parce que « tous les sièges sont pris »). La ressource à gérer aujourd\'hui, c\'est la capacité d\'aval — la DB, l\'API — via des sémaphores/circuits, pas les threads eux-mêmes.' },
            { title: 'Attendre du CPU-bound des miracles de Loom', lang: 'java', bad:
'try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (Image img : images) exec.submit(() -> encoder4K(img));   // 10 000 VT…\n}\n// …sur 8 cœurs. AUCUN speedup : le CPU reste le mur, plus le\n// surcoût de scheduling des VT.',
              good:
'images.parallelStream().forEach(this::encoder4K);\n// ou un ForkJoinPool calibré aux cœurs : parallélisme CPU = nombre de cœurs,\n// réglé au plus près. Les VT, eux, sont l\'arme du « temps d\'attente ».',
              why: 'Un VT n\'exécute du calcul que lorsqu\'un carrier (≈ un par cœur) le porte : ajouter des VT ne multiplie pas les cœurs, il ajoute seulement de la file d\'attente. Le théorème est simple : **I/O-bound → threads virtuels ; CPU-bound → cœurs**. Mesurer avant de choisir son outil évite l\'inflation de threads inutiles.' },
            { title: 'synchronized autour d\'I/O bloquantes (sur Java 21-23) : le pinning', lang: 'java', bad:
'synchronized (registre) {\n    appelHttpBloquant();       // le VT est CLOUÉ à son carrier pendant l\'appel\n}                                // → les carriers se vident, la magie s\'écroule',
              good:
'private final ReentrantLock verrou = new ReentrantLock();\nvoid traiter() {\n    verrou.lock();\n    try { appelHttpBloquant(); } finally { verrou.unlock(); }\n}\n// Un ReentrantLock permet à la JVM de DEMONTER le VT.\n// (Sur Java 24+, les moniteurs gèrent ça nativement — migration sereine.)',
              why: 'Sur les premières versions de Loom, la JVM ne pouvait pas détacher un VT tenant un moniteur `synchronized` : le carrier restait immobilisé pendant toute la durée de l\'appel bloquant — pire qu\'un thread plateforme. Les bibliothèques figées en synchronized (vieux pilotes JDBC, HttpClient ancien) étaient les suspectes nº 1 : JFR signale les événements `VirtualThreadPinned`. Depuis Java 24 (JEP 491), le sujet est clos, mais l\'hygiène « verrous fins » reste une bonne habitude.' }
          ],
          related: ['java-executor-completable', 'java-thread-runnable', 'java-synchronized', 'java-heap-stack']
        }
      ]
    },

    /* ======================================================
       10. I/O & NIO.2
       ====================================================== */
    {
      id: 'io',
      name: 'I/O & NIO.2',
      icon: 'folder_open',
      fiches: [
        {
          id: 'java-io-vs-nio',
          title: 'java.io vs java.nio : l\'ancien et le nouveau monde',
          icon: 'folder_open',
          level: 'Intermédiaire',
          tagline: 'java.io, l\'héritage de 1996 ; java.nio.file, le présent : la retraite méritée du FileReader sans charset.',
          intro: 'Java possède **deux générations d\'API fichiers** qui cohabitent. La première, `java.io` (1996), brille par sa conception à décorateurs mais accuse son âge : chemins fragiles, erreurs silencieuses, charset implicite. La seconde, `java.nio.file` (Java 7, « NIO.2 »), a tout redressé : `Path` et `Files` modernes, exceptions explicites, UTF-8 par défaut. Les connaître toutes les deux, c\'est savoir écrire du nouveau code sans renier l\'existant.',
          blocks: [
            { t: 'h3', h: 'Ce que java.io a apporté — et ce qui n\'a pas vieilli' },
            { t: 'p', h: 'Le modèle historique est élégant : des **flux d\'octets** (`InputStream`/`OutputStream`), des **flux de caractères** (`Reader`/`Writer`, avec un *charset* responsable de la traduction), et des **décorateurs** empilables (`new BufferedReader(new FileReader(f))`) pour buffering, lignes, données binaires. Hélas : `File` ne sait pas rapporter *pourquoi* une opération a raté (boolean muet), ignore les liens symboliques, et — péché capital — `FileReader`/`FileWriter` utilisent le **charset de la plateforme** sans te prévenir. Sous Windows : Cp1252 ; sous ton VPS Linux : UTF-8 ; même code, deux mondes, factures corrompues.' },
            { t: 'table', head: ['Hier (java.io)', 'Aujourd\'hui (java.nio.file)', 'Le progrès'], rows: [
              ['new File(chemin)', 'Path.of(chemin)', 'objet immuable, portable, normalisable'],
              ['new FileReader(f) — charset plateforme !', 'Files.newBufferedReader(p, UTF_8)', 'charset EXPLICITE (UTF-8 par défaut pour readString)'],
              ['file.exists()', 'Files.exists(p) / isReadable(p)', 'tests fins et réussite claire'],
              ['file.delete() renvoie false silencieusement', 'Files.delete(p) → NoSuchFileException', 'l\'erreur porte un nom'],
              ['file.renameTo(cible) qui échoue selon l\'OS', 'Files.move(src, dst, ATOMIC_MOVE)', 'sémantique maîtrisée']
            ] },
            { t: 'code', lang: 'java', label: 'Même besoin, deux siècles', code:
'// HIER : le charset de ta machine décide pour toi (accents en danger !)\ntry (var r = new FileReader("catalogue.txt")) {\n    // … « Année » peut devenir « AnnÃ©e » au gré de l\'OS …\n}\n\n// AUJOURD\'HUI : explicite, déterministe, portable\ntry (var r = Files.newBufferedReader(Path.of("catalogue.txt"), StandardCharsets.UTF_8)) {\n    // … toujours la même langue, sur toutes les machines …\n}\n\n// Et pour tout lire en UNE ligne (Java 11+) :\nString contenu = Files.readString(Path.of("catalogue.txt"));   // UTF-8 par défaut ✓' },
            { t: 'h3', h: 'Le réflexe qui ne vieillit pas : bits vs lettres' },
            { t: 'p', h: 'Derrière toute API se pose LA question fondatrice : **octets ou caractères ?** Une image, un PDF, un .zip = des **octets** → famille `InputStream`/`OutputStream` (ou `Files.readAllBytes`). Un CSV de ventes, un JSON, un log = du **texte** → famille `Reader`/`Writer` + charset *explicite*. Le pont entre les deux mondes est `InputStreamReader` : il *décode* avec le charset que tu lui donnes. Traiter du texte en octets (et réassembler soi-même) est la recette des casses d\'encodage.' },
            { t: 'callout', kind: 'info', h: 'java.io n\'est pas mort non plus : l\'écosystème parle encore en `InputStream` (réseau, zip, Jackson, sockets). Les deux mondes se rencontrent proprement : `Files.newInputStream(path)` sort un bon vieux stream historique à partir d\'un Path moderne. Le réflexe sain : **chemins et fichiers en nio.file**, puis conversion vers java.io uniquement quand une API l\'exige.' }
          ],
          errors: [
            { title: 'FileReader sans charset : les accents sacrifiés', lang: 'java', bad:
'try (var r = new FileReader("clients.txt")) {\n    lire(r);   // Sous Windows : charset Cp1252 — le fichier UTF-8\n               // est mal décodé : « Kpéténou » devient « KpÃ©tÃ©nou ».\n}\n// En prod Linux : tout semblait normal. Le bug VOYAGE avec l\'OS.',
              good:
'Path p = Path.of("clients.txt");\ntry (var r = Files.newBufferedReader(p, StandardCharsets.UTF_8)) {\n    lire(r);                                     // ✓ identique partout\n}\n// Et pour écrire : Files.newBufferedWriter(p, UTF_8) — même rigueur.',
              why: '`FileReader` pioche le charset dans la configuration de l\'OS, sans le dire — le *pire* défaut pour un détail qui détermine la lisibilité de toutes les données textuelles. Un même fichier UTF-8 lu sous Windows, macOS et Linux donne trois textes différents. Depuis Java 11, `Files.readString`/`newBufferedReader` mettent l\'UTF-8 en avant et en font la norme explicite : plus aucune raison d\'accepter la loterie plateforme.' },
            { title: 'Lire du texte via un flux d\'octets (et découper au hasard)', lang: 'java', bad:
'StringBuilder sb = new StringBuilder();\nbyte[] tampon;\nwhile ((tampon = in.readNBytes(1024)).length > 0) {\n    sb.append(new String(tampon));       // décode avec le charset DÉFAUT,\n}                                        // et peut trancher un caractère UTF-8\n//                                        // multi-octets À CHEVAL entre deux blocs !',
              good:
'// Le pont octet → caractère se délègue au décodeur officiel :\ntry (var r = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {\n    r.lines().forEach(sb::append);       // caractères corrects, blocs compris ✓\n}',
              why: 'Un caractère UTF-8 peut occuper 1 à 4 octets : le découper au milieu d\'un bloc de lecture produit des séquences invalides (remplacées par le fameux �). Seul un décodeur charset *conscient* des frontières réassemble proprement — c\'est exactement le travail d\'un InputStreamReader. Manipuler du texte, c\'est déléguer cette grammaire à l\'outil prévu.' },
            { title: 'File.delete() silencieux : « j\'ai supprimé » (non)', lang: 'java', bad:
'File tmp = new File("export.tmp");\ntmp.delete();              // false si absent, verrouillé, protégé…\n// et tu n\'en sauras jamais rien : pas d\'exception, pas de raison.',
              good:
'try {\n    Files.delete(Path.of("export.tmp"));\n} catch (NoSuchFileException e) {\n    // déjà parti : OK pour nous\n} catch (IOException e) {\n    throw new UncheckedIOException("impossible de supprimer export.tmp", e);\n}\n// Variante « ne fais rien si absent » : Files.deleteIfExists(p) → boolean.',
              why: 'Les APIs historiques de `File` renvoient `false` pour « ça n\'a pas marché » — et personne ne vérifie ces booléens. Les fichiers temporaires s\'accumulent, les dossiers restent pleins, et l\'incident éclate trois semaines plus tard en « disque plein ». `Files.delete` **lève** une exception parlante pour chaque cause : on sait enfin distinguer « absent » (bénin) de « verrouillé » (problème).' }
          ],
          related: ['java-path-files', 'java-try-with-resources', 'java-serialisation', 'java-checked-unchecked']
        },

        {
          id: 'java-path-files',
          title: 'Path et Files : l\'API fichiers moderne',
          icon: 'file_open',
          level: 'Débutant',
          tagline: 'Path.of, Files.readString, Files.walk : lire, écrire et parcourir en trois lignes — portable, explicite, moderne.',
          intro: '`Path` est un **objet-valeur immuable** qui représente un chemin (fichier *ou* dossier, existant *ou non*) ; `Files` est la boîte à outils **statique** qui agit dessus. Ensemble ils forment l\'API fichiers à visage humain de Java : fini les concaténations de « / » à la main, fini les booléens silencieux, et un parcours récursif en stream. Maîtrisons le duo par l\'usage.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Composer, décomposer un chemin', code:
'Path racine = Path.of("exports", "2026", "07");     // portable : / vs \\\nPath rapport = racine.resolve("ventes-mensuelles.csv");\n\nrapport.getFileName();      // ventes-mensuelles.csv\nrapport.getParent();        // exports/2026/07\nrapport.normalize();        // résout les « . » et « .. » dans le chemin\nrapport.toAbsolutePath();   // /home/awa/boutique/exports/2026/07/…\nPath.of("exports").resolve(rapport);   // rapport est déjà complet → tel quel ✓' },
            { t: 'p', h: 'Note l\'essentiel : un `Path` ne coûte rien (ce n\'est que du texte structuré), il n\'exige *pas* que le fichier existe, et `resolve` sait composer **sans que tu touches aux séparateurs** — fini `dir + "/" + nom` qui explose sous Windows.' },
            { t: 'h3', h: 'Lire et écrire : le quotidien de Files' },
            { t: 'code', lang: 'java', label: 'La caverne d\'Ali Baba en statique', code:
'Files.createDirectories(racine);                          // parents inclus\n\nFiles.writeString(rapport, csv);                          // CREATE + TRUNCATE_EXISTING\nFiles.writeString(rapport, csv, StandardOpenOption.APPEND);\n\nString tout     = Files.readString(rapport);              // UTF-8 par défaut ✓\nList<String> l  = Files.readAllLines(rapport);            // mémoire : tout le fichier !\n\n// GROS fichiers : la version paresseuse qui ne charge rien en mémoire\ntry (Stream<String> lignes = Files.lines(rapport)) {       // ← try-with-resources !\n    long nb = lignes.filter(s -> s.contains("gari")).count();\n}\n\nFiles.exists(rapport);            // test sans surprise\nFiles.isReadable(rapport);\nFiles.size(rapport);              // octets\nFiles.getLastModifiedTime(rapport);' },
            { t: 'h3', h: 'Copier, déplacer, parcourir' },
            { t: 'code', lang: 'java', label: 'Les opérations qui remplacent des pages de code', code:
'Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);\nFiles.move(temporaire, definitif);       // renomme ou déplace\nFiles.delete(definitif);\n\n// Le parcours RÉCURSIF : un stream de chemins, à la stream API\ntry (Stream<Path> arbre = Files.walk(racine)) {           // ressource : try !\n    arbre.filter(p -> p.toString().endsWith(".csv"))\n         .filter(Files::isReadable)\n         .forEach(this::traiter);\n}   // walk arpente sous-dossier par sous-dossier, paresseusement\n\n// Juste le contenu DIRECT d\'un dossier :\ntry (Stream<Path> contenu = Files.list(racine)) { /* … */ }' },
            { t: 'callout', kind: 'tip', h: '`Files.walk` et `Files.lines` ouvrent des ressources (descripteurs) : le try-with-resources est **obligatoire**, sinon tu tiens des poignées de dossiers ouvertes jusqu\'au GC — la fuite silencieuse des systèmes de fichiers. C\'est la seule famille de streams Java qui *se ferme*.' },
            { t: 'p', h: 'Version « options » de l\'écriture : `StandardOpenOption` te laisse choisir finement (`CREATE_NEW` pour échouer si le fichier existe, `APPEND`, `TRUNCATE_EXISTING`, `SYNC` pour forcer l\'écriture disque immédiate). Et `Files.write` accepte un `Iterable<String>` directement — le « export CSV de 20 lignes » tient en un appel.' }
          ],
          errors: [
            { title: 'readAllLines sur un fichier de 4 Go : OutOfMemory en une ligne', lang: 'java', bad:
'List<String> lignes = Files.readAllLines(chemin);   // TOUT en mémoire !\nfor (String l : lignes) traiter(l);\n// java.lang.OutOfMemoryError: Java heap space — sur l\'export annuel',
              good:
'try (Stream<String> lignes = Files.lines(chemin)) {\n    lignes.filter(l -> l.startsWith("2026"))\n          .forEach(this::traiter);        // un élément à la fois, flux constant ✓\n}',
              why: '`readAllLines` (et `readString`, `readAllBytes`) est confortable *parce qu\'il charge tout* — c\'est écrit dans le contrat. Pour les gros fichiers et ceux de taille inconnue, `Files.lines` produit un stream paresseux : mémoire constante quel que soit le volume. La règle : « confort total » ≤ quelques mégaoctets connus ; au-delà, flux.' },
            { title: 'Files.walk non fermé : la poignée de dossiers ouverte', lang: 'java', bad:
'Files.walk(racine)\n     .filter(p -> p.toString().endsWith(".tmp"))\n     .forEach(p -> {\n        try { Files.delete(p); } catch (IOException ignore) { }\n    });\n// Marche… mais laisse des descripteurs de dossiers ouverts jusqu\'au GC.',
              good:
'try (Stream<Path> arbre = Files.walk(racine)) {\n    arbre.filter(p -> p.toString().endsWith(".tmp"))\n         .forEach(p -> {\n             try { Files.delete(p); } catch (IOException ignore) { }\n         });\n}   // fermeture propre, deterministe ✓',
              why: 'Contrairement à la plupart des streams de l\'API, `walk`, `list` et `lines` s\'adossent à des ressources natives qui ne se libèrent ni par magie ni dans l\'immédiat : le GC finira par les refermer… quand il voudra, peut-être jamais avant la fin. Sous charge (nettoyages répétés, imports de masse), ça termine en « too many open files ». try-with-resources, systématiquement.' },
            { title: 'Concaténer les chemins à la main : le séparateur piégé', lang: 'java', bad:
'String complet = dossier + "/" + fichier;    // Windows ? \\\\ ? double // ?\nnew File(complet.replace("/", File.separator));  // bricolage cumulatif…',
              good:
'Path complet = Path.of(dossier).resolve(fichier);\n// resolve gère le séparateur natif, ne duplique rien,\n// et détecte quand « fichier » est déjà absolu (il gagne alors). ✓',
              why: 'Un chemin n\'est pas une chaîne : c\'est une structure. Le concaténer à la main produit des « double slash », oublie la barre oblique inverse de Windows, et casse dès qu\'un fragment est absolu. `Path` et `resolve` encodent tout ça depuis le début — et gardent ton code portable, ce qui est la raison d\'être même de l\'API.' }
          ],
          related: ['java-io-vs-nio', 'java-try-with-resources', 'java-streams-api', 'java-serialisation']
        },

        {
          id: 'java-serialisation',
          title: 'La sérialisation : congeler un objet en octets',
          icon: 'save',
          level: 'Intermédiaire',
          tagline: 'Transformer une session en fichier binaire, la relire intacte demain — puissant, fragile, et risqué pour toute donnée non fiable.',
          intro: 'La **sérialisation Java native** convertit un objet en flux d\'octets (et inversement) via `ObjectOutputStream` / `ObjectInputStream`. Mécanisme historique des sessions HTTP, du cache et de l\'ancienne RMI, il reste partout dans les fonds de code — et appelle trois mises en garde sérieuses : la **version de classe** (`serialVersionUID`), les **champs transient**, et surtout la **sécurité**. Vue d\'ensemble sans angélisme.',
          blocks: [
            { t: 'code', lang: 'java', label: 'Le cycle complet : écrire puis relire', code:
'public class SessionCaisse implements Serializable {     // interface MARQUEUR (vide)\n    @Serial private static final long serialVersionUID = 2L;\n\n    private String operateur;          // sérialisé\n    private double fondDeCaisse;       // sérialisé\n    private transient String sessionMoMoToken;   // JAMAIS sérialisé (secret !)\n}\n\nPath f = Path.of("session.ser");\ntry (var out = new ObjectOutputStream(Files.newOutputStream(f))) {\n    out.writeObject(session);\n}\ntry (var in = new ObjectInputStream(Files.newInputStream(f))) {\n    SessionCaisse relue = (SessionCaisse) in.readObject();    // cast obligatoire\n}' },
            { t: 'ul', items: [
              '**`Serializable` est une interface vide** (« marker interface ») : sa présence autorise simplement le mécanisme. Tout l\'objet *et son graphe* (objets référencés, récursivement) voyage — un champ qui n\'est pas lui-même Serializable fait tout échouer avec `NotSerializableException`.',
              '**Le constructeur n\'est PAS appelé à la désérialisation** : les champs sont réécrits directement, par réflexion. Les invariants du constructeur ne sont donc pas rejoués (piège !), et les champs `transient` repartent à `null`/`0`.',
              '**`transient`** exclut ce qui est secret, dérivable, ou non portable (token, connexion, mot de passe, champ calculable). Résultat après relecture : null — à reconstruire (`readObject()` privé pour les cas avancés).'
            ] },
            { t: 'h3', h: 'serialVersionUID : la compatibilité des versions' },
            { t: 'p', h: 'Chaque classe sérialisable porte un numéro d\'empreinte : la `serialVersionUID`. Sans déclaration explicite, la JVM la *calcule d\'après la forme exacte de la classe* (champs, méthodes…) — donc **elle change à chaque retouche de la classe**, et relire un vieux `.ser` explose en `InvalidClassException`. En la *fixant* soi-même (`= 2L`), tu contrôles la compatibilité : tu choisis quels changements restent légaux (ajout de champ = ok avec valeur par défaut ; renommage = cassant). L\'annotation `@Serial` (Java 14) documente ce contrat.' },
            { t: 'h3', h: 'Le problème sécurité : le sujet qui fâche' },
            { t: 'p', h: 'Désérialiser instancie des objets **décris par les octets reçus** : code exécuté, constructeurs contournés, graphes arbitraires — et les « gadget chains » historiques de l\'écosystème ont mené à des vulnérabilités critiques (exécution de code à distance). Règle inviolable : **ne JAMAIS désérialiser nativement de la donnée venant de l\'extérieur** (réseau, utilisateur, fichier uploadé). Pour l\'échange moderne : JSON via Jackson (avec des `record`s DTO — sans surprise, sans magie), et le filtre JEP 290 (`ObjectInputFilter`) si tu ne peux pas sortir de la sérialisation native.' },
            { t: 'callout', kind: 'tip', h: 'En 2026, la désérialisation Java native se réserve aux cas maîtrisés de bout en bout : cache local, échanges *internes* entre services de confiance, snapshots techniques. Tout ce qui touche une API publique, un fichier tiers ou un formulaire passe par JSON — largement équivalent, debuggable à l\'œil, et sans gadget.' }
          ],
          errors: [
            { title: 'Un champ non sérialisable casse toute la chaîne', lang: 'java', bad:
'class SessionCaisse implements Serializable {\n    private java.sql.Connection connexion;    // NotSerializableException !\n}\nout.writeObject(session);\n// java.io.NotSerializableException: java.sql.Connection',
              good:
'class SessionCaisse implements Serializable {\n    @Serial private static final long serialVersionUID = 2L;\n    private transient java.sql.Connection connexion;   // exclue proprement ✓\n    private String operateur;\n}\n// Les ressources non portables (connexions, sockets, threads, streams)\n// ne voyagent JAMAIS : elles se re-créent après relecture.',
              why: 'La sérialisation embarque **tout le graphe atteignable** : le moindre champ non sérialisable fait dérailler l\'écriture entière. Certaines choses — connexions réseau, threads, contextes JVM — ne veulent d\'ailleurs *dire* rien en dehors de leur processus. `transient` est le déclassement explicite : il dit « ce champ appartient au runtime, pas à la donnée ». Et si l\'objet doit le reconstruire au réveil, `readObject()` privé reprend la main.' },
            { title: 'Modifier la classe, relire le vieux fichier : InvalidClassException', lang: 'java', bad:
'// v1 : class SessionCaisse { String operateur; }\n// tu sauves des .ser sur le disque…\n// v2 : ajout d\'un champ → serialVersionUID calculée différente →\n// java.io.InvalidClassException: SessionCaisse;\n// local class incompatible: stream classdesc serialVersionUID = …',
              good:
'class SessionCaisse implements Serializable {\n    @Serial private static final long serialVersionUID = 2L;   // fixée par TOI\n    private String operateur;\n    private LocalDate ouverture;   // ajout toléré : les vieux fichiers\n                                   // la liront à null — proprement\n}',
              why: 'Sans UID déclarée, l\'empreinte de la classe est recalculée à chaque build : les données sérialisées meurent avec chaque déploiement. L\'UID explicite fait de toi l\'autorité : *tu* décides quelle version lit quel fichier, les ajouts de champs deviennent compatibles (valeurs par défaut à la lecture), et les ruptures (renommages, changements de type) restent des choix assumés et documentés.' },
            { title: 'Désérialiser des octets venus d\'ailleurs : la porte ouverte', lang: 'java', bad:
'// Endpoint « pratique » qui reçoit l\'objet directement de l\'appelant :\ntry (var in = new ObjectInputStream(requete.getInputStream())) {\n    Commande c = (Commande) in.readObject();       // octets NON FIABLES !\n}',
              good:
'// L\'extérieur parle JSON, validé, vers un DTO record bien inoffensif :\nrecord CommandeDto(String produit, int quantite) { }\nCommandeDto dto = mapper.readValue(requete.getInputStream(), CommandeDto.class);\n// (Si vraiment prisonnier de la sérialisation native : filtre JEP 290.)\n// Demande-toi : d\'où viennent ces octets ? Si la réponse n\'est pas\n// « générés par mon propre service hier », c\'est non.',
              why: 'La désérialisation native peut instancier *n\'importe quel type sérialisable du classpath* avec au passage l\'exécution de méthodes piégées par des chaînes de classes présentes (gadgets) — l\'une des vulnérabilités les plus critiques de l\'histoire Java (Apache Commons Collections, 2015). Aucun cast `readObject()` ne protège : le mal est fait avant. JSON vers des records immuables offre exactement le même service, sans surface d\'attaque — c\'est le standard depuis longtemps.' }
          ],
          related: ['java-io-vs-nio', 'java-path-files', 'java-records', 'java-try-with-resources']
        }
      ]
    }
);
DEVDOCS.java.categories.push(
    /* ======================================================
       11. OUTILS : BUILD & ANNOTATIONS
       ====================================================== */
    {
      id: 'outils',
      name: 'Build & annotations',
      icon: 'construction',
      fiches: [
        {
          id: 'java-maven',
          title: 'Maven : le chef de chantier du projet',
          icon: 'construction',
          level: 'Intermédiaire',
          tagline: 'pom.xml, cycle de vie, dépendances : la convention qui a discipliné tout l\'écosystème Java.',
          intro: 'Avant Maven (2004), chaque projet Java avait sa propre liturgie de compilation : scripts Ant, chemins en dur, « FIXME: ça ne compile que chez Didou ». Maven a imposé une idée simple : **convention plutôt que configuration** — structure standard des dossiers, dépendances déclarées, cycle de vie identique partout. Un projet Maven se reconnaît instantanément, partout dans le monde.',
          blocks: [
            { t: 'h3', h: 'La structure standard — connue avant d\'être lue' },
            { t: 'code', lang: 'text', label: 'Le squelette Maven', code:
'gestion-boutique/\n├─ pom.xml                  ← le contrat du projet\n├─ src/\n│  ├─ main/\n│  │  ├─ java/             ← ton code (packages)\n│  │  └─ resources/        ← config, application.properties\n│  └─ test/\n│     ├─ java/             ← les tests JUnit\n│     └─ resources/\n└─ target/                  ← tout le COMPILÉ (JAMAIS dans Git !)' },
            { t: 'h3', h: 'pom.xml : les coordonnées et les propriétés' },
            { t: 'p', h: 'Chaque projet (et chaque bibliothèque du monde Java) est identifié par ses **coordonnées** `groupId:artifactId:version` — l\'adresse unique qui permet de le récupérer depuis le dépôt central (Maven Central). Le POM déclare aussi la version de Java ciblée et les propriétés — et la philosophie entière : déclarer *ce dont tu as besoin*, pas *comment le faire*.' },
            { t: 'code', lang: 'xml', label: 'Un pom.xml minimal mais complet', code:
'<?xml version="1.0" encoding="UTF-8"?>\n<project xmlns="http://maven.apache.org/POM/4.0.0">\n  <modelVersion>4.0.0</modelVersion>\n\n  <groupId>bj.cotonou.shop</groupId>\n  <artifactId>gestion-boutique</artifactId>\n  <version>1.0.0</version>\n\n  <properties>\n    <maven.compiler.release>21</maven.compiler.release>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n\n  <dependencies>\n    <dependency>\n      <groupId>org.junit.jupiter</groupId>\n      <artifactId>junit-jupiter</artifactId>\n      <version>5.10.3</version>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n</project>' },
            { t: 'h3', h: 'Les scopes : qui voit quelle dépendance' },
            { t: 'table', head: ['Scope', 'Disponible', 'Exemple typique'], rows: [
              ['compile (défaut)', 'partout, embarquée dans le livrable', 'Jackson, Spring'],
              ['test', 'uniquement src/test', 'JUnit, Mockito'],
              ['provided', 'compilation + tests, FOURNIE par le serveur en prod', 'API Servlet de Tomcat'],
              ['runtime', 'exécution + tests, pas compilation', 'pilote JDBC']
            ] },
            { t: 'h3', h: 'Le cycle de vie : des phases enchaînées' },
            { t: 'code', lang: 'text', label: 'Les phases principales', code:
'validate → compile → test → package → verify → install → deploy\n\nmvn package    exécute TOUT jusqu\'à « package » :\n               compile le code, lance les tests, fabrique le .jar (dans target/)\nmvn install    = package + copie dans le dépôt local ~/.m2 :\n               le projet devient utilisable par tes AUTRES projets\nmvn clean      supprime target/ (le classique « clean install » du lundi matin)' },
            { t: 'code', lang: 'bash', label: 'Les commandes du quotidien', code:
'mvn compile                # juste la compilation\nmvn test                   # compile + lance les tests du dossier src/test\nmvn package                # + fabrique le jar/war dans target/\n./mvnw clean install       # LE RÉFLEXE : toujours via le wrapper du projet\nmvn dependency:tree        # d\'où vient CETTE version de CETTE lib ? l\'arbre qui sauve' },
            { t: 'callout', kind: 'tip', h: 'Le **wrapper** (`mvnw` + `.mvn/wrapper/`) télécharge et verrouille la bonne version de Maven par projet : tout le monde — toi, les collègues, la CI — compile avec exactement le même outil. Il se committe dans Git, alors qu\'un Maven installé à la main dépend de la machine. Même réflexe chez Gradle avec `gradlew`.' },
            { t: 'h3', h: 'Les dépendances transitives : l\'arbre qui sauve' },
            { t: 'p', h: 'Quand tu déclares Jackson, il dépend lui-même d\'autres bibliothèques (transitivité) — et une autre de tes dépendances en réclame peut-être *une autre version*. Maven tranche par la règle « nearest wins » (la version la plus proche dans l\'arbre), ce qui peut surprendre. D\'où : `mvn dependency:tree` pour voir *vraiment* qui tire quoi, et la section `dependencyManagement` pour *imposer* les versions dans les projets multi-modules (c\'est exactement ce que fait le `spring-boot-starter-parent`).' }
          ],
          errors: [
            { title: 'Conflit de versions transitives : NoSuchMethodError en prod', lang: 'bash', bad:
'# Deux libs tirent chacune leur version de Guava ; Maven choisit la plus\n# proche (l\'ancienne), l\'application attendait la récente :\njava.lang.NoSuchMethodError: com.google.common.collect.ImmutableList.toImmutableList()\n# …en production évidemment, jamais au premier démarrage de dev.',
              good:
'$ mvn dependency:tree | grep guava\n# On VOIT les deux versions en présence, puis on impose la bonne :\n# <dependencyManagement> version épinglée pour tout le monde.',
              why: 'Un conflit silencieux de versions se satisfait de la compilation (les classes existent toutes) pour casser à l\'exécution — une méthode qui n\'existe que dans la version attendue, absente de celle embarquée. La compilation ne protège pas des versions ; l\'arbre des dépendances, si. Connaître `dependency:tree` et `dependencyManagement`, c\'est anticiper le bug avant qu\'il ne se produise.' },
            { title: 'Commiter target/ : le build qui dépend de ta machine', lang: 'bash', bad:
'$ git status\n target/classes/com/boutique/App.class\n target/gestion-boutique-1.0.0.jar\n# Tout le monde récupère… TES compilés, construits avec TON JDK.',
              good:
'# .gitignore, lignes intangibles du projet Maven :\ntarget/\n.idea/\n*.iml\n# Seuls les SOURCES et le POM (le contrat) voyagent : chacun rebâtit.',
              why: '`target/` est le *produit* du build, pas sa recette : le commiter fige dans Git un binaire lié à ta machine, alourdit le dépôt de mégas inutiles et masque les divergences de configuration. Un projet sain se clone… et se reconstruit en une commande, partout. Le livrable officiel, lui, se publie dans un dépôt d\'artefacts (Maven Central privé, Nexus), jamais dans Git.' },
            { title: 'Confondre provided et compile : le ClassNotFound du serveur', lang: 'bash', bad:
'# API Servlet déclarée « compile » :\n# → elle est EMBARQUÉE dans le .war, et entre en conflit avec celle\n#   que Tomcat fournit déjà : ClassNotFoundException / ClassCastException\n#   exotiques au déploiement.',
              good:
'<dependency>\n  <groupId>jakarta.servlet</groupId>\n  <artifactId>jakarta.servlet-api</artifactId>\n  <scope>provided</scope>   <!-- présente pour compiler, FOURNIE en prod -->\n</dependency>',
              why: '`provided` dit : « j\'en ai besoin pour compiler, mais l\'environnement cible la possède déjà » — typiquement l\'API d\'un serveur d\'applications. La déclarer `compile` la duplique dans le livrable et crée des classes en double sur le classpath : le chargeur de classes choisit… parfois la mauvaise. Le scope n\'est pas un détail administratif, c\'est la description exacte de ton déploiement.' }
          ],
          related: ['java-gradle', 'java-jdk-jre-jvm', 'java-spring-ioc', 'java-annotations']
        },

        {
          id: 'java-gradle',
          title: 'Gradle : le build programmable et rapide',
          icon: 'manufacturing',
          level: 'Intermédiaire',
          tagline: 'build.gradle.kts, cache incrémental, daemon : l\'alternative souple à Maven qui a conquis Android et les nouveaux projets.',
          intro: 'Là où Maven fige une convention en XML, **Gradle** expose un moteur de *tâches scriptables* (en Kotlin ou Groovy DSL) avec une obstination sur la performance : compilation incrémentale, cache de build réutilisable, daemon chaud. Il domine Android et a gagné beaucoup de projets backend. Le choix entre les deux est une question d\'équipe et de goût — mais il faut savoir lire les deux langages.',
          blocks: [
            { t: 'code', lang: 'kotlin', label: 'build.gradle.kts (Kotlin DSL)', code:
'plugins {\n    java\n    application\n}\n\ngroup = "bj.cotonou.shop"\nversion = "1.0.0"\n\njava {\n    // chaîne d\'outils : Gradle peut même TÉLÉCHARGER le JDK 21 tout seul\n    toolchain { languageVersion = JavaLanguageVersion.of(21) }\n}\n\nrepositories { mavenCentral() }\n\ndependencies {\n    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.2")\n    testImplementation(platform("org.junit:junit-bom:5.10.3"))\n    testImplementation("org.junit.jupiter:junit-jupiter")\n}\n\ntasks.test { useJUnitPlatform() }\napplication { mainClass.set("bj.cotonou.shop.App") }' },
            { t: 'ul', items: [
              '**Les mêmes racines** : `src/main/java`, Maven Central, coordonnées GAV — Gradle n\'a pas réinventé l\'écosystème, il l\'a rendu programmable.',
              '**Tâches plutôt que phases** : `./gradlew tasks` liste les commandes du projet (`build`, `test`, `run`…) — tu peux en composer et en définir.',
              '**Vitesse obsessionnelle** : il ne recompile que ce qui a changé (incrémental), réutilise les résultats d\'exécutions passées (build cache) et garde un processus chaud en mémoire (daemon). Sur les gros projets, le gain se mesure en minutes.',
              '**`implementation` vs `api`** : le premier cache la dépendance à tes consommateurs (compilation plus rapide), le second l\'expose dans ton API publique.'
            ] },
            { t: 'code', lang: 'bash', label: 'Le wrapper, le seul chemin', code:
'./gradlew build        # compile + test + assemble (le « mvn package » de Gradle)\n./gradlew run          # lance la classe principale annoncée\n./gradlew tasks        # toutes les tâches disponibles du projet\n# gradle/ + gradlew + gradlew.bat : tout ça SE COMMIT, comme mvnw -\n# la version de Gradle est inscrite dans le projet, pas sur ta machine.' },
            { t: 'table', head: ['', 'Maven', 'Gradle'], rows: [
              ['Configuration', 'XML déclarative (pom.xml)', 'Kotlin/Groovy scriptable'],
              ['Modèle mental', 'phases fixes, plugins déclarés', 'graph de tâches composable'],
              ['Vitesse brute', 'bonne', 'excellente (incrémental + cache)'],
              ['Lisibilité', 'explicite, un peu verbeuse', 'concise… magique si mal écrite'],
              ['Bastions', 'entreprise historique, JEE', 'Android, nouveaux projets, Spring']
            ] },
            { t: 'callout', kind: 'tip', h: 'Conseil de lecture : un `build.gradle.kts` commence par les `plugins` (linux? non — ce sont eux qui créent les tâches), puis les `repositories` (où télécharger), puis les `dependencies` (quoi). L\'ordre du pom Maven est transposé, le contenu est le même. Si tu sais lire l\'un, tu lis l\'autre en cinq minutes — c\'est pour cela que les deux cohabitent sereinement dans le monde Java réel.' }
          ],
          errors: [
            { title: 'Compiler avec gradle au lieu de gradlew : la roulette de version', lang: 'bash', bad:
'$ gradle build\n# Gradle 7.4 sur ta machine, 8.9 chez le collègue, 9.0 en CI…\n# « Cette tâche n\'existe pas » / « cette API est deprecated » —\n# trois builds, trois comportements.',
              good:
'$ ./gradlew build\n# Le wrapper lit gradle/wrapper/gradle-wrapper.properties\n# et TÉLÉCHARGE exactement la version du projet. Un seul outil,\n# pour tous, partout — gradlew/gradlew.bat/wrapper.jar se COMMITENT.',
              why: 'Gradle évolue vite : des tâches apparaissent, des APIs meurent entre versions majeures. Sans wrapper, le résultat du build dépend de la machine qui lance — variabilité impossible à reproduire quand la CI casse « mais ça marchait chez moi ». Le wrapper ancre la version *dans le projet* : cloner suffit pour builder pareil.' },
            { title: 'Utiliser api au lieu de implementation sans y penser', lang: 'kotlin', bad:
'api("com.google.guava:guava:33.2.1-jre")\n// Guava fuite dans l\'API publique de ta bibliothèque :\n// tes clients compilent plus lentement, et tu ne peux plus\n// changer de lib utilitaire sans casser leur build.',
              good:
'implementation("com.google.guava:guava:33.2.1-jre")\n// api se réserve aux types qui APPARAISSENT dans tes signatures\n// publiques (retours et paramètres de tes méthodes exposées).',
              why: '`api` déclare la dépendance comme faisant partie de *ton* API : non seulement tes consommateurs la voient, mais chaque changement l\'oblige à recompiler les modules en découd — les builds s\'allongent et le changement d\'implémentation devient public affair. La bonne hygiène Gradle moderne : `implementation` *par défaut*, et `api` seulement lorsqu\'on prouve que le type paraît dans une signature publique. La compilation s\'en trouve plus rapide et plus parallélisable.' },
            { title: 'Le build « trop malin » que personne ne sait plus lire', lang: 'kotlin', bad:
'// 60 lignes de logique custom : dates dynamiques, calculs de version,\n// boucles de projets, variables globales modifiées à distance…\n// Le fichier de build devient le code le plus mystérieux du projet.',
              good:
'// Règle d\'or : le build décrit, il ne calcule pas.\n// La logique custom vit dans des plugins versionnés (buildSrc/multiplateforme)\n// — le build.gradle.kts doit rester ennuyeux à lire, tel le pom.',
              why: 'Un build scriptable est un couteau à double tranchant : comme c\'est du code, on peut y écrire n\'importe quoi — et on le fait. Six mois plus tard, le fichier est incompréhensible, personne n\'ose plus y toucher, les upgrades de Gradle deviennent des migrations. Les meilleurs builds sont *ennuyeux* : plugins, versions, dépendances. Toute intelligence part dans un plugin dédié, testé comme du vrai code.' }
          ],
          related: ['java-maven', 'java-jdk-jre-jvm', 'java-spring-ioc', 'java-bytecode']
        },

        {
          id: 'java-annotations',
          title: 'Les annotations : des étiquettes que le code peut lire',
          icon: 'sell',
          level: 'Débutant',
          tagline: '@Override ne coûte rien et sauve des journées : les métadonnées qui parlent au compilateur, aux frameworks et à toi-même.',
          intro: 'Une **annotation** est une étiquette collée sur un élément du code — classe, méthode, champ — pour y attacher une *information* lisible par une machine : le **compilateur**, un **processeur d\'annotations** à la compilation, ou un **framework** au runtime. Elle ne fait rien par elle-même ; c\'est toujours *un lecteur* qui agit. Et c\'est exactement ce qui les rend partout : tout l\'écosystème moderne (Spring, JPA, Jackson, Lombok) repose dessus.',
          blocks: [
            { t: 'h3', h: 'Les natives : petites, gratuites, vitales' },
            { t: 'code', lang: 'java', label: 'Celles que le JDK offre d\'emblée', code:
'@Override                       // « je REDÉFINIS une méthode parente »\npublic String toString() {      //   → le compilateur vérifie la signature\n    return "Produit[" + nom + "]";\n}\n\n@Deprecated                     // « API en fin de vie : ne pas utiliser »\nstatic String ancienExport() { return "…"; }\n// → warning partout où elle est appelée : migration sous contrôle.\n\n@FunctionalInterface            // « je promets UNE seule méthode abstraite »\ninterface Validateur {\n    boolean valide(Facture f);  // toute future 2e abstraite cassera le build ✓\n}\n\n@SuppressWarnings("unchecked")  // « ce warning-là, je l\'assume » —\n                                // à la PORTÉE LA PLUS PETITE possible !' },
            { t: 'p', h: '`@Override` n\'altère rien à l\'exécution : c\'est un **contrat avec le compilateur**. Sans elle, une coquille dans la signature crée en silence une *surcharge* qui ne sera jamais appelée comme prévu. Avec elle, l\'erreur s\'affiche dès la frappe. C\'est l\'investissement au meilleur rendement du langage : zéro coût, détection immédiate d\'une famille entière de bugs.' },
            { t: 'h3', h: 'Trois durées de vie, trois lecteurs' },
            { t: 'table', head: ['@Retention', 'Lue par', 'Exemple'], rows: [
              ['SOURCE', 'le compilateur + les IDE, puis jetée', '@Override, @SuppressWarnings'],
              ['CLASS', 'processeurs d\'annotations à la compilation', 'Lombok, MapStruct (génèrent du code)'],
              ['RUNTIME', 'les frameworks, via RÉFLEXION', 'Spring, JPA, Jackson']
            ] },
            { t: 'code', lang: 'java', label: 'La runtime annotation au travail (Spring, JPA)', code:
'@Service                              // Spring : « instancie-moi, injecte-moi »\npublic class FactureService { }\n\n@Entity                               // JPA : « cette classe représente une table »\n@Table(name = "factures")\npublic class Facture {\n    @Id @GeneratedValue               // « clé primaire, générée par la base »\n    private Long id;\n}\n// Au démarrage, le framework SCANNE le classpath, trouve les étiquettes,\n// et fait le câblage à ta place. C\'est l\'ensemble du « magique » de Spring.' },
            { t: 'h3', h: 'Définir la sienne (et la lire)' },
            { t: 'code', lang: 'java', label: 'Une annotation maison, traitée par réflexion', code:
'@Retention(RetentionPolicy.RUNTIME)      // visible à l\'exécution\n@Target(ElementType.METHOD)              // collable sur les méthodes seulement\n@interface MesurePerf { }\n\n// Consommation : quelqu\'un doit LIRE l\'étiquette — sinon rien ne se passe.\nfor (Method m : Rapport.class.getDeclaredMethods()) {\n    if (m.isAnnotationPresent(MesurePerf.class)) {\n        long debut = System.nanoTime();\n        m.invoke(rapport);\n        System.out.println(m.getName() + " : " + (System.nanoTime() - debut) + " ns");\n    }\n}' },
            { t: 'callout', kind: 'warn', h: 'Règle fondamentale à répéter comme un mantra : **une annotation ne FAIT rien**. Ni `@Service`, ni `@Transactional`, ni `@Entity` — chacune est un *message* qu\'un moteur (le conteneur Spring, l\'ORM, la validation Bean) viendra lire traduire en comportements. Chercher « pourquoi ça ne marche pas » en ajoutant des étiquettes au hasard, c\'est coller des timbres sur une machine éteinte. Demande-toi toujours : qui la lit, quand, et avec quel effet ?' }
          ],
          errors: [
            { title: 'Oublier @Override : la redéfinition qui n\'en est pas une', lang: 'java', bad:
'class Produit {\n    public boolean meme(Produit autre) { … }\n}\nclass Article extends Produit {\n    public boolean meme(Article autre) { … }   // signature DIFFÉRENTE :\n}                                               // SURCHARGE, pas redéfinition\nProduit p = new Article();\np.meme(new Article());      // appelle la version PARENT : bug silencieux',
              good:
'class Article extends Produit {\n    @Override                         // ✗ ERREUR affichée d\'emblée :\n    public boolean meme(Article autre) { … }   // « does not override »\n}\n// on corrige la signature, le comportement devient celui prévu ✓',
              why: 'La surcharge ne déclenche pas de polymorphisme d\'exécution : la JVM choisit UNIQUEMENT d\'après le type *déclaré* à l\'appel. Tu as donc écrit une méthode que « personne n\'appellera jamais » pour les cas qui comptent. `@Override` transforme ce silence en erreur de compilation instantanée — c\'est littéralement pour cette famille de bugs que l\'annotation existe depuis Java 5.' },
            { title: 'Empiler @SuppressWarnings sur toute la classe « pour la tranquillité »', lang: 'java', bad:
'@SuppressWarnings("all")\nclass ImportService {           // plus aucun warning, plus aucune alerte :\n    // …                    // y compris les VRAIS problèmes (unchecked,\n}                              // raw types, deprecated), masqués pour toujours.',
              good:
'// On supprime un warning précis, à la plus petite portée possible :\n@SuppressWarnings("unchecked")\nList<String> lus = (List<String>) in.readObject();   // la ligne, assumée',
              why: 'Un warning, c\'est le compilateur qui te prête attention gratuitement. Les étouffer en vrac au niveau classe, c\'est éteindre le détecteur de fumée parce qu\'il « bipe parfois » : le jour où il aurait sauvé le projet, il sera muet. La discipline reste : *portée minimale, code précis, commentaire d\'intention* — comme un congé signé, pas une amnistie générale.' },
            { title: 'Croire que l\'annotation agit « par magie » sans conteneur', lang: 'java', bad:
'class Calculatrice {\n    @Service\n    long somme(long a, long b) { return a + b; }   // appel direct :\n}\nnew Calculatrice().somme(1, 2);\n// L\'étiquette reste un POST-IT illisible : sans conteneur Spring\n// pour la lire, elle ne fait absolument RIEN.',
              good:
'// @Service, @Transactional, @Entity… exigent que le FRAMEWORK gère\n// l\'objet (instanciation par le conteneur, proxies au runtime).\n// Comprendre qui lit l\'annotation — ou la retirer, elle ment sinon.',
              why: 'Les annotations runtime ne prennent vie que lorsqu\'un moteur les scanne et enveloppe les objets : Spring crée des proxies transactionnels, JPA des proxies de chargement paresseux. Hors de ce monde — classe instanciée à la main, méthode appelée directement — les étiquettes sont inertes. Beaucoup de bugs « @Transactional ne marche pas » tiennent exactement à cette mécanique.' }
          ],
          related: ['java-polymorphisme', 'java-spring-ioc', 'java-interfaces-fonctionnelles', 'java-heritage']
        }
      ]
    },

    /* ======================================================
       12. INCURSION SPRING BOOT
       ====================================================== */
    {
      id: 'spring',
      name: 'Spring Boot',
      icon: 'layers',
      fiches: [
        {
          id: 'java-spring-ioc',
          title: 'Spring Boot et l\'inversion de contrôle',
          icon: 'layers',
          level: 'Intermédiaire',
          tagline: 'Tu décris les ingrédients, le conteneur cuisine : l\'injection de dépendances qui rend les applications testables et découplées.',
          intro: 'Dans une application classique, chaque objet `new` câble en dur tout le graphe — la caisse instancie sa base, sa base instancie son driver, et changer quoi que ce soit exige de réécrire la chaîne. L\'**Inversion de Contrôle** (IoC) retourne la responsabilité : tu *déclares* tes objets et leurs besoins, et un **conteneur** — Spring — les construit et les injecte. Spring Boot y ajoute le serveur embarqué et l\'auto-configuration : l\'application web démarre en une ligne.',
          blocks: [
            { t: 'h3', h: 'Le problème : le couplage par new' },
            { t: 'code', lang: 'java', label: 'Sans conteneur : tout se câble à la main', code:
'// Le contrôleur connaît TOUTE la chaîne de construction :\nvar source = new MysqlDataSource("jdbc:mysql://localhost/boutique");\nvar depot  = new DepotSQL(source);\nvar metier = new FactureService(depot);\nvar http   = new FactureController(metier);\n// Changer DepotSQL en DepotPostgres ? Modifier le contrôleur. Tester le\n// service ? Impossible sans une VRAIE base de données. Chaque couche\n// connaît l\'implémentation de celle d\'en dessous.' },
            { t: 'h3', h: 'La solution : déclarer, le conteneur injecte' },
            { t: 'code', lang: 'java', label: 'Version conteneurisée', code:
'@Repository                      // bean de persistance (scan automatique)\npublic class DepotSQL implements Depot { /* … */ }\n\n@Service                          // bean métier : « la logique vit ici »\npublic class FactureService {\n    private final Depot depot;                            // final = forcé ✓\n\n    public FactureService(Depot depot) {                  // INJECTION constructeur\n        this.depot = depot;                               // @Autowired implicite\n    }                                                     // (un seul constructeur)\n}\n\n// Au démarrage, Spring scanne les classes annotées, fabrique TOUS les beans,\n// les assemble — et te remet l\'application câblée, inversée : chaque besoin\n// est satisfait par le conteneur au lieu d\'être cherché par l\'objet.' },
            { t: 'ul', items: [
              '**Hollywood principle** : « ne nous appelez pas, on vous appellera » — ton code reçoit ses dépendances au lieu de les fabriquer.',
              '**Bean = objet géré par le conteneur** ; par défaut **singleton** (une instance partagée), d\'où la règle jamais d\'état mutable non synchronisé dedans.',
              '**La famille stéréotype** : `@Component` (générique), `@Service` (métier), `@Repository` (persistance, traduit aussi les exceptions SQL), `@RestController`/`@Controller` (web). Elles font toutes un bean — le nom *documente le rôle*.',
              '**`@Bean` dans une `@Configuration`** : la porte pour les classes tierces (celles dont tu ne peux pas annoter la source — Jackson, HttpClient…).',
              '**Injecter une INTERFACE** (`Depot`, pas `DepotSQL`) : le contrôleur ne connaît que le contrat; la vraie implémentation se remplace sans ouvrir le code (principe ouvert/fermé).'
            ] },
            { t: 'h3', h: 'Pourquoi le constructeur, et pas le champ' },
            { t: 'code', lang: 'java', label: 'Les trois styles, un choix', code:
'// ✓ CONSTRUCTEUR (officiel depuis Spring 4.3) :\nprivate final Depot depot;\npublic FactureService(Depot depot) { this.depot = depot; }\n// dépendances VISIBLES dans la signature, obligatoires (final),\n// testable en NU sans Spring : new FactureService(new DepotEnMemoire())\n\n// ✗ CHAMP — à proscrire :\n@Autowired private Depot depot;\n// champ jamais final, dépendances invisibles (il faut lire toute la classe),\n// tests exigent de lancer Spring ou de la réflexion.\n\n// ~ SETTER : acceptable UNIQUEMENT pour les dépendances OPTIONNELLES.' },
            { t: 'code', lang: 'java', label: 'Le test qui change ta vie (sans Spring)', code:
'@Test\nvoid totaux() {\n    FactureService service = new FactureService(new DepotEnMemoire());\n    assertEquals(56_000, service.chiffreAffaires(jour));\n}\n// Pas de conteneur, pas de contexte, pas d\'attente :\n// le constructeur a rendu la classe testable comme un objet banal.' }
          ],
          errors: [
            { title: 'L\'injection par champ : final impossible, dette cachée', lang: 'java', bad:
'@Service\npublic class FactureService {\n    @Autowired private Depot depot;          // champ muté « à distance »,\n    @Autowired private TarifService tarifs;  // jamais final,\n    @Autowired private AuditService audit;   // dépendances illisibles…\n    // …et le jour du test unitaire : IllegalStateException partout.\n}',
              good:
'@Service\npublic class FactureService {\n    private final Depot depot;                 // contrat visible, obligatoire\n    private final TarifService tarifs;\n    private final AuditService audit;\n    public FactureService(Depot d, TarifService t, AuditService a) {\n        depot = d; tarifs = t; audit = a;\n    }\n}\n// Trop de paramètres ? C\'est le SIGNAL d\'un service qui fait trop de choses.',
              why: 'L\'injection par champ décharge tout le contrat : rien n\'est visible en signature, aucune dépendance ne peut être `final`, et faire un test pur exige un conteneur ou de la réflexion. Pire : elle *masque* le gonflement — onze champs injectés passent inaperçus là que onze paramètres de constructeur hurleraient « ce service a trop de responsabilités ». Le constructeur est la version honnête.' },
            { title: 'new un service dont le conteneur est censé être le patron', lang: 'java', bad:
'FactureService service = new FactureService(depot);\n// dans une application Spring :\n// → cette instance est HORS CONTENEUR : pas de proxies ni de scopes,\n// → pas de @Transactional actif, pas de cycle de vie, pas de monitoring.\n// Et il y a maintenant DEUX instances : la tienne, et celle de Spring.',
              good:
'// On injecte le bean GÉRÉ par Spring, et on laisse le conteneur\n// proposer ses services autour (proxies, transaction, sécurité).\npublic RapportController(FactureService service) { this.service = service; }',
              why: 'Spring n\'intercepte les appels que sur les objets *qu\'il a lui-même créés* — ses proxies. Un `new` de ta main produit un objet orphelin, identique en apparence mais sourd à tous les services du framework : la transaction annoncée n\'existe pas, les scopes ne s\'appliquent pas, et tu peux finir avec deux versions du « singleton ». Le réflexe : dépendre du conteneur, le `new` explicite se réduit aux objets simples : DTO, value objects, builders.' },
            { title: 'La dépendance circulaire assumée au lieu de repenser les rôles', lang: 'java', bad:
'@Service class A { A(B b) { } }            // A a besoin de B…\n@Service class B { B(A a) { } }            // …et B a besoin de A :\n// Au démarrage : BeanCurrentlyInCreationException —\n// le conteneur ne peut instancier AUCUN des deux (l\'oeuf et la poule).',
              good:
'// Le cycle signale presque TOUJOURS un rôle manquant :\n// extraire un TROISIÈME service responsable du point commun.\n@Service class Evenements { /* émet/reçoit */ }\n@Service class A { A(Evenements ev) { } }\n@Service class B { B(Evenements ev) { } }   // respiration retrouvée ✓\n// (@Lazy existe en dernier recours — pas en premier réflexe.)',
              why: 'Une circularité dit « A et B sont trop liés pour exister l\'un sans l\'autre » : la responsabilité partagée mérite sa propre maison. La cacher avec `@Lazy` ou un setter soigne le signe vitale, pas la maladie — elle réapparaîtra à la première évolution. L\'injection de dépendances est passée du câblage à l\'architecture : la découper correctement est le vrai travail.' }
          ],
          related: ['java-spring-rest', 'java-annotations', 'java-interfaces', 'java-maven']
        },

        {
          id: 'java-spring-rest',
          title: '@RestController : ton API REST en dix lignes',
          icon: 'api',
          level: 'Intermédiaire',
          tagline: '@GetMapping, @PostMapping, JSON automatique : le contrôleur qui transforme tes objets en HTTP — et les réflexes qui le rendent pro.',
          intro: 'Un **contrôleur REST** est la porte d\'entrée HTTP de l\'application : il reçoit la requête, en extrait les données, délègue au métier, et renvoie un objet que Jackson sérialise en JSON — sans que tu écrives la moindre ligne de sérialisation. Ta responsabilité se concentre alors sur l\'essentiel : le verbe, le chemin, le statut, la forme publique de l\'API.',
          blocks: [
            { t: 'h3', h: 'Le voyage d\'une requête' },
            { t: 'code', lang: 'text', label: 'Qui fait quoi ?', code:
'GET /api/comptes/97000000\n        │\n        ▼  DispatcherServlet (le répartiteur, fourni par Spring Boot)\n        ▼  @GetMapping("/{numero}")  → trouve TA méthode\n        ▼  Jackson : convertit les données entrantes (body, paramètres)\n        ▼  ta méthode délègue au @Service (la logique N\'EST PAS ici)\n        ▼  un objet Java (record) est retourné\n        ▼  Jackson le sérialise en JSON → réponse HTTP + statut\n\nLe contrôleur = traduction HTTP ↔ Java. La logique reste au service.' },
            { t: 'code', lang: 'java', label: 'Le CRUD complet, forme 2026', code:
'// 1. La forme PUBLIQUE de l\'API : un record immuable — jamais l\'entité interne !\npublic record CompteDto(String numero, long solde) { }\n\n@RestController\n@RequestMapping("/api/comptes")\npublic class CompteController {\n\n    private final CompteService service;                 // injection constructeur ✓\n    public CompteController(CompteService service) { this.service = service; }\n\n    @GetMapping                                            // GET /api/comptes\n    public List<CompteDto> tous() { return service.lister(); }\n\n    @GetMapping("/{numero}")                               // GET /api/comptes/97000000\n    public ResponseEntity<CompteDto> parNumero(@PathVariable String numero) {\n        return service.trouver(numero)\n            .map(ResponseEntity::ok)                        // 200 + l\'objet\n            .orElse(ResponseEntity.notFound().build());     // 404 exprès ✓\n    }\n\n    @PostMapping                                           // POST + JSON dans le body\n    public ResponseEntity<CompteDto> creer(@RequestBody @Valid CompteDto dto) {\n        CompteDto cree = service.creer(dto);\n        return ResponseEntity.status(201).body(cree);       // 201 CREATED, pas 200\n    }\n}\n// Jackson désérialise le JSON reçu dans le record, et sérialise les\n// objets retournés. Zéro plumbing : tu n\'as écrit que du métier HTTP.' },
            { t: 'table', head: ['Rôle HTTP', 'Annotation', 'Extraction'], rows: [
              ['lire une collection', '@GetMapping', '—'],
              ['lire un élément', '@GetMapping("/{numero}")', '@PathVariable'],
              ['créer', '@PostMapping', '@RequestBody'],
              ['remplacer', '@PutMapping / @PatchMapping', '@RequestBody / @PathVariable'],
              ['supprimer', '@DeleteMapping("/{numero}")', '@PathVariable'],
              ['filtres ?statut=payee', '@GetMapping', '@RequestParam']
            ] },
            { t: 'ul', items: [
              '**`@RestController` = `@Controller` + `@ResponseBody`** : chaque retour part directement en JSON au lieu de chercher un template HTML.',
              '**`ResponseEntity`** donne la main sur le statut *et* les en-têtes — l\'outil de toutes les réponses non triviales.',
              '**Couches étanches** : le contrôleur valide l\'entrée (@Valid), mappe les DTO, choisit les statuts ; la logique vit dans le `@Service`, testable sans HTTP.',
              '**Les erreurs aussi sont une API** : un `@RestControllerAdvice` + `@ExceptionHandler` transforme chaque exception métier en vraie réponse (404, 409, 422) — jamais une stack trace brute livrée au client.'
            ] },
            { t: 'callout', kind: 'tip', h: 'Une bonne question d\'entretien : « pourquoi un DTO plutôt que l\'entité JPA directement ? » Parce que l\'entité expose trop (mot de passe, champs calculés, relations paresseuses), couple ton API au schéma de la base, et se sérialise parfois en boucles infinies de relations. Le record DTO fixe un *contrat public*, indépendant et versionné.' }
          ],
          errors: [
            { title: 'La logique métier dans le contrôleur', lang: 'java', bad:
'@PostMapping\npublic String payer(@RequestBody PaiementDto dto) {\n    if (dto.montant() <= 0) return "montant invalide";\n    Optional<Compte> c = depot.find(dto.numero());\n    if (c.isEmpty()) return "compte absent";\n    if (c.get().getSolde() < dto.montant()) return "solde insuffisant";\n    c.get().retirer(dto.montant());           // métier, base, validation,\n    return "ok";                               // statuts, tout est collé ici…\n}',
              good:
'@PostMapping\npublic ResponseEntity<RecuDto> payer(@RequestBody @Valid PaiementDto dto) {\n    return ResponseEntity.status(201).body(paiementService.encaisser(dto));\n}\n// Le contrôleur parle HTTP ; le service parle métier :\n// chacun testable sans l\'autre, lisible, remplaçable. ✓',
              why: 'Un contrôleur-métier cumule les pires défauts : impossible à tester sans simuler HTTP, logique non réutilisable (un autre canal — batch, file de messages — devra la réécrire), gestion d\'erreurs en String au lieu de statuts. La couche web a un métier : HTTP. Tout le reste descend d\'un étage. C\'est la séparation des responsabilités appliquée au quotidien — et la première chose qu\'un recruteur regarde dans du code Spring.' },
            { title: '200 OK pour tout : succès, erreur, création, suppression', lang: 'java', bad:
'@PostMapping\npublic ResponseEntity<CompteDto> creer(@RequestBody CompteDto dto) {\n    return ResponseEntity.ok(service.creer(dto));    // 200 — alors que CREER !\n}\n@GetMapping("/{n}")\npublic CompteDto lire(@PathVariable String n) {\n    return service.trouver(n).orElse(null);           // 200 + body null\n}',
              good:
'// Création → 201 ; absence → 404 ; validation → 400/422 ; suppression → 204.\nreturn service.trouver(n)\n    .map(ResponseEntity::ok)\n    .orElse(ResponseEntity.notFound().build());       // le statut PARLE ✓',
              why: 'Le code HTTP est la moitié du contrat de l\'API : les clients, proxies et tests s\'appuient dessus pour choisir leur comportement. Un 201 signale « nouvelle ressource », un 404 « pas trouvé », un 204 « fait, rien à renvoyer ». Tout envoyer en 200 rend l\'API muette : le client est forcé de *deviner* en lisant le contenu, les caches ne savent plus quoi faire, et les tests deviennent des conventions orales plutôt que contrats.' },
            { title: 'Oublier @RequestBody : l\'objet entièrement null au runtime', lang: 'java', bad:
'@PostMapping\npublic ResponseEntity<CompteDto> creer(CompteDto dto) {\n    return ResponseEntity.status(201).body(service.creer(dto));\n}\n// Le JSON arrive… mais sans @RequestBody, Spring ne le lit pas :\n// dto existe pourtant tous ses champs sont null. Debug interminable.',
              good:
'public ResponseEntity<CompteDto> creer(@RequestBody @Valid CompteDto dto) { … }\n// @RequestBody : « Jackson, désérialise le BODY JSON dans ce record »\n// @Valid       : « et fais respecter les contraintes (@NotNull…) »',
              why: 'Spring n\'attache aucun source par défaut : sans annotation explicite, aucune donnée de la requête n\'est lue, et Java vous construit un DTO par défaut — silencieusement vide. Le choix de l\'annotation est le contrat d\'entrée : `@RequestBody` pour le corps JSON, `@PathVariable` pour un fragment d\'URL, `@RequestParam` pour la query string. Le langage est verbal, l\'erreur est verbale.' }
          ],
          related: ['java-spring-ioc', 'java-records', 'java-optional', 'java-checked-unchecked']
        }
      ]
    }
);
