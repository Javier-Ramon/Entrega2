
let cartProducts = [];
let cart;

// elementos del DOM
const containerProducts = document.querySelector("#container-products");
const chosenButton = document.querySelectorAll(".btn-nav");
let buttonsAdd = document.querySelectorAll(".btn-add");
const numCart = document.querySelector("#num-cart");


fetch("../productos.json")
    .then(response => response.json())
    .then(data => {
        cartProducts = data;
        showProducts(cartProducts);
    })


function showProducts(chooseProduct) {
    containerProducts.innerHTML = "";
    chooseProduct.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("col-md-4", "col-lg-3")
        div.innerHTML = ` 
        <div class="card">
                        <img src="${product.image}" class="card-img-top card-img" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$ ${product.price}</p>
                            <div class="buttons-container">
                                <div class="btn-container">
                                    <button id="${product.id}" class="btn buttons-container--button btn-add btn-color btn-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                            class="bi bi-cart-fill icon-cart" viewBox="0 0 16 16">
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        containerProducts.append(div);
    });
    buttonAdd();
}
showProducts(cartProducts);

chosenButton.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.currentTarget.id !== "all") {
            const buttonCategory = cartProducts.filter(product => product.category.id === e.currentTarget.id);
            showProducts(buttonCategory);
        } else {
            showProducts(cartProducts);
        }
    })
});


function buttonAdd() {
    buttonsAdd = document.querySelectorAll(".btn-add");

    buttonsAdd.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}


const cartUpload = JSON.parse(localStorage.getItem("products_cart")) || [];
if (cartUpload) {
    cart = cartUpload;
    numUpload();
} else {
    cart = [];
}


function addToCart(e) {
    const buttonId = e.currentTarget.id;
    const productSelected = cart.find(product => product.id === buttonId);
    if (productSelected) {
        productSelected.quantity = (productSelected.quantity || 0) + 1;
    } else {
        const newProduct = {
            ...cartProducts.find(product => product.id === buttonId),
            quantity: 1
        };
        cart.push(newProduct);
    }
    numUpload();
    localStorage.products_cart = JSON.stringify(cart);

    // animacion con GSAP
    const cartIcon = document.querySelector("#num-cart");
    gsap.fromTo(cartIcon, { scale: 1 }, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1 });
}


function numUpload() {
    let newNumCart = cart.reduce((acc, product) => acc + product.quantity, 0);
    numCart.innerText = newNumCart;
}