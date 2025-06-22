// Gestion de la bannière cookie RGPD-Compliant

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const customizeBtn = document.getElementById('cookie-customize');
  const moreInfo = document.getElementById('cookie-more-info');
  const cancelBtn = document.getElementById('cookie-cancel');
  const form = document.getElementById('cookie-form');
  const manageBtn = document.getElementById('cookie-manage');

  // Vérifie si le consentement a déjà été donné
  if (localStorage.getItem('cookieConsent')) {
    banner.style.display = 'none';
  }

  // Affiche ou masque le bouton 'Gérer mes cookies' selon le consentement
  function updateManageBtn() {
    if (localStorage.getItem('cookieConsent')) {
      manageBtn.style.display = 'block';
    } else {
      manageBtn.style.display = 'none';
    }
  }
  updateManageBtn();

  acceptBtn.onclick = function () {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      ads: true
    }));
    banner.style.display = 'none';
    updateManageBtn();
  };

  rejectBtn.onclick = function () {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      ads: false
    }));
    banner.style.display = 'none';
    updateManageBtn();
  };

  customizeBtn.onclick = function () {
    modal.classList.remove('hidden');
  };

  moreInfo.onclick = function (e) {
    e.preventDefault();
    alert('Plus d\'informations sur notre politique de cookies sur la page dédiée.');
  };

  cancelBtn.onclick = function () {
    modal.classList.add('hidden');
  };

  manageBtn.onclick = function () {
    modal.classList.remove('hidden');
  };

  form.onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const consent = {
      necessary: true,
      analytics: formData.get('analytics') === 'on',
      ads: formData.get('ads') === 'on'
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    modal.classList.add('hidden');
    banner.style.display = 'none';
    updateManageBtn();
  };

  // Par défaut, décocher les cases analytics et ads
  form.analytics.checked = false;
  form.ads.checked = false;
}); 