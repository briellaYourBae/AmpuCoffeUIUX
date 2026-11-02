const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const header = document.getElementById('site-header');
const menuLines = menuToggle.querySelectorAll('.menu-line');
const backToTopButton = document.getElementById('back-to-top');

function setMobileMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  mobileNav.classList.toggle('hidden', !isOpen);
  menuLines[0].classList.toggle('rotate-45', isOpen);
  menuLines[0].classList.toggle('translate-y-2', isOpen);
  menuLines[1].classList.toggle('opacity-0', isOpen);
  menuLines[2].classList.toggle('-rotate-45', isOpen);
  menuLines[2].classList.toggle('-translate-y-2', isOpen);
}

menuToggle.addEventListener('click', () => {
  setMobileMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => setMobileMenuOpen(false));
});

backToTopButton.addEventListener('click', () => {
  const scrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = scrollBehavior;
  });
});

const marqueeTrack = document.querySelector('.marquee-track');
const marqueeContent = marqueeTrack.querySelector('.marquee-content');

function fillMarquee() {
  marqueeTrack.querySelectorAll('.marquee-content[aria-hidden="true"]').forEach((clone) => clone.remove());

  const contentWidth = marqueeContent.getBoundingClientRect().width;
  if (!contentWidth) return;

  const contentCopies = Math.ceil(window.innerWidth / contentWidth) + 1;
  for (let index = 1; index < contentCopies; index += 1) {
    const clone = marqueeContent.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marqueeTrack.appendChild(clone);
  }

  marqueeTrack.style.setProperty('--marquee-distance', `${contentWidth}px`);
  marqueeTrack.style.setProperty('--marquee-duration', `${contentWidth / 36}s`);
}

fillMarquee();
document.fonts.ready.then(fillMarquee);
window.addEventListener('resize', fillMarquee, { passive: true });

const menuPhotoAssets = {
  'Crash Coffee': 'image/menu/crash-coffee.jpg',
  'Coffee Latte': 'image/menu/coffee-latte.jpg',
  Americano: 'image/menu/americano.jpg',
  'Coffee Palm Sugar': 'image/menu/coffee-palm-sugar.jpg',
  'Coffee Caramel Regal': 'image/menu/coffee-caramel-regal.jpg',
  'Coffee Butterchoc': 'image/menu/coffee-butterchoc.jpg',
  'Coffee Matchalatte': 'image/menu/coffee-matchalatte.jpg',
  'Coffee Signature': 'image/menu/coffee-signature.jpg',
  'Manual Brew': 'image/menu/manual-brew.jpg',
  'Ice Tea': 'image/menu/ice-tea.jpg',
  'Lemon Tea': 'image/menu/lemon-tea.jpg',
  'Teh Tarik': 'image/menu/teh-tarik.jpg',
  'Milo+Fullcream': 'image/menu/milo-fullcream.jpg',
  Chocholatte: 'image/menu/chocholatte.jpg',
  Kusuda: 'image/menu/kusuda.jpg',
  Redvelvet: 'image/menu/redvelvet.jpg',
  'Thai Tea': 'image/menu/thai-tea.jpg',
  Matchalatte: 'image/menu/matchalatte.jpg',
  'Otak-Otak': 'image/menu/otak-otak.jpg',
  'Pop Mie': 'image/menu/pop-mie.jpg',
  'Roti Bakar Klasik': 'image/menu/roti-bakar-klasik.jpg',
  Cireng: 'image/menu/cireng.jpg',
  Kebab: 'image/menu/kebab.jpg',
  'French Fries': 'image/menu/french-fries.jpg',
  'Mix Platter': 'image/menu/mix-platter.jpg',
  'Roti Meriam Original': 'image/menu/roti-meriam-original.jpg',
  'Roti Meriam Coklat Keju': 'image/menu/roti-meriam-coklat-keju.jpg'
};

document.querySelectorAll('.menu-photo-placeholder').forEach((photoContainer) => {
  const menuName = photoContainer.closest('.menu-card').querySelector('h3').textContent.trim();
  const photoPath = photoContainer.dataset.photo;
  const photo = document.createElement('img');

  photo.src = photoPath && photoPath !== '#'
    ? photoPath
    : menuPhotoAssets[menuName] || 'image/default/Desainer.png';
  photo.alt = `Foto menu ${menuName}`;
  photo.loading = 'lazy';
  photo.decoding = 'async';
  photo.addEventListener('error', () => {
    console.error(`Foto menu tidak dapat dimuat: ${photo.src}`);
  }, { once: true });
  photoContainer.replaceChildren(photo);
});

document.querySelectorAll('.filter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach((item) => {
      const active = item === button;
      item.setAttribute('aria-pressed', String(active));
      item.classList.toggle('bg-espresso', active);
      item.classList.toggle('text-cream', active);
      item.classList.toggle('border', !active);
      item.classList.toggle('border-espresso/20', !active);
    });

    document.querySelectorAll('.menu-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
      if (visible) card.classList.add('is-visible');
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
let lastFocusedElement;

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  lightboxImage.src = '';

  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.gallery-button').forEach((button) => {
  button.addEventListener('click', () => {
    lastFocusedElement = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector('img').alt;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }

});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

function updateHeaderOnScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeaderOnScroll();
window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();
