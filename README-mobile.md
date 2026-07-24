# Easy Learn — Application Android (Documentation seule)

> Branche `mobile-apk` — version APK contenant uniquement les **371 fiches de documentation** (sans les exercices pratiques ni le système premium).

## Prérequis

- **Node.js** ≥ 18 (LTS recommandée)
- **npm** ≥ 9 (fourni avec Node)
- **Java JDK** ≥ 17 (ex. Eclipse Temurin)
- **Android Studio** (ou Android SDK + Gradle)
- Variable `ANDROID_HOME` configurée (ou `sdk.dir` dans `android/local.properties`)

## Structure

```
Easy-Learn/
├── index.html          # Page d'accueil (adaptée mobile)
├── css/
│   └── main.css        # Design system iOS + thème clair/sombre
├── js/
│   ├── app.js          # Routeur, recherche, favoris, historique, thème
│   ├── highlight.js    # Coloration syntaxique
│   └── data-*.js       # 17 modules de contenu (371 fiches)
├── www/                # Dossier servi par Capacitor (copie des fichiers web)
├── android/            # Projet Android généré par Capacitor
├── capacitor.config.json
├── package.json
└── README-mobile.md    # Ce fichier
```

## Ce qui est EXCLU de cette version

| Exclu | Raison |
|---|---|
| `css/exo.css` | Design du module Exercices (inutile sans les exos) |
| `js/premium.js` | Système de déverrouillage premium (simulation démo) |
| `js/exo-app.js` | Vues du module Exercices |
| `js/exo-runner.js` | Atelier DOM pour les exercices pratiques |
| `js/exo-*.js` (17 fichiers) | Contenu des 85 exercices |

## Commandes

```bash
# Installer les dépendances
npm install

# Synchroniser le contenu web vers le projet Android
npx cap sync

# Ouvrir dans Android Studio
npx cap open android

# Générer un APK de debug (depuis le dossier android/)
cd android && ./gradlew assembleDebug
# → APK dans android/app/build/outputs/apk/debug/

# Générer un APK de release (signé)
cd android && ./gradlew assembleRelease
# (nécessite un keystore configuré dans android/app/build.gradle)
```

## Synchronisation du contenu depuis `main`

Quand le contenu des fiches est mis à jour sur `main`, récupérer les changements :

```bash
# 1. Se placer sur mobile-apk
git checkout mobile-apk

# 2. Récupérer les fichiers de données depuis main
git checkout main -- js/data-*.js css/main.css js/highlight.js

# 3. Pour app.js : si main a des changements, les fusionner manuellement
#    (mobile-apk a retiré les références aux exercices — ne pas écraser)
git diff main -- js/app.js   # lire les différences
# Appliquer les changements pertinents sans réintroduire les refs exo

# 4. Reconstruire le dossier www/
rm -rf www/ && mkdir www
cp index.html www/
cp -r css www/ && cp -r js www/

# 5. Synchroniser Capacitor et reconstruire
npx cap sync
cd android && ./gradlew assembleDebug
```

## Mode hors-ligne

Le contenu (371 fiches) est **embarqué en JavaScript local** (`window.DEVDOCS`) — aucune dépendance réseau pour afficher les fiches.

**Icônes Material Symbols** : chargées depuis Google Fonts CDN au premier lancement, puis mises en cache par le WebView. Les lancements suivants fonctionnent hors-ligne. Pour un support 100% offline dès la première installation, il faudrait bundler le fichier de police (étape non incluse dans cette version initiale).

## Adaptations mobiles

- **Bouton retour Android** : géré via le plugin `@capacitor/app` → navigue dans l'historique au lieu de fermer l'app
- **Zones tactiles** : tous les éléments cliquables ≥ 44px (norme iOS/Android)
- **Safe areas** : `env(safe-area-inset-*)` pour les encoches et barres système
- **Recherche** : bouton dédié dans la tab bar (Ctrl+K retiré)
- **Viewport** : `viewport-fit=cover`, zoom autorisé jusqu'à 5×
