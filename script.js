const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyqcu6aG8YtJVglbA-DMHbioawAGeMMCIKuKVQb2k0bznFrbgSuuzeBWulpScxQslNk/exec";

// База товарів каталогу
const productsData = [
  // ==========================================
  // 1. ПОД-СИСТЕМИ (PODS)
  // ==========================================
  {
    id: "vaporesso-xros-series",
    name: "Vaporesso XROS Pod Kit",
    brand: "VAPORESSO",
    price: 720,
    oldPrice: 900,
    nicotineOptions: ["Стандарт"],
    flavors: [
      { id: "x3-mini-black", name: "XROS 3 MINI Black", emoji: "⬛", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" },
      { id: "x4-mini-grey", name: "XROS 4 MINI Space Grey", emoji: "🔘", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "oxva-xlim-go",
    name: "OXVA XLIM GO Pod Kit",
    brand: "OXVA",
    price: 650,
    oldPrice: 700,
    nicotineOptions: ["1000 mAh"],
    flavors: [
      { id: "xlim-blue", name: "Blue", emoji: "🟦", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "voopoo-vmate-e2",
    name: "Voopoo Vmate E2 Pod Kit",
    brand: "VOOPOO",
    price: 950,
    oldPrice: null,
    nicotineOptions: ["1500 mAh"],
    flavors: [
      { id: "vmate-green", name: "Green", emoji: "🟩", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },

  // ==========================================
  // 2. КАРАТРИДЖІ (CARTRIDGES)
  // ==========================================
  {
    id: "vaporesso-xros-cartridge",
    name: "Картридж Vaporesso XROS",
    brand: "VAPORESSO",
    price: 150,
    oldPrice: null,
    nicotineOptions: ["3 мл"],
    flavors: [
      { id: "xros-06", name: "0.6 Ohm", emoji: "⚡", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "oxva-xlim-cartridge",
    name: "Картридж OXVA XLIM V2",
    brand: "OXVA",
    price: 150,
    oldPrice: 170,
    nicotineOptions: ["2 мл"],
    flavors: [
      { id: "xlim-08", name: "0.8 Ohm", emoji: "⚡", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "voopoo-vmate-cartridge",
    name: "Картридж Voopoo Vmate Top Fill",
    brand: "VOOPOO",
    price: 160,
    oldPrice: null,
    nicotineOptions: ["3 мл"],
    flavors: [
      { id: "vmate-07", name: "0.7 Ohm", emoji: "⚡", inStock: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" }
    ]
  },

  // ==========================================
  // 3. РІДИНИ (LIQUIDS)
  // ==========================================
  {
    id: "chaser-30ml",
    name: "Chaser For Pods 30ml",
    brand: "CHASER",
    price: 280,
    oldPrice: 320,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "triple-berry", name: "Triple Berry", emoji: "🫐🍓", inStock: true, image: "https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "flavorlab-fl350",
    name: "Flavorlab FL 350 30ml",
    brand: "FLAVORLAB",
    price: 320,
    oldPrice: 350,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "fl-watermelon-ice", name: "Watermelon Ice", emoji: "❄️🍉", inStock: true, image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "octobar-30ml",
    name: "Octobar 30ml",
    brand: "OCTOBAR",
    price: 330,
    oldPrice: null,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "passion-fruit-ice", name: "Passion Fruit Ice", emoji: "❄️🥭", inStock: true, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "mood-duck-30ml",
    name: "Mood Duck 30ml",
    brand: "MOOD DUCK",
    price: 310,
    oldPrice: null,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "sour-apple", name: "Sour Apple", emoji: "🍏", inStock: true, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "punch-energy-30ml",
    name: "Punch Energy 30ml",
    brand: "PUNCH",
    price: 300,
    oldPrice: null,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "wild-peach", name: "Wild Peach", emoji: "🍑", inStock: true, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "lucky-30ml",
    name: "Lucky 30ml",
    brand: "LUCKY",
    price: 290,
    oldPrice: 340,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "blueberry-sour-raspberry", name: "Blueberry Sour Raspberry", emoji: "🫐🍇", inStock: true, image: "https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=400&q=80" }
    ]
  }
];

let cart = [];
let currentProduct = null;
let selectedNicotine = "";
let selectedFlavor = null;

// Ініціалізація додатка
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  initTelegramUser();
});

// Підтягування даних з Telegram
function initTelegramUser() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const user = tg.initDataUnsafe.user;
      document.getElementById('user-name').value = `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
  }
}

// Рендер каталогу товарів
function renderCatalog() {
  const container = document.getElementById('products-catalog');
  container.innerHTML = '';

  productsData.forEach(p => {
    const defaultImg = p.flavors[0]?.image || '';
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <img src="${defaultImg}" class="catalog-img" alt="${p.name}">
      <div>
        <span class="product-brand">${p.brand}</span>
        <h3 class="catalog-title">${p.name}</h3>
        <div class="catalog-price">${p.price} грн</div>
      </div>
      <button class="btn-open-modal" onclick="openProductModal('${p.id}')">Вибрати смак</button>
    `;
    container.appendChild(card);
  });
}

// Відкриття картки товару
function openProductModal(productId) {
  currentProduct = productsData.find(p => p.id === productId);
  if (!currentProduct) return;

  selectedNicotine = currentProduct.nicotineOptions[0];
  selectedFlavor = null;

  document.getElementById('modal-product-brand').innerText = currentProduct.brand;
  document.getElementById('modal-product-name').innerText = currentProduct.name;
  document.getElementById('modal-product-price').innerText = currentProduct.price + " грн";
  document.getElementById('modal-product-oldprice').innerText = currentProduct.oldPrice + " грн";

  // Рендер міцності
  const nicContainer = document.getElementById('nicotine-selector');
  nicContainer.innerHTML = '';
  currentProduct.nicotineOptions.forEach((nic, i) => {
    const btn = document.createElement('button');
    btn.className = `nicotine-chip ${i === 0 ? 'active' : ''}`;
    btn.innerText = nic;
    btn.onclick = () => {
      document.querySelectorAll('.nicotine-chip').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      selectedNicotine = nic;
    };
    nicContainer.appendChild(btn);
  });

  // Рендер смаків
  const flavorContainer = document.getElementById('flavors-selector');
  flavorContainer.innerHTML = '';
  currentProduct.flavors.forEach(flavor => {
    const btn = document.createElement('button');
    btn.className = `flavor-chip ${!flavor.inStock ? 'out-of-stock' : ''}`;
    btn.innerHTML = `${flavor.name} ${flavor.emoji}`;
    
    if (flavor.inStock) {
      btn.onclick = () => {
        document.querySelectorAll('.flavor-chip').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        selectedFlavor = flavor;
        document.getElementById('flavor-error').style.display = 'none';
        updateModalImage(flavor.image);
      };
    }
    flavorContainer.appendChild(btn);
  });

  // Автовибір першого смаку
  const firstAvailable = currentProduct.flavors.find(f => f.inStock);
  if (firstAvailable) {
    selectedFlavor = firstAvailable;
    const firstBtn = flavorContainer.querySelector('.flavor-chip:not(.out-of-stock)');
    if (firstBtn) firstBtn.classList.add('active');
    document.getElementById('modal-product-img').src = firstAvailable.image;
  }

  document.getElementById('product-modal').style.display = 'flex';
}

function updateModalImage(src) {
  const img = document.getElementById('modal-product-img');
  img.classList.add('fade-out');
  setTimeout(() => {
    img.src = src;
    img.classList.remove('fade-out');
  }, 200);
}

function closeProductModal() {
  document.getElementById('product-modal').style.display = 'none';
}

// Додавання у кошик з модалки
function addToCartFromModal() {
  if (!selectedFlavor) {
    document.getElementById('flavor-error').style.display = 'block';
    return;
  }

  const cartItem = {
    cartId: Date.now(),
    productId: currentProduct.id,
    name: currentProduct.name,
    flavor: `${selectedFlavor.name} ${selectedFlavor.emoji}`,
    nicotine: selectedNicotine,
    price: currentProduct.price,
    image: selectedFlavor.image
  };

  cart.push(cartItem);
  updateCartUI();
  closeProductModal();
}

// Оновлення виджету кошика
function updateCartUI() {
  const cartBar = document.getElementById('cart-bar');
  const cartCount = document.getElementById('cart-count');
  const cartTotalBar = document.getElementById('cart-total-bar');

  if (cart.length === 0) {
    cartBar.style.display = 'none';
    return;
  }

  cartBar.style.display = 'flex';
  cartCount.innerText = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalBar.innerText = `${total} грн`;
}

// Відкриття/Закриття кошика
function openCartModal() {
  renderCartItems();
  document.getElementById('cart-modal').style.display = 'flex';
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  container.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" class="cart-item-img" alt="">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-sub">${item.flavor} | ${item.nicotine} — ${item.price} грн</div>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.cartId})">&times;</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('cart-modal-total').innerText = `${total} грн`;
}

function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  renderCartItems();
  updateCartUI();
  if (cart.length === 0) closeCartModal();
}

// Відправка замовлення в Google Таблицю
async function submitOrder(e) {
  e.preventDefault();

  if (cart.length === 0) return;

  const itemsString = cart.map(i => `${i.name} (${i.flavor}, ${i.nicotine})`).join('; ');
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderData = {
    name: document.getElementById('user-name').value,
    phone: document.getElementById('user-phone').value,
    comment: document.getElementById('user-comment').value,
    items: itemsString,
    totalPrice: total,
    totalQuantity: cart.length
  };

  await sendToGoogleSheets(orderData);
  
  alert("Дякуємо! Ваше замовлення успішно прийнято!");
  cart = [];
  updateCartUI();
  closeCartModal();
}

async function sendToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
  } catch (err) {
    console.error("Помилка відправки:", err);
  }
}
