import { product } from "../data/product.js";
import { moneyConvert } from "./ultil/moneyConversion.js";
import {cart, addToCart} from "../data/cart.js";

let itemHtml = '';

product.forEach((productItem) => {
  itemHtml += `
    <div class="item">
        <span class="item-name">${productItem.name}</span>
        <span class="item-price">$${moneyConvert(productItem.priceCents)}</span>
        <img class="item-image" src=${productItem.image}>
        <button class="add-to-cart-button js-add-to-cart" data-product-id = "${productItem.id}" >Add to Cart</button>
      </div>
  `;
});

document.querySelector('.js-item-container').innerHTML = itemHtml;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    addToCart(productId);
    displayCartPrice();
  } );
});



function displayCartPrice(){
  let productPrice = 0;
  cart.forEach((cartItem)=>{
    let checkProduct;
    product.forEach((productItem)=>{
      if(cartItem.id === productItem.id){
        checkProduct = productItem;
      }
    });
    if(cartItem.quantity >= 2){
      productPrice += (checkProduct.priceCents * cartItem.quantity);
    }else{
      productPrice += checkProduct.priceCents;
    }
  });
  document.querySelector('.js-cart-link')
    .innerHTML = `$(${moneyConvert(productPrice)})`;
}