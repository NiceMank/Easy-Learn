/* exocheck.js — valide les 85 ateliers : présence par langage, champs requis,
   répartition kind (30 dom / 55 checklist), et rendu réel d'une page atelier. */
const { loadPage, waitReady } = require(__dirname + '/render-html.js');

const EXPECT_TOTAL = 85, EXPECT_DOM = 30, EXPECT_CHECK = 55;
const EXO_LANGS = ['html', 'css', 'js', 'ts', 'react', 'tailwind', 'tanstack', 'php', 'laravel', 'python', 'flask', 'django', 'vue', 'rn', 'node', 'c', 'java'];

async function main() {
  const dom = loadPage('/ateliers');
  await waitReady(dom);
  const w = dom.window;
  const fails = [];
  const EXO = w.DEVDOCS_EXO || {};
  let total = 0, dom_ = 0, check = 0;
  const perLang = {};

  for (const l of Object.keys(EXO)) {
    const list = (EXO[l] && EXO[l].list) || [];
    perLang[l] = list.length;
    total += list.length;
    list.forEach((x, i) => {
      const who = l + '[' + i + '] ' + (x.title || '?');
      if (!x.id || !x.title || !x.kind) fails.push(who + ' : champ id/title/kind manquant');
      if (x.kind === 'dom') {
        dom_++;
        if (!x.panes || !x.panes.length || !x.panes.some((p) => p.editable && p.code)) fails.push(who + ' : dom sans panneau éditable');
        if (!x.tests || !x.tests.length || !x.tests.every((t) => typeof t.check === 'function')) fails.push(who + ' : dom sans tests fonctionnels');
      } else if (x.kind === 'checklist') {
        check++;
        if (!x.checklist || !x.checklist.length) fails.push(who + ' : checklist vide');
      } else fails.push(who + ' : kind inconnu « ' + x.kind + ' »');
      if (!x.statement || !x.constraints || !x.constraints.length) fails.push(who + ' : statement/constraints manquants');
      if (!x.hints || !x.hints.length || x.solution === undefined) fails.push(who + ' : hints/solution manquants');
    });
  }
  const MISSING = EXO_LANGS.filter((l) => !EXO[l]);
  if (MISSING.length) fails.push('DEVDOCS_EXO absent pour : ' + MISSING.join(', '));

  console.log('Ateliers par langage :', JSON.stringify(perLang));
  console.log('TOTAL =', total, '(attendu', EXPECT_TOTAL + ') | dom =', dom_, '(attendu', EXPECT_DOM + ') | checklist =', check, '(attendu', EXPECT_CHECK + ')');
  if (total !== EXPECT_TOTAL) fails.push('total ateliers ' + total + ' ≠ ' + EXPECT_TOTAL);
  if (dom_ !== EXPECT_DOM) fails.push('kind dom ' + dom_ + ' ≠ ' + EXPECT_DOM);
  if (check !== EXPECT_CHECK) fails.push('kind checklist ' + check + ' ≠ ' + EXPECT_CHECK);

  // Rendu réel des pages ateliers (sommaire + une page d'atelier dom)
  await new Promise((r) => setTimeout(r, 150));
  const view = () => w.document.querySelector('#view');
  w.location.hash = '/ateliers';
  await new Promise((r) => setTimeout(r, 150));
  if (!view().innerHTML.trim()) fails.push('page #/ateliers vide');
  const firstDom = Object.keys(EXO).map((l) => ({ l, x: EXO[l].list.find((e) => e.kind === 'dom') })).find((p) => p.x);
  if (firstDom) {
    w.location.hash = '/ateliers/' + firstDom.l + '/' + firstDom.x.id;
    await new Promise((r) => setTimeout(r, 200));
    const html = view().innerHTML;
    if (!html.trim()) fails.push('page atelier ' + firstDom.x.id + ' vide');
    else console.log('Rendu atelier «', firstDom.x.title.slice(0, 50), '» :', html.length, 'chars HTML');
  }

  console.log(fails.length ? '=== EXOCHECK KO ===' : '=== EXOCHECK OK ===');
  fails.slice(0, 40).forEach((m) => console.log('  FAIL', m));
  dom.window.close();
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => { console.error('EXCEPTION', e); process.exit(2); });
