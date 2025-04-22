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

// === LOAD PAGE SECARA DINAMIS TANPA RELOAD ===
function loadPage(name) {
  const target = `pages/${name}.html`;

  fetch(target)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch ${target} (status: ${res.status})`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('content-area');
      container.innerHTML = html;

      history.pushState(null, "", `#${name}`);

      // Update active class di sidebar
      document.querySelectorAll("aside a").forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("onclick")?.includes(name)) {
          link.classList.add("active-link");
        }
      });

      // Re-bind copyText ke tombol copy jika ada
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
      document.getElementById('content-area').innerHTML = `<p style="color:red;">❌ Error loading <code>${name}</code>: ${err.message}</p>`;
      console.error("❌ Failed to load page:", err);
    });
}

// === LOAD DEFAULT PAGE SAAT PERTAMA KALI BUKA ===
document.addEventListener("DOMContentLoaded", () => {
  const defaultPage = location.hash.replace("#", "") || "overview";
  loadPage(defaultPage);
});
