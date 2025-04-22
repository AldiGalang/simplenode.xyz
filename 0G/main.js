// === SCROLL KE SECTION & ACTIVE-LINK ===
function scrollToSection(id, el) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });

  document.querySelectorAll('.sub-links a').forEach(link => {
    link.classList.remove('active-link');
  });
  el.classList.add('active-link');
}

function toggleSubLinks(element) {
  document.querySelectorAll('.sub-links').forEach(el => {
    el.classList.remove('show');
  });
  const sub = element.querySelector('.sub-links');
  if (sub) sub.classList.add('show');
}

// === SALIN TEKS DAN TAMPILKAN 'Copied!' ===
function copyText(target) {
  const box = target.closest('.code-box') || target;

  const text = box.querySelector('.copy-text')?.innerText?.trim();
  const label = box.querySelector('.copied-label');
  const icon = box.querySelector('.copy-icon');
  const button = box.querySelector('.copy-button');

  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    if (label) label.style.opacity = '1';

    if (button && icon) {
      button.classList.add('success');
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7" />
      `;
    }

    setTimeout(() => {
      if (label) label.style.opacity = '0';

      if (button && icon) {
        button.classList.remove('success');
        icon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 16v1a2 2 0 002 2H8a2 2 0 01-2-2v-1" />
        `;
      }
    }, 1200);
  }).catch(err => {
    console.error("❌ Failed to copy text:", err);
  });
}

// === JALANKAN SETELAH HALAMAN SIAP ===
document.addEventListener("DOMContentLoaded", () => {
  // Highlight link aktif berdasarkan nama file
  const current = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll("aside a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href === current) {
      link.classList.add("active-link");
    }
  });

  // Tambahkan klik untuk salin ke setiap code-box
  document.querySelectorAll('.code-box').forEach(box => {
    box.addEventListener('click', (e) => {
      const isButton = e.target.closest('.copy-button');
      if (!isButton) {
        copyText(box);
      }
    });
  });
});
