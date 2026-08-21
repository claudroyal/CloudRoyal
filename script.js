const products = [
  // --- РІДИНИ ---
  { id: 1, category: "liquids", brand: "CHASER", name: "Chaser Black — Triple Berry", volume: "30 ml", price: 350, oldPrice: null, tag: "popular" },
  { id: 2, category: "liquids", brand: "FLAVORLAB", name: "Flavorlab FL 350 — Watermelon Ice", volume: "30 ml", price: 320, oldPrice: 350, tag: "sale" },
  { id: 3, category: "liquids", brand: "OCTOBAR", name: "Octobar Passion Fruit", volume: "30 ml", price: 330, oldPrice: null, tag: "new" },
  { id: 4, category: "liquids", brand: "MOOD DUCK", name: "Mood Duck — Sour Apple", volume: "30 ml", price: 310, oldPrice: null, tag: null },
  { id: 5, category: "liquids", brand: "PUNCH", name: "Punch Energy — Wild Peach", volume: "30 ml", price: 300, oldPrice: null, tag: "popular" },

  // --- POD-СИСТЕМИ ---
  { id: 6, category: "pods", brand: "VAPORESSO", name: "XROS 3 MINI — Black", volume: "2 ml", price: 720, oldPrice: null, tag: "popular" },
  { id: 7, category: "pods", brand: "VAPORESSO", name: "XROS 3 MINI — Space Grey", volume: "2 ml", price: 720, oldPrice: null, tag: null },
  { id: 8, category: "pods", brand: "VAPORESSO", name: "XROS 4 MINI — Black", volume: "3 ml", price: 820, oldPrice: null, tag: "new" },
  { id: 9, category: "pods", brand: "OXVA", name: "OXVA XLIM GO — Blue", volume: "2 ml", price: 650, oldPrice: 700, tag: "sale" },

  // --- КАРАТРИДЖІ ---
  { id: 10, category: "cartridges", brand: "VAPORESSO", name: "Картридж XROS 0.6 Ohm", volume: "2 ml", price: 150, oldPrice: null, tag: "popular" },
  { id: 11, category: "cartridges", brand: "OXVA", name: "Картридж XLIM 0.8 Ohm", volume: "2 ml", price: 150, oldPrice: null, tag: null }
];

let currentCategory = 'liquids';
let currentTag = 'all';
let currentBrand = 'all';
let searchQuery = '';

const categoryMeta = {
  liquids: { label: 'РІДИНИ', title: 'Обери свій смак' },
  pods: { label: 'POD-СИСТЕМИ', title: 'Обери свій пристрій' },
  cartridges: { label: 'КАРТРИДЖІ', title: 'Обери картридж' }
};

function selectCategory(cat, element) {
  currentCategory = cat;
  currentBrand = 'all';

  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  if (element) element.classList.add('active');

  const labelEl = document.getElementById('current-cat-label');
  const titleEl = document.getElementById('current-cat-title');
  if (labelEl) labelEl.textContent = categoryMeta[cat].label;
  if (titleEl) titleEl.textContent = categoryMeta[cat].title;

  renderBrands();
  renderProducts();
}

function selectTag(tag, element) {
  currentTag = tag;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  if (element) element.classList.add('active');
  renderProducts();
}

function selectBrand(brand, element) {
  currentBrand = brand;
  document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
  if (element) element.classList.add('active');
  renderProducts();
}

function renderBrands() {
  const container = document.getElementById('brands-container');
  if (!container) return;

  const catBrands = ['all', ...new Set(products.filter(p => p.category === currentCategory).map(p => p.brand))];

  container.innerHTML = catBrands.map(b => `
    <button class="brand-chip ${b === currentBrand ? 'active' : ''}" onclick="selectBrand('${b}', this)">
      ${b === 'all' ? 'Всі' : b}
    </button>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchCat = p.category === currentCategory;
    const matchTag = currentTag === 'all' || p.tag === currentTag;
    const matchBrand = currentBrand === 'all' || p.brand === currentBrand;
    const matchSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery) || 
      p.brand.toLowerCase().includes(searchQuery);

    return matchCat && matchTag && matchBrand && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} товарів`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 30px 0;">Нічого не знайдено</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    let badge = '';
    if (p.tag === 'new') badge = `<span class="badge badge-new">NEW</span>`;
    if (p.tag === 'sale') badge = `<span class="badge badge-sale">SALE</span>`;
    if (p.tag === 'popular') badge = `<span class="badge badge-popular">TOP</span>`;

    return `
      <div class="product-card">
        ${badge}
        <div>
          <div class="p-brand">${p.brand}</div>
          <div class="p-title">${p.name}</div>
          <div class="p-spec">${p.volume}</div>
        </div>
        <div class="p-bottom">
          <div class="p-price-box">
            ${p.oldPrice ? `<span class="p-old-price">${p.oldPrice} ₴</span>` : ''}
            <span class="p-price">${p.price} ₴</span>
          </div>
          <button class="btn-buy" onclick="alert('Додано: ${p.name}')">В кошик</button>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  renderBrands();
  renderProducts();
});
