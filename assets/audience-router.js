(function () {
  'use strict';

  var STORAGE_KEY = 'intac-audience-choice-v2';
  var VALID_FOR_MS = 30 * 24 * 60 * 60 * 1000;
  var FIDUCIARY_URL = 'https://trusteeinsuranceagency.com/';
  var GENERAL_URL = 'https://intacadvisory.com/';

  function isFiduciarySite() {
    return window.location.hostname.indexOf('trusteeinsuranceagency') !== -1 ||
      /Trustee Insurance Agency/i.test(document.title) ||
      Boolean(document.querySelector('img[alt="Trustee Insurance Agency"]'));
  }

  function readChoice() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (!saved || (saved.audience !== 'fiduciary' && saved.audience !== 'general')) return null;
      if (!saved.expires || saved.expires < Date.now()) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return saved.audience;
    } catch (error) {
      return null;
    }
  }

  function saveChoice(audience) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        audience: audience,
        expires: Date.now() + VALID_FOR_MS
      }));
    } catch (error) {
      // The choice still works for this visit when storage is unavailable.
    }
  }

  function incomingChoice() {
    var url = new URL(window.location.href);
    var audience = url.searchParams.get('audience');
    if (audience !== 'fiduciary' && audience !== 'general') return null;
    url.searchParams.delete('audience');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    return audience;
  }

  function routeTo(audience, currentAudience, close) {
    if (audience === currentAudience) {
      saveChoice(audience);
      close();
      return;
    }

    var target = new URL(audience === 'fiduciary' ? FIDUCIARY_URL : GENERAL_URL);
    target.searchParams.set('audience', audience);
    window.location.assign(target.toString());
  }

  function installRouter() {
    if (document.querySelector('.intac-audience-router')) return;

    var currentAudience = isFiduciarySite() ? 'fiduciary' : 'general';
    var incoming = incomingChoice();
    if (incoming) {
      saveChoice(incoming);
      return;
    }
    if (readChoice() === currentAudience) return;

    var router = document.createElement('div');
    router.className = 'intac-audience-router';
    router.innerHTML =
      '<section class="intac-audience-router__dialog" role="dialog" aria-modal="true" aria-labelledby="intac-audience-title" aria-describedby="intac-audience-description">' +
        '<button class="intac-audience-router__close" type="button" aria-label="Continue on this website">&times;</button>' +
        '<p class="intac-audience-router__eyebrow">Welcome &mdash; we&rsquo;ll guide you</p>' +
        '<h2 class="intac-audience-router__title" id="intac-audience-title">Which best describes you?</h2>' +
        '<p class="intac-audience-router__intro" id="intac-audience-description">Choose the option that fits your needs and we&rsquo;ll take you to the right team.</p>' +
        '<div class="intac-audience-router__choices">' +
          '<button class="intac-audience-router__choice intac-audience-router__choice--fiduciary" type="button" data-audience-choice="fiduciary">' +
            '<span class="intac-audience-router__choice-kicker">Fiduciary services</span>' +
            '<span class="intac-audience-router__choice-title">I&rsquo;m a fiduciary or bankruptcy professional</span>' +
            '<span class="intac-audience-router__choice-copy">For trustees, receivers, fiduciaries, and insolvency professionals.</span>' +
            '<span class="intac-audience-router__choice-arrow" aria-hidden="true">&rarr;</span>' +
          '</button>' +
          '<button class="intac-audience-router__choice intac-audience-router__choice--general" type="button" data-audience-choice="general">' +
            '<span class="intac-audience-router__choice-kicker">Business &amp; personal</span>' +
            '<span class="intac-audience-router__choice-title">I need business or personal insurance</span>' +
            '<span class="intac-audience-router__choice-copy">For companies, property owners, families, and individuals.</span>' +
            '<span class="intac-audience-router__choice-arrow" aria-hidden="true">&rarr;</span>' +
          '</button>' +
        '</div>' +
        '<p class="intac-audience-router__note">We&rsquo;ll remember your choice for 30 days.</p>' +
      '</section>';

    var previousFocus = document.activeElement;
    var closeButton = router.querySelector('.intac-audience-router__close');
    var focusable = Array.prototype.slice.call(router.querySelectorAll('button'));

    function close() {
      saveChoice(currentAudience);
      router.classList.remove('is-visible');
      document.documentElement.classList.remove('intac-audience-lock');
      window.setTimeout(function () {
        router.remove();
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
      }, 230);
    }

    router.querySelectorAll('[data-audience-choice]').forEach(function (button) {
      button.addEventListener('click', function () {
        routeTo(button.getAttribute('data-audience-choice'), currentAudience, close);
      });
    });
    closeButton.addEventListener('click', close);
    router.addEventListener('click', function (event) {
      if (event.target === router) close();
    });
    router.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    document.body.appendChild(router);
    document.documentElement.classList.add('intac-audience-lock');
    window.requestAnimationFrame(function () {
      router.classList.add('is-visible');
      closeButton.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installRouter);
  } else {
    installRouter();
  }
})();
