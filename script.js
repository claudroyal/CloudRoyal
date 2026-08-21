// --- БАЗА ДАНИХ ТОВАРІВ ---
const products = [
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
    name: "Vaporesso XROS 3 MINI Black",
    brand: "VAPORESSO",
    price: 720,
    oldPrice: null,
    category: "pods",
    badge: "TOP",
    meta: ["1000 mAh", "2 мл"]
  },
  {
    id: 7,
    name: "Vaporesso XROS 4 MINI Space Grey",
    brand: "VAPORESSO",
    price: 820,
    oldPrice: 900,
    category: "pods",
    badge: "NEW",
    meta: ["1000 mAh", "3 мл"]
  },
  {
    id: 8,
    name: "Картридж Vaporesso XROS 0.6 Ohm",
    brand: "VAPORESSO",
    price: 150,
    oldPrice: null,
    category: "cartridges",
    badge: "TOP",
    meta: ["3 мл", "0.6 Ом"]
  }
];

// --- ГЛОБАЛЬНИЙ СТАН ---
let cart = []; // Масив об'єктів вида { product, count }
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

// --- ІНІЦІАЛІЗАЦІЯ TELEGRAM WEB APP ---
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.setHeaderColor) tg.setHeaderColor('#08070d');
  if (tg.setBackgroundColor) tg.setBackgroundColor('#08070d');
}

// --- УПРАВЛІННЯ МОДАЛЬНИМИ ВІКНАМИ ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalOnOverlay(event, modalId) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal(modalId);
  }
}

function goToCheckout() {
  if (cart.length === 0) return;
  closeModal('cart-modal');
  openModal('checkout-modal');
}

// --- ЛОГІКА КОШИКА ---
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ product, count: 1 });
  }

  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred('light');
  }

  updateCartUI();
}

function updateQuantity(productId, delta) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (!cartItem) return;

  cartItem.count += delta;

  if (cartItem.count <= 0) {
    cart = cart.filter(item => item.product.id !== productId);
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Оновлення лічильників
  const headerCount = document.getElementById('header-cart-count');
  const navCount = document.getElementById('nav-cart-count');
  if (headerCount) headerCount.textContent = totalCount;
  if (navCount) navCount.textContent = totalCount;

  // Оновлення вмісту кошика
  const cartEmpty = document.getElementById('cart-empty');
  const cartList = document.getElementById('cart-items-list');
  const cartFooter = document.getElementById('cart-footer');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'block';
    if (cartList) cartList.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'none';
  } else {
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartList) {
      cartList.style.display = 'block';
      cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-brand">${item.product.brand}</div>
            <div class="cart-item-title">${item.product.name}</div>
            <div class="cart-item-price">${item.product.price} ₴</div>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" onclick="updateQuantity(${item.product.id}, -1)">-</button>
            <span class="cart-qty-val">${item.count}</span>
            <button class="cart-qty-btn" onclick="updateQuantity(${item.product.id}, 1)">+</button>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.product.id})">✕</button>
          </div>
        </div>
      `).join('');
    }
    if (cartFooter) cartFooter.style.display = 'block';
  }

  if (cartTotalPrice) cartTotalPrice.textContent = `${totalPrice} ₴`;
  if (checkoutTotalPrice) checkoutTotalPrice.textContent = `${totalPrice} ₴`;
}

// --- ОБРОБКА ФОРМИ ЗАМОВЛЕННЯ ---
function handleCheckoutSubmit(event) {
  event.preventDefault();

  const orderData = {
    name: document.getElementById('customer-name').value,
    phone: document.getElementById('customer-phone').value,
    address: document.getElementById('customer-address').value,
    items: cart.map(i => ({ id: i.product.id, name: i.product.name, count: i.count, price: i.product.price })),
    total: cart.reduce((sum, item) => sum + (item.product.price * item.count), 0)
  };

  if (tg) {
    tg.sendData(JSON.stringify(orderData));
  } else {
    alert(`Дякуємо за замовлення, ${orderData.name}! Сума: ${orderData.total} ₴`);
  }

  cart = [];
  updateCartUI();
  closeModal('checkout-modal');
  document.getElementById('checkout-form').reset();
}

// --- КАТАЛОГ ТА ФІЛЬТРАЦІЯ ---
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

function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  renderProducts();
}

// --- НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ ---
function switchTab(tab, btn) {
  document.querySelectorAll('.bottom-nav .nav-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (tab === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tab === 'fav') {
    alert(`В обраному товарів: ${favorites.length}`);
  } else if (tab === 'profile') {
    alert('Кабінет користувача');
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

// --- ІНІЦІАЛІЗАЦІЯ ---
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Прив'язка кнопок відкриття кошика
  const cartBtnHeader = document.querySelector('.cart-btn');
  const cartBtnNav = document.querySelector('.cart-nav-btn');

  if (cartBtnHeader) cartBtnHeader.addEventListener('click', () => openModal('cart-modal'));
  if (cartBtnNav) cartBtnNav.addEventListener('click', () => openModal('cart-modal'));

  renderBrands();
  renderProducts();
  updateCartUI();
});
