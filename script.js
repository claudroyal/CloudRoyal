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

let activeCategory = 'liquids';
let activeTag = 'all';
let activeBrand = 'all';
let searchQuery = '';

const categoryMeta = {
  liquids: { label: 'РІДИНИ', title: 'Обери свій смак' },
  pods: { label: 'POD-СИСТЕМИ', title: 'Обери свій пристрій' },
  cartridges: { label: 'КАРТРИДЖІ', title: 'Обери картридж' }
};

// Зміна категорії
window.setCategory = function(cat, el) {
  activeCategory = cat;
  activeBrand = 'all';

  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    const target = document.querySelector(`.cat-card[onclick*="${cat}"]`);
    if (target) target.classList.add('active');
  }

  const catLabel = document.getElementById('current-cat-label');
  const catTitle = document.getElementById('current-cat-title');
  if (catLabel) catLabel.textContent = categoryMeta[cat]?.label || 'КАТАЛОГ';
  if (catTitle) catTitle.textContent = categoryMeta[cat]?.title || 'Товари';

  renderBrands();
  renderProducts();
};

// Зміна тегу (Новинки / Популярне / Знижки)
window.setTag = function(tag, el) {
  activeTag = tag;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
};

// Зміна бренду
window.setBrand = function(brand, el) {
  activeBrand = brand;
  document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
};

// Отрисовка кнопок брендів
function renderBrands() {
  const container = document.getElementById('brands-container');
  if (!container) return;

  const catBrands = ['all', ...new Set(products.filter(p => p.category === activeCategory).map(p => p.brand))];

  container.innerHTML = catBrands.map(b => `
    <button class="brand-chip ${b === activeBrand ? 'active' : ''}" onclick="window.setBrand('${b}', this)">
      ${b === 'all' ? 'Всі' : b}
    </button>
  `).join('');
}

// Отрисовка сітки товарів
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchCat = p.category === activeCategory;
    const matchTag = activeTag === 'all' || p.tag === activeTag;
    const matchBrand = activeBrand === 'all' || p.brand === activeBrand;
    const matchSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery) || 
      p.brand.toLowerCase().includes(searchQuery);

    return matchCat && matchTag && matchBrand && matchSearch;
  });

  const countElem = document.getElementById('products-count');
  if (countElem) countElem.textContent = `${filtered.length} товарів`;

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
          <button class="btn-buy" onclick="alert('Додано ${p.name}')">В кошик</button>
        </div>
      </div>
    `;
  }).join('');
}

// Ініціалізація після завантаження сторінки
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
