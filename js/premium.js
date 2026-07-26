/* ============================================================
   premium.js — Déverrouillage Premium (MODE DÉMONSTRATION)
   ------------------------------------------------------------
   ⚠  CECI N'EST PAS UN VRAI SYSTÈME DE PAIEMENT SÉCURISÉ.
   Ce module SIMULE le parcours premium d'un site statique :
   une « clé d'activation » saisie par l'utilisateur est stockée
   dans localStorage et débloque les ateliers. N'importe qui
   peut modifier son propre localStorage — c'est assumé : le but
   est de démontrer l'interface (paywall, badges, progression),
   pas de protéger réellement du contenu.

   ▶ Mise en production (prochaine étape logique, documentée) :
     1. Backend : le module Laravel de ce site documente déjà
        l'auth (Sanctum), les comptes utilisateurs et les
        contrôleurs — c'est le candidat naturel pour servir
        d'API réelle (POST /api/premium/activate).
     2. Paiement : Stripe Checkout/Billing, ou un agrégateur
        régional (FedaPay, CinetPay, MTN MoMo API) pour le
        contexte béninois.
     3. Le front remplacerait alors UNIQUEMENT ce fichier :
        isUnlocked() lirait un jeton (JWT signé) vérifié côté
        serveur, unlock() appellerait l'API. Le reste du site
        (exo-app.js, exo-runner.js) n'aurait pas à changer.

   Toute la logique de verrouillage est volontairement
   CONCENTRÉE ici pour être remplaçable sans toucher au reste.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'dd-premium';
  var CHANGE_EVENT = 'dd-premium-changed';

  /* Clés de DÉMONSTRATION (affichées à l'écran Premium — elles
     ne protègent rien, elles servent à simuler l'activation). */
  var DEMO_KEYS = ['DEVDOCS-PREMIUM-2026', 'AWA-MENTOR-2026'];

  function read() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }

  function write(value) {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* navigation privée / quota : le statut reste en mémoire vive */ }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }

  window.Premium = {
    /* Exposées pour être affichées dans la paywall de démo. */
    DEMO_KEYS: DEMO_KEYS,
    mode: 'demo-local', // futur : 'serveur' (voir en-tête)

    /* -------- Lecture -------- */
    isUnlocked: function () {
      var s = read();
      return !!(s && s.unlocked);
    },
    status: function () { return read(); },

    /* -------- Écriture -------- */
    unlock: function (key) {
      var k = String(key || '').trim().toUpperCase();
      if (!k) return { ok: false, reason: 'Saisis une clé d\'activation.' };
      if (DEMO_KEYS.indexOf(k) < 0) {
        return { ok: false, reason: 'Clé inconnue. En mode démonstration, utilise l\'une des clés affichées sur l\'écran Premium.' };
      }
      write({ unlocked: true, key: k, mode: 'demo-local', at: Date.now() });
      return { ok: true };
    },
    revoke: function () { write(null); },

    /* -------- Abonnement aux changements -------- */
    onChange: function (cb) { window.addEventListener(CHANGE_EVENT, cb); }
  };
})();
