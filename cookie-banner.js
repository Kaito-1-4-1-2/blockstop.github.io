(function () {
  const STORAGE_KEY = 'blockstop_cookie_consent';

  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const settingsToggle = document.getElementById('cookie-settings-toggle');
  const settingsBox = document.getElementById('cookie-settings');
  const analytics = document.getElementById('cookie-analytics');
  const marketing = document.getElementById('cookie-marketing');

  if (!banner || !acceptBtn || !rejectBtn) return;

  function saveConsent(consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    banner.hidden = true;
  }

  function loadConsent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function showBanner() {
    banner.hidden = false;
  }

  function applyConsent(consent) {
    if (consent.analytics) {
      console.log('Analytics enabled');
    }

    if (consent.marketing) {
      console.log('Marketing enabled');
    }
  }

  const storedConsent = loadConsent();

  if (!storedConsent) {
    showBanner();
  } else {
    applyConsent(storedConsent);
  }

  acceptBtn.addEventListener('click', function () {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
    applyConsent({ analytics: true, marketing: true });
  });

  rejectBtn.addEventListener('click', function () {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false
    });
  });

  if (settingsToggle && settingsBox) {
    settingsToggle.addEventListener('click', function () {
      settingsBox.hidden = !settingsBox.hidden;
    });
  }

  const saveBtn = document.getElementById('cookie-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      saveConsent({
        necessary: true,
        analytics: !!analytics && analytics.checked,
        marketing: !!marketing && marketing.checked
      });
    });
  }
})();