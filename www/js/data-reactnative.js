/* ============================================================
   data-reactnative.js — Contenu pédagogique React Native
   Couvre : démarrage (Expo vs bare), exécution, composants de
   base (View/Text/Image/ScrollView, interactifs), StyleSheet &
   flexbox mobile, listes (FlatList, optimisation, SectionList),
   React Navigation (Stack, params, Tab/Drawer, imbrication),
   état (useState/reducer, Context), réseau, AsyncStorage,
   spécifique plateforme (Platform, safe areas), Animated &
   gestes, permissions & modules natifs, formulaires & clavier,
   debugging, build & déploiement (EAS).
   Même contrat de données (cf. README.md). React web est
   supposé connu (voir le module React JS pour les bases).
   ============================================================ */
window.DEVDOCS = window.DEVDOCS || {};

DEVDOCS.rn = {
  id: 'rn',
  name: 'React Native',
  icon: 'smartphone',
  tagline: 'Le mobile natif avec React : composants natifs, Expo, navigation, gestes, permissions — iOS et Android depuis un seul code JavaScript.',
  heroTitle: 'React Native, le même React vers les vrais écrans mobiles',

  categories: [
    /* ======================================================
       1. FONDAMENTAUX
       ====================================================== */
    {
      id: 'fondamentaux',
      name: 'Fondamentaux',
      icon: 'smartphone',
      fiches: [
        {
          id: 'rn-installation',
          title: 'Installation & configuration',
          icon: 'download',
          level: 'Débutant',
          tagline: 'Expo, create-expo-app, Expo Go : ton app sur ton PROPRE téléphone en dix minutes, sans installer un seul SDK.',
          intro: 'Installer React Native « complet » (Android Studio, Xcode, SDK de 15 Go) est la première épreuve qui décourage la moitié des débutants. Expo est l\'autre voie : un cadre qui te dispense de tout ça — l\'app tourne dans **Expo Go**, une application gratuite installée sur ton téléphone, et tu codes depuis l\'ordinateur. Cette fiche te met debout avec Expo, t\'explique le choix Expo vs CLI, et te fait voir ton app sur TON écran de téléphone — à Dantokpa comme ailleurs, c\'est le déclic.',
          blocks: [
            { t: 'h3', h: 'Pourquoi deux voies — et pourquoi Expo d\'abord ?' },
            { t: 'p', h: 'React Native compile du JavaScript vers les composants NATIFS du téléphone — et compiler pour Android exige traditionnellement l\'ensemble du SDK Android (Android Studio, émulateurs, GB de téléchargements), pour iOS un Mac + Xcode. Autant dire l\'Everest en tongs. **Expo** contourne le problème : son application **Expo Go** CONTIENT déjà ce qui est nécessaire pour faire tourner ton code — l\'ordinateur n\'a plus qu\'à servir le JavaScript au téléphone via le réseau. Tu codes, tu sauvegardes, le téléphone se met à jour. Tu gardes l\'envie d\'apprendre, c\'est le but.' },
            { t: 'table', head: ['', 'Expo (recommandé pour débuter)', 'React Native CLI (« bare »)'], rows: [
              ['Installation initiale', 'Node uniquement — zéro SDK', 'Android Studio + SDK (et Xcode sur Mac)'],
              ['Voir l\'app', 'Expo Go sur TON téléphone (ou émulateur)', 'Émulateur Android / simulateur iOS d\'abord'],
              ['Modules natifs avancés (Bluetooth spécifique…)', 'Via les librairies Expo (couvre 95 % des besoins)', 'Accès total, natif custom sans limites'],
              ['Quand y aller', 'Tout le début + la plupart des apps pro', 'Quand un module natif indisponible l\'exige (ça peut ne JAMAIS arriver)']
            ] },
            { t: 'p', h: 'La fiche **Expo ou React Native CLI ?** reprendra ce choix en profondeur plus tard — pour l\'instant retiens la règle de départ : commence par Expo GO, tu pourras « éjecter » vers le CLI le jour où une librairie native introuvable dans Expo l\'exigera (et tu découvriras que ce jour n\'arrive presque jamais ; la majorité des applis pro restent sur Expo, builds compris).' },
            { t: 'h3', h: 'Prérequis : ordinateur + téléphone + même Wi-Fi' },
            { t: 'table', head: ['Côté', 'Il te faut', 'Vérification'], rows: [
              ['Ordinateur', 'Node.js LTS ≥ 18 (même socle que React)', '`node -v`'],
              ['Téléphone', 'L\'app **Expo Go** (Play Store / App Store)', 'L\'app s\'ouvre et affiche un scanner QR'],
              ['Réseau', 'PC et téléphone sur le MÊME Wi-Fi', 'Le test ultime : le QR se scanne et l\'app se charge'],
              ['Éditeur', 'VS Code (recommandé)', 'ouvrir le dossier du projet']
            ] },
            { t: 'p', h: 'Le point critique est le RÉSEAU : Expo Go télécharge ton code depuis TON ORDINATEUR — les deux doivent se voir sur le même réseau. Un problème typique des réseaux partagés (cybercafés, campus, certaines box) : l\'isolation des clients empêche les appareils de se parler — on contournera avec le mode tunnel, plus bas. Et l\'iPhone requiert Expo Go depuis l\'App Store + parfois un compte Apple actif pour la première ouverture.' },
            { t: 'h3', h: 'Créer l\'app : trois commandes commentées' },
            { t: 'code', lang: 'bash', label: 'Terminal — du zéro au QR code', code:
'# 1) Créer le projet (gabarit par défaut, propre et simple)\nnpx create-expo-app zemidjan-livraison\n#    « npx » exécute l\'assistant Expo SANS l\'installer durablement\n#\n# 2) Entrer dans le projet\ncd zemidjan-livraison\n#\n# 3) Démarrer le serveur de développement Expo\nnpx expo start\n#    → Un grand QR CODE apparaît dans le terminal :\n#      c\'est le ADRESSE de ton code, à montrer au téléphone.\n#\n# (si le QR ne aboutit jamais — réseau bridé/isolé :\n#  npx expo start --tunnel   ← même chose via un tunnel Expo,\n#  marche sur à peu près TOUS les réseaux, un cran plus lent)' },
            { t: 'h3', h: 'Faire apparaître ton application sur ton téléphone' },
            { t: 'ol', items: [
              'Ouvre **Expo Go** sur le téléphone (installée depuis le Play Store / App Store).',
              'Touche « Scan QR code » (Android) ou ouvre l\'appareil photo natif (iOS) et vise le QR du terminal.',
              'Expo Go télécharge et exécute ton code : l\'écran « Open up App.tsx to start working » apparaît SUR ton téléphone.',
              'Édite `App.tsx` (change un mot du texte) et SAUVEGARDE : le téléphone se recharge TOUT SEUL en une seconde — la magie du Fast Refresh.',
              'Secoue le téléphone (ou trois doigts) : le menu développeur d\'Expo (reload, debugger) apparaît — ton nouvel outil de diagnostic.'
            ] },
            { t: 'h3', h: 'La structure générée, dossier par dossier' },
            { t: 'code', lang: 'text', label: 'zemidjan-livraison/ — après create-expo-app', code:
'zemidjan-livraison/\n├── App.tsx (ou App.js)  # LE composant racine de ton app — ta première édition\n├── app.json             # la carte d\'identité Expo : nom, icône, splash, version\n├── package.json         # scripts (start) + dépendances (react, react-native, expo)\n├── assets/              # images embarquées DANS l\'app (icon, splash…)\n├── babel.config.js      # le traducteur JS (peu à toucher au début)\n└── node_modules/        # jetable, régénéré par npm install — jamais commité' },
            { t: 'p', h: 'Le fichier qui surprend les gens : `app.json` — c\'est la CARTE D\'IDENTITÉ de l\'application mobile (nom affiché sous l\'icône, image du splash, orientation permise, numéro de version). Tu le retoucheras le jour où « Zemidjan Livraison » doit apparaître avec SON icône verte sous l\'icône Expo. Et si la navigation entre écrans arrive vite à l\'esprit : elle viendra d\'Expo Router (fiche dédiée du module) — le gabarit actuel laisse la porte ouverte.' },
            { t: 'h3', h: 'La vérification qui calme (le rituel complet)' },
            { t: 'ol', items: [
              '`node -v` ≥ 18 sur l\'ordinateur.',
              '`npx create-expo-app zemidjan-livraison` se termine sans rouge (premier run : il peut télécharger ~2 min, c\'est normal).',
              '`npx expo start` affiche le QR — PAS d\'erreur « port already in use » (sinon ferme l\'autre projet Expo/React qui tourne).',
              'Le téléphone scanne, **charge** la page (barre bleue), et montre l\'écran de l\'app — physiquement, entre tes mains.',
              'Un changement dans `App.tsx` se reflète sur le téléphone en moins de 2 secondes : tu as ta boucle de dev complète.',
              'Bonus pro : `npx expo start --tunnel` résout le « QR qui tourne dans le vide » sur Wi-Fi bridé.'
            ] },
            { t: 'callout', kind: 'warn', h: 'Le téléphone et le PC NE partagent le même réseau que si le box l\'autorise. Sur beaucoup de réseaux d\'entreprise/campus, l\'« isolation client » bloque la découverte : le QR se scanne mais la page n\'avance jamais. Deux issues : 1) le mode tunnel (`npx expo start --tunnel`) qui passe par les serveurs d\'Expo — votre solution de secours universelle ; 2) un point d\'accès mobile du téléphone vers lequel le PC se connecte.' },
            { t: 'h3', h: 'Ce que les débutants comprennent mal' },
            { t: 'ul', items: [
              '**« Expo est un jouet, « le vrai React Native » c\'est le CLI. »** Faux : Expo EST React Native, plus une grande boîte à outils (Expo Go, EAS build, librairies packagées). La majorité des applis pro modernes partent d\'Expo ; le CLI ne s\'impose que pour un natif très spécifique.',
              '**« Il faut un émulateur pour développer en mobile. »** Non : avec Expo Go, ton PROPRE téléphone est la cible. Les émulateurs (Android Studio/Xcode) deviennent utiles pour les cas d\'échec ou les tailles spécifiques — jamais obligatoires au départ.',
              '**« Le QR code est une image qu\'on partage par WhatsApp. »** Non : il encode l\'ADRESSE de ton ordinateur sur le réseau local — hors du même Wi-Fi, il ne mène nulle part. Le tunnel change cette adresse en URL publique temporaire.',
              '**« Android Studio est indispensable pour faire une vraie app Android. »** Non : il ne sert qu\'à compiler en local (CLI). Avec Expo, même le build final de l\'APK/AAB se fait dans le cloud (EAS) — ta machine n\'a besoin d\'aucun SDK.',
              '**« iOS exige un Mac pour développer une app iPhone. »** Pour le dev Expo Go, non : le site et le QR suffisent avec un iPhone. (La publication App STORE, elle, demandera toujours un compte Apple payant — autre sujet, plus tard.)'
            ] },
            { t: 'h3', h: 'Les erreurs typiques à ne plus commettre' },
            { t: 'p', h: 'Les deux enfers du premier jour mobile : l\'installation prématurée des 15 Go de SDK Android (alors qu\'Expo Go suffisait), et le QR code qui se scanne mais ne charge jamais — le téléphone et le PC ne parlant pas à travers le Wi-Fi, sans qu\'aucun message ne te le dise vraiment.' },
            { t: 'h3', h: 'Lien avec les notions déjà vues' },
            { t: 'p', h: 'Le socle React revient en force : `App.tsx` reçoit le même JSX que la fiche **Composants & JSX** du module React, les props/state se comportent pareil. La fiche **Qu\'est-ce que React Native, vraiment ?** t\'expliquera pourquoi `<View>` remplace `<div>` et pourquoi il n\'y a pas de DOM ici ; la fiche **Expo ou React Native CLI ?** reprendra le choix de ce jour en profondeur avec les critères de migration ; et **Exécuter & déboguer** te servira quand le Fast Refresh t\'aura lâché la première fois. Tu as l\'atelier — la suite t\'apprendra à y construire une vraie app de livraison zémidjan.' },
          ],
          errors: [
            {
              title: 'Installer les SDK complets (Android Studio) trop tôt',
              bad: '# « Pour faire du mobile, il faut Android Studio, non ? »\n# → Téléchargements : 4 Go d\'Android Studio + 11 Go de SDK/émulateurs,\n#   40 min de configuration JAVA_HOME/ANDROID_HOME, émulateur\n#   qui rame sur le laptop… et l\'app pas écrite AU BOUT DE 2 JOURS.\n# Le débutant croit que c\'est la voie normale ; c\'est la voie\n# historique, rendue optionnelle depuis Expo.',
              good: 'npx create-expo-app zemidjan-livraison\ncd zemidjan-livraison\nnpx expo start\n# + Expo Go sur le téléphone → QR → app visible en 10 minutes,\n#   sans AUCUN SDK sur la machine. Le jour où un natif spécifique\n#   l\'exigera (rare), tu configureras le CLI avec des bases solides.',
              why: 'La distinction Expo/CLI n\'est pas un détail de préférence : c\'est le choix entre « ton code JS servi sur un téléphone » et « compiler un binaire natif en local ». Android Studio répond au SECONDIÈME besoin — que tu n\'as pas pour apprendre, ni pour la plupart des applis. Installer ces 15 Go « au cas où » retarde le premier succès de plusieurs jours et c\'est la cause n°1 d\'abandon. Règle : Expo tant qu\'aucune librairie native indisponible ne l\'exige — le jour venu, l\'eject d\'Expo garde tout le code intact.'
            },
            {
              title: 'Expo Go et le PC pas sur le même Wi-Fi',
              bad: 'npx expo start\n# QR affiché → scan avec Expo Go → « something went wrong » ou\n# une barre de chargement qui n\'en finit pas.\n# causes typiques : le PC est en ethernet et la box a l\'isolation\n# client ; le téléphone est en 4G (pas le même réseau !) ;\n# le pare-feu Windows bloque le port 8081 d\'Expo.',
              good: '# 1) Vérifier : téléphone sur le Wi-Fi de la BOX (pas en 4G),\n#    PC connecté à la MÊME box.\n# 2) Autoriser Node dans le pare-feu quand Windows le demande.\n# 3) Solution universelle si le réseau bloque :\nnpx expo start --tunnel\n#    → QR encodant une URL publique temporaire : fonctionne\n#      sur à peu près tous les réseaux (juste un cran plus lent).',
              why: 'Expo Go télécharge ton JavaScript DEPUIS ton ordinateur : le QR n\'est qu\'une URL locale (192.168.…), inutile si les appareils ne se voient pas. L\'isolation client (box, cybercafé, entreprise) et la 4G du téléphone sont les deux grands coupables — la page « qui ne charge jamais » veut presque TOUJOURS dire ça, et aucun message ne le dit franchement. Le mode tunnel fait passer le lien par les serveurs d\'Expo : c\'est la solution qui sauve les démos en terrain mal équipé — et c\'est aussi pour ça qu\'on teste toujours sur SON data plan le lendemain.'
            }
          ],
          related: ['rn-demarrage', 'rn-expo-vs-bare', 'rn-executer']
        },
        {
          id: 'rn-demarrage',
          title: 'Qu\'est-ce que React Native, vraiment ?',
          icon: 'smartphone',
          level: 'Débutant',
          tagline: 'Ni webview, ni site mobile : du JavaScript qui pilote de VRAIS composants natifs.',
          intro: 'React Native, c\'est React — tes composants, ton JSX, tes hooks — mais au lieu de produire du HTML, ton code produit des **vues natives** : un `&lt;View&gt;` devient un `UIView` sur iOS, un `android.view.ViewGroup` sur Android. C\'est toute la différence avec une webview (un site dans une coquille) : le rendu, le défilement, les animations sont ceux de la plateforme, avec ses performances et ses codes visuels. Tu connais déjà React (module React JS) ? Tu sais ~70 % de React Native ; cette première fiche pose les 30 % qui changent tout.',
          blocks: [
            { t: 'h3', h: 'Le pont entre deux mondes' },
            { t: 'p', h: 'Ton JavaScript tourne dans un moteur dédié (Hermes, compilé quand tu construis). Il communique avec la partie native — écrite en Swift/Kotlin par le framework — pour créer les vues, lire les capteurs, déclencher les vibrations. Anciennement ce dialogue passait par un "bridge" sérialisé en JSON (source de lenteurs) ; la **Nouvelle Architecture** (JSI, Fabric, TurboModules, activée par défaut depuis 0.76) fait communiquer JS et natif directement, plus vite et de façon synchrone quand il le faut. Tu n\'as rien à coder pour ça, mais c\'est utile pour comprendre les messages d\'erreur… et les années de discussions sur le sujet.' },
            { t: 'code', lang: 'js', label: 'App.js — ton premier écran', code:
'import { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.ecran}>\n      {/* du JSX classique, mais des COMPOSANTS NATIFS, pas de HTML */}\n      <Text style={styles.titre}>Bonjour depuis Cotonou</Text>\n      <Text>Ceci est un vrai Text natif, pas une balise.</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  ecran: { flex: 1, alignItems: "center", justifyContent: "center" },\n  titre: { fontSize: 22, fontWeight: "700" }\n});' },
            { t: 'p', h: 'Trois choses changent par rapport au web, à graver immédiatement. **1)** Plus de balises : `div` → `View`, `p`/`span` → `Text`, `img` → `Image`, et TOUT texte doit vivre dans un `&lt;Text&gt;`. **2)** Les styles sont des objets JavaScript en camelCase (`backgroundColor`), pas du CSS — il n\'y a ni cascade ni feuille de style globale. **3)** Il n\'y a pas de navigateur : pas de `window`, pas de `document`, pas de DOM — mais fetch, Promises et tout JavaScript moderne.' },
            { t: 'h3', h: 'Ce que tu vas construire avec ça' },
            { t: 'ul', items: [
              '**Une seule base de code** pour iOS ET Android (80-95 % partagé), écrite par des développeurs web sans apprendre Swift/Kotlin.',
              'Des apps "grand public" : Facebook, Instagram, Shopify, Discord tournent (en partie ou en totalité) sur React Native.',
              'Des prototypes en heures grâce à **Expo** (fiche suivante) : un téléphone, un QR code, et ton app tourne sur l\'appareil réel.',
              'Un déploiement sur les stores (Play Store, App Store) — différent du web : binaire signé, validation par les boutiques (fiche Build).'
            ] },
            { t: 'callout', kind: 'tip', h: 'Ne-migre-pas-tout réflexe : tout ce que tu sais de React (props, state, hooks, composition, Context) fonctionne à l\'identique. Quand un doute surgit, demande-toi "est-ce spécifique au rendu mobile ?" — si non, la réponse du module React JS s\'applique.' }
          ],
          errors: [
            { title: 'Chercher le DOM : du HTML dans du JSX mobile', lang: 'js', bad: 'return (\n  <div className="carte">        {/* ERREUR : pas de DOM ici */}\n    Bonjour                       {/* ERREUR : texte hors <Text> */}\n  </div>\n);', good: 'return (\n  <View style={styles.carte}>\n    <Text>Bonjour</Text>          {/* tout texte vit dans un <Text> */}\n  </View>\n);', why: 'Il n\'existe aucun élément DOM côté natif : les balises HTML sont inconnues (crash "View config not found"), et un texte nu hors d\'un `<Text>` ne peut pas être rendu par les vues natives. C\'est LE premier réflexe à désapprendre.' },
            { title: 'Écrire du CSS web en chaîne de caractères', lang: 'js', bad: '<View style="margin: 8px; background-color: red">\n// "margin: 8px" : string illégale, px inconnu → crash au rendu', good: '<View style={{ margin: 8, backgroundColor: "red" }}>\n// objets JS, camelCase, nombres = unités indépendantes de la densité', why: 'Le style React Native est un objet JavaScript (propriétés camelCase), en "density-independent pixels" : pas de px, pas de string CSS, pas de cascade. La fiche Styles reprend ça en détail.' }
          ],
          related: ['rx-concepts', 'rn-expo-vs-bare', 'rn-composants-base', 'rn-styles']
        },

        {
          id: 'rn-expo-vs-bare',
          title: 'Expo ou React Native CLI (bare) ?',
          icon: 'rocket_launch',
          level: 'Débutant',
          tagline: 'La décision du premier jour — et pourquoi Expo est le bon défaut dans 90 % des cas.',
          intro: 'Deux portes d\'entrée existent. **Expo** : une couche au-dessus de React Native qui gère l\'outillage (création, lancement, caméra, GPS, notifications, build dans le cloud via EAS) sans jamais ouvrir Xcode ni Android Studio. **Le CLI "bare"** : le projet brut avec dossiers `ios/` et `android/` natifs visibles, contrôle total — et configuration totale. La sagesse actuelle (y compris la doc officielle, qui recommande Expo) : **commencer avec Expo**, ne sortir de son cadre que lorsqu\'une contrainte native réelle l\'exige.',
          blocks: [
            { t: 'h3', h: 'Le tableau de décision' },
            { t: 'table', head: ['Critère', 'Expo (managed)', 'React Native CLI (bare)'], rows: [
              ['Prérequis machine', 'Node.js + Expo Go (téléphone)', 'Xcode (Mac !) + Android Studio, JDK, SDK, émulateurs'],
              ['Modules natifs tiers', 'Bibliothèques Expo + config plugins ; code natif custom via prebuild/dev client', 'Tout, sans restriction'],
              ['Caméra, GPS, notifications', 'APIs Expo uniformes (expo-camera, expo-location…)', 'Bibliothèques communautaires à câbler soi-même'],
              ['Build de production', 'EAS Build dans le cloud (pas besoin de Mac)', 'gradle/xcode en local, ou CI'],
              ['Mises à jour OTA (JS)', 'EAS Update intégré', 'CodePush ou équivalent à configurer'],
              ['Cas idéal', '90 % des apps : CRUD, formulaires, listes, réseau', 'SDK natif maison, Bluetooth spécifique, contraintes binaires précises']
            ] },
            { t: 'p', h: 'Points clés à retenir. **1)** Expo n\'est plus une "boîte fermée" : avec `prebuild` et les *development builds*, tu peux intégrer du code natif custom TOUT en gardant l\'écosystème Expo (EAS). **2)** **EAS Build** compile dans le cloud : tu produis un `.ipa` iOS depuis un PC Windows ou Linux — impossible autrement (iOS exige un Mac). **3)** "Éjecter" n\'est plus un aller simple : prebuild régénère les dossiers natifs depuis la config au lieu d\'une migration définitive.' },
            { t: 'code', lang: 'bash', code:
'# Démarrage Expo (recommandé) :\nnpx create-expo-app mon-app\ncd mon-app\nnpx expo start          # Metro démarre, QR code affiché\n\n# Démarrage bare (contrôle total) :\nnpx @react-native-community/cli init MonApp\ncd MonApp\nnpx react-native run-android    # exige Android Studio + émulateur\nnpx react-native run-ios        # exige un Mac avec Xcode' },
            { t: 'callout', kind: 'warn', h: 'Mythe à tuer : "Expo, c\'est pour les jouets". Faux depuis longtemps — des apps en production à grande échelle tournent avec Expo et EAS. Le vrai critère de choix : as-tu besoin d\'un module natif que ni Expo ni un config plugin ne couvre ? Si oui (SDK propriétaire,Bluetooth bas niveau…), bare ou prebuild ; sinon, Expo te fait gagner des semaines.' }
          ],
          errors: [
            { title: 'Abandonner Expo au premier module natif entrevu', lang: 'bash', bad: '# "J\'aurai peut-être besoin de BLE un jour"\n# → projet bare dès le jour 1 : 3 jours de config Xcode/Gradle\n#    au lieu de coder l\'app', good: 'npx create-expo-app mon-app\n# et SEULEMENT si un besoin natif précis apparaît :\nnpx expo prebuild   # génère ios/ android/ sans quitter l\'écosystème', why: 'Le sur-mesure natif coûte de la configuration continue (chaque mise à jour RN, chaque dépendance). Prebuild permet d\'ajouter du natif tardivement, sans payer ce coût dès le premier jour.' },
            { title: 'Mélanger les deux mondes sans le savoir', lang: 'bash', bad: 'npm install react-native-camera   # lib legacy exigeant du natif custom\n# dans un projet Expo Go → "Incompatible native module"', good: 'npx expo install expo-camera   # version alignée au SDK Expo, testée avec\n# (npx expo install choisit TOUJOURS la bonne version pour ton SDK)', why: 'Expo Go embarque un socle natif figé : les bibliothèques à code natif hors SDK exigent un development build. Et `npx expo install` résout la version compatible avec ton SDK — `npm install` tout court peut te poser une version cassée.' }
          ],
          related: ['rn-demarrage', 'rn-executer', 'rn-permissions', 'rn-build']
        },

        {
          id: 'rn-executer',
          title: 'Exécuter sur téléphone et émulateur',
          icon: 'play_circle',
          level: 'Débutant',
          tagline: 'Expo Go, QR code, simulateur iOS, émulateur Android, Metro : ta boucle de développement quotidienne.',
          intro: 'Coder c\'est bien ; **voir** tourner l\'app, c\'est la boucle quotidienne. Trois cibles : un appareil réel via **Expo Go** (la plus simple), le simulateur iOS (Mac uniquement), l\'émulateur Android (toutes plateformes). Au centre : **Metro**, le serveur de développement qui re-bunddle ton JS à chaque sauvegarde (Fast Refresh : l\'écran se met à jour sans perdre l\'état, comme le HMR de Vite).',
          blocks: [
            { t: 'h3', h: 'Les trois cibles' },
            { t: 'code', lang: 'bash', code:
'npx expo start\n# → QR code dans le terminal\n#\n# Appareil réel : installe Expo Go (store), scanne le QR\n#   iOS : avec l\'appareil PHOTO ; Android : depuis Expo Go\n#   (téléphone et PC sur le MÊME Wi-Fi — sinon : npx expo start --tunnel)\n#\n# Simulateur / émulateur :\n#   tape "i"  → simulator iOS (Mac + Xcode requis)\n#   tape "a"  → émulateur Android (Android Studio + AVD créé au préalable)' },
            { t: 'p', h: 'Expo Go, c\'est une application-hôte qui contient déjà tout le socle natif Expo : ton JavaScript y est simplement chargé. D\'où la vitesse de mise en route (aucune compilation) — et la limite symétrique : un module natif non couvert par le SDK Expo exigera un **development build** (ta propre Expo Go à toi). À 80 % du développement, Expo Go suffit largement.' },
            { t: 'h3', h: 'La boucle Metro au quotidien' },
            { t: 'ul', items: [
              '**Fast Refresh** : sauvegarde → écran mis à jour en gardant l\'état (magique pour itérer sur les styles).',
              '`r` dans le terminal : recharger totalement l\'app. `j` : ouvrir le debugger (fiche Debugging). `?` : la liste des raccourcis.',
              'Menu développeur dans l\'app : secouer le téléphone, ou `Cmd+D` (simulateur iOS), `Cmd+M` / `Ctrl+M` (émulateur Android).',
              'En cas de comportement absurde après une grosse mise à jour : `npx expo start -c` vide le cache Metro — l\'équivalent local du "redémarrage magique".'
            ] },
            { t: 'callout', kind: 'tip', h: 'Développe sur appareil réel dès que possible : performances et gestes réels, GPS, caméra. L\'émulateur reste le roi pour tester plusieurs tailles d\'écran… et pour ne pas vider la batterie du téléphone.' }
          ],
          errors: [
            { title: 'Le téléphone ne voit pas le serveur Metro', lang: 'bash', bad: '# QR scanné, puis "Network response timed out"\n# (téléphone en 4G ou sur un autre Wi-Fi que le PC)', good: 'npx expo start --tunnel\n# ou remettre les DEUX appareils sur le même réseau,\n# et désactiver le pare-feu qui bloque le port 8081', why: 'Expo Go va chercher le bundle JS sur ton PC en HTTP local : sans réseau commun, ou avec un pare-feu qui bloque le port 8081, la connexion est impossible. Le mode --tunnel passe par un relais public (plus lent, mais infalsifiable).' },
            { title: 'Chercher "run-ios" sur Windows/Linux', lang: 'bash', bad: 'npx react-native run-ios\n# sur Windows : "xcodebuild not found", et ça ne changera jamais', good: '# iOS exige macOS pour la compilation LOCALE — MAIS :\nnpx eas build --platform ios     # compile dans le cloud d\'Expo\n# et pour le dev quotidien : Expo Go sur iPhone + QR code', why: 'Compiler pour iOS requiert Xcode, qui n\'existe que sur Mac. Expo Go permet le développement sans Mac ; EAS Build permet le build de production sans Mac. Ce n\'est pas une contrainte Expo, c\'est une contrainte Apple.' }
          ],
          related: ['rn-expo-vs-bare', 'rn-debugging', 'rn-plateforme']
        }
      ]
    },

    /* ======================================================
       2. COMPOSANTS DE BASE
       ====================================================== */
    {
      id: 'composants',
      name: 'Composants de base',
      icon: 'widgets',
      fiches: [
        {
          id: 'rn-composants-base',
          title: 'View, Text, Image, ScrollView',
          icon: 'widgets',
          level: 'Débutant',
          tagline: 'Les quatre briques visuelles avec lesquelles TOUT écran mobile est construit.',
          intro: 'Oublie les dizaines de balises HTML : une interface React Native tient sur une poignée de composants. `View` est la boîte universelle (le div du mobile), `Text` le seul endroit où du texte peut vivre, `Image` l\'affichage d\'images locales ou distantes, `ScrollView` le conteneur qui défile. Tout le reste — listes, boutons, cartes — est bâti dessus.',
          blocks: [
            { t: 'h3', h: 'Les quatre en action' },
            { t: 'code', lang: 'js', code:
'import { View, Text, Image, ScrollView, StyleSheet } from "react-native";\n\nexport default function Profil() {\n  return (\n    <ScrollView contentContainerStyle={styles.page}>\n      {/* Image distante : uri + dimensions OBLIGATOIRES */}\n      <Image\n        source={{ uri: "https://api.exemple.bj/avatars/awa.png" }}\n        style={styles.avatar}\n        resizeMode="cover"\n      />\n      {/* Image locale : require("...") statique */}\n      {/* <Image source={require("./assets/logo.png")} style={{ width: 120, height: 40 }} /> */}\n\n      <Text style={styles.nom}>Awa Mensah</Text>\n      <Text style={styles.bio} numberOfLines={3}>\n        Développeuse mobile — Cotonou. Texte long tronqué proprement\n        après 3 lignes grâce à numberOfLines (+ ellipsizeMode).\n      </Text>\n\n      <View style={styles.carte}>\n        <Text>Carte enfant : les View s\'imbriquent à volonté.</Text>\n      </View>\n    </ScrollView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  page: { padding: 20, gap: 12 },\n  avatar: { width: 96, height: 96, borderRadius: 48 },   // rond = moitié de la taille\n  nom: { fontSize: 24, fontWeight: "800" },\n  bio: { color: "#555", lineHeight: 22 },\n  carte: { backgroundColor: "#fff", borderRadius: 16, padding: 16 }\n});' },
            { t: 'p', h: 'Notes de terrain. **`View`** n\'affiche rien par elle-même : c\'est un conteneur de mise en page (flex par défaut, fiche Flexbox). **`Text`** s\'imbrique pour styliser un morceau : `&lt;Text&gt;Bonjour &lt;Text style={{ fontWeight: "700" }}&gt;Awa&lt;/Text&gt;&lt;/Text&gt;` — et c\'est le SEUL composant dont le style texte se transmet à ses enfants. **`Image`** distante exige des dimensions explicites : sans taille, elle n\'a aucun cadre où se dessiner (le natif ne connaît pas la taille "intrinsèque" d\'une image pas encore téléchargée). **`ScrollView`** rend TOUT son contenu d\'un coup : parfait pour un écran de formulaire ; pour une liste longue, `FlatList` (fiche dédiée).' },
            { t: 'callout', kind: 'tip', h: 'Équivalences à garder en tête en venant du web : `div`→`View`, tous les éléments textuels→`Text`, `img`→`Image`, `ul/li`→`FlatList`, `form/input/button`→composants dédiés de la fiche suivante. Si tu cherches une balise, elle a un cousin natif.' }
          ],
          errors: [
            { title: 'Texte nu hors d\'un <Text>', lang: 'js', bad: '<View>\n  Bonjour le monde        {/* crash : "Text strings must be rendered within a <Text>" */}\n</View>', good: '<View>\n  <Text>Bonjour le monde</Text>\n</View>', why: 'Les moteurs de rendu natifs ne savent peindre du texte qu\'à travers un composant texte dédié ; une chaîne flottant dans une View est rejetée par le moteur de rendu. Même une apostrophe oubliée entre deux composants peut déclencher cette erreur.' },
            { title: 'Image distante sans dimensions : écran "cassé"', lang: 'js', bad: '<Image source={{ uri: url }} />\n// aucun cadre de rendu : l\'image reste à 0×0, invisible,\n// et l\'équipe cherche un bug réseau qui n\'existe pas', good: '<Image source={{ uri: url }}\n       style={{ width: 200, height: 120, borderRadius: 12 }}\n       resizeMode="cover" />', why: 'Sur le web, le navigateur réserve puis ajuste ; en natif, l\'image distante n\'a de boîte que si TU la donnes. Toujours dimensionner une Image (style fixe, aspectRatio, ou flex) — resizeMode ajuste ensuite le recadrage.' },
            { title: 'ScrollView autour d\'une longue liste', lang: 'js', bad: '<ScrollView>\n  {produits.map((p) => <CarteProduit key={p.id} p={p} />)}\n  {/* 600 cartes rendues d\'un coup : mémoire + jank au scroll */}\n</ScrollView>', good: '<FlatList data={produits}\n  renderItem={({ item }) => <CarteProduit p={item} />}\n  keyExtractor={(p) => p.id} />', why: 'ScrollView rend tous ses enfants immédiatement, qu\'ils soient visibles ou non. FlatList ne rend qu\'une fenêtre autour de l\'écran visible — c\'est LA réponse aux listes (fiche FlatList).' }
          ],
          related: ['rn-interactions', 'rn-flatlist', 'rn-styles', 'rx-composants-props']
        },

        {
          id: 'rn-interactions',
          title: 'TextInput, Button, Pressable et TouchableOpacity',
          icon: 'touch_app',
          level: 'Débutant',
          tagline: 'Saisir du texte et répondre au doigt : les composants interactifs de base.',
          intro: 'Côté utilisateur, deux gestes dominent : taper au clavier et tapoter. `TextInput` gère le premier — un champ contrôlé comme en React web, mais avec toute une grammaire mobile (type de clavier, sécurisation, retour automatique). Pour le second, `Button` n\'est qu\'un bouton système minimal non stylable ; le vrai composant tactile moderne est `Pressable`, avec `TouchableOpacity` en survivant omniprésent du code plus ancien.',
          blocks: [
            { t: 'h3', h: 'TextInput : le champ mobile' },
            { t: 'code', lang: 'js', code:
'import { TextInput, StyleSheet } from "react-native";\nimport { useState } from "react";\n\nexport function FormulaireLite() {\n  const [email, setEmail] = useState("");\n  const [mdp, setMdp] = useState("");\n\n  return (\n    <>\n      {/* CONTRÔLÉ : value + onChangeText (texte BRUT, pas d\'event DOM) */}\n      <TextInput\n        style={styles.champ}\n        value={email}\n        onChangeText={setEmail}          // onChangeText={(texte) => setEmail(texte)}\n        placeholder="Ton e-mail"\n        placeholderTextColor="#9aa5b1"  // sinon presque invisible en mode sombre\n        keyboardType="email-address"     // clavier avec @ et . en première ligne\n        autoCapitalize="none"            // jamais de majuscule auto sur un e-mail\n        autoCorrect={false}\n        returnKeyType="next"             // bouton "Suivant" du clavier\n      />\n      <TextInput\n        style={styles.champ}\n        value={mdp}\n        onChangeText={setMdp}\n        placeholder="Mot de passe"\n        placeholderTextColor="#9aa5b1"\n        secureTextEntry                  // masque la saisie (points noirs)\n      />\n    </>\n  );\n}\n\nconst styles = StyleSheet.create({\n  champ: {\n    borderWidth: 1, borderColor: "#d3dae3", borderRadius: 12,\n    paddingHorizontal: 14, paddingVertical: 10, fontSize: 16\n  }\n});' },
            { t: 'h3', h: 'Tactile : le trio à connaître' },
            { t: 'code', lang: 'js', code:
'import { Button, Pressable, TouchableOpacity, Text } from "react-native";\n\n// 1) Button : bouton SYSTÈME, minimal — Props : title + onPress, rien d\'autre\n<Button title="Valider" onPress={envoyer} />\n//    → impossible de changer forme/couleur finement : prototypage seulement\n\n// 2) Pressable : LE composant tactile moderne. style peut être une FONCTION\n<Pressable\n  onPress={envoyer}\n  onLongPress={() => console.log("appui long")}\n  android_ripple={{ color: "#d0ebff" }}            // effet matière Android\n  hitSlop={12}                                      // agrandit la zone tactile\n  style={({ pressed }) => [\n    styles.bouton,\n    pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }\n  ]}\n>\n  <Text style={styles.boutonTexte}>Valider</Text>\n</Pressable>\n\n// 3) TouchableOpacity : le "legacy" partout présent dans les vieux codes\n<TouchableOpacity onPress={envoyer} activeOpacity={0.7}>\n  <Text>Ancien bouton</Text>\n</TouchableOpacity>' },
            { t: 'p', h: 'Pourquoi `Pressable` a gagné : le `style` en fonction reçoit `{ pressed }` (retour visuel instantané, façon iOS), `hitSlop` agrandit la cible sans grossir le visuel, `android_ripple` et `onLongPress` sont natifs. Retenir la hiérarchie : Pressable par défaut, Button pour un brouillon en 10 secondes, TouchableOpacity quand tu maintiens du code existant.' },
            { t: 'callout', kind: 'warn', h: 'Zone tactile minimale : 44×44 points (iOS) / 48×48 dp (Android). Un "petit bouton" qui exige la précision d\'un chirurgien est un bug d\'UX — corrige avec du padding ou `hitSlop`.' }
          ],
          errors: [
            { title: 'Écrire un TextInput "non contrôlé" à la web', lang: 'js', bad: '<TextInput placeholder="Nom" />\n// saisie silencieuse : l\'état JS ne voit RIEN,\n// impossible de valider, pré-remplir ou réinitialiser', good: 'const [nom, setNom] = useState("");\n<TextInput value={nom} onChangeText={setNom} placeholder="Nom" />\n// L\'app est la source de vérité (même pattern que React web)', why: 'Dès que le formulaire a une logique — validation, reset, pré-remplissage — le champ doit être contrôlé. Non contrôlé, tu perds la seule chose qui permette de raisonner sur le formulaire : son état.' },
            { title: 'Essayer de styliser <Button>', lang: 'js', bad: '<Button title="Valider" style={{ borderRadius: 20 }} />\n// prop style ignorée : Button = bouton natif figé du système', good: '<Pressable onPress={envoyer} style={({ pressed }) => [\n  styles.bouton, pressed && styles.boutonPresse\n]}>\n  <Text style={styles.boutonTexte}>Valider</Text>\n</Pressable>', why: 'Button délègue son apparence à l\'OS (utile pour un prototype "système"). Tout design réel passe par Pressable + Text : tu maîtrises fond, rayon, ombre, état pressé.' }
          ],
          related: ['rn-composants-base', 'rn-formulaires', 'rn-gestes', 'rn-styles']
        }
      ]
    },

    /* ======================================================
       3. STYLES & DIMENSIONS
       ====================================================== */
    {
      id: 'styles',
      name: 'Styles & dimensions',
      icon: 'palette',
      fiches: [
        {
          id: 'rn-styles',
          title: 'StyleSheet.create et le style façon mobile',
          icon: 'palette',
          level: 'Débutant',
          tagline: 'Des objets JavaScript en camelCase, sans cascade ni héritage — et pourquoi c\'est une libération.',
          intro: 'Le style React Native ressemble à du CSS (`backgroundColor`, `borderRadius`) mais n\'est **pas du CSS** : ce sont des objets JavaScript passés en prop, sans cascade (un parent ne stylise jamais ses enfants), sans héritage (chaque `Text` porte ses styles de texte), sans feuille globale. Contre-intuitif le premier jour, libérateur ensuite : un style ne fuit jamais d\'un composant vers un autre — finie la guerre de la spécificité (que la fiche Cascade du module CSS t\'a appris à livrer).',
          blocks: [
            { t: 'h3', h: 'StyleSheet.create, composition, surcharge' },
            { t: 'code', lang: 'js', code:
'import { StyleSheet, View, Text } from "react-native";\n\nexport default function Alerte({ type, children }) {\n  return (\n    // TABLEAU de styles : appliqués dans l\'ordre, le dernier gagne\n    <View style={[styles.alerte, type === "danger" && styles.alerteDanger]}>\n      <Text style={styles.alerteTexte}>{children}</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  alerte: { padding: 14, borderRadius: 12, backgroundColor: "#e7f5ff" },\n  alerteDanger: { backgroundColor: "#ffe3e3" },\n  alerteTexte: { color: "#1b3a4b", fontSize: 15 }\n});\n\n// Usage :\n// <Alerte type="danger">Stock de gari presque épuisé.</Alerte>' },
            { t: 'p', h: 'Trois réflexes. **1)** La forme **tableau** `[styles.base, condition && styles.variante]` est l\'équivalent mobile des classes utilitaires : lisible, sans concaténation de chaînes. **2)** `StyleSheet.create` valide les noms de propriétés au développement (`backgrounColor` → warning immédiat) et garde les identités stables — préfère-le aux objets inline recréés à chaque rendu. **3)** Un style inconnu (`grid-template-columns`, `float`, `hover`) n\'existe simplement pas : le mobile n\'a que flex, des ombres spécifiques par plateforme (fiche Plateforme) et un sous-ensemble du CSS de texte.' },
            { t: 'h3', h: 'Ce qui n\'existe PAS — et l\'équivalent' },
            { t: 'table', head: ['Habitude web', 'Statut en RN', 'Équivalent mobile'], rows: [
              ['`class`, cascade, héritage', 'Absents', 'Props + tableau de styles, composants réutilisables'],
              ['Unités `px`, `rem`, `em`', 'Absentes', 'Nombres (dp) ; `rem` ~ taille de texte système (accessibilité)'],
              ['`:hover`, `:focus` CSS', 'Absents', '`pressed` de Pressable, état JS'],
              ['Media queries', 'Absentes', '`useWindowDimensions`, `Platform.select`'],
              ['`margin: 0 auto`', 'Absent', '`alignSelf: "center"` / centrage flex'],
              ['Feuille de style globale', 'Absente', 'Thème en constantes JS / Context (fiche État)']
            ] },
            { t: 'callout', kind: 'info', h: 'Tu aimes l\'approche "classes utilitaires" de Tailwind (module dédié) ? Elle existe aussi en RN avec **NativeWind** : `<View className="p-4 rounded-xl">`. Bonne nouvelle pour la portabilité mentale — mais apprends d\'abord le modèle natif, tu sauras ce que l\'outil cache.' }
          ],
          errors: [
            { title: 'Écrire du CSS en chaîne (avec des px)', lang: 'js', bad: '<View style="display: flex; margin: 8px;">\n// style attend un OBJET : "Invalid style property" → crash', good: '<View style={{ display: "flex", margin: 8 }}>\n// objet JS, camelCase, nombres sans unité', why: 'La prop style ne prend pas de string CSS : c\'est un objet JavaScript. Les nombres sont des unités indépendantes de la densité (dp/pt) — le "px" n\'a ni sens ni existence ici.' },
            { title: 'Croire que les styles héritent comme en CSS', lang: 'js', bad: '<View style={{ color: "red" }}>\n  <Text>On croirait rouge… reste noir : color ne cascade pas.</Text>\n</View>', good: '<Text style={{ color: "red" }}>Rouge pour de vrai.</Text>\n// ou transmettre un style via props / Context / composant Titre maison', why: 'Seule exception au monde RN : un `<Text>` DANS un `<Text>` hérite des styles de texte. Partout ailleurs, chaque composant porte les siens — c\'est volontaire, ça rend les composants prévisibles et déplaçables.' }
          ],
          related: ['rn-flexbox', 'rn-composants-base', 'css-flexbox', 'rn-plateforme']
        },

        {
          id: 'rn-flexbox',
          title: 'Flexbox mobile et les dimensions',
          icon: 'vertical_distribute',
          level: 'Intermédiaire',
          tagline: 'Le même flexbox que le web… avec le piège du flexDirection inversé, et les bons outils de mesure.',
          intro: 'Layout unique en React Native : c\'est flexbox ou rien (pas de float) — et 95 % du temps, cette flexbox n\'est pas un problème : `flex`, `justifyContent`, `alignItems`, `gap`, `padding` et hop. Mais deux spécificités piègent les développeurs web : **`flexDirection: "column"` est le défaut** (le web met row), et les dimensions (écran, rotation) se lisent via des outils réactifs — pas avec `window.innerWidth`.',
          blocks: [
            { t: 'h3', h: 'Les différences qui mordent' },
            { t: 'code', lang: 'js', code:
'import { View, Text, StyleSheet } from "react-native";\n\nconst styles = StyleSheet.create({\n  // flexDirection: "column" est LE DÉFAUT (le web : "row")\n  ecran: { flex: 1, padding: 16, gap: 12 },        // flex:1 = remplis l\'écran parent\n  entete: { height: 56, justifyContent: "center" },\n  // pour une rangée, il faut le DEMANDER :\n  ligne: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },\n  // axes : en column, l\'AXE PRINCIPAL est vertical →\n  //   justifyContent agit VERTICALEMENT, alignItems horizontalement (inversion fréquente !)\n  centre: { flex: 1, justifyContent: "center", alignItems: "center" },\n  // proportions : flex: 2/1 ≠ pourcentages — part de l\'espace RESTANT\n  colonneGauche: { flex: 2 },\n  colonneDroite: { flex: 1 }\n});' },
            { t: 'p', h: 'Le duo qui construit presque tout écran : un conteneur racine `flex: 1` (sinon le contenu se tasse en haut — le fameux "écran blanc avec un bouton dans le coin"), puis des sous-zones en `flex: n` pour partager l\'espace restant. Et mémorise l\'inversion : **justifyContent suit flexDirection** ; en colonne (défaut), il agit donc verticalement. 80 % des "mon centrage marche pas" viennent de là.' },
            { t: 'h3', h: 'Mesurer l\'écran proprement' },
            { t: 'code', lang: 'js', code:
'import { useWindowDimensions, View } from "react-native";\n\nexport default function Galerie() {\n  // HOOK réactif : se met à jour à la rotation, contrairement à Dimensions.get()…\n  const { width, height } = useWindowDimensions();\n  const nbColonnes = width >= 700 ? 3 : 2;            // "media query" en JS\n  const marge = 12;\n  const taille = (width - marge * (nbColonnes + 1)) / nbColonnes;\n\n  return (\n    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: marge }}>\n      {/* …vignettes de { taille } × { taille } — carrés calculés */}\n    </View>\n  );\n}\n\n// Autres outils :\n// - Dimensions.get("window") : figé à la mesure initiale (piège à la rotation !)\n// - "%" : accepté dans beaucoup de propriétés (width: "50%"), relatif au parent\n// - useSafeAreaInsets() (lib safe-area) : encoche, barre de geste — fiche Plateforme' },
            { t: 'callout', kind: 'tip', h: 'Teste TOUJOURS la rotation tôt (simulateur : `Cmd+←`). Un écran pensé portrait qui explose en paysage se corrige en dix minutes avec useWindowDimensions — en deux jours avec des constantes figées semées partout.' }
          ],
          errors: [
            { title: 'Oublier flex: 1 sur le conteneur racine', lang: 'js', bad: '<View>                          {/* hauteur = contenu */}\n  <Text>Court</Text>\n  {/* bouton censé être collé en bas : il flotte juste sous le texte */}\n  <Pressable style={styles.bouton}>…</Pressable>\n</View>', good: '<View style={{ flex: 1 }}>           {/* remplit tout l\'écran */}\n  <Text>Court</Text>\n  <View style={{ flex: 1 }} />       {/* ressort flexible */}\n  <Pressable style={styles.bouton}>…</Pressable>   {/* poussé en bas */}\n</View>', why: 'Une View sans flex mesure son contenu : rien ne s\'étire. flex: 1 sur la racine + un ressort (flex:1 vide ou justifyContent:"space-between") est l\'idiome de mise en page d\'écran — tu l\'écriras cent fois.' },
            { title: 'Lire Dimensions.get() une fois et le stocker', lang: 'js', bad: 'const { width } = Dimensions.get("window");   // au chargement module\nconst colonnes = width > 600 ? 2 : 1;\n// rotation tablette : colonnes ne change JAMAIS → layout cassé', good: 'const { width } = useWindowDimensions();   // hook : re-rend à la rotation\nconst colonnes = width > 600 ? 2 : 1;', why: 'Dimensions.get() est un instantané ; la rotation, le multi-fenêtrage ou le pliage modifient la taille d\'écran après coup. Le hook re-déclenche le rendu avec les bonnes valeurs — c\'est le "responsive" du mobile.' }
          ],
          related: ['rn-styles', 'css-flexbox', 'rn-plateforme', 'rn-flatlist']
        }
      ]
    },

    /* ======================================================
       4. LISTES PERFORMANTES
       ====================================================== */
    {
      id: 'listes',
      name: 'Listes performantes',
      icon: 'view_list',
      fiches: [
        {
          id: 'rn-flatlist',
          title: 'FlatList : la liste virtuelle du quotidien',
          icon: 'view_list',
          level: 'Intermédiaire',
          tagline: 'renderItem, keyExtractor, séparateurs, pull-to-refresh : la liste qui ne rend que ce qui se voit.',
          intro: 'Dès qu\'une collection dépasse l\'écran — messages, produits, transactions — `FlatList` remplace la combinaison ScrollView + map : elle ne rend qu\'une **fenêtre** d\'éléments autour de la zone visible et recycle le reste. Résultat : 10 ou 10 000 lignes, la mémoire reste stable. Son contrat tient en trois props : `data`, `renderItem`, et le non-négociable `keyExtractor`.',
          blocks: [
            { t: 'h3', h: 'Le squelette complet' },
            { t: 'code', lang: 'js', code:
'import { FlatList, View, Text, RefreshControl, StyleSheet } from "react-native";\n\nexport default function Marche({ produits, onRafraichir, chargement }) {\n  return (\n    <FlatList\n      data={produits}                                  // tableau d\'objets\n      keyExtractor={(p) => String(p.id)}              // identité STABLE de chaque ligne\n      renderItem={({ item }) => (                      // destructuré { item } !\n        <View style={styles.ligne}>\n          <Text style={styles.nom}>{item.nom}</Text>\n          <Text style={styles.prix}>{item.prix} F</Text>\n        </View>\n      )}\n      ItemSeparatorComponent={() => <View style={styles.sep} />}\n      ListEmptyComponent={<Text style={styles.vide}>Aucun produit pour l\'instant.</Text>}\n      ListHeaderComponent={<Text style={styles.entete}>Marché de Dantokpa</Text>}\n      refreshControl={<RefreshControl refreshing={chargement} onRefresh={onRafraichir} />}\n      // numColumns={2}   → grille. horizontal → carrousel. onEndReached → scroll infini\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  ligne: { flexDirection: "row", justifyContent: "space-between", padding: 14 },\n  nom: { fontSize: 16, fontWeight: "600" },\n  prix: { color: "#0a7d5c", fontWeight: "700" },\n  sep: { height: StyleSheet.hairlineWidth, backgroundColor: "#e2e8f0" },\n  vide: { textAlign: "center", color: "#64748b", marginTop: 40 },\n  entete: { fontSize: 20, fontWeight: "800", margin: 14 }\n});' },
            { t: 'p', h: 'Points clés. `renderItem` reçoit un objet `{ item, index, separators }` : déstructure `{ item }`, inutile de réinventer des index. Les slots `ListEmptyComponent`, `ItemSeparatorComponent`, `ListHeader/FooterComponent` t\'évitent d\'écrire la logique conditionnelle à la main. `RefreshControl` donne le pull-to-refresh natif en trois lignes. Et `onEndReached` + `onEndReachedThreshold` font l\'infinite scroll — attention à le garder couplé à un état "page suivante" pour ne pas rafraîchir en boucle.' },
            { t: 'callout', kind: 'tip', h: 'Besoin de sections avec en-têtes ("Aujourd\'hui", "Cette semaine") ? `SectionList` avec `sections={[{ title, data }]}` et `renderSectionHeader` — même API que FlatList, plus `stickySectionHeadersEnabled` pour des en-têtes qui restent collés en haut, comme dans Contacts.' }
          ],
          errors: [
            { title: 'Oublier ou bricoler keyExtractor', lang: 'js', bad: '<FlatList data={articles} renderItem={rendreLigne} />\n// warning "Each child in a list should have a unique key"\n// ou pire : keyExtractor={(a, i) => i}  → états mélangés au filtre/tri', good: '<FlatList\n  data={articles}\n  keyExtractor={(a) => String(a.id)}    // id métier, stringifié\n  renderItem={rendreLigne} />', why: 'La clé est l\'identité de la ligne pour la fenêtre de rendu : index par défaut et liste qui bouge = contenu décalé, saisies effacées, animations sur les mauvais éléments. Un identifiant métier stable, converti en string.' },
            { title: 'State des cellules désynchronisé : oublier extraData', lang: 'js', bad: '<FlatList data={taches}\n  renderItem={({ item }) => <Ligne t={item} selectionnee={item.id === choix} />}\n  keyExtractor={(t) => t.id} />\n// `choix` change → certaines lignes ne se re-rendent pas (PureComponent interne)', good: '<FlatList\n  data={taches}\n  extraData={choix}                // déclenche le re-rendu quand extraData change\n  renderItem={({ item }) => <Ligne t={item} selectionnee={item.id === choix} />}\n  keyExtractor={(t) => t.id} />', why: 'FlatList optimise : si data inchangé, les cellules ne re-rendent pas — même si une valeur EXTERNE (ton état de sélection) a changé. extraData la met explicitement dans les dépendances de la liste.' }
          ],
          related: ['rn-listes-optimisation', 'rn-composants-base', 'rx-listes-cles', 'rn-etat']
        },

        {
          id: 'rn-listes-optimisation',
          title: 'Optimiser les longues listes (et SectionList)',
          icon: 'speed',
          level: 'Intermédiaire',
          tagline: 'Fenêtrage, getItemLayout, re-rendus maîtrisés : ce qui sépare une liste fluide d\'une liste qui rame.',
          intro: 'FlatList virtualise déjà, mais la virtualisation a un prix : elle mesure, recycle et re-rend en permanence. Quand les cellules deviennent complexes (images, ombres, sous-listes), quelques réglages changent tout — et une discipline de rendu (mémoïsation des cellules, données stables) évite 90 % des saccades avant même de toucher aux réglages fins.',
          blocks: [
            { t: 'h3', h: 'La discipline avant les réglages' },
            { t: 'code', lang: 'js', code:
'import React, { useCallback, memo } from "react";\nimport { FlatList } from "react-native";\n\n// 1) Cellule MÉMOÏSÉE : ne re-rend que si ses props changent\nconst LigneProduit = memo(function LigneProduit({ produit, onPress }) {\n  return (\n    <Pressable onPress={() => onPress(produit.id)}>\n      {/* rendu de la ligne */}\n    </Pressable>\n  );\n});\n\nexport default function Catalogue({ produits }) {\n  // 2) renderItem STABLE via useCallback (sinon recréée → re-rend total)\n  const voirDetail = useCallback((id) => {\n    console.log("détail", id);\n  }, []);\n\n  const rendreLigne = useCallback(\n    ({ item }) => <LigneProduit produit={item} onPress={voirDetail} />,\n    [voirDetail]\n  );\n\n  return <FlatList data={produits} renderItem={rendreLigne} keyExtractor={(p) => String(p.id)} />;\n}' },
            { t: 'h3', h: 'Les réglages fins de FlatList' },
            { t: 'table', head: ['Prop', 'Effet', 'Quand y toucher'], rows: [
              ['initialNumToRender', 'Cellules au 1er rendu (défaut 10)', 'Écran peu dense → réduire pour un premier paint plus rapide'],
              ['windowSize', 'Fenêtre rendue en hauteurs d\'écran (défaut 21)', 'Descendre (mémoire) sur cellules lourdes ; monter si blancs visibles au scroll rapide'],
              ['maxToRenderPerBatch', 'Cellules par lot de rendu', 'Scroll fluide sur entrée/milieu de gamme Android'],
              ['removeClippedSubviews', 'Détache les vues hors écran (Android surtout)', 'Fuites mémoire sur très longues listes ; attention aux zIndex/transforms'],
              ['getItemLayout', 'Hauteur FIXE déclarée : saute la mesure', 'Cellules à hauteur constante → scroll + scrollToIndex ultra rapides'],
              ['legacyImplementation', 'false obligatoire pour les perfs', 'Toujours le défaut modern']
            ] },
            { t: 'code', lang: 'js', label: 'Hauteur fixe : le cadeau getItemLayout', code:
'const HAUTEUR_LIGNE = 72;\n\n<FlatList\n  data={messages}\n  renderItem={rendreMessage}\n  keyExtractor={(m) => m.id}\n  getItemLayout={(data, index) => ({\n    length: HAUTEUR_LIGNE,\n    offset: HAUTEUR_LIGNE * index,\n    index\n  })}\n  initialNumToRender={12}\n  windowSize={9}\n  maxToRenderPerBatch={8}\n  removeClippedSubviews\n/>' },
            { t: 'p', h: '**SectionList** en bonus : même moteur, données en `sections={[{ title: "Aujourd\'hui", data: [...] }]}`, `renderSectionHeader` pour les en-têtes, `stickySectionHeadersEnabled` pour qu\'ils restent épinglés. Cas typique : transactions groupées par jour, contacts par initiale.' },
            { t: 'callout', kind: 'warn', h: 'Optimisation prématurée : mesure d\'abord (fiche Debugging — les outils de profiling existent), optimise ensuite. La hiérarchie des gains : cellule mémoïsée et renderItem stable → hauteur fixe/getItemLayout → réglages de fenêtre. Dans cet ordre, presque toujours.' }
          ],
          errors: [
            { title: 'renderItem inline et style inline partout : re-render en cascade', lang: 'js', bad: '<FlatList\n  data={produits}\n  renderItem={({ item }) => (\n    <View style={{ padding: 10, backgroundColor: "#fff" }}>  // objets recréés\n      <Text style={{ fontSize: 16 }}>{item.nom}</Text>\n    </View>\n  )}\n/>\n// chaque rendu de la liste recrée fonction + objets de style → tout re-rend', good: 'const LIGNE_STYLE = StyleSheet.create({ boite: { padding: 10, backgroundColor: "#fff" }, nom: { fontSize: 16 } });\nconst Ligne = memo(({ item }) => (\n  <View style={LIGNE_STYLE.boite}><Text style={LIGNE_STYLE.nom}>{item.nom}</Text></View>\n));\nconst rendreLigne = ({ item }) => <Ligne item={item} />;   // stable, mémorisée', why: 'FlatList recycle agressivement ; si chaque rendu produit de nouvelles fonctions et de nouveaux objets, la mémoïsation interne devient inutile et les GC fréquents font ramer le scroll. Stabilité des références = fluidité.' },
            { title: 'scrollToIndex sans getItemLayout : crash ou scroll aléatoire', lang: 'js', bad: 'flatRef.current.scrollToIndex({ index: 40 });\n// "scrollToIndex should be used with getItemLayout…"\n// ou saut approximatif au milieu de nulle part', good: '<FlatList\n  getItemLayout={(d, i) => ({ length: H, offset: H * i, index: i })}\n  ref={flatRef}\n/>', why: 'Sauter à un index exige de connaître la position de chaque cellule ; sans getItemLayout, FlatList doit d\'abord mesurer — et peut échouer sur des hauteurs variables. Hauteur fixe + getItemLayout, ou scrollToEnd/Offset à la place.' }
          ],
          related: ['rn-flatlist', 'rn-etat', 'rx-performance', 'rn-debugging']
        }
      ]
    }
  ]
};
/*__SUITE_RN__*/
/* data-reactnative.js — suite (catégories 5 à 9) */
DEVDOCS.rn.categories.push(

    /* ======================================================
       5. REACT NAVIGATION
       ====================================================== */
    {
      id: 'navigation',
      name: 'React Navigation',
      icon: 'explore',
      fiches: [
        {
          id: 'rn-navigation-setup',
          title: 'React Navigation : pile d\'écrans',
          icon: 'explore',
          level: 'Intermédiaire',
          tagline: 'Pas de routeur officiel : NavigationContainer + Stack, et le modèle "pile" qui remplace les URLs.',
          intro: 'Une app mobile n\'a pas d\'URL : elle a une **pile d\'écrans**. Tu ouvres un détail → un écran s\'empile ; tu reviens → il se dépile. React Navigation est la bibliothèque de facto : `NavigationContainer` tient l\'état de navigation, les "navigators" (Stack, Tab, Drawer) organisent les écrans. Point clé à assimiler : contrairement à Vue Router ou React Router, on ne navigue pas vers un chemin, on **empile vers un nom d\'écran**.',
          blocks: [
            { t: 'h3', h: 'Installation (les dépendances natives comptent)' },
            { t: 'code', lang: 'bash', code:
'npm install @react-navigation/native @react-navigation/native-stack\n# dépendances natives obligatoires :\nnpx expo install react-native-screens react-native-safe-area-context\n# (gesture-handler et reanimated seront requis pour Drawer et les transitions riches)' },
            { t: 'h3', h: 'La pile en cinq lignes' },
            { t: 'code', lang: 'js', label: 'App.js', code:
'import { NavigationContainer } from "@react-navigation/native";\nimport { createNativeStackNavigator } from "@react-navigation/native-stack";\nimport Accueil from "./ecrans/Accueil";\nimport Details from "./ecrans/Details";\n\nconst Stack = createNativeStackNavigator();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator initialRouteName="Accueil"\n        screenOptions={{ headerStyle: { backgroundColor: "#0f5d75" }, headerTintColor: "#fff" }}>\n        <Stack.Screen name="Accueil" component={Accueil}\n          options={{ title: "Mes tâches" }} />\n        <Stack.Screen name="Details" component={Details}\n          options={({ route }) => ({ title: route.params.titre })} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}' },
            { t: 'p', h: 'Chaque écran enregistré reçoit automatiquement deux props : `navigation` (les ACTIONS : navigate, push, goBack, setOptions…) et `route` (la LECTURE : name, params). L\'en-tête (titre, flèche retour) est natif et gratuit — `options`/`screenOptions` le personnalisent, y compris dynamiquement via une fonction recevant `route`.' },
            { t: 'code', lang: 'js', label: 'Naviguer depuis un écran', code:
'function Accueil({ navigation }) {\n  return (\n    <Pressable onPress={() => navigation.navigate("Details", { id: 7, titre: "Acheter du gari" })}>\n      <Text>Voir le détail →</Text>\n    </Pressable>\n  );\n}\n\n// navigate vs push :\n//  navigate("Details") → si cet écran est déjà dans la pile, on y REVIENT\n//  push("Details")     → on EMPILE une nouvelle instance (fil de commentaires en cascade)\n// navigation.goBack() / navigation.popToTop() pour dépiler' },
            { t: 'callout', kind: 'info', h: 'Comparaison pour qui vient du web : Vue Router (`#/article/3`) mappe des URL sur des composants et gère l\'historique du navigateur ; le Stack navigator gère une pile d\'INSTANCES d\'écrans natives avec transitions natives (glissement iOS, élévation Android). Pas d\'URL par défaut — le deep linking existe, mais c\'est un ajout (fiche suivante).' }
          ],
          errors: [
            { title: 'Oublier les dépendances natives (screens / safe-area)', lang: 'js', bad: 'npm install @react-navigation/native @react-navigation/native-stack\n// …puis crash au démarrage :\n// "Unrecognized native module: RNScreens" / "RNCSafeAreaContext"', good: 'npx expo install react-native-screens react-native-safe-area-context\n# Versions alignées à ton SDK + pods/gradle liés automatiquement', why: 'Le cœur JS de React Navigation appelle des modules NATIFS (gestion des écrans, zones sûres). Sans eux, l\'import fonctionne et tout explose au premier rendu — l\'erreur la plus classique du premier jour.' },
            { title: 'Confondre navigate et push', lang: 'js', bad: 'navigation.push("Details", { id });\n// depuis une liste infinie de détails :\n// pile Details→Details→Details… le bouton retour devient un couloir sans fin', good: 'navigation.navigate("Details", { id });\n// navigate réutilise l\'instance existante de "Details" si elle est déjà\n// sur le sommet — push() se réserve aux vrais empilements intentionnels', why: 'push() empile À CHAQUE FOIS une nouvelle instance ; navigate() est idempotent au sommet de pile. Dans le doute, navigate — et push uniquement quand le modèle "encore un niveau de détail" est réellement voulu.' }
          ],
          related: ['rn-navigation-params', 'rn-navigation-avance', 'vue-router', 'rn-executer']
        },

        {
          id: 'rn-navigation-params',
          title: 'Passer des paramètres entre écrans',
          icon: 'swap_horiz',
          level: 'Intermédiaire',
          tagline: 'navigate + params, route.params, et la règle d\'or : sérialisable ou rien.',
          intro: 'L\'écran liste connaît l\'article ; l\'écran détail doit le recevoir. Le canal officiel : le second argument de `navigate("Details", { id: 42 })`, lu côté cible via `route.params`. Simple — à condition de respecter la règle d\'or : les params doivent rester **sérialisables** (JSON-like), car l\'état de navigation peut être persisté, restauré et deep-linké. Une fonction ou une classe dans les params casse ce contrat.',
          blocks: [
            { t: 'h3', h: 'Envoyer et lire' },
            { t: 'code', lang: 'js', code:
'// ÉCRAN SOURCE : deuxième argument = objet de paramètres\nnavigation.navigate("Details", { id: article.id, titre: article.nom });\n\n// ÉCRAN CIBLE : lecture via route (prop fournie par le Screen)\nfunction Details({ route, navigation }) {\n  const { id, titre } = route.params;   // destructuration classique\n\n  return (\n    <View>\n      <Text>Détail #{id} — {titre}</Text>\n      {/* modifier plus tard, ex. après édition : */}\n      <Button title="Renommer" onPress={() =>\n        navigation.setParams({ titre: "Gari premium" })\n      } />\n    </View>\n  );\n}' },
            { t: 'h3', h: '"Mais je dois passer une fonction / un objet riche !"' },
            { t: 'p', h: 'Trois portes de sortie, de la plus simple à la plus structurée. **1)** Passer un **identifiant** (`id`) et laisser la cible charger le reste (fiche Réseau). **2)** Remonter la donnée commune dans un **Contexte** ou un store (fiches État/Contexte) : la navigation ne transporte que des clés. **3)** Pour le retour d\'information (création/édition), `navigate("Liste", { refresh: true })` ou un événement — mais si tu en arrives là, c\'est souvent le signe que l\'état devrait vivre AU-DESSUS des deux écrans. Règle pratique : la navigation transporte des adresses, pas des colis.' },
            { t: 'h3', h: 'Le cas échéant : params optionnels & valeurs par défaut' },
            { t: 'code', lang: 'js', code:
'function Recherche({ route }) {\n  // params peut être UNDEFINED si l\'écran est ouvert sans arguments\n  const q = route.params?.q ?? "";      // chaînage optionnel + défaut\n  // …\n}\n\n// initialParams au niveau du Screen pour des défauts déclarés :\n<Stack.Screen name="Recherche" component={Recherche}\n  initialParams={{ q: "" }} />' },
            { t: 'callout', kind: 'tip', h: 'Deep linking : avec `linking={{ prefixes: ["monapp://"], config: { screens: { Details: "article/:id" } } }}`, l\'URL `monapp://article/42` ouvre directement Details avec `route.params.id === "42"`. C\'est pour ÇA que les params doivent être sérialisables — une URL ne transporte que du texte.' }
          ],
          errors: [
            { title: 'Passer une fonction dans les params', lang: 'js', bad: 'navigation.navigate("Editeur", {\n  article,                 // objet potentiellement énorme\n  onSave: (nouveau) => setArticle(nouveau)   // FONCTION → warning :\n  // "non-serializable values were found in the navigation state"\n});', good: '// 1) passer l\'id, charger le reste côté cible\nnavigation.navigate("Editeur", { id: article.id });\n// 2) l\'état partagé vit dans un Contexte/store (fiches suivantes) :\nconst { setArticle } = useTaches();   // depuis l\'éditeur, directement', why: 'L\'état de navigation doit pouvoir être sérialisé (persistance, deep link, restauration après kill). Fonctions et objets riches le cassent ; le warning n\'est pas décoratif : ton bouton retour restaurera un état incomplet.' },
            { title: 'Lire route.params.x sans défaut : crash silencieux', lang: 'js', bad: 'const { q } = route.params;      // q undefined si ouvert sans args\nq.toLowerCase();                    // TypeError : undefined.toLowerCase', good: 'const q = route.params?.q ?? "";\nrecherche(q.toLowerCase());', why: 'Un écran peut être ouvert depuis plusieurs chemins, y compris des deep links partiels. Traite chaque param comme optionnel, ou déclare initialParams — jamais l\'existence d\'un paramètre pour acquise.' }
          ],
          related: ['rn-navigation-setup', 'rn-navigation-avance', 'rn-etat', 'rn-contexte']
        },

        {
          id: 'rn-navigation-avance',
          title: 'Tabs, Drawer et navigation imbriquée',
          icon: 'account_tree',
          level: 'Avancé',
          tagline: 'Les patterns d\'apps réelles : onglets en bas, pile par-dessus, tiroir latéral — correctement emboîtés.',
          intro: 'Presque toute application réelle combine plusieurs navigateurs : des **onglets** principaux en bas (Accueil, Recherche, Profil), une **pile** au-dessus pour les détails (le détail couvre les onglets), parfois un **tiroir** latéral. La bonne question n\'est pas "quel navigateur ?" mais "qui contient qui ?" — l\'imbrication décide de ce qui reste visible pendant la navigation.',
          blocks: [
            { t: 'h3', h: 'L\'imbrication de référence' },
            { t: 'code', lang: 'js', code:
'const Stack = createNativeStackNavigator();\nconst Tab = createBottomTabNavigator();\n\n// 1) les onglets comme UN écran de la pile\nfunction Onglets() {\n  return (\n    <Tab.Navigator screenOptions={{ headerShown: false }}>\n      <Tab.Screen name="Accueil" component={Accueil}\n        options={{ tabBarIcon: ({ color, size }) => <Maison color={color} size={size} /> }} />\n      <Tab.Screen name="Recherche" component={Recherche}\n        options={{ tabBarIcon: ({ color, size }) => <Loupe color={color} size={size} /> }} />\n      <Tab.Screen name="Profil" component={Profil}\n        options={{ tabBarBadge: 3 }} />\n    </Tab.Navigator>\n  );\n}\n\n// 2) la pile englobe : le détail Passe PAR-DESSUS les onglets\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name="Onglets" component={Onglets} options={{ headerShown: false }} />\n        <Stack.Screen name="Details" component={Details} />\n        <Stack.Screen name="Reglages" component={Reglages}\n          options={{ presentation: "modal" }} />   {/* glisse du bas, façon iOS */}\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}' },
            { t: 'p', h: 'Lecture du pattern : `headerShown: false` sur les navigateurs internes évite le **double en-tête** (la pile externe ET les onglets afficheraient chacun le leur). `presentation: "modal"` change la transition — le réglage structurant "qu\'est-ce qui reste visible" se lit dans la hiérarchie : la pile externe couvre les onglets, les onglets se partagent l\'espace commun.' },
            { t: 'h3', h: 'Naviguer à travers les frontières' },
            { t: 'code', lang: 'js', code:
'import { useNavigation } from "@react-navigation/native";\n\n// Depuis un composant PROFOND (pas directement un Screen) :\n// la prop navigation n\'y arrive pas toute seule → le HOOK useNavigation\nfunction CarteProduit({ produit }) {\n  const navigation = useNavigation();\n  return (\n    <Pressable onPress={() =>\n      // navigateur PARENT ciblé explicitement :\n      navigation.getParent()?.navigate("Details", { id: produit.id })\n      // ou chemin imbriqué en une seule forme :\n      // navigation.navigate("Onglets", { screen: "Accueil", params: { screen: "SousEcran" } })\n    }>\n      <Text>{produit.nom}</Text>\n    </Pressable>\n  );\n}' },
            { t: 'code', lang: 'bash', label: 'Drawer : installation + dépendances', code:
'npm install @react-navigation/drawer\nnpx expo install react-native-gesture-handler react-native-reanimated\n# Drawer EXIGE gesture-handler + reanimated (gestes et transitions)\n# + import "react-native-gesture-handler" en tête du point d\'entrée (bare uniquement)' },
            { t: 'callout', kind: 'tip', h: 'tabBarBadge pour les compteurs (3 messages non lus), `tabBarActiveTintColor` pour l\'onglet actif, et n\'oublie pas : chaque onglet garde SA propre pile interne si tu lui en donnes une — l\'utilisateur revient à l\'onglet et retrouve son fil, exactement comme l\'app Messages native.' }
          ],
          errors: [
            { title: 'useNavigation dans un composant hors navigateur', lang: 'js', bad: '// CarteProduit rendue directement dans App, AVANT NavigationContainer :\nconst navigation = useNavigation();\n// → "couldn\'t find a navigation object" au premier rendu', good: '// 1) CarteProduit DANS un Screen : useNavigation() OK\n// 2) sinon, naviguer via une ref globale (cas rares : navigationRef.navigate("X"))', why: 'useNavigation lit le Contexte posé par NavigationContainer : hors de son arbre, il n\'y a littéralement rien à trouver. Vérifie d\'abord que le composant est bien rendu SOUS le container — avant de chercher une ref globale.' },
            { title: 'Double en-tête : la pile et les onglets affichent chacun la leur', lang: 'js', bad: '<Stack.Navigator>                       {/* header pile : "Onglets" */}\n  <Stack.Screen name="Onglets" component={Onglets} />\n  {/* + Tab.Navigator interne avec headerShown par défaut :\n      DEUX barres empilées, titre incohérent */}\n</Stack.Navigator>', good: '<Stack.Navigator>\n  <Stack.Screen name="Onglets" component={Onglets} options={{ headerShown: false }} />\n  {/* …et/ou screenOptions={{ headerShown: false }} sur le navigateur interne */\n   → UN SEUL en-tête, porté par le navigateur responsable de l\'écran courant */}\n</Stack.Navigator>', why: 'Chaque navigateur affiche SON header par défaut ; imbriqués, ils s\'empilent. Décide niveau par niveau QUI possède l\'en-tête (souvent : la pile externe pour les détails, aucun header au niveau des onglets), et éteins les autres explicitement.' }
          ],
          related: ['rn-navigation-setup', 'rn-navigation-params', 'rn-gestes', 'rn-plateforme']
        }
      ]
    },

    /* ======================================================
       6. GESTION DE L\'ÉTAT
       ====================================================== */
    {
      id: 'etat',
      name: 'Gestion de l\'état',
      icon: 'schema',
      fiches: [
        {
          id: 'rn-etat',
          title: 'useState et useReducer au pays du mobile',
          icon: 'schema',
          level: 'Intermédiaire',
          tagline: 'Mêmes hooks que sur le web — avec des pièges typiquement mobiles : listes, clavier, écrans empilés.',
          intro: 'Bonne nouvelle : `useState` et `useReducer` fonctionnent EXACTEMENT comme en React web (fiches State et Reducer du module React JS). Les pièges, eux, changent de décor : formulaires à dix champs sur petit écran (objet d\'état), callbacks figés dans les listes recyclées (closures), et une question qui n\'existe pas sur le web — comment partager l\'état entre écrans qui ne sont pas des composants frères ?',
          blocks: [
            { t: 'h3', h: 'Formulaire mobile : UN objet d\'état, un setter générique' },
            { t: 'code', lang: 'js', code:
'const [form, setForm] = useState({ nom: "", email: "", accepte: false });\n\n// setter générique par clé — toujours la forme fonctionnelle\nconst maj = (cle) => (valeur) =>\n  setForm((prev) => ({ ...prev, [cle]: valeur }));\n\n<TextInput value={form.nom} onChangeText={maj("nom")} />\n<TextInput value={form.email} onChangeText={maj("email")} />\n<Switch value={form.accepte} onValueChange={maj("accepte")} />' },
            { t: 'h3', h: 'useReducer quand l\'écran devient une machine' },
            { t: 'code', lang: 'js', code:
'function panierReducer(etat, action) {\n  switch (action.type) {\n    case "ajout":    return [...etat, action.article];\n    case "retrait":  return etat.filter((a) => a.id !== action.id);\n    case "vider":    return [];\n    default:         return etat;\n  }\n}\n\nconst [panier, dispatch] = useReducer(panierReducer, []);\ndispatch({ type: "ajout", article: produit });\n// logique centralisée, testable sans UI — même bénéfice que sur le web' },
            { t: 'h3', h: 'La question mobile : l\'état entre écrans' },
            { t: 'p', h: 'Sur le web, "remonter l\'état au parent commun" suffit — onglets et pages vivent dans le même arbre. En mobile à écrans empilés, le parent commun est souvent… le navigateur lui-même. Trois réponses par ordre de complexité : **1)** paramètres de navigation pour une clé (fiche Paramètres) ; **2)** remonter l\'état dans le composant qui déclare le navigateur (au-dessus de NavigationContainer) ; **3)** Contexte ou store (fiche suivante) dès que deux branches d\'écrans se le partagent. Ne solde pas le sujet avec des params : ils transportent des adresses, pas le magasin.' },
            { t: 'callout', kind: 'warn', h: 'Closure figée dans les listes : un `onPress` capturé dans une FlatList lit l\'état de l\'instant du rendu. Utilise la forme fonctionnelle `setX((prev) => …)` pour les mutations, ou `extraData` si l\'affichage de la cellule dépend d\'un état externe (fiche FlatList).' }
          ],
          errors: [
            { title: 'Muter l\'état objet sans spread', lang: 'js', bad: 'form.nom = nouveau;\nsetForm(form);          // même référence → PAS de re-rendu\n// l\'écran semble ignorer la saisie', good: 'setForm((prev) => ({ ...prev, nom: nouveau }));\n// nouvelle référence → React voit le changement et re-rend', why: 'React compare les références : muter en place laisse la même, donc "rien n\'a changé". Immutabilité systématique — le piège vient du web, il pique deux fois plus en mobile à cause des champs contrôlés.' },
            { title: 'Lire l\'état juste après setX pour enchaîner', lang: 'js', bad: 'setCompteur(compteur + 1);\nif (compteur >= 10) terminer();   // lit l\'ANCIENNE valeur\n// (accumule off-by-one qui ne se reproduit qu\'à la 10e vente…)', good: 'setCompteur((c) => {\n  const suivant = c + 1;\n  if (suivant >= 10) terminer();  // calcule ET décide sur la valeur à jour\n  return suivant;\n});', why: 'setX est une demande, pas une affectation synchrone : l\'état lu dans la foulée est l\'ancien. Toute suite logique se calcule dans le updater fonctionnel (ou dans un useEffect qui suit la variable).' }
          ],
          related: ['rx-state', 'rx-usereducer', 'rn-contexte', 'rn-flatlist', 'rn-navigation-params']
        },

        {
          id: 'rn-contexte',
          title: 'Context API : partager sans se passer d\'écrans',
          icon: 'mediation',
          level: 'Intermédiaire',
          tagline: 'Un tuyau à travers l\'arbre : thème, session utilisateur, préférences — sans prop drilling entre écrans.',
          intro: 'Le Contexte React (rappel dans le module React JS) résout exactement le problème mobile du moment : une donnée demandée à beaucoup d\'étages par des écrans qui ne se connaissent pas. Un Provider **au-dessus de NavigationContainer** (donc au-dessus de TOUTE l\'app) et chaque écran y accède avec un hook. Cas d\'école : la session (connecté ? utilisateur ?), le thème, la langue.',
          blocks: [
            { t: 'h3', h: 'Le pattern session, complet' },
            { t: 'code', lang: 'js', label: 'contextes/SessionContexte.js', code:
'import { createContext, useContext, useState, useMemo } from "react";\nimport AsyncStorage from "@react-native-async-storage/async-storage";\n\nconst SessionContexte = createContext(null);\n\nexport function SessionProvider({ children }) {\n  const [utilisateur, setUtilisateur] = useState(null);\n\n  // useMemo : évite de re-rendre tout l\'arbre à chaque rendu du provider\n  const valeur = useMemo(() => ({\n    utilisateur,\n    async connecter(u) {\n      setUtilisateur(u);\n      await AsyncStorage.setItem("session", JSON.stringify(u));  // fiche Stockage\n    },\n    async deconnecter() {\n      setUtilisateur(null);\n      await AsyncStorage.removeItem("session");\n    }\n  }), [utilisateur]);\n\n  return <SessionContexte.Provider value={valeur}>{children}</SessionContexte.Provider>;\n}\n\nexport const useSession = () => useContext(SessionContexte);' },
            { t: 'code', lang: 'js', label: 'App.js — au-dessus de tout', code:
'import { SessionProvider } from "./contextes/SessionContexte";\n\nexport default function App() {\n  return (\n    <SessionProvider>          {/* couvre TOUS les navigateurs et écrans */}\n      <NavigationContainer>\n        <Stack.Navigator>{/* … */}</Stack.Navigator>\n      </NavigationContainer>\n    </SessionProvider>\n  );\n}\n\n// Dans n\'importe quel écran, à n\'importe quelle profondeur :\nconst { utilisateur, deconnecter } = useSession();' },
            { t: 'h3', h: 'Contexte ou bibliothèque d\'état ?' },
            { t: 'table', head: ['Besoin', 'Contexte suffit ?'], rows: [
              ['Thème, langue, session (peu de mises à jour)', 'Oui, parfait'],
              ['Formulaire complexe isolé', 'Non : useState/useReducer local'],
              ['Cache de requêtes, invalidations', 'Non : TanStack Query (module dédié)'],
              ['État très mutable partagé (panier live, jeu)', 'Contexte + useReducer ; ou Zustand/Redux si ça explose'],
              ['Messages temps réel, haute fréquence', 'Non : store externe avec sélecteurs (Zustand, Redux)']
            ] },
            { t: 'callout', kind: 'tip', h: 'Un Contexte, un sujet. Un méga-contexte "AppContext" transportant session + panier + préférences re-rend tout l\'arbre au moindre changement ; trois petits contextes ciblés restent gratuits. Et si tu veux des sélecteurs fins ("re-rendre que si ce champ change"), c\'est le signe de passer à Zustand.' }
          ],
          errors: [
            { title: 'Provider dans un écran au lieu de la racine', lang: 'js', bad: 'function Accueil() {\n  return (\n    <SessionProvider>        // recréé à chaque visite d\'Accueil :\n      <ContenuAccueil />     // état "partagé"… perdu dès qu\'on navigue\n    </SessionProvider>\n  );\n}', good: 'export default function App() {\n  return (\n    <SessionProvider>            // racine, au-dessus de NavigationContainer :\n      <NavigationContainer>…</NavigationContainer>  // survit à toute navigation\n    </SessionProvider>\n  );\n}', why: 'Le Contexte porte son état dans le Provider : s\'il vit dans un écran, l\'état naît et meurt avec lui. Pour "partout dans l\'app", le Provider doit être PLUS HAUT que ce qui navigue : la racine.' },
            { title: 'Objet inline en value : re-render général gratuit', lang: 'js', bad: '<SessionContexte.Provider value={{ utilisateur, connecter, deconnecter }}>\n// nouvel objet à CHAQUE rendu du provider →\n// TOUS les consommateurs re-rendent, même si rien n\'a changé', good: 'const valeur = useMemo(() => ({ utilisateur, connecter, deconnecter }), [utilisateur]);\n<SessionContexte.Provider value={valeur}>', why: 'La propagation du Contexte se déclenche au CHANGEMENT DE RÉFÉRENCE de value : un objet inline recréé à chaque rendu la déclenche en permanence. useMemo stabilise la référence tant que les données ne bougent pas.' }
          ],
          related: ['rx-contexte', 'rn-etat', 'rn-asyncstorage', 'tq-concepts']
        }
      ]
    },

    /* ======================================================
       7. RÉSEAU & API
       ====================================================== */
    {
      id: 'reseau',
      name: 'Réseau & API',
      icon: 'cloud_download',
      fiches: [
        {
          id: 'rn-reseau',
          title: 'fetch, axios et états de chargement',
          icon: 'cloud_download',
          level: 'Intermédiaire',
          tagline: 'Le même fetch que sur le web, trois états à afficher — et deux pièges purement mobiles.',
          intro: 'fetch, axios, async/await : tout fonctionne comme sur le web (fiches fetch du module JS et useEffect du module React JS). La compétence mobile spécifique : représenter proprement les trois états (chargement / erreur / données) avec `ActivityIndicator` au lieu d\'un spinner web, annuler quand l\'écran se dépile, et connaître les deux pièges réseau qui n\'existent PAS sur le web — le blocage HTTP (iOS ATS) et le localhost du téléphone.',
          blocks: [
            { t: 'h3', h: 'Le squelette complet et propre' },
            { t: 'code', lang: 'js', code:
'import { useEffect, useState } from "react";\nimport { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";\n\nexport default function Utilisateurs() {\n  const [data, setData] = useState(null);\n  const [chargement, setChargement] = useState(true);\n  const [erreur, setErreur] = useState(null);\n\n  useEffect(() => {\n    const ctrl = new AbortController();\n    (async () => {\n      setChargement(true);\n      setErreur(null);\n      try {\n        const res = await fetch("https://api.exemple.bj/utilisateurs", { signal: ctrl.signal });\n        if (!res.ok) throw new Error("HTTP " + res.status);   // 404/500 ne rejettent pas !\n        setData(await res.json());\n      } catch (e) {\n        if (e.name !== "AbortError") setErreur(e.message);\n      } finally {\n        setChargement(false);\n      }\n    })();\n    return () => ctrl.abort();          // écran dépilé → requête annulée\n  }, []);\n\n  if (chargement) return <View style={st.centre}><ActivityIndicator size="large" color="#0f5d75" /></View>;\n  if (erreur) return <View style={st.centre}><Text>Échec : {erreur}</Text></View>;\n  return <FlatList data={data} keyExtractor={(u) => String(u.id)}\n    renderItem={({ item }) => <Text style={st.ligne}>{item.nom}</Text>} />;\n}\n\nconst st = StyleSheet.create({\n  centre: { flex: 1, alignItems: "center", justifyContent: "center" },\n  ligne: { padding: 16, fontSize: 16 }\n});' },
            { t: 'p', h: 'Trois éléments à remarquer. **`ActivityIndicator`** : le spinner natif (couleur/taille) qu\'on centre dans un conteneur `flex: 1` — c\'est l\'indicateur de chargement de l\'OS, pas une animation CSS. **L\'abandon propre** : `AbortController` annule la requête si l\'écran se dépile avant la réponse — pas de setState sur un composant mort. **Le triptyque d\'affichage** (chargement / erreur / données) en retours anticipés : chaque état est explicite, jamais un écran "presque vide".' },
            { t: 'h3', h: 'Les deux pièges purement mobiles' },
            { t: 'ul', items: [
              '**HTTP interdit** : iOS (ATS) refuse par défaut les URL en http:// — exige du HTTPS ou une exception déclarée (à éviter). Android récent fait de même (usesCleartextTraffic).',
              '**"localhost" vivant dans le téléphone** : `http://localhost:3000` appelé depuis l\'appareil désigne LE TÉLÉPHONE, pas ton PC. Utilise l\'adresse IP LAN du PC (`http://192.168.1.x:3000`) ou un tunnel. Sur l\'ÉMULATEUR Android seulement, l\'alias magic `10.0.2.2` pointe vers la machine hôte.'
            ] },
            { t: 'callout', kind: 'info', h: 'axios marche très bien en RN (intercepteurs pour les jetons, erreurs HTTP rejetées d\'office). Et pour le cache/déduplication/synchronisation, TanStack Query supporte React Native officiellement — les concepts du module TanStack s\'appliquent tels quels à Expo.' }
          ],
          errors: [
            { title: 'fetch en http:// qui "marche sur le web" et pas sur iPhone', lang: 'js', bad: 'const res = await fetch("http://api.exemple.bj/articles");\n// iOS : Network request failed (App Transport Security)\n// Android 9+ : pareil sans drapeau cleartext', good: 'const res = await fetch("https://api.exemple.bj/articles");\n// HTTPS partout, dev inclus (certificat auto-signé + tunnel Expo en dev)', why: 'Les deux OS exigent du chiffrement par défaut : une URL en clair est bloquée AVANT de partir. Le fix propre est HTTPS — les exceptions réseau sont des drapeaux à justifier à la review des stores.' },
            { title: 'Appeler localhost depuis un appareil réel', lang: 'js', bad: 'fetch("http://localhost:3000/api")\n// depuis le téléphone : délai d\'attente puis échec —\n// le "localhost" du téléphone est le téléphone lui-même', good: 'fetch("http://192.168.1.42:3000/api")       // IP LAN du PC (téléphone réel)\nfetch("http://10.0.2.2:3000/api")           // alias hôte (émulateur Android)', why: 'Chaque machine a SON localhost. L\'appareil réel et l\'émulateur ne voient pas ton PC sous ce nom-là — d\'où l\'IP du réseau local, qui suppose en bonus d\'écouter sur 0.0.0.0 côté serveur.' }
          ],
          related: ['js-fetch', 'js-asynchrone', 'rx-effets', 'tq-concepts', 'rn-debugging']
        }
      ]
    },

    /* ======================================================
       8. STOCKAGE LOCAL
       ====================================================== */
    {
      id: 'stockage',
      name: 'Stockage local',
      icon: 'save',
      fiches: [
        {
          id: 'rn-asyncstorage',
          title: 'AsyncStorage : préférences, jetons, cache léger',
          icon: 'save',
          level: 'Intermédiaire',
          tagline: 'Le localStorage du mobile : clé-valeur persistant, asynchrone, strings only — et ses limites de sécurité.',
          intro: 'Pas de `localStorage` en React Native, mais son cousin : **AsyncStorage** (`@react-native-async-storage/async-storage`), un petit magasin clé-valeur persistant entre les sessions. Trois différences avec le web à intégrer : c\'est **asynchrone** (promesses), il ne stocke que des **chaînes** (JSON pour tout le reste), et il n\'est **pas chiffré** — pour les secrets, on vise Expo SecureStore (trousseau iOS / keystore Android).',
          blocks: [
            { t: 'h3', h: 'Les quatre opérations' },
            { t: 'code', lang: 'js', code:
'import AsyncStorage from "@react-native-async-storage/async-storage";\n\n// écrire (chaîne uniquement → JSON pour objets)\nawait AsyncStorage.setItem("prefs_theme", "sombre");\nawait AsyncStorage.setItem("panier", JSON.stringify(panier));\n\n// lire (null si absent — toujours prévoir ce cas !)\nconst brut = await AsyncStorage.getItem("panier");\nconst panier = brut ? JSON.parse(brut) : [];\n\n// variantes multi (plus rapides que des appels en boucle)\nawait AsyncStorage.multiSet([["langue", "fr"], ["ville", "Cotonou"]]);\nconst paires = await AsyncStorage.multiGet(["langue", "ville"]);\n\n// supprimer / tout vider (debug !)\nawait AsyncStorage.removeItem("panier");\nawait AsyncStorage.clear();' },
            { t: 'h3', h: 'Le pattern d\'hydratation : charger avant d\'afficher' },
            { t: 'code', lang: 'js', code:
'function App() {\n  const [theme, setTheme] = useState(null);      // null = pas encore chargé\n\n  useEffect(() => {\n    (async () => {\n      const t = await AsyncStorage.getItem("prefs_theme");\n      setTheme(t ?? "clair");                    // défaut si première ouverture\n    })();\n  }, []);\n\n  // Persister à chaque changement RÉEL (après hydratation seulement)\n  useEffect(() => {\n    if (theme !== null) AsyncStorage.setItem("prefs_theme", theme);\n  }, [theme]);\n\n  if (theme === null) return null;               // ou un splash — pas de flash de contenu\n  return <MonApp theme={theme} />;\n}' },
            { t: 'p', h: 'Trois cas d\'usage canoniques : les **préférences** (thème, langue, taille de texte), le **jeton de session** (relu au démarrage pour sauter la connexion — fiche Contexte), et un **cache léger** (dernière réponse API affichée hors-ligne). Deux limites à connaître : pas de requêtes complexes (c\'est clé-valeur, pas une base — gros volumes → SQLite via expo-sqlite), et zéro chiffrement — un jeton sensible mérite le trousseau système.' },
            { t: 'code', lang: 'js', label: 'Les secrets : trousseau natif, pas AsyncStorage', code:
'import * as SecureStore from "expo-secure-store";\n\nawait SecureStore.setItemAsync("refresh_token", token);   // Keychain / Keystore chiffrés\nconst token = await SecureStore.getItemAsync("refresh_token");' },
            { t: 'callout', kind: 'warn', h: 'AsyncStorage survit à la fermeture de l\'app, PAS à sa désinstallation (Android permet en plus l\'effacement par l\'utilisateur via les réglages). Tout ce qui doit survivre à une réinstallation vit côté serveur.' }
          ],
          errors: [
            { title: 'Stocker un objet sans JSON.stringify', lang: 'js', bad: 'await AsyncStorage.setItem("profil", utilisateur);\n// stocke littéralement "[object Object]" :\n// au prochain lancement, JSON.parse échoue ou tu lis du texte inutile', good: 'await AsyncStorage.setItem("profil", JSON.stringify(utilisateur));\nconst profil = JSON.parse((await AsyncStorage.getItem("profil")) ?? "null");', why: 'AsyncStorage n\'accepte que des strings : l\'objet est converti implicitement en "[object Object]", irrécupérable. Sérialise TOUJOURS explicitement, et prévois la valeur par défaut au JSON.parse (chaîne null de secours ou test préalable).' },
            { title: 'Flash de contenu : écrire AVANT d\'avoir lu', lang: 'js', bad: 'const [theme, setTheme] = useState("clair");\nuseEffect(() => { AsyncStorage.setItem("prefs_theme", theme); }, [theme]);\nuseEffect(() => { AsyncStorage.getItem("prefs_theme").then(t => t && setTheme(t)); }, []);\n// premier rendu "clair" → ÉCRASE la préférence "sombre" avant même de l\'avoir lue', good: 'const [theme, setTheme] = useState(null);\n// n\'écrire qu\'après hydratation (if theme !== null), défaut appliqué à la LECTURE', why: 'L\'ordre des effets au montage n\'est pas une garantie de lecture terminée : si l\'écriture se déclenche avant la lecture, elle écrase la valeur persistée que tu cherchais. L\'état null "pas encore hydraté" est le verrou propre.' },
            { title: 'Confier des secrets à AsyncStorage', lang: 'js', bad: 'await AsyncStorage.setItem("refresh_token", token);\n// stockage non chiffré : lisible sur appareil rooté/jailbreaké,\n// et synchronisé en clair dans certains backups', good: 'import * as SecureStore from "expo-secure-store";\nawait SecureStore.setItemAsync("refresh_token", token);\n// API identique, sécurité native (Keychain iOS / Keystore Android)', why: 'AsyncStorage est un confort, pas un coffre : tout ce qui donne accès à un compte (tokens, clés) appartient au trousseau chiffré de l\'OS. Même usage, bon endroit.' }
          ],
          related: ['rn-contexte', 'rn-etat', 'rn-permissions', 'rn-reseau']
        }
      ]
    },

    /* ======================================================
       9. SPÉCIFIQUE PLATEFORME
       ====================================================== */
    {
      id: 'plateforme',
      name: 'Spécifique plateforme',
      icon: 'devices',
      fiches: [
        {
          id: 'rn-plateforme',
          title: 'Platform.OS, fichiers .ios/.android et zones sûres',
          icon: 'phone_iphone',
          level: 'Intermédiaire',
          tagline: 'Un code partagé ne veut pas dire des apps identiques : OS, fichiers par plateforme, status bar et safe areas.',
          intro: 'React Native promet 80 à 95 % de code partagé — pas 100 %. Le reste, ce sont les différences d\'OS que l\'utilisateur SENT : retour matériel Android, flèche iOS, ombres, barre de statut, encoche. L\'outillage pour ça : `Platform.OS`/`Platform.select`, les fichiers suffixés `.ios.js`/`.android.js` (résolus automatiquement), et les "safe areas" pour les écrans modernes à encoche.',
          blocks: [
            { t: 'h3', h: 'Les trois niveaux de spécificité' },
            { t: 'code', lang: 'js', code:
'import { Platform, StyleSheet, View, Text } from "react-native";\n\n// 1) CONDITION en ligne : petites variantes de comportement/valeurs\nconst marge = Platform.OS === "ios" ? 20 : 16;\n\n// 2) Platform.select : groupé et explicite\nconst styles = StyleSheet.create({\n  carte: {\n    borderRadius: 14,\n    ...Platform.select({\n      ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },\n      android: { elevation: 6 }          // l\'ombre Android = elevation (fiche Erreurs ci-dessous)\n    })\n  },\n  titre: {\n    fontFamily: Platform.select({ ios: "System", android: "Roboto", default: "System" })\n  }\n});\n\n// 3) FICHIER entier par plateforme : Bouton.ios.js / Bouton.android.js\n//    import Bouton from "./Bouton"  → Metro choisit le bon fichier automatiquement' },
            { t: 'p', h: 'La règle d\'escalade : une valeur? `Platform.OS` ailleurs `Platform.select`. Quelques lignes? `Platform.select`. Un composant entier qui diverge? Deux fichiers suffixés — Metro résout `import "./Bouton"` vers la version de la plateforme. Au-delà de deux fichiers quasi identiques, demande-toi si une prop "variante" ne suffisait pas : chaque duplication est un endroit où iOS et Android vont dériver séparément.' },
            { t: 'h3', h: 'Barre de statut et zones sûres' },
            { t: 'code', lang: 'js', code:
'import { StatusBar } from "react-native";\nimport { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";\n\n// StatusBar : contenu clair/foncé + fond (Android)\n<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />\n\n// SafeAreaView : évite encoche, Dynamic Island, barre de geste\n<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>\n  {/* contenu */}\n</SafeAreaView>\n\n// Version chirurgicale : les insets, appliqués là où ça compte\nfunction BarreFlottante() {\n  const insets = useSafeAreaInsets();\n  return <View style={{ position: "absolute", bottom: insets.bottom + 12, left: 16, right: 16 }} />;\n}' },
            { t: 'callout', kind: 'tip', h: 'Checklist "ça marche sur les deux" : ombre visible ET sur Android (elevation) ; rien sous l\'encoche ni sous la barre de geste (safe area) ; StatusBar lisible sur fond clair ET sombre ; test du bouton RETOUR matériel Android (BackHandler) ; une vraie police par plateforme ou la police système assumée.' }
          ],
          errors: [
            { title: 'L\'ombre qui n\'existe que sur iOS', lang: 'js', bad: 'carte: {\n  shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8\n  // iOS : belle ombre. Android : PLAT. Et sur iOS, sans backgroundColor,\n  // l\'ombre ne se voit pas non plus (l\'ombre du vide ne se voit pas)\n}', good: 'carte: {\n  backgroundColor: "#fff",          // requis pour que l\'ombre apparaisse\n  ...Platform.select({\n    ios: { shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8 },\n    android: { elevation: 4 }        // Android n\'a que ça\n  })\n}', why: 'Les ombres sont des API natives séparées : shadow* pour iOS, elevation pour Android — l\'un ne remplace jamais l\'autre. Et sans fond opaque, iOS n\'a rien sur quoi projeter. Plateforme.select CI-DESSUS est l\'idiome propre.' },
            { title: 'Contenu sous l\'encoche ou la barre de geste', lang: 'js', bad: '<View style={{ paddingTop: 40 }}>     {/* constante magique */}\n  <Text>Titre</Text>\n  {/* iPhone 15 Pro : titre sous la Dynamic Island.\n      Pixel : trop d\'espace. Tablette : jamais pareil. */}\n</View>', good: 'import { SafeAreaView } from "react-native-safe-area-context";\n<SafeAreaView style={{ flex: 1 }}>\n  <Text>Titre</Text>                {/* zones mesurées par l\'OS, tous appareils */}\n</SafeAreaView>', why: 'Les zones non sûres varient PAR APPAREIL (encoches, îles, geste) : aucune constante ne tient. Les primitives safe-area (ou useSafeAreaInsets pour une barre flottante) demandent la mesure au système — c\'est son travail, pas le tien.' }
          ],
          related: ['rn-styles', 'rn-executer', 'rn-permissions', 'rn-build']
        }
      ]
    }
);
/*__FIN_PART2_RN__*/
/* data-reactnative.js — suite (catégories 10 à 14) */
DEVDOCS.rn.categories.push(

    /* ======================================================
       10. GESTES & ANIMATIONS
       ====================================================== */
    {
      id: 'gestes-animations',
      name: 'Gestes & animations',
      icon: 'gesture',
      fiches: [
        {
          id: 'rn-animations',
          title: 'Animated : animer à 60 fps',
          icon: 'animation',
          level: 'Intermédiaire',
          tagline: 'Animated.Value, timing/spring, interpolate — et le useNativeDriver qui fait toute la différence.',
          intro: 'Pas de transitions CSS ici : l\'animation est DÉCLARATIVE aussi, mais pilotée par l\'API `Animated`. Le principe : une valeur animable (`Animated.Value`), une animation qui la fait évoluer (`timing`, `spring`), et des styles qui s\'y branchent (`interpolate` pour transformer une plage en une autre). La ligne la plus importante du code : `useNativeDriver: true` — l\'animation tourne alors côté natif, fluide même si ton JS est occupé.',
          blocks: [
            { t: 'h3', h: 'Le fondu d\'entrée, de bout en bout' },
            { t: 'code', lang: 'js', code:
'import { Animated, Easing, Pressable, Text, StyleSheet } from "react-native";\nimport { useRef, useEffect } from "react";\n\nexport default function CarteAnimee() {\n  // useRef ENROULE .current : valeur stable entre les rendus (sinon repart à zéro)\n  const opacite = useRef(new Animated.Value(0)).current;\n  const montee = useRef(new Animated.Value(24)).current;\n\n  useEffect(() => {\n    Animated.parallel([\n      Animated.timing(opacite, {\n        toValue: 1, duration: 350,\n        useNativeDriver: true            // ← la ligne qui change tout (ci-dessous)\n      }),\n      Animated.timing(montee, {\n        toValue: 0, duration: 350, easing: Easing.out(Easing.cubic),\n        useNativeDriver: true\n      })\n    ]).start();\n  }, []);\n\n  return (\n    <Animated.View style={[\n      styles.carte,\n      { opacity: opacite, transform: [{ translateY: montee }] }\n    ]}>\n      <Text>Carte qui entre en fondu + glissement.</Text>\n    </Animated.View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  carte: { backgroundColor: "#fff", borderRadius: 16, padding: 20 }\n});' },
            { t: 'h3', h: 'Spring, séquence, interpolation' },
            { t: 'code', lang: 'js', code:
'// spring : physique (rebond), plus naturel pour les micro-interactions\nAnimated.spring(echelle, {\n  toValue: 1,\n  friction: 6, tension: 120,\n  useNativeDriver: true\n}).start();\n\n// séquence / stagger : chorégraphies\nAnimated.stagger(80, [naissance, montee1, montee2]).start();\n\n// interpolate : un progrès 0→1 pilote PLUSIEURS propriétés\nconst rotation = progres.interpolate({\n  inputRange: [0, 1],\n  outputRange: ["0deg", "180deg"]\n});\nconst fond = progres.interpolate({\n  inputRange: [0, 1],\n  outputRange: ["#e7f5ff", "#0f5d75"]   // couleurs : driver JS seulement !\n});' },
            { t: 'p', h: '**useNativeDriver, la règle** : `true` envoie l\'animation au thread UI natif → 60 fps garantis, même si le JS freeze ; mais il est limité aux propriétés de **transform** (translate/scale/rotate) et **opacity**. Couleurs, largeurs, bordures : driver JS (`false`), potentiellement saccadé sous charge. Pour les animations complexes et gestes couplés, la norme moderne est **Reanimated** + **Gesture Handler** (mêmes idées, API plus déclarative, tout sur le thread UI).' },
            { t: 'callout', kind: 'tip', h: `Avant d'animer : demande-toi si un simple état pressé de Pressable ne suffit pas. La meilleure animation d'un bouton tient souvent en quatre lignes de style conditionnel (opacité + scale à 0.98).` }
          ],
          errors: [
            { title: 'Recréer l\'Animated.Value à chaque rendu', lang: 'js', bad: 'function Carte() {\n  const opacite = new Animated.Value(0);   // repart à 0 à CHAQUE rendu !\n  useEffect(() => { Animated.timing(opacite, …).start(); }, []);\n  // premier re-render externe → l\'animation saute', good: 'function Carte() {\n  const opacite = useRef(new Animated.Value(0)).current;   // stable entre rendus\n  useEffect(() => { Animated.timing(opacite, {\n    toValue: 1, useNativeDriver: true }).start(); }, []);', why: 'Une Animated.Value est une référence que l\'animation pilote dans le temps ; la recréer à chaque rendu coupe le lien au milieu du vol. useRef (ou useMemo) fige l\'identité — même réflexe que pour les objets mutables en React web (fiche useRef du module React).' },
            { title: 'useNativeDriver: true sur une couleur ou une largeur', lang: 'js', bad: 'Animated.timing(fondCouleur, {\n  toValue: 1, useNativeDriver: true }).start();\n// "backgroundColor cannot be used with the native driver" → warning / pas d\'effet', good: '// transform + opacity : useNativeDriver: true\n// couleur, width, borderRadius… : useNativeDriver: false\n// ou passer par Reanimated (tout sur le thread UI, API moderne)', why: 'Le driver natif ne sait pas interpoler les propriétés de layout/peinture — seulement transform et opacity. Animer une couleur exige le driver JS ; beaucoup d\'animations "lentes" viennent de ce mélange involontaire.' }
          ],
          related: ['rn-gestes', 'css-transitions-animations', 'rx-useref', 'rn-plateforme']
        },

        {
          id: 'rn-gestes',
          title: 'Pressable vs TouchableOpacity, et les vrais gestes',
          icon: 'swipe',
          level: 'Intermédiaire',
          tagline: 'Tap, appui long, ripple, hitSlop — et quand il faut sortir Gesture Handler.',
          intro: 'Le tactile est LE mode d\'interaction mobile : le composant tactile est donc un choix de design, pas un détail. `Pressable` (moderne) expose l\'état pressé, la zone élargie, le ripple Android et l\'appui long ; la famille `Touchable*` (legacy) existe encore partout dans le code ancien. Et quand le besoin devient glisser/déposer ou pinch, on sort l\'artillerie : `react-native-gesture-handler`.',
          blocks: [
            { t: 'h3', h: 'La fiche de choix en dix secondes' },
            { t: 'table', head: ['Besoin', 'Composant'], rows: [
              ['Bouton nu système, prototype 2 minutes', 'Button'],
              ['Tout bouton/carte réel·le d\'aujourd\'hui', '**Pressable** (style pressé, hitSlop, ripple)'],
              ['Code existant qui l\'utilise déjà', 'TouchableOpacity / TouchableHighlight (ne réécris pas sans gain)'],
              ['Glisser, balayer, pincer, drawer custom', 'Gesture Handler (+ Reanimated)'],
              ['Balayage de ligne dans FlatList', 'react-native-gesture-handler/Swipeable ou ReanimatedSwipeable']
            ] },
            { t: 'h3', h: 'Pressable au complet' },
            { t: 'code', lang: 'js', code:
'import { Pressable, Text, StyleSheet } from "react-native";\n\nfunction CartePressable({ onOuvrir, onOptions }) {\n  return (\n    <Pressable\n      onPress={onOuvrir}                         // tap\n      onLongPress={onOptions}                    // appui long (menu contextuel…)\n      delayLongPress={350}                       // délai avant l\'appui long\n      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}   // zone élargie\n      android_ripple={{ color: "#d7ecf5", borderless: false }}  // vague Android\n      style={({ pressed }) => [\n        styles.carte,\n        pressed && styles.cartePressee           // retour visuel iOS-like\n      ]}\n    >\n      <Text>Carte tactile complète</Text>\n    </Pressable>\n  );\n}\n\nconst styles = StyleSheet.create({\n  carte: { padding: 16, backgroundColor: "#fff", borderRadius: 16 },\n  cartePressee: { opacity: 0.85, transform: [{ scale: 0.98 }] }\n});' },
            { t: 'p', h: 'Deux accessibilités qui font la différence pro : **`hitSlop`** rend un petit bouton atteignable sans le grossir visuellement (l\'aire 44×44 minimale est une exigence iOS, 48dp Android) ; et l\'état **`pressed`** donne le feedback immédiat qui distingue une app native d\'une page web. Pas de `:hover` ici — le doigt ne survole rien, il appuie.' },
            { t: 'h3', h: 'Quand Pressable ne suffit plus' },
            { t: 'code', lang: 'bash', code:
'# gestes composés : pan, pinch, rotation, double-tap, swipe…\nnpx expo install react-native-gesture-handler react-native-reanimated\n\n# puis une Gesture.Pan() liée à une valeur Reanimated :\n# le DOIGT pilote la position directement sur le thread UI,\n# sans faire l\'aller-retour JS à chaque image (60 fps même sous charge)' },
            { t: 'callout', kind: 'tip', h: 'Les conflits de gestes (un scroll parent qui "vole" le glissement d\'un enfant) se résolvent au niveau des Gesture Handlers (activation/waitFor), pas avec des hacks de stopPropagation. Un swipe dans une FlatList = Swipeable prête à l\'emploi avant toute réinvention.' }
          ],
          errors: [
            { title: 'Zone tactile trop petite (bouton "chirurgien")', lang: 'js', bad: '<Pressable onPress={fermer}>\n  <Text style={{ fontSize: 12 }}>×</Text>    {/* cible ~14×14 : ratée 1 fois sur 3 */}\n</Pressable>', good: '<Pressable onPress={fermer} hitSlop={14} style={{ padding: 10 }}>\n  <Text style={{ fontSize: 12 }}>×</Text>\n</Pressable>\n// cible réelle ≥ 44 : exigence des guidelines + confort immédiat', why: 'Un doigt fait ~7-9 mm de large : les deux plateformes exigent 44-48 dp de zone tactile. hitSlop élargit sans changer le visuel — et le taux de taps manqués s\'effondre.' },
            { title: 'Tap accidentel sur les actions destructives (double tap, scroll fantôme)', lang: 'js', bad: '<Pressable onPress={supprimerTout}>\n  <Text>Supprimer</Text>\n</Pressable>\n// double-tap nerveux → double suppression ;\n// début de scroll interprété comme tap', good: '<Pressable\n  onPress={() => demanderConfirmation(supprimerTout)}\n  disabled={enCours}>\n  <Text>Supprimer</Text>\n</Pressable>\n// + gestes modernes : Swipeable impose un MOUVEMENT intentionnel', why: 'Le tap est le geste le moins discriminant : tout ce qui détruit irréversiblement doit exiger soit confirmation, soit un geste engageant (appui long, swipe), soit un disabled le temps de l\'action.' }
          ],
          related: ['rn-interactions', 'rn-animations', 'rn-plateforme', 'rn-flatlist']
        }
      ]
    },

    /* ======================================================
       11. PERMISSIONS & MODULES NATIFS
       ====================================================== */
    {
      id: 'permissions',
      name: 'Permissions & natif',
      icon: 'vpn_key',
      fiches: [
        {
          id: 'rn-permissions',
          title: 'Permissions (caméra, GPS) et modules natifs',
          icon: 'vpn_key',
          level: 'Intermédiaire',
          tagline: 'Demander au bon moment, gérer le refus avec grâce — et comprendre ce qu\'est un module natif.',
          intro: 'Un accès caméra ou GPS, ce n\'est pas un appel d\'API ordinaire : c\'est une **demande à l\'utilisateur**, avec un dialogue système qu\'on n\'affiche qu\'UNE fois — refusé, il ne se redemande pas, il faut envoyer aux réglages. Le pattern universel : vérifier l\'état → expliquer pourquoi → demander → dégrader avec élégance. Et derrière tout ça, le concept qui démystifie React Native : le **module natif**, du Swift/Kotlin qui expose des fonctions au JS.',
          blocks: [
            { t: 'h3', h: 'Le flux permission, en code (Expo)' },
            { t: 'code', lang: 'js', code:
'import * as Location from "expo-location";\nimport { Linking } from "react-native";\nimport { useState } from "react";\n\nasync function prendreMaPosition() {\n  // 1) vérifier l\'état actuel\n  const actuel = await Location.getForegroundPermissionsAsync();\n  let statut = actuel.status;\n\n  // 2) demander SI nécessaire (la boîte système ne s\'affiche qu\'au premier refus inconnu)\n  if (statut !== "granted") {\n    const reponse = await Location.requestForegroundPermissionsAsync();\n    statut = reponse.status;\n  }\n\n  // 3) refus définitif → proposer les RÉGLAGES (on ne peut PAS redemander)\n  if (statut !== "granted") {\n    // afficher un écran explicatif : "La carte a besoin de ta position"\n    // + bouton qui ouvre les réglages de l\'app :\n    // Linking.openSettings();\n    return null;\n  }\n\n  const position = await Location.getCurrentPositionAsync({});\n  return position.coords;   // { latitude, longitude, … }\n}' },
            { t: 'h3', h: 'Les règles d\'or de la demande' },
            { t: 'ul', items: [
              '**Demander au moment d\'usage**, pas au lancement : l\'utilisateur qui vient d\'ouvrir "Scanner un reçu" comprend la demande caméra ; celui qui démarre l\'app, non.',
              '**Expliquer AVANT le dialogue système** (un écran qui dit pourquoi) : le taux d\'acceptation grimpe, et le refus permanent chute.',
              'Préparer le **chemin dégradé** : sans GPS, saisir la ville à la main ; sans caméra, choisir depuis la galerie.',
              '**iOS et Android déclarent en plus côté natif** (messages d\'usage dans Info.plist / manifest) : Expo le fait via les config plugins des librairies concernées, c\'est inclus.'
            ] },
            { t: 'h3', h: 'Et le module natif, dans tout ça ?' },
            { t: 'p', h: 'Chaque API du téléphone (caméra, GPS, Bluetooth, trousseau…) vit côté natif : Swift/Kotlin. Un **module natif** est le morceau qui EXPOSE ces fonctions au JavaScript — Expo SDK est une collection de tels modules, testés et uniformisés. Besoin d\'un SDK propriétaire (scanner industriel, lecteur de carte) ? Tu écrirais le tien via l\'API Expo Modules (ou en bare/TurboModules) : du code par plateforme portant une interface commune au JS. C\'est aussi la réponse à "que se passe-t-il quand JS ne suffit pas ?" — la porte reste ouverte.' },
            { t: 'callout', kind: 'warn', h: 'Le simulateur ment souvent : fausse position GPS fixe, caméra inexistante (simulateur iOS), capteurs absentes. Toute fonctionnalité à permission se valide sur APPAREIL RÉEL avant d\'être déclarée finie.' }
          ],
          errors: [
            { title: 'Demander la permission au lancement de l\'app (oubli des permissions natives)', lang: 'js', bad: 'useEffect(() => {\n  Location.requestForegroundPermissionsAsync();   // splash, 2e seconde\n  Camera.requestCameraPermissionsAsync();         // au cas où ?\n  // refus immédiat → statuts "denied" DÉFINITIFS :\n  // la boîte ne se redemandera JAMAIS, seul openSettings() sauve\n}, []);', good: '// demander au MOMENT du besoin, après un écran d\'explication :\nconst ouvrirScanner = async () => {\n  const { status } = await Camera.requestCameraPermissionsAsync();\n  if (status === "granted") navigation.navigate("Scanner");\n  else afficherExplication("Le scan a besoin de la caméra", Linking.openSettings);\n};', why: 'Le dialogue système est à usage unique : un refus précipité devient un refus permanent, et la seule sortie est d\'envoyer l\'utilisateur dans ses réglages — parcours perdu d\'avance. Demander tard, dans le contexte, avec une explication, change tout.' },
            { title: 'Traiter "denied" comme "pas encore demandé"', lang: 'js', bad: 'if (statut !== "granted") {\n  await Location.requestForegroundPermissionsAsync();\n  // au 2e refus passé, la boîte ne s\'affiche PLUS :\n  // l\'app attend une réponse qui ne viendra jamais\n}', good: 'const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();\nif (status !== "granted" && canAskAgain) {\n  await Location.requestForegroundPermissionsAsync();\n} else if (status !== "granted") {\n  ouvrirEcranReglages();   // chemin de secours explicite\n}', why: 'Une fois refusée définitivement, request… est une coquille vide : pas de dialogue, statut inchangé. canAskAgain distingue "jamais demandé/révocable" de "refus verrouillé" — et seul le second cas exige l\'escalade vers les réglages.' }
          ],
          related: ['rn-plateforme', 'rn-expo-vs-bare', 'rn-reseau', 'rn-build']
        }
      ]
    },

    /* ======================================================
       12. FORMULAIRES MOBILES
       ====================================================== */
    {
      id: 'formulaires',
      name: 'Formulaires mobiles',
      icon: 'keyboard',
      fiches: [
        {
          id: 'rn-formulaires',
          title: 'Formulaires et le clavier qui mange l\'écran',
          icon: 'keyboard',
          level: 'Intermédiaire',
          tagline: 'KeyboardAvoidingView, dismiss, chaîne de champs : la vraie difficulté d\'un formulaire mobile, ce n\'est pas la validation.',
          intro: 'Un formulaire mobile se bat contre un adversaire que le web ne connaît pas : un **clavier logiciel** qui prend jusqu\'à la moitié de l\'écran — couvrant au passage le champ en cours, et le bouton d\'envoi avec. Les outils de survie forment un kit : `KeyboardAvoidingView` (repositionner), ScrollView bien réglée (fils seuls scrollables au clavier ouvert), `Keyboard.dismiss` (refermer), et `returnKeyType`/`onSubmitEditing` (naviguer champ à champ). La validation, elle, est la même logique que partout.',
          blocks: [
            { t: 'h3', h: 'Le squelette de survie (à recopier)' },
            { t: 'code', lang: 'js', code:
'import {\n  KeyboardAvoidingView, ScrollView, Platform, TextInput,\n  TouchableWithoutFeedback, Keyboard, Pressable, Text, StyleSheet\n} from "react-native";\nimport { useState, useRef } from "react";\n\nexport default function Inscription() {\n  const [form, setForm] = useState({ nom: "", email: "", mdp: "" });\n  const refEmail = useRef(null);\n  const refMdp = useRef(null);\n\n  const maj = (cle) => (v) => setForm((p) => ({ ...p, [cle]: v }));\n\n  return (\n    // 1) le wrapper magique : décale le contenu quand le clavier monte\n    <KeyboardAvoidingView\n      style={{ flex: 1 }}\n      behavior={Platform.OS === "ios" ? "padding" : "height"}\n      keyboardVerticalOffset={90}          // hauteur de ton header si présent !\n    >\n      {/* 2) tapoter hors des champs = refermer le clavier */}\n      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>\n        {/* 3) "handled" : les boutons restent tapables SANS fermer le clavier d\'abord */}\n        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={st.page}>\n          <TextInput style={st.champ} placeholder="Nom" value={form.nom}\n            onChangeText={maj("nom")} returnKeyType="next"\n            onSubmitEditing={() => refEmail.current.focus()} blurOnSubmit={false} />\n          <TextInput ref={refEmail} style={st.champ} placeholder="E-mail" value={form.email}\n            onChangeText={maj("email")} keyboardType="email-address" autoCapitalize="none"\n            returnKeyType="next" onSubmitEditing={() => refMdp.current.focus()} blurOnSubmit={false} />\n          <TextInput ref={refMdp} style={st.champ} placeholder="Mot de passe" value={form.mdp}\n            onChangeText={maj("mdp")} secureTextEntry returnKeyType="done"\n            onSubmitEditing={envoyer} />\n\n          <Pressable onPress={envoyer} style={st.bouton}>\n            <Text style={st.boutonTexte}>Créer le compte</Text>\n          </Pressable>\n        </ScrollView>\n      </TouchableWithoutFeedback>\n    </KeyboardAvoidingView>\n  );\n}\n\nconst st = StyleSheet.create({\n  page: { padding: 20, gap: 12 },\n  champ: { borderWidth: 1, borderColor: "#d3dae3", borderRadius: 12, padding: 12, fontSize: 16 },\n  bouton: { backgroundColor: "#0f5d75", borderRadius: 14, padding: 14, alignItems: "center" },\n  boutonTexte: { color: "#fff", fontWeight: "700" }\n});' },
            { t: 'p', h: 'Lecture des trois couches. **`KeyboardAvoidingView`** : `behavior="padding"` (iOS) / `"height"` (Android) + l\'`offset` de ton en-tête — oublier l\'offset décale le tout sous la barre de navigation. **`keyboardShouldPersistTaps="handled"`** : le réglage le plus oublié — sans lui, le premier tap sur le bouton ferme le clavier au lieu de cliquer ; l\'utilisateur doit taper deux fois. **La chaîne `returnKeyType="next"` + refs** : transformer le bouton retour du clavier en navigation champ à champ, c\'est ce qui fait "app pro" vs "page".' },
            { t: 'h3', h: 'Validation : mêmes recettes qu\'ailleurs' },
            { t: 'p', h: 'Le fond ne change pas : état contrôlé (fiche État), erreurs calculées, affichage au blur/submit (pattern de la fiche Validation du module Vue — même philosophie, composants différents). Deux touches mobiles : afficher l\'erreur SOUS le champ sans pousser le bouton hors zone (petites hauteurs d\'écran), et éteindre le clavier à la soumission (`Keyboard.dismiss()`) pour laisser la place au spinner.' },
            { t: 'callout', kind: 'tip', h: 'Teste TOUJOURS au clavier OUVERT, sur un PETIT appareil (iPhone SE, petit Android) : c\'est là que "ça passe sur mon écran" devient "le bouton est sous le clavier".' }
          ],
          errors: [
            { title: 'Le clavier masque le champ en cours (oublier KeyboardAvoidingView)', lang: 'js', bad: '<View style={{ flex: 1 }}>\n  <TextInput placeholder="Code promo" />\n  {/* champ bas de l\'écran : le clavier le couvre,\n      l\'utilisateur tape à l\'aveugle */}\n</View>', good: '<KeyboardAvoidingView\n  behavior={Platform.OS === "ios" ? "padding" : "height"}\n  keyboardVerticalOffset={90}>\n  <ScrollView keyboardShouldPersistTaps="handled">\n    <TextInput placeholder="Code promo" />\n  </ScrollView>\n</KeyboardAvoidingView>', why: 'Le clavier logiciel n\'est pas une superposition magique bien gérée : à toi de repositionner. KAV + ScrollView + offset du header est le trio par défaut de TOUT écran avec saisie.' },
            { title: 'Premier tap "mangé" par la fermeture du clavier', lang: 'js', bad: '<ScrollView>   {/* keyboardShouldPersistTaps par défaut : "never" */}\n  <TextInput />\n  <Pressable onPress={envoyer}><Text>Envoyer</Text></Pressable>\n  {/* tap sur Envoyer → ferme le clavier ; il faut taper une 2e fois */}\n</ScrollView>', good: '<ScrollView keyboardShouldPersistTaps="handled">\n  {/* le bouton reçoit le tap, le clavier reste ou se ferme intelligemment */}\n  <TextInput />\n  <Pressable onPress={envoyer}><Text>Envoyer</Text></Pressable>\n</ScrollView>', why: 'Par défaut, ScrollView consomme le premier tap pour rejeter le clavier : l\'utilisateur croit que le bouton est cassé. "handled" transmet le tap aux enfants interactifs tout en gardant le rejet normal ailleurs.' },
            { title: 'autoCapitalize et autoCorrect sur un e-mail', lang: 'js', bad: '<TextInput placeholder="E-mail" />\n// le clavier met "Awa@…" → serveur rejette, utilisateur ne comprend pas', good: '<TextInput\n  placeholder="E-mail"\n  keyboardType="email-address"\n  autoCapitalize="none"\n  autoCorrect={false}\n/>', why: 'Un e-mail est insensible à la casse théoriquement, mais les corrections/capitalisations automatiques sabotent la saisie. Pour e-mail, URL, mot de passe : autoCapitalize="none" + autoCorrect désactivé, systématiquement.' }
          ],
          related: ['rn-interactions', 'rn-etat', 'vue-validation', 'rn-plateforme']
        }
      ]
    },

    /* ======================================================
       13. DEBUGGING
       ====================================================== */
    {
      id: 'debugging',
      name: 'Debugging',
      icon: 'bug_report',
      fiches: [
        {
          id: 'rn-debugging',
          title: 'Déboguer : Metro, logs, DevTools et erreurs de build',
          icon: 'bug_report',
          level: 'Intermédiaire',
          tagline: 'LogBox, console, le nouveau React Native DevTools — et la méthode pour les "ça ne build plus" du vendredi soir.',
          intro: 'Le debugging mobile a ses instruments propres : **Metro** (terminal qui bunddle et affiche tes logs), **LogBox** (les cadres rouges d\'erreur fatale et jaunes d\'avertissement incrustés dans l\'app), et **React Native DevTools**, l\'outil unifié officiel qui a remplacé Flipper — si tu lis d\'anciens tutoriels qui proposent Flipper, tu sais pourquoi tu ne le trouves plus. Le tout complété par les classiques React DevTools pour l\'arbre des composants.',
          blocks: [
            { t: 'h3', h: 'Les instruments' },
            { t: 'ul', items: [
              '**Le terminal Metro** : tous tes `console.log/warn/error` y tombent — y compris ceux des requêtes et des erreurs JS non attrapées. C\'est ta console principale.',
              '**LogBox** : rouge = erreur fatale (stack cliquable qui ouvre l\'éditeur à la ligne), jaune = warning. Ne mets jamais `LogBox.ignoreAllLogs()` pour faire taire : corrige la cause.',
              '**React Native DevTools** (`j` dans Metro) : inspector de l\'arbre (comme l\'onglet Elements), profiler, console avec breakpoints Hermes. L\'inspecteur d\'ÉLÉMENTS qui manque tant au web mobile.',
              '**React DevTools** : l\'arbre des composants et leurs props/state — indispensable pour "qui re-rend quoi ?" (fiche Performance du module React).'
            ] },
            { t: 'h3', h: 'La trousse à outils des "ça ne marche plus"' },
            { t: 'code', lang: 'bash', code:
'# 1) le grand classique : cache Metro corrompu après npm install / renames\nnpx expo start -c\n\n# 2) "Unable to resolve module …"\n#    → 9 fois sur 10 : CASSE du chemin (Linux/CI CI-sensible : components ≠ Components)\n#    → ou redémarrage Metro oublié après création de fichiers\n\n# 3) mise à jour bizarre de packages :\nwatchman watch-del-all          # vide le cache de surveillance de fichiers\nrm -rf node_modules && npm install\nnpx pod-install                  # (iOS, projets avec prebuild)\n\n# 4) réseau qui échoue depuis l\'appareil :\n#    téléphone ≠ localhost → IP LAN (fiche Réseau), serveur en --host 0.0.0.0\n\n# 5) build Android qui rame/plante :\ncd android && ./gradlew clean     # projet bare / prebuild' },
            { t: 'h3', h: 'Méthode face à une erreur de build' },
            { t: 'ol', items: [
              'Lis la DERNIÈRE ligne du log d\'erreur natif (souvent la 1re erreur, bien avant le crash final).',
              'Reproduis en environnement simple : `expo start -c`, puis reteste sur appareil ET émulateur.',
              'Isole la cause : derniere dépendance ajoutée, dernier fichier renommé, dernier prebuild plutôt que "tout est cassé".',
              'Si ça buildait hier : `git bisect` ou retour à un commit sain + ré-installation complète.',
              'L\'erreur ne parle qu\'en natif (Kotlin/Swift) ? Cherche-la avec le nom du module natif concerné — c\'est presque toujours une version mal alignée (`npx expo-doctor` diagonse ça bien).'
            ] },
            { t: 'callout', kind: 'tip', h: 'Adopte `npx expo-doctor` : il vérifie l\'alignement des versions (SDK Expo, dépendances, Node) avant même tu demandes. En projets RN, 70 % des "bugs mystérieux" sont des versions désynchronisées — pas du code.' }
          ],
          errors: [
            { title: 'Ignorer les warnings jaunes "parce que ça marche"', lang: 'js', bad: 'LogBox.ignoreLogs(["Non-serializable values", "Each child"]);\n// ça "marche"… jusqu\'au crash en production que le warning annonçait', good: '// corriger la cause :\n// - key sur les listes\n// - params sérialisables en navigation\n// - useEffect sans fuite d\'abonnement', why: 'Jaune n\'est pas décoratif : ce sont les erreurs de demain averties gratuitement (fuites, clés, sérialisation). Celui qui les ignore découvre la cause en production.' },
            { title: 'Chercher localhost depuis un device, suite', lang: 'js', bad: 'const API = "http://localhost:8000";\n// ok sur émulateur iOS, cassé sur device réel + émulateur Android…\n// "mais ça marchait sur MON téléphone !"', good: 'const API = Platform.select({\n  android: "http://10.0.2.2:8000",        // émulateur Android → hôte\n  default: "http://192.168.1.42:8000"     // device réel → IP LAN\n});\n// mieux : variable d\'env Expo (EXPO_PUBLIC_API_URL) par environnement', why: 'Le device réel et l\'émulateur Android ont chacun leur propre vue du réseau : un seul "localhost" ne fonctionne jamais pour tout le monde. Alias par plateforme ou variable d\'environnement — et serveur bindé en 0.0.0.0.' },
            { title: 'Débugger les performances "à l\'œil"', lang: 'js', bad: '// "ça rame" → ajout de memo() partout dans le doute…\n// et le scroll reste saccadé sur le mid-range Android du client', good: '// mesurer d\'abord :\n// Profiler React DevTools → qui re-rend ?\n// Perf Monitor (dev menu) → FPS UI vs JS\n// FlatList tuning (fiche Listes) si c\'est une liste', why: 'Les janks RN ont des causes différentes (re-rendus JS, thread UI saturé par des images, GC). Optimiser au hasard coûte du temps et ne marche pas : le Profiler te dit quelle cause est la tienne.' }
          ],
          related: ['rn-executer', 'rn-reseau', 'rn-listes-optimisation', 'rx-performance']
        }
      ]
    },

    /* ======================================================
       14. BUILD & DÉPLOIEMENT
       ====================================================== */
    {
      id: 'build',
      name: 'Build & déploiement',
      icon: 'publish',
      fiches: [
        {
          id: 'rn-build',
          title: 'Générer un build iOS/Android (EAS ou manuel)',
          icon: 'publish',
          level: 'Avancé',
          tagline: 'Debug vs release, signatures, stores, mises à jour OTA : le cycle de vie d\'un binaire, pas d\'un site.',
          intro: 'Déployer une app mobile n\'a presque rien à voir avec pousser un site : on produit un **binaire signé** (AAB/APK pour Android, IPA pour iOS), on le soumet à une **boutique** qui le relit (heures à jours), et l\'utilisateur le télécharge — il n\'y a pas de "F5 au prochain déploiement". **EAS** (Expo Application Services) industrialise tout ça dans le cloud, y compris pour iOS sans Mac ; le build manuel reste possible en bare.' ,
          blocks: [
            { t: 'h3', h: 'Debug vs release, d\'abord' },
            { t: 'p', h: 'En debug, ton JS est servi par Metro avec tous les outils de dev (warnings, reload). En release, Hermes **pré-compile** ton JS en bytecode dans le binaire, Metro n\'existe pas, les warnings deviennent des crashs et les performances sont celles du vrai produit. Règle d\'hygiène : **teste en release avant chaque soumission** — `npx expo run:android --variant release` (ou un build EAS de preview). Le bug qui n\'existe qu\'en release est un classique macabre.' },
            { t: 'h3', h: 'Le pipeline EAS (le chemin court)' },
            { t: 'code', lang: 'bash', code:
'npm install -g eas-cli\neas login                     # compte Expo\neas build:configure         # génère eas.json (profils dev/preview/production)\n\n# Android : AAB (Play Store) ou APK (tests directs)\neas build --platform android --profile production\n\n# iOS : IPA (App Store) — SANS Mac, signature gérée par EAS\neas build --platform ios --profile production\n\n# Soumission aux stores :\neas submit --platform android\neas submit --platform ios' },
            { t: 'code', lang: 'json', label: 'eas.json — les profils de base', code:
'{\n  "build": {\n    "development": { "developmentClient": true, "distribution": "internal" },\n    "preview":     { "distribution": "internal", "android": { "buildType": "apk" } },\n    "production":  {}\n  }\n}' },
            { t: 'h3', h: 'Signatures et versions : ce qui bloque les stores' },
            { t: 'ul', items: [
              '**Android** : un keystore signe toutes les versions d\'une app — le perdre = impossible de METTRE À JOUR l\'app, point. EAS peut l\'héberger ; sauvegarde-le sinon.',
              '**iOS** : certificat + profil de provisionnement Apple (compte développeur payant) — EAS les génère et renouvelle automatiquement.',
              '**Versions** : Android exige un `versionCode` incrémental (entier) ; iOS un `CFBundleVersion`. Oublier le bump = rejet à l\'upload. `autoIncrement` dans eas.json le gère.',
              '**Review** : Google Play (heures) et App Store (1-2 jours, plus stricte) relisent chaque binaire — les permissions doivent être JUSTIFIÉES dans la fiche store (GPS, caméra… fiche Permissions).'
            ] },
            { t: 'h3', h: 'La super-arme du mobile : les mises à jour OTA' },
            { t: 'code', lang: 'bash', code:
'eas update:configure\neas update --branch production --message "Fix: crash écran panier"\n# → pousse LE JAVASCRIPT corrigé directement sur les appareils,\n#   sans nouvelle review store (le binaire signé reste inchangé)\n#   LIMITE : rien de natif ne doit changer (SDK, libs natives)' },
            { t: 'p', h: 'La différence fondamentale avec le web : le **temps de propagation**. Sur le web, chaque visiteur a la dernière version en F5 ; sur mobile, les appareils mettent à jour par vagues, certains jamais. Conséquence pro : ton API doit supporter d\'anciennes versions de l\'app encore en circulation — versionne-la, ou prépare des déprédications douces (forcer la mise à jour quand vraiment nécessaire).' },
            { t: 'callout', kind: 'tip', h: 'Cycle pragmatique : preview APK interne à l\'équipe (EAS preview) → tests → build production → soumission → et les patchs JS volants en OTA entre deux releases. Tu réduiras les releases critiques à celles qui changent du natif.' }
          ],
          errors: [
            { title: 'Lancer en prod avec un versionCode/version existant', lang: 'bash', bad: 'eas build --platform android --profile production\n# upload Play Console : "Version code 12 has already been used"\n# → bump manuel oublié à CHAQUE build', good: '# eas.json, dans le profil de production :\n{ "build": { "production": { "autoIncrement": true } } }\n# EAS incrémente à chaque build — plus de refus d\'upload', why: 'Les stores identifient chaque artefact par un NUMÉRO croissant (versionCode / CFBundleVersion), distinct de la version lisible (1.4.0). Un oubli = rejet immédiat : autoIncrement automatise ce numéro opaque.' },
            { title: 'Signer la production avec le debug.keystore', lang: 'bash', bad: './gradlew assembleRelease\n# signé avec le keystore de debug "pour tester"…\n# puis tenté en Play Store : rejeté.\n# PIRE : si jamais publié ainsi, TOUTES les futures MAJ exigent ce même\n# keystore — perdu, l\'app est figée.', good: 'eas credentials          # EAS génère/héberge le keystore de prod\n# ou créer un keystore dédié, SAUVEGARDÉ à deux endroits,\n# et ne jamais le commiter dans git', why: 'La signature est l\'identité de l\'app auprès des stores : impossible de la changer sans créer une "nouvelle" app (et perdre tous les utilisateurs). Traite le keystore de production comme une clé privée bancaire.' },
            { title: 'Tester uniquement en debug, publier, découvrir le crash en release', lang: 'js', bad: '// dev : console.log(image.data) dans un flatList…\n// release : log retiré par minifier → crash en cliquant "Partager"\n// (minification Hermes, timings différents, warnings devenus erreurs)', good: 'npx expo run:android --variant release\n# ou profil EAS "preview" en release,\n# et parcours complet de l\'app AVANT chaque build production', why: 'Release ≠ debug x 1 : minification, bytecode Hermes, absence de warnings, timings. Un chemin critique du produit doit toujours être validé en environnement release — c\'est ce que le store distribuera.' }
          ],
          related: ['rn-expo-vs-bare', 'rn-debugging', 'rn-plateforme', 'rn-permissions']
        }
      ]
    }
);
/*__FIN_RN__*/
