/* ============================================================
   exo-app.js — Module « Ateliers Pratiques » (Premium)
   ------------------------------------------------------------
   Vues : hub (#/application), page module (#/application/<mod>),
   détail (#/application/<mod>/<exo>), paywall (#/application/premium).
   Progression : localStorage 'dd-exo-progress-v1'.
   Verrouillage : délégué à premium.js (remplaçable par un vrai
   backend plus tard sans toucher à ce fichier).
   ============================================================ */
(function () {
  'use strict';

  var MODULE_ORDER = ['html', 'css', 'js', 'ts', 'react', 'tailwind', 'php', 'laravel', 'tanstack', 'python', 'flask', 'django', 'vue', 'rn', 'node', 'c', 'java'];
  var LEVELS = [
    { id: 'fonda', name: 'Fondamentaux', icon: 'school', cls: 'xo-fonda' },
    { id: 'inter', name: 'Intermédiaires', icon: 'trending_up', cls: 'xo-inter' },
    { id: 'projet', name: 'Projet réel', icon: 'flag', cls: 'xo-projet' }
  ];
  var ICON_CLS = {
    html: 'ic-html', css: 'ic-css', js: 'ic-js', ts: 'ic-ts', react: 'ic-react', tailwind: 'ic-tailwind',
    php: 'ic-php', laravel: 'ic-laravel', tanstack: 'ic-tanstack', python: 'ic-python', flask: 'ic-flask',
    django: 'ic-django', vue: 'ic-vue', rn: 'ic-rn', node: 'ic-node', c: 'ic-c', java: 'ic-java'
  };
  var LEVEL_META = {}; LEVELS.forEach(function (l) { LEVEL_META[l.id] = l; });

  /* Familles du hub : les 17 modules regroupés pour que chaque
     langage saute aux yeux (rien ne semble « manquer »). */
  var GROUPS = [
    { id: 'web', name: 'Front-end', icon: 'web', mods: ['html', 'css', 'js', 'ts', 'react', 'tailwind', 'vue'] },
    { id: 'back', name: 'Back-end & données', icon: 'dns', mods: ['php', 'laravel', 'tanstack', 'python', 'flask', 'django', 'node'] },
    { id: 'native', name: 'Mobile & bas niveau', icon: 'smartphone', mods: ['rn', 'c', 'java'] }
  ];

  /* ---------- Accès données ---------- */
  function X() { return window.DEVDOCS_EXO || {}; }
  function modules() { return MODULE_ORDER.filter(function (m) { return X()[m] && X()[m].list && X()[m].list.length; }); }
  function exoById(mod, id) {
    var list = (X()[mod] && X()[mod].list) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---------- Helpers rendu ---------- */
  var esc = function (s) { return High.esc(String(s)); };
  function icon(name, cls) { return '<span class="material-symbols-rounded' + (cls ? ' ' + cls : '') + '">' + name + '</span>'; }
  function md(text) {
    var parts = String(text).split(/`([^`]+)`/g);
    return parts.map(function (p, i) {
      return i % 2 ? '<code class="inline">' + esc(p) + '</code>' : p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }).join('');
  }
  /* Rendu structuré de l'énoncé : intro en paragraphes, étapes
     numérotées en liste iOS à puces chiffrées, épilogue « Ce qui est
     évalué » en encadré accent — le tout déduit du texte brut. */
  function stmtHtml(e) {
    var stepRe = /^(\d+)\.\s+(.*)$/;
    return e.statement.split('\n\n').map(function (block, bi) {
      var trimmed = block.trim();
      // Épilogue pédagogique → encadré accent
      if (/^Ce qui est évalué/.test(trimmed)) {
        return '<aside class="stmt-focus reveal">' + icon('center_focus_strong') +
          '<div><span class="stmt-focus-label">Ce qui est évalué</span>' +
          '<p>' + md(trimmed.replace(/^Ce qui est évalué\s*:\s*/, '')) + '</p></div></aside>';
      }
      var lines = trimmed.split('\n');
      var hasSteps = lines.some(function (l) { return stepRe.test(l); });
      // Paragraphe simple → typographie courante
      if (!hasSteps) {
        return '<p class="stmt reveal' + (bi === 0 ? ' stmt-lead' : '') + '">' + md(trimmed) + '</p>';
      }
      // Bloc d'étapes : intro éventuelle + puces numérotées
      var intro = [], steps = [];
      lines.forEach(function (l) {
        var mt = l.match(stepRe);
        if (mt) steps.push({ n: mt[1], text: mt[2] });
        else if (!steps.length) intro.push(l.trim());
        else steps[steps.length - 1].text += ' ' + l.trim();
      });
      return (intro.length ? '<p class="stmt stmt-lead reveal">' + md(intro.join(' ')) + '</p>' : '') +
        '<ol class="stmt-steps reveal">' + steps.map(function (s) {
          return '<li><span class="st-n">' + s.n + '</span><span class="st-t">' + md(s.text) + '</span></li>';
        }).join('') + '</ol>';
    }).join('');
  }
  var toastTimer = null;
  function toast(msg, ic) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.innerHTML = icon(ic || 'check_circle') + '<span>' + msg + '</span>';
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }
  function ring(pct, size, sw, color) {
    var r = (size - sw) / 2, c = 2 * Math.PI * r;
    var off = c * (1 - Math.min(1, Math.max(0, pct)));
    return '<span class="ring-wrap" style="color:' + color + ';width:' + size + 'px;height:' + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '" aria-hidden="true">' +
      '<circle class="ring-track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="' + sw + '"/>' +
      '<circle class="ring-fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg>' +
      '<span class="ring-label" style="font-size:' + Math.max(10, Math.round(size / 4.4)) + 'px">' + Math.round(pct * 100) + '%</span></span>';
  }
  function levelChip(lid) {
    var m = LEVEL_META[lid];
    return '<span class="chip xo-lvl ' + m.cls + '">' + icon(m.icon) + m.name + '</span>';
  }
  /* Pastille de niveau pour les héros sombres (icône néon + verre dépoli) */
  function mhLevelChip(lid) {
    var m = LEVEL_META[lid];
    return '<span class="mh-chip"><span class="material-symbols-rounded mh-lv-' + lid + '">' + m.icon + '</span>' + m.name + '</span>';
  }
  /* « Tests auto » (atelier intégré) vs « Auto-évaluation » (local) */
  function modKindChip(m) {
    var dom = X()[m].list.some(function (e) { return e.kind === 'dom'; });
    return dom
      ? '<span class="mod-kind auto">' + icon('bolt') + 'Tests auto</span>'
      : '<span class="mod-kind local">' + icon('terminal') + 'Auto-évaluation</span>';
  }
  function tierBadge(tier, compact) {
    if (!tier) return '';
    var labels = { bronze: 'Palier Bronze', silver: 'Palier Argent', gold: 'Palier Or' };
    return '<span class="tier-badge ' + tier + '">' + icon('military_tech') + (compact ? '' : labels[tier]) + '</span>';
  }

  /* ---------- Progression (localStorage) ---------- */
  var PKEY = 'dd-exo-progress-v1';
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; }
  }
  var progress = loadProgress();
  function save() { try { localStorage.setItem(PKEY, JSON.stringify(progress)); } catch (e) { /* quota */ } }
  function blank() { return { a: 0, h: 0, s: false, c: [], done: false, t: 0 }; }
  function peek(id) { return progress[id] || blank(); }
  function rec(id) { if (!progress[id]) progress[id] = blank(); return progress[id]; }
  function attempted(e) { var p = peek(e.id); return p.done || p.a > 0 || (p.c || []).some(Boolean); }
  function statusOf(e) {
    var p = peek(e.id);
    if (p.done) return 'done';
    if (p.a > 0 || (p.c || []).some(Boolean)) return 'progress';
    return 'new';
  }
  function accessible(e) { return !!e.free || Premium.isUnlocked(); }
  function markDone(e) {
    var p = rec(e.id);
    if (p.done) { save(); return; }
    p.done = true; p.t = Date.now(); save();
    toast('Atelier réussi : ' + e.title, 'task_alt');
  }

  function modStats(m) {
    var o = { total: 0, done: 0 };
    LEVELS.forEach(function (l) { o[l.id] = { t: 0, d: 0 }; });
    X()[m].list.forEach(function (e) {
      o.total++; o[e.level].t++;
      if (peek(e.id).done) { o.done++; o[e.level].d++; }
    });
    o.tier = null;
    if (o.fonda.t && o.fonda.d === o.fonda.t) o.tier = 'bronze';
    if (o.tier === 'bronze' && o.inter.t && o.inter.d === o.inter.t) o.tier = 'silver';
    if (o.tier === 'silver' && o.projet.t && o.projet.d === o.projet.t) o.tier = 'gold';
    o.pct = o.total ? o.done / o.total : 0;
    return o;
  }

  /* Titres des fiches théoriques (liens « Réviser la théorie ») */
  var ficheMap = null;
  function ficheInfo(id) {
    if (!ficheMap) {
      ficheMap = {};
      var DB = window.DEVDOCS || {};
      Object.keys(DB).forEach(function (k) {
        (DB[k].categories || []).forEach(function (cat) {
          (cat.fiches || []).forEach(function (f) { ficheMap[f.id] = { title: f.title, icon: f.icon, lang: k }; });
        });
      });
    }
    return ficheMap[id];
  }

  /* ============================================================
     VUES
     ============================================================ */
  var lastLocked = null; // retour après activation Premium

  function promoBanner() {
    return '<div class="promo-banner view-anim">' +
      '<span class="promo-ic material-symbols-rounded">workspace_premium</span>' +
      '<span class="promo-text"><strong>Passe au niveau supérieur avec Premium</strong>' +
      '<span>Tous les ateliers, tous les modules : ateliers de code, indices progressifs, solutions commentées et badges de progression.</span></span>' +
      '<a class="btn" href="#/application/premium">' + icon('lock_open') + '<span>Débloquer Premium</span></a></div>';
  }

  /* Carte module du hub : bandeau aux couleurs du langage, anneau
     de progression, pastille du mode de correction. */
  function modCard(m) {
    var L = DEVDOCS[m], s = modStats(m);
    var freeCount = X()[m].list.filter(function (e) { return e.free; }).length;
    return '<a class="exo-mod-card" data-exo-mod-card data-name="' + esc((L.name + ' ' + m).toLowerCase()) + '"' +
      ' style="--mc:var(--c-' + m + ')" href="#/application/' + m + '">' +
      '<span class="exo-mod-head"><span class="card-icon ' + ICON_CLS[m] + '">' + icon(L.icon) + '</span>' +
      '<span class="mod-head-text"><span class="mod-name">' + esc(L.name) + '</span>' +
      '<span class="mod-sub">' + s.total + ' ateliers · 3 niveaux</span></span>' +
      ring(s.pct, 46, 5, 'var(--mc)') + '</span>' +
      '<span class="mod-track" aria-hidden="true"><i style="width:' + Math.round(s.pct * 100) + '%"></i></span>' +
      '<span class="exo-mod-foot">' + modKindChip(m) +
      (s.done
        ? '<span class="mod-progress">' + s.done + '/' + s.total + ' réussis</span>'
        : '<span class="mod-progress dim">Pas encore commencé</span>') +
      '<span class="spacer"></span>' + tierBadge(s.tier, true) +
      (Premium.isUnlocked() ? '' : '<span class="free-chip" title="Atelier(s) accessible(s) sans Premium">' + icon('lock_open') + freeCount + ' gratuit</span>') +
      '</span></a>';
  }

  function hubView() {
    var ms = modules(), tot = 0, done = 0, free = 0;
    var lvlAgg = {}; LEVELS.forEach(function (l) { lvlAgg[l.id] = { t: 0, d: 0 }; });
    ms.forEach(function (m) {
      var s = modStats(m); tot += s.total; done += s.done;
      LEVELS.forEach(function (l) { lvlAgg[l.id].t += s[l.id].t; lvlAgg[l.id].d += s[l.id].d; });
      X()[m].list.forEach(function (e) { if (e.free) free++; });
    });
    var premium = Premium.isUnlocked();

    /* Héro premium sombre — l'écran d'accueil des ateliers */
    var html = '<section class="exo-hero view-anim">' +
      '<span class="exo-hero-art material-symbols-rounded" aria-hidden="true">code_blocks</span>' +
      '<span class="exo-hero-eyebrow">' + icon('military_tech') + ' Ateliers pratiques</span>' +
      '<h1>Prouve ta maîtrise<br>en codant.</h1>' +
      '<p class="lead">La documentation t\'a appris les notions : ici, tu les mets en œuvre. Des ateliers progressifs — Fondamentaux, Intermédiaires, Projets réels — adossés à chaque module de la doc.</p>' +
      '<div class="exo-hero-stats">' +
      '<span class="exo-hero-stat">' + icon('format_list_numbered') + '<span><strong>' + tot + '</strong> ateliers</span></span>' +
      '<span class="exo-hero-stat">' + icon('layers') + '<span><strong>' + ms.length + '</strong> modules</span></span>' +
      (premium
        ? '<span class="exo-hero-stat is-premium">' + icon('workspace_premium') + '<span><strong>Premium</strong> actif</span></span>'
        : '<span class="exo-hero-stat is-premium">' + icon('lock_open') + '<span><strong>' + free + '</strong> gratuits</span></span>') +
      '</div></section>';

    if (!premium) html += promoBanner();

    /* Progression globale : un anneau par niveau, façon Activité iOS */
    html += '<section class="exo-progress view-anim">' +
      '<div class="exo-progress-head"><span class="material-symbols-rounded">donut_large</span>' +
      '<span><strong>Ta progression</strong>' +
      '<span>' + done + ' atelier' + (done > 1 ? 's' : '') + ' réussi' + (done > 1 ? 's' : '') + ' sur ' + tot +
      ' — chaque test qui passe est une compétence de plus en poche.</span></span></div>' +
      '<div class="exo-progress-rings">' +
      LEVELS.map(function (l) {
        var a = lvlAgg[l.id];
        return '<span class="pr-item">' + ring(a.t ? a.d / a.t : 0, 74, 8, 'var(--lv-' + l.id + ')') +
          '<span class="pr-lab"><strong style="color:var(--lv-' + l.id + ')">' + a.d + '/' + a.t + '</strong>' + l.name + '</span></span>';
      }).join('') +
      '</div>' +
      '<div class="exo-progress-bar" aria-hidden="true"><i style="width:' + (tot ? Math.round(done / tot * 100) : 0) + '%"></i></div>' +
      '</section>';

    /* Reprendre */
    var resume = null, latest = 0, mid = null;
    modules().forEach(function (m) {
      X()[m].list.forEach(function (e) {
        var p = peek(e.id);
        if (!p.done && p.t > latest && (p.a > 0 || (p.c || []).some(Boolean))) { latest = p.t; resume = e; mid = m; }
      });
    });
    if (resume) {
      html += '<a class="list-row view-anim" href="#/application/' + mid + '/' + resume.id + '" style="margin-bottom:26px">' +
        '<span class="card-icon ' + ICON_CLS[mid] + '">' + icon('resume') + '</span>' +
        '<span class="list-row-text"><span class="list-row-sub">Reprendre ton atelier en cours</span>' +
        '<span class="list-row-title">' + esc(resume.title) + '</span></span>' +
        '<span class="material-symbols-rounded chevron">chevron_right</span></a>';
    }

    /* Recherche + familles de modules */
    html += '<div class="exo-search view-anim"><span class="material-symbols-rounded">search</span>' +
      '<input type="search" data-exo-search placeholder="Filtrer les modules (ex. React, Django, C…)"></div>';

    GROUPS.forEach(function (g) {
      var gmods = g.mods.filter(function (m) { return ms.indexOf(m) >= 0; });
      if (!gmods.length) return;
      var gTot = 0, gDone = 0;
      gmods.forEach(function (m) { var s = modStats(m); gTot += s.total; gDone += s.done; });
      html += '<div class="exo-group" data-exo-group>' +
        '<h3 class="exo-group-label view-anim"><span class="material-symbols-rounded">' + g.icon + '</span>' + g.name +
        '<span class="exo-group-sub">' + gmods.length + ' modules · ' + gTot + ' ateliers' + (gDone ? ' · ' + gDone + ' réussis' : '') + '</span></h3>' +
        '<div class="card-grid">' + gmods.map(modCard).join('') + '</div></div>';
    });
    html += '<p class="exo-empty" data-exo-empty hidden><span class="material-symbols-rounded">search_off</span>' +
      'Aucun module ne correspond — essaie « JavaScript », « Laravel », « Python »…</p>';
    return html;
  }

  function exoCard(m, e) {
    var st = statusOf(e), acc = accessible(e), p = peek(e.id);
    var statIcon = st === 'done' ? 'task_alt' : (st === 'progress' ? 'timelapse' : (acc ? 'play_circle' : 'lock'));
    var snippet = e.context.length > 118 ? e.context.slice(0, 115) + '…' : e.context;
    var kindChip = e.kind === 'dom'
      ? '<span class="chip">' + icon('task_alt') + e.tests.length + ' tests</span>'
      : '<span class="chip">' + icon('fact_check') + e.checklist.length + ' points</span>';
    return '<a class="exo-card ' + st + '" data-level="' + e.level + '" style="--lc:var(--lv-' + e.level + ')" href="#/application/' + m + '/' + e.id + '">' +
      '<span class="exo-card-top"><span class="exo-stat' + (acc ? '' : ' lock-ic') + '">' + icon(statIcon) + '</span>' +
      '<span class="exo-title">' + esc(e.title) + '</span></span>' +
      '<p class="exo-context">' + esc(snippet) + '</p>' +
      '<span class="exo-card-foot">' + levelChip(e.level) +
      '<span class="chip">' + icon('schedule') + '≈ ' + e.minutes + ' min</span>' + kindChip +
      '<span class="spacer"></span>' +
      (e.free ? '<span class="free-chip">' + icon('lock_open') + 'Gratuit</span>' : (!Premium.isUnlocked() ? '<span class="badge-premium">' + icon('workspace_premium') + 'Premium</span>' : '')) +
      (p.done ? '<span class="free-chip">' + icon('task_alt') + 'Réussi</span>' : '') +
      '</span></a>';
  }

  function moduleView(m) {
    var L = DEVDOCS[m], s = modStats(m);
    var domKind = X()[m].list.some(function (e) { return e.kind === 'dom'; });
    var html = '<nav class="breadcrumb view-anim" aria-label="Fil d\'Ariane"><a href="#/application">Ateliers</a>' + icon('chevron_right') + '<span>' + esc(L.name) + '</span></nav>';
    /* Héro en dégradé aux couleurs du langage — fini le « tout blanc » */
    html += '<header class="exo-mod-hero view-anim" style="--mc:var(--c-' + m + ')">' +
      '<span class="mh-icon material-symbols-rounded">' + L.icon + '</span>' +
      '<div class="mh-text"><h1>Ateliers ' + esc(L.name) + '</h1>' +
      '<p>Progression en trois temps : <strong>Fondamentaux</strong> (une notion à la fois), <strong>Intermédiaires</strong> (plusieurs notions combinées), puis un <strong>Projet réel</strong> qui ressemble à un vrai travail de développeur.</p>' +
      '<div class="mh-chips">' +
      '<span class="mh-chip">' + icon('format_list_numbered') + s.total + ' ateliers</span>' +
      '<span class="mh-chip">' + icon('task_alt') + s.done + ' réussi' + (s.done > 1 ? 's' : '') + '</span>' +
      (domKind
        ? '<span class="mh-chip">' + icon('bolt') + 'Tests auto dans le navigateur</span>'
        : '<span class="mh-chip">' + icon('terminal') + 'Auto-évaluation en local</span>') +
      tierBadge(s.tier) +
      '</div></div>' + ring(s.pct, 64, 7, '#ffffff') + '</header>';

    html += '<div class="reveal" style="margin-bottom:20px"><div class="segmented" id="xo-lvl-filter">' +
      '<button class="on" data-xo-lvl="">Tous</button>' +
      '<button data-xo-lvl="fonda">Fondamentaux</button>' +
      '<button data-xo-lvl="inter">Intermédiaires</button>' +
      '<button data-xo-lvl="projet">Projet réel</button></div></div>';

    LEVELS.forEach(function (lvl) {
      var list = X()[m].list.filter(function (e) { return e.level === lvl.id; });
      if (!list.length) return;
      html += '<div data-xo-wrap="' + lvl.id + '"><h2 class="section-title reveal">' + icon(lvl.icon, 'lv-ic ' + lvl.id) + lvl.name +
        '<span style="font-size:13px;color:var(--text-3);font-weight:600;margin-left:4px">' + s[lvl.id].d + '/' + s[lvl.id].t + ' réussis</span></h2>' +
        '<div class="card-grid">' + list.map(function (e) { return exoCard(m, e); }).join('') + '</div></div>';
    });
    return html;
  }

  /* ---------- Détail ---------- */
  function statusChip(st) {
    if (st === 'done') return '<span class="exo-status-chip done" data-status-chip>' + icon('task_alt') + 'Réussi</span>';
    if (st === 'progress') return '<span class="exo-status-chip progress" data-status-chip>' + icon('timelapse') + 'En cours</span>';
    return '<span class="exo-status-chip" data-status-chip>' + icon('radio_button_unchecked') + 'À faire</span>';
  }

  function hintsHtml(e) {
    var p = peek(e.id);
    var html = '';
    for (var i = 0; i < Math.min(p.h, e.hints.length); i++) {
      html += '<div class="hint-card" style="margin-bottom:10px">' + icon('emoji_objects') + '<span><strong>Indice ' + (i + 1) + '</strong> — ' + md(e.hints[i]) + '</span></div>';
    }
    if (p.h < e.hints.length) {
      html += '<button type="button" class="btn ghost small" data-hint>' + icon('lightbulb') + '<span>Révéler l\'indice ' + (p.h + 1) + ' sur ' + e.hints.length + '</span></button>';
    } else {
      html += '<p style="font-size:13px;color:var(--text-2);margin:6px 2px 0">' + icon('psychology') + ' Tous les indices sont révélés. La solution, elle, ne se débloque qu\'après une vraie tentative.</p>';
    }
    return html;
  }

  function solZoneHtml(e) {
    var p = peek(e.id);
    if (p.s) {
      var label = e.solution.label || 'Solution';
      return '<div class="solution-block">' +
        '<figure class="codeblock reveal"><figcaption class="codeblock-header">' +
        '<span class="codeblock-dots"><i></i><i></i><i></i></span>' +
        '<span class="codeblock-label">' + esc(label) + '</span>' +
        '<button class="copy-btn" data-copy type="button">' + icon('content_copy') + '<span>Copier</span></button></figcaption>' +
        '<pre><code>' + High.run(e.solution.code, e.solution.lang || 'js') + '</code></pre></figure>' +
        '<h3 style="margin:18px 4px 8px;font-size:17px">' + icon('school') + ' Pourquoi cette solution</h3>' +
        e.solution.explain.split('\n\n').map(function (par) { return '<p class="reveal" style="font-size:14.5px;line-height:1.65;color:var(--text-2)">' + md(par) + '</p>'; }).join('') +
        '</div>';
    }
    if (!attempted(e)) {
      return '<div class="sol-gate" data-sol-gate>' + icon('lock') +
        '<span class="sol-text"><strong>La solution se mérite.</strong>Fais d\'abord une vraie tentative : ' +
        (e.kind === 'dom' ? 'écris du code et lance les tests au moins une fois.' : 'teste ton travail en local et coche au moins un point de la checklist.') +
        ' C\'est l\'effort qui installe la compétence, pas la lecture de la réponse.</span>' +
        '<button type="button" class="btn ghost small" disabled>' + icon('visibility') + '<span>Voir la solution</span></button></div>';
    }
    return '<div class="sol-gate" data-sol-gate>' + icon('key') +
      '<span class="sol-text"><strong>Tentative enregistrée.</strong>Tu peux maintenant comparer avec la solution modèle — mais un second essai avant de regarder te fera progresser deux fois plus vite.</span>' +
      '<button type="button" class="btn ghost small" data-solution>' + icon('visibility') + '<span>Voir la solution</span></button></div>';
  }

  function checklistHtml(e) {
    var p = peek(e.id), checks = p.c || [];
    var n = e.checklist.length, done = checks.filter(Boolean).length;
    var html = '<div class="check-panel" data-check-panel>' +
      '<div class="check-panel-head">' + icon('fact_check') + '<span>Auto-évaluation honnête</span>' +
      '<span class="bar"><i style="width:' + Math.round(done / n * 100) + '%"></i></span>' +
      '<span class="cnt">' + done + '/' + n + '</span></div>';
    e.checklist.forEach(function (item, i) {
      html += '<label class="check-item"><input type="checkbox" data-check="' + i + '"' + (checks[i] ? ' checked' : '') + '>' +
        '<span class="chk material-symbols-rounded">check</span>' +
        '<span class="chk-text">' + md(item) + '</span></label>';
    });
    html += '<div class="check-panel-foot"><span class="note">' + icon('terminal') +
      ' Exécute ton programme en local, teste réellement chaque point, puis coche-le. Quand tout est vert, valide l\'atelier.</span>' +
      '<button type="button" class="btn small" data-complete' + (done === n ? '' : ' disabled') + '>' + icon('flag') + '<span>J\'ai terminé cet atelier</span></button></div></div>';
    return html;
  }

  function lockedZone(e) {
    lastLocked = location.hash;
    var skel = '<div class="skel" style="height:36px;margin-bottom:12px;width:55%"></div>' +
      '<div class="skel" style="height:15px;margin-bottom:8px"></div>' +
      '<div class="skel" style="height:15px;margin-bottom:8px;width:82%"></div>' +
      '<div class="skel" style="height:170px;margin:16px 0"></div>' +
      '<div class="skel" style="height:15px;margin-bottom:8px;width:70%"></div>' +
      '<div class="skel" style="height:15px;margin-bottom:8px;width:64%"></div>' +
      '<div class="skel" style="height:42px;width:220px;border-radius:999px"></div>';
    return '<div class="locked-zone view-anim"><div class="locked-blur" aria-hidden="true">' + skel + '</div>' +
      '<div class="lock-overlay"><div class="lock-card">' +
      '<span class="lock-ic-big material-symbols-rounded">workspace_premium</span>' +
      '<h3>Atelier réservé à Premium</h3>' +
      '<p>L\'énoncé est visible pour te mettre en appétit. L\'atelier de code, les indices progressifs et la solution commentée se débloquent avec Premium.</p>' +
      '<a class="btn" href="#/application/premium">' + icon('lock_open') + '<span>Débloquer Premium</span></a>' +
      '<p style="margin:12px 0 0;font-size:12px">Chaque module offre 1 atelier Fondamentaux gratuit.</p>' +
      '</div></div></div>';
  }

  function detailView(m, e) {
    var L = DEVDOCS[m], acc = accessible(e), st = statusOf(e);
    var html = '<nav class="breadcrumb view-anim" aria-label="Fil d\'Ariane"><a href="#/application">Ateliers</a>' + icon('chevron_right') +
      '<a href="#/application/' + m + '">' + esc(L.name) + '</a>' + icon('chevron_right') + '<span>' + esc(e.title) + '</span></nav>';

    /* Héro en dégradé aux couleurs du langage (chips givrées) */
    html += '<header class="exo-mod-hero exo-detail-hero view-anim" style="--mc:var(--c-' + m + ')">' +
      '<span class="mh-icon material-symbols-rounded">' + e.icon + '</span>' +
      '<div class="mh-text"><h1>' + esc(e.title) + '</h1>' +
      '<div class="mh-chips">' + mhLevelChip(e.level) +
      '<span class="mh-chip">' + icon('schedule') + '≈ ' + e.minutes + ' min</span>' +
      (e.kind === 'dom'
        ? '<span class="mh-chip">' + icon('bolt') + e.tests.length + ' tests auto</span>'
        : '<span class="mh-chip">' + icon('checklist') + e.checklist.length + ' points à valider</span>') +
      (e.free ? '<span class="free-chip">' + icon('lock_open') + 'Gratuit</span>' : '<span class="badge-premium">' + icon('workspace_premium') + 'Premium</span>') +
      statusChip(st) + '</div></div></header>';

    html += '<div class="exo-context view-anim"><span class="ctx-ic material-symbols-rounded">person_pin_circle</span><p>' + md(e.context) + '</p></div>';

    html += '<h2 class="section-title reveal">' + icon('article') + 'Énoncé</h2>';
    html += stmtHtml(e);

    if (e.setup) {
      html += '<aside class="callout info reveal">' + icon('construction') + '<div>' + md(e.setup) + '</div></aside>';
    }

    html += '<h2 class="section-title reveal">' + icon('rule') + 'Contraintes à respecter</h2>' +
      '<div class="exo-panel cons reveal"><ul class="exo-list cons">' + e.constraints.map(function (c) {
        return '<li>' + icon('check_small') + '<span>' + md(c) + '</span></li>';
      }).join('') + '</ul></div>';

    html += '<h2 class="section-title reveal">' + icon('flag') + 'Critères de réussite</h2>' +
      '<div class="exo-panel crit reveal"><ul class="exo-list crit">' + e.criteria.map(function (c) {
        return '<li>' + icon('task_alt') + '<span>' + md(c) + '</span></li>';
      }).join('') + '</ul></div>';

    if (!acc) {
      html += '<h2 class="section-title reveal">' + icon('terminal') + 'Atelier</h2>' + lockedZone(e);
      return html;
    }

    if (e.hints && e.hints.length) {
      html += '<h2 class="section-title reveal">' + icon('lightbulb') + 'Bloqué ? Indices progressifs</h2>' +
        '<div id="xo-hints" class="reveal">' + hintsHtml(e) + '</div>';
    }

    if (e.kind === 'dom') {
      html += '<h2 class="section-title reveal">' + icon('terminal') + 'Atelier de code</h2>' +
        '<p class="reveal" style="font-size:14px;color:var(--text-2);margin:-6px 4px 14px">Code directement ici, lance les tests, corrige, recommence. La persévérance est notée, pas la vitesse.</p>' +
        '<div id="exo-runner" class="reveal"></div>';
    } else {
      html += '<h2 class="section-title reveal">' + icon('checklist') + 'Valide ton travail en local</h2>' +
        '<div class="reveal" data-check-wrap>' + checklistHtml(e) + '</div>' +
        '<p class="reveal" style="font-size:12.5px;color:var(--text-3);margin:10px 4px 0;display:flex;gap:7px;align-items:flex-start">' +
        icon('cloud') + '<span>Exécuter du code serveur n\'est pas possible dans un site statique : cette auto-évaluation honnête fait office de validation. <strong>Extension prévue</strong> : brancher une API d\'exécution de code (type Judge0) pour tester automatiquement les langages serveur — voir le README du projet.</span></p>';
    }

    html += '<h2 class="section-title reveal">' + icon('key') + 'Solution modèle commentée</h2>' +
      '<div id="sol-zone" class="reveal">' + solZoneHtml(e) + '</div>';

    if (e.variants && e.variants.length) {
      html += '<h2 class="section-title reveal">' + icon('military_tech') + 'Pour aller plus loin</h2>' +
        '<div class="exo-panel bonus reveal"><ul class="exo-list bonus">' + e.variants.map(function (v) {
          return '<li>' + icon('add_task') + '<span>' + md(v) + '</span></li>';
        }).join('') + '</ul></div>';
    }

    if (e.related && e.related.length) {
      var links = '';
      e.related.forEach(function (rid) {
        var f = ficheInfo(rid);
        if (f) links += '<a href="#/fiche/' + rid + '">' + icon(f.icon) + f.title + '</a>';
      });
      if (links) html += '<h2 class="section-title reveal">' + icon('hub') + 'Réviser la théorie</h2><div class="related-row reveal">' + links + '</div>';
    }
    return html;
  }

  function paywallView() {
    var premium = Premium.isUnlocked(), st = Premium.status() || {};
    if (premium) {
      return '<div class="paywall-card view-anim">' +
        '<span class="prem-ic-big material-symbols-rounded">workspace_premium</span>' +
        '<div class="prem-state">' + icon('verified') + ' Premium actif' + (st.at ? ' depuis le ' + new Date(st.at).toLocaleDateString('fr-FR') : '') + '</div>' +
        '<h1>Tout est débloqué</h1>' +
        '<p>Ateliers, indices et solutions de tous les modules sont ouverts. Il ne reste plus qu\'à travailler : la régularité bat le talent.</p>' +
        '<a class="btn" href="#/application">' + icon('military_tech') + '<span>Retour aux ateliers</span></a>' +
        '<p style="margin:22px 0 0"><button type="button" class="btn ghost small" data-premium-revoke>' + icon('lock_reset') + '<span>Révoquer Premium (démo)</span></button></p>' +
        '</div>';
    }

    var demoKeys = Premium.DEMO_KEYS.map(function (k) {
      return '<button type="button" class="demo-key" data-fill-key="' + k + '">' + k + '</button>';
    }).join('');

    return '<div class="paywall-card view-anim">' +
      '<span class="prem-ic-big material-symbols-rounded">workspace_premium</span>' +
      '<h1>Easy Learn Premium</h1>' +
      '<p>Tous les ateliers de tous les modules, pour transformer la théorie en réflexes de développeur. <strong>9 900 FCFA / an</strong> — tarif de lancement (simulé pour cette démonstration).</p>' +
      '<div class="paywall-benefits">' +
      '<span class="li" style="display:contents"></span>' +
      '<li>' + icon('task_alt') + '<span><strong>85 ateliers progressifs</strong><span class="sub">Fondamentaux → Intermédiaires → Projets réels, dans les 17 modules de la doc.</span></span></li>' +
      '<li>' + icon('terminal') + '<span><strong>Tests automatiques dans le navigateur</strong><span class="sub">Éditeur intégré et retour immédiat pour HTML, CSS, JavaScript, Tailwind, React et Vue.</span></span></li>' +
      '<li>' + icon('military_tech') + '<span><strong>Progression et badges</strong><span class="sub">Anneaux d\'activité façon iOS et paliers Bronze, Argent et Or à décrocher par module.</span></span></li>' +
      '<li>' + icon('key') + '<span><strong>Solutions commentées</strong><span class="sub">Chaque solution expliquée pas à pas, avec les erreurs à éviter.</span></span></li>' +
      '</div>' +
      '<form class="key-form" data-premium-form autocomplete="off">' +
      '<input class="key-input" id="xo-key" type="text" placeholder="CLÉ D\'ACTIVATION" spellcheck="false">' +
      '<button class="btn" type="submit">' + icon('bolt') + '<span>Activer</span></button></form>' +
      '<p class="key-err" data-key-err></p>' +
      '<div class="demo-keys"><span style="font-size:12px;color:var(--text-3);align-self:center">Clés de démonstration :</span>' + demoKeys + '</div>' +
      '<div class="paywall-note">' + icon('info') + '<span><strong>Interface de démonstration.</strong> Ce n\'est <strong>pas un vrai paiement sécurisé</strong> : la clé est simplement stockée dans le localStorage de ton navigateur. En production, ce parcours serait branché sur un backend Laravel (comptes + Sanctum) avec Stripe (ou FedaPay / MTN MoMo) pour le paiement, et une API d\'exécution de code type Judge0 pour les langages serveur. Voir le fichier <code class="inline">js/premium.js</code>.</span></div>' +
      '</div>';
  }

  /* ============================================================
     ROUTAGE (appelé par app.js) + POST-RENDU
     ============================================================ */
  var current = { kind: 'hub' };

  function route(parts) {
    var mod = parts[1], id = parts[2];
    lastLocked = null;
    if (!mod) {
      current = { kind: 'hub' };
      document.body.removeAttribute('data-lang');
      return { html: hubView(), title: 'Application' };
    }
    if (mod === 'premium') {
      current = { kind: 'premium' };
      document.body.removeAttribute('data-lang');
      return { html: paywallView(), title: 'Easy Learn Premium' };
    }
    if (window.DEVDOCS && DEVDOCS[mod] && X()[mod]) {
      document.body.setAttribute('data-lang', mod);
      if (!id) {
        current = { kind: 'module', mod: mod };
        return { html: moduleView(mod), title: 'Application ' + DEVDOCS[mod].name };
      }
      var e = exoById(mod, id);
      if (e) {
        current = { kind: 'detail', mod: mod, exo: e };
        return { html: detailView(mod, e), title: e.title };
      }
    }
    current = { kind: 'hub' };
    document.body.removeAttribute('data-lang');
    return { html: hubView(), title: 'Application' };
  }

  function refreshHeadChip(e) {
    var chip = document.querySelector('[data-status-chip]');
    if (!chip || !current.exo) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = statusChip(statusOf(current.exo));
    chip.replaceWith(tmp.firstChild);
  }

  function refreshGate() {
    var zone = document.getElementById('sol-zone');
    if (zone && current.exo) zone.innerHTML = solZoneHtml(current.exo);
  }

  function bind(view) {
    if (current.kind !== 'detail' || !current.exo) return;
    var e = current.exo;
    if (!accessible(e) || e.kind !== 'dom') return;
    var holder = view.querySelector('#exo-runner');
    if (!holder || !window.ExoRunner) return;
    ExoRunner.mount(holder, e, {
      onAttempt: function (ex) {
        var p = rec(ex.id);
        p.a++; p.t = Date.now(); save();
        refreshGate();
        refreshHeadChip(ex);
      },
      onAllPass: function (ex) {
        var wasDone = peek(ex.id).done;
        markDone(ex);
        refreshHeadChip(ex);
        if (!wasDone) refreshGate();
      }
    });
  }

  /* ============================================================
     ÉVÉNEMENTS (délégation globale, installée une fois)
     ============================================================ */
  function onClick(ev) {
    var t;

    /* Indices progressifs */
    t = ev.target.closest('[data-hint]');
    if (t && current.exo) {
      var p = rec(current.exo.id);
      p.h = Math.min(current.exo.hints.length, (p.h || 0) + 1);
      p.t = Date.now(); save();
      var box = document.getElementById('xo-hints');
      if (box) box.innerHTML = hintsHtml(current.exo);
      return;
    }

    /* Solution : confirmation en deux temps */
    t = ev.target.closest('[data-solution]');
    if (t && current.exo) {
      if (t.dataset.confirm === '1') {
        var pr = rec(current.exo.id);
        pr.s = true; pr.t = Date.now(); save();
        refreshGate();
      } else {
        t.dataset.confirm = '1';
        t.innerHTML = icon('warning') + '<span>Confirmer : j\'ai vraiment essayé</span>';
        setTimeout(function () {
          if (t.isConnected && t.dataset.confirm === '1') {
            delete t.dataset.confirm;
            t.innerHTML = icon('visibility') + '<span>Voir la solution</span>';
          }
        }, 3200);
      }
      return;
    }

    /* Validation d'une checklist */
    t = ev.target.closest('[data-complete]');
    if (t && current.exo && !t.disabled) {
      markDone(current.exo);
      refreshHeadChip(current.exo);
      refreshGate();
      t.disabled = true;
      var panel = t.closest('.check-panel');
      if (panel && !panel.parentElement.querySelector('.success-pop')) {
        panel.insertAdjacentHTML('afterend',
          '<div class="success-pop" style="margin-top:14px"><span class="succ-ic material-symbols-rounded">check</span>' +
          '<span><strong>Atelier validé — beau travail !</strong>' +
          '<span>Compare maintenant ta version avec la solution modèle pour parfaire tes réflexes.</span></span></div>');
      }
      return;
    }

    /* Paywall : remplir une clé démo */
    t = ev.target.closest('[data-fill-key]');
    if (t) {
      var input = document.getElementById('xo-key');
      if (input) { input.value = t.getAttribute('data-fill-key'); input.focus(); }
      return;
    }

    /* Paywall : révocation (démo) */
    t = ev.target.closest('[data-premium-revoke]');
    if (t) {
      Premium.revoke();
      toast('Premium révoqué (mode démonstration)', 'lock_reset');
      rerender();
      return;
    }

    /* Filtre niveaux (page module) */
    t = ev.target.closest('#xo-lvl-filter button');
    if (t) {
      document.querySelectorAll('#xo-lvl-filter button').forEach(function (b) { b.classList.toggle('on', b === t); });
      var lvl = t.getAttribute('data-xo-lvl');
      document.querySelectorAll('[data-xo-wrap]').forEach(function (wrap) {
        var show = !lvl || wrap.getAttribute('data-xo-wrap') === lvl;
        wrap.style.display = show ? '' : 'none';
      });
      return;
    }
  }

  function onChange(ev) {
    var input = ev.target.closest ? ev.target.closest('input[data-check]') : null;
    if (!input || !current.exo) return;
    var e = current.exo, p = rec(e.id);
    var idx = parseInt(input.getAttribute('data-check'), 10);
    while (p.c.length < e.checklist.length) p.c.push(false);
    p.c[idx] = input.checked;
    if (input.checked && p.a === 0) p.a = 1; // cocher = tentative réelle
    p.t = Date.now(); save();

    var panel = document.querySelector('[data-check-panel]');
    if (panel) {
      var done = p.c.filter(Boolean).length, n = e.checklist.length;
      var bar = panel.querySelector('.bar i'); if (bar) bar.style.width = Math.round(done / n * 100) + '%';
      var cnt = panel.querySelector('.cnt'); if (cnt) cnt.textContent = done + '/' + n;
      var btn = panel.querySelector('[data-complete]'); if (btn) btn.disabled = done !== n;
    }
    refreshGate();
    refreshHeadChip(e);
  }

  function onInput(ev) {
    var input = ev.target.closest ? ev.target.closest('[data-exo-search]') : null;
    if (!input) return;
    var q = input.value.trim().toLowerCase();
    var anyTotal = false;
    document.querySelectorAll('[data-exo-group]').forEach(function (grp) {
      var any = false;
      grp.querySelectorAll('[data-exo-mod-card]').forEach(function (card) {
        var name = card.getAttribute('data-name') || '';
        var show = !q || name.indexOf(q) >= 0;
        card.style.display = show ? '' : 'none';
        if (show) any = true;
      });
      grp.style.display = any ? '' : 'none';
      if (any) anyTotal = true;
    });
    var empty = document.querySelector('[data-exo-empty]');
    if (empty) empty.hidden = anyTotal;
  }

  function onSubmit(ev) {
    var form = ev.target.closest ? ev.target.closest('[data-premium-form]') : null;
    if (!form) return;
    ev.preventDefault();
    var input = document.getElementById('xo-key');
    var err = document.querySelector('[data-key-err]');
    var res = Premium.unlock(input ? input.value : '');
    if (!res.ok) {
      if (err) { err.textContent = res.reason; err.classList.add('show'); }
      return;
    }
    toast('Premium activé — tous les ateliers sont ouverts', 'workspace_premium');
    location.hash = lastLocked || '#/application';
    /* Si déjà sur la bonne route (hash inchangé), force le re-rendu */
    if ((lastLocked || '#/application') === location.hash) rerender();
  }

  function rerender() {
    var viewEl = document.getElementById('view');
    if (!viewEl) return;
    var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    var r = route(parts);
    viewEl.innerHTML = r.html;
    document.title = (r.title || 'Application') + ' — Easy Learn';
    var tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = r.title || 'Application';
    // Activer le lien Application dans la sidebar
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      el.classList.toggle('active', el.dataset.nav === 'application');
    });
    bind(viewEl);
  }

  /* ---------- Init ---------- */
  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  document.addEventListener('input', onInput);
  document.addEventListener('submit', onSubmit);

  var total = 0;
  modules().forEach(function (m) { total += X()[m].list.length; });
  var navCount = document.getElementById('exo-nav-count');
  if (navCount) navCount.textContent = total || '';

  window.ExoApp = { route: route, bind: bind, rerender: rerender };

  /* Écoute les changements de hash pour la navigation Application.
     L'approche est autonome : exo-app.js gère ses propres routes
     sans dépendre du routeur principal d'app.js. */
  window.addEventListener('hashchange', function () {
    var h = location.hash.replace(/^#\/?/, '');
    if (h.startsWith('application')) {
      rerender();
    }
  });
})();
