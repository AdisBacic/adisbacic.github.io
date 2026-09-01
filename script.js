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
     there is only one copy of it to keep correct. Swedish is the overlay. */

  var sv = {
    'skip': 'Hoppa till innehållet',
    'nav.projects': 'Projekt',
    'nav.inat': 'Inat',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Hör av dig',
    'hero.kicker': 'Stockholm',
    'hero.build': 'Jag bygger',
    'hero.buildAll': 'virkdagböcker som funkar utan täckning, AI-lärare som undervisar från dina egna papper, sajter för estetiska kliniker, och privata aktieklubbar med delad portfölj.',
    'hero.thesis': 'Skill och inat, som förvandlar visioner till något som finns.',
    'hero.ctaPrimary': 'Se projekten',
    'hero.ctaSecondary': 'Hör av dig',
    'proj.badge': 'Byggt',
    'proj.title': 'Fyra saker som inte fanns förut',
    'proj.sub': 'Två är mina, två har jag varit med och byggt. Alla fyra är i drift.',
    'proj.garn.role': 'Min egen · byggd som present',
    'proj.garn.body': 'En virkdagbok till min fru. Varje varv hon loggar skrivs till telefonen först, så den fungerar i en tunnel helt utan täckning — molnet är en säkerhetskopia hon trycker på med flit, aldrig något appen väntar in. Svenska, turkiska och bosniska.',
    'proj.doc.role': 'Bidragit till',
    'proj.doc.body': 'Svenska, undervisad utifrån dina egna papper. Ladda upp hyreskontraktet eller brevet från skolan och en AI-lärare som heter Maja bygger lektionen av orden du faktiskt behövde den veckan. Taluttal, spaced repetition, CEFR A1–C2 och TISUS-förberedelse.',
    'proj.clinic.role': 'Byggt sajten',
    'proj.clinic.body': 'Sajten för en medicinsk estetisk klinik med mottagningar i Västerås och Stockholm, där varje injektion görs av legitimerad personal. En behandlingskatalog som måste vara begriplig för någon som står och funderar på att boka.',
    'proj.summit.role': 'Min egen · endast inbjudan',
    'proj.summit.body': 'En privat aktieklubb för ett gäng vänner. Någon pitchar ett case, gänget röstar, och en majoritet som går igenom agerar på det i en delad papperportfölj — sen avgör riktiga marknadspriser vem som hade rätt. Länken kräver inbjudan, så räkna med en stängd dörr.',
    'proj.closing': 'Inget av det här fanns förrän någon vägrade släppa idén. Det är hela sidans argument: kan du beskriva det tydligt går det att bygga — och det svåra var aldrig idén.',
    'inat.badge': 'Varför domänen',
    'inat.title': 'Det finns inget rent svenskt ord för det',
    'entry.pos': 'substantiv',
    'entry.lang': 'bosniska',
    'entry.def1': 'Envishet med ryggrad. Att göra saken just för att någon sagt att den inte går.',
    'entry.def2': 'Vägran att acceptera "tillräckligt nära" som svar.',
    'entry.usageTag': 'i bruk',
    'entry.usage': '"Han byggde upp det igen, sten för sten, iz inata."',
    'inat.p1': '"Envishet" är nära. "Trots" låter barnsligt. "Principfasthet" är för stelt. Inat är det som får någon att bygga upp ett hus sten för sten hellre än att låta det rivas — inte för att det är praktiskt, utan för att det är deras.',
    'inat.p2': 'Varje projekt här ovan började som en mening någon sa i förbigående. Inat är det som bär en idé förbi punkten där den slutar vara kul: fjärde omskrivningen, buggen som bara händer på någon annans telefon, veckan då ingenting fungerar. Skill avgör vad du kan bygga. Inat avgör vad som faktiskt blir färdigt.',
    'inat.day': 'Till vardags jobbar jag med finansiell mjukvara — bokföring, fintech och open banking.',
    'inat.switch': 'Envishet',
    'inat.pr1': 'Idéer är billiga. Färdigt är ovanligt.',
    'inat.pr2': 'Inga tysta fel.',
    'inat.pr3': 'Behöver det täckning för att funka, funkar det inte.',
    'inat.pr4': 'Fjärde omskrivningen är där det blir bra.',
    'contact.badge': 'Kontakt',
    'contact.title': 'Säg hej',
    'contact.sub': 'Jobb, frilans, eller en vision du vill se byggd. Formuläret öppnar din egen mejlklient — ingenting skickas via den här sidan, och det finns ingen spårning på den.',
    'contact.copy': 'Kopiera',
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
      copyOk: 'Copied ' + MAIL,
      copyFail: 'Could not copy — select it manually.',
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
      copyOk: 'Kopierade ' + MAIL,
      copyFail: 'Kunde inte kopiera — markera den manuellt.',
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
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('inat.theme', next); } catch (e) {}
    });
  }

  /* ── Mobile menu ───────────────────────────────────────────────────── */

  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Reveal on scroll ──────────────────────────────────────────────── */

  var revealables = document.querySelectorAll('.reveal');
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
        Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-in)'), function (el) {
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

  /* ── Copy the address ──────────────────────────────────────────────── */

  var copyBtn = document.getElementById('copy-mail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(MAIL).then(
          function () { toast(t('copyOk')); },
          function () { toast(t('copyFail')); }
        );
      } else {
        toast(t('copyFail'));
      }
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

  var PHRASES = {
    en: [
      'crochet diaries that work with no signal',
      'AI teachers that teach from your own paperwork',
      'sites for aesthetic clinics',
      'private stock clubs with a shared portfolio',
      'the thing somebody said could not be done'
    ],
    sv: [
      'virkdagböcker som funkar utan täckning',
      'AI-lärare som undervisar från dina egna papper',
      'sajter för estetiska kliniker',
      'privata aktieklubbar med delad portfölj',
      'det någon sa inte gick att göra'
    ]
  };

  var rotEl = document.getElementById('rotator-text');
  var caretEl = document.querySelector('.caret');
  var rotTimer = null;

  function startRotator() {
    if (!rotEl) return;
    clearTimeout(rotTimer);
    var list = PHRASES[lang] || PHRASES.en;

    if (reduced) {
      // Typing is the whole effect, so there is nothing to degrade to: show one
      // phrase, drop the caret, and let the sr-only sentence carry the rest.
      rotEl.textContent = list[0];
      if (caretEl) caretEl.style.display = 'none';
      return;
    }

    var i = 0;
    var ch = 0;
    var deleting = false;

    (function step() {
      var full = list[i];
      ch += deleting ? -1 : 1;
      rotEl.textContent = full.slice(0, Math.max(0, ch));

      var delay = deleting ? 26 : 52;
      if (!deleting && ch >= full.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && ch <= 0) {
        deleting = false;
        i = (i + 1) % list.length;
        delay = 300;
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
