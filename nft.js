// NFT Fetcher Module
async function fetchNFTs(address) {
  try {
    const response = await fetch(
      `https://api.basescan.org/api?module=account&action=tokennfttx&address=${address}&sort=desc`
    );
    const data = await response.json();
    return data.result || [];
  } catch {
    return [];
  }
}

function groupByCollection(nfts) {
  const groups = {};
  nfts.forEach(nft => {
    const key = nft.contractAddress;
    if (!groups[key]) {
      groups[key] = {
        contract: nft.contractAddress,
        name: nft.tokenName || 'Unknown Collection',
        symbol: nft.tokenSymbol || '?',
        tokens: []
      };
    }
    if (!groups[key].tokens.find(t => t.tokenID === nft.tokenID)) {
      groups[key].tokens.push({
        tokenID: nft.tokenID,
        hash: nft.hash
      });
    }
  });
  return Object.values(groups);
}

async function loadNFTs() {
  const input = document.querySelector('#wallet-input');
  const address = input?.value?.trim();

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    alert('Please enter a valid wallet address!');
    return;
  }

  const grid = document.querySelector('#nft-grid');
  if (grid) grid.innerHTML = '<p style="text-align:center;color:#888;grid-column:1/-1">Loading NFTs...</p>';

  const nfts = await fetchNFTs(address);
  const collections = groupByCollection(nfts);

  const countEl = document.querySelector('#nft-count');
  if (countEl) countEl.textContent = `${nfts.length} NFTs found`;

  renderNFTGrid(collections);
}

function renderNFTGrid(collections) {
  const grid = document.querySelector('#nft-grid');
  if (!grid) return;

  if (collections.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#888;grid-column:1/-1">No NFTs found</p>';
    return;
  }

  const EMOJIS = ['🎨', '🖼️', '🎭', '🏆', '💎', '🌟', '🦄', '🐉'];

  grid.innerHTML = collections.map((col, i) => `
    <div class="nft-card">
      <div class="nft-img">${EMOJIS[i % EMOJIS.length]}</div>
      <div class="nft-info">
        <div class="nft-name">${col.name}</div>
        <div class="nft-collection">${col.symbol} · ${col.tokens.length} token${col.tokens.length > 1 ? 's' : ''}</div>
        <a href="https://basescan.org/token/${col.contract}" 
          target="_blank"
          style="color:#0052ff;font-size:12px;text-decoration:none">
          View on BaseScan →
        </a>
      </div>
    </div>
  `).join('');
}