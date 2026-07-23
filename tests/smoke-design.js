/* smoke-design.js — 24 assertions statiques sur le design iOS premium :
   classes CSS clés, thème, overlay recherche, polices, responsive, équilibre. */
const fs = require('fs');
const R = '/home/user/devdocs';
const css = fs.readFileSync(R + '/css/main.css', 'utf8') + '\n' + fs.readFileSync(R + '/css/exo.css', 'utf8');
const html = fs.readFileSync(R + '/index.html', 'utf8');
const app = fs.readFileSync(R + '/js/app.js', 'utf8');

const checks = [
  ['css : .fiche-card', css.includes('.fiche-card')],
  ['css : .fiche-meta / .chip', css.includes('.chip')],
  ['css : .err-card', css.includes('.err-card')],
  ['css : .err-bad', css.includes('.err-bad')],
  ['css : .err-good', css.includes('.err-good')],
  ['css : .err-why', css.includes('.err-why')],
  ['css : .callout (tip/warn/info)', css.includes('.callout')],
  ['css : .doc-table', css.includes('.doc-table')],
  ['css : .codeblock', css.includes('.codeblock')],
  ['css : .demo (iframe srcdoc)', css.includes('.demo')],
  ['css : .pager', css.includes('.pager')],
  ['css : .related-row', css.includes('.related-row')],
  ['css : #search-overlay', css.includes('#search-overlay') || html.includes('id="search-overlay"')],
  ['css : [data-theme=', css.includes('[data-theme=')],
  ['css : variables --bg/--text', css.includes('--bg') && css.includes('--text')],
  ['css : backdrop-filter (flou iOS)', css.includes('backdrop-filter')],
  ['css : @media responsive', (css.match(/@media/g) || []).length >= 3],
  ['css : accolades équilibrées main.css', fs.readFileSync(R + '/css/main.css', 'utf8').split('{').length === fs.readFileSync(R + '/css/main.css', 'utf8').split('}').length],
  ['css : accolades équilibrées exo.css', fs.readFileSync(R + '/css/exo.css', 'utf8').split('{').length === fs.readFileSync(R + '/css/exo.css', 'utf8').split('}').length],
  ['html : police Material Symbols Rounded', html.includes('Material+Symbols+Rounded') || html.includes('material-symbols-rounded')],
  ['html : #view présent', html.includes('id="view"')],
  ['html : #search-input', html.includes('id="search-input"')],
  ['app : icone() matérial symbols', app.includes('material-symbols-rounded')],
  ['app : rendu demo (iframe)', app.includes('<iframe') && app.includes('srcdoc')],
];

let ko = 0;
checks.forEach(([name, ok]) => { if (!ok) { ko++; console.log('  FAIL', name); } });
console.log(ko === 0 ? '=== DESIGN OK : ' + checks.length + '/' + checks.length + ' assertions ===' : '=== DESIGN KO : ' + ko + '/' + checks.length + ' en échec ===');
process.exit(ko === 0 ? 0 : 1);
