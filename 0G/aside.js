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

// --- MODIFIKASI DISINI ---
function loadPage(name) {
  fetch(`pages/${name}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
      history.pushState(null, "", `#${name}`);

      // Update active link
      document.querySelectorAll("aside a").forEach(link => {
        link.classList.remove("active-link");
        const href = link.getAttribute("href");
        if (href && href.includes(name)) {
          link.classList.add("active-link");
        }
      });
    })
    .catch(err => {
      document.getElementById('content-area').innerHTML = "<p>Error loading page</p>";
      console.error("❌ Failed to load page:", err);
    });
}

// Gabungkan semua DOMContentLoaded jadi satu
document.addEventListener("DOMContentLoaded", () => {
  const page = location.hash.replace("#", "") || "overview";
  loadPage(page);
});
