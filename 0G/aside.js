// === SCROLL KE BAGIAN (untuk sub-link sidebar collapsible) ===
function scrollToSection(id, el) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });

  document.querySelectorAll('.sub-links a').forEach(link => {
    link.classList.remove('active-link');
  });
  el.classList.add('active-link');
}

// === TOGGLE SUBMENU ===
function toggleSubLinks(element) {
  document.querySelectorAll('.sub-links').forEach(el => el.classList.remove('show'));
  const sub = element.querySelector('.sub-links');
  if (sub) sub.classList.add('show');
}

// === LOAD HALAMAN HTML KE DALAM <main> TANPA RELOAD ===
function loadPage(name) {
  const target = `pages/${name}.html`;
  const container = document.getElementById('content-area');
  container.innerHTML = `<p class="loading">Loading <code>${name}</code>...</p>`;

  fetch(target)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch ${target} (status: ${res.status})`);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, "", `#${name}`);

      // Highlight menu yang aktif
      document.querySelectorAll("aside a").forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("onclick")?.includes(name)) {
          link.classList.add("active-link");
        }
      });

      // Rebinding tombol copy jika ada
      if (typeof copyText === "function") {
        document.querySelectorAll('.code-box').forEach(box => {
          const button = box.querySelector('.copy-button');
          if (button) {
            button.onclick = () => copyText(button);
          }
        });
      }
    })
    .catch(err => {
      container.innerHTML = `<p style="color:red;">❌ Error loading <code>${name}</code>: ${err.message}</p>`;
      console.error("❌ Failed to load page:", err);
    });
}

// === AUTO LOAD SAAT PERTAMA KALI BUKA ATAU REFRESH ===
document.addEventListener("DOMContentLoaded", () => {
  const defaultPage = location.hash.replace("#", "") || "overview";
  loadPage(defaultPage);
});
