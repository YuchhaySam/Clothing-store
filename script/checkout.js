import { cart, deleteItem, saveToLocalStorage } from "../data/cart.js";
import { product } from "../data/product.js";
import { moneyConvert } from "./ultil/moneyConversion.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOption} from "../data/deliveryOption.js";


let checkoutItemHtml = '';
cart.forEach((cartItem)=>{
  let checkCart;
  product.forEach((productItem)=>{
    if(cartItem.id === productItem.id){
      checkCart = productItem;
    }
  });

  checkoutItemHtml += `
    <div class="item-container js-item-container-${checkCart.id}">
      <div class="item-left-section">
        <a class = "cart-item-image">
        <img class = "cart-item-image" src=${checkCart.image}>
        </a>
        <a class="cart-item-name">
          ${checkCart.name}
        </a>
      </div>
      <div class="action-button-section">
        <div class="cart-item-price js-cart-item-price-${checkCart.id}">
        </div>
        <div class="update-container js-update-container" data-product-id=${checkCart.id}>
          <span class="quantity-text">Quantity</span>
          <button class="decrease-button js-decrease-button-${checkCart.id}">-</button>
          <span class="quantity-input-field js-quantity-display-${checkCart.id}"></span>
          <button class="increase-button js-increase-button-${checkCart.id}">+</button>
        </div>
        <button  class="delete-button js-delete-button" data-product-id = ${checkCart.id}>
          Delete
        </button>
      </div>
    </div>
    <div class="shipping-section">
      <div class="shipping-label">Select Your Shipping</div>
      <div class="shipping-option-container js-shipping-option-container">
        ${deliveryHTML()}
      </div>
      
    </div>
   `;
});

function deliveryHTML(){
  let deliveryOptionHtml = '';
  deliveryOption.forEach((option)=>{
    const deliveryOptionChecked = option.priceCents > 0;
    deliveryOptionHtml += `
        <label class="shipping-label-radio" for="shipping-option">
          <input checked type="radio" class="shipping-option-radio js-shipping-option" id="shipping-option" name="shipping" value = ${option.name} data-delivery-id = ${option.id}>
          ${option.length} Days ($${deliveryOptionChecked ? moneyConvert(option.priceCents): 'Free'})
        </label>
    `;
  });
  return deliveryOptionHtml;
}




  


document.querySelector('.js-item-section').innerHTML = checkoutItemHtml;

document.querySelectorAll(`.js-delete-button`).forEach((deleteButton)=>{
  deleteButton.addEventListener('click', ()=>{
    const productId = deleteButton.dataset.productId;
    deleteItem(productId);
    updateHtml(productId);
  });
});




document.querySelectorAll('.js-update-container').forEach((container)=>{
  const productId = container.dataset.productId;
  quantityInnerHtml(productId);
  priceInnerHtml(productId);
  

document.querySelectorAll(`.js-decrease-button-${productId}`).forEach((decrease)=>{
    decrease.addEventListener('click', ()=>{
      decreaseQuantity(productId);
      quantityInnerHtml(productId);
      priceInnerHtml(productId);
    })
  })

  document.querySelectorAll(`.js-increase-button-${productId}`).forEach((increase)=>{
    increase.addEventListener('click', ()=>{
      increaseQuantity(productId);
      quantityInnerHtml(productId);
      priceInnerHtml(productId);
    })
  })
});

function renderUpdatedDate(){
  document.querySelector('.js-estimate-shipping').innerHTML = deliveryDate;
}
function renderEstimateDate(){
  const renderDate = document.querySelectorAll('.js-shipping-option');
 
  renderDate.forEach((shipping)=>{
    shipping.addEventListener('click', ()=>{
      const deliveryId = shipping.dataset.deliveryId;
      let deliveryChecked;
      let deliveryDate;
      deliveryOption.forEach((option)=>{
        if(option.id === deliveryId){
          deliveryChecked = option;
        }
      })
      if(deliveryChecked){
        const today = dayjs();
        const addedDay = today.add(deliveryChecked.length, 'days');
        deliveryDate =  addedDay.format('dddd, MMM DD, YYYY');
      }
      return deliveryDate;
    })
  });
}


function quantityInnerHtml(productId) {
  document.querySelectorAll(`.js-quantity-display-${productId}`).forEach((quantity)=>{
  quantity.innerHTML =  displayQuantity(productId);
  })
}

function decreaseQuantity(productId){
  let newQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      if(cartItem.quantity<= 1){
        alert('Your item cannot be lower than 1');
      }else{
        newQuantity = cartItem.quantity -= 1;
      }
    }
  })
  cart.quantity = newQuantity;
  saveToLocalStorage();
}

function increaseQuantity(productId){
  let newQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      if(cartItem.quantity>= 10){
        alert('Your item cannot be higher than 10');
      }else{
        newQuantity = cartItem.quantity += 1;
      }
    }
  })
  cart.quantity = newQuantity;
  saveToLocalStorage();
}

function priceInnerHtml(productId){
  document.querySelectorAll(`.js-cart-item-price-${productId}`).forEach((price)=>{
    price.innerHTML =  `$${moneyConvert(displayPrice(productId))}`;
  })
} 

function displayQuantity(productId){
  let productQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      productQuantity = cartItem.quantity;
    }
  })
  return productQuantity;
}

function displayPrice(productId){
  let productPrice = 0;
  cart.forEach((cartItem)=>{
    let checkProduct;
    product.forEach((productItem)=>{
      if(productId === productItem.id){
        checkProduct = productItem;
      }
    });
    if(checkProduct.id === cartItem.id){
      productPrice = checkProduct.priceCents * cartItem.quantity;
    }
    
  })
  return productPrice; 
  
}

function updateHtml(productId){
  const container = document.querySelector(`.js-item-container-${productId}`);
  container.remove();
}

