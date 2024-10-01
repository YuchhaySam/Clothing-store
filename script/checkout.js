import { cart, deleteItem, saveToLocalStorage, increaseQuantity, decreaseQuantity } from "../data/cart.js";
import { product } from "../data/product.js";
import { moneyConvert } from "./ultil/moneyConversion.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOption} from "../data/deliveryOption.js";


let checkoutItemHtml = '';
let deliveryOptionHtml = '';
let deliveryChecked;
renderPaymentSection();
deliverOption();
displayShippingOptionDate();
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
        <button class="delete-button js-delete-button" data-product-id = ${checkCart.id}>
          Delete
        </button>
      </div>
    </div>

   `;
});

document.querySelector('.js-item-section').innerHTML = checkoutItemHtml;

document.querySelectorAll(`.js-delete-button`).forEach((deleteButton)=>{
  deleteButton.addEventListener('click', ()=>{
    const productId = deleteButton.dataset.productId;
    deleteItem(productId);
    updateHtml(productId);
    displayShippingOptionDate();
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
        renderPaymentSection();
        displayShippingOptionDate();
      })
    })

    document.querySelectorAll(`.js-increase-button-${productId}`).forEach((increase)=>{
      increase.addEventListener('click', ()=>{
        increaseQuantity(productId);
        quantityInnerHtml(productId);
        priceInnerHtml(productId);
        renderPaymentSection();
        displayShippingOptionDate();
      })
    })
});

function deliverOption(){
  deliveryOption.forEach((option)=>{
    const deliveryOptionChecked = option.priceCents > 0;
    deliveryOptionHtml += `
      <label class="shipping-label-radio" >
        <input checked type="radio" class="shipping-option-radio js-shipping-option" name="shipping" data-delivery-id = ${option.id}>
        ${option.length} Days ($${deliveryOptionChecked ? moneyConvert(option.priceCents): 'Free'})
      </label>
    `;
    });
    document.querySelector('.js-shipping-option-html').innerHTML = deliveryOptionHtml;
}

function renderPaymentSection(){
  let cartTotalHtml = `
  <div class="cart-price-container">
    <div class="cart-name">Cart Totals</div>
    <div class="sub-total">
      <div>Subtotal</div>
      <div class="js-sub-total"></div>
    </div>
    <div class="tax">
      <div>Delivery</div>
      <div class="js-delivery-price"></div>
    </div>
    <div class="ruler"></div>
    <div class="grand-total">
      <div>Total</div>
      <div class="js-total-payment"></div>
    </div>
    <div class="button-checkout">
      <button class="checkout-button">PROCEED TO CHECKOUT</button>
    </div>
  </div>
  `
  document.querySelector('.js-cart-right-section').innerHTML = cartTotalHtml;
}

function addTotalPrice(){
  let addTotal = 0;
  cart.forEach((cartItem)=>{
    let checkCart;
    product.forEach((productItem)=>{
      if(cartItem.id === productItem.id){
        checkCart = productItem;
      }
    })
    if(checkCart){
      addTotal += checkCart.priceCents * cartItem.quantity;
    }
  })
  document.querySelector('.js-sub-total').innerHTML = `$${moneyConvert(addTotal)}`;
  return addTotal;
}


function displayShippingOptionDate(){
  function initializeSelectedShippingOption() {
    document.querySelectorAll('.js-shipping-option').forEach((shipping) => {
      if (shipping.checked) { // Assuming the shipping options are radio buttons or checkboxes
        const deliveryId = shipping.dataset.deliveryId;
        deliveryOption.forEach((option) => {
          if (option.id === deliveryId) {
            deliveryChecked = option;
          }
        });
      }
    });
  
    if (deliveryChecked) {
      displayDeliveryDate(deliveryChecked);
      displayDeliveryPrice(deliveryChecked);
      displaySumPayment(deliveryChecked);
    }
  }
  
  document.querySelectorAll('.js-shipping-option').forEach((shipping)=>{
    shipping.addEventListener('click', ()=>{
      const deliveryId = shipping.dataset.deliveryId;
      deliveryOption.forEach((option)=>{
        
        if(option.id === deliveryId){
          deliveryChecked = option;
        }
      })
      displayDeliveryDate(deliveryChecked);
      displayDeliveryPrice(deliveryChecked);
      displaySumPayment(deliveryChecked);
    })
  });
  
  function displayDeliveryDate(deliveryChecked){
    let deliveryDate;
    if(deliveryChecked){
      const today = dayjs();
      const addedDay = today.add(deliveryChecked.length, 'days');
      deliveryDate =  addedDay.format('dddd, MMM DD, YYYY');
    }
    document.querySelector('.js-estimate-shipping').innerHTML = `Estimate Shipping: ${deliveryDate}`;
  }
  function displayDeliveryPrice(deliveryChecked) {
    let deliveryPrice = 0;
    if (deliveryChecked) {
      deliveryPrice = deliveryChecked.priceCents > 0 ? `$${moneyConvert(deliveryChecked.priceCents)}` : 'Free';
    }
    document.querySelector('.js-delivery-price').innerHTML = `${deliveryPrice}`;
  }
  function displaySumPayment(deliveryChecked){
    let deliveryPrice = deliveryChecked.priceCents;
    let subTotal = addTotalPrice();
    let total = subTotal + deliveryPrice;
    document.querySelector('.js-total-payment').innerHTML = `$${moneyConvert(total)}`;
  }
  
  window.addEventListener('load', initializeSelectedShippingOption());
}


function quantityInnerHtml(productId) {
  document.querySelectorAll(`.js-quantity-display-${productId}`).forEach((quantity)=>{
  quantity.innerHTML =  displayQuantity(productId);
  })
}

function priceInnerHtml(productId){
  document.querySelectorAll(`.js-cart-item-price-${productId}`).forEach((price)=>{
    price.innerHTML =  `$${moneyConvert(displayPrice(productId))}`;
  })
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

function displayQuantity(productId){
  let productQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      productQuantity = cartItem.quantity;
    }
  })
  return productQuantity;
}

function updateHtml(productId){
  const container = document.querySelector(`.js-item-container-${productId}`);
  container.remove();
}

