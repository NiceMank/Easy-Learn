/* scan-all-tags.js — détecte les balises HTML BRUTES hors backticks dans tous
   les champs passés par md() du renderer (intro, tagline, p, h3, callout, items
   ul/ol, cellules de table, why des erreurs). Ces balises deviennent de vrais
   éléments DOM et peuvent avaler la fin d'une fiche (bug <template>/<script>
   corrigé le 22/07/2026 — 20 occurrences). Les titres d'erreurs sont EXCLUS :
   ils passent par High.esc(). Code de sortie 1 si au moins une balise brute. */
const fs = require('fs');
global.window = {}; global.DEVDOCS = window.DEVDOCS = {};
const files = fs.readdirSync('/home/user/devdocs/js').filter((f) => /^data-.*\.js$/.test(f));
files.forEach((f) => require('/home/user/devdocs/js/' + f));
const DB = global.DEVDOCS;
const RX = /<\/?([a-zA-Z][a-zA-Z0-9-]*)/g;
const outsideTicks = (s) => s.split('`').filter((_, i) => i % 2 === 0).join(' ');
function scanField(id, where, s, report) {
  if (typeof s !== 'string') return;
  const out = outsideTicks(s);
  let m; const seen = new Set();
  while ((m = RX.exec(out))) {
    const tag = m[1].toLowerCase();
    if (seen.has(tag)) continue;
    seen.add(tag);
    report.push(id + ' :: ' + where + ' :: <' + tag + '>');
  }
}
const report = [];
Object.keys(DB).forEach((lang) => DB[lang].categories.forEach((c) => c.fiches.forEach((f) => {
  scanField(f.id, 'intro', f.intro, report); scanField(f.id, 'tagline', f.tagline, report);
  (f.blocks || []).forEach((b, i) => {
    if (['p', 'h3', 'callout'].includes(b.t)) scanField(f.id, 'b' + i + '.' + b.t, b.h, report);
    if (['ul', 'ol'].includes(b.t)) (b.items || []).forEach((it) => scanField(f.id, 'b' + i + '.' + b.t, it, report));
    if (b.t === 'table') (b.rows || []).forEach((r) => r.forEach((cell) => scanField(f.id, 'b' + i + '.cell', cell, report)));
    if (b.t === 'diagram') { scanField(f.id, 'b' + i + '.title', b.title, report); scanField(f.id, 'b' + i + '.caption', b.caption, report); }
    if (b.t === 'syntax') { scanField(f.id, 'b' + i + '.syntax-title', b.title, report); (b.legend || []).forEach((row) => scanField(f.id, 'b' + i + '.syntax-legend', row[1], report)); }
  });
  (f.errors || []).forEach((e, i) => scanField(f.id, 'err' + i + '.why', e.why, report));
})));
if (report.length) { console.log(report.join('\n')); console.log('=== ' + report.length + ' BALISES BRUTES — KO ==='); process.exit(1); }
console.log('AUCUNE balise brute dans les champs md() — OK');
