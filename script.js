// =========================
// TELEGRAM MINI APP
// =========================

let tg = null;

if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

    if (tg.setHeaderColor) {
        tg.setHeaderColor("#08080d");
    }

    if (tg.setBackgroundColor) {
        tg.setBackgroundColor("#08080d");
    }

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        console.log(
            "Пользователь Telegram:",
            tg.initDataUnsafe.user.first_name
        );
    }
}


// =========================
// ТОВАРЫ
// =========================

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


// =========================
// КОРЗИНА
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("cloudRoyalCart")
    ) || [];


// =========================
// ИЗБРАННОЕ
// =========================

let favorites =
    JSON.parse(
        localStorage.getItem("cloudRoyalFavorites")
    ) || [];


// =========================
// ЭЛЕМЕНТЫ
// =========================

const container =
    document.getElementById("products");

const search =
    document.getElementById("search");


// =========================
// СОХРАНЕНИЕ
// =========================

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


// =========================
// ПОКАЗ ТОВАРОВ
// =========================

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
                    Попробуйте изменить поиск
                    или категорию.
                </p>

            </div>

        `;

        return;
    }


    list.forEach((product, index) => {

        const isFavorite =
            favorites.some(
                item =>
                    item.name === product.name
            );


        container.innerHTML += `

            <div
                class="product"
                style="animation-delay:${index * 40}ms"
            >

                <button
                    class="favorite-button"
                    onclick="toggleFavorite('${product.name}')"
                >
                    ${isFavorite ? "❤️" : "♡"}
                </button>


                <div class="product-visual">

                    ${product.icon}

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
                    onclick="addToCart('${product.name}')"
                >
                    В корзину
                </button>

            </div>

        `;

    });

}


// =========================
// ПЕРВОНАЧАЛЬНЫЙ ПОКАЗ
// =========================

showProducts(products);


// =========================
// ПОИСК
// =========================

if (search) {

    search.addEventListener(
        "input",
        () => {

            const value =
                search.value
                    .toLowerCase()
                    .trim();


            const filtered =
                products.filter(
                    product =>
                        product.name
                            .toLowerCase()
                            .includes(value)
                );


            showProducts(filtered);

        }
    );

}


// =========================
// КАТЕГОРИИ
// =========================

const categoryButtons =
    document.querySelectorAll(
        ".categories button"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const category =
                button.textContent.trim();


            if (search) {
                search.value = "";
            }


            if (category === "Все") {

                showProducts(products);

                return;
            }


            const filtered =
                products.filter(
                    product =>
                        product.category ===
                        category
                );


            showProducts(filtered);

        }
    );

});


// =========================
// ИЗБРАННОЕ
// =========================

function toggleFavorite(name) {

    const product =
        products.find(
            item =>
                item.name === name
        );


    if (!product) {
        return;
    }


    const exists =
        favorites.some(
            item =>
                item.name === name
        );


    if (exists) {

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


// =========================
// ПОКАЗАТЬ ИЗБРАННОЕ
// =========================

function showFavorites() {

    if (search) {
        search.value = "";
    }


    if (favorites.length === 0) {

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


    showProducts(favorites);

}


// =========================
// ДОБАВИТЬ В КОРЗИНУ
// =========================

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


    // Вибрация Telegram

    if (tg && tg.HapticFeedback) {

        tg.HapticFeedback
            .impactOccurred("light");

    }


    alert(
        product.name +
        " добавлен в корзину"
    );

}


// =========================
// ОТКРЫТЬ КОРЗИНУ
// =========================

function showCart() {

    const box =
        document.getElementById(
            "cartWindow"
        );


    if (!box) {
        return;
    }


    box.style.display = "block";


    renderCart();

}


// =========================
// ОТРИСОВКА КОРЗИНЫ
// =========================

function renderCart() {

    const items =
        document.getElementById(
            "cartItems"
        );


    const total =
        document.getElementById(
            "cartTotal"
        );


    if (!items || !total) {
        return;
    }


    items.innerHTML = "";


    let sum = 0;


    if (cart.length === 0) {

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
        (item, index) => {

            const price =
                Number(
                    item.price.replace(
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
                        ${item.icon || "🛍️"}
                        ${item.name}
                    </h3>


                    <p>
                        Цена:
                        ${item.price}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})"
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


// =========================
// + КОЛИЧЕСТВО
// =========================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) + 1;


    saveCart();


    renderCart();

}


// =========================
// − КОЛИЧЕСТВО
// =========================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (cart[index].quantity || 1) - 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();


    renderCart();

}


// =========================
// ЗАКРЫТЬ КОРЗИНУ
// =========================

function closeCart() {

    const box =
        document.getElementById(
            "cartWindow"
        );


    if (!box) {
        return;
    }


    box.style.display = "none";

}


// =========================
// ОТКРЫТЬ КАТАЛОГ
// =========================

function scrollToProducts() {

    const productsBlock =
        document.getElementById(
            "products"
        );


    if (!productsBlock) {
        return;
    }


    productsBlock.scrollIntoView({

        behavior: "smooth"

    });

}


// =========================
// ГЛАВНАЯ
// =========================

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


// =========================
// ПРОФИЛЬ
// =========================

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
            "Профиль CloudRoyal скоро будет доступен."
        );

    }

}


// =========================
// ОФОРМЛЕНИЕ ЗАКАЗА
// =========================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Сначала добавьте товар в корзину."
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


// =========================
// ЗАКРЫТЬ ОФОРМЛЕНИЕ
// =========================

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


// =========================
// ПОДТВЕРДИТЬ ЗАКАЗ
// =========================

function submitOrder() {

    const nameElement =
        document.getElementById(
            "customerName"
        );


    const phoneElement =
        document.getElementById(
            "customerPhone"
        );


    if (!nameElement || !phoneElement) {

        alert(
            "Форма заказа не найдена."
        );

        return;
    }


    const name =
        nameElement.value.trim();


    const phone =
        phoneElement.value.trim();


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


    let sum = 0;


    cart.forEach(item => {

        const price =
            Number(
                item.price.replace(
                    /\D/g,
                    ""
                )
            );


        const quantity =
            item.quantity || 1;


        sum +=
            price * quantity;

    });


    const order = {

        customerName:
            name,

        phone:
            phone,

        items:
            cart,

        total:
            sum,

        date:
            new Date().toLocaleString(
                "ru-RU"
            )

    };


    console.log(
        "Заказ CloudRoyal:",
        order
    );


    alert(

        "Спасибо, " +
        name +
        "!\n\n" +

        "Заказ на сумму " +
        sum +
        " ₽ принят."

    );


    cart = [];


    saveCart();


    nameElement.value = "";

    phoneElement.value = "";


    closeCheckout();

}
