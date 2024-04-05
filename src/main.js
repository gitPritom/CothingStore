let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || []; 

let generateShopItem = () => {
    return (shop.innerHTML = shopItem.map((x) => {
        let {id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        // console.log(search.item);
        return `
        <div id = "product-id-${id}" class="item">
        <img src="${img}" alt="Shirt image">
        <div class="details"> 
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="PriceQuantity">
                    <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick = "decrementItem(${id})" class="bi bi-dash-lg"></i>
                    <div id = "${id}" class="Quantity">
                        ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick = "incrementItem(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
            </div>
    </div>`
    }).join(""));
};
generateShopItem();

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
    localStorage.setItem("data", JSON.stringify(basket));
};
let updateItem = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    updateCart();
};
let updateCart = () => {
    let cartIcon = document.querySelector("#cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
updateCart();