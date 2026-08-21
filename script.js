// ============================================================
// CLOUDROYAL CONFIG
// ============================================================
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyqcu6aG8YtJVglbA-DMHbioawAGeMMCIKuKVQb2k0bznFrbgSuuzeBWulpScxQslNk/exec";

// Об'єкт товару з розширеним масивом смаків та унікальними зображеннями
const product = {
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
    { id: "pomegranate", name: "Гранат", emoji: "🫐", inStock: true, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80" },
    { id: "mint", name: "М'ята", emoji: "🌿", inStock: true, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80" },
    { id: "berries", name: "Ягоди", emoji: "🫐🍓", inStock: true, image: "https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=400&q=80" },
    { id: "kiwi", name: "Ківі", emoji: "🥝", inStock: false, image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?auto=format&fit=crop&w=400&q=80" },
    { id: "lychee", name: "Личі", emoji: "🍇", inStock: false, image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80" }
  ]
};

// Змінні стану
let selectedNicotine = product.nicotineOptions[0];
let selectedFlavor = null;

// ============================================================
// МОДУЛЬ ІНІЦІАЛІЗАЦІЇ ТА ДИНАМІКИ
// ============================================================

function initProductPage() {
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
        
        // Виклик плавного перемикання фото
        updateProductImage(flavor.image);
      };
    }
    flavorContainer.appendChild(btn);
  });

  // Автовибір першого доступного смаку при завантаженні
  const firstAvailable = product.flavors.find(f => f.inStock);
  if (firstAvailable) {
    selectedFlavor = firstAvailable;
    const firstBtn = flavorContainer.querySelector('.flavor-chip:not(.out-of-stock)');
    if (firstBtn) firstBtn.classList.add('active');
    
    // Встановлюємо перше фото
    const imgElement = document.getElementById('product-main-image');
    imgElement.src = firstAvailable.image;
  }
}

// Функція плавного оновлення зображення з ефектом fade-in/fade-out
function updateProductImage(newSrc) {
  const imgElement = document.getElementById('product-main-image');
  
  if (imgElement.src === newSrc) return;

  imgElement.classList.add('fade-out');

  setTimeout(() => {
    imgElement.src = newSrc;
    imgElement.classList.remove('fade-out');
  }, 250);
}

// ============================================================
// ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
// ============================================================

async function addProductToCart() {
  const errorHint = document.getElementById('flavor-error');
  
  if (!selectedFlavor) {
    errorHint.style.display = 'block';
    return;
  }
  
  errorHint.style.display = 'none';

  const fullTitle = `${product.name} — ${selectedFlavor.name} ${selectedFlavor.emoji} (${selectedNicotine})`;

  const orderData = {
    name: "Клієнт (Тест)",
    phone: "+380000000000",
    comment: "Замовлення з сайту",
    items: fullTitle,
    itemImage: selectedFlavor.image, // Передача фото конкретного смаку
    totalPrice: product.price,
    totalQuantity: 1
  };

  // Відправка в Google Таблицю
  await sendToGoogleSheets(orderData);
  alert(`Дякуємо! Товар додано:\n${fullTitle}`);
}

async function sendToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL || GOOGLE_SHEETS_WEBHOOK_URL === "ТВІЙ_GOOGLE_APPS_SCRIPT_URL") {
    console.warn("URL для Google Sheets не вказано.");
    return;
  }

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
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

// Запуск після завантаження сторінки
document.addEventListener('DOMContentLoaded', initProductPage);
