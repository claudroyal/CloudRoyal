// ============================================================
// CLOUDROYAL CONFIG
// ============================================================
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyqcu6aG8YtJVglbA-DMHbioawAGeMMCIKuKVQb2k0bznFrbgSuuzeBWulpScxQslNk/exec";

// Об'єкт товару
const product = {
  id: "chaser-30ml",
  name: "CHASER FOR PODS 30ML",
  brand: "CHASER",
  price: 280,
  oldPrice: 320,
  nicotineOptions: ["50 мг", "65 мг"],
  flavors: [
    { id: "cherry", name: "Вишня", emoji: "🍒", inStock: true },
    { id: "watermelon-ice", name: "Кавун ментол", emoji: "❄️🍉", inStock: true },
    { id: "mint", name: "М'ята", emoji: "🌿", inStock: false }
  ]
};

// Змінні стану
let cart = [];
let selectedNicotine = product.nicotineOptions[0];
let selectedFlavor = null;

// ============================================================
// МОДУЛЬ КАРТКИ ТОВАРУ
// ============================================================

function openProductModal() {
  initProductModal();
  document.getElementById('product-modal').style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('product-modal').style.display = 'none';
}

function initProductModal() {
  document.getElementById('modal-product-brand').innerText = product.brand;
  document.getElementById('modal-product-name').innerText = product.name;
  document.getElementById('modal-product-price').innerText = product.price + " грн";
  document.getElementById('modal-product-oldprice').innerText = product.oldPrice + " грн";

  // Рендер міцності
  const nicContainer = document.getElementById('nicotine-selector');
  nicContainer.innerHTML = '';
  product.nicotineOptions.forEach((nic, index) => {
    const btn = document.createElement('button');
    btn.className = `nicotine-chip ${index === 0 ? 'active' : ''}`;
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
  
  product.flavors.forEach((flavor) => {
    const btn = document.createElement('button');
    btn.className = `flavor-chip ${!flavor.inStock ? 'out-of-stock' : ''}`;
    btn.innerHTML = `${flavor.name} ${flavor.emoji}`;
    
    if (flavor.inStock) {
      btn.onclick = () => {
        document.querySelectorAll('.flavor-chip').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        selectedFlavor = flavor;
        document.getElementById('flavor-error').style.display = 'none';
      };
    }
    flavorContainer.appendChild(btn);
  });

  // Автовибір першого доступного смаку
  const firstAvailable = product.flavors.find(f => f.inStock);
  if (firstAvailable) {
    selectedFlavor = firstAvailable;
    const firstBtn = flavorContainer.querySelector('.flavor-chip:not(.out-of-stock)');
    if (firstBtn) firstBtn.classList.add('active');
  }
}

// Додавання у кошик та відправка
async function addProductToCart() {
  const errorHint = document.getElementById('flavor-error');
  
  if (!selectedFlavor) {
    errorHint.style.display = 'block';
    return;
  }
  
  errorHint.style.display = 'none';

  // Формуємо повну назву товару із варіацією
  const fullTitle = `${product.name} (${selectedFlavor.name} ${selectedFlavor.emoji}, ${selectedNicotine})`;

  const orderData = {
    name: "Клієнт", // Сюди можна підставити значення з форми
    phone: "+380000000000",
    comment: "Швидке замовлення",
    items: fullTitle,
    totalPrice: product.price,
    totalQuantity: 1
  };

  closeProductModal();

  // Відправляємо в Google Таблицю
  await sendToGoogleSheets(orderData);
  alert(`Товар успішно додано та відправлено!\n${fullTitle}`);
}

// ============================================================
// ВІДПРАВКА В GOOGLE TABLES
// ============================================================

async function sendToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL || GOOGLE_SHEETS_WEBHOOK_URL === "ТВІЙ_GOOGLE_APPS_SCRIPT_URL") {
    console.warn("URL для Google Sheets не вказано.");
    return;
  }

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Критично для Google Apps Script
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    console.log("Дані успішно відправлені в Google Sheets");
  } catch (err) {
    console.error("Помилка відправки в Google Таблицю:", err);
  }
}
