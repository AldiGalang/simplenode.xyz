function copyText(target) {
    const box = target.closest('.code-box') || target;
  
    const text = box.querySelector('.copy-text').innerText.trim();
    const label = box.querySelector('.copied-label');
    const icon = box.querySelector('.copy-icon');
    const button = box.querySelector('.copy-button');
  
    navigator.clipboard.writeText(text).then(() => {
      // Tampilkan label
      label.style.opacity = '1';
  
      // Tambahkan efek ikon success (jika tombol ada)
      if (button && icon) {
        button.classList.add('success');
        icon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
        `;
      }
  
      setTimeout(() => {
        label.style.opacity = '0';
  
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
    });
  }

  // Tambahkan klik ke seluruh code-box
document.querySelectorAll('.code-box').forEach(box => {
    box.addEventListener('click', (e) => {
      const isButton = e.target.closest('.copy-button');
      if (!isButton) {
        copyText(box);
      }
    });
  });
  