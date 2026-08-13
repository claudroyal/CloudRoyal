/* =========================================================
   CLOUDROYAL
   FULL SCRIPT

   САЙТ
      ↓
   GOOGLE APPS SCRIPT
      ↓
   GOOGLE SHEETS
      ↓
   TELEGRAM
========================================================= */


/* =========================================================
   TELEGRAM WEB APP
========================================================= */

const tg =
    window.Telegram &&
    window.Telegram.WebApp
        ? window.Telegram.WebApp
        : null;

if (tg) {

    try {

        tg.ready();
        tg.expand();

    } catch (error) {

        console.warn(
            "Telegram WebApp error:",
            error
        );

    }

}


/* =========================================================
   GOOGLE APPS SCRIPT API
========================================================= */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzdPzlm5ombh8jDmfM7FtRXdR1YpMo4qudhGsY3NyHs0v5OcRlRbasSJljCxFwuI_xP/exec";


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    /* =========================
       LIQUIDS
    ========================= */

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


    /* =========================
       POD SYSTEMS
    ========================= */

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


    /* =========================
       CARTRIDGES
    ========================= */

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


/* =========================================================
   STATE
========================================================= */

let currentCategory = "liquid";

let currentFilter = "all";

let currentBrand = "all";

let searchValue = "";

let cart = [];

let favorites = [];


/* =========================================================
   DOM
========================================================= */

let productsContainer = null;

let searchInput = null;

let clearSearchButton = null;

let productsCount = null;

let emptyState = null;

let catalogTitle = null;

let cartCount = null;

let navCartCount = null;

let cartItems = null;

let cartTotal = null;

let cartEmpty = null;

let cartFooter = null;


/* =========================================================
   GET DOM
========================================================= */

function getDOMElements() {

    productsContainer =
        document.getElementById("products");

    searchInput =
        document.getElementById("search");

    clearSearchButton =
        document.getElementById("clearSearch");

    productsCount =
        document.getElementById("productsCount");

    emptyState =
        document.getElementById("emptyState");

    catalogTitle =
        document.getElementById("catalogTitle");

    cartCount =
        document.getElementById("cartCount");

    navCartCount =
        document.getElementById("navCartCount");

    cartItems =
        document.getElementById("cartItems");

    cartTotal =
        document.getElementById("cartTotal");

    cartEmpty =
        document.getElementById("cartEmpty");

    cartFooter =
        document.getElementById("cartFooter");

}


/* =========================================================
   STORAGE
========================================================= */

function loadStorage() {

    try {

        const savedCart =
            localStorage.getItem(
                "cloudroyal_cart"
            );

        const savedFavorites =
            localStorage.getItem(
                "cloudroyal_favorites"
            );


        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {

                cart = parsedCart;

            }

        }


        if (savedFavorites) {

            const parsedFavorites =
                JSON.parse(savedFavorites);

            if (Array.isArray(parsedFavorites)) {

                favorites =
                    parsedFavorites;

            }

        }

    } catch (error) {

        console.warn(
            "Storage error:",
            error
        );

        cart = [];

        favorites = [];

    }

}


/* =========================================================
   SAVE STORAGE
========================================================= */

function saveStorage() {

    try {

        localStorage.setItem(
            "cloudroyal_cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "cloudroyal_favorites",
            JSON.stringify(favorites)
        );

    } catch (error) {

        console.warn(
            "Storage save error:",
            error
        );

    }

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return (
        Number(price || 0)
            .toLocaleString("uk-UA")
        + " ₴"
    );

}


/* =========================================================
   CATEGORY
========================================================= */

function openCategory(category) {

    currentCategory =
        category;

    currentFilter =
        "all";

    currentBrand =
        "all";

    searchValue =
        "";


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (clearSearchButton) {

        clearSearchButton.style.display =
            "none";

    }


    updateCategoryButtons();

    updateFilterButtons();

    updateBrandButtons();

    updateCatalogTitle();

    renderProducts();

    scrollToCatalog();

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

function updateCategoryButtons() {

    const buttons =
        document.querySelectorAll(
            ".category-card"
        );


    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );

    });


    const categoryMap = {

        liquid: 0,

        pod: 1,

        cartridge: 2

    };


    const index =
        categoryMap[
            currentCategory
        ];


    if (
        index !== undefined &&
        buttons[index]
    ) {

        buttons[index]
            .classList.add(
                "active"
            );

    }

}


/* =========================================================
   CATALOG TITLE
========================================================= */

function updateCatalogTitle() {

    if (!catalogTitle) {

        return;

    }


    const titles = {

        liquid:
            "Обери свій смак",

        pod:
            "POD-системи",

        cartridge:
            "Картриджі та аксесуари"

    };


    catalogTitle.textContent =
        titles[currentCategory]
        || "Каталог";


    const label =
        document.querySelector(
            ".catalog-section .section-label"
        );


    if (label) {

        const labelsMap = {

            liquid:
                "РІДИНИ",

            pod:
                "POD-СИСТЕМИ",

            cartridge:
                "КАРТРИДЖІ"

        };


        label.textContent =
            labelsMap[
                currentCategory
            ];

    }

}


/* =========================================================
   FILTER
========================================================= */

function setFilter(filter) {

    currentFilter =
        filter;

    updateFilterButtons();

    renderProducts();

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

function updateFilterButtons() {

    const buttons =
        document.querySelectorAll(
            ".filter-chip"
        );


    buttons.forEach(button => {

        button.classList.toggle(

            "active",

            button.dataset.filter ===
            currentFilter

        );

    });

}


/* =========================================================
   BRAND
========================================================= */

function setBrand(brand) {

    currentBrand =
        brand;

    updateBrandButtons();

    renderProducts();

}


/* =========================================================
   BRAND BUTTONS
========================================================= */

function updateBrandButtons() {

    const buttons =
        document.querySelectorAll(
            ".brand-chip"
        );


    buttons.forEach(button => {

        button.classList.toggle(

            "active",

            button.dataset.brand ===
            currentBrand

        );

    });

}


/* =========================================================
   SHOW ALL BRANDS
========================================================= */

function toggleBrands() {

    const brands =
        document.getElementById(
            "brands"
        );

    const button =
        document.getElementById(
            "showBrandsButton"
        );


    if (
        !brands ||
        !button
    ) {

        return;

    }


    const expanded =
        brands.classList.toggle(
            "expanded"
        );


    button.textContent =
        expanded
            ? "Сховати"
            : "Показати всі";

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    if (!searchInput) {

        return;

    }


    searchInput.addEventListener(
        "input",
        function () {

            searchValue =
                this.value
                    .trim()
                    .toLowerCase();


            if (clearSearchButton) {

                clearSearchButton.style.display =
                    searchValue
                        ? "flex"
                        : "none";

            }


            renderProducts();

        }
    );

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

function clearSearch() {

    searchValue =
        "";


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (clearSearchButton) {

        clearSearchButton.style.display =
            "none";

    }


    renderProducts();

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    return products.filter(
        product => {


            if (
                product.category !==
                currentCategory
            ) {

                return false;

            }


            if (
                currentBrand !== "all" &&
                product.brand !==
                currentBrand
            ) {

                return false;

            }


            if (
                currentFilter === "new" &&
                !product.new
            ) {

                return false;

            }


            if (
                currentFilter === "popular" &&
                !product.popular
            ) {

                return false;

            }


            if (
                currentFilter === "sale" &&
                !product.oldPrice
            ) {

                return false;

            }


            if (searchValue) {

                const text = (

                    product.brand +
                    " " +
                    product.name +
                    " " +
                    product.volume

                ).toLowerCase();


                if (
                    !text.includes(
                        searchValue
                    )
                ) {

                    return false;

                }

            }


            return true;

        }
    );

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    if (!productsContainer) {

        return;

    }


    const filtered =
        getFilteredProducts();


    productsContainer.innerHTML =
        "";


    if (productsCount) {

        productsCount.textContent =
            filtered.length +
            " " +
            pluralProducts(
                filtered.length
            );

    }


    if (
        filtered.length === 0
    ) {

        if (emptyState) {

            emptyState.classList.add(
                "visible"
            );

        }

        return;

    }


    if (emptyState) {

        emptyState.classList.remove(
            "visible"
        );

    }


    filtered.forEach(
        product => {

            productsContainer.appendChild(
                createProductCard(
                    product
                )
            );

        }
    );

}


/* =========================================================
   PLURAL
========================================================= */

function pluralProducts(number) {

    if (
        number % 10 === 1 &&
        number % 100 !== 11
    ) {

        return "товар";

    }


    if (
        number % 10 >= 2 &&
        number % 10 <= 4 &&
        (
            number % 100 < 10 ||
            number % 100 >= 20
        )
    ) {

        return "товари";

    }


    return "товарів";

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "product-card";


    let badgeHTML =
        "";


    if (product.badge) {

        const badgeClass =
            product.badge === "sale"
                ? "sale"
                : product.badge === "popular"
                    ? "popular"
                    : "";


        badgeHTML = `

            <span
                class="product-badge ${badgeClass}"
            >
                ${product.badgeText || "NEW"}
            </span>

        `;

    }


    const favorite =
        favorites.includes(
            product.id
        );


    const nicotineHTML =
        product.nicotine
            ? `
                <span>
                    ${product.nicotine}
                </span>
              `
            : "";


    const oldPriceHTML =
        product.oldPrice

            ? `
                <span class="old-price">
                    ${formatPrice(
                        product.oldPrice
                    )}
                </span>
              `

            : `
                <span class="old-price">
                    &nbsp;
                </span>
              `;


    card.innerHTML = `

        <div class="product-visual">

            ${badgeHTML}

            <button
                class="favorite-btn ${
                    favorite
                        ? "active"
                        : ""
                }"
                onclick="toggleFavorite(
                    ${product.id}
                )"
                aria-label="Обране"
            >
                ${
                    favorite
                        ? "♥"
                        : "♡"
                }
            </button>

            <div class="product-placeholder">
                ${product.brand}
            </div>

        </div>


        <div class="product-info">

            <div class="product-brand">
                ${product.brand}
            </div>

            <h3 class="product-name">
                ${product.name}
            </h3>

            <div class="product-meta">

                <span>
                    ${product.volume}
                </span>

                ${nicotineHTML}

            </div>


            <div class="product-bottom">

                <div class="price-box">

                    ${oldPriceHTML}

                    <strong class="price">
                        ${formatPrice(
                            product.price
                        )}
                    </strong>

                </div>


                <button
                    class="add-button"
                    onclick="addToCart(
                        ${product.id}
                    )"
                    aria-label="Додати до кошика"
                >
                    +
                </button>

            </div>

        </div>

    `;


    return card;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id ===
                productId
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            item =>
                item.id ===
                productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id:
                productId,

            quantity:
                1

        });

    }


    saveStorage();

    updateCartCounter();


    if (tg) {

        try {

            tg.HapticFeedback
                .impactOccurred(
                    "light"
                );

        } catch (error) {}

    }

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !==
                productId
        );


    saveStorage();

    updateCartCounter();

    renderCart();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.id ===
                productId
        );


    if (!item) {

        return;

    }


    item.quantity +=
        change;


    if (
        item.quantity <= 0
    ) {

        removeFromCart(
            productId
        );

        return;

    }


    saveStorage();

    updateCartCounter();

    renderCart();

}


/* =========================================================
   GET CART COUNT
========================================================= */

function getCartCount() {

    return cart.reduce(

        (
            total,
            item
        ) => {

            return total +
                Number(
                    item.quantity || 0
                );

        },

        0

    );

}


/* =========================================================
   UPDATE CART COUNTER
========================================================= */

function updateCartCounter() {

    const count =
        getCartCount();


    if (cartCount) {

        cartCount.textContent =
            count;

        cartCount.style.display =
            count > 0
                ? "flex"
                : "none";

    }


    if (navCartCount) {

        navCartCount.textContent =
            count;

        navCartCount.style.display =
            count > 0
                ? "flex"
                : "none";

    }

}


/* =========================================================
   GET CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(

        (
            total,
            item
        ) => {

            const product =
                products.find(
                    p =>
                        p.id ===
                        item.id
                );


            if (!product) {

                return total;

            }


            return total +
                (
                    Number(
                        product.price || 0
                    ) *
                    Number(
                        item.quantity || 0
                    )
                );

        },

        0

    );

}


/* =========================================================
   SHOW CART
========================================================= */

function showCart() {

    renderCart();


    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   CART OVERLAY
========================================================= */

function closeCartByOverlay(event) {

    if (
        event &&
        event.target &&
        event.target.id ===
        "cartOverlay"
    ) {

        closeCart();

    }

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    if (!cartItems) {

        return;

    }


    cartItems.innerHTML =
        "";


    if (
        cart.length === 0
    ) {

        if (cartEmpty) {

            cartEmpty.style.display =
                "block";

        }


        if (cartFooter) {

            cartFooter.style.display =
                "none";

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(0);

        }


        return;

    }


    if (cartEmpty) {

        cartEmpty.style.display =
            "none";

    }


    if (cartFooter) {

        cartFooter.style.display =
            "block";

    }


    cart.forEach(
        item => {

            const product =
                products.find(
                    p =>
                        p.id ===
                        item.id
                );


            if (!product) {

                return;

            }


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">
                    ${product.brand}
                </div>


                <div class="cart-item-info">

                    <div class="cart-item-brand">
                        ${product.brand}
                    </div>

                    <div class="cart-item-name">
                        ${product.name}
                    </div>

                    <div class="cart-item-price">
                        ${formatPrice(
                            product.price
                        )}
                    </div>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>

            `;


            cartItems.appendChild(
                element
            );

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (
        cart.length === 0
    ) {

        alert(
            "Кошик порожній."
        );

        return;

    }


    closeCart();


    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE CHECKOUT
========================================================= */

function closeCheckout() {

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   CHECKOUT OVERLAY
========================================================= */

function closeCheckoutByOverlay(
    event
) {

    if (
        event &&
        event.target &&
        event.target.id ===
        "checkoutOverlay"
    ) {

        closeCheckout();

    }

}


/* =========================================================
   GET INPUT VALUE
========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return "";

    }


    return String(
        element.value || ""
    ).trim();

}


/* =========================================================
   SUBMIT ORDER
========================================================= */

async function submitOrder() {

    /* =====================================================
       GET CUSTOMER DATA
    ===================================================== */

    const name =
        getInputValue(
            "customerName"
        );


    const phone =
        getInputValue(
            "customerPhone"
        );


    const comment =
        getInputValue(
            "customerComment"
        );


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name) {

        alert(
            "Введи своє ім'я."
        );


        const input =
            document.getElementById(
                "customerName"
            );


        if (input) {

            input.focus();

        }


        return;

    }


    if (!phone) {

        alert(
            "Введи номер телефону."
        );


        const input =
            document.getElementById(
                "customerPhone"
            );


        if (input) {

            input.focus();

        }


        return;

    }


    if (
        !Array.isArray(cart) ||
        cart.length === 0
    ) {

        alert(
            "Кошик порожній."
        );

        return;

    }


    /* =====================================================
       PREPARE PRODUCTS
    ===================================================== */

    const orderItems =
        cart
            .map(
                item => {

                    const product =
                        products.find(
                            product =>
                                product.id ===
                                item.id
                        );


                    if (!product) {

                        return null;

                    }


                    return {

                        product:
                            product.brand +
                            " — " +
                            product.name,

                        quantity:
                            Number(
                                item.quantity || 1
                            ),

                        price:
                            Number(
                                product.price || 0
                            )

                    };

                }
            )
            .filter(
                item =>
                    item !== null
            );


    if (
        orderItems.length === 0
    ) {

        alert(
            "Не вдалося визначити товари в кошику."
        );

        return;

    }


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        getCartTotal();


    /* =====================================================
       ORDER DATA
    ===================================================== */

    const order = {

        name:
            name,

        phone:
            phone,

        comment:
            comment,

        items:
            orderItems,

        total:
            total

    };


    /* =====================================================
       FIND SUBMIT BUTTON
    ===================================================== */

    const checkoutOverlay =
        document.getElementById(
            "checkoutOverlay"
        );


    let submitButton =
        null;


    if (checkoutOverlay) {

        const buttons =
            checkoutOverlay
                .querySelectorAll(
                    "button"
                );


        buttons.forEach(
            button => {

                const text =
                    (
                        button.textContent ||
                        ""
                    ).toLowerCase();


                if (
                    text.includes(
                        "замов"
                    ) ||
                    text.includes(
                        "підтверд"
                    )
                ) {

                    submitButton =
                        button;

                }

            }
        );

    }


    /* =====================================================
       DISABLE BUTTON
    ===================================================== */

    if (submitButton) {

        submitButton.disabled =
            true;


        submitButton.dataset
            .originalText =
                submitButton.textContent;


        submitButton.textContent =
            "Відправляємо...";

    }


    /* =====================================================
       SEND TO GOOGLE APPS SCRIPT
    ===================================================== */

    try {

        const response =
            await fetch(
                API_URL,
                {

                    method:
                        "POST",

                    headers: {

                        /*
                         * text/plain використовується
                         * спеціально, щоб браузер
                         * не робив зайвий CORS preflight.
                         */

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(
                            order
                        )

                }
            );


        /* =================================================
           READ RESPONSE
        ================================================= */

        const responseText =
            await response.text();


        let result;


        try {

            result =
                JSON.parse(
                    responseText
                );

        } catch (jsonError) {

            console.error(
                "Google Apps Script response:",
                responseText
            );


            throw new Error(
                "Сервер повернув некоректну відповідь."
            );

        }


        /* =================================================
           CHECK SERVER RESULT
        ================================================= */

        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(

                result &&
                result.error

                    ? result.error

                    : "Не вдалося створити замовлення."

            );

        }


        /* =================================================
           TELEGRAM HAPTIC
        ================================================= */

        if (tg) {

            try {

                tg.HapticFeedback
                    .notificationOccurred(
                        "success"
                    );

            } catch (error) {}

        }


        /* =================================================
           ORDER NUMBER
        ================================================= */

        const orderNumber =
            result.orderNumber;


        /* =================================================
           SUCCESS
        ================================================= */

        alert(

            "Дякуємо за замовлення! 🎉\n\n" +

            "Номер замовлення: #" +

            orderNumber

        );


        /* =================================================
           CLEAR CART
        ================================================= */

        cart = [];


        saveStorage();


        updateCartCounter();


        renderCart();


        /* =================================================
           CLEAR FORM
        ================================================= */

        const nameInput =
            document.getElementById(
                "customerName"
            );


        const phoneInput =
            document.getElementById(
                "customerPhone"
            );


        const commentInput =
            document.getElementById(
                "customerComment"
            );


        if (nameInput) {

            nameInput.value =
                "";

        }


        if (phoneInput) {

            phoneInput.value =
                "";

        }


        if (commentInput) {

            commentInput.value =
                "";

        }


        /* =================================================
           CLOSE CHECKOUT
        ================================================= */

        closeCheckout();


    } catch (error) {

        console.error(
            "CLOUDROYAL ORDER ERROR:",
            error
        );


        alert(

            "Не вдалося відправити замовлення.\n\n" +

            "Перевір підключення та спробуй ще раз."

        );


    } finally {

        /* =================================================
           ENABLE BUTTON
        ================================================= */

        if (submitButton) {

            submitButton.disabled =
                false;


            if (
                submitButton.dataset
                    .originalText
            ) {

                submitButton.textContent =
                    submitButton.dataset
                        .originalText;

            }

        }

    }

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(productId) {

    if (
        favorites.includes(
            productId
        )
    ) {

        favorites =
            favorites.filter(
                id =>
                    id !==
                    productId
            );

    } else {

        favorites.push(
            productId
        );

    }


    saveStorage();

    renderProducts();

}


/* =========================================================
   SHOW FAVORITES
========================================================= */

function showFavorites() {

    renderFavorites();


    const overlay =
        document.getElementById(
            "favoritesOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE FAVORITES
========================================================= */

function closeFavorites() {

    const overlay =
        document.getElementById(
            "favoritesOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   FAVORITES OVERLAY
========================================================= */

function closeFavoritesByOverlay(
    event
) {

    if (
        event &&
        event.target &&
        event.target.id ===
        "favoritesOverlay"
    ) {

        closeFavorites();

    }

}


/* =========================================================
   RENDER FAVORITES
========================================================= */

function renderFavorites() {

    const container =
        document.getElementById(
            "favoriteProducts"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    const favoriteProducts =
        products.filter(
            product =>
                favorites.includes(
                    product.id
                )
        );


    if (
        favoriteProducts.length === 0
    ) {

        container.innerHTML = `

            <div
                class="cart-empty"
                style="grid-column:1/-1"
            >

                <div>
                    ♡
                </div>

                <h3>
                    Обране порожнє
                </h3>

                <p>
                    Натискай ♡ на товарах,
                    щоб додати їх сюди.
                </p>

            </div>

        `;


        return;

    }


    favoriteProducts.forEach(
        product => {

            container.appendChild(
                createProductCard(
                    product
                )
            );

        }
    );

}


/* =========================================================
   PROFILE
========================================================= */

function showProfile() {

    const overlay =
        document.getElementById(
            "profileOverlay"
        );


    const profileName =
        document.getElementById(
            "profileName"
        );


    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const user =
            tg.initDataUnsafe.user;


        const name =
            user.first_name ||
            "Користувач";


        if (profileName) {

            profileName.textContent =
                name;

        }

    }


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE PROFILE
========================================================= */

function closeProfile() {

    const overlay =
        document.getElementById(
            "profileOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   PROFILE OVERLAY
========================================================= */

function closeProfileByOverlay(
    event
) {

    if (
        event &&
        event.target &&
        event.target.id ===
        "profileOverlay"
    ) {

        closeProfile();

    }

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    window.scrollTo({

        top:
            0,

        behavior:
            "smooth"

    });

}


/* =========================================================
   SCROLL TO CATALOG
========================================================= */

function scrollToCatalog() {

    const catalog =
        document.getElementById(
            "catalog"
        );


    if (!catalog) {

        return;

    }


    catalog.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}


/* =========================================================
   RESET FILTERS
========================================================= */

function resetFilters() {

    currentFilter =
        "all";

    currentBrand =
        "all";

    searchValue =
        "";


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (clearSearchButton) {

        clearSearchButton.style.display =
            "none";

    }


    updateFilterButtons();

    updateBrandButtons();

    renderProducts();

}


/* =========================================================
   INITIALIZE
========================================================= */

function init() {

    getDOMElements();

    loadStorage();

    setupSearch();

    updateCategoryButtons();

    updateFilterButtons();

    updateBrandButtons();

    updateCatalogTitle();

    updateCartCounter();

    renderProducts();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();

}
