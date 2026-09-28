/* ==========================================================================
   inat.dev — behaviour
   No dependencies. Everything degrades to a readable page without it.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var MAIL = 'adis@inat.dev';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── i18n ──────────────────────────────────────────────────────────
     English lives in the HTML, so it stays readable with JS disabled and
     there is only one copy of it to keep correct. Swedish is the overlay,
     and the default: the inline script in <head> sets lang="sv" unless
     English was chosen. */

  var sv = {
    'skip': 'Hoppa till innehållet',
    'nav.services': 'Tjänster',
    'nav.work': 'Arbete',
    'nav.inat': 'Inat',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Hör av dig',
    'hero.role': 'Mjukvaruutvecklare',
    'hero.kicker': 'Stockholm',
    'hero.build': 'Vi bygger',
    'hero.buildAll': 'Vi bygger skalbart, säkert, långsiktigt, transparent och metodiskt. Vi skapar värde, kvalitet, förtroende och försprång.',
    'hero.ctaPrimary': 'Ta kontakt',
    'hero.ctaSecondary': 'Vad vi gör',
    'entry.pos': 'substantiv',
    'entry.lang': 'bosniska',
    'entry.def1': 'Envishet med ryggrad. Att göra saken just för att någon sagt att den inte går.',
    'entry.def2': 'Vägran att acceptera "tillräckligt nära" som svar.',
    'entry.usageTag': 'i bruk',
    'entry.usage': '"Han byggde upp det igen, sten för sten, iz inata."',
    'svc.badge': 'Vad vi gör',
    'svc.steps': 'i fem steg',
    'path.s1.title': 'Första samtal',
    'path.s2.title': 'Vi planerar',
    'path.s3.title': 'Vi visualiserar',
    'path.s4.title': 'Vi bygger',
    'path.s5.title': 'Vi håller det igång',
    'proj.badge': 'Arbete',
    'proj.title': 'Levererat, och fortfarande i drift',
    'proj.sub': 'Fyra produkter i produktion. Olika domäner, samma ribba.',
    'proj.garn.body': 'En virkdagbok. Varje varv skrivs till telefonen först, så den fungerar i en tunnel helt utan täckning — molnet är en säkerhetskopia man trycker på med flit, aldrig något appen väntar in. Svenska, turkiska och bosniska.',
    'proj.doc.body': 'Svenska, undervisad utifrån dina egna papper. Ladda upp hyreskontraktet eller brevet från skolan och en AI-lärare som heter Maja bygger lektionen av orden du faktiskt behövde den veckan. Taluttal, spaced repetition, CEFR A1–C2 och TISUS-förberedelse.',
    'proj.clinic.body': 'Sajten för en medicinsk estetisk klinik med mottagningar i Västerås och Stockholm, där varje injektion görs av legitimerad personal. En behandlingskatalog som måste vara begriplig för någon som står och funderar på att boka.',
    'proj.summit.body': 'En privat aktieklubb för ett gäng vänner. Någon pitchar ett case, gänget röstar, och en majoritet som går igenom agerar på det i en delad papperportfölj — sen avgör riktiga marknadspriser vem som hade rätt. Länken kräver inbjudan, så räkna med en stängd dörr.',
    'proj.closing': 'Inget av det här fanns förrän någon vägrade släppa idén. Kan du beskriva det tydligt går det att bygga — det svåra var aldrig idén.',
    'inat.badge': 'Varför domänen',
    'inat.title': 'Det finns inget rent svenskt ord för det',
    'inat.p1': '"Envishet" är nära. "Trots" låter barnsligt. "Principfasthet" är för stelt. Inat är det som får någon att bygga upp ett hus sten för sten hellre än att låta det rivas — inte för att det är praktiskt, utan för att det är deras.',
    'inat.p2': 'Varje projekt på förstasidan började som en mening någon sa i förbigående. Inat är det som bär en idé förbi punkten där den slutar vara kul: fjärde omskrivningen, buggen som bara händer på någon annans telefon, veckan då ingenting fungerar. Skill avgör vad som går att bygga. Inat avgör vad som faktiskt blir färdigt.',
    'inat.day': 'Till vardags: finansiell mjukvara — bokföring, fintech och open banking.',
    'inat.pr1': 'Idéer är billiga. Färdigt är ovanligt.',
    'inat.pr2': 'Inga tysta fel.',
    'inat.pr3': 'Behöver det täckning för att funka, funkar det inte.',
    'inat.pr4': 'Fjärde omskrivningen är där det blir bra.',
    'inat.switch': 'Envishet',
    'inat.tryOff': 'Varsågod, försök stänga av den.',
    'inat.ctaWork': 'Se arbetet',
    'contact.badge': 'Kontakt',
    'contact.title': 'Ett första samtal helt förutsättningslöst för att se hur vi kan hjälpa dig',
    'contact.sub': 'Ett projekt, en råskiss eller en andra åsikt.',
    'contact.name': 'Ditt namn',
    'contact.email': 'Din mejl',
    'contact.topic': 'Vad gäller det?',
    'contact.topic1': 'Jobb',
    'contact.topic2': 'Frilans',
    'contact.topic3': 'En idé',
    'contact.message': 'Meddelande',
    'contact.send': 'Öppna i mejl',
    'footer.built': 'byggd av inat i Stockholm'
  };

  var ui = {
    en: {
      errName: 'Tell me who you are.',
      errEmail: 'That email does not look right.',
      errMessage: 'A message would help.',
      formOk: 'Opening your mail client…',
      formLong: 'That is a long message — I trimmed it for the mail client. Send the full version straight to ' + MAIL + '.',
      refuse1: 'No.',
      refuse2: 'Still no.',
      giveIn: '…fine.',
      backOn: 'Better.',
      langAria: 'Byt till svenska',
      sayFail: 'ee-NAHT'
    },
    sv: {
      errName: 'Berätta vem du är.',
      errEmail: 'Den mejladressen ser inte rätt ut.',
      errMessage: 'Ett meddelande hade hjälpt.',
      formOk: 'Öppnar din mejlklient…',
      formLong: 'Det där var ett långt meddelande — jag kortade det för mejlklienten. Skicka hela versionen direkt till ' + MAIL + '.',
      refuse1: 'Nej.',
      refuse2: 'Fortfarande nej.',
      giveIn: '…okej då.',
      backOn: 'Bättre.',
      langAria: 'Switch to English',
      sayFail: 'ee-NAHT'
    }
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var en = {};
  nodes.forEach(function (el) { en[el.getAttribute('data-i18n')] = el.textContent.trim(); });

  var lang = root.lang === 'sv' ? 'sv' : 'en';

  function t(key) { return ui[lang][key]; }

  var onLangChange = null;

  function applyLang(next) {
    lang = next;
    root.lang = next;
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = next === 'sv' ? sv[key] : en[key];
      if (value) el.textContent = value;
    });
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = next === 'sv' ? 'EN' : 'SV';
      btn.setAttribute('aria-label', ui[next].langAria);
    }
    try { localStorage.setItem('inat.lang', next); } catch (e) {}
    if (typeof labelTheme === 'function') labelTheme();
    if (onLangChange) onLangChange();
  }

  applyLang(lang);

  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(lang === 'sv' ? 'en' : 'sv');
    });
  }

  /* ── Theme ─────────────────────────────────────────────────────────── */

  var themeBtn = document.getElementById('theme-toggle');

  // The icon says where you are going, so the label has to agree with it.
  function labelTheme() {
    if (!themeBtn) return;
    var goingLight = root.dataset.theme !== 'light';
    themeBtn.setAttribute(
      'aria-label',
      lang === 'sv'
        ? goingLight ? 'Byt till ljust tema' : 'Byt till mörkt tema'
        : goingLight ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
  labelTheme();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      labelTheme();
      try { localStorage.setItem('inat.theme', next); } catch (e) {}
    });
  }

  /* ── Nav: scroll state, progress and current section ───────────────── */

  var nav = document.querySelector('.nav');
  var progress = document.getElementById('nav-progress');
  var sectionLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  var sections = sectionLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  /*
   * Observers rather than scroll listeners.
   *
   * A scroll handler is the obvious way to do this and the fragile one: gate it
   * behind requestAnimationFrame and a backgrounded tab deadlocks the flag
   * permanently. IntersectionObserver fires from the compositor, needs no
   * throttling, and cannot get wedged. The progress bar genuinely needs scroll
   * position, so that one keeps a listener — and it is written so that failing
   * to fire costs a progress bar, not the whole nav.
   */

  var sentinel = document.getElementById('top-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // Furthest down the page wins, so a tall section does not lose to the
        // sliver of the next one poking into view.
        var active = null;
        sections.forEach(function (el) { if (visible.has(el.id)) active = el.id; });
        sectionLinks.forEach(function (a) {
          if (active && a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-28% 0px -58% 0px' }
    );
    sections.forEach(function (el) { spy.observe(el); });
  }

  if (progress) {
    var paintProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      progress.style.width = (max > 0 ? Math.min(1, Math.max(0, y / max)) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', paintProgress, { passive: true });
    window.addEventListener('resize', paintProgress);
    paintProgress();
  }

  /* ── Mobile menu ───────────────────────────────────────────────────── */

  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');
  var scrim = document.getElementById('nav-scrim');
  var lastFocus = null;

  function setMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);

    if (scrim) {
      if (open) {
        scrim.hidden = false;
        // A tick later, so the opacity transition has a start value to run from.
        // Deliberately a timeout rather than requestAnimationFrame: a frame that
        // never arrives would leave the scrim stuck transparent.
        setTimeout(function () { scrim.classList.add('show'); }, 10);
      } else {
        scrim.classList.remove('show');
        setTimeout(function () { if (!navLinks.classList.contains('open')) scrim.hidden = true; }, 300);
      }
    }

    if (open) {
      lastFocus = document.activeElement;
      var first = navLinks.querySelector('a');
      if (first) first.focus();
    } else if (lastFocus) {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
    });
    // A panel left open while the layout grows back to desktop would trap scroll.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && navLinks.classList.contains('open')) setMenu(false);
    });
  }

  /* ── Reveal on scroll ──────────────────────────────────────────────── */

  var revealables = document.querySelectorAll('.reveal, .reveal-pop');
  if (!('IntersectionObserver' in window) || reduced) {
    // No observer, no motion preference — show everything immediately.
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    // Belt and braces: if anything is still hidden after load, reveal it.
    window.addEventListener('load', function () {
      setTimeout(function () {
        Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-in), .reveal-pop:not(.is-in)'), function (el) {
          var box = el.getBoundingClientRect();
          if (box.top < window.innerHeight) el.classList.add('is-in');
        });
      }, 400);
    });
  }

  /* ── Toast ─────────────────────────────────────────────────────────── */

  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ── The stubbornness switch, which is stubborn ────────────────────── */

  var sw = document.getElementById('inat-switch');
  var swSay = document.getElementById('switch-say');
  var refusals = 0;

  if (sw) {
    sw.addEventListener('click', function () {
      var on = sw.classList.contains('is-on');

      if (on) {
        // It is a switch labelled "stubbornness". It is not going quietly.
        refusals += 1;
        if (refusals < 3) {
          sw.classList.remove('refuse');
          void sw.offsetWidth; // restart the animation
          sw.classList.add('refuse');
          if (swSay) swSay.textContent = refusals === 1 ? t('refuse1') : t('refuse2');
          return;
        }
        sw.classList.remove('is-on');
        sw.setAttribute('aria-checked', 'false');
        if (swSay) swSay.textContent = t('giveIn');
        refusals = 0;
      } else {
        sw.classList.add('is-on');
        sw.setAttribute('aria-checked', 'true');
        if (swSay) swSay.textContent = t('backOn');
      }
    });
  }

  /* ── Pronunciation ─────────────────────────────────────────────────── */

  var say = document.getElementById('say');
  if (say) {
    say.addEventListener('click', function () {
      try {
        if ('speechSynthesis' in window) {
          var u = new SpeechSynthesisUtterance('inat');
          u.lang = 'hr-HR';
          u.rate = 0.85;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(u);
          return;
        }
      } catch (e) {}
      toast(t('sayFail'));
    });
  }

  /* ── Contact form → mailto ─────────────────────────────────────────── */

  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  function setError(name, message) {
    var field = document.querySelector('[data-err="' + name + '"]');
    var input = document.getElementById(name);
    if (field) field.textContent = message || '';
    if (input) {
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (input.parentElement) input.parentElement.classList.toggle('invalid', Boolean(message));
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var topic = document.getElementById('topic').value;
      var message = document.getElementById('message').value.trim();

      var ok = true;
      setError('name', '');
      setError('email', '');
      setError('message', '');

      if (!name) { setError('name', t('errName')); ok = false; }
      // Deliberately loose: the mail client is the real validator, and a regex
      // that rejects a valid address is worse than one that lets a typo through.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', t('errEmail')); ok = false; }
      if (!message) { setError('message', t('errMessage')); ok = false; }

      if (!ok) {
        var firstBad = form.querySelector('.invalid input, .invalid textarea');
        if (firstBad) firstBad.focus();
        return;
      }

      var body = message + '\n\n—\n' + name + '\n' + email;
      var trimmed = false;
      // Some mail clients silently truncate very long mailto URLs.
      if (body.length > 1400) { body = body.slice(0, 1400) + '\n\n[…]'; trimmed = true; }

      var href =
        'mailto:' + MAIL +
        '?subject=' + encodeURIComponent(topic + ' — ' + name) +
        '&body=' + encodeURIComponent(body);

      if (note) note.textContent = trimmed ? t('formLong') : t('formOk');
      window.location.href = href;
    });
  }

  /* ── The line that changes ─────────────────────────────────────────
     Phrases are the actual projects, not slogans. The full list also sits in
     the markup as screen-reader-only text, so nobody has to watch an animation
     to learn what is on offer — and the first phrase is in the HTML, so the
     line reads correctly with JavaScript switched off. */

  /*
   * First list is how the work is done, second is what the client is left with.
   * Adverbs then nouns, deliberately: the method earns the outcome.
   */
  var SEQUENCES = {
    en: [
      {
        lead: 'We build',
        words: ['to scale', 'securely', 'for the long term', 'transparently', 'methodically']
      },
      { lead: 'We create', words: ['value', 'quality', 'trust', 'an edge'] }
    ],
    sv: [
      {
        lead: 'Vi bygger',
        words: ['skalbart', 'säkert', 'långsiktigt', 'transparent', 'metodiskt']
      },
      { lead: 'Vi skapar', words: ['värde', 'kvalitet', 'förtroende', 'försprång'] }
    ]
  };

  var rotEl = document.getElementById('rotator-text');
  var sizerEl = document.getElementById('rotator-sizer');
  var leadEl = document.getElementById('hero-lead');
  var caretEl = document.querySelector('.caret');
  var rotTimer = null;
  var leadTimer = null;

  // Deliberately unhurried: the words are the pitch, so they have to be
  // readable rather than impressive. Typing ~85ms/char with a long hold reads
  // at about the speed you would say them out loud.
  var TYPE = 85;
  var ERASE = 40;
  var HOLD = 2600;
  var BETWEEN = 450;
  var PHASE_GAP = 900;

  function swapLead(text) {
    if (!leadEl || leadEl.textContent === text) return;
    clearTimeout(leadTimer);
    leadEl.classList.add('is-swapping');
    leadTimer = setTimeout(function () {
      leadEl.textContent = text;
      leadEl.classList.remove('is-swapping');
    }, 260);
  }

  function startRotator() {
    if (!rotEl) return;
    clearTimeout(rotTimer);
    clearTimeout(leadTimer);

    var seqs = SEQUENCES[lang] || SEQUENCES.en;
    var s = 0;
    var w = 0;
    var ch = 0;
    var deleting = false;

    if (leadEl) {
      leadEl.classList.remove('is-swapping');
      leadEl.textContent = seqs[0].lead;
    }

    if (reduced) {
      // Typing is the whole effect, so there is nothing to degrade to: one
      // phrase, no caret, and the sr-only sentence carries the rest.
      rotEl.textContent = seqs[0].words[0];
      if (sizerEl) sizerEl.textContent = seqs[0].words[0];
      if (caretEl) caretEl.style.display = 'none';
      return;
    }
    if (caretEl) caretEl.style.display = '';

    (function step() {
      var words = seqs[s].words;
      var full = words[w];

      ch += deleting ? -1 : 1;
      // A phrase is starting: hand the invisible sizer the whole of it, so the
      // row already has its finished width before the first letter lands and
      // the centred line does not shuffle as it types.
      if (!deleting && ch === 1 && sizerEl) sizerEl.textContent = full;
      rotEl.textContent = full.slice(0, Math.max(0, ch));

      var delay = deleting ? ERASE : TYPE;

      if (!deleting && ch >= full.length) {
        deleting = true;
        delay = HOLD;
      } else if (deleting && ch <= 0) {
        deleting = false;
        w += 1;
        if (w >= words.length) {
          // List exhausted — hand over to the next lead word.
          w = 0;
          s = (s + 1) % seqs.length;
          swapLead(seqs[s].lead);
          delay = PHASE_GAP;
        } else {
          delay = BETWEEN;
        }
      }

      rotTimer = setTimeout(step, delay);
    })();
  }

  onLangChange = startRotator;
  startRotator();

  /* ── Easter egg: type "inat" ───────────────────────────────────────── */

  var buffer = '';
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-4);
    if (buffer === 'inat') {
      document.body.classList.toggle('inat-mode');
      toast('iz inata 🇧🇦');
      buffer = '';
    }
  });
})();
