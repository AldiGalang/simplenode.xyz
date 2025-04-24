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

// === SALIN TEKS DAN TAMPILKAN 'Copied!' (dengan fallback) ===
function copyText(target) {
  console.log("🔧 copyText() triggered");

  const box = target.closest('.code-box') || target;
  if (!box) return console.warn("⚠️ .code-box not found");

  const text = box.querySelector('.copy-text')?.innerText?.trim();
  const label = box.querySelector('.copied-label');
  const icon = box.querySelector('.copy-icon');
  const button = box.querySelector('.copy-button');

  if (!text) {
    console.warn("⚠️ copy-text not found or empty");
    return;
  }

  console.log("📋 Text to copy:", text);

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showCopiedEffect(label, button, icon))
      .catch(err => {
        console.error("❌ Clipboard API failed:", err);
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      showCopiedEffect(label, button, icon);
    } catch (err) {
      console.error("❌ execCommand fallback failed:", err);
    }

    document.body.removeChild(textarea);
  }
}

function showCopiedEffect(label, button, icon) {
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
}

// === JALANKAN SAAT DOM SIAP ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded — JS aktif");

  const current = window.location.pathname.split("/").filter(Boolean).pop();
  const links = document.querySelectorAll("aside a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href === current) {
      link.classList.add("active-link");
    }
  });

  // Salin teks saat klik code-box atau ikon
  document.querySelectorAll('.code-box').forEach(box => {
    // Klik seluruh kotak
    box.addEventListener('click', () => {
      copyText(box);
    });

    // Klik ikon (hindari klik ganda)
    const button = box.querySelector('.copy-button');
    if (button) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        copyText(box);
      });
    }
  });
});
