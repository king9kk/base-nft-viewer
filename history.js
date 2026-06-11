// NFT Search History Module
const NFT_HISTORY_KEY = 'nft_search_history';
const MAX_NFT_HISTORY = 8;

function getNFTHistory() {
  try {
    return JSON.parse(localStorage.getItem(NFT_HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveNFTSearch(address, nftCount) {
  let history = getNFTHistory();
  history = history.filter(h => h.address !== address);
  history.unshift({
    address,
    nftCount,
    searchedAt: new Date().toISOString()
  });
  if (history.length > MAX_NFT_HISTORY) {
    history = history.slice(0, MAX_NFT_HISTORY);
  }
  localStorage.setItem(NFT_HISTORY_KEY, JSON.stringify(history));
  renderNFTHistory();
}

function clearNFTHistory() {
  localStorage.removeItem(NFT_HISTORY_KEY);
  renderNFTHistory();
  showToast('Search history cleared!');
}

function renderNFTHistory() {
  const container = document.querySelector('#nft-history');
  if (!container) return;

  const history = getNFTHistory();

  container.innerHTML = `
    <div style="max-width:900px;margin:0 auto 24px;padding:0 24px">
      <div style="display:flex;justify-content:space-between;
        align-items:center;margin-bottom:12px">
        <h3>🕒 Recent Searches</h3>
        ${history.length > 0 ? `
          <button onclick="clearNFTHistory()"
            style="background:none;border:none;color:#888;
            cursor:pointer;font-size:13px">Clear</button>
        ` : ''}
      </div>
      ${history.length === 0
        ? '<p style="color:#888;font-size:14px">No recent searches</p>'
        : `<div style="display:flex;gap:8px;flex-wrap:wrap">
            ${history.map(h => `
              <button onclick="loadFromHistory('${h.address}')"
                style="background:#1a1b1f;border:1px solid #2a2b2f;
                color:#fff;padding:6px 12px;border-radius:20px;
                cursor:pointer;font-size:13px;display:flex;
                align-items:center;gap:6px">
                <span>${h.address.slice(0, 6)}...${h.address.slice(-4)}</span>
                <span style="color:#0052ff">${h.nftCount} NFTs</span>
              </button>
            `).join('')}
          </div>`
      }
    </div>
  `;
}

function loadFromHistory(address) {
  const input = document.querySelector('#wallet-input');
  if (input) input.value = address;
  loadNFTs();
}

document.addEventListener('DOMContentLoaded', renderNFTHistory);