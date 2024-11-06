import products from './api/products.json'
import { fetchQuantityFromCardLS } from './fetchQuantityFromCardLS';
import { getCartProductFromLS } from "./getCartProductFromLS";
import { incrementDecrement } from './incrementDecrement';
import { removeProductFromCart } from './removeProductFromCart';
import { updateCartProductTotal } from './updateCartProductTotal';

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    // console.log(curProd.id);
    return cartProducts.some((curElem) => curElem.id == curProd.id)
})

console.log(filterProducts);

const cartElement = document.querySelector('#productCartContainer')
const templateContainer = document.querySelector('#productCartTemplate')

const showCartProduct = () => {
    filterProducts.forEach((curProd)=>{
        const { category, id, image, name, stock, price } = curProd;

        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCardLS(id, price);

        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('#cardValue').setAttribute("id", `card${id}`)
        productClone.querySelector('.productName').textContent = name;
        productClone.querySelector('.productImage').src = image;
        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;

        productClone.querySelector(".stockElement").addEventListener("click", (e)=>{
            incrementDecrement(e, id, stock, price);
        })

        productClone.querySelector(".remove-to-cart-button").addEventListener('click', ()=> removeProductFromCart(id))


        cartElement.appendChild(productClone);
    })
}

showCartProduct();


updateCartProductTotal();