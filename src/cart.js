let label = document.querySelector("#label");
let ShoppingCart = document.querySelector("#shoppingCart");

let basket = JSON.parse(localStorage.getItem("data")) || []; 

let updateCart = () => {
    let cartIcon = document.querySelector("#cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
updateCart();

let generateCartItems = () => {
    if(basket.length !== 0){    
        return (ShoppingCart.innerHTML = basket.map((x) => {
            // console.log(x);
            let {id , item} = x;
            let search = shopItem.find((y) => y.id === id) || [];
            let {img, name, price} = search
            return `
            <div class = "cart-item">
                <img class="imgCart" src="${img}" alt="" />
                <div class="detailsForCart">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price} </p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div id="cart-plus-minus" class="buttons">
                    <i onclick = "decrementItem(${id})" class="bi bi-dash-lg"></i>
                    <div id = "${id}" class="Quantity">
                    ${item}
                    </div>
                    <i onclick = "incrementItem(${id})" class="bi bi-plus-lg"></i>
                </div>
                <h3 id="totalPrice">$ ${item * search.price}</h3>
            </div>
                </div>
            </div>
            `;
        }).join(""));
    }else{
            ShoppingCart.innerHTML = ``;
            label.innerHTML = `
            <h2>Cart is Empty.</h2>
            <a href = "index.html">
            <button class = "homePage">Back to Home</button>
            </a>
            `;
    }
};
generateCartItems();

let incrementItem = (id) => {
    let selectedItem = id;
    let search = basket.find( (x) => x.id === selectedItem.id );
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item : 1,
        });
    }else {
        search.item += 1;
    }
    generateCartItems();
    updateItem(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrementItem = (id) => {
    let selectedItem = id;
    let search = basket.find( (x) => x.id === selectedItem.id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    updateItem(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let updateItem = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    updateCart();
    totalBill();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalBill();
    updateCart();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalBill = () => {
    if(basket !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = shopItem.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x , y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : $${amount}</h2>
        <a href="checkOut.html"><button class="checkOut">Checkout</button></a>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }else return;
};
totalBill();

let clearCart = () => {
    basket = [];
    generateCartItems();
    updateCart();
    localStorage.setItem("data", JSON.stringify(basket));
};