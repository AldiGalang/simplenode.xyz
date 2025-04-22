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
  });
