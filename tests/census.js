const fs = require('fs');
global.window = {}; global.DEVDOCS = window.DEVDOCS = {};
const files = fs.readdirSync('/home/user/devdocs/js').filter((f) => /^data-.*\.js$/.test(f));
files.forEach((f) => require('/home/user/devdocs/js/' + f));
const DB = global.DEVDOCS;
const INSTALL = { react:'react-installation', tanstack:'tq-installation', laravel:'lv-installation', flask:'fk-installation', django:'jd-installation', vue:'vue-installation', rn:'rn-installation', tailwind:'tw-installation', python:'py-demarrage' };
let total = 0;
console.log('LANG | fiches | taille fichier | 1re fiche (id) | install?');
Object.keys(DB).forEach((l) => {
  let n = 0; DB[l].categories.forEach((c) => { n += c.fiches.length; });
  total += n;
  const first = DB[l].categories[0].fiches[0];
  const hasInstall = !!INSTALL[l];
  const size = fs.statSync('/home/user/devdocs/js/' + files.find((f) => f.includes(l === 'rn' ? 'reactnative' : (l === 'ts' ? 'typescript' : l)))).size;
  console.log(l.padEnd(9) + '| ' + String(n).padStart(3) + ' | ' + String(size).padStart(7) + ' | ' + first.id + (hasInstall ? ' | INSTALL:OUI (' + INSTALL[l] + ')' : ' | install:non'));
});
console.log('TOTAL fiches =', total);
// exos
global.DEVDOCS_EXO = window.DEVDOCS_EXO = {};
fs.readdirSync('/home/user/devdocs/js').filter((f) => /^exo-(?!app|runner).*\.js$/.test(f)).forEach((f) => require('/home/user/devdocs/js/' + f));
let et = 0, dom = 0, chk = 0;
Object.keys(DEVDOCS_EXO).forEach((l) => DEVDOCS_EXO[l].list.forEach((x) => { et++; x.kind === 'dom' ? dom++ : chk++; }));
console.log('EXO total =', et, '| dom =', dom, '| checklist =', chk, '| modules exo =', Object.keys(DEVDOCS_EXO).length);
