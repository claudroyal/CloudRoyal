/* =====================================================
   TELEGRAM
===================================================== */

let tg = null;

try {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;

        tg.ready();
        tg.expand();
    }
} catch (error) {
    console.log("Telegram WebApp недоступен");
}



/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Classic Berry",
        brand: "CHASER",
        category: "liquids",
        flavor: "Ягодный микс",
        volume: "30 мл • 20 мг",
        price: 350,
        oldPrice: null,
        tags: ["new", "popular"]
    },

    {
        id: 2,
        name: "Sweet Apple",
        brand: "MOOD DUCK",
        category: "liquids",
        flavor: "Сочное яблоко",
        volume: "30 мл • 20 мг",
        price: 360,
        oldPrice: null,
        tags: ["new", "popular"]
    },

    {
        id: 3,
        name: "Cherry Punch",
        brand: "PUNCH",
        category: "liquids",
        flavor: "Вишня и холод",
        volume: "30 мл • 20 мг",
        price: 370,
        oldPrice: null,
        tags: ["new"]
    },

    {
        id: 4,
        name: "Tropical Mix",
        brand: "OCTOBAR",
        category: "liquids",
        flavor: "Тропические фрукты",
        volume: "30 мл • 20 мг",
        price: 390,
        oldPrice: null,
        tags: ["new", "popular"]
    },

    {
        id: 5,
        name: "Blue Dream",
        brand: "FLAVORLAB",
        category: "liquids",
        flavor: "Черника • ягоды",
        volume: "30 мл • 20 мг",
        price: 380,
        oldPrice: 430,
        tags: ["sale", "popular"]
    },

    {
        id: 6,
        name: "Ice Lemon",
        brand: "LUCKY",
        category: "liquids",
        flavor: "Лимон • холод",
        volume: "30 мл • 20 мг",
        price: 340,
        oldPrice: 390,
        tags: ["sale"]
    },

    {
        id: 7,
        name: "Frozen Berry",
        brand: "REFROST",
        category: "liquids",
        flavor: "Лісові ягоди • холод",
        volume: "30 мл • 20 мг",
        price: 360,
        oldPrice: 410,
        tags: ["sale", "popular"]
    },

    {
        id: 8,
        name: "Hype Cola",
        brand: "HYPE",
        category: "liquids",
        flavor: "Кола • лід",
        volume: "30 мл • 20 мг",
        price: 350,
        oldPrice: 400,
        tags: ["sale"]
    },

    {
        id: 9,
        name: "Pink Berry",
        brand: "3GER",
        category: "liquids",
        flavor: "Солодкі ягоди",
        volume: "30 мл • 20 мг",
        price: 370,
        oldPrice: null,
        tags: ["popular"]
    },

    {
        id: 10,
        name: "Royal Mix",
        brand: "ALCHEMIST",
        category: "liquids",
        flavor: "Фруктовий мікс",
        volume: "30 мл • 20 мг",
        price: 420,
        oldPrice: null,
        tags: ["popular"]
    },

    {
        id: 11,
        name: "Fresh Bottle",
        brand: "INBOTTLE",
        category: "liquids",
        flavor: "Свіжий фруктовий мікс",
        volume: "30 мл • 20 мг",
        price: 390,
        oldPrice: null,
        tags: ["popular"]
    },



    /* POD */

    {
        id: 101,
        name: "POD Device",
        brand: "CloudRoyal",
        category: "pods",
        flavor: "Компактна POD-система",
        volume: "Новинка",
        price: 850,
        oldPrice: null,
        tags: ["new", "popular"]
    },

    {
        id: 102,
        name: "POD Pro",
        brand: "CloudRoyal",
        category: "pods",
        flavor: "Для щоденного використання",
        volume: "Новинка",
        price: 990,
        oldPrice: 1150,
        tags: ["sale", "new"]
    },



    /* CARTRIDGES */

    {
        id: 201,
        name: "Replacement Cartridge",
        brand: "POD",
        category: "cartridges",
        flavor: "Змінний картридж",
        volume: "1 шт.",
        price: 180,
        oldPrice: null,
        tags: ["popular"]
    },

    {
        id: 202,
        name: "Mesh Cartridge",
        brand: "POD",
        category: "cartridges",
        flavor: "Mesh-сітка",
        volume: "1 шт.",
        price: 220,
        oldPrice: null,
        tags: ["new"]
    },



    /* ACCESSORIES */

    {
        id: 301,
        name: "USB Type-C Cable",
        brand: "CloudRoyal",
        category: "accessories",
        flavor: "Кабель для заряджання",
        volume: "1 шт.",
        price: 150,
        oldPrice: null,
        tags: ["popular"]
    },

    {
        id: 302,
        name: "Protective Case",
        brand: "CloudRoyal",
        category: "accessories",
        flavor: "Захисний чохол",
        volume: "1 шт.",
        price: 250,
        oldPrice: null,
        tags: ["new"]
    }

];



/* =====================================================
   STATE
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("cloudroyal_cart") || "[]"
);

let favorites = JSON.parse(
    localStorage.getItem("cloudroyal_favorites") || "[]"
);

let currentFilter = "all";

let currentCategory = "all";

let currentBrand = null;



/* =====================================================
   DOM
===================================================== */

const productsContainer =
    document.getElementById("products");

const saleProductsContainer =
    document.getElementById("saleProducts");

const popularProductsContainer =
    document.getElementById("popularProducts");

const searchInput =
    document.getElementById("search");



/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    checkAge();

    renderProducts();

    renderSaleProducts();

    renderPopularProducts();

    updateCounters();

    updateProfile();

    setupTelegramUser();

});



/* =====================================================
   AGE
===================================================== */

function checkAge() {

    const verified =
        localStorage.getItem("cloudroyal_age_verified");

    if (verified === "true") {

        document.getElementById("ageScreen").style.display =
            "none";

    }

}


function confirmAge() {

    localStorage.setItem(
        "cloudroyal_age_verified",
        "true"
    );

    document.getElementById("ageScreen").style.display =
        "none";

}


function denyAge() {

    document.getElementById("ageScreen").innerHTML = `

        <div class="age-box">

            <div class="age-logo">
                CR
            </div>

            <h1>
                CloudRoyal
            </h1>

            <div class="age-divider"></div>

            <h2>
                Доступ закрыт
            </h2>

            <span>
                Магазин доступен только совершеннолетним.
            </span>

        </div>

    `;

}



/* =====================================================
   TELEGRAM USER
===================================================== */

function setupTelegramUser() {

    try {

        if (
            tg &&
            tg.initDataUnsafe &&
            tg.initDataUnsafe.user
        ) {

            const user =
                tg.initDataUnsafe.user;

            const name =
                user.first_name ||
                user.username ||
                "Гість CloudRoyal";

            const profileName =
                document.getElementById("profileName");

            if (profileName) {
                profileName.textContent = name;
            }

        }

    } catch (error) {

        console.log(
            "Telegram user unavailable"
        );

    }

}



/* =====================================================
   RENDER PRODUCT
===================================================== */

function createProductCard(product) {

    const isFavorite =
        favorites.includes(product.id);

    let badge = "";

    if (product.tags.includes("new")) {

        badge = `
            <span class="product-badge">
                NEW
            </span>
        `;

    } else if (product.tags.includes("sale")) {

        badge = `
            <span class="product-badge sale">
                SALE
            </span>
        `;

    }


    const priceHTML =
        product.oldPrice
            ? `
                <div class="product-price">

                    <span class="old-price">
                        ${product.oldPrice} ₴
                    </span>

                    <span class="current-price">
                        ${product.price} ₴
                    </span>

                </div>
            `
            : `
                <div class="product-price">

                    <span class="current-price">
                        ${product.price} ₴
                    </span>

                </div>
            `;


    return `

        <article class="product-card">

            <div class="product-image">

                ${badge}

                <button
                    class="
                        product-favorite
                        ${isFavorite ? "active" : ""}
                    "
                    onclick="toggleFavorite(${product.id})"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

                <div class="product-image-placeholder">
                    ${product.brand}
                </div>

            </div>


            <div class="product-content">

                <div class="product-brand">
                    ${product.brand}
                </div>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <p class="product-flavor">
                    ${product.flavor}
                </p>


                <div class="product-info">

                    <span class="product-volume">
                        ${product.volume}
                    </span>

                    ${priceHTML}

                </div>


                <button
                    class="product-add"
                    onclick="addToCart(${product.id})"
                >
                    Додати до кошика
                </button>

            </div>

        </article>

    `;

}



/* =====================================================
   FILTER PRODUCTS
===================================================== */

function getFilteredProducts() {

    let result = [...products];


    if (currentCategory !== "all") {

        result =
            result.filter(
                product =>
                    product.category === currentCategory
            );

    }


    if (currentBrand) {

        result =
            result.filter(
                product =>
                    product.brand === currentBrand
            );

    }


    if (currentFilter !== "all") {

        result =
            result.filter(
                product =>
                    product.tags.includes(currentFilter)
            );

    }


    const query =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    if (query) {

        result =
            result.filter(product => {

                return (

                    product.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.brand
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.flavor
                        .toLowerCase()
                        .includes(query)

                );

            });

    }


    return result;

}



/* =====================================================
   RENDER MAIN PRODUCTS
===================================================== */

function renderProducts() {

    const result =
        getFilteredProducts();


    if (!result.length) {

        productsContainer.innerHTML = `

            <div
                class="empty-state"
                style="grid-column:1/-1"
            >

                <div>
                    🔎
                </div>

                <h3>
                    Ничего не найдено
                </h3>

                <p>
                    Попробуйте изменить запрос.
                </p>

            </div>

        `;

        return;

    }


    productsContainer.innerHTML =
        result
            .map(createProductCard)
            .join("");

}



/* =====================================================
   SALE
===================================================== */

function renderSaleProducts() {

    const sale =
        products
            .filter(
                product =>
                    product.tags.includes("sale")
            )
            .slice(0, 4);


    saleProductsContainer.innerHTML =
        sale
            .map(createProductCard)
            .join("");

}



/* =====================================================
   POPULAR
===================================================== */

function renderPopularProducts() {

    const popular =
        products
            .filter(
                product =>
                    product.tags.includes("popular")
            )
            .slice(0, 4);


    popularProductsContainer.innerHTML =
        popular
            .map(createProductCard)
            .join("");

}



/* =====================================================
   SEARCH
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderProducts();

        }
    );

}


function clearSearch() {

    if (!searchInput) return;

    searchInput.value = "";

    currentBrand = null;

    renderProducts();

}



/* =====================================================
   FILTER
===================================================== */

function setFilter(filter, button = null) {

    currentFilter = filter;

    currentBrand = null;

    currentCategory = "all";


    document
        .querySelectorAll(".filter-button")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    } else {

        const target =
            document.querySelector(
                `[data-filter="${filter}"]`
            );

        if (target) {
            target.classList.add("active");
        }

    }


    renderProducts();

    scrollToProducts();

}



/* =====================================================
   CATEGORY
===================================================== */

function openCategory(category) {

    currentCategory = category;

    currentFilter = "all";

    currentBrand = null;


    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const allButton =
        document.querySelector(
            '[data-filter="all"]'
        );

    if (allButton) {
        allButton.classList.add("active");
    }


    if (category === "liquids") {

        document
            .getElementById("liquidBrands")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    } else {

        scrollToProducts();

    }


    renderProducts();

}



/* =====================================================
   BRAND
===================================================== */

function filterBrand(brand) {

    currentBrand = brand;

    currentCategory = "liquids";

    currentFilter = "all";


    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const allButton =
        document.querySelector(
            '[data-filter="all"]'
        );

    if (allButton) {

        allButton.classList.add("active");

    }


    renderProducts();

    setTimeout(() => {

        productsContainer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}



/* =====================================================
   SHOW ALL
===================================================== */

function showAllProducts() {

    currentFilter = "all";

    currentCategory = "all";

    currentBrand = null;


    if (searchInput) {
        searchInput.value = "";
    }


    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const allButton =
        document.querySelector(
            '[data-filter="all"]'
        );

    if (allButton) {
        allButton.classList.add("active");
    }


    renderProducts();

    scrollToProducts();

}


function showAllBrands() {

    currentCategory = "liquids";

    currentBrand = null;

    renderProducts();

    scrollToProducts();

}



/* =====================================================
   CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );

    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }


    saveCart();

    updateCounters();

    renderCart();

    showCart();

}



/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "cloudroyal_cart",
        JSON.stringify(cart)
    );

}



/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== productId
            );

    }


    saveCart();

    updateCounters();

    renderCart();

}



/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const empty =
        document.getElementById(
            "emptyCart"
        );


    if (!cart.length) {

        container.innerHTML = "";

        empty.style.display = "block";

        document
            .querySelector(".cart-footer")
            .style.display = "none";

        return;

    }


    empty.style.display = "none";

    document
        .querySelector(".cart-footer")
        .style.display = "block";


    let total = 0;


    container.innerHTML =
        cart
            .map(item => {

                const product =
                    products.find(
                        p =>
                            p.id === item.id
                    );


                if (!product) {
                    return "";
                }


                total +=
                    product.price *
                    item.quantity;


                return `

                    <div class="cart-item">

                        <div class="cart-item-image">
                            ${product.brand}
                        </div>


                        <div class="cart-item-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <span>
                                ${product.brand}
                            </span>


                            <div class="quantity">

                                <button
                                    onclick="
                                        changeQuantity(
                                            ${product.id},
                                            -1
                                        )
                                    "
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="
                                        changeQuantity(
                                            ${product.id},
                                            1
                                        )
                                    "
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-item-price">

                            ${
                                product.price *
                                item.quantity
                            } ₴

                        </div>

                    </div>

                `;

            })
            .join("");


    document.getElementById(
        "cartTotal"
    ).textContent =
        `${total} ₴`;

}



/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(productId) {

    if (
        favorites.includes(productId)
    ) {

        favorites =
            favorites.filter(
                id =>
                    id !== productId
            );

    } else {

        favorites.push(productId);

    }


    localStorage.setItem(
        "cloudroyal_favorites",
        JSON.stringify(favorites)
    );


    renderProducts();

    renderSaleProducts();

    renderPopularProducts();

    updateCounters();

    updateProfile();

}



/* =====================================================
   FAVORITES WINDOW
===================================================== */

function showFavorites() {

    const favoriteProducts =
        products.filter(
            product =>
                favorites.includes(product.id)
        );


    currentCategory = "all";

    currentFilter = "all";

    currentBrand = null;


    if (!favoriteProducts.length) {

        openModalContent(
            "Обране",
            `
                <div class="empty-state">

                    <div>
                        ♡
                    </div>

                    <h3>
                        Тут поки порожньо
                    </h3>

                    <p>
                        Натискайте ♡ на товарах,
                        щоб додати їх до обраного.
                    </p>

                </div>
            `
        );

        return;

    }


    openModalContent(
        "Обране",
        `
            <div class="products-grid">

                ${
                    favoriteProducts
                        .map(createProductCard)
                        .join("")
                }

            </div>
        `
    );

}



/* =====================================================
   MODAL CONTENT
===================================================== */

function openModalContent(
    title,
    content
) {

    const modal =
        document.getElementById(
            "profileWindow"
        );


    modal.innerHTML = `

        <div class="modal-header">

            <div>

                <span class="section-overline">
                    CLOUDROYAL
                </span>

                <h2>
                    ${title}
                </h2>

            </div>

            <button
                class="close-button"
                onclick="closeProfile()"
            >
                ×
            </button>

        </div>

        ${content}

    `;


    openModal(modal);

}



/* =====================================================
   CART WINDOW
===================================================== */

function showCart() {

    renderCart();

    openModal(
        document.getElementById(
            "cartWindow"
        )
    );

}


function closeCart() {

    closeModal(
        document.getElementById(
            "cartWindow"
        )
    );

}



/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    if (!cart.length) {

        alert(
            "Спочатку додайте товар до кошика."
        );

        return;

    }


    closeCart();

    openModal(
        document.getElementById(
            "checkoutWindow"
        )
    );

}


function closeCheckout() {

    closeModal(
        document.getElementById(
            "checkoutWindow"
        )
    );

}



/* =====================================================
   SUBMIT ORDER
===================================================== */

function submitOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();

    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();

    const comment =
        document.getElementById(
            "customerComment"
        ).value.trim();


    if (!name) {

        alert(
            "Введите ваше имя."
        );

        return;

    }


    if (!phone) {

        alert(
            "Введите номер телефона."
        );

        return;

    }


    let total = 0;

    const orderItems =
        cart.map(item => {

            const product =
                products.find(
                    p =>
                        p.id === item.id
                );


            if (!product) {
                return null;
            }


            total +=
                product.price *
                item.quantity;


            return {

                name:
                    product.name,

                brand:
                    product.brand,

                quantity:
                    item.quantity,

                price:
                    product.price

            };

        }).filter(Boolean);


    const order = {

        customer: name,

        phone: phone,

        comment: comment,

        items: orderItems,

        total: total

    };


    console.log(
        "ORDER:",
        order
    );


    /*
        Если Telegram Mini App работает,
        отправляем данные в Telegram.

        Сервер/бот потом можно подключить
        отдельно.
    */

    if (tg) {

        try {

            tg.sendData(
                JSON.stringify(order)
            );

        } catch (error) {

            console.log(
                "sendData недоступен",
                error
            );

        }

    }


    alert(
        "Замовлення прийнято! Дякуємо за покупку ❤️"
    );


    cart = [];

    saveCart();

    updateCounters();

    renderCart();

    closeCheckout();

}



/* =====================================================
   PROFILE
===================================================== */

function showProfile() {

    updateProfile();

    openModal(
        document.getElementById(
            "profileWindow"
        )
    );

}


function closeProfile() {

    closeModal(
        document.getElementById(
            "profileWindow"
        )
    );

}


function updateProfile() {

    const favoritesElement =
        document.getElementById(
            "profileFavorites"
        );

    const cartElement =
        document.getElementById(
            "profileCart"
        );


    if (favoritesElement) {

        favoritesElement.textContent =
            favorites.length;

    }


    if (cartElement) {

        cartElement.textContent =
            getCartCount();

    }

}



/* =====================================================
   MODAL SYSTEM
===================================================== */

function openModal(modal) {

    if (!modal) return;


    closeAllWindows(false);


    modal.classList.add("show");

    document
        .getElementById("overlay")
        .classList.add("show");

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("show");

    document
        .getElementById("overlay")
        .classList.remove("show");

}


function closeAllWindows(
    removeOverlay = true
) {

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.classList.remove(
                "show"
            );

        });


    if (removeOverlay) {

        document
            .getElementById("overlay")
            .classList.remove("show");

    }

}



/* =====================================================
   COUNTERS
===================================================== */

function getCartCount() {

    return cart.reduce(
        (
            total,
            item
        ) =>
            total +
            item.quantity,
        0
    );

}


function updateCounters() {

    const cartCount =
        getCartCount();


    const cartElements = [

        document.getElementById(
            "cartCount"
        ),

        document.getElementById(
            "headerCartCount"
        )

    ];


    cartElements.forEach(
        element => {

            if (element) {

                element.textContent =
                    cartCount;

            }

        }
    );


    const favoriteElement =
        document.getElementById(
            "favoriteCount"
        );


    if (favoriteElement) {

        favoriteElement.textContent =
            favorites.length;

    }


    updateProfile();

}



/* =====================================================
   NAVIGATION
===================================================== */

function goHome() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function scrollToCatalog() {

    document
        .getElementById("catalog")
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}



/* =====================================================
   SHOW ALL CATEGORIES
===================================================== */

function showAllCategories() {

    scrollToCatalog();

}



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAllWindows();

        }

    }
);
