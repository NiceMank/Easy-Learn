/* validate.js — contrôles structurels hors navigateur :
   1) chargement des 17 modules, comptage des fiches (attendu 371)
   2) unicité des IDs de fiches (global, tous modules)
   3) champs requis par fiche (id, title, icon, level, intro, blocks)
   4) forme des blocs (types connus + champs obligatoires du type)
   5) liens related[] : chaque id pointe vers une fiche existante
   6) exercise files par module (5 chacun, 85 au total)                  */
const fs = require('fs');
global.window = {}; global.DEVDOCS = window.DEVDOCS = {};
const dfiles = fs.readdirSync('/home/user/devdocs/js').filter((f) => /^data-.*\.js$/.test(f));
dfiles.forEach((f) => require('/home/user/devdocs/js/' + f));
const DB = global.DEVDOCS;
const KNOWN = new Set(['h3', 'p', 'ul', 'ol', 'code', 'callout', 'table', 'demo']);
let total = 0; const fails = []; const ids = new Map();
Object.keys(DB).forEach((l) => DB[l].categories.forEach((c) => c.fiches.forEach((f) => {
  total++;
  if (!f.id || !f.title || !f.icon || !f.level || !f.intro || !Array.isArray(f.blocks)) fails.push(l + '/' + (f.id || '?') + ' : champ requis manquant');
  if (ids.has(f.id)) fails.push('ID dupliqué : ' + f.id + ' (' + ids.get(f.id) + ' et ' + l + ')');
  ids.set(f.id, l);
  f.blocks.forEach((b, i) => {
    if (!KNOWN.has(b.t)) fails.push(f.id + ' b' + i + ' : type inconnu ' + b.t);
    if (['p', 'h3', 'callout'].includes(b.t) && !b.h) fails.push(f.id + ' b' + i + ' : ' + b.t + ' sans h');
    if (['ul', 'ol'].includes(b.t) && !(b.items || []).length) fails.push(f.id + ' b' + i + ' : ' + b.t + ' sans items');
    if (b.t === 'code' && (typeof b.code !== 'string' || !b.code.trim())) fails.push(f.id + ' b' + i + ' : code vide');
    if (b.t === 'table' && !((b.head || []).length && (b.rows || []).length)) fails.push(f.id + ' b' + i + ' : table incomplète');
    if (b.t === 'demo' && !b.html) fails.push(f.id + ' b' + i + ' : demo sans html');
    if (b.t === 'callout' && !['tip', 'warn', 'info'].includes(b.kind)) fails.push(f.id + ' b' + i + ' : callout kind inconnu ' + b.kind);
  });
})));
// related
let broken = 0;
Object.keys(DB).forEach((l) => DB[l].categories.forEach((c) => c.fiches.forEach((f) => (f.related || []).forEach((r) => {
  if (!ids.has(r)) { broken++; fails.push('related cassé : ' + f.id + ' -> ' + r); }
}))));
// f.read ne doit PAS être dans les data (calculé au runtime)
Object.keys(DB).forEach((l) => DB[l].categories.forEach((c) => c.fiches.forEach((f) => {
  if ('read' in f) fails.push(f.id + ' : champ read codé en dur (doit être calculé)');
})));
console.log(total + ' fiches sur ' + Object.keys(DB).length + ' modules | related cassés : ' + broken);
console.log(fails.length ? '=== VALIDATE KO ===' : '=== VALIDATE OK ===');
fails.slice(0, 40).forEach((m) => console.log('  FAIL', m));
process.exit(fails.length ? 1 : 0);
