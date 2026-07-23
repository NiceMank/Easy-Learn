/* smoke.js — charge Easy Learn UNE fois puis visite les 17 sommaires et les
   371 fiches en changeant le hash (routeur réel), en vérifiant #view + h1. */
const { loadPage, waitReady } = require(__dirname + '/render-html.js');

const EXPECT = {
  html: 9, css: 12, js: 13, ts: 25, tailwind: 15, php: 35, laravel: 18,
  react: 21, tanstack: 14, python: 18, flask: 17, django: 20, vue: 29,
  rn: 24, node: 29, c: 30, java: 42
};
const TOTAL_FICHES = Object.values(EXPECT).reduce((a, b) => a + b, 0);

async function main() {
  const dom = loadPage('');
  await waitReady(dom);
  const w = dom.window, doc = w.document;
  const view = () => doc.querySelector('#view');
  const fails = [];
  let visited = 0;

  // 1 — Base de données
  const langs = Object.keys(w.DEVDOCS || {});
  const fiches = [];
  langs.forEach((l) => w.DEVDOCS[l].categories.forEach((c) => c.fiches.forEach((f) => {
    fiches.push({ id: f.id, title: f.title, lang: l });
  })));
  console.log('Base :', langs.length, 'langages,', fiches.length, 'fiches (attendu', TOTAL_FICHES + ')');
  if (fiches.length !== TOTAL_FICHES) fails.push('total fiches ' + fiches.length + ' ≠ ' + TOTAL_FICHES);

  // 2 — Accueil
  w.location.hash = '';
  await new Promise((r) => setTimeout(r, 200));
  if (!view().innerHTML.trim()) fails.push('accueil vide');
  else visited++;

  const goto = async (hash) => {
    w.location.hash = hash;
    await new Promise((r) => setTimeout(r, 25));
  };

  // 3 — Sommaires
  for (const l of langs) {
    await goto('/' + l);
    const n = view().querySelectorAll('.fiche-card').length;
    visited++;
    if (EXPECT[l] && n !== EXPECT[l]) fails.push('sommaire ' + l + ' : ' + n + ' cartes ≠ ' + EXPECT[l]);
    else if (n === 0) fails.push('sommaire ' + l + ' vide');
  }

  // 4 — Toutes les fiches
  let preOK = 0, errOK = 0, pagerOK = 0, relatedBroken = 0;
  for (const f of fiches) {
    await goto('/fiche/' + f.id);
    const v = view();
    const h1 = v.querySelector('h1');
    if (!h1 || !h1.textContent.trim()) { fails.push('fiche ' + f.id + ' : pas de h1'); continue; }
    const txt = (v.textContent || '').trim();
    if (txt.length < 800) fails.push('fiche ' + f.id + ' : contenu court (' + txt.length + ')');
    if (v.querySelectorAll('pre').length >= 1) preOK++;
    if (v.querySelectorAll('.pager').length === 1) pagerOK++; else fails.push('fiche ' + f.id + ' : pager');
    errOK += v.querySelectorAll('.err-card').length >= 2 ? 1 : 0;
    // liens related cassés (carte sans href)
    visited++;
  }
  console.log('Visitées :', visited, 'pages |', preOK, 'fiches avec code |', errOK, 'avec >=2 erreurs |', pagerOK, 'avec pager');
  void relatedBroken;

  console.log(fails.length ? '=== SMOKE KO ===' : '=== SMOKE OK : ' + visited + ' pages ===');
  fails.slice(0, 40).forEach((m) => console.log('  FAIL', m));
  dom.window.close();
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => { console.error('EXCEPTION', e); process.exit(2); });
