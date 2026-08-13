/* =========================================
   TELEGRAM
========================================= */

let tg = null;


if (
    window.Telegram &&
    window.Telegram.WebApp
) {

    tg =
        window.Telegram.WebApp;

    tg.ready();

    tg.expand();

}



/* =========================================
   BRANDS
========================================= */

const brands = [

    "CHASER",

    "MOOD DUCK",

    "PUNCH",

    "OCTOBAR",

    "FLAVORLAB",

    "LUCKY",

    "REFROST",

    "HYPE",

    "3GER",

    "ALCHEMIST",

    "INBOTTLE"

];



/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "Classic Berry",
        brand: "CHASER",
        category: "liquid",
        price: 350,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: true,
        isSale: false
    },


    {
        id: 2,
        name: "Blue Raspberry",
        brand: "CHASER",
        category: "liquid",
        price: 320,
        oldPrice: 400,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 3,
        name: "Sweet Apple",
        brand: "MOOD DUCK",
        category: "liquid",
        price: 360,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: false,
        isSale: false
    },


    {
        id: 4,
        name: "Mango Ice",
        brand: "MOOD DUCK",
        category: "liquid",
        price: 340,
        oldPrice: 420,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 5,
        name: "Cherry Punch",
        brand: "PUNCH",
        category: "liquid",
        price: 370,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: true,
        isSale: false
    },


    {
        id: 6,
        name: "Tropical Mix",
        brand: "OCTOBAR",
        category: "liquid",
        price: 390,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: false,
        isSale: false
    },


    {
        id: 7,
        name: "Grape Lemon",
        brand: "FLAVORLAB",
        category: "liquid",
        price: 350,
        oldPrice: 430,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 8,
        name: "Fresh Berry",
        brand: "LUCKY",
        category: "liquid",
        price: 330,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: false
    },


    {
        id: 9,
        name: "Ice Watermelon",
        brand: "REFROST",
        category: "liquid",
        price: 380,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: false,
        isSale: false
    },


    {
        id: 10,
        name: "Hype Energy",
        brand: "HYPE",
        category: "liquid",
        price: 360,
        oldPrice: 450,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 11,
        name: "Berry Mix",
        brand: "3GER",
        category: "liquid",
        price: 340,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: false,
        isSale: false
    },


    {
        id: 12,
        name: "Alchemist Original",
        brand: "ALCHEMIST",
        category: "liquid",
        price: 420,
        oldPrice: null,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: true,
        isPopular: true,
        isSale: false
    },


    {
        id: 13,
        name: "Tobacco Classic",
        brand: "INBOTTLE",
        category: "liquid",
        price: 350,
        oldPrice: 420,
        volume: "30 ml",
        nicotine: "20 mg",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 14,
        name: "Cloud POD",
        brand: "CloudRoyal",
        category: "pod",
        price: 1200,
        oldPrice: null,
        volume: "",
        nicotine: "",
        isNew: true,
        isPopular: true,
        isSale: false
    },


    {
        id: 15,
        name: "Royal POD Pro",
        brand: "CloudRoyal",
        category: "pod",
        price: 1500,
        oldPrice: 1800,
        volume: "",
        nicotine: "",
        isNew: false,
        isPopular: true,
        isSale: true
    },


    {
        id: 16,
        name: "Universal Cartridge",
        brand: "CloudRoyal",
        category: "cartridges",
        price: 300,
        oldPrice: null,
        volume: "",
        nicotine: "",
        isNew: true,
        isPopular: false,
        isSale: false
    },


    {
        id: 17,
        name: "Replacement Cartridge",
        brand: "CloudRoyal",
        category: "cartridges",
        price: 350,
        oldPrice: 420,
        volume: "",
        nicotine: "",
        isNew: false,
        isPopular: true,
        isSale: true
    }

];



/* =========================================
   LOCAL STORAGE
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalCart"
        )
    ) || [];


let favorites =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalFavorites"
        )
    ) || [];



/* =========================================
   HELPERS
========================================= */

function formatPrice(price) {

    return (
        Number(price)
            .toLocaleString("uk-UA")
        + " ₴"
    );

}


function saveCart() {

    localStorage.setItem(
        "cloudRoyalCart",
        JSON.stringify(cart)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "cloudRoyalFavorites",
        JSON.stringify(favorites)
    );

}



/* =========================================
   HIDE PAGES
========================================= */

function hidePages() {

    const ids = [

        "mainContent",

        "catalogPage",

        "categoryPage",

        "brandPage",

        "favoritesPage"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);


        if (element) {

            element.style.display =
                "none";

        }

    });

}



/* =========================================
   HOME
========================================= */

function goHome() {

    hidePages();


    document.getElementById(
        "mainContent"
    ).style.display = "block";


    setActiveNav(
        "navHome"
    );


    window.scrollTo(
        0,
        0
    );

}



/* =========================================
   CATALOG
========================================= */

function openCatalog() {

    hidePages();


    document.getElementById(
        "catalogPage"
    ).style.display = "block";


    setActiveNav(
        "navCatalog"
    );


    window.scrollTo(
        0,
        0
    );

}


function openLiquids() {

    openCatalog();

}



/* =========================================
   BRAND
========================================= */

function openBrand(brand) {

    hidePages();


    const page =
        document.getElementById(
            "brandPage"
        );


    const title =
        document.getElementById(
            "brandTitle"
        );


    const container =
        document.getElementById(
            "brandProducts"
        );


    title.textContent =
        brand;


    const filtered =
        products.filter(
            product =>
                product.brand === brand
        );


    renderProducts(
        filtered,
        container
    );


    page.style.display =
        "block";


    setActiveNav(
        "navCatalog"
    );


    window.scrollTo(
        0,
        0
    );

}



/* =========================================
   CATEGORY
========================================= */

function openCategory(category) {

    hidePages();


    const page =
        document.getElementById(
            "categoryPage"
        );


    const title =
        document.getElementById(
            "categoryTitle"
        );


    const description =
        document.getElementById(
            "categoryDescription"
        );


    const container =
        document.getElementById(
            "categoryProducts"
        );


    let titleText =
        "Категорія";


    let descriptionText =
        "";


    let filtered = [];



    if (category === "liquid") {

        titleText =
            "Рідина";

        descriptionText =
            "Усі бренди та смаки";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "liquid"
            );

    }


    if (category === "pod") {

        titleText =
            "POD-системи";

        descriptionText =
            "Пристрої";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "pod"
            );

    }


    if (category === "cartridges") {

        titleText =
            "Картриджі";

        descriptionText =
            "Змінні картриджі";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "cartridges"
            );

    }


    if (category === "new") {

        titleText =
            "Новинки";

        descriptionText =
            "Нові надходження CloudRoyal";

        filtered =
            products.filter(
                product =>
                    product.isNew
            );

    }


    if (category === "popular") {

        titleText =
            "Популярне";

        descriptionText =
            "Товари, які обирають найчастіше";

        filtered =
            products.filter(
                product =>
                    product.isPopular
            );

    }


    if (category === "sale") {

        titleText =
            "Знижки";

        descriptionText =
            "Вигідні пропозиції";

        filtered =
            products.filter(
                product =>
                    product.isSale
            );

    }


    title.textContent =
        titleText;


    description.textContent =
        descriptionText;


    renderProducts(
        filtered,
        container
    );


    page.style.display =
        "block";


    setActiveNav(
        "navCatalog"
    );


    window.scrollTo(
        0,
        0
    );

}



/* =========================================
   PRODUCT CARD
========================================= */

function renderProducts(
    list,
    container
) {

    container.innerHTML = "";


    if (
        !list ||
        list.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <strong>
                    Поки що порожньо
                </strong>

                Тут скоро з'являться товари.

            </div>

        `;

        return;

    }


    list.forEach(product => {

        const isFavorite =
            favorites.includes(
                product.id
            );


        let badges = "";


        if (product.isNew) {

            badges += `

                <span class="badge new">
                    NEW
                </span>

            `;

        }


        if (
            product.isSale &&
            product.oldPrice
        ) {

            const discount =
                Math.round(
                    (
                        1 -
                        product.price /
                        product.oldPrice
                    ) * 100
                );


            badges += `

                <span class="badge sale">
                    -${discount}%
                </span>

            `;

        }


        const meta = [

            product.volume,

            product.nicotine

        ]
            .filter(Boolean)
            .join(" · ");


        const oldPrice =
            product.oldPrice
                ? `

                    <span class="old-price">
                        ${formatPrice(
                            product.oldPrice
                        )}
                    </span>

                `
                : "";


        container.innerHTML += `

            <article class="product">


                <div class="badges">

                    ${badges}

                </div>


                <button
                    class="
                        favorite
                        ${isFavorite ? "active" : ""}
                    "
                    onclick="
                        toggleFavorite(
                            ${product.id}
                        )
                    "
                    aria-label="Обране"
                >

                    ${
                        isFavorite
                            ? "♥"
                            : "♡"
                    }

                </button>


                <div class="product-image"></div>


                <div class="product-info">


                    <div class="product-brand">

                        ${product.brand}

                    </div>


                    <h3 class="product-name">

                        ${product.name}

                    </h3>


                    ${
                        meta
                            ? `
                                <div class="product-meta">
                                    ${meta}
                                </div>
                            `
                            : ""
                    }


                    <div class="product-price">

                        ${formatPrice(
                            product.price
                        )}

                        ${oldPrice}

                    </div>


                    <button
                        class="product-button"
                        onclick="
                            addToCart(
                                ${product.id}
                            )
                        "
                    >

                        Додати до кошика

                    </button>

                </div>

            </article>

        `;

    });

}



/* =========================================
   HOME PRODUCTS
========================================= */

function renderHome() {

    const newProducts =
        products.filter(
            product =>
                product.isNew
        );


    const popularProducts =
        products.filter(
            product =>
                product.isPopular
        );


    const saleProducts =
        products.filter(
            product =>
                product.isSale
        );


    renderProducts(

        newProducts.slice(0, 4),

        document.getElementById(
            "newProducts"
        )

    );


    renderProducts(

        popularProducts.slice(0, 4),

        document.getElementById(
            "popularProducts"
        )

    );


    renderProducts(

        saleProducts.slice(0, 4),

        document.getElementById(
            "saleProducts"
        )

    );

}



/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(id) {

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

    } else {

        favorites.push(id);

        toast(
            "Додано до обраного"
        );

    }


    saveFavorites();


    refreshCurrentPage();

}


function showFavorites() {

    hidePages();


    const page =
        document.getElementById(
            "favoritesPage"
        );


    const container =
        document.getElementById(
            "favoriteProducts"
        );


    const list =
        products.filter(
            product =>
                favorites.includes(
                    product.id
                )
        );


    renderProducts(
        list,
        container
    );


    page.style.display =
        "block";


    setActiveNav(
        "navFavorites"
    );


    window.scrollTo(
        0,
        0
    );

}



/* =========================================
   REFRESH CURRENT
========================================= */

function refreshCurrentPage() {

    const main =
        document.getElementById(
            "mainContent"
        );


    const catalog =
        document.getElementById(
            "catalogPage"
        );


    const category =
        document.getElementById(
            "categoryPage"
        );


    const brand =
        document.getElementById(
            "brandPage"
        );


    const favoritesPage =
        document.getElementById(
            "favoritesPage"
        );


    if (
        main.style.display !==
        "none"
    ) {

        renderHome();

        return;

    }


    if (
        favoritesPage.style.display !==
        "none"
    ) {

        showFavorites();

        return;

    }


    if (
        brand.style.display !==
        "none"
    ) {

        openBrand(
            document.getElementById(
                "brandTitle"
            ).textContent
        );

        return;

    }


    if (
        category.style.display !==
        "none"
    ) {

        const title =
            document.getElementById(
                "categoryTitle"
            ).textContent;


        const map = {

            "Рідина": "liquid",

            "POD-системи": "pod",

            "Картриджі": "cartridges",

            "Новинки": "new",

            "Популярне": "popular",

            "Знижки": "sale"

        };


        if (map[title]) {

            openCategory(
                map[title]
            );

        }

    }

}



/* =========================================
   CART
========================================= */

function openCart() {

    renderCart();


    document.getElementById(
        "cartOverlay"
    ).style.display = "flex";

}


function closeCart(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {

        return;

    }


    document.getElementById(
        "cartOverlay"
    ).style.display = "none";

}



/* =========================================
   ADD CART
========================================= */

function addToCart(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    toast(
        "Товар додано до кошика"
    );


    if (
        tg &&
        tg.HapticFeedback
    ) {

        tg.HapticFeedback
            .impactOccurred(
                "light"
            );

    }

}



/* =========================================
   CART RENDER
========================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const empty =
        document.getElementById(
            "cartEmpty"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    container.innerHTML = "";


    if (
        cart.length === 0
    ) {

        empty.style.display =
            "flex";


        totalElement.textContent =
            "0 ₴";


        return;

    }


    empty.style.display =
        "none";


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (!product) {

            return;

        }


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">


                <div class="cart-image">

                    PHOTO

                </div>


                <div>

                    <div class="cart-item-name">

                        ${product.name}

                    </div>


                    <div class="cart-item-price">

                        ${formatPrice(
                            product.price
                        )}

                    </div>

                </div>


                <div class="cart-quantity">

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

        `;

    });


    totalElement.textContent =
        formatPrice(total);

}



/* =========================================
   QUANTITY
========================================= */

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.id === id
        );


    if (!item) {

        return;

    }


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== id
            );

    }


    saveCart();

    updateCartCount();

    renderCart();

}



/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent = count;

}



/* =========================================
   CHECKOUT
========================================= */

function openCheckout() {

    if (
        cart.length === 0
    ) {

        toast(
            "Спочатку додайте товар"
        );

        return;

    }


    document.getElementById(
        "cartOverlay"
    ).style.display =
        "none";


    document.getElementById(
        "checkoutOverlay"
    ).style.display =
        "flex";

}


function closeCheckout(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {

        return;

    }


    document.getElementById(
        "checkoutOverlay"
    ).style.display =
        "none";

}



/* =========================================
   ORDER
========================================= */

function submitOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    if (!name) {

        toast(
            "Вкажіть ваше ім'я"
        );

        return;

    }


    if (!phone) {

        toast(
            "Вкажіть номер телефону"
        );

        return;

    }


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (product) {

            total +=
                product.price *
                item.quantity;

        }

    });


    const order = {

        name,

        phone,

        total,

        items: cart

    };


    console.log(
        "CloudRoyal order:",
        order
    );


    if (
        tg &&
        tg.showAlert
    ) {

        tg.showAlert(
            "Замовлення прийнято!"
        );

    } else {

        alert(
            "Замовлення прийнято!"
        );

    }


    cart = [];


    saveCart();

    updateCartCount();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerPhone"
    ).value = "";


    closeCheckout();


    goHome();

}



/* =========================================
   NAV
========================================= */

function setActiveNav(id) {

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    const element =
        document.getElementById(id);


    if (element) {

        element.classList.add(
            "active"
        );

    }

}



/* =========================================
   TOAST
========================================= */

let toastTimer = null;


function toast(message) {

    const element =
        document.getElementById(
            "toast"
        );


    element.textContent =
        message;


    element.style.display =
        "block";


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                element.style.display =
                    "none";

            },
            1800
        );

}



/* =========================================
   START
========================================= */

renderHome();

updateCartCount();

goHome();
