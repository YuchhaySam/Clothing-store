import { cart } from "../data/cart.js";
import { product } from "../data/product.js";

let checkoutItemHtml = '';
cart.forEach((cartItem)=>{
  let checkCart;
  product.forEach((productItem)=>{
    if(cartItem.id === productItem.id){
      checkCart = productItem;
    }
  });

  checkoutItemHtml += `
    <div class="shopping-title">Shopping</div>   
    <div class="item-section">
      <div class="item-left-section">
        <a class = "cart-item-image">
          <img class = "cart-item-image" src="image/bag-image/bag-1.jpg">
        </a>
        <a class="cart-item-name">
          Gray Bag
        </a>
      </div>
      <div class="action-button-section">
        <div class="cart-item-price">
          $140.00
        </div>
        <button class="update-button">
          Update
        </button>
        <div class="update-container">
          <span class="quantity-text">Quantity</span>
          <button class="decrease-button">-</button>
          <input type="text" class="quantity-input-field">
          <button class="increase-button">+</button>
        </div>
        <button  class="delete-button">
          Delete
        </button>
      </div>
    </div>
    <div class="shipping-section">
      <div class="shipping-label">Select Your Shipping</div>
      <div class="shipping-option-container">
        <label class="shipping-label-radio" for="shipping-option"><input type="radio" class="shipping-option-radio" id="shipping-option" name="shipping">7 Days ($10.99)</label>
        <label class="shipping-label-radio" for="shipping-option"><input type="radio" class="shipping-option-radio" id="shipping-option" name="shipping">10 Days ($7.99)</label>
        <label class="shipping-label-radio" for="shipping-option"><input type="radio" class="shipping-option-radio" id="shipping-option" name="shipping">14 Days (Free)</label>
      </div>
      
    </div>
    <a class="go-back-shopping-link" href="beyone.html">Go Back Shopping
    </a>
  `

});