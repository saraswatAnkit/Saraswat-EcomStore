import { getCartProductFromLS } from "./getCartProductFromLS"

export const updateCartProductTotal = () => {
    let productSubTotal = document.querySelector(".productSubTotal")
    let productFinalTotal = document.querySelector(".productFinalTotal")

    let localCartProducts = getCartProductFromLS();
    let initialValue = 0;
    let totalProductPrice = localCartProducts.reduce((acuum, curElem)=>{
        let productPrice = parseInt(curElem.price) || 0;
        return acuum + productPrice;
     },initialValue);
    //  console.log(totalProductPrice);

     productSubTotal.innerText = `₹${totalProductPrice}`;
     productFinalTotal.textContent = `₹${totalProductPrice + 50}`
}