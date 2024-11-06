import { getCartProductFromLS } from "./getCartProductFromLS";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS()

export const addToCart = (e, id, stock) => {

    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    // console.log(currentProdElem)

    let quantity = currentProdElem.querySelector('.productQuantity').innerText
    let price = currentProdElem.querySelector('.productPrice').innerText
    // console.log(quantity, price);
    price = Number(price.replace("₹",""));

    let existingProd = arrLocalStorageProduct.find((currProd) => currProd.id == id)

    if(existingProd && quantity > 1){
        quantity = Number(existingProd.quantity) + Number(quantity)
        price = Number(price * quantity);
        let updatedCart = { id, quantity, price }

        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id == id ? updatedCart : curProd;
        })
        localStorage.setItem('product', JSON.stringify(updatedCart));
        showToast("add", id);
    }

    if(existingProd)
        return false;

    quantity = Number(quantity);
    price *= quantity;
    console.log(quantity, price);

    let updateCart = { id, quantity, price }
    arrLocalStorageProduct.push( updateCart )
    localStorage.setItem('product', JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct)
    showToast("add", id);
}