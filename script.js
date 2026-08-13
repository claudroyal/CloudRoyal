// ========================================
// TELEGRAM MINI APP
// ========================================

let tg = null;

if (
    window.Telegram &&
    window.Telegram.WebApp
) {

    tg = window.Telegram.WebApp;

    tg.ready();

    tg.expand();

}


// ========================================
// ТОВАРЫ
// ========================================

const products = [

    {
        id: 1,

        name: "Рідина Premium",

        price: 350,

        oldPrice: null,

        category: "liquid",

        categoryName: "Рідина",

        icon: "💧",

        isNew: true,

        isPopular: true,

        isSale: false
    },


    {
        id: 2,

        name: "Рідина Cloud",

        price: 320,

        oldPrice: 400,

        category: "liquid",

        categoryName: "Рідина",

        icon: "☁️",

        isNew: false,

        isPopular: true,

        isSale: true
    },


    {
        id: 3,

        name: "POD Royal",

        price: 1200,

        oldPrice: null,

        category: "pod",

        categoryName: "POD-Системи",

        icon: "⚡",

        isNew: true,

        isPopular: true,

        isSale: false
    },


    {
        id: 4,

        name: "POD Cloud",

        price: 1500,

        oldPrice: 1900,

        category: "pod",

        categoryName: "POD-Системи",

        icon: "👑",

        isNew: false,

        isPopular: true,

        isSale: true
    },


    {
        id: 5,

        name: "Картридж Royal",

        price: 300,

        oldPrice: null,

        category: "cartridges",

        categoryName: "Картриджі",

        icon: "🔋",

        isNew: true,

        isPopular: false,

        isSale: false
    },


    {
        id: 6,

        name: "Картридж Cloud",

        price: 250,

        oldPrice: 350,

        category: "cartridges",

        categoryName: "Картриджі",

        icon: "🔌",

        isNew: false,

        isPopular: true,

        isSale: true
    },


    {
        id: 7,

        name: "Рідина Royal Ice",

        price: 450,

        oldPrice: null,

        category: "liquid",

        categoryName: "Рідина",

        icon: "❄️",

        isNew: true,

        isPopular: false,

        isSale: false
    },


    {
        id: 8,

        name: "POD Premium",

        price: 1700,

        oldPrice: 2100,

        category: "pod",

        categoryName: "POD-Системи",

        icon: "💜",

        isNew: true,

        isPopular: true,

        isSale: true
    }

];


// ========================================
// КОРЗИНА
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalCart"
        )
    ) || [];


// ========================================
// ИЗБРАННОЕ
// ========================================

let favorites =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalFavorites"
        )
    ) || [];


// ========================================
// ЦЕНА
// ========================================

function formatPrice(price) {

    return (
        Number(price)
            .toLocaleString("uk-UA")
        + " ₴"
    );

}


// ========================================
// СКРЫТЬ ВСЕ СТРАНИЦЫ
// ========================================

function hideAllPages() {

    document.getElementById(
        "homePage"
    ).style.display = "none";


    document.getElementById(
        "catalogPage"
    ).style.display = "none";


    document.getElementById(
        "categoryPage"
    ).style.display = "none";


    document.getElementById(
        "favoritesPage"
    ).style.display = "none";

}


// ========================================
// ГЛАВНАЯ
// ========================================

function goHome() {

    hideAllPages();

    document.getElementById(
        "homePage"
    ).style.display = "block";

}


// ========================================
// КАТАЛОГ
// ========================================

function openCatalog() {

    hideAllPages();

    document.getElementById(
        "catalogPage"
    ).style.display = "block";

}


function closeCatalog() {

    goHome();

}


// ========================================
// КАТЕГОРИЯ
// ========================================

function openCategory(category) {

    const categoryPage =
        document.getElementById(
            "categoryPage"
        );


    const title =
        document.getElementById(
            "categoryTitle"
        );


    const container =
        document.getElementById(
            "categoryProducts"
        );


    let categoryName = "";

    let filtered = [];


    // РІДИНА

    if (category === "liquid") {

        categoryName = "Рідина";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "liquid"
            );

    }


    // POD

    else if (category === "pod") {

        categoryName =
            "POD-Системи";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "pod"
            );

    }


    // КАРТРИДЖІ

    else if (
        category === "cartridges"
    ) {

        categoryName =
            "Картриджі";

        filtered =
            products.filter(
                product =>
                    product.category ===
                    "cartridges"
            );

    }


    // НОВИНКИ

    else if (category === "new") {

        categoryName =
            "Новинки";

        filtered =
            products.filter(
                product =>
                    product.isNew === true
            );

    }


    // ПОПУЛЯРНЕ

    else if (
        category === "popular"
    ) {

        categoryName =
            "Популярне";

        filtered =
            products.filter(
                product =>
                    product.isPopular === true
            );

    }


    // ЗНИЖКИ

    else if (category === "sale") {

        categoryName =
            "Знижки";

        filtered =
            products.filter(
                product =>
                    product.isSale === true
            );

    }


    title.textContent =
        categoryName;


    renderProducts(
        filtered,
        container
    );


    hideAllPages();


    categoryPage.style.display =
        "block";

}


// ========================================
// НАЗАД ИЗ КАТЕГОРИИ
// ========================================

function closeCategory() {

    openCatalog();

}


// ========================================
// КАРТОЧКИ ТОВАРОВ
// ========================================

function renderProducts(
    list,
    container
) {

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                Товарів поки немає.

            </div>

        `;

        return;
    }


    list.forEach(product => {

        const favorite =
            favorites.includes(
                product.id
            );


        let badges = "";


        // НОВИНКА

        if (product.isNew) {

            badges += `

                <span class="badge new">
                    НОВИНКА
                </span>

            `;

        }


        // СКИДКА

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


        // СТАРАЯ ЦЕНА

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

            <div class="product">


                <button
                    class="favorite-button"
                    onclick="
                        toggleFavorite(
                            ${product.id}
                        )
                    "
                >
                    ${
                        favorite
                            ? "❤️"
                            : "♡"
                    }
                </button>


                <div class="product-visual">


                    ${product.icon}


                    <div class="product-badges">

                        ${badges}

                    </div>


                </div>


                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.categoryName}
                </p>


                <h2>

                    ${oldPrice}

                    ${formatPrice(
                        product.price
                    )}

                </h2>


                <button
                    onclick="
                        addToCart(
                            ${product.id}
                        )
                    "
                >
                    🛒 В кошик
                </button>


            </div>

        `;

    });

}


// ========================================
// ДОБАВИТЬ В КОРЗИНУ
// ========================================

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

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();


    if (
        tg &&
        tg.HapticFeedback
    ) {

        tg.HapticFeedback
            .impactOccurred(
                "light"
            );

    }


    showToast(
        "Товар додано до кошика"
    );

}


// ========================================
// СОХРАНЕНИЕ КОРЗИНЫ
// ========================================

function saveCart() {

    localStorage.setItem(
        "cloudRoyalCart",
        JSON.stringify(cart)
    );

}


// ========================================
// СОХРАНЕНИЕ ИЗБРАННОГО
// ========================================

function saveFavorites() {

    localStorage.setItem(
        "cloudRoyalFavorites",
        JSON.stringify(favorites)
    );

}


// ========================================
// ИЗБРАННОЕ
// ========================================

function toggleFavorite(id) {

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                item =>
                    item !== id
            );

    }

    else {

        favorites.push(id);

    }


    saveFavorites();


    renderHome();


    const categoryPage =
        document.getElementById(
            "categoryPage"
        );


    if (
        categoryPage.style.display ===
        "block"
    ) {

        const title =
            document.getElementById(
                "categoryTitle"
            ).textContent;


        const map = {

            "Рідина": "liquid",

            "POD-Системи": "pod",

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


    if (
        document.getElementById(
            "favoritesPage"
        ).style.display ===
        "block"
    ) {

        showFavorites();

    }

}


// ========================================
// ИЗБРАННОЕ
// ========================================

function showFavorites() {

    hideAllPages();


    const page =
        document.getElementById(
            "favoritesPage"
        );


    const container =
        document.getElementById(
            "favoriteProducts"
        );


    const favoriteProducts =
        products.filter(
            product =>
                favorites.includes(
                    product.id
                )
        );


    renderProducts(
        favoriteProducts,
        container
    );


    page.style.display =
        "block";

}


// ========================================
// КОРЗИНА
// ========================================

function showCart() {

    document.getElementById(
        "cartWindow"
    ).style.display = "flex";


    renderCart();

}


function closeCart() {

    document.getElementById(
        "cartWindow"
    ).style.display = "none";

}


// ========================================
// ОТРИСОВКА КОРЗИНЫ
// ========================================

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                🛒<br><br>

                Кошик порожній

            </div>

        `;


        totalElement.textContent =
            "Разом: 0 ₴";


        return;

    }


    let total = 0;


    cart.forEach(
        (item, index) => {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;


            container.innerHTML += `

                <div class="cart-item">

                    <h3>
                        ${item.icon}
                        ${item.name}
                    </h3>


                    <p>
                        ${formatPrice(
                            item.price
                        )}
                        / шт.
                    </p>


                    <div class="quantity">

                        <button
                            onclick="
                                decreaseQuantity(
                                    ${index}
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
                                increaseQuantity(
                                    ${index}
                                )
                            "
                        >
                            +
                        </button>

                    </div>


                    <p>
                        Сума:
                        ${formatPrice(
                            itemTotal
                        )}
                    </p>

                </div>

            `;

        }
    );


    totalElement.textContent =
        "Разом: " +
        formatPrice(total);

}


// ========================================
// + КОЛИЧЕСТВО
// ========================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity++;


    saveCart();

    renderCart();

}


// ========================================
// - КОЛИЧЕСТВО
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity--;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();

}


// ========================================
// ОФОРМЛЕНИЕ
// ========================================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Кошик порожній."
        );

        return;

    }


    closeCart();


    document.getElementById(
        "checkoutWindow"
    ).style.display = "flex";

}


function closeCheckout() {

    document.getElementById(
        "checkoutWindow"
    ).style.display = "none";

}


// ========================================
// ЗАКАЗ
// ========================================

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

        alert(
            "Введіть ваше ім'я."
        );

        return;

    }


    if (!phone) {

        alert(
            "Введіть номер телефону."
        );

        return;

    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    const orderText =

        "Нове замовлення\n\n" +

        "Ім'я: " +
        name +
        "\n" +

        "Телефон: " +
        phone +
        "\n\n" +

        "Сума: " +
        formatPrice(total);


    console.log(
        orderText
    );


    alert(

        "Дякуємо, " +
        name +
        "!\n\n" +

        "Замовлення прийнято.\n" +

        "Сума: " +
        formatPrice(total)

    );


    cart = [];


    saveCart();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerPhone"
    ).value = "";


    closeCheckout();

}


// ========================================
// ГЛАВНАЯ СТРАНИЦА
// ========================================

function renderHome() {

    const popular =
        products.filter(
            product =>
                product.isPopular === true
        );


    const sale =
        products.filter(
            product =>
                product.isSale === true
        );


    renderProducts(

        popular.slice(0, 4),

        document.getElementById(
            "homeProducts"
        )

    );


    renderProducts(

        sale.slice(0, 4),

        document.getElementById(
            "homeSaleProducts"
        )

    );

}


// ========================================
// УВЕДОМЛЕНИЕ
// ========================================

function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id = "toast";


        toast.style.position =
            "fixed";

        toast.style.left =
            "50%";

        toast.style.bottom =
            "90px";

        toast.style.transform =
            "translateX(-50%)";

        toast.style.zIndex =
            "5000";

        toast.style.padding =
            "11px 16px";

        toast.style.borderRadius =
            "10px";

        toast.style.background =
            "#2a2431";

        toast.style.border =
            "1px solid #583c70";

        toast.style.color =
            "#ffffff";

        toast.style.fontSize =
            "13px";

        toast.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.4)";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.display =
        "block";


    clearTimeout(
        window.cloudRoyalToast
    );


    window.cloudRoyalToast =
        setTimeout(
            () => {

                toast.style.display =
                    "none";

            },
            1800
        );

}


// ========================================
// ЗАПУСК
// ========================================

renderHome();

goHome();
