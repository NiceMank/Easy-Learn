/* ============================================================
   exo-rn.js — Exercices pratiques : React Native
   Validation : checklist d'auto-évaluation (projet Expo local : npx expo start).
   ============================================================ */
window.DEVDOCS_EXO = window.DEVDOCS_EXO || {};

window.DEVDOCS_EXO.rn = {
  module: 'rn',
  list: [
{
    "id": "exo-rn-compteur-ecran",
    "level": "fonda",
    "title": "Le compteur de sacs sur téléphone",
    "icon": "phone_iphone",
    "free": true,
    "minutes": 30,
    "kind": "checklist",
    "setup": "Installe Node 18+, puis `npx create-expo-app compteur-gari --template blank`, entre dans le dossier et `npx expo start`. Scanne le QR code avec Expo Go (Android) ou l'appareil photo (iPhone) — ou lance l'émulateur avec `a`.",
    "context": "Au dépôt de gari de Vêdoko, le magasinier compte les sacs qui entrent : +1 par sac, parfois -1 (sac percé remis au fournisseur), et un zéro de fin de journée. Premier vrai écran React Native : du state, du style et des boutons qui répondent au doigt.",
    "statement": "Tu vas construire un écran de comptage simple et soigné.\n\n1. Dans `App.js`, remplace le contenu par ta vue : un grand chiffre centré (le compte), son libellé « sacs de gari entrés », et trois boutons : « +1 », « −1 », « Remise à zéro ».\n2. Le compte vit dans `useState(0)`. Les boutons utilisent `<Pressable>` avec un `onPress` — et des styles qui changent à l'appui (`style={({pressed}) => pressed && styles.appuye}` ou un opacity). JAMAIS de modification directe du state (`compte++` interdit : `setCompte(compte + 1)`).\n3. Le bouton « −1 » est **désactivé** à zéro (props `disabled` + style qui le montre) : un stock de sacs ne descend pas sous zéro.\n4. Une ligne d'humeur en bas : « Dépôt vide » à 0, « Ça monte ! » entre 1 et 19, « Grosse journée : appelle le chauffeur » à partir de 20 — rendue **conditionnellement** à partir du seul compte (aucun second state).\n5. Styles : `StyleSheet.create`, fond crème, carte blanche arrondie (borderRadius 20) avec ombre (`shadowColor`/`shadowOpacity`/`elevation`), chiffre en 72 pt gras, boutons en pleine largeur avec coins 14, paddings généreux — flexbox vertical centré (`flex: 1, justifyContent: 'center'`).\n6. Teste le rechargement rapide : change une couleur, sauvegarde, l'écran se met à jour instantanément (Fast Refresh).\n\nCe qui est évalué : useState correctement utilisé (immutabilité), Pressable et son feedback, le rendu conditionnel dérivé, et les bases du StyleSheet (ombres, arrondis, flex). C'est le « Hello World » qui n'en a pas l'air : tout le vocabulaire y est.",
    "constraints": [
        "Un seul useState (le compte) : l'humeur est dérivée par calcul, pas stockée.",
        "Pressable (ou TouchableOpacity) avec retour visuel d'appui ; pas de Button natif moche.",
        "Aucune mutation directe du state (compte++ ou compte = … interdits).",
        "Le −1 ne peut pas passer sous zéro, et l'UI le montre (bouton grisé).",
        "Tous les styles passent par StyleSheet.create — rien en inline object recréé à chaque rendu."
    ],
    "checklist": [
        "L'écran affiche 0 au lancement, +1 incrémente, le chiffre est bien gros et centré.",
        "Appuyer sur −1 à 0 ne fait rien et le bouton apparaît désactivé.",
        "La remise à zéro ramène à « Dépôt vide ».",
        "Le message d'humeur change exactement aux seuils 1 et 20.",
        "L'appui sur un bouton se voit (couleur ou opacité), pas d'effet « mort ».",
        "La carte a une vraie ombre visible (elevation sur Android, shadow* sur iOS).",
        "Fast Refresh : une modification de style s'applique sans perdre le compte en cours (le state survit au rechargement).",
        "Aucun avertissement jaune dans Expo Go concernant les styles ou les hooks."
    ],
    "hints": [
        "Le squelette : `const [compte, setCompte] = useState(0);` puis `onPress={() => setCompte(c => c + 1)}` — la forme fonctionnelle `c => c + 1` évite les valeurs périmées si deux appuis se suivent très vite.",
        "Le bouton désactivé : `<Pressable disabled={compte === 0} onPress={…} style={({pressed}) => [styles.bouton, styles.moins, compte === 0 && styles.eteint, pressed && styles.appuye]}>…</Pressable>` — compose les styles dans un tableau, le dernier gagne.",
        "L'ombre croisée : iOS lit shadowColor/shadowOffset/shadowOpacity/shadowRadius ; Android lit `elevation: 6`. Mets les deux (et un fond non transparent, sinon l'ombre n'a rien à porter)."
    ],
    "solution": {
        "lang": "js",
        "label": "App.js — solution commentée",
        "code": "\nimport { useState } from 'react';\nimport { StyleSheet, Text, View, Pressable } from 'react-native';\n\nexport default function App() {\n  const [compte, setCompte] = useState(0);\n\n  // tout est DÉRIVÉ du compte : zéro state supplémentaire pour l'humeur\n  const humeur = compte === 0\n    ? 'Dépôt vide'\n    : compte < 20 ? 'Ça monte !' : 'Grosse journée : appelle le chauffeur';\n\n  return (\n    <View style={styles.ecran}>\n      <View style={styles.carte}>\n        <Text style={styles.chiffre}>{compte}</Text>\n        <Text style={styles.libelle}>sacs de gari entrés</Text>\n\n        <Pressable\n          style={({pressed}) => [styles.bouton, styles.plus, pressed && styles.appuye]}\n          onPress={() => setCompte(c => c + 1)}>\n          <Text style={styles.boutonTxt}>+1 sac</Text>\n        </Pressable>\n\n        <Pressable\n          disabled={compte === 0}\n          style={({pressed}) => [styles.bouton, styles.moins,\n                                 compte === 0 && styles.eteint, pressed && styles.appuye]}\n          onPress={() => setCompte(c => c - 1)}>\n          <Text style={styles.boutonTxt}>−1 sac (avarie)</Text>\n        </Pressable>\n\n        <Pressable style={[styles.bouton, styles.zero]} onPress={() => setCompte(0)}>\n          <Text style={styles.zeroTxt}>Remise à zéro</Text>\n        </Pressable>\n\n        <Text style={styles.humeur}>{humeur}</Text>\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  ecran: { flex: 1, justifyContent: 'center', backgroundColor: '#FBF6EC', padding: 24 },\n  carte: {\n    backgroundColor: '#fff', borderRadius: 20, padding: 28, alignItems: 'center',\n    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },\n    shadowOpacity: 0.08, shadowRadius: 16, elevation: 6,   // iOS + Android\n  },\n  chiffre: { fontSize: 72, fontWeight: '800', color: '#1C1B1F' },\n  libelle: { fontSize: 15, color: '#7A6E5C', marginBottom: 20 },\n  bouton: { alignSelf: 'stretch', paddingVertical: 15, borderRadius: 14,\n            alignItems: 'center', marginTop: 12 },\n  boutonTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },\n  plus: { backgroundColor: '#2E7D32' },\n  moins: { backgroundColor: '#C62828' },\n  zero: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#D8CDBB' },\n  zeroTxt: { color: '#7A6E5C', fontWeight: '600' },\n  appuye: { opacity: 0.75 },\n  eteint: { opacity: 0.4 },\n  humeur: { marginTop: 18, fontSize: 14, color: '#8A5A00', fontWeight: '600' },\n});\n",
        "explain": "Trois principes React Native fondent cet écran. Un : le state est la seule source de vérité — compte vit dans useState, tout le reste (humeur, états de boutons) se DÉRIVE à chaque rendu ; ajouter un state pour l'humeur serait une bombe à désynchronisation. Deux : Pressable avec fonction style rend le tactile honnête — un bouton qui ne répond pas visuellement à l'appui donne l'impression d'une appli gelée, surtout sur un écran mat en plein soleil du marché. Trois : StyleSheet.create n'est pas du vernis — il valide les styles à la création, évite de recréer des objets à chaque rendu et centralise le design. Et remember le duo d'ombres : shadow* pour iOS, elevation pour Android ; les deux oublient l'autre plateforme."
    },
    "criteria": [
        "Compteur fonctionnel avec −1 borné, remise à zéro, humeurs dérivées.",
        "Tactile soigné (feedback d'appui, désactivation visible) et styles centralisés.",
        "Fast Refresh compris et utilisé pendant le développement."
    ],
    "variants": [
        "Ajoute un bouton « +5 (une caisse) » et un total cumulé de la journée qui survit aux RAZ.",
        "Ajoute une vibration légère à chaque +1 (expo-haptics : Haptics.impactAsync).",
        "Défi : rends le compte persistant avec AsyncStorage (rechargé au démarrage)."
    ],
    "related": [
        "rn-demarrage",
        "rn-composants-base",
        "rn-interactions",
        "rn-styles",
        "rn-etat"
    ]
},
{
    "id": "exo-rn-liste-produits",
    "level": "fonda",
    "title": "Le catalogue en FlatList",
    "icon": "list",
    "minutes": 35,
    "kind": "checklist",
    "setup": "Reprends ton projet Expo (ou `npx create-expo-app catalogue --template blank`). Aucune librairie supplémentaire : FlatList est dans react-native.",
    "context": "Le grossiste en tissus de Dantokpa a 80 coupons à vendre. Une ScrollView avec 80 cartes ? Ton téléphone chauffe, la mémoire gonfle. FlatList, elle, ne rend que ce qui est visible — c'est le même geste que RecyclerView sur Android ou UITableView sur iOS : le mobile ne pardonne pas la scroll naïve.",
    "statement": "Tu vas afficher le catalogue dans une FlatList proprement configurée.\n\n1. Données : un tableau de 12 tissus `{ id: 'T01', nom, prixYard, metrage, couleur }` (codes hexadécimaux variés pour le liseré gauche de la carte).\n2. `<FlatList data={…} keyExtractor={item => item.id} renderItem={…} />` : chaque ligne est un composant `LigneTissu` externe à App (propre, réutilisable) : liseré couleur, nom en gras, prix au yard, métrage.\n3. Utilise les props qui font la différence : `ItemSeparatorComponent` (mince séparateur) plutôt qu'une borderBottom sur chaque carte ; `ListHeaderComponent` (titre « Coupons disponibles » + compte) et `ListEmptyComponent` (« Stock épuisé pour aujourd'hui ») — vérifie en passant data={[]}.\n4. **Rafraîchir** : `refreshing` + `onRefresh` (un état `chargement` true/false) qui simule un rechargement (setTimeout 800 ms) et mélange l'ordre du stock — c'est le geste « tirer pour rafraîchir » que toute Camerounaise attend sur son app liste.\n5. Soigne les clés : passe data dans un nouvel ordre au refresh et constate que les lignes se réorganisent proprement (keyExtractor stable) — puis casse exprès keyExtractor avec l'index et observe les états mélangés d'une ligne « favori ». Comprends pourquoi l'id métier est le seul bon choix.\n6. Bonus tactile : un appui long (`onLongPress`) sur une ligne alterne un petit badge « Favori » (state = Set d'ids favoris).\n\nCe qui est évalué : FlatList vs ScrollView (virtualisation), les vrais props de la liste (separator, header, empty, refresh), et l'idée capitale des clés stables. C'est l'écran que tu réécriras toute ta vie mobile.",
    "constraints": [
        "FlatList, jamais map dans ScrollView pour 80 lignes ; l'item est un composant dédié.",
        "keyExtractor sur l'id métier — jamais d'index (démonstration de la panne exigée).",
        "Séparateur via ItemSeparatorComponent ; état vide via ListEmptyComponent.",
        "Refresh contrôlé par un state explicite (refreshing={chargement} onRefresh={…}).",
        "Aucun style inline recréé par ligne inutilement ; StyleSheet et composition."
    ],
    "checklist": [
        "La liste défile fluidement les 12 coupons avec liseré coloré varié.",
        "Le séparateur fin s'affiche bien ENTRE les lignes (pas avant la première, pas après la dernière).",
        "data={[]} affiche le message d'état vide au lieu d'un écran blanc.",
        "Tirer vers le bas montre l'indicateur de rafraîchissement ~800 ms puis l'ordre change.",
        "Avec l'index comme clé + un favori posé, le refresh mélange le favori ; avec l'id, il suit son tissu : j'ai constaté la différence.",
        "Favori on/off par appui long sur chaque ligne, indépendamment des autres.",
        "Le header indique le nombre de coupons (« 12 coupons ») toujours exact.",
        "Aucun warning clés dupliquées dans la console."
    ],
    "hints": [
        "Le rendu : `renderItem={({ item }) => <LigneTissu tissu={item} favori={favoris.has(item.id)} onLongPress={() => basculer(item.id)} />}` — renderItem reçoit un objet {item, index} ; déstructure-le. Et LigneTissu vit HORS du render pour éviter la recréation.",
        "Le Set en state : `const [favoris, setFavoris] = useState(() => new Set());` puis bascule immuable : `setFavoris(av => { const s = new Set(av); s.has(id) ? s.delete(id) : s.add(id); return s; })` — modifier le Set existant ne re-renderait rien.",
        "Le refresh : `const [chargement, setChargement] = useState(false);` onRefresh : setChargement(true); setTimeout(() => { setDonnees(melange(donnees)); setChargement(false); }, 800). FlatList montre l'indicateur natif tant que refreshing est true."
    ],
    "solution": {
        "lang": "js",
        "label": "App.js + LigneTissu — solution commentée",
        "code": "\nimport { useState } from 'react';\nimport { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';\n\nconst STOCK = [\n  { id: 'T01', nom: 'Wax Super Gold', prixYard: 2500, metrage: 6, couleur: '#C62828' },\n  { id: 'T02', nom: 'Hollandis VLISCO', prixYard: 12000, metrage: 6, couleur: '#1565C0' },\n  { id: 'T03', nom: 'Boguilan', prixYard: 4000, metrage: 4.5, couleur: '#6D4C41' },\n  // … 9 autres coupons du stock …\n];\n\nfunction LigneTissu({ tissu, favori, onLongPress }) {\n  return (\n    <Pressable onLongPress={onLongPress} delayLongPress={350}\n      style={({pressed}) => [styles.ligne, pressed && { opacity: 0.85 }]}>\n      <View style={[styles.lisere, { backgroundColor: tissu.couleur }]} />\n      <View style={{ flex: 1 }}>\n        <Text style={styles.nom}>{tissu.nom} {favori ? '★' : ''}</Text>\n        <Text style={styles.sous}>{tissu.metrage} yards disponibles</Text>\n      </View>\n      <Text style={styles.prix}>{tissu.prixYard.toLocaleString('fr-FR')} F</Text>\n    </Pressable>\n  );\n}\n\nexport default function App() {\n  const [donnees, setDonnees] = useState(STOCK);\n  const [chargement, setChargement] = useState(false);\n  const [favoris, setFavoris] = useState(() => new Set());\n\n  const rafraichir = () => {\n    setChargement(true);\n    setTimeout(() => {\n      // tri pseudo-aléatoire pour simuler une nouvelle réponse serveur\n      setDonnees([...donnees].sort(() => Math.random() - 0.5));\n      setChargement(false);\n    }, 800);\n  };\n\n  const basculer = (id) => setFavoris((av) => {\n    const s = new Set(av);\n    s.has(id) ? s.delete(id) : s.add(id);\n    return s;                         // NOUVEL objet → re-render → la ligne suit SON id\n  });\n\n  return (\n    <FlatList\n      data={donnees}\n      keyExtractor={(t) => t.id}      // la clé métier, pas l'index : les états suivent l'objet\n      renderItem={({ item }) => (\n        <LigneTissu tissu={item} favori={favoris.has(item.id)}\n                    onLongPress={() => basculer(item.id)} />\n      )}\n      ItemSeparatorComponent={() => <View style={styles.sep} />}\n      ListHeaderComponent={\n        <Text style={styles.titre}>Coupons disponibles ({donnees.length})</Text>\n      }\n      ListEmptyComponent={\n        <Text style={styles.vide}>Stock épuisé pour aujourd'hui.</Text>\n      }\n      refreshing={chargement}\n      onRefresh={rafraichir}\n      contentContainerStyle={{ padding: 16 }}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  titre: { fontSize: 20, fontWeight: '800', marginBottom: 12, color: '#1C1B1F' },\n  ligne: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',\n           borderRadius: 14, padding: 14, gap: 12 },\n  lisere: { width: 6, alignSelf: 'stretch', borderRadius: 3 },\n  nom: { fontSize: 15, fontWeight: '700' },\n  sous: { fontSize: 12, color: '#8A8074', marginTop: 2 },\n  prix: { fontSize: 15, fontWeight: '800', color: '#8A5A00' },\n  sep: { height: 10 },\n  vide: { textAlign: 'center', marginTop: 60, color: '#8A8074', fontSize: 15 },\n});\n",
        "explain": "FlatList est ton amortisseur mémoire : elle ne crée les lignes qu'au moment où elles deviennent visibles — c'est pour cela que le catalogue peut passer à 800 coupons sans broncher, alors qu'une ScrollView les poserait tous d'un coup. Les props ItemSeparator/Header/Empty règlent proprement les cas « bizarres » (première, dernière, liste vide) qui produisent sinon des hacks de bordures. La leçon clés est la plus importante : avec l'id métier, React identifie chaque ligne — le favori suit son tissu quand tu re-tries ; avec l'index, il suit la POSITION et colle au mauvais article. Et le Set immuable : copier avant de modifier n'est pas une manie, c'est ce qui déclenche le re-render — sans nouvel objet, React croit que rien n'a changé."
    },
    "criteria": [
        "FlatList virtuée avec séparateur, header, état vide et pull-to-refresh fonctionnels.",
        "Clés stables démontrées (favori suivant l'id vs mélangé par l'index).",
        "Structure propre : item externe, state immuable, styles centralisés."
    ],
    "variants": [
        "Ajoute une recherche en haut qui filtre la liste (dérivation, pas de copie de state).",
        "Passe à deux colonnes avec numColumns={2} et adapte la carte.",
        "Défi : trie les favoris en haut via un useMemo combinant deux états."
    ],
    "related": [
        "rn-flatlist",
        "rn-listes-optimisation",
        "rn-composants-base",
        "rn-interactions",
        "rn-styles"
    ]
},
{
    "id": "exo-rn-navigation-boutique",
    "level": "inter",
    "title": "Boutique à deux écrans : liste → détail",
    "icon": "navigation",
    "minutes": 45,
    "kind": "checklist",
    "setup": "Projet `rn-boutique` (create-expo-app blank). Installe la navigation : `npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context`. Enveloppe App dans `<NavigationContainer>`.",
    "context": "La boutique de tissus passe au niveau supérieur : toucher un coupon ouvre sa fiche — photo couleur, prix total selon le métrage, bouton « Appeler le vendeur » (lien tel:) — avec retour fluide à la liste. C'est le motif liste → détail, le motif de navigation le plus universel du mobile.",
    "statement": "Tu vas mettre en place une native stack à deux écrans avec passage de paramètres.\n\n1. Crée le stack : `const Stack = createNativeStackNavigator()` avec deux écrans : `Catalogue` (la FlatList de l'exercice précédent, adaptée) et `FicheTissu`. Titre la barre de navigation (« Coupons du marché »), choisis une teinte d'en-tête cohérente avec le liseré (headerStyle, headerTintColor).\n2. Dans le catalogue, chaque ligne appelle `navigation.navigate('FicheTissu', { id: item.id })` — **on passe l'id, pas l'objet entier** (les objets non-sérialisables dans les params sont un avertissement officiel React Navigation ; l'id suffit).\n3. `FicheTissu` lit `route.params.id`, retrouve le tissu dans les données (même fichier partagé), et affiche : grand échantillon couleur, nom, prix au yard, métrage, **total** (prix × métrage), stock bas si metrage < 5.\n4. Mets à jour le titre de l'écran détail avec le nom du tissu : `navigation.setOptions({ title: tissu.nom })` dans un useLayoutEffect.\n5. Ajoute un bouton « Appeler » (`TouchableOpacity`) qui ouvre `Linking.openURL('tel:+22997001122')` — un vrai deep link téléphonique.\n6. Bonus bouton retour personnalisé : vérifie que le swipe-back iOS et le bouton matériel Android fonctionnent sans code (le stack natif les fournit) — et ajoute un bouton « retour » explicit dans le header uniquement si tu sais pourquoi (sinon laisse faire le système).\n\nCe qui est évalué : la structure NavigationContainer/Navigator/Screen, le passage de paramètres par id (et le pourquoi), setOptions pour le titre dynamique, et l'usage de Linking. La navigation paraît triviale jusqu'à ce qu'on passe des objets entiers et que tout se désynchronise — ton id-immo te vaccine.",
    "constraints": [
        "NavigationContainer enveloppe toute l'app ; screens définis avec name + component.",
        "navigate ne transporte QUE l'id (string/number sérialisable) ; la fiche résout l'id dans les données.",
        "Le titre du détail s'adapte au tissu via setOptions.",
        "Le retour (bouton système, swipe, verso matériel) fonctionne sans code spécifique.",
        "L'appel téléphonique passe par Linking.openURL avec le schéma tel:."
    ],
    "checklist": [
        "Toucher un coupon ouvre la fiche correspondante (id correct, pas le voisin).",
        "Le header du détail affiche le nom du tissu (pas « FicheTissu »).",
        "Le total affiché est exact : prix × métrage, formaté FCFA.",
        "« Stock bas » n'apparaît que sous 5 yards.",
        "Bouton Appeler : le composeur téléphonique s'ouvre sur émulateur comme sur device (testé tel:).",
        "Retour : bouton header iOS, swipe iOS, bouton Android — les trois reviennent à la liste avec sa position de scroll.",
        "Passer directement un objet tissu complet en params déclenche l'avertissement 'non-serializable values' : je l'ai vu et corrigé en revenant à l'id.",
        "Aucun écran absent : toutes les routes déclarées dans le Navigator."
    ],
    "hints": [
        "Le navigateur : `<Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#8A5A00' }, headerTintColor: '#fff' }}><Stack.Screen name=\"Catalogue\" component={Catalogue} /><Stack.Screen name=\"FicheTissu\" component={FicheTissu} /></Stack.Navigator>`.",
        "Le détail : `function FicheTissu({ route, navigation }) { const tissu = STOCK.find(t => t.id === route.params.id); useLayoutEffect(() => { navigation.setOptions({ title: tissu.nom }); }, [navigation, tissu]); … }`.",
        "Pourquoi l'id seul : les params de navigation doivent rester sérialisables pour que le deep-linking et la restauration d'état fonctionnent. Un objet complexe n'est pas garanti — et il se désynchronise : l'id est une référence vivante, l'objet est une photo périmée."
    ],
    "solution": {
        "lang": "js",
        "label": "App.js — solution commentée (deux écrans)",
        "code": "\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\n\nconst Stack = createNativeStackNavigator();\n\nfunction Catalogue({ navigation }) {\n  return (\n    <FlatList\n      data={STOCK}\n      keyExtractor={(t) => t.id}\n      renderItem={({ item }) => (\n        <Pressable onPress={() => navigation.navigate('FicheTissu', { id: item.id })}>\n          {/* la ligne passe UNIQUEMENT l'id : sérialisable, toujours à jour */}\n          <Text style={styles.nom}>{item.nom}</Text>\n          <Text style={styles.prix}>{item.prixYard.toLocaleString('fr-FR')} F / yard</Text>\n        </Pressable>\n      )}\n    />\n  );\n}\n\nfunction FicheTissu({ route, navigation }) {\n  const tissu = STOCK.find((t) => t.id === route.params.id);   // résolution de l'id\n\n  useLayoutEffect(() => {\n    navigation.setOptions({ title: tissu.nom });               // header à l'image du produit\n  }, [navigation, tissu]);\n\n  const total = tissu.prixYard * tissu.metrage;\n  return (\n    <ScrollView contentContainerStyle={{ padding: 20 }}>\n      <View style={[styles.echantillon, { backgroundColor: tissu.couleur }]} />\n      <Text style={styles.titreF}>{tissu.nom}</Text>\n      <Text style={styles.ligne}>Prix au yard : {tissu.prixYard.toLocaleString('fr-FR')} F</Text>\n      <Text style={styles.ligne}>Métrage disponible : {tissu.metrage} yards</Text>\n      {tissu.metrage < 5 && <Text style={styles.alerte}>Stock bas — pensez à commander.</Text>}\n      <Text style={styles.total}>Total : {total.toLocaleString('fr-FR')} F</Text>\n      <TouchableOpacity style={styles.appel}\n        onPress={() => Linking.openURL('tel:+22997001122')}>\n        <Text style={styles.appelTxt}>Appeler le vendeur</Text>\n      </TouchableOpacity>\n    </ScrollView>\n  );\n}\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator screenOptions={{\n        headerStyle: { backgroundColor: '#8A5A00' }, headerTintColor: '#fff',\n        headerTitleStyle: { fontWeight: '700' },\n      }}>\n        <Stack.Screen name=\"Catalogue\" component={Catalogue}\n                      options={{ title: 'Coupons du marché' }} />\n        <Stack.Screen name=\"FicheTissu\" component={FicheTissu} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n",
        "explain": "La règle d'architecture à emporter : les paramètres de navigation sont une ADRESSE, pas un colis. En passant l'id, la fiche reste en phase avec les données (si le stock change, la fiche le sait) et React Navigation peut sérialiser l'état pour la restauration ou le deep-linking ; en passant l'objet, tu transportes une photo périmée dès le départ. setOptions dans useLayoutEffect cadence le titre avant l'affichage (pas de flash « FicheTissu »). Note aussi ce que le stack te donne gratuitement : transitions natives, bouton retour iOS, swipe, bouton matériel Android — ne recode jamais ça à la main. Le Linking tel:, lui, transforme l'appli en outil de boutique : un client hésitant sur un métrage est à UN appui d'appeler le vendeur."
    },
    "criteria": [
        "Stack native à deux écrans, params par id, titre dynamique.",
        "Retour système fonctionnel sur les deux plateformes, sans code spécifique.",
        "Fiche complète avec total exact, alerte de stock et appel téléphonique."
    ],
    "variants": [
        "Ajoute un troisième écran « Panier » avec un badge dans le header (headerRight).",
        "Remplace le find par un prefetch : navigation.setParams force la remontée ? Non — plutôt : rends les données dynamiques (state au-dessus du Navigator via contexte).",
        "Défi : configure un deep link expo/linking pour ouvrir directement FicheTissu?id=T02."
    ],
    "related": [
        "rn-navigation-setup",
        "rn-navigation-params",
        "rn-navigation-avance",
        "rn-flatlist"
    ]
},
{
    "id": "exo-rn-formulaire-livraison",
    "level": "inter",
    "title": "Le bon de livraison qui se défend",
    "icon": "local_shipping",
    "minutes": 50,
    "kind": "checklist",
    "setup": "Reprends un projet Expo (blank). Rien à installer : TextInput, KeyboardAvoidingView et compagnie sont dans react-native.",
    "context": "Le dépôt de ciment de Gbodjè livre à domicile : adresse, téléphone pour le zémidjan, quantité, date souhaitée. Le bon de livraison papier se perd deux fois par semaine. Un formulaire mobile qui valide avant d'accepter — et qui ne laisse pas le clavier manger les champs — va sauver les livraisons du samedi.",
    "statement": "Tu vas construire un formulaire contrôlé complet, à l'épreuve du clavier mobile.\n\n1. Quatre champs contrôlés (useState par champ) : nom du client (Text), téléphone (`keyboardType=\"phone-pad\"`), quantité de sacs (`keyboardType=\"numeric\"`), adresse (multiline, `numberOfLines={3}`). Chaque TextInput a un label au-dessus et un placeholder clair.\n2. Validation à la soumission (ET visuel dès le blur des champs touchés) : nom ≥ 3 caractères ; téléphone = 8 chiffres (espaces retirés pour l'analyse) ; quantité entière entre 1 et 100 ; adresse ≥ 10 caractères. Les erreurs s'affichent en rouge sous chaque champ concerné, jamais en Alert.\n3. Le bouton « Établir le bon » est désactivé tant que le formulaire n'est pas valide — calcule sa validité par dérivation (une fonction `estValide()` sur les states, pas un state « valide » qui traînerait).\n4. À la soumission : écran de **récapitulatif** (remplace le formulaire conditionnellement) : toutes les valeurs mises en forme (téléphone reformaté « 97 00 11 22 », total estimé quantité × 5 500 F), avec boutons « Modifier » (retour au formulaire rempli) et « Confirmer » (message de confirmation + remise à zéro complète). PRG à la mobile.\n5. `KeyboardAvoidingView` (behavior padding sur iOS, height sur Android via Platform) entoure le formulaire dans une ScrollView avec `keyboardShouldPersistTaps=\"handled\"` pour pouvoir toucher le bouton sans fermer le clavier.\n6. Raffinement : `returnKeyType=\"next\"` qui passe au champ suivant (`ref` + `.focus()`), et « done » sur le dernier ; `blurOnSubmit={false}` sur les champs intermédiaires.\n\nCe qui est évalué : contrôlé vs non-contrôlé (ici contrôlé partout), les types de clavier adaptés au contenu, la gestion du clavier propre à mobile, la validation locale avec retour inline, et le récapitulatif avant confirmation — le réflexe qui a sauvé mille livraisons à la mauvaise adresse.",
    "constraints": [
        "Chaque champ est contrôlé (value + onChange) ; l'état est la seule source de vérité du formulaire.",
        "Validation dérivée : estValide() calculée, erreurs stockées uniquement après touche ou soumission.",
        "Claviers adaptés : phone-pad, numeric sur les bons champs ; next/done en returnKeyType.",
        "Clavier maîtrisé : KeyboardAvoidingView + keyboardShouldPersistTaps, le bouton reste atteignable.",
        "Récapitulatif obligatoire avant confirmation, avec possibilité de revenir sans perdre la saisie."
    ],
    "checklist": [
        "Si un champ est invalide, son message rouge apparaît (après blur ou soumission) sous le champ.",
        "Le bouton est grisé tant que le formulaire n'est pas valide, actif dès qu'il l'est.",
        "Le clavier numérique s'affiche pour téléphone et quantité, l'alphabétique pour le nom.",
        "Le champ adresse monte avec le clavier et reste visible pendant la saisie (iOS et Android).",
        "Soumettre affiche le récapitulatif avec téléphone « 97 00 11 22 » et total exact.",
        "« Modifier » ramène au formulaire avec toutes les valeurs intactes.",
        "« Confirmer » valide, affiche la confirmation et offre un nouveau bon vide.",
        "Aucun Alert.alert pour les erreurs de saisie — tout est inline."
    ],
    "hints": [
        "Le suivi des touches : `const [touches, setTouches] = useState({});` et chaque champ : `onBlur={() => setTouches(t => ({...t, nom: true}))}` — l'erreur s'affiche si `touches.nom && erreurs.nom`. À la soumission, marque tous les champs comme touchés.",
        "estValide : `const erreurs = valider({ nom, tel, quantite, adresse }); const valide = Object.keys(erreurs).length === 0;` — une fonction pure valider(valeurs) → erreurs sert ET au dérivé bouton ET à l'affichage, sans duplication.",
        "Le focus au suivant : `const refTel = useRef(null);` sur le champ nom `returnKeyType=\"next\" onSubmitEditing={() => refTel.current.focus()} blurOnSubmit={false}` — et `<TextInput ref={refTel} …>` . C'est deux lignes qui changent la vie d'une saisie à une main."
    ],
    "solution": {
        "lang": "js",
        "label": "BonLivraison.js — solution commentée (extraits clés)",
        "code": "\nfunction valider({ nom, tel, quantite, adresse }) {\n  const e = {};\n  if (nom.trim().length < 3) e.nom = 'Nom complet requis (3 lettres minimum).';\n  const t = tel.replace(/\\s/g, '');\n  if (!/^\\d{8}$/.test(t)) e.tel = 'Téléphone : 8 chiffres (ex. 97 00 11 22).';\n  const q = parseInt(quantite, 10);\n  if (!/^\\d+$/.test(quantite) || q < 1 || q > 100) e.quantite = 'Entre 1 et 100 sacs.';\n  if (adresse.trim().length < 10) e.adresse = 'Adresse précise requise (repère inclus).';\n  return e;\n}\n\nconst fmtTel = (t) => t.replace(/\\s/g, '').replace(/(\\d{2})(?=\\d)/g, '$1 ');\n\nexport default function BonLivraison() {\n  const [champs, setChamps] = useState({ nom: '', tel: '', quantite: '', adresse: '' });\n  const [touches, setTouches] = useState({});\n  const [phase, setPhase] = useState('form');   // 'form' | 'recap' | 'ok'\n\n  const set = (k) => (v) => setChamps((c) => ({ ...c, [k]: v }));\n  const toucher = (k) => () => setTouches((t) => ({ ...t, [k]: true }));\n  const erreurs = valider(champs);\n  const valide = Object.keys(erreurs).length === 0;\n  const total = parseInt(champs.quantite || '0', 10) * 5500;\n\n  const soumettre = () => {\n    setTouches({ nom: true, tel: true, quantite: true, adresse: true });\n    if (valide) setPhase('recap');\n  };\n\n  if (phase === 'recap') return (\n    <View style={styles.ecran}>\n      <Text style={styles.titre}>Bon de livraison</Text>\n      <Text>Client : {champs.nom}</Text>\n      <Text>Téléphone : {fmtTel(champs.tel)}</Text>\n      <Text>Quantité : {champs.quantite} sacs</Text>\n      <Text>Adresse : {champs.adresse}</Text>\n      <Text style={styles.total}>Total estimé : {total.toLocaleString('fr-FR')} F</Text>\n      <Button title=\"Modifier\" onPress={() => setPhase('form')} />\n      <Button title=\"Confirmer la livraison\" onPress={() => { setPhase('ok');\n        setChamps({ nom: '', tel: '', quantite: '', adresse: '' }); setTouches({}); }} />\n    </View>\n  );\n\n  return (\n    <KeyboardAvoidingView style={{ flex: 1 }}\n      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>\n      <ScrollView contentContainerStyle={styles.form}\n                  keyboardShouldPersistTaps=\"handled\">\n        <Text style={styles.label}>Nom du client</Text>\n        <TextInput style={styles.input} value={champs.nom} onChangeText={set('nom')}\n          onBlur={toucher('nom')} placeholder=\"Ex. Awa Mensah\" returnKeyType=\"next\" />\n        {touches.nom && erreurs.nom ? <Text style={styles.err}>{erreurs.nom}</Text> : null}\n\n        <Text style={styles.label}>Téléphone</Text>\n        <TextInput style={styles.input} value={champs.tel} onChangeText={set('tel')}\n          onBlur={toucher('tel')} placeholder=\"97 00 11 22\" keyboardType=\"phone-pad\"\n          returnKeyType=\"next\" />\n        {touches.tel && erreurs.tel ? <Text style={styles.err}>{erreurs.tel}</Text> : null}\n\n        {/* quantite + adresse sur le même moule (numeric / multiline) */}\n\n        <Pressable disabled={!valide} onPress={soumettre}\n          style={[styles.bouton, !valide && styles.invalide]}>\n          <Text style={styles.boutonTxt}>Établir le bon</Text>\n        </Pressable>\n      </ScrollView>\n    </KeyboardAvoidingView>\n  );\n}\n",
        "explain": "Mobile change le contrat des formulaires : le clavier couvre la moitié de l'écran, le doigt est moins précis que la souris, et la connexion tombe au fond du camion. D'où les contrôles de cet exercice : les claviers spécialisés réduisent les fautes de frappe à la source ; les erreurs inline (jamais d'Alert modale — elle interrompt et disparaît) guident au moment opportun (blur) ; le bouton désactivé rend impossible la soumission invalide, et sa désactivation est DÉRIVÉE des mêmes règles que les messages — une fonction valider() pure, deux usages, zéro désaccord. Le récapitulatif avant confirmation est une assurance mobile : on livre du ciment à 120 kg le sac, pas des lettres. Et KeyboardAvoidingView + keyboardShouldPersistTaps : sans eux, le bouton « Établir » se cache derrière le clavier et l'utilisatrice croit l'appli cassée."
    },
    "criteria": [
        "Formulaire contrôlé, validations inline fiables, bouton dérivé, récapitulatif avant confirmation.",
        "Clavier parfaitement géré (types, next/done, évitement) sur les deux plateformes.",
        "PRG mobile : confirmation nettoie, modifier conserve la saisie."
    ],
    "variants": [
        "Ajoute un sélecteur de quartier (pseudo-picker maison : Pressable + options) avec validation requise.",
        "Ajoute un résumé visuel persistant : les 3 derniers bons confirmés affichés sous le formulaire (state sans persistance).",
        "Défi : sauvegarde les bons dans AsyncStorage et liste-les dans un écran séparé (prépare le projet)."
    ],
    "related": [
        "rn-formulaires",
        "rn-interactions",
        "rn-composants-base",
        "rn-plateforme",
        "rn-etat"
    ]
},
{
    "id": "exo-rn-app-marche",
    "level": "projet",
    "title": "L'app du marché de nuit : panier, onglets et mémoire",
    "icon": "storefront",
    "minutes": 140,
    "kind": "checklist",
    "setup": "Projet `rn-marche-nuit` (create-expo-app blank) + `npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context`.",
    "context": "Le marché de nuit de Dantokpa tourne de 18 h à 2 h : les restauratrices commandent torchons, charbon, citronnelle depuis l'allée, et récupèrent au verso. L'application finale du module : catalogue à onglets, panier qui survit à la fermeture du téléphone, totaux exacts, et ce sentiment qu'une vraie petite appli utile tient dans ton téléphone.",
    "statement": "Tu vas construire l'application complète à trois onglets, état partagé et persistance.\n\n1. **Structure.** Bottom tabs : `Marché` (catalogue), `Panier` (avec badge du nombre d'articles sur l'icône), `Commandes` (historique local). Le catalogue ouvre lui-même une stack : fiche produit en push au-dessus des tabs (imbrication tab → stack : chaque onglet a son propre stack).\n2. **État partagé.** Un `PanierContext` (createContext + Provider au sommet) exposant `lignes` (objet id → quantité), `ajouter`, `retirer`, `changerQuantite`, `vider`, `total` (dérivé) et `nbArticles` (dérivé). AUCUN état dupliqué par écran : tout passe par le contexte.\n3. **Persistance.** Le panier se sauvegarde dans AsyncStorage à chaque changement (useEffect sur lignes, stringify) et se recharge au démarrage (un state `pret` qui affiche un splash tant que la lecture n'est pas faite). JSON parfaitement gérés : valeur absente ou corrompue → panier vide propre, jamais de crash.\n4. **Catalogue.** 12 produits du marché de nuit (torchon biface, sac charbon 5kg, citronnelle botte, gombo, piment frais…) avec FlatList + recherche (dérivation) + pastilles catégorie ; chaque carte a « Ajouter » (feedback immédiat) et badge si déjà au panier.\n5. **Panier.** Lignes avec quantités +/- (immuables), retrait par bouton, total recalculé, état vide élégant (« Le panier attend vos courses de nuit » avec bouton retour au marché), bouton « Commander » → confirmation (nom + téléphone via petit formulaire inline validé) qui déplace le panier vers `Commandes` (horodaté), vide le panier, et toast de remerciement.\n6. **Commandes.** Liste locale persistée aussi (AsyncStorage), avec date, lignes, total. Swipe non requis : un simple bouton « Supprimer l'historique » avec Alert de confirmation suffira.\n7. **Démo de robustesse.** Ferme Expo Go, rouvre : panier intact. Corrompt manuellement la clé en dev : l'app démarre proprement.\n\nCe qui est évalué : l'architecture d'état (contexte unique, dérivations), l'imbrication navigateurs (tabs dans stack ou stack dans tabs — justifie ton choix en commentaire), la persistance AsyncStorage soignée (chargement différé via state de prêt), et la finition des états vides. Si tout se verrouille, l'app peut servir demain soir au marché — c'est la barre.",
    "constraints": [
        "Un seul PanierContext ; les écrans consomment, aucun ne duplique l'état du panier.",
        "Persistance : sauvegarde à chaque mutation, chargement AVANT rendu du catalogue (écran d'attente).",
        "Quantités immuables (objet id→qte copié à chaque changement) ; badge tab dérivé, jamais stocké.",
        "Commander exige nom + téléphone valides ; la commande horodatée rejoint l'historique ET vide le panier en une seule action.",
        "AsyncStorage jamais lu/enregistré sans try/catch + garde sur JSON.parse."
    ],
    "checklist": [
        "Trois onglets fonctionnels ; le badge du panier reflète le compte exact en temps réel.",
        "Ajouter depuis le catalogue, ajuster les quantités dans le panier : les deux écrans restent synchronisés (contexte unique).",
        "Fermer et rouvrir l'app : panier et historique intacts (AsyncStorage fait effet).",
        "Au premier lancement, un écran d'attente s'affiche avant le rendu (pas de flash panier vide → panier rempli).",
        "JSON corrompu simulé → démarrage propre avec panier vide (vu dans le code : try/catch).",
        "Commander exige les champs ; la commande apparaît dans l'historique avec date/heure exactes ; panier vidé.",
        "États vides soignés : catalogue filtré vide, panier vide avec CTA, historique vide poli.",
        "Le total panier est exact dans tous les cas (quantités modifiées, retraits) — vérifié à la main.",
        "La recherche du catalogue filtre instantanément, sans affecter le panier.",
        "Aucun avertissement de navigation ou de clés ; l'imbrication stack/tabs est commentée dans le code."
    ],
    "hints": [
        "Le contexte : `export const PanierContext = createContext(null);` le Provider calcule `const total = lignes…; const nb = …;` avec useMemo, puis `<PanierContext.Provider value={{ lignes, ajouter, retirer, changerQuantite, vider, total, nb }}>`. Les écrans lisent via `const { ajouter } = useContext(PanierContext);`.",
        "La persistance : dans le Provider, `useEffect(() => { if (pret) AsyncStorage.setItem('panier', JSON.stringify(lignes)); }, [lignes, pret]);` — n'écris qu'APRÈS le chargement initial (sinon tu écrases le panier sauvegardé avec le vide du démarrage). Le chargement : useEffect montage → getItem → setState → setPret(true).",
        "L'imbrication : `<NavigationContainer><Tab.Navigator>` avec pour chaque onglet `<Tab.Screen component={MarcheStack}>` — le stack de l'onglet Marché contient `Catalogue` + `FicheProduit` en push. Badge sur l'icône : `tabBarBadge: nb > 0 ? nb : undefined` relu depuis le contexte AU NIVEAU du Tab.Navigator (qui est sous le Provider)."
    ],
    "solution": {
        "lang": "js",
        "label": "PanierContext + structure navigation — solution commentée",
        "code": "\n// ========== PanierContext.js — l'état unique, persisté ==========\nexport const PanierContext = createContext(null);\nconst CLE = 'marche-nuit/panier-v1';\n\nexport function PanierProvider({ children }) {\n  const [lignes, setLignes] = useState({});     // { produitId: quantite }\n  const [pret, setPret] = useState(false);\n\n  // 1) CHARGER d'abord — tant que pret est faux, RIEN n'est écrasé.\n  useEffect(() => {\n    (async () => {\n      try {\n        const brut = await AsyncStorage.getItem(CLE);\n        if (brut) {\n          const lu = JSON.parse(brut);\n          if (lu && typeof lu === 'object') setLignes(lu);\n        }\n      } catch { /* JSON corrompu : on repart tranquille, panier vide */ }\n      setPret(true);\n    })();\n  }, []);\n\n  // 2) ÉCRIRE ensuite — uniquement quand le chargement est fini.\n  useEffect(() => {\n    if (pret) AsyncStorage.setItem(CLE, JSON.stringify(lignes))\n                 .catch(() => {});\n  }, [lignes, pret]);\n\n  const ajouter = (id) => setLignes((l) => ({ ...l, [id]: (l[id] || 0) + 1 }));\n  const retirer = (id) => setLignes((l) => {\n    const q = (l[id] || 0) - 1, copie = { ...l };\n    q <= 0 ? delete copie[id] : (copie[id] = q);\n    return copie;\n  });\n  const vider = () => setLignes({});\n  const nb = Object.values(lignes).reduce((n, q) => n + q, 0);\n  const total = Object.entries(lignes)\n    .reduce((s, [id, q]) => s + q * (PRODUITS.find((p) => p.id === id)?.prix ?? 0), 0);\n\n  return (\n    <PanierContext.Provider value={{ lignes, ajouter, retirer, vider, nb, total }}>\n      {pret ? children : <EcranAttente />}\n    </PanierContext.Provider>\n  );\n}\n\n// ========== App.js — le squelette de navigation ==========\nexport default function App() {\n  return (\n    <PanierProvider>\n      <NavigationContainer>\n        <Tab.Navigator screenOptions={{ headerShown: false }}>\n          <Tab.Screen name=\"MarcheTab\" component={MarcheStack}\n            options={{ title: 'Marché' }} />\n          <Tab.Screen name=\"Panier\" component={EcranPanier}\n            options={{ tabBarBadge: /* lu du contexte au-dessus */ undefined }} />\n          <Tab.Screen name=\"Commandes\" component={EcranCommandes} />\n        </Tab.Navigator>\n      </NavigationContainer>\n    </PanierProvider>\n  );\n}\n",
        "explain": "L'architecture se résume à trois protections. La première sépare l'état partagé du local : le panier vit dans UN contexte au sommet (écran catalogue et écran panier ne sont que des fenêtres sur la même donnée — c'est ce qui rend la synchronisation gratuite). La deuxième gère le cycle AsyncStorage avec le drapeau pret : charger d'abord, n'écrire qu'ensuite — l'ordre inverse écrase ton panier fidèle au premier démarrage (le bug classique de ce TP : « j'ai perdu mon panier ! »). La troisième tient à l'immutabilité des quantités : chaque mutation retourne un nouvel objet id→qte, donc le badge de l'onglet et les totaux se recalculent et se re-rendent à l'unisson. La navigation tab-par-stack enfin n'est pas un détail : chaque onglet garde sa propre pile, la fiche produit pousse sans détruire la barre du bas — exactement ce qu'une vraie app de courses doit offrir."
    },
    "criteria": [
        "Trois onglets + stack imbriquée, badge exact, navigation irréprochable.",
        "Contexte unique + persistance AsyncStorage sûre (ordre charger→écrire, JSON gardé).",
        "Commande validée horodatée en historique, états vides et finitions soignés."
    ],
    "variants": [
        "Ajoute une section « Horaires » calculée : bannière « Le marché ouvre à 18 h » hors plage 18h-2h.",
        "Ajoute la répétition : bouton « Recommander pareil » qui recharge la dernière commande dans le panier.",
        "Défi : simule un paiement MoMo (écran de validation avec minuteur 60 s) avant d'enregistrer la commande."
    ],
    "related": [
        "rn-contexte",
        "rn-asyncstorage",
        "rn-navigation-setup",
        "rn-navigation-avance",
        "rn-flatlist",
        "rn-etat"
    ]
}
  ]
};
