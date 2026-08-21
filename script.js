const products = [
  // --- РІДИНИ ---
  {
    id: 1,
    name: "Chaser For Pods Triple Berry",
    brand: "CHASER",
    price: 280,
    oldPrice: 320,
    category: "liquids",
    badge: "SALE",
    meta: ["30 ml", "50 мг"]
  },
  {
    id: 2,
    name: "Flavorlab FL 350 Watermelon Ice",
    brand: "FLAVORLAB",
    price: 320,
    oldPrice: 350,
    category: "liquids",
    badge: "SALE",
    meta: ["30 ml", "50 мг"]
  },
  {
    id: 3,
    name: "Octobar Passion Fruit Ice",
    brand: "OCTOBAR",
    price: 330,
    oldPrice: null,
    category: "liquids",
    badge: "NEW",
    meta: ["30 ml", "50 мг"]
  },
  {
    id: 4,
    name: "Mood Duck Sour Apple",
    brand: "MOOD DUCK",
    price: 310,
    oldPrice: null,
    category: "liquids",
    badge: "TOP",
    meta: ["30 ml", "50 мг"]
  },
  {
    id: 5,
    name: "Punch Energy Wild Peach",
    brand: "PUNCH",
    price: 300,
    oldPrice: null,
    category: "liquids",
    badge: null,
    meta: ["30 ml", "50 мг"]
  },
  {
    id: 6,
    name: "Lucky Blueberry Sour Raspberry",
    brand: "LUCKY",
    price: 290,
    oldPrice: 340,
    category: "liquids",
    badge: "SALE",
    meta: ["30 ml", "50 мг"]
  },

  // --- POD-СИСТЕМИ ---
  {
    id: 7,
    name: "Vaporesso XROS 3 MINI Black",
    brand: "VAPORESSO",
    price: 720,
    oldPrice: null,
    category: "pods",
    badge: "TOP",
    meta: ["1000 mAh", "2 мл"]
  },
  {
    id: 8,
    name: "Vaporesso XROS 4 MINI Space Grey",
    brand: "VAPORESSO",
    price: 820,
    oldPrice: 900,
    category: "pods",
    badge: "NEW",
    meta: ["1000 mAh", "3 мл"]
  },
  {
    id: 9,
    name: "OXVA XLIM GO Blue",
    brand: "OXVA",
    price: 650,
    oldPrice: 700,
    category: "pods",
    badge: "SALE",
    meta: ["1000 mAh", "2 мл"]
  },
  {
    id: 10,
    name: "Voopoo Vmate E2 Green",
    brand: "VOOPOO",
    price: 950,
    oldPrice: null,
    category: "pods",
    badge: "NEW",
    meta: ["1500 mAh", "3 мл"]
  },

  // --- КАРТРИДЖІ ---
  {
    id: 11,
    name: "Картридж Vaporesso XROS 0.6 Ohm",
    brand: "VAPORESSO",
    price: 150,
    oldPrice: null,
    category: "cartridges",
    badge: "TOP",
    meta: ["3 мл", "0.6 Ом"]
  },
  {
    id: 12,
    name: "Картридж OXVA XLIM V2 0.8 Ohm",
    brand: "OXVA",
    price: 150,
    oldPrice: 170,
    category: "cartridges",
    badge: "SALE",
    meta: ["2 мл", "0.8 Ом"]
  },
  {
    id: 13,
    name: "Картридж Voopoo Vmate Top Fill 0.7 Ohm",
    brand: "VOOPOO",
    price: 160,
    oldPrice: null,
    category: "cartridges",
    badge: null,
    meta: ["3 мл", "0.7 Ом"]
  }
];

let cart = [];
let favorites = [];
let currentCategory = 'liquids';
let currentTag = 'all';
let currentBrand = 'all';
let searchQuery = '';

const categoryMeta = {
  liquids: { label: 'РІДИНИ', title: 'Обери свій смак' },
  pods: { label: 'POD-СИСТЕМИ', title: 'Обери свій пристрій' },
  cartridges: { label: 'КАРТРИДЖІ', title: 'Обери картридж' }
};

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchCat = p.category === currentCategory;
    const matchTag = currentTag === 'all' || p.badge === currentTag;
    const matchBrand = currentBrand === 'all' || p.brand === currentBrand;
    const matchSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery) || 
      p.brand.toLowerCase().includes(searchQuery);

    return matchCat && matchTag && matchBrand && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} товарів`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 40px 0;">Товарів не знайдено</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isFav = favorites.includes(p.id);
    const badgeHtml = p.badge ? `<span class="product-badge badge-${p.badge.toLowerCase()}">${p.badge}</span>` : '';
    const oldPriceHtml = p.oldPrice ? `<span class="old-price">${p.oldPrice} ₴</span>` : '';
    const metaHtml = p.meta.map(m => `<span class="meta-tag">${m}</span>`).join(' ');

    return `
      <div class="product-card">
        <div class="product-visual">
          ${badgeHtml}
          <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${p.id}, this)" aria-label="Обране">
            ${isFav ? '♥' : '♡'}
          </button>
        </div>
        <div class="product-info">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-meta">${metaHtml}</div>
          <div class="product-footer">
            <div class="price-container">
              ${oldPriceHtml}
              <div class="price">${p.price} ₴</div>
            </div>
            <button class="add-button" onclick="addToCart(${p.id})" aria-label="Додати в кошик">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
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

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCartCounters();
    updateCartUI();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCounters();
  updateCartUI();
}

function updateCartCounters() {
  const count = cart.length;
  const headerCount = document.getElementById('header-cart-count');
  const navCount = document.getElementById('nav-cart-count');

  if (headerCount) headerCount.textContent = count;
  if (navCount) navCount.textContent = count;
}

function updateCartUI() {
  const itemsContainer = document.getElementById('cart-items-list');
  const totalPriceEl = document.getElementById('cart-total-price');

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 20px;">Кошик порожній</div>';
    } else {
      itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div>
            <div class="cart-item-title">${item.name}</div>
            <div style="font-size: 11px; color: #6b7280;">${item.brand}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="cart-item-price">${item.price} ₴</span>
            <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer;">✕</button>
          </div>
        </div>
      `).join('');
    }
  }

  if (totalPriceEl) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.textContent = `${total} ₴`;
  }
}

function toggleFavorite(id, btn) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  renderProducts();
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.add('open');
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.remove('open');
}

function checkout() {
  if (cart.length === 0) {
    alert('Ваш кошик порожній!');
    return;
  }
  
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(cart));
  } else {
    alert('Замовлення успішно оформлено!');
  }

  cart = [];
  updateCartCounters();
  updateCartUI();
  closeCart();
}

function switchTab(tab, btn) {
  document.querySelectorAll('.bottom-nav .nav-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (tab === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tab === 'fav') {
    alert(`В обраному товарів: ${favorites.length}`);
  } else if (tab === 'profile') {
    alert('Профіль користувача');
  }
}

function focusSearch(btn) {
  switchTab('search', btn);
  const input = document.getElementById('search');
  if (input) {
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }

  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  renderBrands();
  renderProducts();
  updateCartCounters();
  updateCartUI();
});
