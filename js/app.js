/* ============================================================
   app.js — Easy Learn : routeur, vues, recherche, favoris, thème, barre latérale
   Vanilla JS, aucune dépendance.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Registre de contenu ---------- */
  const DB = window.DEVDOCS || {};
  const LANGS = ['algo', 'html', 'css', 'js', 'ts', 'react', 'tailwind', 'php', 'laravel', 'tanstack', 'python', 'flask', 'django', 'vue', 'rn', 'flutter', 'node', 'c', 'java'].filter((l) => DB[l]);

  /* ---------- Catégories de modules (source unique) ---------- */
  const MODULE_CATEGORIES = [
    { id: 'fondations', name: 'Fondations', icon: 'school', modules: ['algo'] },
    { id: 'langages', name: 'Langages de base', icon: 'code', modules: ['html', 'css', 'js', 'python', 'java', 'c', 'php', 'ts'] },
    { id: 'frontend', name: 'Frontend & Frameworks', icon: 'palette', modules: ['react', 'vue', 'tailwind', 'tanstack'] },
    { id: 'backend', name: 'Backend & Frameworks', icon: 'dns', modules: ['node', 'laravel', 'flask', 'django'] },
    { id: 'mobile', name: 'Mobile', icon: 'smartphone', modules: ['rn', 'flutter'] }
  ];
  // On ne garde que les catégories qui contiennent au moins un module présent dans DB
  const activeCats = MODULE_CATEGORIES.map((cat) => ({
    ...cat,
    modules: cat.modules.filter((m) => DB[m])
  })).filter((cat) => cat.modules.length > 0);

  /* ---------- Persistance ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* quota */ } }
  };
  let favs = store.get('dd-favs', []);
  let hist = store.get('dd-hist', []);

  /* ---------- Index global ---------- */
  const ficheIndex = new Map(); // id -> {fiche, lang, cat}
  const searchIndex = [];

  const stripTags = (h) => h.replace(/<[^>]*>/g, ' ');
  // Normalise pour la recherche en conservant la LONGUEUR (pour les extraits)
  const ACCENTS = 'àâäáãåçèéêëìíîïñòóôöõùúûüýÿ';
  const PLAIN = 'aaaaaaceeeeiiiinooooouuuuyy';
  const norm = (s) => String(s).toLowerCase().split('').map((ch) => {
    const i = ACCENTS.indexOf(ch);
    return i >= 0 ? PLAIN[i] : ch;
  }).join('');

  function blocksText(blocks) {
    return (blocks || []).map((b) => {
      switch (b.t) {
        case 'p': case 'h3': case 'callout': return stripTags(b.h || '');
        case 'ul': case 'ol': return (b.items || []).map(stripTags).join(' ');
        case 'table': return (b.head || []).concat((b.rows || []).flat()).join(' ');
        case 'code': return b.code || '';
        default: return '';
      }
    }).join(' ');
  }

  function wordCount(f) {
    const txt = stripTags(f.intro || '') + ' ' + blocksText(f.blocks).replace(/[^\s\wÀ-ÿ]/g, ' ');
    return txt.trim().split(/\s+/).length;
  }

  LANGS.forEach((langId) => {
    const lang = DB[langId];
    lang.categories.forEach((cat) => {
      cat.fiches.forEach((f) => {
        f.read = Math.max(2, Math.round(wordCount(f) / 200)) + ' min';
        ficheIndex.set(f.id, { fiche: f, lang: langId, cat: cat });
        const raw = stripTags(f.intro || '') + ' ' + blocksText(f.blocks);
        searchIndex.push({
          id: f.id,
          title: f.title,
          lang: langId,
          icon: f.icon,
          catName: cat.name,
          raw: raw,                                               // original (extraits)
          text: norm(f.title + ' ' + f.title + ' ' + raw)         // normalisé (recherche)
        });
      });
    });
  });

  function flatFiches(langId) {
    return DB[langId].categories.flatMap((c) => c.fiches);
  }

  /* ---------- Helpers DOM ---------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const view = $('#view');

  function md(text) {
    // backticks -> code inline ; **gras** -> strong ; le reste est du HTML de confiance
    const parts = String(text).split(/`([^`]+)`/g);
    return parts.map((p, i) => (i % 2
      ? '<code class="inline">' + High.esc(p) + '</code>'
      : p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    )).join('');
  }

  function icon(name, cls) {
    return '<span class="material-symbols-rounded' + (cls ? ' ' + cls : '') + '">' + name + '</span>';
  }

  function codeBlock(b) {
    const langLabel = { html: 'HTML', css: 'CSS', js: 'JavaScript', javascript: 'JavaScript' }[b.lang] || (b.lang || '').toUpperCase();
    return '<figure class="codeblock reveal">' +
      '<figcaption class="codeblock-header">' +
        '<span class="codeblock-dots"><i></i><i></i><i></i></span>' +
        '<span class="codeblock-label">' + (b.label || langLabel) + '</span>' +
        '<button class="copy-btn" data-copy type="button">' + icon('content_copy') + '<span>Copier</span></button>' +
      '</figcaption>' +
      '<pre><code>' + High.run(b.code, b.lang) + '</code></pre>' +
    '</figure>';
  }

  function renderBlock(b) {
    switch (b.t) {
      case 'h3': return '<h3 class="reveal">' + md(b.h) + '</h3>';
      case 'p': return '<p class="reveal">' + md(b.h) + '</p>';
      case 'ul': return '<ul class="reveal">' + b.items.map((i) => '<li>' + md(i) + '</li>').join('') + '</ul>';
      case 'ol': return '<ol class="reveal">' + b.items.map((i) => '<li>' + md(i) + '</li>').join('') + '</ol>';
      case 'code': return codeBlock(b);
      case 'callout':
        return '<aside class="callout ' + (b.kind || 'info') + ' reveal">' +
          icon({ tip: 'lightbulb', warn: 'warning', info: 'info' }[b.kind] || 'info') +
          '<div>' + md(b.h) + '</div></aside>';
      case 'table':
        return '<div class="table-wrap reveal"><table class="doc-table"><thead><tr>' +
          b.head.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
          b.rows.map((r) => '<tr>' + r.map((c) => '<td>' + md(c) + '</td>').join('') + '</tr>').join('') +
          '</tbody></table></div>';
      case 'demo': {
        const doc = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
          'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;padding:14px;line-height:1.5;background:#fff;color:#111}' +
          '</style></head><body>' + b.html + '</body></html>';
        return '<div class="demo-frame reveal">' +
          '<iframe sandbox title="Démonstration" height="' + (b.height || 150) + '" srcdoc="' + High.esc(doc).replace(/"/g, '&quot;') + '"></iframe>' +
          (b.caption ? '<div class="demo-caption">' + icon('visibility') + '<span>' + b.caption + '</span></div>' : '') +
        '</div>';
      }
      default: return '';
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg, ic) {
    const el = $('#toast');
    el.innerHTML = icon(ic || 'check_circle') + '<span>' + msg + '</span>';
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ---------- Thème ---------- */
  function applyTheme(theme, silent) {
    document.documentElement.setAttribute('data-theme', theme);
    store.set('dd-theme', theme);
    $('#theme-icon').textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    if (!silent) toast(theme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé', theme === 'dark' ? 'dark_mode' : 'light_mode');
  }
  applyTheme(store.get('dd-theme', window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'), true);
  $('#theme-toggle').addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Barre latérale : masquer / afficher (animé, persisté) ---------- */
  const sidebarBtn = $('#sidebar-toggle');
  function applySidebar(hidden, silent) {
    document.body.classList.toggle('sidebar-hidden', hidden);
    const icon = $('#sidebar-toggle-icon');
    if (icon) icon.textContent = hidden ? 'left_panel_open' : 'left_panel_close';
    if (sidebarBtn) {
      sidebarBtn.setAttribute('aria-pressed', hidden ? 'true' : 'false');
      sidebarBtn.setAttribute('aria-label', hidden ? 'Afficher la barre latérale' : 'Masquer la barre latérale');
    }
    store.set('dd-sidebar', hidden);
    if (!silent) toast(hidden ? 'Barre latérale masquée' : 'Barre latérale affichée', hidden ? 'left_panel_open' : 'left_panel_close');
  }
  // État restauré au démarrage : l'utilisateur retrouve sa mise en page
  applySidebar(store.get('dd-sidebar', false) === true, true);
  if (sidebarBtn) sidebarBtn.addEventListener('click', () => {
    applySidebar(!document.body.classList.contains('sidebar-hidden'));
  });

  /* ---------- Favoris & historique ---------- */
  const isFav = (id) => favs.includes(id);
  function toggleFav(id) {
    if (isFav(id)) { favs = favs.filter((f) => f !== id); toast('Retiré des favoris', 'heart_minus'); }
    else { favs.push(id); toast('Ajouté aux favoris', 'favorite'); }
    store.set('dd-favs', favs);
    refreshCounts();
  }
  function pushHist(id) {
    hist = hist.filter((h) => h.id !== id);
    hist.unshift({ id: id, ts: Date.now() });
    hist = hist.slice(0, 25);
    store.set('dd-hist', hist);
  }
  function refreshCounts() {
    const fc = $('#fav-count'); if (fc) fc.textContent = favs.length || '';
    document.querySelectorAll('[data-count-lang]').forEach((el) => {
      el.textContent = flatFiches(el.dataset.countLang).length;
    });
  }

  /* ---------- Reveal au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
  function observeReveals() { view.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)); }

  /* ---------- Badges / cartes réutilisables ---------- */
  const lvlClass = (lv) => 'lvl-' + norm(lv);
  function langIconCls(langId) { return { algo: 'ic-algo', html: 'ic-html', css: 'ic-css', js: 'ic-js', ts: 'ic-ts', react: 'ic-react', tailwind: 'ic-tailwind', php: 'ic-php', laravel: 'ic-laravel', tanstack: 'ic-tanstack', python: 'ic-python', flask: 'ic-flask', django: 'ic-django', vue: 'ic-vue', rn: 'ic-rn', flutter: 'ic-flutter', node: 'ic-node', c: 'ic-c', java: 'ic-java' }[langId] || 'ic-neutral'; }

  function ficheCard(f, langId) {
    return '<a class="fiche-card reveal" data-level="' + norm(f.level) + '" href="#/fiche/' + f.id + '">' +
      '<span class="card-icon ' + langIconCls(langId) + '">' + icon(f.icon) + '</span>' +
      '<span class="card-title">' + High.esc(f.title) + '</span>' +
      '<p class="card-desc">' + (f.tagline ? md(f.tagline) : High.esc(stripTags(f.intro).slice(0, 90)) + '…') + '</p>' +
      '<span class="card-meta"><span class="chip ' + lvlClass(f.level) + '">' + f.level + '</span>' +
      '<span class="chip">' + icon('schedule') + f.read + '</span></span>' +
    '</a>';
  }

  /* ============ VUES ============ */

  function viewHome() {
    document.body.removeAttribute('data-lang');
    const last = hist[0] && ficheIndex.get(hist[0].id);
    const total = searchIndex.length;
    let out = '<section class="hero view-anim">' +
      '<span class="hero-eyebrow">' + icon('menu_book') + ' Documentation personnelle</span>' +
      '<h1>Maîtrise le web,<br>notion par notion.</h1>' +
      '<p class="lead">Une référence complète et pédagogique pour HTML, CSS et JavaScript — construite à partir des documentations officielles, reformulée comme un professeur te l\'expliquerait. <strong>' + total + ' fiches</strong> détaillées, exemples copiables, pièges à éviter.</p>' +
    '</section>';

    if (last) {
      out += '<section class="reveal"><a class="list-row" href="#/fiche/' + last.fiche.id + '" style="margin-bottom:26px">' +
        '<span class="card-icon ' + langIconCls(last.lang) + '">' + icon('resume') + '</span>' +
        '<span class="list-row-text"><span class="list-row-sub">Reprendre là où tu en étais</span>' +
        '<span class="list-row-title">' + High.esc(last.fiche.title) + '</span></span>' +
        '<span class="material-symbols-rounded chevron">chevron_right</span></a></section>';
    }

    activeCats.forEach((cat) => {
      out += '<h2 class="section-title reveal">' + icon(cat.icon) + cat.name + '</h2><div class="card-grid">';
      cat.modules.forEach((l) => {
        const L = DB[l];
        const n = flatFiches(l).length;
        out += '<a class="lang-card reveal" href="#/' + l + '">' +
          '<span class="card-icon ' + langIconCls(l) + '">' + icon(L.icon) + '</span>' +
          '<span class="card-title">' + L.name + '</span>' +
          '<p class="card-desc">' + md(L.tagline) + '</p>' +
          '<span class="card-meta"><span class="chip accent">' + icon('format_list_numbered') + n + ' fiches</span>' +
          '<span class="chip">' + icon('folder') + L.categories.length + ' chapitres</span></span></a>';
      });
      out += '</div>';
    });

    if (favs.length) {
      out += '<h2 class="section-title reveal">' + icon('favorite') + 'Tes favoris</h2><div class="list-group">';
      favs.slice(0, 4).forEach((id) => {
        const e = ficheIndex.get(id); if (!e) return;
        out += listRow(e);
      });
      out += '</div>';
    }
    return out;
  }

  function listRow(e) {
    return '<a class="list-row reveal" href="#/fiche/' + e.fiche.id + '">' +
      '<span class="card-icon ' + langIconCls(e.lang) + '">' + icon(e.fiche.icon) + '</span>' +
      '<span class="list-row-text"><span class="list-row-title">' + High.esc(e.fiche.title) + '</span>' +
      '<span class="list-row-sub">' + DB[e.lang].name + ' · ' + e.cat.name + '</span></span>' +
      '<span class="material-symbols-rounded chevron">chevron_right</span></a>';
  }

  function viewLang(langId) {
    const L = DB[langId];
    document.body.setAttribute('data-lang', langId);
    let out = '<section class="hero view-anim">' +
      '<span class="hero-eyebrow">' + icon(L.icon) + ' ' + L.name + '</span>' +
      '<h1>' + High.esc(L.heroTitle).replace(/\*\*([^\*]+)\*\*/g,'<strong>$1</strong>') + '</h1>' +
      '<p class="lead">' + md(L.tagline) + '</p></section>' +
      '<div class="reveal" style="margin-bottom:20px">' +
        '<div class="segmented" id="lvl-filter">' +
          '<button class="on" data-lvl="">Tous</button>' +
          '<button data-lvl="debutant">Débutant</button>' +
          '<button data-lvl="intermediaire">Intermédiaire</button>' +
          '<button data-lvl="avance">Avancé</button>' +
        '</div></div>';
    L.categories.forEach((cat) => {
      out += '<div data-cat-wrap><h2 class="section-title reveal">' + icon(cat.icon) + cat.name + '</h2>' +
        '<div class="card-grid">' + cat.fiches.map((f) => ficheCard(f, langId)).join('') + '</div></div>';
    });
    return out;
  }

  function viewFiche(id) {
    const e = ficheIndex.get(id);
    if (!e) return '<div class="empty-state"><span class="big-ic material-symbols-rounded">search_off</span><h2>Fiche introuvable</h2><p>Cette fiche n\'existe pas (ou son identifiant a changé).</p><a class="btn" href="#/">Retour à l\'accueil</a></div>';
    const f = e.fiche, L = DB[e.lang];
    document.body.setAttribute('data-lang', e.lang);
    pushHist(id);

    const list = flatFiches(e.lang);
    const i = list.findIndex((x) => x.id === id);
    const prev = list[i - 1], next = list[i + 1];

    let out = '<nav class="breadcrumb view-anim" aria-label="Fil d\'Ariane"><a href="#/">Accueil</a>' + icon('chevron_right') +
      '<a href="#/' + e.lang + '">' + L.name + '</a>' + icon('chevron_right') + '<span>' + e.cat.name + '</span></nav>';

    out += '<header class="fiche-head view-anim">' +
      '<span class="card-icon ' + langIconCls(e.lang) + '">' + icon(f.icon) + '</span>' +
      '<div class="fiche-head-text"><h1>' + High.esc(f.title) + '</h1>' +
      '<div class="fiche-meta">' +
        '<span class="chip ' + lvlClass(f.level) + '">' + icon('school') + f.level + '</span>' +
        '<span class="chip">' + icon('schedule') + f.read + ' de lecture</span>' +
        '<span class="chip accent">' + icon('folder') + e.cat.name + '</span>' +
      '</div></div>' +
      '<button class="icon-btn fav-btn' + (isFav(id) ? ' on' : '') + '" data-fav="' + id + '" aria-label="Ajouter aux favoris" title="Favori">' +
        icon('favorite') + '</button></header>';

    out += '<p class="fiche-intro view-anim">' + md(f.intro) + '</p>';
    out += '<div class="fiche-body">' + (f.blocks || []).map(renderBlock).join('') + '</div>';

    if (f.errors && f.errors.length) {
      out += '<h2 class="section-title reveal">' + icon('error') + 'Erreurs fréquentes & pièges</h2>';
      f.errors.forEach((er) => {
        out += '<div class="err-card reveal"><div class="err-card-head">' + icon('bug_report') + High.esc(er.title) + '</div>' +
          (er.bad ? '<div class="err-bad"><span class="err-tag bad">✗ À éviter</span><pre>' + High.run(er.bad, er.lang || e.lang) + '</pre></div>' : '') +
          (er.good ? '<div class="err-good"><span class="err-tag good">✓ La bonne pratique</span><pre>' + High.run(er.good, er.lang || e.lang) + '</pre></div>' : '') +
          (er.why ? '<p class="err-why">' + icon('lightbulb') + md(er.why) + '</p>' : '') + '</div>';
      });
    }

    if (f.related && f.related.length) {
      out += '<h2 class="section-title reveal">' + icon('hub') + 'Notions liées</h2><div class="related-row reveal">';
      f.related.forEach((rid) => {
        const re = ficheIndex.get(rid); if (!re) return;
        out += '<a href="#/fiche/' + rid + '">' + icon(re.fiche.icon) + High.esc(re.fiche.title) + '</a>';
      });
      out += '</div>';
    }

    out += '<nav class="pager">' +
      (prev ? '<a href="#/fiche/' + prev.id + '"><small>← Précédent</small><span>' + High.esc(prev.title) + '</span></a>' : '<span></span>') +
      (next ? '<a class="next" href="#/fiche/' + next.id + '"><small>Suivant →</small><span>' + High.esc(next.title) + '</span></a>' : '<span></span>') +
      '</nav>';
    return out;
  }

  function viewFavoris() {
    document.body.removeAttribute('data-lang');
    if (!favs.length) {
      return '<div class="empty-state view-anim"><span class="big-ic material-symbols-rounded">heart_plus</span>' +
        '<h2>Aucun favori pour l\'instant</h2><p>Quand une notion mérite d\'être revue, touche l\'icône cœur en haut de sa fiche : elle t\'attendra ici.</p>' +
        '<a class="btn" href="#/">Explorer les fiches</a></div>';
    }
    let out = '<section class="hero view-anim"><span class="hero-eyebrow">' + icon('favorite') + ' Bibliothèque</span><h1>Tes favoris</h1>' +
      '<p class="lead">' + favs.length + ' notion' + (favs.length > 1 ? 's' : '') + ' à revoir. C\'est ton plan de révision personnalisé.</p></section><div class="list-group">';
    favs.forEach((id) => { const e = ficheIndex.get(id); if (e) out += listRow(e); });
    return out + '</div>';
  }

  function relTime(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'à l\'instant';
    if (s < 3600) return 'il y a ' + Math.floor(s / 60) + ' min';
    if (s < 86400) return 'il y a ' + Math.floor(s / 3600) + ' h';
    return 'il y a ' + Math.floor(s / 86400) + ' j';
  }

  function viewHistorique() {
    document.body.removeAttribute('data-lang');
    if (!hist.length) {
      return '<div class="empty-state view-anim"><span class="big-ic material-symbols-rounded">history</span>' +
        '<h2>Rien de consulté pour l\'instant</h2><p>Tes dernières lectures apparaîtront ici, pour reprendre instantanément un sujet en cours.</p>' +
        '<a class="btn" href="#/">Commencer à explorer</a></div>';
    }
    let out = '<section class="hero view-anim"><span class="hero-eyebrow">' + icon('history') + ' Bibliothèque</span><h1>Récemment consultés</h1></section><div class="list-group">';
    hist.forEach((h) => {
      const e = ficheIndex.get(h.id); if (!e) return;
      out += '<a class="list-row reveal" href="#/fiche/' + h.id + '">' +
        '<span class="card-icon ' + langIconCls(e.lang) + '">' + icon(e.fiche.icon) + '</span>' +
        '<span class="list-row-text"><span class="list-row-title">' + High.esc(e.fiche.title) + '</span>' +
        '<span class="list-row-sub">' + DB[e.lang].name + ' · ' + relTime(h.ts) + '</span></span>' +
        '<span class="material-symbols-rounded chevron">chevron_right</span></a>';
    });
    return out + '</div>';
  }

  /* ---------- Routeur ---------- */
  const TITLES = { home: 'Accueil', favoris: 'Favoris', historique: 'Récemment consultés' };

  function route() {
    if (!view) return; // sécurité : #view pas encore monté (rare, refresh extrêmement rapide)
    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    let html, key = 'home', title = 'Easy Learn';

    if (!parts.length) { html = viewHome(); }
    else if (parts[0] === 'fiche' && parts[1]) {
      html = viewFiche(parts[1]);
      const e = ficheIndex.get(parts[1]);
      title = e ? e.fiche.title : 'Introuvable'; key = e ? e.lang : '';
    }
    else if (DB[parts[0]]) { html = viewLang(parts[0]); key = parts[0]; title = DB[parts[0]].name; }
    else if (parts[0] === 'favoris') { html = viewFavoris(); key = 'favoris'; title = 'Favoris'; }
    else if (parts[0] === 'historique') { html = viewHistorique(); key = 'historique'; title = 'Récemment consultés'; }
    else { html = viewHome(); }

    view.innerHTML = html;
    observeReveals();
    window.scrollTo(0, 0);
    $('#topbar-title').textContent = TITLES[key] || title;
    document.title = title + ' — Easy Learn';

    document.querySelectorAll('[data-nav]').forEach((el) => {
      el.classList.toggle('active', el.dataset.nav === key || (key === '' && el.dataset.nav === 'home'));
    });

    // Filtre par niveau (page langage)
    const seg = $('#lvl-filter');
    if (seg) {
      seg.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button'); if (!btn) return;
        seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
        const lvl = btn.dataset.lvl;
        view.querySelectorAll('[data-cat-wrap]').forEach((wrap) => {
          let visible = 0;
          wrap.querySelectorAll('.fiche-card').forEach((card) => {
            const show = !lvl || card.dataset.level === lvl;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
          });
          wrap.style.display = visible ? '' : 'none';
        });
      });
    }
  }

  window.addEventListener('hashchange', route);

  /* ---------- Recherche Spotlight ---------- */
  const overlay = $('#search-overlay');
  const input = $('#search-input');
  const resultsBox = $('#search-results');

  function openSearch() {
    overlay.hidden = false;
    input.value = '';
    renderResults('');
    /* Focus fiable : un essai immédiat, puis un renfort après le reflow
       de l'overlay (certains navigateurs ignorent focus() tant que le
       panneau vient d'être révélé), avec sélection du texte pour pouvoir
       taper directement par-dessus — comportement Spotlight. */
    input.focus({ preventScroll: true });
    input.select();
    requestAnimationFrame(() => { input.focus({ preventScroll: true }); input.select(); });
    setTimeout(() => { input.focus({ preventScroll: true }); input.select(); }, 60);
  }
  function closeSearch() { overlay.hidden = true; }

  ['#open-search-side', '#open-search-top', '#open-search-tab'].forEach((sel) => {
    const el = $(sel); if (el) el.addEventListener('click', openSearch);
  });
  $('#search-close').addEventListener('click', closeSearch);
  $('#search-backdrop').addEventListener('click', closeSearch);

  function snippet(item, q) {
    const i = norm(item.raw).indexOf(q);
    if (i < 0) return '';
    const start = Math.max(0, i - 42);
    return (start > 0 ? '…' : '') + item.raw.slice(start, i + q.length + 60).trim() + '…';
  }

  function renderResults(q) {
    const query = norm(q.trim());
    if (!query) {
      const sug = hist.slice(0, 4).map((h) => ficheIndex.get(h.id)).filter(Boolean);
      resultsBox.innerHTML = (sug.length
        ? '<div style="padding:8px 12px 4px;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3)">Consultés récemment</div>'
        : '') + (sug.length ? sug.map(resultRow).join('') :
        '<div class="search-empty"><span class="material-symbols-rounded">travel_explore</span>Tape pour chercher dans les ' + searchIndex.length + ' fiches — titres <em>et</em> contenus.</div>');
      return;
    }
    const scored = [];
    searchIndex.forEach((item) => {
      const t = norm(item.title);
      let score = -1;
      if (t.startsWith(query)) score = 100;
      else if (t.includes(query)) score = 60;
      else if (item.text.includes(query)) score = 20;
      if (score >= 0) scored.push({ item: item, score: score });
    });
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 12);
    resultsBox.innerHTML = top.length
      ? top.map((s) => resultRow(s.item, snippet(s.item, query))).join('')
      : '<div class="search-empty"><span class="material-symbols-rounded">search_off</span>Aucun résultat pour « ' + High.esc(q) + ' ».<br>Essaie un terme plus général (ex. « flexbox », « formulaire », « tableau »).</div>';
    resultsBox.dataset.first = top.length ? top[0].item.id : '';
  }

  function resultRow(item, snip) {
    return '<a class="search-result" href="#/fiche/' + item.id + '">' +
      '<span class="card-icon ' + langIconCls(item.lang) + '">' + icon(item.icon) + '</span>' +
      '<span class="search-result-text"><span class="search-result-title">' + High.esc(item.title) + '</span>' +
      (snip ? '<span class="search-result-snippet">' + High.esc(snip) + '</span>' : '<span class="search-result-snippet">' + item.catName + '</span>') +
      '</span><span class="search-result-hint">' + DB[item.lang].name + '</span></a>';
  }

  input.addEventListener('input', () => renderResults(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && resultsBox.dataset.first) {
      location.hash = '#/fiche/' + resultsBox.dataset.first;
      closeSearch();
    }
  });
  resultsBox.addEventListener('click', (e) => { if (e.target.closest('a')) closeSearch(); });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? openSearch() : closeSearch(); }
    if (e.key === 'Escape' && !overlay.hidden) closeSearch();
  });

  /* ---------- Délégation : copier & favoris ---------- */
  document.addEventListener('click', (e) => {
    const copy = e.target.closest('[data-copy]');
    if (copy) {
      const pre = copy.closest('.codeblock, .err-card, .err-bad, .err-good');
      const code = (pre && (pre.querySelector('pre code') || pre.querySelector('pre'))) || copy.parentElement.nextElementSibling;
      const text = code ? code.textContent : '';
      navigator.clipboard.writeText(text).then(
        () => { toast('Code copié dans le presse-papiers', 'content_copy'); },
        () => toast('Copie impossible dans ce navigateur', 'error')
      );
      return;
    }
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      toggleFav(fav.dataset.fav);
      fav.classList.toggle('on', isFav(fav.dataset.fav));
    }
  });

  /* ---------- Init ---------- */
  refreshCounts();

  /* Garantit que la route initiale s'exécute APRÈS que le DOM soit prêt,
     même si les scripts chargent dans un ordre non déterministe
     (cache navigateur, chargement différé, ordre réseau aléatoire).
     Sans cette précaution, un refresh sur #/fiche/xxx peut afficher
     une page noire car #view n'existe pas encore. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', route);
    // Double filet : si DOMContentLoaded a déjà eu lieu (bordure IE11/WebView),
    // requestAnimationFrame garantit que le DOM est peint avant route()
    requestAnimationFrame(function () {
      if (!view || !view.innerHTML) route();
    });
  } else {
    route();
  }

  /* ---------- Capacitor : bouton retour Android ---------- */
  // En environnement Capacitor, le bouton retour matériel doit naviguer
  // dans l'historique de l'app au lieu de la fermer.
  if (typeof window !== 'undefined' && window.Capacitor) {
    try {
      var App = window.Capacitor.Plugins.App || window.CapacitorApp;
      if (App) {
        App.addListener('backButton', function (e) {
          // Si la recherche est ouverte → fermer la recherche
          var overlay = document.getElementById('search-overlay');
          if (overlay && !overlay.hasAttribute('hidden')) {
            closeSearch();
            return;
          }
          // Si on peut revenir dans l'historique navigateur → go back
          if (window.history.length > 1) {
            window.history.back();
          } else {
            // Sinon, on est à la racine → laisser le comportement par défaut (quitter)
            // En décommentant la ligne ci-dessous, on peut forcer à rester :
            // e && e.preventDefault && e.preventDefault();
          }
        });
      }
    } catch (ignored) { /* Capacitor non disponible — navigation web classique */ }
  }
})();
