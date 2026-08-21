/* =========================
   TELEGRAM WEB APP
========================= */

const tg =
    window.Telegram &&
    window.Telegram.WebApp
        ? window.Telegram.WebApp
        : null;

if (tg) {
    tg.ready();
    tg.expand();
}


/* =========================
   CONFIG
========================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz5JMG8qKeK5uRZMG40w2TfTVQ2ugAS0I4SoQcCyJCBavtgQ3QLishybC0h40LqUWsE/exec";

// Укажите данные вашего бота и чата для уведомлений
const TELEGRAM_BOT_TOKEN = "ВАШ_BOT_TOKEN"; 
const TELEGRAM_CHAT_ID = "ВАШ_CHAT_ID";   


/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: 1,
        category: "liquid",
        brand: "CHASER",
        name: "Classic Berry",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 350,
        oldPrice: 400,
        badge: "sale",
        badgeText: "-13%",
        popular: true,
        new: true
    },

    {
        id: 2,
        category: "liquid",
        brand: "MOOD DUCK",
        name: "Sweet Apple",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 360,
        oldPrice: null,
        badge: "new",
        badgeText: "NEW",
        popular: true,
        new: true
    },

    {
        id: 3,
        category: "liquid",
        brand: "PUNCH",
        name: "Cherry Punch",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 370,
        oldPrice: null,
        badge: "new",
        badgeText: "NEW",
        popular: true,
        new: true
    },

    {
        id: 4,
        category: "liquid",
        brand: "OCTOBAR",
        name: "Tropical Mix",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 390,
        oldPrice: 430,
        badge: "sale",
        badgeText: "-9%",
        popular: true,
        new: true
    },

    {
        id: 5,
        category: "liquid",
        brand: "FLAVORLAB",
        name: "Blueberry Ice",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 340,
        oldPrice: null,
        badge: null,
        popular: true,
        new: false
    },

    {
        id: 6,
        category: "liquid",
        brand: "LUCKY",
        name: "Watermelon",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 330,
        oldPrice: null,
        badge: null,
        popular: true,
        new: false
    },

    {
        id: 7,
        category: "liquid",
        brand: "REFROST",
        name: "Frozen Berries",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 350,
        oldPrice: 390,
        badge: "sale",
        badgeText: "-10%",
        popular: false,
        new: false
    },

    {
        id: 8,
        category: "liquid",
        brand: "HYPE",
        name: "Mango Passion",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 360,
        oldPrice: null,
        badge: null,
        popular: true,
        new: false
    },

    {
        id: 9,
        category: "liquid",
        brand: "3GER",
        name: "Grape Soda",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 380,
        oldPrice: null,
        badge: null,
        popular: false,
        new: false
    },

    {
        id: 10,
        category: "liquid",
        brand: "ALCHEMIST",
        name: "Strawberry Cream",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 400,
        oldPrice: 450,
        badge: "sale",
        badgeText: "-11%",
        popular: true,
        new: false
    },

    {
        id: 11,
        category: "liquid",
        brand: "INBOTTLE",
        name: "Lemon Lime",
        volume: "30 ml",
        nicotine: "20 mg",
        price: 350,
        oldPrice: null,
        badge: null,
        popular: false,
        new: false
    },

    {
        id: 101,
        category: "pod",
        brand: "CLOUDROYAL",
        name: "POD System One",
        volume: "Device",
        nicotine: null,
        price: 899,
        oldPrice: 999,
        badge: "sale",
        badgeText: "-10%",
        popular: true,
        new: true
    },

    {
        id: 102,
        category: "pod",
        brand: "CLOUDROYAL",
        name: "POD System Pro",
        volume: "Device",
        nicotine: null,
        price: 1199,
        oldPrice: null,
        badge: "new",
        badgeText: "NEW",
        popular: true,
        new: true
    },

    {
        id: 201,
        category: "cartridge",
        brand: "CLOUDROYAL",
        name: "Картридж 2 ml",
        volume: "2 ml",
        nicotine: null,
        price: 180,
        oldPrice: null,
        badge: null,
        popular: true,
        new: false
    },

    {
        id: 202,
        category: "cartridge",
        brand: "CLOUDROYAL",
        name: "Картридж Pro",
        volume: "2 ml",
        nicotine: null,
        price: 220,
        oldPrice: null,
        badge: "new",
        badgeText: "NEW",
        popular: false,
        new: true
    }

];


/* =========================
   STATE
========================= */

let currentCategory = "liquid";
let currentFilter = "all";
let currentBrand = "all";
let searchValue = "";
let cart = [];
let favorites = [];


/* =========================
   DOM
========================= */

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const clearSearchButton = document.getElementById("clearSearch");
const productsCount = document.getElementById("productsCount");
const emptyState = document.getElementById("emptyState");
const catalogTitle = document.getElementById("catalogTitle");
const cartCount = document.getElementById("cartCount");
const navCartCount = document.getElementById("navCartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");


/* =========================
   STORAGE
========================= */

function loadStorage() {
    try {
        const savedCart = localStorage.getItem("cloudroyal_cart");
        const savedFavorites = localStorage.getItem("cloudroyal_favorites");

        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

        if (savedFavorites) {
            favorites = JSON.parse(savedFavorites);
        }
    } catch (error) {
        cart = [];
        favorites = [];
    }
}

function saveStorage() {
    localStorage.setItem("cloudroyal_cart", JSON.stringify(cart));
    localStorage.setItem("cloudroyal_favorites", JSON.stringify(favorites));
}


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {
    return Number(price).toLocaleString("uk-UA") + " ₴";
}


/* =========================
   CATEGORY & FILTERS
========================= */

function openCategory(category) {
    currentCategory = category;
    currentFilter = "all";
    currentBrand = "all";
    searchValue = "";

    if (searchInput) {
        searchInput.value = "";
    }

    updateCategoryButtons();
    updateFilterButtons();
    updateBrandButtons();
    updateCatalogTitle();
    renderProducts();
    scrollToCatalog();
}

function updateCategoryButtons() {
    const buttons = document.querySelectorAll(".category-card");
    buttons.forEach(button => button.classList.remove("active"));

    const categoryMap = { liquid: 0, pod: 1, cartridge: 2 };
    const index = categoryMap[currentCategory];

    if (index !== undefined && buttons[index]) {
        buttons[index].classList.add("active");
    }
}

function updateCatalogTitle() {
    if (!catalogTitle) return;

    const titles = {
        liquid: "Обери свій смак",
        pod: "POD-системи",
        cartridge: "Картриджі та аксесуари"
    };

    catalogTitle.textContent = titles[currentCategory] || "Каталог";

    const labels = document.querySelector(".catalog-section .section-label");
    if (labels) {
        const labelsMap = {
            liquid: "РІДИНИ",
            pod: "POD-СИСТЕМИ",
            cartridge: "КАРТРИДЖІ"
        };
        labels.textContent = labelsMap[currentCategory];
    }
}

function setFilter(filter) {
    currentFilter = filter;
    updateFilterButtons();
    renderProducts();
}

function updateFilterButtons() {
    const buttons = document.querySelectorAll(".filter-chip");
    buttons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === currentFilter);
    });
}

function setBrand(brand) {
    currentBrand = brand;
    updateBrandButtons();
    renderProducts();
}

function updateBrandButtons() {
    const buttons = document.querySelectorAll(".brand-chip");
    buttons.forEach(button => {
        button.classList.toggle("active", button.dataset.brand === currentBrand);
    });
}

function toggleBrands() {
    const brands = document.getElementById("brands");
    const button = document.getElementById("showBrandsButton");
    if (!brands || !button) return;

    const expanded = brands.classList.toggle("expanded");
    button.textContent = expanded ? "Сховати" : "Показати всі";
}


/* =========================
   SEARCH
========================= */

function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        searchValue = this.value.trim().toLowerCase();

        if (clearSearchButton) {
            clearSearchButton.style.display = searchValue ? "flex" : "none";
        }

        renderProducts();
    });
}

function clearSearch() {
    searchValue = "";

    if (searchInput) {
        searchInput.value = "";
    }

    if (clearSearchButton) {
        clearSearchButton.style.display = "none";
    }

    renderProducts();
}


/* =========================
   PRODUCTS
========================= */

function getFilteredProducts() {
    return products.filter(product => {
        if (product.category !== currentCategory) return false;
        if (currentBrand !== "all" && product.brand !== currentBrand) return false;
        if (currentFilter === "new" && !product.new) return false;
        if (currentFilter === "popular" && !product.popular) return false;
        if (currentFilter === "sale" && !product.oldPrice) return false;

        if (searchValue) {
            const text = (product.brand + " " + product.name + " " + product.volume).toLowerCase();
            if (!text.includes(searchValue)) return false;
        }

        return true;
    });
}

function renderProducts() {
    if (!productsContainer) return;

    const filtered = getFilteredProducts();
    productsContainer.innerHTML = "";

    if (productsCount) {
        productsCount.textContent = filtered.length + " " + pluralProducts(filtered.length);
    }

    if (filtered.length === 0) {
        if (emptyState) emptyState.classList.add("visible");
        return;
    }

    if (emptyState) emptyState.classList.remove("visible");

    filtered.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

function pluralProducts(number) {
    if (number % 10 === 1 && number % 100 !== 11) return "товар";
    if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return "товари";
    return "товарів";
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    let badgeHTML = "";
    if (product.badge) {
        const badgeClass = product.badge === "sale" ? "sale" : product.badge === "popular" ? "popular" : "";
        badgeHTML = `<span class="product-badge ${badgeClass}">${product.badgeText || "NEW"}</span>`;
    }

    const favorite = favorites.includes(product.id);
    const nicotineHTML = product.nicotine ? `<span>${product.nicotine}</span>` : "";
    const oldPriceHTML = product.oldPrice
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>`
        : `<span class="old-price">&nbsp;</span>`;

    card.innerHTML = `
        <div class="product-visual">
            ${badgeHTML}
            <button class="favorite-btn ${favorite ? "active" : ""}" onclick="toggleFavorite(${product.id})" aria-label="Обране">
                ${favorite ? "♥" : "♡"}
            </button>
            <div class="product-placeholder">${product.brand}</div>
        </div>

        <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">
                <span>${product.volume}</span>
                ${nicotineHTML}
            </div>
            <div class="product-bottom">
                <div class="price-box">
                    ${oldPriceHTML}
                    <strong class="price">${formatPrice(product.price)}</strong>
                </div>
                <button class="add-button" onclick="addToCart(${product.id})" aria-label="Додати до кошика">+</button>
            </div>
        </div>
    `;

    return card;
}


/* =========================
   CART LOGIC
========================= */

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveStorage();
    updateCartCounter();

    if (tg) {
        try { tg.HapticFeedback.impactOccurred("light"); } catch (e) {}
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveStorage();
    updateCartCounter();
    renderCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(cartItem => cartItem.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveStorage();
    updateCartCounter();
    renderCart();
}

function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCounter() {
    const count = getCartCount();

    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? "flex" : "none";
    }

    if (navCartCount) {
        navCartCount.textContent = count;
        navCartCount.style.display = count > 0 ? "flex" : "none";
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}


/* =========================
   MODALS
========================= */

function showCart() {
    renderCart();
    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.classList.add("open");
}

function closeCart() {
    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.classList.remove("open");
}

function closeCartByOverlay(event) {
    if (event.target.id === "cartOverlay") closeCart();
}

function renderCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = "block";
        if (cartFooter) cartFooter.style.display = "none";
        return;
    }

    if (cartEmpty) cartEmpty.style.display = "none";
    if (cartFooter) cartFooter.style.display = "block";

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const element = document.createElement("div");
        element.className = "cart-item";

        element.innerHTML = `
            <div class="cart-item-image">${product.brand}</div>
            <div class="cart-item-info">
                <div class="cart-item-brand">${product.brand}</div>
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">${formatPrice(product.price)}</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(element);
    });

    if (cartTotal) cartTotal.textContent = formatPrice(getCartTotal());
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Кошик порожній.");
        return;
    }

    closeCart();
    const overlay = document.getElementById("checkoutOverlay");
    if (overlay) overlay.classList.add("open");
}

function closeCheckout() {
    const overlay = document.getElementById("checkoutOverlay");
    if (overlay) overlay.classList.remove("open");
}

function closeCheckoutByOverlay(event) {
    if (event.target.id === "checkoutOverlay") closeCheckout();
}


/* =========================
   SUBMIT ORDER (OPTIMIZED)
========================= */

function submitOrder() {
    const nameInput = document.getElementById("customerName");
    const phoneInput = document.getElementById("customerPhone");
    const commentInput = document.getElementById("customerComment");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const comment = commentInput ? commentInput.value.trim() : "";

    if (!name) {
        alert("Введи своє ім'я.");
        if (nameInput) nameInput.focus();
        return;
    }

    if (!phone) {
        alert("Введи номер телефону.");
        if (phoneInput) phoneInput.focus();
        return;
    }

    if (cart.length === 0) {
        alert("Кошик порожній.");
        return;
    }

    const orderItems = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return null;
        return {
            brand: product.brand,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity
        };
    }).filter(Boolean);

    const totalQuantity = orderItems.reduce((total, item) => total + item.quantity, 0);
    const totalPriceFormatted = formatPrice(getCartTotal());

    // 1. Сообщение для Telegram
    const itemsTelegramText = orderItems
        .map(i => `• <b>${i.brand} ${i.name}</b> × ${i.quantity} шт (${formatPrice(i.total)})`)
        .join("\n");

    const telegramMessage = 
        `🛍 <b>НОВЕ ЗАМОВЛЕННЯ!</b>\n\n` +
        `👤 <b>Клієнт:</b> ${name}\n` +
        `📞 <b>Телефон:</b> ${phone}\n` +
        `💬 <b>Коментар:</b> ${comment || "Немає"}\n\n` +
        `📦 <b>Товари (${totalQuantity} шт):</b>\n${itemsTelegramText}\n\n` +
        `💰 <b>Загальна сума:</b> ${totalPriceFormatted}`;

    // 2. Данные для Google Sheets
    const itemsGoogleText = orderItems
        .map(i => `${i.brand} — ${i.name} × ${i.quantity} — ${formatPrice(i.total)}`)
        .join("\n");

    const orderData = {
        user: name,
        phone: phone,
        items: itemsGoogleText,
        totalQuantity: totalQuantity,
        comment: comment || "Немає",
        totalPrice: getCartTotal()
    };

    // Мгновенная реакция UI (пользователь не ждет сеть)
    if (tg) {
        try { tg.HapticFeedback.notificationOccurred("success"); } catch (e) {}
    }

    alert("Замовлення успішно відправлено! ❤️");

    cart = [];
    saveStorage();
    updateCartCounter();
    renderCart();
    closeCheckout();

    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (commentInput) commentInput.value = "";

    // Фоновая отправка в Telegram
    if (TELEGRAM_BOT_TOKEN !== "ВАШ_BOT_TOKEN" && TELEGRAM_CHAT_ID !== "ВАШ_CHAT_ID") {
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: "HTML"
            })
        }).catch(err => console.error("TG Send Error:", err));
    }

    // Фоновая отправка в Google Таблицу
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(orderData)
    }).catch(err => console.error("Google Sheets Error:", err));
}


/* =========================
   FAVORITES
========================= */

function toggleFavorite(productId) {
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }

    saveStorage();
    renderProducts();
}

function showFavorites() {
    renderFavorites();
    const overlay = document.getElementById("favoritesOverlay");
    if (overlay) overlay.classList.add("open");
}

function closeFavorites() {
    const overlay = document.getElementById("favoritesOverlay");
    if (overlay) overlay.classList.remove("open");
}

function closeFavoritesByOverlay(event) {
    if (event.target.id === "favoritesOverlay") closeFavorites();
}

function renderFavorites() {
    const container = document.getElementById("favoriteProducts");
    if (!container) return;

    container.innerHTML = "";
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    if (favoriteProducts.length === 0) {
        container.innerHTML = `
            <div class="cart-empty" style="grid-column:1/-1">
                <div>♡</div>
                <h3>Обране порожнє</h3>
                <p>Натискай ♡ на товарах, щоб додати їх сюди.</p>
            </div>
        `;
        return;
    }

    favoriteProducts.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}


/* =========================
   PROFILE & NAVIGATION
========================= */

function showProfile() {
    const overlay = document.getElementById("profileOverlay");
    const profileName = document.getElementById("profileName");

    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        if (profileName) profileName.textContent = user.first_name || "Користувач";
    }

    if (overlay) overlay.classList.add("open");
}

function closeProfile() {
    const overlay = document.getElementById("profileOverlay");
    if (overlay) overlay.classList.remove("open");
}

function closeProfileByOverlay(event) {
    if (event.target.id === "profileOverlay") closeProfile();
}

function goHome() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToCatalog() {
    const section = document.getElementById("catalog");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    loadStorage();
    setupSearch();
    updateCategoryButtons();
    updateFilterButtons();
    updateBrandButtons();
    updateCatalogTitle();
    updateCartCounter();
    renderProducts();
});
