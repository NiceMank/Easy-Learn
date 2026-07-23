/* render-html.js — rend une page d'Easy Learn via jsdom et vérifie le résultat.
   Usage : node render-html.js <hash> [fiche|sommaire|home]             */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('/tmp/nm/node_modules/jsdom');

const ROOT = '/home/user/devdocs';
const hash = process.argv[2] || '';
const mode = process.argv[3] || (/^\/fiche\//.test(hash) ? 'fiche' : (hash ? 'sommaire' : 'home'));

const jsErrors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => {
  const msg = String((e && e.detail && e.detail.message) || e.message || e);
  if (/Could not load|net::|ENOTFOUND|ECONNREFUSED|ETIMEDOUT/i.test(msg)) return;
  jsErrors.push(msg);
});
vc.on('error', (m) => jsErrors.push(String(m)));

function polyfills(window) {
  window.matchMedia = window.matchMedia || ((q) => ({
    matches: false, media: q,
    addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {}
  }));
  window.scrollTo = () => {};
  if (!window.requestAnimationFrame) window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  window.IntersectionObserver = window.IntersectionObserver || class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ target: el, isIntersecting: true }], this); }
    unobserve() {} disconnect() {}
  };
}

function loadPage(hash) {
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  html = html.replace(/https:\/\/fonts\.googleapis\.com[^"']*/g, 'data:text/css,');
  html = html.replace(/https:\/\/fonts\.gstatic\.com[^"']*/g, 'data:text/css,');
  return new JSDOM(html, {
    url: 'file://' + path.join(ROOT, 'index.html') + '#' + hash,
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    virtualConsole: vc, beforeParse: polyfills
  });
}

function waitReady(dom) {
  return new Promise((resolve) => {
    const w = dom.window;
    const t0 = Date.now();
    const iv = setInterval(() => {
      const ready = w.document.readyState === 'complete' && w.DEVDOCS && Object.keys(w.DEVDOCS).length > 0;
      if ((ready && w.document.querySelector('#view').children.length) || Date.now() - t0 > 12000) {
        clearInterval(iv); setTimeout(resolve, 120);
      }
    }, 40);
  });
}

async function main() {
  const dom = loadPage(hash);
  await waitReady(dom);
  const doc = dom.window.document;
  const view = doc.querySelector('#view');
  const out = { ok: true, details: [] };
  const fail = (m) => { out.ok = false; out.details.push('FAIL ' + m); };
  const pass = (m) => out.details.push('ok   ' + m);

  if (!view || !view.innerHTML.trim()) fail('#view vide');
  else pass('#view rempli (' + view.innerHTML.length + ' chars HTML)');

  if (mode === 'fiche') {
    const h1 = doc.querySelector('h1');
    h1 && h1.textContent.trim() ? pass('h1 = « ' + h1.textContent.trim() + ' »') : fail('pas de h1');
    const txt = (view.textContent || '').trim();
    txt.length > 2000 ? pass('contenu texte = ' + txt.length + ' chars (> 2000)') : fail('contenu trop court : ' + txt.length);
    const pre = doc.querySelectorAll('pre').length;
    pre >= 1 ? pass(pre + ' bloc(s) <pre>') : fail('aucun bloc code rendu');
    const errs = doc.querySelectorAll('.err-card').length;
    errs >= 2 ? pass(errs + ' .err-card') : fail('.err-card = ' + errs);
    doc.querySelector('.pager') ? pass('.pager présent') : fail('.pager absent');
    const h3s = Array.from(doc.querySelectorAll('h3')).map((h) => h.textContent.trim());
    const idxMal = h3s.findIndex((t) => /Ce que les d[ée]butants comprennent mal/.test(t));
    const idxLien = h3s.findIndex((t) => /Lien avec les notions d[ée]j[àa] vues/.test(t));
    idxMal >= 0 ? pass('h3 « Ce que les débutants comprennent mal » présent') : fail('h3 « ...comprennent mal » ABSENT');
    idxLien >= 0 ? pass('h3 « Lien avec les notions déjà vues » présent (dernier h3 : ' + (idxLien === h3s.length - 1) + ')') : fail('h3 « Lien avec les notions déjà vues » ABSENT');
    if (idxLien >= 0 && idxLien !== h3s.length - 1) fail('« Lien avec les notions déjà vues » n\'est pas le dernier h3');
    const icons = doc.querySelectorAll('.material-symbols-rounded').length;
    icons > 0 ? pass(icons + ' icônes Material Symbols') : fail('aucune icône');
  } else if (mode === 'sommaire') {
    const cards = doc.querySelectorAll('.fiche-card');
    cards.length > 0 ? pass(cards.length + ' .fiche-card affichées') : fail('aucune .fiche-card');
    const first = cards[0];
    if (first) pass('1re carte = « ' + first.textContent.replace(/\s+/g, ' ').trim().slice(0, 70) + ' »');
  } else {
    doc.querySelectorAll('a').length > 10 ? pass('accueil : ' + doc.querySelectorAll('a').length + ' liens') : fail('accueil quasi vide');
  }

  const critical = jsErrors.filter((e) => !/favicon|fonts\.g/i.test(e));
  critical.length === 0 ? pass('0 erreur JS critique') : fail('erreurs JS : ' + critical.slice(0, 3).join(' | '));

  console.log((out.ok ? '=== OK  ' : '=== KO  ') + '#' + hash + '  [' + mode + ']');
  out.details.forEach((d) => console.log('   ' + d));
  dom.window.close();
  process.exit(out.ok ? 0 : 1);
}

module.exports = { loadPage, waitReady, polyfills, ROOT };

if (require.main === module) {
  main().catch((e) => { console.error('EXCEPTION', e); process.exit(2); });
}
