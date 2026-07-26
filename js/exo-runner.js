/* ============================================================
   exo-runner.js — Atelier de code des ateliers « front »
   ------------------------------------------------------------
   Éditeur intégré (coloration via highlight.js du site, aucune
   dépendance lourde) + exécution dans un <iframe sandbox> :
   le document de l'élève est assemblé (HTML + CSS + JS), les
   tests automatiques sont INJECTÉS dans le document et les
   résultats remontent par postMessage.

   Sécurité : sandbox="allow-scripts" SANS allow-same-origin
   → origine opaque, aucune fuite possible vers la page hôte.
   Conséquence assumée : pas de localStorage dans l'iframe
   (les ateliers à tests automatiques ne s'appuient donc pas
   dessus — la persistance est réservée aux défis bonus).
   ============================================================ */
(function () {
  'use strict';

  var LANG_ICON = { html: 'html', css: 'css', js: 'javascript', ts: 'code_blocks' };
  var RUN_TIMEOUT = 12000; // ms sans réponse → avertissement connexion
  var POLL_MAX = 45;       // nombre de sondes de disponibilité (readySelector)

  function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
  /* Neutralise les séquences de fermeture qui casseraient le srcdoc. */
  function safeClose(code, tag) {
    return String(code).replace(new RegExp('</' + tag, 'gi'), '<\\/' + tag);
  }

  /* ---------- Hauteur d'un panneau d'édition ---------- */
  function editorHeight(text) {
    var lines = String(text).split('\n').length;
    return Math.min(430, Math.max(140, Math.round(lines * 20.8) + 34));
  }

  /* ============================================================
     Vue : monte l'atelier complet dans `container`
     callbacks : { onAttempt(exo), onAllPass(exo) }
     ============================================================ */
  function mount(container, exo, callbacks) {
    callbacks = callbacks || {};
    var starter = {}, codes = {};
    exo.panes.forEach(function (p) { starter[p.key] = p.code; codes[p.key] = p.code; });

    var runSeq = 0, expecting = null, timeoutId = null;

    /* ---------- Fabrication du squelette ---------- */
    var tabsHtml = exo.panes.map(function (p, i) {
      return '<button type="button" data-pane-tab="' + p.key + '"' + (i === 0 ? ' class="on"' : '') + '>' +
        '<span class="material-symbols-rounded">' + (LANG_ICON[p.lang] || 'code') + '</span>' +
        p.label + (p.editable === false ? ' <span class="ro-tag">lecture</span>' : '') + '</button>';
    }).join('');

    var panesHtml = exo.panes.map(function (p, i) {
      var h = editorHeight(p.code);
      return '<div class="editor' + (p.editable === false ? ' ro' : '') + '" data-pane="' + p.key + '"' +
        ' style="height:' + h + 'px;' + (i > 0 ? 'display:none' : '') + '">' +
        '<pre class="editor-hl" aria-hidden="true"><code></code></pre>' +
        '<textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"' +
        (p.editable === false ? ' readonly tabindex="-1"' : '') +
        ' aria-label="' + escAttr(p.label) + '"></textarea></div>';
    }).join('');

    /* Atelier en deux colonnes : éditeur à gauche, aperçu live à droite
       (empilés sur mobile) — voir .workshop dans css/exo.css. */
    container.innerHTML =
      '<div class="workshop">' +
        '<div class="workshop-edit"><div class="editor-shell">' +
          '<div class="editor-tabs">' + tabsHtml + '</div>' +
          '<div class="editor-panes">' + panesHtml + '</div>' +
          '<div class="run-bar">' +
            '<button type="button" class="btn small" data-run><span class="material-symbols-rounded">play_arrow</span><span>Lancer les tests</span></button>' +
            '<button type="button" class="btn small ghost" data-reset><span class="material-symbols-rounded">restart_alt</span><span>Réinitialiser</span></button>' +
            '<span class="run-hint">' + exo.tests.length + ' tests automatiques</span>' +
          '</div>' +
        '</div></div>' +
        '<div class="workshop-side"><div class="preview-frame">' +
          '<div class="preview-title"><span class="material-symbols-rounded">visibility</span><span>Aperçu en direct</span>' +
          '<span style="margin-left:auto;font-weight:600;color:var(--text-3)">mis à jour à chaque lancement</span></div>' +
          '<iframe class="exo-preview" sandbox="allow-scripts" title="Aperçu de ton code"></iframe>' +
        '</div></div>' +
      '</div>' +
      '<div class="exo-results test-results" style="margin-top:16px" aria-live="polite"></div>';

    var frame = container.querySelector('.exo-preview');
    var resultsBox = container.querySelector('.exo-results');
    var runBtn = container.querySelector('[data-run]');

    /* ---------- Éditeurs (textarea + calque coloré) ---------- */
    container.querySelectorAll('.editor').forEach(function (ed) {
      var key = ed.getAttribute('data-pane');
      var pane = exo.panes.filter(function (p) { return p.key === key; })[0];
      var ta = ed.querySelector('textarea');
      var hl = ed.querySelector('.editor-hl code');
      ta.value = codes[key];

      function paint() {
        hl.innerHTML = High.run(ta.value, pane.lang) + '\n';
        ed.style.height = editorHeight(ta.value) + 'px';
      }
      function syncScroll() {
        var pre = ed.querySelector('.editor-hl');
        pre.scrollTop = ta.scrollTop;
        pre.scrollLeft = ta.scrollLeft;
      }
      paint();
      ta.addEventListener('input', function () { codes[key] = ta.value; paint(); });
      ta.addEventListener('scroll', syncScroll);
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && !ta.readOnly) {
          e.preventDefault();
          var s = ta.selectionStart;
          ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = s + 2;
          codes[key] = ta.value;
          paint();
        }
      });
    });

    /* ---------- Onglets ---------- */
    container.querySelectorAll('[data-pane-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        container.querySelectorAll('[data-pane-tab]').forEach(function (b) { b.classList.toggle('on', b === btn); });
        var k = btn.getAttribute('data-pane-tab');
        container.querySelectorAll('.editor[data-pane]').forEach(function (ed) {
          ed.style.display = ed.getAttribute('data-pane') === k ? '' : 'none';
        });
      });
    });

    /* ---------- Assemblage du document sandboxé ---------- */
    function collect(kind) {
      return exo.panes.filter(function (p) { return p.lang === kind || (kind === 'js' && p.lang === 'ts'); })
        .map(function (p) { return codes[p.key]; }).join('\n');
    }

    /* Insertion d'un fragment avant une balise de fin (insensible à la casse),
       sinon concaténation en fin de document. */
    function insertBeforeTag(doc, tag, fragment) {
      var re = new RegExp('</' + tag + '\\s*>', 'i');
      return re.test(doc) ? doc.replace(re, fragment + '</' + tag + '>') : doc + fragment;
    }

    function buildDoc(withTests, runId) {
      var type = exo.scriptType || 'classic';
      var html = collect('html');
      var css = collect('css');
      var js = collect('js');

      /* Mode « document complet » : l'élève écrit TOUT le document HTML. */
      if (exo.fullDocument) {
        var full = html;
        if (css.trim()) full = insertBeforeTag(full, 'head', '<style>' + safeClose(css, 'style') + '</style>');
        if (js.trim()) full = insertBeforeTag(full, 'body', '<scr' + 'ipt>' + safeClose(js, 'script') + '</scr' + 'ipt>');
        if (withTests) full = insertBeforeTag(full, 'body', testHarness(runId));
        return full || '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
      }

      var doc = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<style>html,body{margin:0}body{padding:14px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
        'line-height:1.5;background:#fff;color:#191919}*{box-sizing:border-box}img{max-width:100%}</style>';
      if (exo.head) doc += exo.head;
      if (css.trim()) doc += '<style>' + safeClose(css, 'style') + '</style>';
      doc += '</head><body>' + html;

      if (withTests) {
        doc += '<scr' + 'ipt>window.__ddErr=[];window.addEventListener("error",function(e){' +
          'window.__ddErr.push(String((e&&e.message)||"Erreur inconnue"));});</scr' + 'ipt>';
      }

      if (js.trim()) {
        var jsSafe = safeClose(js, 'script');
        if (type === 'module') doc += '<scr' + 'ipt type="module">' + jsSafe + '</scr' + 'ipt>';
        else if (type === 'babel') doc += '<scr' + 'ipt type="text/babel" data-presets="react">' + jsSafe + '</scr' + 'ipt>';
        else doc += '<scr' + 'ipt>' + jsSafe + '</scr' + 'ipt>';
      }

      if (withTests) doc += testHarness(runId);
      doc += '</body></html>';
      return doc;
    }

    function testHarness(runId) {
      var testsSrc = '[' + exo.tests.map(function (t) {
        return '{name:' + JSON.stringify(t.name) + ',help:' + JSON.stringify(t.help || '') +
          ',fn:(' + t.check.toString() + ')}';
      }).join(',') + ']';

      var selector = exo.readySelector ? JSON.stringify(exo.readySelector) : 'null';
      var minLen = exo.readyMinLen || 1;
      var wait = exo.readyWait || 120;

      return '<scr' + 'ipt>(function(){' +
        'var TESTS=' + testsSrc + ';' +
        'var RUNID=' + JSON.stringify(runId) + ';' +
        'function finish(){var out=[],i=0;' +
        'function send(){parent.postMessage({__ddExo:1,runId:RUNID,results:out,errors:window.__ddErr||[]},"*");}' +
        'function next(){if(i>=TESTS.length){send();return;}var t=TESTS[i++],r;' +
        'try{r=t.fn(document,window);}catch(e){out.push({name:t.name,help:t.help,pass:false,err:String((e&&e.message)||e)});return next();}' +
        'if(r&&typeof r.then==="function"){r.then(function(v){out.push({name:t.name,help:t.help,pass:!!v});next();},' +
        'function(e){out.push({name:t.name,help:t.help,pass:false,err:String(e)});next();});}' +
        'else{out.push({name:t.name,help:t.help,pass:!!r});next();}}next();}' +
        'function go(){setTimeout(finish,' + wait + ');}' +
        'var sel=' + selector + ';' +
        'if(sel){var n=0,iv=setInterval(function(){n++;var el=document.querySelector(sel);' +
        'if((el&&el.innerHTML.replace(/\\s+/g,"").length>=' + minLen + ')||n>' + POLL_MAX + '){clearInterval(iv);go();}},150);}' +
        'else if(document.readyState==="complete"||document.readyState==="interactive"){go();}' +
        'else{window.addEventListener("load",go);}' +
        '})();</scr' + 'ipt>';
    }

    /* ---------- Réception des résultats ---------- */
    function onMessage(e) {
      if (e.source !== frame.contentWindow) return;
      var d = e.data;
      if (!d || !d.__ddExo || d.runId !== expecting) return;
      expecting = null;
      clearTimeout(timeoutId);
      renderResults(d.results || [], d.errors || []);
    }
    window.addEventListener('message', onMessage);

    function renderResults(results, errors) {
      runBtn.disabled = false;
      runBtn.querySelector('span:last-child').textContent = 'Relancer les tests';
      var rows = '';
      errors.slice(0, 2).forEach(function (msg) {
        rows += '<div class="test-row t-ko"><span class="material-symbols-rounded">error</span><span>' +
          '<strong>Erreur d\'exécution</strong><span class="t-help">' + High.esc(msg) +
          ' — lis ton code à voix haute : l\'erreur indique souvent la ligne fautive.</span></span></div>';
      });
      var passed = 0;
      results.forEach(function (r) {
        if (r.pass) passed++;
        rows += '<div class="test-row ' + (r.pass ? 't-ok' : 't-ko') + '">' +
          '<span class="material-symbols-rounded">' + (r.pass ? 'task_alt' : 'cancel') + '</span>' +
          '<span><strong>' + (r.pass ? 'Test réussi ✓' : 'Test échoué ✗') + ' — ' + High.esc(r.name) + '</strong>' +
          (!r.pass ? '<span class="t-help">' + (r.err ? 'Erreur : ' + High.esc(r.err) + '. ' : '') + High.esc(r.help) + '</span>' : '') +
          '</span></div>';
      });
      resultsBox.innerHTML = rows;

      var succ = resultsBox.querySelector('.success-pop');
      if (succ) succ.remove();
      if (results.length && passed === results.length && !errors.length) {
        resultsBox.insertAdjacentHTML('afterbegin',
          '<div class="success-pop"><span class="succ-ic material-symbols-rounded">check</span>' +
          '<span><strong>Tous les tests passent — atelier réussi !</strong>' +
          '<span>Prends le temps de relire ta solution, puis regarde la solution modèle pour comparer.</span></span></div>');
        if (callbacks.onAllPass) callbacks.onAllPass(exo);
      }
    }

    /* ---------- Actions ---------- */
    runBtn.addEventListener('click', function () {
      if (callbacks.onAttempt) callbacks.onAttempt(exo);
      runSeq++;
      expecting = 'r' + runSeq;
      runBtn.disabled = true;
      runBtn.querySelector('span:last-child').textContent = 'Exécution…';
      resultsBox.innerHTML = '';
      frame.srcdoc = buildDoc(true, expecting);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        if (!expecting) return;
        expecting = null;
        runBtn.disabled = false;
        runBtn.querySelector('span:last-child').textContent = 'Relancer les tests';
        resultsBox.innerHTML =
          '<div class="test-row t-info"><span class="material-symbols-rounded">wifi_off</span><span>' +
          '<strong>Aucune réponse du rendu.</strong><span class="t-help">Cet atelier charge peut-être une ' +
          'bibliothèque depuis un CDN (React, Vue, Tailwind…) : vérifie ta connexion, corrige d\'éventuelles ' +
          'erreurs de syntaxe, puis relance les tests.</span></span></div>';
      }, RUN_TIMEOUT);
    });

    container.querySelector('[data-reset]').addEventListener('click', function () {
      exo.panes.forEach(function (p) { codes[p.key] = starter[p.key]; });
      container.querySelectorAll('.editor').forEach(function (ed) {
        var key = ed.getAttribute('data-pane');
        var pane = exo.panes.filter(function (p) { return p.key === key; })[0];
        var ta = ed.querySelector('textarea');
        var hl = ed.querySelector('.editor-hl code');
        ta.value = codes[key];
        hl.innerHTML = High.run(ta.value, pane.lang) + '\n';
        ed.style.height = editorHeight(ta.value) + 'px';
      });
      resultsBox.innerHTML = '';
      frame.srcdoc = buildDoc(false, null);
    });

    /* Aperçu initial (sans tests) */
    frame.srcdoc = buildDoc(false, null);
  }

  window.ExoRunner = { mount: mount };
})();
