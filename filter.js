// NFT Filter & Sort Module
let allCollections = [];
let activeFilter = 'all';
let sortBy = 'newest';

function initFilters(collections) {
  allCollections = collections;
  renderFilterBar();
  applyFilter();
}

function renderFilterBar() {
  const container = document.querySelector('.filter-bar');
  if (!container) return;

  container.innerHTML = `
    <button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}"
      onclick="setFilter('all')">All (${allCollections.length})</button>
    <button class="filter-btn ${activeFilter === 'multi' ? 'active' : ''}"
      onclick="setFilter('multi')">Multiple Tokens</button>
    <button class="filter-btn ${activeFilter === 'single' ? 'active' : ''}"
      onclick="setFilter('single')">Single Token</button>
    <select onchange="setSort(this.value)"
      style="background:var(--card);border:1px solid var(--border);
      color:var(--text);padding:6px 12px;border-radius:20px;
      font-size:13px;margin-left:auto">
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="most">Most Tokens</option>
      <option value="az">A-Z</option>
    </select>
  `;
}

function setFilter(filter) {
  activeFilter = filter;
  renderFilterBar();
  applyFilter();
}

function setSort(sort) {
  sortBy = sort;
  applyFilter();
}

function applyFilter() {
  let filtered = [...allCollections];

  if (activeFilter === 'multi') {
    filtered = filtered.filter(c => c.tokens.length > 1);
  } else if (activeFilter === 'single') {
    filtered = filtered.filter(c => c.tokens.length === 1);
  }

  switch (sortBy) {
    case 'oldest':
      filtered.reverse();
      break;
    case 'most':
      filtered.sort((a, b) => b.tokens.length - a.tokens.length);
      break;
    case 'az':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderNFTGrid(filtered);
}