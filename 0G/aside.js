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

  document.addEventListener("DOMContentLoaded", () => {
    const current = window.location.pathname.split("/").filter(Boolean).pop();
    const links = document.querySelectorAll("aside a");
  
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && href === current) {
        link.classList.add("active-link");
      }
    });
  }
function loadPage(name) {
  fetch(`/pages/${name}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
      history.pushState(null, "", `#${name}`);
    })
    .catch(err => {
      document.getElementById('content-area').innerHTML = "<p>Error loading page</p>";
    });
}

// Load default based on URL hash (optional)
window.addEventListener("DOMContentLoaded", () => {
  const page = location.hash.replace("#", "") || "overview";
  loadPage(page);
});
