import { cart } from "../data/cart.js";
import { product } from "../data/product.js";
import { moneyConvert } from "./ultil/moneyConversion.js";
let checkoutItemHtml = '';
cart.forEach((cartItem)=>{
  let checkCart;
  product.forEach((productItem)=>{
    if(cartItem.id === productItem.id){
      checkCart = productItem;
    }
  });

  checkoutItemHtml += `
    <div class="item-container">
      <div class="item-left-section">
        <a class = "cart-item-image">
        <img class = "cart-item-image" src=${checkCart.image}>
        </a>
        <a class="cart-item-name">
          ${checkCart.name}
        </a>
      </div>
      <div class="action-button-section">
        <div class="cart-item-price">
          $${moneyConvert(checkCart.priceCents)}
        </div>
        <div class="update-container">
          <span class="quantity-text">Quantity</span>
          <button class="decrease-button">-</button>
          <input type="text" class="quantity-input-field" value="1">
          <button class="increase-button">+</button>
        </div>
        <button  class="delete-button">
          Delete
        </button>
      </div>
    </div>
   `;
});

document.querySelector('.js-item-section').innerHTML = checkoutItemHtml;