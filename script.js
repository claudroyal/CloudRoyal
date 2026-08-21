const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyqcu6aG8YtJVglbA-DMHbioawAGeMMCIKuKVQb2k0bznFrbgSuuzeBWulpScxQslNk/exec";

// База товарів каталогу
const productsData = [
  {
    id: "chaser-30ml",
    name: "CHASER FOR PODS 30ML",
    brand: "CHASER",
    price: 280,
    oldPrice: 320,
    nicotineOptions: ["50 мг", "65 мг"],
    flavors: [
      { id: "cherry", name: "Вишня", emoji: "🍒", inStock: true, image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80" },
      { id: "strawberry", name: "Полуниця", emoji: "🍓", inStock: true, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80" },
      { id: "watermelon-ice", name: "Кавун ментол", emoji: "❄️🍉", inStock: true, image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=400&q=80" },
      { id: "melon", name: "Диня", emoji: "🍈", inStock: true, image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=400&q=80" },
      { id: "mint", name: "М'ята", emoji: "🌿", inStock: true, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80" },
      { id: "kiwi", name: "Ківі", emoji: "🥝", inStock: false, image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "elfbar-30ml",
    name: "ELF BAR LIQUID 30ML",
    brand: "ELF BAR",
    price: 290,
    oldPrice: 340,
    nicotineOptions: ["50 мг"],
    flavors: [
      { id: "apple", name: "Яблуко", emoji: "🍏", inStock: true, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80" },
      { id: "mango", name: "Манго", emoji: "🥭", inStock: true, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80" }
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
