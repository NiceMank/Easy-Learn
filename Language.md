# Easy Learn — Langages du projet

**Easy Learn** couvre **17 langages, bibliothèques et frameworks**, organisés en trois familles. Chaque module propose des **fiches théoriques** (explications de professeur, exemples copiables, pièges) et **5 exercices pratiques** (2 Fondamentaux, 2 Intermédiaires, 1 Projet réel — le premier est gratuit).

**Totaux : 371 fiches · 85 exercices · 17 accents de couleur dédiés.**

### Front-end

| Langage | Rôle | Fiches | Exercices | Correction | Accent | Contenu |
|---|---|---|---|---|---|---|
| **HTML** | Balisage / structure | 9 | 5 | Tests auto dans le navigateur | `#ff6b00` | `js/data-html.js` |
| **CSS** | Styles & mise en page | 12 | 5 | Tests auto dans le navigateur | `#0a84ff` | `js/data-css.js` |
| **JavaScript** | Langage du navigateur | 13 | 5 | Tests auto dans le navigateur | `#d19a00` | `js/data-js.js` |
| **TypeScript** | JS typé | 25 | 5 | Auto-évaluation en local | `#3178C6` | `js/data-typescript.js` |
| **React JS** | Bibliothèque d'interfaces | 21 | 5 | Tests auto dans le navigateur | `#0797b8` | `js/data-react.js` |
| **Tailwind CSS** | Framework CSS utilitaire | 15 | 5 | Tests auto dans le navigateur | `#0891b2` | `js/data-tailwind.js` |
| **Vue.js** | Framework progressif | 29 | 5 | Tests auto dans le navigateur | `#2f9e6c` | `js/data-vue.js` |

### Back-end

| Langage | Rôle | Fiches | Exercices | Correction | Accent | Contenu |
|---|---|---|---|---|---|---|
| **PHP** | Langage serveur | 35 | 5 | Auto-évaluation en local | `#777BB4` | `js/data-php.js` |
| **Laravel** | Framework PHP | 18 | 5 | Auto-évaluation en local | `#ee3820` | `js/data-laravel.js` |
| **TanStack Query** | Gestion des données serveur | 14 | 5 | Auto-évaluation en local | `#e8364f` | `js/data-tanstack.js` |
| **Python** | Langage polyvalent | 18 | 5 | Auto-évaluation en local | `#306998` | `js/data-python.js` |
| **Flask** | Micro-framework Python | 17 | 5 | Auto-évaluation en local | `#3a3a3c` | `js/data-flask.js` |
| **Django** | Framework Python complet | 20 | 5 | Auto-évaluation en local | `#0c4b33` | `js/data-django.js` |
| **Node.js & Express** | JS côté serveur | 29 | 5 | Auto-évaluation en local | `#5FA04E` | `js/data-node.js` |

### Mobile & bas niveau

| Langage | Rôle | Fiches | Exercices | Correction | Accent | Contenu |
|---|---|---|---|---|---|---|
| **React Native** | Applications mobiles | 24 | 5 | Auto-évaluation en local | `#00a9ce` | `js/data-reactnative.js` |
| **Langage C** | Langage système | 30 | 5 | Auto-évaluation en local | `#00599C` | `js/data-c.js` |
| **Java** | Langage objet JVM | 42 | 5 | Auto-évaluation en local | `#ED8B00` | `js/data-java.js` |

## Comment ajouter un langage

1. Créer `js/data-<id>.js` (contenu des fiches : `window.DEVDOCS.<id> = { id, name, icon, tagline, heroTitle, categories }`).
2. Créer `js/exo-<id>.js` (5 exercices : `window.DEVDOCS_EXO.<id> = { module, list }`).
3. Déclarer les deux scripts dans `index.html` (avant `js/app.js`).
4. Ajouter la couleur `--c-<id>` + l'accent `body[data-lang="<id>"]` dans `css/main.css`, le dégradé d'icône `.ic-<id>`, et le point `.dot-<id>`.
5. Enregistrer l'id dans `LANGS` (`js/app.js`), `MODULE_ORDER` (`js/exo-app.js`, au bon groupe) et l'entrée de la barre latérale dans `index.html`.

_Fichier généré pour Easy Learn — 22 juillet 2026._
