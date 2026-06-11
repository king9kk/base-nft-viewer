// NFT Favorites Module
const FAVORITES_KEY = 'nft_favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function toggleFavorite(contract, name) {
  let favorites = getFavorites();
  const exists = favorites.find(f => f.contract === contract);

  if (exists) {
    favorites = favorites.filter(f => f.contract !== contract);
    showToast(`Removed ${name} from favorites`);
  } else {
    favorites.push({
      contract,
      name,
      addedAt: new Date().toISOString()
    });
    showToast(`Added ${name} to favorites ❤️`);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  updateFavoriteButtons();
  renderFavorites();
}

function isFavorite(contract) {
  return getFavorites().some(f => f.contract === contract);
}

function updateFavoriteButtons() {
  document.querySelectorAll('[data-favorite]').forEach(btn => {
    const contract = btn.getAttribute('data-favorite');
    btn.textContent = isFavorite(contract) ? '❤️' : '🤍';
    btn.style.color = isFavorite(contract) ? '#ff3d00' : '#888';
  });
}

function renderFavorites() {
  const container = document.querySelector('#favorites-container');
  if (!container) return;

  const favorites = getFavorites();

  container.innerHTML = `
    <div style="max-width:900px;margin:24px auto;padding:0 24px">
      <h3 style="margin-bottom:16px">❤️ Favorites (${favorites.length})</h3>
      ${favorites.length === 0
        ? '<p style="color:#888">No favorites yet</p>'
        : `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
            ${favorites.map(fav => `
              <div style="background:#1a1b1f;border-radius:12px;padding:16px;
                border:1px solid #2a2b2f">
                <div style="font-size:32px;text-align:center;margin-bottom:8px">🎨</div>
                <div style="font-weight:bold;margin-bottom:4px">${fav.name}</div>
                <div style="display:flex;gap:8px;margin-top:8px">
                  <a href="https://basescan.org/token/${fav.contract}"
                    target="_blank"
                    style="color:#0052ff;font-size:12px;text-decoration:none">
                    View →
                  </a>
                  <button onclick="toggleFavorite('${fav.contract}','${fav.name}')"
                    style="background:none;border:none;cursor:pointer;
                    font-size:12px;color:#ff3d00;margin-left:auto">
                    Remove
                  </button>
                </div>
              </div>
            `).join('')}
          </div>`
      }
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
  updateFavoriteButtons();
});