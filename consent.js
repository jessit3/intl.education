/* ============================================================
   INTL Edu cookie consent.
   Microsoft Clarity and Microsoft Advertising load ONLY after a
   visitor clicks "Accept all". "Reject all" is just as easy.
   Visitors can change their choice any time via "Cookie settings".

   TO TURN TRACKING ON: paste your IDs between the quotes below.
   - Clarity: clarity.microsoft.com > your project > Settings > Setup
   - Microsoft Advertising: Tools > UET tag > your tag ID (numbers)
   ============================================================ */
(function () {
  var CLARITY_ID = "";   // e.g. "abc123xyz"
  var UET_ID = "";       // e.g. "12345678"

  var KEY = "intl-cookie-choice"; // "accepted" or "rejected"

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadTracking() {
    if (window.__intlTrackingLoaded) return;
    window.__intlTrackingLoaded = true;
    if (CLARITY_ID) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
    }
    if (UET_ID) {
      (function (w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [];
        f = function () { var o = { ti: UET_ID, enableAutoSpaTracking: true }; o.q = w[u]; w[u] = new UET(o); w[u].push("pageLoad"); };
        n = d.createElement(t); n.src = r; n.async = 1;
        n.onload = n.onreadystatechange = function () {
          var s = this.readyState;
          if (!s || s === "loaded" || s === "complete") { f(); n.onload = n.onreadystatechange = null; }
        };
        i = d.getElementsByTagName(t)[0]; i.parentNode.insertBefore(n, i);
      })(window, document, "script", "https://bat.bing.com/bat.js", "uetq");
    }
  }

  function clearTrackingCookies() {
    var names = ["_clck", "_clsk", "CLID", "ANONCHK", "SM", "MR", "_uetsid", "_uetvid", "_uetmsclkid", "MUID"];
    var host = location.hostname, parts = host.split("."), domains = ["", host];
    if (parts.length > 1) domains.push("." + parts.slice(-2).join("."), "." + host);
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  var css = ".cc-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;background:#3c2415;color:#fff;border-radius:16px;padding:22px 24px;box-shadow:0 8px 30px rgba(60,36,21,.25);font-family:'Nunito','Segoe UI',Arial,sans-serif;font-size:1.0625rem;line-height:1.55}" +
    ".cc-bar h2{font-family:'Montserrat',Arial,sans-serif;font-size:1.2rem;font-weight:800;margin:0 0 .4em;color:#fff}" +
    ".cc-bar p{margin:0 0 1rem;max-width:none}.cc-bar a{color:#fff;text-decoration:underline}" +
    ".cc-btns{display:flex;flex-wrap:wrap;gap:12px}" +
    ".cc-btn{flex:1 1 160px;min-height:48px;border-radius:12px;border:2px solid #fff;background:#fff;color:#3c2415;font:800 1rem 'Nunito',Arial,sans-serif;cursor:pointer;padding:10px 18px}" +
    ".cc-btn:hover{background:#ded2eb;border-color:#ded2eb}" +
    ".cc-btn:focus-visible{outline:3px solid #b3c9f1;outline-offset:3px}" +
    ".cookie-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";

  function addStyle() {
    if (document.getElementById("cc-style")) return;
    var s = document.createElement("style"); s.id = "cc-style"; s.textContent = css; document.head.appendChild(s);
  }

  function showBar(focus) {
    addStyle();
    var old = document.getElementById("cc-bar"); if (old) old.remove();
    var bar = document.createElement("section");
    bar.id = "cc-bar"; bar.className = "cc-bar";
    bar.setAttribute("aria-labelledby", "cc-title");
    var privacy = (document.querySelector('link[rel="privacy-policy"]') || {}).href || "privacy";
    bar.innerHTML =
      '<h2 id="cc-title">Your cookie choice</h2>' +
      '<p>We’d like to use Microsoft Clarity and Microsoft Advertising cookies to see how people use this site and to improve it. They stay off unless you say yes. <a href="' + privacy + '#cookies">Read our privacy policy</a>.</p>' +
      '<div class="cc-btns"><button type="button" class="cc-btn" data-cc="accepted">Accept all</button>' +
      '<button type="button" class="cc-btn" data-cc="rejected">Reject all</button></div>';
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-cc");
      if (!v) return;
      var before = getChoice();
      saveChoice(v);
      bar.remove();
      if (v === "accepted") loadTracking();
      else { clearTrackingCookies(); if (before === "accepted") location.reload(); }
    });
    if (focus === true) { var first = bar.querySelector(".cc-btn"); if (first) first.focus(); }
  }

  function init() {
    document.querySelectorAll("[data-cookie-settings]").forEach(function (b) {
      b.addEventListener("click", function () { showBar(true); });
    });
    var c = getChoice();
    if (c === "accepted") loadTracking();
    else if (c !== "rejected") showBar();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
