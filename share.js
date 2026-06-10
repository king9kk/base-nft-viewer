// NFT Share Module
function shareCollection(contractAddress, name) {
  const url = `${window.location.origin}?contract=${contractAddress}`;

  if (navigator.share) {
    navigator.share({
      title: `${name} - Base NFT Viewer`,
      text: `Check out this NFT collection on Base!`,
      url
    });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Share link copied!');
    });
  }
}

function shareWalletNFTs(address) {
  const url = `${window.location.origin}?address=${address}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Wallet NFT link copied!');
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;
    padding:12px 20px;border-radius:8px;
    background:#0052ff;color:white;
    z-index:9999;font-size:14px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function generateNFTCard(collection) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0a0b0d';
  ctx.fillRect(0, 0, 400, 400);

  ctx.fillStyle = '#0052ff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(collection.name, 200, 200);

  ctx.fillStyle = '#888';
  ctx.font = '16px Arial';
  ctx.fillText(`${collection.tokens.length} NFTs on Base`, 200, 240);

  return canvas.toDataURL('image/png');
}

function downloadNFTCard(collection) {
  const dataUrl = generateNFTCard(collection);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${collection.name}-nft-card.png`;
  link.click();
  showToast('NFT card downloaded!');
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const address = params.get('address');
  if (address) {
    const input = document.querySelector('#wallet-input');
    if (input) input.value = address;
    loadNFTs();
  }
});