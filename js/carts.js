// se obtiene el carrito de productos desde localStorage
let cart = JSON.parse(localStorage.products_cart);

// elementos del DOM
const cartEmpty = document.querySelector("#cart-empty");
const containerProducts = document.querySelector("#container-products");
const containerElements = document.querySelector("#container-elements");
const totalPrice = document.querySelector("#total-price");
const totalItems = document.querySelector("#total-items");
let deleteProductButton = document.querySelectorAll(".delete-product");
const clearCart = document.querySelector("#clear-cart");
const buy = document.querySelector("#buy")

// funcion para mostrar los productos en el carrito
function showProductsCart() {
    containerProducts.innerHTML = "";

    if (cart && cart.length > 0) {
        cartEmpty.classList.remove("d-flex", "justify-content-center")
        cartEmpty.classList.add("none");
        containerProducts.classList.remove("none");
        containerElements.classList.remove("none");
        containerElements.classList.add("d-flex", "justify-content-around", "mt-4")

        cart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("card-container", "none", "d-flex", "align-items-center", "justify-content-between", "gap-5", "m-2");
            div.innerHTML = `
    <div>
    <img src="${product.image}" class="img-cart" alt="${product.title}">
</div>
<div class="d-flex flex-column ">
    <h3 class="title-elements">${product.title}</h3>
    <div class="d-flex gap-2">
        <p class="text-center align-middle text-elements">x${product.quantity}</p>
        <small class="text-center align-middle text-elements">$ ${product.price}</small>
    </div>
</div>
<div>
    <button class="delete-product" id="${product.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-trash text-danger" viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg></button>
</div>   `;

            containerProducts.append(div)
        });
    } else {
        cartEmpty.classList.remove("none");
        cartEmpty.classList.add("d-flex", "justify-content-center")
        containerProducts.classList.add("none");
        containerElements.classList.add("none");
        containerElements.classList.remove("d-flex", "justify-content-around", "m-4")
        totalItems.textContent = "0";
    }
    deleteButton();
    itemUplodad();
    priceUpload();
}
showProductsCart();

// se le asigna un eventlistener a los botones borrar
function deleteButton() {
    deleteProductButton = document.querySelectorAll(".delete-product");
    deleteProductButton.forEach(button => {
        button.addEventListener("click", deleteProduct);
    });
}

// funcion para eliminar productos del carrito
function deleteProduct(e) {
    const productId = e.currentTarget.id;
    const index = cart.findIndex(product => product.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('products_cart', JSON.stringify(cart));
        showProductsCart();
    }
}

// funcion para actualizar el contador de productos
function itemUplodad() {
    let itemCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    totalItems.textContent = `Total Items: ${itemCount}`;
}

// funcion para actualizar el precio total
function priceUpload() {
    let priceCount = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    totalPrice.textContent = `Total Price $ ${priceCount}`;
}

// se le asigna un eventlistener al boton para borrar el carrito
clearCart.addEventListener("click", cartDeleted);

// funcion para borrar el carrito
function cartDeleted() {
    cart = [];
    localStorage.setItem("products_cart", JSON.stringify(cart));
    showProductsCart();
}

// se le asigna un eventlistener al boton de comprar
buy.addEventListener("click", shoppingCart);

// funcion para comprar los productos
function shoppingCart() {
    cart.length = 0;
    localStorage.setItem("products_cart", JSON.stringify(cart));
    cartEmpty.classList.add("d-none");
    containerProducts.classList.add("d-none");
    containerElements.classList.add("d-none");

    Swal.fire({
        title: '¡Successful purchase!',
        text: 'Thank you very much for your purchase',
        icon: 'success',
        confirmButtonText: 'Accept'
    })
}