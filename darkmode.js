// Dark/Light Mode Toggle
function initTheme() {
  const saved = localStorage.getItem('nft_theme') || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  const btn = document.querySelector('#theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';

  const style = document.getElementById('theme-style') ||
    document.createElement('style');
  style.id = 'theme-style';

  style.textContent = theme === 'light' ? `
    body { background: #f5f5f5 !important; color: #000 !important; }
    .nft-card, .navbar { background: #ffffff !important; }
    .nft-img { background: linear-gradient(135deg,#e8e8e8,#d0d0d0) !important; }
    .nft-collection { color: #555 !important; }
    input { background: #fff !important; color: #000 !important; 
      border-color: #ddd !important; }
  ` : '';

  document.head.appendChild(style);
  localStorage.setItem('nft_theme', theme);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function addThemeButton() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.style.cssText = `
    background: none;
    border: 1px solid #2a2b2f;
    color: #fff;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  `;
  btn.onclick = toggleTheme;
  navbar.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', () => {
  addThemeButton();
  initTheme();
});