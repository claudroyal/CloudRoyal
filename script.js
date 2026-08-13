// =====================================================
// CLOUDROYAL — TELEGRAM MINI APP
// САЙТ → GOOGLE SHEETS → TELEGRAM
// =====================================================


// =====================================================
// TELEGRAM
// =====================================================

let tg = null;

if (
    window.Telegram &&
    window.Telegram.WebApp
) {

    tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

    if (tg.setHeaderColor) {
        tg.setHeaderColor("#08080d");
    }

    if (tg.setBackgroundColor) {
        tg.setBackgroundColor("#08080d");
    }

    if (
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        console.log(
            "Пользователь Telegram:",
            tg.initDataUnsafe.user.first_name
        );

    }

}


// =====================================================
// GOOGLE APPS SCRIPT
// =====================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzdPzlm5ombh8jDmfM7FtRXdR1YpMo4qudhGsY3NyHs0v5OcRlRbasSJljCxFwuI_xP/exec";


// =====================================================
// ТОВАРЫ
// =====================================================

const products = [

    {
        name: "Cloud Device",
        price: "2990 ₽",
        category: "Новинки",
        icon: "☁️"
    },

    {
        name: "Royal Edition",
        price: "4990 ₽",
        category: "Популярное",
        icon: "👑"
    },

    {
        name: "Cloud Pro",
        price: "3590 ₽",
        category: "Акции",
        icon: "⚡"
    },

    {
        name: "Cloud Premium",
        price: "5990 ₽",
        category: "Популярное",
        icon: "💎"
    }

];


// =====================================================
// CART / FAVORITES
// =====================================================

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


// =====================================================
// DOM
// =====================================================

const container =
    document.getElementById(
        "products"
    );

const search =
    document.getElementById(
        "search"
    );


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "cloudRoyalCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// SAVE FAVORITES
// =====================================================

function saveFavorites() {

    localStorage.setItem(
        "cloudRoyalFavorites",
        JSON.stringify(favorites)
    );

}


// =====================================================
// SHOW PRODUCTS
// =====================================================

function showProducts(list) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    Товары не найдены
                </h3>

                <p>
                    Попробуйте изменить
                    поиск или категорию.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(
        (
            product,
            index
        ) => {

            const isFavorite =
                favorites.some(
                    item =>
                        item.name ===
                        product.name
                );


            container.innerHTML += `

                <div
                    class="product"
                    style="
                        animation-delay:
                        ${index * 40}ms
                    "
                >

                    <button
                        class="favorite-button"
                        onclick="
                            toggleFavorite(
                                '${product.name}'
                            )
                        "
                    >
                        ${
                            isFavorite
                                ? "❤️"
                                : "♡"
                        }
                    </button>


                    <div class="product-visual">

                        ${
                            product.icon
                            || "🛍️"
                        }

                    </div>


                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        ${product.category}
                    </p>


                    <h2>
                        ${product.price}
                    </h2>


                    <button
                        onclick="
                            addToCart(
                                '${product.name}'
                            )
                        "
                    >
                        В корзину
                    </button>

                </div>

            `;

        }
    );

}


// =====================================================
// INITIAL PRODUCTS
// =====================================================

showProducts(products);


// =====================================================
// SEARCH
// =====================================================

if (search) {

    search.addEventListener(
        "input",
        () => {

            const value =
                search.value
                    .toLowerCase()
                    .trim();


            showProducts(

                products.filter(
                    product =>

                        product.name
                            .toLowerCase()
                            .includes(value)

                )

            );

        }
    );

}


// =====================================================
// CATEGORIES
// =====================================================

document
    .querySelectorAll(
        ".categories button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const category =
                        button.textContent.trim();


                    if (search) {
                        search.value = "";
                    }


                    if (
                        category ===
                        "Все"
                    ) {

                        showProducts(
                            products
                        );

                    } else {

                        showProducts(

                            products.filter(
                                product =>
                                    product.category ===
                                    category
                            )

                        );

                    }

                }
            );

        }
    );


// =====================================================
// FAVORITES
// =====================================================

function toggleFavorite(name) {

    const product =
        products.find(
            item =>
                item.name === name
        );


    if (!product) {
        return;
    }


    if (
        favorites.some(
            item =>
                item.name === name
        )
    ) {

        favorites =
            favorites.filter(
                item =>
                    item.name !== name
            );

    } else {

        favorites.push(product);

    }


    saveFavorites();

    showProducts(products);

}


// =====================================================
// SHOW FAVORITES
// =====================================================

function showFavorites() {

    if (search) {
        search.value = "";
    }


    if (
        favorites.length === 0
    ) {

        if (!container) {
            return;
        }


        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    ❤️ Избранное пустое
                </h3>

                <p>
                    Нажмите ♡ на товаре,
                    чтобы добавить его сюда.
                </p>

            </div>

        `;

        return;

    }


    showProducts(
        favorites
    );

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(name) {

    const product =
        products.find(
            item =>
                item.name === name
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                item.name === name
        );


    if (existing) {

        existing.quantity++;

    } else {

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

        try {

            tg.HapticFeedback
                .impactOccurred(
                    "light"
                );

        } catch (error) {}

    }


    alert(
        product.name +
        " добавлен в корзину"
    );

}


// =====================================================
// SHOW CART
// =====================================================

function showCart() {

    const box =
        document.getElementById(
            "cartWindow"
        );


    if (!box) {
        return;
    }


    box.style.display =
        "block";


    renderCart();

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    const items =
        document.getElementById(
            "cartItems"
        );


    const total =
        document.getElementById(
            "cartTotal"
        );


    if (
        !items ||
        !total
    ) {
        return;
    }


    items.innerHTML = "";


    let sum = 0;


    if (
        cart.length === 0
    ) {

        items.innerHTML = `

            <p
                style="
                    text-align:center;
                    color:#aaa5bd;
                "
            >
                Корзина пока пустая.
            </p>

        `;


        total.innerHTML =
            "Итого: 0 ₽";


        return;

    }


    cart.forEach(
        (
            item,
            index
        ) => {

            const price =
                Number(
                    String(
                        item.price
                    )
                    .replace(
                        /\D/g,
                        ""
                    )
                );


            const quantity =
                item.quantity || 1;


            const itemTotal =
                price * quantity;


            sum += itemTotal;


            items.innerHTML += `

                <div class="cart-item">

                    <h3>

                        ${
                            item.icon ||
                            "🛍️"
                        }

                        ${item.name}

                    </h3>


                    <p>
                        Цена:
                        ${item.price}
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
                            ${quantity}
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
                        Сумма:
                        ${itemTotal} ₽
                    </p>

                </div>

            `;

        }
    );


    total.innerHTML =
        "Итого: " +
        sum +
        " ₽";

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) +
        1;


    saveCart();

    renderCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) -
        1;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    renderCart();

}


// =====================================================
// CLOSE CART
// =====================================================

function closeCart() {

    const box =
        document.getElementById(
            "cartWindow"
        );


    if (box) {

        box.style.display =
            "none";

    }

}


// =====================================================
// SCROLL TO PRODUCTS
// =====================================================

function scrollToProducts() {

    const productsBlock =
        document.getElementById(
            "products"
        );


    if (productsBlock) {

        productsBlock.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// HOME
// =====================================================

function goHome() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    if (search) {
        search.value = "";
    }


    showProducts(products);

}


// =====================================================
// PROFILE
// =====================================================

function showProfile() {

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const user =
            tg.initDataUnsafe.user;


        alert(

            "👤 " +
            (
                user.first_name ||
                "Пользователь"
            ) +
            "\n\n" +
            "CloudRoyal"

        );

    } else {

        alert(
            "Профиль CloudRoyal " +
            "скоро будет доступен."
        );

    }

}


// =====================================================
// OPEN CHECKOUT
// =====================================================

function openCheckout() {

    if (
        cart.length === 0
    ) {

        alert(
            "Сначала добавьте товар " +
            "в корзину."
        );

        return;

    }


    const cartWindow =
        document.getElementById(
            "cartWindow"
        );


    const checkoutWindow =
        document.getElementById(
            "checkoutWindow"
        );


    if (cartWindow) {

        cartWindow.style.display =
            "none";

    }


    if (checkoutWindow) {

        checkoutWindow.style.display =
            "block";

    }

}


// =====================================================
// CLOSE CHECKOUT
// =====================================================

function closeCheckout() {

    const checkoutWindow =
        document.getElementById(
            "checkoutWindow"
        );


    if (checkoutWindow) {

        checkoutWindow.style.display =
            "none";

    }

}


// =====================================================
// GET CART TOTAL
// =====================================================

function getCartTotal() {

    let sum = 0;


    cart.forEach(
        item => {

            const price =
                Number(
                    String(
                        item.price
                    )
                    .replace(
                        /\D/g,
                        ""
                    )
                );


            const quantity =
                item.quantity || 1;


            sum +=
                price *
                quantity;

        }
    );


    return sum;

}


// =====================================================
// SUBMIT ORDER
// =====================================================

async function submitOrder() {

    const nameElement =
        document.getElementById(
            "customerName"
        );


    const phoneElement =
        document.getElementById(
            "customerPhone"
        );


    /*
     * Комментарий необязательный.
     * Если поля в HTML пока нет —
     * всё равно всё будет работать.
     */

    const commentElement =
        document.getElementById(
            "customerComment"
        );


    if (
        !nameElement ||
        !phoneElement
    ) {

        alert(
            "Форма заказа не найдена."
        );

        return;

    }


    const name =
        nameElement.value.trim();


    const phone =
        phoneElement.value.trim();


    const comment =
        commentElement
            ? commentElement.value.trim()
            : "";


    // -----------------------------
    // ПРОВЕРКА ИМЕНИ
    // -----------------------------

    if (!name) {

        alert(
            "Введите ваше имя."
        );

        nameElement.focus();

        return;

    }


    // -----------------------------
    // ПРОВЕРКА ТЕЛЕФОНА
    // -----------------------------

    if (!phone) {

        alert(
            "Введите номер телефона."
        );

        phoneElement.focus();

        return;

    }


    // -----------------------------
    // ПРОВЕРКА КОРЗИНЫ
    // -----------------------------

    if (
        cart.length === 0
    ) {

        alert(
            "Корзина пустая."
        );

        return;

    }


    // -----------------------------
    // СУММА
    // -----------------------------

    const sum =
        getCartTotal();


    // -----------------------------
    // ДАННЫЕ ЗАКАЗА
    // -----------------------------

    const order = {

        name:
            name,

        phone:
            phone,

        comment:
            comment,

        items:
            cart.map(
                item => ({

                    name:
                        item.name,

                    price:
                        item.price,

                    category:
                        item.category,

                    quantity:
                        item.quantity || 1

                })
            ),

        total:
            sum,

        createdAt:
            new Date().toISOString()

    };


    console.log(
        "CLOUDROYAL ORDER:",
        order
    );


    // -----------------------------
    // ПОКАЗЫВАЕМ ОТПРАВКУ
    // -----------------------------

    const buttons =
        document.querySelectorAll(
            "#checkoutWindow button"
        );


    let submitButton = null;


    buttons.forEach(
        button => {

            const text =
                button.textContent
                    .toLowerCase()
                    .trim();


            if (
                text.includes(
                    "підтверд"
                ) ||
                text.includes(
                    "подтверд"
                ) ||
                text.includes(
                    "замов"
                ) ||
                text.includes(
                    "заказ"
                )
            ) {

                submitButton =
                    button;

            }

        }
    );


    let originalButtonText =
        "";


    if (submitButton) {

        originalButtonText =
            submitButton.textContent;

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Відправляємо...";

    }


    // -----------------------------
    // ОТПРАВКА В GOOGLE APPS SCRIPT
    // -----------------------------

    try {

        /*
         * ВАЖНО:
         *
         * Используем text/plain.
         *
         * Это позволяет отправить JSON
         * в Google Apps Script без
         * предварительного CORS-запроса.
         *
         * mode: no-cors нужен потому,
         * что Google Apps Script может
         * отдавать ответ через redirect.
         */

        await fetch(
            GOOGLE_SCRIPT_URL,
            {

                method:
                    "POST",

                mode:
                    "no-cors",

                headers: {

                    "Content-Type":
                        "text/plain;charset=utf-8"

                },

                body:
                    JSON.stringify(
                        order
                    )

            }
        );


        console.log(
            "Заказ отправлен в Google Apps Script."
        );


        // -----------------------------
        // HAPTIC TELEGRAM
        // -----------------------------

        if (
            tg &&
            tg.HapticFeedback
        ) {

            try {

                tg.HapticFeedback
                    .notificationOccurred(
                        "success"
                    );

            } catch (error) {

                console.warn(
                    "Telegram Haptic Error:",
                    error
                );

            }

        }


        // -----------------------------
        // УСПЕХ
        // -----------------------------

        alert(

            "Дякуємо, " +
            name +
            "!\n\n" +

            "Замовлення прийнято.\n" +

            "Сума: " +
            sum +
            " ₽\n\n" +

            "Ми зв'яжемося з тобою " +
            "для підтвердження."

        );


        // -----------------------------
        // ОЧИСТКА КОРЗИНЫ
        // -----------------------------

        cart = [];


        saveCart();


        // -----------------------------
        // ОЧИСТКА ФОРМЫ
        // -----------------------------

        nameElement.value = "";

        phoneElement.value = "";


        if (commentElement) {

            commentElement.value =
                "";

        }


        // -----------------------------
        // ЗАКРЫВАЕМ CHECKOUT
        // -----------------------------

        closeCheckout();


    } catch (error) {

        console.error(
            "CLOUDROYAL ORDER ERROR:",
            error
        );


        alert(

            "Не вдалося відправити " +
            "замовлення.\n\n" +

            "Спробуй ще раз."

        );

    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                originalButtonText ||
                "Підтвердити";

        }

    }

}
