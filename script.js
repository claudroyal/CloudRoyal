// =========================
// TELEGRAM MINI APP
// =========================

const tg = window.Telegram.WebApp;


// Сообщаем Telegram,
// что приложение готово

tg.ready();


// Разворачиваем приложение

tg.expand();


// Цвета Telegram Mini App

tg.setHeaderColor("#08080d");

tg.setBackgroundColor("#08080d");


// =========================
// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ TELEGRAM
// =========================

if (tg.initDataUnsafe.user) {

    const user =
        tg.initDataUnsafe.user;

    console.log(
        "Пользователь Telegram:",
        user.first_name
    );

}


// =========================
// ТОВАРЫ
// =========================

const products = [

    {
        name: "Cloud Device",
        price: "2990 ₽",
        category: "Новинки"
    },

    {
        name: "Royal Edition",
        price: "4990 ₽",
        category: "Популярное"
    },

    {
        name: "Cloud Pro",
        price: "3590 ₽",
        category: "Акции"
    },

    {
        name: "Cloud Premium",
        price: "5990 ₽",
        category: "Популярное"
    }

];


// =========================
// ЗАГРУЗКА КОРЗИНЫ
// =========================

let cart =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalCart"
        )
    ) || [];


// =========================
// ЗАГРУЗКА ИЗБРАННОГО
// =========================

let favorites =
    JSON.parse(
        localStorage.getItem(
            "cloudRoyalFavorites"
        )
    ) || [];


// =========================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// =========================

const container =
    document.getElementById(
        "products"
    );


const search =
    document.getElementById(
        "search"
    );


// =========================
// СОХРАНЕНИЕ КОРЗИНЫ
// =========================

function saveCart() {

    localStorage.setItem(
        "cloudRoyalCart",
        JSON.stringify(cart)
    );

}


// =========================
// СОХРАНЕНИЕ ИЗБРАННОГО
// =========================

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

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    Ничего не найдено
                </h3>

                <p>
                    Попробуйте выбрать
                    другую категорию
                </p>

            </div>

        `;

        return;
    }


    list.forEach(product => {

        const isFavorite =
            favorites.some(
                item =>
                    item.name === product.name
            );


        container.innerHTML += `

            <div class="product">

                <button
                    class="favorite-button"
                    onclick="toggleFavorite('${product.name}')"
                >
                    ${isFavorite ? "❤️" : "♡"}
                </button>


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
                    Добавить в корзину
                </button>

            </div>

        `;

    });

}


// =========================
// ПОКАЗ ТОВАРОВ ПРИ ЗАПУСКЕ
// =========================

showProducts(products);


// =========================
// ПОИСК
// =========================

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


// =========================
// КАТЕГОРИИ
// =========================

const categoryButtons =
    document.querySelectorAll(
        ".categories button"
    );


categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.textContent.trim();


                search.value = "";


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

    }
);


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


    const existingFavorite =
        favorites.find(
            item =>
                item.name === name
        );


    if (existingFavorite) {

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

    search.value = "";


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


    const existingItem =
        cart.find(
            item =>
                item.name === name
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();


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


    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    items.innerHTML = "";


    let sum = 0;


    // ПУСТАЯ КОРЗИНА

    if (cart.length === 0) {

        items.innerHTML = `

            <p>
                Корзина пока пустая
            </p>

        `;


        total.innerHTML =
            "Итого: 0 ₽";


        checkoutButton.style.display =
            "none";


        return;
    }


    checkoutButton.style.display =
        "block";


    // ТОВАРЫ В КОРЗИНЕ

    cart.forEach(
        (item, index) => {

            const price =
                Number(
                    item.price.replace(
                        /\D/g,
                        ""
                    )
                );


            const itemTotal =
                price * item.quantity;


            sum += itemTotal;


            items.innerHTML += `

                <div class="cart-item">

                    <h3>
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
                            ${item.quantity}
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
// УВЕЛИЧИТЬ КОЛИЧЕСТВО
// =========================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    saveCart();


    renderCart();

}


// =========================
// УМЕНЬШИТЬ КОЛИЧЕСТВО
// =========================

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


// =========================
// ЗАКРЫТЬ КОРЗИНУ
// =========================

function closeCart() {

    document.getElementById(
        "cartWindow"
    ).style.display = "none";

}


// =========================
// ОТКРЫТЬ ОФОРМЛЕНИЕ
// =========================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Сначала добавьте товар в корзину"
        );

        return;
    }


    document.getElementById(
        "cartWindow"
    ).style.display = "none";


    document.getElementById(
        "checkoutWindow"
    ).style.display = "block";

}


// =========================
// ЗАКРЫТЬ ОФОРМЛЕНИЕ
// =========================

function closeCheckout() {

    document.getElementById(
        "checkoutWindow"
    ).style.display = "none";

}


// =========================
// ПОДТВЕРДИТЬ ЗАКАЗ
// =========================

function submitOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    if (name === "") {

        alert(
            "Введите ваше имя"
        );

        return;
    }


    if (phone === "") {

        alert(
            "Введите номер телефона"
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


        sum +=
            price * item.quantity;

    });


    // =========================
    // ДАННЫЕ ЗАКАЗА
    // =========================

    const order = {

        name: name,

        phone: phone,

        items: cart,

        total: sum,

        date:
            new Date().toLocaleString(
                "ru-RU"
            )

    };


    console.log(
        "Новый заказ:",
        order
    );


    // =========================
    // ПОКА ПРОСТО ПОКАЗЫВАЕМ
    // СООБЩЕНИЕ
    // =========================

    alert(
        "Спасибо, " +
        name +
        "!\n\n" +
        "Заказ на сумму " +
        sum +
        " ₽ принят."
    );


    // =========================
    // ОЧИЩАЕМ КОРЗИНУ
    // =========================

    cart = [];


    saveCart();


    // =========================
    // ОЧИЩАЕМ ФОРМУ
    // =========================

    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerPhone"
    ).value = "";


    closeCheckout();

}


// =========================
// ОТКРЫТЬ КАТАЛОГ
// =========================

function scrollToProducts() {

    const productsBlock =
        document.getElementById(
            "products"
        );


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


    search.value = "";


    showProducts(products);

}


// =========================
// ПРОФИЛЬ
// =========================

function showProfile() {

    alert(
        "Профиль CloudRoyal скоро будет доступен."
    );

}