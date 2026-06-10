// NFT Stats Module
function calculateNFTStats(collections) {
  const totalCollections = collections.length;
  const totalTokens = collections.reduce((sum, c) => sum + c.tokens.length, 0);
  const largestCollection = collections.reduce((max, c) =>
    c.tokens.length > (max?.tokens.length || 0) ? c : max, null
  );
  const uniqueContracts = new Set(collections.map(c => c.contract)).size;

  return {
    totalCollections,
    totalTokens,
    largestCollection,
    uniqueContracts
  };
}

function renderNFTStats(collections) {
  const container = document.querySelector('#nft-stats');
  if (!container) return;

  const stats = calculateNFTStats(collections);

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
      gap:12px;max-width:900px;margin:24px auto;padding:0 24px">
      <div style="background:#1a1b1f;border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#0052ff">
          ${stats.totalCollections}
        </div>
        <div style="color:#888;font-size:13px;margin-top:4px">Collections</div>
      </div>
      <div style="background:#1a1b1f;border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#00c853">
          ${stats.totalTokens}
        </div>
        <div style="color:#888;font-size:13px;margin-top:4px">Total NFTs</div>
      </div>
      <div style="background:#1a1b1f;border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#ffab00">
          ${stats.uniqueContracts}
        </div>
        <div style="color:#888;font-size:13px;margin-top:4px">Contracts</div>
      </div>
      <div style="background:#1a1b1f;border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:20px;font-weight:bold;color:#ff3d00;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          ${stats.largestCollection?.name || '—'}
        </div>
        <div style="color:#888;font-size:13px;margin-top:4px">Largest</div>
      </div>
    </div>
  `;
}